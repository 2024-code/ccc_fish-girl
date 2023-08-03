"use strict";
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