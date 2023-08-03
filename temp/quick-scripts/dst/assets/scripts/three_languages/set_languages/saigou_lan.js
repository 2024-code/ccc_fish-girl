
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
        this.setLanguage();
    };
    saigou_lan.prototype.setLanguage = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxzYWlnb3VfbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQUdEO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBNkVDO1FBMUVHLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFFMUIsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLFlBQVk7WUFDZixDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLE1BQU07WUFDVCxFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLE1BQU07U0FDYixDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLHVCQUF1QjtZQUMxQixDQUFDLEVBQUUsY0FBYztZQUNqQixDQUFDLEVBQUUsWUFBWTtZQUNmLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLFFBQVE7WUFDWCxDQUFDLEVBQUUsZ0JBQWdCO1lBQ25CLENBQUMsRUFBRSxpQkFBaUI7WUFDcEIsQ0FBQyxFQUFFLFlBQVk7WUFDZixDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENBQUMsRUFBRSxtQkFBbUI7WUFDdEIsRUFBRSxFQUFFLGNBQWM7WUFDbEIsRUFBRSxFQUFFLGVBQWU7WUFDbkIsRUFBRSxFQUFFLHlCQUF5QjtTQUNoQyxDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLDZCQUE2QjtZQUNoQyxDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENBQUMsRUFBRSxZQUFZO1lBQ2YsQ0FBQyxFQUFFLFNBQVM7WUFDWixDQUFDLEVBQUUsUUFBUTtZQUNYLENBQUMsRUFBRSxpQkFBaUI7WUFDcEIsQ0FBQyxFQUFFLGNBQWM7WUFDakIsQ0FBQyxFQUFFLFlBQVk7WUFDZixDQUFDLEVBQUUscUJBQXFCO1lBQ3hCLENBQUMsRUFBRSxtQkFBbUI7WUFDdEIsRUFBRSxFQUFFLG9CQUFvQjtZQUN4QixFQUFFLEVBQUUsaUJBQWlCO1lBQ3JCLEVBQUUsRUFBRSw4QkFBOEI7U0FDckMsQ0FBQzs7SUEwQk4sQ0FBQztJQXhCYSwwQkFBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxnQ0FBVyxHQUFuQjtRQUNJLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFFOUUsSUFBSSxXQUFXLEdBQThCLEVBQUUsQ0FBQztRQUNoRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLEVBQUU7Z0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLE1BQU07WUFDVixLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5QixNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUMsRUFBRTtnQkFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsTUFBTTtTQUNiO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztZQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBekVEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztnREFDMUI7SUFIVCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBNkU5QjtJQUFELGlCQUFDO0NBN0VELEFBNkVDLENBN0V1QyxFQUFFLENBQUMsU0FBUyxHQTZFbkQ7a0JBN0VvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNhaWdvdV9sYW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5MYWJlbF0sIHRvb2x0aXA6ICfmm7/mjaLnmoRMYWJlbCcgfSlcclxuICAgIGxhYmVsQXJyOiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgemhMYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAn6ZmQ5rOoOjEtMTAwMDAnLFxyXG4gICAgICAgIDE6ICflvZPliY3kuIvms6gnLFxyXG4gICAgICAgIDI6ICfph5HluIEnLFxyXG4gICAgICAgIDM6ICfop4TliJknLFxyXG4gICAgICAgIDQ6ICfpn7PkuZAnLFxyXG4gICAgICAgIDU6ICfpn7PmlYgnLFxyXG4gICAgICAgIDY6ICflvIDlpZborrDlvZUnLFxyXG4gICAgICAgIDc6ICfmuLjmiI/njqnms5UnLFxyXG4gICAgICAgIDg6ICfor7fkuIvkvY8nLFxyXG4gICAgICAgIDk6ICfpkrHkuI3lpJ/kuoYnLFxyXG4gICAgICAgIDEwOiAn5pi+56S65Y+356CBJyxcclxuICAgICAgICAxMTogJ+aYvuekuuWkp+WwjycsXHJcbiAgICAgICAgMTI6ICfmmL7npLrljZXlj4wnLFxyXG4gICAgfTtcclxuXHJcbiAgICBlbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdMaW1pdGVkIG5vdGUgOjEtMTAwMDAnLFxyXG4gICAgICAgIDE6ICdDdXJyZW50IGJldCAnLFxyXG4gICAgICAgIDI6ICdHb2xkIGNvaW4gJyxcclxuICAgICAgICAzOiAnUnVsZXMgJyxcclxuICAgICAgICA0OiAnTXVzaWMgJyxcclxuICAgICAgICA1OiAnU291bmQgZWZmZWN0cyAnLFxyXG4gICAgICAgIDY6ICdMb3R0ZXJ5IHJlY29yZCAnLFxyXG4gICAgICAgIDc6ICdHYW1lIHBsYXkgJyxcclxuICAgICAgICA4OiAnUGxlYXNlIHN0YXkgZG93biAnLFxyXG4gICAgICAgIDk6ICdOb3QgZW5vdWdoIG1vbmV5ICcsXHJcbiAgICAgICAgMTA6ICdTaG93IG51bWJlciAnLFxyXG4gICAgICAgIDExOiAnRGlzcGxheSBzaXplICcsXHJcbiAgICAgICAgMTI6ICdTaG93IHNpbmdsZSBhbmQgZG91YmxlICcsXHJcbiAgICB9O1xyXG5cclxuICAgIGluTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ2NhdGF0YW4gdGVyYmF0YXM6IDEtMTAuMDAwICcsXHJcbiAgICAgICAgMTogJ3RhcnVoYW4gc2FhdCBpbmkgJyxcclxuICAgICAgICAyOiAna29pbiBlbWFzICcsXHJcbiAgICAgICAgMzogJ2F0dXJhbiAnLFxyXG4gICAgICAgIDQ6ICdtdXNpayAnLFxyXG4gICAgICAgIDU6ICdwZW5nYXJ1aCBzdWFyYSAnLFxyXG4gICAgICAgIDY6ICdyZWtvciBsb3RyZSAnLFxyXG4gICAgICAgIDc6ICdwZXJtYWluYW4gJyxcclxuICAgICAgICA4OiAndGV0YXBsYWggYmVyYmFyaW5nICcsXHJcbiAgICAgICAgOTogJ3RpZGFrIGN1a3VwIHVhbmcgJyxcclxuICAgICAgICAxMDogJ25vbW9yIHBlcnR1bmp1a2FuICcsXHJcbiAgICAgICAgMTE6ICd1a3VyYW4gRGlzcGxheSAnLFxyXG4gICAgICAgIDEyOiAndGFtcGlsa2FuIHR1bmdnYWwgZGFuIGdhbmRhICcsXHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldExhbmd1YWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMYW5ndWFnZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGVjdGVkTGFuZ3VhZ2UnKSB8fCBMYW5ndWFnZS5FTjtcclxuXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlT2JqOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge307XHJcbiAgICAgICAgc3dpdGNoIChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlpIOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLnpoTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5WTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5pbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuRU46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuZW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbEFyci5mb3JFYWNoKChsYWJlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gbGFuZ3VhZ2VPYmpbaW5kZXhdIHx8ICcnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==