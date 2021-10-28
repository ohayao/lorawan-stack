"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _marshaler = _interopRequireDefault(require("../util/marshaler"));

// Copyright © 2020 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var DownlinkQueue = /*#__PURE__*/function () {
  function DownlinkQueue(api, _ref) {
    var stackConfig = _ref.stackConfig;
    (0, _classCallCheck2["default"])(this, DownlinkQueue);
    this._api = api;
    this._stackConfig = stackConfig;
  }

  (0, _createClass2["default"])(DownlinkQueue, [{
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(applicationId, deviceId) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.DownlinkQueueList({
                  routeParams: {
                    'application_ids.application_id': applicationId,
                    device_id: deviceId
                  }
                });

              case 2:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadListResponse('downlinks', result));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function list(_x, _x2) {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "push",
    value: function () {
      var _push = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(applicationId, deviceId, downlinks) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._api.DownlinkQueuePush({
                  routeParams: {
                    'end_device_ids.application_ids.application_id': applicationId,
                    'end_device_ids.device_id': deviceId
                  }
                }, {
                  downlinks: downlinks
                });

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function push(_x3, _x4, _x5) {
        return _push.apply(this, arguments);
      }

      return push;
    }()
  }, {
    key: "replace",
    value: function () {
      var _replace = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(applicationId, deviceId, downlinks) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._api.DownlinkQueueReplace({
                  routeParams: {
                    'end_device_ids.application_ids.application_id': applicationId,
                    'end_device_ids.device_id': deviceId
                  }
                }, {
                  downlinks: downlinks
                });

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function replace(_x6, _x7, _x8) {
        return _replace.apply(this, arguments);
      }

      return replace;
    }()
  }]);
  return DownlinkQueue;
}();

var _default = DownlinkQueue;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2Rvd25saW5rLXF1ZXVlLmpzIl0sIm5hbWVzIjpbIkRvd25saW5rUXVldWUiLCJhcGkiLCJzdGFja0NvbmZpZyIsIl9hcGkiLCJfc3RhY2tDb25maWciLCJhcHBsaWNhdGlvbklkIiwiZGV2aWNlSWQiLCJEb3dubGlua1F1ZXVlTGlzdCIsInJvdXRlUGFyYW1zIiwiZGV2aWNlX2lkIiwicmVzdWx0IiwiTWFyc2hhbGVyIiwicGF5bG9hZExpc3RSZXNwb25zZSIsImRvd25saW5rcyIsIkRvd25saW5rUXVldWVQdXNoIiwicGF5bG9hZFNpbmdsZVJlc3BvbnNlIiwiRG93bmxpbmtRdWV1ZVJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7O0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFJTUEsYTtBQUNKLHlCQUFZQyxHQUFaLFFBQWtDO0FBQUEsUUFBZkMsV0FBZSxRQUFmQSxXQUFlO0FBQUE7QUFDaEMsU0FBS0MsSUFBTCxHQUFZRixHQUFaO0FBQ0EsU0FBS0csWUFBTCxHQUFvQkYsV0FBcEI7QUFDRDs7Ozs7Z0dBRUQsaUJBQVdHLGFBQVgsRUFBMEJDLFFBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtILElBQUwsQ0FBVUksaUJBQVYsQ0FBNEI7QUFDL0NDLGtCQUFBQSxXQUFXLEVBQUU7QUFDWCxzREFBa0NILGFBRHZCO0FBRVhJLG9CQUFBQSxTQUFTLEVBQUVIO0FBRkE7QUFEa0MsaUJBQTVCLENBRHZCOztBQUFBO0FBQ1FJLGdCQUFBQSxNQURSO0FBQUEsaURBUVNDLHNCQUFVQyxtQkFBVixDQUE4QixXQUE5QixFQUEyQ0YsTUFBM0MsQ0FSVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OztnR0FXQSxrQkFBV0wsYUFBWCxFQUEwQkMsUUFBMUIsRUFBb0NPLFNBQXBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtWLElBQUwsQ0FBVVcsaUJBQVYsQ0FDbkI7QUFDRU4sa0JBQUFBLFdBQVcsRUFBRTtBQUNYLHFFQUFpREgsYUFEdEM7QUFFWCxnREFBNEJDO0FBRmpCO0FBRGYsaUJBRG1CLEVBT25CO0FBQ0VPLGtCQUFBQSxTQUFTLEVBQVRBO0FBREYsaUJBUG1CLENBRHZCOztBQUFBO0FBQ1FILGdCQUFBQSxNQURSO0FBQUEsa0RBYVNDLHNCQUFVSSxxQkFBVixDQUFnQ0wsTUFBaEMsQ0FiVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OzttR0FnQkEsa0JBQWNMLGFBQWQsRUFBNkJDLFFBQTdCLEVBQXVDTyxTQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN1QixLQUFLVixJQUFMLENBQVVhLG9CQUFWLENBQ25CO0FBQ0VSLGtCQUFBQSxXQUFXLEVBQUU7QUFDWCxxRUFBaURILGFBRHRDO0FBRVgsZ0RBQTRCQztBQUZqQjtBQURmLGlCQURtQixFQU9uQjtBQUNFTyxrQkFBQUEsU0FBUyxFQUFUQTtBQURGLGlCQVBtQixDQUR2Qjs7QUFBQTtBQUNRSCxnQkFBQUEsTUFEUjtBQUFBLGtEQWFTQyxzQkFBVUkscUJBQVYsQ0FBZ0NMLE1BQWhDLENBYlQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBaUJhVixhIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMjAgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBEb3dubGlua1F1ZXVlIHtcbiAgY29uc3RydWN0b3IoYXBpLCB7IHN0YWNrQ29uZmlnIH0pIHtcbiAgICB0aGlzLl9hcGkgPSBhcGlcbiAgICB0aGlzLl9zdGFja0NvbmZpZyA9IHN0YWNrQ29uZmlnXG4gIH1cblxuICBhc3luYyBsaXN0KGFwcGxpY2F0aW9uSWQsIGRldmljZUlkKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkRvd25saW5rUXVldWVMaXN0KHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBsaWNhdGlvbklkLFxuICAgICAgICBkZXZpY2VfaWQ6IGRldmljZUlkLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkTGlzdFJlc3BvbnNlKCdkb3dubGlua3MnLCByZXN1bHQpXG4gIH1cblxuICBhc3luYyBwdXNoKGFwcGxpY2F0aW9uSWQsIGRldmljZUlkLCBkb3dubGlua3MpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuRG93bmxpbmtRdWV1ZVB1c2goXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICAgJ2VuZF9kZXZpY2VfaWRzLmFwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgJ2VuZF9kZXZpY2VfaWRzLmRldmljZV9pZCc6IGRldmljZUlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZG93bmxpbmtzLFxuICAgICAgfSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyByZXBsYWNlKGFwcGxpY2F0aW9uSWQsIGRldmljZUlkLCBkb3dubGlua3MpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuRG93bmxpbmtRdWV1ZVJlcGxhY2UoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICAgJ2VuZF9kZXZpY2VfaWRzLmFwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgJ2VuZF9kZXZpY2VfaWRzLmRldmljZV9pZCc6IGRldmljZUlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZG93bmxpbmtzLFxuICAgICAgfSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG93bmxpbmtRdWV1ZVxuIl19