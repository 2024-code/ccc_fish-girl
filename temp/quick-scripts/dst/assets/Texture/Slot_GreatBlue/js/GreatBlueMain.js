
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_GreatBlue/js/GreatBlueMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'befbdcVGCNKhZJ1vkG503zP', 'GreatBlueMain');
// Texture/Slot_GreatBlue/js/GreatBlueMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 0.1; //单注值

var LINES = 25; //线数

var TOPBET = [30, 1000, 100, 10];
var BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var RULELIST = [2, 0.2, 0.1, 1, 0.2, 0.1, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 3, 0.6, 0.2]; //规则

cc.Class({
  "extends": cc.Component,
  properties: {
    lblUserCoin: {
      "default": null,
      type: cc.Label,
      displayName: '用户金币'
    },
    lblLines: {
      "default": null,
      type: cc.Label,
      displayName: '线数'
    },
    lineNode: cc.Node,
    //画线
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
      type: cc.Button,
      displayName: '自动按钮'
    },
    StopAutoBtn: {
      "default": null,
      type: cc.Button,
      displayName: '停止自动按钮'
    },
    startBtn: cc.Button,
    //开始
    stopBtn: cc.Button,
    //停止
    ctrlBtn: [cc.Button],
    //需要控制开关的按钮
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
    bigWinTip: cc.Node,
    //中奖提示
    menuPanel: cc.Node,
    //菜单
    helpPanel1: cc.Node,
    //帮助1
    helpPanel2: cc.Node //帮助2

  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.net = this.node.getComponent('GreatBlueNetwork');
    this.audio = this.node.getComponent('GreatBlueAudio');
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
    this.bIsFreeGame = false; //动效相关

    this.isDoingMenu = false;
    this.isMenuOpen = false;
    this.isDoingHelp2 = false;
    this.isHelp2Open = false;
  },
  start: function start() {
    this.linesNum = LINES;
    this.lblLines.string = this.linesNum;
    this.lblWinCoin.string = '0.00';
    this.setBet();
    this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
  },
  onCLick: function onCLick(event, args) {
    switch (args) {
      case "auto":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
          return;
        }

        this.auto = true;
        this.autoBtn.node.active = false;
        this.StopAutoBtn.node.active = true;
        this.startBtn.node.active = false;
        this.stopBtn.node.active = true;

        if (this.status == 0) {
          this.sendRoll();
        }

        break;

      case "autoStop":
        this.auto = false;
        this.autoBtn.node.active = true;
        this.StopAutoBtn.node.active = false;
        this.startBtn.node.active = true;
        this.stopBtn.node.active = false;
        break;

      case "roll":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
          return;
        }

        if (!this.auto) {
          if (this.status == 0) {
            this.sendRoll();
          }
        }

        break;

      case "stopRoll":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
          return;
        }

        if (this.status == 1) {
          this.startBtn.node.active = true;
          this.stopBtn.node.active = false;
          this.stopImmediately();
        }

        break;

      case "add":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
          return;
        }

        this.bet += 1;
        this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
        this.setBet();
        break;

      case "dec":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
          return;
        }

        this.bet -= 1;
        this.bet = this.bet >= 0 ? this.bet : 0;
        this.setBet();
        break;

      case "addLine":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
          return;
        }

        this.linesNum += 1;
        this.linesNum = this.linesNum >= LINES ? LINES : this.linesNum;
        this.setBet();
        break;

      case "subLine":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
          return;
        }

        this.linesNum -= 1;
        this.linesNum = this.linesNum >= 1 ? this.linesNum : 1;
        this.setBet();
        break;

      case "closeBigWin":
        this.audio.playBgm(0);
        break;

      case "help":
        this.helpUI.active = true;
        var hr = this.helpNum.children;

        for (var i in hr) {
          hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
        }

        break;

      case "closeHelp":
        this.helpUI.active = false;
        break;

      case "exitGame":
        this.net.socket.disconnect();
        cc.director.loadScene("LobbyMain");
        break;

      case "audio":
        this.audio.pInfo.musicControl = !this.audio.pInfo.musicControl;

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

        break;

      case "menu":
        this.menuAciton(this.isMenuOpen);
        break;

      case "openLineHelp":
        this.isHelp2Open = true;
        this.helpPanel2Action();
        break;

      case "closeLineHelp":
        this.isHelp2Open = false;
        this.helpPanel2Action();
        break;

      case "closeGame":
        cc.game.end();
        break;
    }
  },
  //设置交互按钮的可用性
  setBtnUsable: function setBtnUsable(isUsable) {
    for (var i in this.ctrlBtn) {
      this.ctrlBtn[i].interactable = isUsable;
    }
  },
  setBet: function setBet() {
    this.lblCurBet.string = (BET[this.bet] * BETNUM * this.linesNum).toFixed(2);
    this.lblLines.string = this.linesNum;

    for (var i in this.lblCoinList) {
      this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM * this.linesNum).toFixed(2);
    }
  },
  stateCallBack: function stateCallBack() {
    var _this = this;

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
        if (rIndex == _this.rollIndex) {
          _this.playWinAnim();
        }
      }, 0.5); // if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
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
            _this.freeBeginNode.active = false;

            _this.closeShine();

            _this.startFreeGame();
          }, 5);
        } else {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.stopFree = false;
        }
      }
    }
  },
  playWinAnim: function playWinAnim() {
    var _this2 = this;

    //动画结束后自动roll
    var hasWinBool = 0;
    var allLine = []; //显示划线

    this.lineNode.active = true;

    for (var i in this.lotteryRes.viewarray.nWinLines) {
      this.lineNode.children[this.lotteryRes.viewarray.nWinLines[i]].active = true;
    }

    for (var _i in this.lotteryRes.viewarray.nWinCards) {
      if (this.lotteryRes.viewarray.nWinCards[_i]) {
        allLine.push(_i);
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
        addcoin += _this2.lotteryRes.winscore / 30;

        if (addcoin > _this2.lotteryRes.winscore) {
          addcoin = _this2.lotteryRes.winscore;
        }

        lbl_coin.string = (addcoin / 100).toFixed(2);
      }, 0, 30, 0.01); //判断播放金币掉落动画

      if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * this.linesNum * 100) {
        //如果大于100倍赌注，就播放bigFull动画
        this.effectAnimBigFull.active = true;
        this.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);
        this.effectAnimBigFull.getComponent(sp.Skeleton).setAnimation(0, "animation1", true);
      }

      !this.auto && this.winAciton();
    }

    var animIndex = 0;
    this.schedule(function () {
      if (rIndex == _this2.rollIndex) {
        _this2.closeShine();

        for (var _i2 = 0; _i2 < 15; _i2++) {
          _this2.clsoeAnim(_i2 % 5, parseInt(_i2 / 5));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          // this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));//修改
          _this2.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5), _this2.lotteryRes.viewarray.fMultiple);
        }

        animIndex++;
      }
    }, 3, list.length, 0.01);
    this.scheduleOnce(function () {
      _this2.effectAnimFullA.active = false;
      _this2.effectAnimFullB.active = false;

      _this2.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);

      _this2.effectAnimBigFull.active = false;

      _this2.setBtnUsable(true);

      _this2.startBtn.node.active = true;
      _this2.stopBtn.node.active = false;

      if (_this2.stopFree) {
        _this2.stopFree = false;

        _this2.stopFreeTimes();

        _this2.closeShine();
      }

      if (_this2.freeTimes > 0) {
        _this2.freeTimes--;
        _this2.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = _this2.freeTimes;

        if (_this2.freeTimes == 0) {
          _this2.stopFree = true;
        }

        _this2.auto && _this2.sendRoll();
      }

      if (rIndex == _this2.rollIndex) {
        _this2.auto && _this2.freeTimes == 0 && _this2.sendRoll();
      }
    }, hasWinBool > 0 ? hasWinBool * 3 : 0.5);
  },
  //免费次数有关
  startFreeGame: function startFreeGame() {
    console.log("startFreeGame");
    this.audio.playBgm(1);
    this.freeGameCoin = 0;
    this.BgNode.active = false;
    this.bIsFreeGame = true;
    this.freeBgNode.active = true;
    this.autoBtn.node.active = true;
    this.StopAutoBtn.node.active = false;

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i3 in this.wheelList) {
      this.wheelList[_i3].initWheel();
    }

    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes; // this.scheduleOnce(() => {

    this.auto = true;
    this.autoBtn.node.active = false;
    this.StopAutoBtn.node.active = true;
    this.startBtn.node.active = false;
    this.stopBtn.node.active = true;
    this.sendRoll(); // }, 2);
  },
  stopFreeTimes: function stopFreeTimes() {
    var _this3 = this;

    console.log("stopFreeTimes freeGameCoin : ", this.freeGameCoin);
    this.audio.playBgm(0);
    this.auto = false;
    this.autoBtn.node.active = true;
    this.StopAutoBtn.node.active = false;

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = true;
    }

    for (var _i4 in this.wheelList) {
      this.wheelList[_i4].initWheel();
    }

    this.freeTimesNode.active = false;
    this.freeEndNode.active = true;
    this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = (this.freeGameCoin / 100).toFixed(2);
    this.scheduleOnce(function () {
      _this3.freeEndNode.active = false;
      _this3.BgNode.active = true;
      _this3.freeBgNode.active = false;
      _this3.bIsFreeGame = false;
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

    for (var _i5 in list) {
      line[_i5 % 5][2 - parseInt(_i5 / 5)] = list[_i5];
    }

    for (var _i6 in this.wheelList) {
      var _this$wheelList$_i;

      (_this$wheelList$_i = this.wheelList[_i6]).startRoll.apply(_this$wheelList$_i, line[_i6]);
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
    this.closeShine(); //隐藏所有线

    for (var i in this.lineNode.children) {
      this.lineNode.children[i].active = false;
    }

    this.setBtnUsable(false);
    this.startBtn.node.active = false;
    this.stopBtn.node.active = true;
    this.net.socket.emit('lottery', JSON.stringify({
      bet: this.bet,
      linesNum: this.linesNum,
      nBetList: [BET[this.bet] * BETNUM * this.linesNum * 100]
    }));
  },
  stopImmediately: function stopImmediately() {
    if (!this.auto) {
      for (var i in this.wheelList) {
        this.wheelList[i].stopImmediately();
      }

      this.setBtnUsable(true);
    } else {
      for (var _i7 in this.wheelList) {
        this.wheelList[_i7].stopImmediately();
      }
    }
  },
  //中奖动效490-635
  winAciton: function winAciton() {
    var _this4 = this;

    this.bigWinTip.x = 635;
    this.bigWinTip.getComponent(cc.Animation).play();
    this.bigWinTip.runAction(cc.sequence(cc.moveTo(0.5, cc.v2(490, this.bigWinTip.y)), cc.delayTime(2), cc.moveTo(0.5, cc.v2(635, this.bigWinTip.y)), cc.callFunc(function () {
      _this4.bigWinTip.getComponent(cc.Animation).stop();
    })));
  },
  //菜单动效676-466
  menuAciton: function menuAciton() {
    var _this5 = this;

    if (this.isDoingMenu) {
      return;
    }

    this.isMenuOpen = !this.isMenuOpen;
    var isOpen = this.isMenuOpen;
    this.isDoingMenu = true;
    var p1, p2, t1, t2;

    if (isOpen) {
      p1 = 446;
      p2 = 466;
      t1 = 0.3;
      t2 = 0.05;
    } else {
      p1 = 446;
      p2 = 676;
      t1 = 0.05;
      t2 = 0.3;
    }

    this.menuPanel.runAction(cc.sequence(cc.moveTo(t1, cc.v2(p1, this.menuPanel.y)), cc.moveTo(t2, cc.v2(p2, this.menuPanel.y)), cc.callFunc(function () {
      _this5.isDoingMenu = false;
    })));
  },
  //画线规则帮助640-0
  helpPanel2Action: function helpPanel2Action() {
    var _this6 = this;

    if (this.isDoingHelp2) {
      return;
    }

    this.isDoingHelp2 = true;
    var p1 = this.isHelp2Open ? 0 : 640;
    this.helpPanel2.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(this.helpPanel2.x, p1)), cc.callFunc(function () {
      _this6.isDoingHelp2 = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9HcmVhdEJsdWVcXGpzXFxHcmVhdEJsdWVNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiUlVMRUxJU1QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxibFVzZXJDb2luIiwidHlwZSIsIkxhYmVsIiwiZGlzcGxheU5hbWUiLCJsYmxMaW5lcyIsImxpbmVOb2RlIiwiTm9kZSIsImxibEN1ckJldCIsImxibFdpbkNvaW4iLCJsYmxDb2luTGlzdCIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJCdXR0b24iLCJTdG9wQXV0b0J0biIsInN0YXJ0QnRuIiwic3RvcEJ0biIsImN0cmxCdG4iLCJlZmZlY3RBbmltUHIiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsIkJnTm9kZSIsImZyZWVCZ05vZGUiLCJmcmVlQmVnaW5Ob2RlIiwiZnJlZUVuZE5vZGUiLCJmcmVlVGltZXNOb2RlIiwiaGVscFVJIiwiaGVscE51bSIsImJpZ1dpblRpcCIsIm1lbnVQYW5lbCIsImhlbHBQYW5lbDEiLCJoZWxwUGFuZWwyIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImlzRG9pbmdNZW51IiwiaXNNZW51T3BlbiIsImlzRG9pbmdIZWxwMiIsImlzSGVscDJPcGVuIiwic3RhcnQiLCJsaW5lc051bSIsInN0cmluZyIsInNldEJldCIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwib25DTGljayIsImV2ZW50IiwiYXJncyIsImFjdGl2ZSIsInNlbmRSb2xsIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwicGxheUJnbSIsImhyIiwiY2hpbGRyZW4iLCJpIiwic29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJzdG9wQXVkaW8iLCJtZW51QWNpdG9uIiwiaGVscFBhbmVsMkFjdGlvbiIsImdhbWUiLCJlbmQiLCJzZXRCdG5Vc2FibGUiLCJpc1VzYWJsZSIsImludGVyYWN0YWJsZSIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwic2NoZWR1bGVPbmNlIiwicGxheVdpbkFuaW0iLCJ2aWV3YXJyYXkiLCJnZXRGcmVlVGltZSIsImJGbGFnIiwibkZyZWVUaW1lIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJoYXNXaW5Cb29sIiwiYWxsTGluZSIsIm5XaW5MaW5lcyIsIm5XaW5DYXJkcyIsInB1c2giLCJsaW5lcyIsIm5XaW5MaW5lc0RldGFpbCIsImxpc3QiLCJzcCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJ3aW5BY2l0b24iLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0IiwiQW5pbWF0aW9uIiwicGxheSIsInN0b3BBbmltIiwiY2hlY2tSb2xsRGF0YSIsIml0ZXJhdG9yIiwicm9sbCIsImFsZXJ0IiwibGluZSIsInN0YXJ0Um9sbCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwibkJldExpc3QiLCJ4IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJtb3ZlVG8iLCJ2MiIsInkiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInN0b3AiLCJpc09wZW4iLCJwMSIsInAyIiwidDEiLCJ0MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLEVBQWQsRUFBa0I7O0FBQ2xCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0QsRUFBZ0UsR0FBaEUsRUFBcUUsSUFBckUsRUFBMkUsR0FBM0UsRUFBZ0YsR0FBaEYsRUFBcUYsSUFBckYsRUFBMkYsQ0FBM0YsRUFBOEYsR0FBOUYsRUFBbUcsR0FBbkcsQ0FBakIsRUFBMEg7O0FBQzFIQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FB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Q2QsTUFBQSxNQUFJLENBQUN0RyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0gsS0FGRCxDQUZKLENBREo7QUFRSDtBQW5vQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMC4xOyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI1OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5lTm9kZTogY2MuTm9kZSwvL+eUu+e6v1xyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcEF0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WbvumbhicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfoh6rliqjmjInpkq4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3RvcEF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WBnOatouiHquWKqOaMiemSricsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydEJ0bjogY2MuQnV0dG9uLC8v5byA5aeLXHJcbiAgICAgICAgc3RvcEJ0bjogY2MuQnV0dG9uLC8v5YGc5q2iXHJcbiAgICAgICAgY3RybEJ0bjogW2NjLkJ1dHRvbl0sLy/pnIDopoHmjqfliLblvIDlhbPnmoTmjInpkq5cclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaWdXaW5UaXA6IGNjLk5vZGUsLy/kuK3lpZbmj5DnpLpcclxuICAgICAgICBtZW51UGFuZWw6IGNjLk5vZGUsLy/oj5zljZVcclxuICAgICAgICBoZWxwUGFuZWwxOiBjYy5Ob2RlLC8v5biu5YqpMVxyXG4gICAgICAgIGhlbHBQYW5lbDI6IGNjLk5vZGUsLy/luK7liqkyXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnR3JlYXRCbHVlTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdHcmVhdEJsdWVBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIC8v5Yqo5pWI55u45YWzXHJcbiAgICAgICAgdGhpcy5pc0RvaW5nTWVudSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNNZW51T3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxpbmVzTnVtID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSB0aGlzLmxpbmVzTnVtO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ0xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MpIHtcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9cIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9TdG9wXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyb2xsXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3RvcFJvbGxcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSBCRVQubGVuZ3RoID8gQkVULmxlbmd0aCAtIDEgOiB0aGlzLmJldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRlY1wiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRMaW5lXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lc051bSArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lc051bSA9IHRoaXMubGluZXNOdW0gPj0gTElORVMgPyBMSU5FUyA6IHRoaXMubGluZXNOdW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdWJMaW5lXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lc051bSAtPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lc051bSA9IHRoaXMubGluZXNOdW0gPj0gMSA/IHRoaXMubGluZXNOdW0gOiAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VCaWdXaW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV4aXRHYW1lXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhdWRpb1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibWVudVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51QWNpdG9uKHRoaXMuaXNNZW51T3Blbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm9wZW5MaW5lSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBQYW5lbDJBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VMaW5lSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwUGFuZWwyQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlR2FtZVwiOlxyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7kuqTkupLmjInpkq7nmoTlj6/nlKjmgKdcclxuICAgIHNldEJ0blVzYWJsZShpc1VzYWJsZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5jdHJsQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3RybEJ0bltpXS5pbnRlcmFjdGFibGUgPSBpc1VzYWJsZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIHRoaXMubGluZXNOdW0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSB0aGlzLmxpbmVzTnVtO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSAqIHRoaXMubGluZXNOdW0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5iRmxhZykge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Cb28gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5UaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3Q7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNhcmQgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2NhcmQ7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXN1bHRDb2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS51c2VyX3Njb3JlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRCaWdXaW4oKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG4gICAgICAgIC8v5pi+56S65YiS57q/XHJcbiAgICAgICAgdGhpcy5saW5lTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5saW5lTm9kZS5jaGlsZHJlblt0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc1tpXV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLF0gOiBbYWxsTGluZSwgLi4ubGluZXNdO1xyXG4gICAgICAgIGhhc1dpbkJvb2wgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGhhc1dpbkJvb2wgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oGt5Zac5a2X5qC35Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJ3aW5fY25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfSwgMCwgMzAsIDAuMDEpXHJcbiAgICAgICAgICAgIC8v5Yik5pat5pKt5pS+6YeR5biB5o6J6JC95Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgPiBCRVRbdGhpcy5iZXRdICogQkVUTlVNICogdGhpcy5saW5lc051bSAqIDEwMCkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvbjFcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIXRoaXMuYXV0byAmJiB0aGlzLndpbkFjaXRvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdG5Vc2FibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMC41KVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLCB0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLzAtNSAwLTJcclxuICAgIHNob3dBbmltKGNvbHMsIGluZGV4LCBiZWlzaHUpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCVygpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5wbGF5QW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSAmJiBiZWlzaHUgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIGJlaXNodTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xzb2VBbmltKGNvbHMsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnN0b3BBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tSb2xsRGF0YShsaXN0KSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA+PSB0aGlzLnJvbGVQYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm9sbERhdGEobGlzdCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoYFxyXG4gICAgICAgICAgICDmnI3liqHlmajojrflj5bnmoToirHoibLnp43nsbvlpKfkuo7njrDmnInnmoToirHoibLnp43nsbvvvIHvvIHvvIFcclxuICAgICAgICAgICAg6K+36IGU57O75pyN5Yqh5Zmo5Lq65ZGY6L+b6KGM5pWw5o2u6LCD5pW077yBYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpbmVbaSAlIDVdWzIgLSBwYXJzZUludChpIC8gNSldID0gbGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdGFydFJvbGwoLi4ubGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNoaW5lKCkge1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAvL+makOiXj+aJgOaciee6v1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5saW5lTm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVOb2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ0blVzYWJsZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIGxpbmVzTnVtOiB0aGlzLmxpbmVzTnVtLFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiB0aGlzLmxpbmVzTnVtICogMTAwXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnRuVXNhYmxlKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgIFxyXG5cclxuICAgXHJcbiAgICAvL+S4reWlluWKqOaViDQ5MC02MzVcclxuICAgIHdpbkFjaXRvbigpIHtcclxuICAgICAgICB0aGlzLmJpZ1dpblRpcC54ID0gNjM1O1xyXG4gICAgICAgIHRoaXMuYmlnV2luVGlwLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICB0aGlzLmJpZ1dpblRpcC5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwgY2MudjIoNDkwLCB0aGlzLmJpZ1dpblRpcC55KSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LCBjYy52Mig2MzUsIHRoaXMuYmlnV2luVGlwLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblRpcC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvL+iPnOWNleWKqOaViDY3Ni00NjZcclxuICAgIG1lbnVBY2l0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEb2luZ01lbnUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTWVudU9wZW4gPSAhdGhpcy5pc01lbnVPcGVuO1xyXG4gICAgICAgIGxldCBpc09wZW4gPSB0aGlzLmlzTWVudU9wZW47XHJcbiAgICAgICAgdGhpcy5pc0RvaW5nTWVudSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHAxLCBwMiwgdDEsIHQyO1xyXG4gICAgICAgIGlmIChpc09wZW4pIHtcclxuICAgICAgICAgICAgcDEgPSA0NDY7XHJcbiAgICAgICAgICAgIHAyID0gNDY2O1xyXG4gICAgICAgICAgICB0MSA9IDAuMztcclxuICAgICAgICAgICAgdDIgPSAwLjA1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAxID0gNDQ2O1xyXG4gICAgICAgICAgICBwMiA9IDY3NjtcclxuICAgICAgICAgICAgdDEgPSAwLjA1O1xyXG4gICAgICAgICAgICB0MiA9IDAuMztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tZW51UGFuZWwucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0MSwgY2MudjIocDEsIHRoaXMubWVudVBhbmVsLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0MiwgY2MudjIocDIsIHRoaXMubWVudVBhbmVsLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRG9pbmdNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvL+eUu+e6v+inhOWImeW4ruWKqTY0MC0wXHJcbiAgICBoZWxwUGFuZWwyQWN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRG9pbmdIZWxwMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcDEgPSB0aGlzLmlzSGVscDJPcGVuID8gMCA6IDY0MDtcclxuICAgICAgICB0aGlzLmhlbHBQYW5lbDIucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjQsIGNjLnYyKHRoaXMuaGVscFBhbmVsMi54LCBwMSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7Il19