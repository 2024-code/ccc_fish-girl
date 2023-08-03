
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/LobbyRank.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5e69J3IPVEu7Wr8v+YUpzY', 'LobbyRank');
// Script/Lobby/LobbyRank.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    rankScroll: cc.ScrollView,
    rankPrefab: cc.Prefab
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.netWork = require("LobbyNetWork");
  },
  start: function start() {},
  updateCoinPanel: function updateCoinPanel(data) {
    this.data = data;
    console.log(data);
    this.rankScroll.content.removeAllChildren();

    for (var i = 0; i < data.length; i++) {
      var newNode = cc.instantiate(this.rankPrefab);
      this.rankScroll.content.addChild(newNode);
      newNode.getComponent("paihangbg").setView(data[i], i, 1);
    }
  },
  updateDiamondPanel: function updateDiamondPanel(data) {
    this.data = data;
    this.rankScroll.content.removeAllChildren();

    for (var i = 0; i < data.length; i++) {
      var newNode = cc.instantiate(this.rankPrefab);
      this.rankScroll.content.addChild(newNode);
      newNode.getComponent("paihangbg").setView(data[i], i, 2);
    }
  },
  //查询金币排行
  selectCoinRank: function selectCoinRank() {
    this.netWork.socket.emit("getCoinRank");
  },
  //查询钻石排行
  selectDiamondRank: function selectDiamondRank() {
    this.netWork.socket.emit("getDiamondRank");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlSYW5rLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicmFua1Njcm9sbCIsIlNjcm9sbFZpZXciLCJyYW5rUHJlZmFiIiwiUHJlZmFiIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0V29yayIsInN0YXJ0IiwidXBkYXRlQ29pblBhbmVsIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjb250ZW50IiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJpIiwibGVuZ3RoIiwibmV3Tm9kZSIsImluc3RhbnRpYXRlIiwiYWRkQ2hpbGQiLCJnZXRDb21wb25lbnQiLCJzZXRWaWV3IiwidXBkYXRlRGlhbW9uZFBhbmVsIiwic2VsZWN0Q29pblJhbmsiLCJzb2NrZXQiLCJlbWl0Iiwic2VsZWN0RGlhbW9uZFJhbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssVUFEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ087QUFGUCxHQUhQO0FBUUxDLEVBQUFBLE1BUkssb0JBUUk7QUFDTCxTQUFLQyxVQUFMLEdBQWtCQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUF4QztBQUNBLFNBQUtDLE9BQUwsR0FBZUYsT0FBTyxDQUFDLGNBQUQsQ0FBdEI7QUFDSCxHQVhJO0FBYUxHLEVBQUFBLEtBYkssbUJBYUcsQ0FFUCxDQWZJO0FBaUJMQyxFQUFBQSxlQWpCSywyQkFpQldDLElBakJYLEVBaUJpQjtBQUNsQixTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLElBQVo7QUFDQSxTQUFLWCxVQUFMLENBQWdCYyxPQUFoQixDQUF3QkMsaUJBQXhCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0wsSUFBSSxDQUFDTSxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxVQUFJRSxPQUFPLEdBQUd0QixFQUFFLENBQUN1QixXQUFILENBQWUsS0FBS2pCLFVBQXBCLENBQWQ7QUFDQSxXQUFLRixVQUFMLENBQWdCYyxPQUFoQixDQUF3Qk0sUUFBeEIsQ0FBaUNGLE9BQWpDO0FBQ0FBLE1BQUFBLE9BQU8sQ0FBQ0csWUFBUixDQUFxQixXQUFyQixFQUFrQ0MsT0FBbEMsQ0FBMENYLElBQUksQ0FBQ0ssQ0FBRCxDQUE5QyxFQUFtREEsQ0FBbkQsRUFBc0QsQ0FBdEQ7QUFDSDtBQUNKLEdBMUJJO0FBMkJMTyxFQUFBQSxrQkEzQkssOEJBMkJjWixJQTNCZCxFQTJCb0I7QUFDckIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS1gsVUFBTCxDQUFnQmMsT0FBaEIsQ0FBd0JDLGlCQUF4Qjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdMLElBQUksQ0FBQ00sTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsVUFBSUUsT0FBTyxHQUFHdEIsRUFBRSxDQUFDdUIsV0FBSCxDQUFlLEtBQUtqQixVQUFwQixDQUFkO0FBQ0EsV0FBS0YsVUFBTCxDQUFnQmMsT0FBaEIsQ0FBd0JNLFFBQXhCLENBQWlDRixPQUFqQztBQUNBQSxNQUFBQSxPQUFPLENBQUNHLFlBQVIsQ0FBcUIsV0FBckIsRUFBa0NDLE9BQWxDLENBQTBDWCxJQUFJLENBQUNLLENBQUQsQ0FBOUMsRUFBbURBLENBQW5ELEVBQXNELENBQXREO0FBQ0g7QUFDSixHQW5DSTtBQW9DTDtBQUNBUSxFQUFBQSxjQXJDSyw0QkFxQ1k7QUFDYixTQUFLaEIsT0FBTCxDQUFhaUIsTUFBYixDQUFvQkMsSUFBcEIsQ0FBeUIsYUFBekI7QUFDSCxHQXZDSTtBQXdDTDtBQUNBQyxFQUFBQSxpQkF6Q0ssK0JBeUNlO0FBQ2hCLFNBQUtuQixPQUFMLENBQWFpQixNQUFiLENBQW9CQyxJQUFwQixDQUF5QixnQkFBekI7QUFDSDtBQTNDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHJhbmtTY3JvbGw6IGNjLlNjcm9sbFZpZXcsXHJcbiAgICAgICAgcmFua1ByZWZhYjogY2MuUHJlZmFiXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0V29yayA9IHJlcXVpcmUoXCJMb2JieU5ldFdvcmtcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlQ29pblBhbmVsKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHRoaXMucmFua1Njcm9sbC5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5yYW5rUHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5yYW5rU2Nyb2xsLmNvbnRlbnQuYWRkQ2hpbGQobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgIG5ld05vZGUuZ2V0Q29tcG9uZW50KFwicGFpaGFuZ2JnXCIpLnNldFZpZXcoZGF0YVtpXSwgaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZURpYW1vbmRQYW5lbChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLnJhbmtTY3JvbGwuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmFua1ByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMucmFua1Njcm9sbC5jb250ZW50LmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgICAgICBuZXdOb2RlLmdldENvbXBvbmVudChcInBhaWhhbmdiZ1wiKS5zZXRWaWV3KGRhdGFbaV0sIGksIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+afpeivoumHkeW4geaOkuihjFxyXG4gICAgc2VsZWN0Q29pblJhbmsoKSB7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLnNvY2tldC5lbWl0KFwiZ2V0Q29pblJhbmtcIik7XHJcbiAgICB9LFxyXG4gICAgLy/mn6Xor6Lpkrvnn7PmjpLooYxcclxuICAgIHNlbGVjdERpYW1vbmRSYW5rKCkge1xyXG4gICAgICAgIHRoaXMubmV0V29yay5zb2NrZXQuZW1pdChcImdldERpYW1vbmRSYW5rXCIpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==