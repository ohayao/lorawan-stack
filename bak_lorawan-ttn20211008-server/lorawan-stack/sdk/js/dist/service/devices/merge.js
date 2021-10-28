"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _traverse = _interopRequireDefault(require("traverse"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Takes registry responses from different components and merges them into a
 * single entity record.
 *
 * @param {object} parts - An object containing the device record responded from
 * the registry and the paths that were requested from the component.
 * Shape: { device: …, paths: … }.
 * @param {string} base - An optional base device record, that the merge will
 * take as base.
 * @param {object} minimum - Paths that will always be merged for all records.
 * @returns {object} The merged device record.
 */
var _default = function _default(parts) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [['ids'], ['created_at'], ['updated_at']];
  var result = base; // Cycle through all responses.

  var _iterator = _createForOfIteratorHelper(parts),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var part = _step.value;

      var _loop = function _loop() {
        var path = _arr[_i];
        // For each path requested, get the corresponding value of the device
        // record.
        var val = (0, _traverse["default"])(part.device).get(path); // Consider also falsy boolean values, for example.

        var isBoolean = typeof val === 'boolean';

        if (val || isBoolean) {
          if ((0, _typeof2["default"])(val) === 'object') {
            // In case of a whole sub-object being selected, write each leaf node
            // explicitly to achieve a deep merge instead of whole object
            // overrides.
            if (Object.keys(val).length === 0) {
              var currentValue = (0, _traverse["default"])(result).get(path); // Set empty object values only if value is unset, otherwise they might
              // override legitimate values.

              if (typeof currentValue === 'undefined') {
                (0, _traverse["default"])(result).set(path, val);
              }

              return "continue";
            }

            (0, _traverse["default"])(val).forEach(function (e) {
              if (Array.isArray(e) && e.length > 0) {
                (0, _traverse["default"])(result).set(path, val);
                return;
              }

              if (this.isLeaf) {
                // Write the sub object leaf into the result.
                (0, _traverse["default"])(result).set([].concat((0, _toConsumableArray2["default"])(path), (0, _toConsumableArray2["default"])(this.path)), e);
              }
            });
          } else {
            // In case of a simple leaf, just write it into the result.
            (0, _traverse["default"])(result).set(path, val);
          }
        }
      };

      for (var _i = 0, _arr = part.paths ? [].concat((0, _toConsumableArray2["default"])(minimum), (0, _toConsumableArray2["default"])(part.paths)) : []; _i < _arr.length; _i++) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2RldmljZXMvbWVyZ2UuanMiXSwibmFtZXMiOlsicGFydHMiLCJiYXNlIiwibWluaW11bSIsInJlc3VsdCIsInBhcnQiLCJwYXRoIiwidmFsIiwiZGV2aWNlIiwiZ2V0IiwiaXNCb29sZWFuIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImN1cnJlbnRWYWx1ZSIsInNldCIsImZvckVhY2giLCJlIiwiQXJyYXkiLCJpc0FycmF5IiwiaXNMZWFmIiwicGF0aHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFnQkE7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO2VBQ2Usa0JBQUNBLEtBQUQsRUFBMkU7QUFBQSxNQUFuRUMsSUFBbUUsdUVBQTVELEVBQTREO0FBQUEsTUFBeERDLE9BQXdELHVFQUE5QyxDQUFDLENBQUMsS0FBRCxDQUFELEVBQVUsQ0FBQyxZQUFELENBQVYsRUFBMEIsQ0FBQyxZQUFELENBQTFCLENBQThDO0FBQ3hGLE1BQU1DLE1BQU0sR0FBR0YsSUFBZixDQUR3RixDQUd4Rjs7QUFId0YsNkNBSXJFRCxLQUpxRTtBQUFBOztBQUFBO0FBSXhGLHdEQUEwQjtBQUFBLFVBQWZJLElBQWU7O0FBQUE7QUFDbkIsWUFBTUMsSUFBSSxXQUFWO0FBQ0g7QUFDQTtBQUNBLFlBQU1DLEdBQUcsR0FBRywwQkFBU0YsSUFBSSxDQUFDRyxNQUFkLEVBQXNCQyxHQUF0QixDQUEwQkgsSUFBMUIsQ0FBWixDQUpzQixDQU10Qjs7QUFDQSxZQUFNSSxTQUFTLEdBQUcsT0FBT0gsR0FBUCxLQUFlLFNBQWpDOztBQUNBLFlBQUlBLEdBQUcsSUFBSUcsU0FBWCxFQUFzQjtBQUNwQixjQUFJLHlCQUFPSCxHQUFQLE1BQWUsUUFBbkIsRUFBNkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsZ0JBQUlJLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTCxHQUFaLEVBQWlCTSxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxrQkFBTUMsWUFBWSxHQUFHLDBCQUFTVixNQUFULEVBQWlCSyxHQUFqQixDQUFxQkgsSUFBckIsQ0FBckIsQ0FEaUMsQ0FHakM7QUFDQTs7QUFDQSxrQkFBSSxPQUFPUSxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDLDBDQUFTVixNQUFULEVBQWlCVyxHQUFqQixDQUFxQlQsSUFBckIsRUFBMkJDLEdBQTNCO0FBQ0Q7O0FBRUQ7QUFDRDs7QUFFRCxzQ0FBU0EsR0FBVCxFQUFjUyxPQUFkLENBQXNCLFVBQVVDLENBQVYsRUFBYTtBQUNqQyxrQkFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWNGLENBQWQsS0FBb0JBLENBQUMsQ0FBQ0osTUFBRixHQUFXLENBQW5DLEVBQXNDO0FBQ3BDLDBDQUFTVCxNQUFULEVBQWlCVyxHQUFqQixDQUFxQlQsSUFBckIsRUFBMkJDLEdBQTNCO0FBRUE7QUFDRDs7QUFFRCxrQkFBSSxLQUFLYSxNQUFULEVBQWlCO0FBQ2Y7QUFDQSwwQ0FBU2hCLE1BQVQsRUFBaUJXLEdBQWpCLCtDQUF5QlQsSUFBekIsdUNBQWtDLEtBQUtBLElBQXZDLElBQThDVyxDQUE5QztBQUNEO0FBQ0YsYUFYRDtBQVlELFdBNUJELE1BNEJPO0FBQ0w7QUFDQSxzQ0FBU2IsTUFBVCxFQUFpQlcsR0FBakIsQ0FBcUJULElBQXJCLEVBQTJCQyxHQUEzQjtBQUNEO0FBQ0Y7QUF6Q3FCOztBQUN4Qiw4QkFBbUJGLElBQUksQ0FBQ2dCLEtBQUwsaURBQWlCbEIsT0FBakIsdUNBQTZCRSxJQUFJLENBQUNnQixLQUFsQyxLQUEyQyxFQUE5RCwwQkFBa0U7QUFBQTs7QUFBQSxpQ0FxQjFEO0FBb0JQO0FBQ0Y7QUEvQ3VGO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBaUR4RixTQUFPakIsTUFBUDtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAndHJhdmVyc2UnXG5cbi8qKlxuICogVGFrZXMgcmVnaXN0cnkgcmVzcG9uc2VzIGZyb20gZGlmZmVyZW50IGNvbXBvbmVudHMgYW5kIG1lcmdlcyB0aGVtIGludG8gYVxuICogc2luZ2xlIGVudGl0eSByZWNvcmQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhcnRzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRldmljZSByZWNvcmQgcmVzcG9uZGVkIGZyb21cbiAqIHRoZSByZWdpc3RyeSBhbmQgdGhlIHBhdGhzIHRoYXQgd2VyZSByZXF1ZXN0ZWQgZnJvbSB0aGUgY29tcG9uZW50LlxuICogU2hhcGU6IHsgZGV2aWNlOiDigKYsIHBhdGhzOiDigKYgfS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlIC0gQW4gb3B0aW9uYWwgYmFzZSBkZXZpY2UgcmVjb3JkLCB0aGF0IHRoZSBtZXJnZSB3aWxsXG4gKiB0YWtlIGFzIGJhc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gbWluaW11bSAtIFBhdGhzIHRoYXQgd2lsbCBhbHdheXMgYmUgbWVyZ2VkIGZvciBhbGwgcmVjb3Jkcy5cbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBtZXJnZWQgZGV2aWNlIHJlY29yZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKHBhcnRzLCBiYXNlID0ge30sIG1pbmltdW0gPSBbWydpZHMnXSwgWydjcmVhdGVkX2F0J10sIFsndXBkYXRlZF9hdCddXSkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBiYXNlXG5cbiAgLy8gQ3ljbGUgdGhyb3VnaCBhbGwgcmVzcG9uc2VzLlxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGFydC5wYXRocyA/IFsuLi5taW5pbXVtLCAuLi5wYXJ0LnBhdGhzXSA6IFtdKSB7XG4gICAgICAvLyBGb3IgZWFjaCBwYXRoIHJlcXVlc3RlZCwgZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIG9mIHRoZSBkZXZpY2VcbiAgICAgIC8vIHJlY29yZC5cbiAgICAgIGNvbnN0IHZhbCA9IHRyYXZlcnNlKHBhcnQuZGV2aWNlKS5nZXQocGF0aClcblxuICAgICAgLy8gQ29uc2lkZXIgYWxzbyBmYWxzeSBib29sZWFuIHZhbHVlcywgZm9yIGV4YW1wbGUuXG4gICAgICBjb25zdCBpc0Jvb2xlYW4gPSB0eXBlb2YgdmFsID09PSAnYm9vbGVhbidcbiAgICAgIGlmICh2YWwgfHwgaXNCb29sZWFuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIC8vIEluIGNhc2Ugb2YgYSB3aG9sZSBzdWItb2JqZWN0IGJlaW5nIHNlbGVjdGVkLCB3cml0ZSBlYWNoIGxlYWYgbm9kZVxuICAgICAgICAgIC8vIGV4cGxpY2l0bHkgdG8gYWNoaWV2ZSBhIGRlZXAgbWVyZ2UgaW5zdGVhZCBvZiB3aG9sZSBvYmplY3RcbiAgICAgICAgICAvLyBvdmVycmlkZXMuXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0cmF2ZXJzZShyZXN1bHQpLmdldChwYXRoKVxuXG4gICAgICAgICAgICAvLyBTZXQgZW1wdHkgb2JqZWN0IHZhbHVlcyBvbmx5IGlmIHZhbHVlIGlzIHVuc2V0LCBvdGhlcndpc2UgdGhleSBtaWdodFxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgbGVnaXRpbWF0ZSB2YWx1ZXMuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdHJhdmVyc2UocmVzdWx0KS5zZXQocGF0aCwgdmFsKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyYXZlcnNlKHZhbCkuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZSkgJiYgZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHRyYXZlcnNlKHJlc3VsdCkuc2V0KHBhdGgsIHZhbClcblxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMZWFmKSB7XG4gICAgICAgICAgICAgIC8vIFdyaXRlIHRoZSBzdWIgb2JqZWN0IGxlYWYgaW50byB0aGUgcmVzdWx0LlxuICAgICAgICAgICAgICB0cmF2ZXJzZShyZXN1bHQpLnNldChbLi4ucGF0aCwgLi4udGhpcy5wYXRoXSwgZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEluIGNhc2Ugb2YgYSBzaW1wbGUgbGVhZiwganVzdCB3cml0ZSBpdCBpbnRvIHRoZSByZXN1bHQuXG4gICAgICAgICAgdHJhdmVyc2UocmVzdWx0KS5zZXQocGF0aCwgdmFsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIl19