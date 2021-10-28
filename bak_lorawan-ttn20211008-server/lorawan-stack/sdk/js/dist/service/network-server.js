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

// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
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
var Ns = /*#__PURE__*/function () {
  function Ns(service) {
    (0, _classCallCheck2["default"])(this, Ns);
    this._api = service;
  }

  (0, _createClass2["default"])(Ns, [{
    key: "generateDevAddress",
    value: function () {
      var _generateDevAddress = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.GenerateDevAddr();

              case 2:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generateDevAddress() {
        return _generateDevAddress.apply(this, arguments);
      }

      return generateDevAddress;
    }()
  }, {
    key: "getDefaultMacSettings",
    value: function () {
      var _getDefaultMacSettings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(freqPlan, phyVersion) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._api.GetDefaultMACSettings({
                  routeParams: {
                    frequency_plan_id: freqPlan,
                    lorawan_phy_version: phyVersion
                  }
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

      function getDefaultMacSettings(_x, _x2) {
        return _getDefaultMacSettings.apply(this, arguments);
      }

      return getDefaultMacSettings;
    }()
  }]);
  return Ns;
}();

var _default = Ns;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL25ldHdvcmstc2VydmVyLmpzIl0sIm5hbWVzIjpbIk5zIiwic2VydmljZSIsIl9hcGkiLCJHZW5lcmF0ZURldkFkZHIiLCJyZXN1bHQiLCJNYXJzaGFsZXIiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJmcmVxUGxhbiIsInBoeVZlcnNpb24iLCJHZXREZWZhdWx0TUFDU2V0dGluZ3MiLCJyb3V0ZVBhcmFtcyIsImZyZXF1ZW5jeV9wbGFuX2lkIiwibG9yYXdhbl9waHlfdmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7QUFkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUlNQSxFO0FBQ0osY0FBWUMsT0FBWixFQUFxQjtBQUFBO0FBQ25CLFNBQUtDLElBQUwsR0FBWUQsT0FBWjtBQUNEOzs7Ozs4R0FFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN1QixLQUFLQyxJQUFMLENBQVVDLGVBQVYsRUFEdkI7O0FBQUE7QUFDUUMsZ0JBQUFBLE1BRFI7QUFBQSxpREFHU0Msc0JBQVVDLHFCQUFWLENBQWdDRixNQUFoQyxDQUhUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7O2lIQU1BLGtCQUE0QkcsUUFBNUIsRUFBc0NDLFVBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtOLElBQUwsQ0FBVU8scUJBQVYsQ0FBZ0M7QUFDbkRDLGtCQUFBQSxXQUFXLEVBQUU7QUFDWEMsb0JBQUFBLGlCQUFpQixFQUFFSixRQURSO0FBRVhLLG9CQUFBQSxtQkFBbUIsRUFBRUo7QUFGVjtBQURzQyxpQkFBaEMsQ0FEdkI7O0FBQUE7QUFDUUosZ0JBQUFBLE1BRFI7QUFBQSxrREFRU0Msc0JBQVVDLHFCQUFWLENBQWdDRixNQUFoQyxDQVJUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQVlhSixFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBOcyB7XG4gIGNvbnN0cnVjdG9yKHNlcnZpY2UpIHtcbiAgICB0aGlzLl9hcGkgPSBzZXJ2aWNlXG4gIH1cblxuICBhc3luYyBnZW5lcmF0ZURldkFkZHJlc3MoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkdlbmVyYXRlRGV2QWRkcigpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBnZXREZWZhdWx0TWFjU2V0dGluZ3MoZnJlcVBsYW4sIHBoeVZlcnNpb24pIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuR2V0RGVmYXVsdE1BQ1NldHRpbmdzKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgIGZyZXF1ZW5jeV9wbGFuX2lkOiBmcmVxUGxhbixcbiAgICAgICAgbG9yYXdhbl9waHlfdmVyc2lvbjogcGh5VmVyc2lvbixcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOc1xuIl19