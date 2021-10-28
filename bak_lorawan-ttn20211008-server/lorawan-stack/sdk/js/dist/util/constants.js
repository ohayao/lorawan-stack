"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RATE_LIMIT_RETRIES = exports.AUTHORIZATION_MODES = exports.URI_PREFIX_STACK_COMPONENT_MAP = exports.STACK_COMPONENTS_MAP = exports.STACK_COMPONENTS = void 0;
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
var STACK_COMPONENTS = ['as', 'is', 'ns', 'js', 'gs', 'edtc', 'qrg', 'gcs'];
exports.STACK_COMPONENTS = STACK_COMPONENTS;
var STACK_COMPONENTS_MAP = STACK_COMPONENTS.reduce(function (acc, curr) {
  acc[curr] = curr;
  return acc;
}, {});
exports.STACK_COMPONENTS_MAP = STACK_COMPONENTS_MAP;
var URI_PREFIX_STACK_COMPONENT_MAP = {
  as: 'as',
  ns: 'ns',
  js: 'js',
  gs: 'gs',
  edtc: 'edtc',
  qrg: 'qrg',
  gcs: 'gcs'
};
exports.URI_PREFIX_STACK_COMPONENT_MAP = URI_PREFIX_STACK_COMPONENT_MAP;
var AUTHORIZATION_MODES = Object.freeze({
  KEY: 'key',
  SESSION: 'session'
});
exports.AUTHORIZATION_MODES = AUTHORIZATION_MODES;
var RATE_LIMIT_RETRIES = 5;
exports.RATE_LIMIT_RETRIES = RATE_LIMIT_RETRIES;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2NvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJTVEFDS19DT01QT05FTlRTIiwiU1RBQ0tfQ09NUE9ORU5UU19NQVAiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwiVVJJX1BSRUZJWF9TVEFDS19DT01QT05FTlRfTUFQIiwiYXMiLCJucyIsImpzIiwiZ3MiLCJlZHRjIiwicXJnIiwiZ2NzIiwiQVVUSE9SSVpBVElPTl9NT0RFUyIsIk9iamVjdCIsImZyZWV6ZSIsIktFWSIsIlNFU1NJT04iLCJSQVRFX0xJTUlUX1JFVFJJRVMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sSUFBTUEsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsTUFBL0IsRUFBdUMsS0FBdkMsRUFBOEMsS0FBOUMsQ0FBekI7O0FBRUEsSUFBTUMsb0JBQW9CLEdBQUdELGdCQUFnQixDQUFDRSxNQUFqQixDQUF3QixVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUN6RUQsRUFBQUEsR0FBRyxDQUFDQyxJQUFELENBQUgsR0FBWUEsSUFBWjtBQUNBLFNBQU9ELEdBQVA7QUFDRCxDQUhtQyxFQUdqQyxFQUhpQyxDQUE3Qjs7QUFLQSxJQUFNRSw4QkFBOEIsR0FBRztBQUM1Q0MsRUFBQUEsRUFBRSxFQUFFLElBRHdDO0FBRTVDQyxFQUFBQSxFQUFFLEVBQUUsSUFGd0M7QUFHNUNDLEVBQUFBLEVBQUUsRUFBRSxJQUh3QztBQUk1Q0MsRUFBQUEsRUFBRSxFQUFFLElBSndDO0FBSzVDQyxFQUFBQSxJQUFJLEVBQUUsTUFMc0M7QUFNNUNDLEVBQUFBLEdBQUcsRUFBRSxLQU51QztBQU81Q0MsRUFBQUEsR0FBRyxFQUFFO0FBUHVDLENBQXZDOztBQVVBLElBQU1DLG1CQUFtQixHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUMvQ0MsRUFBQUEsR0FBRyxFQUFFLEtBRDBDO0FBRS9DQyxFQUFBQSxPQUFPLEVBQUU7QUFGc0MsQ0FBZCxDQUE1Qjs7QUFLQSxJQUFNQyxrQkFBa0IsR0FBRyxDQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuZXhwb3J0IGNvbnN0IFNUQUNLX0NPTVBPTkVOVFMgPSBbJ2FzJywgJ2lzJywgJ25zJywgJ2pzJywgJ2dzJywgJ2VkdGMnLCAncXJnJywgJ2djcyddXG5cbmV4cG9ydCBjb25zdCBTVEFDS19DT01QT05FTlRTX01BUCA9IFNUQUNLX0NPTVBPTkVOVFMucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgYWNjW2N1cnJdID0gY3VyclxuICByZXR1cm4gYWNjXG59LCB7fSlcblxuZXhwb3J0IGNvbnN0IFVSSV9QUkVGSVhfU1RBQ0tfQ09NUE9ORU5UX01BUCA9IHtcbiAgYXM6ICdhcycsXG4gIG5zOiAnbnMnLFxuICBqczogJ2pzJyxcbiAgZ3M6ICdncycsXG4gIGVkdGM6ICdlZHRjJyxcbiAgcXJnOiAncXJnJyxcbiAgZ2NzOiAnZ2NzJyxcbn1cblxuZXhwb3J0IGNvbnN0IEFVVEhPUklaQVRJT05fTU9ERVMgPSBPYmplY3QuZnJlZXplKHtcbiAgS0VZOiAna2V5JyxcbiAgU0VTU0lPTjogJ3Nlc3Npb24nLFxufSlcblxuZXhwb3J0IGNvbnN0IFJBVEVfTElNSVRfUkVUUklFUyA9IDVcbiJdfQ==