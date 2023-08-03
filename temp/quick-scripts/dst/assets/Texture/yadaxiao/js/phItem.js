
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/phItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d3a8fgm+5EALAA0ldiFKbs', 'phItem');
// Texture/yadaxiao/js/phItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    //名次
    rankText: cc.Label,
    //昵称
    nickText: cc.Label,
    //金币
    coinText: cc.Label,
    //ID
    idText: cc.Label,
    //微信
    wxText: cc.Label,
    //QQ
    qqText: cc.Label,
    //手机
    phoneText: cc.Label
  },
  updateItem: function updateItem(a, b, c, d, e, f) {
    this.nickText.string = a;
    this.coinText.string = b;
    this.idText.string = "ID:" + c;
    this.wxText.string = "微信:" + d;
    this.qqText.string = "QQ:" + e;
    this.phoneText.string = "手机:" + f;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFxwaEl0ZW0uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyYW5rVGV4dCIsIkxhYmVsIiwibmlja1RleHQiLCJjb2luVGV4dCIsImlkVGV4dCIsInd4VGV4dCIsInFxVGV4dCIsInBob25lVGV4dCIsInVwZGF0ZUl0ZW0iLCJhIiwiYiIsImMiLCJkIiwiZSIsImYiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFFBQVEsRUFBRUosRUFBRSxDQUFDSyxLQUZMO0FBR1I7QUFDQUMsSUFBQUEsUUFBUSxFQUFFTixFQUFFLENBQUNLLEtBSkw7QUFLUjtBQUNBRSxJQUFBQSxRQUFRLEVBQUVQLEVBQUUsQ0FBQ0ssS0FOTDtBQU9SO0FBQ0FHLElBQUFBLE1BQU0sRUFBRVIsRUFBRSxDQUFDSyxLQVJIO0FBU1I7QUFDQUksSUFBQUEsTUFBTSxFQUFFVCxFQUFFLENBQUNLLEtBVkg7QUFXUjtBQUNBSyxJQUFBQSxNQUFNLEVBQUVWLEVBQUUsQ0FBQ0ssS0FaSDtBQWFSO0FBQ0FNLElBQUFBLFNBQVMsRUFBRVgsRUFBRSxDQUFDSztBQWROLEdBSFA7QUFvQkxPLEVBQUFBLFVBQVUsRUFBRSxvQkFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsQ0FBeEIsRUFBMkI7QUFDbkMsU0FBS1osUUFBTCxDQUFjYSxNQUFkLEdBQXVCTixDQUF2QjtBQUNBLFNBQUtOLFFBQUwsQ0FBY1ksTUFBZCxHQUF1QkwsQ0FBdkI7QUFDQSxTQUFLTixNQUFMLENBQVlXLE1BQVosR0FBcUIsUUFBUUosQ0FBN0I7QUFDQSxTQUFLTixNQUFMLENBQVlVLE1BQVosR0FBcUIsUUFBUUgsQ0FBN0I7QUFDQSxTQUFLTixNQUFMLENBQVlTLE1BQVosR0FBcUIsUUFBUUYsQ0FBN0I7QUFDQSxTQUFLTixTQUFMLENBQWVRLE1BQWYsR0FBd0IsUUFBUUQsQ0FBaEM7QUFDSDtBQTNCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8v5ZCN5qyhXHJcbiAgICAgICAgcmFua1RleHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v5pi156ewXHJcbiAgICAgICAgbmlja1RleHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v6YeR5biBXHJcbiAgICAgICAgY29pblRleHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8vSURcclxuICAgICAgICBpZFRleHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v5b6u5L+hXHJcbiAgICAgICAgd3hUZXh0OiBjYy5MYWJlbCxcclxuICAgICAgICAvL1FRXHJcbiAgICAgICAgcXFUZXh0OiBjYy5MYWJlbCxcclxuICAgICAgICAvL+aJi+aculxyXG4gICAgICAgIHBob25lVGV4dDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUl0ZW06IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcclxuICAgICAgICB0aGlzLm5pY2tUZXh0LnN0cmluZyA9IGE7XHJcbiAgICAgICAgdGhpcy5jb2luVGV4dC5zdHJpbmcgPSBiO1xyXG4gICAgICAgIHRoaXMuaWRUZXh0LnN0cmluZyA9IFwiSUQ6XCIgKyBjO1xyXG4gICAgICAgIHRoaXMud3hUZXh0LnN0cmluZyA9IFwi5b6u5L+hOlwiICsgZDtcclxuICAgICAgICB0aGlzLnFxVGV4dC5zdHJpbmcgPSBcIlFROlwiICsgZTtcclxuICAgICAgICB0aGlzLnBob25lVGV4dC5zdHJpbmcgPSBcIuaJi+acujpcIiArIGY7XHJcbiAgICB9LFxyXG5cclxufSk7Il19