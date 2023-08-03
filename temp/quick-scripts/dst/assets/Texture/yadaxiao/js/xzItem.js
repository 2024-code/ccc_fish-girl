
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/xzItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '31d87EzbAlP84xunEPG7mfG', 'xzItem');
// Texture/yadaxiao/js/xzItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    word: cc.Label
  },
  updateItem: function updateItem(name, big, small) {
    this.word.string = "[" + name + "]" + "下注" + big + "大" + small + "小";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFx4ekl0ZW0uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ3b3JkIiwiTGFiZWwiLCJ1cGRhdGVJdGVtIiwibmFtZSIsImJpZyIsInNtYWxsIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFSixFQUFFLENBQUNLO0FBREQsR0FIUDtBQU9MQyxFQUFBQSxVQUFVLEVBQUUsb0JBQVNDLElBQVQsRUFBZUMsR0FBZixFQUFvQkMsS0FBcEIsRUFBMkI7QUFDbkMsU0FBS0wsSUFBTCxDQUFVTSxNQUFWLEdBQW1CLE1BQU1ILElBQU4sR0FBYSxHQUFiLEdBQW1CLElBQW5CLEdBQTBCQyxHQUExQixHQUFnQyxHQUFoQyxHQUFzQ0MsS0FBdEMsR0FBOEMsR0FBakU7QUFDSDtBQVRJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgd29yZDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUl0ZW06IGZ1bmN0aW9uKG5hbWUsIGJpZywgc21hbGwpIHtcclxuICAgICAgICB0aGlzLndvcmQuc3RyaW5nID0gXCJbXCIgKyBuYW1lICsgXCJdXCIgKyBcIuS4i+azqFwiICsgYmlnICsgXCLlpKdcIiArIHNtYWxsICsgXCLlsI9cIjtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=