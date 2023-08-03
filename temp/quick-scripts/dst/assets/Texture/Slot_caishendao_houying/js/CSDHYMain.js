
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_caishendao_houying/js/CSDHYMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b43f08MuBxERbev5rE0XY9M', 'CSDHYMain');
// Texture/Slot_caishendao_houying/js/CSDHYMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 2.5; //单注值

var LINES = 243; //线数

var TOPBET = [30, 1000, 100, 10];
var BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var RULELIST = [2, 0.2, 0.1, 1, 0.2, 0.1, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 3, 0.6, 0.2]; //规则

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
    helpNum: {
      "default": null,
      type: cc.Node,
      displayName: 'help界面可变注数'
    },
    audioBtn: {
      "default": null,
      type: cc.Sprite,
      displayName: '声音按钮'
    }
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.net = this.node.getComponent('CSDHYNetwork');
    this.audio = this.node.getComponent('CSDHYAudio');
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
      var hr = this.helpNum.children;

      for (var i in hr) {
        hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
      }
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
    this.lblBet.string = (BET[this.bet] * BETNUM).toFixed(2);
    this.lblCurBet.string = (BET[this.bet] * BETNUM).toFixed(2);

    for (var i in this.lblCoinList) {
      this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM).toFixed(2);
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
      this.lblUserCoin.string = (this.lotteryRes.userscore / 100).toFixed(2);
      this.lblWinCoin.string = (this.lotteryRes.winscore / 100).toFixed(2);

      if (this.bIsFreeGame) {
        this.freeGameCoin += this.lotteryRes.winscore;
      }

      if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
        this.bIsFreeGame = true;

        if (this.lotteryRes.viewarray.getFreeTime.nFreeType == 0) {
          this.scheduleOnce(function () {
            _this3.freeBeginNode.active = true;
          }, 2);
        } else {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.stopFree = false;
        }
      } else {
        this.scheduleOnce(function () {
          if (rIndex == _this3.rollIndex) {
            _this3.playWinAnim();
          }
        }, 1);
      }
    }
  },
  playWinAnim: function playWinAnim() {
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

        lbl_coin.string = (addcoin / 100).toFixed(2);
      }, 0, 30, 0.01); //判断播放金币掉落动画

      if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 100) {
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
      _this4.status = 0;
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
    }, hasWinBool > 0 ? hasWinBool * 3 : 2);
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
    this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = (this.freeGameCoin / 100).toFixed(2);
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
      nBetList: [BET[this.bet] * BETNUM * 100]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9jYWlzaGVuZGFvX2hvdXlpbmdcXGpzXFxDU0RIWU1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYXVkaW9CdG4iLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJiZXQiLCJhdXRvIiwic3RhdHVzIiwiYmlnV2luUmVzTGlzdCIsImJpZ1dpbkNhcmQiLCJiaWdXaW5Db2luIiwiYmlnV2luQm9vIiwiZnJlZVRpbWVzIiwicm9sbFJlc3VsdCIsInJvbGxJbmRleCIsImxvdHRlcnlSZXMiLCJzdG9wRnJlZSIsImZyZWVHYW1lQ29pbiIsImJJc0ZyZWVHYW1lIiwiZGVsYXlDbGljayIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInNwcml0ZUZyYW1lIiwicGxheWVyTmFtZSIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwib25DTGljayIsImV2ZW50IiwiYXJncyIsImdldFNwcml0ZUZyYW1lIiwic2VuZFJvbGwiLCJwbGF5Iiwic2NoZWR1bGVPbmNlIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwicGxheUJnbSIsImFjdGl2ZSIsImhyIiwiY2hpbGRyZW4iLCJpIiwic29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJzdG9wQXVkaW8iLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsIm5GcmVlVHlwZSIsIm5GcmVlVGltZSIsInBsYXlXaW5BbmltIiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZGNvaW4iLCJzY2hlZHVsZSIsImFuaW1JbmRleCIsImNsb3NlU2hpbmUiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJzdGFydEZyZWVHYW1lIiwiY29uc29sZSIsImxvZyIsImZyZWVIaWRlTm9kZSIsImluaXRXaGVlbCIsInNldFR5cGVSZXN1bHQiLCJkYXRhIiwiZnJlZUNvdW50IiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xs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PSAyLjU7IC8v5Y2V5rOo5YC8XHJcbmNvbnN0IExJTkVTID0gMjQzOyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0NTREhZTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdDU0RIWUF1ZGlvJyk7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmJldCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IFszLCAxLCAyXTtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNhcmQgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xsUmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMubG90dGVyeVJlcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BVc2VyRmFjZS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGJsVXNlck5hbWUuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sbEJ0bkFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYWRkJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgKz0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSBCRVQubGVuZ3RoID8gQkVULmxlbmd0aCAtIDEgOiB0aGlzLmJldDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2RlYycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gMCA/IHRoaXMuYmV0IDogMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlQmlnV2luJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdoZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaHIgPSB0aGlzLmhlbHBOdW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgIGhyW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKFJVTEVMSVNUW2ldICogQkVUW3RoaXMuYmV0XSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VIZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2V4aXRHYW1lJykge1xyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPyAnYnRuX3NvdW5kJyA6ICdidG5fc291bmRfMicpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnN0b3BBdWRpbygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaWdXaW5Cb28pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZnJlZVR5cGUxJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2ZyZWVUaW1lVHlwZScsIEpTT04uc3RyaW5naWZ5KHsgdHlwZTogMSB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTInKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiAyIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2ZyZWVUeXBlMycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdmcmVlVGltZVR5cGUnLCBKU09OLnN0cmluZ2lmeSh7IHR5cGU6IDMgfSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZnJlZVR5cGU0Jykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2ZyZWVUaW1lVHlwZScsIEpTT04uc3RyaW5naWZ5KHsgdHlwZTogNCB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTUnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiA1IH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSxdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwid2luX2NuXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMDtcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb24xXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzb2VBbmltKGkgJSA1LCBwYXJzZUludChpIC8gNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhIWxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSk7Ly/kv67mlLlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpLCB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmZNdWx0aXBsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMsIGxpc3QubGVuZ3RoLCAwLjAxKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDBcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLCB0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUeXBlUmVzdWx0KGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gZGF0YS5mcmVlQ291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3QpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgbGV0IHNlbmREYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kUm9sbCA9PT09PlwiLCBzZW5kRGF0YSk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBzZW5kRGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAxO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7Il19