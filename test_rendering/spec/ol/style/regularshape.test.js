ol.provide('ol.test.rendering.style.RegularShape');

ol.require('ol.Feature');
ol.require('ol.geom.Point');
ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.layer.Vector');
ol.require('ol.source.Vector');
ol.require('ol.style.Fill');
ol.require('ol.style.RegularShape');
ol.require('ol.style.Style');
ol.require('ol.style.Stroke');


describe('ol.rendering.style.RegularShape', function() {

  var target, map, vectorSource;

  function createMap(renderer) {
    target = createMapDiv(50, 50);

    vectorSource = new ol.source.Vector();
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    map = new ol.Map({
      target: target,
      renderer: renderer,
      layers: [vectorLayer],
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [0, 0],
        resolution: 1
      })
    });
    return map;
  }

  describe('#render', function() {
    afterEach(function() {
      disposeMap(map);
    });

    function createFeatures() {
      var stroke = new ol.style.Stroke({color: 'black', width: 2});
      var fill = new ol.style.Fill({color: 'red'});

      var feature;
      feature = new ol.Feature({
        geometry: new ol.geom.Point([-15, 15])
      });
      // square
      feature.setStyle(new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: fill,
          stroke: stroke,
          points: 4,
          radius: 10,
          angle: Math.PI / 4
        })
      }));
      vectorSource.addFeature(feature);

      feature = new ol.Feature({
        geometry: new ol.geom.Point([8, 15])
      });
      // triangle
      feature.setStyle(new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: fill,
          stroke: stroke,
          points: 3,
          radius: 10,
          rotation: Math.PI / 4,
          angle: 0
        })
      }));
      vectorSource.addFeature(feature);

      feature = new ol.Feature({
        geometry: new ol.geom.Point([-10, -8])
      });
      // star
      feature.setStyle(new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: fill,
          stroke: stroke,
          points: 5,
          radius: 10,
          radius2: 4,
          angle: 0
        })
      }));
      vectorSource.addFeature(feature);

      feature = new ol.Feature({
        geometry: new ol.geom.Point([12, -8])
      });
      // cross
      feature.setStyle(new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: fill,
          stroke: stroke,
          points: 4,
          radius: 10,
          radius2: 0,
          angle: 0
        })
      }));
      vectorSource.addFeature(feature);
    }

    it('tests the canvas renderer', function(done) {
      map = createMap('canvas');
      createFeatures();
      expectResemble(map, 'spec/ol/style/expected/regularshape-canvas.png',
          9.4, done);
    });

    it('tests the WebGL renderer', function(done) {
      assertWebGL();
      map = createMap('webgl');
      createFeatures();
      expectResemble(map, 'spec/ol/style/expected/regularshape-webgl.png',
          8.2, done);
    });
  });
});
