
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GrabBull/GrabBullButtonClick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '62f61V/VK5PcbiSv+UlKJWD', 'GrabBullButtonClick');
// Script/GrabBull/GrabBullButtonClick.js

"use strict";

/**
 * 抢庄牛牛点击事件
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
   * 
   */
  grapButtonClick_Function: function grapButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").grabBanker_Function(this);
  },

  /**
   * 点击下注按钮
   */
  betButtonClick_Function: function betButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").betSelect_Function(this);
  },

  /**
   * 点击显示帮助界面
   */
  helpButtonClick_Functionf: function helpButtonClick_Functionf() {
    this.canvasNode.getComponent("GrabBullMain").bg_Black.active = true;
    this.canvasNode.getComponent("GrabBullMain").com_Help.active = true;
  },

  /**
   * 点击关闭帮助界面
   */
  helpMenuCloseClick_Function: function helpMenuCloseClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").bg_Black.active = false;
    this.canvasNode.getComponent("GrabBullMain").com_Help.active = false;
  },

  /**
   * 点击离开按钮
   */
  exitButtonClick_Function: function exitButtonClick_Function() {
    //判断是否在游戏中，如果在游戏中，则打开离开提示界面
    // if(this.canvasNode.getComponent("GrabBullMain").isGaming)
    // {
    //     this.canvasNode.getComponent("GrabBullMain").bg_Black.active = true;
    //     this.canvasNode.getComponent("GrabBullMain").com_Exit.active = true;
    // }
    // else
    // {
    //     this.canvasNode.getComponent("GrabBullMain").exitGame_Function();
    // }
    this.canvasNode.getComponent("GrabBullMain").netWork.grabBullSocket.emit("LogoutRoom");
  },

  /**
   * 点击有牛按钮
   */
  getBullButtonClick_Function: function getBullButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").setBullPoint_Function();
  },

  /**
   * 点击散牌按钮
   */
  noBullButtonClick_Function: function noBullButtonClick_Function() {
    if (this.canvasNode.getComponent("GrabBullMain").serverPoint === 0) {
      this.canvasNode.getComponent("GrabBullMain").netWork.grabBullSocket.emit("show");
      this.canvasNode.getComponent("GrabBullMain").com_GetBull.getChildByName("bt_GetBull").active = false;
      this.canvasNode.getComponent("GrabBullMain").com_GetBull.getChildByName("bt_NotBull").active = false;
    }
  },

  /**
   * 
   */
  messageBoxConfirmButtonClick_Function: function messageBoxConfirmButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").com_MessageBox.active = false;
    cc.audioEngine.stopAll();
    cc.director.loadScene("LobbyMain");
  },

  /**
   * 
   */
  messageBoxReconnectButtonClick_Function: function messageBoxReconnectButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").com_MessageBox.active = false;
    cc.audioEngine.stopAll();
    cc.director.loadScene("LobbyMain");
  },

  /**
   * 点击关闭离开提示界面
   */
  exitMenuCancelButtonClick_Function: function exitMenuCancelButtonClick_Function() {// this.canvasNode.getComponent("GrabBullMain").bg_Black.active = false;
    // this.canvasNode.getComponent("GrabBullMain").com_Exit.active = false;
    // this.canvasNode.getComponent("GrabBullMain").netWork.grabBullSocket.emit("LogoutRoom");
  },

  /**
   * 点击强行退出游戏按钮
   */
  exitMenuForceExitButtonClick_Function: function exitMenuForceExitButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").exitGame_Function();
  },
  onClickCloseBd: function onClickCloseBd(e, v) {
    cc.find('Canvas/com_ingame_tips').active = false;
  },
  onClickExit: function onClickExit(e, v) {
    console.log(v);
    cc.find('Canvas/com_exit_tips').active = false;

    if (v == 'exit') {
      this.exitButtonClick_Function();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmFiQnVsbFxcR3JhYkJ1bGxCdXR0b25DbGljay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhbnZhc05vZGUiLCJ0eXBlIiwiTm9kZSIsIm9uTG9hZCIsImdyYXBCdXR0b25DbGlja19GdW5jdGlvbiIsImdldENvbXBvbmVudCIsImdyYWJCYW5rZXJfRnVuY3Rpb24iLCJiZXRCdXR0b25DbGlja19GdW5jdGlvbiIsImJldFNlbGVjdF9GdW5jdGlvbiIsImhlbHBCdXR0b25DbGlja19GdW5jdGlvbmYiLCJiZ19CbGFjayIsImFjdGl2ZSIsImNvbV9IZWxwIiwiaGVscE1lbnVDbG9zZUNsaWNrX0Z1bmN0aW9uIiwiZXhpdEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwibmV0V29yayIsImdyYWJCdWxsU29ja2V0IiwiZW1pdCIsImdldEJ1bGxCdXR0b25DbGlja19GdW5jdGlvbiIsInNldEJ1bGxQb2ludF9GdW5jdGlvbiIsIm5vQnVsbEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwic2VydmVyUG9pbnQiLCJjb21fR2V0QnVsbCIsImdldENoaWxkQnlOYW1lIiwibWVzc2FnZUJveENvbmZpcm1CdXR0b25DbGlja19GdW5jdGlvbiIsImNvbV9NZXNzYWdlQm94IiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJtZXNzYWdlQm94UmVjb25uZWN0QnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJleGl0TWVudUNhbmNlbEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiZXhpdE1lbnVGb3JjZUV4aXRCdXR0b25DbGlja19GdW5jdGlvbiIsImV4aXRHYW1lX0Z1bmN0aW9uIiwib25DbGlja0Nsb3NlQmQiLCJlIiwidiIsImZpbmQiLCJvbkNsaWNrRXhpdCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FB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bnQiOlsiLyoqXHJcbiAqIOaKouW6hOeJm+eJm+eCueWHu+S6i+S7tlxyXG4gKi9cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjYW52YXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7fSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBncmFwQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmdyYWJCYW5rZXJfRnVuY3Rpb24odGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LiL5rOo5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIGJldEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5iZXRTZWxlY3RfRnVuY3Rpb24odGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75pi+56S65biu5Yqp55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIGhlbHBCdXR0b25DbGlja19GdW5jdGlvbmY6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5jb21fSGVscC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+WFs+mXreW4ruWKqeeVjOmdolxyXG4gICAgICovXHJcbiAgICBoZWxwTWVudUNsb3NlQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikuY29tX0hlbHAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye756a75byA5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIGV4aXRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Zyo5ri45oiP5Lit77yM5aaC5p6c5Zyo5ri45oiP5Lit77yM5YiZ5omT5byA56a75byA5o+Q56S655WM6Z2iXHJcbiAgICAgICAgLy8gaWYodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5pc0dhbWluZylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikuYmdfQmxhY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5jb21fRXhpdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmV4aXRHYW1lX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikubmV0V29yay5ncmFiQnVsbFNvY2tldC5lbWl0KFwiTG9nb3V0Um9vbVwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmnInniZvmjInpkq5cclxuICAgICAqL1xyXG4gICAgZ2V0QnVsbEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5zZXRCdWxsUG9pbnRfRnVuY3Rpb24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmlaPniYzmjInpkq5cclxuICAgICAqL1xyXG4gICAgbm9CdWxsQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5zZXJ2ZXJQb2ludCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLm5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQuZW1pdChcInNob3dcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJidF9HZXRCdWxsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwiYnRfTm90QnVsbFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2VCb3hDb25maXJtQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2VCb3hSZWNvbm5lY3RCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikuY29tX01lc3NhZ2VCb3guYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vlhbPpl63nprvlvIDmj5DnpLrnlYzpnaJcclxuICAgICAqL1xyXG4gICAgZXhpdE1lbnVDYW5jZWxCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbE1haW5cIikuYmdfQmxhY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdyYWJCdWxsTWFpblwiKS5jb21fRXhpdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLm5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQuZW1pdChcIkxvZ291dFJvb21cIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75by66KGM6YCA5Ye65ri45oiP5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIGV4aXRNZW51Rm9yY2VFeGl0QnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxNYWluXCIpLmV4aXRHYW1lX0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2tDbG9zZUJkKGUsIHYpIHtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvY29tX2luZ2FtZV90aXBzJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2tFeGl0KGUsIHYpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh2KTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvY29tX2V4aXRfdGlwcycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh2ID09ICdleGl0Jykge1xyXG4gICAgICAgICAgICB0aGlzLmV4aXRCdXR0b25DbGlja19GdW5jdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pOyJdfQ==