
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/roulette/RouletteNet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b61cbuQ6RhDsKZnAGUrz9li', 'RouletteNet');
// Script/roulette/RouletteNet.js

"use strict";

var RouletteNetWork = function () {
  /**
   * 单例模式
   */
  function getInstant() {
    var _instance;

    if (_instance === undefined) {
      _instance = new Single();
    }

    return _instance;
  }
  /**
   * 逻辑层
   */


  function Single() {
    var _this = this;

    this.lobbyMain = null;
    this.roulette = null;
    this.rouletteSocket = null;
    this.playerInfo = null;
    this.playerHead = null;
    this.userid = null;

    this.init = function () {
      _this.playerInfo = require("PlayerInfo").getInstant;
    };

    this.loginGame_Function = function (loginIP, port, userid, sign) {
      loginIP = Lhjconfig.Server_IP;
      port = Lhjconfig.roulette_port;
      _this.userid = userid;
      var socket = null;

      if (cc.sys.isNative) {
        _this.rouletteSocket = SocketIO.connect(loginIP + port);
      } else {
        socket = require("socket-io");
        _this.rouletteSocket = socket(loginIP + port);
      } //用户连接游戏服务器


      _this.connectServer_Function(userid, sign); //连接


      _this.rouletteSocket.on("connected", function (ret) {
        if (ret) {
          try {
            //进入游戏
            _this.rouletteSocket.emit("LoginGame", JSON.stringify({
              userid: userid,
              //用户ID
              gametype: 11,
              //游戏类型
              sign: sign //签名

            }));
          } catch (error) {}
        }
      });
    };

    this.connectServer_Function = function (userid, sign) {
      _this.rouletteSocket && _this.rouletteSocket.on("loginGameResult", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        console.log('loginGameResult', result);

        if (result.resultid) {
          //游戏登录成
          _this.history = result.Obj.history_win;
          _this.playerInfo.playerHeadId = result.Obj.headimgurl;
          _this.playerInfo.playerCoin = result.Obj.score;

          if (!!_this.lobbyMain && !!_this.lobbyMain.getComponent("LobbyMain")) {
            _this.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();

            _this.lobbyMain.bg_Black.active = true;
          }

          _this.playerInfo.gameDisconnect = false;
          _this.playerInfo.gameName = "Roulette";
          cc.audioEngine.stopAll();
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("RouletteCrystal");

          _this.addEvent();
        } else {
          //游戏登录失败
          _this.lobbyMain.getComponent("LobbyMain").loadGameScene = false;

          _this.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);

          _this.eventOn = true;
        }
      });

      _this.addEvent = function () {
        _this.rouletteSocket.on("BetStart", function (data) {
          console.log("开始下注", data);

          _this.roulette.startBet();
        });

        _this.rouletteSocket.on("lotteryResult", function (data) {
          var result = _this.changeResultJSON_Function(data);

          console.log("下注结果", result);

          if (result.ResultCode == 2) {
            var cData = result.bet_dict_list[0];

            _this.roulette.bet(cData.pos, cData.bet_gold);

            _this.roulette.usrScore.string = (data.score / 100).toFixed(2);
          }
        });

        _this.rouletteSocket.on("OpenWinResult", function (data) {
          var result = _this.changeResultJSON_Function(data);

          console.log("OpenWinResult", result);

          _this.roulette.showResult(result.win, result.win_score, result.user_score, result.history_win);
        });
      };
    };

    this.setLobbyMainObj_Function = function (scene) {
      _this.lobbyMain = scene;
    };

    this.changeResultJSON_Function = function (ret) {
      if (cc.sys.isNative) {
        return JSON.parse(ret);
      }

      return ret;
    };

    this.init();
    /**************提交事件****************/

    this.lotteryEmit = function (type, gold, pos, res) {
      _this.rouletteSocket.emit('lottery', JSON.stringify([{
        bet_type: type,
        bet_res: res,
        bet_gold: gold * 100,
        pos: pos
      }]));
    };
  }

  return {
    getInstant: new getInstant()
  };
}();

module.exports = RouletteNetWork;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxyb3VsZXR0ZVxcUm91bGV0dGVOZXQuanMiXSwibmFtZXMiOlsiUm91bGV0dGVOZXRXb3JrIiwiZ2V0SW5zdGFudCIsIl9pbnN0YW5jZSIsInVuZGVmaW5lZCIsIlNpbmdsZSIsImxvYmJ5TWFpbiIsInJvdWxldHRlIiwicm91bGV0dGVTb2NrZXQiLCJwbGF5ZXJJbmZvIiwicGxheWVySGVhZCIsInVzZXJpZCIsImluaXQiLCJyZXF1aXJlIiwibG9naW5HYW1lX0Z1bmN0aW9uIiwibG9naW5JUCIsInBvcnQiLCJzaWduIiwiTGhqY29uZmlnIiwiU2VydmVyX0lQIiwicm91bGV0dGVfcG9ydCIsInNvY2tldCIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJjb25uZWN0U2VydmVyX0Z1bmN0aW9uIiwib24iLCJyZXQiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsImdhbWV0eXBlIiwiZXJyb3IiLCJyZXN1bHQiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwiY29uc29sZSIsImxvZyIsInJlc3VsdGlkIiwiaGlzdG9yeSIsIk9iaiIsImhpc3Rvcnlfd2luIiwicGxheWVySGVhZElkIiwiaGVhZGltZ3VybCIsInBsYXllckNvaW4iLCJzY29yZSIsImdldENvbXBvbmVudCIsIm5ldFdvcmsiLCJkaXNjb25uZWN0IiwiYmdfQmxhY2siLCJhY3RpdmUiLCJnYW1lRGlzY29ubmVjdCIsImdhbWVOYW1lIiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwiZmluZCIsIlFpZUh1YW5TY2VuZV9ub3JtYWwiLCJhZGRFdmVudCIsImxvYWRHYW1lU2NlbmUiLCJzaG93TWVzc2FnZWJveF9GdW5jdGlvbiIsIm1zZyIsImV2ZW50T24iLCJkYXRhIiwic3RhcnRCZXQiLCJSZXN1bHRDb2RlIiwiY0RhdGEiLCJiZXRfZGljdF9saXN0IiwiYmV0IiwicG9zIiwiYmV0X2dvbGQiLCJ1c3JTY29yZSIsInN0cmluZyIsInRvRml4ZWQiLCJzaG93UmVzdWx0Iiwid2luIiwid2luX3Njb3JlIiwidXNlcl9zY29yZSIsInNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiIsInNjZW5lIiwicGFyc2UiLCJsb3R0ZXJ5RW1pdCIsInR5cGUiLCJnb2xkIiwicmVzIiwiYmV0X3R5cGUiLCJiZXRfcmVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxlQUFlLEdBQUksWUFBTTtBQUMzQjtBQUNGO0FBQ0E7QUFDRSxXQUFTQyxVQUFULEdBQXNCO0FBQ3BCLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSUEsU0FBUyxLQUFLQyxTQUFsQixFQUE2QjtBQUMzQkQsTUFBQUEsU0FBUyxHQUFHLElBQUlFLE1BQUosRUFBWjtBQUNEOztBQUNELFdBQU9GLFNBQVA7QUFDRDtBQUNEO0FBQ0Y7QUFDQTs7O0FBQ0UsV0FBU0UsTUFBVCxHQUFrQjtBQUFBOztBQUNoQixTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFkOztBQUVBLFNBQUtDLElBQUwsR0FBWSxZQUFNO0FBQ2hCLE1BQUEsS0FBSSxDQUFDSCxVQUFMLEdBQWtCSSxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCWCxVQUF4QztBQUNELEtBRkQ7O0FBSUEsU0FBS1ksa0JBQUwsR0FBMEIsVUFBQ0MsT0FBRCxFQUFVQyxJQUFWLEVBQWdCTCxNQUFoQixFQUF3Qk0sSUFBeEIsRUFBaUM7QUFDekRGLE1BQUFBLE9BQU8sR0FBR0csU0FBUyxDQUFDQyxTQUFwQjtBQUNBSCxNQUFBQSxJQUFJLEdBQUdFLFNBQVMsQ0FBQ0UsYUFBakI7QUFDQSxNQUFBLEtBQUksQ0FBQ1QsTUFBTCxHQUFjQSxNQUFkO0FBQ0Es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Q0MsU0FBTCxDQUFlLENBQUM7QUFDbERxRCxRQUFBQSxRQUFRLEVBQUVILElBRHdDO0FBRWxESSxRQUFBQSxPQUFPLEVBQUVGLEdBRnlDO0FBR2xEZCxRQUFBQSxRQUFRLEVBQUVhLElBQUksR0FBRyxHQUhpQztBQUlsRGQsUUFBQUEsR0FBRyxFQUFFQTtBQUo2QyxPQUFELENBQWYsQ0FBcEM7QUFNRCxLQVBEO0FBUUQ7O0FBRUQsU0FBTztBQUNMbkUsSUFBQUEsVUFBVSxFQUFFLElBQUlBLFVBQUo7QUFEUCxHQUFQO0FBR0QsQ0FwSXFCLEVBQXRCOztBQXNJQXFGLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnZGLGVBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgUm91bGV0dGVOZXRXb3JrID0gKCgpID0+IHtcclxuICAvKipcclxuICAgKiDljZXkvovmqKHlvI9cclxuICAgKi9cclxuICBmdW5jdGlvbiBnZXRJbnN0YW50KCkge1xyXG4gICAgdmFyIF9pbnN0YW5jZTtcclxuICAgIGlmIChfaW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBfaW5zdGFuY2UgPSBuZXcgU2luZ2xlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiDpgLvovpHlsYJcclxuICAgKi9cclxuICBmdW5jdGlvbiBTaW5nbGUoKSB7XHJcbiAgICB0aGlzLmxvYmJ5TWFpbiA9IG51bGw7XHJcbiAgICB0aGlzLnJvdWxldHRlID0gbnVsbDtcclxuICAgIHRoaXMucm91bGV0dGVTb2NrZXQgPSBudWxsO1xyXG4gICAgdGhpcy5wbGF5ZXJJbmZvID0gbnVsbDtcclxuICAgIHRoaXMucGxheWVySGVhZCA9IG51bGw7XHJcbiAgICB0aGlzLnVzZXJpZCA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5pbml0ID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmxvZ2luR2FtZV9GdW5jdGlvbiA9IChsb2dpbklQLCBwb3J0LCB1c2VyaWQsIHNpZ24pID0+IHtcclxuICAgICAgbG9naW5JUCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgIHBvcnQgPSBMaGpjb25maWcucm91bGV0dGVfcG9ydDtcclxuICAgICAgdGhpcy51c2VyaWQgPSB1c2VyaWQ7XHJcbiAgICAgIHZhciBzb2NrZXQgPSBudWxsO1xyXG4gICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5yb3VsZXR0ZVNvY2tldCA9IFNvY2tldElPLmNvbm5lY3QobG9naW5JUCArIHBvcnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNvY2tldCA9IHJlcXVpcmUoXCJzb2NrZXQtaW9cIik7XHJcbiAgICAgICAgdGhpcy5yb3VsZXR0ZVNvY2tldCA9IHNvY2tldChsb2dpbklQICsgcG9ydCk7XHJcbiAgICAgIH1cclxuICAgICAgLy/nlKjmiLfov57mjqXmuLjmiI/mnI3liqHlmahcclxuICAgICAgdGhpcy5jb25uZWN0U2VydmVyX0Z1bmN0aW9uKHVzZXJpZCwgc2lnbik7XHJcblxyXG4gICAgICAvL+i/nuaOpVxyXG4gICAgICB0aGlzLnJvdWxldHRlU29ja2V0Lm9uKFwiY29ubmVjdGVkXCIsIHJldCA9PiB7XHJcbiAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy/ov5vlhaXmuLjmiI9cclxuICAgICAgICAgICAgdGhpcy5yb3VsZXR0ZVNvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCwgLy/nlKjmiLdJRFxyXG4gICAgICAgICAgICAgIGdhbWV0eXBlOiAxMSwgLy/muLjmiI/nsbvlnotcclxuICAgICAgICAgICAgICBzaWduOiBzaWduIC8v562+5ZCNXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY29ubmVjdFNlcnZlcl9GdW5jdGlvbiA9ICh1c2VyaWQsIHNpZ24pID0+IHtcclxuICAgICAgdGhpcy5yb3VsZXR0ZVNvY2tldCAmJiB0aGlzLnJvdWxldHRlU29ja2V0Lm9uKFwibG9naW5HYW1lUmVzdWx0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2dpbkdhbWVSZXN1bHQnLCByZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQucmVzdWx0aWQpIHsgLy/muLjmiI/nmbvlvZXmiJBcclxuICAgICAgICAgIHRoaXMuaGlzdG9yeSA9IHJlc3VsdC5PYmouaGlzdG9yeV93aW47XHJcbiAgICAgICAgICB0aGlzLnBsYXllckluZm8ucGxheWVySGVhZElkID0gcmVzdWx0Lk9iai5oZWFkaW1ndXJsO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4gPSByZXN1bHQuT2JqLnNjb3JlO1xyXG4gICAgICAgICAgaWYgKCEhdGhpcy5sb2JieU1haW4gJiYgISF0aGlzLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW4uZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW4uYmdfQmxhY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJSb3VsZXR0ZVwiO1xyXG4gICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcIlJvdWxldHRlQ3J5c3RhbFwiKTtcclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy/muLjmiI/nmbvlvZXlpLHotKVcclxuICAgICAgICAgIHRoaXMubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5sb2FkR2FtZVNjZW5lID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgNCk7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50T24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmFkZEV2ZW50ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB0aGlzLnJvdWxldHRlU29ja2V0Lm9uKFwiQmV0U3RhcnRcIiwgZGF0YSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+S4i+azqFwiLCBkYXRhKTtcclxuICAgICAgICAgIHRoaXMucm91bGV0dGUuc3RhcnRCZXQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3VsZXR0ZVNvY2tldC5vbihcImxvdHRlcnlSZXN1bHRcIiwgZGF0YSA9PiB7XHJcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCLkuIvms6jnu5PmnpxcIiwgcmVzdWx0KTtcclxuICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBjRGF0YSA9IHJlc3VsdC5iZXRfZGljdF9saXN0WzBdO1xyXG4gICAgICAgICAgICB0aGlzLnJvdWxldHRlLmJldChjRGF0YS5wb3MsIGNEYXRhLmJldF9nb2xkKTtcclxuICAgICAgICAgICAgdGhpcy5yb3VsZXR0ZS51c3JTY29yZS5zdHJpbmcgPSAoZGF0YS5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3VsZXR0ZVNvY2tldC5vbihcIk9wZW5XaW5SZXN1bHRcIiwgZGF0YSA9PiB7XHJcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV2luUmVzdWx0XCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLnJvdWxldHRlLnNob3dSZXN1bHQocmVzdWx0LndpbiwgcmVzdWx0Lndpbl9zY29yZSwgcmVzdWx0LnVzZXJfc2NvcmUsIHJlc3VsdC5oaXN0b3J5X3dpbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24gPSBzY2VuZSA9PiB7XHJcbiAgICAgIHRoaXMubG9iYnlNYWluID0gc2NlbmU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiA9IHJldCA9PiB7XHJcbiAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKuaPkOS6pOS6i+S7tioqKioqKioqKioqKioqKiovXHJcbiAgICB0aGlzLmxvdHRlcnlFbWl0ID0gKHR5cGUsIGdvbGQsIHBvcywgcmVzKSA9PiB7XHJcbiAgICAgIHRoaXMucm91bGV0dGVTb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KFt7XHJcbiAgICAgICAgYmV0X3R5cGU6IHR5cGUsXHJcbiAgICAgICAgYmV0X3JlczogcmVzLFxyXG4gICAgICAgIGJldF9nb2xkOiBnb2xkICogMTAwLFxyXG4gICAgICAgIHBvczogcG9zXHJcbiAgICAgIH1dKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ2V0SW5zdGFudDogbmV3IGdldEluc3RhbnQoKVxyXG4gIH1cclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUm91bGV0dGVOZXRXb3JrOyJdfQ==