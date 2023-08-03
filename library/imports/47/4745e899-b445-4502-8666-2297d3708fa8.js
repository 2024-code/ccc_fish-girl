"use strict";
cc._RF.push(module, '4745eiZtEVFAoZmIpfTcI+o', 'HotUpdate_lan');
// scripts/three_languages/set_languages/HotUpdate_lan.ts

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
var HotUpdate_lan = /** @class */ (function (_super) {
    __extends(HotUpdate_lan, _super);
    function HotUpdate_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '确定',
            1: '提示',
            2: '确定',
            3: '游戏版本过低，更新失败。/d 请下载最新版本',
            4: '确认',
            5: '当前版本过低，请前往更新'
        };
        _this.enLanguage = {
            0: 'OK ',
            1: 'Prompt ',
            2: 'OK ',
            3: 'The game version is too low, the update failed. /d Please download the latest version ',
            4: 'Confirm ',
            5: 'The current version is too low, please go to update ',
        };
        _this.inLanguage = {
            0: 'OK ',
            1: 'cepat ',
            2: 'OK ',
            3: 'versi permainannya terlalu rendah, perbaruannya gagal. /d tolong download versi terbaru ',
            4: 'konfirmasi ',
            5: 'versi saat ini terlalu rendah, silakan beralih ke pemutakhiran ',
        };
        return _this;
    }
    HotUpdate_lan.prototype.start = function () {
        this.setLanguage();
    };
    HotUpdate_lan.prototype.setLanguage = function () {
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
    ], HotUpdate_lan.prototype, "labelArr", void 0);
    HotUpdate_lan = __decorate([
        ccclass
    ], HotUpdate_lan);
    return HotUpdate_lan;
}(cc.Component));
exports.default = HotUpdate_lan;

cc._RF.pop();