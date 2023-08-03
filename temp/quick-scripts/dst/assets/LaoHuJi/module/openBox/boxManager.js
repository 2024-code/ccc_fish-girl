
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/openBox/boxManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '33229a/fi1C6qZJASzwz7Zg', 'boxManager');
// LaoHuJi/module/openBox/boxManager.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    _bonusSum: 0,
    //总奖金
    _times: 0,
    //分几次开
    _bonusArray: [],
    //每次开奖的奖金
    _openCount: 0,
    //已经点击打开的宝箱计数
    _showCount: 0,
    //已经显示奖金的宝箱计数
    PanelMask: {
      "default": null,
      type: cc.Node,
      tooltip: "遮罩面板"
    },
    Countdown: {
      "default": 10,
      tooltip: "界面销毁倒计时(秒)"
    },
    LabelCountdown: {
      "default": null,
      type: cc.Label,
      tooltip: "倒计时Label数字"
    },
    LabelWinCoins: {
      "default": null,
      type: cc.Label,
      tooltip: "中奖金额"
    },
    LabelRemainOpenCount: {
      "default": null,
      type: cc.Label,
      tooltip: "剩余开奖次数"
    },
    _totalWinCoins: 0
  },
  start: function start() {
    var self = this;
    this.node.on('Event_OpenBox', function (event) {
      event.stopPropagation(); //停止传递当前事件
      //播放音效

      event.detail.string = self._bonusArray[self._showCount]; //显示奖金

      self._totalWinCoins += self._bonusArray[self._showCount]; //总金额累加

      self.LabelWinCoins.string = self._totalWinCoins; //显示总金额

      self._showCount++; //增加计数
    });
    this.RefreshLabel_RemainOpenCount(); //刷新剩余开奖次数文字
  },
  update: function update(dt) {
    this.Countdown -= dt;
    this.LabelCountdown.string = Math.round(this.Countdown); //显示倒计时

    if (this.Countdown < 0) {
      this.onBtnClick_close(); //关闭界面
    }
  },
  SetData: function SetData(bonusSum, times) {
    if (times <= 0) return;
    this._bonusSum = bonusSum;
    this._times = times;
    var remain = this._bonusSum;
    this._bonusArray = new Array(this._times);

    for (var i = 0; i < this._times - 1; i++) {
      var random = Math.round(Math.random() * remain);
      this._bonusArray[i] = random;
      remain -= random;
    }

    this._bonusArray[this._times - 1] = remain;
  },
  //关闭界面
  onBtnClick_close: function onBtnClick_close() {
    //console.log('关闭宝箱界面');
    this.node.active = false;
    this.node.destroy();
  },
  //点击宝箱
  onBtnClick_openBox: function onBtnClick_openBox() {
    this._openCount++;
    this.RefreshLabel_RemainOpenCount(); //刷新剩余开奖次数文字

    if (this._openCount === this._times) {
      this.PanelMask.active = true; //禁止界面交互
    }
  },
  //刷新剩余开奖次数文字
  RefreshLabel_RemainOpenCount: function RefreshLabel_RemainOpenCount() {
    this.LabelRemainOpenCount.string = this._times - this._openCount;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxvcGVuQm94XFxib3hNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiX2JvbnVzU3VtIiwiX3RpbWVzIiwiX2JvbnVzQXJyYXkiLCJfb3BlbkNvdW50IiwiX3Nob3dDb3VudCIsIlBhbmVsTWFzayIsInR5cGUiLCJOb2RlIiwidG9vbHRpcCIsIkNvdW50ZG93biIsIkxhYmVsQ291bnRkb3duIiwiTGFiZWwiLCJMYWJlbFdpbkNvaW5zIiwiTGFiZWxSZW1haW5PcGVuQ291bnQiLCJfdG90YWxXaW5Db2lucyIsInN0YXJ0Iiwic2VsZiIsIm5vZGUiLCJvbiIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGV0YWlsIiwic3RyaW5nIiwiUmVmcmVzaExhYmVsX1JlbWFpbk9wZW5Db3VudCIsInVwZGF0ZSIsImR0IiwiTWF0aCIsInJvdW5kIiwib25CdG5DbGlja19jbG9zZSIsIlNldERhdGEiLCJib251c1N1bSIsInRpbWVzIiwicmVtYWluIiwiQXJyYXkiLCJpIiwicmFuZG9tIiwiYWN0aXZlIiwiZGVzdHJveSIsIm9uQnRuQ2xpY2tfb3BlbkJveCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRSxDQURIO0FBQ0s7QUFDYkMsSUFBQUEsTUFBTSxFQUFFLENBRkE7QUFFRTtBQUNWQyxJQUFBQSxXQUFXLEVBQUUsRUFITDtBQUdRO0FBQ2hCQyxJQUFBQSxVQUFVLEVBQUUsQ0FKSjtBQUlNO0FBQ2RDLElBQUFBLFVBQVUsRUFBRSxDQUxKO0FBS007QUFDZEMsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQQyxNQUFBQSxJQUFJLEVBQUVWLEVBQUUsQ0FBQ1cs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QytCLE1BQXBDO0FBQ0gsR0F0RUk7QUF3RUw7QUFDQUosRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQVk7QUFDMUI7QUFDQSxTQUFLWCxJQUFMLENBQVVtQixNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS25CLElBQUwsQ0FBVW9CLE9BQVY7QUFDSCxHQTdFSTtBQStFTDtBQUNBQyxFQUFBQSxrQkFBa0IsRUFBRSw4QkFBWTtBQUM1QixTQUFLbkMsVUFBTDtBQUNBLFNBQUtvQiw0QkFBTCxHQUY0QixDQUVROztBQUNwQyxRQUFJLEtBQUtwQixVQUFMLEtBQW9CLEtBQUtGLE1BQTdCLEVBQXFDO0FBQ2pDLFdBQUtJLFNBQUwsQ0FBZStCLE1BQWYsR0FBd0IsSUFBeEIsQ0FEaUMsQ0FDSjtBQUNoQztBQUNKLEdBdEZJO0FBd0ZMO0FBQ0FiLEVBQUFBLDRCQUE0QixFQUFFLHdDQUFZO0FBQ3RDLFNBQUtWLG9CQUFMLENBQTBCUyxNQUExQixHQUFtQyxLQUFLckIsTUFBTCxHQUFjLEtBQUtFLFVBQXREO0FBQ0g7QUEzRkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfYm9udXNTdW06IDAsLy/mgLvlpZbph5FcclxuICAgICAgICBfdGltZXM6IDAsLy/liIblh6DmrKHlvIBcclxuICAgICAgICBfYm9udXNBcnJheTogW10sLy/mr4/mrKHlvIDlpZbnmoTlpZbph5FcclxuICAgICAgICBfb3BlbkNvdW50OiAwLC8v5bey57uP54K55Ye75omT5byA55qE5a6d566x6K6h5pWwXHJcbiAgICAgICAgX3Nob3dDb3VudDogMCwvL+W3sue7j+aYvuekuuWllumHkeeahOWuneeuseiuoeaVsFxyXG4gICAgICAgIFBhbmVsTWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIumBrue9qemdouadv1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQ291bnRkb3duOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIueVjOmdoumUgOavgeWAkuiuoeaXtijnp5IpXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBMYWJlbENvdW50ZG93bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLlgJLorqHml7ZMYWJlbOaVsOWtl1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTGFiZWxXaW5Db2luczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLkuK3lpZbph5Hpop1cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIExhYmVsUmVtYWluT3BlbkNvdW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuWJqeS9meW8gOWlluasoeaVsFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3RvdGFsV2luQ29pbnM6IDAsXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbignRXZlbnRfT3BlbkJveCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsvL+WBnOatouS8oOmAkuW9k+WJjeS6i+S7tlxyXG4gICAgICAgICAgICAvL+aSreaUvumfs+aViFxyXG4gICAgICAgICAgICBldmVudC5kZXRhaWwuc3RyaW5nID0gc2VsZi5fYm9udXNBcnJheVtzZWxmLl9zaG93Q291bnRdOy8v5pi+56S65aWW6YeRXHJcbiAgICAgICAgICAgIHNlbGYuX3RvdGFsV2luQ29pbnMgKz0gc2VsZi5fYm9udXNBcnJheVtzZWxmLl9zaG93Q291bnRdOy8v5oC76YeR6aKd57Sv5YqgXHJcbiAgICAgICAgICAgIHNlbGYuTGFiZWxXaW5Db2lucy5zdHJpbmcgPSBzZWxmLl90b3RhbFdpbkNvaW5zOy8v5pi+56S65oC76YeR6aKdXHJcbiAgICAgICAgICAgIHNlbGYuX3Nob3dDb3VudCsrOy8v5aKe5Yqg6K6h5pWwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5SZWZyZXNoTGFiZWxfUmVtYWluT3BlbkNvdW50KCk7Ly/liLfmlrDliankvZnlvIDlpZbmrKHmlbDmloflrZdcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB0aGlzLkNvdW50ZG93biAtPSBkdDtcclxuICAgICAgICB0aGlzLkxhYmVsQ291bnRkb3duLnN0cmluZyA9IE1hdGgucm91bmQodGhpcy5Db3VudGRvd24pOy8v5pi+56S65YCS6K6h5pe2XHJcbiAgICAgICAgaWYgKHRoaXMuQ291bnRkb3duIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQnRuQ2xpY2tfY2xvc2UoKTsvL+WFs+mXreeVjOmdolxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2V0RGF0YTogZnVuY3Rpb24gKGJvbnVzU3VtLCB0aW1lcykge1xyXG4gICAgICAgIGlmICh0aW1lcyA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fYm9udXNTdW0gPSBib251c1N1bTtcclxuICAgICAgICB0aGlzLl90aW1lcyA9IHRpbWVzO1xyXG5cclxuICAgICAgICB2YXIgcmVtYWluID0gdGhpcy5fYm9udXNTdW07XHJcbiAgICAgICAgdGhpcy5fYm9udXNBcnJheSA9IG5ldyBBcnJheSh0aGlzLl90aW1lcyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl90aW1lcyAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogcmVtYWluKTtcclxuICAgICAgICAgICAgdGhpcy5fYm9udXNBcnJheVtpXSA9IHJhbmRvbTtcclxuICAgICAgICAgICAgcmVtYWluIC09IHJhbmRvbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYm9udXNBcnJheVt0aGlzLl90aW1lcyAtIDFdID0gcmVtYWluO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFs+mXreeVjOmdolxyXG4gICAgb25CdG5DbGlja19jbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ+WFs+mXreWuneeuseeVjOmdoicpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+eCueWHu+WuneeusVxyXG4gICAgb25CdG5DbGlja19vcGVuQm94OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fb3BlbkNvdW50Kys7XHJcbiAgICAgICAgdGhpcy5SZWZyZXNoTGFiZWxfUmVtYWluT3BlbkNvdW50KCk7Ly/liLfmlrDliankvZnlvIDlpZbmrKHmlbDmloflrZdcclxuICAgICAgICBpZiAodGhpcy5fb3BlbkNvdW50ID09PSB0aGlzLl90aW1lcykge1xyXG4gICAgICAgICAgICB0aGlzLlBhbmVsTWFzay5hY3RpdmUgPSB0cnVlOy8v56aB5q2i55WM6Z2i5Lqk5LqSXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIt+aWsOWJqeS9meW8gOWlluasoeaVsOaWh+Wtl1xyXG4gICAgUmVmcmVzaExhYmVsX1JlbWFpbk9wZW5Db3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuTGFiZWxSZW1haW5PcGVuQ291bnQuc3RyaW5nID0gdGhpcy5fdGltZXMgLSB0aGlzLl9vcGVuQ291bnQ7XHJcbiAgICB9LFxyXG59KTsiXX0=