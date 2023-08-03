
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_yueguangbaohe/js/YGBHMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF95dWVndWFuZ2Jhb2hlXFxqc1xcWUdCSE1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiYmlnV2luTm9kZSIsImJpZ1dpblJlc3VsdEFuaW0iLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImhlbHBOdW0iLCJhdWRpb0J0biIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJkZWxheUNsaWNrIiwidHVybk51bSIsInN0YXJ0Iiwid2luZG93IiwiR0FNRU1VTCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInZpZXdhcnJheSIsImdldEZyZWVUaW1lIiwiYkZsYWciLCJzY2hlZHVsZU9uY2UiLCJzdG9wSW1tZWRpYXRlbHkiLCJsZW5ndGgiLCJhY3RpdmUiLCJwbGF5QmdtIiwiaHIiLCJjaGlsZHJlbiIsImkiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwiZ2V0T3BlbkJveCIsIndpbiIsImJpZ1dpblJlc3VsdENvaW4iLCJ1c2VyX3Njb3JlIiwic3RhcnRCaWdXaW4iLCJuRnJlZVRpbWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsImdldENoaWxkQnlOYW1lIiwicGxheVdpbkFuaW0iLCJ0bSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiYWRkY29pbiIsInNjaGVkdWxlIiwiYW5pbUluZGV4IiwiY2xzb2VBbmltIiwicGFyc2VJbnQiLCJqIiwic2hvd0FuaW0iLCJmTXVsdGlwbGUiLCJzdG9wRnJlZVRpbWVzIiwiY29uc29sZSIsImxvZyIsImNob29zZUdhbWUiLCJjdXN0b21lbnREYXRhIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaG9vc2UiLCJzZW5kRnJlZSIsImZyZWVIaWRlTm9kZSIsImluaXRXaGVlbCIsIm9wYWNpdHkiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJzdG9wQW5pbSIsImNoZWNrUm9sbERhdGEiLCJpdGVyYXRvciIsInJvbGwiLCJhbGVydCIsImxpbmUiLCJzdGFydFJvbGwiLCJuQmV0TGlzdCIsImFuZ2xlIiwic3VpcGlhbkFycmF5Iiwibldpbk9wZW5Cb3giLCJiaWdXaW5CZWdpbiIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInRlbXBXaGVlbCIsInRlbXBEdSIsImxvY2F0aW9uIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJyb3RhdGVCeSIsImVhc2luZyIsImVhc2VPdXQiLCJjYWxsRnVuYyIsImRlbGF5VGltZSIsImJpZ1dpbkNsaWNrIiwiYmlnV2luVGltZXMiLCJudW0iLCJCaWdXaW5TZXQiLCJzaXplIiwiYWRkIiwid2luTm9kZVByIiwibmFtZUxpc3QiLCJuZCIsImx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLE1BQU0sR0FBRyxHQUFmLEVBQW9COztBQUNwQixJQUFNQyxLQUFLLEdBQUcsRUFBZCxFQUFrQjs7QUFDbEIsSUFBTUMsTUFBTSxHQUFHLENBQUMsRUFBRCxFQUFLLElBQUwsRUFBVyxHQUFYLEVBQWdCLEVBQWhCLENBQWY7QUFDQSxJQUFNQyxHQUFHLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixFQUE1QixDQUFaO0FBQ0EsSUFBTUMsUUFBUSxHQUFHLENBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxHQUFULEVBQWMsQ0FBZCxFQUFpQixHQUFqQixFQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxHQUFoQyxFQUFxQyxJQUFyQyxFQUEyQyxHQUEzQyxFQUFnRCxHQUFoRCxFQUFxRCxJQUFyRCxFQUEyRCxHQUEzRCxFQUFnRSxHQUFoRSxFQUFxRSxJQUFyRSxFQUEyRSxHQUEzRSxFQUFnRixHQUFoRixFQUFxRixJQUFyRixFQUEyRixDQUEzRixFQUE4RixHQUE5RixFQUFtRyxHQUFuRyxDQUFqQixFQUEwSDs7QUFDMUhDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxNQUZEO0FBR1JDLE1BQUFBLFdBQVcsRUFBRTtBQUhMLEtBREo7QUFNUkMsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsS0FGQTtBQUdURixNQUFBQSxXQUFXLEVBQUU7QUFISixLQU5MO0FBV1JHLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkE7QUFHVEYsTUFBQUEsV0FBVyxFQUFFO0FBSEosS0FYTDtBQWdCUkksSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKTixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsS0FGTDtBQUdKRixNQUFBQSxXQUFXLEVBQUU7QUFIVCxLQWhCQTtBQXFCUkssSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVOUCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsS0FGSDtBQUdORixNQUFBQSxXQUFXLEVBQUU7QUFIUCxLQXJCRjtBQTBCUk0sSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQUixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsS0FGRjtBQUdQRixNQUFBQSxXQUFXLEVBQUU7QUFITixLQTFCSDtBQStCUk8sSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSVCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsS0FGRDtBQUdSRixNQUFBQSxXQUFXLEVBQUU7QUFITCxLQS9CSjtBQW9DUlEsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsRUFEQTtBQUVUVixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsS0FGQTtBQUdURixNQUFBQSxXQUFXLEVBQUU7QUFISixLQXBDTDtBQXlDUlMsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUWCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ2lCLFNBRkE7QUFHVFYsTUFBQUEsV0FBVyxFQUFFO0FBSEosS0F6Q0w7QUE4Q1JXLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLEVBREw7QUFFSmIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNtQixNQUZMO0FBR0paLE1BQUFBLFdBQVcsRUFBRTtBQUhULEtBOUNBO0FBbURSYSxJQUFBQSxPQUFPLEVBQUU7QUFDTCxpQkFBUyxJQURKO0FBRUxmLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDcUIsV0FGSjtBQUdMZCxNQUFBQSxXQUFXLEVBQUU7QUFIUixLQW5ERDtBQXdEUmUsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMakIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE1BRko7QUFHTEMsTUFBQUEsV0FBVyxFQUFFO0FBSFIsS0F4REQ7QUE2RFJnQixJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZsQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkM7QUFHVmpCLE1BQUFBLFdBQVcsRUFBRTtBQUhILEtBN0ROO0FBa0VSa0IsSUFBQUEsZUFBZSxFQUFFO0FBQ2IsaUJBQVMsSUFESTtBQUVicEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZJO0FBR2JqQixNQUFBQSxXQUFXLEVBQUU7QUFIQSxLQWxFVDtBQXVFUm1CLElBQUFBLGVBQWUsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYnJCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGSTtBQUdiakIsTUFBQUEsV0FBVyxFQUFFO0FBSEEsS0F2RVQ7QUE0RVJvQixJQUFBQSxpQkFBaUIsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZnRCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGTTtBQUdmakIsTUFBQUEsV0FBVyxFQUFFO0FBSEUsS0E1RVg7QUFrRlJxQixJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJ2QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkQ7QUFHUmpCLE1BQUFBLFdBQVcsRUFBRTtBQUhMLEtBbEZKO0FBd0ZSc0IsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDZCxpQkFBUyxJQURLO0FBRWR4QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRks7QUFHZGpCLE1BQUFBLFdBQVcsRUFBRTtBQUhDLEtBeEZWO0FBNkZSdUIsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKekIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZMO0FBR0pqQixNQUFBQSxXQUFXLEVBQUU7QUFIVCxLQTdGQTtBQW1HUjtBQUNBd0IsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSMUIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZEO0FBR1JqQixNQUFBQSxXQUFXLEVBQUU7QUFITCxLQXBHSjtBQXlHUnlCLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTLElBREU7QUFFWDNCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGRTtBQUdYakIsTUFBQUEsV0FBVyxFQUFFO0FBSEYsS0F6R1A7QUE4R1IwQixJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVQ1QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkE7QUFHVGpCLE1BQUFBLFdBQVcsRUFBRTtBQUhKLEtBOUdMO0FBb0hSMkIsSUFBQUEsYUFBYSxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYN0IsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZFO0FBR1hqQixNQUFBQSxXQUFXLEVBQUU7QUFIRixLQXBIUDtBQTBIUjRCLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSjlCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGTDtBQUdKakIsTUFBQUEsV0FBVyxFQUFFO0FBSFQsS0ExSEE7QUFnSVI2QixJQUFBQSxPQUFPLEVBQUU7QUFDTCxpQkFBUyxJQURKO0FBRUwvQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRko7QUFHTGpCLE1BQUFBLFdBQVcsRUFBRTtBQUhSLEtBaElEO0FBc0lSOEIsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVOaEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE1BRkg7QUFHTkMsTUFBQUEsV0FBVyxFQUFFO0FBSFA7QUF0SUYsR0FIUDtBQWdKTCtCLEVBQUFBLE1BaEpLLG9CQWdKSTtBQUNMLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQXhDO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixhQUF2QixDQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtGLElBQUwsQ0FBVUMsWUFBVixDQUF1QixXQUF2QixDQUFiO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxDQUFYO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEtBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBckI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0gsR0FyS0k7QUF1S0xDLEVBQUFBLEtBdktLLG1CQXVLRztBQUFBOztBQUNKLFNBQUtwRSxNQUFMLEdBQWNxRSxNQUFNLENBQUNDLE9BQXJCLENBREksQ0FDeUI7O0FBQzdCLFNBQUtyRCxRQUFMLENBQWNzRCxNQUFkLEdBQXVCdEUsS0FBdkI7QUFDQSxTQUFLa0IsVUFBTCxDQUFnQm9ELE1BQWhCLEdBQXlCLE1BQXpCO0FBQ0EsU0FBS0MsTUFBTDtBQUNBQyxJQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0IsS0FBSzlCLFVBQUwsQ0FBZ0IrQixZQUFoQyxFQUE4QyxVQUFBQyxFQUFFLEVBQUk7QUFDaEQsTUFBQSxLQUFJLENBQUNuRSxVQUFMLENBQWdCb0UsV0FBaEIsR0FBOEJELEVBQTlCO0FBQ0gsS0FGRDtBQUdBLFNBQUsvRCxXQUFMLENBQWlCMEQsTUFBakIsR0FBMEIsS0FBSzNCLFVBQUwsQ0FBZ0JrQyxVQUExQztBQUNBLFNBQUsvRCxXQUFMLENBQWlCd0QsTUFBakIsR0FBMEIsS0FBSzNCLFVBQUwsQ0FBZ0JtQyxVQUFoQixDQUEyQkMsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBMUI7QUFDSCxHQWpMSTtBQW1MTEMsRUFBQUEsT0FuTEssbUJBbUxHQyxLQW5MSCxFQW1MVUMsSUFuTFYsRUFtTGdCO0FBQUE7O0FBQ2pCLFFBQUlBLElBQUksSUFBSSxNQUFaLEVBQW9CO0FBQ2hCLFVBQUksS0FBS3hCLFNBQUwsR0FBaUIsQ0FBakIsSUFBc0IsS0FBS0QsU0FBM0IsSUFBd0MsS0FBS0ssUUFBN0MsSUFBeUQsS0FBS0UsV0FBOUQsSUFBNkUsS0FBS0MsVUFBdEYsRUFBa0c7QUFDOUY7QUFDSDs7QUFDRCxXQUFLYixJQUFMLEdBQVksQ0FBQyxLQUFLQSxJQUFsQjtBQUNBLFdBQUsxQixPQUFMLENBQWFrRCxXQUFiLEdBQTJCLEtBQUtwRCxPQUFMLENBQWEyRCxjQUFiLENBQTRCLEtBQUsvQixJQUFMLEdBQVksYUFBWixHQUE0QixZQUF4RCxDQUEzQjs7QUFDQSxVQUFJLEtBQUtBLElBQUwsSUFBYSxLQUFLQyxNQUFMLElBQWUsQ0FBaEMsRUFBbUM7QUFDL0IsYUFBSytCLFFBQUw7QUFDSDtBQUNKLEtBVEQsTUFTTyxJQUFJRixJQUFJLElBQUksTUFBWixFQUFvQjtBQUN2QixVQUFJLEtBQUt4QixTQUFMLEdBQWlCLENBQWpCLElBQXNCLEtBQUtELFNBQTNCLElBQXdDLEtBQUtLLFFBQTdDLElBQXlELEtBQUtFLFdBQTlELElBQTZFLEtBQUtDLFVBQXRGLEVBQWtHO0FBQzlGO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDLEtBQUtiLElBQVYsRUFBZ0I7QUFDWixZQUFJLEtBQUtDLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNsQixlQUFLakMsV0FBTCxDQUFpQmlFLElBQWpCO0FBQ0EsZUFBS2hDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsZUFBSytCLFFBQUw7QUFDSCxTQUpELE1BSU8sSUFBSSxLQUFLL0IsTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ3pCLGNBQUksS0FBS1EsVUFBTCxDQUFnQnlCLFNBQWhCLENBQTBCQyxXQUExQixDQUFzQ0MsS0FBMUMsRUFBaUQ7QUFDN0M7QUFDSDs7QUFDRCxlQUFLdkIsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGVBQUt3QixZQUFMLENBQWtCLFlBQU07QUFDcEIsWUFBQSxNQUFJLENBQUN4QixVQUFMLEdBQWtCLEtBQWxCO0FBQ0gsV0FGRCxFQUVHLENBRkg7QUFHQSxlQUFLeUIsZUFBTDtBQUNIO0FBQ0o7QUFDSixLQXBCTSxNQW9CQSxJQUFJUixJQUFJLElBQUksS0FBWixFQUFtQjtBQUN0QixVQUFJLEtBQUt4QixTQUFMLEdBQWlCLENBQWpCLElBQXNCLEtBQUtELFNBQTNCLElBQXdDLEtBQUtLLFFBQTdDLElBQXlELEtBQUtWLElBQWxFLEVBQXdFO0FBQ3BFO0FBQ0g7O0FBQ0QsV0FBS0QsR0FBTCxJQUFZLENBQVo7QUFDQSxXQUFLQSxHQUFMLEdBQVcsS0FBS0EsR0FBTCxJQUFZakQsR0FBRyxDQUFDeUYsTUFBaEIsR0FBeUJ6RixHQUFHLENBQUN5RixNQUFKLEdBQWEsQ0FBdEMsR0FBMEMsS0FBS3hDLEdBQTFEO0FBQ0EsV0FBS29CLE1BQUw7QUFDSCxLQVBNLE1BT0EsSUFBSVcsSUFBSSxJQUFJLEtBQVosRUFBbUI7QUFDdEIsVUFBSSxLQUFLeEIsU0FBTCxHQUFpQixDQUFqQixJQUFzQixLQUFLRCxTQUEzQixJQUF3QyxLQUFLSyxRQUE3QyxJQUF5RCxLQUFLVixJQUFsRSxFQUF3RTtBQUNwRTtBQUNIOztBQUNELFdBQUtELEdBQUwsSUFBWSxDQUFaO0FBQ0EsV0FBS0EsR0FBTCxHQUFXLEtBQUtBLEdBQUwsSUFBWSxDQUFaLEdBQWdCLEtBQUtBLEdBQXJCLEdBQTJCLENBQXRDO0FBQ0EsV0FBS29CLE1BQUw7QUFDSCxLQVBNLE1BT0EsSUFBSVcsSUFBSSxJQUFJLGFBQVosRUFBMkI7QUFDOUIsV0FBS2pELGdCQUFMLENBQXNCMkQsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxXQUFLNUQsVUFBTCxDQUFnQjRELE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0EsV0FBSzNDLEtBQUwsQ0FBVzRDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDSCxLQUpNLE1BSUEsSUFBSVgsSUFBSSxJQUFJLE1BQVosRUFBb0I7QUFDdkIsV0FBSzNDLE1BQUwsQ0FBWXFELE1BQVosR0FBcUIsSUFBckI7QUFDQSxVQUFJRSxFQUFFLEdBQUcsS0FBS3RELE9BQUwsQ0FBYXVELFFBQXRCOztBQUNBLFdBQUssSUFBSUMsQ0FBVCxJQUFjRixFQUFkLEVBQWtCO0FBQ2RBLFFBQUFBLEVBQUUsQ0FBQ0UsQ0FBRCxDQUFGLENBQU1oRCxZQUFOLENBQW1CNUMsRUFBRSxDQUFDUyxLQUF0QixFQUE2QnlELE1BQTdCLEdBQXNDLENBQUNuRSxRQUFRLENBQUM2RixDQUFELENBQVIsR0FBYzlGLEdBQUcsQ0FBQyxLQUFLaUQsR0FBTixDQUFsQixFQUE4QjRCLE9BQTlCLENBQXNDLENBQXRDLENBQXRDO0FBQ0g7QUFDSixLQU5NLE1BTUEsSUFBSUcsSUFBSSxJQUFJLFdBQVosRUFBeUI7QUFDNUIsV0FBSzNDLE1BQUwsQ0FBWXFELE1BQVosR0FBcUIsS0FBckI7QUFDSCxLQUZNLE1BRUEsSUFBSVYsSUFBSSxJQUFJLFVBQVosRUFBd0I7QUFDM0IsV0FBS3BDLEdBQUwsQ0FBU21ELE1BQVQsQ0FBZ0JDLFVBQWhCO0FBQ0E5RixNQUFBQSxFQUFFLENBQUMrRixRQUFILENBQVlDLFNBQVosQ0FBc0IsV0FBdEI7QUFDSCxLQUhNLE1BR0EsSUFBSWxCLElBQUksSUFBSSxPQUFaLEVBQXFCO0FBQ3hCLFdBQUtqQyxLQUFMLENBQVdvRCxLQUFYLENBQWlCQyxZQUFqQixHQUFnQyxDQUFDLEtBQUtyRCxLQUFMLENBQVdvRCxLQUFYLENBQWlCQyxZQUFsRDtBQUNBLFdBQUs3RCxRQUFMLENBQWNtQyxXQUFkLEdBQTRCLEtBQUtwRCxPQUFMLENBQWEyRCxjQUFiLENBQTRCLEtBQUtsQyxLQUFMLENBQVdvRCxLQUFYLENBQWlCQyxZQUFqQixHQUFnQyxXQUFoQyxHQUE4QyxhQUExRSxDQUE1Qjs7QUFDQSxVQUFJLENBQUMsS0FBS3JELEtBQUwsQ0FBV29ELEtBQVgsQ0FBaUJDLFlBQXRCLEVBQW9DO0FBQ2hDLGFBQUtyRCxLQUFMLENBQVdzRCxTQUFYO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsWUFBSSxLQUFLN0MsU0FBTCxHQUFpQixDQUFyQixFQUF3QjtBQUNwQixlQUFLVCxLQUFMLENBQVc0QyxPQUFYLENBQW1CLENBQW5CO0FBQ0gsU0FGRCxNQUVPLElBQUksS0FBS3BDLFNBQVQsRUFBb0I7QUFDdkIsZUFBS1IsS0FBTCxDQUFXNEMsT0FBWCxDQUFtQixDQUFuQjtBQUNILFNBRk0sTUFFQTtBQUNILGVBQUs1QyxLQUFMLENBQVc0QyxPQUFYLENBQW1CLENBQW5CO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0E3UEk7QUErUEx0QixFQUFBQSxNQS9QSyxvQkErUEk7QUFDTCxTQUFLeEQsTUFBTCxDQUFZdUQsTUFBWixHQUFxQixDQUFDcEUsR0FBRyxDQUFDLEtBQUtpRCxHQUFOLENBQUgsR0FBZ0JwRCxNQUFqQixFQUF5QmdGLE9BQXpCLENBQWlDLENBQWpDLENBQXJCO0FBQ0EsU0FBSzlELFNBQUwsQ0FBZXFELE1BQWYsR0FBd0IsQ0FBQ3BFLEdBQUcsQ0FBQyxLQUFLaUQsR0FBTixDQUFILEdBQWdCcEQsTUFBakIsRUFBeUJnRixPQUF6QixDQUFpQyxDQUFqQyxDQUF4Qjs7QUFDQSxTQUFLLElBQUlpQixDQUFULElBQWMsS0FBSzdFLFdBQW5CLEVBQWdDO0FBQzVCLFdBQUtBLFdBQUwsQ0FBaUI2RSxDQUFqQixFQUFvQjFCLE1BQXBCLEdBQTZCLENBQUNyRSxNQUFNLENBQUMrRixDQUFELENBQU4sSUFBYSxLQUFLN0MsR0FBTCxHQUFXLENBQXhCLElBQTZCcEQsTUFBOUIsRUFBc0NnRixPQUF0QyxDQUE4QyxDQUE5QyxDQUE3QjtBQUNIO0FBQ0osR0FyUUk7QUF1UUx5QixFQUFBQSxhQXZRSywyQkF1UVc7QUFBQTs7QUFDWixRQUFJQyxFQUFFLEdBQUcsQ0FBVDs7QUFDQSxTQUFLLElBQUlULENBQVQsSUFBYyxLQUFLOUMsU0FBbkIsRUFBOEI7QUFDMUIsVUFBSSxLQUFLQSxTQUFMLENBQWU4QyxDQUFmLEVBQWtCM0MsTUFBdEIsRUFBOEI7QUFDMUJvRCxRQUFBQSxFQUFFLEdBQUcsQ0FBTDtBQUNBO0FBQ0g7QUFDSjs7QUFDRCxTQUFLcEQsTUFBTCxHQUFjb0QsRUFBZDs7QUFDQSxRQUFJLEtBQUtwRCxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEI7QUFDQSxVQUFJcUQsTUFBTSxHQUFHLEtBQUs5QyxTQUFsQjtBQUNBLFdBQUs5QyxXQUFMLENBQWlCd0QsTUFBakIsR0FBMEIsQ0FBQyxLQUFLVCxVQUFMLENBQWdCOEMsU0FBaEIsR0FBNEIsR0FBN0IsRUFBa0M1QixPQUFsQyxDQUEwQyxDQUExQyxDQUExQjtBQUNBLFdBQUs3RCxVQUFMLENBQWdCb0QsTUFBaEIsR0FBeUIsQ0FBQyxLQUFLVCxVQUFMLENBQWdCK0MsUUFBaEIsR0FBMkIsR0FBNUIsRUFBaUM3QixPQUFqQyxDQUF5QyxDQUF6QyxDQUF6Qjs7QUFDQSxVQUFJLEtBQUtmLFdBQVQsRUFBc0I7QUFDbEIsYUFBS0QsWUFBTCxJQUFxQixLQUFLRixVQUFMLENBQWdCK0MsUUFBckM7QUFDSDs7QUFFRCxVQUFJLEtBQUsvQyxVQUFMLENBQWdCeUIsU0FBaEIsQ0FBMEJ1QixVQUExQixDQUFxQ3JCLEtBQXpDLEVBQWdEO0FBQzVDLGFBQUsvQixTQUFMLEdBQWlCLElBQWpCLENBRDRDLENBRTVDO0FBQ0E7QUFDQTs7QUFDQSxhQUFLRCxVQUFMLEdBQWtCLEtBQUtLLFVBQUwsQ0FBZ0J5QixTQUFoQixDQUEwQnVCLFVBQTFCLENBQXFDQyxHQUF2RDtBQUNBLGFBQUtDLGdCQUFMLEdBQXdCLEtBQUtsRCxVQUFMLENBQWdCeUIsU0FBaEIsQ0FBMEIwQixVQUFsRDtBQUNBLGFBQUt2QixZQUFMLENBQWtCLFlBQU07QUFDcEIsVUFBQSxNQUFJLENBQUN3QixXQUFMO0FBQ0gsU0FGRCxFQUVHLENBRkg7QUFHSDs7QUFDRCxVQUFJLEtBQUtwRCxVQUFMLENBQWdCeUIsU0FBaEIsQ0FBMEJDLFdBQTFCLENBQXNDQyxLQUExQyxFQUFpRDtBQUM3QyxZQUFJLEtBQUs5QixTQUFMLElBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLGVBQUtBLFNBQUwsR0FBaUIsS0FBS0csVUFBTCxDQUFnQnlCLFNBQWhCLENBQTBCQyxXQUExQixDQUFzQzJCLFNBQXZEO0FBQ0EsZUFBS0MsVUFBTDtBQUNBLGVBQUtDLGFBQUw7QUFDQSxlQUFLM0IsWUFBTCxDQUFrQixZQUFNO0FBQ3BCO0FBQ0EsWUFBQSxNQUFJLENBQUMxQyxJQUFMLENBQVVzRSxjQUFWLENBQXlCLE1BQXpCLEVBQWlDekIsTUFBakMsR0FBMEMsS0FBMUM7QUFDQSxZQUFBLE1BQUksQ0FBQ3hELGFBQUwsQ0FBbUJ3RCxNQUFuQixHQUE0QixJQUE1QjtBQUNILFdBSkQsRUFJRyxDQUpIO0FBS0gsU0FURCxNQVNPO0FBQ0gsZUFBS2xDLFNBQUwsR0FBaUIsS0FBS0csVUFBTCxDQUFnQnlCLFNBQWhCLENBQTBCQyxXQUExQixDQUFzQzJCLFNBQXZEO0FBQ0EsZUFBS3BELFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDtBQUNKLE9BZEQsTUFjTztBQUNILGFBQUsyQixZQUFMLENBQWtCLFlBQU07QUFDcEIsY0FBSWlCLE1BQU0sSUFBSSxNQUFJLENBQUM5QyxTQUFuQixFQUE4QjtBQUMxQixZQUFBLE1BQUksQ0FBQ00sT0FBTCxJQUFnQixDQUFoQjs7QUFDQSxZQUFBLE1BQUksQ0FBQ29ELFdBQUwsQ0FBaUIsTUFBSSxDQUFDcEQsT0FBdEI7QUFDSDtBQUNKLFNBTEQsRUFLRyxDQUxIO0FBTUg7QUFDSjtBQUNKLEdBM1RJO0FBNlRMb0QsRUFBQUEsV0E3VEssdUJBNlRPQyxFQTdUUCxFQTZUVztBQUFBOztBQUNaO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLENBQWpCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0FBRUEsU0FBSyxJQUFJekIsQ0FBVCxJQUFjLEtBQUtuQyxVQUFMLENBQWdCeUIsU0FBaEIsQ0FBMEJvQyxTQUF4QyxFQUFtRDtBQUMvQyxVQUFJLEtBQUs3RCxVQUFMLENBQWdCeUIsU0FBaEIsQ0FBMEJvQyxTQUExQixDQUFvQzFCLENBQXBDLENBQUosRUFBNEM7QUFDeEN5QixRQUFBQSxPQUFPLENBQUNFLElBQVIsQ0FBYTNCLENBQWI7QUFDSDtBQUNKOztBQUNELFFBQUk0QixLQUFLLEdBQUcsS0FBSy9ELFVBQUwsQ0FBZ0J5QixTQUFoQixDQUEwQnVDLGVBQXRDO0FBQ0EsUUFBSW5CLE1BQU0sR0FBRyxLQUFLOUMsU0FBbEI7QUFDQSxRQUFJa0UsSUFBSSxHQUFJLEtBQUtwRSxTQUFMLEdBQWlCLENBQWpCLElBQXNCLEtBQUtJLFFBQTVCLEdBQXdDLENBQUMyRCxPQUFELENBQXhDLElBQXNEQSxPQUF0RCxTQUFrRUcsS0FBbEUsQ0FBWDtBQUNBSixJQUFBQSxVQUFVLEdBQUdNLElBQUksQ0FBQ25DLE1BQUwsR0FBYyxDQUEzQjs7QUFDQSxRQUFJNkIsVUFBVSxHQUFHLENBQWpCLEVBQW9CO0FBQ2hCO0FBQ0EsV0FBSzNGLGVBQUwsQ0FBcUIrRCxNQUFyQixHQUE4QixJQUE5QjtBQUNBLFdBQUsvRCxlQUFMLENBQXFCbUIsWUFBckIsQ0FBa0MyQixFQUFFLENBQUNvRCxRQUFyQyxFQUErQ0MsVUFBL0MsQ0FBMEQsQ0FBMUQ7QUFDQSxXQUFLbkcsZUFBTCxDQUFxQm1CLFlBQXJCLENBQWtDMkIsRUFBRSxDQUFDb0QsUUFBckMsRUFBK0NFLFlBQS9DLENBQTRELENBQTVELEVBQStELFFBQS9ELEVBQXlFLEtBQXpFLEVBSmdCLENBS2hCOztBQUNBLFdBQUtuRyxlQUFMLENBQXFCOEQsTUFBckIsR0FBOEIsSUFBOUI7QUFDQSxVQUFJc0MsUUFBUSxHQUFHLEtBQUtwRyxlQUFMLENBQXFCdUYsY0FBckIsQ0FBb0MsVUFBcEMsRUFBZ0RyRSxZQUFoRCxDQUE2RDVDLEVBQUUsQ0FBQ1MsS0FBaEUsQ0FBZjtBQUNBLFVBQUlzSCxPQUFPLEdBQUcsQ0FBZDtBQUNBLFdBQUtDLFFBQUwsQ0FBYyxZQUFNO0FBQ2hCRCxRQUFBQSxPQUFPLElBQUksTUFBSSxDQUFDdEUsVUFBTCxDQUFnQitDLFFBQWhCLEdBQTJCLEVBQXRDOztBQUNBLFlBQUl1QixPQUFPLEdBQUcsTUFBSSxDQUFDdEUsVUFBTCxDQUFnQitDLFFBQTlCLEVBQXdDO0FBQ3BDdUIsVUFBQUEsT0FBTyxHQUFHLE1BQUksQ0FBQ3RFLFVBQUwsQ0FBZ0IrQyxRQUExQjtBQUNIOztBQUNEc0IsUUFBQUEsUUFBUSxDQUFDNUQsTUFBVCxHQUFrQixDQUFDNkQsT0FBTyxHQUFHLEdBQVgsRUFBZ0JwRCxPQUFoQixDQUF3QixDQUF4QixDQUFsQjtBQUNILE9BTkQsRUFNRyxDQU5ILEVBTU0sRUFOTixFQU1VLElBTlYsRUFUZ0IsQ0FnQmhCOztBQUNBLFVBQUksS0FBS2xCLFVBQUwsQ0FBZ0IrQyxRQUFoQixHQUEyQjFHLEdBQUcsQ0FBQyxLQUFLaUQsR0FBTixDQUFILEdBQWdCcEQsTUFBaEIsR0FBd0IsR0FBdkQsRUFBNEQ7QUFBRTtBQUMxRCxhQUFLZ0MsaUJBQUwsQ0FBdUI2RCxNQUF2QixHQUFnQyxJQUFoQztBQUNBLGFBQUs3RCxpQkFBTCxDQUF1QmlCLFlBQXZCLENBQW9DMkIsRUFBRSxDQUFDb0QsUUFBdkMsRUFBaURDLFVBQWpELENBQTRELENBQTVEO0FBQ0EsYUFBS2pHLGlCQUFMLENBQXVCaUIsWUFBdkIsQ0FBb0MyQixFQUFFLENBQUNvRCxRQUF2QyxFQUFpREUsWUFBakQsQ0FBOEQsQ0FBOUQsRUFBaUUsWUFBakUsRUFBK0UsSUFBL0U7QUFDSDtBQUNKOztBQUNELFFBQUlJLFNBQVMsR0FBRyxDQUFoQjtBQUNBLFNBQUtELFFBQUwsQ0FBYyxZQUFNO0FBQ2hCLFVBQUkxQixNQUFNLElBQUksTUFBSSxDQUFDOUMsU0FBbkIsRUFBOEI7QUFDMUIsUUFBQSxNQUFJLENBQUN1RCxVQUFMOztBQUNBLGFBQUssSUFBSW5CLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsRUFBcEIsRUFBd0JBLEVBQUMsRUFBekIsRUFBNkI7QUFDekIsVUFBQSxNQUFJLENBQUNzQyxTQUFMLENBQWV0QyxFQUFDLEdBQUcsQ0FBbkIsRUFBc0J1QyxRQUFRLENBQUN2QyxFQUFDLEdBQUcsQ0FBTCxDQUE5QjtBQUNIOztBQUNELFlBQUksQ0FBQyxDQUFDLENBQUM4QixJQUFJLENBQUNPLFNBQUQsQ0FBWCxFQUF3QjtBQUNwQjtBQUNIOztBQUNELGFBQUssSUFBSUcsQ0FBVCxJQUFjVixJQUFJLENBQUNPLFNBQUQsQ0FBbEIsRUFBK0I7QUFDM0I7QUFDQSxVQUFBLE1BQUksQ0FBQ0ksUUFBTCxDQUFjWCxJQUFJLENBQUNPLFNBQUQsQ0FBSixDQUFnQkcsQ0FBaEIsSUFBcUIsQ0FBbkMsRUFBc0NELFFBQVEsQ0FBQ1QsSUFBSSxDQUFDTyxTQUFELENBQUosQ0FBZ0JHLENBQWhCLElBQXFCLENBQXRCLENBQTlDLEVBQXdFLE1BQUksQ0FBQzNFLFVBQUwsQ0FBZ0J5QixTQUFoQixDQUEwQm9ELFNBQWxHO0FBQ0g7O0FBQ0RMLFFBQUFBLFNBQVM7QUFDWjtBQUNKLEtBZkQsRUFlRyxDQWZILEVBZU1QLElBQUksQ0FBQ25DLE1BZlgsRUFlbUIsSUFmbkI7QUFrQkEsU0FBS0YsWUFBTCxDQUFrQixZQUFNO0FBQ3BCLFVBQUk4QixFQUFFLElBQUksTUFBSSxDQUFDckQsT0FBZixFQUF3QjtBQUFDO0FBQ3JCO0FBQ0g7O0FBQ0QsTUFBQSxNQUFJLENBQUNyQyxlQUFMLENBQXFCK0QsTUFBckIsR0FBOEIsS0FBOUI7QUFDQSxNQUFBLE1BQUksQ0FBQzlELGVBQUwsQ0FBcUI4RCxNQUFyQixHQUE4QixLQUE5Qjs7QUFDQSxNQUFBLE1BQUksQ0FBQzdELGlCQUFMLENBQXVCaUIsWUFBdkIsQ0FBb0MyQixFQUFFLENBQUNvRCxRQUF2QyxFQUFpREMsVUFBakQsQ0FBNEQsQ0FBNUQ7O0FBQ0EsTUFBQSxNQUFJLENBQUNqRyxpQkFBTCxDQUF1QjZELE1BQXZCLEdBQWdDLEtBQWhDOztBQUNBLFVBQUksTUFBSSxDQUFDOUIsUUFBVCxFQUFtQjtBQUNmLFFBQUEsTUFBSSxDQUFDQSxRQUFMLEdBQWdCLEtBQWhCOztBQUNBLFFBQUEsTUFBSSxDQUFDNkUsYUFBTDs7QUFDQSxRQUFBLE1BQUksQ0FBQ3hCLFVBQUw7QUFDSDs7QUFDRCxVQUFJLE1BQUksQ0FBQ3pELFNBQUwsR0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsUUFBQSxNQUFJLENBQUNBLFNBQUw7QUFDQSxRQUFBLE1BQUksQ0FBQ3BCLGFBQUwsQ0FBbUIrRSxjQUFuQixDQUFrQyxLQUFsQyxFQUF5Q0EsY0FBekMsQ0FBd0QsV0FBeEQsRUFBcUVyRSxZQUFyRSxDQUFrRjVDLEVBQUUsQ0FBQ1MsS0FBckYsRUFBNEZ5RCxNQUE1RixHQUFxRyxNQUFJLENBQUNaLFNBQTFHOztBQUNBLFlBQUksTUFBSSxDQUFDQSxTQUFMLElBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLFVBQUEsTUFBSSxDQUFDSSxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7O0FBQ0QsUUFBQSxNQUFJLENBQUNWLElBQUwsSUFBYSxNQUFJLENBQUNnQyxRQUFMLEVBQWI7QUFDSDs7QUFDRCxVQUFJc0IsTUFBTSxJQUFJLE1BQUksQ0FBQzlDLFNBQW5CLEVBQThCO0FBQzFCLFFBQUEsTUFBSSxDQUFDUixJQUFMLElBQWEsTUFBSSxDQUFDTSxTQUFMLElBQWtCLENBQS9CLElBQW9DLE1BQUksQ0FBQzBCLFFBQUwsRUFBcEM7QUFDSDtBQUNKLEtBeEJELEVBd0JHb0MsVUFBVSxHQUFHLENBQWIsR0FBaUJBLFVBQVUsR0FBRyxDQUE5QixHQUFrQyxDQXhCckM7QUF5QkgsR0E5WUk7QUFnWkw7QUFDQUosRUFBQUEsYUFqWkssMkJBaVpXO0FBQ1p3QixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsU0FBSzVGLEtBQUwsQ0FBVzRDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDQSxTQUFLOUIsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFNBQUs3QixNQUFMLENBQVkwRCxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsU0FBSzVCLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxTQUFLN0IsVUFBTCxDQUFnQnlELE1BQWhCLEdBQXlCLElBQXpCO0FBQ0EsU0FBSzdDLElBQUwsQ0FBVXNFLGNBQVYsQ0FBeUIsTUFBekIsRUFBaUN6QixNQUFqQyxHQUEwQyxJQUExQztBQUNBLFNBQUs3QyxJQUFMLENBQVVzRSxjQUFWLENBQXlCLE1BQXpCLEVBQWlDckUsWUFBakMsQ0FBOEMyQixFQUFFLENBQUNvRCxRQUFqRCxFQUEyREUsWUFBM0QsQ0FBd0UsQ0FBeEUsRUFBMkUsV0FBM0UsRUFBd0YsS0FBeEY7QUFDSCxHQTFaSTtBQTJaTDtBQUNBYSxFQUFBQSxVQTVaSyxzQkE0Wk03RCxLQTVaTixFQTRaYThELGFBNVpiLEVBNFo0QjtBQUM3QixTQUFLakcsR0FBTCxDQUFTbUQsTUFBVCxDQUFnQitDLElBQWhCLENBQXFCLFlBQXJCLEVBQW1DQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUM5Q0MsTUFBQUEsTUFBTSxFQUFFSjtBQURzQyxLQUFmLENBQW5DO0FBR0gsR0FoYUk7QUFpYUw7QUFDQUssRUFBQUEsUUFsYUssc0JBa2FNO0FBQ1AsU0FBSzFILE9BQUwsQ0FBYWtELFdBQWIsR0FBMkIsS0FBS3BELE9BQUwsQ0FBYTJELGNBQWIsQ0FBNEIsWUFBNUIsQ0FBM0I7O0FBQ0EsU0FBSyxJQUFJYSxDQUFULElBQWMsS0FBS3FELFlBQW5CLEVBQWlDO0FBQzdCLFdBQUtBLFlBQUwsQ0FBa0JyRCxDQUFsQixFQUFxQkosTUFBckIsR0FBOEIsS0FBOUI7QUFDSDs7QUFFRCxTQUFLLElBQUlJLEdBQVQsSUFBYyxLQUFLOUMsU0FBbkIsRUFBOEI7QUFDMUIsV0FBS0EsU0FBTCxDQUFlOEMsR0FBZixFQUFrQnNELFNBQWxCO0FBQ0g7O0FBQ0QsU0FBS2xILGFBQUwsQ0FBbUJ3RCxNQUFuQixHQUE0QixLQUE1QjtBQUNBLFNBQUt0RCxhQUFMLENBQW1Cc0QsTUFBbkIsR0FBNEIsSUFBNUI7QUFDQSxTQUFLdEQsYUFBTCxDQUFtQitFLGNBQW5CLENBQWtDLEtBQWxDLEVBQXlDQSxjQUF6QyxDQUF3RCxXQUF4RCxFQUFxRXJFLFlBQXJFLENBQWtGNUMsRUFBRSxDQUFDUyxLQUFyRixFQUE0RnlELE1BQTVGLEdBQXFHLEtBQUtaLFNBQTFHO0FBQ0EsU0FBS04sSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLZ0MsUUFBTDtBQUNILEdBaGJJO0FBa2JMdUQsRUFBQUEsYUFsYkssMkJBa2JXO0FBQUE7O0FBQ1pDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDLEtBQUs5RSxZQUFsRDtBQUNBLFNBQUtkLEtBQUwsQ0FBVzRDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDQSxTQUFLekMsSUFBTCxHQUFZLEtBQVo7O0FBQ0EsU0FBSyxJQUFJNEMsQ0FBVCxJQUFjLEtBQUtxRCxZQUFuQixFQUFpQztBQUM3QixXQUFLQSxZQUFMLENBQWtCckQsQ0FBbEIsRUFBcUJKLE1BQXJCLEdBQThCLElBQTlCO0FBQ0g7O0FBRUQsU0FBSyxJQUFJSSxHQUFULElBQWMsS0FBSzlDLFNBQW5CLEVBQThCO0FBQzFCLFdBQUtBLFNBQUwsQ0FBZThDLEdBQWYsRUFBa0JzRCxTQUFsQjtBQUNIOztBQUNELFNBQUtoSCxhQUFMLENBQW1Cc0QsTUFBbkIsR0FBNEIsS0FBNUI7QUFDQSxTQUFLdkQsV0FBTCxDQUFpQnVELE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsU0FBS3ZELFdBQUwsQ0FBaUJnRixjQUFqQixDQUFnQyxVQUFoQyxFQUE0Q3JFLFlBQTVDLENBQXlENUMsRUFBRSxDQUFDUyxLQUE1RCxFQUFtRXlELE1BQW5FLEdBQTRFLENBQUMsS0FBS1AsWUFBTCxHQUFvQixHQUFyQixFQUEwQmdCLE9BQTFCLENBQWtDLENBQWxDLENBQTVFO0FBQ0EsU0FBS1UsWUFBTCxDQUFrQixZQUFJO0FBQ2xCLE1BQUEsTUFBSSxDQUFDcEQsV0FBTCxDQUFpQnVELE1BQWpCLEdBQTBCLEtBQTFCO0FBQ0EsTUFBQSxNQUFJLENBQUMxRCxNQUFMLENBQVkwRCxNQUFaLEdBQXFCLElBQXJCO0FBQ0EsTUFBQSxNQUFJLENBQUN6RCxVQUFMLENBQWdCeUQsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxNQUFBLE1BQUksQ0FBQzVCLFdBQUwsR0FBbUIsS0FBbkI7QUFDSCxLQUxELEVBS0csQ0FMSDs7QUFNQSxTQUFLLElBQUlnQyxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxJQUFJLENBQXJCLEVBQXdCQSxHQUFDLEVBQXpCLEVBQTZCO0FBQ3pCLFdBQUtqRCxJQUFMLENBQVVzRSxjQUFWLENBQXlCLFdBQXpCLEVBQXNDQSxjQUF0QyxDQUFxRCxNQUFyRCxFQUE2REEsY0FBN0QsQ0FBNEUsU0FBU3JCLEdBQXJGLEVBQXdGdUQsT0FBeEYsR0FBa0csR0FBbEc7QUFDQSxXQUFLeEcsSUFBTCxDQUFVc0UsY0FBVixDQUF5QixXQUF6QixFQUFzQ0EsY0FBdEMsQ0FBcUQsUUFBUXJCLEdBQTdELEVBQWdFSixNQUFoRSxHQUF5RSxLQUF6RTtBQUNIO0FBQ0osR0ExY0k7QUE0Y0w7QUFDQTZDLEVBQUFBLFFBN2NLLG9CQTZjSWUsSUE3Y0osRUE2Y1VDLEtBN2NWLEVBNmNpQkMsTUE3Y2pCLEVBNmN5QjtBQUMxQixTQUFLekcsS0FBTCxDQUFXMEcsTUFBWDtBQUNBLFFBQUloRSxNQUFNLEdBQUcsS0FBS3pDLFNBQUwsQ0FBZXNHLElBQWYsRUFBcUJJLFVBQXJCLENBQWdDakUsTUFBN0M7QUFDQSxTQUFLekMsU0FBTCxDQUFlc0csSUFBZixFQUFxQkssVUFBckIsQ0FBZ0NsRSxNQUFNLEdBQUcsQ0FBVCxHQUFhOEQsS0FBN0MsRUFBb0R6RyxZQUFwRCxDQUFpRSxlQUFqRSxFQUFrRjhHLFFBQWxGLEdBSDBCLENBSTFCOztBQUNBLFFBQUksS0FBSzVHLFNBQUwsQ0FBZXNHLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDbEUsTUFBTSxHQUFHLENBQVQsR0FBYThELEtBQTdDLEVBQW9EcEMsY0FBcEQsQ0FBbUUsUUFBbkUsS0FBZ0ZxQyxNQUFNLEdBQUcsQ0FBN0YsRUFBZ0c7QUFDNUYsV0FBS3hHLFNBQUwsQ0FBZXNHLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDbEUsTUFBTSxHQUFHLENBQVQsR0FBYThELEtBQTdDLEVBQW9EcEMsY0FBcEQsQ0FBbUUsUUFBbkUsRUFBNkV6QixNQUE3RSxHQUFzRixJQUF0RjtBQUNBLFdBQUsxQyxTQUFMLENBQWVzRyxJQUFmLEVBQXFCSyxVQUFyQixDQUFnQ2xFLE1BQU0sR0FBRyxDQUFULEdBQWE4RCxLQUE3QyxFQUFvRHBDLGNBQXBELENBQW1FLFFBQW5FLEVBQTZFckUsWUFBN0UsQ0FBMEY1QyxFQUFFLENBQUNTLEtBQTdGLEVBQW9HeUQsTUFBcEcsR0FBNkcsTUFBTW9GLE1BQW5IO0FBQ0gsS0FSeUIsQ0FTMUI7OztBQUNBLFFBQUlLLFFBQVEsR0FBRyxLQUFLcEksWUFBTCxDQUFrQm9FLFFBQWpDO0FBQ0FnRSxJQUFBQSxRQUFRLENBQUNQLElBQUksR0FBRyxDQUFQLEdBQVdDLEtBQVosQ0FBUixDQUEyQjdELE1BQTNCLEdBQW9DLElBQXBDO0FBQ0FtRSxJQUFBQSxRQUFRLENBQUNQLElBQUksR0FBRyxDQUFQLEdBQVdDLEtBQVosQ0FBUixDQUEyQnpHLFlBQTNCLENBQXdDNUMsRUFBRSxDQUFDaUIsU0FBM0MsRUFBc0RnRSxJQUF0RDtBQUNILEdBMWRJO0FBNGRMaUQsRUFBQUEsU0E1ZEsscUJBNGRLa0IsSUE1ZEwsRUE0ZFdDLEtBNWRYLEVBNGRrQjtBQUNuQixRQUFJOUQsTUFBTSxHQUFHLEtBQUt6QyxTQUFMLENBQWVzRyxJQUFmLEVBQXFCSSxVQUFyQixDQUFnQ2pFLE1BQTdDO0FBQ0EsU0FBS3pDLFNBQUwsQ0FBZXNHLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDbEUsTUFBTSxHQUFHLENBQVQsR0FBYThELEtBQTdDLEVBQW9EekcsWUFBcEQsQ0FBaUUsZUFBakUsRUFBa0ZnSCxRQUFsRixHQUZtQixDQUduQjs7QUFDQSxRQUFJLEtBQUs5RyxTQUFMLENBQWVzRyxJQUFmLEVBQXFCSyxVQUFyQixDQUFnQ2xFLE1BQU0sR0FBRyxDQUFULEdBQWE4RCxLQUE3QyxFQUFvRHBDLGNBQXBELENBQW1FLFFBQW5FLENBQUosRUFBa0Y7QUFDOUUsV0FBS25FLFNBQUwsQ0FBZXNHLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDbEUsTUFBTSxHQUFHLENBQVQsR0FBYThELEtBQTdDLEVBQW9EcEMsY0FBcEQsQ0FBbUUsUUFBbkUsRUFBNkV6QixNQUE3RSxHQUFzRixLQUF0RjtBQUNILEtBTmtCLENBT25COzs7QUFDQSxRQUFJbUUsUUFBUSxHQUFHLEtBQUtwSSxZQUFMLENBQWtCb0UsUUFBakM7QUFDQWdFLElBQUFBLFFBQVEsQ0FBQ1AsSUFBSSxHQUFHLENBQVAsR0FBV0MsS0FBWixDQUFSLENBQTJCN0QsTUFBM0IsR0FBb0MsS0FBcEM7QUFDSCxHQXRlSTtBQXdlTHFFLEVBQUFBLGFBeGVLLHlCQXdlU25DLElBeGVULEVBd2VlO0FBQ2hCLHlEQUF1QkEsSUFBdkIsd0NBQTZCO0FBQUEsVUFBbEJvQyxRQUFrQjs7QUFDekIsVUFBSUEsUUFBUSxJQUFJLEtBQUs1SSxNQUFMLENBQVlxRSxNQUE1QixFQUFvQztBQUNoQyxlQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELFdBQU8sSUFBUDtBQUNILEdBL2VJO0FBaWZMd0UsRUFBQUEsSUFqZkssZ0JBaWZBckMsSUFqZkEsRUFpZk07QUFDUCxRQUFJLENBQUMsS0FBS21DLGFBQUwsQ0FBbUJuQyxJQUFuQixDQUFMLEVBQStCO0FBQzNCc0MsTUFBQUEsS0FBSyw4UEFBTDtBQUlBO0FBQ0g7O0FBQ0QsU0FBSy9HLE1BQUwsR0FBYyxDQUFkO0FBQ0EsUUFBSWdILElBQUksR0FBRyxFQUFYOztBQUNBLFNBQUssSUFBSXJFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEJxRSxNQUFBQSxJQUFJLENBQUNyRSxDQUFELENBQUosR0FBVSxFQUFWO0FBQ0g7O0FBQ0QsU0FBSyxJQUFJQSxHQUFULElBQWM4QixJQUFkLEVBQW9CO0FBQ2hCdUMsTUFBQUEsSUFBSSxDQUFDckUsR0FBQyxHQUFHLENBQUwsQ0FBSixDQUFZLElBQUl1QyxRQUFRLENBQUN2QyxHQUFDLEdBQUcsQ0FBTCxDQUF4QixJQUFtQzhCLElBQUksQ0FBQzlCLEdBQUQsQ0FBdkM7QUFDSDs7QUFDRCxTQUFLLElBQUlBLEdBQVQsSUFBYyxLQUFLOUMsU0FBbkIsRUFBOEI7QUFBQTs7QUFDMUIsaUNBQUtBLFNBQUwsQ0FBZThDLEdBQWYsR0FBa0JzRSxTQUFsQiwyQkFBK0JELElBQUksQ0FBQ3JFLEdBQUQsQ0FBbkM7QUFDSDs7QUFDRCxRQUFJLEtBQUsxRCxhQUFMLENBQW1Cc0QsTUFBdkIsRUFBK0I7QUFBQztBQUM1QixXQUFLLElBQUlJLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLElBQUksQ0FBckIsRUFBd0JBLEdBQUMsRUFBekIsRUFBNkI7QUFDekIsWUFBSThCLElBQUksQ0FBQzlCLEdBQUMsR0FBRyxDQUFMLENBQUosSUFBZSxFQUFmLElBQ0E4QixJQUFJLENBQUM5QixHQUFDLEdBQUcsQ0FBTCxDQUFKLElBQWUsRUFEZixJQUVBOEIsSUFBSSxDQUFDOUIsR0FBQyxHQUFHLENBQUwsQ0FBSixJQUFlLEVBRm5CLEVBRXVCO0FBQ25CLGVBQUtqRCxJQUFMLENBQVVzRSxjQUFWLENBQXlCLFdBQXpCLEVBQXNDQSxjQUF0QyxDQUFxRCxNQUFyRCxFQUE2REEsY0FBN0QsQ0FBNEUsU0FBU3JCLEdBQXJGLEVBQXdGdUQsT0FBeEYsR0FBa0csQ0FBbEc7QUFDQSxlQUFLeEcsSUFBTCxDQUFVc0UsY0FBVixDQUF5QixXQUF6QixFQUFzQ0EsY0FBdEMsQ0FBcUQsUUFBUXJCLEdBQTdELEVBQWdFSixNQUFoRSxHQUF5RSxJQUF6RTtBQUNIO0FBQ0o7QUFDSixLQVRELE1BU087QUFDSCxXQUFLLElBQUlJLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLElBQUksQ0FBckIsRUFBd0JBLEdBQUMsRUFBekIsRUFBNkI7QUFDekIsYUFBS2pELElBQUwsQ0FBVXNFLGNBQVYsQ0FBeUIsV0FBekIsRUFBc0NBLGNBQXRDLENBQXFELE1BQXJELEVBQTZEQSxjQUE3RCxDQUE0RSxTQUFTckIsR0FBckYsRUFBd0Z1RCxPQUF4RixHQUFrRyxHQUFsRztBQUNBLGFBQUt4RyxJQUFMLENBQVVzRSxjQUFWLENBQXlCLFdBQXpCLEVBQXNDQSxjQUF0QyxDQUFxRCxRQUFRckIsR0FBN0QsRUFBZ0VKLE1BQWhFLEdBQXlFLEtBQXpFO0FBQ0g7QUFDSjtBQUVKLEdBcGhCSTtBQXNoQkx1QixFQUFBQSxVQXRoQkssd0JBc2hCUTtBQUNULFFBQUk0QyxRQUFRLEdBQUcsS0FBS3BJLFlBQUwsQ0FBa0JvRSxRQUFqQzs7QUFDQSxTQUFLLElBQUlDLENBQVQsSUFBYytELFFBQWQsRUFBd0I7QUFDcEJBLE1BQUFBLFFBQVEsQ0FBQy9ELENBQUQsQ0FBUixDQUFZSixNQUFaLEdBQXFCLEtBQXJCO0FBQ0g7O0FBQ0QsU0FBSzlELGVBQUwsQ0FBcUI4RCxNQUFyQixHQUE4QixLQUE5QjtBQUNILEdBNWhCSTtBQThoQkxSLEVBQUFBLFFBOWhCSyxzQkE4aEJNO0FBQ1AsU0FBS3hCLFNBQUw7QUFDQSxTQUFLdUQsVUFBTDtBQUNBLFNBQUtyRSxHQUFMLENBQVNtRCxNQUFULENBQWdCK0MsSUFBaEIsQ0FBcUIsU0FBckIsRUFBZ0NDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQzNDL0YsTUFBQUEsR0FBRyxFQUFFLEtBQUtBLEdBRGlDO0FBRTNDb0gsTUFBQUEsUUFBUSxFQUFFLENBQUNySyxHQUFHLENBQUMsS0FBS2lELEdBQU4sQ0FBSCxHQUFnQnBELE1BQWhCLEdBQXlCLEdBQTFCO0FBRmlDLEtBQWYsQ0FBaEM7QUFJSCxHQXJpQkk7QUF1aUJMMkYsRUFBQUEsZUF2aUJLLDZCQXVpQmE7QUFDZCxRQUFJLENBQUMsS0FBS3RDLElBQVYsRUFBZ0I7QUFDWixXQUFLLElBQUk0QyxDQUFULElBQWMsS0FBSzlDLFNBQW5CLEVBQThCO0FBQzFCLGFBQUtBLFNBQUwsQ0FBZThDLENBQWYsRUFBa0JOLGVBQWxCO0FBQ0g7QUFDSjtBQUNKLEdBN2lCSTtBQStpQkx1QixFQUFBQSxXQS9pQksseUJBK2lCUztBQUNWLFNBQUtoRSxLQUFMLENBQVc0QyxPQUFYLENBQW1CLENBQW5CO0FBQ0EsU0FBSzdELFVBQUwsQ0FBZ0I0RCxNQUFoQixHQUF5QixJQUF6QjtBQUNBLFNBQUs1RCxVQUFMLENBQWdCcUYsY0FBaEIsQ0FBK0Isc0JBQS9CLEVBQXVEbUQsS0FBdkQsR0FBK0QsQ0FBL0Q7QUFDQSxTQUFLeEksVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLDRCQUEvQixFQUE2RG1ELEtBQTdELEdBQXFFLENBQXJFO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLEtBQUs1RyxVQUFMLENBQWdCeUIsU0FBaEIsQ0FBMEJ1QixVQUExQixDQUFxQzZELFdBQXhEO0FBQ0EsU0FBSzFJLFVBQUwsQ0FBZ0JxRixjQUFoQixDQUErQixzQkFBL0IsRUFBdUR6QixNQUF2RCxHQUFnRSxLQUFoRTtBQUNBLFNBQUs1RCxVQUFMLENBQWdCcUYsY0FBaEIsQ0FBK0IsNEJBQS9CLEVBQTZEekIsTUFBN0QsR0FBc0UsSUFBdEU7O0FBQ0EsU0FBSyxJQUFJNEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSSxDQUFyQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUN6QixXQUFLeEcsVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLDRCQUEvQixFQUE2REEsY0FBN0QsQ0FBNEUsZ0JBQWdCbUIsQ0FBNUYsRUFBK0Y1QyxNQUEvRixHQUF3RyxLQUF4RztBQUNBLFdBQUs1RCxVQUFMLENBQWdCcUYsY0FBaEIsQ0FBK0IscUJBQS9CLEVBQXNEQSxjQUF0RCxDQUFxRSw4QkFBOEJtQixDQUFuRyxFQUFzRzVDLE1BQXRHLEdBQStHLEtBQS9HO0FBQ0g7O0FBQ0QsU0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHeUUsWUFBWSxDQUFDOUUsTUFBakMsRUFBeUNLLENBQUMsRUFBMUMsRUFBOEM7QUFDMUMsV0FBS2hFLFVBQUwsQ0FBZ0JxRixjQUFoQixDQUErQiw0QkFBL0IsRUFBNkRBLGNBQTdELENBQTRFLGdCQUFnQm9ELFlBQVksQ0FBQ3pFLENBQUQsQ0FBeEcsRUFBNkdKLE1BQTdHLEdBQXNILElBQXRIO0FBQ0EsV0FBSzVELFVBQUwsQ0FBZ0JxRixjQUFoQixDQUErQixxQkFBL0IsRUFBc0RBLGNBQXRELENBQXFFLDhCQUE4Qm9ELFlBQVksQ0FBQ3pFLENBQUQsQ0FBL0csRUFBb0hKLE1BQXBILEdBQTZILElBQTdIO0FBQ0g7O0FBQ0QsU0FBSzVELFVBQUwsQ0FBZ0JxRixjQUFoQixDQUErQiwwQkFBL0IsRUFBMkRBLGNBQTNELENBQTBFLDBCQUExRSxFQUFzR3pCLE1BQXRHLEdBQStHLElBQS9HO0FBQ0gsR0Foa0JJO0FBa2tCTCtFLEVBQUFBLFdBbGtCSyx1QkFra0JPMUYsS0Fsa0JQLEVBa2tCYzhELGFBbGtCZCxFQWtrQjZCO0FBQUE7O0FBQzlCLFNBQUsvRyxVQUFMLENBQWdCcUYsY0FBaEIsQ0FBK0IsMEJBQS9CLEVBQTJEckUsWUFBM0QsQ0FBd0U1QyxFQUFFLENBQUN3SyxNQUEzRSxFQUFtRkMsWUFBbkYsR0FBa0csS0FBbEc7O0FBQ0EsUUFBSSxLQUFLN0ksVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLDBCQUEvQixFQUEyREEsY0FBM0QsQ0FBMEUsMEJBQTFFLEVBQXNHekIsTUFBMUcsRUFBa0g7QUFDOUcsVUFBSWtGLFNBQVMsR0FBRyxLQUFLOUksVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLDRCQUEvQixDQUFoQjtBQUNBLFVBQUkwRCxNQUFNLEdBQUcsQ0FBYjtBQUNBLFVBQUlDLFFBQVEsR0FBRyxLQUFLbkgsVUFBTCxDQUFnQnlCLFNBQWhCLENBQTBCdUIsVUFBMUIsQ0FBcUNtRSxRQUFwRDs7QUFDQSxjQUFRQSxRQUFSO0FBQ0ksYUFBSyxDQUFMO0FBQ0lELFVBQUFBLE1BQU0sR0FBRyxHQUFUO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0lBLFVBQUFBLE1BQU0sR0FBRyxHQUFUO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0lBLFVBQUFBLE1BQU0sR0FBRyxHQUFUO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0lBLFVBQUFBLE1BQU0sR0FBRyxHQUFUO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0lBLFVBQUFBLE1BQU0sR0FBRyxHQUFUO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0lBLFVBQUFBLE1BQU0sR0FBRyxFQUFUO0FBQ0E7QUFsQlI7O0FBb0JBRCxNQUFBQSxTQUFTLENBQUNHLFNBQVYsQ0FBb0I3SyxFQUFFLENBQUM4SyxRQUFILENBQVk5SyxFQUFFLENBQUMrSyxRQUFILENBQVksR0FBWixFQUFpQixHQUFqQixDQUFaLEVBQ2hCL0ssRUFBRSxDQUFDK0ssUUFBSCxDQUFZLEdBQVosRUFBaUIsTUFBTUosTUFBdkIsRUFBK0JLLE1BQS9CLENBQXNDaEwsRUFBRSxDQUFDaUwsT0FBSCxDQUFXLENBQVgsQ0FBdEMsQ0FEZ0IsRUFFaEJqTCxFQUFFLENBQUNrTCxRQUFILENBQVksWUFBTTtBQUNkLFFBQUEsTUFBSSxDQUFDdEosVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLDRCQUEvQixFQUE2REEsY0FBN0QsQ0FBNEUsZ0JBQWdCMkQsUUFBNUYsRUFBc0dwRixNQUF0RyxHQUErRyxJQUEvRztBQUNBLFFBQUEsTUFBSSxDQUFDNUQsVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLHFCQUEvQixFQUFzREEsY0FBdEQsQ0FBcUUsOEJBQThCMkQsUUFBbkcsRUFBNkdwRixNQUE3RyxHQUFzSCxJQUF0SDtBQUNILE9BSEQsQ0FGZ0IsRUFNaEJ4RixFQUFFLENBQUNtTCxTQUFILENBQWEsQ0FBYixDQU5nQixFQU9oQm5MLEVBQUUsQ0FBQ2tMLFFBQUgsQ0FBWSxZQUFNO0FBQ2QsUUFBQSxNQUFJLENBQUN0SixVQUFMLENBQWdCcUYsY0FBaEIsQ0FBK0IsMEJBQS9CLEVBQTJEckUsWUFBM0QsQ0FBd0U1QyxFQUFFLENBQUN3SyxNQUEzRSxFQUFtRkMsWUFBbkYsR0FBa0csSUFBbEc7QUFDQSxRQUFBLE1BQUksQ0FBQzdJLFVBQUwsQ0FBZ0JxRixjQUFoQixDQUErQiwwQkFBL0IsRUFBMkRBLGNBQTNELENBQTBFLDBCQUExRSxFQUFzR3pCLE1BQXRHLEdBQStHLEtBQS9HOztBQUNBLFlBQUksTUFBSSxDQUFDcEMsVUFBTCxHQUFrQixDQUF0QixFQUF5QjtBQUNyQixVQUFBLE1BQUksQ0FBQ3hCLFVBQUwsQ0FBZ0JxRixjQUFoQixDQUErQixzQkFBL0IsRUFBdUR6QixNQUF2RCxHQUFnRSxJQUFoRTtBQUNBLFVBQUEsTUFBSSxDQUFDNUQsVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLDRCQUEvQixFQUE2RHpCLE1BQTdELEdBQXNFLEtBQXRFO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsVUFBQSxNQUFJLENBQUNuQyxTQUFMLEdBQWlCLEtBQWpCOztBQUNBLFVBQUEsTUFBSSxDQUFDUixLQUFMLENBQVc0QyxPQUFYLENBQW1CLENBQW5COztBQUNBLFVBQUEsTUFBSSxDQUFDN0QsVUFBTCxDQUFnQjRELE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0g7QUFDSixPQVhELENBUGdCLENBQXBCO0FBb0JILEtBNUNELE1BNENPO0FBQ0gsV0FBS25DLFNBQUwsR0FBaUIsS0FBakI7O0FBQ0EsVUFBSXFILFVBQVMsR0FBRyxLQUFLOUksVUFBTCxDQUFnQnFGLGNBQWhCLENBQStCLHNCQUEvQixDQUFoQjs7QUFDQSxVQUFJMEQsT0FBTSxHQUFHLENBQWI7O0FBQ0EsY0FBUSxLQUFLdkgsVUFBYjtBQUNJLGFBQUssT0FBTDtBQUNJdUgsVUFBQUEsT0FBTSxHQUFHLEdBQVQ7QUFDQTs7QUFDSixhQUFLLFFBQUw7QUFDSUEsVUFBQUEsT0FBTSxHQUFHLEVBQVQ7QUFDQTs7QUFDSixhQUFLLE9BQUw7QUFDSUEsVUFBQUEsT0FBTSxHQUFHLEdBQVQ7QUFDQTs7QUFDSixhQUFLLE1BQUw7QUFDSUEsVUFBQUEsT0FBTSxHQUFHLEdBQVQ7QUFDQTs7QUFDSixhQUFLLE1BQUw7QUFDSUEsVUFBQUEsT0FBTSxHQUFHLEdBQVQ7QUFDQTs7QUFDSixhQUFLLEtBQUw7QUFDSUEsVUFBQUEsT0FBTSxHQUFHLEdBQVQ7QUFDQTtBQWxCUjs7QUFvQkFELE1BQUFBLFVBQVMsQ0FBQ0csU0FBVixDQUFvQjdLLEVBQUUsQ0FBQzhLLFFBQUgsQ0FBWTlLLEVBQUUsQ0FBQytLLFFBQUgsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLENBQVosRUFDaEIvSyxFQUFFLENBQUMrSyxRQUFILENBQVksR0FBWixFQUFpQixNQUFNSixPQUF2QixFQUErQkssTUFBL0IsQ0FBc0NoTCxFQUFFLENBQUNpTCxPQUFILENBQVcsQ0FBWCxDQUF0QyxDQURnQixFQUVoQmpMLEVBQUUsQ0FBQ21MLFNBQUgsQ0FBYSxDQUFiLENBRmdCLEVBR2hCbkwsRUFBRSxDQUFDa0wsUUFBSCxDQUFZLFlBQU07QUFDZCxRQUFBLE1BQUksQ0FBQ3RKLFVBQUwsQ0FBZ0JxRixjQUFoQixDQUErQiwwQkFBL0IsRUFBMkRyRSxZQUEzRCxDQUF3RTVDLEVBQUUsQ0FBQ3dLLE1BQTNFLEVBQW1GQyxZQUFuRixHQUFrRyxJQUFsRzs7QUFDQSxRQUFBLE1BQUksQ0FBQzVILEtBQUwsQ0FBVzRDLE9BQVgsQ0FBbUIsQ0FBbkI7O0FBQ0EsUUFBQSxNQUFJLENBQUM3RCxVQUFMLENBQWdCNEQsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxRQUFBLE1BQUksQ0FBQzNELGdCQUFMLENBQXNCMkQsTUFBdEIsR0FBK0IsSUFBL0I7O0FBQ0EsUUFBQSxNQUFJLENBQUMzRCxnQkFBTCxDQUFzQmdKLFNBQXRCLENBQWdDN0ssRUFBRSxDQUFDOEssUUFBSCxDQUFZOUssRUFBRSxDQUFDbUwsU0FBSCxDQUFhLENBQWIsQ0FBWixFQUE2Qm5MLEVBQUUsQ0FBQ2tMLFFBQUgsQ0FBWSxZQUFNO0FBQzNFLFVBQUEsTUFBSSxDQUFDckosZ0JBQUwsQ0FBc0IyRCxNQUF0QixHQUErQixLQUEvQjtBQUNILFNBRjRELENBQTdCLENBQWhDOztBQUdBLFFBQUEsTUFBSSxDQUFDOUUsV0FBTCxDQUFpQndELE1BQWpCLEdBQTBCLENBQUMsTUFBSSxDQUFDeUMsZ0JBQUwsR0FBd0IsR0FBekIsRUFBOEJoQyxPQUE5QixDQUFzQyxDQUF0QyxDQUExQjtBQUNBLFFBQUEsTUFBSSxDQUFDN0QsVUFBTCxDQUFnQm9ELE1BQWhCLEdBQXlCLENBQUMsTUFBSSxDQUFDZCxVQUFMLEdBQWtCLEdBQW5CLEVBQXdCdUIsT0FBeEIsQ0FBZ0MsQ0FBaEMsQ0FBekI7QUFDQSxRQUFBLE1BQUksQ0FBQzlDLGdCQUFMLENBQXNCb0YsY0FBdEIsQ0FBcUMsV0FBckMsRUFBa0RyRSxZQUFsRCxDQUErRDVDLEVBQUUsQ0FBQ1MsS0FBbEUsRUFBeUV5RCxNQUF6RSxHQUFrRixDQUFDLE1BQUksQ0FBQ2QsVUFBTCxHQUFrQixHQUFuQixFQUF3QnVCLE9BQXhCLENBQWdDLENBQWhDLENBQWxGO0FBQXFIO0FBQ3hILE9BWEQsQ0FIZ0IsQ0FBcEI7QUFnQkg7QUFDSixHQXpwQkk7QUEycEJMeUcsRUFBQUEsV0EzcEJLLHVCQTJwQk92RyxLQTNwQlAsRUEycEJjQyxJQTNwQmQsRUEycEJvQjtBQUFBOztBQUNyQixRQUFJLEtBQUt1RyxXQUFMLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLFVBQUlDLEdBQUcsR0FBRyxLQUFLQyxTQUFMLENBQWVDLElBQXpCO0FBQ0EsV0FBS0QsU0FBTCxDQUFlRSxHQUFmLENBQW1CM0csSUFBbkI7O0FBQ0EsVUFBSXdHLEdBQUcsSUFBSSxLQUFLQyxTQUFMLENBQWVDLElBQTFCLEVBQWdDO0FBQzVCO0FBQ0g7O0FBQ0QsVUFBSUUsU0FBUyxHQUFHLEtBQUs5SixVQUFMLENBQWdCK0QsUUFBaEM7QUFDQSxXQUFLMEYsV0FBTDtBQUNBLFVBQUloQyxLQUFLLEdBQUcsS0FBS25HLGFBQUwsQ0FBbUIsS0FBS21JLFdBQXhCLENBQVo7QUFDQSxVQUFJTSxRQUFRLEdBQUc7QUFDWCxZQUFJLHFCQURPO0FBRVgsYUFBSyxzQkFGTTtBQUdYLGNBQU07QUFISyxPQUFmO0FBS0EsVUFBSUMsRUFBRSxHQUFHRixTQUFTLENBQUM1RyxJQUFELENBQVQsQ0FBZ0JtQyxjQUFoQixDQUErQjBFLFFBQVEsQ0FBQ3RDLEtBQUQsQ0FBdkMsQ0FBVDtBQUNBLFdBQUtoRSxZQUFMLENBQWtCLFlBQU07QUFDcEJ1RyxRQUFBQSxFQUFFLENBQUNwRyxNQUFILEdBQVksSUFBWjtBQUNBb0csUUFBQUEsRUFBRSxDQUFDaEosWUFBSCxDQUFnQjVDLEVBQUUsQ0FBQ2lCLFNBQW5CLEVBQThCZ0UsSUFBOUI7QUFDSCxPQUhELEVBR0csR0FISDs7QUFJQSxVQUFJLEtBQUtvRyxXQUFMLElBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLGFBQUtoRyxZQUFMLENBQWtCLFlBQU07QUFDcEIsVUFBQSxNQUFJLENBQUN4RCxnQkFBTCxDQUFzQjJELE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsVUFBQSxNQUFJLENBQUM5RSxXQUFMLENBQWlCd0QsTUFBakIsR0FBMEIsQ0FBQyxNQUFJLENBQUN5QyxnQkFBTCxHQUF3QixHQUF6QixFQUE4QmhDLE9BQTlCLENBQXNDLENBQXRDLENBQTFCO0FBQ0EsVUFBQSxNQUFJLENBQUM3RCxVQUFMLENBQWdCb0QsTUFBaEIsR0FBeUIsQ0FBQyxNQUFJLENBQUNkLFVBQUwsR0FBa0IsR0FBbkIsRUFBd0J1QixPQUF4QixDQUFnQyxDQUFoQyxDQUF6QjtBQUNBLFVBQUEsTUFBSSxDQUFDOUMsZ0JBQUwsQ0FBc0JvRixjQUF0QixDQUFxQyxNQUFyQyxFQUE2Q3JFLFlBQTdDLENBQTBENUMsRUFBRSxDQUFDUyxLQUE3RCxFQUFvRXlELE1BQXBFLEdBQTZFLENBQUMsTUFBSSxDQUFDZCxVQUFMLEdBQWtCLEdBQW5CLEVBQXdCdUIsT0FBeEIsQ0FBZ0MsQ0FBaEMsQ0FBN0U7QUFDQSxjQUFJa0gsRUFBRSxHQUFHLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxHQUFULEVBQWMsSUFBZCxDQUFUOztBQUNBLGVBQUssSUFBSWpHLENBQVQsSUFBY2lHLEVBQWQsRUFBa0I7QUFDZCxZQUFBLE1BQUksQ0FBQ2hLLGdCQUFMLENBQXNCb0YsY0FBdEIsQ0FBcUMsS0FBSzRFLEVBQUUsQ0FBQ2pHLENBQUQsQ0FBNUMsRUFBaURKLE1BQWpELEdBQTBELE1BQUksQ0FBQ3JDLFVBQUwsSUFBbUIwSSxFQUFFLENBQUNqRyxDQUFELENBQS9FO0FBQ0g7O0FBQ0QsVUFBQSxNQUFJLENBQUN2QyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0gsU0FWRCxFQVVHLENBVkg7QUFXSDtBQUNKO0FBQ0o7QUE3ckJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJFVE5VTSA9IDIuNTsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSAyNTsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzMwLCAxMDAwLCAxMDAsIDEwXTtcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY29uc3QgUlVMRUxJU1QgPSBbMiwgMC4yLCAwLjEsIDEsIDAuMiwgMC4xLCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMywgMC42LCAwLjJdOyAvL+inhOWImVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwVXNlckZhY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WktOWDjycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflkI0nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfljZXms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsTGluZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57q/5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsQnRuQW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb24sXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncm9sbOaMiemSruWKqOeUuycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcEF0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WbvumbhicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfoh6rliqjmjInpkq5TcHJpdGUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbVByOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW54m55pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxCOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltQmlnRnVsbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWkp+WlluWFqOWxj+eJueaViCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+Wkp+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luUmVzdWx0QW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2JpZ1dpbuS4reWllidcclxuICAgICAgICB9LFxyXG4gICAgICAgIEJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a4uOaIj+iDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgICAgICBmcmVlQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVCZWdpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflvIDlp4vlhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUVuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnu5PmnZ/lhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVUaW1lc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbmmL7npLroioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBOdW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2i5Y+v5Y+Y5rOo5pWwJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aOw6Z+z5oyJ6ZKuJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnWUdCSE5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnWUdCSEF1ZGlvJyk7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmJldCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IFszLCAxLCAyXTtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNhcmQgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xsUmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMubG90dGVyeVJlcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50dXJuTnVtID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5CRVROVU0gPSB3aW5kb3cuR0FNRU1VTDsvL+WNleazqOWAvFxyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BVc2VyRmFjZS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGJsVXNlck5hbWUuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0byA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0byAmJiB0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ3JvbGwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lIHx8IHRoaXMuZGVsYXlDbGljaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sbEJ0bkFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhZGQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IEJFVC5sZW5ndGggPyBCRVQubGVuZ3RoIC0gMSA6IHRoaXMuYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZGVjJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSAwID8gdGhpcy5iZXQgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VCaWdXaW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdoZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaHIgPSB0aGlzLmhlbHBOdW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgIGhyW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKFJVTEVMSVNUW2ldICogQkVUW3RoaXMuYmV0XSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VIZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2V4aXRHYW1lJykge1xyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPyAnYnRuX3NvdW5kJyA6ICdidG5fc291bmRfMicpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnN0b3BBdWRpbygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaWdXaW5Cb28pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmV0KCkge1xyXG4gICAgICAgIHRoaXMubGJsQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMubGJsQ3VyQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlQ2FsbEJhY2soKSB7XHJcbiAgICAgICAgbGV0IHN0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtpXS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHN0ID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgLy/nu5PmnZ/lvZPliY3ova7nm5hcclxuICAgICAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMudXNlcnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5iaWdXaW5UaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJpZ1dpblJlc0xpc3QgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3Q7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJpZ1dpbkNhcmQgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2NhcmQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRDb2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS51c2VyX3Njb3JlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCaWdXaW4oKTtcclxuICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJmaXJlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1cm5OdW0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5V2luQW5pbSh0aGlzLnR1cm5OdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2luQW5pbSh0bSkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSxdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwid2luX2NuXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMFxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqMTAwKSB7IC8v5aaC5p6c5aSn5LqOMTAw5YCN6LWM5rOo77yM5bCx5pKt5pS+YmlnRnVsbOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uMVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRtICE9IHRoaXMudHVybk51bSkgey8v5LiN5piv5b2T5YmN5peL6L2s6L2u5qyh5YiZ6Lez6L+H5ZCO57ut5pON5L2cXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZmlyZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImZpcmVcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8v6YCJ5oup5ri45oiPXHJcbiAgICBjaG9vc2VHYW1lKGV2ZW50LCBjdXN0b21lbnREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2Nob29zZUdhbWUnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGNob29zZTogY3VzdG9tZW50RGF0YSxcclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG4gICAgLy/pgInmi6nlkI7lvIDlp4vlhY3otLlcclxuICAgIHNlbmRGcmVlKCkge1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSgnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEZyZWVUaW1lcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BGcmVlVGltZXMgZnJlZUdhbWVDb2luIDogXCIsIHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVfbWFpblwiKS5nZXRDaGlsZEJ5TmFtZShcIk1BU0tcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsaW5lXCIgKyBpKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lX21haW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJpY2VcIiArIGkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSA1XVsyIC0gcGFyc2VJbnQoaSAvIDUpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSkgey8v5ZCV5biD5qih5byPIOacieS4gOWIl+WFqOaYr3dpbGTlsLHlhrvnu5PkvY9cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpIC0gMV0gPT0gMTAgJiZcclxuICAgICAgICAgICAgICAgICAgICBsaXN0W2kgKyA0XSA9PSAxMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaSArIDldID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZV9tYWluXCIpLmdldENoaWxkQnlOYW1lKFwiTUFTS1wiKS5nZXRDaGlsZEJ5TmFtZShcImxpbmVcIiArIGkpLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVfbWFpblwiKS5nZXRDaGlsZEJ5TmFtZShcImljZVwiICsgaSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZV9tYWluXCIpLmdldENoaWxkQnlOYW1lKFwiTUFTS1wiKS5nZXRDaGlsZEJ5TmFtZShcImxpbmVcIiArIGkpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lX21haW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJpY2VcIiArIGkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgYmV0OiB0aGlzLmJldCxcclxuICAgICAgICAgICAgbkJldExpc3Q6IFtCRVRbdGhpcy5iZXRdICogQkVUTlVNICogMTAwLCBdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0QmlnV2luKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV93aGVlbFwiKS5hbmdsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfd2hlZWxfcGludHVcIikuYW5nbGUgPSAwO1xyXG4gICAgICAgIGxldCBzdWlwaWFuQXJyYXkgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gubldpbk9wZW5Cb3g7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfd2hlZWxcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfd2hlZWxfcGludHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSA2OyBqKyspIHtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfd2hlZWxfcGludHVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19waW50dVwiICsgaikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX2ljb25cIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9pY29uX3BpZWNlXCIgKyBqKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWlwaWFuQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfd2hlZWxfcGludHVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19waW50dVwiICsgc3VpcGlhbkFycmF5W2ldKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9pY29uXCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfaWNvbl9waWVjZVwiICsgc3VpcGlhbkFycmF5W2ldKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9idG5fYmVnaW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9idG5fcGllY2VcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgYmlnV2luQmVnaW4oZXZlbnQsIGN1c3RvbWVudERhdGEpIHtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV9idG5fYmVnaW5cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX2J0bl9iZWdpblwiKS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX2J0bl9waWVjZVwiKS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBXaGVlbCA9IHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsX3BpbnR1XCIpO1xyXG4gICAgICAgICAgICBsZXQgdGVtcER1ID0gMDtcclxuICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmxvY2F0aW9uO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcER1ID0gMzYwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDMwMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSAyNDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcER1ID0gMTgwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDEyMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSA2MDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wV2hlZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnJvdGF0ZUJ5KDAuNSwgMzYwKSxcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KDIuNSwgMzYwICsgdGVtcER1KS5lYXNpbmcoY2MuZWFzZU91dCg1KSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfd2hlZWxfcGludHVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19waW50dVwiICsgbG9jYXRpb24pLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfaWNvblwiKS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX2ljb25fcGllY2VcIiArIGxvY2F0aW9uKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX2JlZ2luXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX2JlZ2luXCIpLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX3BpZWNlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpZ1dpbkNvaW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX21pbmlnYW1lX3doZWVsX3BpbnR1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wV2hlZWwgPSB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19taW5pZ2FtZV93aGVlbFwiKTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEdSA9IDA7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5iaWdXaW5Db2luKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcER1ID0gMTIwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSA2MDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTAwMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDUwMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSAyNDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRHUgPSAzMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDUwMDAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEdSA9IDM2MDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wV2hlZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnJvdGF0ZUJ5KDAuNSwgMzYwKSxcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KDIuNSwgMzYwICsgdGVtcER1KS5lYXNpbmcoY2MuZWFzZU91dCg1KSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfbWluaWdhbWVfYnRuX2JlZ2luXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgyKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmdldENoaWxkQnlOYW1lKCdsYmxfY29pbiAnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBiaWdXaW5DbGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gdGhpcy5CaWdXaW5TZXQuc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5CaWdXaW5TZXQuYWRkKGFyZ3MpO1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHRoaXMuQmlnV2luU2V0LnNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2luTm9kZVByID0gdGhpcy5iaWdXaW5Ob2RlLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblRpbWVzLS07XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuYmlnV2luUmVzTGlzdFt0aGlzLmJpZ1dpblRpbWVzXTtcclxuICAgICAgICAgICAgbGV0IG5hbWVMaXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgMTA6ICdzX2JvbnVzX1NIMDBGX21pbm9yJyxcclxuICAgICAgICAgICAgICAgIDEwMDogJ3NfYm9udXNfU0gwMEZfbWVkaXVtJyxcclxuICAgICAgICAgICAgICAgIDEwMDA6ICdzX2JvbnVzX1NIMDBGX21lZ2EnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5kID0gd2luTm9kZVByW2FyZ3NdLmdldENoaWxkQnlOYW1lKG5hbWVMaXN0W2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5kLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBuZC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmdldENoaWxkQnlOYW1lKCdjb2luJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsdCA9IFsxMCwgMzAsIDEwMCwgMTAwMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJycgKyBsdFtpXSkuYWN0aXZlID0gdGhpcy5iaWdXaW5DYXJkID09IGx0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTsiXX0=