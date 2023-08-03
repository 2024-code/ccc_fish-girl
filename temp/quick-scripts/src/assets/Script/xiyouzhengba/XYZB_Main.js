"use strict";
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