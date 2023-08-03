
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/baijiale/audio_source_baijiale.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d934Xvy9RPsJGSQ6IL878w', 'audio_source_baijiale');
// Script/baijiale/audio_source_baijiale.js

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYWlqaWFsZVxcYXVkaW9fc291cmNlX2JhaWppYWxlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiQUREX1NDT1JFIiwidHlwZSIsIkF1ZGlvQ2xpcCIsIkNsaWNrIiwiU0VORF9DQVJEIiwiYmciLCJjaGlwIiwiY2hvdW1heGlhemh1IiwiY291bnRkb3duIiwic3RhcnRfcyIsInN0b3BfcyIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFDO0FBQ04saUJBQVEsSUFERjtBQUVOQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGRixLQURGO0FBS1JDLElBQUFBLEtBQUssRUFBQztBQUNGLGlCQUFRLElBRE47QUFFRkYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRk4sS0FMRTtBQVNSRSxJQUFBQSxTQUFTLEVBQUM7QUFDTixpQkFBUSxJQURGO0FBRU5ILE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZGLEtBVEY7QUFhUkcsSUFBQUEsRUFBRSxFQUFDO0FBQ0MsaUJBQVEsSUFEVDtBQUVDSixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGVCxLQWJLO0FBaUJSSSxJQUFBQSxJQUFJLEVBQUM7QUFDRCxpQkFBUSxJQURQO0FBRURMLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZQLEtBakJHO0FBcUJSSyxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUSxJQURDO0FBRVROLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZDLEtBckJMO0FBeUJSTSxJQUFBQSxTQUFTLEVBQUM7QUFDTixpQkFBUSxJQURGO0FBRU5QLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZGLEtBekJGO0FBNkJSTyxJQUFBQSxPQUFPLEVBQUM7QUFDSixpQkFBUSxJQURKO0FBRUpSLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZKLEtBN0JBO0FBaUNSUSxJQUFBQSxNQUFNLEVBQUM7QUFDSCxpQkFBUSxJQURMO0FBRUhULE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZMO0FBakNDLEdBSFA7QUEyQ0w7QUFFQTtBQUVBUyxFQUFBQSxLQS9DSyxtQkErQ0ksQ0FFUixDQWpESSxDQW1ETDs7QUFuREssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgQUREX1NDT1JFOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIENsaWNrOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIFNFTkRfQ0FSRDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBiZzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBjaGlwOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIGNob3VtYXhpYXpodTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBjb3VudGRvd246e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRfczp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBzdG9wX3M6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICB9LFxuICAgICBcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxuICAgICBcbn0pO1xuIl19