"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _applications = _interopRequireDefault(require("./service/applications"));

var _ = _interopRequireDefault(require("."));

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
var mockApplicationData = {
  ids: {
    application_id: 'test'
  },
  created_at: '2018-08-29T14:00:20.793Z',
  updated_at: '2018-08-29T14:00:20.793Z',
  name: 'string',
  description: 'string',
  attributes: {
    additionalProp1: 'string',
    additionalProp2: 'string',
    additionalProp3: 'string'
  },
  contact_info: [{
    contact_type: 'CONTACT_TYPE_OTHER',
    contact_method: 'CONTACT_METHOD_OTHER',
    value: 'string',
    "public": true,
    validated_at: '2018-08-29T14:00:20.793Z'
  }]
};
var mockDeviceData = {
  ids: {
    device_id: 'test-device',
    application_ids: {
      application_id: 'test'
    },
    dev_eui: 'string',
    join_eui: 'string',
    dev_addr: 'string'
  }
};
jest.mock('./api', function () {
  return jest.fn().mockImplementation(function () {
    return {
      ApplicationRegistry: {
        Get: jest.fn().mockResolvedValue({
          data: mockApplicationData
        }),
        List: jest.fn().mockResolvedValue({
          data: {
            applications: [mockApplicationData]
          },
          headers: {
            'x-total-count': 1
          }
        })
      },
      EndDeviceRegistry: {
        Get: jest.fn().mockResolvedValue({
          data: mockDeviceData
        })
      },
      NsEndDeviceRegistry: {
        Get: jest.fn().mockResolvedValue({
          data: mockDeviceData
        })
      },
      AsEndDeviceRegistry: {
        Get: jest.fn().mockResolvedValue({
          data: mockDeviceData
        })
      },
      JsEndDeviceRegistry: {
        Get: jest.fn().mockResolvedValue({
          data: mockDeviceData
        })
      }
    };
  });
});
describe('SDK class', function () {
  var token = 'faketoken';
  var tts = new _["default"]({
    authorization: {
      mode: 'key',
      key: token
    },
    connectionType: 'http',
    stackConfig: {
      is: 'http://localhost:1885/api/v3'
    }
  });
  it('instanciates successfully', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expect(tts).toBeDefined();
            expect(tts).toBeInstanceOf(_["default"]);
            expect(tts.Applications).toBeInstanceOf(_applications["default"]);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('retrieves application instance correctly', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var app;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tts.Applications.getById('test');

          case 2:
            app = _context2.sent;
            expect(app).toBeDefined();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50ZXN0LmpzIl0sIm5hbWVzIjpbIm1vY2tBcHBsaWNhdGlvbkRhdGEiLCJpZHMiLCJhcHBsaWNhdGlvbl9pZCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwibmFtZSIsImRlc2NyaXB0aW9uIiwiYXR0cmlidXRlcyIsImFkZGl0aW9uYWxQcm9wMSIsImFkZGl0aW9uYWxQcm9wMiIsImFkZGl0aW9uYWxQcm9wMyIsImNvbnRhY3RfaW5mbyIsImNvbnRhY3RfdHlwZSIsImNvbnRhY3RfbWV0aG9kIiwidmFsdWUiLCJ2YWxpZGF0ZWRfYXQiLCJtb2NrRGV2aWNlRGF0YSIsImRldmljZV9pZCIsImFwcGxpY2F0aW9uX2lkcyIsImRldl9ldWkiLCJqb2luX2V1aSIsImRldl9hZGRyIiwiamVzdCIsIm1vY2siLCJmbiIsIm1vY2tJbXBsZW1lbnRhdGlvbiIsIkFwcGxpY2F0aW9uUmVnaXN0cnkiLCJHZXQiLCJtb2NrUmVzb2x2ZWRWYWx1ZSIsImRhdGEiLCJMaXN0IiwiYXBwbGljYXRpb25zIiwiaGVhZGVycyIsIkVuZERldmljZVJlZ2lzdHJ5IiwiTnNFbmREZXZpY2VSZWdpc3RyeSIsIkFzRW5kRGV2aWNlUmVnaXN0cnkiLCJKc0VuZERldmljZVJlZ2lzdHJ5IiwiZGVzY3JpYmUiLCJ0b2tlbiIsInR0cyIsIlRUUyIsImF1dGhvcml6YXRpb24iLCJtb2RlIiwia2V5IiwiY29ubmVjdGlvblR5cGUiLCJzdGFja0NvbmZpZyIsImlzIiwiaXQiLCJleHBlY3QiLCJ0b0JlRGVmaW5lZCIsInRvQmVJbnN0YW5jZU9mIiwiQXBwbGljYXRpb25zIiwiZ2V0QnlJZCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFjQTs7QUFFQTs7QUFoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxJQUFNQSxtQkFBbUIsR0FBRztBQUMxQkMsRUFBQUEsR0FBRyxFQUFFO0FBQ0hD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RUFBRSxNQUxFO0FBTWxCQyxJQUFBQSxXQUFXLEVBQUU7QUFBRUMsTUFBQUEsRUFBRSxFQUFFO0FBQU47QUFOSyxHQUFSLENBQVo7QUFTQUMsRUFBQUEsRUFBRSxDQUFDLDJCQUFELDZGQUE4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzlCQyxZQUFBQSxNQUFNLENBQUNULEdBQUQsQ0FBTixDQUFZVSxXQUFaO0FBQ0FELFlBQUFBLE1BQU0sQ0FBQ1QsR0FBRCxDQUFOLENBQVlXLGNBQVosQ0FBMkJWLFlBQTNCO0FBQ0FRLFlBQUFBLE1BQU0sQ0FBQ1QsR0FBRyxDQUFDWSxZQUFMLENBQU4sQ0FBeUJELGNBQXpCLENBQXdDQyx3QkFBeEM7O0FBSDhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTlCLEdBQUY7QUFNQUosRUFBQUEsRUFBRSxDQUFDLDBDQUFELDZGQUE2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUMzQlIsR0FBRyxDQUFDWSxZQUFKLENBQWlCQyxPQUFqQixDQUF5QixNQUF6QixDQUQyQjs7QUFBQTtBQUN2Q0MsWUFBQUEsR0FEdUM7QUFFN0NMLFlBQUFBLE1BQU0sQ0FBQ0ssR0FBRCxDQUFOLENBQVlKLFdBQVo7O0FBRjZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTdDLEdBQUY7QUFJRCxDQXJCTyxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgQXBwbGljYXRpb25zIGZyb20gJy4vc2VydmljZS9hcHBsaWNhdGlvbnMnXG5cbmltcG9ydCBUVFMgZnJvbSAnLidcblxuY29uc3QgbW9ja0FwcGxpY2F0aW9uRGF0YSA9IHtcbiAgaWRzOiB7XG4gICAgYXBwbGljYXRpb25faWQ6ICd0ZXN0JyxcbiAgfSxcbiAgY3JlYXRlZF9hdDogJzIwMTgtMDgtMjlUMTQ6MDA6MjAuNzkzWicsXG4gIHVwZGF0ZWRfYXQ6ICcyMDE4LTA4LTI5VDE0OjAwOjIwLjc5M1onLFxuICBuYW1lOiAnc3RyaW5nJyxcbiAgZGVzY3JpcHRpb246ICdzdHJpbmcnLFxuICBhdHRyaWJ1dGVzOiB7XG4gICAgYWRkaXRpb25hbFByb3AxOiAnc3RyaW5nJyxcbiAgICBhZGRpdGlvbmFsUHJvcDI6ICdzdHJpbmcnLFxuICAgIGFkZGl0aW9uYWxQcm9wMzogJ3N0cmluZycsXG4gIH0sXG4gIGNvbnRhY3RfaW5mbzogW1xuICAgIHtcbiAgICAgIGNvbnRhY3RfdHlwZTogJ0NPTlRBQ1RfVFlQRV9PVEhFUicsXG4gICAgICBjb250YWN0X21ldGhvZDogJ0NPTlRBQ1RfTUVUSE9EX09USEVSJyxcbiAgICAgIHZhbHVlOiAnc3RyaW5nJyxcbiAgICAgIHB1YmxpYzogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlZF9hdDogJzIwMTgtMDgtMjlUMTQ6MDA6MjAuNzkzWicsXG4gICAgfSxcbiAgXSxcbn1cblxuY29uc3QgbW9ja0RldmljZURhdGEgPSB7XG4gIGlkczoge1xuICAgIGRldmljZV9pZDogJ3Rlc3QtZGV2aWNlJyxcbiAgICBhcHBsaWNhdGlvbl9pZHM6IHtcbiAgICAgIGFwcGxpY2F0aW9uX2lkOiAndGVzdCcsXG4gICAgfSxcbiAgICBkZXZfZXVpOiAnc3RyaW5nJyxcbiAgICBqb2luX2V1aTogJ3N0cmluZycsXG4gICAgZGV2X2FkZHI6ICdzdHJpbmcnLFxuICB9LFxufVxuXG5qZXN0Lm1vY2soJy4vYXBpJywgKCkgPT5cbiAgamVzdC5mbigpLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiAoe1xuICAgIEFwcGxpY2F0aW9uUmVnaXN0cnk6IHtcbiAgICAgIEdldDogamVzdC5mbigpLm1vY2tSZXNvbHZlZFZhbHVlKHsgZGF0YTogbW9ja0FwcGxpY2F0aW9uRGF0YSB9KSxcbiAgICAgIExpc3Q6IGplc3QuZm4oKS5tb2NrUmVzb2x2ZWRWYWx1ZSh7XG4gICAgICAgIGRhdGE6IHsgYXBwbGljYXRpb25zOiBbbW9ja0FwcGxpY2F0aW9uRGF0YV0gfSxcbiAgICAgICAgaGVhZGVyczogeyAneC10b3RhbC1jb3VudCc6IDEgfSxcbiAgICAgIH0pLFxuICAgIH0sXG4gICAgRW5kRGV2aWNlUmVnaXN0cnk6IHtcbiAgICAgIEdldDogamVzdC5mbigpLm1vY2tSZXNvbHZlZFZhbHVlKHsgZGF0YTogbW9ja0RldmljZURhdGEgfSksXG4gICAgfSxcbiAgICBOc0VuZERldmljZVJlZ2lzdHJ5OiB7XG4gICAgICBHZXQ6IGplc3QuZm4oKS5tb2NrUmVzb2x2ZWRWYWx1ZSh7IGRhdGE6IG1vY2tEZXZpY2VEYXRhIH0pLFxuICAgIH0sXG4gICAgQXNFbmREZXZpY2VSZWdpc3RyeToge1xuICAgICAgR2V0OiBqZXN0LmZuKCkubW9ja1Jlc29sdmVkVmFsdWUoeyBkYXRhOiBtb2NrRGV2aWNlRGF0YSB9KSxcbiAgICB9LFxuICAgIEpzRW5kRGV2aWNlUmVnaXN0cnk6IHtcbiAgICAgIEdldDogamVzdC5mbigpLm1vY2tSZXNvbHZlZFZhbHVlKHsgZGF0YTogbW9ja0RldmljZURhdGEgfSksXG4gICAgfSxcbiAgfSkpLFxuKVxuXG5kZXNjcmliZSgnU0RLIGNsYXNzJywgKCkgPT4ge1xuICBjb25zdCB0b2tlbiA9ICdmYWtldG9rZW4nXG4gIGNvbnN0IHR0cyA9IG5ldyBUVFMoe1xuICAgIGF1dGhvcml6YXRpb246IHtcbiAgICAgIG1vZGU6ICdrZXknLFxuICAgICAga2V5OiB0b2tlbixcbiAgICB9LFxuICAgIGNvbm5lY3Rpb25UeXBlOiAnaHR0cCcsXG4gICAgc3RhY2tDb25maWc6IHsgaXM6ICdodHRwOi8vbG9jYWxob3N0OjE4ODUvYXBpL3YzJyB9LFxuICB9KVxuXG4gIGl0KCdpbnN0YW5jaWF0ZXMgc3VjY2Vzc2Z1bGx5JywgYXN5bmMgKCkgPT4ge1xuICAgIGV4cGVjdCh0dHMpLnRvQmVEZWZpbmVkKClcbiAgICBleHBlY3QodHRzKS50b0JlSW5zdGFuY2VPZihUVFMpXG4gICAgZXhwZWN0KHR0cy5BcHBsaWNhdGlvbnMpLnRvQmVJbnN0YW5jZU9mKEFwcGxpY2F0aW9ucylcbiAgfSlcblxuICBpdCgncmV0cmlldmVzIGFwcGxpY2F0aW9uIGluc3RhbmNlIGNvcnJlY3RseScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBhd2FpdCB0dHMuQXBwbGljYXRpb25zLmdldEJ5SWQoJ3Rlc3QnKVxuICAgIGV4cGVjdChhcHApLnRvQmVEZWZpbmVkKClcbiAgfSlcbn0pXG4iXX0=