
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/openBox/animationPlayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bb8acuZxulAUabB/u2eXPew', 'animationPlayer');
// LaoHuJi/module/openBox/animationPlayer.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    animation: cc.Animation,
    label: cc.Label
  },
  onLoad: function onLoad() {
    this.animation.on('finished', this.onFinished, this);
    console.log('onLoad');
  },
  //取消注册事件
  onDestroy: function onDestroy() {//this.animation.off('finished', this.onFinished, this);    //注掉这段,否则关闭宝箱界面会报错,我也不知道为啥~
  },
  PlayAnimation: function PlayAnimation() {
    this.animation.play(); //播放默认动画

    this.node.getComponent(cc.Button).interactable = false; //禁用按钮
    // console.log('PlayAnimation');
  },
  onFinished: function onFinished() {
    var eventCustom = new cc.Event.EventCustom('Event_OpenBox', true);
    eventCustom.setUserData(this.label);
    this.node.dispatchEvent(eventCustom);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxvcGVuQm94XFxhbmltYXRpb25QbGF5ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJhbmltYXRpb24iLCJBbmltYXRpb24iLCJsYWJlbCIsIkxhYmVsIiwib25Mb2FkIiwib24iLCJvbkZpbmlzaGVkIiwiY29uc29sZSIsImxvZyIsIm9uRGVzdHJveSIsIlBsYXlBbmltYXRpb24iLCJwbGF5Iiwibm9kZSIsImdldENvbXBvbmVudCIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsImV2ZW50Q3VzdG9tIiwiRXZlbnQiLCJFdmVudEN1c3RvbSIsInNldFVzZXJEYXRhIiwiZGlzcGF0Y2hFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUosRUFBRSxDQUFDSyxTQUROO0FBRVJDLElBQUFBLEtBQUssRUFBRU4sRUFBRSxDQUFDTztBQUZGLEdBSFA7QUFRTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCLFNBQUtKLFNBQUwsQ0FBZUssRUFBZixDQUFrQixVQUFsQixFQUE4QixLQUFLQyxVQUFuQyxFQUErQyxJQUEvQztBQUNBQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0gsR0FYSTtBQVlMO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxxQkFBWSxDQUNuQjtBQUNILEdBZkk7QUFpQkxDLEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QixTQUFLVixTQUFMLENBQWVXLElBQWYsR0FEdUIsQ0FDRDs7QUFDdEIsU0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCakIsRUFBRSxDQUFDa0IsTUFBMUIsRUFBa0NDLFlBQWxDLEdBQWlELEtBQWpELENBRnVCLENBRWdDO0FBQ3ZEO0FBQ0gsR0FyQkk7QUF1QkxULEVBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQixRQUFJVSxXQUFXLEdBQUcsSUFBSXBCLEVBQUUsQ0FBQ3FCLEtBQUgsQ0FBU0MsV0FBYixDQUF5QixlQUF6QixFQUEwQyxJQUExQyxDQUFsQjtBQUNBRixJQUFBQSxXQUFXLENBQUNHLFdBQVosQ0FBd0IsS0FBS2pCLEtBQTdCO0FBQ0EsU0FBS1UsSUFBTCxDQUFVUSxhQUFWLENBQXdCSixXQUF4QjtBQUNIO0FBM0JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYW5pbWF0aW9uOiBjYy5BbmltYXRpb24sXHJcbiAgICAgICAgbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5vbignZmluaXNoZWQnLCB0aGlzLm9uRmluaXNoZWQsIHRoaXMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgIH0sXHJcbiAgICAvL+WPlua2iOazqOWGjOS6i+S7tlxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy90aGlzLmFuaW1hdGlvbi5vZmYoJ2ZpbmlzaGVkJywgdGhpcy5vbkZpbmlzaGVkLCB0aGlzKTsgICAgLy/ms6jmjonov5nmrrUs5ZCm5YiZ5YWz6Zet5a6d566x55WM6Z2i5Lya5oql6ZSZLOaIkeS5n+S4jeefpemBk+S4uuWVpX5cclxuICAgIH0sXHJcblxyXG4gICAgUGxheUFuaW1hdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoKTsvL+aSreaUvum7mOiupOWKqOeUu1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTsvL+emgeeUqOaMiemSrlxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdQbGF5QW5pbWF0aW9uJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZXZlbnRDdXN0b20gPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oJ0V2ZW50X09wZW5Cb3gnLCB0cnVlKTtcclxuICAgICAgICBldmVudEN1c3RvbS5zZXRVc2VyRGF0YSh0aGlzLmxhYmVsKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChldmVudEN1c3RvbSk7XHJcbiAgICB9LFxyXG59KTsiXX0=