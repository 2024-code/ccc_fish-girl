
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/phList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf533Eu4ohCo7B6bbKKTs7J', 'phList');
// Texture/yadaxiao/js/phList.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    scrollView: {
      "default": null,
      type: cc.ScrollView
    },
    itemPrefeb: cc.Prefab
  },
  start: function start() {
    this.init();
    this.item = [];
  },
  init: function init() {
    this.itemSlots = [];

    var cfg = require("cfg");

    var http = require("http");

    var self = this;

    var userGetrank = function userGetrank(ret) {
      console.log("成功");
      self.item = ret;

      for (var i = 0; i < self.item.length; ++i) {
        var itemSlot = self.addItemSlot(self.item[i].username, self.item[i].coin, self.item[i].id, self.item[i].weixin, self.item[i].qq, self.item[i].mobile);
        self.itemSlots.push(itemSlot);
      }
    };

    http.createXMLHttpRequest(cfg.cUrl + "USERGETRANK", userGetrank);
  },
  addItemSlot: function addItemSlot(a, b, c, d, e, f) {
    var itemSlot = cc.instantiate(this.itemPrefeb);
    this.scrollView.content.addChild(itemSlot);
    itemSlot.getComponent('phItem').updateItem(a, b, c, d, e, f);
    return itemSlot;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFxwaExpc3QuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzY3JvbGxWaWV3IiwidHlwZSIsIlNjcm9sbFZpZXciLCJpdGVtUHJlZmViIiwiUHJlZmFiIiwic3RhcnQiLCJpbml0IiwiaXRlbSIsIml0ZW1TbG90cyIsImNmZyIsInJlcXVpcmUiLCJodHRwIiwic2VsZiIsInVzZXJHZXRyYW5rIiwicmV0IiwiY29uc29sZSIsImxvZyIsImkiLCJsZW5ndGgiLCJpdGVtU2xvdCIsImFkZEl0ZW1TbG90IiwidXNlcm5hbWUiLCJjb2luIiwiaWQiLCJ3ZWl4aW4iLCJxcSIsIm1vYmlsZSIsInB1c2giLCJjcmVhdGVYTUxIdHRwUmVxdWVzdCIsImNVcmwiLCJhIiwiYiIsImMiLCJkIiwiZSIsImYiLCJpbnN0YW50aWF0ZSIsImNvbnRlbnQiLCJhZGRDaGlsZCIsImdldENvbXBvbmVudCIsInVwZGF0ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVhDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZFLEtBREo7QUFLUkMsSUFBQUEsVUFBVSxFQUFFUCxFQUFFLENBQUNRO0FBTFAsR0FIUDtBQVdMQyxFQUFBQSxLQUFLLEVBQUUsaUJBQVk7QUFDZixTQUFLQyxJQUFMO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDSCxHQWRJO0FBZUxELEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtFLFNBQUwsR0FBaUIsRUFBakI7O0FBQ0EsUUFBSUMsR0FBRyxHQUFHQyxPQUFPLENBQUMsS0FBRCxDQUFqQjs7QUFDQSxRQUFJQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxNQUFELENBQWxCOztBQUNBLFFBQUlFLElBQUksR0FBRyxJQUFYOztBQUNBLFFBQUlDLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQVNDLEdBQVQsRUFBYTtBQUMzQkMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQUNBSixNQUFBQSxJQUFJLENBQUNMLElBQUwsR0FBWU8sR0FBWjs7QUFDQSxXQUFLLElBQUlHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdMLElBQUksQ0FBQ0wsSUFBTCxDQUFVVyxNQUE5QixFQUFzQyxFQUFFRCxDQUF4QyxFQUEyQztBQUN2QyxZQUFJRSxRQUFRLEdBQUdQLElBQUksQ0FBQ1EsV0FBTCxDQUFpQlIsSUFBSSxDQUFDTCxJQUFMLENBQVVVLENBQVYsRUFBYUksUUFBOUIsRUFBdUNULElBQUksQ0FBQ0wsSUFBTCxDQUFVVSxDQUFWLEVBQWFLLElBQXBELEVBQXlEVixJQUFJLENBQUNMLElBQUwsQ0FBVVUsQ0FBVixFQUFhTSxFQUF0RSxFQUF5RVgsSUFBSSxDQUFDTCxJQUFMLENBQVVVLENBQVYsRUFBYU8sTUFBdEYsRUFBNkZaLElBQUksQ0FBQ0wsSUFBTCxDQUFVVSxDQUFWLEVBQWFRLEVBQTFHLEVBQTZHYixJQUFJLENBQUNMLElBQUwsQ0FBVVUsQ0FBVixFQUFhUyxNQUExSCxDQUFmO0FBQ0FkLFFBQUFBLElBQUksQ0FBQ0osU0FBTCxDQUFlbUIsSUFBZixDQUFvQlIsUUFBcEI7QUFDSDtBQUNKLEtBUEQ7O0FBUUFSLElBQUFBLElBQUksQ0FBQ2lCLG9CQUFMLENBQTBCbkIsR0FBRyxDQUFDb0IsSUFBSixHQUFXLGFBQXJDLEVBQW1EaEIsV0FBbkQ7QUFDSCxHQTdCSTtBQStCTE8sRUFBQUEsV0FBVyxFQUFFLHFCQUFVVSxDQUFWLEVBQVlDLENBQVosRUFBY0MsQ0FBZCxFQUFnQkMsQ0FBaEIsRUFBa0JDLENBQWxCLEVBQW9CQyxDQUFwQixFQUF1QjtBQUNoQyxRQUFJaEIsUUFBUSxHQUFHdkIsRUFBRSxDQUFDd0MsV0FBSCxDQUFlLEtBQUtqQyxVQUFwQixDQUFmO0FBQ0EsU0FBS0gsVUFBTCxDQUFnQnFDLE9BQWhCLENBQXdCQyxRQUF4QixDQUFpQ25CLFFBQWpDO0FBQ0FBLElBQUFBLFFBQVEsQ0FBQ29CLFlBQVQsQ0FBc0IsUUFBdEIsRUFBZ0NDLFVBQWhDLENBQTJDVixDQUEzQyxFQUE4Q0MsQ0FBOUMsRUFBaURDLENBQWpELEVBQW9EQyxDQUFwRCxFQUF1REMsQ0FBdkQsRUFBMERDLENBQTFEO0FBQ0EsV0FBT2hCLFFBQVA7QUFDSDtBQXBDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNjcm9sbFZpZXc6IHtcclxuICAgICAgICBcdGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgXHR0eXBlOiBjYy5TY3JvbGxWaWV3XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpdGVtUHJlZmViOiBjYy5QcmVmYWIsXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pdGVtID0gW107XHJcbiAgICB9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVNsb3RzID0gW107XHJcbiAgICAgICAgdmFyIGNmZyA9IHJlcXVpcmUoXCJjZmdcIik7XHJcbiAgICAgICAgdmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHVzZXJHZXRyYW5rID0gZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip9cIik7XHJcbiAgICAgICAgICAgIHNlbGYuaXRlbSA9IHJldDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLml0ZW0ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtU2xvdCA9IHNlbGYuYWRkSXRlbVNsb3Qoc2VsZi5pdGVtW2ldLnVzZXJuYW1lLHNlbGYuaXRlbVtpXS5jb2luLHNlbGYuaXRlbVtpXS5pZCxzZWxmLml0ZW1baV0ud2VpeGluLHNlbGYuaXRlbVtpXS5xcSxzZWxmLml0ZW1baV0ubW9iaWxlKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuaXRlbVNsb3RzLnB1c2goaXRlbVNsb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBodHRwLmNyZWF0ZVhNTEh0dHBSZXF1ZXN0KGNmZy5jVXJsICsgXCJVU0VSR0VUUkFOS1wiLHVzZXJHZXRyYW5rKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkSXRlbVNsb3Q6IGZ1bmN0aW9uIChhLGIsYyxkLGUsZikge1xyXG4gICAgICAgIGxldCBpdGVtU2xvdCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZlYik7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuYWRkQ2hpbGQoaXRlbVNsb3QpO1xyXG4gICAgICAgIGl0ZW1TbG90LmdldENvbXBvbmVudCgncGhJdGVtJykudXBkYXRlSXRlbShhLCBiLCBjLCBkLCBlLCBmKTtcclxuICAgICAgICByZXR1cm4gaXRlbVNsb3Q7XHJcbiAgICB9LFxyXG59KTsiXX0=