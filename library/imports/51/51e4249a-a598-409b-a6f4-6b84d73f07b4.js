"use strict";
cc._RF.push(module, '51e42SapZhAm6b0a4TXPwe0', 'HongBaoMain');
// Script/game_hongbao/HongBaoMain.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    maskPanel: cc.Node,
    //各种弹板黑背景
    roomPrice_lab: cc.Label,
    //房间红包金额
    roomRule_lab: cc.Label,
    //房间红包规则
    getHbCoin_lab: cc.Label,
    //得到的红包金额
    hbScrollview: cc.ScrollView,
    hbItem: cc.Prefab,
    hbDetailPanel: cc.Node,
    //红包详情面板
    hbDetail_lab: cc.Label,
    playerScrollview: cc.ScrollView,
    playerItem: cc.Prefab,
    playerNode: cc.Node,
    horseLamp_Node: cc.Node,
    horseLamp_lab: cc.Label
  },
  onLoad: function onLoad() {
    cc.log('进入红包达人================================================');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.playerInfo.setGameObj_Function(this);
    this.netWork = require("HongBaoNetWork").getInstant;
    this.netWork.sethongbaoObj_Function(this);
    this.netWork.gameSocket.emit("hbInit");
    this.hongbaoPlayer = this.playerNode.getComponent("HongBaoPlayer");
  },
  start: function start() {
    this.horseLamp_Node.active = false;
  },
  gameInit: function gameInit(data) {
    this.nowHbId = 0;
    this.lampList = [];
    this.nowPrice = data.hbPrice; //每个红包的价格

    this.roomPrice_lab.string = "\u91D1\u989D" + this.nowPrice / this.playerInfo.exchangeRate + "\u5143";
    this.roomRule_lab.string = data.ruleType == 0 ? "最小接龙" : "最大接龙";
    this.hbList = data.hbList;
    cc.log(this.hbList);
    this.hbScrollview.content.removeAllChildren();

    for (var i = 0; i < this.hbList.length; i++) {
      var item = new cc.instantiate(this.hbItem);
      item.getComponent("HongBaoPreb").initData(this.hbList[i]);
      this.hbScrollview.content.addChild(item);
    }

    this.hbScrollview.scrollToBottom(0.2);
  },
  createMsg: function createMsg(info) {},
  //金币结算
  billing_Function: function billing_Function(data) {
    cc.log("coinresult----", data);
    this.hongbaoPlayer.updateView(data);
  },
  //刷新红包列表
  updateHongBaoList: function updateHongBaoList(data) {
    this.hbList.push(data);
    var item = new cc.instantiate(this.hbItem);
    this.hbScrollview.content.addChild(item);
    item.getComponent("HongBaoPreb").initData(data);
    this.hbScrollview.scrollToBottom(0.2);
  },
  //领取红包
  getHongBao: function getHongBao(data) {
    cc.log("getHongBao----", data);
    this.maskPanel.getChildByName("开始抢红包").active = false;

    switch (data.ResultCode) {
      case 0:
        //领取成功
        this.updateHbInList(data.ResultData);
        this.getHbCoin_lab.string = (data.packageMoney / this.playerInfo.exchangeRate).toFixed(2);
        this.open_panel("抢到红包");
        break;

      case 1000:
        //没有剩余了
        this.updateHbInList(data.ResultData);
        this.open_panel("未抢到红包");
        break;

      case 1001:
        //领过了
        this.updateHbInList(data.ResultData);
        this.open_hbDetail(data.ResultData);
        break;
    }
  },
  //更新红包状态
  updateHbInList: function updateHbInList(data) {
    var itemList = this.hbScrollview.content.children;

    for (var i = 0; i < itemList.length; i++) {
      if (data.hbId == itemList[i].getComponent("HongBaoPreb").data.hbId) {
        itemList[i].getComponent("HongBaoPreb").initData(data);
        itemList[i].getComponent("HongBaoPreb").initUI(data);
      }
    }
  },
  //打开红包详情
  open_hbDetail: function open_hbDetail(data) {
    this.hbDetailPanel.active = true;
    this.hbScrollview.node.active = false;

    if (data.nowNum > 0) {
      this.hbDetail_lab.string = "\u5F53\u524D\u5269\u4F59\u7EA2\u5305" + data.nowNum + "\u4E2A";
    } else {
      this.hbDetail_lab.string = data.maxNum + "\u4E2A\u7EA2\u5305\uFF0C" + this.showTime(data.receiveList[data.maxNum - 1].date - data.receiveList[0].date) + "\u62A2\u5B8C";
    }

    this.playerScrollview.content.removeAllChildren();

    for (var i = 0; i < data.receiveList.length; i++) {
      var item = new cc.instantiate(this.playerItem);
      item.getComponent("HongBaoPlayerItem").initData(data.receiveList[i]);
      this.playerScrollview.content.addChild(item);
    }
  },
  //关闭红包详情
  close_hbDetail: function close_hbDetail() {
    this.hbDetailPanel.active = false;
    this.hbScrollview.node.active = true;
  },
  //断开连接
  disconnectNetWork_Function: function disconnectNetWork_Function() {},
  //打开某个弹板
  open_panel: function open_panel(name, callback) {
    this.maskPanel.active = true;
    this.panelAction1(this.maskPanel.getChildByName(name), callback);
  },
  //关闭某个弹板
  close_panel: function close_panel(name, callback) {
    this.panelAction2(this.maskPanel.getChildByName(name), callback);
  },
  //打开弹板动效
  panelAction1: function panelAction1(node, callback) {
    node.scale = 0.8;
    node.active = true;
    node.runAction(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.1, 0.9), cc.scaleTo(0.1, 1), cc.callFunc(function () {
      callback && callback();
    })));
  },
  //关闭弹板动效
  panelAction2: function panelAction2(node, callback) {
    var _this = this;

    node.runAction(cc.sequence(cc.scaleTo(0.1, 1.1), cc.scaleTo(0.2, 0.8), cc.callFunc(function () {
      node.active = false;
      _this.maskPanel.active = false;
      callback && callback();
    })));
  },
  //跑马灯
  horseLamp: function horseLamp(data) {
    var _this2 = this;

    this.lampList.push(data);

    if (this.lampList.length == 1) {
      var cb = function cb() {
        _this2.horseLamp_Node.active = true;
        _this2.horseLamp_lab.node.x = 550;
        _this2.horseLamp_lab.string = _this2.lampList[0].luckName + "\u62BD\u4E2D " + _this2.lampList[0].hostName + "\u7684" + (_this2.lampList[0].type == 0 ? "最小红包" : "最大红包") + "\uFF0C2\u79D2\u540E\u53D1\u9001\u65B0\u7EA2\u5305\u54E6";

        _this2.horseLamp_lab.node.runAction(cc.sequence(cc.moveTo(10, -1500, 0), cc.callFunc(function () {
          _this2.lampList.shift();

          if (_this2.lampList.length == 0) {
            _this2.horseLamp_Node.active = false;
          } else {
            cb();
          }
        })));
      };

      cb();
    }
  },
  //时间差转换
  showTime: function showTime(time) {
    var leftd = Math.floor(time / (1000 * 60 * 60 * 24)),
        //计算天数
    lefth = Math.floor(time / (1000 * 60 * 60) % 24),
        //计算小时数
    leftm = Math.floor(time / (1000 * 60) % 60),
        //计算分钟数
    lefts = Math.floor(time / 1000 % 60); //计算秒数

    var result = "";

    if (leftd > 0) {
      result += leftd + "天";
    }

    if (lefth > 0) {
      result += lefth + "小时";
    }

    if (leftm > 0) {
      result += leftm + "分";
    }

    if (lefts > 0) {
      result += lefts + "秒";
    }

    return result;
  }
});

cc._RF.pop();