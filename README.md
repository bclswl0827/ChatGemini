# ChatGemini

ChatGemini 是一个基于 Google Gemini 的网页客户端，对标 ChatGPT 3.5，使用逻辑同 ChatGPT 3.5 一致，同时支持在聊天中上传图片，自动调用 Gemini-Pro-Vision 模型进行识图。

本项目还可自定义 Gemini API 服务器地址，用户可将本项目部署至支持 PHP 的服务器或虚拟主机上，或是自行配置 Nginx 反向代理，透过修改 Gemini API 路径，从而在中国大陆无障碍使用。

如果你对本项目感兴趣，欢迎 Star 和 Fork。

## 功能

 - [x] 仿 ChatGPT 3.5 界面
 - [x] 支持多轮聊天对话
 - [x] 支持上传图片进行识别
 - [x] 逐字输出（SSE）回应
 - [x] 集成 PHP 版反向代理
 - [x] 自定义 Gemini API 地址
 - [x] 对话内容保存至本地
 - [x] 聊天内容导出（HTML 和 PDF）

## 演示

体验该站点需要翻墙。

[ChatGemini](https://ibcl.us/ChatGemini)

## 预览

移动端点击图片可查看大图。

|     功能      |                                                   预览                                                   |
| :-----------: | :------------------------------------------------------------------------------------------------------: |
|    主界面     |        ![主界面](https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/home.png)        |
|   多轮聊天    |       ![多轮聊天](https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/chat.png)       |
|   附件识图    |    ![附件识图](https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/attachment.png)    |
| 逐字输出回应  |     ![逐字输出回应](https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/sse.png)      |
| 聊天导出 HTML | ![聊天导出 HTML](https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/export_html.png) |
| 聊天导出 PDF  |  ![聊天导出 PDF](https://raw.githubusercontent.com/bclswl0827/ChatGemini/master/preview/export_pdf.png)  |

## 部署

确保已安装 [Node.js](https://nodejs.org/zh-cn/) 和 [Git](https://git-scm.com/)，且已经得到 Gemini API 密钥。

有关 Gemini API 的申请，请前往 [Google AI Studio](https://makersuite.google.com/app/apikey)。

准备工作完成后，执行以下步骤：

 1. 将仓库 clone 至本地
```bash
$ git clone https://github.com/bclswl0827/ChatGemini
```
 1. 进入项目目录
```bash
$ cd ChatGemini
```
 1. 安装依赖
```bash
$ npm install
```
 1. 修改配置
> 参考下方的 [配置](#配置) 章节
 1. 构建项目
```bash
$ npm run build
```
 1. 部署项目
> 将 `build` 目录下的文件部署至服务器或虚拟主机上
 1. 部署成功

## 配置

项目基础配置位于根目录下的 `.env` 文件中，可根据需要进行修改。

|          配置项          | 必填 | 可选值          | 默认值       | 说明                                     |
| :----------------------: | :--- | :-------------- | :----------- | :--------------------------------------- |
| REACT_APP_GEMINI_API_KEY | 是   | `string`        | 空           | 填入申请得到的 Gemini API 密钥           |
| REACT_APP_GEMINI_API_URL | 否   | `string`        | 空           | 自定义 Gemini API 地址，具体参考下方说明 |
| REACT_APP_GEMINI_API_SSE | 否   | `true`\|`false` | `true`       | 是否逐字输出 Gemini 回应，即是否使能 SSE |
|   REACT_APP_TITLE_SITE   | 否   | `string`        | `ChatGemini` | 站点标题，将显示在浏览器标签页上         |
|  REACT_APP_TITLE_HEADER  | 否   | `string`        | `Gemini Pro` | 应用名称，显示在应用菜单栏和头部         |

 - 若要直连 Gemini API，请将 `.env` 中的 `REACT_APP_GEMINI_API_URL` 字段留空。
 - 若要使用 Nginx 反向代理，请将 `.env` 中的 `REACT_APP_GEMINI_API_URL` 修改为反向代理后的地址，例如 `https://example.org/api`。
 - 若要使用集成的 PHP 反向代理，请将 `.env` 中的 `REACT_APP_GEMINI_API_URL` 字段修改为 `/gemini.php?token=<访问密码>&path=`，其中 `<访问密码>` 不同于 Gemini API 密钥，需自行于 `public/gemini.php` 中修改。

## 开源许可

本项目基于 MIT 协议开源，具体请参阅 [LICENSE](https://github.com/bclswl0827/ChatGemini/blob/master/LICENSE)
