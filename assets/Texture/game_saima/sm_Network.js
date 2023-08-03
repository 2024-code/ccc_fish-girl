cc.Class({
    extends: cc.Component,

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.gameMain = this.node.getComponent('saima');
        this.sign = this.playerInfo.gameSign;
        this.userId = this.playerInfo.playerId;
        this.port = ':16006';
        this.time_betClose = 0;
        this.time_openPrice = 0;
        this.time_oneGame = 0;
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
            if (result.resultid) { //游戏登录成功
                this.userName = result.Obj.nickname;
                this.userCoin = result.Obj.score / this.playerInfo.exchangeRate;
                this.headUrl = result.Obj.headimgurl;
                this.time_betClose = result.Obj.time_betClose;
                this.time_openPrice = result.Obj.time_openPrice;
                this.time_oneGame = result.Obj.time_oneGame;
                this.gameMain.showInfo(result.Obj);
                this.socket.emit('getGameRecord');
            } else {
                cc.log(result.msg);
            }
        });

        this.socket.on("BetStart", ret => {
            let result = this.changeResultJSON_Function(ret);
            cc.log('BetStart:', result);
            this.socket.emit('getGameRecord');
            this.gameMain.startBets(result.obj);
        });

        this.socket.on("OpenWinResult", ret => {
            cc.log('OpenWinResult:', ret);
            let result = this.changeResultJSON_Function(ret);
            if (result.ResultCode) {
                this.userCoin = result.score / this.playerInfo.exchangeRate;
                this.gameMain.getResult(result);
            }
        });

        this.socket.on("lotteryResult", ret => {
            cc.log('lotteryResult:', ret);
        });

        this.socket.on("BetPool", ret => {
            let result = this.changeResultJSON_Function(ret);
            // console.log('BetPool' + JSON.stringify(result));
            let index = 0;
            for (let i in this.gameMain.otherOdd) {
                for (let j in this.gameMain.otherOdd[i]) {
                    this.gameMain.otherOdd[i][j] = result.result[index];
                    index++;
                }
            }
        });

        this.socket.on("getGameRecordResult", ret => {
            cc.log('getGameRecordResult:', ret);
            let result = this.changeResultJSON_Function(ret);
            if (result.game_record.length > 0) {
                this.gameMain.gameRecord = result.game_record;
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