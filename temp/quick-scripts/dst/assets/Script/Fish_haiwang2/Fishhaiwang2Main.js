
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Fish_haiwang2/Fishhaiwang2Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b73ftH6HxBvIHzgw0ahirh', 'Fishhaiwang2Main');
// Script/Fish_haiwang2/Fishhaiwang2Main.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

cc.Class({
  "extends": cc.Component,
  properties: {
    bg_anim: cc.Node,
    //海水特效
    effect_frozen: cc.Node,
    //海水特效
    effect_lockFish: cc.Node,
    //锁定效果
    lab_lockFish: cc.Label,
    //锁定文字
    bg_picList: [cc.Node],
    //背景列表
    seat_node: [cc.Node],
    //座位列表
    seat_noPlayer_node: [cc.Node],
    //没座位列表
    touchLayer: cc.Node,
    //点击层
    bulletPb: cc.Prefab,
    //子弹pb
    bulletBg: cc.Node,
    //子弹层
    netBg: cc.Node,
    // 网层
    netPb: cc.Prefab,
    // 网pb
    fishBg: cc.Node,
    //鱼层
    fishPb: [cc.Prefab],
    //
    //heartBeat: 0,
    coinPb: [cc.Prefab],
    diamondPb: cc.Prefab,
    label_pb: cc.Prefab,
    musicToggle: cc.Toggle,
    soundToggle: cc.Toggle
  },
  onLoad: function onLoad() {
    var _this = this;

    //是否允许开炮
    // var t;
    // for (this.fishW = [62.4, 80, 73.2, 74, 62.4, 72, 117.6, 112.8, 100, 120, 225, 180, 180, 235.2, 237.6, 160, 160, 160, 160, 160, 160, 350, 350, 350, 350, 350, 350], this.labelPosition = new Array(this.maxPlayer), t = 0; t < this.labelPosition.length; ++t) this.labelPosition[t] = cc.p(0, 0);
    //         cc.p(0, 0);
    window.fish_ins = this;
    this.FishPool = new cc.NodePool("Fishhaiwang2");
    this.left_stat = 0;
    this.bulletId = 0;
    this.allowBullet = true;
    this.isAutoShot = false;
    this.isLockFish = false;
    this.bulletPower = 1;
    this.targetFish = null;
    this.bigFishType = 15; //屏幕适配

    if (cc.sys.isNative) {
      cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    } //碰撞管理器


    this.collisionMgr = cc.director.getCollisionManager();
    this.collisionMgr.enabled = true; // this.collisionMgr.enabledDebugDraw = true;
    // this.collisionMgr.enabledDrawBoundingBox = true;
    //获取组件

    this.fishNet = require("./Fishhaiwang2NetWork").getInstant;
    this.fishNet.setFishObj_Funtion(this);
    this.pInfo = require("PlayerInfo").getInstant;
    this.pInfo.setGameObj_Function(this);
    this.fishNet.disconnected = false; //获取房间倍率

    this.roomBet = this.fishNet.roomBet; //房间玩家信息

    this.playerList = [null, null, null, null]; //炮对象 在BUlletCtrl中赋值

    this.cannonList = []; //注册点击事件

    this.pos = cc.v2(667, 375);
    this.touchLayer.on("touchstart", function (e) {
      if (_this.isLockFish) return;
      _this.pos = e.getLocation();

      _this.schedule(_this.shoot, 0.2, cc.macro.REPEAT_FOREVER, 0.01);
    });
    this.touchLayer.on("touchmove", function (e) {
      _this.pos = e.getLocation();
    });
    this.touchLayer.on("touchend", function (e) {
      if (_this.isLockFish) {
        var isSwitchTarget = false;

        for (var _iterator = _createForOfIteratorHelperLoose(_this.fishBg.children), _step; !(_step = _iterator()).done;) {
          var child = _step.value;
          var fishType = child.getComponent("Fishhaiwang2").fishType;

          if (child.x < -667 || child.x > 667 || child.y < -375 || child.y > 375 || fishType < _this.bigFishType) {
            continue;
          }

          if (child.getBoundingBoxToWorld().contains(e.getLocation()) && child != _this.targetFish) {
            _this.targetFish = child;
            isSwitchTarget = true;
            console.log("点击锁定鱼", child);
          }
        }

        if (!isSwitchTarget) {
          _this.shoot();
        }
      } else {
        if (_this.isAutoShot) {
          _this.schedule(_this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
        } else {
          _this.unschedule(_this.shoot);
        }
      }
    });
    this.touchLayer.on("touchcancel", function (e) {
      if (_this.isLockFish) return;

      if (_this.isAutoShot) {
        _this.schedule(_this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
      } else {
        _this.unschedule(_this.shoot);
      }
    }); //生成子弹池

    this.bulletPool = new cc.NodePool();

    for (var i = 0; i < 50; i++) {
      var pb = cc.instantiate(this.bulletPb);
      this.bulletPool.put(pb);
    } //生成网池


    this.netPool = new cc.NodePool();

    for (var _i = 0; _i < 20; _i++) {
      var _pb = cc.instantiate(this.netPb);

      this.netPool.put(_pb);
    }

    this.set_left_view(true);

    if (this.roomBet == 1) {
      this.power_list = [1, 2, 3, 4, 5];
    } else if (this.roomBet == 10) {
      this.power_list = [1, 2, 3, 4, 5];
    } else if (this.roomBet == 100) {
      this.power_list = [1, 2, 3, 4, 5];
    } else if (this.roomBet == 1000) {
      this.power_list = [1, 2, 3, 4, 5];
    }

    this.skillMaxTime = [5 * 60, 100000 * 60];
    this.skillTime = [0, 0];
    this.skillCost = [10 * this.roomBet, 20 * this.roomBet];
    this.skillCD = [0, 0];
    this.skillMaxCD = [10 * 60, 100000 * 60];
    cc.find('Canvas/UI/right/右侧导航栏/s1/shuzi').getComponent(cc.Label).string = Helper.fixNum(this.skillCost[0]);
    cc.find('Canvas/UI/right/右侧导航栏/s2/shuzi').getComponent(cc.Label).string = Helper.fixNum(this.skillCost[1]);
  },
  start_: function start_() {
    for (var i in this.fishNet.userList) {
      var usr = this.fishNet.userList[i];
      this.playerList[usr.seatId] = {
        name: usr.nickname,
        score: usr.score,
        diamond: usr.diamond,
        uid: usr.userId,
        head: usr.headimgurl
      };
    }

    playBGM('bg_0');
    this.checkSeatShow();
    this.checkSelf();
    this.musicToggle.isChecked = this.pInfo.musicControl;
    this.soundToggle.isChecked = this.pInfo.soundEffectControl;
  },

  /**
   * 射击
   */
  shoot: function shoot() {
    this.isLockFish; // if (this.isAiming())

    if (this.isLockFish) // if(this.isLockFish)
      {
        var fishNode = this.getBigFish();

        if (!cc.isValid(fishNode)) {
          this.pos = cc.v2(667, 375);
        } else {
          this.pos = fishNode.getPosition();
          this.pos.x += 667;
          this.pos.y += 375;
        }
      } else {
      if (this.fishNet.seatId > 1 && this.pos.y > 700 || this.fishNet.seatId <= 1 && this.pos.y < 50) {
        // console.log('touch outsider!');
        return;
      }
    }

    var playerUid = this.playerList[this.fishNet.seatId].uid;

    if (playerUid == this.pInfo.playerId) {
      playEffect('shot');
      this.fishNet.fishSocket && this.fishNet.fishSocket.emit('fishShoot', JSON.stringify({
        userid: playerUid,
        bet: this.bulletPower,
        position: this.pos,
        bulletId: this.getNextBulletID()
      }));
    }
  },
  shoot_r: function shoot_r(userid, pos, bet, bid) {
    // console.log("SHOOT :"+pos.x+"-"+pos.y);
    // var node = cc.find("Canvas/GameNode/aurabg/aura");
    // console.log("aura :"+node.position.x+"-"+node.position.y);
    var seatId = this.getSeatByUser(userid);
    if (seatId < 0) return;

    if (this.allowBullet) {
      this.cannonList[seatId].bang(pos, bet, bid);
    }
  },
  getSeatByUser: function getSeatByUser(userid) {
    for (var i in this.playerList) {
      if (this.playerList[i] == null) continue;

      if (this.playerList[i].uid == userid) {
        return i;
      }
    }

    return -1;
  },

  /**
   * 其它玩家进入房间
   * @param {用户id} UserId 
   * @param {座位id} seatId 
   * @param {用户名} nickname 
   * @param {用户分数} score 
   */
  setPlayerEnter: function setPlayerEnter(UserId, seatId, nickname, score, head, diamond) {
    if (!this.playerList[seatId]) {
      this.playerList[seatId] = {
        name: nickname,
        score: score,
        diamond: diamond,
        uid: UserId,
        head: head
      };
      playEffect('sit_down');
      this.checkSeatShow();
    } else {
      console.error('位置已占-不能进入座位-请检查');
    }
  },

  /**
   * 其它玩家离开房间操作
   * @param {座位id} seatId 
   */
  setPlayerExit: function setPlayerExit(seatId) {
    this.playerList[seatId] = null;
    this.checkSeatShow();
  },

  /**
   * 控制座位的显隐
   */
  checkSeatShow: function checkSeatShow() {
    for (var i in this.playerList) {
      this.seat_noPlayer_node[i].active = !this.playerList[i];
      this.seat_node[i].active = !this.seat_noPlayer_node[i].active;
    }
  },
  checkSelf: function checkSelf() {
    var pinfo = require('PlayerInfo').getInstant;

    for (var i in this.playerList) {
      if (this.playerList[i] && this.playerList[i].uid == pinfo.playerId) {
        this.seat_node[i].getChildByName('your_position').active = true;
        this.seat_node[i].getChildByName('your_position').runAction(cc.sequence(cc.delayTime(5), cc.hide()));
        break;
      }
    }
  },

  /**
   * 获取子弹池中的子弹
   */
  getBullet: function getBullet() {
    if (this.bulletPool.size() <= 0) {
      var pb = cc.instantiate(this.bulletPb);
      this.bulletPool.put(pb);
    }

    return this.bulletPool.get();
  },

  /**
   * 获取渔网池中的渔网
   */
  getNet: function getNet() {
    if (this.netPool.size() <= 0) {
      var pb = cc.instantiate(this.netPb);
      this.netPool.put(pb);
    }

    return this.netPool.get();
  },
  getNextBulletID: function getNextBulletID() {
    if (this.bulletId >= 1e4) this.bulletId = 0;else this.bulletId++;
    return this.bulletId;
  },
  openAlert: function openAlert() {
    this.node && (this.node.getChildByName('messageboxbg').active = true);
    cc.director.loadScene("LobbyMain");
  },
  //打开菜单栏
  switch_left: function switch_left() {
    if (this.left_stat == 0) {
      this.left_stat = 1;
    } else {
      this.left_stat = 0;
    }

    this.set_left_view();
  },
  set_left_view: function set_left_view(instance) {
    var left = this.node.getChildByName('UI').getChildByName('left');
    var right = this.node.getChildByName('UI').getChildByName('right');
    left.stopAllActions();
    right.stopAllActions();
    var t = 0.2;
    if (instance) t = 0;

    if (this.left_stat == 1) {
      cc.find('Canvas/UI/left/左侧导航栏').active = true;
      cc.tween(left).to(t, {
        position: cc.v2(-667, 0)
      }).start();
      cc.find('Canvas/UI/right/右侧导航栏').active = true;
      cc.tween(right).to(t, {
        position: cc.v2(640, 0)
      }).start();
    } else {
      cc.tween(left).to(t, {
        position: cc.v2(-790, 0)
      }).call(function () {
        cc.find('Canvas/UI/left/左侧导航栏').active = false;
      }).start();
      cc.tween(right).to(t, {
        position: cc.v2(760, 0)
      }).call(function () {
        cc.find('Canvas/UI/right/右侧导航栏').active = false;
      }).start();
    }
  },
  createFish: function createFish(info) {
    var _this2 = this;

    //{"fishId":[2324,2325,2326],
    //"fishType":11,"fishPath":7,"fishCount":3,
    //"fishLineup":1,"lineup":false,"propCount":0}
    var type = info.fishType;
    var paths = this.node.getComponent("Fishhaiwang2Path");
    var pathArr = paths.path_list[info.fishPath];
    var offsetX = 0;
    var offsetY = 0;
    var listX = 1;
    var listY = 1; //console.log("出鱼: 鱼类型-", type, " 鱼的排列-", info.fishLineup, " 鱼的数量-", info.fishCount);

    switch (info.fishLineup) {
      case 0:
        break;

      case 1:
        //并排
        listX = 1;
        listY = info.fishCount;
        break;

      case 2:
        //正方形 4只
        listX = 2;
        listY = 2;
        break;

      case 3:
        //5星 5只
        listX = 1;
        listY = info.fishCount;
        break;

      case 4:
        //长方形 6只
        listX = 2;
        listY = 3;
        break;
    }

    if (info.fishLineup == 0) {
      var _loop = function _loop(i) {
        setTimeout(function () {
          if (_this2.fishPb) {
            var fish = cc.instantiate(_this2.fishPb[type]);
            fish.parent = _this2.fishBg;
            fish.zIndex = info.fishType;
            fish.getComponent("Fishhaiwang2").pathArr = pathArr;
            fish.getComponent("Fishhaiwang2").pathIndex = 0;
            fish.getComponent("Fishhaiwang2").fishInfo = info;
            fish.getComponent("Fishhaiwang2").fishId = info.fishId[i];
            fish.getComponent("Fishhaiwang2").fishType = type;
            fish.getComponent("Fishhaiwang2").offset = cc.v2(offsetX, offsetY);
            fish.position = cc.v2(pathArr[0][0], pathArr[0][1]);
            fish.getComponent('Fishhaiwang2').executeMove();
          }
        }, i * 800);
      };

      for (var i = 0; i < info.fishCount; i++) {
        _loop(i);
      }
    } else {
      for (var _i2 = 0; _i2 < info.fishCount; _i2++) {
        var fish = cc.instantiate(this.fishPb[type]);
        offsetX = (Math.floor(_i2 / listY) - (listX - 1) / 2) * fish.width;
        offsetY = (_i2 % listY - (listY - 1) / 2) * fish.height;
        fish.parent = this.fishBg;
        fish.zIndex = info.fishType;
        fish.getComponent("Fishhaiwang2").pathArr = pathArr;
        fish.getComponent("Fishhaiwang2").pathIndex = 0;
        fish.getComponent("Fishhaiwang2").fishInfo = info;
        fish.getComponent("Fishhaiwang2").fishId = info.fishId[_i2];
        fish.getComponent("Fishhaiwang2").fishType = type;
        fish.getComponent("Fishhaiwang2").offset = cc.v2(offsetX, offsetY);
        fish.position = cc.v2(pathArr[0][0] + offsetX, pathArr[0][1] + offsetY);
        fish.getComponent('Fishhaiwang2').executeMove();
      }
    }
  },
  getFishById: function getFishById(fid) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.fishBg.children), _step2; !(_step2 = _iterator2()).done;) {
      var fishNode = _step2.value;
      var fish = fishNode.getComponent("Fishhaiwang2");

      if (fish.fishId == fid) {
        if (fishNode.x >= -667 && fishNode.x <= 667 && fishNode.y >= -375 && fishNode.y <= 375) {
          return fishNode;
        }
      }
    }

    return null;
  },
  checkFishId: function checkFishId(fid) {
    return cc.isValid(this.getFishById(fid));
  },
  onFishHit: function onFishHit(info) {
    // fishId
    // hitScore
    // propCount
    // propId
    // userId
    var target = null;
    var fishes = this.fishBg.children;

    for (var i in fishes) {
      var fishNode = fishes[i];
      var fish = fishNode.getComponent("Fishhaiwang2");

      if (fish.fishId == info.fishId) {
        target = fishNode;
        break;
      }
    }

    if (target == null) return; //如果选中的鱼被打死，就清空选中容器

    if (target == this.targetFish) {
      this.targetFish = null;
    }

    var targetSeat = this.getSeatByUser(info.userId);

    if (target.getComponent("Fishhaiwang2").fishType == 24 || target.getComponent("Fishhaiwang2").fishType == 25) {
      // fishId,fishIdList,sendId
      var _fish = null;
      var fishidlist = [];

      for (var _iterator3 = _createForOfIteratorHelperLoose(this.fishBg.children), _step3; !(_step3 = _iterator3()).done;) {
        var chlid = _step3.value;
        _fish = chlid.getComponent("Fishhaiwang2");
        fishidlist.push(_fish.fishId);
      }

      console.log("击中鱼列表：", fishidlist);
      this.fishNet.fishSocket.emit('boomFishHit', JSON.stringify({
        fishId: info.fishId,
        fishIdList: fishidlist
      }));
    }

    var isSelf = false;

    if (this.pInfo.playerId == info.userId) {
      isSelf = true;
    }

    this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, target.position, target.getComponent("Fishhaiwang2").fishInfo, isSelf, true);
    target.parent = null;
    target.destroy();
  },
  onBoomFishHit: function onBoomFishHit(info) {
    // info:{userId:_userId,hitSocre:score,fishList:outfishList}}
    console.log("击中炸弹事件：", info);
    var fishNode = null;
    var isSelf = false;
    var targetSeat = this.getSeatByUser(info.userId);

    if (this.pInfo.playerId == info.userId) {
      isSelf = true;
    }

    for (var key in info.fishList) {
      var fishId = info.fishList[key];
      fishNode = this.getFishById(fishId);

      if (cc.isValid(fishNode)) {
        if (key == 0) {
          this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, fishNode.position, fishNode.getComponent("Fishhaiwang2").fishType, isSelf, true);
        } else {
          this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, fishNode.position, fishNode.getComponent("Fishhaiwang2").fishType, isSelf, false);
        }

        fishNode.parent = null;
        fishNode.destroy();
      }
    }
  },
  addCoinAnime: function addCoinAnime(targetSeat, score, position, fishType, isSelf, isAddScore) {
    this.cannonList[targetSeat].check_pan(fishType, score); //console.log("score++ "+score);

    var coinbg = cc.find('Canvas/GameNode/coinbg');
    var coinpb = null;
    var coinnum = 0;

    if (score >= 100) {
      coinpb = this.coinPb[0];
      coinnum = parseInt(score / 100);
    } else if (score >= 10) {
      coinpb = this.coinPb[1];
      coinnum = parseInt(score / 10);
    } else {
      coinpb = this.coinPb[2];
      coinnum = Math.ceil(score);
    }

    if (coinnum > 6) coinnum = 6;

    for (var i = 0; i < coinnum; i++) {
      var coin = cc.instantiate(coinpb);
      coin.parent = coinbg;
      coin.position = position;
      coin.runAction(cc.sequence(cc.delayTime(0.3 * (i + 1)), cc.moveBy(0.4, 0, 65), cc.moveTo(0.5, this.cannonList[targetSeat].node.position), cc.removeSelf()));
    }

    if (isSelf) {
      var s = parseInt(Math.random() * 19);
      playEffect('die_' + s);
      playEffect('collect_2');
      var label = cc.instantiate(this.label_pb);
      label.opacity = 0;
      label.position = position;
      label.getComponent(cc.Label).string = "+" + Helper.fixNum(score);
      label.parent = coinbg;
      label.zIndex = 200;
      var t1 = 0.4;
      var s1 = 80;
      var t2 = 0.6;
      label.runAction(cc.sequence(cc.spawn(cc.fadeIn(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))), cc.moveBy(t2, cc.v2(0, t2 * s1)), cc.spawn(cc.fadeOut(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))), cc.removeSelf()));
    } //分数增加


    if (isAddScore) {
      this.node.runAction(cc.sequence(cc.delayTime(0.3 * (coinnum + 1)), cc.callFunc(function () {
        this.cannonList[targetSeat].addscore(score);
      }, this)));
    }
  },
  bullet_change: function bullet_change(num) {
    var index = this.power_list.indexOf(this.bulletPower);
    index += num;
    if (index < 0 || index >= this.power_list.length) return;
    this.bulletPower = this.power_list[index];
    this.fishNet.fishSocket.emit('changePower', JSON.stringify({
      userid: this.pInfo.playerId,
      bet: this.bulletPower
    }));
  },
  changePower: function changePower(info) {
    for (var i in this.playerList) {
      if (this.playerList && this.playerList[i].uid == info.userid) {
        this.cannonList[i].betLbl.string = Helper.fixNum(info.bet * this.roomBet);
        break;
      }
    }
  },
  cast_skill: function cast_skill(sid) {
    if (sid == 1) {
      if (this.skillCD[0] > 0 || this.pInfo.playerCoin < this.skillCost[0]) {
        return;
      }

      var info = {
        uid: this.pInfo.playerId,
        sid: sid
      }; //this.cast_skill_r(info);            

      this.fishNet.fishSocket.emit('useSKill', JSON.stringify(info));
    } // 锁定开关


    if (sid == 2) {
      this.isLockFish = !this.isLockFish;

      if (this.isLockFish) {
        this.getBigFishId();
        this.effect_lockFish.active = true;
        this.lab_lockFish.string = "解除锁定";
      } else {
        this.effect_lockFish.active = false;
        this.lab_lockFish.string = "锁定";
      }
    }
  },
  cast_skill_r: function cast_skill_r(info) {
    var seatId = this.getSeatByUser(info.uid);
    if (seatId < 0) return;

    if (info.sid == 1) {
      this.skillTime[0] = this.skillMaxTime[0];
      this.skillCD[0] = this.skillMaxCD[0];
      this.effect_frozen.active = true;

      for (var i in this.fishBg.children) {
        var fish = this.fishBg.children[i];
        fish.pauseAllActions();
      }
    } // if (info.uid == this.pInfo.playerId)
    // {
    //     else if (info.sid == 2)
    //     {
    //         this.skillCD[1]  = this.skillMaxCD[1];
    //         this.skillTime[1] = this.skillMaxTime[1];
    //         this.schedule(this.shoot, 0.2, cc.macro.REPEAT_FOREVER, 0.01);
    //     }
    // }
    // if (info.sid == 2){
    //     this.cannonList[seatId].autoTime = this.skillMaxTime[1];
    // }

  },
  // isAiming(){
  //     return this.skillTime[1]>0;
  // },
  update: function update(dt) {
    for (var i in this.skillTime) {
      if (this.skillTime[i] > 0) {
        this.skillTime[i]--;
      }

      if (this.skillCD[i] > 0) {
        this.skillCD[i]--;
      }

      var node;

      if (i == 0) {
        node = cc.find('Canvas/UI/right/右侧导航栏/s1/cd');
      } else if (i == 1) {
        node = cc.find('Canvas/UI/right/右侧导航栏/s2/cd');
      }

      node.getComponent(cc.ProgressBar).progress = this.skillCD[i] / this.skillMaxCD[i];
    }

    if (this.skillTime[0] == 1) {
      for (var i in this.fishBg.children) {
        var fish = this.fishBg.children[i];
        fish.resumeAllActions();
      }

      this.effect_frozen.active = false;
    } // if (this.skillTime[1] == 1)
    // {
    //     if (this.isAutoShot) {
    //         this.schedule(this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
    //     }else{
    //         this.unschedule(this.shoot);
    //     }
    // }
    // var aura = false;
    // for (var i in this.cannonList)
    // {
    //     if (this.cannonList[i].autoTime && this.cannonList[i].autoTime>0){
    //         aura = true;
    //     }
    // }


    var node = cc.find("Canvas/GameNode/aurabg/aura");

    if (this.isLockFish) {
      var fish = this.getBigFish();

      if (cc.isValid(fish)) {
        node.active = true;
        node.position = fish.position;
        node.scale = fish.height * 0.75 / 249;
      } else {
        node.active = false;
      }
    } else {
      node.active = false;
    }
  },
  getBigFishId: function getBigFishId() {
    var fishNode = this.getBigFish();
    if (!cc.isValid(fishNode)) return -1;
    return fishNode.getComponent("Fishhaiwang2").fishId;
  },
  getBigFish: function getBigFish() {
    if (cc.isValid(this.targetFish)) {
      return this.targetFish;
    }

    var bigfishNode = null;

    for (var i in this.fishBg.children) {
      var fishNode = this.fishBg.children[i];
      var fish = fishNode.getComponent("Fishhaiwang2");

      if (fishNode.x < -667 || fishNode.x > 667 || fishNode.y < -375 || fishNode.y > 375 || fish.fishType < this.bigFishType) {
        continue;
      }

      if (bigfishNode == null || fish.fishType > bigfishNode.getComponent("Fishhaiwang2").fishType) {
        bigfishNode = fishNode;
      }
    }

    return bigfishNode;
  },
  setAutoShot: function setAutoShot(isAuto) {
    this.isAutoShot = isAuto; //if (this.skillTime[1]>0) return;

    if (isAuto) {
      this.schedule(this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
    } else {
      this.unschedule(this.shoot);
    }
  },
  setMusic: function setMusic() {
    if (this.pInfo.musicControl) {
      this.pInfo.musicControl = 0;
      this.musicToggle.isChecked = false;
      cc.audioEngine.stopAll();
    } else {
      this.pInfo.musicControl = 1;
      this.musicToggle.isChecked = true;
      playBGM('bg_0');
    }

    this.writeUserSettingDate_Function();
  },
  setSound: function setSound() {
    if (this.pInfo.soundEffectControl) {
      this.pInfo.soundEffectControl = 0;
      this.soundToggle.isChecked = false;
    } else {
      this.pInfo.soundEffectControl = 1;
      this.soundToggle.isChecked = true;
    }

    this.writeUserSettingDate_Function();
  },

  /**
   * 将设置数据写入缓存数据
   */
  writeUserSettingDate_Function: function writeUserSettingDate_Function() {
    var data = {
      musicControl: this.pInfo.musicControl,
      soundEffectControl: this.pInfo.soundEffectControl
    };
    this.pInfo.writeData_Function("userSetting", data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXNoX2hhaXdhbmcyXFxGaXNoaGFpd2FuZzJNYWluLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmdfYW5pbSIsIk5vZGUiLCJlZmZlY3RfZnJvemVuIiwiZWZmZWN0X2xvY2tGaXNoIiwibGFiX2xvY2tGaXNoIiwiTGFiZWwiLCJiZ19waWNMaXN0Iiwic2VhdF9ub2RlIiwic2VhdF9ub1BsYXllcl9ub2RlIiwidG91Y2hMYXllciIsImJ1bGxldFBiIiwiUHJlZmFiIiwiYnVsbGV0QmciLCJuZXRCZyIsIm5ldFBiIiwiZmlzaEJnIiwiZmlzaFBiIiwiY29pblBiIiwiZGlhbW9uZFBiIiwibGFiZWxfcGIiLCJtdXNpY1RvZ2dsZSIsIlRvZ2dsZSIsInNvdW5kVG9nZ2xlIiwib25Mb2FkIiwid2luZG93IiwiZmlzaF9pbnMiLCJGaXNoUG9vbCIsIk5vZGVQb29sIiwibGVmdF9zdGF0IiwiYnVsbGV0SWQiLCJhbGxvd0J1bGxldCIsImlzQXV0b1Nob3QiLCJpc0xvY2tGaXNoIiwiYnVsbGV0UG93ZXIiLCJ0YXJnZXRGaXNoIiwiYmlnRmlzaFR5cGUiLCJzeXMiLCJpc05hdGl2ZSIsInZpZXciLCJzZXRPcmllbnRhdGlvbiIsIm1hY3JvIiwiT1JJRU5UQVRJT05fTEFORFNDQVBFIiwiY29sbGlzaW9uTWdyIiwiZGlyZWN0b3IiLCJnZXRDb2xsaXNpb25NYW5hZ2VyIiwiZW5hYmxlZCIsImZpc2hOZXQiLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInNldEZpc2hPYmpfRnVudGlvbiIsInBJbmZvIiwic2V0R2FtZU9ial9GdW5jdGlvbiIsImRpc2Nvbm5lY3RlZCIsInJvb21CZXQiLCJwbGF5ZXJMaXN0IiwiY2Fubm9uTGlzdCIsInBvcyIsInYyIiwib24iLCJlIiwiZ2V0TG9jYXRpb24iLCJzY2hlZHVsZSIsInNob290IiwiUkVQRUFUX0ZPUkVWRVIiLCJpc1N3aXRjaFRhcmdldCIsImNoaWxkcmVuIiwiY2hpbGQiLCJmaXNoVHlwZSIsImdldENvbXBvbmVudCIsIngiLCJ5IiwiZ2V0Qm91bmRpbmdCb3hUb1dvcmxkIiwiY29udGFpbnMiLCJjb25zb2xlIiwibG9nIiwidW5zY2hlZHVsZSIsImJ1bGxldFBvb2wiLCJpIiwicGIiLCJpbnN0YW50aWF0ZSIsInB1dCIsIm5ldFBvb2wiLCJzZXRfbGVmdF92aWV3IiwicG93ZXJfbGlzdCIsInNraWxsTWF4VGltZSIsInNraWxsVGltZSIsInNraWxsQ29zdCIsInNraWxsQ0QiLCJza2lsbE1heENEIiwiZmluZCIsInN0cmluZyIsIkhlbHBlciIsImZpeE51bSIsInN0YXJ0XyIsInVzZXJMaXN0IiwidXNyIiwic2VhdElkIiwibmFtZSIsIm5pY2tuYW1lIiwic2NvcmUiLCJkaWFtb25kIiwidWlkIiwidXNlcklkIiwiaGVhZCIsImhlYWRpbWd1cmwiLCJwbGF5QkdNIiwiY2hlY2tTZWF0U2hvdyIsImNoZWNrU2VsZiIsImlzQ2hlY2tlZCIsIm11c2ljQ29udHJvbCIsInNvdW5kRWZmZWN0Q29udHJvbCIsImZpc2hOb2RlIiwiZ2V0QmlnRmlzaCIsImlzVmFsaWQiLCJnZXRQb3NpdGlvbiIsInBsYXllclVpZCIsInBsYXllcklkIiwicGxheUVmZmVjdCIsImZpc2hTb2NrZXQiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsImJldCIsInBvc2l0aW9uIiwiZ2V0TmV4dEJ1bGxldElEIiwic2hvb3RfciIsImJpZCIsImdldFNlYXRCeVVzZXIiLCJiYW5nIiwic2V0UGxheWVyRW50ZXIiLCJVc2VySWQiLCJlcnJvciIsInNldFBsYXllckV4aXQiLCJhY3RpdmUiLCJwaW5mbyIsImdldENoaWxkQnlOYW1lIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJoaWRlIiwiZ2V0QnVsbGV0Iiwic2l6ZSIsImdldCIsImdldE5ldCIsIm9wZW5BbGVydCIsIm5vZGUiLCJsb2FkU2NlbmUiLCJzd2l0Y2hfbGVmdCIsImluc3RhbmNlIiwibGVmdCIsInJpZ2h0Iiwic3RvcEFsbEFjdGlvbnMiLCJ0IiwidHdlZW4iLCJ0byIsInN0YXJ0IiwiY2FsbCIsImNyZWF0ZUZpc2giLCJpbmZvIiwidHlwZSIsInBhdGhzIiwicGF0aEFyciIsInBhdGhfbGlzdCIsImZpc2hQYXRoIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJsaXN0WCIsImxpc3RZIiwiZmlzaExpbmV1cCIsImZpc2hDb3VudCIsInNldFRpbWVvdXQiLCJmaXNoIiwicGFyZW50IiwiekluZGV4IiwicGF0aEluZGV4IiwiZmlzaEluZm8iLCJmaXNoSWQiLCJvZmZzZXQiLCJleGVjdXRlTW92ZSIsIk1hdGgiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0RmlzaEJ5SWQiLCJmaWQiLCJjaGVja0Zpc2hJZCIsIm9uRmlzaEhpdCIsInRhcmdldCIsImZpc2hlcyIsInRhcmdldFNlYXQiLCJmaXNoaWRsaXN0IiwiY2hsaWQiLCJwdXNoIiwiZmlzaElkTGlzdCIsImlzU2VsZiIsImFkZENvaW5BbmltZSIsImhpdFNvY3JlIiwiZGVzdHJveSIsIm9uQm9vbUZpc2hIaXQiLCJrZXkiLCJmaXNoTGlzdCIsImlzQWRkU2NvcmUiLCJjaGVja19wYW4iLCJjb2luYmciLCJjb2lucGIiLCJjb2lubnVtIiwicGFyc2VJbnQiLCJjZWlsIiwiY29pbiIsIm1vdmVCeSIsIm1vdmVUbyIsInJlbW92ZVNlbGYiLCJzIiwicmFuZG9tIiwibGFiZWwiLCJvcGFjaXR5IiwidDEiLCJzMSIsInQyIiwic3Bhd24iLCJmYWRlSW4iLCJmYWRlT3V0IiwiY2FsbEZ1bmMiLCJhZGRzY29yZSIsImJ1bGxldF9jaGFuZ2UiLCJudW0iLCJpbmRleCIsImluZGV4T2YiLCJsZW5ndGgiLCJjaGFuZ2VQb3dlciIsImJldExibCIsImNhc3Rfc2tpbGwiLCJzaWQiLCJwbGF5ZXJDb2luIiwiZ2V0QmlnRmlzaElkIiwiY2FzdF9za2lsbF9yIiwicGF1c2VBbGxBY3Rpb25zIiwidXBkYXRlIiwiZHQiLCJQcm9ncmVzc0JhciIsInByb2dyZXNzIiwicmVzdW1lQWxsQWN0aW9ucyIsInNjYWxlIiwiYmlnZmlzaE5vZGUiLCJzZXRBdXRvU2hvdCIsImlzQXV0byIsInNldE11c2ljIiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwid3JpdGVVc2VyU2V0dGluZ0RhdGVfRnVuY3Rpb24iLCJzZXRTb3VuZCIsImRhdGEiLCJ3cml0ZURhdGFfRnVuY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVKLEVBQUUsQ0FBQ0ssSUFESjtBQUNVO0FBQ2xCQyxJQUFBQSxhQUFhLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGVjtBQUVnQjtBQUN4QkUsSUFBQUEsZUFBZSxFQUFFUCxFQUFFLENBQUNLLElBSFo7QUFHb0I7QUFDNUJHLElBQUFBLFlBQVksRUFBRVIsRUFBRSxDQUFDUyxLQUpUO0FBSWU7QUFDdkJDLElBQUFBLFVBQVUsRUFBRSxDQUFDVixFQUFFLENBQUNLLElBQUosQ0FMSjtBQUtlO0FBQ3ZCTSxJQUFBQSxTQUFTLEVBQUUsQ0FBQ1gsRUFBRSxDQUFDSyxJQUFKLENBTkg7QUFNYztBQUN0Qk8sSUFBQUEsa0JBQWtCLEVBQUUsQ0FBQ1osRUFBRSxDQUFDSyxJQUFKLENBUFo7QUFPdUI7QUFDL0JRLElBQUFBLFVBQVUsRUFBRWIsRUFBRSxDQUFDSyxJQVJQO0FBUWE7QUFDckJTLElBQUFBLFFBQVEsRUFBRWQsRUFBRSxDQUFDZSxNQVRMO0FBU2E7QUFDckJDLElBQUFBLFFBQVEsRUFBRWhCLEVBQUUsQ0FBQ0ssSUFWTDtBQVVXO0FBQ25CWSxJQUFBQSxLQUFLLEVBQUVqQixFQUFFLENBQUNLLElBWEY7QUFXUTtBQUNoQmEsSUFBQUEsS0FBSyxFQUFFbEIsRUFBRSxDQUFDZSxNQVpGO0FBWVU7QUFDbEJJLElBQUFBLE1BQU0sRUFBRW5C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R0F2d0JJO0FBeXdCTEMsRUFBQUEsUUF6d0JLLHNCQXl3Qk07QUFDUCxRQUFJLEtBQUt6TSxLQUFMLENBQVc0RCxrQkFBZixFQUFtQztBQUMvQixXQUFLNUQsS0FBTCxDQUFXNEQsa0JBQVgsR0FBZ0MsQ0FBaEM7QUFDQSxXQUFLeEYsV0FBTCxDQUFpQnNGLFNBQWpCLEdBQTZCLEtBQTdCO0FBQ0gsS0FIRCxNQUdPO0FBQ0gsV0FBSzFELEtBQUwsQ0FBVzRELGtCQUFYLEdBQWdDLENBQWhDO0FBQ0EsV0FBS3hGLFdBQUwsQ0FBaUJzRixTQUFqQixHQUE2QixJQUE3QjtBQUNIOztBQUNELFNBQUs4SSw2QkFBTDtBQUNILEdBbHhCSTs7QUFteEJMO0FBQ0o7QUFDQTtBQUNJQSxFQUFBQSw2QkFBNkIsRUFBRSx5Q0FBWTtBQUN2QyxRQUFJRSxJQUFJLEdBQUc7QUFDUC9JLE1BQUFBLFlBQVksRUFBRSxLQUFLM0QsS0FBTCxDQUFXMkQsWUFEbEI7QUFFUEMsTUFBQUEsa0JBQWtCLEVBQUUsS0FBSzVELEtBQUwsQ0FBVzREO0FBRnhCLEtBQVg7QUFJQSxTQUFLNUQsS0FBTCxDQUFXMk0sa0JBQVgsQ0FBOEIsYUFBOUIsRUFBNkNELElBQTdDO0FBQ0g7QUE1eEJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmdfYW5pbTogY2MuTm9kZSwgLy/mtbfmsLTnibnmlYhcclxuICAgICAgICBlZmZlY3RfZnJvemVuOiBjYy5Ob2RlLCAvL+a1t+awtOeJueaViFxyXG4gICAgICAgIGVmZmVjdF9sb2NrRmlzaDogY2MuTm9kZSwgICAvL+mUgeWumuaViOaenFxyXG4gICAgICAgIGxhYl9sb2NrRmlzaDogY2MuTGFiZWwsLy/plIHlrprmloflrZdcclxuICAgICAgICBiZ19waWNMaXN0OiBbY2MuTm9kZV0sIC8v6IOM5pmv5YiX6KGoXHJcbiAgICAgICAgc2VhdF9ub2RlOiBbY2MuTm9kZV0sIC8v5bqn5L2N5YiX6KGoXHJcbiAgICAgICAgc2VhdF9ub1BsYXllcl9ub2RlOiBbY2MuTm9kZV0sIC8v5rKh5bqn5L2N5YiX6KGoXHJcbiAgICAgICAgdG91Y2hMYXllcjogY2MuTm9kZSwgLy/ngrnlh7vlsYJcclxuICAgICAgICBidWxsZXRQYjogY2MuUHJlZmFiLCAvL+WtkOW8uXBiXHJcbiAgICAgICAgYnVsbGV0Qmc6IGNjLk5vZGUsIC8v5a2Q5by55bGCXHJcbiAgICAgICAgbmV0Qmc6IGNjLk5vZGUsIC8vIOe9keWxglxyXG4gICAgICAgIG5ldFBiOiBjYy5QcmVmYWIsIC8vIOe9kXBiXHJcbiAgICAgICAgZmlzaEJnOiBjYy5Ob2RlLCAvL+mxvOWxglxyXG4gICAgICAgIGZpc2hQYjogW2NjLlByZWZhYl0sXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvL2hlYXJ0QmVhdDogMCxcclxuICAgICAgICBjb2luUGI6IFtjYy5QcmVmYWJdLFxyXG4gICAgICAgIGRpYW1vbmRQYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGxhYmVsX3BiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbXVzaWNUb2dnbGU6IGNjLlRvZ2dsZSxcclxuICAgICAgICBzb3VuZFRvZ2dsZTogY2MuVG9nZ2xlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy/mmK/lkKblhYHorrjlvIDngq5cclxuICAgICAgICAvLyB2YXIgdDtcclxuICAgICAgICAvLyBmb3IgKHRoaXMuZmlzaFcgPSBbNjIuNCwgODAsIDczLjIsIDc0LCA2Mi40LCA3MiwgMTE3LjYsIDExMi44LCAxMDAsIDEyMCwgMjI1LCAxODAsIDE4MCwgMjM1LjIsIDIzNy42LCAxNjAsIDE2MCwgMTYwLCAxNjAsIDE2MCwgMTYwLCAzNTAsIDM1MCwgMzUwLCAzNTAsIDM1MCwgMzUwXSwgdGhpcy5sYWJlbFBvc2l0aW9uID0gbmV3IEFycmF5KHRoaXMubWF4UGxheWVyKSwgdCA9IDA7IHQgPCB0aGlzLmxhYmVsUG9zaXRpb24ubGVuZ3RoOyArK3QpIHRoaXMubGFiZWxQb3NpdGlvblt0XSA9IGNjLnAoMCwgMCk7XHJcbiAgICAgICAgLy8gICAgICAgICBjYy5wKDAsIDApO1xyXG5cclxuICAgICAgICB3aW5kb3cuZmlzaF9pbnMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuRmlzaFBvb2wgPSBuZXcgY2MuTm9kZVBvb2woXCJGaXNoaGFpd2FuZzJcIik7XHJcbiAgICAgICAgdGhpcy5sZWZ0X3N0YXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0SWQgPSAwO1xyXG4gICAgICAgIHRoaXMuYWxsb3dCdWxsZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNBdXRvU2hvdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNMb2NrRmlzaCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGxldFBvd2VyID0gMTtcclxuICAgICAgICB0aGlzLnRhcmdldEZpc2ggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmlnRmlzaFR5cGUgPSAxNTtcclxuXHJcbiAgICAgICAgLy/lsY/luZXpgILphY1cclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v56Kw5pKe566h55CG5ZmoXHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25NZ3IgPSBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25NZ3IuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5jb2xsaXNpb25NZ3IuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5jb2xsaXNpb25NZ3IuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8v6I635Y+W57uE5Lu2XHJcbiAgICAgICAgdGhpcy5maXNoTmV0ID0gcmVxdWlyZShcIi4vRmlzaGhhaXdhbmcyTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuZmlzaE5ldC5zZXRGaXNoT2JqX0Z1bnRpb24odGhpcyk7XHJcbiAgICAgICAgdGhpcy5wSW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5wSW5mby5zZXRHYW1lT2JqX0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZmlzaE5ldC5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAvL+iOt+WPluaIv+mXtOWAjeeOh1xyXG4gICAgICAgIHRoaXMucm9vbUJldCA9IHRoaXMuZmlzaE5ldC5yb29tQmV0O1xyXG4gICAgICAgIC8v5oi/6Ze0546p5a625L+h5oGvXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJMaXN0ID0gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG5cclxuICAgICAgICAvL+eCruWvueixoSDlnKhCVWxsZXRDdHJs5Lit6LWL5YC8XHJcbiAgICAgICAgdGhpcy5jYW5ub25MaXN0ID0gW107XHJcblxyXG4gICAgICAgIC8v5rOo5YaM54K55Ye75LqL5Lu2XHJcbiAgICAgICAgdGhpcy5wb3MgPSBjYy52Mig2NjcsIDM3NSk7XHJcbiAgICAgICAgdGhpcy50b3VjaExheWVyLm9uKFwidG91Y2hzdGFydFwiLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NrRmlzaCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnBvcyA9IGUuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob290LCAwLjIsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLCAwLjAxKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnRvdWNoTGF5ZXIub24oXCJ0b3VjaG1vdmVcIiwgZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zID0gZS5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMudG91Y2hMYXllci5vbihcInRvdWNoZW5kXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvY2tGaXNoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNTd2l0Y2hUYXJnZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5maXNoQmcuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlzaFR5cGUgPSBjaGlsZC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikuZmlzaFR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLnggPCAtNjY3IHx8IGNoaWxkLnggPiA2NjcgfHwgY2hpbGQueSA8IC0zNzUgfHwgY2hpbGQueSA+IDM3NSB8fCBmaXNoVHlwZSA8IHRoaXMuYmlnRmlzaFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC5nZXRCb3VuZGluZ0JveFRvV29ybGQoKS5jb250YWlucyhlLmdldExvY2F0aW9uKCkpICYmIGNoaWxkICE9IHRoaXMudGFyZ2V0RmlzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEZpc2ggPSBjaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTd2l0Y2hUYXJnZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueCueWHu+mUgeWumumxvFwiLCBjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1N3aXRjaFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0b1Nob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvb3QsIDAuMywgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zaG9vdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnRvdWNoTGF5ZXIub24oXCJ0b3VjaGNhbmNlbFwiLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NrRmlzaCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0F1dG9TaG90KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvb3QsIDAuMywgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsIDAuMDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuc2hvb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/nlJ/miJDlrZDlvLnmsaBcclxuICAgICAgICB0aGlzLmJ1bGxldFBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUwOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBiID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQYik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0UG9vbC5wdXQocGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlJ/miJDnvZHmsaBcclxuICAgICAgICB0aGlzLm5ldFBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBiID0gY2MuaW5zdGFudGlhdGUodGhpcy5uZXRQYik7XHJcbiAgICAgICAgICAgIHRoaXMubmV0UG9vbC5wdXQocGIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldF9sZWZ0X3ZpZXcodHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvb21CZXQgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VyX2xpc3QgPSBbMSwgMiwgMywgNCwgNV07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb21CZXQgPT0gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5wb3dlcl9saXN0ID0gWzEsIDIsIDMsIDQsIDVdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yb29tQmV0ID09IDEwMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VyX2xpc3QgPSBbMSwgMiwgMywgNCwgNV07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb21CZXQgPT0gMTAwMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VyX2xpc3QgPSBbMSwgMiwgMywgNCwgNV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2tpbGxNYXhUaW1lID0gWzUgKiA2MCwgMTAwMDAwICogNjBdO1xyXG4gICAgICAgIHRoaXMuc2tpbGxUaW1lID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMuc2tpbGxDb3N0ID0gWzEwICogdGhpcy5yb29tQmV0LCAyMCAqIHRoaXMucm9vbUJldF07XHJcbiAgICAgICAgdGhpcy5za2lsbENEID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMuc2tpbGxNYXhDRCA9IFsxMCAqIDYwLCAxMDAwMDAgKiA2MF07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL3JpZ2h0L+WPs+S+p+WvvOiIquagjy9zMS9zaHV6aScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bSh0aGlzLnNraWxsQ29zdFswXSk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL3JpZ2h0L+WPs+S+p+WvvOiIquagjy9zMi9zaHV6aScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bSh0aGlzLnNraWxsQ29zdFsxXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0XygpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZmlzaE5ldC51c2VyTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgdXNyID0gdGhpcy5maXNoTmV0LnVzZXJMaXN0W2ldO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckxpc3RbdXNyLnNlYXRJZF0gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiB1c3Iubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICBzY29yZTogdXNyLnNjb3JlLFxyXG4gICAgICAgICAgICAgICAgZGlhbW9uZDogdXNyLmRpYW1vbmQsXHJcbiAgICAgICAgICAgICAgICB1aWQ6IHVzci51c2VySWQsXHJcbiAgICAgICAgICAgICAgICBoZWFkOiB1c3IuaGVhZGltZ3VybCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwbGF5QkdNKCdiZ18wJyk7XHJcbiAgICAgICAgdGhpcy5jaGVja1NlYXRTaG93KCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1NlbGYoKTtcclxuICAgICAgICB0aGlzLm11c2ljVG9nZ2xlLmlzQ2hlY2tlZCA9IHRoaXMucEluZm8ubXVzaWNDb250cm9sO1xyXG4gICAgICAgIHRoaXMuc291bmRUb2dnbGUuaXNDaGVja2VkID0gdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2w7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCE5Ye7XHJcbiAgICAgKi9cclxuICAgIHNob290KCkge1xyXG4gICAgICAgIHRoaXMuaXNMb2NrRmlzaFxyXG4gICAgICAgIC8vIGlmICh0aGlzLmlzQWltaW5nKCkpXHJcbiAgICAgICAgaWYgKHRoaXMuaXNMb2NrRmlzaClcclxuICAgICAgICAvLyBpZih0aGlzLmlzTG9ja0Zpc2gpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmlzaE5vZGUgPSB0aGlzLmdldEJpZ0Zpc2goKTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGZpc2hOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBjYy52Mig2NjcsIDM3NSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBmaXNoTm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCArPSA2Njc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy55ICs9IDM3NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpc2hOZXQuc2VhdElkID4gMSAmJiB0aGlzLnBvcy55ID4gNzAwIHx8IHRoaXMuZmlzaE5ldC5zZWF0SWQgPD0gMSAmJiB0aGlzLnBvcy55IDwgNTApIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3VjaCBvdXRzaWRlciEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBsYXllclVpZCA9IHRoaXMucGxheWVyTGlzdFt0aGlzLmZpc2hOZXQuc2VhdElkXS51aWQ7XHJcbiAgICAgICAgaWYgKHBsYXllclVpZCA9PSB0aGlzLnBJbmZvLnBsYXllcklkKSB7XHJcblxyXG4gICAgICAgICAgICBwbGF5RWZmZWN0KCdzaG90Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlzaE5ldC5maXNoU29ja2V0ICYmIHRoaXMuZmlzaE5ldC5maXNoU29ja2V0LmVtaXQoJ2Zpc2hTaG9vdCcsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHVzZXJpZDogcGxheWVyVWlkLFxyXG4gICAgICAgICAgICAgICAgYmV0OiB0aGlzLmJ1bGxldFBvd2VyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zLFxyXG4gICAgICAgICAgICAgICAgYnVsbGV0SWQ6IHRoaXMuZ2V0TmV4dEJ1bGxldElEKCksXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob290X3IodXNlcmlkLCBwb3MsIGJldCwgYmlkKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJTSE9PVCA6XCIrcG9zLngrXCItXCIrcG9zLnkpO1xyXG4gICAgICAgIC8vIHZhciBub2RlID0gY2MuZmluZChcIkNhbnZhcy9HYW1lTm9kZS9hdXJhYmcvYXVyYVwiKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImF1cmEgOlwiK25vZGUucG9zaXRpb24ueCtcIi1cIitub2RlLnBvc2l0aW9uLnkpO1xyXG5cclxuICAgICAgICB2YXIgc2VhdElkID0gdGhpcy5nZXRTZWF0QnlVc2VyKHVzZXJpZCk7XHJcbiAgICAgICAgaWYgKHNlYXRJZCA8IDApIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5hbGxvd0J1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbm5vbkxpc3Rbc2VhdElkXS5iYW5nKHBvcywgYmV0LCBiaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0U2VhdEJ5VXNlcih1c2VyaWQpIHtcclxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJMaXN0W2ldID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJMaXN0W2ldLnVpZCA9PSB1c2VyaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbblroPnjqnlrrbov5vlhaXmiL/pl7RcclxuICAgICAqIEBwYXJhbSB755So5oi3aWR9IFVzZXJJZCBcclxuICAgICAqIEBwYXJhbSB75bqn5L2NaWR9IHNlYXRJZCBcclxuICAgICAqIEBwYXJhbSB755So5oi35ZCNfSBuaWNrbmFtZSBcclxuICAgICAqIEBwYXJhbSB755So5oi35YiG5pWwfSBzY29yZSBcclxuICAgICAqL1xyXG4gICAgc2V0UGxheWVyRW50ZXIoVXNlcklkLCBzZWF0SWQsIG5pY2tuYW1lLCBzY29yZSwgaGVhZCwgZGlhbW9uZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXJMaXN0W3NlYXRJZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJMaXN0W3NlYXRJZF0gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcclxuICAgICAgICAgICAgICAgIGRpYW1vbmQ6IGRpYW1vbmQsXHJcbiAgICAgICAgICAgICAgICB1aWQ6IFVzZXJJZCxcclxuICAgICAgICAgICAgICAgIGhlYWQ6IGhlYWQsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheUVmZmVjdCgnc2l0X2Rvd24nKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1NlYXRTaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5L2N572u5bey5Y2gLeS4jeiDvei/m+WFpeW6p+S9jS3or7fmo4Dmn6UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YW25a6D546p5a6256a75byA5oi/6Ze05pON5L2cXHJcbiAgICAgKiBAcGFyYW0ge+W6p+S9jWlkfSBzZWF0SWQgXHJcbiAgICAgKi9cclxuICAgIHNldFBsYXllckV4aXQoc2VhdElkKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJMaXN0W3NlYXRJZF0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTZWF0U2hvdygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaOp+WItuW6p+S9jeeahOaYvumakFxyXG4gICAgICovXHJcbiAgICBjaGVja1NlYXRTaG93KCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5wbGF5ZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhdF9ub1BsYXllcl9ub2RlW2ldLmFjdGl2ZSA9ICF0aGlzLnBsYXllckxpc3RbaV07XHJcbiAgICAgICAgICAgIHRoaXMuc2VhdF9ub2RlW2ldLmFjdGl2ZSA9ICF0aGlzLnNlYXRfbm9QbGF5ZXJfbm9kZVtpXS5hY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1NlbGYoKSB7XHJcbiAgICAgICAgdmFyIHBpbmZvID0gcmVxdWlyZSgnUGxheWVySW5mbycpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBsYXllckxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyTGlzdFtpXSAmJiB0aGlzLnBsYXllckxpc3RbaV0udWlkID09IHBpbmZvLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXRfbm9kZVtpXS5nZXRDaGlsZEJ5TmFtZSgneW91cl9wb3NpdGlvbicpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXRfbm9kZVtpXS5nZXRDaGlsZEJ5TmFtZSgneW91cl9wb3NpdGlvbicpLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoNSksIGNjLmhpZGUoKSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a2Q5by55rGg5Lit55qE5a2Q5by5XHJcbiAgICAgKi9cclxuICAgIGdldEJ1bGxldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5idWxsZXRQb29sLnNpemUoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBwYiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UGIpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldFBvb2wucHV0KHBiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVsbGV0UG9vbC5nZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmuJTnvZHmsaDkuK3nmoTmuJTnvZFcclxuICAgICAqL1xyXG4gICAgZ2V0TmV0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5ldFBvb2wuc2l6ZSgpIDw9IDApIHtcclxuICAgICAgICAgICAgbGV0IHBiID0gY2MuaW5zdGFudGlhdGUodGhpcy5uZXRQYik7XHJcbiAgICAgICAgICAgIHRoaXMubmV0UG9vbC5wdXQocGIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5uZXRQb29sLmdldCgpO1xyXG4gICAgfSxcclxuICAgIGdldE5leHRCdWxsZXRJRCgpIHtcclxuICAgICAgICBpZiAodGhpcy5idWxsZXRJZCA+PSAxZTQpXHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0SWQgPSAwO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRJZCsrO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5idWxsZXRJZDtcclxuICAgIH0sXHJcbiAgICBvcGVuQWxlcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlICYmICh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21lc3NhZ2Vib3hiZycpLmFjdGl2ZSA9IHRydWUpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgIH0sXHJcbiAgICAvL+aJk+W8gOiPnOWNleagj1xyXG4gICAgc3dpdGNoX2xlZnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGVmdF9zdGF0ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0X3N0YXQgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdF9zdGF0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRfbGVmdF92aWV3KCk7XHJcbiAgICB9LFxyXG4gICAgc2V0X2xlZnRfdmlldyhpbnN0YW5jZSkge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdVSScpLmdldENoaWxkQnlOYW1lKCdsZWZ0Jyk7XHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdVSScpLmdldENoaWxkQnlOYW1lKCdyaWdodCcpO1xyXG4gICAgICAgIGxlZnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICByaWdodC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGxldCB0ID0gMC4yO1xyXG4gICAgICAgIGlmIChpbnN0YW5jZSkgdCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMubGVmdF9zdGF0ID09IDEpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2xlZnQv5bem5L6n5a+86Iiq5qCPJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MudHdlZW4obGVmdClcclxuICAgICAgICAgICAgICAgIC50byh0LCB7IHBvc2l0aW9uOiBjYy52MigtNjY3LCAwKSB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9yaWdodC/lj7Pkvqflr7zoiKrmoI8nKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy50d2VlbihyaWdodClcclxuICAgICAgICAgICAgICAgIC50byh0LCB7IHBvc2l0aW9uOiBjYy52Mig2NDAsIDApIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy50d2VlbihsZWZ0KVxyXG4gICAgICAgICAgICAgICAgLnRvKHQsIHsgcG9zaXRpb246IGNjLnYyKC03OTAsIDApIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2xlZnQv5bem5L6n5a+86Iiq5qCPJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy50d2VlbihyaWdodClcclxuICAgICAgICAgICAgICAgIC50byh0LCB7IHBvc2l0aW9uOiBjYy52Mig3NjAsIDApIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL3JpZ2h0L+WPs+S+p+WvvOiIquagjycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZUZpc2goaW5mbykge1xyXG4gICAgICAgIC8ve1wiZmlzaElkXCI6WzIzMjQsMjMyNSwyMzI2XSxcclxuICAgICAgICAvL1wiZmlzaFR5cGVcIjoxMSxcImZpc2hQYXRoXCI6NyxcImZpc2hDb3VudFwiOjMsXHJcbiAgICAgICAgLy9cImZpc2hMaW5ldXBcIjoxLFwibGluZXVwXCI6ZmFsc2UsXCJwcm9wQ291bnRcIjowfVxyXG4gICAgICAgIGxldCB0eXBlID0gaW5mby5maXNoVHlwZTtcclxuICAgICAgICBsZXQgcGF0aHMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyUGF0aFwiKTtcclxuICAgICAgICBsZXQgcGF0aEFyciA9IHBhdGhzLnBhdGhfbGlzdFtpbmZvLmZpc2hQYXRoXTtcclxuXHJcbiAgICAgICAgbGV0IG9mZnNldFggPSAwO1xyXG4gICAgICAgIGxldCBvZmZzZXRZID0gMDtcclxuICAgICAgICBsZXQgbGlzdFggPSAxO1xyXG4gICAgICAgIGxldCBsaXN0WSA9IDE7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCLlh7rpsbw6IOmxvOexu+Weiy1cIiwgdHlwZSwgXCIg6bG855qE5o6S5YiXLVwiLCBpbmZvLmZpc2hMaW5ldXAsIFwiIOmxvOeahOaVsOmHjy1cIiwgaW5mby5maXNoQ291bnQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGluZm8uZmlzaExpbmV1cCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy/lubbmjpJcclxuICAgICAgICAgICAgICAgIGxpc3RYID0gMTtcclxuICAgICAgICAgICAgICAgIGxpc3RZID0gaW5mby5maXNoQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy/mraPmlrnlvaIgNOWPqlxyXG4gICAgICAgICAgICAgICAgbGlzdFggPSAyO1xyXG4gICAgICAgICAgICAgICAgbGlzdFkgPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vNeaYnyA15Y+qXHJcbiAgICAgICAgICAgICAgICBsaXN0WCA9IDE7XHJcbiAgICAgICAgICAgICAgICBsaXN0WSA9IGluZm8uZmlzaENvdW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8v6ZW/5pa55b2iIDblj6pcclxuICAgICAgICAgICAgICAgIGxpc3RYID0gMjtcclxuICAgICAgICAgICAgICAgIGxpc3RZID0gMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZm8uZmlzaExpbmV1cCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mby5maXNoQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlzaFBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXNoID0gY2MuaW5zdGFudGlhdGUodGhpcy5maXNoUGJbdHlwZV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC5wYXJlbnQgPSB0aGlzLmZpc2hCZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC56SW5kZXggPSBpbmZvLmZpc2hUeXBlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikucGF0aEFyciA9IHBhdGhBcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLnBhdGhJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLmZpc2hJbmZvID0gaW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikuZmlzaElkID0gaW5mby5maXNoSWRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLmZpc2hUeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikub2Zmc2V0ID0gY2MudjIob2Zmc2V0WCwgb2Zmc2V0WSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2gucG9zaXRpb24gPSBjYy52MihwYXRoQXJyWzBdWzBdLCBwYXRoQXJyWzBdWzFdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KCdGaXNoaGFpd2FuZzInKS5leGVjdXRlTW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGkgKiA4MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm8uZmlzaENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaXNoID0gY2MuaW5zdGFudGlhdGUodGhpcy5maXNoUGJbdHlwZV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9mZnNldFggPSAoTWF0aC5mbG9vcihpIC8gbGlzdFkpIC0gKGxpc3RYIC0gMSkgLyAyKSAqIGZpc2gud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZID0gKGkgJSBsaXN0WSAtIChsaXN0WSAtIDEpIC8gMikgKiBmaXNoLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXNoLnBhcmVudCA9IHRoaXMuZmlzaEJnO1xyXG4gICAgICAgICAgICAgICAgZmlzaC56SW5kZXggPSBpbmZvLmZpc2hUeXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLnBhdGhBcnIgPSBwYXRoQXJyO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikucGF0aEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLmZpc2hJbmZvID0gaW5mbztcclxuICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLmZpc2hJZCA9IGluZm8uZmlzaElkW2ldO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikuZmlzaFR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikub2Zmc2V0ID0gY2MudjIob2Zmc2V0WCwgb2Zmc2V0WSk7XHJcbiAgICAgICAgICAgICAgICBmaXNoLnBvc2l0aW9uID0gY2MudjIocGF0aEFyclswXVswXSArIG9mZnNldFgsIHBhdGhBcnJbMF1bMV0gKyBvZmZzZXRZKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXNoLmdldENvbXBvbmVudCgnRmlzaGhhaXdhbmcyJykuZXhlY3V0ZU1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpc2hCeUlkKGZpZCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgZmlzaE5vZGUgb2YgdGhpcy5maXNoQmcuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbGV0IGZpc2ggPSBmaXNoTm9kZS5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIik7XHJcbiAgICAgICAgICAgIGlmIChmaXNoLmZpc2hJZCA9PSBmaWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaXNoTm9kZS54ID49IC02NjcgJiYgZmlzaE5vZGUueCA8PSA2NjcgJiYgZmlzaE5vZGUueSA+PSAtMzc1ICYmIGZpc2hOb2RlLnkgPD0gMzc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpc2hOb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0Zpc2hJZChmaWQpIHtcclxuICAgICAgICByZXR1cm4gY2MuaXNWYWxpZCh0aGlzLmdldEZpc2hCeUlkKGZpZCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkZpc2hIaXQoaW5mbykge1xyXG4gICAgICAgIC8vIGZpc2hJZFxyXG4gICAgICAgIC8vIGhpdFNjb3JlXHJcbiAgICAgICAgLy8gcHJvcENvdW50XHJcbiAgICAgICAgLy8gcHJvcElkXHJcbiAgICAgICAgLy8gdXNlcklkXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgbGV0IGZpc2hlcyA9IHRoaXMuZmlzaEJnLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gZmlzaGVzKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXNoTm9kZSA9IGZpc2hlc1tpXTtcclxuICAgICAgICAgICAgbGV0IGZpc2ggPSBmaXNoTm9kZS5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIik7XHJcbiAgICAgICAgICAgIGlmIChmaXNoLmZpc2hJZCA9PSBpbmZvLmZpc2hJZCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gZmlzaE5vZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAvL+WmguaenOmAieS4reeahOmxvOiiq+aJk+atu++8jOWwsea4heepuumAieS4reWuueWZqFxyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gdGhpcy50YXJnZXRGaXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RmlzaCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0U2VhdCA9IHRoaXMuZ2V0U2VhdEJ5VXNlcihpbmZvLnVzZXJJZCk7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLmZpc2hUeXBlID09IDI0IHx8XHJcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikuZmlzaFR5cGUgPT0gMjUpIHtcclxuICAgICAgICAgICAgLy8gZmlzaElkLGZpc2hJZExpc3Qsc2VuZElkXHJcblxyXG4gICAgICAgICAgICBsZXQgZmlzaCA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBmaXNoaWRsaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hsaWQgb2YgdGhpcy5maXNoQmcuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGZpc2ggPSBjaGxpZC5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIik7XHJcbiAgICAgICAgICAgICAgICBmaXNoaWRsaXN0LnB1c2goZmlzaC5maXNoSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Ye75Lit6bG85YiX6KGo77yaXCIsIGZpc2hpZGxpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLmZpc2hOZXQuZmlzaFNvY2tldC5lbWl0KCdib29tRmlzaEhpdCcsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIGZpc2hJZDogaW5mby5maXNoSWQsXHJcbiAgICAgICAgICAgICAgICBmaXNoSWRMaXN0OiBmaXNoaWRsaXN0LFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXNTZWxmID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8ucGxheWVySWQgPT0gaW5mby51c2VySWQpIHtcclxuICAgICAgICAgICAgaXNTZWxmID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29pbkFuaW1lKHRhcmdldFNlYXQsIGluZm8uaGl0U29jcmUgKiB0aGlzLnJvb21CZXQsIHRhcmdldC5wb3NpdGlvbiwgdGFyZ2V0LmdldENvbXBvbmVudChcIkZpc2hoYWl3YW5nMlwiKS5maXNoSW5mbywgaXNTZWxmLCB0cnVlKTtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGFyZ2V0LmRlc3Ryb3koKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Cb29tRmlzaEhpdChpbmZvKSB7XHJcbiAgICAgICAgLy8gaW5mbzp7dXNlcklkOl91c2VySWQsaGl0U29jcmU6c2NvcmUsZmlzaExpc3Q6b3V0ZmlzaExpc3R9fVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Ye75Lit54K45by55LqL5Lu277yaXCIsIGluZm8pO1xyXG4gICAgICAgIGxldCBmaXNoTm9kZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGlzU2VsZiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0YXJnZXRTZWF0ID0gdGhpcy5nZXRTZWF0QnlVc2VyKGluZm8udXNlcklkKTtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5wbGF5ZXJJZCA9PSBpbmZvLnVzZXJJZCkge1xyXG4gICAgICAgICAgICBpc1NlbGYgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBpbmZvLmZpc2hMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBmaXNoSWQgPSBpbmZvLmZpc2hMaXN0W2tleV07XHJcbiAgICAgICAgICAgIGZpc2hOb2RlID0gdGhpcy5nZXRGaXNoQnlJZChmaXNoSWQpO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChmaXNoTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29pbkFuaW1lKHRhcmdldFNlYXQsIGluZm8uaGl0U29jcmUgKiB0aGlzLnJvb21CZXQsIGZpc2hOb2RlLnBvc2l0aW9uLCBmaXNoTm9kZS5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikuZmlzaFR5cGUsIGlzU2VsZiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29pbkFuaW1lKHRhcmdldFNlYXQsIGluZm8uaGl0U29jcmUgKiB0aGlzLnJvb21CZXQsIGZpc2hOb2RlLnBvc2l0aW9uLCBmaXNoTm9kZS5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikuZmlzaFR5cGUsIGlzU2VsZiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlzaE5vZGUucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZpc2hOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYWRkQ29pbkFuaW1lKHRhcmdldFNlYXQsIHNjb3JlLCBwb3NpdGlvbiwgZmlzaFR5cGUsIGlzU2VsZiwgaXNBZGRTY29yZSkge1xyXG4gICAgICAgIHRoaXMuY2Fubm9uTGlzdFt0YXJnZXRTZWF0XS5jaGVja19wYW4oZmlzaFR5cGUsIHNjb3JlKTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNjb3JlKysgXCIrc2NvcmUpO1xyXG4gICAgICAgIHZhciBjb2luYmcgPSBjYy5maW5kKCdDYW52YXMvR2FtZU5vZGUvY29pbmJnJyk7XHJcblxyXG4gICAgICAgIHZhciBjb2lucGIgPSBudWxsO1xyXG4gICAgICAgIHZhciBjb2lubnVtID0gMDtcclxuICAgICAgICBpZiAoc2NvcmUgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgIGNvaW5wYiA9IHRoaXMuY29pblBiWzBdO1xyXG4gICAgICAgICAgICBjb2lubnVtID0gcGFyc2VJbnQoc2NvcmUgLyAxMDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2NvcmUgPj0gMTApIHtcclxuICAgICAgICAgICAgY29pbnBiID0gdGhpcy5jb2luUGJbMV07XHJcbiAgICAgICAgICAgIGNvaW5udW0gPSBwYXJzZUludChzY29yZSAvIDEwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2lucGIgPSB0aGlzLmNvaW5QYlsyXTtcclxuICAgICAgICAgICAgY29pbm51bSA9IE1hdGguY2VpbChzY29yZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2lubnVtID4gNikgY29pbm51bSA9IDY7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2lubnVtOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvaW4gPSBjYy5pbnN0YW50aWF0ZShjb2lucGIpO1xyXG4gICAgICAgICAgICBjb2luLnBhcmVudCA9IGNvaW5iZztcclxuICAgICAgICAgICAgY29pbi5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgY29pbi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuMyAqIChpICsgMSkpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuNCwgMCwgNjUpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwgdGhpcy5jYW5ub25MaXN0W3RhcmdldFNlYXRdLm5vZGUucG9zaXRpb24pLFxyXG4gICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzU2VsZikge1xyXG4gICAgICAgICAgICB2YXIgcyA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxOSk7XHJcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2RpZV8nICsgcyk7XHJcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2NvbGxlY3RfMicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5sYWJlbF9wYik7XHJcbiAgICAgICAgICAgIGxhYmVsLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBsYWJlbC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICBsYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiICsgSGVscGVyLmZpeE51bShzY29yZSk7XHJcbiAgICAgICAgICAgIGxhYmVsLnBhcmVudCA9IGNvaW5iZztcclxuICAgICAgICAgICAgbGFiZWwuekluZGV4ID0gMjAwO1xyXG4gICAgICAgICAgICB2YXIgdDEgPSAwLjQ7XHJcbiAgICAgICAgICAgIHZhciBzMSA9IDgwO1xyXG4gICAgICAgICAgICB2YXIgdDIgPSAwLjZcclxuICAgICAgICAgICAgbGFiZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oY2MuZmFkZUluKHQxKSwgY2MubW92ZUJ5KHQxLCBjYy52MigwLCB0MSAqIHMxKSkpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KHQyLCBjYy52MigwLCB0MiAqIHMxKSksXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihjYy5mYWRlT3V0KHQxKSwgY2MubW92ZUJ5KHQxLCBjYy52MigwLCB0MSAqIHMxKSkpLFxyXG4gICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5YiG5pWw5aKe5YqgXHJcbiAgICAgICAgaWYgKGlzQWRkU2NvcmUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC4zICogKGNvaW5udW0gKyAxKSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5ub25MaXN0W3RhcmdldFNlYXRdLmFkZHNjb3JlKHNjb3JlKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnVsbGV0X2NoYW5nZShudW0pIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBvd2VyX2xpc3QuaW5kZXhPZih0aGlzLmJ1bGxldFBvd2VyKTtcclxuICAgICAgICBpbmRleCArPSBudW07XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnBvd2VyX2xpc3QubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5idWxsZXRQb3dlciA9IHRoaXMucG93ZXJfbGlzdFtpbmRleF07XHJcblxyXG4gICAgICAgIHRoaXMuZmlzaE5ldC5maXNoU29ja2V0LmVtaXQoJ2NoYW5nZVBvd2VyJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1c2VyaWQ6IHRoaXMucEluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgIGJldDogdGhpcy5idWxsZXRQb3dlcixcclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBjaGFuZ2VQb3dlcihpbmZvKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBsYXllckxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyTGlzdCAmJiB0aGlzLnBsYXllckxpc3RbaV0udWlkID09IGluZm8udXNlcmlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbm5vbkxpc3RbaV0uYmV0TGJsLnN0cmluZyA9IEhlbHBlci5maXhOdW0oaW5mby5iZXQgKiB0aGlzLnJvb21CZXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNhc3Rfc2tpbGwoc2lkKSB7XHJcbiAgICAgICAgaWYgKHNpZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraWxsQ0RbMF0gPiAwIHx8IHRoaXMucEluZm8ucGxheWVyQ29pbiA8IHRoaXMuc2tpbGxDb3N0WzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGluZm8gPSB7IHVpZDogdGhpcy5wSW5mby5wbGF5ZXJJZCwgc2lkOiBzaWQgfTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5jYXN0X3NraWxsX3IoaW5mbyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmlzaE5ldC5maXNoU29ja2V0LmVtaXQoJ3VzZVNLaWxsJywgSlNPTi5zdHJpbmdpZnkoaW5mbykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDplIHlrprlvIDlhbNcclxuICAgICAgICBpZiAoc2lkID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0xvY2tGaXNoID0gIXRoaXMuaXNMb2NrRmlzaDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NrRmlzaCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCaWdGaXNoSWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X2xvY2tGaXNoLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9sb2NrRmlzaC5zdHJpbmcgPSBcIuino+mZpOmUgeWumlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RfbG9ja0Zpc2guYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9sb2NrRmlzaC5zdHJpbmcgPSBcIumUgeWumlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2FzdF9za2lsbF9yKGluZm8pIHtcclxuICAgICAgICB2YXIgc2VhdElkID0gdGhpcy5nZXRTZWF0QnlVc2VyKGluZm8udWlkKTtcclxuICAgICAgICBpZiAoc2VhdElkIDwgMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoaW5mby5zaWQgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsVGltZVswXSA9IHRoaXMuc2tpbGxNYXhUaW1lWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsQ0RbMF0gPSB0aGlzLnNraWxsTWF4Q0RbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0X2Zyb3plbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZmlzaEJnLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlzaCA9IHRoaXMuZmlzaEJnLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5wYXVzZUFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKGluZm8udWlkID09IHRoaXMucEluZm8ucGxheWVySWQpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBlbHNlIGlmIChpbmZvLnNpZCA9PSAyKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNraWxsQ0RbMV0gID0gdGhpcy5za2lsbE1heENEWzFdO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5za2lsbFRpbWVbMV0gPSB0aGlzLnNraWxsTWF4VGltZVsxXTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9vdCwgMC4yLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMC4wMSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGlmIChpbmZvLnNpZCA9PSAyKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYW5ub25MaXN0W3NlYXRJZF0uYXV0b1RpbWUgPSB0aGlzLnNraWxsTWF4VGltZVsxXTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGlzQWltaW5nKCl7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuc2tpbGxUaW1lWzFdPjA7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5za2lsbFRpbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpbGxUaW1lW2ldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbFRpbWVbaV0tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5za2lsbENEW2ldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbENEW2ldLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBub2RlO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gY2MuZmluZCgnQ2FudmFzL1VJL3JpZ2h0L+WPs+S+p+WvvOiIquagjy9zMS9jZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9VSS9yaWdodC/lj7Pkvqflr7zoiKrmoI8vczIvY2QnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gdGhpcy5za2lsbENEW2ldIC8gdGhpcy5za2lsbE1heENEW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxUaW1lWzBdID09IDEpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmZpc2hCZy5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpc2ggPSB0aGlzLmZpc2hCZy5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgIGZpc2gucmVzdW1lQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0X2Zyb3plbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc2tpbGxUaW1lWzFdID09IDEpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5pc0F1dG9TaG90KSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvb3QsIDAuMywgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsIDAuMDEpO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnNob290KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gdmFyIGF1cmEgPSBmYWxzZTtcclxuICAgICAgICAvLyBmb3IgKHZhciBpIGluIHRoaXMuY2Fubm9uTGlzdClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLmNhbm5vbkxpc3RbaV0uYXV0b1RpbWUgJiYgdGhpcy5jYW5ub25MaXN0W2ldLmF1dG9UaW1lPjApe1xyXG4gICAgICAgIC8vICAgICAgICAgYXVyYSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHZhciBub2RlID0gY2MuZmluZChcIkNhbnZhcy9HYW1lTm9kZS9hdXJhYmcvYXVyYVwiKTtcclxuICAgICAgICBpZiAodGhpcy5pc0xvY2tGaXNoKSB7XHJcbiAgICAgICAgICAgIHZhciBmaXNoID0gdGhpcy5nZXRCaWdGaXNoKCk7XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGZpc2gpKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gZmlzaC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBmaXNoLmhlaWdodCAqIDAuNzUgLyAyNDk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRCaWdGaXNoSWQoKSB7XHJcbiAgICAgICAgbGV0IGZpc2hOb2RlID0gdGhpcy5nZXRCaWdGaXNoKCk7XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGZpc2hOb2RlKSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiBmaXNoTm9kZS5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJcIikuZmlzaElkO1xyXG4gICAgfSxcclxuICAgIGdldEJpZ0Zpc2goKSB7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy50YXJnZXRGaXNoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXRGaXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYmlnZmlzaE5vZGUgPSBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5maXNoQmcuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGZpc2hOb2RlID0gdGhpcy5maXNoQmcuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIHZhciBmaXNoID0gZmlzaE5vZGUuZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpO1xyXG4gICAgICAgICAgICBpZiAoZmlzaE5vZGUueCA8IC02NjcgfHwgZmlzaE5vZGUueCA+IDY2NyB8fCBmaXNoTm9kZS55IDwgLTM3NSB8fCBmaXNoTm9kZS55ID4gMzc1IHx8IGZpc2guZmlzaFR5cGUgPCB0aGlzLmJpZ0Zpc2hUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmlnZmlzaE5vZGUgPT0gbnVsbCB8fCBmaXNoLmZpc2hUeXBlID4gYmlnZmlzaE5vZGUuZ2V0Q29tcG9uZW50KFwiRmlzaGhhaXdhbmcyXCIpLmZpc2hUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBiaWdmaXNoTm9kZSA9IGZpc2hOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiaWdmaXNoTm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0QXV0b1Nob3QoaXNBdXRvKSB7XHJcbiAgICAgICAgdGhpcy5pc0F1dG9TaG90ID0gaXNBdXRvO1xyXG4gICAgICAgIC8vaWYgKHRoaXMuc2tpbGxUaW1lWzFdPjApIHJldHVybjtcclxuICAgICAgICBpZiAoaXNBdXRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9vdCwgMC4zLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMC4wMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuc2hvb3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0TXVzaWMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgIHRoaXMucEluZm8ubXVzaWNDb250cm9sID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY1RvZ2dsZS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucEluZm8ubXVzaWNDb250cm9sID0gMTtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY1RvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBwbGF5QkdNKCdiZ18wJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud3JpdGVVc2VyU2V0dGluZ0RhdGVfRnVuY3Rpb24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0U291bmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sKSB7XHJcbiAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZFRvZ2dsZS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRUb2dnbGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53cml0ZVVzZXJTZXR0aW5nRGF0ZV9GdW5jdGlvbigpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5bCG6K6+572u5pWw5o2u5YaZ5YWl57yT5a2Y5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHdyaXRlVXNlclNldHRpbmdEYXRlX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIG11c2ljQ29udHJvbDogdGhpcy5wSW5mby5tdXNpY0NvbnRyb2wsXHJcbiAgICAgICAgICAgIHNvdW5kRWZmZWN0Q29udHJvbDogdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2xcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucEluZm8ud3JpdGVEYXRhX0Z1bmN0aW9uKFwidXNlclNldHRpbmdcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG59KTsiXX0=