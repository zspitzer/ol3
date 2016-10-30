ol.provide('ol.format.filter.GreaterThan');

ol.require('ol');
ol.require('ol.format.filter.ComparisonBinary');


/**
 * @classdesc
 * Represents a `<PropertyIsGreaterThan>` comparison operator.
 *
 * @constructor
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!number} expression The value to compare.
 * @extends {ol.format.filter.ComparisonBinary}
 * @api
 */
ol.format.filter.GreaterThan = function(propertyName, expression) {
  ol.format.filter.ComparisonBinary.call(this, 'PropertyIsGreaterThan', propertyName, expression);
};
ol.inherits(ol.format.filter.GreaterThan, ol.format.filter.ComparisonBinary);
