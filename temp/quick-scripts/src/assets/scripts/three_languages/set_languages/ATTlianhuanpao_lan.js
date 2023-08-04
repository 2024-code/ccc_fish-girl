"use strict";
cc._RF.push(module, 'beb2avIRrVAB6lorE8xTqT6', 'ATTlianhuanpao_lan');
// scripts/three_languages/set_languages/ATTlianhuanpao_lan.ts

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
var ATTlianhuanpao_lan = /** @class */ (function (_super) {
    __extends(ATTlianhuanpao_lan, _super);
    function ATTlianhuanpao_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.spriteArr = [];
        _this.spriteFrameArr_zh = [];
        _this.spriteFrameArr_en = [];
        _this.spriteFrameArr_vn = [];
        _this.beginSpriteArr_zh = [];
        _this.beginSpriteArr_en = [];
        _this.beginSpriteArr_vn = [];
        _this.zhLanguage = {
            0: '点击下注',
            1: '退出',
            2: '点击下注'
        };
        _this.enLanguage = {
            0: 'Click to bet ',
            1: 'Quit ',
            2: 'Click to bet'
        };
        _this.inLanguage = {
            0: 'klik dan bertaruh',
            1: 'keluar ',
            2: 'Klik untuk bertaruh'
        };
        return _this;
    }
    ATTlianhuanpao_lan.prototype.start = function () {
        this.setLanguage();
    };
    ATTlianhuanpao_lan.prototype.setLanguage = function () {
        var language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;
        var languageObj = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                for (var i = 0; i < this.spriteFrameArr_zh.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_zh[i];
                }
                this.beginArr.normalSprite = this.beginSpriteArr_zh[0];
                this.beginArr.pressedSprite = this.beginSpriteArr_zh[1];
                this.beginArr.hoverSprite = this.beginSpriteArr_zh[0];
                this.beginArr.disabledSprite = this.beginSpriteArr_zh[1];
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                for (var i = 0; i < this.spriteFrameArr_vn.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_vn[i];
                }
                this.beginArr.normalSprite = this.beginSpriteArr_vn[0];
                this.beginArr.pressedSprite = this.beginSpriteArr_vn[1];
                this.beginArr.hoverSprite = this.beginSpriteArr_vn[0];
                this.beginArr.disabledSprite = this.beginSpriteArr_vn[1];
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                for (var i = 0; i < this.spriteFrameArr_en.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_en[i];
                }
                this.beginArr.normalSprite = this.beginSpriteArr_en[0];
                this.beginArr.pressedSprite = this.beginSpriteArr_en[1];
                this.beginArr.hoverSprite = this.beginSpriteArr_en[0];
                this.beginArr.disabledSprite = this.beginSpriteArr_en[1];
                break;
        }
        this.labelArr.forEach(function (label, index) {
            label.string = languageObj[index] || '';
        });
    };
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], ATTlianhuanpao_lan.prototype, "labelArr", void 0);
    __decorate([
        property({ type: [cc.Sprite], tooltip: '替换的Sprite' })
    ], ATTlianhuanpao_lan.prototype, "spriteArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的中文图片' })
    ], ATTlianhuanpao_lan.prototype, "spriteFrameArr_zh", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的英文图片' })
    ], ATTlianhuanpao_lan.prototype, "spriteFrameArr_en", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的印尼图片' })
    ], ATTlianhuanpao_lan.prototype, "spriteFrameArr_vn", void 0);
    __decorate([
        property({ type: cc.Button, tooltip: '开始按钮' })
    ], ATTlianhuanpao_lan.prototype, "beginArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '开始的Sprite中文贴图' })
    ], ATTlianhuanpao_lan.prototype, "beginSpriteArr_zh", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '开始的Sprite英文贴图' })
    ], ATTlianhuanpao_lan.prototype, "beginSpriteArr_en", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '开始的Sprite印尼贴图' })
    ], ATTlianhuanpao_lan.prototype, "beginSpriteArr_vn", void 0);
    ATTlianhuanpao_lan = __decorate([
        ccclass
    ], ATTlianhuanpao_lan);
    return ATTlianhuanpao_lan;
}(cc.Component));
exports.default = ATTlianhuanpao_lan;

cc._RF.pop();