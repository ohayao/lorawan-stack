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
var Js = /*#__PURE__*/function () {
  function Js(service) {
    (0, _classCallCheck2["default"])(this, Js);
    this._api = service;
  }

  (0, _createClass2["default"])(Js, [{
    key: "listJoinEUIPrefixes",
    value: function () {
      var _listJoinEUIPrefixes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.GetJoinEUIPrefixes();

              case 2:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadListResponse('prefixes', result));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function listJoinEUIPrefixes() {
        return _listJoinEUIPrefixes.apply(this, arguments);
      }

      return listJoinEUIPrefixes;
    }()
  }]);
  return Js;
}();

var _default = Js;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2pvaW4tc2VydmVyLmpzIl0sIm5hbWVzIjpbIkpzIiwic2VydmljZSIsIl9hcGkiLCJHZXRKb2luRVVJUHJlZml4ZXMiLCJyZXN1bHQiLCJNYXJzaGFsZXIiLCJwYXlsb2FkTGlzdFJlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOztBQWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBSU1BLEU7QUFDSixjQUFZQyxPQUFaLEVBQXFCO0FBQUE7QUFDbkIsU0FBS0MsSUFBTCxHQUFZRCxPQUFaO0FBQ0Q7Ozs7OytHQUVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtDLElBQUwsQ0FBVUMsa0JBQVYsRUFEdkI7O0FBQUE7QUFDUUMsZ0JBQUFBLE1BRFI7QUFBQSxpREFHU0Msc0JBQVVDLG1CQUFWLENBQThCLFVBQTlCLEVBQTBDRixNQUExQyxDQUhUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQU9hSixFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBKcyB7XG4gIGNvbnN0cnVjdG9yKHNlcnZpY2UpIHtcbiAgICB0aGlzLl9hcGkgPSBzZXJ2aWNlXG4gIH1cblxuICBhc3luYyBsaXN0Sm9pbkVVSVByZWZpeGVzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXRKb2luRVVJUHJlZml4ZXMoKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkTGlzdFJlc3BvbnNlKCdwcmVmaXhlcycsIHJlc3VsdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBKc1xuIl19