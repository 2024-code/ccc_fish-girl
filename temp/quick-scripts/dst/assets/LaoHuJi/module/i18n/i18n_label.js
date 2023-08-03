
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/i18n/i18n_label.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e4f88adp3hERoJ48DZ2PSAl', 'i18n_label');
// LaoHuJi/module/i18n/i18n_label.js

"use strict";

var i18n = require('i18n');

cc.Class({
  "extends": cc.Component,
  properties: {
    Label: cc.Label,
    textKey: {
      "default": 'TEXT_KEY',
      multiline: true,
      tooltip: 'Enter i18n key here'
    }
  },
  update: function update() {
    if (this.language != cc.sys.localStorage.getItem('language')) {
      this.language = cc.sys.localStorage.getItem('language');
      this.Label.string = i18n.t(this.textKey);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxpMThuXFxpMThuX2xhYmVsLmpzIl0sIm5hbWVzIjpbImkxOG4iLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJMYWJlbCIsInRleHRLZXkiLCJtdWx0aWxpbmUiLCJ0b29sdGlwIiwidXBkYXRlIiwibGFuZ3VhZ2UiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic3RyaW5nIiwidCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFHSixFQUFFLENBQUNJLEtBREg7QUFFUkMsSUFBQUEsT0FBTyxFQUFHO0FBQ04saUJBQVMsVUFESDtBQUVOQyxNQUFBQSxTQUFTLEVBQUUsSUFGTDtBQUdOQyxNQUFBQSxPQUFPLEVBQUU7QUFISDtBQUZGLEdBSFA7QUFZTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUNSO0FBQ0ksUUFBRyxLQUFLQyxRQUFMLElBQWlCVCxFQUFFLENBQUNVLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBcEIsRUFDQTtBQUNJLFdBQUtILFFBQUwsR0FBZ0JULEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFoQjtBQUNBLFdBQUtSLEtBQUwsQ0FBV1MsTUFBWCxHQUFvQmYsSUFBSSxDQUFDZ0IsQ0FBTCxDQUFPLEtBQUtULE9BQVosQ0FBcEI7QUFDSDtBQUNKO0FBbkJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGkxOG4gPSByZXF1aXJlKCdpMThuJyk7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBMYWJlbCA6IGNjLkxhYmVsLFxuICAgICAgICB0ZXh0S2V5IDoge1xuICAgICAgICAgICAgZGVmYXVsdDogJ1RFWFRfS0VZJyxcbiAgICAgICAgICAgIG11bHRpbGluZTogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6ICdFbnRlciBpMThuIGtleSBoZXJlJyxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSBcbiAgICB7XG4gICAgICAgIGlmKHRoaXMubGFuZ3VhZ2UgIT0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5ndWFnZScpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5ndWFnZScpO1xuICAgICAgICAgICAgdGhpcy5MYWJlbC5zdHJpbmcgPSBpMThuLnQodGhpcy50ZXh0S2V5KTtcbiAgICAgICAgfVxuICAgIH0sXG59KTsiXX0=