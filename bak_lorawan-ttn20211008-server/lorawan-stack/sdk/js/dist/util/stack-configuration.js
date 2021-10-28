"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var StackConfiguration = /*#__PURE__*/function () {
  function StackConfiguration(stackConfig) {
    (0, _classCallCheck2["default"])(this, StackConfiguration);

    if (!Boolean(stackConfig)) {
      throw new Error('Stack configuration must be defined');
    }

    var unknownComponents = Object.keys(stackConfig).filter(function (componentName) {
      return !_constants.STACK_COMPONENTS.includes(componentName);
    });

    if (unknownComponents.length > 0) {
      throw new Error("Cannot instantiate stack configuration with unknown components: ".concat(unknownComponents.join(',')));
    }

    this._stackConfig = stackConfig;
  }
  /**
   * Selects the url of a stack component.
   *
   * @param {*} componentName - The abbreviation of the component, e.g. Is for the Identity Server.
   * @returns {?string} - The url of the component or `undefined` if the component is not available.
   */


  (0, _createClass2["default"])(StackConfiguration, [{
    key: "getComponentUrlByName",
    value: function getComponentUrlByName(componentName) {
      return this._stackConfig[componentName];
    }
    /**
     * Selects the hostname of a stack component.
     *
     * @param {*} componentName - The abbreviation of the component, e.g. Is for the Identity Server.
     * @returns {?string} - The hostname of the component address or `undefined` if the component is not available.
     */

  }, {
    key: "getComponentHostByName",
    value: function getComponentHostByName(componentName) {
      try {
        var url = this.getComponentUrlByName(componentName);
        return new URL(url).hostname;
      } catch (error) {// Do not propagate the error, simply return `undefined`.
      }
    }
    /**
     * Checks whether a stack component is available in the configuration.
     *
     * @param {*} componentName - The abbreviation of the component, e.g. Is for
     * the Identity Server.
     * @returns {boolean} - `true` if the component is available in the
     * configuration, `false` otherwise.
     */

  }, {
    key: "isComponentAvailable",
    value: function isComponentAvailable(componentName) {
      var componentUrl = this.getComponentUrlByName(componentName);
      return typeof componentUrl === 'string' && componentUrl.length > 0;
    }
    /**
     * Identity Server hostname getter.
     *
     * @returns {?string} - The hostname of the Identity Server of the stack
     * onfiguration.
     */

  }, {
    key: "isHost",
    get: function get() {
      return this.isComponentAvailable(_constants.STACK_COMPONENTS_MAP.is) && this.getComponentHostByName(_constants.STACK_COMPONENTS_MAP.is);
    }
    /**
     * Network Server hostname getter.
     *
     * @returns {?string} - The hostname of the Network Server of the stack
     * configuration.
     */

  }, {
    key: "nsHost",
    get: function get() {
      return this.isComponentAvailable(_constants.STACK_COMPONENTS_MAP.ns) && this.getComponentHostByName(_constants.STACK_COMPONENTS_MAP.ns);
    }
    /**
     * Application Server hostname getter.
     *
     * @returns {?string} - The hostname of the Application Server of the stack
     * configuration.
     */

  }, {
    key: "asHost",
    get: function get() {
      return this.isComponentAvailable(_constants.STACK_COMPONENTS_MAP.as) && this.getComponentHostByName(_constants.STACK_COMPONENTS_MAP.as);
    }
    /**
     * Join Server hostname getter.
     *
     * @returns {?string} - The hostname of the Join Server of the stack
     * configuration.
     */

  }, {
    key: "jsHost",
    get: function get() {
      return this.isComponentAvailable(_constants.STACK_COMPONENTS_MAP.js) && this.getComponentHostByName(_constants.STACK_COMPONENTS_MAP.js);
    }
    /**
     * Gateway Configuration Server hostname getter.
     *
     * @returns {?string} - The hostname of the Gateway Configuration Server
     * of the stack configuration.
     */

  }, {
    key: "gcsHost",
    get: function get() {
      return this.isComponentAvailable(_constants.STACK_COMPONENTS_MAP.gcs) && this.getComponentHostByName(_constants.STACK_COMPONENTS_MAP.gcs);
    }
    /**
     * Avaible stack components getter.
     *
     * @returns {Array<string>} - A list of available component abbreviations,
     * e.g. [is, as, ns, js].
     */

  }, {
    key: "availableComponents",
    get: function get() {
      return Object.keys(this._stackConfig);
    }
    /**
     * Takes a list of allowed components and only returns components that have
     * distinct base urls. Used to subscribe to event streaming sources when the
     * stack uses multiple hosts.
     *
     * @param {Array<string>} components - A list of abbreviations of stack
     * components to return distinct ones from.
     * @returns {Array<string>} - An array of components that have distinct base
     * urls.
     */

  }, {
    key: "getComponentsWithDistinctBaseUrls",
    value: function getComponentsWithDistinctBaseUrls() {
      var _this = this;

      var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.STACK_COMPONENTS;
      var distinctComponents = components.reduce(function (collection, component) {
        if (Boolean(_this.isComponentAvailable(component)) && !Object.values(collection).includes(_this.getComponentUrlByName(component))) {
          return _objectSpread(_objectSpread({}, collection), {}, (0, _defineProperty2["default"])({}, component, _this.getComponentUrlByName(component)));
        }

        return collection;
      }, {});
      return Object.keys(distinctComponents);
    }
  }]);
  return StackConfiguration;
}();

var _default = StackConfiguration;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3N0YWNrLWNvbmZpZ3VyYXRpb24uanMiXSwibmFtZXMiOlsiU3RhY2tDb25maWd1cmF0aW9uIiwic3RhY2tDb25maWciLCJCb29sZWFuIiwiRXJyb3IiLCJ1bmtub3duQ29tcG9uZW50cyIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJjb21wb25lbnROYW1lIiwiU1RBQ0tfQ09NUE9ORU5UUyIsImluY2x1ZGVzIiwibGVuZ3RoIiwiam9pbiIsIl9zdGFja0NvbmZpZyIsInVybCIsImdldENvbXBvbmVudFVybEJ5TmFtZSIsIlVSTCIsImhvc3RuYW1lIiwiZXJyb3IiLCJjb21wb25lbnRVcmwiLCJpc0NvbXBvbmVudEF2YWlsYWJsZSIsIlNUQUNLX0NPTVBPTkVOVFNfTUFQIiwiaXMiLCJnZXRDb21wb25lbnRIb3N0QnlOYW1lIiwibnMiLCJhcyIsImpzIiwiZ2NzIiwiY29tcG9uZW50cyIsImRpc3RpbmN0Q29tcG9uZW50cyIsInJlZHVjZSIsImNvbGxlY3Rpb24iLCJjb21wb25lbnQiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7SUFFTUEsa0I7QUFDSiw4QkFBWUMsV0FBWixFQUF5QjtBQUFBOztBQUN2QixRQUFJLENBQUNDLE9BQU8sQ0FBQ0QsV0FBRCxDQUFaLEVBQTJCO0FBQ3pCLFlBQU0sSUFBSUUsS0FBSixDQUFVLHFDQUFWLENBQU47QUFDRDs7QUFFRCxRQUFNQyxpQkFBaUIsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlMLFdBQVosRUFBeUJNLE1BQXpCLENBQ3hCLFVBQUFDLGFBQWE7QUFBQSxhQUFJLENBQUNDLDRCQUFpQkMsUUFBakIsQ0FBMEJGLGFBQTFCLENBQUw7QUFBQSxLQURXLENBQTFCOztBQUlBLFFBQUlKLGlCQUFpQixDQUFDTyxNQUFsQixHQUEyQixDQUEvQixFQUFrQztBQUNoQyxZQUFNLElBQUlSLEtBQUosMkVBQytEQyxpQkFBaUIsQ0FBQ1EsSUFBbEIs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LEVBUXhCLEVBUndCLENBQTNCO0FBVUEsYUFBTzFCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZdUIsa0JBQVosQ0FBUDtBQUNEOzs7OztlQUdZN0Isa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAyMCBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IFNUQUNLX0NPTVBPTkVOVFMsIFNUQUNLX0NPTVBPTkVOVFNfTUFQIH0gZnJvbSAnLi9jb25zdGFudHMnXG5cbmNsYXNzIFN0YWNrQ29uZmlndXJhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHN0YWNrQ29uZmlnKSB7XG4gICAgaWYgKCFCb29sZWFuKHN0YWNrQ29uZmlnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGFjayBjb25maWd1cmF0aW9uIG11c3QgYmUgZGVmaW5lZCcpXG4gICAgfVxuXG4gICAgY29uc3QgdW5rbm93bkNvbXBvbmVudHMgPSBPYmplY3Qua2V5cyhzdGFja0NvbmZpZykuZmlsdGVyKFxuICAgICAgY29tcG9uZW50TmFtZSA9PiAhU1RBQ0tfQ09NUE9ORU5UUy5pbmNsdWRlcyhjb21wb25lbnROYW1lKSxcbiAgICApXG5cbiAgICBpZiAodW5rbm93bkNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQ2Fubm90IGluc3RhbnRpYXRlIHN0YWNrIGNvbmZpZ3VyYXRpb24gd2l0aCB1bmtub3duIGNvbXBvbmVudHM6ICR7dW5rbm93bkNvbXBvbmVudHMuam9pbihcbiAgICAgICAgICAnLCcsXG4gICAgICAgICl9YCxcbiAgICAgIClcbiAgICB9XG5cbiAgICB0aGlzLl9zdGFja0NvbmZpZyA9IHN0YWNrQ29uZmlnXG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgdXJsIG9mIGEgc3RhY2sgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudE5hbWUgLSBUaGUgYWJicmV2aWF0aW9uIG9mIHRoZSBjb21wb25lbnQsIGUuZy4gSXMgZm9yIHRoZSBJZGVudGl0eSBTZXJ2ZXIuXG4gICAqIEByZXR1cm5zIHs/c3RyaW5nfSAtIFRoZSB1cmwgb2YgdGhlIGNvbXBvbmVudCBvciBgdW5kZWZpbmVkYCBpZiB0aGUgY29tcG9uZW50IGlzIG5vdCBhdmFpbGFibGUuXG4gICAqL1xuICBnZXRDb21wb25lbnRVcmxCeU5hbWUoY29tcG9uZW50TmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9zdGFja0NvbmZpZ1tjb21wb25lbnROYW1lXVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIGhvc3RuYW1lIG9mIGEgc3RhY2sgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudE5hbWUgLSBUaGUgYWJicmV2aWF0aW9uIG9mIHRoZSBjb21wb25lbnQsIGUuZy4gSXMgZm9yIHRoZSBJZGVudGl0eSBTZXJ2ZXIuXG4gICAqIEByZXR1cm5zIHs/c3RyaW5nfSAtIFRoZSBob3N0bmFtZSBvZiB0aGUgY29tcG9uZW50IGFkZHJlc3Mgb3IgYHVuZGVmaW5lZGAgaWYgdGhlIGNvbXBvbmVudCBpcyBub3QgYXZhaWxhYmxlLlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50SG9zdEJ5TmFtZShjb21wb25lbnROYW1lKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0Q29tcG9uZW50VXJsQnlOYW1lKGNvbXBvbmVudE5hbWUpXG5cbiAgICAgIHJldHVybiBuZXcgVVJMKHVybCkuaG9zdG5hbWVcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gRG8gbm90IHByb3BhZ2F0ZSB0aGUgZXJyb3IsIHNpbXBseSByZXR1cm4gYHVuZGVmaW5lZGAuXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIGEgc3RhY2sgY29tcG9uZW50IGlzIGF2YWlsYWJsZSBpbiB0aGUgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBjb21wb25lbnROYW1lIC0gVGhlIGFiYnJldmlhdGlvbiBvZiB0aGUgY29tcG9uZW50LCBlLmcuIElzIGZvclxuICAgKiB0aGUgSWRlbnRpdHkgU2VydmVyLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBgdHJ1ZWAgaWYgdGhlIGNvbXBvbmVudCBpcyBhdmFpbGFibGUgaW4gdGhlXG4gICAqIGNvbmZpZ3VyYXRpb24sIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgaXNDb21wb25lbnRBdmFpbGFibGUoY29tcG9uZW50TmFtZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudFVybCA9IHRoaXMuZ2V0Q29tcG9uZW50VXJsQnlOYW1lKGNvbXBvbmVudE5hbWUpXG5cbiAgICByZXR1cm4gdHlwZW9mIGNvbXBvbmVudFVybCA9PT0gJ3N0cmluZycgJiYgY29tcG9uZW50VXJsLmxlbmd0aCA+IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBJZGVudGl0eSBTZXJ2ZXIgaG9zdG5hbWUgZ2V0dGVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7P3N0cmluZ30gLSBUaGUgaG9zdG5hbWUgb2YgdGhlIElkZW50aXR5IFNlcnZlciBvZiB0aGUgc3RhY2tcbiAgICogb25maWd1cmF0aW9uLlxuICAgKi9cbiAgZ2V0IGlzSG9zdCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pc0NvbXBvbmVudEF2YWlsYWJsZShTVEFDS19DT01QT05FTlRTX01BUC5pcykgJiZcbiAgICAgIHRoaXMuZ2V0Q29tcG9uZW50SG9zdEJ5TmFtZShTVEFDS19DT01QT05FTlRTX01BUC5pcylcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogTmV0d29yayBTZXJ2ZXIgaG9zdG5hbWUgZ2V0dGVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7P3N0cmluZ30gLSBUaGUgaG9zdG5hbWUgb2YgdGhlIE5ldHdvcmsgU2VydmVyIG9mIHRoZSBzdGFja1xuICAgKiBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgZ2V0IG5zSG9zdCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pc0NvbXBvbmVudEF2YWlsYWJsZShTVEFDS19DT01QT05FTlRTX01BUC5ucykgJiZcbiAgICAgIHRoaXMuZ2V0Q29tcG9uZW50SG9zdEJ5TmFtZShTVEFDS19DT01QT05FTlRTX01BUC5ucylcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQXBwbGljYXRpb24gU2VydmVyIGhvc3RuYW1lIGdldHRlci5cbiAgICpcbiAgICogQHJldHVybnMgez9zdHJpbmd9IC0gVGhlIGhvc3RuYW1lIG9mIHRoZSBBcHBsaWNhdGlvbiBTZXJ2ZXIgb2YgdGhlIHN0YWNrXG4gICAqIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBnZXQgYXNIb3N0KCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmlzQ29tcG9uZW50QXZhaWxhYmxlKFNUQUNLX0NPTVBPTkVOVFNfTUFQLmFzKSAmJlxuICAgICAgdGhpcy5nZXRDb21wb25lbnRIb3N0QnlOYW1lKFNUQUNLX0NPTVBPTkVOVFNfTUFQLmFzKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIFNlcnZlciBob3N0bmFtZSBnZXR0ZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHs/c3RyaW5nfSAtIFRoZSBob3N0bmFtZSBvZiB0aGUgSm9pbiBTZXJ2ZXIgb2YgdGhlIHN0YWNrXG4gICAqIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBnZXQganNIb3N0KCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmlzQ29tcG9uZW50QXZhaWxhYmxlKFNUQUNLX0NPTVBPTkVOVFNfTUFQLmpzKSAmJlxuICAgICAgdGhpcy5nZXRDb21wb25lbnRIb3N0QnlOYW1lKFNUQUNLX0NPTVBPTkVOVFNfTUFQLmpzKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBHYXRld2F5IENvbmZpZ3VyYXRpb24gU2VydmVyIGhvc3RuYW1lIGdldHRlci5cbiAgICpcbiAgICogQHJldHVybnMgez9zdHJpbmd9IC0gVGhlIGhvc3RuYW1lIG9mIHRoZSBHYXRld2F5IENvbmZpZ3VyYXRpb24gU2VydmVyXG4gICAqIG9mIHRoZSBzdGFjayBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgZ2V0IGdjc0hvc3QoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuaXNDb21wb25lbnRBdmFpbGFibGUoU1RBQ0tfQ09NUE9ORU5UU19NQVAuZ2NzKSAmJlxuICAgICAgdGhpcy5nZXRDb21wb25lbnRIb3N0QnlOYW1lKFNUQUNLX0NPTVBPTkVOVFNfTUFQLmdjcylcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQXZhaWJsZSBzdGFjayBjb21wb25lbnRzIGdldHRlci5cbiAgICpcbiAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59IC0gQSBsaXN0IG9mIGF2YWlsYWJsZSBjb21wb25lbnQgYWJicmV2aWF0aW9ucyxcbiAgICogZS5nLiBbaXMsIGFzLCBucywganNdLlxuICAgKi9cbiAgZ2V0IGF2YWlsYWJsZUNvbXBvbmVudHMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3N0YWNrQ29uZmlnKVxuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgbGlzdCBvZiBhbGxvd2VkIGNvbXBvbmVudHMgYW5kIG9ubHkgcmV0dXJucyBjb21wb25lbnRzIHRoYXQgaGF2ZVxuICAgKiBkaXN0aW5jdCBiYXNlIHVybHMuIFVzZWQgdG8gc3Vic2NyaWJlIHRvIGV2ZW50IHN0cmVhbWluZyBzb3VyY2VzIHdoZW4gdGhlXG4gICAqIHN0YWNrIHVzZXMgbXVsdGlwbGUgaG9zdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gY29tcG9uZW50cyAtIEEgbGlzdCBvZiBhYmJyZXZpYXRpb25zIG9mIHN0YWNrXG4gICAqIGNvbXBvbmVudHMgdG8gcmV0dXJuIGRpc3RpbmN0IG9uZXMgZnJvbS5cbiAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59IC0gQW4gYXJyYXkgb2YgY29tcG9uZW50cyB0aGF0IGhhdmUgZGlzdGluY3QgYmFzZVxuICAgKiB1cmxzLlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50c1dpdGhEaXN0aW5jdEJhc2VVcmxzKGNvbXBvbmVudHMgPSBTVEFDS19DT01QT05FTlRTKSB7XG4gICAgY29uc3QgZGlzdGluY3RDb21wb25lbnRzID0gY29tcG9uZW50cy5yZWR1Y2UoKGNvbGxlY3Rpb24sIGNvbXBvbmVudCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBCb29sZWFuKHRoaXMuaXNDb21wb25lbnRBdmFpbGFibGUoY29tcG9uZW50KSkgJiZcbiAgICAgICAgIU9iamVjdC52YWx1ZXMoY29sbGVjdGlvbikuaW5jbHVkZXModGhpcy5nZXRDb21wb25lbnRVcmxCeU5hbWUoY29tcG9uZW50KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4geyAuLi5jb2xsZWN0aW9uLCBbY29tcG9uZW50XTogdGhpcy5nZXRDb21wb25lbnRVcmxCeU5hbWUoY29tcG9uZW50KSB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sbGVjdGlvblxuICAgIH0sIHt9KVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRpc3RpbmN0Q29tcG9uZW50cylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFja0NvbmZpZ3VyYXRpb25cbiJdfQ==