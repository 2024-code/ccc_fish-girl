
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lhdb/LHDB_Audio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e8898TYtPxO/qR6ARstdGOg', 'LHDB_Audio');
// Script/Lhdb/LHDB_Audio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": null
    },
    btnAudio: {
      type: cc.AudioClip,
      "default": null
    },
    awardAudio: {
      type: cc.AudioClip,
      "default": null
    },
    booAudio: {
      type: cc.AudioClip,
      "default": null
    },
    decBoxAudio: {
      type: cc.AudioClip,
      "default": null
    },
    landAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
  },
  stopAll: function stopAll() {
    cc.audioEngine.stopAll();
  },
  playBtn: function playBtn() {
    this.playEf(this.btnAudio);
  },
  playBgm: function playBgm() {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.play(this.bgmAudio, true);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
  },
  playAward: function playAward() {
    this.playEf(this.awardAudio);
  },
  playBoo: function playBoo() {
    this.playEf(this.booAudio);
  },
  playDecBox: function playDecBox() {
    this.playEf(this.decBoxAudio);
  },
  playLandAudio: function playLandAudio() {
    this.playEf(this.landAudio);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMaGRiXFxMSERCX0F1ZGlvLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmdtQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwiYnRuQXVkaW8iLCJhd2FyZEF1ZGlvIiwiYm9vQXVkaW8iLCJkZWNCb3hBdWRpbyIsImxhbmRBdWRpbyIsIm9uTG9hZCIsInBJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJzdG9wQWxsIiwiYXVkaW9FbmdpbmUiLCJwbGF5QnRuIiwicGxheUVmIiwicGxheUJnbSIsIm11c2ljQ29udHJvbCIsInBsYXkiLCJjbGlwIiwic291bmRFZmZlY3RDb250cm9sIiwicGxheUVmZmVjdCIsInBsYXlBd2FyZCIsInBsYXlCb28iLCJwbGF5RGVjQm94IiwicGxheUxhbmRBdWRpbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNOQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkgsS0FERjtBQUtSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTkYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREg7QUFFTixpQkFBUztBQUZILEtBTEY7QUFTUkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1JILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQUREO0FBRVIsaUJBQVM7QUFGRCxLQVRKO0FBYVJHLElBQUFBLFFBQVEsRUFBRTtBQUNOSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkgsS0FiRjtBQWlCUkksSUFBQUEsV0FBVyxFQUFFO0FBQ1RMLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURBO0FBRVQsaUJBQVM7QUFGQSxLQWpCTDtBQXFCUkssSUFBQUEsU0FBUyxFQUFFO0FBQ1BOLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURGO0FBRVAsaUJBQVM7QUFGRjtBQXJCSCxHQUhQO0FBOEJMTSxFQUFBQSxNQTlCSyxvQkE4Qkk7QUFDTCxTQUFLQyxLQUFMLEdBQWFDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQW5DO0FBQ0gsR0FoQ0k7QUFrQ0xDLEVBQUFBLE9BbENLLHFCQWtDSztBQUNOaEIsSUFBQUEsRUFBRSxDQUFDaUIsV0FBSCxDQUFlRCxPQUFmO0FBQ0gsR0FwQ0k7QUF1Q0xFLEVBQUFBLE9BdkNLLHFCQXVDSztBQUNOLFNBQUtDLE1BQUwsQ0FBWSxLQUFLWixRQUFqQjtBQUNILEdBekNJO0FBMkNMYSxFQUFBQSxPQTNDSyxxQkEyQ0s7QUFDTixRQUFJLEtBQUtQLEtBQUwsQ0FBV1EsWUFBWCxJQUEyQixDQUEvQixFQUFrQztBQUM5QjtBQUNIOztBQUNEckIsSUFBQUEsRUFBRSxDQUFDaUIsV0FBSCxDQUFlSyxJQUFmLENBQW9CLEtBQUtsQixRQUF6QixFQUFtQyxJQUFuQztBQUNILEdBaERJO0FBa0RMZSxFQUFBQSxNQWxESyxrQkFrREVJLElBbERGLEVBa0RRO0FBQ1QsUUFBSSxLQUFLVixLQUFMLENBQVdXLGtCQUFYLElBQWlDLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0g7O0FBQ0R4QixJQUFBQSxFQUFFLENBQUNpQixXQUFILENBQWVRLFVBQWYsQ0FBMEJGLElBQTFCO0FBQ0gsR0F2REk7QUF5RExHLEVBQUFBLFNBekRLLHVCQXlETztBQUNSLFNBQUtQLE1BQUwsQ0FBWSxLQUFLWCxVQUFqQjtBQUNILEdBM0RJO0FBNkRMbUIsRUFBQUEsT0E3REsscUJBNkRLO0FBQ04sU0FBS1IsTUFBTCxDQUFZLEtBQUtWLFFBQWpCO0FBQ0gsR0EvREk7QUFpRUxtQixFQUFBQSxVQWpFSyx3QkFpRVE7QUFDVCxTQUFLVCxNQUFMLENBQVksS0FBS1QsV0FBakI7QUFDSCxHQW5FSTtBQW9FTG1CLEVBQUFBLGFBcEVLLDJCQW9FVztBQUNaLFNBQUtWLE1BQUwsQ0FBWSxLQUFLUixTQUFqQjtBQUNIO0FBdEVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmdtQXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuQXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXdhcmRBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib29BdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWNCb3hBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYW5kQXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEFsbCgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBwbGF5QnRuKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuYnRuQXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5QmdtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBJbmZvLm11c2ljQ29udHJvbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJnbUF1ZGlvLCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUVmKGNsaXApIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlBd2FyZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmF3YXJkQXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5Qm9vKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuYm9vQXVkaW8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5RGVjQm94KCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuZGVjQm94QXVkaW8pO1xyXG4gICAgfSxcclxuICAgIHBsYXlMYW5kQXVkaW8oKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy5sYW5kQXVkaW8pO1xyXG4gICAgfVxyXG59KSJdfQ==