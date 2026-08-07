import * as THREE from "three";
import { GLTFLoader } from "./vendor/GLTFLoader.js";
import { OrbitControls } from "./vendor/OrbitControls.js";
import { BODY_REGION_LABELS } from "./data.js";

const PRIMARY_COLOR = new THREE.Color("#ff3347");
const SECONDARY_COLOR = new THREE.Color("#ff8b52");

const MUSCLE_TONES = {
  head: "#a84e49",
  shoulder: "#9e3f3d",
  trunk: "#a94b45",
  back: "#82393a",
  arm: "#97413e",
  hip: "#82403d",
  thigh: "#9b433f",
  lowerLeg: "#8a3938",
  handFoot: "#75413d",
  default: "#93413e",
};

const TENDON_PATTERN = /tendon|ligament|retinaculum|membrane|fascia|aponeuros|iliotibial/i;
const materialCache = new Map();

function makeSurfaceMaterial(key, color, roughness = 0.61) {
  if (!materialCache.has(key)) {
    materialCache.set(key, new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness: 0.01,
      side: THREE.DoubleSide,
    }));
  }
  return materialCache.get(key);
}

const TENDON_MATERIAL = makeSurfaceMaterial("tendon", "#d5c8ae", 0.72);
const BONE_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#d8d5c7",
  roughness: 0.68,
  metalness: 0.01,
  transparent: true,
  opacity: 0.16,
  depthWrite: false,
  side: THREE.DoubleSide,
});
const PRIMARY_MATERIAL = new THREE.MeshStandardMaterial({
  color: PRIMARY_COLOR,
  emissive: PRIMARY_COLOR,
  emissiveIntensity: 0.58,
  roughness: 0.38,
  metalness: 0.01,
  side: THREE.DoubleSide,
});
const SECONDARY_MATERIAL = new THREE.MeshStandardMaterial({
  color: SECONDARY_COLOR,
  emissive: SECONDARY_COLOR,
  emissiveIntensity: 0.2,
  roughness: 0.44,
  metalness: 0.01,
  side: THREE.DoubleSide,
});

function normalizedName(name = "") {
  return name.replaceAll("_", " ").replace(/\s+/g, " ").trim().toLowerCase();
}

function sideFromName(name) {
  if (/\bleft\b/.test(name)) return "l";
  if (/\bright\b/.test(name)) return "r";
  return null;
}

function addSided(set, base, side) {
  if (side) {
    set.add(`${base}_${side}`);
  } else {
    set.add(`${base}_l`);
    set.add(`${base}_r`);
  }
}

function muscleToneFor(name) {
  if (/frontalis|orbicularis|zygomatic|masseter|pterygoid|digastric|hyoid|scalen|capitis|colli|platysma/.test(name)) return "head";
  if (/deltoid|supraspinatus|infraspinatus|subscapularis|teres|levator scapulae/.test(name)) return "shoulder";
  if (/trapezius|latissimus|rhomboid|erector|multifidus|iliocostalis|longissimus|spinalis/.test(name)) return "back";
  if (/pectoralis|serratus|intercostal|abdominis|oblique|diaphragm/.test(name)) return "trunk";
  if (/biceps brachii|triceps brachii|brachialis|brachioradialis|pronator|supinator|flexor carpi|extensor carpi/.test(name)) return "arm";
  if (/gluteus|piriformis|iliacus|psoas|obturator|gemellus|quadratus femoris|coccygeus/.test(name)) return "hip";
  if (/femoris|vastus|semitendinosus|semimembranosus|adductor|sartorius|gracilis/.test(name)) return "thigh";
  if (/gastrocnemius|soleus|tibialis|fibularis|peroneus|plantaris|popliteus/.test(name)) return "lowerLeg";
  if (/hand|foot|hallucis|pollicis|digiti|minimi|lumbrical|interossei/.test(name)) return "handFoot";
  return "default";
}

function muscleRegions(rawName) {
  const name = normalizedName(rawName);
  const side = sideFromName(name);
  const regions = new Set();

  if (/orbicularis oculi|levator palpebrae|lateral rectus|medial rectus|superior rectus|inferior rectus|superior oblique|inferior oblique/.test(name)) {
    regions.add("eyes");
  }

  if (/sternocleidomastoid|platysma|scalen|longus colli|longus capitis|splenius capitis|hyoid|digastric/.test(name)) {
    regions.add("neck");
  }

  if (/deltoid|supraspinatus|infraspinatus|subscapularis|teres major|teres minor|subclavius/.test(name)) {
    addSided(regions, "shoulder", side);
  }

  if (/trapezius|rhomboid|levator scapulae|serratus posterior/.test(name)) {
    addSided(regions, "scapula", side);
    regions.add("thoracic_spine");
  }

  if (/pectoralis|serratus anterior|intercostal|transversus thoracis|diaphragm/.test(name)) {
    regions.add("chest");
  }

  if (/rectus abdominis|external oblique|internal oblique|transversus abdominis/.test(name)) {
    regions.add("core_front");
  }

  if (/erector spinae|multifidus|rotatores|quadratus lumborum|iliocostalis|longissimus|spinalis|interspinal|intertransversar|thoracolumbar fascia/.test(name)) {
    regions.add("core_back");
    if (/lumbar|quadratus lumborum|multifidus|erector|thoracolumbar/.test(name)) regions.add("lumbar_spine");
    if (/thorac|iliocostalis|longissimus|spinalis/.test(name)) regions.add("thoracic_spine");
  }

  if (/biceps brachii|triceps brachii|brachialis|coracobrachialis|anconeus/.test(name)) {
    addSided(regions, "upper_arm", side);
  }

  if (/brachioradialis|pronator|supinator|flexor carpi|extensor carpi|flexor digitorum|extensor digitorum|extensor indicis|palmaris|pollicis longus|interosseous membrane.*forearm/.test(name)) {
    addSided(regions, "forearm", side);
  }

  if (/wrist|carpal retinaculum/.test(name)) addSided(regions, "wrist", side);
  if (/hand|pollicis brevis|adductor pollicis|opponens pollicis|lumbrical.*hand|interossei.*hand/.test(name)) addSided(regions, "hand", side);

  if (/gluteus/.test(name)) {
    addSided(regions, "glute", side);
    addSided(regions, "hip", side);
  }

  if (/iliacus|psoas|piriformis|obturator|gemellus|quadratus femoris|tensor fasciae|pectineus/.test(name)) {
    addSided(regions, "hip", side);
  }

  if (/coccygeus|iliococcygeus|pubococcygeus|puborectalis|levator ani|anal sphincter/.test(name)) {
    regions.add("pelvis");
  }

  if (/adductor (brevis|longus|magnus|minimus)|gracilis/.test(name)) addSided(regions, "adductor", side);
  if (/rectus femoris|vastus/.test(name)) addSided(regions, "quad", side);
  if (/biceps femoris|semitendinosus|semimembranosus/.test(name)) addSided(regions, "hamstring", side);
  if (/popliteus|patellar|iliotibial/.test(name)) addSided(regions, "knee", side);
  if (/gastrocnemius|soleus|plantaris|calcaneal tendon/.test(name)) addSided(regions, "calf", side);
  if (/tibialis anterior/.test(name)) addSided(regions, "tibialis", side);
  if (/ankle|calcaneal tendon|retinaculum.*foot|retinaculum.*ankle/.test(name)) addSided(regions, "ankle", side);
  if (/foot|hallucis|digitorum brevis|lumbrical.*foot|interossei.*foot|plantar ligament/.test(name)) addSided(regions, "foot", side);

  return [...regions];
}

function boneRegions(rawName) {
  const name = normalizedName(rawName);
  const side = sideFromName(name);
  const regions = new Set();

  if (/scapula/.test(name)) addSided(regions, "scapula", side);
  if (/clavicle/.test(name)) addSided(regions, "shoulder", side);
  if (/cervical vertebra/.test(name)) regions.add("neck");
  if (/thoracic vertebra|rib|sternum/.test(name)) regions.add("thoracic_spine");
  if (/lumbar vertebra/.test(name)) regions.add("lumbar_spine");
  if (/sacrum|coccyx|pelvis|hip bone|ilium|ischium|pubis/.test(name)) regions.add("pelvis");
  if (/patella/.test(name)) addSided(regions, "knee", side);
  if (/carpal/.test(name)) addSided(regions, "wrist", side);
  if (/metacarpal|phalanx.*hand|hand.*phalanx/.test(name)) addSided(regions, "hand", side);
  if (/talus|calcaneus/.test(name)) addSided(regions, "ankle", side);
  if (/tarsal|metatarsal|phalanx.*foot|foot.*phalanx/.test(name)) addSided(regions, "foot", side);

  return [...regions];
}

function setOpacity(material, opacity) {
  material.opacity = opacity;
  material.transparent = opacity < 0.995;
  material.depthWrite = opacity >= 0.8;
  material.needsUpdate = true;
}

function createBrainGeometry() {
  const geometry = new THREE.IcosahedronGeometry(1, 4);
  const position = geometry.getAttribute("position");
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const ripple = 1 + 0.035 * Math.sin(x * 18 + y * 7) * Math.cos(z * 16 - y * 5);
    position.setXYZ(i, x * ripple, y * ripple, z * ripple);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function createHeartGeometry() {
  const profile = [
    new THREE.Vector2(0.025, -0.34),
    new THREE.Vector2(0.14, -0.24),
    new THREE.Vector2(0.22, -0.04),
    new THREE.Vector2(0.21, 0.18),
    new THREE.Vector2(0.15, 0.3),
    new THREE.Vector2(0.07, 0.34),
  ];
  return new THREE.LatheGeometry(profile, 36);
}

export class AnatomyScene {
  constructor(container, tooltip) {
    this.container = container;
    this.tooltip = tooltip;
    this.loadingElement = container.querySelector("#model-loading");
    this.loadingText = container.querySelector("#model-loading-text");
    this.regionMeshes = new Map();
    this.muscleMeshes = [];
    this.boneMeshes = [];
    this.markerMeshes = [];
    this.raycastMeshes = [];
    this.activePrimary = new Set();
    this.activeSecondary = new Set();
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.clock = new THREE.Clock();
    this.cameraGoal = null;
    this.targetGoal = null;
    this.layerMode = "all";
    this.compactMode = null;
    this.shortMode = false;
    this.ready = false;
    this.progress = { anatomy: 0, skeleton: 0 };

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x091017, 0.046);

    this.camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    this.camera.position.set(0.15, 3.25, 13.1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.16;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.setAttribute("aria-label", "可旋转的真实肌肉与骨骼三维解剖模型");
    container.prepend(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 14;
    this.controls.target.set(0, 3.2, 0);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.58;

    this.model = new THREE.Group();
    this.model.rotation.y = -0.08;
    this.scene.add(this.model);

    this.addLights();
    this.addGround();
    this.addOrganMarkers();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.renderer.domElement.addEventListener("pointermove", (event) => this.onPointerMove(event));
    this.renderer.domElement.addEventListener("pointerleave", () => this.hideTooltip());
    this.renderer.domElement.addEventListener("pointerdown", () => {
      this.controls.autoRotate = false;
    });

    this.resize();
    this.animate();
    this.loadModels();
  }

  addLights() {
    this.scene.add(new THREE.HemisphereLight(0xb8d8ea, 0x241516, 2.25));

    const key = new THREE.DirectionalLight(0xffffff, 4.1);
    key.position.set(4, 8, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -1;
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0x8fd8e4, 2.4);
    fill.position.set(-5, 4, 5);
    this.scene.add(fill);

    const rim = new THREE.DirectionalLight(0x47b8cc, 3.1);
    rim.position.set(-4, 5, -5);
    this.scene.add(rim);

    const warm = new THREE.PointLight(0xff6f5f, 1.65, 9);
    warm.position.set(3, 4.4, 2.2);
    this.scene.add(warm);
  }

  addGround() {
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 2.08, 0.08, 64),
      new THREE.MeshStandardMaterial({ color: 0x101820, roughness: 0.76, metalness: 0.28 }),
    );
    disc.position.y = 0.02;
    disc.receiveShadow = true;
    this.scene.add(disc);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.015, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0x46bdca, transparent: true, opacity: 0.56 }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.075;
    this.scene.add(ring);
  }

  addOrganMarkers() {
    const markerBase = new THREE.MeshStandardMaterial({
      color: "#a95057",
      roughness: 0.48,
      metalness: 0.01,
      transparent: true,
      opacity: 0.9,
    });

    const brainGeometry = createBrainGeometry();
    for (const x of [-0.16, 0.16]) {
      const brain = new THREE.Mesh(brainGeometry, markerBase);
      brain.position.set(x, 6.17, -0.01);
      brain.scale.set(0.24, 0.33, 0.27);
      this.registerMesh(brain, ["brain"], "脑与中枢加工", "organ", true);
      this.model.add(brain);
    }

    const eyeGeometry = new THREE.SphereGeometry(1, 24, 16);
    for (const x of [-0.14, 0.14]) {
      const eye = new THREE.Mesh(eyeGeometry, markerBase);
      eye.position.set(x, 6.08, 0.29);
      eye.scale.set(0.065, 0.055, 0.045);
      this.registerMesh(eye, ["eyes"], "眼球与视觉输入", "organ", true);
      this.model.add(eye);
    }

    const heart = new THREE.Mesh(createHeartGeometry(), markerBase);
    heart.position.set(0.13, 4.65, 0.22);
    heart.rotation.set(Math.PI, 0, -0.24);
    heart.scale.set(0.88, 0.9, 0.72);
    this.registerMesh(heart, ["heart"], "心脏", "organ", true);
    this.model.add(heart);
  }

  loadGLB(loader, url, progressKey) {
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        resolve,
        (event) => {
          if (!event.total) return;
          this.progress[progressKey] = event.loaded / event.total;
          this.updateLoadingProgress();
        },
        reject,
      );
    });
  }

  async loadModels() {
    const loader = new GLTFLoader();
    const anatomyUrl = new URL("./assets/anatomy.glb", import.meta.url);
    const skeletonUrl = new URL("./assets/skeleton.glb", import.meta.url);
    try {
      const [anatomy, skeleton] = await Promise.all([
        this.loadGLB(loader, anatomyUrl.href, "anatomy"),
        this.loadGLB(loader, skeletonUrl.href, "skeleton"),
      ]);
      this.installModels(anatomy.scene, skeleton.scene);
      this.updateQaMetadata();
      this.ready = true;
      this.loadingElement.hidden = true;
      this.applyHighlights();
      this.focusRegions([...this.activePrimary, ...this.activeSecondary]);
    } catch (error) {
      console.error("Anatomy model failed to load", error);
      this.loadingElement.classList.add("error");
      this.loadingText.textContent = "3D 解剖模型加载失败";
    }
  }

  updateLoadingProgress() {
    const value = Math.round((this.progress.anatomy * 0.72 + this.progress.skeleton * 0.28) * 100);
    this.loadingElement.style.setProperty("--load-progress", `${value}%`);
    this.loadingText.textContent = `加载解剖模型 ${value}%`;
  }

  installModels(anatomyRoot, skeletonRoot) {
    anatomyRoot.rotation.x = -Math.PI / 2;
    skeletonRoot.rotation.x = -Math.PI / 2;
    anatomyRoot.updateMatrixWorld(true);
    skeletonRoot.updateMatrixWorld(true);

    const sourceBox = new THREE.Box3().setFromObject(anatomyRoot);
    const sourceSize = sourceBox.getSize(new THREE.Vector3());
    const scale = 6.38 / sourceSize.y;
    anatomyRoot.scale.setScalar(scale);
    skeletonRoot.scale.setScalar(scale);
    anatomyRoot.updateMatrixWorld(true);
    skeletonRoot.updateMatrixWorld(true);

    const scaledBox = new THREE.Box3().setFromObject(anatomyRoot);
    const center = scaledBox.getCenter(new THREE.Vector3());
    const offset = new THREE.Vector3(-center.x, 0.14 - scaledBox.min.y, -center.z);
    anatomyRoot.position.add(offset);
    skeletonRoot.position.add(offset);

    anatomyRoot.traverse((child) => {
      if (!child.isMesh) return;
      const name = normalizedName(child.name);
      const tendon = TENDON_PATTERN.test(name);
      const tone = muscleToneFor(name);
      const baseMaterial = tendon
        ? TENDON_MATERIAL
        : makeSurfaceMaterial(`muscle-${tone}`, MUSCLE_TONES[tone]);
      child.material = baseMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
      child.renderOrder = 2;
      this.registerMesh(child, muscleRegions(name), name, "muscle", false);
      this.muscleMeshes.push(child);
    });

    skeletonRoot.traverse((child) => {
      if (!child.isMesh) return;
      const name = normalizedName(child.name);
      child.material = BONE_MATERIAL;
      child.castShadow = false;
      child.receiveShadow = false;
      child.renderOrder = 1;
      this.registerMesh(child, boneRegions(name), name, "bone", false);
      this.boneMeshes.push(child);
    });

    this.model.add(skeletonRoot, anatomyRoot);
    this.setLayerMode(this.layerMode);
  }

  updateQaMetadata() {
    const regionKeys = Object.keys(BODY_REGION_LABELS);
    const emptyRegions = regionKeys.filter((key) => !(this.regionMeshes.get(key)?.length));
    this.container.dataset.muscleMeshCount = String(this.muscleMeshes.length);
    this.container.dataset.boneMeshCount = String(this.boneMeshes.length);
    this.container.dataset.registeredRegionCount = String(this.regionMeshes.size);
    this.container.dataset.emptyRegions = emptyRegions.join(",");
  }

  registerMesh(mesh, regionKeys, label, layer, marker) {
    mesh.userData.regionKeys = regionKeys;
    mesh.userData.regionKey = regionKeys[0] ?? null;
    mesh.userData.regionLabel = regionKeys.length
      ? regionKeys.map((key) => BODY_REGION_LABELS[key]).filter(Boolean).join(" / ")
      : label;
    mesh.userData.rawAnatomyName = label;
    mesh.userData.layer = layer;
    mesh.userData.baseMaterial = mesh.material;
    mesh.userData.marker = marker;
    if (marker) {
      mesh.visible = false;
      this.markerMeshes.push(mesh);
    }
    for (const key of regionKeys) {
      if (!this.regionMeshes.has(key)) this.regionMeshes.set(key, []);
      this.regionMeshes.get(key).push(mesh);
    }
    if (regionKeys.length) this.raycastMeshes.push(mesh);
  }

  setHighlighted(primary = [], secondary = []) {
    this.activePrimary = new Set(primary);
    this.activeSecondary = new Set(secondary.filter((key) => !this.activePrimary.has(key)));
    if (!this.ready) return;
    this.applyHighlights();
    this.focusRegions([...primary, ...secondary]);
  }

  applyHighlights() {
    for (const mesh of [...this.muscleMeshes, ...this.boneMeshes, ...this.markerMeshes]) {
      const keys = mesh.userData.regionKeys ?? [];
      const isPrimary = keys.some((key) => this.activePrimary.has(key));
      const isSecondary = !isPrimary && keys.some((key) => this.activeSecondary.has(key));

      if (mesh.userData.marker) mesh.visible = isPrimary || isSecondary;
      if (isPrimary) {
        mesh.material = PRIMARY_MATERIAL;
        mesh.renderOrder = 5;
      } else if (isSecondary) {
        mesh.material = SECONDARY_MATERIAL;
        mesh.renderOrder = 4;
      } else {
        mesh.material = mesh.userData.baseMaterial;
        mesh.renderOrder = mesh.userData.layer === "bone" ? 1 : 2;
      }
    }
    this.applyLayerOpacity();
  }

  applyLayerOpacity() {
    const muscleOpacity = this.layerMode === "skeleton" ? 0.1 : 1;
    const boneOpacity = this.layerMode === "skeleton" ? 0.96 : this.layerMode === "muscle" ? 0.035 : 0.14;

    for (const material of materialCache.values()) setOpacity(material, muscleOpacity);
    setOpacity(BONE_MATERIAL, boneOpacity);
    setOpacity(PRIMARY_MATERIAL, 1);
    setOpacity(SECONDARY_MATERIAL, 0.98);
  }

  setLayerMode(mode) {
    this.layerMode = mode;
    this.applyLayerOpacity();
  }

  focusRegions(regionKeys) {
    if (!this.ready) return;
    const box = new THREE.Box3();
    let found = false;
    for (const key of regionKeys) {
      for (const mesh of this.regionMeshes.get(key) ?? []) {
        if (!mesh.visible && mesh.userData.marker) continue;
        mesh.updateWorldMatrix(true, false);
        box.expandByObject(mesh);
        found = true;
      }
    }
    if (!found) return;
    const center = box.getCenter(new THREE.Vector3());
    center.x = this.shortMode ? -0.58 : center.x * 0.18;
    center.z = 0;
    center.y = THREE.MathUtils.clamp(center.y, 2.3, 5.1);
    this.targetGoal = center;
  }

  resetView() {
    const distance = this.compactMode ? 16.5 : 13.1;
    this.cameraGoal = new THREE.Vector3(0.15, 3.25, distance);
    this.targetGoal = new THREE.Vector3(this.shortMode ? -0.58 : 0, 3.2, 0);
    this.controls.autoRotate = false;
  }

  zoom(delta) {
    const direction = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
    const distance = this.camera.position.distanceTo(this.controls.target);
    const next = THREE.MathUtils.clamp(distance + delta, this.controls.minDistance, this.controls.maxDistance);
    this.cameraGoal = this.controls.target.clone().add(direction.multiplyScalar(next));
  }

  toggleAutoRotate() {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  onPointerMove(event) {
    if (!this.ready) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(this.raycastMeshes, false)[0];
    if (!hit?.object?.userData?.regionKeys?.length) {
      this.hideTooltip();
      return;
    }
    this.tooltip.textContent = hit.object.userData.regionLabel;
    this.tooltip.style.left = `${event.clientX - rect.left + 14}px`;
    this.tooltip.style.top = `${event.clientY - rect.top + 14}px`;
    this.tooltip.hidden = false;
    this.renderer.domElement.style.cursor = "crosshair";
  }

  hideTooltip() {
    this.tooltip.hidden = true;
    this.renderer.domElement.style.cursor = "grab";
  }

  resize() {
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    const aspect = width / height;
    const short = height < 320;
    const shortChanged = short !== this.shortMode;
    const compact = aspect < 0.82 || short;
    this.shortMode = short;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);

    if (compact !== this.compactMode || shortChanged) {
      this.compactMode = compact;
      this.controls.maxDistance = compact ? 19 : 14;
      const direction = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
      this.camera.position.copy(this.controls.target).add(direction.multiplyScalar(compact ? 16.5 : 13.1));
      this.controls.target.x = short ? -0.58 : 0;
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    const elapsed = this.clock.getElapsedTime();
    PRIMARY_MATERIAL.emissiveIntensity = 0.48 + (Math.sin(elapsed * 2.8) + 1) * 0.13;
    SECONDARY_MATERIAL.emissiveIntensity = 0.15 + (Math.sin(elapsed * 2.4) + 1) * 0.05;

    if (this.cameraGoal) {
      this.camera.position.lerp(this.cameraGoal, 0.075);
      if (this.camera.position.distanceTo(this.cameraGoal) < 0.02) this.cameraGoal = null;
    }
    if (this.targetGoal) {
      this.controls.target.lerp(this.targetGoal, 0.075);
      if (this.controls.target.distanceTo(this.targetGoal) < 0.015) this.targetGoal = null;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
