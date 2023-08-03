"use strict";
cc._RF.push(module, '73bd3En+pZI9p2tyztnUOED', 'EFMain');
// Texture/Slot_EgyptianTreasures/js/EFMain.js

"use strict";

var BETNUM = 0.2; //单注值

var LINES = 20; //线数

var BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var RULELIST = [10, 6, 0.5, 8, 4, 0.25, 5, 2, 0.2, 4, 1, 0.15, 3, 0.9, 0.15, 2, 0.8, 0.12, 1.5, 0.7, 0.12, 1.5, 0.7, 0.1, 1, 0.6, 0.08, 0.6, 0.5, 0.05, 0.5, 0.4, 0.04]; //规则

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
    //免费次数有关
    freeTimesNode: {
      "default": null,
      type: cc.Node,
      displayName: '免费摇奖显示节点'
    },
    extraNode: {
      "default": null,
      type: cc.Node,
      displayName: '额外旋转显示节点'
    },
    shadowEf: {
      "default": null,
      type: cc.Animation,
      displayName: '沙尘暴'
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
    this.net = this.node.getComponent('EFNetwork');
    this.audio = this.node.getComponent('EFAudio');
    this.wheelList = [];
    this.freeWheelList = [];
    this.bet = 0;
    this.auto = false;
    this.status = 0;
    this.bigWinResList = [3, 1, 2];
    this.bigWinBoo = false;
    this.freeTimes = 0;
    this.rollResult = [];
    this.rollIndex = 0;
    this.lotteryRes = null;
    this.stopFree = false;
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
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree) {
        return;
      }

      this.auto = !this.auto;
      this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');

      if (this.auto && this.status == 0) {
        this.sendRoll();
      }
    } else if (args == 'roll') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree) {
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
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto || this.extraNode.active) {
        return;
      }

      this.bet += 1;
      this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
      this.setBet();
    } else if (args == 'dec') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto || this.extraNode.active) {
        return;
      }

      this.bet -= 1;
      this.bet = this.bet >= 0 ? this.bet : 0;
      this.setBet();
    } else if (args == 'closeResult') {
      this.bigWinResultAnim.active = false;
      this.bigWinBoo = false;
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
        if (this.bigWinBoo) {
          if (this.bigWinResultAnim.active) {
            this.audio.playBgm(2);
          } else {
            this.audio.playBgm(1);
          }
        } else {
          this.audio.playBgm(0);
        }
      }
    }
  },
  setBet: function setBet() {
    this.lblBet.string = (BET[this.bet] * BETNUM).toFixed(2);
    this.lblCurBet.string = (BET[this.bet] * BETNUM).toFixed(2);
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
      this.freeGold += this.lotteryRes.winscore;

      if (rIndex == this.rollIndex) {
        this.playWinAnim();
      }

      this.extraNode.active = this.lotteryRes.viewarray.ADD_Free.bFlag;
      this.extraNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.lotteryRes.viewarray.ADD_Free.nFreeTime;

      if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
        if (this.freeTimes == 0) {
          this.bigWinBoo = true;
          this.auto = false;
          this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.bigWinResList = [].concat(this.lotteryRes.viewarray.getFreeTime.nIndex);
          this.bigWinResList.map(function (currentValue, index, arr) {
            _this2.bigWinResList[index] = ++currentValue;
          });
          this.audio.playFree();
          this.scheduleOnce(function () {
            _this2.closeShine();

            _this2.audio.playFreeWheel();

            _this2.bigWinNode.active = true;

            for (var _i in _this2.freeWheelList) {
              _this2.freeWheelList[_i].startRoll(_this2.bigWinResList[_i]);
            }
          }, 3);
          this.scheduleOnce(function () {
            _this2.bigWinNode.active = false;

            _this2.shadowEf.play();
          }, 9);
          this.scheduleOnce(function () {
            _this2.startFreeGame();
          }, 10);
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
    var animIndex = 0;
    this.schedule(function () {
      if (rIndex == _this3.rollIndex) {
        _this3.closeShine();

        for (var _i2 = 0; _i2 < 15; _i2++) {
          _this3.clsoeAnim(_i2 % 5, parseInt(_i2 / 5));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          _this3.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));
        }

        animIndex++;
      }
    }, 3, list.length, 0.01);
    this.scheduleOnce(function () {
      if (_this3.stopFree) {
        _this3.stopFree = false;

        _this3.stopFreeTimes();

        _this3.closeShine();

        _this3.auto = false;
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
    this.freeGold = 0;

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i3 in this.wheelList) {
      this.wheelList[_i3].initWheel();
    }

    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
    this.auto = true;
    this.sendRoll();
  },
  stopFreeTimes: function stopFreeTimes() {
    this.bigWinResultAnim.active = true;
    var spList = this.bigWinResultAnim.getChildByName('s_egfo_meter_static').children;
    var lbl = this.bigWinResultAnim.getChildByName('goldLable').getComponent(cc.Label);
    lbl.string = (this.freeGold / 100).toFixed(2);
    var showId = 0;

    if (this.freeGold > 1000 && this.freeGold <= 20000) {
      showId = 1;
    } else if (this.freeGold > 20000 && this.freeGold <= 40000) {
      showId = 2;
    } else {
      showId = 3;
    }

    for (var i in spList) {
      spList[i].active = i == showId;
    }

    for (var _i4 in this.freeHideNode) {
      this.freeHideNode[_i4].active = true;
    }

    for (var _i5 in this.wheelList) {
      this.wheelList[_i5].initWheel();
    }

    this.freeTimesNode.active = false;
  },
  //0-5 0-2
  showAnim: function showAnim(cols, index) {
    var length = this.wheelList[cols].roleIdList.length;
    this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation).play();
    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 3 + index].active = true;
    nodeList[cols * 3 + index].getComponent(cc.Animation).play();
  },
  clsoeAnim: function clsoeAnim(cols, index) {
    var length = this.wheelList[cols].roleIdList.length;
    var anim = this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation);
    anim.setCurrentTime(0);
    anim.stop();
    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 3 + index].active = false;
  },
  roll: function roll(list) {
    this.status = 1;
    var line = [];

    for (var i = 0; i < 5; i++) {
      line[i] = [];
    }

    for (var _i6 in list) {
      line[_i6 % 5][2 - parseInt(_i6 / 5)] = list[_i6];
    }

    for (var _i7 in this.wheelList) {
      var _this$wheelList$_i;

      (_this$wheelList$_i = this.wheelList[_i7]).startRoll.apply(_this$wheelList$_i, line[_i7]);
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
  //大奖有关
  closeDoorAnim: function closeDoorAnim() {
    this.doorNode.active = true;
    var chList = this.doorNode.children;

    for (var i in chList) {
      chList[i].getComponent(cc.Animation).play();
    }
  }
});

cc._RF.pop();