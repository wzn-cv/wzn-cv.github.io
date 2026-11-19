# Zhennan Wang — Academic Homepage

一个**可直接部署到 GitHub Pages 的个人学术主页**。纯静态 HTML + CSS + JavaScript，没有服务器、数据库、Node.js 构建步骤，也没有付费依赖。

主页内容：About / Research / Projects / CogAD 视频展示 / Publications / News / Experience & Education。

> 内容基于截至 **2026 年 11 月 19 日**提供的简历、项目资料以及已公开的论文与项目页面整理。英文为主要展示语言，适合学术展示与国际同行访问。

## 1. 一步步发布到 GitHub Pages

### 方式 A：使用 GitHub 账号的首页域名（推荐）

1. 登录 GitHub，点击 **New repository**。
2. 仓库名称写成 **`你的GitHub用户名.github.io`**。例如，如果账号是 `wzn-cv`，就创建 `wzn-cv.github.io`。注意：仓库名称必须和自己的 GitHub 用户名一致。
3. 建议设置为 **Public**。
4. 将本 ZIP 文件**解压**，把 `zhennan-homepage` 文件夹**内部的所有文件和子文件夹**上传到仓库根目录。必须保证主页文件路径是仓库根目录的 `index.html`，而不是 `zhennan-homepage/index.html`。
5. 在仓库里打开 **Settings → Pages → Build and deployment**：选择 **Deploy from a branch**，Branch 为 `main`，Folder 为 `/ (root)`，点击 **Save**。
6. 发布完成后访问 `https://你的GitHub用户名.github.io/`。

### 方式 B：使用其他仓库名称

比如创建仓库 `homepage`，则默认地址是：`https://你的GitHub用户名.github.io/homepage/`。这个网站的静态资源全部使用相对路径，**无需修改代码**。

### 本地查看

直接双击 `index.html` 就可以浏览布局。视频浏览如遇到浏览器本地访问限制，可以在这个文件夹打开终端执行：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000`。也可以使用 VS Code 的 Live Server。

## 2. 文件结构

```text
zhennan-homepage/
├── index.html              # 所有主页文字和链接，主要修改这里
├── styles.css              # 页面设计、字体、颜色、响应式排版
├── script.js               # 论文筛选、手机菜单、视频弹窗
├── assets/
│   ├── portrait.jpg        # 头像
│   ├── gensight-*.webp     # GenSight 附件图片
│   ├── xworld-illustration.svg
│   ├── shennong-illustration.svg
│   └── *.webp              # CogAD 视频封面
├── videos/
│   └── *.mp4               # 9 段供网页直接播放的 CogAD 视频
├── .nojekyll               # 告知 GitHub Pages 不运行 Jekyll
├── README.md               # 本说明
└── CONTENT_NOTES.md        # 内容来源及发布前检查事项
```

全部内容在 ZIP 中，本地媒体均为网站内文件，不依赖第三方视频平台；仅 Google Fonts 会请求在线字体，离线状态会自动使用系统字体。

## 3. 常见修改

**更换头像**：直接替换 `assets/portrait.jpg`（保留文件名即可）。

**修改个人介绍、职务、邮箱**：在 `index.html` 中搜索 `Zhennan Wang`、`Foundation Model Lead`、`mailto:` 并修改。

**添加 News**：搜索 `class="news-list"`，复制一个 `<div class="news-item"> ... </div>` 并改日期和文字。

**添加论文**：搜索 `class="publication-list"`，复制一个 `<article class="pub-item" ...>`；`data-topic` 用 `world`、`driving` 或 `vision`，支持多个标签（例如 `world driving`），论文筛选会自动生效。

**添加演示视频**：复制 `assets/` 图片和 `videos/` mp4，编辑 `class="demo-grid"` 中的 `<button class="demo-card" ...>`。`data-video` 是视频路径，`data-title` 是弹出播放器的标题。

**修改配色与字体**：编辑 `styles.css` 的 `:root{...}`，其中 `--blue` 为主题色，`--canvas` 为页面底色。

**设置自定义域名**：在 GitHub Pages 的 **Custom domain** 设置域名，并根据 GitHub 文档在域名服务商配置 DNS；建议同时启用 **Enforce HTTPS**。文档：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## 4. 发布前请核对

- 网站当前使用简历中的联系邮箱 `18001279185@163.com`。**该邮箱包含手机号，发布前请判断是否更换为不含手机号的学术/工作邮箱。** 联系邮箱只出现在链接中，未在页面正文直接展示。
- CogAD 视频来自你提供的 `Downloads.zip`；本版本精选并压缩了 9 段供网页播放，没有直接包含完整原始 76 MB 文件，以免主页过重。请确认所有视频可公开。
- X-World 和鹏程·神农的图片是明确标记的**概念性插图**，不是官方论文实验可视化；GenSight 使用你提供的项目资料中的真实配图。
- 隐空间世界模型只在 Research 里作为方向出现，没有公布未公开论文的名称、结果与技术方案。
- 鹏程·神农的荣誉准确表述为 **2022 ACM Gordon Bell COVID-19 Special Prize Finalist（入围）**，**不是获得特别奖**。
- 论文列表是**精选代表作**，Google Scholar 链接提供完整动态列表；未把仅预印本的 CogAD / GenSight / X-World 写成已录用顶会论文。
- 更新 `News` 中已过时的时间和内容，并根据个人偏好决定是否放工作邮箱、个人 CV PDF。

## 5. 进一步维护

这个项目不需要 GitHub Actions。修改文件并提交到 `main` 分支即可自动更新页面。电脑端及手机端均已做响应式布局；视频使用原生 HTML5 播放器，不需要外部库。
