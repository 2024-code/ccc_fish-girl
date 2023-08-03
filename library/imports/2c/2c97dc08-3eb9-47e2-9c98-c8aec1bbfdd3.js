"use strict";
cc._RF.push(module, '2c97dwIPrlH4pyYyK7Bu/3T', 'CSDMain');
// Texture/Slot_caishendao/js/CSDMain.js

"use strict";

var BETNUM = 380; //单注值

var LINES = 243; //线数

var TOPBET = [1000, 50, 30, 100]; //列倍率

var BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var RULELIST = [2, 0.75, 0.25, 1.5, 0.5, 0.2, 1.25, 0.3, 0.15, 1, 0.25, 0.1, 0.75, 0.2, 0.1, 0.5, 0.1, 0.05, 0.5, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05]; //规则

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
    coinPb: {
      "default": null,
      type: cc.Prefab,
      displayName: '财神吐金币特效'
    },
    coinAnimPr: {
      "default": null,
      type: cc.Node,
      displayName: '财神吐金币父节点'
    },
    effectAnimPr: {
      "default": null,
      type: cc.Node,
      displayName: '终奖特效'
    },
    //大奖有关
    doorNode: {
      "default": null,
      type: cc.Node,
      displayName: '大门'
    },
    caiShenBg: {
      "default": null,
      type: cc.Node,
      displayName: '财神背景'
    },
    caiShenAnim: {
      "default": null,
      type: cc.Animation,
      displayName: '财神动画'
    },
    bigWinNode: {
      "default": null,
      type: cc.Node,
      displayName: '大奖节点'
    },
    bigWinResultAnim: {
      "default": null,
      type: cc.Animation,
      displayName: 'bigWin终奖动画'
    },
    //免费次数有关
    freeHideNode: {
      "default": [],
      type: cc.Node,
      displayName: '免费摇奖隐藏节点'
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
    this.net = this.node.getComponent('CSDNetwork');
    this.audio = this.node.getComponent('CSDAudio');
    this.wheelList = [];
    this.bet = 0;
    this.auto = false;
    this.status = 0;
    this.bigWinResList = [3, 1, 2];
    this.bigWinCoin = 0;
    this.bigWinBoo = false;
    this.freeTimes = 0;
    this.rollResult = [];
    this.rollIndex = 0;
    this.lotteryRes = null;
    this.stopFree = false;
    this.delayClick = false;
    this.turnNum = 0;
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
    this.audioBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.audio.pInfo.musicControl ? 'btn_sound' : 'btn_sound_2');
  },
  onCLick: function onCLick(event, args) {
    var _this2 = this;

    if (args == 'auto') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.delayClick) {
        return;
      }

      this.auto = !this.auto;
      this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');

      if (this.auto && this.status == 0) {
        this.sendRoll();
      }
    } else if (args == 'roll') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.delayClick) {
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
      this.audio.playBgm(0);
      this.bigWinResultAnim.node.active = false;
      this.bigWinNode.active = false;
      this.caiShenBg.active = false;
    } else if (args == 'exitGame') {
      this.net.socket.disconnect();
      cc.director.loadScene("LobbyMain");
    } else if (args == 'help') {
      this.helpUI.active = true;
      var hr = this.helpNum.children;

      for (var i in hr) {
        hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
      }
    } else if (args == 'closeHelp') {
      this.helpUI.active = false;
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
    this.lblBet.string = (BETNUM / this.playerInfo.exchangeRate).toFixed(2);
    this.lblCurBet.string = (BET[this.bet] * BETNUM / this.playerInfo.exchangeRate).toFixed(2);

    for (var i in this.lblCoinList) {
      this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM / this.playerInfo.exchangeRate).toFixed(2);
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
      //财神专属吐钱动画
      var animBool = false;
      var rIndex = this.rollIndex;
      var posX = [-547, -274, 0, 274, 547];

      for (var _i in this.wheelList) {
        var length = this.wheelList[_i].roleIdList.length;

        for (var j = 2; j <= 4; j++) {
          if (this.wheelList[_i].roleIdList[length - j] == 13) {
            animBool = true;

            this.wheelList[_i].rolePbList[length - j].getComponent(cc.Animation).play('s02_s');

            var pb = cc.instantiate(this.coinPb);
            pb.position = cc.v2(posX[_i], (4 - j + 2) * 200 - 60);
            this.coinAnimPr.addChild(pb);
            pb.runAction(cc.sequence(cc.spawn(cc.moveTo(1, cc.v2(0, 750)), cc.scaleTo(1, 0)), cc.removeSelf()));
          }
        }
      }

      this.lblUserCoin.string = (this.lotteryRes.userscore / this.playerInfo.exchangeRate).toFixed(2);
      this.lblWinCoin.string = (this.lotteryRes.winscore / this.playerInfo.exchangeRate).toFixed(2); // if (animBool) {

      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.turnNum += 1;

          _this3.playWinAnim(_this3.turnNum);
        }
      }, 1); // } else {
      //     this.playWinAnim();
      // }

      if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
        this.bigWinBoo = true;
        this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
        this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
        this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
        this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
        this.startBigWin();
      }

      if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
        if (this.freeTimes == 0) {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.audio.playFree();
          this.scheduleOnce(function () {
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
    var animIndex = 0;
    this.schedule(function () {
      if (rIndex == _this4.rollIndex) {
        _this4.closeShine();

        for (var _i2 = 0; _i2 < 15; _i2++) {
          _this4.clsoeAnim(_i2 % 5, parseInt(_i2 / 5));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          _this4.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));
        }

        animIndex++;
      }
    }, 3, list.length, 0.01);
    this.scheduleOnce(function () {
      if (tm != _this4.turnNum) {
        //不是当前旋转轮次则跳过后续操作
        return;
      }

      if (_this4.stopFree) {
        _this4.stopFree = false;

        _this4.stopFreeTimes();

        _this4.closeShine();

        _this4.auto = false;
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
    }, hasWinBool > 0 ? hasWinBool * 3 : 1);
  },
  //免费次数有关
  startFreeGame: function startFreeGame() {
    var _this5 = this;

    this.audio.playBgm(1);
    this.auto = false;
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i3 in this.wheelList) {
      this.wheelList[_i3].initWheel();
    }

    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
    this.scheduleOnce(function () {
      _this5.auto = true;

      _this5.sendRoll();
    }, 2);
  },
  stopFreeTimes: function stopFreeTimes() {
    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = true;
    }

    for (var _i4 in this.wheelList) {
      this.wheelList[_i4].initWheel();
    }

    this.audio.playBgm(0);
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
    this.closeShine();
    this.net.socket.emit('lottery', JSON.stringify({
      bet: this.bet,
      nBetList: [BET[this.bet] * BETNUM]
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
    this.audio.playCloseDoor();

    for (var i in chList) {
      chList[i].getComponent(cc.Animation).play();
    }
  },
  startBigWin: function startBigWin() {
    var _this6 = this;

    this.audio.playBgm(3);
    this.auto = false;
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
    this.node.runAction(cc.sequence(cc.callFunc(function () {
      _this6.caiShenAnim.play();
    }), cc.delayTime(3), cc.callFunc(function () {
      _this6.doorNode.active = false;
      _this6.caiShenBg.active = true;

      _this6.caiShenBg.getChildByName('Big_caishen').getComponent(cc.Animation).play();

      _this6.audio.playCs();
    }), cc.delayTime(4), cc.callFunc(function () {
      _this6.caiShenBg.active = false;

      _this6.bigWinInit();
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
      var coinPr = winNodePr[args].children;
      this.bigWinTimes--;
      var coinNode = coinPr[0];
      coinNode.getComponent(cc.Animation).play();
      var index = this.bigWinResList[this.bigWinTimes];
      console.log(index, this.bigWinTimes);
      this.scheduleOnce(function () {
        var nameList = {
          30: 's_show_mini',
          50: 's_show_minor',
          100: 's_show_major',
          1000: 's_show_grand'
        };
        var nd = winNodePr[args].getChildByName(nameList[index]);
        nd.active = true;
        nd.getComponent(cc.Animation).play();
      }, 0.5);

      if (this.bigWinTimes == 0) {
        this.scheduleOnce(function () {
          _this7.audio.playBW();

          _this7.bigWinResultAnim.node.active = true;
          _this7.lblUserCoin.string = (_this7.bigWinResultCoin / _this7.playerInfo.exchangeRate).toFixed(2);
          _this7.lblWinCoin.string = (_this7.bigWinCoin / _this7.playerInfo.exchangeRate).toFixed(2);
          _this7.bigWinResultAnim.node.getChildByName('gold').getComponent(cc.Label).string = (_this7.bigWinCoin / _this7.playerInfo.exchangeRate).toFixed(2);

          _this7.bigWinResultAnim.play();

          _this7.bigWinBoo = false;
        }, 2);
      }
    }
  },
  bigWinInit: function bigWinInit() {
    this.audio.playBgm(2);
    this.BigWinSet = new Set();
    this.bigWinNode.active = true;
    var pr = this.bigWinNode.children;

    for (var i in pr) {
      var pr1 = pr[i].children;

      for (var j in pr1) {
        pr1[j].active = j == 0;
      }
    }
  }
});

cc._RF.pop();