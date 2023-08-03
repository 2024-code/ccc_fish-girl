
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/levelUP/shengji.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3915eSpePBOmrFBSqGfVGh+', 'shengji');
// LaoHuJi/module/levelUP/shengji.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Label_LV: cc.Label,
    _totalTime: 6,
    //显示时长
    _countDown: 0 //显示倒计时

  },
  onLoad: function onLoad() {
    ////KBEngineEvent.register("onLevelUP", this, "onLevelUP");
    this.node.active = false;
  },
  //取消注册
  onDestroy: function onDestroy() {////KBEngineEvent.deregister("onLevelUP", this);
  },
  update: function update(dt) {
    this._countDown -= dt;

    if (this._countDown < 0) {
      this.node.active = false;
    }
  },
  //收到消息:玩家升级
  onLevelUP: function onLevelUP(nLevel) {
    this.node.active = true;
    this._countDown = this._totalTime;
    this.node.getComponent(cc.Animation).play();
    this.Label_LV.string = nLevel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxsZXZlbFVQXFxzaGVuZ2ppLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTGFiZWxfTFYiLCJMYWJlbCIsIl90b3RhbFRpbWUiLCJfY291bnREb3duIiwib25Mb2FkIiwibm9kZSIsImFjdGl2ZSIsIm9uRGVzdHJveSIsInVwZGF0ZSIsImR0Iiwib25MZXZlbFVQIiwibkxldmVsIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwicGxheSIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUosRUFBRSxDQUFDSyxLQURMO0FBRVJDLElBQUFBLFVBQVUsRUFBRSxDQUZKO0FBRU07QUFDZEMsSUFBQUEsVUFBVSxFQUFFLENBSEosQ0FHTTs7QUFITixHQUhQO0FBU0xDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQjtBQUNBLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixLQUFuQjtBQUNILEdBWkk7QUFjTDtBQUNBQyxFQUFBQSxTQUFTLEVBQUUscUJBQVksQ0FDbkI7QUFDSCxHQWpCSTtBQW1CTEMsRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFDbEIsU0FBS04sVUFBTCxJQUFtQk0sRUFBbkI7O0FBQ0EsUUFBSSxLQUFLTixVQUFMLEdBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLFdBQUtFLElBQUwsQ0FBVUMsTUFBVixHQUFtQixLQUFuQjtBQUNIO0FBQ0osR0F4Qkk7QUEwQkw7QUFDQUksRUFBQUEsU0FBUyxFQUFFLG1CQUFVQyxNQUFWLEVBQWtCO0FBQ3pCLFNBQUtOLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNBLFNBQUtILFVBQUwsR0FBa0IsS0FBS0QsVUFBdkI7QUFDQSxTQUFLRyxJQUFMLENBQVVPLFlBQVYsQ0FBdUJoQixFQUFFLENBQUNpQixTQUExQixFQUFxQ0MsSUFBckM7QUFDQSxTQUFLZCxRQUFMLENBQWNlLE1BQWQsR0FBdUJKLE1BQXZCO0FBQ0g7QUFoQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgTGFiZWxfTFY6IGNjLkxhYmVsLFxyXG4gICAgICAgIF90b3RhbFRpbWU6IDYsLy/mmL7npLrml7bplb9cclxuICAgICAgICBfY291bnREb3duOiAwLC8v5pi+56S65YCS6K6h5pe2XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLy9LQkVuZ2luZUV2ZW50LnJlZ2lzdGVyKFwib25MZXZlbFVQXCIsIHRoaXMsIFwib25MZXZlbFVQXCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lj5bmtojms6jlhoxcclxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLy9LQkVuZ2luZUV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxldmVsVVBcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdGhpcy5fY291bnREb3duIC09IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VudERvd24gPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5pS25Yiw5raI5oGvOueOqeWutuWNh+e6p1xyXG4gICAgb25MZXZlbFVQOiBmdW5jdGlvbiAobkxldmVsKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY291bnREb3duID0gdGhpcy5fdG90YWxUaW1lO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5MYWJlbF9MVi5zdHJpbmcgPSBuTGV2ZWw7XHJcbiAgICB9LFxyXG59KTsiXX0=