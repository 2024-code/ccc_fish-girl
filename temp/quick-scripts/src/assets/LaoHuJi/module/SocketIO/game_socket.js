"use strict";
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