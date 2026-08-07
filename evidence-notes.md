# 运动损伤监测指标：证据口径与解剖标注说明

版本：2026-08-07

## 这份文档怎么用

本文把 Excel 中的 20 项指标转换成网页可用的测量定义和人体标注。Excel 原值全部保留，但不把表内的“达标值”“危险值”自动视为临床界值。只有在人群、测试协议和统计依据相符时，论文中的阈值才可用于判定。

网页采用两级标注：

- 主要部位：测试直接观察或直接测量的结构，以及完成动作所必需的关节或肌群。
- 次要部位：负责稳定、力量传递或可能限制表现的功能链。次要标注不表示该组织已有损伤。

红色表示主要部位，橙色表示次要功能链。所有标注都是筛查解释，不是诊断结论。

## 证据整合原则

1. 优先采用国际标准、系统综述、Meta-analysis、原始方法论文和前瞻性队列研究。
2. 把“测试测到了什么”与“低分可能由什么造成”分开。筛查结果通常不能定位到单一组织。
3. 对 FMS、YBT、TMG、HRV 和视觉任务保留协议条件。不同人群、设备、测试方向或算法的数据不能直接互换。
4. 当 Excel 的界值缺少外部证据时，明确写成“系统内部规则”。这类界值可用于本系统内的趋势管理，但需要后续本地常模和效度研究。

## 结论先行

- FMS 是动作筛查，不是损伤诊断。综合分 `<=14` 在部分人群中与后续损伤仅有小幅关联，不能单独预测某个运动员是否会受伤。[Bonazza et al., 2017](https://pubmed.ncbi.nlm.nih.gov/27159297/)；[Moran et al., 2017](https://pubmed.ncbi.nlm.nih.gov/28360142/)
- YBT 必须记录方向和标准化方法。`前向`左右差 `>4 cm` 以及女性高中篮球运动员综合分 `<94%` 有经典前瞻性证据；这不能证明 Excel 中后内侧差值或 `<85%` 是通用界值。[Plisky et al., 2006](https://pubmed.ncbi.nlm.nih.gov/17193868/)
- TMG 的 `Td`、`Tc` 和 `Dm` 都是单块浅表肌肉在固定协议下的机械反应参数。它们没有跨肌肉通用的 30、50、100 ms 或 70% 界值。[Macgregor et al., 2018](https://pubmed.ncbi.nlm.nih.gov/29605838/)；[Čular et al., 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10330706/)
- HRV 必须写明具体指标，例如 RMSSD 或 SDNN，并固定体位、时段、记录长度和设备。55/50 ms 不能作为跨人群损伤界值。[ESC/NASPE Task Force, 1996](https://pubmed.ncbi.nlm.nih.gov/8598068/)
- 视觉反应、动态视觉和视觉决策依赖设备与任务。毫秒值或点击数只有在同一协议内才可比较。
- 下肢双侧差 `10%/15%` 是常见实践规则，不是稳定的生物学分界；必须同时报告测试任务、计算公式和差异方向。[Maloney, 2019](https://pubmed.ncbi.nlm.nih.gov/29742749/)
- “核心稳定评分 0-100”不是通行量表。若继续使用 80/60，系统需要公开子测试、权重和终止标准。

## 指标逐项说明

### 1. 心率变异性

测量定义：连续窦性心搏间期的波动。运动监测常用 RMSSD、lnRMSSD、SDNN 等指标，它们不是同一个量。

Excel 原值：范围 55-105 ms；达标值 55 ms；危险值 `<50 ms`。

文献判断：固定毫秒值无法跨年龄、体位、记录时长和设备解释。运动员监测更适合比较个人滚动基线，并与训练负荷、睡眠、症状和表现一起看。Bellenger 等的系统综述支持 HRV 用于训练状态监测，但不支持把单一绝对值作为损伤诊断线。

解剖标注：主要标心脏和自主神经中枢；次要标颈部自主神经通路与胸廓。这里表示生理调节链，不表示脑或心脏受伤。

### 2. 简单视觉反应

测量定义：从视觉刺激出现到规定动作反应完成的总时间，包含视觉输入、中枢加工和运动执行。

Excel 原值：范围 280-380 ms；达标值 300 ms；危险值 `>360 ms`。

文献判断：结果受显示延迟、刺激亮度、按键设备、优势手、练习次数和任务规则影响。300/360 ms 可作为同一设备、同一协议下的内部规则，不能写成通用临床界值。

解剖标注：主要标双眼、脑、前臂与手；次要标颈部和肩带稳定链。

### 3. 动态视觉能力

测量定义：Excel 的名称可能指动态视敏度、平滑追踪、扫视或移动目标识别。这些任务的构念不同。

Excel 原值：范围 50-200 ms；达标值 50-100 ms；危险值 `>200 ms`。

文献判断：正式采集前必须补充任务名称、目标速度、显示距离、正确率算法和设备延迟。不同视觉任务的毫秒值不能合并成同一常模。

解剖标注：主要标双眼与视觉/眼动中枢；次要标头颈稳定区域。

### 4. 视觉决策能力

测量定义：目标识别、选择性注意、反应抑制、决策和手部执行组成的复合任务。

Excel 原值：范围 10-40 次；达标值 30 次；危险值 10 次。

文献判断：点击数必须与测试时长、目标总数、假阳性、遗漏率和设备延迟一起报告。单独用 10 次不能跨任务判定功能受损。

解剖标注：主要标双眼、额顶叶相关中枢与双手；次要标前臂和肩带执行链。

### 5. FMS 深蹲

测量定义：检查双侧髋、膝、踝功能活动度；过顶杆同时要求肩部和胸椎活动度，并考察躯干控制。

Excel 原值：0-3 分；3 分达标；0 分或 1 分列为危险。

文献判断：FMS 的 0 分表示测试中出现疼痛，应转入进一步检查。1 分表示动作不能按标准完成。低分不能直接诊断某一块肌肉紧张或某一个关节损伤。

解剖标注：主要标双侧髋、膝、踝、肩和胸椎；次要标核心、骨盆与足部控制。

### 6. FMS 跨栏步

测量定义：在步态样动作中观察单腿站立稳定、跨步腿髋膝踝活动、双侧髋差异与骨盆/躯干控制。

Excel 原值：0-3 分；3 分达标；0 分或 1 分列为危险。

文献判断：站立腿与跨步腿承担的任务不同，左右侧必须分别记录。界面同时标注双侧下肢，是为了呈现完整运动链，不代表两侧问题相同。

解剖标注：主要标双侧髋、膝、踝和骨盆；次要标核心、臀肌与足部。

### 7. FMS 直线弓箭步

测量定义：窄支撑面下检查髋和踝的活动/稳定、膝稳定、股四头肌柔韧性，以及躯干抗旋转与平衡。

Excel 原值：0-3 分；3 分达标；0 分或 1 分列为危险。

文献判断：前后腿的活动与稳定要求不同。低分可能来自髋活动受限、膝踝控制不足、髋内外侧控制或胸椎活动限制，需要后续测试区分。

解剖标注：主要标髋、膝、踝和股四头肌；次要标髋内收肌、臀部、核心与胸椎。

### 8. FMS 肩部灵活性

测量定义：组合一侧肩内旋/内收与另一侧肩外旋/外展，同时要求肩胛运动和胸椎伸展。

Excel 原值：0-3 分；3 分达标；0 分或 1 分列为危险。

文献判断：胸小肌、背阔肌、肩袖或肩胛胸廓控制都可能影响结果。低分不能单独定位组织；疼痛清除试验阳性应进入进一步评估。

解剖标注：主要标双肩、肩胛和胸椎；次要标胸部、上臂与核心。

### 9. FMS 主动直腿上抬

测量定义：检查下肢与躯干分离时的主动腘绳肌和腓肠-比目鱼肌柔韧性，同时要求对侧髋伸展和骨盆/核心稳定。

Excel 原值：0-3 分；3 分达标；0 分或 1 分列为危险。

文献判断：髂腰肌柔韧性、骨盆位置和对侧稳定都可能限制结果。测试反映的是动作表现，不是单独的被动腘绳肌长度。

解剖标注：主要标腘绳肌、小腿后侧和髋；次要标骨盆、核心与腰椎区域。

### 10. FMS 躯干稳定俯卧撑

测量定义：在对称上肢闭链推起时观察矢状面躯干稳定，要求身体整体抬起，腰椎不塌陷或滞后。

Excel 原值：0-3 分；3 分达标；0 分或 1 分列为危险。

文献判断：动作重点是抗伸展稳定。肩、肘、腕参与承重，但低分不能直接等同于腹肌无力。疼痛清除试验阳性记 0 分并转入进一步评估。

解剖标注：主要标前后侧核心、胸椎和腰椎；次要标肩、上臂和腕部。

### 11. FMS 旋转稳定性

测量定义：四点支撑下组合上肢与下肢运动，检查多平面躯干稳定、神经肌肉协调和跨躯干力量传递。

Excel 原值：0-3 分；3 分达标；0 分或 1 分列为危险。

文献判断：重点是躯干抗旋转，但肩胛、肩、髋和支撑肢也参与控制。低分需要结合左右侧表现和疼痛清除试验解释。

解剖标注：主要标核心、胸腰椎和骨盆；次要标肩胛、肩、髋与臀部。

### 12. FMS 综合评分

测量定义：7 个动作的得分总和。双侧项目取较低侧；测试中出现疼痛的项目记 0 分。

Excel 原值：0-21 分；达标值 `>=17`；危险值 `<=14`。

文献判断：Moran 等的 Meta-analysis 在男性军人中发现 `<=14` 与后续损伤的合并风险比为 1.47（95% CI 1.22-1.77），关联强度小且研究间存在异质性。该界值不能独立预测个体损伤，也不能跨人群直接外推。Excel 的 `>=17` 同样不是通用达标线。

解剖标注：综合分对应全身关键运动链；网页以全身多区域标注，避免把总分误指向单一部位。

### 13. TMG 反应时间 Td

测量定义：从电刺激开始到肌腹径向位移达到 Dm 的 10% 所需的时间。

Excel 原值：达标值 `<30 ms`；危险值 `>50 ms`。

文献判断：Td 是局部肌肉的机械延迟，不是全身反应时。它受被测肌肉、体位、电极和传感器位置影响，30/50 ms 不能作为所有肌肉的统一界值。

解剖标注：主要标当前选定的 TMG 肌肉测点；邻近膝踝只作为功能链提示。

### 14. TMG 收缩时间 Tc

测量定义：位移曲线上升段从 10% Dm 到 90% Dm 的时间。

Excel 原值：达标值 `<50 ms`；危险值 `>100 ms`。

文献判断：Tc 不是“达到 10%-90% 最大收缩力”的时间。不同肌肉、人群和项目有不同分布，固定 50/100 ms 不能脱离测试协议使用。

解剖标注：主要标当前选定的 TMG 肌肉测点；相关关节属于次要功能链。

### 15. TMG 最大径向位移 Dm

测量定义：单次电刺激诱发等长抽搐时，传感器记录的肌腹最大径向位移。

Excel 原值：达标值参考个人基线；危险值 `<基线 70%`。

文献判断：Dm 测量肌腹位移，不是肌腱位移。相对基线变化可以用于纵向监测，但 70% 需要同一设备、同一肌肉、重复测量可靠性和最小可检测变化支持。

解剖标注：只标当前 TMG 肌肉测点；邻近肌腱不作为直接测量对象。

### 16. TMG 功能对称性

测量定义：比较双侧同名肌或主动肌/拮抗肌的 TMG 参数。结果取决于参数选择和计算公式。

Excel 原值：参考 80 分；危险值 `<80`。

文献判断：“功能对称性”不是单一原始参数。正式系统需要公开公式、肌肉配对、差异方向和最小可靠变化。80 可暂时保留为内部规则，不能写成诊断界值。

解剖标注：主要标左右同名的股四头肌、腘绳肌和小腿肌；次要标膝、踝与骨盆。

### 17. 下肢双侧肢体力量差值

测量定义：比较左右下肢在同一测试中的输出差。测试可以是等速肌力、单腿跳、等长拉力或测力台任务，但结果不能混用。

Excel 原值：达标值 `<10%`；危险值 `>15%`。

文献判断：10% 和 15% 常用于实践分层，但研究未证明它们是稳定的损伤或表现分界。应同时保存任务、指标、计算公式、优势侧和差异方向。

解剖标注：主要标双侧臀、股前侧、股后侧和小腿肌群；次要标髋膝踝关节链。

### 18. YBT 综合评分

测量定义：单腿站立时向前、后内和后外三个方向触及。综合分通常按 `(三方向最大距离之和)/(腿长 x 3) x 100` 计算。

Excel 原值：达标值 `>=95%`；危险值 `<85%`。

文献判断：Plisky 等在女性高中篮球运动员中观察到综合分 `<94%` 与下肢损伤相关。该结果受性别、年龄、项目和研究设计限制，不能证明 95/85 是通用分界。测试前需要充分练习，并记录腿长测量方法。

解剖标注：主要标双侧髋、膝、踝与足部；次要标臀腿肌群、骨盆和核心。

### 19. YBT 对称性

测量定义：比较左右侧在同一触及方向的距离差。必须保留方向，不能只存一个“对称性”总值。

Excel 原值：达标值 `<4 cm`；危险值 `>8 cm`；表内方向写为后内侧。

文献判断：Plisky 2006 支持的是前向触及左右差 `>4 cm`，不是后内侧。方向不能互换，`>8 cm` 也缺少通用高风险证据。建议修正数据库字段，保存前向、后内、后外三个方向。

解剖标注：主要标左右承重侧髋、膝、踝与足部；次要标臀部、骨盆和核心。

### 20. 核心稳定评分

测量定义：Excel 没有说明量表构成。若要保留 0-100 分，应明确腹桥、侧桥、背桥或旋转任务的项目、权重、时间上限和终止标准。

Excel 原值：达标值 `>=80`；危险值 `<60`。

文献判断：Prieske 等的 Meta-analysis 支持躯干肌力训练能够改善部分体能指标，但躯干肌力与运动表现的关联通常较小。文献中没有统一的 0-100 核心稳定评分。80/60 只能标为系统内部规则。

解剖标注：主要标腹壁、斜肌、背伸肌、胸腰椎和骨盆；次要标臀部、肩带与髋部支撑链。

## 上线前需要补齐的数据字段

| 指标组 | 必填字段 |
| --- | --- |
| HRV | 指标名称、记录时长、体位、时段、设备、伪差处理、个人基线窗口 |
| 视觉测试 | 任务名称、测试时长、刺激参数、显示延迟、反应设备、正确率和错误类型 |
| FMS | 左右侧分数、疼痛清除试验、测试员、测试日期、视频或备注 |
| TMG | 肌肉名称、左右侧、体位、电极位置、传感器位置、刺激强度、重复次数、算法版本 |
| 双侧力量 | 测试任务、输出指标、左右值、差异公式、优势侧、可靠性或最小可检测变化 |
| YBT | 三个方向原始距离、左右侧、腿长、练习次数、无效试次和综合分公式 |
| 核心评分 | 子测试、权重、终止标准、常模人群和评分版本 |

## 来源质量与用途

| 来源 | 研究类型 | 本项目用途 |
| --- | --- | --- |
| Cook et al., 2014，Part 1/2 | FMS 原始方法说明 | 7 个动作的目的、评分和可能限制因素 |
| Cook, 2011 | 专业书籍 | FMS 筛查、评估与纠正策略的原始体系 |
| Bonazza et al., 2017 | 系统综述与 Meta-analysis | FMS 可靠性、效度与预测价值 |
| Moran et al., 2017 | 系统综述与 Meta-analysis | FMS `<=14` 的人群限制与效应大小 |
| Plisky et al., 2006 | 前瞻性队列 | YBT/SEBT 前向差值和特定人群综合分界 |
| Plisky et al., 2009 | 可靠性研究 | YBT 仪器化测试的重复性与协议 |
| Gribble et al., 2012 | 系统综述 | SEBT/YBT 方法和临床解释 |
| Macgregor et al., 2018 | 批判性综述 | TMG 参数、可靠性和应用限制 |
| Čular et al., 2023 | 叙述性综述 | Td、Tc、Dm 的操作定义 |
| Paravlic, 2025 | 系统综述、Meta-analysis、Meta-regression | TMG 参考值必须按肌肉和人群解释 |
| ESC/NASPE Task Force, 1996 | 国际标准 | HRV 测量与解释规范 |
| Bellenger et al., 2016 | 系统综述与 Meta-analysis | 运动员训练状态的 HRV 监测 |
| Shaffer & Ginsberg, 2017 | 综述 | HRV 指标和常模的定义差异 |
| Appelbaum & Erickson, 2018 | 同行评审综述 | 运动视觉任务和数字训练的协议差异 |
| Maloney, 2019 | 批判性综述 | 双侧差异与运动表现关系的不确定性 |
| Prieske et al., 2016 | 系统综述与 Meta-analysis | 躯干肌力、训练与运动表现关系 |

## 参考文献

1. Cook, G., Burton, L., Hoogenboom, B. J., & Voight, M. L. (2014). Functional movement screening: The use of fundamental movements as an assessment of function, Part 1. *International Journal of Sports Physical Therapy, 9*(3), 396-409. [PMC4060319](https://pmc.ncbi.nlm.nih.gov/articles/PMC4060319/)
2. Cook, G., Burton, L., Hoogenboom, B. J., & Voight, M. L. (2014). Functional movement screening: The use of fundamental movements as an assessment of function, Part 2. *International Journal of Sports Physical Therapy, 9*(4), 549-563. [PMC4127517](https://pmc.ncbi.nlm.nih.gov/articles/PMC4127517/)
3. Bonazza, N. A., Smuin, D., Onks, C. A., Silvis, M. L., & Dhawan, A. (2017). Reliability, validity, and injury predictive value of the Functional Movement Screen: A systematic review and meta-analysis. *American Journal of Sports Medicine, 45*(3), 725-732. [doi:10.1177/0363546516641937](https://doi.org/10.1177/0363546516641937)
4. Moran, R. W., Schneiders, A. G., Mason, J., & Sullivan, S. J. (2017). Do Functional Movement Screen composite scores predict subsequent injury? A systematic review with meta-analysis. *British Journal of Sports Medicine, 51*(23), 1661-1669. [doi:10.1136/bjsports-2016-096938](https://doi.org/10.1136/bjsports-2016-096938)
5. Plisky, P. J., Rauh, M. J., Kaminski, T. W., & Underwood, F. B. (2006). Star Excursion Balance Test as a predictor of lower extremity injury in high school basketball players. *Journal of Orthopaedic & Sports Physical Therapy, 36*(12), 911-919. [doi:10.2519/jospt.2006.2244](https://doi.org/10.2519/jospt.2006.2244)
6. Plisky, P. J., Gorman, P. P., Butler, R. J., Kiesel, K. B., Underwood, F. B., & Elkins, B. (2009). The reliability of an instrumented device for measuring components of the Star Excursion Balance Test. *North American Journal of Sports Physical Therapy, 4*(2), 92-99. [PMC2953327](https://pmc.ncbi.nlm.nih.gov/articles/PMC2953327/)
7. Gribble, P. A., Hertel, J., & Plisky, P. (2012). Using the Star Excursion Balance Test to assess dynamic postural-control deficits and outcomes in lower extremity injury: A literature and systematic review. *Journal of Athletic Training, 47*(3), 339-357. [doi:10.4085/1062-6050-47.3.08](https://doi.org/10.4085/1062-6050-47.3.08)
8. Macgregor, L. J., Hunter, A. M., Orizio, C., Fairweather, M. M., & Ditroilo, M. (2018). Assessment of skeletal muscle contractile properties by radial displacement: The case for tensiomyography. *Sports Medicine, 48*(7), 1607-1620. [doi:10.1007/s40279-018-0912-6](https://doi.org/10.1007/s40279-018-0912-6)
9. Čular, D., et al. (2023). Tensiomyography: From muscle assessment to talent identification tool. *Frontiers in Physiology, 14*, 1163078. [doi:10.3389/fphys.2023.1163078](https://doi.org/10.3389/fphys.2023.1163078)
10. Paravlic, A. H. (2025). Establishing reference values for tensiomyography-derived parameters in soccer players: Insights from a systematic review, meta-analysis and meta-regression. *Biology of Sport, 42*(1), 83-97. [doi:10.5114/biolsport.2025.139853](https://doi.org/10.5114/biolsport.2025.139853)
11. Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology. (1996). Heart rate variability: Standards of measurement, physiological interpretation and clinical use. *Circulation, 93*(5), 1043-1065. [PMID 8598068](https://pubmed.ncbi.nlm.nih.gov/8598068/)
12. Bellenger, C. R., et al. (2016). Monitoring athletic training status through autonomic heart rate regulation: A systematic review and meta-analysis. *Sports Medicine, 46*(10), 1461-1486. [doi:10.1007/s40279-016-0484-2](https://doi.org/10.1007/s40279-016-0484-2)
13. Shaffer, F., & Ginsberg, J. P. (2017). An overview of heart rate variability metrics and norms. *Frontiers in Public Health, 5*, 258. [PMC5624990](https://pmc.ncbi.nlm.nih.gov/articles/PMC5624990/)
14. Appelbaum, L. G., & Erickson, G. (2018). Sports vision training: A review of the state-of-the-art in digital training techniques. *International Review of Sport and Exercise Psychology, 11*(1), 160-189. [doi:10.1080/1750984X.2016.1266376](https://doi.org/10.1080/1750984X.2016.1266376)
15. Maloney, S. J. (2019). The relationship between asymmetry and athletic performance: A critical review. *Journal of Strength and Conditioning Research, 33*(9), 2579-2593. [doi:10.1519/JSC.0000000000002608](https://doi.org/10.1519/JSC.0000000000002608)
16. Prieske, O., Muehlbauer, T., & Granacher, U. (2016). The role of trunk muscle strength for physical fitness and athletic performance in trained individuals: A systematic review and meta-analysis. *Sports Medicine, 46*(3), 401-419. [doi:10.1007/s40279-015-0426-4](https://doi.org/10.1007/s40279-015-0426-4)
17. Cook, G. (2011). *Movement: Functional Movement Systems: Screening, assessment, and corrective strategies*. On Target Publications.

## 限制

这不是系统综述，也没有对全部运动人群建立常模。当前证据足以修正指标定义、阻止明显错误外推，并为 3D 标注提供解剖和功能链依据。正式用于运动员管理前，还需要在目标人群中完成测试者培训、重复性评估、设备校准和前瞻性效度研究。

本文件由 AI 辅助完成文献检索、交叉核对和文字整合。正式用于临床、科研或产品规则前，应由运动医学专业人员复核原文、测试协议和目标人群适用性。
