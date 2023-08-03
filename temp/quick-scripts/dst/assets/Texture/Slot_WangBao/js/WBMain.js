
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_WangBao/js/WBMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47b92VXOlRJML2STyEfAHgj', 'WBMain');
// Texture/Slot_WangBao/js/WBMain.js

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
    this.net = this.node.getComponent('WBNetwork');
    this.audio = this.node.getComponent('WBAudio');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9XYW5nQmFvXFxqc1xcV0JNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiUlVMRUxJU1QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNwVXNlckZhY2UiLCJ0eXBlIiwiU3ByaXRlIiwiZGlzcGxheU5hbWUiLCJsYmxVc2VyTmFtZSIsIkxhYmVsIiwibGJsVXNlckNvaW4iLCJsYmxCZXQiLCJsYmxMaW5lcyIsImxibEN1ckJldCIsImxibFdpbkNvaW4iLCJsYmxDb2luTGlzdCIsInJvbGxCdG5BbmltIiwiQW5pbWF0aW9uIiwicm9sZVBiIiwiUHJlZmFiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsImVmZmVjdEFuaW1QciIsIk5vZGUiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsIkJnTm9kZSIsImZyZWVCZ05vZGUiLCJmcmVlQmVnaW5Ob2RlIiwiZnJlZUVuZE5vZGUiLCJmcmVlVGltZXNOb2RlIiwiaGVscFVJIiwiaGVscE51bSIsImF1ZGlvQnRuIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImRlbGF5Q2xpY2siLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJhY3RpdmUiLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGF0ZUNhbGxCYWNrIiwic3QiLCJySW5kZXgiLCJ1c2Vyc2NvcmUiLCJ3aW5zY29yZSIsInBsYXlXaW5BbmltIiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsIm5GcmVlVHlwZSIsIm5GcmVlVGltZSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbG9zZVNoaW5lIiwiY2xzb2VBbmltIiwicGFyc2VJbnQiLCJqIiwic2hvd0FuaW0iLCJmTXVsdGlwbGUiLCJzdG9wRnJlZVRpbWVzIiwic3RhcnRGcmVlR2FtZSIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJzZXRUeXBlUmVzdWx0IiwiZGF0YSIsImZyZWVDb3VudCIsImNvbHMiLCJpbmRleCIsImJlaXNodSIsInBsYXlCVyIsInJvbGVJZExpc3QiLCJyb2xlUGJMaXN0IiwicGxheUFuaW0iLCJub2RlTGlzdCIsInN0b3BBbmltIiwiY2hlY2tSb2xsRGF0YSIsIml0ZXJhdG9yIiwicm9sbCIsImFsZXJ0IiwibGlu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OyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI0MzsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzMwLCAxMDAwLCAxMDAsIDEwXTtcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY29uc3QgUlVMRUxJU1QgPSBbMiwgMC4yLCAwLjEsIDEsIDAuMiwgMC4xLCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMywgMC42LCAwLjJdOyAvL+inhOWImVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwVXNlckZhY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WktOWDjycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflkI0nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfljZXms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsTGluZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57q/5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsQnRuQW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb24sXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncm9sbOaMiemSruWKqOeUuycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcEF0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WbvumbhicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfoh6rliqjmjInpkq5TcHJpdGUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbVByOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW54m55pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxCOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltQmlnRnVsbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWkp+WlluWFqOWxj+eJueaViCcsXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIEJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a4uOaIj+iDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgICAgICBmcmVlQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVCZWdpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflvIDlp4vlhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUVuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnu5PmnZ/lhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVUaW1lc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbmmL7npLroioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBOdW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2i5Y+v5Y+Y5rOo5pWwJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aOw6Z+z5oyJ6ZKuJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnV0JOZXR3b3JrJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1dCQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBocikge1xyXG4gICAgICAgICAgICAgICAgaHJbaV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoUlVMRUxJU1RbaV0gKiBCRVRbdGhpcy5iZXRdKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTEnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiAxIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2ZyZWVUeXBlMicpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdmcmVlVGltZVR5cGUnLCBKU09OLnN0cmluZ2lmeSh7IHR5cGU6IDIgfSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZnJlZVR5cGUzJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2ZyZWVUaW1lVHlwZScsIEpTT04uc3RyaW5naWZ5KHsgdHlwZTogMyB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdmcmVlVHlwZTQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnZnJlZVRpbWVUeXBlJywgSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiA0IH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2ZyZWVUeXBlNScpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdmcmVlVGltZVR5cGUnLCBKU09OLnN0cmluZ2lmeSh7IHR5cGU6IDUgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmV0KCkge1xyXG4gICAgICAgIHRoaXMubGJsQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMubGJsQ3VyQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlQ2FsbEJhY2soKSB7XHJcbiAgICAgICAgbGV0IHN0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtpXS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHN0ID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgLy/nu5PmnZ/lvZPliY3ova7nm5hcclxuICAgICAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMudXNlcnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5V2luQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5iRmxhZykge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Cb28gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5UaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3Q7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNhcmQgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2NhcmQ7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXN1bHRDb2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS51c2VyX3Njb3JlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRCaWdXaW4oKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSxdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwid2luX2NuXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMFxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvbjFcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTsvL+S/ruaUuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSksIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZk11bHRpcGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMFxyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wRnJlZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLmZyZWVUaW1lcyA9PSAwICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGhhc1dpbkJvb2wgPiAwID8gaGFzV2luQm9vbCAqIDMgOiAyKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSgnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAvLyB9LCAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEZyZWVUaW1lcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BGcmVlVGltZXMgZnJlZUdhbWVDb2luIDogXCIsIHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFR5cGVSZXN1bHQoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhLnR5cGUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSBkYXRhLmZyZWVDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSA1XVsyIC0gcGFyc2VJbnQoaSAvIDUpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICBsZXQgc2VuZERhdGEgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCxdXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRSb2xsID09PT0+XCIsIHNlbmREYXRhKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIHNlbmREYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IDE7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBcclxufSk7Il19