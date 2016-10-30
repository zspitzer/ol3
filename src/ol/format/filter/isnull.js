ol.provide('ol.format.filter.IsNull');

ol.require('ol');
ol.require('ol.format.filter.Comparison');


/**
 * @classdesc
 * Represents a `<PropertyIsNull>` comparison operator.
 *
 * @constructor
 * @param {!string} propertyName Name of the context property to compare.
 * @extends {ol.format.filter.Comparison}
 * @api
 */
ol.format.filter.IsNull = function(propertyName) {
  ol.format.filter.Comparison.call(this, 'PropertyIsNull', propertyName);
};
ol.inherits(ol.format.filter.IsNull, ol.format.filter.Comparison);
