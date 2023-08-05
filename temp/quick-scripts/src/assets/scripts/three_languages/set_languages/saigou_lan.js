"use strict";
cc._RF.push(module, '7f5154UAJNGrZIlpht188pe', 'saigou_lan');
// scripts/three_languages/set_languages/saigou_lan.ts

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
var saigou_lan = /** @class */ (function (_super) {
    __extends(saigou_lan, _super);
    function saigou_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '限注:1-10000',
            1: '当前下注',
            2: '金币',
            3: '规则',
            4: '音乐',
            5: '音效',
            6: '开奖记录',
            7: '游戏玩法',
            8: '请下住',
            9: '钱不够了',
            10: '显示号码',
            11: '显示大小',
            12: '显示单双',
        };
        _this.enLanguage = {
            0: 'Limited note :1-10000',
            1: 'Current bet ',
            2: 'Gold coin ',
            3: 'Rules ',
            4: 'Music ',
            5: 'Sound effects ',
            6: 'Lottery record ',
            7: 'Game play ',
            8: 'Please stay down ',
            9: 'Not enough money ',
            10: 'Show number ',
            11: 'Display size ',
            12: 'Show single and double ',
        };
        _this.inLanguage = {
            0: 'catatan terbatas: 1-10.000 ',
            1: 'taruhan saat ini ',
            2: 'koin emas ',
            3: 'aturan ',
            4: 'musik ',
            5: 'pengaruh suara ',
            6: 'rekor lotre ',
            7: 'permainan ',
            8: 'tetaplah berbaring ',
            9: 'tidak cukup uang ',
            10: 'nomor pertunjukan ',
            11: 'ukuran Display ',
            12: 'tampilkan tunggal dan ganda ',
        };
        return _this;
    }
    saigou_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_7) {
            window.globalData_7 = {};
        }
        window.globalData_7.labelArr = this.labelArr;
        window.globalData_7.spriteArr = this.spriteArr;
        window.globalData_7.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_7.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_7.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    saigou_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('saigou_lan');
        var globalLabelArr = window.globalData_7.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_7.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_7.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_7.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_7.spriteFrameArr_vn || [];
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
    ], saigou_lan.prototype, "labelArr", void 0);
    saigou_lan = __decorate([
        ccclass
    ], saigou_lan);
    return saigou_lan;
}(cc.Component));
exports.default = saigou_lan;

cc._RF.pop();