
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/platform/platformButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5864e5WeW9Lg7CuE74webOQ', 'platformButton');
// Script/platform/platformButton.js

"use strict";

window.onfire = require("onfire");
cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {},
  start: function start() {},
  // update (dt) {},
  onClick: function onClick(event, customEventData) {
    if (customEventData == "login") {
      onfire.fire("onplatform", "login");
    } else if (customEventData == "share") {
      onfire.fire("onplatform", "share");
    } else if (customEventData == "share1") {
      onfire.fire("onplatform", "shareurl", "潮乐会", "传统游戏，玩法简单，点击下载APP", window.platform_openid);
    }
  }
});

window.background_return = function () {};

window.onAppHide = function () {};

window.onAppShow = function () {};

window.native_close = function () {};

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwbGF0Zm9ybVxccGxhdGZvcm1CdXR0b24uanMiXSwibmFtZXMiOlsid2luZG93Iiwib25maXJlIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwic3RhcnQiLCJvbkNsaWNrIiwiZXZlbnQiLCJjdXN0b21FdmVudERhdGEiLCJmaXJlIiwicGxhdGZvcm1fb3BlbmlkIiwiYmFja2dyb3VuZF9yZXR1cm4iLCJvbkFwcEhpZGUiLCJvbkFwcFNob3ciLCJuYXRpdmVfY2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQkMsT0FBTyxDQUFDLFFBQUQsQ0FBdkI7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTEMsRUFBQUEsTUFQSyxvQkFPSyxDQUVULENBVEk7QUFXTEMsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkk7QUFlTDtBQUNBQyxFQUFBQSxPQWhCSyxtQkFnQkdDLEtBaEJILEVBZ0JTQyxlQWhCVCxFQWlCTDtBQUNJLFFBQUlBLGVBQWUsSUFBSSxPQUF2QixFQUNBO0FBQ0lWLE1BQUFBLE1BQU0sQ0FBQ1csSUFBUCxDQUFZLFlBQVosRUFBeUIsT0FBekI7QUFDSCxLQUhELE1BR00sSUFBSUQsZUFBZSxJQUFJLE9BQXZCLEVBQ047QUFDSVYsTUFBQUEsTUFBTSxDQUFDVyxJQUFQLENBQVksWUFBWixFQUF5QixPQUF6QjtBQUNILEtBSEssTUFJRCxJQUFJRCxlQUFlLElBQUksUUFBdkIsRUFDTDtBQUNJVixNQUFBQSxNQUFNLENBQUNXLElBQVAsQ0FBWSxZQUFaLEVBQXlCLFVBQXpCLEVBQW9DLEtBQXBDLEVBQTBDLG1CQUExQyxFQUE4RFosTUFBTSxDQUFDYSxlQUFyRTtBQUNIO0FBQ0o7QUE3QkksQ0FBVDs7QUFnQ0FiLE1BQU0sQ0FBQ2MsaUJBQVAsR0FBMkIsWUFDM0IsQ0FFQyxDQUhEOztBQUtBZCxNQUFNLENBQUNlLFNBQVAsR0FBbUIsWUFBVSxDQUU1QixDQUZEOztBQUlBZixNQUFNLENBQUNnQixTQUFQLEdBQW1CLFlBQVUsQ0FFNUIsQ0FGRDs7QUFJQWhCLE1BQU0sQ0FBQ2lCLFlBQVAsR0FBc0IsWUFBVSxDQUUvQixDQUZEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25maXJlID0gcmVxdWlyZShcIm9uZmlyZVwiKTtcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbiAgICBvbkNsaWNrKGV2ZW50LGN1c3RvbUV2ZW50RGF0YSlcbiAgICB7XG4gICAgICAgIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJsb2dpblwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBvbmZpcmUuZmlyZShcIm9ucGxhdGZvcm1cIixcImxvZ2luXCIpO1xuICAgICAgICB9ZWxzZSBpZiAoY3VzdG9tRXZlbnREYXRhID09IFwic2hhcmVcIilcbiAgICAgICAge1xuICAgICAgICAgICAgb25maXJlLmZpcmUoXCJvbnBsYXRmb3JtXCIsXCJzaGFyZVwiKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcInNoYXJlMVwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBvbmZpcmUuZmlyZShcIm9ucGxhdGZvcm1cIixcInNoYXJldXJsXCIsXCLmva7kuZDkvJpcIixcIuS8oOe7n+a4uOaIj++8jOeOqeazleeugOWNle+8jOeCueWHu+S4i+i9vUFQUFwiLHdpbmRvdy5wbGF0Zm9ybV9vcGVuaWQpO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG53aW5kb3cuYmFja2dyb3VuZF9yZXR1cm4gPSBmdW5jdGlvbigpXG57XG5cbn1cblxud2luZG93Lm9uQXBwSGlkZSA9IGZ1bmN0aW9uKCl7XG5cbn1cblxud2luZG93Lm9uQXBwU2hvdyA9IGZ1bmN0aW9uKCl7XG5cbn1cblxud2luZG93Lm5hdGl2ZV9jbG9zZSA9IGZ1bmN0aW9uKCl7XG5cbn0iXX0=