"use strict";
cc._RF.push(module, '00ccfsIB4dN3ZpJBl2r4+jp', 'yadaxiao_game_lan');
// scripts/three_languages/set_languages/yadaxiao_game_lan.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Language;
(function (Language) {
    Language["ZH"] = "txt.zh";
    Language["VN"] = "txt.vn";
    Language["EN"] = "txt.en";
})(Language || (Language = {}));
var yadaxiao_game_lan = /** @class */ (function (_super) {
    __extends(yadaxiao_game_lan, _super);
    function yadaxiao_game_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '请先先择一次大小',
            1: '上限：',
            2: '压大：',
            3: '上限：',
            4: '压小：',
            5: '等待中。。。',
            6: '抢庄数值',
            7: '在线人数:0',
            8: '下注人数:0',
            9: '请先先择一次大小',
            10: '本局您的上庄金币',
            11: '您本局的上装分数是',
            12: '本局您的金币',
            13: '本局您共下注大',
            14: '本局您共下注小',
            15: '本局结果  ?',
            16: '账号',
            17: '金币',
            18: '请填写金币数',
            19: '开始抢庄',
            20: '快压范围：1-1000',
            21: '抢庄范围：10万-30万',
            22: '富豪榜',
            23: '停止下注',
            24: '开始下注'
        };
        _this.enLanguage = {
            0: 'Please select a size first ',
            1: 'Upper limit: ',
            2: 'Press big: ',
            3: 'Upper limit: ',
            4: 'Press small: ',
            5: 'Waiting... ',
            6: 'snatch value ',
            7: 'Number of people online :0',
            8: 'Number of bets :0',
            9: 'Please choose a size first ',
            10: 'This is your gold coin ',
            11: 'Your top score in this bureau is ',
            12: 'This bureau your gold coin ',
            13: 'You bet big in this game ',
            14: 'This board you total bet small ',
            15: 'This bureau result? ',
            16: 'Account number ',
            17: 'Gold coin ',
            18: 'Please fill in the number of gold coins ',
            19: 'Start robbing ',
            20: 'Fast pressure range: 1-1000',
            21: 'Robbery range: 100,000-300,000 ',
            22: 'Rich List ',
            23: 'Stop betting ',
            24: 'Start betting'
        };
        _this.inLanguage = {
            0: 'silakan pilih ukuran pertama ',
            1: 'batas atas: ',
            2: 'tekan besar: ',
            3: 'batas atas: ',
            4: 'tekan kecil: ',
            5: 'menunggu … ',
            6: 'rebut nilai ',
            7: 'jumlah orang online :0',
            8: 'jumlah taruhan :0',
            9: 'pilihlah ukuran yang pertama ',
            10: 'ini adalah uang logam emasmu ',
            11: 'skor utama anda di biro ini adalah ',
            12: 'biro ini koin emasmu ',
            13: 'anda bertaruh besar dalam permainan ini ',
            14: 'papan ini taruhannya kecil ',
            15: 'hasil dari biro ini? ',
            16: 'nomor rekening ',
            17: 'koin emas ',
            18: 'silakan isi jumlah koin emas ',
            19: 'mulai merampok ',
            20: 'kisaran tekanan cepat: 1-1000',
            21: 'kisaran perampokan: 100.000 — 300.000 ',
            22: 'daftar kaya ',
            23: 'Stop betting ',
            24: 'mulai bertaruh'
        };
        return _this;
    }
    yadaxiao_game_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_8) {
            window.globalData_8 = {};
        }
        window.globalData_8.labelArr = this.labelArr;
        window.globalData_8.spriteArr = this.spriteArr;
        window.globalData_8.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_8.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_8.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    yadaxiao_game_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('yadaxiao_game_lan');
        var globalLabelArr = window.globalData_8.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_8.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_8.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_8.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_8.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
        var language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;
        var languageObj = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                break;
        }
        this.labelArr.forEach(function (label, index) {
            label.string = languageObj[index] || '';
        });
    };
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], yadaxiao_game_lan.prototype, "labelArr", void 0);
    yadaxiao_game_lan = __decorate([
        ccclass
    ], yadaxiao_game_lan);
    return yadaxiao_game_lan;
}(cc.Component));
exports.default = yadaxiao_game_lan;

cc._RF.pop();