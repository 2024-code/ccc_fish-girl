
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_YuPuTuan1/js/YPTMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d067zSUldCEbbdgIIQqGXU', 'YPTMain');
// Texture/Slot_YuPuTuan1/js/YPTMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 5.0; //单注值

var LINES = 50; //线数

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
    this.net = this.node.getComponent('YPTNetwork');
    this.audio = this.node.getComponent('YPTAudio');
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

      var freeFlag = this.lotteryRes.viewarray.getFreeTime.bFlag;
      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.playWinAnim(freeFlag);
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
          this.freeBeginNode.active = true;
          this.auto = true;
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.freeTimes--;
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
  playWinAnim: function playWinAnim(freeTimeFlag) {
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

        for (var _i = 0; _i < 20; _i++) {
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

      if (_this4.freeTimes > 0 && !freeTimeFlag) {
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
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
    this.auto = true; // this.scheduleOnce(() => {

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
    this.wheelList[cols].rolePbList[length - 3 - index].getComponent("TempAnimation").playAnim(); //添加

    if (this.wheelList[cols].rolePbList[length - 3 - index].getChildByName("beishu") && beishu > 1) {
      this.wheelList[cols].rolePbList[length - 3 - index].getChildByName("beishu").active = true;
      this.wheelList[cols].rolePbList[length - 3 - index].getChildByName("beishu").getComponent(cc.Label).string = "x" + beishu;
    } //添加结束


    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 4 + index].active = true;
    nodeList[cols * 4 + index].getComponent(cc.Animation).play();
  },
  clsoeAnim: function clsoeAnim(cols, index) {
    var length = this.wheelList[cols].roleIdList.length;
    this.wheelList[cols].rolePbList[length - 3 - index].getComponent("TempAnimation").stopAnim(); //添加

    if (this.wheelList[cols].rolePbList[length - 3 - index].getChildByName("beishu")) {
      this.wheelList[cols].rolePbList[length - 3 - index].getChildByName("beishu").active = false;
    } //添加结束


    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 4 + index].active = false;
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
      line[_i4 % 5][3 - parseInt(_i4 / 5)] = list[_i4];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9ZdVB1VHVhbjFcXGpzXFxZUFRNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiUlVMRUxJU1QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNwVXNlckZhY2UiLCJ0eXBlIiwiU3ByaXRlIiwiZGlzcGxheU5hbWUiLCJsYmxVc2VyTmFtZSIsIkxhYmVsIiwibGJsVXNlckNvaW4iLCJsYmxCZXQiLCJsYmxMaW5lcyIsImxibEN1ckJldCIsImxibFdpbkNvaW4iLCJsYmxDb2luTGlzdCIsInJvbGxCdG5BbmltIiwiQW5pbWF0aW9uIiwicm9sZVBiIiwiUHJlZmFiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsImVmZmVjdEFuaW1QciIsIk5vZGUiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsIkJnTm9kZSIsImZyZWVCZ05vZGUiLCJmcmVlQmVnaW5Ob2RlIiwiZnJlZUVuZE5vZGUiLCJmcmVlVGltZXNOb2RlIiwiaGVscFVJIiwiaGVscE51bSIsImF1ZGlvQnRuIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImRlbGF5Q2xpY2siLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJhY3RpdmUiLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJmcmVlRmxhZyIsInZpZXdhcnJheSIsImdldEZyZWVUaW1lIiwiYkZsYWciLCJwbGF5V2luQW5pbSIsIm5GcmVlVGltZSIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwiZnJlZVRpbWVGbGFnIiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZGNvaW4iLCJzY2hlZHVsZSIsImFuaW1JbmRleCIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwiZk11bHRpcGxlIiwic3RvcEZyZWVUaW1lcyIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJzdG9wQW5pbSIsImNoZWNrUm9sbERhdGEiLCJpdGVyYXRvciIsInJvbGwiLCJhbGVydCIsImxpbmUiLCJzdGFydFJvbGwiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5C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QUFBQSxRQTVlSyxzQkE0ZU07QUFDUCxTQUFLckIsU0FBTDtBQUNBLFNBQUtpRCxVQUFMO0FBQ0EsU0FBSy9ELEdBQUwsQ0FBUzZDLE1BQVQsQ0FBZ0I2RCxJQUFoQixDQUFxQixTQUFyQixFQUFnQ0MsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDM0N2RyxNQUFBQSxHQUFHLEVBQUUsS0FBS0EsR0FEaUM7QUFFM0N3RyxNQUFBQSxRQUFRLEVBQUUsQ0FBQ3ZKLEdBQUcsQ0FBQyxLQUFLK0MsR0FBTixDQUFILEdBQWdCbEQsTUFBaEIsR0FBeUIsR0FBMUI7QUFGaUMsS0FBZixDQUFoQztBQUlILEdBbmZJO0FBcWZMbUYsRUFBQUEsZUFyZkssNkJBcWZhO0FBQ2QsUUFBSSxDQUFDLEtBQUtoQyxJQUFWLEVBQWdCO0FBQ1osV0FBSyxJQUFJc0MsQ0FBVCxJQUFjLEtBQUt4QyxTQUFuQixFQUE4QjtBQUMxQixhQUFLQSxTQUFMLENBQWV3QyxDQUFmLEVBQWtCTixlQUFsQjtBQUNIO0FBQ0o7QUFDSjtBQTNmSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCRVROVU0gPSA1LjA7IC8v5Y2V5rOo5YC8XHJcbmNvbnN0IExJTkVTID0gNTA7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNvbnN0IFJVTEVMSVNUID0gWzIsIDAuMiwgMC4xLCAxLCAwLjIsIDAuMSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDMsIDAuNiwgMC4yXTsgLy/op4TliJlcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcFVzZXJGYWNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflpLTlg48nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlck5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35ZCNJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Y2V5rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbEJ0bkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JvbGzmjInpkq7liqjnlLsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuU3ByaXRlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUJpZ0Z1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpKflpZblhajlsY/nibnmlYgnLFxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1lQVE5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnWVBUQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBocikge1xyXG4gICAgICAgICAgICAgICAgaHJbaV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoUlVMRUxJU1RbaV0gKiBCRVRbdGhpcy5iZXRdKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxibENvaW5MaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQ29pbkxpc3RbaV0uc3RyaW5nID0gKFRPUEJFVFtpXSAqICh0aGlzLmJldCArIDEpICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy51c2Vyc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcmVlRmxhZyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWdcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oZnJlZUZsYWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5iRmxhZykge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Cb28gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5UaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3Q7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNhcmQgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2NhcmQ7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXN1bHRDb2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS51c2VyX3Njb3JlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRCaWdXaW4oKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKGZyZWVUaW1lRmxhZykge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSwgXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwid2luX2NuXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfSwgMCwgMzAsIDAuMDEpXHJcbiAgICAgICAgICAgIC8v5Yik5pat5pKt5pS+6YeR5biB5o6J6JC95Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgPiBCRVRbdGhpcy5iZXRdICogQkVUTlVNICoxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcImFuaW1hdGlvbjFcIix0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCAmJiAhZnJlZVRpbWVGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLmZyZWVUaW1lcyA9PSAwICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGhhc1dpbkJvb2wgPiAwID8gaGFzV2luQm9vbCAqIDMgOiAyKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgIC8vIH0sIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIix0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sMik7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMyAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAzIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAzIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMyAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiA0ICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDQgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAzIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDMgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAzIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiA0ICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3Qpe1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSA1XVszIC0gcGFyc2VJbnQoaSAvIDUpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgYmV0OiB0aGlzLmJldCxcclxuICAgICAgICAgICAgbkJldExpc3Q6IFtCRVRbdGhpcy5iZXRdICogQkVUTlVNICogMTAwLCBdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICBcclxufSk7Il19