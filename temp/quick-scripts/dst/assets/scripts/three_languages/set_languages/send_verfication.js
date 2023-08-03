
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
        var _this = this;
        if (this.countdownRunning) {
            return; // 如果倒计时正在进行中，则直接返回，不执行倒计时逻辑
        }
        this.countdownRunning = true; // 将倒计时标记为正在进行中
        var count = 60;
        var labelComponent = this.verficat_but;
        var intervalId = setInterval(function () {
            if (count === 1) {
                labelComponent.string = '发送手机验证码';
                clearInterval(intervalId);
                // 模拟向服务器发送请求获取验证码
                var phoneNumber = _this.cur_phone.string;
                _this.sendVerificationCodeRequest(phoneNumber)
                    .then(function (verificationCode) {
                    // 验证码校验
                    var isValidVerification = verificationCode === _this.cur_verficat.string;
                    if (isValidVerification) {
                        // 验证码正确
                        console.log('验证码正确');
                        _this.isRegistered = true;
                    }
                    else {
                        // 验证码错误
                        console.log('验证码错误');
                        _this.isRegistered = false;
                    }
                    _this.countdownRunning = false; // 倒计时结束，标记为非进行中
                })
                    .catch(function (error) {
                    console.error('发送验证码请求出错:', error);
                    _this.isRegistered = false; // 请求出错，将注册状态标记为false
                    _this.countdownRunning = false; // 倒计时结束，标记为非进行中
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
    __decorate([
        property({ type: cc.Label, tooltip: '验证码按钮显示倒计时' })
    ], send_verfication.prototype, "verficat_but", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxzZW5kX3ZlcmZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBZ0ZDO1FBdEVXLHNCQUFnQixHQUFZLEtBQUssQ0FBQyxDQUFDLGFBQWE7UUFDaEQsa0JBQVksR0FBWSxLQUFLLENBQUM7O0lBcUUxQyxDQUFDO0lBbkVHOztPQUVHO0lBQ0gsb0NBQVMsR0FBVDtRQUFBLGlCQTZDQztRQTVDRyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixPQUFPLENBQUMsNEJBQTRCO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLGVBQWU7UUFFN0MsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUV6QyxJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUM7WUFDM0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNiLGNBQWMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNsQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRTFCLGtCQUFrQjtnQkFDbEIsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLENBQUM7cUJBQ3hDLElBQUksQ0FBQyxVQUFDLGdCQUFnQjtvQkFDbkIsUUFBUTtvQkFDUixJQUFNLG1CQUFtQixHQUFHLGdCQUFnQixLQUFLLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO29CQUMxRSxJQUFJLG1CQUFtQixFQUFFO3dCQUNyQixRQUFRO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3JCLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUM1Qjt5QkFBTTt3QkFDSCxRQUFRO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3JCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3FCQUM3QjtvQkFFRCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLENBQUMsZ0JBQWdCO2dCQUNuRCxDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFVBQUMsS0FBSztvQkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDbkMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxxQkFBcUI7b0JBQ2hELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0I7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2dCQUVQLE9BQU87YUFDVjtZQUVELGNBQWMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLEtBQUssRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUdELHFCQUFxQjtJQUNyQixzREFBMkIsR0FBM0IsVUFBNEIsV0FBbUI7UUFDM0MsaUNBQWlDO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2Qyx1Q0FBdUM7WUFDdkMsbUJBQW1CO1lBQ25CLFVBQVUsQ0FBQztnQkFDUCxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQjtnQkFDdEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxtQkFBbUI7WUFDbEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsNEJBQTRCO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUFnQixHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBN0VEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO3VEQUMzQjtJQUdwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzswREFDMUI7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7MERBQzdCO0lBUk4sZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FnRnBDO0lBQUQsdUJBQUM7Q0FoRkQsQUFnRkMsQ0FoRjZDLEVBQUUsQ0FBQyxTQUFTLEdBZ0Z6RDtrQkFoRm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZW5kX3ZlcmZpY2F0aW9uIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCB0b29sdGlwOiAn6aG+5a6i5omL5py65Y+3JyB9KVxyXG4gICAgY3VyX3Bob25lOiBjYy5MYWJlbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgdG9vbHRpcDogJ+mhvuWuoue7meeahOmqjOivgeeggScgfSlcclxuICAgIGN1cl92ZXJmaWNhdDogY2MuTGFiZWw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIHRvb2x0aXA6ICfpqozor4HnoIHmjInpkq7mmL7npLrlgJLorqHml7YnIH0pXHJcbiAgICB2ZXJmaWNhdF9idXQ6IGNjLkxhYmVsO1xyXG5cclxuICAgIHByaXZhdGUgY291bnRkb3duUnVubmluZzogYm9vbGVhbiA9IGZhbHNlOyAvLyDlgJLorqHml7bmmK/lkKbmraPlnKjov5vooYzkuK1cclxuICAgIHByaXZhdGUgaXNSZWdpc3RlcmVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiA2MOenkuWAkuiuoeaXtlxyXG4gICAgICovXHJcbiAgICBjb3VudGRvd24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY291bnRkb3duUnVubmluZykge1xyXG4gICAgICAgICAgICByZXR1cm47IC8vIOWmguaenOWAkuiuoeaXtuato+WcqOi/m+ihjOS4re+8jOWImeebtOaOpei/lOWbnu+8jOS4jeaJp+ihjOWAkuiuoeaXtumAu+i+kVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb3VudGRvd25SdW5uaW5nID0gdHJ1ZTsgLy8g5bCG5YCS6K6h5pe25qCH6K6w5Li65q2j5Zyo6L+b6KGM5LitXHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDYwO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsQ29tcG9uZW50ID0gdGhpcy52ZXJmaWNhdF9idXQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGFiZWxDb21wb25lbnQuc3RyaW5nID0gJ+WPkemAgeaJi+acuumqjOivgeeggSc7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOaooeaLn+WQkeacjeWKoeWZqOWPkemAgeivt+axguiOt+WPlumqjOivgeeggVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGhvbmVOdW1iZXIgPSB0aGlzLmN1cl9waG9uZS5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRWZXJpZmljYXRpb25Db2RlUmVxdWVzdChwaG9uZU51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigodmVyaWZpY2F0aW9uQ29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpqozor4HnoIHmoKHpqoxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZFZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbkNvZGUgPT09IHRoaXMuY3VyX3ZlcmZpY2F0LnN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWRWZXJpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmqjOivgeeggeato+ehrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+mqjOivgeeggeato+ehricpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlZ2lzdGVyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6aqM6K+B56CB6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6aqM6K+B56CB6ZSZ6K+vJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVnaXN0ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZG93blJ1bm5pbmcgPSBmYWxzZTsgLy8g5YCS6K6h5pe257uT5p2f77yM5qCH6K6w5Li66Z2e6L+b6KGM5LitXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WPkemAgemqjOivgeeggeivt+axguWHuumUmTonLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWdpc3RlcmVkID0gZmFsc2U7IC8vIOivt+axguWHuumUme+8jOWwhuazqOWGjOeKtuaAgeagh+iusOS4umZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRkb3duUnVubmluZyA9IGZhbHNlOyAvLyDlgJLorqHml7bnu5PmnZ/vvIzmoIforrDkuLrpnZ7ov5vooYzkuK1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxhYmVsQ29tcG9uZW50LnN0cmluZyA9IFN0cmluZyhjb3VudCk7XHJcbiAgICAgICAgICAgIGNvdW50LS07XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOaooeaLn+WQkeacjeWKoeWZqOWPkemAgeivt+axguiOt+WPlumqjOivgeeggeeahOaWueazlVxyXG4gICAgc2VuZFZlcmlmaWNhdGlvbkNvZGVSZXF1ZXN0KHBob25lTnVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIC8vIOi/memHjOaooeaLn+S4gOS4quW8guatpeivt+axgu+8jOS9v+eUqFByb21pc2XmnaXmqKHmi5/or7fmsYLnmoTlvILmraXmgKfotKhcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWPr+S7peaJp+ihjOWQkeacjeWKoeWZqOWPkemAgeivt+axgueahOmAu+i+ke+8jOavlOWmguS9v+eUqGF4aW9z5bqT5Y+R6YCBUE9TVOivt+axglxyXG4gICAgICAgICAgICAvLyDlrp7pmYXmg4XlhrXpnIDopoHmm7/mjaLkuLrnnJ/lrp7nmoTor7fmsYLpgLvovpFcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJpZmljYXRpb25Db2RlID0gXCIxMjM0NTZcIjsgLy8g6L+Z6YeM566A5Y2V6L+U5Zue5LiA5Liq5Zu65a6a55qE6aqM6K+B56CB56S65L6LXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHZlcmlmaWNhdGlvbkNvZGUpOyAvLyDor7fmsYLmiJDlip/vvIzlsIbpqozor4HnoIHkvKDpgJLnu5nlm57osIPlh73mlbBcclxuICAgICAgICAgICAgfSwgMjAwMCk7IC8vIOi/memHjOS9v+eUqHNldFRpbWVvdXTmqKHmi5/lvILmraXor7fmsYLnmoTlu7bov5/ml7bpl7RcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBSZXR1cm5SZWdpc3RlcmVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzUmVnaXN0ZXJlZDtcclxuICAgIH1cclxufVxyXG4iXX0=