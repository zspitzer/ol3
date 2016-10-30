ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.control');
ol.require('ol.layer.Tile');
ol.require('ol.source.OSM');


var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: new ol.View({
    center: [-25860000, 4130000],
    rotation: Math.PI / 6,
    zoom: 10
  })
});
