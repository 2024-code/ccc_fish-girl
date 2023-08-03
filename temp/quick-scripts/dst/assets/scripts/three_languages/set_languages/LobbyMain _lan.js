
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/LobbyMain _lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92de6Ac7AVGArQl2jPLMK6H', 'LobbyMain _lan');
// scripts/three_languages/set_languages/LobbyMain _lan.ts

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
            18: '确认密码'
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
            18: 'Confirm password'
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
            18: 'konfirmasi sandi'
        };
        return _this;
    }
    yadaxiao_game_lan.prototype.start = function () {
        this.setLanguage();
    };
    yadaxiao_game_lan.prototype.setLanguage = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxMb2JieU1haW4gX2xhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDVCx5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFHRDtJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQStGQztRQTVGRyxjQUFRLEdBQWUsRUFBRSxDQUFDO1FBRTFCLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxPQUFPO1lBQ1YsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxNQUFNO1lBQ1QsQ0FBQyxFQUFFLE9BQU87WUFDVixDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxNQUFNO1lBQ1QsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxLQUFLO1lBQ1IsRUFBRSxFQUFFLFFBQVE7WUFDWixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxPQUFPO1lBQ1gsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxNQUFNO1NBQ2IsQ0FBQztRQUVGLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSw2QkFBNkI7WUFDaEMsQ0FBQyxFQUFFLGdCQUFnQjtZQUNuQixDQUFDLEVBQUUsb0JBQW9CO1lBQ3ZCLENBQUMsRUFBRSxtQkFBbUI7WUFDdEIsQ0FBQyxFQUFFLHlCQUF5QjtZQUM1QixDQUFDLEVBQUUsOEJBQThCO1lBQ2pDLENBQUMsRUFBRSxpQkFBaUI7WUFDcEIsQ0FBQyxFQUFFLFdBQVc7WUFDZCxDQUFDLEVBQUUseUJBQXlCO1lBQzVCLENBQUMsRUFBRSxnQkFBZ0I7WUFDbkIsRUFBRSxFQUFFLDZCQUE2QjtZQUNqQyxFQUFFLEVBQUUsV0FBVztZQUNmLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsRUFBRSxFQUFFLFdBQVc7WUFDZixFQUFFLEVBQUUsZ0JBQWdCO1lBQ3BCLEVBQUUsRUFBRSxPQUFPO1lBQ1gsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixFQUFFLEVBQUUsb0JBQW9CO1lBQ3hCLEVBQUUsRUFBRSxrQkFBa0I7U0FDekIsQ0FBQztRQUVGLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxtQkFBbUI7WUFDdEIsQ0FBQyxFQUFFLGVBQWU7WUFDbEIsQ0FBQyxFQUFFLGtCQUFrQjtZQUNyQixDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENBQUMsRUFBRSx5QkFBeUI7WUFDNUIsQ0FBQyxFQUFFLDJCQUEyQjtZQUM5QixDQUFDLEVBQUUsaUJBQWlCO1lBQ3BCLENBQUMsRUFBRSxXQUFXO1lBQ2QsQ0FBQyxFQUFFLHdCQUF3QjtZQUMzQixDQUFDLEVBQUUsZUFBZTtZQUNsQixFQUFFLEVBQUUsZ0NBQWdDO1lBQ3BDLEVBQUUsRUFBRSxRQUFRO1lBQ1osRUFBRSxFQUFFLHNCQUFzQjtZQUMxQixFQUFFLEVBQUUsV0FBVztZQUNmLEVBQUUsRUFBRSx1QkFBdUI7WUFDM0IsRUFBRSxFQUFFLFdBQVc7WUFDZixFQUFFLEVBQUUsZUFBZTtZQUNuQixFQUFFLEVBQUUsa0JBQWtCO1lBQ3RCLEVBQUUsRUFBRSxrQkFBa0I7U0FDekIsQ0FBQzs7SUEwQk4sQ0FBQztJQXhCYSxpQ0FBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyx1Q0FBVyxHQUFuQjtRQUNJLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFFOUUsSUFBSSxXQUFXLEdBQThCLEVBQUUsQ0FBQztRQUNoRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLEVBQUU7Z0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLE1BQU07WUFDVixLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5QixNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUMsRUFBRTtnQkFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsTUFBTTtTQUNiO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztZQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBM0ZEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzt1REFDMUI7SUFIVCxpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQStGckM7SUFBRCx3QkFBQztDQS9GRCxBQStGQyxDQS9GOEMsRUFBRSxDQUFDLFNBQVMsR0ErRjFEO2tCQS9Gb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHlhZGF4aWFvX2dhbWVfbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+aJi+acuuWPt+azqOWGjCcsXHJcbiAgICAgICAgMTogJ+aJi+acuuWPtycsXHJcbiAgICAgICAgMjogJ+mqjOivgeeggScsXHJcbiAgICAgICAgMzogJ+ehruiupOWvhueggScsXHJcbiAgICAgICAgNDogJ+i+k+WFpeaJi+acuuWPtycsXHJcbiAgICAgICAgNTogJ+i+k+WFpemqjOivgeeggScsXHJcbiAgICAgICAgNjogJ+i+k+WFpeWvhueggScsXHJcbiAgICAgICAgNzogJ+azqOWGjCcsXHJcbiAgICAgICAgODogJ+WPkemAgemqjOivgeeggScsXHJcbiAgICAgICAgOTogJ+aJi+acuuWPtycsXHJcbiAgICAgICAgMTA6ICfor7fovpPlhaXmiYvmnLrlj7cnLFxyXG4gICAgICAgIDExOiAn5a+G56CBJyxcclxuICAgICAgICAxMjogJ+ivt+i+k+WFpeWvhueggScsXHJcbiAgICAgICAgMTM6ICfms6jlhownLFxyXG4gICAgICAgIDE0OiAn5ri45a6i55m75b2VJyxcclxuICAgICAgICAxNTogJ+eZu+W9lScsXHJcbiAgICAgICAgMTY6ICfmiYvmnLrlj7cnLFxyXG4gICAgICAgIDE3OiAn6aqM6K+B56CBJyxcclxuICAgICAgICAxODogJ+ehruiupOWvhueggSdcclxuICAgIH07XHJcblxyXG4gICAgZW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnTW9iaWxlIG51bWJlciByZWdpc3RyYXRpb24gJyxcclxuICAgICAgICAxOiAnTW9iaWxlIG51bWJlciAnLFxyXG4gICAgICAgIDI6ICdWZXJpZmljYXRpb24gY29kZSAnLFxyXG4gICAgICAgIDM6ICdDb25maXJtIHBhc3N3b3JkICcsXHJcbiAgICAgICAgNDogJ0VudGVyIHRoZSBwaG9uZSBudW1iZXIgJyxcclxuICAgICAgICA1OiAnRW50ZXIgdGhlIHZlcmlmaWNhdGlvbiBjb2RlICcsXHJcbiAgICAgICAgNjogJ0VudGVyIHBhc3N3b3JkICcsXHJcbiAgICAgICAgNzogJ1JlZ2lzdGVyICcsXHJcbiAgICAgICAgODogJ1NlbmQgdmVyaWZpY2F0aW9uIGNvZGUgJyxcclxuICAgICAgICA5OiAnTW9iaWxlIG51bWJlciAnLFxyXG4gICAgICAgIDEwOiAnUGxlYXNlIGVudGVyIG1vYmlsZSBudW1iZXIgJyxcclxuICAgICAgICAxMTogJ1Bhc3N3b3JkICcsXHJcbiAgICAgICAgMTI6ICdQbGVhc2UgZW50ZXIgcGFzc3dvcmQgJyxcclxuICAgICAgICAxMzogJ1JlZ2lzdGVyICcsXHJcbiAgICAgICAgMTQ6ICdWaXNpdG9yIGxvZ2luICcsXHJcbiAgICAgICAgMTU6ICdMb2dpbicsXHJcbiAgICAgICAgMTY6ICdNb2JpbGUgbnVtYmVyICcsXHJcbiAgICAgICAgMTc6ICdWZXJpZmljYXRpb24gY29kZSAnLFxyXG4gICAgICAgIDE4OiAnQ29uZmlybSBwYXNzd29yZCdcclxuICAgIH07XHJcblxyXG4gICAgaW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAncGxhdCBub21vciBtb2JpbCAnLFxyXG4gICAgICAgIDE6ICdub21vciBwb25zZWwgJyxcclxuICAgICAgICAyOiAna29kZSB2ZXJpZmlrYXNpICcsXHJcbiAgICAgICAgMzogJ2tvbmZpcm1hc2kgc2FuZGkgJyxcclxuICAgICAgICA0OiAnbWFzdWtrYW4gbm9tb3IgdGVsZXBvbiAnLFxyXG4gICAgICAgIDU6ICdtYXN1a2thbiBrb2RlIHZlcmlmaWthc2kgJyxcclxuICAgICAgICA2OiAnbWFzdWtrYW4gc2FuZGkgJyxcclxuICAgICAgICA3OiAnUmVnaXN0ZXIgJyxcclxuICAgICAgICA4OiAna2lyaW0ga29kZSB2ZXJpZmlrYXNpICcsXHJcbiAgICAgICAgOTogJ25vbW9yIHBvbnNlbCAnLFxyXG4gICAgICAgIDEwOiAnc2lsYWthbiBtYXN1a2thbiBub21vciBwb25zZWwgJyxcclxuICAgICAgICAxMTogJ3NhbmRpICcsXHJcbiAgICAgICAgMTI6ICdtYXN1a2thbiBrYXRhIHNhbmRpICcsXHJcbiAgICAgICAgMTM6ICdSZWdpc3RlciAnLFxyXG4gICAgICAgIDE0OiAnbG9nIG1hc3VrIHBlbmd1bmp1bmcgJyxcclxuICAgICAgICAxNTogJ2xvZyBtYXN1aycsXHJcbiAgICAgICAgMTY6ICdub21vciBwb25zZWwgJyxcclxuICAgICAgICAxNzogJ2tvZGUgdmVyaWZpa2FzaSAnLFxyXG4gICAgICAgIDE4OiAna29uZmlybWFzaSBzYW5kaSdcclxuICAgIH07XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExhbmd1YWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpIHx8IExhbmd1YWdlLkVOO1xyXG5cclxuICAgICAgICBsZXQgbGFuZ3VhZ2VPYmo6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuWkg6XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuemhMYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlZOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmluTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5FTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5lbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhYmVsQXJyLmZvckVhY2goKGxhYmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYW5ndWFnZU9ialtpbmRleF0gfHwgJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19