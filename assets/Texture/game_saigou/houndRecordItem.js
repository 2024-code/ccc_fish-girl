cc.Class({
    extends: cc.Component,

    properties: {
        Label_Time: {
            default: null,
            type: cc.Label,
            tooltip: "开奖时间",
        },
        Label_Number: {
            default: null,
            type: cc.Label,
            tooltip: "开奖期数",
        },
        Sprite_1st: {
            default: null,
            type: cc.Sprite,
            tooltip: "第一名的Sprite",
        },
        Sprite_2nd: {
            default: null,
            type: cc.Sprite,
            tooltip: "第二名的Sprite",
        },
        Sprite_3rd: {
            default: null,
            type: cc.Sprite,
            tooltip: "第三名的Sprite",
        },
        Sprite_4th: {
            default: null,
            type: cc.Sprite,
            tooltip: "第四名的Sprite",
        },
        Sprite_5th: {
            default: null,
            type: cc.Sprite,
            tooltip: "第五名的Sprite",
        },
        Sprite_6th: {
            default: null,
            type: cc.Sprite,
            tooltip: "第六名的Sprite",
        },
        SpriteFrameArray: {
            default: [],
            type: [cc.SpriteFrame],
            tooltip: "号码和大小单双图标资源的数组",
        },
    },

    SetData: function (record) {
        this.Label_Number.string = record.nRound.lo;//期数
        //时间
        var date = new Date(record.nTime.lo * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        this.Label_Time.string = Y + M + D + h + m + s;
        //图标
        var rankArray = record.nResultList;
        this._haoMaIndex = [rankArray[0], rankArray[1], rankArray[2], rankArray[3], rankArray[4], rankArray[5]];
        this._daXiaoIndex = new Array(6);
        this._danShuangIndex = new Array(6);
        for (var i = 0; i < 6; i++) {
            switch (rankArray[i]) {
                case 0:
                    this._daXiaoIndex[i] = 7;
                    this._danShuangIndex[i] = 8;
                    break;
                case 1:
                    this._daXiaoIndex[i] = 7;
                    this._danShuangIndex[i] = 9;
                    break;
                case 2:
                    this._daXiaoIndex[i] = 7;
                    this._danShuangIndex[i] = 8;
                    break;
                case 3:
                    this._daXiaoIndex[i] = 6;
                    this._danShuangIndex[i] = 9;
                    break;
                case 4:
                    this._daXiaoIndex[i] = 6;
                    this._danShuangIndex[i] = 8;
                    break;
                case 5:
                    this._daXiaoIndex[i] = 6;
                    this._danShuangIndex[i] = 9;
                    break;
            }
        }
        this.ShowHaoMa();
    },

    ShowHaoMa: function () {
        this.Sprite_1st.spriteFrame = this.SpriteFrameArray[this._haoMaIndex[0]];
        this.Sprite_2nd.spriteFrame = this.SpriteFrameArray[this._haoMaIndex[1]];
        this.Sprite_3rd.spriteFrame = this.SpriteFrameArray[this._haoMaIndex[2]];
        this.Sprite_4th.spriteFrame = this.SpriteFrameArray[this._haoMaIndex[3]];
        this.Sprite_5th.spriteFrame = this.SpriteFrameArray[this._haoMaIndex[4]];
        this.Sprite_6th.spriteFrame = this.SpriteFrameArray[this._haoMaIndex[5]];
    },

    ShowDaXiao: function () {
        this.Sprite_1st.spriteFrame = this.SpriteFrameArray[this._daXiaoIndex[0]];
        this.Sprite_2nd.spriteFrame = this.SpriteFrameArray[this._daXiaoIndex[1]];
        this.Sprite_3rd.spriteFrame = this.SpriteFrameArray[this._daXiaoIndex[2]];
        this.Sprite_4th.spriteFrame = this.SpriteFrameArray[this._daXiaoIndex[3]];
        this.Sprite_5th.spriteFrame = this.SpriteFrameArray[this._daXiaoIndex[4]];
        this.Sprite_6th.spriteFrame = this.SpriteFrameArray[this._daXiaoIndex[5]];
    },

    ShowDanShuang: function () {
        this.Sprite_1st.spriteFrame = this.SpriteFrameArray[this._danShuangIndex[0]];
        this.Sprite_2nd.spriteFrame = this.SpriteFrameArray[this._danShuangIndex[1]];
        this.Sprite_3rd.spriteFrame = this.SpriteFrameArray[this._danShuangIndex[2]];
        this.Sprite_4th.spriteFrame = this.SpriteFrameArray[this._danShuangIndex[3]];
        this.Sprite_5th.spriteFrame = this.SpriteFrameArray[this._danShuangIndex[4]];
        this.Sprite_6th.spriteFrame = this.SpriteFrameArray[this._danShuangIndex[5]];
    },
});