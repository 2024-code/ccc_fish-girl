
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Holdem/HoldemMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08e464wYzRBLqPzfOdEMOZs', 'HoldemMain');
// Script/Holdem/HoldemMain.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
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
    jinbi: cc.Node,
    countdown: cc.Label,
    win: cc.Node,
    lose: cc.Node,
    _pai: null,
    _pais: [],
    _text: null,
    _zongzhu: null,
    _btnFirst: null,
    _btnSecond: null,
    _btnThird: null,
    _Checkbox: [],
    _secondLeft: [],
    _secondOther: [],
    _thirdLeft: [],
    _thirdOther: [],
    _thirdAllIn: null,
    _thirdJiazhu: null,
    _jiaZhu: null,
    _jiaZhu_cover: null,
    _timeout: null,
    timerCounter: 0,
    exitBtn: cc.Node,
    com_help: cc.Node,
    com_paixing: cc.Node,
    bgAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  start: function start() {
    cc.log('进入德州扑克================================================');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.playerInfo.setGameObj_Function(this);
    this.netWork = require("HoldemNetWork").getInstant;
    this.netWork.setHoldemObj_Function(this);
    this.gameInit_Function();
    cc.audioEngine.playMusic(this.bgAudio);
  },
  gameInit_Function: function gameInit_Function() {
    for (var i = 0; i < 5; i++) {
      this._seats.push(cc.find("Canvas/seat" + i).getComponent("HoldemSeat"));
    }

    this._timeLabel = cc.find("Canvas/time").getComponent(cc.Label);
    this._tips = cc.find("Canvas/tips").getComponent(cc.Label);
    this._difen = cc.find("Canvas/difen").getComponent(cc.Label);
    this._zongzhu = cc.find("Canvas/zongxiazhu/label").getComponent(cc.Label);
    this._text = cc.find("Canvas/text0").getComponent(cc.Label);
    this._text.string = "白手起家(6人)：" + Helper.fixNum(this.netWork.consume_num) + "/" + Helper.fixNum(2 * this.netWork.consume_num) + " 扑克牌：5-A 限注(1倍底池)";
    this._pai = cc.find("Canvas/pai");

    for (var i = 0; i < this._pai.childrenCount; i++) {
      this._pais[i] = this._pai.getChildByName("pai" + i);
    }

    ;
    this._pai.active = false;
    this._difen.node.active = true;
    this._btnFirst = cc.find("Canvas/buttons/first");
    this._btnSecond = cc.find("Canvas/buttons/second");
    this._btnThird = cc.find("Canvas/buttons/third");
    this._btnThird.active = false;
    this._btnSecond.active = false;
    this._btnFirst.active = false;

    for (var i = 0; i < this._btnFirst.childrenCount; i++) {
      this._Checkbox[i] = this._btnFirst.children[i];
      this._Checkbox[i].getChildByName('button').index = i;
      this.addClickEvent(this._Checkbox[i].getChildByName('button'), this.node, "HoldemMain", "onBtnClicked");
    }

    ;

    for (var i = 0; i < 3; i++) {
      this._secondLeft[i] = this._btnSecond.getChildByName('dichi' + i);
      this._secondLeft[i].index = i;
      this.addClickEvent(this._secondLeft[i], this.node, "HoldemMain", "onBtnClicked");
    }

    ;

    for (var i = 0; i < 3; i++) {
      this._secondOther[i] = this._btnSecond.getChildByName('dichi_cover' + i);
      this._secondOther[i].index = i;
    }

    ;

    for (var i = 0; i < 5; i++) {
      this._thirdLeft[i] = this._btnThird.getChildByName('tnum' + i);
      this._thirdLeft[i].index = i;
      this.addClickEvent(this._thirdLeft[i], this.node, "HoldemMain", "onBtnClicked");
    }

    ;

    for (var i = 0; i < 5; i++) {
      this._thirdOther[i] = this._btnThird.getChildByName('tnum_cover' + i);
      this._thirdOther[i].index = i;
    }

    ;
    this._thirdJiazhu = this._btnThird.getChildByName('tjiazhu');
    this.addClickEvent(this._thirdJiazhu, this.node, "HoldemMain", "onBtnClicked");
    this._thirdAllIn = this._btnThird.getChildByName('select').getChildByName('quanxia');
    this.addClickEvent(this._thirdAllIn, this.node, "HoldemMain", "onBtnClicked");
    this._genPai = this._btnSecond.getChildByName('genpai');
    this._rangPai = this._btnSecond.getChildByName('rangpai');
    this._qiPai = this._btnSecond.getChildByName('qipai');
    this._jiaZhu = this._btnSecond.getChildByName('jiazhu');
    this._jiaZhu_cover = this._btnSecond.getChildByName('jiazhu_cover');
    this.addClickEvent(this.back, this.node, "HoldemMain", "onBtnClicked");
    this.addClickEvent(this._genPai, this.node, "HoldemMain", "onBtnClicked");
    this.addClickEvent(this._rangPai, this.node, "HoldemMain", "onBtnClicked");
    this.addClickEvent(this._qiPai, this.node, "HoldemMain", "onBtnClicked");
    this.addClickEvent(this._jiaZhu, this.node, "HoldemMain", "onBtnClicked");
    this.initView();
    this.initSeats();
    console.log('fist————————：' + JSON.stringify(this.netWork.seats)); //reconnectP = 2重连 1不是

    if (this.netWork.reconnectP == 2) {
      this.netWork.holdemSocket.emit("getGameInfoByUserid");
      this.netWork.holdemSocket.emit("game_userInfoById_push");
    }

    this.netWork.holdemSocket.emit("ready");
    this.netWork.holdemSocket.emit("getUserHolds");
  },
  initView: function initView() {
    this._tips.node.active = true;
    this._zongzhu.string = Helper.fixNum(0);
    this._difen.string = Helper.fixNum(0);
    this._difen.money = 0;
  },
  restart: function restart() {
    if (this._zongzhu) this._zongzhu.string = Helper.fixNum(0);

    if (this._difen) {
      this._difen.string = Helper.fixNum(0);
      this._difen.money = 0;
    }

    this.win.active = false;
    this.lose.active = false;
    this._pai.active = false;
    this._tips.node.active = true;
    var seats = this.netWork.seats;

    if (seats) {
      for (var i = 0; i < seats.length; ++i) {
        var index = this.netWork.getLocalIndexByUserId(seats[i].userid);

        this._seats[index].restart();

        this._seats[index].status = "";
      }
    }

    this.netWork.holdemSocket.emit("ready");
  },
  initSeats: function initSeats() {
    var seats = this.netWork.seats;

    for (var i = 0; i < seats.length; ++i) {
      // console.log('返回座位信息============' + JSON.stringify(seats[i]));
      this.initSingleSeat(seats[i]);
    }
  },
  initSingleSeat: function initSingleSeat(seat) {
    var index = this.netWork.getLocalIndexByUserId(seat.userid);

    this._seats[index].setInfo(seat.name, seat.score, seat.headimgurl);

    this._seats[index].setReady(seat.ready);

    this._seats[index].setID(seat.userid);
  },
  onBtnSettingsClicked: function onBtnSettingsClicked() {//cc.vv.popupMgr.showSettings();
  },
  onBtnClicked: function onBtnClicked(event) {
    if (event.target.name == "button") {
      for (var i = 0; i < this._Checkbox.length; i++) {
        if (event.target.index == i) {
          continue;
        } else {
          this._Checkbox[i].getComponent("CheckBox").checked = false;

          this._Checkbox[i].getComponent("CheckBox").refresh();
        }
      }

      ;
    }

    if (event.target.name == "back") {
      this.netWork.holdemSocket.emit("LogoutRoom");
    }

    if (event.target.name == "rangpai") {
      this.netWork.holdemSocket.emit("rangpai");
    }

    if (event.target.name == "qipai") {
      this.netWork.holdemSocket.emit("qipai");
    }

    if (event.target.name == "genpai") {
      this.netWork.holdemSocket.emit("genpai", event.target.money);
    }

    if (event.target.name == "jiazhu") {
      this._btnThird.active = true;
      this._btnSecond.active = false;
    }

    if (event.target.name.indexOf('dichi') > -1) {
      this.netWork.holdemSocket.emit("jiazhu", event.target.money);
    }

    if (event.target.name.indexOf('tnum') > -1) {
      this.netWork.holdemSocket.emit("jiazhu", event.target.money);
    }

    if (event.target.name.indexOf('tjiazhu') > -1) {
      console.log("money = :" + event.target.money);
      this.netWork.holdemSocket.emit("jiazhu", event.target.money);
    }

    if (event.target.name.indexOf('quanxia') > -1) {
      this.netWork.holdemSocket.emit("jiazhu", event.target.money);
    }
  },
  //转换对应的牌
  ConversionCardRes: function ConversionCardRes(n) {
    var type = 4;
    var color = 1;

    if (n >= 13 && n < 26) {
      type = 3;
      n = n - 13;
      color = 2;
    } else if (n >= 26 && n < 39) {
      type = 2;
      n = n - 26;
    } else if (n >= 39 && n < 52) {
      type = 1;
      n = n - 39;
      color = 2;
    } else {
      type = 4;
    }

    var num = 0;
    num = n + 2;

    if (num == 14) {
      num = 1;
    }

    var data = {
      num: this.paigroup.getSpriteFrame(num + "-" + color),
      h_s: this.paigroup.getSpriteFrame("huase_small0" + type),
      h_b: this.paigroup.getSpriteFrame("huase_big0" + type)
    };
    return data;
  },
  showOtherSeat: function showOtherSeat(type) {
    var seats = this.netWork.seats;

    for (var i = 0; i < seats.length; i++) {
      var index = this.netWork.getLocalIndexByUserId(seats[i].userid);

      if (type == 1) {
        this._seats[index].showBeiPai(true); //显示牌的背面

      }

      if (type == 2) {
        this._seats[index].showOps(); //隐藏其他桌子的操作icon


        this._seats[index].hideScore();
      }
    }

    ;
  },
  setBtnOps: function setBtnOps(type, obj) {
    if (type == 1) {
      this._btnFirst.active = false;
      this._btnThird.active = false;
      this._btnSecond.active = true;
      this._btnThird.getChildByName("select").getChildByName("slider").getChildByName("Handle").y = -172;
    }

    if (type == 2) {
      this._btnSecond.active = false;
      this._btnFirst.active = true;
      this._btnThird.active = false;
      this._Checkbox[1].active = true;
      this._Checkbox[2].active = false;
      this._Checkbox[3].active = true;
      this._Checkbox[4].active = false;
    }

    if (type == 3) {
      this._btnThird.active = true;
      this._btnSecond.active = false;
      this._btnFirst.active = false;
    }

    if (type == 4) {
      this._btnThird.active = false;
      this._btnSecond.active = false;
      this._btnFirst.active = false;
    }

    if (type == 5) {
      for (var i = 0; i < this._thirdLeft.length; i++) {
        this._thirdLeft[i].getChildByName('num').getComponent(cc.Label).string = Helper.fixNum(obj[i]);
        this._thirdLeft[i].money = obj[i];
        this._thirdOther[i].getChildByName('num').getComponent(cc.Label).string = Helper.fixNum(obj[i]);
      }
    }

    if (obj && type != 5) {
      if (obj.canGen) {
        this._genPai.active = true;
        this._rangPai.active = false;
        this._genPai.money = obj.GenMoney;
        this._genPai.getChildByName('num').getComponent(cc.Label).string = "跟" + Helper.fixNum(obj.GenMoney);

        if (obj.needAllIn) {
          this._genPai.getChildByName('num').getComponent(cc.Label).string = "全下";
          this._jiaZhu.active = false;
          this._jiaZhu_cover.active = true;
        } else {
          this._jiaZhu.active = true;
          this._jiaZhu_cover.active = false;
        }
      } else {
        this._genPai.active = false;
        this._rangPai.active = true;
        this._jiaZhu_cover.active = false;
      }

      for (var i = 0; i < 3; i++) {
        this._secondLeft[i].getChildByName('title').getComponent(cc.Label).string = obj.extraAddOps[i].desc;
        this._secondLeft[i].money = obj.extraAddOps[i].money;
        this._secondOther[i].getChildByName('title').getComponent(cc.Label).string = obj.extraAddOps[i].desc;

        if (obj.addMaxMoney >= obj.extraAddOps[i].money) {
          this._secondLeft[i].active = true;
          this._secondOther[i].active = false;
        } else {
          this._secondLeft[i].active = false;
          this._secondOther[i].active = true;
        }

        if (obj.needAllIn && this._genPai.money < obj.extraAddOps[i].money) {
          this._secondLeft[i].active = false;
          this._secondOther[i].active = true;
        }
      }

      for (var i = 0; i < 5; i++) {
        if (obj.addMaxMoney >= this._thirdLeft[i].money && obj.addMinMoney <= this._thirdLeft[i].money) {
          this._thirdLeft[i].active = true;
          this._thirdOther[i].active = false;
        } else {
          this._thirdLeft[i].active = false;
          this._thirdOther[i].active = true;
        }
      }

      ;
    }
  },
  refreshFirstBtn: function refreshFirstBtn(data) {
    if (parseInt(data.argStatus) == 1) {
      this._Checkbox[1].active = false;
      this._Checkbox[2].getChildByName("text").getComponent(cc.Label).string = "跟" + Helper.fixNum(data.genMoney);
      this._Checkbox[1].getComponent("CheckBox").checked = false;

      this._Checkbox[1].getComponent("CheckBox").refresh();

      this._Checkbox[2].active = true;
    } else if (parseInt(data.argStatus) == 2) {
      this._Checkbox[1].active = false;
      this._Checkbox[2].active = true;
      this._Checkbox[2].getChildByName("text").getComponent(cc.Label).string = "全下";
      this._Checkbox[3].active = false;
      this._Checkbox[4].active = true;
      this._Checkbox[1].getComponent("CheckBox").checked = false;

      this._Checkbox[1].getComponent("CheckBox").refresh();

      this._Checkbox[3].getComponent("CheckBox").checked = false;

      this._Checkbox[3].getComponent("CheckBox").refresh();
    } else {
      this._Checkbox[1].active = true;
      this._Checkbox[2].active = false;
      this._Checkbox[3].active = true;
      this._Checkbox[4].active = false;
    }

    this._Checkbox[2].money = data.genMoney;
    this._Checkbox[2].getComponent("CheckBox").checked = false;

    this._Checkbox[2].getComponent("CheckBox").refresh();
  },
  prepOps: function prepOps(data) {
    for (var i = 0; i < this._btnFirst.childrenCount; i++) {
      if (this._Checkbox[i].getComponent("CheckBox").checked) {
        if (i == 0 && data.canGuo) {
          this.netWork.holdemSocket.emit("rangpai");
        } else if (i == 0 && !data.canGuo) {
          this.netWork.holdemSocket.emit("qipai");
        }

        if (i == 1 && data.canGuo) {
          this.netWork.holdemSocket.emit("rangpai");
        }

        if (i == 2 && data.canGen) {
          this.netWork.holdemSocket.emit("genpai");
        }

        if (i == 3 && data.canGen) {
          this.netWork.holdemSocket.emit("genpai", this._Checkbox[2].money);
        }

        this._Checkbox[i].getComponent("CheckBox").checked = false;

        this._Checkbox[i].getComponent("CheckBox").refresh();
      }
    }
  },
  unchecked: function unchecked() {
    for (var i = 0; i < this._btnFirst.childrenCount; i++) {
      this._Checkbox[i].getComponent("CheckBox").checked = false;

      this._Checkbox[i].getComponent("CheckBox").refresh();
    }
  },
  onSliderBack: function onSliderBack(event) {
    this._thirdAllIn.active = false;
    var num = 0;

    if (event.progress >= 0.1 && event.progress < 0.2) {
      num = 100;
    } else if (event.progress >= 0.2 && event.progress < 0.3) {
      num = 200;
    } else if (event.progress >= 0.3 && event.progress < 0.4) {
      num = 300;
    } else if (event.progress >= 0.4 && event.progress < 0.5) {
      num = 400;
    } else if (event.progress >= 0.5 && event.progress < 0.6) {
      num = 500;
    } else if (event.progress >= 0.6 && event.progress < 0.7) {
      num = 600;
    } else if (event.progress >= 0.7 && event.progress < 0.8) {
      num = 700;
    } else if (event.progress >= 0.8 && event.progress < 0.9) {
      num = 800;
    } else if (event.progress >= 0.9 && event.progress < 1) {
      num = 900;
    } else if (event.progress == 1) {
      if (this._seats[0]._score == this._thirdJiazhu.maxMoney) {
        this._thirdAllIn.active = true;
        this._thirdAllIn.money = this._thirdJiazhu.maxMoney;
      }

      num = 1000;
    }

    if (this._thirdJiazhu.firstMoney + num >= this._thirdJiazhu.maxMoney) {
      this._thirdJiazhu.money = this._thirdJiazhu.maxMoney;
      console.log("third1 " + this._thirdJiazhu.money);
    } else {
      this._thirdJiazhu.money = this._thirdJiazhu.firstMoney + num;
      console.log("third2 " + this._thirdJiazhu.money);
    }

    this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(this._thirdJiazhu.money);
  },
  //断线重连刷新信息
  ReconnectionInfo: function ReconnectionInfo(data) {
    console.log('断线重连刷新信息:' + JSON.stringify(data));
    if (data.addOptions.length == 5) this.setBtnOps(5, data.addOptions);
    this._difen.string = Helper.fixNum(data.diChi);
    this._difen.money = data.diChi;
    this._tips.node.active = false;

    if (data.circleHolds.length > 0) {
      for (var i = 0; i < data.circleHolds.length; i++) {
        var paiRes = this.ConversionCardRes(parseInt(data.circleHolds[i]));
        this._pais[i].getChildByName('num').getComponent(cc.Sprite).spriteFrame = paiRes['num'];
        this._pais[i].getChildByName('hua1').getComponent(cc.Sprite).spriteFrame = paiRes['h_s'];
        this._pais[i].getChildByName('hua2').getComponent(cc.Sprite).spriteFrame = paiRes['h_b'];
      }

      ;
      if (this._pais[data.circleHolds.length - 1]) this._pais[data.circleHolds.length - 1].active = true;
      if (this._pais[data.circleHolds.length]) this._pais[data.circleHolds.length].active = false;
      if (this._pais[data.circleHolds.length + 1]) this._pais[data.circleHolds.length + 1].active = false;
      this._pai.active = true;
    }

    for (var i = 0; i < data.players.length; i++) {
      var index = this.netWork.getLocalIndexByUserId(data.players[i].userid);

      if (data.players[i].canOps) {
        cc.find('Canvas/seat' + index + '/toggle').active = true;

        this._seats[index].setTime(data.timer_Counter);
      } else {
        cc.find('Canvas/seat' + index + '/toggle').active = false;
      }

      var zhu = {
        money: data.players[i].cZhu,
        type: 1
      };

      this._seats[index].setZhu(zhu);

      this._seats[index].setMoney(data.players[i].money);
    }

    this.showOtherSeat(1);
    this.netWork.holdemSocket.emit("getUserInfoByUserid");
  },

  /**
   * 更新座位信息
   * @param {*} data 
   */
  updateSeatInfo: function updateSeatInfo(data) {
    this.initSingleSeat(data);
  },

  /**
   * 准备倒计时
   * @param {*} data 
   */
  countDown: function countDown(data) {
    // cc.log('下注时间==============' + JSON.stringify(data));
    this.countdown.string = data.countDown;
    this.countdown.node.active = true;

    if (data.countDown <= 0) {
      this.countdown.node.active = false;
    }
  },

  /**
   * 开始游戏
   * @param {*} data 
   */
  gameBegin: function gameBegin(data) {
    this._tips.node.active = false;

    for (var i = 0; i < data.players.length; i++) {
      var seat = this.netWork.getSeatByID(data.players[i].userid);
      seat.score = data.players[i].money;
      var index = this.netWork.getLocalIndexByUserId(data.players[i].userid);
      var zhu = {
        money: data.players[i].cZhu,
        type: 1
      };

      this._seats[index].setZhu(zhu);

      this._seats[index].setMoney(seat.score);
    }

    ;

    if (data.gameInfo.addOptions.length == 5) {
      this.setBtnOps(5, data.gameInfo.addOptions);
    }
  },

  /**
   * 
   * @param {*} data 
   */
  gameTurnChanged: function gameTurnChanged(data) {
    var index = this.netWork.getLocalIndexByUserId(data);

    for (var t = 0; t < 5; t++) {
      cc.find('Canvas/seat' + t + '/toggle').active = false;
    }

    cc.find('Canvas/seat' + index + '/toggle').active = true;

    this._seats[index].setTime();

    cc.find('Canvas/seat0/toggle').active = false;

    if (this._seats[0]._pai.active) {
      if (this._seats[0].status == "AllIn") {
        this.setBtnOps(4);
      } else {
        this.setBtnOps(2);
      }
    }
  },

  /**
   * 
   * @param {*} data 
   */
  myHolds: function myHolds(data) {
    if (data) {
      if (!this._seats[0]._pai.active) {
        this._tips.node.active = false;

        this._seats[0].setPai(data, this);
      }
    }
  },

  /**
   * 更新底池
   * @param {*} data 
   */
  updateDiChi: function updateDiChi(data) {
    this._difen.string = Helper.fixNum(data);
    this._difen.money = data;
  },

  /**
   * 我的信息
   * @param {*} data 
   */
  myInfo: function myInfo(data) {
    var index = this.netWork.getLocalIndexByUserId(data.userid);

    this._seats[index].setPai(data.holds, this);

    this._seats[index].setMoney(data.money);

    this.showOtherSeat(1);
  },

  /**
   * 
   * @param {*} data 
   */
  myTurn: function myTurn(data) {
    var index = this.netWork.getLocalIndexByUserId(data.userid);

    for (var t = 0; t < 5; t++) {
      cc.find('Canvas/seat' + t + '/toggle').active = false;
    }

    cc.find('Canvas/seat' + index + '/toggle').active = true;

    this._seats[index].setTime();

    this.setBtnOps(1, data);
    this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(data.addMinMoney);
    this._thirdJiazhu.money = data.addMinMoney;
    this._thirdJiazhu.firstMoney = data.addMinMoney;
    this._thirdJiazhu.maxMoney = data.addMaxMoney;
    this.prepOps(data);
  },
  myTurnForNoMoney: function myTurnForNoMoney(data) {
    this.setBtnOps(1, data);
    this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(data.addMinMoney);
    this._thirdJiazhu.money = data.addMinMoney;
    this._thirdJiazhu.firstMoney = data.addMinMoney;
    this._thirdJiazhu.maxMoney = data.addMaxMoney;
    this.prepOps(data);
  },

  /**
   * 过牌
   * @param {*} data 
   */
  oneGuo: function oneGuo(data) {
    var index = this.netWork.getLocalIndexByUserId(data);
    cc.find('Canvas/seat' + index + '/toggle').active = false;

    this._seats[index].showOps('rangpai');

    if (this._seats[0]._pai.active) {
      this.setBtnOps(2);
    }
  },

  /**
   * 跟注
   * @param {*} data 
   */
  oneGen: function oneGen(data) {
    var index = this.netWork.getLocalIndexByUserId(data.userid);

    this._seats[index].showOps('genpai');

    var d = {
      money: data.cZhu,
      type: 1
    };

    this._seats[index].setMoney(data.money);

    this._seats[index].setZhu(d);

    if (this._seats[0]._pai.active) {
      this.setBtnOps(2);
    }
  },

  /**
   * 加注
   * @param {*} data 
   */
  oneAdd: function oneAdd(data) {
    var index = this.netWork.getLocalIndexByUserId(data.userid);

    this._seats[index].showOps('jiazhu');

    var d = {
      money: data.cZhu,
      type: 1
    };

    this._seats[index].setMoney(data.money);

    this._seats[index].setZhu(d);

    if (this._seats[0]._pai.active) {
      this.setBtnOps(2);
    }
  },

  /**
   * 全压
   * @param {*} data 
   */
  oneAllIn: function oneAllIn(data) {
    var index = this.netWork.getLocalIndexByUserId(data.userid);

    this._seats[index].showOps('quanxia');

    var d = {
      money: data.cZhu,
      type: 1
    };

    this._seats[index].setMoney(data.money);

    this._seats[index].setZhu(d);

    this._seats[index].status = data.status;

    if (this._seats[0]._pai.active) {
      if (this.playerInfo.playerId == data.userid) {
        this.setBtnOps(4);
      }
    }
  },

  /**
   * 弃牌
   * @param {*} data 
   */
  oneQuit: function oneQuit(data) {
    var index = this.netWork.getLocalIndexByUserId(data);
    cc.find('Canvas/seat' + index + '/toggle').active = false;

    this._seats[index].showOps('qipai');

    this._seats[index].showBeiPai(false);

    if (this.playerInfo.playerId == data) this.setBtnOps(4);
  },

  /**
   * 
   * @param {*} data 
   */
  allGuo: function allGuo(data) {
    for (var i = 0; i < this._seats.length; i++) {
      if (this._seats[i].node.active) {
        var d = {
          money: 0,
          type: 1
        };

        this._seats[i].setZhu(d);
      }
    }

    ;
  },
  playersInNewCircle: function playersInNewCircle(data) {
    for (var i = 0; i < data.length; i++) {
      var seat = this.netWork.getSeatByID(data[i].userid);

      if (seat) {
        seat.score = (data.money * 0.01).toFixed(2);
        var index = this.netWork.getLocalIndexByUserId(data[i].userid);
        cc.find('Canvas/seat' + index + '/toggle').active = false;
        if (this._seats[index].status != "AllIn") this._seats[index].showOps();

        this._seats[index].setMoney(data[i].money);

        if (this._seats[index]._paimian && !this._seats[index]._paimian.active) {
          this._seats[index].hideScore();
        }

        if (this._seats[0]._pai.active) {
          if (this._seats[index].status == "AllIn") {
            this.setBtnOps(4);
          } else {
            this.setBtnOps(2);
          }
        } else {
          this._seats[0].hideScore();
        }
      }
    }

    ;
  },

  /**
   * 
   * @param {*} data 
   */
  newCircle: function newCircle(data) {
    cc.log('发牌了============================' + JSON.stringify(data));
    this._zongzhu.string = Helper.fixNum(this._difen.money);

    for (var i = 0; i < data.circleHolds.length; i++) {
      var paiRes = this.ConversionCardRes(parseInt(data.circleHolds[i]));
      this._pais[i].getChildByName('num').getComponent(cc.Sprite).spriteFrame = paiRes['num'];
      this._pais[i].getChildByName('hua1').getComponent(cc.Sprite).spriteFrame = paiRes['h_s'];
      this._pais[i].getChildByName('hua2').getComponent(cc.Sprite).spriteFrame = paiRes['h_b'];
    }

    ;
    if (this._pais[data.circleHolds.length - 1]) this._pais[data.circleHolds.length - 1].active = true;
    if (this._pais[data.circleHolds.length]) this._pais[data.circleHolds.length].active = false;
    if (this._pais[data.circleHolds.length + 1]) this._pais[data.circleHolds.length + 1].active = false;
    this._pai.active = true;
  },

  /**
   * 结算
   * @param {*} isLose 
   */
  settlement: function settlement(isLose) {
    if (isLose) {
      this.lose.active = true;
    } else {
      this.win.active = true;
    }
  },

  /**
   * 
   * @param {*} data 
   */
  caculateResult: function caculateResult(data) {
    cc.find('Canvas/seat0/toggle').active = false;
  },

  /**
   * 
   * @param {*} data 
   */
  myARGStatusChanged: function myARGStatusChanged(data) {
    this.refreshFirstBtn(data);
  },

  /**
   * 游戏结束
   * @param {*} data 
   */
  gameOver: function gameOver(data) {
    var self = this;
    this.showOtherSeat(2);

    for (var i = 0; i < data.length; i++) {
      var seat = this.netWork.getSeatByID(data[i].userid);

      if (seat) {
        seat.score = (data[i].money * 0.01).toFixed(2);
        var index = this.netWork.getLocalIndexByUserId(data[i].userid);

        this._seats[index].showHoldsPai(data[i].holds, this);

        this._seats[index].setMoney(data[i].money);

        if (data[i].isWinner) {
          this._seats[index].showWinText(parseInt(data[i].score[0]));
        } else {
          this._seats[index].showWinText();
        }
      }
    }

    this.setBtnOps(4);
    this._timeout = setTimeout(function () {
      self.restart();
    }, 3000);
  },

  /**
   * 
   * @param {*} data 
   */
  gameInfoById: function gameInfoById(data) {
    this.ReconnectionInfo(data);
  },

  /**
   * 
   * @param {*} data 
   */
  userInfoById: function userInfoById(data) {
    var index = this.netWork.getLocalIndexByUserId(data.userid);

    this._seats[index].setPai(data.holds, this);

    if (data.canOps) {
      this.setBtnOps(1, data);
    } else {
      this.setBtnOps(2, data);
    }

    this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(data.addMinMoney);
    this._thirdJiazhu.money = data.addMinMoney;
    this._thirdJiazhu.firstMoney = data.addMinMoney;
    this._thirdJiazhu.maxMoney = data.addMaxMoney;
    this.prepOps(data);
  },

  /**
   * 
   * @param {*}  
   */
  exitResult: function exitResult(data) {
    clearInterval(this._timeout);
    this.netWork.holdemSocket.disconnect();
    this.netWork.holdemSocket = null;
    cc.audioEngine.stopAll();
    cc.find('Canvas/Loading').active = !!!data;
    this.scheduleOnce(function () {
      cc.director.loadScene("LobbyMain");
    }, !!data ? 3 : 0.1);
  },

  /**
   * 离开房间
   * @param {*} data 
   */
  exitRoom: function exitRoom(data) {
    clearInterval(this._timeout); //刷新用户钱币数量

    this.getGemsAndCoins();
  },

  /**
   * 检测用户状态
   * @param {*} data 
   */
  changeUserState: function changeUserState(data) {
    var seat = data;
    var index = this.netWork.getLocalIndexByUserId(seat.userid);

    this._seats[index].seatHide();
  },
  //设置金币钻石数量
  getGemsAndCoins: function getGemsAndCoins() {
    var self = this; // cc.vv.userMgr.getGemsAndCoins(function(data) {
    //     cc.vv.userMgr.gems = data.gems;
    //     cc.vv.userMgr.coins = data.coins;
    // });
  },
  onClickCloseBd: function onClickCloseBd(e, v) {
    cc.find('Canvas/com_ingame_tips').active = false;
  },
  addClickEvent: function addClickEvent(node, target, component, handler, isReplace) {
    // console.log(component + ":" + handler);
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
  addSlideEvent: function addSlideEvent(node, target, component, handler) {
    var eventHandler = new cc.Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler;
    var slideEvents = node.getComponent(cc.Slider).slideEvents;
    slideEvents.push(eventHandler);
  },

  /**
   * 断开连接
   */
  disconnectNetWork_Function: function disconnectNetWork_Function() {
    try {
      this.netWork.holdemSocket.disconnect();
    } catch (error) {}

    ;
    this.netWork.holdemSocket = null; //this.com_MessageBox.active = true;
    //this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您已断线，请重新登录";
  },
  onDestroy: function onDestroy() {//cc.vv.voiceMgr.stop();
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
      if (this._timeLabel) this._timeLabel.string = "" + h + ":" + m;
    }
  },
  onCLick: function onCLick(ev, args) {
    if (args == 'help') {
      this.com_help.active = true;
    } else if (args == 'closeHelp') {
      this.com_help.active = false;
    } else if (args == 'paixing') {
      this.com_paixing.x = -500;
    } else if (args == 'closePaixing') {
      this.com_paixing.x = -3000;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxIb2xkZW1cXEhvbGRlbU1haW4uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJfc2VhdHMiLCJfdGltZUxhYmVsIiwiX2xhc3RQbGF5aW5nU2VhdCIsIl9wbGF5aW5nU2VhdCIsIl9sYXN0UGxheVRpbWUiLCJfc2hhcmVDb250ZW50IiwicGFpZ3JvdXAiLCJ0eXBlIiwiU3ByaXRlQXRsYXMiLCJiYWNrIiwiTm9kZSIsImppbmJpIiwiY291bnRkb3duIiwiTGFiZWwiLCJ3aW4iLCJsb3NlIiwiX3BhaSIsIl9wYWlzIiwiX3RleHQiLCJfem9uZ3podSIsIl9idG5GaXJzdCIsIl9idG5TZWNvbmQiLCJfYnRuVGhpcmQiLCJfQ2hlY2tib3giLCJfc2Vjb25kTGVmdCIsIl9zZWNvbmRPdGhlciIsIl90aGlyZExlZnQiLCJfdGhpcmRPdGhlciIsIl90aGlyZEFsbEluIiwiX3RoaXJkSmlhemh1IiwiX2ppYVpodSIsIl9qaWFaaHVfY292ZXIiLCJfdGltZW91dCIsInRpbWVyQ291bnRlciIsImV4aXRCdG4iLCJjb21faGVscCIsImNvbV9wYWl4aW5nIiwiYmdBdWRpbyIsIkF1ZGlvQ2xpcCIsInN0YXJ0IiwibG9nIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50Iiwic2V0R2FtZU9ial9GdW5jdGlvbiIsIm5ldFdvcmsiLCJzZXRIb2xkZW1PYmpfRnVuY3Rpb24iLCJnYW1lSW5pdF9GdW5jdGlvbiIsImF1ZGlvRW5naW5lIiwicGxheU11c2ljIiwiaSIsInB1c2giLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiX3RpcHMiLCJfZGlmZW4iLCJzdHJpbmciLCJIZWxwZXIiLCJmaXhOdW0iLCJjb25zdW1lX251bSIsImNoaWxkcmVuQ291bnQiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIm5vZGUiLCJjaGlsZHJlbiIsImluZGV4IiwiYWRkQ2xpY2tFdmVudCIsIl9nZW5QYWkiLCJfcmFuZ1BhaSIsIl9xaVBhaSIsImluaXRWaWV3IiwiaW5pdFNlYXRzIiwiY29uc29sZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZWF0cyIsInJlY29ubmVjdFAiLCJob2xkZW1Tb2NrZXQiLCJlbWl0IiwibW9uZXkiLCJyZXN0YXJ0IiwibGVuZ3RoIiwiZ2V0TG9jYWxJbmRleEJ5VXNlcklkIiwidXNlcmlkIiwic3RhdHVzIiwiaW5pdFNpbmdsZVNlYXQiLCJzZWF0Iiwic2V0SW5mbyIsIm5hbWUiLCJzY29yZSIsImhlYWRpbWd1cmwiLCJzZXRSZWFkeSIsInJlYWR5Iiwic2V0SUQiLCJvbkJ0blNldHRpbmdzQ2xpY2tlZCIsIm9uQnRuQ2xpY2tlZCIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsInJlZnJlc2giLCJpbmRleE9mIiwiQ29udmVyc2lvbkNhcmRSZXMiLCJuIiwiY29sb3IiLCJudW0iLCJkYXRhIiwiZ2V0U3ByaXRlRnJhbWUiLCJoX3MiLCJoX2IiLCJzaG93T3RoZXJTZWF0Iiwic2hvd0JlaVBhaSIsInNob3dPcHMiLCJoaWRlU2NvcmUiLCJzZXRCdG5PcHMiLCJvYmoiLCJ5IiwiY2FuR2VuIiwiR2VuTW9uZXkiLCJuZWVkQWxsSW4iLCJleHRyYUFkZE9wcyIsImRlc2MiLCJhZGRNYXhNb25leSIsImFkZE1pbk1vbmV5IiwicmVmcmVzaEZpcnN0QnRuIiwicGFyc2VJbnQiLCJhcmdTdGF0dXMiLCJnZW5Nb25leSIsInByZXBPcHMiLCJjYW5HdW8iLCJ1bmNoZWNrZWQiLCJvblNsaWRlckJhY2siLCJwcm9ncmVzcyIsIl9zY29yZSIsIm1heE1vbmV5IiwiZmlyc3RNb25leSIsIlJlY29ubmVjdGlvbkluZm8iLCJhZGRPcHRpb25zIiwiZGlDaGkiLCJjaXJjbGVIb2xkcyIsInBhaVJlcyIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicGxheWVycyIsImNhbk9wcyIsInNldFRpbWUiLCJ0aW1lcl9Db3VudGVyIiwiemh1IiwiY1podSIsInNldFpodSIsInNldE1vbmV5IiwidXBkYXRlU2VhdEluZm8iLCJjb3VudERvd24iLCJnYW1lQmVnaW4iLCJnZXRTZWF0QnlJRCIsImdhbWVJbmZvIiwiZ2FtZVR1cm5DaGFuZ2VkIiwidCIsIm15SG9sZHMiLCJzZXRQYWkiLCJ1cGRhdGVEaUNoaSIsIm15SW5mbyIsImhvbGRzIiwibXlUdXJuIiwibXlUdXJuRm9yTm9Nb25leSIsIm9uZUd1byIsIm9uZUdlbiIsImQiLCJvbmVBZGQiLCJvbmVBbGxJbiIsInBsYXllcklkIiwib25lUXVpdCIsImFsbEd1byIsInBsYXllcnNJbk5ld0NpcmNsZSIsInRvRml4ZWQiLCJfcGFpbWlhbiIsIm5ld0NpcmNsZSIsInNldHRsZW1lbnQiLCJpc0xvc2UiLCJjYWN1bGF0ZVJlc3VsdCIsIm15QVJHU3RhdHVzQ2hhbmdlZCIsImdhbWVPdmVyIiwic2VsZiIsInNob3dIb2xkc1BhaSIsImlzV2lubmVyIiwic2hvd1dpblRleHQiLCJzZXRUaW1lb3V0IiwiZ2FtZUluZm9CeUlkIiwidXNlckluZm9CeUlkIiwiZXhpdFJlc3VsdCIsImNsZWFySW50ZXJ2YWwiLCJkaXNjb25uZWN0Iiwic3RvcEFsbCIsInNjaGVkdWxlT25jZSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZXhpdFJvb20iLCJnZXRHZW1zQW5kQ29pbnMiLCJjaGFuZ2VVc2VyU3RhdGUiLCJzZWF0SGlkZSIsIm9uQ2xpY2tDbG9zZUJkIiwiZSIsInYiLCJjb21wb25lbnQiLCJoYW5kbGVyIiwiaXNSZXBsYWNlIiwiZXZlbnRIYW5kbGVyIiwiRXZlbnRIYW5kbGVyIiwiY2xpY2tFdmVudHMiLCJCdXR0b24iLCJhZGRTbGlkZUV2ZW50Iiwic2xpZGVFdmVudHMiLCJTbGlkZXIiLCJkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbiIsImVycm9yIiwib25EZXN0cm95IiwidXBkYXRlIiwiZHQiLCJtaW51dGVzIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsIm5vdyIsIl9sYXN0TWludXRlIiwiZGF0ZSIsImgiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwi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RCxNQUFBQSxDQUFDLEdBQUdBLENBQUMsR0FBRyxFQUFKLEdBQVMsTUFBTUEsQ0FBZixHQUFtQkEsQ0FBdkI7QUFDQSxVQUFJLEtBQUtqTyxVQUFULEVBQXFCLEtBQUtBLFVBQUwsQ0FBZ0J1RCxNQUFoQixHQUF5QixLQUFLd0ssQ0FBTCxHQUFTLEdBQVQsR0FBZUUsQ0FBeEM7QUFDeEI7QUFDSixHQXI1Qkk7QUFzNUJMRSxFQUFBQSxPQXQ1QkssbUJBczVCR0MsRUF0NUJILEVBczVCT0MsSUF0NUJQLEVBczVCYTtBQUNkLFFBQUlBLElBQUksSUFBSSxNQUFaLEVBQW9CO0FBQ2hCLFdBQUtuTSxRQUFMLENBQWMyQixNQUFkLEdBQXVCLElBQXZCO0FBQ0gsS0FGRCxNQUVPLElBQUl3SyxJQUFJLElBQUksV0FBWixFQUF5QjtBQUM1QixXQUFLbk0sUUFBTCxDQUFjMkIsTUFBZCxHQUF1QixLQUF2QjtBQUNILEtBRk0sTUFFQSxJQUFJd0ssSUFBSSxJQUFJLFNBQVosRUFBdUI7QUFDMUIsV0FBS2xNLFdBQUwsQ0FBaUJtTSxDQUFqQixHQUFxQixDQUFDLEdBQXRCO0FBQ0gsS0FGTSxNQUVBLElBQUlELElBQUksSUFBSSxjQUFaLEVBQTRCO0FBQy9CLFdBQUtsTSxXQUFMLENBQWlCbU0sQ0FBakIsR0FBcUIsQ0FBQyxJQUF0QjtBQUNIO0FBQ0o7QUFoNkJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfc2VhdHM6IFtdLFxyXG4gICAgICAgIF90aW1lTGFiZWw6IG51bGwsXHJcbiAgICAgICAgX2xhc3RQbGF5aW5nU2VhdDogbnVsbCxcclxuICAgICAgICBfcGxheWluZ1NlYXQ6IG51bGwsXHJcbiAgICAgICAgX2xhc3RQbGF5VGltZTogbnVsbCxcclxuICAgICAgICBfc2hhcmVDb250ZW50OiBudWxsLFxyXG4gICAgICAgIHBhaWdyb3VwOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYWNrOiBjYy5Ob2RlLFxyXG4gICAgICAgIGppbmJpOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvdW50ZG93bjogY2MuTGFiZWwsXHJcbiAgICAgICAgd2luOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxvc2U6IGNjLk5vZGUsXHJcbiAgICAgICAgX3BhaTogbnVsbCxcclxuICAgICAgICBfcGFpczogW10sXHJcbiAgICAgICAgX3RleHQ6IG51bGwsXHJcbiAgICAgICAgX3pvbmd6aHU6IG51bGwsXHJcbiAgICAgICAgX2J0bkZpcnN0OiBudWxsLFxyXG4gICAgICAgIF9idG5TZWNvbmQ6IG51bGwsXHJcbiAgICAgICAgX2J0blRoaXJkOiBudWxsLFxyXG4gICAgICAgIF9DaGVja2JveDogW10sXHJcbiAgICAgICAgX3NlY29uZExlZnQ6IFtdLFxyXG4gICAgICAgIF9zZWNvbmRPdGhlcjogW10sXHJcbiAgICAgICAgX3RoaXJkTGVmdDogW10sXHJcbiAgICAgICAgX3RoaXJkT3RoZXI6IFtdLFxyXG4gICAgICAgIF90aGlyZEFsbEluOiBudWxsLFxyXG4gICAgICAgIF90aGlyZEppYXpodTogbnVsbCxcclxuICAgICAgICBfamlhWmh1OiBudWxsLFxyXG4gICAgICAgIF9qaWFaaHVfY292ZXI6IG51bGwsXHJcbiAgICAgICAgX3RpbWVvdXQ6IG51bGwsXHJcbiAgICAgICAgdGltZXJDb3VudGVyOiAwLFxyXG4gICAgICAgIGV4aXRCdG46IGNjLk5vZGUsXHJcbiAgICAgICAgY29tX2hlbHA6IGNjLk5vZGUsXHJcbiAgICAgICAgY29tX3BhaXhpbmc6IGNjLk5vZGUsXHJcbiAgICAgICAgYmdBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MubG9nKCfov5vlhaXlvrflt57miZHlhYs9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKVxyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLnNldEdhbWVPYmpfRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrID0gcmVxdWlyZShcIkhvbGRlbU5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuc2V0SG9sZGVtT2JqX0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUluaXRfRnVuY3Rpb24oKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iZ0F1ZGlvKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2FtZUluaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VhdHMucHVzaChjYy5maW5kKFwiQ2FudmFzL3NlYXRcIiArIGkpLmdldENvbXBvbmVudChcIkhvbGRlbVNlYXRcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90aW1lTGFiZWwgPSBjYy5maW5kKFwiQ2FudmFzL3RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl90aXBzID0gY2MuZmluZChcIkNhbnZhcy90aXBzXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fZGlmZW4gPSBjYy5maW5kKFwiQ2FudmFzL2RpZmVuXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fem9uZ3podSA9IGNjLmZpbmQoXCJDYW52YXMvem9uZ3hpYXpodS9sYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3RleHQgPSBjYy5maW5kKFwiQ2FudmFzL3RleHQwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zdHJpbmcgPSBcIueZveaJi+i1t+Wutig25Lq6Ke+8mlwiICsgSGVscGVyLmZpeE51bSh0aGlzLm5ldFdvcmsuY29uc3VtZV9udW0pICsgXCIvXCIgKyBIZWxwZXIuZml4TnVtKDIgKiB0aGlzLm5ldFdvcmsuY29uc3VtZV9udW0pICsgXCIg5omR5YWL54mM77yaNS1BIOmZkOazqCgx5YCN5bqV5rGgKVwiXHJcbiAgICAgICAgdGhpcy5fcGFpID0gY2MuZmluZChcIkNhbnZhcy9wYWlcIik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wYWkuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhaXNbaV0gPSB0aGlzLl9wYWkuZ2V0Q2hpbGRCeU5hbWUoXCJwYWlcIiArIGkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fcGFpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RpZmVuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9idG5GaXJzdCA9IGNjLmZpbmQoXCJDYW52YXMvYnV0dG9ucy9maXJzdFwiKTtcclxuICAgICAgICB0aGlzLl9idG5TZWNvbmQgPSBjYy5maW5kKFwiQ2FudmFzL2J1dHRvbnMvc2Vjb25kXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0blRoaXJkID0gY2MuZmluZChcIkNhbnZhcy9idXR0b25zL3RoaXJkXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0blRoaXJkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2J0blNlY29uZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9idG5GaXJzdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2J0bkZpcnN0LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFtpXSA9IHRoaXMuX2J0bkZpcnN0LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFtpXS5nZXRDaGlsZEJ5TmFtZSgnYnV0dG9uJykuaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQodGhpcy5fQ2hlY2tib3hbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2J1dHRvbicpLCB0aGlzLm5vZGUsIFwiSG9sZGVtTWFpblwiLCBcIm9uQnRuQ2xpY2tlZFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlY29uZExlZnRbaV0gPSB0aGlzLl9idG5TZWNvbmQuZ2V0Q2hpbGRCeU5hbWUoJ2RpY2hpJyArIGkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWNvbmRMZWZ0W2ldLmluZGV4ID0gaTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50KHRoaXMuX3NlY29uZExlZnRbaV0sIHRoaXMubm9kZSwgXCJIb2xkZW1NYWluXCIsIFwib25CdG5DbGlja2VkXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fc2Vjb25kT3RoZXJbaV0gPSB0aGlzLl9idG5TZWNvbmQuZ2V0Q2hpbGRCeU5hbWUoJ2RpY2hpX2NvdmVyJyArIGkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWNvbmRPdGhlcltpXS5pbmRleCA9IGk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90aGlyZExlZnRbaV0gPSB0aGlzLl9idG5UaGlyZC5nZXRDaGlsZEJ5TmFtZSgndG51bScgKyBpKTtcclxuICAgICAgICAgICAgdGhpcy5fdGhpcmRMZWZ0W2ldLmluZGV4ID0gaTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50KHRoaXMuX3RoaXJkTGVmdFtpXSwgdGhpcy5ub2RlLCBcIkhvbGRlbU1haW5cIiwgXCJvbkJ0bkNsaWNrZWRcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90aGlyZE90aGVyW2ldID0gdGhpcy5fYnRuVGhpcmQuZ2V0Q2hpbGRCeU5hbWUoJ3RudW1fY292ZXInICsgaSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RoaXJkT3RoZXJbaV0uaW5kZXggPSBpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fdGhpcmRKaWF6aHUgPSB0aGlzLl9idG5UaGlyZC5nZXRDaGlsZEJ5TmFtZSgndGppYXpodScpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudCh0aGlzLl90aGlyZEppYXpodSwgdGhpcy5ub2RlLCBcIkhvbGRlbU1haW5cIiwgXCJvbkJ0bkNsaWNrZWRcIik7XHJcbiAgICAgICAgdGhpcy5fdGhpcmRBbGxJbiA9IHRoaXMuX2J0blRoaXJkLmdldENoaWxkQnlOYW1lKCdzZWxlY3QnKS5nZXRDaGlsZEJ5TmFtZSgncXVhbnhpYScpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudCh0aGlzLl90aGlyZEFsbEluLCB0aGlzLm5vZGUsIFwiSG9sZGVtTWFpblwiLCBcIm9uQnRuQ2xpY2tlZFwiKTtcclxuICAgICAgICB0aGlzLl9nZW5QYWkgPSB0aGlzLl9idG5TZWNvbmQuZ2V0Q2hpbGRCeU5hbWUoJ2dlbnBhaScpO1xyXG4gICAgICAgIHRoaXMuX3JhbmdQYWkgPSB0aGlzLl9idG5TZWNvbmQuZ2V0Q2hpbGRCeU5hbWUoJ3JhbmdwYWknKTtcclxuICAgICAgICB0aGlzLl9xaVBhaSA9IHRoaXMuX2J0blNlY29uZC5nZXRDaGlsZEJ5TmFtZSgncWlwYWknKTtcclxuICAgICAgICB0aGlzLl9qaWFaaHUgPSB0aGlzLl9idG5TZWNvbmQuZ2V0Q2hpbGRCeU5hbWUoJ2ppYXpodScpO1xyXG4gICAgICAgIHRoaXMuX2ppYVpodV9jb3ZlciA9IHRoaXMuX2J0blNlY29uZC5nZXRDaGlsZEJ5TmFtZSgnamlhemh1X2NvdmVyJyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQodGhpcy5iYWNrLCB0aGlzLm5vZGUsIFwiSG9sZGVtTWFpblwiLCBcIm9uQnRuQ2xpY2tlZFwiKTtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQodGhpcy5fZ2VuUGFpLCB0aGlzLm5vZGUsIFwiSG9sZGVtTWFpblwiLCBcIm9uQnRuQ2xpY2tlZFwiKTtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQodGhpcy5fcmFuZ1BhaSwgdGhpcy5ub2RlLCBcIkhvbGRlbU1haW5cIiwgXCJvbkJ0bkNsaWNrZWRcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50KHRoaXMuX3FpUGFpLCB0aGlzLm5vZGUsIFwiSG9sZGVtTWFpblwiLCBcIm9uQnRuQ2xpY2tlZFwiKTtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQodGhpcy5famlhWmh1LCB0aGlzLm5vZGUsIFwiSG9sZGVtTWFpblwiLCBcIm9uQnRuQ2xpY2tlZFwiKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICAgICAgICB0aGlzLmluaXRTZWF0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmaXN04oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU77yaJyArIEpTT04uc3RyaW5naWZ5KHRoaXMubmV0V29yay5zZWF0cykpO1xyXG5cclxuICAgICAgICAvL3JlY29ubmVjdFAgPSAy6YeN6L+eIDHkuI3mmK9cclxuICAgICAgICBpZiAodGhpcy5uZXRXb3JrLnJlY29ubmVjdFAgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJnZXRHYW1lSW5mb0J5VXNlcmlkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJnYW1lX3VzZXJJbmZvQnlJZF9wdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJyZWFkeVwiKTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJnZXRVc2VySG9sZHNcIik7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXRWaWV3OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fdGlwcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fem9uZ3podS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKDApO1xyXG4gICAgICAgIHRoaXMuX2RpZmVuLnN0cmluZyA9IEhlbHBlci5maXhOdW0oMCk7XHJcbiAgICAgICAgdGhpcy5fZGlmZW4ubW9uZXkgPSAwO1xyXG4gICAgfSxcclxuICAgIHJlc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fem9uZ3podSkgdGhpcy5fem9uZ3podS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKDApO1xyXG4gICAgICAgIGlmICh0aGlzLl9kaWZlbikge1xyXG4gICAgICAgICAgICB0aGlzLl9kaWZlbi5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKDApO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWZlbi5tb25leSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2luLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wYWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGlwcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIHNlYXRzID0gdGhpcy5uZXRXb3JrLnNlYXRzO1xyXG4gICAgICAgIGlmIChzZWF0cykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleEJ5VXNlcklkKHNlYXRzW2ldLnVzZXJpZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0ucmVzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnN0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLmhvbGRlbVNvY2tldC5lbWl0KFwicmVhZHlcIik7XHJcbiAgICB9LFxyXG4gICAgaW5pdFNlYXRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlYXRzID0gdGhpcy5uZXRXb3JrLnNlYXRzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhdHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+i/lOWbnuW6p+S9jeS/oeaBrz09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShzZWF0c1tpXSkpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRTaW5nbGVTZWF0KHNlYXRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdFNpbmdsZVNlYXQ6IGZ1bmN0aW9uIChzZWF0KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChzZWF0LnVzZXJpZCk7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNldEluZm8oc2VhdC5uYW1lLCBzZWF0LnNjb3JlLCBzZWF0LmhlYWRpbWd1cmwpO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRSZWFkeShzZWF0LnJlYWR5KTtcclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0SUQoc2VhdC51c2VyaWQpO1xyXG4gICAgfSxcclxuICAgIG9uQnRuU2V0dGluZ3NDbGlja2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9jYy52di5wb3B1cE1nci5zaG93U2V0dGluZ3MoKTtcclxuICAgIH0sXHJcbiAgICBvbkJ0bkNsaWNrZWQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQubmFtZSA9PSBcImJ1dHRvblwiKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fQ2hlY2tib3gubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaW5kZXggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9DaGVja2JveFtpXS5nZXRDb21wb25lbnQoXCJDaGVja0JveFwiKS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbaV0uZ2V0Q29tcG9uZW50KFwiQ2hlY2tCb3hcIikucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lID09IFwiYmFja1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5ob2xkZW1Tb2NrZXQuZW1pdChcIkxvZ291dFJvb21cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5hbWUgPT0gXCJyYW5ncGFpXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmhvbGRlbVNvY2tldC5lbWl0KFwicmFuZ3BhaVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lID09IFwicWlwYWlcIikge1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJxaXBhaVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lID09IFwiZ2VucGFpXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmhvbGRlbVNvY2tldC5lbWl0KFwiZ2VucGFpXCIsIGV2ZW50LnRhcmdldC5tb25leSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQubmFtZSA9PSBcImppYXpodVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0blRoaXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0blNlY29uZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lLmluZGV4T2YoJ2RpY2hpJykgPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJqaWF6aHVcIiwgZXZlbnQudGFyZ2V0Lm1vbmV5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lLmluZGV4T2YoJ3RudW0nKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5ob2xkZW1Tb2NrZXQuZW1pdChcImppYXpodVwiLCBldmVudC50YXJnZXQubW9uZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5hbWUuaW5kZXhPZigndGppYXpodScpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb25leSA9IDpcIiArIGV2ZW50LnRhcmdldC5tb25leSk7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5ob2xkZW1Tb2NrZXQuZW1pdChcImppYXpodVwiLCBldmVudC50YXJnZXQubW9uZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5hbWUuaW5kZXhPZigncXVhbnhpYScpID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmhvbGRlbVNvY2tldC5lbWl0KFwiamlhemh1XCIsIGV2ZW50LnRhcmdldC5tb25leSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6L2s5o2i5a+55bqU55qE54mMXHJcbiAgICBDb252ZXJzaW9uQ2FyZFJlczogZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICB2YXIgdHlwZSA9IDQ7XHJcbiAgICAgICAgdmFyIGNvbG9yID0gMTtcclxuICAgICAgICBpZiAobiA+PSAxMyAmJiBuIDwgMjYpIHtcclxuICAgICAgICAgICAgdHlwZSA9IDM7XHJcbiAgICAgICAgICAgIG4gPSBuIC0gMTM7XHJcbiAgICAgICAgICAgIGNvbG9yID0gMjtcclxuICAgICAgICB9IGVsc2UgaWYgKG4gPj0gMjYgJiYgbiA8IDM5KSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAyO1xyXG4gICAgICAgICAgICBuID0gbiAtIDI2O1xyXG4gICAgICAgIH0gZWxzZSBpZiAobiA+PSAzOSAmJiBuIDwgNTIpIHtcclxuICAgICAgICAgICAgdHlwZSA9IDE7XHJcbiAgICAgICAgICAgIG4gPSBuIC0gMzk7XHJcbiAgICAgICAgICAgIGNvbG9yID0gMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0eXBlID0gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG51bSA9IDA7XHJcbiAgICAgICAgbnVtID0gbiArIDI7XHJcbiAgICAgICAgaWYgKG51bSA9PSAxNCkge1xyXG4gICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgbnVtOiB0aGlzLnBhaWdyb3VwLmdldFNwcml0ZUZyYW1lKG51bSArIFwiLVwiICsgY29sb3IpLFxyXG4gICAgICAgICAgICBoX3M6IHRoaXMucGFpZ3JvdXAuZ2V0U3ByaXRlRnJhbWUoXCJodWFzZV9zbWFsbDBcIiArIHR5cGUpLFxyXG4gICAgICAgICAgICBoX2I6IHRoaXMucGFpZ3JvdXAuZ2V0U3ByaXRlRnJhbWUoXCJodWFzZV9iaWcwXCIgKyB0eXBlKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSxcclxuICAgIHNob3dPdGhlclNlYXQ6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgdmFyIHNlYXRzID0gdGhpcy5uZXRXb3JrLnNlYXRzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChzZWF0c1tpXS51c2VyaWQpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2hvd0JlaVBhaSh0cnVlKTsgLy/mmL7npLrniYznmoTog4zpnaJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2hvd09wcygpOyAvL+makOiXj+WFtuS7luahjOWtkOeahOaTjeS9nGljb25cclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5oaWRlU2NvcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgc2V0QnRuT3BzOiBmdW5jdGlvbiAodHlwZSwgb2JqKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9idG5GaXJzdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYnRuVGhpcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0blNlY29uZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9idG5UaGlyZC5nZXRDaGlsZEJ5TmFtZShcInNlbGVjdFwiKS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDaGlsZEJ5TmFtZShcIkhhbmRsZVwiKS55ID0gLTE3MjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLl9idG5TZWNvbmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bkZpcnN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0blRoaXJkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbM10uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbNF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuVGhpcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fYnRuU2Vjb25kLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9idG5GaXJzdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idG5UaGlyZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYnRuU2Vjb25kLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9idG5GaXJzdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gNSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RoaXJkTGVmdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGhpcmRMZWZ0W2ldLmdldENoaWxkQnlOYW1lKCdudW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlbHBlci5maXhOdW0ob2JqW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RoaXJkTGVmdFtpXS5tb25leSA9IG9ialtpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RoaXJkT3RoZXJbaV0uZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bShvYmpbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmogJiYgdHlwZSAhPSA1KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouY2FuR2VuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW5QYWkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JhbmdQYWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW5QYWkubW9uZXkgPSBvYmouR2VuTW9uZXk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW5QYWkuZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLot59cIiArIEhlbHBlci5maXhOdW0ob2JqLkdlbk1vbmV5KTtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubmVlZEFsbEluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2VuUGFpLmdldENoaWxkQnlOYW1lKCdudW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5YWo5LiLXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5famlhWmh1LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ppYVpodV9jb3Zlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qaWFaaHUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qaWFaaHVfY292ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW5QYWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yYW5nUGFpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9qaWFaaHVfY292ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlY29uZExlZnRbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBvYmouZXh0cmFBZGRPcHNbaV0uZGVzYztcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlY29uZExlZnRbaV0ubW9uZXkgPSBvYmouZXh0cmFBZGRPcHNbaV0ubW9uZXk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWNvbmRPdGhlcltpXS5nZXRDaGlsZEJ5TmFtZSgndGl0bGUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG9iai5leHRyYUFkZE9wc1tpXS5kZXNjO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5hZGRNYXhNb25leSA+PSBvYmouZXh0cmFBZGRPcHNbaV0ubW9uZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWNvbmRMZWZ0W2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Vjb25kT3RoZXJbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlY29uZExlZnRbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Vjb25kT3RoZXJbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvYmoubmVlZEFsbEluICYmIHRoaXMuX2dlblBhaS5tb25leSA8IG9iai5leHRyYUFkZE9wc1tpXS5tb25leSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlY29uZExlZnRbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Vjb25kT3RoZXJbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5hZGRNYXhNb25leSA+PSB0aGlzLl90aGlyZExlZnRbaV0ubW9uZXkgJiYgb2JqLmFkZE1pbk1vbmV5IDw9IHRoaXMuX3RoaXJkTGVmdFtpXS5tb25leSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RoaXJkTGVmdFtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RoaXJkT3RoZXJbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RoaXJkTGVmdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aGlyZE90aGVyW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlZnJlc2hGaXJzdEJ0bjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAocGFyc2VJbnQoZGF0YS5hcmdTdGF0dXMpID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX0NoZWNrYm94WzJdLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6LefXCIgKyBIZWxwZXIuZml4TnVtKGRhdGEuZ2VuTW9uZXkpO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFsxXS5nZXRDb21wb25lbnQoXCJDaGVja0JveFwiKS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX0NoZWNrYm94WzFdLmdldENvbXBvbmVudChcIkNoZWNrQm94XCIpLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbMl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KGRhdGEuYXJnU3RhdHVzKSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NoZWNrYm94WzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFsyXS5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuWFqOS4i1wiO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFszXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbNF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbMV0uZ2V0Q29tcG9uZW50KFwiQ2hlY2tCb3hcIikuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFsxXS5nZXRDb21wb25lbnQoXCJDaGVja0JveFwiKS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0NoZWNrYm94WzNdLmdldENvbXBvbmVudChcIkNoZWNrQm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbM10uZ2V0Q29tcG9uZW50KFwiQ2hlY2tCb3hcIikucmVmcmVzaCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NoZWNrYm94WzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NoZWNrYm94WzJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFszXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9DaGVja2JveFs0XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ2hlY2tib3hbMl0ubW9uZXkgPSBkYXRhLmdlbk1vbmV5O1xyXG4gICAgICAgIHRoaXMuX0NoZWNrYm94WzJdLmdldENvbXBvbmVudChcIkNoZWNrQm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9DaGVja2JveFsyXS5nZXRDb21wb25lbnQoXCJDaGVja0JveFwiKS5yZWZyZXNoKCk7XHJcbiAgICB9LFxyXG4gICAgcHJlcE9wczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2J0bkZpcnN0LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fQ2hlY2tib3hbaV0uZ2V0Q29tcG9uZW50KFwiQ2hlY2tCb3hcIikuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCAmJiBkYXRhLmNhbkd1bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV0V29yay5ob2xkZW1Tb2NrZXQuZW1pdChcInJhbmdwYWlcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMCAmJiAhZGF0YS5jYW5HdW8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJxaXBhaVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpID09IDEgJiYgZGF0YS5jYW5HdW8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJyYW5ncGFpXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMiAmJiBkYXRhLmNhbkdlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV0V29yay5ob2xkZW1Tb2NrZXQuZW1pdChcImdlbnBhaVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpID09IDMgJiYgZGF0YS5jYW5HZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmVtaXQoXCJnZW5wYWlcIiwgdGhpcy5fQ2hlY2tib3hbMl0ubW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbaV0uZ2V0Q29tcG9uZW50KFwiQ2hlY2tCb3hcIikuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbaV0uZ2V0Q29tcG9uZW50KFwiQ2hlY2tCb3hcIikucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVuY2hlY2tlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYnRuRmlyc3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NoZWNrYm94W2ldLmdldENvbXBvbmVudChcIkNoZWNrQm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fQ2hlY2tib3hbaV0uZ2V0Q29tcG9uZW50KFwiQ2hlY2tCb3hcIikucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblNsaWRlckJhY2s6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuX3RoaXJkQWxsSW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIG51bSA9IDA7XHJcbiAgICAgICAgaWYgKGV2ZW50LnByb2dyZXNzID49IDAuMSAmJiBldmVudC5wcm9ncmVzcyA8IDAuMikge1xyXG4gICAgICAgICAgICBudW0gPSAxMDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5wcm9ncmVzcyA+PSAwLjIgJiYgZXZlbnQucHJvZ3Jlc3MgPCAwLjMpIHtcclxuICAgICAgICAgICAgbnVtID0gMjAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQucHJvZ3Jlc3MgPj0gMC4zICYmIGV2ZW50LnByb2dyZXNzIDwgMC40KSB7XHJcbiAgICAgICAgICAgIG51bSA9IDMwMDtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnByb2dyZXNzID49IDAuNCAmJiBldmVudC5wcm9ncmVzcyA8IDAuNSkge1xyXG4gICAgICAgICAgICBudW0gPSA0MDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5wcm9ncmVzcyA+PSAwLjUgJiYgZXZlbnQucHJvZ3Jlc3MgPCAwLjYpIHtcclxuICAgICAgICAgICAgbnVtID0gNTAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQucHJvZ3Jlc3MgPj0gMC42ICYmIGV2ZW50LnByb2dyZXNzIDwgMC43KSB7XHJcbiAgICAgICAgICAgIG51bSA9IDYwMDtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnByb2dyZXNzID49IDAuNyAmJiBldmVudC5wcm9ncmVzcyA8IDAuOCkge1xyXG4gICAgICAgICAgICBudW0gPSA3MDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5wcm9ncmVzcyA+PSAwLjggJiYgZXZlbnQucHJvZ3Jlc3MgPCAwLjkpIHtcclxuICAgICAgICAgICAgbnVtID0gODAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQucHJvZ3Jlc3MgPj0gMC45ICYmIGV2ZW50LnByb2dyZXNzIDwgMSkge1xyXG4gICAgICAgICAgICBudW0gPSA5MDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5wcm9ncmVzcyA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWF0c1swXS5fc2NvcmUgPT0gdGhpcy5fdGhpcmRKaWF6aHUubWF4TW9uZXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RoaXJkQWxsSW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RoaXJkQWxsSW4ubW9uZXkgPSB0aGlzLl90aGlyZEppYXpodS5tYXhNb25leTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudW0gPSAxMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHRoaXMuX3RoaXJkSmlhemh1LmZpcnN0TW9uZXkgKyBudW0pID49IHRoaXMuX3RoaXJkSmlhemh1Lm1heE1vbmV5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RoaXJkSmlhemh1Lm1vbmV5ID0gdGhpcy5fdGhpcmRKaWF6aHUubWF4TW9uZXk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcmQxIFwiICsgdGhpcy5fdGhpcmRKaWF6aHUubW9uZXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RoaXJkSmlhemh1Lm1vbmV5ID0gdGhpcy5fdGhpcmRKaWF6aHUuZmlyc3RNb25leSArIG51bTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlyZDIgXCIgKyB0aGlzLl90aGlyZEppYXpodS5tb25leSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3RoaXJkSmlhemh1LmdldENoaWxkQnlOYW1lKCdsYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bSh0aGlzLl90aGlyZEppYXpodS5tb25leSk7XHJcbiAgICB9LFxyXG4gICAgLy/mlq3nur/ph43ov57liLfmlrDkv6Hmga9cclxuICAgIFJlY29ubmVjdGlvbkluZm86IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aWree6v+mHjei/nuWIt+aWsOS/oeaBrzonICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5hZGRPcHRpb25zLmxlbmd0aCA9PSA1KSB0aGlzLnNldEJ0bk9wcyg1LCBkYXRhLmFkZE9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2RpZmVuLnN0cmluZyA9IEhlbHBlci5maXhOdW0oZGF0YS5kaUNoaSk7XHJcbiAgICAgICAgdGhpcy5fZGlmZW4ubW9uZXkgPSBkYXRhLmRpQ2hpO1xyXG4gICAgICAgIHRoaXMuX3RpcHMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoZGF0YS5jaXJjbGVIb2xkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5jaXJjbGVIb2xkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhaVJlcyA9IHRoaXMuQ29udmVyc2lvbkNhcmRSZXMocGFyc2VJbnQoZGF0YS5jaXJjbGVIb2xkc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFpc1tpXS5nZXRDaGlsZEJ5TmFtZSgnbnVtJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBwYWlSZXNbJ251bSddO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFpc1tpXS5nZXRDaGlsZEJ5TmFtZSgnaHVhMScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gcGFpUmVzWydoX3MnXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhaXNbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2h1YTInKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHBhaVJlc1snaF9iJ107XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYWlzW2RhdGEuY2lyY2xlSG9sZHMubGVuZ3RoIC0gMV0pIHRoaXMuX3BhaXNbZGF0YS5jaXJjbGVIb2xkcy5sZW5ndGggLSAxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFpc1tkYXRhLmNpcmNsZUhvbGRzLmxlbmd0aF0pIHRoaXMuX3BhaXNbZGF0YS5jaXJjbGVIb2xkcy5sZW5ndGhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFpc1tkYXRhLmNpcmNsZUhvbGRzLmxlbmd0aCArIDFdKSB0aGlzLl9wYWlzW2RhdGEuY2lyY2xlSG9sZHMubGVuZ3RoICsgMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucGxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleEJ5VXNlcklkKGRhdGEucGxheWVyc1tpXS51c2VyaWQpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5wbGF5ZXJzW2ldLmNhbk9wcykge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgaW5kZXggKyAnL3RvZ2dsZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0VGltZShkYXRhLnRpbWVyX0NvdW50ZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgaW5kZXggKyAnL3RvZ2dsZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB6aHUgPSB7XHJcbiAgICAgICAgICAgICAgICBtb25leTogZGF0YS5wbGF5ZXJzW2ldLmNaaHUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0Wmh1KHpodSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRNb25leShkYXRhLnBsYXllcnNbaV0ubW9uZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dPdGhlclNlYXQoMSk7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLmhvbGRlbVNvY2tldC5lbWl0KFwiZ2V0VXNlckluZm9CeVVzZXJpZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDluqfkvY3kv6Hmga9cclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlU2VhdEluZm86IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbml0U2luZ2xlU2VhdChkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh4blpIflgJLorqHml7ZcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgY291bnREb3duOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vIGNjLmxvZygn5LiL5rOo5pe26Ze0PT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuY291bnRkb3duLnN0cmluZyA9IGRhdGEuY291bnREb3duO1xyXG4gICAgICAgIHRoaXMuY291bnRkb3duLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZGF0YS5jb3VudERvd24gPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50ZG93bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vmuLjmiI9cclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgZ2FtZUJlZ2luOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX3RpcHMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucGxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2VhdCA9IHRoaXMubmV0V29yay5nZXRTZWF0QnlJRChkYXRhLnBsYXllcnNbaV0udXNlcmlkKTtcclxuICAgICAgICAgICAgc2VhdC5zY29yZSA9IGRhdGEucGxheWVyc1tpXS5tb25leTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChkYXRhLnBsYXllcnNbaV0udXNlcmlkKTtcclxuICAgICAgICAgICAgdmFyIHpodSA9IHtcclxuICAgICAgICAgICAgICAgIG1vbmV5OiBkYXRhLnBsYXllcnNbaV0uY1podSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRaaHUoemh1KTtcclxuICAgICAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNldE1vbmV5KHNlYXQuc2NvcmUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGRhdGEuZ2FtZUluZm8uYWRkT3B0aW9ucy5sZW5ndGggPT0gNSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ0bk9wcyg1LCBkYXRhLmdhbWVJbmZvLmFkZE9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgZ2FtZVR1cm5DaGFuZ2VkOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubmV0V29yay5nZXRMb2NhbEluZGV4QnlVc2VySWQoZGF0YSk7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCA1OyB0KyspIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgdCArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zZWF0JyArIGluZGV4ICsgJy90b2dnbGUnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRUaW1lKCk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQwL3RvZ2dsZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWF0c1swXS5fcGFpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VhdHNbMF0uc3RhdHVzID09IFwiQWxsSW5cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5PcHMoNCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ0bk9wcygyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgbXlIb2xkczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3NlYXRzWzBdLl9wYWkuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aXBzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWF0c1swXS5zZXRQYWkoZGF0YSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw5bqV5rGgXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZURpQ2hpOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RpZmVuLnN0cmluZyA9IEhlbHBlci5maXhOdW0oZGF0YSk7XHJcbiAgICAgICAgdGhpcy5fZGlmZW4ubW9uZXkgPSBkYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaIkeeahOS/oeaBr1xyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBteUluZm86IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNldFBhaShkYXRhLmhvbGRzLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0TW9uZXkoZGF0YS5tb25leSk7XHJcbiAgICAgICAgdGhpcy5zaG93T3RoZXJTZWF0KDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBteVR1cm46IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCA1OyB0KyspIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgdCArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zZWF0JyArIGluZGV4ICsgJy90b2dnbGUnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5PcHMoMSwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5fdGhpcmRKaWF6aHUuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKGRhdGEuYWRkTWluTW9uZXkpO1xyXG4gICAgICAgIHRoaXMuX3RoaXJkSmlhemh1Lm1vbmV5ID0gZGF0YS5hZGRNaW5Nb25leTtcclxuICAgICAgICB0aGlzLl90aGlyZEppYXpodS5maXJzdE1vbmV5ID0gZGF0YS5hZGRNaW5Nb25leTtcclxuICAgICAgICB0aGlzLl90aGlyZEppYXpodS5tYXhNb25leSA9IGRhdGEuYWRkTWF4TW9uZXk7XHJcbiAgICAgICAgdGhpcy5wcmVwT3BzKGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBteVR1cm5Gb3JOb01vbmV5OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuc2V0QnRuT3BzKDEsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3RoaXJkSmlhemh1LmdldENoaWxkQnlOYW1lKCdsYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bShkYXRhLmFkZE1pbk1vbmV5KTtcclxuICAgICAgICB0aGlzLl90aGlyZEppYXpodS5tb25leSA9IGRhdGEuYWRkTWluTW9uZXk7XHJcbiAgICAgICAgdGhpcy5fdGhpcmRKaWF6aHUuZmlyc3RNb25leSA9IGRhdGEuYWRkTWluTW9uZXk7XHJcbiAgICAgICAgdGhpcy5fdGhpcmRKaWF6aHUubWF4TW9uZXkgPSBkYXRhLmFkZE1heE1vbmV5O1xyXG4gICAgICAgIHRoaXMucHJlcE9wcyhkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov4fniYxcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgb25lR3VvOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubmV0V29yay5nZXRMb2NhbEluZGV4QnlVc2VySWQoZGF0YSk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQnICsgaW5kZXggKyAnL3RvZ2dsZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zaG93T3BzKCdyYW5ncGFpJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlYXRzWzBdLl9wYWkuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnRuT3BzKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot5/ms6hcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgb25lR2VuOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubmV0V29yay5nZXRMb2NhbEluZGV4QnlVc2VySWQoZGF0YS51c2VyaWQpO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zaG93T3BzKCdnZW5wYWknKTtcclxuICAgICAgICB2YXIgZCA9IHtcclxuICAgICAgICAgICAgbW9uZXk6IGRhdGEuY1podSxcclxuICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0TW9uZXkoZGF0YS5tb25leSk7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNldFpodShkKTtcclxuICAgICAgICBpZiAodGhpcy5fc2VhdHNbMF0uX3BhaS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdG5PcHMoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOazqFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBvbmVBZGQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNob3dPcHMoJ2ppYXpodScpO1xyXG4gICAgICAgIHZhciBkID0ge1xyXG4gICAgICAgICAgICBtb25leTogZGF0YS5jWmh1LFxyXG4gICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRNb25leShkYXRhLm1vbmV5KTtcclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0Wmh1KGQpO1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWF0c1swXS5fcGFpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ0bk9wcygyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5Y6LXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIG9uZUFsbEluOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubmV0V29yay5nZXRMb2NhbEluZGV4QnlVc2VySWQoZGF0YS51c2VyaWQpO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zaG93T3BzKCdxdWFueGlhJyk7XHJcbiAgICAgICAgdmFyIGQgPSB7XHJcbiAgICAgICAgICAgIG1vbmV5OiBkYXRhLmNaaHUsXHJcbiAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNldE1vbmV5KGRhdGEubW9uZXkpO1xyXG4gICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zZXRaaHUoZCk7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWF0c1swXS5fcGFpLmFjdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCA9PSBkYXRhLnVzZXJpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5PcHMoNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byD54mMXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIG9uZVF1aXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChkYXRhKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvc2VhdCcgKyBpbmRleCArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNob3dPcHMoJ3FpcGFpJyk7XHJcbiAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLnNob3dCZWlQYWkoZmFsc2UpO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllckluZm8ucGxheWVySWQgPT0gZGF0YSkgdGhpcy5zZXRCdG5PcHMoNCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIGFsbEd1bzogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWF0c1tpXS5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uZXk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhdHNbaV0uc2V0Wmh1KGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheWVyc0luTmV3Q2lyY2xlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2VhdCA9IHRoaXMubmV0V29yay5nZXRTZWF0QnlJRChkYXRhW2ldLnVzZXJpZCk7XHJcbiAgICAgICAgICAgIGlmIChzZWF0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWF0LnNjb3JlID0gKGRhdGEubW9uZXkgKiAwLjAxKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5uZXRXb3JrLmdldExvY2FsSW5kZXhCeVVzZXJJZChkYXRhW2ldLnVzZXJpZCk7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvc2VhdCcgKyBpbmRleCArICcvdG9nZ2xlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VhdHNbaW5kZXhdLnN0YXR1cyAhPSBcIkFsbEluXCIpIHRoaXMuX3NlYXRzW2luZGV4XS5zaG93T3BzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0TW9uZXkoZGF0YVtpXS5tb25leSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VhdHNbaW5kZXhdLl9wYWltaWFuICYmICF0aGlzLl9zZWF0c1tpbmRleF0uX3BhaW1pYW4uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VhdHNbaW5kZXhdLmhpZGVTY29yZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlYXRzWzBdLl9wYWkuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlYXRzW2luZGV4XS5zdGF0dXMgPT0gXCJBbGxJblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuT3BzKDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuT3BzKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VhdHNbMF0uaGlkZVNjb3JlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBuZXdDaXJjbGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2MubG9nKCflj5HniYzkuoY9PT09PT09PT09PT09PT09PT09PT09PT09PT09JyArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB0aGlzLl96b25nemh1LnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5fZGlmZW4ubW9uZXkpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5jaXJjbGVIb2xkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcGFpUmVzID0gdGhpcy5Db252ZXJzaW9uQ2FyZFJlcyhwYXJzZUludChkYXRhLmNpcmNsZUhvbGRzW2ldKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhaXNbaV0uZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gcGFpUmVzWydudW0nXTtcclxuICAgICAgICAgICAgdGhpcy5fcGFpc1tpXS5nZXRDaGlsZEJ5TmFtZSgnaHVhMScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gcGFpUmVzWydoX3MnXTtcclxuICAgICAgICAgICAgdGhpcy5fcGFpc1tpXS5nZXRDaGlsZEJ5TmFtZSgnaHVhMicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gcGFpUmVzWydoX2InXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLl9wYWlzW2RhdGEuY2lyY2xlSG9sZHMubGVuZ3RoIC0gMV0pIHRoaXMuX3BhaXNbZGF0YS5jaXJjbGVIb2xkcy5sZW5ndGggLSAxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9wYWlzW2RhdGEuY2lyY2xlSG9sZHMubGVuZ3RoXSkgdGhpcy5fcGFpc1tkYXRhLmNpcmNsZUhvbGRzLmxlbmd0aF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhaXNbZGF0YS5jaXJjbGVIb2xkcy5sZW5ndGggKyAxXSkgdGhpcy5fcGFpc1tkYXRhLmNpcmNsZUhvbGRzLmxlbmd0aCArIDFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BhaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+eul1xyXG4gICAgICogQHBhcmFtIHsqfSBpc0xvc2UgXHJcbiAgICAgKi9cclxuICAgIHNldHRsZW1lbnQ6IGZ1bmN0aW9uIChpc0xvc2UpIHtcclxuICAgICAgICBpZiAoaXNMb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9zZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgY2FjdWxhdGVSZXN1bHQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NlYXQwL3RvZ2dsZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBteUFSR1N0YXR1c0NoYW5nZWQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRmlyc3RCdG4oZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP57uT5p2fXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnNob3dPdGhlclNlYXQoMik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWF0ID0gdGhpcy5uZXRXb3JrLmdldFNlYXRCeUlEKGRhdGFbaV0udXNlcmlkKTtcclxuICAgICAgICAgICAgaWYgKHNlYXQpIHtcclxuICAgICAgICAgICAgICAgIHNlYXQuc2NvcmUgPSAoZGF0YVtpXS5tb25leSAqIDAuMDEpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleEJ5VXNlcklkKGRhdGFbaV0udXNlcmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zaG93SG9sZHNQYWkoZGF0YVtpXS5ob2xkcywgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0TW9uZXkoZGF0YVtpXS5tb25leSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXS5pc1dpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zaG93V2luVGV4dChwYXJzZUludChkYXRhW2ldLnNjb3JlWzBdKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlYXRzW2luZGV4XS5zaG93V2luVGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QnRuT3BzKDQpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5yZXN0YXJ0KCk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIGdhbWVJbmZvQnlJZDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0aGlzLlJlY29ubmVjdGlvbkluZm8oZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHVzZXJJbmZvQnlJZDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleEJ5VXNlcklkKGRhdGEudXNlcmlkKTtcclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2V0UGFpKGRhdGEuaG9sZHMsIHRoaXMpO1xyXG4gICAgICAgIGlmIChkYXRhLmNhbk9wcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ0bk9wcygxLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ0bk9wcygyLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGhpcmRKaWF6aHUuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKGRhdGEuYWRkTWluTW9uZXkpO1xyXG4gICAgICAgIHRoaXMuX3RoaXJkSmlhemh1Lm1vbmV5ID0gZGF0YS5hZGRNaW5Nb25leTtcclxuICAgICAgICB0aGlzLl90aGlyZEppYXpodS5maXJzdE1vbmV5ID0gZGF0YS5hZGRNaW5Nb25leTtcclxuICAgICAgICB0aGlzLl90aGlyZEppYXpodS5tYXhNb25leSA9IGRhdGEuYWRkTWF4TW9uZXk7XHJcbiAgICAgICAgdGhpcy5wcmVwT3BzKGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSAgXHJcbiAgICAgKi9cclxuICAgIGV4aXRSZXN1bHQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lb3V0KTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuaG9sZGVtU29ja2V0ID0gbnVsbDtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0xvYWRpbmcnKS5hY3RpdmUgPSAhISFkYXRhO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIH0sICEhZGF0YSA/IDMgOiAwLjEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOemu+W8gOaIv+mXtFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBleGl0Um9vbTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3RpbWVvdXQpO1xyXG4gICAgICAgIC8v5Yi35paw55So5oi36ZKx5biB5pWw6YePXHJcbiAgICAgICAgdGhpcy5nZXRHZW1zQW5kQ29pbnMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvnlKjmiLfnirbmgIFcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgY2hhbmdlVXNlclN0YXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzZWF0ID0gZGF0YTtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLm5ldFdvcmsuZ2V0TG9jYWxJbmRleEJ5VXNlcklkKHNlYXQudXNlcmlkKTtcclxuICAgICAgICB0aGlzLl9zZWF0c1tpbmRleF0uc2VhdEhpZGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/orr7nva7ph5HluIHpkrvnn7PmlbDph49cclxuICAgIGdldEdlbXNBbmRDb2luczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyBjYy52di51c2VyTWdyLmdldEdlbXNBbmRDb2lucyhmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgIGNjLnZ2LnVzZXJNZ3IuZ2VtcyA9IGRhdGEuZ2VtcztcclxuICAgICAgICAvLyAgICAgY2MudnYudXNlck1nci5jb2lucyA9IGRhdGEuY29pbnM7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2tDbG9zZUJkKGUsIHYpIHtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvY29tX2luZ2FtZV90aXBzJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENsaWNrRXZlbnQ6IGZ1bmN0aW9uIChub2RlLCB0YXJnZXQsIGNvbXBvbmVudCwgaGFuZGxlciwgaXNSZXBsYWNlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29tcG9uZW50ICsgXCI6XCIgKyBoYW5kbGVyKTtcclxuICAgICAgICB2YXIgZXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBldmVudEhhbmRsZXIudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIGV2ZW50SGFuZGxlci5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgZXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgIHZhciBjbGlja0V2ZW50cyA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHM7XHJcbiAgICAgICAgaWYgKGlzUmVwbGFjZSkge1xyXG4gICAgICAgICAgICAvL+aYr+WQpuimhuebluaOieS5i+WJjeeahOS6i+S7tlxyXG4gICAgICAgICAgICBjbGlja0V2ZW50c1swXSA9IGV2ZW50SGFuZGxlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGlja0V2ZW50cy5wdXNoKGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZFNsaWRlRXZlbnQ6IGZ1bmN0aW9uIChub2RlLCB0YXJnZXQsIGNvbXBvbmVudCwgaGFuZGxlcikge1xyXG4gICAgICAgIHZhciBldmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGV2ZW50SGFuZGxlci50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgZXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgdmFyIHNsaWRlRXZlbnRzID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5zbGlkZUV2ZW50cztcclxuICAgICAgICBzbGlkZUV2ZW50cy5wdXNoKGV2ZW50SGFuZGxlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pat5byA6L+e5o6lXHJcbiAgICAgKi9cclxuICAgIGRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmhvbGRlbVNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9O1xyXG4gICAgICAgIHRoaXMubmV0V29yay5ob2xkZW1Tb2NrZXQgPSBudWxsO1xyXG4gICAgICAgIC8vdGhpcy5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHNcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLmgqjlt7Lmlq3nur/vvIzor7fph43mlrDnmbvlvZVcIjtcclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9jYy52di52b2ljZU1nci5zdG9wKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RNaW51dGUgIT0gbWludXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0TWludXRlID0gbWludXRlcztcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgaCA9IGggPCAxMCA/IFwiMFwiICsgaCA6IGg7XHJcbiAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIG0gPSBtIDwgMTAgPyBcIjBcIiArIG0gOiBtO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGltZUxhYmVsKSB0aGlzLl90aW1lTGFiZWwuc3RyaW5nID0gXCJcIiArIGggKyBcIjpcIiArIG07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uQ0xpY2soZXYsIGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncyA9PSAnaGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21faGVscC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnY2xvc2VIZWxwJykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9oZWxwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAncGFpeGluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21fcGFpeGluZy54ID0gLTUwMDtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlUGFpeGluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21fcGFpeGluZy54ID0gLTMwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiXX0=