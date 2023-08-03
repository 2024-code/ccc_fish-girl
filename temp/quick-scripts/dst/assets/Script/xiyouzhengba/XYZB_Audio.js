
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/xiyouzhengba/XYZB_Audio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b5ecp1m41HgblLyo7RGmsZ', 'XYZB_Audio');
// Script/xiyouzhengba/XYZB_Audio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    roleAudio: {
      type: cc.AudioClip,
      "default": []
    },
    wheelAudio: {
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
    clearbetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    reBetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    changeBetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    specialAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameMain = null;
    this.wheelId = 0;
    this.pInfo = require("PlayerInfo").getInstant;
  },
  stopAll: function stopAll() {
    cc.audioEngine.stopAll();
  },
  playWheel: function playWheel() {
    this.playEf(this.wheelAudio[this.wheelId]);
    this.wheelId++;

    if (this.wheelId > this.wheelAudio.length - 1) {
      this.wheelId = 0;
    }
  },
  playBet: function playBet() {
    this.playEf(this.betAudio);
  },
  playReBet: function playReBet() {
    this.playEf(this.reBetAudio);
  },
  playClearBet: function playClearBet() {
    this.playEf(this.clearbetAudio);
  },
  playChangeBet: function playChangeBet() {
    this.playEf(this.changeBetAudio);
  },
  playRoleAudio: function playRoleAudio(r) {
    this.playEf(this.roleAudio[r]);
  },
  playSpecial: function playSpecial() {
    this.playEf(this.specialAudio);
  },
  playBgm: function playBgm(id) {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.play(this.bgmAudio[id], true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx4aXlvdXpoZW5nYmFcXFhZWkJfQXVkaW8uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwid2hlZWxBdWRpbyIsImJnbUF1ZGlvIiwiYmV0QXVkaW8iLCJjbGVhcmJldEF1ZGlvIiwicmVCZXRBdWRpbyIsImNoYW5nZUJldEF1ZGlvIiwic3BlY2lhbEF1ZGlvIiwib25Mb2FkIiwiZ2FtZU1haW4iLCJ3aGVlbElkIiwicEluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInN0b3BBbGwiLCJhdWRpb0VuZ2luZSIsInBsYXlXaGVlbCIsInBsYXlFZiIsImxlbmd0aCIsInBsYXlCZXQiLCJwbGF5UmVCZXQiLCJwbGF5Q2xlYXJCZXQiLCJwbGF5Q2hhbmdlQmV0IiwicGxheVJvbGVBdWRpbyIsInIiLCJwbGF5U3BlY2lhbCIsInBsYXlCZ20iLCJpZCIsIm11c2ljQ29udHJvbCIsInBsYXkiLCJjbGlwIiwic291bmRFZmZlY3RDb250cm9sIiwicGxheUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FERjtBQUVQLGlCQUFTO0FBRkYsS0FESDtBQUtSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUkYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREQ7QUFFUixpQkFBUztBQUZELEtBTEo7QUFTUkUsSUFBQUEsUUFBUSxFQUFFO0FBQ05ILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURIO0FBRU4saUJBQVM7QUFGSCxLQVRGO0FBYVJHLElBQUFBLFFBQVEsRUFBRTtBQUNOSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkgsS0FiRjtBQWlCUkksSUFBQUEsYUFBYSxFQUFFO0FBQ1hMLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURFO0FBRVgsaUJBQVM7QUFGRSxLQWpCUDtBQXFCUkssSUFBQUEsVUFBVSxFQUFFO0FBQ1JOLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQUREO0FBRVIsaUJBQVM7QUFGRCxLQXJCSjtBQXlCUk0sSUFBQUEsY0FBYyxFQUFFO0FBQ1pQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURHO0FBRVosaUJBQVM7QUFGRyxLQXpCUjtBQTZCUk8sSUFBQUEsWUFBWSxFQUFFO0FBQ1ZSLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURDO0FBRVYsaUJBQVM7QUFGQztBQTdCTixHQUhQO0FBc0NMUSxFQUFBQSxNQXRDSyxvQkFzQ0k7QUFDTCxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLQyxLQUFMLEdBQWFDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQW5DO0FBQ0gsR0ExQ0k7QUE0Q0xDLEVBQUFBLE9BNUNLLHFCQTRDSztBQUNOcEIsSUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlRCxPQUFmO0FBQ0gsR0E5Q0k7QUFnRExFLEVBQUFBLFNBaERLLHVCQWdETztBQUNSLFNBQUtDLE1BQUwsQ0FBWSxLQUFLaEIsVUFBTCxDQUFnQixLQUFLUyxPQUFyQixDQUFaO0FBQ0EsU0FBS0EsT0FBTDs7QUFDQSxRQUFJLEtBQUtBLE9BQUwsR0FBZSxLQUFLVCxVQUFMLENBQWdCaUIsTUFBaEIsR0FBeUIsQ0FBNUMsRUFBK0M7QUFDM0MsV0FBS1IsT0FBTCxHQUFlLENBQWY7QUFDSDtBQUNKLEdBdERJO0FBd0RMUyxFQUFBQSxPQXhESyxxQkF3REs7QUFDTixTQUFLRixNQUFMLENBQVksS0FBS2QsUUFBakI7QUFDSCxHQTFESTtBQTRETGlCLEVBQUFBLFNBNURLLHVCQTRETztBQUNSLFNBQUtILE1BQUwsQ0FBWSxLQUFLWixVQUFqQjtBQUNILEdBOURJO0FBZ0VMZ0IsRUFBQUEsWUFoRUssMEJBZ0VVO0FBQ1gsU0FBS0osTUFBTCxDQUFZLEtBQUtiLGFBQWpCO0FBQ0gsR0FsRUk7QUFvRUxrQixFQUFBQSxhQXBFSywyQkFvRVc7QUFDWixTQUFLTCxNQUFMLENBQVksS0FBS1gsY0FBakI7QUFDSCxHQXRFSTtBQXdFTGlCLEVBQUFBLGFBeEVLLHlCQXdFU0MsQ0F4RVQsRUF3RVk7QUFDYixTQUFLUCxNQUFMLENBQVksS0FBS25CLFNBQUwsQ0FBZTBCLENBQWYsQ0FBWjtBQUNILEdBMUVJO0FBNEVMQyxFQUFBQSxXQTVFSyx5QkE0RVM7QUFDVixTQUFLUixNQUFMLENBQVksS0FBS1YsWUFBakI7QUFDSCxHQTlFSTtBQWdGTG1CLEVBQUFBLE9BaEZLLG1CQWdGR0MsRUFoRkgsRUFnRk87QUFDUixRQUFJLEtBQUtoQixLQUFMLENBQVdpQixZQUFYLElBQTJCLENBQS9CLEVBQWtDO0FBQzlCO0FBQ0g7O0FBQ0RsQyxJQUFBQSxFQUFFLENBQUNxQixXQUFILENBQWVjLElBQWYsQ0FBb0IsS0FBSzNCLFFBQUwsQ0FBY3lCLEVBQWQsQ0FBcEIsRUFBdUMsSUFBdkM7QUFDSCxHQXJGSTtBQXVGTFYsRUFBQUEsTUF2Rkssa0JBdUZFYSxJQXZGRixFQXVGUTtBQUNULFFBQUksS0FBS25CLEtBQUwsQ0FBV29CLGtCQUFYLElBQWlDLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0g7O0FBQ0RyQyxJQUFBQSxFQUFFLENBQUNxQixXQUFILENBQWVpQixVQUFmLENBQTBCRixJQUExQjtBQUNIO0FBNUZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcm9sZUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3aGVlbEF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZ21BdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmV0QXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXJiZXRBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZUJldEF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZUJldEF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwZWNpYWxBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZU1haW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMud2hlZWxJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5wSW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BBbGwoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2hlZWwoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy53aGVlbEF1ZGlvW3RoaXMud2hlZWxJZF0pO1xyXG4gICAgICAgIHRoaXMud2hlZWxJZCsrO1xyXG4gICAgICAgIGlmICh0aGlzLndoZWVsSWQgPiB0aGlzLndoZWVsQXVkaW8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsSWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJldCgpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmJldEF1ZGlvKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheVJlQmV0KCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMucmVCZXRBdWRpbyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlDbGVhckJldCgpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmNsZWFyYmV0QXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5Q2hhbmdlQmV0KCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuY2hhbmdlQmV0QXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5Um9sZUF1ZGlvKHIpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLnJvbGVBdWRpb1tyXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlTcGVjaWFsKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuc3BlY2lhbEF1ZGlvKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJnbShpZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBJbmZvLm11c2ljQ29udHJvbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJnbUF1ZGlvW2lkXSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlFZihjbGlwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXApO1xyXG4gICAgfVxyXG59KSJdfQ==