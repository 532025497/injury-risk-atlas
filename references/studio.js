import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { presets, normalizedName, displayName, matchesPreset } from './presets.js';
const $ = id => document.getElementById(id);
const viewport = $('viewport');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32,1,0.01,100);
let renderer;
try {renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}
catch(error){$('loading').textContent='当前浏览器无法创建 3D 画面，请使用支持 WebGL 的浏览器。';throw error;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.15;
renderer.domElement.setAttribute('aria-label','完整肌肉与骨骼三维参考模型');
viewport.append(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true; controls.minDistance=.3; controls.maxDistance=24;
scene.add(new THREE.HemisphereLight(0xffffff,0x697361,2));
for(const [position,intensity] of [[[4,8,6],3],[[-5,4,3],1.4],[[0,6,-7],2]]){
 const light=new THREE.DirectionalLight(0xffffff,intensity);light.position.set(...position);scene.add(light);
}
const muscles=[], bones=[], selected=new Set();
let ready=false, view='front', exporting=false, lastExport=null;
const directions={front:[0,0,1],back:[0,0,-1],left:[1,0,0],right:[-1,0,0]};
function resize(){const w=viewport.clientWidth,h=viewport.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
new ResizeObserver(resize).observe(viewport);
function animate(){requestAnimationFrame(animate);if(!exporting){controls.update();renderer.render(scene,camera);}}animate();
function setView(next,focus=false){
 view=next;const box=new THREE.Box3();
 if(focus && selected.size) for(const mesh of muscles){if(selected.has(mesh.uuid))box.expandByObject(mesh);}
 if(box.isEmpty())for(const mesh of muscles)box.expandByObject(mesh);
 const center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
 const span=Math.max(size.y,size.x/Math.max(camera.aspect,.25),size.z,0.3);
 const distance=span/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)))*1.18;
 controls.target.copy(center);camera.position.copy(center).add(new THREE.Vector3(...directions[view]).multiplyScalar(distance));
 camera.lookAt(center);controls.update();
}
function apply(){
 const highlight=$('highlight').checked,opacity=Number($('context').value)/100;
 for(const mesh of muscles){const target=selected.has(mesh.uuid),m=mesh.material;
   m.color.set(target && highlight ? 0xf4cc42 : mesh.userData.isTendon ? 0xe0d7ba : 0xa86259);
   m.emissive.set(target && highlight ? 0x7a5c0e : 0x000000);m.emissiveIntensity=.12;
   m.opacity=target?1:opacity;m.transparent=m.opacity<1;m.depthWrite=m.opacity===1;
 }
 for(const mesh of bones)mesh.visible=$('bones').checked;
 $('selected-count').textContent=selected.size;
 $('context-value').textContent=`${Math.round(opacity*100)}%`;
}
function renderList(){
 const query=$('search').value.toLowerCase().trim();
 const fragment=document.createDocumentFragment();
 for(const mesh of muscles){const title=displayName(mesh.name);if(query&&!title.toLowerCase().includes(query))continue;
  const label=document.createElement('label'),input=document.createElement('input'),span=document.createElement('span');
  input.type='checkbox';input.checked=selected.has(mesh.uuid);input.value=mesh.uuid;
  span.textContent=title;label.append(input,span);fragment.append(label);
  input.addEventListener('change',()=>{input.checked?selected.add(mesh.uuid):selected.delete(mesh.uuid);apply();});
 }
 $('muscles').replaceChildren(fragment);
 if(!fragment.childNodes.length && !$('muscles').childNodes.length)$('muscles').textContent='没有匹配的肌肉名称';
}
function chooseCourse(){
 const preset=presets[Number($('course').value)];
 selected.clear();for(const mesh of muscles){const n=normalizedName(mesh.name);if(matchesPreset(n,preset))selected.add(mesh.uuid);}
 $('course-title').textContent=preset.name;$('course-note').textContent=preset.note;
 apply();renderList();if(ready)setView(preset.view,true);
}
function download(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),60000);}
function pngBlob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('无法生成图像')),'image/png'));}
async function exportImage(){
 if(!ready||exporting)return;
 exporting=true;$('export').disabled=true;$('export-status').textContent='正在生成高清 PNG…';
 const oldSize=renderer.getSize(new THREE.Vector2()),oldPixelRatio=renderer.getPixelRatio(),oldAspect=camera.aspect;
 try{
  const max=Number($('resolution').value),ratio=viewport.clientWidth/viewport.clientHeight;
  const width=ratio>=1?max:Math.round(max*ratio),height=ratio>=1?Math.round(max/ratio):max;
  renderer.setPixelRatio(1);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
  renderer.setClearColor(0xffffff,$('background').value==='white'?1:0);
  const filename=`解剖参考_${presets[Number($('course').value)].name}_${view}_${width}x${height}.png`;
  const record={filename,course:presets[Number($('course').value)].name,view,width,height,background:$('background').value,bones:$('bones').checked,camera:camera.position.toArray(),target:controls.target.toArray(),highlight:$('highlight').checked,opacity:$('context').value,names:muscles.filter(m=>selected.has(m.uuid)).map(m=>`${normalizedName(m.name)} [${m.userData.source}]`).join('\n')};
  renderer.render(scene,camera);
  const blob=await pngBlob(renderer.domElement);
  lastExport=record;
  download(blob,filename);
  $('export-status').textContent=`已导出 ${width} × ${height} PNG，请同时下载署名说明随素材交付。`;
 }catch(error){console.error(error);$('export-status').textContent='导出失败，可切换到 2048 px 后重试。';}
 finally{renderer.setPixelRatio(oldPixelRatio);renderer.setSize(oldSize.x,oldSize.y,false);camera.aspect=oldAspect;camera.updateProjectionMatrix();renderer.setClearColor(0xffffff,0);exporting=false;$('export').disabled=false;renderer.render(scene,camera);}
}
$('course').replaceChildren(...presets.map((p,i)=>{const option=document.createElement('option');option.value=i;option.textContent=p.name;return option;}));
$('course').addEventListener('change',chooseCourse);$('search').addEventListener('input',renderList);
$('highlight').addEventListener('change',apply);$('bones').addEventListener('change',apply);$('context').addEventListener('input',apply);
$('clear').addEventListener('click',()=>{selected.clear();apply();renderList();});
for(const button of document.querySelectorAll('[data-view]'))button.addEventListener('click',()=>{
 view=button.dataset.view;const center=controls.target.clone(),distance=camera.position.distanceTo(center);camera.position.copy(center).add(new THREE.Vector3(...directions[view]).multiplyScalar(distance));camera.lookAt(center);controls.update();
});
$('focus').addEventListener('click',()=>setView(view,true));$('reset').addEventListener('click',()=>setView('front',false));
$('export').addEventListener('click',exportImage);
$('attribution').addEventListener('click',async()=>{
 try{const response=await fetch('../ATTRIBUTION.md');if(!response.ok)throw new Error('署名文件加载失败');
 if(!lastExport){$('export-status').textContent='请先导出 PNG，再下载对应的署名记录。';return;}
 const record=lastExport,names=record.names;
 const text=`# 本次参考图导出记录\n\n图像文件：${record.filename}\n尺寸：${record.width} × ${record.height}\n课程：${record.course}\n视角预设：${record.view}\n实际相机位置：${record.camera.join(', ')}\n取景中心：${record.target.join(', ')}\n背景：${record.background}\n骨骼显示：${record.bones}\n目标高亮：${record.highlight?'黄色':'关闭'}\n周围肌肉不透明度：${record.opacity}%\n\n处理：网页模型渲染、选取视角、肌群高亮与背景调整。图片可进一步改编；需保留下面的来源署名，按对应 CC BY-SA 许可共享改编解剖素材。\n\n选中网格：\n${names || '无高亮网格'}\n\n${await response.text()}`;
 download(new Blob([text],{type:'text/plain;charset=utf-8'}),'解剖参考图_署名与许可说明.txt');
 }catch(error){$('export-status').textContent=error.message;}
});
async function load(){
 try{
 const loader=new GLTFLoader();
 const [muscleGLB,boneGLB,mapping]=await Promise.all([
 loader.loadAsync('../assets/anatomy.glb',e=>{if(e.total)$('loading').textContent=`正在加载肌肉模型 ${Math.round(e.loaded/e.total*100)}%…`;}),
 loader.loadAsync('../assets/skeleton.glb'),fetch('../assets/mesh_mapping.json').then(r=>{if(!r.ok)throw new Error('肌肉来源映射加载失败');return r.json();})]);
 const roots=[muscleGLB.scene,boneGLB.scene];
 for(const root of roots){root.rotation.x=-Math.PI/2;root.updateMatrixWorld(true);}
 const sourceBox=new THREE.Box3().setFromObject(roots[0]),scale=6.38/sourceBox.getSize(new THREE.Vector3()).y;
 for(const root of roots){root.scale.setScalar(scale);root.updateMatrixWorld(true);}
 const box=new THREE.Box3().setFromObject(roots[0]),center=box.getCenter(new THREE.Vector3());
 for(const [i,root] of roots.entries()){
  root.position.add(new THREE.Vector3(-center.x,-box.min.y,-center.z));
  root.traverse(mesh=>{if(!mesh.isMesh)return;
   mesh.userData.isTendon=/tendon|ligament|aponeurosis|retinaculum|fascia/.test(normalizedName(mesh.name));
   mesh.userData.source=mapping.find(m=>normalizedName(m.name)===normalizedName(mesh.name))?.source;
   mesh.material=new THREE.MeshStandardMaterial({color:i?0xe4dfce:0xa86259,roughness:.65,side:THREE.DoubleSide});
   (i?bones:muscles).push(mesh);
  });scene.add(root);
 }
 muscles.sort((a,b)=>displayName(a.name).localeCompare(displayName(b.name),'zh-CN'));
 ready=true;viewport.dataset.ready='true';$('loading').hidden=true;$('export').disabled=false;chooseCourse();
 }catch(error){console.error(error);$('loading').textContent='模型加载失败，请刷新页面重试。';}
}
resize();load();
