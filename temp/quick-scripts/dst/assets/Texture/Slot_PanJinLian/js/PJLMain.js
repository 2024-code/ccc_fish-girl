
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_PanJinLian/js/PJLMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df277hqRLtNY48ggRu/Ipv1', 'PJLMain');
// Texture/Slot_PanJinLian/js/PJLMain.js

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
    this.net = this.node.getComponent('PJLNetwork');
    this.audio = this.node.getComponent('PJLAudio');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9QYW5KaW5MaWFuXFxqc1xcUEpMTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsIlJVTEVMSVNUIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzcFVzZXJGYWNlIiwidHlwZSIsIlNwcml0ZSIsImRpc3BsYXlOYW1lIiwibGJsVXNlck5hbWUiLCJMYWJlbCIsImxibFVzZXJDb2luIiwibGJsQmV0IiwibGJsTGluZXMiLCJsYmxDdXJCZXQiLCJsYmxXaW5Db2luIiwibGJsQ29pbkxpc3QiLCJyb2xsQnRuQW5pbSIsIkFuaW1hdGlvbiIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJlZmZlY3RBbmltUHIiLCJOb2RlIiwiZWZmZWN0QW5pbUZ1bGxBIiwiZWZmZWN0QW5pbUZ1bGxCIiwiZWZmZWN0QW5pbUJpZ0Z1bGwiLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImhlbHBOdW0iLCJhdWRpb0J0biIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJkZWxheUNsaWNrIiwic3RhcnQiLCJzdHJpbmciLCJzZXRCZXQiLCJIZWxwZXIiLCJsb2FkSGVhZCIsInBsYXllckhlYWRJZCIsInNwIiwic3ByaXRlRnJhbWUiLCJwbGF5ZXJOYW1lIiwicGxheWVyQ29pbiIsInRvRml4ZWQiLCJvbkNMaWNrIiwiZXZlbnQiLCJhcmdzIiwiZ2V0U3ByaXRlRnJhbWUiLCJzZW5kUm9sbCIsInBsYXkiLCJzY2hlZHVsZU9uY2UiLCJzdG9wSW1tZWRpYXRlbHkiLCJsZW5ndGgiLCJwbGF5QmdtIiwiYWN0aXZlIiwiaHIiLCJjaGlsZHJlbiIsImkiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwicGxheVdpbkFuaW0iLCJ2aWV3YXJyYXkiLCJnZXRGcmVlVGltZSIsImJGbGFnIiwibkZyZWVUaW1lIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJoYXNXaW5Cb29sIiwiYWxsTGluZSIsIm5XaW5DYXJkcyIsInB1c2giLCJsaW5lcyIsIm5XaW5MaW5lc0RldGFpbCIsImxpc3QiLCJTa2VsZXRvbiIsImNsZWFyVHJhY2siLCJzZXRBbmltYXRpb24iLCJsYmxfY29pbiIsImdldENoaWxkQnlOYW1lIiwiYWRkY29pbiIsInNjaGVkdWxlIiwiYW5pbUluZGV4IiwiY2xzb2VBbmltIiwicGFyc2VJbnQiLCJqIiwic2hvd0FuaW0iLCJmTXVsdGlwbGUiLCJzdG9wRnJlZVRpbWVzIiwiY29uc29sZSIsImxvZyIsImZyZWVIaWRlTm9kZSIsImluaXRXaGVlbCIsImNvbHMiLCJpbmRleCIsImJlaXNodSIsInBsYXlCVyIsInJvbGVJZExpc3QiLCJyb2xlUGJMaXN0IiwicGxheUFuaW0iLCJub2RlTGlzdCIsInN0b3BBbmltIiwiY2hlY2tSb2xsRGF0YSIsIml0ZXJhdG9yIiwicm9sbCIsImFsZXJ0IiwibGluZSIsInN0YXJ0Um9sbCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwibkJldExpc3QiXSwibWFwcGluZ3MiOiI7Ozs7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QUUsQ0FBQ3JKLEdBQUcsQ0FBQyxLQUFLK0MsR0FBTixDQUFILEdBQWdCbEQsTUFBaEIsR0FBeUIsR0FBMUI7QUFGaUMsS0FBZixDQUFoQztBQUlILEdBaGZJO0FBa2ZMbUYsRUFBQUEsZUFsZkssNkJBa2ZhO0FBQ2QsUUFBSSxDQUFDLEtBQUtoQyxJQUFWLEVBQWdCO0FBQ1osV0FBSyxJQUFJc0MsQ0FBVCxJQUFjLEtBQUt4QyxTQUFuQixFQUE4QjtBQUMxQixhQUFLQSxTQUFMLENBQWV3QyxDQUFmLEVBQWtCTixlQUFsQjtBQUNIO0FBQ0o7QUFDSjtBQXhmSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCRVROVU0gPSAyLjU7IC8v5Y2V5rOo5YC8XHJcbmNvbnN0IExJTkVTID0gMjU7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNvbnN0IFJVTEVMSVNUID0gWzIsIDAuMiwgMC4xLCAxLCAwLjIsIDAuMSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDMsIDAuNiwgMC4yXTsgLy/op4TliJlcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcFVzZXJGYWNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflpLTlg48nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlck5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35ZCNJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Y2V5rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbEJ0bkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JvbGzmjInpkq7liqjnlLsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuU3ByaXRlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUJpZ0Z1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpKflpZblhajlsY/nibnmlYgnLFxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1BKTE5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnUEpMQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBocikge1xyXG4gICAgICAgICAgICAgICAgaHJbaV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoUlVMRUxJU1RbaV0gKiBCRVRbdGhpcy5iZXRdKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxibENvaW5MaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQ29pbkxpc3RbaV0uc3RyaW5nID0gKFRPUEJFVFtpXSAqICh0aGlzLmJldCArIDEpICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy51c2Vyc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmJGbGFnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkJvbyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ2FyZCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fY2FyZDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW47XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc3VsdENvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LnVzZXJfc2NvcmU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEJpZ1dpbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheVdpbkFuaW0oKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLCBdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJ3aW5fY25cIixmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzBcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0gKjEwMCkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiYW5pbWF0aW9uMVwiLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzb2VBbmltKGkgJSA1LCBwYXJzZUludChpIC8gNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhIWxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSk7Ly/kv67mlLlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpLCB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmZNdWx0aXBsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMsIGxpc3QubGVuZ3RoLCAwLjAxKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wRnJlZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLmZyZWVUaW1lcyA9PSAwICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGhhc1dpbkJvb2wgPiAwID8gaGFzV2luQm9vbCAqIDMgOiAyKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwyKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCl7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA+PSB0aGlzLnJvbGVQYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm9sbERhdGEobGlzdCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoYFxyXG4gICAgICAgICAgICDmnI3liqHlmajojrflj5bnmoToirHoibLnp43nsbvlpKfkuo7njrDmnInnmoToirHoibLnp43nsbvvvIHvvIHvvIFcclxuICAgICAgICAgICAg6K+36IGU57O75pyN5Yqh5Zmo5Lq65ZGY6L+b6KGM5pWw5o2u6LCD5pW077yBYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpbmVbaSAlIDVdWzIgLSBwYXJzZUludChpIC8gNSldID0gbGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdGFydFJvbGwoLi4ubGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNoaW5lKCkge1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUm9sbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCsrO1xyXG4gICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdsb3R0ZXJ5JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsIF1cclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBcclxufSk7Il19