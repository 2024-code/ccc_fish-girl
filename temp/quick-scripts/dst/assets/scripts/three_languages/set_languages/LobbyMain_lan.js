
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/LobbyMain_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxMb2JieU1haW5fbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQUdEO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBeUdDO1FBcEdHLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFFMUIsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLE9BQU87WUFDVixDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxPQUFPO1lBQ1YsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxPQUFPO1lBQ1YsQ0FBQyxFQUFFLEtBQUs7WUFDUixFQUFFLEVBQUUsUUFBUTtZQUNaLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLE9BQU87WUFDWCxFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUMsSUFBSTtTQUNWLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsNkJBQTZCO1lBQ2hDLENBQUMsRUFBRSxnQkFBZ0I7WUFDbkIsQ0FBQyxF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LENBQUMsU0FBUyxHQXlHdEQ7a0JBekdvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYmJ5TWFpbl9sYW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2U6IExvYmJ5TWFpbl9sYW4gPSBudWxsIGFzIHVua25vd24gYXMgTG9iYnlNYWluX2xhbjtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+aJi+acuuWPt+azqOWGjCcsXHJcbiAgICAgICAgMTogJ+aJi+acuuWPtycsXHJcbiAgICAgICAgMjogJ+mqjOivgeeggScsXHJcbiAgICAgICAgMzogJ+ehruiupOWvhueggScsXHJcbiAgICAgICAgNDogJ+i+k+WFpeaJi+acuuWPtycsXHJcbiAgICAgICAgNTogJ+i+k+WFpemqjOivgeeggScsXHJcbiAgICAgICAgNjogJ+i+k+WFpeWvhueggScsXHJcbiAgICAgICAgNzogJ+azqOWGjCcsXHJcbiAgICAgICAgODogJ+WPkemAgemqjOivgeeggScsXHJcbiAgICAgICAgOTogJ+aJi+acuuWPtycsXHJcbiAgICAgICAgMTA6ICfor7fovpPlhaXmiYvmnLrlj7cnLFxyXG4gICAgICAgIDExOiAn5a+G56CBJyxcclxuICAgICAgICAxMjogJ+ivt+i+k+WFpeWvhueggScsXHJcbiAgICAgICAgMTM6ICfms6jlhownLFxyXG4gICAgICAgIDE0OiAn5ri45a6i55m75b2VJyxcclxuICAgICAgICAxNTogJ+eZu+W9lScsXHJcbiAgICAgICAgMTY6ICfmiYvmnLrlj7cnLFxyXG4gICAgICAgIDE3OiAn6aqM6K+B56CBJyxcclxuICAgICAgICAxODogJ+ehruiupOWvhueggScsXHJcbiAgICAgICAgMTk6J+a0u+WKqCcsXHJcbiAgICB9O1xyXG5cclxuICAgIGVuTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ01vYmlsZSBudW1iZXIgcmVnaXN0cmF0aW9uICcsXHJcbiAgICAgICAgMTogJ01vYmlsZSBudW1iZXIgJyxcclxuICAgICAgICAyOiAnVmVyaWZpY2F0aW9uIGNvZGUgJyxcclxuICAgICAgICAzOiAnQ29uZmlybSBwYXNzd29yZCAnLFxyXG4gICAgICAgIDQ6ICdFbnRlciB0aGUgcGhvbmUgbnVtYmVyICcsXHJcbiAgICAgICAgNTogJ0VudGVyIHRoZSB2ZXJpZmljYXRpb24gY29kZSAnLFxyXG4gICAgICAgIDY6ICdFbnRlciBwYXNzd29yZCAnLFxyXG4gICAgICAgIDc6ICdSZWdpc3RlciAnLFxyXG4gICAgICAgIDg6ICdTZW5kIHZlcmlmaWNhdGlvbiBjb2RlICcsXHJcbiAgICAgICAgOTogJ01vYmlsZSBudW1iZXIgJyxcclxuICAgICAgICAxMDogJ1BsZWFzZSBlbnRlciBtb2JpbGUgbnVtYmVyICcsXHJcbiAgICAgICAgMTE6ICdQYXNzd29yZCAnLFxyXG4gICAgICAgIDEyOiAnUGxlYXNlIGVudGVyIHBhc3N3b3JkICcsXHJcbiAgICAgICAgMTM6ICdSZWdpc3RlciAnLFxyXG4gICAgICAgIDE0OiAnVmlzaXRvciBsb2dpbiAnLFxyXG4gICAgICAgIDE1OiAnTG9naW4nLFxyXG4gICAgICAgIDE2OiAnTW9iaWxlIG51bWJlciAnLFxyXG4gICAgICAgIDE3OiAnVmVyaWZpY2F0aW9uIGNvZGUgJyxcclxuICAgICAgICAxODogJ0NvbmZpcm0gcGFzc3dvcmQnLFxyXG4gICAgICAgIDE5OicgQWN0aXZpdHkgJ1xyXG4gICAgfTtcclxuXHJcbiAgICBpbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdwbGF0IG5vbW9yIG1vYmlsICcsXHJcbiAgICAgICAgMTogJ25vbW9yIHBvbnNlbCAnLFxyXG4gICAgICAgIDI6ICdrb2RlIHZlcmlmaWthc2kgJyxcclxuICAgICAgICAzOiAna29uZmlybWFzaSBzYW5kaSAnLFxyXG4gICAgICAgIDQ6ICdtYXN1a2thbiBub21vciB0ZWxlcG9uICcsXHJcbiAgICAgICAgNTogJ21hc3Vra2FuIGtvZGUgdmVyaWZpa2FzaSAnLFxyXG4gICAgICAgIDY6ICdtYXN1a2thbiBzYW5kaSAnLFxyXG4gICAgICAgIDc6ICdSZWdpc3RlciAnLFxyXG4gICAgICAgIDg6ICdraXJpbSBrb2RlIHZlcmlmaWthc2kgJyxcclxuICAgICAgICA5OiAnbm9tb3IgcG9uc2VsICcsXHJcbiAgICAgICAgMTA6ICdzaWxha2FuIG1hc3Vra2FuIG5vbW9yIHBvbnNlbCAnLFxyXG4gICAgICAgIDExOiAnc2FuZGkgJyxcclxuICAgICAgICAxMjogJ21hc3Vra2FuIGthdGEgc2FuZGkgJyxcclxuICAgICAgICAxMzogJ1JlZ2lzdGVyICcsXHJcbiAgICAgICAgMTQ6ICdsb2cgbWFzdWsgcGVuZ3VuanVuZyAnLFxyXG4gICAgICAgIDE1OiAnbG9nIG1hc3VrJyxcclxuICAgICAgICAxNjogJ25vbW9yIHBvbnNlbCAnLFxyXG4gICAgICAgIDE3OiAna29kZSB2ZXJpZmlrYXNpICcsXHJcbiAgICAgICAgMTg6ICdrb25maXJtYXNpIHNhbmRpJyxcclxuICAgIH07XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChMb2JieU1haW5fbGFuLkluc3RhbmNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIExvYmJ5TWFpbl9sYW4uSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGFuZ3VhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZExhbmd1YWdlJykgfHwgTGFuZ3VhZ2UuRU47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZU9iajogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5aSDpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy56aExhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuVk46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuaW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLkVOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmVuTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxBcnIuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGxhbmd1YWdlT2JqW2luZGV4XSB8fCAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=