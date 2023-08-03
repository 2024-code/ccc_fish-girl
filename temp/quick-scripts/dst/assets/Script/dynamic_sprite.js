
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/dynamic_sprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6db63xnhtDtYAsTPMPABwn', 'dynamic_sprite');
// Script/dynamic_sprite.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    folder: ""
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.folder != "") {
      var sp = this.getComponent(cc.Sprite).spriteFrame;

      if (sp.atlas) {} else {
        var realUrl = cc.url.raw('resources/' + this.folder + "/" + sp.name);
        var self = this;
        var url = this.folder + "/" + sp;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
          sp.spriteFrame = spriteFrame;
        });
      }
    }
  },
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxkeW5hbWljX3Nwcml0ZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImZvbGRlciIsIm9uTG9hZCIsInNwIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJhdGxhcyIsInJlYWxVcmwiLCJ1cmwiLCJyYXciLCJuYW1lIiwic2VsZiIsImxvYWRlciIsImxvYWRSZXMiLCJTcHJpdGVGcmFtZSIsImVyciIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFDO0FBREMsR0FIUDtBQU9MO0FBRUFDLEVBQUFBLE1BVEssb0JBU0s7QUFDTixRQUFJLEtBQUtELE1BQUwsSUFBZSxFQUFuQixFQUNBO0FBQ0ksVUFBSUUsRUFBRSxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JQLEVBQUUsQ0FBQ1EsTUFBckIsRUFBNkJDLFdBQXRDOztBQUNBLFVBQUlILEVBQUUsQ0FBQ0ksS0FBUCxFQUNBLENBRUMsQ0FIRCxNQUdLO0FBQ0QsWUFBSUMsT0FBTyxHQUFHWCxFQUFFLENBQUNZLEdBQUgsQ0FBT0MsR0FBUCxDQUFXLGVBQWEsS0FBS1QsTUFBbEIsR0FBeUIsR0FBekIsR0FBNkJFLEVBQUUsQ0FBQ1EsSUFBM0MsQ0FBZDtBQUVBLFlBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0EsWUFBSUgsR0FBRyxHQUFHLEtBQUtSLE1BQUwsR0FBWSxHQUFaLEdBQWdCRSxFQUExQjtBQUNBTixRQUFBQSxFQUFFLENBQUNnQixNQUFILENBQVVDLE9BQVYsQ0FBa0JMLEdBQWxCLEVBQXVCWixFQUFFLENBQUNrQixXQUExQixFQUF1QyxVQUFVQyxHQUFWLEVBQWVWLFdBQWYsRUFBNEI7QUFDbkVILFVBQUFBLEVBQUUsQ0FBQ0csV0FBSCxHQUFpQkEsV0FBakI7QUFDQyxTQUZEO0FBR0g7QUFDSjtBQUNKLEdBMUJJO0FBNEJMVyxFQUFBQSxLQTVCSyxtQkE0QkksQ0FFUixDQTlCSSxDQWdDTDs7QUFoQ0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBmb2xkZXI6XCJcIlxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmZvbGRlciAhPSBcIlwiKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3AgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgaWYgKHNwLmF0bGFzKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgcmVhbFVybCA9IGNjLnVybC5yYXcoJ3Jlc291cmNlcy8nK3RoaXMuZm9sZGVyK1wiL1wiK3NwLm5hbWUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSB0aGlzLmZvbGRlcitcIi9cIitzcDtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=