"use strict";
cc._RF.push(module, '1f9d4tGZdhLh6V+CqMmC4DM', 'YGBHMain');
// Texture/Slot_yueguangbaohe/js/YGBHMain.js

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
    this.net = this.node.getComponent('YGBHNetwork');
    this.audio = this.node.getComponent('YGBHAudio');
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

      if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
        this.bigWinBoo = true; // this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
        // this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
        // this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;

        this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
        this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
        this.scheduleOnce(function () {
          _this3.startBigWin();
        }, 2);
      }

      if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
        if (this.freeTimes == 0) {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.closeShine();
          this.startFreeGame();
          this.scheduleOnce(function () {
            //     this.freeBeginNode.active = false;
            _this3.node.getChildByName("fire").active = false;
            _this3.freeBeginNode.active = true;
          }, 3);
        } else {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.stopFree = false;
        }
      } else {
        this.scheduleOnce(function () {
          if (rIndex == _this3.rollIndex) {
            _this3.turnNum += 1;

            _this3.playWinAnim(_this3.turnNum);
          }
        }, 1);
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
    this.node.getChildByName("fire").active = true;
    this.node.getChildByName("fire").getComponent(sp.Skeleton).setAnimation(0, "animation", false);
  },
  //选择游戏
  chooseGame: function chooseGame(event, customentData) {
    this.net.socket.emit('chooseGame', JSON.stringify({
      choose: customentData
    }));
  },
  //选择后开始免费
  sendFree: function sendFree() {
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame('btn_zidong');

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i2 in this.wheelList) {
      this.wheelList[_i2].initWheel();
    }

    this.freeBeginNode.active = false;
    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
    this.auto = true;
    this.sendRoll();
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

    for (var _i4 = 1; _i4 <= 5; _i4++) {
      this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + _i4).opacity = 255;
      this.node.getChildByName("Game_main").getChildByName("ice" + _i4).active = false;
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

    for (var _i5 in list) {
      line[_i5 % 5][2 - parseInt(_i5 / 5)] = list[_i5];
    }

    for (var _i6 in this.wheelList) {
      var _this$wheelList$_i;

      (_this$wheelList$_i = this.wheelList[_i6]).startRoll.apply(_this$wheelList$_i, line[_i6]);
    }

    if (this.freeTimesNode.active) {
      //吕布模式 有一列全是wild就冻结住
      for (var _i7 = 1; _i7 <= 5; _i7++) {
        if (list[_i7 - 1] == 10 && list[_i7 + 4] == 10 && list[_i7 + 9] == 10) {
          this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + _i7).opacity = 0;
          this.node.getChildByName("Game_main").getChildByName("ice" + _i7).active = true;
        }
      }
    } else {
      for (var _i8 = 1; _i8 <= 5; _i8++) {
        this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + _i8).opacity = 255;
        this.node.getChildByName("Game_main").getChildByName("ice" + _i8).active = false;
      }
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
  },
  startBigWin: function startBigWin() {
    this.audio.playBgm(2);
    this.bigWinNode.active = true;
    this.bigWinNode.getChildByName("slots_minigame_wheel").angle = 0;
    this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").angle = 0;
    var suipianArray = this.lotteryRes.viewarray.getOpenBox.nWinOpenBox;
    this.bigWinNode.getChildByName("slots_minigame_wheel").active = false;
    this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").active = true;

    for (var j = 1; j <= 6; j++) {
      this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + j).active = false;
      this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + j).active = false;
    }

    for (var i = 0; i < suipianArray.length; i++) {
      this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + suipianArray[i]).active = true;
      this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + suipianArray[i]).active = true;
    }

    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active = true;
  },
  bigWinBegin: function bigWinBegin(event, customentData) {
    var _this6 = this;

    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = false;

    if (this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active) {
      var tempWheel = this.bigWinNode.getChildByName("slots_minigame_wheel_pintu");
      var tempDu = 0;
      var location = this.lotteryRes.viewarray.getOpenBox.location;

      switch (location) {
        case 1:
          tempDu = 360;
          break;

        case 2:
          tempDu = 300;
          break;

        case 3:
          tempDu = 240;
          break;

        case 4:
          tempDu = 180;
          break;

        case 5:
          tempDu = 120;
          break;

        case 6:
          tempDu = 60;
          break;
      }

      tempWheel.runAction(cc.sequence(cc.rotateBy(0.5, 360), cc.rotateBy(2.5, 360 + tempDu).easing(cc.easeOut(5)), cc.callFunc(function () {
        _this6.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + location).active = true;
        _this6.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + location).active = true;
      }), cc.delayTime(1), cc.callFunc(function () {
        _this6.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = true;
        _this6.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active = false;

        if (_this6.bigWinCoin > 0) {
          _this6.bigWinNode.getChildByName("slots_minigame_wheel").active = true;
          _this6.bigWinNode.getChildByName("slots_minigame_wheel_pintu").active = false;
        } else {
          _this6.bigWinBoo = false;

          _this6.audio.playBgm(0);

          _this6.bigWinNode.active = false;
        }
      })));
    } else {
      this.bigWinBoo = false;

      var _tempWheel = this.bigWinNode.getChildByName("slots_minigame_wheel");

      var _tempDu = 0;

      switch (this.bigWinCoin) {
        case 2000000:
          _tempDu = 120;
          break;

        case 10000000:
          _tempDu = 60;
          break;

        case 1000000:
          _tempDu = 180;
          break;

        case 500000:
          _tempDu = 240;
          break;

        case 200000:
          _tempDu = 300;
          break;

        case 50000:
          _tempDu = 360;
          break;
      }

      _tempWheel.runAction(cc.sequence(cc.rotateBy(0.5, 360), cc.rotateBy(2.5, 360 + _tempDu).easing(cc.easeOut(5)), cc.delayTime(1), cc.callFunc(function () {
        _this6.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = true;

        _this6.audio.playBgm(0);

        _this6.bigWinNode.active = false;
        _this6.bigWinResultAnim.active = true;

        _this6.bigWinResultAnim.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
          _this6.bigWinResultAnim.active = false;
        })));

        _this6.lblUserCoin.string = (_this6.bigWinResultCoin / 100).toFixed(2);
        _this6.lblWinCoin.string = (_this6.bigWinCoin / 100).toFixed(2);
        _this6.bigWinResultAnim.getChildByName('lbl_coin ').getComponent(cc.Label).string = (_this6.bigWinCoin / 100).toFixed(2);
        ;
      })));
    }
  },
  bigWinClick: function bigWinClick(event, args) {
    var _this7 = this;

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
          _this7.bigWinResultAnim.active = true;
          _this7.lblUserCoin.string = (_this7.bigWinResultCoin / 100).toFixed(2);
          _this7.lblWinCoin.string = (_this7.bigWinCoin / 100).toFixed(2);
          _this7.bigWinResultAnim.getChildByName('coin').getComponent(cc.Label).string = (_this7.bigWinCoin / 100).toFixed(2);
          var lt = [10, 30, 100, 1000];

          for (var i in lt) {
            _this7.bigWinResultAnim.getChildByName('' + lt[i]).active = _this7.bigWinCard == lt[i];
          }

          _this7.bigWinBoo = false;
        }, 2);
      }
    }
  }
});

cc._RF.pop();