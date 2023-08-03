
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/BCNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7c34COTWtLQ4bimfyOVqdq', 'BCNetWork');
// Script/Lobby/BCNetWork.js

"use strict";

/**
 * 消息SOCKET通讯
 */
var BCNetWork = {
  playerInfo: null,
  socket: null,
  io: null,
  connected: false,

  /**
   * 初始化
   */
  netWorkInit_Function: function netWorkInit_Function() {
    this.io = null;
    this.socket = null;
    this.connected = false;
    this.playerInfo = require("PlayerInfo").getInstant;
    this.url = Lhjconfig.Server_IP + ':13000';

    if (cc.sys.isNative) {
      this.socket = SocketIO.connect(this.url);
    } else {
      this.io = require("socket-io");
      this.socket = this.io(this.url);
    }

    this.loginSocketOn_Function();
  },
  loginSocketOn_Function: function loginSocketOn_Function() {
    var self = this;
    /**
     * 连接错误
     */

    self.socket.on("connect_error", function (ret) {
      if (self.socket !== null) {
        for (var key in self.socket.$events) {
          if (key !== 0) {
            self.socket.removeListen(key);
          }
        }
      }
    });
    /**
     * 连接超时
     */

    self.socket.on("connect_timeout", function (ret) {
      if (self.socket !== null) {
        for (var key in self.socket.$events) {
          if (key !== 0) {
            self.socket.removeListen(key);
          }
        }
      }
    });
    /**
     * 网络错误
     */

    self.socket.on("error", function (ret) {
      if (self.socket !== null) {
        for (var key in self.socket.$events) {
          if (key !== 0) {
            self.socket.removeListen(key);
          }
        }
      }
    });
    /**
     * 重新连接
     */

    self.socket.on("reconnect", function (ret) {
      if (self.socket !== null) {
        for (var key in self.socket.$events) {
          if (key !== 0) {
            self.socket.removeListen(key);
          }
        }
      }
    });
    /**
     * 连接socke.
     * 用户登录
     */

    self.socket.on("connected", function (ret) {
      //cc.log(ret);
      if (ret) {
        self.connected = true;
      }
    });
    self.anotherFunctionInit_Function();
  },

  /**
   * 
   */
  anotherFunctionInit_Function: function anotherFunctionInit_Function() {
    var self = this;
    /**
     * 走马灯信息
     */

    self.socket.on("bigPriceMessage", function (ret) {
      console.log('noticeMsg:' + JSON.stringify(ret));

      if (ret.code) {
        cc.loader.loadRes("bc_Message", function (err, prefab) {
          cc.loader.setAutoReleaseRecursively(prefab, true);
          var newNode = cc.instantiate(prefab);
          newNode.getComponent("BC_message").setView(ret.data);
          cc.find("Canvas").addChild(newNode);
        }.bind(this));
      }
    });
    /**
     * 断开连接
     */

    self.socket.on("disconnect", function () {
      self.connected = false;
    });
  },

  /**
   * 断开socket
   */
  logoutAccount_Function: function logoutAccount_Function() {
    console.log('logoutAccount_Function');
    this.socket.disconnect();
    this.socket = null;
  },

  /**
   * 解析JSON数据
   * @param {*} ret 
   */
  changeResultJSON: function changeResultJSON(ret) {
    if (cc.sys.isNative) {
      return JSON.parse(ret);
    }

    return ret;
  }
};
module.exports = BCNetWork;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcQkNOZXRXb3JrLmpzIl0sIm5hbWVzIjpbIkJDTmV0V29yayIsInBsYXllckluZm8iLCJzb2NrZXQiLCJpbyIsImNvbm5lY3RlZCIsIm5ldFdvcmtJbml0X0Z1bmN0aW9uIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJ1cmwiLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJjYyIsInN5cyIsImlzTmF0aXZlIiwiU29ja2V0SU8iLCJjb25uZWN0IiwibG9naW5Tb2NrZXRPbl9GdW5jdGlvbiIsInNlbGYiLCJvbiIsInJldCIsImtleSIsIiRldmVudHMiLCJyZW1vdmVMaXN0ZW4iLCJhbm90aGVyRnVuY3Rpb25Jbml0X0Z1bmN0aW9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb2RlIiwibG9hZGVyIiwibG9hZFJlcyIsImVyciIsInByZWZhYiIsInNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHkiLCJuZXdOb2RlIiwiaW5zdGFudGlhdGUiLCJnZXRDb21wb25lbnQiLCJzZXRWaWV3IiwiZGF0YSIsImZpbmQiLCJhZGRDaGlsZCIsImJpbmQiLCJsb2dvdXRBY2NvdW50X0Z1bmN0aW9uIiwiZGlzY29ubmVjdCIsImNoYW5nZVJlc3VsdEpTT04iLCJwYXJzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsU0FBUyxHQUFHO0FBQ1pDLEVBQUFBLFVBQVUsRUFBRSxJQURBO0FBRVpDLEVBQUFBLE1BQU0sRUFBRSxJQUZJO0FBR1pDLEVBQUFBLEVBQUUsRUFBRSxJQUhRO0FBSVpDLEVBQUFBLFNBQVMsRUFBRSxLQUpDOztBQUtaO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxvQkFBb0IsRUFBRSxnQ0FBWTtBQUM5QixTQUFLRixFQUFMLEdBQVUsSUFBVjtBQUNBLFNBQUtELE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS0Us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LEdBbkhXOztBQXFIWjtBQUNKO0FBQ0E7QUFDSXNDLEVBQUFBLHNCQUFzQixFQUFFLGtDQUFZO0FBQ2hDbEIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVo7QUFDQSxTQUFLdkIsTUFBTCxDQUFZeUMsVUFBWjtBQUNBLFNBQUt6QyxNQUFMLEdBQWMsSUFBZDtBQUNILEdBNUhXOztBQThIWjtBQUNKO0FBQ0E7QUFDQTtBQUNJMEMsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVV6QixHQUFWLEVBQWU7QUFDN0IsUUFBSVIsRUFBRSxDQUFDQyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsYUFBT2EsSUFBSSxDQUFDbUIsS0FBTCxDQUFXMUIsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsV0FBT0EsR0FBUDtBQUNIO0FBdklXLENBQWhCO0FBMElBMkIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0MsU0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDmtojmga9TT0NLRVTpgJrorq9cclxuICovXHJcbnZhciBCQ05ldFdvcmsgPSB7XHJcbiAgICBwbGF5ZXJJbmZvOiBudWxsLFxyXG4gICAgc29ja2V0OiBudWxsLFxyXG4gICAgaW86IG51bGwsXHJcbiAgICBjb25uZWN0ZWQ6IGZhbHNlLFxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgbmV0V29ya0luaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmlvID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMudXJsID0gTGhqY29uZmlnLlNlcnZlcl9JUCArICc6MTMwMDAnO1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBTb2NrZXRJTy5jb25uZWN0KHRoaXMudXJsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlvID0gcmVxdWlyZShcInNvY2tldC1pb1wiKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmlvKHRoaXMudXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dpblNvY2tldE9uX0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvZ2luU29ja2V0T25fRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+e5o6l6ZSZ6K+vXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJjb25uZWN0X2Vycm9yXCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc29ja2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5zb2NrZXQuJGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb2NrZXQucmVtb3ZlTGlzdGVuKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+e5o6l6LaF5pe2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJjb25uZWN0X3RpbWVvdXRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zb2NrZXQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLnNvY2tldC4kZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNvY2tldC5yZW1vdmVMaXN0ZW4oa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnvZHnu5zplJnor69cclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImVycm9yXCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc29ja2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5zb2NrZXQuJGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb2NrZXQucmVtb3ZlTGlzdGVuKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6YeN5paw6L+e5o6lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJyZWNvbm5lY3RcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zb2NrZXQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLnNvY2tldC4kZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNvY2tldC5yZW1vdmVMaXN0ZW4oa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov57mjqVzb2NrZS5cclxuICAgICAgICAgKiDnlKjmiLfnmbvlvZVcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImNvbm5lY3RlZFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIC8vY2MubG9nKHJldCk7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxmLmFub3RoZXJGdW5jdGlvbkluaXRfRnVuY3Rpb24oKTtcclxuXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgYW5vdGhlckZ1bmN0aW9uSW5pdF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6LWw6ams54Gv5L+h5oGvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJiaWdQcmljZU1lc3NhZ2VcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm90aWNlTXNnOicgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgaWYocmV0LmNvZGUpe1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJiY19NZXNzYWdlXCIsIGZ1bmN0aW9uIChlcnIsIHByZWZhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KHByZWZhYiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld05vZGUuZ2V0Q29tcG9uZW50KFwiQkNfbWVzc2FnZVwiKS5zZXRWaWV3KHJldC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmlq3lvIDov57mjqVcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlq3lvIBzb2NrZXRcclxuICAgICAqL1xyXG4gICAgbG9nb3V0QWNjb3VudF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXRBY2NvdW50X0Z1bmN0aW9uJyk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpBKU09O5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0geyp9IHJldCBcclxuICAgICAqL1xyXG4gICAgY2hhbmdlUmVzdWx0SlNPTjogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQkNOZXRXb3JrOyJdfQ==