goog.provide('ol.test');
goog.require('ol');

describe('getUid()', function() {
  it('is constant once generated', function() {
    var a = {};
    expect(ol.getUid(a)).to.be(ol.getUid(a));
  });

  it('generates a strictly increasing sequence', function() {
    var a = {} , b = {}, c = {};
    ol.getUid(a);
    ol.getUid(c);
    ol.getUid(b);

    //uid order should be a < c < b
    expect(ol.getUid(a)).to.be.lessThan(ol.getUid(c));
    expect(ol.getUid(c)).to.be.lessThan(ol.getUid(b));
    expect(ol.getUid(a)).to.be.lessThan(ol.getUid(b));
  });
});

describe('ol.provide()', function() {
  afterEach(function() {
    delete ol._test;
  });

  it('creates objects that do not already exist', function() {
    expect(ol._test).to.be(undefined);

    ol.provide('ol._test.namespace.Foo');
    expect(ol._test.namespace).to.eql({});

    ol._test.namespace.Foo = {};

    ol.provide('ol._test.namespace.bar.Bam');
    expect(ol._test.namespace.bar).to.eql({});
    expect(ol._test.namespace.Foo).to.eql({});
  });

  it('throws for names outside the ol namespace', function() {
    var call = function() {
      ol.provide('foo.bar.Bam');
    };
    expect(call).to.throwException();
  });

});
