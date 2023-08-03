
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/iconListCtr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcaWNvbkxpc3RDdHIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJxaXBhaV9jaGlsZEFyciIsIk5vZGUiLCJkaWFud2FuX2NoaWxkQXJyIiwibGFvaHVqaV9jaGlsZEFyciIsInN0YXJ0Iiwic2V0QWxsQ2hpbGREaXNwbGF5IiwiaXNTaG93Iiwibm9kZSIsImNoaWxkcmVuIiwiaXRlcmF0b3IiLCJhY3RpdmUiLCJvblRvZ2dsZUNsaWNrIiwidG9nZ2xlIiwiY3VzIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGNBQWMsRUFBRyxDQUFDSixFQUFFLENBQUNLLElBQUosQ0FEVDtBQUVSQyxJQUFBQSxnQkFBZ0IsRUFBRyxDQUFDTixFQUFFLENBQUNLLElBQUosQ0FGWDtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRyxDQUFDUCxFQUFFLENBQUNLLElBQUo7QUFIWCxHQUhQO0FBU0w7QUFFQUcsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkk7QUFlTEMsRUFBQUEsa0JBZkssOEJBZWNDLE1BZmQsRUFlcUI7QUFDdEIseURBQXVCLEtBQUtDLElBQUwsQ0FBVUMsUUFBakMsd0NBQTJDO0FBQUEsVUFBaENDLFFBQWdDO0FBQ3ZDQSxNQUFBQSxRQUFRLENBQUNDLE1BQVQsR0FBa0JKLE1BQWxCO0FBQ0g7QUFDSixHQW5CSTtBQXFCTEssRUFBQUEsYUFyQksseUJBcUJTQyxNQXJCVCxFQXFCaUJDLEdBckJqQixFQXFCc0I7QUFDdkJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBcUJGLEdBQXJCOztBQUVBLFlBQVFBLEdBQVI7QUFDSSxXQUFLLEtBQUw7QUFDSSxhQUFLUixrQkFBTCxDQUF3QixJQUF4QjtBQUNBOztBQUNKLFdBQUssT0FBTDtBQUNJLGFBQUtBLGtCQUFMLENBQXdCLEtBQXhCOztBQUNBLDhEQUF1QixLQUFLTCxjQUE1QiwyQ0FBNEM7QUFBQSxjQUFqQ1MsUUFBaUM7QUFDeENBLFVBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxHQUFrQixJQUFsQjtBQUNIOztBQUNEOztBQUNKLFdBQUssU0FBTDtBQUNJLGFBQUtMLGtCQUFMLENBQXdCLEtBQXhCOztBQUNBLDhEQUF1QixLQUFLSCxnQkFBNUIsMkNBQThDO0FBQUEsY0FBbkNPLFVBQW1DO0FBQzFDQSxVQUFBQSxVQUFRLENBQUNDLE1BQVQsR0FBa0IsSUFBbEI7QUFDSDs7QUFDRDs7QUFDSixXQUFLLFNBQUw7QUFDSSxhQUFLTCxrQkFBTCxDQUF3QixLQUF4Qjs7QUFDQSw4REFBdUIsS0FBS0YsZ0JBQTVCLDJDQUE4QztBQUFBLGNBQW5DTSxVQUFtQztBQUMxQ0EsVUFBQUEsVUFBUSxDQUFDQyxNQUFULEdBQWtCLElBQWxCO0FBQ0g7O0FBQ0Q7O0FBRUo7QUFDSTtBQXhCUjtBQTBCSCxHQWxESSxDQW9ETDs7QUFwREssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHFpcGFpX2NoaWxkQXJyIDogW2NjLk5vZGVdLFxyXG4gICAgICAgIGRpYW53YW5fY2hpbGRBcnIgOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgbGFvaHVqaV9jaGlsZEFyciA6IFtjYy5Ob2RlXSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldEFsbENoaWxkRGlzcGxheShpc1Nob3cpe1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgdGhpcy5ub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGl0ZXJhdG9yLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVG9nZ2xlQ2xpY2sodG9nZ2xlLCBjdXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIueCueWHu+WIh+aNouaMiemSrlwiLGN1cyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoIChjdXMpIHtcclxuICAgICAgICAgICAgY2FzZSBcImFsbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbGxDaGlsZERpc3BsYXkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInFpcGFpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFsbENoaWxkRGlzcGxheShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIHRoaXMucWlwYWlfY2hpbGRBcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkaWFud2FuXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFsbENoaWxkRGlzcGxheShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIHRoaXMuZGlhbndhbl9jaGlsZEFycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxhb2h1amlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWxsQ2hpbGREaXNwbGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgdGhpcy5sYW9odWppX2NoaWxkQXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=