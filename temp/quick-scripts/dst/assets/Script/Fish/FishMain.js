
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Fish/FishMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88151wah0ZAPLgkExyZusZP', 'FishMain');
// Script/Fish/FishMain.js

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
    jackpotlab: cc.Label,
    //奖池信息
    coinPb: [cc.Prefab],
    diamondPb: cc.Prefab,
    label_pb: cc.Prefab,
    label_pb2: cc.Prefab,
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
    this.FishPool = new cc.NodePool("Fish");
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

    this.fishNet = require("./FishNetWork").getInstant;
    this.fishNet.setFishObj_Funtion(this);
    this.pInfo = require("PlayerInfo").getInstant;
    this.pInfo.setGameObj_Function(this);
    this.fishNet.disconnected = false; //获取房间倍率

    this.roomBet = this.fishNet.roomBet; //房间玩家信息

    this.playerList = [null, null, null, null]; //获取奖池信息

    this.jackpotlab.string = parseInt(this.pInfo.win_pool / this.pInfo.exchangeRate); //炮对象 在BUlletCtrl中赋值

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
          var fishType = child.getComponent("Fish").fishType;

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
    cc.find('Canvas/UI/b/s1/shuzi').getComponent(cc.Label).string = Helper.fixNum(this.skillCost[0]);
    cc.find('Canvas/UI/b/s2/shuzi').getComponent(cc.Label).string = Helper.fixNum(this.skillCost[1]);
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
        this.seat_node[i].getChildByName('up').active = true;
        this.seat_node[i].getChildByName('down').active = true;
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
    this.node.getChildByName('messageboxbg').active = true;
  },
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
    left.stopAllActions();
    var t = 0.2;
    if (instance) t = 0;

    if (this.left_stat == 1) {
      cc.find('Canvas/UI/left/左侧导航栏').active = true;
      left.runAction(cc.moveTo(t, cc.v2(-667, 0)));
    } else {
      left.runAction(cc.sequence(cc.moveTo(t, cc.v2(-790, 0)), cc.callFunc(function () {
        cc.find('Canvas/UI/left/左侧导航栏').active = false;
      }, this)));
    }
  },
  createFish: function createFish(info) {
    var _this2 = this;

    //{"fishId":[2324,2325,2326],
    //"fishType":11,"fishPath":7,"fishCount":3,
    //"fishLineup":1,"lineup":false,"propCount":0}
    var type = info.fishType;
    var paths = this.node.getComponent("FishPath");
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
            fish.getComponent("Fish").pathArr = pathArr;
            fish.getComponent("Fish").pathIndex = 0;
            fish.getComponent("Fish").fishInfo = info;
            fish.getComponent("Fish").fishId = info.fishId[i];
            fish.getComponent("Fish").fishType = type;
            fish.getComponent("Fish").offset = cc.v2(offsetX, offsetY);
            fish.position = cc.v2(pathArr[0][0], pathArr[0][1]);
            fish.getComponent('Fish').executeMove();
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
        fish.getComponent("Fish").pathArr = pathArr;
        fish.getComponent("Fish").pathIndex = 0;
        fish.getComponent("Fish").fishInfo = info;
        fish.getComponent("Fish").fishId = info.fishId[_i2];
        fish.getComponent("Fish").fishType = type;
        fish.getComponent("Fish").offset = cc.v2(offsetX, offsetY);
        fish.position = cc.v2(pathArr[0][0] + offsetX, pathArr[0][1] + offsetY);
        fish.getComponent('Fish').executeMove();
      }
    }
  },
  getFishById: function getFishById(fid) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.fishBg.children), _step2; !(_step2 = _iterator2()).done;) {
      var fishNode = _step2.value;
      var fish = fishNode.getComponent("Fish");

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
      var fish = fishNode.getComponent("Fish");

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

    if (target.getComponent("Fish").fishType == 24 || target.getComponent("Fish").fishType == 25) {
      // fishId,fishIdList,sendId
      var _fish = null;
      var fishidlist = [];

      for (var _iterator3 = _createForOfIteratorHelperLoose(this.fishBg.children), _step3; !(_step3 = _iterator3()).done;) {
        var chlid = _step3.value;
        _fish = chlid.getComponent("Fish");
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

    if (info.propId == 2) {
      this.addDiamondAnim(targetSeat, info.propValue, target.position, isSelf);
    } else {
      this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, target.position, target.getComponent("Fish").fishInfo, isSelf, true);
    }

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
          this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, fishNode.position, fishNode.getComponent("Fish").fishType, isSelf, true);
        } else {
          this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, fishNode.position, fishNode.getComponent("Fish").fishType, isSelf, false);
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
  //增加钻石
  addDiamondAnim: function addDiamondAnim(targetSeat, dia, position, isSelf) {
    var coinbg = cc.find('Canvas/GameNode/coinbg');
    var diapb = this.diamondPb;
    var dianum = dia;

    for (var i = 0; i < dianum; i++) {
      var coin = cc.instantiate(diapb);
      coin.parent = coinbg;
      coin.position = position;
      coin.runAction(cc.sequence(cc.delayTime(0.1 * (i + 1)), cc.moveBy(0.4, 0, 65), cc.moveTo(0.5, this.cannonList[targetSeat].node.position), cc.removeSelf()));
    }

    if (isSelf) {
      var s = parseInt(Math.random() * 19);
      playEffect('die_' + s);
      playEffect('collect_2');
      var label = cc.instantiate(this.label_pb2);
      label.opacity = 0;
      label.position = position;
      label.getComponent(cc.Label).string = "+" + dia;
      label.parent = coinbg;
      label.zIndex = 200;
      var t1 = 0.4;
      var s1 = 80;
      var t2 = 0.6;
      label.runAction(cc.sequence(cc.spawn(cc.fadeIn(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))), cc.moveBy(t2, cc.v2(0, t2 * s1)), cc.spawn(cc.fadeOut(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))), cc.removeSelf()));
    } //钻石增加


    this.node.runAction(cc.sequence(cc.delayTime(0.1 * (dianum + 1)), cc.callFunc(function () {
      this.cannonList[targetSeat].addDiamond(dia);
    }, this)));
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
        node = cc.find('Canvas/UI/b/s1/cd');
      } else if (i == 1) {
        node = cc.find('Canvas/UI/b/s2/cd');
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
    return fishNode.getComponent("Fish").fishId;
  },
  getBigFish: function getBigFish() {
    if (cc.isValid(this.targetFish)) {
      return this.targetFish;
    }

    var bigfishNode = null;

    for (var i in this.fishBg.children) {
      var fishNode = this.fishBg.children[i];
      var fish = fishNode.getComponent("Fish");

      if (fishNode.x < -667 || fishNode.x > 667 || fishNode.y < -375 || fishNode.y > 375 || fish.fishType < this.bigFishType) {
        continue;
      }

      if (bigfishNode == null || fish.fishType > bigfishNode.getComponent("Fish").fishType) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXNoXFxGaXNoTWFpbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJnX2FuaW0iLCJOb2RlIiwiZWZmZWN0X2Zyb3plbiIsImVmZmVjdF9sb2NrRmlzaCIsImxhYl9sb2NrRmlzaCIsIkxhYmVsIiwiYmdfcGljTGlzdCIsInNlYXRfbm9kZSIsInNlYXRfbm9QbGF5ZXJfbm9kZSIsInRvdWNoTGF5ZXIiLCJidWxsZXRQYiIsIlByZWZhYiIsImJ1bGxldEJnIiwibmV0QmciLCJuZXRQYiIsImZpc2hCZyIsImZpc2hQYiIsImphY2twb3RsYWIiLCJjb2luUGIiLCJkaWFtb25kUGIiLCJsYWJlbF9wYiIsImxhYmVsX3BiMiIsIm11c2ljVG9nZ2xlIiwiVG9nZ2xlIiwic291bmRUb2dnbGUiLCJvbkxvYWQiLCJ3aW5kb3ciLCJmaXNoX2lucyIsIkZpc2hQb29sIiwiTm9kZVBvb2wiLCJsZWZ0X3N0YXQiLCJidWxsZXRJZCIsImFsbG93QnVsbGV0IiwiaXNBdXRvU2hvdCIsImlzTG9ja0Zpc2giLCJidWxsZXRQb3dlciIsInRhcmdldEZpc2giLCJiaWdGaXNoVHlwZSIsInN5cyIsImlzTmF0aXZlIiwidmlldyIsInNldE9yaWVudGF0aW9uIiwibWFjcm8iLCJPUklFTlRBVElPTl9MQU5EU0NBUEUiLCJjb2xsaXNpb25NZ3IiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwiZmlzaE5ldCIsInJlcXVpcmUiLCJnZXRJbnN0YW50Iiwic2V0RmlzaE9ial9GdW50aW9uIiwicEluZm8iLCJzZXRHYW1lT2JqX0Z1bmN0aW9uIiwiZGlzY29ubmVjdGVkIiwicm9vbUJldCIsInBsYXllckxpc3QiLCJzdHJpbmciLCJwYXJzZUludCIsIndpbl9wb29sIiwiZXhjaGFuZ2VSYXRlIiwiY2Fubm9uTGlzdCIsInBvcyIsInYyIiwib24iLCJlIiwiZ2V0TG9jYXRpb24iLCJzY2hlZHVsZSIsInNob290IiwiUkVQRUFUX0ZPUkVWRVIiLCJpc1N3aXRjaFRhcmdldCIsImNoaWxkcmVuIiwiY2hpbGQiLCJmaXNoVHlwZSIsImdldENvbXBvbmVudCIsIngiLCJ5IiwiZ2V0Qm91bmRpbmdCb3hUb1dvcmxkIiwiY29udGFpbnMiLCJjb25zb2xlIiwibG9nIiwidW5zY2hlZHVsZSIsImJ1bGxldFBvb2wiLCJpIiwicGIiLCJpbnN0YW50aWF0ZSIsInB1dCIsIm5ldFBvb2wiLCJzZXRfbGVmdF92aWV3IiwicG93ZXJfbGlzdCIsInNraWxsTWF4VGltZSIsInNraWxsVGltZSIsInNraWxsQ29zdCIsInNraWxsQ0QiLCJza2lsbE1heENEIiwiZmluZCIsIkhlbHBlciIsImZpeE51bSIsInN0YXJ0XyIsInVzZXJMaXN0IiwidXNyIiwic2VhdElkIiwibmFtZSIsIm5pY2tuYW1lIiwic2NvcmUiLCJkaWFtb25kIiwidWlkIiwidXNlcklkIiwiaGVhZCIsImhlYWRpbWd1cmwiLCJwbGF5QkdNIiwiY2hlY2tTZWF0U2hvdyIsImNoZWNrU2VsZiIsImlzQ2hlY2tlZCIsIm11c2ljQ29udHJvbCIsInNvdW5kRWZmZWN0Q29udHJvbCIsImZpc2hOb2RlIiwiZ2V0QmlnRmlzaCIsImlzVmFsaWQiLCJnZXRQb3NpdGlvbiIsInBsYXllclVpZCIsInBsYXllcklkIiwicGxheUVmZmVjdCIsImZpc2hTb2NrZXQiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsImJldCIsInBvc2l0aW9uIiwiZ2V0TmV4dEJ1bGxldElEIiwic2hvb3RfciIsImJpZCIsImdldFNlYXRCeVVzZXIiLCJiYW5nIiwic2V0UGxheWVyRW50ZXIiLCJVc2VySWQiLCJlcnJvciIsInNldFBsYXllckV4aXQiLCJhY3RpdmUiLCJwaW5mbyIsImdldENoaWxkQnlOYW1lIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJoaWRlIiwiZ2V0QnVsbGV0Iiwic2l6ZSIsImdldCIsImdldE5ldCIsIm9wZW5BbGVydCIsIm5vZGUiLCJzd2l0Y2hfbGVmdCIsImluc3RhbmNlIiwibGVmdCIsInN0b3BBbGxBY3Rpb25zIiwidCIsIm1vdmVUbyIsImNhbGxGdW5jIiwiY3JlYXRlRmlzaCIsImluZm8iLCJ0eXBlIiwicGF0aHMiLCJwYXRoQXJyIiwicGF0aF9saXN0IiwiZmlzaFBhdGgiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImxpc3RYIiwibGlzdFkiLCJmaXNoTGluZXVwIiwiZmlzaENvdW50Iiwic2V0VGltZW91dCIsImZpc2giLCJwYXJlbnQiLCJ6SW5kZXgiLCJwYXRoSW5kZXgiLCJmaXNoSW5mbyIsImZpc2hJZCIsIm9mZnNldCIsImV4ZWN1dGVNb3ZlIiwiTWF0aCIsImZsb29yIiwid2lkdGgiLCJoZWlnaHQiLCJnZXRGaXNoQnlJZCIsImZpZCIsImNoZWNrRmlzaElkIiwib25GaXNoSGl0IiwidGFyZ2V0IiwiZmlzaGVzIiwidGFyZ2V0U2VhdCIsImZpc2hpZGxpc3QiLCJjaGxpZCIsInB1c2giLCJmaXNoSWRMaXN0IiwiaXNTZWxmIiwicHJvcElkIiwiYWRkRGlhbW9uZEFuaW0iLCJwcm9wVmFsdWUiLCJhZGRDb2luQW5pbWUiLCJoaXRTb2NyZSIsImRlc3Ryb3kiLCJvbkJvb21GaXNoSGl0Iiwia2V5IiwiZmlzaExpc3QiLCJpc0FkZFNjb3JlIiwiY2hlY2tfcGFuIiwiY29pbmJnIiwiY29pbnBiIiwiY29pbm51bSIsImNlaWwiLCJjb2luIiwibW92ZUJ5IiwicmVtb3ZlU2VsZiIsInMiLCJyYW5kb20iLCJsYWJlbCIsIm9wYWNpdHkiLCJ0MSIsInMxIiwidDIiLCJzcGF3biIsImZhZGVJbiIsImZhZGVPdXQiLCJhZGRzY29yZSIsImRpYSIsImRpYXBiIiwiZGlhbnVtIiwiYWRkRGlhbW9uZCIsImJ1bGxldF9jaGFuZ2UiLCJudW0iLCJpbmRleCIsImluZGV4T2YiLCJsZW5ndGgiLCJjaGFuZ2VQb3dlciIsImJldExibCIsImNhc3Rfc2tpbGwiLCJzaWQiLCJwbGF5ZXJDb2luIiwiZ2V0QmlnRmlzaElkIiwiY2FzdF9za2lsbF9yIiwicGF1c2VBbGxBY3Rpb25zIiwidXBkYXRlIiwiZHQiLCJQcm9ncmVzc0JhciIsInByb2dyZXNzIiwicmVzdW1lQWxsQWN0aW9ucyIsInNjYWxlIiwiYmlnZmlzaE5vZGUiLCJzZXRBdXRvU2hvdCIsImlzQXV0byIsInNldE11c2ljIiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwid3JpdGVVc2VyU2V0dGluZ0RhdGVfRnVuY3Rpb24iLCJzZXRTb3VuZCIsImRhdGEiLCJ3cml0ZURhdGFfRnVuY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVKLEVBQUUsQ0FBQ0ssSUFESjtBQUNVO0FBQ2xCQyxJQUFBQSxhQUFhLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGVjtBQUVnQjtBQUN4QkUsSUFBQUEsZUFBZSxFQUFFUCxFQUFFLENBQUNLLElBSFo7QUFHb0I7QUFDNUJHLElBQUFBLFlBQVksRUFBRVIsRUFBRSxDQUFDUyxLQUpUO0FBSWU7QUFDdkJDLElBQUFBLFVBQVUsRUFBRSxDQUFDVixFQUFFLENBQUNLLElBQUosQ0FMSjtBQUtlO0FBQ3ZCTSxJQUFBQSxTQUFTLEVBQUUsQ0FBQ1gsRUFBRSxDQUFDSyxJQUFKLENBTkg7QUFNYztBQUN0Qk8sSUFBQUEsa0JBQWtCLEVBQUUsQ0FBQ1osRUFBRSxDQUFDSyxJQUFKLENBUFo7QUFPdUI7QUFDL0JRLElBQUFBLFVBQVUsRUFBRWIsRUFBRSxDQUFDSyxJQVJQO0FBUWE7QUFDckJTLElBQUFBLFFBQVEsRUFBRWQsRUFBRSxDQUFDZSxNQVRMO0FBU2E7QUFDckJDLElBQUFBLFFBQVEsRUFBRWhCLEVBQUUsQ0FBQ0ssSUFWTDtBQVVXO0FBQ25CWSxJQUFBQSxLQUFLLEVBQUVqQixFQUFFLENBQUNLLElBWEY7QUFXUTtBQUNoQmEsSUFB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VzhELFlBQVgsR0FBMEIsQ0FBMUI7QUFDQSxXQUFLNUYsV0FBTCxDQUFpQjJGLFNBQWpCLEdBQTZCLEtBQTdCO0FBQ0FySCxNQUFBQSxFQUFFLENBQUNpUSxXQUFILENBQWVDLE9BQWY7QUFDSCxLQUpELE1BSU87QUFDSCxXQUFLMU0sS0FBTCxDQUFXOEQsWUFBWCxHQUEwQixDQUExQjtBQUNBLFdBQUs1RixXQUFMLENBQWlCMkYsU0FBakIsR0FBNkIsSUFBN0I7QUFDQUgsTUFBQUEsT0FBTyxDQUFDLE1BQUQsQ0FBUDtBQUNIOztBQUNELFNBQUtpSiw2QkFBTDtBQUNILEdBNXlCSTtBQTh5QkxDLEVBQUFBLFFBOXlCSyxzQkE4eUJNO0FBQ1AsUUFBSSxLQUFLNU0sS0FBTCxDQUFXK0Qsa0JBQWYsRUFBbUM7QUFDL0IsV0FBSy9ELEtBQUwsQ0FBVytELGtCQUFYLEdBQWdDLENBQWhDO0FBQ0EsV0FBSzNGLFdBQUwsQ0FBaUJ5RixTQUFqQixHQUE2QixLQUE3QjtBQUNILEtBSEQsTUFHTztBQUNILFdBQUs3RCxLQUFMLENBQVcrRCxrQkFBWCxHQUFnQyxDQUFoQztBQUNBLFdBQUszRixXQUFMLENBQWlCeUYsU0FBakIsR0FBNkIsSUFBN0I7QUFDSDs7QUFDRCxTQUFLOEksNkJBQUw7QUFDSCxHQXZ6Qkk7O0FBd3pCTDtBQUNKO0FBQ0E7QUFDSUEsRUFBQUEsNkJBQTZCLEVBQUUseUNBQVk7QUFDdkMsUUFBSUUsSUFBSSxHQUFHO0FBQ1AvSSxNQUFBQSxZQUFZLEVBQUUsS0FBSzlELEtBQUwsQ0FBVzhELFlBRGxCO0FBRVBDLE1BQUFBLGtCQUFrQixFQUFFLEtBQUsvRCxLQUFMLENBQVcrRDtBQUZ4QixLQUFYO0FBSUEsU0FBSy9ELEtBQUwsQ0FBVzhNLGtCQUFYLENBQThCLGFBQTlCLEVBQTZDRCxJQUE3QztBQUNIO0FBajBCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJnX2FuaW06IGNjLk5vZGUsIC8v5rW35rC054m55pWIXHJcbiAgICAgICAgZWZmZWN0X2Zyb3plbjogY2MuTm9kZSwgLy/mtbfmsLTnibnmlYhcclxuICAgICAgICBlZmZlY3RfbG9ja0Zpc2g6IGNjLk5vZGUsICAgLy/plIHlrprmlYjmnpxcclxuICAgICAgICBsYWJfbG9ja0Zpc2g6IGNjLkxhYmVsLC8v6ZSB5a6a5paH5a2XXHJcbiAgICAgICAgYmdfcGljTGlzdDogW2NjLk5vZGVdLCAvL+iDjOaZr+WIl+ihqFxyXG4gICAgICAgIHNlYXRfbm9kZTogW2NjLk5vZGVdLCAvL+W6p+S9jeWIl+ihqFxyXG4gICAgICAgIHNlYXRfbm9QbGF5ZXJfbm9kZTogW2NjLk5vZGVdLCAvL+ayoeW6p+S9jeWIl+ihqFxyXG4gICAgICAgIHRvdWNoTGF5ZXI6IGNjLk5vZGUsIC8v54K55Ye75bGCXHJcbiAgICAgICAgYnVsbGV0UGI6IGNjLlByZWZhYiwgLy/lrZDlvLlwYlxyXG4gICAgICAgIGJ1bGxldEJnOiBjYy5Ob2RlLCAvL+WtkOW8ueWxglxyXG4gICAgICAgIG5ldEJnOiBjYy5Ob2RlLCAvLyDnvZHlsYJcclxuICAgICAgICBuZXRQYjogY2MuUHJlZmFiLCAvLyDnvZFwYlxyXG4gICAgICAgIGZpc2hCZzogY2MuTm9kZSwgLy/psbzlsYJcclxuICAgICAgICBmaXNoUGI6IFtjYy5QcmVmYWJdLFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy9oZWFydEJlYXQ6IDAsXHJcbiAgICAgICAgamFja3BvdGxhYjogY2MuTGFiZWwsLy/lpZbmsaDkv6Hmga9cclxuICAgICAgICBjb2luUGI6IFtjYy5QcmVmYWJdLFxyXG4gICAgICAgIGRpYW1vbmRQYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGxhYmVsX3BiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbGFiZWxfcGIyOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbXVzaWNUb2dnbGU6IGNjLlRvZ2dsZSxcclxuICAgICAgICBzb3VuZFRvZ2dsZTogY2MuVG9nZ2xlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy/mmK/lkKblhYHorrjlvIDngq5cclxuICAgICAgICAvLyB2YXIgdDtcclxuICAgICAgICAvLyBmb3IgKHRoaXMuZmlzaFcgPSBbNjIuNCwgODAsIDczLjIsIDc0LCA2Mi40LCA3MiwgMTE3LjYsIDExMi44LCAxMDAsIDEyMCwgMjI1LCAxODAsIDE4MCwgMjM1LjIsIDIzNy42LCAxNjAsIDE2MCwgMTYwLCAxNjAsIDE2MCwgMTYwLCAzNTAsIDM1MCwgMzUwLCAzNTAsIDM1MCwgMzUwXSwgdGhpcy5sYWJlbFBvc2l0aW9uID0gbmV3IEFycmF5KHRoaXMubWF4UGxheWVyKSwgdCA9IDA7IHQgPCB0aGlzLmxhYmVsUG9zaXRpb24ubGVuZ3RoOyArK3QpIHRoaXMubGFiZWxQb3NpdGlvblt0XSA9IGNjLnAoMCwgMCk7XHJcbiAgICAgICAgLy8gICAgICAgICBjYy5wKDAsIDApO1xyXG5cclxuICAgICAgICB3aW5kb3cuZmlzaF9pbnMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuRmlzaFBvb2wgPSBuZXcgY2MuTm9kZVBvb2woXCJGaXNoXCIpO1xyXG4gICAgICAgIHRoaXMubGVmdF9zdGF0ID0gMDtcclxuICAgICAgICB0aGlzLmJ1bGxldElkID0gMDtcclxuICAgICAgICB0aGlzLmFsbG93QnVsbGV0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzQXV0b1Nob3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTG9ja0Zpc2ggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5idWxsZXRQb3dlciA9IDE7XHJcbiAgICAgICAgdGhpcy50YXJnZXRGaXNoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJpZ0Zpc2hUeXBlID0gMTU7XHJcblxyXG4gICAgICAgIC8v5bGP5bmV6YCC6YWNXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eisOaSnueuoeeQhuWZqFxyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uTWdyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uTWdyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuY29sbGlzaW9uTWdyLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuY29sbGlzaW9uTWdyLmVuYWJsZWREcmF3Qm91bmRpbmdCb3ggPSB0cnVlO1xyXG5cclxuICAgICAgICAvL+iOt+WPlue7hOS7tlxyXG4gICAgICAgIHRoaXMuZmlzaE5ldCA9IHJlcXVpcmUoXCIuL0Zpc2hOZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5maXNoTmV0LnNldEZpc2hPYmpfRnVudGlvbih0aGlzKTtcclxuICAgICAgICB0aGlzLnBJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLnBJbmZvLnNldEdhbWVPYmpfRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgdGhpcy5maXNoTmV0LmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIC8v6I635Y+W5oi/6Ze05YCN546HXHJcbiAgICAgICAgdGhpcy5yb29tQmV0ID0gdGhpcy5maXNoTmV0LnJvb21CZXQ7XHJcbiAgICAgICAgLy/miL/pl7Tnjqnlrrbkv6Hmga9cclxuICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBbbnVsbCwgbnVsbCwgbnVsbCwgbnVsbF07XHJcbiAgICAgICAgLy/ojrflj5blpZbmsaDkv6Hmga9cclxuICAgICAgICB0aGlzLmphY2twb3RsYWIuc3RyaW5nID0gcGFyc2VJbnQodGhpcy5wSW5mby53aW5fcG9vbCAvIHRoaXMucEluZm8uZXhjaGFuZ2VSYXRlKTtcclxuXHJcbiAgICAgICAgLy/ngq7lr7nosaEg5ZyoQlVsbGV0Q3RybOS4rei1i+WAvFxyXG4gICAgICAgIHRoaXMuY2Fubm9uTGlzdCA9IFtdO1xyXG5cclxuICAgICAgICAvL+azqOWGjOeCueWHu+S6i+S7tlxyXG4gICAgICAgIHRoaXMucG9zID0gY2MudjIoNjY3LCAzNzUpO1xyXG4gICAgICAgIHRoaXMudG91Y2hMYXllci5vbihcInRvdWNoc3RhcnRcIiwgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9ja0Zpc2gpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5wb3MgPSBlLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9vdCwgMC4yLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMC4wMSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy50b3VjaExheWVyLm9uKFwidG91Y2htb3ZlXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBvcyA9IGUuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnRvdWNoTGF5ZXIub24oXCJ0b3VjaGVuZFwiLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NrRmlzaCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzU3dpdGNoVGFyZ2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuZmlzaEJnLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpc2hUeXBlID0gY2hpbGQuZ2V0Q29tcG9uZW50KFwiRmlzaFwiKS5maXNoVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQueCA8IC02NjcgfHwgY2hpbGQueCA+IDY2NyB8fCBjaGlsZC55IDwgLTM3NSB8fCBjaGlsZC55ID4gMzc1IHx8IGZpc2hUeXBlIDwgdGhpcy5iaWdGaXNoVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLmNvbnRhaW5zKGUuZ2V0TG9jYXRpb24oKSkgJiYgY2hpbGQgIT0gdGhpcy50YXJnZXRGaXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0RmlzaCA9IGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N3aXRjaFRhcmdldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi54K55Ye76ZSB5a6a6bG8XCIsIGNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzU3dpdGNoVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRvU2hvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9vdCwgMC4zLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMC4wMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnNob290KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMudG91Y2hMYXllci5vbihcInRvdWNoY2FuY2VsXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvY2tGaXNoKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0b1Nob3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9vdCwgMC4zLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMC4wMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zaG9vdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL+eUn+aIkOWtkOW8ueaxoFxyXG4gICAgICAgIHRoaXMuYnVsbGV0UG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldFBiKTtcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRQb29sLnB1dChwYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUn+aIkOe9keaxoFxyXG4gICAgICAgIHRoaXMubmV0UG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5ldFBiKTtcclxuICAgICAgICAgICAgdGhpcy5uZXRQb29sLnB1dChwYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0X2xlZnRfdmlldyh0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9vbUJldCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG93ZXJfbGlzdCA9IFsxLCAyLCAzLCA0LCA1XTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm9vbUJldCA9PSAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VyX2xpc3QgPSBbMSwgMiwgMywgNCwgNV07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb21CZXQgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG93ZXJfbGlzdCA9IFsxLCAyLCAzLCA0LCA1XTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm9vbUJldCA9PSAxMDAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG93ZXJfbGlzdCA9IFsxLCAyLCAzLCA0LCA1XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5za2lsbE1heFRpbWUgPSBbNSAqIDYwLCAxMDAwMDAgKiA2MF07XHJcbiAgICAgICAgdGhpcy5za2lsbFRpbWUgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5za2lsbENvc3QgPSBbMTAgKiB0aGlzLnJvb21CZXQsIDIwICogdGhpcy5yb29tQmV0XTtcclxuICAgICAgICB0aGlzLnNraWxsQ0QgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5za2lsbE1heENEID0gWzEwICogNjAsIDEwMDAwMCAqIDYwXTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvYi9zMS9zaHV6aScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bSh0aGlzLnNraWxsQ29zdFswXSk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2IvczIvc2h1emknKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5za2lsbENvc3RbMV0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydF8oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZpc2hOZXQudXNlckxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IHVzciA9IHRoaXMuZmlzaE5ldC51c2VyTGlzdFtpXTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJMaXN0W3Vzci5zZWF0SWRdID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdXNyLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgc2NvcmU6IHVzci5zY29yZSxcclxuICAgICAgICAgICAgICAgIGRpYW1vbmQ6IHVzci5kaWFtb25kLFxyXG4gICAgICAgICAgICAgICAgdWlkOiB1c3IudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgaGVhZDogdXNyLmhlYWRpbWd1cmwsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcGxheUJHTSgnYmdfMCcpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTZWF0U2hvdygpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTZWxmKCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY1RvZ2dsZS5pc0NoZWNrZWQgPSB0aGlzLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICB0aGlzLnNvdW5kVG9nZ2xlLmlzQ2hlY2tlZCA9IHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhOWHu1xyXG4gICAgICovXHJcbiAgICBzaG9vdCgpIHtcclxuICAgICAgICB0aGlzLmlzTG9ja0Zpc2hcclxuICAgICAgICAvLyBpZiAodGhpcy5pc0FpbWluZygpKVxyXG4gICAgICAgIGlmICh0aGlzLmlzTG9ja0Zpc2gpXHJcbiAgICAgICAgLy8gaWYodGhpcy5pc0xvY2tGaXNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZpc2hOb2RlID0gdGhpcy5nZXRCaWdGaXNoKCk7XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChmaXNoTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zID0gY2MudjIoNjY3LCAzNzUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucG9zID0gZmlzaE5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnggKz0gNjY3O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueSArPSAzNzU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maXNoTmV0LnNlYXRJZCA+IDEgJiYgdGhpcy5wb3MueSA+IDcwMCB8fCB0aGlzLmZpc2hOZXQuc2VhdElkIDw9IDEgJiYgdGhpcy5wb3MueSA8IDUwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggb3V0c2lkZXIhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJVaWQgPSB0aGlzLnBsYXllckxpc3RbdGhpcy5maXNoTmV0LnNlYXRJZF0udWlkO1xyXG4gICAgICAgIGlmIChwbGF5ZXJVaWQgPT0gdGhpcy5wSW5mby5wbGF5ZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcGxheUVmZmVjdCgnc2hvdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmZpc2hOZXQuZmlzaFNvY2tldCAmJiB0aGlzLmZpc2hOZXQuZmlzaFNvY2tldC5lbWl0KCdmaXNoU2hvb3QnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VyaWQ6IHBsYXllclVpZCxcclxuICAgICAgICAgICAgICAgIGJldDogdGhpcy5idWxsZXRQb3dlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvcyxcclxuICAgICAgICAgICAgICAgIGJ1bGxldElkOiB0aGlzLmdldE5leHRCdWxsZXRJRCgpLFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG9vdF9yKHVzZXJpZCwgcG9zLCBiZXQsIGJpZCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU0hPT1QgOlwiK3Bvcy54K1wiLVwiK3Bvcy55KTtcclxuICAgICAgICAvLyB2YXIgbm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvR2FtZU5vZGUvYXVyYWJnL2F1cmFcIik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJhdXJhIDpcIitub2RlLnBvc2l0aW9uLngrXCItXCIrbm9kZS5wb3NpdGlvbi55KTtcclxuXHJcbiAgICAgICAgdmFyIHNlYXRJZCA9IHRoaXMuZ2V0U2VhdEJ5VXNlcih1c2VyaWQpO1xyXG4gICAgICAgIGlmIChzZWF0SWQgPCAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dCdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5ub25MaXN0W3NlYXRJZF0uYmFuZyhwb3MsIGJldCwgYmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFNlYXRCeVVzZXIodXNlcmlkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBsYXllckxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyTGlzdFtpXSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyTGlzdFtpXS51aWQgPT0gdXNlcmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YW25a6D546p5a626L+b5YWl5oi/6Ze0XHJcbiAgICAgKiBAcGFyYW0ge+eUqOaIt2lkfSBVc2VySWQgXHJcbiAgICAgKiBAcGFyYW0ge+W6p+S9jWlkfSBzZWF0SWQgXHJcbiAgICAgKiBAcGFyYW0ge+eUqOaIt+WQjX0gbmlja25hbWUgXHJcbiAgICAgKiBAcGFyYW0ge+eUqOaIt+WIhuaVsH0gc2NvcmUgXHJcbiAgICAgKi9cclxuICAgIHNldFBsYXllckVudGVyKFVzZXJJZCwgc2VhdElkLCBuaWNrbmFtZSwgc2NvcmUsIGhlYWQsIGRpYW1vbmQpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheWVyTGlzdFtzZWF0SWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyTGlzdFtzZWF0SWRdID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICBzY29yZTogc2NvcmUsXHJcbiAgICAgICAgICAgICAgICBkaWFtb25kOiBkaWFtb25kLFxyXG4gICAgICAgICAgICAgICAgdWlkOiBVc2VySWQsXHJcbiAgICAgICAgICAgICAgICBoZWFkOiBoZWFkLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ3NpdF9kb3duJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTZWF0U2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+S9jee9ruW3suWNoC3kuI3og73ov5vlhaXluqfkvY0t6K+35qOA5p+lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFtuWug+eOqeWutuemu+W8gOaIv+mXtOaTjeS9nFxyXG4gICAgICogQHBhcmFtIHvluqfkvY1pZH0gc2VhdElkIFxyXG4gICAgICovXHJcbiAgICBzZXRQbGF5ZXJFeGl0KHNlYXRJZCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyTGlzdFtzZWF0SWRdID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoZWNrU2VhdFNob3coKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjqfliLbluqfkvY3nmoTmmL7pmpBcclxuICAgICAqL1xyXG4gICAgY2hlY2tTZWF0U2hvdygpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXRfbm9QbGF5ZXJfbm9kZVtpXS5hY3RpdmUgPSAhdGhpcy5wbGF5ZXJMaXN0W2ldO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXRfbm9kZVtpXS5hY3RpdmUgPSAhdGhpcy5zZWF0X25vUGxheWVyX25vZGVbaV0uYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tTZWxmKCkge1xyXG4gICAgICAgIHZhciBwaW5mbyA9IHJlcXVpcmUoJ1BsYXllckluZm8nKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wbGF5ZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckxpc3RbaV0gJiYgdGhpcy5wbGF5ZXJMaXN0W2ldLnVpZCA9PSBwaW5mby5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0X25vZGVbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3VwJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdF9ub2RlW2ldLmdldENoaWxkQnlOYW1lKCdkb3duJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdF9ub2RlW2ldLmdldENoaWxkQnlOYW1lKCd5b3VyX3Bvc2l0aW9uJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdF9ub2RlW2ldLmdldENoaWxkQnlOYW1lKCd5b3VyX3Bvc2l0aW9uJykucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSg1KSwgY2MuaGlkZSgpKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrZDlvLnmsaDkuK3nmoTlrZDlvLlcclxuICAgICAqL1xyXG4gICAgZ2V0QnVsbGV0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJ1bGxldFBvb2wuc2l6ZSgpIDw9IDApIHtcclxuICAgICAgICAgICAgbGV0IHBiID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQYik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0UG9vbC5wdXQocGIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5idWxsZXRQb29sLmdldCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlua4lOe9keaxoOS4reeahOa4lOe9kVxyXG4gICAgICovXHJcbiAgICBnZXROZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV0UG9vbC5zaXplKCkgPD0gMCkge1xyXG4gICAgICAgICAgICBsZXQgcGIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5ldFBiKTtcclxuICAgICAgICAgICAgdGhpcy5uZXRQb29sLnB1dChwYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm5ldFBvb2wuZ2V0KCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0TmV4dEJ1bGxldElEKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJ1bGxldElkID49IDFlNClcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRJZCA9IDA7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldElkKys7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1bGxldElkO1xyXG4gICAgfSxcclxuICAgIG9wZW5BbGVydCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21lc3NhZ2Vib3hiZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHN3aXRjaF9sZWZ0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxlZnRfc3RhdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdF9zdGF0ID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRfc3RhdCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0X2xlZnRfdmlldygpO1xyXG4gICAgfSxcclxuICAgIHNldF9sZWZ0X3ZpZXcoaW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgbGVmdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnVUknKS5nZXRDaGlsZEJ5TmFtZSgnbGVmdCcpO1xyXG4gICAgICAgIGxlZnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB2YXIgdCA9IDAuMjtcclxuICAgICAgICBpZiAoaW5zdGFuY2UpIHQgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmxlZnRfc3RhdCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9sZWZ0L+W3puS+p+WvvOiIquagjycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxlZnQucnVuQWN0aW9uKGNjLm1vdmVUbyh0LCBjYy52MigtNjY3LCAwKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxlZnQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbyh0LCBjYy52MigtNzkwLCAwKSksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9sZWZ0L+W3puS+p+WvvOiIquagjycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCB0aGlzKSkpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUZpc2goaW5mbykge1xyXG4gICAgICAgIC8ve1wiZmlzaElkXCI6WzIzMjQsMjMyNSwyMzI2XSxcclxuICAgICAgICAvL1wiZmlzaFR5cGVcIjoxMSxcImZpc2hQYXRoXCI6NyxcImZpc2hDb3VudFwiOjMsXHJcbiAgICAgICAgLy9cImZpc2hMaW5ldXBcIjoxLFwibGluZXVwXCI6ZmFsc2UsXCJwcm9wQ291bnRcIjowfVxyXG4gICAgICAgIGxldCB0eXBlID0gaW5mby5maXNoVHlwZTtcclxuICAgICAgICBsZXQgcGF0aHMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiRmlzaFBhdGhcIik7XHJcbiAgICAgICAgbGV0IHBhdGhBcnIgPSBwYXRocy5wYXRoX2xpc3RbaW5mby5maXNoUGF0aF07XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXRYID0gMDtcclxuICAgICAgICBsZXQgb2Zmc2V0WSA9IDA7XHJcbiAgICAgICAgbGV0IGxpc3RYID0gMTtcclxuICAgICAgICBsZXQgbGlzdFkgPSAxO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwi5Ye66bG8OiDpsbznsbvlnostXCIsIHR5cGUsIFwiIOmxvOeahOaOkuWIly1cIiwgaW5mby5maXNoTGluZXVwLCBcIiDpsbznmoTmlbDph48tXCIsIGluZm8uZmlzaENvdW50KTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChpbmZvLmZpc2hMaW5ldXApIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8v5bm25o6SXHJcbiAgICAgICAgICAgICAgICBsaXN0WCA9IDE7XHJcbiAgICAgICAgICAgICAgICBsaXN0WSA9IGluZm8uZmlzaENvdW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8v5q2j5pa55b2iIDTlj6pcclxuICAgICAgICAgICAgICAgIGxpc3RYID0gMjtcclxuICAgICAgICAgICAgICAgIGxpc3RZID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLzXmmJ8gNeWPqlxyXG4gICAgICAgICAgICAgICAgbGlzdFggPSAxO1xyXG4gICAgICAgICAgICAgICAgbGlzdFkgPSBpbmZvLmZpc2hDb3VudDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvL+mVv+aWueW9oiA25Y+qXHJcbiAgICAgICAgICAgICAgICBsaXN0WCA9IDI7XHJcbiAgICAgICAgICAgICAgICBsaXN0WSA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmZvLmZpc2hMaW5ldXAgPT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm8uZmlzaENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpc2hQYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlzaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmlzaFBiW3R5cGVdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2gucGFyZW50ID0gdGhpcy5maXNoQmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guekluZGV4ID0gaW5mby5maXNoVHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaFwiKS5wYXRoQXJyID0gcGF0aEFycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLnBhdGhJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaFwiKS5maXNoSW5mbyA9IGluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaFwiKS5maXNoSWQgPSBpbmZvLmZpc2hJZFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLmZpc2hUeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLm9mZnNldCA9IGNjLnYyKG9mZnNldFgsIG9mZnNldFkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXNoLnBvc2l0aW9uID0gY2MudjIocGF0aEFyclswXVswXSwgcGF0aEFyclswXVsxXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXNoLmdldENvbXBvbmVudCgnRmlzaCcpLmV4ZWN1dGVNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgaSAqIDgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mby5maXNoQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpc2hQYlt0eXBlXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WCA9IChNYXRoLmZsb29yKGkgLyBsaXN0WSkgLSAobGlzdFggLSAxKSAvIDIpICogZmlzaC53aWR0aDtcclxuICAgICAgICAgICAgICAgIG9mZnNldFkgPSAoaSAlIGxpc3RZIC0gKGxpc3RZIC0gMSkgLyAyKSAqIGZpc2guaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGZpc2gucGFyZW50ID0gdGhpcy5maXNoQmc7XHJcbiAgICAgICAgICAgICAgICBmaXNoLnpJbmRleCA9IGluZm8uZmlzaFR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLnBhdGhBcnIgPSBwYXRoQXJyO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLnBhdGhJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmaXNoLmdldENvbXBvbmVudChcIkZpc2hcIikuZmlzaEluZm8gPSBpbmZvO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLmZpc2hJZCA9IGluZm8uZmlzaElkW2ldO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLmZpc2hUeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KFwiRmlzaFwiKS5vZmZzZXQgPSBjYy52MihvZmZzZXRYLCBvZmZzZXRZKTtcclxuICAgICAgICAgICAgICAgIGZpc2gucG9zaXRpb24gPSBjYy52MihwYXRoQXJyWzBdWzBdICsgb2Zmc2V0WCwgcGF0aEFyclswXVsxXSArIG9mZnNldFkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KCdGaXNoJykuZXhlY3V0ZU1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpc2hCeUlkKGZpZCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgZmlzaE5vZGUgb2YgdGhpcy5maXNoQmcuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbGV0IGZpc2ggPSBmaXNoTm9kZS5nZXRDb21wb25lbnQoXCJGaXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoZmlzaC5maXNoSWQgPT0gZmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlzaE5vZGUueCA+PSAtNjY3ICYmIGZpc2hOb2RlLnggPD0gNjY3ICYmIGZpc2hOb2RlLnkgPj0gLTM3NSAmJiBmaXNoTm9kZS55IDw9IDM3NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXNoTm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tGaXNoSWQoZmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmlzVmFsaWQodGhpcy5nZXRGaXNoQnlJZChmaWQpKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25GaXNoSGl0KGluZm8pIHtcclxuICAgICAgICAvLyBmaXNoSWRcclxuICAgICAgICAvLyBoaXRTY29yZVxyXG4gICAgICAgIC8vIHByb3BDb3VudFxyXG4gICAgICAgIC8vIHByb3BJZFxyXG4gICAgICAgIC8vIHVzZXJJZFxyXG4gICAgICAgIGxldCB0YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIGxldCBmaXNoZXMgPSB0aGlzLmZpc2hCZy5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGZpc2hlcykge1xyXG4gICAgICAgICAgICBsZXQgZmlzaE5vZGUgPSBmaXNoZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBmaXNoID0gZmlzaE5vZGUuZ2V0Q29tcG9uZW50KFwiRmlzaFwiKTtcclxuICAgICAgICAgICAgaWYgKGZpc2guZmlzaElkID09IGluZm8uZmlzaElkKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBmaXNoTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIC8v5aaC5p6c6YCJ5Lit55qE6bG86KKr5omT5q2777yM5bCx5riF56m66YCJ5Lit5a655ZmoXHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSB0aGlzLnRhcmdldEZpc2gpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRGaXNoID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRTZWF0ID0gdGhpcy5nZXRTZWF0QnlVc2VyKGluZm8udXNlcklkKTtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLmZpc2hUeXBlID09IDI0IHx8XHJcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoXCJGaXNoXCIpLmZpc2hUeXBlID09IDI1KSB7XHJcbiAgICAgICAgICAgIC8vIGZpc2hJZCxmaXNoSWRMaXN0LHNlbmRJZFxyXG5cclxuICAgICAgICAgICAgbGV0IGZpc2ggPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgZmlzaGlkbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNobGlkIG9mIHRoaXMuZmlzaEJnLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBmaXNoID0gY2hsaWQuZ2V0Q29tcG9uZW50KFwiRmlzaFwiKTtcclxuICAgICAgICAgICAgICAgIGZpc2hpZGxpc3QucHVzaChmaXNoLmZpc2hJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlh7vkuK3psbzliJfooajvvJpcIiwgZmlzaGlkbGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlzaE5ldC5maXNoU29ja2V0LmVtaXQoJ2Jvb21GaXNoSGl0JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZmlzaElkOiBpbmZvLmZpc2hJZCxcclxuICAgICAgICAgICAgICAgIGZpc2hJZExpc3Q6IGZpc2hpZGxpc3QsXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc1NlbGYgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5wbGF5ZXJJZCA9PSBpbmZvLnVzZXJJZCkge1xyXG4gICAgICAgICAgICBpc1NlbGYgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5mby5wcm9wSWQgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmFkZERpYW1vbmRBbmltKHRhcmdldFNlYXQsIGluZm8ucHJvcFZhbHVlLCB0YXJnZXQucG9zaXRpb24sIGlzU2VsZik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb2luQW5pbWUodGFyZ2V0U2VhdCwgaW5mby5oaXRTb2NyZSAqIHRoaXMucm9vbUJldCwgdGFyZ2V0LnBvc2l0aW9uLCB0YXJnZXQuZ2V0Q29tcG9uZW50KFwiRmlzaFwiKS5maXNoSW5mbywgaXNTZWxmLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGFyZ2V0LmRlc3Ryb3koKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Cb29tRmlzaEhpdChpbmZvKSB7XHJcbiAgICAgICAgLy8gaW5mbzp7dXNlcklkOl91c2VySWQsaGl0U29jcmU6c2NvcmUsZmlzaExpc3Q6b3V0ZmlzaExpc3R9fVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Ye75Lit54K45by55LqL5Lu277yaXCIsIGluZm8pO1xyXG4gICAgICAgIGxldCBmaXNoTm9kZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGlzU2VsZiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0YXJnZXRTZWF0ID0gdGhpcy5nZXRTZWF0QnlVc2VyKGluZm8udXNlcklkKTtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5wbGF5ZXJJZCA9PSBpbmZvLnVzZXJJZCkge1xyXG4gICAgICAgICAgICBpc1NlbGYgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBpbmZvLmZpc2hMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBmaXNoSWQgPSBpbmZvLmZpc2hMaXN0W2tleV07XHJcbiAgICAgICAgICAgIGZpc2hOb2RlID0gdGhpcy5nZXRGaXNoQnlJZChmaXNoSWQpO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChmaXNoTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29pbkFuaW1lKHRhcmdldFNlYXQsIGluZm8uaGl0U29jcmUgKiB0aGlzLnJvb21CZXQsIGZpc2hOb2RlLnBvc2l0aW9uLCBmaXNoTm9kZS5nZXRDb21wb25lbnQoXCJGaXNoXCIpLmZpc2hUeXBlLCBpc1NlbGYsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvaW5BbmltZSh0YXJnZXRTZWF0LCBpbmZvLmhpdFNvY3JlICogdGhpcy5yb29tQmV0LCBmaXNoTm9kZS5wb3NpdGlvbiwgZmlzaE5vZGUuZ2V0Q29tcG9uZW50KFwiRmlzaFwiKS5maXNoVHlwZSwgaXNTZWxmLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaXNoTm9kZS5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZmlzaE5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhZGRDb2luQW5pbWUodGFyZ2V0U2VhdCwgc2NvcmUsIHBvc2l0aW9uLCBmaXNoVHlwZSwgaXNTZWxmLCBpc0FkZFNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5jYW5ub25MaXN0W3RhcmdldFNlYXRdLmNoZWNrX3BhbihmaXNoVHlwZSwgc2NvcmUpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2NvcmUrKyBcIitzY29yZSk7XHJcbiAgICAgICAgdmFyIGNvaW5iZyA9IGNjLmZpbmQoJ0NhbnZhcy9HYW1lTm9kZS9jb2luYmcnKTtcclxuXHJcbiAgICAgICAgdmFyIGNvaW5wYiA9IG51bGw7XHJcbiAgICAgICAgdmFyIGNvaW5udW0gPSAwO1xyXG4gICAgICAgIGlmIChzY29yZSA+PSAxMDApIHtcclxuICAgICAgICAgICAgY29pbnBiID0gdGhpcy5jb2luUGJbMF07XHJcbiAgICAgICAgICAgIGNvaW5udW0gPSBwYXJzZUludChzY29yZSAvIDEwMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzY29yZSA+PSAxMCkge1xyXG4gICAgICAgICAgICBjb2lucGIgPSB0aGlzLmNvaW5QYlsxXTtcclxuICAgICAgICAgICAgY29pbm51bSA9IHBhcnNlSW50KHNjb3JlIC8gMTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvaW5wYiA9IHRoaXMuY29pblBiWzJdO1xyXG4gICAgICAgICAgICBjb2lubnVtID0gTWF0aC5jZWlsKHNjb3JlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvaW5udW0gPiA2KSBjb2lubnVtID0gNjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvaW5udW07IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29pbiA9IGNjLmluc3RhbnRpYXRlKGNvaW5wYik7XHJcbiAgICAgICAgICAgIGNvaW4ucGFyZW50ID0gY29pbmJnO1xyXG4gICAgICAgICAgICBjb2luLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBjb2luLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC4zICogKGkgKyAxKSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC40LCAwLCA2NSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LCB0aGlzLmNhbm5vbkxpc3RbdGFyZ2V0U2VhdF0ubm9kZS5wb3NpdGlvbiksXHJcbiAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKCkpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNTZWxmKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDE5KTtcclxuICAgICAgICAgICAgcGxheUVmZmVjdCgnZGllXycgKyBzKTtcclxuICAgICAgICAgICAgcGxheUVmZmVjdCgnY29sbGVjdF8yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxhYmVsX3BiKTtcclxuICAgICAgICAgICAgbGFiZWwub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGxhYmVsLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIGxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBIZWxwZXIuZml4TnVtKHNjb3JlKTtcclxuICAgICAgICAgICAgbGFiZWwucGFyZW50ID0gY29pbmJnO1xyXG4gICAgICAgICAgICBsYWJlbC56SW5kZXggPSAyMDA7XHJcbiAgICAgICAgICAgIHZhciB0MSA9IDAuNDtcclxuICAgICAgICAgICAgdmFyIHMxID0gODA7XHJcbiAgICAgICAgICAgIHZhciB0MiA9IDAuNlxyXG4gICAgICAgICAgICBsYWJlbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihjYy5mYWRlSW4odDEpLCBjYy5tb3ZlQnkodDEsIGNjLnYyKDAsIHQxICogczEpKSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkodDIsIGNjLnYyKDAsIHQyICogczEpKSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKGNjLmZhZGVPdXQodDEpLCBjYy5tb3ZlQnkodDEsIGNjLnYyKDAsIHQxICogczEpKSksXHJcbiAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liIbmlbDlop7liqBcclxuICAgICAgICBpZiAoaXNBZGRTY29yZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjMgKiAoY29pbm51bSArIDEpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbm5vbkxpc3RbdGFyZ2V0U2VhdF0uYWRkc2NvcmUoc2NvcmUpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcykpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v5aKe5Yqg6ZK755+zXHJcbiAgICBhZGREaWFtb25kQW5pbSh0YXJnZXRTZWF0LCBkaWEsIHBvc2l0aW9uLCBpc1NlbGYpIHtcclxuICAgICAgICB2YXIgY29pbmJnID0gY2MuZmluZCgnQ2FudmFzL0dhbWVOb2RlL2NvaW5iZycpO1xyXG5cclxuICAgICAgICB2YXIgZGlhcGIgPSB0aGlzLmRpYW1vbmRQYjtcclxuICAgICAgICB2YXIgZGlhbnVtID0gZGlhO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpYW51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb2luID0gY2MuaW5zdGFudGlhdGUoZGlhcGIpO1xyXG4gICAgICAgICAgICBjb2luLnBhcmVudCA9IGNvaW5iZztcclxuICAgICAgICAgICAgY29pbi5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgY29pbi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuMSAqIChpICsgMSkpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuNCwgMCwgNjUpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwgdGhpcy5jYW5ub25MaXN0W3RhcmdldFNlYXRdLm5vZGUucG9zaXRpb24pLFxyXG4gICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzU2VsZikge1xyXG4gICAgICAgICAgICB2YXIgcyA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxOSk7XHJcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2RpZV8nICsgcyk7XHJcbiAgICAgICAgICAgIHBsYXlFZmZlY3QoJ2NvbGxlY3RfMicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5sYWJlbF9wYjIpO1xyXG4gICAgICAgICAgICBsYWJlbC5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgbGFiZWwucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIiArIGRpYTtcclxuICAgICAgICAgICAgbGFiZWwucGFyZW50ID0gY29pbmJnO1xyXG4gICAgICAgICAgICBsYWJlbC56SW5kZXggPSAyMDA7XHJcbiAgICAgICAgICAgIHZhciB0MSA9IDAuNDtcclxuICAgICAgICAgICAgdmFyIHMxID0gODA7XHJcbiAgICAgICAgICAgIHZhciB0MiA9IDAuNlxyXG4gICAgICAgICAgICBsYWJlbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihjYy5mYWRlSW4odDEpLCBjYy5tb3ZlQnkodDEsIGNjLnYyKDAsIHQxICogczEpKSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkodDIsIGNjLnYyKDAsIHQyICogczEpKSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKGNjLmZhZGVPdXQodDEpLCBjYy5tb3ZlQnkodDEsIGNjLnYyKDAsIHQxICogczEpKSksXHJcbiAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/pkrvnn7Plop7liqBcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjEgKiAoZGlhbnVtICsgMSkpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbm5vbkxpc3RbdGFyZ2V0U2VhdF0uYWRkRGlhbW9uZChkaWEpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKSkpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnVsbGV0X2NoYW5nZShudW0pIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBvd2VyX2xpc3QuaW5kZXhPZih0aGlzLmJ1bGxldFBvd2VyKTtcclxuICAgICAgICBpbmRleCArPSBudW07XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnBvd2VyX2xpc3QubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5idWxsZXRQb3dlciA9IHRoaXMucG93ZXJfbGlzdFtpbmRleF07XHJcblxyXG4gICAgICAgIHRoaXMuZmlzaE5ldC5maXNoU29ja2V0LmVtaXQoJ2NoYW5nZVBvd2VyJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1c2VyaWQ6IHRoaXMucEluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgIGJldDogdGhpcy5idWxsZXRQb3dlcixcclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBjaGFuZ2VQb3dlcihpbmZvKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBsYXllckxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyTGlzdCAmJiB0aGlzLnBsYXllckxpc3RbaV0udWlkID09IGluZm8udXNlcmlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbm5vbkxpc3RbaV0uYmV0TGJsLnN0cmluZyA9IEhlbHBlci5maXhOdW0oaW5mby5iZXQgKiB0aGlzLnJvb21CZXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNhc3Rfc2tpbGwoc2lkKSB7XHJcbiAgICAgICAgaWYgKHNpZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraWxsQ0RbMF0gPiAwIHx8IHRoaXMucEluZm8ucGxheWVyQ29pbiA8IHRoaXMuc2tpbGxDb3N0WzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGluZm8gPSB7IHVpZDogdGhpcy5wSW5mby5wbGF5ZXJJZCwgc2lkOiBzaWQgfTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5jYXN0X3NraWxsX3IoaW5mbyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmlzaE5ldC5maXNoU29ja2V0LmVtaXQoJ3VzZVNLaWxsJywgSlNPTi5zdHJpbmdpZnkoaW5mbykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDplIHlrprlvIDlhbNcclxuICAgICAgICBpZiAoc2lkID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0xvY2tGaXNoID0gIXRoaXMuaXNMb2NrRmlzaDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NrRmlzaCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCaWdGaXNoSWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X2xvY2tGaXNoLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9sb2NrRmlzaC5zdHJpbmcgPSBcIuino+mZpOmUgeWumlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RfbG9ja0Zpc2guYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9sb2NrRmlzaC5zdHJpbmcgPSBcIumUgeWumlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2FzdF9za2lsbF9yKGluZm8pIHtcclxuICAgICAgICB2YXIgc2VhdElkID0gdGhpcy5nZXRTZWF0QnlVc2VyKGluZm8udWlkKTtcclxuICAgICAgICBpZiAoc2VhdElkIDwgMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoaW5mby5zaWQgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsVGltZVswXSA9IHRoaXMuc2tpbGxNYXhUaW1lWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsQ0RbMF0gPSB0aGlzLnNraWxsTWF4Q0RbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0X2Zyb3plbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZmlzaEJnLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlzaCA9IHRoaXMuZmlzaEJnLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5wYXVzZUFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKGluZm8udWlkID09IHRoaXMucEluZm8ucGxheWVySWQpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBlbHNlIGlmIChpbmZvLnNpZCA9PSAyKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNraWxsQ0RbMV0gID0gdGhpcy5za2lsbE1heENEWzFdO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5za2lsbFRpbWVbMV0gPSB0aGlzLnNraWxsTWF4VGltZVsxXTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9vdCwgMC4yLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMC4wMSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGlmIChpbmZvLnNpZCA9PSAyKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYW5ub25MaXN0W3NlYXRJZF0uYXV0b1RpbWUgPSB0aGlzLnNraWxsTWF4VGltZVsxXTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGlzQWltaW5nKCl7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuc2tpbGxUaW1lWzFdPjA7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5za2lsbFRpbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpbGxUaW1lW2ldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbFRpbWVbaV0tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5za2lsbENEW2ldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbENEW2ldLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBub2RlO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gY2MuZmluZCgnQ2FudmFzL1VJL2IvczEvY2QnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5maW5kKCdDYW52YXMvVUkvYi9zMi9jZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSB0aGlzLnNraWxsQ0RbaV0gLyB0aGlzLnNraWxsTWF4Q0RbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lsbFRpbWVbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZmlzaEJnLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlzaCA9IHRoaXMuZmlzaEJnLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5yZXN1bWVBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RfZnJvemVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAodGhpcy5za2lsbFRpbWVbMV0gPT0gMSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLmlzQXV0b1Nob3QpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9vdCwgMC4zLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMC4wMSk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuc2hvb3QpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyB2YXIgYXVyYSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIGZvciAodmFyIGkgaW4gdGhpcy5jYW5ub25MaXN0KVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMuY2Fubm9uTGlzdFtpXS5hdXRvVGltZSAmJiB0aGlzLmNhbm5vbkxpc3RbaV0uYXV0b1RpbWU+MCl7XHJcbiAgICAgICAgLy8gICAgICAgICBhdXJhID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5maW5kKFwiQ2FudmFzL0dhbWVOb2RlL2F1cmFiZy9hdXJhXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG9ja0Zpc2gpIHtcclxuICAgICAgICAgICAgdmFyIGZpc2ggPSB0aGlzLmdldEJpZ0Zpc2goKTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZmlzaCkpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBmaXNoLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IGZpc2guaGVpZ2h0ICogMC43NSAvIDI0OTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEJpZ0Zpc2hJZCgpIHtcclxuICAgICAgICBsZXQgZmlzaE5vZGUgPSB0aGlzLmdldEJpZ0Zpc2goKTtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQoZmlzaE5vZGUpKSByZXR1cm4gLTE7XHJcbiAgICAgICAgcmV0dXJuIGZpc2hOb2RlLmdldENvbXBvbmVudChcIkZpc2hcIikuZmlzaElkO1xyXG4gICAgfSxcclxuICAgIGdldEJpZ0Zpc2goKSB7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy50YXJnZXRGaXNoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXRGaXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYmlnZmlzaE5vZGUgPSBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5maXNoQmcuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGZpc2hOb2RlID0gdGhpcy5maXNoQmcuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIHZhciBmaXNoID0gZmlzaE5vZGUuZ2V0Q29tcG9uZW50KFwiRmlzaFwiKTtcclxuICAgICAgICAgICAgaWYgKGZpc2hOb2RlLnggPCAtNjY3IHx8IGZpc2hOb2RlLnggPiA2NjcgfHwgZmlzaE5vZGUueSA8IC0zNzUgfHwgZmlzaE5vZGUueSA+IDM3NSB8fCBmaXNoLmZpc2hUeXBlIDwgdGhpcy5iaWdGaXNoVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJpZ2Zpc2hOb2RlID09IG51bGwgfHwgZmlzaC5maXNoVHlwZSA+IGJpZ2Zpc2hOb2RlLmdldENvbXBvbmVudChcIkZpc2hcIikuZmlzaFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGJpZ2Zpc2hOb2RlID0gZmlzaE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJpZ2Zpc2hOb2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRBdXRvU2hvdChpc0F1dG8pIHtcclxuICAgICAgICB0aGlzLmlzQXV0b1Nob3QgPSBpc0F1dG87XHJcbiAgICAgICAgLy9pZiAodGhpcy5za2lsbFRpbWVbMV0+MCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChpc0F1dG8pIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob290LCAwLjMsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLCAwLjAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zaG9vdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRNdXNpYygpIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5wSW5mby5tdXNpY0NvbnRyb2wgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm11c2ljVG9nZ2xlLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wSW5mby5tdXNpY0NvbnRyb2wgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm11c2ljVG9nZ2xlLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHBsYXlCR00oJ2JnXzAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53cml0ZVVzZXJTZXR0aW5nRGF0ZV9GdW5jdGlvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRTb3VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kVG9nZ2xlLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZFRvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndyaXRlVXNlclNldHRpbmdEYXRlX0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIborr7nva7mlbDmja7lhpnlhaXnvJPlrZjmlbDmja5cclxuICAgICAqL1xyXG4gICAgd3JpdGVVc2VyU2V0dGluZ0RhdGVfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgbXVzaWNDb250cm9sOiB0aGlzLnBJbmZvLm11c2ljQ29udHJvbCxcclxuICAgICAgICAgICAgc291bmRFZmZlY3RDb250cm9sOiB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wSW5mby53cml0ZURhdGFfRnVuY3Rpb24oXCJ1c2VyU2V0dGluZ1wiLCBkYXRhKTtcclxuICAgIH0sXHJcbn0pOyJdfQ==