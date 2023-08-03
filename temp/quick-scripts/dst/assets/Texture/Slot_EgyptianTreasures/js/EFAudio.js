
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_EgyptianTreasures/js/EFAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '891896OzY9OqIK2J4BRrXZL', 'EFAudio');
// Texture/Slot_EgyptianTreasures/js/EFAudio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": []
    },
    stopWheel: {
      type: cc.AudioClip,
      "default": null
    },
    freeWheel: {
      type: cc.AudioClip,
      "default": null
    },
    free: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {
    cc.audioEngine.stopAll();
    this.playBgm(0);
  },
  stopAudio: function stopAudio() {
    cc.audioEngine.stopAll();
  },
  playBgm: function playBgm(id) {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.stopMusic();
    cc.audioEngine.playMusic(this.bgmAudio[id], true);
  },
  playStopWheel: function playStopWheel() {
    this.playEf(this.stopWheel);
  },
  playFreeWheel: function playFreeWheel() {
    this.playEf(this.freeWheel);
  },
  playFree: function playFree() {
    this.playEf(this.free);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9FZ3lwdGlhblRyZWFzdXJlc1xcanNcXEVGQXVkaW8uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiZ21BdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJzdG9wV2hlZWwiLCJmcmVlV2hlZWwiLCJmcmVlIiwib25Mb2FkIiwicEluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInN0YXJ0IiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwicGxheUJnbSIsInN0b3BBdWRpbyIsImlkIiwibXVzaWNDb250cm9sIiwic3RvcE11c2ljIiwicGxheU11c2ljIiwicGxheVN0b3BXaGVlbCIsInBsYXlFZiIsInBsYXlGcmVlV2hlZWwiLCJwbGF5RnJlZSIsImNsaXAiLCJzb3VuZEVmZmVjdENvbnRyb2wiLCJwbGF5RWZmZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ05DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURIO0FBRU4saUJBQVM7QUFGSCxLQURGO0FBTVJDLElBQUFBLFNBQVMsRUFBRTtBQUNQRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FERjtBQUVQLGlCQUFTO0FBRkYsS0FOSDtBQVdSRSxJQUFBQSxTQUFTLEVBQUU7QUFDUEgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREY7QUFFUCxpQkFBUztBQUZGLEtBWEg7QUFnQlJHLElBQUFBLElBQUksRUFBRTtBQUNGSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FEUDtBQUVGLGlCQUFTO0FBRlA7QUFoQkUsR0FIUDtBQXlCTEksRUFBQUEsTUF6Qkssb0JBeUJJO0FBQ0wsU0FBS0MsS0FBTCxHQUFhQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUFuQztBQUNILEdBM0JJO0FBNkJMQyxFQUFBQSxLQTdCSyxtQkE2Qkc7QUFDSmQsSUFBQUEsRUFBRSxDQUFDZSxXQUFILENBQWVDLE9BQWY7QUFDQSxTQUFLQyxPQUFMLENBQWEsQ0FBYjtBQUNILEdBaENJO0FBa0NMQyxFQUFBQSxTQWxDSyx1QkFrQ087QUFDUmxCLElBQUFBLEVBQUUsQ0FBQ2UsV0FBSCxDQUFlQyxPQUFmO0FBQ0gsR0FwQ0k7QUFzQ0xDLEVBQUFBLE9BdENLLG1CQXNDR0UsRUF0Q0gsRUFzQ087QUFDUixRQUFJLEtBQUtSLEtBQUwsQ0FBV1MsWUFBWCxJQUEyQixDQUEvQixFQUFrQztBQUM5QjtBQUNIOztBQUNEcEIsSUFBQUEsRUFBRSxDQUFDZSxXQUFILENBQWVNLFNBQWY7QUFDQXJCLElBQUFBLEVBQUUsQ0FBQ2UsV0FBSCxDQUFlTyxTQUFmLENBQXlCLEtBQUtsQixRQUFMLENBQWNlLEVBQWQsQ0FBekIsRUFBNEMsSUFBNUM7QUFDSCxHQTVDSTtBQThDTEksRUFBQUEsYUE5Q0ssMkJBOENXO0FBQ1osU0FBS0MsTUFBTCxDQUFZLEtBQUtqQixTQUFqQjtBQUNILEdBaERJO0FBa0RMa0IsRUFBQUEsYUFsREssMkJBa0RXO0FBQ1osU0FBS0QsTUFBTCxDQUFZLEtBQUtoQixTQUFqQjtBQUNILEdBcERJO0FBc0RMa0IsRUFBQUEsUUF0REssc0JBc0RNO0FBQ1AsU0FBS0YsTUFBTCxDQUFZLEtBQUtmLElBQWpCO0FBQ0gsR0F4REk7QUEwRExlLEVBQUFBLE1BMURLLGtCQTBERUcsSUExREYsRUEwRFE7QUFDVCxRQUFJLEtBQUtoQixLQUFMLENBQVdpQixrQkFBWCxJQUFpQyxDQUFyQyxFQUF3QztBQUNwQztBQUNIOztBQUNENUIsSUFBQUEsRUFBRSxDQUFDZSxXQUFILENBQWVjLFVBQWYsQ0FBMEJGLElBQTFCO0FBQ0g7QUEvREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBiZ21BdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BXaGVlbDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVdoZWVsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wSW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICB0aGlzLnBsYXlCZ20oMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BBdWRpbygpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlCZ20oaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5tdXNpY0NvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbUF1ZGlvW2lkXSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlTdG9wV2hlZWwoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy5zdG9wV2hlZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5RnJlZVdoZWVsKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuZnJlZVdoZWVsKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUZyZWUoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy5mcmVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUVmKGNsaXApIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCk7XHJcbiAgICB9XHJcbn0pIl19