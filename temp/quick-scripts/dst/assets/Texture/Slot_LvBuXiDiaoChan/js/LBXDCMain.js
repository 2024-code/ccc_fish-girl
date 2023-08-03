
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_LvBuXiDiaoChan/js/LBXDCMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fdf5dDS2UZPOpLdzrjfi0KN', 'LBXDCMain');
// Texture/Slot_LvBuXiDiaoChan/js/LBXDCMain.js

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
    this.net = this.node.getComponent('LBXDCNetwork');
    this.audio = this.node.getComponent('LBXDCAudio');
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

      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.playWinAnim();
        }
      }, 1);

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
    this.bigWinNode.getChildByName("slots_minigame_wheel").rotation = 0;
    this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").rotation = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9MdkJ1WGlEaWFvQ2hhblxcanNcXExCWERDTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsIlJVTEVMSVNUIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzcFVzZXJGYWNlIiwidHlwZSIsIlNwcml0ZSIsImRpc3BsYXlOYW1lIiwibGJsVXNlck5hbWUiLCJMYWJlbCIsImxibFVzZXJDb2luIiwibGJsQmV0IiwibGJsTGluZXMiLCJsYmxDdXJCZXQiLCJsYmxXaW5Db2luIiwibGJsQ29pbkxpc3QiLCJyb2xsQnRuQW5pbSIsIkFuaW1hdGlvbiIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJlZmZlY3RBbmltUHIiLCJOb2RlIiwiZWZmZWN0QW5pbUZ1bGxBIiwiZWZmZWN0QW5pbUZ1bGxCIiwiZWZmZWN0QW5pbUJpZ0Z1bGwiLCJiaWdXaW5Ob2RlIiwiYmlnV2luUmVzdWx0QW5pbSIsIkJnTm9kZSIsImZyZWVCZ05vZGUiLCJmcmVlQmVnaW5Ob2RlIiwiZnJlZUVuZE5vZGUiLCJmcmVlVGltZXNOb2RlIiwiaGVscFVJIiwiaGVscE51bSIsImF1ZGlvQnRuIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImRlbGF5Q2xpY2siLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsImFjdGl2ZSIsInBsYXlCZ20iLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJwbGF5V2luQW5pbSIsInZpZXdhcnJheSIsImdldE9wZW5Cb3giLCJiRmxhZyIsIndpbiIsImJpZ1dpblJlc3VsdENvaW4iLCJ1c2VyX3Njb3JlIiwic3RhcnRCaWdXaW4iLCJnZXRGcmVlVGltZSIsIm5GcmVlVGltZSIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJoYXNXaW5Cb29sIiwiYWxsTGluZSIsIm5XaW5DYXJkcyIsInB1c2giLCJsaW5lcyIsIm5XaW5MaW5lc0RldGFpbCIsImxpc3QiLCJTa2VsZXRvbiIsImNsZWFyVHJhY2siLCJzZXRBbmltYXRpb24iLCJsYmxfY29pbiIsImFkZGNvaW4iLCJzY2hlZHVsZSIsImFuaW1JbmRleCIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwiZk11bHRpcGxlIiwic3RvcEZyZWVUaW1lcyIsImNvbnNvbGUiLCJsb2ciLCJjaG9vc2VHYW1lIiwiY3VzdG9tZW50RGF0YSIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwiY2hvb3NlIiwic2VuZEZyZWUiLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJvcGFjaXR5IiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwibkJldExpc3QiLCJyb3RhdGlvbiIsInN1aXBpYW5BcnJheSIsIm5XaW5PcGVuQm94IiwiYmlnV2luQmVnaW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJ0ZW1wV2hlZWwiLCJ0ZW1wRHUiLCJsb2NhdGlvbiIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwicm90YXRlQnkiLCJlYXNpbmciLCJlYXNlT3V0IiwiY2FsbEZ1bmMiLCJkZWxheVRpbWUiLCJiaWdXaW5DbGljayIsImJpZ1dpblRpbWVzIiwibnVtIiwiQmlnV2luU2V0Iiwic2l6ZSIsImFkZCIsIndpbk5vZGVQciIsIm5hbWVMaXN0IiwibmQiLCJsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLEVBQWQsRUFBa0I7O0FBQ2xCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0Qs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LEdBQW5CLEVBQXdCb0IsT0FBeEIsQ0FBZ0MsQ0FBaEMsQ0FBN0U7QUFDQSxjQUFJaUgsRUFBRSxHQUFHLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxHQUFULEVBQWMsSUFBZCxDQUFUOztBQUNBLGVBQUssSUFBSW5HLENBQVQsSUFBY21HLEVBQWQsRUFBa0I7QUFDZCxZQUFBLE1BQUksQ0FBQzVKLGdCQUFMLENBQXNCa0YsY0FBdEIsQ0FBcUMsS0FBSzBFLEVBQUUsQ0FBQ25HLENBQUQsQ0FBNUMsRUFBaURKLE1BQWpELEdBQTBELE1BQUksQ0FBQy9CLFVBQUwsSUFBbUJzSSxFQUFFLENBQUNuRyxDQUFELENBQS9FO0FBQ0g7O0FBQ0QsVUFBQSxNQUFJLENBQUNqQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0gsU0FWRCxFQVVHLENBVkg7QUFXSDtBQUNKO0FBQ0o7QUFqckJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJFVE5VTSA9IDIuNTsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSAyNTsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzMwLCAxMDAwLCAxMDAsIDEwXTtcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY29uc3QgUlVMRUxJU1QgPSBbMiwgMC4yLCAwLjEsIDEsIDAuMiwgMC4xLCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMywgMC42LCAwLjJdOyAvL+inhOWImVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwVXNlckZhY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WktOWDjycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflkI0nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfljZXms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsTGluZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57q/5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsQnRuQW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb24sXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncm9sbOaMiemSruWKqOeUuycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcEF0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WbvumbhicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfoh6rliqjmjInpkq5TcHJpdGUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbVByOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW54m55pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxCOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltQmlnRnVsbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWkp+WlluWFqOWxj+eJueaViCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+Wkp+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luUmVzdWx0QW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2JpZ1dpbuS4reWllidcclxuICAgICAgICB9LFxyXG4gICAgICAgIEJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a4uOaIj+iDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgICAgICBmcmVlQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVCZWdpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflvIDlp4vlhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUVuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnu5PmnZ/lhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVUaW1lc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbmmL7npLroioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBOdW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2i5Y+v5Y+Y5rOo5pWwJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aOw6Z+z5oyJ6ZKuJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnTEJYRENOZXR3b3JrJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0xCWERDQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG5vbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sbEJ0bkFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYWRkJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgKz0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSBCRVQubGVuZ3RoID8gQkVULmxlbmd0aCAtIDEgOiB0aGlzLmJldDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2RlYycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gMCA/IHRoaXMuYmV0IDogMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlQmlnV2luJykge1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnaGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhyID0gdGhpcy5oZWxwTnVtLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGhyKSB7XHJcbiAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlSGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdleGl0R2FtZScpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID0gIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID8gJ2J0bl9zb3VuZCcgOiAnYnRuX3NvdW5kXzInKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYmlnV2luQm9vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5iaWdXaW5DYXJkID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9jYXJkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QmlnV2luKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJmaXJlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSwgXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwid2luX2NuXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfSwgMCwgMzAsIDAuMDEpXHJcbiAgICAgICAgICAgIC8v5Yik5pat5pKt5pS+6YeR5biB5o6J6JC95Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgPiBCRVRbdGhpcy5iZXRdICogQkVUTlVNICoxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcImFuaW1hdGlvbjFcIix0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZmlyZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImZpcmVcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8v6YCJ5oup5ri45oiPXHJcbiAgICBjaG9vc2VHYW1lKGV2ZW50LCBjdXN0b21lbnREYXRhKXtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnY2hvb3NlR2FtZScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgY2hvb3NlOiBjdXN0b21lbnREYXRhLFxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcbiAgICAvL+mAieaLqeWQjuW8gOWni+WFjei0uVxyXG4gICAgc2VuZEZyZWUoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKCdidG5femlkb25nJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIix0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVfbWFpblwiKS5nZXRDaGlsZEJ5TmFtZShcIk1BU0tcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsaW5lXCIgKyBpKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lX21haW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJpY2VcIiArIGkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCl7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA+PSB0aGlzLnJvbGVQYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm9sbERhdGEobGlzdCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoYFxyXG4gICAgICAgICAgICDmnI3liqHlmajojrflj5bnmoToirHoibLnp43nsbvlpKfkuo7njrDmnInnmoToirHoibLnp43nsbvvvIHvvIHvvIFcclxuICAgICAgICAgICAg6K+36IGU57O75pyN5Yqh5Zmo5Lq65ZGY6L+b6KGM5pWw5o2u6LCD5pW077yBYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpbmVbaSAlIDVdWzIgLSBwYXJzZUludChpIC8gNSldID0gbGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdGFydFJvbGwoLi4ubGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlKSB7Ly/lkJXluIPmqKHlvI8g5pyJ5LiA5YiX5YWo5pivd2lsZOWwseWGu+e7k+S9j1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0W2kgLSAxXSA9PSAxMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaSArIDRdID09IDEwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtpICsgOV0gPT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lX21haW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJNQVNLXCIpLmdldENoaWxkQnlOYW1lKFwibGluZVwiICsgaSkub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZV9tYWluXCIpLmdldENoaWxkQnlOYW1lKFwiaWNlXCIgKyBpKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lX21haW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJNQVNLXCIpLmdldENoaWxkQnlOYW1lKFwibGluZVwiICsgaSkub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVfbWFpblwiKS5nZXRDaGlsZEJ5TmFtZShcImljZVwiICsgaSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCwgXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEJpZ1dpbigpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfd2hlZWxcIikucm90YXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsX3BpbnR1XCIpLnJvdGF0aW9uID0gMDtcclxuICAgICAgICBsZXQgc3VpcGlhbkFycmF5ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lm5XaW5PcGVuQm94O1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsX3BpbnR1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gNjsgaisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsX3BpbnR1XCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfcGludHVcIiArIGopLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9pY29uXCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfaWNvbl9waWVjZVwiICsgaikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VpcGlhbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsX3BpbnR1XCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfcGludHVcIiArIHN1aXBpYW5BcnJheVtpXSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfaWNvblwiKS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX2ljb25fcGllY2VcIiArIHN1aXBpYW5BcnJheVtpXSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX2JlZ2luXCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX3BpZWNlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGJpZ1dpbkJlZ2luKGV2ZW50LCBjdXN0b21lbnREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX2JlZ2luXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9idG5fYmVnaW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9idG5fcGllY2VcIikuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wV2hlZWwgPSB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV93aGVlbF9waW50dVwiKTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEdSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5sb2NhdGlvbjtcclxuICAgICAgICAgICAgc3dpdGNoIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDM2MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDMwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDI0MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDE4MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDEyMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDYwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVtcFdoZWVsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5yb3RhdGVCeSgwLjUsIDM2MCksXHJcbiAgICAgICAgICAgICAgICBjYy5yb3RhdGVCeSgyLjUsIDM2MCArIHRlbXBEdSkuZWFzaW5nKGNjLmVhc2VPdXQoNSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV93aGVlbF9waW50dVwiKS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX3BpbnR1XCIgKyBsb2NhdGlvbikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9pY29uXCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfaWNvbl9waWVjZVwiICsgbG9jYXRpb24pLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX2JlZ2luXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX2JlZ2luXCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX3BpZWNlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpZ1dpbkNvaW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsX3BpbnR1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wV2hlZWwgPSB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV93aGVlbFwiKTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEdSA9IDA7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5iaWdXaW5Db2luKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcER1ID0gMTIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDAwMDAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDYwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcER1ID0gMTgwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDUwMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSAyNDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjAwMDAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDMwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1MDAwMDpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSAzNjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wV2hlZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnJvdGF0ZUJ5KDAuNSwgMzYwKSxcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KDIuNSwgMzYwICsgdGVtcER1KS5lYXNpbmcoY2MuZWFzZU91dCg1KSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX2J0bl9iZWdpblwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMiksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luUmVzdWx0Q29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJ2xibF9jb2luICcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTs7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJpZ1dpbkNsaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSB0aGlzLkJpZ1dpblNldC5zaXplO1xyXG4gICAgICAgICAgICB0aGlzLkJpZ1dpblNldC5hZGQoYXJncyk7XHJcbiAgICAgICAgICAgIGlmIChudW0gPT0gdGhpcy5CaWdXaW5TZXQuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3aW5Ob2RlUHIgPSB0aGlzLmJpZ1dpbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luVGltZXMtLTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5iaWdXaW5SZXNMaXN0W3RoaXMuYmlnV2luVGltZXNdO1xyXG4gICAgICAgICAgICBsZXQgbmFtZUxpc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAxMDogJ3NfYm9udXNfU0gwMEZfbWlub3InLFxyXG4gICAgICAgICAgICAgICAgMTAwOiAnc19ib251c19TSDAwRl9tZWRpdW0nLFxyXG4gICAgICAgICAgICAgICAgMTAwMDogJ3NfYm9udXNfU0gwMEZfbWVnYSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmQgPSB3aW5Ob2RlUHJbYXJnc10uZ2V0Q2hpbGRCeU5hbWUobmFtZUxpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luUmVzdWx0Q29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJ2NvaW4nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGx0ID0gWzEwLCAzMCwgMTAwLCAxMDAwXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5nZXRDaGlsZEJ5TmFtZSgnJyArIGx0W2ldKS5hY3RpdmUgPSB0aGlzLmJpZ1dpbkNhcmQgPT0gbHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pOyJdfQ==