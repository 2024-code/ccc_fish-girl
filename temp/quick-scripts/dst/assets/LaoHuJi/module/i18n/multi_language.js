
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/i18n/multi_language.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0cc9eN7J95EQrPRNr0Xjc0h', 'multi_language');
// LaoHuJi/module/i18n/multi_language.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Panel_choose_language: cc.Node
  },
  onBtnClick_arrow: function onBtnClick_arrow() {
    this.node.active = false;
    this.Panel_choose_language.active = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxpMThuXFxtdWx0aV9sYW5ndWFnZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIlBhbmVsX2Nob29zZV9sYW5ndWFnZSIsIk5vZGUiLCJvbkJ0bkNsaWNrX2Fycm93Iiwibm9kZSIsImFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLHFCQUFxQixFQUFHSixFQUFFLENBQUNLO0FBRG5CLEdBSFA7QUFPTEMsRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQ2xCO0FBQ0ksU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS0oscUJBQUwsQ0FBMkJJLE1BQTNCLEdBQW9DLElBQXBDO0FBQ0g7QUFYSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBhbmVsX2Nob29zZV9sYW5ndWFnZSA6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQnRuQ2xpY2tfYXJyb3c6IGZ1bmN0aW9uICgpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBhbmVsX2Nob29zZV9sYW5ndWFnZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxufSk7Il19