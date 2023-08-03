cc.Class({
    extends: cc.Component,

    properties: {
        roleAudio: {
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
        buttonAudio: {
            type: cc.AudioClip,
            default: null,
        },
        startBetAudio: {
            type: cc.AudioClip,
            default: null,
        },
        dingAudio: {
            type: cc.AudioClip,
            default: null,
        }
    },

    onLoad() {
        this.gameMain = null;
        this.wheelId = 0;
        this.pInfo = require("PlayerInfo").getInstant;
    },

    start() {
        cc.audioEngine.stopAll();
        this.playBgm(0);
    },

    playBgm(id) {
        if (this.pInfo.musicControl == 0) {
            return;
        }
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.bgmAudio[id], true);
    },

    playBet() {
        this.playEf(this.betAudio);
    },

    playButton() {
        this.playEf(this.buttonAudio);
    },

    playStartBet() {
        this.playEf(this.startBetAudio);
    },

    playDingAudio() {
        this.playEf(this.dingAudio);
    },

    playEf(clip) {
        if (this.pInfo.soundEffectControl == 0) {
            return;
        }
        cc.audioEngine.playEffect(clip);
    }
})