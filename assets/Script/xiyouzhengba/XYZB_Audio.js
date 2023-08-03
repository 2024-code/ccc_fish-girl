cc.Class({
    extends: cc.Component,

    properties: {
        roleAudio: {
            type: cc.AudioClip,
            default: [],
        },
        wheelAudio: {
            type: cc.AudioClip,
            default: [],
        },
        bgmAudio: {
            type: cc.AudioClip,
            default: [],
        },
        betAudio: {
            type: cc.AudioClip,
            default: null,
        },
        clearbetAudio: {
            type: cc.AudioClip,
            default: null,
        },
        reBetAudio: {
            type: cc.AudioClip,
            default: null,
        },
        changeBetAudio: {
            type: cc.AudioClip,
            default: null,
        },
        specialAudio: {
            type: cc.AudioClip,
            default: null,
        },
    },

    onLoad() {
        this.gameMain = null;
        this.wheelId = 0;
        this.pInfo = require("PlayerInfo").getInstant;
    },

    stopAll() {
        cc.audioEngine.stopAll();
    },

    playWheel() {
        this.playEf(this.wheelAudio[this.wheelId]);
        this.wheelId++;
        if (this.wheelId > this.wheelAudio.length - 1) {
            this.wheelId = 0;
        }
    },

    playBet() {
        this.playEf(this.betAudio);
    },

    playReBet() {
        this.playEf(this.reBetAudio);
    },

    playClearBet() {
        this.playEf(this.clearbetAudio);
    },

    playChangeBet() {
        this.playEf(this.changeBetAudio);
    },

    playRoleAudio(r) {
        this.playEf(this.roleAudio[r]);
    },

    playSpecial() {
        this.playEf(this.specialAudio);
    },

    playBgm(id) {
        if (this.pInfo.musicControl == 0) {
            return;
        }
        cc.audioEngine.play(this.bgmAudio[id], true);
    },

    playEf(clip) {
        if (this.pInfo.soundEffectControl == 0) {
            return;
        }
        cc.audioEngine.playEffect(clip);
    }
})