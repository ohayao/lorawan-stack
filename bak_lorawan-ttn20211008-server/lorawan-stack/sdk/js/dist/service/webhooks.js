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
var Webhooks = /*#__PURE__*/function () {
  function Webhooks(registry) {
    (0, _classCallCheck2["default"])(this, Webhooks);
    this._api = registry;
  }

  (0, _createClass2["default"])(Webhooks, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appId, selector) {
        var fieldMask, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context.next = 3;
                return this._api.List({
                  routeParams: {
                    'application_ids.application_id': appId
                  }
                }, fieldMask);

              case 3:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadListResponse('webhooks', result));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, webhook) {
        var mask,
            result,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mask = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : _marshaler["default"].fieldMaskFromPatch(webhook, this._api.SetAllowedFieldMaskPaths);
                _context2.next = 3;
                return this._api.Set({
                  routeParams: {
                    'webhook.ids.application_ids.application_id': appId
                  }
                }, {
                  webhook: webhook,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

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

      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appId, webhookId, selector) {
        var fieldMask, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context3.next = 3;
                return this._api.Get({
                  routeParams: {
                    'ids.application_ids.application_id': appId,
                    'ids.webhook_id': webhookId
                  }
                }, fieldMask);

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getById(_x5, _x6, _x7) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(appId, webhookId, patch) {
        var mask,
            result,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mask = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : _marshaler["default"].fieldMaskFromPatch(patch, this._api.SetAllowedFieldMaskPaths);
                _context4.next = 3;
                return this._api.Set({
                  routeParams: {
                    'webhook.ids.application_ids.application_id': appId,
                    'webhook.ids.webhook_id': webhookId
                  }
                }, {
                  webhook: patch,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

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

      function updateById(_x8, _x9, _x10) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(appId, webhookId) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._api.Delete({
                  routeParams: {
                    'application_ids.application_id': appId,
                    webhook_id: webhookId
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

      function deleteById(_x11, _x12) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "getFormats",
    value: function () {
      var _getFormats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._api.GetFormats();

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

      function getFormats() {
        return _getFormats.apply(this, arguments);
      }

      return getFormats;
    }()
  }, {
    key: "listTemplates",
    value: function () {
      var _listTemplates = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(selector) {
        var fieldMask, result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context7.next = 3;
                return this._api.ListTemplates(undefined, fieldMask);

              case 3:
                result = _context7.sent;
                return _context7.abrupt("return", _marshaler["default"].payloadListResponse('templates', result));

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function listTemplates(_x13) {
        return _listTemplates.apply(this, arguments);
      }

      return listTemplates;
    }()
  }, {
    key: "getTemplate",
    value: function () {
      var _getTemplate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(templateId, selector) {
        var fieldMask, result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context8.next = 3;
                return this._api.GetTemplate({
                  routeParams: {
                    'ids.template_id': templateId
                  }
                }, fieldMask);

              case 3:
                result = _context8.sent;
                return _context8.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getTemplate(_x14, _x15) {
        return _getTemplate.apply(this, arguments);
      }

      return getTemplate;
    }()
  }]);
  return Webhooks;
}();

var _default = Webhooks;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3dlYmhvb2tzLmpzIl0sIm5hbWVzIjpbIldlYmhvb2tzIiwicmVnaXN0cnkiLCJfYXBpIiwiYXBwSWQiLCJzZWxlY3RvciIsImZpZWxkTWFzayIsIk1hcnNoYWxlciIsInNlbGVjdG9yVG9GaWVsZE1hc2siLCJMaXN0Iiwicm91dGVQYXJhbXMiLCJyZXN1bHQiLCJwYXlsb2FkTGlzdFJlc3BvbnNlIiwid2ViaG9vayIsIm1hc2siLCJmaWVsZE1hc2tGcm9tUGF0Y2giLCJTZXRBbGxvd2VkRmllbGRNYXNrUGF0aHMiLCJTZXQiLCJmaWVsZF9tYXNrIiwicGF5bG9hZFNpbmdsZVJlc3BvbnNlIiwid2ViaG9va0lkIiwiR2V0IiwicGF0Y2giLCJEZWxldGUiLCJ3ZWJob29rX2lkIiwiR2V0Rm9ybWF0cyIsIkxpc3RUZW1wbGF0ZXMiLCJ1bmRlZmluZWQiLCJ0ZW1wbGF0ZUlkIiwiR2V0VGVtcGxhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7O0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFJTUEsUTtBQUNKLG9CQUFZQyxRQUFaLEVBQXNCO0FBQUE7QUFDcEIsU0FBS0MsSUFBTCxHQUFZRCxRQUFaO0FBQ0Q7Ozs7O2tHQUVELGlCQUFhRSxLQUFiLEVBQW9CQyxRQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUUMsZ0JBQUFBLFNBRFIsR0FDb0JDLHNCQUFVQyxtQkFBVixDQUE4QkgsUUFBOUIsQ0FEcEI7QUFBQTtBQUFBLHVCQUV1QixLQUFLRixJQUFMLENBQVVNLElBQVYsQ0FDbkI7QUFDRUMsa0JBQUFBLFdBQVcsRUFBRTtBQUFFLHNEQUFrQ047QUFBcEM7QUFEZixpQkFEbUIsRUFJbkJFLFNBSm1CLENBRnZCOztBQUFBO0FBRVFLLGdCQUFBQSxNQUZSO0FBQUEsaURBU1NKLHNCQUFVSyxtQkFBVixDQUE4QixVQUE5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VixFQUR2Qjs7QUFBQTtBQUNRZCxnQkFBQUEsTUFEUjtBQUFBLGtEQUdTSixzQkFBVVkscUJBQVYsQ0FBZ0NSLE1BQWhDLENBSFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7eUdBTUEsa0JBQW9CTixRQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUUMsZ0JBQUFBLFNBRFIsR0FDb0JDLHNCQUFVQyxtQkFBVixDQUE4QkgsUUFBOUIsQ0FEcEI7QUFBQTtBQUFBLHVCQUV1QixLQUFLRixJQUFMLENBQVV1QixhQUFWLENBQXdCQyxTQUF4QixFQUFtQ3JCLFNBQW5DLENBRnZCOztBQUFBO0FBRVFLLGdCQUFBQSxNQUZSO0FBQUEsa0RBSVNKLHNCQUFVSyxtQkFBVixDQUE4QixXQUE5QixFQUEyQ0QsTUFBM0MsQ0FKVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7Ozt1R0FPQSxrQkFBa0JpQixVQUFsQixFQUE4QnZCLFFBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRQyxnQkFBQUEsU0FEUixHQUNvQkMsc0JBQVVDLG1CQUFWLENBQThCSCxRQUE5QixDQURwQjtBQUFBO0FBQUEsdUJBRXVCLEtBQUtGLElBQUwsQ0FBVTBCLFdBQVYsQ0FDbkI7QUFDRW5CLGtCQUFBQSxXQUFXLEVBQUU7QUFDWCx1Q0FBbUJrQjtBQURSO0FBRGYsaUJBRG1CLEVBTW5CdEIsU0FObUIsQ0FGdkI7O0FBQUE7QUFFUUssZ0JBQUFBLE1BRlI7QUFBQSxrREFXU0osc0JBQVVZLHFCQUFWLENBQWdDUixNQUFoQyxDQVhUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQWVhVixRIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBXZWJob29rcyB7XG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5fYXBpID0gcmVnaXN0cnlcbiAgfVxuXG4gIGFzeW5jIGdldEFsbChhcHBJZCwgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBmaWVsZE1hc2sgPSBNYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvcilcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuTGlzdChcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHsgJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcElkIH0sXG4gICAgICB9LFxuICAgICAgZmllbGRNYXNrLFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZExpc3RSZXNwb25zZSgnd2ViaG9va3MnLCByZXN1bHQpXG4gIH1cblxuICBhc3luYyBjcmVhdGUoXG4gICAgYXBwSWQsXG4gICAgd2ViaG9vayxcbiAgICBtYXNrID0gTWFyc2hhbGVyLmZpZWxkTWFza0Zyb21QYXRjaCh3ZWJob29rLCB0aGlzLl9hcGkuU2V0QWxsb3dlZEZpZWxkTWFza1BhdGhzKSxcbiAgKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLlNldChcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnd2ViaG9vay5pZHMuYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwSWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB3ZWJob29rLFxuICAgICAgICBmaWVsZF9tYXNrOiBNYXJzaGFsZXIuZmllbGRNYXNrKG1hc2spLFxuICAgICAgfSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBnZXRCeUlkKGFwcElkLCB3ZWJob29rSWQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZmllbGRNYXNrID0gTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkdldChcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnaWRzLmFwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcElkLFxuICAgICAgICAgICdpZHMud2ViaG9va19pZCc6IHdlYmhvb2tJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmaWVsZE1hc2ssXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlQnlJZChcbiAgICBhcHBJZCxcbiAgICB3ZWJob29rSWQsXG4gICAgcGF0Y2gsXG4gICAgbWFzayA9IE1hcnNoYWxlci5maWVsZE1hc2tGcm9tUGF0Y2gocGF0Y2gsIHRoaXMuX2FwaS5TZXRBbGxvd2VkRmllbGRNYXNrUGF0aHMpLFxuICApIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuU2V0KFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgICd3ZWJob29rLmlkcy5hcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgICAnd2ViaG9vay5pZHMud2ViaG9va19pZCc6IHdlYmhvb2tJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHdlYmhvb2s6IHBhdGNoLFxuICAgICAgICBmaWVsZF9tYXNrOiBNYXJzaGFsZXIuZmllbGRNYXNrKG1hc2spLFxuICAgICAgfSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBkZWxldGVCeUlkKGFwcElkLCB3ZWJob29rSWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuRGVsZXRlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgd2ViaG9va19pZDogd2ViaG9va0lkLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZ2V0Rm9ybWF0cygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuR2V0Rm9ybWF0cygpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBsaXN0VGVtcGxhdGVzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZmllbGRNYXNrID0gTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkxpc3RUZW1wbGF0ZXModW5kZWZpbmVkLCBmaWVsZE1hc2spXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRMaXN0UmVzcG9uc2UoJ3RlbXBsYXRlcycsIHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGdldFRlbXBsYXRlKHRlbXBsYXRlSWQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZmllbGRNYXNrID0gTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkdldFRlbXBsYXRlKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgICdpZHMudGVtcGxhdGVfaWQnOiB0ZW1wbGF0ZUlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGZpZWxkTWFzayxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViaG9va3NcbiJdfQ==