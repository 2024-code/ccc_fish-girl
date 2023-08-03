
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game_hongbao/HongBaoButtonClick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e9cd8sertlIKJxAd4lx1/GI', 'HongBaoButtonClick');
// Script/game_hongbao/HongBaoButtonClick.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.netWork = require("HongBaoNetWork").getInstant;
    this.pInfo = require("PlayerInfo").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {},
  //打开发红包
  onClick_openSendHbPanel: function onClick_openSendHbPanel() {
    this.gameMain.open_panel("发红包");
  },
  onClick_closeSendHbPanel: function onClick_closeSendHbPanel() {
    this.gameMain.close_panel("发红包");
  },
  //关闭领红包
  onClick_closegetHbPanel: function onClick_closegetHbPanel() {
    this.gameMain.close_panel("开始抢红包");
  },
  //关闭抢到红包
  onClick_closeSuccessHbPanel: function onClick_closeSuccessHbPanel() {
    this.gameMain.close_panel("抢到红包");
  },
  //关闭未抢到红包
  onClick_closeLoseHbPanel: function onClick_closeLoseHbPanel() {
    this.gameMain.close_panel("未抢到红包");
  },
  //关闭红包详情
  onClick_closeHbDetailPanel: function onClick_closeHbDetailPanel() {
    this.gameMain.close_hbDetail();
  },
  //发红包
  onClick_sendHb: function onClick_sendHb() {
    this.gameMain.close_panel("发红包");
    this.netWork.gameSocket.emit("sendHb", {
      money: this.gameMain.nowPrice,
      //红包钱数
      nickname: this.pInfo.playerName //用户名

    });
  },
  //领红包
  onClick_getHb: function onClick_getHb() {
    // this.gameMain.close_panel("发红包");
    this.netWork.gameSocket.emit("getHb", {
      hbId: this.gameMain.nowHbId //红包id

    });
  },
  onClick_QuitGame: function onClick_QuitGame() {
    if (this.netWork.socket_io) this.netWork.socket_io.disconnect();
    cc.director.loadScene("LobbyMain");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lX2hvbmdiYW9cXEhvbmdCYW9CdXR0b25DbGljay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm5ldFdvcmsiLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInBJbmZvIiwiZ2FtZU1haW4iLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwic3RhcnQiLCJvbkNsaWNrX29wZW5TZW5kSGJQYW5lbCIsIm9wZW5fcGFuZWwiLCJvbkNsaWNrX2Nsb3NlU2VuZEhiUGFuZWwiLCJjbG9zZV9wYW5lbCIsIm9uQ2xpY2tfY2xvc2VnZXRIYlBhbmVsIiwib25DbGlja19jbG9zZVN1Y2Nlc3NIYlBhbmVsIiwib25DbGlja19jbG9zZUxvc2VIYlBhbmVsIiwib25DbGlja19jbG9zZUhiRGV0YWlsUGFuZWwiLCJjbG9zZV9oYkRldGFpbCIsIm9uQ2xpY2tfc2VuZEhiIiwiZ2FtZVNvY2tldCIsImVtaXQiLCJtb25leSIsIm5vd1ByaWNlIiwibmlja25hbWUiLCJwbGF5ZXJOYW1lIiwib25DbGlja19nZXRIYiIsImhiSWQiLCJub3dIYklkIiwib25DbGlja19RdWl0R2FtZSIsInNvY2tldF9pbyIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBQyxFQUFBQSxNQVRLLG9CQVNJO0FBQ0wsU0FBS0MsT0FBTCxHQUFlQyxPQUFPLENBQUMsZ0JBQUQsQ0FBUCxDQUEwQkMsVUFBekM7QUFDQSxTQUFLQyxLQUFMLEdBQWFGLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQW5DO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQlQsRUFBRSxDQUFDVSxJQUFILENBQVEsUUFBUixFQUFrQkMsWUFBbEIsQ0FBK0IsYUFBL0IsQ0FBaEI7QUFDSCxHQWJJO0FBZUxDLEVBQUFBLEtBZkssbUJBZUcsQ0FFUCxDQWpCSTtBQW1CTDtBQUNBQyxFQUFBQSx1QkFwQksscUNBb0JxQjtBQUN0QixTQUFLSixRQUFMLENBQWNLLFVBQWQsQ0FBeUIsS0FBekI7QUFDSCxHQXRCSTtBQXdCTEMsRUFBQUEsd0JBeEJLLHNDQXdCc0I7QUFDdkIsU0FBS04sUUFBTCxDQUFjTyxXQUFkLENBQTBCLEtBQTFCO0FBQ0gsR0ExQkk7QUEyQkw7QUFDQUMsRUFBQUEsdUJBNUJLLHFDQTRCcUI7QUFDdEIsU0FBS1IsUUFBTCxDQUFjTyxXQUFkLENBQTBCLE9BQTFCO0FBQ0gsR0E5Qkk7QUErQkw7QUFDQUUsRUFBQUEsMkJBaENLLHlDQWdDeUI7QUFDMUIsU0FBS1QsUUFBTCxDQUFjTyxXQUFkLENBQTBCLE1BQTFCO0FBQ0gsR0FsQ0k7QUFtQ0w7QUFDQUcsRUFBQUEsd0JBcENLLHNDQW9Dc0I7QUFDdkIsU0FBS1YsUUFBTCxDQUFjTyxXQUFkLENBQTBCLE9BQTFCO0FBQ0gsR0F0Q0k7QUF1Q0w7QUFDQUksRUFBQUEsMEJBeENLLHdDQXdDd0I7QUFDekIsU0FBS1gsUUFBTCxDQUFjWSxjQUFkO0FBQ0gsR0ExQ0k7QUEyQ0w7QUFDQUMsRUFBQUEsY0E1Q0ssNEJBNENZO0FBQ2IsU0FBS2IsUUFBTCxDQUFjTyxXQUFkLENBQTBCLEtBQTFCO0FBQ0EsU0FBS1gsT0FBTCxDQUFha0IsVUFBYixDQUF3QkMsSUFBeEIsQ0FBNkIsUUFBN0IsRUFBdUM7QUFDbkNDLE1BQUFBLEtBQUssRUFBRSxLQUFLaEIsUUFBTCxDQUFjaUIsUUFEYztBQUNKO0FBQy9CQyxNQUFBQSxRQUFRLEVBQUUsS0FBS25CLEtBQUwsQ0FBV29CLFVBRmMsQ0FFRjs7QUFGRSxLQUF2QztBQUlILEdBbERJO0FBbURMO0FBQ0FDLEVBQUFBLGFBcERLLDJCQW9EVztBQUNaO0FBQ0EsU0FBS3hCLE9BQUwsQ0FBYWtCLFVBQWIsQ0FBd0JDLElBQXhCLENBQTZCLE9BQTdCLEVBQXNDO0FBQ2xDTSxNQUFBQSxJQUFJLEVBQUUsS0FBS3JCLFFBQUwsQ0FBY3NCLE9BRGMsQ0FDTDs7QUFESyxLQUF0QztBQUdILEdBekRJO0FBMkRMQyxFQUFBQSxnQkEzREssOEJBMkRjO0FBQ2YsUUFBSSxLQUFLM0IsT0FBTCxDQUFhNEIsU0FBakIsRUFDSSxLQUFLNUIsT0FBTCxDQUFhNEIsU0FBYixDQUF1QkMsVUFBdkI7QUFFSmxDLElBQUFBLEVBQUUsQ0FBQ21DLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixXQUF0QjtBQUNIO0FBaEVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5ldFdvcmsgPSByZXF1aXJlKFwiSG9uZ0Jhb05ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLnBJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLmdhbWVNYWluID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdIb25nQmFvTWFpbicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5omT5byA5Y+R57qi5YyFXHJcbiAgICBvbkNsaWNrX29wZW5TZW5kSGJQYW5lbCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVNYWluLm9wZW5fcGFuZWwoXCLlj5HnuqLljIVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2tfY2xvc2VTZW5kSGJQYW5lbCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVNYWluLmNsb3NlX3BhbmVsKFwi5Y+R57qi5YyFXCIpO1xyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet6aKG57qi5YyFXHJcbiAgICBvbkNsaWNrX2Nsb3NlZ2V0SGJQYW5lbCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVNYWluLmNsb3NlX3BhbmVsKFwi5byA5aeL5oqi57qi5YyFXCIpO1xyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5oqi5Yiw57qi5YyFXHJcbiAgICBvbkNsaWNrX2Nsb3NlU3VjY2Vzc0hiUGFuZWwoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFpbi5jbG9zZV9wYW5lbChcIuaKouWIsOe6ouWMhVwiKTtcclxuICAgIH0sXHJcbiAgICAvL+WFs+mXreacquaKouWIsOe6ouWMhVxyXG4gICAgb25DbGlja19jbG9zZUxvc2VIYlBhbmVsKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZU1haW4uY2xvc2VfcGFuZWwoXCLmnKrmiqLliLDnuqLljIVcIik7XHJcbiAgICB9LFxyXG4gICAgLy/lhbPpl63nuqLljIXor6bmg4VcclxuICAgIG9uQ2xpY2tfY2xvc2VIYkRldGFpbFBhbmVsKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZU1haW4uY2xvc2VfaGJEZXRhaWwoKTtcclxuICAgIH0sXHJcbiAgICAvL+WPkee6ouWMhVxyXG4gICAgb25DbGlja19zZW5kSGIoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFpbi5jbG9zZV9wYW5lbChcIuWPkee6ouWMhVwiKTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZ2FtZVNvY2tldC5lbWl0KFwic2VuZEhiXCIsIHtcclxuICAgICAgICAgICAgbW9uZXk6IHRoaXMuZ2FtZU1haW4ubm93UHJpY2UsIC8v57qi5YyF6ZKx5pWwXHJcbiAgICAgICAgICAgIG5pY2tuYW1lOiB0aGlzLnBJbmZvLnBsYXllck5hbWUsIC8v55So5oi35ZCNXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/poobnuqLljIVcclxuICAgIG9uQ2xpY2tfZ2V0SGIoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5nYW1lTWFpbi5jbG9zZV9wYW5lbChcIuWPkee6ouWMhVwiKTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZ2FtZVNvY2tldC5lbWl0KFwiZ2V0SGJcIiwge1xyXG4gICAgICAgICAgICBoYklkOiB0aGlzLmdhbWVNYWluLm5vd0hiSWQsIC8v57qi5YyFaWRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGlja19RdWl0R2FtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXRXb3JrLnNvY2tldF9pbylcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLnNvY2tldF9pby5kaXNjb25uZWN0KCk7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==