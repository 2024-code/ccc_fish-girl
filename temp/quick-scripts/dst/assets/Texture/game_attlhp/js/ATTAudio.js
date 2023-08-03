
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/game_attlhp/js/ATTAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8dc3702Ea1C85wtmpChup5/', 'ATTAudio');
// Texture/game_attlhp/js/ATTAudio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": []
    },
    efAudio: {
      type: cc.AudioClip,
      "default": []
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
  playEffect: function playEffect(id) {
    this.playEf(this.efAudio[id]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcZ2FtZV9hdHRsaHBcXGpzXFxBVFRBdWRpby5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJnbUF1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsImVmQXVkaW8iLCJvbkxvYWQiLCJwSW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50Iiwic3RhcnQiLCJhdWRpb0VuZ2luZSIsInN0b3BBbGwiLCJwbGF5QmdtIiwic3RvcEF1ZGlvIiwiaWQiLCJtdXNpY0NvbnRyb2wiLCJzdG9wTXVzaWMiLCJwbGF5TXVzaWMiLCJwbGF5RWZmZWN0IiwicGxheUVmIiwiY2xpcCIsInNvdW5kRWZmZWN0Q29udHJvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNOQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkgsS0FERjtBQUtSQyxJQUFBQSxPQUFPLEVBQUU7QUFDTEYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREo7QUFFTCxpQkFBUztBQUZKO0FBTEQsR0FIUDtBQWNMRSxFQUFBQSxNQWRLLG9CQWNJO0FBQ0wsU0FBS0MsS0FBTCxHQUFhQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUFuQztBQUNILEdBaEJJO0FBa0JMQyxFQUFBQSxLQWxCSyxtQkFrQkc7QUFDSlosSUFBQUEsRUFBRSxDQUFDYSxXQUFILENBQWVDLE9BQWY7QUFDQSxTQUFLQyxPQUFMLENBQWEsQ0FBYjtBQUNILEdBckJJO0FBdUJMQyxFQUFBQSxTQXZCSyx1QkF1Qk07QUFDUGhCLElBQUFBLEVBQUUsQ0FBQ2EsV0FBSCxDQUFlQyxPQUFmO0FBQ0gsR0F6Qkk7QUEyQkxDLEVBQUFBLE9BM0JLLG1CQTJCR0UsRUEzQkgsRUEyQk87QUFDUixRQUFJLEtBQUtSLEtBQUwsQ0FBV1MsWUFBWCxJQUEyQixDQUEvQixFQUFrQztBQUM5QjtBQUNIOztBQUNEbEIsSUFBQUEsRUFBRSxDQUFDYSxXQUFILENBQWVNLFNBQWY7QUFDQW5CLElBQUFBLEVBQUUsQ0FBQ2EsV0FBSCxDQUFlTyxTQUFmLENBQXlCLEtBQUtoQixRQUFMLENBQWNhLEVBQWQsQ0FBekIsRUFBNEMsSUFBNUM7QUFDSCxHQWpDSTtBQWtDTEksRUFBQUEsVUFsQ0ssc0JBa0NPSixFQWxDUCxFQWtDVztBQUNaLFNBQUtLLE1BQUwsQ0FBWSxLQUFLZixPQUFMLENBQWFVLEVBQWIsQ0FBWjtBQUNILEdBcENJO0FBc0NMSyxFQUFBQSxNQXRDSyxrQkFzQ0VDLElBdENGLEVBc0NRO0FBQ1QsUUFBSSxLQUFLZCxLQUFMLENBQVdlLGtCQUFYLElBQWlDLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0g7O0FBQ0R4QixJQUFBQSxFQUFFLENBQUNhLFdBQUgsQ0FBZVEsVUFBZixDQUEwQkUsSUFBMUI7QUFDSDtBQTNDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJnbUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZkF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5QmdtKDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wQXVkaW8oKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlCZ20oaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5tdXNpY0NvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbUF1ZGlvW2lkXSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgcGxheUVmZmVjdCAoaWQpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmVmQXVkaW9baWRdKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHBsYXlFZihjbGlwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXApO1xyXG4gICAgfSxcclxufSkiXX0=