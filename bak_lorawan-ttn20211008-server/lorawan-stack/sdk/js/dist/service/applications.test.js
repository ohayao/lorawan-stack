"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
jest.mock('../api', function () {
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
      }
    };
  });
});
describe('Applications', function () {
  var applications;
  beforeEach(function () {
    var Api = require('../api');

    var Applications = require('./applications')["default"];

    applications = new Applications(new Api(), {
      defaultUserId: 'testuser'
    });
  });
  describe('when using proxied results', function () {
    it('initializes correctly', function () {
      jest.resetModules();
      expect(applications._api).toBeDefined();
    });
    it('returns an application instance on getById()', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var app;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              jest.resetModules();
              _context.next = 3;
              return applications.getById('test');

            case 3:
              app = _context.sent;
              expect(app).toBeDefined();
              expect(app.ids.application_id).toBe('test');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('returns an application list on getAll()', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var result, apps, totalCount;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              jest.resetModules();
              _context2.next = 3;
              return applications.getAll();

            case 3:
              result = _context2.sent;
              expect(result).toBeDefined();
              apps = result.applications, totalCount = result.totalCount;
              expect(apps.constructor.name).toBe('Array');
              expect(apps).toHaveLength(1);
              expect(totalCount).toBe(1);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2FwcGxpY2F0aW9ucy50ZXN0LmpzIl0sIm5hbWVzIjpbIm1vY2tBcHBsaWNhdGlvbkRhdGEiLCJpZHMiLCJhcHBsaWNhdGlvbl9pZCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwibmFtZSIsImRlc2NyaXB0aW9uIiwiYXR0cmlidXRlcyIsImFkZGl0aW9uYWxQcm9wMSIsImFkZGl0aW9uYWxQcm9wMiIsImFkZGl0aW9uYWxQcm9wMyIsImNvbnRhY3RfaW5mbyIsImNvbnRhY3RfdHlwZSIsImNvbnRhY3RfbWV0aG9kIiwidmFsdWUiLCJ2YWxpZGF0ZWRfYXQiLCJqZXN0IiwibW9jayIsImZuIiwibW9ja0ltcGxlbWVudGF0aW9uIiwiQXBwbGljYXRpb25SZWdpc3RyeSIsIkdldCIsIm1vY2tSZXNvbHZlZFZhbHVlIiwiZGF0YSIsIkxpc3QiLCJhcHBsaWNhdGlvbnMiLCJoZWFkZXJzIiwiZGVzY3JpYmUiLCJiZWZvcmVFYWNoIiwiQXBpIiwicmVxdWlyZSIsIkFwcGxpY2F0aW9ucyIsImRlZmF1bHRVc2VySWQiLCJpdCIsInJlc2V0TW9kdWxlcyIsImV4cGVjdCIsIl9hcGkiLCJ0b0JlRGVmaW5lZCIsImdldEJ5SWQiLCJhcHAiLCJ0b0JlIiwiZ2V0QWxsIiwicmVzdWx0IiwiYXBwcyIsInRvdGFsQ291bnQiLCJjb25zdHJ1Y3RvciIsInRvSGF2ZUxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLG1CQUFtQixHQUFHO0FBQzFCQyxFQUFBQSxHQUFHLEVBQUU7QUFDSEMsSUFBQUEsY0FBYyxFQUFFO0FBRGIsR0FEcUI7QUFJMUJDLEVBQUFBLFVBQVUsRUFBRSwwQkFKYztBQUsxQkMsRUFBQUEsVUFBVSxFQUFFLDBCQUxjO0FBTTFCQyxFQUFBQSxJQUFJLEVBQUUsUUFOb0I7QUFPMUJD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WUFOb0MsRUFNaEJtQixVQU5nQixHQU1ERixNQU5DLENBTWhCRSxVQU5nQjtBQU81Q1QsY0FBQUEsTUFBTSxDQUFDUSxJQUFJLENBQUNFLFdBQUwsQ0FBaUJ4QyxJQUFsQixDQUFOLENBQThCbUMsSUFBOUIsQ0FBbUMsT0FBbkM7QUFDQUwsY0FBQUEsTUFBTSxDQUFDUSxJQUFELENBQU4sQ0FBYUcsWUFBYixDQUEwQixDQUExQjtBQUNBWCxjQUFBQSxNQUFNLENBQUNTLFVBQUQsQ0FBTixDQUFtQkosSUFBbkIsQ0FBd0IsQ0FBeEI7O0FBVDRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQTVDLEdBQUY7QUFXRCxHQTFCTyxDQUFSO0FBMkJELENBcENPLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmNvbnN0IG1vY2tBcHBsaWNhdGlvbkRhdGEgPSB7XG4gIGlkczoge1xuICAgIGFwcGxpY2F0aW9uX2lkOiAndGVzdCcsXG4gIH0sXG4gIGNyZWF0ZWRfYXQ6ICcyMDE4LTA4LTI5VDE0OjAwOjIwLjc5M1onLFxuICB1cGRhdGVkX2F0OiAnMjAxOC0wOC0yOVQxNDowMDoyMC43OTNaJyxcbiAgbmFtZTogJ3N0cmluZycsXG4gIGRlc2NyaXB0aW9uOiAnc3RyaW5nJyxcbiAgYXR0cmlidXRlczoge1xuICAgIGFkZGl0aW9uYWxQcm9wMTogJ3N0cmluZycsXG4gICAgYWRkaXRpb25hbFByb3AyOiAnc3RyaW5nJyxcbiAgICBhZGRpdGlvbmFsUHJvcDM6ICdzdHJpbmcnLFxuICB9LFxuICBjb250YWN0X2luZm86IFtcbiAgICB7XG4gICAgICBjb250YWN0X3R5cGU6ICdDT05UQUNUX1RZUEVfT1RIRVInLFxuICAgICAgY29udGFjdF9tZXRob2Q6ICdDT05UQUNUX01FVEhPRF9PVEhFUicsXG4gICAgICB2YWx1ZTogJ3N0cmluZycsXG4gICAgICBwdWJsaWM6IHRydWUsXG4gICAgICB2YWxpZGF0ZWRfYXQ6ICcyMDE4LTA4LTI5VDE0OjAwOjIwLjc5M1onLFxuICAgIH0sXG4gIF0sXG59XG5cbmplc3QubW9jaygnLi4vYXBpJywgKCkgPT5cbiAgamVzdC5mbigpLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiAoe1xuICAgIEFwcGxpY2F0aW9uUmVnaXN0cnk6IHtcbiAgICAgIEdldDogamVzdC5mbigpLm1vY2tSZXNvbHZlZFZhbHVlKHsgZGF0YTogbW9ja0FwcGxpY2F0aW9uRGF0YSB9KSxcbiAgICAgIExpc3Q6IGplc3QuZm4oKS5tb2NrUmVzb2x2ZWRWYWx1ZSh7XG4gICAgICAgIGRhdGE6IHsgYXBwbGljYXRpb25zOiBbbW9ja0FwcGxpY2F0aW9uRGF0YV0gfSxcbiAgICAgICAgaGVhZGVyczogeyAneC10b3RhbC1jb3VudCc6IDEgfSxcbiAgICAgIH0pLFxuICAgIH0sXG4gIH0pKSxcbilcblxuZGVzY3JpYmUoJ0FwcGxpY2F0aW9ucycsICgpID0+IHtcbiAgbGV0IGFwcGxpY2F0aW9uc1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjb25zdCBBcGkgPSByZXF1aXJlKCcuLi9hcGknKVxuXG4gICAgY29uc3QgQXBwbGljYXRpb25zID0gcmVxdWlyZSgnLi9hcHBsaWNhdGlvbnMnKS5kZWZhdWx0XG4gICAgYXBwbGljYXRpb25zID0gbmV3IEFwcGxpY2F0aW9ucyhuZXcgQXBpKCksIHsgZGVmYXVsdFVzZXJJZDogJ3Rlc3R1c2VyJyB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCd3aGVuIHVzaW5nIHByb3hpZWQgcmVzdWx0cycsICgpID0+IHtcbiAgICBpdCgnaW5pdGlhbGl6ZXMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgamVzdC5yZXNldE1vZHVsZXMoKVxuXG4gICAgICBleHBlY3QoYXBwbGljYXRpb25zLl9hcGkpLnRvQmVEZWZpbmVkKClcbiAgICB9KVxuXG4gICAgaXQoJ3JldHVybnMgYW4gYXBwbGljYXRpb24gaW5zdGFuY2Ugb24gZ2V0QnlJZCgpJywgYXN5bmMgKCkgPT4ge1xuICAgICAgamVzdC5yZXNldE1vZHVsZXMoKVxuXG4gICAgICBjb25zdCBhcHAgPSBhd2FpdCBhcHBsaWNhdGlvbnMuZ2V0QnlJZCgndGVzdCcpXG4gICAgICBleHBlY3QoYXBwKS50b0JlRGVmaW5lZCgpXG4gICAgICBleHBlY3QoYXBwLmlkcy5hcHBsaWNhdGlvbl9pZCkudG9CZSgndGVzdCcpXG4gICAgfSlcblxuICAgIGl0KCdyZXR1cm5zIGFuIGFwcGxpY2F0aW9uIGxpc3Qgb24gZ2V0QWxsKCknLCBhc3luYyAoKSA9PiB7XG4gICAgICBqZXN0LnJlc2V0TW9kdWxlcygpXG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFwcGxpY2F0aW9ucy5nZXRBbGwoKVxuICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKVxuXG4gICAgICBjb25zdCB7IGFwcGxpY2F0aW9uczogYXBwcywgdG90YWxDb3VudCB9ID0gcmVzdWx0XG4gICAgICBleHBlY3QoYXBwcy5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdBcnJheScpXG4gICAgICBleHBlY3QoYXBwcykudG9IYXZlTGVuZ3RoKDEpXG4gICAgICBleHBlY3QodG90YWxDb3VudCkudG9CZSgxKVxuICAgIH0pXG4gIH0pXG59KVxuIl19