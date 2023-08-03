cc.Class({
    extends: cc.Component,

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.gameMain = this.node.getComponent('SH_Main');
        this.sign = this.playerInfo.gameSign;
        this.userId = this.playerInfo.playerId;
        this.port = ':15201';
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
    //BetPool
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
            XYZB_LOBBYNET.disconnect();
            if (result.resultid) { //游戏登录成功
                this.userName = result.Obj.nickname;
                this.userCoin = result.Obj.score / 100;
                this.headUrl = result.Obj.headimgurl;
                this.gameTime = result.Obj.gameTime;
                this.gameMain.colorList = [...result.game_color_list];
                this.gameMain.showInfo();
                this.gameMain.loginInitColor();
                this.gameMain.showNextTime();
                this.socket.emit('getGameRecord');
            } else {
                cc.log(result.msg);
            }
        });

        this.socket.on("BetStart", ret => {
            let result = this.changeResultJSON_Function(ret);
            cc.log('BetStart:', result);
            this.gameMain.colorList = [...result.game_color_list];
            this.gameMain.betList = [...result.game_odd];
            this.socket.emit('getGameRecord');
            this.timer = new Date().getTime() / 1000;
            this.gameMain.startBets();
        });

        this.socket.on("OpenWinResult", ret => {
            cc.log('OpenWinResult:', ret);
            let result = this.changeResultJSON_Function(ret);
            if (result.ResultCode) {
                this.userCoin = result.score / 100;
                this.gameMain.getResult(result);
            }
        });

        this.socket.on("lotteryResult", ret => {
            cc.log('lotteryResult:', ret);
        });

        this.socket.on("BetPool", ret => {
            let result = this.changeResultJSON_Function(ret);
            console.log('BetPool' + JSON.stringify(result));
            let index = 0;
            for (let i in this.gameMain.otherOdd) {
                for (let j in this.gameMain.otherOdd[i]) {
                    this.gameMain.otherOdd[i][j] = result.result[index];
                    index++;
                }
            }
            this.gameMain.rfOdds();
        });

        this.socket.on("getGameRecordResult", ret => {
            cc.log('getGameRecordResult:', ret);
            let result = this.changeResultJSON_Function(ret);
            let historyList = this.gameMain.historyNode.children;
            for (let i in historyList) {
                historyList[i].active = false;
            }
            if (result.game_record.length > 0) {
                for (let i in result.game_record) {
                    let color = result.game_record[i].win_color;
                    let aid = result.game_record[i].win_card;
                    let sp = null;
                    if (color == 0) {
                        sp = this.gameMain.redAnimSp[aid];
                    } else if (color == 1) {
                        sp = this.gameMain.greenAnimSp[aid];
                    } else if (color == 2) {
                        sp = this.gameMain.yellowAnimSp[aid];
                    }
                    let j = result.game_record.length - 1 - i;
                    historyList[j].active = true;
                    historyList[j].getComponent(cc.Sprite).spriteFrame = sp;
                }
            }
        });

        this.socket.on("BetStop", ret => {
            cc.log('BetStop:', ret);
            this.gameMain.closeBets();
        });
    },

    changeResultJSON_Function(ret) {
        if (cc.sys.isNative) {
            return JSON.parse(ret);
        }
        return ret;
    },
});