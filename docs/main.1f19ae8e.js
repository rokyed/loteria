// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/wrench-set/lib/classes/Element.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @kind class
 * @name Element
 * @public
 * @param {Object} config
 * @param {string} [config.elementType="div"] type of node we are going to be
 * @param {string} config.className class names the self element will take
 * @param {string} config.innerHTML HTML that will be applied when element it's initialized
 * @param {DOMElement} [config.renderTo=null] element on which to render, if not provided, you have to call renderTo manually to render on element
 * @param {boolean} [config.xAutoInitElement=false] if true initializeElement won't be called
 * @returns {Object} this
 * @example
 *
 * import wrenchSet from 'wrench-set'
 *
 * class MyClass extends wrenchSet.Element {
 *     constructor() {
 *         super({
 *             className: "my-CSS-Class",
 *             elementType: "span",
 *             innerHTML: "Hi it's me :) <b class='my-button'><i>XOX</i></b>",
 *             renderTo: document.body
 *         })
 *
 *         this.on('click', this.onClick.bind(this))
 *     }
 *
 *     onClick (e) {
 *         if (e.getTarget('.my-button'))
 *             console.log('do something')
 *     }
 * }
 *
 * let myInstance = new MyClass()
 */
var Element = function () {
	function Element(config) {
		_classCallCheck(this, Element);

		this.initialConfig = config || {};
		this._____LISTENERS = [];

		if (!this.initialConfig.xAutoInitElement) this.initializeElement();

		return this;
	}
	/**
  * initializes the DOMElement and renders it to the renderTo config provided
  * @public
  * @returns {undefined} initializes element and sets it's default configs
  */


	_createClass(Element, [{
		key: 'initializeElement',
		value: function initializeElement() {
			this._____ELEMENT = document.createElement(this.initialConfig.elementType || 'div');
			this._____ELEMENT.className = this.initialConfig.className || '';
			this._____ELEMENT.innerHTML = this.initialConfig.innerHTML || '';

			if (this.initialConfig.renderTo) this.renderTo(this.initialConfig.renderTo);
		}

		/**
   * returns the DOMElement for direct access or if querySelector is passed will return the matching child of the DOMElement
   * @public
   * @param {string} [querySelector=null] css selector to get the child of the element, if not provided, it will return the main element
   * @returns {DOMElement}
   */

	}, {
		key: 'getElement',
		value: function getElement(querySelector) {
			if (querySelector) return this._____ELEMENT.querySelector(querySelector);

			return this._____ELEMENT;
		}

		/**
   * @param {DOMElement} domElement target on which we appendChild
   * @returns {undefined} renders the element on whaterver element provided
   */

	}, {
		key: 'renderTo',
		value: function renderTo(domElement) {
			domElement.appendChild(this._____ELEMENT);
		}

		/**
   * it's a handle that wraps the event in order to add functionalities like e.getTarget(selector)
   * @private
   * @param {Event} event
   * @returns {undefined} returns whatever the callback returns
   */

	}, {
		key: '_____EVT_HANDLE',
		value: function _____EVT_HANDLE(event) {
			var listenerCompound = this._____GET_EVENT_LISTENER(event.type);
			var listener = listenerCompound.listener;

			event.getTarget = function (selector) {
				var maximumDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

				var target = event.target;
				var currentDepth = 0;

				while (true) {
					if (currentDepth >= maximumDepth) {
						target = null;
						break;
					}

					var parent = target.parentNode;
					var targetInList = parent && parent.querySelector && parent.querySelectorAll(selector) || [];
					var isOurTarget = false;

					for (var i = 0; i < targetInList.length; i++) {
						if (targetInList[i] === target) {
							isOurTarget = true;
							break;
						}
					}

					if (isOurTarget) {
						break;
					} else if (!parent) {
						target = null;
						break;
					} else {
						target = parent;
					}

					currentDepth++;
				}

				return target;
			};

			var response = listener.callback.apply(this, arguments);

			delete event.getTarget;

			return response;
		}

		/**
   * fetches event listener index and reference by the name
   * @private
   * @param {string} eventName
   * @returns {Object|boolean}
   */

	}, {
		key: '_____GET_EVENT_LISTENER',
		value: function _____GET_EVENT_LISTENER(eventName) {
			var listeners = this._____LISTENERS;
			var returnObj = {};

			for (var i = 0; i < listeners.length; i++) {
				if (eventName == listeners[i].eventName) {
					returnObj.listener = listeners[i];
					returnObj.index = i;
				}
			}

			if (!returnObj.listener) return false;

			return returnObj;
		}

		/**
   * detaches all the event listeners attached to the element
   * @private
   * @returns {undefined}
   */

	}, {
		key: '_____DETACH_ALL_LISTENERS',
		value: function _____DETACH_ALL_LISTENERS() {
			var listeners = this._____LISTENERS;

			for (var i = 0; i < listeners.length; i++) {
				var _ELEMENT;

				var listener = listeners[i];

				(_ELEMENT = this._____ELEMENT).removeEventListener.apply(_ELEMENT, [listener.eventName, listener.bindedHandle].concat(_toConsumableArray(listener.stdArgs)));
			}
		}

		/**
   * attaches event listener to element, it wraps the event and adds functionalities
   * @public
   * @param {string} eventName e.g. "click", "touchstart" all the default events
   * @param {Function} callback your callback where you handle your logic **check event.* for more details on the event parameter in the callback**
   * @param {Array} [stdArgs=[]] all the standard arguments that follow after callback
   * @returns {undefined}
   */

	}, {
		key: 'on',
		value: function on(eventName, callback, stdArgs) {
			var _ELEMENT2;

			stdArgs = stdArgs || [];

			var eventHandler = {
				eventName: eventName,
				callback: callback,
				stdArgs: stdArgs,
				bindedHandle: this._____EVT_HANDLE.bind(this)
			};
			(_ELEMENT2 = this._____ELEMENT).addEventListener.apply(_ELEMENT2, [eventName, eventHandler.bindedHandle].concat(_toConsumableArray(stdArgs)));
			this._____LISTENERS.push(eventHandler);
		}

		/**
   * detaches event listener from element
   * @public
   * @param {string} eventName e.g. "click", "touchstart" all the default events
   * @returns {undefined}
   */

	}, {
		key: 'un',
		value: function un(eventName) {
			var _ELEMENT3;

			var listeners = this._____LISTENERS;
			var listenerData = this._____GET_EVENT_LISTENER(eventName);

			if (!listenerData) return;

			var listener = listenerData.listener;

			(_ELEMENT3 = this._____ELEMENT).removeEventListener.apply(_ELEMENT3, [listener.eventName, listener.bindedHandle].concat(_toConsumableArray(listener.stdArgs)));

			delete listener.bindedHandle;

			this._____LISTENERS.splice(listenerData.index, 1);
		}

		/**
   * if destroy() was called it will return true
   * @public
   * @returns {boolean}
   */

	}, {
		key: 'isDestroyed',
		value: function isDestroyed() {
			return !!this._____DESTROYED;
		}

		/**
   * handles the destruction/removal of listeners and the internal element
   * adds destroyed propery
   * @public
   * @returns {undefined}
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			if (this._____DESTROYED) return;

			this._____DETACH_ALL_LISTENERS();

			var parentNode = this._____ELEMENT.parentNode;

			if (parentNode) parentNode.removeChild(this._____ELEMENT);

			delete this._____ELEMENT;

			this._____DESTROYED = true;
		}
	}]);

	return Element;
}();

/**
 * similar to DOMElement.querySelector but instead of propagating from parent to child, it propagates from child to parent
 *
 * @typedef {Function} event.getTarget
 * @param {string} selector Valid CSS selector
 * @returns {DOMElement|null}
 * @example
 *
 * ...
 * this.on('mousedown', this.onMouseDown.bind(this))
 * ...
 *
 * ...
 * onMouseDown(e) {
 *     let cssSelector = '.cls-x'
 *     let myButton = e.getTarget(cssSelector)
 *
 *     if (myButton)
 *         myButton.classList.add('pressed')
 * }
 * ...
 */


exports.default = Element;
},{}],"../node_modules/wrench-set/lib/index.js":[function(require,module,exports) {
'use strict';

var _Element = require('./classes/Element.js');

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Namespace} wrench-set
 * @property {Class} Element
 */
module.exports = {
  Element: _Element2.default

  /**
   *
   * To install:
   * ```bash
   * npm install --save wrench-set
   * ```
   *
   * If you have any issues, features, requests, drop them in the issues section.
   *
   * Please give enough info, so I can replicate, in case of issues.
   *
   * @typedef {Info} Info
   */

};
},{"./classes/Element.js":"../node_modules/wrench-set/lib/classes/Element.js"}],"title.scss":[function(require,module,exports) {
module.exports = {
  "title": "_title_1ofn7_1"
};
},{}],"title.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrenchSet = require("wrench-set");

var _title = _interopRequireDefault(require("./title.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (_typeof(call) === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass)); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_Element) {
  _inherits(Title, _Element);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, _Element.call(this, {
      innerHTML: "Loteria!!",
      className: _title.default.title,
      renderTo: document.body
    }));
  }

  return Title;
}(_wrenchSet.Element);

var _default = Title;
exports.default = _default;
},{"wrench-set":"../node_modules/wrench-set/lib/index.js","./title.scss":"title.scss"}],"resources/1.jpg":[function(require,module,exports) {
module.exports = "/1.dc855c80.jpg";
},{}],"resources/2.jpg":[function(require,module,exports) {
module.exports = "/2.69da44a4.jpg";
},{}],"resources/3.jpg":[function(require,module,exports) {
module.exports = "/3.4a271210.jpg";
},{}],"resources/4.jpg":[function(require,module,exports) {
module.exports = "/4.eeb54397.jpg";
},{}],"resources/5.jpg":[function(require,module,exports) {
module.exports = "/5.02e9209d.jpg";
},{}],"resources/6.jpg":[function(require,module,exports) {
module.exports = "/6.c5816802.jpg";
},{}],"resources/7.jpg":[function(require,module,exports) {
module.exports = "/7.2dc05a41.jpg";
},{}],"resources/8.jpg":[function(require,module,exports) {
module.exports = "/8.97a9e15f.jpg";
},{}],"resources/9.jpg":[function(require,module,exports) {
module.exports = "/9.550aa9aa.jpg";
},{}],"resources/10.jpg":[function(require,module,exports) {
module.exports = "/10.22524ce6.jpg";
},{}],"resources/11.jpg":[function(require,module,exports) {
module.exports = "/11.6895caf2.jpg";
},{}],"resources/12.jpg":[function(require,module,exports) {
module.exports = "/12.63cd148a.jpg";
},{}],"resources/13.jpg":[function(require,module,exports) {
module.exports = "/13.6814a8ef.jpg";
},{}],"resources/14.jpg":[function(require,module,exports) {
module.exports = "/14.2e1a7675.jpg";
},{}],"resources/15.jpg":[function(require,module,exports) {
module.exports = "/15.e5295721.jpg";
},{}],"resources/16.jpg":[function(require,module,exports) {
module.exports = "/16.4a8774a7.jpg";
},{}],"resources/17.jpg":[function(require,module,exports) {
module.exports = "/17.3f74a384.jpg";
},{}],"resources/18.jpg":[function(require,module,exports) {
module.exports = "/18.c22241fb.jpg";
},{}],"resources/19.jpg":[function(require,module,exports) {
module.exports = "/19.37ebc3e8.jpg";
},{}],"resources/20.jpg":[function(require,module,exports) {
module.exports = "/20.e926879f.jpg";
},{}],"resources/21.jpg":[function(require,module,exports) {
module.exports = "/21.2d321358.jpg";
},{}],"resources/22.jpg":[function(require,module,exports) {
module.exports = "/22.d5960d26.jpg";
},{}],"resources/23.jpg":[function(require,module,exports) {
module.exports = "/23.c5772a35.jpg";
},{}],"resources/24.jpg":[function(require,module,exports) {
module.exports = "/24.d07f225c.jpg";
},{}],"resources/25.jpg":[function(require,module,exports) {
module.exports = "/25.2630f908.jpg";
},{}],"resources/26.jpg":[function(require,module,exports) {
module.exports = "/26.42bfe431.jpg";
},{}],"resources/27.jpg":[function(require,module,exports) {
module.exports = "/27.4ce1ae36.jpg";
},{}],"resources/28.jpg":[function(require,module,exports) {
module.exports = "/28.9bbdb8c5.jpg";
},{}],"resources/29.jpg":[function(require,module,exports) {
module.exports = "/29.6c96fe33.jpg";
},{}],"resources/30.jpg":[function(require,module,exports) {
module.exports = "/30.e4c3075e.jpg";
},{}],"resources/31.jpg":[function(require,module,exports) {
module.exports = "/31.5e3da1ec.jpg";
},{}],"resources/32.jpg":[function(require,module,exports) {
module.exports = "/32.0ba6b363.jpg";
},{}],"resources/33.jpg":[function(require,module,exports) {
module.exports = "/33.bef239c9.jpg";
},{}],"resources/34.jpg":[function(require,module,exports) {
module.exports = "/34.68d352f5.jpg";
},{}],"resources/35.jpg":[function(require,module,exports) {
module.exports = "/35.01bb00a2.jpg";
},{}],"resources/36.jpg":[function(require,module,exports) {
module.exports = "/36.394cb829.jpg";
},{}],"resources/37.jpg":[function(require,module,exports) {
module.exports = "/37.b43d8ed1.jpg";
},{}],"resources/38.jpg":[function(require,module,exports) {
module.exports = "/38.82891bb4.jpg";
},{}],"resources/39.jpg":[function(require,module,exports) {
module.exports = "/39.623c49ea.jpg";
},{}],"resources/40.jpg":[function(require,module,exports) {
module.exports = "/40.40929a4c.jpg";
},{}],"resources/41.jpg":[function(require,module,exports) {
module.exports = "/41.2c22b4e6.jpg";
},{}],"resources/42.jpg":[function(require,module,exports) {
module.exports = "/42.7a3584b2.jpg";
},{}],"resources/43.jpg":[function(require,module,exports) {
module.exports = "/43.5948a7f2.jpg";
},{}],"resources/44.jpg":[function(require,module,exports) {
module.exports = "/44.e5d1d25f.jpg";
},{}],"resources/45.jpg":[function(require,module,exports) {
module.exports = "/45.aabd8d66.jpg";
},{}],"resources/46.jpg":[function(require,module,exports) {
module.exports = "/46.0e47a05c.jpg";
},{}],"resources/47.jpg":[function(require,module,exports) {
module.exports = "/47.40236a42.jpg";
},{}],"resources/48.jpg":[function(require,module,exports) {
module.exports = "/48.934d2f08.jpg";
},{}],"resources/49.jpg":[function(require,module,exports) {
module.exports = "/49.ab806798.jpg";
},{}],"resources/50.jpg":[function(require,module,exports) {
module.exports = "/50.15fee031.jpg";
},{}],"resources/51.jpg":[function(require,module,exports) {
module.exports = "/51.f55bf956.jpg";
},{}],"resources/52.jpg":[function(require,module,exports) {
module.exports = "/52.d5a5c7cc.jpg";
},{}],"resources/53.jpg":[function(require,module,exports) {
module.exports = "/53.c2681bb3.jpg";
},{}],"resources/54.jpg":[function(require,module,exports) {
module.exports = "/54.4b1966fc.jpg";
},{}],"data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireDefault(require("./resources/1.jpg"));

var _2 = _interopRequireDefault(require("./resources/2.jpg"));

var _3 = _interopRequireDefault(require("./resources/3.jpg"));

var _4 = _interopRequireDefault(require("./resources/4.jpg"));

var _5 = _interopRequireDefault(require("./resources/5.jpg"));

var _6 = _interopRequireDefault(require("./resources/6.jpg"));

var _7 = _interopRequireDefault(require("./resources/7.jpg"));

var _8 = _interopRequireDefault(require("./resources/8.jpg"));

var _9 = _interopRequireDefault(require("./resources/9.jpg"));

var _10 = _interopRequireDefault(require("./resources/10.jpg"));

var _11 = _interopRequireDefault(require("./resources/11.jpg"));

var _12 = _interopRequireDefault(require("./resources/12.jpg"));

var _13 = _interopRequireDefault(require("./resources/13.jpg"));

var _14 = _interopRequireDefault(require("./resources/14.jpg"));

var _15 = _interopRequireDefault(require("./resources/15.jpg"));

var _16 = _interopRequireDefault(require("./resources/16.jpg"));

var _17 = _interopRequireDefault(require("./resources/17.jpg"));

var _18 = _interopRequireDefault(require("./resources/18.jpg"));

var _19 = _interopRequireDefault(require("./resources/19.jpg"));

var _20 = _interopRequireDefault(require("./resources/20.jpg"));

var _21 = _interopRequireDefault(require("./resources/21.jpg"));

var _22 = _interopRequireDefault(require("./resources/22.jpg"));

var _23 = _interopRequireDefault(require("./resources/23.jpg"));

var _24 = _interopRequireDefault(require("./resources/24.jpg"));

var _25 = _interopRequireDefault(require("./resources/25.jpg"));

var _26 = _interopRequireDefault(require("./resources/26.jpg"));

var _27 = _interopRequireDefault(require("./resources/27.jpg"));

var _28 = _interopRequireDefault(require("./resources/28.jpg"));

var _29 = _interopRequireDefault(require("./resources/29.jpg"));

var _30 = _interopRequireDefault(require("./resources/30.jpg"));

var _31 = _interopRequireDefault(require("./resources/31.jpg"));

var _32 = _interopRequireDefault(require("./resources/32.jpg"));

var _33 = _interopRequireDefault(require("./resources/33.jpg"));

var _34 = _interopRequireDefault(require("./resources/34.jpg"));

var _35 = _interopRequireDefault(require("./resources/35.jpg"));

var _36 = _interopRequireDefault(require("./resources/36.jpg"));

var _37 = _interopRequireDefault(require("./resources/37.jpg"));

var _38 = _interopRequireDefault(require("./resources/38.jpg"));

var _39 = _interopRequireDefault(require("./resources/39.jpg"));

var _40 = _interopRequireDefault(require("./resources/40.jpg"));

var _41 = _interopRequireDefault(require("./resources/41.jpg"));

var _42 = _interopRequireDefault(require("./resources/42.jpg"));

var _43 = _interopRequireDefault(require("./resources/43.jpg"));

var _44 = _interopRequireDefault(require("./resources/44.jpg"));

var _45 = _interopRequireDefault(require("./resources/45.jpg"));

var _46 = _interopRequireDefault(require("./resources/46.jpg"));

var _47 = _interopRequireDefault(require("./resources/47.jpg"));

var _48 = _interopRequireDefault(require("./resources/48.jpg"));

var _49 = _interopRequireDefault(require("./resources/49.jpg"));

var _50 = _interopRequireDefault(require("./resources/50.jpg"));

var _51 = _interopRequireDefault(require("./resources/51.jpg"));

var _52 = _interopRequireDefault(require("./resources/52.jpg"));

var _53 = _interopRequireDefault(require("./resources/53.jpg"));

var _54 = _interopRequireDefault(require("./resources/54.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  CARDS: {
    1: 'El gallo',
    2: 'El diablito',
    3: 'La dama',
    4: 'El catrín',
    5: 'El paraguas',
    6: 'La sirena',
    7: 'La escalera',
    8: 'La botella',
    9: 'El barril',
    10: 'El árbol',
    11: 'El melón',
    12: 'El valiente',
    13: 'El gorrito',
    14: 'La muerte',
    15: 'La pera',
    16: 'La bandera',
    17: 'El bandolón',
    18: 'El violoncello',
    19: 'La garza',
    20: 'El pájaro',
    21: 'La mano',
    22: 'La bota',
    23: 'La luna',
    24: 'El cotorro',
    25: 'El borracho',
    26: 'El negrito',
    27: 'El corazón',
    28: 'La sandía',
    29: 'El tambor',
    30: 'El camarón',
    31: 'Las jaras',
    32: 'El músico',
    33: 'La araña',
    34: 'El soldado',
    35: 'La estrella',
    36: 'El cazo',
    37: 'El mundo',
    38: 'El Apache',
    39: 'El nopal',
    40: 'El alacrán',
    41: 'La rosa',
    42: 'La calavera',
    43: 'La campana',
    44: 'El cantarito',
    45: 'El venado',
    46: 'El Sol',
    47: 'La corona',
    48: 'La chalupa',
    49: 'El pino',
    50: 'El pescado',
    51: 'La palma',
    52: 'La maceta',
    53: 'El arpa',
    54: 'La rana'
  },
  IMAGES: {
    1: _.default,
    2: _2.default,
    3: _3.default,
    4: _4.default,
    5: _5.default,
    6: _6.default,
    7: _7.default,
    8: _8.default,
    9: _9.default,
    10: _10.default,
    11: _11.default,
    12: _12.default,
    13: _13.default,
    14: _14.default,
    15: _15.default,
    16: _16.default,
    17: _17.default,
    18: _18.default,
    19: _19.default,
    20: _20.default,
    21: _21.default,
    22: _22.default,
    23: _23.default,
    24: _24.default,
    25: _25.default,
    26: _26.default,
    27: _27.default,
    28: _28.default,
    29: _29.default,
    30: _30.default,
    31: _31.default,
    32: _32.default,
    33: _33.default,
    34: _34.default,
    35: _35.default,
    36: _36.default,
    37: _37.default,
    38: _38.default,
    39: _39.default,
    40: _40.default,
    41: _41.default,
    42: _42.default,
    43: _43.default,
    44: _44.default,
    45: _45.default,
    46: _46.default,
    47: _47.default,
    48: _48.default,
    49: _49.default,
    50: _50.default,
    51: _51.default,
    52: _52.default,
    53: _53.default,
    54: _54.default
  }
};
exports.default = _default;
},{"./resources/1.jpg":"resources/1.jpg","./resources/2.jpg":"resources/2.jpg","./resources/3.jpg":"resources/3.jpg","./resources/4.jpg":"resources/4.jpg","./resources/5.jpg":"resources/5.jpg","./resources/6.jpg":"resources/6.jpg","./resources/7.jpg":"resources/7.jpg","./resources/8.jpg":"resources/8.jpg","./resources/9.jpg":"resources/9.jpg","./resources/10.jpg":"resources/10.jpg","./resources/11.jpg":"resources/11.jpg","./resources/12.jpg":"resources/12.jpg","./resources/13.jpg":"resources/13.jpg","./resources/14.jpg":"resources/14.jpg","./resources/15.jpg":"resources/15.jpg","./resources/16.jpg":"resources/16.jpg","./resources/17.jpg":"resources/17.jpg","./resources/18.jpg":"resources/18.jpg","./resources/19.jpg":"resources/19.jpg","./resources/20.jpg":"resources/20.jpg","./resources/21.jpg":"resources/21.jpg","./resources/22.jpg":"resources/22.jpg","./resources/23.jpg":"resources/23.jpg","./resources/24.jpg":"resources/24.jpg","./resources/25.jpg":"resources/25.jpg","./resources/26.jpg":"resources/26.jpg","./resources/27.jpg":"resources/27.jpg","./resources/28.jpg":"resources/28.jpg","./resources/29.jpg":"resources/29.jpg","./resources/30.jpg":"resources/30.jpg","./resources/31.jpg":"resources/31.jpg","./resources/32.jpg":"resources/32.jpg","./resources/33.jpg":"resources/33.jpg","./resources/34.jpg":"resources/34.jpg","./resources/35.jpg":"resources/35.jpg","./resources/36.jpg":"resources/36.jpg","./resources/37.jpg":"resources/37.jpg","./resources/38.jpg":"resources/38.jpg","./resources/39.jpg":"resources/39.jpg","./resources/40.jpg":"resources/40.jpg","./resources/41.jpg":"resources/41.jpg","./resources/42.jpg":"resources/42.jpg","./resources/43.jpg":"resources/43.jpg","./resources/44.jpg":"resources/44.jpg","./resources/45.jpg":"resources/45.jpg","./resources/46.jpg":"resources/46.jpg","./resources/47.jpg":"resources/47.jpg","./resources/48.jpg":"resources/48.jpg","./resources/49.jpg":"resources/49.jpg","./resources/50.jpg":"resources/50.jpg","./resources/51.jpg":"resources/51.jpg","./resources/52.jpg":"resources/52.jpg","./resources/53.jpg":"resources/53.jpg","./resources/54.jpg":"resources/54.jpg"}],"deck.scss":[function(require,module,exports) {
module.exports = {
  "deck": "_deck_1dwoj_1"
};
},{}],"deck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrenchSet = require("wrench-set");

var _data = _interopRequireDefault(require("./data.js"));

var _deck = _interopRequireDefault(require("./deck.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (_typeof(call) === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass)); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Deck = function (_Element) {
  _inherits(Deck, _Element);

  function Deck(config) {
    _classCallCheck(this, Deck);

    var _this = _possibleConstructorReturn(this, _Element.call(this, {
      renderTo: document.body,
      className: _deck.default.deck,
      innerHTML: "\n\t\t\t\t<div data-type=\"showcase\">\n\t\t\t\t</div>\n\t\t\t\t<div data-type=\"deck\">\n\t\t\t\t</div>\n\t\t\t"
    }));

    _this.game = config.game;
    _this.data = _data.default;
    _this.interval = null;
    _this.iterator = 0;
    _this.increment = 1;
    _this.iteratorTarget = 1;
    _this.maxIteratorTarget = 60;
    _this.iteratorInitials = {
      iterator: 0,
      increment: 4,
      iteratorTarget: 1
    };
    return _this;
  }

  Deck.prototype.update = function update(spentCards, deck) {
    this.fillSpent(spentCards);
    if (spentCards.length > 0) this.animate(spentCards[spentCards.length - 1], deck);else this.showcase(false);
  };

  Deck.prototype.animate = function animate(targetId, deck) {
    var _this2 = this;

    deck = JSON.parse(JSON.stringify(deck));
    deck.push(targetId);
    this.iterator = this.iteratorInitials.iterator;
    this.increment = this.iteratorInitials.increment;
    this.iteratorTarget = this.iteratorInitials.iteratorTarget;
    clearInterval(this.interval);
    this.game.toggleButtons(false);
    this.interval = setInterval(function () {
      if (_this2.iteratorTarget <= _this2.iterator) {
        _this2.iterator = 0;
        _this2.iteratorTarget += _this2.increment;
        var rand = Math.floor(Math.random(Date.now()) * deck.length);
        requestAnimationFrame(function () {
          _this2.showcase(deck[rand]);
        });
      }

      _this2.iterator++;

      if (_this2.iteratorTarget > _this2.maxIteratorTarget || deck.length == 1) {
        requestAnimationFrame(function () {
          _this2.showcase(targetId);
        });
        clearInterval(_this2.interval);

        _this2.game.toggleButtons(true);
      }
    }, 1);
  };

  Deck.prototype.showcase = function showcase(id) {
    var el = this.getElement('[data-type="showcase"]');
    if (id === false) el.innerHTML = '';else el.innerHTML = this.generateCard(id);
  };

  Deck.prototype.fillSpent = function fillSpent(spentCards) {
    var html = '';

    for (var i = spentCards.length - 2; i >= 0; i--) {
      html += this.generateCard(spentCards[i]);
    }

    this.getElement('[data-type="deck"]').innerHTML = html;
  };

  Deck.prototype.generateCard = function generateCard(id) {
    if (_data.default.CARDS[id] === undefined) console.log(id);
    return "\n\t\t\t<div data-card=\"".concat(id, "\">\n\t\t\t\t<div data-label=\"true\">").concat(_data.default.CARDS[id], "</div>\n\t\t\t\t<div data-image=\"true\" style=\"background-image: url('").concat(_data.default.IMAGES[id], "')\"></div>\n\t\t\t</div>\n\t\t");
  };

  return Deck;
}(_wrenchSet.Element);

var _default = Deck;
exports.default = _default;
},{"wrench-set":"../node_modules/wrench-set/lib/index.js","./data.js":"data.js","./deck.scss":"deck.scss"}],"bar.scss":[function(require,module,exports) {
module.exports = {
  "bar": "_bar_18w1z_1"
};
},{}],"bar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrenchSet = require("wrench-set");

var _bar = _interopRequireDefault(require("./bar.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (_typeof(call) === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass)); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bar = function (_Element) {
  _inherits(Bar, _Element);

  function Bar(config) {
    _classCallCheck(this, Bar);

    var _this = _possibleConstructorReturn(this, _Element.call(this, {
      renderTo: document.body,
      className: _bar.default.bar,
      innerHTML: "\n\t\t\t\t<div data-button=\"play\">Jugar</div>\n\t\t\t\t<div data-button=\"reset\">Reinitiar</div>\n\t\t\t"
    }));

    _this.game = config.game;

    _this.on('click', _this.onClick);

    return _this;
  }

  Bar.prototype.togglePlayButton = function togglePlayButton(bEn) {
    var el = this.getElement('[data-button="play"]');
    if (bEn) el.removeAttribute('data-disabled');else el.setAttribute('data-disabled', 'true');
  };

  Bar.prototype.toggleButtons = function toggleButtons(bEn) {
    var el = this.getElement();
    var buttons = el.querySelectorAll('[data-button]');

    for (var i = 0; i < buttons.length; i++) {
      if (bEn) buttons[i].removeAttribute('data-disabled');else buttons[i].setAttribute('data-disabled', 'true');
    }
  };

  Bar.prototype.onClick = function onClick(e) {
    var target = e.getTarget('[data-button]');
    if (e.getTarget('[data-disabled]')) return;
    if (!target) return;
    var action = target.getAttribute('data-button');

    switch (action) {
      case 'play':
        this.game.play();
        break;

      case 'reset':
        this.game.reset();
        break;
    }
  };

  return Bar;
}(_wrenchSet.Element);

var _default = Bar;
exports.default = _default;
},{"wrench-set":"../node_modules/wrench-set/lib/index.js","./bar.scss":"bar.scss"}],"main.scss":[function(require,module,exports) {
module.exports = {};
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _title = _interopRequireDefault(require("./title.js"));

var _deck = _interopRequireDefault(require("./deck.js"));

var _bar = _interopRequireDefault(require("./bar.js"));

require("./main.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.title = new _title.default({});
    this.deckView = new _deck.default({
      game: this
    });
    this.bar = new _bar.default({
      game: this
    });
    this.reset();
  }

  Game.prototype.togglePlayButton = function togglePlayButton(bEn) {
    this.bar.togglePlayButton(bEn);
  };

  Game.prototype.toggleButtons = function toggleButtons(bEn) {
    this.bar.toggleButtons(bEn);
  };

  Game.prototype.prepareDeck = function prepareDeck() {
    this.deck = [];

    for (var i = 1; i <= 54; i++) {
      this.deck.push(i);
    }
  };

  Game.prototype.moveCardFromDeck = function moveCardFromDeck(index) {
    if (this.deck.length == 0) return;
    this.spentCards.push(this.deck[index]);
    this.deck.splice(index, 1);
  };

  Game.prototype.reset = function reset() {
    this.spentCards = [];
    this.prepareDeck();
    this.deckView.update(this.spentCards);
    this.toggleButtons(true);
  };

  Game.prototype.play = function play() {
    var rand = Math.floor(Math.random(Date.now()) * this.deck.length);
    this.moveCardFromDeck(rand);
    this.deckView.update(this.spentCards, this.deck);
  };

  return Game;
}();

window.game = new Game();
},{"./title.js":"title.js","./deck.js":"deck.js","./bar.js":"bar.js","./main.scss":"main.scss"}]},{},["main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.map