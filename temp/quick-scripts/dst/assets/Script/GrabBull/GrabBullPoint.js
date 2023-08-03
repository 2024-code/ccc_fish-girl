
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GrabBull/GrabBullPoint.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd610GgZ5NKGYu7N5QmP/IH', 'GrabBullPoint');
// Script/GrabBull/GrabBullPoint.js

"use strict";

/**
 * 牛牛点数动画管理
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    type: 0
  },
  onLoad: function onLoad() {
    this.pointDisplay = this.getComponent("dragonBones.ArmatureDisplay");
    this.pointArmature = this.pointDisplay.armature();
  },

  /**
   * 设置牌型
   * @param {*} type 
   */
  setType_Function: function setType_Function(type) {
    this.type = type;
    this.setFrame_Function(type);
  },

  /**
   * 设置牌面材质
   * @param {*} type 
   */
  setFrame_Function: function setFrame_Function(type) {
    this.pointDisplay.playAnimation("point" + type, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmFiQnVsbFxcR3JhYkJ1bGxQb2ludC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInR5cGUiLCJvbkxvYWQiLCJwb2ludERpc3BsYXkiLCJnZXRDb21wb25lbnQiLCJwb2ludEFybWF0dXJlIiwiYXJtYXR1cmUiLCJzZXRUeXBlX0Z1bmN0aW9uIiwic2V0RnJhbWVfRnVuY3Rpb24iLCJwbGF5QW5pbWF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFO0FBREUsR0FIUDtBQU1MQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZixTQUFLQyxZQUFMLEdBQW9CLEtBQUtDLFlBQUwsQ0FBa0IsNkJBQWxCLENBQXBCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFLRixZQUFMLENBQWtCRyxRQUFsQixFQUFyQjtBQUNILEdBVEk7O0FBV0w7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVNOLElBQVQsRUFBZTtBQUM3QixTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLTyxpQkFBTCxDQUF1QlAsSUFBdkI7QUFDSCxHQWxCSTs7QUFvQkw7QUFDSjtBQUNBO0FBQ0E7QUFDSU8sRUFBQUEsaUJBQWlCLEVBQUUsMkJBQVNQLElBQVQsRUFBZTtBQUM5QixTQUFLRSxZQUFMLENBQWtCTSxhQUFsQixDQUFnQyxVQUFVUixJQUExQyxFQUFnRCxDQUFoRDtBQUNIO0FBMUJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDniZvniZvngrnmlbDliqjnlLvnrqHnkIZcclxuICovXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdHlwZTogMFxyXG4gICAgfSxcclxuICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludERpc3BsYXkgPSB0aGlzLmdldENvbXBvbmVudChcImRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVwiKTtcclxuICAgICAgICB0aGlzLnBvaW50QXJtYXR1cmUgPSB0aGlzLnBvaW50RGlzcGxheS5hcm1hdHVyZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueJjOWei1xyXG4gICAgICogQHBhcmFtIHsqfSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBzZXRUeXBlX0Z1bmN0aW9uOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnNldEZyYW1lX0Z1bmN0aW9uKHR5cGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueJjOmdouadkOi0qFxyXG4gICAgICogQHBhcmFtIHsqfSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBzZXRGcmFtZV9GdW5jdGlvbjogZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgIHRoaXMucG9pbnREaXNwbGF5LnBsYXlBbmltYXRpb24oXCJwb2ludFwiICsgdHlwZSwgMSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=