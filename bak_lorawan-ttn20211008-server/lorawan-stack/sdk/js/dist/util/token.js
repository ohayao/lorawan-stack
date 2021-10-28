"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
var Token = /*#__PURE__*/function () {
  function Token(token) {
    (0, _classCallCheck2["default"])(this, Token);

    /**
     * Make sure it is possible to instantiate an instance
     * of the class only once.
     */
    if (!!Token.instance) {
      return Token.instance;
    }

    if (this.token) {
      return Token.instance;
    }

    Token.instance = this;
    this.token = token;
    return this;
  }

  (0, _createClass2["default"])(Token, [{
    key: "get",
    value: function get() {
      return this.token;
    }
  }]);
  return Token;
}();

var _default = Token;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3Rva2VuLmpzIl0sIm5hbWVzIjpbIlRva2VuIiwidG9rZW4iLCJpbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBRU1BLEs7QUFDSixpQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQjtBQUNKO0FBQ0E7QUFDQTtBQUNJLFFBQUksQ0FBQyxDQUFDRCxLQUFLLENBQUNFLFFBQVosRUFBc0I7QUFDcEIsYUFBT0YsS0FBSyxDQUFDRSxRQUFiO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLRCxLQUFULEVBQWdCO0FBQ2QsYUFBT0QsS0FBSyxDQUFDRSxRQUFiO0FBQ0Q7O0FBRURGLElBQUFBLEtBQUssQ0FBQ0UsUUFBTixHQUFpQixJQUFqQjtBQUNBLFNBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUVBLFdBQU8sSUFBUDtBQUNEOzs7O1dBRUQsZUFBTTtBQUNKLGFBQU8sS0FBS0EsS0FBWjtBQUNEOzs7OztlQUdZRCxLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5jbGFzcyBUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKHRva2VuKSB7XG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIGl0IGlzIHBvc3NpYmxlIHRvIGluc3RhbnRpYXRlIGFuIGluc3RhbmNlXG4gICAgICogb2YgdGhlIGNsYXNzIG9ubHkgb25jZS5cbiAgICAgKi9cbiAgICBpZiAoISFUb2tlbi5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIFRva2VuLmluc3RhbmNlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudG9rZW4pIHtcbiAgICAgIHJldHVybiBUb2tlbi5pbnN0YW5jZVxuICAgIH1cblxuICAgIFRva2VuLmluc3RhbmNlID0gdGhpc1xuICAgIHRoaXMudG9rZW4gPSB0b2tlblxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRva2VuXG4iXX0=