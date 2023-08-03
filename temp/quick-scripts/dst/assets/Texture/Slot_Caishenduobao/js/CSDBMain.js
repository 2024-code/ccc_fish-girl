
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Caishenduobao/js/CSDBMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e4395mzCkRKMrjtozF/4FC+', 'CSDBMain');
// Texture/Slot_Caishenduobao/js/CSDBMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 2.5; //单注值

var LINES = 25; //线数

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
    this.net = this.node.getComponent('CSDBNetwork');
    this.audio = this.node.getComponent('CSDBAudio');
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
      this.lblUserCoin.string = (this.lotteryRes.userscore / this.playerInfo.exchangeRate).toFixed(2);
      this.lblWinCoin.string = (this.lotteryRes.winscore / this.playerInfo.exchangeRate).toFixed(2);

      if (this.bIsFreeGame) {
        this.freeGameCoin += this.lotteryRes.winscore;
      }

      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.playWinAnim();
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

        lbl_coin.string = (addcoin / _this4.playerInfo.exchangeRate).toFixed(2);
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
  },
  sendRoll: function sendRoll() {
    this.rollIndex++;
    this.closeShine();
    this.net.socket.emit('lottery', JSON.stringify({
      bet: this.bet,
      nBetList: [BET[this.bet] * BETNUM * this.playerInfo.exchangeRate]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9DYWlzaGVuZHVvYmFvXFxqc1xcQ1NEQk1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYXVkaW9CdG4iLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJiZXQiLCJhdXRvIiwic3RhdHVzIiwiYmlnV2luUmVzTGlzdCIsImJpZ1dpbkNhcmQiLCJiaWdXaW5Db2luIiwiYmlnV2luQm9vIiwiZnJlZVRpbWVzIiwicm9sbFJlc3VsdCIsInJvbGxJbmRleCIsImxvdHRlcnlSZXMiLCJzdG9wRnJlZSIsImZyZWVHYW1lQ29pbiIsImJJc0ZyZWVHYW1lIiwiZGVsYXlDbGljayIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInNwcml0ZUZyYW1lIiwicGxheWVyTmFtZSIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwib25DTGljayIsImV2ZW50IiwiYXJncyIsImdldFNwcml0ZUZyYW1lIiwic2VuZFJvbGwiLCJwbGF5Iiwic2NoZWR1bGVPbmNlIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwicGxheUJnbSIsImFjdGl2ZSIsImhyIiwiY2hpbGRyZW4iLCJpIiwic29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJzdG9wQXVkaW8iLCJzdGF0ZUNhbGxCYWNrIiwic3QiLCJySW5kZXgiLCJ1c2Vyc2NvcmUiLCJleGNoYW5nZVJhdGUiLCJ3aW5zY29yZSIsInBsYXlXaW5BbmltIiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsIm5GcmVlVGltZSIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZGNvaW4iLCJzY2hlZHVsZSIsImFuaW1JbmRleCIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwiZk11bHRpcGxlIiwic3RvcEZyZWVUaW1lcyIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJzdG9wQW5pbSIsImNoZWNrUm9sbERhdGEiLCJpdGVyYXRvciIsInJvbGwiLCJhbGVydCIsImxpbmUiLCJzdGFydFJvbGwiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5CZXRMaXN0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LEdBQUcsRUFBRSxLQUFLQSxHQURpQztBQUUzQ3VHLE1BQUFBLFFBQVEsRUFBRSxDQUFDdEosR0FBRyxDQUFDLEtBQUsrQyxHQUFOLENBQUgsR0FBZ0JsRCxNQUFoQixHQUF5QixLQUFLMEMsVUFBTCxDQUFnQjJELFlBQTFDO0FBRmlDLEtBQWYsQ0FBaEM7QUFJSCxHQXBlSTtBQXNlTGxCLEVBQUFBLGVBdGVLLDZCQXNlYTtBQUNkLFFBQUksQ0FBQyxLQUFLaEMsSUFBVixFQUFnQjtBQUNaLFdBQUssSUFBSXNDLENBQVQsSUFBYyxLQUFLeEMsU0FBbkIsRUFBOEI7QUFDMUIsYUFBS0EsU0FBTCxDQUFld0MsQ0FBZixFQUFrQk4sZUFBbEI7QUFDSDtBQUNKO0FBQ0o7QUE1ZUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMi41OyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI1OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIEJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a4uOaIj+iDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgICAgICBmcmVlQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVCZWdpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflvIDlp4vlhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUVuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnu5PmnZ/lhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVUaW1lc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbmmL7npLroioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBOdW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2i5Y+v5Y+Y5rOo5pWwJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aOw6Z+z5oyJ6ZKuJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnQ1NEQk5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnQ1NEQkF1ZGlvJyk7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmJldCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IFszLCAxLCAyXTtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNhcmQgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xsUmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMubG90dGVyeVJlcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcblx0XHR0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSBMSU5FUztcclxuICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gJzAuMDAnO1xyXG4gICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMucGxheWVySW5mby5wbGF5ZXJIZWFkSWQsIHNwID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcFVzZXJGYWNlLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyTmFtZS5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxub25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnaGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhyID0gdGhpcy5oZWxwTnVtLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGhyKSB7XHJcbiAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlSGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdleGl0R2FtZScpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID0gIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID8gJ2J0bl9zb3VuZCcgOiAnYnRuX3NvdW5kXzInKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYmlnV2luQm9vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5V2luQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSxdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwid2luX2NuXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMDtcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfSwgMCwgMzAsIDAuMDEpXHJcbiAgICAgICAgICAgIC8v5Yik5pat5pKt5pS+6YeR5biB5o6J6JC95Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgPiBCRVRbdGhpcy5iZXRdICogQkVUTlVNICogMTAwKSB7IC8v5aaC5p6c5aSn5LqOMTAw5YCN6LWM5rOo77yM5bCx5pKt5pS+YmlnRnVsbOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uMVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKCdidG5femlkb25nJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgIC8vIH0sIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIiwgdGhpcy5mcmVlR2FtZUNvaW4pO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmZyZWVHYW1lQ29pbiAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3QpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGVdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7Il19