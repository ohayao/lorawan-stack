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
var Configuration = /*#__PURE__*/function () {
  function Configuration(service) {
    (0, _classCallCheck2["default"])(this, Configuration);
    this._api = service;
  }

  (0, _createClass2["default"])(Configuration, [{
    key: "listNsFrequencyPlans",
    value: function () {
      var _listNsFrequencyPlans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appId) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.ListFrequencyPlans({
                  component: 'ns'
                });

              case 2:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadListResponse('frequency_plans', result));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function listNsFrequencyPlans(_x) {
        return _listNsFrequencyPlans.apply(this, arguments);
      }

      return listNsFrequencyPlans;
    }()
  }, {
    key: "listGsFrequencyPlans",
    value: function () {
      var _listGsFrequencyPlans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._api.ListFrequencyPlans({
                  component: 'gs'
                });

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadListResponse('frequency_plans', result));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function listGsFrequencyPlans(_x2) {
        return _listGsFrequencyPlans.apply(this, arguments);
      }

      return listGsFrequencyPlans;
    }()
  }]);
  return Configuration;
}();

var _default = Configuration;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2NvbmZpZ3VyYXRpb24uanMiXSwibmFtZXMiOlsiQ29uZmlndXJhdGlvbiIsInNlcnZpY2UiLCJfYXBpIiwiYXBwSWQiLCJMaXN0RnJlcXVlbmN5UGxhbnMiLCJjb21wb25lbnQiLCJyZXN1bHQiLCJNYXJzaGFsZXIiLCJwYXlsb2FkTGlzdFJlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOztBQWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBSU1BLGE7QUFDSix5QkFBWUMsT0FBWixFQUFxQjtBQUFBO0FBQ25CLFNBQUtDLElBQUwsR0FBWUQsT0FBWjtBQUNEOzs7OztnSEFFRCxpQkFBMkJFLEtBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtELElBQUwsQ0FBVUUsa0JBQVYsQ0FBNkI7QUFBRUMsa0JBQUFBLFNBQVMsRUFBRTtBQUFiLGlCQUE3QixDQUR2Qjs7QUFBQTtBQUNRQyxnQkFBQUEsTUFEUjtBQUFBLGlEQUdTQyxzQkFBVUMsbUJBQVYsQ0FBOEIsaUJBQTlCLEVBQWlERixNQUFqRCxDQUhUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7O2dIQU1BLGtCQUEyQkgsS0FBM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDdUIsS0FBS0QsSUFBTCxDQUFVRSxrQkFBVixDQUE2QjtBQUFFQyxrQkFBQUEsU0FBUyxFQUFFO0FBQWIsaUJBQTdCLENBRHZCOztBQUFBO0FBQ1FDLGdCQUFBQSxNQURSO0FBQUEsa0RBR1NDLHNCQUFVQyxtQkFBVixDQUE4QixpQkFBOUIsRUFBaURGLE1BQWpELENBSFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBT2FOLGEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vdXRpbC9tYXJzaGFsZXInXG5cbmNsYXNzIENvbmZpZ3VyYXRpb24ge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlKSB7XG4gICAgdGhpcy5fYXBpID0gc2VydmljZVxuICB9XG5cbiAgYXN5bmMgbGlzdE5zRnJlcXVlbmN5UGxhbnMoYXBwSWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuTGlzdEZyZXF1ZW5jeVBsYW5zKHsgY29tcG9uZW50OiAnbnMnIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRMaXN0UmVzcG9uc2UoJ2ZyZXF1ZW5jeV9wbGFucycsIHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGxpc3RHc0ZyZXF1ZW5jeVBsYW5zKGFwcElkKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkxpc3RGcmVxdWVuY3lQbGFucyh7IGNvbXBvbmVudDogJ2dzJyB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkTGlzdFJlc3BvbnNlKCdmcmVxdWVuY3lfcGxhbnMnLCByZXN1bHQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdGlvblxuIl19