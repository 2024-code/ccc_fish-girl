
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/game_saima/sm_Audio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5ad18Q1mUpDZ7vV8J1BtzN/', 'sm_Audio');
// Texture/game_saima/sm_Audio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    roleAudio: {
      type: cc.AudioClip,
      "default": []
    },
    bgmAudio: {
      type: cc.AudioClip,
      "default": []
    },
    betAudio: {
      type: cc.AudioClip,
      "default": null
    },
    buttonAudio: {
      type: cc.AudioClip,
      "default": null
    },
    startBetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    dingAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameMain = null;
    this.wheelId = 0;
    this.pInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {
    cc.audioEngine.stopAll();
    this.playBgm(0);
  },
  playBgm: function playBgm(id) {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.stopMusic();
    cc.audioEngine.playMusic(this.bgmAudio[id], true);
  },
  playBet: function playBet() {
    this.playEf(this.betAudio);
  },
  playButton: function playButton() {
    this.playEf(this.buttonAudio);
  },
  playStartBet: function playStartBet() {
    this.playEf(this.startBetAudio);
  },
  playDingAudio: function playDingAudio() {
    this.playEf(this.dingAudio);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcZ2FtZV9zYWltYVxcc21fQXVkaW8uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwiYmdtQXVkaW8iLCJiZXRBdWRpbyIsImJ1dHRvbkF1ZGlvIiwic3RhcnRCZXRBdWRpbyIsImRpbmdBdWRpbyIsIm9uTG9hZCIsImdhbWVNYWluIiwid2hlZWxJZCIsInBJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJzdGFydCIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsInBsYXlCZ20iLCJpZCIsIm11c2ljQ29udHJvbCIsInN0b3BNdXNpYyIsInBsYXlNdXNpYyIsInBsYXlCZXQiLCJwbGF5RWYiLCJwbGF5QnV0dG9uIiwicGxheVN0YXJ0QmV0IiwicGxheURpbmdBdWRpbyIsImNsaXAiLCJzb3VuZEVmZmVjdENvbnRyb2wiLCJwbGF5RWZmZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURGO0FBRVAsaUJBQVM7QUFGRixLQURIO0FBS1JDLElBQUFBLFFBQVEsRUFBRTtBQUNORixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkgsS0FMRjtBQVNSRSxJQUFBQSxRQUFRLEVBQUU7QUFDTkgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREg7QUFFTixpQkFBUztBQUZILEtBVEY7QUFhUkcsSUFBQUEsV0FBVyxFQUFFO0FBQ1RKLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURBO0FBRVQsaUJBQVM7QUFGQSxLQWJMO0FBaUJSSSxJQUFBQSxhQUFhLEVBQUU7QUFDWEwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREU7QUFFWCxpQkFBUztBQUZFLEtBakJQO0FBcUJSSyxJQUFBQSxTQUFTLEVBQUU7QUFDUE4sTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREY7QUFFUCxpQkFBUztBQUZGO0FBckJILEdBSFA7QUE4QkxNLEVBQUFBLE1BOUJLLG9CQThCSTtBQUNMLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLFNBQUtDLEtBQUwsR0FBYUMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBbkM7QUFDSCxHQWxDSTtBQW9DTEMsRUFBQUEsS0FwQ0ssbUJBb0NHO0FBQ0psQixJQUFBQSxFQUFFLENBQUNtQixXQUFILENBQWVDLE9BQWY7QUFDQSxTQUFLQyxPQUFMLENBQWEsQ0FBYjtBQUNILEdBdkNJO0FBeUNMQSxFQUFBQSxPQXpDSyxtQkF5Q0dDLEVBekNILEVBeUNPO0FBQ1IsUUFBSSxLQUFLUCxLQUFMLENBQVdRLFlBQVgsSUFBMkIsQ0FBL0IsRUFBa0M7QUFDOUI7QUFDSDs7QUFDRHZCLElBQUFBLEVBQUUsQ0FBQ21CLFdBQUgsQ0FBZUssU0FBZjtBQUNBeEIsSUFBQUEsRUFBRSxDQUFDbUIsV0FBSCxDQUFlTSxTQUFmLENBQXlCLEtBQUtsQixRQUFMLENBQWNlLEVBQWQsQ0FBekIsRUFBNEMsSUFBNUM7QUFDSCxHQS9DSTtBQWlETEksRUFBQUEsT0FqREsscUJBaURLO0FBQ04sU0FBS0MsTUFBTCxDQUFZLEtBQUtuQixRQUFqQjtBQUNILEdBbkRJO0FBcURMb0IsRUFBQUEsVUFyREssd0JBcURRO0FBQ1QsU0FBS0QsTUFBTCxDQUFZLEtBQUtsQixXQUFqQjtBQUNILEdBdkRJO0FBeURMb0IsRUFBQUEsWUF6REssMEJBeURVO0FBQ1gsU0FBS0YsTUFBTCxDQUFZLEtBQUtqQixhQUFqQjtBQUNILEdBM0RJO0FBNkRMb0IsRUFBQUEsYUE3REssMkJBNkRXO0FBQ1osU0FBS0gsTUFBTCxDQUFZLEtBQUtoQixTQUFqQjtBQUNILEdBL0RJO0FBaUVMZ0IsRUFBQUEsTUFqRUssa0JBaUVFSSxJQWpFRixFQWlFUTtBQUNULFFBQUksS0FBS2hCLEtBQUwsQ0FBV2lCLGtCQUFYLElBQWlDLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0g7O0FBQ0RoQyxJQUFBQSxFQUFFLENBQUNtQixXQUFILENBQWVjLFVBQWYsQ0FBMEJGLElBQTFCO0FBQ0g7QUF0RUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICByb2xlQXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJnbUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZXRBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidXR0b25BdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydEJldEF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpbmdBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFpbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy53aGVlbElkID0gMDtcclxuICAgICAgICB0aGlzLnBJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgIHRoaXMucGxheUJnbSgwKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJnbShpZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBJbmZvLm11c2ljQ29udHJvbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMuYmdtQXVkaW9baWRdLCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJldCgpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmJldEF1ZGlvKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJ1dHRvbigpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmJ1dHRvbkF1ZGlvKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheVN0YXJ0QmV0KCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuc3RhcnRCZXRBdWRpbyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlEaW5nQXVkaW8oKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy5kaW5nQXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5RWYoY2xpcCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChjbGlwKTtcclxuICAgIH1cclxufSkiXX0=