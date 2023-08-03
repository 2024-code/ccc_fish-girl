
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/audio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82df3EN7AtFwaQw5R+t1Hsl', 'audio');
// Script/audio.js

"use strict";

window.playBGM = function (para) {
  cc.find("audio").getComponent("audio").playBGM(para);
}, window.playEffect = function (para) {
  cc.find("audio").getComponent("audio").playEffect(para);
}, window.stopBGM = function () {
  cc.find("audio").getComponent("audio").stopBGM();
}, window.stopEffect = function () {
  cc.find("audio").getComponent("audio").stopEffect();
}, cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    if (this.setted != true) {
      this.setted = true;
      cc.game.addPersistRootNode(this.node);
    }
  },
  // update (dt) {},
  playBGM: function playBGM(para) {
    this.pInfo = require("PlayerInfo").getInstant;

    if (this.pInfo.musicControl == 0) {
      return;
    }

    this.play(para, true);
  },
  stopBGM: function stopBGM() {
    cc.audioEngine.stopAll();
  },
  playEffect: function playEffect(para) {
    this.pInfo = require("PlayerInfo").getInstant;
    if (this.pInfo.soundEffectControl == 0) return;
    this.play(para, false);
  },
  stopEffect: function stopEffect() {},
  play: function play(para, loop) {
    if (loop) {
      window.cc.audioEngine.stopAll();
    }

    var node = window.cc.find('Canvas/audio_source');
    if (!node) return;
    var audio_source = node._components[0];
    if (!audio_source) return;
    if (!audio_source[para]) return;
    window.cc.audioEngine.play(audio_source[para], loop);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxhdWRpby5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJwbGF5QkdNIiwicGFyYSIsImNjIiwiZmluZCIsImdldENvbXBvbmVudCIsInBsYXlFZmZlY3QiLCJzdG9wQkdNIiwic3RvcEVmZmVjdCIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsInN0YXJ0Iiwic2V0dGVkIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJwSW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibXVzaWNDb250cm9sIiwicGxheSIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsInNvdW5kRWZmZWN0Q29udHJvbCIsImxvb3AiLCJhdWRpb19zb3VyY2UiLCJfY29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVNDLElBQVQsRUFDakI7QUFDSUMsRUFBQUEsRUFBRSxDQUFDQyxJQUFILENBQVEsT0FBUixFQUFpQkMsWUFBakIsQ0FBOEIsT0FBOUIsRUFBdUNKLE9BQXZDLENBQStDQyxJQUEvQztBQUNILENBSEQsRUFJQUYsTUFBTSxDQUFDTSxVQUFQLEdBQW9CLFVBQVNKLElBQVQsRUFDcEI7QUFDSUMsRUFBQUEsRUFBRSxDQUFDQyxJQUFILENBQVEsT0FBUixFQUFpQkMsWUFBakIsQ0FBOEIsT0FBOUIsRUFBdUNDLFVBQXZDLENBQWtESixJQUFsRDtBQUNILENBUEQsRUFRQUYsTUFBTSxDQUFDTyxPQUFQLEdBQWlCLFlBQ2pCO0FBQ0lKLEVBQUFBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRLE9BQVIsRUFBaUJDLFlBQWpCLENBQThCLE9BQTlCLEVBQXVDRSxPQUF2QztBQUNILENBWEQsRUFZQVAsTUFBTSxDQUFDUSxVQUFQLEdBQW9CLFlBQ3BCO0FBQ0lMLEVBQUFBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRLE9BQVIsRUFBaUJDLFlBQWpCLENBQThCLE9BQTlCLEVBQXVDRyxVQUF2QztBQUNILENBZkQsRUFpQkFMLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ0wsYUFBU04sRUFBRSxDQUFDTyxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0w7QUFFQUMsRUFBQUEsTUFUSyxvQkFTSyxDQUVULENBWEk7QUFhTEMsRUFBQUEsS0FiSyxtQkFhSTtBQUNMLFFBQUksS0FBS0MsTUFBTCxJQUFlLElBQW5CLEVBQ0E7QUFDSSxXQUFLQSxNQUFMLEdBQWMsSUFBZDtBQUNBWCxNQUFBQSxFQUFFLENBQUNZLElBQUgsQ0FBUUMsa0JBQVIsQ0FBMkIsS0FBS0MsSUFBaEM7QUFDSDtBQUNKLEdBbkJJO0FBcUJMO0FBRUFoQixFQUFBQSxPQXZCSyxtQkF1QkdDLElBdkJILEVBd0JMO0FBQ0ksU0FBS2dCLEtBQUwsR0FBYUMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBbkM7O0FBQ0EsUUFBRyxLQUFLRixLQUFMLENBQVdHLFlBQVgsSUFBMkIsQ0FBOUIsRUFDQTtBQUNJO0FBQ0g7O0FBQ0QsU0FBS0MsSUFBTCxDQUFVcEIsSUFBVixFQUFlLElBQWY7QUFFSCxHQWhDSTtBQWlDTEssRUFBQUEsT0FqQ0sscUJBa0NMO0FBQ0lKLElBQUFBLEVBQUUsQ0FBQ29CLFdBQUgsQ0FBZUMsT0FBZjtBQUNILEdBcENJO0FBcUNMbEIsRUFBQUEsVUFyQ0ssc0JBcUNNSixJQXJDTixFQXFDVztBQUNaLFNBQUtnQixLQUFMLEdBQWFDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQW5DO0FBQ0EsUUFBRyxLQUFLRixLQUFMLENBQVdPLGtCQUFYLElBQWlDLENBQXBDLEVBQ0k7QUFDSixTQUFLSCxJQUFMLENBQVVwQixJQUFWLEVBQWUsS0FBZjtBQUNILEdBMUNJO0FBMkNMTSxFQUFBQSxVQTNDSyx3QkEyQ08sQ0FFWCxDQTdDSTtBQStDTGMsRUFBQUEsSUEvQ0ssZ0JBK0NBcEIsSUEvQ0EsRUErQ0t3QixJQS9DTCxFQWdETDtBQUNJLFFBQUlBLElBQUosRUFBVTtBQUNOMUIsTUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVVvQixXQUFWLENBQXNCQyxPQUF0QjtBQUNIOztBQUVELFFBQUlQLElBQUksR0FBR2pCLE1BQU0sQ0FBQ0csRUFBUCxDQUFVQyxJQUFWLENBQWUscUJBQWYsQ0FBWDtBQUNBLFFBQUksQ0FBQ2EsSUFBTCxFQUFXO0FBQ1gsUUFBSVUsWUFBWSxHQUFHVixJQUFJLENBQUNXLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBbkI7QUFDQSxRQUFJLENBQUNELFlBQUwsRUFBbUI7QUFDbkIsUUFBSSxDQUFDQSxZQUFZLENBQUN6QixJQUFELENBQWpCLEVBQXlCO0FBQ3pCRixJQUFBQSxNQUFNLENBQUNHLEVBQVAsQ0FBVW9CLFdBQVYsQ0FBc0JELElBQXRCLENBQTJCSyxZQUFZLENBQUN6QixJQUFELENBQXZDLEVBQThDd0IsSUFBOUM7QUFDSDtBQTNESSxDQUFULENBakJBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cucGxheUJHTSA9IGZ1bmN0aW9uKHBhcmEpXHJcbntcclxuICAgIGNjLmZpbmQoXCJhdWRpb1wiKS5nZXRDb21wb25lbnQoXCJhdWRpb1wiKS5wbGF5QkdNKHBhcmEpO1xyXG59LFxyXG53aW5kb3cucGxheUVmZmVjdCA9IGZ1bmN0aW9uKHBhcmEpXHJcbntcclxuICAgIGNjLmZpbmQoXCJhdWRpb1wiKS5nZXRDb21wb25lbnQoXCJhdWRpb1wiKS5wbGF5RWZmZWN0KHBhcmEpO1xyXG59LFxyXG53aW5kb3cuc3RvcEJHTSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgY2MuZmluZChcImF1ZGlvXCIpLmdldENvbXBvbmVudChcImF1ZGlvXCIpLnN0b3BCR00oKTtcclxufSxcclxud2luZG93LnN0b3BFZmZlY3QgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGNjLmZpbmQoXCJhdWRpb1wiKS5nZXRDb21wb25lbnQoXCJhdWRpb1wiKS5zdG9wRWZmZWN0KCk7XHJcbn0sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRlZCAhPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcblxyXG4gICAgcGxheUJHTShwYXJhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIGlmKHRoaXMucEluZm8ubXVzaWNDb250cm9sID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheShwYXJhLHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIHN0b3BCR00oKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgIH0sXHJcbiAgICBwbGF5RWZmZWN0KHBhcmEpe1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIGlmKHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnBsYXkocGFyYSxmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgc3RvcEVmZmVjdCgpe1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcGxheShwYXJhLGxvb3ApXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGxvb3ApIHtcclxuICAgICAgICAgICAgd2luZG93LmNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBub2RlID0gd2luZG93LmNjLmZpbmQoJ0NhbnZhcy9hdWRpb19zb3VyY2UnKTtcclxuICAgICAgICBpZiAoIW5vZGUpIHJldHVybjtcclxuICAgICAgICB2YXIgYXVkaW9fc291cmNlID0gbm9kZS5fY29tcG9uZW50c1swXTtcclxuICAgICAgICBpZiAoIWF1ZGlvX3NvdXJjZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICghYXVkaW9fc291cmNlW3BhcmFdKSByZXR1cm47XHJcbiAgICAgICAgd2luZG93LmNjLmF1ZGlvRW5naW5lLnBsYXkoYXVkaW9fc291cmNlW3BhcmFdLGxvb3ApO1xyXG4gICAgfVxyXG59KTtcclxuIl19