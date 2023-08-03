
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/jackpot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da0b8kstbxDAqF7edOe3YOu', 'jackpot');
// Script/Lobby/jackpot.js

"use strict";

var self = null;
cc.Class({
  "extends": cc.Component,
  properties: {
    JackpotLabel: {
      type: cc.Node,
      "default": null
    },
    zuobiao: {
      "default": [],
      type: cc.String
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.allnum = this.JackpotLabel.children;
    self = this;
  },
  ShowJackPot: function ShowJackPot(num) {
    num = parseInt(num / 100);
    num += '';
    num = num.split('');
    var num1 = [];

    for (var i = num.length - 1; i >= 0; i--) {
      //数字变为倒序
      num1.push(num[i]);

      if (i == 0) {
        this.aa(num1);
      }
    }
  },
  aa: function aa(num1) {
    // console.log('!!!!',num1);
    num1.forEach(function (element, index) {
      //控制每一位的数字选择
      if (element != '.') {
        self.allnum[index].runAction(cc.moveTo(0.5, cc.v2(self.allnum[index].x, self.zuobiao[element])));
      }
    });
  },
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcamFja3BvdC5qcyJdLCJuYW1lcyI6WyJzZWxmIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJKYWNrcG90TGFiZWwiLCJ0eXBlIiwiTm9kZSIsInp1b2JpYW8iLCJTdHJpbmciLCJvbkxvYWQiLCJhbGxudW0iLCJjaGlsZHJlbiIsIlNob3dKYWNrUG90IiwibnVtIiwicGFyc2VJbnQiLCJzcGxpdCIsIm51bTEiLCJpIiwibGVuZ3RoIiwicHVzaCIsImFhIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpbmRleCIsInJ1bkFjdGlvbiIsIm1vdmVUbyIsInYyIiwieCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLElBQUksR0FBRyxJQUFYO0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUU7QUFDVkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLElBREM7QUFFVixpQkFBUztBQUZDLEtBRE47QUFLUkMsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsRUFESjtBQUVMRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1E7QUFGSjtBQUxELEdBSFA7QUFjTDtBQUVBQyxFQUFBQSxNQWhCSyxvQkFnQkk7QUFDTCxTQUFLQyxNQUFMLEdBQWMsS0FBS04sWUFBTCxDQUFrQk8sUUFBaEM7QUFDQVosSUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDSCxHQW5CSTtBQW9CTGEsRUFBQUEsV0FwQkssdUJBb0JPQyxHQXBCUCxFQW9CWTtBQUNiQSxJQUFBQSxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0QsR0FBRyxHQUFHLEdBQVAsQ0FBZDtBQUNBQSxJQUFBQSxHQUFHLElBQUksRUFBUDtBQUNBQSxJQUFBQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0UsS0FBSixDQUFVLEVBQVYsQ0FBTjtBQUNBLFFBQUlDLElBQUksR0FBRyxFQUFYOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHSixHQUFHLENBQUNLLE1BQUosR0FBYSxDQUExQixFQUE2QkQsQ0FBQyxJQUFJLENBQWxDLEVBQXFDQSxDQUFDLEVBQXRDLEVBQTBDO0FBQUU7QUFDeENELE1BQUFBLElBQUksQ0FBQ0csSUFBTCxDQUFVTixHQUFHLENBQUNJLENBQUQsQ0FBYjs7QUFDQSxVQUFJQSxDQUFDLElBQUksQ0FBVCxFQUFZO0FBQ1IsYUFBS0csRUFBTCxDQUFRSixJQUFSO0FBQ0g7QUFDSjtBQUNKLEdBL0JJO0FBZ0NMSSxFQUFBQSxFQWhDSyxjQWdDRkosSUFoQ0UsRUFnQ0k7QUFDTDtBQUNBQSxJQUFBQSxJQUFJLENBQUNLLE9BQUwsQ0FBYSxVQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBb0I7QUFBRTtBQUMvQixVQUFJRCxPQUFPLElBQUksR0FBZixFQUFvQjtBQUNoQnZCLFFBQUFBLElBQUksQ0FBQ1csTUFBTCxDQUFZYSxLQUFaLEVBQW1CQyxTQUFuQixDQUE2QnhCLEVBQUUsQ0FBQ3lCLE1BQUgsQ0FBVSxHQUFWLEVBQWV6QixFQUFFLENBQUMwQixFQUFILENBQU0zQixJQUFJLENBQUNXLE1BQUwsQ0FBWWEsS0FBWixFQUFtQkksQ0FBekIsRUFBNEI1QixJQUFJLENBQUNRLE9BQUwsQ0FBYWUsT0FBYixDQUE1QixDQUFmLENBQTdCO0FBQ0g7QUFDSixLQUpEO0FBS0gsR0F2Q0k7QUF3Q0xNLEVBQUFBLEtBeENLLG1CQXdDRyxDQUVQLENBMUNJLENBNENMOztBQTVDSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2VsZiA9IG51bGw7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgSmFja3BvdExhYmVsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHp1b2JpYW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlN0cmluZ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuYWxsbnVtID0gdGhpcy5KYWNrcG90TGFiZWwuY2hpbGRyZW47XHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcbiAgICB9LFxyXG4gICAgU2hvd0phY2tQb3QobnVtKSB7XHJcbiAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtIC8gMTAwKTtcclxuICAgICAgICBudW0gKz0gJyc7XHJcbiAgICAgICAgbnVtID0gbnVtLnNwbGl0KCcnKTtcclxuICAgICAgICB2YXIgbnVtMSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBudW0ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHsgLy/mlbDlrZflj5jkuLrlgJLluo9cclxuICAgICAgICAgICAgbnVtMS5wdXNoKG51bVtpXSk7XHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWEobnVtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWEobnVtMSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCchISEhJyxudW0xKTtcclxuICAgICAgICBudW0xLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7IC8v5o6n5Yi25q+P5LiA5L2N55qE5pWw5a2X6YCJ5oupXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9ICcuJykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbGxudW1baW5kZXhdLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC41LCBjYy52MihzZWxmLmFsbG51bVtpbmRleF0ueCwgc2VsZi56dW9iaWFvW2VsZW1lbnRdKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7Il19