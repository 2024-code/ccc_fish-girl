
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/send_verfication.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZW5fdmVyaWZpY2F0aW9uIFxcc2VuZF92ZXJmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQTZFQztRQXJFVyxzQkFBZ0IsR0FBWSxLQUFLLENBQUMsQ0FBQyxhQUFhO1FBQ2hELGtCQUFZLEdBQVksS0FBSyxDQUFDOztJQW9FMUMsQ0FBQztJQWxFRzs7T0FFRztJQUNILG9DQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixPQUFPLENBQUMsNEJBQTRCO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLGVBQWU7UUFFN0MsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDO1lBQzNCLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDYixjQUFjLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbEMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUxQixrQkFBa0I7Z0JBQ2xCLElBQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLENBQUM7cUJBQ3hDLElBQUksQ0FBQyxVQUFDLGdCQUFnQjtvQkFDbkIsUUFBUTtvQkFDUixJQUFNLG1CQUFtQixHQUFHLGdCQUFnQixLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO29CQUMxRSxJQUFJLG1CQUFtQixFQUFFO3dCQUNyQixRQUFRO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUM1Qjt5QkFBTTt3QkFDSCxRQUFRO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3FCQUM3QjtvQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLENBQUMsZ0JBQWdCO2dCQUNuRCxDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFVBQUMsS0FBSztvQkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxxQkFBcUI7b0JBQ2hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0I7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2dCQUVQLE9BQU87YUFDVjtZQUVELGNBQWMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLEtBQUssRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixzREFBMkIsR0FBM0IsVUFBNEIsV0FBbUI7UUFDM0MsaUNBQWlDO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2Qyx1Q0FBdUM7WUFDdkMsbUJBQW1CO1lBQ25CLFVBQVUsQ0FBQztnQkFDUCxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQjtnQkFDdEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxtQkFBbUI7WUFDbEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsNEJBQTRCO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUFnQixHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBekVEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO3VEQUMzQjtJQUdwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzswREFDMUI7SUFOTixnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQTZFcEM7SUFBRCx1QkFBQztDQTdFRCxBQTZFQyxDQTdFNkMsRUFBRSxDQUFDLFNBQVMsR0E2RXpEO2tCQTdFb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNlbmRfdmVyZmljYXRpb24gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCB0b29sdGlwOiAn6aG+5a6i5omL5py65Y+3JyB9KVxyXG4gICAgY3VyX3Bob25lOiBjYy5MYWJlbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgdG9vbHRpcDogJ+mhvuWuoue7meeahOmqjOivgeeggScgfSlcclxuICAgIGN1cl92ZXJmaWNhdDogY2MuTGFiZWw7XHJcblxyXG4gICAgcHJpdmF0ZSBjb3VudGRvd25SdW5uaW5nOiBib29sZWFuID0gZmFsc2U7IC8vIOWAkuiuoeaXtuaYr+WQpuato+WcqOi/m+ihjOS4rVxyXG4gICAgcHJpdmF0ZSBpc1JlZ2lzdGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIDYw56eS5YCS6K6h5pe2XHJcbiAgICAgKi9cclxuICAgIGNvdW50ZG93bigpIHtcclxuICAgICAgICBpZiAodGhpcy5jb3VudGRvd25SdW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjsgLy8g5aaC5p6c5YCS6K6h5pe25q2j5Zyo6L+b6KGM5Lit77yM5YiZ55u05o6l6L+U5Zue77yM5LiN5omn6KGM5YCS6K6h5pe26YC76L6RXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvdW50ZG93blJ1bm5pbmcgPSB0cnVlOyAvLyDlsIblgJLorqHml7bmoIforrDkuLrmraPlnKjov5vooYzkuK1cclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gNjA7XHJcbiAgICAgICAgY29uc3QgbGFiZWxDb21wb25lbnQgPSB0aGlzLmN1cl9waG9uZTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbENvbXBvbmVudC5zdHJpbmcgPSAn5Y+R6YCB5omL5py66aqM6K+B56CBJztcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5qih5ouf5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGC6I635Y+W6aqM6K+B56CBXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaG9uZU51bWJlciA9IGxhYmVsQ29tcG9uZW50LnN0cmluZztcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZFZlcmlmaWNhdGlvbkNvZGVSZXF1ZXN0KHBob25lTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh2ZXJpZmljYXRpb25Db2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmqjOivgeeggeagoemqjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1ZhbGlkVmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uQ29kZSA9PT0gc2VsZi5jdXJfdmVyZmljYXQuc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFZlcmlmaWNhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6aqM6K+B56CB5q2j56GuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6aqM6K+B56CB5q2j56GuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzUmVnaXN0ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpqozor4HnoIHplJnor69cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfpqozor4HnoIHplJnor68nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNSZWdpc3RlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY291bnRkb3duUnVubmluZyA9IGZhbHNlOyAvLyDlgJLorqHml7bnu5PmnZ/vvIzmoIforrDkuLrpnZ7ov5vooYzkuK1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5Y+R6YCB6aqM6K+B56CB6K+35rGC5Ye66ZSZOicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1JlZ2lzdGVyZWQgPSBmYWxzZTsgLy8g6K+35rGC5Ye66ZSZ77yM5bCG5rOo5YaM54q25oCB5qCH6K6w5Li6ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3VudGRvd25SdW5uaW5nID0gZmFsc2U7IC8vIOWAkuiuoeaXtue7k+adn++8jOagh+iusOS4uumdnui/m+ihjOS4rVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFiZWxDb21wb25lbnQuc3RyaW5nID0gU3RyaW5nKGNvdW50KTtcclxuICAgICAgICAgICAgY291bnQtLTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmqKHmi5/lkJHmnI3liqHlmajlj5HpgIHor7fmsYLojrflj5bpqozor4HnoIHnmoTmlrnms5VcclxuICAgIHNlbmRWZXJpZmljYXRpb25Db2RlUmVxdWVzdChwaG9uZU51bWJlcjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICAvLyDov5nph4zmqKHmi5/kuIDkuKrlvILmraXor7fmsYLvvIzkvb/nlKhQcm9taXNl5p2l5qih5ouf6K+35rGC55qE5byC5q2l5oCn6LSoXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDov5nph4zlj6/ku6XmiafooYzlkJHmnI3liqHlmajlj5HpgIHor7fmsYLnmoTpgLvovpHvvIzmr5TlpoLkvb/nlKhheGlvc+W6k+WPkemAgVBPU1Tor7fmsYJcclxuICAgICAgICAgICAgLy8g5a6e6ZmF5oOF5Ya16ZyA6KaB5pu/5o2i5Li655yf5a6e55qE6K+35rGC6YC76L6RXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVyaWZpY2F0aW9uQ29kZSA9IFwiMTIzNDU2XCI7IC8vIOi/memHjOeugOWNlei/lOWbnuS4gOS4quWbuuWumueahOmqjOivgeeggeekuuS+i1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh2ZXJpZmljYXRpb25Db2RlKTsgLy8g6K+35rGC5oiQ5Yqf77yM5bCG6aqM6K+B56CB5Lyg6YCS57uZ5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgIH0sIDIwMDApOyAvLyDov5nph4zkvb/nlKhzZXRUaW1lb3V05qih5ouf5byC5q2l6K+35rGC55qE5bu26L+f5pe26Ze0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFJldHVyblJlZ2lzdGVyZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZWdpc3RlcmVkO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==