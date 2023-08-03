
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_CaishenFafafa/js/CSFFFMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6463f5+O4RBMZLSfLfixAHc', 'CSFFFMain');
// Texture/Slot_CaishenFafafa/js/CSFFFMain.js

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
    this.net = this.node.getComponent('CSFFFNetwork');
    this.audio = this.node.getComponent('CSFFFAudio');
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
    var _this6 = this;

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
          _this6.bigWinResultAnim.active = true;
          _this6.lblUserCoin.string = (_this6.bigWinResultCoin / 100).toFixed(2);
          _this6.lblWinCoin.string = (_this6.bigWinCoin / 100).toFixed(2);
          _this6.bigWinResultAnim.getChildByName('coin').getComponent(cc.Label).string = (_this6.bigWinCoin / 100).toFixed(2);
          var lt = [10, 30, 100, 1000];

          for (var i in lt) {
            _this6.bigWinResultAnim.getChildByName('' + lt[i]).active = _this6.bigWinCard == lt[i];
          }

          _this6.bigWinBoo = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9DYWlzaGVuRmFmYWZhXFxqc1xcQ1NGRkZNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiUlVMRUxJU1QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNwVXNlckZhY2UiLCJ0eXBlIiwiU3ByaXRlIiwiZGlzcGxheU5hbWUiLCJsYmxVc2VyTmFtZSIsIkxhYmVsIiwibGJsVXNlckNvaW4iLCJsYmxCZXQiLCJsYmxMaW5lcyIsImxibEN1ckJldCIsImxibFdpbkNvaW4iLCJsYmxDb2luTGlzdCIsInJvbGxCdG5BbmltIiwiQW5pbWF0aW9uIiwicm9sZVBiIiwiUHJlZmFiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsImVmZmVjdEFuaW1QciIsIk5vZGUiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsImJpZ1dpbk5vZGUiLCJiaWdXaW5SZXN1bHRBbmltIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYXVkaW9CdG4iLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJiZXQiLCJhdXRvIiwic3RhdHVzIiwiYmlnV2luUmVzTGlzdCIsImJpZ1dpbkNhcmQiLCJiaWdXaW5Db2luIiwiYmlnV2luQm9vIiwiZnJlZVRpbWVzIiwicm9sbFJlc3VsdCIsInJvbGxJbmRleCIsImxvdHRlcnlSZXMiLCJzdG9wRnJlZSIsImZyZWVHYW1lQ29pbiIsImJJc0ZyZWVHYW1lIiwiZGVsYXlDbGljayIsImNob29zZUluZGV4IiwiZ2V0Q2hpbGRCeU5hbWUiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiX29uVG91Y2hTdGFydCIsIlRPVUNIX0VORCIsIl9vblRvdWNoRW5kIiwiVE9VQ0hfTU9WRSIsIl9vblRvdWNoTW92ZSIsIlRPVUNIX0NBTkNFTCIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwic2VuZFJvbGwiLCJwbGF5Iiwic2NoZWR1bGVPbmNlIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwiYWN0aXZlIiwicGxheUJnbSIsImhyIiwiY2hpbGRyZW4iLCJpIiwic29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJzdG9wQXVkaW8iLCJzdGF0ZUNhbGxCYWNrIiwic3QiLCJySW5kZXgiLCJ1c2Vyc2NvcmUiLCJ3aW5zY29yZSIsInBsYXlXaW5BbmltIiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsIm5GcmVlVGltZSIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwiY2hvb3NlV2lsZFN0YXJ0IiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJhZGRjb2luIiwic2NoZWR1bGUiLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwibW92ZVRvIiwidjIiLCJyZXBlYXRGb3JldmVyIiwicG9zIiwidG91Y2giLCJnZXRMb2NhdGlvbiIsIngiLCJ3aW5TaXplIiwid2lkdGgiLCJ5IiwiaGVpZ2h0Iiwic2V0UG9zaXRpb24iLCJuYW1lIiwiTWF0aCIsImFicyIsImdldFBvc2l0aW9uIiwiYmVpc2h1QXJyYXkiLCJiZWlzaHVTaG93IiwiY2hvb3NlTG9jYXRpb24iLCJ3aWxkSW5kZXgiLCJzZW5kRnJlZSIsInN0YXJ0QmlnV2luIiwiQmlnV2luU2V0IiwiU2V0IiwicHIiLCJwcjEiLCJiaWdXaW5DbGljayIsImJpZ1dpblRpbWVzIiwibnVtIiwic2l6ZSIsImFkZCIsIndpbk5vZGVQciIsIm5hbWVMaXN0IiwibmQiLCJiaWdXaW5SZXN1bHRDb2luIiwibHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsTUFBTSxHQUFHLEdBQWYsRUFBb0I7O0FBQ3BCLElBQU1DLEtBQUssR0FBRyxFQUFkLEVBQWtCOztBQUNsQixJQUFNQyxNQUFNLEdBQUcsQ0FBQyxFQUFELEVBQUssSUFBTCxFQUFXLEdBQVgsRUFBZ0IsRUFBaEIsQ0FBZjtBQUNBLElBQU1DLEdBQUcsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLEVBQTVCLENBQVo7QUFDQSxJQUFNQyxRQUFRLEdBQUcsQ0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEdBQVQs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ckcsQ0FBRCxDQUE1QyxFQUFpREosTUFBakQsR0FBMEQsTUFBSSxDQUFDMUMsVUFBTCxJQUFtQm1KLEVBQUUsQ0FBQ3JHLENBQUQsQ0FBL0U7QUFDSDs7QUFDRCxVQUFBLE1BQUksQ0FBQzVDLFNBQUwsR0FBaUIsS0FBakI7QUFDSCxTQVZELEVBVUcsQ0FWSDtBQVdIO0FBQ0o7QUFDSjtBQWhvQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMi41OyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI1OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BVc2VyRmFjZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35aS05YOPJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WQjScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WNleazqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGxCdG5BbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdyb2xs5oyJ6ZKu5Yqo55S7JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aSn5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5SZXN1bHRBbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnYmlnV2lu5Lit5aWWJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5ri45oiP6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgICAgIGZyZWVCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbog4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUJlZ2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+W8gOWni+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlRW5kTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e7k+adn+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVRpbWVzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluaYvuekuuiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdoicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscE51bToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaLlj6/lj5jms6jmlbAnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGF1ZGlvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflo7Dpn7PmjInpkq4nLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5uZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdDU0ZGRk5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnQ1NGRkZBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3VjaE5vZGVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3VjaE5vZGVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5nZXRDaGlsZEJ5TmFtZShcInRvdWNoTm9kZVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3VjaE5vZGVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSBMSU5FUztcclxuICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gJzAuMDAnO1xyXG4gICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMucGxheWVySW5mby5wbGF5ZXJIZWFkSWQsIHNwID0+IHtcclxuICAgICAgICAgICAgLy8gdGhpcy5zcFVzZXJGYWNlLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyTmFtZS5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxub25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzID09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGxCdG5BbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2hlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBocikge1xyXG4gICAgICAgICAgICAgICAgaHJbaV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoUlVMRUxJU1RbaV0gKiBCRVRbdGhpcy5iZXRdKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUhlbHAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnZXhpdEdhbWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxibENvaW5MaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQ29pbkxpc3RbaV0uc3RyaW5nID0gKFRPUEJFVFtpXSAqICh0aGlzLmJldCArIDEpICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy51c2Vyc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmJGbGFnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkJvbyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ2FyZCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fY2FyZDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW47XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc3VsdENvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LnVzZXJfc2NvcmU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEJpZ1dpbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlV2lsZFN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2luQW5pbSgpIHtcclxuICAgICAgICAvL+WKqOeUu+e7k+adn+WQjuiHquWKqHJvbGxcclxuICAgICAgICBsZXQgaGFzV2luQm9vbCA9IDA7XHJcbiAgICAgICAgbGV0IGFsbExpbmUgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsIF0gOiBbYWxsTGluZSwgLi4ubGluZXNdO1xyXG4gICAgICAgIGhhc1dpbkJvb2wgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGhhc1dpbkJvb2wgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oGt5Zac5a2X5qC35Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIndpbl9jblwiLGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMFxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqMTAwKSB7IC8v5aaC5p6c5aSn5LqOMTAw5YCN6LWM5rOo77yM5bCx5pKt5pS+YmlnRnVsbOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJhbmltYXRpb24xXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTsvL+S/ruaUuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSksIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZk11bHRpcGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuZnJlZVRpbWVzID09IDAgJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaGFzV2luQm9vbCA+IDAgPyBoYXNXaW5Cb29sICogMyA6IDIpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICBzdGFydEZyZWVHYW1lKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRGcmVlR2FtZVwiKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIix0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sMik7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3Qpe1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSA1XVsyIC0gcGFyc2VJbnQoaSAvIDUpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgYmV0OiB0aGlzLmJldCxcclxuICAgICAgICAgICAgbkJldExpc3Q6IFtCRVRbdGhpcy5iZXRdICogQkVUTlVNICogMTAwLCBdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZVdpbGRTdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYWlzaGVuZmFuZ3dlaVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwiY2Fpc2hlbmZhbmd3ZWlcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJSZWVsXCIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5nZXRDaGlsZEJ5TmFtZShcImNhaXNoZW5mYW5nd2VpXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDIuNSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29tX3RpYW5qaWFuZ2NhaXNoZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJTbG90c19mc19oYW5kXCIpLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMiwgY2MudjIoMzg2LCA0NykpLCBjYy5tb3ZlVG8oMC4wMSwgY2MudjIoNTUyLCA0NykpKS5yZXBlYXRGb3JldmVyKCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaFN0YXJ0IChldmVudCkge1xyXG4gICAgICAgIGxldCBwb3MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHBvcy54IC09IGNjLndpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgIHBvcy55IC09IGNjLndpblNpemUuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5nZXRDaGlsZEJ5TmFtZShcIm1vdmVOb2RlXCIpLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICB9LFxyXG4gICAgX29uVG91Y2hNb3ZlIChldmVudCkge1xyXG4gICAgICAgIGxldCBwb3MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHBvcy54IC09IGNjLndpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgIHBvcy55IC09IGNjLndpblNpemUuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5nZXRDaGlsZEJ5TmFtZShcIm1vdmVOb2RlXCIpLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICB9LFxyXG4gICAgX29uVG91Y2hFbmQgKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgcG9zLnggLT0gY2Mud2luU2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgcG9zLnkgLT0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwiZ2V6aGlcIikuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IG5hbWUgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHBvcy54IC0gY2hpbGRyZW5baV0ueCkgPD0gNzkgJiYgTWF0aC5hYnMocG9zLnkgLSBjaGlsZHJlbltpXS55KSA8PSA3Mi41KSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gY2hpbGRyZW5baV0ubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwibW92ZU5vZGVcIikuc2V0UG9zaXRpb24oY2hpbGRyZW5baV0uZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PSBjaGlsZHJlbi5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gY2hpbGRyZW5baV0ubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwibW92ZU5vZGVcIikuc2V0UG9zaXRpb24oY2hpbGRyZW5baV0uZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJlaXNodUFycmF5ID0gW1tdLCBbMSwgMSwgMiwgMiwgM10sIFsxLCAyLCAyLCAyLCAzXSwgWzIsIDIsIDMsIDMsIDVdLCBbMiwgMywgMywgNSwgMTBdXTtcclxuICAgICAgICB0aGlzLmNob29zZUluZGV4ID0gcGFyc2VJbnQobmFtZSk7XHJcbiAgICAgICAgbGV0IGJlaXNodVNob3cgPSBbMSwgMSwgMiwgMiwgM107XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvb3NlSW5kZXggPT0gMSB8fCB0aGlzLmNob29zZUluZGV4ID09IDYgfHwgdGhpcy5jaG9vc2VJbmRleCA9PSAxMSkge1xyXG4gICAgICAgICAgICBiZWlzaHVTaG93ID0gYmVpc2h1QXJyYXlbMV07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNob29zZUluZGV4ID09IDIgfHwgdGhpcy5jaG9vc2VJbmRleCA9PSA3IHx8IHRoaXMuY2hvb3NlSW5kZXggPT0gMTIpIHtcclxuICAgICAgICAgICAgYmVpc2h1U2hvdyA9IGJlaXNodUFycmF5WzJdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jaG9vc2VJbmRleCA9PSAzIHx8IHRoaXMuY2hvb3NlSW5kZXggPT0gOCB8fCB0aGlzLmNob29zZUluZGV4ID09IDEzKSB7XHJcbiAgICAgICAgICAgIGJlaXNodVNob3cgPSBiZWlzaHVBcnJheVszXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hvb3NlSW5kZXggPT0gNCB8fCB0aGlzLmNob29zZUluZGV4ID09IDkgfHwgdGhpcy5jaG9vc2VJbmRleCA9PSAxNCkge1xyXG4gICAgICAgICAgICBiZWlzaHVTaG93ID0gYmVpc2h1QXJyYXlbNF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbV90aWFuamlhbmdjYWlzaGVuXCIpLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIiArIGkpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHVTaG93W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hvb3NlTG9jYXRpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdjaG9vc2VMb2NhdGlvbicsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgd2lsZEluZGV4OiB0aGlzLmNob29zZUluZGV4LFxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/pgInmi6nlkI7lvIDlp4vlhY3otLlcclxuICAgIHNlbmRGcmVlKCkge1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSgnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fdGlhbmppYW5nY2Fpc2hlblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRCaWdXaW4oKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICB0aGlzLkJpZ1dpblNldCA9IG5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcHIgPSB0aGlzLmJpZ1dpbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBwcikge1xyXG4gICAgICAgICAgICBsZXQgcHIxID0gcHJbaV0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogaW4gcHIxKSB7XHJcbiAgICAgICAgICAgICAgICBwcjFbal0uYWN0aXZlID0gaiA9PSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBiaWdXaW5DbGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gdGhpcy5CaWdXaW5TZXQuc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5CaWdXaW5TZXQuYWRkKGFyZ3MpO1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHRoaXMuQmlnV2luU2V0LnNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2luTm9kZVByID0gdGhpcy5iaWdXaW5Ob2RlLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblRpbWVzLS07XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuYmlnV2luUmVzTGlzdFt0aGlzLmJpZ1dpblRpbWVzXTtcclxuICAgICAgICAgICAgbGV0IG5hbWVMaXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgMTA6ICdzX2JvbnVzX1NIMDBGX21pbm9yJyxcclxuICAgICAgICAgICAgICAgIDEwMDogJ3NfYm9udXNfU0gwMEZfbWVkaXVtJyxcclxuICAgICAgICAgICAgICAgIDEwMDA6ICdzX2JvbnVzX1NIMDBGX21lZ2EnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5kID0gd2luTm9kZVByW2FyZ3NdLmdldENoaWxkQnlOYW1lKG5hbWVMaXN0W2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5kLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBuZC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmdldENoaWxkQnlOYW1lKCdjb2luJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsdCA9IFsxMCwgMzAsIDEwMCwgMTAwMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJycgKyBsdFtpXSkuYWN0aXZlID0gdGhpcy5iaWdXaW5DYXJkID09IGx0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTsiXX0=