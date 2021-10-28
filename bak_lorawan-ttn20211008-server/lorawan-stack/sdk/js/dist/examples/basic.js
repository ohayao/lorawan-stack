"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ = _interopRequireDefault(require(".."));

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

/* eslint-disable no-console */
var token = 'access-token-or-api-key';
var tts = new _["default"]({
  authorization: {
    mode: 'key',
    key: token
  },
  connectionType: 'http',
  baseURL: 'http://localhost:1885/api/v3',
  defaultUserId: 'testuser'
});
var hash = new Date().valueOf();
var appName = "first-app-".concat(hash);
var appData = {
  ids: {
    application_id: appName
  },
  name: 'Test App',
  description: "Some description ".concat(hash)
};

var createApplication = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var firstApp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return tts.Applications.create('testuser', appData);

          case 2:
            firstApp = _context.sent;
            console.log(firstApp);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createApplication() {
    return _ref.apply(this, arguments);
  };
}();

var getApplication = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var firstApp;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tts.Applications.getById(appName);

          case 2:
            firstApp = _context2.sent;
            console.log(firstApp);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getApplication() {
    return _ref2.apply(this, arguments);
  };
}();

var listApplications = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var apps;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return tts.Applications.getAll();

          case 2:
            apps = _context3.sent;
            console.log(apps);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function listApplications() {
    return _ref3.apply(this, arguments);
  };
}();

var updateApplication = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var patch, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            patch = {
              description: 'New description'
            };
            _context4.next = 3;
            return tts.Applications.updateById(appName, patch);

          case 3:
            res = _context4.sent;
            console.log(res);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateApplication() {
    return _ref4.apply(this, arguments);
  };
}();

var deleteApplication = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return tts.Applications.deleteById(appName);

          case 2:
            _context5.next = 4;
            return tts.Applications.deleteById("second-app-".concat(hash));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteApplication() {
    return _ref5.apply(this, arguments);
  };
}();

var main = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return createApplication();

          case 3:
            _context6.next = 5;
            return getApplication();

          case 5:
            _context6.next = 7;
            return listApplications();

          case 7:
            _context6.next = 9;
            return updateApplication();

          case 9:
            _context6.next = 11;
            return deleteApplication();

          case 11:
            _context6.next = 16;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 13]]);
  }));

  return function main() {
    return _ref6.apply(this, arguments);
  };
}();

main();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlcy9iYXNpYy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsInR0cyIsIlRUUyIsImF1dGhvcml6YXRpb24iLCJtb2RlIiwia2V5IiwiY29ubmVjdGlvblR5cGUiLCJiYXNlVVJMIiwiZGVmYXVsdFVzZXJJZCIsImhhc2giLCJEYXRlIiwidmFsdWVPZiIsImFwcE5hbWUiLCJhcHBEYXRhIiwiaWRzIiwiYXBwbGljYXRpb25faWQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJjcmVhdGVBcHBsaWNhdGlvbiIsIkFwcGxpY2F0aW9ucyIsImNyZWF0ZSIsImZpcnN0QXBwIiwiY29uc29sZSIsImxvZyIsImdldEFwcGxpY2F0aW9uIiwiZ2V0QnlJZCIsImxpc3RBcHBsaWNhdGlvbnMiLCJnZXRBbGwiLCJhcHBzIiwidXBkYXRlQXBwbGljYXRpb24iLCJwYXRjaCIsInVwZGF0ZUJ5SWQiLCJyZXMiLCJkZWxldGVBcHBsaWNhdGlvbiIsImRlbGV0ZUJ5SWQiLCJtYWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWdCQTs7QUFoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFJQSxJQUFNQSxLQUFLLEdBQUcseUJBQWQ7QUFDQSxJQUFNQyxHQUFHLEdBQUcsSUFBSUMsWUFBSixDQUFRO0FBQ2xCQyxFQUFBQSxhQUFhLEVBQUU7QUFDYkMsSUFBQUEsSUFBSSxFQUFFLEtBRE87QUFFYkMsSUFBQUEsR0FBRyxFQUFFTDtBQUZRLEdBREc7QUFLbEJNLEVBQUFBLGNBQWMsRUFBRSxNQUxFO0FBTWxCQyxFQUFBQSxPQUFPLEVBQUUsOEJBTlM7QUFPbEJDLEVBQUFBLGFBQWEsRUFBRTtBQVBHLENBQVIsQ0FBWjtBQVVBLElBQU1DLElBQUksR0FBRyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBYjtBQUNBLElBQU1DLE9BQU8sdUJBQWdCSCxJQUFoQixDQUFiO0FBQ0EsSUFBTUks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QUE7QUFBQTtBQVFUWCxZQUFBQSxPQUFPLENBQUNDLEdBQVI7O0FBUlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSlksSUFBSTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQVlBQSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbmltcG9ydCBUVFMgZnJvbSAnLi4nXG5cbmNvbnN0IHRva2VuID0gJ2FjY2Vzcy10b2tlbi1vci1hcGkta2V5J1xuY29uc3QgdHRzID0gbmV3IFRUUyh7XG4gIGF1dGhvcml6YXRpb246IHtcbiAgICBtb2RlOiAna2V5JyxcbiAgICBrZXk6IHRva2VuLFxuICB9LFxuICBjb25uZWN0aW9uVHlwZTogJ2h0dHAnLFxuICBiYXNlVVJMOiAnaHR0cDovL2xvY2FsaG9zdDoxODg1L2FwaS92MycsXG4gIGRlZmF1bHRVc2VySWQ6ICd0ZXN0dXNlcicsXG59KVxuXG5jb25zdCBoYXNoID0gbmV3IERhdGUoKS52YWx1ZU9mKClcbmNvbnN0IGFwcE5hbWUgPSBgZmlyc3QtYXBwLSR7aGFzaH1gXG5jb25zdCBhcHBEYXRhID0ge1xuICBpZHM6IHtcbiAgICBhcHBsaWNhdGlvbl9pZDogYXBwTmFtZSxcbiAgfSxcbiAgbmFtZTogJ1Rlc3QgQXBwJyxcbiAgZGVzY3JpcHRpb246IGBTb21lIGRlc2NyaXB0aW9uICR7aGFzaH1gLFxufVxuXG5jb25zdCBjcmVhdGVBcHBsaWNhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZmlyc3RBcHAgPSBhd2FpdCB0dHMuQXBwbGljYXRpb25zLmNyZWF0ZSgndGVzdHVzZXInLCBhcHBEYXRhKVxuICBjb25zb2xlLmxvZyhmaXJzdEFwcClcbn1cblxuY29uc3QgZ2V0QXBwbGljYXRpb24gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGZpcnN0QXBwID0gYXdhaXQgdHRzLkFwcGxpY2F0aW9ucy5nZXRCeUlkKGFwcE5hbWUpXG4gIGNvbnNvbGUubG9nKGZpcnN0QXBwKVxufVxuXG5jb25zdCBsaXN0QXBwbGljYXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBhcHBzID0gYXdhaXQgdHRzLkFwcGxpY2F0aW9ucy5nZXRBbGwoKVxuICBjb25zb2xlLmxvZyhhcHBzKVxufVxuXG5jb25zdCB1cGRhdGVBcHBsaWNhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcGF0Y2ggPSB7IGRlc2NyaXB0aW9uOiAnTmV3IGRlc2NyaXB0aW9uJyB9XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHR0cy5BcHBsaWNhdGlvbnMudXBkYXRlQnlJZChhcHBOYW1lLCBwYXRjaClcbiAgY29uc29sZS5sb2cocmVzKVxufVxuXG5jb25zdCBkZWxldGVBcHBsaWNhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgdHRzLkFwcGxpY2F0aW9ucy5kZWxldGVCeUlkKGFwcE5hbWUpXG4gIGF3YWl0IHR0cy5BcHBsaWNhdGlvbnMuZGVsZXRlQnlJZChgc2Vjb25kLWFwcC0ke2hhc2h9YClcbn1cblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBjcmVhdGVBcHBsaWNhdGlvbigpXG4gICAgYXdhaXQgZ2V0QXBwbGljYXRpb24oKVxuICAgIGF3YWl0IGxpc3RBcHBsaWNhdGlvbnMoKVxuICAgIGF3YWl0IHVwZGF0ZUFwcGxpY2F0aW9uKClcbiAgICBhd2FpdCBkZWxldGVBcHBsaWNhdGlvbigpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycilcbiAgfVxufVxuXG5tYWluKClcbiJdfQ==