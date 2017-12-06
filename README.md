# Chimee 文档聚合工具
这是chimee文档聚合工具，用于按照`docs-src/config.js`中的配置，从对应`md_url`拉取相应的`*.md`文档，放置到`docs-src/docs`目录，生成文档及导航到`docs`目录。
## 开始

执行 `npm install` 进行环境初始化。

## 配置
适当修改`docs-src/config.js`中的配置进行导航调整，JSON中key是导航或菜单的描述，`md_fname`是生成静态化HTML页面的名称，`md_url`是Markdown文档获取路径。

## 同步Markdown文档
执行 `npm run sync-docs` 逐个遍历配置、并按配置URL拉取对应文档到本地目录。

## 编译
执行 `npm run rebuild` 将拉取的文档编译为静态HTML页面到`docs`目录中。

## 快捷操作

执行 `npm run build` 一次完成文件拉取、编译。

## 发布
复制`docs`、`static`目录到相应站点，并建立链接。


