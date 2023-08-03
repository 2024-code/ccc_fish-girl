"use strict";
cc._RF.push(module, 'f3b90kIUm1MdI61bSCCgCpV', 'iconListCtr');
// Script/Lobby/iconListCtr.js

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
    qipai_childArr: [cc.Node],
    dianwan_childArr: [cc.Node],
    laohuji_childArr: [cc.Node]
  },
  // onLoad () {},
  start: function start() {},
  setAllChildDisplay: function setAllChildDisplay(isShow) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.node.children), _step; !(_step = _iterator()).done;) {
      var iterator = _step.value;
      iterator.active = isShow;
    }
  },
  onToggleClick: function onToggleClick(toggle, cus) {
    console.log("点击切换按钮", cus);

    switch (cus) {
      case "all":
        this.setAllChildDisplay(true);
        break;

      case "qipai":
        this.setAllChildDisplay(false);

        for (var _iterator2 = _createForOfIteratorHelperLoose(this.qipai_childArr), _step2; !(_step2 = _iterator2()).done;) {
          var iterator = _step2.value;
          iterator.active = true;
        }

        break;

      case "dianwan":
        this.setAllChildDisplay(false);

        for (var _iterator3 = _createForOfIteratorHelperLoose(this.dianwan_childArr), _step3; !(_step3 = _iterator3()).done;) {
          var _iterator4 = _step3.value;
          _iterator4.active = true;
        }

        break;

      case "laohuji":
        this.setAllChildDisplay(false);

        for (var _iterator5 = _createForOfIteratorHelperLoose(this.laohuji_childArr), _step4; !(_step4 = _iterator5()).done;) {
          var _iterator6 = _step4.value;
          _iterator6.active = true;
        }

        break;

      default:
        break;
    }
  } // update (dt) {},

});

cc._RF.pop();