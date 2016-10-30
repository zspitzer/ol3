ol.provide('ol.test.renderer.vector');

ol.require('ol');
ol.require('ol.events');
ol.require('ol.geom.LineString');
ol.require('ol.geom.Point');
ol.require('ol.geom.Polygon');
ol.require('ol.geom.MultiLineString');
ol.require('ol.geom.MultiPoint');
ol.require('ol.geom.MultiPolygon');
ol.require('ol.render.canvas.ReplayGroup');
ol.require('ol.renderer.vector');
ol.require('ol.style.Fill');
ol.require('ol.style.Icon');
ol.require('ol.style.Stroke');
ol.require('ol.style.Style');
ol.require('ol.Feature');


describe('ol.renderer.vector', function() {
  describe('#renderFeature', function() {
    var replayGroup;
    var feature, iconStyle, style, squaredTolerance, listener, listenerThis;
    var iconStyleLoadSpy;

    beforeEach(function() {
      replayGroup = new ol.render.canvas.ReplayGroup(1);
      feature = new ol.Feature();
      iconStyle = new ol.style.Icon({
        src: 'http://example.com/icon.png'
      });
      style = new ol.style.Style({
        image: iconStyle,
        fill: new ol.style.Fill({}),
        stroke: new ol.style.Stroke({})
      });
      squaredTolerance = 1;
      listener = function() {};
      listenerThis = {};
      iconStyleLoadSpy = sinon.stub(iconStyle, 'load', function() {
        iconStyle.iconImage_.imageState_ = 1; // LOADING
      });
    });

    afterEach(function() {
      iconStyleLoadSpy.restore();
    });

    describe('call multiple times', function() {

      it('does not set multiple listeners', function() {
        var listeners;

        // call #1
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);

        expect(iconStyleLoadSpy.calledOnce).to.be.ok();
        listeners = ol.events.getListeners(
            iconStyle.iconImage_, 'change');
        expect(listeners.length).to.eql(1);

        // call #2
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);

        expect(iconStyleLoadSpy.calledOnce).to.be.ok();
        listeners = ol.events.getListeners(
            iconStyle.iconImage_, 'change');
        expect(listeners.length).to.eql(1);
      });

    });

    describe('call renderFeature with a loading icon', function() {

      it('does not render the point', function() {
        feature.setGeometry(new ol.geom.Point([0, 0]));
        var imageReplay = replayGroup.getReplay(
            style.getZIndex(), 'Image');
        var setImageStyleSpy = sinon.spy(imageReplay, 'setImageStyle');
        var drawPointSpy = sinon.stub(imageReplay,
            'drawPoint', ol.nullFunction);
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);
        expect(setImageStyleSpy.called).to.be(false);
        setImageStyleSpy.restore();
        drawPointSpy.restore();
      });

      it('does not render the multipoint', function() {
        feature.setGeometry(new ol.geom.MultiPoint([[0, 0], [1, 1]]));
        var imageReplay = replayGroup.getReplay(
            style.getZIndex(), 'Image');
        var setImageStyleSpy = sinon.spy(imageReplay, 'setImageStyle');
        var drawMultiPointSpy = sinon.stub(imageReplay,
            'drawMultiPoint', ol.nullFunction);
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);
        expect(setImageStyleSpy.called).to.be(false);
        setImageStyleSpy.restore();
        drawMultiPointSpy.restore();
      });

      it('does render the linestring', function() {
        feature.setGeometry(new ol.geom.LineString([[0, 0], [1, 1]]));
        var lineStringReplay = replayGroup.getReplay(
            style.getZIndex(), 'LineString');
        var setFillStrokeStyleSpy = sinon.spy(lineStringReplay,
            'setFillStrokeStyle');
        var drawLineStringSpy = sinon.stub(lineStringReplay,
            'drawLineString', ol.nullFunction);
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);
        expect(setFillStrokeStyleSpy.called).to.be(true);
        expect(drawLineStringSpy.called).to.be(true);
        setFillStrokeStyleSpy.restore();
        drawLineStringSpy.restore();
      });

      it('does render the multilinestring', function() {
        feature.setGeometry(new ol.geom.MultiLineString([[[0, 0], [1, 1]]]));
        var lineStringReplay = replayGroup.getReplay(
            style.getZIndex(), 'LineString');
        var setFillStrokeStyleSpy = sinon.spy(lineStringReplay,
            'setFillStrokeStyle');
        var drawMultiLineStringSpy = sinon.stub(lineStringReplay,
            'drawMultiLineString', ol.nullFunction);
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);
        expect(setFillStrokeStyleSpy.called).to.be(true);
        expect(drawMultiLineStringSpy.called).to.be(true);
        setFillStrokeStyleSpy.restore();
        drawMultiLineStringSpy.restore();
      });

      it('does render the polygon', function() {
        feature.setGeometry(new ol.geom.Polygon(
            [[[0, 0], [1, 1], [1, 0], [0, 0]]]));
        var polygonReplay = replayGroup.getReplay(
            style.getZIndex(), 'Polygon');
        var setFillStrokeStyleSpy = sinon.spy(polygonReplay,
            'setFillStrokeStyle');
        var drawPolygonSpy = sinon.stub(polygonReplay,
            'drawPolygon', ol.nullFunction);
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);
        expect(setFillStrokeStyleSpy.called).to.be(true);
        expect(drawPolygonSpy.called).to.be(true);
        setFillStrokeStyleSpy.restore();
        drawPolygonSpy.restore();
      });

      it('does render the multipolygon', function() {
        feature.setGeometry(new ol.geom.MultiPolygon(
            [[[[0, 0], [1, 1], [1, 0], [0, 0]]]]));
        var polygonReplay = replayGroup.getReplay(
            style.getZIndex(), 'Polygon');
        var setFillStrokeStyleSpy = sinon.spy(polygonReplay,
            'setFillStrokeStyle');
        var drawMultiPolygonSpy = sinon.stub(polygonReplay,
            'drawMultiPolygon', ol.nullFunction);
        ol.renderer.vector.renderFeature(replayGroup, feature,
            style, squaredTolerance, listener, listenerThis);
        expect(setFillStrokeStyleSpy.called).to.be(true);
        expect(drawMultiPolygonSpy.called).to.be(true);
        setFillStrokeStyleSpy.restore();
        drawMultiPolygonSpy.restore();
      });
    });

  });
});
