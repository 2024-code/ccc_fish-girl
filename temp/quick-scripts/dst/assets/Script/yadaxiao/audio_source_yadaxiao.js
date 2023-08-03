
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/yadaxiao/audio_source_yadaxiao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '059caMFSYNCFLUsa7EADp5y', 'audio_source_yadaxiao');
// Script/yadaxiao/audio_source_yadaxiao.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    ADD_SCORE: {
      "default": null,
      type: cc.AudioClip
    },
    Click: {
      "default": null,
      type: cc.AudioClip
    },
    SEND_CARD: {
      "default": null,
      type: cc.AudioClip
    },
    bg: {
      "default": null,
      type: cc.AudioClip
    },
    chip: {
      "default": null,
      type: cc.AudioClip
    },
    choumaxiazhu: {
      "default": null,
      type: cc.AudioClip
    },
    countdown: {
      "default": null,
      type: cc.AudioClip
    },
    start_s: {
      "default": null,
      type: cc.AudioClip
    },
    stop_s: {
      "default": null,
      type: cc.AudioClip
    },
    dice: {
      "default": null,
      type: cc.AudioClip
    }
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx5YWRheGlhb1xcYXVkaW9fc291cmNlX3lhZGF4aWFvLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiQUREX1NDT1JFIiwidHlwZSIsIkF1ZGlvQ2xpcCIsIkNsaWNrIiwiU0VORF9DQVJEIiwiYmciLCJjaGlwIiwiY2hvdW1heGlhemh1IiwiY291bnRkb3duIiwic3RhcnRfcyIsInN0b3BfcyIsImRpY2UiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBQztBQUNOLGlCQUFRLElBREY7QUFFTkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkYsS0FERjtBQUtSQyxJQUFBQSxLQUFLLEVBQUM7QUFDRixpQkFBUSxJQUROO0FBRUZGLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZOLEtBTEU7QUFTUkUsSUFBQUEsU0FBUyxFQUFDO0FBQ04saUJBQVEsSUFERjtBQUVOSCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGRixLQVRGO0FBYVJHLElBQUFBLEVBQUUsRUFBQztBQUNDLGlCQUFRLElBRFQ7QUFFQ0osTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRlQsS0FiSztBQWlCUkksSUFBQUEsSUFBSSxFQUFDO0FBQ0QsaUJBQVEsSUFEUDtBQUVETCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGUCxLQWpCRztBQXFCUkssSUFBQUEsWUFBWSxFQUFDO0FBQ1QsaUJBQVEsSUFEQztBQUVUTixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGQyxLQXJCTDtBQXlCUk0sSUFBQUEsU0FBUyxFQUFDO0FBQ04saUJBQVEsSUFERjtBQUVOUCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGRixLQXpCRjtBQTZCUk8sSUFBQUEsT0FBTyxFQUFDO0FBQ0osaUJBQVEsSUFESjtBQUVKUixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSixLQTdCQTtBQWlDUlEsSUFBQUEsTUFBTSxFQUFDO0FBQ0gsaUJBQVEsSUFETDtBQUVIVCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGTCxLQWpDQztBQXFDUlMsSUFBQUEsSUFBSSxFQUFDO0FBQ0QsaUJBQVEsSUFEUDtBQUVEVixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGUDtBQXJDRyxHQUhQO0FBK0NMO0FBRUE7QUFFQVUsRUFBQUEsS0FuREssbUJBbURJLENBRVIsQ0FyREksQ0F1REw7O0FBdkRLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIEFERF9TQ09SRTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBDbGljazp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBTRU5EX0NBUkQ6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgYmc6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgY2hpcDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBjaG91bWF4aWF6aHU6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgY291bnRkb3duOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0X3M6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcF9zOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIGRpY2U6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcbiAgICAgICAgfVxuICAgIH0sXG4gICAgIFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG4gICAgIFxufSk7XG4iXX0=