'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _class3, _temp; // Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _mapboxGl = require('mapbox-gl');

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _d3Selection = require('d3-selection');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _mapInteractions = require('./map-interactions.react');

var _mapInteractions2 = _interopRequireDefault(_mapInteractions);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _styleUtils = require('./utils/style-utils');

var _diffStyles2 = require('./utils/diff-styles');

var _diffStyles3 = _interopRequireDefault(_diffStyles2);

var _transform = require('./utils/transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function noop() {}

// Note: Max pitch is a hard coded value (not a named constant) in transform.js
var MAX_PITCH = 60;
var PITCH_MOUSE_THRESHOLD = 20;
var PITCH_ACCEL = 1.2;

var PROP_TYPES = {
  /**
    * The latitude of the center of the map.
    */
  latitude: _react.PropTypes.number.isRequired,
  /**
    * The longitude of the center of the map.
    */
  longitude: _react.PropTypes.number.isRequired,
  /**
    * The tile zoom level of the map.
    */
  zoom: _react.PropTypes.number.isRequired,
  /**
    * The maximum tile zoom level of the map. Defaults to 20.
    * Increasing this will allow you to zoom further into the map but should
    * only be used if you know what you are doing past zoom 20. The default
    * map styles won't render anything useful past 20.
    */
  maxZoom: _react.PropTypes.number,
  /**
    * The Mapbox style the component should use. Can either be a string url
    * or a MapboxGL style Immutable.Map object.
    */
  mapStyle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.instanceOf(_immutable2.default.Map)]),
  /**
    * The Mapbox API access token to provide to mapbox-gl-js. This is required
    * when using Mapbox provided vector tiles and styles.
    */
  mapboxApiAccessToken: _react.PropTypes.string,
  /**
    * `onChangeViewport` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onChangeViewport: _react.PropTypes.func,
  /**
    * The width of the map.
    */
  width: _react.PropTypes.number.isRequired,
  /**
    * The height of the map.
    */
  height: _react.PropTypes.number.isRequired,
  /**
    * Is the component currently being dragged. This is used to show/hide the
    * drag cursor. Also used as an optimization in some overlays by preventing
    * rendering while dragging.
    */
  isDragging: _react.PropTypes.bool,
  /**
    * Required to calculate the mouse projection after the first click event
    * during dragging. Where the map is depends on where you first clicked on
    * the map.
    */
  startDragLngLat: _react.PropTypes.array,
  /**
    * Called when a feature is hovered over. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * If no interactive layers are found (e.g. using Mapbox's default styles),
    * will fall back to query all layers.
    * @callback
    * @param {array} features - The array of features the mouse is over.
    */
  onHoverFeatures: _react.PropTypes.func,
  /**
    * Defaults to TRUE
    * Set to false to enable onHoverFeatures to be called regardless if
    * there is an actual feature at x, y. This is useful to emulate
    * "mouse-out" behaviors on features.
    */
  ignoreEmptyFeatures: _react.PropTypes.bool,

  /**
    * Show attribution control or not.
    */
  attributionControl: _react.PropTypes.bool,

  /**
   * Called when the map is clicked. The handler is called with the clicked
   * coordinates (https://www.mapbox.com/mapbox-gl-js/api/#LngLat) and the
   * screen coordinates (https://www.mapbox.com/mapbox-gl-js/api/#PointLike).
   */
  onClick: _react.PropTypes.func,

  /**
    * Called when a feature is clicked on. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * If no interactive layers are found (e.g. using Mapbox's default styles),
    * will fall back to query all layers.
    */
  onClickFeatures: _react.PropTypes.func,

  /**
    * Radius to detect features around a clicked point. Defaults to 15.
    */
  clickRadius: _react.PropTypes.number,

  /**
    * Passed to Mapbox Map constructor which passes it to the canvas context.
    * This is unseful when you want to export the canvas as a PNG.
    */
  preserveDrawingBuffer: _react.PropTypes.bool,

  /**
    * There are still known issues with style diffing. As a temporary stopgap,
    * add the option to prevent style diffing.
    */
  preventStyleDiffing: _react.PropTypes.bool,

  /**
    * Enables perspective control event handling
    */
  perspectiveEnabled: _react.PropTypes.bool,

  /**
    * Specify the bearing of the viewport
    */
  bearing: _react.PropTypes.number,

  /**
    * Specify the pitch of the viewport
    */
  pitch: _react.PropTypes.number,

  /**
    * Specify the altitude of the viewport camera
    * Unit: map heights, default 1.5
    * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
    */
  altitude: _react.PropTypes.number,

  /**
    * The load callback is called when all dependencies have been loaded and
    * the map is ready.
    */
  onLoad: _react.PropTypes.func

};

var DEFAULT_PROPS = {
  mapStyle: 'mapbox://styles/mapbox/light-v9',
  onChangeViewport: null,
  mapboxApiAccessToken: _config2.default.DEFAULTS.MAPBOX_API_ACCESS_TOKEN,
  preserveDrawingBuffer: false,
  attributionControl: true,
  ignoreEmptyFeatures: true,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  clickRadius: 15,
  maxZoom: 20
};

var MapGL = (0, _pureRenderDecorator2.default)(_class = (_class2 = (_temp = _class3 = function (_Component) {
  _inherits(MapGL, _Component);

  _createClass(MapGL, null, [{
    key: 'supported',
    value: function supported() {
      return _mapboxGl2.default.supported();
    }
  }]);

  function MapGL(props) {
    _classCallCheck(this, MapGL);

    var _this = _possibleConstructorReturn(this, (MapGL.__proto__ || Object.getPrototypeOf(MapGL)).call(this, props));

    _this.state = {
      isSupported: _mapboxGl2.default.supported(),
      isDragging: false,
      isHovering: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    };
    _this._queryParams = {};
    _mapboxGl2.default.accessToken = props.mapboxApiAccessToken;

    if (!_this.state.isSupported) {
      _this.componentDidMount = noop;
      _this.componentWillReceiveProps = noop;
      _this.componentDidUpdate = noop;
    }
    return _this;
  }

  _createClass(MapGL, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var mapStyle = _immutable2.default.Map.isMap(this.props.mapStyle) ? this.props.mapStyle.toJS() : this.props.mapStyle;

      var map = new _mapboxGl2.default.Map({
        container: this.refs.mapboxMap,
        center: [this.props.longitude, this.props.latitude],
        zoom: this.props.zoom,
        maxZoom: this.props.maxZoom,
        pitch: this.props.pitch,
        bearing: this.props.bearing,
        style: mapStyle,
        interactive: false,
        preserveDrawingBuffer: this.props.preserveDrawingBuffer
        // TODO?
        // attributionControl: this.props.attributionControl
      });

      if (this.props.onLoad) {
        map.once('load', function () {
          return _this2.props.onLoad();
        });
      }

      (0, _d3Selection.select)(map.getCanvas()).style('outline', 'none');

      this._map = map;
      this._updateMapViewport({}, this.props);
      // DIFFERENCE: expose map bounds on viewport change
      this._callOnChangeViewport(map.transform, { map: map });
      this._updateQueryParams(mapStyle);
    }

    // New props are comin' round the corner!

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this._updateStateFromProps(this.props, newProps);
      this._updateMapViewport(this.props, newProps);
      this._updateMapStyle(this.props, newProps);
      // Save width/height so that we can check them in componentDidUpdate
      this.setState({
        width: this.props.width,
        height: this.props.height
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // map.resize() reads size from DOM, we need to call after render
      this._updateMapSize(this.state, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._map) {
        this._map.remove();
      }
    }

    // External apps can access map this way

  }, {
    key: '_getMap',
    value: function _getMap() {
      return this._map;
    }

    // Calculate a cursor style

  }, {
    key: '_getCursor',
    value: function _getCursor() {
      var isInteractive = this.props.onChangeViewport || this.props.onClickFeature || this.props.onHoverFeatures;
      if (isInteractive) {
        return this.props.isDragging ? _config2.default.CURSOR.GRABBING : this.state.isHovering ? _config2.default.CURSOR.POINTER : _config2.default.CURSOR.GRAB;
      }
      return 'inherit';
    }
  }, {
    key: '_updateStateFromProps',
    value: function _updateStateFromProps(oldProps, newProps) {
      _mapboxGl2.default.accessToken = newProps.mapboxApiAccessToken;
      this.setState({
        startDragLngLat: newProps.startDragLngLat
      });
    }

    // Hover and click only query layers whose interactive property is true
    // If no interactivity is specified, query all layers

  }, {
    key: '_updateQueryParams',
    value: function _updateQueryParams(mapStyle) {
      var interactiveLayerIds = (0, _styleUtils.getInteractiveLayerIds)(mapStyle);
      this._queryParams = interactiveLayerIds.length === 0 ? {} : { layers: interactiveLayerIds };
    }

    // Update a source in the map style

  }, {
    key: '_updateSource',
    value: function _updateSource(map, update) {
      var newSource = update.source.toJS();
      if (newSource.type === 'geojson') {
        var oldSource = map.getSource(update.id);
        if (oldSource.type === 'geojson') {
          // update data if no other GeoJSONSource options were changed
          var oldOpts = oldSource.workerOptions;
          if ((newSource.maxzoom === undefined || newSource.maxzoom === oldOpts.geojsonVtOptions.maxZoom) && (newSource.buffer === undefined || newSource.buffer === oldOpts.geojsonVtOptions.buffer) && (newSource.tolerance === undefined || newSource.tolerance === oldOpts.geojsonVtOptions.tolerance) && (newSource.cluster === undefined || newSource.cluster === oldOpts.cluster) && (newSource.clusterRadius === undefined || newSource.clusterRadius === oldOpts.superclusterOptions.radius) && (newSource.clusterMaxZoom === undefined || newSource.clusterMaxZoom === oldOpts.superclusterOptions.maxZoom)) {
            oldSource.setData(newSource.data);
            return;
          }
        }
      }

      map.removeSource(update.id);
      map.addSource(update.id, newSource);
    }

    // Individually update the maps source and layers that have changed if all
    // other style props haven't changed. This prevents flicking of the map when
    // styles only change sources or layers.
    /* eslint-disable max-statements, complexity */

  }, {
    key: '_setDiffStyle',
    value: function _setDiffStyle(prevStyle, nextStyle) {
      var prevKeysMap = prevStyle && styleKeysMap(prevStyle) || {};
      var nextKeysMap = styleKeysMap(nextStyle);
      function styleKeysMap(style) {
        return style.map(function () {
          return true;
        }).delete('layers').delete('sources').toJS();
      }
      function propsOtherThanLayersOrSourcesDiffer() {
        var prevKeysList = Object.keys(prevKeysMap);
        var nextKeysList = Object.keys(nextKeysMap);
        if (prevKeysList.length !== nextKeysList.length) {
          return true;
        }
        // `nextStyle` and `prevStyle` should not have the same set of props.
        if (nextKeysList.some(function (key) {
          return prevStyle.get(key) !== nextStyle.get(key);
        }
        // But the value of one of those props is different.
        )) {
          return true;
        }
        return false;
      }

      var map = this._map;

      if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
        map.setStyle(nextStyle.toJS());
        return;
      }

      var _diffStyles = (0, _diffStyles3.default)(prevStyle, nextStyle),
          sourcesDiff = _diffStyles.sourcesDiff,
          layersDiff = _diffStyles.layersDiff;

      // TODO: It's rather difficult to determine style diffing in the presence
      // of refs. For now, if any style update has a ref, fallback to no diffing.
      // We can come back to this case if there's a solid usecase.


      if (layersDiff.updates.some(function (node) {
        return node.layer.get('ref');
      })) {
        map.setStyle(nextStyle.toJS());
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = sourcesDiff.enter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var enter = _step.value;

          map.addSource(enter.id, enter.source.toJS());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = sourcesDiff.update[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var update = _step2.value;

          this._updateSource(map, update);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = sourcesDiff.exit[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var exit = _step3.value;

          map.removeSource(exit.id);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = layersDiff.exiting[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _exit = _step4.value;

          if (map.style.getLayer(_exit.id)) {
            map.removeLayer(_exit.id);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = layersDiff.updates[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _update = _step5.value;

          if (!_update.enter) {
            // This is an old layer that needs to be updated. Remove the old layer
            // with the same id and add it back again.
            map.removeLayer(_update.id);
          }
          map.addLayer(_update.layer.toJS(), _update.before);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
    /* eslint-enable max-statements, complexity */

  }, {
    key: '_updateMapStyle',
    value: function _updateMapStyle(oldProps, newProps) {
      var mapStyle = newProps.mapStyle;
      var oldMapStyle = oldProps.mapStyle;
      if (mapStyle !== oldMapStyle) {
        if (_immutable2.default.Map.isMap(mapStyle)) {
          if (this.props.preventStyleDiffing) {
            this._map.setStyle(mapStyle.toJS());
          } else {
            this._setDiffStyle(oldMapStyle, mapStyle);
          }
        } else {
          this._map.setStyle(mapStyle);
        }
        this._updateQueryParams(mapStyle);
      }
    }
  }, {
    key: '_updateMapViewport',
    value: function _updateMapViewport(oldProps, newProps) {
      var viewportChanged = newProps.latitude !== oldProps.latitude || newProps.longitude !== oldProps.longitude || newProps.zoom !== oldProps.zoom || newProps.pitch !== oldProps.pitch || newProps.zoom !== oldProps.bearing || newProps.altitude !== oldProps.altitude;

      if (viewportChanged) {
        this._map.jumpTo({
          center: [newProps.longitude, newProps.latitude],
          zoom: newProps.zoom,
          bearing: newProps.bearing,
          pitch: newProps.pitch
        });

        // TODO - jumpTo doesn't handle altitude
        if (newProps.altitude !== oldProps.altitude) {
          this._map.transform.altitude = newProps.altitude;
        }
      }
    }

    // Note: needs to be called after render (e.g. in componentDidUpdate)

  }, {
    key: '_updateMapSize',
    value: function _updateMapSize(oldProps, newProps) {
      var sizeChanged = oldProps.width !== newProps.width || oldProps.height !== newProps.height;

      if (sizeChanged) {
        this._map.resize();
        this._callOnChangeViewport(this._map.transform, { map: this._map });
      }
    }

    // Calculates a new pitch and bearing from a position (coming from an event)

  }, {
    key: '_calculateNewPitchAndBearing',
    value: function _calculateNewPitchAndBearing(_ref) {
      var pos = _ref.pos,
          startPos = _ref.startPos,
          startBearing = _ref.startBearing,
          startPitch = _ref.startPitch;

      var xDelta = pos[0] - startPos[0];
      var bearing = startBearing + 180 * xDelta / this.props.width;

      var pitch = startPitch;
      var yDelta = pos[1] - startPos[1];
      if (yDelta > 0) {
        // Dragging downwards, gradually decrease pitch
        if (Math.abs(this.props.height - startPos[1]) > PITCH_MOUSE_THRESHOLD) {
          var scale = yDelta / (this.props.height - startPos[1]);
          pitch = (1 - scale) * PITCH_ACCEL * startPitch;
        }
      } else if (yDelta < 0) {
        // Dragging upwards, gradually increase pitch
        if (startPos[1] > PITCH_MOUSE_THRESHOLD) {
          // Move from 0 to 1 as we drag upwards
          var yScale = 1 - pos[1] / startPos[1];
          // Gradually add until we hit max pitch
          pitch = startPitch + yScale * (MAX_PITCH - startPitch);
        }
      }

      // console.debug(startPitch, pitch);
      return {
        pitch: Math.max(Math.min(pitch, MAX_PITCH), 0),
        bearing: bearing
      };
    }

    // Helper to call props.onChangeViewport

  }, {
    key: '_callOnChangeViewport',
    value: function _callOnChangeViewport(transform) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.props.onChangeViewport) {
        this.props.onChangeViewport(_extends({
          latitude: transform.center.lat,
          longitude: (0, _transform.mod)(transform.center.lng + 180, 360) - 180,
          zoom: transform.zoom,
          pitch: transform.pitch,
          bearing: (0, _transform.mod)(transform.bearing + 180, 360) - 180,

          isDragging: this.props.isDragging,
          startDragLngLat: this.props.startDragLngLat,
          startBearing: this.props.startBearing,
          startPitch: this.props.startPitch

        }, opts));
      }
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(opts) {
      this._onMouseDown(opts);
    }
  }, {
    key: '_onTouchDrag',
    value: function _onTouchDrag(opts) {
      this._onMouseDrag(opts);
    }
  }, {
    key: '_onTouchRotate',
    value: function _onTouchRotate(opts) {
      this._onMouseRotate(opts);
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(opts) {
      this._onMouseUp(opts);
    }
  }, {
    key: '_onTouchTap',
    value: function _onTouchTap(opts) {
      this._onMouseClick(opts);
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(_ref2) {
      var pos = _ref2.pos;
      var transform = this._map.transform;

      var _unprojectFromTransfo = (0, _transform.unprojectFromTransform)(transform, new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))()),
          lng = _unprojectFromTransfo.lng,
          lat = _unprojectFromTransfo.lat;

      this._callOnChangeViewport(transform, {
        isDragging: true,
        startDragLngLat: [lng, lat],
        startBearing: transform.bearing,
        startPitch: transform.pitch,
        map: this._map
      });
    }
  }, {
    key: '_onMouseDrag',
    value: function _onMouseDrag(_ref3) {
      var pos = _ref3.pos;

      if (!this.props.onChangeViewport) {
        return;
      }

      // take the start lnglat and put it where the mouse is down.
      (0, _assert2.default)(this.props.startDragLngLat, '`startDragLngLat` prop is required ' + 'for mouse drag behavior to calculate where to position the map.');

      var transform = (0, _transform.cloneTransform)(this._map.transform);

      var _props$startDragLngLa = _slicedToArray(this.props.startDragLngLat, 2),
          lng = _props$startDragLngLa[0],
          lat = _props$startDragLngLa[1];

      transform.setLocationAtPoint({ lng: lng, lat: lat }, new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))());
      this._callOnChangeViewport(transform, { isDragging: true, map: this._map });
    }
  }, {
    key: '_onMouseRotate',
    value: function _onMouseRotate(_ref4) {
      var pos = _ref4.pos,
          startPos = _ref4.startPos;

      if (!this.props.onChangeViewport || !this.props.perspectiveEnabled) {
        return;
      }

      var _props = this.props,
          startBearing = _props.startBearing,
          startPitch = _props.startPitch;

      (0, _assert2.default)(typeof startBearing === 'number', '`startBearing` prop is required for mouse rotate behavior');
      (0, _assert2.default)(typeof startPitch === 'number', '`startPitch` prop is required for mouse rotate behavior');

      var _calculateNewPitchAnd = this._calculateNewPitchAndBearing({
        pos: pos,
        startPos: startPos,
        startBearing: startBearing,
        startPitch: startPitch
      }),
          pitch = _calculateNewPitchAnd.pitch,
          bearing = _calculateNewPitchAnd.bearing;

      var transform = (0, _transform.cloneTransform)(this._map.transform);
      transform.bearing = bearing;
      transform.pitch = pitch;

      this._callOnChangeViewport(transform, { isDragging: true, map: this._map });
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(_ref5) {
      var pos = _ref5.pos;

      if (!this.props.onHoverFeatures) {
        return;
      }
      var features = this._map.queryRenderedFeatures(new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))(), this._queryParams);
      if (!features.length && this.props.ignoreEmptyFeatures) {
        return;
      }
      this.setState({ isHovering: features.length > 0 });
      this.props.onHoverFeatures(features);
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(opt) {
      this._callOnChangeViewport(this._map.transform, {
        isDragging: false,
        startDragLngLat: null,
        startBearing: null,
        startPitch: null,
        map: this._map
      });
    }
  }, {
    key: '_onMouseClick',
    value: function _onMouseClick(_ref6) {
      var pos = _ref6.pos;

      if (!this.props.onClickFeatures && !this.props.onClick) {
        return;
      }

      if (this.props.onClick) {
        var point = new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))();
        var latLong = this._map.unproject(point);
        // TODO - Do we really want to expose a mapbox "Point" in our interface?
        this.props.onClick(latLong, point);
      }

      if (this.props.onClickFeatures) {
        // Radius enables point features, like marker symbols, to be clicked.
        var size = this.props.clickRadius;
        var bbox = [[pos[0] - size, pos[1] - size], [pos[0] + size, pos[1] + size]];
        var features = this._map.queryRenderedFeatures(bbox, this._queryParams);
        if (!features.length && this.props.ignoreEmptyFeatures) {
          return;
        }
        this.props.onClickFeatures(features);
      }
    }
  }, {
    key: '_onZoom',
    value: function _onZoom(_ref7) {
      var pos = _ref7.pos,
          scale = _ref7.scale;

      var point = new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))();
      var transform = (0, _transform.cloneTransform)(this._map.transform);
      var around = (0, _transform.unprojectFromTransform)(transform, point);
      transform.zoom = transform.scaleZoom(this._map.transform.scale * scale);
      transform.setLocationAtPoint(around, point);
      this._callOnChangeViewport(transform, { isDragging: true, map: this._map });
    }
  }, {
    key: '_onZoomEnd',
    value: function _onZoomEnd() {
      this._callOnChangeViewport(this._map.transform, { isDragging: false, map: this._map });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          width = _props2.width,
          height = _props2.height,
          style = _props2.style;

      var mapStyle = _extends({}, style, {
        width: width,
        height: height,
        cursor: this._getCursor()
      });

      var content = [_react2.default.createElement('div', { key: 'map', ref: 'mapboxMap',
        style: mapStyle, className: className }), _react2.default.createElement(
        'div',
        { key: 'overlays', className: 'overlays',
          style: { position: 'absolute', left: 0, top: 0 } },
        this.props.children
      )];

      if (this.state.isSupported && this.props.onChangeViewport) {
        content = _react2.default.createElement(
          _mapInteractions2.default,
          {
            onMouseDown: this._onMouseDown,
            onMouseDrag: this._onMouseDrag,
            onMouseRotate: this._onMouseRotate,
            onMouseUp: this._onMouseUp,
            onMouseMove: this._onMouseMove,
            onMouseClick: this._onMouseClick,
            onTouchStart: this._onTouchStart,
            onTouchDrag: this._onTouchDrag,
            onTouchRotate: this._onTouchRotate,
            onTouchEnd: this._onTouchEnd,
            onTouchTap: this._onTouchTap,
            onZoom: this._onZoom,
            onZoomEnd: this._onZoomEnd,
            width: this.props.width,
            height: this.props.height },
          content
        );
      }

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, this.props.style, {
            width: this.props.width,
            height: this.props.height,
            position: 'relative'
          }) },
        content
      );
    }
  }]);

  return MapGL;
}(_react.Component), _class3.propTypes = PROP_TYPES, _class3.defaultProps = DEFAULT_PROPS, _temp), (_applyDecoratedDescriptor(_class2.prototype, '_onTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchStart'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchDrag'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchRotate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchRotate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchEnd'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchTap', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchTap'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseDrag'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseRotate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseRotate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseMove'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseUp'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseClick', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onZoom', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onZoom'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onZoomEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onZoomEnd'), _class2.prototype)), _class2)) || _class;

exports.default = MapGL;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXAucmVhY3QuanMiXSwibmFtZXMiOlsibm9vcCIsIk1BWF9QSVRDSCIsIlBJVENIX01PVVNFX1RIUkVTSE9MRCIsIlBJVENIX0FDQ0VMIiwiUFJPUF9UWVBFUyIsImxhdGl0dWRlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImxvbmdpdHVkZSIsInpvb20iLCJtYXhab29tIiwibWFwU3R5bGUiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJpbnN0YW5jZU9mIiwiTWFwIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJvbkNoYW5nZVZpZXdwb3J0IiwiZnVuYyIsIndpZHRoIiwiaGVpZ2h0IiwiaXNEcmFnZ2luZyIsImJvb2wiLCJzdGFydERyYWdMbmdMYXQiLCJhcnJheSIsIm9uSG92ZXJGZWF0dXJlcyIsImlnbm9yZUVtcHR5RmVhdHVyZXMiLCJhdHRyaWJ1dGlvbkNvbnRyb2wiLCJvbkNsaWNrIiwib25DbGlja0ZlYXR1cmVzIiwiY2xpY2tSYWRpdXMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJwcmV2ZW50U3R5bGVEaWZmaW5nIiwicGVyc3BlY3RpdmVFbmFibGVkIiwiYmVhcmluZyIsInBpdGNoIiwiYWx0aXR1ZGUiLCJvbkxvYWQiLCJERUZBVUxUX1BST1BTIiwiREVGQVVMVFMiLCJNQVBCT1hfQVBJX0FDQ0VTU19UT0tFTiIsIk1hcEdMIiwic3VwcG9ydGVkIiwicHJvcHMiLCJzdGF0ZSIsImlzU3VwcG9ydGVkIiwiaXNIb3ZlcmluZyIsInN0YXJ0QmVhcmluZyIsInN0YXJ0UGl0Y2giLCJfcXVlcnlQYXJhbXMiLCJhY2Nlc3NUb2tlbiIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsImlzTWFwIiwidG9KUyIsIm1hcCIsImNvbnRhaW5lciIsInJlZnMiLCJtYXBib3hNYXAiLCJjZW50ZXIiLCJzdHlsZSIsImludGVyYWN0aXZlIiwib25jZSIsImdldENhbnZhcyIsIl9tYXAiLCJfdXBkYXRlTWFwVmlld3BvcnQiLCJfY2FsbE9uQ2hhbmdlVmlld3BvcnQiLCJ0cmFuc2Zvcm0iLCJfdXBkYXRlUXVlcnlQYXJhbXMiLCJuZXdQcm9wcyIsIl91cGRhdGVTdGF0ZUZyb21Qcm9wcyIsIl91cGRhdGVNYXBTdHlsZSIsInNldFN0YXRlIiwiX3VwZGF0ZU1hcFNpemUiLCJyZW1vdmUiLCJpc0ludGVyYWN0aXZlIiwib25DbGlja0ZlYXR1cmUiLCJDVVJTT1IiLCJHUkFCQklORyIsIlBPSU5URVIiLCJHUkFCIiwib2xkUHJvcHMiLCJpbnRlcmFjdGl2ZUxheWVySWRzIiwibGVuZ3RoIiwibGF5ZXJzIiwidXBkYXRlIiwibmV3U291cmNlIiwic291cmNlIiwidHlwZSIsIm9sZFNvdXJjZSIsImdldFNvdXJjZSIsImlkIiwib2xkT3B0cyIsIndvcmtlck9wdGlvbnMiLCJtYXh6b29tIiwidW5kZWZpbmVkIiwiZ2VvanNvblZ0T3B0aW9ucyIsImJ1ZmZlciIsInRvbGVyYW5jZSIsImNsdXN0ZXIiLCJjbHVzdGVyUmFkaXVzIiwic3VwZXJjbHVzdGVyT3B0aW9ucyIsInJhZGl1cyIsImNsdXN0ZXJNYXhab29tIiwic2V0RGF0YSIsImRhdGEiLCJyZW1vdmVTb3VyY2UiLCJhZGRTb3VyY2UiLCJwcmV2U3R5bGUiLCJuZXh0U3R5bGUiLCJwcmV2S2V5c01hcCIsInN0eWxlS2V5c01hcCIsIm5leHRLZXlzTWFwIiwiZGVsZXRlIiwicHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIiLCJwcmV2S2V5c0xpc3QiLCJPYmplY3QiLCJrZXlzIiwibmV4dEtleXNMaXN0Iiwic29tZSIsImdldCIsImtleSIsInNldFN0eWxlIiwic291cmNlc0RpZmYiLCJsYXllcnNEaWZmIiwidXBkYXRlcyIsIm5vZGUiLCJsYXllciIsImVudGVyIiwiX3VwZGF0ZVNvdXJjZSIsImV4aXQiLCJleGl0aW5nIiwiZ2V0TGF5ZXIiLCJyZW1vdmVMYXllciIsImFkZExheWVyIiwiYmVmb3JlIiwib2xkTWFwU3R5bGUiLCJfc2V0RGlmZlN0eWxlIiwidmlld3BvcnRDaGFuZ2VkIiwianVtcFRvIiwic2l6ZUNoYW5nZWQiLCJyZXNpemUiLCJwb3MiLCJzdGFydFBvcyIsInhEZWx0YSIsInlEZWx0YSIsIk1hdGgiLCJhYnMiLCJzY2FsZSIsInlTY2FsZSIsIm1heCIsIm1pbiIsIm9wdHMiLCJsYXQiLCJsbmciLCJfb25Nb3VzZURvd24iLCJfb25Nb3VzZURyYWciLCJfb25Nb3VzZVJvdGF0ZSIsIl9vbk1vdXNlVXAiLCJfb25Nb3VzZUNsaWNrIiwic2V0TG9jYXRpb25BdFBvaW50IiwiX2NhbGN1bGF0ZU5ld1BpdGNoQW5kQmVhcmluZyIsImZlYXR1cmVzIiwicXVlcnlSZW5kZXJlZEZlYXR1cmVzIiwib3B0IiwicG9pbnQiLCJsYXRMb25nIiwidW5wcm9qZWN0Iiwic2l6ZSIsImJib3giLCJhcm91bmQiLCJzY2FsZVpvb20iLCJjbGFzc05hbWUiLCJjdXJzb3IiLCJfZ2V0Q3Vyc29yIiwiY29udGVudCIsInBvc2l0aW9uIiwibGVmdCIsInRvcCIsImNoaWxkcmVuIiwiX29uTW91c2VNb3ZlIiwiX29uVG91Y2hTdGFydCIsIl9vblRvdWNoRHJhZyIsIl9vblRvdWNoUm90YXRlIiwiX29uVG91Y2hFbmQiLCJfb25Ub3VjaFRhcCIsIl9vblpvb20iLCJfb25ab29tRW5kIiwicHJvcFR5cGVzIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O29EQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxJQUFULEdBQWdCLENBQUU7O0FB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QVUsS0FBS0MsT0FaakI7QUFhRSx1QkFBYSxLQUFLQyxVQWJwQjtBQWNFLG1CQUFTLEtBQUtqSixLQUFMLENBQVd4QixLQWR0QjtBQWVFLG9CQUFVLEtBQUt3QixLQUFMLENBQVd2QixNQWZ2QjtBQWlCSTRKO0FBakJKLFNBREY7QUFzQkQ7O0FBRUQsYUFDRTtBQUFBO0FBQUE7QUFDRSw4QkFDSyxLQUFLckksS0FBTCxDQUFXa0IsS0FEaEI7QUFFRTFDLG1CQUFPLEtBQUt3QixLQUFMLENBQVd4QixLQUZwQjtBQUdFQyxvQkFBUSxLQUFLdUIsS0FBTCxDQUFXdkIsTUFIckI7QUFJRTZKLHNCQUFVO0FBSlosWUFERjtBQVFJRDtBQVJKLE9BREY7QUFhRDs7Ozs2QkFyZk1hLFMsR0FBWXpMLFUsVUFDWjBMLFksR0FBZXhKLGE7O2tCQVBIRyxLIiwiZmlsZSI6Im1hcC5yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMsIENvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGF1dG9iaW5kIGZyb20gJ2F1dG9iaW5kLWRlY29yYXRvcic7XG5pbXBvcnQgcHVyZVJlbmRlciBmcm9tICdwdXJlLXJlbmRlci1kZWNvcmF0b3InO1xuXG5pbXBvcnQgbWFwYm94Z2wsIHtQb2ludH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7c2VsZWN0fSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5pbXBvcnQgTWFwSW50ZXJhY3Rpb25zIGZyb20gJy4vbWFwLWludGVyYWN0aW9ucy5yZWFjdCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuaW1wb3J0IHtnZXRJbnRlcmFjdGl2ZUxheWVySWRzfSBmcm9tICcuL3V0aWxzL3N0eWxlLXV0aWxzJztcbmltcG9ydCBkaWZmU3R5bGVzIGZyb20gJy4vdXRpbHMvZGlmZi1zdHlsZXMnO1xuaW1wb3J0IHttb2QsIHVucHJvamVjdEZyb21UcmFuc2Zvcm0sIGNsb25lVHJhbnNmb3JtfSBmcm9tICcuL3V0aWxzL3RyYW5zZm9ybSc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyBOb3RlOiBNYXggcGl0Y2ggaXMgYSBoYXJkIGNvZGVkIHZhbHVlIChub3QgYSBuYW1lZCBjb25zdGFudCkgaW4gdHJhbnNmb3JtLmpzXG5jb25zdCBNQVhfUElUQ0ggPSA2MDtcbmNvbnN0IFBJVENIX01PVVNFX1RIUkVTSE9MRCA9IDIwO1xuY29uc3QgUElUQ0hfQUNDRUwgPSAxLjI7XG5cbmNvbnN0IFBST1BfVFlQRVMgPSB7XG4gIC8qKlxuICAgICogVGhlIGxhdGl0dWRlIG9mIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICAqL1xuICBsYXRpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAvKipcbiAgICAqIFRoZSBsb25naXR1ZGUgb2YgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxuICAgICovXG4gIGxvbmdpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAvKipcbiAgICAqIFRoZSB0aWxlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cbiAgICAqL1xuICB6b29tOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogVGhlIG1heGltdW0gdGlsZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuIERlZmF1bHRzIHRvIDIwLlxuICAgICogSW5jcmVhc2luZyB0aGlzIHdpbGwgYWxsb3cgeW91IHRvIHpvb20gZnVydGhlciBpbnRvIHRoZSBtYXAgYnV0IHNob3VsZFxuICAgICogb25seSBiZSB1c2VkIGlmIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBwYXN0IHpvb20gMjAuIFRoZSBkZWZhdWx0XG4gICAgKiBtYXAgc3R5bGVzIHdvbid0IHJlbmRlciBhbnl0aGluZyB1c2VmdWwgcGFzdCAyMC5cbiAgICAqL1xuICBtYXhab29tOiBQcm9wVHlwZXMubnVtYmVyLFxuICAvKipcbiAgICAqIFRoZSBNYXBib3ggc3R5bGUgdGhlIGNvbXBvbmVudCBzaG91bGQgdXNlLiBDYW4gZWl0aGVyIGJlIGEgc3RyaW5nIHVybFxuICAgICogb3IgYSBNYXBib3hHTCBzdHlsZSBJbW11dGFibGUuTWFwIG9iamVjdC5cbiAgICAqL1xuICBtYXBTdHlsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihJbW11dGFibGUuTWFwKVxuICBdKSxcbiAgLyoqXG4gICAgKiBUaGUgTWFwYm94IEFQSSBhY2Nlc3MgdG9rZW4gdG8gcHJvdmlkZSB0byBtYXBib3gtZ2wtanMuIFRoaXMgaXMgcmVxdWlyZWRcbiAgICAqIHdoZW4gdXNpbmcgTWFwYm94IHByb3ZpZGVkIHZlY3RvciB0aWxlcyBhbmQgc3R5bGVzLlxuICAgICovXG4gIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAvKipcbiAgICAqIGBvbkNoYW5nZVZpZXdwb3J0YCBjYWxsYmFjayBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0ZWQgd2l0aCB0aGVcbiAgICAqIG1hcC4gVGhlIG9iamVjdCBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrIGNvbnRhaW5zIGBsYXRpdHVkZWAsXG4gICAgKiBgbG9uZ2l0dWRlYCBhbmQgYHpvb21gIGFuZCBhZGRpdGlvbmFsIHN0YXRlIGluZm9ybWF0aW9uLlxuICAgICovXG4gIG9uQ2hhbmdlVmlld3BvcnQ6IFByb3BUeXBlcy5mdW5jLFxuICAvKipcbiAgICAqIFRoZSB3aWR0aCBvZiB0aGUgbWFwLlxuICAgICovXG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogVGhlIGhlaWdodCBvZiB0aGUgbWFwLlxuICAgICovXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAvKipcbiAgICAqIElzIHRoZSBjb21wb25lbnQgY3VycmVudGx5IGJlaW5nIGRyYWdnZWQuIFRoaXMgaXMgdXNlZCB0byBzaG93L2hpZGUgdGhlXG4gICAgKiBkcmFnIGN1cnNvci4gQWxzbyB1c2VkIGFzIGFuIG9wdGltaXphdGlvbiBpbiBzb21lIG92ZXJsYXlzIGJ5IHByZXZlbnRpbmdcbiAgICAqIHJlbmRlcmluZyB3aGlsZSBkcmFnZ2luZy5cbiAgICAqL1xuICBpc0RyYWdnaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgLyoqXG4gICAgKiBSZXF1aXJlZCB0byBjYWxjdWxhdGUgdGhlIG1vdXNlIHByb2plY3Rpb24gYWZ0ZXIgdGhlIGZpcnN0IGNsaWNrIGV2ZW50XG4gICAgKiBkdXJpbmcgZHJhZ2dpbmcuIFdoZXJlIHRoZSBtYXAgaXMgZGVwZW5kcyBvbiB3aGVyZSB5b3UgZmlyc3QgY2xpY2tlZCBvblxuICAgICogdGhlIG1hcC5cbiAgICAqL1xuICBzdGFydERyYWdMbmdMYXQ6IFByb3BUeXBlcy5hcnJheSxcbiAgLyoqXG4gICAgKiBDYWxsZWQgd2hlbiBhIGZlYXR1cmUgaXMgaG92ZXJlZCBvdmVyLiBVc2VzIE1hcGJveCdzXG4gICAgKiBxdWVyeVJlbmRlcmVkRmVhdHVyZXMgQVBJIHRvIGZpbmQgZmVhdHVyZXMgdW5kZXIgdGhlIHBvaW50ZXI6XG4gICAgKiBodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI01hcCNxdWVyeVJlbmRlcmVkRmVhdHVyZXNcbiAgICAqIFRvIHF1ZXJ5IG9ubHkgc29tZSBvZiB0aGUgbGF5ZXJzLCBzZXQgdGhlIGBpbnRlcmFjdGl2ZWAgcHJvcGVydHkgaW4gdGhlXG4gICAgKiBsYXllciBzdHlsZSB0byBgdHJ1ZWAuIFNlZSBNYXBib3gncyBzdHlsZSBzcGVjXG4gICAgKiBodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC1nbC1zdHlsZS1zcGVjLyNsYXllci1pbnRlcmFjdGl2ZVxuICAgICogSWYgbm8gaW50ZXJhY3RpdmUgbGF5ZXJzIGFyZSBmb3VuZCAoZS5nLiB1c2luZyBNYXBib3gncyBkZWZhdWx0IHN0eWxlcyksXG4gICAgKiB3aWxsIGZhbGwgYmFjayB0byBxdWVyeSBhbGwgbGF5ZXJzLlxuICAgICogQGNhbGxiYWNrXG4gICAgKiBAcGFyYW0ge2FycmF5fSBmZWF0dXJlcyAtIFRoZSBhcnJheSBvZiBmZWF0dXJlcyB0aGUgbW91c2UgaXMgb3Zlci5cbiAgICAqL1xuICBvbkhvdmVyRmVhdHVyZXM6IFByb3BUeXBlcy5mdW5jLFxuICAvKipcbiAgICAqIERlZmF1bHRzIHRvIFRSVUVcbiAgICAqIFNldCB0byBmYWxzZSB0byBlbmFibGUgb25Ib3ZlckZlYXR1cmVzIHRvIGJlIGNhbGxlZCByZWdhcmRsZXNzIGlmXG4gICAgKiB0aGVyZSBpcyBhbiBhY3R1YWwgZmVhdHVyZSBhdCB4LCB5LiBUaGlzIGlzIHVzZWZ1bCB0byBlbXVsYXRlXG4gICAgKiBcIm1vdXNlLW91dFwiIGJlaGF2aW9ycyBvbiBmZWF0dXJlcy5cbiAgICAqL1xuICBpZ25vcmVFbXB0eUZlYXR1cmVzOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICAqIFNob3cgYXR0cmlidXRpb24gY29udHJvbCBvciBub3QuXG4gICAgKi9cbiAgYXR0cmlidXRpb25Db250cm9sOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG1hcCBpcyBjbGlja2VkLiBUaGUgaGFuZGxlciBpcyBjYWxsZWQgd2l0aCB0aGUgY2xpY2tlZFxuICAgKiBjb29yZGluYXRlcyAoaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNMbmdMYXQpIGFuZCB0aGVcbiAgICogc2NyZWVuIGNvb3JkaW5hdGVzIChodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI1BvaW50TGlrZSkuXG4gICAqL1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICAqIENhbGxlZCB3aGVuIGEgZmVhdHVyZSBpcyBjbGlja2VkIG9uLiBVc2VzIE1hcGJveCdzXG4gICAgKiBxdWVyeVJlbmRlcmVkRmVhdHVyZXMgQVBJIHRvIGZpbmQgZmVhdHVyZXMgdW5kZXIgdGhlIHBvaW50ZXI6XG4gICAgKiBodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI01hcCNxdWVyeVJlbmRlcmVkRmVhdHVyZXNcbiAgICAqIFRvIHF1ZXJ5IG9ubHkgc29tZSBvZiB0aGUgbGF5ZXJzLCBzZXQgdGhlIGBpbnRlcmFjdGl2ZWAgcHJvcGVydHkgaW4gdGhlXG4gICAgKiBsYXllciBzdHlsZSB0byBgdHJ1ZWAuIFNlZSBNYXBib3gncyBzdHlsZSBzcGVjXG4gICAgKiBodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC1nbC1zdHlsZS1zcGVjLyNsYXllci1pbnRlcmFjdGl2ZVxuICAgICogSWYgbm8gaW50ZXJhY3RpdmUgbGF5ZXJzIGFyZSBmb3VuZCAoZS5nLiB1c2luZyBNYXBib3gncyBkZWZhdWx0IHN0eWxlcyksXG4gICAgKiB3aWxsIGZhbGwgYmFjayB0byBxdWVyeSBhbGwgbGF5ZXJzLlxuICAgICovXG4gIG9uQ2xpY2tGZWF0dXJlczogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAgKiBSYWRpdXMgdG8gZGV0ZWN0IGZlYXR1cmVzIGFyb3VuZCBhIGNsaWNrZWQgcG9pbnQuIERlZmF1bHRzIHRvIDE1LlxuICAgICovXG4gIGNsaWNrUmFkaXVzOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgICogUGFzc2VkIHRvIE1hcGJveCBNYXAgY29uc3RydWN0b3Igd2hpY2ggcGFzc2VzIGl0IHRvIHRoZSBjYW52YXMgY29udGV4dC5cbiAgICAqIFRoaXMgaXMgdW5zZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGV4cG9ydCB0aGUgY2FudmFzIGFzIGEgUE5HLlxuICAgICovXG4gIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAgKiBUaGVyZSBhcmUgc3RpbGwga25vd24gaXNzdWVzIHdpdGggc3R5bGUgZGlmZmluZy4gQXMgYSB0ZW1wb3Jhcnkgc3RvcGdhcCxcbiAgICAqIGFkZCB0aGUgb3B0aW9uIHRvIHByZXZlbnQgc3R5bGUgZGlmZmluZy5cbiAgICAqL1xuICBwcmV2ZW50U3R5bGVEaWZmaW5nOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICAqIEVuYWJsZXMgcGVyc3BlY3RpdmUgY29udHJvbCBldmVudCBoYW5kbGluZ1xuICAgICovXG4gIHBlcnNwZWN0aXZlRW5hYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAgKiBTcGVjaWZ5IHRoZSBiZWFyaW5nIG9mIHRoZSB2aWV3cG9ydFxuICAgICovXG4gIGJlYXJpbmc6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAgKiBTcGVjaWZ5IHRoZSBwaXRjaCBvZiB0aGUgdmlld3BvcnRcbiAgICAqL1xuICBwaXRjaDogUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICAqIFNwZWNpZnkgdGhlIGFsdGl0dWRlIG9mIHRoZSB2aWV3cG9ydCBjYW1lcmFcbiAgICAqIFVuaXQ6IG1hcCBoZWlnaHRzLCBkZWZhdWx0IDEuNVxuICAgICogTm9uLXB1YmxpYyBBUEksIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC1nbC1qcy9pc3N1ZXMvMTEzN1xuICAgICovXG4gIGFsdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgICogVGhlIGxvYWQgY2FsbGJhY2sgaXMgY2FsbGVkIHdoZW4gYWxsIGRlcGVuZGVuY2llcyBoYXZlIGJlZW4gbG9hZGVkIGFuZFxuICAgICogdGhlIG1hcCBpcyByZWFkeS5cbiAgICAqL1xuICBvbkxvYWQ6IFByb3BUeXBlcy5mdW5jXG5cbn07XG5cbmNvbnN0IERFRkFVTFRfUFJPUFMgPSB7XG4gIG1hcFN0eWxlOiAnbWFwYm94Oi8vc3R5bGVzL21hcGJveC9saWdodC12OScsXG4gIG9uQ2hhbmdlVmlld3BvcnQ6IG51bGwsXG4gIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBjb25maWcuREVGQVVMVFMuTUFQQk9YX0FQSV9BQ0NFU1NfVE9LRU4sXG4gIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogZmFsc2UsXG4gIGF0dHJpYnV0aW9uQ29udHJvbDogdHJ1ZSxcbiAgaWdub3JlRW1wdHlGZWF0dXJlczogdHJ1ZSxcbiAgYmVhcmluZzogMCxcbiAgcGl0Y2g6IDAsXG4gIGFsdGl0dWRlOiAxLjUsXG4gIGNsaWNrUmFkaXVzOiAxNSxcbiAgbWF4Wm9vbTogMjBcbn07XG5cbkBwdXJlUmVuZGVyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBHTCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgc3RhdGljIHN1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gbWFwYm94Z2wuc3VwcG9ydGVkKCk7XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0gUFJPUF9UWVBFUztcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IERFRkFVTFRfUFJPUFM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzU3VwcG9ydGVkOiBtYXBib3hnbC5zdXBwb3J0ZWQoKSxcbiAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgaXNIb3ZlcmluZzogZmFsc2UsXG4gICAgICBzdGFydERyYWdMbmdMYXQ6IG51bGwsXG4gICAgICBzdGFydEJlYXJpbmc6IG51bGwsXG4gICAgICBzdGFydFBpdGNoOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLl9xdWVyeVBhcmFtcyA9IHt9O1xuICAgIG1hcGJveGdsLmFjY2Vzc1Rva2VuID0gcHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW47XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNTdXBwb3J0ZWQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50RGlkTW91bnQgPSBub29wO1xuICAgICAgdGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gbm9vcDtcbiAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlID0gbm9vcDtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBtYXBTdHlsZSA9IEltbXV0YWJsZS5NYXAuaXNNYXAodGhpcy5wcm9wcy5tYXBTdHlsZSkgP1xuICAgICAgdGhpcy5wcm9wcy5tYXBTdHlsZS50b0pTKCkgOlxuICAgICAgdGhpcy5wcm9wcy5tYXBTdHlsZTtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyBtYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiB0aGlzLnJlZnMubWFwYm94TWFwLFxuICAgICAgY2VudGVyOiBbdGhpcy5wcm9wcy5sb25naXR1ZGUsIHRoaXMucHJvcHMubGF0aXR1ZGVdLFxuICAgICAgem9vbTogdGhpcy5wcm9wcy56b29tLFxuICAgICAgbWF4Wm9vbTogdGhpcy5wcm9wcy5tYXhab29tLFxuICAgICAgcGl0Y2g6IHRoaXMucHJvcHMucGl0Y2gsXG4gICAgICBiZWFyaW5nOiB0aGlzLnByb3BzLmJlYXJpbmcsXG4gICAgICBzdHlsZTogbWFwU3R5bGUsXG4gICAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRoaXMucHJvcHMucHJlc2VydmVEcmF3aW5nQnVmZmVyXG4gICAgICAvLyBUT0RPP1xuICAgICAgLy8gYXR0cmlidXRpb25Db250cm9sOiB0aGlzLnByb3BzLmF0dHJpYnV0aW9uQ29udHJvbFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25Mb2FkKSB7XG4gICAgICBtYXAub25jZSgnbG9hZCcsICgpID0+IHRoaXMucHJvcHMub25Mb2FkKCkpO1xuICAgIH1cblxuICAgIHNlbGVjdChtYXAuZ2V0Q2FudmFzKCkpLnN0eWxlKCdvdXRsaW5lJywgJ25vbmUnKTtcblxuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLl91cGRhdGVNYXBWaWV3cG9ydCh7fSwgdGhpcy5wcm9wcyk7XG4gICAgLy8gRElGRkVSRU5DRTogZXhwb3NlIG1hcCBib3VuZHMgb24gdmlld3BvcnQgY2hhbmdlXG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQobWFwLnRyYW5zZm9ybSwge21hcH0pO1xuICAgIHRoaXMuX3VwZGF0ZVF1ZXJ5UGFyYW1zKG1hcFN0eWxlKTtcbiAgfVxuXG4gIC8vIE5ldyBwcm9wcyBhcmUgY29taW4nIHJvdW5kIHRoZSBjb3JuZXIhXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICB0aGlzLl91cGRhdGVTdGF0ZUZyb21Qcm9wcyh0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gICAgdGhpcy5fdXBkYXRlTWFwVmlld3BvcnQodGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIHRoaXMuX3VwZGF0ZU1hcFN0eWxlKHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICAvLyBTYXZlIHdpZHRoL2hlaWdodCBzbyB0aGF0IHdlIGNhbiBjaGVjayB0aGVtIGluIGNvbXBvbmVudERpZFVwZGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgLy8gbWFwLnJlc2l6ZSgpIHJlYWRzIHNpemUgZnJvbSBET00sIHdlIG5lZWQgdG8gY2FsbCBhZnRlciByZW5kZXJcbiAgICB0aGlzLl91cGRhdGVNYXBTaXplKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEV4dGVybmFsIGFwcHMgY2FuIGFjY2VzcyBtYXAgdGhpcyB3YXlcbiAgX2dldE1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIGEgY3Vyc29yIHN0eWxlXG4gIF9nZXRDdXJzb3IoKSB7XG4gICAgY29uc3QgaXNJbnRlcmFjdGl2ZSA9XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQgfHxcbiAgICAgIHRoaXMucHJvcHMub25DbGlja0ZlYXR1cmUgfHxcbiAgICAgIHRoaXMucHJvcHMub25Ib3ZlckZlYXR1cmVzO1xuICAgIGlmIChpc0ludGVyYWN0aXZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5pc0RyYWdnaW5nID9cbiAgICAgICAgY29uZmlnLkNVUlNPUi5HUkFCQklORyA6XG4gICAgICAgICh0aGlzLnN0YXRlLmlzSG92ZXJpbmcgPyBjb25maWcuQ1VSU09SLlBPSU5URVIgOiBjb25maWcuQ1VSU09SLkdSQUIpO1xuICAgIH1cbiAgICByZXR1cm4gJ2luaGVyaXQnO1xuICB9XG5cbiAgX3VwZGF0ZVN0YXRlRnJvbVByb3BzKG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIG1hcGJveGdsLmFjY2Vzc1Rva2VuID0gbmV3UHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW47XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFydERyYWdMbmdMYXQ6IG5ld1Byb3BzLnN0YXJ0RHJhZ0xuZ0xhdFxuICAgIH0pO1xuICB9XG5cbiAgLy8gSG92ZXIgYW5kIGNsaWNrIG9ubHkgcXVlcnkgbGF5ZXJzIHdob3NlIGludGVyYWN0aXZlIHByb3BlcnR5IGlzIHRydWVcbiAgLy8gSWYgbm8gaW50ZXJhY3Rpdml0eSBpcyBzcGVjaWZpZWQsIHF1ZXJ5IGFsbCBsYXllcnNcbiAgX3VwZGF0ZVF1ZXJ5UGFyYW1zKG1hcFN0eWxlKSB7XG4gICAgY29uc3QgaW50ZXJhY3RpdmVMYXllcklkcyA9IGdldEludGVyYWN0aXZlTGF5ZXJJZHMobWFwU3R5bGUpO1xuICAgIHRoaXMuX3F1ZXJ5UGFyYW1zID0gaW50ZXJhY3RpdmVMYXllcklkcy5sZW5ndGggPT09IDAgPyB7fSA6XG4gICAgICB7bGF5ZXJzOiBpbnRlcmFjdGl2ZUxheWVySWRzfTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBhIHNvdXJjZSBpbiB0aGUgbWFwIHN0eWxlXG4gIF91cGRhdGVTb3VyY2UobWFwLCB1cGRhdGUpIHtcbiAgICBjb25zdCBuZXdTb3VyY2UgPSB1cGRhdGUuc291cmNlLnRvSlMoKTtcbiAgICBpZiAobmV3U291cmNlLnR5cGUgPT09ICdnZW9qc29uJykge1xuICAgICAgY29uc3Qgb2xkU291cmNlID0gbWFwLmdldFNvdXJjZSh1cGRhdGUuaWQpO1xuICAgICAgaWYgKG9sZFNvdXJjZS50eXBlID09PSAnZ2VvanNvbicpIHtcbiAgICAgICAgLy8gdXBkYXRlIGRhdGEgaWYgbm8gb3RoZXIgR2VvSlNPTlNvdXJjZSBvcHRpb25zIHdlcmUgY2hhbmdlZFxuICAgICAgICBjb25zdCBvbGRPcHRzID0gb2xkU291cmNlLndvcmtlck9wdGlvbnM7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAobmV3U291cmNlLm1heHpvb20gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLm1heHpvb20gPT09IG9sZE9wdHMuZ2VvanNvblZ0T3B0aW9ucy5tYXhab29tKSAmJlxuICAgICAgICAgIChuZXdTb3VyY2UuYnVmZmVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5idWZmZXIgPT09IG9sZE9wdHMuZ2VvanNvblZ0T3B0aW9ucy5idWZmZXIpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS50b2xlcmFuY2UgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLnRvbGVyYW5jZSA9PT0gb2xkT3B0cy5nZW9qc29uVnRPcHRpb25zLnRvbGVyYW5jZSkgJiZcbiAgICAgICAgICAobmV3U291cmNlLmNsdXN0ZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLmNsdXN0ZXIgPT09IG9sZE9wdHMuY2x1c3RlcikgJiZcbiAgICAgICAgICAobmV3U291cmNlLmNsdXN0ZXJSYWRpdXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLmNsdXN0ZXJSYWRpdXMgPT09IG9sZE9wdHMuc3VwZXJjbHVzdGVyT3B0aW9ucy5yYWRpdXMpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS5jbHVzdGVyTWF4Wm9vbSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBuZXdTb3VyY2UuY2x1c3Rlck1heFpvb20gPT09IG9sZE9wdHMuc3VwZXJjbHVzdGVyT3B0aW9ucy5tYXhab29tKVxuICAgICAgICApIHtcbiAgICAgICAgICBvbGRTb3VyY2Uuc2V0RGF0YShuZXdTb3VyY2UuZGF0YSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFwLnJlbW92ZVNvdXJjZSh1cGRhdGUuaWQpO1xuICAgIG1hcC5hZGRTb3VyY2UodXBkYXRlLmlkLCBuZXdTb3VyY2UpO1xuICB9XG5cbiAgLy8gSW5kaXZpZHVhbGx5IHVwZGF0ZSB0aGUgbWFwcyBzb3VyY2UgYW5kIGxheWVycyB0aGF0IGhhdmUgY2hhbmdlZCBpZiBhbGxcbiAgLy8gb3RoZXIgc3R5bGUgcHJvcHMgaGF2ZW4ndCBjaGFuZ2VkLiBUaGlzIHByZXZlbnRzIGZsaWNraW5nIG9mIHRoZSBtYXAgd2hlblxuICAvLyBzdHlsZXMgb25seSBjaGFuZ2Ugc291cmNlcyBvciBsYXllcnMuXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLCBjb21wbGV4aXR5ICovXG4gIF9zZXREaWZmU3R5bGUocHJldlN0eWxlLCBuZXh0U3R5bGUpIHtcbiAgICBjb25zdCBwcmV2S2V5c01hcCA9IHByZXZTdHlsZSAmJiBzdHlsZUtleXNNYXAocHJldlN0eWxlKSB8fCB7fTtcbiAgICBjb25zdCBuZXh0S2V5c01hcCA9IHN0eWxlS2V5c01hcChuZXh0U3R5bGUpO1xuICAgIGZ1bmN0aW9uIHN0eWxlS2V5c01hcChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlLm1hcCgoKSA9PiB0cnVlKS5kZWxldGUoJ2xheWVycycpLmRlbGV0ZSgnc291cmNlcycpLnRvSlMoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIoKSB7XG4gICAgICBjb25zdCBwcmV2S2V5c0xpc3QgPSBPYmplY3Qua2V5cyhwcmV2S2V5c01hcCk7XG4gICAgICBjb25zdCBuZXh0S2V5c0xpc3QgPSBPYmplY3Qua2V5cyhuZXh0S2V5c01hcCk7XG4gICAgICBpZiAocHJldktleXNMaXN0Lmxlbmd0aCAhPT0gbmV4dEtleXNMaXN0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGBuZXh0U3R5bGVgIGFuZCBgcHJldlN0eWxlYCBzaG91bGQgbm90IGhhdmUgdGhlIHNhbWUgc2V0IG9mIHByb3BzLlxuICAgICAgaWYgKG5leHRLZXlzTGlzdC5zb21lKFxuICAgICAgICBrZXkgPT4gcHJldlN0eWxlLmdldChrZXkpICE9PSBuZXh0U3R5bGUuZ2V0KGtleSlcbiAgICAgICAgLy8gQnV0IHRoZSB2YWx1ZSBvZiBvbmUgb2YgdGhvc2UgcHJvcHMgaXMgZGlmZmVyZW50LlxuICAgICAgKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXAgPSB0aGlzLl9tYXA7XG5cbiAgICBpZiAoIXByZXZTdHlsZSB8fCBwcm9wc090aGVyVGhhbkxheWVyc09yU291cmNlc0RpZmZlcigpKSB7XG4gICAgICBtYXAuc2V0U3R5bGUobmV4dFN0eWxlLnRvSlMoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge3NvdXJjZXNEaWZmLCBsYXllcnNEaWZmfSA9IGRpZmZTdHlsZXMocHJldlN0eWxlLCBuZXh0U3R5bGUpO1xuXG4gICAgLy8gVE9ETzogSXQncyByYXRoZXIgZGlmZmljdWx0IHRvIGRldGVybWluZSBzdHlsZSBkaWZmaW5nIGluIHRoZSBwcmVzZW5jZVxuICAgIC8vIG9mIHJlZnMuIEZvciBub3csIGlmIGFueSBzdHlsZSB1cGRhdGUgaGFzIGEgcmVmLCBmYWxsYmFjayB0byBubyBkaWZmaW5nLlxuICAgIC8vIFdlIGNhbiBjb21lIGJhY2sgdG8gdGhpcyBjYXNlIGlmIHRoZXJlJ3MgYSBzb2xpZCB1c2VjYXNlLlxuICAgIGlmIChsYXllcnNEaWZmLnVwZGF0ZXMuc29tZShub2RlID0+IG5vZGUubGF5ZXIuZ2V0KCdyZWYnKSkpIHtcbiAgICAgIG1hcC5zZXRTdHlsZShuZXh0U3R5bGUudG9KUygpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGVudGVyIG9mIHNvdXJjZXNEaWZmLmVudGVyKSB7XG4gICAgICBtYXAuYWRkU291cmNlKGVudGVyLmlkLCBlbnRlci5zb3VyY2UudG9KUygpKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCB1cGRhdGUgb2Ygc291cmNlc0RpZmYudXBkYXRlKSB7XG4gICAgICB0aGlzLl91cGRhdGVTb3VyY2UobWFwLCB1cGRhdGUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGV4aXQgb2Ygc291cmNlc0RpZmYuZXhpdCkge1xuICAgICAgbWFwLnJlbW92ZVNvdXJjZShleGl0LmlkKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBleGl0IG9mIGxheWVyc0RpZmYuZXhpdGluZykge1xuICAgICAgaWYgKG1hcC5zdHlsZS5nZXRMYXllcihleGl0LmlkKSkge1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIoZXhpdC5pZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdXBkYXRlIG9mIGxheWVyc0RpZmYudXBkYXRlcykge1xuICAgICAgaWYgKCF1cGRhdGUuZW50ZXIpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBvbGQgbGF5ZXIgdGhhdCBuZWVkcyB0byBiZSB1cGRhdGVkLiBSZW1vdmUgdGhlIG9sZCBsYXllclxuICAgICAgICAvLyB3aXRoIHRoZSBzYW1lIGlkIGFuZCBhZGQgaXQgYmFjayBhZ2Fpbi5cbiAgICAgICAgbWFwLnJlbW92ZUxheWVyKHVwZGF0ZS5pZCk7XG4gICAgICB9XG4gICAgICBtYXAuYWRkTGF5ZXIodXBkYXRlLmxheWVyLnRvSlMoKSwgdXBkYXRlLmJlZm9yZSk7XG4gICAgfVxuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMsIGNvbXBsZXhpdHkgKi9cblxuICBfdXBkYXRlTWFwU3R5bGUob2xkUHJvcHMsIG5ld1Byb3BzKSB7XG4gICAgY29uc3QgbWFwU3R5bGUgPSBuZXdQcm9wcy5tYXBTdHlsZTtcbiAgICBjb25zdCBvbGRNYXBTdHlsZSA9IG9sZFByb3BzLm1hcFN0eWxlO1xuICAgIGlmIChtYXBTdHlsZSAhPT0gb2xkTWFwU3R5bGUpIHtcbiAgICAgIGlmIChJbW11dGFibGUuTWFwLmlzTWFwKG1hcFN0eWxlKSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wcmV2ZW50U3R5bGVEaWZmaW5nKSB7XG4gICAgICAgICAgdGhpcy5fbWFwLnNldFN0eWxlKG1hcFN0eWxlLnRvSlMoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2V0RGlmZlN0eWxlKG9sZE1hcFN0eWxlLCBtYXBTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX21hcC5zZXRTdHlsZShtYXBTdHlsZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVRdWVyeVBhcmFtcyhtYXBTdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZU1hcFZpZXdwb3J0KG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIGNvbnN0IHZpZXdwb3J0Q2hhbmdlZCA9XG4gICAgICBuZXdQcm9wcy5sYXRpdHVkZSAhPT0gb2xkUHJvcHMubGF0aXR1ZGUgfHxcbiAgICAgIG5ld1Byb3BzLmxvbmdpdHVkZSAhPT0gb2xkUHJvcHMubG9uZ2l0dWRlIHx8XG4gICAgICBuZXdQcm9wcy56b29tICE9PSBvbGRQcm9wcy56b29tIHx8XG4gICAgICBuZXdQcm9wcy5waXRjaCAhPT0gb2xkUHJvcHMucGl0Y2ggfHxcbiAgICAgIG5ld1Byb3BzLnpvb20gIT09IG9sZFByb3BzLmJlYXJpbmcgfHxcbiAgICAgIG5ld1Byb3BzLmFsdGl0dWRlICE9PSBvbGRQcm9wcy5hbHRpdHVkZTtcblxuICAgIGlmICh2aWV3cG9ydENoYW5nZWQpIHtcbiAgICAgIHRoaXMuX21hcC5qdW1wVG8oe1xuICAgICAgICBjZW50ZXI6IFtuZXdQcm9wcy5sb25naXR1ZGUsIG5ld1Byb3BzLmxhdGl0dWRlXSxcbiAgICAgICAgem9vbTogbmV3UHJvcHMuem9vbSxcbiAgICAgICAgYmVhcmluZzogbmV3UHJvcHMuYmVhcmluZyxcbiAgICAgICAgcGl0Y2g6IG5ld1Byb3BzLnBpdGNoXG4gICAgICB9KTtcblxuICAgICAgLy8gVE9ETyAtIGp1bXBUbyBkb2Vzbid0IGhhbmRsZSBhbHRpdHVkZVxuICAgICAgaWYgKG5ld1Byb3BzLmFsdGl0dWRlICE9PSBvbGRQcm9wcy5hbHRpdHVkZSkge1xuICAgICAgICB0aGlzLl9tYXAudHJhbnNmb3JtLmFsdGl0dWRlID0gbmV3UHJvcHMuYWx0aXR1ZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTm90ZTogbmVlZHMgdG8gYmUgY2FsbGVkIGFmdGVyIHJlbmRlciAoZS5nLiBpbiBjb21wb25lbnREaWRVcGRhdGUpXG4gIF91cGRhdGVNYXBTaXplKG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIGNvbnN0IHNpemVDaGFuZ2VkID1cbiAgICAgIG9sZFByb3BzLndpZHRoICE9PSBuZXdQcm9wcy53aWR0aCB8fCBvbGRQcm9wcy5oZWlnaHQgIT09IG5ld1Byb3BzLmhlaWdodDtcblxuICAgIGlmIChzaXplQ2hhbmdlZCkge1xuICAgICAgdGhpcy5fbWFwLnJlc2l6ZSgpO1xuICAgICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodGhpcy5fbWFwLnRyYW5zZm9ybSwge21hcDogdGhpcy5fbWFwfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlcyBhIG5ldyBwaXRjaCBhbmQgYmVhcmluZyBmcm9tIGEgcG9zaXRpb24gKGNvbWluZyBmcm9tIGFuIGV2ZW50KVxuICBfY2FsY3VsYXRlTmV3UGl0Y2hBbmRCZWFyaW5nKHtwb3MsIHN0YXJ0UG9zLCBzdGFydEJlYXJpbmcsIHN0YXJ0UGl0Y2h9KSB7XG4gICAgY29uc3QgeERlbHRhID0gcG9zWzBdIC0gc3RhcnRQb3NbMF07XG4gICAgY29uc3QgYmVhcmluZyA9IHN0YXJ0QmVhcmluZyArIDE4MCAqIHhEZWx0YSAvIHRoaXMucHJvcHMud2lkdGg7XG5cbiAgICBsZXQgcGl0Y2ggPSBzdGFydFBpdGNoO1xuICAgIGNvbnN0IHlEZWx0YSA9IHBvc1sxXSAtIHN0YXJ0UG9zWzFdO1xuICAgIGlmICh5RGVsdGEgPiAwKSB7XG4gICAgICAvLyBEcmFnZ2luZyBkb3dud2FyZHMsIGdyYWR1YWxseSBkZWNyZWFzZSBwaXRjaFxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMucHJvcHMuaGVpZ2h0IC0gc3RhcnRQb3NbMV0pID4gUElUQ0hfTU9VU0VfVEhSRVNIT0xEKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0geURlbHRhIC8gKHRoaXMucHJvcHMuaGVpZ2h0IC0gc3RhcnRQb3NbMV0pO1xuICAgICAgICBwaXRjaCA9ICgxIC0gc2NhbGUpICogUElUQ0hfQUNDRUwgKiBzdGFydFBpdGNoO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeURlbHRhIDwgMCkge1xuICAgICAgLy8gRHJhZ2dpbmcgdXB3YXJkcywgZ3JhZHVhbGx5IGluY3JlYXNlIHBpdGNoXG4gICAgICBpZiAoc3RhcnRQb3NbMV0gPiBQSVRDSF9NT1VTRV9USFJFU0hPTEQpIHtcbiAgICAgICAgLy8gTW92ZSBmcm9tIDAgdG8gMSBhcyB3ZSBkcmFnIHVwd2FyZHNcbiAgICAgICAgY29uc3QgeVNjYWxlID0gMSAtIHBvc1sxXSAvIHN0YXJ0UG9zWzFdO1xuICAgICAgICAvLyBHcmFkdWFsbHkgYWRkIHVudGlsIHdlIGhpdCBtYXggcGl0Y2hcbiAgICAgICAgcGl0Y2ggPSBzdGFydFBpdGNoICsgeVNjYWxlICogKE1BWF9QSVRDSCAtIHN0YXJ0UGl0Y2gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUuZGVidWcoc3RhcnRQaXRjaCwgcGl0Y2gpO1xuICAgIHJldHVybiB7XG4gICAgICBwaXRjaDogTWF0aC5tYXgoTWF0aC5taW4ocGl0Y2gsIE1BWF9QSVRDSCksIDApLFxuICAgICAgYmVhcmluZ1xuICAgIH07XG4gIH1cblxuICAgLy8gSGVscGVyIHRvIGNhbGwgcHJvcHMub25DaGFuZ2VWaWV3cG9ydFxuICBfY2FsbE9uQ2hhbmdlVmlld3BvcnQodHJhbnNmb3JtLCBvcHRzID0ge30pIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQoe1xuICAgICAgICBsYXRpdHVkZTogdHJhbnNmb3JtLmNlbnRlci5sYXQsXG4gICAgICAgIGxvbmdpdHVkZTogbW9kKHRyYW5zZm9ybS5jZW50ZXIubG5nICsgMTgwLCAzNjApIC0gMTgwLFxuICAgICAgICB6b29tOiB0cmFuc2Zvcm0uem9vbSxcbiAgICAgICAgcGl0Y2g6IHRyYW5zZm9ybS5waXRjaCxcbiAgICAgICAgYmVhcmluZzogbW9kKHRyYW5zZm9ybS5iZWFyaW5nICsgMTgwLCAzNjApIC0gMTgwLFxuXG4gICAgICAgIGlzRHJhZ2dpbmc6IHRoaXMucHJvcHMuaXNEcmFnZ2luZyxcbiAgICAgICAgc3RhcnREcmFnTG5nTGF0OiB0aGlzLnByb3BzLnN0YXJ0RHJhZ0xuZ0xhdCxcbiAgICAgICAgc3RhcnRCZWFyaW5nOiB0aGlzLnByb3BzLnN0YXJ0QmVhcmluZyxcbiAgICAgICAgc3RhcnRQaXRjaDogdGhpcy5wcm9wcy5zdGFydFBpdGNoLFxuXG4gICAgICAgIC4uLm9wdHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Ub3VjaFN0YXJ0KG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlRG93bihvcHRzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Ub3VjaERyYWcob3B0cykge1xuICAgIHRoaXMuX29uTW91c2VEcmFnKG9wdHMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vblRvdWNoUm90YXRlKG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlUm90YXRlKG9wdHMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vblRvdWNoRW5kKG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlVXAob3B0cyk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uVG91Y2hUYXAob3B0cykge1xuICAgIHRoaXMuX29uTW91c2VDbGljayhvcHRzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZURvd24oe3Bvc30pIHtcbiAgICBjb25zdCB7dHJhbnNmb3JtfSA9IHRoaXMuX21hcDtcbiAgICBjb25zdCB7bG5nLCBsYXR9ID0gdW5wcm9qZWN0RnJvbVRyYW5zZm9ybSh0cmFuc2Zvcm0sIG5ldyBQb2ludCguLi5wb3MpKTtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0cmFuc2Zvcm0sIHtcbiAgICAgIGlzRHJhZ2dpbmc6IHRydWUsXG4gICAgICBzdGFydERyYWdMbmdMYXQ6IFtsbmcsIGxhdF0sXG4gICAgICBzdGFydEJlYXJpbmc6IHRyYW5zZm9ybS5iZWFyaW5nLFxuICAgICAgc3RhcnRQaXRjaDogdHJhbnNmb3JtLnBpdGNoLFxuICAgICAgbWFwOiB0aGlzLl9tYXBcbiAgICB9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZURyYWcoe3Bvc30pIHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHRha2UgdGhlIHN0YXJ0IGxuZ2xhdCBhbmQgcHV0IGl0IHdoZXJlIHRoZSBtb3VzZSBpcyBkb3duLlxuICAgIGFzc2VydCh0aGlzLnByb3BzLnN0YXJ0RHJhZ0xuZ0xhdCwgJ2BzdGFydERyYWdMbmdMYXRgIHByb3AgaXMgcmVxdWlyZWQgJyArXG4gICAgICAnZm9yIG1vdXNlIGRyYWcgYmVoYXZpb3IgdG8gY2FsY3VsYXRlIHdoZXJlIHRvIHBvc2l0aW9uIHRoZSBtYXAuJyk7XG5cbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBjbG9uZVRyYW5zZm9ybSh0aGlzLl9tYXAudHJhbnNmb3JtKTtcbiAgICBjb25zdCBbbG5nLCBsYXRdID0gdGhpcy5wcm9wcy5zdGFydERyYWdMbmdMYXQ7XG4gICAgdHJhbnNmb3JtLnNldExvY2F0aW9uQXRQb2ludCh7bG5nLCBsYXR9LCBuZXcgUG9pbnQoLi4ucG9zKSk7XG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodHJhbnNmb3JtLCB7aXNEcmFnZ2luZzogdHJ1ZSwgbWFwOiB0aGlzLl9tYXB9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZVJvdGF0ZSh7cG9zLCBzdGFydFBvc30pIHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCB8fCAhdGhpcy5wcm9wcy5wZXJzcGVjdGl2ZUVuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7c3RhcnRCZWFyaW5nLCBzdGFydFBpdGNofSA9IHRoaXMucHJvcHM7XG4gICAgYXNzZXJ0KHR5cGVvZiBzdGFydEJlYXJpbmcgPT09ICdudW1iZXInLFxuICAgICAgJ2BzdGFydEJlYXJpbmdgIHByb3AgaXMgcmVxdWlyZWQgZm9yIG1vdXNlIHJvdGF0ZSBiZWhhdmlvcicpO1xuICAgIGFzc2VydCh0eXBlb2Ygc3RhcnRQaXRjaCA9PT0gJ251bWJlcicsXG4gICAgICAnYHN0YXJ0UGl0Y2hgIHByb3AgaXMgcmVxdWlyZWQgZm9yIG1vdXNlIHJvdGF0ZSBiZWhhdmlvcicpO1xuXG4gICAgY29uc3Qge3BpdGNoLCBiZWFyaW5nfSA9IHRoaXMuX2NhbGN1bGF0ZU5ld1BpdGNoQW5kQmVhcmluZyh7XG4gICAgICBwb3MsXG4gICAgICBzdGFydFBvcyxcbiAgICAgIHN0YXJ0QmVhcmluZyxcbiAgICAgIHN0YXJ0UGl0Y2hcbiAgICB9KTtcblxuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGNsb25lVHJhbnNmb3JtKHRoaXMuX21hcC50cmFuc2Zvcm0pO1xuICAgIHRyYW5zZm9ybS5iZWFyaW5nID0gYmVhcmluZztcbiAgICB0cmFuc2Zvcm0ucGl0Y2ggPSBwaXRjaDtcblxuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRyYW5zZm9ybSwge2lzRHJhZ2dpbmc6IHRydWUsIG1hcDogdGhpcy5fbWFwfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VNb3ZlKHtwb3N9KSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm9uSG92ZXJGZWF0dXJlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMuX21hcC5xdWVyeVJlbmRlcmVkRmVhdHVyZXMobmV3IFBvaW50KC4uLnBvcyksIHRoaXMuX3F1ZXJ5UGFyYW1zKTtcbiAgICBpZiAoIWZlYXR1cmVzLmxlbmd0aCAmJiB0aGlzLnByb3BzLmlnbm9yZUVtcHR5RmVhdHVyZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNIb3ZlcmluZzogZmVhdHVyZXMubGVuZ3RoID4gMH0pO1xuICAgIHRoaXMucHJvcHMub25Ib3ZlckZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZVVwKG9wdCkge1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRoaXMuX21hcC50cmFuc2Zvcm0sIHtcbiAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgc3RhcnREcmFnTG5nTGF0OiBudWxsLFxuICAgICAgc3RhcnRCZWFyaW5nOiBudWxsLFxuICAgICAgc3RhcnRQaXRjaDogbnVsbCxcbiAgICAgIG1hcDogdGhpcy5fbWFwXG4gICAgfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VDbGljayh7cG9zfSkge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkNsaWNrRmVhdHVyZXMgJiYgIXRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IHBvaW50ID0gbmV3IFBvaW50KC4uLnBvcyk7XG4gICAgICBjb25zdCBsYXRMb25nID0gdGhpcy5fbWFwLnVucHJvamVjdChwb2ludCk7XG4gICAgICAvLyBUT0RPIC0gRG8gd2UgcmVhbGx5IHdhbnQgdG8gZXhwb3NlIGEgbWFwYm94IFwiUG9pbnRcIiBpbiBvdXIgaW50ZXJmYWNlP1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGxhdExvbmcsIHBvaW50KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrRmVhdHVyZXMpIHtcbiAgICAgIC8vIFJhZGl1cyBlbmFibGVzIHBvaW50IGZlYXR1cmVzLCBsaWtlIG1hcmtlciBzeW1ib2xzLCB0byBiZSBjbGlja2VkLlxuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMucHJvcHMuY2xpY2tSYWRpdXM7XG4gICAgICBjb25zdCBiYm94ID0gW1twb3NbMF0gLSBzaXplLCBwb3NbMV0gLSBzaXplXSwgW3Bvc1swXSArIHNpemUsIHBvc1sxXSArIHNpemVdXTtcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5fbWFwLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhiYm94LCB0aGlzLl9xdWVyeVBhcmFtcyk7XG4gICAgICBpZiAoIWZlYXR1cmVzLmxlbmd0aCAmJiB0aGlzLnByb3BzLmlnbm9yZUVtcHR5RmVhdHVyZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrRmVhdHVyZXMoZmVhdHVyZXMpO1xuICAgIH1cbiAgfVxuXG4gIEBhdXRvYmluZCBfb25ab29tKHtwb3MsIHNjYWxlfSkge1xuICAgIGNvbnN0IHBvaW50ID0gbmV3IFBvaW50KC4uLnBvcyk7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gY2xvbmVUcmFuc2Zvcm0odGhpcy5fbWFwLnRyYW5zZm9ybSk7XG4gICAgY29uc3QgYXJvdW5kID0gdW5wcm9qZWN0RnJvbVRyYW5zZm9ybSh0cmFuc2Zvcm0sIHBvaW50KTtcbiAgICB0cmFuc2Zvcm0uem9vbSA9IHRyYW5zZm9ybS5zY2FsZVpvb20odGhpcy5fbWFwLnRyYW5zZm9ybS5zY2FsZSAqIHNjYWxlKTtcbiAgICB0cmFuc2Zvcm0uc2V0TG9jYXRpb25BdFBvaW50KGFyb3VuZCwgcG9pbnQpO1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRyYW5zZm9ybSwge2lzRHJhZ2dpbmc6IHRydWUsIG1hcDogdGhpcy5fbWFwfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uWm9vbUVuZCgpIHtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0aGlzLl9tYXAudHJhbnNmb3JtLCB7aXNEcmFnZ2luZzogZmFsc2UsIG1hcDogdGhpcy5fbWFwfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NsYXNzTmFtZSwgd2lkdGgsIGhlaWdodCwgc3R5bGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtYXBTdHlsZSA9IHtcbiAgICAgIC4uLnN0eWxlLFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBjdXJzb3I6IHRoaXMuX2dldEN1cnNvcigpXG4gICAgfTtcblxuICAgIGxldCBjb250ZW50ID0gW1xuICAgICAgPGRpdiBrZXk9XCJtYXBcIiByZWY9XCJtYXBib3hNYXBcIlxuICAgICAgICBzdHlsZT17IG1hcFN0eWxlIH0gY2xhc3NOYW1lPXsgY2xhc3NOYW1lIH0vPixcbiAgICAgIDxkaXYga2V5PVwib3ZlcmxheXNcIiBjbGFzc05hbWU9XCJvdmVybGF5c1wiXG4gICAgICAgIHN0eWxlPXsge3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDB9IH0+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNTdXBwb3J0ZWQgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KSB7XG4gICAgICBjb250ZW50ID0gKFxuICAgICAgICA8TWFwSW50ZXJhY3Rpb25zXG4gICAgICAgICAgb25Nb3VzZURvd24gPXsgdGhpcy5fb25Nb3VzZURvd24gfVxuICAgICAgICAgIG9uTW91c2VEcmFnID17IHRoaXMuX29uTW91c2VEcmFnIH1cbiAgICAgICAgICBvbk1vdXNlUm90YXRlID17IHRoaXMuX29uTW91c2VSb3RhdGUgfVxuICAgICAgICAgIG9uTW91c2VVcCA9eyB0aGlzLl9vbk1vdXNlVXAgfVxuICAgICAgICAgIG9uTW91c2VNb3ZlID17IHRoaXMuX29uTW91c2VNb3ZlIH1cbiAgICAgICAgICBvbk1vdXNlQ2xpY2sgPSB7IHRoaXMuX29uTW91c2VDbGljayB9XG4gICAgICAgICAgb25Ub3VjaFN0YXJ0ID17IHRoaXMuX29uVG91Y2hTdGFydCB9XG4gICAgICAgICAgb25Ub3VjaERyYWcgPXsgdGhpcy5fb25Ub3VjaERyYWcgfVxuICAgICAgICAgIG9uVG91Y2hSb3RhdGUgPXsgdGhpcy5fb25Ub3VjaFJvdGF0ZSB9XG4gICAgICAgICAgb25Ub3VjaEVuZCA9eyB0aGlzLl9vblRvdWNoRW5kIH1cbiAgICAgICAgICBvblRvdWNoVGFwID0geyB0aGlzLl9vblRvdWNoVGFwIH1cbiAgICAgICAgICBvblpvb20gPXsgdGhpcy5fb25ab29tIH1cbiAgICAgICAgICBvblpvb21FbmQgPXsgdGhpcy5fb25ab29tRW5kIH1cbiAgICAgICAgICB3aWR0aCA9eyB0aGlzLnByb3BzLndpZHRoIH1cbiAgICAgICAgICBoZWlnaHQgPXsgdGhpcy5wcm9wcy5oZWlnaHQgfT5cblxuICAgICAgICAgIHsgY29udGVudCB9XG5cbiAgICAgICAgPC9NYXBJbnRlcmFjdGlvbnM+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXsge1xuICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICB9IH0+XG5cbiAgICAgICAgeyBjb250ZW50IH1cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19