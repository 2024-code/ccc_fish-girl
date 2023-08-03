
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/SocketIO/game_socket.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c94e0gRURhPaYwxRD54I6v4', 'game_socket');
// LaoHuJi/module/SocketIO/game_socket.js

"use strict";

var game_socket = {
  socket: null,
  Nowcanvas: null,
  lobbyMain: null,
  //脚本的this作用域
  isconn: false,
  //是否连接过服务器
  socket_Inin: function socket_Inin(url, name, userInfo) {
    var self = this;

    if (this.socket == null || this.isconn == false) {
      console.log(name + '_connIng', url);
      this.socket = io.connect(url);
      this.lobbyMain = require("../../../Script/Lobby/LobbyNetWork");
      console.log(userInfo);
    }

    this.socket.on('connect_failed', function (mes) {
      console.log("连接失败");
    });
    this.socket.on('connecting', function (mes) {
      console.log("正在连接");
    });
    this.socket.on('error', function (mes) {
      console.log("连接错误");
    });
    this.socket.on('connected', function (msg) {
      console.log('连上了````````');

      if (!self.isconn) {
        self.OnEvent();
        self.isconn = true;
      }

      self.reqBet('LoginGame', JSON.stringify({
        userid: userInfo.playerId,
        gametype: null,
        sign: userInfo.gameSign
      })); //self.reqBet('LoginRoom',{roomid:1});
    });
  },
  OnEvent: function OnEvent() {
    var self = this;
    this.socket.on('loginGameResult', function (data) {
      console.log('loginGameResult:', data);
      self.reqBet('LoginfreeCount', null);
      self.lobbyMain.lobbyMain.enterRoom = true;
      self.lobbyMain.socket.disconnect(); //断开大厅长连接

      self.reqBet('LoginRoom', JSON.stringify({
        roomid: 1
      }));
    });
    this.socket.on('lotteryResult', function (data) {
      console.log('lotteryResult:', data);

      if (data.ResultCode == -2) {
        return;
      } //金币不够相关处理


      var data1 = data.ResultData;
      data1.userscore = (data1.userscore * 0.01).toFixed(2); //强行小数

      data.dictAnalyseResult.win = data.dictAnalyseResult.win * 0.01; //强行小数

      self.Nowcanvas.onBet(null, data.dictAnalyseResult, data1);
      self.Nowcanvas.onGetAccountInfo(data.ResultCode, data1.userscore, data.dictAnalyseResult.getFreeTime.nFreeTime);
    });
    this.socket.on('LoginRoomResult', function (data) {
      console.log('LoginRoomResult', data); //self.canvas.onFreeTime(data.ResultData.freeCount);                    //调用刷新免费次数的方法 
    });
    this.socket.on('LoginfreeCountResult', function (data) {
      console.log('LoginfreeCountResult:', data);
      self.Nowcanvas.onFreeTime(data.freeCount);
    });
  },
  reqBet: function reqBet(event, data) {
    //console.log('reqBet',data);
    this.socket.emit(event, data);
  },
  exit: function exit() {
    console.log('执行断开游戏连接方法');
    this.socket.disconnect();
    this.socket = null;
    this.isconn = false;
    this.canvas = null;
  }
};
module.exports = game_socket;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxTb2NrZXRJT1xcZ2FtZV9zb2NrZXQuanMiXSwibmFtZXMiOlsiZ2FtZV9zb2NrZXQiLCJzb2NrZXQiLCJOb3djYW52YXMiLCJsb2JieU1haW4iLCJpc2Nvbm4iLCJzb2NrZXRfSW5pbiIsInVybCIsIm5hbWUiLCJ1c2VySW5mbyIsInNlbGYiLCJjb25zb2xlIiwibG9nIiwiaW8iLCJjb25uZWN0IiwicmVxdWlyZSIsIm9uIiwibWVzIiwibXNnIiwiT25FdmVudCIsInJlcUJldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyaWQiLCJwbGF5ZXJJZCIsImdhbWV0eXBlIiwic2lnbiIsImdhbWVTaWduIiwiZGF0YSIsImVudGVyUm9vbSIsImRpc2Nvbm5lY3QiLCJyb29taWQiLCJSZXN1bHRDb2RlIiwiZGF0YTEiLCJSZXN1bHREYXRhIiwidXNlcnNjb3JlIiwidG9GaXhlZCIsImRpY3RBbmFseXNlUmVzdWx0Iiwid2luIiwib25CZXQiLCJvbkdldEFjY291bnRJbmZvIiwiZ2V0RnJlZVRpbWUiLCJuRnJlZVRpbWUiLCJvbkZyZWVUaW1lIiwiZnJlZUNvdW50IiwiZXZlbnQiLCJlbWl0IiwiZXhpdCIsImNhbnZhcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFDO0FBQ1pDLEVBQUFBLE1BQU0sRUFBQyxJQURLO0FBRVpDLEVBQUFBLFNBQVMsRUFBQyxJQUZFO0FBR1pDLEVBQUFBLFNBQVMsRUFBQyxJQUhFO0FBR0k7QUFDaEJDLEVBQUFBLE1BQU0sRUFBQyxLQUpLO0FBSUk7QUFDaEJDLEVBQUFBLFdBTFksdUJBS0FDLEdBTEEsRUFLSUMsSUFMSixFQUtTQyxRQUxULEVBS2tCO0FBQzFCLFFBQUlDLElBQUksR0FBQyxJQUFUOztBQUdBLFFBQUcsS0FBS1IsTUFBTCxJQUFhLElBQWIsSUFBbUIsS0FBS0csTUFBTCxJQUFhLEtBQW5DLEVB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QUFZLElBQVo7QUFDQSxTQUFLRyxNQUFMLEdBQVksS0FBWjtBQUNBLFNBQUsyQyxNQUFMLEdBQVksSUFBWjtBQUNIO0FBOUVXLENBQWhCO0FBaUZBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJqRCxXQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGdhbWVfc29ja2V0PXtcclxuICAgIHNvY2tldDpudWxsLFxyXG4gICAgTm93Y2FudmFzOm51bGwsXHJcbiAgICBsb2JieU1haW46bnVsbCwgLy/ohJrmnKznmoR0aGlz5L2c55So5Z+fXHJcbiAgICBpc2Nvbm46ZmFsc2UsICAgLy/mmK/lkKbov57mjqXov4fmnI3liqHlmahcclxuICAgIHNvY2tldF9JbmluKHVybCxuYW1lLHVzZXJJbmZvKXtcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5zb2NrZXQ9PW51bGx8fHRoaXMuaXNjb25uPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5hbWUrJ19jb25uSW5nJyx1cmwpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QodXJsKTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW4gPSByZXF1aXJlKFwiLi4vLi4vLi4vU2NyaXB0L0xvYmJ5L0xvYmJ5TmV0V29ya1wiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RfZmFpbGVkJywobWVzKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/nuaOpeWksei0pVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0aW5nJywobWVzKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuato+WcqOi/nuaOpVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdlcnJvcicsKG1lcyk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLov57mjqXplJnor69cIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdGVkJywobXNnKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6L+e5LiK5LqGYGBgYGBgYGAnKTtcclxuICAgICAgICAgICAgaWYoIXNlbGYuaXNjb25uKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuT25FdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc2Nvbm49dHJ1ZTsgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICAgICAgc2VsZi5yZXFCZXQoJ0xvZ2luR2FtZScsSlNPTi5zdHJpbmdpZnkoe3VzZXJpZDp1c2VySW5mby5wbGF5ZXJJZCxnYW1ldHlwZTpudWxsLHNpZ246dXNlckluZm8uZ2FtZVNpZ259KSk7XHJcbiAgICAgICAgICAgIC8vc2VsZi5yZXFCZXQoJ0xvZ2luUm9vbScse3Jvb21pZDoxfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgT25FdmVudCgpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvZ2luR2FtZVJlc3VsdCcsKGRhdGEpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dpbkdhbWVSZXN1bHQ6JyxkYXRhKTtcclxuICAgICAgICAgICAgc2VsZi5yZXFCZXQoJ0xvZ2luZnJlZUNvdW50JyxudWxsKTtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4ubG9iYnlNYWluLmVudGVyUm9vbT10cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zb2NrZXQuZGlzY29ubmVjdCgpOyAgICAgICAgICAgICAgLy/mlq3lvIDlpKfljoXplb/ov57mjqVcclxuICAgICAgICAgICAgc2VsZi5yZXFCZXQoJ0xvZ2luUm9vbScsSlNPTi5zdHJpbmdpZnkoe3Jvb21pZDoxfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb3R0ZXJ5UmVzdWx0JywoZGF0YSk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JyxkYXRhKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5SZXN1bHRDb2RlPT0tMil7cmV0dXJuOyB9ICAgICAgICAgICAgICAgLy/ph5HluIHkuI3lpJ/nm7jlhbPlpITnkIZcclxuICAgICAgICAgICAgbGV0IGRhdGExPWRhdGEuUmVzdWx0RGF0YTtcclxuICAgICAgICAgICAgZGF0YTEudXNlcnNjb3JlPShkYXRhMS51c2Vyc2NvcmUqMC4wMSkudG9GaXhlZCgyKTsgICAgICAgICAgLy/lvLrooYzlsI/mlbBcclxuICAgICAgICAgICAgZGF0YS5kaWN0QW5hbHlzZVJlc3VsdC53aW49ZGF0YS5kaWN0QW5hbHlzZVJlc3VsdC53aW4qMC4wMTsgLy/lvLrooYzlsI/mlbBcclxuICAgICAgICAgICAgc2VsZi5Ob3djYW52YXMub25CZXQobnVsbCxkYXRhLmRpY3RBbmFseXNlUmVzdWx0LGRhdGExKTtcclxuICAgICAgICAgICAgc2VsZi5Ob3djYW52YXMub25HZXRBY2NvdW50SW5mbyhkYXRhLlJlc3VsdENvZGUsZGF0YTEudXNlcnNjb3JlLGRhdGEuZGljdEFuYWx5c2VSZXN1bHQuZ2V0RnJlZVRpbWUubkZyZWVUaW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5Sb29tUmVzdWx0JywgKGRhdGEpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpblJvb21SZXN1bHQnLGRhdGEpO1xyXG4gICAgICAgICAgICAvL3NlbGYuY2FudmFzLm9uRnJlZVRpbWUoZGF0YS5SZXN1bHREYXRhLmZyZWVDb3VudCk7ICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWIt+aWsOWFjei0ueasoeaVsOeahOaWueazlSBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5mcmVlQ291bnRSZXN1bHQnLChkYXRhKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5mcmVlQ291bnRSZXN1bHQ6JyxkYXRhKTtcclxuICAgICAgICAgICAgc2VsZi5Ob3djYW52YXMub25GcmVlVGltZShkYXRhLmZyZWVDb3VudCk7ICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICByZXFCZXQoZXZlbnQsZGF0YSl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncmVxQmV0JyxkYXRhKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KGV2ZW50LGRhdGEpOyAgICBcclxuICAgIH0sXHJcbiAgICBleGl0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aJp+ihjOaWreW8gOa4uOaIj+i/nuaOpeaWueazlScpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB0aGlzLnNvY2tldD1udWxsO1xyXG4gICAgICAgIHRoaXMuaXNjb25uPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzPW51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2FtZV9zb2NrZXQ7XHJcbiJdfQ==