hot-require
=============

使用代理的方式让所有类和实例能够在js文件更改后, 对被代理对象进行替换, 实现热更新.
因为使用了代码对象, 所以当实际对象更新后, 依然能够让原实例找到新的实现.


proxy the target js object(use hot-require), update realSubject function and field when the js file changed.
because the code in memory are use the proxySubject, so all old instance can be updated when realSubject change.

==============

    npm install hot-require

Example
==============

#### 1. Setting 配置

######  require 'hot-require' on the app start, just need require once only
(default to watch all file used "_require")
###### 必须在项目的最开头引入, 监听所有通过_require引用的js文件的改动
```javascript
require('hot-require');
```


#### 2. Use Example 使用例子

###### after version 0.0.7,  you can call it without __dirname:
```javascript
var yourJs = _require('[module or js name you want to hot reload]');
```