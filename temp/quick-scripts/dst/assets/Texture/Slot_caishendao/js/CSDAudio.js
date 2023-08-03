
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_caishendao/js/CSDAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2b510AecERIWKU/5KpI9meC', 'CSDAudio');
// Texture/Slot_caishendao/js/CSDAudio.js

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
    closeDoor: {
      type: cc.AudioClip,
      "default": null
    },
    showCS: {
      type: cc.AudioClip,
      "default": null
    },
    freeAudio: {
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
  playCloseDoor: function playCloseDoor() {
    this.playEf(this.closeDoor);
  },
  playCs: function playCs() {
    this.playEf(this.showCS);
  },
  playFree: function playFree() {
    this.playEf(this.freeAudio);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9jYWlzaGVuZGFvXFxqc1xcQ1NEQXVkaW8uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiZ21BdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJzdG9wV2hlZWwiLCJjbG9zZURvb3IiLCJzaG93Q1MiLCJmcmVlQXVkaW8iLCJiaWdXaW5FZiIsIm9uTG9hZCIsInBJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJzdGFydCIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsInBsYXlCZ20iLCJzdG9wQXVkaW8iLCJpZCIsIm11c2ljQ29udHJvbCIsInN0b3BNdXNpYyIsInBsYXlNdXNpYyIsInBsYXlTdG9wV2hlZWwiLCJwbGF5RWYiLCJwbGF5Q2xvc2VEb29yIiwicGxheUNzIiwicGxheUZyZWUiLCJwbGF5QlciLCJjbGlwIiwic291bmRFZmZlY3RDb250cm9sIiwicGxheUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNOQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkgsS0FERjtBQU1SQyxJQUFBQSxTQUFTLEVBQUU7QUFDUEYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREY7QUFFUCxpQkFBUztBQUZGLEtBTkg7QUFXUkUsSUFBQUEsU0FBUyxFQUFFO0FBQ1BILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURGO0FBRVAsaUJBQVM7QUFGRixLQVhIO0FBZ0JSRyxJQUFBQSxNQUFNLEVBQUU7QUFDSkosTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREw7QUFFSixpQkFBUztBQUZMLEtBaEJBO0FBcUJSSSxJQUFBQSxTQUFTLEVBQUU7QUFDUEwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREY7QUFFUCxpQkFBUztBQUZGLEtBckJIO0FBMEJSSyxJQUFBQSxRQUFRLEVBQUU7QUFDTk4sTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREg7QUFFTixpQkFBUztBQUZIO0FBMUJGLEdBSFA7QUFtQ0xNLEVBQUFBLE1BbkNLLG9CQW1DSTtBQUNMLFNBQUtDLEtBQUwsR0FBYUMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBbkM7QUFDSCxHQXJDSTtBQXVDTEMsRUFBQUEsS0F2Q0ssbUJBdUNHO0FBQ0poQixJQUFBQSxFQUFFLENBQUNpQixXQUFILENBQWVDLE9BQWY7QUFDQSxTQUFLQyxPQUFMLENBQWEsQ0FBYjtBQUNILEdBMUNJO0FBNENMQyxFQUFBQSxTQTVDSyx1QkE0Q007QUFDUHBCLElBQUFBLEVBQUUsQ0FBQ2lCLFdBQUgsQ0FBZUMsT0FBZjtBQUNILEdBOUNJO0FBZ0RMQyxFQUFBQSxPQWhESyxtQkFnREdFLEVBaERILEVBZ0RPO0FBQ1IsUUFBSSxLQUFLUixLQUFMLENBQVdTLFlBQVgsSUFBMkIsQ0FBL0IsRUFBa0M7QUFDOUI7QUFDSDs7QUFDRHRCLElBQUFBLEVBQUUsQ0FBQ2lCLFdBQUgsQ0FBZU0sU0FBZjtBQUNBdkIsSUFBQUEsRUFBRSxDQUFDaUIsV0FBSCxDQUFlTyxTQUFmLENBQXlCLEtBQUtwQixRQUFMLENBQWNpQixFQUFkLENBQXpCLEVBQTRDLElBQTVDO0FBQ0gsR0F0REk7QUF3RExJLEVBQUFBLGFBeERLLDJCQXdEVztBQUNaLFNBQUtDLE1BQUwsQ0FBWSxLQUFLbkIsU0FBakI7QUFDSCxHQTFESTtBQTRETG9CLEVBQUFBLGFBNURLLDJCQTREVztBQUNaLFNBQUtELE1BQUwsQ0FBWSxLQUFLbEIsU0FBakI7QUFDSCxHQTlESTtBQWdFTG9CLEVBQUFBLE1BaEVLLG9CQWdFSTtBQUNMLFNBQUtGLE1BQUwsQ0FBWSxLQUFLakIsTUFBakI7QUFDSCxHQWxFSTtBQW9FTG9CLEVBQUFBLFFBcEVLLHNCQW9FTTtBQUNQLFNBQUtILE1BQUwsQ0FBWSxLQUFLaEIsU0FBakI7QUFDSCxHQXRFSTtBQXdFTG9CLEVBQUFBLE1BeEVLLG9CQXdFRztBQUNKLFNBQUtKLE1BQUwsQ0FBWSxLQUFLZixRQUFqQjtBQUNILEdBMUVJO0FBNEVMZSxFQUFBQSxNQTVFSyxrQkE0RUVLLElBNUVGLEVBNEVRO0FBQ1QsUUFBSSxLQUFLbEIsS0FBTCxDQUFXbUIsa0JBQVgsSUFBaUMsQ0FBckMsRUFBd0M7QUFDcEM7QUFDSDs7QUFDRGhDLElBQUFBLEVBQUUsQ0FBQ2lCLFdBQUgsQ0FBZWdCLFVBQWYsQ0FBMEJGLElBQTFCO0FBQ0g7QUFqRkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBiZ21BdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BXaGVlbDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VEb29yOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93Q1M6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luRWY6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5QmdtKDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wQXVkaW8oKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlCZ20oaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5tdXNpY0NvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbUF1ZGlvW2lkXSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlTdG9wV2hlZWwoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy5zdG9wV2hlZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5Q2xvc2VEb29yKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuY2xvc2VEb29yKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUNzKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuc2hvd0NTKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUZyZWUoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy5mcmVlQXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5QlcoKXtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmJpZ1dpbkVmKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUVmKGNsaXApIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCk7XHJcbiAgICB9XHJcbn0pIl19