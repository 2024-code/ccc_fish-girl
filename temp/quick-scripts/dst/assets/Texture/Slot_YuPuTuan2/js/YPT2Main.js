
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_YuPuTuan2/js/YPT2Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3d4b481gLpF250kZxuJvuoq', 'YPT2Main');
// Texture/Slot_YuPuTuan2/js/YPT2Main.js

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
    this.net = this.node.getComponent('YPT2Network');
    this.audio = this.node.getComponent('YPT2Audio');
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
        this.bigWinBoo = true;
        this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
        this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
        this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;
        this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
        this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
        this.scheduleOnce(function () {
          _this3.startBigWin();
        }, 2);
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
  },
  startBigWin: function startBigWin() {
    this.audio.playBgm(2); // this.auto = false;
    // this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
    // this.BigWinSet = new Set();

    this.bigWinNode.active = true;
    this.bigWinNode.getChildByName("slots_bonus_wheel").getChildByName("slots_bonus_wheel_muti").rotation = 0; // let pr = this.bigWinNode.children;
    // for (let i in pr) {
    //     let pr1 = pr[i].children;
    //     for (let j in pr1) {
    //         pr1[j].active = j == 0;
    //     }
    // }
  },
  bigWinBegin: function bigWinBegin(event, customentData) {
    var _this6 = this;

    if (this.bigWinBoo == false) {
      return;
    }

    this.bigWinBoo = false;
    var tempWheel = this.bigWinNode.getChildByName("slots_bonus_wheel").getChildByName("slots_bonus_wheel_muti");
    var tempDu = 0;

    switch (this.bigWinCard) {
      case 1:
        tempDu = 120;
        break;

      case 2:
        tempDu = 60;
        break;

      case 5:
        tempDu = 180;
        break;

      case 10:
        tempDu = 240;
        break;

      case 20:
        tempDu = 300;
        break;

      case 50:
        tempDu = 360;
        break;
    }

    tempWheel.runAction(cc.sequence(cc.rotateBy(0.5, 360), cc.rotateBy(2.5, 360 + tempDu).easing(cc.easeOut(5)), cc.delayTime(1), cc.callFunc(function () {
      _this6.audio.playBgm(0);

      _this6.bigWinNode.active = false;
      _this6.bigWinResultAnim.active = true;
      _this6.bigWinResultAnim.opacity = 0;

      _this6.bigWinResultAnim.runAction(cc.sequence(cc.fadeIn(0.5), cc.delayTime(1), cc.callFunc(function () {
        _this6.bigWinResultAnim.active = false;
      })));

      _this6.lblUserCoin.string = (_this6.bigWinResultCoin / 100).toFixed(2);
      _this6.lblWinCoin.string = (_this6.bigWinCoin / 100).toFixed(2);
      _this6.bigWinResultAnim.getChildByName('beishu').getComponent(cc.Label).string = "x" + _this6.bigWinCard;
    })));
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
        10: 's_bonus_diamond_minor',
        100: 's_bonus_diamond_medium',
        1000: 's_bonus_diamond_mega'
      };
      cc.log("index:" + index);
      var nd = winNodePr[args].getChildByName(nameList[index]);
      this.scheduleOnce(function () {
        if (nd) {
          nd.active = true;
          nd.getComponent(cc.Animation).play();
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9ZdVB1VHVhbjJcXGpzXFxZUFQyTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsIlJVTEVMSVNUIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzcFVzZXJGYWNlIiwidHlwZSIsIlNwcml0ZSIsImRpc3BsYXlOYW1lIiwibGJsVXNlck5hbWUiLCJMYWJlbCIsImxibFVzZXJDb2luIiwibGJsQmV0IiwibGJsTGluZXMiLCJsYmxDdXJCZXQiLCJsYmxXaW5Db2luIiwibGJsQ29pbkxpc3QiLCJyb2xsQnRuQW5pbSIsIkFuaW1hdGlvbiIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJlZmZlY3RBbmltUHIiLCJOb2RlIiwiZWZmZWN0QW5pbUZ1bGxBIiwiZWZmZWN0QW5pbUZ1bGxCIiwiZWZmZWN0QW5pbUJpZ0Z1bGwiLCJiaWdXaW5Ob2RlIiwiYmlnV2luUmVzdWx0QW5pbSIsIkJnTm9kZSIsImZyZWVCZ05vZGUiLCJmcmVlQmVnaW5Ob2RlIiwiZnJlZUVuZE5vZGUiLCJmcmVlVGltZXNOb2RlIiwiaGVscFVJIiwiaGVscE51bSIsImF1ZGlvQnRuIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImRlbGF5Q2xpY2siLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJnZXRTcHJpdGVGcmFtZSIsInNlbmRSb2xsIiwicGxheSIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsImFjdGl2ZSIsInBsYXlCZ20iLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJwbGF5V2luQW5pbSIsInZpZXdhcnJheSIsImdldE9wZW5Cb3giLCJiRmxhZyIsImJpZ1dpblRpbWVzIiwid2luX2xpc3QiLCJ3aW5fY2FyZCIsIndpbiIsImJpZ1dpblJlc3VsdENvaW4iLCJ1c2VyX3Njb3JlIiwic3RhcnRCaWdXaW4iLCJnZXRGcmVlVGltZSIsIm5GcmVlVGltZSIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZGNvaW4iLCJzY2hlZHVsZSIsImFuaW1JbmRleCIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwiZk11bHRpcGxlIiwic3RvcEZyZWVUaW1lcyIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJzdG9wQW5pbSIsImNoZWNrUm9sbERhdGEiLCJpdGVyYXRvciIsInJvbGwiLCJhbGVydCIsImxpbmUiLCJzdGFydFJvbGwiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5CZXRMaXN0Iiwicm90YXRpb24iLCJiaWdXaW5CZWdpbiIsImN1c3RvbWVudERhdGEiLCJ0ZW1wV2hlZWwiLCJ0ZW1wRHUiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInJvdGF0ZUJ5IiwiZWFzaW5nIiwiZWFzZU91dCIsImRlbGF5VGltZSIsImNhbGxGdW5jIiwib3BhY2l0eSIsImZhZGVJbiIsImJpZ1dpbkNsaWNrIiwibnVtIiwiQmlnV2luU2V0Iiwic2l6ZSIsImFkZCIsIndpbk5vZGVQciIsIm5hbWVMaXN0IiwibmQiLCJsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLEVBQWQsRUFBa0I7O0FBQ2xCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0QsRUFBZ0UsR0FBaEUsRUFBcUUsSUFBckUsRUFBMkUsR0FBM0UsRUFBZ0YsR0FBaEYsRUFBcUYsSUFBckYsRUFBMkYsQ0FBM0YsRUFBOEYsR0FBOUYsRUFBbUcsR0FBbkcsQ0FBakIsRUFBMEg7O0FBQzFIQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sTUFGRDtBQUdSQyxNQUFBQSxXQUFXLEVBQUU7QUFITCxLQURKO0FBTVJDLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkE7QUFHVEYsTUFBQUEsV0FBVyxFQUFFO0FBSEosS0FOTDtBQVdSRyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRMLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUyxLQUZBO0FBR1RGLE1BQUFBLFdBQVcsRUFBRTtBQUhKLEtBWEw7QUFnQlJJLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSk4sTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkw7QUFHSkYsTUFBQUEsV0FBVyxFQUFFO0FBSFQsS0FoQkE7QUFxQlJLLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTlAsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkg7QUFHTkYsTUFBQUEsV0FBVyxFQUFFO0FBSFAsS0FyQkY7QUEwQlJNLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUFIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkY7QUFHUEYsTUFBQUEsV0FBVyxFQUFFO0FBSE4sS0ExQkg7QUErQlJPLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUlQsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkQ7QUFHUkYsTUFBQUEsV0FBVyxFQUFFO0FBSEwsS0EvQko7QUFvQ1JRLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLEVBREE7QUFFVFYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLEtBRkE7QUFHVEYsTUFBQUEsV0FBVyxFQUFFO0FBSEosS0FwQ0w7QUF5Q1JTLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVFgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNpQixTQUZBO0FBR1RWLE1BQUFBLFdBQVcsRUFBRTtBQUhKLEtBekNMO0FBOENSVyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxFQURMO0FBRUpiLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDbUIsTUFGTDtBQUdKWixNQUFBQSxXQUFXLEVBQUU7QUFIVCxLQTlDQTtBQW1EUmEsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMZixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3FCLFdBRko7QUFHTGQsTUFBQUEsV0FBVyxFQUFFO0FBSFIsS0FuREQ7QUF3RFJlLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTLElBREo7QUFFTGpCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxNQUZKO0FBR0xDLE1BQUFBLFdBQVcsRUFBRTtBQUhSLEtBeEREO0FBNkRSZ0IsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWbEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZDO0FBR1ZqQixNQUFBQSxXQUFXLEVBQUU7QUFISCxLQTdETjtBQWtFUmtCLElBQUFBLGVBQWUsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYnBCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGSTtBQUdiakIsTUFBQUEsV0FBVyxFQUFFO0FBSEEsS0FsRVQ7QUF1RVJtQixJQUFBQSxlQUFlLEVBQUU7QUFDYixpQkFBUyxJQURJO0FBRWJyQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkk7QUFHYmpCLE1BQUFBLFdBQVcsRUFBRTtBQUhBLEtBdkVUO0FBNEVSb0IsSUFBQUEsaUJBQWlCLEVBQUU7QUFDZixpQkFBUyxJQURNO0FBRWZ0QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRk07QUFHZmpCLE1BQUFBLFdBQVcsRUFBRTtBQUhFLEtBNUVYO0FBa0ZScUIsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSdkIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZEO0FBR1JqQixNQUFBQSxXQUFXLEVBQUU7QUFITCxLQWxGSjtBQXdGUnNCLElBQUFBLGdCQUFnQixFQUFFO0FBQ2QsaUJBQVMsSUFESztBQUVkeEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZLO0FBR2RqQixNQUFBQSxXQUFXLEVBQUU7QUFIQyxLQXhGVjtBQTZGUnVCLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSnpCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGTDtBQUdKakIsTUFBQUEsV0FBVyxFQUFFO0FBSFQsS0E3RkE7QUFtR1I7QUFDQXdCLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUjFCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGRDtBQUdSakIsTUFBQUEsV0FBVyxFQUFFO0FBSEwsS0FwR0o7QUF5R1J5QixJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVgzQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkU7QUFHWGpCLE1BQUFBLFdBQVcsRUFBRTtBQUhGLEtBekdQO0FBOEdSMEIsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUNUIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZBO0FBR1RqQixNQUFBQSxXQUFXLEVBQUU7QUFISixLQTlHTDtBQW9IUjJCLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTLElBREU7QUFFWDdCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDd0IsSUFGRTtBQUdYakIsTUFBQUEsV0FBVyxFQUFFO0FBSEYsS0FwSFA7QUEwSFI0QixJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUo5QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ3dCLElBRkw7QUFHSmpCLE1BQUFBLFdBQVcsRUFBRTtBQUhULEtBMUhBO0FBZ0lSNkIsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVML0IsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN3QixJQUZKO0FBR0xqQixNQUFBQSxXQUFXLEVBQUU7QUFIUixLQWhJRDtBQXNJUjhCLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTmhDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxNQUZIO0FBR05DLE1BQUFBLFdBQVcsRUFBRTtBQUhQO0FBdElGLEdBSFA7QUFnSkwrQixFQUFBQSxNQWhKSyxvQkFnSkk7QUFDTCxTQUFLQyxVQUFMLEdBQWtCQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUF4QztBQUNBLFNBQUtDLEdBQUwsR0FBVyxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsYUFBdkIsQ0FBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLRixJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsQ0FBYjtBQUNBLFNBQUtFLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLQyxHQUFMLEdBQVcsQ0FBWDtBQUNBLFNBQUtDLElBQUwsR0FBWSxLQUFaO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQXJCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNOLFNBQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDRyxHQXBLSTtBQXNLTEMsRUFBQUEsS0F0S0ssbUJBc0tHO0FBQUE7O0FBQ0osU0FBS2xELFFBQUwsQ0FBY21ELE1BQWQsR0FBdUJuRSxLQUF2QjtBQUNBLFNBQUtrQixVQUFMLENBQWdCaUQsTUFBaEIsR0FBeUIsTUFBekI7QUFDQSxTQUFLQyxNQUFMO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQixLQUFLM0IsVUFBTCxDQUFnQjRCLFlBQWhDLEVBQThDLFVBQUFDLEVBQUUsRUFBSTtBQUNoRCxNQUFBLEtBQUksQ0FBQ2hFLFVBQUwsQ0FBZ0JpRSxXQUFoQixHQUE4QkQsRUFBOUI7QUFDSCxLQUZEO0FBR0EsU0FBSzVELFdBQUwsQ0FBaUJ1RCxNQUFqQixHQUEwQixLQUFLeEIsVUFBTCxDQUFnQitCLFVBQTFDO0FBQ0EsU0FBSzVELFdBQUwsQ0FBaUJxRCxNQUFqQixHQUEwQixLQUFLeEIsVUFBTCxDQUFnQmdDLFVBQWhCLENBQTJCQyxPQUEzQixDQUFtQyxDQUFuQyxDQUExQjtBQUNILEdBL0tJO0FBaUxMQyxFQUFBQSxPQWpMSyxtQkFpTEdDLEtBakxILEVBaUxVQyxJQWpMVixFQWlMZ0I7QUFBQTs7QUFDakIsUUFBSUEsSUFBSSxJQUFJLE1BQVosRUFBb0I7QUFDaEIsVUFBSSxLQUFLckIsU0FBTCxHQUFpQixDQUFqQixJQUFzQixLQUFLRCxTQUEzQixJQUF3QyxLQUFLSyxRQUE3QyxJQUF5RCxLQUFLRSxXQUE5RCxJQUE2RSxLQUFLQyxVQUF0RixFQUFrRztBQUM5RjtBQUNIOztBQUNELFdBQUtiLElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0EsV0FBSzFCLE9BQUwsQ0FBYStDLFdBQWIsR0FBMkIsS0FBS2pELE9BQUwsQ0FBYXdELGNBQWIsQ0FBNEIsS0FBSzVCLElBQUwsR0FBWSxhQUFaLEdBQTRCLFlBQXhELENBQTNCOztBQUNBLFVBQUksS0FBS0EsSUFBTCxJQUFhLEtBQUtDLE1BQUwsSUFBZSxDQUFoQyxFQUFtQztBQUMvQixhQUFLNEIsUUFBTDtBQUNIO0FBQ0osS0FURCxNQVNPLElBQUlGLElBQUksSUFBSSxNQUFaLEVBQW9CO0FBQ3ZCLFVBQUksS0FBS3JCLFNBQUwsR0FBaUIsQ0FBakIsSUFBc0IsS0FBS0QsU0FBM0IsSUFBd0MsS0FBS0ssUUFBN0MsSUFBeUQsS0FBS0UsV0FBOUQsSUFBNkUsS0FBS0MsVUFBdEYsRUFBa0c7QUFDOUY7QUFDSDs7QUFDRCxVQUFJLENBQUMsS0FBS2IsSUFBVixFQUFnQjtBQUNaLFlBQUksS0FBS0MsTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ2xCLGVBQUtqQyxXQUFMLENBQWlCOEQsSUFBakI7QUFDQSxlQUFLN0IsTUFBTCxHQUFjLENBQWQ7QUFDQSxlQUFLNEIsUUFBTDtBQUNILFNBSkQsTUFJTyxJQUFJLEtBQUs1QixNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDekIsZUFBS1ksVUFBTCxHQUFrQixJQUFsQjtBQUNBLGVBQUtrQixZQUFMLENBQWtCLFlBQU07QUFDcEIsWUFBQSxNQUFJLENBQUNsQixVQUFMLEdBQWtCLEtBQWxCO0FBQ0gsV0FGRCxFQUVHLENBRkg7QUFHQSxlQUFLbUIsZUFBTDtBQUNIO0FBQ0o7QUFDSixLQWpCTSxNQWlCQSxJQUFJTCxJQUFJLElBQUksS0FBWixFQUFtQjtBQUN0QixVQUFJLEtBQUtyQixTQUFMLEdBQWlCLENBQWpCLElBQXNCLEtBQUtELFNBQTNCLElBQXdDLEtBQUtLLFFBQTdDLElBQXlELEtBQUtWLElBQWxFLEVBQXdFO0FBQ3BFO0FBQ0g7O0FBQ0QsV0FBS0QsR0FBTCxJQUFZLENBQVo7QUFDQSxXQUFLQSxHQUFMLEdBQVcsS0FBS0EsR0FBTCxJQUFZakQsR0FBRyxDQUFDbUYsTUFBaEIsR0FBeUJuRixHQUFHLENBQUNtRixNQUFKLEdBQWEsQ0FBdEMsR0FBMEMsS0FBS2xDLEdBQTFEO0FBQ0EsV0FBS2lCLE1BQUw7QUFDSCxLQVBNLE1BT0EsSUFBSVcsSUFBSSxJQUFJLEtBQVosRUFBbUI7QUFDdEIsVUFBSSxLQUFLckIsU0FBTCxHQUFpQixDQUFqQixJQUFzQixLQUFLRCxTQUEzQixJQUF3QyxLQUFLSyxRQUE3QyxJQUF5RCxLQUFLVixJQUFsRSxFQUF3RTtBQUNwRTtBQUNIOztBQUNELFdBQUtELEdBQUwsSUFBWSxDQUFaO0FBQ0EsV0FBS0EsR0FBTCxHQUFXLEtBQUtBLEdBQUwsSUFBWSxDQUFaLEdBQWdCLEtBQUtBLEdBQXJCLEdBQTJCLENBQXRDO0FBQ0EsV0FBS2lCLE1BQUw7QUFDSCxLQVBNLE1BT0EsSUFBSVcsSUFBSSxJQUFJLGFBQVosRUFBMkI7QUFDOUIsV0FBSzlDLGdCQUFMLENBQXNCcUQsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxXQUFLdEQsVUFBTCxDQUFnQnNELE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0EsV0FBS3JDLEtBQUwsQ0FBV3NDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDSCxLQUpNLE1BSUEsSUFBSVIsSUFBSSxJQUFJLE1BQVosRUFBb0I7QUFDdkIsV0FBS3hDLE1BQUwsQ0FBWStDLE1BQVosR0FBcUIsSUFBckI7QUFDQSxVQUFJRSxFQUFFLEdBQUcsS0FBS2hELE9BQUwsQ0FBYWlELFFBQXRCOztBQUNBLFdBQUssSUFBSUMsQ0FBVCxJQUFjRixFQUFkLEVBQWtCO0FBQ2RBLFFBQUFBLEVBQUUsQ0FBQ0UsQ0FBRCxDQUFGLENBQU0xQyxZQUFOLENBQW1CNUMsRUFBRSxDQUFDUyxLQUF0QixFQUE2QnNELE1BQTdCLEdBQXNDLENBQUNoRSxRQUFRLENBQUN1RixDQUFELENBQVIsR0FBY3hGLEdBQUcsQ0FBQyxLQUFLaUQsR0FBTixDQUFsQixFQUE4QnlCLE9BQTlCLENBQXNDLENBQXRDLENBQXRDO0FBQ0g7QUFDSixLQU5NLE1BTUEsSUFBSUcsSUFBSSxJQUFJLFdBQVosRUFBeUI7QUFDNUIsV0FBS3hDLE1BQUwsQ0FBWStDLE1BQVosR0FBcUIsS0FBckI7QUFDSCxLQUZNLE1BRUEsSUFBSVAsSUFBSSxJQUFJLFVBQVosRUFBd0I7QUFDM0IsV0FBS2pDLEdBQUwsQ0FBUzZDLE1BQVQsQ0FBZ0JDLFVBQWhCO0FBQ0F4RixNQUFBQSxFQUFFLENBQUN5RixRQUFILENBQVlDLFNBQVosQ0FBc0IsV0FBdEI7QUFDSCxLQUhNLE1BR0EsSUFBSWYsSUFBSSxJQUFJLE9BQVosRUFBcUI7QUFDeEIsV0FBSzlCLEtBQUwsQ0FBVzhDLEtBQVgsQ0FBaUJDLFlBQWpCLEdBQWdDLENBQUMsS0FBSy9DLEtBQUwsQ0FBVzhDLEtBQVgsQ0FBaUJDLFlBQWxEO0FBQ0EsV0FBS3ZELFFBQUwsQ0FBY2dDLFdBQWQsR0FBNEIsS0FBS2pELE9BQUwsQ0FBYXdELGNBQWIsQ0FBNEIsS0FBSy9CLEtBQUwsQ0FBVzhDLEtBQVgsQ0FBaUJDLFlBQWpCLEdBQWdDLFdBQWhDLEdBQThDLGFBQTFFLENBQTVCOztBQUNBLFVBQUksQ0FBQyxLQUFLL0MsS0FBTCxDQUFXOEMsS0FBWCxDQUFpQkMsWUFBdEIsRUFBb0M7QUFDaEMsYUFBSy9DLEtBQUwsQ0FBV2dELFNBQVg7QUFDSCxPQUZELE1BRU87QUFDSCxZQUFJLEtBQUt2QyxTQUFMLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLGVBQUtULEtBQUwsQ0FBV3NDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDSCxTQUZELE1BRU8sSUFBSSxLQUFLOUIsU0FBVCxFQUFvQjtBQUN2QixlQUFLUixLQUFMLENBQVdzQyxPQUFYLENBQW1CLENBQW5CO0FBQ0gsU0FGTSxNQUVBO0FBQ0gsZUFBS3RDLEtBQUwsQ0FBV3NDLE9BQVgsQ0FBbUIsQ0FBbkI7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQXhQSTtBQTBQTG5CLEVBQUFBLE1BMVBLLG9CQTBQSTtBQUNMLFNBQUtyRCxNQUFMLENBQVlvRCxNQUFaLEdBQXFCLENBQUNqRSxHQUFHLENBQUMsS0FBS2lELEdBQU4sQ0FBSCxHQUFnQnBELE1BQWpCLEVBQXlCNkUsT0FBekIsQ0FBaUMsQ0FBakMsQ0FBckI7QUFDQSxTQUFLM0QsU0FBTCxDQUFla0QsTUFBZixHQUF3QixDQUFDakUsR0FBRyxDQUFDLEtBQUtpRCxHQUFOLENBQUgsR0FBZ0JwRCxNQUFqQixFQUF5QjZFLE9BQXpCLENBQWlDLENBQWpDLENBQXhCOztBQUNBLFNBQUssSUFBSWMsQ0FBVCxJQUFjLEtBQUt2RSxXQUFuQixFQUFnQztBQUM1QixXQUFLQSxXQUFMLENBQWlCdUUsQ0FBakIsRUFBb0J2QixNQUFwQixHQUE2QixDQUFDbEUsTUFBTSxDQUFDeUYsQ0FBRCxDQUFOLElBQWEsS0FBS3ZDLEdBQUwsR0FBVyxDQUF4QixJQUE2QnBELE1BQTlCLEVBQXNDNkUsT0FBdEMsQ0FBOEMsQ0FBOUMsQ0FBN0I7QUFDSDtBQUNKLEdBaFFJO0FBa1FMc0IsRUFBQUEsYUFsUUssMkJBa1FXO0FBQUE7O0FBQ1osUUFBSUMsRUFBRSxHQUFHLENBQVQ7O0FBQ0EsU0FBSyxJQUFJVCxDQUFULElBQWMsS0FBS3hDLFNBQW5CLEVBQThCO0FBQzFCLFVBQUksS0FBS0EsU0FBTCxDQUFld0MsQ0FBZixFQUFrQnJDLE1BQXRCLEVBQThCO0FBQzFCOEMsUUFBQUEsRUFBRSxHQUFHLENBQUw7QUFDQTtBQUNIO0FBQ0o7O0FBQ0QsU0FBSzlDLE1BQUwsR0FBYzhDLEVBQWQ7O0FBQ0EsUUFBSSxLQUFLOUMsTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ2xCO0FBQ0EsVUFBSStDLE1BQU0sR0FBRyxLQUFLeEMsU0FBbEI7QUFDQSxXQUFLOUMsV0FBTCxDQUFpQnFELE1BQWpCLEdBQTBCLENBQUMsS0FBS04sVUFBTCxDQUFnQndDLFNBQWhCLEdBQTRCLEdBQTdCLEVBQWtDekIsT0FBbEMsQ0FBMEMsQ0FBMUMsQ0FBMUI7QUFDQSxXQUFLMUQsVUFBTCxDQUFnQmlELE1BQWhCLEdBQXlCLENBQUMsS0FBS04sVUFBTCxDQUFnQnlDLFFBQWhCLEdBQTJCLEdBQTVCLEVBQWlDMUIsT0FBakMsQ0FBeUMsQ0FBekMsQ0FBekI7O0FBQ0EsVUFBSSxLQUFLWixXQUFULEVBQXNCO0FBQ2xCLGFBQUtELFlBQUwsSUFBcUIsS0FBS0YsVUFBTCxDQUFnQnlDLFFBQXJDO0FBQ0g7O0FBQ0QsV0FBS25CLFlBQUwsQ0FBa0IsWUFBTTtBQUNwQixZQUFJaUIsTUFBTSxJQUFJLE1BQUksQ0FBQ3hDLFNBQW5CLEVBQThCO0FBQzFCLFVBQUEsTUFBSSxDQUFDMkMsV0FBTDtBQUNIO0FBQ0osT0FKRCxFQUlHLENBSkg7O0FBS0EsVUFBSSxLQUFLMUMsVUFBTCxDQUFnQjJDLFNBQWhCLENBQTBCQyxVQUExQixDQUFxQ0MsS0FBekMsRUFBZ0Q7QUFDNUMsYUFBS2pELFNBQUwsR0FBaUIsSUFBakI7QUFDQSxhQUFLa0QsV0FBTCxHQUFtQixLQUFLOUMsVUFBTCxDQUFnQjJDLFNBQWhCLENBQTBCQyxVQUExQixDQUFxQ0csUUFBckMsQ0FBOEN2QixNQUFqRTtBQUNBLGFBQUsvQixhQUFMLEdBQXFCLEtBQUtPLFVBQUwsQ0FBZ0IyQyxTQUFoQixDQUEwQkMsVUFBMUIsQ0FBcUNHLFFBQTFEO0FBQ0EsYUFBS3JELFVBQUwsR0FBa0IsS0FBS00sVUFBTCxDQUFnQjJDLFNBQWhCLENBQTBCQyxVQUExQixDQUFxQ0ksUUFBdkQ7QUFDQSxhQUFLckQsVUFBTCxHQUFrQixLQUFLSyxVQUFMLENBQWdCMkMsU0FBaEIsQ0FBMEJDLFVBQTFCLENBQXFDSyxHQUF2RDtBQUNBLGFBQUtDLGdCQUFMLEdBQXdCLEtBQUtsRCxVQUFMLENBQWdCMkMsU0FBaEIsQ0FBMEJRLFVBQWxEO0FBQ0EsYUFBSzdCLFlBQUwsQ0FBa0IsWUFBTTtBQUNwQixVQUFBLE1BQUksQ0FBQzhCLFdBQUw7QUFDSCxTQUZELEVBRUcsQ0FGSDtBQUdIOztBQUNELFVBQUksS0FBS3BELFVBQUwsQ0FBZ0IyQyxTQUFoQixDQUEwQlUsV0FBMUIsQ0FBc0NSLEtBQTFDLEVBQWlEO0FBQzdDLFlBQUksS0FBS2hELFNBQUwsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDckIsZUFBS0EsU0FBTCxHQUFpQixLQUFLRyxVQUFMLENBQWdCMkMsU0FBaEIsQ0FBMEJVLFdBQTFCLENBQXNDQyxTQUF2RDtBQUNBLGVBQUsvRSxhQUFMLENBQW1Ca0QsTUFBbkIsR0FBNEIsSUFBNUI7QUFDQSxlQUFLSCxZQUFMLENBQWtCLFlBQU07QUFDcEIsWUFBQSxNQUFJLENBQUMvQyxhQUFMLENBQW1Ca0QsTUFBbkIsR0FBNEIsS0FBNUI7O0FBQ0EsWUFBQSxNQUFJLENBQUM4QixVQUFMOztBQUNBLFlBQUEsTUFBSSxDQUFDQyxhQUFMO0FBQ0gsV0FKRCxFQUlHLENBSkg7QUFLSCxTQVJELE1BUU87QUFDSCxlQUFLM0QsU0FBTCxHQUFpQixLQUFLRyxVQUFMLENBQWdCMkMsU0FBaEIsQ0FBMEJVLFdBQTFCLENBQXNDQyxTQUF2RDtBQUNBLGVBQUtyRCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0FsVEk7QUFvVEx5QyxFQUFBQSxXQXBUSyx5QkFvVFM7QUFBQTs7QUFDVjtBQUNBLFFBQUllLFVBQVUsR0FBRyxDQUFqQjtBQUNBLFFBQUlDLE9BQU8sR0FBRyxFQUFkOztBQUVBLFNBQUssSUFBSTdCLENBQVQsSUFBYyxLQUFLN0IsVUFBTCxDQUFnQjJDLFNBQWhCLENBQTBCZ0IsU0FBeEMsRUFBbUQ7QUFDL0MsVUFBSSxLQUFLM0QsVUFBTCxDQUFnQjJDLFNBQWhCLENBQTBCZ0IsU0FBMUIsQ0FBb0M5QixDQUFwQyxDQUFKLEVBQTRDO0FBQ3hDNkIsUUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWEvQixDQUFiO0FBQ0g7QUFDSjs7QUFDRCxRQUFJZ0MsS0FBSyxHQUFHLEtBQUs3RCxVQUFMLENBQWdCMkMsU0FBaEIsQ0FBMEJtQixlQUF0QztBQUNBLFFBQUl2QixNQUFNLEdBQUcsS0FBS3hDLFNBQWxCO0FBQ0EsUUFBSWdFLElBQUksR0FBSSxLQUFLbEUsU0FBTCxHQUFpQixDQUFqQixJQUFzQixLQUFLSSxRQUE1QixHQUF3QyxDQUFDeUQsT0FBRCxDQUF4QyxJQUF1REEsT0FBdkQsU0FBbUVHLEtBQW5FLENBQVg7QUFDQUosSUFBQUEsVUFBVSxHQUFHTSxJQUFJLENBQUN2QyxNQUFMLEdBQWMsQ0FBM0I7O0FBQ0EsUUFBSWlDLFVBQVUsR0FBRyxDQUFqQixFQUFvQjtBQUNoQjtBQUNBLFdBQUt6RixlQUFMLENBQXFCeUQsTUFBckIsR0FBOEIsSUFBOUI7QUFDQSxXQUFLekQsZUFBTCxDQUFxQm1CLFlBQXJCLENBQWtDd0IsRUFBRSxDQUFDcUQsUUFBckMsRUFBK0NDLFVBQS9DLENBQTBELENBQTFEO0FBQ0EsV0FBS2pHLGVBQUwsQ0FBcUJtQixZQUFyQixDQUFrQ3dCLEVBQUUsQ0FBQ3FELFFBQXJDLEVBQStDRSxZQUEvQyxDQUE0RCxDQUE1RCxFQUE4RCxRQUE5RCxFQUF1RSxLQUF2RSxFQUpnQixDQUtoQjs7QUFDQSxXQUFLakcsZUFBTCxDQUFxQndELE1BQXJCLEdBQThCLElBQTlCO0FBQ0EsVUFBSTBDLFFBQVEsR0FBRyxLQUFLbEcsZUFBTCxDQUFxQm1HLGNBQXJCLENBQW9DLFVBQXBDLEVBQWdEakYsWUFBaEQsQ0FBNkQ1QyxFQUFFLENBQUNTLEtBQWhFLENBQWY7QUFDQSxVQUFJcUgsT0FBTyxHQUFHLENBQWQ7QUFDQSxXQUFLQyxRQUFMLENBQWMsWUFBTTtBQUNoQkQsUUFBQUEsT0FBTyxJQUFJLE1BQUksQ0FBQ3JFLFVBQUwsQ0FBZ0J5QyxRQUFoQixHQUEyQixFQUF0Qzs7QUFDQSxZQUFJNEIsT0FBTyxHQUFHLE1BQUksQ0FBQ3JFLFVBQUwsQ0FBZ0J5QyxRQUE5QixFQUF3QztBQUNwQzRCLFVBQUFBLE9BQU8sR0FBRyxNQUFJLENBQUNyRSxVQUFMLENBQWdCeUMsUUFBMUI7QUFDSDs7QUFDRDBCLFFBQUFBLFFBQVEsQ0FBQzdELE1BQVQsR0FBa0IsQ0FBQytELE9BQU8sR0FBRyxHQUFYLEVBQWdCdEQsT0FBaEIsQ0FBd0IsQ0FBeEIsQ0FBbEI7QUFDSCxPQU5ELEVBTUcsQ0FOSCxFQU1NLEVBTk4sRUFNVSxJQU5WLEVBVGdCLENBZ0JoQjs7QUFDQSxVQUFJLEtBQUtmLFVBQUwsQ0FBZ0J5QyxRQUFoQixHQUEyQnBHLEdBQUcsQ0FBQyxLQUFLaUQsR0FBTixDQUFILEdBQWdCcEQsTUFBaEIsR0FBd0IsR0FBdkQsRUFBNEQ7QUFBRTtBQUMxRCxhQUFLZ0MsaUJBQUwsQ0FBdUJ1RCxNQUF2QixHQUFnQyxJQUFoQztBQUNBLGFBQUt2RCxpQkFBTCxDQUF1QmlCLFlBQXZCLENBQW9Dd0IsRUFBRSxDQUFDcUQsUUFBdkMsRUFBaURDLFVBQWpELENBQTRELENBQTVEO0FBQ0EsYUFBSy9GLGlCQUFMLENBQXVCaUIsWUFBdkIsQ0FBb0N3QixFQUFFLENBQUNxRCxRQUF2QyxFQUFpREUsWUFBakQsQ0FBOEQsQ0FBOUQsRUFBZ0UsWUFBaEUsRUFBNkUsSUFBN0U7QUFDSDtBQUNKOztBQUNELFFBQUlLLFNBQVMsR0FBRyxDQUFoQjtBQUNBLFNBQUtELFFBQUwsQ0FBYyxZQUFNO0FBQ2hCLFVBQUkvQixNQUFNLElBQUksTUFBSSxDQUFDeEMsU0FBbkIsRUFBOEI7QUFDMUIsUUFBQSxNQUFJLENBQUN3RCxVQUFMOztBQUNBLGFBQUssSUFBSTFCLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsRUFBcEIsRUFBd0JBLEVBQUMsRUFBekIsRUFBNkI7QUFDekIsVUFBQSxNQUFJLENBQUMyQyxTQUFMLENBQWUzQyxFQUFDLEdBQUcsQ0FBbkIsRUFBc0I0QyxRQUFRLENBQUM1QyxFQUFDLEdBQUcsQ0FBTCxDQUE5QjtBQUNIOztBQUNELFlBQUksQ0FBQyxDQUFDLENBQUNrQyxJQUFJLENBQUNRLFNBQUQsQ0FBWCxFQUF3QjtBQUNwQjtBQUNIOztBQUNELGFBQUssSUFBSUcsQ0FBVCxJQUFjWCxJQUFJLENBQUNRLFNBQUQsQ0FBbEIsRUFBK0I7QUFDM0I7QUFDQSxVQUFBLE1BQUksQ0FBQ0ksUUFBTCxDQUFjWixJQUFJLENBQUNRLFNBQUQsQ0FBSixDQUFnQkcsQ0FBaEIsSUFBcUIsQ0FBbkMsRUFBc0NELFFBQVEsQ0FBQ1YsSUFBSSxDQUFDUSxTQUFELENBQUosQ0FBZ0JHLENBQWhCLElBQXFCLENBQXRCLENBQTlDLEVBQXdFLE1BQUksQ0FBQzFFLFVBQUwsQ0FBZ0IyQyxTQUFoQixDQUEwQmlDLFNBQWxHO0FBQ0g7O0FBQ0RMLFFBQUFBLFNBQVM7QUFDWjtBQUNKLEtBZkQsRUFlRyxDQWZILEVBZU1SLElBQUksQ0FBQ3ZDLE1BZlgsRUFlbUIsSUFmbkI7QUFrQkEsU0FBS0YsWUFBTCxDQUFrQixZQUFNO0FBQ3BCLE1BQUEsTUFBSSxDQUFDdEQsZUFBTCxDQUFxQnlELE1BQXJCLEdBQThCLEtBQTlCO0FBQ0EsTUFBQSxNQUFJLENBQUN4RCxlQUFMLENBQXFCd0QsTUFBckIsR0FBOEIsS0FBOUI7O0FBQ0EsTUFBQSxNQUFJLENBQUN2RCxpQkFBTCxDQUF1QmlCLFlBQXZCLENBQW9Dd0IsRUFBRSxDQUFDcUQsUUFBdkMsRUFBaURDLFVBQWpELENBQTRELENBQTVEOztBQUNBLE1BQUEsTUFBSSxDQUFDL0YsaUJBQUwsQ0FBdUJ1RCxNQUF2QixHQUFnQyxLQUFoQzs7QUFDQSxVQUFJLE1BQUksQ0FBQ3hCLFFBQVQsRUFBbUI7QUFDZixRQUFBLE1BQUksQ0FBQ0EsUUFBTCxHQUFnQixLQUFoQjs7QUFDQSxRQUFBLE1BQUksQ0FBQzRFLGFBQUw7O0FBQ0EsUUFBQSxNQUFJLENBQUN0QixVQUFMO0FBQ0g7O0FBQ0QsVUFBSSxNQUFJLENBQUMxRCxTQUFMLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLFFBQUEsTUFBSSxDQUFDQSxTQUFMO0FBQ0EsUUFBQSxNQUFJLENBQUNwQixhQUFMLENBQW1CMkYsY0FBbkIsQ0FBa0MsS0FBbEMsRUFBeUNBLGNBQXpDLENBQXdELFdBQXhELEVBQXFFakYsWUFBckUsQ0FBa0Y1QyxFQUFFLENBQUNTLEtBQXJGLEVBQTRGc0QsTUFBNUYsR0FBcUcsTUFBSSxDQUFDVCxTQUExRzs7QUFDQSxZQUFJLE1BQUksQ0FBQ0EsU0FBTCxJQUFrQixDQUF0QixFQUF5QjtBQUNyQixVQUFBLE1BQUksQ0FBQ0ksUUFBTCxHQUFnQixJQUFoQjtBQUNIOztBQUNELFFBQUEsTUFBSSxDQUFDVixJQUFMLElBQWEsTUFBSSxDQUFDNkIsUUFBTCxFQUFiO0FBQ0g7O0FBQ0QsVUFBSW1CLE1BQU0sSUFBSSxNQUFJLENBQUN4QyxTQUFuQixFQUE4QjtBQUMxQixRQUFBLE1BQUksQ0FBQ1IsSUFBTCxJQUFhLE1BQUksQ0FBQ00sU0FBTCxJQUFrQixDQUEvQixJQUFvQyxNQUFJLENBQUN1QixRQUFMLEVBQXBDO0FBQ0g7QUFDSixLQXJCRCxFQXFCR3FDLFVBQVUsR0FBRyxDQUFiLEdBQWlCQSxVQUFVLEdBQUcsQ0FBOUIsR0FBa0MsQ0FyQnJDO0FBc0JILEdBbFlJO0FBb1lMO0FBQ0FELEVBQUFBLGFBcllLLDJCQXFZVztBQUNac0IsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWjtBQUNBLFNBQUszRixLQUFMLENBQVdzQyxPQUFYLENBQW1CLENBQW5CO0FBQ0EsU0FBS3hCLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxTQUFLN0IsTUFBTCxDQUFZb0QsTUFBWixHQUFxQixLQUFyQjtBQUNBLFNBQUt0QixXQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBSzdCLFVBQUwsQ0FBZ0JtRCxNQUFoQixHQUF5QixJQUF6QjtBQUNBLFNBQUs1RCxPQUFMLENBQWErQyxXQUFiLEdBQTJCLEtBQUtqRCxPQUFMLENBQWF3RCxjQUFiLENBQTRCLFlBQTVCLENBQTNCOztBQUNBLFNBQUssSUFBSVUsQ0FBVCxJQUFjLEtBQUttRCxZQUFuQixFQUFpQztBQUM3QixXQUFLQSxZQUFMLENBQWtCbkQsQ0FBbEIsRUFBcUJKLE1BQXJCLEdBQThCLEtBQTlCO0FBQ0g7O0FBRUQsU0FBSyxJQUFJSSxHQUFULElBQWMsS0FBS3hDLFNBQW5CLEVBQThCO0FBQzFCLFdBQUtBLFNBQUwsQ0FBZXdDLEdBQWYsRUFBa0JvRCxTQUFsQjtBQUNIOztBQUNELFNBQUt4RyxhQUFMLENBQW1CZ0QsTUFBbkIsR0FBNEIsSUFBNUI7QUFDQSxTQUFLaEQsYUFBTCxDQUFtQjJGLGNBQW5CLENBQWtDLEtBQWxDLEVBQXlDQSxjQUF6QyxDQUF3RCxXQUF4RCxFQUFxRWpGLFlBQXJFLENBQWtGNUMsRUFBRSxDQUFDUyxLQUFyRixFQUE0RnNELE1BQTVGLEdBQXFHLEtBQUtULFNBQTFHLENBaEJZLENBaUJaOztBQUNBLFNBQUtOLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSzZCLFFBQUwsR0FuQlksQ0FvQlo7QUFDSCxHQTFaSTtBQTRaTHlELEVBQUFBLGFBNVpLLDJCQTRaVztBQUFBOztBQUNaQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWixFQUE0QyxLQUFLN0UsWUFBakQ7QUFDQSxTQUFLZCxLQUFMLENBQVdzQyxPQUFYLENBQW1CLENBQW5CO0FBQ0EsU0FBS25DLElBQUwsR0FBWSxLQUFaOztBQUNBLFNBQUssSUFBSXNDLENBQVQsSUFBYyxLQUFLbUQsWUFBbkIsRUFBaUM7QUFDN0IsV0FBS0EsWUFBTCxDQUFrQm5ELENBQWxCLEVBQXFCSixNQUFyQixHQUE4QixJQUE5QjtBQUNIOztBQUVELFNBQUssSUFBSUksR0FBVCxJQUFjLEtBQUt4QyxTQUFuQixFQUE4QjtBQUMxQixXQUFLQSxTQUFMLENBQWV3QyxHQUFmLEVBQWtCb0QsU0FBbEI7QUFDSDs7QUFDRCxTQUFLeEcsYUFBTCxDQUFtQmdELE1BQW5CLEdBQTRCLEtBQTVCO0FBQ0EsU0FBS2pELFdBQUwsQ0FBaUJpRCxNQUFqQixHQUEwQixJQUExQjtBQUNBLFNBQUtqRCxXQUFMLENBQWlCNEYsY0FBakIsQ0FBZ0MsVUFBaEMsRUFBNENqRixZQUE1QyxDQUF5RDVDLEVBQUUsQ0FBQ1MsS0FBNUQsRUFBbUVzRCxNQUFuRSxHQUE0RSxDQUFDLEtBQUtKLFlBQUwsR0FBb0IsR0FBckIsRUFBMEJhLE9BQTFCLENBQWtDLENBQWxDLENBQTVFO0FBQ0EsU0FBS08sWUFBTCxDQUFrQixZQUFJO0FBQ2xCLE1BQUEsTUFBSSxDQUFDOUMsV0FBTCxDQUFpQmlELE1BQWpCLEdBQTBCLEtBQTFCO0FBQ0EsTUFBQSxNQUFJLENBQUNwRCxNQUFMLENBQVlvRCxNQUFaLEdBQXFCLElBQXJCO0FBQ0EsTUFBQSxNQUFJLENBQUNuRCxVQUFMLENBQWdCbUQsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxNQUFBLE1BQUksQ0FBQ3RCLFdBQUwsR0FBbUIsS0FBbkI7QUFDSCxLQUxELEVBS0UsQ0FMRjtBQU9ILEdBamJJO0FBbWJMO0FBQ0F3RSxFQUFBQSxRQXBiSyxvQkFvYklPLElBcGJKLEVBb2JVQyxLQXBiVixFQW9iaUJDLE1BcGJqQixFQW9ieUI7QUFDMUIsU0FBS2hHLEtBQUwsQ0FBV2lHLE1BQVg7QUFDQSxRQUFJN0QsTUFBTSxHQUFHLEtBQUtuQyxTQUFMLENBQWU2RixJQUFmLEVBQXFCSSxVQUFyQixDQUFnQzlELE1BQTdDO0FBQ0EsU0FBS25DLFNBQUwsQ0FBZTZGLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDL0QsTUFBTSxHQUFHLENBQVQsR0FBYTJELEtBQTdDLEVBQW9EaEcsWUFBcEQsQ0FBaUUsZUFBakUsRUFBa0ZxRyxRQUFsRixHQUgwQixDQUkxQjs7QUFDQSxRQUFJLEtBQUtuRyxTQUFMLENBQWU2RixJQUFmLEVBQXFCSyxVQUFyQixDQUFnQy9ELE1BQU0sR0FBRyxDQUFULEdBQWEyRCxLQUE3QyxFQUFvRGYsY0FBcEQsQ0FBbUUsUUFBbkUsS0FBZ0ZnQixNQUFNLEdBQUcsQ0FBN0YsRUFBZ0c7QUFDNUYsV0FBSy9GLFNBQUwsQ0FBZTZGLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDL0QsTUFBTSxHQUFHLENBQVQsR0FBYTJELEtBQTdDLEVBQW9EZixjQUFwRCxDQUFtRSxRQUFuRSxFQUE2RTNDLE1BQTdFLEdBQXNGLElBQXRGO0FBQ0EsV0FBS3BDLFNBQUwsQ0FBZTZGLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDL0QsTUFBTSxHQUFHLENBQVQsR0FBYTJELEtBQTdDLEVBQW9EZixjQUFwRCxDQUFtRSxRQUFuRSxFQUE2RWpGLFlBQTdFLENBQTBGNUMsRUFBRSxDQUFDUyxLQUE3RixFQUFvR3NELE1BQXBHLEdBQTZHLE1BQU04RSxNQUFuSDtBQUNILEtBUnlCLENBUzFCOzs7QUFDQSxRQUFJSyxRQUFRLEdBQUcsS0FBSzNILFlBQUwsQ0FBa0I4RCxRQUFqQztBQUNBNkQsSUFBQUEsUUFBUSxDQUFDUCxJQUFJLEdBQUcsQ0FBUCxHQUFXQyxLQUFaLENBQVIsQ0FBMkIxRCxNQUEzQixHQUFvQyxJQUFwQztBQUNBZ0UsSUFBQUEsUUFBUSxDQUFDUCxJQUFJLEdBQUcsQ0FBUCxHQUFXQyxLQUFaLENBQVIsQ0FBMkJoRyxZQUEzQixDQUF3QzVDLEVBQUUsQ0FBQ2lCLFNBQTNDLEVBQXNENkQsSUFBdEQ7QUFDSCxHQWpjSTtBQW1jTG1ELEVBQUFBLFNBbmNLLHFCQW1jS1UsSUFuY0wsRUFtY1dDLEtBbmNYLEVBbWNrQjtBQUNuQixRQUFJM0QsTUFBTSxHQUFHLEtBQUtuQyxTQUFMLENBQWU2RixJQUFmLEVBQXFCSSxVQUFyQixDQUFnQzlELE1BQTdDO0FBQ0EsU0FBS25DLFNBQUwsQ0FBZTZGLElBQWYsRUFBcUJLLFVBQXJCLENBQWdDL0QsTUFBTSxHQUFHLENBQVQsR0FBYTJELEtBQTdDLEVBQW9EaEcsWUFBcEQsQ0FBaUUsZUFBakUsRUFBa0Z1RyxRQUFsRixHQUZtQixDQUduQjs7QUFDQSxRQUFJLEtBQUtyRyxTQUFMLENBQWU2RixJQUFmLEVBQXFCSyxVQUFyQixDQUFnQy9ELE1BQU0sR0FBRyxDQUFULEdBQWEyRCxLQUE3QyxFQUFvRGYsY0FBcEQsQ0FBbUUsUUFBbkUsQ0FBSixFQUFrRjtBQUM5RSxXQUFLL0UsU0FBTCxDQUFlNkYsSUFBZixFQUFxQkssVUFBckIsQ0FBZ0MvRCxNQUFNLEdBQUcsQ0FBVCxHQUFhMkQsS0FBN0MsRUFBb0RmLGNBQXBELENBQW1FLFFBQW5FLEVBQTZFM0MsTUFBN0UsR0FBc0YsS0FBdEY7QUFDSCxLQU5rQixDQU9uQjs7O0FBQ0EsUUFBSWdFLFFBQVEsR0FBRyxLQUFLM0gsWUFBTCxDQUFrQjhELFFBQWpDO0FBQ0E2RCxJQUFBQSxRQUFRLENBQUNQLElBQUksR0FBRyxDQUFQLEdBQVdDLEtBQVosQ0FBUixDQUEyQjFELE1BQTNCLEdBQW9DLEtBQXBDO0FBQ0gsR0E3Y0k7QUErY0xrRSxFQUFBQSxhQS9jSyx5QkErY1M1QixJQS9jVCxFQStjYztBQUNmLHlEQUF1QkEsSUFBdkIsd0NBQTZCO0FBQUEsVUFBbEI2QixRQUFrQjs7QUFDekIsVUFBSUEsUUFBUSxJQUFJLEtBQUtuSSxNQUFMLENBQVkrRCxNQUE1QixFQUFvQztBQUNoQyxlQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELFdBQU8sSUFBUDtBQUNILEdBdGRJO0FBd2RMcUUsRUFBQUEsSUF4ZEssZ0JBd2RBOUIsSUF4ZEEsRUF3ZE07QUFDUCxRQUFJLENBQUMsS0FBSzRCLGFBQUwsQ0FBbUI1QixJQUFuQixDQUFMLEVBQStCO0FBQzNCK0IsTUFBQUEsS0FBSyw4UEFBTDtBQUlBO0FBQ0g7O0FBQ0QsU0FBS3RHLE1BQUwsR0FBYyxDQUFkO0FBQ0EsUUFBSXVHLElBQUksR0FBRyxFQUFYOztBQUNBLFNBQUssSUFBSWxFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEJrRSxNQUFBQSxJQUFJLENBQUNsRSxDQUFELENBQUosR0FBVSxFQUFWO0FBQ0g7O0FBQ0QsU0FBSyxJQUFJQSxHQUFULElBQWNrQyxJQUFkLEVBQW9CO0FBQ2hCZ0MsTUFBQUEsSUFBSSxDQUFDbEUsR0FBQyxHQUFHLENBQUwsQ0FBSixDQUFZLElBQUk0QyxRQUFRLENBQUM1QyxHQUFDLEdBQUcsQ0FBTCxDQUF4QixJQUFtQ2tDLElBQUksQ0FBQ2xDLEdBQUQsQ0FBdkM7QUFDSDs7QUFDRCxTQUFLLElBQUlBLEdBQVQsSUFBYyxLQUFLeEMsU0FBbkIsRUFBOEI7QUFBQTs7QUFDMUIsaUNBQUtBLFNBQUwsQ0FBZXdDLEdBQWYsR0FBa0JtRSxTQUFsQiwyQkFBK0JELElBQUksQ0FBQ2xFLEdBQUQsQ0FBbkM7QUFDSDtBQUNKLEdBM2VJO0FBNmVMMEIsRUFBQUEsVUE3ZUssd0JBNmVRO0FBQ1QsUUFBSWtDLFFBQVEsR0FBRyxLQUFLM0gsWUFBTCxDQUFrQjhELFFBQWpDOztBQUNBLFNBQUssSUFBSUMsQ0FBVCxJQUFjNEQsUUFBZCxFQUF3QjtBQUNwQkEsTUFBQUEsUUFBUSxDQUFDNUQsQ0FBRCxDQUFSLENBQVlKLE1BQVosR0FBcUIsS0FBckI7QUFDSDtBQUNKLEdBbGZJO0FBb2ZMTCxFQUFBQSxRQXBmSyxzQkFvZk07QUFDUCxTQUFLckIsU0FBTDtBQUNBLFNBQUt3RCxVQUFMO0FBQ0EsU0FBS3RFLEdBQUwsQ0FBUzZDLE1BQVQsQ0FBZ0JtRSxJQUFoQixDQUFxQixTQUFyQixFQUFnQ0MsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDM0M3RyxNQUFBQSxHQUFHLEVBQUUsS0FBS0EsR0FEaUM7QUFFM0M4RyxNQUFBQSxRQUFRLEVBQUUsQ0FBQy9KLEdBQUcsQ0FBQyxLQUFLaUQsR0FBTixDQUFILEdBQWdCcEQsTUFBaEIsR0FBeUIsR0FBMUI7QUFGaUMsS0FBZixDQUFoQztBQUlILEdBM2ZJO0FBNmZMcUYsRUFBQUEsZUE3ZkssNkJBNmZhO0FBQ2QsUUFBSSxDQUFDLEtBQUtoQyxJQUFWLEVBQWdCO0FBQ1osV0FBSyxJQUFJc0MsQ0FBVCxJQUFjLEtBQUt4QyxTQUFuQixFQUE4QjtBQUMxQixhQUFLQSxTQUFMLENBQWV3QyxDQUFmLEVBQWtCTixlQUFsQjtBQUNIO0FBQ0o7QUFDSixHQW5nQkk7QUFxZ0JMNkIsRUFBQUEsV0FyZ0JLLHlCQXFnQlM7QUFDVixTQUFLaEUsS0FBTCxDQUFXc0MsT0FBWCxDQUFtQixDQUFuQixFQURVLENBRVY7QUFDQTtBQUNBOztBQUNBLFNBQUt2RCxVQUFMLENBQWdCc0QsTUFBaEIsR0FBeUIsSUFBekI7QUFDQSxTQUFLdEQsVUFBTCxDQUFnQmlHLGNBQWhCLENBQStCLG1CQUEvQixFQUFvREEsY0FBcEQsQ0FBbUUsd0JBQW5FLEVBQTZGaUMsUUFBN0YsR0FBd0csQ0FBeEcsQ0FOVSxDQU9WO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0FuaEJJO0FBcWhCTEMsRUFBQUEsV0FyaEJLLHVCQXFoQk9yRixLQXJoQlAsRUFxaEJjc0YsYUFyaEJkLEVBcWhCNkI7QUFBQTs7QUFDOUIsUUFBSSxLQUFLM0csU0FBTCxJQUFrQixLQUF0QixFQUE2QjtBQUN6QjtBQUNIOztBQUNELFNBQUtBLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxRQUFJNEcsU0FBUyxHQUFHLEtBQUtySSxVQUFMLENBQWdCaUcsY0FBaEIsQ0FBK0IsbUJBQS9CLEVBQW9EQSxjQUFwRCxDQUFtRSx3QkFBbkUsQ0FBaEI7QUFDQSxRQUFJcUMsTUFBTSxHQUFHLENBQWI7O0FBQ0EsWUFBUSxLQUFLL0csVUFBYjtBQUNJLFdBQUssQ0FBTDtBQUNJK0csUUFBQUEsTUFBTSxHQUFHLEdBQVQ7QUFDSjs7QUFDQSxXQUFLLENBQUw7QUFDSUEsUUFBQUEsTUFBTSxHQUFHLEVBQVQ7QUFDSjs7QUFDQSxXQUFLLENBQUw7QUFDSUEsUUFBQUEsTUFBTSxHQUFHLEdBQVQ7QUFDSjs7QUFDQSxXQUFLLEVBQUw7QUFDSUEsUUFBQUEsTUFBTSxHQUFHLEdBQVQ7QUFDSjs7QUFDQSxXQUFLLEVBQUw7QUFDSUEsUUFBQUEsTUFBTSxHQUFHLEdBQVQ7QUFDSjs7QUFDQSxXQUFLLEVBQUw7QUFDSUEsUUFBQUEsTUFBTSxHQUFHLEdBQVQ7QUFDSjtBQWxCSjs7QUFvQkFELElBQUFBLFNBQVMsQ0FBQ0UsU0FBVixDQUFvQm5LLEVBQUUsQ0FBQ29LLFFBQUgsQ0FBWXBLLEVBQUUsQ0FBQ3FLLFFBQUgsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLENBQVosRUFDaEJySyxFQUFFLENBQUNxSyxRQUFILENBQVksR0FBWixFQUFpQixNQUFNSCxNQUF2QixFQUErQkksTUFBL0IsQ0FBc0N0SyxFQUFFLENBQUN1SyxPQUFILENBQVcsQ0FBWCxDQUF0QyxDQURnQixFQUVoQnZLLEVBQUUsQ0FBQ3dLLFNBQUgsQ0FBYSxDQUFiLENBRmdCLEVBR2hCeEssRUFBRSxDQUFDeUssUUFBSCxDQUFZLFlBQUk7QUFDWixNQUFBLE1BQUksQ0FBQzVILEtBQUwsQ0FBV3NDLE9BQVgsQ0FBbUIsQ0FBbkI7O0FBQ0EsTUFBQSxNQUFJLENBQUN2RCxVQUFMLENBQWdCc0QsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxNQUFBLE1BQUksQ0FBQ3JELGdCQUFMLENBQXNCcUQsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxNQUFBLE1BQUksQ0FBQ3JELGdCQUFMLENBQXNCNkksT0FBdEIsR0FBZ0MsQ0FBaEM7O0FBQ0EsTUFBQSxNQUFJLENBQUM3SSxnQkFBTCxDQUFzQnNJLFNBQXRCLENBQWdDbkssRUFBRSxDQUFDb0ssUUFBSCxDQUFZcEssRUFBRSxDQUFDMkssTUFBSCxDQUFVLEdBQVYsQ0FBWixFQUE0QjNLLEVBQUUsQ0FBQ3dLLFNBQUgsQ0FBYSxDQUFiLENBQTVCLEVBQTZDeEssRUFBRSxDQUFDeUssUUFBSCxDQUFZLFlBQUk7QUFDekYsUUFBQSxNQUFJLENBQUM1SSxnQkFBTCxDQUFzQnFELE1BQXRCLEdBQStCLEtBQS9CO0FBQ0gsT0FGNEUsQ0FBN0MsQ0FBaEM7O0FBR0EsTUFBQSxNQUFJLENBQUN4RSxXQUFMLENBQWlCcUQsTUFBakIsR0FBMEIsQ0FBQyxNQUFJLENBQUM0QyxnQkFBTCxHQUF3QixHQUF6QixFQUE4Qm5DLE9BQTlCLENBQXNDLENBQXRDLENBQTFCO0FBQ0EsTUFBQSxNQUFJLENBQUMxRCxVQUFMLENBQWdCaUQsTUFBaEIsR0FBeUIsQ0FBQyxNQUFJLENBQUNYLFVBQUwsR0FBa0IsR0FBbkIsRUFBd0JvQixPQUF4QixDQUFnQyxDQUFoQyxDQUF6QjtBQUNBLE1BQUEsTUFBSSxDQUFDM0MsZ0JBQUwsQ0FBc0JnRyxjQUF0QixDQUFxQyxRQUFyQyxFQUErQ2pGLFlBQS9DLENBQTRENUMsRUFBRSxDQUFDUyxLQUEvRCxFQUFzRXNELE1BQXRFLEdBQStFLE1BQU0sTUFBSSxDQUFDWixVQUExRjtBQUNILEtBWEQsQ0FIZ0IsQ0FBcEI7QUFnQkgsR0Foa0JJO0FBa2tCTHlILEVBQUFBLFdBbGtCSyx1QkFra0JPbEcsS0Fsa0JQLEVBa2tCY0MsSUFsa0JkLEVBa2tCb0I7QUFBQTs7QUFDckIsUUFBSSxLQUFLNEIsV0FBTCxHQUFtQixDQUF2QixFQUEwQjtBQUN0QixVQUFJc0UsR0FBRyxHQUFHLEtBQUtDLFNBQUwsQ0FBZUMsSUFBekI7QUFDQSxXQUFLRCxTQUFMLENBQWVFLEdBQWYsQ0FBbUJyRyxJQUFuQjs7QUFDQSxVQUFJa0csR0FBRyxJQUFJLEtBQUtDLFNBQUwsQ0FBZUMsSUFBMUIsRUFBZ0M7QUFDNUI7QUFDSDs7QUFDRCxVQUFJRSxTQUFTLEdBQUcsS0FBS3JKLFVBQUwsQ0FBZ0J5RCxRQUFoQztBQUNBLFdBQUtrQixXQUFMO0FBQ0EsVUFBSXFDLEtBQUssR0FBRyxLQUFLMUYsYUFBTCxDQUFtQixLQUFLcUQsV0FBeEIsQ0FBWjtBQUNBLFVBQUkyRSxRQUFRLEdBQUc7QUFDWCxZQUFJLHVCQURPO0FBRVgsYUFBSyx3QkFGTTtBQUdYLGNBQU07QUFISyxPQUFmO0FBS0FsTCxNQUFBQSxFQUFFLENBQUN3SSxHQUFILENBQU8sV0FBV0ksS0FBbEI7QUFDQSxVQUFJdUMsRUFBRSxHQUFHRixTQUFTLENBQUN0RyxJQUFELENBQVQsQ0FBZ0JrRCxjQUFoQixDQUErQnFELFFBQVEsQ0FBQ3RDLEtBQUQsQ0FBdkMsQ0FBVDtBQUNBLFdBQUs3RCxZQUFMLENBQWtCLFlBQU07QUFDcEIsWUFBSW9HLEVBQUosRUFBUTtBQUNKQSxVQUFBQSxFQUFFLENBQUNqRyxNQUFILEdBQVksSUFBWjtBQUNBaUcsVUFBQUEsRUFBRSxDQUFDdkksWUFBSCxDQUFnQjVDLEVBQUUsQ0FBQ2lCLFNBQW5CLEVBQThCNkQsSUFBOUI7QUFDSDtBQUNKLE9BTEQsRUFLRyxHQUxIOztBQU1BLFVBQUksS0FBS3lCLFdBQUwsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDdkIsYUFBS3hCLFlBQUwsQ0FBa0IsWUFBTTtBQUNwQixVQUFBLE1BQUksQ0FBQ2xELGdCQUFMLENBQXNCcUQsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxVQUFBLE1BQUksQ0FBQ3hFLFdBQUwsQ0FBaUJxRCxNQUFqQixHQUEwQixDQUFDLE1BQUksQ0FBQzRDLGdCQUFMLEdBQXdCLEdBQXpCLEVBQThCbkMsT0FBOUIsQ0FBc0MsQ0FBdEMsQ0FBMUI7QUFDQSxVQUFBLE1BQUksQ0FBQzFELFVBQUwsQ0FBZ0JpRCxNQUFoQixHQUF5QixDQUFDLE1BQUksQ0FBQ1gsVUFBTCxHQUFrQixHQUFuQixFQUF3Qm9CLE9BQXhCLENBQWdDLENBQWhDLENBQXpCO0FBQ0EsVUFBQSxNQUFJLENBQUMzQyxnQkFBTCxDQUFzQmdHLGNBQXRCLENBQXFDLE1BQXJDLEVBQTZDakYsWUFBN0MsQ0FBMEQ1QyxFQUFFLENBQUNTLEtBQTdELEVBQW9Fc0QsTUFBcEUsR0FBNkUsQ0FBQyxNQUFJLENBQUNYLFVBQUwsR0FBa0IsR0FBbkIsRUFBd0JvQixPQUF4QixDQUFnQyxDQUFoQyxDQUE3RTtBQUNBLGNBQUk0RyxFQUFFLEdBQUcsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEdBQVQsRUFBYyxJQUFkLENBQVQ7O0FBQ0EsZUFBSyxJQUFJOUYsQ0FBVCxJQUFjOEYsRUFBZCxFQUFrQjtBQUNkLFlBQUEsTUFBSSxDQUFDdkosZ0JBQUwsQ0FBc0JnRyxjQUF0QixDQUFxQyxLQUFLdUQsRUFBRSxDQUFDOUYsQ0FBRCxDQUE1QyxFQUFpREosTUFBakQsR0FBMEQsTUFBSSxDQUFDL0IsVUFBTCxJQUFtQmlJLEVBQUUsQ0FBQzlGLENBQUQsQ0FBL0U7QUFDSDs7QUFDRCxVQUFBLE1BQUksQ0FBQ2pDLFNBQUwsR0FBaUIsS0FBakI7QUFDSCxTQVZELEVBVUcsQ0FWSDtBQVdIO0FBQ0o7QUFDSjtBQXZtQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMi41OyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI1OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aSn5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5SZXN1bHRBbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnYmlnV2lu5Lit5aWWJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5ri45oiP6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgICAgIGZyZWVCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbog4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUJlZ2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+W8gOWni+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlRW5kTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e7k+adn+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVRpbWVzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluaYvuekuuiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdoicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscE51bToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaLlj6/lj5jms6jmlbAnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGF1ZGlvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflo7Dpn7PmjInpkq4nLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5uZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdZUFQyTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdZUFQyQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVXNlckZhY2Uuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxibFVzZXJOYW1lLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBocikge1xyXG4gICAgICAgICAgICAgICAgaHJbaV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoUlVMRUxJU1RbaV0gKiBCRVRbdGhpcy5iZXRdKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxibENvaW5MaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQ29pbkxpc3RbaV0uc3RyaW5nID0gKFRPUEJFVFtpXSAqICh0aGlzLmJldCArIDEpICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy51c2Vyc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fY2FyZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQ29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdENvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LnVzZXJfc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEJpZ1dpbigpO1xyXG4gICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheVdpbkFuaW0oKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLCBdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJ3aW5fY25cIixmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzBcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0gKjEwMCkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiYW5pbWF0aW9uMVwiLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzb2VBbmltKGkgJSA1LCBwYXJzZUludChpIC8gNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhIWxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSk7Ly/kv67mlLlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpLCB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmZNdWx0aXBsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMsIGxpc3QubGVuZ3RoLCAwLjAxKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wRnJlZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLmZyZWVUaW1lcyA9PSAwICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGhhc1dpbkJvb2wgPiAwID8gaGFzV2luQm9vbCAqIDMgOiAyKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwyKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCl7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA+PSB0aGlzLnJvbGVQYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm9sbERhdGEobGlzdCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoYFxyXG4gICAgICAgICAgICDmnI3liqHlmajojrflj5bnmoToirHoibLnp43nsbvlpKfkuo7njrDmnInnmoToirHoibLnp43nsbvvvIHvvIHvvIFcclxuICAgICAgICAgICAg6K+36IGU57O75pyN5Yqh5Zmo5Lq65ZGY6L+b6KGM5pWw5o2u6LCD5pW077yBYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpbmVbaSAlIDVdWzIgLSBwYXJzZUludChpIC8gNSldID0gbGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdGFydFJvbGwoLi4ubGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNoaW5lKCkge1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUm9sbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCsrO1xyXG4gICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdsb3R0ZXJ5JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsIF1cclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRCaWdXaW4oKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgIC8vIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICAvLyB0aGlzLkJpZ1dpblNldCA9IG5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19ib251c193aGVlbFwiKS5nZXRDaGlsZEJ5TmFtZShcInNsb3RzX2JvbnVzX3doZWVsX211dGlcIikucm90YXRpb24gPSAwO1xyXG4gICAgICAgIC8vIGxldCBwciA9IHRoaXMuYmlnV2luTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAvLyBmb3IgKGxldCBpIGluIHByKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBwcjEgPSBwcltpXS5jaGlsZHJlbjtcclxuICAgICAgICAvLyAgICAgZm9yIChsZXQgaiBpbiBwcjEpIHtcclxuICAgICAgICAvLyAgICAgICAgIHByMVtqXS5hY3RpdmUgPSBqID09IDA7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJpZ1dpbkJlZ2luKGV2ZW50LCBjdXN0b21lbnREYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmlnV2luQm9vID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdGVtcFdoZWVsID0gdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwic2xvdHNfYm9udXNfd2hlZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbG90c19ib251c193aGVlbF9tdXRpXCIpO1xyXG4gICAgICAgIGxldCB0ZW1wRHUgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5iaWdXaW5DYXJkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRlbXBEdSA9IDEyMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRlbXBEdSA9IDYwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGVtcER1ID0gMTgwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgIHRlbXBEdSA9IDI0MDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHUgPSAzMDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDUwOlxyXG4gICAgICAgICAgICAgICAgdGVtcER1ID0gMzYwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcFdoZWVsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5yb3RhdGVCeSgwLjUsIDM2MCksXHJcbiAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KDIuNSwgMzYwICsgdGVtcER1KS5lYXNpbmcoY2MuZWFzZU91dCg1KSksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlSW4oMC41KSwgY2MuZGVsYXlUaW1lKDEpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5nZXRDaGlsZEJ5TmFtZSgnYmVpc2h1JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIHRoaXMuYmlnV2luQ2FyZDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH0sXHJcblxyXG4gICAgYmlnV2luQ2xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy5iaWdXaW5UaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG51bSA9IHRoaXMuQmlnV2luU2V0LnNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuQmlnV2luU2V0LmFkZChhcmdzKTtcclxuICAgICAgICAgICAgaWYgKG51bSA9PSB0aGlzLkJpZ1dpblNldC5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdpbk5vZGVQciA9IHRoaXMuYmlnV2luTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5UaW1lcy0tO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmJpZ1dpblJlc0xpc3RbdGhpcy5iaWdXaW5UaW1lc107XHJcbiAgICAgICAgICAgIGxldCBuYW1lTGlzdCA9IHtcclxuICAgICAgICAgICAgICAgIDEwOiAnc19ib251c19kaWFtb25kX21pbm9yJyxcclxuICAgICAgICAgICAgICAgIDEwMDogJ3NfYm9udXNfZGlhbW9uZF9tZWRpdW0nLFxyXG4gICAgICAgICAgICAgICAgMTAwMDogJ3NfYm9udXNfZGlhbW9uZF9tZWdhJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImluZGV4OlwiICsgaW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgbmQgPSB3aW5Ob2RlUHJbYXJnc10uZ2V0Q2hpbGRCeU5hbWUobmFtZUxpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBuZC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmdldENoaWxkQnlOYW1lKCdjb2luJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsdCA9IFsxMCwgMzAsIDEwMCwgMTAwMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJycgKyBsdFtpXSkuYWN0aXZlID0gdGhpcy5iaWdXaW5DYXJkID09IGx0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTsiXX0=