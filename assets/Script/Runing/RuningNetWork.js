/**
 * 跑得快SOCKET通讯
 */
let RuningNetWork = (function () {
    /**
     * 单例模式
     */
    function getInstant() {
        let _instance;
        if (_instance === undefined) {
            _instance = new Single();
        }
        return _instance;
    }
    /**
     * 逻辑层
     */
    function Single() {
        this.lobbyMain = null;
        this.Runing = null;
        this.RuningSocket = null;
        this.playerInfo = null;
        this.tableId = -1;
        this.seatId = -1;
        this.playerHead = null;
        this.playerList = null;
        this.roomBet = 1;
        this.disconnected = false;
        this.RuningData = null;
        this.gameExit = false;
        this.count = 0;

        /**
         * 初始化
         */
        this.init = function () {
            this.playerInfo = require("PlayerInfo").getInstant;
        };

        /**
         * 进入游戏
         */
        this.loginGame_Function = (ip, prot, playerId, sign) => {
            this.ip = ip;
            this.prot = prot;
            this.playerId = playerId;
            this.sign = sign;
            this.playerInfo.gameName = "Runing";
            this.playerInfo.gameDisconnect = false;
            cc.log('进入跑得快:' + ip, prot, playerId, sign);
            setTimeout(function () {
                cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("RunMain");
            }, 1000);
        };

        /**
         * 开始游戏
         */
        this.startGameFunction = function () {
            let ip = this.ip;
            let prot = this.prot;
            let playerId = this.playerId;
            let sign = this.sign;
            let socket = null;

            if (cc.sys.isNative) {
                this.LandlordsSocket = SocketIO.connect(ip + ":" + prot);
            } else {
                socket = require("socket-io");
                this.LandlordsSocket = socket(ip + ":" + prot);
            }

            this.LandlordsSocket.on("connect_error", () => {
                this.netErr('网络连接错误，请联系客服');
            });

            this.LandlordsSocket.on("connect_timeout", () => {
                this.netErr('网络连接错误，请联系客服');
            });

            this.LandlordsSocket.on("connected", ret => {
                cc.log('斗地主网络已连接，发起loginGame');
                this.LandlordsSocket.emit("LoginGame", JSON.stringify({
                    userid: playerId,
                    gametype: 1,
                    sign: sign
                }));
            });

            this.LandlordsSocket.on('TipsCardsResult', ret => {
                ret = this.changeResultJSON_Function(ret);
                cc.log('出牌提示：' + JSON.stringify(ret));
                this.Landlords.tipsClickCallBack(ret);
            });

            this.LandlordsSocket.on('NoPushTipsCardsResult', ret => {
                ret = this.changeResultJSON_Function(ret);
                cc.log('不能出牌提示：' + JSON.stringify(ret));
                if (!ret.code) {
                    this.Landlords.btn_OutCard.active = false;
                    try {
                        this.Landlords.netWork.LandlordsSocket.emit("sendCardsArr", {
                            array: [],
                            userId: this.Landlords.pInfo.playerId,
                            tableId: this.tableId,
                            seatId: this.seatId
                        });
                    } catch (error) {};
                }
            });


            this.LandlordsSocket.on("loginGameResult", ret => {
                cc.log('进入跑得快， 返回游戏信息:' + JSON.stringify(ret));
                ret = this.changeResultJSON_Function(ret);
                if (ret.resultid) {
                    this.playerInfo.playerCoin = ret.Obj.score;
                    this.roomBet = ret.Obj.bet;
                    this.lobbyMainSocket.disconnect();
                    this.LandlordsSocket.emit("LoginRoom", JSON.stringify({
                        roomid: 1
                    }));

                    if (!cc.sys.isNative)
                        this.LandlordsSocket.removeListener("LoginRoomResult");
                    this.LandlordsSocket.on("LoginRoomResult", ret => {
                        ret = this.changeResultJSON_Function(ret);
                        if (ret.ResultCode) {
                            this.tableId = ret.ResultData.tableId;
                            this.seatId = ret.ResultData.seatId;
                            this.playerList = ret.ResultData.userList;
                            this.tax = ret.ResultData.tax;
                            this.addScore = ret.ResultData.addscore;
                            this.Landlords.resetDF(ret.points);
                            this.LandlordsData = ret.ResultData.LandlordsData;
                            this.LandlordsNetWork();
                        }
                    })
                } else {
                    !this.gameExit && this.netErr(ret.msg);
                }
            });
        };

        //错误信息弹板
        this.netErr = msg => {
            this.Landlords.node.getChildByName("blackFace").active = true;
            this.Landlords.exitReady.active = true;
            this.Landlords.exitReady.getChildByName("message").getComponent("cc.Label").string = msg;
        }

        /**
         * socket长连
         */
        this.LandlordsNetWork = () => {
            this.LandlordsSocket.on("disconnect", t => {
                this.gameExit || (this.Landlords.com_MessageBox.active = true, this.Landlords.disconnectNetWork_Function());
            });

            this.LandlordsSocket.on("Hudshow", ret => {
                cc.log('Hudshow~~~~:' + JSON.stringify(ret));
                let result = this.changeResultJSON_Function(ret);
                for (let i = 0; i < result.data.length; i++) {
                    if (result.data[i] != null) {
                        if (result.data[i].seatId != this.seatId) {
                            //设置其他人的信息
                            this.Landlords.otherEnterRoom(result.data[i].nickname, result.data[i].score, result.data[i].seatId, result.data[i].userId, result.data[i].headimgurl);
                        } else {
                            //设置自己的信息
                            this.Landlords.setMySeat(result.data[i].nickname, result.data[i].score);
                        }
                    }
                }
            });

            /**
             * 
             */
            this.LandlordsSocket.on("Landlord", ret => {
                let result = this.changeResultJSON_Function(ret);
                console.log('抢地主：' + JSON.stringify(result));
                if (result.No1 && result.userId === this.playerId) {
                    //叫地主
                    this.Landlords.callLandloads(result.second);
                } else {
                    //抢地主
                    this.Landlords.robLandlord(result.second, result.userId);
                }
                this.Landlords.qiangDiZhu = true;
            });

            /**
             * 
             */
            this.LandlordsSocket.on("ListenCarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                result.second = result.second - 1;
                this.Landlords.scheduleOnce(() => {
                    this.Landlords.gameFinish || this.Landlords.playState(result.userId, result.second);
                }, 1);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("ACarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                if (result.userId !== this.playerId) {
                    this.Landlords.otherPlayerOutCard(result.carcd, result.userId, 0);
                } else {
                    this.Landlords.xiTongOutCard(result.carcd);
                }
                this.Landlords.playerNowState(result.userId, result.Explain, result.carcd, result["double"]);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("MyCarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                console.log("MyCarcd" + JSON.stringify(result));
                result.soery || result.result || (cc.log("不能出"), this.Landlords.notConformRules());
            });

            /**
             * 
             */
            this.LandlordsSocket.on("CCTV", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.playerNowState(result.userId, result.Explain, null, null);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("victory", ret => {
                let result = this.changeResultJSON_Function(ret);
                console.log('推送结果' + JSON.stringify(result));
                let winner = result.Winner;
                let guanmen = result.guan_men_type;
                let baopei = result.bao_pei;
                // this.Landlords.scheduleOnce(() => {
                this.Landlords.settlement(winner, guanmen, baopei);
                this.Landlords.exitBtn.active = true;
                // }, 2);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("Mingcarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.removeAllState();
                for (let i = 0; i < result.carcd.length; i++) {
                    if (result.carcd[i].userId == this.playerId) {
                        if (this.Landlords.playerCards.length > 0) {
                            this.Landlords.xiTongOutCard(result.carcd[i].carcd);
                        } else {
                            this.Landlords.teShuChuPai(result.carcd[i].carcd);
                        }
                    } else {
                        this.Landlords.otherPlayerOutCard(result.carcd[i].carcd, result.carcd[i].userId, 0);
                    }
                }
            });

            /**
             * 托管
             */
            this.LandlordsSocket.on("InTuoGuan", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.tuoGuanState(result.reslut, result.userId);
            });

            /**
             * 玩家进入
             */
            this.LandlordsSocket.on("playEnter", ret => {
                cc.log('玩家进入斗地主=============' + JSON.stringify(ret));
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.otherEnterRoom(result.ResultData.nickname, result.ResultData.score, result.ResultData.seatId, result.ResultData.userId, result.ResultData.headimgurl);
            });

            /**
             * 发牌
             */
            this.LandlordsSocket.on("sendCard", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.exitBtn.active = false;
                if (this.Landlords.gameFinish == true) {
                    this.Landlords.gameFinish = false;
                    this.Landlords.cardsSorting(result.carcd, false);
                } else {
                    this.Landlords.cardsSorting(result.carcd, false);
                }
            });

            /**
             * 
             */
            this.LandlordsSocket.on("PlayerOut", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.playerOutRoom(result.userId);
            });


            /**
             * 
             */
            this.LandlordsSocket.on("LandlordsSocket", ret => {
                let result = this.changeResultJSON_Function(ret);
            });

            /**
             * 春天
             */
            this.LandlordsSocket.on("Spring", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.chunTianAnimation();
            });

            /**
             * 地主
             */
            this.LandlordsSocket.on("Landlord_Poker", ret => {
                let result = this.changeResultJSON_Function(ret);
                //result && this.Landlords.checkLandlords(result.userId, result.carcd, result["double"]);
            });

            this.LandlordsSocket.on("sendBoomScore", ret => {
                let result = this.changeResultJSON_Function(ret);
                let dlist = [...result.res];
                for (let i in dlist) {
                    let seat = null;
                    if (dlist[i].seat_id == this.seatId) {
                        this.Landlords.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (dlist[i].score / this.Landlords.pInfo.exchangeRate).toFixed(2);
                        let nd = this.Landlords.pb_Lower.getChildByName("act");
                        nd.getChildByName("lbl").getComponent("cc.Label").string = (dlist[i].add_score >= 0 ? '+' : '') + (dlist[i].add_score / this.Landlords.pInfo.exchangeRate).toFixed(2);
                        nd.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(1)));
                    } else {
                        if (this.seatId == 0 && dlist[i].seat_id == 1) {
                            seat = this.Landlords.otherTwoR;
                        } else if (this.seatId == 0 && dlist[i].seat_id == 2) {
                            seat = this.Landlords.otherOneL;
                        } else if (this.seatId == 1 && dlist[i].seat_id == 0) {
                            seat = this.Landlords.otherOneL;
                        } else if (this.seatId == 1 && dlist[i].seat_id == 2) {
                            seat = this.Landlords.otherTwoR;
                        } else if (this.seatId == 2 && dlist[i].seat_id == 1) {
                            seat = this.Landlords.otherOneL;
                        } else if (this.seatId == 2 && dlist[i].seat_id == 0) {
                            seat = this.Landlords.otherTwoR;
                        }
                        if (!!seat) {
                            seat.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (dlist[i].score / this.Landlords.pInfo.exchangeRate).toFixed(2);
                            let nd = seat.getChildByName("act");
                            nd.getChildByName("lbl").getComponent("cc.Label").string = (dlist[i].add_score >= 0 ? '+' : '') + (dlist[i].add_score / this.Landlords.pInfo.exchangeRate).toFixed(2);
                            nd.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(1)));
                        }
                    }
                }
            });


            /**
             * 
             */
            this.LandlordsSocket.on("regression", t => {
                t = this.changeResultJSON_Function(t);
                cc.log("断线重连", t);
                if (t.result) {
                    t = t.HUD;
                    for (let i = 0; i < t.length; i++) t[i].userId === this.playerId ? (this.Landlords.resetDF(t[i].DF), t[i].MyCarcd && (this.Landlords.gameFinish = false, this.Landlords.cardsSorting(t[i].MyCarcd, true)), this.Landlords.publicCard(t[i].tong_yi_pai)) : this.Landlords.setCardLength(t[i].userId, t[i].carcd_length),
                        2 === t[i].Landlord && this.Landlords.resetLandlords(t[i].userId, t[i]["double"]);
                    if (0 == this.seatId) {
                        e: for (let i = 0; i < t.length; i++)
                            if (0 == t[i].seatId) {
                                this.Landlords.teShuChuPai(t[i].carcd);
                                for (let n = 0; n < t.length; n++)
                                    if (1 == t[n].seatId) {
                                        0 == t[n].carcd.length ? this.Landlords.otherPlayerNo(t[n].userId) : this.Landlords.otherPlayerOutCard(t[n].carcd, t[n].userId, t[n].carcd.length);
                                        for (let o = 0; o < t.length; o++)
                                            if (2 == t[o].seatId) {
                                                0 == t[o].carcd.length ? this.Landlords.otherPlayerNo(t[o].userId) : this.Landlords.otherPlayerOutCard(t[o].carcd, t[o].userId, t[o].carcd.length);
                                                break e
                                            }
                                    }
                            }
                    }
                    else if (1 == this.seatId) {
                        e: for (let i = 0; i < t.length; i++)
                            if (1 == t[i].seatId) {
                                this.Landlords.teShuChuPai(t[i].carcd);
                                for (let n = 0; n < t.length; n++)
                                    if (2 == t[n].seatId) {
                                        0 == t[n].carcd.length ? this.Landlords.otherPlayerNo(t[n].userId) : this.Landlords.otherPlayerOutCard(t[n].carcd, t[n].userId, t[n].carcd.length);
                                        for (let o = 0; o < t.length; o++)
                                            if (0 == t[o].seatId) {
                                                0 == t[o].carcd.length ? this.Landlords.otherPlayerNo(t[o].userId) : this.Landlords.otherPlayerOutCard(t[o].carcd, t[o].userId, t[o].carcd.length);
                                                break e
                                            }
                                    }
                            }
                    }
                    else e: for (let i = 0; i < t.length; i++)
                        if (2 == t[i].seatId) {
                            this.Landlords.teShuChuPai(t[i].carcd);
                            for (let n = 0; n < t.length; n++)
                                if (0 == t[n].seatId) {
                                    0 == t[n].carcd.length ? this.Landlords.otherPlayerNo(t[n].userId) : this.Landlords.otherPlayerOutCard(t[n].carcd, t[n].userId, t[n].carcd.length);
                                    for (let o = 0; o < t.length; o++)
                                        if (1 == t[o].seatId) {
                                            0 == t[o].carcd.length ? this.Landlords.otherPlayerNo(t[o].userId) : this.Landlords.otherPlayerOutCard(t[o].carcd, t[o].userId, t[o].carcd.length);
                                            break e
                                        }
                                }
                        }
                    // for (let i = 0; i < t.length; i++) "undefined" != typeof t[i].qiang ? t[i].Pgup != -1 && (1 == t[i].qiang ? this.Landlords.playerNowState(t[i].userId, "抢地主", null, null) : this.Landlords.playerNowState(t[i].userId, "不抢", null, null)) : 0 == t[i].carcd.length && this.Landlords.playerNowState(t[i].userId, "不出", null, null);
                    // for (let i = 0; i < t.length; i++) 20 === t[i].Mytime ? this.Landlords.playState(t[i].userId, t[i].time) : 15 === t[i].Mytime && this.Landlords.robLandlord(t[i].time, t[i].userId)

                    for (let i = 0; i < t.length; i++) {
                        if (15 === t[i].Mytime) {
                            console.log(t[i].userId, this.Landlords.pInfo.playerId);
                            this.Landlords.playState(t[i].userId, t[i].time);
                        }
                    }
                }
                this.Landlords.chongLian = true;
            });


            this.LandlordsSocket.on("publicCarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.resetDF(result.points);
            });

            try {
                this.LandlordsSocket.emit("getUer", {
                    tableId: this.tableId,
                    seatId: this.seatId,
                    playerId: this.playerId
                });
                this.LandlordsSocket.emit("loadedFinish", {
                    ready: 0,
                    tableId: this.tableId,
                    seatId: this.seatId,
                    playerId: this.playerId
                });
                this.LandlordsSocket.emit("joinTableroom", {
                    tableId: this.tableId,
                    seatId: this.seatId,
                    userId: this.playerId
                });
            } catch (error) {};
        };

        /**
         * 
         */
        this.setLobbyMainObj_Function = scene => {
            this.lobbyMain = scene;
            this.lobbyMainSocket = scene.getComponent("LobbyMain").netWork.socket;
        };

        /**
         * 
         */
        this.setruningObj_Function = scene => {
            this.Landlords = scene;
        };

        /**
         * 
         */
        this.changeResultJSON_Function = ret => {
            if (cc.sys.isNative) {
                return JSON.parse(ret);
            }
            return ret;
        };
        this.init();
    }
    return {
        getInstant: new getInstant()
    }
})();

module.exports = RuningNetWork;