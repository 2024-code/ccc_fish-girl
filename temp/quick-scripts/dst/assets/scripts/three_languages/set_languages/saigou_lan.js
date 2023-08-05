
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/saigou_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f5154UAJNGrZIlpht188pe', 'saigou_lan');
// scripts/three_languages/set_languages/saigou_lan.ts

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
var saigou_lan = /** @class */ (function (_super) {
    __extends(saigou_lan, _super);
    function saigou_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '限注:1-10000',
            1: '当前下注',
            2: '金币',
            3: '规则',
            4: '音乐',
            5: '音效',
            6: '开奖记录',
            7: '游戏玩法',
            8: '请下住',
            9: '钱不够了',
            10: '显示号码',
            11: '显示大小',
            12: '显示单双',
        };
        _this.enLanguage = {
            0: 'Limited note :1-10000',
            1: 'Current bet ',
            2: 'Gold coin ',
            3: 'Rules ',
            4: 'Music ',
            5: 'Sound effects ',
            6: 'Lottery record ',
            7: 'Game play ',
            8: 'Please stay down ',
            9: 'Not enough money ',
            10: 'Show number ',
            11: 'Display size ',
            12: 'Show single and double ',
        };
        _this.inLanguage = {
            0: 'catatan terbatas: 1-10.000 ',
            1: 'taruhan saat ini ',
            2: 'koin emas ',
            3: 'aturan ',
            4: 'musik ',
            5: 'pengaruh suara ',
            6: 'rekor lotre ',
            7: 'permainan ',
            8: 'tetaplah berbaring ',
            9: 'tidak cukup uang ',
            10: 'nomor pertunjukan ',
            11: 'ukuran Display ',
            12: 'tampilkan tunggal dan ganda ',
        };
        return _this;
    }
    saigou_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_7) {
            window.globalData_7 = {};
        }
        window.globalData_7.labelArr = this.labelArr;
        window.globalData_7.spriteArr = this.spriteArr;
        window.globalData_7.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_7.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_7.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    saigou_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('saigou_lan');
        var globalLabelArr = window.globalData_7.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_7.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_7.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_7.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_7.spriteFrameArr_vn || [];
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
    };
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], saigou_lan.prototype, "labelArr", void 0);
    saigou_lan = __decorate([
        ccclass
    ], saigou_lan);
    return saigou_lan;
}(cc.Component));
exports.default = saigou_lan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxzYWlnb3VfbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQVNEO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBeUdDO1FBdEdHLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFFMUIsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLFlBQVk7WUFDZixDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLE1BQU07WUFDVCxFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLE1BQU07U0FDYixDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLHVCQUF1QjtZQUMxQixDQUFDLEVBQUUsY0FBYztZQUNqQixDQUFDLEVBQUUsWUFBWTtZQUNmLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLFFBQVE7WUFDWCxDQUFDLEVBQUUsZ0JBQWdCO1lBQ25CLENBQUMsRUFBRSxpQkFBaUI7WUFDcEIsQ0FBQyxFQUFFLFlBQVk7WUFDZixDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENB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LENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFFM0csSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUU5RSxJQUFJLFdBQVcsR0FBOEIsRUFBRSxDQUFDO1FBQ2hELFFBQVEsUUFBUSxFQUFFO1lBQ2QsS0FBSyxRQUFRLENBQUMsRUFBRTtnQkFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsTUFBTTtZQUNWLEtBQUssUUFBUSxDQUFDLEVBQUU7Z0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLE1BQU07WUFDVixLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5QixNQUFNO1NBQ2I7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLO1lBQy9CLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFyR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO2dEQUMxQjtJQUhULFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F5RzlCO0lBQUQsaUJBQUM7Q0F6R0QsQUF5R0MsQ0F6R3VDLEVBQUUsQ0FBQyxTQUFTLEdBeUduRDtrQkF6R29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBMYW5ndWFnZSB7XHJcbiAgICBaSCA9ICd0eHQuemgnLFxyXG4gICAgVk4gPSAndHh0LnZuJyxcclxuICAgIEVOID0gJ3R4dC5lbidcclxufVxyXG5pbnRlcmZhY2UgR2xvYmFsRGF0YV83IHtcclxuICAgIGxhYmVsQXJyOiBjYy5MYWJlbFtdLFxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3poOiBjYy5TcHJpdGVGcmFtZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfZW46IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXVxyXG59XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNhaWdvdV9sYW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5MYWJlbF0sIHRvb2x0aXA6ICfmm7/mjaLnmoRMYWJlbCcgfSlcclxuICAgIGxhYmVsQXJyOiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgemhMYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAn6ZmQ5rOoOjEtMTAwMDAnLFxyXG4gICAgICAgIDE6ICflvZPliY3kuIvms6gnLFxyXG4gICAgICAgIDI6ICfph5HluIEnLFxyXG4gICAgICAgIDM6ICfop4TliJknLFxyXG4gICAgICAgIDQ6ICfpn7PkuZAnLFxyXG4gICAgICAgIDU6ICfpn7PmlYgnLFxyXG4gICAgICAgIDY6ICflvIDlpZborrDlvZUnLFxyXG4gICAgICAgIDc6ICfmuLjmiI/njqnms5UnLFxyXG4gICAgICAgIDg6ICfor7fkuIvkvY8nLFxyXG4gICAgICAgIDk6ICfpkrHkuI3lpJ/kuoYnLFxyXG4gICAgICAgIDEwOiAn5pi+56S65Y+356CBJyxcclxuICAgICAgICAxMTogJ+aYvuekuuWkp+WwjycsXHJcbiAgICAgICAgMTI6ICfmmL7npLrljZXlj4wnLFxyXG4gICAgfTtcclxuXHJcbiAgICBlbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdMaW1pdGVkIG5vdGUgOjEtMTAwMDAnLFxyXG4gICAgICAgIDE6ICdDdXJyZW50IGJldCAnLFxyXG4gICAgICAgIDI6ICdHb2xkIGNvaW4gJyxcclxuICAgICAgICAzOiAnUnVsZXMgJyxcclxuICAgICAgICA0OiAnTXVzaWMgJyxcclxuICAgICAgICA1OiAnU291bmQgZWZmZWN0cyAnLFxyXG4gICAgICAgIDY6ICdMb3R0ZXJ5IHJlY29yZCAnLFxyXG4gICAgICAgIDc6ICdHYW1lIHBsYXkgJyxcclxuICAgICAgICA4OiAnUGxlYXNlIHN0YXkgZG93biAnLFxyXG4gICAgICAgIDk6ICdOb3QgZW5vdWdoIG1vbmV5ICcsXHJcbiAgICAgICAgMTA6ICdTaG93IG51bWJlciAnLFxyXG4gICAgICAgIDExOiAnRGlzcGxheSBzaXplICcsXHJcbiAgICAgICAgMTI6ICdTaG93IHNpbmdsZSBhbmQgZG91YmxlICcsXHJcbiAgICB9O1xyXG5cclxuICAgIGluTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ2NhdGF0YW4gdGVyYmF0YXM6IDEtMTAuMDAwICcsXHJcbiAgICAgICAgMTogJ3RhcnVoYW4gc2FhdCBpbmkgJyxcclxuICAgICAgICAyOiAna29pbiBlbWFzICcsXHJcbiAgICAgICAgMzogJ2F0dXJhbiAnLFxyXG4gICAgICAgIDQ6ICdtdXNpayAnLFxyXG4gICAgICAgIDU6ICdwZW5nYXJ1aCBzdWFyYSAnLFxyXG4gICAgICAgIDY6ICdyZWtvciBsb3RyZSAnLFxyXG4gICAgICAgIDc6ICdwZXJtYWluYW4gJyxcclxuICAgICAgICA4OiAndGV0YXBsYWggYmVyYmFyaW5nICcsXHJcbiAgICAgICAgOTogJ3RpZGFrIGN1a3VwIHVhbmcgJyxcclxuICAgICAgICAxMDogJ25vbW9yIHBlcnR1bmp1a2FuICcsXHJcbiAgICAgICAgMTE6ICd1a3VyYW4gRGlzcGxheSAnLFxyXG4gICAgICAgIDEyOiAndGFtcGlsa2FuIHR1bmdnYWwgZGFuIGdhbmRhICcsXHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyDlsIbpnIDopoHkv53nlZnnmoTlsZ7mgKfotYvlgLznu5nlhajlsYDlr7nosaFcclxuICAgICAgICBpZiAoIXdpbmRvdy5nbG9iYWxEYXRhXzcpIHtcclxuICAgICAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNyA9IHt9IGFzIEdsb2JhbERhdGFfNztcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNy5sYWJlbEFyciA9IHRoaXMubGFiZWxBcnI7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNy5zcHJpdGVBcnIgPSB0aGlzLnNwcml0ZUFycjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV83LnNwcml0ZUZyYW1lQXJyX3poID0gdGhpcy5zcHJpdGVGcmFtZUFycl96aDtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV83LnNwcml0ZUZyYW1lQXJyX2VuID0gdGhpcy5zcHJpdGVGcmFtZUFycl9lbjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV83LnNwcml0ZUZyYW1lQXJyX3ZuID0gdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRMYW5ndWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGFuZ3VhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGVyc2lzdE5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdpbml0X2xhbmd1YWdlJyk7XHJcbiAgICAgICAgY29uc3QgeW91clNjcmlwdENvbXBvbmVudCA9IHBlcnNpc3ROb2RlLmdldENvbXBvbmVudCgnc2FpZ291X2xhbicpO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxMYWJlbEFyciA9IHdpbmRvdy5nbG9iYWxEYXRhXzcubGFiZWxBcnIgfHwgW107XHJcbiAgICAgICAgdGhpcy5sYWJlbEFyciA9IGdsb2JhbExhYmVsQXJyLmxlbmd0aCA/IGdsb2JhbExhYmVsQXJyIDogdGhpcy5sYWJlbEFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlQXJyID0gd2luZG93Lmdsb2JhbERhdGFfNy5zcHJpdGVBcnIgfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVBcnIgPSBnbG9iYWxTcHJpdGVBcnIubGVuZ3RoID8gZ2xvYmFsU3ByaXRlQXJyIDogdGhpcy5zcHJpdGVBcnI7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3poID0gd2luZG93Lmdsb2JhbERhdGFfNy5zcHJpdGVGcmFtZUFycl96aCB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX3poID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemgubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemggOiB0aGlzLnNwcml0ZUZyYW1lQXJyX3poO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl9lbiA9IHdpbmRvdy5nbG9iYWxEYXRhXzcuc3ByaXRlRnJhbWVBcnJfZW4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl9lbiA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuIDogdGhpcy5zcHJpdGVGcmFtZUFycl9lbjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4gPSB3aW5kb3cuZ2xvYmFsRGF0YV83LnNwcml0ZUZyYW1lQXJyX3ZuIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfdm4gPSBnbG9iYWxTcHJpdGVGcmFtZUFycl92bi5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl92biA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpIHx8IExhbmd1YWdlLkVOO1xyXG5cclxuICAgICAgICBsZXQgbGFuZ3VhZ2VPYmo6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuWkg6XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuemhMYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlZOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmluTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5FTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5lbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhYmVsQXJyLmZvckVhY2goKGxhYmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYW5ndWFnZU9ialtpbmRleF0gfHwgJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19