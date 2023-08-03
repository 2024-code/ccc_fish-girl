
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_YiLuFaFa/js/YLFFFMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6f14cjLj/xCN58/SDXG93ZY', 'YLFFFMain');
// Texture/Slot_YiLuFaFa/js/YLFFFMain.js

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
    this.net = this.node.getComponent('YLFFFNetwork');
    this.audio = this.node.getComponent('YLFFFAudio');
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

      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.playWinAnim();
        }
      }, 1); // if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
      //     this.bigWinBoo = true;
      //     this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
      //     this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
      //     this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;
      //     this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
      //     this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
      //     this.scheduleOnce(() => {
      //         this.startBigWin();
      //     }, 2);
      // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9ZaUx1RmFGYVxcanNcXFlMRkZGTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsIlJVTEVMSVNUIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzcFVzZXJGYWNlIiwidHlwZSIsIlNwcml0ZSIsImRpc3BsYXlOYW1lIiwibGJsVXNlck5hbWUiLCJMYWJlbCIsImxibFVzZXJDb2luIiwibGJsQmV0IiwibGJsTGluZXMiLCJsYmxDdXJCZXQiLCJsYmxXaW5Db2luIiwibGJsQ29pbkxpc3QiLCJyb2xsQnRuQW5pbSIsIkFuaW1hdGlvbiIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJlZmZlY3RBbmltUHIiLCJOb2RlIiwiZWZmZWN0QW5pbUZ1bGxBIiwiZWZmZWN0QW5pbUZ1bGxCIiwiZWZmZWN0QW5pbUJpZ0Z1bGwiLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImhlbHBOdW0iLCJhdWRpb0J0biIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJkZWxheUNsaWNrIiwic3RhcnQiLCJzdHJpbmciLCJzZXRCZXQiLCJIZWxwZXIiLCJsb2FkSGVhZCIsInBsYXllckhlYWRJZCIsInNwIiwic3ByaXRlRnJhbWUiLCJwbGF5ZXJOYW1lIiwicGxheWVyQ29pbiIsInRvRml4ZWQiLCJvbkNMaWNrIiwiZXZlbnQiLCJhcmdzIiwiZ2V0U3ByaXRlRnJhbWUiLCJzZW5kUm9sbCIsInBsYXkiLCJzY2hlZHVsZU9uY2UiLCJzdG9wSW1tZWRpYXRlbHkiLCJsZW5ndGgiLCJwbGF5QmdtIiwiYWN0aXZlIiwiaHIiLCJjaGlsZHJlbiIsImkiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5Iiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJwbGF5V2luQW5pbSIsInZpZXdhcnJheSIsImdldEZyZWVUaW1lIiwiYkZsYWciLCJuRnJlZVR5cGUiLCJuRnJlZVRpbWUiLCJoYXNXaW5Cb29sIiwiYWxsTGluZSIsIm5XaW5DYXJkcyIsInB1c2giLCJsaW5lcyIsIm5XaW5MaW5lc0RldGFpbCIsImxpc3QiLCJTa2VsZXRvbiIsImNsZWFyVHJhY2siLCJzZXRBbmltYXRpb24iLCJsYmxfY29pbiIsImdldENoaWxkQnlOYW1lIiwiYWRkY29pbiIsInNjaGVkdWxlIiwiYW5pbUluZGV4IiwiY2xvc2VTaGluZSIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwiZk11bHRpcGxlIiwic3RvcEZyZWVUaW1lcyIsInN0YXJ0RnJlZUdhbWUiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwic2V0VHlwZVJlc3VsdCIsImRhdGEiLCJmcmVlQ291bnQiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJzdG9wQW5pbSIsImNoZWNrUm9sbERhdGEiLCJpdGVyYXRvciIsInJvbGwiLCJhbGVydCIs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IDIuNTsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSAyNDM7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNvbnN0IFJVTEVMSVNUID0gWzIsIDAuMiwgMC4xLCAxLCAwLjIsIDAuMSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDMsIDAuNiwgMC4yXTsgLy/op4TliJlcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcFVzZXJGYWNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflpLTlg48nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlck5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35ZCNJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Y2V5rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbEJ0bkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JvbGzmjInpkq7liqjnlLsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuU3ByaXRlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUJpZ0Z1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpKflpZblhajlsY/nibnmlYgnLFxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1lMRkZGTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdZTEZGRkF1ZGlvJyk7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmJldCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IFszLCAxLCAyXTtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNhcmQgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xsUmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMubG90dGVyeVJlcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcblx0XHR0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSBMSU5FUztcclxuICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gJzAuMDAnO1xyXG4gICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMucGxheWVySW5mby5wbGF5ZXJIZWFkSWQsIHNwID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcFVzZXJGYWNlLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyTmFtZS5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ0xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncyA9PSAnYXV0bycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYklzRnJlZUdhbWUgfHwgdGhpcy5kZWxheUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hdXRvID0gIXRoaXMuYXV0bztcclxuICAgICAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXV0byA/ICdidG5fdGluZ3poaScgOiAnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvICYmIHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAncm9sbCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYklzRnJlZUdhbWUgfHwgdGhpcy5kZWxheUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xsQnRuQW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhZGQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IEJFVC5sZW5ndGggPyBCRVQubGVuZ3RoIC0gMSA6IHRoaXMuYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZGVjJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSAwID8gdGhpcy5iZXQgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VCaWdXaW4nKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdoZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaHIgPSB0aGlzLmhlbHBOdW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgIGhyW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKFJVTEVMSVNUW2ldICogQkVUW3RoaXMuYmV0XSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VIZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2V4aXRHYW1lJykge1xyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPyAnYnRuX3NvdW5kJyA6ICdidG5fc291bmRfMicpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnN0b3BBdWRpbygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaWdXaW5Cb28pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZnJlZVR5cGUxJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2ZyZWVUaW1lVHlwZScsIEpTT04uc3RyaW5naWZ5KHsgdHlwZTogMSB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTInKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiAyIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2ZyZWVUeXBlMycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdmcmVlVGltZVR5cGUnLCBKU09OLnN0cmluZ2lmeSh7IHR5cGU6IDMgfSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZnJlZVR5cGU0Jykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2ZyZWVUaW1lVHlwZScsIEpTT04uc3RyaW5naWZ5KHsgdHlwZTogNCB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTUnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiA1IH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5DYXJkID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9jYXJkO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXJ0QmlnV2luKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LCAyKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2luQW5pbSgpIHtcclxuICAgICAgICAvL+WKqOeUu+e7k+adn+WQjuiHquWKqHJvbGxcclxuICAgICAgICBsZXQgaGFzV2luQm9vbCA9IDA7XHJcbiAgICAgICAgbGV0IGFsbExpbmUgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcIndpbl9jblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzBcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb24xXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzb2VBbmltKGkgJSA1LCBwYXJzZUludChpIC8gNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhIWxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSk7Ly/kv67mlLlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpLCB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmZNdWx0aXBsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMsIGxpc3QubGVuZ3RoLCAwLjAxKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDBcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLCB0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUeXBlUmVzdWx0KGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gZGF0YS5mcmVlQ291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3QpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgbGV0IHNlbmREYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kUm9sbCA9PT09PlwiLCBzZW5kRGF0YSk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBzZW5kRGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAxO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgXHJcbn0pOyJdfQ==