cc.Class({
    extends: cc.Component,

    properties: {
        bgmAudio: {
            type: cc.AudioClip,
            default: null,
        },
        btnAudio: {
            type: cc.AudioClip,
            default: null,
        },
        awardAudio: {
            type: cc.AudioClip,
            default: null,
        },
        booAudio: {
            type: cc.AudioClip,
            default: null,
        },
        decBoxAudio: {
            type: cc.AudioClip,
            default: null,
        },
        landAudio: {
            type: cc.AudioClip,
            default: null,
        },
    },

    onLoad() {
        this.pInfo = require("PlayerInfo").getInstant;
    },

    stopAll() {
        cc.audioEngine.stopAll();
    },


    playBtn() {
        this.playEf(this.btnAudio);
    },

    playBgm() {
        if (this.pInfo.musicControl == 0) {
            return;
        }
        cc.audioEngine.play(this.bgmAudio, true);
    },

    playEf(clip) {
        if (this.pInfo.soundEffectControl == 0) {
            return;
        }
        cc.audioEngine.playEffect(clip);
    },

    playAward() {
        this.playEf(this.awardAudio);
    },

    playBoo() {
        this.playEf(this.booAudio);
    },

    playDecBox() {
        this.playEf(this.decBoxAudio);
    },
    playLandAudio() {
        this.playEf(this.landAudio);
    }
})