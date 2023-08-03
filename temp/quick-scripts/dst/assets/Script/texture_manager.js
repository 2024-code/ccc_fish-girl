
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/texture_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1332adgc5IlLxdElXp+GOP', 'texture_manager');
// Script/texture_manager.js

"use strict";

window.setHeadTexture = function (node, url) {
  if (isNaN(url)) {
    cc.loader.load({
      url: url,
      type: 'png'
    }, function (err, texture) {
      node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    });
  } else {
    if (parseInt(url) < 0) url = 0;
    var fra = cc.find("texture_manager").getComponent("texture_manager").head[parseInt(url) - 1];
    node.getComponent(cc.Sprite).spriteFrame = fra;
  }
};

cc.Class({
  "extends": cc.Component,
  properties: {
    head: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    if (!this.setted) {
      this.setted = true;
      cc.game.addPersistRootNode(this.node);
    }
  } // update (dt) {},

});
window.gold_rate = 100;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0ZXh0dXJlX21hbmFnZXIuanMiXSwibmFtZXMiOlsid2luZG93Iiwic2V0SGVhZFRleHR1cmUiLCJub2RlIiwidXJsIiwiaXNOYU4iLCJjYyIsImxvYWRlciIsImxvYWQiLCJ0eXBlIiwiZXJyIiwidGV4dHVyZSIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJwYXJzZUludCIsImZyYSIsImZpbmQiLCJoZWFkIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiLCJzZXR0ZWQiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiZ29sZF9yYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLGNBQVAsR0FBd0IsVUFBVUMsSUFBVixFQUFnQkMsR0FBaEIsRUFBcUI7QUFDekMsTUFBSUMsS0FBSyxDQUFDRCxHQUFELENBQVQsRUFBZ0I7QUFDWkUsSUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVVDLElBQVYsQ0FBZTtBQUNYSixNQUFBQSxHQUFHLEVBQUVBLEdBRE07QUFFWEssTUFBQUEsSUFBSSxFQUFFO0FBRkssS0FBZixFQUdHLFVBQUNDLEdBQUQsRUFBTUMsT0FBTixFQUFrQjtBQUNqQlIsTUFBQUEsSUFBSSxDQUFDUyxZQUFMLENBQWtCTixFQUFFLENBQUNPLE1BQXJCLEVBQTZCQyxXQUE3QixHQUEyQyxJQUFJUixFQUFFLENBQUNTLFdBQVAsQ0FBbUJKLE9BQW5CLENBQTNDO0FBQ0gsS0FMRDtBQU1ILEdBUEQsTUFPTztBQUNILFFBQUlLLFFBQVEsQ0FBQ1osR0FBRCxDQUFSLEdBQWdCLENBQXBCLEVBQXVCQSxHQUFHLEdBQUcsQ0FBTjtBQUN2QixRQUFJYSxHQUFHLEdBQUdYLEVBQUUsQ0FBQ1ksSUFBSCxDQUFRLGlCQUFSLEVBQTJCTixZQUEzQixDQUF3QyxpQkFBeEMsRUFBMkRPLElBQTNELENBQWdFSCxRQUFRLENBQUNaLEdBQUQsQ0FBUixHQUFnQixDQUFoRixDQUFWO0FBQ0FELElBQUFBLElBQUksQ0FBQ1MsWUFBTCxDQUFrQk4sRUFBRSxDQUFDTyxNQUFyQixFQUE2QkMsV0FBN0IsR0FBMkNHLEdBQTNDO0FBQ0g7QUFDSixDQWJEOztBQWVBWCxFQUFFLENBQUNjLEtBQUgsQ0FBUztBQUNMLGFBQVNkLEVBQUUsQ0FBQ2UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkgsSUFBQUEsSUFBSSxFQUFFLENBQUNiLEVBQUUsQ0FBQ1MsV0FBSjtBQURFLEdBSFA7QUFPTDtBQUVBO0FBRUFRLEVBQUFBLEtBWEssbUJBV0c7QUFDSixRQUFJLENBQUMsS0FBS0MsTUFBVixFQUFrQjtBQUNkLFdBQUtBLE1BQUwsR0FBYyxJQUFkO0FBQ0FsQixNQUFBQSxFQUFFLENBQUNtQixJQUFILENBQVFDLGtCQUFSLENBQTJCLEtBQUt2QixJQUFoQztBQUNIO0FBQ0osR0FoQkksQ0FrQkw7O0FBbEJLLENBQVQ7QUFxQkFGLE1BQU0sQ0FBQzBCLFNBQVAsR0FBbUIsR0FBbkIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5zZXRIZWFkVGV4dHVyZSA9IGZ1bmN0aW9uIChub2RlLCB1cmwpIHtcbiAgICBpZiAoaXNOYU4odXJsKSkge1xuICAgICAgICBjYy5sb2FkZXIubG9hZCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHR5cGU6ICdwbmcnXG4gICAgICAgIH0sIChlcnIsIHRleHR1cmUpID0+IHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXJzZUludCh1cmwpIDwgMCkgdXJsID0gMDtcbiAgICAgICAgdmFyIGZyYSA9IGNjLmZpbmQoXCJ0ZXh0dXJlX21hbmFnZXJcIikuZ2V0Q29tcG9uZW50KFwidGV4dHVyZV9tYW5hZ2VyXCIpLmhlYWRbcGFyc2VJbnQodXJsKSAtIDFdO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gZnJhO1xuICAgIH1cbn1cblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaGVhZDogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNldHRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXR0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuXG53aW5kb3cuZ29sZF9yYXRlID0gMTAwOyJdfQ==