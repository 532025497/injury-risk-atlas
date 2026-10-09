const assert=require('node:assert/strict');
const mapping=require('../assets/mesh_mapping.json');
(async()=>{
 const {presets,normalizedName,matchesPreset}=await import('../references/presets.js');
 const select=(i)=>mapping.filter(m=>matchesPreset(m.name,presets[i])).map(m=>normalizedName(m.name));
 const wrist=select(0);assert.ok(wrist.some(n=>n.includes('flexor digitorum profundus')));
 assert.ok(!wrist.some(n=>/digitorum (longus|brevis)/.test(n)),'wrist must exclude foot flexors/extensors');
 const shoulder=select(1);assert.ok(!shoulder.some(n=>/fibularis|hallucis|adductor/.test(n)),'shoulder must exclude lower-limb long muscles');
 const core=select(2);assert.ok(!core.some(n=>/superior oblique|inferior oblique|arytenoid|pollicis|hallucis/.test(n)),'core must exclude eye/throat/digit obliques');
 assert.ok(core.some(n=>n.includes('iliocostalis lumborum')),'core must include lumbar erector spinae');
 const hip=select(3);assert.ok(!hip.some(n=>/pollicis|hallucis/.test(n)),'hip must exclude thumb/toe adductors');
 console.log('PASS: region-safe preset mappings');
})().catch(e=>{console.error(e);process.exit(1)});
