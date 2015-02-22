# externalise
Turn member functions into functions accepting object as an argument.

For example:

```js
var externalise = require('externalise');
var length = externalise('length');

length([1, 2, 3]);
// #=> 3
```

This is particularly useful when used in conjunction with higher-order functions like `map` from `lodash`.

```js
var _ = require('lodash');

_.map(["hello", "world!"], externalise('length'));
// #=> [5, 6]
```

Also provided is `externalise.proto`, which externalises all functions on an object's prototype.

```js
Identity = function (x) {
    this.value = x;
};

Identity.prototype.get = function () {
    return this.value;
};

Identity.prototype.set = function (value) {
    this.value = value;
    return this;
};

var externals = externalise.proto(Identity);

externals.get(new Identity(10));
// #=> 10

externals.set(new Identity(10), 100);
// #=> { value: 100 };
```

Lastly, feel free to rename your import `externalize` if the spelling is wrong in your region. :)