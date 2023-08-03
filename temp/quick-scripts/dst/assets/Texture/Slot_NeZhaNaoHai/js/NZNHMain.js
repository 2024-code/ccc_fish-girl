
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_NeZhaNaoHai/js/NZNHMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2dedZoRTpEz4DMxdqS1KVl', 'NZNHMain');
// Texture/Slot_NeZhaNaoHai/js/NZNHMain.js

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
    bigWinNode: {
      "default": null,
      type: cc.Node,
      displayName: '大奖节点'
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
    this.net = this.node.getComponent('NZNHNetwork');
    this.audio = this.node.getComponent('NZNHAudio');
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
      this.bigWinNode.active = false;
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
      this.lblUserCoin.string = (this.lotteryRes.userscore / 100).toFixed(2);
      this.lblWinCoin.string = (this.lotteryRes.winscore / 100).toFixed(2);

      if (this.bIsFreeGame) {
        this.freeGameCoin += this.lotteryRes.winscore;
      }

      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.playWinAnim();
        }
      }, 1);

      if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
        this.bigWinBoo = true;
        this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
        this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
        this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;
        this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
        this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
        this.scheduleOnce(function () {
          _this3.startBigWin();
        }, 1);
      }

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
    this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = (this.freeGameCoin / 100).toFixed(2);
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
      nBetList: [BET[this.bet] * BETNUM * 100]
    }));
  },
  stopImmediately: function stopImmediately() {
    if (!this.auto) {
      for (var i in this.wheelList) {
        this.wheelList[i].stopImmediately();
      }
    }
  },
  startBigWin: function startBigWin() {
    var _this6 = this;

    this.audio.playBgm(2); // this.auto = false;
    // this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
    // this.BigWinSet = new Set();

    this.node.getChildByName("longwang1").active = true;
    this.node.getChildByName("longwang1").getComponent(sp.Skeleton).setAnimation(0, "SlotsToBonus", false);
    this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
      _this6.bigWinNode.active = true;
      _this6.node.getChildByName("longwang1").active = false;

      _this6.bigWinNode.getChildByName("longwang").getComponent(sp.Skeleton).setAnimation(0, "animation2", true);
    })));

    for (var i = 1; i < 7; i++) {
      this.bigWinNode.getChildByName("beike" + i).getComponent(sp.Skeleton).setAnimation(0, "ami1", false);
      this.bigWinNode.getChildByName("beike" + i).getChildByName("shuzi_yellow").active = false;
      this.bigWinNode.getChildByName("beike" + i).getChildByName("shuzi_Blue").active = false;
    } // let pr = this.bigWinNode.children;
    // for (let i in pr) {
    //     let pr1 = pr[i].children;
    //     for (let j in pr1) {
    //         pr1[j].active = j == 0;
    //     }
    // }

  },
  bigWinChoose: function bigWinChoose(event, customentData) {
    var _this7 = this;

    if (this.bigWinBoo == false) {
      return;
    }

    this.bigWinBoo = false;
    var tempBeishu = [20, 1, 5, 50, 2, 10];
    var beishu = [];

    for (var i = 0; i < tempBeishu.length; i++) {
      if (tempBeishu[i] != this.bigWinCard) {
        beishu.push(tempBeishu[i]);
      }
    }

    for (var _i6 = 1; _i6 < 7; _i6++) {
      if (_i6 == customentData) {
        this.bigWinNode.getChildByName("beike" + _i6).getComponent(sp.Skeleton).setAnimation(0, "ami3", false);
        this.bigWinNode.getChildByName("beike" + _i6).getChildByName("shuzi_yellow").active = true;
        this.bigWinNode.getChildByName("beike" + _i6).getChildByName("shuzi_yellow").getComponent(cc.Label).string = "x" + this.bigWinCard;
      } else {
        this.bigWinNode.getChildByName("beike" + _i6).getComponent(sp.Skeleton).setAnimation(0, "ami3a", false);
        this.bigWinNode.getChildByName("beike" + _i6).getChildByName("shuzi_Blue").active = true;
        this.bigWinNode.getChildByName("beike" + _i6).getChildByName("shuzi_Blue").getComponent(cc.Label).string = "x" + beishu.pop();
      }
    }

    this.bigWinNode.getChildByName("longwang").getComponent(sp.Skeleton).setAnimation(0, "animation3", true);
    this.bigWinNode.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
      _this7.audio.playBgm(0);

      _this7.bigWinNode.active = false;
      _this7.lblUserCoin.string = (_this7.bigWinResultCoin / 100).toFixed(2);
      _this7.lblWinCoin.string = (_this7.bigWinCoin / 100).toFixed(2);
    })));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9OZVpoYU5hb0hhaVxcanNcXE5aTkhNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiUlVMRUxJU1QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNwVXNlckZhY2UiLCJ0eXBlIiwiU3ByaXRlIiwiZGlzcGxheU5hbWUiLCJsYmxVc2VyTmFtZSIsIkxhYmVsIiwibGJsVXNlckNvaW4iLCJsYmxCZXQiLCJsYmxMaW5lcyIsImxibEN1ckJldCIsImxibFdpbkNvaW4iLCJsYmxDb2luTGlzdCIsInJvbGxCdG5BbmltIiwiQW5pbWF0aW9uIiwicm9sZVBiIiwiUHJlZmFiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsImVmZmVjdEFuaW1QciIsIk5vZGUiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsImJpZ1dpbk5vZGUiLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImhlbHBOdW0iLCJhdWRpb0J0biIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJkZWxheUNsaWNrIiwic3RhcnQiLCJzdHJpbmciLCJzZXRCZXQiLCJIZWxwZXIiLCJsb2FkSGVhZCIsInBsYXllckhlYWRJZCIsInNwIiwic3ByaXRlRnJhbWUiLCJwbGF5ZXJOYW1lIiwicGxheWVyQ29pbiIsInRvRml4ZWQiLCJvbkNMaWNrIiwiZXZlbnQiLCJhcmdzIiwiZ2V0U3ByaXRlRnJhbWUiLCJzZW5kUm9sbCIsInBsYXkiLCJzY2hlZHVsZU9uY2UiLCJzdG9wSW1tZWRpYXRlbHkiLCJsZW5ndGgiLCJhY3RpdmUiLCJwbGF5QmdtIiwiaHIiLCJjaGlsZHJlbiIsImkiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwicGxheVdpbkFuaW0iLCJ2aWV3YXJyYXkiLCJnZXRPcGVuQm94IiwiYkZsYWciLCJiaWdXaW5UaW1lcyIsIndpbl9saXN0Iiwid2luX2NhcmQiLCJ3aW4iLCJiaWdXaW5SZXN1bHRDb2luIiwidXNlcl9zY29yZSIsInN0YXJ0QmlnV2luIiwiZ2V0RnJlZVRpbWUiLCJuRnJlZVRpbWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJiaWdXaW5DaG9vc2UiLCJjdXN0b21lbnREYXRhIiwidGVtcEJlaXNodSIsInBvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLEVBQWQsRUFBa0I7O0FBQ2xCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0QsRUFBZ0UsR0FBaEUsRUFBcUUsSUFBckUsRUFBMkUsR0FBM0UsRUFBZ0YsR0FBaEYsRUFBcUYsSUFBckYsRUFBMkYsQ0FBM0YsRUFBOEYsR0FBOUYsRUFBbUcsR0FBbkcsQ0FBakIsRUFBMEg7O0FBQzFIQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVS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RCxVQUFMLENBQWdCZ0csY0FBaEIsQ0FBK0IsVUFBVXZDLEdBQXpDLEVBQTRDdUMsY0FBNUMsQ0FBMkQsWUFBM0QsRUFBeUVqRixZQUF6RSxDQUFzRjNDLEVBQUUsQ0FBQ1MsS0FBekYsRUFBZ0dxRCxNQUFoRyxHQUF5RyxNQUFNOEUsTUFBTSxDQUFDd0IsR0FBUCxFQUEvRztBQUNIO0FBQ0o7O0FBQ0QsU0FBS3hJLFVBQUwsQ0FBZ0JnRyxjQUFoQixDQUErQixVQUEvQixFQUEyQ2pGLFlBQTNDLENBQXdEd0IsRUFBRSxDQUFDcUQsUUFBM0QsRUFBcUVFLFlBQXJFLENBQWtGLENBQWxGLEVBQXFGLFlBQXJGLEVBQW1HLElBQW5HO0FBQ0EsU0FBSzlGLFVBQUwsQ0FBZ0JpSSxTQUFoQixDQUEwQjdKLEVBQUUsQ0FBQzhKLFFBQUgsQ0FBWTlKLEVBQUUsQ0FBQytKLFNBQUgsQ0FBYSxDQUFiLENBQVosRUFBNkIvSixFQUFFLENBQUNnSyxRQUFILENBQVksWUFBSTtBQUNuRSxNQUFBLE1BQUksQ0FBQ3BILEtBQUwsQ0FBV3NDLE9BQVgsQ0FBbUIsQ0FBbkI7O0FBQ0EsTUFBQSxNQUFJLENBQUN0RCxVQUFMLENBQWdCcUQsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxNQUFBLE1BQUksQ0FBQ3ZFLFdBQUwsQ0FBaUJvRCxNQUFqQixHQUEwQixDQUFDLE1BQUksQ0FBQzRDLGdCQUFMLEdBQXdCLEdBQXpCLEVBQThCbkMsT0FBOUIsQ0FBc0MsQ0FBdEMsQ0FBMUI7QUFDQSxNQUFBLE1BQUksQ0FBQ3pELFVBQUwsQ0FBZ0JnRCxNQUFoQixHQUF5QixDQUFDLE1BQUksQ0FBQ1gsVUFBTCxHQUFrQixHQUFuQixFQUF3Qm9CLE9BQXhCLENBQWdDLENBQWhDLENBQXpCO0FBQ0gsS0FMc0QsQ0FBN0IsQ0FBMUI7QUFNSDtBQXhqQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMi41OyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI1OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aSn5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5ri45oiP6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgICAgIGZyZWVCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbog4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUJlZ2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+W8gOWni+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlRW5kTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e7k+adn+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVRpbWVzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluaYvuekuuiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdoicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscE51bToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaLlj6/lj5jms6jmlbAnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGF1ZGlvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflo7Dpn7PmjInpkq4nLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5uZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdOWk5ITmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdOWk5IQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdoZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaHIgPSB0aGlzLmhlbHBOdW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgIGhyW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKFJVTEVMSVNUW2ldICogQkVUW3RoaXMuYmV0XSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VIZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2V4aXRHYW1lJykge1xyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPyAnYnRuX3NvdW5kJyA6ICdidG5fc291bmRfMicpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnN0b3BBdWRpbygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaWdXaW5Cb28pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmV0KCkge1xyXG4gICAgICAgIHRoaXMubGJsQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMubGJsQ3VyQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlQ2FsbEJhY2soKSB7XHJcbiAgICAgICAgbGV0IHN0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtpXS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHN0ID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgLy/nu5PmnZ/lvZPliY3ova7nm5hcclxuICAgICAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMudXNlcnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5V2luQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5UaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkNhcmQgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2NhcmQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRDb2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS51c2VyX3Njb3JlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCaWdXaW4oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSwgXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwid2luX2NuXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfSwgMCwgMzAsIDAuMDEpXHJcbiAgICAgICAgICAgIC8v5Yik5pat5pKt5pS+6YeR5biB5o6J6JC95Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgPiBCRVRbdGhpcy5iZXRdICogQkVUTlVNICoxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcImFuaW1hdGlvbjFcIix0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKCdidG5femlkb25nJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgIC8vIH0sIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIix0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sMik7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3Qpe1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSA1XVsyIC0gcGFyc2VJbnQoaSAvIDUpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgYmV0OiB0aGlzLmJldCxcclxuICAgICAgICAgICAgbkJldExpc3Q6IFtCRVRbdGhpcy5iZXRdICogQkVUTlVNICogMTAwLCBdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0QmlnV2luKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAvLyB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgLy8gdGhpcy5CaWdXaW5TZXQgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibG9uZ3dhbmcxXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibG9uZ3dhbmcxXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiU2xvdHNUb0JvbnVzXCIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgzKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxvbmd3YW5nMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwibG9uZ3dhbmdcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb24yXCIsIHRydWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwiYmVpa2VcIiArIGkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiYW1pMVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJlaWtlXCIgKyBpKS5nZXRDaGlsZEJ5TmFtZShcInNodXppX3llbGxvd1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwiYmVpa2VcIiArIGkpLmdldENoaWxkQnlOYW1lKFwic2h1emlfQmx1ZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IHByID0gdGhpcy5iaWdXaW5Ob2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIC8vIGZvciAobGV0IGkgaW4gcHIpIHtcclxuICAgICAgICAvLyAgICAgbGV0IHByMSA9IHByW2ldLmNoaWxkcmVuO1xyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBqIGluIHByMSkge1xyXG4gICAgICAgIC8vICAgICAgICAgcHIxW2pdLmFjdGl2ZSA9IGogPT0gMDtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgYmlnV2luQ2hvb3NlIChldmVudCwgY3VzdG9tZW50RGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmJpZ1dpbkJvbyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRlbXBCZWlzaHUgPSBbMjAsIDEsIDUsIDUwLCAyLCAxMF07XHJcbiAgICAgICAgbGV0IGJlaXNodSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcEJlaXNodS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGVtcEJlaXNodVtpXSAhPSB0aGlzLmJpZ1dpbkNhcmQpIHtcclxuICAgICAgICAgICAgICAgIGJlaXNodS5wdXNoKHRlbXBCZWlzaHVbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IGN1c3RvbWVudERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJlaWtlXCIgKyBpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFtaTNcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwiYmVpa2VcIiArIGkpLmdldENoaWxkQnlOYW1lKFwic2h1emlfeWVsbG93XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlrZVwiICsgaSkuZ2V0Q2hpbGRCeU5hbWUoXCJzaHV6aV95ZWxsb3dcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIHRoaXMuYmlnV2luQ2FyZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJlaWtlXCIgKyBpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFtaTNhXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJlaWtlXCIgKyBpKS5nZXRDaGlsZEJ5TmFtZShcInNodXppX0JsdWVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJlaWtlXCIgKyBpKS5nZXRDaGlsZEJ5TmFtZShcInNodXppX0JsdWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIGJlaXNodS5wb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb25nd2FuZ1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvbjNcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMyksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG59KTsiXX0=