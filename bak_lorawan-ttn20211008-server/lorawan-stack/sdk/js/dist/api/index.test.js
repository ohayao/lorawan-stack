"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _stackConfiguration = _interopRequireDefault(require("../util/stack-configuration"));

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
jest.mock('../../generated/api-definition.json', function () {
  return {
    ApplicationRegistry: {
      Create: {
        file: 'lorawan-stack/api/application_services.proto',
        http: [{
          method: 'post',
          pattern: '/users/{collaborator.user_ids.user_id}/applications',
          body: '*',
          parameters: ['collaborator.user_ids.user_id']
        }, {
          method: 'post',
          pattern: '/organizations/{collaborator.organization_ids.organization_id}/applications',
          body: '*',
          parameters: ['collaborator.organization_ids.organization_id']
        }]
      },
      List: {
        file: 'lorawan-stack/api/application_services.proto',
        http: [{
          method: 'get',
          pattern: '/applications',
          parameters: []
        }]
      },
      Events: {
        file: 'lorawan-stack/api/application_services.proto',
        http: [{
          method: 'get',
          pattern: '/events',
          parameters: [],
          stream: true
        }]
      }
    }
  };
});
describe('API class', function () {
  var api;
  beforeEach(function () {
    api = new _["default"]('http', {
      mode: 'key',
      key: 'ABCDEFG'
    }, new _stackConfiguration["default"]({
      is: 'http://localhost:1885',
      as: 'http://localhost:1885',
      ns: 'http://localhost:1885',
      js: 'http://localhost:1885'
    }));
    api._connector.handleRequest = jest.fn();
  });
  it('applies api definitions correctly', function () {
    expect(api.ApplicationRegistry.Create).toBeDefined();
    expect((0, _typeof2["default"])(api.ApplicationRegistry.Create)).toBe('function');
  });
  it('applies parameters correctly', function () {
    api.ApplicationRegistry.Create({
      routeParams: {
        'collaborator.user_ids.user_id': 'test'
      }
    }, {
      name: 'test-name'
    });
    expect(api._connector.handleRequest).toHaveBeenCalledTimes(1);
    expect(api._connector.handleRequest).toHaveBeenCalledWith('post', '/users/test/applications', undefined, {
      name: 'test-name'
    }, false);
  });
  it('throws when parameters mismatch', function () {
    expect(function () {
      api.ApplicationRegistry.Create({
        'some.other.param': 'test'
      });
    }).toThrow();
  });
  it('respects the search query', function () {
    api.ApplicationRegistry.List(undefined, {
      limit: 2,
      page: 1
    });
    expect(api._connector.handleRequest).toHaveBeenCalledTimes(1);
    expect(api._connector.handleRequest).toHaveBeenCalledWith('get', '/applications', undefined, {
      limit: 2,
      page: 1
    }, false);
  });
  it('sets stream value to true for streaming endpoints', function () {
    api.ApplicationRegistry.Events();
    expect(api._connector.handleRequest).toHaveBeenCalledTimes(1);
    expect(api._connector.handleRequest).toHaveBeenCalledWith('get', '/events', undefined, undefined, true);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6WyJqZXN0IiwibW9jayIsIkFwcGxpY2F0aW9uUmVnaXN0cnkiLCJDcmVhdGUiLCJmaWxlIiwiaHR0cCIsIm1ldGhvZCIsInBhdHRlcm4iLCJib2R5IiwicGFyYW1ldGVycyIsIkxpc3QiLCJFdmVudHMiLCJzdHJlYW0iLCJkZXNjcmliZSIsImFwaSIsImJlZm9yZUVhY2giLCJBcGkiLCJtb2RlIiwia2V5IiwiU3RhY2tDb25maWd1cmF0aW9uIiwiaXMiLCJhcyIsIm5zIiwianMiLCJfY29ubmVjdG9yIiwiaGFuZGxlUmVxdWVzdCIsImZuIiwiaXQiLCJleHBlY3QiLCJ0b0JlRGVmaW5lZCIsInRvQmUiLCJyb3V0ZVBhcmFtcyIsIm5hbWUiLCJ0b0hhdmVCZWVuQ2FsbGVkVGltZXMiLCJ0b0hhdmVCZWVuQ2FsbGVkV2l0aCIsInVuZGVmaW5lZCIsInRvVGhyb3ciLCJsaW1pdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQWNBOztBQUVBOztBQWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BQSxJQUFJLENBQUNDLElBQUwsQ0FBVSxxQ0FBVixFQUFpRDtBQUFBLFNBQU87QUFDdERDLElBQUFBLG1CQUFtQixFQUFFO0FBQ25CQyxNQUFBQSxNQUFNLEVBQUU7QUFDTkMsUUFBQUEsSUFBSSxFQUFFLDhDQURBO0FBRU5DLFFBQUFBLElBQUksRUFBRSxDQUNKO0FBQ0VDLFVBQUFBLE1BQU0sRUFBRSxNQURWO0FBRUVDLFVBQUFBLE9BQU8sRUFBRSxxREFGWDtBQUdFQyxVQUFBQSxJQUFJLEVBQUUsR0FIUjtBQUlFQyxVQUFBQSxVQUFVLEVBQUUsQ0FBQywrQkFBRDtBQUpkLFNBREksRUFPSjtBQUNFSCxVQUFBQSxNQUFNLEVBQUUsTUFEVjtBQUVFQyxVQUFBQSxPQUFPLEVBQUUsNkVBRlg7QUFHRUMsVUFBQUEsSUFB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QTdCLEVBQXdDO0FBQUVFLE1BQUFBLEtBQUssRUFBRSxDQUFUO0FBQVlDLE1BQUFBLElBQUksRUFBRTtBQUFsQixLQUF4QztBQUVBVixJQUFBQSxNQUFNLENBQUNkLEdBQUcsQ0FBQ1UsVUFBSixDQUFlQyxhQUFoQixDQUFOLENBQXFDUSxxQkFBckMsQ0FBMkQsQ0FBM0Q7QUFDQUwsSUFBQUEsTUFBTSxDQUFDZCxHQUFHLENBQUNVLFVBQUosQ0FBZUMsYUFBaEIsQ0FBTixDQUFxQ1Msb0JBQXJDLENBQ0UsS0FERixFQUVFLGVBRkYsRUFHRUMsU0FIRixFQUlFO0FBQUVFLE1BQUFBLEtBQUssRUFBRSxDQUFUO0FBQVlDLE1BQUFBLElBQUksRUFBRTtBQUFsQixLQUpGLEVBS0UsS0FMRjtBQU9ELEdBWEMsQ0FBRjtBQWFBWCxFQUFBQSxFQUFFLENBQUMsbURBQUQsRUFBc0QsWUFBTTtBQUM1RGIsSUFBQUEsR0FBRyxDQUFDWixtQkFBSixDQUF3QlMsTUFBeEI7QUFFQWlCLElBQUFBLE1BQU0sQ0FBQ2QsR0FBRyxDQUFDVSxVQUFKLENBQWVDLGFBQWhCLENBQU4sQ0FBcUNRLHFCQUFyQyxDQUEyRCxDQUEzRDtBQUNBTCxJQUFBQSxNQUFNLENBQUNkLEdBQUcsQ0FBQ1UsVUFBSixDQUFlQyxhQUFoQixDQUFOLENBQXFDUyxvQkFBckMsQ0FDRSxLQURGLEVBRUUsU0FGRixFQUdFQyxTQUhGLEVBSUVBLFNBSkYsRUFLRSxJQUxGO0FBT0QsR0FYQyxDQUFGO0FBWUQsQ0FwRU8sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IFN0YWNrQ29uZmlndXJhdGlvbiBmcm9tICcuLi91dGlsL3N0YWNrLWNvbmZpZ3VyYXRpb24nXG5cbmltcG9ydCBBcGkgZnJvbSAnLidcblxuamVzdC5tb2NrKCcuLi8uLi9nZW5lcmF0ZWQvYXBpLWRlZmluaXRpb24uanNvbicsICgpID0+ICh7XG4gIEFwcGxpY2F0aW9uUmVnaXN0cnk6IHtcbiAgICBDcmVhdGU6IHtcbiAgICAgIGZpbGU6ICdsb3Jhd2FuLXN0YWNrL2FwaS9hcHBsaWNhdGlvbl9zZXJ2aWNlcy5wcm90bycsXG4gICAgICBodHRwOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICBwYXR0ZXJuOiAnL3VzZXJzL3tjb2xsYWJvcmF0b3IudXNlcl9pZHMudXNlcl9pZH0vYXBwbGljYXRpb25zJyxcbiAgICAgICAgICBib2R5OiAnKicsXG4gICAgICAgICAgcGFyYW1ldGVyczogWydjb2xsYWJvcmF0b3IudXNlcl9pZHMudXNlcl9pZCddLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgcGF0dGVybjogJy9vcmdhbml6YXRpb25zL3tjb2xsYWJvcmF0b3Iub3JnYW5pemF0aW9uX2lkcy5vcmdhbml6YXRpb25faWR9L2FwcGxpY2F0aW9ucycsXG4gICAgICAgICAgYm9keTogJyonLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IFsnY29sbGFib3JhdG9yLm9yZ2FuaXphdGlvbl9pZHMub3JnYW5pemF0aW9uX2lkJ10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgTGlzdDoge1xuICAgICAgZmlsZTogJ2xvcmF3YW4tc3RhY2svYXBpL2FwcGxpY2F0aW9uX3NlcnZpY2VzLnByb3RvJyxcbiAgICAgIGh0dHA6IFtcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGF0dGVybjogJy9hcHBsaWNhdGlvbnMnLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IFtdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIEV2ZW50czoge1xuICAgICAgZmlsZTogJ2xvcmF3YW4tc3RhY2svYXBpL2FwcGxpY2F0aW9uX3NlcnZpY2VzLnByb3RvJyxcbiAgICAgIGh0dHA6IFtcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGF0dGVybjogJy9ldmVudHMnLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IFtdLFxuICAgICAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pKVxuXG5kZXNjcmliZSgnQVBJIGNsYXNzJywgKCkgPT4ge1xuICBsZXQgYXBpXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGFwaSA9IG5ldyBBcGkoXG4gICAgICAnaHR0cCcsXG4gICAgICB7IG1vZGU6ICdrZXknLCBrZXk6ICdBQkNERUZHJyB9LFxuICAgICAgbmV3IFN0YWNrQ29uZmlndXJhdGlvbih7XG4gICAgICAgIGlzOiAnaHR0cDovL2xvY2FsaG9zdDoxODg1JyxcbiAgICAgICAgYXM6ICdodHRwOi8vbG9jYWxob3N0OjE4ODUnLFxuICAgICAgICBuczogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTg4NScsXG4gICAgICAgIGpzOiAnaHR0cDovL2xvY2FsaG9zdDoxODg1JyxcbiAgICAgIH0pLFxuICAgIClcbiAgICBhcGkuX2Nvbm5lY3Rvci5oYW5kbGVSZXF1ZXN0ID0gamVzdC5mbigpXG4gIH0pXG5cbiAgaXQoJ2FwcGxpZXMgYXBpIGRlZmluaXRpb25zIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBleHBlY3QoYXBpLkFwcGxpY2F0aW9uUmVnaXN0cnkuQ3JlYXRlKS50b0JlRGVmaW5lZCgpXG4gICAgZXhwZWN0KHR5cGVvZiBhcGkuQXBwbGljYXRpb25SZWdpc3RyeS5DcmVhdGUpLnRvQmUoJ2Z1bmN0aW9uJylcbiAgfSlcblxuICBpdCgnYXBwbGllcyBwYXJhbWV0ZXJzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBhcGkuQXBwbGljYXRpb25SZWdpc3RyeS5DcmVhdGUoXG4gICAgICB7IHJvdXRlUGFyYW1zOiB7ICdjb2xsYWJvcmF0b3IudXNlcl9pZHMudXNlcl9pZCc6ICd0ZXN0JyB9IH0sXG4gICAgICB7IG5hbWU6ICd0ZXN0LW5hbWUnIH0sXG4gICAgKVxuXG4gICAgZXhwZWN0KGFwaS5fY29ubmVjdG9yLmhhbmRsZVJlcXVlc3QpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKVxuICAgIGV4cGVjdChhcGkuX2Nvbm5lY3Rvci5oYW5kbGVSZXF1ZXN0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICdwb3N0JyxcbiAgICAgICcvdXNlcnMvdGVzdC9hcHBsaWNhdGlvbnMnLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgeyBuYW1lOiAndGVzdC1uYW1lJyB9LFxuICAgICAgZmFsc2UsXG4gICAgKVxuICB9KVxuXG4gIGl0KCd0aHJvd3Mgd2hlbiBwYXJhbWV0ZXJzIG1pc21hdGNoJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICBhcGkuQXBwbGljYXRpb25SZWdpc3RyeS5DcmVhdGUoeyAnc29tZS5vdGhlci5wYXJhbSc6ICd0ZXN0JyB9KVxuICAgIH0pLnRvVGhyb3coKVxuICB9KVxuXG4gIGl0KCdyZXNwZWN0cyB0aGUgc2VhcmNoIHF1ZXJ5JywgKCkgPT4ge1xuICAgIGFwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5Lkxpc3QodW5kZWZpbmVkLCB7IGxpbWl0OiAyLCBwYWdlOiAxIH0pXG5cbiAgICBleHBlY3QoYXBpLl9jb25uZWN0b3IuaGFuZGxlUmVxdWVzdCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpXG4gICAgZXhwZWN0KGFwaS5fY29ubmVjdG9yLmhhbmRsZVJlcXVlc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgJ2dldCcsXG4gICAgICAnL2FwcGxpY2F0aW9ucycsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB7IGxpbWl0OiAyLCBwYWdlOiAxIH0sXG4gICAgICBmYWxzZSxcbiAgICApXG4gIH0pXG5cbiAgaXQoJ3NldHMgc3RyZWFtIHZhbHVlIHRvIHRydWUgZm9yIHN0cmVhbWluZyBlbmRwb2ludHMnLCAoKSA9PiB7XG4gICAgYXBpLkFwcGxpY2F0aW9uUmVnaXN0cnkuRXZlbnRzKClcblxuICAgIGV4cGVjdChhcGkuX2Nvbm5lY3Rvci5oYW5kbGVSZXF1ZXN0KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSlcbiAgICBleHBlY3QoYXBpLl9jb25uZWN0b3IuaGFuZGxlUmVxdWVzdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAnZ2V0JyxcbiAgICAgICcvZXZlbnRzJyxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRydWUsXG4gICAgKVxuICB9KVxufSlcbiJdfQ==