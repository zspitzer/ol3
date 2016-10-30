ol.provide('ol.sphere.WGS84');

ol.require('ol.Sphere');


/**
 * A sphere with radius equal to the semi-major axis of the WGS84 ellipsoid.
 * @const
 * @type {ol.Sphere}
 */
ol.sphere.WGS84 = new ol.Sphere(6378137);
