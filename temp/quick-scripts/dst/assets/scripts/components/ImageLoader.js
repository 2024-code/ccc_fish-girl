
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/components/ImageLoader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed057Bgp8FHlJbGI+ljAN7d', 'ImageLoader');
// scripts/components/ImageLoader.js

"use strict";

function loadImage(url, code, callback) {
  cc.loader.load(url, function (err, tex) {
    var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
    callback(code, spriteFrame);
  });
}

;

function getBaseInfo(userid, callback) {
  if (cc.vv.baseInfoMap == null) {
    cc.vv.baseInfoMap = {};
  }

  if (cc.vv.baseInfoMap[userid] != null) {
    callback(userid, cc.vv.baseInfoMap[userid]);
  } else {
    cc.vv.http.sendRequest('/base_info', {
      userid: userid
    }, function (ret) {
      var url = null;

      if (ret.headimgurl) {
        url = ret.headimgurl;
      }

      var info = {
        name: ret.name,
        sex: ret.sex,
        url: url
      };
      cc.vv.baseInfoMap[userid] = info;
      callback(userid, info);
    }, cc.vv.http.master_url);
  }
}

;
cc.Class({
  "extends": cc.Component,
  properties: {},
  // use this for initialization
  onLoad: function onLoad() {
    this.setupSpriteFrame();
  },
  setUserID: function setUserID(userid, ttype) {
    if (!userid) {
      return;
    }

    if (cc.vv.images == null) {
      cc.vv.images = {};
    }

    var self = this; // 如果指定类型为1表示显示二维码信息

    if (ttype == 1) {
      var yaoqing = 'btmj' + cc.vv.userMgr.yaoqing_key;
      var roomid = cc.vv.userMgr.shareRoomId || cc.vv.gameNetMgr.roomId || "000000";
      var url = 'http://mj.yajugame.com/manage1/?/member/user/qrcode_app/';

      if (!yaoqing) {
        return;
      }

      url = url + yaoqing + '/' + roomid + '.png';
      loadImage(url, userid, function (err, spriteFrame) {
        self._spriteFrame = spriteFrame;
        self.setupSpriteFrame();
      });
    } else {
      getBaseInfo(userid, function (code, info) {
        if (info && info.url) {
          loadImage(info.url, userid, function (err, spriteFrame) {
            self._spriteFrame = spriteFrame;
            self.setupSpriteFrame();
          });
        }
      });
    }
  },
  setupSpriteFrame: function setupSpriteFrame() {
    if (this._spriteFrame) {
      var spr = this.getComponent(cc.Sprite);

      if (spr) {
        spr.spriteFrame = this._spriteFrame;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tcG9uZW50c1xcSW1hZ2VMb2FkZXIuanMiXSwibmFtZXMiOlsibG9hZEltYWdlIiwidXJsIiwiY29kZSIsImNhbGxiYWNrIiwiY2MiLCJsb2FkZXIiLCJsb2FkIiwiZXJyIiwidGV4Iiwic3ByaXRlRnJhbWUiLCJTcHJpdGVGcmFtZSIsIlJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImdldEJhc2VJbmZvIiwidXNlcmlkIiwidnYiLCJiYXNlSW5mb01hcCIsImh0dHAiLCJzZW5kUmVxdWVzdCIsInJldCIsImhlYWRpbWd1cmwiLCJpbmZvIiwibmFtZSIsInNleCIsIm1hc3Rlcl91cmwiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJzZXR1cFNwcml0ZUZyYW1lIiwic2V0VXNlcklEIiwidHR5cGUiLCJpbWFnZXMiLCJzZWxmIiwieWFvcWluZyIsInVzZXJNZ3IiLCJ5YW9xaW5nX2tleSIsInJvb21pZCIsInNoYXJlUm9vbUlkIiwiZ2FtZU5ldE1nciIsInJvb21JZCIsIl9zcHJpdGVGcmFtZSIsInNwciIsImdldENvbXBvbmVudCIsIlNwcml0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxTQUFULENBQW1CQyxHQUFuQixFQUF3QkMsSUFBeEIsRUFBOEJDLFFBQTlCLEVBQXdDO0FBQ3BDQyxFQUFBQSxFQUFFLENBQUNDLE1BQUgsQ0FBVUMsSUFBVixDQUFlTCxHQUFmLEVBQW9CLFVBQVNNLEdBQVQsRUFBY0MsR0FBZCxFQUFtQjtBQUNuQyxRQUFJQyxXQUFXLEdBQUcsSUFBSUwsRUFBRSxDQUFDTSxXQUFQLENBQW1CRixHQUFuQixFQUF3QkosRUFBRSxDQUFDTyxJQUFILENBQVEsQ0FBUixFQUFXLENBQVgsRUFBY0gsR0FBRyxDQUFDSSxLQUFsQixFQUF5QkosR0FBRyxDQUFDSyxNQUE3QixDQUF4QixDQUFsQjtBQUNBVixJQUFBQSxRQUFRLENBQUNELElBQUQs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QXlCLFFBQUFBLElBQUksQ0FBQ0osZ0JBQUw7QUFDSCxPQUhRLENBQVQ7QUFJSCxLQVpELE1BWU87QUFDSGhCLE1BQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTLFVBQVNiLElBQVQsRUFBZW9CLElBQWYsRUFBcUI7QUFDckMsWUFBSUEsSUFBSSxJQUFJQSxJQUFJLENBQUNyQixHQUFqQixFQUFzQjtBQUNsQkQsVUFBQUEsU0FBUyxDQUFDc0IsSUFBSSxDQUFDckIsR0FBTixFQUFXYyxNQUFYLEVBQW1CLFVBQVNSLEdBQVQsRUFBY0UsV0FBZCxFQUEyQjtBQUNuRHlCLFlBQUFBLElBQUksQ0FBQ1EsWUFBTCxHQUFvQmpDLFdBQXBCO0FBQ0F5QixZQUFBQSxJQUFJLENBQUNKLGdCQUFMO0FBQ0gsV0FIUSxDQUFUO0FBSUg7QUFDSixPQVBVLENBQVg7QUFRSDtBQUNKLEdBdENJO0FBdUNMQSxFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBVztBQUN6QixRQUFJLEtBQUtZLFlBQVQsRUFBdUI7QUFDbkIsVUFBSUMsR0FBRyxHQUFHLEtBQUtDLFlBQUwsQ0FBa0J4QyxFQUFFLENBQUN5QyxNQUFyQixDQUFWOztBQUNBLFVBQUlGLEdBQUosRUFBUztBQUNMQSxRQUFBQSxHQUFHLENBQUNsQyxXQUFKLEdBQWtCLEtBQUtpQyxZQUF2QjtBQUNIO0FBQ0o7QUFDSjtBQTlDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBsb2FkSW1hZ2UodXJsLCBjb2RlLCBjYWxsYmFjaykge1xyXG4gICAgY2MubG9hZGVyLmxvYWQodXJsLCBmdW5jdGlvbihlcnIsIHRleCkge1xyXG4gICAgICAgIHZhciBzcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgsIGNjLlJlY3QoMCwgMCwgdGV4LndpZHRoLCB0ZXguaGVpZ2h0KSk7XHJcbiAgICAgICAgY2FsbGJhY2soY29kZSwgc3ByaXRlRnJhbWUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRCYXNlSW5mbyh1c2VyaWQsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoY2MudnYuYmFzZUluZm9NYXAgPT0gbnVsbCkge1xyXG4gICAgICAgIGNjLnZ2LmJhc2VJbmZvTWFwID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoY2MudnYuYmFzZUluZm9NYXBbdXNlcmlkXSAhPSBudWxsKSB7XHJcbiAgICAgICAgY2FsbGJhY2sodXNlcmlkLCBjYy52di5iYXNlSW5mb01hcFt1c2VyaWRdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2MudnYuaHR0cC5zZW5kUmVxdWVzdCgnL2Jhc2VfaW5mbycsIHtcclxuICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWRcclxuICAgICAgICB9LCBmdW5jdGlvbihyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHVybCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChyZXQuaGVhZGltZ3VybCkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gcmV0LmhlYWRpbWd1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiByZXQubmFtZSxcclxuICAgICAgICAgICAgICAgIHNleDogcmV0LnNleCxcclxuICAgICAgICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2MudnYuYmFzZUluZm9NYXBbdXNlcmlkXSA9IGluZm87XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHVzZXJpZCwgaW5mbyk7XHJcbiAgICAgICAgfSwgY2MudnYuaHR0cC5tYXN0ZXJfdXJsKTtcclxuICAgIH1cclxufTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge30sXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXR1cFNwcml0ZUZyYW1lKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0VXNlcklEOiBmdW5jdGlvbih1c2VyaWQsIHR0eXBlKSB7XHJcbiAgICAgICAgaWYgKCF1c2VyaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2MudnYuaW1hZ2VzID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MudnYuaW1hZ2VzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDlpoLmnpzmjIflrprnsbvlnovkuLox6KGo56S65pi+56S65LqM57u056CB5L+h5oGvXHJcbiAgICAgICAgaWYgKHR0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIHlhb3FpbmcgPSAnYnRtaicgKyBjYy52di51c2VyTWdyLnlhb3Fpbmdfa2V5O1xyXG4gICAgICAgICAgICB2YXIgcm9vbWlkID0gY2MudnYudXNlck1nci5zaGFyZVJvb21JZCB8fCBjYy52di5nYW1lTmV0TWdyLnJvb21JZCB8fCBcIjAwMDAwMFwiO1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9tai55YWp1Z2FtZS5jb20vbWFuYWdlMS8/L21lbWJlci91c2VyL3FyY29kZV9hcHAvJztcclxuICAgICAgICAgICAgaWYgKCF5YW9xaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyB5YW9xaW5nICsgJy8nICsgcm9vbWlkICsgJy5wbmcnO1xyXG4gICAgICAgICAgICBsb2FkSW1hZ2UodXJsLCB1c2VyaWQsIGZ1bmN0aW9uKGVyciwgc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3Nwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldHVwU3ByaXRlRnJhbWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0QmFzZUluZm8odXNlcmlkLCBmdW5jdGlvbihjb2RlLCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRJbWFnZShpbmZvLnVybCwgdXNlcmlkLCBmdW5jdGlvbihlcnIsIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3Nwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0dXBTcHJpdGVGcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0dXBTcHJpdGVGcmFtZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBzcHIgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBpZiAoc3ByKSB7XHJcbiAgICAgICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSB0aGlzLl9zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7Il19