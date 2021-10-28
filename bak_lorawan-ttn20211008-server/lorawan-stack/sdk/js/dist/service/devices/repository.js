"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _marshaler = _interopRequireDefault(require("../../util/marshaler"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DeviceRepository = /*#__PURE__*/function () {
  function DeviceRepository(registry) {
    (0, _classCallCheck2["default"])(this, DeviceRepository);
    this._api = registry;
  } // Brands retrieval.


  (0, _createClass2["default"])(DeviceRepository, [{
    key: "listBrands",
    value: function () {
      var _listBrands = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appId) {
        var params,
            selector,
            result,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                selector = _args.length > 2 && _args[2] !== undefined ? _args[2] : [];
                _context.next = 4;
                return this._api.ListBrands({
                  routeParams: {
                    'application_ids.application_id': appId
                  }
                }, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 4:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadListResponse('brands', result));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function listBrands(_x) {
        return _listBrands.apply(this, arguments);
      }

      return listBrands;
    }()
  }, {
    key: "getBrand",
    value: function () {
      var _getBrand = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, brandId) {
        var selector,
            result,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                selector = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : [];
                _context2.next = 3;
                return this._api.GetBrand({
                  routeParams: {
                    'application_ids.application_id': appId,
                    brand_id: brandId
                  }
                }, _objectSpread({}, _marshaler["default"].selectorToFieldMask(selector)));

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBrand(_x2, _x3) {
        return _getBrand.apply(this, arguments);
      }

      return getBrand;
    }() // Models retrieval.

  }, {
    key: "listModels",
    value: function () {
      var _listModels = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appId, brandId) {
        var params,
            selector,
            result,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                selector = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : [];
                _context3.next = 4;
                return this._api.ListModels({
                  routeParams: {
                    'application_ids.application_id': appId,
                    brand_id: brandId
                  }
                }, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 4:
                result = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].payloadListResponse('models', result));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function listModels(_x4, _x5) {
        return _listModels.apply(this, arguments);
      }

      return listModels;
    }()
  }, {
    key: "getModel",
    value: function () {
      var _getModel = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(appId, brandId, modelId) {
        var selector,
            result,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                selector = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : [];
                _context4.next = 3;
                return this._api.GetModel({
                  routeParams: {
                    'application_ids.application_id': appId,
                    brand_id: brandId,
                    model_id: modelId
                  }
                }, _objectSpread({}, _marshaler["default"].selectorToFieldMask(selector)));

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getModel(_x6, _x7, _x8) {
        return _getModel.apply(this, arguments);
      }

      return getModel;
    }() // Templates retrieval.

  }, {
    key: "getTemplate",
    value: function () {
      var _getTemplate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(appId, version) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._api.GetTemplate({
                  routeParams: {
                    'application_ids.application_id': appId,
                    'version_ids.brand_id': version.brand_id,
                    'version_ids.model_id': version.model_id,
                    'version_ids.firmware_version': version.firmware_version,
                    'version_ids.band_id': version.band_id
                  }
                });

              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getTemplate(_x9, _x10) {
        return _getTemplate.apply(this, arguments);
      }

      return getTemplate;
    }() // Formatters retrieval.

  }, {
    key: "getUplinkDecoder",
    value: function () {
      var _getUplinkDecoder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(appId, version) {
        var result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._api.GetUplinkDecoder({
                  routeParams: {
                    'application_ids.application_id': appId,
                    'version_ids.brand_id': version.brand_id,
                    'version_ids.model_id': version.model_id,
                    'version_ids.firmware_version': version.firmware_version,
                    'version_ids.band_id': version.band_id
                  }
                });

              case 2:
                result = _context6.sent;
                return _context6.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getUplinkDecoder(_x11, _x12) {
        return _getUplinkDecoder.apply(this, arguments);
      }

      return getUplinkDecoder;
    }()
  }, {
    key: "getDownlinkDecoder",
    value: function () {
      var _getDownlinkDecoder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(appId, version) {
        var result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._api.GetDownlinkDecoder({
                  routeParams: {
                    'application_ids.application_id': appId,
                    'version_ids.brand_id': version.brand_id,
                    'version_ids.model_id': version.model_id,
                    'version_ids.firmware_version': version.firmware_version,
                    'version_ids.band_id': version.band_id
                  }
                });

              case 2:
                result = _context7.sent;
                return _context7.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getDownlinkDecoder(_x13, _x14) {
        return _getDownlinkDecoder.apply(this, arguments);
      }

      return getDownlinkDecoder;
    }()
  }, {
    key: "getDownlinkEncoder",
    value: function () {
      var _getDownlinkEncoder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(appId, version) {
        var result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._api.GetDownlinkEncoder({
                  routeParams: {
                    'application_ids.application_id': appId,
                    'version_ids.brand_id': version.brand_id,
                    'version_ids.model_id': version.model_id,
                    'version_ids.firmware_version': version.firmware_version,
                    'version_ids.band_id': version.band_id
                  }
                });

              case 2:
                result = _context8.sent;
                return _context8.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getDownlinkEncoder(_x15, _x16) {
        return _getDownlinkEncoder.apply(this, arguments);
      }

      return getDownlinkEncoder;
    }()
  }]);
  return DeviceRepository;
}();

var _default = DeviceRepository;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2RldmljZXMvcmVwb3NpdG9yeS5qcyJdLCJuYW1lcyI6WyJEZXZpY2VSZXBvc2l0b3J5IiwicmVnaXN0cnkiLCJfYXBpIiwiYXBwSWQiLCJwYXJhbXMiLCJzZWxlY3RvciIsIkxpc3RCcmFuZHMiLCJyb3V0ZVBhcmFtcyIsIk1hcnNoYWxlciIsInNlbGVjdG9yVG9GaWVsZE1hc2siLCJyZXN1bHQiLCJwYXlsb2FkTGlzdFJlc3BvbnNlIiwiYnJhbmRJZCIsIkdldEJyYW5kIiwiYnJhbmRfaWQiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJMaXN0TW9kZWxzIiwibW9kZWxJZCIsIkdldE1vZGVsIiwibW9kZWxfaWQiLCJ2ZXJzaW9uIiwiR2V0VGVtcGxhdGUiLCJmaXJtd2FyZV92ZXJzaW9uIiwiYmFuZF9pZCIsIkdldFVwbGlua0RlY29kZXIiLCJHZXREb3dubGlua0RlY29kZXIiLCJHZXREb3dubGlua0VuY29kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7O0lBRU1BLGdCO0FBQ0osNEJBQVlDLFFBQVosRUFBc0I7QUFBQTtBQUNwQixTQUFLQyxJQUFMLEdBQVlELFFBQVo7QUFDRCxHLENBRUQ7Ozs7OztzR0FFQSxpQkFBaUJFLEtBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QkMsZ0JBQUFBLE1BQXhCLDJEQUFpQyxFQUFqQztBQUFxQ0MsZ0JBQUFBLFFBQXJDLDJEQUFnRCxFQUFoRDtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtILElBQUwsQ0FBVUksVUFBVixDQUNuQjtBQUNFQyxrQkFBQUEsV0FBVyxFQUFFO0FBQ1gsc0RBQWtDSjtBQUR2QjtBQURmLGlCQURtQixrQ0FNZEMsTUFOYyxHQU1ISSxzQkFBVUMsbUJBQVYsQ0FBOEJKLFFBQTlCLENBTkcsRUFEdkI7O0FBQUE7QUFDUUssZ0JBQUFBLE1BRFI7QUFBQSxpREFVU0Ysc0JBQVVHLG1C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QUEsV0FBVyxFQUFFO0FBQ1gsc0RBQWtDSixLQUR2QjtBQUVYLDRDQUF3QmlCLE9BQU8sQ0FBQ04sUUFGckI7QUFHWCw0Q0FBd0JNLE9BQU8sQ0FBQ0QsUUFIckI7QUFJWCxvREFBZ0NDLE9BQU8sQ0FBQ0UsZ0JBSjdCO0FBS1gsMkNBQXVCRixPQUFPLENBQUNHO0FBTHBCO0FBRG1DLGlCQUE3QixDQUR2Qjs7QUFBQTtBQUNRYixnQkFBQUEsTUFEUjtBQUFBLGtEQVdTRixzQkFBVU8scUJBQVYsQ0FBZ0NMLE1BQWhDLENBWFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBZWFWLGdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMjEgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uLy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBEZXZpY2VSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IocmVnaXN0cnkpIHtcbiAgICB0aGlzLl9hcGkgPSByZWdpc3RyeVxuICB9XG5cbiAgLy8gQnJhbmRzIHJldHJpZXZhbC5cblxuICBhc3luYyBsaXN0QnJhbmRzKGFwcElkLCBwYXJhbXMgPSB7fSwgc2VsZWN0b3IgPSBbXSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5MaXN0QnJhbmRzKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7IC4uLnBhcmFtcywgLi4uTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkTGlzdFJlc3BvbnNlKCdicmFuZHMnLCByZXN1bHQpXG4gIH1cblxuICBhc3luYyBnZXRCcmFuZChhcHBJZCwgYnJhbmRJZCwgc2VsZWN0b3IgPSBbXSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXRCcmFuZChcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwSWQsXG4gICAgICAgICAgYnJhbmRfaWQ6IGJyYW5kSWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgeyAuLi5NYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvcikgfSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICAvLyBNb2RlbHMgcmV0cmlldmFsLlxuXG4gIGFzeW5jIGxpc3RNb2RlbHMoYXBwSWQsIGJyYW5kSWQsIHBhcmFtcyA9IHt9LCBzZWxlY3RvciA9IFtdKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkxpc3RNb2RlbHMoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICAgJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcElkLFxuICAgICAgICAgIGJyYW5kX2lkOiBicmFuZElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHsgLi4ucGFyYW1zLCAuLi5NYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvcikgfSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRMaXN0UmVzcG9uc2UoJ21vZGVscycsIHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGdldE1vZGVsKGFwcElkLCBicmFuZElkLCBtb2RlbElkLCBzZWxlY3RvciA9IFtdKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkdldE1vZGVsKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgICBicmFuZF9pZDogYnJhbmRJZCxcbiAgICAgICAgICBtb2RlbF9pZDogbW9kZWxJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC4uLk1hcnNoYWxlci5zZWxlY3RvclRvRmllbGRNYXNrKHNlbGVjdG9yKSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgLy8gVGVtcGxhdGVzIHJldHJpZXZhbC5cblxuICBhc3luYyBnZXRUZW1wbGF0ZShhcHBJZCwgdmVyc2lvbikge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXRUZW1wbGF0ZSh7XG4gICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwSWQsXG4gICAgICAgICd2ZXJzaW9uX2lkcy5icmFuZF9pZCc6IHZlcnNpb24uYnJhbmRfaWQsXG4gICAgICAgICd2ZXJzaW9uX2lkcy5tb2RlbF9pZCc6IHZlcnNpb24ubW9kZWxfaWQsXG4gICAgICAgICd2ZXJzaW9uX2lkcy5maXJtd2FyZV92ZXJzaW9uJzogdmVyc2lvbi5maXJtd2FyZV92ZXJzaW9uLFxuICAgICAgICAndmVyc2lvbl9pZHMuYmFuZF9pZCc6IHZlcnNpb24uYmFuZF9pZCxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIC8vIEZvcm1hdHRlcnMgcmV0cmlldmFsLlxuXG4gIGFzeW5jIGdldFVwbGlua0RlY29kZXIoYXBwSWQsIHZlcnNpb24pIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuR2V0VXBsaW5rRGVjb2Rlcih7XG4gICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwSWQsXG4gICAgICAgICd2ZXJzaW9uX2lkcy5icmFuZF9pZCc6IHZlcnNpb24uYnJhbmRfaWQsXG4gICAgICAgICd2ZXJzaW9uX2lkcy5tb2RlbF9pZCc6IHZlcnNpb24ubW9kZWxfaWQsXG4gICAgICAgICd2ZXJzaW9uX2lkcy5maXJtd2FyZV92ZXJzaW9uJzogdmVyc2lvbi5maXJtd2FyZV92ZXJzaW9uLFxuICAgICAgICAndmVyc2lvbl9pZHMuYmFuZF9pZCc6IHZlcnNpb24uYmFuZF9pZCxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGdldERvd25saW5rRGVjb2RlcihhcHBJZCwgdmVyc2lvbikge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXREb3dubGlua0RlY29kZXIoe1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcElkLFxuICAgICAgICAndmVyc2lvbl9pZHMuYnJhbmRfaWQnOiB2ZXJzaW9uLmJyYW5kX2lkLFxuICAgICAgICAndmVyc2lvbl9pZHMubW9kZWxfaWQnOiB2ZXJzaW9uLm1vZGVsX2lkLFxuICAgICAgICAndmVyc2lvbl9pZHMuZmlybXdhcmVfdmVyc2lvbic6IHZlcnNpb24uZmlybXdhcmVfdmVyc2lvbixcbiAgICAgICAgJ3ZlcnNpb25faWRzLmJhbmRfaWQnOiB2ZXJzaW9uLmJhbmRfaWQsXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBnZXREb3dubGlua0VuY29kZXIoYXBwSWQsIHZlcnNpb24pIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuR2V0RG93bmxpbmtFbmNvZGVyKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgJ3ZlcnNpb25faWRzLmJyYW5kX2lkJzogdmVyc2lvbi5icmFuZF9pZCxcbiAgICAgICAgJ3ZlcnNpb25faWRzLm1vZGVsX2lkJzogdmVyc2lvbi5tb2RlbF9pZCxcbiAgICAgICAgJ3ZlcnNpb25faWRzLmZpcm13YXJlX3ZlcnNpb24nOiB2ZXJzaW9uLmZpcm13YXJlX3ZlcnNpb24sXG4gICAgICAgICd2ZXJzaW9uX2lkcy5iYW5kX2lkJzogdmVyc2lvbi5iYW5kX2lkLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERldmljZVJlcG9zaXRvcnlcbiJdfQ==