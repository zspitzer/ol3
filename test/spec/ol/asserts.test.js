ol.provide('ol.asserts.asserts.test');

ol.require('ol.asserts');


describe('ol.asserts', function() {

  describe('ol.asserts.assert', function() {
    it('throws an exception', function() {
      expect(function() {
        ol.asserts.assert(false, 42);
      }).to.throwException();
    });
  });

});
