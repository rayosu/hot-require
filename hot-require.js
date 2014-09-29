/**
 * Created by Surui on 2014/9/26.
 * E-Mail: surui.cc@gmail.com
 * github: https://github.com/rayosu/hot-require
 */
var fs = require('fs');
global._require = function (dirname, path) {
    var _path = require.resolve(dirname + '/' + path);
    var RealClass = require(_path);
    // constructor[execute property proxy handler when create Object]
    var Proxy = function () {
        var realObj = new RealClass(arguments);
        // proxy all realObj's property[field and method], use getter/setter on field, and use function proxy on function
        for (var propertyName in realObj) {
            var property = realObj[propertyName];
            if (typeof property == "function") {
                this[propertyName] = function (_propertyName) {
                    return function () {
                        console.log('invoke property method: ' + _propertyName);
                        realObj[_propertyName].apply(realObj, arguments);
                    }
                }(propertyName);
            } else {
                Object.defineProperty(this, propertyName, {
                    get: function (_propertyName) {
                        return function () {
                            console.log('getter: ' + _propertyName);
                            return realObj[_propertyName];
                        }
                    }(propertyName),
                    set: function (_propertyName) {
                        return function (value) {
                            console.log('setter: ' + _propertyName + ' ,value: ' + value);
                            realObj[_propertyName] = value;
                        }
                    }(propertyName)
                })
            }
        }
    };
    // proxy static function
    for (var key in RealClass) {
        Proxy[key] = function (_key) {
            return function () {
                console.log('invoke static method: ' + _key);
                RealClass[_key].apply(RealClass, arguments);
            }
        }(key)
    }
    // proxy prototype function
    for (var key in RealClass.prototype) {
        Proxy.prototype[key] = function (_key) {
            return function () {
                console.log('invoke method: ' + _key);
                RealClass.prototype[_key].apply(RealClass, arguments);
            }
        }(key)
    }
    // use 'watchFile' and not 'watch' to keep the callback invoke once one time when the file change.
    fs.watchFile(_path, function () {
        delete require.cache[_path];
        // update new js file
        RealClass = require(_path);
        console.log('update js: ' + _path);
    });
    return Proxy;
};
