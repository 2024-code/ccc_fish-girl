"use strict";
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