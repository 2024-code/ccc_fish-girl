
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/game_saigou/houndRecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1c8daSVkYxKU5+JVABuCQ6v', 'houndRecord');
// Texture/game_saigou/houndRecord.js

"use strict";

var KBEngine = {}; //require("kbengine");

cc.Class({
  "extends": cc.Component,
  properties: {
    Node_ItemParent: {
      "default": null,
      type: cc.Node,
      tooltip: "Item父节点"
    },
    Prefab_Item: {
      "default": null,
      type: cc.Prefab,
      tooltip: "Item预制件"
    }
  },
  //取消注册
  onDestroy: function onDestroy() {
    KBEngine.Event.deregister("onGetDogRaceRecord", this);
  },
  start: function start() {
    KBEngine.Event.register("onGetDogRaceRecord", this, "onGetDogRaceRecord");
  },
  onEnable: function onEnable() {
    KBEngine.app.player().reqGetDogRaceRecord(); //请求赛狗比赛记录
  },
  onDisable: function onDisable() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].destroy();
    }
  },
  onGetDogRaceRecord: function onGetDogRaceRecord(dictList) {
    for (var i = 0; i < dictList.length; i++) {
      var record = dictList[i];
      var nodeItem = cc.instantiate(this.Prefab_Item);
      nodeItem.getComponent("houndRecordItem").SetData(record);
      nodeItem.parent = this.Node_ItemParent;
    }
  },
  onBtnClick_HaoMa: function onBtnClick_HaoMa() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].getComponent("houndRecordItem").ShowHaoMa();
    }
  },
  onBtnClick_DaXiao: function onBtnClick_DaXiao() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].getComponent("houndRecordItem").ShowDaXiao();
    }
  },
  onBtnClick_DanShuang: function onBtnClick_DanShuang() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].getComponent("houndRecordItem").ShowDanShuang();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcZ2FtZV9zYWlnb3VcXGhvdW5kUmVjb3JkLmpzIl0sIm5hbWVzIjpbIktCRW5naW5lIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJOb2RlX0l0ZW1QYXJlbnQiLCJ0eXBlIiwiTm9kZSIsInRvb2x0aXAiLCJQcmVmYWJfSXRlbSIsIlByZWZhYiIsIm9uRGVzdHJveSIsIkV2ZW50IiwiZGVyZWdpc3RlciIsInN0YXJ0IiwicmVnaXN0ZXIiLCJvbkVuYWJsZSIsImFwcCIsInBsYXllciIsInJlcUdldERvZ1JhY2VSZWNvcmQiLCJvbkRpc2FibGUiLCJpdGVtcyIsImNoaWxkcmVuIiwiaSIsImxlbmd0aCIsImRlc3Ryb3kiLCJvbkdldERvZ1JhY2VSZWNvcmQiLCJkaWN0TGlzdCIsInJlY29yZCIsIm5vZGVJdGVtIiwiaW5zdGFudGlhdGUiLCJnZXRDb21wb25lbnQiLCJTZXREYXRhIiwicGFyZW50Iiwib25CdG5DbGlja19IYW9NYSIsIlNob3dIYW9NYSIsIm9uQnRuQ2xpY2tfRGFYaWFvIiwiU2hvd0RhWGlhbyIsIm9uQnRuQ2xpY2tfRGFuU2h1YW5nIiwiU2hvd0RhblNodWFuZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUcsRUFBZixFQUFrQjs7QUFDbEJDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxlQUFlLEVBQUU7QUFDYixpQkFBUyxJQURJO0FBRWJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxJQUZJO0FBR2JDLE1BQUFBLE9BQU8sRUFBRTtBQUhJLEtBRFQ7QUFNUkMsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsTUFGQTtBQUdURixNQUFBQSxPQUFPLEVBQUU7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ZW5naW5lXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIE5vZGVfSXRlbVBhcmVudDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkl0ZW3niLboioLngrlcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFByZWZhYl9JdGVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJJdGVt6aKE5Yi25Lu2XCIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy/lj5bmtojms6jlhoxcclxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkdldERvZ1JhY2VSZWNvcmRcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkdldERvZ1JhY2VSZWNvcmRcIiwgdGhpcywgXCJvbkdldERvZ1JhY2VSZWNvcmRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuYXBwLnBsYXllcigpLnJlcUdldERvZ1JhY2VSZWNvcmQoKTsvL+ivt+axgui1m+eLl+avlOi1m+iusOW9lVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLk5vZGVfSXRlbVBhcmVudC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uR2V0RG9nUmFjZVJlY29yZDpmdW5jdGlvbihkaWN0TGlzdCl7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaWN0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gZGljdExpc3RbaV07XHJcbiAgICAgICAgICAgIHZhciBub2RlSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUHJlZmFiX0l0ZW0pO1xyXG4gICAgICAgICAgICBub2RlSXRlbS5nZXRDb21wb25lbnQoXCJob3VuZFJlY29yZEl0ZW1cIikuU2V0RGF0YShyZWNvcmQpO1xyXG4gICAgICAgICAgICBub2RlSXRlbS5wYXJlbnQgPSB0aGlzLk5vZGVfSXRlbVBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkJ0bkNsaWNrX0hhb01hOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5Ob2RlX0l0ZW1QYXJlbnQuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVtc1tpXS5nZXRDb21wb25lbnQoXCJob3VuZFJlY29yZEl0ZW1cIikuU2hvd0hhb01hKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJ0bkNsaWNrX0RhWGlhbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuTm9kZV9JdGVtUGFyZW50LmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaXRlbXNbaV0uZ2V0Q29tcG9uZW50KFwiaG91bmRSZWNvcmRJdGVtXCIpLlNob3dEYVhpYW8oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQnRuQ2xpY2tfRGFuU2h1YW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5Ob2RlX0l0ZW1QYXJlbnQuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVtc1tpXS5nZXRDb21wb25lbnQoXCJob3VuZFJlY29yZEl0ZW1cIikuU2hvd0RhblNodWFuZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pOyJdfQ==