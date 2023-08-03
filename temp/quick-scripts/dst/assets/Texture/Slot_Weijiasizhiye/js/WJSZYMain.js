
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Weijiasizhiye/js/WJSZYMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0067aHk/CxGQqJu03lk01wT', 'WJSZYMain');
// Texture/Slot_Weijiasizhiye/js/WJSZYMain.js

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
    this.net = this.node.getComponent('WJSZYNetwork');
    this.audio = this.node.getComponent('WJSZYAudio');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9XZWlqaWFzaXpoaXllXFxqc1xcV0pTWllNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiUlVMRUxJU1QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNwVXNlckZhY2UiLCJ0eXBlIiwiU3ByaXRlIiwiZGlzcGxheU5hbWUiLCJsYmxVc2VyTmFtZSIsIkxhYmVsIiwibGJsVXNlckNvaW4iLCJsYmxCZXQiLCJsYmxMaW5lcyIsImxibEN1ckJldCIsImxibFdpbkNvaW4iLCJsYmxDb2luTGlzdCIsInJvbGxCdG5BbmltIiwiQW5pbWF0aW9uIiwicm9sZVBiIiwiUHJlZmFiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsImVmZmVjdEFuaW1QciIsIk5vZGUiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsIkJnTm9kZSIsImZyZWVCZ05vZGUiLCJmcmVlQmVnaW5Ob2RlIiwiZnJlZUVuZE5vZGUiLCJmcmVlVGltZXNOb2RlIiwiaGVscFVJIiwiaGVscE51bSIsImF1ZGlvQnRuIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImRlbGF5Q2xpY2siLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJhY3RpdmUiLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJwbGF5V2luQW5pbSIsInZpZXdhcnJheSIsImdldEZyZWVUaW1lIiwiYkZsYWciLCJuRnJlZVRpbWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCJdLCJtYXBwaW5ncyI6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QVEsRUFBRSxDQUFDckosR0FBRyxDQUFDLEtBQUsrQyxHQUFOLENBQUgsR0FBZ0JsRCxNQUFoQixHQUF5QixHQUExQjtBQUZpQyxLQUFmLENBQWhDO0FBSUgsR0FoZkk7QUFrZkxtRixFQUFBQSxlQWxmSyw2QkFrZmE7QUFDZCxRQUFJLENBQUMsS0FBS2hDLElBQVYsRUFBZ0I7QUFDWixXQUFLLElBQUlzQyxDQUFULElBQWMsS0FBS3hDLFNBQW5CLEVBQThCO0FBQzFCLGFBQUtBLFNBQUwsQ0FBZXdDLENBQWYsRUFBa0JOLGVBQWxCO0FBQ0g7QUFDSjtBQUNKO0FBeGZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJFVE5VTSA9IDIuNTsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSAyNTsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzMwLCAxMDAwLCAxMDAsIDEwXTtcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY29uc3QgUlVMRUxJU1QgPSBbMiwgMC4yLCAwLjEsIDEsIDAuMiwgMC4xLCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMywgMC42LCAwLjJdOyAvL+inhOWImVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwVXNlckZhY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WktOWDjycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflkI0nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfljZXms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsTGluZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57q/5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsQnRuQW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb24sXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncm9sbOaMiemSruWKqOeUuycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcEF0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WbvumbhicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfoh6rliqjmjInpkq5TcHJpdGUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbVByOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW54m55pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxCOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltQmlnRnVsbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWkp+WlluWFqOWxj+eJueaViCcsXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIEJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a4uOaIj+iDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgICAgICBmcmVlQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVCZWdpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflvIDlp4vlhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUVuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnu5PmnZ/lhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVUaW1lc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbmmL7npLroioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBOdW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2i5Y+v5Y+Y5rOo5pWwJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aOw6Z+z5oyJ6ZKuJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnV0pTWllOZXR3b3JrJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1dKU1pZQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBocikge1xyXG4gICAgICAgICAgICAgICAgaHJbaV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoUlVMRUxJU1RbaV0gKiBCRVRbdGhpcy5iZXRdKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxibENvaW5MaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQ29pbkxpc3RbaV0uc3RyaW5nID0gKFRPUEJFVFtpXSAqICh0aGlzLmJldCArIDEpICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy51c2Vyc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmJGbGFnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkJvbyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ2FyZCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fY2FyZDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW47XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc3VsdENvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LnVzZXJfc2NvcmU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEJpZ1dpbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheVdpbkFuaW0oKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLCBdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJ3aW5fY25cIixmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzBcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0gKjEwMCkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiYW5pbWF0aW9uMVwiLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzb2VBbmltKGkgJSA1LCBwYXJzZUludChpIC8gNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhIWxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSk7Ly/kv67mlLlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpLCB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmZNdWx0aXBsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMsIGxpc3QubGVuZ3RoLCAwLjAxKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wRnJlZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLmZyZWVUaW1lcyA9PSAwICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGhhc1dpbkJvb2wgPiAwID8gaGFzV2luQm9vbCAqIDMgOiAyKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwyKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCl7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA+PSB0aGlzLnJvbGVQYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm9sbERhdGEobGlzdCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoYFxyXG4gICAgICAgICAgICDmnI3liqHlmajojrflj5bnmoToirHoibLnp43nsbvlpKfkuo7njrDmnInnmoToirHoibLnp43nsbvvvIHvvIHvvIFcclxuICAgICAgICAgICAg6K+36IGU57O75pyN5Yqh5Zmo5Lq65ZGY6L+b6KGM5pWw5o2u6LCD5pW077yBYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpbmVbaSAlIDVdWzIgLSBwYXJzZUludChpIC8gNSldID0gbGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdGFydFJvbGwoLi4ubGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNoaW5lKCkge1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUm9sbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCsrO1xyXG4gICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdsb3R0ZXJ5JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsIF1cclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXHJcblxyXG4gICBcclxufSk7Il19