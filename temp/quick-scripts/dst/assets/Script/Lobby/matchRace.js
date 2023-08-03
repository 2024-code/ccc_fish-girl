
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/matchRace.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a8d0eR//odFw7mwZdSIpZmO', 'matchRace');
// Script/Lobby/matchRace.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    list: cc.Node,
    pb: cc.Prefab
  },
  init: function init(dataList) {
    console.log(dataList);
    this.pbList = [];
    this.dataList = dataList;
    this.list.removeAllChildren();
    this.index = 0;

    for (var i = 0; i <= 4; i++) {
      !!this.dataList[i] && this.initPb(this.dataList[i]);
    }

    this.unschedule(this.runAct);

    if (this.dataList.length > 5) {
      this.schedule(this.runAct, 2);
    }
  },
  runAct: function runAct() {
    var pb = this.pbList.shift();
    pb.removeFromParent();
    this.index = this.index >= this.dataList.length ? 0 : this.index;
    this.initPb(this.dataList[this.index]);
  },
  initPb: function initPb(data) {
    var p = cc.instantiate(this.pb);
    var head = p.getChildByName('face').getComponent(cc.Sprite);
    Helper.loadHead(data.head_url, function (texture) {
      head.spriteFrame = texture;
    });
    p.getChildByName('name').getComponent(cc.Label).string = data.nick_name;
    p.getChildByName('New Label').getComponent(cc.Label).string = data.win_all + "\u80DC  " + (data.play - data.win_all) + "\u8D1F";
    this.list.addChild(p);
    this.pbList.push(p);
    this.index++;
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcbWF0Y2hSYWNlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibGlzdCIsIk5vZGUiLCJwYiIsIlByZWZhYiIsImluaXQiLCJkYXRhTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJwYkxpc3QiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImluZGV4IiwiaSIsImluaXRQYiIsInVuc2NoZWR1bGUiLCJydW5BY3QiLCJsZW5ndGgiLCJzY2hlZHVsZSIsInNoaWZ0IiwicmVtb3ZlRnJvbVBhcmVudCIsImRhdGEiLCJwIiwiaW5zdGFudGlhdGUiLCJoZWFkIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJIZWxwZXIiLCJsb2FkSGVhZCIsImhlYWRfdXJsIiwidGV4dHVyZSIsInNwcml0ZUZyYW1lIiwiTGFiZWwiLCJzdHJpbmciLCJuaWNrX25hbWUiLCJ3aW5fYWxsIiwicGxheSIsImFkZENoaWxkIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRUosRUFBRSxDQUFDSyxJQUREO0FBRVJDLElBQUFBLEVBQUUsRUFBRU4sRUFBRSxDQUFDTztBQUZDLEdBSFA7QUFRTEMsRUFBQUEsSUFSSyxnQkFRQUMsUUFSQSxFQVFVO0FBQ1hDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixRQUFaO0FBQ0EsU0FBS0csTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLSCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtMLElBQUwsQ0FBVVMsaUJBQVY7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksQ0FBckIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFDekIsT0FBQyxDQUFDLEtBQUtOLFFBQUwsQ0FBY00sQ0FBZCxDQUFGLElBQXNCLEtBQUtDLE1BQUwsQ0FBWSxLQUFLUCxRQUFMLENBQWNNLENBQWQsQ0FBWixDQUF0QjtBQUNIOztBQUNELFNBQUtFLFVBQUwsQ0FBZ0IsS0FBS0MsTUFBckI7O0FBQ0EsUUFBSSxLQUFLVCxRQUFMLENBQWNVLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjLEtBQUtGLE1BQW5CLEVBQTJCLENBQTNCO0FBQ0g7QUFDSixHQXJCSTtBQXVCTEEsRUFBQUEsTUF2Qkssb0JBdUJJO0FBQ0wsUUFBSVosRUFBRSxHQUFHLEtBQUtNLE1BQUwsQ0FBWVMsS0FBWixFQUFUO0FBQ0FmLElBQUFBLEVBQUUsQ0FBQ2dCLGdCQUFIO0FBQ0EsU0FBS1IsS0FBTCxHQUFhLEtBQUtBLEtBQUwsSUFBYyxLQUFLTCxRQUFMLENBQWNVLE1BQTVCLEdBQXFDLENBQXJDLEdBQXlDLEtBQUtMLEtBQTNEO0FBQ0EsU0FBS0UsTUFBTCxDQUFZLEtBQUtQLFFBQUwsQ0FBYyxLQUFLSyxLQUFuQixDQUFaO0FBQ0gsR0E1Qkk7QUErQkxFLEVBQUFBLE1BL0JLLGtCQStCRU8sSUEvQkYsRUErQlE7QUFDVCxRQUFJQyxDQUFDLEdBQUd4QixFQUFFLENBQUN5QixXQUFILENBQWUsS0FBS25CLEVBQXBCLENBQVI7QUFDQSxRQUFJb0IsSUFBSSxHQUFHRixDQUFDLENBQUNHLGNBQUYsQ0FBaUIsTUFBakIsRUFBeUJDLFlBQXpCLENBQXNDNUIsRUFBRSxDQUFDNkIsTUFBekMsQ0FBWDtBQUNBQyxJQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JSLElBQUksQ0FBQ1MsUUFBckIsRUFBK0IsVUFBQUMsT0FBTyxFQUFJO0FBQ3RDUCxNQUFBQSxJQUFJLENBQUNRLFdBQUwsR0FBbUJELE9BQW5CO0FBQ0gsS0FGRDtBQUdBVCxJQUFBQSxDQUFDLENBQUNHLGNBQUYsQ0FBaUIsTUFBakIsRUFBeUJDLFlBQXpCLENBQXNDNUIsRUFBRSxDQUFDbUMsS0FBekMsRUFBZ0RDLE1BQWhELEdBQXlEYixJQUFJLENBQUNjLFNBQTlEO0FBQ0FiLElBQUFBLENBQUMsQ0FBQ0csY0FBRixDQUFpQixXQUFqQixFQUE4QkMsWUFBOUIsQ0FBMkM1QixFQUFFLENBQUNtQyxLQUE5QyxFQUFxREMsTUFBckQsR0FBaUViLElBQUksQ0FBQ2UsT0FBdEUsaUJBQW1GZixJQUFJLENBQUNnQixJQUFMLEdBQVVoQixJQUFJLENBQUNlLE9BQWxHO0FBQ0EsU0FBS2xDLElBQUwsQ0FBVW9DLFFBQVYsQ0FBbUJoQixDQUFuQjtBQUNBLFNBQUtaLE1BQUwsQ0FBWTZCLElBQVosQ0FBaUJqQixDQUFqQjtBQUNBLFNBQUtWLEtBQUw7QUFDSCxHQTFDSSxDQTRDTDs7QUE1Q0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsaXN0OiBjYy5Ob2RlLFxyXG4gICAgICAgIHBiOiBjYy5QcmVmYWIsXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoZGF0YUxpc3QpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhTGlzdCk7XHJcbiAgICAgICAgdGhpcy5wYkxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmRhdGFMaXN0ID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgdGhpcy5saXN0LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gNDsgaSsrKSB7XHJcbiAgICAgICAgICAgICEhdGhpcy5kYXRhTGlzdFtpXSAmJiB0aGlzLmluaXRQYih0aGlzLmRhdGFMaXN0W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucnVuQWN0KTtcclxuICAgICAgICBpZiAodGhpcy5kYXRhTGlzdC5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ydW5BY3QsIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcnVuQWN0KCkge1xyXG4gICAgICAgIGxldCBwYiA9IHRoaXMucGJMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgcGIucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4ID49IHRoaXMuZGF0YUxpc3QubGVuZ3RoID8gMCA6IHRoaXMuaW5kZXg7XHJcbiAgICAgICAgdGhpcy5pbml0UGIodGhpcy5kYXRhTGlzdFt0aGlzLmluZGV4XSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbml0UGIoZGF0YSkge1xyXG4gICAgICAgIGxldCBwID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYik7XHJcbiAgICAgICAgbGV0IGhlYWQgPSBwLmdldENoaWxkQnlOYW1lKCdmYWNlJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKGRhdGEuaGVhZF91cmwsIHRleHR1cmUgPT4ge1xyXG4gICAgICAgICAgICBoZWFkLnNwcml0ZUZyYW1lID0gdGV4dHVyZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwLmdldENoaWxkQnlOYW1lKCduYW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLm5pY2tfbmFtZTtcclxuICAgICAgICBwLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2RhdGEud2luX2FsbH3og5wgICR7ZGF0YS5wbGF5LWRhdGEud2luX2FsbH3otJ9gO1xyXG4gICAgICAgIHRoaXMubGlzdC5hZGRDaGlsZChwKTtcclxuICAgICAgICB0aGlzLnBiTGlzdC5wdXNoKHApO1xyXG4gICAgICAgIHRoaXMuaW5kZXgrKztcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pOyJdfQ==