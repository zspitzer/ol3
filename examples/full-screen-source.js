ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.control');
ol.require('ol.control.FullScreen');
ol.require('ol.layer.Tile');
ol.require('ol.source.OSM');


var view = new ol.View({
  center: [-9101767, 2822912],
  zoom: 14
});

var map = new ol.Map({
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen({
      source: 'fullscreen'
    })
  ]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: view
});
