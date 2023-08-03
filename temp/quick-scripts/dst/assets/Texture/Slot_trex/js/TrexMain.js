
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_trex/js/TrexMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b55c8MkuW1L2qArKzABq4Zi', 'TrexMain');
// Texture/Slot_trex/js/TrexMain.js

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
    bigWinResultAnim: {
      "default": null,
      type: cc.Node,
      displayName: 'bigWin中奖'
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
    this.net = this.node.getComponent('TrexNetwork');
    this.audio = this.node.getComponent('TrexAudio');
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
    if (args == 'auto') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
        return;
      }

      this.auto = !this.auto;
      this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');

      if (this.auto && this.status == 0) {
        this.sendRoll();
      }
    } else if (args == 'roll') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
        return;
      }

      if (!this.auto) {
        if (this.status == 0) {
          this.rollBtnAnim.play();
          this.sendRoll();
        } else if (this.status == 1) {
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
      this.bigWinResultAnim.active = false;
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
    var _this2 = this;

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
        if (rIndex == _this2.rollIndex) {
          _this2.playWinAnim();
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
            _this2.freeBeginNode.active = false;

            _this2.closeShine();

            _this2.startFreeGame();
          }, 5);
        } else {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.stopFree = false;
        }
      }
    }
  },
  playWinAnim: function playWinAnim() {
    var _this3 = this;

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
        addcoin += _this3.lotteryRes.winscore / 30;

        if (addcoin > _this3.lotteryRes.winscore) {
          addcoin = _this3.lotteryRes.winscore;
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
      if (rIndex == _this3.rollIndex) {
        _this3.closeShine();

        for (var _i = 0; _i < 15; _i++) {
          _this3.clsoeAnim(_i % 5, parseInt(_i / 5));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          // this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));//修改
          _this3.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5), _this3.lotteryRes.viewarray.fMultiple);
        }

        animIndex++;
      }
    }, 3, list.length, 0.01);
    this.scheduleOnce(function () {
      _this3.effectAnimFullA.active = false;
      _this3.effectAnimFullB.active = false;

      _this3.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);

      _this3.effectAnimBigFull.active = false;

      if (_this3.stopFree) {
        _this3.stopFree = false;

        _this3.stopFreeTimes();

        _this3.closeShine();
      }

      if (_this3.freeTimes > 0) {
        _this3.freeTimes--;
        _this3.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = _this3.freeTimes;

        if (_this3.freeTimes == 0) {
          _this3.stopFree = true;
        }

        _this3.auto && _this3.sendRoll();
      }

      if (rIndex == _this3.rollIndex) {
        _this3.auto && _this3.freeTimes == 0 && _this3.sendRoll();
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
    var _this4 = this;

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
      _this4.freeEndNode.active = false;
      _this4.BgNode.active = true;
      _this4.freeBgNode.active = false;
      _this4.bIsFreeGame = false;
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
    this.audio.playBgm(2);
    this.auto = false;
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
    this.BigWinSet = new Set();
    this.bigWinNode.active = true;
    var pr = this.bigWinNode.children;

    for (var i in pr) {
      var pr1 = pr[i].children;

      for (var j in pr1) {
        pr1[j].active = j == 0;
      }
    }
  },
  bigWinClick: function bigWinClick(event, args) {
    var _this5 = this;

    if (this.bigWinTimes > 0) {
      var num = this.BigWinSet.size;
      this.BigWinSet.add(args);

      if (num == this.BigWinSet.size) {
        return;
      }

      var winNodePr = this.bigWinNode.children;
      this.bigWinTimes--;
      var index = this.bigWinResList[this.bigWinTimes];
      var nameList = {
        10: 's_bonus_SH00F_minor',
        100: 's_bonus_SH00F_medium',
        1000: 's_bonus_SH00F_mega'
      };
      var nd = winNodePr[args].getChildByName(nameList[index]);
      this.scheduleOnce(function () {
        nd.active = true;
        nd.getComponent(cc.Animation).play();
      }, 0.5);

      if (this.bigWinTimes == 0) {
        this.scheduleOnce(function () {
          _this5.bigWinResultAnim.active = true;
          _this5.lblUserCoin.string = (_this5.bigWinResultCoin / 100).toFixed(2);
          _this5.lblWinCoin.string = (_this5.bigWinCoin / 100).toFixed(2);
          _this5.bigWinResultAnim.getChildByName('coin').getComponent(cc.Label).string = (_this5.bigWinCoin / 100).toFixed(2);
          var lt = [10, 30, 100, 1000];

          for (var i in lt) {
            _this5.bigWinResultAnim.getChildByName('' + lt[i]).active = _this5.bigWinCard == lt[i];
          }

          _this5.bigWinBoo = false;
        }, 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF90cmV4XFxqc1xcVHJleE1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiYmlnV2luTm9kZSIsImJpZ1dpblJlc3VsdEFuaW0iLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImhlbHBOdW0iLCJhdWRpb0J0biIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsImFjdGl2ZSIsInBsYXlCZ20iLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJzY2hlZHVsZU9uY2UiLCJwbGF5V2luQW5pbSIsInZpZXdhcnJheSIsImdldEZyZWVUaW1lIiwiYkZsYWciLCJuRnJlZVRpbWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCIsInN0YXJ0QmlnV2luIiwiQmlnV2luU2V0IiwiU2V0IiwicHIiLCJwcjEiLCJiaWdXaW5DbGljayIsImJpZ1dpblRpbWVzIiwibnVtIiwic2l6ZSIsImFkZCIsIndpbk5vZGVQciIsIm5hbWVMaXN0IiwibmQiLCJiaWdXaW5SZXN1bHRDb2luIiwibHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsTUFBTSxHQUFHLEdBQWYsRUFBb0I7O0FBQ3BCLElBQU1DLEtBQUssR0FBRyxFQUFkLEVBQWtCOztBQUNsQixJQUFNQyxNQUFNLEdBQUcsQ0FBQyxFQUFELEVBQUssSUFBTCxFQUFXLEdBQVgsRUFBZ0IsRUFBaEIsQ0FBZjtBQUNBLElBQU1DLEdBQUcsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLEVBQTVCLENBQVo7QUFDQSxJQUFNQyxRQUFRLEdBQUcsQ0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEdBQVQsRUFBYyxDQUFkLEVBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLEdBQWhDLEVBQXFDLElBQXJDLEVBQTJDLEdBQTNDLEVBQWdELEdBQWhELEVBQXFELElBQXJELEVBQTJELEdBQTNELEVBQWdFLEdBQWhFLEVBQXFFLElBQXJFLEVBQTJFLEdBQTNFLEVBQWdGLEdBQWhGLEVBQXFGLElBQXJGLEVBQTJGLENBQTNGLEVBQThGLEdBQTlGLEVBQW1HLEdBQW5HLENBQWpCLEVBQTBIOztBQUMxSEMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE1BRkQ7QUFHUkMsTUFBQUEsV0FBVyxFQUFF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WyJjb25zdCBCRVROVU0gPSAyLjU7IC8v5Y2V5rOo5YC8XHJcbmNvbnN0IExJTkVTID0gMjU7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNvbnN0IFJVTEVMSVNUID0gWzIsIDAuMiwgMC4xLCAxLCAwLjIsIDAuMSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDMsIDAuNiwgMC4yXTsgLy/op4TliJlcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcFVzZXJGYWNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflpLTlg48nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlck5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35ZCNJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Y2V5rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbEJ0bkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JvbGzmjInpkq7liqjnlLsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuU3ByaXRlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUJpZ0Z1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpKflpZblhajlsY/nibnmlYgnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpZ1dpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflpKflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpZ1dpblJlc3VsdEFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdiaWdXaW7kuK3lpZYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1RyZXhOZXR3b3JrJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1RyZXhBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xsQnRuQW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYWRkJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgKz0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSBCRVQubGVuZ3RoID8gQkVULmxlbmd0aCAtIDEgOiB0aGlzLmJldDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2RlYycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gMCA/IHRoaXMuYmV0IDogMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlQmlnV2luJykge1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnaGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhyID0gdGhpcy5oZWxwTnVtLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGhyKSB7XHJcbiAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlSGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdleGl0R2FtZScpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID0gIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID8gJ2J0bl9zb3VuZCcgOiAnYnRuX3NvdW5kXzInKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYmlnV2luQm9vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5DYXJkID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9jYXJkO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXJ0QmlnV2luKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LCAyKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2luQW5pbSgpIHtcclxuICAgICAgICAvL+WKqOeUu+e7k+adn+WQjuiHquWKqHJvbGxcclxuICAgICAgICBsZXQgaGFzV2luQm9vbCA9IDA7XHJcbiAgICAgICAgbGV0IGFsbExpbmUgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsIF0gOiBbYWxsTGluZSwgLi4ubGluZXNdO1xyXG4gICAgICAgIGhhc1dpbkJvb2wgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGhhc1dpbkJvb2wgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oGt5Zac5a2X5qC35Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIndpbl9jblwiLGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMFxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqMTAwKSB7IC8v5aaC5p6c5aSn5LqOMTAw5YCN6LWM5rOo77yM5bCx5pKt5pS+YmlnRnVsbOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJhbmltYXRpb24xXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTsvL+S/ruaUuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSksIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZk11bHRpcGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuZnJlZVRpbWVzID09IDAgJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaGFzV2luQm9vbCA+IDAgPyBoYXNXaW5Cb29sICogMyA6IDIpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICBzdGFydEZyZWVHYW1lKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRGcmVlR2FtZVwiKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSgnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAvLyB9LCAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEZyZWVUaW1lcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BGcmVlVGltZXMgZnJlZUdhbWVDb2luIDogXCIsdGhpcy5mcmVlR2FtZUNvaW4pO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmZyZWVHYW1lQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB9LDIpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLzAtNSAwLTJcclxuICAgIHNob3dBbmltKGNvbHMsIGluZGV4LCBiZWlzaHUpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCVygpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5wbGF5QW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSAmJiBiZWlzaHUgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIGJlaXNodTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xzb2VBbmltKGNvbHMsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnN0b3BBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tSb2xsRGF0YShsaXN0KXtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCwgXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEJpZ1dpbigpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXV0byA/ICdidG5fdGluZ3poaScgOiAnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgIHRoaXMuQmlnV2luU2V0ID0gbmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwciA9IHRoaXMuYmlnV2luTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHByKSB7XHJcbiAgICAgICAgICAgIGxldCBwcjEgPSBwcltpXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBwcjEpIHtcclxuICAgICAgICAgICAgICAgIHByMVtqXS5hY3RpdmUgPSBqID09IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJpZ1dpbkNsaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSB0aGlzLkJpZ1dpblNldC5zaXplO1xyXG4gICAgICAgICAgICB0aGlzLkJpZ1dpblNldC5hZGQoYXJncyk7XHJcbiAgICAgICAgICAgIGlmIChudW0gPT0gdGhpcy5CaWdXaW5TZXQuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3aW5Ob2RlUHIgPSB0aGlzLmJpZ1dpbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luVGltZXMtLTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5iaWdXaW5SZXNMaXN0W3RoaXMuYmlnV2luVGltZXNdO1xyXG4gICAgICAgICAgICBsZXQgbmFtZUxpc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAxMDogJ3NfYm9udXNfU0gwMEZfbWlub3InLFxyXG4gICAgICAgICAgICAgICAgMTAwOiAnc19ib251c19TSDAwRl9tZWRpdW0nLFxyXG4gICAgICAgICAgICAgICAgMTAwMDogJ3NfYm9udXNfU0gwMEZfbWVnYSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmQgPSB3aW5Ob2RlUHJbYXJnc10uZ2V0Q2hpbGRCeU5hbWUobmFtZUxpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luUmVzdWx0Q29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJ2NvaW4nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGx0ID0gWzEwLCAzMCwgMTAwLCAxMDAwXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5nZXRDaGlsZEJ5TmFtZSgnJyArIGx0W2ldKS5hY3RpdmUgPSB0aGlzLmJpZ1dpbkNhcmQgPT0gbHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pOyJdfQ==