cc.Class({
    extends: cc.Component,

    properties: {
        bgmAudio: {
            type: cc.AudioClip,
            default: null,
        },

        flyInAudio: {
            type: cc.AudioClip,
            default: null,
        },

        buttonAudio: {
            type: cc.AudioClip,
            default: null,
        },

        delAudio: {
            type: cc.AudioClip,
            default: null,
        },

    },

    onLoad() {
        this.pInfo = require("PlayerInfo").getInstant;
    },

    start() {
        cc.audioEngine.stopAll();
        this.playBgm();
    },

    stopAudio() {
        cc.audioEngine.stopAll();
    },

    playBgm() {
        if (this.pInfo.musicControl == 0) {
            return;
        }
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.bgmAudio, true);
    },

    playEf(clip) {
        if (this.pInfo.soundEffectControl == 0) {
            return;
        }
        cc.audioEngine.playEffect(clip);
    },

    playBtnEf(){
        this.playEf(this.buttonAudio);
    },

    playFlyInEf(){
        this.playEf(this.flyInAudio);
    },

    playDelEf(){
        this.playEf(this.delAudio);
    },
})