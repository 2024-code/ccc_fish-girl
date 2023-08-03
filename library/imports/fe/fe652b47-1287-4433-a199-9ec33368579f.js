"use strict";
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