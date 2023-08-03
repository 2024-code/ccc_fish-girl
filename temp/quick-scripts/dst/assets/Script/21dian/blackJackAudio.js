
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/21dian/blackJackAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c6724C+yuZBW4VlamB3jJLE', 'blackJackAudio');
// Script/21dian/blackJackAudio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {
    cc.audioEngine.stopAll();
    this.playBgm();
  },
  stopAudio: function stopAudio() {
    cc.audioEngine.stopAll();
  },
  playBgm: function playBgm() {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.stopMusic();
    cc.audioEngine.playMusic(this.bgmAudio, true);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFwyMWRpYW5cXGJsYWNrSmFja0F1ZGlvLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmdtQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwicEluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInN0YXJ0IiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwicGxheUJnbSIsInN0b3BBdWRpbyIsIm11c2ljQ29udHJvbCIsInN0b3BNdXNpYyIsInBsYXlNdXNpYyIsInBsYXlFZiIsImNsaXAiLCJzb3VuZEVmZmVjdENvbnRyb2wiLCJwbGF5RWZmZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ05DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURIO0FBRU4saUJBQVM7QUFGSDtBQURGLEdBSFA7QUFXTEMsRUFBQUEsTUFYSyxvQkFXSTtBQUNMLFNBQUtDLEtBQUwsR0FBYUMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBbkM7QUFDSCxHQWJJO0FBZUxDLEVBQUFBLEtBZkssbUJBZUc7QUFDSlgsSUFBQUEsRUFBRSxDQUFDWSxXQUFILENBQWVDLE9BQWY7QUFDQSxTQUFLQyxPQUFMO0FBQ0gsR0FsQkk7QUFvQkxDLEVBQUFBLFNBcEJLLHVCQW9CTztBQUNSZixJQUFBQSxFQUFFLENBQUNZLFdBQUgsQ0FBZUMsT0FBZjtBQUNILEdBdEJJO0FBd0JMQyxFQUFBQSxPQXhCSyxxQkF3Qks7QUFDTixRQUFJLEtBQUtOLEtBQUwsQ0FBV1EsWUFBWCxJQUEyQixDQUEvQixFQUFrQztBQUM5QjtBQUNIOztBQUNEaEIsSUFBQUEsRUFBRSxDQUFDWSxXQUFILENBQWVLLFNBQWY7QUFDQWpCLElBQUFBLEVBQUUsQ0FBQ1ksV0FBSCxDQUFlTSxTQUFmLENBQXlCLEtBQUtkLFFBQTlCLEVBQXdDLElBQXhDO0FBQ0gsR0E5Qkk7QUFnQ0xlLEVBQUFBLE1BaENLLGtCQWdDRUMsSUFoQ0YsRUFnQ1E7QUFDVCxRQUFJLEtBQUtaLEtBQUwsQ0FBV2Esa0JBQVgsSUFBaUMsQ0FBckMsRUFBd0M7QUFDcEM7QUFDSDs7QUFDRHJCLElBQUFBLEVBQUUsQ0FBQ1ksV0FBSCxDQUFlVSxVQUFmLENBQTBCRixJQUExQjtBQUNIO0FBckNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmdtQXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wSW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICB0aGlzLnBsYXlCZ20oKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEF1ZGlvKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJnbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5tdXNpY0NvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbUF1ZGlvLCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUVmKGNsaXApIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCk7XHJcbiAgICB9LFxyXG59KSJdfQ==