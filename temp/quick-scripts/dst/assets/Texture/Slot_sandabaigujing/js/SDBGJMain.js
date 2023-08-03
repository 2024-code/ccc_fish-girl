
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_sandabaigujing/js/SDBGJMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f524aPFyLdPxZD4GoSG0l15', 'SDBGJMain');
// Texture/Slot_sandabaigujing/js/SDBGJMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 180; //单注值

var LINES = 18; //线数

var TOPBET = [30, 1000, 100, 10];
var BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
cc.Class({
  "extends": cc.Component,
  properties: {
    spUserFace: {
      "default": null,
      type: cc.Sprite,
      displayName: '用户头像'
    },
    lblUserName: {
      "default": null,
      type: cc.Label,
      displayName: '用户名'
    },
    lblUserCoin: {
      "default": null,
      type: cc.Label,
      displayName: '用户金币'
    },
    lblBet: {
      "default": null,
      type: cc.Label,
      displayName: '单注'
    },
    lblLines: {
      "default": null,
      type: cc.Label,
      displayName: '线数'
    },
    lblCurBet: {
      "default": null,
      type: cc.Label,
      displayName: '本局总注'
    },
    lblWinCoin: {
      "default": null,
      type: cc.Label,
      displayName: '本局赢得'
    },
    lblCoinList: {
      "default": [],
      type: cc.Label,
      displayName: '列倍率显示'
    },
    rollBtnAnim: {
      "default": null,
      type: cc.Animation,
      displayName: 'roll按钮动画'
    },
    rolePb: {
      "default": [],
      type: cc.Prefab,
      displayName: '滚轮角色Pb'
    },
    spAtlas: {
      "default": null,
      type: cc.SpriteAtlas,
      displayName: '图集'
    },
    autoBtn: {
      "default": null,
      type: cc.Sprite,
      displayName: '自动按钮Sprite'
    },
    effectAnimPr: {
      "default": null,
      type: cc.Node,
      displayName: '中奖特效'
    },
    effectAnimFullA: {
      "default": null,
      type: cc.Node,
      displayName: '中奖全屏特效A'
    },
    effectAnimFullB: {
      "default": null,
      type: cc.Node,
      displayName: '中奖全屏特效B'
    },
    effectAnimBigFull: {
      "default": null,
      type: cc.Node,
      displayName: '中大奖全屏特效'
    },
    BgNode: {
      "default": null,
      type: cc.Node,
      displayName: '游戏背景节点'
    },
    //免费次数有关
    freeBgNode: {
      "default": null,
      type: cc.Node,
      displayName: '免费摇奖背景节点'
    },
    freeBeginNode: {
      "default": null,
      type: cc.Node,
      displayName: '开始免费摇奖节点'
    },
    freeEndNode: {
      "default": null,
      type: cc.Node,
      displayName: '结束免费摇奖节点'
    },
    freeTimesNode: {
      "default": null,
      type: cc.Node,
      displayName: '免费摇奖显示节点'
    },
    helpUI: {
      "default": null,
      type: cc.Node,
      displayName: 'help界面'
    },
    audioBtn: {
      "default": null,
      type: cc.Sprite,
      displayName: '声音按钮'
    }
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.net = this.node.getComponent('SDBGJNetwork');
    this.audio = this.node.getComponent('SDBGJAudio');
    this.wheelList = [];
    this.bet = 0;
    this.auto = false;
    this.status = 0;
    this.bigWinResList = [3, 1, 2];
    this.bigWinCard = 0;
    this.bigWinCoin = 0;
    this.bigWinBoo = false;
    this.freeTimes = 0;
    this.rollResult = [];
    this.rollIndex = 0;
    this.lotteryRes = null;
    this.stopFree = false;
    this.freeGameCoin = 0;
    this.bIsFreeGame = false;
    this.delayClick = false;
    this.turnNum = 0;
  },
  start: function start() {
    var _this = this;

    this.lblLines.string = LINES;
    this.lblWinCoin.string = '0.00';
    this.setBet();
    Helper.loadHead(this.playerInfo.playerHeadId, function (sp) {
      _this.spUserFace.spriteFrame = sp;
    });
    this.lblUserName.string = this.playerInfo.playerName;
    this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
  },
  onCLick: function onCLick(event, args) {
    var _this2 = this;

    if (args == 'auto') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
        return;
      }

      this.auto = !this.auto;
      this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');

      if (this.auto && this.status == 0) {
        this.sendRoll();
      }
    } else if (args == 'roll') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
        return;
      }

      if (!this.auto) {
        if (this.status == 0) {
          this.rollBtnAnim.play();
          this.status = 2;
          this.sendRoll();
        } else if (this.status == 1) {
          if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
            return;
          }

          this.delayClick = true;
          this.scheduleOnce(function () {
            _this2.delayClick = false;
          }, 1);
          this.stopImmediately();
        }
      }
    } else if (args == 'add') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
        return;
      }

      this.bet += 1;
      this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
      this.setBet();
    } else if (args == 'dec') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
        return;
      }

      this.bet -= 1;
      this.bet = this.bet >= 0 ? this.bet : 0;
      this.setBet();
    } else if (args == 'closeBigWin') {
      this.audio.playBgm(0);
    } else if (args == 'help') {
      this.helpUI.active = true;
    } else if (args == 'closeHelp') {
      this.helpUI.active = false;
    } else if (args == 'exitGame') {
      this.net.socket.disconnect();
      cc.director.loadScene("LobbyMain");
    } else if (args == 'audio') {
      this.audio.pInfo.musicControl = !this.audio.pInfo.musicControl;
      this.audioBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.audio.pInfo.musicControl ? 'btn_sound' : 'btn_sound_2');

      if (!this.audio.pInfo.musicControl) {
        this.audio.stopAudio();
      } else {
        if (this.freeTimes > 0) {
          this.audio.playBgm(1);
        } else if (this.bigWinBoo) {
          this.audio.playBgm(2);
        } else {
          this.audio.playBgm(0);
        }
      }
    }
  },
  setBet: function setBet() {
    this.lblBet.string = (BETNUM / this.playerInfo.exchangeRate).toFixed(2);
    this.lblCurBet.string = (BET[this.bet] * BETNUM / this.playerInfo.exchangeRate).toFixed(2);

    for (var i in this.lblCoinList) {
      this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM / this.playerInfo.exchangeRate).toFixed(2);
    }
  },
  stateCallBack: function stateCallBack() {
    var _this3 = this;

    var st = 0;

    for (var i in this.wheelList) {
      if (this.wheelList[i].status) {
        st = 1;
        break;
      }
    }

    this.status = st;

    if (this.status == 0) {
      //结束当前轮盘
      var rIndex = this.rollIndex;
      this.lblUserCoin.string = (this.lotteryRes.userscore / this.playerInfo.exchangeRate).toFixed(2);
      this.lblWinCoin.string = (this.lotteryRes.winscore / this.playerInfo.exchangeRate).toFixed(2);

      if (this.bIsFreeGame) {
        this.freeGameCoin += this.lotteryRes.winscore;
      }

      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.turnNum += 1;

          _this3.playWinAnim(_this3.turnNum);
        }
      }, 1);

      if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
        if (this.freeTimes == 0) {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.freeBeginNode.active = true;
          this.scheduleOnce(function () {
            _this3.freeBeginNode.active = false;

            _this3.closeShine();

            _this3.startFreeGame();
          }, 5);
        } else {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.stopFree = false;
        }
      }
    }
  },
  playWinAnim: function playWinAnim(tm) {
    var _this4 = this;

    //动画结束后自动roll
    var hasWinBool = 0;
    var allLine = [];

    for (var i in this.lotteryRes.viewarray.nWinCards) {
      if (this.lotteryRes.viewarray.nWinCards[i]) {
        allLine.push(i);
      }
    }

    var lines = this.lotteryRes.viewarray.nWinLinesDetail;
    var rIndex = this.rollIndex;
    var list = this.freeTimes > 0 || this.stopFree ? [allLine] : [allLine].concat(lines);
    hasWinBool = list.length - 1;

    if (hasWinBool > 0) {
      //播放恭喜字样动画
      this.effectAnimFullA.active = true;
      this.effectAnimFullA.getComponent(sp.Skeleton).clearTrack(0);
      this.effectAnimFullA.getComponent(sp.Skeleton).setAnimation(0, "win_cn", false); //播放招财猫动画

      this.effectAnimFullB.active = true;
      var lbl_coin = this.effectAnimFullB.getChildByName("lbl_coin").getComponent(cc.Label);
      var addcoin = 0;
      this.schedule(function () {
        addcoin += _this4.lotteryRes.winscore / 30;

        if (addcoin > _this4.lotteryRes.winscore) {
          addcoin = _this4.lotteryRes.winscore;
        }

        lbl_coin.string = (addcoin / _this4.playerInfo.exchangeRate).toFixed(2);
      }, 0, 30, 0.01); //判断播放金币掉落动画

      if (this.lotteryRes.winscore > BET[this.bet] * BETNUM) {
        //如果大于100倍赌注，就播放bigFull动画
        this.effectAnimBigFull.active = true;
        this.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);
        this.effectAnimBigFull.getComponent(sp.Skeleton).setAnimation(0, "animation1", true);
      }
    }

    var animIndex = 0;
    this.schedule(function () {
      if (rIndex == _this4.rollIndex) {
        _this4.closeShine();

        for (var _i = 0; _i < 15; _i++) {
          _this4.clsoeAnim(_i % 5, parseInt(_i / 5));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          // this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));//修改
          _this4.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5), _this4.lotteryRes.viewarray.fMultiple);
        }

        animIndex++;
      }
    }, 3, list.length, 0.01);
    this.scheduleOnce(function () {
      if (tm != _this4.turnNum) {
        //不是当前旋转轮次则跳过后续操作
        return;
      }

      _this4.effectAnimFullA.active = false;
      _this4.effectAnimFullB.active = false;

      _this4.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);

      _this4.effectAnimBigFull.active = false;

      if (_this4.stopFree) {
        _this4.stopFree = false;

        _this4.stopFreeTimes();

        _this4.closeShine();
      }

      if (_this4.freeTimes > 0) {
        _this4.freeTimes--;
        _this4.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = _this4.freeTimes;

        if (_this4.freeTimes == 0) {
          _this4.stopFree = true;
        }

        _this4.auto && _this4.sendRoll();
      }

      if (rIndex == _this4.rollIndex) {
        _this4.auto && _this4.freeTimes == 0 && _this4.sendRoll();
      }
    }, hasWinBool > 0 ? hasWinBool * 3 : 1);
  },
  //免费次数有关
  startFreeGame: function startFreeGame() {
    console.log("startFreeGame");
    this.audio.playBgm(1);
    this.freeGameCoin = 0;
    this.BgNode.active = false;
    this.bIsFreeGame = true;
    this.freeBgNode.active = true;
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame('btn_zidong');

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i2 in this.wheelList) {
      this.wheelList[_i2].initWheel();
    }

    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes; // this.scheduleOnce(() => {

    this.auto = true;
    this.sendRoll(); // }, 2);
  },
  stopFreeTimes: function stopFreeTimes() {
    var _this5 = this;

    console.log("stopFreeTimes freeGameCoin : ", this.freeGameCoin);
    this.audio.playBgm(0);
    this.auto = false;

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = true;
    }

    for (var _i3 in this.wheelList) {
      this.wheelList[_i3].initWheel();
    }

    this.freeTimesNode.active = false;
    this.freeEndNode.active = true;
    this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = (this.freeGameCoin / this.playerInfo.exchangeRate).toFixed(2);
    this.scheduleOnce(function () {
      _this5.freeEndNode.active = false;
      _this5.BgNode.active = true;
      _this5.freeBgNode.active = false;
      _this5.bIsFreeGame = false;
    }, 2);
  },
  //0-5 0-2
  showAnim: function showAnim(cols, index, beishu) {
    this.audio.playBW();
    var length = this.wheelList[cols].roleIdList.length;
    this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").playAnim(); //添加

    if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu") && beishu > 1) {
      this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = true;
      this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").getComponent(cc.Label).string = "x" + beishu;
    } //添加结束


    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 3 + index].active = true;
    nodeList[cols * 3 + index].getComponent(cc.Animation).play();
  },
  clsoeAnim: function clsoeAnim(cols, index) {
    var length = this.wheelList[cols].roleIdList.length;
    this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").stopAnim(); //添加

    if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu")) {
      this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = false;
    } //添加结束


    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 3 + index].active = false;
  },
  checkRollData: function checkRollData(list) {
    for (var _iterator = _createForOfIteratorHelperLoose(list), _step; !(_step = _iterator()).done;) {
      var iterator = _step.value;

      if (iterator >= this.rolePb.length) {
        return false;
      }
    }

    return true;
  },
  roll: function roll(list) {
    if (!this.checkRollData(list)) {
      alert("\n            \u670D\u52A1\u5668\u83B7\u53D6\u7684\u82B1\u8272\u79CD\u7C7B\u5927\u4E8E\u73B0\u6709\u7684\u82B1\u8272\u79CD\u7C7B\uFF01\uFF01\uFF01\n            \u8BF7\u8054\u7CFB\u670D\u52A1\u5668\u4EBA\u5458\u8FDB\u884C\u6570\u636E\u8C03\u6574\uFF01");
      return;
    }

    this.status = 1;
    var line = [];

    for (var i = 0; i < 5; i++) {
      line[i] = [];
    }

    for (var _i4 in list) {
      line[_i4 % 5][2 - parseInt(_i4 / 5)] = list[_i4];
    }

    for (var _i5 in this.wheelList) {
      var _this$wheelList$_i;

      (_this$wheelList$_i = this.wheelList[_i5]).startRoll.apply(_this$wheelList$_i, line[_i5]);
    }
  },
  closeShine: function closeShine() {
    var nodeList = this.effectAnimPr.children;

    for (var i in nodeList) {
      nodeList[i].active = false;
    }

    this.effectAnimFullB.active = false;
  },
  sendRoll: function sendRoll() {
    this.rollIndex++;
    this.closeShine();
    this.net.socket.emit('lottery', JSON.stringify({
      bet: this.bet,
      nBetList: [BET[this.bet] * BETNUM]
    }));
  },
  stopImmediately: function stopImmediately() {
    if (!this.auto) {
      for (var i in this.wheelList) {
        this.wheelList[i].stopImmediately();
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9zYW5kYWJhaWd1amluZ1xcanNcXFNEQkdKTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJhdWRpb0J0biIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJkZWxheUNsaWNrIiwidHVybk51bSIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInNwcml0ZUZyYW1lIiwicGxheWVyTmFtZSIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwib25DTGljayIsImV2ZW50IiwiYXJncyIsImdldFNwcml0ZUZyYW1lIiwic2VuZFJvbGwiLCJwbGF5Iiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJhY3RpdmUiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsImV4Y2hhbmdlUmF0ZSIsImkiLCJzdGF0ZUNhbGxCYWNrIiwic3QiLCJySW5kZXgiLCJ1c2Vyc2NvcmUiLCJ3aW5zY29yZSIsInBsYXlXaW5BbmltIiwibkZyZWVUaW1lIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJ0bSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0IiwiY2hpbGRyZW4iLCJzdG9wQW5pbSIsImNoZWNrUm9sbERhdGEiLCJpdGVyYXRvciIsInJvbGwiLCJhbGVydCIsImxpbmUiLCJzdGFydFJvbGwiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5CZXRMaXN0Il0sIm1hcHBp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TSA9IDE4MDsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSAxODsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzMwLCAxMDAwLCAxMDAsIDEwXTtcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcFVzZXJGYWNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflpLTlg48nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlck5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35ZCNJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Y2V5rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbEJ0bkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JvbGzmjInpkq7liqjnlLsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuU3ByaXRlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUJpZ0Z1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpKflpZblhajlsY/nibnmlYgnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a4uOaIj+iDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgICAgICBmcmVlQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVCZWdpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflvIDlp4vlhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUVuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnu5PmnZ/lhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVUaW1lc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbmmL7npLroioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGF1ZGlvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflo7Dpn7PmjInpkq4nLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5uZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdTREJHSk5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnU0RCR0pBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHVybk51bSA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BVc2VyRmFjZS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGJsVXNlck5hbWUuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sbEJ0bkFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhZGQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IEJFVC5sZW5ndGggPyBCRVQubGVuZ3RoIC0gMSA6IHRoaXMuYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZGVjJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSAwID8gdGhpcy5iZXQgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VCaWdXaW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxCZXQuc3RyaW5nID0gKEJFVE5VTSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dXJuTnVtICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5V2luQW5pbSh0aGlzLnR1cm5OdW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKHRtKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLCBdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJ3aW5fY25cIixmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzA7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiYW5pbWF0aW9uMVwiLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzb2VBbmltKGkgJSA1LCBwYXJzZUludChpIC8gNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhIWxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSk7Ly/kv67mlLlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpLCB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmZNdWx0aXBsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMsIGxpc3QubGVuZ3RoLCAwLjAxKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodG0gIT0gdGhpcy50dXJuTnVtKSB7Ly/kuI3mmK/lvZPliY3ml4vovazova7mrKHliJnot7Pov4flkI7nu63mk43kvZxcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wRnJlZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLmZyZWVUaW1lcyA9PSAwICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGhhc1dpbkJvb2wgPiAwID8gaGFzV2luQm9vbCAqIDMgOiAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKCdidG5femlkb25nJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgIC8vIH0sIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIix0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sMik7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3Qpe1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSA1XVsyIC0gcGFyc2VJbnQoaSAvIDUpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgYmV0OiB0aGlzLmJldCxcclxuICAgICAgICAgICAgbkJldExpc3Q6IFtCRVRbdGhpcy5iZXRdICogQkVUTlVNXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==