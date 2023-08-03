cc.Class({
    extends: cc.Component,

    properties: {
        id_lab: cc.Label,
        first_sp: cc.Sprite,
        second_sp: cc.Sprite,
        third_sp: cc.Sprite,
        spList: [cc.SpriteFrame]
    },

    initData(data) {
        let str = data.id.toString();
        this.id_lab.string = str.substring(str.length - 4, str.length);
        let result = JSON.parse(data.result_array);
        let winList = result.win_list;
        for (let i in winList) {
            if (winList[i] == 0) {
                this.first_sp.spriteFrame = this.spList[i];
            }
            if (winList[i] == 1) {
                this.second_sp.spriteFrame = this.spList[i];
            }
            if (winList[i] == 2) {
                this.third_sp.spriteFrame = this.spList[i];
            }
        }
    }
});
