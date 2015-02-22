var externalise = require('../index.js');

describe('externalise', function () {
    describe('#externalise', function () {
        it('should return the proper length', function () {
            var length = externalise('length');

            length([1, 2, 3]).should.equal(3);
        });
    });

    describe('#externalise.proto', function () {
        var Identity,
            externals;

        before(function () {
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

            externals = externalise.proto(Identity);
        });

        it('should get the Identitys value', function () {
            externals.get(new Identity(10)).should.equal(10);
        });

        it('should set the Identitys value', function () {
            externals.set(new Identity(10), 100).value.should.equal(100);
        });
    });
});