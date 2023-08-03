
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26814gwNctAjoUNgGux5Tpe', 'main');
// Texture/yadaxiao/js/main.js

"use strict";

var _cc$Class;

cc.Class((_cc$Class = {
  "extends": cc.Component,
  properties: {
    //下注类型
    xzStyle: cc.Label,
    //通知
    gg: cc.Node,
    //金币数
    coinText: cc.Label,
    //时间
    timeText: cc.Node,
    //用户名
    nameText: cc.Label,
    idText: cc.Label,
    //筹码图片
    cm1: cc.SpriteFrame,
    cm2: cc.SpriteFrame,
    cm3: cc.SpriteFrame,
    cm4: cc.SpriteFrame,
    cm5: cc.SpriteFrame,
    cm6: cc.SpriteFrame,
    cm7: cc.SpriteFrame,
    cm8: cc.SpriteFrame,
    target: cc.Prefab,
    tnum: cc.Prefab,
    father1: cc.Node,
    father2: cc.Node,
    //中部显示
    atext: cc.Label,
    btext: cc.Label,
    ctext: cc.Label,
    dtext: cc.Label,
    //中部选择
    tablett: cc.Node,
    Choose1: cc.Node,
    Choose2: cc.Node,
    //下方选择
    Choose3: cc.Node,
    Choose4: cc.Node,
    Choose5: cc.Node,
    Choose6: cc.Node,
    Choose7: cc.Node,
    Choose8: cc.Node,
    Choose9: cc.Node,
    Choose10: cc.Node,
    //猜大小界面
    guess: cc.Node,
    sz1: cc.Node,
    sz2: cc.Node,
    sz3: cc.Node,
    sz4: cc.Node,
    sz5: cc.Node,
    sz6: cc.Node,
    sz7: cc.Node,
    sz8: cc.Node,
    sz9: cc.Node,
    sz10: cc.Node,
    sz11: cc.Node,
    sz12: cc.Node,
    sz13: cc.Node,
    sz14: cc.Node,
    sz15: cc.Node,
    sz16: cc.Node,
    sz17: cc.Node,
    sz18: cc.Node,
    szdh1: cc.Node,
    szdh2: cc.Node,
    szdh3: cc.Node,
    szText1: cc.Label,
    szText2: cc.Label,
    szText3: cc.Label,
    result: cc.Label,
    //抢庄按钮
    goAct: cc.Node,
    goBtn: cc.Node,
    goBg: cc.Node,
    qzBox: cc.EditBox,
    //上庄
    zname: cc.Label,
    zcoin: cc.Label,
    //往期
    past: cc.Node,
    //赠送
    gift: cc.Node,
    giftUseid: cc.EditBox,
    giftCoin: cc.EditBox,
    //详情
    detail: cc.Node,
    //MUSIC
    bgMusic: {
      type: cc.AudioClip,
      "default": null
    },
    cmMusic: {
      type: cc.AudioClip,
      "default": null
    },
    resultMusic: {
      type: cc.AudioClip,
      "default": null
    },
    waitMusic: {
      type: cc.AudioClip,
      "default": null
    },
    //结算
    resBG: cc.Node,
    bCoin: cc.Label,
    bgCoin: cc.Label,
    sCoin: cc.Label,
    sgCoin: cc.Label,
    zwBG: cc.Node,
    zlBG: cc.Node,
    zwinCoin: cc.Label,
    zwinCoin2: cc.Label,
    zloseCoin: cc.Label,
    zloseCoin2: cc.Label,
    //在线人数
    online: cc.Label,
    onlinex: cc.Label,
    //个人下注金额
    xzText1: cc.Node,
    xzText2: cc.Node,
    //下线提示
    notifyDown: cc.Node,
    notifyText: cc.Label,
    //下注记录
    scrollView: {
      "default": null,
      type: cc.ScrollView
    },
    itemPrefeb: cc.Prefab,
    //排行榜
    rank: cc.Node
  },
  onLoad: function onLoad() {
    window.yadaxiao_ins = this;
    var self = this;
    this.playerInfo = require("PlayerInfo").getInstant;
    this.playerInfoEx = window.yadaxiao_sc;

    var cfg = require("cfg");

    var http = require("http");

    if (this.playerInfo.musicControl == 1) this.current = cc.audioEngine.play(this.bgMusic, true, 0.6);
    this.chip = 100; //倍数

    this.randomRange = cc.p(160, 125);
    this.px = 0;
    this.py = 65;
    this.big = 0;
    this.small = 0;
    this.zhuang = cfg.zhuang;
    this.qzBox.string = cfg.zhuang.toString();
    this.zhname = "无"; //this.coin = cfg.coin;

    this.coin = this.playerInfoEx.score; // if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS){ 
    //     this.nameText.string = "手机专区." + cfg.nickname;
    // }else{
    //     this.nameText.string = "电脑专区." + cfg.nickname;
    // }

    this.nameText.string = this.playerInfoEx.nickname; //this.idText.string = "ID:" + cfg.userid;

    this.idText.string = "ID:" + this.playerInfoEx.id;
    this.b100 = 0;
    this.b500 = 0;
    this.b1000 = 0;
    this.b2000 = 0;
    this.b5000 = 0;
    this.b10000 = 0;
    this.b50000 = 0;
    this.b100000 = 0;
    this.bn100 = 0;
    this.bn500 = 0;
    this.bn1000 = 0;
    this.bn2000 = 0;
    this.bn5000 = 0;
    this.bn10000 = 0;
    this.bn50000 = 0;
    this.bn100000 = 0;
    this.b = [];
    this.s100 = 0;
    this.s500 = 0;
    this.s1000 = 0;
    this.s2000 = 0;
    this.s5000 = 0;
    this.s10000 = 0;
    this.s50000 = 0;
    this.s100000 = 0;
    this.sn100 = 0;
    this.sn500 = 0;
    this.sn1000 = 0;
    this.sn2000 = 0;
    this.sn5000 = 0;
    this.sn10000 = 0;
    this.sn50000 = 0;
    this.sn100000 = 0;
    this.s = [];
    this.time = 99999;
    this.a = 1;
    this.b = 1;
    this.c = 1; //this.socket = new WebSocket("ws://60.205.191.87:10031/");

    this.socket = require("yadaxiaoNetWork").getInstant;
    setHeadTexture(this.node.getChildByName('head'), this.playerInfoEx.headimgurl);
    this.tp = 1;
    this.person = 0;
    this.key = ""; //结算数值初始化

    this.resultbt = 0;
    this.resultst = 0;
    this.resultb = 0;
    this.results = 0;
    this.resultzend = 0;
  },
  start: function start() {
    this.item = [];
    this.itemSlots = [];
    this.prepareWebSocket();
    this.network = require('yadaxiaoNetWork').getInstant;
    this.network.LandlordsSocket.emit('getGameType', '');
  },
  init_stat: function init_stat(result) {
    var a = 1; // if (result.game_type == 1)
    // {
    //     if (result.bet_time == 20)
    //     {
    //         this.betBegin();
    //     }else{
    //         this.bet_text.active = true;
    //         this.m_iGameOverTime = Date.now()/1000+result.bet_time;
    //     }
    //     this.node.getChildByName("anim_wait").active = false;
    //     this.poker_arr[4].opacity = 0;
    //     this.poker_arr[5].opacity = 0;
    // }else 
    // {
    //     this.node.getChildByName("anim_wait").active = true;
    //     for (var i in this.poker_arr)
    //     {
    //         this.poker_arr[i].opacity = 0;
    //     }
    // }
    // for (var i in result.bet_list)
    // {
    //     this.m_lPoolNum[result.bet_list[i].bet_res] = result.bet_list[i].bet_gold;
    // }
    // this.setPoolView();
  },
  update: function update(dt) {
    var cfg = require("cfg");

    this.coinText.string = this.coin.toString();
    cfg.zhuang = parseInt(this.qzBox.string);

    if (parseInt(this.qzBox.string) > 1000000) {
      this.qzBox.string = "1000000";
    }

    if (this.tp == 1) {
      this.goBtn.active = false;
    }
  },
  //长连接
  prepareWebSocket: function prepareWebSocket() {
    return;
    var self = this;

    var cfg = require("cfg");

    this.socket.onopen = function (evt) {
      console.log("socket已开启"); //获取金币

      self.socket.send("CMD=USERGETCOIN&USERNAME=" + cfg.username + "&PWD=" + cfg.pwd);
      self.socket.send("CMD=QUERYBANKER");
    };

    this.socket.onmessage = function (evt) {
      var ret = eval("(" + evt.data + ")");

      switch (ret.CMD) {
        case "GETCOUNT":
          self.timeSocket(ret);
          self.online.string = "在线人数：" + ret.ONLINECOUNT;
          self.onlinex.string = "下注人数：" + ret.XZCOUNT;
          break;

        case "USERGETCOIN":
          console.log(evt.data);
          cfg.coin = ret.COIN;
          self.coin = ret.COIN;
          self.socket.send("CMD=GETTOTAL");
          break;

        case "QUERYBANKER":
          console.log(evt.data);
          self.getzhuang(ret);
          break;

        case "CATCHBANKER":
          console.log(evt.data);
          console.log(ret.STATE + "抢庄");
          break;

        case "GETTOTAL":
          console.log(evt.data);
          self.everyBet(ret);
          self.getDice();
          break;

        case "USERKEY":
          self.key = ret.KEY;
          self.socket.send("CMD=NOTIFYUSER&USERNAME=" + cfg.username + "&KEY=" + self.key);
          break;

        case "NOTIFYDOWN":
          self.notifyDown.active = true;
          console.log("下线通知");
          self.notifyText.string = "<下线通知>\n您的账号已在其它设备上登录";
          self.Choose1.getComponent(cc.Button).interactable = false;
          self.Choose2.getComponent(cc.Button).interactable = false;
          self.Choose3.getComponent(cc.Button).interactable = false;
          self.Choose4.getComponent(cc.Button).interactable = false;
          self.Choose5.getComponent(cc.Button).interactable = false;
          self.Choose6.getComponent(cc.Button).interactable = false;
          self.Choose7.getComponent(cc.Button).interactable = false;
          self.Choose8.getComponent(cc.Button).interactable = false;
          self.Choose9.getComponent(cc.Button).interactable = false;
          self.Choose10.getComponent(cc.Button).interactable = false;
          self.scheduleOnce(function () {
            self.socket.close();
            cc.director.loadScene('login');
          }, 3);
          break;

        case "QUERYRESULT":
          self.resultbt = parseInt(ret.BIGTOTAL);
          self.resultst = parseInt(ret.SMALLTOTAL);
          self.resultb = parseInt(ret.BIGRESULT);
          self.results = parseInt(ret.SMALLRESULT);
          self.resultzend = parseInt(ret.ZJRESULT);
          console.log(evt.data);
          break;

        case "SENDDATA":
          self.gg.active = true;
          self.gg.getComponent(cc.Label).string = ret.DATA;
          self.schedule(function () {
            self.gg.active = false;
          }, 2);
          console.log(evt.data);
          break;

        case "USERBET":
          console.log(evt.data);
          self.otherBet(ret);
          self.init(ret);

        case "GETDICE":
          self.a = ret.VALUE1;
          self.b = ret.VALUE2;
          self.c = ret.VALUE3;
          console.log(evt.data);
          break;

        default:
          console.log(evt.data);
          break;
      }
    };

    this.socket.onerror = function (evt) {
      console.log("socket错误");
    };

    this.socket.onclose = function (evt) {
      console.log("socket关闭");
    };
  },
  //获取金币
  getCoin: function getCoin() {
    var cfg = require("cfg");

    this.socket.send("CMD=USERGETCOIN&USERNAME=" + cfg.username + "&PWD=" + cfg.pwd);
  },
  //当前时间状态
  timeSocket: function timeSocket(ret) {
    var cfg = require("cfg"); // this.timeText.string = ret.COUNT.toString();


    this.timeText.getComponent(cc.Label).string = ret.COUNT.toString();

    switch (ret.TIMETYPE) {
      case "QZ":
        this.timeText.active = true;

        if (this.coin > 200000 && this.tp == 0) {
          this.goBtn.active = true;
        }

        this.Choose1.getComponent(cc.Button).interactable = false;
        this.Choose2.getComponent(cc.Button).interactable = false;
        this.xzStyle.string = "正在抢庄";
        break;

      case "SZ":
        this.timeText.active = false;
        this.xzStyle.string = "确认庄家";
        this.Choose1.getComponent(cc.Button).interactable = false;
        this.Choose2.getComponent(cc.Button).interactable = false;
        this.goBtn.active = false;
        this.socket.send("CMD=QUERYBANKER");
        break;

      case "YZ":
        this.timeText.active = true;
        this.xzStyle.string = "下注阶段";

        if (ret.COUNT == ret.YZSJ - 1) {
          this.getDice();
        }

        if (this.atext.string == "999999999") {
          this.atext.string = "0";
          this.btext.string = "0";
          this.ctext.string = this.zhuang;
          this.dtext.string = this.zhuang;
        }

        this.person += Math.floor(Math.random() * 50);
        this.onlinex.string = "下注人数：" + this.person.toString();

        if (this.zhname != cfg.nickname) {
          this.Choose1.getComponent(cc.Button).interactable = true;
          this.Choose2.getComponent(cc.Button).interactable = true;
        }

        break;

      case "FZ":
        this.timeText.active = false;
        this.xzStyle.string = "停止下注";

        if (ret.COUNT == ret.FZSJ) {
          this.socket.send("CMD=QUERYRESULT&USERNAME=" + cfg.username + "&BIGTOTAL=" + this.big + "&SMALLTOTAL=" + this.small);
        }

        this.Choose1.getComponent(cc.Button).interactable = false;
        this.Choose2.getComponent(cc.Button).interactable = false;
        this.Choose3.getComponent(cc.Button).interactable = false;
        this.Choose4.getComponent(cc.Button).interactable = false;
        this.Choose5.getComponent(cc.Button).interactable = false;
        this.Choose6.getComponent(cc.Button).interactable = false;
        this.Choose7.getComponent(cc.Button).interactable = false;
        this.Choose8.getComponent(cc.Button).interactable = false;
        this.Choose9.getComponent(cc.Button).interactable = false;
        this.Choose10.getComponent(cc.Button).interactable = false;
        break;

      case "KJ":
        this.timeText.active = false;
        this.Choose1.getComponent(cc.Button).interactable = false;
        this.Choose2.getComponent(cc.Button).interactable = false;

        if (ret.COUNT == ret.KJSJ) {
          this.guessBOS();
        }

        if (ret.COUNT == 0) {
          cc.audioEngine.stop(this.current);
          cc.director.loadScene('table');
          this.socket.close();
        }

        this.xzStyle.string = "正在开奖";
        break;
    }
  },
  //当前庄家
  getzhuang: function getzhuang(ret) {
    var cfg = require("cfg");

    if (ret.USERNAME == "null") {
      this.zhname = "无";
      this.zcoin.string = "0";
    } else {
      this.zhname = ret.NICKNAME;
      this.zhuang = ret.COIN;
      this.zcoin.string = this.zhuang.toString();
    }

    this.zname.string = this.zhname;

    if (this.zhname == cfg.nickname) {
      this.coin = this.coin - ret.COIN;
    }
  },
  //获取骰子结果
  getDice: function getDice() {
    this.socket.send("CMD=GETDICE");
  },
  //实时获取筹码
  otherBet: function otherBet(ret) {
    var cfg = require("cfg");

    this.atext.string = ret.BIGTOTAL;
    this.btext.string = ret.SMALLTOTAL;
    this.ctext.string = this.zhuang + ret.SMALLTOTAL - ret.BIGTOTAL;
    this.dtext.string = this.zhuang + ret.BIGTOTAL - ret.SMALLTOTAL;

    if (this.zhname != cfg.username) {
      if (this.zhuang + ret.SMALLTOTAL - ret.BIGTOTAL <= 0) {
        this.Choose1.getComponent(cc.Button).interactable = false;
      } else {
        this.Choose1.getComponent(cc.Button).interactable = true;
      }

      if (this.zhuang + ret.BIGTOTAL - ret.SMALLTOTAL <= 0) {
        this.Choose2.getComponent(cc.Button).interactable = false;
      } else {
        this.Choose2.getComponent(cc.Button).interactable = true;
      }
    }

    if (ret.BIG > 0) {
      this.px = -310;
      var node = new cc.Node('Sprite');
      var sp = node.addComponent(cc.Sprite);

      switch (ret.BIG) {
        case 100:
          sp.spriteFrame = this.cm1;
          break;

        case 500:
          sp.spriteFrame = this.cm2;
          break;

        case 2000:
          sp.spriteFrame = this.cm3;
          break;

        case 5000:
          sp.spriteFrame = this.cm4;
          break;

        case 10000:
          sp.spriteFrame = this.cm5;
          break;

        case 50000:
          sp.spriteFrame = this.cm6;
          break;

        case 100000:
          sp.spriteFrame = this.cm7;
          break;

        default:
          sp.spriteFrame = this.cm8;
          var dialogNode = cc.instantiate(this.tnum);
          dialogNode.color = new cc.Color(0, 0, 0);
          dialogNode.getComponent(cc.Label).string = ret.BIG;
          node.addChild(dialogNode);
          break;
      }

      node.parent = this.tablett;
      node.position = this.getRandomPosition();
      node.width = 50;
      node.height = 50;
    }

    if (ret.SMALL > 0) {
      this.px = 310;
      var node = new cc.Node('Sprite');
      var sp = node.addComponent(cc.Sprite);

      switch (ret.SMALL) {
        case 100:
          sp.spriteFrame = this.cm1;
          break;

        case 500:
          sp.spriteFrame = this.cm2;
          break;

        case 2000:
          sp.spriteFrame = this.cm3;
          break;

        case 5000:
          sp.spriteFrame = this.cm4;
          break;

        case 10000:
          sp.spriteFrame = this.cm5;
          break;

        case 50000:
          sp.spriteFrame = this.cm6;
          break;

        case 100000:
          sp.spriteFrame = this.cm7;
          break;

        default:
          sp.spriteFrame = this.cm8;
          var dialogNode = cc.instantiate(this.tnum);
          dialogNode.color = new cc.Color(0, 0, 0);
          dialogNode.getComponent(cc.Label).string = ret.SMALL;
          node.addChild(dialogNode);
          break;
      }

      node.parent = this.tablett;
      node.position = this.getRandomPosition();
      node.width = 50;
      node.height = 50;
    }
  },
  everyBet: function everyBet(ret) {
    var cfg = require("cfg");

    var http = require("http");

    this.atext.string = ret.BIG;
    this.btext.string = ret.SMALL;
    this.ctext.string = this.zhuang + ret.SMALL - ret.BIG;
    this.dtext.string = this.zhuang + ret.BIG - ret.SMALL; //自动更新筹码

    this.b100 = ret.BIG100;
    this.b500 = ret.BIG500;
    this.b2000 = ret.BIG2000;
    this.b5000 = ret.BIG5000;
    this.b10000 = ret.BIG10000;
    this.b50000 = ret.BIG50000;
    this.b100000 = ret.BIG100000;
    this.s100 = ret.SMALL100;
    this.s500 = ret.SMALL500;
    this.s2000 = ret.SMALL2000;
    this.s5000 = ret.SMALL5000;
    this.s10000 = ret.SMALL10000;
    this.s50000 = ret.SMALL50000;
    this.s100000 = ret.SMALL100000;
    this.b = [this.b100 - this.bn100, this.b500 - this.bn500, this.b2000 - this.bn2000, this.b5000 - this.bn5000, this.b10000 - this.bn10000, this.b50000 - this.bn50000, this.b100000 - this.bn100000];
    this.s = [this.s100 - this.sn100, this.s500 - this.sn500, this.s2000 - this.sn2000, this.s5000 - this.sn5000, this.s10000 - this.sn10000, this.s50000 - this.sn50000, this.s100000 - this.sn100000]; //添加大筹码

    for (var i = 0; i < this.b.length; i++) {
      for (var j = 0; j < this.b[i]; j++) {
        this.px = -310;
        var node = new cc.Node('Sprite');
        var sp = node.addComponent(cc.Sprite);

        switch (i) {
          case 0:
            sp.spriteFrame = this.cm1;
            break;

          case 1:
            sp.spriteFrame = this.cm2;
            break;

          case 2:
            sp.spriteFrame = this.cm3;
            break;

          case 3:
            sp.spriteFrame = this.cm4;
            break;

          case 4:
            sp.spriteFrame = this.cm5;
            break;

          case 5:
            sp.spriteFrame = this.cm6;
            break;

          case 6:
            sp.spriteFrame = this.cm7;
            break;
        }

        node.parent = this.tablett;
        node.position = this.getRandomPosition();
        node.width = 50;
        node.height = 50;
      }
    } //添加小筹码


    for (var _i = 0; _i < this.s.length; _i++) {
      for (var _j = 0; _j < this.s[_i]; _j++) {
        this.px = 310;
        var node = new cc.Node('Sprite');
        var sp = node.addComponent(cc.Sprite);

        switch (_i) {
          case 0:
            sp.spriteFrame = this.cm1;
            break;

          case 1:
            sp.spriteFrame = this.cm2;
            break;

          case 2:
            sp.spriteFrame = this.cm3;
            break;

          case 3:
            sp.spriteFrame = this.cm4;
            break;

          case 4:
            sp.spriteFrame = this.cm5;
            break;

          case 5:
            sp.spriteFrame = this.cm6;
            break;

          case 6:
            sp.spriteFrame = this.cm7;
            break;
        }

        node.parent = this.tablett;
        node.position = this.getRandomPosition();
        node.width = 50;
        node.height = 50;
      }
    }

    if (this.zhname != cfg.username) {
      if (this.zhuang + ret.SMALL - ret.BIG <= 0) {
        this.Choose1.getComponent(cc.Button).interactable = false;
      } else {
        this.Choose1.getComponent(cc.Button).interactable = true;
      }

      if (this.zhuang + ret.big - ret.small <= 0) {
        this.Choose2.getComponent(cc.Button).interactable = false;
      } else {
        this.Choose2.getComponent(cc.Button).interactable = true;
      }
    }

    this.bn100 = ret.BIG100;
    this.bn500 = ret.BIG500;
    this.bn2000 = ret.BIG2000;
    this.bn5000 = ret.BIG5000;
    this.bn10000 = ret.BIG10000;
    this.bn50000 = ret.BIG50000;
    this.bn100000 = ret.BIG100000;
    this.sn100 = ret.SMALL100;
    this.sn500 = ret.SMALL500;
    this.sn2000 = ret.SMALL2000;
    this.sn5000 = ret.SMALL5000;
    this.sn10000 = ret.SMALL10000;
    this.sn50000 = ret.SMALL50000;
    this.sn100000 = ret.SMALL100000; // http.createXMLHttpRequest(cfg.cUrl + "GETTOTAL",timedate);
  },
  //100注按钮
  coin100Onclick: function coin100Onclick() {
    this.chip = 100;
  },
  //500注按钮
  coin500Onclick: function coin500Onclick() {
    this.chip = 500;
  },
  //2000注按钮
  coin2000Onclick: function coin2000Onclick() {
    this.chip = 2000;
  },
  //5000注按钮
  coin5000Onclick: function coin5000Onclick() {
    this.chip = 5000;
  },
  //10000注按钮
  coin1WOnclick: function coin1WOnclick() {
    this.chip = 10000;
  },
  //50000注按钮
  coin5WOnclick: function coin5WOnclick() {
    this.chip = 50000;
  },
  //100000注按钮
  coin10WOnclick: function coin10WOnclick() {
    this.chip = 100000;
  }
}, _cc$Class["coin10WOnclick"] = function coin10WOnclick() {
  this.chip = this.coin;
}, _cc$Class.bigOnclick = function bigOnclick() {
  //快压
  if (this.playerInfo.soundEffectControl == 1) cc.audioEngine.play(this.cmMusic, false, 1);

  if (this.chip == this.coin && this.coin > 0) {
    if (this.chip > parseInt(this.ctext.string)) {
      this.chip = parseInt(this.ctext.string);
    }

    this.xzText1.active = true;
    this.big = this.big + this.chip;
    this.xzText1.getComponent(cc.Label).string = this.big;
    this.coin = this.coin - this.chip;
    var node = cc.instantiate(this.target);
    node.parent = this.father1;
    var sp = node.getComponent(cc.Sprite);
    sp.spriteFrame = this.cm8;
    node.setPosition(0, 0);

    var cfg = require("cfg");

    this.socket.send("CMD=USERBET&USERNAME=" + cfg.username + "&BIG=" + this.chip + "&SMALL=0");
    this.chip = this.coin;
  } else {
    //普通
    if (this.coin < this.chip || this.chip > parseInt(this.ctext.string)) {
      console.log("筹码不足");
    } else {
      this.xzText1.active = true;
      this.big = this.big + this.chip;
      this.xzText1.getComponent(cc.Label).string = this.big;
      this.coin = this.coin - this.chip;
      var node = cc.instantiate(this.target);
      node.parent = this.father1;
      var sp = node.getComponent(cc.Sprite);

      switch (this.chip) {
        case 100:
          sp.spriteFrame = this.cm1;
          break;

        case 500:
          sp.spriteFrame = this.cm2;
          break;

        case 2000:
          sp.spriteFrame = this.cm3;
          break;

        case 5000:
          sp.spriteFrame = this.cm4;
          break;

        case 10000:
          sp.spriteFrame = this.cm5;
          break;

        case 50000:
          sp.spriteFrame = this.cm6;
          break;

        case 100000:
          sp.spriteFrame = this.cm7;
          break;
      }

      node.setPosition(0, 0);

      var cfg = require("cfg");

      this.socket.send("CMD=USERBET&USERNAME=" + cfg.username + "&BIG=" + this.chip + "&SMALL=0");
    }
  }
}, _cc$Class.smallOnclick = function smallOnclick() {
  //快压
  if (this.chip == this.coin && this.coin > 0) {
    if (this.chip > parseInt(this.dtext.string)) {
      this.chip = parseInt(this.dtext.string);
    }

    this.xzText2.active = true;
    this.small = this.small + this.chip;
    this.xzText2.getComponent(cc.Label).string = this.small;
    this.coin = this.coin - this.chip;
    var node = cc.instantiate(this.target);
    node.parent = this.father2;
    var sp = node.getComponent(cc.Sprite);
    sp.spriteFrame = this.cm8;
    node.setPosition(0, 0);

    var cfg = require("cfg");

    this.socket.send("CMD=USERBET&USERNAME=" + cfg.username + "&BIG=0" + "&SMALL=" + this.chip);
    this.chip = this.coin;
  } else {
    //普通
    if (this.coin < this.chip || this.chip > parseInt(this.dtext.string)) {
      console.log("筹码不足");
    } else {
      this.xzText2.active = true;
      this.small = this.small + this.chip;
      this.xzText2.getComponent(cc.Label).string = this.small;
      this.coin = this.coin - this.chip;
      var node = cc.instantiate(this.target);
      node.parent = this.father2;
      var sp = node.getComponent(cc.Sprite);

      switch (this.chip) {
        case 100:
          sp.spriteFrame = this.cm1;
          break;

        case 500:
          sp.spriteFrame = this.cm2;
          break;

        case 2000:
          sp.spriteFrame = this.cm3;
          break;

        case 5000:
          sp.spriteFrame = this.cm4;
          break;

        case 10000:
          sp.spriteFrame = this.cm5;
          break;

        case 50000:
          sp.spriteFrame = this.cm6;
          break;

        case 100000:
          sp.spriteFrame = this.cm7;
          break;
      }

      node.setPosition(0, 0);

      var cfg = require("cfg");

      this.socket.send("CMD=USERBET&USERNAME=" + cfg.username + "&BIG=0" + "&SMALL=" + this.chip);
    }
  }
}, _cc$Class.getRandomPosition = function getRandomPosition() {
  return cc.p(cc.randomMinus1To1() * this.randomRange.x + this.px, cc.randomMinus1To1() * this.randomRange.y + this.py);
}, _cc$Class.guessBOS = function guessBOS() {
  this.guess.active = true;
  if (this.playerInfo.soundEffectControl == 1) cc.audioEngine.play(this.waitMusic, false, 1);
  var self = this;

  var cfg = require("cfg");

  var http = require("http");

  self.scheduleOnce(function () {
    self.szdh1.active = false;
    self.szdh2.active = false;
    self.szdh3.active = false;

    switch (this.a) {
      case 1:
        self.sz1.active = true;
        self.szText1.string = "1";
        break;

      case 2:
        self.sz2.active = true;
        self.szText1.string = "2";
        break;

      case 3:
        self.sz3.active = true;
        self.szText1.string = "3";
        break;

      case 4:
        self.sz4.active = true;
        self.szText1.string = "4";
        break;

      case 5:
        self.sz5.active = true;
        self.szText1.string = "5";
        break;

      case 6:
        self.sz6.active = true;
        self.szText1.string = "6";
        break;
    }

    switch (this.b) {
      case 1:
        self.sz7.active = true;
        self.szText2.string = "1";
        break;

      case 2:
        self.sz8.active = true;
        self.szText2.string = "2";
        break;

      case 3:
        self.sz9.active = true;
        self.szText2.string = "3";
        break;

      case 4:
        self.sz10.active = true;
        self.szText2.string = "4";
        break;

      case 5:
        self.sz11.active = true;
        self.szText2.string = "5";
        break;

      case 6:
        self.sz12.active = true;
        self.szText2.string = "6";
        break;
    }

    switch (this.c) {
      case 1:
        self.sz13.active = true;
        self.szText3.string = "1";
        break;

      case 2:
        self.sz14.active = true;
        self.szText3.string = "2";
        break;

      case 3:
        self.sz15.active = true;
        self.szText3.string = "3";
        break;

      case 4:
        self.sz16.active = true;
        self.szText3.string = "4";
        break;

      case 5:
        self.sz17.active = true;
        self.szText3.string = "5";
        break;

      case 6:
        self.sz18.active = true;
        self.szText3.string = "6";
        break;
    }

    if (this.zhname == cfg.username) {
      if (this.a == this.b && this.b == this.c) {
        this.result.string = "本局结果  豹子";
      } else if (this.a + this.b + this.c <= 10) {
        this.result.string = "本局结果  小";
      } else {
        this.result.string = "本局结果  大";
      }

      if (this.resultzend > 0) {
        this.scheduleOnce(function () {
          this.guess.active = false;
          this.zwBG.active = true;
          this.zwinCoin.string = this.zhuang.toString();
          this.zwinCoin2.string = this.resultzend.toString();
        }, 1);
      } else {
        this.scheduleOnce(function () {
          this.guess.active = false;
          this.zlBG.active = true;
          this.zloseCoin.string = this.zhuang.toString();
          this.zloseCoin2.string = this.resultzend.toString();
        }, 1);
      }
    } else {
      if (this.a == this.b && this.b == this.c) {
        this.result.string = "本局结果  豹子";
        cfg.coin = this.coin;
      } else {
        if (this.a + this.b + this.c <= 10) {
          this.result.string = "本局结果  小";
          cfg.coin = this.coin;
        } else {
          this.result.string = "本局结果  大";
          cfg.coin = this.coin;
        }
      }

      this.scheduleOnce(function () {
        this.guess.active = false;
        this.resBG.active = true;
        if (this.playerInfo.soundEffectControl == 1) cc.audioEngine.play(this.resultMusic, false, 1);
        this.bCoin.string = this.resultbt.toString();
        this.sCoin.string = this.resultst.toString();

        if (this.resultb > 0) {
          this.bgCoin.string = "赢得" + this.resultb.toString();
        } else {
          this.bgCoin.string = "损失" + this.resultbt.toString();
        }

        if (this.results > 0) {
          this.sgCoin.string = "赢得" + this.results.toString();
        } else {
          this.sgCoin.string = "损失" + this.resultst.toString();
        }

        this.coin = this.coin + this.resultbt + this.resultst + this.resultb + this.results;
      }, 1);
    }
  }, 1);
}, _cc$Class.goOnclick = function goOnclick() {
  this.goBg.active = true;
}, _cc$Class.btn20 = function btn20() {
  this.zhuang = 200000;
}, _cc$Class.btn50 = function btn50() {
  this.zhuang = 500000;
}, _cc$Class.btn100 = function btn100() {
  this.zhuang = 1000000;
}, _cc$Class.btn150 = function btn150() {
  this.zhuang = 1500000;
}, _cc$Class.btn200 = function btn200() {
  this.zhuang = 2000000;
}, _cc$Class.goClose = function goClose() {
  this.goBg.active = false;
}, _cc$Class.qiang = function qiang() {
  var self = this;

  var cfg = require("cfg");

  var http = require("http"); //抢庄


  if (this.coin < this.zhuang) {
    this.goBtn.active = false;
  } else {
    this.goBtn.active = false;
    self.tp = 1;
    this.socket.send("CMD=CATCHBANKER&USERNAME=" + cfg.username + "&COIN=" + cfg.zhuang);
  }
}, _cc$Class.pastBtn = function pastBtn() {
  this.past.active = true;
  var a = [];
  var self = this;

  var cfg = require("cfg");
}, _cc$Class.closePast = function closePast() {
  this.past.active = false;
}, _cc$Class.giftBtn = function giftBtn() {
  this.gift.active = true;
}, _cc$Class.giftSend = function giftSend() {
  var self = this;

  var cfg = require("cfg");

  var http = require("http");

  var givecoin = function givecoin(ret) {
    self.notifyDown.active = true;

    if (ret.state == "ok") {
      self.coin = self.coin - self.giftCoin.string;
      self.notifyText.string = "赠送成功!";
    } else {
      self.notifyText.string = "赠送失败！\n请确认输入的金额或者ID是否正确";
    }

    self.scheduleOnce(function () {
      self.notifyDown.active = false;
    }, 2);
    self.gift.active = false;
  };

  http.createXMLHttpRequest(cfg.webUrl + "givecoin?myid=" + cfg.userid + "&youname=" + this.giftUseid.string + "&coin=" + this.giftCoin.string, givecoin);
}, _cc$Class.closeGift = function closeGift() {
  this.gift.active = false;
}, _cc$Class.detailsBtn = function detailsBtn() {
  this.detail.active = true;
}, _cc$Class.closeDetail = function closeDetail() {
  this.detail.active = false;
}, _cc$Class.rankBtn = function rankBtn() {
  this.rank.active = true;
}, _cc$Class.closeRank = function closeRank() {
  this.rank.active = false;
}, _cc$Class.init = function init(ret) {
  this.item = ret;
  var itemSlot = this.addItemSlot(ret.NICKNAME, ret.BIG, ret.SMALL);
  this.itemSlots.push(itemSlot);
}, _cc$Class.addItemSlot = function addItemSlot(a, b, c) {
  var itemSlot = cc.instantiate(this.itemPrefeb);
  this.scrollView.content.addChild(itemSlot);
  itemSlot.getComponent('xzItem').updateItem(a, b, c);
  return itemSlot;
}, _cc$Class.quit = function quit() {
  var ins = require("yadaxiaoNetWork").getInstant;

  ins.LandlordsSocket.disconnect();
  cc.director.loadScene("LobbyMain");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwieHpTdHlsZSIsIkxhYmVsIiwiZ2ciLCJOb2RlIiwiY29pblRleHQiLCJ0aW1lVGV4dCIsIm5hbWVUZXh0IiwiaWRUZXh0IiwiY20xIiwiU3ByaXRlRnJhbWUiLCJjbTIiLCJjbTMiLCJjbTQiLCJjbTUiLCJjbTYiLCJjbTciLCJjbTgiLCJ0YXJnZXQiLCJQcmVmYWIiLCJ0bnVtIiwiZmF0aGVyMSIsImZhdGhlcjIiLCJhdGV4dCIsImJ0ZXh0IiwiY3RleHQiLCJkdGV4dCIsInRhYmxldHQiLCJDaG9vc2UxIiwiQ2hvb3NlMiIsIkNob29zZTMiLCJDaG9vc2U0IiwiQ2hvb3NlNSIsIkNob29zZTYiLCJDaG9vc2U3IiwiQ2hvb3NlOCIsIkNob29zZTkiLCJDaG9vc2UxMCIsImd1ZXNzIiwic3oxIiwic3oyIiwic3ozIiwic3o0Iiwic3o1Iiwic3o2Iiwic3o3Iiwic3o4Iiwic3o5Iiwic3oxMCIsInN6MTEiLCJzejEyIiwic3oxMyIsInN6MTQiLCJzejE1Iiwic3oxNiIsInN6MTciLCJzejE4Iiwic3pkaDEiLCJzemRoMiIsInN6ZGgzIiwic3pUZXh0MSIsInN6VGV4dDIiLCJzelRleHQzIiwicmVzdWx0IiwiZ29BY3QiLCJnb0J0biIsImdvQmciLCJxekJveCIsIkVkaXRCb3giLCJ6bmFtZSIsInpjb2luIiwicGFzdCIsImdpZnQiLCJnaWZ0VXNlaWQiLCJnaWZ0Q29pbiIsImRldGFpbCIsImJnTXVzaWMiLCJ0eXBlIiwiQXVkaW9DbGlwIiwiY21NdXNpYyIsInJlc3VsdE11c2ljIiwid2FpdE11c2ljIiwicmVzQkciLCJiQ29pbiIsImJnQ29pbiIsInNDb2luIiwic2dDb2luIiwiendCRyIsInpsQkciLCJ6d2luQ29pbiIsInp3aW5Db2luMiIsInpsb3NlQ29pbiIsInpsb3NlQ29pbjIiLCJvbmxpbmUiLCJvbmxpbmV4IiwieHpUZXh0MSIsInh6VGV4dDIiLCJub3RpZnlEb3duIiwibm90aWZ5VGV4dCIsInNjcm9sbFZpZXciLCJTY3JvbGxWaWV3IiwiaXRlbVByZWZlYiIsInJhbmsiLCJvbkxvYWQiLCJ3aW5kb3ciLCJ5YWRheGlhb19pbnMiLCJzZWxmIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwicGxheWVySW5mb0V4IiwieWFkYXhpYW9fc2MiLCJjZmciLCJodHRwIiwibXVzaWNDb250cm9sIiwiY3VycmVudCIsImF1ZGlvRW5naW5lIiwicGxheSIsImNoaXAiLCJyYW5kb21SYW5nZSIsInAiLCJweCIsInB5IiwiYmlnIiwic21hbGwiLCJ6aHVhbmciLCJzdHJpbmciLCJ0b1N0cmluZyIsInpobmFtZSIsImNvaW4iLCJzY29yZSIsIm5pY2tuYW1lIiwiaWQiLCJiMTAwIiwiYjUwMCIsImIxMDAwIiwiYjIwMDAiLCJiNTAwMCIsImIxMDAwMCIsImI1MDAwMCIsImIxMDAwMDAiLCJibjEwMCIsImJuNTAwIiwiYm4xMDAwIiwiYm4yMDAwIiwiYm41MDAwIiwiYm4xMDAwMCIsImJuNTAwMDAiLCJibjEwMDAwMCIsImIiLCJzMTAwIiwiczUwMCIsInMxMDAwIiwiczIwMDAiLCJzNTAwMCIsInMxMDAwMCIsInM1MDAwMCIsInMxMDAwMDAiLCJzbjEwMCIsInNuNTAwIiwic24xMDAwIiwic24yMDAwIiwic241MDAwIiwic24xMDAwMCIsInNuNTAwMDAiLCJzbjEwMDAwMCIsInMiLCJ0aW1lIiwiYSIsImMiLCJzb2NrZXQiLCJzZXRIZWFkVGV4dHVyZSIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImhlYWRpbWd1cmwiLCJ0cCIsInBlcnNvbiIsImtleSIsInJlc3VsdGJ0IiwicmVzdWx0c3QiLCJyZXN1bHRiIiwicmVzdWx0cyIsInJlc3VsdHplbmQiLCJzdGFydCIsIml0ZW0iLCJpdGVtU2xvdHMiLCJwcmVwYXJlV2ViU29ja2V0IiwibmV0d29yayIsIkxhbmRsb3Jkc1NvY2tldCIsImVtaXQiLCJpbml0X3N0YXQiLCJ1cGRhdGUiLCJkdCIsInBhcnNlSW50IiwiYWN0aXZlIiwib25vcGVuIiwiZXZ0IiwiY29uc29sZSIsImxvZyIsInNlbmQiLCJ1c2VybmFtZSIsInB3ZCIsIm9ubWVzc2FnZSIsInJldCIsImV2YWwiLCJkYXRhIiwiQ01EIiwidGltZVNvY2tldCIsIk9OTElORUNPVU5UIiwiWFpDT1VOVCIsIkNPSU4iLCJnZXR6aHVhbmciLCJTVEFURSIsImV2ZXJ5QmV0IiwiZ2V0RGljZSIsIktFWSIsImdldENvbXBvbmVudCIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInNjaGVkdWxlT25jZSIsImNsb3NlIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJCSUdUT1RBTCIsIlNNQUxMVE9UQUwiLCJCSUdSRVNVTFQiLCJTTUFMTFJFU1VMVCIsIlpKUkVTVUxUIiwiREFUQSIsInNjaGVkdWxlIiwib3RoZXJCZXQiLCJpbml0IiwiVkFMVUUxIiwiVkFMVUUyIiwiVkFMVUUzIiwib25lcnJvciIsIm9uY2xvc2UiLCJnZXRDb2luIiwiQ09VTlQiLCJUSU1FVFlQRSIsIllaU0oiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJGWlNKIiwiS0pTSiIsImd1ZXNzQk9TIiwic3RvcCIsIlVTRVJOQU1FIiwiTklDS05BTUUiLCJCSUciLCJzcCIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiZGlhbG9nTm9kZSIsImluc3RhbnRpYXRlIiwiY29sb3IiLCJDb2xvciIsImFkZENoaWxkIiwicGFyZW50IiwicG9zaXRpb24iLCJnZXRSYW5kb21Qb3NpdGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwiU01BTEwiLCJCSUcxMDAiLCJCSUc1MDAiLCJCSUcyMDAwIiwiQklHNTAwMCIsIkJJRzEwMDAwIiwiQklHNTAwMDAiLCJCSUcxMDAwMDAiLCJTTUFMTDEwMCIsIlNNQUxMNTAwIiwiU01BTEwyMDAwIiwiU01BTEw1MDAwIiwiU01BTEwxMDAwMCIsIlNNQUxMNTAwMDAiLCJTTUFMTDEwMDAwMCIsImkiLCJsZW5ndGgiLCJqIiwiY29pbjEwME9uY2xpY2siLCJjb2luNTAwT25jbGljayIsImNvaW4yMDAwT25jbGljayIsImNvaW41MDAwT25jbGljayIsImNvaW4xV09uY2xpY2siLCJjb2luNVdPbmNsaWNrIiwiY29pbjEwV09uY2xpY2siLCJiaWdPbmNsaWNrIiwic291bmRFZmZlY3RDb250cm9sIiwic2V0UG9zaXRpb24iLCJzbWFsbE9uY2xpY2siLCJyYW5kb21NaW51czFUbzEiLCJ4IiwieSIsImdvT25jbGljayIsImJ0bjIwIiwiYnRuNTAiLCJidG4xMDAiLCJidG4xNTAiLCJidG4yMDAiLCJnb0Nsb3NlIiwicWlhbmciLCJwYXN0QnRuIiwiY2xvc2VQYXN0IiwiZ2lmdEJ0biIsImdpZnRTZW5kIiwiZ2l2ZWNvaW4iLCJzdGF0ZSIsImNyZWF0ZVhNTEh0dHBSZXF1ZXN0Iiwid2ViVXJsIiwidXNlcmlkIiwiY2xvc2VHaWZ0IiwiZGV0YWlsc0J0biIsImNsb3NlRGV0YWlsIiwicmFua0J0biIsImNsb3NlUmFuayIsIml0ZW1TbG90IiwiYWRkSXRlbVNsb3QiLCJwdXNoIiwiY29udGVudCIsInVwZGF0ZUl0ZW0iLCJxdWl0IiwiaW5zIiwiZGlzY29ubmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUg7QUFDSSxhQUFTRCxFQUFFLENBQUNFLFNBRGhCO0FBR0lDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLE9BQU8sRUFBRUosRUFBRSxDQUFDSyxLQUZKO0FBR1I7QUFDQUMsSUFBQUEsRUFBRSxFQUFFTixFQUFFLENBQUNPLElBSkM7QUFLUjtBQUNBQyxJQUFBQSxRQUFRLEVBQUVSLEVBQUUsQ0FBQ0ssS0FOTDtBQU9SO0FBQ0FJLElBQUFBLFFBQVEsRUFBRVQsRUFBRSxDQUFDTyxJQVJMO0FBU1I7QUFDQUcsSUFBQUEsUUFBUSxFQUFFVixFQUFFLENBQUNLLEtBVkw7QUFXUk0sSUFBQUEsTUFBTSxFQUFFWCxF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LE9BQUt4TixJQUFMLENBQVU0RixNQUFWLEdBQW1CLEtBQW5CO0FBQ0gsQ0Foa0NMLFlBa2tDSXFDLElBbGtDSixHQWtrQ1UsY0FBVTVCLEdBQVYsRUFBZTtBQUNqQixPQUFLbkIsSUFBTCxHQUFZbUIsR0FBWjtBQUNBLE1BQUlvSCxRQUFRLEdBQUcsS0FBS0MsV0FBTCxDQUFpQnJILEdBQUcsQ0FBQzhDLFFBQXJCLEVBQThCOUMsR0FBRyxDQUFDK0MsR0FBbEMsRUFBc0MvQyxHQUFHLENBQUM4RCxLQUExQyxDQUFmO0FBQ0EsT0FBS2hGLFNBQUwsQ0FBZXdJLElBQWYsQ0FBb0JGLFFBQXBCO0FBQ0gsQ0F0a0NMLFlBd2tDSUMsV0F4a0NKLEdBd2tDaUIscUJBQVV4SixDQUFWLEVBQVluQixDQUFaLEVBQWNvQixDQUFkLEVBQWlCO0FBQzFCLE1BQUlzSixRQUFRLEdBQUdsVSxFQUFFLENBQUNtUSxXQUFILENBQWUsS0FBSzNKLFVBQXBCLENBQWY7QUFDQSxPQUFLRixVQUFMLENBQWdCK04sT0FBaEIsQ0FBd0IvRCxRQUF4QixDQUFpQzRELFFBQWpDO0FBQ0FBLEVBQUFBLFFBQVEsQ0FBQ3ZHLFlBQVQsQ0FBc0IsUUFBdEIsRUFBZ0MyRyxVQUFoQyxDQUEyQzNKLENBQTNDLEVBQThDbkIsQ0FBOUMsRUFBaURvQixDQUFqRDtBQUNBLFNBQU9zSixRQUFQO0FBQ0gsQ0E3a0NMLFlBK2tDSUssSUEva0NKLG1CQWdsQ0k7QUFDSSxNQUFJQyxHQUFHLEdBQUd6TixPQUFPLENBQUMsaUJBQUQsQ0FBUCxDQUEyQkMsVUFBckM7O0FBQ0F3TixFQUFBQSxHQUFHLENBQUN6SSxlQUFKLENBQW9CMEksVUFBcEI7QUFDQXpVLEVBQUFBLEVBQUUsQ0FBQ2dPLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixXQUF0QjtBQUNILENBcGxDTCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvL+S4i+azqOexu+Wei1xyXG4gICAgICAgIHh6U3R5bGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v6YCa55+lXHJcbiAgICAgICAgZ2c6IGNjLk5vZGUsXHJcbiAgICAgICAgLy/ph5HluIHmlbBcclxuICAgICAgICBjb2luVGV4dDogY2MuTGFiZWwsXHJcbiAgICAgICAgLy/ml7bpl7RcclxuICAgICAgICB0aW1lVGV4dDogY2MuTm9kZSxcclxuICAgICAgICAvL+eUqOaIt+WQjVxyXG4gICAgICAgIG5hbWVUZXh0OiBjYy5MYWJlbCxcclxuICAgICAgICBpZFRleHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v562556CB5Zu+54mHXHJcbiAgICAgICAgY20xOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBjbTI6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgIGNtMzogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgY200OiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBjbTU6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgIGNtNjogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgY203OiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBjbTg6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgIHRhcmdldDogY2MuUHJlZmFiLFxyXG4gICAgICAgIHRudW06IGNjLlByZWZhYixcclxuICAgICAgICBmYXRoZXIxOiBjYy5Ob2RlLFxyXG4gICAgICAgIGZhdGhlcjI6IGNjLk5vZGUsXHJcbiAgICAgICAgLy/kuK3pg6jmmL7npLpcclxuICAgICAgICBhdGV4dDogY2MuTGFiZWwsXHJcbiAgICAgICAgYnRleHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGN0ZXh0OiBjYy5MYWJlbCxcclxuICAgICAgICBkdGV4dDogY2MuTGFiZWwsXHJcbiAgICAgICAgLy/kuK3pg6jpgInmi6lcclxuICAgICAgICB0YWJsZXR0OiBjYy5Ob2RlLFxyXG4gICAgICAgIENob29zZTE6IGNjLk5vZGUsXHJcbiAgICAgICAgQ2hvb3NlMjogY2MuTm9kZSxcclxuICAgICAgICAvL+S4i+aWuemAieaLqVxyXG4gICAgICAgIENob29zZTM6IGNjLk5vZGUsXHJcbiAgICAgICAgQ2hvb3NlNDogY2MuTm9kZSxcclxuICAgICAgICBDaG9vc2U1OiBjYy5Ob2RlLFxyXG4gICAgICAgIENob29zZTY6IGNjLk5vZGUsXHJcbiAgICAgICAgQ2hvb3NlNzogY2MuTm9kZSxcclxuICAgICAgICBDaG9vc2U4OiBjYy5Ob2RlLFxyXG4gICAgICAgIENob29zZTk6IGNjLk5vZGUsXHJcbiAgICAgICAgQ2hvb3NlMTA6IGNjLk5vZGUsXHJcbiAgICAgICAgLy/njJzlpKflsI/nlYzpnaJcclxuICAgICAgICBndWVzczogY2MuTm9kZSxcclxuICAgICAgICBzejE6IGNjLk5vZGUsXHJcbiAgICAgICAgc3oyOiBjYy5Ob2RlLFxyXG4gICAgICAgIHN6MzogY2MuTm9kZSxcclxuICAgICAgICBzejQ6IGNjLk5vZGUsXHJcbiAgICAgICAgc3o1OiBjYy5Ob2RlLFxyXG4gICAgICAgIHN6NjogY2MuTm9kZSxcclxuICAgICAgICBzejc6IGNjLk5vZGUsXHJcbiAgICAgICAgc3o4OiBjYy5Ob2RlLFxyXG4gICAgICAgIHN6OTogY2MuTm9kZSxcclxuICAgICAgICBzejEwOiBjYy5Ob2RlLFxyXG4gICAgICAgIHN6MTE6IGNjLk5vZGUsXHJcbiAgICAgICAgc3oxMjogY2MuTm9kZSxcclxuICAgICAgICBzejEzOiBjYy5Ob2RlLFxyXG4gICAgICAgIHN6MTQ6IGNjLk5vZGUsXHJcbiAgICAgICAgc3oxNTogY2MuTm9kZSxcclxuICAgICAgICBzejE2OiBjYy5Ob2RlLFxyXG4gICAgICAgIHN6MTc6IGNjLk5vZGUsXHJcbiAgICAgICAgc3oxODogY2MuTm9kZSxcclxuICAgICAgICBzemRoMTogY2MuTm9kZSxcclxuICAgICAgICBzemRoMjogY2MuTm9kZSxcclxuICAgICAgICBzemRoMzogY2MuTm9kZSxcclxuICAgICAgICBzelRleHQxOiBjYy5MYWJlbCxcclxuICAgICAgICBzelRleHQyOiBjYy5MYWJlbCxcclxuICAgICAgICBzelRleHQzOiBjYy5MYWJlbCxcclxuICAgICAgICByZXN1bHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v5oqi5bqE5oyJ6ZKuXHJcbiAgICAgICAgZ29BY3Q6IGNjLk5vZGUsXHJcbiAgICAgICAgZ29CdG46IGNjLk5vZGUsXHJcbiAgICAgICAgZ29CZzogY2MuTm9kZSxcclxuICAgICAgICBxekJveDogY2MuRWRpdEJveCxcclxuICAgICAgICAvL+S4iuW6hFxyXG4gICAgICAgIHpuYW1lOiBjYy5MYWJlbCxcclxuICAgICAgICB6Y29pbjogY2MuTGFiZWwsXHJcbiAgICAgICAgLy/lvoDmnJ9cclxuICAgICAgICBwYXN0OiBjYy5Ob2RlLFxyXG4gICAgICAgIC8v6LWg6YCBXHJcbiAgICAgICAgZ2lmdDogY2MuTm9kZSxcclxuICAgICAgICBnaWZ0VXNlaWQ6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgZ2lmdENvaW46IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgLy/or6bmg4VcclxuICAgICAgICBkZXRhaWw6IGNjLk5vZGUsXHJcbiAgICAgICAgLy9NVVNJQ1xyXG4gICAgICAgIGJnTXVzaWM6IFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNtTXVzaWM6IFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdE11c2ljOiBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3YWl0TXVzaWM6IFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8v57uT566XXHJcbiAgICAgICAgcmVzQkc6IGNjLk5vZGUsXHJcbiAgICAgICAgYkNvaW46IGNjLkxhYmVsLFxyXG4gICAgICAgIGJnQ29pbjogY2MuTGFiZWwsXHJcbiAgICAgICAgc0NvaW46IGNjLkxhYmVsLFxyXG4gICAgICAgIHNnQ29pbjogY2MuTGFiZWwsXHJcbiAgICAgICAgendCRzogY2MuTm9kZSxcclxuICAgICAgICB6bEJHOiBjYy5Ob2RlLFxyXG4gICAgICAgIHp3aW5Db2luOiBjYy5MYWJlbCxcclxuICAgICAgICB6d2luQ29pbjI6IGNjLkxhYmVsLFxyXG4gICAgICAgIHpsb3NlQ29pbjogY2MuTGFiZWwsXHJcbiAgICAgICAgemxvc2VDb2luMjogY2MuTGFiZWwsXHJcbiAgICAgICAgLy/lnKjnur/kurrmlbBcclxuICAgICAgICBvbmxpbmU6IGNjLkxhYmVsLFxyXG4gICAgICAgIG9ubGluZXg6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v5Liq5Lq65LiL5rOo6YeR6aKdXHJcbiAgICAgICAgeHpUZXh0MTogY2MuTm9kZSxcclxuICAgICAgICB4elRleHQyOiBjYy5Ob2RlLFxyXG4gICAgICAgIC8v5LiL57q/5o+Q56S6XHJcbiAgICAgICAgbm90aWZ5RG93bjogY2MuTm9kZSxcclxuICAgICAgICBub3RpZnlUZXh0OiBjYy5MYWJlbCxcclxuICAgICAgICAvL+S4i+azqOiusOW9lVxyXG4gICAgICAgIHNjcm9sbFZpZXc6IHtcclxuICAgICAgICBcdGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgXHR0eXBlOiBjYy5TY3JvbGxWaWV3XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpdGVtUHJlZmViOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgLy/mjpLooYzmppxcclxuICAgICAgICByYW5rOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cueWFkYXhpYW9faW5zID0gdGhpcztcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvRXggPSB3aW5kb3cueWFkYXhpYW9fc2M7XHJcblxyXG4gICAgICAgIHZhciBjZmcgPSByZXF1aXJlKFwiY2ZnXCIpO1xyXG4gICAgICAgIHZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby5tdXNpY0NvbnRyb2wgPT0gMSlcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJnTXVzaWMsIHRydWUsIDAuNik7XHJcbiAgICAgICAgdGhpcy5jaGlwID0gMTAwOyAvL+WAjeaVsFxyXG4gICAgICAgIHRoaXMucmFuZG9tUmFuZ2UgPSBjYy5wKDE2MCwgMTI1KTtcclxuICAgICAgICB0aGlzLnB4ID0gMDtcclxuICAgICAgICB0aGlzLnB5ID0gNjU7XHJcbiAgICAgICAgdGhpcy5iaWcgPSAwO1xyXG4gICAgICAgIHRoaXMuc21hbGwgPSAwO1xyXG4gICAgICAgIHRoaXMuemh1YW5nID0gY2ZnLnpodWFuZztcclxuICAgICAgICB0aGlzLnF6Qm94LnN0cmluZyA9IGNmZy56aHVhbmcudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnpobmFtZSA9IFwi5pegXCI7XHJcbiAgICAgICAgLy90aGlzLmNvaW4gPSBjZmcuY29pbjtcclxuICAgICAgICB0aGlzLmNvaW4gPSB0aGlzLnBsYXllckluZm9FeC5zY29yZTtcclxuICAgICAgICAvLyBpZihjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpeyBcclxuICAgICAgICAvLyAgICAgdGhpcy5uYW1lVGV4dC5zdHJpbmcgPSBcIuaJi+acuuS4k+WMui5cIiArIGNmZy5uaWNrbmFtZTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5uYW1lVGV4dC5zdHJpbmcgPSBcIueUteiEkeS4k+WMui5cIiArIGNmZy5uaWNrbmFtZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5uYW1lVGV4dC5zdHJpbmcgPSB0aGlzLnBsYXllckluZm9FeC5uaWNrbmFtZTtcclxuICAgICAgICAvL3RoaXMuaWRUZXh0LnN0cmluZyA9IFwiSUQ6XCIgKyBjZmcudXNlcmlkO1xyXG4gICAgICAgIHRoaXMuaWRUZXh0LnN0cmluZyA9IFwiSUQ6XCIgKyB0aGlzLnBsYXllckluZm9FeC5pZDtcclxuICAgICAgICB0aGlzLmIxMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuYjUwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5iMTAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5iMjAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5iNTAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5iMTAwMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuYjUwMDAwID0gMDtcclxuICAgICAgICB0aGlzLmIxMDAwMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuYm4xMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuYm41MDAgPSAwO1xyXG4gICAgICAgIHRoaXMuYm4xMDAwID0gMDtcclxuICAgICAgICB0aGlzLmJuMjAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5ibjUwMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuYm4xMDAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5ibjUwMDAwID0gMDtcclxuICAgICAgICB0aGlzLmJuMTAwMDAwID0gMDtcclxuICAgICAgICB0aGlzLmIgPSBbXTtcclxuICAgICAgICB0aGlzLnMxMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuczUwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5zMTAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5zMjAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5zNTAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5zMTAwMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuczUwMDAwID0gMDtcclxuICAgICAgICB0aGlzLnMxMDAwMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuc24xMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuc241MDAgPSAwO1xyXG4gICAgICAgIHRoaXMuc24xMDAwID0gMDtcclxuICAgICAgICB0aGlzLnNuMjAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5zbjUwMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuc24xMDAwMCA9IDA7XHJcbiAgICAgICAgdGhpcy5zbjUwMDAwID0gMDtcclxuICAgICAgICB0aGlzLnNuMTAwMDAwID0gMDtcclxuICAgICAgICB0aGlzLnMgPSBbXTtcclxuICAgICAgICB0aGlzLnRpbWUgPSA5OTk5OTtcclxuICAgICAgICB0aGlzLmEgPSAxO1xyXG4gICAgICAgIHRoaXMuYiA9IDE7XHJcbiAgICAgICAgdGhpcy5jID0gMTtcclxuICAgICAgICAvL3RoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzOi8vNjAuMjA1LjE5MS44NzoxMDAzMS9cIik7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSByZXF1aXJlKFwieWFkYXhpYW9OZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgc2V0SGVhZFRleHR1cmUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdoZWFkJyksdGhpcy5wbGF5ZXJJbmZvRXguaGVhZGltZ3VybCk7XHJcbiAgICAgICAgdGhpcy50cCA9IDE7XHJcbiAgICAgICAgdGhpcy5wZXJzb24gPSAwO1xyXG4gICAgICAgIHRoaXMua2V5ID0gXCJcIjtcclxuICAgICAgICAvL+e7k+eul+aVsOWAvOWIneWni+WMllxyXG4gICAgICAgIHRoaXMucmVzdWx0YnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c3QgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzdWx0YiA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gMDtcclxuICAgICAgICB0aGlzLnJlc3VsdHplbmQgPSAwO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLml0ZW0gPSBbXTtcclxuICAgICAgICB0aGlzLml0ZW1TbG90cyA9IFtdO1xyXG4gICAgICAgIHRoaXMucHJlcGFyZVdlYlNvY2tldCgpO1xyXG5cclxuICAgICAgICB0aGlzLm5ldHdvcmsgPSByZXF1aXJlKCd5YWRheGlhb05ldFdvcmsnKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdCgnZ2V0R2FtZVR5cGUnLCAnJyk7XHJcbiAgICB9LFxyXG4gICAgXHJcblxyXG4gICAgaW5pdF9zdGF0KHJlc3VsdCl7XHJcbiAgICAgICAgdmFyIGEgPSAxO1xyXG4gICAgICAgIC8vIGlmIChyZXN1bHQuZ2FtZV90eXBlID09IDEpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZiAocmVzdWx0LmJldF90aW1lID09IDIwKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmJldEJlZ2luKCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5iZXRfdGV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tX2lHYW1lT3ZlclRpbWUgPSBEYXRlLm5vdygpLzEwMDArcmVzdWx0LmJldF90aW1lO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaW1fd2FpdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl9hcnJbNF0ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfYXJyWzVdLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIC8vIH1lbHNlIFxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYW5pbV93YWl0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIGZvciAodmFyIGkgaW4gdGhpcy5wb2tlcl9hcnIpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBmb3IgKHZhciBpIGluIHJlc3VsdC5iZXRfbGlzdClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubV9sUG9vbE51bVtyZXN1bHQuYmV0X2xpc3RbaV0uYmV0X3Jlc10gPSByZXN1bHQuYmV0X2xpc3RbaV0uYmV0X2dvbGQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuc2V0UG9vbFZpZXcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICB0aGlzLmNvaW5UZXh0LnN0cmluZyA9IHRoaXMuY29pbi50b1N0cmluZygpO1xyXG4gICAgICAgIGNmZy56aHVhbmcgPSBwYXJzZUludCh0aGlzLnF6Qm94LnN0cmluZyk7XHJcbiAgICAgICAgaWYocGFyc2VJbnQodGhpcy5xekJveC5zdHJpbmcpID4gMTAwMDAwMCl7XHJcbiAgICAgICAgICAgIHRoaXMucXpCb3guc3RyaW5nID0gXCIxMDAwMDAwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudHAgPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ29CdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6ZW/6L+e5o6lXHJcbiAgICBwcmVwYXJlV2ViU29ja2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXTlt7LlvIDlkK9cIik7XHJcbiAgICAgICAgICAgIC8v6I635Y+W6YeR5biBXHJcbiAgICAgICAgICAgIHNlbGYuc29ja2V0LnNlbmQoXCJDTUQ9VVNFUkdFVENPSU4mVVNFUk5BTUU9XCIgKyBjZmcudXNlcm5hbWUgKyBcIiZQV0Q9XCIgKyBjZmcucHdkKTtcclxuICAgICAgICAgICAgc2VsZi5zb2NrZXQuc2VuZChcIkNNRD1RVUVSWUJBTktFUlwiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgICAgICAgdmFyIHJldCA9IGV2YWwoXCIoXCIgKyBldnQuZGF0YSArIFwiKVwiKTtcclxuICAgICAgICAgICAgc3dpdGNoKHJldC5DTUQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkdFVENPVU5UXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW1lU29ja2V0KHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbmxpbmUuc3RyaW5nID0gIFwi5Zyo57q/5Lq65pWw77yaXCIgKyByZXQuT05MSU5FQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbmxpbmV4LnN0cmluZyA9ICBcIuS4i+azqOS6uuaVsO+8mlwiICsgcmV0LlhaQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiVVNFUkdFVENPSU5cIjpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2ZnLmNvaW4gPSByZXQuQ09JTjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvaW4gPSByZXQuQ09JTjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNvY2tldC5zZW5kKFwiQ01EPUdFVFRPVEFMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlFVRVJZQkFOS0VSXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0emh1YW5nKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ0FUQ0hCQU5LRVJcIjpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmV0LlNUQVRFICsgXCLmiqLluoRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiR0VUVE9UQUxcIjpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ldmVyeUJldChyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0RGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlVTRVJLRVlcIjpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmtleSA9IHJldC5LRVk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zb2NrZXQuc2VuZChcIkNNRD1OT1RJRllVU0VSJlVTRVJOQU1FPVwiICsgY2ZnLnVzZXJuYW1lICsgXCImS0VZPVwiICsgc2VsZi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIk5PVElGWURPV05cIjpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vdGlmeURvd24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4i+e6v+mAmuefpVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vdGlmeVRleHQuc3RyaW5nID0gXCI85LiL57q/6YCa55+lPlxcbuaCqOeahOi0puWPt+W3suWcqOWFtuWug+iuvuWkh+S4iueZu+W9lVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuQ2hvb3NlMS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkNob29zZTIuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5DaG9vc2UzLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuQ2hvb3NlNC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkNob29zZTUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5DaG9vc2U2LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuQ2hvb3NlNy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkNob29zZTguZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5DaG9vc2U5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuQ2hvb3NlMTAuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJRVUVSWVJFU1VMVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0YnQgPSBwYXJzZUludChyZXQuQklHVE9UQUwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0c3QgPSBwYXJzZUludChyZXQuU01BTExUT1RBTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRiID0gcGFyc2VJbnQocmV0LkJJR1JFU1VMVCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRzID0gcGFyc2VJbnQocmV0LlNNQUxMUkVTVUxUKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdHplbmQgPSBwYXJzZUludChyZXQuWkpSRVNVTFQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTRU5EREFUQVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdnLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmV0LkRBVEE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiVVNFUkJFVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm90aGVyQmV0KHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbml0KHJldCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiR0VURElDRVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYSA9IHJldC5WQUxVRTE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5iID0gcmV0LlZBTFVFMjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmMgPSByZXQuVkFMVUUzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOiBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic29ja2V06ZSZ6K+vXCIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uY2xvc2UgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXTlhbPpl61cIik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlumHkeW4gVxyXG4gICAgZ2V0Q29pbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjZmcgPSByZXF1aXJlKFwiY2ZnXCIpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQoXCJDTUQ9VVNFUkdFVENPSU4mVVNFUk5BTUU9XCIgKyBjZmcudXNlcm5hbWUgKyBcIiZQV0Q9XCIgKyBjZmcucHdkKTtcclxuICAgIH0sXHJcbiAgICAvL+W9k+WJjeaXtumXtOeKtuaAgVxyXG4gICAgdGltZVNvY2tldDogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIHZhciBjZmcgPSByZXF1aXJlKFwiY2ZnXCIpO1xyXG4gICAgICAgIC8vIHRoaXMudGltZVRleHQuc3RyaW5nID0gcmV0LkNPVU5ULnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy50aW1lVGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJldC5DT1VOVC50b1N0cmluZygpO1xyXG4gICAgICAgIHN3aXRjaChyZXQuVElNRVRZUEUpe1xyXG4gICAgICAgICAgICBjYXNlIFwiUVpcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZVRleHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29pbiA+IDIwMDAwMCAmJiB0aGlzLnRwID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29CdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hvb3NlMS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hvb3NlMi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueHpTdHlsZS5zdHJpbmcgPSBcIuato+WcqOaKouW6hFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTWlwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lVGV4dC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueHpTdHlsZS5zdHJpbmcgPSBcIuehruiupOW6hOWutlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UxLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb0J0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoXCJDTUQ9UVVFUllCQU5LRVJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIllaXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVUZXh0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnh6U3R5bGUuc3RyaW5nID0gXCLkuIvms6jpmLbmrrVcIjtcclxuICAgICAgICAgICAgICAgIGlmKHJldC5DT1VOVCA9PSByZXQuWVpTSiAtIDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERpY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXRleHQuc3RyaW5nID09IFwiOTk5OTk5OTk5XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXRleHQuc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idGV4dC5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0ZXh0LnN0cmluZyA9IHRoaXMuemh1YW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHRleHQuc3RyaW5nID0gdGhpcy56aHVhbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbiArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MCk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmxpbmV4LnN0cmluZyA9ICBcIuS4i+azqOS6uuaVsO+8mlwiICsgdGhpcy5wZXJzb24udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuemhuYW1lICE9IGNmZy5uaWNrbmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UxLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkZaXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVUZXh0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy54elN0eWxlLnN0cmluZyA9IFwi5YGc5q2i5LiL5rOoXCI7XHJcbiAgICAgICAgICAgICAgICBpZihyZXQuQ09VTlQgPT0gcmV0LkZaU0ope1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoXCJDTUQ9UVVFUllSRVNVTFQmVVNFUk5BTUU9XCIgKyBjZmcudXNlcm5hbWUgKyBcIiZCSUdUT1RBTD1cIiArIHRoaXMuYmlnICsgXCImU01BTExUT1RBTD1cIiArIHRoaXMuc21hbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UxLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UzLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2U0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2U1LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2U2LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2U3LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2U4LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2U5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UxMC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiS0pcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZVRleHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNob29zZTEuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNob29zZTIuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZihyZXQuQ09VTlQgPT0gcmV0LktKU0ope1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Vlc3NCT1MoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHJldC5DT1VOVCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKHRoaXMuY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCd0YWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnh6U3R5bGUuc3RyaW5nID0gXCLmraPlnKjlvIDlpZZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+W9k+WJjeW6hOWutlxyXG4gICAgZ2V0emh1YW5nOiBmdW5jdGlvbihyZXQpIHtcclxuICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICBpZihyZXQuVVNFUk5BTUUgPT0gXCJudWxsXCIpe1xyXG4gICAgICAgICAgICB0aGlzLnpobmFtZSA9IFwi5pegXCI7XHJcbiAgICAgICAgICAgIHRoaXMuemNvaW4uc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuemhuYW1lID0gcmV0Lk5JQ0tOQU1FO1xyXG4gICAgICAgICAgICB0aGlzLnpodWFuZyA9IHJldC5DT0lOO1xyXG4gICAgICAgICAgICB0aGlzLnpjb2luLnN0cmluZyA9IHRoaXMuemh1YW5nLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuem5hbWUuc3RyaW5nID0gdGhpcy56aG5hbWU7XHJcbiAgICAgICAgaWYodGhpcy56aG5hbWUgPT0gY2ZnLm5pY2tuYW1lKXtcclxuICAgICAgICAgICAgdGhpcy5jb2luID0gdGhpcy5jb2luIC0gcmV0LkNPSU47XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+W6aqw5a2Q57uT5p6cXHJcbiAgICBnZXREaWNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5zZW5kKFwiQ01EPUdFVERJQ0VcIik7XHJcbiAgICB9LFxyXG4gICAgLy/lrp7ml7bojrflj5bnrbnnoIFcclxuICAgIG90aGVyQmV0OiBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgdmFyIGNmZyA9IHJlcXVpcmUoXCJjZmdcIik7XHJcbiAgICAgICAgdGhpcy5hdGV4dC5zdHJpbmcgPSByZXQuQklHVE9UQUw7XHJcbiAgICAgICAgdGhpcy5idGV4dC5zdHJpbmcgPSByZXQuU01BTExUT1RBTDtcclxuICAgICAgICB0aGlzLmN0ZXh0LnN0cmluZyA9IHRoaXMuemh1YW5nICsgcmV0LlNNQUxMVE9UQUwgLSByZXQuQklHVE9UQUw7XHJcbiAgICAgICAgdGhpcy5kdGV4dC5zdHJpbmcgPSB0aGlzLnpodWFuZyArIHJldC5CSUdUT1RBTCAtIHJldC5TTUFMTFRPVEFMO1xyXG4gICAgICAgIGlmKHRoaXMuemhuYW1lICE9IGNmZy51c2VybmFtZSl7XHJcbiAgICAgICAgICAgIGlmKCh0aGlzLnpodWFuZyArIHJldC5TTUFMTFRPVEFMIC0gcmV0LkJJR1RPVEFMKSA8PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hvb3NlMS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNob29zZTEuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZigodGhpcy56aHVhbmcgKyByZXQuQklHVE9UQUwgLSByZXQuU01BTExUT1RBTCkgPD0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNob29zZTIuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaG9vc2UyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmV0LkJJRyA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnB4ID0gLTMxMDtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSgnU3ByaXRlJyk7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIHN3aXRjaChyZXQuQklHKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDUwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY20yO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMDAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDUwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTAwMDAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpYWxvZ05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ05vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJldC5CSUc7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hZGRDaGlsZChkaWFsb2dOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMudGFibGV0dDtcclxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHRoaXMuZ2V0UmFuZG9tUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbm9kZS53aWR0aCA9IDUwO1xyXG4gICAgICAgICAgICBub2RlLmhlaWdodCA9IDUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXQuU01BTEwgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5weCA9IDMxMDtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSgnU3ByaXRlJyk7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIHN3aXRjaChyZXQuU01BTEwpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY200O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY201O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1MDAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY202O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtODtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlhbG9nTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nTm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigwLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmV0LlNNQUxMO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWRkQ2hpbGQoZGlhbG9nTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLnRhYmxldHQ7XHJcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSB0aGlzLmdldFJhbmRvbVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIG5vZGUud2lkdGggPSA1MDtcclxuICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSA1MDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXZlcnlCZXQ6IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICB2YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG4gICAgICAgIHRoaXMuYXRleHQuc3RyaW5nID0gcmV0LkJJRztcclxuICAgICAgICB0aGlzLmJ0ZXh0LnN0cmluZyA9IHJldC5TTUFMTDtcclxuICAgICAgICB0aGlzLmN0ZXh0LnN0cmluZyA9IHRoaXMuemh1YW5nICsgcmV0LlNNQUxMIC0gcmV0LkJJRztcclxuICAgICAgICB0aGlzLmR0ZXh0LnN0cmluZyA9IHRoaXMuemh1YW5nICsgcmV0LkJJRyAtIHJldC5TTUFMTDtcclxuICAgICAgICAvL+iHquWKqOabtOaWsOetueeggVxyXG4gICAgICAgIHRoaXMuYjEwMCA9IHJldC5CSUcxMDA7XHJcbiAgICAgICAgdGhpcy5iNTAwID0gcmV0LkJJRzUwMDtcclxuICAgICAgICB0aGlzLmIyMDAwID0gcmV0LkJJRzIwMDA7XHJcbiAgICAgICAgdGhpcy5iNTAwMCA9IHJldC5CSUc1MDAwO1xyXG4gICAgICAgIHRoaXMuYjEwMDAwID0gcmV0LkJJRzEwMDAwO1xyXG4gICAgICAgIHRoaXMuYjUwMDAwID0gcmV0LkJJRzUwMDAwO1xyXG4gICAgICAgIHRoaXMuYjEwMDAwMCA9IHJldC5CSUcxMDAwMDA7XHJcbiAgICAgICAgdGhpcy5zMTAwID0gcmV0LlNNQUxMMTAwO1xyXG4gICAgICAgIHRoaXMuczUwMCA9IHJldC5TTUFMTDUwMDtcclxuICAgICAgICB0aGlzLnMyMDAwID0gcmV0LlNNQUxMMjAwMDtcclxuICAgICAgICB0aGlzLnM1MDAwID0gcmV0LlNNQUxMNTAwMDtcclxuICAgICAgICB0aGlzLnMxMDAwMCA9IHJldC5TTUFMTDEwMDAwO1xyXG4gICAgICAgIHRoaXMuczUwMDAwID0gcmV0LlNNQUxMNTAwMDA7XHJcbiAgICAgICAgdGhpcy5zMTAwMDAwID0gcmV0LlNNQUxMMTAwMDAwO1xyXG4gICAgICAgIHRoaXMuYiA9IFt0aGlzLmIxMDAgLSB0aGlzLmJuMTAwLHRoaXMuYjUwMCAtIHRoaXMuYm41MDAsdGhpcy5iMjAwMCAtIHRoaXMuYm4yMDAwLHRoaXMuYjUwMDAgLSB0aGlzLmJuNTAwMCx0aGlzLmIxMDAwMCAtIHRoaXMuYm4xMDAwMCx0aGlzLmI1MDAwMCAtIHRoaXMuYm41MDAwMCx0aGlzLmIxMDAwMDAgLSB0aGlzLmJuMTAwMDAwXTtcclxuICAgICAgICB0aGlzLnMgPSBbdGhpcy5zMTAwIC0gdGhpcy5zbjEwMCx0aGlzLnM1MDAgLSB0aGlzLnNuNTAwLHRoaXMuczIwMDAgLSB0aGlzLnNuMjAwMCx0aGlzLnM1MDAwIC0gdGhpcy5zbjUwMDAsdGhpcy5zMTAwMDAgLSB0aGlzLnNuMTAwMDAsdGhpcy5zNTAwMDAgLSB0aGlzLnNuNTAwMDAsdGhpcy5zMTAwMDAwIC0gdGhpcy5zbjEwMDAwMF07XHJcbiAgICAgICAgLy/mt7vliqDlpKfnrbnnoIFcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLmIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHRoaXMuYltpXTtqKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5weCA9IC0zMTA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKCdTcHJpdGUnKTtcclxuICAgICAgICAgICAgICAgIHZhciBzcCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goaSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY20yO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY201O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTY7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy50YWJsZXR0O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHRoaXMuZ2V0UmFuZG9tUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIG5vZGUud2lkdGggPSA1MDtcclxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gNTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDlsI/nrbnnoIFcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHRoaXMuc1tpXTtqKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5weCA9IDMxMDtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gbmV3IGNjLk5vZGUoJ1Nwcml0ZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaChpKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY20xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY200O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY203O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLnRhYmxldHQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gdGhpcy5nZXRSYW5kb21Qb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS53aWR0aCA9IDUwO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSA1MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnpobmFtZSAhPSBjZmcudXNlcm5hbWUpe1xyXG4gICAgICAgICAgICBpZigodGhpcy56aHVhbmcgKyByZXQuU01BTEwgLSByZXQuQklHKSA8PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hvb3NlMS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNob29zZTEuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZigodGhpcy56aHVhbmcgKyByZXQuYmlnIC0gcmV0LnNtYWxsKSA8PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hvb3NlMi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNob29zZTIuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJuMTAwID0gcmV0LkJJRzEwMDtcclxuICAgICAgICB0aGlzLmJuNTAwID0gcmV0LkJJRzUwMDtcclxuICAgICAgICB0aGlzLmJuMjAwMCA9IHJldC5CSUcyMDAwO1xyXG4gICAgICAgIHRoaXMuYm41MDAwID0gcmV0LkJJRzUwMDA7XHJcbiAgICAgICAgdGhpcy5ibjEwMDAwID0gcmV0LkJJRzEwMDAwO1xyXG4gICAgICAgIHRoaXMuYm41MDAwMCA9IHJldC5CSUc1MDAwMDtcclxuICAgICAgICB0aGlzLmJuMTAwMDAwID0gcmV0LkJJRzEwMDAwMDtcclxuICAgICAgICB0aGlzLnNuMTAwID0gcmV0LlNNQUxMMTAwO1xyXG4gICAgICAgIHRoaXMuc241MDAgPSByZXQuU01BTEw1MDA7XHJcbiAgICAgICAgdGhpcy5zbjIwMDAgPSByZXQuU01BTEwyMDAwO1xyXG4gICAgICAgIHRoaXMuc241MDAwID0gcmV0LlNNQUxMNTAwMDtcclxuICAgICAgICB0aGlzLnNuMTAwMDAgPSByZXQuU01BTEwxMDAwMDtcclxuICAgICAgICB0aGlzLnNuNTAwMDAgPSByZXQuU01BTEw1MDAwMDtcclxuICAgICAgICB0aGlzLnNuMTAwMDAwID0gcmV0LlNNQUxMMTAwMDAwO1xyXG4gICAgLy8gaHR0cC5jcmVhdGVYTUxIdHRwUmVxdWVzdChjZmcuY1VybCArIFwiR0VUVE9UQUxcIix0aW1lZGF0ZSk7XHJcbiAgICB9LFxyXG4gICAgLy8xMDDms6jmjInpkq5cclxuICAgIGNvaW4xMDBPbmNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jaGlwID0gMTAwO1xyXG4gICAgfSxcclxuICAgIC8vNTAw5rOo5oyJ6ZKuXHJcbiAgICBjb2luNTAwT25jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2hpcCA9IDUwMDtcclxuICAgIH0sXHJcbiAgICAvLzIwMDDms6jmjInpkq5cclxuICAgIGNvaW4yMDAwT25jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2hpcCA9IDIwMDA7XHJcbiAgICB9LFxyXG4gICAgLy81MDAw5rOo5oyJ6ZKuXHJcbiAgICBjb2luNTAwME9uY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNoaXAgPSA1MDAwO1xyXG4gICAgfSxcclxuICAgIC8vMTAwMDDms6jmjInpkq5cclxuICAgIGNvaW4xV09uY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNoaXAgPSAxMDAwMDtcclxuICAgIH0sXHJcbiAgICAvLzUwMDAw5rOo5oyJ6ZKuXHJcbiAgICBjb2luNVdPbmNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jaGlwID0gNTAwMDA7XHJcbiAgICB9LFxyXG4gICAgLy8xMDAwMDDms6jmjInpkq5cclxuICAgIGNvaW4xMFdPbmNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jaGlwID0gMTAwMDAwO1xyXG4gICAgfSxcclxuICAgIC8v5b+r5Y6L5oyJ6ZKuXHJcbiAgICBjb2luMTBXT25jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2hpcCA9IHRoaXMuY29pbjtcclxuICAgIH0sXHJcbiAgICAvL+aMiemSruWkp+Wwj1xyXG4gICAgYmlnT25jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v5b+r5Y6LXHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCA9PSAxKVxyXG4gICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jbU11c2ljLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgaWYodGhpcy5jaGlwID09IHRoaXMuY29pbiAmJiB0aGlzLmNvaW4gPiAwKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGlwID4gcGFyc2VJbnQodGhpcy5jdGV4dC5zdHJpbmcpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpcCA9IHBhcnNlSW50KHRoaXMuY3RleHQuc3RyaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnh6VGV4dDEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iaWcgPSB0aGlzLmJpZyArIHRoaXMuY2hpcDtcclxuICAgICAgICAgICAgdGhpcy54elRleHQxLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5iaWc7XHJcbiAgICAgICAgICAgIHRoaXMuY29pbiA9IHRoaXMuY29pbiAtIHRoaXMuY2hpcDtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5mYXRoZXIxO1xyXG4gICAgICAgICAgICB2YXIgc3AgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY204O1xyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuc2VuZChcIkNNRD1VU0VSQkVUJlVTRVJOQU1FPVwiICsgY2ZnLnVzZXJuYW1lICsgXCImQklHPVwiICsgdGhpcy5jaGlwICsgXCImU01BTEw9MFwiKTtcclxuICAgICAgICAgICAgdGhpcy5jaGlwID0gdGhpcy5jb2luO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+aZrumAmlxyXG4gICAgICAgICAgICBpZih0aGlzLmNvaW4gPCB0aGlzLmNoaXAgfHwgdGhpcy5jaGlwID4gcGFyc2VJbnQodGhpcy5jdGV4dC5zdHJpbmcpKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi562556CB5LiN6LazXCIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMueHpUZXh0MS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWcgPSB0aGlzLmJpZyArIHRoaXMuY2hpcDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnh6VGV4dDEuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmJpZztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29pbiA9IHRoaXMuY29pbiAtIHRoaXMuY2hpcDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5mYXRoZXIxO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCh0aGlzLmNoaXApe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY200O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY201O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1MDAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY202O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoXCJDTUQ9VVNFUkJFVCZVU0VSTkFNRT1cIiArIGNmZy51c2VybmFtZSArIFwiJkJJRz1cIiArIHRoaXMuY2hpcCArIFwiJlNNQUxMPTBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc21hbGxPbmNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/lv6vljotcclxuICAgICAgICBpZih0aGlzLmNoaXAgPT0gdGhpcy5jb2luICYmIHRoaXMuY29pbiA+IDApe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaXAgPiBwYXJzZUludCh0aGlzLmR0ZXh0LnN0cmluZykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlwID0gcGFyc2VJbnQodGhpcy5kdGV4dC5zdHJpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMueHpUZXh0Mi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNtYWxsID0gdGhpcy5zbWFsbCArIHRoaXMuY2hpcDtcclxuICAgICAgICAgICAgdGhpcy54elRleHQyLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5zbWFsbDtcclxuICAgICAgICAgICAgdGhpcy5jb2luID0gdGhpcy5jb2luIC0gdGhpcy5jaGlwO1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmZhdGhlcjI7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTg7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgIHZhciBjZmcgPSByZXF1aXJlKFwiY2ZnXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5zZW5kKFwiQ01EPVVTRVJCRVQmVVNFUk5BTUU9XCIgKyBjZmcudXNlcm5hbWUgKyBcIiZCSUc9MFwiICsgXCImU01BTEw9XCIgKyB0aGlzLmNoaXApO1xyXG4gICAgICAgICAgICB0aGlzLmNoaXAgPSB0aGlzLmNvaW47XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5pmu6YCaXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29pbiA8IHRoaXMuY2hpcCB8fCB0aGlzLmNoaXAgPiBwYXJzZUludCh0aGlzLmR0ZXh0LnN0cmluZykpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnrbnnoIHkuI3otrNcIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy54elRleHQyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNtYWxsID0gdGhpcy5zbWFsbCArIHRoaXMuY2hpcDtcclxuICAgICAgICAgICAgICAgIHRoaXMueHpUZXh0Mi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuc21hbGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW4gPSB0aGlzLmNvaW4gLSB0aGlzLmNoaXA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5mYXRoZXIyO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCh0aGlzLmNoaXApe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdGhpcy5jbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtMztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY200O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY201O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1MDAwMDpcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY202O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNtNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoXCJDTUQ9VVNFUkJFVCZVU0VSTkFNRT1cIiArIGNmZy51c2VybmFtZSArIFwiJkJJRz0wXCIgKyBcIiZTTUFMTD1cIiArIHRoaXMuY2hpcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5blnIblvaLljLrln5/nmoTpmo/mnLrlnZDmoIdcclxuICAgIGdldFJhbmRvbVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY2MucChjYy5yYW5kb21NaW51czFUbzEoKSAqIHRoaXMucmFuZG9tUmFuZ2UueCArIHRoaXMucHgsIGNjLnJhbmRvbU1pbnVzMVRvMSgpICogdGhpcy5yYW5kb21SYW5nZS55ICsgdGhpcy5weSk7XHJcbiAgICB9LFxyXG4gICAgLy/njJzlpKflsI/pgLvovpFcclxuICAgIGd1ZXNzQk9TOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmd1ZXNzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCA9PSAxKVxyXG5cclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLndhaXRNdXNpYywgZmFsc2UsIDEpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgY2ZnID0gcmVxdWlyZShcImNmZ1wiKTtcclxuICAgICAgICB2YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG4gICAgICAgIHNlbGYuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZWxmLnN6ZGgxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLnN6ZGgyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLnN6ZGgzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5hKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6MS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0MS5zdHJpbmcgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6Mi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0MS5zdHJpbmcgPSBcIjJcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6My5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0MS5zdHJpbmcgPSBcIjNcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6NC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0MS5zdHJpbmcgPSBcIjRcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6NS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0MS5zdHJpbmcgPSBcIjVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6Ni5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0MS5zdHJpbmcgPSBcIjZcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5iKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6Ny5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0Mi5zdHJpbmcgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6OC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0Mi5zdHJpbmcgPSBcIjJcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6OS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0Mi5zdHJpbmcgPSBcIjNcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6MTAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6VGV4dDIuc3RyaW5nID0gXCI0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zejExLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zelRleHQyLnN0cmluZyA9IFwiNVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3oxMi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0Mi5zdHJpbmcgPSBcIjZcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5jKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6MTMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6VGV4dDMuc3RyaW5nID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zejE0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zelRleHQzLnN0cmluZyA9IFwiMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3oxNS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0My5zdHJpbmcgPSBcIjNcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6MTYuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN6VGV4dDMuc3RyaW5nID0gXCI0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zejE3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zelRleHQzLnN0cmluZyA9IFwiNVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3oxOC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3pUZXh0My5zdHJpbmcgPSBcIjZcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnpobmFtZSA9PSBjZmcudXNlcm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hID09IHRoaXMuYiAmJiB0aGlzLmIgPT0gdGhpcy5jKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIuacrOWxgOe7k+aenCAg6LG55a2QXCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZigodGhpcy5hK3RoaXMuYit0aGlzLmMpIDw9IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIuacrOWxgOe7k+aenCAg5bCPXCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIuacrOWxgOe7k+aenCAg5aSnXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlc3VsdHplbmQgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWVzcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56d0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuendpbkNvaW4uc3RyaW5nID0gdGhpcy56aHVhbmcudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56d2luQ29pbjIuc3RyaW5nID0gdGhpcy5yZXN1bHR6ZW5kLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWVzcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56bEJHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuemxvc2VDb2luLnN0cmluZyA9IHRoaXMuemh1YW5nLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuemxvc2VDb2luMi5zdHJpbmcgPSB0aGlzLnJlc3VsdHplbmQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmEgPT0gdGhpcy5iICYmIHRoaXMuYiA9PSB0aGlzLmMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0LnN0cmluZyA9IFwi5pys5bGA57uT5p6cICDosbnlrZBcIjtcclxuICAgICAgICAgICAgICAgICAgICBjZmcuY29pbiA9IHRoaXMuY29pbjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCh0aGlzLmErdGhpcy5iK3RoaXMuYykgPD0gMTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIuacrOWxgOe7k+aenCAg5bCPXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5jb2luID0gdGhpcy5jb2luO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIuacrOWxgOe7k+aenCAg5aSnXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5jb2luID0gdGhpcy5jb2luO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Vlc3MuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNCRy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheWVySW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnJlc3VsdE11c2ljLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iQ29pbi5zdHJpbmcgPSB0aGlzLnJlc3VsdGJ0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zQ29pbi5zdHJpbmcgPSB0aGlzLnJlc3VsdHN0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yZXN1bHRiID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmdDb2luLnN0cmluZyA9IFwi6LWi5b6XXCIgKyB0aGlzLnJlc3VsdGIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZ0NvaW4uc3RyaW5nID0gXCLmjZ/lpLFcIiArIHRoaXMucmVzdWx0YnQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yZXN1bHRzID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2dDb2luLnN0cmluZyA9IFwi6LWi5b6XXCIgKyB0aGlzLnJlc3VsdHMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZ0NvaW4uc3RyaW5nID0gXCLmjZ/lpLFcIiArIHRoaXMucmVzdWx0c3QudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2luID0gdGhpcy5jb2luICsgdGhpcy5yZXN1bHRidCArIHRoaXMucmVzdWx0c3QgKyB0aGlzLnJlc3VsdGIgKyB0aGlzLnJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfSxcclxuICAgIC8v5oqi5bqEXHJcbiAgICBnb09uY2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZ29CZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGJ0bjIwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnpodWFuZyA9IDIwMDAwMDtcclxuICAgIH0sXHJcbiAgICBidG41MDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy56aHVhbmcgPSA1MDAwMDA7XHJcbiAgICB9LFxyXG4gICAgYnRuMTAwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnpodWFuZyA9IDEwMDAwMDA7XHJcbiAgICB9LFxyXG4gICAgYnRuMTUwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnpodWFuZyA9IDE1MDAwMDA7XHJcbiAgICB9LFxyXG4gICAgYnRuMjAwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnpodWFuZyA9IDIwMDAwMDA7XHJcbiAgICB9LFxyXG4gICAgZ29DbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5nb0JnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIHFpYW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNmZyA9IHJlcXVpcmUoXCJjZmdcIik7XHJcbiAgICAgICAgdmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuICAgICAgICAvL+aKouW6hFxyXG4gICAgICAgIGlmKHRoaXMuY29pbiA8IHRoaXMuemh1YW5nKXtcclxuICAgICAgICAgICAgdGhpcy5nb0J0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nb0J0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi50cCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoXCJDTUQ9Q0FUQ0hCQU5LRVImVVNFUk5BTUU9XCIgKyBjZmcudXNlcm5hbWUgKyBcIiZDT0lOPVwiICsgY2ZnLnpodWFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5b6A5pyf6K6w5b2VXHJcbiAgICBwYXN0QnRuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wYXN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIGEgPSBbXTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNmZyA9IHJlcXVpcmUoXCJjZmdcIik7XHJcbiAgICB9LFxyXG4gICAgLy/lhbPpl63lvoDmnJ9cclxuICAgIGNsb3NlUGFzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucGFzdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL+i1oOmAgVxyXG4gICAgZ2lmdEJ0bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2lmdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGdpZnRTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjZmcgPSByZXF1aXJlKFwiY2ZnXCIpO1xyXG4gICAgICAgIHZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbiAgICAgICAgdmFyIGdpdmVjb2luID0gZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgc2VsZi5ub3RpZnlEb3duLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmKHJldC5zdGF0ZSA9PSBcIm9rXCIpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jb2luID0gc2VsZi5jb2luIC0gc2VsZi5naWZ0Q29pbi5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm5vdGlmeVRleHQuc3RyaW5nID0gXCLotaDpgIHmiJDlip8hXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub3RpZnlUZXh0LnN0cmluZyA9IFwi6LWg6YCB5aSx6LSl77yBXFxu6K+356Gu6K6k6L6T5YWl55qE6YeR6aKd5oiW6ICFSUTmmK/lkKbmraPnoa5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubm90aWZ5RG93bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIHNlbGYuZ2lmdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGh0dHAuY3JlYXRlWE1MSHR0cFJlcXVlc3QoY2ZnLndlYlVybCArIFwiZ2l2ZWNvaW4/bXlpZD1cIiArIGNmZy51c2VyaWQgKyBcIiZ5b3VuYW1lPVwiICsgdGhpcy5naWZ0VXNlaWQuc3RyaW5nICsgXCImY29pbj1cIiArIHRoaXMuZ2lmdENvaW4uc3RyaW5nLGdpdmVjb2luKTtcclxuICAgIH0sXHJcbiAgICBjbG9zZUdpZnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdpZnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/or6bmg4VcclxuICAgIGRldGFpbHNCdG46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmRldGFpbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGNsb3NlRGV0YWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5kZXRhaWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/mjpLooYzmppxcclxuICAgIHJhbmtCdG46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJhbmsuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGNsb3NlUmFuazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmFuay5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICB0aGlzLml0ZW0gPSByZXQ7XHJcbiAgICAgICAgbGV0IGl0ZW1TbG90ID0gdGhpcy5hZGRJdGVtU2xvdChyZXQuTklDS05BTUUscmV0LkJJRyxyZXQuU01BTEwpO1xyXG4gICAgICAgIHRoaXMuaXRlbVNsb3RzLnB1c2goaXRlbVNsb3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRJdGVtU2xvdDogZnVuY3Rpb24gKGEsYixjKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1TbG90ID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJlZmViKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5hZGRDaGlsZChpdGVtU2xvdCk7XHJcbiAgICAgICAgaXRlbVNsb3QuZ2V0Q29tcG9uZW50KCd4ekl0ZW0nKS51cGRhdGVJdGVtKGEsIGIsIGMpO1xyXG4gICAgICAgIHJldHVybiBpdGVtU2xvdDtcclxuICAgIH0sXHJcblxyXG4gICAgcXVpdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGlucyA9IHJlcXVpcmUoXCJ5YWRheGlhb05ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICBpbnMuTGFuZGxvcmRzU29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICB9LFxyXG59KTtcclxuIl19