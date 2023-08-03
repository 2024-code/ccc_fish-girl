
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/components/CheckBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc9e5hcegFBFpbh0CwUFw8V', 'CheckBox');
// scripts/components/CheckBox.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    target: cc.Node,
    sprite: cc.SpriteFrame,
    checkedSprite: cc.SpriteFrame,
    checked: false
  },
  // use this for initialization
  onLoad: function onLoad() {
    this.refresh();
  },
  onClicked: function onClicked() {
    this.checked = !this.checked;
    this.refresh();
  },
  refresh: function refresh() {
    var targetSprite = this.target.getComponent(cc.Sprite);

    if (this.checked) {
      targetSprite.spriteFrame = this.checkedSprite;
    } else {
      targetSprite.spriteFrame = this.sprite;
    }
  } // called every frame, uncomment this function to activate update callback
  // update: function (dt) {
  // },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tcG9uZW50c1xcQ2hlY2tCb3guanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0YXJnZXQiLCJOb2RlIiwic3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJjaGVja2VkU3ByaXRlIiwiY2hlY2tlZCIsIm9uTG9hZCIsInJlZnJlc2giLCJvbkNsaWNrZWQiLCJ0YXJnZXRTcHJpdGUiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFFTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLE1BQU0sRUFBRUosRUFBRSxDQUFDSyxJQVZIO0FBV1JDLElBQUFBLE1BQU0sRUFBRU4sRUFBRSxDQUFDTyxXQVhIO0FBWVJDLElBQUFBLGFBQWEsRUFBRVIsRUFBRSxDQUFDTyxXQVpWO0FBYVJFLElBQUFBLE9BQU8sRUFBRTtBQWJELEdBRlA7QUFpQkw7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBQ2YsU0FBS0MsT0FBTDtBQUNILEdBcEJJO0FBcUJMQyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0gsT0FBTCxHQUFlLENBQUMsS0FBS0EsT0FBckI7QUFDQSxTQUFLRSxPQUFMO0FBQ0gsR0F4Qkk7QUF5QkxBLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixRQUFJRSxZQUFZLEdBQUcsS0FBS1QsTUFBTCxDQUFZVSxZQUFaLENBQXlCZCxFQUFFLENBQUNlLE1BQTVCLENBQW5COztBQUNBLFFBQUksS0FBS04sT0FBVCxFQUFrQjtBQUNkSSxNQUFBQSxZQUFZLENBQUNHLFdBQWIsR0FBMkIsS0FBS1IsYUFBaEM7QUFDSCxLQUZELE1BRU87QUFDSEssTUFBQUEsWUFBWSxDQUFDRyxXQUFiLEdBQTJCLEtBQUtWLE1BQWhDO0FBQ0g7QUFDSixHQWhDSSxDQWlDTDtBQUNBO0FBQ0E7O0FBbkNLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgdGFyZ2V0OiBjYy5Ob2RlLFxyXG4gICAgICAgIHNwcml0ZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgY2hlY2tlZFNwcml0ZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2tlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH0sXHJcbiAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0U3ByaXRlID0gdGhpcy50YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICB0YXJnZXRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmNoZWNrZWRTcHJpdGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFyZ2V0U3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAvLyB9LFxyXG59KTsiXX0=