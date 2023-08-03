
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bairenniuniu/bairenniuniu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '93d2c5YOodAW4EBdAtg5pxm', 'bairenniuniu');
// Script/bairenniuniu/bairenniuniu.js

"use strict";

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
    animeNode_wait: cc.Node,
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
    recordPrefab: cc.Prefab,
    point_node: [cc.Node],
    no_bet_node: [cc.Node]
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
    this.farseer = user_object.shen_suan_zi;
    this.userInfo_list = user_object.ranking_list;

    if (this.table_userinfo.length == 0) {
      var playerInfo = require("PlayerInfo").getInstant;

      var playerInfoEx = window.bairenniuniu_sc;
      var info_0 = {
        score: playerInfoEx.score,
        user_id: playerInfoEx.id,
        user_name: playerInfoEx.nickname,
        user_url: playerInfoEx.headimgurl
      };
      this.table_userinfo.push(info_0);
    } else {
      this.table_userinfo.splice(1, this.table_userinfo.length - 1);
    }

    if (JSON.stringify(user_object.shen_suan_zi) != "{}") {
      this.table_userinfo.push(user_object.shen_suan_zi);
    } else {
      var info_x = {
        score: "",
        user_id: -1,
        user_name: "空缺",
        user_url: -1
      };
      this.table_userinfo.push(info_x);
    }

    for (var i in user_object.ranking_list) {
      var info = user_object.ranking_list[i];
      if (info.user_id == this.table_userinfo[1].user_id && parseInt(i) != 0) continue;
      if (info.user_id == this.table_userinfo[0].user_id && parseInt(i) != 0) continue;
      this.table_userinfo.push(info);
      if (this.table_userinfo.length >= 7) break;
    }

    for (var i = this.table_userinfo.length; i < 7; i++) {
      var info_x = {
        score: "",
        user_id: -1,
        user_name: "空缺",
        user_url: -1
      };
      this.table_userinfo.push(info_x);
    }

    this.setPlayerView();
  },
  onLoad: function onLoad() {
    this.chip_name = {
      100: "bt_score_0_0",
      1000: "bt_score_1_0",
      5000: "bt_score_2_0",
      10000: "bt_score_3_0",
      50000: "bt_score_4_0"
    };
    this.chip_nums = [100, 1000, 5000, 10000, 50000];
    cc.debug.setDisplayStats(false);
    window.brnn_ins = this;

    var playerInfo = require("PlayerInfo").getInstant;

    var playerInfoEx = window.bairenniuniu_sc;
    this.playerId = playerInfoEx.id;
    this.player_score = playerInfoEx.score;
    this.player_name = playerInfo.playerName;
    this.playerHead = playerInfo.playerHead;
    this.playerHeadId = playerInfo.playerHeadId;
    this.m_lPoolNum = [-1, 0, 0, 0, 0];
    this.serializeUsers(window.bairenniuniu_global.userInfo_list);
    this.poker_pos = [];

    for (var i in this.poker_arr) {
      this.poker_pos[i] = this.poker_arr[i].position;
      this.poker_pos[i].opacity = 0;
    }

    this.resetparam();
    this.network = require('bairenniuniuNetWork').getInstant;
    this.bet_text.active = false;
    this.bet_text_qiang.active = false;

    for (var i in this.no_bet_node) {
      this.no_bet_node[i].active = false;
    }

    this.setPokerVisible(false);
    this.network.LandlordsSocket.emit('getGameType', '');
    this.network.LandlordsSocket.emit("getGameRecordList", "");
    this.animeNode_wait.active = true;
  },
  start: function start() {
    playBGM('bg');
  },
  init_record: function init_record(result) {
    var arr = this.recordNode.getChildByName('im_ludan_bg').getChildByName('jilu_list').children;

    for (var i in arr) //= arr.length-1;i>=0;i--)
    {
      var node = arr[i];
      var index = result.length - arr.length + parseInt(i);
      console.log(index);

      if (index < 0) {
        node.active = false;
      } else {
        node.active = true;

        for (var j in node.children) {
          var item = node.children[j];

          if (result[index].win[j] > 0) {
            item.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[0];
          } else {
            item.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[1];
          }
        }
      }
    } // var arr = this.node.getChildByName("ld_bg").children;
    // for (var i in arr)
    // {
    //     arr[i].getChildByName('jg_he').active = false;
    //     arr[i].getChildByName('jg_da').active = false;
    // }
    // for (var i = result.length-1;i>=0;i--)
    // {
    //     var res = result[i].win;
    //     var num = arr.length-1 - (result.length-1 - parseInt(i));
    //     if (num<0)break;
    //     var node = arr[num].getChildByName('jg_da');
    //     node.active = true;
    //     node.getComponent(cc.Sprite).spriteFrame = this.resultspframe[res];
    //     var node0 = arr[num].getChildByName('jg_he');
    //     node0.active = true;
    //     if (result[i].zhuangscore>0)
    //     {
    //         node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[0];
    //     }else if (result[i].zhuangscore<0)
    //     {
    //         node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[1];
    //     }else{
    //         node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[2];
    //     }
    // }
    // this.init_record2(result);

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
        this.animeNode_wait.active = false;
      }
      this.setPokerVisible(true);

      for (var i in this.no_bet_node) {
        this.no_bet_node[i].active = true;
      }
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
    cc.find('Canvas/im_game_bg/games_btn_tian_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[1]);
    cc.find('Canvas/im_game_bg/games_btn_di_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[2]);
    cc.find('Canvas/im_game_bg/games_btn_xuan_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[3]);
    cc.find('Canvas/im_game_bg/games_btn_huang_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[4]);
  },
  update: function update(dt) {
    if (this.m_iGameOverTime && this.bet_text.active) {
      var t = parseInt(this.m_iGameOverTime - Date.now() / 1000);

      if (t <= 5 && t + "" != this.bet_text.getChildByName('New Label').getComponent(cc.Label).string) {
        playEffect('countdown');

        if (t == 0) {
          playEffect('stop_s');
          this.animeNode_end.active = true;
          this.animeNode_end.stopAllActions();
          this.animeNode_end.runAction(cc.sequence(cc.show(), cc.delayTime(1.2), cc.hide()));
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
        node.getChildByName('checkmark').active = true;
      } else {
        node.getChildByName('checkmark').active = false;
      }
    }
  },
  setPlayerView: function setPlayerView() {
    // this.node.getChildByName('ui').getChildByName("head").getChildByName("金币icon").getChildByName("金币数").getComponent(cc.Label).string = Helper.fixNum(this.table_userinfo[0].score);
    // this.node.getChildByName('ui').getChildByName("head").getChildByName("玩家名").getComponent(cc.Label).string = this.table_userinfo[0].user_name;
    // this.node.getChildByName('ui').getChildByName("head").getChildByName("ID").getComponent(cc.Label).string = "ID:" + this.table_userinfo[0].user_id;
    // setHeadTexture(this.node.getChildByName('ui').getChildByName('head'),this.table_userinfo[0].user_url);
    for (var i in this.player_node) {
      var tag = parseInt(i);
      var info;

      if (tag >= this.table_userinfo.length) {
        //info = {};
        break;
      } else {
        info = this.table_userinfo[tag];
      }

      this.player_node[tag].getChildByName("name").getComponent(cc.Label).string = info.user_name;
      if (this.player_node[tag].getChildByName("gold_bar")) this.player_node[tag].getChildByName("gold_bar").getChildByName("gold").getComponent(cc.Label).string = Helper.fixNum(info.score);
      var head = info.user_url;
      var headnode = this.player_node[tag];

      if (head < 0) {
        head = 0;
        return;
      }

      if (headnode.getChildByName("user_zhuangjia")) {
        headnode = headnode.getChildByName("user_zhuangjia");
      } //headnode.getComponent(cc.Sprite).spriteFrame = this.headspframe[head];


      setHeadTexture(headnode, head);
    }
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

    this.table_userinfo[0].score += ret.user_win; //var score_change = this.table_userinfo[0].score - this.player_score;
    // this.scheduleOnce(function(){
    //     this.showCount(score_change);
    // },4.0);

    this.player_score = this.table_userinfo[0].score;
    var per_time = 1;
    var needtime = 1.5; //ret.win_res[0];
    //ret.win;

    this.scheduleOnce(function () {
      for (var i = 0; i < 5; i++) {
        this.setPokerSp(0, i, ret.cards[0][i]);
      }
    }, per_time);
    this.scheduleOnce(function () {
      for (var j = 1; j < 5; j++) {
        for (var i = 0; i < 5; i++) {
          this.setPokerSp(j, i, ret.cards[j][i]);
        }
      }

      this.setPointView(0, ret.niu_ji_list[0]);
    }, per_time * 2);
    this.scheduleOnce(function () {
      for (var j = 1; j < 5; j++) {
        this.setPointView(j, ret.niu_ji_list[j]);
      }
    }, per_time * 3);
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
    }, per_time * 5);
    this.scheduleOnce(function (dt) {
      this.setPlayerView(0);

      if (ret.user_win > 0) {
        playEffect('ADD_SCORE');
      }

      this.network.LandlordsSocket.emit("getGameRecordList", "");
    }, per_time * 5 + 0.2);
    this.scheduleOnce(function (dt) {
      instance.setPokerVisible(false); //instance.node.getChildByName("当前状态文本").active = true;

      instance.m_lPoolNum = [-1, 0, 0, 0, 0];
      instance.setPoolView();

      for (var i in this.no_bet_node) {
        this.no_bet_node[i].active = false;
      }

      this.animeNode_wait.active = true;
    }, per_time * 10 + 0.8);
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
      endnode = cc.find('Canvas/im_game_bg/games_btn_tian_normal');
    } else if (info.bet_res == 2) {
      endnode = cc.find('Canvas/im_game_bg/games_btn_di_normal');
    } else if (info.bet_res == 3) {
      endnode = cc.find('Canvas/im_game_bg/games_btn_xuan_normal');
    } else if (info.bet_res == 4) {
      endnode = cc.find('Canvas/im_game_bg/games_btn_huang_normal');
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
      this.no_bet_node[info.bet_res - 1].active = false;
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
    this.animeNode_wait.active = false; //var node = this.node.getChildByName("结果");
    //node.active = false;

    playEffect('start_s');
    this.m_lPoolNum = [-1, 0, 0, 0, 0];
    this.setPoolView();
    this.qiangNode.active = false; //this.node.getChildByName("当前状态文本").active = false;

    this.m_iGameOverTime = Date.now() / 1000 + 15;
    var instance = this; //var ske = this.node.getChildByName('lhdpk');
    // ske.getComponent(sp.Skeleton).setCompleteListener(function () {
    //     ske.active = false;

    instance.setPokerVisible(true); // var start = instance.node.getChildByName('anim_start');
    // start.getComponent(sp.Skeleton).setCompleteListener(function () {

    var start = instance.animeNode_start;
    start.active = true;
    this.scheduleOnce(function (dt) {
      start.active = false;
      instance.bet_text.active = true;
    }, 1.0); // });
    // start.active = true;
    // });
    // ske.active = true;

    for (var i in this.no_bet_node) {
      this.no_bet_node[i].active = true;
    }
  },
  setPokerSp: function setPokerSp(tag, tag_0, num) {
    var node = this.poker_arr[tag].children[tag_0];

    if (num < 0) {
      node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[52];
    } else {
      // var a1 = parseInt(num/16)/16;
      // var b1 = num%16;
      // var i = (b1-1)*13 +(a1-1);
      var i = num - 1;
      node.runAction(cc.sequence(cc.scaleTo(0.25, 1.2, 1.2), cc.scaleTo(0.25, 0, 1.2)));
      this.scheduleOnce(function () {
        node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[i];
        node.runAction(cc.sequence(cc.scaleTo(0.25, 1.2, 1.2), cc.scaleTo(0.25, 1, 1)));
      }, 0.5);
    }
  },
  setPokerVisible: function setPokerVisible(flag) {
    var t = 0.15;

    if (flag) {
      playEffect('SEND_CARD');
    }

    for (var i in this.poker_arr) {
      this.poker_arr[i].active = flag;

      for (var j in this.poker_arr[i].children) {
        this.setPokerSp(i, j, -1);
      }
    }

    for (var i = 0; i < 5; i++) {
      this.setPointView(i, -99);
    }
  },
  setPointView: function setPointView(tag, num) {
    if (num == -99) {
      this.point_node[tag].parent.active = false;
    } else {
      if (num == -1) num = 0;else if (num == 0) num = 10;
      this.point_node[tag].parent.active = true;
      this.point_node[tag].getComponent(cc.Sprite).spriteFrame = this.resultspframe[num];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYWlyZW5uaXVuaXVcXGJhaXJlbm5pdW5pdS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBva2VyX2FyciIsIk5vZGUiLCJjaGlwX2JveCIsImJldF90ZXh0IiwiYmV0X3RleHRfcWlhbmciLCJwbGF5ZXJfbm9kZSIsImhlbHBOb2RlIiwib25saW5lTm9kZSIsInJlY29yZE5vZGUiLCJhbmltZU5vZGVfcGsiLCJhbmltZU5vZGVfc3RhcnQiLCJhbmltZU5vZGVfZW5kIiwiYW5pbWVOb2RlX3dhaXQiLCJjaGlwc19ub2RlIiwiY2FyZHNwZnJhbWUiLCJTcHJpdGVGcmFtZSIsImhlYWRzcGZyYW1lIiwicmVzdWx0c3BmcmFtZSIsInJlc3VsdHNwZnJhbWUwIiwicG9pbnRzcGZyYW1lIiwiY2hpcF9wcmVmYWIiLCJQcmVmYWIiLCJtX2lDdXJyZW50U2VsQmV0IiwibV9pR2FtZU92ZXJUaW1lIiwibV9sUG9vbE51bSIsIm1faVNlbFRhciIsInRhYmxlX3VzZXJpbmZvIiwibV9pUWlhbmdOdW0iLCJtX2lGYXN0TnVtIiwiZGV0YWlsTm9kZSIsInNldHRpbmdnb2xkTm9kZSIsInNldHRpbmdmYXN0Tm9kZSIsInFpYW5nTm9kZSIsInJlY29yZENvbnRlbnQiLCJyZWNvcmRQcmVmYWIiLCJwb2ludF9ub2RlIiwibm9fYmV0X25vZGUiLCJzZXJpYWxpemVVc2VycyIsInVzZXJfb2JqZWN0IiwiZmFyc2VlciIsInNoZW5fc3Vhbl96aSIsInVzZXJJbmZvX2xpc3QiLCJyYW5raW5nX2xpc3QiLCJsZW5ndGgiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJwbGF5ZXJJbmZvRXgiLCJ3aW5kb3ciLCJiYWlyZW5uaXVuaXVfc2MiLCJpbmZvXzAiLCJzY29yZSIsInVzZXJfaWQiLCJpZCIsInVzZXJfbmFtZSIsIm5pY2tuYW1lIiwidXNlcl91cmwiLCJoZWFkaW1ndXJsIiwicHVzaCIsInNwbGljZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbmZvX3giLCJpIiwiaW5mbyIsInBhcnNlSW50Iiwic2V0UGxheWVyVmlldyIsIm9uTG9hZCIsImNoaXBfbmFtZSIsImNoaXBfbnVtcyIsImRlYnVnIiwic2V0RGlzcGxheVN0YXRzIiwiYnJubl9pbnMiLCJwbGF5ZXJJZCIsInBsYXllcl9zY29yZSIsInBsYXllcl9uYW1lIiwicGxheWVyTmFtZSIsInBsYXllckhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJiYWlyZW5uaXVuaXVfZ2xvYmFsIiwicG9rZXJfcG9zIiwicG9zaXRpb24iLCJvcGFjaXR5IiwicmVzZXRwYXJhbSIsIm5ldHdvcmsiLCJhY3RpdmUiLCJzZXRQb2tlclZpc2libGUiLCJMYW5kbG9yZHNTb2NrZXQiLCJlbWl0Iiwic3RhcnQiLCJwbGF5QkdNIiwiaW5pdF9yZWNvcmQiLCJyZXN1bHQiLCJhcnIiLCJnZXRDaGlsZEJ5TmFtZSIsImNoaWxkcmVuIiwibm9kZSIsImluZGV4IiwiY29uc29sZSIsImxvZyIsImoiLCJpdGVtIiwid2luIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJ0b19kb3VibGUiLCJudW0iLCJpbml0X3JlY29yZDIiLCJyZW1vdmVBbGxDaGlsZHJlbiIsInJlcyIsIm9wZW4iLCJvcGVuX3RpbWUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInJlc18iLCJkYXRlIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIkxhYmVsIiwic3RyaW5nIiwiaW5pdF9zdGF0IiwiZ2FtZV90eXBlIiwibm93IiwiYmV0X3RpbWUiLCJxaWFuZ190aW1lIiwiYmV0X2xpc3QiLCJiZXRfcmVzIiwiYmV0X2dvbGQiLCJzZXRQb29sVmlldyIsImZpbmQiLCJIZWxwZXIiLCJmaXhOdW0iLCJ1cGRhdGUiLCJkdCIsInQiLCJwbGF5RWZmZWN0Iiwic3RvcEFsbEFjdGlvbnMiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInNob3ciLCJkZWxheVRpbWUiLCJoaWRlIiwic2V0QmV0VmlldyIsImJldCIsInBvaW50IiwibGFzdFRvdWNoUG9pbnQiLCJzdHIiLCJzZWxiZXQiLCJwYXJhIiwic2hvd0hpbnQiLCJ2MiIsImJldGFycmF5IiwidGFnIiwiaGVhZCIsImhlYWRub2RlIiwic2V0SGVhZFRleHR1cmUiLCJzaG93Q291bnQiLCJsYWJlbF8wIiwibGFiZWxfMSIsInNob3dSZXN1bHQiLCJyZXQiLCJpbnN0YW5jZSIsInVzZXJfd2luIiwicGVyX3RpbWUiLCJuZWVkdGltZSIsInNjaGVkdWxlT25jZSIsInNldFBva2VyU3AiLCJjYXJkcyIsInNldFBvaW50VmlldyIsIm5pdV9qaV9saXN0IiwiY2hpcF9ub2RlIiwib25fcG9vbCIsImluaXRlZCIsImVuZHBvcyIsIm93bmVyIiwibW92ZVRvIiwicmVtb3ZlU2VsZiIsImZhZGVPdXQiLCJvbkJldCIsImNoaXBfc3RhcnRwb3MiLCJjaGlwX2VuZHBvcyIsImVuZG5vZGUiLCJvd25lclRhZyIsInVzZXJJZCIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImVuZHBvc19taW4iLCJjb252ZXJ0VG9Xb3JsZFNwYWNlIiwiZW5kcG9zX21heCIsIngiLCJ5IiwiZW5keCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImVuZHkiLCJzY2FsZSIsImJldEJlZ2luIiwiYmV0QmVnaW5fciIsInRhZ18wIiwic2NhbGVUbyIsImZsYWciLCJxaWFuZ3podWFuZyIsInNldFFpYW5nR29sZFZpZXciLCJFZGl0Qm94Iiwic2V0RmFzdEdvbGRWaWV3IiwiZmFkZUluIiwic2V0emh1YW5nIiwibmFtZSIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBSyxDQUFD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TUFBdEYsR0FBK0Z5QyxHQUFHLENBQUMrQyxJQUFuRztBQUNBcEQsSUFBQUEsY0FBYyxDQUFDLEtBQUtqRSxJQUFMLENBQVVGLGNBQVYsQ0FBeUIsUUFBekIsQ0FBRCxFQUFvQ3dFLEdBQUcsQ0FBQ2dELEdBQXhDLENBQWQ7QUFDSDtBQTkyQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcG9rZXJfYXJyOiAgICBbY2MuTm9kZV0sXG5cbiAgICAgICAgY2hpcF9ib3g6ICAgY2MuTm9kZSxcbiAgICAgICAgYmV0X3RleHQ6ICAgY2MuTm9kZSxcbiAgICAgICAgYmV0X3RleHRfcWlhbmc6ICAgY2MuTm9kZSxcbiAgICAgICAgcGxheWVyX25vZGU6ICAgW2NjLk5vZGVdLFxuICAgICAgICBoZWxwTm9kZTogICBjYy5Ob2RlLFxuICAgICAgICBvbmxpbmVOb2RlOiBjYy5Ob2RlLFxuICAgICAgICByZWNvcmROb2RlOiBjYy5Ob2RlLFxuXG4gICAgICAgIGFuaW1lTm9kZV9wazogICBjYy5Ob2RlLFxuICAgICAgICBhbmltZU5vZGVfc3RhcnQ6ICAgIGNjLk5vZGUsXG4gICAgICAgIGFuaW1lTm9kZV9lbmQ6ICBjYy5Ob2RlLCBcbiAgICAgICAgYW5pbWVOb2RlX3dhaXQ6ICBjYy5Ob2RlLFxuXG4gICAgICAgIGNoaXBzX25vZGU6ICAgICBjYy5Ob2RlLFxuXG4gICAgICAgIGNhcmRzcGZyYW1lOiAgICBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBoZWFkc3BmcmFtZTogICAgW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcmVzdWx0c3BmcmFtZTogICAgW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcmVzdWx0c3BmcmFtZTA6ICAgIFtjYy5TcHJpdGVGcmFtZV0sXG5cbiAgICAgICAgcG9pbnRzcGZyYW1lOiAgIFtjYy5TcHJpdGVGcmFtZV0sXG5cbiAgICAgICAgY2hpcF9wcmVmYWI6W2NjLlByZWZhYl0sXG4gICAgICAgIG1faUN1cnJlbnRTZWxCZXQ6LTEsXG5cbiAgICAgICAgbV9pR2FtZU92ZXJUaW1lOi0xLFxuICAgICAgICBtX2xQb29sTnVtOltdLFxuXG4gICAgICAgIG1faVNlbFRhcjotMSxcblxuICAgICAgICAvLyB1c2VySW5mb19saXN0OltdLFxuICAgICAgICAvLyBmYXJzZWVyOnt9LFxuICAgICAgICB0YWJsZV91c2VyaW5mbzpbXSxcblxuICAgICAgICBtX2lRaWFuZ051bToxMDAwMDAsXG5cbiAgICAgICAgbV9pRmFzdE51bToxLFxuXG4gICAgICAgIGRldGFpbE5vZGUgOmNjLk5vZGUsXG4gICAgICAgIHNldHRpbmdnb2xkTm9kZSA6Y2MuTm9kZSxcbiAgICAgICAgc2V0dGluZ2Zhc3ROb2RlIDpjYy5Ob2RlLFxuICAgICAgICBxaWFuZ05vZGU6Y2MuTm9kZSxcblxuICAgICAgICByZWNvcmRDb250ZW50IDogY2MuTm9kZSxcbiAgICAgICAgcmVjb3JkUHJlZmFiIDogY2MuUHJlZmFiLFxuXG4gICAgICAgIHBvaW50X25vZGU6ICAgW2NjLk5vZGVdLFxuICAgICAgICBub19iZXRfbm9kZTogICAgW2NjLk5vZGVdLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIHNlcmlhbGl6ZVVzZXJzKHVzZXJfb2JqZWN0KVxuICAgIHtcbiAgICAgICAgLy8w6Ieq5bexIDHnpZ7nrpcgMummluWvjCAzLTblhbbku5ZcbiAgICAgICAgLy9iZXRfc2NvcmVcbiAgICAgICAgLy9zY29yZVxuICAgICAgICAvL3VzZXJfaWRcbiAgICAgICAgLy91c2VyX25hbWVcbiAgICAgICAgLy91c2VyX3VybFxuICAgICAgICAvL3dpbl9udW1cblxuICAgICAgICB0aGlzLmZhcnNlZXIgPSB1c2VyX29iamVjdC5zaGVuX3N1YW5femk7XG4gICAgICAgIHRoaXMudXNlckluZm9fbGlzdCA9IHVzZXJfb2JqZWN0LnJhbmtpbmdfbGlzdDtcbiAgICAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm8gLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xuICAgICAgICAgICAgdmFyIHBsYXllckluZm9FeCA9IHdpbmRvdy5iYWlyZW5uaXVuaXVfc2M7XG4gICAgICAgICAgICB2YXIgaW5mb18wID0ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiBwbGF5ZXJJbmZvRXguc2NvcmUsXG4gICAgICAgICAgICAgICAgdXNlcl9pZDogcGxheWVySW5mb0V4LmlkLFxuICAgICAgICAgICAgICAgIHVzZXJfbmFtZTogcGxheWVySW5mb0V4Lm5pY2tuYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJfdXJsOiBwbGF5ZXJJbmZvRXguaGVhZGltZ3VybH07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2goaW5mb18wKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnNwbGljZSgxLHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoLTEpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh1c2VyX29iamVjdC5zaGVuX3N1YW5femkpICE9IFwie31cIilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mby5wdXNoKHVzZXJfb2JqZWN0LnNoZW5fc3Vhbl96aSk7XG4gICAgICAgIH1lbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpbmZvX3ggPSB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IFwiXCIsXG4gICAgICAgICAgICAgICAgdXNlcl9pZDogLTEsXG4gICAgICAgICAgICAgICAgdXNlcl9uYW1lOiBcIuepuue8ulwiLFxuICAgICAgICAgICAgICAgIHVzZXJfdXJsOiAtMX07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2goaW5mb194KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgaW4gdXNlcl9vYmplY3QucmFua2luZ19saXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW5mbyA9IHVzZXJfb2JqZWN0LnJhbmtpbmdfbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChpbmZvLnVzZXJfaWQgPT0gdGhpcy50YWJsZV91c2VyaW5mb1sxXS51c2VyX2lkICYmIHBhcnNlSW50KGkpIT0wKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGluZm8udXNlcl9pZCA9PSB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnVzZXJfaWQgJiYgcGFyc2VJbnQoaSkhPTApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cblxuICAgICAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mby5wdXNoKGluZm8pO1xuICAgICAgICAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoPj03KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoOyBpPDcgO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGluZm9feCA9IHtcbiAgICAgICAgICAgICAgICBzY29yZTogXCJcIixcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiAtMSxcbiAgICAgICAgICAgICAgICB1c2VyX25hbWU6IFwi56m657y6XCIsXG4gICAgICAgICAgICAgICAgdXNlcl91cmw6IC0xfTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfdXNlcmluZm8ucHVzaChpbmZvX3gpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KCk7XG4gICAgfSxcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgdGhpcy5jaGlwX25hbWUgPSB7MTAwOlwiYnRfc2NvcmVfMF8wXCIsXG4gICAgICAgIDEwMDA6XCJidF9zY29yZV8xXzBcIixcbiAgICAgICAgNTAwMDpcImJ0X3Njb3JlXzJfMFwiLFxuICAgICAgICAxMDAwMDpcImJ0X3Njb3JlXzNfMFwiLFxuICAgICAgICA1MDAwMDpcImJ0X3Njb3JlXzRfMFwifTtcbiAgICAgICAgdGhpcy5jaGlwX251bXMgPSBbMTAwLDEwMDAsNTAwMCwxMDAwMCw1MDAwMF07ICAgIFxuICAgICAgICBjYy5kZWJ1Zy5zZXREaXNwbGF5U3RhdHMoZmFsc2UpO1xuICAgICAgICB3aW5kb3cuYnJubl9pbnMgPSB0aGlzO1xuICAgICAgICB2YXIgcGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XG4gICAgICAgIHZhciBwbGF5ZXJJbmZvRXggPSB3aW5kb3cuYmFpcmVubml1bml1X3NjO1xuICAgICAgICB0aGlzLnBsYXllcklkID0gcGxheWVySW5mb0V4LmlkO1xuICAgICAgICB0aGlzLnBsYXllcl9zY29yZSA9IHBsYXllckluZm9FeC5zY29yZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJfbmFtZSA9IHBsYXllckluZm8ucGxheWVyTmFtZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gcGxheWVySW5mby5wbGF5ZXJIZWFkO1xuICAgICAgICB0aGlzLnBsYXllckhlYWRJZCA9IHBsYXllckluZm8ucGxheWVySGVhZElkO1xuXG4gICAgICAgIHRoaXMubV9sUG9vbE51bSA9Wy0xLDAsMCwwLDBdO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZVVzZXJzKHdpbmRvdy5iYWlyZW5uaXVuaXVfZ2xvYmFsLnVzZXJJbmZvX2xpc3QpO1xuXG5cbiAgICAgICAgdGhpcy5wb2tlcl9wb3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBva2VyX2FycilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wb2tlcl9wb3NbaV0gPSB0aGlzLnBva2VyX2FycltpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMucG9rZXJfcG9zW2ldLm9wYWNpdHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMucmVzZXRwYXJhbSgpO1xuICAgICAgICB0aGlzLm5ldHdvcmsgPSByZXF1aXJlKCdiYWlyZW5uaXVuaXVOZXRXb3JrJykuZ2V0SW5zdGFudDtcbiAgICAgICAgdGhpcy5iZXRfdGV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iZXRfdGV4dF9xaWFuZy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMubm9fYmV0X25vZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubm9fYmV0X25vZGVbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFBva2VyVmlzaWJsZShmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KCdnZXRHYW1lVHlwZScsICcnKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0R2FtZVJlY29yZExpc3RcIixcIlwiKTtcbiAgICAgICAgdGhpcy5hbmltZU5vZGVfd2FpdC5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHBsYXlCR00oJ2JnJyk7XG4gICAgfSxcblxuICAgIGluaXRfcmVjb3JkKHJlc3VsdCl7XG5cbiAgICAgICAgdmFyIGFyciA9IHRoaXMucmVjb3JkTm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW1fbHVkYW5fYmcnKS5nZXRDaGlsZEJ5TmFtZSgnamlsdV9saXN0JykuY2hpbGRyZW47XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiBhcnIpLy89IGFyci5sZW5ndGgtMTtpPj0wO2ktLSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBhcnJbaV07XG4gICAgICAgICAgICB2YXIgaW5kZXggPSByZXN1bHQubGVuZ3RoLWFyci5sZW5ndGggK3BhcnNlSW50KGkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICAgICAgaWYgKGluZGV4PDApe1xuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBub2RlLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2luZGV4XS53aW5bal0+MClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucmVzdWx0c3BmcmFtZTBbMF07XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucmVzdWx0c3BmcmFtZTBbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YXIgYXJyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGRfYmdcIikuY2hpbGRyZW47XG5cbiAgICAgICAgLy8gZm9yICh2YXIgaSBpbiBhcnIpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIGFycltpXS5nZXRDaGlsZEJ5TmFtZSgnamdfaGUnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIGFycltpXS5nZXRDaGlsZEJ5TmFtZSgnamdfZGEnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBmb3IgKHZhciBpID0gcmVzdWx0Lmxlbmd0aC0xO2k+PTA7aS0tKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB2YXIgcmVzID0gcmVzdWx0W2ldLndpbjtcbiAgICAgICAgLy8gICAgIHZhciBudW0gPSBhcnIubGVuZ3RoLTEgLSAocmVzdWx0Lmxlbmd0aC0xIC0gcGFyc2VJbnQoaSkpO1xuICAgICAgICAvLyAgICAgaWYgKG51bTwwKWJyZWFrO1xuICAgICAgICAvLyAgICAgdmFyIG5vZGUgPSBhcnJbbnVtXS5nZXRDaGlsZEJ5TmFtZSgnamdfZGEnKTtcbiAgICAgICAgLy8gICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJlc3VsdHNwZnJhbWVbcmVzXTtcblxuICAgICAgICAvLyAgICAgdmFyIG5vZGUwID0gYXJyW251bV0uZ2V0Q2hpbGRCeU5hbWUoJ2pnX2hlJyk7XG4gICAgICAgIC8vICAgICBub2RlMC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgaWYgKHJlc3VsdFtpXS56aHVhbmdzY29yZT4wKVxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIG5vZGUwLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yZXN1bHRzcGZyYW1lMFswXTtcbiAgICAgICAgLy8gICAgIH1lbHNlIGlmIChyZXN1bHRbaV0uemh1YW5nc2NvcmU8MClcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBub2RlMC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucmVzdWx0c3BmcmFtZTBbMV07XG4gICAgICAgIC8vICAgICB9ZWxzZXtcbiAgICAgICAgLy8gICAgICAgICBub2RlMC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucmVzdWx0c3BmcmFtZTBbMl07XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0aGlzLmluaXRfcmVjb3JkMihyZXN1bHQpO1xuICAgIH0sXG5cbiAgICB0b19kb3VibGUobnVtKXtcbiAgICAgICAgaWYgKG51bTwxMCkgcmV0dXJuICcwJytudW07XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfSxcblxuICAgIGluaXRfcmVjb3JkMihyZXN1bHQpe1xuICAgICAgICB0aGlzLnJlY29yZENvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHJlc3VsdC5sZW5ndGgtMTtpPj0wO2ktLSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IHJlc3VsdFtpXS53aW47XG4gICAgICAgICAgICB2YXIgb3BlbiA9IHJlc3VsdFtpXS5vcGVuX3RpbWU7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVjb3JkUHJlZmFiKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5yZWNvcmRDb250ZW50O1xuXG4gICAgICAgICAgICB2YXIgcmVzXyA9ICcnXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG9wZW4pIDsgXG4gICAgICAgICAgICByZXNfID0gIGRhdGUuZ2V0RnVsbFllYXIoKSsnLycrdGhpcy50b19kb3VibGUoZGF0ZS5nZXRNb250aCgpKzEpK1wiL1wiK3RoaXMudG9fZG91YmxlKGRhdGUuZ2V0RGF0ZSgpKSsnICcrdGhpcy50b19kb3VibGUoZGF0ZS5nZXRIb3VycygpKStcIjpcIit0aGlzLnRvX2RvdWJsZShkYXRlLmdldE1pbnV0ZXMoKSkrXCI6XCIrdGhpcy50b19kb3VibGUoZGF0ZS5nZXRTZWNvbmRzKCkpO1xuXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlc187Ly9uZXcgRGF0ZShvcGVuKS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmFvJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdkYScpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgneGlhbycpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHJlcyA9PSAwKXtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdiYW8nKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHJlcyA9PSAxKXtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdkYScpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZSBpZiAocmVzID09IDIpe1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3hpYW8nKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBpbml0X3N0YXQocmVzdWx0KXtcbiAgICAgICAgaWYgKHJlc3VsdC5nYW1lX3R5cGUgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gaWYgKHJlc3VsdC5iZXRfdGltZSA9PSAzMClcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJldEJlZ2luKCk7XG4gICAgICAgICAgICAvLyB9ZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuYmV0X3RleHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1faUdhbWVPdmVyVGltZSA9IERhdGUubm93KCkvMTAwMCtyZXN1bHQuYmV0X3RpbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltZU5vZGVfd2FpdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0UG9rZXJWaXNpYmxlKHRydWUpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMubm9fYmV0X25vZGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub19iZXRfbm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSBcbiAgICAgICAge1xuICAgICAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCLlvZPliY3nirbmgIHmlofmnKxcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIGZvciAodmFyIGkgaW4gdGhpcy5wb2tlcl9hcnIpXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl9hcnJbaV0ub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0LmdhbWVfdHlwZSA9PSA0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnFpYW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iZXRfdGV4dF9xaWFuZy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tX2lHYW1lT3ZlclRpbWUgPSBEYXRlLm5vdygpLzEwMDArcmVzdWx0LnFpYW5nX3RpbWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5xaWFuZ05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpIGluIHJlc3VsdC5iZXRfbGlzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tX2xQb29sTnVtW3Jlc3VsdC5iZXRfbGlzdFtpXS5iZXRfcmVzXSArPSByZXN1bHQuYmV0X2xpc3RbaV0uYmV0X2dvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb29sVmlldygpO1xuICAgIH0sXG5cbiAgICBzZXRQb29sVmlldygpXG4gICAge1xuICAgICAgICAvLyBmb3IgKHZhciBpID0wO2k8MztpKyspXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1haW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJjaGlwX2JnX1wiK2kpLmdldENoaWxkQnlOYW1lKFwicG9vbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMubV9sUG9vbE51bVtpXTsgICAgXG4gICAgICAgIC8vIH1cblxuICAgICAgICBjYy5maW5kKCdDYW52YXMvaW1fZ2FtZV9iZy9nYW1lc19idG5fdGlhbl9ub3JtYWwvbHVja3lTdGFyL3hpYXpodV9nb2xkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKHRoaXMubV9sUG9vbE51bVsxXSk7XG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9pbV9nYW1lX2JnL2dhbWVzX2J0bl9kaV9ub3JtYWwvbHVja3lTdGFyL3hpYXpodV9nb2xkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKHRoaXMubV9sUG9vbE51bVsyXSk7XG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9pbV9nYW1lX2JnL2dhbWVzX2J0bl94dWFuX25vcm1hbC9sdWNreVN0YXIveGlhemh1X2dvbGQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5tX2xQb29sTnVtWzNdKTtcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL2ltX2dhbWVfYmcvZ2FtZXNfYnRuX2h1YW5nX25vcm1hbC9sdWNreVN0YXIveGlhemh1X2dvbGQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5tX2xQb29sTnVtWzRdKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIHVwZGF0ZShkdCl7XG4gICAgICAgIGlmICh0aGlzLm1faUdhbWVPdmVyVGltZSAmJiB0aGlzLmJldF90ZXh0LmFjdGl2ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHQgPSBwYXJzZUludCh0aGlzLm1faUdhbWVPdmVyVGltZSAtIERhdGUubm93KCkvMTAwMCk7XG5cbiAgICAgICAgICAgIGlmICh0PD01ICYmIHQrXCJcIiAhPSB0aGlzLmJldF90ZXh0LmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdjb3VudGRvd24nKTtcbiAgICAgICAgICAgICAgICBpZiAodCA9PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheUVmZmVjdCgnc3RvcF9zJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWVOb2RlX2VuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1lTm9kZV9lbmQuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltZU5vZGVfZW5kLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zaG93KCksY2MuZGVsYXlUaW1lKDEuMiksY2MuaGlkZSgpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodDw9MCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmV0X3RleHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iZXRfdGV4dC5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0O1xuICAgICAgICAgICAgLy90aGlzLmJldF90ZXh0X2Rvd24uZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMubV9pR2FtZU92ZXJUaW1lICYmIHRoaXMuYmV0X3RleHRfcWlhbmcuYWN0aXZlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdCA9IHBhcnNlSW50KHRoaXMubV9pR2FtZU92ZXJUaW1lIC0gRGF0ZS5ub3coKS8xMDAwKTtcblxuICAgICAgICAgICAgaWYgKHQ8PTApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJldF90ZXh0X3FpYW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmV0X3RleHRfcWlhbmcuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdDtcbiAgICAgICAgICAgIC8vdGhpcy5iZXRfdGV4dF9kb3duLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHQ7XG4gICAgICAgIH1cblxuXG4gICAgfSxcblxuICAgIHJlc2V0cGFyYW0oKVxuICAgIHtcbiAgICAgICAgdGhpcy5tX2lDdXJyZW50U2VsQmV0ID0gLTE7XG4gICAgICAgIHRoaXMuc2V0QmV0VmlldygpO1xuICAgICAgICB0aGlzLnNldFBsYXllclZpZXcoKTtcbiAgICB9LFxuXG4gICAgYmV0KG51bSxwb2ludClcbiAgICB7XG4gICAgICAgIHRoaXMubGFzdFRvdWNoUG9pbnQgPSBwb2ludDtcbiAgICAgICAgaWYgKHRoaXMubV9pQ3VycmVudFNlbEJldCA9PSAtMSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICBzdHIgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAvL2JldF90eXBlOiAxLFxuICAgICAgICAgICAgYmV0X3JlczogcGFyc2VJbnQobnVtKSxcbiAgICAgICAgICAgIGJldF9nb2xkOiB0aGlzLm1faUN1cnJlbnRTZWxCZXQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdCgnbG90dGVyeScsIHN0cik7XG5cbiAgICAgICAgdGhpcy5zZXRCZXRWaWV3KCk7XG4gICAgfSxcblxuICAgIHNlbGJldChwYXJhKXtcbiAgICAgICAgaWYgKHBhcmEgPT0gXCJhbGxcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMubV9pU2VsVGFyPDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93SGludCgn6K+35YWI6YCJ5oup5LiA5qyh5aSn5bCPJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAgICBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFRvdWNoUG9pbnQgPSBjYy52MigwLDApO1xuICAgICAgICAgICAgICAgIHZhciAgc3RyID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAvL2JldF90eXBlOiAxLFxuICAgICAgICAgICAgICAgICAgICBiZXRfcmVzOiB0aGlzLm1faVNlbFRhcixcbiAgICAgICAgICAgICAgICAgICAgYmV0X2dvbGQ6IHRoaXMubV9pRmFzdE51bSoxMDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdCgnbG90dGVyeScsIHN0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHBhcmEpO1xuICAgICAgICBpZiAodGhpcy5tX2lDdXJyZW50U2VsQmV0ID09IG51bSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tX2lDdXJyZW50U2VsQmV0ID0gLTE7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUgPCBudW0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheUVmZmVjdCgnY2hpcCcpO1xuICAgICAgICAgICAgdGhpcy5tX2lDdXJyZW50U2VsQmV0ID0gbnVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QmV0VmlldygpO1xuICAgIH0sXG4gICAgc2V0QmV0VmlldygpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5tX2lDdXJyZW50U2VsQmV0ID4gdGhpcy50YWJsZV91c2VyaW5mb1swXS5zY29yZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tX2lDdXJyZW50U2VsQmV0ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJldGFycmF5ID0gdGhpcy5jaGlwX2JveC5jaGlsZHJlbjtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBiZXRhcnJheSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBiZXRhcnJheVtpXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2hpcF9udW1zW2ldIDw9IHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMTI4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jaGlwX251bXNbaV0gPT0gdGhpcy5tX2lDdXJyZW50U2VsQmV0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NoZWNrbWFyaycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdjaGVja21hcmsnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRQbGF5ZXJWaWV3KClcbiAgICB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndWknKS5nZXRDaGlsZEJ5TmFtZShcImhlYWRcIikuZ2V0Q2hpbGRCeU5hbWUoXCLph5HluIFpY29uXCIpLmdldENoaWxkQnlOYW1lKFwi6YeR5biB5pWwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bSh0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd1aScpLmdldENoaWxkQnlOYW1lKFwiaGVhZFwiKS5nZXRDaGlsZEJ5TmFtZShcIueOqeWutuWQjVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMudGFibGVfdXNlcmluZm9bMF0udXNlcl9uYW1lO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VpJykuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkXCIpLmdldENoaWxkQnlOYW1lKFwiSURcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIklEOlwiICsgdGhpcy50YWJsZV91c2VyaW5mb1swXS51c2VyX2lkO1xuICAgICAgICAvLyBzZXRIZWFkVGV4dHVyZSh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VpJykuZ2V0Q2hpbGRCeU5hbWUoJ2hlYWQnKSx0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnVzZXJfdXJsKTtcblxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMucGxheWVyX25vZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSBwYXJzZUludChpKTtcbiAgICAgICAgICAgIHZhciBpbmZvO1xuICAgICAgICAgICAgaWYgKHRhZyA+PSB0aGlzLnRhYmxlX3VzZXJpbmZvLmxlbmd0aClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2luZm8gPSB7fTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLnRhYmxlX3VzZXJpbmZvW3RhZ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBsYXllcl9ub2RlW3RhZ10uZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaW5mby51c2VyX25hbWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZVt0YWddLmdldENoaWxkQnlOYW1lKFwiZ29sZF9iYXJcIikpXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZVt0YWddLmdldENoaWxkQnlOYW1lKFwiZ29sZF9iYXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bShpbmZvLnNjb3JlKTtcblxuICAgICAgICAgICAgdmFyIGhlYWQgPSBpbmZvLnVzZXJfdXJsO1xuICAgICAgICAgICAgdmFyIGhlYWRub2RlID0gdGhpcy5wbGF5ZXJfbm9kZVt0YWddO1xuICAgICAgICAgICAgaWYgKGhlYWQgPCAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhlYWQgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICBpZiAoaGVhZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VyX3podWFuZ2ppYVwiKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBoZWFkbm9kZSA9IGhlYWRub2RlLmdldENoaWxkQnlOYW1lKFwidXNlcl96aHVhbmdqaWFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2hlYWRub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5oZWFkc3BmcmFtZVtoZWFkXTtcbiAgICAgICAgICAgIHNldEhlYWRUZXh0dXJlKGhlYWRub2RlLGhlYWQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3dDb3VudChzY29yZSlcbiAgICB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwi57uT5p6cXCIpO1xuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciBsYWJlbF8wID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXzBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzY29yZT4wKVxuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbF8wLnN0cmluZyA9IFwi5oKo6LWi5b6X5LqGIFwiK0hlbHBlci5maXhOdW0oc2NvcmUpO1xuICAgICAgICB9ZWxzZSBpZiAoc2NvcmU8MClcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWxfMC5zdHJpbmcgPSBcIuaCqOi+k+aOieS6hiBcIitIZWxwZXIuZml4TnVtKC0xKnNjb3JlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsYWJlbF8wLnN0cmluZyA9IFwi5oKo5rKh5pyJ6L6T6LWiXCI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBsYWJlbF8xID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXzFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWxfMS5zdHJpbmcgPSBcIuW9k+WJjSBcIiArIEhlbHBlci5maXhOdW0odGhpcy50YWJsZV91c2VyaW5mb1swXS5zY29yZSk7XG5cbiAgICB9LFxuICAgIHNob3dSZXN1bHQocmV0KVxuICAgIHtcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgLy8wMTIg6b6Z6JmO5ZKMIDEyMzQg6buR57qi6Iqx54mHXG4gICAgICAgIC8vdmFyIHNhbSA9IHtodV9jYXJkOjIzMDcsbG9uZ19jYXJkOjI1OCxSZXN1bHRDb2RlOjEsd2luOjF9O1xuXG4gICAgICAgIHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUgKz0gcmV0LnVzZXJfd2luO1xuXG4gICAgICAgIC8vdmFyIHNjb3JlX2NoYW5nZSA9IHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUgLSB0aGlzLnBsYXllcl9zY29yZTtcblxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgdGhpcy5zaG93Q291bnQoc2NvcmVfY2hhbmdlKTtcbiAgICAgICAgLy8gfSw0LjApO1xuXG4gICAgICAgIHRoaXMucGxheWVyX3Njb3JlID0gdGhpcy50YWJsZV91c2VyaW5mb1swXS5zY29yZTtcblxuICAgICAgICB2YXIgcGVyX3RpbWUgPSAxO1xuICAgICAgICB2YXIgbmVlZHRpbWUgPSAxLjU7IFxuXG4gICAgICAgIC8vcmV0Lndpbl9yZXNbMF07XG4gICAgICAgIC8vcmV0LndpbjtcbiBcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7aTw1O2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBva2VyU3AoMCxpLHJldC5jYXJkc1swXVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0scGVyX3RpbWUpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxO2o8NTtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7aTw1O2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9rZXJTcChqLGkscmV0LmNhcmRzW2pdW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFBvaW50VmlldygwLHJldC5uaXVfamlfbGlzdFswXSk7XG4gICAgICAgIH0scGVyX3RpbWUqMik7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7ajw1O2orKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvaW50VmlldyhqLHJldC5uaXVfamlfbGlzdFtqXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9LHBlcl90aW1lKjMpO1xuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpeyAgXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IHRoaXMuY2hpcHNfbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGFycilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlwX25vZGUgPSBhcnJbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlwX25vZGUub25fcG9vbCA9PSByZXQud2luKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaXBfbm9kZS5vd25lciA9PSB0aGlzLnBsYXllcklkKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kcG9zID0gY2MudjIoNjkzLDYxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4yNSxlbmRwb3MpLGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMjUpLGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaXBfbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZU91dCgwLjIpLGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxwZXJfdGltZSo1KTtcblxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KDApO1xuICAgICAgICAgICAgICAgIGlmIChyZXQudXNlcl93aW4+MClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ0FERF9TQ09SRScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldEdhbWVSZWNvcmRMaXN0XCIsXCJcIik7XG4gICAgICAgICAgICB9LHBlcl90aW1lKjUrMC4yKTtcblxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5zZXRQb2tlclZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZShcIuW9k+WJjeeKtuaAgeaWh+acrFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGluc3RhbmNlLm1fbFBvb2xOdW0gPSBbLTEsMCwwLDAsMF07XG5cbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5zZXRQb29sVmlldygpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5ub19iZXRfbm9kZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9fYmV0X25vZGVbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWVOb2RlX3dhaXQuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSxwZXJfdGltZSoxMCswLjgpO1xuICAgIH0sXG5cbiAgICBvbkJldChpbmZvKXtcbiAgICAgICAgLy8gaW5mby5iZXRfcmVzO1xuICAgICAgICAvLyBpbmZvLmJldF9nb2xkO1xuICAgICAgICAvLyBpbmZvLnVzZXJJZDtcblxuICAgICAgICBwbGF5RWZmZWN0KCdjaG91bWF4aWF6aHUnKTtcbiAgICAgICAgdGhpcy5tX2xQb29sTnVtW2luZm8uYmV0X3Jlc10gKz0gaW5mby5iZXRfZ29sZDtcbiAgICAgICAgdGhpcy5zZXRQb29sVmlldygpO1xuXG4gICAgICAgIHZhciBjaGlwX3N0YXJ0cG9zO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNoaXBfZW5kcG9zO1xuXG4gICAgICAgIHZhciBpbml0ZWQgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZW5kbm9kZSA7XG4gICAgICAgIGlmIChpbmZvLmJldF9yZXMgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgZW5kbm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9pbV9nYW1lX2JnL2dhbWVzX2J0bl90aWFuX25vcm1hbCcpO1xuICAgICAgICB9ZWxzZSBpZiAoaW5mby5iZXRfcmVzID09IDIpe1xuICAgICAgICAgICAgZW5kbm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9pbV9nYW1lX2JnL2dhbWVzX2J0bl9kaV9ub3JtYWwnKTtcbiAgICAgICAgfWVsc2UgaWYgKGluZm8uYmV0X3JlcyA9PSAzKXtcbiAgICAgICAgICAgIGVuZG5vZGUgPSBjYy5maW5kKCdDYW52YXMvaW1fZ2FtZV9iZy9nYW1lc19idG5feHVhbl9ub3JtYWwnKTtcbiAgICAgICAgfWVsc2UgaWYgKGluZm8uYmV0X3JlcyA9PSA0KXtcbiAgICAgICAgICAgIGVuZG5vZGUgPSBjYy5maW5kKCdDYW52YXMvaW1fZ2FtZV9iZy9nYW1lc19idG5faHVhbmdfbm9ybWFsJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3duZXJUYWcgPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnRhYmxlX3VzZXJpbmZvKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJsZV91c2VyaW5mb1tpXS51c2VyX2lkK1wiXCIgPT0gaW5mby51c2VySWQrXCJcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvd25lclRhZyA9IHBhcnNlSW50KGkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnRhYmxlX3VzZXJpbmZvKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJsZV91c2VyaW5mb1tpXS51c2VyX2lkK1wiXCIgPT0gaW5mby51c2VySWQrXCJcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvW2ldLnNjb3JlIC09IGluZm8uYmV0X2dvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KCk7XG5cbiAgICAgICAgaWYgKG93bmVyVGFnID09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJfc2NvcmUgLT0gaW5mby5iZXRfZ29sZDtcbiAgICAgICAgICAgIHRoaXMubm9fYmV0X25vZGVbaW5mby5iZXRfcmVzLTFdLmFjdGl2ZSA9ZmFsc2U7XG4gICAgICAgICAgICBpbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuY2hpcF9udW1zLmxlbmd0aC0xO2k+PTA7aS0tKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaXBfbnVtc1tpXSA8PSBpbmZvLmJldF9nb2xkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY2hpcF9zdGFydHBvcyA9IHRoaXMuY2hpcF9ib3guZ2V0Q2hpbGRCeU5hbWUodGhpcy5jaGlwX25hbWVbdGhpcy5jaGlwX251bXNbaW5kZXhdXSkuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy92YXIgZW5kcG9zX21pZCA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pZCcpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICB2YXIgZW5kcG9zX21pbiA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pbicpLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgdmFyIGVuZHBvc19tYXggPSBlbmRub2RlLmdldENoaWxkQnlOYW1lKCdtYXgnKS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdFRvdWNoUG9pbnQueCA+PWVuZHBvc19taW4ueCAmJiB0aGlzLmxhc3RUb3VjaFBvaW50LnkgPj1lbmRwb3NfbWluLnlcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmxhc3RUb3VjaFBvaW50LnggPD1lbmRwb3NfbWF4LnggJiYgdGhpcy5sYXN0VG91Y2hQb2ludC55IDw9ZW5kcG9zX21heC55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlbmR4ID0gdGhpcy5sYXN0VG91Y2hQb2ludC54ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYwKS0zMDtcbiAgICAgICAgICAgICAgICB2YXIgZW5keSA9IHRoaXMubGFzdFRvdWNoUG9pbnQueSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo2MCktMzA7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW5keCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooZW5kcG9zX21heC54LWVuZHBvc19taW4ueCkpICsgZW5kcG9zX21pbi54O1xuICAgICAgICAgICAgICAgIHZhciBlbmR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihlbmRwb3NfbWF4LnktZW5kcG9zX21pbi55KSkgKyBlbmRwb3NfbWluLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaXBfZW5kcG9zID0gY2MudjIoZW5keCxlbmR5KTtcblxuICAgICAgICB9XG4gICAgICAgIC8vIGVsc2UgaWYgKG93bmVyVGFnIT0gLTEpXG4gICAgICAgIC8vIHtcblxuICAgICAgICAvLyB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy92YXIgZW5kcG9zX21pZCA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pZCcpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICB2YXIgZW5kcG9zX21pbiA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pbicpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICB2YXIgZW5kcG9zX21heCA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21heCcpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG5cblxuICAgICAgICAgICAgdmFyIGVuZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGVuZHBvc19tYXgueC1lbmRwb3NfbWluLngpKSArIGVuZHBvc19taW4ueDtcbiAgICAgICAgICAgIHZhciBlbmR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihlbmRwb3NfbWF4LnktZW5kcG9zX21pbi55KSkgKyBlbmRwb3NfbWluLnk7XG5cbiAgICAgICAgICAgIGNoaXBfZW5kcG9zID0gY2MudjIoZW5keCxlbmR5KTtcblxuICAgICAgICAgICAgY2hpcF9zdGFydHBvcyA9IGNoaXBfZW5kcG9zO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5pdGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuY2hpcF9udW1zLmxlbmd0aC0xO2k+PTA7aS0tKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaXBfbnVtc1tpXSA8PSBpbmZvLmJldF9nb2xkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMuY2hpcF9udW1zLmluZGV4T2YoaW5mby5iZXRfZ29sZClcbiAgICAgICAgICAgIHZhciBjaGlwX25vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNoaXBfcHJlZmFiW2luZGV4XSk7XG4gICAgICAgICAgICBjaGlwX25vZGUueCA9IGNoaXBfc3RhcnRwb3MueDtcbiAgICAgICAgICAgIGNoaXBfbm9kZS55ID0gY2hpcF9zdGFydHBvcy55O1xuICAgICAgICAgICAgY2hpcF9ub2RlLnNjYWxlID0gMC40O1xuICAgICAgICAgICAgY2hpcF9ub2RlLnBhcmVudCA9IHRoaXMuY2hpcHNfbm9kZTtcbiAgICAgICAgICAgIGNoaXBfbm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMjUsY2hpcF9lbmRwb3MueCxjaGlwX2VuZHBvcy55KSk7XG5cbiAgICAgICAgICAgIGNoaXBfbm9kZS5vd25lciA9IGluZm8udXNlcklkO1xuICAgICAgICAgICAgY2hpcF9ub2RlLm9uX3Bvb2wgPSBpbmZvLmJldF9yZXM7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmV0QmVnaW4oKVxuICAgIHtcbiAgICAgICAgLy90aGlzLm5ldHdvcmsuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJnZXRHYW1lUmFua2luZ0xpc3RcIixcIlwiKTtcbiAgICAgICAgdGhpcy5iZXRCZWdpbl9yKCk7XG4gICAgfSxcblxuICAgIGJldEJlZ2luX3IoKVxuICAgIHtcblxuICAgICAgICB0aGlzLmFuaW1lTm9kZV93YWl0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvL3ZhciBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwi57uT5p6cXCIpO1xuICAgICAgICAvL25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHBsYXlFZmZlY3QoJ3N0YXJ0X3MnKTtcbiAgICAgICAgdGhpcy5tX2xQb29sTnVtID0gWy0xLDAsMCwwLDBdO1xuICAgICAgICB0aGlzLnNldFBvb2xWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5xaWFuZ05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwi5b2T5YmN54q25oCB5paH5pysXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1faUdhbWVPdmVyVGltZSA9IERhdGUubm93KCkvMTAwMCsxNTtcblxuICAgICAgICBsZXQgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICAvL3ZhciBza2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xoZHBrJyk7XG4gICAgICAgIC8vIHNrZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgc2tlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0UG9rZXJWaXNpYmxlKHRydWUpO1xuXG4gICAgICAgICAgICAvLyB2YXIgc3RhcnQgPSBpbnN0YW5jZS5ub2RlLmdldENoaWxkQnlOYW1lKCdhbmltX3N0YXJ0Jyk7XG4gICAgICAgICAgICAvLyBzdGFydC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gaW5zdGFuY2UuYW5pbWVOb2RlX3N0YXJ0O1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmJldF90ZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwxLjApO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIHN0YXJ0LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIHNrZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5ub19iZXRfbm9kZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ub19iZXRfbm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFBva2VyU3AodGFnLHRhZ18wLG51bSlcbiAgICB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5wb2tlcl9hcnJbdGFnXS5jaGlsZHJlblt0YWdfMF07XG5cbiAgICAgICAgaWYgKG51bTwwKVxuICAgICAgICB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5jYXJkc3BmcmFtZVs1Ml07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gdmFyIGExID0gcGFyc2VJbnQobnVtLzE2KS8xNjtcbiAgICAgICAgICAgIC8vIHZhciBiMSA9IG51bSUxNjtcbiAgICAgICAgICAgIC8vIHZhciBpID0gKGIxLTEpKjEzICsoYTEtMSk7XG4gICAgICAgICAgICB2YXIgaSA9IG51bS0xO1xuICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjI1LDEuMiwxLjIpLGNjLnNjYWxlVG8oMC4yNSwwLDEuMikpKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuY2FyZHNwZnJhbWVbaV07XG4gICAgICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjI1LDEuMiwxLjIpLGNjLnNjYWxlVG8oMC4yNSwxLDEpKSk7XG4gICAgICAgICAgICB9LDAuNSk7XG4gICAgICAgIH1cbn0sXG5cbiAgICBzZXRQb2tlclZpc2libGUoZmxhZylcbiAgICB7XG4gICAgICAgIHZhciB0ID0gMC4xNTtcbiAgICAgICAgaWYgKGZsYWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ1NFTkRfQ0FSRCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBva2VyX2FycilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbaV0uYWN0aXZlID0gZmxhZztcbiAgICAgICAgICAgIGZvciAodmFyIGogaW4gdGhpcy5wb2tlcl9hcnJbaV0uY2hpbGRyZW4pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKGksaiwtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDtpPDU7aSsrKXtcbiAgICAgICAgICAgIHRoaXMuc2V0UG9pbnRWaWV3KGksLTk5KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRQb2ludFZpZXcodGFnLG51bSl7XG4gICAgICAgIGlmIChudW0gPT0tOTkpe1xuICAgICAgICAgICAgdGhpcy5wb2ludF9ub2RlW3RhZ10ucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmIChudW0gPT0gLTEpIG51bSA9IDA7XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT0gMCkgbnVtID0xMDtcbiAgICAgICAgICAgIHRoaXMucG9pbnRfbm9kZVt0YWddLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wb2ludF9ub2RlW3RhZ10uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJlc3VsdHNwZnJhbWVbbnVtXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBxaWFuZ3podWFuZygpXG4gICAge1xuICAgICAgICB0aGlzLm5ldHdvcmsuTGFuZGxvcmRzU29ja2V0LmVtaXQoJ3FpYW5nWmh1YW5nJywgJycpO1xuICAgIH0sXG5cbiAgICBzZXRRaWFuZ0dvbGRWaWV3KClcbiAgICB7XG4gICAgICAgIHRoaXMuc2V0dGluZ2dvbGROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy/miqLluoRVSS/ovpPlhaUnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nID0gdGhpcy5tX2lRaWFuZ051bTtcbiAgICB9LFxuXG5cbiAgICBzZXRGYXN0R29sZFZpZXcoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nZmFzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL+W/q+WOi+iuvue9ri/ovpPlhaUnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nID0gdGhpcy5tX2lGYXN0TnVtO1xuICAgIH0sXG5cbiAgICBzaG93SGludChzdHIpXG4gICAge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaGludCcpO1xuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcblxuICAgICAgICBub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHI7XG4gICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVJbigwLjQpLGNjLmRlbGF5VGltZSgxLjIpLGNjLmZhZGVPdXQoMC40KSkpO1xuICAgIH0sXG4gICAgc2V0emh1YW5nKHJldClcbiAgICB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnemh1YW5nX2JnJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdmYWNlX20nKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25femh1YW5nJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd6aHVhbmdfYmcnKS5nZXRDaGlsZEJ5TmFtZSgn5bqE5a62bmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmV0Lm5hbWU7XG4gICAgICAgIHNldEhlYWRUZXh0dXJlKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmFjZV9tJykscmV0LnVybCk7XG4gICAgfSxcbn0pO1xuXG5cbiJdfQ==