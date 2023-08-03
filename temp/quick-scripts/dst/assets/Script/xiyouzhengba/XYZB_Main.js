
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/xiyouzhengba/XYZB_Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cbd5arfDgpIAq0hwhic/Ewi', 'XYZB_Main');
// Script/xiyouzhengba/XYZB_Main.js

"use strict";

var BETSLIST = [10, 20, 50, 100, 500]; //bets

var ODDSLIST = [0, 23, 12, 20, 13, 7, 11, 8, 4, 7, 46, 25, 40, 0, 23, 12, 20, 13, 7, 11, 8, 4, 7, 46, 25, 40]; //odds for wheel

var AUDIOROLELIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //Role Audio

var ROLECOLORLSIT = [0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]; //Role Color

cc.Class({
  "extends": cc.Component,
  properties: {
    bgMapList: [cc.Node],
    cartoonNode: cc.Node,
    wheel1: cc.Node,
    wheel2: cc.Node,
    userNameLbl: cc.Label,
    userIDLbl: cc.Label,
    userCoinLbl: cc.Label,
    userHead: cc.Sprite,
    chipArea: cc.Node,
    zxhSp: [cc.SpriteFrame],
    historyNode: cc.Node,
    selBetLbl: cc.Label,
    betScoreLbl: cc.Label,
    betUILblList: [cc.Label],
    timerLbl: cc.Label,
    scoreLbl: cc.Label,
    pkNode: cc.Node,
    PKAtlas: cc.SpriteAtlas,
    waitMask: cc.Node,
    musicNode: cc.Node,
    resultWheel: cc.Node,
    mothSprite: cc.Sprite,
    exitBtn: cc.Node,
    helpUI: cc.Node
  },
  onLoad: function onLoad() {
    this.cartoonBright = []; //cartoon bright nodes

    this.cartoonAnims = []; //cartoon animations

    this.cartoonSp = []; //cartoon spriteFrames

    this.runGameBool = false; //game start

    this.selBetIndex = 0; //index of BETSLIST

    this.network = this.getComponent('XYZB_Network');
    this.audio = this.musicNode.getComponent('XYZB_Audio');
    this.curWheel = [0, 0];
    this.curBetScore = 0; //Score of current bet

    this.curBet = []; //Details of current bet

    this.lastBet = []; //Details of last bet

    this.betTimeBool = false; //for timer
    //init cartoonNode node

    var prNode = this.cartoonNode.children;

    for (var i in prNode) {
      var cNode = prNode[i].children;
      this.cartoonBright.push(cNode[0]);
      this.cartoonAnims.push(cNode[1]);
      this.cartoonSp.push(cNode[0].getComponent(cc.Sprite).spriteFrame);
    } //init wheel list


    this.wheelCardList1 = [];
    var wheelCh1 = this.wheel1.children;

    for (var _i in wheelCh1) {
      this.wheelCardList1.push(wheelCh1[_i]);
    }

    this.wheelCardList2 = [];
    var wheelCh2 = this.wheel2.children;

    for (var _i2 in wheelCh2) {
      this.wheelCardList2.push(wheelCh2[_i2]);
    }

    this.historyList = this.historyNode.children;
    this.scoreLbl.string = '0.00';
    this.lastGamePoint = 0;
    this.mothN = 2;
  },
  start: function start() {
    this.audio.stopAll();
    this.changeMap();
  },
  startBets: function startBets() {
    this.exitBtn.y = 300;
    this.waitMask.active = false;

    for (var i in this.cartoonBright) {
      if (this.cartoonAnims[i]) {
        this.cartoonAnims[i].active = false;
      }

      this.cartoonBright[i].active = false;
    }

    this.betTimeBool = true;
    this.clearCurBet();
    this.chipArea.runAction(cc.moveTo(0.2, cc.v2(0, 0)));
  },
  clearCurBet: function clearCurBet() {
    this.curBet = [];
    this.curBetScore = 0;
    this.betScoreLbl.string = this.curBetScore.toFixed(2);

    for (var i in this.betUILblList) {
      if (!!this.betUILblList[i]) {
        this.betUILblList[i].string = '0.00';
      }
    }
  },
  closeBets: function closeBets() {
    this.exitBtn.y = 182;
    this.betTimeBool = false;
    var sendJsonList = [];

    for (var i in this.curBet) {
      if (!!this.curBet) {
        var sendJson = {
          nBetItem: i <= 12 ? 1 : 2,
          strBetValue: i <= 12 ? parseInt(i) : parseInt(i) - 13,
          nBet: this.curBet[i] * 100
        };
        sendJsonList.push(sendJson);
      }
    }

    if (sendJsonList.length > 0) {
      this.network.socket.emit('lottery', JSON.stringify(sendJsonList));
    }

    this.lastBet = [].concat(this.curBet);
    this.chipArea.runAction(cc.moveTo(0.2, cc.v2(0, -1500)));
    this.scoreLbl.string = '0.00';
    this.userCoinLbl.string = (this.network.userCoin - this.curBetScore).toFixed(2);
  },
  showBet: function showBet(index) {
    if (!!this.curBet[index]) {
      this.curBet[index] += BETSLIST[this.selBetIndex];
    } else {
      this.curBet[index] = BETSLIST[this.selBetIndex];
    }

    this.curBetScore += BETSLIST[this.selBetIndex];
    this.betScoreLbl.string = this.curBetScore.toFixed(2);
    this.betUILblList[index].string = this.curBet[index].toFixed(2);
  },
  onClick: function onClick(ev, args) {
    switch (args) {
      case 'home':
        this.network.socket.disconnect();
        cc.director.loadScene("LobbyMain");
        break;

      case 'clearCurBet':
        this.clearCurBet();
        this.audio.playClearBet();
        break;

      case 'changeSelBetIndex':
        this.selBetIndex++;

        if (this.selBetIndex > 4) {
          this.selBetIndex = 0;
        }

        this.audio.playChangeBet();
        this.selBetLbl.string = BETSLIST[this.selBetIndex].toFixed(2);
        break;

      case 'continued mortgage':
        this.audio.playReBet();
        this.clearCurBet();
        this.curBet = [].concat(this.lastBet);

        for (var i in this.curBet) {
          if (!!this.curBet[i]) {
            if (this.curBetScore + this.curBet[i] <= this.network.userCoin) {
              this.curBetScore += this.curBet[i];
              this.betScoreLbl.string = this.curBetScore.toFixed(2);
              this.betUILblList[i].string = this.curBet[i].toFixed(2);
            } else {
              console.log('金币不足');
            }
          }
        }

        break;

      case 'help':
        this.helpUI.active = true;
        break;

      case 'close help':
        this.helpUI.active = false;
        break;

      default:
        if (parseInt(args) == args) {
          if (this.curBetScore + BETSLIST[this.selBetIndex] <= this.network.userCoin) {
            this.showBet(parseInt(args));
            this.audio.playBet();
          } else {
            console.log('金币不足');
          }
        }

        break;
    }
  },

  /**
   * start game animation
   * @param {stop id} targetId 
   * @param {begin id} beginId 
   */
  lottertDraw: function lottertDraw(targetId, beginId, wheel1, wheel2) {
    if (beginId === void 0) {
      beginId = Math.floor(Math.random() * 26);
    }

    this.lastGamePoint = targetId;
    this.runGameBool = true;
    targetId = targetId - beginId;
    this.targetPoints = 26 * 4 + targetId;
    this.accPoints = this.targetPoints * 0.5;
    this.accelerateRate = this.accPoints * 2 / 9;
    this.speedMax = this.accelerateRate * 3;
    this.beginPoint = beginId;
    this.lastPoint = beginId;
    this.curPoint = beginId;
    this.accTime = 0;
    this.decTime = 0; //wheel

    this.wTarget = [wheel1, wheel2];
    var distance = 85 * 4 * 10;
    var offset1 = Math.abs(this.wTarget[0] - this.curWheel[0]) * 85;
    var offset2 = Math.abs(this.wTarget[1] - this.curWheel[1]) * 85; //x= at^2;

    this.wAccelerate = [(distance + offset1) / 6 / 60, (distance + offset2) / 6 / 60];
  },
  brightAnim: function brightAnim(beginId, targetId) {
    beginId = parseInt(beginId % 26);
    targetId = parseInt(targetId % 26);

    if (targetId < beginId) {
      this.brightAnim(beginId, 25);
      this.brightAnim(0, targetId);
      return;
    }

    for (var i = beginId; i <= targetId; i++) {
      this.cartoonBright[i].active = true;
    }
  },
  rollWheel: function rollWheel(wheelId) {
    var wheelList = wheelId == 1 ? this.wheelCardList1 : this.wheelCardList2;

    for (var i in wheelList) {
      var speed = wheelId == 1 ? this.wAccelerate[0] : this.wAccelerate[1];
      wheelList[i].y += speed;

      if (wheelList[i].y >= 85) {
        if (parseInt(i) == 0) {
          wheelList[i].y = wheelList['3'].y - 85;
        } else {
          wheelList[i].y = wheelList[i - 1].y - 85;
        }
      }
    }
  },
  mothWheel: function mothWheel() {
    this.runMothTimes = this.runMothTimes || 0;
    this.runMothTimes++;

    if (this.runMothTimes % 3 == 0) {
      this.mothN++;

      if (this.mothN > 2) {
        this.mothN = 0;
      }

      this.mothSprite.spriteFrame = this.zxhSp[this.mothN];
    }
  },
  setMothEnd: function setMothEnd() {
    this.mothSprite.spriteFrame = this.zxhSp[this.mothResult];
  },
  setWheelEnd: function setWheelEnd(wheelId) {
    var wheelList = wheelId == 1 ? this.wheelCardList1 : this.wheelCardList2;
    var wt = this.wTarget[wheelId == 1 ? 0 : 1];
    wheelList[wt].y = 0;
    var position = [[0, -85, -170, -255], [-255, 0, -85, -170], [-170, -255, 0, -85], [-85, -170, -255, 0]];

    for (var i in wheelList) {
      wheelList[i].y = position[wt][i];
    }
  },
  update: function update(dt) {
    if (this.betTimeBool) {
      var t = parseInt(new Date().getTime() / 1000 - this.network.timer);
      this.timerLbl.string = 40 - t > 0 ? 40 - t : 0;
    }

    if (this.runGameBool) {
      //main lottery draw
      if (this.curPoint < this.accPoints + this.beginPoint) {
        //accerate
        this.accTime += dt;
        var cp = parseInt(this.curPoint);
        this.curPoint = this.beginPoint + 0.5 * this.accelerateRate * this.accTime * this.accTime;

        if (cp != parseInt(this.curPoint)) {
          this.audio.playWheel();
        }
      } else {
        //slow down
        if (this.curPoint < this.targetPoints + this.beginPoint) {
          this.decTime += dt;

          var _cp = parseInt(this.curPoint);

          this.curPoint = this.beginPoint + this.targetPoints / 2 + this.speedMax * this.decTime - 0.5 * this.accelerateRate * this.decTime * this.decTime;

          if (this.speedMax < this.accelerateRate * this.decTime) {
            //stop lottery draw
            this.lastPoint = this.curPoint = this.targetPoints + this.beginPoint;
            this.runGameBool = false;
          }

          if (_cp != parseInt(this.curPoint)) {
            this.audio.playWheel();
          }
        } else {
          //stop lottery draw
          this.lastPoint = this.curPoint = this.targetPoints + this.beginPoint;
          this.runGameBool = false;
        }
      } //show lottert draw


      for (var i in this.cartoonBright) {
        this.cartoonBright[i].active = false;
      }

      this.brightAnim(this.lastPoint, this.curPoint);
      this.lastPoint = this.curPoint; //wheel lotterty draw

      if (this.runGameBool) {
        this.rollWheel(1);
        this.rollWheel(2);
        this.mothWheel();
      } else {
        this.setWheelEnd(1);
        this.setWheelEnd(2);
        this.setMothEnd();
        this.curWheel = [].concat(this.wTarget);
      }
    }
  },
  //初始化显示
  showInfo: function showInfo() {
    var _this = this;

    this.userNameLbl.string = this.network.userName;
    this.userIDLbl.string = this.network.userId;
    this.userCoinLbl.string = this.network.userCoin.toFixed(2);
    Helper.loadHead(this.network.headUrl, function (sp) {
      _this.userHead.spriteFrame = sp;
    });
  },

  /**
   * change background map
   */
  changeMap: function changeMap() {
    var randomNum = Math.floor(Math.random() * 3);
    this.audio.playBgm(randomNum);

    for (var i in this.bgMapList) {
      if (randomNum == i) {
        this.bgMapList[i].active = true;
      } else {
        this.bgMapList[i].active = false;
      }
    }
  },
  showResultWheel: function showResultWheel(result) {
    var _this2 = this;

    this.resultWheel.active = true;
    this.audio.playRoleAudio(result);

    for (var i = 1; i <= 4; i++) {
      this.resultWheel.getChildByName('lbl' + i).getComponent(cc.Label).string = ODDSLIST[result];
    }

    this.resultWheel.getChildByName('roleSp').getComponent(cc.Sprite).spriteFrame = this.cartoonSp[result];
    this.resultWheel.getChildByName('bg1').active = ROLECOLORLSIT[result] == 1;
    this.resultWheel.getChildByName('bg2').active = ROLECOLORLSIT[result] == 2;
    this.resultWheel.getChildByName('bg3').active = ROLECOLORLSIT[result] == 3;
    this.scheduleOnce(function () {
      _this2.resultWheel.active = false;
    }, 5);
  },
  getResult: function getResult(res) {
    var _this3 = this;

    this.mothResult = res.win_special_num;
    this.lottertDraw(res.win_num[0], this.lastGamePoint, res.pk_num[0], res.pk_num[1]);
    var is_boo = res.win_num[0] == 0 || res.win_num[0] == 13;

    if (res.pk_num[0] != res.pk_num[1]) {
      this.scheduleOnce(function () {
        _this3.scoreLbl.string = (res.win / 100).toFixed(2);
        _this3.userCoinLbl.string = (res.score / 100).toFixed(2);
        var r = res.win_num[0] == 0 || res.win_num[0] == 13 ? res.win_num[1] : res.win_num[0];

        _this3.showResultWheel(r);
      }, 6);
    } else {
      //pk start
      var tm = 0;
      this.schedule(function () {
        tm++;

        if (tm == 6) {
          !!_this3.cartoonAnims[res.win_num[0]] && (_this3.cartoonAnims[res.win_num[0]].active = true);
          _this3.pkNode.active = true;
          var pklist = _this3.pkNode.children;

          _this3.pkNode.getComponent(cc.Animation).play();

          if (res.who_win) {
            pklist[0].runAction(cc.sequence(cc.delayTime(2), cc.moveTo(1, cc.v2(-1197, pklist[0].y))));
          } else {
            pklist[1].runAction(cc.sequence(cc.delayTime(2), cc.moveTo(1, cc.v2(1349, pklist[1].y))));
          }

          pklist[0].getComponent(cc.Sprite).spriteFrame = _this3.PKAtlas.getSpriteFrame("VS-" + (res.pk_num[0] + 1));
          pklist[1].getComponent(cc.Sprite).spriteFrame = _this3.PKAtlas.getSpriteFrame(is_boo ? 'VS-5' : 'VS-0');
        } else if (tm == 10) {
          _this3.pkNode.active = false;

          if (res.who_win) {
            _this3.audio.playSpecial();

            var _loop = function _loop(i) {
              if (res.win_num[0] != i) {
                _this3.cartoonBright[i].active = true;

                _this3.cartoonBright[i].runAction(cc.sequence(cc.fadeOut(0.1), cc.fadeIn(0.1), cc.fadeOut(0.1), cc.fadeIn(0.1), cc.callFunc(function () {
                  if (new Set(res.win_num).has(parseInt(i))) {
                    _this3.cartoonBright[i].active = true;

                    if (!!_this3.cartoonAnims[i]) {
                      _this3.cartoonAnims[i].active = true;
                    }
                  } else {
                    _this3.cartoonBright[i].active = false;
                  }
                })));
              }
            };

            for (var i in _this3.cartoonBright) {
              _loop(i);
            }
          }
        } else if (tm == 12) {
          _this3.scoreLbl.string = (res.win / 100).toFixed(2);
          _this3.userCoinLbl.string = (res.score / 100).toFixed(2);
          var r = res.win_num[0] == 0 || res.win_num[0] == 13 ? res.win_num[1] : res.win_num[0];

          _this3.showResultWheel(r);
        }
      }, 1, 15, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx4aXlvdXpoZW5nYmFcXFhZWkJfTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVRTTElTVCIsIk9ERFNMSVNUIiwiQVVESU9ST0xFTElTVCIsIlJPTEVDT0xPUkxTSVQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJnTWFwTGlzdCIsIk5vZGUiLCJjYXJ0b29uTm9kZSIsIndoZWVsMSIsIndoZWVsMiIsInVzZXJOYW1lTGJsIiwiTGFiZWwiLCJ1c2VySURMYmwiLCJ1c2VyQ29pbkxibCIsInVzZXJIZWFkIiwiU3ByaXRlIiwiY2hpcEFyZWEiLCJ6eGhTcCIsIlNwcml0ZUZyYW1lIiwiaGlzdG9yeU5vZGUiLCJzZWxCZXRMYmwiLCJiZXRTY29yZUxibCIsImJldFVJTGJsTGlzdCIsInRpbWVyTGJsIiwic2NvcmVMYmwiLCJwa05vZGUiLCJQS0F0bGFzIiwiU3ByaXRlQXRsYXMiLCJ3YWl0TWFzayIsIm11c2ljTm9kZSIsInJlc3VsdFdoZWVsIiwibW90aFNwcml0ZSIsImV4aXRCdG4iLCJoZWxwVUkiLCJvbkxvYWQiLCJjYXJ0b29uQnJpZ2h0IiwiY2FydG9vbkFuaW1zIiwiY2FydG9vblNwIiwicnVuR2FtZUJvb2wiLCJzZWxCZXRJbmRleCIsIm5ldHdvcmsiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsImN1cldoZWVsIiwiY3VyQmV0U2NvcmUiLCJjdXJCZXQiLCJsYXN0QmV0IiwiYmV0VGltZUJvb2wiLCJwck5vZGUiLCJjaGlsZHJlbiIsImkiLCJjTm9kZSIsInB1c2giLCJzcHJpdGVGcmFtZSIsIndoZWVsQ2FyZExpc3QxIiwid2hlZWxDaDEiLCJ3aGVlbENhcmRMaXN0MiIsIndoZWVsQ2gyIiwiaGlzdG9yeUxpc3QiLCJzdHJpbmciLCJsYXN0R2FtZVBvaW50IiwibW90aE4iLCJzdGFydCIsInN0b3BBbGwiLCJjaGFuZ2VNYXAiLCJzdGFydEJldHMiLCJ5IiwiYWN0aXZlIiwiY2xlYXJDdXJCZXQiLCJydW5BY3Rpb24iLCJtb3ZlVG8iLCJ2MiIsInRvRml4ZWQiLCJjbG9zZUJldHMiLCJzZW5kSnNvbkxpc3QiLCJzZW5kSnNvbiIsIm5CZXRJdGVtIiwic3RyQmV0VmFsdWUiLCJwYXJzZUludCIsIm5CZXQiLCJsZW5ndGgiLCJzb2NrZXQiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJDb2luIiwic2hvd0JldCIsImluZGV4Iiwib25DbGljayIsImV2IiwiYXJncyIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBsYXlDbGVhckJldCIsInBsYXlDaGFuZ2VCZXQiLCJwbGF5UmVCZXQiLCJjb25zb2xlIiwibG9nIiwicGxheUJldCIsImxvdHRlcnREcmF3IiwidGFyZ2V0SWQiLCJiZWdpbklkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidGFyZ2V0UG9pbnRzIiwiYWNjUG9pbnRzIiwiYWNjZWxlcmF0ZVJhdGUiLCJzcGVlZE1heCIsImJlZ2luUG9pbnQiLCJsYXN0UG9pbnQiLCJjdXJQb2ludCIsImFjY1RpbWUiLCJkZWNUaW1lIiwid1RhcmdldCIsImRpc3RhbmNlIiwib2Zmc2V0MSIsImFicyIsIm9mZnNldDIiLCJ3QWNjZWxlcmF0ZSIsImJyaWdodEFuaW0iLCJyb2xsV2hlZWwiLCJ3aGVlbElkIiwid2hlZWxMaXN0Iiwic3BlZWQiLCJtb3RoV2hlZWwiLCJydW5Nb3RoVGltZXMiLCJzZXRNb3RoRW5kIiwibW90aFJlc3VsdCIsInNldFdoZWVsRW5kIiwid3QiLCJwb3NpdGlvbiIsInVwZGF0ZSIsImR0IiwidCIsIkRhdGUiLCJnZXRUaW1lIiwidGltZXIiLCJjcCIsInBsYXlXaGVlbCIsInNob3dJbmZvIiwidXNlck5hbWUiLCJ1c2VySWQiLCJIZWxwZXIiLCJsb2FkSGVhZCIsImhlYWRVcmwiLCJzcCIsInJhbmRvbU51bSIsInBsYXlCZ20iLCJzaG93UmVzdWx0V2hlZWwiLCJyZXN1bHQiLCJwbGF5Um9sZUF1ZGlvIiwiZ2V0Q2hpbGRCeU5hbWUiLCJzY2hlZHVsZU9uY2UiLCJnZXRSZXN1bHQiLCJyZXMiLCJ3aW5fc3BlY2lhbF9udW0iLCJ3aW5fbnVtIiwicGtfbnVtIiwiaXNfYm9vIiwid2luIiwic2NvcmUiLCJyIiwidG0iLCJzY2hlZHVsZSIsInBrbGlzdCIsIkFuaW1hdGlvbiIsInBsYXkiLCJ3aG9fd2luIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJnZXRTcHJpdGVGcmFtZSIsInBsYXlTcGVjaWFsIiwiZmFkZU91dCIsImZhZGVJbiIsImNhbGxGdW5jIiwiU2V0IiwiaGFzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBRyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEdBQWIsRUFBa0IsR0FBbEIsQ0FBakIsRUFBeUM7O0FBQ3pDLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsQ0FBcEIsRUFBdUIsRUFBdkIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsQ0FBakMsRUFBb0MsRUFBcEMsRUFBd0MsRUFBeEMsRUFBNEMsRUFBNUMsRUFBZ0QsQ0FBaEQsRUFBbUQsRUFBbkQsRUFBdUQsRUFBdkQsRUFBMkQsRUFBM0QsRUFBK0QsRUFBL0QsRUFBbUUsQ0FBbkUsRUFBc0UsRUFBdEUsRUFBMEUsQ0FBMUUsRUFBNkUsQ0FBN0UsRUFBZ0YsQ0FBaEYsRUFBbUYsRUFBbkYsRUFBdUYsRUFBdkYsRUFBMkYsRUFBM0YsQ0FBakIsRUFBaUg7O0FBQ2pILElBQU1DLGFBQWEsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW1DLEVBQW5DLEVBQXVDLEVBQXZDLEVBQTJDLENBQTNDLEVBQThDLENBQTlDLEVBQWlELENBQWpELEVB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Q0osaUJBVDZHLENBQTlFLENBQWhDO0FBVUg7QUFmUTs7QUFFYixpQkFBSyxJQUFJakIsQ0FBVCxJQUFjLE1BQUksQ0FBQ2YsYUFBbkIsRUFBa0M7QUFBQSxvQkFBekJlLENBQXlCO0FBY2pDO0FBQ0o7QUFDSixTQXBCTSxNQW9CQSxJQUFJa0gsRUFBRSxJQUFJLEVBQVYsRUFBYztBQUNqQixVQUFBLE1BQUksQ0FBQzVJLFFBQUwsQ0FBY21DLE1BQWQsR0FBdUIsQ0FBQ2lHLEdBQUcsQ0FBQ0ssR0FBSixHQUFVLEdBQVgsRUFBZ0J6RixPQUFoQixDQUF3QixDQUF4QixDQUF2QjtBQUNBLFVBQUEsTUFBSSxDQUFDM0QsV0FBTCxDQUFpQjhDLE1BQWpCLEdBQTBCLENBQUNpRyxHQUFHLENBQUNNLEtBQUosR0FBWSxHQUFiLEVBQWtCMUYsT0FBbEIsQ0FBMEIsQ0FBMUIsQ0FBMUI7QUFDQSxjQUFJMkYsQ0FBQyxHQUFJUCxHQUFHLENBQUNFLE9BQUosQ0FBWSxDQUFaLEtBQWtCLENBQWxCLElBQXVCRixHQUFHLENBQUNFLE9BQUosQ0FBWSxDQUFaLEtBQWtCLEVBQTFDLEdBQWdERixHQUFHLENBQUNFLE9BQUosQ0FBWSxDQUFaLENBQWhELEdBQWlFRixHQUFHLENBQUNFLE9BQUosQ0FBWSxDQUFaLENBQXpFOztBQUNBLFVBQUEsTUFBSSxDQUFDUixlQUFMLENBQXFCYSxDQUFyQjtBQUNIO0FBQ0osT0F4Q0QsRUF3Q0csQ0F4Q0gsRUF3Q00sRUF4Q04sRUF3Q1UsQ0F4Q1Y7QUF5Q0g7QUFDSjtBQTVhSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCRVRTTElTVCA9IFsxMCwgMjAsIDUwLCAxMDAsIDUwMF07IC8vYmV0c1xyXG5jb25zdCBPRERTTElTVCA9IFswLCAyMywgMTIsIDIwLCAxMywgNywgMTEsIDgsIDQsIDcsIDQ2LCAyNSwgNDAsIDAsIDIzLCAxMiwgMjAsIDEzLCA3LCAxMSwgOCwgNCwgNywgNDYsIDI1LCA0MF07IC8vb2RkcyBmb3Igd2hlZWxcclxuY29uc3QgQVVESU9ST0xFTElTVCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgLy9Sb2xlIEF1ZGlvXHJcbmNvbnN0IFJPTEVDT0xPUkxTSVQgPSBbMCwgMSwgMiwgMywgMSwgMiwgMywgMSwgMiwgMywgMSwgMiwgMywgMCwgMSwgMiwgMywgMSwgMiwgMywgMSwgMiwgMywgMSwgMiwgM107IC8vUm9sZSBDb2xvclxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJnTWFwTGlzdDogW2NjLk5vZGVdLFxyXG4gICAgICAgIGNhcnRvb25Ob2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHdoZWVsMTogY2MuTm9kZSxcclxuICAgICAgICB3aGVlbDI6IGNjLk5vZGUsXHJcbiAgICAgICAgdXNlck5hbWVMYmw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHVzZXJJRExibDogY2MuTGFiZWwsXHJcbiAgICAgICAgdXNlckNvaW5MYmw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHVzZXJIZWFkOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgY2hpcEFyZWE6IGNjLk5vZGUsXHJcbiAgICAgICAgenhoU3A6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgaGlzdG9yeU5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc2VsQmV0TGJsOiBjYy5MYWJlbCxcclxuICAgICAgICBiZXRTY29yZUxibDogY2MuTGFiZWwsXHJcbiAgICAgICAgYmV0VUlMYmxMaXN0OiBbY2MuTGFiZWxdLFxyXG4gICAgICAgIHRpbWVyTGJsOiBjYy5MYWJlbCxcclxuICAgICAgICBzY29yZUxibDogY2MuTGFiZWwsXHJcbiAgICAgICAgcGtOb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIFBLQXRsYXM6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIHdhaXRNYXNrOiBjYy5Ob2RlLFxyXG4gICAgICAgIG11c2ljTm9kZTogY2MuTm9kZSxcclxuICAgICAgICByZXN1bHRXaGVlbDogY2MuTm9kZSxcclxuICAgICAgICBtb3RoU3ByaXRlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgZXhpdEJ0bjogY2MuTm9kZSxcclxuICAgICAgICBoZWxwVUk6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmNhcnRvb25CcmlnaHQgPSBbXTsgLy9jYXJ0b29uIGJyaWdodCBub2Rlc1xyXG4gICAgICAgIHRoaXMuY2FydG9vbkFuaW1zID0gW107IC8vY2FydG9vbiBhbmltYXRpb25zXHJcbiAgICAgICAgdGhpcy5jYXJ0b29uU3AgPSBbXTsgLy9jYXJ0b29uIHNwcml0ZUZyYW1lc1xyXG4gICAgICAgIHRoaXMucnVuR2FtZUJvb2wgPSBmYWxzZTsgLy9nYW1lIHN0YXJ0XHJcbiAgICAgICAgdGhpcy5zZWxCZXRJbmRleCA9IDA7IC8vaW5kZXggb2YgQkVUU0xJU1RcclxuICAgICAgICB0aGlzLm5ldHdvcmsgPSB0aGlzLmdldENvbXBvbmVudCgnWFlaQl9OZXR3b3JrJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubXVzaWNOb2RlLmdldENvbXBvbmVudCgnWFlaQl9BdWRpbycpO1xyXG4gICAgICAgIHRoaXMuY3VyV2hlZWwgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5jdXJCZXRTY29yZSA9IDA7IC8vU2NvcmUgb2YgY3VycmVudCBiZXRcclxuICAgICAgICB0aGlzLmN1ckJldCA9IFtdOyAvL0RldGFpbHMgb2YgY3VycmVudCBiZXRcclxuICAgICAgICB0aGlzLmxhc3RCZXQgPSBbXTsgLy9EZXRhaWxzIG9mIGxhc3QgYmV0XHJcbiAgICAgICAgdGhpcy5iZXRUaW1lQm9vbCA9IGZhbHNlOyAvL2ZvciB0aW1lclxyXG4gICAgICAgIC8vaW5pdCBjYXJ0b29uTm9kZSBub2RlXHJcbiAgICAgICAgbGV0IHByTm9kZSA9IHRoaXMuY2FydG9vbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBwck5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IGNOb2RlID0gcHJOb2RlW2ldLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRvb25CcmlnaHQucHVzaChjTm9kZVswXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FydG9vbkFuaW1zLnB1c2goY05vZGVbMV0pO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRvb25TcC5wdXNoKGNOb2RlWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pbml0IHdoZWVsIGxpc3RcclxuICAgICAgICB0aGlzLndoZWVsQ2FyZExpc3QxID0gW107XHJcbiAgICAgICAgbGV0IHdoZWVsQ2gxID0gdGhpcy53aGVlbDEuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB3aGVlbENoMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsQ2FyZExpc3QxLnB1c2god2hlZWxDaDFbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy53aGVlbENhcmRMaXN0MiA9IFtdO1xyXG4gICAgICAgIGxldCB3aGVlbENoMiA9IHRoaXMud2hlZWwyLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gd2hlZWxDaDIpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbENhcmRMaXN0Mi5wdXNoKHdoZWVsQ2gyW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5TGlzdCA9IHRoaXMuaGlzdG9yeU5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgdGhpcy5zY29yZUxibC5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5sYXN0R2FtZVBvaW50ID0gMDtcclxuICAgICAgICB0aGlzLm1vdGhOID0gMjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5zdG9wQWxsKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VNYXAoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRCZXRzKCkge1xyXG4gICAgICAgIHRoaXMuZXhpdEJ0bi55ID0gMzAwO1xyXG4gICAgICAgIHRoaXMud2FpdE1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNhcnRvb25CcmlnaHQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FydG9vbkFuaW1zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRvb25Bbmltc1tpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhcnRvb25CcmlnaHRbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmV0VGltZUJvb2wgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDdXJCZXQoKTtcclxuICAgICAgICB0aGlzLmNoaXBBcmVhLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCBjYy52MigwLCAwKSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhckN1ckJldCgpIHtcclxuICAgICAgICB0aGlzLmN1ckJldCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VyQmV0U2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMuYmV0U2NvcmVMYmwuc3RyaW5nID0gdGhpcy5jdXJCZXRTY29yZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5iZXRVSUxibExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKCEhdGhpcy5iZXRVSUxibExpc3RbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0VUlMYmxMaXN0W2ldLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VCZXRzKCkge1xyXG4gICAgICAgIHRoaXMuZXhpdEJ0bi55ID0gMTgyO1xyXG4gICAgICAgIHRoaXMuYmV0VGltZUJvb2wgPSBmYWxzZTtcclxuICAgICAgICBsZXQgc2VuZEpzb25MaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmN1ckJldCkge1xyXG4gICAgICAgICAgICBpZiAoISF0aGlzLmN1ckJldCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbmRKc29uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5CZXRJdGVtOiBpIDw9IDEyID8gMSA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyQmV0VmFsdWU6IGkgPD0gMTIgPyBwYXJzZUludChpKSA6IHBhcnNlSW50KGkpIC0gMTMsXHJcbiAgICAgICAgICAgICAgICAgICAgbkJldDogdGhpcy5jdXJCZXRbaV0gKiAxMDAsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZW5kSnNvbkxpc3QucHVzaChzZW5kSnNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbmRKc29uTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0d29yay5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHNlbmRKc29uTGlzdCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RCZXQgPSBbLi4udGhpcy5jdXJCZXRdO1xyXG4gICAgICAgIHRoaXMuY2hpcEFyZWEucnVuQWN0aW9uKGNjLm1vdmVUbygwLjIsIGNjLnYyKDAsIC0xNTAwKSkpO1xyXG4gICAgICAgIHRoaXMuc2NvcmVMYmwuc3RyaW5nID0gJzAuMDAnO1xyXG4gICAgICAgIHRoaXMudXNlckNvaW5MYmwuc3RyaW5nID0gKHRoaXMubmV0d29yay51c2VyQ29pbiAtIHRoaXMuY3VyQmV0U2NvcmUpLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dCZXQoaW5kZXgpIHtcclxuICAgICAgICBpZiAoISF0aGlzLmN1ckJldFtpbmRleF0pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJCZXRbaW5kZXhdICs9IEJFVFNMSVNUW3RoaXMuc2VsQmV0SW5kZXhdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyQmV0W2luZGV4XSA9IEJFVFNMSVNUW3RoaXMuc2VsQmV0SW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1ckJldFNjb3JlICs9IEJFVFNMSVNUW3RoaXMuc2VsQmV0SW5kZXhdO1xyXG4gICAgICAgIHRoaXMuYmV0U2NvcmVMYmwuc3RyaW5nID0gdGhpcy5jdXJCZXRTY29yZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuYmV0VUlMYmxMaXN0W2luZGV4XS5zdHJpbmcgPSB0aGlzLmN1ckJldFtpbmRleF0udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhldiwgYXJncykge1xyXG4gICAgICAgIHN3aXRjaCAoYXJncykge1xyXG4gICAgICAgICAgICBjYXNlICdob21lJzpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV0d29yay5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2NsZWFyQ3VyQmV0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDdXJCZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUNsZWFyQmV0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY2hhbmdlU2VsQmV0SW5kZXgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxCZXRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsQmV0SW5kZXggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxCZXRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlDaGFuZ2VCZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsQmV0TGJsLnN0cmluZyA9IEJFVFNMSVNUW3RoaXMuc2VsQmV0SW5kZXhdLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY29udGludWVkIG1vcnRnYWdlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheVJlQmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ3VyQmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckJldCA9IFsuLi50aGlzLmxhc3RCZXRdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmN1ckJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXRoaXMuY3VyQmV0W2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckJldFNjb3JlICsgdGhpcy5jdXJCZXRbaV0gPD0gdGhpcy5uZXR3b3JrLnVzZXJDb2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckJldFNjb3JlICs9IHRoaXMuY3VyQmV0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZXRTY29yZUxibC5zdHJpbmcgPSB0aGlzLmN1ckJldFNjb3JlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJldFVJTGJsTGlzdFtpXS5zdHJpbmcgPSB0aGlzLmN1ckJldFtpXS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+mHkeW4geS4jei2sycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlbHAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjbG9zZSBoZWxwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYXJncykgPT0gYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckJldFNjb3JlICsgQkVUU0xJU1RbdGhpcy5zZWxCZXRJbmRleF0gPD0gdGhpcy5uZXR3b3JrLnVzZXJDb2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0JldChwYXJzZUludChhcmdzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfph5HluIHkuI3otrMnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RhcnQgZ2FtZSBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RvcCBpZH0gdGFyZ2V0SWQgXHJcbiAgICAgKiBAcGFyYW0ge2JlZ2luIGlkfSBiZWdpbklkIFxyXG4gICAgICovXHJcbiAgICBsb3R0ZXJ0RHJhdyh0YXJnZXRJZCwgYmVnaW5JZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI2KSwgd2hlZWwxLCB3aGVlbDIpIHtcclxuICAgICAgICB0aGlzLmxhc3RHYW1lUG9pbnQgPSB0YXJnZXRJZDtcclxuICAgICAgICB0aGlzLnJ1bkdhbWVCb29sID0gdHJ1ZTtcclxuICAgICAgICB0YXJnZXRJZCA9IHRhcmdldElkIC0gYmVnaW5JZDtcclxuICAgICAgICB0aGlzLnRhcmdldFBvaW50cyA9IDI2ICogNCArIHRhcmdldElkO1xyXG4gICAgICAgIHRoaXMuYWNjUG9pbnRzID0gdGhpcy50YXJnZXRQb2ludHMgKiAwLjU7XHJcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRlUmF0ZSA9IHRoaXMuYWNjUG9pbnRzICogMiAvIDk7XHJcbiAgICAgICAgdGhpcy5zcGVlZE1heCA9IHRoaXMuYWNjZWxlcmF0ZVJhdGUgKiAzO1xyXG4gICAgICAgIHRoaXMuYmVnaW5Qb2ludCA9IGJlZ2luSWQ7XHJcbiAgICAgICAgdGhpcy5sYXN0UG9pbnQgPSBiZWdpbklkO1xyXG4gICAgICAgIHRoaXMuY3VyUG9pbnQgPSBiZWdpbklkO1xyXG4gICAgICAgIHRoaXMuYWNjVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWNUaW1lID0gMDtcclxuICAgICAgICAvL3doZWVsXHJcbiAgICAgICAgdGhpcy53VGFyZ2V0ID0gW3doZWVsMSwgd2hlZWwyXTtcclxuICAgICAgICBsZXQgZGlzdGFuY2UgPSA4NSAqIDQgKiAxMDtcclxuICAgICAgICBsZXQgb2Zmc2V0MSA9IE1hdGguYWJzKHRoaXMud1RhcmdldFswXSAtIHRoaXMuY3VyV2hlZWxbMF0pICogODU7XHJcbiAgICAgICAgbGV0IG9mZnNldDIgPSBNYXRoLmFicyh0aGlzLndUYXJnZXRbMV0gLSB0aGlzLmN1cldoZWVsWzFdKSAqIDg1O1xyXG4gICAgICAgIC8veD0gYXReMjtcclxuICAgICAgICB0aGlzLndBY2NlbGVyYXRlID0gW1xyXG4gICAgICAgICAgICAoZGlzdGFuY2UgKyBvZmZzZXQxKSAvIDYgLyA2MCxcclxuICAgICAgICAgICAgKGRpc3RhbmNlICsgb2Zmc2V0MikgLyA2IC8gNjBcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuXHJcbiAgICBicmlnaHRBbmltKGJlZ2luSWQsIHRhcmdldElkKSB7XHJcbiAgICAgICAgYmVnaW5JZCA9IHBhcnNlSW50KGJlZ2luSWQgJSAyNik7XHJcbiAgICAgICAgdGFyZ2V0SWQgPSBwYXJzZUludCh0YXJnZXRJZCAlIDI2KTtcclxuICAgICAgICBpZiAodGFyZ2V0SWQgPCBiZWdpbklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpZ2h0QW5pbShiZWdpbklkLCAyNSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpZ2h0QW5pbSgwLCB0YXJnZXRJZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlZ2luSWQ7IGkgPD0gdGFyZ2V0SWQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRvb25CcmlnaHRbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGxXaGVlbCh3aGVlbElkKSB7XHJcbiAgICAgICAgbGV0IHdoZWVsTGlzdCA9IHdoZWVsSWQgPT0gMSA/IHRoaXMud2hlZWxDYXJkTGlzdDEgOiB0aGlzLndoZWVsQ2FyZExpc3QyO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gd2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBzcGVlZCA9IHdoZWVsSWQgPT0gMSA/IHRoaXMud0FjY2VsZXJhdGVbMF0gOiB0aGlzLndBY2NlbGVyYXRlWzFdO1xyXG4gICAgICAgICAgICB3aGVlbExpc3RbaV0ueSArPSBzcGVlZDtcclxuICAgICAgICAgICAgaWYgKHdoZWVsTGlzdFtpXS55ID49IDg1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoaSkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoZWVsTGlzdFtpXS55ID0gd2hlZWxMaXN0WyczJ10ueSAtIDg1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGVlbExpc3RbaV0ueSA9IHdoZWVsTGlzdFtpIC0gMV0ueSAtIDg1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3RoV2hlZWwoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5Nb3RoVGltZXMgPSB0aGlzLnJ1bk1vdGhUaW1lcyB8fCAwO1xyXG4gICAgICAgIHRoaXMucnVuTW90aFRpbWVzKys7XHJcbiAgICAgICAgaWYgKHRoaXMucnVuTW90aFRpbWVzICUgMyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW90aE4rK1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb3RoTiA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW90aE4gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW90aFNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuenhoU3BbdGhpcy5tb3RoTl07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRNb3RoRW5kKCkge1xyXG4gICAgICAgIHRoaXMubW90aFNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuenhoU3BbdGhpcy5tb3RoUmVzdWx0XTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0V2hlZWxFbmQod2hlZWxJZCkge1xyXG4gICAgICAgIGxldCB3aGVlbExpc3QgPSB3aGVlbElkID09IDEgPyB0aGlzLndoZWVsQ2FyZExpc3QxIDogdGhpcy53aGVlbENhcmRMaXN0MjtcclxuICAgICAgICBsZXQgd3QgPSB0aGlzLndUYXJnZXRbd2hlZWxJZCA9PSAxID8gMCA6IDFdO1xyXG4gICAgICAgIHdoZWVsTGlzdFt3dF0ueSA9IDA7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gW1xyXG4gICAgICAgICAgICBbMCwgLTg1LCAtMTcwLCAtMjU1XSxcclxuICAgICAgICAgICAgWy0yNTUsIDAsIC04NSwgLTE3MF0sXHJcbiAgICAgICAgICAgIFstMTcwLCAtMjU1LCAwLCAtODVdLFxyXG4gICAgICAgICAgICBbLTg1LCAtMTcwLCAtMjU1LCAwXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB3aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgd2hlZWxMaXN0W2ldLnkgPSBwb3NpdGlvblt3dF1baV07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5iZXRUaW1lQm9vbCkge1xyXG4gICAgICAgICAgICBsZXQgdCA9IHBhcnNlSW50KG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCAtIHRoaXMubmV0d29yay50aW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJMYmwuc3RyaW5nID0gNDAgLSB0ID4gMCA/IDQwIC0gdCA6IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ydW5HYW1lQm9vbCkge1xyXG4gICAgICAgICAgICAvL21haW4gbG90dGVyeSBkcmF3XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clBvaW50IDwgdGhpcy5hY2NQb2ludHMgKyB0aGlzLmJlZ2luUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vYWNjZXJhdGVcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjVGltZSArPSBkdDtcclxuICAgICAgICAgICAgICAgIGxldCBjcCA9IHBhcnNlSW50KHRoaXMuY3VyUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJQb2ludCA9IHRoaXMuYmVnaW5Qb2ludCArIDAuNSAqIHRoaXMuYWNjZWxlcmF0ZVJhdGUgKiB0aGlzLmFjY1RpbWUgKiB0aGlzLmFjY1RpbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3AgIT0gcGFyc2VJbnQodGhpcy5jdXJQb2ludCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlXaGVlbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9zbG93IGRvd25cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1clBvaW50IDwgdGhpcy50YXJnZXRQb2ludHMgKyB0aGlzLmJlZ2luUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY1RpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNwID0gcGFyc2VJbnQodGhpcy5jdXJQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJQb2ludCA9IHRoaXMuYmVnaW5Qb2ludCArIHRoaXMudGFyZ2V0UG9pbnRzIC8gMiArIHRoaXMuc3BlZWRNYXggKiB0aGlzLmRlY1RpbWUgLSAwLjUgKiB0aGlzLmFjY2VsZXJhdGVSYXRlICogdGhpcy5kZWNUaW1lICogdGhpcy5kZWNUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkTWF4IDwgdGhpcy5hY2NlbGVyYXRlUmF0ZSAqIHRoaXMuZGVjVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3N0b3AgbG90dGVyeSBkcmF3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFBvaW50ID0gdGhpcy5jdXJQb2ludCA9IHRoaXMudGFyZ2V0UG9pbnRzICsgdGhpcy5iZWdpblBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bkdhbWVCb29sID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjcCAhPSBwYXJzZUludCh0aGlzLmN1clBvaW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlXaGVlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdG9wIGxvdHRlcnkgZHJhd1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFBvaW50ID0gdGhpcy5jdXJQb2ludCA9IHRoaXMudGFyZ2V0UG9pbnRzICsgdGhpcy5iZWdpblBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVuR2FtZUJvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3Nob3cgbG90dGVydCBkcmF3XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5jYXJ0b29uQnJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRvb25CcmlnaHRbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5icmlnaHRBbmltKHRoaXMubGFzdFBvaW50LCB0aGlzLmN1clBvaW50KTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0UG9pbnQgPSB0aGlzLmN1clBvaW50O1xyXG5cclxuICAgICAgICAgICAgLy93aGVlbCBsb3R0ZXJ0eSBkcmF3XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bkdhbWVCb29sKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGxXaGVlbCgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sbFdoZWVsKDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3RoV2hlZWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0V2hlZWxFbmQoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFdoZWVsRW5kKDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb3RoRW5kKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cldoZWVsID0gWy4uLnRoaXMud1RhcmdldF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yid5aeL5YyW5pi+56S6XHJcbiAgICBzaG93SW5mbygpIHtcclxuICAgICAgICB0aGlzLnVzZXJOYW1lTGJsLnN0cmluZyA9IHRoaXMubmV0d29yay51c2VyTmFtZTtcclxuICAgICAgICB0aGlzLnVzZXJJRExibC5zdHJpbmcgPSB0aGlzLm5ldHdvcmsudXNlcklkO1xyXG4gICAgICAgIHRoaXMudXNlckNvaW5MYmwuc3RyaW5nID0gdGhpcy5uZXR3b3JrLnVzZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMubmV0d29yay5oZWFkVXJsLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckhlYWQuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGFuZ2UgYmFja2dyb3VuZCBtYXBcclxuICAgICAqL1xyXG4gICAgY2hhbmdlTWFwKCkge1xyXG4gICAgICAgIGxldCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20ocmFuZG9tTnVtKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuYmdNYXBMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21OdW0gPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ01hcExpc3RbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmdNYXBMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93UmVzdWx0V2hlZWwocmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRXaGVlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheVJvbGVBdWRpbyhyZXN1bHQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFdoZWVsLmdldENoaWxkQnlOYW1lKCdsYmwnICsgaSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBPRERTTElTVFtyZXN1bHRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc3VsdFdoZWVsLmdldENoaWxkQnlOYW1lKCdyb2xlU3AnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuY2FydG9vblNwW3Jlc3VsdF07XHJcbiAgICAgICAgdGhpcy5yZXN1bHRXaGVlbC5nZXRDaGlsZEJ5TmFtZSgnYmcxJykuYWN0aXZlID0gUk9MRUNPTE9STFNJVFtyZXN1bHRdID09IDE7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRXaGVlbC5nZXRDaGlsZEJ5TmFtZSgnYmcyJykuYWN0aXZlID0gUk9MRUNPTE9STFNJVFtyZXN1bHRdID09IDI7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRXaGVlbC5nZXRDaGlsZEJ5TmFtZSgnYmczJykuYWN0aXZlID0gUk9MRUNPTE9STFNJVFtyZXN1bHRdID09IDM7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFdoZWVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSZXN1bHQocmVzKSB7XHJcbiAgICAgICAgdGhpcy5tb3RoUmVzdWx0ID0gcmVzLndpbl9zcGVjaWFsX251bTtcclxuICAgICAgICB0aGlzLmxvdHRlcnREcmF3KHJlcy53aW5fbnVtWzBdLCB0aGlzLmxhc3RHYW1lUG9pbnQsIHJlcy5wa19udW1bMF0sIHJlcy5wa19udW1bMV0pO1xyXG4gICAgICAgIGxldCBpc19ib28gPSByZXMud2luX251bVswXSA9PSAwIHx8IHJlcy53aW5fbnVtWzBdID09IDEzO1xyXG4gICAgICAgIGlmIChyZXMucGtfbnVtWzBdICE9IHJlcy5wa19udW1bMV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZUxibC5zdHJpbmcgPSAocmVzLndpbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckNvaW5MYmwuc3RyaW5nID0gKHJlcy5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIGxldCByID0gKHJlcy53aW5fbnVtWzBdID09IDAgfHwgcmVzLndpbl9udW1bMF0gPT0gMTMpID8gcmVzLndpbl9udW1bMV0gOiByZXMud2luX251bVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdFdoZWVsKHIpO1xyXG4gICAgICAgICAgICB9LCA2KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3BrIHN0YXJ0XHJcbiAgICAgICAgICAgIGxldCB0bSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG0rKztcclxuICAgICAgICAgICAgICAgIGlmICh0bSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgISF0aGlzLmNhcnRvb25Bbmltc1tyZXMud2luX251bVswXV0gJiYgKHRoaXMuY2FydG9vbkFuaW1zW3Jlcy53aW5fbnVtWzBdXS5hY3RpdmUgPSB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwa2xpc3QgPSB0aGlzLnBrTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBrTm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy53aG9fd2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrbGlzdFswXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDIpLCBjYy5tb3ZlVG8oMSwgY2MudjIoLTExOTcsIHBrbGlzdFswXS55KSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwa2xpc3RbMV0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgyKSwgY2MubW92ZVRvKDEsIGNjLnYyKDEzNDksIHBrbGlzdFsxXS55KSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcGtsaXN0WzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5QS0F0bGFzLmdldFNwcml0ZUZyYW1lKGBWUy0ke3Jlcy5wa19udW1bMF0gKzF9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGtsaXN0WzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5QS0F0bGFzLmdldFNwcml0ZUZyYW1lKGlzX2JvbyA/ICdWUy01JyA6ICdWUy0wJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wa05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy53aG9fd2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheVNwZWNpYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNhcnRvb25CcmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMud2luX251bVswXSAhPSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0b29uQnJpZ2h0W2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0b29uQnJpZ2h0W2ldLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMSksIGNjLmZhZGVJbigwLjEpLCBjYy5mYWRlT3V0KDAuMSksIGNjLmZhZGVJbigwLjEpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXcgU2V0KHJlcy53aW5fbnVtKS5oYXMocGFyc2VJbnQoaSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRvb25CcmlnaHRbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXRoaXMuY2FydG9vbkFuaW1zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0b29uQW5pbXNbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydG9vbkJyaWdodFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG0gPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlTGJsLnN0cmluZyA9IChyZXMud2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckNvaW5MYmwuc3RyaW5nID0gKHJlcy5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgciA9IChyZXMud2luX251bVswXSA9PSAwIHx8IHJlcy53aW5fbnVtWzBdID09IDEzKSA/IHJlcy53aW5fbnVtWzFdIDogcmVzLndpbl9udW1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0V2hlZWwocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEsIDE1LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KSJdfQ==