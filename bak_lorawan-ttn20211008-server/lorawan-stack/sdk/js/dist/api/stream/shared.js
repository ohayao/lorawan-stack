"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = exports.notify = void 0;

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
var notify = function notify(listener) {
  if (typeof listener === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    listener.apply(void 0, args);
  }
};

exports.notify = notify;
var EVENTS = Object.freeze({
  START: 'start',
  CHUNK: 'chunk',
  ERROR: 'error',
  CLOSE: 'close'
});
exports.EVENTS = EVENTS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvc3RyZWFtL3NoYXJlZC5qcyJdLCJuYW1lcyI6WyJub3RpZnkiLCJsaXN0ZW5lciIsImFyZ3MiLCJFVkVOVFMiLCJPYmplY3QiLCJmcmVlemUiLCJTVEFSVCIsIkNIVU5LIiwiRVJST1IiLCJDTE9TRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sSUFBTUEsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ0MsUUFBRCxFQUF1QjtBQUMzQyxNQUFJLE9BQU9BLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFBQSxzQ0FERkMsSUFDRTtBQURGQSxNQUFBQSxJQUNFO0FBQUE7O0FBQ2xDRCxJQUFBQSxRQUFRLE1BQVIsU0FBWUMsSUFBWjtBQUNEO0FBQ0YsQ0FKTTs7O0FBTUEsSUFBTUMsTUFBTSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUNsQ0MsRUFBQUEsS0FBSyxFQUFFLE9BRDJCO0FBRWxDQyxFQUFBQSxLQUFLLEVBQUUsT0FGMkI7QUFHbENDLEVBQUFBLEtBQUssRUFBRSxPQUgyQjtBQUlsQ0MsRUFBQUEsS0FBSyxFQUFFO0FBSjJCLENBQWQsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuZXhwb3J0IGNvbnN0IG5vdGlmeSA9IChsaXN0ZW5lciwgLi4uYXJncykgPT4ge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGlzdGVuZXIoLi4uYXJncylcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFNUQVJUOiAnc3RhcnQnLFxuICBDSFVOSzogJ2NodW5rJyxcbiAgRVJST1I6ICdlcnJvcicsXG4gIENMT1NFOiAnY2xvc2UnLFxufSlcbiJdfQ==