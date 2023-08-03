
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Flower/FlowerMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f97f0CDR71Ceq9Qbzo/gS2o', 'FlowerMain');
// Script/Flower/FlowerMain.js

"use strict";

var _cc$Class;

cc.Class((_cc$Class = {
  "extends": cc.Component,
  properties: {
    lblRoomNo: {
      "default": null,
      type: cc.Label
    },
    _seats: [],
    _timeLabel: null,
    _lastPlayingSeat: null,
    _playingSeat: null,
    _lastPlayTime: null,
    _shareContent: null,
    paigroup: {
      "default": null,
      type: cc.SpriteAtlas
    },
    back: cc.Node,
    addzhudetail: null,
    ops: null,
    zhuobj: null,
    countdown: cc.Label,
    _time: -1,
    bgAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  onLoad: function onLoad() {
    cc.log('进入炸金花================================================');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.playerInfo.setGameObj_Function(this);
    this.netWork = require("FlowerNetWork").getInstant;
    this.netWork.setFlowerObj_Function(this);
    this.gameInit_Function();
  },
  start: function start() {
    cc.audioEngine.playMusic(this.bgAudio);
  },
  gameInit_Function: function gameInit_Function() {
    for (var i = 0; i < 5; i++) {
      this._seats.push(cc.find("Canvas/seat" + i).getComponent("FlowerSeat"));
    }

    this._timeLabel = cc.find("Canvas/time").getComponent(cc.Label);
    this._zhuomian = cc.find("Canvas/zhuomian");
    this.zhuobj = ['zhu0', 'zhu1', 'zhu2', 'zhu3', 'zhu0_hui', 'zhu1_hui', 'zhu2_hui', 'zhu3_hui'];
    this._edit = cc.find("Canvas/edit");
    this._graykanpai = this._edit.getChildByName('graykanpai');
    this._kanpai = this._edit.getChildByName('kanpai');
    this._graygenzhu = this._edit.getChildByName('graygenzhu');
    this._genzhu = this._edit.getChildByName('genzhu');
    this._grayjiazhu = this._edit.getChildByName('grayjiazhu');
    this._jiazhu = this._edit.getChildByName('jiazhu');
    this._grayqipai = this._edit.getChildByName('grayqipai');
    this._qipai = this._edit.getChildByName('qipai');
    this._graybipai = this._edit.getChildByName('graybipai');
    this._bipai = this._edit.getChildByName('bipai');
    this._allin = this._edit.getChildByName('allin');
    this._allZhuLabel = cc.find("Canvas/zongxiazhu/label").getComponent(cc.Label); //牌桌上所有的注

    this._zhu = cc.find("Canvas/zhu"); //加注界面

    this._danzhu = cc.find("Canvas/danzhu").getComponent(cc.Label); //单注显示

    this._lunshu = cc.find("Canvas/lunshu").getComponent(cc.Label); //轮数显示

    this._pkPanel = cc.find("Canvas/pk"); //pk界面

    this._flashAnim = cc.find("Canvas/pk/shandian/pk_shandian").getComponent(cc.Animation); //闪电动画

    this._bipaiAnim = cc.find("Canvas/pk/bipai").getComponent(cc.Animation); //比牌动画

    this._leftLie = this._pkPanel.getChildByName('leftLie');
    this._rightLie = this._pkPanel.getChildByName('rightLie');
    this._tips = cc.find("Canvas/tips").getComponent(cc.Label); //tips显示

    this.addClickEvent(this._kanpai, this.node, "FlowerMain", "clickKanpai");
    this.addClickEvent(this.back, this.node, "FlowerMain", "onBtnExit");
    this.addClickEvent(this._qipai, this.node, "FlowerMain", "qipai");
    this.addClickEvent(this._bipai, this.node, "FlowerMain", "bipai");
    this.addClickEvent(this._genzhu, this.node, "FlowerMain", "genzhu");
    this.addClickEvent(this._jiazhu, this.node, "FlowerMain", "jiazhu");
    this.addClickEvent(cc.find('Canvas/zhu/zhu0'), this.node, "FlowerMain", "addzhu");
    this.addClickEvent(cc.find('Canvas/zhu/zhu1'), this.node, "FlowerMain", "addzhu");
    this.addClickEvent(cc.find('Canvas/zhu/zhu2'), this.node, "FlowerMain", "addzhu");
    this.addClickEvent(cc.find('Canvas/zhu/zhu3'), this.node, "FlowerMain", "addzhu");
    this.initView();
    this.initSeats();
    console.log('是不是断线重连：' + this.netWork.reconnectP); //断线是2 不断线1

    if (this.netWork.reconnectP == 2) {
      this.netWork.flowerSocket.emit("getUserInfoByUserid");
      this.netWork.flowerSocket.emit("getGameInfoByUserid");
    }

    this.netWork.flowerSocket.emit("ready"); //audioMgr.playBGM("back.mp3");
  },
  addClickEvent: function addClickEvent(node, target, component, handler, isReplace) {
    console.log(component + ":" + handler);
    var eventHandler = new cc.Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler;
    var clickEvents = node.getComponent(cc.Button).clickEvents;

    if (isReplace) {
      //是否覆盖掉之前的事件
      clickEvents[0] = eventHandler;
    } else {
      clickEvents.push(eventHandler);
    }
  },
  initView: function initView() {
    this._kanpai.active = false;
    this._qipai.active = false;
    this._genzhu.active = false;
    this._allin.active = false;
    this._jiazhu.active = false;
    this._bipai.active = false;
    this._pkPanel.active = false;
    this._zhuomian.active = false;
    this._tips.node.active = true;
  },
  freshUserInfo: function freshUserInfo(data) {
    console.log('获取断线重连后的用户信息', data);
    var self = this;
    var seats = this.netWork.seats;

    for (var i = 0; i < seats.length; i++) {
      for (var t = 0; t < 3; t++) {
        cc.find('Canvas/seat' + i + '/fupai' + t).active = true;
      }
    }

    cc.find("Canvas/danzhu").active = true;
    cc.find("Canvas/lunshu").active = true;
    cc.find("Canvas/zongxiazhu").active = true;
    self._tips.node.active = false; // cc.find('Canvas/back').active = false;

    self.countdown.node.active = false;
    self._qipai.active = true;
    self._genzhu.active = data.canGenzhu;

    try {
      self._genzhu.getChildByName('num').getComponent(cc.Label).string = data.hasCheckedPai ? (data.currentZhu * 2 / 100).toFixed(2) : (data.currentZhu / 100).toFixed(2);
    } catch (e) {
      console.log('无视没有currentZhu字段', e);
    }

    self._kanpai.active = !data.hasCheckedPai;
    self._jiazhu.active = data.canAddZhu;
    self._bipai.active = data.canBiPai;
    self.ops = data.xiaZhuOptions;
    self.addzhudetail = data.xiaZhuOptions;
    var holds = data.holds;

    if (data.hasCheckedPai && holds && holds.length > 0) {
      var seat = self._seats[0];
      var spriteFrames = [];

      for (var i = 0; i < 3; i++) {
        spriteFrames.push(self.getpaiRes(holds[i]));
      }

      seat.fanPai(spriteFrames);
    }
  },
  freshGameInfo: function freshGameInfo(data) {
    console.log('获取断线重连后的游戏信息', data); // if (this.ops) {

    var self = this;
    this.freshCurrentZhu(data.currentZhu);
    this.freshCircleCount(data.circleCount);
    this._zhuomian.active = true;
    var total = data.moneyPool;
    self._allZhuLabel.string = (total / 100).toFixed(2); //总数
    //fresh其他人的数据

    var commonInfo = data.players;

    for (var i in commonInfo) {
      var temp = commonInfo[i];
      var userid = temp.userid;
      var costMoney = temp.costMoney; //下的注

      var money = (temp.money * 0.01).toFixed(2); //所有用的钱

      var look = temp.hasCheckedPai; //刷新这个人的信息

      var seatIndex = this.netWork.getSeatIndexByID(userid);
      var localIndex = this.netWork.getLocalIndex(seatIndex);
      var seat = self._seats[localIndex];

      try {
        seat._kanicon.active = look;
        seat.setCostMoney(costMoney);
        seat.setMoney(money);
      } catch (e) {
        cc.log('获取断线重连后的游戏信息err', e);
      }
    }

    var zhuCount = parseInt(total / 100);

    for (var j = 0; j < zhuCount; j++) {
      var node = self._zhuomian.children[0];
      var newNode = cc.instantiate(node);

      self._zhuomian.addChild(newNode);

      var zhuObj = cc.find('Canvas/zhu/' + this.zhuobj[0]);
      var zhuFrameCopy = zhuObj.getComponent(cc.Sprite).spriteFrame;
      newNode.getComponent(cc.Sprite).spriteFrame = zhuFrameCopy;
      newNode.x = Math.random() * 200 - 100;
      newNode.y = Math.random() * 160 - 80;
      newNode.active = true;
    }
  },
  refreshBtns: function refreshBtns(data) {
    var seats = this.netWork.seats;

    for (var i = 0; i < seats.length; i++) {
      for (var t = 0; t < 3; t++) {
        cc.find('Canvas/seat' + i + '/fupai' + t).active = true;
      }
    }

    cc.find("Canvas/danzhu").active = true;
    cc.find("Canvas/lunshu").active = true;
    cc.find("Canvas/zongxiazhu").active = true;
    this._tips.node.active = false;
    this.countdown.node.active = false;
    this.freshCurrentZhu(data.currentZhu);
    this.freshCircleCount(data.turn);
    this._kanpai.active = true;
    this._qipai.active = true;
    this._genzhu.active = false;
    this._jiazhu.active = false;
    this._bipai.active = false;
    this.showXiaDiZhuAnim(data.currentZhu); //下底注动画
  },
  showXiaDiZhuAnim: function showXiaDiZhuAnim(currentZhu) {
    var children_baoliu = [];

    for (var i in this._zhuomian.children) {
      if (i < 5) {
        //只留5个底注的筹码
        children_baoliu.push(this._zhuomian.children[i]);
      }

      this._zhuomian.children[i].active = false;
    }

    this._zhuomian.removeAllChildren();

    for (var j in children_baoliu) {
      this._zhuomian.addChild(children_baoliu[j]);
    }

    this._zhuomian.active = true;
    var addMoney = 100;

    if (currentZhu) {
      addMoney = parseInt(currentZhu) * 0.5;
    }

    for (var k in this._seats) {
      if (!this._seats[k]._userName) {
        continue;
      }

      ;
      var data = {
        x: this._seats[k].node.x,
        y: this._seats[k].node.y,
        addMoney: addMoney,
        addMoneyLevel: 0
      };
      this.showZhuAnim(data, k);
    }
  },
  addUser: function addUser(data) {
    data.score = (data.score * 0.01).toFixed(2);
    this.initSingleSeat(data);
  },
  changedUserState: function changedUserState(data) {
    this.initSingleSeat(data);
  },
  gameBegin: function gameBegin(data) {
    cc.log('开始游戏====================' + JSON.stringify(data));
    this.refreshBtns(data);
  },
  kanpai: function kanpai(data) {
    this._zhu.active = false;
    var holds = data.holds;
    var seat = this._seats[0];
    var spriteFrames = [];

    for (var i = 0; i < 3; i++) {
      spriteFrames.push(this.getpaiRes(holds[i]));
    }

    seat.fanPai(spriteFrames);
    var currentZhu = data.currentZhu;
    this._genzhu.getChildByName('num').getComponent(cc.Label).string = (currentZhu * 2 / 100).toFixed(2);
    this.hasCheckedPai = true;
  },
  qipai: function qipai(data) {
    if (data.status == 'shu') {
      cc.find('Canvas/seat0/shuicon').active = true;
    } else {
      cc.find('Canvas/seat0/qiicon').active = true;
    }

    this._grayqipai.active = true;
    this._qipai.active = false;
    var holds = data.holds;
    var seat = this._seats[0];
    var spriteFrames = [];

    for (var i = 0; i < 3; i++) {
      spriteFrames.push(this.getpaiRes(holds[i]));
    }

    seat.fanPai(spriteFrames);
  },
  gameMyTurnPush: function gameMyTurnPush(data) {
    console.log("轮到自己消息：" + JSON.stringify(data));
    this.addzhudetail = data.xiaZhuOptions;
    this.ops = data.xiaZhuExtra.ops; //可操作按钮

    if (data.canAddZhu) {
      this._jiazhu.active = true;
    }

    if (data.canGenzhu) {
      this._genzhu.active = true;
      var currentZhu = data.currentZhu;

      if (data.hasCheckedPai) {
        currentZhu = currentZhu * 2;
      }

      this.hasCheckedPai = data.hasCheckedPai;
      this._genzhu.getChildByName('num').getComponent(cc.Label).string = (currentZhu / 100).toFixed(2);
    }

    if (data.canBiPai) {
      this._bipai.active = true;
    }

    if (data.allInFlag) {
      this._allin.active = true; // this._graygenzhu.active = false;
    } else {
      this._allin.active = false;
    }
  },
  gameOverNotify: function gameOverNotify(data) {
    // var i = this.netWork.getLocalIndex(this.netWork.getSeatIndexByID(data));
    // cc.find('Canvas/seat' + i + '/toggle').active = false;
    for (var t = 0; t < 5; t++) {
      cc.find('Canvas/seat' + t + '/toggle').active = false;
    }

    this._zhu.active = false;
  },
  changedGameTurn: function changedGameTurn(data) {
    var i = this.netWork.getLocalIndex(this.netWork.getSeatIndexByID(data));

    for (var t = 0; t < 5; t++) {
      cc.find('Canvas/seat' + t + '/toggle').active = false;
    }

    cc.find('Canvas/seat' + i + '/toggle').active = true;

    this._seats[i].setTime();

    this.hideOhersPkButton();
    this._tips.node.active = false;

    if (i != 0) {
      //如果没有轮到自己操作
      this._genzhu.active = false;
      this._jiazhu.active = false;
      this._bipai.active = false;
      this._zhu.active = false;
    }
  },
  gameTimerInitCounter: function gameTimerInitCounter(data) {
    var i = this.netWork.getLocalIndex(this.netWork.getSeatIndexByID(data));

    for (var t = 0; t < 5; t++) {
      cc.find('Canvas/seat' + t + '/toggle').active = false;
    }

    cc.find('Canvas/seat' + i + '/toggle').active = true;

    this._seats[i].setTime();
  },
  changedGameAction: function changedGameAction(data) {
    //TODO:服务器判断是否能下注
    var bp = cc.find('Canvas/edit/bipai'); // if (data.xiaZhuOptions) this.addzhudetail = data.xiaZhuOptions;
    // if (data.xiaZhuExtra.ops) this.ops = data.xiaZhuExtra.ops;

    if (data.canBiPai) {
      bp.active = true;
    } else {
      bp.active = false;
    }
  },
  guoNotify: function guoNotify(data) {
    cc.find('Canvas/seat0/toggle').active = false;
  },
  genZhuNotify: function genZhuNotify(data) {
    var userid = data.userid;
    var seatIndex = this.netWork.getSeatIndexByID(userid);
    var localIndex = this.netWork.getLocalIndex(seatIndex);
    var seat = this._seats[localIndex];
    seat.showGenZhu();
    var currentZhu = data.currentZhu;
    var hasCheckedPai = data.hasCheckedPai;
    var addMoney = data.addMoney;
    var addMoneyLevel = data.addMoneyLevel;
    this.freshCurrentZhu(currentZhu);
    var data = {
      x: seat.node.x,
      y: seat.node.y,
      addMoney: addMoney,
      addMoneyLevel: addMoneyLevel,
      hasCheckedPai: hasCheckedPai
    };
    this.showZhuAnim(data);
  },
  kanPaiNotify: function kanPaiNotify(data) {
    var userid = data;
    var localIndex = this.netWork.getLocalIndexByUserId(userid);
    var seat = this._seats[localIndex];
    seat.showKanPai();
  },
  jiaZhuNotify: function jiaZhuNotify(data) {
    var userid = data.userid;
    var localIndex = this.netWork.getLocalIndexByUserId(userid);
    var seat = this._seats[localIndex];
    seat.showJiaZhu();
    var currentZhu = data.currentZhu;
    var hasCheckedPai = data.hasCheckedPai;
    var addMoney = data.addMoney;
    var addMoneyLevel = data.addMoneyLevel;
    this.freshCurrentZhu(currentZhu);
    var data = {
      x: seat.node.x,
      y: seat.node.y,
      addMoney: addMoney,
      addMoneyLevel: addMoneyLevel,
      hasCheckedPai: hasCheckedPai
    };
    this.showZhuAnim(data);
  },
  qiPaiNotify: function qiPaiNotify(data) {
    var data = data;
    var userid = data.userId;
    var localIndex = this.netWork.getLocalIndexByUserId(userid);
    var seat = this._seats[localIndex];
    seat.showQiPai(data.status);
  },
  win: function win(data) {
    //赢了一局
    console.log('赢了一局', data); //赢的人显示手牌

    var userid = data.winer;
    var localIndex = this.netWork.getLocalIndexByUserId(userid);
    var seat = this._seats[localIndex];
    var holds = data.holds;
    var spriteFrames = [];

    for (var i = 0; i < 3; i++) {
      spriteFrames.push(this.getpaiRes(holds[i]));
    }

    seat.fanPai(spriteFrames); //赢了的动画

    this.endData = data;
    this.isEnd = true;

    if (!this._pkPanel.active) {
      this.showEndAnim();
    }
  },
  gameMoneyPool: function gameMoneyPool(data) {
    //刷新总注
    var total = data.moneyPool;
    this._allZhuLabel.string = (total / 100).toFixed(2);
    ; //总数
    //fresh其他人的数据

    var commonInfo = data.commonInfo;

    for (var i in commonInfo) {
      var userid = i;
      var temp = commonInfo[i];
      var costMoney = temp.costMoney; //下的注

      var money = temp.money; //所有用的钱
      //刷新这个人的信息

      var seatIndex = this.netWork.getSeatIndexByID(userid);
      var localIndex = this.netWork.getLocalIndex(seatIndex);
      var seats = this.netWork.seats;
      seats[seatIndex].score = money;
      var seat = this._seats[localIndex];
      seat.setCostMoney(costMoney);
      seat.setMoney(money);
    }
  },
  messageNotify: function messageNotify(data) {
    //消息显示
    var message = data.message; //改
    //alert.show("注意", message);
  },
  gameCircleCount: function gameCircleCount(data) {
    //刷新轮数
    var circleCount = data;
    this.freshCircleCount(circleCount);
  },
  gameUserInBiPaiResult: function gameUserInBiPaiResult(data) {
    var winer = data.winer;
    var loser = data.loser;
    this.bipaiAnimQueue = [{
      winer: winer,
      loser: loser
    }]; //比牌队列

    this.bipaiAnimIndex = 0;
    this.showBipaiAnim();
  },
  gameWannaToCompare: function gameWannaToCompare(data) {
    if (!data || data.length < 1) {
      this._tips.node.active = false;
      return;
    }

    this._tips.string = "请选择比牌玩家";
    this._tips.node.active = true;

    for (var i in data) {
      var userid = data[i].userid;
      var seatIndex = this.netWork.getSeatIndexByID(userid);
      var localIndex = this.netWork.getLocalIndex(seatIndex);
      var seat = this._seats[localIndex];
      seat.showPkButton();
    }
  },
  gameCountDown: function gameCountDown(data) {
    if (this._tips.node.active) {
      this._tips.node.active = false;
    }

    this.countdown.string = data.countDown;
    this.countdown.node.active = true;

    if (data.countDown <= 0) {
      this.countdown.node.active = false;
    }
  },
  gameAntiResults: function gameAntiResults(data) {
    //最后一轮的比牌
    this.bipaiAnimQueue = [];

    for (var i in data) {
      var bipaiData = data[i];
      var winer = bipaiData['winUserid'];
      var loser = bipaiData['loseUserid'];
      this.bipaiAnimQueue.push({
        winer: winer,
        loser: loser
      }); //比牌队列
    }

    this.bipaiAnimIndex = 0;
    this.showBipaiAnim();
  },
  userInfoById: function userInfoById(data) {
    //获取断线重连后的用户信息
    this.freshUserInfo(data);
  },
  gameInfoById: function gameInfoById(data) {
    //获取断线重连后的游戏信息
    this.freshGameInfo(data);
  },
  exitRoom: function exitRoom() {
    //刷新用户钱币数量
    this.getGemsAndCoins();
  },
  noMoneyExit: function noMoneyExit(data) {//提示金钱不足
    //改
    //alert.show("提示", "金钱不足，您将退出房间，请在活动领取每日金币补助");
  },
  sbInAllIn: function sbInAllIn(data) {
    //全下
    this.doAllin(data, function () {
      this.netWork.flowerSocket.emit('allInActiveFromClient'); //触发下一步
    });
  },
  //设置金币钻石数量
  getGemsAndCoins: function getGemsAndCoins() {//改
    // userMgr.getGemsAndCoins(function(data) {
    //     userMgr.gems = data.gems;
    //     userMgr.coins = data.coins;
    // });
  },
  initSeats: function initSeats() {
    var seats = this.netWork.seats;
    console.log('^^^^^^^^^^^^^^^^^^^^^');
    console.log(seats);
    if (!seats) return;

    for (var i = 0; i < seats.length; ++i) {
      this.initSingleSeat(seats[i]);
    }
  },
  initSingleSeat: function initSingleSeat(seat) {
    var index = this.netWork.getLocalIndex(seat.seatindex);
    var isOffline = !seat.online;

    this._seats[index].setInfo(seat.name, seat.score, seat.headimgurl);

    this._seats[index].setReady(seat.ready);

    this._seats[index].setOffline(isOffline);

    this._seats[index].setID(seat.userid);
  },
  onBtnSettingsClicked: function onBtnSettingsClicked() {//改
    //popupMgr.showSettings();
  },
  onBtnBackClicked: function onBtnBackClicked() {
    /** 改 
    alert.show("返回大厅", "返回大厅房间仍会保留，快去邀请大伙来玩吧！", function() {
        cc.director.loadScene("hall");
    }, true);
      */
  },
  onBtnChatClicked: function onBtnChatClicked() {},
  // 点击分享按钮，使用微信分享
  onBtnWeichatClicked: function onBtnWeichatClicked() {//改
    //share.show();
  },
  onBtnDissolveClicked: function onBtnDissolveClicked() {
    /* 改
    alert.show("解散房间", "解散房间不扣金币，是否确定解散？", function() {
        this.netWork.flowerSocket.emit("dispress");
    }, true);
    */
  },
  onClickCloseBd: function onClickCloseBd(e, v) {
    cc.find('Canvas/com_ingame_tips').active = false;
  },
  onClickCloseZhu: function onClickCloseZhu() {
    this._zhu.active = false;
  },
  onBtnExit: function onBtnExit() {
    if (this.netWork.flowerSocket) {
      this.netWork.flowerSocket.emit("LogoutRoom");
    }
  },
  update: function update(dt) {
    var minutes = Math.floor(Date.now() / 1000 / 60);

    if (this._lastMinute != minutes) {
      this._lastMinute = minutes;
      var date = new Date();
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      this._timeLabel.string = "" + h + ":" + m;
    }
  },
  onDestroy: function onDestroy() {},
  //点击看牌按钮
  clickKanpai: function clickKanpai() {
    this.netWork.flowerSocket.emit('kanpai');
    this._kanpai.active = false;
  },
  //点击加注按钮，打开加注界面
  jiazhu: function jiazhu() {
    console.log("打开加注页面");
    var self = this;

    for (var d in self.zhuobj) {
      cc.find('Canvas/zhu/' + self.zhuobj[d]).active = false;
    }

    self._zhu.active = true;
    var bet = this.hasCheckedPai ? 2 : 1;

    for (var i in self.addzhudetail) {
      if (self.inObject(self.addzhudetail[i], self.ops)) {
        self._zhu.getChildByName('zhu' + i).active = true;
        self._zhu.getChildByName('zhu' + i).getChildByName('label').getComponent(cc.Label).string = (self.addzhudetail[i] * bet).toFixed(2);
      } else {
        self._zhu.getChildByName('zhu' + i + '_hui').active = true;
        self._zhu.getChildByName('zhu' + i + '_hui').getChildByName('label').getComponent(cc.Label).string = (self.addzhudetail[i] * bet).toFixed(2);
      }

      ;
    }
  },
  //点击比牌按钮
  bipai: function bipai() {
    this.netWork.flowerSocket.emit('wannaToComparePai'); //显示其他人的pk按钮，选择和谁比牌
    // this.showOthersPkButton();
  },
  clickPkButton: function clickPkButton(userId2) {
    console.log('点击比牌======================================' + userId2);
    this.hideOhersPkButton();
    var userId1 = this.playerInfo.playerId; //自己

    this.netWork.flowerSocket.emit('bipai', {
      userId1: userId1,
      userId2: userId2
    });
  }
}, _cc$Class["qipai"] = function qipai() {
  this.netWork.flowerSocket.emit('qipai');
  cc.find('Canvas/seat0/qiicon').active = true;
  console.log('弃牌');
}, _cc$Class.qipaiResult = function qipaiResult() {
  this._kanpai.active = false;
  this._qipai.active = false;
  this._genzhu.active = false;
  this._jiazhu.active = false;
  this._bipai.active = false;
  this._zhu.active = false;
}, _cc$Class.genzhu = function genzhu() {
  this.netWork.flowerSocket.emit('genzhu');
}, _cc$Class.addzhu = function addzhu(e) {
  var self = this;
  var index = e.target.name.split('zhu')[1];
  var num = self.addzhudetail[index];
  console.log("加注：" + num * 100);
  this.netWork.flowerSocket.emit('addzhu', num * 100);
  this._zhu.active = false;
}, _cc$Class.getpaiRes = function getpaiRes(data) {
  var self = this;
  data = data + 1;
  var type, num, huase_big, huase_small;
  num = (data % 100).toString();

  if (data > 0 && data < 14) {
    type = '04'; //黑桃

    num = num + '-1'; //黑牌
  } else if (data > 100 && data < 114) {
    type = '03'; //红桃

    num = num + '-2'; //红牌
  } else if (data > 200 && data < 214) {
    type = '02'; //梅花

    num = num + '-1'; //黑牌
  } else if (data > 300 && data < 314) {
    type = '01'; //方块

    num = num + '-2'; //红牌
  }

  huase_big = "huase_big" + type;
  huase_small = "huase_small" + type;
  var result = {
    num: self.paigroup.getSpriteFrame(num),
    huase_big: self.paigroup.getSpriteFrame(huase_big),
    huase_small: self.paigroup.getSpriteFrame(huase_small)
  }; // if (num == '1') num = 'A';
  // if (num == '11') num = 'J';
  // if (num == '12') num = 'Q';
  // if (num == '13') num = 'K';

  return result;
}, _cc$Class.onBtnClicked = function onBtnClicked(event) {
  if (event.target.name != "zhu") {
    cc.find('Canvas/zhu').active = false;
  }
}, _cc$Class.freshCurrentZhu = function freshCurrentZhu(current_zhu) {
  this._danzhu.string = "单注：" + (current_zhu / 100).toFixed(2);
}, _cc$Class.freshNumOfLun = function freshNumOfLun(num) {}, _cc$Class.restart = function restart() {
  this.clearEnd();
  this.initView();
  this.initSeats();
}, _cc$Class.freshCircleCount = function freshCircleCount(circleCount) {
  circleCount = circleCount >= 14 ? 14 : circleCount;
  this._lunshu.string = "轮数：" + (circleCount + 1) + "/15";
}, _cc$Class.showPk = function showPk() {
  this._leftLie.active = false;
  this._rightLie.active = false;
  this._pkPanel.active = true; //播放比牌动画

  this._flashAnim.play('pk_shandian');

  this._bipaiAnim.play('bipai');
}, _cc$Class.hidePk = function hidePk(data) {
  var self = this;
  setTimeout(function () {
    self.showLie(data);
    setTimeout(function () {
      self._pkPanel.active = false;
      self.bipaiAnimIndex++; //下一个比牌动画

      if (self.bipaiAnimIndex >= self.bipaiAnimQueue.length) {
        //没有下一个动画了
        if (self.isEnd) {
          //如果标识为游戏结束
          self.showEndAnim();
        } else {
          //如果没有结束,执行比牌系列动画结束后的回调函数
          if (self.bipaiAnimCallback) {
            self.bipaiAnimCallback();
          }
        }
      } else {
        self.showBipaiAnim(); //执行下一个比牌动画
      }
    }, 1000);
  }, 1000);
}, _cc$Class.showLie = function showLie(data) {
  //0-显示左边裂牌 1-显示右边裂牌
  if (data == 1) {
    this._rightLie.active = true;
  } else {
    this._leftLie.active = true;
  }
}, _cc$Class.hideLie = function hideLie() {
  this._leftLie.active = false;
  this._rightLie.active = false;
}, _cc$Class.showOthersPkButton = function showOthersPkButton() {
  for (var i in this._seats) {
    if (i == 0) continue;
    var seat = this._seats[i];
    seat.showPkButton();
  }
}, _cc$Class.showZhuAnim = function showZhuAnim(data, dizhuLevel) {
  console.log("下注动画数据" + JSON.stringify(data)); //下注动画

  if (!data) return;
  var rollTimes = Math.floor(data.addMoney / 100);

  for (var i = 0; i < rollTimes; i++) {
    var x = data.x; //起始点X

    var y = data.y; //起始点Y

    var addMoneyLevel = data.addMoneyLevel;
    var node = this._zhuomian.children[0];
    var newNode = cc.instantiate(node);

    if (typeof dizhuLevel != 'undefined') {
      //如果是底注本身
      newNode = this._zhuomian.children[dizhuLevel];
    } else {
      this._zhuomian.addChild(newNode);
    }

    var zhuObj = cc.find('Canvas/zhu/' + this.zhuobj[addMoneyLevel]);
    var zhuFrameCopy = zhuObj.getComponent(cc.Sprite).spriteFrame;
    newNode.getComponent(cc.Sprite).spriteFrame = zhuFrameCopy;
    newNode.x = x;
    newNode.y = y;
    newNode.active = true;
    var action = cc.moveTo(0.4, cc.v2(Math.random() * 200 - 100, Math.random() * 160 - 80));
    newNode.runAction(action);
  }
}, _cc$Class.hideOhersPkButton = function hideOhersPkButton() {
  var self = this;
  self._tips.node.active = false; // cc.find('Canvas/back').active = false;

  for (var i in this._seats) {
    if (i == 0) continue;
    var seat = this._seats[i];
    seat.hidePkButton();
  }
}, _cc$Class.inObject = function inObject(data, obj) {
  var f = false;

  for (var i in obj) {
    if (data == obj[i]) {
      f = true;
      break;
    }
  }

  return f;
}, _cc$Class.showEndAnim = function showEndAnim() {
  var self = this;
  var data = self.endData;

  if (data) {
    var win_userid = data.winer;
    var holds = data.holds;
    var win_seatIndex = this.netWork.getLocalIndex(this.netWork.getSeatIndexByID(win_userid)); //取得座位

    var win_seat = self._seats[win_seatIndex];
    setTimeout(function () {
      win_seat.showYanhua(); //放烟花
      //筹码移动动画
      // self._zhuomian.active = true;

      for (var i in self._zhuomian.children) {
        var node = self._zhuomian.children[i];
        var action = cc.moveTo(1, cc.v2(win_seat.node.x, win_seat.node.y));
        node.oldX = node.x;
        node.oldY = node.y;
        node.runAction(action);
      }
    }, 1000);
    setTimeout(function () {
      // self._zhuomian.active = false;
      if (self._zhuomian) {
        for (var i in self._zhuomian.children) {
          var node = self._zhuomian.children[i];

          if (node.oldX) {
            node.x = node.oldX;
          }

          if (node.oldY) {
            node.y = node.oldY;
          }
        } //重新开始一局


        self.restart();
      }
    }, 1500);
  }
}, _cc$Class.clearEnd = function clearEnd() {
  var self = this;
  self.isEnd = false;
  self.endData = null;
  self._tips.string = "正在等待下一局游戏";
  self._tips.node.active = true; // cc.find('Canvas/back').active = true;

  var t = setTimeout(function () {
    clearTimeout(t);
    self.netWork.flowerSocket.emit('ready');
  }, 1000);
}, _cc$Class.showBipaiAnim = function showBipaiAnim() {
  var self = this;
  var bipaiData = self.bipaiAnimQueue[self.bipaiAnimIndex];
  var winer = bipaiData['winer'];
  var loser = bipaiData['loser'];
  var lpx = cc.find('Canvas/pk/leftPai').x,
      lpy = cc.find('Canvas/pk/leftPai').y,
      rpx = cc.find('Canvas/pk/rightPai').x,
      rpy = cc.find('Canvas/pk/rightPai').y;
  var WseatIndex = this.netWork.getSeatIndexByID(winer),
      LseatIndex = this.netWork.getSeatIndexByID(loser);
  var WlocalIndex = this.netWork.getLocalIndex(WseatIndex),
      LlocalIndex = this.netWork.getLocalIndex(LseatIndex);
  var b1 = cc.find('Canvas/seat' + WlocalIndex),
      b2 = cc.find('Canvas/seat' + LlocalIndex);
  cc.find('Canvas/pk/leftPai').x = b1.x;
  cc.find('Canvas/pk/leftPai').y = b1.y;
  cc.find('Canvas/pk').active = true;
  cc.find('Canvas/pk/leftPai').active = true;
  cc.find('Canvas/pk/rightPai').x = b2.x;
  cc.find('Canvas/pk/rightPai').y = b2.y;
  cc.find('Canvas/pk/rightPai').active = true;
  var action1 = cc.moveTo(0.4, cc.v2(lpx, lpy)),
      action2 = cc.moveTo(0.4, cc.v2(rpx, rpy));
  cc.find('Canvas/pk/leftPai').runAction(action1);
  cc.find('Canvas/pk/rightPai').runAction(action2);
  self.hideLie();

  if (LlocalIndex == 0) {
    setTimeout(function () {
      cc.find('Canvas/seat0/shuicon').active = true;
    }, 2000);
  }

  setTimeout(function () {
    self.showPk();
    self.hidePk(1);
  }, 400);
}, _cc$Class.allin = function allin() {
  this.netWork.flowerSocket.emit('all_in');
  this._allin.active = false;
}, _cc$Class.doAllin = function doAllin(data, callback) {
  var userid = data.userid; //发起孤注一掷的那个人

  var status = data.status; //0-输了 1-赢了

  var others = data.others; //被比牌的人

  var self = this;
  self.bipaiAnimQueue = [];

  for (var i in self._seats) {
    var seatData = self._seats[i];
    var seatUserId = seatData['_userId'];
    if (!seatUserId || seatUserId == userid || others.indexOf(seatUserId) == -1) continue;
    var winer, loser;

    if (status == 0) {
      winer = seatUserId;
      loser = userid;
    } else {
      winer = userid;
      loser = seatUserId;
    }

    self.bipaiAnimQueue.push({
      winer: winer,
      loser: loser
    }); //比牌队列
  }

  self.bipaiAnimIndex = 0;
  self.showBipaiAnim();

  if (callback) {
    self.bipaiAnimCallback = callback;
  }
}, _cc$Class.disconnectNetWork_Function = function disconnectNetWork_Function() {
  try {
    this.netWork.flowerSocket.disconnect();
  } catch (error) {}

  ;
  this.netWork.flowerSocket = null;
  this.netWork.flower = null; //this.com_MessageBox.active = true;
  //this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您已断线，请重新登录";
}, _cc$Class));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGbG93ZXJcXEZsb3dlck1haW4uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYmxSb29tTm8iLCJ0eXBlIiwiTGFiZWwiLCJfc2VhdHMiLCJfdGltZUxhYmVsIiwiX2xhc3RQbGF5aW5nU2VhdCIsIl9wbGF5aW5nU2VhdCIsIl9sYXN0UGxheVRpbWUiLCJfc2hhcmVDb250ZW50IiwicGFpZ3JvdXAiLCJTcHJpdGVBdGxhcyIsImJhY2siLCJOb2RlIiwiYWRkemh1ZGV0YWlsIiwib3BzIiwiemh1b2JqIiwiY291bnRkb3duIiwiX3RpbWUiLCJiZ0F1ZGlvIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwibG9nIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50Iiwic2V0R2FtZU9ial9GdW5jdGlvbiIsIm5ldFdvcmsiLCJzZXRGbG93ZXJPYmpfRnVuY3Rpb24iLCJnYW1lSW5pdF9GdW5jdGlvbiIsInN0YXJ0IiwiYXVkaW9FbmdpbmUiLCJwbGF5TXVzaWMiLCJpIiwicHVzaCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJfemh1b21pYW4iLCJfZWRpdCIsIl9ncmF5a2FucGFpIiwiZ2V0Q2hpbGRCeU5hbWUiLCJfa2FucGFpIiwiX2dyYXlnZW56aHUiLCJfZ2Vuemh1IiwiX2dyYXlqaWF6aHUiLCJfamlhemh1IiwiX2dyYXlxaXBhaSIsIl9xaXBhaSIsIl9ncmF5YmlwYWkiLCJfYmlwYWkiLCJfYWxsaW4iLCJfYWxsWmh1TGFiZWwiLCJfemh1IiwiX2RhbnpodSIsIl9sdW5zaHUiLCJfcGtQYW5lbCIsIl9mbGFzaEFuaW0iLCJBbmltYXRpb24iLCJfYmlwYWlBbmltIiwiX2xlZnRMaWUiLCJfcmlnaHRMaWUiLCJfdGlwcyIsImFkZENsaWNrRXZlbnQiLCJub2RlIiwiaW5pdFZpZXciLCJpbml0U2VhdHMiLCJjb25zb2xlIiwicmVjb25uZWN0UCIsImZsb3dlclNvY2tldCIsImVtaXQiLCJ0YXJnZXQiLCJjb21wb25lbnQiLCJoYW5kbGVyIiwiaXNSZXBsYWNlIiwiZXZlbnRIYW5kbGVyIiwiRXZlbnRIYW5kbGVyIiwiY2xpY2tFdmVudHMiLCJCdXR0b24iLCJhY3RpdmUiLCJmcmVzaFVzZXJJbmZvIiwiZGF0YSIsInNlbGYiLCJzZWF0cyIsImxlbmd0aCIsInQiLCJjYW5HZW56aHUiLCJzdHJpbmciLCJoYXNDaGVja2VkUGFpIiwiY3VycmVudFpodSIsInRvRml4ZWQiLCJlIiwiY2FuQWRkWmh1IiwiY2FuQmlQYWkiLCJ4aWFaaHVPcHRpb25zIiwiaG9sZHMiLCJzZWF0Iiwic3ByaXRlRnJhbWVzIiwiZ2V0cGFpUmVzIiwiZmFuUGFpIiwiZnJlc2hHYW1lSW5mbyIsImZyZXNoQ3VycmVudFpodSIsImZyZXNoQ2lyY2xlQ291bnQiLCJjaXJjbGVDb3VudCIsInRvdGFsIiwibW9uZXlQb29sIiwiY29tbW9uSW5mbyIsInBsYXllcnMiLCJ0ZW1wIiwidXNlcmlkIiwiY29zdE1vbmV5IiwibW9uZXkiLCJsb29rIiwic2VhdEluZGV4IiwiZ2V0U2VhdEluZGV4QnlJRCIsImxvY2FsSW5kZXgiLCJnZXRMb2NhbEluZGV4IiwiX2thbmljb24iLCJzZXRDb3N0TW9uZXkiLCJzZXRNb25leSIsInpodUNvdW50IiwicGFyc2VJbnQiLCJqIiwiY2hpbGRyZW4iLCJuZXdOb2RlIiwiaW5zdGFudGlhdGUiLCJhZGRDaGlsZCIsInpodU9iaiIsInpodUZyYW1lQ29weSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwieCIsIk1hdGgiLCJyYW5kb20iLCJ5IiwicmVmcmVzaEJ0bnMiLCJ0dXJuIiwic2hvd1hpYURpWmh1QW5pbSIsImNoaWxkcmVuX2Jhb2xpdSIsInJlbW92ZUFsbENoaWxkcmVuIiwiYWRkTW9uZXkiLCJrIiwiX3VzZXJOYW1lIiwiYWRkTW9uZXlMZXZlbCIsInNob3daaHVBbmltIiwiYWRkVXNlciIsInNjb3JlIiwiaW5pdFNpbmdsZVNlYXQiLCJjaGFuZ2VkVXNlclN0YXRlIiwiZ2FtZUJlZ2luIiwiSlNPTiIsInN0cmluZ2lmeSIsImthbnBhaSIsInFpcGFpIiwic3RhdHVzIiwiZ2FtZU15VHVyblB1c2giLCJ4aWFaaHVFeHRyYSIsImFsbEluRmxhZyIsImdhbWVPdmVyTm90aWZ5IiwiY2hhbmdlZEdhbWVUdXJuIiwic2V0VGltZSIsImhpZGVPaGVyc1BrQnV0dG9uIiwiZ2FtZVRpbWVySW5pdENvdW50ZXIiLCJjaGFuZ2VkR2FtZUFjdGlvbiIsImJwIiwiZ3VvTm90aWZ5IiwiZ2VuWmh1Tm90aWZ5Iiwic2hvd0dlblpodSIsImthblBhaU5vdGlmeSIsImdldExvY2FsSW5kZXhCeVVzZXJJZCIsInNob3dLYW5QYWkiLCJqaWFaaHVOb3RpZnkiLCJzaG93SmlhWmh1IiwicWlQYWlOb3RpZnkiLCJ1c2VySWQiLCJzaG93UWlQYWkiLCJ3aW4iLCJ3aW5lciIsImVuZERhdGEiLCJpc0VuZCIsInNob3dFbmRBbmltIiwiZ2FtZU1vbmV5UG9vbCIsIm1lc3NhZ2VOb3RpZnkiLCJtZXNzYWdlIiwiZ2FtZUNpcmNsZUNvdW50IiwiZ2FtZVVzZXJJbkJpUGFpUmVzdWx0IiwibG9zZXIiLCJiaXBhaUFuaW1RdWV1ZSIsImJpcGFpQW5pbUluZGV4Iiwic2hvd0JpcGFpQW5pbSIsImdhbWVXYW5uYVRvQ29tcGFyZSIsInNob3dQa0J1dHRvbiIsImdhbWVDb3VudERvd24iLCJjb3VudERvd24iLCJnYW1lQW50aVJlc3VsdHMiLCJiaXBhaURhdGEiLCJ1c2VySW5mb0J5SWQiLCJnYW1lSW5mb0J5SWQiLCJleGl0Um9vbSIsImdldEdlbXNBbmRDb2lucyIsIm5vTW9uZXlFeGl0Iiwic2JJbkFsbEluIiwiZG9BbGxpbiIsImluZGV4Iiwic2VhdGluZGV4IiwiaXNPZmZsaW5lIiwib25saW5lIiwic2V0SW5mbyIsIm5hbWUiLCJoZWFkaW1ndXJsIiwic2V0UmVhZHkiLCJyZWFkeSIsInNldE9mZmxpbmUiLCJzZXRJRCIsIm9uQnRuU2V0dGluZ3NDbGlja2VkIiwib25CdG5CYWNrQ2xpY2tlZCIsIm9uQnRuQ2hhdENsaWNrZWQiLCJvbkJ0bldlaWNoYXRDbGlja2VkIiwib25CdG5EaXNzb2x2ZUNsaWNrZWQiLCJvbkNsaWNrQ2xvc2VCZCIsInYiLCJvbkNsaWNrQ2xvc2VaaHUiLCJvbkJ0bkV4aXQiLCJ1cGRhdGUiLCJkdCIsIm1pbnV0ZXMiLCJmbG9vciIsIkRhdGUiLCJub3ciLCJfbGFzdE1pbnV0ZSIsImRhdGUiLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsIm9uRGVzdHJveSIsImNsaWNrS2FucGFpIiwiamlhemh1IiwiZCIsImJldCIsImluT2JqZWN0IiwiYmlwYWkiLCJjbGlja1BrQnV0dG9uIiwidXNlcklkMiIsInVzZXJJZDEiLCJwbGF5ZXJJZCIsInFpcGFpUmVzdWx0IiwiZ2Vuemh1IiwiYWRkemh1Iiwic3BsaXQiLCJudW0iLCJodWFzZV9iaWciLCJodWFzZV9zbWFsbCIsInRvU3RyaW5nIiwicmVzdWx0IiwiZ2V0U3ByaXRlRnJhbWUiLCJvbkJ0bkNsaWNrZWQiLCJldmVudCIsImN1cnJlbnRfemh1IiwiZnJlc2hOdW1PZkx1biIsInJlc3RhcnQiLCJjbGVhckVuZCIsInNob3dQayIsInBsYXkiLCJoaWRlUGsiLCJzZXRUaW1lb3V0Iiwic2hvd0xpZSIsImJpcGFpQW5pbUNhbGxiYWNrIiwiaGlkZUxpZSIsInNob3dPdGhlcnNQa0J1dHRvbiIsImRpemh1TGV2ZWwiLCJyb2xsVGltZXMiLCJhY3Rpb24iLCJtb3ZlVG8iLCJ2MiIsInJ1bkFjdGlvbiIsImhpZGVQa0J1dHRvbiIsIm9iaiIsImYiLCJ3aW5fdXNlcmlkIiwid2luX3NlYXRJbmRleCIsIndpbl9zZWF0Iiwic2hvd1lhbmh1YSIsIm9sZFgiLCJvbGRZIiwiY2xlYXJUaW1lb3V0IiwibHB4IiwibHB5IiwicnB4IiwicnB5IiwiV3NlYXRJbmRleCIsIkxzZWF0SW5kZXgiLCJXbG9jYWxJbmRleCIsIkxsb2NhbEluZGV4IiwiYjEiLCJiMiIsImFjdGlvbjEiLCJhY3Rpb24yIiwiYWxsaW4iLCJjYWxsYmFjayIsIm90aGVycyIsInNlYXREYXRhIiwic2VhdFVzZXJJZCIsImluZGV4T2YiLCJkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbiIsImRpc2Nvbm5lY3QiLCJlcnJvciIsImZsb3dlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUg7QUFDSSxhQUFTRCxFQUFFLENBQUNFLFNBRGhCO0FBRUlDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZGLEtBREg7QUFLUkMsSUFBQUEsTUFBTSxFQUFFLEVBTEE7QUFNUkMsSUFBQUEsVUFBVSxFQUFFLElBTko7QUFPUkMsSUFBQUEsZ0JBQWdCLEVBQUUsSUFQVjtBQVFSQyxJQUFBQSxZQUFZLEVBQUUsSUFSTjtBQVNSQyxJQUFBQSxhQUFhLEVBQUUsSUFUUDtBQVVSQyxJQUFBQSxhQUFhLEVBQUUsSUFWUDtBQVdSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5SLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDYztBQUZILEtBWEY7QUFlUkMsSUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixJQWZEO0FBZ0JSQyxJQUFBQSxZQUFZLEVBQUUsSUFoQk47QUFpQlJDLElBQUFBLEdBQUcsRUFBRSxJQWpCRztBQWtCUkMsSUFBQUEsTUFBTSxFQUFFLElBbEJBO0FBbUJSQyxJQUFBQSxTQUFTLEVBQUVwQixFQUFFLENBQUNNLEtBbkJOO0FBb0JSZSxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQXBCQTtBQXFCUkMsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMakIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUN1QjtBQUZKO0FBckJELEdBRmhCO0FBNEJJQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEJ4QixJQUFBQSxFQUFFLENBQUN5QixHQUFILENBQU8sdURBQVA7QUFD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Q0E7QUFDSCxDQWg5QkwiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsYmxSb29tTm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9zZWF0czogW10sXHJcbiAgICAgICAgX3RpbWVMYWJlbDogbnVsbCxcclxuICAgICAgICBfbGFzdFBsYXlpbmdTZWF0OiBudWxsLFxyXG4gICAgICAgIF9wbGF5aW5nU2VhdDogbnVsbCxcclxuICAgICAgICBfbGFzdFBsYXlUaW1lOiBudWxsLFxyXG4gICAgICAgIF9zaGFyZUNvbnRlbnQ6IG51bGwsXHJcbiAgICAgICAgcGFpZ3JvdXA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhY2s6IGNjLk5vZGUsXHJcbiAgICAgICAgYWRkemh1ZGV0YWlsOiBudWxsLFxyXG4gICAgICAgIG9wczogbnVsbCxcclxuICAgICAgICB6aHVvYmo6IG51bGwsXHJcbiAgICAgICAgY291bnRkb3duOiBjYy5MYWJlbCxcclxuICAgICAgICBfdGltZTogLTEsXHJcbiAgICAgICAgYmdBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmxvZygn6L+b5YWl54K46YeR6IqxPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uc2V0R2FtZU9ial9GdW5jdGlvbih0aGlzKTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsgPSByZXF1aXJlKFwiRmxvd2VyTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0V29yay5zZXRGbG93ZXJPYmpfRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lSW5pdF9GdW5jdGlvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnQXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnYW1lSW5pdF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlYXRzLnB1c2goY2MuZmluZChcIkNhbnZhcy9zZWF0XCIgKyBpKS5nZXRDb21wb25lbnQoXCJGbG93ZXJTZWF0XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGltZUxhYmVsID0gY2MuZmluZChcIkNhbnZhcy90aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5femh1b21pYW4gPSBjYy5maW5kKFwiQ2FudmFzL3podW9taWFuXCIpO1xyXG4gICAgICAgIHRoaXMuemh1b2JqID0gWyd6aHUwJywgJ3podTEnLCAnemh1MicsICd6aHUzJywgJ3podTBfaHVpJywgJ3podTFfaHVpJywgJ3podTJfaHVpJywgJ3podTNfaHVpJ107XHJcbiAgICAgICAgdGhpcy5fZWRpdCA9IGNjLmZpbmQoXCJDYW52YXMvZWRpdFwiKTtcclxuICAgICAgICB0aGlzLl9ncmF5a2FucGFpID0gdGhpcy5fZWRpdC5nZXRDaGlsZEJ5TmFtZSgnZ3JheWthbnBhaScpO1xyXG4gICAgICAgIHRoaXMuX2thbnBhaSA9IHRoaXMuX2VkaXQuZ2V0Q2hpbGRCeU5hbWUoJ2thbnBhaScpO1xyXG4gICAgICAgIHRoaXMuX2dyYXlnZW56aHUgPSB0aGlzLl9lZGl0LmdldENoaWxkQnlOYW1lKCdncmF5Z2Vuemh1Jyk7XHJcbiAgICAgICAgdGhpcy5fZ2Vuemh1ID0gdGhpcy5fZWRpdC5nZXRDaGlsZEJ5TmFtZSgnZ2Vuemh1Jyk7XHJcbiAgICAgICAgdGhpcy5fZ3JheWppYXpodSA9IHRoaXMuX2VkaXQuZ2V0Q2hpbGRCeU5hbWUoJ2dyYXlqaWF6aHUnKTtcclxuICAgICAgICB0aGlzLl9qaWF6aHUgPSB0aGlzLl9lZGl0LmdldENoaWxkQnlOYW1lKCdqaWF6aHUnKTtcclxuICAgICAgICB0aGlzLl9ncmF5cWlwYWkgPSB0aGlzLl9lZGl0LmdldENoaWxkQnlOYW1lKCdncmF5cWlwYWknKTtcclxuICAgICAgICB0aGlzLl9xaXBhaSA9IHRoaXMuX2VkaXQuZ2V0Q2hpbGRCeU5hbWUoJ3FpcGFpJyk7XHJcbiAgICAgICAgdGhpcy5fZ3JheWJpcGFpID0gdGhpcy5fZWRpdC5nZXRDaGlsZEJ5TmFtZSgnZ3JheWJpcGFpJyk7XHJcbiAgICAgICAgdGhpcy5fYmlwYWkgPSB0aGlzLl9lZGl0LmdldENoaWxkQnlOYW1lKCdiaXBhaScpO1xyXG4gICAgICAgIHRoaXMuX2FsbGluID0gdGhpcy5fZWRpdC5nZXRDaGlsZEJ5TmFtZSgnYWxsaW4nKTtcclxuICAgICAgICB0aGlzLl9hbGxaaHVMYWJlbCA9IGNjLmZpbmQoXCJDYW52YXMvem9uZ3hpYXpodS9sYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpOyAvL+eJjOahjOS4iuaJgOacieeahOazqFxyXG4gICAgICAgIHRoaXMuX3podSA9IGNjLmZpbmQoXCJDYW52YXMvemh1XCIpOyAvL+WKoOazqOeVjOmdolxyXG4gICAgICAgIHRoaXMuX2RhbnpodSA9IGNjLmZpbmQoXCJDYW52YXMvZGFuemh1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7IC8v5Y2V5rOo5pi+56S6XHJcbiAgICAgICAgdGhpcy5fbHVuc2h1ID0gY2MuZmluZChcIkNhbnZhcy9sdW5zaHVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTsgLy/ova7mlbDmmL7npLpcclxuICAgICAgICB0aGlzLl9wa1BhbmVsID0gY2MuZmluZChcIkNhbnZhcy9wa1wiKTsgLy9wa+eVjOmdolxyXG4gICAgICAgIHRoaXMuX2ZsYXNoQW5pbSA9IGNjLmZpbmQoXCJDYW52YXMvcGsvc2hhbmRpYW4vcGtfc2hhbmRpYW5cIikuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7IC8v6Zeq55S15Yqo55S7XHJcbiAgICAgICAgdGhpcy5fYmlwYWlBbmltID0gY2MuZmluZChcIkNhbnZhcy9way9iaXBhaVwiKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTsgLy/mr5TniYzliqjnlLtcclxuICAgICAgICB0aGlzLl9sZWZ0TGllID0gdGhpcy5fcGtQYW5lbC5nZXRDaGlsZEJ5TmFtZSgnbGVmdExpZScpO1xyXG4gICAgICAgIHRoaXMuX3JpZ2h0TGllID0gdGhpcy5fcGtQYW5lbC5nZXRDaGlsZEJ5TmFtZSgncmlnaHRMaWUnKTtcclxuICAgICAgICB0aGlzLl90aXBzID0gY2MuZmluZChcIkNhbnZhcy90aXBzXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7IC8vdGlwc+aYvuekulxyXG4gICAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudCh0aGlzLl9rYW5wYWksIHRoaXMubm9kZSwgXCJGbG93ZXJNYWluXCIsIFwiY2xpY2tLYW5wYWlcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50KHRoaXMuYmFjaywgdGhpcy5ub2RlLCBcIkZsb3dlck1haW5cIiwgXCJvbkJ0bkV4aXRcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50KHRoaXMuX3FpcGFpLCB0aGlzLm5vZGUsIFwiRmxvd2VyTWFpblwiLCBcInFpcGFpXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudCh0aGlzLl9iaXBhaSwgdGhpcy5ub2RlLCBcIkZsb3dlck1haW5cIiwgXCJiaXBhaVwiKTtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQodGhpcy5fZ2Vuemh1LCB0aGlzLm5vZGUsIFwiRmxvd2VyTWFpblwiLCBcImdlbnpodVwiKTtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQodGhpcy5famlhemh1LCB0aGlzLm5vZGUsIFwiRmxvd2VyTWFpblwiLCBcImppYXpodVwiKTtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQoY2MuZmluZCgnQ2FudmFzL3podS96aHUwJyksIHRoaXMubm9kZSwgXCJGbG93ZXJNYWluXCIsIFwiYWRkemh1XCIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudChjYy5maW5kKCdDYW52YXMvemh1L3podTEnKSwgdGhpcy5ub2RlLCBcIkZsb3dlck1haW5cIiwgXCJhZGR6aHVcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50KGNjLmZpbmQoJ0NhbnZhcy96aHUvemh1MicpLCB0aGlzLm5vZGUsIFwiRmxvd2VyTWFpblwiLCBcImFkZHpodVwiKTtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQoY2MuZmluZCgnQ2FudmFzL3podS96aHUzJyksIHRoaXMubm9kZSwgXCJGbG93ZXJNYWluXCIsIFwiYWRkemh1XCIpO1xyXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICAgICAgICB0aGlzLmluaXRTZWF0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmmK/kuI3mmK/mlq3nur/ph43ov57vvJonICsgdGhpcy5uZXRXb3JrLnJlY29ubmVjdFApO1xyXG4gICAgICAgIC8v5pat57q/5pivMiDkuI3mlq3nur8xXHJcbiAgICAgICAgaWYgKHRoaXMubmV0V29yay5yZWNvbm5lY3RQID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmZsb3dlclNvY2tldC5lbWl0KFwiZ2V0VXNlckluZm9CeVVzZXJpZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmZsb3dlclNvY2tldC5lbWl0KFwiZ2V0R2FtZUluZm9CeVVzZXJpZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLmZsb3dlclNvY2tldC5lbWl0KFwicmVhZHlcIik7XHJcbiAgICAgICAgLy9hdWRpb01nci5wbGF5QkdNKFwiYmFjay5tcDNcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENsaWNrRXZlbnQ6IGZ1bmN0aW9uIChub2RlLCB0YXJnZXQsIGNvbXBvbmVudCwgaGFuZGxlciwgaXNSZXBsYWNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29tcG9uZW50ICsgXCI6XCIgKyBoYW5kbGVyKTtcclxuICAgICAgICB2YXIgZXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBldmVudEhhbmRsZXIudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIGV2ZW50SGFuZGxlci5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgZXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgIHZhciBjbGlja0V2ZW50cyA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHM7XHJcbiAgICAgICAgaWYgKGlzUmVwbGFjZSkge1xyXG4gICAgICAgICAgICAvL+aYr+WQpuimhuebluaOieS5i+WJjeeahOS6i+S7tlxyXG4gICAgICAgICAgICBjbGlja0V2ZW50c1swXSA9IGV2ZW50SGFuZGxlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGlja0V2ZW50cy5wdXNoKGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0VmlldzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2thbnBhaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9xaXBhaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nZW56aHUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYWxsaW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5famlhemh1LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JpcGFpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BrUGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5femh1b21pYW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGlwcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgZnJlc2hVc2VySW5mbzogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5pat57q/6YeN6L+e5ZCO55qE55So5oi35L+h5oGvJywgZGF0YSk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzZWF0cyA9IHRoaXMubmV0V29yay5zZWF0cztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMzsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvc2VhdCcgKyBpICsgJy9mdXBhaScgKyB0KS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvZGFuemh1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9sdW5zaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3pvbmd4aWF6aHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLl90aXBzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gY2MuZmluZCgnQ2FudmFzL2JhY2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmNvdW50ZG93bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuX3FpcGFpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2VsZi5fZ2Vuemh1LmFjdGl2ZSA9IGRhdGEuY2FuR2Vuemh1O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2dlbnpodS5nZXRDaGlsZEJ5TmFtZSgnbnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLmhhc0NoZWNrZWRQYWkgPyAoZGF0YS5jdXJyZW50Wmh1ICogMiAvIDEwMCkudG9GaXhlZCgyKSA6IChkYXRhLmN1cnJlbnRaaHUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5peg6KeG5rKh5pyJY3VycmVudFpodeWtl+autScsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLl9rYW5wYWkuYWN0aXZlID0gIWRhdGEuaGFzQ2hlY2tlZFBhaTtcclxuICAgICAgICBzZWxmLl9qaWF6aHUuYWN0aXZlID0gZGF0YS5jYW5BZGRaaHU7XHJcbiAgICAgICAgc2VsZi5fYmlwYWkuYWN0aXZlID0gZGF0YS5jYW5CaVBhaTtcclxuICAgICAgICBzZWxmLm9wcyA9IGRhdGEueGlhWmh1T3B0aW9ucztcclxuICAgICAgICBzZWxmLmFkZHpodWRldGFpbCA9IGRhdGEueGlhWmh1T3B0aW9ucztcclxuICAgICAgICB2YXIgaG9sZHMgPSBkYXRhLmhvbGRzO1xyXG4gICAgICAgIGlmIChkYXRhLmhhc0NoZWNrZWRQYWkgJiYgaG9sZHMgJiYgaG9sZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc2VhdCA9IHNlbGYuX3NlYXRzWzBdO1xyXG4gICAgICAgICAgICB2YXIgc3ByaXRlRnJhbWVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVGcmFtZXMucHVzaChzZWxmLmdldHBhaVJlcyhob2xkc1tpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlYXQuZmFuUGFpKHNwcml0ZUZyYW1lcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZyZXNoR2FtZUluZm86IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluaWree6v+mHjei/nuWQjueahOa4uOaIj+S/oeaBrycsIGRhdGEpO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLm9wcykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmZyZXNoQ3VycmVudFpodShkYXRhLmN1cnJlbnRaaHUpO1xyXG4gICAgICAgIHRoaXMuZnJlc2hDaXJjbGVDb3VudChkYXRhLmNpcmNsZUNvdW50KTtcclxuICAgICAgICB0aGlzLl96aHVvbWlhbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciB0b3RhbCA9IGRhdGEubW9uZXlQb29sO1xyXG4gICAgICAgIHNlbGYuX2FsbFpodUxhYmVsLnN0cmluZyA9ICh0b3RhbCAvIDEwMCkudG9GaXhlZCgyKTsgLy/mgLvmlbBcclxuICAgICAgICAvL2ZyZXNo5YW25LuW5Lq655qE5pWw5o2uXHJcbiAgICAgICAgdmFyIGNvbW1vbkluZm8gPSBkYXRhLnBsYXllcnM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgaW4gY29tbW9uSW5mbykge1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IGNvbW1vbkluZm9baV07XHJcbiAgICAgICAgICAgIHZhciB1c2VyaWQgPSB0ZW1wLnVzZXJpZDtcclxuICAgICAgICAgICAgdmFyIGNvc3RNb25leSA9IHRlbXAuY29zdE1vbmV5OyAvL+S4i+eahOazqFxyXG4gICAgICAgICAgICB2YXIgbW9uZXkgPSAodGVtcC5tb25leSAqIDAuMDEpLnRvRml4ZWQoMik7IC8v5omA5pyJ55So55qE6ZKxXHJcbiAgICAgICAgICAgIHZhciBsb29rID0gdGVtcC5oYXNDaGVja2VkUGFpO1xyXG4gICAgICAgICAgICAvL+WIt+aWsOi/meS4quS6uueahOS/oeaBr1xyXG4gICAgICAgICAgICB2YXIgc2VhdEluZGV4ID0gdGhpcy5uZXRXb3JrLmdldFNlYXRJbmRleEJ5SUQodXNlcmlkKTtcclxuICAgICAgICAgICAgdmFyIGxvY2FsSW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleChzZWF0SW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgc2VhdCA9IHNlbGYuX3NlYXRzW2xvY2FsSW5kZXhdO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgc2VhdC5fa2FuaWNvbi5hY3RpdmUgPSBsb29rO1xyXG4gICAgICAgICAgICAgICAgc2VhdC5zZXRDb3N0TW9uZXkoY29zdE1vbmV5KTtcclxuICAgICAgICAgICAgICAgIHNlYXQuc2V0TW9uZXkobW9uZXkpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+iOt+WPluaWree6v+mHjei/nuWQjueahOa4uOaIj+S/oeaBr2VycicsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB6aHVDb3VudCA9IHBhcnNlSW50KHRvdGFsIC8gMTAwKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHpodUNvdW50OyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBzZWxmLl96aHVvbWlhbi5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBjYy5pbnN0YW50aWF0ZShub2RlKTtcclxuICAgICAgICAgICAgc2VsZi5femh1b21pYW4uYWRkQ2hpbGQobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB6aHVPYmogPSBjYy5maW5kKCdDYW52YXMvemh1LycgKyB0aGlzLnpodW9ialswXSk7XHJcbiAgICAgICAgICAgIGxldCB6aHVGcmFtZUNvcHkgPSB6aHVPYmouZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIG5ld05vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB6aHVGcmFtZUNvcHk7XHJcbiAgICAgICAgICAgIG5ld05vZGUueCA9IE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDA7XHJcbiAgICAgICAgICAgIG5ld05vZGUueSA9IE1hdGgucmFuZG9tKCkgKiAxNjAgLSA4MDtcclxuICAgICAgICAgICAgbmV3Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2hCdG5zOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzZWF0cyA9IHRoaXMubmV0V29yay5zZWF0cztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMzsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvc2VhdCcgKyBpICsgJy9mdXBhaScgKyB0KS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvZGFuemh1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9sdW5zaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3pvbmd4aWF6aHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90aXBzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb3VudGRvd24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZXNoQ3VycmVudFpodShkYXRhLmN1cnJlbnRaaHUpO1xyXG4gICAgICAgIHRoaXMuZnJlc2hDaXJjbGVDb3VudChkYXRhLnR1cm4pO1xyXG4gICAgICAgIHRoaXMuX2thbnBhaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3FpcGFpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZ2Vuemh1LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ppYXpodS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9iaXBhaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dYaWFEaVpodUFuaW0oZGF0YS5jdXJyZW50Wmh1KTsgLy/kuIvlupXms6jliqjnlLtcclxuICAgIH0sXHJcbiAgICBzaG93WGlhRGlaaHVBbmltOiBmdW5jdGlvbiAoY3VycmVudFpodSkge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbl9iYW9saXUgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuX3podW9taWFuLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDwgNSkge1xyXG4gICAgICAgICAgICAgICAgLy/lj6rnlZk15Liq5bqV5rOo55qE562556CBXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbl9iYW9saXUucHVzaCh0aGlzLl96aHVvbWlhbi5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5femh1b21pYW4uY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3podW9taWFuLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaiBpbiBjaGlsZHJlbl9iYW9saXUpIHtcclxuICAgICAgICAgICAgdGhpcy5femh1b21pYW4uYWRkQ2hpbGQoY2hpbGRyZW5fYmFvbGl1W2pdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5femh1b21pYW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgYWRkTW9uZXkgPSAxMDA7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRaaHUpIHtcclxuICAgICAgICAgICAgYWRkTW9uZXkgPSBwYXJzZUludChjdXJyZW50Wmh1KSAqIDAuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzLl9zZWF0cykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3NlYXRzW2tdLl91c2VyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgeDogdGhpcy5fc2VhdHNba10ubm9kZS54LFxyXG4gICAgICAgICAgICAgICAgeTogdGhpcy5fc2VhdHNba10ubm9kZS55LFxyXG4gICAgICAgICAgICAgICAgYWRkTW9uZXk6IGFkZE1vbmV5LFxyXG4gICAgICAgICAgICAgICAgYWRkTW9uZXlMZXZlbDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1podUFuaW0oZGF0YSwgayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZFVzZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgZGF0YS5zY29yZSA9IChkYXRhLnNjb3JlICogMC4wMSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmluaXRTaW5nbGVTZWF0KGRhdGEpO1xyXG4gICAgfSxcclxuICAgIGNoYW5nZWRVc2VyU3RhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbml0U2luZ2xlU2VhdChkYXRhKTtcclxuICAgIH0sXHJcbiAgICBnYW1lQmVnaW46IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2MubG9nKCflvIDlp4vmuLjmiI89PT09PT09PT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQnRucyhkYXRhKTtcclxuICAgIH0sXHJcbiAgICBrYW5wYWk6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5femh1LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBob2xkcyA9IGRhdGEuaG9sZHM7XHJcbiAgICAgICAgdmFyIHNlYXQgPSB0aGlzLl9zZWF0c1swXTtcclxuICAgICAgICB2YXIgc3ByaXRlRnJhbWVzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgc3ByaXRlRnJhbWVzLnB1c2godGhpcy5nZXRwYWlSZXMoaG9sZHNbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VhdC5mYW5QYWkoc3ByaXRlRnJhbWVzKTtcclxuICAgICAgICB2YXIgY3VycmVudFpodSA9IGRhdGEuY3VycmVudFpodTtcclxuICAgICAgICB0aGlzLl9nZW56aHUuZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKGN1cnJlbnRaaHUgKiAyIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuaGFzQ2hlY2tlZFBhaSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcWlwYWk6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09ICdzaHUnKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zZWF0MC9zaHVpY29uJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvc2VhdDAvcWlpY29uJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZ3JheXFpcGFpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcWlwYWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGhvbGRzID0gZGF0YS5ob2xkcztcclxuICAgICAgICB2YXIgc2VhdCA9IHRoaXMuX3NlYXRzWzBdO1xyXG4gICAgICAgIHZhciBzcHJpdGVGcmFtZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBzcHJpdGVGcmFtZXMucHVzaCh0aGlzLmdldHBhaVJlcyhob2xkc1tpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWF0LmZhblBhaShzcHJpdGVGcmFtZXMpO1xyXG4gICAgfSxcclxuICAgIGdhbWVNeVR1cm5QdXNoOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L2u5Yiw6Ieq5bex5raI5oGv77yaXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdGhpcy5hZGR6aHVkZXRhaWwgPSBkYXRhLnhpYVpodU9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5vcHMgPSBkYXRhLnhpYVpodUV4dHJhLm9wcztcclxuICAgICAgICAvL+WPr+aTjeS9nOaMiemSrlxyXG4gICAgICAgIGlmIChkYXRhLmNhbkFkZFpodSkge1xyXG4gICAgICAgICAgICB0aGlzLl9qaWF6aHUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuY2FuR2Vuemh1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbnpodS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFpodSA9IGRhdGEuY3VycmVudFpodTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaGFzQ2hlY2tlZFBhaSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFpodSA9IGN1cnJlbnRaaHUgKiAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGFzQ2hlY2tlZFBhaSA9IGRhdGEuaGFzQ2hlY2tlZFBhaTtcclxuICAgICAgICAgICAgdGhpcy5fZ2Vuemh1LmdldENoaWxkQnlOYW1lKCdudW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChjdXJyZW50Wmh1IC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5jYW5CaVBhaSkge1xyXG4gICAgICAgICAgICB0aGlzLl9iaXBhaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5hbGxJbkZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWxsaW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fZ3JheWdlbnpodS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9hbGxpbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2FtZU92ZXJOb3RpZnk6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gdmFyIGkgPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleCh0aGlzLm5ldFdvcmsuZ2V0U2VhdEluZGV4QnlJRChkYXRhKSk7XHJcbiAgICAgICAgLy8gY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgaSArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCA1OyB0KyspIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgdCArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3podS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VkR2FtZVR1cm46IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleCh0aGlzLm5ldFdvcmsuZ2V0U2VhdEluZGV4QnlJRChkYXRhKSk7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCA1OyB0KyspIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgdCArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zZWF0JyArIGkgKyAnL3RvZ2dsZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaV0uc2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMuaGlkZU9oZXJzUGtCdXR0b24oKTtcclxuICAgICAgICB0aGlzLl90aXBzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGkgIT0gMCkge1xyXG4gICAgICAgICAgICAvL+WmguaenOayoeaciei9ruWIsOiHquW3seaTjeS9nFxyXG4gICAgICAgICAgICB0aGlzLl9nZW56aHUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ppYXpodS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYmlwYWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3podS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2FtZVRpbWVySW5pdENvdW50ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleCh0aGlzLm5ldFdvcmsuZ2V0U2VhdEluZGV4QnlJRChkYXRhKSk7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCA1OyB0KyspIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgdCArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zZWF0JyArIGkgKyAnL3RvZ2dsZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaV0uc2V0VGltZSgpO1xyXG4gICAgfSxcclxuICAgIGNoYW5nZWRHYW1lQWN0aW9uOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vVE9ETzrmnI3liqHlmajliKTmlq3mmK/lkKbog73kuIvms6hcclxuICAgICAgICB2YXIgYnAgPSBjYy5maW5kKCdDYW52YXMvZWRpdC9iaXBhaScpO1xyXG4gICAgICAgIC8vIGlmIChkYXRhLnhpYVpodU9wdGlvbnMpIHRoaXMuYWRkemh1ZGV0YWlsID0gZGF0YS54aWFaaHVPcHRpb25zO1xyXG4gICAgICAgIC8vIGlmIChkYXRhLnhpYVpodUV4dHJhLm9wcykgdGhpcy5vcHMgPSBkYXRhLnhpYVpodUV4dHJhLm9wcztcclxuICAgICAgICBpZiAoZGF0YS5jYW5CaVBhaSkge1xyXG4gICAgICAgICAgICBicC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBndW9Ob3RpZnk6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQwL3RvZ2dsZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGdlblpodU5vdGlmeTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgdXNlcmlkID0gZGF0YS51c2VyaWQ7XHJcbiAgICAgICAgdmFyIHNlYXRJbmRleCA9IHRoaXMubmV0V29yay5nZXRTZWF0SW5kZXhCeUlEKHVzZXJpZCk7XHJcbiAgICAgICAgdmFyIGxvY2FsSW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleChzZWF0SW5kZXgpO1xyXG4gICAgICAgIHZhciBzZWF0ID0gdGhpcy5fc2VhdHNbbG9jYWxJbmRleF07XHJcbiAgICAgICAgc2VhdC5zaG93R2VuWmh1KCk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRaaHUgPSBkYXRhLmN1cnJlbnRaaHU7XHJcbiAgICAgICAgdmFyIGhhc0NoZWNrZWRQYWkgPSBkYXRhLmhhc0NoZWNrZWRQYWk7XHJcbiAgICAgICAgdmFyIGFkZE1vbmV5ID0gZGF0YS5hZGRNb25leTtcclxuICAgICAgICB2YXIgYWRkTW9uZXlMZXZlbCA9IGRhdGEuYWRkTW9uZXlMZXZlbDtcclxuICAgICAgICB0aGlzLmZyZXNoQ3VycmVudFpodShjdXJyZW50Wmh1KTtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgeDogc2VhdC5ub2RlLngsXHJcbiAgICAgICAgICAgIHk6IHNlYXQubm9kZS55LFxyXG4gICAgICAgICAgICBhZGRNb25leTogYWRkTW9uZXksXHJcbiAgICAgICAgICAgIGFkZE1vbmV5TGV2ZWw6IGFkZE1vbmV5TGV2ZWwsXHJcbiAgICAgICAgICAgIGhhc0NoZWNrZWRQYWk6IGhhc0NoZWNrZWRQYWlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93Wmh1QW5pbShkYXRhKTtcclxuICAgIH0sXHJcbiAgICBrYW5QYWlOb3RpZnk6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIHVzZXJpZCA9IGRhdGE7XHJcbiAgICAgICAgdmFyIGxvY2FsSW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleEJ5VXNlcklkKHVzZXJpZCk7XHJcbiAgICAgICAgdmFyIHNlYXQgPSB0aGlzLl9zZWF0c1tsb2NhbEluZGV4XTtcclxuICAgICAgICBzZWF0LnNob3dLYW5QYWkoKTtcclxuICAgIH0sXHJcbiAgICBqaWFaaHVOb3RpZnk6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIHVzZXJpZCA9IGRhdGEudXNlcmlkO1xyXG4gICAgICAgIHZhciBsb2NhbEluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZCh1c2VyaWQpO1xyXG4gICAgICAgIHZhciBzZWF0ID0gdGhpcy5fc2VhdHNbbG9jYWxJbmRleF07XHJcbiAgICAgICAgc2VhdC5zaG93SmlhWmh1KCk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRaaHUgPSBkYXRhLmN1cnJlbnRaaHU7XHJcbiAgICAgICAgdmFyIGhhc0NoZWNrZWRQYWkgPSBkYXRhLmhhc0NoZWNrZWRQYWk7XHJcbiAgICAgICAgdmFyIGFkZE1vbmV5ID0gZGF0YS5hZGRNb25leTtcclxuICAgICAgICB2YXIgYWRkTW9uZXlMZXZlbCA9IGRhdGEuYWRkTW9uZXlMZXZlbDtcclxuICAgICAgICB0aGlzLmZyZXNoQ3VycmVudFpodShjdXJyZW50Wmh1KTtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgeDogc2VhdC5ub2RlLngsXHJcbiAgICAgICAgICAgIHk6IHNlYXQubm9kZS55LFxyXG4gICAgICAgICAgICBhZGRNb25leTogYWRkTW9uZXksXHJcbiAgICAgICAgICAgIGFkZE1vbmV5TGV2ZWw6IGFkZE1vbmV5TGV2ZWwsXHJcbiAgICAgICAgICAgIGhhc0NoZWNrZWRQYWk6IGhhc0NoZWNrZWRQYWlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93Wmh1QW5pbShkYXRhKTtcclxuICAgIH0sXHJcbiAgICBxaVBhaU5vdGlmeTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdmFyIHVzZXJpZCA9IGRhdGEudXNlcklkO1xyXG4gICAgICAgIHZhciBsb2NhbEluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZCh1c2VyaWQpO1xyXG4gICAgICAgIHZhciBzZWF0ID0gdGhpcy5fc2VhdHNbbG9jYWxJbmRleF07XHJcbiAgICAgICAgc2VhdC5zaG93UWlQYWkoZGF0YS5zdGF0dXMpO1xyXG4gICAgfSxcclxuICAgIHdpbjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvL+i1ouS6huS4gOWxgFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCfotaLkuobkuIDlsYAnLCBkYXRhKTtcclxuICAgICAgICAvL+i1oueahOS6uuaYvuekuuaJi+eJjFxyXG4gICAgICAgIHZhciB1c2VyaWQgPSBkYXRhLndpbmVyO1xyXG4gICAgICAgIHZhciBsb2NhbEluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZCh1c2VyaWQpO1xyXG4gICAgICAgIHZhciBzZWF0ID0gdGhpcy5fc2VhdHNbbG9jYWxJbmRleF07XHJcbiAgICAgICAgdmFyIGhvbGRzID0gZGF0YS5ob2xkcztcclxuICAgICAgICB2YXIgc3ByaXRlRnJhbWVzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgc3ByaXRlRnJhbWVzLnB1c2godGhpcy5nZXRwYWlSZXMoaG9sZHNbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VhdC5mYW5QYWkoc3ByaXRlRnJhbWVzKTtcclxuICAgICAgICAvL+i1ouS6hueahOWKqOeUu1xyXG4gICAgICAgIHRoaXMuZW5kRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5pc0VuZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wa1BhbmVsLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dFbmRBbmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdhbWVNb25leVBvb2w6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy/liLfmlrDmgLvms6hcclxuICAgICAgICB2YXIgdG90YWwgPSBkYXRhLm1vbmV5UG9vbDtcclxuICAgICAgICB0aGlzLl9hbGxaaHVMYWJlbC5zdHJpbmcgPSAodG90YWwgLyAxMDApLnRvRml4ZWQoMik7OyAvL+aAu+aVsFxyXG4gICAgICAgIC8vZnJlc2jlhbbku5bkurrnmoTmlbDmja5cclxuICAgICAgICB2YXIgY29tbW9uSW5mbyA9IGRhdGEuY29tbW9uSW5mbztcclxuICAgICAgICBmb3IgKHZhciBpIGluIGNvbW1vbkluZm8pIHtcclxuICAgICAgICAgICAgdmFyIHVzZXJpZCA9IGk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gY29tbW9uSW5mb1tpXTtcclxuICAgICAgICAgICAgdmFyIGNvc3RNb25leSA9IHRlbXAuY29zdE1vbmV5OyAvL+S4i+eahOazqFxyXG4gICAgICAgICAgICB2YXIgbW9uZXkgPSB0ZW1wLm1vbmV5OyAvL+aJgOacieeUqOeahOmSsVxyXG4gICAgICAgICAgICAvL+WIt+aWsOi/meS4quS6uueahOS/oeaBr1xyXG4gICAgICAgICAgICB2YXIgc2VhdEluZGV4ID0gdGhpcy5uZXRXb3JrLmdldFNlYXRJbmRleEJ5SUQodXNlcmlkKTtcclxuICAgICAgICAgICAgdmFyIGxvY2FsSW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleChzZWF0SW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgc2VhdHMgPSB0aGlzLm5ldFdvcmsuc2VhdHM7XHJcbiAgICAgICAgICAgIHNlYXRzW3NlYXRJbmRleF0uc2NvcmUgPSBtb25leTtcclxuICAgICAgICAgICAgdmFyIHNlYXQgPSB0aGlzLl9zZWF0c1tsb2NhbEluZGV4XTtcclxuICAgICAgICAgICAgc2VhdC5zZXRDb3N0TW9uZXkoY29zdE1vbmV5KTtcclxuICAgICAgICAgICAgc2VhdC5zZXRNb25leShtb25leSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VOb3RpZnk6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy/mtojmga/mmL7npLpcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcclxuICAgICAgICAvL+aUuVxyXG4gICAgICAgIC8vYWxlcnQuc2hvdyhcIuazqOaEj1wiLCBtZXNzYWdlKTtcclxuICAgIH0sXHJcbiAgICBnYW1lQ2lyY2xlQ291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy/liLfmlrDova7mlbBcclxuICAgICAgICB2YXIgY2lyY2xlQ291bnQgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuZnJlc2hDaXJjbGVDb3VudChjaXJjbGVDb3VudCk7XHJcbiAgICB9LFxyXG4gICAgZ2FtZVVzZXJJbkJpUGFpUmVzdWx0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciB3aW5lciA9IGRhdGEud2luZXI7XHJcbiAgICAgICAgdmFyIGxvc2VyID0gZGF0YS5sb3NlcjtcclxuICAgICAgICB0aGlzLmJpcGFpQW5pbVF1ZXVlID0gW3tcclxuICAgICAgICAgICAgd2luZXI6IHdpbmVyLFxyXG4gICAgICAgICAgICBsb3NlcjogbG9zZXJcclxuICAgICAgICB9XTsgLy/mr5TniYzpmJ/liJdcclxuICAgICAgICB0aGlzLmJpcGFpQW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNob3dCaXBhaUFuaW0oKTtcclxuICAgIH0sXHJcbiAgICBnYW1lV2FubmFUb0NvbXBhcmU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLl90aXBzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGlwcy5zdHJpbmcgPSBcIuivt+mAieaLqeavlOeJjOeOqeWutlwiO1xyXG4gICAgICAgIHRoaXMuX3RpcHMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgdXNlcmlkID0gZGF0YVtpXS51c2VyaWQ7XHJcbiAgICAgICAgICAgIHZhciBzZWF0SW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0U2VhdEluZGV4QnlJRCh1c2VyaWQpO1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxJbmRleCA9IHRoaXMubmV0V29yay5nZXRMb2NhbEluZGV4KHNlYXRJbmRleCk7XHJcbiAgICAgICAgICAgIHZhciBzZWF0ID0gdGhpcy5fc2VhdHNbbG9jYWxJbmRleF07XHJcbiAgICAgICAgICAgIHNlYXQuc2hvd1BrQnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdhbWVDb3VudERvd246IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RpcHMubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGlwcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ZG93bi5zdHJpbmcgPSBkYXRhLmNvdW50RG93bjtcclxuICAgICAgICB0aGlzLmNvdW50ZG93bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKGRhdGEuY291bnREb3duIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb3VudGRvd24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2FtZUFudGlSZXN1bHRzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8v5pyA5ZCO5LiA6L2u55qE5q+U54mMXHJcbiAgICAgICAgdGhpcy5iaXBhaUFuaW1RdWV1ZSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgYmlwYWlEYXRhID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgdmFyIHdpbmVyID0gYmlwYWlEYXRhWyd3aW5Vc2VyaWQnXTtcclxuICAgICAgICAgICAgdmFyIGxvc2VyID0gYmlwYWlEYXRhWydsb3NlVXNlcmlkJ107XHJcbiAgICAgICAgICAgIHRoaXMuYmlwYWlBbmltUXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB3aW5lcjogd2luZXIsXHJcbiAgICAgICAgICAgICAgICBsb3NlcjogbG9zZXJcclxuICAgICAgICAgICAgfSk7IC8v5q+U54mM6Zif5YiXXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmlwYWlBbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2hvd0JpcGFpQW5pbSgpO1xyXG4gICAgfSxcclxuICAgIHVzZXJJbmZvQnlJZDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvL+iOt+WPluaWree6v+mHjei/nuWQjueahOeUqOaIt+S/oeaBr1xyXG4gICAgICAgIHRoaXMuZnJlc2hVc2VySW5mbyhkYXRhKTtcclxuICAgIH0sXHJcbiAgICBnYW1lSW5mb0J5SWQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy/ojrflj5bmlq3nur/ph43ov57lkI7nmoTmuLjmiI/kv6Hmga9cclxuICAgICAgICB0aGlzLmZyZXNoR2FtZUluZm8oZGF0YSk7XHJcbiAgICB9LFxyXG4gICAgZXhpdFJvb206IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+WIt+aWsOeUqOaIt+mSseW4geaVsOmHj1xyXG4gICAgICAgIHRoaXMuZ2V0R2Vtc0FuZENvaW5zKCk7XHJcbiAgICB9LFxyXG4gICAgbm9Nb25leUV4aXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy/mj5DnpLrph5HpkrHkuI3otrNcclxuICAgICAgICAvL+aUuVxyXG4gICAgICAgIC8vYWxlcnQuc2hvdyhcIuaPkOekulwiLCBcIumHkemSseS4jei2s++8jOaCqOWwhumAgOWHuuaIv+mXtO+8jOivt+WcqOa0u+WKqOmihuWPluavj+aXpemHkeW4geihpeWKqVwiKTtcclxuICAgIH0sXHJcbiAgICBzYkluQWxsSW46IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy/lhajkuItcclxuICAgICAgICB0aGlzLmRvQWxsaW4oZGF0YSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuZmxvd2VyU29ja2V0LmVtaXQoJ2FsbEluQWN0aXZlRnJvbUNsaWVudCcpOyAvL+inpuWPkeS4i+S4gOatpVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v6K6+572u6YeR5biB6ZK755+z5pWw6YePXHJcbiAgICBnZXRHZW1zQW5kQ29pbnM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy/mlLlcclxuICAgICAgICAvLyB1c2VyTWdyLmdldEdlbXNBbmRDb2lucyhmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgIHVzZXJNZ3IuZ2VtcyA9IGRhdGEuZ2VtcztcclxuICAgICAgICAvLyAgICAgdXNlck1nci5jb2lucyA9IGRhdGEuY29pbnM7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9LFxyXG4gICAgaW5pdFNlYXRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlYXRzID0gdGhpcy5uZXRXb3JrLnNlYXRzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdeXl5eXl5eXl5eXl5eXl5eXl5eXl4nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWF0cyk7XHJcbiAgICAgICAgaWYgKCFzZWF0cykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhdHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0U2luZ2xlU2VhdChzZWF0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXRTaW5nbGVTZWF0OiBmdW5jdGlvbiAoc2VhdCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubmV0V29yay5nZXRMb2NhbEluZGV4KHNlYXQuc2VhdGluZGV4KTtcclxuICAgICAgICB2YXIgaXNPZmZsaW5lID0gIXNlYXQub25saW5lO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRJbmZvKHNlYXQubmFtZSwgc2VhdC5zY29yZSwgc2VhdC5oZWFkaW1ndXJsKTtcclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0UmVhZHkoc2VhdC5yZWFkeSk7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNldE9mZmxpbmUoaXNPZmZsaW5lKTtcclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0SUQoc2VhdC51c2VyaWQpO1xyXG4gICAgfSxcclxuICAgIG9uQnRuU2V0dGluZ3NDbGlja2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/mlLlcclxuICAgICAgICAvL3BvcHVwTWdyLnNob3dTZXR0aW5ncygpO1xyXG4gICAgfSxcclxuICAgIG9uQnRuQmFja0NsaWNrZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvKiog5pS5IFxyXG4gICAgICAgIGFsZXJ0LnNob3coXCLov5Tlm57lpKfljoVcIiwgXCLov5Tlm57lpKfljoXmiL/pl7Tku43kvJrkv53nlZnvvIzlv6vljrvpgoDor7flpKfkvJnmnaXnjqnlkKfvvIFcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImhhbGxcIik7XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICovXHJcbiAgICB9LFxyXG4gICAgb25CdG5DaGF0Q2xpY2tlZDogZnVuY3Rpb24gKCkge30sXHJcbiAgICAvLyDngrnlh7vliIbkuqvmjInpkq7vvIzkvb/nlKjlvq7kv6HliIbkuqtcclxuICAgIG9uQnRuV2VpY2hhdENsaWNrZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+aUuVxyXG4gICAgICAgIC8vc2hhcmUuc2hvdygpO1xyXG4gICAgfSxcclxuICAgIG9uQnRuRGlzc29sdmVDbGlja2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyog5pS5XHJcbiAgICAgICAgYWxlcnQuc2hvdyhcIuino+aVo+aIv+mXtFwiLCBcIuino+aVo+aIv+mXtOS4jeaJo+mHkeW4ge+8jOaYr+WQpuehruWumuino+aVo++8n1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmZsb3dlclNvY2tldC5lbWl0KFwiZGlzcHJlc3NcIik7XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcblxyXG4gICAgb25DbGlja0Nsb3NlQmQoZSwgdikge1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9jb21faW5nYW1lX3RpcHMnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGlja0Nsb3NlWmh1KCkge1xyXG4gICAgICAgIHRoaXMuX3podS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25CdG5FeGl0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV0V29yay5mbG93ZXJTb2NrZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmZsb3dlclNvY2tldC5lbWl0KFwiTG9nb3V0Um9vbVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RNaW51dGUgIT0gbWludXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0TWludXRlID0gbWludXRlcztcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgaCA9IGggPCAxMCA/IFwiMFwiICsgaCA6IGg7XHJcbiAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIG0gPSBtIDwgMTAgPyBcIjBcIiArIG0gOiBtO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lTGFiZWwuc3RyaW5nID0gXCJcIiArIGggKyBcIjpcIiArIG07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKCkge30sXHJcbiAgICAvL+eCueWHu+eci+eJjOaMiemSrlxyXG4gICAgY2xpY2tLYW5wYWk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZmxvd2VyU29ja2V0LmVtaXQoJ2thbnBhaScpO1xyXG4gICAgICAgIHRoaXMuX2thbnBhaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+WKoOazqOaMiemSru+8jOaJk+W8gOWKoOazqOeVjOmdolxyXG4gICAgamlhemh1OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmiZPlvIDliqDms6jpobXpnaJcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGZvciAodmFyIGQgaW4gc2VsZi56aHVvYmopIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3podS8nICsgc2VsZi56aHVvYmpbZF0pLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLl96aHUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgYmV0ID0gdGhpcy5oYXNDaGVja2VkUGFpID8gMiA6IDE7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBzZWxmLmFkZHpodWRldGFpbCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5pbk9iamVjdChzZWxmLmFkZHpodWRldGFpbFtpXSwgc2VsZi5vcHMpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl96aHUuZ2V0Q2hpbGRCeU5hbWUoJ3podScgKyBpKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5femh1LmdldENoaWxkQnlOYW1lKCd6aHUnICsgaSkuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoc2VsZi5hZGR6aHVkZXRhaWxbaV0gKiBiZXQpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl96aHUuZ2V0Q2hpbGRCeU5hbWUoJ3podScgKyBpICsgJ19odWknKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5femh1LmdldENoaWxkQnlOYW1lKCd6aHUnICsgaSArICdfaHVpJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoc2VsZi5hZGR6aHVkZXRhaWxbaV0gKiBiZXQpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v54K55Ye75q+U54mM5oyJ6ZKuXHJcbiAgICBiaXBhaTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV0V29yay5mbG93ZXJTb2NrZXQuZW1pdCgnd2FubmFUb0NvbXBhcmVQYWknKTtcclxuICAgICAgICAvL+aYvuekuuWFtuS7luS6uueahHBr5oyJ6ZKu77yM6YCJ5oup5ZKM6LCB5q+U54mMXHJcbiAgICAgICAgLy8gdGhpcy5zaG93T3RoZXJzUGtCdXR0b24oKTtcclxuICAgIH0sXHJcbiAgICBjbGlja1BrQnV0dG9uOiBmdW5jdGlvbiAodXNlcklkMikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vmr5TniYw9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScgKyB1c2VySWQyKTtcclxuICAgICAgICB0aGlzLmhpZGVPaGVyc1BrQnV0dG9uKCk7XHJcbiAgICAgICAgdmFyIHVzZXJJZDEgPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7IC8v6Ieq5bexXHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLmZsb3dlclNvY2tldC5lbWl0KCdiaXBhaScsIHtcclxuICAgICAgICAgICAgdXNlcklkMTogdXNlcklkMSxcclxuICAgICAgICAgICAgdXNlcklkMjogdXNlcklkMlxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye75byD54mM5oyJ6ZKuXHJcbiAgICBxaXBhaTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV0V29yay5mbG93ZXJTb2NrZXQuZW1pdCgncWlwYWknKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvc2VhdDAvcWlpY29uJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZygn5byD54mMJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5qOL54mM57uT5p6cXHJcbiAgICBxaXBhaVJlc3VsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2thbnBhaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9xaXBhaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nZW56aHUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5famlhemh1LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JpcGFpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3podS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/ngrnlh7vot5/ms6jmjInpkq5cclxuICAgIGdlbnpodTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV0V29yay5mbG93ZXJTb2NrZXQuZW1pdCgnZ2Vuemh1Jyk7XHJcbiAgICB9LFxyXG4gICAgYWRkemh1OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgaW5kZXggPSBlLnRhcmdldC5uYW1lLnNwbGl0KCd6aHUnKVsxXTtcclxuICAgICAgICB2YXIgbnVtID0gc2VsZi5hZGR6aHVkZXRhaWxbaW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg5rOo77yaXCIgKyBudW0gKiAxMDApO1xyXG4gICAgICAgIHRoaXMubmV0V29yay5mbG93ZXJTb2NrZXQuZW1pdCgnYWRkemh1JywgbnVtICogMTAwKTtcclxuICAgICAgICB0aGlzLl96aHUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgZ2V0cGFpUmVzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBkYXRhID0gZGF0YSArIDE7XHJcbiAgICAgICAgdmFyIHR5cGUsIG51bSwgaHVhc2VfYmlnLCBodWFzZV9zbWFsbDtcclxuICAgICAgICBudW0gPSAoZGF0YSAlIDEwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAoZGF0YSA+IDAgJiYgZGF0YSA8IDE0KSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAnMDQnOyAvL+m7keahg1xyXG4gICAgICAgICAgICBudW0gPSBudW0gKyAnLTEnOyAvL+m7keeJjFxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA+IDEwMCAmJiBkYXRhIDwgMTE0KSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAnMDMnOyAvL+e6ouahg1xyXG4gICAgICAgICAgICBudW0gPSBudW0gKyAnLTInOyAvL+e6oueJjFxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA+IDIwMCAmJiBkYXRhIDwgMjE0KSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAnMDInOyAvL+aiheiKsVxyXG4gICAgICAgICAgICBudW0gPSBudW0gKyAnLTEnOyAvL+m7keeJjFxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA+IDMwMCAmJiBkYXRhIDwgMzE0KSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAnMDEnOyAvL+aWueWdl1xyXG4gICAgICAgICAgICBudW0gPSBudW0gKyAnLTInOyAvL+e6oueJjFxyXG4gICAgICAgIH1cclxuICAgICAgICBodWFzZV9iaWcgPSBcImh1YXNlX2JpZ1wiICsgdHlwZTtcclxuICAgICAgICBodWFzZV9zbWFsbCA9IFwiaHVhc2Vfc21hbGxcIiArIHR5cGU7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgbnVtOiBzZWxmLnBhaWdyb3VwLmdldFNwcml0ZUZyYW1lKG51bSksXHJcbiAgICAgICAgICAgIGh1YXNlX2JpZzogc2VsZi5wYWlncm91cC5nZXRTcHJpdGVGcmFtZShodWFzZV9iaWcpLFxyXG4gICAgICAgICAgICBodWFzZV9zbWFsbDogc2VsZi5wYWlncm91cC5nZXRTcHJpdGVGcmFtZShodWFzZV9zbWFsbCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBpZiAobnVtID09ICcxJykgbnVtID0gJ0EnO1xyXG4gICAgICAgIC8vIGlmIChudW0gPT0gJzExJykgbnVtID0gJ0onO1xyXG4gICAgICAgIC8vIGlmIChudW0gPT0gJzEyJykgbnVtID0gJ1EnO1xyXG4gICAgICAgIC8vIGlmIChudW0gPT0gJzEzJykgbnVtID0gJ0snO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG4gICAgb25CdG5DbGlja2VkOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5hbWUgIT0gXCJ6aHVcIikge1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvemh1JykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZyZXNoQ3VycmVudFpodTogZnVuY3Rpb24gKGN1cnJlbnRfemh1KSB7XHJcbiAgICAgICAgdGhpcy5fZGFuemh1LnN0cmluZyA9IFwi5Y2V5rOo77yaXCIgKyAoY3VycmVudF96aHUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG4gICAgZnJlc2hOdW1PZkx1bjogZnVuY3Rpb24gKG51bSkge30sXHJcbiAgICByZXN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckVuZCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICAgICAgICB0aGlzLmluaXRTZWF0cygpO1xyXG4gICAgfSxcclxuICAgIGZyZXNoQ2lyY2xlQ291bnQ6IGZ1bmN0aW9uIChjaXJjbGVDb3VudCkge1xyXG4gICAgICAgIGNpcmNsZUNvdW50ID0gY2lyY2xlQ291bnQgPj0gMTQgPyAxNCA6IGNpcmNsZUNvdW50O1xyXG4gICAgICAgIHRoaXMuX2x1bnNodS5zdHJpbmcgPSBcIui9ruaVsO+8mlwiICsgKGNpcmNsZUNvdW50ICsgMSkgKyBcIi8xNVwiO1xyXG4gICAgfSxcclxuICAgIHNob3dQazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2xlZnRMaWUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcmlnaHRMaWUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGtQYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v5pKt5pS+5q+U54mM5Yqo55S7XHJcbiAgICAgICAgdGhpcy5fZmxhc2hBbmltLnBsYXkoJ3BrX3NoYW5kaWFuJyk7XHJcbiAgICAgICAgdGhpcy5fYmlwYWlBbmltLnBsYXkoJ2JpcGFpJyk7XHJcbiAgICB9LFxyXG4gICAgaGlkZVBrOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5zaG93TGllKGRhdGEpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3BrUGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmJpcGFpQW5pbUluZGV4Kys7IC8v5LiL5LiA5Liq5q+U54mM5Yqo55S7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5iaXBhaUFuaW1JbmRleCA+PSBzZWxmLmJpcGFpQW5pbVF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5rKh5pyJ5LiL5LiA5Liq5Yqo55S75LqGXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuaXNFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmoIfor4bkuLrmuLjmiI/nu5PmnZ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93RW5kQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ57uT5p2fLOaJp+ihjOavlOeJjOezu+WIl+WKqOeUu+e7k+adn+WQjueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5iaXBhaUFuaW1DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5iaXBhaUFuaW1DYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dCaXBhaUFuaW0oKTsgLy/miafooYzkuIvkuIDkuKrmr5TniYzliqjnlLtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuICAgIHNob3dMaWU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8wLeaYvuekuuW3pui+ueijgueJjCAxLeaYvuekuuWPs+i+ueijgueJjFxyXG4gICAgICAgIGlmIChkYXRhID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmlnaHRMaWUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9sZWZ0TGllLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhpZGVMaWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9sZWZ0TGllLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3JpZ2h0TGllLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIHNob3dPdGhlcnNQa0J1dHRvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5fc2VhdHMpIHtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHZhciBzZWF0ID0gdGhpcy5fc2VhdHNbaV07XHJcbiAgICAgICAgICAgIHNlYXQuc2hvd1BrQnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob3daaHVBbmltOiBmdW5jdGlvbiAoZGF0YSwgZGl6aHVMZXZlbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5LiL5rOo5Yqo55S75pWw5o2uXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgLy/kuIvms6jliqjnlLtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICBsZXQgcm9sbFRpbWVzID0gTWF0aC5mbG9vcihkYXRhLmFkZE1vbmV5IC8gMTAwKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvbGxUaW1lczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gZGF0YS54OyAvL+i1t+Wni+eCuVhcclxuICAgICAgICAgICAgdmFyIHkgPSBkYXRhLnk7IC8v6LW35aeL54K5WVxyXG4gICAgICAgICAgICB2YXIgYWRkTW9uZXlMZXZlbCA9IGRhdGEuYWRkTW9uZXlMZXZlbDtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl96aHVvbWlhbi5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBjYy5pbnN0YW50aWF0ZShub2RlKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXpodUxldmVsICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+W6leazqOacrOi6q1xyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZSA9IHRoaXMuX3podW9taWFuLmNoaWxkcmVuW2Rpemh1TGV2ZWxdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5femh1b21pYW4uYWRkQ2hpbGQobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHpodU9iaiA9IGNjLmZpbmQoJ0NhbnZhcy96aHUvJyArIHRoaXMuemh1b2JqW2FkZE1vbmV5TGV2ZWxdKTtcclxuICAgICAgICAgICAgdmFyIHpodUZyYW1lQ29weSA9IHpodU9iai5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHpodUZyYW1lQ29weTtcclxuICAgICAgICAgICAgbmV3Tm9kZS54ID0geDtcclxuICAgICAgICAgICAgbmV3Tm9kZS55ID0geTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gY2MubW92ZVRvKDAuNCwgY2MudjIoTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMCwgTWF0aC5yYW5kb20oKSAqIDE2MCAtIDgwKSk7XHJcbiAgICAgICAgICAgIG5ld05vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhpZGVPaGVyc1BrQnV0dG9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuX3RpcHMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyBjYy5maW5kKCdDYW52YXMvYmFjaycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5fc2VhdHMpIHtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHZhciBzZWF0ID0gdGhpcy5fc2VhdHNbaV07XHJcbiAgICAgICAgICAgIHNlYXQuaGlkZVBrQnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluT2JqZWN0OiBmdW5jdGlvbiAoZGF0YSwgb2JqKSB7XHJcbiAgICAgICAgdmFyIGYgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSBvYmpbaV0pIHtcclxuICAgICAgICAgICAgICAgIGYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGY7XHJcbiAgICB9LFxyXG4gICAgLy/nu5PmnZ/liqjnlLtcclxuICAgIHNob3dFbmRBbmltOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkYXRhID0gc2VsZi5lbmREYXRhO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciB3aW5fdXNlcmlkID0gZGF0YS53aW5lcjtcclxuICAgICAgICAgICAgdmFyIGhvbGRzID0gZGF0YS5ob2xkcztcclxuICAgICAgICAgICAgdmFyIHdpbl9zZWF0SW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleCh0aGlzLm5ldFdvcmsuZ2V0U2VhdEluZGV4QnlJRCh3aW5fdXNlcmlkKSk7XHJcbiAgICAgICAgICAgIC8v5Y+W5b6X5bqn5L2NXHJcbiAgICAgICAgICAgIHZhciB3aW5fc2VhdCA9IHNlbGYuX3NlYXRzW3dpbl9zZWF0SW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3aW5fc2VhdC5zaG93WWFuaHVhKCk7IC8v5pS+54Of6IqxXHJcbiAgICAgICAgICAgICAgICAvL+etueeggeenu+WKqOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5femh1b21pYW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc2VsZi5femh1b21pYW4uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHNlbGYuX3podW9taWFuLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5tb3ZlVG8oMSwgY2MudjIod2luX3NlYXQubm9kZS54LCB3aW5fc2VhdC5ub2RlLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm9sZFggPSBub2RlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5vbGRZID0gbm9kZS55O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLl96aHVvbWlhbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl96aHVvbWlhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc2VsZi5femh1b21pYW4uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBzZWxmLl96aHVvbWlhbi5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUub2xkWCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS54ID0gbm9kZS5vbGRYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm9sZFkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUueSA9IG5vZGUub2xkWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOW8gOWni+S4gOWxgFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xlYXJFbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5pc0VuZCA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuZW5kRGF0YSA9IG51bGw7XHJcbiAgICAgICAgc2VsZi5fdGlwcy5zdHJpbmcgPSBcIuato+WcqOetieW+heS4i+S4gOWxgOa4uOaIj1wiO1xyXG4gICAgICAgIHNlbGYuX3RpcHMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIGNjLmZpbmQoJ0NhbnZhcy9iYWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodCk7XHJcbiAgICAgICAgICAgIHNlbGYubmV0V29yay5mbG93ZXJTb2NrZXQuZW1pdCgncmVhZHknKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcbiAgICAvL+avlOeJjOWKqOeUu1xyXG4gICAgc2hvd0JpcGFpQW5pbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgYmlwYWlEYXRhID0gc2VsZi5iaXBhaUFuaW1RdWV1ZVtzZWxmLmJpcGFpQW5pbUluZGV4XTtcclxuICAgICAgICB2YXIgd2luZXIgPSBiaXBhaURhdGFbJ3dpbmVyJ107XHJcbiAgICAgICAgdmFyIGxvc2VyID0gYmlwYWlEYXRhWydsb3NlciddO1xyXG4gICAgICAgIHZhciBscHggPSBjYy5maW5kKCdDYW52YXMvcGsvbGVmdFBhaScpLngsXHJcbiAgICAgICAgICAgIGxweSA9IGNjLmZpbmQoJ0NhbnZhcy9way9sZWZ0UGFpJykueSxcclxuICAgICAgICAgICAgcnB4ID0gY2MuZmluZCgnQ2FudmFzL3BrL3JpZ2h0UGFpJykueCxcclxuICAgICAgICAgICAgcnB5ID0gY2MuZmluZCgnQ2FudmFzL3BrL3JpZ2h0UGFpJykueTtcclxuICAgICAgICB2YXIgV3NlYXRJbmRleCA9IHRoaXMubmV0V29yay5nZXRTZWF0SW5kZXhCeUlEKHdpbmVyKSxcclxuICAgICAgICAgICAgTHNlYXRJbmRleCA9IHRoaXMubmV0V29yay5nZXRTZWF0SW5kZXhCeUlEKGxvc2VyKTtcclxuICAgICAgICB2YXIgV2xvY2FsSW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleChXc2VhdEluZGV4KSxcclxuICAgICAgICAgICAgTGxvY2FsSW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleChMc2VhdEluZGV4KTtcclxuICAgICAgICB2YXIgYjEgPSBjYy5maW5kKCdDYW52YXMvc2VhdCcgKyBXbG9jYWxJbmRleCksXHJcbiAgICAgICAgICAgIGIyID0gY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgTGxvY2FsSW5kZXgpO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9way9sZWZ0UGFpJykueCA9IGIxLng7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3BrL2xlZnRQYWknKS55ID0gYjEueTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvcGsnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9way9sZWZ0UGFpJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvcGsvcmlnaHRQYWknKS54ID0gYjIueDtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvcGsvcmlnaHRQYWknKS55ID0gYjIueTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvcGsvcmlnaHRQYWknKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBhY3Rpb24xID0gY2MubW92ZVRvKDAuNCwgY2MudjIobHB4LCBscHkpKSxcclxuICAgICAgICAgICAgYWN0aW9uMiA9IGNjLm1vdmVUbygwLjQsIGNjLnYyKHJweCwgcnB5KSk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3BrL2xlZnRQYWknKS5ydW5BY3Rpb24oYWN0aW9uMSk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3BrL3JpZ2h0UGFpJykucnVuQWN0aW9uKGFjdGlvbjIpO1xyXG4gICAgICAgIHNlbGYuaGlkZUxpZSgpO1xyXG4gICAgICAgIGlmIChMbG9jYWxJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQwL3NodWljb24nKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnNob3dQaygpO1xyXG4gICAgICAgICAgICBzZWxmLmhpZGVQaygxKTtcclxuICAgICAgICB9LCA0MDApO1xyXG4gICAgfSxcclxuICAgIC8v5a2k5rOo5LiA5o63XHJcbiAgICBhbGxpbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV0V29yay5mbG93ZXJTb2NrZXQuZW1pdCgnYWxsX2luJyk7XHJcbiAgICAgICAgdGhpcy5fYWxsaW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/lraTms6jkuIDmjrfliqjnlLtcclxuICAgIGRvQWxsaW46IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB1c2VyaWQgPSBkYXRhLnVzZXJpZDsgLy/lj5HotbflraTms6jkuIDmjrfnmoTpgqPkuKrkurpcclxuICAgICAgICB2YXIgc3RhdHVzID0gZGF0YS5zdGF0dXM7IC8vMC3ovpPkuoYgMS3otaLkuoZcclxuICAgICAgICB2YXIgb3RoZXJzID0gZGF0YS5vdGhlcnM7IC8v6KKr5q+U54mM55qE5Lq6XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuYmlwYWlBbmltUXVldWUgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpIGluIHNlbGYuX3NlYXRzKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWF0RGF0YSA9IHNlbGYuX3NlYXRzW2ldO1xyXG4gICAgICAgICAgICB2YXIgc2VhdFVzZXJJZCA9IHNlYXREYXRhWydfdXNlcklkJ107XHJcbiAgICAgICAgICAgIGlmICghc2VhdFVzZXJJZCB8fCBzZWF0VXNlcklkID09IHVzZXJpZCB8fCBvdGhlcnMuaW5kZXhPZihzZWF0VXNlcklkKSA9PSAtMSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHZhciB3aW5lciwgbG9zZXI7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZXIgPSBzZWF0VXNlcklkO1xyXG4gICAgICAgICAgICAgICAgbG9zZXIgPSB1c2VyaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5lciA9IHVzZXJpZDtcclxuICAgICAgICAgICAgICAgIGxvc2VyID0gc2VhdFVzZXJJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmJpcGFpQW5pbVF1ZXVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgd2luZXI6IHdpbmVyLFxyXG4gICAgICAgICAgICAgICAgbG9zZXI6IGxvc2VyXHJcbiAgICAgICAgICAgIH0pOyAvL+avlOeJjOmYn+WIl1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmJpcGFpQW5pbUluZGV4ID0gMDtcclxuICAgICAgICBzZWxmLnNob3dCaXBhaUFuaW0oKTtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgc2VsZi5iaXBhaUFuaW1DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOaWreW8gOi/nuaOpVxyXG4gICAgICovXHJcbiAgICBkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5mbG93ZXJTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZmxvd2VyU29ja2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZmxvd2VyID0gbnVsbDtcclxuICAgICAgICAvL3RoaXMuY29tX01lc3NhZ2VCb3guYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL3RoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5oKo5bey5pat57q/77yM6K+36YeN5paw55m75b2VXCI7XHJcbiAgICB9LFxyXG59KTsiXX0=