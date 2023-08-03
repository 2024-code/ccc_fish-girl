
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/longhudou/longhudou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dedf98gFIZJ+rXLh6QNN1Uy', 'longhudou');
// Script/longhudou/longhudou.js

"use strict";

window.lhd_global = {};
cc.Class({
  "extends": cc.Component,
  properties: {
    poker_0: cc.Node,
    poker_1: cc.Node,
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
    chip_prefab: [cc.Prefab],
    m_iCurrentSelBet: -1,
    m_iGameOverTime: -1,
    m_lPoolNum: [],
    // userInfo_list:[],
    // farseer:{},
    table_userinfo: []
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

      var playerInfoEx = window.lhd_sc;
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
      100: "chip_green",
      1000: "chip_blue",
      5000: "chip_purple",
      10000: "chip_red",
      50000: "chip_yellow"
    };
    this.chip_nums = [100, 1000, 5000, 10000, 50000];
    cc.debug.setDisplayStats(false);
    window.longhudou_ins = this;

    var playerInfo = require("PlayerInfo").getInstant;

    var playerInfoEx = window.lhd_sc;
    this.playerId = playerInfoEx.id; //this.player_score = playerInfoEx.score;

    this.player_name = playerInfo.playerName;
    this.playerHead = playerInfo.playerHead;
    this.playerHeadId = playerInfo.playerHeadId;
    this.m_lPoolNum = [0, 0, 0];
    this.serializeUsers(window.lhd_global.userInfo_list);
    this.resetparam();
    this.network = require('longhudouNetWork').getInstant;
    this.bet_text.active = false;
    this.network.LandlordsSocket.emit('getGameType', '');
    this.network.LandlordsSocket.emit("getGameRecordList", "");
  },
  start: function start() {
    playBGM('bg');
  },
  init_record: function init_record(result) {
    var arr = this.node.getChildByName("trend_box").getChildByName("ludan_20").children;

    for (var i = result.length - 1; i >= 0; i--) {
      var res = result[i].win;
      var num = arr.length - 1 - (result.length - 1 - parseInt(i));
      if (num < 0) break;
      var node = arr[num];
      node.getComponent(cc.Sprite).spriteFrame = this.resultspframe[res];
    }
  },
  init_stat: function init_stat(result) {
    if (result.game_type == 1) {
      // if (result.bet_time == 15)
      // {
      //     this.betBegin();
      // }else
      {
        this.bet_text.active = true;
        this.m_iGameOverTime = Date.now() / 1000 + result.bet_time;
      }
      this.node.getChildByName("anim_wait").active = false;
    } else {
      this.node.getChildByName("anim_wait").active = true;
    }

    for (var i in result.bet_list) {
      this.m_lPoolNum[result.bet_list[i].bet_res] = result.bet_list[i].bet_gold;
    }

    this.setPoolView();
  },
  setPoolView: function setPoolView() {
    for (var i = 0; i < 3; i++) {
      this.node.getChildByName("main").getChildByName("chip_bg_" + i).getChildByName("pool").getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[i]);
    }
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
    //this.player_score

    this.table_userinfo[0].score += ret.user_win;
    this.setPokerSp(0, ret.long_card);
    this.scheduleOnce(function () {
      this.setPokerSp(1, ret.hu_card);
      this.scheduleOnce(function () {
        var winarea = this.node.getChildByName('main').getChildByName('winner_area_' + ret.win);
        winarea.opacity = 0;
        winarea.active = true;
        winarea.runAction(cc.sequence(cc.fadeIn(0.4), cc.fadeOut(0.4), cc.fadeIn(0.4), cc.fadeOut(0.4)));
      }, 0.8);
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
      }, 1.2);
      this.scheduleOnce(function () {
        if (ret.win == 0) {
          playEffect('long_win');
        } else if (ret.win == 1) {
          playEffect('hu_win');
        } else if (ret.win == 2) {
          playEffect('he');
        }
      }, 1.6);
      this.scheduleOnce(function (dt) {
        this.setPlayerView(0);

        if (ret.user_win > 0) {
          playEffect('ADD_SCORE');
        }

        this.network.LandlordsSocket.emit("getGameRecordList", "");
      }, 1.9);
      this.scheduleOnce(function (dt) {
        instance.setPokerVisible(false);
        instance.node.getChildByName("anim_wait").active = true;
        instance.m_lPoolNum = [0, 0, 0];
        instance.setPoolView();
      }, 2.3);
    }, 0.8);
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

    if (info.bet_res == 0) {
      endnode = this.node.getChildByName('main').getChildByName('Dragon_betting_area');
    } else if (info.bet_res == 1) {
      endnode = this.node.getChildByName('main').getChildByName('Tiger_betting_area');
    } else if (info.bet_res == 2) {
      endnode = this.node.getChildByName('main').getChildByName('Draw_betting_area');
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
      inited = true;
      chip_startpos = this.chip_box.getChildByName(this.chip_name[info.bet_gold]).convertToWorldSpaceAR(cc.v2(0, 0)); //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));

      var endpos_min = endnode.getChildByName('min').convertToWorldSpaceAR(cc.v2(0, 0));
      var endpos_max = endnode.getChildByName('max').convertToWorldSpaceAR(cc.v2(0, 0));

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
    this.m_lPoolNum = [0, 0, 0];
    this.setPoolView();
    this.node.getChildByName("anim_wait").active = false;
    this.m_iGameOverTime = Date.now() / 1000 + 15;
    var instance = this;
    var ske = this.node.getChildByName('lhdpk');
    ske.getComponent(sp.Skeleton).setCompleteListener(function () {
      ske.active = false;
      instance.setPokerVisible(true);
      var start = instance.node.getChildByName('anim_start');
      start.getComponent(sp.Skeleton).setCompleteListener(function () {
        start.active = false;
      });
      instance.bet_text.active = true;
      start.active = true;
    });
    ske.active = true;
  },
  setPokerSp: function setPokerSp(tag, num) {
    var node;
    if (tag == 0) node = this.poker_0;
    if (tag == 1) node = this.poker_1;

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
      this.scheduleOnce(function () {
        playEffect('lhb_p_' + a1);
      }, 1);
    }
  },
  setPokerVisible: function setPokerVisible(flag) {
    var t = 0.15;

    if (!flag) {
      this.poker_0.runAction(cc.spawn(cc.moveTo(t, cc.v2(-88 - 60, 258 + 120)), cc.fadeOut(t)));
      this.scheduleOnce(function (dt) {
        //this.setPokerSp(0,-1);
        this.poker_0.x = -88;
        this.poker_0.y = 258;
        this.poker_0.opacity = 0;
      }, t + 0.8);
      this.poker_1.runAction(cc.spawn(cc.moveTo(t, cc.v2(84 - 60, 258 + 120)), cc.fadeOut(t)));
      this.scheduleOnce(function (dt) {
        //this.setPokerSp(0,-1);
        this.poker_1.x = 84;
        this.poker_1.y = 258;
        this.poker_1.opacity = 0;
      }, t + 0.8);
    } else {
      playEffect('SEND_CARD');
      this.setPokerSp(0, -1);
      this.poker_0.opacity = 0;
      this.poker_0.x = -88 + 60;
      this.poker_0.y = 258 + 120;
      this.poker_0.runAction(cc.spawn(cc.moveTo(t, cc.v2(-88, 258)), cc.fadeIn(t)));
      this.scheduleOnce(function () {
        playEffect('SEND_CARD');
        this.setPokerSp(1, -1);
        this.poker_1.opacity = 0;
        this.poker_1.x = 84 - 60;
        this.poker_1.y = 258 + 120;
        this.poker_1.runAction(cc.spawn(cc.moveTo(t, cc.v2(84, 258)), cc.fadeIn(t)));
      }, t);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxsb25naHVkb3VcXGxvbmdodWRvdS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJsaGRfZ2xvYmFsIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwb2tlcl8wIiwiTm9kZSIsInBva2VyXzEiLCJjaGlwX2JveCIsImJldF90ZXh0IiwicGxheWVyX25vZGUiLCJoZWxwTm9kZSIsIm9ubGluZU5vZGUiLCJyZWNvcmROb2RlIiwiYW5pbWVOb2RlX3BrIiwiYW5pbWVOb2RlX3N0YXJ0IiwiYW5pbWVOb2RlX2VuZCIsImNoaXBzX25vZGUiLCJjYXJkc3BmcmFtZSIsIlNwcml0ZUZyYW1lIiwicmVzdWx0c3BmcmFtZSIsImNoaXBfcHJlZmFiIiwiUHJlZmFiIiwibV9pQ3VycmVudFNlbEJldCIsIm1faUdhbWVPdmVyVGltZSIsIm1fbFBvb2xOdW0iLCJ0YWJsZV91c2VyaW5mbyIsInNlcmlhbGl6ZVVzZXJzIiwidXNlcl9vYmplY3QiLCJsZW5ndGgiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJwbGF5ZXJJbmZvRXgiLCJsaGRfc2MiLCJpbmZvXzAiLCJzY29yZSIsInVzZXJfaWQiLCJpZCIsInVzZXJfbmFtZSIsIm5pY2tuYW1lIiwidXNlcl91cmwiLCJoZWFkaW1ndXJsIiwicHVzaCIsInNwbGljZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzaGVuX3N1YW5femkiLCJpbmZvX3giLCJpIiwicmFua2luZ19saXN0IiwiaW5mbyIsInBhcnNlSW50Iiwic2V0UGxheWVyVmlldyIsIm9uTG9hZCIsImNoaXBfbmFtZSIsImNoaXBfbnVtcyIsImRlYnVnIiwic2V0RGlzcGxheVN0YXRzIiwibG9uZ2h1ZG91X2lucyIsInBsYXllcklkIiwicGxheWVyX25hbWUiLCJwbGF5ZXJOYW1lIiwicGxheWVySGVhZCIsInBsYXllckhlYWRJZCIsInVzZXJJbmZvX2xpc3QiLCJyZXNldHBhcmFtIiwibmV0d29yayIsImFjdGl2ZSIsIkxhbmRsb3Jkc1NvY2tldCIsImVtaXQiLCJzdGFydCIsInBsYXlCR00iLCJpbml0X3JlY29yZCIsInJlc3VsdCIsImFyciIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImNoaWxkcmVuIiwicmVzIiwid2luIiwibnVtIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJpbml0X3N0YXQiLCJnYW1lX3R5cGUiLCJEYXRlIiwibm93IiwiYmV0X3RpbWUiLCJiZXRfbGlzdCIsImJldF9yZXMiLCJiZXRfZ29sZCIsInNldFBvb2xWaWV3IiwiTGFiZWwiLCJzdHJpbmciLCJIZWxwZXIiLCJmaXhOdW0iLCJ1cGRhdGUiLCJkdCIsInQiLCJwbGF5RWZmZWN0Iiwic2V0QmV0VmlldyIsImJldCIsInBvaW50IiwibGFzdFRvdWNoUG9pbnQiLCJzdHIiLCJzZWxiZXQiLCJiZXRhcnJheSIsIm9wYWNpdHkiLCJ0YWciLCJoZWFkIiwiaGVhZG5vZGUiLCJzZXRIZWFkVGV4dHVyZSIsInNob3dSZXN1bHQiLCJyZXQiLCJpbnN0YW5jZSIsInVzZXJfd2luIiwic2V0UG9rZXJTcCIsImxvbmdfY2FyZCIsInNjaGVkdWxlT25jZSIsImh1X2NhcmQiLCJ3aW5hcmVhIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJmYWRlSW4iLCJmYWRlT3V0IiwiY2hpcF9ub2RlIiwib25fcG9vbCIsImluaXRlZCIsImVuZHBvcyIsIm93bmVyIiwidjIiLCJtb3ZlVG8iLCJyZW1vdmVTZWxmIiwic2V0UG9rZXJWaXNpYmxlIiwib25CZXQiLCJjaGlwX3N0YXJ0cG9zIiwiY2hpcF9lbmRwb3MiLCJlbmRub2RlIiwib3duZXJUYWciLCJ1c2VySWQiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJlbmRwb3NfbWluIiwiZW5kcG9zX21heCIsIngiLCJ5IiwiZW5keCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImVuZHkiLCJpbnN0YW50aWF0ZSIsImluZGV4T2YiLCJzY2FsZSIsInBhcmVudCIsImJldEJlZ2luIiwiYmV0QmVnaW5fciIsInNrZSIsInNwIiwiU2tlbGV0b24iLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwiYTEiLCJiMSIsInNjYWxlVG8iLCJmbGFnIiwic3Bhd24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixFQUFwQjtBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFLSixFQUFFLENBQUNLLElBRFA7QUFFUkMsSUFBQUEsT0FBTyxFQUFLTixFQUFFLENBQUNLLElBRlA7QUFHUkUsSUFBQUEsUUFBUSxFQUFJUCxFQUFFLENBQUNLLElBSFA7QUFJUkcsSUFBQUEsUUFBUSxFQUFJUixFQUFFLENBQUNLLElBSlA7QUFLUkksSUFBQUEsV0FBVyxFQUFJLENBQUNULEVBQUUsQ0FBQ0ssSUFBSixDQUxQO0FBTVJLLElBQUFBLFFBQVEsRUFBSVYsRUFBRSxDQUFDSyxJQU5QO0FBT1JNLElBQUFBLFVBQVUsRUFBRVgsRUFBRSxDQUFDSyxJQVBQO0FBUVJPLElBQUFBLFVBQVUsRUFBRVosRUFBRSxDQUFDSyxJQVJQO0FBVVJRLElBQUFBLFlBQVksRUFBSWIsRUFBRSxDQUFDSyxJQVZYO0FBV1JTLElBQUFBLGVBQWUsRUFBS2QsRUFBRSxDQUFDSyxJQVhmO0FBWVJVLElBQUFBLGFBQWEsRUFBR2YsRUFBRSxDQUFDSyxJQVpYO0FBY1JXLElBQUFBLFVBQVUsRUFBTWhCLEVBQUUsQ0FBQ0ssSUFkWDtBQWdCUlksSUFBQUEsV0FBVyxFQUFLLENBQUNqQixFQUFFLENBQUNrQixXQUFKLENBaEJSO0FBaUJSO0FBQ0FDLElBQUFBLGFBQWEsRUFBSyxDQUFDbkIsRUFBRSxDQUFDa0IsV0FBSixDQWxCVjtBQW9CUkUsSUFBQUEsV0FBVyxFQUFDLENBQUNwQixFQUFFLENBQUNxQixNQUFKLENBcEJKO0FBcUJSQyxJQUFBQSxnQkFB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QUUsQ0FBQ3FLLEtBQUgsQ0FBU3JLLEVBQUUsQ0FBQ29JLE1BQUgsQ0FBVWpDLENBQVYsRUFBWW5HLEVBQUUsQ0FBQ21JLEVBQUgsQ0FBTSxDQUFDLEVBQVAsRUFBVSxHQUFWLENBQVosQ0FBVCxFQUFxQ25JLEVBQUUsQ0FBQzRILE1BQUgsQ0FBVXpCLENBQVYsQ0FBckMsQ0FBdkI7QUFFQSxXQUFLb0IsWUFBTCxDQUFrQixZQUFVO0FBQ3hCbkIsUUFBQUEsVUFBVSxDQUFDLFdBQUQsQ0FBVjtBQUNBLGFBQUtpQixVQUFMLENBQWdCLENBQWhCLEVBQWtCLENBQUMsQ0FBbkI7QUFDQSxhQUFLL0csT0FBTCxDQUFhc0csT0FBYixHQUF1QixDQUF2QjtBQUNBLGFBQUt0RyxPQUFMLENBQWEwSSxDQUFiLEdBQWlCLEtBQUssRUFBdEI7QUFDQSxhQUFLMUksT0FBTCxDQUFhMkksQ0FBYixHQUFpQixNQUFNLEdBQXZCO0FBQ0EsYUFBSzNJLE9BQUwsQ0FBYW9ILFNBQWIsQ0FBdUIxSCxFQUFFLENBQUNxSyxLQUFILENBQVNySyxFQUFFLENBQUNvSSxNQUFILENBQVVqQyxDQUFWLEVBQVluRyxFQUFFLENBQUNtSSxFQUFILENBQU0sRUFBTixFQUFTLEdBQVQsQ0FBWixDQUFULEVBQW9DbkksRUFBRSxDQUFDNEgsTUFBSCxDQUFVekIsQ0FBVixDQUFwQyxDQUF2QjtBQUNILE9BUEQsRUFPRUEsQ0FQRjtBQVFIO0FBQ0o7QUFuakJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5saGRfZ2xvYmFsID0ge307XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwb2tlcl8wOiAgICBjYy5Ob2RlLFxuICAgICAgICBwb2tlcl8xOiAgICBjYy5Ob2RlLFxuICAgICAgICBjaGlwX2JveDogICBjYy5Ob2RlLFxuICAgICAgICBiZXRfdGV4dDogICBjYy5Ob2RlLFxuICAgICAgICBwbGF5ZXJfbm9kZTogICBbY2MuTm9kZV0sXG4gICAgICAgIGhlbHBOb2RlOiAgIGNjLk5vZGUsXG4gICAgICAgIG9ubGluZU5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHJlY29yZE5vZGU6IGNjLk5vZGUsXG5cbiAgICAgICAgYW5pbWVOb2RlX3BrOiAgIGNjLk5vZGUsXG4gICAgICAgIGFuaW1lTm9kZV9zdGFydDogICAgY2MuTm9kZSxcbiAgICAgICAgYW5pbWVOb2RlX2VuZDogIGNjLk5vZGUsXG5cbiAgICAgICAgY2hpcHNfbm9kZTogICAgIGNjLk5vZGUsXG5cbiAgICAgICAgY2FyZHNwZnJhbWU6ICAgIFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIC8vaGVhZHNwZnJhbWU6ICAgIFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHJlc3VsdHNwZnJhbWU6ICAgIFtjYy5TcHJpdGVGcmFtZV0sXG5cbiAgICAgICAgY2hpcF9wcmVmYWI6W2NjLlByZWZhYl0sXG4gICAgICAgIG1faUN1cnJlbnRTZWxCZXQ6LTEsXG5cbiAgICAgICAgbV9pR2FtZU92ZXJUaW1lOi0xLFxuICAgICAgICBtX2xQb29sTnVtOltdLFxuXG4gICAgICAgIC8vIHVzZXJJbmZvX2xpc3Q6W10sXG4gICAgICAgIC8vIGZhcnNlZXI6e30sXG4gICAgICAgIHRhYmxlX3VzZXJpbmZvOltdLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIHNlcmlhbGl6ZVVzZXJzKHVzZXJfb2JqZWN0KVxuICAgIHtcbiAgICAgICAgLy8w6Ieq5bexIDHnpZ7nrpcgMummluWvjCAzLTblhbbku5ZcbiAgICAgICAgLy9iZXRfc2NvcmVcbiAgICAgICAgLy9zY29yZVxuICAgICAgICAvL3VzZXJfaWRcbiAgICAgICAgLy91c2VyX25hbWVcbiAgICAgICAgLy91c2VyX3VybFxuICAgICAgICAvL3dpbl9udW1cblxuICAgICAgICAvLyB0aGlzLmZhcnNlZXIgPSB1c2VyX29iamVjdC5zaGVuX3N1YW5femk7XG4gICAgICAgIC8vIHRoaXMudXNlckluZm9fbGlzdCA9IHVzZXJfb2JqZWN0LnJhbmtpbmdfbGlzdDtcbiAgICAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm8gLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xuICAgICAgICAgICAgdmFyIHBsYXllckluZm9FeCA9IHdpbmRvdy5saGRfc2M7XG4gICAgICAgICAgICB2YXIgaW5mb18wID0ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiBwbGF5ZXJJbmZvRXguc2NvcmUsXG4gICAgICAgICAgICAgICAgdXNlcl9pZDogcGxheWVySW5mb0V4LmlkLFxuICAgICAgICAgICAgICAgIHVzZXJfbmFtZTogcGxheWVySW5mb0V4Lm5pY2tuYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJfdXJsOiBwbGF5ZXJJbmZvRXguaGVhZGltZ3VybH07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2goaW5mb18wKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnNwbGljZSgxLHRoaXMudGFibGVfdXNlcmluZm8ubGVuZ3RoLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHVzZXJfb2JqZWN0LnNoZW5fc3Vhbl96aSkgIT0gXCJ7fVwiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2godXNlcl9vYmplY3Quc2hlbl9zdWFuX3ppKTtcbiAgICAgICAgfWVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGluZm9feCA9IHtcbiAgICAgICAgICAgICAgICBzY29yZTogXCJcIixcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiAtMSxcbiAgICAgICAgICAgICAgICB1c2VyX25hbWU6IFwi56m657y6XCIsXG4gICAgICAgICAgICAgICAgdXNlcl91cmw6IC0xfTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfdXNlcmluZm8ucHVzaChpbmZvX3gpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiB1c2VyX29iamVjdC5yYW5raW5nX2xpc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpbmZvID0gdXNlcl9vYmplY3QucmFua2luZ19saXN0W2ldO1xuICAgICAgICAgICAgaWYgKGluZm8udXNlcl9pZCA9PSB0aGlzLnRhYmxlX3VzZXJpbmZvWzFdLnVzZXJfaWQgJiYgcGFyc2VJbnQoaSkhPTApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoaW5mby51c2VyX2lkID09IHRoaXMudGFibGVfdXNlcmluZm9bMF0udXNlcl9pZCAmJiBwYXJzZUludChpKSE9MClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlX3VzZXJpbmZvLnB1c2goaW5mbyk7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJsZV91c2VyaW5mby5sZW5ndGg+PTcpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50YWJsZV91c2VyaW5mby5sZW5ndGg7IGk8NyA7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW5mb194ID0ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVzZXJfaWQ6IC0xLFxuICAgICAgICAgICAgICAgIHVzZXJfbmFtZTogXCLnqbrnvLpcIixcbiAgICAgICAgICAgICAgICB1c2VyX3VybDogLTF9O1xuICAgICAgICAgICAgdGhpcy50YWJsZV91c2VyaW5mby5wdXNoKGluZm9feCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFBsYXllclZpZXcoKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5jaGlwX25hbWUgPSB7MTAwOlwiY2hpcF9ncmVlblwiLDEwMDA6XCJjaGlwX2JsdWVcIiw1MDAwOlwiY2hpcF9wdXJwbGVcIiwxMDAwMDpcImNoaXBfcmVkXCIsNTAwMDA6XCJjaGlwX3llbGxvd1wifTtcbiAgICAgICAgdGhpcy5jaGlwX251bXMgPSBbMTAwLDEwMDAsNTAwMCwxMDAwMCw1MDAwMF07ICAgIFxuICAgICAgICBjYy5kZWJ1Zy5zZXREaXNwbGF5U3RhdHMoZmFsc2UpO1xuICAgICAgICB3aW5kb3cubG9uZ2h1ZG91X2lucyA9IHRoaXM7XG4gICAgICAgIHZhciBwbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcbiAgICAgICAgdmFyIHBsYXllckluZm9FeCA9IHdpbmRvdy5saGRfc2M7XG4gICAgICAgIHRoaXMucGxheWVySWQgPSBwbGF5ZXJJbmZvRXguaWQ7XG4gICAgICAgIC8vdGhpcy5wbGF5ZXJfc2NvcmUgPSBwbGF5ZXJJbmZvRXguc2NvcmU7XG4gICAgICAgIHRoaXMucGxheWVyX25hbWUgPSBwbGF5ZXJJbmZvLnBsYXllck5hbWU7XG4gICAgICAgIHRoaXMucGxheWVySGVhZCA9IHBsYXllckluZm8ucGxheWVySGVhZDtcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkSWQgPSBwbGF5ZXJJbmZvLnBsYXllckhlYWRJZDtcblxuICAgICAgICB0aGlzLm1fbFBvb2xOdW0gPVswLDAsMF07XG4gICAgICAgIHRoaXMuc2VyaWFsaXplVXNlcnMod2luZG93LmxoZF9nbG9iYWwudXNlckluZm9fbGlzdCk7XG5cbiAgICAgICAgdGhpcy5yZXNldHBhcmFtKCk7XG4gICAgICAgIHRoaXMubmV0d29yayA9IHJlcXVpcmUoJ2xvbmdodWRvdU5ldFdvcmsnKS5nZXRJbnN0YW50O1xuICAgICAgICB0aGlzLmJldF90ZXh0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdCgnZ2V0R2FtZVR5cGUnLCAnJyk7XG4gICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldEdhbWVSZWNvcmRMaXN0XCIsXCJcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgcGxheUJHTSgnYmcnKTtcbiAgICB9LFxuXG4gICAgaW5pdF9yZWNvcmQocmVzdWx0KXtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRyZW5kX2JveFwiKS5nZXRDaGlsZEJ5TmFtZShcImx1ZGFuXzIwXCIpLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gcmVzdWx0Lmxlbmd0aC0xO2k+PTA7aS0tKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVzID0gcmVzdWx0W2ldLndpbjtcbiAgICAgICAgICAgIHZhciBudW0gPSBhcnIubGVuZ3RoLTEgLSAocmVzdWx0Lmxlbmd0aC0xIC0gcGFyc2VJbnQoaSkpO1xuICAgICAgICAgICAgaWYgKG51bTwwKWJyZWFrO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBhcnJbbnVtXTtcblxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucmVzdWx0c3BmcmFtZVtyZXNdO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXRfc3RhdChyZXN1bHQpe1xuICAgICAgICBpZiAocmVzdWx0LmdhbWVfdHlwZSA9PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBpZiAocmVzdWx0LmJldF90aW1lID09IDE1KVxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmV0QmVnaW4oKTtcbiAgICAgICAgICAgIC8vIH1lbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZXRfdGV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9pR2FtZU92ZXJUaW1lID0gRGF0ZS5ub3coKS8xMDAwK3Jlc3VsdC5iZXRfdGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaW1fd2FpdFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfWVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaW1fd2FpdFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiByZXN1bHQuYmV0X2xpc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubV9sUG9vbE51bVtyZXN1bHQuYmV0X2xpc3RbaV0uYmV0X3Jlc10gPSByZXN1bHQuYmV0X2xpc3RbaV0uYmV0X2dvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb29sVmlldygpO1xuICAgIH0sXG5cbiAgICBzZXRQb29sVmlldygpXG4gICAge1xuICAgICAgICBmb3IgKHZhciBpID0wO2k8MztpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1haW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJjaGlwX2JnX1wiK2kpLmdldENoaWxkQnlOYW1lKFwicG9vbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5tX2xQb29sTnVtW2ldKTsgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSxcbiAgICB1cGRhdGUoZHQpe1xuICAgICAgICBpZiAodGhpcy5tX2lHYW1lT3ZlclRpbWUgJiYgdGhpcy5iZXRfdGV4dC5hY3RpdmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ID0gcGFyc2VJbnQodGhpcy5tX2lHYW1lT3ZlclRpbWUgLSBEYXRlLm5vdygpLzEwMDApO1xuXG4gICAgICAgICAgICBpZiAodDw9NSAmJiB0K1wiXCIgIT0gdGhpcy5iZXRfdGV4dC5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGxheUVmZmVjdCgnY291bnRkb3duJyk7XG4gICAgICAgICAgICAgICAgaWYgKHQgPT0gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ3N0b3BfcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHQ8PTApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJldF90ZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmV0X3RleHQuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNldHBhcmFtKClcbiAgICB7XG4gICAgICAgIHRoaXMubV9pQ3VycmVudFNlbEJldCA9IC0xO1xuICAgICAgICB0aGlzLnNldEJldFZpZXcoKTtcbiAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KCk7XG4gICAgfSxcblxuICAgIGJldChudW0scG9pbnQpXG4gICAge1xuICAgICAgICB0aGlzLmxhc3RUb3VjaFBvaW50ID0gcG9pbnQ7XG4gICAgICAgIGlmICh0aGlzLm1faUN1cnJlbnRTZWxCZXQgPT0gLTEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAgc3RyID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgLy9iZXRfdHlwZTogMSxcbiAgICAgICAgICAgIGJldF9yZXM6IHBhcnNlSW50KG51bSksXG4gICAgICAgICAgICBiZXRfZ29sZDogdGhpcy5tX2lDdXJyZW50U2VsQmV0LFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5ldHdvcmsuTGFuZGxvcmRzU29ja2V0LmVtaXQoJ2xvdHRlcnknLCBzdHIpO1xuXG4gICAgICAgIHRoaXMuc2V0QmV0VmlldygpO1xuICAgIH0sXG5cbiAgICBzZWxiZXQobnVtKXtcbiAgICAgICAgaWYgKHRoaXMubV9pQ3VycmVudFNlbEJldCA9PSBudW0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubV9pQ3VycmVudFNlbEJldCA9IC0xO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlIDwgbnVtKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2NoaXAnKTtcbiAgICAgICAgICAgIHRoaXMubV9pQ3VycmVudFNlbEJldCA9IG51bTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEJldFZpZXcoKTtcbiAgICB9LFxuICAgIHNldEJldFZpZXcoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMubV9pQ3VycmVudFNlbEJldCA+IHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubV9pQ3VycmVudFNlbEJldCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBiZXRhcnJheSA9IHRoaXMuY2hpcF9ib3guY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgaW4gYmV0YXJyYXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gYmV0YXJyYXlbaV07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNoaXBfbnVtc1tpXSA8PSB0aGlzLnRhYmxlX3VzZXJpbmZvWzBdLnNjb3JlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IDEyODtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2hpcF9udW1zW2ldID09IHRoaXMubV9pQ3VycmVudFNlbEJldClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdjaGlwX3NlbGVjdCcpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdjaGlwX3NlbGVjdCcpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFBsYXllclZpZXcoKVxuICAgIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBsYXllcl9ub2RlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcGFyc2VJbnQoaSk7XG4gICAgICAgICAgICB2YXIgaW5mbztcbiAgICAgICAgICAgIGlmICh0YWcgPj0gdGhpcy50YWJsZV91c2VyaW5mby5sZW5ndGgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5mbyA9IHt9O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMudGFibGVfdXNlcmluZm9bdGFnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGxheWVyX25vZGVbdGFnXS5nZXRDaGlsZEJ5TmFtZShcIk5ldyBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm8udXNlcl9uYW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGVbdGFnXS5nZXRDaGlsZEJ5TmFtZShcInBsX2dvbGRfYmFyXCIpKVxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyX25vZGVbdGFnXS5nZXRDaGlsZEJ5TmFtZShcInBsX2dvbGRfYmFyXCIpLmdldENoaWxkQnlOYW1lKFwiTmV3IExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bShpbmZvLnNjb3JlKTtcblxuICAgICAgICAgICAgdmFyIGhlYWQgPSBpbmZvLnVzZXJfdXJsO1xuICAgICAgICAgICAgdmFyIGhlYWRub2RlID0gdGhpcy5wbGF5ZXJfbm9kZVt0YWddO1xuICAgICAgICAgICAgaWYgKGhlYWQgPCAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhlYWQgPSAwO1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgIGlmIChoZWFkbm9kZS5nZXRDaGlsZEJ5TmFtZShcInBsX2ZhY2VcIikpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaGVhZG5vZGUgPSBoZWFkbm9kZS5nZXRDaGlsZEJ5TmFtZShcInBsX2ZhY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2hlYWRub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5oZWFkc3BmcmFtZVtoZWFkXTtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRIZWFkVGV4dHVyZShoZWFkbm9kZSxoZWFkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93UmVzdWx0KHJldClcbiAgICB7XG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIC8vMDEyIOm+meiZjuWSjCAxMjM0IOm7kee6ouiKseeJh1xuICAgICAgICAvL3ZhciBzYW0gPSB7aHVfY2FyZDoyMzA3LGxvbmdfY2FyZDoyNTgsUmVzdWx0Q29kZToxLHdpbjoxfTtcblxuICAgICAgICAvL3RoaXMucGxheWVyX3Njb3JlXG4gICAgICAgIHRoaXMudGFibGVfdXNlcmluZm9bMF0uc2NvcmUgKz0gcmV0LnVzZXJfd2luO1xuXG4gICAgICAgIHRoaXMuc2V0UG9rZXJTcCgwLHJldC5sb25nX2NhcmQpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKDEscmV0Lmh1X2NhcmQpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgd2luYXJlYSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENoaWxkQnlOYW1lKCd3aW5uZXJfYXJlYV8nK3JldC53aW4pO1xuICAgICAgICAgICAgICAgIHdpbmFyZWEub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgd2luYXJlYS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmFyZWEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVJbigwLjQpLGNjLmZhZGVPdXQoMC40KSxjYy5mYWRlSW4oMC40KSxjYy5mYWRlT3V0KDAuNCkgKSk7ICAgIFxuICAgICAgICAgICAgfSwwLjgpO1xuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpeyAgXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IHRoaXMuY2hpcHNfbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGFycilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlwX25vZGUgPSBhcnJbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlwX25vZGUub25fcG9vbCA9PSByZXQud2luKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaXBfbm9kZS5vd25lciA9PSB0aGlzLnBsYXllcklkKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kcG9zID0gY2MudjIoNjkzLDYxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4yNSxlbmRwb3MpLGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpcF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMjUpLGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaXBfbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZU91dCgwLjIpLGNjLnJlbW92ZVNlbGYoKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwxLjIpO1xuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmIChyZXQud2luID09IDApe1xuICAgICAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdsb25nX3dpbicpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmIChyZXQud2luID09IDEpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdodV93aW4nKTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1lbHNlIGlmIChyZXQud2luID09IDIpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdoZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sMS42KTtcblxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF5ZXJWaWV3KDApO1xuICAgICAgICAgICAgICAgIGlmIChyZXQudXNlcl93aW4+MClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ0FERF9TQ09SRScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubmV0d29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldEdhbWVSZWNvcmRMaXN0XCIsXCJcIik7XG4gICAgICAgICAgICB9LDEuOSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldFBva2VyVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaW1fd2FpdFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGluc3RhbmNlLm1fbFBvb2xOdW0gPSBbMCwwLDBdO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldFBvb2xWaWV3KCk7XG4gICAgICAgICAgICB9LDIuMyk7XG4gICAgICAgIH0sMC44KTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIG9uQmV0KGluZm8pe1xuICAgICAgICAvLyBpbmZvLmJldF9yZXM7XG4gICAgICAgIC8vIGluZm8uYmV0X2dvbGQ7XG4gICAgICAgIC8vIGluZm8udXNlcklkO1xuXG4gICAgICAgIHBsYXlFZmZlY3QoJ2Nob3VtYXhpYXpodScpO1xuICAgICAgICB0aGlzLm1fbFBvb2xOdW1baW5mby5iZXRfcmVzXSArPSBpbmZvLmJldF9nb2xkO1xuICAgICAgICB0aGlzLnNldFBvb2xWaWV3KCk7XG5cbiAgICAgICAgdmFyIGNoaXBfc3RhcnRwb3M7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2hpcF9lbmRwb3M7XG5cbiAgICAgICAgdmFyIGluaXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBlbmRub2RlO1xuICAgICAgICBpZiAoaW5mby5iZXRfcmVzID09IDApe1xuICAgICAgICAgICAgZW5kbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENoaWxkQnlOYW1lKCdEcmFnb25fYmV0dGluZ19hcmVhJyk7XG4gICAgICAgIH1lbHNlIGlmIChpbmZvLmJldF9yZXMgPT0gMSl7XG4gICAgICAgICAgICBlbmRub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q2hpbGRCeU5hbWUoJ1RpZ2VyX2JldHRpbmdfYXJlYScpO1xuICAgICAgICB9ZWxzZSBpZiAoaW5mby5iZXRfcmVzID09IDIpe1xuICAgICAgICAgICAgZW5kbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENoaWxkQnlOYW1lKCdEcmF3X2JldHRpbmdfYXJlYScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG93bmVyVGFnID0gLTE7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy50YWJsZV91c2VyaW5mbylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFibGVfdXNlcmluZm9baV0udXNlcl9pZCtcIlwiID09IGluZm8udXNlcklkK1wiXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3duZXJUYWcgPSBwYXJzZUludChpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMudGFibGVfdXNlcmluZm8pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlX3VzZXJpbmZvW2ldLnVzZXJfaWQrXCJcIiA9PSBpbmZvLnVzZXJJZCtcIlwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVfdXNlcmluZm9baV0uc2NvcmUgLT0gaW5mby5iZXRfZ29sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBsYXllclZpZXcoKTtcbiAgICAgICAgaWYgKG93bmVyVGFnID09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluaXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGNoaXBfc3RhcnRwb3MgPSB0aGlzLmNoaXBfYm94LmdldENoaWxkQnlOYW1lKHRoaXMuY2hpcF9uYW1lW2luZm8uYmV0X2dvbGRdKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3ZhciBlbmRwb3NfbWlkID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWlkJykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHZhciBlbmRwb3NfbWluID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWluJykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHZhciBlbmRwb3NfbWF4ID0gZW5kbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWF4JykuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdFRvdWNoUG9pbnQueCA+PWVuZHBvc19taW4ueCAmJiB0aGlzLmxhc3RUb3VjaFBvaW50LnkgPj1lbmRwb3NfbWluLnlcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmxhc3RUb3VjaFBvaW50LnggPD1lbmRwb3NfbWF4LnggJiYgdGhpcy5sYXN0VG91Y2hQb2ludC55IDw9ZW5kcG9zX21heC55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlbmR4ID0gdGhpcy5sYXN0VG91Y2hQb2ludC54ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYwKS0zMDtcbiAgICAgICAgICAgICAgICB2YXIgZW5keSA9IHRoaXMubGFzdFRvdWNoUG9pbnQueSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo2MCktMzA7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW5keCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooZW5kcG9zX21heC54LWVuZHBvc19taW4ueCkpICsgZW5kcG9zX21pbi54O1xuICAgICAgICAgICAgICAgIHZhciBlbmR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihlbmRwb3NfbWF4LnktZW5kcG9zX21pbi55KSkgKyBlbmRwb3NfbWluLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaXBfZW5kcG9zID0gY2MudjIoZW5keCxlbmR5KTtcblxuICAgICAgICB9XG4gICAgICAgIC8vIGVsc2UgaWYgKG93bmVyVGFnIT0gLTEpXG4gICAgICAgIC8vIHtcblxuICAgICAgICAvLyB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy92YXIgZW5kcG9zX21pZCA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pZCcpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICB2YXIgZW5kcG9zX21pbiA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21pbicpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICB2YXIgZW5kcG9zX21heCA9IGVuZG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21heCcpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG5cblxuICAgICAgICAgICAgdmFyIGVuZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGVuZHBvc19tYXgueC1lbmRwb3NfbWluLngpKSArIGVuZHBvc19taW4ueDtcbiAgICAgICAgICAgIHZhciBlbmR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihlbmRwb3NfbWF4LnktZW5kcG9zX21pbi55KSkgKyBlbmRwb3NfbWluLnk7XG5cbiAgICAgICAgICAgIGNoaXBfZW5kcG9zID0gY2MudjIoZW5keCxlbmR5KTtcblxuICAgICAgICAgICAgY2hpcF9zdGFydHBvcyA9IGNoaXBfZW5kcG9zO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5pdGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2hpcF9ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jaGlwX3ByZWZhYlt0aGlzLmNoaXBfbnVtcy5pbmRleE9mKGluZm8uYmV0X2dvbGQpXSk7XG4gICAgICAgICAgICBjaGlwX25vZGUueCA9IGNoaXBfc3RhcnRwb3MueDtcbiAgICAgICAgICAgIGNoaXBfbm9kZS55ID0gY2hpcF9zdGFydHBvcy55O1xuICAgICAgICAgICAgY2hpcF9ub2RlLnNjYWxlID0gMC40O1xuICAgICAgICAgICAgY2hpcF9ub2RlLnBhcmVudCA9IHRoaXMuY2hpcHNfbm9kZTtcbiAgICAgICAgICAgIGNoaXBfbm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMjUsY2hpcF9lbmRwb3MueCxjaGlwX2VuZHBvcy55KSk7XG5cbiAgICAgICAgICAgIGNoaXBfbm9kZS5vd25lciA9IGluZm8udXNlcklkO1xuICAgICAgICAgICAgY2hpcF9ub2RlLm9uX3Bvb2wgPSBpbmZvLmJldF9yZXM7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmV0QmVnaW4oKVxuICAgIHtcbiAgICAgICAgdGhpcy5uZXR3b3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0R2FtZVJhbmtpbmdMaXN0XCIsXCJcIik7XG4gICAgfSxcblxuICAgIGJldEJlZ2luX3IoKVxuICAgIHtcbiAgICAgICAgcGxheUVmZmVjdCgnc3RhcnRfcycpO1xuICAgICAgICB0aGlzLm1fbFBvb2xOdW0gPSBbMCwwLDBdO1xuICAgICAgICB0aGlzLnNldFBvb2xWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYW5pbV93YWl0XCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1faUdhbWVPdmVyVGltZSA9IERhdGUubm93KCkvMTAwMCsxNTtcblxuICAgICAgICBsZXQgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB2YXIgc2tlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsaGRwaycpO1xuICAgICAgICBza2UuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRDb21wbGV0ZUxpc3RlbmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNrZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGluc3RhbmNlLnNldFBva2VyVmlzaWJsZSh0cnVlKTtcblxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYW5pbV9zdGFydCcpO1xuICAgICAgICAgICAgc3RhcnQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRDb21wbGV0ZUxpc3RlbmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFydC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5zdGFuY2UuYmV0X3RleHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YXJ0LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHNrZS5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBzZXRQb2tlclNwKHRhZyxudW0pXG4gICAge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgaWYgKHRhZyA9PSAwKSBub2RlID0gdGhpcy5wb2tlcl8wO1xuICAgICAgICBpZiAodGFnID09IDEpIG5vZGUgPSB0aGlzLnBva2VyXzE7XG4gICAgICAgIGlmIChudW08MClcbiAgICAgICAge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuY2FyZHNwZnJhbWVbNTJdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBhMSA9IHBhcnNlSW50KG51bS8xNikvMTY7XG4gICAgICAgICAgICB2YXIgYjEgPSBudW0lMTY7XG4gICAgICAgICAgICB2YXIgaSA9IChiMS0xKSoxMyArKGExLTEpO1xuICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjI1LDEuMiwxLjIpLGNjLnNjYWxlVG8oMC4yNSwwLDEuMikpKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuY2FyZHNwZnJhbWVbaV07XG4gICAgICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjI1LDEuMiwxLjIpLGNjLnNjYWxlVG8oMC4yNSwxLDEpKSk7XG4gICAgICAgICAgICB9LDAuNSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGxheUVmZmVjdCgnbGhiX3BfJythMSk7XG4gICAgICAgICAgICB9LDEpO1xuXG4gICAgICAgIH1cbn0sXG5cbiAgICBzZXRQb2tlclZpc2libGUoZmxhZylcbiAgICB7XG4gICAgICAgIHZhciB0ID0gMC4xNTtcbiAgICAgICAgaWYgKCFmbGFnKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnBva2VyXzAucnVuQWN0aW9uKGNjLnNwYXduKGNjLm1vdmVUbyh0LGNjLnYyKC04OC02MCwyNTgrMTIwKSksY2MuZmFkZU91dCh0KSkpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnNldFBva2VyU3AoMCwtMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl8wLnggPSAtODg7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl8wLnkgPSAyNTg7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl8wLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgfSx0KzAuOCk7XG4gICAgICAgICAgICB0aGlzLnBva2VyXzEucnVuQWN0aW9uKGNjLnNwYXduKGNjLm1vdmVUbyh0LGNjLnYyKDg0LTYwLDI1OCsxMjApKSxjYy5mYWRlT3V0KHQpKSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2V0UG9rZXJTcCgwLC0xKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyXzEueCA9IDg0O1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfMS55ID0gMjU4O1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfMS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIH0sdCswLjgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ1NFTkRfQ0FSRCcpO1xuICAgICAgICAgICAgdGhpcy5zZXRQb2tlclNwKDAsLTEpO1xuICAgICAgICAgICAgdGhpcy5wb2tlcl8wLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgdGhpcy5wb2tlcl8wLnggPSAtODgrNjA7XG4gICAgICAgICAgICB0aGlzLnBva2VyXzAueSA9IDI1OCsxMjA7XG4gICAgICAgICAgICB0aGlzLnBva2VyXzAucnVuQWN0aW9uKGNjLnNwYXduKGNjLm1vdmVUbyh0LGNjLnYyKC04OCwyNTgpKSxjYy5mYWRlSW4odCkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdTRU5EX0NBUkQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBva2VyU3AoMSwtMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlcl8xLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJfMS54ID0gODQgLSA2MDtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyXzEueSA9IDI1OCArIDEyMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBva2VyXzEucnVuQWN0aW9uKGNjLnNwYXduKGNjLm1vdmVUbyh0LGNjLnYyKDg0LDI1OCkpLGNjLmZhZGVJbih0KSkpOyAgICAgICAgXG4gICAgICAgICAgICB9LHQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXX0=