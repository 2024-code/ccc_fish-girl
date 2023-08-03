"use strict";
cc._RF.push(module, '49ebaqI7rJPmJvSroHPIoE8', 'saigou');
// Texture/game_saigou/saigou.js

"use strict";

var KBEngine = {}; //require("kbengine");

cc.Class({
  "extends": cc.Component,
  properties: {
    Timeout: {
      "default": 10,
      tooltip: "连接超时倒计时(秒)"
    },
    Default_chip: {
      "default": 100,
      tooltip: "默认初始筹码"
    },
    LabelArray_BetDanYa: {
      "default": [],
      type: cc.Label,
      tooltip: "单压下注文本数组"
    },
    LabelArray_BetDanShuang: {
      "default": [],
      type: cc.Label,
      tooltip: "大小单双下注文本数组"
    },
    LabelArray_BetQianEr: {
      "default": [],
      type: cc.Label,
      tooltip: "前两名下注文本数组"
    },
    LabelJinBi: {
      "default": null,
      type: cc.Label,
      tooltip: '金币文字'
    },
    LabelTotalBet: {
      "default": null,
      type: cc.Label,
      tooltip: '总下注文本'
    },
    PanelXinXi: {
      "default": null,
      type: cc.Node,
      tooltip: '信息界面'
    },
    Panel_kaiJiangJiLu: {
      "default": null,
      type: cc.Node,
      tooltip: '开奖记录界面'
    },
    BtnArrayInteraction: {
      "default": [],
      type: [cc.Button],
      tooltip: '所有需要在状态变化时改变可交互性的按钮的集合'
    },
    Prefab_HorseRacing: {
      "default": null,
      type: cc.Prefab,
      tooltip: "跑狗界面的预制件"
    },
    Panel_Setting: {
      "default": null,
      type: cc.Node,
      tooltip: "设置界面"
    },
    Panel_qianbugou: {
      "default": null,
      type: cc.Node,
      tooltip: "钱不够界面"
    },
    Panel_qingxiazhu: {
      "default": null,
      type: cc.Node,
      tooltip: "请下注界面"
    },
    Panel_daojishi: {
      "default": null,
      type: cc.Node,
      tooltip: "赛场倒计时界面"
    },
    NodeMusicParent: {
      "default": null,
      type: cc.Node,
      tooltip: "音乐节点的父节点"
    },
    NodeEffectParent: {
      "default": null,
      type: cc.Node,
      tooltip: "音效节点的父节点"
    },
    SpriteFrame_BetCheck: {
      "default": null,
      type: cc.SpriteFrame,
      tooltip: "核对下注图片"
    },
    SpriteFrame_BetBackground: {
      "default": null,
      type: cc.SpriteFrame,
      tooltip: "下注背景图片"
    },
    Label_TimeLottery: {
      "default": null,
      type: cc.Label,
      tooltip: "开奖倒计时文本"
    },
    Label_TimeBet: {
      "default": null,
      type: cc.Label,
      tooltip: "下注倒计时文本"
    },
    AnimationArray_run: {
      "default": [],
      type: [cc.Animation],
      tooltip: '奔跑动画数组'
    },
    AudioSource_Bet: {
      "default": null,
      type: cc.AudioSource,
      tooltip: '下注音效'
    }
  },
  //取消注册
  onDestroy: function onDestroy() {
    KBEngine.Event.deregister("onDogRaceRunALottery", this);
    KBEngine.Event.deregister("onGetAccountInfo", this);
    KBEngine.Event.deregister("onDogRaceBetResult", this);
    KBEngine.Event.deregister("onGetDogRaceInfo", this);
  },
  start: function start() {
    KBEngine.Event.register("onDogRaceRunALottery", this, "onDogRaceRunALottery");
    KBEngine.Event.register("onGetAccountInfo", this, "onGetAccountInfo");
    KBEngine.Event.register("onDogRaceBetResult", this, "onDogRaceBetResult");
    KBEngine.Event.register("onGetDogRaceInfo", this, "onGetDogRaceInfo");
    KBEngine.app.player().reqGetDogRaceInfo(); //请求赛狗比赛信息

    this._chip = this.Default_chip; //初始筹码

    this._betCheckSprite = new Array(); //下注检查图片

    this._arrayBetDanShuang = new Array(6); //1-6名压大小单双

    this._arrayBetQianEr = new Array(6); //与其他5条狗组成前二

    this._arrayBetDanYa = new Array(6); //单压1-6名

    for (var i = 0; i < 6; i++) {
      this._arrayBetDanShuang[i] = [0, 0, 0, 0]; //大小单双，四种情况

      this._arrayBetQianEr[i] = [0, 0, 0, 0, 0, 0]; //与其他5条狗组成前二，增加一个占位元素，以保证序号对齐

      this._arrayBetDanYa[i] = [0, 0, 0, 0, 0, 0]; //单压1-6名，6种情况
    }

    this.LabelJinBi.string = Global.accountInfo["nCoin"].lo; //刷新总金币数

    this.onBtnClick_ClearBet(); //清除下注

    var self = this;
    this.node.on('Event_PaoGouConfirm', function (event) {
      event.stopPropagation(); //停止传递当前事件            

      self.SetPanelInteraction(true); //一局比赛完成，解除界面交互限制
      //中奖展示

      self.LabelJinBi.string = Global.accountInfo["nCoin"].lo; //总金币数

      if (self._winCoin > 0) {
        //动态加载中奖金币预制件
        cc.loader.loadRes("WinCoins", function (err, prefab) {
          var coinPrefab = cc.instantiate(prefab); //克隆

          coinPrefab.parent = cc.find("Canvas");
          coinPrefab.x = 0;
          coinPrefab.y = 0;
          var startPos = coinPrefab.getPosition(); //起点局部坐标

          var startPos_world = coinPrefab.convertToWorldSpaceAR(cc.v2(0, 0)); //起点世界坐标

          var endPos_world = self.LabelJinBi.node.convertToWorldSpaceAR(cc.v2(0, 0)); //终点世界坐标

          var vector = new cc.Vec2(endPos_world.x - startPos_world.x, endPos_world.y - startPos_world.y); //差向量

          var endPos = new cc.Vec2(startPos.x + vector.x, startPos.y + vector.y); //终点局部坐标

          coinPrefab.getComponent("winCoins").Initialize(self._winCoin, startPos, endPos);
          cc.loader.releaseRes(prefab); //释放资源
        });
      }
    });
  },
  update: function update(dt) {
    if (this._nTimeLottery > 0) {
      //开奖倒计时
      this._nTimeLottery -= dt;
      this.Label_TimeLottery.string = Math.round(this._nTimeLottery); //刷新时间
    }

    if (this._nTimeBet > 0) {
      //下注倒计时
      this._nTimeBet -= dt;
      this.Label_TimeBet.string = Math.round(this._nTimeBet); //刷新时间

      if (this._nTimeBet <= 0) {
        this.SetPanelInteraction(false);
        KBEngine.app.player().reqGetDogRaceInfo(); //刷新一下赛狗信息
      }
    }
  },
  //换筹码
  RadioButtonClicked_chip: function RadioButtonClicked_chip(toggle, chip) {
    this._chip = parseInt(chip);
  },
  //单压下注
  onBtnClick_BetDanYa: function onBtnClick_BetDanYa(event, index) {
    index = parseInt(index);
    var num = Math.floor(index / 6); //狗的号码

    var rank = index % 6; //名次

    this._arrayBetDanYa[num][rank] += this._chip; //增加下注

    if (this._arrayBetDanYa[num][rank] > 10000) {
      this._arrayBetDanYa[num][rank] = 10000;
    }

    this.LabelArray_BetDanYa[index].string = this._arrayBetDanYa[num][rank]; //刷新下注文本

    this.LabelTotalBet.string = this.GetDuZhu(); //刷新总下注文本

    var btn = event.target.getComponent(cc.Button);
    btn.normalSprite = this.SpriteFrame_BetCheck; //修改按钮图片

    this._betCheckSprite.push(btn); //播放奔跑动画


    this.AnimationArray_run[num].play(); //播放下注音效

    this.AudioSource_Bet.play();
  },
  //单双下注
  onBtnClick_BetDanShuang: function onBtnClick_BetDanShuang(event, index) {
    index = parseInt(index);
    var rank = Math.floor(index / 4); //名次

    var state = index % 4; //大小单双4种情况

    this._arrayBetDanShuang[rank][state] += this._chip; //增加下注

    if (this._arrayBetDanShuang[rank][state] > 10000) {
      this._arrayBetDanShuang[rank][state] = 10000;
    }

    this.LabelArray_BetDanShuang[index].string = this._arrayBetDanShuang[rank][state]; //刷新下注文本

    this.LabelTotalBet.string = this.GetDuZhu(); //刷新总下注文本

    var btn = event.target.getComponent(cc.Button);
    btn.normalSprite = this.SpriteFrame_BetCheck; //修改按钮图片

    this._betCheckSprite.push(btn); //播放下注音效


    this.AudioSource_Bet.play();
  },
  //前二下注
  onBtnClick_BetQianEr: function onBtnClick_BetQianEr(event, index) {
    index = parseInt(index);
    var num1 = Math.floor(index / 6); //第一名号码

    var num2 = index % 6; //第二名号码

    this._arrayBetQianEr[num1][num2] += this._chip; //增加下注

    if (this._arrayBetQianEr[num1][num2] > 10000) {
      this._arrayBetQianEr[num1][num2] = 10000;
    }

    this.LabelArray_BetQianEr[index].string = this._arrayBetQianEr[num1][num2]; //刷新下注文本

    this.LabelTotalBet.string = this.GetDuZhu(); //刷新总下注文本

    var btn = event.target.getComponent(cc.Button);
    btn.normalSprite = this.SpriteFrame_BetCheck; //修改按钮图片

    this._betCheckSprite.push(btn); //播放下注音效


    this.AudioSource_Bet.play();
  },
  //点击清除下注按钮
  onBtnClick_ClearBet: function onBtnClick_ClearBet() {
    for (var i = 0; i < 6; i++) {
      this._arrayBetDanShuang[i] = [0, 0, 0, 0]; //大小单双，四种情况

      this._arrayBetQianEr[i] = [0, 0, 0, 0, 0, 0]; //与其他5条狗组成前二，增加一个占位元素，以保证序号对齐

      this._arrayBetDanYa[i] = [0, 0, 0, 0, 0, 0]; //单压1-6名，6种情况
    }

    for (var i = 0; i < this.LabelArray_BetDanYa.length; i++) {
      this.LabelArray_BetDanYa[i].string = "0"; //刷新下注文本
    }

    for (var i = 0; i < this.LabelArray_BetDanShuang.length; i++) {
      this.LabelArray_BetDanShuang[i].string = "0"; //刷新下注文本
    }

    for (var i = 0; i < this.LabelArray_BetQianEr.length; i++) {
      if (this.LabelArray_BetQianEr[i]) {
        this.LabelArray_BetQianEr[i].string = "0"; //刷新下注文本
      }
    }

    this.LabelTotalBet.string = this.GetDuZhu(); //刷新总下注文本

    for (var i = 0; i < this._betCheckSprite.length; i++) {
      this._betCheckSprite[i].normalSprite = this.SpriteFrame_BetBackground; //修改按钮图片
    }

    this._betCheckSprite.splice(0, this._betCheckSprite.length); //清空数组
    //停止所有奔跑动画


    for (var j = 0; j < this.AnimationArray_run.length; j++) {
      this.AnimationArray_run[j].pause();
    }
  },
  //点击设置按钮
  onBtnClick_Setting: function onBtnClick_Setting() {
    this.Panel_Setting.active = !this.Panel_Setting.active;
  },
  //点击信息按钮
  onBtnClick_XinXi: function onBtnClick_XinXi() {
    this.PanelXinXi.active = !this.PanelXinXi.active;
  },
  //点击赛场按钮
  onBtnClick_saiChang: function onBtnClick_saiChang() {
    this.Panel_daojishi.active = !this.Panel_daojishi.active;
  },
  //点击开奖记录按钮
  onBtnClick_kaiJiangJiLu: function onBtnClick_kaiJiangJiLu() {
    this.Panel_kaiJiangJiLu.active = !this.Panel_kaiJiangJiLu.active;
  },
  //点击开始按钮
  onBtnClick_KaiShi: function onBtnClick_KaiShi() {
    var duzhu = this.GetDuZhu();

    if (duzhu <= 0) {
      this.Panel_qingxiazhu.active = true; //请下注

      return;
    }

    if (duzhu > Global.accountInfo["nCoin"].lo) {
      this.Panel_qianbugou.active = true; //钱不够了
    } else {
      //限制部分界面交互功能
      this.SetPanelInteraction(false); //给服务器发消息

      var nListBet = [this._arrayBetDanYa, this._arrayBetQianEr, this._arrayBetDanShuang];
      KBEngine.app.player().reqDogRaceBet(nListBet, Global.currentGameID); //最后一个参数是游戏ID

      Global.accountInfo["nCoin"].lo = Global.accountInfo["nCoin"].lo - duzhu; //总金币数扣除赌注金额

      this.LabelJinBi.string = Global.accountInfo["nCoin"].lo; //刷新总金币数            
    }
  },
  //赛狗下注返回结果
  onDogRaceBetResult: function onDogRaceBetResult(bSuccess) {
    KBEngine.app.player().reqGetDogRaceInfo(); //刷新一下赛狗信息

    if (bSuccess === 1) {//下注成功            
    } else {//下注失败
      }
  },
  //赛狗比赛信息
  onGetDogRaceInfo: function onGetDogRaceInfo(bBetAllow, nTime1, nTime2) {
    this.SetPanelInteraction(bBetAllow);
    this._nTimeLottery = nTime1; //开奖倒计时

    this._nTimeBet = nTime2; //下注倒计时
  },
  //接收到服务器消息：返回游戏结果
  onDogRaceRunALottery: function onDogRaceRunALottery(nResultList, nWinCoin) {
    this._winCoin = nWinCoin.lo; //保存服务器返回的本局赢多少钱

    KBEngine.app.player().reqGetAccountInfo(); //请求账户信息

    KBEngine.app.player().reqGetDogRaceInfo(); //刷新一下赛狗信息

    var rankArray = new Array(nResultList.length); //转换结果数组，因为客户端和服务器对nResultList的解释不同

    for (var i = 0; i < nResultList.length; i++) {
      rankArray[nResultList[i]] = i;
    } //播放赛狗比赛动画


    var panel = cc.instantiate(this.Prefab_HorseRacing); //克隆

    panel.getComponent("paogou").SetData(rankArray, this._winCoin);
    panel.parent = cc.find("Canvas");
    this.onBtnClick_ClearBet(); //关闭赛场倒计时界面

    this.Panel_daojishi.active = false;
  },
  //收到消息:得到账户信息
  onGetAccountInfo: function onGetAccountInfo(nSuccess, dict, dictList) {
    if (nSuccess === 1) {
      //success
      //保存用户信息
      Global.accountInfo = dict;
      Global.freeTimes = dictList;
    } else {//fail
    }
  },
  //点击音乐开关
  onToggleClick_YinYue: function onToggleClick_YinYue(toggle, customEventData) {
    if (toggle.isChecked) {
      for (var i = 0; i < this.NodeMusicParent.children.length; i++) {
        this.NodeMusicParent.children[i].getComponent(cc.AudioSource).volume = 1;
      }
    } else {
      for (var i = 0; i < this.NodeMusicParent.children.length; i++) {
        this.NodeMusicParent.children[i].getComponent(cc.AudioSource).volume = 0;
      }
    }
  },
  //点击音效开关
  onToggleClick_YinXiao: function onToggleClick_YinXiao(toggle, customEventData) {
    if (toggle.isChecked) {
      for (var i = 0; i < this.NodeEffectParent.children.length; i++) {
        this.NodeEffectParent.children[i].getComponent(cc.AudioSource).volume = 1;
      }
    } else {
      for (var i = 0; i < this.NodeEffectParent.children.length; i++) {
        this.NodeEffectParent.children[i].getComponent(cc.AudioSource).volume = 0;
      }
    }
  },
  //点击返回大厅按钮
  onBtnClick_BackHall: function onBtnClick_BackHall() {
    cc.director.loadScene("hall");
  },
  //调整界面交互性
  SetPanelInteraction: function SetPanelInteraction(interactable) {
    var length = this.BtnArrayInteraction.length;

    for (var i = 0; i < length; i++) {
      this.BtnArrayInteraction[i].interactable = interactable;
    }
  },
  //计算得到下注金额
  GetDuZhu: function GetDuZhu() {
    var duzhu = 0;

    for (var i = 0; i < 6; i++) {
      duzhu += this._arrayBetDanShuang[i][0];
      duzhu += this._arrayBetDanShuang[i][1];
      duzhu += this._arrayBetDanShuang[i][2];
      duzhu += this._arrayBetDanShuang[i][3];
      duzhu += this._arrayBetQianEr[i][0];
      duzhu += this._arrayBetQianEr[i][1];
      duzhu += this._arrayBetQianEr[i][2];
      duzhu += this._arrayBetQianEr[i][3];
      duzhu += this._arrayBetQianEr[i][4];
      duzhu += this._arrayBetQianEr[i][5];
      duzhu += this._arrayBetDanYa[i][0];
      duzhu += this._arrayBetDanYa[i][1];
      duzhu += this._arrayBetDanYa[i][2];
      duzhu += this._arrayBetDanYa[i][3];
      duzhu += this._arrayBetDanYa[i][4];
      duzhu += this._arrayBetDanYa[i][5];
    }

    return duzhu;
  },
  //点击关闭界面按钮
  onBtnClick_ClosePanel: function onBtnClick_ClosePanel(event, customEventData) {
    event.target.parent.active = false;
  }
});

cc._RF.pop();