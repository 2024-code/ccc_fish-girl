
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Runing/RunCards.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1034bk5SXRJL7Cs5j/0dPTv', 'RunCards');
// Script/Runing/RunCards.js

"use strict";

/**
 * 跑得快卡牌管理类
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    //扑克容器
    pb_Cards: {
      "default": [],
      type: cc.SpriteFrame
    },
    handCard: false,
    selectedCard: false,
    outCard: false,
    moved: false,
    subscript: 0
  },
  onLoad: function onLoad() {},
  cardsCreate: function cardsCreate(value, type) {
    this.val = value;
    this.type = type;
    this.handCard = true; //类型等于5代表是王

    if (type == 5) {
      //值是14为小王,15为大王
      if (value == 14) {
        //小王
        this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[53];
      } else {
        //大王
        this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[54];
      }
    } else {
      this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[13 * (type - 1) + value];
    }
  },

  /**
   * 卡牌移动
   */
  moveCard: function moveCard() {
    if (this.handCard) {
      this.node.setPosition(this.node.position.x, this.node.position.y + 20);
      this.handCard = false;
    } else {
      this.node.setPosition(this.node.position.x, this.node.position.y - 20);
      this.handCard = true;
    }

    this.node.parent.parent.getComponent("RuningMain").primaryNum();
  },

  /**
   * 
   */
  changeHui: function changeHui() {
    this.node.color = new cc.Color(144, 144, 144);
  },

  /**
   * 
   */
  changeBai: function changeBai() {
    this.node.color = new cc.Color(255, 255, 255);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxSdW5pbmdcXFJ1bkNhcmRzLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGJfQ2FyZHMiLCJ0eXBlIiwiU3ByaXRlRnJhbWUiLCJoYW5kQ2FyZCIsInNlbGVjdGVkQ2FyZCIsIm91dENhcmQiLCJtb3ZlZCIsInN1YnNjcmlwdCIsIm9uTG9hZCIsImNhcmRzQ3JlYXRlIiwidmFsdWUiLCJ2YWwiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic3ByaXRlRnJhbWUiLCJtb3ZlQ2FyZCIsInNldFBvc2l0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInBhcmVudCIsInByaW1hcnlOdW0iLCJjaGFuZ2VIdWkiLCJjb2xvciIsIkNvbG9yIiwiY2hhbmdlQmFpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxFQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBRkY7QUFNUkMsSUFBQUEsUUFBUSxFQUFFLEtBTkY7QUFPUkMsSUFBQUEsWUFBWSxFQUFFLEtBUE47QUFRUkMsSUFBQUEsT0FBTyxFQUFFLEtBUkQ7QUFTUkMsSUFBQUEsS0FBSyxFQUFFLEtBVEM7QUFVUkMsSUFBQUEsU0FBUyxFQUFFO0FBVkgsR0FIUDtBQWVMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVcsQ0FDbEIsQ0FoQkk7QUFpQkxDLEVBQUFBLFdBQVcsRUFBRSxxQkFBU0MsS0FBVCxFQUFnQlQsSUFBaEIsRUFBc0I7QUFDL0IsU0FBS1UsR0FBTCxHQUFXRCxLQUFYO0FBQ0EsU0FBS1QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQixJQUFoQixDQUgrQixDQUkvQjs7QUFDQSxRQUFHRixJQUFJLElBQUksQ0FBWCxFQUNBO0FBQ0k7QUFDQSxVQUFHUyxLQUFLLElBQUksRUFBWixFQUNBO0FBQ0k7QUFDQSxhQUFLRSxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXBDLEdBQWtELEtBQUtkLFFBQUwsQ0FBYyxFQUFkLENBQWxEO0FBQ0gsT0FKRCxNQU1BO0FBQ0k7QUFDQSxhQUFLWSxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXBDLEdBQWtELEtBQUtkLFFBQUwsQ0FBYyxFQUFkLENBQWxEO0FBQ0g7QUFDSixLQWJELE1BZUE7QUFDSSxXQUFLWSxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXBDLEdBQWtELEtBQUtkLFFBQUwsQ0FBYyxNQUFNQyxJQUFJLEdBQUcsQ0FBYixJQUFrQlMsS0FBaEMsQ0FBbEQ7QUFDSDtBQUNKLEdBeENJOztBQTBDTDtBQUNKO0FBQ0E7QUFDSUssRUFBQUEsUUFBUSxFQUFFLG9CQUFXO0FBQ2pCLFFBQUcsS0FBS1osUUFBUixFQUNBO0FBQ0ksV0FBS1MsSUFBTCxDQUFVSSxXQUFWLENBQXNCLEtBQUtKLElBQUwsQ0FBVUssUUFBVixDQUFtQkMsQ0FBekMsRUFBNEMsS0FBS04sSUFBTCxDQUFVSyxRQUFWLENBQW1CRSxDQUFuQixHQUF1QixFQUFuRTtBQUNBLFdBQUtoQixRQUFMLEdBQWdCLEtBQWhCO0FBQ0gsS0FKRCxNQU1BO0FBQ0ksV0FBS1MsSUFBTCxDQUFVSSxXQUFWLENBQXNCLEtBQUtKLElBQUwsQ0FBVUssUUFBVixDQUFtQkMsQ0FBekMsRUFBNEMsS0FBS04sSUFBTCxDQUFVSyxRQUFWLENBQW1CRSxDQUFuQixHQUF1QixFQUFuRTtBQUNBLFdBQUtoQixRQUFMLEdBQWdCLElBQWhCO0FBQ0g7O0FBQ0QsU0FBS1MsSUFBTCxDQUFVUSxNQUFWLENBQWlCQSxNQUFqQixDQUF3QlAsWUFBeEIsQ0FBcUMsWUFBckMsRUFBbURRLFVBQW5EO0FBQ0gsR0F6REk7O0FBMkRMO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS1YsSUFBTCxDQUFVVyxLQUFWLEdBQWtCLElBQUkzQixFQUFFLENBQUM0QixLQUFQLENBQWEsR0FBYixFQUFrQixHQUFsQixFQUF1QixHQUF2QixDQUFsQjtBQUNILEdBaEVJOztBQWtFTDtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtiLElBQUwsQ0FBVVcsS0FBVixHQUFrQixJQUFJM0IsRUFBRSxDQUFDNEIsS0FBUCxDQUFhLEdBQWIsRUFBa0IsR0FBbEIsRUFBdUIsR0FBdkIsQ0FBbEI7QUFDSDtBQXZFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6LeR5b6X5b+r5Y2h54mM566h55CG57G7XHJcbiAqL1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8v5omR5YWL5a655ZmoXHJcbiAgICAgICAgcGJfQ2FyZHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kQ2FyZDogZmFsc2UsXHJcbiAgICAgICAgc2VsZWN0ZWRDYXJkOiBmYWxzZSxcclxuICAgICAgICBvdXRDYXJkOiBmYWxzZSxcclxuICAgICAgICBtb3ZlZDogZmFsc2UsXHJcbiAgICAgICAgc3Vic2NyaXB0OiAwXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcclxuICAgIH0sXHJcbiAgICBjYXJkc0NyZWF0ZTogZnVuY3Rpb24odmFsdWUsIHR5cGUpIHtcclxuICAgICAgICB0aGlzLnZhbCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5oYW5kQ2FyZCA9IHRydWU7XHJcbiAgICAgICAgLy/nsbvlnovnrYnkuo415Luj6KGo5piv546LXHJcbiAgICAgICAgaWYodHlwZSA9PSA1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lgLzmmK8xNOS4uuWwj+eOiywxNeS4uuWkp+eOi1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSAxNClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/lsI/njotcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSB0aGlzLnBiX0NhcmRzWzUzXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5aSn546LXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5wYl9DYXJkc1s1NF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMucGJfQ2FyZHNbMTMgKiAodHlwZSAtIDEpICsgdmFsdWVdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljaHniYznp7vliqhcclxuICAgICAqL1xyXG4gICAgbW92ZUNhcmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaGFuZENhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uLngsIHRoaXMubm9kZS5wb3NpdGlvbi55ICsgMjApO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRDYXJkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUucG9zaXRpb24ueCwgdGhpcy5ub2RlLnBvc2l0aW9uLnkgLSAyMCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZENhcmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJSdW5pbmdNYWluXCIpLnByaW1hcnlOdW0oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY2hhbmdlSHVpOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTQ0LCAxNDQsIDE0NCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZUJhaTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgfVxyXG59KTtcclxuIl19