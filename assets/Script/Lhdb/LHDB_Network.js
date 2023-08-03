cc.Class({
    extends: cc.Component,

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.gameMain = this.node.getComponent('LHDB_Main');
        this.sign = this.playerInfo.gameSign;
        this.userId = this.playerInfo.playerId;
        this.port = ':15200';
        this.timer = 0;
        //连接网络
        if (cc.sys.isNative) {
            this.socket = SocketIO.connect(Lhjconfig.Server_IP + this.port);
        } else {
            let socket = require("socket-io");
            this.socket = socket(Lhjconfig.Server_IP + this.port);
        }
        this.registEvent();
    },

    registEvent() {
        this.socket.on("connected", ret => {
            cc.log('connected:' + ret);
            if (ret) {
                this.socket.emit("LoginGame", JSON.stringify({
                    userid: this.userId, //用户ID
                    gametype: 11, //游戏类型
                    sign: this.sign //签名
                }));
            }
        });

        this.socket.on("loginGameResult", ret => {
            let result = this.changeResultJSON_Function(ret);
            cc.log('游戏登陆成功=======================' + JSON.stringify(result));
            LHDB_LOBBYNET.disconnect();
            this.gameMain.lblAllCoin.string = Helper.fixNum(result.Obj.score);
            if (result.resultid) { //游戏登录成功
                this.socket.emit("LoginRoom", JSON.stringify({
                    roomid: 1
                }));
            } else {
                cc.log(result.msg);
            }
        });

        this.socket.on("LoginRoomResult", ret => {
            let result = this.changeResultJSON_Function(ret);
            cc.log('LoginRoom结果' + JSON.stringify(result));
            //设置奖池
            this.gameMain.lblCoin.string = (result.ResultData.gameDict.big_win_score * 0.01).toFixed(2);
            this.gameMain.lblGoldPool.string = result.ResultData.score_pool;
            this.gameMain.setLevel(result.ResultData.gameDict.game_level_num);
            let list = this.gameMain.levelList[this.gameMain.level - 1].children;
            for (let i = 0; i < result.ResultData.gameDict.zuan_tou; i++) {
                list[i].active = false;
            }
        })

        this.socket.on("clearGameDictResult", ret => {
            let result = this.changeResultJSON_Function(ret);
            if (result) {
                this.gameMain.exitGame();
            }
        })

        this.socket.on("lotteryResult", ret => {
            let result = this.changeResultJSON_Function(ret);
            cc.log('下注结果' + JSON.stringify(result));
            const data = result.dictAnalyseResult;
            if (result.ResultCode >= 1) {
                this.gameMain.gemList = [];
                this.gameMain.gemPidList = [];
                this.gameMain.areaList[data.game_level_num - 1].removeAllChildren();
                for (let i in data.res_list) {
                    this.gameMain.scheduleOnce(() => {
                        for (let j in data.res_list[i]) {
                            if (parseInt(i) > 0) {
                                if (this.gameMain.gemPidList[j] != data.res_list[i][j]) {
                                    this.gameMain.levelDown(data.game_level_num, parseInt(j), data.res_list[i][j]);
                                }
                            } else {
                                this.gameMain.levelDown(data.game_level_num, parseInt(j), data.res_list[i][j]);
                            }
                        }
                        if (!!data.res_list[i] && data.res_list[i].length > 0) {
                            this.scheduleOnce(() => {
                                this.gameMain.audio.playLandAudio();
                            }, 0.7)
                        }

                        this.gameMain.scheduleOnce(() => {
                            for (let j in data.win_temp_list[i]) {
                                this.gameMain.gemBoo(data.win_temp_list[i][j]);
                            }
                            if (!!data.win_temp_list[i] && data.win_temp_list[i].length > 0) {
                                this.gameMain.audio.playBoo();
                            }
                        }, 1);
                        this.gameMain.scheduleOnce(() => {
                            this.gameMain.cleanBoo(data.game_level_num);
                        }, 1.6);
                    }, parseInt(i) * 1.8);
                }
                this.gameMain.scheduleOnce(() => {
                    this.gameMain.tmOffset = true;
                    this.gameMain.startBtn.interactable = true;
                    this.gameMain.tuoguan && !data.is_big_win && this.gameMain.startGame();
                    this.gameMain.lblCoin.string = Helper.fixNum(data.user_game_dict.big_win_score);
                    this.gameMain.lblAllCoin.string = Helper.fixNum(data.user_score);
                    if (data.user_game_dict.game_level_num != this.gameMain.level) {
                        this.gameMain.setLevel(data.user_game_dict.game_level_num);
                    }
                    if (data.is_big_win) {
                        if (this.gameMain.tuoguan) {
                            this.gameMain.tuoguan = !this.gameMain.tuoguan;
                            this.gameMain.tuoguanList[0].active = !this.gameMain.tuoguan;
                            this.gameMain.tuoguanList[1].active = this.gameMain.tuoguan;
                        }
                        this.gameMain.setBox(...data.big_win);
                    }
                }, data.res_list.length * 1.8)
            } else if (result.ResultCode == -2) {
                this.gameMain.showTip('游戏币不足');
                this.gameMain.startBtn.interactable = true;
                this.gameMain.tmOffset = true;
                if (this.gameMain.tuoguan) {
                    this.gameMain.tuoguan = !this.gameMain.tuoguan;
                    this.gameMain.tuoguanList[0].active = !this.gameMain.tuoguan;
                    this.gameMain.tuoguanList[1].active = this.gameMain.tuoguan;
                }
            }
        })
    },

    changeResultJSON_Function(ret) {
        if (cc.sys.isNative) {
            return JSON.parse(ret);
        }
        return ret;
    },
});