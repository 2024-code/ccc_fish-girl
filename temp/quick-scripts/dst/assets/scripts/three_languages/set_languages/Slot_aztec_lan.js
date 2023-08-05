
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/Slot_aztec_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd720d6zBBLLofhhMnt9DPb', 'Slot_aztec_lan');
// scripts/three_languages/set_languages/Slot_aztec_lan.ts

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
var Slot_aztec_lan = /** @class */ (function (_super) {
    __extends(Slot_aztec_lan, _super);
    function Slot_aztec_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.spriteArr = [];
        _this.spriteFrameArr_zh = [];
        _this.spriteFrameArr_en = [];
        _this.spriteFrameArr_vn = [];
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
    Slot_aztec_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_3) {
            window.globalData_3 = {};
        }
        window.globalData_3.labelArr = this.labelArr;
        window.globalData_3.spriteArr = this.spriteArr;
        window.globalData_3.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_3.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_3.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    Slot_aztec_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('Slot_aztec_lan');
        var globalLabelArr = window.globalData_3.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_3.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_3.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_3.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_3.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
        var language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;
        var languageObj = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                for (var i = 0; i < this.spriteFrameArr_zh.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_zh[i];
                }
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                for (var i = 0; i < this.spriteFrameArr_vn.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_vn[i];
                }
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                for (var i = 0; i < this.spriteFrameArr_en.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_en[i];
                }
                break;
        }
        this.labelArr.forEach(function (label, index) {
            label.string = languageObj[index] || '';
        });
    };
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], Slot_aztec_lan.prototype, "labelArr", void 0);
    __decorate([
        property({ type: [cc.Sprite], tooltip: '替换的Sprite' })
    ], Slot_aztec_lan.prototype, "spriteArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的中文图片' })
    ], Slot_aztec_lan.prototype, "spriteFrameArr_zh", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的英文图片' })
    ], Slot_aztec_lan.prototype, "spriteFrameArr_en", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的印尼图片' })
    ], Slot_aztec_lan.prototype, "spriteFrameArr_vn", void 0);
    Slot_aztec_lan = __decorate([
        ccclass
    ], Slot_aztec_lan);
    return Slot_aztec_lan;
}(cc.Component));
exports.default = Slot_aztec_lan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxTbG90X2F6dGVjX2xhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDVCx5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFXRDtJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQWlHQztRQTlGRyxjQUFRLEdBQWUsRUFBRSxDQUFDO1FBRzFCLGVBQVMsR0FBZ0IsRUFBRSxDQUFDO1FBRzVCLHVCQUFpQixHQUFxQixFQUFFLENBQUM7UUFHekMsdUJBQWlCLEdBQXFCLEVBQUUsQ0FBQztRQUd6Qyx1QkFBaUIsR0FBcUIsRUFBRSxDQUFDO1FBRXpDLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxNQUFNO1lBQ1QsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsTUFBTTtTQUNaLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsZUFBZTtZQUNsQixDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxjQUFjO1NBQ3BCLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENBQUMsRUFBRSxTQUFTO1lBQ1osQ0FBQyxFQUFFLHFCQUFxQjtTQUMzQixDQUFDOztJQWdFTixDQUFDO0lBOURhLDhCQUFLLEdBQWY7UUFDSSxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDdEIsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFrQixDQUFDO1NB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QUMxQjtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7NkRBQ2hCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzs2REFDaEI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzZEQUNoQjtJQWZ4QixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBaUdsQztJQUFELHFCQUFDO0NBakdELEFBaUdDLENBakcyQyxFQUFFLENBQUMsU0FBUyxHQWlHdkQ7a0JBakdvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbmludGVyZmFjZSBHbG9iYWxEYXRhXzMge1xyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10sXHJcbiAgICBzcHJpdGVBcnI6IGNjLlNwcml0ZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfemg6IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3ZuOiBjYy5TcHJpdGVGcmFtZVtdXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsb3RfYXp0ZWNfbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVdLCB0b29sdGlwOiAn5pu/5o2i55qEU3ByaXRlJyB9KVxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTkuK3mloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl96aDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoToi7Hmloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTljbDlsLzlm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+eCueWHu+S4i+azqCcsXHJcbiAgICAgICAgMTogJ+mAgOWHuicsXHJcbiAgICAgICAgMjogJ+eCueWHu+S4i+azqCdcclxuICAgIH07XHJcblxyXG4gICAgZW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnQ2xpY2sgdG8gYmV0ICcsXHJcbiAgICAgICAgMTogJ1F1aXQgJyxcclxuICAgICAgICAyOiAnQ2xpY2sgdG8gYmV0J1xyXG4gICAgfTtcclxuXHJcbiAgICBpbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdrbGlrIGRhbiBiZXJ0YXJ1aCcsXHJcbiAgICAgICAgMTogJ2tlbHVhciAnLFxyXG4gICAgICAgIDI6ICdLbGlrIHVudHVrIGJlcnRhcnVoJ1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5bCG6ZyA6KaB5L+d55WZ55qE5bGe5oCn6LWL5YC857uZ5YWo5bGA5a+56LGhXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuZ2xvYmFsRGF0YV8zKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzMgPSB7fSBhcyBHbG9iYWxEYXRhXzM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzMubGFiZWxBcnIgPSB0aGlzLmxhYmVsQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzMuc3ByaXRlQXJyID0gdGhpcy5zcHJpdGVBcnI7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfMy5zcHJpdGVGcmFtZUFycl96aCA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfMy5zcHJpdGVGcmFtZUFycl9lbiA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW47XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfMy5zcHJpdGVGcmFtZUFycl92biA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExhbmd1YWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBlcnNpc3ROb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnaW5pdF9sYW5ndWFnZScpO1xyXG4gICAgICAgIGNvbnN0IHlvdXJTY3JpcHRDb21wb25lbnQgPSBwZXJzaXN0Tm9kZS5nZXRDb21wb25lbnQoJ1Nsb3RfYXp0ZWNfbGFuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbExhYmVsQXJyID0gd2luZG93Lmdsb2JhbERhdGFfMy5sYWJlbEFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyID0gZ2xvYmFsTGFiZWxBcnIubGVuZ3RoID8gZ2xvYmFsTGFiZWxBcnIgOiB0aGlzLmxhYmVsQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV8zLnNwcml0ZUFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUFyciA9IGdsb2JhbFNwcml0ZUFyci5sZW5ndGggPyBnbG9iYWxTcHJpdGVBcnIgOiB0aGlzLnNwcml0ZUFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemggPSB3aW5kb3cuZ2xvYmFsRGF0YV8zLnNwcml0ZUZyYW1lQXJyX3poIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfemggPSBnbG9iYWxTcHJpdGVGcmFtZUFycl96aC5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuID0gd2luZG93Lmdsb2JhbERhdGFfMy5zcHJpdGVGcmFtZUFycl9lbiB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl92biA9IHdpbmRvdy5nbG9iYWxEYXRhXzMuc3ByaXRlRnJhbWVBcnJfdm4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl92biA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuIDogdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGVjdGVkTGFuZ3VhZ2UnKSB8fCBMYW5ndWFnZS5FTjtcclxuXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlT2JqOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge307XHJcbiAgICAgICAgc3dpdGNoIChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlpIOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLnpoTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlRnJhbWVBcnJfemgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUFycltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfemhbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5WTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5pbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVBcnJbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuRU46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuZW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcHJpdGVGcmFtZUFycl9lbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlQXJyW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZUFycl9lbltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbEFyci5mb3JFYWNoKChsYWJlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gbGFuZ3VhZ2VPYmpbaW5kZXhdIHx8ICcnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=