var _ = require('lodash'),
    externalise = require('../index.js');

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

    describe('third-party support', function () {
        it('works with lodash', function () {
            var lengths = _.map(["hello", "world!"], externalise('length'));
            lengths.length.should.equal(2);
            lengths[0].should.equal(5);
            lengths[1].should.equal(6);
        });
    });
});