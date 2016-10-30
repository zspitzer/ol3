ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.control');
ol.require('ol.control.OverviewMap');
ol.require('ol.layer.Tile');
ol.require('ol.source.OSM');

var map = new ol.Map({
  controls: ol.control.defaults().extend([
    new ol.control.OverviewMap()
  ]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [500000, 6000000],
    zoom: 7
  })
});
