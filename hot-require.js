/**
 * Created by Surui on 2014/9/26.
 * E-Mail: surui.cc@gmail.com
 * github: https://github.com/rayosu/hot-require
 *
 */
var fs = require('fs');
var _cache = {};
var copyProperty = function(target, source){
    // proxy static function
    for (var key in source) {
        var property = source[key];
        if (typeof property == "function") {
            target[key] = function (_key) {
                return function () {
                    console.log('invoke static method: ' + _key);
                    source[_key].apply(source, arguments);
                }
            }(key)
        } else {
            // invalid when target is prototype
            Object.defineProperty(target, key, {
                get: function (_key) {
                    return function () {
                        console.log('getter: ' + _key);
                        return source[_key];
                    }
                }(key),
                set: function (_key) {
                    return function (value) {
                        console.log('setter: ' + _key + ' ,value: ' + value);
                        source[_key] = value;
                    }
                }(key)
            })
        }
    }
};
global._require = function (dirname, path) {
    var _path = require.resolve(dirname + '/' + path);
    if(_cache[_path]) return _cache[_path];

    var RealClass = require(_path);
    // constructor[execute property proxy handler when create Object]
    var Proxy = function () {
        var realObj = new RealClass(arguments);
        // proxy all realObj's property[field and method], use getter/setter on field, and use function proxy on function
        copyProperty(this, realObj);
    };
    // proxy static function
    copyProperty(Proxy, RealClass);
    // proxy prototype function
    copyProperty(Proxy.prototype, RealClass.prototype);
    // use 'watchFile' and not 'watch' to keep the callback invoke once one time when the file change.
    fs.watchFile(_path, function () {
        delete require.cache[_path];
        // update new js file
        RealClass = require(_path);
        console.log('update js: ' + _path);
    });

    _cache[_path] = Proxy;
    return Proxy;
};