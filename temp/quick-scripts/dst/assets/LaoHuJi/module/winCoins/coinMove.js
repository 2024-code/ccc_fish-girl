
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/winCoins/coinMove.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3d87aC++gdBp5DXsSzdNYOj', 'coinMove');
// LaoHuJi/module/winCoins/coinMove.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Distance: {
      "default": 60,
      tooltip: "在起点附近随机位置生成金币的最大距离"
    },
    Delay: {
      "default": 0.4,
      tooltip: "从生成到开始移动的延迟（秒）"
    },
    Time: {
      "default": 0.3,
      tooltip: "金币从起点到终点运动的总时间（秒）"
    }
  },
  SetData: function SetData(posStart, posEnd) {
    this._posStart = new cc.Vec2(posStart.x + (Math.random() * 2 - 1) * this.Distance, posStart.y + (Math.random() * 2 - 1) * this.Distance);
    this._posEnd = posEnd;
    this._direction = new cc.Vec2(this._posEnd.x - this._posStart.x, this._posEnd.y - this._posStart.y);
    this._move = false;
    this._accMoveTime = 0;
    this.node.x = this._posStart.x;
    this.node.y = this._posStart.y;
    this.scheduleOnce(function () {
      this._move = true;
    }, this.Delay);
    var anim = this.getComponent(cc.Animation);
    anim.playAdditive('coinScale'); //播放第一个动画

    anim.playAdditive('coinSpin'); //播放第二个动画,使用 playAdditive 播放动画时，不会停止其他动画的播放。如果还有其他动画正在播放，则同时会有多个动画进行播放。
  },
  update: function update(dt) {
    if (this._move) {
      this._accMoveTime += dt;

      if (this._accMoveTime > this.Time) {
        this.node.x = this._posEnd.x;
        this.node.y = this._posEnd.y;
        this._move = false;
        this.node.destroy();
        return;
      }

      var scale = this._accMoveTime / this.Time;
      var move = new cc.Vec2(scale * this._direction.x, scale * this._direction.y);
      this.node.x = this._posStart.x + move.x;
      this.node.y = this._posStart.y + move.y;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFx3aW5Db2luc1xcY29pbk1vdmUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJEaXN0YW5jZSIsInRvb2x0aXAiLCJEZWxheSIsIlRpbWUiLCJTZXREYXRhIiwicG9zU3RhcnQiLCJwb3NFbmQiLCJfcG9zU3RhcnQiLCJWZWMyIiwieCIsIk1hdGgiLCJyYW5kb20iLCJ5IiwiX3Bvc0VuZCIsIl9kaXJlY3Rpb24iLCJfbW92ZSIsIl9hY2NNb3ZlVGltZSIsIm5vZGUiLCJzY2hlZHVsZU9uY2UiLCJhbmltIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwicGxheUFkZGl0aXZlIiwidXBkYXRlIiwiZHQiLCJkZXN0cm95Iiwic2NhbGUiLCJtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsRUFESDtBQUVOQyxNQUFBQSxPQUFPLEVBQUU7QUFGSCxLQURGO0FBS1JDLElBQUFBLEtBQUssRUFBRTtBQUNILGlCQUFTLEdBRE47QUFFSEQsTUFBQUEsT0FBTyxFQUFFO0FBRk4sS0FMQztBQVNSRSxJQUFBQSxJQUFJLEVBQUU7QUFDRixpQkFBUyxHQURQO0FBRUZGLE1BQUFBLE9BQU8sRUFBRTtBQUZQO0FBVEUsR0FIUDtBQWtCTEcsRUFBQUEsT0FBTyxFQUFFLGlCQUFVQyxRQUFWLEVBQW9CQyxNQUFwQixFQUE0QjtBQUNqQyxTQUFLQyxTQUFMLEdBQWlCLElBQUlYLEVBQUUsQ0FBQ1ksSUFBUCxDQUFZSCxRQUFRLENBQUNJLENBQVQsR0FBYyxDQUFDQyxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsQ0FBckIsSUFBMEIsS0FBS1gsUUFBekQsRUFBb0VLLFFBQVEsQ0FBQ08sQ0FBVCxHQUFjLENBQUNGLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUFyQixJQUEwQixLQUFLWCxRQUFqSCxDQUFqQjtBQUNBLFNBQUthLE9BQUwsR0FBZVAsTUFBZjtBQUNBLFNBQUtRLFVBQUwsR0FBa0IsSUFBSWxCLEVBQUUsQ0FBQ1ksSUFBUCxDQUFZLEtBQUtLLE9BQUwsQ0FBYUosQ0FBYixHQUFpQixLQUFLRixTQUFMLENBQWVFLENBQTVDLEVBQStDLEtBQUtJLE9BQUwsQ0FBYUQsQ0FBYixHQUFpQixLQUFLTCxTQUFMLENBQWVLLENBQS9FLENBQWxCO0FBQ0EsU0FBS0csS0FBTCxHQUFhLEtBQWI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsU0FBS0MsSUFBTCxDQUFVUixDQUFWLEdBQWMsS0FBS0YsU0FBTCxDQUFlRSxDQUE3QjtBQUNBLFNBQUtRLElBQUwsQ0FBVUwsQ0FBVixHQUFjLEtBQUtMLFNBQUwsQ0FBZUssQ0FBN0I7QUFFQSxTQUFLTSxZQUFMLENBQWtCLFlBQVk7QUFDMUIsV0FBS0gsS0FBTCxHQUFhLElBQWI7QUFDSCxLQUZELEVBRUcsS0FBS2IsS0FGUjtBQUlBLFFBQUlpQixJQUFJLEdBQUcsS0FBS0MsWUFBTCxDQUFrQnhCLEVBQUUsQ0FBQ3lCLFNBQXJCLENBQVg7QUFDQUYsSUFBQUEsSUFBSSxDQUFDRyxZQUFMLENBQWtCLFdBQWxCLEVBZGlDLENBY0Y7O0FBQy9CSCxJQUFBQSxJQUFJLENBQUNHLFlBQUwsQ0FBa0IsVUFBbEIsRUFmaUMsQ0FlSDtBQUNqQyxHQWxDSTtBQW9DTEMsRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFDbEIsUUFBSSxLQUFLVCxLQUFULEVBQWdCO0FBQ1osV0FBS0MsWUFBTCxJQUFxQlEsRUFBckI7O0FBQ0EsVUFBSSxLQUFLUixZQUFMLEdBQW9CLEtBQUtiLElBQTdCLEVBQW1DO0FBQy9CLGFBQUtjLElBQUwsQ0FBVVIsQ0FBVixHQUFjLEtBQUtJLE9BQUwsQ0FBYUosQ0FBM0I7QUFDQSxhQUFLUSxJQUFMLENBQVVMLENBQVYsR0FBYyxLQUFLQyxPQUFMLENBQWFELENBQTNCO0FBQ0EsYUFBS0csS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLRSxJQUFMLENBQVVRLE9BQVY7QUFDQTtBQUNIOztBQUNELFVBQUlDLEtBQUssR0FBRyxLQUFLVixZQUFMLEdBQW9CLEtBQUtiLElBQXJDO0FBQ0EsVUFBSXdCLElBQUksR0FBRyxJQUFJL0IsRUFBRSxDQUFDWSxJQUFQLENBQVlrQixLQUFLLEdBQUcsS0FBS1osVUFBTCxDQUFnQkwsQ0FBcEMsRUFBdUNpQixLQUFLLEdBQUcsS0FBS1osVUFBTCxDQUFnQkYsQ0FBL0QsQ0FBWDtBQUNBLFdBQUtLLElBQUwsQ0FBVVIsQ0FBVixHQUFjLEtBQUtGLFNBQUwsQ0FBZUUsQ0FBZixHQUFtQmtCLElBQUksQ0FBQ2xCLENBQXRDO0FBQ0EsV0FBS1EsSUFBTCxDQUFVTCxDQUFWLEdBQWMsS0FBS0wsU0FBTCxDQUFlSyxDQUFmLEdBQW1CZSxJQUFJLENBQUNmLENBQXRDO0FBQ0g7QUFDSjtBQW5ESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIERpc3RhbmNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDYwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuWcqOi1t+eCuemZhOi/kemaj+acuuS9jee9rueUn+aIkOmHkeW4geeahOacgOWkp+i3neemu1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRGVsYXk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMC40LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuS7jueUn+aIkOWIsOW8gOWni+enu+WKqOeahOW7tui/n++8iOenku+8iVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVGltZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLjMsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi6YeR5biB5LuO6LW354K55Yiw57uI54K56L+Q5Yqo55qE5oC75pe26Ze077yI56eS77yJXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgU2V0RGF0YTogZnVuY3Rpb24gKHBvc1N0YXJ0LCBwb3NFbmQpIHtcclxuICAgICAgICB0aGlzLl9wb3NTdGFydCA9IG5ldyBjYy5WZWMyKHBvc1N0YXJ0LnggKyAoKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgKiB0aGlzLkRpc3RhbmNlKSwgcG9zU3RhcnQueSArICgoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIHRoaXMuRGlzdGFuY2UpKTtcclxuICAgICAgICB0aGlzLl9wb3NFbmQgPSBwb3NFbmQ7XHJcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gbmV3IGNjLlZlYzIodGhpcy5fcG9zRW5kLnggLSB0aGlzLl9wb3NTdGFydC54LCB0aGlzLl9wb3NFbmQueSAtIHRoaXMuX3Bvc1N0YXJ0LnkpO1xyXG4gICAgICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hY2NNb3ZlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLl9wb3NTdGFydC54O1xyXG4gICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5fcG9zU3RhcnQueTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlID0gdHJ1ZTtcclxuICAgICAgICB9LCB0aGlzLkRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIGFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGFuaW0ucGxheUFkZGl0aXZlKCdjb2luU2NhbGUnKTsvL+aSreaUvuesrOS4gOS4quWKqOeUu1xyXG4gICAgICAgIGFuaW0ucGxheUFkZGl0aXZlKCdjb2luU3BpbicpOy8v5pKt5pS+56ys5LqM5Liq5Yqo55S7LOS9v+eUqCBwbGF5QWRkaXRpdmUg5pKt5pS+5Yqo55S75pe277yM5LiN5Lya5YGc5q2i5YW25LuW5Yqo55S755qE5pKt5pS+44CC5aaC5p6c6L+Y5pyJ5YW25LuW5Yqo55S75q2j5Zyo5pKt5pS+77yM5YiZ5ZCM5pe25Lya5pyJ5aSa5Liq5Yqo55S76L+b6KGM5pKt5pS+44CCXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWNjTW92ZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY2NNb3ZlVGltZSA+IHRoaXMuVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLl9wb3NFbmQueDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5fcG9zRW5kLnk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IHRoaXMuX2FjY01vdmVUaW1lIC8gdGhpcy5UaW1lO1xyXG4gICAgICAgICAgICB2YXIgbW92ZSA9IG5ldyBjYy5WZWMyKHNjYWxlICogdGhpcy5fZGlyZWN0aW9uLngsIHNjYWxlICogdGhpcy5fZGlyZWN0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHRoaXMuX3Bvc1N0YXJ0LnggKyBtb3ZlLng7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5fcG9zU3RhcnQueSArIG1vdmUueTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTsiXX0=