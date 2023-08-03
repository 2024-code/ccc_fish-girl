
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/betMove.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae06fv3xrxJZZxN09d2HMRQ', 'betMove');
// Texture/yadaxiao/js/betMove.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bet: cc.Node
  },
  onLoad: function onLoad() {
    this.move();
    this.t = 0;
  },
  move: function move() {
    this.bet.x = this.bet.x + Math.random() * 200;

    this.callback = function () {
      if (this.bet.y < 200) {
        this.t += 0.1;
        this.bet.x += 5;
        this.bet.y = this.bet.y + 2 * this.t * this.t;

        if (this.bet.width > 50) {
          this.bet.width -= 5;
          this.bet.height -= 5;
        }
      } else {
        this.bet.destroy();
        this.unschedule(this.callback);
      }
    };

    this.schedule(this.callback, 0.02);
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFxiZXRNb3ZlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmV0IiwiTm9kZSIsIm9uTG9hZCIsIm1vdmUiLCJ0IiwieCIsIk1hdGgiLCJyYW5kb20iLCJjYWxsYmFjayIsInkiLCJ3aWR0aCIsImhlaWdodCIsImRlc3Ryb3kiLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxHQUFHLEVBQUVKLEVBQUUsQ0FBQ0s7QUFEQSxHQUhQO0FBT0xDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQixTQUFLQyxJQUFMO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTLENBQVQ7QUFDSCxHQVZJO0FBWUxELEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtILEdBQUwsQ0FBU0ssQ0FBVCxHQUFhLEtBQUtMLEdBQUwsQ0FBU0ssQ0FBVCxHQUFhQyxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsR0FBMUM7O0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixZQUFZO0FBQ3hCLFVBQUcsS0FBS1IsR0FBTCxDQUFTUyxDQUFULEdBQWEsR0FBaEIsRUFBb0I7QUFDaEIsYUFBS0wsQ0FBTCxJQUFVLEdBQVY7QUFDQSxhQUFLSixHQUFMLENBQVNLLENBQVQsSUFBYyxDQUFkO0FBQ0EsYUFBS0wsR0FBTCxDQUFTUyxDQUFULEdBQWMsS0FBS1QsR0FBTCxDQUFTUyxDQUFULEdBQWEsSUFBSSxLQUFLTCxDQUFULEdBQWEsS0FBS0EsQ0FBN0M7O0FBQ0EsWUFBRyxLQUFLSixHQUFMLENBQVNVLEtBQVQsR0FBaUIsRUFBcEIsRUFBdUI7QUFDbkIsZUFBS1YsR0FBTCxDQUFTVSxLQUFULElBQWtCLENBQWxCO0FBQ0EsZUFBS1YsR0FBTCxDQUFTVyxNQUFULElBQW1CLENBQW5CO0FBQ0g7QUFDSixPQVJELE1BUUs7QUFDRCxhQUFLWCxHQUFMLENBQVNZLE9BQVQ7QUFDQSxhQUFLQyxVQUFMLENBQWdCLEtBQUtMLFFBQXJCO0FBQ0g7QUFDSixLQWJEOztBQWNBLFNBQUtNLFFBQUwsQ0FBYyxLQUFLTixRQUFuQixFQUE2QixJQUE3QjtBQUNIO0FBN0JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmV0OiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuICAgICAgICB0aGlzLnQgPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5iZXQueCA9IHRoaXMuYmV0LnggKyBNYXRoLnJhbmRvbSgpICogMjAwO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmV0LnkgPCAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ICs9IDAuMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0LnggKz0gNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0LnkgPSAgdGhpcy5iZXQueSArIDIgKiB0aGlzLnQgKiB0aGlzLnQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJldC53aWR0aCA+IDUwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJldC53aWR0aCAtPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmV0LmhlaWdodCAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmNhbGxiYWNrLCAwLjAyKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==