"use strict";
cc._RF.push(module, '042a83K4O5IvJiQQE2idlPG', 'TriangleMain');
// Script/Triangle/TriangleMain.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    unitNode: cc.Node,
    frameList: [cc.SpriteFrame],
    lineNode: cc.Node,
    moneyLbl: cc.Label,
    awardLbl: cc.Label,
    awardPoorLbl: cc.Label,
    betLbl: cc.Label,
    msgLayout: cc.Node
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.net = this.node.getComponent('TriangleNetwork');
    this.audio = this.node.getComponent('TriangleAudio');
    this.status = 0;
    this.bet = 0;
  },
  start: function start() {
    this.betLbl.string = '0.00';
    this.awardLbl.string = '0.00';
    this.units = [];

    for (var i in this.unitNode.children) {
      var unit = this.unitNode.children[i];

      if (unit.name.indexOf('TriangleFrameBG') == -1) {
        this.units.push(unit);
        unit.originpos = unit.position;
      }
    }

    for (var _i in this.units) {
      this.units[_i].active = false;
    }

    this.unitNode.getChildByName("TriangleFrameBG01").zIndex = 40;
    this.unitNode.getChildByName("TriangleFrameBG02").zIndex = 20;
    this.hideLine(); // this.showLine(0, 3);
  },
  onClick: function onClick(ev, args) {
    if (args == 'close') {
      cc.director.loadScene("LobbyMain");
    } else if (args == 'up') {
      this.bet += 1;
      this.betLbl.string = this.bet.toFixed(2);
    } else if (args == 'down') {
      this.bet -= 1;
      this.bet = this.bet >= 0 ? this.bet : 0;
      this.betLbl.string = this.bet.toFixed(2);
    } else if (args == 'bet') {
      this.betFunc();
    }
  },
  betFunc: function betFunc() {
    if (this.status == 0 && this.bet > 0) {
      this.status = 1;
      this.audio.playBtnEf();
      this.msgLayout.removeAllChildren();
      this.net.socket.emit('lottery', this.bet * 100);
    }
  },
  showUnit: function showUnit(colorList) {
    var _this = this;

    var time_0 = 1;
    var time_1 = 0.1;
    this.scheduleOnce(function () {
      _this.audio.playFlyInEf();
    }, 0.8);

    for (var i in this.units) {
      var sp = this.units[i].getComponent(cc.Sprite);
      sp.spriteFrame = this.frameList[colorList[i]];
      var time_2 = parseInt(i) * 0.08;
      var unit = this.units[i];
      unit.active = true;
      unit.zIndex = 30;
      unit.scale = 1;
      unit.stopAllActions();
      unit.position = cc.v2(unit.originpos.x + 1150, unit.originpos.y);
      unit.runAction(cc.sequence(cc.delayTime(time_2), cc.jumpBy(time_0, cc.v2(-1200, 0), 75, 1), cc.callFunc(function () {
        _this.zIndex = 30;
      }, unit), cc.moveBy(time_1, 50, 0)));
      unit.runAction(cc.sequence(cc.delayTime(time_2), cc.repeat(cc.sequence(cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1)), 3)));
    }
  },
  changeColor: function changeColor(id, color) {
    var _this2 = this;

    var sp = this.units[id].getComponent(cc.Sprite);
    this.units[id].runAction(cc.sequence(cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1), cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1), cc.callFunc(function () {
      sp.spriteFrame = _this2.frameList[color];
    }), cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1)));
  },
  showLine: function showLine(id, color) {
    var nameList = ['GrayLineV', 'PurpleLineV', 'BlueLineV', 'CyanLineV', 'GreenLineV', 'YellowLineV', 'OrangeLineV', 'RedLineV'];
    var line = this.lineNode.getChildByName(id);
    var actNode = line.getChildByName(nameList[color]);
    actNode.active = true;
  },
  hideLine: function hideLine() {
    var linePr = this.lineNode.children;

    for (var i in linePr) {
      var pr = linePr[i].children;

      for (var j in pr) {
        pr[j].active = false;
      }
    }
  },
  wheelFunc: function wheelFunc(viewarray, data, index) {
    var _this3 = this;

    if (viewarray[index].client_win_color_dict.length == 0) {
      this.scheduleOnce(function () {
        _this3.status = 0;
      }, 1.5);
      this.awardLbl.string = (data.ResultData.winscore / 100).toFixed(2);
      this.moneyLbl.string = (data.ResultData.userscore / 100).toFixed(2);
      return;
    }

    this.scheduleOnce(function () {
      _this3.hideLine();

      var lines = viewarray[index].client_win_color_dict;

      for (var i in lines) {
        console.log(lines[i].s, lines[i].c);

        _this3.showLine(lines[i].s, lines[i].c);
      }

      var _loop = function _loop(_i2) {
        var data = viewarray[index].win_score_list[_i2];
        var node = new cc.Node();

        _this3.msgLayout.addChild(node);

        node.runAction(cc.sequence(cc.delayTime(1.5), cc.fadeOut(0.8), cc.callFunc(function () {
          node.removeFromParent();
        })));
        var colorList = [new cc.Color(125, 127, 127, 255), new cc.Color(89, 2, 171, 255), new cc.Color(13, 169, 198, 255), new cc.Color(195, 2, 194, 255), new cc.Color(67, 177, 0, 255), new cc.Color(215, 215, 0, 255), new cc.Color(187, 105, 0, 255), new cc.Color(229, 3, 3, 25)];
        var lbl = node.addComponent(cc.Label);
        lbl.string = '+' + (data.s / 100).toFixed(2); // node.color = 

        var outLine = node.addComponent(cc.LabelOutline);
        outLine.color = colorList[data.c];
        outLine.width = 5;
      };

      for (var _i2 in viewarray[index].win_score_list) {
        _loop(_i2);
      }
    }, 2.5);
    this.scheduleOnce(function () {
      _this3.hideLine();

      _this3.audio.playDelEf();

      var changeList = viewarray[index].win_index;
      var newList = viewarray[index + 1].res;

      for (var i in changeList) {
        _this3.changeColor(changeList[i], newList[changeList[i]]);
      }

      _this3.wheelFunc(viewarray, data, index + 1);
    }, 3);
  }
});

cc._RF.pop();