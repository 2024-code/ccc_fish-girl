
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Land/Cards.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5317eeMhj1HuarfO5Eq1Wh0', 'Cards');
// Script/Land/Cards.js

"use strict";

/**
 * 斗地主卡牌管理类
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

  /**
   * 创建扑克牌
   * @param {*} value 值
   * @param {*} type  花色
   */
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
      //A-K
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

    this.node.parent.parent.getComponent("LandlordsMain").primaryNum();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMYW5kXFxDYXJkcy5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBiX0NhcmRzIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiaGFuZENhcmQiLCJzZWxlY3RlZENhcmQiLCJvdXRDYXJkIiwibW92ZWQiLCJzdWJzY3JpcHQiLCJjYXJkc0NyZWF0ZSIsInZhbHVlIiwidmFsIiwibm9kZSIsImdldENvbXBvbmVudCIsInNwcml0ZUZyYW1lIiwibW92ZUNhcmQiLCJzZXRQb3NpdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJwYXJlbnQiLCJwcmltYXJ5TnVtIiwiY2hhbmdlSHVpIiwiY29sb3IiLCJDb2xvciIsImNoYW5nZUJhaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsRUFESDtBQUVOQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGSCxLQUZGO0FBTVJDLElBQUFBLFFBQVEsRUFBRSxLQU5GO0FBT1JDLElBQUFBLFlBQVksRUFBRSxLQVBOO0FBUVJDLElBQUFBLE9BQU8sRUFBRSxLQVJEO0FBU1JDLElBQUFBLEtBQUssRUFBRSxLQVRDO0FBVVJDLElBQUFBLFNBQVMsRUFBRTtBQVZILEdBSFA7O0FBZ0JMO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsV0FBVyxFQUFFLHFCQUFVQyxLQUFWLEVBQWlCUixJQUFqQixFQUF1QjtBQUNoQyxTQUFLUyxHQUFMLEdBQVdELEtBQVg7QUFDQSxTQUFLUixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRSxRQUFMLEdBQWdCLElBQWhCLENBSGdDLENBSWhDOztBQUNBLFFBQUlGLElBQUksSUFBSSxDQUFaLEVBQWU7QUFDWDtBQUNBLFVBQUlRLEtBQUssSUFBSSxFQUFiLEVBQWlCO0FBQ2I7QUFDQSxhQUFLRSxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXBDLEdBQWtELEtBQUtiLFFBQUwsQ0FBYyxFQUFkLENBQWxEO0FBQ0gsT0FIRCxNQUdPO0FBQ0g7QUFDQSxhQUFLVyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXBDLEdBQWtELEtBQUtiLFFBQUwsQ0FBYyxFQUFkLENBQWxEO0FBQ0g7QUFDSixLQVRELE1BU087QUFDSDtBQUNBLFdBQUtXLElBQUwsQ0FBVUMsWUFBVixDQUF1QixXQUF2QixFQUFvQ0MsV0FBcEMsR0FBa0QsS0FBS2IsUUFBTCxDQUFjLE1BQU1DLElBQUksR0FBRyxDQUFiLElBQWtCUSxLQUFoQyxDQUFsRDtBQUNIO0FBQ0osR0F2Q0k7O0FBeUNMO0FBQ0o7QUFDQTtBQUNJSyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEIsUUFBSSxLQUFLWCxRQUFULEVBQW1CO0FBQ2YsV0FBS1EsSUFBTCxDQUFVSSxXQUFWLENBQXNCLEtBQUtKLElBQUwsQ0FBVUssUUFBVixDQUFtQkMsQ0FBekMsRUFBNEMsS0FBS04sSUFBTCxDQUFVSyxRQUFWLENBQW1CRSxDQUFuQixHQUF1QixFQUFuRTtBQUNBLFdBQUtmLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSCxLQUhELE1BR087QUFDSCxXQUFLUSxJQUFMLENBQVVJLFdBQVYsQ0FBc0IsS0FBS0osSUFBTCxDQUFVSyxRQUFWLENBQW1CQyxDQUF6QyxFQUE0QyxLQUFLTixJQUFMLENBQVVLLFFBQVYsQ0FBbUJFLENBQW5CLEdBQXVCLEVBQW5FO0FBQ0EsV0FBS2YsUUFBTCxHQUFnQixJQUFoQjtBQUNIOztBQUNELFNBQUtRLElBQUwsQ0FBVVEsTUFBVixDQUFpQkEsTUFBakIsQ0FBd0JQLFlBQXhCLENBQXFDLGVBQXJDLEVBQXNEUSxVQUF0RDtBQUNILEdBckRJOztBQXVETDtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFNBQUtWLElBQUwsQ0FBVVcsS0FBVixHQUFrQixJQUFJMUIsRUFBRSxDQUFDMkIsS0FBUCxDQUFhLEdBQWIsRUFBa0IsR0FBbEIsRUFBdUIsR0FBdkIsQ0FBbEI7QUFDSCxHQTVESTs7QUE4REw7QUFDSjtBQUNBO0FBQ0lDLEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixTQUFLYixJQUFMLENBQVVXLEtBQVYsR0FBa0IsSUFBSTFCLEVBQUUsQ0FBQzJCLEtBQVAsQ0FBYSxHQUFiLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBQWxCO0FBQ0g7QUFuRUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaWl+WcsOS4u+WNoeeJjOeuoeeQhuexu1xyXG4gKi9cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvL+aJkeWFi+WuueWZqFxyXG4gICAgICAgIHBiX0NhcmRzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZENhcmQ6IGZhbHNlLFxyXG4gICAgICAgIHNlbGVjdGVkQ2FyZDogZmFsc2UsXHJcbiAgICAgICAgb3V0Q2FyZDogZmFsc2UsXHJcbiAgICAgICAgbW92ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHN1YnNjcmlwdDogMFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuaJkeWFi+eJjFxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSDlgLxcclxuICAgICAqIEBwYXJhbSB7Kn0gdHlwZSAg6Iqx6ImyXHJcbiAgICAgKi9cclxuICAgIGNhcmRzQ3JlYXRlOiBmdW5jdGlvbiAodmFsdWUsIHR5cGUpIHtcclxuICAgICAgICB0aGlzLnZhbCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5oYW5kQ2FyZCA9IHRydWU7XHJcbiAgICAgICAgLy/nsbvlnovnrYnkuo415Luj6KGo5piv546LXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gNSkge1xyXG4gICAgICAgICAgICAvL+WAvOaYrzE05Li65bCP546LLDE15Li65aSn546LXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAxNCkge1xyXG4gICAgICAgICAgICAgICAgLy/lsI/njotcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSB0aGlzLnBiX0NhcmRzWzUzXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5aSn546LXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5wYl9DYXJkc1s1NF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL0EtS1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5wYl9DYXJkc1sxMyAqICh0eXBlIC0gMSkgKyB2YWx1ZV07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNoeeJjOenu+WKqFxyXG4gICAgICovXHJcbiAgICBtb3ZlQ2FyZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRDYXJkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUucG9zaXRpb24ueCwgdGhpcy5ub2RlLnBvc2l0aW9uLnkgKyAyMCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZENhcmQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uLngsIHRoaXMubm9kZS5wb3NpdGlvbi55IC0gMjApO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRDYXJkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiTGFuZGxvcmRzTWFpblwiKS5wcmltYXJ5TnVtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZUh1aTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigxNDQsIDE0NCwgMTQ0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY2hhbmdlQmFpOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgfVxyXG59KTsiXX0=