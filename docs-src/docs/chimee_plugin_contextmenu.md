# ContextmenuPlugin of Chimee

> 右键菜单UI插件，可实现自定义菜单项及相应交互，效果参见[Demo](./demo/index.html)

## 默认菜单基本用法

> 使用默认菜单项，不做定制或修改。

```javascript
import contextmenu from 'chimee-plugin-contextmenu';
Chimee.install(contextmenu);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [contextmenu.name]
});
```
> 提示：默认菜单项中的“查看日志”，依赖 `chimee-plugin-log` 插件的装载。

效果示例：

![](https://p2.ssl.qhimg.com/dr/600__/t013b8a3bc80f678ea0.png)

## 增加自定义菜单项
> 在保留默认菜单的基础上，添加自己需要的菜单项。

```javascript
import contextmenu from 'chimee-plugin-contextmenu';
Chimee.install(contextmenu);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [{
    name: contextmenu.name,
    menus: [
      {
        text: '暂停',
        action: 'menu-pause'
      }
    ]
  }]
});
player.on('menu-pause', function() {
  console.log('我要暂停了');
  // 通知播放器暂停
  player.emit('pause');
});
```
通过上例看，菜单项的`action`可以触发播放器实例事件，所以也即是所菜单项的 `action` 在插件内部会作为 `player.emit('menu-pause')` 执行。

所以，如果你只是想实现暂停菜单，我们可以简化菜单项的 `action` 值，从 `menu-pause` 改为`pause`，就可以了（因为chimee的实现上已经支持通过该途径触发暂停或播放等基本操作）。

这么以来，如果我们要实现右键的播放暂停也就可以省掉 `player.on('menu-pause', ()=>{})` 了。下面我们结合这一点了解一下另一种实现方式。

## 在默认菜单基础上动态更新自定义菜单项
> 在保留默认菜单的基础上，通过API动态实现自己需要的菜单项。

```javascript
import contextmenu from 'chimee-plugin-contextmenu';
Chimee.install(contextmenu);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [contextmenu.name]
});
// 访问播放器菜单插件实例
const menusPlugin = player.chimeeContextmenu;
player.on('play', () => {
  // 当播放器处于播放状态时，自定义菜单项显示暂停
  menusPlugin.updatemenu([{text: '暂停', action: 'pause'}]);
}).on('pause', () => {
  // 当播放器处于状态暂停时，自定义菜单项显示播放
  menusPlugin.updatemenu([{text: '播放', action: 'play'}]);
});
```
这样一个跟随播放状态切换的菜单项就实现了。

效果示例：

![](https://p0.ssl.qhimg.com/dr/600__/t0152f1dafd30e6fd7c.png)

那么为什么要一直显示基础菜单项呢，要去掉怎么做呢？ 

## 全自定义菜单
> 不保留默认菜单，添加自己需要的菜单项。

```javascript
import contextmenu from 'chimee-plugin-contextmenu';
Chimee.install(contextmenu);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [{
    name: contextmenu.name,
    baseMenus: [], // 这里我们告诉插件，不需要基础菜单项，当然也用来定义想要的基础菜单项
    menus: [
      {
        text: '暂停',
        action: 'pause'
      },
      {
        text: 'copyright 360 vs: {VERSION}',
        disable: true
      },
      {
        text: '我是一个新窗口打开的连接',
        url: 'http://chimee.org'
      }
    ]
  }]
});
```

效果示例：

![](https://p3.ssl.qhimg.com/dr/600__/t01e0f5dd57e220e60b.png)

欢迎使用、反馈您的建议。


