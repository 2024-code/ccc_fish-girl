
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/game_bcbm/js/zhuanpan_bcbm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '738acsCJcNEvKOoWYAFj+te', 'zhuanpan_bcbm');
// Texture/game_bcbm/js/zhuanpan_bcbm.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    AnimationArrayItem: {
      "default": [],
      type: [cc.Animation],
      tooltip: '图标的淡出动画'
    },
    AudioSourceArrayItem: {
      "default": [],
      type: [cc.AudioSource],
      tooltip: '图标的中奖音效'
    },
    JiaSuDu_QiDong: {
      "default": 3,
      tooltip: '启动的加速度（需要经过几个图标才能加速到最大速度）'
    },
    JiaSuDu_ZhiDong: {
      "default": 3,
      tooltip: '制动的加速度（需要经过几个图标才能减速到停止）'
    },
    SpeedChangeForOneStep: {
      "default": 0.1,
      tooltip: '加速或减速过程中，每完成一个step速度的改变量（时间）'
    },
    MaxSpeed: {
      "default": 12,
      tooltip: '每秒钟闪过的图标数'
    },
    AudioSourceLaunch: {
      "default": null,
      type: cc.AudioSource,
      tooltip: '启动音效'
    },
    AudioSourcePaoMa: {
      "default": null,
      type: cc.AudioSource,
      tooltip: '跑马音效'
    },
    AudioSourceStop: {
      "default": null,
      type: cc.AudioSource,
      tooltip: '停止音效'
    },
    AudioSourceDaQiang: {
      "default": null,
      type: cc.AudioSource,
      tooltip: '打枪音效'
    },
    TimeIntervalDaQiang: {
      "default": 0.8,
      tooltip: '两次打枪之间的间隔时间（秒）'
    }
  },
  start: function start() {
    this._arrayLength = this.AnimationArrayItem.length; //数组的长度

    this._currentIndex = 0; //当前的数组索引

    this._timeForOneItem = 1 / this.MaxSpeed; //最大速度下闪过一个图标需要的时间

    this._accTime = 0; //在两个相邻图标间的累积停顿时间

    this._timeArrayJiaSu = new Array(this.JiaSuDu_QiDong); //加速过程

    this._timeArrayJianSu = new Array(this.JiaSuDu_ZhiDong); //减速过程

    var time = this._timeForOneItem;

    for (var i = this.JiaSuDu_QiDong - 1; i > -1; i--) {
      time += this.SpeedChangeForOneStep;
      this._timeArrayJiaSu[i] = time;
    }

    time = this._timeForOneItem;

    for (var i = 0; i < this.JiaSuDu_ZhiDong; i++) {
      time += this.SpeedChangeForOneStep;
      this._timeArrayJianSu[i] = time;
    }

    this._indexJiaSu = -1; //加速过程数组的索引

    this._indexJianSu = -1; //减速过程数组的索引

    this._isMove = false;
  },
  update: function update(dt) {
    if (this._isJianSu) {
      //需要减速
      if (this._currentIndex === this._indexZhiDong) {
        //到了开始减速的那个点
        this._indexJiaSu = -1;
        this._indexJianSu = 0;
        this._isJianSu = false;
        this.AudioSourceStop.play(); //播放停止音效
      }
    }

    if (this._indexJiaSu >= 0 || this._indexJianSu >= 0) {
      if (this._indexJiaSu >= 0) {
        //加速过程
        this._accTime += dt;

        if (this._accTime > this._timeArrayJiaSu[this._indexJiaSu]) {
          this._accTime = 0;
          this.MoveAStep();
          this._indexJiaSu++; //完成了加速过程的一个step

          if (this._indexJiaSu >= this.JiaSuDu_QiDong) {
            //完成了整个加速过程
            this._isMove = true;
            this._indexJiaSu = -1;
          }
        }
      }

      if (this._indexJianSu >= 0) {
        //减速过程
        this._accTime += dt;

        if (this._accTime > this._timeArrayJianSu[this._indexJianSu]) {
          this._accTime = 0;
          this.MoveAStep();
          this._indexJianSu++; //完成了减速过程的一个step

          if (this._indexJianSu >= this.JiaSuDu_ZhiDong) {
            //完成了整个减速过程
            this._isMove = false;
            this._indexJianSu = -1;

            this.AnimationArrayItem[this._currentIndex].stop();

            this.AnimationArrayItem[this._currentIndex].node.opacity = 255;
            this.AudioSourcePaoMa.stop(); //停止播放跑马音效

            this.AudioSourceArrayItem[Math.floor(Math.random() * this.AudioSourceArrayItem.length)].play(); //播放中奖音效

            this.DispatchEvent(); //中奖分析
          }
        }
      }
    } else {
      if (this._isMove) {
        this._accTime += dt;

        if (this._accTime > this._timeForOneItem) {
          this._accTime = 0;
          this.MoveAStep();
        }
      }
    }
  },
  Launch: function Launch() {
    for (var i = 0; i < this.AnimationArrayItem.length; i++) {
      this.AnimationArrayItem[i].play();
    }

    this._indexJiaSu = 0;
    this._indexJianSu = -1;
    this.AudioSourceLaunch.play(); //播放启动音效

    this.AudioSourcePaoMa.play(); //播放跑马音效
  },
  Stop: function Stop(indexStop) {
    this._indexZhiDong = (this._arrayLength + indexStop - this.JiaSuDu_ZhiDong) % this._arrayLength; //js的负数取模竟然还是负数，也是醉了！！

    this._isJianSu = true;
  },
  MoveAStep: function MoveAStep() {
    this._currentIndex++;
    this._currentIndex %= this._arrayLength;

    this.AnimationArrayItem[this._currentIndex].play();
  },
  //投递事件
  DispatchEvent: function DispatchEvent() {
    this.node.dispatchEvent(new cc.Event.EventCustom('Event_ZhuanPanStop', true));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcZ2FtZV9iY2JtXFxqc1xcemh1YW5wYW5fYmNibS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkFuaW1hdGlvbkFycmF5SXRlbSIsInR5cGUiLCJBbmltYXRpb24iLCJ0b29sdGlwIiwiQXVkaW9Tb3VyY2VBcnJheUl0ZW0iLCJBdWRpb1NvdXJjZSIsIkppYVN1RHVfUWlEb25nIiwiSmlhU3VEdV9aaGlEb25nIiwiU3BlZWRDaGFuZ2VGb3JPbmVTdGVwIiwiTWF4U3BlZWQiLCJBdWRpb1NvdXJjZUxhdW5jaCIsIkF1ZGlvU291cmNlUGFvTWEiLCJBdWRpb1NvdXJjZVN0b3AiLCJBdWRpb1NvdXJjZURhUWlhbmciLCJUaW1lSW50ZXJ2YWxEYVFpYW5nIiwic3RhcnQiLCJfYXJyYXlMZW5ndGgiLCJsZW5ndGgiLCJfY3VycmVudEluZGV4IiwiX3RpbWVGb3JPbmVJdGVtIiwiX2FjY1RpbWUiLCJfdGltZUFycmF5SmlhU3UiLCJBcnJheSIsIl90aW1lQXJyYXlKaWFuU3UiLCJ0aW1lIiwiaSIsIl9pbmRleEppYVN1IiwiX2luZGV4SmlhblN1IiwiX2lzTW92ZSIsInVwZGF0ZSIsImR0IiwiX2lzSmlhblN1IiwiX2luZGV4WmhpRG9uZyIsInBsYXkiLCJNb3ZlQVN0ZXAiLCJzdG9wIiwibm9kZSIsIm9wYWNpdHkiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEaXNwYXRjaEV2ZW50IiwiTGF1bmNoIiwiU3RvcCIsImluZGV4U3RvcCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsIkV2ZW50Q3VzdG9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsa0JBQWtCLEVBQUU7QUFDaEIsaUJBQVMsRUFETztBQUVoQkMsTUFB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TUFBNUMsRUFBb0RRLENBQUMsRUFBckQsRUFBeUQ7QUFDckQsV0FBS3pCLGtCQUFMLENBQXdCeUIsQ0FBeEIsRUFBMkJRLElBQTNCO0FBQ0g7O0FBQ0QsU0FBS1AsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsQ0FBQyxDQUFyQjtBQUNBLFNBQUtqQixpQkFBTCxDQUF1QnVCLElBQXZCLEdBTmdCLENBTWM7O0FBQzlCLFNBQUt0QixnQkFBTCxDQUFzQnNCLElBQXRCLEdBUGdCLENBT2E7QUFDaEMsR0ExSUk7QUE0SUxVLEVBQUFBLElBQUksRUFBRSxjQUFVQyxTQUFWLEVBQXFCO0FBQ3ZCLFNBQUtaLGFBQUwsR0FBcUIsQ0FBQyxLQUFLaEIsWUFBTCxHQUFvQjRCLFNBQXBCLEdBQWdDLEtBQUtyQyxlQUF0QyxJQUF5RCxLQUFLUyxZQUFuRixDQUR1QixDQUN5RTs7QUFDaEcsU0FBS2UsU0FBTCxHQUFpQixJQUFqQjtBQUNILEdBL0lJO0FBaUpMRyxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsU0FBS2hCLGFBQUw7QUFDQSxTQUFLQSxhQUFMLElBQXNCLEtBQUtGLFlBQTNCOztBQUNBLFNBQUtoQixrQkFBTCxDQUF3QixLQUFLa0IsYUFBN0IsRUFBNENlLElBQTVDO0FBQ0gsR0FySkk7QUF1Skw7QUFDQVEsRUFBQUEsYUFBYSxFQUFFLHlCQUFZO0FBQ3ZCLFNBQUtMLElBQUwsQ0FBVVMsYUFBVixDQUF3QixJQUFJakQsRUFBRSxDQUFDa0QsS0FBSCxDQUFTQyxXQUFiLENBQXlCLG9CQUF6QixFQUErQyxJQUEvQyxDQUF4QjtBQUNIO0FBMUpJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQW5pbWF0aW9uQXJyYXlJdGVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuQW5pbWF0aW9uXSxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+Wbvuagh+eahOa3oeWHuuWKqOeUuycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBBdWRpb1NvdXJjZUFycmF5SXRlbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLkF1ZGlvU291cmNlXSxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+Wbvuagh+eahOS4reWllumfs+aViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBKaWFTdUR1X1FpRG9uZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAzLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn5ZCv5Yqo55qE5Yqg6YCf5bqm77yI6ZyA6KaB57uP6L+H5Yeg5Liq5Zu+5qCH5omN6IO95Yqg6YCf5Yiw5pyA5aSn6YCf5bqm77yJJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEppYVN1RHVfWmhpRG9uZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAzLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn5Yi25Yqo55qE5Yqg6YCf5bqm77yI6ZyA6KaB57uP6L+H5Yeg5Liq5Zu+5qCH5omN6IO95YeP6YCf5Yiw5YGc5q2i77yJJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNwZWVkQ2hhbmdlRm9yT25lU3RlcDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLjEsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfliqDpgJ/miJblh4/pgJ/ov4fnqIvkuK3vvIzmr4/lrozmiJDkuIDkuKpzdGVw6YCf5bqm55qE5pS55Y+Y6YeP77yI5pe26Ze077yJJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1heFNwZWVkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEyLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn5q+P56eS6ZKf6Zeq6L+H55qE5Zu+5qCH5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEF1ZGlvU291cmNlTGF1bmNoOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvU291cmNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn5ZCv5Yqo6Z+z5pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEF1ZGlvU291cmNlUGFvTWE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9Tb3VyY2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfot5Hpqazpn7PmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQXVkaW9Tb3VyY2VTdG9wOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvU291cmNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn5YGc5q2i6Z+z5pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEF1ZGlvU291cmNlRGFRaWFuZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb1NvdXJjZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+aJk+aequmfs+aViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBUaW1lSW50ZXJ2YWxEYVFpYW5nOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAuOCxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+S4pOasoeaJk+aequS5i+mXtOeahOmXtOmalOaXtumXtO+8iOenku+8iScsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9hcnJheUxlbmd0aCA9IHRoaXMuQW5pbWF0aW9uQXJyYXlJdGVtLmxlbmd0aDsvL+aVsOe7hOeahOmVv+W6plxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDA7Ly/lvZPliY3nmoTmlbDnu4TntKLlvJVcclxuICAgICAgICB0aGlzLl90aW1lRm9yT25lSXRlbSA9IDEgLyB0aGlzLk1heFNwZWVkOy8v5pyA5aSn6YCf5bqm5LiL6Zeq6L+H5LiA5Liq5Zu+5qCH6ZyA6KaB55qE5pe26Ze0XHJcbiAgICAgICAgdGhpcy5fYWNjVGltZSA9IDA7Ly/lnKjkuKTkuKrnm7jpgrvlm77moIfpl7TnmoTntK/np6/lgZzpob/ml7bpl7RcclxuICAgICAgICB0aGlzLl90aW1lQXJyYXlKaWFTdSA9IG5ldyBBcnJheSh0aGlzLkppYVN1RHVfUWlEb25nKTsvL+WKoOmAn+i/h+eoi1xyXG4gICAgICAgIHRoaXMuX3RpbWVBcnJheUppYW5TdSA9IG5ldyBBcnJheSh0aGlzLkppYVN1RHVfWmhpRG9uZyk7Ly/lh4/pgJ/ov4fnqItcclxuICAgICAgICB2YXIgdGltZSA9IHRoaXMuX3RpbWVGb3JPbmVJdGVtO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLkppYVN1RHVfUWlEb25nIC0gMTsgaSA+IC0xOyBpLS0pIHtcclxuICAgICAgICAgICAgdGltZSArPSB0aGlzLlNwZWVkQ2hhbmdlRm9yT25lU3RlcDtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUFycmF5SmlhU3VbaV0gPSB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aW1lID0gdGhpcy5fdGltZUZvck9uZUl0ZW07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkppYVN1RHVfWmhpRG9uZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRpbWUgKz0gdGhpcy5TcGVlZENoYW5nZUZvck9uZVN0ZXA7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVBcnJheUppYW5TdVtpXSA9IHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2luZGV4SmlhU3UgPSAtMTsvL+WKoOmAn+i/h+eoi+aVsOe7hOeahOe0ouW8lVxyXG4gICAgICAgIHRoaXMuX2luZGV4SmlhblN1ID0gLTE7Ly/lh4/pgJ/ov4fnqIvmlbDnu4TnmoTntKLlvJVcclxuICAgICAgICB0aGlzLl9pc01vdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNKaWFuU3UpIHsvL+mcgOimgeWHj+mAn1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudEluZGV4ID09PSB0aGlzLl9pbmRleFpoaURvbmcpIHsvL+WIsOS6huW8gOWni+WHj+mAn+eahOmCo+S4queCuVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5kZXhKaWFTdSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5kZXhKaWFuU3UgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNKaWFuU3UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQXVkaW9Tb3VyY2VTdG9wLnBsYXkoKTsvL+aSreaUvuWBnOatoumfs+aViFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faW5kZXhKaWFTdSA+PSAwIHx8IHRoaXMuX2luZGV4SmlhblN1ID49IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4SmlhU3UgPj0gMCkgey8v5Yqg6YCf6L+H56iLXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2NUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjY1RpbWUgPiB0aGlzLl90aW1lQXJyYXlKaWFTdVt0aGlzLl9pbmRleEppYVN1XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTW92ZUFTdGVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXhKaWFTdSsrOy8v5a6M5oiQ5LqG5Yqg6YCf6L+H56iL55qE5LiA5Liqc3RlcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleEppYVN1ID49IHRoaXMuSmlhU3VEdV9RaURvbmcpIHsvL+WujOaIkOS6huaVtOS4quWKoOmAn+i/h+eoi1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc01vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleEppYVN1ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleEppYW5TdSA+PSAwKSB7Ly/lh4/pgJ/ov4fnqItcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWNjVGltZSA+IHRoaXMuX3RpbWVBcnJheUppYW5TdVt0aGlzLl9pbmRleEppYW5TdV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY2NUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1vdmVBU3RlcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4SmlhblN1Kys7Ly/lrozmiJDkuoblh4/pgJ/ov4fnqIvnmoTkuIDkuKpzdGVwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4SmlhblN1ID49IHRoaXMuSmlhU3VEdV9aaGlEb25nKSB7Ly/lrozmiJDkuobmlbTkuKrlh4/pgJ/ov4fnqItcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4SmlhblN1ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQW5pbWF0aW9uQXJyYXlJdGVtW3RoaXMuX2N1cnJlbnRJbmRleF0uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkFuaW1hdGlvbkFycmF5SXRlbVt0aGlzLl9jdXJyZW50SW5kZXhdLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5BdWRpb1NvdXJjZVBhb01hLnN0b3AoKTsvL+WBnOatouaSreaUvui3kemprOmfs+aViFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkF1ZGlvU291cmNlQXJyYXlJdGVtW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuQXVkaW9Tb3VyY2VBcnJheUl0ZW0ubGVuZ3RoKV0ucGxheSgpOy8v5pKt5pS+5Lit5aWW6Z+z5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRGlzcGF0Y2hFdmVudCgpOy8v5Lit5aWW5YiG5p6QXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2NUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjY1RpbWUgPiB0aGlzLl90aW1lRm9yT25lSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTW92ZUFTdGVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIExhdW5jaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5BbmltYXRpb25BcnJheUl0ZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbmltYXRpb25BcnJheUl0ZW1baV0ucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pbmRleEppYVN1ID0gMDtcclxuICAgICAgICB0aGlzLl9pbmRleEppYW5TdSA9IC0xO1xyXG4gICAgICAgIHRoaXMuQXVkaW9Tb3VyY2VMYXVuY2gucGxheSgpOy8v5pKt5pS+5ZCv5Yqo6Z+z5pWIXHJcbiAgICAgICAgdGhpcy5BdWRpb1NvdXJjZVBhb01hLnBsYXkoKTsvL+aSreaUvui3kemprOmfs+aViFxyXG4gICAgfSxcclxuXHJcbiAgICBTdG9wOiBmdW5jdGlvbiAoaW5kZXhTdG9wKSB7XHJcbiAgICAgICAgdGhpcy5faW5kZXhaaGlEb25nID0gKHRoaXMuX2FycmF5TGVuZ3RoICsgaW5kZXhTdG9wIC0gdGhpcy5KaWFTdUR1X1poaURvbmcpICUgdGhpcy5fYXJyYXlMZW5ndGg7Ly9qc+eahOi0n+aVsOWPluaooeern+eEtui/mOaYr+i0n+aVsO+8jOS5n+aYr+mGieS6hu+8ge+8gVxyXG4gICAgICAgIHRoaXMuX2lzSmlhblN1ID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgTW92ZUFTdGVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ICU9IHRoaXMuX2FycmF5TGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuQW5pbWF0aW9uQXJyYXlJdGVtW3RoaXMuX2N1cnJlbnRJbmRleF0ucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+aKlemAkuS6i+S7tlxyXG4gICAgRGlzcGF0Y2hFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbSgnRXZlbnRfWmh1YW5QYW5TdG9wJywgdHJ1ZSkpO1xyXG4gICAgfSxcclxuXHJcbn0pOyJdfQ==