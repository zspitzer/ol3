ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.interaction');
ol.require('ol.interaction.DragRotateAndZoom');
ol.require('ol.layer.Tile');
ol.require('ol.source.OSM');


var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([
    new ol.interaction.DragRotateAndZoom()
  ]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});
