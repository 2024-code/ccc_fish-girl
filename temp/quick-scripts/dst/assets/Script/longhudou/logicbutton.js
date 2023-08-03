
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/longhudou/logicbutton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '667400R4EtF7owBnieaf/vY', 'logicbutton');
// Script/longhudou/logicbutton.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  // update (dt) {}
  onClick: function onClick(event, customEventData) {
    var instance = window.longhudou_ins;

    if (customEventData.indexOf('bet') == 0) {//
    } else if (customEventData.indexOf('tobet_') == 0) {//
    } else {
      playEffect('Click');
    }

    if (customEventData == "close") {
      //var lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;
      var ins = require("longhudouNetWork").getInstant;

      ins.LandlordsSocket.disconnect();
      cc.director.loadScene("LobbyMain");
    } else if (customEventData == "sound") {} else if (customEventData == "help") {
      instance.helpNode.active = true;
    } else if (customEventData == "online") {
      instance.onlineNode.active = true;
    } else if (customEventData == "record") {
      instance.recordNode.active = true;
    } else if (customEventData == "bet1") {
      instance.selbet(1 * 100);
    } else if (customEventData == "bet10") {
      instance.selbet(10 * 100);
    } else if (customEventData == "bet50") {
      instance.selbet(50 * 100);
    } else if (customEventData == "bet100") {
      instance.selbet(100 * 100);
    } else if (customEventData == "bet500") {
      instance.selbet(500 * 100);
    } else if (customEventData == "tobet_0") {
      instance.bet(0, event.touch._point);
    } else if (customEventData == "tobet_1") {
      instance.bet(1, event.touch._point);
    } else if (customEventData == "tobet_2") {
      instance.bet(2, event.touch._point);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxsb25naHVkb3VcXGxvZ2ljYnV0dG9uLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiLCJvbkNsaWNrIiwiZXZlbnQiLCJjdXN0b21FdmVudERhdGEiLCJpbnN0YW5jZSIsIndpbmRvdyIsImxvbmdodWRvdV9pbnMiLCJpbmRleE9mIiwicGxheUVmZmVjdCIsImlucyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiTGFuZGxvcmRzU29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiaGVscE5vZGUiLCJhY3RpdmUiLCJvbmxpbmVOb2RlIiwicmVjb3JkTm9kZSIsInNlbGJldCIsImJldCIsInRvdWNoIiwiX3BvaW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFFQUMsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkk7QUFlTDtBQUNBQyxFQUFBQSxPQWhCSyxtQkFnQkdDLEtBaEJILEVBZ0JTQyxlQWhCVCxFQWlCTDtBQUNJLFFBQUlDLFFBQVEsR0FBR0MsTUFBTSxDQUFDQyxhQUF0Qjs7QUFDQSxRQUFJSCxlQUFlLENBQUNJLE9BQWhCLENBQXdCLEtBQXhCLEtBQWtDLENBQXRDLEVBQ0EsQ0FDSTtBQUNILEtBSEQsTUFHTSxJQUFJSixlQUFlLENBQUNJLE9BQWhCLENBQXdCLFFBQXhCLEtBQXFDLENBQXpDLEVBQ04sQ0FDSTtBQUNILEtBSEssTUFHRDtBQUNEQyxNQUFBQSxVQUFVLENBQUMsT0FBRCxDQUFWO0FBQ0g7O0FBRUQsUUFBSUwsZUFBZSxJQUFJLE9BQXZCLEVBQ0E7QUFDSTtBQUNBLFVBQUlNLEdBQUcsR0FBR0MsT0FBTyxDQUFDLGtCQUFELENBQVAsQ0FBNEJDLFVBQXRDOztBQUNBRixNQUFBQSxHQUFHLENBQUNHLGVBQUosQ0FBb0JDLFVBQXBCO0FBQ0FqQixNQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlDLFNBQVosQ0FBc0IsV0FBdEI7QUFDSCxLQU5ELE1BTU0sSUFBSVosZUFBZSxJQUFJLE9BQXZCLEVBQ04sQ0FFQyxDQUhLLE1BR0EsSUFBSUEsZUFBZSxJQUFJLE1BQXZCLEVBQ047QUFDSUMsTUFBQUEsUUFBUSxDQUFDWSxRQUFULENBQWtCQyxNQUFsQixHQUEyQixJQUEzQjtBQUNILEtBSEssTUFHQSxJQUFJZCxlQUFlLElBQUksUUFBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNjLFVBQVQsQ0FBb0JELE1BQXBCLEdBQTZCLElBQTdCO0FBQ0gsS0FISyxNQUdBLElBQUlkLGVBQWUsSUFBSSxRQUF2QixFQUNOO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ2UsVUFBVCxDQUFvQkYsTUFBcEIsR0FBNkIsSUFBN0I7QUFDSCxLQUhLLE1BSUQsSUFBSWQsZUFBZSxJQUFJLE1BQXZCLEVBQ0w7QUFDSUMsTUFBQUEsUUFBUSxDQUFDZ0IsTUFBVCxDQUFnQixJQUFFLEdBQWxCO0FBQ0gsS0FISSxNQUdDLElBQUlqQixlQUFlLElBQUksT0FBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNnQixNQUFULENBQWdCLEtBQUcsR0FBbkI7QUFDSCxLQUhLLE1BR0EsSUFBSWpCLGVBQWUsSUFBSSxPQUF2QixFQUNOO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ2dCLE1BQVQsQ0FBZ0IsS0FBRyxHQUFuQjtBQUNILEtBSEssTUFHQSxJQUFJakIsZUFBZSxJQUFJLFFBQXZCLEVBQ047QUFDSUMsTUFBQUEsUUFBUSxDQUFDZ0IsTUFBVCxDQUFnQixNQUFJLEdBQXBCO0FBQ0gsS0FISyxNQUdBLElBQUlqQixlQUFlLElBQUksUUFBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNnQixNQUFULENBQWdCLE1BQUksR0FBcEI7QUFDSCxLQUhLLE1BR0EsSUFBSWpCLGVBQWUsSUFBSSxTQUF2QixFQUNOO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ2lCLEdBQVQsQ0FBYSxDQUFiLEVBQWVuQixLQUFLLENBQUNvQixLQUFOLENBQVlDLE1BQTNCO0FBQ0gsS0FISyxNQUdBLElBQUlwQixlQUFlLElBQUksU0FBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNpQixHQUFULENBQWEsQ0FBYixFQUFlbkIsS0FBSyxDQUFDb0IsS0FBTixDQUFZQyxNQUEzQjtBQUNILEtBSEssTUFHQSxJQUFJcEIsZUFBZSxJQUFJLFNBQXZCLEVBQ047QUFDSUMsTUFBQUEsUUFBUSxDQUFDaUIsR0FBVCxDQUFhLENBQWIsRUFBZW5CLEtBQUssQ0FBQ29CLEtBQU4sQ0FBWUMsTUFBM0I7QUFDSDtBQUNKO0FBekVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbiAgICBvbkNsaWNrKGV2ZW50LGN1c3RvbUV2ZW50RGF0YSlcbiAgICB7XG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHdpbmRvdy5sb25naHVkb3VfaW5zO1xuICAgICAgICBpZiAoY3VzdG9tRXZlbnREYXRhLmluZGV4T2YoJ2JldCcpID09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEuaW5kZXhPZigndG9iZXRfJykgPT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwbGF5RWZmZWN0KCdDbGljaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImNsb3NlXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vdmFyIGxvYmJ5TWFpblNvY2tldCA9IHJlcXVpcmUoJy4uL0xvYmJ5L0xvYmJ5TmV0V29yaycpLnNvY2tldDtcbiAgICAgICAgICAgIHZhciBpbnMgPSByZXF1aXJlKFwibG9uZ2h1ZG91TmV0V29ya1wiKS5nZXRJbnN0YW50O1xuICAgICAgICAgICAgaW5zLkxhbmRsb3Jkc1NvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJzb3VuZFwiKVxuICAgICAgICB7XG5cbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImhlbHBcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2UuaGVscE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcIm9ubGluZVwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbnN0YW5jZS5vbmxpbmVOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJyZWNvcmRcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVjb3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImJldDFcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2VsYmV0KDEqMTAwKTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImJldDEwXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnNlbGJldCgxMCoxMDApO1xuICAgICAgICB9ZWxzZSBpZiAoY3VzdG9tRXZlbnREYXRhID09IFwiYmV0NTBcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2VsYmV0KDUwKjEwMCk7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJiZXQxMDBcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2VsYmV0KDEwMCoxMDApO1xuICAgICAgICB9ZWxzZSBpZiAoY3VzdG9tRXZlbnREYXRhID09IFwiYmV0NTAwXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnNlbGJldCg1MDAqMTAwKTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcInRvYmV0XzBcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2UuYmV0KDAsZXZlbnQudG91Y2guX3BvaW50KTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcInRvYmV0XzFcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2UuYmV0KDEsZXZlbnQudG91Y2guX3BvaW50KTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcInRvYmV0XzJcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2UuYmV0KDIsZXZlbnQudG91Y2guX3BvaW50KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl19