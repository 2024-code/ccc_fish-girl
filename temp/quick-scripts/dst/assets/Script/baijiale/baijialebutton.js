
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/baijiale/baijialebutton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e38783fyOtNI6l6lze2Wit1', 'baijialebutton');
// Script/baijiale/baijialebutton.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  // update (dt) {}
  onClick: function onClick(event, customEventData) {
    var instance = window.baijiale_ins;

    if (customEventData.indexOf('bet') == 0) {//
    } else if (customEventData.indexOf('tobet_') == 0) {//
    } else {
      playEffect('Click');
    }

    if (customEventData == "close") {
      //var lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;
      var ins = require("baijialeNetWork").getInstant;

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
    } else if (customEventData == "bet5") {
      instance.selbet(5 * 100);
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
    } else if (customEventData == "tobet_3") {
      instance.bet(3, event.touch._point);
    } else if (customEventData == "tobet_4") {
      instance.bet(4, event.touch._point);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYWlqaWFsZVxcYmFpamlhbGVidXR0b24uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsIm9uQ2xpY2siLCJldmVudCIsImN1c3RvbUV2ZW50RGF0YSIsImluc3RhbmNlIiwid2luZG93IiwiYmFpamlhbGVfaW5zIiwiaW5kZXhPZiIsInBsYXlFZmZlY3QiLCJpbnMiLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIkxhbmRsb3Jkc1NvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsImhlbHBOb2RlIiwiYWN0aXZlIiwib25saW5lTm9kZSIsInJlY29yZE5vZGUiLCJzZWxiZXQiLCJiZXQiLCJ0b3VjaCIsIl9wb2ludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBO0FBRUFDLEVBQUFBLEtBWEssbUJBV0ksQ0FFUixDQWJJO0FBZUw7QUFDQUMsRUFBQUEsT0FoQkssbUJBZ0JHQyxLQWhCSCxFQWdCU0MsZUFoQlQsRUFpQkw7QUFDSSxRQUFJQyxRQUFRLEdBQUdDLE1BQU0sQ0FBQ0MsWUFBdEI7O0FBQ0EsUUFBSUgsZUFBZSxDQUFDSSxPQUFoQixDQUF3QixLQUF4QixLQUFrQyxDQUF0QyxFQUNBLENBQ0k7QUFDSCxLQUhELE1BR00sSUFBSUosZUFBZSxDQUFDSSxPQUFoQixDQUF3QixRQUF4QixLQUFxQyxDQUF6QyxFQUNOLENBQ0k7QUFDSCxLQUhLLE1BR0Q7QUFDREMsTUFBQUEsVUFBVSxDQUFDLE9BQUQsQ0FBVjtBQUNIOztBQUVELFFBQUlMLGVBQWUsSUFBSSxPQUF2QixFQUNBO0FBQ0k7QUFDQSxVQUFJTSxHQUFHLEdBQUdDLE9BQU8sQ0FBQyxpQkFBRCxDQUFQLENBQTJCQyxVQUFyQzs7QUFDQUYsTUFBQUEsR0FBRyxDQUFDRyxlQUFKLENBQW9CQyxVQUFwQjtBQUNBakIsTUFBQUEsRUFBRSxDQUFDa0IsUUFBSCxDQUFZQyxTQUFaLENBQXNCLFdBQXRCO0FBQ0gsS0FORCxNQU1NLElBQUlaLGVBQWUsSUFBSSxPQUF2QixFQUNOLENBRUMsQ0FISyxNQUdBLElBQUlBLGVBQWUsSUFBSSxNQUF2QixFQUNOO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ1ksUUFBVCxDQUFrQkMsTUFBbEIsR0FBMkIsSUFBM0I7QUFDSCxLQUhLLE1BR0EsSUFBSWQsZUFBZSxJQUFJLFFBQXZCLEVBQ047QUFDSUMsTUFBQUEsUUFBUSxDQUFDYyxVQUFULENBQW9CRCxNQUFwQixHQUE2QixJQUE3QjtBQUNILEtBSEssTUFHQSxJQUFJZCxlQUFlLElBQUksUUFBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNlLFVBQVQsQ0FBb0JGLE1BQXBCLEdBQTZCLElBQTdCO0FBQ0gsS0FISyxNQUlELElBQUlkLGVBQWUsSUFBSSxNQUF2QixFQUNMO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ2dCLE1BQVQsQ0FBZ0IsSUFBRSxHQUFsQjtBQUNILEtBSEksTUFJQSxJQUFJakIsZUFBZSxJQUFJLE1BQXZCLEVBQ0w7QUFDSUMsTUFBQUEsUUFBUSxDQUFDZ0IsTUFBVCxDQUFnQixJQUFFLEdBQWxCO0FBQ0gsS0FISSxNQUdDLElBQUlqQixlQUFlLElBQUksT0FBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNnQixNQUFULENBQWdCLEtBQUcsR0FBbkI7QUFDSCxLQUhLLE1BR0EsSUFBSWpCLGVBQWUsSUFBSSxPQUF2QixFQUNOO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ2dCLE1BQVQsQ0FBZ0IsS0FBRyxHQUFuQjtBQUNILEtBSEssTUFHQSxJQUFJakIsZUFBZSxJQUFJLFFBQXZCLEVBQ047QUFDSUMsTUFBQUEsUUFBUSxDQUFDZ0IsTUFBVCxDQUFnQixNQUFJLEdBQXBCO0FBQ0gsS0FISyxNQUdBLElBQUlqQixlQUFlLElBQUksUUFBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNnQixNQUFULENBQWdCLE1BQUksR0FBcEI7QUFDSCxLQUhLLE1BR0EsSUFBSWpCLGVBQWUsSUFBSSxTQUF2QixFQUNOO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ2lCLEdBQVQsQ0FBYSxDQUFiLEVBQWVuQixLQUFLLENBQUNvQixLQUFOLENBQVlDLE1BQTNCO0FBQ0gsS0FISyxNQUdBLElBQUlwQixlQUFlLElBQUksU0FBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNpQixHQUFULENBQWEsQ0FBYixFQUFlbkIsS0FBSyxDQUFDb0IsS0FBTixDQUFZQyxNQUEzQjtBQUNILEtBSEssTUFHQSxJQUFJcEIsZUFBZSxJQUFJLFNBQXZCLEVBQ047QUFDSUMsTUFBQUEsUUFBUSxDQUFDaUIsR0FBVCxDQUFhLENBQWIsRUFBZW5CLEtBQUssQ0FBQ29CLEtBQU4sQ0FBWUMsTUFBM0I7QUFDSCxLQUhLLE1BR0EsSUFBSXBCLGVBQWUsSUFBSSxTQUF2QixFQUNOO0FBQ0lDLE1BQUFBLFFBQVEsQ0FBQ2lCLEdBQVQsQ0FBYSxDQUFiLEVBQWVuQixLQUFLLENBQUNvQixLQUFOLENBQVlDLE1BQTNCO0FBQ0gsS0FISyxNQUdBLElBQUlwQixlQUFlLElBQUksU0FBdkIsRUFDTjtBQUNJQyxNQUFBQSxRQUFRLENBQUNpQixHQUFULENBQWEsQ0FBYixFQUFlbkIsS0FBSyxDQUFDb0IsS0FBTixDQUFZQyxNQUEzQjtBQUNIO0FBQ0o7QUFuRkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxuICAgIG9uQ2xpY2soZXZlbnQsY3VzdG9tRXZlbnREYXRhKVxuICAgIHtcbiAgICAgICAgbGV0IGluc3RhbmNlID0gd2luZG93LmJhaWppYWxlX2lucztcbiAgICAgICAgaWYgKGN1c3RvbUV2ZW50RGF0YS5pbmRleE9mKCdiZXQnKSA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL1xuICAgICAgICB9ZWxzZSBpZiAoY3VzdG9tRXZlbnREYXRhLmluZGV4T2YoJ3RvYmV0XycpID09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxheUVmZmVjdCgnQ2xpY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJjbG9zZVwiKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL3ZhciBsb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XG4gICAgICAgICAgICB2YXIgaW5zID0gcmVxdWlyZShcImJhaWppYWxlTmV0V29ya1wiKS5nZXRJbnN0YW50O1xuICAgICAgICAgICAgaW5zLkxhbmRsb3Jkc1NvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJzb3VuZFwiKVxuICAgICAgICB7XG5cbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImhlbHBcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2UuaGVscE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcIm9ubGluZVwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbnN0YW5jZS5vbmxpbmVOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJyZWNvcmRcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVjb3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImJldDFcIilcbiAgICAgICAge1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2VsYmV0KDEqMTAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJiZXQ1XCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnNlbGJldCg1KjEwMCk7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJiZXQxMFwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZWxiZXQoMTAqMTAwKTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImJldDUwXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnNlbGJldCg1MCoxMDApO1xuICAgICAgICB9ZWxzZSBpZiAoY3VzdG9tRXZlbnREYXRhID09IFwiYmV0MTAwXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnNlbGJldCgxMDAqMTAwKTtcbiAgICAgICAgfWVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YSA9PSBcImJldDUwMFwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZWxiZXQoNTAwKjEwMCk7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJ0b2JldF8wXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmJldCgwLGV2ZW50LnRvdWNoLl9wb2ludCk7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJ0b2JldF8xXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmJldCgxLGV2ZW50LnRvdWNoLl9wb2ludCk7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJ0b2JldF8yXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmJldCgyLGV2ZW50LnRvdWNoLl9wb2ludCk7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJ0b2JldF8zXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmJldCgzLGV2ZW50LnRvdWNoLl9wb2ludCk7XG4gICAgICAgIH1lbHNlIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJ0b2JldF80XCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmJldCg0LGV2ZW50LnRvdWNoLl9wb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdfQ==