
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/components/TempAnimation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe652tHEodEM6GZnsMzaFef', 'TempAnimation');
// scripts/components/TempAnimation.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    isSkeAnim: {
      "default": false,
      displayName: "骨骼动画？"
    },
    sketNode: {
      "default": null,
      type: cc.Node,
      displayName: "骨骼数据"
    },
    animArray: {
      "default": [],
      type: cc.String,
      displayName: "动画列表"
    }
  },
  onLoad: function onLoad() {},
  start: function start() {
    if (this.isSkeAnim) {
      this.sket = this.sketNode.getComponent(sp.Skeleton);
      if (!cc.isValid(this.sket)) return;
      this.sket.timeScale = 0.5;
      this.stopAnim();
    } else {
      this.anim = this.getComponent(cc.Animation);
    }
  },
  playAnim: function playAnim() {
    if (this.isSkeAnim) {
      if (!cc.isValid(this.sket)) return;
      this.sket.clearTrack(0);

      for (var _iterator = _createForOfIteratorHelperLoose(this.animArray), _step; !(_step = _iterator()).done;) {
        var iterator = _step.value;
        this.sket.setAnimation(0, iterator, true);
      }
    } else {
      if (!cc.isValid(this.anim)) return;
      this.anim.play();
    }
  },
  stopAnim: function stopAnim() {
    if (this.isSkeAnim) {
      if (!cc.isValid(this.sket)) return;
      this.sket.clearTracks();
    } else {
      if (!cc.isValid(this.anim)) return;
      this.anim.setCurrentTime(0);
      this.anim.stop();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tcG9uZW50c1xcVGVtcEFuaW1hdGlvbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImlzU2tlQW5pbSIsImRpc3BsYXlOYW1lIiwic2tldE5vZGUiLCJ0eXBlIiwiTm9kZSIsImFuaW1BcnJheSIsIlN0cmluZyIsIm9uTG9hZCIsInN0YXJ0Iiwic2tldCIsImdldENvbXBvbmVudCIsInNwIiwiU2tlbGV0b24iLCJpc1ZhbGlkIiwidGltZVNjYWxlIiwic3RvcEFuaW0iLCJhbmltIiwiQW5pbWF0aW9uIiwicGxheUFuaW0iLCJjbGVhclRyYWNrIiwiaXRlcmF0b3IiLCJzZXRBbmltYXRpb24iLCJwbGF5IiwiY2xlYXJUcmFja3MiLCJzZXRDdXJyZW50VGltZSIsInN0b3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUVSQyxJQUFBQSxTQUFTLEVBQUM7QUFDTixpQkFBUyxLQURIO0FBRU5DLE1BQUFBLFdBQVcsRUFBQztBQUZOLEtBRkY7QUFNUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVOQyxNQUFBQSxJQUFJLEVBQUVQLEVBQUUsQ0FBQ1EsSUFGSDtBQUdOSCxNQUFBQSxXQUFXLEVBQUM7QUFITixLQU5GO0FBV1JJLElBQUFBLFNBQVMsRUFBQztBQUNOLGlCQUFTLEVBREg7QUFFTkYsTUFBQUEsSUFBSSxFQUFFUCxFQUFFLENBQUNVLE1BRkg7QUFHTkwsTUFBQUEsV0FBVyxFQUFDO0FBSE47QUFYRixHQUhQO0FBc0JMTSxFQUFBQSxNQXRCSyxvQkFzQkksQ0FDUixDQXZCSTtBQXlCTEMsRUFBQUEsS0F6QkssbUJBeUJHO0FBQ0osUUFBSSxLQUFLUixTQUFULEVBQW9CO0FBQ2hCLFdBQUtTLElBQUwsR0FBWSxLQUFLUCxRQUFMLENBQWNRLFlBQWQsQ0FBMkJDLEVBQUUsQ0FBQ0MsUUFBOUIsQ0FBWjtBQUNBLFVBQUksQ0FBQ2hCLEVBQUUsQ0FBQ2lCLE9BQUgsQ0FBVyxLQUFLSixJQUFoQixDQUFMLEVBQTRCO0FBQzVCLFdBQUtBLElBQUwsQ0FBVUssU0FBVixHQUFzQixHQUF0QjtBQUNBLFdBQUtDLFFBQUw7QUFDSCxLQUxELE1BS087QUFDSCxXQUFLQyxJQUFMLEdBQVksS0FBS04sWUFBTCxDQUFrQmQsRUFBRSxDQUFDcUIsU0FBckIsQ0FBWjtBQUNIO0FBQ0osR0FsQ0k7QUFvQ0xDLEVBQUFBLFFBcENLLHNCQW9DSztBQUNOLFFBQUksS0FBS2xCLFNBQVQsRUFBb0I7QUFDaEIsVUFBSSxDQUFDSixFQUFFLENBQUNpQixPQUFILENBQVcsS0FBS0osSUFBaEIsQ0FBTCxFQUE0QjtBQUM1QixXQUFLQSxJQUFMLENBQVVVLFVBQVYsQ0FBcUIsQ0FBckI7O0FBQ0EsMkRBQXVCLEtBQUtkLFNBQTVCLHdDQUF1QztBQUFBLFlBQTVCZSxRQUE0QjtBQUNuQyxhQUFLWCxJQUFMLENBQVVZLFlBQVYsQ0FBdUIsQ0FBdkIsRUFBMEJELFFBQTFCLEVBQW9DLElBQXBDO0FBQ0g7QUFDSixLQU5ELE1BTUs7QUFDRCxVQUFJLENBQUN4QixFQUFFLENBQUNpQixPQUFILENBQVcsS0FBS0csSUFBaEIsQ0FBTCxFQUE0QjtBQUM1QixXQUFLQSxJQUFMLENBQVVNLElBQVY7QUFDSDtBQUNKLEdBL0NJO0FBaURMUCxFQUFBQSxRQWpESyxzQkFpREs7QUFDTixRQUFJLEtBQUtmLFNBQVQsRUFBb0I7QUFDaEIsVUFBSSxDQUFDSixFQUFFLENBQUNpQixPQUFILENBQVcsS0FBS0osSUFBaEIsQ0FBTCxFQUE0QjtBQUM1QixXQUFLQSxJQUFMLENBQVVjLFdBQVY7QUFDSCxLQUhELE1BR0s7QUFDRCxVQUFJLENBQUMzQixFQUFFLENBQUNpQixPQUFILENBQVcsS0FBS0csSUFBaEIsQ0FBTCxFQUE0QjtBQUM1QixXQUFLQSxJQUFMLENBQVVRLGNBQVYsQ0FBeUIsQ0FBekI7QUFDQSxXQUFLUixJQUFMLENBQVVTLElBQVY7QUFDSDtBQUNKO0FBMURJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICAgICAgaXNTa2VBbmltOntcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwi6aqo6aq85Yqo55S777yfXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNrZXROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwi6aqo6aq85pWw5o2uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1BcnJheTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TdHJpbmcsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwi5Yqo55S75YiX6KGoXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2tlQW5pbSkge1xyXG4gICAgICAgICAgICB0aGlzLnNrZXQgPSB0aGlzLnNrZXROb2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLnNrZXQpKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc2tldC50aW1lU2NhbGUgPSAwLjU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheUFuaW0oKXtcclxuICAgICAgICBpZiAodGhpcy5pc1NrZUFuaW0pIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMuc2tldCkpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5za2V0LmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgdGhpcy5hbmltQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tldC5zZXRBbmltYXRpb24oMCwgaXRlcmF0b3IsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLmFuaW0pKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbS5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wQW5pbSgpe1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2tlQW5pbSkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5za2V0KSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnNrZXQuY2xlYXJUcmFja3MoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5hbmltKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW0uc2V0Q3VycmVudFRpbWUoMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbS5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19