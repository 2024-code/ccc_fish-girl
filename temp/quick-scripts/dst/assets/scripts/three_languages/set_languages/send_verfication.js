
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
// scripts/three_languages/set_languages/send_verfication.ts

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
        var labelComponent = this.sen_verficat;
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
        property({ type: cc.Label, tooltip: '发送验证码button' })
    ], send_verfication.prototype, "sen_verficat", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxzZW5kX3ZlcmZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBNkVDO1FBckVXLHNCQUFnQixHQUFZLEtBQUssQ0FBQyxDQUFDLGFBQWE7UUFDaEQsa0JBQVksR0FBWSxLQUFLLENBQUM7O0lBb0UxQyxDQUFDO0lBbEVHOztPQUVHO0lBQ0gsb0NBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyw0QkFBNEI7U0FDdkM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsZUFBZTtRQUU3QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUM7WUFDM0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNiLGNBQWMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNsQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRTFCLGtCQUFrQjtnQkFDbEIsSUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztnQkFDMUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsQ0FBQztxQkFDeEMsSUFBSSxDQUFDLFVBQUMsZ0JBQWdCO29CQUNuQixRQUFRO29CQUNSLElBQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7b0JBQzFFLElBQUksbUJBQW1CLEVBQUU7d0JBQ3JCLFFBQVE7d0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7cUJBQzVCO3lCQUFNO3dCQUNILFFBQVE7d0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7cUJBQzdCO29CQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0I7Z0JBQ25ELENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsVUFBQyxLQUFLO29CQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLHFCQUFxQjtvQkFDaEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDLGdCQUFnQjtnQkFDbkQsQ0FBQyxDQUFDLENBQUM7Z0JBRVAsT0FBTzthQUNWO1lBRUQsY0FBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsS0FBSyxFQUFFLENBQUM7UUFDWixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQscUJBQXFCO0lBQ3JCLHNEQUEyQixHQUEzQixVQUE0QixXQUFtQjtRQUMzQyxpQ0FBaUM7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLHVDQUF1QztZQUN2QyxtQkFBbUI7WUFDbkIsVUFBVSxDQUFDO2dCQUNQLElBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLENBQUMsbUJBQW1CO2dCQUN0RCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtZQUNsRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkNBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUF6RUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUM7MERBQzlCO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzBEQUMxQjtJQU5OLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBNkVwQztJQUFELHVCQUFDO0NBN0VELEFBNkVDLENBN0U2QyxFQUFFLENBQUMsU0FBUyxHQTZFekQ7a0JBN0VvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2VuZF92ZXJmaWNhdGlvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIHRvb2x0aXA6ICflj5HpgIHpqozor4HnoIFidXR0b24nIH0pXHJcbiAgICBzZW5fdmVyZmljYXQ6IGNjLkxhYmVsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCB0b29sdGlwOiAn6aG+5a6i57uZ55qE6aqM6K+B56CBJyB9KVxyXG4gICAgY3VyX3ZlcmZpY2F0OiBjYy5MYWJlbDtcclxuXHJcbiAgICBwcml2YXRlIGNvdW50ZG93blJ1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTsgLy8g5YCS6K6h5pe25piv5ZCm5q2j5Zyo6L+b6KGM5LitXHJcbiAgICBwcml2YXRlIGlzUmVnaXN0ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogNjDnp5LlgJLorqHml7ZcclxuICAgICAqL1xyXG4gICAgY291bnRkb3duKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvdW50ZG93blJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyDlpoLmnpzlgJLorqHml7bmraPlnKjov5vooYzkuK3vvIzliJnnm7TmjqXov5Tlm57vvIzkuI3miafooYzlgJLorqHml7bpgLvovpFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY291bnRkb3duUnVubmluZyA9IHRydWU7IC8vIOWwhuWAkuiuoeaXtuagh+iusOS4uuato+WcqOi/m+ihjOS4rVxyXG5cclxuICAgICAgICBsZXQgY291bnQgPSA2MDtcclxuICAgICAgICBjb25zdCBsYWJlbENvbXBvbmVudCA9IHRoaXMuc2VuX3ZlcmZpY2F0O1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsQ29tcG9uZW50LnN0cmluZyA9ICflj5HpgIHmiYvmnLrpqozor4HnoIEnO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDmqKHmi5/lkJHmnI3liqHlmajlj5HpgIHor7fmsYLojrflj5bpqozor4HnoIFcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBob25lTnVtYmVyID0gbGFiZWxDb21wb25lbnQuc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kVmVyaWZpY2F0aW9uQ29kZVJlcXVlc3QocGhvbmVOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZlcmlmaWNhdGlvbkNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6aqM6K+B56CB5qCh6aqMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRWZXJpZmljYXRpb24gPSB2ZXJpZmljYXRpb25Db2RlID09PSBzZWxmLmN1cl92ZXJmaWNhdC5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkVmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpqozor4HnoIHmraPnoa5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfpqozor4HnoIHmraPnoa4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNSZWdpc3RlcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmqjOivgeeggemUmeivr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+mqjOivgeeggemUmeivrycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1JlZ2lzdGVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3VudGRvd25SdW5uaW5nID0gZmFsc2U7IC8vIOWAkuiuoeaXtue7k+adn++8jOagh+iusOS4uumdnui/m+ihjOS4rVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCflj5HpgIHpqozor4HnoIHor7fmsYLlh7rplJk6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzUmVnaXN0ZXJlZCA9IGZhbHNlOyAvLyDor7fmsYLlh7rplJnvvIzlsIbms6jlhoznirbmgIHmoIforrDkuLpmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvdW50ZG93blJ1bm5pbmcgPSBmYWxzZTsgLy8g5YCS6K6h5pe257uT5p2f77yM5qCH6K6w5Li66Z2e6L+b6KGM5LitXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsYWJlbENvbXBvbmVudC5zdHJpbmcgPSBTdHJpbmcoY291bnQpO1xyXG4gICAgICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaooeaLn+WQkeacjeWKoeWZqOWPkemAgeivt+axguiOt+WPlumqjOivgeeggeeahOaWueazlVxyXG4gICAgc2VuZFZlcmlmaWNhdGlvbkNvZGVSZXF1ZXN0KHBob25lTnVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIC8vIOi/memHjOaooeaLn+S4gOS4quW8guatpeivt+axgu+8jOS9v+eUqFByb21pc2XmnaXmqKHmi5/or7fmsYLnmoTlvILmraXmgKfotKhcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWPr+S7peaJp+ihjOWQkeacjeWKoeWZqOWPkemAgeivt+axgueahOmAu+i+ke+8jOavlOWmguS9v+eUqGF4aW9z5bqT5Y+R6YCBUE9TVOivt+axglxyXG4gICAgICAgICAgICAvLyDlrp7pmYXmg4XlhrXpnIDopoHmm7/mjaLkuLrnnJ/lrp7nmoTor7fmsYLpgLvovpFcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJpZmljYXRpb25Db2RlID0gXCIxMjM0NTZcIjsgLy8g6L+Z6YeM566A5Y2V6L+U5Zue5LiA5Liq5Zu65a6a55qE6aqM6K+B56CB56S65L6LXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHZlcmlmaWNhdGlvbkNvZGUpOyAvLyDor7fmsYLmiJDlip/vvIzlsIbpqozor4HnoIHkvKDpgJLnu5nlm57osIPlh73mlbBcclxuICAgICAgICAgICAgfSwgMjAwMCk7IC8vIOi/memHjOS9v+eUqHNldFRpbWVvdXTmqKHmi5/lvILmraXor7fmsYLnmoTlu7bov5/ml7bpl7RcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgUmV0dXJuUmVnaXN0ZXJlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1JlZ2lzdGVyZWQ7XHJcbiAgICB9XHJcbn1cclxuIl19