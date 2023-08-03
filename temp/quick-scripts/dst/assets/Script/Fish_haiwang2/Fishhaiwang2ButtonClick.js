
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Fish_haiwang2/Fishhaiwang2ButtonClick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a9dae7IsblBNp7ydcf5P1hz', 'Fishhaiwang2ButtonClick');
// Script/Fish_haiwang2/Fishhaiwang2ButtonClick.js

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
        } else {
          cc.director.loadScene("LobbyMain");
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXNoX2hhaXdhbmcyXFxGaXNoaGFpd2FuZzJCdXR0b25DbGljay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0Iiwib25DbGljayIsImV2ZW50IiwiY3VzdG9tRXZlbnREYXRhIiwiaW5zdGFuY2UiLCJ3aW5kb3ciLCJmaXNoX2lucyIsImluZGV4T2YiLCJwbGF5RWZmZWN0IiwiaW5zIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJmaXNoU29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZmluZCIsImFjdGl2ZSIsInN3aXRjaF9sZWZ0Iiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwic2V0TXVzaWMiLCJzZXRTb3VuZCIsImNhc3Rfc2tpbGwiLCJidWxsZXRfY2hhbmdlIiwib25Ub2dnbGVDbGljayIsInRvZ2dsZSIsInRhcmdldCIsImlzQ2hlY2tlZCIsInNldEF1dG9TaG90Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFFQUMsRUFBQUEsS0FYSyxtQkFXRyxDQUVQLENBYkk7QUFlTDtBQUNBQyxFQUFBQSxPQWhCSyxtQkFnQkdDLEtBaEJILEVBZ0JVQyxlQWhCVixFQWdCMkI7QUFDNUIsUUFBSUMsUUFBUSxHQUFHQyxNQUFNLENBQUNDLFFBQXRCOztBQUNBLFFBQUlILGVBQWUsQ0FBQ0ksT0FBaEIsQ0FBd0IsS0FBeEIsS0FBa0MsQ0FBdEMsRUFBeUMsQ0FDckM7QUFDSCxLQUZELE1BRU8sSUFBSUosZUFBZSxDQUFDSSxPQUFoQixDQUF3QixRQUF4QixLQUFxQyxDQUF6QyxFQUE0QyxDQUMvQztBQUNILEtBRk0sTUFFQTtBQUNIQyxNQUFBQSxVQUFVLENBQUMsT0FBRCxDQUFWO0FBQ0g7O0FBRUQsWUFBUUwsZUFBUjtBQUNJLFdBQUssT0FBTDtBQUNJO0FBQ0EsWUFBSU0sR0FBRyxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCQyxVQUFqQzs7QUFDQSxZQUFJRixHQUFHLENBQUNHLFVBQVIsRUFBb0I7QUFDaEJILFVBQUFBLEdBQUcsQ0FBQ0csVUFBSixDQUFlQyxVQUFmO0FBQ0gsU0FGRCxNQUVPO0FBQ0hqQixVQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlDLFNBQVosQ0FBc0IsV0FBdEI7QUFDSDs7QUFDRDs7QUFDSixXQUFLLE1BQUw7QUFDSW5CLFFBQUFBLEVBQUUsQ0FBQ29CLElBQUgsQ0FBUSxrQkFBUixFQUE0QkMsTUFBNUIsR0FBcUMsSUFBckM7QUFDQTs7QUFDSixXQUFLLFdBQUw7QUFDSXJCLFFBQUFBLEVBQUUsQ0FBQ29CLElBQUgsQ0FBUSxrQkFBUixFQUE0QkMsTUFBNUIsR0FBcUMsS0FBckM7QUFDQTs7QUFDSixXQUFLLGFBQUw7QUFDSWIsUUFBQUEsUUFBUSxDQUFDYyxXQUFUO0FBQ0E7O0FBQ0osV0FBSyxNQUFMO0FBQ0lkLFFBQUFBLFFBQVEsQ0FBQ2UsSUFBVCxDQUFjQyxjQUFkLENBQTZCLE1BQTdCLEVBQXFDSCxNQUFyQyxHQUE4QyxJQUE5QztBQUNBOztBQUNKLFdBQUssV0FBTDtBQUNJYixRQUFBQSxRQUFRLENBQUNlLElBQVQsQ0FBY0MsY0FBZCxDQUE2QixNQUE3QixFQUFxQ0gsTUFBckMsR0FBOEMsS0FBOUM7QUFDQTs7QUFDSixXQUFLLFNBQUw7QUFDSXJCLFFBQUFBLEVBQUUsQ0FBQ29CLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsSUFBeEM7QUFDQTs7QUFDSixXQUFLLGNBQUw7QUFDSXJCLFFBQUFBLEVBQUUsQ0FBQ29CLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsS0FBeEM7QUFDQTs7QUFDSixXQUFLLFVBQUw7QUFDSWIsUUFBQUEsUUFBUSxDQUFDaUIsUUFBVDtBQUNBOztBQUNKLFdBQUssVUFBTDtBQUNJakIsUUFBQUEsUUFBUSxDQUFDa0IsUUFBVDtBQUNBOztBQUNKLFdBQUssU0FBTDtBQUNJbEIsUUFBQUEsUUFBUSxDQUFDbUIsVUFBVCxDQUFvQixDQUFwQjtBQUNBOztBQUNKLFdBQUssU0FBTDtBQUNJbkIsUUFBQUEsUUFBUSxDQUFDbUIsVUFBVCxDQUFvQixDQUFwQjtBQUNBOztBQUNKLFdBQUssVUFBTDtBQUNJbkIsUUFBQUEsUUFBUSxDQUFDb0IsYUFBVCxDQUF1QixDQUF2QjtBQUNBaEIsUUFBQUEsVUFBVSxDQUFDLGFBQUQsQ0FBVjtBQUNBOztBQUNKLFdBQUssYUFBTDtBQUNJSixRQUFBQSxRQUFRLENBQUNvQixhQUFULENBQXVCLENBQUMsQ0FBeEI7QUFDQWhCLFFBQUFBLFVBQVUsQ0FBQyxXQUFELENBQVY7QUFDQTtBQWxEUjtBQXFESCxHQS9FSTtBQWlGTGlCLEVBQUFBLGFBakZLLHlCQWlGU0MsTUFqRlQsRUFpRmlCdkIsZUFqRmpCLEVBaUZrQztBQUNuQyxRQUFJQyxRQUFRLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBdEI7QUFDQW9CLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjVixNQUFkLEdBQXVCLENBQUNTLE1BQU0sQ0FBQ0UsU0FBL0I7O0FBQ0EsUUFBSXpCLGVBQWUsSUFBSSxVQUF2QixFQUFtQztBQUMvQkMsTUFBQUEsUUFBUSxDQUFDeUIsV0FBVCxDQUFxQkgsTUFBTSxDQUFDRSxTQUE1QjtBQUNIO0FBQ0o7QUF2RkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG4gICAgb25DbGljayhldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHdpbmRvdy5maXNoX2lucztcbiAgICAgICAgaWYgKGN1c3RvbUV2ZW50RGF0YS5pbmRleE9mKCdiZXQnKSA9PSAwKSB7XG4gICAgICAgICAgICAvL1xuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUV2ZW50RGF0YS5pbmRleE9mKCdidWxsZXQnKSA9PSAwKSB7XG4gICAgICAgICAgICAvL1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheUVmZmVjdCgnQ2xpY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoY3VzdG9tRXZlbnREYXRhKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcbiAgICAgICAgICAgICAgICAvL3ZhciBsb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XG4gICAgICAgICAgICAgICAgdmFyIGlucyA9IHJlcXVpcmUoXCJGaXNoTmV0V29ya1wiKS5nZXRJbnN0YW50O1xuICAgICAgICAgICAgICAgIGlmIChpbnMuZmlzaFNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICBpbnMuZmlzaFNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJleGl0XCI6XG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9leGl0UGFuZWxcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZUV4aXRcIjpcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL2V4aXRQYW5lbFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0X3N3aXRjaFwiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLnN3aXRjaF9sZWZ0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaW5mb1wiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZWxwXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VpbmZvXCI6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhlbHBcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2V0dGluZ1wiOlxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvc2V0dGluZ1BhbmVsXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VTZXR0aW5nXCI6XG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9zZXR0aW5nUGFuZWxcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2V0TXVzaWNcIjpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5zZXRNdXNpYygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNldFNvdW5kXCI6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0U291bmQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJza2lsbF8wXCI6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FzdF9za2lsbCgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJza2lsbF8xXCI6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FzdF9za2lsbCgyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidWxsZXR1cFwiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmJ1bGxldF9jaGFuZ2UoMSk7XG4gICAgICAgICAgICAgICAgcGxheUVmZmVjdCgnYnVsbGV0X2Rvd24nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidWxsZXRfZG93blwiOlxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmJ1bGxldF9jaGFuZ2UoLTEpO1xuICAgICAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2J1bGxldF91cCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgb25Ub2dnbGVDbGljayh0b2dnbGUsIGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSB3aW5kb3cuZmlzaF9pbnM7XG4gICAgICAgIHRvZ2dsZS50YXJnZXQuYWN0aXZlID0gIXRvZ2dsZS5pc0NoZWNrZWQ7XG4gICAgICAgIGlmIChjdXN0b21FdmVudERhdGEgPT0gXCJBdXRvU2hvdFwiKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZXRBdXRvU2hvdCh0b2dnbGUuaXNDaGVja2VkKTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG4iXX0=