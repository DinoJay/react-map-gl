'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp; // Copyright (c) 2015 Uber Technologies, Inc.

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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _svgTransform = require('svg-transform');

var _svgTransform2 = _interopRequireDefault(_svgTransform);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _viewportMercatorProject = require('viewport-mercator-project');

var _viewportMercatorProject2 = _interopRequireDefault(_viewportMercatorProject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function mouse(container, event) {
  var rect = container.getBoundingClientRect();
  var x = event.clientX - rect.left - container.clientLeft;
  var y = event.clientY - rect.top - container.clientTop;
  return [x, y];
}

var DraggablePointsOverlay = (_class = (_temp = _class2 = function (_Component) {
  _inherits(DraggablePointsOverlay, _Component);

  function DraggablePointsOverlay(props) {
    _classCallCheck(this, DraggablePointsOverlay);

    var _this = _possibleConstructorReturn(this, (DraggablePointsOverlay.__proto__ || Object.getPrototypeOf(DraggablePointsOverlay)).call(this, props));

    _this.state = {
      draggedPointKey: null
    };
    return _this;
  }

  _createClass(DraggablePointsOverlay, [{
    key: '_onDragStart',
    value: function _onDragStart(point, event) {
      event.stopPropagation();
      _document2.default.addEventListener('mousemove', this._onDrag, false);
      _document2.default.addEventListener('mouseup', this._onDragEnd, false);
      this.setState({ draggedPointKey: this.props.keyAccessor(point) });
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(event) {
      event.stopPropagation();
      var pixel = mouse(this.refs.container, event);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      var lngLat = mercator.unproject(pixel);
      var key = this.state.draggedPointKey;
      this.props.onUpdatePoint({ key: key, location: lngLat });
    }
  }, {
    key: '_onDragEnd',
    value: function _onDragEnd(event) {
      event.stopPropagation();
      _document2.default.removeEventListener('mousemove', this._onDrag, false);
      _document2.default.removeEventListener('mouseup', this._onDragEnd, false);
      this.setState({ draggedPointKey: null });
    }
  }, {
    key: '_addPoint',
    value: function _addPoint(event) {
      event.stopPropagation();
      event.preventDefault();
      var pixel = mouse(this.refs.container, event);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      this.props.onAddPoint(mercator.unproject(pixel));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          points = _props.points,
          width = _props.width,
          height = _props.height,
          isDragging = _props.isDragging,
          style = _props.style;

      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      return _react2.default.createElement(
        'svg',
        {
          ref: 'container',
          width: width,
          height: height,
          style: _extends({
            pointerEvents: 'all',
            position: 'absolute',
            left: 0,
            top: 0,
            cursor: isDragging ? _config2.default.CURSOR.GRABBING : _config2.default.CURSOR.GRAB
          }, style),
          onContextMenu: this._addPoint },
        _react2.default.createElement(
          'g',
          { style: { cursor: 'pointer' } },
          points.map(function (point, index) {
            var pixel = mercator.project(_this2.props.lngLatAccessor(point));
            return _react2.default.createElement(
              'g',
              {
                key: index,
                style: { pointerEvents: 'all' },
                transform: (0, _svgTransform2.default)([{ translate: pixel }]),
                onMouseDown: _this2._onDragStart.bind(_this2, point) },
              _this2.props.renderPoint.call(_this2, point, pixel)
            );
          })
        )
      );
    }
  }]);

  return DraggablePointsOverlay;
}(_react.Component), _class2.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  latitude: _react.PropTypes.number.isRequired,
  longitude: _react.PropTypes.number.isRequired,
  zoom: _react.PropTypes.number.isRequired,
  points: _react.PropTypes.instanceOf(_immutable2.default.List).isRequired,
  isDragging: _react.PropTypes.bool.isRequired,
  keyAccessor: _react.PropTypes.func.isRequired,
  lngLatAccessor: _react.PropTypes.func.isRequired,
  onAddPoint: _react.PropTypes.func.isRequired,
  onUpdatePoint: _react.PropTypes.func.isRequired,
  renderPoint: _react.PropTypes.func.isRequired
}, _class2.defaultProps = {
  keyAccessor: function keyAccessor(point) {
    return point.get('id');
  },
  lngLatAccessor: function lngLatAccessor(point) {
    return point.get('location').toArray();
  },
  onAddPoint: noop,
  onUpdatePoint: noop,
  renderPoint: noop,
  isDragging: false
}, _temp), (_applyDecoratedDescriptor(_class.prototype, '_onDragStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDragStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onDragEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDragEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_addPoint', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_addPoint'), _class.prototype)), _class);
exports.default = DraggablePointsOverlay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9kcmFnZ2FibGUtcG9pbnRzLnJlYWN0LmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJtb3VzZSIsImNvbnRhaW5lciIsImV2ZW50IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwibGVmdCIsImNsaWVudExlZnQiLCJ5IiwiY2xpZW50WSIsInRvcCIsImNsaWVudFRvcCIsIkRyYWdnYWJsZVBvaW50c092ZXJsYXkiLCJwcm9wcyIsInN0YXRlIiwiZHJhZ2dlZFBvaW50S2V5IiwicG9pbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRHJhZyIsIl9vbkRyYWdFbmQiLCJzZXRTdGF0ZSIsImtleUFjY2Vzc29yIiwicGl4ZWwiLCJyZWZzIiwibWVyY2F0b3IiLCJsbmdMYXQiLCJ1bnByb2plY3QiLCJrZXkiLCJvblVwZGF0ZVBvaW50IiwibG9jYXRpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJvbkFkZFBvaW50IiwicG9pbnRzIiwid2lkdGgiLCJoZWlnaHQiLCJpc0RyYWdnaW5nIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwicG9zaXRpb24iLCJjdXJzb3IiLCJDVVJTT1IiLCJHUkFCQklORyIsIkdSQUIiLCJfYWRkUG9pbnQiLCJtYXAiLCJpbmRleCIsInByb2plY3QiLCJsbmdMYXRBY2Nlc3NvciIsInRyYW5zbGF0ZSIsIl9vbkRyYWdTdGFydCIsImJpbmQiLCJyZW5kZXJQb2ludCIsImNhbGwiLCJwcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ6b29tIiwiaW5zdGFuY2VPZiIsIkxpc3QiLCJib29sIiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsImdldCIsInRvQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzJDQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFNakJ2QixVQUFRLGlCQUFVMkIsVUFBVixDQUFxQixvQkFBVUMsSUFBL0IsRUFBcUNMLFVBTjVCO0FBT2pCcEIsY0FBWSxpQkFBVTBCLElBQVYsQ0FBZU4sVUFQVjtBQVFqQm5DLGVBQWEsaUJBQVUwQyxJQUFWLENBQWVQLFVBUlg7QUFTakJSLGtCQUFnQixpQkFBVWUsSUFBVixDQUFlUCxVQVRkO0FBVWpCeEIsY0FBWSxpQkFBVStCLElBQVYsQ0FBZVAsVUFWVjtBQVdqQjVCLGlCQUFlLGlCQUFVbUMsSUFBVixDQUFlUCxVQVhiO0FBWWpCSixlQUFhLGlCQUFVVyxJQUFWLENBQWVQO0FBWlgsQyxVQWVaUSxZLEdBQWU7QUFDcEIzQyxlQUFhO0FBQUEsV0FBU04sTUFBTWtELEdBQU4sQ0FBVSxJQUFWLENBQVQ7QUFBQSxHQURPO0FBRXBCakIsa0JBQWdCO0FBQUEsV0FBU2pDLE1BQU1rRCxHQUFOLENBQVUsVUFBVixFQUFzQkMsT0FBdEIsRUFBVDtBQUFBLEdBRkk7QUFHcEJsQyxjQUFZbkMsSUFIUTtBQUlwQitCLGlCQUFlL0IsSUFKSztBQUtwQnVELGVBQWF2RCxJQUxPO0FBTXBCdUMsY0FBWTtBQU5RLEM7a0JBakJIekIsc0IiLCJmaWxlIjoiZHJhZ2dhYmxlLXBvaW50cy5yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcblxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJ3N2Zy10cmFuc2Zvcm0nO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgVmlld3BvcnRNZXJjYXRvciBmcm9tICd2aWV3cG9ydC1tZXJjYXRvci1wcm9qZWN0JztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIG1vdXNlKGNvbnRhaW5lciwgZXZlbnQpIHtcbiAgY29uc3QgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQgLSBjb250YWluZXIuY2xpZW50TGVmdDtcbiAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCAtIGNvbnRhaW5lci5jbGllbnRUb3A7XG4gIHJldHVybiBbeCwgeV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZVBvaW50c092ZXJsYXkgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBsYXRpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxvbmdpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHpvb206IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBwb2ludHM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKEltbXV0YWJsZS5MaXN0KS5pc1JlcXVpcmVkLFxuICAgIGlzRHJhZ2dpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAga2V5QWNjZXNzb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbG5nTGF0QWNjZXNzb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25BZGRQb2ludDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblVwZGF0ZVBvaW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHJlbmRlclBvaW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBrZXlBY2Nlc3NvcjogcG9pbnQgPT4gcG9pbnQuZ2V0KCdpZCcpLFxuICAgIGxuZ0xhdEFjY2Vzc29yOiBwb2ludCA9PiBwb2ludC5nZXQoJ2xvY2F0aW9uJykudG9BcnJheSgpLFxuICAgIG9uQWRkUG9pbnQ6IG5vb3AsXG4gICAgb25VcGRhdGVQb2ludDogbm9vcCxcbiAgICByZW5kZXJQb2ludDogbm9vcCxcbiAgICBpc0RyYWdnaW5nOiBmYWxzZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnZ2VkUG9pbnRLZXk6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vbkRyYWdTdGFydChwb2ludCwgZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25EcmFnRW5kLCBmYWxzZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ2dlZFBvaW50S2V5OiB0aGlzLnByb3BzLmtleUFjY2Vzc29yKHBvaW50KX0pO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vbkRyYWcoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBwaXhlbCA9IG1vdXNlKHRoaXMucmVmcy5jb250YWluZXIsIGV2ZW50KTtcbiAgICBjb25zdCBtZXJjYXRvciA9IFZpZXdwb3J0TWVyY2F0b3IodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbG5nTGF0ID0gbWVyY2F0b3IudW5wcm9qZWN0KHBpeGVsKTtcbiAgICBjb25zdCBrZXkgPSB0aGlzLnN0YXRlLmRyYWdnZWRQb2ludEtleTtcbiAgICB0aGlzLnByb3BzLm9uVXBkYXRlUG9pbnQoe2tleSwgbG9jYXRpb246IGxuZ0xhdH0pO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vbkRyYWdFbmQoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25EcmFnRW5kLCBmYWxzZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ2dlZFBvaW50S2V5OiBudWxsfSk7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgX2FkZFBvaW50KGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwaXhlbCA9IG1vdXNlKHRoaXMucmVmcy5jb250YWluZXIsIGV2ZW50KTtcbiAgICBjb25zdCBtZXJjYXRvciA9IFZpZXdwb3J0TWVyY2F0b3IodGhpcy5wcm9wcyk7XG4gICAgdGhpcy5wcm9wcy5vbkFkZFBvaW50KG1lcmNhdG9yLnVucHJvamVjdChwaXhlbCkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtwb2ludHMsIHdpZHRoLCBoZWlnaHQsIGlzRHJhZ2dpbmcsIHN0eWxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWVyY2F0b3IgPSBWaWV3cG9ydE1lcmNhdG9yKHRoaXMucHJvcHMpO1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnXG4gICAgICAgIHJlZj1cImNvbnRhaW5lclwiXG4gICAgICAgIHdpZHRoPXsgd2lkdGggfVxuICAgICAgICBoZWlnaHQ9eyBoZWlnaHQgfVxuICAgICAgICBzdHlsZT17IHtcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnYWxsJyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBjdXJzb3I6IGlzRHJhZ2dpbmcgPyBjb25maWcuQ1VSU09SLkdSQUJCSU5HIDogY29uZmlnLkNVUlNPUi5HUkFCLFxuICAgICAgICAgIC4uLnN0eWxlXG4gICAgICAgIH0gfVxuICAgICAgICBvbkNvbnRleHRNZW51PXsgdGhpcy5fYWRkUG9pbnQgfT5cblxuICAgICAgICA8ZyBzdHlsZT17IHtjdXJzb3I6ICdwb2ludGVyJ30gfT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBwb2ludHMubWFwKChwb2ludCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcGl4ZWwgPSBtZXJjYXRvci5wcm9qZWN0KHRoaXMucHJvcHMubG5nTGF0QWNjZXNzb3IocG9pbnQpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgICAga2V5PXsgaW5kZXggfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7cG9pbnRlckV2ZW50czogJ2FsbCd9IH1cbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT17IHRyYW5zZm9ybShbe3RyYW5zbGF0ZTogcGl4ZWx9XSkgfVxuICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249eyB0aGlzLl9vbkRyYWdTdGFydC5iaW5kKHRoaXMsIHBvaW50KSB9PlxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbmRlclBvaW50LmNhbGwodGhpcywgcG9pbnQsIHBpeGVsKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG59XG4iXX0=