
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/ATTlianhuanpao_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_1) {
            window.globalData_1 = {};
        }
        window.globalData_1.labelArr = this.labelArr;
        window.globalData_1.spriteArr = this.spriteArr;
        window.globalData_1.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_1.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_1.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    ATTlianhuanpao_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('Slot_aztec_lan');
        var globalLabelArr = window.globalData_1.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_1.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_1.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_1.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_1.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxBVFRsaWFuaHVhbnBhb19sYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSyxRQUlKO0FBSkQsV0FBSyxRQUFRO0lBQ1QseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBV0Q7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUF5SEM7UUF0SEcsY0FBUSxHQUFlLEVBQUUsQ0FBQztRQUcxQixlQUFTLEdBQWdCLEVBQUUsQ0FBQztRQUc1Qix1QkFBaUIsR0FBcUIsRUFBRSxDQUFDO1FBR3pDLHVCQUFpQixHQUFxQixFQUFFLENBQUM7UUFHekMsdUJBQWlCLEdBQXFCLEVBQUUsQ0FBQztRQU16Qyx1QkFBaUIsR0FBcUIsRUFBRSxDQUFDO1FBRXpDLHVCQUFpQixHQUFxQixFQUFFLENBQUM7UUFFekMsdUJBQWlCLEdBQXFCLEVBQUUsQ0FBQztRQUd6QyxnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLE1BQU07U0FDWixDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLGVBQWU7WUFDbEIsQ0FBQyxFQUFFLE9BQU87WUFDVixDQUFDLEVBQUUsY0FBYztTQUNwQixDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLG1CQUFtQjtZQUN0QixDQUFDLEVBQUUsU0FBUztZQUNaLENBQUMsRUFBRSxxQkFBcUI7U0FDM0IsQ0FBQzs7SUE2RU4sQ0FBQztJQTNFYSxrQ0FBSyxH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c291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbmludGVyZmFjZSBHbG9iYWxEYXRhXzEge1xyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10sXHJcbiAgICBzcHJpdGVBcnI6IGNjLlNwcml0ZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfemg6IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3ZuOiBjYy5TcHJpdGVGcmFtZVtdXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFUVGxpYW5odWFucGFvX2xhbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLkxhYmVsXSwgdG9vbHRpcDogJ+abv+aNoueahExhYmVsJyB9KVxyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuU3ByaXRlXSwgdG9vbHRpcDogJ+abv+aNoueahFNwcml0ZScgfSlcclxuICAgIHNwcml0ZUFycjogY2MuU3ByaXRlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLCB0b29sdGlwOiAn5pu/5o2i55qE5Lit5paH5Zu+54mHJyB9KVxyXG4gICAgc3ByaXRlRnJhbWVBcnJfemg6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLCB0b29sdGlwOiAn5pu/5o2i55qE6Iux5paH5Zu+54mHJyB9KVxyXG4gICAgc3ByaXRlRnJhbWVBcnJfZW46IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLCB0b29sdGlwOiAn5pu/5o2i55qE5Y2w5bC85Zu+54mHJyB9KVxyXG4gICAgc3ByaXRlRnJhbWVBcnJfdm46IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5CdXR0b24sIHRvb2x0aXA6ICflvIDlp4vmjInpkq4nIH0pXHJcbiAgICBiZWdpbkFycjogY2MuQnV0dG9uO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICflvIDlp4vnmoRTcHJpdGXkuK3mlofotLTlm74nIH0pXHJcbiAgICBiZWdpblNwcml0ZUFycl96aDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSwgdG9vbHRpcDogJ+W8gOWni+eahFNwcml0ZeiLseaWh+i0tOWbvicgfSlcclxuICAgIGJlZ2luU3ByaXRlQXJyX2VuOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLCB0b29sdGlwOiAn5byA5aeL55qEU3ByaXRl5Y2w5bC86LS05Zu+JyB9KVxyXG4gICAgYmVnaW5TcHJpdGVBcnJfdm46IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcblxyXG4gICAgemhMYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAn54K55Ye75LiL5rOoJyxcclxuICAgICAgICAxOiAn6YCA5Ye6JyxcclxuICAgICAgICAyOiAn54K55Ye75LiL5rOoJ1xyXG4gICAgfTtcclxuXHJcbiAgICBlbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdDbGljayB0byBiZXQgJyxcclxuICAgICAgICAxOiAnUXVpdCAnLFxyXG4gICAgICAgIDI6ICdDbGljayB0byBiZXQnXHJcbiAgICB9O1xyXG5cclxuICAgIGluTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ2tsaWsgZGFuIGJlcnRhcnVoJyxcclxuICAgICAgICAxOiAna2VsdWFyICcsXHJcbiAgICAgICAgMjogJ0tsaWsgdW50dWsgYmVydGFydWgnXHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyDlsIbpnIDopoHkv53nlZnnmoTlsZ7mgKfotYvlgLznu5nlhajlsYDlr7nosaFcclxuICAgICAgICBpZiAoIXdpbmRvdy5nbG9iYWxEYXRhXzEpIHtcclxuICAgICAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfMSA9IHt9IGFzIEdsb2JhbERhdGFfMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfMS5sYWJlbEFyciA9IHRoaXMubGFiZWxBcnI7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfMS5zcHJpdGVBcnIgPSB0aGlzLnNwcml0ZUFycjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV8xLnNwcml0ZUZyYW1lQXJyX3poID0gdGhpcy5zcHJpdGVGcmFtZUFycl96aDtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV8xLnNwcml0ZUZyYW1lQXJyX2VuID0gdGhpcy5zcHJpdGVGcmFtZUFycl9lbjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV8xLnNwcml0ZUZyYW1lQXJyX3ZuID0gdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRMYW5ndWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGFuZ3VhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGVyc2lzdE5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdpbml0X2xhbmd1YWdlJyk7XHJcbiAgICAgICAgY29uc3QgeW91clNjcmlwdENvbXBvbmVudCA9IHBlcnNpc3ROb2RlLmdldENvbXBvbmVudCgnU2xvdF9henRlY19sYW4nKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsTGFiZWxBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV8xLmxhYmVsQXJyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMubGFiZWxBcnIgPSBnbG9iYWxMYWJlbEFyci5sZW5ndGggPyBnbG9iYWxMYWJlbEFyciA6IHRoaXMubGFiZWxBcnI7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUFyciA9IHdpbmRvdy5nbG9iYWxEYXRhXzEuc3ByaXRlQXJyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQXJyID0gZ2xvYmFsU3ByaXRlQXJyLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUFyciA6IHRoaXMuc3ByaXRlQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA9IHdpbmRvdy5nbG9iYWxEYXRhXzEuc3ByaXRlRnJhbWVBcnJfemggfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl96aCA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3poLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3poIDogdGhpcy5zcHJpdGVGcmFtZUFycl96aDtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gPSB3aW5kb3cuZ2xvYmFsRGF0YV8xLnNwcml0ZUZyYW1lQXJyX2VuIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfZW4gPSBnbG9iYWxTcHJpdGVGcmFtZUFycl9lbi5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl9lbiA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW47XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuID0gd2luZG93Lmdsb2JhbERhdGFfMS5zcHJpdGVGcmFtZUFycl92biB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuO1xyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpIHx8IExhbmd1YWdlLkVOO1xyXG5cclxuICAgICAgICBsZXQgbGFuZ3VhZ2VPYmo6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuWkg6XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuemhMYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcHJpdGVGcmFtZUFycl96aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlQXJyW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZUFycl96aFtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQXJyLm5vcm1hbFNwcml0ZSA9IHRoaXMuYmVnaW5TcHJpdGVBcnJfemhbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQXJyLnByZXNzZWRTcHJpdGUgPSB0aGlzLmJlZ2luU3ByaXRlQXJyX3poWzFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWdpbkFyci5ob3ZlclNwcml0ZSA9IHRoaXMuYmVnaW5TcHJpdGVBcnJfemhbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQXJyLmRpc2FibGVkU3ByaXRlID0gdGhpcy5iZWdpblNwcml0ZUFycl96aFsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlZOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmluTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUFycltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm5baV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWdpbkFyci5ub3JtYWxTcHJpdGUgPSB0aGlzLmJlZ2luU3ByaXRlQXJyX3ZuWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWdpbkFyci5wcmVzc2VkU3ByaXRlID0gdGhpcy5iZWdpblNwcml0ZUFycl92blsxXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5BcnIuaG92ZXJTcHJpdGUgPSB0aGlzLmJlZ2luU3ByaXRlQXJyX3ZuWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWdpbkFyci5kaXNhYmxlZFNwcml0ZSA9IHRoaXMuYmVnaW5TcHJpdGVBcnJfdm5bMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5FTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5lbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVBcnJbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5BcnIubm9ybWFsU3ByaXRlID0gdGhpcy5iZWdpblNwcml0ZUFycl9lblswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5BcnIucHJlc3NlZFNwcml0ZSA9IHRoaXMuYmVnaW5TcHJpdGVBcnJfZW5bMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQXJyLmhvdmVyU3ByaXRlID0gdGhpcy5iZWdpblNwcml0ZUFycl9lblswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5BcnIuZGlzYWJsZWRTcHJpdGUgPSB0aGlzLmJlZ2luU3ByaXRlQXJyX2VuWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhYmVsQXJyLmZvckVhY2goKGxhYmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYW5ndWFnZU9ialtpbmRleF0gfHwgJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19