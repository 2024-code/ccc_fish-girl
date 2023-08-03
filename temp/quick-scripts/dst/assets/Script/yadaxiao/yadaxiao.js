
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/yadaxiao/yadaxiao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd22b7aR8zxCnZmUe3yGIdDI', 'yadaxiao');
// Script/yadaxiao/yadaxiao.js

"use strict";

window.yadaxiao_global = {};
cc.Class({
  "extends": cc.Component,
  properties: {
    poker_arr: [cc.Node],
    chip_box: cc.Node,
    bet_text: cc.Node,
    bet_text_qiang: cc.Node,
    player_node: [cc.Node],
    helpNode: cc.Node,
    onlineNode: cc.Node,
    recordNode: cc.Node,
    animeNode_pk: cc.Node,
    animeNode_start: cc.Node,
    animeNode_end: cc.Node,
    chips_node: cc.Node,
    cardspframe: [cc.SpriteFrame],
    headspframe: [cc.SpriteFrame],
    resultspframe: [cc.SpriteFrame],
    resultspframe0: [cc.SpriteFrame],
    pointspframe: [cc.SpriteFrame],
    chip_prefab: [cc.Prefab],
    m_iCurrentSelBet: -1,
    m_iGameOverTime: -1,
    m_lPoolNum: [],
    m_iSelTar: -1,
    // userInfo_list:[],
    // farseer:{},
    table_userinfo: [],
    m_iQiangNum: 100000,
    m_iFastNum: 1,
    detailNode: cc.Node,
    settinggoldNode: cc.Node,
    settingfastNode: cc.Node,
    qiangNode: cc.Node,
    recordContent: cc.Node,
    recordPrefab: cc.Prefab
  },
  // LIFE-CYCLE CALLBACKS:
  serializeUsers: function serializeUsers(user_object) {
    //0自己 1神算 2首富 3-6其他
    //bet_score
    //score
    //user_id
    //user_name
    //user_url
    //win_num
    // this.farseer = user_object.shen_suan_zi;
    // this.userInfo_list = user_object.ranking_list;
    if (this.table_userinfo.length == 0) {
      var playerInfo = require("PlayerInfo").getInstant;

      var playerInfoEx = window.yadaxiao_sc;
      var info_0 = {
        score: playerInfoEx.score,
        user_id: playerInfoEx.id,
        user_name: playerInfoEx.nickname,
        user_url: playerInfoEx.headimgurl
      };
      this.table_userinfo.push(info_0);
    } else {
      this.table_userinfo.splice(1, this.table_userinfo.length - 1);
    } // if (JSON.stringify(user_object.shen_suan_zi) != "{}")
    // {
    //     this.table_userinfo.push(user_object.shen_suan_zi);
    // }else
    // {
    //     var info_x = {
    //         score: "",
    //         user_id: -1,
    //         user_name: "空缺",
    //         user_url: -1};
    //     this.table_userinfo.push(info_x);
    // }
    // for (var i in user_object.ranking_list)
    // {
    //     var info = user_object.ranking_list[i];
    //     if (info.user_id == this.table_userinfo[1].user_id && parseInt(i)!=0)
    //         continue;
    //     if (info.user_id == this.table_userinfo[0].user_id && parseInt(i)!=0)
    //         continue;
    //     this.table_userinfo.push(info);
    //     if (this.table_userinfo.length>=7)
    //         break;
    // }
    // for (var i = this.table_userinfo.length; i<7 ;i++)
    // {
    //     var info_x = {
    //         score: "",
    //         user_id: -1,
    //         user_name: "空缺",
    //         user_url: -1};
    //     this.table_userinfo.push(info_x);
    // }


    this.setPlayerView();
  },
  onLoad: function onLoad() {
    this.chip_name = {
      100: "chip_1",
      1000: "chip_10",
      5000: "chip_50",
      10000: "chip_100",
      50000: "chip_500",
      100000: "chip_1000"
    };
    this.chip_nums = [100, 1000, 5000, 10000, 50000, 100000];
    cc.debug.setDisplayStats(false);
    window.yadaxiao_ins = this;

    var playerInfo = require("PlayerInfo").getInstant;

    var playerInfoEx = window.yadaxiao_sc;
    this.playerId = playerInfoEx.id;
    this.player_score = playerInfoEx.score;
    this.player_name = playerInfo.playerName;
    this.playerHead = playerInfo.playerHead;
    this.playerHeadId = playerInfo.playerHeadId;
    this.m_lPoolNum = [0, 0, 0];
    this.serializeUsers(window.yadaxiao_global.userInfo_list);
    this.poker_pos = [];

    for (var i in this.poker_arr) {
      this.poker_pos[i] = this.poker_arr[i].position;
      this.poker_pos[i].opacity = 0;
    }

    this.resetparam();
    this.network = require('yadaxiaoNetWork').getInstant;
    this.bet_text.active = false;
    this.bet_text_qiang.active = false;
    this.network.LandlordsSocket.emit('getGameType', '');
    this.network.LandlordsSocket.emit("getGameRecordList", "");
  },
  start: function start() {
    playBGM('bg');
  },
  init_record: function init_record(result) {
    var arr = this.node.getChildByName("ld_bg").children;

    for (var i in arr) {
      arr[i].getChildByName('jg_he').active = false;
      arr[i].getChildByName('jg_da').active = false;
    }

    for (var i = result.length - 1; i >= 0; i--) {
      var res = result[i].win;
      var num = arr.length - 1 - (result.length - 1 - parseInt(i));
      if (num < 0) break;
      var node = arr[num].getChildByName('jg_da');
      node.active = true;
      node.getComponent(cc.Sprite).spriteFrame = this.resultspframe[res];
      var node0 = arr[num].getChildByName('jg_he');
      node0.active = true;

      if (result[i].zhuangscore > 0) {
        node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[0];
      } else if (result[i].zhuangscore < 0) {
        node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[1];
      } else {
        node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[2];
      }
    }

    this.init_record2(result);
  },
  to_double: function to_double(num) {
    if (num < 10) return '0' + num;
    return num;
  },
  init_record2: function init_record2(result) {
    this.recordContent.removeAllChildren();

    for (var i = result.length - 1; i >= 0; i--) {
      var res = result[i].win;
      var open = result[i].open_time;
      var node = cc.instantiate(this.recordPrefab);
      node.parent = this.recordContent;
      var res_ = '';
      var date = new Date(open);
      res_ = date.getFullYear() + '/' + this.to_double(date.getMonth() + 1) + "/" + this.to_double(date.getDate()) + ' ' + this.to_double(date.getHours()) + ":" + this.to_double(date.getMinutes()) + ":" + this.to_double(date.getSeconds());
      node.getChildByName('txt').getComponent(cc.Label).string = res_; //new Date(open).toLocaleString();

      node.getChildByName('bao').active = false;
      node.getChildByName('da').active = false;
      node.getChildByName('xiao').active = false;

      if (res == 0) {
        node.getChildByName('bao').active = true;
      } else if (res == 1) {
        node.getChildByName('da').active = true;
      } else if (res == 2) {
        node.getChildByName('xiao').active = true;
      }
    }
  },
  init_stat: function init_stat(result) {
    if (result.game_type == 1) {
      // if (result.bet_time == 30)
      // {
      //     this.betBegin();
      // }else
      {
        this.bet_text.active = true;
        this.m_iGameOverTime = Date.now() / 1000 + result.bet_time;
      }
      this.node.getChildByName("当前状态文本").active = false;
    } else {//this.node.getChildByName("当前状态文本").active = true;
      // for (var i in this.poker_arr)
      // {
      //     this.poker_arr[i].opacity = 0;
      // }
    }

    if (result.game_type == 4) {
      this.qiangNode.active = true;
      this.bet_text_qiang.active = true;
      this.m_iGameOverTime = Date.now() / 1000 + result.qiang_time;
    } else {
      this.qiangNode.active = false;
    }

    for (var i in result.bet_list) {
      this.m_lPoolNum[result.bet_list[i].bet_res] += result.bet_list[i].bet_gold;
    }

    this.setPoolView();
  },
  setPoolView: function setPoolView() {
    // for (var i =0;i<3;i++)
    // {
    //     this.node.getChildByName("main").getChildByName("chip_bg_"+i).getChildByName("pool").getComponent(cc.Label).string = this.m_lPoolNum[i];    
    // }
    this.node.getChildByName('g_bg').getChildByName('已下注文1').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[1]);
    this.node.getChildByName('g_bg2').getChildByName('已下注文1').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[2]);
  },
  update: function update(dt) {
    if (this.m_iGameOverTime && this.bet_text.active) {
      var t = parseInt(this.m_iGameOverTime - Date.now() / 1000);

      if (t <= 5 && t + "" != this.bet_text.getChildByName('New Label').getComponent(cc.Label).string) {
        playEffect('countdown');

        if (t == 0) {
          playEffect('stop_s');
        }
      }

      if (t <= 0) {
        this.bet_text.active = false;
        return;
      }

      this.bet_text.getChildByName('New Label').getComponent(cc.Label).string = t; //this.bet_text_down.getChildByName('New Label').getComponent(cc.Label).string = t;
    }

    if (this.m_iGameOverTime && this.bet_text_qiang.active) {
      var t = parseInt(this.m_iGameOverTime - Date.now() / 1000);

      if (t <= 0) {
        this.bet_text_qiang.active = false;
        return;
      }

      this.bet_text_qiang.getChildByName('New Label').getComponent(cc.Label).string = t; //this.bet_text_down.getChildByName('New Label').getComponent(cc.Label).string = t;
    }
  },
  resetparam: function resetparam() {
    this.m_iCurrentSelBet = -1;
    this.setBetView();
    this.setPlayerView();
  },
  bet: function bet(num, point) {
    this.lastTouchPoint = point;

    if (this.m_iCurrentSelBet == -1) {
      return;
    }

    var str = JSON.stringify({
      //bet_type: 1,
      bet_res: parseInt(num),
      bet_gold: this.m_iCurrentSelBet
    });
    this.network.LandlordsSocket.emit('lottery', str);
    this.setBetView();
  },
  selbet: function selbet(para) {
    if (para == "all") {
      if (this.m_iSelTar < 0) {
        this.showHint('请先选择一次大小');
        return;
      } else {
        this.lastTouchPoint = cc.v2(0, 0);
        var str = JSON.stringify({
          //bet_type: 1,
          bet_res: this.m_iSelTar,
          bet_gold: this.m_iFastNum * 100
        });
        this.network.LandlordsSocket.emit('lottery', str);
      }
    }

    var num = parseInt(para);

    if (this.m_iCurrentSelBet == num) {
      this.m_iCurrentSelBet = -1;
    } else {
      if (this.table_userinfo[0].score < num) {
        return;
      }

      playEffect('chip');
      this.m_iCurrentSelBet = num;
    }

    this.setBetView();
  },
  setBetView: function setBetView() {
    if (this.m_iCurrentSelBet > this.table_userinfo[0].score) {
      this.m_iCurrentSelBet = -1;
    }

    var betarray = this.chip_box.children;

    for (var i in betarray) {
      var node = betarray[i];

      if (this.chip_nums[i] <= this.table_userinfo[0].score) {
        node.opacity = 255;
      } else {
        node.opacity = 128;
      }

      if (this.chip_nums[i] == this.m_iCurrentSelBet) {
        node.getChildByName('Background').getChildByName('checkmark').active = true;
      } else {
        node.getChildByName('Background').getChildByName('checkmark').active = false;
      }
    }
  },
  setPlayerView: function setPlayerView() {
    this.node.getChildByName('ui').getChildByName("head").getChildByName("金币icon").getChildByName("金币数").getComponent(cc.Label).string = Helper.fixNum(this.table_userinfo[0].score);
    this.node.getChildByName('ui').getChildByName("head").getChildByName("玩家名").getComponent(cc.Label).string = this.table_userinfo[0].user_name;
    this.node.getChildByName('ui').getChildByName("head").getChildByName("ID").getComponent(cc.Label).string = "ID:" + this.table_userinfo[0].user_id;
    setHeadTexture(this.node.getChildByName('ui').getChildByName('head'), this.table_userinfo[0].user_url); // for (var i in this.player_node)
    // {
    //     var tag = parseInt(i);
    //     var info;
    //     if (tag >= this.table_userinfo.length)
    //     {
    //         info = {};
    //     }else{
    //         info = this.table_userinfo[tag];
    //     }
    //     this.player_node[tag].getChildByName("New Label").getComponent(cc.Label).string = info.user_name;
    //     if (this.player_node[tag].getChildByName("pl_gold_bar"))
    //         this.player_node[tag].getChildByName("pl_gold_bar").getChildByName("New Label").getComponent(cc.Label).string = info.score;
    //     var head = info.user_url;
    //     var headnode = this.player_node[tag];
    //     if (head < 0)
    //     {
    //         head = 0;
    //     }    
    //     if (headnode.getChildByName("pl_face"))
    //     {
    //         headnode = headnode.getChildByName("pl_face");
    //     }
    //     headnode.getComponent(cc.Sprite).spriteFrame = this.headspframe[head];
    // }
  },
  showCount: function showCount(score) {
    var node = this.node.getChildByName("结果");
    node.active = true;
    var label_0 = node.getChildByName("label_0").getComponent(cc.Label);

    if (score > 0) {
      label_0.string = "您赢得了 " + Helper.fixNum(score);
    } else if (score < 0) {
      label_0.string = "您输掉了 " + Helper.fixNum(-1 * score);
    } else {
      label_0.string = "您没有输赢";
    }

    var label_1 = node.getChildByName("label_1").getComponent(cc.Label);
    label_1.string = "当前 " + Helper.fixNum(this.table_userinfo[0].score);
  },
  showResult: function showResult(ret) {
    var instance = this; //012 龙虎和 1234 黑红花片
    //var sam = {hu_card:2307,long_card:258,ResultCode:1,win:1};

    this.table_userinfo[0].score += ret.user_win;
    var score_change = this.table_userinfo[0].score - this.player_score;
    this.scheduleOnce(function () {
      this.showCount(score_change);
    }, 4.0);
    this.player_score = this.table_userinfo[0].score;
    var per_time = 0.6;
    var needtime = 1.5;
    var bases_node = this.node.getChildByName('骰子框UI');
    bases_node.active = true;

    for (var i = 0; i < 3; i++) {
      for (var j in bases_node.children[i].children) {
        var n = bases_node.children[i].children[j];

        if (n.name == "label") {
          n.getComponent(cc.Label).string = "";
        } else if (isNaN(n.name)) {
          n.active = true;
        } else {
          n.active = false;
        }
      }
    } //ret.win_res[0];
    //ret.win;


    this.node.getChildByName('骰子框UI').getChildByName('结果').getComponent(cc.Label).string = "本局结果  ?";
    this.scheduleOnce(function () {
      playEffect('dice');
      this.node.getChildByName('骰子框UI').getChildByName('1号位').getChildByName('筛子动画').active = false;
      this.node.getChildByName('骰子框UI').getChildByName('1号位').getChildByName(ret.win_res[0] + '').active = true;
      this.node.getChildByName('骰子框UI').getChildByName('1号位').getChildByName('label').getComponent(cc.Label).string = ret.win_res[0];
    }, 0.6);
    this.scheduleOnce(function () {
      this.node.getChildByName('骰子框UI').getChildByName('2号位').getChildByName('筛子动画').active = false;
      this.node.getChildByName('骰子框UI').getChildByName('2号位').getChildByName(ret.win_res[1] + '').active = true;
      this.node.getChildByName('骰子框UI').getChildByName('2号位').getChildByName('label').getComponent(cc.Label).string = ret.win_res[1];
    }, 1.2);
    this.scheduleOnce(function () {
      this.node.getChildByName('骰子框UI').getChildByName('3号位').getChildByName('筛子动画').active = false;
      this.node.getChildByName('骰子框UI').getChildByName('3号位').getChildByName(ret.win_res[2] + '').active = true;
      this.node.getChildByName('骰子框UI').getChildByName('3号位').getChildByName('label').getComponent(cc.Label).string = ret.win_res[2];
      var nnn = "";

      if (ret.win == 0) {
        nnn = "豹";
      }

      if (ret.win == 1) {
        nnn = "大";
      }

      if (ret.win == 2) {
        nnn = "小";
      }

      this.node.getChildByName('骰子框UI').getChildByName('结果').getComponent(cc.Label).string = "本局结果  " + nnn;
    }, 1.8);
    this.scheduleOnce(function () {
      var arr = this.chips_node.children;

      for (var i in arr) {
        var chip_node = arr[i];

        if (chip_node.on_pool == ret.win) {
          var inited = false;
          var endpos;

          if (chip_node.owner == this.playerId) {
            inited = true;
            endpos = cc.v2(693, 61);
          }

          if (inited) {
            chip_node.runAction(cc.sequence(cc.moveTo(0.25, endpos), cc.removeSelf()));
          } else {
            chip_node.runAction(cc.sequence(cc.fadeOut(0.25), cc.removeSelf()));
          }
        } else {
          chip_node.runAction(cc.sequence(cc.fadeOut(0.2), cc.removeSelf()));
        }
      }
    }, needtime + 1.0);
    this.scheduleOnce(function (dt) {
      this.setPlayerView(0);

      if (ret.user_win > 0) {
        playEffect('ADD_SCORE');
      }

      this.network.LandlordsSocket.emit("getGameRecordList", "");
    }, needtime + 1.2);
    this.scheduleOnce(function (dt) {
      this.node.getChildByName('骰子框UI').active = false;
      instance.setPokerVisible(false); //instance.node.getChildByName("当前状态文本").active = true;

      instance.m_lPoolNum = [0, 0, 0];
      instance.setPoolView();
    }, needtime + 1.6);
  },
  onBet: function onBet(info) {
    // info.bet_res;
    // info.bet_gold;
    // info.userId;
    playEffect('choumaxiazhu');
    this.m_lPoolNum[info.bet_res] += info.bet_gold;
    this.setPoolView();
    var chip_startpos;
    var chip_endpos;
    var inited = false;
    var endnode;

    if (info.bet_res == 1) {
      endnode = this.node.getChildByName('桌子').getChildByName('大');
    } else if (info.bet_res == 2) {
      endnode = this.node.getChildByName('桌子').getChildByName('小');
    }

    var ownerTag = -1;

    for (var i in this.table_userinfo) {
      if (this.table_userinfo[i].user_id + "" == info.userId + "") {
        ownerTag = parseInt(i);
        break;
      }
    }

    for (var i in this.table_userinfo) {
      if (this.table_userinfo[i].user_id + "" == info.userId + "") {
        this.table_userinfo[i].score -= info.bet_gold;
      }
    }

    this.setPlayerView();

    if (ownerTag == 0) {
      //this.player_score -= info.bet_gold;
      inited = true;
      var index = 0;

      for (var i = this.chip_nums.length - 1; i >= 0; i--) {
        if (this.chip_nums[i] <= info.bet_gold) {
          index = i;
          break;
        }
      }

      chip_startpos = this.chip_box.getChildByName(this.chip_name[this.chip_nums[index]]).convertToWorldSpaceAR(cc.v2(0, 0)); //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));

      var endpos_min = endnode.getChildByName('min').convertToWorldSpace(cc.v2(0, 0));
      var endpos_max = endnode.getChildByName('max').convertToWorldSpace(cc.v2(0, 0));

      if (this.lastTouchPoint.x >= endpos_min.x && this.lastTouchPoint.y >= endpos_min.y && this.lastTouchPoint.x <= endpos_max.x && this.lastTouchPoint.y <= endpos_max.y) {
        var endx = this.lastTouchPoint.x + Math.floor(Math.random() * 60) - 30;
        var endy = this.lastTouchPoint.y + Math.floor(Math.random() * 60) - 30;
      } else {
        var endx = Math.floor(Math.random() * (endpos_max.x - endpos_min.x)) + endpos_min.x;
        var endy = Math.floor(Math.random() * (endpos_max.y - endpos_min.y)) + endpos_min.y;
      }

      chip_endpos = cc.v2(endx, endy);
    } // else if (ownerTag!= -1)
    // {
    // }
    else {
        inited = true; //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));

        var endpos_min = endnode.getChildByName('min').convertToWorldSpaceAR(cc.v2(0, 0));
        var endpos_max = endnode.getChildByName('max').convertToWorldSpaceAR(cc.v2(0, 0));
        var endx = Math.floor(Math.random() * (endpos_max.x - endpos_min.x)) + endpos_min.x;
        var endy = Math.floor(Math.random() * (endpos_max.y - endpos_min.y)) + endpos_min.y;
        chip_endpos = cc.v2(endx, endy);
        chip_startpos = chip_endpos;
      }

    if (inited) {
      var index = 0;

      for (var i = this.chip_nums.length - 1; i >= 0; i--) {
        if (this.chip_nums[i] <= info.bet_gold) {
          index = i;
          break;
        }
      } //this.chip_nums.indexOf(info.bet_gold)


      var chip_node = cc.instantiate(this.chip_prefab[index]);
      chip_node.x = chip_startpos.x;
      chip_node.y = chip_startpos.y;
      chip_node.scale = 0.4;
      chip_node.parent = this.chips_node;
      chip_node.runAction(cc.moveTo(0.25, chip_endpos.x, chip_endpos.y));
      chip_node.owner = info.userId;
      chip_node.on_pool = info.bet_res;
    }
  },
  betBegin: function betBegin() {
    //this.network.LandlordsSocket.emit("getGameRankingList","");
    this.betBegin_r();
  },
  betBegin_r: function betBegin_r() {
    var node = this.node.getChildByName("结果");
    node.active = false;
    playEffect('start_s');
    this.m_lPoolNum = [0, 0, 0];
    this.setPoolView();
    this.qiangNode.active = false;
    this.node.getChildByName("当前状态文本").active = false;
    this.m_iGameOverTime = Date.now() / 1000 + 30;
    var instance = this; //var ske = this.node.getChildByName('lhdpk');
    // ske.getComponent(sp.Skeleton).setCompleteListener(function () {
    //     ske.active = false;

    instance.setPokerVisible(true); // var start = instance.node.getChildByName('anim_start');
    // start.getComponent(sp.Skeleton).setCompleteListener(function () {

    var start = instance.node.getChildByName('startBetting');
    start.active = true;
    this.scheduleOnce(function (dt) {
      start.active = false;
      instance.bet_text.active = true;
    }, 1.0); // });
    // start.active = true;
    // });
    // ske.active = true;
  },
  setPokerSp: function setPokerSp(tag, num) {
    var node = this.poker_arr[tag];

    if (num < 0) {
      node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[52];
    } else {
      var a1 = parseInt(num / 16) / 16;
      var b1 = num % 16;
      var i = (b1 - 1) * 13 + (a1 - 1);
      node.runAction(cc.sequence(cc.scaleTo(0.25, 1.2, 1.2), cc.scaleTo(0.25, 0, 1.2)));
      this.scheduleOnce(function () {
        node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[i];
        node.runAction(cc.sequence(cc.scaleTo(0.25, 1.2, 1.2), cc.scaleTo(0.25, 1, 1)));
      }, 0.5);
    }
  },
  setPokerVisible: function setPokerVisible(flag) {
    var _this = this;

    return;
    var t = 0.15;

    if (!flag) {
      var _loop = function _loop() {
        var i = j;

        _this.poker_arr[i].runAction(cc.spawn(cc.moveTo(t, cc.v2(_this.poker_pos[i].x, _this.poker_pos[i].y + 120)), cc.fadeOut(t)));

        _this.scheduleOnce(function (dt) {
          this.poker_arr[i].position = this.poker_pos[i];
          this.setPokerSp(i, -1);
        }, t + 0.1);
      };

      // this.poker_0.runAction(cc.spawn(cc.moveTo(t,cc.v2(-88-60,258+120)),cc.fadeOut(t)));
      // this.scheduleOnce(function (dt) {
      //     //this.setPokerSp(0,-1);
      //     this.poker_0.x = -88;
      //     this.poker_0.y = 258;
      //     this.poker_0.opacity = 0;
      // },t+0.8);
      // this.poker_1.runAction(cc.spawn(cc.moveTo(t,cc.v2(84-60,258+120)),cc.fadeOut(t)));
      // this.scheduleOnce(function (dt) {
      //     //this.setPokerSp(0,-1);
      //     this.poker_1.x = 84;
      //     this.poker_1.y = 258;
      //     this.poker_1.opacity = 0;
      // },t+0.8);
      for (var j = 0; j < 6; j++) {
        _loop();
      }
    } else {
      var _loop2 = function _loop2() {
        var i = j;
        _this.poker_arr[i].opacity = 0;

        _this.scheduleOnce(function () {
          playEffect('SEND_CARD');
          this.setPokerSp(i, -1);
          this.poker_arr[i].opacity = 0;
          this.poker_arr[i].position = this.poker_pos[i];
          this.poker_arr[i].y += 120;

          if (i % 2 == 0) {
            this.poker_arr[i].x += 60;
          } else {
            this.poker_arr[i].x -= 60;
          }

          this.poker_arr[i].runAction(cc.spawn(cc.moveTo(t, this.poker_pos[i]), cc.fadeIn(t)));
        }, j * t);
      };

      // playEffect('SEND_CARD');
      // this.setPokerSp(0,-1);
      // this.poker_0.opacity = 0;
      // this.poker_0.x = -88+60;
      // this.poker_0.y = 258+120;
      // this.poker_0.runAction(cc.spawn(cc.moveTo(t,cc.v2(-88,258)),cc.fadeIn(t)));
      // this.scheduleOnce(function(){
      //     playEffect('SEND_CARD');
      //     this.setPokerSp(1,-1);
      //     this.poker_1.opacity = 0;
      //     this.poker_1.x = 84 - 60;
      //     this.poker_1.y = 258 + 120;
      //     this.poker_1.runAction(cc.spawn(cc.moveTo(t,cc.v2(84,258)),cc.fadeIn(t)));        
      // },t);
      for (var j = 0; j < 4; j++) {
        _loop2();
      }

      this.poker_arr[4].opacity = 0;
      this.poker_arr[5].opacity = 0;
    }
  },
  qiangzhuang: function qiangzhuang() {
    this.network.LandlordsSocket.emit('qiangZhuang', '');
  },
  setQiangGoldView: function setQiangGoldView() {
    this.settinggoldNode.active = true;
    cc.find('Canvas/抢庄UI/输入').getComponent(cc.EditBox).string = this.m_iQiangNum;
  },
  setFastGoldView: function setFastGoldView() {
    this.settingfastNode.active = true;
    cc.find('Canvas/快压设置/输入').getComponent(cc.EditBox).string = this.m_iFastNum;
  },
  showHint: function showHint(str) {
    var node = this.node.getChildByName('hint');
    node.active = true;
    node.stopAllActions();
    node.opacity = 0;
    node.getChildByName("label").getComponent(cc.Label).string = str;
    node.runAction(cc.sequence(cc.fadeIn(0.4), cc.delayTime(1.2), cc.fadeOut(0.4)));
  },
  setzhuang: function setzhuang(ret) {
    this.node.getChildByName('zhuang_bg').active = true;
    this.node.getChildByName('face_m').active = true;
    this.node.getChildByName('icon_zhuang').active = true;
    this.node.getChildByName('zhuang_bg').getChildByName('庄家name').getComponent(cc.Label).string = ret.name;
    setHeadTexture(this.node.getChildByName('face_m'), ret.url);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx5YWRheGlhb1xceWFkYXhpYW8uanMiXSwibmFtZXMiOlsid2luZG93IiwieWFkYXhpYW9fZ2xvYmFsIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwb2tlcl9hcnIiLCJOb2RlIiwiY2hpcF9ib3giLCJiZXRfdGV4dCIsImJldF90ZXh0X3FpYW5nIiwicGxheWVyX25vZGUiLCJoZWxwTm9kZSIsIm9ubGluZU5vZGUiLCJyZWNvcmROb2RlIiwiYW5pbWVOb2RlX3BrIiwiYW5pbWVOb2RlX3N0YXJ0IiwiYW5pbWVOb2RlX2VuZCIsImNoaXBzX25vZGUiLCJjYXJkc3BmcmFtZSIsIlNwcml0ZUZyYW1lIiwiaGVhZHNwZnJhbWUiLCJyZXN1bHRzcGZyYW1lIiwicmVzdWx0c3BmcmFtZTAiLCJwb2ludHNwZnJhbWUiLCJjaGlwX3ByZWZhYiIsIlByZWZhYiIsIm1faUN1cnJlbnRTZWxCZXQiLCJtX2lHYW1lT3ZlclRpbWUiLCJtX2xQb29sTnVtIiwibV9pU2VsVGFyIiwidGFibGVfdXNlcmluZm8iLCJtX2lRaWFuZ051bSIsIm1faUZhc3ROdW0iLCJkZXRhaWxOb2RlIiwic2V0dGluZ2dvbGROb2RlIiwic2V0dGluZ2Zhc3ROb2RlIiwicWlhbmdOb2RlIiwicmVjb3JkQ29udGVudCIsInJlY29yZFByZWZhYiIsInNlcmlhbGl6ZVVzZXJzIiwidXNlcl9vYmplY3QiLCJsZW5ndGgiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJwbGF5ZXJJbmZvRXgiLCJ5YWRheGlhb19zYyIsImluZm9fMCIsInNjb3JlIiwidXNlcl9pZCIsImlkIiwidXNlcl9uYW1lIiwibmlja25hbWUiLCJ1c2VyX3VybCIsImhlYWRpbWd1cmwiLCJwdXNoIiwic3BsaWNlIiwic2V0UGxheWVyVmlldyIsIm9uTG9hZCIsImNoaXBfbmFtZSIsImNoaXBfbnVtcyIsImRlYnVnIiwic2V0RGlzcGxheVN0YXRzIiwieWFkYXhpYW9faW5zIiwicGxheWVySWQiLCJwbGF5ZXJfc2NvcmUiLCJwbGF5ZXJfbmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJIZWFkIiwicGxheWVySGVhZElkIiwidXNlckluZm9fbGlzdCIsInBva2VyX3BvcyIsImkiLCJwb3NpdGlvbiIsIm9wYWNpdHkiLCJyZXNldHBhcmFtIiwibmV0d29yayIsImFjdGl2ZSIsIkxhbmRsb3Jkc1NvY2tldCIsImVtaXQiLCJzdGFydCIsInBsYXlCR00iLCJpbml0X3JlY29yZCIsInJlc3VsdCIsImFyciIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImNoaWxkcmVuIiwicmVzIiwid2luIiwibnVtIiwicGFyc2VJbnQiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIm5vZGUwIiwiemh1YW5nc2NvcmUiLCJpbml0X3JlY29yZDIiLCJ0b19kb3VibGUiLCJyZW1vdmVBbGxDaGlsZHJlbiIsIm9wZW4iLCJvcGVuX3RpbWUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInJlc18iLCJkYXRlIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIkxhYmVsIiwic3RyaW5nIiwiaW5pdF9zdGF0IiwiZ2FtZV90eXBlIiwibm93IiwiYmV0X3RpbWUiLCJxaWFuZ190aW1lIiwiYmV0X2xpc3QiLCJiZXRfcmVzIiwiYmV0X2dvbGQiLCJzZXRQb29sVmlldyIsIkhlbHBlciIsImZpeE51bSIsInVwZGF0ZSIsImR0IiwidCIsInBsYXlFZmZlY3QiLCJzZXRCZXRWaWV3IiwiYmV0IiwicG9pbnQiLCJsYXN0VG91Y2hQb2ludCIsInN0ciIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZWxiZXQiLCJwYXJhIiwic2hvd0hpbnQiLCJ2MiIsImJldGFycmF5Iiwic2V0SGVhZFRleHR1cmUiLCJzaG93Q291bnQiLCJsYWJlbF8wIiwibGFiZWxfMSIsInNob3dSZXN1bHQiLCJyZXQiLCJpbnN0YW5jZSIsInVzZXJfd2luIiwic2NvcmVfY2hhbmdlIiwic2NoZWR1bGVPbmNlIiwicGVyX3RpbWUiLCJuZWVkdGltZSIsImJhc2VzX25vZGUiLCJqIiwibiIsIm5hbWUiLCJpc05hTiIsIndpbl9yZXMiLCJubm4iLCJjaGlwX25vZGUiLCJvbl9wb29sIiwiaW5pdGVkIiwiZW5kcG9zIiwib3duZXIiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsIm1vdmVUbyIsInJlbW92ZVNlbGYiLCJmYWRlT3V0Iiwic2V0UG9rZXJWaXNpYmxlIiwib25CZXQiLCJpbmZvIiwiY2hpcF9zdGFydHBvcyIsImNoaXBfZW5kcG9zIiwiZW5kbm9kZSIsIm93bmVyVGFnIiwidXNlcklkIiwiaW5kZXgiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJlbmRwb3NfbWluIiwiY29udmVydFRvV29ybGRTcGFjZSIsImVuZHBvc19tYXgiLCJ4IiwieSIsImVuZHgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJlbmR5Iiwic2NhbGUiLCJiZXRCZWdpbiIsImJldEJlZ2luX3IiLCJzZXRQb2tlclNwIiwidGFnIiwiYTEiLCJiMSIsInNjYWxlVG8iLCJmbGFnIiwic3Bhd24iLCJmYWRlSW4iLCJxaWFuZ3podWFuZyIsInNldFFpYW5nR29sZFZpZXciLCJmaW5kIiwiRWRpdEJveCIsInNldEZhc3RHb2xkVmlldyIsInN0b3BBbGxBY3Rpb25zIiwiZGVsYXlUaW1lIiwic2V0emh1YW5nIiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLGVBQVAsR0FBeUIsRUFBekI7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRSxDQUFDSixFQUFFLENBQUNLLElBQUosQ0FESDtBQUdSQyxJQUFBQSxRQUFRLEVBQUVOLEVBQUUsQ0FBQ0ssSUFITDtBQUlSRSxJQUFBQSxR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TCxDQUFVQyxjQUFWLENBQXlCLFdBQXpCLEVBQXNDQSxjQUF0QyxDQUFxRCxRQUFyRCxFQUErRE0sWUFBL0QsQ0FBNEUzRixFQUFFLENBQUNnSCxLQUEvRSxFQUFzRkMsTUFBdEYsR0FBK0ZpQyxHQUFHLENBQUNVLElBQW5HO0FBQ0FmLElBQUFBLGNBQWMsQ0FBQyxLQUFLekQsSUFBTCxDQUFVQyxjQUFWLENBQXlCLFFBQXpCLENBQUQsRUFBcUM2RCxHQUFHLENBQUMrRCxHQUF6QyxDQUFkO0FBQ0g7QUF6eUJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy55YWRheGlhb19nbG9iYWwgPSB7fTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBva2VyX2FycjogW2NjLk5vZGVdLFxuXG4gICAgICAgIGNoaXBfYm94OiBjYy5Ob2RlLFxuICAgICAgICBiZXRfdGV4dDogY2MuTm9kZSxcbiAgICAgICAgYmV0X3RleHRfcWlhbmc6IGNjLk5vZGUsXG4gICAgICAgIHBsYXllcl9ub2RlOiBbY2MuTm9kZV0sXG4gICAgICAgIGhlbHBOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBvbmxpbmVOb2RlOiBjYy5Ob2RlLFxuICAgICAgICByZWNvcmROb2RlOiBjYy5Ob2RlLFxuXG4gICAgICAgIGFuaW1lTm9kZV9wazogY2MuTm9kZSxcbiAgICAgICAgYW5pbWVOb2RlX3N0YXJ0OiBjYy5Ob2RlLFxuICAgICAgICBhbmltZU5vZGVfZW5kOiBjYy5Ob2RlLFxuXG4gICAgICAgIGNoaXBzX25vZGU6IGNjLk5vZGUsXG5cbiAgICAgICAgY2FyZHNwZnJhbWU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGhlYWRzcGZyYW1lOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICByZXN1bHRzcGZyYW1lOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICByZXN1bHRzcGZyYW1lMDogW2NjLlNwcml0ZUZyYW1lXSxcblxuICAgICAgICBwb2ludHNwZnJhbWU6IFtjYy5TcHJpdGVGcmFtZV0sXG5cbiAgICAgICAgY2hpcF9wcmVmYWI6IFtjYy5QcmVmYWJdLFxuICAgICAgICBtX2lDdXJyZW50U2VsQmV0OiAtMSxcblxuICAgICAgICBtX2lHYW1lT3ZlclRpbWU6IC0xLFxuICAgICAgICBtX2xQb29sTnVtOiBbXSxcblxuICAgICAgICBtX2lTZWxUYXI6IC0xLFxuXG4gICAgICAgIC8vIHVzZXJJbmZvX2xpc3Q6W10sXG4gICAgICAgIC8vIGZhcnNlZXI6e30sXG4gICAgICAgIHRhYmxlX3VzZXJpbmZvOiBbXSxcblxuICAgICAgICBtX2lRaWFuZ051bTogMTAwMDAwLFxuXG4gICAgICAgIG1faUZhc3ROdW06IDEsXG5cbiAgICAgICAgZGV0YWlsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgc2V0dGluZ2dvbGROb2RlOiBjYy5Ob2RlLFxuICAgICAgICBzZXR0aW5nZmFzdE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHFpYW5nTm9kZTogY2MuTm9kZSxcblxuICAgICAgICByZWNvcmRDb250ZW50OiBjYy5Ob2RlLFxuICAgICAgICByZWNvcmRQcmVmYWI6IGNjLlByZWZhYixcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBzZXJpYWxpemVVc2Vycyh1c2VyX29iamVjdCkge1xuICAgICAgICAvLzDoh6rlt7EgMeelnueulyAy6aaW5a+MIDMtNuWFtuS7llxuICAgICAgICAvL2JldF9zY29yZVxuICAgICAgICAvL3Njb3JlXG4gICAgICAgIC8vdXNlcl9pZFxuICAgICAgICAvL3VzZXJfbmFtZVxuICAgICAgICAvL3VzZXJfdXJsXG4gICAgICAgIC8vd2luX251bVxuXG4gICAgICAgIC8vIHRoaXMuZmFyc2VlciA9IHVzZXJfb2JqZWN0LnNoZW5fc3Vhbl96aTtcbiAgICAgICAgLy8gdGhpcy51c2VySW5mb19saXN0ID0gdXNlcl9vYmplY3QucmFua2luZ19saXN0O1xuICAgICAgICBpZiAodGhpcy50YWJsZV91c2VyaW5mby5sZW5ndGggPT0gMCkge1xuXG4gICAgICAgICAgICB2YXIgcGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XG4gICAgICAgICAgICB2YXIgcGxheWVySW5mb0V4ID0gd2luZG93LnlhZGF4aWFvX3NjO1xuICAgICAgICAgICAgdmFyIGluZm9fMCA9IHtcbiAgICAgICAgICAgICAgICBzY29yZTogcGxheWVySW5mb0V4LnNjb3JlLFxuICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHBsYXllckluZm9FeC5pZCxcbiAgICAgICAgICAgICAgICB1c2VyX25hbWU6IHBsYXllckluZm9FeC5uaWNrbmFtZSxcbiAgICAgICAgICAgICAgICB1c2VyX3VybDogcGxheWVySW5mb0V4LmhlYWRpbWd1cmxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2goaW5mb18wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGFibGVfdXNlcmluZm8uc3BsaWNlKDEsIHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIGlmIChKU09OLnN0cmluZ2lmeSh1c2VyX29iamVjdC5zaGVuX3N1YW5femkpICE9IFwie31cIilcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy50YWJsZV91c2VyaW5mby5wdXNoKHVzZXJfb2JqZWN0LnNoZW5fc3Vhbl96aSk7XG4gICAgICAgIC8vIH1lbHNlXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHZhciBpbmZvX3ggPSB7XG4gICAgICAgIC8vICAgICAgICAgc2NvcmU6IFwiXCIsXG4gICAgICAgIC8vICAgICAgICAgdXNlcl9pZDogLTEsXG4gICAgICAgIC8vICAgICAgICAgdXNlcl9uYW1lOiBcIuepuue8ulwiLFxuICAgICAgICAvLyAgICAgICAgIHVzZXJfdXJsOiAtMX07XG4gICAgICAgIC8vICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2goaW5mb194KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGZvciAodmFyIGkgaW4gdXNlcl9vYmplY3QucmFua2luZ19saXN0KVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB2YXIgaW5mbyA9IHVzZXJfb2JqZWN0LnJhbmtpbmdfbGlzdFtpXTtcbiAgICAgICAgLy8gICAgIGlmIChpbmZvLnVzZXJfaWQgPT0gdGhpcy50YWJsZV91c2VyaW5mb1sxXS51c2VyX2lkICYmIHBhcnNlSW50KGkpIT0wKVxuICAgICAgICAvLyAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAvLyAgICAgaWYgKGluZm8udXNlcl9pZCA9PSB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnVzZXJfaWQgJiYgcGFyc2VJbnQoaSkhPTApXG4gICAgICAgIC8vICAgICAgICAgY29udGludWU7XG5cblxuICAgICAgICAvLyAgICAgdGhpcy50YWJsZV91c2VyaW5mby5wdXNoKGluZm8pO1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoPj03KVxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoOyBpPDcgO2krKylcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdmFyIGluZm9feCA9IHtcbiAgICAgICAgLy8gICAgICAgICBzY29yZTogXCJcIixcbiAgICAgICAgLy8gICAgICAgICB1c2VyX2lkOiAtMSxcbiAgICAgICAgLy8gICAgICAgICB1c2VyX25hbWU6IFwi56m657y6XCIsXG4gICAgICAgIC8vICAgICAgICAgdXNlcl91cmw6IC0xfTtcbiAgICAgICAgLy8gICAgIHRoaXMudGFibGVfdXNlcmluZm8ucHVzaChpbmZvX3gpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KCk7XG4gICAgfSxcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICB0aGlzLmNoaXBfbmFtZSA9IHtcbiAgICAgICAgICAgIDEwMDogXCJjaGlwXzFcIixcbiAgICAgICAgICAgIDEwMDA6IFwiY2hpcF8xMFwiLFxuICAgICAgICAgICAgNTAwMDogXCJjaGlwXzUwXCIsXG4gICAgICAgICAgICAxMDAwMDogXCJjaGlwXzEwMFwiLFxuICAgICAgICAgICAgNTAwMDA6IFwiY2hpcF81MDBcIixcbiAgICAgICAgICAgIDEwMDAwMDogXCJjaGlwXzEwMDBcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoaXBfbnVtcyA9IFsxMDAsIDEwMDAsIDUwMDAsIDEwMDAwLCA1MDAwMCwgMTAwMDAwXTtcbiAgICAgICAgY2MuZGVidWcuc2V0RGlzcGxheVN0YXRzKGZhbHNlKTtcbiAgICAgICAgd2luZG93LnlhZGF4aWFvX2lucyA9IHRoaXM7XG4gICAgICAgIHZhciBwbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcbiAgICAgICAgdmFyIHBsYXllckluZm9FeCA9IHdpbmRvdy55YWRheGlhb19zYztcbiAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IHBsYXllckluZm9FeC5pZDtcbiAgICAgICAgdGhpcy5wbGF5ZXJfc2NvcmUgPSBwbGF5ZXJJbmZvRXguc2NvcmU7XG4gICAgICAgIHRoaXMucGxheWVyX25hbWUgPSBwbGF5ZXJJbmZvLnBsYXllck5hbWU7XG4gICAgICAgIHRoaXMucGxheWVySGVhZCA9IHBsYXllckluZm8ucGxheWVySGVhZDtcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkSWQgPSBwbGF5ZXJJbmZvLnBsYXllckhlYWRJZDtcblxuICAgICAgICB0aGlzLm1fbFBvb2xOdW0gPSBbMCwgMCwgMF07XG4gICAgICAgIHRoaXMuc2VyaWFsaXplVXNlcnMod2luZG93LnlhZGF4aWFvX2dsb2JhbC51c2VySW5mb19saXN0KTtcblxuXG4gICAgICAgIHRoaXMucG9rZXJfcG9zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wb2tlcl9hcnIpIHtcbiAgICAgICAgICAgIHRoaXMucG9rZXJfcG9zW2ldID0gdGhpcy5wb2tlcl9hcnJbaV0ucG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLnBva2VyX3Bvc1tpXS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5yZXNldHBhcmFtKCk7XG4gICAgICAgIHRoaXMubmV0d29yayA9IHJlcXVpcmUoJ3lhZGF4aWFvTmV0V29yaycpLmdldEluc3RhbnQ7XG4gICAgICAgIHRoaXMuYmV0X3RleHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmV0X3RleHRfcWlhbmcuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KCdnZXRHYW1lVHlwZScsICcnKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0R2FtZVJlY29yZExpc3RcIiwgXCJcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBwbGF5QkdNKCdiZycpO1xuICAgIH0sXG5cbiAgICBpbml0X3JlY29yZChyZXN1bHQpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxkX2JnXCIpLmNoaWxkcmVuO1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gYXJyKSB7XG4gICAgICAgICAgICBhcnJbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2pnX2hlJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBhcnJbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2pnX2RhJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IHJlc3VsdFtpXS53aW47XG4gICAgICAgICAgICB2YXIgbnVtID0gYXJyLmxlbmd0aCAtIDEgLSAocmVzdWx0Lmxlbmd0aCAtIDEgLSBwYXJzZUludChpKSk7XG4gICAgICAgICAgICBpZiAobnVtIDwgMCkgYnJlYWs7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGFycltudW1dLmdldENoaWxkQnlOYW1lKCdqZ19kYScpO1xuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucmVzdWx0c3BmcmFtZVtyZXNdO1xuXG4gICAgICAgICAgICB2YXIgbm9kZTAgPSBhcnJbbnVtXS5nZXRDaGlsZEJ5TmFtZSgnamdfaGUnKTtcbiAgICAgICAgICAgIG5vZGUwLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAocmVzdWx0W2ldLnpodWFuZ3Njb3JlID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUwLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yZXN1bHRzcGZyYW1lMFswXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0W2ldLnpodWFuZ3Njb3JlIDwgMCkge1xuICAgICAgICAgICAgICAgIG5vZGUwLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yZXN1bHRzcGZyYW1lMFsxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZTAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJlc3VsdHNwZnJhbWUwWzJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0X3JlY29yZDIocmVzdWx0KTtcbiAgICB9LFxuXG4gICAgdG9fZG91YmxlKG51bSkge1xuICAgICAgICBpZiAobnVtIDwgMTApIHJldHVybiAnMCcgKyBudW07XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfSxcblxuICAgIGluaXRfcmVjb3JkMihyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRDb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSByZXN1bHQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciByZXMgPSByZXN1bHRbaV0ud2luO1xuICAgICAgICAgICAgdmFyIG9wZW4gPSByZXN1bHRbaV0ub3Blbl90aW1lO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlY29yZFByZWZhYik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMucmVjb3JkQ29udGVudDtcblxuICAgICAgICAgICAgdmFyIHJlc18gPSAnJ1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShvcGVuKTtcbiAgICAgICAgICAgIHJlc18gPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLycgKyB0aGlzLnRvX2RvdWJsZShkYXRlLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgdGhpcy50b19kb3VibGUoZGF0ZS5nZXREYXRlKCkpICsgJyAnICsgdGhpcy50b19kb3VibGUoZGF0ZS5nZXRIb3VycygpKSArIFwiOlwiICsgdGhpcy50b19kb3VibGUoZGF0ZS5nZXRNaW51dGVzKCkpICsgXCI6XCIgKyB0aGlzLnRvX2RvdWJsZShkYXRlLmdldFNlY29uZHMoKSk7XG5cbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzXzsvL25ldyBEYXRlKG9wZW4pLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdiYW8nKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2RhJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd4aWFvJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocmVzID09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdiYW8nKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2RhJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzID09IDIpIHtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd4aWFvJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0X3N0YXQocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQuZ2FtZV90eXBlID09IDEpIHtcbiAgICAgICAgICAgIC8vIGlmIChyZXN1bHQuYmV0X3RpbWUgPT0gMzApXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iZXRCZWdpbigpO1xuICAgICAgICAgICAgLy8gfWVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJldF90ZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2lHYW1lT3ZlclRpbWUgPSBEYXRlLm5vdygpIC8gMTAwMCArIHJlc3VsdC5iZXRfdGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIuW9k+WJjeeKtuaAgeaWh+acrFwiKS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCLlvZPliY3nirbmgIHmlofmnKxcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIGZvciAodmFyIGkgaW4gdGhpcy5wb2tlcl9hcnIpXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl9hcnJbaV0ub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0LmdhbWVfdHlwZSA9PSA0KSB7XG4gICAgICAgICAgICB0aGlzLnFpYW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iZXRfdGV4dF9xaWFuZy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tX2lHYW1lT3ZlclRpbWUgPSBEYXRlLm5vdygpIC8gMTAwMCArIHJlc3VsdC5xaWFuZ190aW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5xaWFuZ05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpIGluIHJlc3VsdC5iZXRfbGlzdCkge1xuICAgICAgICAgICAgdGhpcy5tX2xQb29sTnVtW3Jlc3VsdC5iZXRfbGlzdFtpXS5iZXRfcmVzXSArPSByZXN1bHQuYmV0X2xpc3RbaV0uYmV0X2dvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb29sVmlldygpO1xuICAgIH0sXG5cbiAgICBzZXRQb29sVmlldygpIHtcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9MDtpPDM7aSsrKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWluXCIpLmdldENoaWxkQnlOYW1lKFwiY2hpcF9iZ19cIitpKS5nZXRDaGlsZEJ5TmFtZShcInBvb2xcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLm1fbFBvb2xOdW1baV07ICAgIFxuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdnX2JnJykuZ2V0Q2hpbGRCeU5hbWUoJ+W3suS4i+azqOaWhzEnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5tX2xQb29sTnVtWzFdKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdnX2JnMicpLmdldENoaWxkQnlOYW1lKCflt7LkuIvms6jmlocxJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKHRoaXMubV9sUG9vbE51bVsyXSk7XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLm1faUdhbWVPdmVyVGltZSAmJiB0aGlzLmJldF90ZXh0LmFjdGl2ZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBwYXJzZUludCh0aGlzLm1faUdhbWVPdmVyVGltZSAtIERhdGUubm93KCkgLyAxMDAwKTtcblxuICAgICAgICAgICAgaWYgKHQgPD0gNSAmJiB0ICsgXCJcIiAhPSB0aGlzLmJldF90ZXh0LmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZykge1xuICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2NvdW50ZG93bicpO1xuICAgICAgICAgICAgICAgIGlmICh0ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheUVmZmVjdCgnc3RvcF9zJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZXRfdGV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJldF90ZXh0LmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHQ7XG4gICAgICAgICAgICAvL3RoaXMuYmV0X3RleHRfZG93bi5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0O1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5tX2lHYW1lT3ZlclRpbWUgJiYgdGhpcy5iZXRfdGV4dF9xaWFuZy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gcGFyc2VJbnQodGhpcy5tX2lHYW1lT3ZlclRpbWUgLSBEYXRlLm5vdygpIC8gMTAwMCk7XG5cbiAgICAgICAgICAgIGlmICh0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJldF90ZXh0X3FpYW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmV0X3RleHRfcWlhbmcuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdDtcbiAgICAgICAgICAgIC8vdGhpcy5iZXRfdGV4dF9kb3duLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHQ7XG4gICAgICAgIH1cblxuXG4gICAgfSxcblxuICAgIHJlc2V0cGFyYW0oKSB7XG4gICAgICAgIHRoaXMubV9pQ3VycmVudFNlbEJldCA9IC0xO1xuICAgICAgICB0aGlzLnNldEJldFZpZXcoKTtcbiAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KCk7XG4gICAgfSxcblxuICAgIGJldChudW0sIHBvaW50KSB7XG4gICAgICAgIHRoaXMubGFzdFRvdWNoUG9pbnQgPSBwb2ludDtcbiAgICAgICAgaWYgKHRoaXMubV9pQ3VycmVudFNlbEJldCA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIC8vYmV0X3R5cGU6IDEsXG4gICAgICAgICAgICBiZXRfcmVzOiBwYXJzZUludChudW0pLFxuICAgICAgICAgICAgYmV0X2dvbGQ6IHRoaXMubV9pQ3VycmVudFNlbEJldCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KCdsb3R0ZXJ5Jywgc3RyKTtcblxuICAgICAgICB0aGlzLnNldEJldFZpZXcoKTtcbiAgICB9LFxuXG4gICAgc2VsYmV0KHBhcmEpIHtcbiAgICAgICAgaWYgKHBhcmEgPT0gXCJhbGxcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMubV9pU2VsVGFyIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hpbnQoJ+ivt+WFiOmAieaLqeS4gOasoeWkp+WwjycpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0VG91Y2hQb2ludCA9IGNjLnYyKDAsIDApO1xuICAgICAgICAgICAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIC8vYmV0X3R5cGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIGJldF9yZXM6IHRoaXMubV9pU2VsVGFyLFxuICAgICAgICAgICAgICAgICAgICBiZXRfZ29sZDogdGhpcy5tX2lGYXN0TnVtICogMTAwLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KCdsb3R0ZXJ5Jywgc3RyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQocGFyYSk7XG4gICAgICAgIGlmICh0aGlzLm1faUN1cnJlbnRTZWxCZXQgPT0gbnVtKSB7XG4gICAgICAgICAgICB0aGlzLm1faUN1cnJlbnRTZWxCZXQgPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlIDwgbnVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheUVmZmVjdCgnY2hpcCcpO1xuICAgICAgICAgICAgdGhpcy5tX2lDdXJyZW50U2VsQmV0ID0gbnVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QmV0VmlldygpO1xuICAgIH0sXG4gICAgc2V0QmV0VmlldygpIHtcbiAgICAgICAgaWYgKHRoaXMubV9pQ3VycmVudFNlbEJldCA+IHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUpIHtcbiAgICAgICAgICAgIHRoaXMubV9pQ3VycmVudFNlbEJldCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBiZXRhcnJheSA9IHRoaXMuY2hpcF9ib3guY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgaW4gYmV0YXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gYmV0YXJyYXlbaV07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNoaXBfbnVtc1tpXSA8PSB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAxMjg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNoaXBfbnVtc1tpXSA9PSB0aGlzLm1faUN1cnJlbnRTZWxCZXQpIHtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdCYWNrZ3JvdW5kJykuZ2V0Q2hpbGRCeU5hbWUoJ2NoZWNrbWFyaycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0JhY2tncm91bmQnKS5nZXRDaGlsZEJ5TmFtZSgnY2hlY2ttYXJrJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0UGxheWVyVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd1aScpLmdldENoaWxkQnlOYW1lKFwiaGVhZFwiKS5nZXRDaGlsZEJ5TmFtZShcIumHkeW4gWljb25cIikuZ2V0Q2hpbGRCeU5hbWUoXCLph5HluIHmlbBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUpO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VpJykuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkXCIpLmdldENoaWxkQnlOYW1lKFwi546p5a625ZCNXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy50YWJsZV91c2VyaW5mb1swXS51c2VyX25hbWU7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndWknKS5nZXRDaGlsZEJ5TmFtZShcImhlYWRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJJRFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiSUQ6XCIgKyB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnVzZXJfaWQ7XG4gICAgICAgIHNldEhlYWRUZXh0dXJlKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndWknKS5nZXRDaGlsZEJ5TmFtZSgnaGVhZCcpLCB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnVzZXJfdXJsKTtcblxuICAgICAgICAvLyBmb3IgKHZhciBpIGluIHRoaXMucGxheWVyX25vZGUpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHZhciB0YWcgPSBwYXJzZUludChpKTtcbiAgICAgICAgLy8gICAgIHZhciBpbmZvO1xuICAgICAgICAvLyAgICAgaWYgKHRhZyA+PSB0aGlzLnRhYmxlX3VzZXJpbmZvLmxlbmd0aClcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBpbmZvID0ge307XG4gICAgICAgIC8vICAgICB9ZWxzZXtcbiAgICAgICAgLy8gICAgICAgICBpbmZvID0gdGhpcy50YWJsZV91c2VyaW5mb1t0YWddO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgdGhpcy5wbGF5ZXJfbm9kZVt0YWddLmdldENoaWxkQnlOYW1lKFwiTmV3IExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaW5mby51c2VyX25hbWU7XG4gICAgICAgIC8vICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZVt0YWddLmdldENoaWxkQnlOYW1lKFwicGxfZ29sZF9iYXJcIikpXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZVt0YWddLmdldENoaWxkQnlOYW1lKFwicGxfZ29sZF9iYXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJOZXcgTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpbmZvLnNjb3JlO1xuXG4gICAgICAgIC8vICAgICB2YXIgaGVhZCA9IGluZm8udXNlcl91cmw7XG4gICAgICAgIC8vICAgICB2YXIgaGVhZG5vZGUgPSB0aGlzLnBsYXllcl9ub2RlW3RhZ107XG4gICAgICAgIC8vICAgICBpZiAoaGVhZCA8IDApXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgaGVhZCA9IDA7XG4gICAgICAgIC8vICAgICB9ICAgIFxuICAgICAgICAvLyAgICAgaWYgKGhlYWRub2RlLmdldENoaWxkQnlOYW1lKFwicGxfZmFjZVwiKSlcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBoZWFkbm9kZSA9IGhlYWRub2RlLmdldENoaWxkQnlOYW1lKFwicGxfZmFjZVwiKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGhlYWRub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5oZWFkc3BmcmFtZVtoZWFkXTtcbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICBzaG93Q291bnQoc2NvcmUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCLnu5PmnpxcIik7XG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGxhYmVsXzAgPSBub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWxfMFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuXG4gICAgICAgIGlmIChzY29yZSA+IDApIHtcbiAgICAgICAgICAgIGxhYmVsXzAuc3RyaW5nID0gXCLmgqjotaLlvpfkuoYgXCIgKyBIZWxwZXIuZml4TnVtKHNjb3JlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzY29yZSA8IDApIHtcbiAgICAgICAgICAgIGxhYmVsXzAuc3RyaW5nID0gXCLmgqjovpPmjonkuoYgXCIgKyBIZWxwZXIuZml4TnVtKC0xICogc2NvcmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFiZWxfMC5zdHJpbmcgPSBcIuaCqOayoeaciei+k+i1olwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhYmVsXzEgPSBub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWxfMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJlbF8xLnN0cmluZyA9IFwi5b2T5YmNIFwiICsgSGVscGVyLmZpeE51bSh0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlKTtcblxuICAgIH0sXG4gICAgc2hvd1Jlc3VsdChyZXQpIHtcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgLy8wMTIg6b6Z6JmO5ZKMIDEyMzQg6buR57qi6Iqx54mHXG4gICAgICAgIC8vdmFyIHNhbSA9IHtodV9jYXJkOjIzMDcsbG9uZ19jYXJkOjI1OCxSZXN1bHRDb2RlOjEsd2luOjF9O1xuXG4gICAgICAgIHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUgKz0gcmV0LnVzZXJfd2luO1xuXG4gICAgICAgIHZhciBzY29yZV9jaGFuZ2UgPSB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlIC0gdGhpcy5wbGF5ZXJfc2NvcmU7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zaG93Q291bnQoc2NvcmVfY2hhbmdlKTtcbiAgICAgICAgfSwgNC4wKTtcblxuICAgICAgICB0aGlzLnBsYXllcl9zY29yZSA9IHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmU7XG5cbiAgICAgICAgdmFyIHBlcl90aW1lID0gMC42O1xuICAgICAgICB2YXIgbmVlZHRpbWUgPSAxLjU7XG5cbiAgICAgICAgdmFyIGJhc2VzX25vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+mqsOWtkOahhlVJJyk7XG4gICAgICAgIGJhc2VzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogaW4gYmFzZXNfbm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHZhciBuID0gYmFzZXNfbm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICBpZiAobi5uYW1lID09IFwibGFiZWxcIikge1xuICAgICAgICAgICAgICAgICAgICBuLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKG4ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXQud2luX3Jlc1swXTtcbiAgICAgICAgLy9yZXQud2luO1xuXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn6aqw5a2Q5qGGVUknKS5nZXRDaGlsZEJ5TmFtZSgn57uT5p6cJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuacrOWxgOe7k+aenCAgP1wiO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2RpY2UnKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn6aqw5a2Q5qGGVUknKS5nZXRDaGlsZEJ5TmFtZSgnMeWPt+S9jScpLmdldENoaWxkQnlOYW1lKCfnrZvlrZDliqjnlLsnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn6aqw5a2Q5qGGVUknKS5nZXRDaGlsZEJ5TmFtZSgnMeWPt+S9jScpLmdldENoaWxkQnlOYW1lKHJldC53aW5fcmVzWzBdICsgJycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+mqsOWtkOahhlVJJykuZ2V0Q2hpbGRCeU5hbWUoJzHlj7fkvY0nKS5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJldC53aW5fcmVzWzBdO1xuICAgICAgICB9LCAwLjYpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn6aqw5a2Q5qGGVUknKS5nZXRDaGlsZEJ5TmFtZSgnMuWPt+S9jScpLmdldENoaWxkQnlOYW1lKCfnrZvlrZDliqjnlLsnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn6aqw5a2Q5qGGVUknKS5nZXRDaGlsZEJ5TmFtZSgnMuWPt+S9jScpLmdldENoaWxkQnlOYW1lKHJldC53aW5fcmVzWzFdICsgJycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+mqsOWtkOahhlVJJykuZ2V0Q2hpbGRCeU5hbWUoJzLlj7fkvY0nKS5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJldC53aW5fcmVzWzFdO1xuICAgICAgICB9LCAxLjIpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn6aqw5a2Q5qGGVUknKS5nZXRDaGlsZEJ5TmFtZSgnM+WPt+S9jScpLmdldENoaWxkQnlOYW1lKCfnrZvlrZDliqjnlLsnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn6aqw5a2Q5qGGVUknKS5nZXRDaGlsZEJ5TmFtZSgnM+WPt+S9jScpLmdldENoaWxkQnlOYW1lKHJldC53aW5fcmVzWzJdICsgJycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+mqsOWtkOahhlVJJykuZ2V0Q2hpbGRCeU5hbWUoJzPlj7fkvY0nKS5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJldC53aW5fcmVzWzJdO1xuXG4gICAgICAgICAgICB2YXIgbm5uID0gXCJcIjtcbiAgICAgICAgICAgIGlmIChyZXQud2luID09IDApIHtcbiAgICAgICAgICAgICAgICBubm4gPSBcIuixuVwiO1xuICAgICAgICAgICAgfSBpZiAocmV0LndpbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgbm5uID0gXCLlpKdcIjtcbiAgICAgICAgICAgIH0gaWYgKHJldC53aW4gPT0gMikge1xuICAgICAgICAgICAgICAgIG5ubiA9IFwi5bCPXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+mqsOWtkOahhlVJJykuZ2V0Q2hpbGRCeU5hbWUoJ+e7k+aenCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmnKzlsYDnu5PmnpwgIFwiICsgbm5uO1xuXG4gICAgICAgIH0sIDEuOCk7XG5cblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gdGhpcy5jaGlwc19ub2RlLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhcnIpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpcF9ub2RlID0gYXJyW2ldO1xuICAgICAgICAgICAgICAgIGlmIChjaGlwX25vZGUub25fcG9vbCA9PSByZXQud2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZHBvcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaXBfbm9kZS5vd25lciA9PSB0aGlzLnBsYXllcklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kcG9zID0gY2MudjIoNjkzLCA2MSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4yNSwgZW5kcG9zKSwgY2MucmVtb3ZlU2VsZigpKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlwX25vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC4yNSksIGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMiksIGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgbmVlZHRpbWUgKyAxLjApO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KDApO1xuICAgICAgICAgICAgaWYgKHJldC51c2VyX3dpbiA+IDApIHtcbiAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdBRERfU0NPUkUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0R2FtZVJlY29yZExpc3RcIiwgXCJcIik7XG4gICAgICAgIH0sIG5lZWR0aW1lICsgMS4yKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoZHQpIHtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCfpqrDlrZDmoYZVSScpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0UG9rZXJWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIC8vaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZShcIuW9k+WJjeeKtuaAgeaWh+acrFwiKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5tX2xQb29sTnVtID0gWzAsIDAsIDBdO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5zZXRQb29sVmlldygpO1xuXG4gICAgICAgIH0sIG5lZWR0aW1lICsgMS42KTtcbiAgICB9LFxuXG4gICAgb25CZXQoaW5mbykge1xuICAgICAgICAvLyBpbmZvLmJldF9yZXM7XG4gICAgICAgIC8vIGluZm8uYmV0X2dvbGQ7XG4gICAgICAgIC8vIGluZm8udXNlcklkO1xuXG4gICAgICAgIHBsYXlFZmZlY3QoJ2Nob3VtYXhpYXpodScpO1xuICAgICAgICB0aGlzLm1fbFBvb2xOdW1baW5mby5iZXRfcmVzXSArPSBpbmZvLmJldF9nb2xkO1xuICAgICAgICB0aGlzLnNldFBvb2xWaWV3KCk7XG5cbiAgICAgICAgdmFyIGNoaXBfc3RhcnRwb3M7XG5cbiAgICAgICAgdmFyIGNoaXBfZW5kcG9zO1xuXG4gICAgICAgIHZhciBpbml0ZWQgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZW5kbm9kZTtcbiAgICAgICAgaWYgKGluZm8uYmV0X3JlcyA9PSAxKSB7XG4gICAgICAgICAgICBlbmRub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCfmoYzlrZAnKS5nZXRDaGlsZEJ5TmFtZSgn5aSnJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5mby5iZXRfcmVzID09IDIpIHtcbiAgICAgICAgICAgIGVuZG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+ahjOWtkCcpLmdldENoaWxkQnlOYW1lKCflsI8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvd25lclRhZyA9IC0xO1xuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMudGFibGVfdXNlcmluZm8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlX3VzZXJpbmZvW2ldLnVzZXJfaWQgKyBcIlwiID09IGluZm8udXNlcklkICsgXCJcIikge1xuICAgICAgICAgICAgICAgIG93bmVyVGFnID0gcGFyc2VJbnQoaSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMudGFibGVfdXNlcmluZm8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlX3VzZXJpbmZvW2ldLnVzZXJfaWQgKyBcIlwiID09IGluZm8udXNlcklkICsgXCJcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVfdXNlcmluZm9baV0uc2NvcmUgLT0gaW5mby5iZXRfZ29sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBsYXllclZpZXcoKTtcblxuICAgICAgICBpZiAob3duZXJUYWcgPT0gMCkge1xuICAgICAgICAgICAgLy90aGlzLnBsYXllcl9zY29yZSAtPSBpbmZvLmJldF9nb2xkO1xuICAgICAgICAgICAgaW5pdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNoaXBfbnVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaXBfbnVtc1tpXSA8PSBpbmZvLmJldF9nb2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNoaXBfc3RhcnRwb3MgPSB0aGlzLmNoaXBfYm94LmdldENoaWxkQnlOYW1lKHRoaXMuY2hpcF9uYW1lW3RoaXMuY2hpcF9udW1zW2luZGV4XV0pLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG5cbiAgICAgICAgICAgIC8vdmFyIGVuZHBvc19taWQgPSBlbmRub2RlLmdldENoaWxkQnlOYW1lKCdtaWQnKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgdmFyIGVuZHBvc19taW4gPSBlbmRub2RlLmdldENoaWxkQnlOYW1lKCdtaW4nKS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHZhciBlbmRwb3NfbWF4ID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWF4JykuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RUb3VjaFBvaW50LnggPj0gZW5kcG9zX21pbi54ICYmIHRoaXMubGFzdFRvdWNoUG9pbnQueSA+PSBlbmRwb3NfbWluLnlcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmxhc3RUb3VjaFBvaW50LnggPD0gZW5kcG9zX21heC54ICYmIHRoaXMubGFzdFRvdWNoUG9pbnQueSA8PSBlbmRwb3NfbWF4LnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5keCA9IHRoaXMubGFzdFRvdWNoUG9pbnQueCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYwKSAtIDMwO1xuICAgICAgICAgICAgICAgIHZhciBlbmR5ID0gdGhpcy5sYXN0VG91Y2hQb2ludC55ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNjApIC0gMzA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBlbmR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGVuZHBvc19tYXgueCAtIGVuZHBvc19taW4ueCkpICsgZW5kcG9zX21pbi54O1xuICAgICAgICAgICAgICAgIHZhciBlbmR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGVuZHBvc19tYXgueSAtIGVuZHBvc19taW4ueSkpICsgZW5kcG9zX21pbi55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaGlwX2VuZHBvcyA9IGNjLnYyKGVuZHgsIGVuZHkpO1xuXG4gICAgICAgIH1cbiAgICAgICAgLy8gZWxzZSBpZiAob3duZXJUYWchPSAtMSlcbiAgICAgICAgLy8ge1xuXG4gICAgICAgIC8vIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvL3ZhciBlbmRwb3NfbWlkID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWlkJykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHZhciBlbmRwb3NfbWluID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWluJykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHZhciBlbmRwb3NfbWF4ID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWF4JykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcblxuXG4gICAgICAgICAgICB2YXIgZW5keCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChlbmRwb3NfbWF4LnggLSBlbmRwb3NfbWluLngpKSArIGVuZHBvc19taW4ueDtcbiAgICAgICAgICAgIHZhciBlbmR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGVuZHBvc19tYXgueSAtIGVuZHBvc19taW4ueSkpICsgZW5kcG9zX21pbi55O1xuXG4gICAgICAgICAgICBjaGlwX2VuZHBvcyA9IGNjLnYyKGVuZHgsIGVuZHkpO1xuXG4gICAgICAgICAgICBjaGlwX3N0YXJ0cG9zID0gY2hpcF9lbmRwb3M7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbml0ZWQpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jaGlwX251bXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlwX251bXNbaV0gPD0gaW5mby5iZXRfZ29sZCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdGhpcy5jaGlwX251bXMuaW5kZXhPZihpbmZvLmJldF9nb2xkKVxuICAgICAgICAgICAgdmFyIGNoaXBfbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2hpcF9wcmVmYWJbaW5kZXhdKTtcbiAgICAgICAgICAgIGNoaXBfbm9kZS54ID0gY2hpcF9zdGFydHBvcy54O1xuICAgICAgICAgICAgY2hpcF9ub2RlLnkgPSBjaGlwX3N0YXJ0cG9zLnk7XG4gICAgICAgICAgICBjaGlwX25vZGUuc2NhbGUgPSAwLjQ7XG4gICAgICAgICAgICBjaGlwX25vZGUucGFyZW50ID0gdGhpcy5jaGlwc19ub2RlO1xuICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yNSwgY2hpcF9lbmRwb3MueCwgY2hpcF9lbmRwb3MueSkpO1xuXG4gICAgICAgICAgICBjaGlwX25vZGUub3duZXIgPSBpbmZvLnVzZXJJZDtcbiAgICAgICAgICAgIGNoaXBfbm9kZS5vbl9wb29sID0gaW5mby5iZXRfcmVzO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJldEJlZ2luKCkge1xuICAgICAgICAvL3RoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldEdhbWVSYW5raW5nTGlzdFwiLFwiXCIpO1xuICAgICAgICB0aGlzLmJldEJlZ2luX3IoKTtcbiAgICB9LFxuXG4gICAgYmV0QmVnaW5fcigpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCLnu5PmnpxcIik7XG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHBsYXlFZmZlY3QoJ3N0YXJ0X3MnKTtcbiAgICAgICAgdGhpcy5tX2xQb29sTnVtID0gWzAsIDAsIDBdO1xuICAgICAgICB0aGlzLnNldFBvb2xWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5xaWFuZ05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIuW9k+WJjeeKtuaAgeaWh+acrFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX2lHYW1lT3ZlclRpbWUgPSBEYXRlLm5vdygpIC8gMTAwMCArIDMwO1xuXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIC8vdmFyIHNrZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGhkcGsnKTtcbiAgICAgICAgLy8gc2tlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICBza2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGluc3RhbmNlLnNldFBva2VyVmlzaWJsZSh0cnVlKTtcblxuICAgICAgICAvLyB2YXIgc3RhcnQgPSBpbnN0YW5jZS5ub2RlLmdldENoaWxkQnlOYW1lKCdhbmltX3N0YXJ0Jyk7XG4gICAgICAgIC8vIHN0YXJ0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3RhcnRCZXR0aW5nJyk7XG4gICAgICAgIHN0YXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuXG4gICAgICAgICAgICBzdGFydC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmJldF90ZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDEuMCk7XG5cblxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gc3RhcnQuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gc2tlLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHNldFBva2VyU3AodGFnLCBudW0pIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLnBva2VyX2Fyclt0YWddO1xuXG4gICAgICAgIGlmIChudW0gPCAwKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5jYXJkc3BmcmFtZVs1Ml07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYTEgPSBwYXJzZUludChudW0gLyAxNikgLyAxNjtcbiAgICAgICAgICAgIHZhciBiMSA9IG51bSAlIDE2O1xuICAgICAgICAgICAgdmFyIGkgPSAoYjEgLSAxKSAqIDEzICsgKGExIC0gMSk7XG4gICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMjUsIDEuMiwgMS4yKSwgY2Muc2NhbGVUbygwLjI1LCAwLCAxLjIpKSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuY2FyZHNwZnJhbWVbaV07XG4gICAgICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjI1LCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4yNSwgMSwgMSkpKTtcblxuICAgICAgICAgICAgfSwgMC41KTtcblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFBva2VyVmlzaWJsZShmbGFnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHQgPSAwLjE1O1xuICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICAgIC8vIHRoaXMucG9rZXJfMC5ydW5BY3Rpb24oY2Muc3Bhd24oY2MubW92ZVRvKHQsY2MudjIoLTg4LTYwLDI1OCsxMjApKSxjYy5mYWRlT3V0KHQpKSk7XG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgICAgIC8vICAgICAvL3RoaXMuc2V0UG9rZXJTcCgwLC0xKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBva2VyXzAueCA9IC04ODtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBva2VyXzAueSA9IDI1ODtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBva2VyXzAub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAvLyB9LHQrMC44KTtcbiAgICAgICAgICAgIC8vIHRoaXMucG9rZXJfMS5ydW5BY3Rpb24oY2Muc3Bhd24oY2MubW92ZVRvKHQsY2MudjIoODQtNjAsMjU4KzEyMCkpLGNjLmZhZGVPdXQodCkpKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgLy8gICAgIC8vdGhpcy5zZXRQb2tlclNwKDAsLTEpO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfMS54ID0gODQ7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl8xLnkgPSAyNTg7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl8xLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgLy8gfSx0KzAuOCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNjsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSBqO1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCwgY2MudjIodGhpcy5wb2tlcl9wb3NbaV0ueCwgdGhpcy5wb2tlcl9wb3NbaV0ueSArIDEyMCkpLCBjYy5mYWRlT3V0KHQpKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLnBvc2l0aW9uID0gdGhpcy5wb2tlcl9wb3NbaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9rZXJTcChpLCAtMSk7XG4gICAgICAgICAgICAgICAgfSwgdCArIDAuMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBwbGF5RWZmZWN0KCdTRU5EX0NBUkQnKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0UG9rZXJTcCgwLC0xKTtcbiAgICAgICAgICAgIC8vIHRoaXMucG9rZXJfMC5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIC8vIHRoaXMucG9rZXJfMC54ID0gLTg4KzYwO1xuICAgICAgICAgICAgLy8gdGhpcy5wb2tlcl8wLnkgPSAyNTgrMTIwO1xuICAgICAgICAgICAgLy8gdGhpcy5wb2tlcl8wLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCxjYy52MigtODgsMjU4KSksY2MuZmFkZUluKHQpKSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyAgICAgcGxheUVmZmVjdCgnU0VORF9DQVJEJyk7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zZXRQb2tlclNwKDEsLTEpO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfMS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBva2VyXzEueCA9IDg0IC0gNjA7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl8xLnkgPSAyNTggKyAxMjA7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl8xLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCxjYy52Mig4NCwyNTgpKSxjYy5mYWRlSW4odCkpKTsgICAgICAgIFxuICAgICAgICAgICAgLy8gfSx0KTtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBpID0gajtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2FycltpXS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ1NFTkRfQ0FSRCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBva2VyU3AoaSwgLTEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2FycltpXS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbaV0ucG9zaXRpb24gPSB0aGlzLnBva2VyX3Bvc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbaV0ueSArPSAxMjA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2FycltpXS54ICs9IDYwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbaV0ueCAtPSA2MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCwgdGhpcy5wb2tlcl9wb3NbaV0pLCBjYy5mYWRlSW4odCkpKTtcbiAgICAgICAgICAgICAgICB9LCBqICogdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBva2VyX2Fycls0XS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyWzVdLm9wYWNpdHkgPSAwO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBxaWFuZ3podWFuZygpIHtcbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KCdxaWFuZ1podWFuZycsICcnKTtcbiAgICB9LFxuXG4gICAgc2V0UWlhbmdHb2xkVmlldygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nZ29sZE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL+aKouW6hFVJL+i+k+WFpScpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmcgPSB0aGlzLm1faVFpYW5nTnVtO1xuICAgIH0sXG5cblxuICAgIHNldEZhc3RHb2xkVmlldygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nZmFzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL+W/q+WOi+iuvue9ri/ovpPlhaUnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nID0gdGhpcy5tX2lGYXN0TnVtO1xuICAgIH0sXG5cbiAgICBzaG93SGludChzdHIpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hpbnQnKTtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG5cbiAgICAgICAgbm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlSW4oMC40KSwgY2MuZGVsYXlUaW1lKDEuMiksIGNjLmZhZGVPdXQoMC40KSkpO1xuICAgIH0sXG4gICAgc2V0emh1YW5nKHJldCkge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3podWFuZ19iZycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmFjZV9tJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpY29uX3podWFuZycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnemh1YW5nX2JnJykuZ2V0Q2hpbGRCeU5hbWUoJ+W6hOWutm5hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJldC5uYW1lO1xuICAgICAgICBzZXRIZWFkVGV4dHVyZSh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZhY2VfbScpLCByZXQudXJsKTtcbiAgICB9LFxufSk7XG5cblxuIl19