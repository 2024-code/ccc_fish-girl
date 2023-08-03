"use strict";
cc._RF.push(module, '14045xNYeZD8puc26/S9J0L', 'send_verfication');
// scripts/three_languages/sen_verification /send_verfication.ts

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
var send_verfication = /** @class */ (function (_super) {
    __extends(send_verfication, _super);
    function send_verfication() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.countdownRunning = false; // 倒计时是否正在进行中
        _this.isRegistered = false;
        return _this;
    }
    /**
     * 60秒倒计时
     */
    send_verfication.prototype.countdown = function () {
        if (this.countdownRunning) {
            return; // 如果倒计时正在进行中，则直接返回，不执行倒计时逻辑
        }
        this.countdownRunning = true; // 将倒计时标记为正在进行中
        var count = 60;
        var labelComponent = this.cur_phone;
        var self = this;
        var intervalId = setInterval(function () {
            if (count === 1) {
                labelComponent.string = '发送手机验证码';
                clearInterval(intervalId);
                // 模拟向服务器发送请求获取验证码
                var phoneNumber = labelComponent.string;
                self.sendVerificationCodeRequest(phoneNumber)
                    .then(function (verificationCode) {
                    // 验证码校验
                    var isValidVerification = verificationCode === self.cur_verficat.string;
                    if (isValidVerification) {
                        // 验证码正确
                        console.log('验证码正确');
                        self.isRegistered = true;
                    }
                    else {
                        // 验证码错误
                        console.log('验证码错误');
                        self.isRegistered = false;
                    }
                    self.countdownRunning = false; // 倒计时结束，标记为非进行中
                })
                    .catch(function (error) {
                    console.error('发送验证码请求出错:', error);
                    self.isRegistered = false; // 请求出错，将注册状态标记为false
                    self.countdownRunning = false; // 倒计时结束，标记为非进行中
                });
                return;
            }
            labelComponent.string = String(count);
            count--;
        }, 1000);
    };
    // 模拟向服务器发送请求获取验证码的方法
    send_verfication.prototype.sendVerificationCodeRequest = function (phoneNumber) {
        // 这里模拟一个异步请求，使用Promise来模拟请求的异步性质
        return new Promise(function (resolve, reject) {
            // 这里可以执行向服务器发送请求的逻辑，比如使用axios库发送POST请求
            // 实际情况需要替换为真实的请求逻辑
            setTimeout(function () {
                var verificationCode = "123456"; // 这里简单返回一个固定的验证码示例
                resolve(verificationCode); // 请求成功，将验证码传递给回调函数
            }, 2000); // 这里使用setTimeout模拟异步请求的延迟时间
        });
    };
    send_verfication.prototype.ReturnRegistered = function () {
        return this.isRegistered;
    };
    __decorate([
        property({ type: cc.Label, tooltip: '顾客手机号' })
    ], send_verfication.prototype, "cur_phone", void 0);
    __decorate([
        property({ type: cc.Label, tooltip: '顾客给的验证码' })
    ], send_verfication.prototype, "cur_verficat", void 0);
    send_verfication = __decorate([
        ccclass
    ], send_verfication);
    return send_verfication;
}(cc.Component));
exports.default = send_verfication;

cc._RF.pop();