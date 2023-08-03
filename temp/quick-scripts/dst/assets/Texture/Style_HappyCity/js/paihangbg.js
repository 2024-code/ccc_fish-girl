
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Style_HappyCity/js/paihangbg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53fb0O+5dxLuLlY9TyArQ0n', 'paihangbg');
// Texture/Style_HappyCity/js/paihangbg.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    rankNumBg: [cc.Node],
    rankNumLab: cc.Label,
    headSp: cc.Sprite,
    nickNameLab: cc.Label,
    coinLab: cc.Label
  },
  onLoad: function onLoad() {},
  start: function start() {},
  setView: function setView(data, index, type) {
    var _this = this;

    for (var i in this.rankNumBg) {
      this.rankNumBg[i].active = false;
    }

    if (index < 3) {
      this.rankNumBg[index].active = true;
    } else {
      this.rankNumBg[3].active = true;
    }

    this.rankNumLab.string = index + 1;
    Helper.loadHead(data.headimgurl, function (sp) {
      _this.headSp.spriteFrame = sp;
    });
    this.nickNameLab.string = data.nickname;

    if (type == 1) {
      this.coinLab.string = data.score;
    } else {
      this.coinLab.string = data.diamond;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU3R5bGVfSGFwcHlDaXR5XFxqc1xccGFpaGFuZ2JnLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicmFua051bUJnIiwiTm9kZSIsInJhbmtOdW1MYWIiLCJMYWJlbCIsImhlYWRTcCIsIlNwcml0ZSIsIm5pY2tOYW1lTGFiIiwiY29pbkxhYiIsIm9uTG9hZCIsInN0YXJ0Iiwic2V0VmlldyIsImRhdGEiLCJpbmRleCIsInR5cGUiLCJpIiwiYWN0aXZlIiwic3RyaW5nIiwiSGVscGVyIiwibG9hZEhlYWQiLCJoZWFkaW1ndXJsIiwic3AiLCJzcHJpdGVGcmFtZSIsIm5pY2tuYW1lIiwic2NvcmUiLCJkaWFtb25kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFLENBQUNKLEVBQUUsQ0FBQ0ssSUFBSixDQURIO0FBRVJDLElBQUFBLFVBQVUsRUFBRU4sRUFBRSxDQUFDTyxLQUZQO0FBR1JDLElBQUFBLE1BQU0sRUFBRVIsRUFBRSxDQUFDUyxNQUhIO0FBSVJDLElBQUFBLFdBQVcsRUFBRVYsRUFBRSxDQUFDTyxLQUpSO0FBS1JJLElBQUFBLE9BQU8sRUFBRVgsRUFBRSxDQUFDTztBQUxKLEdBSFA7QUFXTEssRUFBQUEsTUFYSyxvQkFXSSxDQUVSLENBYkk7QUFlTEMsRUFBQUEsS0FmSyxtQkFlRyxDQUVQLENBakJJO0FBbUJMQyxFQUFBQSxPQW5CSyxtQkFtQkdDLElBbkJILEVBbUJTQyxLQW5CVCxFQW1CZ0JDLElBbkJoQixFQW1Cc0I7QUFBQTs7QUFDdkIsU0FBSyxJQUFJQyxDQUFULElBQWMsS0FBS2QsU0FBbkIsRUFBOEI7QUFDMUIsV0FBS0EsU0FBTCxDQUFlYyxDQUFmLEVBQWtCQyxNQUFsQixHQUEyQixLQUEzQjtBQUNIOztBQUNELFFBQUlILEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDWCxXQUFLWixTQUFMLENBQWVZLEtBQWYsRUFBc0JHLE1BQXRCLEdBQStCLElBQS9CO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS2YsU0FBTCxDQUFlLENBQWYsRUFBa0JlLE1BQWxCLEdBQTJCLElBQTNCO0FBQ0g7O0FBQ0QsU0FBS2IsVUFBTCxDQUFnQmMsTUFBaEIsR0FBeUJKLEtBQUssR0FBRyxDQUFqQztBQUNBSyxJQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JQLElBQUksQ0FBQ1EsVUFBckIsRUFBaUMsVUFBQUMsRUFBRSxFQUFJO0FBQ25DLE1BQUEsS0FBSSxDQUFDaEIsTUFBTCxDQUFZaUIsV0FBWixHQUEwQkQsRUFBMUI7QUFDSCxLQUZEO0FBR0EsU0FBS2QsV0FBTCxDQUFpQlUsTUFBakIsR0FBMEJMLElBQUksQ0FBQ1csUUFBL0I7O0FBQ0EsUUFBSVQsSUFBSSxJQUFJLENBQVosRUFBZTtBQUNYLFdBQUtOLE9BQUwsQ0FBYVMsTUFBYixHQUFzQkwsSUFBSSxDQUFDWSxLQUEzQjtBQUNILEtBRkQsTUFFTztBQUNILFdBQUtoQixPQUFMLENBQWFTLE1BQWIsR0FBc0JMLElBQUksQ0FBQ2EsT0FBM0I7QUFDSDtBQUNKO0FBdENJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcmFua051bUJnOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgcmFua051bUxhYjogY2MuTGFiZWwsXHJcbiAgICAgICAgaGVhZFNwOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgbmlja05hbWVMYWI6IGNjLkxhYmVsLFxyXG4gICAgICAgIGNvaW5MYWI6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFZpZXcoZGF0YSwgaW5kZXgsIHR5cGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMucmFua051bUJnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFua051bUJnW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPCAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFua051bUJnW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFua051bUJnWzNdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmFua051bUxhYi5zdHJpbmcgPSBpbmRleCArIDE7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKGRhdGEuaGVhZGltZ3VybCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRTcC5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubmlja05hbWVMYWIuc3RyaW5nID0gZGF0YS5uaWNrbmFtZTtcclxuICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29pbkxhYi5zdHJpbmcgPSBkYXRhLnNjb3JlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29pbkxhYi5zdHJpbmcgPSBkYXRhLmRpYW1vbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcbiJdfQ==