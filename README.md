# 文档聚合工具
用于按照`docs-src/config.js`中的配置，拉取GitHub中相应的`*.md`文档，放置到`docs-src/docs`目录，最终生成文档及导航到`docs`目录。

在这里以[Chimee播放器文档](http://chimee.org/docs)聚合作为实现示例。

## 开始

执行 `npm install` 安装依赖，进行环境初始化。

## 配置
1. 导航与文档映射关系配置：`docs-src/config.js`
   
   JSON中key是导航或菜单的描述，`md_fname`是生成静态化HTML页面的名称，`md_url`是Markdown文档获取路径。
   
2. 页面模板配置：`docs-src/layout/page.html`
3. 左侧导航生成：`docs-src/layout/helpers/navs_helper.js`

	另外子菜单（文档索引导航）生成来自正文部分的`{{>toc}}`，和页脚部分的JavaScript。

4. 文档同步脚本：`docs-src/tools/sync-docs.js`，基于`config.js`的映射配置拉取。

## 同步Markdown文档
执行 `npm run sync-docs` 逐个遍历配置、并按配置URL拉取对应文档到本地目录。

## 编译
执行 `npm run rebuild` 将拉取的文档编译为静态HTML页面到`docs`目录中。

## 快捷操作

执行 `npm run build` 一次完成文件拉取、编译。

## 发布
复制`docs`、`static`目录到相应站点，并建立链接。


