ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.format.GeoJSON');
ol.require('ol.interaction');
ol.require('ol.interaction.Modify');
ol.require('ol.interaction.Select');
ol.require('ol.layer.Tile');
ol.require('ol.layer.Vector');
ol.require('ol.source.OSM');
ol.require('ol.source.Vector');


var raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'data/geojson/countries.geojson',
    format: new ol.format.GeoJSON(),
    wrapX: false
  })
});

var select = new ol.interaction.Select({
  wrapX: false
});

var modify = new ol.interaction.Modify({
  features: select.getFeatures()
});

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([select, modify]),
  layers: [raster, vector],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});
