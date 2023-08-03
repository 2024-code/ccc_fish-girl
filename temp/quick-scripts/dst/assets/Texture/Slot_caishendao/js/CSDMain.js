
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_caishendao/js/CSDMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9jYWlzaGVuZGFvXFxqc1xcQ1NETWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsIlJVTEVMSVNUIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzcFVzZXJGYWNlIiwidHlwZSIsIlNwcml0ZSIsImRpc3BsYXlOYW1lIiwibGJsVXNlck5hbWUiLCJMYWJlbCIsImxibFVzZXJDb2luIiwibGJsQmV0IiwibGJsTGluZXMiLCJsYmxDdXJCZXQiLCJsYmxXaW5Db2luIiwibGJsQ29pbkxpc3QiLCJyb2xsQnRuQW5pbSIsIkFuaW1hdGlvbiIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJjb2luUGIiLCJjb2luQW5pbVByIiwiTm9kZSIsImVmZmVjdEFuaW1QciIsImRvb3JOb2RlIiwiY2FpU2hlbkJnIiwiY2FpU2hlbkFuaW0iLCJiaWdXaW5Ob2RlIiwiYmlnV2luUmVzdWx0QW5pbSIsImZyZWVIaWRlTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYXVkaW9CdG4iLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJiZXQiLCJhdXRvIiwic3RhdHVzIiwiYmlnV2luUmVzTGlzdCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZGVsYXlDbGljayIsInR1cm5OdW0iLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsImdldFNwcml0ZUZyYW1lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJvbkNMaWNrIiwiZXZlbnQiLCJhcmdzIiwic2VuZFJvbGwiLCJwbGF5Iiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsInNjaGVkdWxlT25jZSIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJhY3RpdmUiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJociIsImNoaWxkcmVuIiwiaSIsInN0b3BBdWRpbyIsImV4Y2hhbmdlUmF0ZSIsInN0YXRlQ2FsbEJhY2siLCJzdCIsImFuaW1Cb29sIiwickluZGV4IiwicG9zWCIsInJvbGVJZExpc3QiLCJqIiwicm9sZVBiTGlzdCIsInBiIiwiaW5zdGFudGlhdGUiLCJwb3NpdGlvbiIsInYyIiwiYWRkQ2hpbGQiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInNwYXduIiwibW92ZVRvIiwic2NhbGVUbyIsInJlbW92ZVNlbGYiLCJ1c2Vyc2NvcmUiLCJ3aW5zY29yZSIsInBsYXlXaW5BbmltIiwiZ2V0T3BlbkJveCIsImJpZ1dpblRpbWVzIiwid2luX2xpc3QiLCJ3aW4iLCJiaWdXaW5SZXN1bHRDb2luIiwidXNlcl9zY29yZSIsInN0YXJ0QmlnV2luIiwibkZyZWVUaW1lIiwicGxheUZyZWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInRtIiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0IiwiYW5pbUluZGV4Iiwic2NoZWR1bGUiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsInNob3dBbmltIiwic3RvcEZyZWVUaW1lcyIsImdldENoaWxkQnlOYW1lIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4Iiwibm9kZUxpc3QiLCJhbmltIiwic2V0Q3VycmVudFRpbWUiLCJzdG9wIiwicm9sbCIsImxpbmUiLCJzdGFydFJvbGwiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5CZXRMaXN0IiwiY2xvc2VEb29yQW5pbSIsImNoTGlzdCIsInBsYXlDbG9zZURvb3IiLCJjYWxsRnVuYyIsImRlbGF5VGltZSIsInBsYXlDcyIsImJpZ1dpbkluaXQiLCJiaWdXaW5DbGljayIsIm51bSIsIkJpZ1dpblNldCIsInNpemUiLCJhZGQiLCJ3aW5Ob2RlUHIiLCJjb2luUHIiLCJjb2luTm9kZSIsImNvbnNvbGUiLCJsb2ciLCJuYW1lTGlzdCIsIm5kIiwicGxheUJXIiwiU2V0IiwicHIiLCJwcjEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsTUFBTSxHQUFHLEdBQWYsRUFBb0I7O0FBQ3BCLElBQU1DLEtBQUssR0FBRyxHQUFkLEVBQW1COztBQUNuQixJQUFNQyxNQUFNLEdBQUcsQ0FBQyxJQUFELEVBQU8sRUFBUCxFQUFXLEVBQVgsRUFBZSxHQUFmLENBQWYsRUFBb0M7O0FBQ3BDLElBQU1DLEdBQUcsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLEVBQTVCLENBQVo7QUFDQSxJQUFNQyxRQUFRLEdBQUcsQ0FBQyxDQUFELEVBQUksSUFBSixFQUFVLElBQVYsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsSUFBL0IsRUFBcUMsR0FBckMsRUFBMEMsSUFBMUMsRUFBZ0QsQ0FBaEQsRUFBbUQsSUFBbkQsRUFBeUQsR0FBekQsRUFBOEQsSUFBOUQsRUFBb0UsR0FBcEUsRUFBeUUsR0FBekUsRUFBOEUsR0FBOUUsRUFBbUYsR0FBbkYsRUFBd0YsSUFBeEYsRUFBOEYsR0FBOUYsRUFBbUcsR0FBbkcsRUFBd0csSUFBeEcsRUFBOEcsSUFBOUcsRUFBb0gsR0FBcEgsRUFBeUgsSUFBekgsRUFBK0gsSUFBL0gsRUFBcUks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QUFMLENBQWdCdUQsTUFBaEIsR0FBeUIsSUFBekI7QUFDQSxRQUFJNkYsRUFBRSxHQUFHLEtBQUtwSixVQUFMLENBQWdCNkQsUUFBekI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFULElBQWNzRixFQUFkLEVBQWtCO0FBQ2QsVUFBSUMsR0FBRyxHQUFHRCxFQUFFLENBQUN0RixDQUFELENBQUYsQ0FBTUQsUUFBaEI7O0FBQ0EsV0FBSyxJQUFJVSxDQUFULElBQWM4RSxHQUFkLEVBQW1CO0FBQ2ZBLFFBQUFBLEdBQUcsQ0FBQzlFLENBQUQsQ0FBSCxDQUFPaEIsTUFBUCxHQUFnQmdCLENBQUMsSUFBSSxDQUFyQjtBQUNIO0FBQ0o7QUFDSjtBQXhpQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMzgwOyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI0MzsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzEwMDAsIDUwLCAzMCwgMTAwXTsgLy/liJflgI3njodcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY29uc3QgUlVMRUxJU1QgPSBbMiwgMC43NSwgMC4yNSwgMS41LCAwLjUsIDAuMiwgMS4yNSwgMC4zLCAwLjE1LCAxLCAwLjI1LCAwLjEsIDAuNzUsIDAuMiwgMC4xLCAwLjUsIDAuMSwgMC4wNSwgMC41LCAwLjEsIDAuMDUsIDAuMjUsIDAuMSwgMC4wNSwgMC4yNSwgMC4xLCAwLjA1LCAwLjI1LCAwLjEsIDAuMDUsIDAuMjUsIDAuMSwgMC4wNSwgMC4yNSwgMC4xLCAwLjA1XTsgLy/op4TliJlcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcFVzZXJGYWNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflpLTlg48nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlck5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi35ZCNJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Y2V5rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbEJ0bkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JvbGzmjInpkq7liqjnlLsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuU3ByaXRlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvaW5QYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6LSi56We5ZCQ6YeR5biB54m55pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvaW5BbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfotKLnpZ7lkJDph5HluIHniLboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e7iOWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lpKflpZbmnInlhbNcclxuICAgICAgICBkb29yTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+Wkp+mXqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWlTaGVuQmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfotKLnpZ7og4zmma8nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FpU2hlbkFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+i0ouelnuWKqOeUuycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaWdXaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aSn5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpZ1dpblJlc3VsdEFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2JpZ1dpbue7iOWlluWKqOeUuydcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUhpZGVOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WllumakOiXj+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVRpbWVzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluaYvuekuuiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdoicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscE51bToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaLlj6/lj5jms6jmlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WjsOmfs+aMiemSricsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0NTRE5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnQ1NEQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xsUmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMubG90dGVyeVJlcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHVybk51bSA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BVc2VyRmFjZS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGJsVXNlck5hbWUuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPyAnYnRuX3NvdW5kJyA6ICdidG5fc291bmRfMicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmRlbGF5Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG8gJiYgdGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdyb2xsJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5kZWxheUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xsQnRuQW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdkZWMnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdjbG9zZUJpZ1dpbicpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhaVNoZW5CZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2V4aXRHYW1lJykge1xyXG4gICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdoZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaHIgPSB0aGlzLmhlbHBOdW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgIGhyW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKFJVTEVMSVNUW2ldICogQkVUW3RoaXMuYmV0XSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VIZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA/ICdidG5fc291bmQnIDogJ2J0bl9zb3VuZF8yJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmV0KCkge1xyXG4gICAgICAgIHRoaXMubGJsQmV0LnN0cmluZyA9IChCRVROVU0gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMubGJsQ3VyQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICAvL+i0ouelnuS4k+WxnuWQkOmSseWKqOeUu1xyXG4gICAgICAgICAgICBsZXQgYW5pbUJvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgICAgICBsZXQgcG9zWCA9IFstNTQ3LCAtMjc0LCAwLCAyNzQsIDU0N107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtpXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAyOyBqIDw9IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtpXS5yb2xlSWRMaXN0W2xlbmd0aCAtIGpdID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1Cb29sID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0ucm9sZVBiTGlzdFtsZW5ndGggLSBqXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdzMDJfcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvaW5QYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBiLnBvc2l0aW9uID0gY2MudjIocG9zWFtpXSwgKDQgLSBqICsgMikgKiAyMDAgLSA2MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29pbkFuaW1Qci5hZGRDaGlsZChwYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBiLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNwYXduKGNjLm1vdmVUbygxLCBjYy52MigwLCA3NTApKSwgY2Muc2NhbGVUbygxLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgLy8gaWYgKGFuaW1Cb29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR1cm5OdW0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKHRoaXMudHVybk51bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wbGF5V2luQW5pbSgpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCaWdXaW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUZyZWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKHRtKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0bSAhPSB0aGlzLnR1cm5OdW0pIHsvL+S4jeaYr+W9k+WJjeaXi+i9rOi9ruasoeWImei3s+i/h+WQjue7reaTjeS9nFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICBzdGFydEZyZWVHYW1lKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGFuaW0gPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgYW5pbS5zZXRDdXJyZW50VGltZSgwKTtcclxuICAgICAgICBhbmltLnN0b3AoKTtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTV1cclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8v5aSn5aWW5pyJ5YWzXHJcbiAgICBjbG9zZURvb3JBbmltKCkge1xyXG4gICAgICAgIHRoaXMuZG9vck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgY2hMaXN0ID0gdGhpcy5kb29yTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlDbG9zZURvb3IoKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGNoTGlzdCkge1xyXG4gICAgICAgICAgICBjaExpc3RbaV0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0QmlnV2luKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgzKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uc3ByaXRlRnJhbWUgPSB0aGlzLnNwQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5hdXRvID8gJ2J0bl90aW5nemhpJyA6ICdidG5femlkb25nJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWlTaGVuQW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMyksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9vck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhaVNoZW5CZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWlTaGVuQmcuZ2V0Q2hpbGRCeU5hbWUoJ0JpZ19jYWlzaGVuJykuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5Q3MoKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSg0KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWlTaGVuQmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkluaXQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICBiaWdXaW5DbGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gdGhpcy5CaWdXaW5TZXQuc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5CaWdXaW5TZXQuYWRkKGFyZ3MpO1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHRoaXMuQmlnV2luU2V0LnNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2luTm9kZVByID0gdGhpcy5iaWdXaW5Ob2RlLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBsZXQgY29pblByID0gd2luTm9kZVByW2FyZ3NdLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblRpbWVzLS07XHJcbiAgICAgICAgICAgIGxldCBjb2luTm9kZSA9IGNvaW5QclswXTtcclxuICAgICAgICAgICAgY29pbk5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmJpZ1dpblJlc0xpc3RbdGhpcy5iaWdXaW5UaW1lc107XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4LCB0aGlzLmJpZ1dpblRpbWVzKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVMaXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIDMwOiAnc19zaG93X21pbmknLFxyXG4gICAgICAgICAgICAgICAgICAgIDUwOiAnc19zaG93X21pbm9yJyxcclxuICAgICAgICAgICAgICAgICAgICAxMDA6ICdzX3Nob3dfbWFqb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIDEwMDA6ICdzX3Nob3dfZ3JhbmQnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbmQgPSB3aW5Ob2RlUHJbYXJnc10uZ2V0Q2hpbGRCeU5hbWUobmFtZUxpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIG5kLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBuZC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCVygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5iaWdXaW5SZXN1bHRDb2luIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dvbGQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBiaWdXaW5Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICB0aGlzLkJpZ1dpblNldCA9IG5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcHIgPSB0aGlzLmJpZ1dpbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBwcikge1xyXG4gICAgICAgICAgICBsZXQgcHIxID0gcHJbaV0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogaW4gcHIxKSB7XHJcbiAgICAgICAgICAgICAgICBwcjFbal0uYWN0aXZlID0gaiA9PSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==