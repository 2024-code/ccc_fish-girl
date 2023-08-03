cc.Class({
    extends: cc.Component,
    properties: {
        //_sprIcon: null,
        _ready: null,
        _lblName: null,
        _lblScore: null,
        _lastChatTime: -1,
        _userName: "",
        _score: 0,
        _isOffline: false,
        _userId: null,
        _time: -1,
        _op: null,
        _pai: null,
        _pais: [],
        _pai1: null,
        _pais1: [],
        _paimian: null,
        _timeLabel: null,
        _time: -1,
        _toggle: null,
    },
    // use this for initialization
    onLoad: function () {
        this._sprIcon = this.node.getChildByName("head").getComponent(cc.Sprite);
        this._lblName = this.node.getChildByName("name").getComponent(cc.Label);
        this._lblScore = this.node.getChildByName("money").getComponent(cc.Label);
        this._op = this.node.getChildByName("text");
        this._xiazhu = this.node.getChildByName("xiazhu").getChildByName("money").getComponent(cc.Label);
        this._pai = this.node.getChildByName("pai");
        this._pai1 = this.node.getChildByName("jieguo");
        if (this._pai) {
            for (var i = 0; i < this._pai.childrenCount; i++) {
                this._pais[i] = this._pai.getChildByName("pai" + i);
            };
        }
        if (this._pai1) {
            for (var i = 0; i < this._pai1.childrenCount; i++) {
                this._pais1[i] = this._pai1.getChildByName("pai" + i);
            };
        }
        this._paimian = this.node.getChildByName("paimian");
        this._count = this.node.getChildByName('count');
        this._op.active = false;
        this._xiazhu.string = Helper.fixNum(0);
        if (this._pai) this._pai.active = false;
        if (this._paimian) this._paimian.active = false;
        // if (this._sprIcon && this._userId) {
        //     this._sprIcon.setUserID(this._userId);
        // }
        this._toggle = this.node.getChildByName("toggle");
        this._timeLabel = this.node.getChildByName("toggle").getChildByName("lblTime").getComponent(cc.Label);
        this._timeLabel.string = "00";
        this.refresh();
    },
    refresh: function () {
        cc.log('设置头像===========' + this._lblName)
        if (this._lblName != null) {
            this._lblName.string = this._userName;
        }
        if (this._lblScore != null) {
            this._lblScore.string = this._score;
        }
        if (this._paimian) this._paimian.active = false;
        if (this._pai) this._pai.active = false;
        if (this._pai1) this._pai1.active = false;
        this.node.active = this._userName != null && this._userName != "";
    },
    restart: function () {
        if (this._paimian) this._paimian.active = false;
        if (this._pai) this._pai.active = false;
        if (this._pai1) this._pai1.active = false;
        if (this._op) this._op.active = false;
        if (this._lblName) this._lblName.node.active = true;
        this.node.getChildByName("cover").active = false;
        this.node.getChildByName("xiazhu").active = false;
    },
    setInfo: function (name, score, head) {
        this._userName = name;
        let self = this;
        Helper.loadHead(head, sp => {
            self._sprIcon.spriteFrame = sp;
        });
        this._score = (score * 0.01).toFixed(2);
        if (this._score == null) {
            this._score = 0;
        }
        if (this._lblScore != null) {
            this._lblScore.node.active = this._score != null;
        }
        this.refresh();
    },
    hideScore: function () {
        this.node.getChildByName("xiazhu").active = false;
    },
    setZhu: function (data) {
        var self = this;
        var time = 0;
        if (data.money > 0) {
            time = 350;
        }
        var fn = function (n) {
            setTimeout(function () {
                n ? n.active = false : null;
                if (!self.node.getChildByName("xiazhu").active) self.node.getChildByName("xiazhu").active = true;
                if (data.money == 0) self.node.getChildByName("xiazhu").active = false;
                if (data.type == 1) {
                    self._xiazhu.string = Helper.fixNum(data.money);
                } else {
                    self._xiazhu.string = Helper.fixNum(parseInt(self._xiazhu.string) + data.money);
                }
            }, time)
        };
        if (data.money > 0) {
            this.showXiaZhuAnim(fn);
        } else {
            fn(null);
        }
    },
    seatHide: function () {
        this.node.active = false;
        this._xiazhu.string = Helper.fixNum(0);
        this.node.getChildByName("xiazhu").active = false;
        this._op.active = false
        this._userName = "";
        for (var i = 0; i < this._op.childrenCount; i++) {
            this._op.children[i].active = false;
        }
    },
    setReady: function (isReady) {
        this._isReady = isReady;
        if (this._ready) {
            this._ready.active = this._isReady;
        }
    },
    setID: function (id) {
        var idNode = this.node.getChildByName("id");
        if (idNode) {
            var lbl = idNode.getComponent(cc.Label);
            lbl.string = "ID:" + id;
        }
        this._userId = id;
        // if (this._sprIcon) {
        //     this._sprIcon.setUserID(id);
        // }
    },
    getID: function () {
        return this._userId;
    },
    showXiaZhuAnim: function (callback) {
        var x = this._lblScore.node.x;
        var y = this._lblScore.node.y;
        var endX = this.node.getChildByName("xiazhu").x;
        var endY = this.node.getChildByName("xiazhu").y;
        var node = this.node.getChildByName('chips');
        var newNode = cc.instantiate(node);
        newNode.name = "chips";
        this.node.addChild(newNode);
        newNode.active = true;
        newNode.spriteFrame = node.getComponent(cc.Sprite).spriteFrame;
        newNode.x = x;
        newNode.y = y;
        var action = cc.moveTo(0.35, cc.v2(endX, endY));
        newNode.runAction(action);
        callback(newNode);
    },
    showOps: function (type) {
        if (!this._op) return;
        if (type) {
            this._op.active = true;
            for (var i = 0; i < this._op.childrenCount; i++) {
                if (this._op.children[i].name == type) {
                    this._op.children[i].active = true;
                } else {
                    this._op.children[i].active = false;
                }
            };
            if (type == "qipai") {
                this.node.getChildByName("cover").active = true;
            }
            this._lblName.node.active = false;
        } else {
            if (this._op.getChildByName("qipai").active) {
                this._lblName.node.active = false;
            } else {
                this._lblName.node.active = true;
                this._op.active = false;
            }
        }
    },
    setPai: function (data, parent) {
        if (data.length == 2 && this._pais.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var paiRes = parent.ConversionCardRes(parseInt(data[i]));
                this._pais[i].getChildByName('num').getComponent(cc.Sprite).spriteFrame = paiRes['num'];
                this._pais[i].getChildByName('hua1').getComponent(cc.Sprite).spriteFrame = paiRes['h_s'];
                this._pais[i].getChildByName('hua2').getComponent(cc.Sprite).spriteFrame = paiRes['h_b'];
            };
            this._pai.active = true;
        }
    },
    showHoldsPai: function (data, parent) {
        if (data.length == 2 && this._pais1) {
            for (var i = 0; i < data.length; i++) {
                var paiRes = parent.ConversionCardRes(parseInt(data[i]));
                this._pais1[i].getChildByName('num').getComponent(cc.Sprite).spriteFrame = paiRes['num'];
                this._pais1[i].getChildByName('hua1').getComponent(cc.Sprite).spriteFrame = paiRes['h_s'];
                this._pais1[i].getChildByName('hua2').getComponent(cc.Sprite).spriteFrame = paiRes['h_b'];
            };
            this._pai1.active = true;
            if (this._paimian) this._paimian.active = false;
            if (this._pai) this._pai.active = false;
        }
    },
    showWinText: function (type) {
        var title = "";
        switch (type) {
            case 9:
                title = "皇家同花顺赢";
                break;
            case 8:
                title = "同花顺赢";
                break;
            case 7:
                title = "金刚赢";
                break;
            case 6:
                title = "葫芦赢";
                break;
            case 5:
                title = "同花赢";
                break;
            case 4:
                title = "顺子赢";
                break;
            case 3:
                title = "三条赢";
                break;
            case 2:
                title = "双对赢";
                break;
            case 1:
                title = "一对赢";
                break;
            case 0:
                title = "高牌赢";
                break;
        }
        if (title == "") {
            this.node.getChildByName("cover").active = true;
            this._lblName.node.active = true;
        } else {
            if (this._pai1.active) {
                this._lblName.node.active = false;
            } else {
                this._lblName.node.active = true;
            }
        }
        this._pai1.getChildByName("text").getComponent(cc.Label).string = title;
        this.node.getChildByName("xiazhu").active = false;
    },
    showBeiPai: function (flag) {
        if (!this._paimian) return;
        this._paimian.active = flag;
    },
    setMoney: function (data) {
        //设置该玩家所拥有的的钱
        this._lblScore.string = (data * 0.01).toFixed(2);
        this._score = (data * 0.01).toFixed(2);
    },
    setTime: function (o) {
        if (o) {
            this._time = o;
        } else {
            this._time = 30;
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this._time > 0) {
            this._time -= dt;
            var pre = "";
            if (this._time < 0) {
                this._time = 0;
            }
            var t = Math.ceil(this._time);
            if (t < 10) {
                pre = "0";
            }
            this._timeLabel.string = pre + t;
        }
    },
});