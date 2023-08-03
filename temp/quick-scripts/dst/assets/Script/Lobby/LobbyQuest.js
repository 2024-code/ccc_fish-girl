
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/LobbyQuest.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '17e6euWaWRO2JiYVOuR26QC', 'LobbyQuest');
// Script/Lobby/LobbyQuest.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    questScroll: cc.ScrollView
  },
  onLoad: function onLoad() {
    this.netWork = require("LobbyNetWork");
  },
  start: function start() {},
  getEveryLoginPrice: function getEveryLoginPrice(data) {
    this.questScroll.content.children[0].getComponent("questItem").setView(data);
  },
  updatePanel: function updatePanel(data) {
    this.questScroll.content.children[0].getComponent("questItem").setView(data);
  },
  //通用关闭界面
  onBtnClick_closePanel: function onBtnClick_closePanel(event) {
    //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
    event.target.parent.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlRdWVzdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInF1ZXN0U2Nyb2xsIiwiU2Nyb2xsVmlldyIsIm9uTG9hZCIsIm5ldFdvcmsiLCJyZXF1aXJlIiwic3RhcnQiLCJnZXRFdmVyeUxvZ2luUHJpY2UiLCJkYXRhIiwiY29udGVudCIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50Iiwic2V0VmlldyIsInVwZGF0ZVBhbmVsIiwib25CdG5DbGlja19jbG9zZVBhbmVsIiwiZXZlbnQiLCJ0YXJnZXQiLCJwYXJlbnQiLCJhY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0s7QUFEUixHQUhQO0FBT0xDLEVBQUFBLE1BUEssb0JBT0k7QUFDTCxTQUFLQyxPQUFMLEdBQWVDLE9BQU8sQ0FBQyxjQUFELENBQXRCO0FBQ0gsR0FUSTtBQVdMQyxFQUFBQSxLQVhLLG1CQVdHLENBRVAsQ0FiSTtBQWVMQyxFQUFBQSxrQkFmSyw4QkFlY0MsSUFmZCxFQWVvQjtBQUNyQixTQUFLUCxXQUFMLENBQWlCUSxPQUFqQixDQUF5QkMsUUFBekIsQ0FBa0MsQ0FBbEMsRUFBcUNDLFlBQXJDLENBQWtELFdBQWxELEVBQStEQyxPQUEvRCxDQUF1RUosSUFBdkU7QUFDSCxHQWpCSTtBQW1CTEssRUFBQUEsV0FuQkssdUJBbUJPTCxJQW5CUCxFQW1CYTtBQUNkLFNBQUtQLFdBQUwsQ0FBaUJRLE9BQWpCLENBQXlCQyxRQUF6QixDQUFrQyxDQUFsQyxFQUFxQ0MsWUFBckMsQ0FBa0QsV0FBbEQsRUFBK0RDLE9BQS9ELENBQXVFSixJQUF2RTtBQUNILEdBckJJO0FBdUJMO0FBQ0FNLEVBQUFBLHFCQXhCSyxpQ0F3QmlCQyxLQXhCakIsRUF3QndCO0FBQ3pCO0FBQ0FBLElBQUFBLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxNQUFiLENBQW9CQyxNQUFwQixHQUE2QixLQUE3QjtBQUNIO0FBM0JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcXVlc3RTY3JvbGw6IGNjLlNjcm9sbFZpZXcsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5ldFdvcmsgPSByZXF1aXJlKFwiTG9iYnlOZXRXb3JrXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEV2ZXJ5TG9naW5QcmljZShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdFNjcm9sbC5jb250ZW50LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcInF1ZXN0SXRlbVwiKS5zZXRWaWV3KGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVQYW5lbChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdFNjcm9sbC5jb250ZW50LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcInF1ZXN0SXRlbVwiKS5zZXRWaWV3KGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+mAmueUqOWFs+mXreeVjOmdolxyXG4gICAgb25CdG5DbGlja19jbG9zZVBhbmVsKGV2ZW50KSB7XHJcbiAgICAgICAgLy/ov5nph4wgZXZlbnQg5piv5LiA5LiqIFRvdWNoIEV2ZW50IOWvueixoe+8jOS9oOWPr+S7pemAmui/hyBldmVudC50YXJnZXQg5Y+W5Yiw5LqL5Lu255qE5Y+R6YCB6IqC54K5XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=