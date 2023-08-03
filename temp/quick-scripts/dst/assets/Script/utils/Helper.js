
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/utils/Helper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb58bXnD2lLxo4qvnjIGpYh', 'Helper');
// Script/utils/Helper.js

"use strict";

(function () {
  var helper = function helper() {};

  helper.prototype.loadHead = function (url, cb) {
    if (!!url) {
      if (url == parseInt(url)) {
        cc.loader.loadRes("head/s" + url, cc.SpriteFrame, function (err, sp) {
          cb(sp);
        });
      } else {
        cc.loader.load({
          url: url,
          type: 'png'
        }, function (err, texture) {
          cb(new cc.SpriteFrame(texture));
        });
      }
    }
  };

  helper.prototype.setButtonAudio = function () {
    cc.Button.prototype._onTouchEnded = function (t) {
      var audioBool = this.clickEvents.length > 0 && !!this.clickEvents[0] && !!this.clickEvents[0].target && !!this.clickEvents[0].handler;

      if (audioBool && cc.director.getScene().name == 'LobbyMain') {
        window.playEffect('click');
      }

      if (this.interactable && this.enabledInHierarchy) {
        if (this._pressed) {
          cc.Component.EventHandler.emitEvents(this.clickEvents, t);
          this.node.emit("click", this);
        }

        this._pressed = !1;

        this._updateState();

        t.stopPropagation();
      }
    };
  };

  helper.prototype.fixNum = function (n) {
    n = n / 100;
    return n.toFixed(2);
  };

  helper.prototype.http = function (url, data) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (!!xhr.response) {
            try {
              var response = JSON.parse(xhr.response);
              resolve(response);
            } catch (e) {
              reject(e);
              console.error('json解析错误');
            }
          } else {
            reject('空消息');
          }
        }
      };

      xhr.open("post", url);
      xhr.send(data);
    });
  };

  if (typeof window != "undefined") {
    window.Helper = Object.create(helper.prototype);
  }
})();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsc1xcSGVscGVyLmpzIl0sIm5hbWVzIjpbImhlbHBlciIsInByb3RvdHlwZSIsImxvYWRIZWFkIiwidXJsIiwiY2IiLCJwYXJzZUludCIsImNjIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3AiLCJsb2FkIiwidHlwZSIsInRleHR1cmUiLCJzZXRCdXR0b25BdWRpbyIsIkJ1dHRvbiIsIl9vblRvdWNoRW5kZWQiLCJ0IiwiYXVkaW9Cb29sIiwiY2xpY2tFdmVudHMiLCJsZW5ndGgiLCJ0YXJnZXQiLCJoYW5kbGVyIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsIm5hbWUiLCJ3aW5kb3ciLCJwbGF5RWZmZWN0IiwiaW50ZXJhY3RhYmxlIiwiZW5hYmxlZEluSGllcmFyY2h5IiwiX3ByZXNzZWQiLCJDb21wb25lbnQiLCJFdmVudEhhbmRsZXIiLCJlbWl0RXZlbnRzIiwibm9kZSIsImVtaXQiLCJfdXBkYXRlU3RhdGUiLCJzdG9wUHJvcGFnYXRpb24iLCJmaXhOdW0iLCJuIiwidG9GaXhlZCIsImh0dHAiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJvcGVuIiwic2VuZCIsIkhlbHBlciIsIk9iamVjdCIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQU07QUFDSCxNQUFJQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFZLENBQUUsQ0FBM0I7O0FBRUFBLEVBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsR0FBNEIsVUFBQ0MsR0FBRCxFQUFNQyxFQUFOLEVBQWE7QUFDckMsUUFBSSxDQUFDLENBQUNELEdBQU4sRUFB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RyxDQUFDSyxRQUFmLENBQWpCO0FBQ0FQLGNBQUFBLE9BQU8sQ0FBQ08sUUFBRCxDQUFQO0FBQ0gsYUFIRCxDQUdFLE9BQU9HLENBQVAsRUFBVTtBQUNSVCxjQUFBQSxNQUFNLENBQUNTLENBQUQsQ0FBTjtBQUNBQyxjQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxVQUFkO0FBQ0g7QUFDSixXQVJELE1BUU87QUFDSFgsWUFBQUEsTUFBTSxDQUFDLEtBQUQsQ0FBTjtBQUNIO0FBQ0o7QUFDSixPQWREOztBQWVBQyxNQUFBQSxHQUFHLENBQUNXLElBQUosQ0FBUyxNQUFULEVBQWlCdkQsR0FBakI7QUFDQTRDLE1BQUFBLEdBQUcsQ0FBQ1ksSUFBSixDQUFTaEIsSUFBVDtBQUNILEtBbkJNLENBQVA7QUFvQkgsR0FyQkQ7O0FBdUJBLE1BQUksT0FBUWhCLE1BQVIsSUFBbUIsV0FBdkIsRUFBb0M7QUFDaENBLElBQUFBLE1BQU0sQ0FBQ2lDLE1BQVAsR0FBZ0JDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjOUQsTUFBTSxDQUFDQyxTQUFyQixDQUFoQjtBQUNIO0FBQ0osQ0F0RUQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIigoKSA9PiB7XHJcbiAgICBsZXQgaGVscGVyID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgaGVscGVyLnByb3RvdHlwZS5sb2FkSGVhZCA9ICh1cmwsIGNiKSA9PiB7XHJcbiAgICAgICAgaWYgKCEhdXJsKSB7XHJcbiAgICAgICAgICAgIGlmICh1cmwgPT0gcGFyc2VJbnQodXJsKSkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoYGhlYWQvcyR7dXJsfWAsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKHNwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwbmcnXHJcbiAgICAgICAgICAgICAgICB9LCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IobmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBoZWxwZXIucHJvdG90eXBlLnNldEJ1dHRvbkF1ZGlvID0gKCkgPT4ge1xyXG4gICAgICAgIGNjLkJ1dHRvbi5wcm90b3R5cGUuX29uVG91Y2hFbmRlZCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIGxldCBhdWRpb0Jvb2wgPSB0aGlzLmNsaWNrRXZlbnRzLmxlbmd0aCA+IDAgJiYgISF0aGlzLmNsaWNrRXZlbnRzWzBdICYmICEhdGhpcy5jbGlja0V2ZW50c1swXS50YXJnZXQgJiYgISF0aGlzLmNsaWNrRXZlbnRzWzBdLmhhbmRsZXI7XHJcbiAgICAgICAgICAgIGlmIChhdWRpb0Jvb2wgJiYgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lID09ICdMb2JieU1haW4nKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucGxheUVmZmVjdCgnY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGFibGUgJiYgdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcmVzc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuY2xpY2tFdmVudHMsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5lbWl0KFwiY2xpY2tcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlc3NlZCA9ICExO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIHQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGhlbHBlci5wcm90b3R5cGUuZml4TnVtID0gbiA9PiB7XHJcbiAgICAgICAgbiA9IG4gLyAxMDA7XHJcbiAgICAgICAgcmV0dXJuIG4udG9GaXhlZCgyKTtcclxuICAgIH1cclxuXHJcbiAgICBoZWxwZXIucHJvdG90eXBlLmh0dHAgPSAodXJsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXhoci5yZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignanNvbuino+aekOmUmeivrycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCfnqbrmtojmga8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeGhyLm9wZW4oXCJwb3N0XCIsIHVybCk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiAod2luZG93KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgd2luZG93LkhlbHBlciA9IE9iamVjdC5jcmVhdGUoaGVscGVyLnByb3RvdHlwZSk7XHJcbiAgICB9XHJcbn0pKCk7Il19