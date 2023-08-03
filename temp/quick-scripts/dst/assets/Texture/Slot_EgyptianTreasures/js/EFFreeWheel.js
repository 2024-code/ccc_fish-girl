
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_EgyptianTreasures/js/EFFreeWheel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd58c0cBjsZDWqsJqI9c0DMO', 'EFFreeWheel');
// Texture/Slot_EgyptianTreasures/js/EFFreeWheel.js

"use strict";

var ROLENUM = 40; //每一轮的角色数量

var TIMEMIN = 1; //第一轮摇奖时间

cc.Class({
  "extends": cc.Component,
  properties: {
    wheelId: 0
  },
  onLoad: function onLoad() {
    this.audio = this.node.getComponent('EFAudio');
    this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('EFMain');
    this.mainObj.freeWheelList[this.wheelId] = this;
  },
  startRoll: function startRoll(args) {
    var _this = this;

    this.animObj = null;
    this.node.removeAllChildren();
    this.node.y = 0;

    for (var i = 0; i < 39; i++) {
      this.addRole(Math.floor(Math.random() * 10 + 1));
    }

    this.animObj = this.addRole(args);
    var timer = TIMEMIN + this.wheelId * 0.2;
    setTimeout(function () {
      _this.node.runAction(cc.sequence(cc.moveTo(timer, cc.v2(_this.node.x, -_this.node.height + 220)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 230)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 220)), cc.callFunc(_this.rollCallBack.bind(_this))));
    }, 1000);
  },
  addRole: function addRole(id) {
    var pb = cc.instantiate(this.mainObj.rolePb[id]);
    this.node.addChild(pb);
    return pb;
  },
  rollCallBack: function rollCallBack() {
    this.animObj.getComponent(cc.Animation).play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9FZ3lwdGlhblRyZWFzdXJlc1xcanNcXEVGRnJlZVdoZWVsLmpzIl0sIm5hbWVzIjpbIlJPTEVOVU0iLCJUSU1FTUlOIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ3aGVlbElkIiwib25Mb2FkIiwiYXVkaW8iLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwibWFpbk9iaiIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsImZyZWVXaGVlbExpc3QiLCJzdGFydFJvbGwiLCJhcmdzIiwiYW5pbU9iaiIsInJlbW92ZUFsbENoaWxkcmVuIiwieSIsImkiLCJhZGRSb2xlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidGltZXIiLCJzZXRUaW1lb3V0IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJtb3ZlVG8iLCJ2MiIsIngiLCJoZWlnaHQiLCJjYWxsRnVuYyIsInJvbGxDYWxsQmFjayIsImJpbmQiLCJpZCIsInBiIiwiaW5zdGFudGlhdGUiLCJyb2xlUGIiLCJhZGRDaGlsZCIsIkFuaW1hdGlvbiIsInBsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHLEVBQWhCLEVBQW9COztBQUNwQixJQUFNQyxPQUFPLEdBQUcsQ0FBaEIsRUFBbUI7O0FBRW5CQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFO0FBREQsR0FIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsS0FBTCxHQUFhLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixTQUF2QixDQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlVCxFQUFFLENBQUNVLFFBQUgsQ0FBWUMsUUFBWixHQUF1QkMsY0FBdkIsQ0FBc0MsUUFBdEMsRUFBZ0RKLFlBQWhELENBQTZELFFBQTdELENBQWY7QUFDQSxTQUFLQyxPQUFMLENBQWFJLGFBQWIsQ0FBMkIsS0FBS1QsT0FBaEMsSUFBMkMsSUFBM0M7QUFDSCxHQVhJO0FBYUxVLEVBQUFBLFNBYksscUJBYUtDLElBYkwsRUFhVztBQUFBOztBQUNaLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS1QsSUFBTCxDQUFVVSxpQkFBVjtBQUNBLFNBQUtWLElBQUwsQ0FBVVcsQ0FBVixHQUFjLENBQWQ7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQ3pCLFdBQUtDLE9BQUwsQ0FBYUMsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixFQUFoQixHQUFxQixDQUFoQyxDQUFiO0FBQ0g7O0FBQ0QsU0FBS1AsT0FBTCxHQUFlLEtBQUtJLE9BQUwsQ0FBYUwsSUFBYixDQUFmO0FBQ0EsUUFBSVMsS0FBSyxHQUFHekIsT0FBTyxHQUFHLEtBQUtLLE9BQUwsR0FBZSxHQUFyQztBQUNBcUIsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixNQUFBLEtBQUksQ0FBQ2xCLElBQUwsQ0FBVW1CLFNBQVYsQ0FDSTFCLEVBQUUsQ0FBQzJCLFFBQUgsQ0FDSTNCLEVBQUUsQ0FBQzRCLE1BQUgsQ0FBVUosS0FBVixFQUFpQnhCLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTSxLQUFJLENBQUN0QixJQUFMLENBQVV1QixDQUFoQixFQUFtQixDQUFDLEtBQUksQ0FBQ3ZCLElBQUwsQ0FBVXdCLE1BQVgsR0FBb0IsR0FBdkMsQ0FBakIsQ0FESixFQUVJL0IsRUFBRSxDQUFDNEIsTUFBSCxDQUFVLEdBQVYsRUFBZTVCLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTSxLQUFJLENBQUN0QixJQUFMLENBQVV1QixDQUFoQixFQUFtQixDQUFDLEtBQUksQ0FBQ3ZCLElBQUwsQ0FBVXdCLE1BQVgsR0FBb0IsR0FBdkMsQ0FBZixDQUZKLEVBR0kvQixFQUFFLENBQUM0QixNQUFILENBQVUsR0FBVixFQUFlNUIsRUFBRSxDQUFDNkIsRUFBSCxDQUFNLEtBQUksQ0FBQ3RCLElBQUwsQ0FBVXVCLENBQWhCLEVBQW1CLENBQUMsS0FBSSxDQUFDdkIsSUFBTCxDQUFVd0IsTUFBWCxHQUFvQixHQUF2QyxDQUFmLENBSEosRUFJSS9CLEVBQUUsQ0FBQ2dDLFFBQUgsQ0FBWSxLQUFJLENBQUNDLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLEtBQXZCLENBQVosQ0FKSixDQURKO0FBUUgsS0FUUyxFQVNQLElBVE8sQ0FBVjtBQVVILEdBaENJO0FBa0NMZCxFQUFBQSxPQWxDSyxtQkFrQ0dlLEVBbENILEVBa0NPO0FBQ1IsUUFBSUMsRUFBRSxHQUFHcEMsRUFBRSxDQUFDcUMsV0FBSCxDQUFlLEtBQUs1QixPQUFMLENBQWE2QixNQUFiLENBQW9CSCxFQUFwQixDQUFmLENBQVQ7QUFDQSxTQUFLNUIsSUFBTCxDQUFVZ0MsUUFBVixDQUFtQkgsRUFBbkI7QUFDQSxXQUFPQSxFQUFQO0FBQ0gsR0F0Q0k7QUF3Q0xILEVBQUFBLFlBeENLLDBCQXdDVTtBQUNYLFNBQUtqQixPQUFMLENBQWFSLFlBQWIsQ0FBMEJSLEVBQUUsQ0FBQ3dDLFNBQTdCLEVBQXdDQyxJQUF4QztBQUNIO0FBMUNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJPTEVOVU0gPSA0MDsgLy/mr4/kuIDova7nmoTop5LoibLmlbDph49cclxuY29uc3QgVElNRU1JTiA9IDE7IC8v56ys5LiA6L2u5pGH5aWW5pe26Ze0XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHdoZWVsSWQ6IDAsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnRUZBdWRpbycpO1xyXG4gICAgICAgIHRoaXMubWFpbk9iaiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnRUZNYWluJyk7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLmZyZWVXaGVlbExpc3RbdGhpcy53aGVlbElkXSA9IHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0Um9sbChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5hbmltT2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmltT2JqID0gdGhpcy5hZGRSb2xlKGFyZ3MpO1xyXG4gICAgICAgIGxldCB0aW1lciA9IFRJTUVNSU4gKyB0aGlzLndoZWVsSWQgKiAwLjI7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8odGltZXIsIGNjLnYyKHRoaXMubm9kZS54LCAtdGhpcy5ub2RlLmhlaWdodCArIDIyMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjEsIGNjLnYyKHRoaXMubm9kZS54LCAtdGhpcy5ub2RlLmhlaWdodCArIDIzMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjEsIGNjLnYyKHRoaXMubm9kZS54LCAtdGhpcy5ub2RlLmhlaWdodCArIDIyMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKHRoaXMucm9sbENhbGxCYWNrLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFJvbGUoaWQpIHtcclxuICAgICAgICBsZXQgcGIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1haW5PYmoucm9sZVBiW2lkXSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBiKTtcclxuICAgICAgICByZXR1cm4gcGI7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGxDYWxsQmFjaygpIHtcclxuICAgICAgICB0aGlzLmFuaW1PYmouZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==