"use strict";
cc._RF.push(module, 'ad991o56LZLGrKSoW3zFqeU', 'benchibaoma');
// Texture/game_bcbm/js/benchibaoma.js

"use strict";

var zhuanpan = require("zhuanpan_bcbm");

var StateMachine = require("stateMachine");

var Global = null;
cc.Class({
  "extends": cc.Component,
  properties: {
    ZhuanPan: zhuanpan,
    Interval: 2,
    //从开始状态到停止状态必须等待的间隔时间（秒）
    ShowTime: 5,
    //中奖展示时间(秒)
    Timeout: {
      "default": 10,
      tooltip: "连接超时倒计时(秒)"
    },
    name_lab: cc.Label,
    head_Node: cc.Node,
    LabelJinBi: {
      "default": null,
      type: cc.Label,
      tooltip: '金币文字'
    },
    LabelJiangLi: {
      "default": null,
      type: cc.Label,
      tooltip: '奖励文字'
    },
    PanelXinXi: {
      "default": null,
      type: cc.Node,
      tooltip: '信息界面'
    },
    PanelQianBuGou: {
      "default": null,
      type: cc.Node,
      tooltip: '钱不够界面'
    },
    NodeAudioParent: cc.Node,
    //所有音效的父节点
    stateMachine: StateMachine,
    //状态机
    xiazhuStateNode: cc.Node,
    //下注节点
    betTime_lab: cc.Label,
    //下注时间
    zhuangInfo_Node: cc.Node,
    //庄家信息
    qiangNode: cc.Node,
    //抢庄
    zhuangLimit_lab: cc.Label,
    qiangzhuangNum: cc.Label,
    //抢庄人数
    zhuangHead_Node: cc.Node,
    //庄家头像
    zhuangName_lab: cc.Label,
    //庄家姓名
    zhuangCoin_lab: cc.Label,
    //庄家钱数
    betMask: cc.Node,
    //下注区遮罩
    BtnArrayInteraction: {
      "default": [],
      type: [cc.Button],
      tooltip: '所有需要在状态变化时改变可交互性的按钮的集合'
    },
    NodeArrayXiaZhu: {
      "default": [],
      type: cc.Node,
      tooltip: "下注的节点数组"
    },
    ServerDataToLocalData: {
      "default": [],
      type: [cc.Integer],
      tooltip: "服务器索引数据转本地索引数据"
    },
    icon: {
      "default": [],
      type: cc.SpriteFrame
    },
    show_history: {
      "default": null,
      type: cc.Node,
      tooltip: '历史记录节点'
    },
    history_shuiguo: {
      "default": null,
      type: cc.Prefab,
      tooltip: '历史水果图标'
    }
  },
  onLoad: function onLoad() {
    window.BCBM_ins = this;
    this.network = require('bcbm_NetWork').getInstant;
    Global = require("PlayerInfo").getInstant;
  },
  start: function start() {
    this.network.LandlordsSocket.emit('getGameType', '');
    this.network.LandlordsSocket.emit("getGameRecordList", "");
    this.name_lab.string = Global.playerName;
    setHeadTexture(this.head_Node, Global.playerHeadId);
    this.LabelJinBi.string = (Global.playerCoin / Global.exchangeRate).toFixed(2); //总金币数

    this._itemArrayLength = this.NodeArrayXiaZhu.length;
    this._intArrayXiaZhu = new Array(this._itemArrayLength); //每种水果的注数

    this.m_iGameOverTime = -1; //下注剩余时间

    this.duzhuMoney = 100; //单注金额

    this.initBetPool();
    var self = this;
    this.node.on('Event_ZhuanPanStop', function (event) {
      event.stopPropagation(); //停止传递当前事件
      //显示结果

      if (self._winCoin > 0) {
        self.stateMachine.Input_Ready(self.ShowTime);
      } else {
        self.stateMachine.Input_Ready(0.01);
      }
    }); //监听状态机改变事件

    this.node.on('Event_StateChange', function (event) {
      event.stopPropagation(); //停止传递当前事件
      //不知道怎么用js写枚举变量，先用整数代替吧
      //规定state === 0 表示准备状态，解除界面交互限制
      //规定state === 1 表示开始状态，转动转轮，限制部分界面交互功能
      //规定state === 2 表示停止状态，停止转轮并显示图标结果
      //规定state === 3 表示中奖展示状态,显示结算
      //规定state === 4 表示错误状态，停止转轮

      switch (event.detail) {
        case 0:
          //准备状态，解除界面交互限制
          self.SetPanelInteraction(true);
          break;

        case 1:
          //开始状态，转动转轮，限制部分界面交互功能
          self.SetPanelInteraction(false); //发动

          self.ZhuanPan.Launch();
          break;

        case 2:
          self.ZhuanPan.Stop(self.ServerDataToLocalData[self._listWinLines[0]]);
          break;

        case 3:
          //中奖展示状态,显示结算
          self.LabelJinBi.string = (Global.playerCoin / Global.exchangeRate).toFixed(2);
          ; //总金币数

          self.LabelJiangLi.string = self._winCoin; //显示本局赢多少钱

          self.history(self._listWinCar);
          break;

        case 4:
          //错误状态，停止转轮
          self.ZhuanPan.Stop(0);
          break;

        default:
          //走到这肯定出错了
          break;
      }
    });
  },
  update: function update(dt) {
    if (this.m_iGameOverTime && this.xiazhuStateNode.active) {
      var t = parseInt(this.m_iGameOverTime - Date.now() / 1000);

      if (t <= 5 && t + "" != this.betTime_lab.string) {
        playEffect('countdown');

        if (t == 0) {
          playEffect('stop_s');
        }
      }

      if (t <= 0) {
        this.xiazhuStateNode.active = false;
        return;
      }

      this.betTime_lab.string = t;
    }
  },
  init_stat: function init_stat(result) {
    if (result.zUser) {
      this.zhuangName_lab.string = result.zUser.name;
      this.zhuangCoin_lab.string = (result.zUser.zCoin / Global.exchangeRate).toFixed(2);
      setHeadTexture(this.zhuangHead_Node, result.zUser.url);
    }

    this.qiangzhuangNum.string = result.qiangzhuangNum + "人抢庄";
    this.zhuangLimit_lab.string = (result.zhuang_limit / Global.exchangeRate).toFixed(2) + "金币抢庄";

    if (result.game_type == 1) {
      this.m_iGameOverTime = Date.now() / 1000 + result.bet_time;
      this.xiazhuStateNode.active = true;
      this.betMask.active = false;
    } else {
      this.xiazhuStateNode.active = false;
      this.betMask.active = true;
      this.betMask.children[2].active = true;
    }

    if (result.game_type == 4) {
      this.qiangNode.active = true;
      this.zhuangInfo_Node.active = false;
      this.m_iGameOverTime = Date.now() / 1000 + result.qiang_time;
    } else {
      this.qiangNode.active = false;
      this.zhuangInfo_Node.active = true;
    }
  },
  //初始化下注
  initBetPool: function initBetPool() {
    for (var i = 0; i < this._itemArrayLength; i++) {
      this._intArrayXiaZhu[i] = 0;
      this.NodeArrayXiaZhu[i].getChildByName("本人下注").getComponent(cc.Label).string = "0.00";
      this.NodeArrayXiaZhu[i].getChildByName("所有下注").getComponent(cc.Label).string = "0.00";
    }
  },
  //抢庄
  onBtnClick_qiangzhuang: function onBtnClick_qiangzhuang() {
    this.network.LandlordsSocket.emit('qiangZhuang', '');
  },
  //点击信息按钮
  onBtnClick_XinXi: function onBtnClick_XinXi() {
    this.PanelXinXi.active = !this.PanelXinXi.active;
  },
  onBtnClick_xiazhu: function onBtnClick_xiazhu(event, itemIndex) {
    var str = {
      bet_res: parseInt(itemIndex),
      bet_gold: this.duzhuMoney
    };
    this.network.LandlordsSocket.emit('lottery', str); // cc.log(str)
  },
  //点击声音开关
  onToggleClick_ShengYin: function onToggleClick_ShengYin(toggle, customEventData) {
    if (toggle.isChecked === true) {
      for (var i = 0; i < this.NodeAudioParent.children.length; i++) {
        this.NodeAudioParent.children[i].getComponent(cc.AudioSource).volume = 1;
      }
    } else {
      for (var i = 0; i < this.NodeAudioParent.children.length; i++) {
        this.NodeAudioParent.children[i].getComponent(cc.AudioSource).volume = 0;
      }
    }
  },
  //点击返回大厅按钮
  onBtnClick_BackHall: function onBtnClick_BackHall() {
    this.network.LandlordsSocket.disconnect();
    cc.director.loadScene("LobbyMain");
  },
  //选择筹码
  chooseBet_click: function chooseBet_click(target, num) {
    this.duzhuMoney = parseInt(num);
  },
  //关闭弹出界面
  onBtnClick_closePanel: function onBtnClick_closePanel(event, customEventData) {
    //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
    event.target.parent.active = false;
  },
  setzhuang: function setzhuang(ret) {
    this.zhuangInfo_Node.active = true;
    this.qiangNode.active = false;
    this.xiazhuStateNode.active = true;
    this.betMask.active = false;
    this.zhuangName_lab.string = ret.name;
    this.zhuangCoin_lab.string = (ret.zCoin / Global.exchangeRate).toFixed(2);
    setHeadTexture(this.zhuangHead_Node, ret.url);
  },
  //开始抢庄
  qiangBegin: function qiangBegin() {
    this.qiangzhuangNum.string = "0人抢庄";
    this.xiazhuStateNode.active = false;
    this.betMask.active = true;
    this.betMask.children[2].active = true;
    this.qiangNode.active = true;
    this.zhuangInfo_Node.active = false;
    this.m_iGameOverTime = Date.now() / 1000 + 5;
  },
  //开始下注
  betBegin: function betBegin() {
    // this.betBegin_r();
    this.m_iGameOverTime = Date.now() / 1000 + 40;
    this.zhuangInfo_Node.active = true;
    this.qiangNode.active = false;
    this.xiazhuStateNode.active = true;
    this.betMask.active = false;
  },
  //开奖
  showResult: function showResult(ret) {
    var _this = this;

    this.initBetPool();
    this.stateMachine.Input_Start(this.Interval, this.Timeout);
    this.scheduleOnce(function () {
      _this._winCoin = ret["user_win"]; //保存服务器返回的本局赢多少钱

      _this._listWinLines = [ret["win_res"]]; //保存服务器返回的中哪一条线

      _this._listWinCar = ret["win_car"]; //保存服务器返回的中哪一条线

      _this.stateMachine.Input_Stop();
    }, 3);
  },
  //抢庄结果
  showHint: function showHint(ret) {
    // cc.log(a);
    this.qiangzhuangNum.string = ret.qiangzhuangNum + "人抢庄";
  },
  //接收到服务器消息：返回下注结果
  onBet: function onBet(bet_dict) {
    console.log(bet_dict);
    var index = bet_dict.bet_res;
    this.LabelJinBi.string = (Global.playerCoin / Global.exchangeRate).toFixed(2);
    this._intArrayXiaZhu[index] += bet_dict.bet_gold;
    this.NodeArrayXiaZhu[index].getChildByName("本人下注").getComponent(cc.Label).string = (this._intArrayXiaZhu[index] / Global.exchangeRate).toFixed(2);
  },
  //接收到服务器消息：更新下注池子
  betUpdate: function betUpdate(data) {
    for (var i = 0; i < data.length; i++) {
      this.NodeArrayXiaZhu[i].getChildByName("所有下注").getComponent(cc.Label).string = (data[i] / Global.exchangeRate).toFixed(2);
    }
  },
  //调整界面交互性
  SetPanelInteraction: function SetPanelInteraction(interactable) {
    var length = this.BtnArrayInteraction.length;

    for (var i = 0; i < length; i++) {
      this.BtnArrayInteraction[i].interactable = interactable;
    }
  },
  history: function history(lines) {
    var allnode = this.show_history.children;

    if (allnode.length >= 20) {
      allnode[0].destroy();
    }

    var n = cc.instantiate(this.history_shuiguo);
    n.getComponent(cc.Sprite).spriteFrame = this.icon[lines];
    n.parent = this.show_history;
  }
});

cc._RF.pop();