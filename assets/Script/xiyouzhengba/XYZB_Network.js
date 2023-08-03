cc.Class({
    extends: cc.Component,

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.gameMain = this.node.getComponent('XYZB_Main');
        this.sign = this.playerInfo.gameSign;
        this.userId = this.playerInfo.playerId;
        this.port = ':16001';
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
            this.userName = result.Obj.nickname;
            this.userCoin = result.Obj.score / 100;
            this.headUrl = result.Obj.headimgurl;
            XYZB_LOBBYNET.disconnect();
            if (result.resultid) { //游戏登录成功
                this.gameMain.showInfo();
                this.socket.emit('getGameRecord');
            } else {
                cc.log(result.msg);
            }
        });

        this.socket.on("BetStart", ret => {
            cc.log('BetStart:', ret);
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
            let result = this.changeResultJSON_Function(ret);
            if (result.ResultCode) {

            }
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
                    let winN = result.game_record[i].win_num[0];
                    winN = (winN == 0 || winN == 13) ? result.game_record[i].win_num[1] : winN;
                    let zxh = result.game_record[i].win_special_num;
                    historyList[i].active = true;
                    historyList[i].getComponent(cc.Sprite).spriteFrame = this.gameMain.cartoonSp[winN];
                    historyList[i].getChildByName('icon_he').getComponent(cc.Sprite).spriteFrame = this.gameMain.zxhSp[zxh];
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