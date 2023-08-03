
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/xzList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5e04qxQtBALagVLZsEwCFh', 'xzList');
// Texture/yadaxiao/js/xzList.js

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
    // this.init();
    this.item = [];
  },
  init: function init() {
    this.itemSlots = [];

    var cfg = require("cfg");

    var http = require("http");

    var self = this;

    var xiazhu = function xiazhu(ret) {
      console.log("成功");
      self.item = ret;

      for (var i = 0; i < self.item.length; ++i) {
        var itemSlot = self.addItemSlot(self.item[i].username, self.item[i].big, self.item[i].small);
        self.itemSlots.push(itemSlot);
      }
    };

    http.createXMLHttpRequest(cfg.webUrl + "getbetlist", xiazhu);
  },
  addItemSlot: function addItemSlot(a, b, c) {
    var itemSlot = cc.instantiate(this.itemPrefeb);
    this.scrollView.content.addChild(itemSlot);
    itemSlot.getComponent('xzItem').updateItem(a, b, c);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFx4ekxpc3QuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzY3JvbGxWaWV3IiwidHlwZSIsIlNjcm9sbFZpZXciLCJpdGVtUHJlZmViIiwiUHJlZmFiIiwic3RhcnQiLCJpdGVtIiwiaW5pdCIsIml0ZW1TbG90cyIsImNmZyIsInJlcXVpcmUiLCJodHRwIiwic2VsZiIsInhpYXpodSIsInJldCIsImNvbnNvbGUiLCJsb2ciLCJpIiwibGVuZ3RoIiwiaXRlbVNsb3QiLCJhZGRJdGVtU2xvdCIsInVzZXJuYW1lIiwiYmlnIiwic21hbGwiLCJwdXNoIiwiY3JlYXRlWE1MSHR0cFJlcXVlc3QiLCJ3ZWJVcmwiLCJhIiwiYiIsImMiLCJpbnN0YW50aWF0ZSIsImNvbnRlbnQiLCJhZGRDaGlsZCIsImdldENvbXBvbmVudCIsInVwZGF0ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVhDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZFLEtBREo7QUFLUkMsSUFBQUEsVUFBVSxFQUFFUCxFQUFFLENBQUNRO0FBTFAsR0FIUDtBQVdMQyxFQUFBQSxLQUFLLEVBQUUsaUJBQVk7QUFDZjtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0gsR0FkSTtBQWVMQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCOztBQUNBLFFBQUlDLEdBQUcsR0FBR0MsT0FBTyxDQUFDLEtBQUQsQ0FBakI7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFsQjs7QUFDQSxRQUFJRSxJQUFJLEdBQUcsSUFBWDs7QUFDQSxRQUFJQyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFTQyxHQUFULEVBQWE7QUFDdEJDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVo7QUFDQUosTUFBQUEsSUFBSSxDQUFDTixJQUFMLEdBQVlRLEdBQVo7O0FBQ0EsV0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTCxJQUFJLENBQUNOLElBQUwsQ0FBVVksTUFBOUIsRUFBc0MsRUFBRUQsQ0FBeEMsRUFBMkM7QUFDdkMsWUFBSUUsUUFBUSxHQUFHUCxJQUFJLENBQUNRLFdBQUwsQ0FBaUJSLElBQUksQ0FBQ04sSUFBTCxDQUFVVyxDQUFWLEVBQWFJLFFBQTlCLEVBQXVDVCxJQUFJLENBQUNOLElBQUwsQ0FBVVcsQ0FBVixFQUFhSyxHQUFwRCxFQUF3RFYsSUFBSSxDQUFDTixJQUFMLENBQVVXLENBQVYsRUFBYU0sS0FBckUsQ0FBZjtBQUNBWCxRQUFBQSxJQUFJLENBQUNKLFNBQUwsQ0FBZWdCLElBQWYsQ0FBb0JMLFFBQXBCO0FBQ0g7QUFDSixLQVBEOztBQVFBUixJQUFBQSxJQUFJLENBQUNjLG9CQUFMLENBQTBCaEIsR0FBRyxDQUFDaUIsTUFBSixHQUFhLFlBQXZDLEVBQW9EYixNQUFwRDtBQUNILEdBN0JJO0FBK0JMTyxFQUFBQSxXQUFXLEVBQUUscUJBQVVPLENBQVYsRUFBWUMsQ0FBWixFQUFjQyxDQUFkLEVBQWlCO0FBQzFCLFFBQUlWLFFBQVEsR0FBR3ZCLEVBQUUsQ0FBQ2tDLFdBQUgsQ0FBZSxLQUFLM0IsVUFBcEIsQ0FBZjtBQUNBLFNBQUtILFVBQUwsQ0FBZ0IrQixPQUFoQixDQUF3QkMsUUFBeEIsQ0FBaUNiLFFBQWpDO0FBQ0FBLElBQUFBLFFBQVEsQ0FBQ2MsWUFBVCxDQUFzQixRQUF0QixFQUFnQ0MsVUFBaEMsQ0FBMkNQLENBQTNDLEVBQThDQyxDQUE5QyxFQUFpREMsQ0FBakQ7QUFDQSxXQUFPVixRQUFQO0FBQ0g7QUFwQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzY3JvbGxWaWV3OiB7XHJcbiAgICAgICAgXHRkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIFx0dHlwZTogY2MuU2Nyb2xsVmlld1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXRlbVByZWZlYjogY2MuUHJlZmFiLFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IFtdO1xyXG4gICAgfSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLml0ZW1TbG90cyA9IFtdO1xyXG4gICAgICAgIHZhciBjZmcgPSByZXF1aXJlKFwiY2ZnXCIpO1xyXG4gICAgICAgIHZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciB4aWF6aHUgPSBmdW5jdGlvbihyZXQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgc2VsZi5pdGVtID0gcmV0O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuaXRlbS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1TbG90ID0gc2VsZi5hZGRJdGVtU2xvdChzZWxmLml0ZW1baV0udXNlcm5hbWUsc2VsZi5pdGVtW2ldLmJpZyxzZWxmLml0ZW1baV0uc21hbGwpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pdGVtU2xvdHMucHVzaChpdGVtU2xvdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGh0dHAuY3JlYXRlWE1MSHR0cFJlcXVlc3QoY2ZnLndlYlVybCArIFwiZ2V0YmV0bGlzdFwiLHhpYXpodSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZEl0ZW1TbG90OiBmdW5jdGlvbiAoYSxiLGMpIHtcclxuICAgICAgICBsZXQgaXRlbVNsb3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmZWIpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmFkZENoaWxkKGl0ZW1TbG90KTtcclxuICAgICAgICBpdGVtU2xvdC5nZXRDb21wb25lbnQoJ3h6SXRlbScpLnVwZGF0ZUl0ZW0oYSwgYiwgYyk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1TbG90O1xyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==