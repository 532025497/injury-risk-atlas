# 运动损伤风险解剖图谱

Three.js 单页应用。20 项指标来自用户提供的 Excel；右侧显示原表阈值、文献修正、解剖映射和来源，左侧以带皮肤体表的三维人体同步标注主要与次要部位，并可切换肌肉和骨骼层。

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
- `assets/skin.glb`：BodyParts3D 完整皮肤体表网格（FMA7163）
- `assets/anatomy.glb`：467 个肌肉、肌腱与结缔组织网格
- `assets/skeleton.glb`：201 个骨骼网格
- `data.js`：20 项指标、解剖映射和来源数据
- `evidence-notes.md`：证据口径、逐项解释和参考文献
- `ATTRIBUTION.md`：BodyParts3D 与 Z-Anatomy 模型归属和许可证

## 解释边界

该页面用于筛查信息展示和后续评估定位。FMS、YBT、TMG、HRV、视觉任务和双侧差异都受测试协议与人群影响，不能单独用于医学诊断或个体损伤预测。

## 乙方解剖参考图工作台

访问 `/references/`。十课肌群预设、搜索与手动选择、黄色高亮、背景肌肉透明度、前后左右视角、自由缩放平移、2048/4096 像素 PNG 导出。默认保留周围肌肉；深层肌肉需要调低背景不透明度。图片不带界面文字，可分别导出透明或白色背景。

下载署名与许可说明后随素材交付。模型和图片适用对应 CC BY-SA 许可，不是无条件免署名素材。神经素材不在当前模型范围；课程预设不是逐动作审定稿。

浏览器验证：安装 Playwright 后启动静态服务 `python3 -m http.server 4173 --bind 127.0.0.1`，运行 `node tests/reference-studio.cjs`。

国内部署见 `DEPLOYMENT.md`。站点所需脚本与模型都在仓库内，不使用运行时外部 CDN。
