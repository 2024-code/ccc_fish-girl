"use strict";
cc._RF.push(module, 'd98b5o2AJJAFa6/4Y+v/bTy', 'LHDB_Network');
// Script/Lhdb/LHDB_Network.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.gameMain = this.node.getComponent('LHDB_Main');
    this.sign = this.playerInfo.gameSign;
    this.userId = this.playerInfo.playerId;
    this.port = ':15200';
    this.timer = 0; //连接网络

    if (cc.sys.isNative) {
      this.socket = SocketIO.connect(Lhjconfig.Server_IP + this.port);
    } else {
      var socket = require("socket-io");

      this.socket = socket(Lhjconfig.Server_IP + this.port);
    }

    this.registEvent();
  },
  registEvent: function registEvent() {
    var _this = this;

    this.socket.on("connected", function (ret) {
      cc.log('connected:' + ret);

      if (ret) {
        _this.socket.emit("LoginGame", JSON.stringify({
          userid: _this.userId,
          //用户ID
          gametype: 11,
          //游戏类型
          sign: _this.sign //签名

        }));
      }
    });
    this.socket.on("loginGameResult", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('游戏登陆成功=======================' + JSON.stringify(result));
      LHDB_LOBBYNET.disconnect();
      _this.gameMain.lblAllCoin.string = Helper.fixNum(result.Obj.score);

      if (result.resultid) {
        //游戏登录成功
        _this.socket.emit("LoginRoom", JSON.stringify({
          roomid: 1
        }));
      } else {
        cc.log(result.msg);
      }
    });
    this.socket.on("LoginRoomResult", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('LoginRoom结果' + JSON.stringify(result)); //设置奖池

      _this.gameMain.lblCoin.string = (result.ResultData.gameDict.big_win_score * 0.01).toFixed(2);
      _this.gameMain.lblGoldPool.string = result.ResultData.score_pool;

      _this.gameMain.setLevel(result.ResultData.gameDict.game_level_num);

      var list = _this.gameMain.levelList[_this.gameMain.level - 1].children;

      for (var i = 0; i < result.ResultData.gameDict.zuan_tou; i++) {
        list[i].active = false;
      }
    });
    this.socket.on("clearGameDictResult", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      if (result) {
        _this.gameMain.exitGame();
      }
    });
    this.socket.on("lotteryResult", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('下注结果' + JSON.stringify(result));
      var data = result.dictAnalyseResult;

      if (result.ResultCode >= 1) {
        _this.gameMain.gemList = [];
        _this.gameMain.gemPidList = [];

        _this.gameMain.areaList[data.game_level_num - 1].removeAllChildren();

        var _loop = function _loop(i) {
          _this.gameMain.scheduleOnce(function () {
            for (var j in data.res_list[i]) {
              if (parseInt(i) > 0) {
                if (_this.gameMain.gemPidList[j] != data.res_list[i][j]) {
                  _this.gameMain.levelDown(data.game_level_num, parseInt(j), data.res_list[i][j]);
                }
              } else {
                _this.gameMain.levelDown(data.game_level_num, parseInt(j), data.res_list[i][j]);
              }
            }

            if (!!data.res_list[i] && data.res_list[i].length > 0) {
              _this.scheduleOnce(function () {
                _this.gameMain.audio.playLandAudio();
              }, 0.7);
            }

            _this.gameMain.scheduleOnce(function () {
              for (var _j in data.win_temp_list[i]) {
                _this.gameMain.gemBoo(data.win_temp_list[i][_j]);
              }

              if (!!data.win_temp_list[i] && data.win_temp_list[i].length > 0) {
                _this.gameMain.audio.playBoo();
              }
            }, 1);

            _this.gameMain.scheduleOnce(function () {
              _this.gameMain.cleanBoo(data.game_level_num);
            }, 1.6);
          }, parseInt(i) * 1.8);
        };

        for (var i in data.res_list) {
          _loop(i);
        }

        _this.gameMain.scheduleOnce(function () {
          _this.gameMain.tmOffset = true;
          _this.gameMain.startBtn.interactable = true;
          _this.gameMain.tuoguan && !data.is_big_win && _this.gameMain.startGame();
          _this.gameMain.lblCoin.string = Helper.fixNum(data.user_game_dict.big_win_score);
          _this.gameMain.lblAllCoin.string = Helper.fixNum(data.user_score);

          if (data.user_game_dict.game_level_num != _this.gameMain.level) {
            _this.gameMain.setLevel(data.user_game_dict.game_level_num);
          }

          if (data.is_big_win) {
            var _this$gameMain;

            if (_this.gameMain.tuoguan) {
              _this.gameMain.tuoguan = !_this.gameMain.tuoguan;
              _this.gameMain.tuoguanList[0].active = !_this.gameMain.tuoguan;
              _this.gameMain.tuoguanList[1].active = _this.gameMain.tuoguan;
            }

            (_this$gameMain = _this.gameMain).setBox.apply(_this$gameMain, data.big_win);
          }
        }, data.res_list.length * 1.8);
      } else if (result.ResultCode == -2) {
        _this.gameMain.showTip('游戏币不足');

        _this.gameMain.startBtn.interactable = true;
        _this.gameMain.tmOffset = true;

        if (_this.gameMain.tuoguan) {
          _this.gameMain.tuoguan = !_this.gameMain.tuoguan;
          _this.gameMain.tuoguanList[0].active = !_this.gameMain.tuoguan;
          _this.gameMain.tuoguanList[1].active = _this.gameMain.tuoguan;
        }
      }
    });
  },
  changeResultJSON_Function: function changeResultJSON_Function(ret) {
    if (cc.sys.isNative) {
      return JSON.parse(ret);
    }

    return ret;
  }
});

cc._RF.pop();