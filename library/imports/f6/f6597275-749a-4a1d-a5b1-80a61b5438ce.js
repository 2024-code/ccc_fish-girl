"use strict";
cc._RF.push(module, 'f6597J1dJpKHaWxgKYbVDjO', 'paogou');
// Texture/game_saigou/paogou.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    NodeArray_mingci: {
      "default": [],
      type: [cc.Node],
      tooltip: "名次节点数组"
    },
    SpriteArray_jieguo: {
      "default": [],
      type: [cc.Sprite],
      tooltip: "结果图标数组"
    },
    SpriteFrameArray_haoma: {
      "default": [],
      type: [cc.SpriteFrame],
      tooltip: "号码图标资源数组"
    },
    AnimationArray_horse: {
      "default": [],
      type: [cc.Animation],
      tooltip: "赛马的动画组件数组"
    },
    AnimationClipArray_horseMove: {
      "default": [],
      type: [cc.AnimationClip],
      tooltip: "赛马移动的动画资源数组"
    },
    NodeArray_dibumingci: {
      "default": [],
      type: [cc.Node],
      tooltip: "底部名次节点数组"
    },
    Speed_dibumingci: {
      "default": 500,
      tooltip: "底部名次的移动速度"
    },
    Label_winCoins: {
      "default": null,
      type: cc.Label,
      tooltip: "赢金币文字"
    },
    AudioSource_launch: {
      "default": null,
      type: cc.AudioSource,
      tooltip: "比赛开始的音效"
    },
    AudioSource_guoxian: {
      "default": null,
      type: cc.AudioSource,
      tooltip: "赛马过终点线音效"
    },
    PhotoTime: {
      "default": 3,
      tooltip: "拍照时间"
    },
    Animation_daojishi: {
      "default": null,
      type: cc.Animation,
      tooltip: "倒计时动画"
    },
    Animation_changjing: {
      "default": null,
      type: cc.Animation,
      tooltip: "场景动画"
    },
    Node_GongXi: {
      "default": null,
      type: cc.Node,
      tooltip: "中奖节点"
    },
    Node_YiHan: {
      "default": null,
      type: cc.Node,
      tooltip: "未中奖节点"
    },
    _infinity: 999999
  },
  SetData: function SetData(arrayMingCi, winCoins) {
    this._arrayMingCi = arrayMingCi;
    this._winCoins = winCoins;
    var anim = this.Animation_daojishi.play();
    anim.on('finished', this.Launch, this);
  },
  Launch: function Launch() {
    this.Animation_daojishi.node.active = false;
    this.Animation_changjing.play();
    this.AudioSource_launch.play();
    this.Label_winCoins.string = this._winCoins;

    if (this._winCoins > 0) {
      this.Node_GongXi.active = true;
      this.Node_YiHan.active = false;
    } else {
      this.Node_GongXi.active = false;
      this.Node_YiHan.active = true;
    }

    this._arrayLength = this.NodeArray_mingci.length;
    this._posArrayMingCi = new Array(this._arrayLength);

    for (var i = 0; i < this._arrayLength; i++) {
      this._posArrayMingCi[i] = this.NodeArray_mingci[i].getPosition();
    }

    for (var i = 0; i < this._arrayLength; i++) {
      this.NodeArray_mingci[i].setPosition(this._posArrayMingCi[this._arrayMingCi[i]]);
      this.NodeArray_mingci[i].active = false;
    }

    for (var i = 0; i < this.SpriteArray_jieguo.length; i++) {
      var index = 0;

      for (var j = 0; j < this._arrayLength; j++) {
        if (this._arrayMingCi[j] === i) {
          index = j;
        }
      }

      this.SpriteArray_jieguo[i].spriteFrame = this.SpriteFrameArray_haoma[index];
    }

    var guoxian = 0;
    var self = this;

    for (var i = 0; i < this._arrayLength; i++) {
      this.AnimationArray_horse[i].play();
      this.AnimationArray_horse[i].addClip(this.AnimationClipArray_horseMove[this._arrayMingCi[i]], "mingci");
      this.AnimationArray_horse[i].playAdditive("mingci");

      this.AnimationArray_horse[i].onAnimEvent_ZhongDian = function () {
        var index;

        for (var i = 0; i < self._arrayLength; i++) {
          if (self._arrayMingCi[i] === guoxian) {
            index = i;
            break;
          }
        }

        self.NodeArray_mingci[index].active = true;

        if (guoxian < 3) {
          //前三名拍照
          self.TakePhoto();
        }

        guoxian++;
      };
    }

    this._rankPosArray = new Array(this._arrayLength); //底部排名的坐标

    for (var i = 0; i < this._arrayLength; i++) {
      this._rankPosArray[i] = this.NodeArray_dibumingci[i].x;
    }

    this._targetPosArray = new Array(this._arrayLength); //目标坐标

    for (var i = 0; i < this._arrayLength; i++) {
      this._targetPosArray[i] = this._rankPosArray[this._arrayMingCi[i]];
    }

    this._currentPosArray = new Array(this._arrayLength); //当前坐标

    for (var i = 0; i < this._arrayLength; i++) {
      this._currentPosArray[i] = this.NodeArray_dibumingci[i].x;
    }

    this._nodeArrayHorse = new Array(this._arrayLength); //赛马节点数组

    for (var i = 0; i < this._arrayLength; i++) {
      this._nodeArrayHorse[i] = this.AnimationArray_horse[i].node;
    }

    this._arrayRanking = new Array(this._arrayLength); //名次数组

    this._arrayHorsePos = new Array(this._arrayLength); //赛马位置数组
  },
  onBtnClick_back: function onBtnClick_back() {
    this.node.dispatchEvent(new cc.Event.EventCustom('Event_PaoGouConfirm', true));
    this.node.destroy();
  },
  update: function update(dt) {
    for (var i = 0; i < this._arrayLength; i++) {
      this._arrayHorsePos[i] = this._nodeArrayHorse[i].x;
    }

    this.Rank();

    for (var i = 0; i < this._arrayLength; i++) {
      this._targetPosArray[i] = this._rankPosArray[this._arrayRanking[i]];
    }

    var distance = this.Speed_dibumingci * dt; //这一帧移动的距离

    for (var i = 0; i < this._arrayLength; i++) {
      var sub = this._targetPosArray[i] - this._currentPosArray[i];
      var absSub = Math.abs(sub);

      if (absSub > 0.01) {
        //没到目标点
        var move = 0;

        if (absSub > distance) {
          //相差的距离大于这一帧移动的距离
          if (sub > 0) {
            move = distance;
          } else {
            move = -distance;
          }
        } else {
          move = sub;
        }

        this._currentPosArray[i] += move;
        this.NodeArray_dibumingci[i].x = this._currentPosArray[i];
      }
    }
  },
  Rank: function Rank() {
    var index; //最小值的索引

    var min_X; //最小值

    for (var ranking = this._arrayLength - 1; ranking > -1; ranking--) {
      min_X = this._infinity;

      for (var i = 0; i < this._arrayLength; i++) {
        if (this._arrayHorsePos[i] < min_X) {
          min_X = this._arrayHorsePos[i];
          index = i;
        }
      }

      this._arrayRanking[index] = ranking;
      this._arrayHorsePos[index] = this._infinity;
    }
  },
  TakePhoto: function TakePhoto() {
    this.AudioSource_guoxian.play();

    for (var i = 0; i < this._arrayLength; i++) {
      this.AnimationArray_horse[i].pause();
    }

    this.scheduleOnce(function () {
      for (var i = 0; i < this._arrayLength; i++) {
        this.AnimationArray_horse[i].resume();
      }
    }, this.PhotoTime);
  }
});

cc._RF.pop();