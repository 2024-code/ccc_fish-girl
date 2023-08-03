cc.Class({
    extends: cc.Component,
    properties: {
        _seats: [],
        _timeLabel: null,
        _lastPlayingSeat: null,
        _playingSeat: null,
        _lastPlayTime: null,
        _shareContent: null,
        paigroup: {
            default: null,
            type: cc.SpriteAtlas
        },
        back: cc.Node,
        jinbi: cc.Node,
        countdown: cc.Label,
        win: cc.Node,
        lose: cc.Node,
        _pai: null,
        _pais: [],
        _text: null,
        _zongzhu: null,
        _btnFirst: null,
        _btnSecond: null,
        _btnThird: null,
        _Checkbox: [],
        _secondLeft: [],
        _secondOther: [],
        _thirdLeft: [],
        _thirdOther: [],
        _thirdAllIn: null,
        _thirdJiazhu: null,
        _jiaZhu: null,
        _jiaZhu_cover: null,
        _timeout: null,
        timerCounter: 0,
        exitBtn: cc.Node,
        com_help: cc.Node,
        com_paixing: cc.Node,
        bgAudio: {
            default: null,
            type: cc.AudioClip,
        }
    },
    start: function () {
        cc.log('进入德州扑克================================================')
        this.playerInfo = require("PlayerInfo").getInstant;
        this.playerInfo.setGameObj_Function(this);
        this.netWork = require("HoldemNetWork").getInstant;
        this.netWork.setHoldemObj_Function(this);
        this.gameInit_Function();
        cc.audioEngine.playMusic(this.bgAudio);
    },

    gameInit_Function: function () {

        for (var i = 0; i < 5; i++) {
            this._seats.push(cc.find("Canvas/seat" + i).getComponent("HoldemSeat"));
        }
        this._timeLabel = cc.find("Canvas/time").getComponent(cc.Label);
        this._tips = cc.find("Canvas/tips").getComponent(cc.Label);
        this._difen = cc.find("Canvas/difen").getComponent(cc.Label);
        this._zongzhu = cc.find("Canvas/zongxiazhu/label").getComponent(cc.Label);
        this._text = cc.find("Canvas/text0").getComponent(cc.Label);
        this._text.string = "白手起家(6人)：" + Helper.fixNum(this.netWork.consume_num) + "/" + Helper.fixNum(2 * this.netWork.consume_num) + " 扑克牌：5-A 限注(1倍底池)"
        this._pai = cc.find("Canvas/pai");
        for (var i = 0; i < this._pai.childrenCount; i++) {
            this._pais[i] = this._pai.getChildByName("pai" + i);
        };
        this._pai.active = false;
        this._difen.node.active = true;
        this._btnFirst = cc.find("Canvas/buttons/first");
        this._btnSecond = cc.find("Canvas/buttons/second");
        this._btnThird = cc.find("Canvas/buttons/third");
        this._btnThird.active = false;
        this._btnSecond.active = false;
        this._btnFirst.active = false;
        for (var i = 0; i < this._btnFirst.childrenCount; i++) {
            this._Checkbox[i] = this._btnFirst.children[i];
            this._Checkbox[i].getChildByName('button').index = i;
            this.addClickEvent(this._Checkbox[i].getChildByName('button'), this.node, "HoldemMain", "onBtnClicked");
        };
        for (var i = 0; i < 3; i++) {
            this._secondLeft[i] = this._btnSecond.getChildByName('dichi' + i);
            this._secondLeft[i].index = i;
            this.addClickEvent(this._secondLeft[i], this.node, "HoldemMain", "onBtnClicked");
        };
        for (var i = 0; i < 3; i++) {
            this._secondOther[i] = this._btnSecond.getChildByName('dichi_cover' + i);
            this._secondOther[i].index = i;
        };
        for (var i = 0; i < 5; i++) {
            this._thirdLeft[i] = this._btnThird.getChildByName('tnum' + i);
            this._thirdLeft[i].index = i;
            this.addClickEvent(this._thirdLeft[i], this.node, "HoldemMain", "onBtnClicked");
        };
        for (var i = 0; i < 5; i++) {
            this._thirdOther[i] = this._btnThird.getChildByName('tnum_cover' + i);
            this._thirdOther[i].index = i;
        };
        this._thirdJiazhu = this._btnThird.getChildByName('tjiazhu');
        this.addClickEvent(this._thirdJiazhu, this.node, "HoldemMain", "onBtnClicked");
        this._thirdAllIn = this._btnThird.getChildByName('select').getChildByName('quanxia');
        this.addClickEvent(this._thirdAllIn, this.node, "HoldemMain", "onBtnClicked");
        this._genPai = this._btnSecond.getChildByName('genpai');
        this._rangPai = this._btnSecond.getChildByName('rangpai');
        this._qiPai = this._btnSecond.getChildByName('qipai');
        this._jiaZhu = this._btnSecond.getChildByName('jiazhu');
        this._jiaZhu_cover = this._btnSecond.getChildByName('jiazhu_cover');


        this.addClickEvent(this.back, this.node, "HoldemMain", "onBtnClicked");
        this.addClickEvent(this._genPai, this.node, "HoldemMain", "onBtnClicked");
        this.addClickEvent(this._rangPai, this.node, "HoldemMain", "onBtnClicked");
        this.addClickEvent(this._qiPai, this.node, "HoldemMain", "onBtnClicked");
        this.addClickEvent(this._jiaZhu, this.node, "HoldemMain", "onBtnClicked");


        this.initView();
        this.initSeats();
        console.log('fist————————：' + JSON.stringify(this.netWork.seats));

        //reconnectP = 2重连 1不是
        if (this.netWork.reconnectP == 2) {
            this.netWork.holdemSocket.emit("getGameInfoByUserid");
            this.netWork.holdemSocket.emit("game_userInfoById_push");
        }
        this.netWork.holdemSocket.emit("ready");
        this.netWork.holdemSocket.emit("getUserHolds");

    },
    initView: function () {
        this._tips.node.active = true;
        this._zongzhu.string = Helper.fixNum(0);
        this._difen.string = Helper.fixNum(0);
        this._difen.money = 0;
    },
    restart: function () {
        if (this._zongzhu) this._zongzhu.string = Helper.fixNum(0);
        if (this._difen) {
            this._difen.string = Helper.fixNum(0);
            this._difen.money = 0;
        }
        this.win.active = false;
        this.lose.active = false;
        this._pai.active = false;
        this._tips.node.active = true;
        var seats = this.netWork.seats;
        if (seats) {
            for (var i = 0; i < seats.length; ++i) {
                var index = this.netWork.getLocalIndexByUserId(seats[i].userid);
                this._seats[index].restart();
                this._seats[index].status = "";
            }
        }
        this.netWork.holdemSocket.emit("ready");
    },
    initSeats: function () {
        var seats = this.netWork.seats;
        for (var i = 0; i < seats.length; ++i) {
            // console.log('返回座位信息============' + JSON.stringify(seats[i]));
            this.initSingleSeat(seats[i]);
        }
    },
    initSingleSeat: function (seat) {
        var index = this.netWork.getLocalIndexByUserId(seat.userid);
        this._seats[index].setInfo(seat.name, seat.score, seat.headimgurl);
        this._seats[index].setReady(seat.ready);
        this._seats[index].setID(seat.userid);
    },
    onBtnSettingsClicked: function () {
        //cc.vv.popupMgr.showSettings();
    },
    onBtnClicked: function (event) {
        if (event.target.name == "button") {
            for (var i = 0; i < this._Checkbox.length; i++) {
                if (event.target.index == i) {
                    continue;
                } else {
                    this._Checkbox[i].getComponent("CheckBox").checked = false;
                    this._Checkbox[i].getComponent("CheckBox").refresh();
                }
            };
        }

        if (event.target.name == "back") {
            this.netWork.holdemSocket.emit("LogoutRoom");
        }

        if (event.target.name == "rangpai") {
            this.netWork.holdemSocket.emit("rangpai");
        }
        if (event.target.name == "qipai") {
            this.netWork.holdemSocket.emit("qipai");
        }
        if (event.target.name == "genpai") {
            this.netWork.holdemSocket.emit("genpai", event.target.money);
        }
        if (event.target.name == "jiazhu") {
            this._btnThird.active = true;
            this._btnSecond.active = false;
        }
        if (event.target.name.indexOf('dichi') > -1) {
            this.netWork.holdemSocket.emit("jiazhu", event.target.money);
        }
        if (event.target.name.indexOf('tnum') > -1) {
            this.netWork.holdemSocket.emit("jiazhu", event.target.money);
        }
        if (event.target.name.indexOf('tjiazhu') > -1) {
            console.log("money = :" + event.target.money);
            this.netWork.holdemSocket.emit("jiazhu", event.target.money);
        }
        if (event.target.name.indexOf('quanxia') > -1) {
            this.netWork.holdemSocket.emit("jiazhu", event.target.money);
        }
    },
    //转换对应的牌
    ConversionCardRes: function (n) {
        var type = 4;
        var color = 1;
        if (n >= 13 && n < 26) {
            type = 3;
            n = n - 13;
            color = 2;
        } else if (n >= 26 && n < 39) {
            type = 2;
            n = n - 26;
        } else if (n >= 39 && n < 52) {
            type = 1;
            n = n - 39;
            color = 2;
        } else {
            type = 4;
        }
        var num = 0;
        num = n + 2;
        if (num == 14) {
            num = 1;
        }
        var data = {
            num: this.paigroup.getSpriteFrame(num + "-" + color),
            h_s: this.paigroup.getSpriteFrame("huase_small0" + type),
            h_b: this.paigroup.getSpriteFrame("huase_big0" + type),
        };
        return data;
    },
    showOtherSeat: function (type) {
        var seats = this.netWork.seats;
        for (var i = 0; i < seats.length; i++) {
            var index = this.netWork.getLocalIndexByUserId(seats[i].userid);
            if (type == 1) {
                this._seats[index].showBeiPai(true); //显示牌的背面
            }
            if (type == 2) {
                this._seats[index].showOps(); //隐藏其他桌子的操作icon
                this._seats[index].hideScore();
            }
        };
    },
    setBtnOps: function (type, obj) {
        if (type == 1) {
            this._btnFirst.active = false;
            this._btnThird.active = false;
            this._btnSecond.active = true;
            this._btnThird.getChildByName("select").getChildByName("slider").getChildByName("Handle").y = -172;
        }
        if (type == 2) {
            this._btnSecond.active = false;
            this._btnFirst.active = true;
            this._btnThird.active = false;
            this._Checkbox[1].active = true;
            this._Checkbox[2].active = false;
            this._Checkbox[3].active = true;
            this._Checkbox[4].active = false;
        }
        if (type == 3) {
            this._btnThird.active = true;
            this._btnSecond.active = false;
            this._btnFirst.active = false;
        }
        if (type == 4) {
            this._btnThird.active = false;
            this._btnSecond.active = false;
            this._btnFirst.active = false;
        }
        if (type == 5) {
            for (var i = 0; i < this._thirdLeft.length; i++) {
                this._thirdLeft[i].getChildByName('num').getComponent(cc.Label).string = Helper.fixNum(obj[i]);
                this._thirdLeft[i].money = obj[i];
                this._thirdOther[i].getChildByName('num').getComponent(cc.Label).string = Helper.fixNum(obj[i]);
            }
        }
        if (obj && type != 5) {
            if (obj.canGen) {
                this._genPai.active = true;
                this._rangPai.active = false;
                this._genPai.money = obj.GenMoney;
                this._genPai.getChildByName('num').getComponent(cc.Label).string = "跟" + Helper.fixNum(obj.GenMoney);
                if (obj.needAllIn) {
                    this._genPai.getChildByName('num').getComponent(cc.Label).string = "全下";
                    this._jiaZhu.active = false;
                    this._jiaZhu_cover.active = true;
                } else {
                    this._jiaZhu.active = true;
                    this._jiaZhu_cover.active = false;
                }
            } else {
                this._genPai.active = false;
                this._rangPai.active = true;
                this._jiaZhu_cover.active = false;
            }
            for (var i = 0; i < 3; i++) {
                this._secondLeft[i].getChildByName('title').getComponent(cc.Label).string = obj.extraAddOps[i].desc;
                this._secondLeft[i].money = obj.extraAddOps[i].money;
                this._secondOther[i].getChildByName('title').getComponent(cc.Label).string = obj.extraAddOps[i].desc;
                if (obj.addMaxMoney >= obj.extraAddOps[i].money) {
                    this._secondLeft[i].active = true;
                    this._secondOther[i].active = false;
                } else {
                    this._secondLeft[i].active = false;
                    this._secondOther[i].active = true;
                }
                if (obj.needAllIn && this._genPai.money < obj.extraAddOps[i].money) {
                    this._secondLeft[i].active = false;
                    this._secondOther[i].active = true;
                }
            }
            for (var i = 0; i < 5; i++) {
                if (obj.addMaxMoney >= this._thirdLeft[i].money && obj.addMinMoney <= this._thirdLeft[i].money) {
                    this._thirdLeft[i].active = true;
                    this._thirdOther[i].active = false;
                } else {
                    this._thirdLeft[i].active = false;
                    this._thirdOther[i].active = true;
                }
            };
        }
    },
    refreshFirstBtn: function (data) {
        if (parseInt(data.argStatus) == 1) {
            this._Checkbox[1].active = false;
            this._Checkbox[2].getChildByName("text").getComponent(cc.Label).string = "跟" + Helper.fixNum(data.genMoney);
            this._Checkbox[1].getComponent("CheckBox").checked = false;
            this._Checkbox[1].getComponent("CheckBox").refresh();
            this._Checkbox[2].active = true;
        } else if (parseInt(data.argStatus) == 2) {
            this._Checkbox[1].active = false;
            this._Checkbox[2].active = true;
            this._Checkbox[2].getChildByName("text").getComponent(cc.Label).string = "全下";
            this._Checkbox[3].active = false;
            this._Checkbox[4].active = true;
            this._Checkbox[1].getComponent("CheckBox").checked = false;
            this._Checkbox[1].getComponent("CheckBox").refresh();
            this._Checkbox[3].getComponent("CheckBox").checked = false;
            this._Checkbox[3].getComponent("CheckBox").refresh();
        } else {
            this._Checkbox[1].active = true;
            this._Checkbox[2].active = false;
            this._Checkbox[3].active = true;
            this._Checkbox[4].active = false;
        }
        this._Checkbox[2].money = data.genMoney;
        this._Checkbox[2].getComponent("CheckBox").checked = false;
        this._Checkbox[2].getComponent("CheckBox").refresh();
    },
    prepOps: function (data) {
        for (var i = 0; i < this._btnFirst.childrenCount; i++) {
            if (this._Checkbox[i].getComponent("CheckBox").checked) {
                if (i == 0 && data.canGuo) {
                    this.netWork.holdemSocket.emit("rangpai");
                } else if (i == 0 && !data.canGuo) {
                    this.netWork.holdemSocket.emit("qipai");
                }
                if (i == 1 && data.canGuo) {
                    this.netWork.holdemSocket.emit("rangpai");
                }
                if (i == 2 && data.canGen) {
                    this.netWork.holdemSocket.emit("genpai");
                }
                if (i == 3 && data.canGen) {
                    this.netWork.holdemSocket.emit("genpai", this._Checkbox[2].money);
                }
                this._Checkbox[i].getComponent("CheckBox").checked = false;
                this._Checkbox[i].getComponent("CheckBox").refresh();
            }
        }
    },
    unchecked: function () {
        for (var i = 0; i < this._btnFirst.childrenCount; i++) {
            this._Checkbox[i].getComponent("CheckBox").checked = false;
            this._Checkbox[i].getComponent("CheckBox").refresh();
        }
    },
    onSliderBack: function (event) {
        this._thirdAllIn.active = false;
        var num = 0;
        if (event.progress >= 0.1 && event.progress < 0.2) {
            num = 100;
        } else if (event.progress >= 0.2 && event.progress < 0.3) {
            num = 200;
        } else if (event.progress >= 0.3 && event.progress < 0.4) {
            num = 300;
        } else if (event.progress >= 0.4 && event.progress < 0.5) {
            num = 400;
        } else if (event.progress >= 0.5 && event.progress < 0.6) {
            num = 500;
        } else if (event.progress >= 0.6 && event.progress < 0.7) {
            num = 600;
        } else if (event.progress >= 0.7 && event.progress < 0.8) {
            num = 700;
        } else if (event.progress >= 0.8 && event.progress < 0.9) {
            num = 800;
        } else if (event.progress >= 0.9 && event.progress < 1) {
            num = 900;
        } else if (event.progress == 1) {
            if (this._seats[0]._score == this._thirdJiazhu.maxMoney) {
                this._thirdAllIn.active = true;
                this._thirdAllIn.money = this._thirdJiazhu.maxMoney;
            }
            num = 1000;
        }
        if ((this._thirdJiazhu.firstMoney + num) >= this._thirdJiazhu.maxMoney) {
            this._thirdJiazhu.money = this._thirdJiazhu.maxMoney;
            console.log("third1 " + this._thirdJiazhu.money);
        } else {
            this._thirdJiazhu.money = this._thirdJiazhu.firstMoney + num;
            console.log("third2 " + this._thirdJiazhu.money);
        }
        this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(this._thirdJiazhu.money);
    },
    //断线重连刷新信息
    ReconnectionInfo: function (data) {
        console.log('断线重连刷新信息:' + JSON.stringify(data));

        if (data.addOptions.length == 5) this.setBtnOps(5, data.addOptions);
        this._difen.string = Helper.fixNum(data.diChi);
        this._difen.money = data.diChi;
        this._tips.node.active = false;
        if (data.circleHolds.length > 0) {
            for (var i = 0; i < data.circleHolds.length; i++) {
                var paiRes = this.ConversionCardRes(parseInt(data.circleHolds[i]));
                this._pais[i].getChildByName('num').getComponent(cc.Sprite).spriteFrame = paiRes['num'];
                this._pais[i].getChildByName('hua1').getComponent(cc.Sprite).spriteFrame = paiRes['h_s'];
                this._pais[i].getChildByName('hua2').getComponent(cc.Sprite).spriteFrame = paiRes['h_b'];
            };
            if (this._pais[data.circleHolds.length - 1]) this._pais[data.circleHolds.length - 1].active = true;
            if (this._pais[data.circleHolds.length]) this._pais[data.circleHolds.length].active = false;
            if (this._pais[data.circleHolds.length + 1]) this._pais[data.circleHolds.length + 1].active = false;
            this._pai.active = true;
        }
        for (var i = 0; i < data.players.length; i++) {
            var index = this.netWork.getLocalIndexByUserId(data.players[i].userid);
            if (data.players[i].canOps) {
                cc.find('Canvas/seat' + index + '/toggle').active = true;
                this._seats[index].setTime(data.timer_Counter);
            } else {
                cc.find('Canvas/seat' + index + '/toggle').active = false;
            }
            var zhu = {
                money: data.players[i].cZhu,
                type: 1,
            };
            this._seats[index].setZhu(zhu);
            this._seats[index].setMoney(data.players[i].money);
        }
        this.showOtherSeat(1);
        this.netWork.holdemSocket.emit("getUserInfoByUserid");
    },

    /**
     * 更新座位信息
     * @param {*} data 
     */
    updateSeatInfo: function (data) {
        this.initSingleSeat(data);
    },

    /**
     * 准备倒计时
     * @param {*} data 
     */
    countDown: function (data) {
        // cc.log('下注时间==============' + JSON.stringify(data));
        this.countdown.string = data.countDown;
        this.countdown.node.active = true;
        if (data.countDown <= 0) {
            this.countdown.node.active = false;
        }
    },

    /**
     * 开始游戏
     * @param {*} data 
     */
    gameBegin: function (data) {
        this._tips.node.active = false;
        for (var i = 0; i < data.players.length; i++) {
            var seat = this.netWork.getSeatByID(data.players[i].userid);
            seat.score = data.players[i].money;
            var index = this.netWork.getLocalIndexByUserId(data.players[i].userid);
            var zhu = {
                money: data.players[i].cZhu,
                type: 1,
            };
            this._seats[index].setZhu(zhu);
            this._seats[index].setMoney(seat.score);
        };
        if (data.gameInfo.addOptions.length == 5) {
            this.setBtnOps(5, data.gameInfo.addOptions);
        }
    },

    /**
     * 
     * @param {*} data 
     */
    gameTurnChanged: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data);
        for (var t = 0; t < 5; t++) {
            cc.find('Canvas/seat' + t + '/toggle').active = false;
        }
        cc.find('Canvas/seat' + index + '/toggle').active = true;
        this._seats[index].setTime();
        cc.find('Canvas/seat0/toggle').active = false;
        if (this._seats[0]._pai.active) {
            if (this._seats[0].status == "AllIn") {
                this.setBtnOps(4);
            } else {
                this.setBtnOps(2);
            }
        }
    },

    /**
     * 
     * @param {*} data 
     */
    myHolds: function (data) {
        if (data) {
            if (!this._seats[0]._pai.active) {
                this._tips.node.active = false;
                this._seats[0].setPai(data, this);
            }
        }
    },

    /**
     * 更新底池
     * @param {*} data 
     */
    updateDiChi: function (data) {
        this._difen.string = Helper.fixNum(data);
        this._difen.money = data;
    },

    /**
     * 我的信息
     * @param {*} data 
     */
    myInfo: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data.userid);
        this._seats[index].setPai(data.holds, this);
        this._seats[index].setMoney(data.money);
        this.showOtherSeat(1);
    },

    /**
     * 
     * @param {*} data 
     */
    myTurn: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data.userid);
        for (var t = 0; t < 5; t++) {
            cc.find('Canvas/seat' + t + '/toggle').active = false;
        }
        cc.find('Canvas/seat' + index + '/toggle').active = true;
        this._seats[index].setTime();
        this.setBtnOps(1, data);
        this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(data.addMinMoney);
        this._thirdJiazhu.money = data.addMinMoney;
        this._thirdJiazhu.firstMoney = data.addMinMoney;
        this._thirdJiazhu.maxMoney = data.addMaxMoney;
        this.prepOps(data);
    },

    myTurnForNoMoney: function (data) {
        this.setBtnOps(1, data);
        this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(data.addMinMoney);
        this._thirdJiazhu.money = data.addMinMoney;
        this._thirdJiazhu.firstMoney = data.addMinMoney;
        this._thirdJiazhu.maxMoney = data.addMaxMoney;
        this.prepOps(data);
    },

    /**
     * 过牌
     * @param {*} data 
     */
    oneGuo: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data);
        cc.find('Canvas/seat' + index + '/toggle').active = false;
        this._seats[index].showOps('rangpai');
        if (this._seats[0]._pai.active) {
            this.setBtnOps(2);
        }
    },

    /**
     * 跟注
     * @param {*} data 
     */
    oneGen: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data.userid);
        this._seats[index].showOps('genpai');
        var d = {
            money: data.cZhu,
            type: 1
        }
        this._seats[index].setMoney(data.money);
        this._seats[index].setZhu(d);
        if (this._seats[0]._pai.active) {
            this.setBtnOps(2);
        }
    },

    /**
     * 加注
     * @param {*} data 
     */
    oneAdd: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data.userid);
        this._seats[index].showOps('jiazhu');
        var d = {
            money: data.cZhu,
            type: 1
        }
        this._seats[index].setMoney(data.money);
        this._seats[index].setZhu(d);
        if (this._seats[0]._pai.active) {
            this.setBtnOps(2);
        }
    },

    /**
     * 全压
     * @param {*} data 
     */
    oneAllIn: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data.userid);
        this._seats[index].showOps('quanxia');
        var d = {
            money: data.cZhu,
            type: 1
        }
        this._seats[index].setMoney(data.money);
        this._seats[index].setZhu(d);
        this._seats[index].status = data.status;
        if (this._seats[0]._pai.active) {

            if (this.playerInfo.playerId == data.userid) {
                this.setBtnOps(4);
            }
        }
    },

    /**
     * 弃牌
     * @param {*} data 
     */
    oneQuit: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data);
        cc.find('Canvas/seat' + index + '/toggle').active = false;
        this._seats[index].showOps('qipai');
        this._seats[index].showBeiPai(false);
        if (this.playerInfo.playerId == data) this.setBtnOps(4);
    },

    /**
     * 
     * @param {*} data 
     */
    allGuo: function (data) {
        for (var i = 0; i < this._seats.length; i++) {
            if (this._seats[i].node.active) {
                var d = {
                    money: 0,
                    type: 1
                }
                this._seats[i].setZhu(d);
            }
        };
    },

    playersInNewCircle: function (data) {
        for (var i = 0; i < data.length; i++) {
            var seat = this.netWork.getSeatByID(data[i].userid);
            if (seat) {
                seat.score = (data.money * 0.01).toFixed(2);
                var index = this.netWork.getLocalIndexByUserId(data[i].userid);
                cc.find('Canvas/seat' + index + '/toggle').active = false;
                if (this._seats[index].status != "AllIn") this._seats[index].showOps();
                this._seats[index].setMoney(data[i].money);
                if (this._seats[index]._paimian && !this._seats[index]._paimian.active) {
                    this._seats[index].hideScore();
                }
                if (this._seats[0]._pai.active) {
                    if (this._seats[index].status == "AllIn") {
                        this.setBtnOps(4);
                    } else {
                        this.setBtnOps(2);
                    }
                } else {
                    this._seats[0].hideScore();
                }
            }
        };
    },

    /**
     * 
     * @param {*} data 
     */
    newCircle: function (data) {
        cc.log('发牌了============================' + JSON.stringify(data));
        this._zongzhu.string = Helper.fixNum(this._difen.money);
        for (var i = 0; i < data.circleHolds.length; i++) {
            var paiRes = this.ConversionCardRes(parseInt(data.circleHolds[i]));
            this._pais[i].getChildByName('num').getComponent(cc.Sprite).spriteFrame = paiRes['num'];
            this._pais[i].getChildByName('hua1').getComponent(cc.Sprite).spriteFrame = paiRes['h_s'];
            this._pais[i].getChildByName('hua2').getComponent(cc.Sprite).spriteFrame = paiRes['h_b'];
        };
        if (this._pais[data.circleHolds.length - 1]) this._pais[data.circleHolds.length - 1].active = true;
        if (this._pais[data.circleHolds.length]) this._pais[data.circleHolds.length].active = false;
        if (this._pais[data.circleHolds.length + 1]) this._pais[data.circleHolds.length + 1].active = false;
        this._pai.active = true;
    },

    /**
     * 结算
     * @param {*} isLose 
     */
    settlement: function (isLose) {
        if (isLose) {
            this.lose.active = true;
        } else {
            this.win.active = true;
        }

    },

    /**
     * 
     * @param {*} data 
     */
    caculateResult: function (data) {
        cc.find('Canvas/seat0/toggle').active = false;
    },

    /**
     * 
     * @param {*} data 
     */
    myARGStatusChanged: function (data) {
        this.refreshFirstBtn(data);
    },

    /**
     * 游戏结束
     * @param {*} data 
     */
    gameOver: function (data) {
        var self = this;
        this.showOtherSeat(2);
        for (var i = 0; i < data.length; i++) {
            var seat = this.netWork.getSeatByID(data[i].userid);
            if (seat) {
                seat.score = (data[i].money * 0.01).toFixed(2);
                var index = this.netWork.getLocalIndexByUserId(data[i].userid);
                this._seats[index].showHoldsPai(data[i].holds, this);
                this._seats[index].setMoney(data[i].money);
                if (data[i].isWinner) {
                    this._seats[index].showWinText(parseInt(data[i].score[0]));
                } else {
                    this._seats[index].showWinText();
                }
            }
        }
        this.setBtnOps(4);
        this._timeout = setTimeout(function () {
            self.restart();
        }, 3000);
    },

    /**
     * 
     * @param {*} data 
     */
    gameInfoById: function (data) {
        this.ReconnectionInfo(data);
    },

    /**
     * 
     * @param {*} data 
     */
    userInfoById: function (data) {
        var index = this.netWork.getLocalIndexByUserId(data.userid);
        this._seats[index].setPai(data.holds, this);
        if (data.canOps) {
            this.setBtnOps(1, data);
        } else {
            this.setBtnOps(2, data);
        }
        this._thirdJiazhu.getChildByName('label').getComponent(cc.Label).string = Helper.fixNum(data.addMinMoney);
        this._thirdJiazhu.money = data.addMinMoney;
        this._thirdJiazhu.firstMoney = data.addMinMoney;
        this._thirdJiazhu.maxMoney = data.addMaxMoney;
        this.prepOps(data);
    },

    /**
     * 
     * @param {*}  
     */
    exitResult: function (data) {
        clearInterval(this._timeout);
        this.netWork.holdemSocket.disconnect();
        this.netWork.holdemSocket = null;
        cc.audioEngine.stopAll();
        cc.find('Canvas/Loading').active = !!!data;
        this.scheduleOnce(() => {
            cc.director.loadScene("LobbyMain");
        }, !!data ? 3 : 0.1);
    },

    /**
     * 离开房间
     * @param {*} data 
     */
    exitRoom: function (data) {
        clearInterval(this._timeout);
        //刷新用户钱币数量
        this.getGemsAndCoins();
    },

    /**
     * 检测用户状态
     * @param {*} data 
     */
    changeUserState: function (data) {
        var seat = data;
        var index = this.netWork.getLocalIndexByUserId(seat.userid);
        this._seats[index].seatHide();
    },

    //设置金币钻石数量
    getGemsAndCoins: function () {
        var self = this;
        // cc.vv.userMgr.getGemsAndCoins(function(data) {
        //     cc.vv.userMgr.gems = data.gems;
        //     cc.vv.userMgr.coins = data.coins;
        // });
    },

    onClickCloseBd(e, v) {
        cc.find('Canvas/com_ingame_tips').active = false;
    },

    addClickEvent: function (node, target, component, handler, isReplace) {
        // console.log(component + ":" + handler);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        var clickEvents = node.getComponent(cc.Button).clickEvents;
        if (isReplace) {
            //是否覆盖掉之前的事件
            clickEvents[0] = eventHandler;
        } else {
            clickEvents.push(eventHandler);
        }
    },
    addSlideEvent: function (node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        var slideEvents = node.getComponent(cc.Slider).slideEvents;
        slideEvents.push(eventHandler);
    },

    /**
     * 断开连接
     */
    disconnectNetWork_Function: function () {
        try {
            this.netWork.holdemSocket.disconnect();
        } catch (error) {};
        this.netWork.holdemSocket = null;
        //this.com_MessageBox.active = true;
        //this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您已断线，请重新登录";
    },

    onDestroy: function () {
        //cc.vv.voiceMgr.stop();
    },
    update: function (dt) {
        var minutes = Math.floor(Date.now() / 1000 / 60);
        if (this._lastMinute != minutes) {
            this._lastMinute = minutes;
            var date = new Date();
            var h = date.getHours();
            h = h < 10 ? "0" + h : h;
            var m = date.getMinutes();
            m = m < 10 ? "0" + m : m;
            if (this._timeLabel) this._timeLabel.string = "" + h + ":" + m;
        }
    },
    onCLick(ev, args) {
        if (args == 'help') {
            this.com_help.active = true;
        } else if (args == 'closeHelp') {
            this.com_help.active = false;
        } else if (args == 'paixing') {
            this.com_paixing.x = -500;
        } else if (args == 'closePaixing') {
            this.com_paixing.x = -3000;
        }
    }
});