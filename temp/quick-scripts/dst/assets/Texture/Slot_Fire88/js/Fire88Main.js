
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Fire88/js/Fire88Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c9d4gWXERCM7fAOfCSmVHb', 'Fire88Main');
// Texture/Slot_Fire88/js/Fire88Main.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 70; //单注值

var LINES = 7; //线数

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
    this.net = this.node.getComponent('Fire88Network');
    this.audio = this.node.getComponent('Fire88Audio');
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

        for (var _i = 0; _i < 9; _i++) {
          _this4.clsoeAnim(_i % 3, parseInt(_i / 3));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          _this4.showAnim(list[animIndex][j] % 3, parseInt(list[animIndex][j] / 3));
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
    this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").playAnim();
    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 3 + index].active = true;
    nodeList[cols * 3 + index].getComponent(cc.Animation).play();
  },
  clsoeAnim: function clsoeAnim(cols, index) {
    var length = this.wheelList[cols].roleIdList.length;
    this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").stopAnim();
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

    for (var i = 0; i < 3; i++) {
      line[i] = [];
    }

    for (var _i4 in list) {
      line[_i4 % 3][2 - parseInt(_i4 / 3)] = list[_i4];
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
      nBetList: [BET[this.bet] * BETNUM]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9GaXJlODhcXGpzXFxGaXJlODhNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzcFVzZXJGYWNlIiwidHlwZSIsIlNwcml0ZSIsImRpc3BsYXlOYW1lIiwibGJsVXNlck5hbWUiLCJMYWJlbCIsImxibFVzZXJDb2luIiwibGJsQmV0IiwibGJsTGluZXMiLCJsYmxDdXJCZXQiLCJsYmxXaW5Db2luIiwibGJsQ29pbkxpc3QiLCJyb2xsQnRuQW5pbSIsIkFuaW1hdGlvbiIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJlZmZlY3RBbmltUHIiLCJOb2RlIiwiZWZmZWN0QW5pbUZ1bGxBIiwiZWZmZWN0QW5pbUZ1bGxCIiwiZWZmZWN0QW5pbUJpZ0Z1bGwiLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImF1ZGlvQnRuIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImRlbGF5Q2xpY2siLCJ0dXJuTnVtIiwic3RhcnQiLCJzdHJpbmciLCJzZXRCZXQiLCJIZWxwZXIiLCJsb2FkSGVhZCIsInBsYXllckhlYWRJZCIsInNwIiwic3ByaXRlRnJhbWUiLCJwbGF5ZXJOYW1lIiwicGxheWVyQ29pbiIsInRvRml4ZWQiLCJvbkNMaWNrIiwiZXZlbnQiLCJhcmdzIiwiZ2V0U3ByaXRlRnJhbWUiLCJzZW5kUm9sbCIsInBsYXkiLCJ2aWV3YXJyYXkiLCJnZXRGcmVlVGltZSIsImJGbGFnIiwic2NoZWR1bGVPbmNlIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwicGxheUJnbSIsImFjdGl2ZSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwiZXhjaGFuZ2VSYXRlIiwiaSIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwicGxheVdpbkFuaW0iLCJuRnJlZVRpbWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInRtIiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZGNvaW4iLCJzY2hlZHVsZSIsImFuaW1JbmRleCIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwic3RvcEZyZWVUaW1lcyIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJjaGlsZHJlbiIsInN0b3BBbmltIiwiY2hlY2tSb2xsRGF0YSIsIml0ZXJhdG9yIiwicm9sbCIsImFsZXJ0IiwibGluZSIsInN0YXJ0Um9sbCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwibkJldExpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7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QUFDSjtBQUNKO0FBaGVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJFVE5VTSA9IDcwOyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDc7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aOw6Z+z5oyJ6ZKuJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnRmlyZTg4TmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdGaXJlODhBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHVybk51bSA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BVc2VyRmFjZS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGJsVXNlck5hbWUuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sbEJ0bkFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhZGQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IEJFVC5sZW5ndGggPyBCRVQubGVuZ3RoIC0gMSA6IHRoaXMuYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZGVjJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSAwID8gdGhpcy5iZXQgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VCaWdXaW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxCZXQuc3RyaW5nID0gKEJFVE5VTSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dXJuTnVtICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5V2luQW5pbSh0aGlzLnR1cm5OdW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKHRtKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLF0gOiBbYWxsTGluZSwgLi4ubGluZXNdO1xyXG4gICAgICAgIGhhc1dpbkJvb2wgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGhhc1dpbkJvb2wgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oGt5Zac5a2X5qC35Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJ3aW5fY25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0pIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb24xXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDMsIHBhcnNlSW50KGkgLyAzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDMsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0bSAhPSB0aGlzLnR1cm5OdW0pIHsvL+S4jeaYr+W9k+WJjeaXi+i9rOi9ruasoeWImei3s+i/h+WQjue7reaTjeS9nFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuZnJlZVRpbWVzID09IDAgJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaGFzV2luQm9vbCA+IDAgPyBoYXNXaW5Cb29sICogMyA6IDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLCB0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDIpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xzb2VBbmltKGNvbHMsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnN0b3BBbmltKCk7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSAzXVsyIC0gcGFyc2VJbnQoaSAvIDMpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgYmV0OiB0aGlzLmJldCxcclxuICAgICAgICAgICAgbkJldExpc3Q6IFtCRVRbdGhpcy5iZXRdICogQkVUTlVNXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==