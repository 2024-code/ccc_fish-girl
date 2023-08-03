
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/baijiale/baijiale.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b1adzhAlJLuKD8gbESDk10', 'baijiale');
// Script/baijiale/baijiale.js

"use strict";

window.baijiale_global = {};
cc.Class({
  "extends": cc.Component,
  properties: {
    poker_arr: [cc.Node],
    chip_box: cc.Node,
    bet_text: cc.Node,
    player_node: [cc.Node],
    helpNode: cc.Node,
    onlineNode: cc.Node,
    recordNode: cc.Node,
    animeNode_pk: cc.Node,
    animeNode_start: cc.Node,
    animeNode_end: cc.Node,
    chips_node: cc.Node,
    cardspframe: [cc.SpriteFrame],
    //headspframe:    [cc.SpriteFrame],
    resultspframe: [cc.SpriteFrame],
    pointspframe: [cc.SpriteFrame],
    chip_prefab: [cc.Prefab],
    m_iCurrentSelBet: -1,
    m_iGameOverTime: -1,
    m_lPoolNum: [],
    m_lPointNum: [],
    // userInfo_list:[],
    // farseer:{},
    table_userinfo: [],
    result_icon: [cc.SpriteFrame],
    result_icon_w: [cc.SpriteFrame]
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

      var playerInfoEx = window.baijiale_sc;
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
      100: "chip_5",
      500: "chip_5",
      1000: "chip_10",
      5000: "chip_50",
      10000: "chip_100",
      50000: "chip_500"
    };
    this.chip_nums = [100, 500, 1000, 5000, 10000, 50000];
    cc.debug.setDisplayStats(false);
    window.baijiale_ins = this;

    var playerInfo = require("PlayerInfo").getInstant;

    var playerInfoEx = window.baijiale_sc;
    this.playerId = playerInfoEx.id; //this.player_score = playerInfoEx.score;

    this.player_name = playerInfo.playerName;
    this.playerHead = playerInfo.playerHead;
    this.playerHeadId = playerInfo.playerHeadId;
    this.m_lPoolNum = [0, 0, 0, 0, 0];
    this.m_lPointNum = [0, 0];
    this.serializeUsers(window.baijiale_global.userInfo_list);
    this.poker_pos = [];

    for (var i in this.poker_arr) {
      this.poker_pos[i] = this.poker_arr[i].position;
      this.poker_pos[i].opacity = 0;
    }

    this.resetparam();
    this.network = require('baijialeNetWork').getInstant;
    this.bet_text.active = false;
    this.network.LandlordsSocket.emit('getGameType', '');
    this.network.LandlordsSocket.emit("getGameRecordList", "");
  },
  start: function start() {
    playBGM('bg');
  },
  init_record: function init_record(result) {
    // var arr = this.node.getChildByName("trend_box").getChildByName("ludan_20").children;
    // for (var i = result.length-1;i>0;i--)
    // {
    //     var res = result[i].win;
    //     var num = arr.length-1 - (result.length-1 - parseInt(i));
    //     if (num<0)break;
    //     var node = arr[num];
    //     node.getComponent(cc.Sprite).spriteFrame = this.resultspframe[res];
    // }
    var res_arr = [];
    var res_count = [0, 0, 0, 0, 0];

    for (var i in result) {
      res_count[result[i].win]++;
      if (result[i].is_zhuang_dui) res_count[3]++;
      if (result[i].is_xian_dui) res_count[4]++;

      if (res_arr.length == 0 || res_arr[res_arr.length - 1].win != result[i].win) {
        var r = {
          win: result[i].win,
          num: 0
        };
        res_arr.push(r);
      } else {
        res_arr[res_arr.length - 1].num++;
      }
    }

    var k = res_arr.length - this.recordNode.getChildByName('dalu').children.length;

    if (k > 0) {
      res_arr.splice(0, k);
    }

    this.recordNode.getChildByName('zhuang').getComponent(cc.Label).string = res_count[0];
    this.recordNode.getChildByName('xian').getComponent(cc.Label).string = res_count[1];
    this.recordNode.getChildByName('ping').getComponent(cc.Label).string = res_count[2];
    this.recordNode.getChildByName('zhuangdui').getComponent(cc.Label).string = res_count[3];
    this.recordNode.getChildByName('xiandui').getComponent(cc.Label).string = res_count[4];
    var arr = this.recordNode.getChildByName('ld_da').children;

    for (var i in arr) {
      var node = arr[i];

      if (i >= result.length) {
        node.active = false;
      } else {
        node.active = true;
        node.getComponent(cc.Sprite).spriteFrame = this.result_icon_w[result[i].win];
      }
    }

    var arr_d = this.recordNode.getChildByName('dalu').children;

    for (var i = 0; i < arr_d.length; i++) {
      var node = arr_d[i];

      if (i >= res_arr.length) {
        node.active = false;
      } else {
        node.active = true;
        var info = res_arr[i];

        for (var j in node.children) {
          var index = parseInt(j);
          var item = node.children[j];

          if (info.num < index) {
            item.active = false;
          } else {
            item.active = true;
            item.getComponent(cc.Sprite).spriteFrame = this.result_icon[info.win];

            if (index == node.children.length - 1) {
              var content = item.getChildByName('label').getComponent(cc.Label);
              var z = info.num - node.children.length + 1;
              content.string = z > 0 ? z : "";
            }
          }
        }
      }
    }
  },
  init_stat: function init_stat(result) {
    if (result.game_type == 1) {
      // if (result.bet_time == 20)
      // {
      //     this.betBegin();
      // }else
      {
        this.bet_text.active = true;
        this.m_iGameOverTime = Date.now() / 1000 + result.bet_time;
      }
      this.node.getChildByName("anim_wait").active = false;
      this.poker_arr[4].opacity = 0;
      this.poker_arr[5].opacity = 0;
    } else {
      this.node.getChildByName("anim_wait").active = true;

      for (var i in this.poker_arr) {
        this.poker_arr[i].opacity = 0;
      }
    }

    for (var i in result.bet_list) {
      this.m_lPoolNum[result.bet_list[i].bet_res] = result.bet_list[i].bet_gold;
    }

    this.setPoolView();
  },
  setPoolView: function setPoolView() {// for (var i =0;i<3;i++)
    // {
    //     this.node.getChildByName("main").getChildByName("chip_bg_"+i).getChildByName("pool").getComponent(cc.Label).string = this.m_lPoolNum[i];    
    // }
  },
  setPointView: function setPointView() {
    this.node.getChildByName('bg').getChildByName('clearing_0').getComponent(cc.Sprite).spriteFrame = this.pointspframe[this.m_lPointNum[0] % 10];
    this.node.getChildByName('bg').getChildByName('clearing_1').getComponent(cc.Sprite).spriteFrame = this.pointspframe[this.m_lPointNum[1] % 10];
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

      this.bet_text.getChildByName('New Label').getComponent(cc.Label).string = t;
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
  selbet: function selbet(num) {
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
        node.getChildByName('chip_select').active = true;
      } else {
        node.getChildByName('chip_select').active = false;
      }
    }
  },
  setPlayerView: function setPlayerView() {
    for (var i in this.player_node) {
      var tag = parseInt(i);
      var info;

      if (tag >= this.table_userinfo.length) {
        info = {};
      } else {
        info = this.table_userinfo[tag];
      }

      this.player_node[tag].getChildByName("New Label").getComponent(cc.Label).string = info.user_name;
      if (this.player_node[tag].getChildByName("pl_gold_bar")) this.player_node[tag].getChildByName("pl_gold_bar").getChildByName("New Label").getComponent(cc.Label).string = Helper.fixNum(info.score);
      var head = info.user_url;
      var headnode = this.player_node[tag];

      if (head < 0) {
        head = 0;
      }

      if (headnode.getChildByName("pl_face")) {
        headnode = headnode.getChildByName("pl_face");
      } //headnode.getComponent(cc.Sprite).spriteFrame = this.headspframe[head];


      window.setHeadTexture(headnode, head);
    }
  },
  showResult: function showResult(ret) {
    var instance = this; //012 龙虎和 1234 黑红花片
    //var sam = {hu_card:2307,long_card:258,ResultCode:1,win:1};

    this.table_userinfo[0].score += ret.user_win;
    var per_time = 1.2;
    var needtime = 1.2 * (ret.XianCards.length + ret.ZhuangCards.length - 2);
    this.scheduleOnce(function () {
      this.setPokerSp(0, ret.XianCards[0]);
    }, 0);
    this.scheduleOnce(function () {
      this.setPokerSp(1, ret.ZhuangCards[0]);
    }, per_time);
    this.scheduleOnce(function () {
      this.setPokerSp(2, ret.XianCards[1]);
    }, per_time * 2);
    this.scheduleOnce(function () {
      this.setPokerSp(3, ret.ZhuangCards[1]);
    }, per_time * 3);
    var t_delay = 0;

    if (ret.XianCards.length == 3) {
      this.scheduleOnce(function () {
        this.setPokerSp(4, -1);
        this.poker_arr[4].opacity = 255;
        this.poker_arr[4].position = this.poker_pos[4];
        this.poker_arr[4].x += 60;
        this.poker_arr[4].y += 120;
        this.poker_arr[4].runAction(cc.moveTo(0.1, this.poker_pos[4]));
      }, per_time * 4);
      this.scheduleOnce(function () {
        this.setPokerSp(4, ret.XianCards[2]);
      }, per_time * 4 + 0.1);
      t_delay = per_time + 0.1;
    }

    if (ret.ZhuangCards.length == 3) {
      this.scheduleOnce(function () {
        this.setPokerSp(5, -1);
        this.poker_arr[5].opacity = 255;
        this.poker_arr[5].position = this.poker_pos[5];
        this.poker_arr[5].x -= 60;
        this.poker_arr[5].y += 120;
        this.poker_arr[5].runAction(cc.moveTo(0.1, this.poker_pos[5]));
      }, per_time * 4 + t_delay);
      this.scheduleOnce(function () {
        this.setPokerSp(5, ret.ZhuangCards[2]);
      }, per_time * 4 + t_delay + 0.1);
    } //this.setPokerSp(0,ret.long_card);


    this.scheduleOnce(function () {
      //this.setPokerSp(1,ret.hu_card);
      this.scheduleOnce(function () {
        var winarea = this.node.getChildByName('main').getChildByName('win_effect_' + ret.win);
        winarea.opacity = 0;
        winarea.active = true;
        winarea.runAction(cc.sequence(cc.fadeIn(0.4), cc.fadeOut(0.4), cc.fadeIn(0.4), cc.fadeOut(0.4)));

        if (ret.is_zhuang_dui) {
          var winarea = this.node.getChildByName('main').getChildByName('win_effect_3');
          winarea.opacity = 0;
          winarea.active = true;
          winarea.runAction(cc.sequence(cc.fadeIn(0.4), cc.fadeOut(0.4), cc.fadeIn(0.4), cc.fadeOut(0.4)));
        }

        if (ret.is_xian_dui) {
          var winarea = this.node.getChildByName('main').getChildByName('win_effect_4');
          winarea.opacity = 0;
          winarea.active = true;
          winarea.runAction(cc.sequence(cc.fadeIn(0.4), cc.fadeOut(0.4), cc.fadeIn(0.4), cc.fadeOut(0.4)));
        }
      }, needtime);
      this.scheduleOnce(function () {
        var arr = this.chips_node.children;

        for (var i in arr) {
          var chip_node = arr[i];

          if (chip_node.on_pool == ret.win || chip_node.on_pool == 3 && ret.is_zhuang_dui || chip_node.on_pool == 4 && ret.is_xian_dui) {
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
      }, needtime + 0.4);
      this.scheduleOnce(function (dt) {
        this.setPlayerView(0);

        if (ret.user_win > 0) {
          playEffect('ADD_SCORE');
        }

        this.network.LandlordsSocket.emit("getGameRecordList", "");
      }, needtime);
      this.scheduleOnce(function (dt) {
        instance.setPokerVisible(false);
        instance.node.getChildByName("anim_wait").active = true;
        instance.m_lPoolNum = [0, 0, 0, 0, 0];
        instance.m_lPointNum = [0, 0];
        instance.setPoolView();
        instance.setPointView();
      }, needtime + 1.4);
    }, needtime);
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
    var endnode = this.node.getChildByName('main').getChildByName('betting_area_' + info.bet_res);
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
      chip_startpos = this.chip_box.getChildByName(this.chip_name[info.bet_gold]).convertToWorldSpaceAR(cc.v2(0, 0)); //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));

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
    } else {
      inited = true; //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));

      var endpos_min = endnode.getChildByName('min').convertToWorldSpaceAR(cc.v2(0, 0));
      var endpos_max = endnode.getChildByName('max').convertToWorldSpaceAR(cc.v2(0, 0));
      var endx = Math.floor(Math.random() * (endpos_max.x - endpos_min.x)) + endpos_min.x;
      var endy = Math.floor(Math.random() * (endpos_max.y - endpos_min.y)) + endpos_min.y;
      chip_endpos = cc.v2(endx, endy);
      chip_startpos = chip_endpos;
    }

    if (inited) {
      var chip_node = cc.instantiate(this.chip_prefab[this.chip_nums.indexOf(info.bet_gold)]);
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
    this.network.LandlordsSocket.emit("getGameRankingList", "");
  },
  betBegin_r: function betBegin_r() {
    playEffect('start_s');
    this.m_lPoolNum = [0, 0, 0, 0, 0];
    this.m_lPointNum = [0, 0];
    this.setPoolView();
    this.setPointView();
    this.node.getChildByName("anim_wait").active = false;
    this.m_iGameOverTime = Date.now() / 1000 + 15;
    var instance = this; //var ske = this.node.getChildByName('lhdpk');
    // ske.getComponent(sp.Skeleton).setCompleteListener(function () {
    //     ske.active = false;

    instance.setPokerVisible(true);
    var start = instance.node.getChildByName('anim_start');
    start.getComponent(sp.Skeleton).setCompleteListener(function () {
      start.active = false;
      instance.bet_text.active = true;
    });
    start.active = true; // });
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
        console.log("a1 = " + a1 + ",tag = " + tag, ",num = " + num);
        var mm = a1;
        if (mm >= 10 || mm < 0) mm = 0;

        if (tag % 2 == 0) {
          this.m_lPointNum[0] += mm; //this.m_lPointNum[0] = this.m_lPointNum[0]%10;
        } else {
          this.m_lPointNum[1] += mm; //this.m_lPointNum[1] = this.m_lPointNum[1]%10;
        }

        this.setPointView();
      }, 0.5);
    }
  },
  setPokerVisible: function setPokerVisible(flag) {
    var _this = this;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYWlqaWFsZVxcYmFpamlhbGUuanMiXSwibmFtZXMiOlsid2luZG93IiwiYmFpamlhbGVfZ2xvYmFsIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwb2tlcl9hcnIiLCJOb2RlIiwiY2hpcF9ib3giLCJiZXRfdGV4dCIsInBsYXllcl9ub2RlIiwiaGVscE5vZGUiLCJvbmxpbmVOb2RlIiwicmVjb3JkTm9kZSIsImFuaW1lTm9kZV9wayIsImFuaW1lTm9kZV9zdGFydCIsImFuaW1lTm9kZV9lbmQiLCJjaGlwc19ub2RlIiwiY2FyZHNwZnJhbWUiLCJTcHJpdGVGcmFtZSIsInJlc3VsdHNwZnJhbWUiLCJwb2ludHNwZnJhbWUiLCJjaGlwX3ByZWZhYiIsIlByZWZhYiIsIm1faUN1cnJlbnRTZWxCZXQiLCJtX2lHYW1lT3ZlclRpbWUiLCJtX2xQb29sTnVtIiwibV9sUG9pbnROdW0iLCJ0YWJsZV91c2VyaW5mbyIsInJlc3VsdF9pY29uIiwicmVzdWx0X2ljb25fdyIsInNlcmlhbGl6ZVVzZXJzIiwidXNlcl9vYmplY3QiLCJsZW5ndGgiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJwbGF5ZXJJbmZvRXgiLCJiYWlqaWFsZV9zYyIsImluZm9fMCIsInNjb3JlIiwidXNlcl9pZCIsImlkIiwidXNlcl9uYW1lIiwibmlja25hbWUiLCJ1c2VyX3VybCIsImhlYWRpbWd1cmwiLCJwdXNoIiwic3BsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInNoZW5fc3Vhbl96aSIsImluZm9feCIsImkiLCJyYW5raW5nX2xpc3QiLCJpbmZvIiwicGFyc2VJbnQiLCJzZXRQbGF5ZXJWaWV3Iiwib25Mb2FkIiwiY2hpcF9uYW1lIiwiY2hpcF9udW1zIiwiZGVidWciLCJzZXREaXNwbGF5U3RhdHMiLCJiYWlqaWFsZV9pbnMiLCJwbGF5ZXJJZCIsInBsYXllcl9uYW1lIiwicGxheWVyTmFtZSIsInBsYXllckhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJ1c2VySW5mb19saXN0IiwicG9rZXJfcG9zIiwicG9zaXRpb24iLCJvcGFjaXR5IiwicmVzZXRwYXJhbSIsIm5ldHdvcmsiLCJhY3RpdmUiLCJMYW5kbG9yZHNTb2NrZXQiLCJlbWl0Iiwic3RhcnQiLCJwbGF5QkdNIiwiaW5pdF9yZWNvcmQiLCJyZXN1bHQiLCJyZXNfYXJyIiwicmVzX2NvdW50Iiwid2luIiwiaXNfemh1YW5nX2R1aSIsImlzX3hpYW5fZHVpIiwiciIsIm51bSIsImsiLCJnZXRDaGlsZEJ5TmFtZSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJhcnIiLCJub2RlIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJhcnJfZCIsImoiLCJpbmRleCIsIml0ZW0iLCJjb250ZW50IiwieiIsImluaXRfc3RhdCIsImdhbWVfdHlwZSIsIkRhdGUiLCJub3ciLCJiZXRfdGltZSIsImJldF9saXN0IiwiYmV0X3JlcyIsImJldF9nb2xkIiwic2V0UG9vbFZpZXciLCJzZXRQb2ludFZpZXciLCJ1cGRhdGUiLCJkdCIsInQiLCJwbGF5RWZmZWN0Iiwic2V0QmV0VmlldyIsImJldCIsInBvaW50IiwibGFzdFRvdWNoUG9pbnQiLCJzdHIiLCJzZWxiZXQiLCJiZXRhcnJheSIsInRhZyIsIkhlbHBlciIsImZpeE51bSIsImhlYWQiLCJoZWFkbm9kZSIsInNldEhlYWRUZXh0dXJlIiwic2hvd1Jlc3VsdCIsInJldCIsImluc3RhbmNlIiwidXNlcl93aW4iLCJwZXJfdGltZSIsIm5lZWR0aW1lIiwiWGlhbkNhcmRzIiwiWmh1YW5nQ2FyZHMiLCJzY2hlZHVsZU9uY2UiLCJzZXRQb2tlclNwIiwidF9kZWxheSIsIngiLCJ5IiwicnVuQWN0aW9uIiwibW92ZVRvIiwid2luYXJlYSIsInNlcXVlbmNlIiwiZmFkZUluIiwiZmFkZU91dCIsImNoaXBfbm9kZSIsIm9uX3Bvb2wiLCJpbml0ZWQiLCJlbmRwb3MiLCJvd25lciIsInYyIiwicmVtb3ZlU2VsZiIsInNldFBva2VyVmlzaWJsZSIsIm9uQmV0IiwiY2hpcF9zdGFydHBvcyIsImNoaXBfZW5kcG9zIiwiZW5kbm9kZSIsIm93bmVyVGFnIiwidXNlcklkIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwiZW5kcG9zX21pbiIsImNvbnZlcnRUb1dvcmxkU3BhY2UiLCJlbmRwb3NfbWF4IiwiZW5keCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImVuZHkiLCJpbnN0YW50aWF0ZSIsImluZGV4T2YiLCJzY2FsZSIsInBhcmVudCIsImJldEJlZ2luIiwiYmV0QmVnaW5fciIsInNwIiwiU2tlbGV0b24iLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwiYTEiLCJiMSIsInNjYWxlVG8iLCJjb25zb2xlIiwibG9nIiwibW0iLCJmbGFnIiwic3Bhd24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsZUFBUCxHQUF5QixFQUF6QjtBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFLLENBQUNKLEVBQUUsQ0FBQ0ssSUFBSixDQUROO0FBR1JDLElBQUFBLFFBQVEsRUFBSU4sRUFBRSxDQUFDSyxJQUhQO0FBSVJFLElBQUFBLFFBQVEsRUFBSVAsRUFBRSxDQUFDSyxJQUpQO0FBS1JHLElBQUFBLFdBQVcsRUFBSSxDQUFDUixFQUFFLENBQUNLLElBQUosQ0FMUDtBQU1SSSxJQUFBQSxRQUFRLEVBQUlULEVBQUUsQ0FBQ0ssSUFOUDtBQU9SSyxJQUFBQSxVQUFVLEVBQUVWLEVBQUUsQ0FBQ0ssSUFQUDtBQVFSTSxJQUFBQSxVQUFVLEVBQUVYLEVBQUUsQ0FBQ0ssSUFSUDtBQVVSTyxJQUFBQSxZQUFZLEVBQUlaLEVBQUUsQ0FBQ0ssSUFWWDtBQVdSUSxJQUFBQSxlQUFlLEVBQUtiLEVBQUUsQ0FBQ0ssSUFYZjtBQVlSUyxJQUFBQSxhQUFhLEVBQUdkLEVB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QyxTQUFMLENBQWUrQyxDQUFmLEVBQWtCMkYsQ0FBbEIsSUFBc0IsR0FBdEI7O0FBQ0EsY0FBSTNGLENBQUMsR0FBQyxDQUFGLElBQU0sQ0FBVixFQUNBO0FBQ0ksaUJBQUsvQyxTQUFMLENBQWUrQyxDQUFmLEVBQWtCMEYsQ0FBbEIsSUFBc0IsRUFBdEI7QUFDSCxXQUhELE1BR0s7QUFDRCxpQkFBS3pJLFNBQUwsQ0FBZStDLENBQWYsRUFBa0IwRixDQUFsQixJQUFzQixFQUF0QjtBQUNIOztBQUVELGVBQUt6SSxTQUFMLENBQWUrQyxDQUFmLEVBQWtCNEYsU0FBbEIsQ0FBNEIvSSxFQUFFLENBQUM0TCxLQUFILENBQVM1TCxFQUFFLENBQUNnSixNQUFILENBQVU3QixDQUFWLEVBQVksS0FBSy9DLFNBQUwsQ0FBZWpCLENBQWYsQ0FBWixDQUFULEVBQXdDbkQsRUFBRSxDQUFDbUosTUFBSCxDQUFVaEMsQ0FBVixDQUF4QyxDQUE1QjtBQUNILFNBZEQsRUFjRWpCLENBQUMsR0FBQ2lCLENBZEo7QUF0Qkg7O0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLFdBQUssSUFBSWpCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUMsQ0FBbEIsRUFBb0JBLENBQUMsRUFBckIsRUFDQTtBQUFBO0FBa0JDOztBQUNELFdBQUs5RixTQUFMLENBQWUsQ0FBZixFQUFrQmtFLE9BQWxCLEdBQTRCLENBQTVCO0FBQ0EsV0FBS2xFLFNBQUwsQ0FBZSxDQUFmLEVBQWtCa0UsT0FBbEIsR0FBNEIsQ0FBNUI7QUFDSDtBQUNKO0FBN3ZCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYmFpamlhbGVfZ2xvYmFsID0ge307XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwb2tlcl9hcnI6ICAgIFtjYy5Ob2RlXSxcblxuICAgICAgICBjaGlwX2JveDogICBjYy5Ob2RlLFxuICAgICAgICBiZXRfdGV4dDogICBjYy5Ob2RlLFxuICAgICAgICBwbGF5ZXJfbm9kZTogICBbY2MuTm9kZV0sXG4gICAgICAgIGhlbHBOb2RlOiAgIGNjLk5vZGUsXG4gICAgICAgIG9ubGluZU5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHJlY29yZE5vZGU6IGNjLk5vZGUsXG5cbiAgICAgICAgYW5pbWVOb2RlX3BrOiAgIGNjLk5vZGUsXG4gICAgICAgIGFuaW1lTm9kZV9zdGFydDogICAgY2MuTm9kZSxcbiAgICAgICAgYW5pbWVOb2RlX2VuZDogIGNjLk5vZGUsXG5cbiAgICAgICAgY2hpcHNfbm9kZTogICAgIGNjLk5vZGUsXG5cbiAgICAgICAgY2FyZHNwZnJhbWU6ICAgIFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIC8vaGVhZHNwZnJhbWU6ICAgIFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHJlc3VsdHNwZnJhbWU6ICAgIFtjYy5TcHJpdGVGcmFtZV0sXG5cbiAgICAgICAgcG9pbnRzcGZyYW1lOltjYy5TcHJpdGVGcmFtZV0sXG5cbiAgICAgICAgY2hpcF9wcmVmYWI6W2NjLlByZWZhYl0sXG4gICAgICAgIG1faUN1cnJlbnRTZWxCZXQ6LTEsXG5cbiAgICAgICAgbV9pR2FtZU92ZXJUaW1lOi0xLFxuICAgICAgICBtX2xQb29sTnVtOltdLFxuICAgICAgICBtX2xQb2ludE51bTpbXSxcblxuICAgICAgICAvLyB1c2VySW5mb19saXN0OltdLFxuICAgICAgICAvLyBmYXJzZWVyOnt9LFxuICAgICAgICB0YWJsZV91c2VyaW5mbzpbXSxcblxuICAgICAgICByZXN1bHRfaWNvbjpbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICByZXN1bHRfaWNvbl93OltjYy5TcHJpdGVGcmFtZV0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgc2VyaWFsaXplVXNlcnModXNlcl9vYmplY3QpXG4gICAge1xuICAgICAgICAvLzDoh6rlt7EgMeelnueulyAy6aaW5a+MIDMtNuWFtuS7llxuICAgICAgICAvL2JldF9zY29yZVxuICAgICAgICAvL3Njb3JlXG4gICAgICAgIC8vdXNlcl9pZFxuICAgICAgICAvL3VzZXJfbmFtZVxuICAgICAgICAvL3VzZXJfdXJsXG4gICAgICAgIC8vd2luX251bVxuXG4gICAgICAgIC8vIHRoaXMuZmFyc2VlciA9IHVzZXJfb2JqZWN0LnNoZW5fc3Vhbl96aTtcbiAgICAgICAgLy8gdGhpcy51c2VySW5mb19saXN0ID0gdXNlcl9vYmplY3QucmFua2luZ19saXN0O1xuICAgICAgICBpZiAodGhpcy50YWJsZV91c2VyaW5mbyAubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XG4gICAgICAgICAgICB2YXIgcGxheWVySW5mb0V4ID0gd2luZG93LmJhaWppYWxlX3NjO1xuICAgICAgICAgICAgdmFyIGluZm9fMCA9IHtcbiAgICAgICAgICAgICAgICBzY29yZTogcGxheWVySW5mb0V4LnNjb3JlLFxuICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHBsYXllckluZm9FeC5pZCxcbiAgICAgICAgICAgICAgICB1c2VyX25hbWU6IHBsYXllckluZm9FeC5uaWNrbmFtZSxcbiAgICAgICAgICAgICAgICB1c2VyX3VybDogcGxheWVySW5mb0V4LmhlYWRpbWd1cmx9O1xuICAgICAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mby5wdXNoKGluZm9fMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mby5zcGxpY2UoMSx0aGlzLnRhYmxlX3VzZXJpbmZvLmxlbmd0aC0xKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodXNlcl9vYmplY3Quc2hlbl9zdWFuX3ppKSAhPSBcInt9XCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudGFibGVfdXNlcmluZm8ucHVzaCh1c2VyX29iamVjdC5zaGVuX3N1YW5femkpO1xuICAgICAgICB9ZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW5mb194ID0ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVzZXJfaWQ6IC0xLFxuICAgICAgICAgICAgICAgIHVzZXJfbmFtZTogXCLnqbrnvLpcIixcbiAgICAgICAgICAgICAgICB1c2VyX3VybDogLTF9O1xuICAgICAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mby5wdXNoKGluZm9feCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJfb2JqZWN0LnJhbmtpbmdfbGlzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGluZm8gPSB1c2VyX29iamVjdC5yYW5raW5nX2xpc3RbaV07XG4gICAgICAgICAgICBpZiAoaW5mby51c2VyX2lkID09IHRoaXMudGFibGVfdXNlcmluZm9bMV0udXNlcl9pZCAmJiBwYXJzZUludChpKSE9MClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChpbmZvLnVzZXJfaWQgPT0gdGhpcy50YWJsZV91c2VyaW5mb1swXS51c2VyX2lkICYmIHBhcnNlSW50KGkpIT0wKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgIHRoaXMudGFibGVfdXNlcmluZm8ucHVzaChpbmZvKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlX3VzZXJpbmZvLmxlbmd0aD49NylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRhYmxlX3VzZXJpbmZvLmxlbmd0aDsgaTw3IDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpbmZvX3ggPSB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IFwiXCIsXG4gICAgICAgICAgICAgICAgdXNlcl9pZDogLTEsXG4gICAgICAgICAgICAgICAgdXNlcl9uYW1lOiBcIuepuue8ulwiLFxuICAgICAgICAgICAgICAgIHVzZXJfdXJsOiAtMX07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2goaW5mb194KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0UGxheWVyVmlldygpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIHRoaXMuY2hpcF9uYW1lID0gezEwMDpcImNoaXBfNVwiLDUwMDpcImNoaXBfNVwiLDEwMDA6XCJjaGlwXzEwXCIsNTAwMDpcImNoaXBfNTBcIiwxMDAwMDpcImNoaXBfMTAwXCIsNTAwMDA6XCJjaGlwXzUwMFwifTtcbiAgICAgICAgdGhpcy5jaGlwX251bXMgPSBbMTAwLDUwMCwxMDAwLDUwMDAsMTAwMDAsNTAwMDBdOyAgICBcbiAgICAgICAgY2MuZGVidWcuc2V0RGlzcGxheVN0YXRzKGZhbHNlKTtcbiAgICAgICAgd2luZG93LmJhaWppYWxlX2lucyA9IHRoaXM7XG4gICAgICAgIHZhciBwbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcbiAgICAgICAgdmFyIHBsYXllckluZm9FeCA9IHdpbmRvdy5iYWlqaWFsZV9zYztcbiAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IHBsYXllckluZm9FeC5pZDtcbiAgICAgICAgLy90aGlzLnBsYXllcl9zY29yZSA9IHBsYXllckluZm9FeC5zY29yZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJfbmFtZSA9IHBsYXllckluZm8ucGxheWVyTmFtZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gcGxheWVySW5mby5wbGF5ZXJIZWFkO1xuICAgICAgICB0aGlzLnBsYXllckhlYWRJZCA9IHBsYXllckluZm8ucGxheWVySGVhZElkO1xuXG4gICAgICAgIHRoaXMubV9sUG9vbE51bSA9WzAsMCwwLDAsMF07XG4gICAgICAgIHRoaXMubV9sUG9pbnROdW0gPSBbMCwwXTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemVVc2Vycyh3aW5kb3cuYmFpamlhbGVfZ2xvYmFsLnVzZXJJbmZvX2xpc3QpO1xuXG5cbiAgICAgICAgdGhpcy5wb2tlcl9wb3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBva2VyX2FycilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wb2tlcl9wb3NbaV0gPSB0aGlzLnBva2VyX2FycltpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMucG9rZXJfcG9zW2ldLm9wYWNpdHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMucmVzZXRwYXJhbSgpO1xuICAgICAgICB0aGlzLm5ldHdvcmsgPSByZXF1aXJlKCdiYWlqaWFsZU5ldFdvcmsnKS5nZXRJbnN0YW50O1xuICAgICAgICB0aGlzLmJldF90ZXh0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdCgnZ2V0R2FtZVR5cGUnLCAnJyk7XG4gICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldEdhbWVSZWNvcmRMaXN0XCIsXCJcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgcGxheUJHTSgnYmcnKTtcbiAgICB9LFxuXG4gICAgaW5pdF9yZWNvcmQocmVzdWx0KXtcbiAgICAgICAgLy8gdmFyIGFyciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRyZW5kX2JveFwiKS5nZXRDaGlsZEJ5TmFtZShcImx1ZGFuXzIwXCIpLmNoaWxkcmVuO1xuICAgICAgICAvLyBmb3IgKHZhciBpID0gcmVzdWx0Lmxlbmd0aC0xO2k+MDtpLS0pXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHZhciByZXMgPSByZXN1bHRbaV0ud2luO1xuICAgICAgICAvLyAgICAgdmFyIG51bSA9IGFyci5sZW5ndGgtMSAtIChyZXN1bHQubGVuZ3RoLTEgLSBwYXJzZUludChpKSk7XG4gICAgICAgIC8vICAgICBpZiAobnVtPDApYnJlYWs7XG4gICAgICAgIC8vICAgICB2YXIgbm9kZSA9IGFycltudW1dO1xuXG4gICAgICAgIC8vICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yZXN1bHRzcGZyYW1lW3Jlc107XG4gICAgICAgIC8vIH1cblxuICAgICAgICB2YXIgcmVzX2FyciA9IFtdO1xuICAgICAgICB2YXIgcmVzX2NvdW50ID0gWzAsMCwwLDAsMF07XG4gICAgICAgIGZvciAodmFyIGkgaW4gcmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXNfY291bnRbcmVzdWx0W2ldLndpbl0rKztcbiAgICAgICAgICAgIGlmIChyZXN1bHRbaV0uaXNfemh1YW5nX2R1aSlyZXNfY291bnRbM10rKztcbiAgICAgICAgICAgIGlmIChyZXN1bHRbaV0uaXNfeGlhbl9kdWkpcmVzX2NvdW50WzRdKys7XG5cbiAgICAgICAgICAgIGlmIChyZXNfYXJyLmxlbmd0aCA9PSAwIHx8IHJlc19hcnJbcmVzX2Fyci5sZW5ndGgtMV0ud2luICE9IHJlc3VsdFtpXS53aW4pe1xuICAgICAgICAgICAgICAgIHZhciByID0ge3dpbjpyZXN1bHRbaV0ud2luICwgbnVtIDowfTtcbiAgICAgICAgICAgICAgICByZXNfYXJyLnB1c2gocik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXNfYXJyW3Jlc19hcnIubGVuZ3RoLTFdLm51bSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGsgPSByZXNfYXJyLmxlbmd0aCAtIHRoaXMucmVjb3JkTm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGFsdScpLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYgKGs+MCl7XG4gICAgICAgICAgICByZXNfYXJyLnNwbGljZSgwLGspO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvcmROb2RlLmdldENoaWxkQnlOYW1lKCd6aHVhbmcnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlc19jb3VudFswXTtcbiAgICAgICAgdGhpcy5yZWNvcmROb2RlLmdldENoaWxkQnlOYW1lKCd4aWFuJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXNfY291bnRbMV07XG4gICAgICAgIHRoaXMucmVjb3JkTm9kZS5nZXRDaGlsZEJ5TmFtZSgncGluZycpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzX2NvdW50WzJdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWNvcmROb2RlLmdldENoaWxkQnlOYW1lKCd6aHVhbmdkdWknKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlc19jb3VudFszXTtcbiAgICAgICAgdGhpcy5yZWNvcmROb2RlLmdldENoaWxkQnlOYW1lKCd4aWFuZHVpJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXNfY291bnRbNF07XG4gICAgICAgIFxuXG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnJlY29yZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xkX2RhJykuY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgaW4gYXJyKXtcbiAgICAgICAgICAgIHZhciBub2RlID0gYXJyW2ldO1xuICAgICAgICAgICAgaWYgKGk+PXJlc3VsdC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucmVzdWx0X2ljb25fd1tyZXN1bHRbaV0ud2luXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJyX2QgPSB0aGlzLnJlY29yZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2RhbHUnKS5jaGlsZHJlbjtcbiAgICAgICAgZm9yICh2YXIgaSA9MCA7aTwgYXJyX2QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGFycl9kW2ldO1xuICAgICAgICAgICAgaWYgKGk+PXJlc19hcnIubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gcmVzX2FycltpXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIG5vZGUuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChqKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5udW0gPCBpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJlc3VsdF9pY29uW2luZm8ud2luXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBpdGVtLmdldENoaWxkQnlOYW1lKCdsYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHogPSBpbmZvLm51bSAtIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5zdHJpbmcgPSB6ID4gMCA/ejpcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXRfc3RhdChyZXN1bHQpe1xuICAgICAgICBpZiAocmVzdWx0LmdhbWVfdHlwZSA9PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBpZiAocmVzdWx0LmJldF90aW1lID09IDIwKVxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmV0QmVnaW4oKTtcbiAgICAgICAgICAgIC8vIH1lbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZXRfdGV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9pR2FtZU92ZXJUaW1lID0gRGF0ZS5ub3coKS8xMDAwK3Jlc3VsdC5iZXRfdGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaW1fd2FpdFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyWzRdLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbNV0ub3BhY2l0eSA9IDA7XG4gICAgICAgIH1lbHNlIFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhbmltX3dhaXRcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wb2tlcl9hcnIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbaV0ub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpIGluIHJlc3VsdC5iZXRfbGlzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tX2xQb29sTnVtW3Jlc3VsdC5iZXRfbGlzdFtpXS5iZXRfcmVzXSA9IHJlc3VsdC5iZXRfbGlzdFtpXS5iZXRfZ29sZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvb2xWaWV3KCk7XG4gICAgfSxcblxuICAgIHNldFBvb2xWaWV3KClcbiAgICB7XG4gICAgICAgIC8vIGZvciAodmFyIGkgPTA7aTwzO2krKylcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFpblwiKS5nZXRDaGlsZEJ5TmFtZShcImNoaXBfYmdfXCIraSkuZ2V0Q2hpbGRCeU5hbWUoXCJwb29sXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5tX2xQb29sTnVtW2ldOyAgICBcbiAgICAgICAgLy8gfVxuICAgICAgICBcbiAgICB9LFxuXG4gICAgc2V0UG9pbnRWaWV3KClcbiAgICB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5nZXRDaGlsZEJ5TmFtZSgnY2xlYXJpbmdfMCcpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wb2ludHNwZnJhbWVbdGhpcy5tX2xQb2ludE51bVswXSUxMF07XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5nZXRDaGlsZEJ5TmFtZSgnY2xlYXJpbmdfMScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wb2ludHNwZnJhbWVbdGhpcy5tX2xQb2ludE51bVsxXSUxMF07XG4gICAgfSxcbiAgICB1cGRhdGUoZHQpe1xuICAgICAgICBpZiAodGhpcy5tX2lHYW1lT3ZlclRpbWUgJiYgdGhpcy5iZXRfdGV4dC5hY3RpdmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ID0gcGFyc2VJbnQodGhpcy5tX2lHYW1lT3ZlclRpbWUgLSBEYXRlLm5vdygpLzEwMDApO1xuXG4gICAgICAgICAgICBpZiAodDw9NSAmJiB0K1wiXCIgIT0gdGhpcy5iZXRfdGV4dC5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcpXG4gICAgICAgICAgICB7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2NvdW50ZG93bicpO1xuICAgICAgICAgICAgICAgIGlmICh0ID09IDApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdzdG9wX3MnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0PD0wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZXRfdGV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJldF90ZXh0LmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzZXRwYXJhbSgpXG4gICAge1xuICAgICAgICB0aGlzLm1faUN1cnJlbnRTZWxCZXQgPSAtMTtcbiAgICAgICAgdGhpcy5zZXRCZXRWaWV3KCk7XG4gICAgICAgIHRoaXMuc2V0UGxheWVyVmlldygpO1xuICAgIH0sXG5cbiAgICBiZXQobnVtLHBvaW50KVxuICAgIHtcbiAgICAgICAgdGhpcy5sYXN0VG91Y2hQb2ludCA9IHBvaW50O1xuICAgICAgICBpZiAodGhpcy5tX2lDdXJyZW50U2VsQmV0ID09IC0xKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgIHN0ciA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIC8vYmV0X3R5cGU6IDEsXG4gICAgICAgICAgICBiZXRfcmVzOiBwYXJzZUludChudW0pLFxuICAgICAgICAgICAgYmV0X2dvbGQ6IHRoaXMubV9pQ3VycmVudFNlbEJldCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KCdsb3R0ZXJ5Jywgc3RyKTtcblxuICAgICAgICB0aGlzLnNldEJldFZpZXcoKTtcbiAgICB9LFxuXG4gICAgc2VsYmV0KG51bSl7XG4gICAgICAgIGlmICh0aGlzLm1faUN1cnJlbnRTZWxCZXQgPT0gbnVtKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm1faUN1cnJlbnRTZWxCZXQgPSAtMTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJsZV91c2VyaW5mb1swXS5zY29yZSA8IG51bSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGF5RWZmZWN0KCdjaGlwJyk7XG4gICAgICAgICAgICB0aGlzLm1faUN1cnJlbnRTZWxCZXQgPSBudW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRCZXRWaWV3KCk7XG4gICAgfSxcbiAgICBzZXRCZXRWaWV3KClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLm1faUN1cnJlbnRTZWxCZXQgPiB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm1faUN1cnJlbnRTZWxCZXQgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmV0YXJyYXkgPSB0aGlzLmNoaXBfYm94LmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpIGluIGJldGFycmF5KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGJldGFycmF5W2ldO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jaGlwX251bXNbaV0gPD0gdGhpcy50YWJsZV91c2VyaW5mb1swXS5zY29yZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAxMjg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNoaXBfbnVtc1tpXSA9PSB0aGlzLm1faUN1cnJlbnRTZWxCZXQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcF9zZWxlY3QnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcF9zZWxlY3QnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRQbGF5ZXJWaWV3KClcbiAgICB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wbGF5ZXJfbm9kZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHBhcnNlSW50KGkpO1xuICAgICAgICAgICAgdmFyIGluZm87XG4gICAgICAgICAgICBpZiAodGFnID49IHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZm8gPSB7fTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLnRhYmxlX3VzZXJpbmZvW3RhZ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBsYXllcl9ub2RlW3RhZ10uZ2V0Q2hpbGRCeU5hbWUoXCJOZXcgTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpbmZvLnVzZXJfbmFtZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlW3RhZ10uZ2V0Q2hpbGRCeU5hbWUoXCJwbF9nb2xkX2JhclwiKSlcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcl9ub2RlW3RhZ10uZ2V0Q2hpbGRCeU5hbWUoXCJwbF9nb2xkX2JhclwiKS5nZXRDaGlsZEJ5TmFtZShcIk5ldyBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlbHBlci5maXhOdW0oaW5mby5zY29yZSk7XG5cbiAgICAgICAgICAgIHZhciBoZWFkID0gaW5mby51c2VyX3VybDtcbiAgICAgICAgICAgIHZhciBoZWFkbm9kZSA9IHRoaXMucGxheWVyX25vZGVbdGFnXTtcbiAgICAgICAgICAgIGlmIChoZWFkIDwgMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBoZWFkID0gMDtcbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICBpZiAoaGVhZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwbF9mYWNlXCIpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhlYWRub2RlID0gaGVhZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwbF9mYWNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9oZWFkbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaGVhZHNwZnJhbWVbaGVhZF07XG4gICAgICAgICAgICB3aW5kb3cuc2V0SGVhZFRleHR1cmUoaGVhZG5vZGUsaGVhZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd1Jlc3VsdChyZXQpXG4gICAge1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICAvLzAxMiDpvpnomY7lkowgMTIzNCDpu5HnuqLoirHniYdcbiAgICAgICAgLy92YXIgc2FtID0ge2h1X2NhcmQ6MjMwNyxsb25nX2NhcmQ6MjU4LFJlc3VsdENvZGU6MSx3aW46MX07XG5cbiAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mb1swXS5zY29yZSArPSByZXQudXNlcl93aW47XG5cbiAgICAgICAgdmFyIHBlcl90aW1lID0gMS4yO1xuICAgICAgICB2YXIgbmVlZHRpbWUgPSAxLjIqKHJldC5YaWFuQ2FyZHMubGVuZ3RoK3JldC5aaHVhbmdDYXJkcy5sZW5ndGggLTIgKTsgXG5cblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKDAscmV0LlhpYW5DYXJkc1swXSk7XG4gICAgICAgIH0sMCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKDEscmV0LlpodWFuZ0NhcmRzWzBdKTtcbiAgICAgICAgfSxwZXJfdGltZSk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoaXMuc2V0UG9rZXJTcCgyLHJldC5YaWFuQ2FyZHNbMV0pO1xuICAgICAgICB9LHBlcl90aW1lKjIpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGlzLnNldFBva2VyU3AoMyxyZXQuWmh1YW5nQ2FyZHNbMV0pO1xuICAgICAgICB9LHBlcl90aW1lKjMpO1xuXG4gICAgICAgIHZhciB0X2RlbGF5ID0gMDtcbiAgICAgICAgaWYgKHJldC5YaWFuQ2FyZHMubGVuZ3RoID09IDMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKDQsLTEpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyWzRdLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbNF0ucG9zaXRpb24gPSB0aGlzLnBva2VyX3Bvc1s0XTtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2Fycls0XS54Kz02MDtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2Fycls0XS55Kz0xMjA7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbNF0ucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsdGhpcy5wb2tlcl9wb3NbNF0pKTtcbiAgICAgICAgICAgIH0scGVyX3RpbWUqNCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKDQscmV0LlhpYW5DYXJkc1syXSk7XG4gICAgICAgICAgICB9LHBlcl90aW1lKjQrMC4xKTtcblxuICAgICAgICAgICAgdF9kZWxheSA9IHBlcl90aW1lKzAuMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXQuWmh1YW5nQ2FyZHMubGVuZ3RoID09IDMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKDUsLTEpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyWzVdLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbNV0ucG9zaXRpb24gPSB0aGlzLnBva2VyX3Bvc1s1XTtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2Fycls1XS54LT02MDtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2Fycls1XS55Kz0xMjA7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbNV0ucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsdGhpcy5wb2tlcl9wb3NbNV0pKTtcbiAgICAgICAgICAgIH0scGVyX3RpbWUqNCArIHRfZGVsYXkpO1xuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9rZXJTcCg1LHJldC5aaHVhbmdDYXJkc1syXSk7XG4gICAgICAgICAgICB9LHBlcl90aW1lKjQgKyB0X2RlbGF5KzAuMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RoaXMuc2V0UG9rZXJTcCgwLHJldC5sb25nX2NhcmQpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy90aGlzLnNldFBva2VyU3AoMSxyZXQuaHVfY2FyZCk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciB3aW5hcmVhID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q2hpbGRCeU5hbWUoJ3dpbl9lZmZlY3RfJytyZXQud2luKTtcbiAgICAgICAgICAgICAgICB3aW5hcmVhLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHdpbmFyZWEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5hcmVhLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlSW4oMC40KSxjYy5mYWRlT3V0KDAuNCksY2MuZmFkZUluKDAuNCksY2MuZmFkZU91dCgwLjQpICkpOyAgICBcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGlmIChyZXQuaXNfemh1YW5nX2R1aSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW5hcmVhID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q2hpbGRCeU5hbWUoJ3dpbl9lZmZlY3RfMycpO1xuICAgICAgICAgICAgICAgICAgICB3aW5hcmVhLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aW5hcmVhLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHdpbmFyZWEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVJbigwLjQpLGNjLmZhZGVPdXQoMC40KSxjYy5mYWRlSW4oMC40KSxjYy5mYWRlT3V0KDAuNCkgKSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmV0LmlzX3hpYW5fZHVpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmFyZWEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW4nKS5nZXRDaGlsZEJ5TmFtZSgnd2luX2VmZmVjdF80Jyk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmFyZWEub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHdpbmFyZWEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgd2luYXJlYS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZUluKDAuNCksY2MuZmFkZU91dCgwLjQpLGNjLmZhZGVJbigwLjQpLGNjLmZhZGVPdXQoMC40KSApKTsgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LG5lZWR0aW1lKTtcblxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXsgIFxuICAgICAgICAgICAgICAgIHZhciBhcnIgPSB0aGlzLmNoaXBzX25vZGUuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhcnIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpcF9ub2RlID0gYXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpcF9ub2RlLm9uX3Bvb2wgPT0gcmV0LndpblxuICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChjaGlwX25vZGUub25fcG9vbCA9PSAzICYmIHJldC5pc196aHVhbmdfZHVpKVxuICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChjaGlwX25vZGUub25fcG9vbCA9PSA0ICYmIHJldC5pc194aWFuX2R1aSkpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmRwb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpcF9ub2RlLm93bmVyID09IHRoaXMucGxheWVySWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRwb3MgPSBjYy52Mig2OTMsNjEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlwX25vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjI1LGVuZHBvcyksY2MucmVtb3ZlU2VsZigpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlwX25vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC4yNSksY2MucmVtb3ZlU2VsZigpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMiksY2MucmVtb3ZlU2VsZigpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LG5lZWR0aW1lKzAuNCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxheWVyVmlldygwKTtcbiAgICAgICAgICAgICAgICBpZiAocmV0LnVzZXJfd2luPjApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdBRERfU0NPUkUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5ldHdvcmsuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJnZXRHYW1lUmVjb3JkTGlzdFwiLFwiXCIpO1xuICAgICAgICAgICAgfSxuZWVkdGltZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldFBva2VyVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaW1fd2FpdFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGluc3RhbmNlLm1fbFBvb2xOdW0gPSBbMCwwLDAsMCwwXTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5tX2xQb2ludE51bSA9IFswLDBdO1xuXG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0UG9vbFZpZXcoKTtcblxuICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldFBvaW50VmlldygpO1xuICAgICAgICAgICAgfSxuZWVkdGltZSsxLjQpO1xuICAgICAgICB9LG5lZWR0aW1lKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIG9uQmV0KGluZm8pe1xuICAgICAgICAvLyBpbmZvLmJldF9yZXM7XG4gICAgICAgIC8vIGluZm8uYmV0X2dvbGQ7XG4gICAgICAgIC8vIGluZm8udXNlcklkO1xuXG4gICAgICAgIHBsYXlFZmZlY3QoJ2Nob3VtYXhpYXpodScpO1xuICAgICAgICB0aGlzLm1fbFBvb2xOdW1baW5mby5iZXRfcmVzXSArPSBpbmZvLmJldF9nb2xkO1xuICAgICAgICB0aGlzLnNldFBvb2xWaWV3KCk7XG5cbiAgICAgICAgdmFyIGNoaXBfc3RhcnRwb3M7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2hpcF9lbmRwb3M7XG5cbiAgICAgICAgdmFyIGluaXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBlbmRub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q2hpbGRCeU5hbWUoJ2JldHRpbmdfYXJlYV8nK2luZm8uYmV0X3Jlcyk7XG5cbiAgICAgICAgdmFyIG93bmVyVGFnID0gLTE7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy50YWJsZV91c2VyaW5mbylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm9baV0udXNlcl9pZCtcIlwiID09IGluZm8udXNlcklkK1wiXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3duZXJUYWcgPSBwYXJzZUludChpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy50YWJsZV91c2VyaW5mbylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm9baV0udXNlcl9pZCtcIlwiID09IGluZm8udXNlcklkK1wiXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mb1tpXS5zY29yZSAtPSBpbmZvLmJldF9nb2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGxheWVyVmlldygpO1xuXG4gICAgICAgIGlmIChvd25lclRhZyA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL3RoaXMucGxheWVyX3Njb3JlIC09IGluZm8uYmV0X2dvbGQ7XG4gICAgICAgICAgICBpbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBjaGlwX3N0YXJ0cG9zID0gdGhpcy5jaGlwX2JveC5nZXRDaGlsZEJ5TmFtZSh0aGlzLmNoaXBfbmFtZVtpbmZvLmJldF9nb2xkXSkuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy92YXIgZW5kcG9zX21pZCA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pZCcpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICB2YXIgZW5kcG9zX21pbiA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pbicpLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgdmFyIGVuZHBvc19tYXggPSBlbmRub2RlLmdldENoaWxkQnlOYW1lKCdtYXgnKS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdFRvdWNoUG9pbnQueCA+PWVuZHBvc19taW4ueCAmJiB0aGlzLmxhc3RUb3VjaFBvaW50LnkgPj1lbmRwb3NfbWluLnlcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmxhc3RUb3VjaFBvaW50LnggPD1lbmRwb3NfbWF4LnggJiYgdGhpcy5sYXN0VG91Y2hQb2ludC55IDw9ZW5kcG9zX21heC55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlbmR4ID0gdGhpcy5sYXN0VG91Y2hQb2ludC54ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYwKS0zMDtcbiAgICAgICAgICAgICAgICB2YXIgZW5keSA9IHRoaXMubGFzdFRvdWNoUG9pbnQueSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo2MCktMzA7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW5keCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooZW5kcG9zX21heC54LWVuZHBvc19taW4ueCkpICsgZW5kcG9zX21pbi54O1xuICAgICAgICAgICAgICAgIHZhciBlbmR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihlbmRwb3NfbWF4LnktZW5kcG9zX21pbi55KSkgKyBlbmRwb3NfbWluLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaXBfZW5kcG9zID0gY2MudjIoZW5keCxlbmR5KTtcblxuICAgICAgICB9ZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBpbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvL3ZhciBlbmRwb3NfbWlkID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWlkJykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHZhciBlbmRwb3NfbWluID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWluJykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHZhciBlbmRwb3NfbWF4ID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWF4JykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcblxuXG4gICAgICAgICAgICB2YXIgZW5keCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooZW5kcG9zX21heC54LWVuZHBvc19taW4ueCkpICsgZW5kcG9zX21pbi54O1xuICAgICAgICAgICAgdmFyIGVuZHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGVuZHBvc19tYXgueS1lbmRwb3NfbWluLnkpKSArIGVuZHBvc19taW4ueTtcblxuICAgICAgICAgICAgY2hpcF9lbmRwb3MgPSBjYy52MihlbmR4LGVuZHkpO1xuXG4gICAgICAgICAgICBjaGlwX3N0YXJ0cG9zID0gY2hpcF9lbmRwb3M7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbml0ZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjaGlwX25vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNoaXBfcHJlZmFiW3RoaXMuY2hpcF9udW1zLmluZGV4T2YoaW5mby5iZXRfZ29sZCldKTtcbiAgICAgICAgICAgIGNoaXBfbm9kZS54ID0gY2hpcF9zdGFydHBvcy54O1xuICAgICAgICAgICAgY2hpcF9ub2RlLnkgPSBjaGlwX3N0YXJ0cG9zLnk7XG4gICAgICAgICAgICBjaGlwX25vZGUuc2NhbGUgPSAwLjQ7XG4gICAgICAgICAgICBjaGlwX25vZGUucGFyZW50ID0gdGhpcy5jaGlwc19ub2RlO1xuICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yNSxjaGlwX2VuZHBvcy54LGNoaXBfZW5kcG9zLnkpKTtcblxuICAgICAgICAgICAgY2hpcF9ub2RlLm93bmVyID0gaW5mby51c2VySWQ7XG4gICAgICAgICAgICBjaGlwX25vZGUub25fcG9vbCA9IGluZm8uYmV0X3JlcztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBiZXRCZWdpbigpXG4gICAge1xuICAgICAgICB0aGlzLm5ldHdvcmsuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJnZXRHYW1lUmFua2luZ0xpc3RcIixcIlwiKTtcbiAgICB9LFxuXG4gICAgYmV0QmVnaW5fcigpXG4gICAge1xuICAgICAgICBwbGF5RWZmZWN0KCdzdGFydF9zJyk7XG4gICAgICAgIHRoaXMubV9sUG9vbE51bSA9IFswLDAsMCwwLDBdO1xuICAgICAgICB0aGlzLm1fbFBvaW50TnVtID0gWzAsMF07XG4gICAgICAgIHRoaXMuc2V0UG9vbFZpZXcoKTtcbiAgICAgICAgdGhpcy5zZXRQb2ludFZpZXcoKTtcblxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhbmltX3dhaXRcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9pR2FtZU92ZXJUaW1lID0gRGF0ZS5ub3coKS8xMDAwKzE1O1xuXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIC8vdmFyIHNrZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGhkcGsnKTtcbiAgICAgICAgLy8gc2tlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICBza2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZXRQb2tlclZpc2libGUodHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBzdGFydCA9IGluc3RhbmNlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2FuaW1fc3RhcnQnKTtcbiAgICAgICAgICAgIHN0YXJ0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYmV0X3RleHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RhcnQuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gc2tlLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHNldFBva2VyU3AodGFnLG51bSlcbiAgICB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5wb2tlcl9hcnJbdGFnXTtcblxuICAgICAgICBpZiAobnVtPDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmNhcmRzcGZyYW1lWzUyXTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgYTEgPSBwYXJzZUludChudW0vMTYpLzE2O1xuICAgICAgICAgICAgdmFyIGIxID0gbnVtJTE2O1xuICAgICAgICAgICAgdmFyIGkgPSAoYjEtMSkqMTMgKyhhMS0xKTtcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yNSwxLjIsMS4yKSxjYy5zY2FsZVRvKDAuMjUsMCwxLjIpKSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmNhcmRzcGZyYW1lW2ldO1xuICAgICAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yNSwxLjIsMS4yKSxjYy5zY2FsZVRvKDAuMjUsMSwxKSkpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhMSA9IFwiK2ExK1wiLHRhZyA9IFwiK3RhZyxcIixudW0gPSBcIitudW0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1tID0gYTE7XG4gICAgICAgICAgICAgICAgaWYgKG1tID49IDEwIHx8IG1tPDApbW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0YWclMiA9PTApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbFBvaW50TnVtWzBdICs9IG1tO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMubV9sUG9pbnROdW1bMF0gPSB0aGlzLm1fbFBvaW50TnVtWzBdJTEwO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbFBvaW50TnVtWzFdICs9IG1tO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMubV9sUG9pbnROdW1bMV0gPSB0aGlzLm1fbFBvaW50TnVtWzFdJTEwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9pbnRWaWV3KCk7XG5cbiAgICAgICAgICAgIH0sMC41KTtcblxuICAgICAgICB9XG59LFxuXG4gICAgc2V0UG9rZXJWaXNpYmxlKGZsYWcpXG4gICAge1xuICAgICAgICB2YXIgdCA9IDAuMTU7XG4gICAgICAgIGlmICghZmxhZylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gdGhpcy5wb2tlcl8wLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCxjYy52MigtODgtNjAsMjU4KzEyMCkpLGNjLmZhZGVPdXQodCkpKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgLy8gICAgIC8vdGhpcy5zZXRQb2tlclNwKDAsLTEpO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfMC54ID0gLTg4O1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfMC55ID0gMjU4O1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfMC5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIC8vIH0sdCswLjgpO1xuICAgICAgICAgICAgLy8gdGhpcy5wb2tlcl8xLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCxjYy52Mig4NC02MCwyNTgrMTIwKSksY2MuZmFkZU91dCh0KSkpO1xuICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICAvLyAgICAgLy90aGlzLnNldFBva2VyU3AoMCwtMSk7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl8xLnggPSA4NDtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBva2VyXzEueSA9IDI1ODtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBva2VyXzEub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAvLyB9LHQrMC44KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAgO2o8NjtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSBqO1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCxjYy52Mih0aGlzLnBva2VyX3Bvc1tpXS54LHRoaXMucG9rZXJfcG9zW2ldLnkrMTIwKSksY2MuZmFkZU91dCh0KSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2FycltpXS5wb3NpdGlvbiA9IHRoaXMucG9rZXJfcG9zW2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBva2VyU3AoaSwtMSk7XG4gICAgICAgICAgICAgICAgfSx0KzAuMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gcGxheUVmZmVjdCgnU0VORF9DQVJEJyk7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFBva2VyU3AoMCwtMSk7XG4gICAgICAgICAgICAvLyB0aGlzLnBva2VyXzAub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAvLyB0aGlzLnBva2VyXzAueCA9IC04OCs2MDtcbiAgICAgICAgICAgIC8vIHRoaXMucG9rZXJfMC55ID0gMjU4KzEyMDtcbiAgICAgICAgICAgIC8vIHRoaXMucG9rZXJfMC5ydW5BY3Rpb24oY2Muc3Bhd24oY2MubW92ZVRvKHQsY2MudjIoLTg4LDI1OCkpLGNjLmZhZGVJbih0KSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgIHBsYXlFZmZlY3QoJ1NFTkRfQ0FSRCcpO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2V0UG9rZXJTcCgxLC0xKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBva2VyXzEub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2tlcl8xLnggPSA4NCAtIDYwO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfMS55ID0gMjU4ICsgMTIwO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9rZXJfMS5ydW5BY3Rpb24oY2Muc3Bhd24oY2MubW92ZVRvKHQsY2MudjIoODQsMjU4KSksY2MuZmFkZUluKHQpKSk7ICAgICAgICBcbiAgICAgICAgICAgIC8vIH0sdCk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAgO2o8NDtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSBqO1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ1NFTkRfQ0FSRCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBva2VyU3AoaSwtMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2FycltpXS5wb3NpdGlvbiA9IHRoaXMucG9rZXJfcG9zW2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBva2VyX2FycltpXS55ICs9MTIwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSUyID09MClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbaV0ueCArPTYwO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLnggLT02MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfYXJyW2ldLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5tb3ZlVG8odCx0aGlzLnBva2VyX3Bvc1tpXSksY2MuZmFkZUluKHQpKSk7XG4gICAgICAgICAgICAgICAgfSxqKnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wb2tlcl9hcnJbNF0ub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICB0aGlzLnBva2VyX2Fycls1XS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl19