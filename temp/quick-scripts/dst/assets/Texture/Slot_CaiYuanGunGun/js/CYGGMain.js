
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_CaiYuanGunGun/js/CYGGMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3e09fQDKqRH45YXiS4kidQt', 'CYGGMain');
// Texture/Slot_CaiYuanGunGun/js/CYGGMain.js

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
    this.net = this.node.getComponent('CYGGNetwork');
    this.audio = this.node.getComponent('CYGGAudio');
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
    this.chooseIndex = 1;
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("touchNode").on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("touchNode").on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("touchNode").on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("touchNode").on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
  },
  start: function start() {
    this.lblLines.string = LINES;
    this.lblWinCoin.string = '0.00';
    this.setBet();
    Helper.loadHead(this.playerInfo.playerHeadId, function (sp) {// this.spUserFace.spriteFrame = sp;
    });
    this.lblUserName.string = this.playerInfo.playerName;
    this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
  },
  onCLick: function onCLick(event, args) {
    var _this = this;

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
            _this.delayClick = false;
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
          this.scheduleOnce(function () {
            _this2.freeBeginNode.active = true;
          }, 2);
          this.scheduleOnce(function () {
            _this2.freeBeginNode.active = false;
            _this2.node.getChildByName("com_tianjiangcaishen").active = true;

            _this2.closeShine();

            _this2.startFreeGame();

            _this2.chooseWildStart();
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
  },
  stopFreeTimes: function stopFreeTimes() {
    var _this4 = this;

    console.log("stopFreeTimes freeGameCoin : ", this.freeGameCoin);
    this.audio.playBgm(0);
    this.auto = false;

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = true;
    }

    for (var _i2 in this.wheelList) {
      this.wheelList[_i2].initWheel();
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

    for (var _i3 in list) {
      line[_i3 % 5][2 - parseInt(_i3 / 5)] = list[_i3];
    }

    for (var _i4 in this.wheelList) {
      var _this$wheelList$_i;

      (_this$wheelList$_i = this.wheelList[_i4]).startRoll.apply(_this$wheelList$_i, line[_i4]);
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
  chooseWildStart: function chooseWildStart() {
    var _this5 = this;

    this.node.getChildByName("com_tianjiangcaishen").getChildByName("caishenfangwei").active = true;
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("caishenfangwei").getComponent(sp.Skeleton).setAnimation(0, "Reel", false);
    this.scheduleOnce(function () {
      _this5.node.getChildByName("com_tianjiangcaishen").getChildByName("caishenfangwei").active = false;
    }, 2.5);
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("Slots_fs_hand").runAction(cc.sequence(cc.moveTo(2, cc.v2(386, 47)), cc.moveTo(0.01, cc.v2(552, 47))).repeatForever());
  },
  _onTouchStart: function _onTouchStart(event) {
    var pos = event.touch.getLocation();
    pos.x -= cc.winSize.width / 2;
    pos.y -= cc.winSize.height / 2;
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("moveNode").setPosition(pos);
  },
  _onTouchMove: function _onTouchMove(event) {
    var pos = event.touch.getLocation();
    pos.x -= cc.winSize.width / 2;
    pos.y -= cc.winSize.height / 2;
    this.node.getChildByName("com_tianjiangcaishen").getChildByName("moveNode").setPosition(pos);
  },
  _onTouchEnd: function _onTouchEnd(event) {
    var pos = event.touch.getLocation();
    pos.x -= cc.winSize.width / 2;
    pos.y -= cc.winSize.height / 2;
    var children = this.node.getChildByName("com_tianjiangcaishen").getChildByName("gezhi").children;
    var name = 1;

    for (var i = 0; i < children.length; i++) {
      if (Math.abs(pos.x - children[i].x) <= 79 && Math.abs(pos.y - children[i].y) <= 72.5) {
        name = children[i].name;
        this.node.getChildByName("com_tianjiangcaishen").getChildByName("moveNode").setPosition(children[i].getPosition());
        break;
      }

      if (i == children.length - 1) {
        name = children[i].name;
        this.node.getChildByName("com_tianjiangcaishen").getChildByName("moveNode").setPosition(children[i].getPosition());
      }
    }

    var beishuArray = [[], [1, 1, 2, 2, 3], [1, 2, 2, 2, 3], [2, 2, 3, 3, 5], [2, 3, 3, 5, 10]];
    this.chooseIndex = parseInt(name);
    var beishuShow = [1, 1, 2, 2, 3];

    if (this.chooseIndex == 1 || this.chooseIndex == 6 || this.chooseIndex == 11) {
      beishuShow = beishuArray[1];
    } else if (this.chooseIndex == 2 || this.chooseIndex == 7 || this.chooseIndex == 12) {
      beishuShow = beishuArray[2];
    } else if (this.chooseIndex == 3 || this.chooseIndex == 8 || this.chooseIndex == 13) {
      beishuShow = beishuArray[3];
    } else if (this.chooseIndex == 4 || this.chooseIndex == 9 || this.chooseIndex == 14) {
      beishuShow = beishuArray[4];
    }

    for (var _i5 = 0; _i5 < 5; _i5++) {
      this.node.getChildByName("com_tianjiangcaishen").getChildByName("label" + _i5).getComponent(cc.Label).string = "x" + beishuShow[_i5];
    }
  },
  chooseLocation: function chooseLocation() {
    this.net.socket.emit('chooseLocation', JSON.stringify({
      wildIndex: this.chooseIndex
    }));
  },
  //选择后开始免费
  sendFree: function sendFree() {
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame('btn_zidong');

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i6 in this.wheelList) {
      this.wheelList[_i6].initWheel();
    }

    this.node.getChildByName("com_tianjiangcaishen").active = false;
    this.freeBeginNode.active = false;
    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
    this.auto = true;
    this.sendRoll();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9DYWlZdWFuR3VuR3VuXFxqc1xcQ1lHR01haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiZWZmZWN0QW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYXVkaW9CdG4iLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJiZXQiLCJhdXRvIiwic3RhdHVzIiwiYmlnV2luUmVzTGlzdCIsImJpZ1dpbkNhcmQiLCJiaWdXaW5Db2luIiwiYmlnV2luQm9vIiwiZnJlZVRpbWVzIiwicm9sbFJlc3VsdCIsInJvbGxJbmRleCIsImxvdHRlcnlSZXMiLCJzdG9wRnJlZSIsImZyZWVHYW1lQ29pbiIsImJJc0ZyZWVHYW1lIiwiZGVsYXlDbGljayIsImNob29zZUluZGV4IiwiZ2V0Q2hpbGRCeU5hbWUiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiX29uVG91Y2hTdGFydCIsIlRPVUNIX0VORCIsIl9vblRvdWNoRW5kIiwiVE9VQ0hfTU9WRSIsIl9vblRvdWNoTW92ZSIsIlRPVUNIX0NBTkNFTCIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwic2VuZFJvbGwiLCJwbGF5Iiwic2NoZWR1bGVPbmNlIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwicGxheUJnbSIsImFjdGl2ZSIsImhyIiwiY2hpbGRyZW4iLCJpIiwic29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJzdG9wQXVkaW8iLCJzdGF0ZUNhbGxCYWNrIiwic3QiLCJySW5kZXgiLCJ1c2Vyc2NvcmUiLCJ3aW5zY29yZSIsInBsYXlXaW5BbmltIiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsIm5GcmVlVGltZSIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwiY2hvb3NlV2lsZFN0YXJ0IiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwibW92ZVRvIiwidjIiLCJyZXBlYXRGb3JldmVyIiwicG9zIiwidG91Y2giLCJnZXRMb2NhdGlvbiIsIngiLCJ3aW5TaXplIiwid2lkdGgiLCJ5IiwiaGVpZ2h0Iiwic2V0UG9zaXRpb24iLCJuYW1lIiwiTWF0aCIsImFicyIsImdldFBvc2l0aW9uIiwiYmVpc2h1QXJyYXkiLCJiZWlzaHVTaG93IiwiY2hvb3NlTG9jYXRpb24iLCJ3aWxkSW5kZXgiLCJzZW5kRnJlZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLEVBQWQsRUFBa0I7O0FBQ2xCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0QsRUFBZ0UsR0FBaEUsRUFBcUUsSUFBckUsRUFBMkUsR0FBM0UsRUFBZ0YsR0FBaEYsRUFBcUYsSUFB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Q0FBbUI0RCxNQUFuQixHQUE0QixJQUE1QjtBQUNBLFNBQUs1RCxhQUFMLENBQW1CNkIsY0FBbkIsQ0FBa0MsS0FBbEMsRUFBeUNBLGNBQXpDLENBQXdELFdBQXhELEVBQXFFbkIsWUFBckUsQ0FBa0YxQyxFQUFFLENBQUNTLEtBQXJGLEVBQTRGK0QsTUFBNUYsR0FBcUcsS0FBS3BCLFNBQTFHO0FBQ0EsU0FBS04sSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLd0MsUUFBTDtBQUNIO0FBamtCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCRVROVU0gPSAyLjU7IC8v5Y2V5rOo5YC8XHJcbmNvbnN0IExJTkVTID0gMjU7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNvbnN0IFJVTEVMSVNUID0gWzIsIDAuMiwgMC4xLCAxLCAwLjIsIDAuMSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDMsIDAuNiwgMC4yXTsgLy/op4TliJlcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcFVzZXJGYWNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflpLTlg48nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlck5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35ZCNJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Y2V5rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbEJ0bkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JvbGzmjInpkq7liqjnlLsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuU3ByaXRlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUJpZ0Z1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpKflpZblhajlsY/nibnmlYgnLFxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0NZR0dOZXR3b3JrJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0NZR0dBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3VjaE5vZGVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3VjaE5vZGVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5nZXRDaGlsZEJ5TmFtZShcInRvdWNoTm9kZVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3VjaE5vZGVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSBMSU5FUztcclxuICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gJzAuMDAnO1xyXG4gICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMucGxheWVySW5mby5wbGF5ZXJIZWFkSWQsIHNwID0+IHtcclxuICAgICAgICAgICAgLy8gdGhpcy5zcFVzZXJGYWNlLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyTmFtZS5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxub25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnaGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhyID0gdGhpcy5oZWxwTnVtLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGhyKSB7XHJcbiAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlSGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdleGl0R2FtZScpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID0gIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID8gJ2J0bl9zb3VuZCcgOiAnYnRuX3NvdW5kXzInKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYmlnV2luQm9vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5DYXJkID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9jYXJkO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXJ0QmlnV2luKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LCAyKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9vc2VXaWxkU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSwgXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwid2luX2NuXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfSwgMCwgMzAsIDAuMDEpXHJcbiAgICAgICAgICAgIC8v5Yik5pat5pKt5pS+6YeR5biB5o6J6JC95Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgPiBCRVRbdGhpcy5iZXRdICogQkVUTlVNICoxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcImFuaW1hdGlvbjFcIix0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwyKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCl7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA+PSB0aGlzLnJvbGVQYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm9sbERhdGEobGlzdCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoYFxyXG4gICAgICAgICAgICDmnI3liqHlmajojrflj5bnmoToirHoibLnp43nsbvlpKfkuo7njrDmnInnmoToirHoibLnp43nsbvvvIHvvIHvvIFcclxuICAgICAgICAgICAg6K+36IGU57O75pyN5Yqh5Zmo5Lq65ZGY6L+b6KGM5pWw5o2u6LCD5pW077yBYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpbmVbaSAlIDVdWzIgLSBwYXJzZUludChpIC8gNSldID0gbGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdGFydFJvbGwoLi4ubGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNoaW5lKCkge1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUm9sbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCsrO1xyXG4gICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdsb3R0ZXJ5JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsIF1cclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hvb3NlV2lsZFN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5nZXRDaGlsZEJ5TmFtZShcImNhaXNoZW5mYW5nd2VpXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYWlzaGVuZmFuZ3dlaVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcIlJlZWxcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwiY2Fpc2hlbmZhbmd3ZWlcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMi41KTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5nZXRDaGlsZEJ5TmFtZShcIlNsb3RzX2ZzX2hhbmRcIikucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygyLCBjYy52MigzODYsIDQ3KSksIGNjLm1vdmVUbygwLjAxLCBjYy52Mig1NTIsIDQ3KSkpLnJlcGVhdEZvcmV2ZXIoKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoU3RhcnQgKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgcG9zLnggLT0gY2Mud2luU2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgcG9zLnkgLT0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwibW92ZU5vZGVcIikuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIH0sXHJcbiAgICBfb25Ub3VjaE1vdmUgKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgcG9zLnggLT0gY2Mud2luU2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgcG9zLnkgLT0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwibW92ZU5vZGVcIikuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIH0sXHJcbiAgICBfb25Ub3VjaEVuZCAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgcG9zID0gZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICBwb3MueCAtPSBjYy53aW5TaXplLndpZHRoIC8gMjtcclxuICAgICAgICBwb3MueSAtPSBjYy53aW5TaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJnZXpoaVwiKS5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbmFtZSA9IDE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMocG9zLnggLSBjaGlsZHJlbltpXS54KSA8PSA3OSAmJiBNYXRoLmFicyhwb3MueSAtIGNoaWxkcmVuW2ldLnkpIDw9IDcyLjUpIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBjaGlsZHJlbltpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJtb3ZlTm9kZVwiKS5zZXRQb3NpdGlvbihjaGlsZHJlbltpXS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09IGNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBjaGlsZHJlbltpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJtb3ZlTm9kZVwiKS5zZXRQb3NpdGlvbihjaGlsZHJlbltpXS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmVpc2h1QXJyYXkgPSBbW10sIFsxLCAxLCAyLCAyLCAzXSwgWzEsIDIsIDIsIDIsIDNdLCBbMiwgMiwgMywgMywgNV0sIFsyLCAzLCAzLCA1LCAxMF1dO1xyXG4gICAgICAgIHRoaXMuY2hvb3NlSW5kZXggPSBwYXJzZUludChuYW1lKTtcclxuICAgICAgICBsZXQgYmVpc2h1U2hvdyA9IFsxLCAxLCAyLCAyLCAzXTtcclxuICAgICAgICBpZiAodGhpcy5jaG9vc2VJbmRleCA9PSAxIHx8IHRoaXMuY2hvb3NlSW5kZXggPT0gNiB8fCB0aGlzLmNob29zZUluZGV4ID09IDExKSB7XHJcbiAgICAgICAgICAgIGJlaXNodVNob3cgPSBiZWlzaHVBcnJheVsxXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hvb3NlSW5kZXggPT0gMiB8fCB0aGlzLmNob29zZUluZGV4ID09IDcgfHwgdGhpcy5jaG9vc2VJbmRleCA9PSAxMikge1xyXG4gICAgICAgICAgICBiZWlzaHVTaG93ID0gYmVpc2h1QXJyYXlbMl07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNob29zZUluZGV4ID09IDMgfHwgdGhpcy5jaG9vc2VJbmRleCA9PSA4IHx8IHRoaXMuY2hvb3NlSW5kZXggPT0gMTMpIHtcclxuICAgICAgICAgICAgYmVpc2h1U2hvdyA9IGJlaXNodUFycmF5WzNdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jaG9vc2VJbmRleCA9PSA0IHx8IHRoaXMuY2hvb3NlSW5kZXggPT0gOSB8fCB0aGlzLmNob29zZUluZGV4ID09IDE0KSB7XHJcbiAgICAgICAgICAgIGJlaXNodVNob3cgPSBiZWlzaHVBcnJheVs0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiICsgaSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIGJlaXNodVNob3dbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjaG9vc2VMb2NhdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2Nob29zZUxvY2F0aW9uJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB3aWxkSW5kZXg6IHRoaXMuY2hvb3NlSW5kZXgsXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+mAieaLqeWQjuW8gOWni+WFjei0uVxyXG4gICAgc2VuZEZyZWUoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKCdidG5femlkb25nJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG59KTsiXX0=