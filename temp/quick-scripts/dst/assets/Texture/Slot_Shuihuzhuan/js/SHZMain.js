
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Shuihuzhuan/js/SHZMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dd949RlCP5FTpek1KQlvJqV', 'SHZMain');
// Texture/Slot_Shuihuzhuan/js/SHZMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 9.0; //单注值

var LINES = 9; //线数

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
    this.net = this.node.getComponent('SHZNetwork');
    this.audio = this.node.getComponent('SHZAudio');
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

    this.BETNUM = window.GAMEMUL; //单注值

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

    this.effectAnimFullB.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9TaHVpaHV6aHVhblxcanNcXFNIWk1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYXVkaW9CdG4iLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJiZXQiLCJhdXRvIiwic3RhdHVzIiwiYmlnV2luUmVzTGlzdCIsImJpZ1dpbkNhcmQiLCJiaWdXaW5Db2luIiwiYmlnV2luQm9vIiwiZnJlZVRpbWVzIiwicm9sbFJlc3VsdCIsInJvbGxJbmRleCIsImxvdHRlcnlSZXMiLCJzdG9wRnJlZSIsImZyZWVHYW1lQ29pbiIsImJJc0ZyZWVHYW1lIiwiZGVsYXlDbGljayIsInN0YXJ0Iiwid2luZG93IiwiR0FNRU1VTCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJhY3RpdmUiLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJ2aWV3YXJyYXkiLCJnZXRGcmVlVGltZSIsImJGbGFnIiwibkZyZWVUaW1lIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJwbGF5V2luQW5pbSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLENBQWQsRUFBaUI7O0FBQ2pCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0QsRUFBZ0UsR0FBaEUsRUFBcUUsSUFBckUsRUFBMkUsR0FBM0UsRUFBZ0YsR0FBaEYsRUFBcUYsSUFBckYsRUFBMkYsQ0FBM0YsRUFBOEYsR0FBOUYsRUFBbUcsR0FBbkcsQ0FBakIsRUFBMEg7O0FBQzFIQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sTUFGRDtBQUdSQyxNQUFBQSxXQUFXLEVBQUU7QUFITCxLQURKO0FBTVJDLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkE7QUFHVEYsTUFBQUEsV0FBVyxFQUFFO0FBSEosS0FOTDtBQVdSRyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRMLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUyxLQUZBO0FBR1RGLE1BQUFBLFdBQVcsRUFBRTtBQUhKLEtBWEw7QUFnQlJJLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSk4sTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkw7QUFHSkYsTUFBQUEsV0FBVyxFQUFFO0FBSFQsS0FoQkE7QUFxQlJLLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTlAsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkg7QUFHTkYsTUFBQUEsV0FBVyxFQUFFO0FBSFAsS0FyQkY7QUEwQlJNLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUFIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkY7QUFHUEYsTUFBQUEsV0FBVyxFQUFFO0FBSE4sS0ExQkg7QUErQlJPLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUlQsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkQ7QUFHUkYsTUFBQUEsV0FBVyxFQUFFO0FBSEwsS0EvQko7QUFvQ1JRLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLEVBREE7QUFFVFYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkE7QUFHVEYsTUFBQUEsV0FBVyxFQUFFO0FBSEosS0FwQ0w7QUF5Q1JTLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVFgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNpQixTQUZBO0FBR1RWLE1BQUFBLFdBQVcsRUFBRTtBQUhKLEtBekNMO0FBOENSVyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxFQURMO0FBRUpiLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDbUIsTUFGTDtBQUdKWixNQUFBQSxXQUFXLEVBQUU7QUFIVCxLQTlDQTtBQW1EUmEsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMZixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3FCLFdBRko7QUFHTGQsTUFBQUEsV0FBVyxFQUFFO0FBSFIsS0FuREQ7QUF3RFJlLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTLElBREo7QUFFTGpCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxNQUZKO0FBR0xDLE1BQUFBLFdBQVcsRUFBRTtBQUhSLEtBeEREO0FBNkRSZ0IsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWbEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZDO0FBR1ZqQixNQUFBQSxXQUFXLEVBQUU7QUFISCxLQTdETjtBQWtFUmtCLElBQUFBLGVBQWUsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYnBCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGSTtBQUdiakIsTUFBQUEsV0FBVyxFQUFFO0FBSEEsS0FsRVQ7QUF1RVJtQixJQUFBQSxlQUFlLEVBQUU7QUFDYixpQkFBUyxJQURJO0FBRWJyQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkk7QUFHYmpCLE1BQUFBLFdBQVcsRUFBRTtBQUhBLEtBdkVUO0FBNEVSb0IsSUFBQUEsaUJBQWlCLEVBQUU7QUFDZixpQkFBUyxJQURNO0FBRWZ0QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRk07QUFHZmpCLE1BQUFBLFdBQVcsRUFBRTtBQUhFLEtBNUVYO0FBa0ZScUIsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKdkIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZMO0FBR0pqQixNQUFBQSxXQUFXLEVBQUU7QUFIVCxLQWxGQTtBQXdGUjtBQUNBc0IsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSeEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZEO0FBR1JqQixNQUFBQSxXQUFXLEVBQUU7QUFITCxLQXpGSjtBQThGUnVCLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTLElBREU7QUFFWHpCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGRTtBQUdYakIsTUFBQUEsV0FBVyxFQUFFO0FBSEYsS0E5RlA7QUFtR1J3QixJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVQxQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkE7QUFHVGpCLE1BQUFBLFdBQVcsRUFBRTtBQUhKLEtBbkdMO0FBeUdSeUIsSUFBQUEsYUFBYSxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYM0IsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZFO0FBR1hqQixNQUFBQSxXQUFXLEVBQUU7QUFIRixLQXpHUDtBQStHUjBCLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSjVCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGTDtBQUdKakIsTUFBQUEsV0FBVyxFQUFFO0FBSFQsS0EvR0E7QUFxSFIyQixJQUFBQSxPQUFPLEVBQUU7QUFDTCxpQkFBUyxJQURKO0FBRUw3QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRko7QUFHTGpCLE1BQUFBLFdBQVcsRUFBRTtBQUhSLEtBckhEO0FBMkhSNEIsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVOOUIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE1BRkg7QUFHTkMsTUFBQUEsV0FBVyxFQUFFO0FBSFA7QUEzSEYsR0FIUDtBQXFJTDZCLEVBQUFBLE1BcklLLG9CQXFJSTtBQUNMLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQXhDO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixZQUF2QixDQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtGLElBQUwsQ0FBVUMsWUFBVixDQUF1QixVQUF2QixDQUFiO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxDQUFYO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEtBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBckI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNILEdBekpJO0FBMkpMQyxFQUFBQSxLQTNKSyxtQkEySkc7QUFBQTs7QUFDSixTQUFLakUsTUFBTCxHQUFja0UsTUFBTSxDQUFDQyxPQUFyQixDQURJLENBQ3lCOztBQUM3QixTQUFLbEQsUUFBTCxDQUFjbUQsTUFBZCxHQUF1Qm5FLEtBQXZCO0FBQ0EsU0FBS2tCLFVBQUwsQ0FBZ0JpRCxNQUFoQixHQUF5QixNQUF6QjtBQUNBLFNBQUtDLE1BQUw7QUFDQUMsSUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCLEtBQUs3QixVQUFMLENBQWdCOEIsWUFBaEMsRUFBOEMsVUFBQUMsRUFBRSxFQUFJO0FBQ2hELE1BQUEsS0FBSSxDQUFDaEUsVUFBTCxDQUFnQmlFLFdBQWhCLEdBQThCRCxFQUE5QjtBQUNILEtBRkQ7QUFHQSxTQUFLNUQsV0FBTCxDQUFpQnVELE1BQWpCLEdBQTBCLEtBQUsxQixVQUFMLENBQWdCaUMsVUFBMUM7QUFDQSxTQUFLNUQsV0FBTCxDQUFpQnFELE1BQWpCLEdBQTBCLEtBQUsxQixVQUFMLENBQWdCa0MsVUFBaEIsQ0FBMkJDLE9BQTNCLENBQW1DLENBQW5DLENBQTFCO0FBQ0gsR0FyS0k7QUF1S0xDLEVBQUFBLE9BdktLLG1CQXVLR0MsS0F2S0gsRUF1S1VDLElBdktWLEVBdUtnQjtBQUFBOztBQUNqQixRQUFJQSxJQUFJLElBQUksTUFBWixFQUFvQjtBQUNoQixVQUFJLEtBQUt2QixTQUFMLEdBQWlCLENBQWpCLElBQXNCLEtBQUtELFNBQTNCLElBQXdDLEtBQUtLLFFBQTdDLElBQXlELEtBQUtFLFdBQTlELElBQTZFLEtBQUtDLFVBQXRGLEVBQWtHO0FBQzlGO0FBQ0g7O0FBQ0QsV0FBS2IsSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDQSxXQUFLeEIsT0FBTCxDQUFhK0MsV0FBYixHQUEyQixLQUFLakQsT0FBTCxDQUFhd0QsY0FBYixDQUE0QixLQUFLOUIsSUFBTCxHQUFZLGFBQVosR0FBNEIsWUFBeEQsQ0FBM0I7O0FBQ0EsVUFBSSxLQUFLQSxJQUFMLElBQWEsS0FBS0MsTUFBTCxJQUFlLENBQWhDLEVBQW1DO0FBQy9CLGFBQUs4QixRQUFMO0FBQ0g7QUFDSixLQVRELE1BU08sSUFBSUYsSUFBSSxJQUFJLE1BQVosRUFBb0I7QUFDdkIsVUFBSSxLQUFLdkIsU0FBTCxHQUFpQixDQUFqQixJQUFzQixLQUFLRCxTQUEzQixJQUF3QyxLQUFLSyxRQUE3QyxJQUF5RCxLQUFLRSxXQUE5RCxJQUE2RSxLQUFLQyxVQUF0RixFQUFrRztBQUM5RjtBQUNIOztBQUNELFVBQUksQ0FBQyxLQUFLYixJQUFWLEVBQWdCO0FBQ1osWUFBSSxLQUFLQyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsZUFBSy9CLFdBQUwsQ0FBaUI4RCxJQUFqQjtBQUNBLGVBQUsvQixNQUFMLEdBQWMsQ0FBZDtBQUNBLGVBQUs4QixRQUFMO0FBQ0gsU0FKRCxNQUlPLElBQUksS0FBSzlCLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUN6QixlQUFLWSxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBS29CLFlBQUwsQ0FBa0IsWUFBTTtBQUNwQixZQUFBLE1BQUksQ0FBQ3BCLFVBQUwsR0FBa0IsS0FBbEI7QUFDSCxXQUZELEVBRUcsQ0FGSDtBQUdBLGVBQUtxQixlQUFMO0FBQ0g7QUFDSjtBQUNKLEtBakJNLE1BaUJBLElBQUlMLElBQUksSUFBSSxLQUFaLEVBQW1CO0FBQ3RCLFVBQUksS0FBS3ZCLFNBQUwsR0FBaUIsQ0FBakIsSUFBc0IsS0FBS0QsU0FBM0IsSUFBd0MsS0FBS0ssUUFBN0MsSUFBeUQsS0FBS1YsSUFBbEUsRUFBd0U7QUFDcEU7QUFDSDs7QUFDRCxXQUFLRCxHQUFMLElBQVksQ0FBWjtBQUNBLFdBQUtBLEdBQUwsR0FBVyxLQUFLQSxHQUFMLElBQVkvQyxHQUFHLENBQUNtRixNQUFoQixHQUF5Qm5GLEdBQUcsQ0FBQ21GLE1BQUosR0FBYSxDQUF0QyxHQUEwQyxLQUFLcEMsR0FBMUQ7QUFDQSxXQUFLbUIsTUFBTDtBQUNILEtBUE0sTUFPQSxJQUFJVyxJQUFJLElBQUksS0FBWixFQUFtQjtBQUN0QixVQUFJLEtBQUt2QixTQUFMLEdBQWlCLENBQWpCLElBQXNCLEtBQUtELFNBQTNCLElBQXdDLEtBQUtLLFFBQTdDLElBQXlELEtBQUtWLElBQWxFLEVBQXdFO0FBQ3BFO0FBQ0g7O0FBQ0QsV0FBS0QsR0FBTCxJQUFZLENBQVo7QUFDQSxXQUFLQSxHQUFMLEdBQVcsS0FBS0EsR0FBTCxJQUFZLENBQVosR0FBZ0IsS0FBS0EsR0FBckIsR0FBMkIsQ0FBdEM7QUFDQSxXQUFLbUIsTUFBTDtBQUNILEtBUE0sTUFPQSxJQUFJVyxJQUFJLElBQUksYUFBWixFQUEyQjtBQUM5QixXQUFLaEMsS0FBTCxDQUFXdUMsT0FBWCxDQUFtQixDQUFuQjtBQUNILEtBRk0sTUFFQSxJQUFJUCxJQUFJLElBQUksTUFBWixFQUFvQjtBQUN2QixXQUFLMUMsTUFBTCxDQUFZa0QsTUFBWixHQUFxQixJQUFyQjtBQUNBLFVBQUlDLEVBQUUsR0FBRyxLQUFLbEQsT0FBTCxDQUFhbUQsUUFBdEI7O0FBQ0EsV0FBSyxJQUFJQyxDQUFULElBQWNGLEVBQWQsRUFBa0I7QUFDZEEsUUFBQUEsRUFBRSxDQUFDRSxDQUFELENBQUYsQ0FBTTVDLFlBQU4sQ0FBbUIxQyxFQUFFLENBQUNTLEtBQXRCLEVBQTZCc0QsTUFBN0IsR0FBc0MsQ0FBQ2hFLFFBQVEsQ0FBQ3VGLENBQUQsQ0FBUixHQUFjeEYsR0FBRyxDQUFDLEtBQUsrQyxHQUFOLENBQWxCLEVBQThCMkIsT0FBOUIsQ0FBc0MsQ0FBdEMsQ0FBdEM7QUFDSDtBQUNKLEtBTk0sTUFNQSxJQUFJRyxJQUFJLElBQUksV0FBWixFQUF5QjtBQUM1QixXQUFLMUMsTUFBTCxDQUFZa0QsTUFBWixHQUFxQixLQUFyQjtBQUNILEtBRk0sTUFFQSxJQUFJUixJQUFJLElBQUksVUFBWixFQUF3QjtBQUMzQixXQUFLbkMsR0FBTCxDQUFTK0MsTUFBVCxDQUFnQkMsVUFBaEI7QUFDQXhGLE1BQUFBLEVBQUUsQ0FBQ3lGLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixXQUF0QjtBQUNILEtBSE0sTUFHQSxJQUFJZixJQUFJLElBQUksT0FBWixFQUFxQjtBQUN4QixXQUFLaEMsS0FBTCxDQUFXZ0QsS0FBWCxDQUFpQkMsWUFBakIsR0FBZ0MsQ0FBQyxLQUFLakQsS0FBTCxDQUFXZ0QsS0FBWCxDQUFpQkMsWUFBbEQ7QUFDQSxXQUFLekQsUUFBTCxDQUFja0MsV0FBZCxHQUE0QixLQUFLakQsT0FBTCxDQUFhd0QsY0FBYixDQUE0QixLQUFLakMsS0FBTCxDQUFXZ0QsS0FBWCxDQUFpQkMsWUFBakIsR0FBZ0MsV0FBaEMsR0FBOEMsYUFBMUUsQ0FBNUI7O0FBQ0EsVUFBSSxDQUFDLEtBQUtqRCxLQUFMLENBQVdnRCxLQUFYLENBQWlCQyxZQUF0QixFQUFvQztBQUNoQyxhQUFLakQsS0FBTCxDQUFXa0QsU0FBWDtBQUNILE9BRkQsTUFFTztBQUNILFlBQUksS0FBS3pDLFNBQUwsR0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsZUFBS1QsS0FBTCxDQUFXdUMsT0FBWCxDQUFtQixDQUFuQjtBQUNILFNBRkQsTUFFTyxJQUFJLEtBQUsvQixTQUFULEVBQW9CO0FBQ3ZCLGVBQUtSLEtBQUwsQ0FBV3VDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDSCxTQUZNLE1BRUE7QUFDSCxlQUFLdkMsS0FBTCxDQUFXdUMsT0FBWCxDQUFtQixDQUFuQjtBQUNIO0FBQ0o7QUFDSjtBQUNKLEdBNU9JO0FBOE9MbEIsRUFBQUEsTUE5T0ssb0JBOE9JO0FBQ0wsU0FBS3JELE1BQUwsQ0FBWW9ELE1BQVosR0FBcUIsQ0FBQ2pFLEdBQUcsQ0FBQyxLQUFLK0MsR0FBTixDQUFILEdBQWdCbEQsTUFBakIsRUFBeUI2RSxPQUF6QixDQUFpQyxDQUFqQyxDQUFyQjtBQUNBLFNBQUszRCxTQUFMLENBQWVrRCxNQUFmLEdBQXdCLENBQUNqRSxHQUFHLENBQUMsS0FBSytDLEdBQU4sQ0FBSCxHQUFnQmxELE1BQWpCLEVBQXlCNkUsT0FBekIsQ0FBaUMsQ0FBakMsQ0FBeEI7O0FBQ0EsU0FBSyxJQUFJYyxDQUFULElBQWMsS0FBS3ZFLFdBQW5CLEVBQWdDO0FBQzVCLFdBQUtBLFdBQUwsQ0FBaUJ1RSxDQUFqQixFQUFvQnZCLE1BQXBCLEdBQTZCLENBQUNsRSxNQUFNLENBQUN5RixDQUFELENBQU4sSUFBYSxLQUFLekMsR0FBTCxHQUFXLENBQXhCLElBQTZCbEQsTUFBOUIsRUFBc0M2RSxPQUF0QyxDQUE4QyxDQUE5QyxDQUE3QjtBQUNIO0FBQ0osR0FwUEk7QUFzUExzQixFQUFBQSxhQXRQSywyQkFzUFc7QUFBQTs7QUFDWixRQUFJQyxFQUFFLEdBQUcsQ0FBVDs7QUFDQSxTQUFLLElBQUlULENBQVQsSUFBYyxLQUFLMUMsU0FBbkIsRUFBOEI7QUFDMUIsVUFBSSxLQUFLQSxTQUFMLENBQWUwQyxDQUFmLEVBQWtCdkMsTUFBdEIsRUFBOEI7QUFDMUJnRCxRQUFBQSxFQUFFLEdBQUcsQ0FBTDtBQUNBO0FBQ0g7QUFDSjs7QUFDRCxTQUFLaEQsTUFBTCxHQUFjZ0QsRUFBZDs7QUFDQSxRQUFJLEtBQUtoRCxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEI7QUFDQSxVQUFJaUQsTUFBTSxHQUFHLEtBQUsxQyxTQUFsQjtBQUNBLFdBQUs1QyxXQUFMLENBQWlCcUQsTUFBakIsR0FBMEIsQ0FBQyxLQUFLUixVQUFMLENBQWdCMEMsU0FBaEIsR0FBNEIsR0FBN0IsRUFBa0N6QixPQUFsQyxDQUEwQyxDQUExQyxDQUExQjtBQUNBLFdBQUsxRCxVQUFMLENBQWdCaUQsTUFBaEIsR0FBeUIsQ0FBQyxLQUFLUixVQUFMLENBQWdCMkMsUUFBaEIsR0FBMkIsR0FBNUIsRUFBaUMxQixPQUFqQyxDQUF5QyxDQUF6QyxDQUF6Qjs7QUFDQSxVQUFJLEtBQUtkLFdBQVQsRUFBc0I7QUFDbEIsYUFBS0QsWUFBTCxJQUFxQixLQUFLRixVQUFMLENBQWdCMkMsUUFBckM7QUFDSDs7QUFFRCxVQUFJLEtBQUszQyxVQUFMLENBQWdCNEMsU0FBaEIsQ0FBMEJDLFdBQTFCLENBQXNDQyxLQUExQyxFQUFpRDtBQUM3QyxZQUFJLEtBQUtqRCxTQUFMLElBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLGVBQUtBLFNBQUwsR0FBaUIsS0FBS0csVUFBTCxDQUFnQjRDLFNBQWhCLENBQTBCQyxXQUExQixDQUFzQ0UsU0FBdkQ7QUFDQSxlQUFLeEUsYUFBTCxDQUFtQnFELE1BQW5CLEdBQTRCLElBQTVCO0FBQ0EsZUFBS0osWUFBTCxDQUFrQixZQUFNO0FBQ3BCLFlBQUEsTUFBSSxDQUFDakQsYUFBTCxDQUFtQnFELE1BQW5CLEdBQTRCLEtBQTVCOztBQUNBLFlBQUEsTUFBSSxDQUFDb0IsVUFBTDs7QUFDQSxZQUFBLE1BQUksQ0FBQ0MsYUFBTDtBQUNILFdBSkQsRUFJRyxDQUpIO0FBS0gsU0FSRCxNQVFPO0FBQ0gsZUFBS3BELFNBQUwsR0FBaUIsS0FBS0csVUFBTCxDQUFnQjRDLFNBQWhCLENBQTBCQyxXQUExQixDQUFzQ0UsU0FBdkQ7QUFDQSxlQUFLOUMsUUFBTCxHQUFnQixLQUFoQjtBQUNIO0FBQ0osT0FiRCxNQWFPO0FBQ0gsYUFBS3VCLFlBQUwsQ0FBa0IsWUFBTTtBQUNwQixjQUFJaUIsTUFBTSxJQUFJLE1BQUksQ0FBQzFDLFNBQW5CLEVBQThCO0FBQzFCLFlBQUEsTUFBSSxDQUFDbUQsV0FBTDtBQUNIO0FBQ0osU0FKRCxFQUlHLENBSkg7QUFLSDtBQUNKO0FBQ0osR0E3Ukk7QUErUkxBLEVBQUFBLFdBL1JLLHlCQStSUztBQUFBOztBQUNWO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLENBQWpCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0FBRUEsU0FBSyxJQUFJckIsQ0FBVCxJQUFjLEtBQUsvQixVQUFMLENBQWdCNEMsU0FBaEIsQ0FBMEJTLFNBQXhDLEVBQW1EO0FBQy9DLFVBQUksS0FBS3JELFVBQUwsQ0FBZ0I0QyxTQUFoQixDQUEwQlMsU0FBMUIsQ0FBb0N0QixDQUFwQyxDQUFKLEVBQTRDO0FBQ3hDcUIsUUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWF2QixDQUFiO0FBQ0g7QUFDSjs7QUFDRCxRQUFJd0IsS0FBSyxHQUFHLEtBQUt2RCxVQUFMLENBQWdCNEMsU0FBaEIsQ0FBMEJZLGVBQXRDO0FBQ0EsUUFBSWYsTUFBTSxHQUFHLEtBQUsxQyxTQUFsQjtBQUNBLFFBQUkwRCxJQUFJLEdBQUksS0FBSzVELFNBQUwsR0FBaUIsQ0FBakIsSUFBc0IsS0FBS0ksUUFBNUIsR0FBd0MsQ0FBQ21ELE9BQUQsQ0FBeEMsSUFBc0RBLE9BQXRELFNBQWtFRyxLQUFsRSxDQUFYO0FBQ0FKLElBQUFBLFVBQVUsR0FBR00sSUFBSSxDQUFDL0IsTUFBTCxHQUFjLENBQTNCOztBQUNBLFFBQUl5QixVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDaEI7QUFDQSxXQUFLakYsZUFBTCxDQUFxQjBELE1BQXJCLEdBQThCLElBQTlCO0FBQ0EsV0FBSzFELGVBQUwsQ0FBcUJpQixZQUFyQixDQUFrQzBCLEVBQUUsQ0FBQzZDLFFBQXJDLEVBQStDQyxVQUEvQyxDQUEwRCxDQUExRDtBQUNBLFdBQUt6RixlQUFMLENBQXFCaUIsWUFBckIsQ0FBa0MwQixFQUFFLENBQUM2QyxRQUFyQyxFQUErQ0UsWUFBL0MsQ0FBNEQsQ0FBNUQsRUFBK0QsUUFBL0QsRUFBeUUsS0FBekUsRUFKZ0IsQ0FLaEI7O0FBQ0EsV0FBS3pGLGVBQUwsQ0FBcUJ5RCxNQUFyQixHQUE4QixJQUE5QjtBQUNBLFVBQUlpQyxRQUFRLEdBQUcsS0FBSzFGLGVBQUwsQ0FBcUIyRixjQUFyQixDQUFvQyxVQUFwQyxFQUFnRDNFLFlBQWhELENBQTZEMUMsRUFBRSxDQUFDUyxLQUFoRSxDQUFmO0FBQ0EsVUFBSTZHLE9BQU8sR0FBRyxDQUFkO0FBQ0EsV0FBS0MsUUFBTCxDQUFjLFlBQU07QUFDaEJELFFBQUFBLE9BQU8sSUFBSSxNQUFJLENBQUMvRCxVQUFMLENBQWdCMkMsUUFBaEIsR0FBMkIsRUFBdEM7O0FBQ0EsWUFBSW9CLE9BQU8sR0FBRyxNQUFJLENBQUMvRCxVQUFMLENBQWdCMkMsUUFBOUIsRUFBd0M7QUFDcENvQixVQUFBQSxPQUFPLEdBQUcsTUFBSSxDQUFDL0QsVUFBTCxDQUFnQjJDLFFBQTFCO0FBQ0g7O0FBQ0RrQixRQUFBQSxRQUFRLENBQUNyRCxNQUFULEdBQWtCLENBQUN1RCxPQUFPLEdBQUcsR0FBWCxFQUFnQjlDLE9BQWhCLENBQXdCLENBQXhCLENBQWxCO0FBQ0gsT0FORCxFQU1HLENBTkgsRUFNTSxFQU5OLEVBTVUsSUFOVixFQVRnQixDQWdCaEI7O0FBQ0EsVUFBSSxLQUFLakIsVUFBTCxDQUFnQjJDLFFBQWhCLEdBQTJCcEcsR0FBRyxDQUFDLEtBQUsrQyxHQUFOLENBQUgsR0FBZ0JsRCxNQUFoQixHQUF3QixHQUF2RCxFQUE0RDtBQUFFO0FBQzFELGFBQUtnQyxpQkFBTCxDQUF1QndELE1BQXZCLEdBQWdDLElBQWhDO0FBQ0EsYUFBS3hELGlCQUFMLENBQXVCZSxZQUF2QixDQUFvQzBCLEVBQUUsQ0FBQzZDLFFBQXZDLEVBQWlEQyxVQUFqRCxDQUE0RCxDQUE1RDtBQUNBLGFBQUt2RixpQkFBTCxDQUF1QmUsWUFBdkIsQ0FBb0MwQixFQUFFLENBQUM2QyxRQUF2QyxFQUFpREUsWUFBakQsQ0FBOEQsQ0FBOUQsRUFBaUUsWUFBakUsRUFBK0UsSUFBL0U7QUFDSDtBQUNKOztBQUNELFFBQUlLLFNBQVMsR0FBRyxDQUFoQjtBQUNBLFNBQUtELFFBQUwsQ0FBYyxZQUFNO0FBQ2hCLFVBQUl2QixNQUFNLElBQUksTUFBSSxDQUFDMUMsU0FBbkIsRUFBOEI7QUFDMUIsUUFBQSxNQUFJLENBQUNpRCxVQUFMOztBQUNBLGFBQUssSUFBSWpCLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsRUFBcEIsRUFBd0JBLEVBQUMsRUFBekIsRUFBNkI7QUFDekIsVUFBQSxNQUFJLENBQUNtQyxTQUFMLENBQWVuQyxFQUFDLEdBQUcsQ0FBbkIsRUFBc0JvQyxRQUFRLENBQUNwQyxFQUFDLEdBQUcsQ0FBTCxDQUE5QjtBQUNIOztBQUNELFlBQUksQ0FBQyxDQUFDLENBQUMwQixJQUFJLENBQUNRLFNBQUQsQ0FBWCxFQUF3QjtBQUNwQjtBQUNIOztBQUNELGFBQUssSUFBSUcsQ0FBVCxJQUFjWCxJQUFJLENBQUNRLFNBQUQsQ0FBbEIsRUFBK0I7QUFDM0I7QUFDQSxVQUFBLE1BQUksQ0FBQ0ksUUFBTCxDQUFjWixJQUFJLENBQUNRLFNBQUQsQ0FBSixDQUFnQkcsQ0FBaEIsSUFBcUIsQ0FBbkMsRUFBc0NELFFBQVEsQ0FBQ1YsSUFBSSxDQUFDUSxTQUFELENBQUosQ0FBZ0JHLENBQWhCLElBQXFCLENBQXRCLENBQTlDLEVBQXdFLE1BQUksQ0FBQ3BFLFVBQUwsQ0FBZ0I0QyxTQUFoQixDQUEwQjBCLFNBQWxHO0FBQ0g7O0FBQ0RMLFFBQUFBLFNBQVM7QUFDWjtBQUNKLEtBZkQsRUFlRyxDQWZILEVBZU1SLElBQUksQ0FBQy9CLE1BZlgsRUFlbUIsSUFmbkI7QUFrQkEsU0FBS0YsWUFBTCxDQUFrQixZQUFNO0FBQ3BCLE1BQUEsTUFBSSxDQUFDdEQsZUFBTCxDQUFxQjBELE1BQXJCLEdBQThCLEtBQTlCO0FBQ0EsTUFBQSxNQUFJLENBQUN6RCxlQUFMLENBQXFCeUQsTUFBckIsR0FBOEIsS0FBOUI7O0FBQ0EsTUFBQSxNQUFJLENBQUN4RCxpQkFBTCxDQUF1QmUsWUFBdkIsQ0FBb0MwQixFQUFFLENBQUM2QyxRQUF2QyxFQUFpREMsVUFBakQsQ0FBNEQsQ0FBNUQ7O0FBQ0EsTUFBQSxNQUFJLENBQUN2RixpQkFBTCxDQUF1QndELE1BQXZCLEdBQWdDLEtBQWhDOztBQUNBLFVBQUksTUFBSSxDQUFDM0IsUUFBVCxFQUFtQjtBQUNmLFFBQUEsTUFBSSxDQUFDQSxRQUFMLEdBQWdCLEtBQWhCOztBQUNBLFFBQUEsTUFBSSxDQUFDc0UsYUFBTDs7QUFDQSxRQUFBLE1BQUksQ0FBQ3ZCLFVBQUw7QUFDSDs7QUFDRCxVQUFJLE1BQUksQ0FBQ25ELFNBQUwsR0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsUUFBQSxNQUFJLENBQUNBLFNBQUw7QUFDQSxRQUFBLE1BQUksQ0FBQ3BCLGFBQUwsQ0FBbUJxRixjQUFuQixDQUFrQyxLQUFsQyxFQUF5Q0EsY0FBekMsQ0FBd0QsV0FBeEQsRUFBcUUzRSxZQUFyRSxDQUFrRjFDLEVBQUUsQ0FBQ1MsS0FBckYsRUFBNEZzRCxNQUE1RixHQUFxRyxNQUFJLENBQUNYLFNBQTFHOztBQUNBLFlBQUksTUFBSSxDQUFDQSxTQUFMLElBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLFVBQUEsTUFBSSxDQUFDSSxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7O0FBQ0QsUUFBQSxNQUFJLENBQUNWLElBQUwsSUFBYSxNQUFJLENBQUMrQixRQUFMLEVBQWI7QUFDSDs7QUFDRCxVQUFJbUIsTUFBTSxJQUFJLE1BQUksQ0FBQzFDLFNBQW5CLEVBQThCO0FBQzFCLFFBQUEsTUFBSSxDQUFDUixJQUFMLElBQWEsTUFBSSxDQUFDTSxTQUFMLElBQWtCLENBQS9CLElBQW9DLE1BQUksQ0FBQ3lCLFFBQUwsRUFBcEM7QUFDSDtBQUNKLEtBckJELEVBcUJHNkIsVUFBVSxHQUFHLENBQWIsR0FBaUJBLFVBQVUsR0FBRyxDQUE5QixHQUFrQyxDQXJCckM7QUFzQkgsR0E3V0k7QUErV0w7QUFDQUYsRUFBQUEsYUFoWEssMkJBZ1hXO0FBQ1p1QixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsU0FBS3JGLEtBQUwsQ0FBV3VDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDQSxTQUFLekIsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFNBQUs3QixNQUFMLENBQVl1RCxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsU0FBS3pCLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxTQUFLN0IsVUFBTCxDQUFnQnNELE1BQWhCLEdBQXlCLElBQXpCO0FBQ0EsU0FBSzdELE9BQUwsQ0FBYStDLFdBQWIsR0FBMkIsS0FBS2pELE9BQUwsQ0FBYXdELGNBQWIsQ0FBNEIsWUFBNUIsQ0FBM0I7O0FBQ0EsU0FBSyxJQUFJVSxDQUFULElBQWMsS0FBSzJDLFlBQW5CLEVBQWlDO0FBQzdCLFdBQUtBLFlBQUwsQ0FBa0IzQyxDQUFsQixFQUFxQkgsTUFBckIsR0FBOEIsS0FBOUI7QUFDSDs7QUFFRCxTQUFLLElBQUlHLEdBQVQsSUFBYyxLQUFLMUMsU0FBbkIsRUFBOEI7QUFDMUIsV0FBS0EsU0FBTCxDQUFlMEMsR0FBZixFQUFrQjRDLFNBQWxCO0FBQ0g7O0FBQ0QsU0FBS2xHLGFBQUwsQ0FBbUJtRCxNQUFuQixHQUE0QixJQUE1QjtBQUNBLFNBQUtuRCxhQUFMLENBQW1CcUYsY0FBbkIsQ0FBa0MsS0FBbEMsRUFBeUNBLGNBQXpDLENBQXdELFdBQXhELEVBQXFFM0UsWUFBckUsQ0FBa0YxQyxFQUFFLENBQUNTLEtBQXJGLEVBQTRGc0QsTUFBNUYsR0FBcUcsS0FBS1gsU0FBMUcsQ0FoQlksQ0FpQlo7O0FBQ0EsU0FBS04sSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLK0IsUUFBTCxHQW5CWSxDQW9CWjtBQUNILEdBcllJO0FBdVlMaUQsRUFBQUEsYUF2WUssMkJBdVlXO0FBQUE7O0FBQ1pDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDLEtBQUt2RSxZQUFsRDtBQUNBLFNBQUtkLEtBQUwsQ0FBV3VDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDQSxTQUFLcEMsSUFBTCxHQUFZLEtBQVo7O0FBQ0EsU0FBSyxJQUFJd0MsQ0FBVCxJQUFjLEtBQUsyQyxZQUFuQixFQUFpQztBQUM3QixXQUFLQSxZQUFMLENBQWtCM0MsQ0FBbEIsRUFBcUJILE1BQXJCLEdBQThCLElBQTlCO0FBQ0g7O0FBRUQsU0FBSyxJQUFJRyxHQUFULElBQWMsS0FBSzFDLFNBQW5CLEVBQThCO0FBQzFCLFdBQUtBLFNBQUwsQ0FBZTBDLEdBQWYsRUFBa0I0QyxTQUFsQjtBQUNIOztBQUNELFNBQUtsRyxhQUFMLENBQW1CbUQsTUFBbkIsR0FBNEIsS0FBNUI7QUFDQSxTQUFLcEQsV0FBTCxDQUFpQm9ELE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsU0FBS3BELFdBQUwsQ0FBaUJzRixjQUFqQixDQUFnQyxVQUFoQyxFQUE0QzNFLFlBQTVDLENBQXlEMUMsRUFBRSxDQUFDUyxLQUE1RCxFQUFtRXNELE1BQW5FLEdBQTRFLENBQUMsS0FBS04sWUFBTCxHQUFvQixHQUFyQixFQUEwQmUsT0FBMUIsQ0FBa0MsQ0FBbEMsQ0FBNUU7QUFDQSxTQUFLTyxZQUFMLENBQWtCLFlBQUk7QUFDbEIsTUFBQSxNQUFJLENBQUNoRCxXQUFMLENBQWlCb0QsTUFBakIsR0FBMEIsS0FBMUI7QUFDQSxNQUFBLE1BQUksQ0FBQ3ZELE1BQUwsQ0FBWXVELE1BQVosR0FBcUIsSUFBckI7QUFDQSxNQUFBLE1BQUksQ0FBQ3RELFVBQUwsQ0FBZ0JzRCxNQUFoQixHQUF5QixLQUF6QjtBQUNBLE1BQUEsTUFBSSxDQUFDekIsV0FBTCxHQUFtQixLQUFuQjtBQUNILEtBTEQsRUFLRyxDQUxIO0FBT0gsR0E1Wkk7QUE4Wkw7QUFDQWtFLEVBQUFBLFFBL1pLLG9CQStaSU8sSUEvWkosRUErWlVDLEtBL1pWLEVBK1ppQkMsTUEvWmpCLEVBK1p5QjtBQUMxQixTQUFLMUYsS0FBTCxDQUFXMkYsTUFBWDtBQUNBLFFBQUlyRCxNQUFNLEdBQUcsS0FBS3JDLFNBQUwsQ0FBZXVGLElBQWYsRUFBcUJJLFVBQXJCLENBQWdDdEQsTUFBN0M7QUFDQSxTQUFLckMsU0FBTCxDQUFldUYsSUFBZixFQUFxQkssVUFBckIsQ0FBZ0N2RCxNQUFNLEdBQUcsQ0FBVCxHQUFhbUQsS0FBN0MsRUFBb0QxRixZQUFwRCxDQUFpRSxlQUFqRSxFQUFrRitGLFFBQWxGLEdBSDBCLENBSTFCOztBQUNBLFFBQUksS0FBSzdGLFNBQUwsQ0FBZXVGLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDdkQsTUFBTSxHQUFHLENBQVQsR0FBYW1ELEtBQTdDLEVBQW9EZixjQUFwRCxDQUFtRSxRQUFuRSxLQUFnRmdCLE1BQU0sR0FBRyxDQUE3RixFQUFnRztBQUM1RixXQUFLekYsU0FBTCxDQUFldUYsSUFBZixFQUFxQkssVUFBckIsQ0FBZ0N2RCxNQUFNLEdBQUcsQ0FBVCxHQUFhbUQsS0FBN0MsRUFBb0RmLGNBQXBELENBQW1FLFFBQW5FLEVBQTZFbEMsTUFBN0UsR0FBc0YsSUFBdEY7QUFDQSxXQUFLdkMsU0FBTCxDQUFldUYsSUFBZixFQUFxQkssVUFBckIsQ0FBZ0N2RCxNQUFNLEdBQUcsQ0FBVCxHQUFhbUQsS0FBN0MsRUFBb0RmLGNBQXBELENBQW1FLFFBQW5FLEVBQTZFM0UsWUFBN0UsQ0FBMEYxQyxFQUFFLENBQUNTLEtBQTdGLEVBQW9Hc0QsTUFBcEcsR0FBNkcsTUFBTXNFLE1BQW5IO0FBQ0gsS0FSeUIsQ0FTMUI7OztBQUNBLFFBQUlLLFFBQVEsR0FBRyxLQUFLbkgsWUFBTCxDQUFrQjhELFFBQWpDO0FBQ0FxRCxJQUFBQSxRQUFRLENBQUNQLElBQUksR0FBRyxDQUFQLEdBQVdDLEtBQVosQ0FBUixDQUEyQmpELE1BQTNCLEdBQW9DLElBQXBDO0FBQ0F1RCxJQUFBQSxRQUFRLENBQUNQLElBQUksR0FBRyxDQUFQLEdBQVdDLEtBQVosQ0FBUixDQUEyQjFGLFlBQTNCLENBQXdDMUMsRUFBRSxDQUFDaUIsU0FBM0MsRUFBc0Q2RCxJQUF0RDtBQUNILEdBNWFJO0FBOGFMMkMsRUFBQUEsU0E5YUsscUJBOGFLVSxJQTlhTCxFQThhV0MsS0E5YVgsRUE4YWtCO0FBQ25CLFFBQUluRCxNQUFNLEdBQUcsS0FBS3JDLFNBQUwsQ0FBZXVGLElBQWYsRUFBcUJJLFVBQXJCLENBQWdDdEQsTUFBN0M7QUFDQSxTQUFLckMsU0FBTCxDQUFldUYsSUFBZixFQUFxQkssVUFBckIsQ0FBZ0N2RCxNQUFNLEdBQUcsQ0FBVCxHQUFhbUQsS0FBN0MsRUFBb0QxRixZQUFwRCxDQUFpRSxlQUFqRSxFQUFrRmlHLFFBQWxGLEdBRm1CLENBR25COztBQUNBLFFBQUksS0FBSy9GLFNBQUwsQ0FBZXVGLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDdkQsTUFBTSxHQUFHLENBQVQsR0FBYW1ELEtBQTdDLEVBQW9EZixjQUFwRCxDQUFtRSxRQUFuRSxDQUFKLEVBQWtGO0FBQzlFLFdBQUt6RSxTQUFMLENBQWV1RixJQUFmLEVBQXFCSyxVQUFyQixDQUFnQ3ZELE1BQU0sR0FBRyxDQUFULEdBQWFtRCxLQUE3QyxFQUFvRGYsY0FBcEQsQ0FBbUUsUUFBbkUsRUFBNkVsQyxNQUE3RSxHQUFzRixLQUF0RjtBQUNILEtBTmtCLENBT25COzs7QUFDQSxRQUFJdUQsUUFBUSxHQUFHLEtBQUtuSCxZQUFMLENBQWtCOEQsUUFBakM7QUFDQXFELElBQUFBLFFBQVEsQ0FBQ1AsSUFBSSxHQUFHLENBQVAsR0FBV0MsS0FBWixDQUFSLENBQTJCakQsTUFBM0IsR0FBb0MsS0FBcEM7QUFDSCxHQXhiSTtBQTBiTHlELEVBQUFBLGFBMWJLLHlCQTBiUzVCLElBMWJULEVBMGJlO0FBQ2hCLHlEQUF1QkEsSUFBdkIsd0NBQTZCO0FBQUEsVUFBbEI2QixRQUFrQjs7QUFDekIsVUFBSUEsUUFBUSxJQUFJLEtBQUszSCxNQUFMLENBQVkrRCxNQUE1QixFQUFvQztBQUNoQyxlQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELFdBQU8sSUFBUDtBQUNILEdBamNJO0FBbWNMNkQsRUFBQUEsSUFuY0ssZ0JBbWNBOUIsSUFuY0EsRUFtY007QUFDUCxRQUFJLENBQUMsS0FBSzRCLGFBQUwsQ0FBbUI1QixJQUFuQixDQUFMLEVBQStCO0FBQzNCK0IsTUFBQUEsS0FBSyw4UEFBTDtBQUlBO0FBQ0g7O0FBQ0QsU0FBS2hHLE1BQUwsR0FBYyxDQUFkO0FBQ0EsUUFBSWlHLElBQUksR0FBRyxFQUFYOztBQUNBLFNBQUssSUFBSTFELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEIwRCxNQUFBQSxJQUFJLENBQUMxRCxDQUFELENBQUosR0FBVSxFQUFWO0FBQ0g7O0FBQ0QsU0FBSyxJQUFJQSxHQUFULElBQWMwQixJQUFkLEVBQW9CO0FBQ2hCZ0MsTUFBQUEsSUFBSSxDQUFDMUQsR0FBQyxHQUFHLENBQUwsQ0FBSixDQUFZLElBQUlvQyxRQUFRLENBQUNwQyxHQUFDLEdBQUcsQ0FBTCxDQUF4QixJQUFtQzBCLElBQUksQ0FBQzFCLEdBQUQsQ0FBdkM7QUFDSDs7QUFDRCxTQUFLLElBQUlBLEdBQVQsSUFBYyxLQUFLMUMsU0FBbkIsRUFBOEI7QUFBQTs7QUFDMUIsaUNBQUtBLFNBQUwsQ0FBZTBDLEdBQWYsR0FBa0IyRCxTQUFsQiwyQkFBK0JELElBQUksQ0FBQzFELEdBQUQsQ0FBbkM7QUFDSDtBQUNKLEdBdGRJO0FBd2RMaUIsRUFBQUEsVUF4ZEssd0JBd2RRO0FBQ1QsUUFBSW1DLFFBQVEsR0FBRyxLQUFLbkgsWUFBTCxDQUFrQjhELFFBQWpDOztBQUNBLFNBQUssSUFBSUMsQ0FBVCxJQUFjb0QsUUFBZCxFQUF3QjtBQUNwQkEsTUFBQUEsUUFBUSxDQUFDcEQsQ0FBRCxDQUFSLENBQVlILE1BQVosR0FBcUIsS0FBckI7QUFDSDs7QUFDRCxTQUFLekQsZUFBTCxDQUFxQnlELE1BQXJCLEdBQThCLEtBQTlCO0FBQ0gsR0E5ZEk7QUFnZUxOLEVBQUFBLFFBaGVLLHNCQWdlTTtBQUNQLFNBQUt2QixTQUFMO0FBQ0EsU0FBS2lELFVBQUw7QUFDQSxTQUFLL0QsR0FBTCxDQUFTK0MsTUFBVCxDQUFnQjJELElBQWhCLENBQXFCLFNBQXJCLEVBQWdDQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUMzQ3ZHLE1BQUFBLEdBQUcsRUFBRSxLQUFLQSxHQURpQztBQUUzQ3dHLE1BQUFBLFFBQVEsRUFBRSxDQUFDdkosR0FBRyxDQUFDLEtBQUsrQyxHQUFOLENBQUgsR0FBZ0JsRCxNQUFoQixHQUF5QixHQUExQjtBQUZpQyxLQUFmLENBQWhDO0FBSUgsR0F2ZUk7QUF5ZUxxRixFQUFBQSxlQXplSyw2QkF5ZWE7QUFDZCxRQUFJLENBQUMsS0FBS2xDLElBQVYsRUFBZ0I7QUFDWixXQUFLLElBQUl3QyxDQUFULElBQWMsS0FBSzFDLFNBQW5CLEVBQThCO0FBQzFCLGFBQUtBLFNBQUwsQ0FBZTBDLENBQWYsRUFBa0JOLGVBQWxCO0FBQ0g7QUFDSjtBQUNKO0FBL2VJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJFVE5VTSA9IDkuMDsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSA5OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1NIWk5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnU0haQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5CRVROVU0gPSB3aW5kb3cuR0FNRU1VTDsvL+WNleazqOWAvFxyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BVc2VyRmFjZS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGJsVXNlck5hbWUuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sbEJ0bkFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYWRkJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgKz0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSBCRVQubGVuZ3RoID8gQkVULmxlbmd0aCAtIDEgOiB0aGlzLmJldDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2RlYycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gMCA/IHRoaXMuYmV0IDogMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlQmlnV2luJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdoZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaHIgPSB0aGlzLmhlbHBOdW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgIGhyW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKFJVTEVMSVNUW2ldICogQkVUW3RoaXMuYmV0XSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VIZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2V4aXRHYW1lJykge1xyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPyAnYnRuX3NvdW5kJyA6ICdidG5fc291bmRfMicpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnN0b3BBdWRpbygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaWdXaW5Cb28pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmV0KCkge1xyXG4gICAgICAgIHRoaXMubGJsQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMubGJsQ3VyQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlQ2FsbEJhY2soKSB7XHJcbiAgICAgICAgbGV0IHN0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtpXS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHN0ID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgLy/nu5PmnZ/lvZPliY3ova7nm5hcclxuICAgICAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMudXNlcnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheVdpbkFuaW0oKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLF0gOiBbYWxsTGluZSwgLi4ubGluZXNdO1xyXG4gICAgICAgIGhhc1dpbkJvb2wgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGhhc1dpbkJvb2wgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oGt5Zac5a2X5qC35Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJ3aW5fY25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqMTAwKSB7IC8v5aaC5p6c5aSn5LqOMTAw5YCN6LWM5rOo77yM5bCx5pKt5pS+YmlnRnVsbOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uMVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKCdidG5femlkb25nJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgIC8vIH0sIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIiwgdGhpcy5mcmVlR2FtZUNvaW4pO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmZyZWVHYW1lQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3QpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCwgXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==