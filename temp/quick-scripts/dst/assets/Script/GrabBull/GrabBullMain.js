
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GrabBull/GrabBullMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'caf9fj/k01A1bpHbcD16cGL', 'GrabBullMain');
// Script/GrabBull/GrabBullMain.js

"use strict";

/**
 * 抢庄牛牛
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    com_BG: {
      "default": null,
      type: cc.Node
    },
    com_View: {
      "default": null,
      type: cc.Node
    },
    com_PlayerMessage: {
      "default": null,
      type: cc.Node
    },
    com_Button: {
      "default": null,
      type: cc.Node
    },
    com_GameMenu: {
      "default": null,
      type: cc.Node
    },
    com_GetBull: {
      "default": null,
      type: cc.Node
    },
    com_Timer: {
      "default": null,
      type: cc.Node
    },
    com_SendCardAnimation: {
      "default": null,
      type: cc.Node
    },
    com_ReissueCardAniamtion: {
      "default": null,
      type: cc.Node
    },
    com_Help: {
      "default": null,
      type: cc.Node
    },
    com_Bill: {
      "default": null,
      type: cc.Node
    },
    com_MessageBox: {
      "default": null,
      type: cc.Node
    },
    com_Exit: {
      "default": null,
      type: cc.Node
    },
    com_Tips: {
      "default": null,
      type: cc.Node
    },
    pb_Card: {
      "default": null,
      type: cc.Prefab
    },
    pb_Point: {
      "default": null,
      type: cc.Prefab
    },
    pb_Coin: {
      "default": null,
      type: cc.Prefab
    },
    bg_Black: {
      "default": null,
      type: cc.Node
    },
    sp_BankerFrame: {
      "default": null,
      type: cc.Node
    },
    sp_GrabBull: {
      "default": [],
      type: cc.SpriteFrame
    },
    sp_Bet: {
      "default": [],
      type: cc.SpriteFrame
    },
    an_GetBull: {
      "default": null,
      type: cc.Node
    },
    an_DragonBoneAnimation: {
      "default": null,
      type: cc.Node
    },
    an_SetBankerAnimation: {
      "default": null,
      type: cc.Node
    },
    au_GrabBullBGM: {
      "default": null,
      type: cc.AudioClip
    },
    au_ButtonSound: {
      "default": null,
      type: cc.AudioClip
    },
    au_SendCard: {
      "default": null,
      type: cc.AudioClip
    },
    au_GameStart: {
      "default": null,
      type: cc.AudioClip
    },
    au_Point: {
      "default": [],
      type: cc.AudioClip
    },
    au_Win: {
      "default": null,
      type: cc.AudioClip
    },
    au_Lose: {
      "default": null,
      type: cc.AudioClip
    },
    au_Coin: {
      "default": null,
      type: cc.AudioClip
    },
    vipNode: {
      "default": null,
      type: cc.Node
    }
  },

  /**
   * 
   */
  onLoad: function onLoad() {
    var _this = this;

    //cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    //关闭脏矩形
    if (cc.renderType === cc.game.RENDER_TYPE_CANVAS) {
      cc.renderer.enableDirtyRegion(false);
    }

    var self = this;
    cc.view.setResizeCallback(function () {
      self.uiResize_Function(cc.view.getVisibleSize());
    });
    this.uiInit_Function();
    this.playerInfo = require("PlayerInfo").getInstant;
    this.playerInfo.setGameObj_Function(this);
    this.netWork = require("GrabBullNetWork").getInstant;
    this.netWork.setGrabBullObj_Function(this);
    this.gameInit_Function(); //vip特权

    this.vipNode.on('touchstart', function () {
      _this.showVip();
    });
    this.vipNode.on('touchend', function () {
      _this.closeVip();
    });
    this.vipNode.on('touchcancel', function () {
      _this.closeVip();
    });
  },
  //vip特权
  showVip: function showVip() {
    this.netWork.vipTap = true;
    this.netWork.grabBullSocket.emit("vipGetCard");
  },
  //vip特权
  closeVip: function closeVip() {
    this.netWork.vipTap = false;

    if (this.netWork.showVipBool) {
      this.netWork.showVipBool = false;

      for (var seatIndex in this.netWork.showVipIndexList) {
        for (var j = 0; j < 5; j++) {
          this.cardArray[j + 5 * this.netWork.showVipIndexList[seatIndex]].getComponent("GrabBullCard").close_func();
        }
      }
    }
  },

  /**
   * 
   */
  uiInit_Function: function uiInit_Function() {
    var size = cc.view.getVisibleSize();
    var scale = size.width / 1334;

    if (size.width > 1334) {
      this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = scale;
      this.bg_Black.scaleX = this.bg_Black.scaleY = scale;
      this.com_PlayerMessage.getChildByName("com_Player0").x = -size.width / 2 + 100;
      this.com_Button.getChildByName("bt_Exit").x = size.width / 2 - 80;
    } else if (size.width < 1334) {
      this.node.scaleX = this.node.scaleY = scale;
      this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = 1 / scale;
      this.bg_Black.scaleX = this.bg_Black.scaleY = 1 / scale;
      this.com_Button.getChildByName("bt_Exit").x = size.width / scale / 2 - 80;
    }

    this.com_PlayerMessage.getChildByName("com_Player1").x = -this.com_PlayerMessage.getChildByName("com_Player0").x;
    this.com_PlayerMessage.getChildByName("com_Player4").x = this.com_PlayerMessage.getChildByName("com_Player0").x;
    this.com_Button.getChildByName("bt_Help").x = -this.com_Button.getChildByName("bt_Exit").x;
  },

  /**
   * 
   * @param {*} size 
   */
  uiResize_Function: function uiResize_Function(size) {
    var scale = size.width / 1334;

    if (size.width > 1334) {
      this.node.scaleX = this.node.scaleY = 1;
      this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = scale;
      this.bg_Black.scaleX = this.bg_Black.scaleY = scale;
      this.com_PlayerMessage.getChildByName("com_Player0").x = -size.width / 2 + 100;
      this.com_Button.getChildByName("bt_Exit").x = size.width / 2 - 80;
    } else if (size.width < 1334) {
      this.node.scaleX = this.node.scaleY = scale;
      var minWidth = size.width / scale;
      this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = 1 / scale;
      this.bg_Black.scaleX = this.bg_Black.scaleY = 1 / scale;
      this.com_PlayerMessage.getChildByName("com_Player0").x = -minWidth / 2 + 100;
      this.com_Button.getChildByName("bt_Exit").x = minWidth / 2 - 80;
    }

    this.com_PlayerMessage.getChildByName("com_Player1").x = -this.com_PlayerMessage.getChildByName("com_Player0").x, this.com_PlayerMessage.getChildByName("com_Player4").x = this.com_PlayerMessage.getChildByName("com_Player0").x, this.com_Button.getChildByName("bt_Help").x = -this.com_Button.getChildByName("bt_Exit").x;
  },

  /**
   * 游戏初始化
   */
  gameInit_Function: function gameInit_Function() {
    var _this2 = this;

    this.bg_Black.on("touchstart", function (ret) {
      return false;
    }, this);
    this.netWork.setGrabBullSocketOn_Function();
    this.cardArray = new Array(25);
    this.cardPosition = [[-350, -260], [280, 10], [140, 180], [-260, 180], [-400, 10]];
    this.openCardPosition = [-60, -120];

    for (var i = 0; i < this.cardArray.length; i++) {
      var card = cc.instantiate(this.pb_Card);
      this.cardArray[i] = card;
      this.com_View.addChild(this.cardArray[i]);

      if (i < 5) {
        this.cardArray[i].scaleX = this.cardArray[i].scaleY = 1.5;
        this.cardArray[i].setPosition(this.cardPosition[parseInt(i / 5)][0] + 175 * parseInt(i % 5), this.cardPosition[parseInt(i / 5)][1]);
        this.cardArray[i].getComponent("GrabBullCard").canvasNode = this, this.cardArray[i].getComponent("cc.Button").interactable = true;
        this.cardArray[i].cardId = i;
      } else {
        this.cardArray[i].setPosition(this.cardPosition[parseInt(i / 5)][0] + 30 * parseInt(i % 5), this.cardPosition[parseInt(i / 5)][1]);
      }

      this.cardArray[i].active = false;
    }

    this.resultCardArray = new Array(5);
    this.pointArray = new Array(5);
    this.pointPosition = [[0, -150], [340, -25], [200, 145], [-210, 145], [-340, -25]];

    for (var i = 0; i < this.pointArray.length; i++) {
      var point = cc.instantiate(this.pb_Point);
      this.pointArray[i] = point;
      this.com_View.addChild(this.pointArray[i]);
      this.pointArray[i].setPosition(this.pointPosition[i][0], this.pointPosition[i][1]);
      this.pointArray[i].active = false;
    }

    this.serverPoint = -1;
    this.coinArray = new Array(250);

    for (var i = 0; i < this.coinArray.length; i++) {
      var coin = cc.instantiate(this.pb_Coin);
      this.coinArray[i] = coin;
      this.com_View.addChild(this.coinArray[i]);
      this.coinArray[i].active = false;
    }

    this.coinFly = false;
    this.bankerSeatId = -1;
    this.randomBankerTimer = 0;
    this.randomBanker = false;
    this.randomBankerArray = [];
    this.randomBankerPosition = 0;
    this.sp_BankerFrame.active = false;
    this.grabBullSelectArray = [];
    this.randomBankerCount = 0;
    this.timeRun = false;
    this.currentTime = 0;
    this.totalTime = 0;
    this.timeCount = 0;
    this.com_Timer.active = false;
    this.cardClick = new Array(5);
    this.playerList = null;
    this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerName").getComponent("cc.Label").string = this.playerInfo.playerName;
    this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (this.playerInfo.playerCoin / this.playerInfo.exchangeRate).toFixed(2);
    Helper.loadHead(this.playerInfo.playerHeadId, function (sp) {
      _this2.com_PlayerMessage.getChildByName("com_Player0").getChildByName("sp_PlayerHead").active = true;
      _this2.com_PlayerMessage.getChildByName("com_Player0").getChildByName("sp_PlayerHead").getComponent("cc.Sprite").spriteFrame = sp;
    });
    this.canSendCard = [0, 0, 0, 0, 0];
    this.gameState = 0;
    this.GS_GAMESTART = 1;
    this.GS_SENDCARDS = 2;
    this.GS_GRABBANKER = 3;
    this.GS_SELECTBET = 4;
    this.GS_SETBULL = 5;
    this.GS_OPENCARD = 6;
    this.GS_BILLING = 7;
    this.an_DBSAnimation = this.an_DragonBoneAnimation.getComponent("dragonBones.ArmatureDisplay");
    this.dbArmature = this.an_DBSAnimation.armature();
    this.canSetBull = false;
    this.db_GetBullAnimation = this.an_GetBull.getChildByName("db_GetBull").getComponent("dragonBones.ArmatureDisplay");
    this.db_GetBullArmature = this.db_GetBullAnimation.armature();
    this.db_GetBullAnimation.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.frame_event_Function, this);
    this.winResult = [];
    this.timeOut = [];
    this.buttonInit_Function();
    this.playerInfo.musicControl && cc.audioEngine.play(this.au_GrabBullBGM, true, .5);
    this.isGaming = false;
    this.gameExit = false;
    this.netWork.grabBullSocket.emit("getDownTime", {});
    this.netWork.grabBullSocket.emit("getTableList");
  },

  /**
   * 初始化座位上玩家的信息
   * @param {*} tableList 
   */
  playerMessageInit_Function: function playerMessageInit_Function(tableList) {
    var _this3 = this;

    this.playerList = tableList;

    var _loop = function _loop() {
      var seatIndex = -1;
      seatIndex = _this3.changeSeatId_Function(_this3.playerList[i].seatId);
      _this3.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").active = true;
      Helper.loadHead(_this3.playerList[i].headimgurl, function (sp) {
        _this3.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").getComponent("cc.Sprite").spriteFrame = sp;
      });
      _this3.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerName").getComponent("cc.Label").string = _this3.playerList[i].nickname;
      _this3.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (_this3.playerList[i].score / _this3.playerInfo.exchangeRate).toFixed(2);
    };

    for (var i = 0; i < tableList.length; i++) {
      _loop();
    }
  },

  /**
   * 侦听器
   * @param {*} event 
   */
  frame_event_Function: function frame_event_Function(event) {
    switch (event.name) {
      case "start":
        break;

      case "win":
        break;

      case "lose":
        break;

      case "over":
        this.com_GetBull.active = false;
        break;
    }
  },

  /**
   * 按钮初始化
   */
  buttonInit_Function: function buttonInit_Function() {
    for (var i = 0; i < this.com_Button.getChildByName("com_GrabButton").children.length; i++) {
      this.com_Button.getChildByName("com_GrabButton").children[i].grab = i;
    }

    ;
    var betList = [5, 10, 20, 30];

    for (i = 0; i < this.com_Button.getChildByName("com_BetButton").children.length; i++) {
      this.com_Button.getChildByName("com_BetButton").children[i].bet = betList[i];
      this.com_Button.getChildByName("com_BetButton").children[i].betId = i;
    }

    ;
  },

  /**
   * 本局状态信息
   * @param {*} ret 
   */
  firstTimeEntryInit_Function: function firstTimeEntryInit_Function(ret) {
    if (ret.data.tableState[ret.data.tableState.length - 1].play) {
      if (ret.data.remainTime > 0) {
        this.currentTime = ret.data.remainTime;
        this.totalTime = ret.data.remainTime;
        this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
        this.com_Timer.active = true;
        this.timeRun = true;
      }

      switch (ret.data.state) {
        case 0:
          this.gameState = this.GS_GAMESTART;

          for (var k = 0; k < ret.data.tableState.length - 1; k++) {
            if (ret.data.tableState[k].userId) {
              this.canSendCard[k] = 1;

              if (ret.data.tableState[k].userId === this.playerInfo.playerId) {
                this.com_Tips.getChildByName("sp_Tips01").active = false;
                this.isGaming = true;
              }
            }
          }

          break;

        case 1:
          this.gameState = this.GS_GRABBANKER;

          for (var k = 0; k < ret.data.tableState.length - 1; k++) {
            if (ret.data.tableState[k].userId) {
              if (ret.data.tableState[k].userId === this.playerInfo.playerId) {
                for (var k = 0; k < 4; k++) {
                  this.cardArray[k].active = true;
                  this.cardArray[k].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[this.netWork.seatId][k]);
                }

                this.com_Button.getChildByName("com_GrabButton").active = true;
                this.com_Tips.getChildByName("sp_Tips01").active = false;
                this.isGaming = true;
              } else {
                var seatIndex = this.changeSeatId_Function(k);

                for (var k = 0; k < 4; k++) {
                  this.cardArray[k + 5 * seatIndex].active = true;
                }
              }

              this.canSendCard[k] = 1;
            }
          }

          break;

        case 2:
          this.gameState = this.GS_SELECTBET;

          for (var i = 0; i < ret.data.tableState.length - 1; i++) {
            if (ret.data.tableState[i].userId) {
              if (ret.data.tableState[i].userId === this.playerInfo.playerId) {
                for (var k = 0; k < 4; k++) {
                  this.cardArray[k].active = true;
                  this.cardArray[k].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[this.netWork.seatId][k]);
                }

                if (ret.data.tableState[ret.data.tableState.length - 1].seatId !== this.netWork.seatId) {
                  this.com_Button.getChildByName("com_BetButton").active = true;
                }

                this.com_Tips.getChildByName("sp_Tips01").active = false, this.isGaming = true;
              } else {
                var seatIndex = this.changeSeatId_Function(i);

                for (var k = 0; k < 4; k++) {
                  this.cardArray[k + 5 * seatIndex].active = true;
                }
              }

              this.canSendCard[i] = 1;
            }
          }

          this.bankerSeatId = ret.data.tableState[ret.data.tableState.length - 1].seatId;
          var seatId = this.changeSeatId_Function(ret.data.tableState[ret.data.tableState.length - 1].seatId);
          this.sp_BankerFrame.active = true;
          this.sp_BankerFrame.setPosition(this.com_PlayerMessage.getChildByName("com_Player" + seatId).position);
          this.an_SetBankerAnimation.active = true;

          switch (seatId) {
            case 0:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
              break;

            case 1:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
              break;

            case 2:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
              break;

            case 3:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y - 45);
              break;

            case 4:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
              break;
          }

          break;

        case 3:
          this.gameState = this.GS_SETBULL;

          for (var i = 0; i < ret.data.tableState.length - 1; i++) {
            if (ret.data.tableState[i].userId) {
              if (ret.data.tableState[i].userId === this.playerInfo.playerId) {
                for (var k = 0; k < 5; k++) {
                  this.cardArray[k].active = true;
                  this.cardArray[k].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[this.netWork.seatId][k]);
                }

                if (ret.data.tableState[i].reCallValueId === -1) {
                  this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_Bet[ret.data.tableState[i].callValueId];
                }

                this.com_Tips.getChildByName("sp_Tips01").active = false;
                this.com_GetBull.active = true;
                this.com_GetBull.getChildByName("bt_GetBull").active = true;
                this.com_GetBull.getChildByName("bt_NotBull").active = true;
                this.canSetBull = true;
                this.db_GetBullAnimation.playAnimation("start", 1);
                this.serverPoint = ret.data.my_point;
                this.isGaming = true;
              } else {
                var seatIndex = this.changeSeatId_Function(i);

                for (var k = 0; k < 5; k++) {
                  this.cardArray[k + 5 * seatIndex].active = true;
                }

                if (ret.data.tableState[ret.data.tableState.length - 1].showList[i] !== -1) {
                  for (var k = 0; k < 5; k++) {
                    this.cardArray[k + 5 * seatIndex].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[i][k]);
                  }

                  this.pointArray[seatIndex].active = true;
                  this.pointArray[seatIndex].getComponent("GrabBullPoint").setType_Function(ret.data.tableState[ret.data.tableState.length - 1].showList[i]);
                }

                this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_Bet[ret.data.tableState[i].callValueId];
              }
            }

            this.canSendCard[i] = 1;
          }

          this.bankerSeatId = ret.data.tableState[ret.data.tableState.length - 1].seatId;
          var seatIndex = this.changeSeatId_Function(ret.data.tableState[ret.data.tableState.length - 1].seatId);
          this.sp_BankerFrame.active = true;
          this.sp_BankerFrame.setPosition(this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).position);
          this.an_SetBankerAnimation.active = true;

          switch (seatIndex) {
            case 0:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
              break;

            case 1:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
              break;

            case 2:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
              break;

            case 3:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y - 45);
              break;

            case 4:
              this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
              break;
          }

          this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_GrabBull[ret.data.tableState[ret.data.tableState.length - 1].bet];
          break;

        case 4:
          break;
      }
    }
  },

  /**
   * 开始游戏
   * @param {*} ret 
   */
  gameStart_Function: function gameStart_Function(ret) {
    this.gameReset_Function();
    this.timeRun = true;
    this.currentTime = ret.remainTime;
    this.totalTime = ret.remainTime;
    this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
    this.com_Timer.active = true, this.canSendCard = new Array(5);
    this.canSendCard = ret.tableState;
    this.isGaming = true;
    this.gameState = this.GS_GAMESTART;
  },

  /**
   * 发牌
   * @param {*} ret 
   */
  sendCard_Function: function sendCard_Function(ret) {
    for (var i = 0; i < this.cardArray.length; i++) {
      this.cardArray[i].active = false;
    }

    var seatIndex = 0;

    for (i = 0; i < this.canSendCard.length; i++) {
      if (this.canSendCard[i]) {
        seatIndex = this.changeSeatId_Function(i);
        this.com_SendCardAnimation.getChildByName("an_SendCardAnimation" + seatIndex).active = true;
        this.com_SendCardAnimation.getChildByName("an_SendCardAnimation" + seatIndex).getComponent("cc.Animation").play();
      }
    }

    if (this.playerInfo.soundEffectControl) {
      cc.audioEngine.play(this.au_SendCard, false, 1);
    }

    for (var i = 0; i < ret.card.length; i++) {
      this.resultCardArray[i] = ret.card[i];
    }

    this.timeRun = true;
    this.currentTime = ret.remainTime;
    this.totalTime = ret.remainTime;
    this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
    this.com_Timer.active = true;
    this.gameState = this.GS_GRABBANKER;
  },

  /**
   * 翻开前四张牌
   */
  openSendCard_Function: function openSendCard_Function() {
    for (var i = 0; i < 4; i++) {
      this.cardArray[i].getComponent("GrabBullCard").open_Function(this.resultCardArray[i]);
    }

    this.com_Button.getChildByName("com_GrabButton").active = true;
  },

  /**
   * 发最后一张牌
   * @param {*} ret 
   */
  reissueCard_Function: function reissueCard_Function(ret) {
    if (ret.cowPoint != -1) {
      this.serverPoint = ret.cowPoint;
      this.com_Button.getChildByName("com_BetButton").active = false;
      this.com_GetBull.active = true;
      this.com_GetBull.getChildByName("bt_GetBull").active = true;
      this.com_GetBull.getChildByName("bt_NotBull").active = true;
      this.db_GetBullAnimation.playAnimation("start", 1);
      this.canSetBull = true;
      this.resultCardArray[4] = ret.card[0];
    }

    var seatIndex = 0;

    for (var i = 0; i < this.canSendCard.length; i++) {
      if (this.canSendCard[i]) {
        seatIndex = this.changeSeatId_Function(i);
        this.com_ReissueCardAniamtion.getChildByName("an_ReissueCardAniamtion" + seatIndex).active = true;
        this.com_ReissueCardAniamtion.getChildByName("an_ReissueCardAniamtion" + seatIndex).getComponent("cc.Animation").play();
      }
    }

    if (this.playerInfo.soundEffectControl) {
      cc.audioEngine.play(this.au_SendCard, false, 1);
    }

    this.timeRun = true;
    this.currentTime = ret.remainTime;
    this.totalTime = ret.remainTime;
    this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
    this.com_Timer.active = true;
    this.gameState = this.GS_SETBULL;
  },

  /**
   * 翻开最后一张牌
   */
  openReissueCard_Function: function openReissueCard_Function() {
    this.cardArray[4].getComponent("GrabBullCard").open_Function(this.resultCardArray[4]);
  },

  /**
   * 
   * @param {*} self 
   */
  grabBanker_Function: function grabBanker_Function(self) {
    this.netWork.grabBullSocket.emit("call", JSON.stringify({
      callValueId: self.node.grab
    }));
    this.com_Button.getChildByName("com_GrabButton").active = false;

    if (this.playerInfo.soundEffectControl) {
      cc.audioEngine.play(this.au_ButtonSound, false, 1);
    }
  },

  /**
   * 
   * @param {*} ret 
   */
  setXbetBankerLabel_Function: function setXbetBankerLabel_Function(ret) {
    for (var i = 0; i < this.playerList.length; i++) {
      var seatIndex = this.changeSeatId_Function(ret.seatId);
      this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_GrabBull[ret.callValueId];
    }

    this.grabBullSelectArray[ret.seatId] = ret.callValueId;
  },

  /**
   * 抢庄倍数
   * @param {*} ret 
   */
  checkBanker_Function: function checkBanker_Function(ret) {
    this.timeRun = true;
    this.currentTime = ret.remainTime;
    this.totalTime = ret.remainTime;
    this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
    this.com_Timer.active = true;
    this.bankerSeatId = ret.bankerSeatId;
    var selectIndex = -1;
    var bankerIndex = 0;
    var randomBankerIndex = 0;
    var seatIndex = -1;

    for (var i = 0; i < this.grabBullSelectArray.length; i++) {
      if (this.grabBullSelectArray[i] >= selectIndex) {
        selectIndex = this.grabBullSelectArray[i];
        bankerIndex++;
      }
    }

    this.com_Button.getChildByName("com_GrabButton").active = false;

    if (bankerIndex > 1) {
      for (var i = 0; i < this.grabBullSelectArray.length; i++) {
        if (this.grabBullSelectArray[i] === selectIndex) {
          seatIndex = this.changeSeatId_Function(i);
          this.randomBankerArray[randomBankerIndex] = seatIndex;
          randomBankerIndex++;
        }
      }

      this.randomBanker = true;
    } else {
      this.setBanker_Function();
    }
  },

  /**
   * 
   * @param {*} self 
   */
  betSelect_Function: function betSelect_Function(self) {
    this.com_Button.getChildByName("com_BetButton").active = false;
    this.netWork.grabBullSocket.emit("reCall", JSON.stringify({
      reCallValueId: self.node.betId
    }));

    if (this.playerInfo.soundEffectControl) {
      cc.audioEngine.play(this.au_ButtonSound, false, 1);
    }
  },

  /**
   * 下注回调
   * @param {*} ret 
   */
  setXBetPlayerLabel_Function: function setXBetPlayerLabel_Function(ret) {
    for (var i = 0; i < this.playerList.length; i++) {
      var seatIndex = this.changeSeatId_Function(ret.seatId);
      var xbetSprite = this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite");
      xbetSprite.spriteFrame = this.sp_Bet[ret.reCallValueId];
    }
  },

  /**
   * 
   * @param {*} randomBankerList 
   */
  randomBanker_Function: function randomBanker_Function(randomBankerList) {
    this.sp_BankerFrame.active = true;

    if (this.randomBankerPosition >= randomBankerList.length) {
      this.randomBankerPosition = 0;
    }

    this.sp_BankerFrame.setPosition(this.com_PlayerMessage.children[this.randomBankerArray[this.randomBankerPosition]].position);
    this.randomBankerPosition++;
  },

  /**
   * 设置庄家
   */
  setBanker_Function: function setBanker_Function() {
    this.sp_BankerFrame.active = true; //庄家位置索引

    var bankerSeatIndex = this.changeSeatId_Function(this.bankerSeatId);
    this.sp_BankerFrame.setPosition(this.com_PlayerMessage.children[bankerSeatIndex].position);

    switch (bankerSeatIndex) {
      case 0:
        this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
        break;

      case 1:
        this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
        break;

      case 2:
        this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
        break;

      case 3:
        this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y - 45);
        break;

      case 4:
        this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
        break;
    }

    this.an_SetBankerAnimation.active = true;
    this.an_SetBankerAnimation.getComponent("cc.Animation").play();

    for (var i = 0; i < this.com_PlayerMessage.children.length; i++) {
      var xbetSprite = this.com_PlayerMessage.getChildByName("com_Player" + i).getChildByName("sp_Xbet").getComponent("cc.Sprite");

      if (bankerSeatIndex == i) {
        if (xbetSprite.spriteFrame === this.sp_GrabBull[0]) {
          xbetSprite.spriteFrame = this.sp_GrabBull[1];
        }
      } else {
        if (xbetSprite.spriteFrame == this.sp_GrabBull[0] && xbetSprite.spriteFrame == this.sp_GrabBull[1] && xbetSprite.spriteFrame == this.sp_GrabBull[2] && xbetSprite.spriteFrame == this.sp_GrabBull[3] && xbetSprite.spriteFrame == this.sp_GrabBull[4]) {
          xbetSprite.spriteFrame = null;
        }
      }
    }

    if (this.canSendCard[this.netWork.seatId] && this.netWork.seatId !== this.bankerSeatId) {
      this.com_Button.getChildByName("com_BetButton").active = true;
    }
  },

  /**
   * 检测是否有牛
   * @param {*} cardId 
   */
  checkBull_Function: function checkBull_Function(cardId) {
    var index = 0;

    for (var i = 0; i < this.cardClick.length; i++) {
      this.cardClick[i] && index++;
    }

    if (index < 3) {
      if (this.cardClick[cardId]) {
        this.cardClick[cardId] = false;
        this.cardArray[cardId].y = this.cardArray[cardId].y - 20;
        this.setGetBullLabel_Function(cardId, false);
      } else {
        this.cardClick[cardId] = true;
        this.cardArray[cardId].y = this.cardArray[cardId].y + 20;
        this.setGetBullLabel_Function(cardId, true);
      }
    } else {
      if (this.cardClick[cardId]) {
        this.cardClick[cardId] = false;
        this.cardArray[cardId].y = this.cardArray[cardId].y - 20;
        this.setGetBullLabel_Function(cardId, false);
      }
    }
  },

  /**
   * 设置牛牛计算机
   * @param {*} cardId 
   * @param {*} isDown 
   */
  setGetBullLabel_Function: function setGetBullLabel_Function(cardId, isDown) {
    if (isDown) {
      for (var i = 0; i < 3; i++) {
        if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string == "") {
          this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = this.cardArray[cardId].getComponent("GrabBullCard").point;
          break;
        }
      }
    } else {
      for (var i = 0; i < 3; i++) {
        if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string != "" && parseInt(this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string) === this.cardArray[cardId].getComponent("GrabBullCard").point) {
          this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = "";
          break;
        }
      }

      for (var i = 0; i < 2; i++) {
        if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string == "" && this.com_GetBull.getChildByName("lb_GetBull" + (i + 1)).getComponent("cc.Label").string !== "") {
          this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = this.com_GetBull.getChildByName("lb_GetBull" + (i + 1)).getComponent("cc.Label").string;
          this.com_GetBull.getChildByName("lb_GetBull" + (i + 1)).getComponent("cc.Label").string = "";
        }
      }
    }

    var num = 0;

    for (i = 0; i < 3; i++) {
      if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string !== "") {
        num += parseInt(this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string);
      }
    }

    if (num == 0) {
      this.com_GetBull.getChildByName("lb_GetBull3").getComponent("cc.Label").string = "";
    } else {
      this.com_GetBull.getChildByName("lb_GetBull3").getComponent("cc.Label").string = num;
    }
  },

  /**
   * 设置位置
   */
  setBullPoint_Function: function setBullPoint_Function() {
    var index = 0;

    for (var i = 0; i < 4; i++) {
      if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string !== "") {
        index++;
      }
    }

    if (index == 4 && parseInt(this.com_GetBull.getChildByName("lb_GetBull3").getComponent("cc.Label").string) % 10 === 0) {
      this.com_GetBull.active = false;
      this.com_GetBull.getChildByName("bt_GetBull").active = false;
      this.com_GetBull.getChildByName("bt_NotBull").active = false;
      this.netWork.grabBullSocket.emit("show");
    }
  },

  /**
   * 显示位置
   * @param {*} cowPoint 
   * @param {*} seatID 
   * @param {*} cardID 
   */
  showBullPoint_Function: function showBullPoint_Function(cowPoint, seatID, cardID) {
    var self = this;

    if (seatID === this.netWork.seatId) {
      this.db_GetBullAnimation.playAnimation("over", 1);
      this.canSetBull = false;
      this.scheduleOnce(function () {
        for (var i = 0; i < 5; i++) {
          this.cardArray[i].scaleX = 1;
          this.cardArray[i].scaleY = 1;
          this.cardArray[i].setPosition(this.cardPosition[0][0] + 120 * i, this.cardPosition[0][1]);
          this.cardArray[i].runAction(cc.moveTo(.2, self.openCardPosition[0] + 30 * i, self.openCardPosition[1]));
        }

        this.pointArray[0].active = true;
        this.pointArray[0].getComponent("GrabBullPoint").setType_Function(cowPoint);
        this.playerInfo.soundEffectControl && cc.audioEngine.play(self.au_Point[cowPoint], false, 1);
      }, 1, 0);
    } else {
      var seatIndex = this.changeSeatId_Function(seatID);

      for (var i = 0; i < 5; i++) {
        this.cardArray[i + 5 * seatIndex].getComponent("GrabBullCard").open_Function(cardID[i]);
      }

      this.pointArray[seatIndex].active = true;
      this.pointArray[seatIndex].getComponent("GrabBullPoint").setType_Function(cowPoint);
      this.scheduleOnce(function () {
        this.playerInfo.soundEffectControl && cc.audioEngine.play(self.au_Point[cowPoint], false, 1);
      }, .3);
    }
  },

  /**
   * 金币结算
   * @param {*} ret 
   */
  billing_Function: function billing_Function(ret) {
    this.isGaming = false;
    var self = this;
    this.scheduleOnce(function () {
      for (var i = 0; i < ret.openMsg.length; i++) {
        if (self.netWork.seatId === ret.openMsg[i].seatId) {
          if (ret.openMsg[i].win > 0) {
            self.an_DBSAnimation.playAnimation("win", 1);

            if (self.playerInfo.soundEffectControl) {
              cc.audioEngine.play(self.au_Win, false, 1);
            }
          } else {
            self.an_DBSAnimation.playAnimation("lose", 1);

            if (self.playerInfo.soundEffectControl) {
              cc.audioEngine.play(self.au_Lose, false, 1);
            }
          }

          break;
        }
      }
    }, 2);
    this.scheduleOnce(function () {
      for (var i = 0; i < self.cardArray.length; i++) {
        self.cardArray[i].getComponent("GrabBullCard").open_Function(0);
        self.cardArray[i].getComponent("GrabBullCard").point = 0;
        self.cardArray[i].active = false;
      }

      for (i = 0; i < self.pointArray.length; i++) {
        self.pointArray[i].active = false;
      }

      for (i = 0; i < self.com_PlayerMessage.children.length; i++) {
        self.com_PlayerMessage.getChildByName("com_Player" + i).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = null;
      }

      self.coinFly_Function(ret);
    }, 4);
    this.scheduleOnce(function () {
      for (var i = 0; i < ret.openMsg.length; i++) {
        if (self.netWork.seatId === ret.openMsg[i].seatId) {
          if (ret.openMsg[i].win > 0) {
            self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_WinScore").getChildByName("lb_Score").getComponent("cc.Label").string = "+" + ret.openMsg[i].win / self.playerInfo.exchangeRate;
            self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_WinScore").active = true;
            self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_WinScore").getComponent("cc.Animation").play();
          } else {
            self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_FailScore").getChildByName("lb_Score").getComponent("cc.Label").string = ret.openMsg[i].win / self.playerInfo.exchangeRate;
            self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_FailScore").active = true;
            self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_FailScore").getComponent("cc.Animation").play();
          }

          self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (parseFloat(self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerMoney").getComponent("cc.Label").string) + parseFloat(ret.openMsg[i].win / self.playerInfo.exchangeRate)).toFixed(2);
        } else {
          var seatId = self.changeSeatId_Function(ret.openMsg[i].seatId);

          if (ret.openMsg[i].win > 0) {
            self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_WinScore").getChildByName("lb_Score").getComponent("cc.Label").string = "+" + ret.openMsg[i].win / self.playerInfo.exchangeRate;
            self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_WinScore").active = true;
            self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_WinScore").getComponent("cc.Animation").play();
          } else {
            self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_FailScore").getChildByName("lb_Score").getComponent("cc.Label").string = ret.openMsg[i].win / self.playerInfo.exchangeRate;
            self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_FailScore").active = true;
            self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_FailScore").getComponent("cc.Animation").play();
          }

          if (self.com_PlayerMessage.children[seatId].getChildByName("lb_PlayerName").getComponent("cc.Label").string) {
            self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (parseFloat(self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string) + parseFloat(ret.openMsg[i].win / self.playerInfo.exchangeRate)).toFixed(2);
          }
        }
      }
    }, 7);
  },

  /**
   * 金币飞行特效处理
   * @param {*} ret 
   */
  coinFly_Function: function coinFly_Function(ret) {
    for (var i = 0; i < ret.openMsg.length; i++) {
      if (ret.openMsg[i].seatId !== this.bankerSeatId) {
        var seatId = this.changeSeatId_Function(ret.openMsg[i].seatId);
        var bankerSeatId = this.changeSeatId_Function(this.bankerSeatId);

        if (ret.openMsg[i].win < 0) {
          this.coinToBankerAnimation_Function(seatId, bankerSeatId);
        } else {
          this.coinToPlayerAnimation_Function(seatId, bankerSeatId);
        }
      }
    }

    ;

    if (this.playerInfo.soundEffectControl) {
      cc.audioEngine.play(this.au_Coin, false, 1);
    }
  },

  /**
   * 金币飞向庄家动画
   * @param {*} seatId 
   * @param {*} bankerSeatId 
   */
  coinToBankerAnimation_Function: function coinToBankerAnimation_Function(seatId, bankerSeatId) {
    for (var i = 0; i < this.coinArray.length / 5; i++) {
      for (var j = 0; j < this.coinArray.length; j++) {
        if (!this.coinArray[j].active) {
          this.coinArray[j].active = true;
          this.coinArray[j].getComponent("GrabBullCoin").setCoinToBanker_Function(this.com_PlayerMessage.getChildByName("com_Player" + seatId).position, this.com_PlayerMessage.getChildByName("com_Player" + bankerSeatId).position, i);
          break;
        }
      }
    }
  },

  /**
   * 金币飞向玩家动画
   * @param {*} seatId 
   * @param {*} bankerSeatId 
   */
  coinToPlayerAnimation_Function: function coinToPlayerAnimation_Function(seatId, bankerSeatId) {
    var self = this;
    this.scheduleOnce(function () {
      for (var i = 0; i < self.coinArray.length / 5; i++) {
        for (var j = 0; j < self.coinArray.length; j++) {
          if (!self.coinArray[j].active) {
            self.coinArray[j].active = true, self.coinArray[j].getComponent("GrabBullCoin").setCoinToPlayer_Function(self.com_PlayerMessage.getChildByName("com_Player" + seatId).position, self.com_PlayerMessage.getChildByName("com_Player" + bankerSeatId).position, i);
            break;
          }
        }
      }
    }, 1);
  },

  /**
   * 重新游戏
   */
  gameReset_Function: function gameReset_Function() {
    //
    for (var i = 0; i < this.cardArray.length; i++) {
      this.cardArray[i].active = false;
      this.cardArray[i].getComponent("GrabBullCard").open_Function(0);
      this.cardArray[i].getComponent("GrabBullCard").point = 0;
    } //


    for (i = 0; i < 5; i++) {
      this.cardArray[i].scaleX = this.cardArray[i].scaleY = 1.5;
      this.cardArray[i].setPosition(this.cardPosition[0][0] + 175 * i, this.cardPosition[0][1]);
      this.cardArray[i].getComponent("cc.Button").interactable = true;
    } //


    for (i = 0; i < 4; i++) {
      this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = "";
    } //


    for (i = 0; i < this.com_PlayerMessage.children.length; i++) {
      this.com_PlayerMessage.getChildByName("com_Player" + i).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = null;
    } //


    for (i = 0; i < this.pointArray.length; i++) {
      this.pointArray[i].active = false;
    } //


    for (i = 0; i < this.cardClick.length; i++) {
      this.cardClick[i] = false;
    }

    this.randomBankerArray = [];
    this.grabBullSelectArray = [];
    this.com_Button.getChildByName("com_GrabButton").active = false;
    this.com_Button.getChildByName("com_BetButton").active = false;
    this.com_GetBull.active = false;
    this.com_GetBull.getChildByName("bt_GetBull").active = true;
    this.com_GetBull.getChildByName("bt_NotBull").active = true;
    this.com_Timer.active = false;
    this.com_Bill.active = false;
    this.bankerSeatId = -1;
    this.gameState = 0;
    this.canSetBull = false;
    this.sp_BankerFrame.active = false;
    this.an_SetBankerAnimation.active = false;
    this.serverPoint = -1;
    this.coinFly = false;
    this.winResult = [];
    this.com_Tips.getChildByName("sp_Tips01").active = false;
  },

  /**
   * 延时处理
   * @param {*} dt 
   */
  timeCount_Function: function timeCount_Function(dt) {
    if (this.currentTime > 0) {
      if (this.timeCount >= 1) {
        this.timeCount = 0;
        this.currentTime--;
        this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;

        switch (this.gameState) {
          case this.GS_GAMESTART:
            if (this.currentTime == 2) {
              this.an_DBSAnimation.playAnimation("start", 1);

              if (this.playerInfo.soundEffectControl) {
                cc.audioEngine.play(this.au_GameStart, false, 1);
              }
            }

            break;

          case this.GS_SENDCARDS:
            break;

          case this.GS_GRABBANKER:
            break;

          case this.GS_SELECTBET:
            break;

          case this.GS_SETBULL:
            break;

          case this.GS_OPENCARD:
            break;

          case this.GS_BILLING:
            break;
        }
      } else {
        this.timeCount += dt;
      }
    } else {
      this.timeRun = false;

      switch (this.gameState) {
        case this.GS_GAMESTART:
          this.com_Timer.active = false;
          break;

        case this.GS_SENDCARDS:
          break;

        case this.GS_GRABBANKER:
          this.com_Button.getChildByName("com_GrabButton").active = false;
          break;

        case this.GS_SELECTBET:
          break;

        case this.GS_SETBULL:
          break;

        case this.GS_OPENCARD:
          break;

        case this.GS_BILLING:
          break;
      }
    }

    this.com_Timer.getChildByName("sp_Time").getComponent("cc.Sprite").fillRange = (this.currentTime - this.timeCount) / this.totalTime;
  },

  /**
   * 显示进入本局的玩家
   * @param {*} data 
   */
  playerEnterRoom_Function: function playerEnterRoom_Function(data) {
    var _this4 = this;

    this.playerList.push(data);
    var seatIndex = this.changeSeatId_Function(data.seatId);
    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").active = true;
    Helper.loadHead(data.headimgurl, function (sp) {
      _this4.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").getComponent("cc.Sprite").spriteFrame = sp;
    });
    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerName").getComponent("cc.Label").string = data.nickname;
    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (data.score / this.playerInfo.exchangeRate).toFixed(2);
  },

  /**
   * 隐藏离开本局的玩家UI
   * @param {*} seatId 
   * @param {*} userId 
   */
  playerLeaveRoom_Function: function playerLeaveRoom_Function(seatId, userId) {
    var index = 0;

    for (var i = 0; i < this.playerList.length; i++) {
      if (this.playerList[i].userId === userId) {
        index = i;
        break;
      }
    }

    var seatIndex = this.changeSeatId_Function(seatId);
    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").active = false;
    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerName").getComponent("cc.Label").string = "";
    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = "";
    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = null;

    for (var i = 0; i < 5; i++) {
      this.cardArray[i + 5 * seatIndex].active = false;
    }

    this.pointArray[seatIndex].active = false;
    this.playerList.splice(index, 1);
    this.sp_BankerFrame.active = false;
    this.an_SetBankerAnimation.active = false;
  },

  /**
   * 离开游戏，返回到大厅
   */
  exitGame_Function: function exitGame_Function() {
    this.gameExit = true;
    this.netWork.grabBullSocket.disconnect();
    this.netWork.grabBullSocket = null;
    cc.audioEngine.stopAll();
    cc.director.loadScene("LobbyMain");
  },

  /**
   * 
   * @param {*} seatId 
   */
  changeSeatId_Function: function changeSeatId_Function(seatId) {
    if (this.netWork.seatId) {
      var index = (5 - this.netWork.seatId + seatId) % 5;
      return index;
    }

    return seatId;
  },

  /**
   * 金币不足，离开房间
   */
  noMoneyOut_Function: function noMoneyOut_Function() {
    this.gameExit = true;
    this.com_MessageBox.getChildByName("bt_Confirm").active = true;
    this.com_MessageBox.getChildByName("bt_Reconnect").active = false;
    this.com_MessageBox.active = true;
    this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您的金币不足，已被请离房间。";
  },

  /**
   * 断线重连
   */
  disconnectNetWork_Function: function disconnectNetWork_Function() {
    this.bg_Black.active = true;

    if (this.gameExit) {
      this.netWork.grabBullSocket.disconnect();
    }

    this.netWork.grabBullSocket = null;
    this.playerInfo.gameDisconnect = true;
    this.com_MessageBox.active = true;
    this.com_MessageBox.getChildByName("bt_Confirm").active = false;
    this.com_MessageBox.getChildByName("bt_Reconnect").active = true;
    this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您已断线，请重新连接";
  },

  /**
   * 更新
   * @param {*} dt 
   */
  update: function update(dt) {
    if (this.randomBanker) {
      if (this.randomBankerTimer < 1.5) {
        if (this.randomBankerCount < .08) {
          this.randomBankerCount += dt;
        } else {
          this.randomBankerCount = 0;
          this.randomBanker_Function(this.randomBankerArray);
        }

        this.randomBankerTimer += dt;
      } else {
        this.randomBanker = false;
        this.randomBankerTimer = 0;
        this.setBanker_Function();
      }
    }

    if (this.timeRun) {
      this.timeCount_Function(dt);
    }

    if (this.coinFly) {
      this.coinAnimation_Function();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmFiQnVsbFxcR3JhYkJ1bGxNYWluLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY29tX0JHIiwidHlwZSIsIk5vZGUiLCJjb21fVmlldyIsImNvbV9QbGF5ZXJNZXNzYWdlIiwiY29tX0J1dHRvbiIsImNvbV9HYW1lTWVudSIsImNvbV9HZXRCdWxsIiwiY29tX1RpbWVyIiwiY29tX1NlbmRDYXJkQW5pbWF0aW9uIiwiY29tX1JlaXNzdWVDYXJkQW5pYW10aW9uIiwiY29tX0hlbHAiLCJjb21fQmlsbCIsImNvbV9NZXNzYWdlQm94IiwiY29tX0V4aXQiLCJjb21fVGlwcyIsInBiX0NhcmQiLCJQcmVmYWIiLCJwYl9Qb2ludCIsInBiX0NvaW4iLCJiZ19CbGFjayIsInNwX0JhbmtlckZyYW1lIiwic3BfR3JhYkJ1bGwiLCJTcHJpdGVGcmFtZSIsInNwX0JldCIsImFuX0dldEJ1bGwiLCJhbl9EcmFnb25Cb25lQW5pbWF0aW9uIiwiYW5fU2V0QmFua2VyQW5pbWF0aW9uIiwiYXVfR3JhYkJ1bGxCR00iLCJBdWRpb0NsaXAiLCJhdV9CdXR0b25Tb3VuZCIsImF1X1NlbmRDYXJkIiwiYXVfR2FtZVN0YXJ0IiwiYXVfUG9pbnQiLCJhdV9XaW4iLCJhdV9Mb3NlIiwiYXVfQ29pbiIsInZpcE5vZGUiLCJvbkxvYWQiLCJyZW5kZXJUeXBlIiwiZ2FtZSIsIlJFTkRFUl9UWVBFX0NBTlZBUyIsInJlbmRlcmVyIiwiZW5hYmxlRGlydHlSZWdpb24iLCJzZWxmIiwidmlldyIsInNldFJlc2l6ZUNhbGxiYWNrIiwidWlSZXNpemVfRnVuY3Rpb24iLCJnZXRWaXNpYmxlU2l6ZSIsInVpSW5pdF9GdW5jdGlvbiIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInNldEdhbWVPYmpfRnVuY3Rpb24iLCJuZXRXb3JrIiwic2V0R3JhYkJ1bGxPYmpfRnVuY3Rpb24iLCJnYW1lSW5pdF9GdW5jdGlvbiIsIm9uIiwic2hvd1ZpcCIsImNsb3NlVmlwIiwidmlwVGFwIiwiZ3JhYkJ1bGxTb2NrZXQiLCJlbWl0Iiwic2hvd1ZpcEJvb2wiLCJzZWF0SW5kZXgiLCJzaG93VmlwSW5kZXhMaXN0IiwiaiIsImNhcmRBcnJheSIsImdldENvbXBvbmVudCIsImNsb3NlX2Z1bmMiLCJzaXplIiwic2NhbGUiLCJ3aWR0aCIsImdldENoaWxkQnlOYW1lIiwic2NhbGVYIiwic2NhbGVZIiwieCIsIm5vZGUiLCJtaW5XaWR0aCIsInJldCIsInNldEdyYWJCdWxsU29ja2V0T25fRnVuY3Rpb24iLCJBcnJheSIsImNhcmRQb3NpdGlvbiIsIm9wZW5DYXJkUG9zaXRpb24iLCJpIiwibGVuZ3RoIiwiY2FyZCIsImluc3RhbnRpYXRlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsInBhcnNlSW50IiwiY2FudmFzTm9kZSIsImludGVyYWN0YWJsZSIsImNhcmRJZCIsImFjdGl2ZSIsInJlc3VsdENhcmRBcnJheSIsInBvaW50QXJyYXkiLCJwb2ludFBvc2l0aW9uIiwicG9pbnQiLCJzZXJ2ZXJQb2ludCIsImNvaW5BcnJheSIsImNvaW4iLCJjb2luRmx5IiwiYmFua2VyU2VhdElkIiwicmFuZG9tQmFua2VyVGltZXIiLCJyYW5kb21CYW5rZXIiLCJyYW5kb21CYW5rZXJBcnJheSIsInJhbmRvbUJhbmtlclBvc2l0aW9uIiwiZ3JhYkJ1bGxTZWxlY3RBcnJheSIsInJhbmRvbUJhbmtlckNvdW50IiwidGltZVJ1biIsImN1cnJlbnRUaW1lIiwidG90YWxUaW1lIiwidGltZUNvdW50IiwiY2FyZENsaWNrIiwicGxheWVyTGlzdCIsInN0cmluZyIsInBsYXllck5hbWUiLCJwbGF5ZXJDb2luIiwiZXhjaGFuZ2VSYXRlIiwidG9GaXhlZCIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJzcHJpdGVGcmFtZSIsImNhblNlbmRDYXJkIiwiZ2FtZVN0YXRlIiwiR1NfR0FNRVNUQVJUIiwiR1NfU0VORENBUkRTIiwiR1NfR1JBQkJBTktFUiIsIkdTX1NFTEVDVEJFVCIsIkdTX1NFVEJVTEwiLCJHU19PUEVOQ0FSRCIsIkdTX0JJTExJTkciLCJhbl9EQlNBbmltYXRpb24iLCJkYkFybWF0dXJlIiwiYXJtYXR1cmUiLCJjYW5TZXRCdWxsIiwiZGJfR2V0QnVsbEFuaW1hdGlvbiIsImRiX0dldEJ1bGxBcm1hdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkcmFnb25Cb25lcyIsIkV2ZW50T2JqZWN0IiwiRlJBTUVfRVZFTlQiLCJmcmFtZV9ldmVudF9GdW5jdGlvbiIsIndpblJlc3VsdCIsInRpbWVPdXQiLCJidXR0b25Jbml0X0Z1bmN0aW9uIiwibXVzaWNDb250cm9sIiwiYXVkaW9FbmdpbmUiLCJwbGF5IiwiaXNHYW1pbmciLCJnYW1lRXhpdCIsInBsYXllck1lc3NhZ2VJbml0X0Z1bmN0aW9uIiwidGFibGVMaXN0IiwiY2hhbmdlU2VhdElkX0Z1bmN0aW9uIiwic2VhdElkIiwiaGVhZGltZ3VybCIsIm5pY2tuYW1lIiwic2NvcmUiLCJldmVudCIsIm5hbWUiLCJjaGlsZHJlbiIsImdyYWIiLCJiZXRMaXN0IiwiYmV0IiwiYmV0SWQiLCJmaXJzdFRpbWVFbnRyeUluaXRfRnVuY3Rpb24iLCJkYXRhIiwidGFibGVTdGF0ZSIsInJlbWFpblRpbWUiLCJzdGF0ZSIsImsiLCJ1c2VySWQiLCJwbGF5ZXJJZCIsIm9wZW5fRnVuY3Rpb24iLCJjYXJkTGlzdCIsInBvc2l0aW9uIiwieSIsInJlQ2FsbFZhbHVlSWQiLCJjYWxsVmFsdWVJZCIsInBsYXlBbmltYXRpb24iLCJteV9wb2ludCIsInNob3dMaXN0Iiwic2V0VHlwZV9GdW5jdGlvbiIsImdhbWVTdGFydF9GdW5jdGlvbiIsImdhbWVSZXNldF9GdW5jdGlvbiIsInNlbmRDYXJkX0Z1bmN0aW9uIiwic291bmRFZmZlY3RDb250cm9sIiwib3BlblNlbmRDYXJkX0Z1bmN0aW9uIiwicmVpc3N1ZUNhcmRfRnVuY3Rpb24iLCJjb3dQb2ludCIsIm9wZW5SZWlzc3VlQ2FyZF9GdW5jdGlvbiIsImdyYWJCYW5rZXJfRnVuY3Rpb24iLCJKU09OIiwic3RyaW5naWZ5Iiwic2V0WGJldEJhbmtlckxhYmVsX0Z1bmN0aW9uIiwiY2hlY2tCYW5rZXJfRnVuY3Rpb24iLCJzZWxlY3RJbmRleCIsImJhbmtlckluZGV4IiwicmFuZG9tQmFua2VySW5kZXgiLCJzZXRCYW5rZXJfRnVuY3Rpb24iLCJiZXRTZWxlY3RfRnVuY3Rpb24iLCJzZXRYQmV0UGxheWVyTGFiZWxfRnVuY3Rpb24iLCJ4YmV0U3ByaXRlIiwicmFuZG9tQmFua2VyX0Z1bmN0aW9uIiwicmFuZG9tQmFua2VyTGlzdCIsImJhbmtlclNlYXRJbmRleCIsImNoZWNrQnVsbF9GdW5jdGlvbiIsImluZGV4Iiwic2V0R2V0QnVsbExhYmVsX0Z1bmN0aW9uIiwiaXNEb3duIiwibnVtIiwic2V0QnVsbFBvaW50X0Z1bmN0aW9uIiwic2hvd0J1bGxQb2ludF9GdW5jdGlvbiIsInNlYXRJRCIsImNhcmRJRCIsInNjaGVkdWxlT25jZSIsInJ1bkFjdGlvbiIsIm1vdmVUbyIsImJpbGxpbmdfRnVuY3Rpb24iLCJvcGVuTXNnIiwid2luIiwiY29pbkZseV9GdW5jdGlvbiIsInBhcnNlRmxvYXQiLCJjb2luVG9CYW5rZXJBbmltYXRpb25fRnVuY3Rpb24iLCJjb2luVG9QbGF5ZXJBbmltYXRpb25fRnVuY3Rpb24iLCJzZXRDb2luVG9CYW5rZXJfRnVuY3Rpb24iLCJzZXRDb2luVG9QbGF5ZXJfRnVuY3Rpb24iLCJ0aW1lQ291bnRfRnVuY3Rpb24iLCJkdCIsImZpbGxSYW5nZSIsInBsYXllckVudGVyUm9vbV9GdW5jdGlvbiIsInB1c2giLCJwbGF5ZXJMZWF2ZVJvb21fRnVuY3Rpb24iLCJzcGxpY2UiLCJleGl0R2FtZV9GdW5jdGlvbiIsImRpc2Nvbm5lY3QiLCJzdG9wQWxsIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJub01vbmV5T3V0X0Z1bmN0aW9uIiwiZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24iLCJnYW1l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QUFuQyxFQUFpRHFCLE1BQWpELEdBQTBELEtBQTFEO0FBQ0EsU0FBS2pGLGNBQUwsQ0FBb0I0RCxjQUFwQixDQUFtQyxjQUFuQyxFQUFtRHFCLE1BQW5ELEdBQTRELElBQTVEO0FBQ0EsU0FBS2pGLGNBQUwsQ0FBb0I0RCxjQUFwQixDQUFtQyxTQUFuQyxFQUE4Q0wsWUFBOUMsQ0FBMkQsVUFBM0QsRUFBdUVnRCxNQUF2RSxHQUFnRixZQUFoRjtBQUNILEdBM3VDSTs7QUE2dUNMO0FBQ0o7QUFDQTtBQUNBO0FBQ0lpSSxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVkLEVBQVYsRUFBYztBQUNsQixRQUFJLEtBQUs5SCxZQUFULEVBQXVCO0FBQ25CLFVBQUksS0FBS0QsaUJBQUwsR0FBeUIsR0FBN0IsRUFBa0M7QUFDOUIsWUFBSSxLQUFLSyxpQkFBTCxHQUF5QixHQUE3QixFQUFrQztBQUM5QixlQUFLQSxpQkFBTCxJQUEwQjBILEVBQTFCO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsZUFBSzFILGlCQUFMLEdBQXlCLENBQXpCO0FBQ0EsZUFBS2lHLHFCQUFMLENBQTJCLEtBQUtwRyxpQkFBaEM7QUFDSDs7QUFDRCxhQUFLRixpQkFBTCxJQUEwQitILEVBQTFCO0FBQ0gsT0FSRCxNQVFPO0FBQ0gsYUFBSzlILFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLRCxpQkFBTCxHQUF5QixDQUF6QjtBQUNBLGFBQUtrRyxrQkFBTDtBQUNIO0FBQ0o7O0FBQ0QsUUFBSSxLQUFLNUYsT0FBVCxFQUFrQjtBQUNkLFdBQUt3SCxrQkFBTCxDQUF3QkMsRUFBeEI7QUFDSDs7QUFDRCxRQUFJLEtBQUtqSSxPQUFULEVBQWtCO0FBQ2QsV0FBS2dKLHNCQUFMO0FBQ0g7QUFDSjtBQXZ3Q0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaKouW6hOeJm+eJm1xyXG4gKi9cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjb21fQkc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX1ZpZXc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX1BsYXllck1lc3NhZ2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX0J1dHRvbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fR2FtZU1lbnU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX0dldEJ1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX1RpbWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9TZW5kQ2FyZEFuaW1hdGlvbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fUmVpc3N1ZUNhcmRBbmlhbXRpb246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX0hlbHA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX0JpbGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX01lc3NhZ2VCb3g6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX0V4aXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX1RpcHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGJfQ2FyZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBiX1BvaW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGJfQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJnX0JsYWNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwX0JhbmtlckZyYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwX0dyYWJCdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BfQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW5fR2V0QnVsbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbl9EcmFnb25Cb25lQW5pbWF0aW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuX1NldEJhbmtlckFuaW1hdGlvbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdV9HcmFiQnVsbEJHTToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1X0J1dHRvblNvdW5kOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVfU2VuZENhcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdV9HYW1lU3RhcnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdV9Qb2ludDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdV9XaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdV9Mb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVfQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpcE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9jYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSk7XHJcbiAgICAgICAgLy/lhbPpl63ohI/nn6nlvaJcclxuICAgICAgICBpZiAoY2MucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgY2MucmVuZGVyZXIuZW5hYmxlRGlydHlSZWdpb24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2Mudmlldy5zZXRSZXNpemVDYWxsYmFjayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYudWlSZXNpemVfRnVuY3Rpb24oY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVpSW5pdF9GdW5jdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5zZXRHYW1lT2JqX0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubmV0V29yayA9IHJlcXVpcmUoXCJHcmFiQnVsbE5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuc2V0R3JhYkJ1bGxPYmpfRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lSW5pdF9GdW5jdGlvbigpO1xyXG4gICAgICAgIC8vdmlw54m55p2DXHJcbiAgICAgICAgdGhpcy52aXBOb2RlLm9uKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaXAoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZpcE5vZGUub24oJ3RvdWNoZW5kJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlVmlwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52aXBOb2RlLm9uKCd0b3VjaGNhbmNlbCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVZpcCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL3ZpcOeJueadg1xyXG4gICAgc2hvd1ZpcCgpIHtcclxuICAgICAgICB0aGlzLm5ldFdvcmsudmlwVGFwID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQuZW1pdChcInZpcEdldENhcmRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vdmlw54m55p2DXHJcbiAgICBjbG9zZVZpcCgpIHtcclxuICAgICAgICB0aGlzLm5ldFdvcmsudmlwVGFwID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubmV0V29yay5zaG93VmlwQm9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuc2hvd1ZpcEJvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2VhdEluZGV4IGluIHRoaXMubmV0V29yay5zaG93VmlwSW5kZXhMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDU7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ogKyA1ICogdGhpcy5uZXRXb3JrLnNob3dWaXBJbmRleExpc3Rbc2VhdEluZGV4XV0uZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxDYXJkXCIpLmNsb3NlX2Z1bmMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgdWlJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gc2l6ZS53aWR0aCAvIDEzMzQ7XHJcbiAgICAgICAgaWYgKHNpemUud2lkdGggPiAxMzM0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0JHLmdldENoaWxkQnlOYW1lKFwiYmdcIikuc2NhbGVYID0gdGhpcy5jb21fQkcuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5zY2FsZVkgPSBzY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5iZ19CbGFjay5zY2FsZVggPSB0aGlzLmJnX0JsYWNrLnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllcjBcIikueCA9IC1zaXplLndpZHRoIC8gMiArIDEwMDtcclxuICAgICAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfRXhpdFwiKS54ID0gc2l6ZS53aWR0aCAvIDIgLSA4MDtcclxuICAgICAgICB9IGVsc2UgaWYgKHNpemUud2lkdGggPCAxMzM0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0JHLmdldENoaWxkQnlOYW1lKFwiYmdcIikuc2NhbGVYID0gdGhpcy5jb21fQkcuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5zY2FsZVkgPSAxIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuYmdfQmxhY2suc2NhbGVYID0gdGhpcy5iZ19CbGFjay5zY2FsZVkgPSAxIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImJ0X0V4aXRcIikueCA9IHNpemUud2lkdGggLyBzY2FsZSAvIDIgLSA4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXIxXCIpLnggPSAtdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXIwXCIpLng7XHJcbiAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXI0XCIpLnggPSB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllcjBcIikueDtcclxuICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJidF9IZWxwXCIpLnggPSAtdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfRXhpdFwiKS54O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBzaXplIFxyXG4gICAgICovXHJcbiAgICB1aVJlc2l6ZV9GdW5jdGlvbjogZnVuY3Rpb24gKHNpemUpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBzaXplLndpZHRoIC8gMTMzNDtcclxuICAgICAgICBpZiAoc2l6ZS53aWR0aCA+IDEzMzQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMubm9kZS5zY2FsZVkgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9CRy5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLnNjYWxlWCA9IHRoaXMuY29tX0JHLmdldENoaWxkQnlOYW1lKFwiYmdcIikuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuYmdfQmxhY2suc2NhbGVYID0gdGhpcy5iZ19CbGFjay5zY2FsZVkgPSBzY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXIwXCIpLnggPSAtc2l6ZS53aWR0aCAvIDIgKyAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImJ0X0V4aXRcIikueCA9IHNpemUud2lkdGggLyAyIC0gODA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaXplLndpZHRoIDwgMTMzNCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gdGhpcy5ub2RlLnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgICAgICB2YXIgbWluV2lkdGggPSBzaXplLndpZHRoIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0JHLmdldENoaWxkQnlOYW1lKFwiYmdcIikuc2NhbGVYID0gdGhpcy5jb21fQkcuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5zY2FsZVkgPSAxIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuYmdfQmxhY2suc2NhbGVYID0gdGhpcy5iZ19CbGFjay5zY2FsZVkgPSAxIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS54ID0gLW1pbldpZHRoIC8gMiArIDEwMDtcclxuICAgICAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfRXhpdFwiKS54ID0gbWluV2lkdGggLyAyIC0gODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMVwiKS54ID0gLXRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS54LFxyXG4gICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllcjRcIikueCA9IHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS54LFxyXG4gICAgICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJidF9IZWxwXCIpLnggPSAtdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfRXhpdFwiKS54XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/liJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgZ2FtZUluaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJnX0JsYWNrLm9uKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLnNldEdyYWJCdWxsU29ja2V0T25fRnVuY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmNhcmRBcnJheSA9IG5ldyBBcnJheSgyNSk7XHJcbiAgICAgICAgdGhpcy5jYXJkUG9zaXRpb24gPSBbXHJcbiAgICAgICAgICAgIFstMzUwLCAtMjYwXSxcclxuICAgICAgICAgICAgWzI4MCwgMTBdLFxyXG4gICAgICAgICAgICBbMTQwLCAxODBdLFxyXG4gICAgICAgICAgICBbLTI2MCwgMTgwXSxcclxuICAgICAgICAgICAgWy00MDAsIDEwXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5vcGVuQ2FyZFBvc2l0aW9uID0gWy02MCwgLTEyMF07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNhcmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX0NhcmQpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtpXSA9IGNhcmQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1ZpZXcuYWRkQ2hpbGQodGhpcy5jYXJkQXJyYXlbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaSA8IDUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ldLnNjYWxlWCA9IHRoaXMuY2FyZEFycmF5W2ldLnNjYWxlWSA9IDEuNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ldLnNldFBvc2l0aW9uKHRoaXMuY2FyZFBvc2l0aW9uW3BhcnNlSW50KGkgLyA1KV1bMF0gKyAxNzUgKiBwYXJzZUludChpICUgNSksIHRoaXMuY2FyZFBvc2l0aW9uW3BhcnNlSW50KGkgLyA1KV1bMV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbaV0uZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxDYXJkXCIpLmNhbnZhc05vZGUgPSB0aGlzLCB0aGlzLmNhcmRBcnJheVtpXS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ldLmNhcmRJZCA9IGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtpXS5zZXRQb3NpdGlvbih0aGlzLmNhcmRQb3NpdGlvbltwYXJzZUludChpIC8gNSldWzBdICsgMzAgKiBwYXJzZUludChpICUgNSksIHRoaXMuY2FyZFBvc2l0aW9uW3BhcnNlSW50KGkgLyA1KV1bMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXN1bHRDYXJkQXJyYXkgPSBuZXcgQXJyYXkoNSk7XHJcbiAgICAgICAgdGhpcy5wb2ludEFycmF5ID0gbmV3IEFycmF5KDUpO1xyXG4gICAgICAgIHRoaXMucG9pbnRQb3NpdGlvbiA9IFtcclxuICAgICAgICAgICAgWzAsIC0xNTBdLFxyXG4gICAgICAgICAgICBbMzQwLCAtMjVdLFxyXG4gICAgICAgICAgICBbMjAwLCAxNDVdLFxyXG4gICAgICAgICAgICBbLTIxMCwgMTQ1XSxcclxuICAgICAgICAgICAgWy0zNDAsIC0yNV1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9pbnRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcG9pbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX1BvaW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludEFycmF5W2ldID0gcG9pbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1ZpZXcuYWRkQ2hpbGQodGhpcy5wb2ludEFycmF5W2ldKTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludEFycmF5W2ldLnNldFBvc2l0aW9uKHRoaXMucG9pbnRQb3NpdGlvbltpXVswXSwgdGhpcy5wb2ludFBvc2l0aW9uW2ldWzFdKTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludEFycmF5W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNlcnZlclBvaW50ID0gLTE7XHJcbiAgICAgICAgdGhpcy5jb2luQXJyYXkgPSBuZXcgQXJyYXkoMjUwKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvaW5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29pbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGJfQ29pbik7XHJcbiAgICAgICAgICAgIHRoaXMuY29pbkFycmF5W2ldID0gY29pbjtcclxuICAgICAgICAgICAgdGhpcy5jb21fVmlldy5hZGRDaGlsZCh0aGlzLmNvaW5BcnJheVtpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29pbkFycmF5W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb2luRmx5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYW5rZXJTZWF0SWQgPSAtMTtcclxuICAgICAgICB0aGlzLnJhbmRvbUJhbmtlclRpbWVyID0gMDtcclxuICAgICAgICB0aGlzLnJhbmRvbUJhbmtlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmFuZG9tQmFua2VyQXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLnJhbmRvbUJhbmtlclBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnNwX0JhbmtlckZyYW1lLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ3JhYkJ1bGxTZWxlY3RBcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMucmFuZG9tQmFua2VyQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMudGltZVJ1biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb21fVGltZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYXJkQ2xpY2sgPSBuZXcgQXJyYXkoNSk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJMaXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllcjBcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9QbGF5ZXJOYW1lXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1BsYXllck1vbmV5XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9ICh0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbiAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMucGxheWVySW5mby5wbGF5ZXJIZWFkSWQsIHNwID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXIwXCIpLmdldENoaWxkQnlOYW1lKFwic3BfUGxheWVySGVhZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllcjBcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9QbGF5ZXJIZWFkXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FuU2VuZENhcmQgPSBbMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAwO1xyXG4gICAgICAgIHRoaXMuR1NfR0FNRVNUQVJUID0gMTtcclxuICAgICAgICB0aGlzLkdTX1NFTkRDQVJEUyA9IDI7XHJcbiAgICAgICAgdGhpcy5HU19HUkFCQkFOS0VSID0gMztcclxuICAgICAgICB0aGlzLkdTX1NFTEVDVEJFVCA9IDQ7XHJcbiAgICAgICAgdGhpcy5HU19TRVRCVUxMID0gNTtcclxuICAgICAgICB0aGlzLkdTX09QRU5DQVJEID0gNjtcclxuICAgICAgICB0aGlzLkdTX0JJTExJTkcgPSA3O1xyXG5cclxuICAgICAgICB0aGlzLmFuX0RCU0FuaW1hdGlvbiA9IHRoaXMuYW5fRHJhZ29uQm9uZUFuaW1hdGlvbi5nZXRDb21wb25lbnQoXCJkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXlcIik7XHJcbiAgICAgICAgdGhpcy5kYkFybWF0dXJlID0gdGhpcy5hbl9EQlNBbmltYXRpb24uYXJtYXR1cmUoKTtcclxuICAgICAgICB0aGlzLmNhblNldEJ1bGwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRiX0dldEJ1bGxBbmltYXRpb24gPSB0aGlzLmFuX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJkYl9HZXRCdWxsXCIpLmdldENvbXBvbmVudChcImRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVwiKTtcclxuICAgICAgICB0aGlzLmRiX0dldEJ1bGxBcm1hdHVyZSA9IHRoaXMuZGJfR2V0QnVsbEFuaW1hdGlvbi5hcm1hdHVyZSgpO1xyXG4gICAgICAgIHRoaXMuZGJfR2V0QnVsbEFuaW1hdGlvbi5hZGRFdmVudExpc3RlbmVyKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZSQU1FX0VWRU5ULCB0aGlzLmZyYW1lX2V2ZW50X0Z1bmN0aW9uLCB0aGlzKTtcclxuICAgICAgICB0aGlzLndpblJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMudGltZU91dCA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbkluaXRfRnVuY3Rpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLm11c2ljQ29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVfR3JhYkJ1bGxCR00sIHRydWUsIC41KTtcclxuICAgICAgICB0aGlzLmlzR2FtaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5nYW1lRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmV0V29yay5ncmFiQnVsbFNvY2tldC5lbWl0KFwiZ2V0RG93blRpbWVcIiwge30pO1xyXG4gICAgICAgIHRoaXMubmV0V29yay5ncmFiQnVsbFNvY2tldC5lbWl0KFwiZ2V0VGFibGVMaXN0XCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluW6p+S9jeS4iueOqeWutueahOS/oeaBr1xyXG4gICAgICogQHBhcmFtIHsqfSB0YWJsZUxpc3QgXHJcbiAgICAgKi9cclxuICAgIHBsYXllck1lc3NhZ2VJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAodGFibGVMaXN0KSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJMaXN0ID0gdGFibGVMaXN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWF0SW5kZXggPSAtMTtcclxuICAgICAgICAgICAgc2VhdEluZGV4ID0gdGhpcy5jaGFuZ2VTZWF0SWRfRnVuY3Rpb24odGhpcy5wbGF5ZXJMaXN0W2ldLnNlYXRJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwic3BfUGxheWVySGVhZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJMaXN0W2ldLmhlYWRpbWd1cmwsIHNwID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwic3BfUGxheWVySGVhZFwiKS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aGlzLnBsYXllckxpc3RbaV0ubmlja25hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTW9uZXlcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKHRoaXMucGxheWVyTGlzdFtpXS5zY29yZSAvIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS+puWQrOWZqFxyXG4gICAgICogQHBhcmFtIHsqfSBldmVudCBcclxuICAgICAqL1xyXG4gICAgZnJhbWVfZXZlbnRfRnVuY3Rpb246IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwic3RhcnRcIjpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwid2luXCI6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxvc2VcIjpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwib3ZlclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fR2V0QnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjInpkq7liJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgYnV0dG9uSW5pdF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0dyYWJCdXR0b25cIikuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0dyYWJCdXR0b25cIikuY2hpbGRyZW5baV0uZ3JhYiA9IGk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgYmV0TGlzdCA9IFs1LCAxMCwgMjAsIDMwXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0JldEJ1dHRvblwiKS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmV0QnV0dG9uXCIpLmNoaWxkcmVuW2ldLmJldCA9IGJldExpc3RbaV07XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImNvbV9CZXRCdXR0b25cIikuY2hpbGRyZW5baV0uYmV0SWQgPSBpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pys5bGA54q25oCB5L+h5oGvXHJcbiAgICAgKiBAcGFyYW0geyp9IHJldCBcclxuICAgICAqL1xyXG4gICAgZmlyc3RUaW1lRW50cnlJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgaWYgKHJldC5kYXRhLnRhYmxlU3RhdGVbcmV0LmRhdGEudGFibGVTdGF0ZS5sZW5ndGggLSAxXS5wbGF5KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXQuZGF0YS5yZW1haW5UaW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IHJldC5kYXRhLnJlbWFpblRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsVGltZSA9IHJldC5kYXRhLnJlbWFpblRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9UaW1lci5nZXRDaGlsZEJ5TmFtZShcImxiX1RpbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX1RpbWVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVSdW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAocmV0LmRhdGEuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHRoaXMuR1NfR0FNRVNUQVJUO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcmV0LmRhdGEudGFibGVTdGF0ZS5sZW5ndGggLSAxOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5kYXRhLnRhYmxlU3RhdGVba10udXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhblNlbmRDYXJkW2tdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQuZGF0YS50YWJsZVN0YXRlW2tdLnVzZXJJZCA9PT0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21fVGlwcy5nZXRDaGlsZEJ5TmFtZShcInNwX1RpcHMwMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzR2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHRoaXMuR1NfR1JBQkJBTktFUjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHJldC5kYXRhLnRhYmxlU3RhdGUubGVuZ3RoIC0gMTsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQuZGF0YS50YWJsZVN0YXRlW2tdLnVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5kYXRhLnRhYmxlU3RhdGVba10udXNlcklkID09PSB0aGlzLnBsYXllckluZm8ucGxheWVySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IDQ7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtrXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtrXS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbENhcmRcIikub3Blbl9GdW5jdGlvbihyZXQuZGF0YS50YWJsZVN0YXRlW3JldC5kYXRhLnRhYmxlU3RhdGUubGVuZ3RoIC0gMV0uY2FyZExpc3RbdGhpcy5uZXRXb3JrLnNlYXRJZF1ba10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fR3JhYkJ1dHRvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX1RpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9UaXBzMDFcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWF0SW5kZXggPSB0aGlzLmNoYW5nZVNlYXRJZF9GdW5jdGlvbihrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IDQ7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtrICsgNSAqIHNlYXRJbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhblNlbmRDYXJkW2tdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHRoaXMuR1NfU0VMRUNUQkVUO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0LmRhdGEudGFibGVTdGF0ZS5sZW5ndGggLSAxOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQuZGF0YS50YWJsZVN0YXRlW2ldLnVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5kYXRhLnRhYmxlU3RhdGVbaV0udXNlcklkID09PSB0aGlzLnBsYXllckluZm8ucGxheWVySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IDQ7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtrXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtrXS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbENhcmRcIikub3Blbl9GdW5jdGlvbihyZXQuZGF0YS50YWJsZVN0YXRlW3JldC5kYXRhLnRhYmxlU3RhdGUubGVuZ3RoIC0gMV0uY2FyZExpc3RbdGhpcy5uZXRXb3JrLnNlYXRJZF1ba10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmRhdGEudGFibGVTdGF0ZVtyZXQuZGF0YS50YWJsZVN0YXRlLmxlbmd0aCAtIDFdLnNlYXRJZCAhPT0gdGhpcy5uZXRXb3JrLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmV0QnV0dG9uXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX1RpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9UaXBzMDFcIikuYWN0aXZlID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1pbmcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWF0SW5kZXggPSB0aGlzLmNoYW5nZVNlYXRJZF9GdW5jdGlvbihpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IDQ7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtrICsgNSAqIHNlYXRJbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhblNlbmRDYXJkW2ldID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFua2VyU2VhdElkID0gcmV0LmRhdGEudGFibGVTdGF0ZVtyZXQuZGF0YS50YWJsZVN0YXRlLmxlbmd0aCAtIDFdLnNlYXRJZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VhdElkID0gdGhpcy5jaGFuZ2VTZWF0SWRfRnVuY3Rpb24ocmV0LmRhdGEudGFibGVTdGF0ZVtyZXQuZGF0YS50YWJsZVN0YXRlLmxlbmd0aCAtIDFdLnNlYXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcF9CYW5rZXJGcmFtZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BfQmFua2VyRnJhbWUuc2V0UG9zaXRpb24odGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJZCkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5fU2V0QmFua2VyQW5pbWF0aW9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uc2V0UG9zaXRpb24odGhpcy5zcF9CYW5rZXJGcmFtZS5wb3NpdGlvbi54ICsgOTAsIHRoaXMuc3BfQmFua2VyRnJhbWUueSArIDU1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuX1NldEJhbmtlckFuaW1hdGlvbi5zZXRQb3NpdGlvbih0aGlzLnNwX0JhbmtlckZyYW1lLnBvc2l0aW9uLnggLSA5MCwgdGhpcy5zcF9CYW5rZXJGcmFtZS55IC0gNDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5fU2V0QmFua2VyQW5pbWF0aW9uLnNldFBvc2l0aW9uKHRoaXMuc3BfQmFua2VyRnJhbWUucG9zaXRpb24ueCAtIDkwLCB0aGlzLnNwX0JhbmtlckZyYW1lLnkgLSA0NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uc2V0UG9zaXRpb24odGhpcy5zcF9CYW5rZXJGcmFtZS5wb3NpdGlvbi54ICsgOTAsIHRoaXMuc3BfQmFua2VyRnJhbWUueSAtIDQ1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuX1NldEJhbmtlckFuaW1hdGlvbi5zZXRQb3NpdGlvbih0aGlzLnNwX0JhbmtlckZyYW1lLnBvc2l0aW9uLnggKyA5MCwgdGhpcy5zcF9CYW5rZXJGcmFtZS55ICsgNTUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdGhpcy5HU19TRVRCVUxMO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0LmRhdGEudGFibGVTdGF0ZS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5kYXRhLnRhYmxlU3RhdGVbaV0udXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmRhdGEudGFibGVTdGF0ZVtpXS51c2VySWQgPT09IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgNTsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2tdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2tdLmdldENvbXBvbmVudChcIkdyYWJCdWxsQ2FyZFwiKS5vcGVuX0Z1bmN0aW9uKHJldC5kYXRhLnRhYmxlU3RhdGVbcmV0LmRhdGEudGFibGVTdGF0ZS5sZW5ndGggLSAxXS5jYXJkTGlzdFt0aGlzLm5ldFdvcmsuc2VhdElkXVtrXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQuZGF0YS50YWJsZVN0YXRlW2ldLnJlQ2FsbFZhbHVlSWQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS5nZXRDaGlsZEJ5TmFtZShcInNwX1hiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9CZXRbcmV0LmRhdGEudGFibGVTdGF0ZVtpXS5jYWxsVmFsdWVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX1RpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9UaXBzMDFcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21fR2V0QnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJidF9HZXRCdWxsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21fR2V0QnVsbC5nZXRDaGlsZEJ5TmFtZShcImJ0X05vdEJ1bGxcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhblNldEJ1bGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGJfR2V0QnVsbEFuaW1hdGlvbi5wbGF5QW5pbWF0aW9uKFwic3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJQb2ludCA9IHJldC5kYXRhLm15X3BvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VhdEluZGV4ID0gdGhpcy5jaGFuZ2VTZWF0SWRfRnVuY3Rpb24oaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCA1OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbayArIDUgKiBzZWF0SW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQuZGF0YS50YWJsZVN0YXRlW3JldC5kYXRhLnRhYmxlU3RhdGUubGVuZ3RoIC0gMV0uc2hvd0xpc3RbaV0gIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgNTsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtrICsgNSAqIHNlYXRJbmRleF0uZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxDYXJkXCIpLm9wZW5fRnVuY3Rpb24ocmV0LmRhdGEudGFibGVTdGF0ZVtyZXQuZGF0YS50YWJsZVN0YXRlLmxlbmd0aCAtIDFdLmNhcmRMaXN0W2ldW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50QXJyYXlbc2VhdEluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50QXJyYXlbc2VhdEluZGV4XS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbFBvaW50XCIpLnNldFR5cGVfRnVuY3Rpb24ocmV0LmRhdGEudGFibGVTdGF0ZVtyZXQuZGF0YS50YWJsZVN0YXRlLmxlbmd0aCAtIDFdLnNob3dMaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJbmRleCkuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9YYmV0XCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfQmV0W3JldC5kYXRhLnRhYmxlU3RhdGVbaV0uY2FsbFZhbHVlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuU2VuZENhcmRbaV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhbmtlclNlYXRJZCA9IHJldC5kYXRhLnRhYmxlU3RhdGVbcmV0LmRhdGEudGFibGVTdGF0ZS5sZW5ndGggLSAxXS5zZWF0SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXRJbmRleCA9IHRoaXMuY2hhbmdlU2VhdElkX0Z1bmN0aW9uKHJldC5kYXRhLnRhYmxlU3RhdGVbcmV0LmRhdGEudGFibGVTdGF0ZS5sZW5ndGggLSAxXS5zZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BfQmFua2VyRnJhbWUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwX0JhbmtlckZyYW1lLnNldFBvc2l0aW9uKHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuX1NldEJhbmtlckFuaW1hdGlvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VhdEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5fU2V0QmFua2VyQW5pbWF0aW9uLnNldFBvc2l0aW9uKHRoaXMuc3BfQmFua2VyRnJhbWUucG9zaXRpb24ueCArIDkwLCB0aGlzLnNwX0JhbmtlckZyYW1lLnkgKyA1NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uc2V0UG9zaXRpb24odGhpcy5zcF9CYW5rZXJGcmFtZS5wb3NpdGlvbi54IC0gOTAsIHRoaXMuc3BfQmFua2VyRnJhbWUueSAtIDQ1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuX1NldEJhbmtlckFuaW1hdGlvbi5zZXRQb3NpdGlvbih0aGlzLnNwX0JhbmtlckZyYW1lLnBvc2l0aW9uLnggLSA5MCwgdGhpcy5zcF9CYW5rZXJGcmFtZS55IC0gNDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5fU2V0QmFua2VyQW5pbWF0aW9uLnNldFBvc2l0aW9uKHRoaXMuc3BfQmFua2VyRnJhbWUucG9zaXRpb24ueCArIDkwLCB0aGlzLnNwX0JhbmtlckZyYW1lLnkgLSA0NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uc2V0UG9zaXRpb24odGhpcy5zcF9CYW5rZXJGcmFtZS5wb3NpdGlvbi54ICsgOTAsIHRoaXMuc3BfQmFua2VyRnJhbWUueSArIDU1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdEluZGV4KS5nZXRDaGlsZEJ5TmFtZShcInNwX1hiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9HcmFiQnVsbFtyZXQuZGF0YS50YWJsZVN0YXRlW3JldC5kYXRhLnRhYmxlU3RhdGUubGVuZ3RoIC0gMV0uYmV0XTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vmuLjmiI9cclxuICAgICAqIEBwYXJhbSB7Kn0gcmV0IFxyXG4gICAgICovXHJcbiAgICBnYW1lU3RhcnRfRnVuY3Rpb246IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICB0aGlzLmdhbWVSZXNldF9GdW5jdGlvbigpO1xyXG4gICAgICAgIHRoaXMudGltZVJ1biA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IHJldC5yZW1haW5UaW1lO1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gcmV0LnJlbWFpblRpbWU7XHJcbiAgICAgICAgdGhpcy5jb21fVGltZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaW1lXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHRoaXMuY3VycmVudFRpbWU7XHJcbiAgICAgICAgdGhpcy5jb21fVGltZXIuYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgdGhpcy5jYW5TZW5kQ2FyZCA9IG5ldyBBcnJheSg1KTtcclxuICAgICAgICB0aGlzLmNhblNlbmRDYXJkID0gcmV0LnRhYmxlU3RhdGU7XHJcbiAgICAgICAgdGhpcy5pc0dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB0aGlzLkdTX0dBTUVTVEFSVDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HniYxcclxuICAgICAqIEBwYXJhbSB7Kn0gcmV0IFxyXG4gICAgICovXHJcbiAgICBzZW5kQ2FyZF9GdW5jdGlvbjogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWF0SW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhblNlbmRDYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhblNlbmRDYXJkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBzZWF0SW5kZXggPSB0aGlzLmNoYW5nZVNlYXRJZF9GdW5jdGlvbihpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX1NlbmRDYXJkQW5pbWF0aW9uLmdldENoaWxkQnlOYW1lKFwiYW5fU2VuZENhcmRBbmltYXRpb25cIiArIHNlYXRJbmRleCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX1NlbmRDYXJkQW5pbWF0aW9uLmdldENoaWxkQnlOYW1lKFwiYW5fU2VuZENhcmRBbmltYXRpb25cIiArIHNlYXRJbmRleCkuZ2V0Q29tcG9uZW50KFwiY2MuQW5pbWF0aW9uXCIpLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVfU2VuZENhcmQsIGZhbHNlLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQuY2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdENhcmRBcnJheVtpXSA9IHJldC5jYXJkW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVSdW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSByZXQucmVtYWluVGltZTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IHJldC5yZW1haW5UaW1lO1xyXG4gICAgICAgIHRoaXMuY29tX1RpbWVyLmdldENoaWxkQnlOYW1lKFwibGJfVGltZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aGlzLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIHRoaXMuY29tX1RpbWVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB0aGlzLkdTX0dSQUJCQU5LRVI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57+75byA5YmN5Zub5byg54mMXHJcbiAgICAgKi9cclxuICAgIG9wZW5TZW5kQ2FyZF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ldLmdldENvbXBvbmVudChcIkdyYWJCdWxsQ2FyZFwiKS5vcGVuX0Z1bmN0aW9uKHRoaXMucmVzdWx0Q2FyZEFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0dyYWJCdXR0b25cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HmnIDlkI7kuIDlvKDniYxcclxuICAgICAqIEBwYXJhbSB7Kn0gcmV0IFxyXG4gICAgICovXHJcbiAgICByZWlzc3VlQ2FyZF9GdW5jdGlvbjogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIGlmIChyZXQuY293UG9pbnQgIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJQb2ludCA9IHJldC5jb3dQb2ludDtcclxuICAgICAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0JldEJ1dHRvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb21fR2V0QnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwiYnRfR2V0QnVsbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwiYnRfTm90QnVsbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRiX0dldEJ1bGxBbmltYXRpb24ucGxheUFuaW1hdGlvbihcInN0YXJ0XCIsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmNhblNldEJ1bGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdENhcmRBcnJheVs0XSA9IHJldC5jYXJkWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VhdEluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2FuU2VuZENhcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuU2VuZENhcmRbaV0pIHtcclxuICAgICAgICAgICAgICAgIHNlYXRJbmRleCA9IHRoaXMuY2hhbmdlU2VhdElkX0Z1bmN0aW9uKGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fUmVpc3N1ZUNhcmRBbmlhbXRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJhbl9SZWlzc3VlQ2FyZEFuaWFtdGlvblwiICsgc2VhdEluZGV4KS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fUmVpc3N1ZUNhcmRBbmlhbXRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJhbl9SZWlzc3VlQ2FyZEFuaWFtdGlvblwiICsgc2VhdEluZGV4KS5nZXRDb21wb25lbnQoXCJjYy5BbmltYXRpb25cIikucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdV9TZW5kQ2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVSdW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSByZXQucmVtYWluVGltZTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IHJldC5yZW1haW5UaW1lO1xyXG4gICAgICAgIHRoaXMuY29tX1RpbWVyLmdldENoaWxkQnlOYW1lKFwibGJfVGltZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aGlzLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIHRoaXMuY29tX1RpbWVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB0aGlzLkdTX1NFVEJVTEw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57+75byA5pyA5ZCO5LiA5byg54mMXHJcbiAgICAgKi9cclxuICAgIG9wZW5SZWlzc3VlQ2FyZF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FyZEFycmF5WzRdLmdldENvbXBvbmVudChcIkdyYWJCdWxsQ2FyZFwiKS5vcGVuX0Z1bmN0aW9uKHRoaXMucmVzdWx0Q2FyZEFycmF5WzRdKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VsZiBcclxuICAgICAqL1xyXG4gICAgZ3JhYkJhbmtlcl9GdW5jdGlvbjogZnVuY3Rpb24gKHNlbGYpIHtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQuZW1pdChcImNhbGxcIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBjYWxsVmFsdWVJZDogc2VsZi5ub2RlLmdyYWJcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0dyYWJCdXR0b25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby5zb3VuZEVmZmVjdENvbnRyb2wpIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1X0J1dHRvblNvdW5kLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSByZXQgXHJcbiAgICAgKi9cclxuICAgIHNldFhiZXRCYW5rZXJMYWJlbF9GdW5jdGlvbjogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWF0SW5kZXggPSB0aGlzLmNoYW5nZVNlYXRJZF9GdW5jdGlvbihyZXQuc2VhdElkKTtcclxuICAgICAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJbmRleCkuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9YYmV0XCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfR3JhYkJ1bGxbcmV0LmNhbGxWYWx1ZUlkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncmFiQnVsbFNlbGVjdEFycmF5W3JldC5zZWF0SWRdID0gcmV0LmNhbGxWYWx1ZUlkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaKouW6hOWAjeaVsFxyXG4gICAgICogQHBhcmFtIHsqfSByZXQgXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQmFua2VyX0Z1bmN0aW9uOiBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgdGhpcy50aW1lUnVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gcmV0LnJlbWFpblRpbWU7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSByZXQucmVtYWluVGltZTtcclxuICAgICAgICB0aGlzLmNvbV9UaW1lci5nZXRDaGlsZEJ5TmFtZShcImxiX1RpbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5jdXJyZW50VGltZTtcclxuICAgICAgICB0aGlzLmNvbV9UaW1lci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYmFua2VyU2VhdElkID0gcmV0LmJhbmtlclNlYXRJZDtcclxuICAgICAgICB2YXIgc2VsZWN0SW5kZXggPSAtMTtcclxuICAgICAgICB2YXIgYmFua2VySW5kZXggPSAwO1xyXG4gICAgICAgIHZhciByYW5kb21CYW5rZXJJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIHNlYXRJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ncmFiQnVsbFNlbGVjdEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdyYWJCdWxsU2VsZWN0QXJyYXlbaV0gPj0gc2VsZWN0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEluZGV4ID0gdGhpcy5ncmFiQnVsbFNlbGVjdEFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgYmFua2VySW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fR3JhYkJ1dHRvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoYmFua2VySW5kZXggPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ncmFiQnVsbFNlbGVjdEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmFiQnVsbFNlbGVjdEFycmF5W2ldID09PSBzZWxlY3RJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJbmRleCA9IHRoaXMuY2hhbmdlU2VhdElkX0Z1bmN0aW9uKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZG9tQmFua2VyQXJyYXlbcmFuZG9tQmFua2VySW5kZXhdID0gc2VhdEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbUJhbmtlckluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yYW5kb21CYW5rZXIgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmFua2VyX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBzZWxmIFxyXG4gICAgICovXHJcbiAgICBiZXRTZWxlY3RfRnVuY3Rpb246IGZ1bmN0aW9uIChzZWxmKSB7XHJcbiAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0JldEJ1dHRvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQuZW1pdChcInJlQ2FsbFwiLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHJlQ2FsbFZhbHVlSWQ6IHNlbGYubm9kZS5iZXRJZFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVfQnV0dG9uU291bmQsIGZhbHNlLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL5rOo5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0geyp9IHJldCBcclxuICAgICAqL1xyXG4gICAgc2V0WEJldFBsYXllckxhYmVsX0Z1bmN0aW9uOiBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNlYXRJbmRleCA9IHRoaXMuY2hhbmdlU2VhdElkX0Z1bmN0aW9uKHJldC5zZWF0SWQpO1xyXG4gICAgICAgICAgICB2YXIgeGJldFNwcml0ZSA9IHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwic3BfWGJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIik7XHJcbiAgICAgICAgICAgIHhiZXRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX0JldFtyZXQucmVDYWxsVmFsdWVJZF07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSByYW5kb21CYW5rZXJMaXN0IFxyXG4gICAgICovXHJcbiAgICByYW5kb21CYW5rZXJfRnVuY3Rpb246IGZ1bmN0aW9uIChyYW5kb21CYW5rZXJMaXN0KSB7XHJcbiAgICAgICAgdGhpcy5zcF9CYW5rZXJGcmFtZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnJhbmRvbUJhbmtlclBvc2l0aW9uID49IHJhbmRvbUJhbmtlckxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZG9tQmFua2VyUG9zaXRpb24gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNwX0JhbmtlckZyYW1lLnNldFBvc2l0aW9uKHRoaXMuY29tX1BsYXllck1lc3NhZ2UuY2hpbGRyZW5bdGhpcy5yYW5kb21CYW5rZXJBcnJheVt0aGlzLnJhbmRvbUJhbmtlclBvc2l0aW9uXV0ucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMucmFuZG9tQmFua2VyUG9zaXRpb24rKztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7luoTlrrZcclxuICAgICAqL1xyXG4gICAgc2V0QmFua2VyX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zcF9CYW5rZXJGcmFtZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v5bqE5a625L2N572u57Si5byVXHJcbiAgICAgICAgdmFyIGJhbmtlclNlYXRJbmRleCA9IHRoaXMuY2hhbmdlU2VhdElkX0Z1bmN0aW9uKHRoaXMuYmFua2VyU2VhdElkKTtcclxuICAgICAgICB0aGlzLnNwX0JhbmtlckZyYW1lLnNldFBvc2l0aW9uKHRoaXMuY29tX1BsYXllck1lc3NhZ2UuY2hpbGRyZW5bYmFua2VyU2VhdEluZGV4XS5wb3NpdGlvbik7XHJcbiAgICAgICAgc3dpdGNoIChiYW5rZXJTZWF0SW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uc2V0UG9zaXRpb24odGhpcy5zcF9CYW5rZXJGcmFtZS5wb3NpdGlvbi54ICsgOTAsIHRoaXMuc3BfQmFua2VyRnJhbWUueSArIDU1KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuX1NldEJhbmtlckFuaW1hdGlvbi5zZXRQb3NpdGlvbih0aGlzLnNwX0JhbmtlckZyYW1lLnBvc2l0aW9uLnggLSA5MCwgdGhpcy5zcF9CYW5rZXJGcmFtZS55IC0gNDUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5fU2V0QmFua2VyQW5pbWF0aW9uLnNldFBvc2l0aW9uKHRoaXMuc3BfQmFua2VyRnJhbWUucG9zaXRpb24ueCAtIDkwLCB0aGlzLnNwX0JhbmtlckZyYW1lLnkgLSA0NSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uc2V0UG9zaXRpb24odGhpcy5zcF9CYW5rZXJGcmFtZS5wb3NpdGlvbi54ICsgOTAsIHRoaXMuc3BfQmFua2VyRnJhbWUueSAtIDQ1KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuX1NldEJhbmtlckFuaW1hdGlvbi5zZXRQb3NpdGlvbih0aGlzLnNwX0JhbmtlckZyYW1lLnBvc2l0aW9uLnggKyA5MCwgdGhpcy5zcF9CYW5rZXJGcmFtZS55ICsgNTUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5fU2V0QmFua2VyQW5pbWF0aW9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uZ2V0Q29tcG9uZW50KFwiY2MuQW5pbWF0aW9uXCIpLnBsYXkoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29tX1BsYXllck1lc3NhZ2UuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHhiZXRTcHJpdGUgPSB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgaSkuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9YYmV0XCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKTtcclxuICAgICAgICAgICAgaWYgKGJhbmtlclNlYXRJbmRleCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGJldFNwcml0ZS5zcHJpdGVGcmFtZSA9PT0gdGhpcy5zcF9HcmFiQnVsbFswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHhiZXRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX0dyYWJCdWxsWzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhiZXRTcHJpdGUuc3ByaXRlRnJhbWUgPT0gdGhpcy5zcF9HcmFiQnVsbFswXSAmJiB4YmV0U3ByaXRlLnNwcml0ZUZyYW1lID09IHRoaXMuc3BfR3JhYkJ1bGxbMV0gJiYgeGJldFNwcml0ZS5zcHJpdGVGcmFtZSA9PSB0aGlzLnNwX0dyYWJCdWxsWzJdICYmIHhiZXRTcHJpdGUuc3ByaXRlRnJhbWUgPT0gdGhpcy5zcF9HcmFiQnVsbFszXSAmJiB4YmV0U3ByaXRlLnNwcml0ZUZyYW1lID09IHRoaXMuc3BfR3JhYkJ1bGxbNF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB4YmV0U3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jYW5TZW5kQ2FyZFt0aGlzLm5ldFdvcmsuc2VhdElkXSAmJiB0aGlzLm5ldFdvcmsuc2VhdElkICE9PSB0aGlzLmJhbmtlclNlYXRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmV0QnV0dG9uXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+aYr+WQpuacieeJm1xyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkSWQgXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQnVsbF9GdW5jdGlvbjogZnVuY3Rpb24gKGNhcmRJZCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNhcmRDbGljay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRDbGlja1tpXSAmJiBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPCAzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcmRDbGlja1tjYXJkSWRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRDbGlja1tjYXJkSWRdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtjYXJkSWRdLnkgPSB0aGlzLmNhcmRBcnJheVtjYXJkSWRdLnkgLSAyMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2V0QnVsbExhYmVsX0Z1bmN0aW9uKGNhcmRJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkQ2xpY2tbY2FyZElkXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtjYXJkSWRdLnkgPSB0aGlzLmNhcmRBcnJheVtjYXJkSWRdLnkgKyAyMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2V0QnVsbExhYmVsX0Z1bmN0aW9uKGNhcmRJZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJkQ2xpY2tbY2FyZElkXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkQ2xpY2tbY2FyZElkXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbY2FyZElkXS55ID0gdGhpcy5jYXJkQXJyYXlbY2FyZElkXS55IC0gMjA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdldEJ1bGxMYWJlbF9GdW5jdGlvbihjYXJkSWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7niZvniZvorqHnrpfmnLpcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FyZElkIFxyXG4gICAgICogQHBhcmFtIHsqfSBpc0Rvd24gXHJcbiAgICAgKi9cclxuICAgIHNldEdldEJ1bGxMYWJlbF9GdW5jdGlvbjogZnVuY3Rpb24gKGNhcmRJZCwgaXNEb3duKSB7XHJcbiAgICAgICAgaWYgKGlzRG93bikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsXCIgKyBpKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsXCIgKyBpKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aGlzLmNhcmRBcnJheVtjYXJkSWRdLmdldENvbXBvbmVudChcIkdyYWJCdWxsQ2FyZFwiKS5wb2ludDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21fR2V0QnVsbC5nZXRDaGlsZEJ5TmFtZShcImxiX0dldEJ1bGxcIiArIGkpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyAhPSBcIlwiICYmIHBhcnNlSW50KHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsXCIgKyBpKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcpID09PSB0aGlzLmNhcmRBcnJheVtjYXJkSWRdLmdldENvbXBvbmVudChcIkdyYWJCdWxsQ2FyZFwiKS5wb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsXCIgKyBpKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21fR2V0QnVsbC5nZXRDaGlsZEJ5TmFtZShcImxiX0dldEJ1bGxcIiArIGkpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9PSBcIlwiICYmIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsXCIgKyAoaSArIDEpKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwibGJfR2V0QnVsbFwiICsgaSkuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5jb21fR2V0QnVsbC5nZXRDaGlsZEJ5TmFtZShcImxiX0dldEJ1bGxcIiArIChpICsgMSkpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwibGJfR2V0QnVsbFwiICsgKGkgKyAxKSkuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbnVtID0gMDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwibGJfR2V0QnVsbFwiICsgaSkuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBudW0gKz0gcGFyc2VJbnQodGhpcy5jb21fR2V0QnVsbC5nZXRDaGlsZEJ5TmFtZShcImxiX0dldEJ1bGxcIiArIGkpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsM1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsM1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruS9jee9rlxyXG4gICAgICovXHJcbiAgICBzZXRCdWxsUG9pbnRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwibGJfR2V0QnVsbFwiICsgaSkuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PSA0ICYmIHBhcnNlSW50KHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9HZXRCdWxsM1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcpICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21fR2V0QnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb21fR2V0QnVsbC5nZXRDaGlsZEJ5TmFtZShcImJ0X0dldEJ1bGxcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJidF9Ob3RCdWxsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQuZW1pdChcInNob3dcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuS9jee9rlxyXG4gICAgICogQHBhcmFtIHsqfSBjb3dQb2ludCBcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VhdElEIFxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkSUQgXHJcbiAgICAgKi9cclxuICAgIHNob3dCdWxsUG9pbnRfRnVuY3Rpb246IGZ1bmN0aW9uIChjb3dQb2ludCwgc2VhdElELCBjYXJkSUQpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHNlYXRJRCA9PT0gdGhpcy5uZXRXb3JrLnNlYXRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRiX0dldEJ1bGxBbmltYXRpb24ucGxheUFuaW1hdGlvbihcIm92ZXJcIiwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuU2V0QnVsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ldLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbaV0uc2NhbGVZID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtpXS5zZXRQb3NpdGlvbih0aGlzLmNhcmRQb3NpdGlvblswXVswXSArIDEyMCAqIGksIHRoaXMuY2FyZFBvc2l0aW9uWzBdWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtpXS5ydW5BY3Rpb24oY2MubW92ZVRvKC4yLCBzZWxmLm9wZW5DYXJkUG9zaXRpb25bMF0gKyAzMCAqIGksIHNlbGYub3BlbkNhcmRQb3NpdGlvblsxXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludEFycmF5WzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50QXJyYXlbMF0uZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxQb2ludFwiKS5zZXRUeXBlX0Z1bmN0aW9uKGNvd1BvaW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheShzZWxmLmF1X1BvaW50W2Nvd1BvaW50XSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICB9LCAxLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2VhdEluZGV4ID0gdGhpcy5jaGFuZ2VTZWF0SWRfRnVuY3Rpb24oc2VhdElEKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2kgKyA1ICogc2VhdEluZGV4XS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbENhcmRcIikub3Blbl9GdW5jdGlvbihjYXJkSURbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRBcnJheVtzZWF0SW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRBcnJheVtzZWF0SW5kZXhdLmdldENvbXBvbmVudChcIkdyYWJCdWxsUG9pbnRcIikuc2V0VHlwZV9GdW5jdGlvbihjb3dQb2ludCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheShzZWxmLmF1X1BvaW50W2Nvd1BvaW50XSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICB9LCAuMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHkeW4gee7k+eul1xyXG4gICAgICogQHBhcmFtIHsqfSByZXQgXHJcbiAgICAgKi9cclxuICAgIGJpbGxpbmdfRnVuY3Rpb246IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICB0aGlzLmlzR2FtaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lm9wZW5Nc2cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm5ldFdvcmsuc2VhdElkID09PSByZXQub3Blbk1zZ1tpXS5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0Lm9wZW5Nc2dbaV0ud2luID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFuX0RCU0FuaW1hdGlvbi5wbGF5QW5pbWF0aW9uKFwid2luXCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShzZWxmLmF1X1dpbiwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbl9EQlNBbmltYXRpb24ucGxheUFuaW1hdGlvbihcImxvc2VcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHNlbGYuYXVfTG9zZSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMik7XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLmNhcmRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYXJkQXJyYXlbaV0uZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxDYXJkXCIpLm9wZW5fRnVuY3Rpb24oMCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNhcmRBcnJheVtpXS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbENhcmRcIikucG9pbnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYXJkQXJyYXlbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGYucG9pbnRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wb2ludEFycmF5W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIGkpLmdldENoaWxkQnlOYW1lKFwic3BfWGJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmNvaW5GbHlfRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICB9LCA0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5vcGVuTXNnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5uZXRXb3JrLnNlYXRJZCA9PT0gcmV0Lm9wZW5Nc2dbaV0uc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5vcGVuTXNnW2ldLndpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXIwXCIpLmdldENoaWxkQnlOYW1lKFwibGJfV2luU2NvcmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9TY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIitcIiArIHJldC5vcGVuTXNnW2ldLndpbiAvIHNlbGYucGxheWVySW5mby5leGNoYW5nZVJhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1dpblNjb3JlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1dpblNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkFuaW1hdGlvblwiKS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXIwXCIpLmdldENoaWxkQnlOYW1lKFwibGJfRmFpbFNjb3JlXCIpLmdldENoaWxkQnlOYW1lKFwibGJfU2NvcmVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gcmV0Lm9wZW5Nc2dbaV0ud2luIC8gc2VsZi5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXIwXCIpLmdldENoaWxkQnlOYW1lKFwibGJfRmFpbFNjb3JlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyMFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX0ZhaWxTY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5BbmltYXRpb25cIikucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllcjBcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9QbGF5ZXJNb25leVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAocGFyc2VGbG9hdChzZWxmLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllcjBcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9QbGF5ZXJNb25leVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcpICsgcGFyc2VGbG9hdChyZXQub3Blbk1zZ1tpXS53aW4gLyBzZWxmLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXRJZCA9IHNlbGYuY2hhbmdlU2VhdElkX0Z1bmN0aW9uKHJldC5vcGVuTXNnW2ldLnNlYXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5vcGVuTXNnW2ldLndpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJZCkuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9XaW5TY29yZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1Njb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiK1wiICsgcmV0Lm9wZW5Nc2dbaV0ud2luIC8gc2VsZi5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJZCkuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9XaW5TY29yZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdElkKS5nZXRDaGlsZEJ5TmFtZShcImxiX1dpblNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkFuaW1hdGlvblwiKS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJZCkuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9GYWlsU2NvcmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9TY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSByZXQub3Blbk1zZ1tpXS53aW4gLyBzZWxmLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdElkKS5nZXRDaGlsZEJ5TmFtZShcImxiX0ZhaWxTY29yZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdElkKS5nZXRDaGlsZEJ5TmFtZShcImxiX0ZhaWxTY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5BbmltYXRpb25cIikucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb21fUGxheWVyTWVzc2FnZS5jaGlsZHJlbltzZWF0SWRdLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJZCkuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9QbGF5ZXJNb25leVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAocGFyc2VGbG9hdChzZWxmLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdElkKS5nZXRDaGlsZEJ5TmFtZShcImxiX1BsYXllck1vbmV5XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZykgKyBwYXJzZUZsb2F0KHJldC5vcGVuTXNnW2ldLndpbiAvIHNlbGYucGxheWVySW5mby5leGNoYW5nZVJhdGUpKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDcpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHkeW4gemjnuihjOeJueaViOWkhOeQhlxyXG4gICAgICogQHBhcmFtIHsqfSByZXQgXHJcbiAgICAgKi9cclxuICAgIGNvaW5GbHlfRnVuY3Rpb246IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5vcGVuTXNnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXQub3Blbk1zZ1tpXS5zZWF0SWQgIT09IHRoaXMuYmFua2VyU2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VhdElkID0gdGhpcy5jaGFuZ2VTZWF0SWRfRnVuY3Rpb24ocmV0Lm9wZW5Nc2dbaV0uc2VhdElkKTtcclxuICAgICAgICAgICAgICAgIHZhciBiYW5rZXJTZWF0SWQgPSB0aGlzLmNoYW5nZVNlYXRJZF9GdW5jdGlvbih0aGlzLmJhbmtlclNlYXRJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0Lm9wZW5Nc2dbaV0ud2luIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29pblRvQmFua2VyQW5pbWF0aW9uX0Z1bmN0aW9uKHNlYXRJZCwgYmFua2VyU2VhdElkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2luVG9QbGF5ZXJBbmltYXRpb25fRnVuY3Rpb24oc2VhdElkLCBiYW5rZXJTZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVfQ29pbiwgZmFsc2UsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph5HluIHpo57lkJHluoTlrrbliqjnlLtcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VhdElkIFxyXG4gICAgICogQHBhcmFtIHsqfSBiYW5rZXJTZWF0SWQgXHJcbiAgICAgKi9cclxuICAgIGNvaW5Ub0JhbmtlckFuaW1hdGlvbl9GdW5jdGlvbjogZnVuY3Rpb24gKHNlYXRJZCwgYmFua2VyU2VhdElkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvaW5BcnJheS5sZW5ndGggLyA1OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmNvaW5BcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvaW5BcnJheVtqXS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvaW5BcnJheVtqXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29pbkFycmF5W2pdLmdldENvbXBvbmVudChcIkdyYWJCdWxsQ29pblwiKS5zZXRDb2luVG9CYW5rZXJfRnVuY3Rpb24odGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJZCkucG9zaXRpb24sIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBiYW5rZXJTZWF0SWQpLnBvc2l0aW9uLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph5HluIHpo57lkJHnjqnlrrbliqjnlLtcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VhdElkIFxyXG4gICAgICogQHBhcmFtIHsqfSBiYW5rZXJTZWF0SWQgXHJcbiAgICAgKi9cclxuICAgIGNvaW5Ub1BsYXllckFuaW1hdGlvbl9GdW5jdGlvbjogZnVuY3Rpb24gKHNlYXRJZCwgYmFua2VyU2VhdElkKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLmNvaW5BcnJheS5sZW5ndGggLyA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VsZi5jb2luQXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuY29pbkFycmF5W2pdLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvaW5BcnJheVtqXS5hY3RpdmUgPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb2luQXJyYXlbal0uZ2V0Q29tcG9uZW50KFwiR3JhYkJ1bGxDb2luXCIpLnNldENvaW5Ub1BsYXllcl9GdW5jdGlvbihzZWxmLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdElkKS5wb3NpdGlvbiwgc2VsZi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIGJhbmtlclNlYXRJZCkucG9zaXRpb24sIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeaWsOa4uOaIj1xyXG4gICAgICovXHJcbiAgICBnYW1lUmVzZXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZEFycmF5W2ldLmdldENvbXBvbmVudChcIkdyYWJCdWxsQ2FyZFwiKS5vcGVuX0Z1bmN0aW9uKDApO1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtpXS5nZXRDb21wb25lbnQoXCJHcmFiQnVsbENhcmRcIikucG9pbnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbaV0uc2NhbGVYID0gdGhpcy5jYXJkQXJyYXlbaV0uc2NhbGVZID0gMS41O1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRBcnJheVtpXS5zZXRQb3NpdGlvbih0aGlzLmNhcmRQb3NpdGlvblswXVswXSArIDE3NSAqIGksIHRoaXMuY2FyZFBvc2l0aW9uWzBdWzFdKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbaV0uZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9HZXRCdWxsLmdldENoaWxkQnlOYW1lKFwibGJfR2V0QnVsbFwiICsgaSkuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgaSkuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9YYmV0XCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMucG9pbnRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50QXJyYXlbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcmRDbGljay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRDbGlja1tpXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJhbmRvbUJhbmtlckFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5ncmFiQnVsbFNlbGVjdEFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0dyYWJCdXR0b25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiY29tX0JldEJ1dHRvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbV9HZXRCdWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29tX0dldEJ1bGwuZ2V0Q2hpbGRCeU5hbWUoXCJidF9HZXRCdWxsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb21fR2V0QnVsbC5nZXRDaGlsZEJ5TmFtZShcImJ0X05vdEJ1bGxcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9UaW1lci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbV9CaWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFua2VyU2VhdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAwO1xyXG4gICAgICAgIHRoaXMuY2FuU2V0QnVsbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BfQmFua2VyRnJhbWUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbl9TZXRCYW5rZXJBbmltYXRpb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJQb2ludCA9IC0xO1xyXG4gICAgICAgIHRoaXMuY29pbkZseSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2luUmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5jb21fVGlwcy5nZXRDaGlsZEJ5TmFtZShcInNwX1RpcHMwMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlu7bml7blpITnkIZcclxuICAgICAqIEBwYXJhbSB7Kn0gZHQgXHJcbiAgICAgKi9cclxuICAgIHRpbWVDb3VudF9GdW5jdGlvbjogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVDb3VudCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9UaW1lci5nZXRDaGlsZEJ5TmFtZShcImxiX1RpbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nYW1lU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuR1NfR0FNRVNUQVJUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VGltZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuX0RCU0FuaW1hdGlvbi5wbGF5QW5pbWF0aW9uKFwic3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdV9HYW1lU3RhcnQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuR1NfU0VORENBUkRTOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuR1NfR1JBQkJBTktFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLkdTX1NFTEVDVEJFVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLkdTX1NFVEJVTEw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5HU19PUEVOQ0FSRDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLkdTX0JJTExJTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lQ291bnQgKz0gZHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVSdW4gPSBmYWxzZVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2FtZVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuR1NfR0FNRVNUQVJUOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX1RpbWVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkdTX1NFTkRDQVJEUzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5HU19HUkFCQkFOS0VSOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImNvbV9HcmFiQnV0dG9uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkdTX1NFTEVDVEJFVDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5HU19TRVRCVUxMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkdTX09QRU5DQVJEOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkdTX0JJTExJTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21fVGltZXIuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9UaW1lXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5maWxsUmFuZ2UgPSAodGhpcy5jdXJyZW50VGltZSAtIHRoaXMudGltZUNvdW50KSAvIHRoaXMudG90YWxUaW1lO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S66L+b5YWl5pys5bGA55qE546p5a62XHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHBsYXllckVudGVyUm9vbV9GdW5jdGlvbjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnBsYXllckxpc3QucHVzaChkYXRhKTtcclxuICAgICAgICBsZXQgc2VhdEluZGV4ID0gdGhpcy5jaGFuZ2VTZWF0SWRfRnVuY3Rpb24oZGF0YS5zZWF0SWQpO1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwic3BfUGxheWVySGVhZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZChkYXRhLmhlYWRpbWd1cmwsIHNwID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJbmRleCkuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9QbGF5ZXJIZWFkXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBkYXRhLm5pY2tuYW1lO1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTW9uZXlcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKGRhdGEuc2NvcmUgLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+emu+W8gOacrOWxgOeahOeOqeWutlVJXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlYXRJZCBcclxuICAgICAqIEBwYXJhbSB7Kn0gdXNlcklkIFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJMZWF2ZVJvb21fRnVuY3Rpb246IGZ1bmN0aW9uIChzZWF0SWQsIHVzZXJJZCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyTGlzdFtpXS51c2VySWQgPT09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzZWF0SW5kZXggPSB0aGlzLmNoYW5nZVNlYXRJZF9GdW5jdGlvbihzZWF0SWQpO1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fUGxheWVyXCIgKyBzZWF0SW5kZXgpLmdldENoaWxkQnlOYW1lKFwic3BfUGxheWVySGVhZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdEluZGV4KS5nZXRDaGlsZEJ5TmFtZShcImxiX1BsYXllck5hbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwiY29tX1BsYXllclwiICsgc2VhdEluZGV4KS5nZXRDaGlsZEJ5TmFtZShcImxiX1BsYXllck1vbmV5XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImNvbV9QbGF5ZXJcIiArIHNlYXRJbmRleCkuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9YYmV0XCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXlbaSArIDUgKiBzZWF0SW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvaW50QXJyYXlbc2VhdEluZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLnNwX0JhbmtlckZyYW1lLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5fU2V0QmFua2VyQW5pbWF0aW9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOemu+W8gOa4uOaIj++8jOi/lOWbnuWIsOWkp+WOhVxyXG4gICAgICovXHJcbiAgICBleGl0R2FtZV9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUV4aXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubmV0V29yay5ncmFiQnVsbFNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLmdyYWJCdWxsU29ja2V0ID0gbnVsbDtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBzZWF0SWQgXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVNlYXRJZF9GdW5jdGlvbjogZnVuY3Rpb24gKHNlYXRJZCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5ldFdvcmsuc2VhdElkKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICg1IC0gdGhpcy5uZXRXb3JrLnNlYXRJZCArIHNlYXRJZCkgJSA1O1xyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWF0SWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeR5biB5LiN6Laz77yM56a75byA5oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIG5vTW9uZXlPdXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVFeGl0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfQ29uZmlybVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJidF9SZWNvbm5lY3RcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5oKo55qE6YeR5biB5LiN6Laz77yM5bey6KKr6K+356a75oi/6Ze044CCXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pat57q/6YeN6L+eXHJcbiAgICAgKi9cclxuICAgIGRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVFeGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5ncmFiQnVsbFNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmV0V29yay5ncmFiQnVsbFNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X0NvbmZpcm1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X1JlY29ubmVjdFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5oKo5bey5pat57q/77yM6K+36YeN5paw6L+e5o6lXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05pawXHJcbiAgICAgKiBAcGFyYW0geyp9IGR0IFxyXG4gICAgICovXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJhbmRvbUJhbmtlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yYW5kb21CYW5rZXJUaW1lciA8IDEuNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmFuZG9tQmFua2VyQ291bnQgPCAuMDgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmRvbUJhbmtlckNvdW50ICs9IGR0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmRvbUJhbmtlckNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmRvbUJhbmtlcl9GdW5jdGlvbih0aGlzLnJhbmRvbUJhbmtlckFycmF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZG9tQmFua2VyVGltZXIgKz0gZHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmRvbUJhbmtlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kb21CYW5rZXJUaW1lciA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJhbmtlcl9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVSdW4pIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lQ291bnRfRnVuY3Rpb24oZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb2luRmx5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29pbkFuaW1hdGlvbl9GdW5jdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7Il19