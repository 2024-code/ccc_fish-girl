
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Xiyouji/js/XYJMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c9cc9sBWPNFtajwy8kwmQ1x', 'XYJMain');
// Texture/Slot_Xiyouji/js/XYJMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 600; //单注值

var LINES = 243; //线数

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
    this.net = this.node.getComponent('XYJNetwork');
    this.audio = this.node.getComponent('XYJAudio');
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
    } else if (args == 'freeType1') {
      if (this.freeTimes > 0) {
        return;
      }

      this.net.socket.emit('freeTimeType', JSON.stringify({
        type: 1
      }));
    } else if (args == 'freeType2') {
      if (this.freeTimes > 0) {
        return;
      }

      this.net.socket.emit('freeTimeType', JSON.stringify({
        type: 2
      }));
    } else if (args == 'freeType3') {
      if (this.freeTimes > 0) {
        return;
      }

      this.net.socket.emit('freeTimeType', JSON.stringify({
        type: 3
      }));
    } else if (args == 'freeType4') {
      if (this.freeTimes > 0) {
        return;
      }

      this.net.socket.emit('freeTimeType', JSON.stringify({
        type: 4
      }));
    } else if (args == 'freeType5') {
      if (this.freeTimes > 0) {
        return;
      }

      this.net.socket.emit('freeTimeType', JSON.stringify({
        type: 5
      }));
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
        this.bIsFreeGame = true;

        if (this.lotteryRes.viewarray.getFreeTime.nFreeType == 0) {
          this.auto = false;
          this.scheduleOnce(function () {
            _this3.freeBeginNode.active = true;
          }, 2);
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

    if (this.freeTimes <= 0) {
      return;
    }

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
  setTypeResult: function setTypeResult(data) {
    if (data.type > 0) {
      this.freeBeginNode.active = false;
      this.freeTimes = data.freeCount;
      this.closeShine();
      this.startFreeGame();
    }
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
    var sendData = JSON.stringify({
      bet: this.bet,
      nBetList: [BET[this.bet] * BETNUM]
    });
    console.log("sendRoll ====>", sendData);
    this.net.socket.emit('lottery', sendData);
    this.gameState = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9YaXlvdWppXFxqc1xcWFlKTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJhdWRpb0J0biIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJkZWxheUNsaWNrIiwidHVybk51bSIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInNwcml0ZUZyYW1lIiwicGxheWVyTmFtZSIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwib25DTGljayIsImV2ZW50IiwiYXJncyIsImdldFNwcml0ZUZyYW1lIiwic2VuZFJvbGwiLCJwbGF5Iiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJhY3RpdmUiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhjaGFuZ2VSYXRlIiwiaSIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwicGxheVdpbkFuaW0iLCJuRnJlZVR5cGUiLCJuRnJlZVRpbWUiLCJ0bSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbG9zZVNoaW5lIiwiY2xzb2VBbmltIiwicGFyc2VJbnQiLCJqIiwic2hvd0FuaW0iLCJmTXVsdGlwbGUiLCJzdG9wRnJlZVRpbWVzIiwic3RhcnRGcmVlR2FtZSIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJzZXRUeXBlUmVzdWx0IiwiZGF0YSIsImZyZWVDb3VudCIsImNvbHMiLCJpbmRleCIsImJlaXNodSIsInBsYXlCVyIsInJvbGVJZExpc3QiLCJyb2xlUGJMaXN0IiwicGxheUFuaW0iLCJub2RlTGlzdCIsImNoaWxkcmVuIiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQi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QUFMO0FBQ0EsUUFBSStCLFFBQVEsR0FBRzNELElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQzFCbEQsTUFBQUEsR0FBRyxFQUFFLEtBQUtBLEdBRGdCO0FBRTFCNkcsTUFBQUEsUUFBUSxFQUFFLENBQUMxSixHQUFHLENBQUMsS0FBSzZDLEdBQU4sQ0FBSCxHQUFnQmhELE1BQWpCO0FBRmdCLEtBQWYsQ0FBZjtBQUlBcUksSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVosRUFBOEJzQixRQUE5QjtBQUNBLFNBQUtqSCxHQUFMLENBQVM4QyxNQUFULENBQWdCTyxJQUFoQixDQUFxQixTQUFyQixFQUFnQzRELFFBQWhDO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixDQUFqQjtBQUNILEdBMWdCSTtBQTRnQkx6RSxFQUFBQSxlQTVnQkssNkJBNGdCYTtBQUNkLFFBQUksQ0FBQyxLQUFLcEMsSUFBVixFQUFnQjtBQUNaLFdBQUssSUFBSW1ELENBQVQsSUFBYyxLQUFLckQsU0FBbkIsRUFBOEI7QUFDMUIsYUFBS0EsU0FBTCxDQUFlcUQsQ0FBZixFQUFrQmYsZUFBbEI7QUFDSDtBQUNKO0FBQ0o7QUFsaEJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJFVE5VTSA9IDYwMDsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSAyNDM7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aOw6Z+z5oyJ6ZKuJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnWFlKTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdYWUpBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHVybk51bSA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BVc2VyRmFjZS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGJsVXNlck5hbWUuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sbEJ0bkFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhZGQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IEJFVC5sZW5ndGggPyBCRVQubGVuZ3RoIC0gMSA6IHRoaXMuYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZGVjJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSAwID8gdGhpcy5iZXQgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VCaWdXaW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTEnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiAxIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2ZyZWVUeXBlMicpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdmcmVlVGltZVR5cGUnLCBKU09OLnN0cmluZ2lmeSh7IHR5cGU6IDIgfSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZnJlZVR5cGUzJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2ZyZWVUaW1lVHlwZScsIEpTT04uc3RyaW5naWZ5KHsgdHlwZTogMyB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiA0IH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2ZyZWVUeXBlNScpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdmcmVlVGltZVR5cGUnLCBKU09OLnN0cmluZ2lmeSh7IHR5cGU6IDUgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmV0KCkge1xyXG4gICAgICAgIHRoaXMubGJsQmV0LnN0cmluZyA9IChCRVROVU0gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMubGJsQ3VyQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy51c2Vyc2NvcmUgLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR1cm5OdW0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKHRoaXMudHVybk51bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUeXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheVdpbkFuaW0odG0pIHtcclxuICAgICAgICAvL+WKqOeUu+e7k+adn+WQjuiHquWKqHJvbGxcclxuICAgICAgICBsZXQgaGFzV2luQm9vbCA9IDA7XHJcbiAgICAgICAgbGV0IGFsbExpbmUgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcIndpbl9jblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzA7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvbjFcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTsvL+S/ruaUuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSksIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZk11bHRpcGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0bSAhPSB0aGlzLnR1cm5OdW0pIHsvL+S4jeaYr+W9k+WJjeaXi+i9rOi9ruasoeWImei3s+i/h+WQjue7reaTjeS9nFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuZnJlZVRpbWVzID09IDAgJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaGFzV2luQm9vbCA+IDAgPyBoYXNXaW5Cb29sICogMyA6IDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSgnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAvLyB9LCAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEZyZWVUaW1lcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BGcmVlVGltZXMgZnJlZUdhbWVDb2luIDogXCIsIHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUeXBlUmVzdWx0KGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gZGF0YS5mcmVlQ291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3QpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgbGV0IHNlbmREYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU1dXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRSb2xsID09PT0+XCIsIHNlbmREYXRhKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIHNlbmREYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IDE7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG59KTsiXX0=