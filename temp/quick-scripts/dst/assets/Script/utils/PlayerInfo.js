
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/utils/PlayerInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3572k6edZCHZTfqd5K/Wz0', 'PlayerInfo');
// Script/utils/PlayerInfo.js

"use strict";

/**
 * 玩家信息管理
 */
var PlayerInfo = function () {
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
    this.serverVersion = new Array(8);
    this.localVersion = new Array(8);
    this.needToUpdate = [0, 0, 0, 0, 0, 0, 0, 0];
    this.loginIp = "";
    this.guest = "";
    this.shareUrl = null;
    this.exchangeRate = 1;
    this.account = "";
    this.password = "";
    this.loginCode = "";
    this.sign = "";
    this.gameSign = "";
    this.code = "";
    this.playerId = 0;
    this.playerName = "";
    this.playerCoin = 0;
    this.playerBankCoin = 0;
    this.playerGift = 0;
    this.playerDiamond = 0;
    this.playerHead = null;
    this.playerHeadId = -1;
    this.playerHeadArray = [];
    this.mailList = null;
    this.musicControl = null;
    this.soundEffectControl = null;
    this.isOffical = !1;
    this.phoneNumber = "";
    this.aliAccount = "";
    this.encryptAliAccount = "";
    this.aliName = "";
    this.encryptAliName = "";
    this.gameIp = "";
    this.gameProt = "";
    this.gameName = "";
    this.gameDisconnect = !1;
    this.gameHide = !1;
    this.gameObj = null;
    this.sceneName = "";
    this.isBindPhone = null;
    this.isBindAli = null;
    this.isBindCreditCard = null;
    this.isWithdraw = null;
    this.isWithdrawPhoneCard = null;
    this.isAutoLogin = 0;
    this.paySelect = null;
    this.iosPay = 0;
    this.agent = null;
    this.iosChannel = "";
    this.win_pool = 0;

    this.init_Function = function () {
      cc.game.on(cc.game.EVENT_HIDE, this.gameOnHide_Function.bind(this)), cc.game.on(cc.game.EVENT_SHOW, this.gameOnShow_Function.bind(this));
    };

    this.writeData_Function = function (e, t, i) {
      cc.sys.isNative ? cc.sys.localStorage.setItem(e, JSON.stringify(t)) : localStorage.setItem(e, JSON.stringify(t)), i && i();
    };

    this.readData_Function = function (e) {
      var t = null;
      return t = cc.sys.isNative ? JSON.parse(cc.sys.localStorage.getItem(e)) : JSON.parse(localStorage.getItem(e));
    };

    this.gameOnHide_Function = function () {
      this.gameHide = true;
      this.hideTime = Date.parse(new Date()) / 1000;
    };

    this.gameOnShow_Function = function () {
      if (this.gameHide) {
        this.showTime = Date.parse(new Date()) / 1000;
        /*
        switch (this.gameName) 
        {
            case "Lobby":
                this.showTime - this.hideTime > 30 && this.gameObj.netWorkDisconneted_Function("游戏已断开，请重新连接游戏");
                break;
            case "GrabBull":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "Bull":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "LineGame":
                this.showTime - this.hideTime > 20 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "Fish":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "Bde":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "TwoEight":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "Land":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "Runing":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "Holdem":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            case "Flower":
                this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                break;
            default:
                cc.log(this.gameName);
                break;
        }
        */

        this.gameHide = false;
      }
    };

    this.setGameObj_Function = function (gameObj) {
      this.gameObj = null;
      this.gameObj = gameObj;
    };

    this.changeIp_Function = function (e, t) {
      var i, n, o;

      switch (t) {
        case 0:
          i = e.substr(7), n = i.split(":")[0], o = "http://" + jsb.reflection.callStaticMethod("RootViewController", "getIp:", n) + ":" + i.split(":")[1];
          break;

        case 1:
          o = jsb.reflection.callStaticMethod("RootViewController", "getIp:", e);
      }

      return o;
    };

    this.init_Function();
  }

  return {
    getInstant: new getInstant()
  };
}();

module.exports = PlayerInfo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsc1xcUGxheWVySW5mby5qcyJdLCJuYW1lcyI6WyJQbGF5ZXJJbmZvIiwiZ2V0SW5zdGFudCIsIl9pbnN0YW5jZSIsInVuZGVmaW5lZCIsIlNpbmdsZSIsInNlcnZlclZlcnNpb24iLCJBcnJheSIsImxvY2FsVmVyc2lvbiIsIm5lZWRUb1VwZGF0ZSIsImxvZ2luSXAiLCJndWVzdCIsInNoYXJlVXJsIiwiZXhjaGFuZ2VSYXRlIiwiYWNjb3VudCIsInBhc3N3b3JkIiwibG9naW5Db2RlIiwic2lnbiIsImdhbWVTaWduIiwiY29kZSIsInBsYXllcklkIiwicGxheWVyTmFtZSIsInBsYXllckNvaW4iLCJwbGF5ZXJCYW5rQ29pbiIsInBsYXllckdpZnQiLCJwbGF5ZXJEaWFtb25kIiwicGxheWVySGVhZCIsInBsYXllckhlYWRJZCIsInBsYXllckhlYWRBcnJheSIsIm1haWxMaXN0IiwibXVzaWNDb250cm9sIiwic291bmRFZmZlY3RDb250cm9sIiwiaXNPZmZpY2FsIiwicGhvbmVOdW1iZXIiLCJhbGlBY2NvdW50IiwiZW5jcnlwdEFsaUFjY291bnQiLCJhbGlOYW1lIiwiZW5jcnlwdEFsaU5hbWUiLCJnYW1lSXAiLCJnYW1lUHJvdCIsImdhbWVOYW1lIiwiZ2FtZURpc2Nvbm5lY3QiLCJnYW1lSGlkZSIsImdhbWVPYmoiLCJzY2VuZU5hbWUiLCJpc0JpbmRQaG9uZSIsImlzQmluZEFsaSIsImlzQmluZENyZWRpdENhcmQiLCJpc1dpdGhkcmF3IiwiaXNXaXRoZHJhd1Bob25lQ2FyZCIsImlzQXV0b0xvZ2luIiwicGF5U2VsZWN0IiwiaW9zUGF5IiwiYWdlbnQiLCJpb3NDaGFubmVsIiwid2luX3Bvb2wiLCJpbml0X0Z1bmN0aW9uIiwiY2MiLCJnYW1lIiwib24iLCJFVkVOVF9ISURFIiwiZ2FtZU9uSGlkZV9GdW5jdGlvbiIsImJpbmQiLCJFVkVOVF9TSE9XIiwiZ2FtZU9uU2hvd19GdW5jdGlvbiIsIndyaXRlRGF0YV9GdW5jdGlvbiIsImUiLCJ0IiwiaSIsInN5cyIsImlzTmF0aXZlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZWFkRGF0YV9GdW5jdGlvbiIsInBhcnNlIiwiZ2V0SXRlbSIsImhpZGVUaW1lIiwiRGF0ZSIsInNob3dUaW1lIiwic2V0R2FtZU9ial9GdW5jdGlvbiIsImNoYW5nZUlwX0Z1bmN0aW9uIiwibiIsIm8iLCJzdWJzdHIiLCJzcGxpdCIsImpzYiIsInJlZmxlY3Rpb24iLCJjYWxsU3RhdGljTWV0aG9kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxVQUFVLEdBQUksWUFBWTtBQUMxQjtBQUNKO0FBQ0E7QUFDSSxXQUFTQyxVQUFULEdBQXNCO0FBQ2xCLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSUEsU0FBUyxLQUFLQyxTQUFsQixFQUE2QjtBQUN6QkQsTUFBQUEsU0FBUyxHQUFHLElBQUlFLE1BQUosRUFBWjtBQUNIOztBQUNELFdBQU9GLFNBQVA7QUFDSDtBQUNEO0FBQ0o7QUFDQTs7O0FBQ0ksV0FBU0UsTUFBVCxHQUFrQjtBQUNkLFNBQUtDLGFBQUwsR0FBcUIsSUFBSUMsS0FBSixDQUFVLENBQVYsQ0FBckI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLElBQUlELEtBQUosQ0FBVSxDQUFWLENBQXBCO0FBQ0EsU0FBS0UsWUFBTCxHQUFvQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBQXBCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLQyxRQUFM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eUIsVUFBVWhCLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNyQyxVQUFJQyxDQUFKLEVBQU9lLENBQVAsRUFBVUMsQ0FBVjs7QUFDQSxjQUFRakIsQ0FBUjtBQUNJLGFBQUssQ0FBTDtBQUNJQyxVQUFBQSxDQUFDLEdBQUdGLENBQUMsQ0FBQ21CLE1BQUYsQ0FBUyxDQUFULENBQUosRUFDSUYsQ0FBQyxHQUFHZixDQUFDLENBQUNrQixLQUFGLENBQVEsR0FBUixFQUFhLENBQWIsQ0FEUixFQUVJRixDQUFDLEdBQUcsWUFBWUcsR0FBRyxDQUFDQyxVQUFKLENBQWVDLGdCQUFmLENBQWdDLG9CQUFoQyxFQUFzRCxRQUF0RCxFQUFnRU4sQ0FBaEUsQ0FBWixHQUFpRixHQUFqRixHQUF1RmYsQ0FBQyxDQUFDa0IsS0FBRixDQUFRLEdBQVIsRUFBYSxDQUFiLENBRi9GO0FBR0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0lGLFVBQUFBLENBQUMsR0FBR0csR0FBRyxDQUFDQyxVQUFKLENBQWVDLGdCQUFmLENBQWdDLG9CQUFoQyxFQUFzRCxRQUF0RCxFQUFnRXZCLENBQWhFLENBQUo7QUFQUjs7QUFTQSxhQUFPa0IsQ0FBUDtBQUNILEtBWkQ7O0FBYUEsU0FBSzVCLGFBQUw7QUFDSDs7QUFDRCxTQUFPO0FBQ0h0RCxJQUFBQSxVQUFVLEVBQUUsSUFBSUEsVUFBSjtBQURULEdBQVA7QUFHSCxDQXJKZ0IsRUFBakI7O0FBc0pBd0YsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUYsVUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDnjqnlrrbkv6Hmga/nrqHnkIZcclxuICovXHJcbnZhciBQbGF5ZXJJbmZvID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICog5Y2V5L6L5qih5byPXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEluc3RhbnQoKSB7XHJcbiAgICAgICAgdmFyIF9pbnN0YW5jZTtcclxuICAgICAgICBpZiAoX2luc3RhbmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgX2luc3RhbmNlID0gbmV3IFNpbmdsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpgLvovpHlsYJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gU2luZ2xlKCkge1xyXG4gICAgICAgIHRoaXMuc2VydmVyVmVyc2lvbiA9IG5ldyBBcnJheSg4KTtcclxuICAgICAgICB0aGlzLmxvY2FsVmVyc2lvbiA9IG5ldyBBcnJheSg4KTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmxvZ2luSXAgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZ3Vlc3QgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2hhcmVVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXhjaGFuZ2VSYXRlID0gMTtcclxuICAgICAgICB0aGlzLmFjY291bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubG9naW5Db2RlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNpZ24gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZ2FtZVNpZ24gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY29kZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJOYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLnBsYXllckNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMucGxheWVyQmFua0NvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMucGxheWVyR2lmdCA9IDA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJEaWFtb25kID0gMDtcclxuICAgICAgICB0aGlzLnBsYXllckhlYWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGxheWVySGVhZElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkQXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLm1haWxMaXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm11c2ljQ29udHJvbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zb3VuZEVmZmVjdENvbnRyb2wgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNPZmZpY2FsID0gITE7XHJcbiAgICAgICAgdGhpcy5waG9uZU51bWJlciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5hbGlBY2NvdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmVuY3J5cHRBbGlBY2NvdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFsaU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZW5jcnlwdEFsaU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZ2FtZUlwID0gXCJcIjtcclxuICAgICAgICB0aGlzLmdhbWVQcm90ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmdhbWVOYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmdhbWVEaXNjb25uZWN0ID0gITE7XHJcbiAgICAgICAgdGhpcy5nYW1lSGlkZSA9ICExO1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zY2VuZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuaXNCaW5kUGhvbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNCaW5kQWxpID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzQmluZENyZWRpdENhcmQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNXaXRoZHJhdyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pc1dpdGhkcmF3UGhvbmVDYXJkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzQXV0b0xvZ2luID0gMDtcclxuICAgICAgICB0aGlzLnBheVNlbGVjdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pb3NQYXkgPSAwO1xyXG4gICAgICAgIHRoaXMuYWdlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW9zQ2hhbm5lbCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy53aW5fcG9vbCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbml0X0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgdGhpcy5nYW1lT25IaWRlX0Z1bmN0aW9uLmJpbmQodGhpcykpLFxyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMuZ2FtZU9uU2hvd19GdW5jdGlvbi5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy53cml0ZURhdGFfRnVuY3Rpb24gPSBmdW5jdGlvbiAoZSwgdCwgaSkge1xyXG4gICAgICAgICAgICBjYy5zeXMuaXNOYXRpdmUgPyBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oZSwgSlNPTi5zdHJpbmdpZnkodCkpIDogbG9jYWxTdG9yYWdlLnNldEl0ZW0oZSwgSlNPTi5zdHJpbmdpZnkodCkpLFxyXG4gICAgICAgICAgICAgICAgaSAmJiBpKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVhZERhdGFfRnVuY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiB0ID0gY2Muc3lzLmlzTmF0aXZlID8gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oZSkpIDogSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShlKSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZU9uSGlkZV9GdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGlkZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVRpbWUgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKSAvIDEwMDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdhbWVPblNob3dfRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVIaWRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nYW1lTmFtZSkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkxvYmJ5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUgLSB0aGlzLmhpZGVUaW1lID4gMzAgJiYgdGhpcy5nYW1lT2JqLm5ldFdvcmtEaXNjb25uZXRlZF9GdW5jdGlvbihcIua4uOaIj+W3suaWreW8gO+8jOivt+mHjeaWsOi/nuaOpea4uOaIj1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkdyYWJCdWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUgLSB0aGlzLmhpZGVUaW1lID4gNSAmJiAodGhpcy5nYW1lT2JqLmdhbWVFeGl0ID0gdHJ1ZSwgdGhpcy5nYW1lT2JqLmRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQnVsbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lIC0gdGhpcy5oaWRlVGltZSA+IDUgJiYgKHRoaXMuZ2FtZU9iai5nYW1lRXhpdCA9IHRydWUsIHRoaXMuZ2FtZU9iai5kaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVHYW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUgLSB0aGlzLmhpZGVUaW1lID4gMjAgJiYgKHRoaXMuZ2FtZU9iai5nYW1lRXhpdCA9IHRydWUsIHRoaXMuZ2FtZU9iai5kaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkZpc2hcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtIHRoaXMuaGlkZVRpbWUgPiA1ICYmICh0aGlzLmdhbWVPYmouZ2FtZUV4aXQgPSB0cnVlLCB0aGlzLmdhbWVPYmouZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJCZGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtIHRoaXMuaGlkZVRpbWUgPiA1ICYmICh0aGlzLmdhbWVPYmouZ2FtZUV4aXQgPSB0cnVlLCB0aGlzLmdhbWVPYmouZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUd29FaWdodFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lIC0gdGhpcy5oaWRlVGltZSA+IDUgJiYgKHRoaXMuZ2FtZU9iai5nYW1lRXhpdCA9IHRydWUsIHRoaXMuZ2FtZU9iai5kaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkxhbmRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtIHRoaXMuaGlkZVRpbWUgPiA1ICYmICh0aGlzLmdhbWVPYmouZ2FtZUV4aXQgPSB0cnVlLCB0aGlzLmdhbWVPYmouZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJSdW5pbmdcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtIHRoaXMuaGlkZVRpbWUgPiA1ICYmICh0aGlzLmdhbWVPYmouZ2FtZUV4aXQgPSB0cnVlLCB0aGlzLmdhbWVPYmouZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJIb2xkZW1cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtIHRoaXMuaGlkZVRpbWUgPiA1ICYmICh0aGlzLmdhbWVPYmouZ2FtZUV4aXQgPSB0cnVlLCB0aGlzLmdhbWVPYmouZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJGbG93ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtIHRoaXMuaGlkZVRpbWUgPiA1ICYmICh0aGlzLmdhbWVPYmouZ2FtZUV4aXQgPSB0cnVlLCB0aGlzLmdhbWVPYmouZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyh0aGlzLmdhbWVOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNldEdhbWVPYmpfRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2FtZU9iaikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVPYmogPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVPYmogPSBnYW1lT2JqO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VJcF9GdW5jdGlvbiA9IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBuLCBvO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBpID0gZS5zdWJzdHIoNyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBpLnNwbGl0KFwiOlwiKVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbyA9IFwiaHR0cDovL1wiICsganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIlJvb3RWaWV3Q29udHJvbGxlclwiLCBcImdldElwOlwiLCBuKSArIFwiOlwiICsgaS5zcGxpdChcIjpcIilbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJSb290Vmlld0NvbnRyb2xsZXJcIiwgXCJnZXRJcDpcIiwgZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0X0Z1bmN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbnQ6IG5ldyBnZXRJbnN0YW50KClcclxuICAgIH1cclxufSkoKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJJbmZvOyJdfQ==