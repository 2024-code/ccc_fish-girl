"use strict";
cc._RF.push(module, '92de6Ac7AVGArQl2jPLMK6H', 'LobbyMain_lan');
// scripts/three_languages/set_languages/LobbyMain_lan.ts

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
var LobbyMain_lan = /** @class */ (function (_super) {
    __extends(LobbyMain_lan, _super);
    function LobbyMain_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '手机号注册',
            1: '手机号',
            2: '验证码',
            3: '确认密码',
            4: '输入手机号',
            5: '输入验证码',
            6: '输入密码',
            7: '注册',
            8: '发送验证码',
            9: '手机号',
            10: '请输入手机号',
            11: '密码',
            12: '请输入密码',
            13: '注册',
            14: '游客登录',
            15: '登录',
            16: '手机号',
            17: '验证码',
            18: '确认密码',
            19: '活动',
        };
        _this.enLanguage = {
            0: 'Mobile number registration ',
            1: 'Mobile number ',
            2: 'Verification code ',
            3: 'Confirm password ',
            4: 'Enter the phone number ',
            5: 'Enter the verification code ',
            6: 'Enter password ',
            7: 'Register ',
            8: 'Send verification code ',
            9: 'Mobile number ',
            10: 'Please enter mobile number ',
            11: 'Password ',
            12: 'Please enter password ',
            13: 'Register ',
            14: 'Visitor login ',
            15: 'Login',
            16: 'Mobile number ',
            17: 'Verification code ',
            18: 'Confirm password',
            19: ' Activity '
        };
        _this.inLanguage = {
            0: 'plat nomor mobil ',
            1: 'nomor ponsel ',
            2: 'kode verifikasi ',
            3: 'konfirmasi sandi ',
            4: 'masukkan nomor telepon ',
            5: 'masukkan kode verifikasi ',
            6: 'masukkan sandi ',
            7: 'Register ',
            8: 'kirim kode verifikasi ',
            9: 'nomor ponsel ',
            10: 'silakan masukkan nomor ponsel ',
            11: 'sandi ',
            12: 'masukkan kata sandi ',
            13: 'Register ',
            14: 'log masuk pengunjung ',
            15: 'log masuk',
            16: 'nomor ponsel ',
            17: 'kode verifikasi ',
            18: 'konfirmasi sandi',
        };
        return _this;
    }
    LobbyMain_lan_1 = LobbyMain_lan;
    LobbyMain_lan.prototype.start = function () {
        if (LobbyMain_lan_1.Instance === null) {
            LobbyMain_lan_1.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
        this.setLanguage();
    };
    LobbyMain_lan.prototype.setLanguage = function () {
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
    var LobbyMain_lan_1;
    LobbyMain_lan.Instance = null;
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], LobbyMain_lan.prototype, "labelArr", void 0);
    LobbyMain_lan = LobbyMain_lan_1 = __decorate([
        ccclass
    ], LobbyMain_lan);
    return LobbyMain_lan;
}(cc.Component));
exports.default = LobbyMain_lan;

cc._RF.pop();