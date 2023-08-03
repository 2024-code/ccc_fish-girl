cc.Class({
    extends: cc.Component,

    properties: {
        Timeout: {
            default: 10,
            tooltip: "连接超时倒计时(秒)",
        },
        Default_chip: 10,//默认初始筹码
        bet_Zone: cc.Node,//下注区域
        bet_mask: cc.Node,//下注区遮罩
        times_lab: cc.Label,//当前局号
        LabelJinBi: cc.Label,//金币文字
        time1_lab: cc.Label,
        time2_lab: cc.Label,
        PanelXinXi: cc.Node,//信息界面
        NodeAudioParent: cc.Node,//所有音效的父节点

        Prefab_HorseRacing: cc.Prefab,//跑马界面的预制件
        Panel_qianbugou: cc.Node, //钱不够界面
        Panel_qingxiazhu: cc.Node,//请下注界面
        Panel_jilu: cc.Node,//开奖记录界面
        scrollView_jilu: cc.ScrollView,
        jilu_preb: cc.Prefab,
    },

    onLoad: function () {
        this.network = this.getComponent('sm_Network');
        this.playerInfo = require("PlayerInfo").getInstant;
        this.initGame();
    },

    initGame() {
        this.LabelArray_Bet = [];//下注文本数组
        this.LabelArray_PeiLv = [];//赔率文本数组
        this.AnimationArray_run = [];//奔跑动画数组
        this._arrayBet = [];
        this.gameRecord = null;
        //动态添加下注节点
        for (let i = 0; i < this.bet_Zone.children.length; i++) {
            this.LabelArray_Bet.push(this.bet_Zone.children[i].getChildByName("下注").getComponent(cc.Label));
            this.LabelArray_PeiLv.push(this.bet_Zone.children[i].getChildByName("赔率").getComponent(cc.Label));
            this.AnimationArray_run.push(this.bet_Zone.children[i].getChildByName("动画").getComponent(cc.Animation));
            this._arrayBet.push(0);
        }

        this._chip = this.Default_chip;//初始筹码
        this.onBtnClick_ClearBet();
    },

    showInfo(data) {
        this.nowCoin = this.network.userCoin;
        let str = data.times_id.toString();
        this.times_id = str.substring(str.length - 4, str.length);
        this.times_lab.string = this.times_id;
        this.LabelJinBi.string = this.nowCoin.toFixed(2);
        this.game_second = data.game_second;
        this.game_type = data.game_type;
        this.bet_mask.active = this.game_type > 1;//游戏状态 1:下注  2:封盘  3:开奖
        for (let i in this.LabelArray_PeiLv) {
            this.LabelArray_PeiLv[i].string = `1陪${data.game_odd[i]}`;
        }
        this.setTime();
        cc.log(data.game_second, data.game_type);
    },

    start: function () {
        cc.audioEngine.stopAll();
    },

    setTime() {
        this.unschedule(this.timedown);
        if (this.network.time_openPrice > this.game_second) {
            this.time1_lab.string = (this.network.time_openPrice - this.game_second) + "秒";
        } else {
            this.time1_lab.string = "0秒";
        }

        if (this.network.time_betClose > this.game_second) {
            this.time2_lab.string = (this.network.time_betClose - this.game_second) + "秒";
        } else {
            this.time2_lab.string = "0秒";
        }
        this.timedown = () => {
            this.game_second += 1;
            if (this.network.time_openPrice > this.game_second) {
                this.time1_lab.string = (this.network.time_openPrice - this.game_second) + "秒";
            } else {
                this.time1_lab.string = "0秒";
            }

            if (this.network.time_betClose > this.game_second) {
                this.time2_lab.string = (this.network.time_betClose - this.game_second) + "秒";
            } else {
                this.time2_lab.string = "0秒";
            }
        }
        this.schedule(this.timedown, 1);
    },

    //下注
    onBtnClick_Bet: function (event, index) {
        //刷新当前金币数
        if (this.nowCoin < this._chip) {
            this.Panel_qianbugou.active = true;
            return;
        }
        this.nowCoin -= this._chip;
        this.LabelJinBi.string = this.nowCoin.toFixed(2);

        this._arrayBet[index] += this._chip;//增加下注
        this.RefreshLabel_Bet(index);//刷新下注文本
        //播放奔跑动画
        if (this.AnimationArray_run[index].state && this.AnimationArray_run[index].state.isPlaying) {
            return;
        }
        this.AnimationArray_run[index].state = this.AnimationArray_run[index].play();
    },
    //开始下注
    startBets(data) {
        this.showInfo(data);
        this.onBtnClick_ClearBet();
        this.bet_mask.active = false;
    },
    //停止下注
    closeBets() {
        this.bet_mask.active = true;
        let sendJsonList = [];
        for (let i in this._arrayBet) {
            if (this._arrayBet[i] > 0) {
                sendJsonList.push({
                    nBetItem: parseInt(i),
                    nBet: this._arrayBet[i] * this.playerInfo.exchangeRate,
                })
            }
        }
        if (sendJsonList.length > 0) {
            this.network.socket.emit('lottery', JSON.stringify(sendJsonList));
        }
    },
    //开奖结果
    getResult(res) {
        cc.log(`胜利的是${res.win_card_index + 1}号`);
        // let getWinCoin = res.win / this.playerInfo.exchangeRate - this.GetDuZhu() > 0 ? res.win / this.playerInfo.exchangeRate - this.GetDuZhu() > 0 : 0;
        var panel = cc.instantiate(this.Prefab_HorseRacing);//克隆
        panel.getComponent("paoma").SetData(res.win_list, res.win / this.playerInfo.exchangeRate);
        panel.parent = cc.find("Canvas");
    },
    //点击清除下注按钮
    onBtnClick_ClearBet: function () {
        for (var i = 0; i < this._arrayBet.length; i++) {
            this._arrayBet[i] = 0;//下注清零
            this.RefreshLabel_Bet(i);//下注文本赋值“0”
        }
        //停止所有奔跑动画
        for (var j = 0; j < this.AnimationArray_run.length; j++) {
            this.AnimationArray_run[j].state = this.AnimationArray_run[j].stop();
        }
    },

    //换筹码
    RadioButtonClicked_chip: function (toggle, chip) {
        this._chip = parseInt(chip);
    },

    //刷新下注文本
    RefreshLabel_Bet: function (index) {
        if (this._arrayBet[index] > 0) {
            this.LabelArray_Bet[index].string = this._arrayBet[index].toFixed(2);
        }
        else {
            this.LabelArray_Bet[index].string = "0.00";
        }

    },

    //点击信息按钮
    onBtnClick_XinXi: function () {
        this.PanelXinXi.active = !this.PanelXinXi.active;
    },

    //点击开奖记录按钮
    onBtnClick_JiLu: function () {
        this.Panel_jilu.active = !this.Panel_jilu.active;
        this.scrollView_jilu.content.removeAllChildren();
        for (let i = 0; i < this.gameRecord.length; i++) {
            let item = new cc.instantiate(this.jilu_preb);
            item.getComponent("sm_recordItem").initData(this.gameRecord[i]);
            this.scrollView_jilu.content.addChild(item);
        }
    },

    //点击开始按钮
    onBtnClick_KaiShi: function () {
        var duzhu = this.GetDuZhu();
        if (duzhu <= 0) {
            this.Panel_qingxiazhu.active = true;//请下注
            return;
        }
        else {
            // this.stateMachine.Input_Start(0.01, this.Timeout);
        }
    },

    //点击声音开关
    onToggleClick_ShengYin: function (toggle, customEventData) {
        if (toggle.isChecked) {
            for (var i = 0; i < this.NodeAudioParent.children.length; i++) {
                this.NodeAudioParent.children[i].getComponent(cc.AudioSource).volume = 1;
            }
        }
        else {
            for (var i = 0; i < this.NodeAudioParent.children.length; i++) {
                this.NodeAudioParent.children[i].getComponent(cc.AudioSource).volume = 0;
            }
        }
    },

    //点击返回大厅按钮
    onBtnClick_BackHall: function () {
        this.network.socket.disconnect();
        cc.director.loadScene("LobbyMain");
    },

    //计算得到下注金额
    GetDuZhu: function () {
        var duzhu = 0;
        for (var i = 0; i < this._arrayBet.length; i++) {
            duzhu += this._arrayBet[i];
        }
        return duzhu;
    },

    //点击关闭界面按钮
    onBtnClick_ClosePanel: function (event, customEventData) {
        event.target.parent.active = false;
    }
});