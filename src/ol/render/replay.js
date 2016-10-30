ol.provide('ol.render.replay');

ol.require('ol.render.ReplayType');


/**
 * @const
 * @type {Array.<ol.render.ReplayType>}
 */
ol.render.replay.ORDER = [
  ol.render.ReplayType.POLYGON,
  ol.render.ReplayType.LINE_STRING,
  ol.render.ReplayType.IMAGE,
  ol.render.ReplayType.TEXT
];
