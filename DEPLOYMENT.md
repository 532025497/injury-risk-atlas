# 国内访问部署

本项目为静态网站，无后端和运行时外部 CDN。发布应包含 assets/ 与 vendor/ 全部文件，不能仅上传 HTML。乙方入口为 /references/；原图谱在根目录。

## 腾讯云 CloudBase

将完整静态代码包上传到已有静态网站托管环境。首页为 index.html，乙方使用 /references/ 链接。生产环境绑定自有域名、启用 HTTPS。

官方说明：https://cloud.tencent.com/document/product/876/46900 。默认域名用于开发测试场景，正式乙方交付需核对限制并配置正式域名。

## 阿里云 OSS

上传全站静态文件，设置静态网站首页 index.html。使用自定义域名及 HTTPS。中国大陆地域的自定义域名按平台要求完成备案；中国香港地域作为不具备大陆备案条件时的可选部署地域。

官方说明：https://www.alibabacloud.com/help/en/oss/user-guide/hosting-static-websites 。香港部署是否满足乙方实际网络应实测，不把地域选择等同于国内访问保证。

## 交付验收

1. 国内网络打开 /references/，确认模型加载完成，并切换十课预设。
2. 导出 PNG 与署名文件；确认 2048/4096 尺寸、透明背景和目标高亮。
3. 使用手机实际访问；检查所有模型同域加载。
4. 提供正式 HTTPS 链接。GitHub Pages 链接仅为原有站点，不代表国内访问已验收。

截至本次交付，国内托管账号、环境和域名尚未提供，国内生产部署未执行。
