hot-require
===========
使用代理的方式让所有类和实例能够在js文件更改后, 对被代理对象进行替换, 实现热更新.
因为使用了代码对象, 所以当实际对象更新后, 依然能够让原实例找到新的实现.

proxy the target js object(use hot-require), update realSubject function and field when the js file changed.
because the code in memory are use the proxySubject, so all old instance can be updated when realSubject change.

Install

    npm install hot-require

Example
----------
    // require on the app start, just need require once only
    require('hot-require');

    // you can use the global function _require to require your js file.
    var yourJs = _require(__dirname, '[module or js name you want to hot reload]');