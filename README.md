# 运动损伤风险解剖图谱

Three.js 单页应用。20 项指标来自用户提供的 Excel；右侧显示原表阈值、文献修正、解剖映射和来源，左侧以三维人体同步标注主要与次要部位。

在线访问：https://532025497.github.io/injury-risk-atlas/

手机版：https://532025497.github.io/injury-risk-atlas/mobile/

## 本地运行

在本目录启动任意静态文件服务器，例如：

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173/`。

Three.js、OrbitControls 和 Lucide 均已放在 `vendor/`，页面运行时不依赖外部 CDN。

## 文件

- `index.html`：页面结构
- `mobile/`：独立的手机竖屏/横屏界面
- `styles.css`：桌面与移动端样式
- `app.js`：筛选、搜索、指标选择和界面更新
- `anatomy.js`：Three.js 分层人体与部位标注
- `assets/anatomy.glb`：467 个肌肉、肌腱与结缔组织网格
- `assets/skeleton.glb`：201 个骨骼网格
- `data.js`：20 项指标、解剖映射和来源数据
- `evidence-notes.md`：证据口径、逐项解释和参考文献
- `ATTRIBUTION.md`：BodyParts3D 与 Z-Anatomy 模型归属和许可证

## 解释边界

该页面用于筛查信息展示和后续评估定位。FMS、YBT、TMG、HRV、视觉任务和双侧差异都受测试协议与人群影响，不能单独用于医学诊断或个体损伤预测。
