cc.Class({
    extends: cc.Component,

    onLoad() {
        this.mainObj = this.node.getComponent('TriangleMain');
        this.playerInfo = require("PlayerInfo").getInstant;
        this.audio = this.node.getComponent('TriangleAudio');

    },

    start() {
        this.url = Lhjconfig.Server_IP + ':15015';
        this.socket = io.connect(this.url);
        this.addEvent();
    },


    addEvent() {
        this.socket.on('connected', () => {
            this.socket.emit('LoginGame', JSON.stringify({
                userid: this.playerInfo.playerId,
                gametype: null,
                sign: this.playerInfo.gameSign
            }));
        });

        this.socket.on('loginGameResult', data => {
            data = this.changeResultJSON_Function(data);
            console.log('LoginGameResult:', data);
            this.socket.emit('LoginRoom');
            this.mainObj.moneyLbl.string = (data.Obj.score / 100).toFixed(2);
            window.TG_LOBBYNET.disconnect();
        });

        this.socket.on('lotteryResult', (data) => {
            data = this.changeResultJSON_Function(data);
            console.log('lotteryResult:', data);
            if (!!data.ResultCode && data.ResultCode == 1) {
                this.mainObj.moneyLbl.string = (this.mainObj.moneyLbl.string - this.mainObj.bet).toFixed(2);
                this.mainObj.awardLbl.string = '0.00';
                this.mainObj.awardPoorLbl.string = (data.ResultData.score_pool / 100).toFixed(2);
                this.mainObj.showUnit(data.ResultData.viewarray[0].res);
                if (data.ResultData.viewarray.length > 1) {
                    this.mainObj.wheelFunc(data.ResultData.viewarray, data, 0);
                } else {
                    this.scheduleOnce(() => {
                        this.mainObj.status = 0;
                        this.mainObj.awardLbl.string = (data.ResultData.winscore / 100).toFixed(2);
                        this.mainObj.moneyLbl.string = (data.ResultData.userscore / 100).toFixed(2);
                    }, 2.5);
                }
            }
        });

        this.socket.on('LoginRoomResult', (data) => {
            data = this.changeResultJSON_Function(data);
            console.log('LoginRoomResult', data);
            this.mainObj.awardPoorLbl.string = (data.ResultData.score_pool / 100).toFixed(2);
        });
    },

    changeResultJSON_Function(ret) {
        if (cc.sys.isNative) {
            return JSON.parse(ret);
        }
        return ret;
    },
});