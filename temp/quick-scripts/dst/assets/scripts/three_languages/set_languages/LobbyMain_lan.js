
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
            20: '发送验证码',
            21: '手机号',
            22: '游戏密码',
            23: '请输入手机号',
            24: '请输入游戏密码',
            25: '注册新游客',
            26: '确定',
            27: '温馨提示: \n\n 1.如果您的账号没转正，切换后游客账号将永久消失。\n\n 2.切换账号失败需要重装登录游戏。',
            28: '游戏旧密码:',
            29: '游戏新密码:',
            30: '确定新密码',
            31: '温馨提示：\n\n1.旧密码不能与新密码相同\n\n2.请尽量使用英文+数字组合，可区分大小写',
            32: '支付宝账号',
            33: '确定账号',
            34: '实名制名字',
            35: '存入',
            36: '取款',
            37: '赠送',
            38: '记录',
            39: '密码',
            40: '查询',
            41: '金币:',
            42: '存款:',
            43: '存入金额:',
            44: '请输入存入金币数',
            45: '重置',
            46: '全部',
            47: '存入',
            48: '银行',
            49: '金币:',
            50: '存款:',
            51: '取出金额:',
            52: '请输入取出金币数',
            53: '重置',
            54: '密码:',
            55: '请输入银行密码',
            56: '全部',
            57: '取出',
            58: '金币:',
            59: '存款：',
            60: '请输入赠送金币数',
            61: '请输入对方的玩家id',
            62: '重置',
            63: '玩家ID:',
            64: '赠送金额:',
            65: '银行密码：',
            66: '请输入银行密码',
            67: '赠送',
            68: '转入记录',
            69: '转出记录',
            70: '流水号',
            71: '游戏id',
            72: '转入数量',
            73: '转入日期',
            74: '流水号',
            75: '游戏id',
            76: '转出数量',
            77: '转出日期',
            78: '请输入原密码',
            79: '请输入新密码',
            80: '找回',
            81: '原银行密码:',
            82: '新密码:',
            83: '确认密码:',
            84: '请再次输入',
            85: '确定',
            86: '输入ID',
            87: '查询',
            88: '用户id',
            89: '金币数量',
            90: '用户ID:'
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
            15: 'Login ',
            16: 'Mobile number ',
            17: 'Verification code ',
            18: 'Confirm password ',
            19: 'Activity ',
            20: 'Send verification code ',
            21: 'Mobile number ',
            22: 'Game password ',
            23: 'Please enter mobile phone number ',
            24: 'Please enter game password ',
            25: 'Register New visitors ',
            26: 'OK ',
            27: 'Warm tips: \n\n 1. If your account is not converted, the tourist account will disappear permanently after switching. 2. Failure to switch accounts requires reinstallation to log in to the game. ',
            28: 'Game Old password :',
            29: 'Game New password :',
            30: 'Confirm new password ',
            31: 'Warm reminder: \n\n1. The old password cannot be the same as the new password \n\n2. Please try to use English + number combination, case sensitive ',
            32: 'Alipay Account ',
            33: 'Confirm account number ',
            34: 'Real name ',
            35: 'Deposit ',
            36: 'Withdrawal ',
            37: 'gifting ',
            38: 'Record ',
            39: 'Password ',
            40: 'Query ',
            41: 'Gold coins :',
            42: 'Deposit :',
            43: 'Deposit amount :',
            44: 'Please enter the number of coins deposited ',
            45: 'Reset ',
            46: 'All ',
            47: 'Deposit ',
            48: 'Bank ',
            49: 'Gold coins :',
            50: 'Deposit :',
            51: 'Withdrawal amount :',
            52: 'Please enter the number of gold coins withdrawn ',
            53: 'Reset ',
            54: 'Password :',
            55: 'Please enter your bank password ',
            56: 'All ',
            57: 'Take out ',
            58: 'Gold coins :',
            59: 'Deposit: ',
            60: 'Please enter the number of gold coins ',
            61: 'Please enter the other player id',
            62: 'Reset ',
            63: 'Player ID:',
            64: 'Gift amount :',
            65: 'Bank Password: ',
            66: 'Please enter your bank password ',
            67: 'gifting ',
            68: 'Transfer to record ',
            69: 'roll out record ',
            70: 'Serial number ',
            71: 'Game id',
            72: 'transfer quantity ',
            73: 'Transfer date ',
            74: 'Serial number ',
            75: 'Game id',
            76: 'Transfer quantity ',
            77: 'roll-out date ',
            78: 'Please enter old password ',
            79: 'Please enter a new password ',
            80: 'Retrieve ',
            81: 'Original bank password :',
            82: 'New password :',
            83: 'Confirm password :',
            84: 'Please enter again ',
            85: 'OK ',
            86: 'Enter ID',
            87: 'Query ',
            88: 'User id',
            89: 'gold coin quantity ',
            90: 'User ID:'
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
            15: 'masuk ',
            16: 'nomor ponsel ',
            17: 'kode verifikasi ',
            18: 'konfirmasi sandi ',
            19: 'kegiatan ',
            20: 'kirim kode verifikasi ',
            21: 'nomor ponsel ',
            22: 'sandi permainan ',
            23: 'silakan masukkan nomor ponsel ',
            24: 'silakan masukkan sandi permainan ',
            25: 'daftarkan tamu baru ',
            26: 'OK ',
            27: 'tips hangat: \n\n 1. Jika rekening anda tidak dikonversi, account wisata akan hilang secara permanen setelah beralih. 2.  Kegagalan untuk mengganti rekening menuntut pengembalian posisi untuk masuk ke permainan. ',
            28: 'sandi permainan lama :',
            29: 'sandi baru permainan :',
            30: 'konfirmasi password baru ',
            31: 'pengingat hangat: \n\n1. Sandi lama tidak bisa sama dengan sandi baru \n\n2. Silakan coba menggunakan bahasa inggris + nomor kombinasi, huruf sensitif ',
            32: 'rekening Alipay ',
            33: 'konfirmasi nomor rekening ',
            34: 'nama asli ',
            35: 'setorkan ',
            36: 'penarikan ',
            37: 'menghadiahkan ',
            38: 'rekor ',
            39: 'sandi ',
            40: 'Query ',
            41: 'koin emas :',
            42: 'setorkan :',
            43: 'jumlah uang muka :',
            44: 'tolong masukkan jumlah uang logam yang diendapkan ',
            45: 'Reset ',
            46: 'semua ',
            47: 'setorkan ',
            48: 'Bank ',
            49: 'koin emas :',
            50: 'setoran :',
            51: 'jumlah penarikan :',
            52: 'tolong masukkan jumlah koin emas yang ditarik ',
            53: 'atur kembali ',
            54: 'sandi :',
            55: 'silakan masukkan sandi bank anda ',
            56: 'semua ',
            57: 'ambil ',
            58: 'koin emas :',
            59: 'setorkan: ',
            60: 'silakan masukkan jumlah koin emas ',
            61: 'silakan masukkan identitas pemain lainnya ',
            62: 'Reset ',
            63: 'pemain ID:',
            64: 'jumlah hadiah :',
            65: 'sandi Bank: ',
            66: 'silakan masukkan sandi bank anda ',
            67: 'menghadiahi ',
            68: 'Transfer ke catatan ',
            69: 'roll out record ',
            70: 'nomor seri ',
            71: 'Game id',
            72: 'jumlah transfer ',
            73: 'Transfer date ',
            74: 'nomor seri ',
            75: 'permainan id',
            76: 'mentransfer kuantitas ',
            77: 'roll-out date ',
            78: 'silakan masukkan sandi lama ',
            79: 'tolong masukkan password baru ',
            80: 'ambil ',
            81: 'sandi asli bank :',
            82: 'sandi baru :',
            83: 'konfirmasi sandi :',
            84: 'tolong masukkan lagi ',
            85: 'OK ',
            86: 'masukkan ID',
            87: 'pertanyaan ',
            88: 'pengguna id',
            89: 'koin emas kuantitas ',
            90: 'pengguna ID:'
        };
        return _this;
    }
    LobbyMain_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData) {
            window.globalData = {};
        }
        window.globalData.labelArr = this.labelArr;
        window.globalData.spriteArr = this.spriteArr;
        window.globalData.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    LobbyMain_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('LobbyMain_lan');
        var globalLabelArr = window.globalData.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData.spriteFrameArr_vn || [];
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
        console.log(this.labelArr);
    };
    LobbyMain_lan.Instance = null;
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], LobbyMain_lan.prototype, "labelArr", void 0);
    LobbyMain_lan = __decorate([
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxMb2JieU1haW5fbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQVdEO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBc1ZDO1FBalZHLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFFMUIsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLE9BQU87WUFDVixDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxPQUFPO1lBQ1YsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxPQUFPO1lBQ1YsQ0FBQyxFQUFFLEtBQUs7WUFDUixFQUFFLEVBQUUsUUFBUTtZQUNaLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLE9BQU87WUFDWCxFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxPQUFPO1lBQ1gsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxRQUFRO1lBQ1osRUFBRSxFQUFFLFNBQVM7WUFDYixFQUFFLEVBQUUsT0FBTztZQUNYLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLDREQUE0RDtZQUNoRSxFQUFFLEVBQUUsUUFBUTtZQUNaLEVBQUUsRUFBRSxRQUFRO1lBQ1osRUFBRSxFQUFFLE9BQU87WUFDWCxFQUFFLEVBQUUsaURBQWlEO1lBQ3JELEVBQUUsRUFBRSxPQUFPO1lBQ1gsRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUUsT0FBTztZQUNYLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsT0FBTztZQUNYLEVBQUUsRUFBRSxVQUFVO1lBQ2QsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLE9BQU87WUFDWCxFQUFFLEVBQUUsVUFBVTtZQUNkLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsU0FBUztZQUNiLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLFVBQVU7WUFDZCxFQUFFLEVBQUUsWUFBWTtZQUNoQixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxPQUFPO1lBQ1gsRUFBRSxFQUFFLE9BQU87WUFDWCxFQUFFLEVBQUUsT0FBTztZQUNYLEVBQUUsRUFBRSxTQUFTO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsTUFB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QUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUs7WUFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQW5WYSxzQkFBUSxHQUFrQixJQUFnQyxDQUFDO0lBR3pFO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzttREFDMUI7SUFMVCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBc1ZqQztJQUFELG9CQUFDO0NBdFZELEFBc1ZDLENBdFYwQyxFQUFFLENBQUMsU0FBUyxHQXNWdEQ7a0JBdFZvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbmludGVyZmFjZSBHbG9iYWxEYXRhIHtcclxuICAgIGxhYmVsQXJyOiBjYy5MYWJlbFtdLFxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3poOiBjYy5TcHJpdGVGcmFtZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfZW46IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXVxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2JieU1haW5fbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlOiBMb2JieU1haW5fbGFuID0gbnVsbCBhcyB1bmtub3duIGFzIExvYmJ5TWFpbl9sYW47XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLkxhYmVsXSwgdG9vbHRpcDogJ+abv+aNoueahExhYmVsJyB9KVxyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10gPSBbXTtcclxuXHJcbiAgICB6aExhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICfmiYvmnLrlj7fms6jlhownLFxyXG4gICAgICAgIDE6ICfmiYvmnLrlj7cnLFxyXG4gICAgICAgIDI6ICfpqozor4HnoIEnLFxyXG4gICAgICAgIDM6ICfnoa7orqTlr4bnoIEnLFxyXG4gICAgICAgIDQ6ICfovpPlhaXmiYvmnLrlj7cnLFxyXG4gICAgICAgIDU6ICfovpPlhaXpqozor4HnoIEnLFxyXG4gICAgICAgIDY6ICfovpPlhaXlr4bnoIEnLFxyXG4gICAgICAgIDc6ICfms6jlhownLFxyXG4gICAgICAgIDg6ICflj5HpgIHpqozor4HnoIEnLFxyXG4gICAgICAgIDk6ICfmiYvmnLrlj7cnLFxyXG4gICAgICAgIDEwOiAn6K+36L6T5YWl5omL5py65Y+3JyxcclxuICAgICAgICAxMTogJ+WvhueggScsXHJcbiAgICAgICAgMTI6ICfor7fovpPlhaXlr4bnoIEnLFxyXG4gICAgICAgIDEzOiAn5rOo5YaMJyxcclxuICAgICAgICAxNDogJ+a4uOWuoueZu+W9lScsXHJcbiAgICAgICAgMTU6ICfnmbvlvZUnLFxyXG4gICAgICAgIDE2OiAn5omL5py65Y+3JyxcclxuICAgICAgICAxNzogJ+mqjOivgeeggScsXHJcbiAgICAgICAgMTg6ICfnoa7orqTlr4bnoIEnLFxyXG4gICAgICAgIDE5OiAn5rS75YqoJyxcclxuICAgICAgICAyMDogJ+WPkemAgemqjOivgeeggScsXHJcbiAgICAgICAgMjE6ICfmiYvmnLrlj7cnLFxyXG4gICAgICAgIDIyOiAn5ri45oiP5a+G56CBJyxcclxuICAgICAgICAyMzogJ+ivt+i+k+WFpeaJi+acuuWPtycsXHJcbiAgICAgICAgMjQ6ICfor7fovpPlhaXmuLjmiI/lr4bnoIEnLFxyXG4gICAgICAgIDI1OiAn5rOo5YaM5paw5ri45a6iJyxcclxuICAgICAgICAyNjogJ+ehruWumicsXHJcbiAgICAgICAgMjc6ICfmuKnppqjmj5DnpLo6IFxcblxcbiAxLuWmguaenOaCqOeahOi0puWPt+ayoei9rOato++8jOWIh+aNouWQjua4uOWuoui0puWPt+WwhuawuOS5hea2iOWkseOAglxcblxcbiAyLuWIh+aNoui0puWPt+Wksei0pemcgOimgemHjeijheeZu+W9lea4uOaIj+OAgicsXHJcbiAgICAgICAgMjg6ICfmuLjmiI/ml6flr4bnoIE6JyxcclxuICAgICAgICAyOTogJ+a4uOaIj+aWsOWvhueggTonLFxyXG4gICAgICAgIDMwOiAn56Gu5a6a5paw5a+G56CBJyxcclxuICAgICAgICAzMTogJ+a4qemmqOaPkOekuu+8mlxcblxcbjEu5pen5a+G56CB5LiN6IO95LiO5paw5a+G56CB55u45ZCMXFxuXFxuMi7or7flsL3ph4/kvb/nlKjoi7Hmlocr5pWw5a2X57uE5ZCI77yM5Y+v5Yy65YiG5aSn5bCP5YaZJyxcclxuICAgICAgICAzMjogJ+aUr+S7mOWunei0puWPtycsXHJcbiAgICAgICAgMzM6ICfnoa7lrprotKblj7cnLFxyXG4gICAgICAgIDM0OiAn5a6e5ZCN5Yi25ZCN5a2XJyxcclxuICAgICAgICAzNTogJ+WtmOWFpScsXHJcbiAgICAgICAgMzY6ICflj5bmrL4nLFxyXG4gICAgICAgIDM3OiAn6LWg6YCBJyxcclxuICAgICAgICAzODogJ+iusOW9lScsXHJcbiAgICAgICAgMzk6ICflr4bnoIEnLFxyXG4gICAgICAgIDQwOiAn5p+l6K+iJyxcclxuICAgICAgICA0MTogJ+mHkeW4gTonLFxyXG4gICAgICAgIDQyOiAn5a2Y5qy+OicsXHJcbiAgICAgICAgNDM6ICflrZjlhaXph5Hpop06JyxcclxuICAgICAgICA0NDogJ+ivt+i+k+WFpeWtmOWFpemHkeW4geaVsCcsXHJcbiAgICAgICAgNDU6ICfph43nva4nLFxyXG4gICAgICAgIDQ2OiAn5YWo6YOoJyxcclxuICAgICAgICA0NzogJ+WtmOWFpScsXHJcbiAgICAgICAgNDg6ICfpk7booYwnLFxyXG4gICAgICAgIDQ5OiAn6YeR5biBOicsXHJcbiAgICAgICAgNTA6ICflrZjmrL46JyxcclxuICAgICAgICA1MTogJ+WPluWHuumHkeminTonLFxyXG4gICAgICAgIDUyOiAn6K+36L6T5YWl5Y+W5Ye66YeR5biB5pWwJyxcclxuICAgICAgICA1MzogJ+mHjee9ricsXHJcbiAgICAgICAgNTQ6ICflr4bnoIE6JyxcclxuICAgICAgICA1NTogJ+ivt+i+k+WFpemTtuihjOWvhueggScsXHJcbiAgICAgICAgNTY6ICflhajpg6gnLFxyXG4gICAgICAgIDU3OiAn5Y+W5Ye6JyxcclxuICAgICAgICA1ODogJ+mHkeW4gTonLFxyXG4gICAgICAgIDU5OiAn5a2Y5qy+77yaJyxcclxuICAgICAgICA2MDogJ+ivt+i+k+WFpei1oOmAgemHkeW4geaVsCcsXHJcbiAgICAgICAgNjE6ICfor7fovpPlhaXlr7nmlrnnmoTnjqnlrrZpZCcsXHJcbiAgICAgICAgNjI6ICfph43nva4nLFxyXG4gICAgICAgIDYzOiAn546p5a62SUQ6JyxcclxuICAgICAgICA2NDogJ+i1oOmAgemHkeminTonLFxyXG4gICAgICAgIDY1OiAn6ZO26KGM5a+G56CB77yaJyxcclxuICAgICAgICA2NjogJ+ivt+i+k+WFpemTtuihjOWvhueggScsXHJcbiAgICAgICAgNjc6ICfotaDpgIEnLFxyXG4gICAgICAgIDY4OiAn6L2s5YWl6K6w5b2VJyxcclxuICAgICAgICA2OTogJ+i9rOWHuuiusOW9lScsXHJcbiAgICAgICAgNzA6ICfmtYHmsLTlj7cnLFxyXG4gICAgICAgIDcxOiAn5ri45oiPaWQnLFxyXG4gICAgICAgIDcyOiAn6L2s5YWl5pWw6YePJyxcclxuICAgICAgICA3MzogJ+i9rOWFpeaXpeacnycsXHJcbiAgICAgICAgNzQ6ICfmtYHmsLTlj7cnLFxyXG4gICAgICAgIDc1OiAn5ri45oiPaWQnLFxyXG4gICAgICAgIDc2OiAn6L2s5Ye65pWw6YePJyxcclxuICAgICAgICA3NzogJ+i9rOWHuuaXpeacnycsXHJcbiAgICAgICAgNzg6ICfor7fovpPlhaXljp/lr4bnoIEnLFxyXG4gICAgICAgIDc5OiAn6K+36L6T5YWl5paw5a+G56CBJyxcclxuICAgICAgICA4MDogJ+aJvuWbnicsXHJcbiAgICAgICAgODE6ICfljp/pk7booYzlr4bnoIE6JyxcclxuICAgICAgICA4MjogJ+aWsOWvhueggTonLFxyXG4gICAgICAgIDgzOiAn56Gu6K6k5a+G56CBOicsXHJcbiAgICAgICAgODQ6ICfor7flho3mrKHovpPlhaUnLFxyXG4gICAgICAgIDg1OiAn56Gu5a6aJyxcclxuICAgICAgICA4NjogJ+i+k+WFpUlEJyxcclxuICAgICAgICA4NzogJ+afpeivoicsXHJcbiAgICAgICAgODg6ICfnlKjmiLdpZCcsXHJcbiAgICAgICAgODk6ICfph5HluIHmlbDph48nLFxyXG4gICAgICAgIDkwOiAn55So5oi3SUQ6J1xyXG4gICAgfTtcclxuXHJcbiAgICBlbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdNb2JpbGUgbnVtYmVyIHJlZ2lzdHJhdGlvbiAnLFxyXG4gICAgICAgIDE6ICdNb2JpbGUgbnVtYmVyICcsXHJcbiAgICAgICAgMjogJ1ZlcmlmaWNhdGlvbiBjb2RlICcsXHJcbiAgICAgICAgMzogJ0NvbmZpcm0gcGFzc3dvcmQgJyxcclxuICAgICAgICA0OiAnRW50ZXIgdGhlIHBob25lIG51bWJlciAnLFxyXG4gICAgICAgIDU6ICdFbnRlciB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgJyxcclxuICAgICAgICA2OiAnRW50ZXIgcGFzc3dvcmQgJyxcclxuICAgICAgICA3OiAnUmVnaXN0ZXIgJyxcclxuICAgICAgICA4OiAnU2VuZCB2ZXJpZmljYXRpb24gY29kZSAnLFxyXG4gICAgICAgIDk6ICdNb2JpbGUgbnVtYmVyICcsXHJcbiAgICAgICAgMTA6ICdQbGVhc2UgZW50ZXIgbW9iaWxlIG51bWJlciAnLFxyXG4gICAgICAgIDExOiAnUGFzc3dvcmQgJyxcclxuICAgICAgICAxMjogJ1BsZWFzZSBlbnRlciBwYXNzd29yZCAnLFxyXG4gICAgICAgIDEzOiAnUmVnaXN0ZXIgJyxcclxuICAgICAgICAxNDogJ1Zpc2l0b3IgbG9naW4gJyxcclxuICAgICAgICAxNTogJ0xvZ2luICcsXHJcbiAgICAgICAgMTY6ICdNb2JpbGUgbnVtYmVyICcsXHJcbiAgICAgICAgMTc6ICdWZXJpZmljYXRpb24gY29kZSAnLFxyXG4gICAgICAgIDE4OiAnQ29uZmlybSBwYXNzd29yZCAnLFxyXG4gICAgICAgIDE5OiAnQWN0aXZpdHkgJyxcclxuICAgICAgICAyMDogJ1NlbmQgdmVyaWZpY2F0aW9uIGNvZGUgJyxcclxuICAgICAgICAyMTogJ01vYmlsZSBudW1iZXIgJyxcclxuICAgICAgICAyMjogJ0dhbWUgcGFzc3dvcmQgJyxcclxuICAgICAgICAyMzogJ1BsZWFzZSBlbnRlciBtb2JpbGUgcGhvbmUgbnVtYmVyICcsXHJcbiAgICAgICAgMjQ6ICdQbGVhc2UgZW50ZXIgZ2FtZSBwYXNzd29yZCAnLFxyXG4gICAgICAgIDI1OiAnUmVnaXN0ZXIgTmV3IHZpc2l0b3JzICcsXHJcbiAgICAgICAgMjY6ICdPSyAnLFxyXG4gICAgICAgIDI3OiAnV2FybSB0aXBzOiBcXG5cXG4gMS4gSWYgeW91ciBhY2NvdW50IGlzIG5vdCBjb252ZXJ0ZWQsIHRoZSB0b3VyaXN0IGFjY291bnQgd2lsbCBkaXNhcHBlYXIgcGVybWFuZW50bHkgYWZ0ZXIgc3dpdGNoaW5nLiAyLiBGYWlsdXJlIHRvIHN3aXRjaCBhY2NvdW50cyByZXF1aXJlcyByZWluc3RhbGxhdGlvbiB0byBsb2cgaW4gdG8gdGhlIGdhbWUuICcsXHJcbiAgICAgICAgMjg6ICdHYW1lIE9sZCBwYXNzd29yZCA6JyxcclxuICAgICAgICAyOTogJ0dhbWUgTmV3IHBhc3N3b3JkIDonLFxyXG4gICAgICAgIDMwOiAnQ29uZmlybSBuZXcgcGFzc3dvcmQgJyxcclxuICAgICAgICAzMTogJ1dhcm0gcmVtaW5kZXI6IFxcblxcbjEuIFRoZSBvbGQgcGFzc3dvcmQgY2Fubm90IGJlIHRoZSBzYW1lIGFzIHRoZSBuZXcgcGFzc3dvcmQgXFxuXFxuMi4gUGxlYXNlIHRyeSB0byB1c2UgRW5nbGlzaCArIG51bWJlciBjb21iaW5hdGlvbiwgY2FzZSBzZW5zaXRpdmUgJyxcclxuICAgICAgICAzMjogJ0FsaXBheSBBY2NvdW50ICcsXHJcbiAgICAgICAgMzM6ICdDb25maXJtIGFjY291bnQgbnVtYmVyICcsXHJcbiAgICAgICAgMzQ6ICdSZWFsIG5hbWUgJyxcclxuICAgICAgICAzNTogJ0RlcG9zaXQgJyxcclxuICAgICAgICAzNjogJ1dpdGhkcmF3YWwgJyxcclxuICAgICAgICAzNzogJ2dpZnRpbmcgJyxcclxuICAgICAgICAzODogJ1JlY29yZCAnLFxyXG4gICAgICAgIDM5OiAnUGFzc3dvcmQgJyxcclxuICAgICAgICA0MDogJ1F1ZXJ5ICcsXHJcbiAgICAgICAgNDE6ICdHb2xkIGNvaW5zIDonLFxyXG4gICAgICAgIDQyOiAnRGVwb3NpdCA6JyxcclxuICAgICAgICA0MzogJ0RlcG9zaXQgYW1vdW50IDonLFxyXG4gICAgICAgIDQ0OiAnUGxlYXNlIGVudGVyIHRoZSBudW1iZXIgb2YgY29pbnMgZGVwb3NpdGVkICcsXHJcbiAgICAgICAgNDU6ICdSZXNldCAnLFxyXG4gICAgICAgIDQ2OiAnQWxsICcsXHJcbiAgICAgICAgNDc6ICdEZXBvc2l0ICcsXHJcbiAgICAgICAgNDg6ICdCYW5rICcsXHJcbiAgICAgICAgNDk6ICdHb2xkIGNvaW5zIDonLFxyXG4gICAgICAgIDUwOiAnRGVwb3NpdCA6JyxcclxuICAgICAgICA1MTogJ1dpdGhkcmF3YWwgYW1vdW50IDonLFxyXG4gICAgICAgIDUyOiAnUGxlYXNlIGVudGVyIHRoZSBudW1iZXIgb2YgZ29sZCBjb2lucyB3aXRoZHJhd24gJyxcclxuICAgICAgICA1MzogJ1Jlc2V0ICcsXHJcbiAgICAgICAgNTQ6ICdQYXNzd29yZCA6JyxcclxuICAgICAgICA1NTogJ1BsZWFzZSBlbnRlciB5b3VyIGJhbmsgcGFzc3dvcmQgJyxcclxuICAgICAgICA1NjogJ0FsbCAnLFxyXG4gICAgICAgIDU3OiAnVGFrZSBvdXQgJyxcclxuICAgICAgICA1ODogJ0dvbGQgY29pbnMgOicsXHJcbiAgICAgICAgNTk6ICdEZXBvc2l0OiAnLFxyXG4gICAgICAgIDYwOiAnUGxlYXNlIGVudGVyIHRoZSBudW1iZXIgb2YgZ29sZCBjb2lucyAnLFxyXG4gICAgICAgIDYxOiAnUGxlYXNlIGVudGVyIHRoZSBvdGhlciBwbGF5ZXIgaWQnLFxyXG4gICAgICAgIDYyOiAnUmVzZXQgJyxcclxuICAgICAgICA2MzogJ1BsYXllciBJRDonLFxyXG4gICAgICAgIDY0OiAnR2lmdCBhbW91bnQgOicsXHJcbiAgICAgICAgNjU6ICdCYW5rIFBhc3N3b3JkOiAnLFxyXG4gICAgICAgIDY2OiAnUGxlYXNlIGVudGVyIHlvdXIgYmFuayBwYXNzd29yZCAnLFxyXG4gICAgICAgIDY3OiAnZ2lmdGluZyAnLFxyXG4gICAgICAgIDY4OiAnVHJhbnNmZXIgdG8gcmVjb3JkICcsXHJcbiAgICAgICAgNjk6ICdyb2xsIG91dCByZWNvcmQgJyxcclxuICAgICAgICA3MDogJ1NlcmlhbCBudW1iZXIgJyxcclxuICAgICAgICA3MTogJ0dhbWUgaWQnLFxyXG4gICAgICAgIDcyOiAndHJhbnNmZXIgcXVhbnRpdHkgJyxcclxuICAgICAgICA3MzogJ1RyYW5zZmVyIGRhdGUgJyxcclxuICAgICAgICA3NDogJ1NlcmlhbCBudW1iZXIgJyxcclxuICAgICAgICA3NTogJ0dhbWUgaWQnLFxyXG4gICAgICAgIDc2OiAnVHJhbnNmZXIgcXVhbnRpdHkgJyxcclxuICAgICAgICA3NzogJ3JvbGwtb3V0IGRhdGUgJyxcclxuICAgICAgICA3ODogJ1BsZWFzZSBlbnRlciBvbGQgcGFzc3dvcmQgJyxcclxuICAgICAgICA3OTogJ1BsZWFzZSBlbnRlciBhIG5ldyBwYXNzd29yZCAnLFxyXG4gICAgICAgIDgwOiAnUmV0cmlldmUgJyxcclxuICAgICAgICA4MTogJ09yaWdpbmFsIGJhbmsgcGFzc3dvcmQgOicsXHJcbiAgICAgICAgODI6ICdOZXcgcGFzc3dvcmQgOicsXHJcbiAgICAgICAgODM6ICdDb25maXJtIHBhc3N3b3JkIDonLFxyXG4gICAgICAgIDg0OiAnUGxlYXNlIGVudGVyIGFnYWluICcsXHJcbiAgICAgICAgODU6ICdPSyAnLFxyXG4gICAgICAgIDg2OiAnRW50ZXIgSUQnLFxyXG4gICAgICAgIDg3OiAnUXVlcnkgJyxcclxuICAgICAgICA4ODogJ1VzZXIgaWQnLFxyXG4gICAgICAgIDg5OiAnZ29sZCBjb2luIHF1YW50aXR5ICcsXHJcbiAgICAgICAgOTA6ICdVc2VyIElEOidcclxuICAgIH07XHJcblxyXG4gICAgaW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAncGxhdCBub21vciBtb2JpbCAnLFxyXG4gICAgICAgIDE6ICdub21vciBwb25zZWwgJyxcclxuICAgICAgICAyOiAna29kZSB2ZXJpZmlrYXNpICcsXHJcbiAgICAgICAgMzogJ2tvbmZpcm1hc2kgc2FuZGkgJyxcclxuICAgICAgICA0OiAnbWFzdWtrYW4gbm9tb3IgdGVsZXBvbiAnLFxyXG4gICAgICAgIDU6ICdtYXN1a2thbiBrb2RlIHZlcmlmaWthc2kgJyxcclxuICAgICAgICA2OiAnbWFzdWtrYW4gc2FuZGkgJyxcclxuICAgICAgICA3OiAnUmVnaXN0ZXIgJyxcclxuICAgICAgICA4OiAna2lyaW0ga29kZSB2ZXJpZmlrYXNpICcsXHJcbiAgICAgICAgOTogJ25vbW9yIHBvbnNlbCAnLFxyXG4gICAgICAgIDEwOiAnc2lsYWthbiBtYXN1a2thbiBub21vciBwb25zZWwgJyxcclxuICAgICAgICAxMTogJ3NhbmRpICcsXHJcbiAgICAgICAgMTI6ICdtYXN1a2thbiBrYXRhIHNhbmRpICcsXHJcbiAgICAgICAgMTM6ICdSZWdpc3RlciAnLFxyXG4gICAgICAgIDE0OiAnbG9nIG1hc3VrIHBlbmd1bmp1bmcgJyxcclxuICAgICAgICAxNTogJ21hc3VrICcsXHJcbiAgICAgICAgMTY6ICdub21vciBwb25zZWwgJyxcclxuICAgICAgICAxNzogJ2tvZGUgdmVyaWZpa2FzaSAnLFxyXG4gICAgICAgIDE4OiAna29uZmlybWFzaSBzYW5kaSAnLFxyXG4gICAgICAgIDE5OiAna2VnaWF0YW4gJyxcclxuICAgICAgICAyMDogJ2tpcmltIGtvZGUgdmVyaWZpa2FzaSAnLFxyXG4gICAgICAgIDIxOiAnbm9tb3IgcG9uc2VsICcsXHJcbiAgICAgICAgMjI6ICdzYW5kaSBwZXJtYWluYW4gJyxcclxuICAgICAgICAyMzogJ3NpbGFrYW4gbWFzdWtrYW4gbm9tb3IgcG9uc2VsICcsXHJcbiAgICAgICAgMjQ6ICdzaWxha2FuIG1hc3Vra2FuIHNhbmRpIHBlcm1haW5hbiAnLFxyXG4gICAgICAgIDI1OiAnZGFmdGFya2FuIHRhbXUgYmFydSAnLFxyXG4gICAgICAgIDI2OiAnT0sgJyxcclxuICAgICAgICAyNzogJ3RpcHMgaGFuZ2F0OiBcXG5cXG4gMS4gSmlrYSByZWtlbmluZyBhbmRhIHRpZGFrIGRpa29udmVyc2ksIGFjY291bnQgd2lzYXRhIGFrYW4gaGlsYW5nIHNlY2FyYSBwZXJtYW5lbiBzZXRlbGFoIGJlcmFsaWguIDIuICBLZWdhZ2FsYW4gdW50dWsgbWVuZ2dhbnRpIHJla2VuaW5nIG1lbnVudHV0IHBlbmdlbWJhbGlhbiBwb3Npc2kgdW50dWsgbWFzdWsga2UgcGVybWFpbmFuLiAnLFxyXG4gICAgICAgIDI4OiAnc2FuZGkgcGVybWFpbmFuIGxhbWEgOicsXHJcbiAgICAgICAgMjk6ICdzYW5kaSBiYXJ1IHBlcm1haW5hbiA6JyxcclxuICAgICAgICAzMDogJ2tvbmZpcm1hc2kgcGFzc3dvcmQgYmFydSAnLFxyXG4gICAgICAgIDMxOiAncGVuZ2luZ2F0IGhhbmdhdDogXFxuXFxuMS4gU2FuZGkgbGFtYSB0aWRhayBiaXNhIHNhbWEgZGVuZ2FuIHNhbmRpIGJhcnUgXFxuXFxuMi4gU2lsYWthbiBjb2JhIG1lbmdndW5ha2FuIGJhaGFzYSBpbmdncmlzICsgbm9tb3Iga29tYmluYXNpLCBodXJ1ZiBzZW5zaXRpZiAnLFxyXG4gICAgICAgIDMyOiAncmVrZW5pbmcgQWxpcGF5ICcsXHJcbiAgICAgICAgMzM6ICdrb25maXJtYXNpIG5vbW9yIHJla2VuaW5nICcsXHJcbiAgICAgICAgMzQ6ICduYW1hIGFzbGkgJyxcclxuICAgICAgICAzNTogJ3NldG9ya2FuICcsXHJcbiAgICAgICAgMzY6ICdwZW5hcmlrYW4gJyxcclxuICAgICAgICAzNzogJ21lbmdoYWRpYWhrYW4gJyxcclxuICAgICAgICAzODogJ3Jla29yICcsXHJcbiAgICAgICAgMzk6ICdzYW5kaSAnLFxyXG4gICAgICAgIDQwOiAnUXVlcnkgJyxcclxuICAgICAgICA0MTogJ2tvaW4gZW1hcyA6JyxcclxuICAgICAgICA0MjogJ3NldG9ya2FuIDonLFxyXG4gICAgICAgIDQzOiAnanVtbGFoIHVhbmcgbXVrYSA6JyxcclxuICAgICAgICA0NDogJ3RvbG9uZyBtYXN1a2thbiBqdW1sYWggdWFuZyBsb2dhbSB5YW5nIGRpZW5kYXBrYW4gJyxcclxuICAgICAgICA0NTogJ1Jlc2V0ICcsXHJcbiAgICAgICAgNDY6ICdzZW11YSAnLFxyXG4gICAgICAgIDQ3OiAnc2V0b3JrYW4gJyxcclxuICAgICAgICA0ODogJ0JhbmsgJyxcclxuICAgICAgICA0OTogJ2tvaW4gZW1hcyA6JyxcclxuICAgICAgICA1MDogJ3NldG9yYW4gOicsXHJcbiAgICAgICAgNTE6ICdqdW1sYWggcGVuYXJpa2FuIDonLFxyXG4gICAgICAgIDUyOiAndG9sb25nIG1hc3Vra2FuIGp1bWxhaCBrb2luIGVtYXMgeWFuZyBkaXRhcmlrICcsXHJcbiAgICAgICAgNTM6ICdhdHVyIGtlbWJhbGkgJyxcclxuICAgICAgICA1NDogJ3NhbmRpIDonLFxyXG4gICAgICAgIDU1OiAnc2lsYWthbiBtYXN1a2thbiBzYW5kaSBiYW5rIGFuZGEgJyxcclxuICAgICAgICA1NjogJ3NlbXVhICcsXHJcbiAgICAgICAgNTc6ICdhbWJpbCAnLFxyXG4gICAgICAgIDU4OiAna29pbiBlbWFzIDonLFxyXG4gICAgICAgIDU5OiAnc2V0b3JrYW46ICcsXHJcbiAgICAgICAgNjA6ICdzaWxha2FuIG1hc3Vra2FuIGp1bWxhaCBrb2luIGVtYXMgJyxcclxuICAgICAgICA2MTogJ3NpbGFrYW4gbWFzdWtrYW4gaWRlbnRpdGFzIHBlbWFpbiBsYWlubnlhICcsXHJcbiAgICAgICAgNjI6ICdSZXNldCAnLFxyXG4gICAgICAgIDYzOiAncGVtYWluIElEOicsXHJcbiAgICAgICAgNjQ6ICdqdW1sYWggaGFkaWFoIDonLFxyXG4gICAgICAgIDY1OiAnc2FuZGkgQmFuazogJyxcclxuICAgICAgICA2NjogJ3NpbGFrYW4gbWFzdWtrYW4gc2FuZGkgYmFuayBhbmRhICcsXHJcbiAgICAgICAgNjc6ICdtZW5naGFkaWFoaSAnLFxyXG4gICAgICAgIDY4OiAnVHJhbnNmZXIga2UgY2F0YXRhbiAnLFxyXG4gICAgICAgIDY5OiAncm9sbCBvdXQgcmVjb3JkICcsXHJcbiAgICAgICAgNzA6ICdub21vciBzZXJpICcsXHJcbiAgICAgICAgNzE6ICdHYW1lIGlkJyxcclxuICAgICAgICA3MjogJ2p1bWxhaCB0cmFuc2ZlciAnLFxyXG4gICAgICAgIDczOiAnVHJhbnNmZXIgZGF0ZSAnLFxyXG4gICAgICAgIDc0OiAnbm9tb3Igc2VyaSAnLFxyXG4gICAgICAgIDc1OiAncGVybWFpbmFuIGlkJyxcclxuICAgICAgICA3NjogJ21lbnRyYW5zZmVyIGt1YW50aXRhcyAnLFxyXG4gICAgICAgIDc3OiAncm9sbC1vdXQgZGF0ZSAnLFxyXG4gICAgICAgIDc4OiAnc2lsYWthbiBtYXN1a2thbiBzYW5kaSBsYW1hICcsXHJcbiAgICAgICAgNzk6ICd0b2xvbmcgbWFzdWtrYW4gcGFzc3dvcmQgYmFydSAnLFxyXG4gICAgICAgIDgwOiAnYW1iaWwgJyxcclxuICAgICAgICA4MTogJ3NhbmRpIGFzbGkgYmFuayA6JyxcclxuICAgICAgICA4MjogJ3NhbmRpIGJhcnUgOicsXHJcbiAgICAgICAgODM6ICdrb25maXJtYXNpIHNhbmRpIDonLFxyXG4gICAgICAgIDg0OiAndG9sb25nIG1hc3Vra2FuIGxhZ2kgJyxcclxuICAgICAgICA4NTogJ09LICcsXHJcbiAgICAgICAgODY6ICdtYXN1a2thbiBJRCcsXHJcbiAgICAgICAgODc6ICdwZXJ0YW55YWFuICcsXHJcbiAgICAgICAgODg6ICdwZW5nZ3VuYSBpZCcsXHJcbiAgICAgICAgODk6ICdrb2luIGVtYXMga3VhbnRpdGFzICcsXHJcbiAgICAgICAgOTA6ICdwZW5nZ3VuYSBJRDonXHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyDlsIbpnIDopoHkv53nlZnnmoTlsZ7mgKfotYvlgLznu5nlhajlsYDlr7nosaFcclxuICAgICAgICBpZiAoIXdpbmRvdy5nbG9iYWxEYXRhKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhID0ge30gYXMgR2xvYmFsRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGEubGFiZWxBcnIgPSB0aGlzLmxhYmVsQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhLnNwcml0ZUFyciA9IHRoaXMuc3ByaXRlQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhLnNwcml0ZUZyYW1lQXJyX3poID0gdGhpcy5zcHJpdGVGcmFtZUFycl96aDtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YS5zcHJpdGVGcmFtZUFycl9lbiA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW47XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGEuc3ByaXRlRnJhbWVBcnJfdm4gPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuO1xyXG5cclxuICAgICAgICB0aGlzLnNldExhbmd1YWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMYW5ndWFnZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwZXJzaXN0Tm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ2luaXRfbGFuZ3VhZ2UnKTtcclxuICAgICAgICBjb25zdCB5b3VyU2NyaXB0Q29tcG9uZW50ID0gcGVyc2lzdE5vZGUuZ2V0Q29tcG9uZW50KCdMb2JieU1haW5fbGFuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbExhYmVsQXJyID0gd2luZG93Lmdsb2JhbERhdGEubGFiZWxBcnIgfHwgW107XHJcbiAgICAgICAgdGhpcy5sYWJlbEFyciA9IGdsb2JhbExhYmVsQXJyLmxlbmd0aCA/IGdsb2JhbExhYmVsQXJyIDogdGhpcy5sYWJlbEFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlQXJyID0gd2luZG93Lmdsb2JhbERhdGEuc3ByaXRlQXJyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQXJyID0gZ2xvYmFsU3ByaXRlQXJyLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUFyciA6IHRoaXMuc3ByaXRlQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA9IHdpbmRvdy5nbG9iYWxEYXRhLnNwcml0ZUZyYW1lQXJyX3poIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfemggPSBnbG9iYWxTcHJpdGVGcmFtZUFycl96aC5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuID0gd2luZG93Lmdsb2JhbERhdGEuc3ByaXRlRnJhbWVBcnJfZW4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl9lbiA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuIDogdGhpcy5zcHJpdGVGcmFtZUFycl9lbjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4gPSB3aW5kb3cuZ2xvYmFsRGF0YS5zcHJpdGVGcmFtZUFycl92biB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuO1xyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpIHx8IExhbmd1YWdlLkVOO1xyXG5cclxuICAgICAgICBsZXQgbGFuZ3VhZ2VPYmo6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuWkg6XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuemhMYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlZOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmluTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5FTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5lbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhYmVsQXJyLmZvckVhY2goKGxhYmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYW5ndWFnZU9ialtpbmRleF0gfHwgJyc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGFiZWxBcnIpXHJcbiAgICB9XHJcbn1cclxuIl19