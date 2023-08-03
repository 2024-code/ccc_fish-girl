
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Xiyouji/js/XYJAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ad847udBcVCl5NpK9o0nY+5', 'XYJAudio');
// Texture/Slot_Xiyouji/js/XYJAudio.js

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
    bigWinEf: {
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
  playBW: function playBW() {
    this.playEf(this.bigWinEf);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9YaXlvdWppXFxqc1xcWFlKQXVkaW8uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiZ21BdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJzdG9wV2hlZWwiLCJiaWdXaW5FZiIsIm9uTG9hZCIsInBJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJzdGFydCIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsInBsYXlCZ20iLCJzdG9wQXVkaW8iLCJpZCIsIm11c2ljQ29udHJvbCIsInN0b3BNdXNpYyIsInBsYXlNdXNpYyIsInBsYXlTdG9wV2hlZWwiLCJwbGF5RWYiLCJwbGF5QlciLCJjbGlwIiwic291bmRFZmZlY3RDb250cm9sIiwicGxheUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNOQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkgsS0FERjtBQU1SQyxJQUFBQSxTQUFTLEVBQUU7QUFDUEYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREY7QUFFUCxpQkFBUztBQUZGLEtBTkg7QUFXUkUsSUFBQUEsUUFBUSxFQUFFO0FBQ05ILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURIO0FBRU4saUJBQVM7QUFGSDtBQVhGLEdBSFA7QUFvQkxHLEVBQUFBLE1BcEJLLG9CQW9CSTtBQUNMLFNBQUtDLEtBQUwsR0FBYUMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBbkM7QUFDSCxHQXRCSTtBQXdCTEMsRUFBQUEsS0F4QkssbUJBd0JHO0FBQ0piLElBQUFBLEVBQUUsQ0FBQ2MsV0FBSCxDQUFlQyxPQUFmO0FBQ0EsU0FBS0MsT0FBTCxDQUFhLENBQWI7QUFDSCxHQTNCSTtBQTZCTEMsRUFBQUEsU0E3QkssdUJBNkJPO0FBQ1JqQixJQUFBQSxFQUFFLENBQUNjLFdBQUgsQ0FBZUMsT0FBZjtBQUNILEdBL0JJO0FBaUNMQyxFQUFBQSxPQWpDSyxtQkFpQ0dFLEVBakNILEVBaUNPO0FBQ1IsUUFBSSxLQUFLUixLQUFMLENBQVdTLFlBQVgsSUFBMkIsQ0FBL0IsRUFBa0M7QUFDOUI7QUFDSDs7QUFDRG5CLElBQUFBLEVBQUUsQ0FBQ2MsV0FBSCxDQUFlTSxTQUFmO0FBQ0FwQixJQUFBQSxFQUFFLENBQUNjLFdBQUgsQ0FBZU8sU0FBZixDQUF5QixLQUFLakIsUUFBTCxDQUFjYyxFQUFkLENBQXpCLEVBQTRDLElBQTVDO0FBQ0gsR0F2Q0k7QUF5Q0xJLEVBQUFBLGFBekNLLDJCQXlDVztBQUNaLFNBQUtDLE1BQUwsQ0FBWSxLQUFLaEIsU0FBakI7QUFDSCxHQTNDSTtBQTZDTGlCLEVBQUFBLE1BN0NLLG9CQTZDSTtBQUNMLFNBQUtELE1BQUwsQ0FBWSxLQUFLZixRQUFqQjtBQUNILEdBL0NJO0FBaURMZSxFQUFBQSxNQWpESyxrQkFpREVFLElBakRGLEVBaURRO0FBQ1QsUUFBSSxLQUFLZixLQUFMLENBQVdnQixrQkFBWCxJQUFpQyxDQUFyQyxFQUF3QztBQUNwQztBQUNIOztBQUNEMUIsSUFBQUEsRUFBRSxDQUFDYyxXQUFILENBQWVhLFVBQWYsQ0FBMEJGLElBQTFCO0FBQ0g7QUF0REksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBiZ21BdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BXaGVlbDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luRWY6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5QmdtKDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wQXVkaW8oKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5QmdtKGlkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8ubXVzaWNDb250cm9sID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iZ21BdWRpb1tpZF0sIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5U3RvcFdoZWVsKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuc3RvcFdoZWVsKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJXKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuYmlnV2luRWYpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5RWYoY2xpcCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChjbGlwKTtcclxuICAgIH0sXHJcbn0pIl19