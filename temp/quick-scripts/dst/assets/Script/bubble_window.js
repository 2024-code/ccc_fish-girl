
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bubble_window.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '468146rR9tF04QZ1gDOsspV', 'bubble_window');
// Script/bubble_window.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    origin: 1
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.origin = this.node.scale;
  },
  onEnable: function onEnable() {
    if (this.allLoad) {
      this.open();
    } else {
      this.node.scale = 0;
    }
  },
  start: function start() {
    if (!this.allLoad) {
      this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
        this.open();
        this.allLoad = true;
      }, this)));
    }
  },
  open: function open() {
    this.node.stopAllActions();
    this.node.scale = this.origin * 0.1;
    var ac = cc.sequence(cc.scaleTo(0.2, 1.05), cc.scaleTo(0.1, 1));
    this.node.runAction(ac);
  },
  close: function close() {
    this.node.stopAllActions();
    this.node.scale = this.origin;
    this.node.runAction(cc.sequence(cc.scaleTo(0.2, 0.1), cc.callFunc(function () {
      this.node.active = false;
    }, this)));
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxidWJibGVfd2luZG93LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib3JpZ2luIiwib25Mb2FkIiwibm9kZSIsInNjYWxlIiwib25FbmFibGUiLCJhbGxMb2FkIiwib3BlbiIsInN0YXJ0IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInN0b3BBbGxBY3Rpb25zIiwiYWMiLCJzY2FsZVRvIiwiY2xvc2UiLCJhY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUc7QUFERCxHQUhQO0FBT0w7QUFFQUMsRUFBQUEsTUFUSyxvQkFTSztBQUNOLFNBQUtELE1BQUwsR0FBYyxLQUFLRSxJQUFMLENBQVVDLEtBQXhCO0FBQ0gsR0FYSTtBQWFMQyxFQUFBQSxRQWJLLHNCQWFLO0FBQ1AsUUFBSSxLQUFLQyxPQUFULEVBQ0E7QUFDSSxXQUFLQyxJQUFMO0FBQ0gsS0FIRCxNQUdLO0FBQ0QsV0FBS0osSUFBTCxDQUFVQyxLQUFWLEdBQWtCLENBQWxCO0FBQ0g7QUFDSCxHQXBCSTtBQXNCTEksRUFBQUEsS0F0QkssbUJBc0JJO0FBQ0wsUUFBSSxDQUFDLEtBQUtGLE9BQVYsRUFDQTtBQUNJLFdBQUtILElBQUwsQ0FBVU0sU0FBVixDQUFvQlosRUFBRSxDQUFDYSxRQUFILENBQVliLEVBQUUsQ0FBQ2MsU0FBSCxDQUFhLEdBQWIsQ0FBWixFQUE4QmQsRUFBRSxDQUFDZSxRQUFILENBQzlDLFlBQVU7QUFDTixhQUFLTCxJQUFMO0FBQ0EsYUFBS0QsT0FBTCxHQUFlLElBQWY7QUFDSCxPQUo2QyxFQUk1QyxJQUo0QyxDQUE5QixDQUFwQjtBQU1IO0FBQ0osR0FoQ0k7QUFrQ0xDLEVBQUFBLElBbENLLGtCQWtDQztBQUNGLFNBQUtKLElBQUwsQ0FBVVUsY0FBVjtBQUNBLFNBQUtWLElBQUwsQ0FBVUMsS0FBVixHQUFrQixLQUFLSCxNQUFMLEdBQWMsR0FBaEM7QUFFQSxRQUFJYSxFQUFFLEdBQUdqQixFQUFFLENBQUNhLFFBQUgsQ0FBWWIsRUFBRSxDQUFDa0IsT0FBSCxDQUFXLEdBQVgsRUFBZSxJQUFmLENBQVosRUFBaUNsQixFQUFFLENBQUNrQixPQUFILENBQVcsR0FBWCxFQUFlLENBQWYsQ0FBakMsQ0FBVDtBQUNBLFNBQUtaLElBQUwsQ0FBVU0sU0FBVixDQUFvQkssRUFBcEI7QUFFSCxHQXpDSTtBQTJDTEUsRUFBQUEsS0EzQ0ssbUJBNENMO0FBQ0ksU0FBS2IsSUFBTCxDQUFVVSxjQUFWO0FBQ0EsU0FBS1YsSUFBTCxDQUFVQyxLQUFWLEdBQWtCLEtBQUtILE1BQXZCO0FBQ0EsU0FBS0UsSUFBTCxDQUFVTSxTQUFWLENBQW9CWixFQUFFLENBQUNhLFFBQUgsQ0FBWWIsRUFBRSxDQUFDa0IsT0FBSCxDQUFXLEdBQVgsRUFBZSxHQUFmLENBQVosRUFBa0NsQixFQUFFLENBQUNlLFFBQUgsQ0FDbEQsWUFBVTtBQUNOLFdBQUtULElBQUwsQ0FBVWMsTUFBVixHQUFtQixLQUFuQjtBQUNILEtBSGlELEVBR2hELElBSGdELENBQWxDLENBQXBCO0FBS0gsR0FwREksQ0FzREw7O0FBdERLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgb3JpZ2luIDogMSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMubm9kZS5zY2FsZTtcbiAgICB9LFxuXG4gICAgb25FbmFibGUoKXtcbiAgICAgICBpZiAodGhpcy5hbGxMb2FkKVxuICAgICAgIHtcbiAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgfWVsc2V7XG4gICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDA7XG4gICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5hbGxMb2FkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjEpLGNjLmNhbGxGdW5jKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbExvYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0sdGhpc1xuICAgICAgICAgICAgKSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW4oKXtcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IHRoaXMub3JpZ2luICogMC4xO1xuXG4gICAgICAgIHZhciBhYyA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLDEuMDUpLGNjLnNjYWxlVG8oMC4xLDEpKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhYyk7XG5cbiAgICB9LFxuXG4gICAgY2xvc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IHRoaXMub3JpZ2luO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLDAuMSkgLCBjYy5jYWxsRnVuYyhcbiAgICAgICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSx0aGlzXG4gICAgICAgICkpKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19