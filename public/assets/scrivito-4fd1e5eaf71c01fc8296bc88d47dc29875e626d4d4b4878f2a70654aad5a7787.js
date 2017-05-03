/******/
 (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 129);
/******/ })
/************************************************************************/
/******/ ({

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var scrivitoUi = void 0;

  if (window.parent !== window) {
    scrivitoUi = window.parent.scrivito;
    if (scrivitoUi) {
      // In an iframe and parent window contains the UI: in UI mode.
      var cmsDocument = scrivitoUi.cms_element.from_dom_element(document);
      cmsDocument.installPublicApi();
      cmsDocument.addAppExtensions();

      if (window.scrivito.AppAdapter) {
        cmsDocument.setAppAdapter(window.scrivito.AppAdapter);
      }

      // wait for app to be fully loaded
      document.addEventListener('DOMContentLoaded', function () {
        // wait for UI to be fully loaded
        scrivitoUi.on('load', function () {
          cmsDocument.assertUserLoggedIn();
          cmsDocument.connect();
        });
      });
    }
  }

  if (window.scrivito && window.scrivito.client) {
    scrivito.client.init({ scrivitoUi: scrivitoUi, realmContext: window.scrivito });
    document.addEventListener('DOMContentLoaded', function () {
      return scrivito.BrowserLocation.init();
    });
  }

  // If the SDK is completely missing, the custom callbacks should nevertheless run.
  if (!window.scrivito) {
    window.scrivito = {};
  }

  if (!window.scrivito.on) {
    window.scrivito.on = function (eventName, callback) {
      if (eventName === 'content') {
        document.addEventListener('DOMContentLoaded', function () {
          return callback(window.document);
        });
      }
    };
  }

  if (!window.scrivito.in_editable_view) {
    window.scrivito.in_editable_view = function () {
      return false;
    };
  }
})();

/***/ })

/******/ });
