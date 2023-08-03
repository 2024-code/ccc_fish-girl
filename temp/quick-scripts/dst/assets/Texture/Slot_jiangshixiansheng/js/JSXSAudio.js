
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_jiangshixiansheng/js/JSXSAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a106b4lhFVMA72Yc29Ew2os', 'JSXSAudio');
// Texture/Slot_jiangshixiansheng/js/JSXSAudio.js

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9qaWFuZ3NoaXhpYW5zaGVuZ1xcanNcXEpTWFNBdWRpby5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJnbUF1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsInN0b3BXaGVlbCIsImJpZ1dpbkVmIiwib25Mb2FkIiwicEluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInN0YXJ0IiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwicGxheUJnbSIsInN0b3BBdWRpbyIsImlkIiwibXVzaWNDb250cm9sIiwic3RvcE11c2ljIiwicGxheU11c2ljIiwicGxheVN0b3BXaGVlbCIsInBsYXlFZiIsInBsYXlCVyIsImNsaXAiLCJzb3VuZEVmZmVjdENvbnRyb2wiLCJwbGF5RWZmZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ05DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURIO0FBRU4saUJBQVM7QUFGSCxLQURGO0FBTVJDLElBQUFBLFNBQVMsRUFBRTtBQUNQRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FERjtBQUVQLGlCQUFTO0FBRkYsS0FOSDtBQVdSRSxJQUFBQSxRQUFRLEVBQUM7QUFDTEgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREo7QUFFTCxpQkFBUztBQUZKO0FBWEQsR0FIUDtBQW9CTEcsRUFBQUEsTUFwQkssb0JBb0JJO0FBQ0wsU0FBS0MsS0FBTCxHQUFhQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUFuQztBQUNILEdBdEJJO0FBd0JMQyxFQUFBQSxLQXhCSyxtQkF3Qkc7QUFDSmIsSUFBQUEsRUFBRSxDQUFDYyxXQUFILENBQWVDLE9BQWY7QUFDQSxTQUFLQyxPQUFMLENBQWEsQ0FBYjtBQUNILEdBM0JJO0FBNkJMQyxFQUFBQSxTQTdCSyx1QkE2Qk07QUFDUGpCLElBQUFBLEVBQUUsQ0FBQ2MsV0FBSCxDQUFlQyxPQUFmO0FBQ0gsR0EvQkk7QUFpQ0xDLEVBQUFBLE9BakNLLG1CQWlDR0UsRUFqQ0gsRUFpQ087QUFDUixRQUFJLEtBQUtSLEtBQUwsQ0FBV1MsWUFBWCxJQUEyQixDQUEvQixFQUFrQztBQUM5QjtBQUNIOztBQUNEbkIsSUFBQUEsRUFBRSxDQUFDYyxXQUFILENBQWVNLFNBQWY7QUFDQXBCLElBQUFBLEVBQUUsQ0FBQ2MsV0FBSCxDQUFlTyxTQUFmLENBQXlCLEtBQUtqQixRQUFMLENBQWNjLEVBQWQsQ0FBekIsRUFBNEMsSUFBNUM7QUFDSCxHQXZDSTtBQXlDTEksRUFBQUEsYUF6Q0ssMkJBeUNXO0FBQ1osU0FBS0MsTUFBTCxDQUFZLEtBQUtoQixTQUFqQjtBQUNILEdBM0NJO0FBNkNMaUIsRUFBQUEsTUE3Q0ssb0JBNkNHO0FBQ0osU0FBS0QsTUFBTCxDQUFZLEtBQUtmLFFBQWpCO0FBQ0gsR0EvQ0k7QUFpRExlLEVBQUFBLE1BakRLLGtCQWlERUUsSUFqREYsRUFpRFE7QUFDVCxRQUFJLEtBQUtmLEtBQUwsQ0FBV2dCLGtCQUFYLElBQWlDLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0g7O0FBQ0QxQixJQUFBQSxFQUFFLENBQUNjLFdBQUgsQ0FBZWEsVUFBZixDQUEwQkYsSUFBMUI7QUFDSDtBQXRESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJnbUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcFdoZWVsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5FZjp7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgIHRoaXMucGxheUJnbSgwKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEF1ZGlvKCl7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5QmdtKGlkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8ubXVzaWNDb250cm9sID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iZ21BdWRpb1tpZF0sIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5U3RvcFdoZWVsKCkge1xyXG4gICAgICAgIHRoaXMucGxheUVmKHRoaXMuc3RvcFdoZWVsKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJXKCl7XHJcbiAgICAgICAgdGhpcy5wbGF5RWYodGhpcy5iaWdXaW5FZik7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlFZihjbGlwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXApO1xyXG4gICAgfSxcclxufSkiXX0=