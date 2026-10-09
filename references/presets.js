export const presets = [
 {name:'01 手腕与肘部训练',terms:['flexor digitorum profundus','flexor digitorum superficialis','extensor digitorum$','carpi','pronator','supinator','brachioradialis','pollicis'],view:'front',note:'前臂屈伸肌、旋前旋后肌与拇指肌群。当前模型不包含可选神经；神经滑动需另配神经路径素材。'},
 {name:'02 肩袖和颈部训练',terms:['supraspinatus','infraspinatus','subscapularis','teres minor','trapezius','serratus anterior','sternocleidomastoid','longus colli','longus capitis'],view:'back',note:'肩袖四肌、肩胛控制与颈部肌群。肩袖深层可降低背景不透明度查看。'},
 {name:'03 核心稳定训练',terms:['rectus abdominis','external oblique','internal oblique','transversus abdominis','multifidus lumborum','multifidus thoracis','iliocostalis lumborum','iliocostalis thoracis','longissimus thoracis','spinalis thoracis','spinalis$','quadratus lumborum'],view:'front',note:'腹壁、脊柱稳定与腰背肌群。'},
 {name:'04 髋部力量训练',terms:['gluteus','iliacus','psoas','adductor longus','adductor brevis','adductor magnus','adductor minimus','pectineus','gracilis','piriformis'],view:'back',note:'臀肌、髋屈肌、内收肌与深层旋转肌；可单独勾选肌肉分部。'},
 {name:'05 膝关节功能训练',terms:['rectus femoris','vastus','biceps femoris','semitendinosus','semimembranosus','popliteus'],view:'front',note:'股四头肌、腘绳肌与腘肌；骨骼用于膝关节位置参考。'},
 {name:'06 足踝稳定训练',terms:['gastrocnemius','soleus','tibialis','fibularis','peroneus','flexor hallucis','extensor hallucis','of left foot','of right foot'],view:'back',note:'小腿三头肌、踝周肌与足内在肌。'},
 {name:'07 本体感觉训练',terms:['gluteus medius','gluteus minimus','tibialis','fibularis','soleus'],view:'front',note:'预设显示髋踝控制相关肌群；本体感觉并非单块肌肉的功能。'},
 {name:'08 功能性训练',terms:['gluteus','rectus abdominis','external oblique','internal oblique','serratus anterior','trapezius'],view:'front',note:'展示跨部位肌群关系，可按具体动作增减选择。'},
 {name:'09 基础力量训练',terms:['pectoralis major','latissimus dorsi','deltoid','biceps brachii','triceps brachii','gluteus','vastus','rectus femoris'],view:'front',note:'上下肢主要力量肌群；按动作选取目标。'},
 {name:'10 恢复再生训练',terms:['trapezius','latissimus','gluteus','rectus femoris','vastus','biceps femoris','semitendinosus','semimembranosus','gastrocnemius','soleus'],view:'back',note:'常见拉伸及放松区域。解剖图只显示部位，不代表滚压或训练效果。'}
];
export const glossary = {
 'flexor digitorum longus':'趾长屈肌','flexor digitorum brevis':'趾短屈肌','extensor digitorum longus':'趾长伸肌','flexor digitorum':'指屈肌','extensor digitorum':'指伸肌','carpi':'腕肌','pronator':'旋前肌','supinator':'旋后肌','pollicis':'拇指肌','brachioradialis':'肱桡肌',
 'supraspinatus':'冈上肌','infraspinatus':'冈下肌','subscapularis':'肩胛下肌','teres minor':'小圆肌','trapezius':'斜方肌','serratus anterior':'前锯肌','sternocleidomastoid':'胸锁乳突肌','longus colli':'颈长肌','longus capitis':'头长肌',
 'rectus abdominis':'腹直肌','external oblique':'腹外斜肌','internal oblique':'腹内斜肌','transversus abdominis':'腹横肌','multifidus':'多裂肌','iliocostalis':'髂肋肌 / 竖脊肌','longissimus':'最长肌 / 竖脊肌','spinalis':'棘肌 / 竖脊肌','quadratus lumborum':'腰方肌',
 'gluteus maximus':'臀大肌','gluteus medius':'臀中肌','gluteus minimus':'臀小肌','iliacus':'髂肌','psoas':'腰大肌','adductor':'内收肌','piriformis':'梨状肌',
 'rectus femoris':'股直肌 / 股四头肌','vastus':'股肌 / 股四头肌','biceps femoris':'股二头肌 / 腘绳肌','semitendinosus':'半腱肌 / 腘绳肌','semimembranosus':'半膜肌 / 腘绳肌','popliteus':'腘肌',
 'gastrocnemius':'腓肠肌','soleus':'比目鱼肌','tibialis anterior':'胫骨前肌','tibialis posterior':'胫骨后肌','fibularis':'腓骨肌','peroneus':'腓骨肌','flexor hallucis':'拇长屈肌','extensor hallucis':'拇长伸肌','pectoralis major':'胸大肌','latissimus dorsi':'背阔肌','deltoid':'三角肌','biceps brachii':'肱二头肌','triceps brachii':'肱三头肌'
};
export function normalizedName(name) { return name.toLowerCase().replace(/_/g,' ').replace(/\s+/g,' ').trim(); }
export function displayName(name){const n=normalizedName(name);const key=Object.keys(glossary).find(k=>n.includes(k));return key ? `${glossary[key]} · ${n}` : n;}

export function matchesPreset(name,preset){
 const n=normalizedName(name).replace(/ \(\d+\)$/,'');
 return preset.terms.some(term=>new RegExp(`\\b${term}\\b`.replace('$\\b','$')).test(n));
}
