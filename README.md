# ChatGemini

ChatGemini 是一个基于 Google Gemini 的网页客户端，对标 ChatGPT 3.5，使用逻辑同 ChatGPT 3.5 一致，同时支持在聊天中上传图片，自动调用 Gemini-Pro-Vision 模型进行识图。

本项目还可自定义 Gemini API 服务器地址，用户可将本项目部署至支持 PHP 的服务器或虚拟主机上，或是自行配置 Nginx 反向代理，透过修改 Gemini API 路径，从而在中国大陆无障碍使用。

如果您对本项目感兴趣，欢迎 Star 和 Fork。

## 功能特性

 - 适配移动端
 - 支持多 API 密钥分流
 - 操作逻辑同 ChatGPT
 - 仿 ChatGPT 3.5 界面
 - 支持多轮聊天对话
 - 支持上传图片进行识别
 - 逐字输出（SSE）回应
 - 集成 PHP 版反向代理
 - 自定义 Gemini API 地址
 - 可启用站点通行码防止滥用
 - 聊天内容导出（HTML 和 PDF）
 - 对话内容保存在 IndexedDB 中

## 演示站点（需翻墙）

[ChatGemini](https://ibcl.us/ChatGemini)

## 界面预览

|     功能      |                                                           预览                                                           |
| :-----------: | :----------------------------------------------------------------------------------------------------------------------: |
|    主界面     |        <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/home.png" alt="主界面" />        |
|   多轮聊天    |       <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/chat.png" alt="多轮聊天" />       |
|   附件识图    |    <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/attachment.png" alt="附件识图" />    |
| 逐字输出回应  |     <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/sse.png" alt="逐字输出回应" />      |
| 聊天导出 HTML | <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/export_html.png" alt="聊天导出 HTML" /> |
| 聊天导出 PDF  |  <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/export_pdf.png" alt="聊天导出 PDF" />  |

## 应用部署

请确保您已经得到 Gemini API 密钥，有关 Gemini API 的申请，请前往 [Google AI Studio](https://makersuite.google.com/app/apikey)。

### 手动部署

确保已安装 [Node.js](https://nodejs.org/zh-cn/) 和 [Git](https://git-scm.com/)。

准备工作完成后，执行以下步骤：

 1. 将仓库 clone 至本地
```bash
$ git clone https://github.com/bclswl0827/ChatGemini
```
 2. 进入项目目录
```bash
$ cd ChatGemini
```
 3. 安装依赖
```bash
$ npm install
```
 4. 修改配置
> 参考下方的 [应用配置](#应用配置) 章节
 5. 构建项目
```bash
$ npm run build
```
 6. 部署项目
> 将 `build` 目录下的文件部署至服务器或虚拟主机上

### Docker 部署

确保服务器上已安装 [Docker](https://www.docker.com/)，然后执行以下步骤：

 1. 拉取镜像
```bash
$ docker pull ghcr.io/bclswl0827/chatgemini
```
 2. 运行容器
```bash
$ docker run -d \
    --name chatgemini \
    --restart always \
    --publish 8080:8080 \
    --env REACT_APP_GEMINI_API_KEY="您的密钥" \
    ghcr.io/bclswl0827/chatgemini
```
 3. 访问应用
> 访问 `http://<IP>:8080` 即可

### Vercel 部署

本项目支持 Vercel 一键部署，点击下方按钮即可部署至 Vercel 平台。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbclswl0827%2FChatGemini&env=REACT_APP_GEMINI_API_KEY&envDescription=REACT_APP_GEMINI_API_KEY%20is%20essential&envLink=https%3A%2F%2Fgithub.com%2Fbclswl0827%2FChatGemini%2Fblob%2Fmaster%2FREADME.md&demo-title=ChatGemini&demo-url=https%3A%2F%2Fibcl.us%2FChatGemini&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fbclswl0827%2FChatGemini%2Fmaster%2Fsrc%2Fassets%2Flogo.svg)

*在部署完成过后，若需修改或新增配置，请前往 Vercel 控制台，点击对应项目，再点击 `Settings` -> `Environment Variables` 进行修改。修改完成后，需要在 Vercel 控制台重新触发部署，以使新配置生效。*

## 应用配置

项目基础配置位于根目录下的 `.env` 文件中，手动部署时，请创建该文件并根据实际情况进行配置；若使用 Docker 方式部署，请在创建容器时传入 `--env` 参数进行配置。

配置格式均为 `KEY="VALUE"`，建议使用双引号包裹值，例如：

```bash
REACT_APP_GEMINI_API_KEY="您的密钥"
```

各配置项说明如下：

|           配置项           | 必填 | 可选值               | 默认值       | 说明                                     | 备注                                       |
| :------------------------: | :--- | :------------------- | :----------- | :--------------------------------------- | :----------------------------------------- |
| `REACT_APP_GEMINI_API_KEY` | 是   | `string`\|`string[]` | 空           | 填入 Gemini API 密钥，多个以 `\|` 分隔   | 存在多个密钥时，每次应用加载时随机选用一个 |
| `REACT_APP_GEMINI_API_URL` | 否   | `string`             | 空           | 自定义 Gemini API 地址，具体参考下方说明 | 无                                         |
| `REACT_APP_GEMINI_API_SSE` | 否   | `true`\|`false`      | `true`       | 是否逐字输出 Gemini 回应，即是否使能 SSE | 无                                         |
|   `REACT_APP_TITLE_SITE`   | 否   | `string`             | `ChatGemini` | 站点标题，将显示在浏览器标签页上         | 无                                         |
|  `REACT_APP_TITLE_HEADER`  | 否   | `string`             | `Gemini Pro` | 应用标题，显示在应用侧边栏和头部         | 无                                         |
|  `REACT_APP_PASSCODE_MD5`  | 否   | `string`\|`string[]` | 空           | MD5 格式通行码，多个以 `\|` 分隔         | 存在多个通行码时，任意一个通过验证即可登入 |

### 直连 Gemini API

若要直连 Gemini API，请将 `.env` 中的 `REACT_APP_GEMINI_API_URL` 字段留空，即：

```bash
REACT_APP_GEMINI_API_URL=""
```

### Nginx 反向代理 Gemini API

若要使用 Nginx 反向代理，请将 `.env` 中的 `REACT_APP_GEMINI_API_URL` 修改为反向代理后的地址，例如 `https://example.org/api`，即：

```bash
REACT_APP_GEMINI_API_URL="https://example.org/api"
```

*若反代同网站位于相同基础路径下，也可简写为 `/api`，跨域则须填写完整地址。*

下面是一个 Nginx 反代配置示例供参考，路径以 `/api` 为例：

```nginx
location /api {
    proxy_http_version 1.1;
    proxy_read_timeout 86400s;
    proxy_cache off; # 注意关闭缓存
    proxy_buffering off; # 注意关闭缓冲
    proxy_pass https://generativelanguage.googleapis.com/;
}
```

### PHP 反向代理 Gemini API

若部署平台不允许修改 Nginx 配置，但是提供 PHP 环境，或是您有闲置的 PHP 虚拟主机，可以考虑使用项目集成的 PHP 反向代理，脚本位于 `public/gemini.php`。

要使用 PHP 反向代理，**请修改 PHP 脚本中的 `ACCESS_TOKEN` 定义后**，将 PHP 脚本上传到相应平台，再修改 `.env` 中的 `REACT_APP_GEMINI_API_URL` 为 `https://example.org/gemini.php?token=<您定义的 Access Token>&path=`。

Access Token 以 `Nt6PRcQ2BZ8FY9y7Lnk35S` 为例，即：

```bash
REACT_APP_GEMINI_API_URL="https://example.org/gemini.php?token=Nt6PRcQ2BZ8FY9y7Lnk35S&path="
```

*若反代同网站位于相同基础路径下，也可简写为 `/gemini.php?token=Nt6PRcQ2BZ8FY9y7Lnk35S&path=`，跨域则须填写完整地址。*

### 站点通行码

启用通行码后，用户在每次访问应用时，需要先输入通行码，才能开始使用应用。

若要为您的站点启用通行码，可以在 `.env` 中的 `REACT_APP_PASSCODE_MD5` 字段填入 MD5 格式的通行码，多个以 `|` 分隔，例如：

```bash
REACT_APP_PASSCODE_MD5="E10ADC3949BA59ABBE56E057F20F883E|C33367701511B4F6020EC61DED352059"
```

要生成 MD5 格式的通行码，可以使用相关在线工具，例如 [MD5 Hash Generator](https://passwordsgenerator.net/md5-hash-generator/)。

**注意：本应用通行码为无盐值 MD5 格式，有一定概率被破解，因此请勿将您的重要密码作为通行码。**

## 开源许可

本项目基于 MIT 协议开源，具体请参阅 [LICENSE](https://github.com/bclswl0827/ChatGemini/blob/master/LICENSE)
