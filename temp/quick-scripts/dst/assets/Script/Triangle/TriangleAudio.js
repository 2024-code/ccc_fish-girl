
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Triangle/TriangleAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '052edv7W3pBabCvLt9LOFmM', 'TriangleAudio');
// Script/Triangle/TriangleAudio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": null
    },
    flyInAudio: {
      type: cc.AudioClip,
      "default": null
    },
    buttonAudio: {
      type: cc.AudioClip,
      "default": null
    },
    delAudio: {
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
  },
  playBtnEf: function playBtnEf() {
    this.playEf(this.buttonAudio);
  },
  playFlyInEf: function playFlyInEf() {
    this.playEf(this.flyInAudio);
  },
  playDelEf: function playDelEf() {
    this.playEf(this.delAudio);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxUcmlhbmdsZVxcVHJpYW5nbGVBdWRpby5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJnbUF1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsImZseUluQXVkaW8iLCJidXR0b25BdWRpbyIsImRlbEF1ZGlvIiwib25Mb2FkIiwicEluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInN0YXJ0IiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwicGxheUJnbSIsInN0b3BBdWRpbyIsIm11c2ljQ29udHJvbCIsInN0b3BNdXNpYyIsInBsYXlNdXNpYyIsInBsYXlFZiIsImNsaXAiLCJzb3VuZEVmZmVjdENvbnRyb2wiLCJwbGF5RWZmZWN0IiwicGxheUJ0bkVmIiwicGxheUZseUluRWYiLCJwbGF5RGVsRWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREg7QUFFTixpQkFBUztBQUZILEtBREY7QUFNUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQUREO0FBRVIsaUJBQVM7QUFGRCxLQU5KO0FBV1JFLElBQUFBLFdBQVcsRUFBRTtBQUNUSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FEQTtBQUVULGlCQUFTO0FBRkEsS0FYTDtBQWdCUkcsSUFBQUEsUUFBUSxFQUFFO0FBQ05KLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURIO0FBRU4saUJBQVM7QUFGSDtBQWhCRixHQUhQO0FBMEJMSSxFQUFBQSxNQTFCSyxvQkEwQkk7QUFDTCxTQUFLQyxLQUFMLEdBQWFDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQW5DO0FBQ0gsR0E1Qkk7QUE4QkxDLEVBQUFBLEtBOUJLLG1CQThCRztBQUNKZCxJQUFBQSxFQUFFLENBQUNlLFdBQUgsQ0FBZUMsT0FBZjtBQUNBLFNBQUtDLE9BQUw7QUFDSCxHQWpDSTtBQW1DTEMsRUFBQUEsU0FuQ0ssdUJBbUNPO0FBQ1JsQixJQUFBQSxFQUFFLENBQUNlLFdBQUgsQ0FBZUMsT0FBZjtBQUNILEdBckNJO0FBdUNMQyxFQUFBQSxPQXZDSyxxQkF1Q0s7QUFDTixRQUFJLEtBQUtOLEtBQUwsQ0FBV1EsWUFBWCxJQUEyQixDQUEvQixFQUFrQztBQUM5QjtBQUNIOztBQUNEbkIsSUFBQUEsRUFBRSxDQUFDZSxXQUFILENBQWVLLFNBQWY7QUFDQXBCLElBQUFBLEVBQUUsQ0FBQ2UsV0FBSCxDQUFlTSxTQUFmLENBQXlCLEtBQUtqQixRQUE5QixFQUF3QyxJQUF4QztBQUNILEdBN0NJO0FBK0NMa0IsRUFBQUEsTUEvQ0ssa0JBK0NFQyxJQS9DRixFQStDUTtBQUNULFFBQUksS0FBS1osS0FBTCxDQUFXYSxrQkFBWCxJQUFpQyxDQUFyQyxFQUF3QztBQUNwQztBQUNIOztBQUNEeEIsSUFBQUEsRUFBRSxDQUFDZSxXQUFILENBQWVVLFVBQWYsQ0FBMEJGLElBQTFCO0FBQ0gsR0FwREk7QUFzRExHLEVBQUFBLFNBdERLLHVCQXNETTtBQUNQLFNBQUtKLE1BQUwsQ0FBWSxLQUFLZCxXQUFqQjtBQUNILEdBeERJO0FBMERMbUIsRUFBQUEsV0ExREsseUJBMERRO0FBQ1QsU0FBS0wsTUFBTCxDQUFZLEtBQUtmLFVBQWpCO0FBQ0gsR0E1REk7QUE4RExxQixFQUFBQSxTQTlESyx1QkE4RE07QUFDUCxTQUFLTixNQUFMLENBQVksS0FBS2IsUUFBakI7QUFDSDtBQWhFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJnbUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmbHlJbkF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidXR0b25BdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsQXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wSW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICB0aGlzLnBsYXlCZ20oKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEF1ZGlvKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJnbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5tdXNpY0NvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbUF1ZGlvLCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUVmKGNsaXApIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlCdG5FZigpe1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuYnV0dG9uQXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5Rmx5SW5FZigpe1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuZmx5SW5BdWRpbyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlEZWxFZigpe1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuZGVsQXVkaW8pO1xyXG4gICAgfSxcclxufSkiXX0=