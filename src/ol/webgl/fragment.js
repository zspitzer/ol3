ol.provide('ol.webgl.Fragment');

ol.require('ol');
ol.require('ol.webgl');
ol.require('ol.webgl.Shader');


/**
 * @constructor
 * @extends {ol.webgl.Shader}
 * @param {string} source Source.
 * @struct
 */
ol.webgl.Fragment = function(source) {
  ol.webgl.Shader.call(this, source);
};
ol.inherits(ol.webgl.Fragment, ol.webgl.Shader);


/**
 * @inheritDoc
 */
ol.webgl.Fragment.prototype.getType = function() {
  return ol.webgl.FRAGMENT_SHADER;
};
