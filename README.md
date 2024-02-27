# ChatGemini

ChatGemini 是一个基于 Google Gemini 的网页客户端，对标 ChatGPT 3.5，使用逻辑同 ChatGPT 3.5 一致，同时支持在聊天中上传图片，自动调用 Gemini-Pro-Vision 模型进行识图。

本项目还可自定义 Gemini API 服务器地址，用户可将本项目部署至支持 PHP 的服务器或虚拟主机上，或是自行配置 Nginx 反向代理，通过修改 Gemini API 路径，从而在中国大陆无障碍使用。

如果您对本项目感兴趣，欢迎 Star 和 Fork。

## 演示站点（需翻墙）

[ChatGemini](https://ibcl.us/ChatGemini)

## 讨论群组

欢迎加入 Telegram 群组，同其他用户交流，反馈问题或建议，也可以在群组中了解最新动态。

加入群组，请友善交流。

 - [ChatGemini@Telegram](https://t.me/+iHpQPT3hTDtlNDM1)

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
 - 在 AI 回应中运行 Python 代码

## 界面预览

<details><summary>点击展开网页效果</summary>

|     功能      |                                                           预览                                                           |
| :-----------: | :----------------------------------------------------------------------------------------------------------------------: |
|    主界面     |        <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/home.png" alt="主界面" />        |
|   多轮聊天    |       <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/chat.png" alt="多轮聊天" />       |
|   附件识图    |    <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/attachment.png" alt="附件识图" />    |
|  执行 Python  |    <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/python.png" alt="执行 Python" />    |
| 逐字输出回应  |     <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/sse.png" alt="逐字输出回应" />      |
| 聊天导出 HTML | <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/export_html.png" alt="聊天导出 HTML" /> |
| 聊天导出 PDF  |  <img src="https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/export_pdf.png" alt="聊天导出 PDF" />  |

</details>

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

 7. 启动服务（可选）
> 若在本地运行，执行
```bash
$ npm run start
```

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
> 若要在 Docker 版本中启用自动设定的 Nginx 反向代理，请将 `REACT_APP_GEMINI_API_URL` 变量值设为 `__use_nginx__`，即在创建容器时加上 `--env REACT_APP_GEMINI_API_URL="__use_nginx__"` 参数
 3. 访问应用
> 访问 `http://<IP>:8080` 即可

### Vercel 部署

本项目支持 Vercel 一键部署，点击下方按钮即可部署至 Vercel 平台。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbclswl0827%2FChatGemini&env=REACT_APP_GEMINI_API_KEY&envDescription=REACT_APP_GEMINI_API_KEY%20is%20essential&envLink=https%3A%2F%2Fgithub.com%2Fbclswl0827%2FChatGemini%2Fblob%2Fmaster%2FREADME.md&demo-title=ChatGemini&demo-url=https%3A%2F%2Fibcl.us%2FChatGemini&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fbclswl0827%2FChatGemini%2Fmaster%2Fsrc%2Fassets%2Flogo.svg)

模板中仅留下了必填的 `REACT_APP_GEMINI_API_KEY` 变量， 在部署完成过后，若需修改或新增配置，请前往 Vercel 控制台，点击对应项目，再点击 `Settings` -> `Environment Variables` 进行修改。修改完成后，需要在 Vercel 控制台重新触发部署，以使新配置生效。

## 保持更新

### 若使用手动部署

若使用手动部署，可透过以下步骤保持更新：

 1. 进入项目目录
```bash
$ cd ChatGemini
```
 2. 拉取最新代码
```bash
$ git pull
```
 3. 安装依赖
```bash
$ npm install
```
 4. 重新构建项目
```bash
$ npm run build
```
 5. 部署项目
 6. 重启服务

### 若使用 Docker 部署

若是使用传统 `docker run` 指令部署的版本，可透过以下步骤保持更新：

 1. 删除旧容器
```bash
$ docker rm -f chatgemini
```
 2. 拉取最新镜像
```bash
$ docker pull ghcr.io/bclswl0827/chatgemini
```
 3. 运行新容器
```bash
$ docker run -d \
    --name chatgemini \
    --restart always \
    --publish 8080:8080 \
    --env REACT_APP_GEMINI_API_KEY="您的密钥" \
    ghcr.io/bclswl0827/chatgemini
```

若是使用 `docker-compose` 指令部署的版本，可透过以下步骤保持更新：

 1. 进入 `docker-compose.yml` 所在目录
 2. 拉取最新镜像
```bash
$ docker-compose pull
```
 3. 重启容器
```bash
$ docker-compose up -d --remove-orphans
```
1. 移除旧镜像（可选）
```bash
$ docker image prune
```

### 若使用 Vercel 部署

使用 Vercel 部署的项目，平台会在用户 GitHub 仓库创建一个新仓库，而不是 Fork 本仓库，因此无法正确检测更新。请按照下列步骤手动更新：

 1. 删掉由 Vercel 创建的仓库
 2. 使用页面右上角的 Fork 按钮，Fork 本项目
 3. 在 Vercel 重新选择并部署 Fork 后的项目并完成部署

Fork 后的仓库，由于 GitHub 存在限制，需要手动去您 Fork 后仓库的 Actions 页面启用 Workflows，并启用 Upstream Sync Action，启用之后即可开启每小时定时自动同步上游代码。

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

### 站点通行码

启用通行码后，用户在每次访问应用时，需要先输入通行码，才能开始使用应用。

若要为您的站点启用通行码，可以在 `.env` 中的 `REACT_APP_PASSCODE_MD5` 字段填入 MD5 格式的通行码，多个以 `|` 分隔，例如：

```bash
REACT_APP_PASSCODE_MD5="E10ADC3949BA59ABBE56E057F20F883E|C33367701511B4F6020EC61DED352059"
```

要生成 MD5 格式的通行码，可以使用相关在线工具，例如 [MD5 Hash Generator](https://passwordsgenerator.net/md5-hash-generator/)。

**注意：本应用通行码为无盐值 MD5 格式，有一定概率被破解，因此请勿将您的重要密码作为通行码。**

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

### Netlify 反向代理 Gemini API

Netlify 亦可以用于反向代理 Gemini API，有关使用方法和部署链接，请前往 [antergone/palm-netlify-proxy](https://github.com/antergone/palm-netlify-proxy) 查看。

部署好应用过后，分配的域名以 `example.netlify.app` 为例，即：

```bash
REACT_APP_GEMINI_API_URL="https://example.netlify.app"
```

### Cloudflare Worker 反向代理 Gemini API
通过[Cloudflare Worker](https://dash.cloudflare.com/])也能快速反向代理Gemini API，快速
，易用，安全。有关使用方法和部署链接，可以前往[CattleZone/Gemini-Proxy](https://github.com/CattleZoe/Gemini-proxy)查看。

部署好应用过后，分配的域名以`example.workers.dev`为例，即

```bash
REACT_APP_GEMINI_API_URL="https://example.workers.dev"
```

### Cloudflare Worker 反向代理 Gemini API

通过 [Cloudflare Workers](https://workers.cloudflare.com) 也能实现反向代理 Gemini API。有关使用方法和部署链接，可以前往 [CattleZone/Gemini-Proxy](https://github.com/CattleZoe/Gemini-proxy) 查看。

**需要注意，由于 Cloudflare Workers 默认分配的域名（以 `.dev` 结尾）在中国大陆无法访问，因此需要另行绑定域名。**

部署好应用并绑定好域名后，以 `api.example.com` 为例，即

```bash
REACT_APP_GEMINI_API_URL="https://api.example.com"
```

## 开源许可

本项目基于 MIT 协议开源，具体请参阅 [LICENSE](https://github.com/bclswl0827/ChatGemini/blob/master/LICENSE)

![Star History Chart](https://api.star-history.com/svg?repos=bclswl0827/ChatGemini&type=Date)
