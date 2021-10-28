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
var Auth = /*#__PURE__*/function () {
  function Auth(service) {
    (0, _classCallCheck2["default"])(this, Auth);
    this._api = service;
  }

  (0, _createClass2["default"])(Auth, [{
    key: "getAuthInfo",
    value: function () {
      var _getAuthInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.AuthInfo();

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

      function getAuthInfo() {
        return _getAuthInfo.apply(this, arguments);
      }

      return getAuthInfo;
    }()
  }]);
  return Auth;
}();

var _default = Auth;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2F1dGguanMiXSwibmFtZXMiOlsiQXV0aCIsInNlcnZpY2UiLCJfYXBpIiwiQXV0aEluZm8iLCJyZXN1bHQiLCJNYXJzaGFsZXIiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7O0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFJTUEsSTtBQUNKLGdCQUFZQyxPQUFaLEVBQXFCO0FBQUE7QUFDbkIsU0FBS0MsSUFBTCxHQUFZRCxPQUFaO0FBQ0Q7Ozs7O3VHQUVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixFQUR2Qjs7QUFBQTtBQUNRQyxnQkFBQUEsTUFEUjtBQUFBLGlEQUdTQyxzQkFBVUMscUJBQVYsQ0FBZ0NGLE1BQWhDLENBSFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBT2FKLEkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vdXRpbC9tYXJzaGFsZXInXG5cbmNsYXNzIEF1dGgge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlKSB7XG4gICAgdGhpcy5fYXBpID0gc2VydmljZVxuICB9XG5cbiAgYXN5bmMgZ2V0QXV0aEluZm8oKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkF1dGhJbmZvKClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRoXG4iXX0=