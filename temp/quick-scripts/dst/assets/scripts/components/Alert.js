
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/components/Alert.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c12553sxCxG/on0Bz7rkX0f', 'Alert');
// scripts/components/Alert.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //    default: null,      // The default value will be used only when the component attaching
    //                           to a node for the first time
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    _alert: null,
    _btnOK: null,
    _btnCancel: null,
    _title: null,
    _content: null,
    _onok: null
  },
  // use this for initialization
  onLoad: function onLoad() {
    if (cc.vv == null) {
      return;
    }

    this._alert = cc.find("Canvas/alert");
    this._title = cc.find("Canvas/alert/title").getComponent(cc.Label);
    this._content = cc.find("Canvas/alert/content").getComponent(cc.Label);
    this._btnOK = cc.find("Canvas/alert/btn_ok");
    this._btnCancel = cc.find("Canvas/alert/btn_cancel");
    cc.vv.utils.addClickEvent(this._btnOK, this.node, "Alert", "onBtnClicked");
    cc.vv.utils.addClickEvent(this._btnCancel, this.node, "Alert", "onBtnClicked");
    this._alert.active = false;
    cc.vv.alert = this;
  },
  onBtnClicked: function onBtnClicked(event) {
    if (event.target.name == "btn_ok") {
      if (this._onok) {
        this._onok();
      }
    }

    this._alert.active = false;
    this._onok = null;
  },
  show: function show(title, content, onok, needcancel) {
    this._alert.active = true;
    this._onok = onok;
    this._title.string = title;
    this._content.string = content;

    if (needcancel) {
      this._btnCancel.active = true;
      this._btnOK.x = -150;
      this._btnCancel.x = 150;
    } else {
      this._btnCancel.active = false;
      this._btnOK.x = 0;
    }
  },
  onDestory: function onDestory() {
    if (cc.vv) {
      cc.vv.alert = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tcG9uZW50c1xcQWxlcnQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJfYWxlcnQiLCJfYnRuT0siLCJfYnRuQ2FuY2VsIiwiX3RpdGxlIiwiX2NvbnRlbnQiLCJfb25vayIsIm9uTG9hZCIsInZ2IiwiZmluZCIsImdldENvbXBvbmVudCIsIkxhYmVsIiwidXRpbHMiLCJhZGRDbGlja0V2ZW50Iiwibm9kZSIsImFjdGl2ZSIsImFsZXJ0Iiwib25CdG5DbGlja2VkIiwiZXZlbnQiLCJ0YXJnZXQiLCJuYW1lIiwic2hvdyIsInRpdGxlIiwiY29udGVudCIsIm9ub2siLCJuZWVkY2FuY2VsIiwic3RyaW5nIiwieCIsIm9uRGVzdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFFTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsTUFBTSxFQUFFLElBWEE7QUFZUkMsSUFBQUEsTUFBTSxFQUFFLElBWkE7QUFhUkMsSUFBQUEsVUFBVSxFQUFFLElBYko7QUFjUkMsSUFBQUEsTUFBTSxFQUFFLElBZEE7QUFlUkMsSUFBQUEsUUFBUSxFQUFFLElBZkY7QUFnQlJDLElBQUFBLEtBQUssRUFBRTtBQWhCQyxHQUZQO0FBb0JMO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFFBQUlWLEVBQUUsQ0FBQ1csRUFBSCxJQUFTLElBQWIsRUFBbUI7QUFDZjtBQUNIOztBQUNELFNBQUtQLE1BQUwsR0FBY0osRUFBRSxDQUFDWSxJQUFILENBQVEsY0FBUixDQUFkO0FBQ0EsU0FBS0wsTUFBTCxHQUFjUCxFQUFFLENBQUNZLElBQUgsQ0FBUSxvQkFBUixFQUE4QkMsWUFBOUIsQ0FBMkNiLEVBQUUsQ0FBQ2MsS0FBOUMsQ0FBZDtBQUNBLFNBQUtOLFFBQUwsR0FBZ0JSLEVBQUUsQ0FBQ1ksSUFBSCxDQUFRLHNCQUFSLEVBQWdDQyxZQUFoQyxDQUE2Q2IsRUFBRSxDQUFDYyxLQUFoRCxDQUFoQjtBQUNBLFNBQUtULE1BQUwsR0FBY0wsRUFBRSxDQUFDWSxJQUFILENBQVEscUJBQVIsQ0FBZDtBQUNBLFNBQUtOLFVBQUwsR0FBa0JOLEVBQUUsQ0FBQ1ksSUFBSCxDQUFRLHlCQUFSLENBQWxCO0FBQ0FaLElBQUFBLEVBQUUsQ0FBQ1csRUFBSCxDQUFNSSxLQUFOLENBQVlDLGFBQVosQ0FBMEIsS0FBS1gsTUFBL0IsRUFBdUMsS0FBS1ksSUFBNUMsRUFBa0QsT0FBbEQsRUFBMkQsY0FBM0Q7QUFDQWpCLElBQUFBLEVBQUUsQ0FBQ1csRUFBSCxDQUFNSSxLQUFOLENBQVlDLGFBQVosQ0FBMEIsS0FBS1YsVUFBL0IsRUFBMkMsS0FBS1csSUFBaEQsRUFBc0QsT0FBdEQsRUFBK0QsY0FBL0Q7QUFDQSxTQUFLYixNQUFMLENBQVljLE1BQVosR0FBcUIsS0FBckI7QUFDQWxCLElBQUFBLEVBQUUsQ0FBQ1csRUFBSCxDQUFNUSxLQUFOLEdBQWMsSUFBZDtBQUNILEdBbENJO0FBbUNMQyxFQUFBQSxZQUFZLEVBQUUsc0JBQVNDLEtBQVQsRUFBZ0I7QUFDMUIsUUFBSUEsS0FBSyxDQUFDQyxNQUFOLENBQWFDLElBQWIsSUFBcUIsUUFBekIsRUFBbUM7QUFDL0IsVUFBSSxLQUFLZCxLQUFULEVBQWdCO0FBQ1osYUFBS0EsS0FBTDtBQUNIO0FBQ0o7O0FBQ0QsU0FBS0wsTUFBTCxDQUFZYyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsU0FBS1QsS0FBTCxHQUFhLElBQWI7QUFDSCxHQTNDSTtBQTRDTGUsRUFBQUEsSUFBSSxFQUFFLGNBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXlCQyxJQUF6QixFQUErQkMsVUFBL0IsRUFBMkM7QUFDN0MsU0FBS3hCLE1BQUwsQ0FBWWMsTUFBWixHQUFxQixJQUFyQjtBQUNBLFNBQUtULEtBQUwsR0FBYWtCLElBQWI7QUFDQSxTQUFLcEIsTUFBTCxDQUFZc0IsTUFBWixHQUFxQkosS0FBckI7QUFDQSxTQUFLakIsUUFBTCxDQUFjcUIsTUFBZCxHQUF1QkgsT0FBdkI7O0FBQ0EsUUFBSUUsVUFBSixFQUFnQjtBQUNaLFdBQUt0QixVQUFMLENBQWdCWSxNQUFoQixHQUF5QixJQUF6QjtBQUNBLFdBQUtiLE1BQUwsQ0FBWXlCLENBQVosR0FBZ0IsQ0FBQyxHQUFqQjtBQUNBLFdBQUt4QixVQUFMLENBQWdCd0IsQ0FBaEIsR0FBb0IsR0FBcEI7QUFDSCxLQUpELE1BSU87QUFDSCxXQUFLeEIsVUFBTCxDQUFnQlksTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxXQUFLYixNQUFMLENBQVl5QixDQUFaLEdBQWdCLENBQWhCO0FBQ0g7QUFDSixHQXpESTtBQTBETEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFFBQUkvQixFQUFFLENBQUNXLEVBQVAsRUFBVztBQUNQWCxNQUFBQSxFQUFFLENBQUNXLEVBQUgsQ0FBTVEsS0FBTixHQUFjLElBQWQ7QUFDSDtBQUNKLEdBOURJLENBK0RMO0FBQ0E7QUFDQTs7QUFqRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgX2FsZXJ0OiBudWxsLFxyXG4gICAgICAgIF9idG5PSzogbnVsbCxcclxuICAgICAgICBfYnRuQ2FuY2VsOiBudWxsLFxyXG4gICAgICAgIF90aXRsZTogbnVsbCxcclxuICAgICAgICBfY29udGVudDogbnVsbCxcclxuICAgICAgICBfb25vazogbnVsbCxcclxuICAgIH0sXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGNjLnZ2ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hbGVydCA9IGNjLmZpbmQoXCJDYW52YXMvYWxlcnRcIik7XHJcbiAgICAgICAgdGhpcy5fdGl0bGUgPSBjYy5maW5kKFwiQ2FudmFzL2FsZXJ0L3RpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNjLmZpbmQoXCJDYW52YXMvYWxlcnQvY29udGVudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX2J0bk9LID0gY2MuZmluZChcIkNhbnZhcy9hbGVydC9idG5fb2tcIik7XHJcbiAgICAgICAgdGhpcy5fYnRuQ2FuY2VsID0gY2MuZmluZChcIkNhbnZhcy9hbGVydC9idG5fY2FuY2VsXCIpO1xyXG4gICAgICAgIGNjLnZ2LnV0aWxzLmFkZENsaWNrRXZlbnQodGhpcy5fYnRuT0ssIHRoaXMubm9kZSwgXCJBbGVydFwiLCBcIm9uQnRuQ2xpY2tlZFwiKTtcclxuICAgICAgICBjYy52di51dGlscy5hZGRDbGlja0V2ZW50KHRoaXMuX2J0bkNhbmNlbCwgdGhpcy5ub2RlLCBcIkFsZXJ0XCIsIFwib25CdG5DbGlja2VkXCIpO1xyXG4gICAgICAgIHRoaXMuX2FsZXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLnZ2LmFsZXJ0ID0gdGhpcztcclxuICAgIH0sXHJcbiAgICBvbkJ0bkNsaWNrZWQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lID09IFwiYnRuX29rXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29ub2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29ub2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hbGVydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9vbm9rID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBzaG93OiBmdW5jdGlvbih0aXRsZSwgY29udGVudCwgb25vaywgbmVlZGNhbmNlbCkge1xyXG4gICAgICAgIHRoaXMuX2FsZXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fb25vayA9IG9ub2s7XHJcbiAgICAgICAgdGhpcy5fdGl0bGUuc3RyaW5nID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIGlmIChuZWVkY2FuY2VsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bkNhbmNlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9idG5PSy54ID0gLTE1MDtcclxuICAgICAgICAgICAgdGhpcy5fYnRuQ2FuY2VsLnggPSAxNTA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuQ2FuY2VsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9idG5PSy54ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25EZXN0b3J5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoY2MudnYpIHtcclxuICAgICAgICAgICAgY2MudnYuYWxlcnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgLy8gfSxcclxufSk7Il19