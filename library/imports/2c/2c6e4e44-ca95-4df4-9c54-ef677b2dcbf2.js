"use strict";
cc._RF.push(module, '2c6e45EypVN9JxU72d7Lcvy', 'blackJackNetwork');
// Script/21dian/blackJackNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('blackJackMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('blackJackAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':13901';
    this.socket = io.connect(this.url);
    this.addEvent();
  },
  addEvent: function addEvent() {
    var _this = this;

    this.socket.on('connected', function () {
      _this.socket.emit('LoginGame', JSON.stringify({
        userid: _this.playerInfo.playerId,
        gametype: null,
        sign: _this.playerInfo.gameSign
      }));
    });
    this.socket.on('loginGameResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginGameResult:', data);

      _this.socket.emit('LoginRoom');

      _this.mainObj.myCoin = data.Obj.score;
      _this.mainObj.userCoin.string = (data.Obj.score / 100).toFixed(2);
      _this.mainObj.userName.string = data.Obj.nickname;
      Helper.loadHead(data.Obj.headimgurl, function (texture) {
        _this.mainObj.userHead.spriteFrame = texture;
      });
      window.BLACKJACK_LOBBYNET.disconnect();
    });
    this.socket.on('LoginRoomResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginRoomResult', data);
    });
    this.socket.on('lotteryResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('lotteryResult:', data);

      if (!!data.ResultCode && data.ResultCode == 1) {
        var _this$mainObj;

        _this.mainObj.betCallBack();

        (_this$mainObj = _this.mainObj).firstDeal.apply(_this$mainObj, [data.zhuang_card[0], ''].concat(data.hand_card));
      }

      if (!data.is_over) {
        _this.scheduleOnce(function () {
          _this.mainObj.playerStatus(data.q_safe ? 1 : 2);
        }, 1.2);
      } else {
        _this.mainObj.overAction(data.zhuang_card, data.win_res, data.user_score);
      }
    });
    this.socket.on('sendCardResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('sendCardResult', data);

      if (_this.mainObj.playerCardNode.children.length != data.hand_card.length) {
        _this.mainObj.deal('', data.hand_card[data.hand_card.length - 1]);
      }

      if (data.is_fanbei) {
        _this.mainObj.rollCoin();

        _this.mainObj.myCoin = _this.mainObj.myCoin - _this.mainObj.bet;
        _this.mainObj.userCoin.string = (_this.mainObj.myCoin / 100).toFixed(2);
        _this.mainObj.myChipsLbl.string = (_this.mainObj.bet * 2 / 100).toFixed(2);
      }

      if (!data.is_over) {
        _this.scheduleOnce(function () {
          _this.mainObj.playerStatus(3);
        }, 0.3);
      } else {
        _this.mainObj.overAction(data.zhuang_card, data.win_res, data.user_score);
      }
    });
    this.socket.on('buySafeResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('buySafeResult', data);

      _this.mainObj.playerStatus(2);

      _this.mainObj.rollCoin(true);

      _this.mainObj.myCoin = _this.mainObj.myCoin - _this.mainObj.bet / 2;
      _this.mainObj.userCoin.string = (_this.mainObj.myCoin / 100).toFixed(2);
      _this.mainObj.myChipsLbl.string = (_this.mainObj.bet * 1.5 / 100).toFixed(2);
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