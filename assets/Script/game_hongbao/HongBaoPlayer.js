
cc.Class({
    extends: cc.Component,

    properties: {
        headIco: cc.Sprite,
        lab_name: cc.Label,
        lab_coin: cc.Label,
        lab_packageMoney: cc.Label,
        lab_date: cc.Label,
    },

    onLoad() {
        this.pInfo = require("PlayerInfo").getInstant;
        this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
    },

    start() {
        Helper.loadHead(this.pInfo.playerHeadId, sp => {
            this.headIco.getComponent(cc.Sprite).spriteFrame = sp;
        });
        this.lab_name.string = this.pInfo.playerName;
        this.lab_coin && (this.lab_coin.string = (this.pInfo.playerCoin / this.pInfo.exchangeRate).toFixed(2));
    },

    updateView(data) {
        this.lab_coin.string = (data.ResultData.userscore / this.pInfo.exchangeRate).toFixed(2);
    },

    update(dt) {

    },
});
