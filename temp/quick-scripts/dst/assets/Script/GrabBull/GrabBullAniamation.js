
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GrabBull/GrabBullAniamation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '69c1bEAIAZIobl9OfZcV9Vf', 'GrabBullAniamation');
// Script/GrabBull/GrabBullAniamation.js

"use strict";

/**
 * 抢庄牛牛动画管理
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    canvasNode: {
      "default": null,
      type: cc.Node
    }
  },
  onLoad: function onLoad() {},

  /**
   * 发牌动画
   * @param {*} index 
   */
  sendCardAnimationCallBack_Function: function sendCardAnimationCallBack_Function(index) {
    this.canvasNode.getComponent("GrabBullMain").cardArray[index].active = true;
  },

  /**
   * 发牌完成后回调
   */
  sendCardFinishCallBack_Function: function sendCardFinishCallBack_Function() {
    this.canvasNode.getComponent("GrabBullMain").openSendCard_Function();
  },

  /**
   * 再次发牌动画
   * @param {*} index 
   */
  reissueCardAnimationCallBack_Function: function reissueCardAnimationCallBack_Function(index) {
    this.canvasNode.getComponent("GrabBullMain").cardArray[index].active = true;
    this.canvasNode.getComponent("GrabBullMain").openReissueCard_Function();
  },
  setBankerAnimationCallBack_Funcion: function setBankerAnimationCallBack_Funcion() {},

  /**
   * 播放结算动画
   * @param {*} index 
   */
  playerWinScoreLabelCallBack_Function: function playerWinScoreLabelCallBack_Function(index) {
    this.canvasNode.getComponent("GrabBullMain").com_PlayerMessage.getChildByName("com_Player" + index).getChildByName("lb_WinScore").active = false;
    this.canvasNode.getComponent("GrabBullMain").com_PlayerMessage.getChildByName("com_Player" + index).getChildByName("lb_FailScore").active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmFiQnVsbFxcR3JhYkJ1bGxBbmlhbWF0aW9uLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY2FudmFzTm9kZSIsInR5cGUiLCJOb2RlIiwib25Mb2FkIiwic2VuZENhcmRBbmltYXRpb25DYWxsQmFja19GdW5jdGlvbiIsImluZGV4IiwiZ2V0Q29tcG9uZW50IiwiY2FyZEFycmF5IiwiYWN0aXZlIiwic2VuZENhcmRGaW5pc2hDYWxsQmFja19GdW5jdGlvbiIsIm9wZW5TZW5kQ2FyZF9GdW5jdGlvbiIsInJlaXNzdWVDYXJkQW5pbWF0aW9uQ2FsbEJhY2tfRnVuY3Rpb24iLCJvcGVuUmVpc3N1ZUNhcmRfRnVuY3Rpb24iLCJzZXRCYW5rZXJBbmltYXRpb25DYWxsQmFja19GdW5jaW9uIiwicGxheWVyV2luU2NvcmVMYWJlbENhbGxCYWNrX0Z1bmN0aW9uIiwiY29tX1BsYXllck1lc3NhZ2UiLCJnZXRDaGlsZEJ5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQ7QUFESixHQUhQO0FBU0xDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVyxDQUFFLENBVGhCOztBQVdMO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGtDQUFrQyxFQUFFLDRDQUFTQyxLQUFULEVBQWdCO0FBQ2hELFNBQUtMLFVBQUwsQ0FBZ0JNLFlBQWhCLENBQTZCLGNBQTdCLEVBQTZDQyxTQUE3QyxDQUF1REYsS0FBdkQsRUFBOERHLE1BQTlELEdBQXVFLElBQXZFO0FBQ0gsR0FqQkk7O0FBbUJMO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSwrQkFBK0IsRUFBRSwyQ0FBVztBQUN4QyxTQUFLVCxVQUFMLENBQWdCTSxZQUFoQixDQUE2QixjQUE3QixFQUE2Q0kscUJBQTdDO0FBQ0gsR0F4Qkk7O0FBMEJMO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLHFDQUFxQyxFQUFFLCtDQUFTTixLQUFULEVBQWdCO0FBQ25ELFNBQUtMLFVBQUwsQ0FBZ0JNLFlBQWhCLENBQTZCLGNBQTdCLEVBQTZDQyxTQUE3QyxDQUF1REYsS0FBdkQsRUFBOERHLE1BQTlELEdBQXVFLElBQXZFO0FBQ0EsU0FBS1IsVUFBTCxDQUFnQk0sWUFBaEIsQ0FBNkIsY0FBN0IsRUFBNkNNLHdCQUE3QztBQUNILEdBakNJO0FBa0NMQyxFQUFBQSxrQ0FBa0MsRUFBRSw4Q0FBVyxDQUFFLENBbEM1Qzs7QUFvQ0w7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsb0NBQW9DLEVBQUUsOENBQVNULEtBQVQsRUFBZ0I7QUFDbEQsU0FBS0wsVUFBTCxDQUFnQk0sWUFBaEIsQ0FBNkIsY0FBN0IsRUFBNkNTLGlCQUE3QyxDQUErREMsY0FBL0QsQ0FBOEUsZUFBZVgsS0FBN0YsRUFBb0dXLGNBQXBHLENBQW1ILGFBQW5ILEVBQWtJUixNQUFsSSxHQUEySSxLQUEzSTtBQUNBLFNBQUtSLFVBQUwsQ0FBZ0JNLFlBQWhCLENBQTZCLGNBQTdCLEVBQTZDUyxpQkFBN0MsQ0FBK0RDLGNBQS9ELENBQThFLGVBQWVYLEtBQTdGLEVBQW9HVyxjQUFwRyxDQUFtSCxjQUFuSCxFQUFtSVIsTUFBbkksR0FBNEksS0FBNUk7QUFDSDtBQTNDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5oqi5bqE54mb54mb5Yqo55S7566h55CGXHJcbiAqL1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNhbnZhc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge30sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HniYzliqjnlLtcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIHNlbmRDYXJkQW5pbWF0aW9uQ2FsbEJhY2tfRnVuY3Rpb246IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5jYXJkQXJyYXlbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R54mM5a6M5oiQ5ZCO5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHNlbmRDYXJkRmluaXNoQ2FsbEJhY2tfRnVuY3Rpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikub3BlblNlbmRDYXJkX0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YaN5qyh5Y+R54mM5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4IFxyXG4gICAgICovXHJcbiAgICByZWlzc3VlQ2FyZEFuaW1hdGlvbkNhbGxCYWNrX0Z1bmN0aW9uOiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikuY2FyZEFycmF5W2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikub3BlblJlaXNzdWVDYXJkX0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0QmFua2VyQW5pbWF0aW9uQ2FsbEJhY2tfRnVuY2lvbjogZnVuY3Rpb24oKSB7fSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvue7k+eul+WKqOeUu1xyXG4gICAgICogQHBhcmFtIHsqfSBpbmRleCBcclxuICAgICAqL1xyXG4gICAgcGxheWVyV2luU2NvcmVMYWJlbENhbGxCYWNrX0Z1bmN0aW9uOiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBpbmRleCkuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9XaW5TY29yZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgaW5kZXgpLmdldENoaWxkQnlOYW1lKFwibGJfRmFpbFNjb3JlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59KTtcclxuIl19