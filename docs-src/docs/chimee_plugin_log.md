# LogPlugin of Chimee

实现日志输出及打点上报逻辑，可用于异常跟踪等。
本插件继承自[popup插件](https://github.com/Chimeejs/chimee-plugin-popup)实现具备相应功能函数。

## 默认菜单基本用法

> 使用默认日志输出，不做定制或修改。

```javascript
import myLog from 'chimee-plugin-log';
Chimee.install(myLog);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [myLog.name]
});
// 打开日志输出
chimee[myLog.name].open();
// 关闭日志输出
chimee[myLog.name].close();
```
> 提示：打开后才开始有日志输出到textarea中，所以如果想看完整日志，可以选择“下次自动打开”，然后保证下一次开启页面后能从初始化开始自动输出日志。

效果示例：

![](https://p2.ssl.qhimg.com/dr/600__/t01093aadbd9d752527.png)

## 打点上报
> 通常我们需要将关键环节的日志信息上传到服务端，以生成观看报表、异常报表等数据分析内容。
> 你可以参考以下代码配置实现日志上报。

```javascript
import myLog from 'chimee-plugin-log';
Chimee.install(myLog);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [{
    name: myLog.name,
    // 告诉插件你有一个可以接受日志上报的服务端接口
    logPostUrl: 'https://myDomain.xx/log_push'
  }]
});
```
这样默认的关键环节将自动上报日志到服务端，除了相应时长数据，包含以下基本数据信息：
```
ref - location.href
pro - location.protocol
box - chimeeConfig.box
type - chimeeConfig.type
src - chimeeConfig.src
uid - 插件内部计算产生
ver - chimee 版本
evt - 日志名称
_t - 时间戳
_r - 随机数
```

目前系统插件默认会执行打点上报的环节包含：`loadstart` `canplay` `ended` `playing` `pause` `waiting` `timeout` `error` `destroy`。
其中的超时事件 `timeout` 对应默认等待载入时长 `logPlugin.timeoutDelay`，默认值为30000毫秒。

如果你想增加其他事件环节的打点，可以像下面这样实现：
```javascript
import myLog from 'chimee-plugin-log';
Chimee.install(myLog);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [{
    name: myLog.name,
    // 告诉插件你有一个可以接受日志上报的服务端接口
    logPostUrl: 'https://myDomain.xx/log_push',
    events: {
      play: () => {
        this.sendLog('日志名称', { src: this.src, 'myData': '想要上报的数据' });
      }
    }
  }]
});
```

如果你需要对输出或上报的打点数据进行加工，可以像下面这样实现：
```javascript
import myLog from 'chimee-plugin-log';
Chimee.install(myLog);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [{
    name: myLog.name,
    // 告诉插件你有一个可以接受日志上报的服务端接口
    logPostUrl: 'https://myDomain.xx/log_push',
    methods: {
      // 自定义loadstart环节输出日志包含的数据格式
      write_loadstart_log: (evt, logData) => {
        return Object.assign(logData, {
          src: this.src,
          'myData': '想要输出的数据'
        });
      },
      // 自定义loadstart环节上报日志包含的数据格式
      send_loadstart_log: (evt, logData) => {
        return Object.assign(logData, {
          src: this.src,
          'myData': '想要上报的数据'
        });
      }
    }
  }]
});
```

希望您用着方便，有相应问题请随时反馈。

