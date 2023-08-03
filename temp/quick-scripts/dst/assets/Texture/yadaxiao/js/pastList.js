
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/pastList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '742b2iszihEEp38cyJLFyMQ', 'pastList');
// Texture/yadaxiao/js/pastList.js

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

    var past = function past(ret) {
      console.log("成功");
      self.item = ret;

      for (var i = 0; i < self.item.length; ++i) {
        var itemSlot = self.addItemSlot(parseInt(self.item[i].sieve1), parseInt(self.item[i].sieve2), parseInt(self.item[i].sieve3));
        self.itemSlots.push(itemSlot);
      }
    };

    http.createXMLHttpRequest(cfg.webUrl + "getlist", past);
  },
  addItemSlot: function addItemSlot(a, b, c) {
    var itemSlot = cc.instantiate(this.itemPrefeb);
    this.scrollView.content.addChild(itemSlot);
    itemSlot.getComponent('pastItem').updateItem(a, b, c);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFxwYXN0TGlzdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNjcm9sbFZpZXciLCJ0eXBlIiwiU2Nyb2xsVmlldyIsIml0ZW1QcmVmZWIiLCJQcmVmYWIiLCJzdGFydCIsImluaXQiLCJpdGVtIiwiaXRlbVNsb3RzIiwiY2ZnIiwicmVxdWlyZSIsImh0dHAiLCJzZWxmIiwicGFzdCIsInJldCIsImNvbnNvbGUiLCJsb2ciLCJpIiwibGVuZ3RoIiwiaXRlbVNsb3QiLCJhZGRJdGVtU2xvdCIsInBhcnNlSW50Iiwic2lldmUxIiwic2lldmUyIiwic2lldmUzIiwicHVzaCIsImNyZWF0ZVhNTEh0dHBSZXF1ZXN0Iiwid2ViVXJsIiwiYSIsImIiLCJjIiwiaW5zdGFudGlhdGUiLCJjb250ZW50IiwiYWRkQ2hpbGQiLCJnZXRDb21wb25lbnQiLCJ1cGRhdGVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRSxLQURKO0FBS1JDLElBQUFBLFVBQVUsRUFBRVAsRUFBRSxDQUFDUTtBQUxQLEdBSFA7QUFXTEMsRUFBQUEsS0FBSyxFQUFFLGlCQUFZO0FBQ2YsU0FBS0MsSUFBTDtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0gsR0FkSTtBQWVMRCxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLRSxTQUFMLEdBQWlCLEVBQWpCOztBQUNBLFFBQUlDLEdBQUcsR0FBR0MsT0FBTyxDQUFDLEtBQUQsQ0FBakI7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFsQjs7QUFDQSxRQUFJRSxJQUFJLEdBQUcsSUFBWDs7QUFDQSxRQUFJQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFTQyxHQUFULEVBQWE7QUFDcEJDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVo7QUFDQUosTUFBQUEsSUFBSSxDQUFDTCxJQUFMLEdBQVlPLEdBQVo7O0FBQ0EsV0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTCxJQUFJLENBQUNMLElBQUwsQ0FBVVcsTUFBOUIsRUFBc0MsRUFBRUQsQ0FBeEMsRUFBMkM7QUFDdkMsWUFBSUUsUUFBUSxHQUFHUCxJQUFJLENBQUNRLFdBQUwsQ0FBaUJDLFFBQVEsQ0FBQ1QsSUFBSSxDQUFDTCxJQUFMLENBQVVVLENBQVYsRUFBYUssTUFBZCxDQUF6QixFQUErQ0QsUUFBUSxDQUFDVCxJQUFJLENBQUNMLElBQUwsQ0FBVVUsQ0FBVixFQUFhTSxNQUFkLENBQXZELEVBQTZFRixRQUFRLENBQUNULElBQUksQ0FBQ0wsSUFBTCxDQUFVVSxDQUFWLEVBQWFPLE1BQWQsQ0FBckYsQ0FBZjtBQUNBWixRQUFBQSxJQUFJLENBQUNKLFNBQUwsQ0FBZWlCLElBQWYsQ0FBb0JOLFFBQXBCO0FBQ0g7QUFDSixLQVBEOztBQVFBUixJQUFBQSxJQUFJLENBQUNlLG9CQUFMLENBQTBCakIsR0FBRyxDQUFDa0IsTUFBSixHQUFhLFNBQXZDLEVBQWlEZCxJQUFqRDtBQUNILEdBN0JJO0FBK0JMTyxFQUFBQSxXQUFXLEVBQUUscUJBQVVRLENBQVYsRUFBWUMsQ0FBWixFQUFjQyxDQUFkLEVBQWlCO0FBQzFCLFFBQUlYLFFBQVEsR0FBR3ZCLEVBQUUsQ0FBQ21DLFdBQUgsQ0FBZSxLQUFLNUIsVUFBcEIsQ0FBZjtBQUNBLFNBQUtILFVBQUwsQ0FBZ0JnQyxPQUFoQixDQUF3QkMsUUFBeEIsQ0FBaUNkLFFBQWpDO0FBQ0FBLElBQUFBLFFBQVEsQ0FBQ2UsWUFBVCxDQUFzQixVQUF0QixFQUFrQ0MsVUFBbEMsQ0FBNkNQLENBQTdDLEVBQWdEQyxDQUFoRCxFQUFtREMsQ0FBbkQ7QUFDQSxXQUFPWCxRQUFQO0FBQ0g7QUFwQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzY3JvbGxWaWV3OiB7XHJcbiAgICAgICAgXHRkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIFx0dHlwZTogY2MuU2Nyb2xsVmlld1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXRlbVByZWZlYjogY2MuUHJlZmFiLFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IFtdO1xyXG4gICAgfSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLml0ZW1TbG90cyA9IFtdO1xyXG4gICAgICAgIHZhciBjZmcgPSByZXF1aXJlKFwiY2ZnXCIpO1xyXG4gICAgICAgIHZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXN0ID0gZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip9cIik7XHJcbiAgICAgICAgICAgIHNlbGYuaXRlbSA9IHJldDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLml0ZW0ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtU2xvdCA9IHNlbGYuYWRkSXRlbVNsb3QocGFyc2VJbnQoc2VsZi5pdGVtW2ldLnNpZXZlMSkscGFyc2VJbnQoc2VsZi5pdGVtW2ldLnNpZXZlMikscGFyc2VJbnQoc2VsZi5pdGVtW2ldLnNpZXZlMykpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pdGVtU2xvdHMucHVzaChpdGVtU2xvdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGh0dHAuY3JlYXRlWE1MSHR0cFJlcXVlc3QoY2ZnLndlYlVybCArIFwiZ2V0bGlzdFwiLHBhc3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRJdGVtU2xvdDogZnVuY3Rpb24gKGEsYixjKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1TbG90ID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJlZmViKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5hZGRDaGlsZChpdGVtU2xvdCk7XHJcbiAgICAgICAgaXRlbVNsb3QuZ2V0Q29tcG9uZW50KCdwYXN0SXRlbScpLnVwZGF0ZUl0ZW0oYSwgYiwgYyk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1TbG90O1xyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==