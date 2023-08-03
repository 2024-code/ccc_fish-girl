/**
 * 跑得快点击事件
 */
cc.Class({
    extends: cc.Component,

    properties: {
        btn_down: {
            default: null,
            type: cc.Node
        },
        btn_up: {
            default: null,
            type: cc.Node
        },
        setBar: {
            default: null,
            type: cc.Node
        },
        btn_RobLandload: {
            default: null,
            type: cc.Node
        },
        btn_Again: {
            default: null,
            type: cc.Node
        },
        btn_SendCard: {
            default: null,
            type: cc.Node
        },
        btn_Start: {
            default: null,
            type: cc.Node
        },
        btn_CallLandload: {
            default: null,
            type: cc.Node
        },
        btn_NoSendCard: {
            default: null,
            type: cc.Node
        },
        btn_outCards: {
            default: null,
            type: cc.Node
        },
        btn_CancelTuoGuan: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function () {},
    cliceDown: function () {
        this.btn_down.active = false;
        this.btn_up.active = true;
        this.setBar.getComponent("cc.Animation").play("down");
    },
    cliceUp: function () {
        this.btn_up.active = false;
        this.btn_down.active = true;
        this.setBar.getComponent("cc.Animation").play("up");
    },

    /**
     * 开始游戏
     */
    startGame: function () {
        this.btn_Start.active = false;
        this.node.getComponent("RuningMain").netWork.startGameFunction();
        this.node.getComponent("RuningMain").gameInit();
        this.node.getComponent("RuningMain").allTips[1].getChildByName("dengdai").active = true;
        cc.log('准备开始游戏====================================' + this.node.getComponent("RuningMain").allTips[1].getChildByName("dengdai"));
    },
    /**
     * 叫地主
     */
    Rob: function () {
        this.btn_RobLandload.active = false;
        cc.log('点击叫地主================================================');
        try {
            this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("qiang", {
                tableId: this.node.getComponent("RuningMain").netWork.tableId,
                seatId: this.node.getComponent("RuningMain").netWork.seatId,
                playerId: this.node.getComponent("RuningMain").netWork.playerId,
                qiang: 1 //抢地主
            });
        } catch (error) {};
    },
    /**
     * 不叫
     */
    NoRob: function () {
        this.btn_RobLandload.active = false;
        try {
            this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("qiang", {
                tableId: this.node.getComponent("RuningMain").netWork.tableId,
                seatId: this.node.getComponent("RuningMain").netWork.seatId,
                playerId: this.node.getComponent("RuningMain").netWork.playerId,
                qiang: 0 //不抢
            });
        } catch (error) {};
    },

    /**
     * 不出
     */
    outCard: function () {
        this.node.getComponent("RuningMain").outCard();
    },

    /***
     * 出牌
     */
    sendCard: function () {
        this.btn_SendCard.active = false;
    },

    /**
     * 要不起
     */
    noOut: function () {
        this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("NoPushTipsCards");
    },

    /**
     * 抢地主
     */
    callLandloads: function () {
        this.btn_CallLandload.active = false;
        this.node.getComponent("RuningMain").pb_Timer[1].active = false;
        try {
            this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("qiang", {
                tableId: this.node.getComponent("RuningMain").netWork.tableId,
                seatId: this.node.getComponent("RuningMain").netWork.seatId,
                playerId: this.node.getComponent("RuningMain").netWork.playerId,
                qiang: 1
            });
        } catch (error) {};
    },

    /**
     * 不抢
     */
    noCallLandloads: function () {
        this.btn_CallLandload.active = false;
        this.node.getComponent("RuningMain").pb_Timer[1].active = false;
        try {
            this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("qiang", {
                tableId: this.node.getComponent("RuningMain").netWork.tableId,
                seatId: this.node.getComponent("RuningMain").netWork.seatId,
                playerId: this.node.getComponent("RuningMain").netWork.playerId,
                qiang: 0
            });
        } catch (error) {};
    },

    /**
     * 离开游戏
     */
    exitGame: function () {
        if (this.node.getComponent("RuningMain").gameFinish) {
            if (this.node.getComponent("RuningMain").netWork !== null) {
                this.node.getComponent("RuningMain").netWork.gameExit = true;
                try {
                    this.node.getComponent("RuningMain").netWork.lobbyMainSocket.disconnect();
                } catch (error) {};
                try {
                    this.node.getComponent("RuningMain").netWork.LandlordsSocket.disconnect();
                } catch (error) {};
            };

            cc.audioEngine.stopAll();

            cc.director.loadScene("LobbyMain");
        } else {
            this.node.getComponent("RuningMain").exitReady.active = true;
        }
        this.node.getComponent("RuningMain").node.getChildByName("blackFace").active = true;
    },

    /**
     * 
     */
    readyExitGame: function () {
        if (this.node.getComponent("RuningMain").netWork !== null) {
            this.node.getComponent("RuningMain").netWork.gameExit = true;
            try {
                this.node.getComponent("RuningMain").netWork.lobbyMainSocket.disconnect();
            } catch (error) {};
            try {
                this.node.getComponent("RuningMain").netWork.LandlordsSocket.disconnect();
            } catch (error) {};
        }
        cc.audioEngine.stopAll();
        cc.director.loadScene("LobbyMain");
    },

    /**
     * 
     */
    cancelActive: function () {
        this.node.getComponent("RuningMain").exitReady.active = false;
        this.node.getComponent("RuningMain").node.getChildByName("blackFace").active = false;
    },

    /**
     * 继续游戏
     */
    gameAgain: function () {
        try {
            //游戏结束
            this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("loadedFinish", {
                ready: 0,
                tableId: this.node.getComponent("RuningMain").netWork.tableId,
                seatId: this.node.getComponent("RuningMain").netWork.seatId,
                playerId: this.node.getComponent("RuningMain").netWork.playerId
            });
            cc.log("继续游戏");
            this.btn_Again.active = false;
            this.node.getChildByName("Bill").active = false;
            this.node.getChildByName("blackFace").active = false;
            this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = false;
            this.node.getComponent("RuningMain").allTips[1].getChildByName("dengdai").active = true;
        } catch (error) {};
    },

    /**
     * 
     */
    closeBlackFace: function () {
        this.node.getChildByName("Bill").active = false;
        this.node.getChildByName("blackFace").active = false;
        this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = false;
    },

    /**
     * 显示提示信息
     */
    tipsFunction: function () {
        this.node.getComponent("RuningMain").tipsClick();
    },

    /**
     * 点击托管
     */
    tuoGuan: function () {
        if (!this.node.getComponent("RuningMain").gameFinish) {
            //tuoGuan=true 托管
            this.node.getComponent("RuningMain").tuoGuan = true;
            this.btn_CancelTuoGuan.active = true;
            this.node.getComponent("RuningMain").tuoGuanFunction(null);
            this.node.getComponent("RuningMain").turnOffTouch();
            try {
                //托管接口, isTuoGuan=true 托管
                this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("tuoGuan", {
                    isTuoGuan: true,
                    tableId: this.node.getComponent("RuningMain").netWork.tableId,
                    seatId: this.node.getComponent("RuningMain").netWork.seatId,
                    playerId: this.node.getComponent("RuningMain").netWork.playerId
                });
            } catch (error) {};
        }
    },

    /**
     * 点击取消托管
     */
    cancelTuoGaun: function () {
        this.btn_CancelTuoGuan.active = false;
        //tuoGuan=false 不托管
        this.node.getComponent("RuningMain").tuoGuan = false;
        this.node.getComponent("RuningMain").addEventListener();
        try {
            //托管接口, isTuoGuan=false 不托管
            this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("tuoGuan", {
                isTuoGuan: false,
                tableId: this.node.getComponent("RuningMain").netWork.tableId,
                seatId: this.node.getComponent("RuningMain").netWork.seatId,
                playerId: this.node.getComponent("RuningMain").netWork.playerId
            });
        } catch (error) {};
    },

    /**
     * 重新连接游戏
     */
    reconnectGame: function () {
        this.node.getComponent("RuningMain").netWork;
        this.node.getComponent("RuningMain").com_MessageBox.active = false;
        cc.audioEngine.stopAll();
        cc.director.loadScene("LobbyMain");
    },

    /**
     * 点击换桌
     */
    huanZuo: function () {
        if (this.node.getComponent("RuningMain").gameFinish) {
            try {
                //换桌接口
                this.node.getComponent("RuningMain").netWork.LandlordsSocket.emit("huanZuo", {
                    tableId: this.node.getComponent("RuningMain").netWork.tableId,
                    seatId: this.node.getComponent("RuningMain").netWork.seatId,
                    playerId: this.node.getComponent("RuningMain").netWork.playerId
                })
            } catch (error) {};
        }
    }
});