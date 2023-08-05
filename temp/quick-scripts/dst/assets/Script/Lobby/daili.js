
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/daili.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b16fkXEn9GJK+o0DLZA73J', 'daili');
// Script/Lobby/daili.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    edit_box: cc.EditBox
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.url_ = "http://game.bullsts.com/index.php/agent/api/uidcode"; //太子城版本
    //this.url_="http://jinboadmin.youmegame.cn/index.php/agent/api/uidcode"; //金博娱乐版本

    this.key_ = "fdgkl5rtlk4mfdv";
  },
  start: function start() {
    this.node.getChildByName('dl_ui').active = false;
    this.node.getChildByName('messagebox').active = false;
  },
  onClick: function onClick(event, customEventData) {
    if (customEventData == "close") {
      this.node.active = false;
    } else if (customEventData == "sure") {
      this.setDaili(this.edit_box.string);
    } else if (customEventData == 'message') {
      this.node.getChildByName('dl_ui').active = true;
      this.node.getChildByName('messagebox').active = false; //this.node.active = false;
    }
  },
  setDaili: function setDaili(txt) {
    if (txt == "") return;
    var time = Math.floor(Date.now() / 1000);
    var key = 'fdgkl5rtlk4mfdv';
    var sign = md5(time + key); // 假设md5函数已定义并可用

    var uid = 1000;
    var code = '025679';
    var url = this.hturl + "/index.php/agent/api/uidcode/time/" + time + "/sign/" + sign + "/uid/" + uid + "/code/" + code;

    var res = this._request(url);

    var pInfo = require('PlayerInfo').getInstant();

    var MD5 = require("md5").getInstant();

    var currentTime = Math.floor(Date.now() / 1000);
    var baseurl = this.url_;
    var apiUrl = "/time/" + currentTime + "/sign/" + MD5.hex_md5(currentTime + this.key_) + "/uid/" + pInfo.playerId + "/code/" + txt;
    var url = baseurl + apiUrl;
    console.log("pInfo:", pInfo, "url:", url);
    var instance = this;
    this.sendpost(url, function (response) {
      // if (response.status === 1) {
      //     //成功
      // }else{
      //     //失败
      // }
      instance.node.getChildByName('dl_ui').active = false;
      instance.node.getChildByName('messagebox').active = true;
      instance.node.getChildByName('messagebox').getChildByName('lb_Tips').getComponent(cc.Label).string = response.msg;
    }, "");
  },
  // update (dt) {},
  sendpost: function sendpost(url, callback, str) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = xhr.response; //console.log(response);

        if (null !== xhr.response !== null) {
          try {
            response = JSON.parse(response);
          } catch (errot) {//  cc.log("JSON wrong");
          }

          callback && callback(response);
        }
      }
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xhr.send(str);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcZGFpbGkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJlZGl0X2JveCIsIkVkaXRCb3giLCJvbkxvYWQiLCJ1cmxfIiwia2V5XyIsInN0YXJ0Iiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwib25DbGljayIsImV2ZW50IiwiY3VzdG9tRXZlbnREYXRhIiwic2V0RGFpbGkiLCJzdHJpbmciLCJ0eHQiLCJ0aW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsIm5vdyIsImtleSIsInNpZ24iLCJtZDUiLCJ1aWQiLCJjb2RlIiwidXJsIiwiaHR1cmwiLCJyZXMiLCJfcmVxdWVzdCIsInBJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJNRDUiLCJjdXJyZW50VGltZSIsImJhc2V1cmwiLCJhcGlVcmwiLCJoZXhfbWQ1IiwicGxheWVySWQiLCJjb25zb2xlIiwibG9nIiwiaW5zdGFuY2UiLCJzZW5kcG9zdCIsInJlc3BvbnNlIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJtc2ciLCJjYWxsYmFjayIsInN0ciIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsImVycm90Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFDSixFQUFFLENBQUNLO0FBREosR0FIUDtBQU9MO0FBRUFDLEVBQUFBLE1BVEssb0JBU0s7QUFDTixTQUFLQyxJQUFMLEdBQVUscURBQVYsQ0FETSxDQUMyRDtBQUNqRTs7QUFDQSxTQUFLQyxJQUFMLEdB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c291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBlZGl0X2JveDpjYy5FZGl0Qm94LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMudXJsXz1cImh0dHA6Ly9nYW1lLmJ1bGxzdHMuY29tL2luZGV4LnBocC9hZ2VudC9hcGkvdWlkY29kZVwiOyAvL+WkquWtkOWfjueJiOacrFxuICAgICAgICAvL3RoaXMudXJsXz1cImh0dHA6Ly9qaW5ib2FkbWluLnlvdW1lZ2FtZS5jbi9pbmRleC5waHAvYWdlbnQvYXBpL3VpZGNvZGVcIjsgLy/ph5HljZrlqLHkuZDniYjmnKxcbiAgICAgICAgdGhpcy5rZXlfPSBcImZkZ2tsNXJ0bGs0bWZkdlwiO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGxfdWknKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtZXNzYWdlYm94JykuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIG9uQ2xpY2soZXZlbnQsY3VzdG9tRXZlbnREYXRhKVxuICAgIHtcbiAgICAgICAgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImNsb3NlXCIpe1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZSBpZiAoY3VzdG9tRXZlbnREYXRhID09IFwic3VyZVwiKXtcbiAgICAgICAgICAgIHRoaXMuc2V0RGFpbGkodGhpcy5lZGl0X2JveC5zdHJpbmcpO1xuICAgICAgICB9ZWxzZSBpZiAoY3VzdG9tRXZlbnREYXRhID09ICdtZXNzYWdlJyl7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2RsX3VpJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWVzc2FnZWJveCcpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy90aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0RGFpbGkodHh0KSB7XG4gICAgICAgIGlmICh0eHQgPT0gXCJcIikgcmV0dXJuO1xuICAgIFxuICAgICAgICB2YXIgdGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICB2YXIga2V5ID0gJ2ZkZ2tsNXJ0bGs0bWZkdic7XG4gICAgICAgIHZhciBzaWduID0gbWQ1KHRpbWUgKyBrZXkpOyAvLyDlgYforr5tZDXlh73mlbDlt7LlrprkuYnlubblj6/nlKhcbiAgICAgICAgdmFyIHVpZCA9IDEwMDA7XG4gICAgICAgIHZhciBjb2RlID0gJzAyNTY3OSc7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmh0dXJsICsgXCIvaW5kZXgucGhwL2FnZW50L2FwaS91aWRjb2RlL3RpbWUvXCIgKyB0aW1lICsgXCIvc2lnbi9cIiArIHNpZ24gKyBcIi91aWQvXCIgKyB1aWQgKyBcIi9jb2RlL1wiICsgY29kZTtcbiAgICAgICAgdmFyIHJlcyA9IHRoaXMuX3JlcXVlc3QodXJsKTtcbiAgICBcbiAgICAgICAgdmFyIHBJbmZvID0gcmVxdWlyZSgnUGxheWVySW5mbycpLmdldEluc3RhbnQoKTtcbiAgICAgICAgdmFyIE1ENSA9IHJlcXVpcmUoXCJtZDVcIikuZ2V0SW5zdGFudCgpO1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICBcbiAgICAgICAgdmFyIGJhc2V1cmwgPSB0aGlzLnVybF87XG4gICAgICAgIHZhciBhcGlVcmwgPSBcIi90aW1lL1wiICsgY3VycmVudFRpbWUgKyBcIi9zaWduL1wiICsgTUQ1LmhleF9tZDUoY3VycmVudFRpbWUgKyB0aGlzLmtleV8pICsgXCIvdWlkL1wiICsgcEluZm8ucGxheWVySWQgKyBcIi9jb2RlL1wiICsgdHh0O1xuICAgICAgICB2YXIgdXJsID0gYmFzZXVybCArIGFwaVVybDtcbiAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJwSW5mbzpcIiwgcEluZm8sIFwidXJsOlwiLCB1cmwpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5zZW5kcG9zdCh1cmwsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgLy8gICAgIC8v5oiQ5YqfXG4gICAgICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgICAgIC8vICAgICAvL+Wksei0pVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGxfdWknKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGluc3RhbmNlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21lc3NhZ2Vib3gnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWVzc2FnZWJveCcpLmdldENoaWxkQnlOYW1lKCdsYl9UaXBzJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXNwb25zZS5tc2c7XG4gICAgICAgIH0sIFwiXCIpO1xuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG5cbiAgICBzZW5kcG9zdDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2ssIHN0cikge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IHhoci5yZXNwb25zZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICBjYy5sb2coXCJKU09OIHdyb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtcIik7XG4gICAgICAgIHhoci5zZW5kKHN0cik7XG4gICAgfSxcbn0pO1xuIl19