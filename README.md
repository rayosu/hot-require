使用代理的方式让所有类和实例能够在js文件更改后, 对被代理对象进行替换, 实现热更新.
能够支持直接绑定在function下的函数, 支持绑定在prototype下的函数变动的热更新, 并且不影响初始化后的实例对象的属性值.
理论上是支持实例化后的pojo对象prototype自动热更新. 但我主要用在逻辑的js上面,开发的过程之中不需要反复去重启nodejs服务器.

// require on the app start, just need require once only
require('hot-require');

// use example:
// you can use the global function _require to require your js file.
var yourJs = _require(__dirname, '[module or js name you want to hot reload]');