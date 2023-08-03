
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Fish/FishButtonClick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '54797vK7+NMSoMhEwY9kuVq', 'FishButtonClick');
// Script/Fish/FishButtonClick.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  // update (dt) {}
  onClick: function onClick(event, customEventData) {
    var instance = window.fish_ins;

    if (customEventData.indexOf('bet') == 0) {//
    } else if (customEventData.indexOf('bullet') == 0) {//
    } else {
      playEffect('Click');
    }

    switch (customEventData) {
      case "close":
        //var lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;
        var ins = require("FishNetWork").getInstant;

        if (ins.fishSocket) {
          ins.fishSocket.disconnect();
        }

        cc.director.loadScene("LobbyMain");
        break;

      case "exit":
        cc.find("Canvas/exitPanel").active = true;
        break;

      case "closeExit":
        cc.find("Canvas/exitPanel").active = false;
        break;

      case "left_switch":
        instance.switch_left();
        break;

      case "info":
        instance.node.getChildByName("help").active = true;
        break;

      case "closeinfo":
        instance.node.getChildByName("help").active = false;
        break;

      case "setting":
        cc.find("Canvas/settingPanel").active = true;
        break;

      case "closeSetting":
        cc.find("Canvas/settingPanel").active = false;
        break;

      case "setMusic":
        instance.setMusic();
        break;

      case "setSound":
        instance.setSound();
        break;

      case "skill_0":
        instance.cast_skill(1);
        break;

      case "skill_1":
        instance.cast_skill(2);
        break;

      case "bulletup":
        instance.bullet_change(1);
        playEffect('bullet_down');
        break;

      case "bullet_down":
        instance.bullet_change(-1);
        playEffect('bullet_up');
        break;
    }
  },
  onToggleClick: function onToggleClick(toggle, customEventData) {
    var instance = window.fish_ins;
    toggle.target.active = !toggle.isChecked;

    if (customEventData == "AutoShot") {
      instance.setAutoShot(toggle.isChecked);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXNoXFxGaXNoQnV0dG9uQ2xpY2suanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsIm9uQ2xpY2siLCJldmVudCIsImN1c3RvbUV2ZW50RGF0YSIsImluc3RhbmNlIiwid2luZG93IiwiZmlzaF9pbnMiLCJpbmRleE9mIiwicGxheUVmZmVjdCIsImlucyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiZmlzaFNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsImZpbmQiLCJhY3RpdmUiLCJzd2l0Y2hfbGVmdCIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsInNldE11c2ljIiwic2V0U291bmQiLCJjYXN0X3NraWxsIiwiYnVsbGV0X2NoYW5nZSIsIm9uVG9nZ2xlQ2xpY2siLCJ0b2dnbGUiLCJ0YXJnZXQiLCJpc0NoZWNrZWQiLCJzZXRBdXRvU2hvdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBO0FBRUFDLEVBQUFBLEtBWEssbUJBV0csQ0FFUCxDQWJJO0FBZUw7QUFDQUMsRUFBQUEsT0FoQkssbUJBZ0JHQyxLQWhCSCxFQWdCVUMsZUFoQlYsRUFnQjJCO0FBQzVCLFFBQUlDLFFBQVEsR0FBR0MsTUFBTSxDQUFDQyxRQUF0Qjs7QUFDQSxRQUFJSCxlQUFlLENBQUNJLE9BQWhCLENBQXdCLEtBQXhCLEtBQWtDLENBQXRDLEVBQXlDLENBQ3JDO0FBQ0gsS0FGRCxNQUVPLElBQUlKLGVBQWUsQ0FBQ0ksT0FBaEIsQ0FBd0IsUUFBeEIsS0FBcUMsQ0FBekMsRUFBNEMsQ0FDL0M7QUFDSCxLQUZNLE1BRUE7QUFDSEMsTUFBQUEsVUFBVSxDQUFDLE9BQUQsQ0FBVjtBQUNIOztBQUVELFlBQVFMLGVBQVI7QUFDSSxXQUFLLE9BQUw7QUFDSTtBQUNBLFlBQUlNLEdBQUcsR0FBR0MsT0FBTyxDQUFDLGFBQUQsQ0FBUCxDQUF1QkMsVUFBakM7O0FBQ0EsWUFBSUYsR0FBRyxDQUFDRyxVQUFSLEVBQW9CO0FBQ2hCSCxVQUFBQSxHQUFHLENBQUNHLFVBQUosQ0FBZUMsVUFBZjtBQUNIOztBQUNEakIsUUFBQUEsRUFBRSxDQUFDa0IsUUFBSCxDQUFZQyxTQUFaLENBQXNCLFdBQXRCO0FBQ0E7O0FBQ0osV0FBSyxNQUFMO0FBQ0luQixRQUFBQSxFQUFFLENBQUNvQixJQUFILENBQVEsa0JBQVIsRUFBNEJDLE1BQTVCLEdBQXFDLElBQXJDO0FBQ0E7O0FBQ0osV0FBSyxXQUFMO0FBQ0lyQixRQUFBQSxFQUFFLENBQUNvQixJQUFILENBQVEsa0JBQVIsRUFBNEJDLE1BQTVCLEdBQXFDLEtBQXJDO0FBQ0E7O0FBQ0osV0FBSyxhQUFMO0FBQ0liLFFBQUFBLFFBQVEsQ0FBQ2MsV0FBVDtBQUNBOztBQUNKLFdBQUssTUFBTDtBQUNJZCxRQUFBQSxRQUFRLENBQUNlLElBQVQsQ0FBY0MsY0FBZCxDQUE2QixNQUE3QixFQUFxQ0gsTUFBckMsR0FBOEMsSUFBOUM7QUFDQTs7QUFDSixXQUFLLFdBQUw7QUFDSWIsUUFBQUEsUUFBUSxDQUFDZSxJQUFULENBQWNDLGNBQWQsQ0FBNkIsTUFBN0IsRUFBcUNILE1BQXJDLEdBQThDLEtBQTlDO0FBQ0E7O0FBQ0osV0FBSyxTQUFMO0FBQ0lyQixRQUFBQSxFQUFFLENBQUNvQixJQUFILENBQVEscUJBQVIsRUFBK0JDLE1BQS9CLEdBQXdDLElBQXhDO0FBQ0E7O0FBQ0osV0FBSyxjQUFMO0FBQ0lyQixRQUFBQSxFQUFFLENBQUNvQixJQUFILENBQVEscUJBQVIsRUFBK0JDLE1BQS9CLEdBQXdDLEtBQXhDO0FBQ0E7O0FBQ0osV0FBSyxVQUFMO0FBQ0liLFFBQUFBLFFBQVEsQ0FBQ2lCLFFBQVQ7QUFDQTs7QUFDSixXQUFLLFVBQUw7QUFDSWpCLFFBQUFBLFFBQVEsQ0FBQ2tCLFFBQVQ7QUFDQTs7QUFDSixXQUFLLFNBQUw7QUFDSWxCLFFBQUFBLFFBQVEsQ0FBQ21CLFVBQVQsQ0FBb0IsQ0FBcEI7QUFDQTs7QUFDSixXQUFLLFNBQUw7QUFDSW5CLFFBQUFBLFFBQVEsQ0FBQ21CLFVBQVQsQ0FBb0IsQ0FBcEI7QUFDQTs7QUFDSixXQUFLLFVBQUw7QUFDSW5CLFFBQUFBLFFBQVEsQ0FBQ29CLGFBQVQsQ0FBdUIsQ0FBdkI7QUFDQWhCLFFBQUFBLFVBQVUsQ0FBQyxhQUFELENBQVY7QUFDQTs7QUFDSixXQUFLLGFBQUw7QUFDSUosUUFBQUEsUUFBUSxDQUFDb0IsYUFBVCxDQUF1QixDQUFDLENBQXhCO0FBQ0FoQixRQUFBQSxVQUFVLENBQUMsV0FBRCxDQUFWO0FBQ0E7QUFqRFI7QUFvREgsR0E5RUk7QUFnRkxpQixFQUFBQSxhQWhGSyx5QkFnRlNDLE1BaEZULEVBZ0ZpQnZCLGVBaEZqQixFQWdGa0M7QUFDbkMsUUFBSUMsUUFBUSxHQUFHQyxNQUFNLENBQUNDLFFBQXRCO0FBQ0FvQixJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY1YsTUFBZCxHQUF1QixDQUFDUyxNQUFNLENBQUNFLFNBQS9COztBQUNBLFFBQUl6QixlQUFlLElBQUksVUFBdkIsRUFBbUM7QUFDL0JDLE1BQUFBLFFBQVEsQ0FBQ3lCLFdBQVQsQ0FBcUJILE1BQU0sQ0FBQ0UsU0FBNUI7QUFDSDtBQUNKO0FBdEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxuICAgIG9uQ2xpY2soZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSB3aW5kb3cuZmlzaF9pbnM7XG4gICAgICAgIGlmIChjdXN0b21FdmVudERhdGEuaW5kZXhPZignYmV0JykgPT0gMCkge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgfSBlbHNlIGlmIChjdXN0b21FdmVudERhdGEuaW5kZXhPZignYnVsbGV0JykgPT0gMCkge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ0NsaWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6XG4gICAgICAgICAgICAgICAgLy92YXIgbG9iYnlNYWluU29ja2V0ID0gcmVxdWlyZSgnLi4vTG9iYnkvTG9iYnlOZXRXb3JrJykuc29ja2V0O1xuICAgICAgICAgICAgICAgIHZhciBpbnMgPSByZXF1aXJlKFwiRmlzaE5ldFdvcmtcIikuZ2V0SW5zdGFudDtcbiAgICAgICAgICAgICAgICBpZiAoaW5zLmZpc2hTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zLmZpc2hTb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZXhpdFwiOlxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvZXhpdFBhbmVsXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VFeGl0XCI6XG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9leGl0UGFuZWxcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGVmdF9zd2l0Y2hcIjpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5zd2l0Y2hfbGVmdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImluZm9cIjpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5ub2RlLmdldENoaWxkQnlOYW1lKFwiaGVscFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlaW5mb1wiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZWxwXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNldHRpbmdcIjpcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3NldHRpbmdQYW5lbFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlU2V0dGluZ1wiOlxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvc2V0dGluZ1BhbmVsXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNldE11c2ljXCI6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0TXVzaWMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZXRTb3VuZFwiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldFNvdW5kKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2tpbGxfMFwiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhc3Rfc2tpbGwoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2tpbGxfMVwiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhc3Rfc2tpbGwoMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnVsbGV0dXBcIjpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5idWxsZXRfY2hhbmdlKDEpO1xuICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2J1bGxldF9kb3duJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnVsbGV0X2Rvd25cIjpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5idWxsZXRfY2hhbmdlKC0xKTtcbiAgICAgICAgICAgICAgICBwbGF5RWZmZWN0KCdidWxsZXRfdXAnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG9uVG9nZ2xlQ2xpY2sodG9nZ2xlLCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgbGV0IGluc3RhbmNlID0gd2luZG93LmZpc2hfaW5zO1xuICAgICAgICB0b2dnbGUudGFyZ2V0LmFjdGl2ZSA9ICF0b2dnbGUuaXNDaGVja2VkO1xuICAgICAgICBpZiAoY3VzdG9tRXZlbnREYXRhID09IFwiQXV0b1Nob3RcIikge1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0QXV0b1Nob3QodG9nZ2xlLmlzQ2hlY2tlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuIl19