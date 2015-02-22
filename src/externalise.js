var externalise,
    externalisePrototype;

/**
 * 
 * @param  {[type]} fnName [description]
 * @return {[type]}        [description]
 */
externalise = function (fnName) {
    return function (obj) {
        var fn = obj[fnName],
            args = Array.prototype.slice.call(arguments).slice(1);

        if (!(fn instanceof Function)) {
            return obj[fnName];
        }

        return obj[fnName].apply(obj, args);
    };
};

/**
 * 
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
externalise.proto = function (obj) {
    var keys = Object.keys(obj.prototype),
        makeExternal = function (fnName) {
            return function (newObj) {
                var args = Array.prototype.slice.call(arguments).slice(1);
                return obj.prototype[fnName].apply(newObj, args);
            };
        },
        functions = {};

    for (var i = keys.length - 1; i >= 0; i--) {
        functions[keys[i]] = makeExternal(keys[i]);
    }

    return functions;
};

module.exports = externalise;