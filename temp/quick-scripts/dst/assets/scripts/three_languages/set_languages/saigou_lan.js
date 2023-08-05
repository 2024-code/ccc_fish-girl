
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
        var yourScriptComponent = persistNode.getComponent('Slot_aztec_lan');
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
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('Slot_aztec_lan');
        this.labelArr = Slot_aztec_lan.labelArr;
        this.spriteArr = Slot_aztec_lan.spriteArr;
        this.spriteFrameArr_zh = Slot_aztec_lan.spriteFrameArr_zh;
        this.spriteFrameArr_en = Slot_aztec_lan.spriteFrameArr_en;
        this.spriteFrameArr_vn = Slot_aztec_lan.spriteFrameArr_vn;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxzYWlnb3VfbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQVNEO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBZ0hDO1FBN0dHLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFFMUIsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLFlBQVk7WUFDZixDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLE1BQU07WUFDVCxFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLE1BQU07U0FDYixDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLHVCQUF1QjtZQUMxQixDQUFDLEVBQUUsY0FBYztZQUNqQixDQUFDLEVBQUUsWUFBWTtZQUNmLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLFFBQVE7WUFDWCxDQUFDLEVBQUUsZ0JBQWdCO1lBQ25CLENBQUMsRUFBRSxpQkFBaUI7WUFDcEIsQ0FBQyxFQUFFLFlBQVk7WUFDZixDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENB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QUFFLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNUdEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztnREFDMUI7SUFIVCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBZ0g5QjtJQUFELGlCQUFDO0NBaEhELEFBZ0hDLENBaEh1QyxFQUFFLENBQUMsU0FBUyxHQWdIbkQ7a0JBaEhvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuaW50ZXJmYWNlIEdsb2JhbERhdGFfNyB7XHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSxcclxuICAgIHNwcml0ZUFycjogY2MuU3ByaXRlW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl96aDogY2MuU3ByaXRlRnJhbWVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX2VuOiBjYy5TcHJpdGVGcmFtZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfdm46IGNjLlNwcml0ZUZyYW1lW11cclxufVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzYWlnb3VfbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+mZkOazqDoxLTEwMDAwJyxcclxuICAgICAgICAxOiAn5b2T5YmN5LiL5rOoJyxcclxuICAgICAgICAyOiAn6YeR5biBJyxcclxuICAgICAgICAzOiAn6KeE5YiZJyxcclxuICAgICAgICA0OiAn6Z+z5LmQJyxcclxuICAgICAgICA1OiAn6Z+z5pWIJyxcclxuICAgICAgICA2OiAn5byA5aWW6K6w5b2VJyxcclxuICAgICAgICA3OiAn5ri45oiP546p5rOVJyxcclxuICAgICAgICA4OiAn6K+35LiL5L2PJyxcclxuICAgICAgICA5OiAn6ZKx5LiN5aSf5LqGJyxcclxuICAgICAgICAxMDogJ+aYvuekuuWPt+eggScsXHJcbiAgICAgICAgMTE6ICfmmL7npLrlpKflsI8nLFxyXG4gICAgICAgIDEyOiAn5pi+56S65Y2V5Y+MJyxcclxuICAgIH07XHJcblxyXG4gICAgZW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnTGltaXRlZCBub3RlIDoxLTEwMDAwJyxcclxuICAgICAgICAxOiAnQ3VycmVudCBiZXQgJyxcclxuICAgICAgICAyOiAnR29sZCBjb2luICcsXHJcbiAgICAgICAgMzogJ1J1bGVzICcsXHJcbiAgICAgICAgNDogJ011c2ljICcsXHJcbiAgICAgICAgNTogJ1NvdW5kIGVmZmVjdHMgJyxcclxuICAgICAgICA2OiAnTG90dGVyeSByZWNvcmQgJyxcclxuICAgICAgICA3OiAnR2FtZSBwbGF5ICcsXHJcbiAgICAgICAgODogJ1BsZWFzZSBzdGF5IGRvd24gJyxcclxuICAgICAgICA5OiAnTm90IGVub3VnaCBtb25leSAnLFxyXG4gICAgICAgIDEwOiAnU2hvdyBudW1iZXIgJyxcclxuICAgICAgICAxMTogJ0Rpc3BsYXkgc2l6ZSAnLFxyXG4gICAgICAgIDEyOiAnU2hvdyBzaW5nbGUgYW5kIGRvdWJsZSAnLFxyXG4gICAgfTtcclxuXHJcbiAgICBpbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdjYXRhdGFuIHRlcmJhdGFzOiAxLTEwLjAwMCAnLFxyXG4gICAgICAgIDE6ICd0YXJ1aGFuIHNhYXQgaW5pICcsXHJcbiAgICAgICAgMjogJ2tvaW4gZW1hcyAnLFxyXG4gICAgICAgIDM6ICdhdHVyYW4gJyxcclxuICAgICAgICA0OiAnbXVzaWsgJyxcclxuICAgICAgICA1OiAncGVuZ2FydWggc3VhcmEgJyxcclxuICAgICAgICA2OiAncmVrb3IgbG90cmUgJyxcclxuICAgICAgICA3OiAncGVybWFpbmFuICcsXHJcbiAgICAgICAgODogJ3RldGFwbGFoIGJlcmJhcmluZyAnLFxyXG4gICAgICAgIDk6ICd0aWRhayBjdWt1cCB1YW5nICcsXHJcbiAgICAgICAgMTA6ICdub21vciBwZXJ0dW5qdWthbiAnLFxyXG4gICAgICAgIDExOiAndWt1cmFuIERpc3BsYXkgJyxcclxuICAgICAgICAxMjogJ3RhbXBpbGthbiB0dW5nZ2FsIGRhbiBnYW5kYSAnLFxyXG4gICAgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5bCG6ZyA6KaB5L+d55WZ55qE5bGe5oCn6LWL5YC857uZ5YWo5bGA5a+56LGhXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuZ2xvYmFsRGF0YV83KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzcgPSB7fSBhcyBHbG9iYWxEYXRhXzc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzcubGFiZWxBcnIgPSB0aGlzLmxhYmVsQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzcuc3ByaXRlQXJyID0gdGhpcy5zcHJpdGVBcnI7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNy5zcHJpdGVGcmFtZUFycl96aCA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNy5zcHJpdGVGcmFtZUFycl9lbiA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW47XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNy5zcHJpdGVGcmFtZUFycl92biA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExhbmd1YWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBlcnNpc3ROb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnaW5pdF9sYW5ndWFnZScpO1xyXG4gICAgICAgIGNvbnN0IHlvdXJTY3JpcHRDb21wb25lbnQgPSBwZXJzaXN0Tm9kZS5nZXRDb21wb25lbnQoJ1Nsb3RfYXp0ZWNfbGFuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbExhYmVsQXJyID0gd2luZG93Lmdsb2JhbERhdGFfNy5sYWJlbEFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyID0gZ2xvYmFsTGFiZWxBcnIubGVuZ3RoID8gZ2xvYmFsTGFiZWxBcnIgOiB0aGlzLmxhYmVsQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV83LnNwcml0ZUFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUFyciA9IGdsb2JhbFNwcml0ZUFyci5sZW5ndGggPyBnbG9iYWxTcHJpdGVBcnIgOiB0aGlzLnNwcml0ZUFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemggPSB3aW5kb3cuZ2xvYmFsRGF0YV83LnNwcml0ZUZyYW1lQXJyX3poIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfemggPSBnbG9iYWxTcHJpdGVGcmFtZUFycl96aC5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuID0gd2luZG93Lmdsb2JhbERhdGFfNy5zcHJpdGVGcmFtZUFycl9lbiB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl92biA9IHdpbmRvdy5nbG9iYWxEYXRhXzcuc3ByaXRlRnJhbWVBcnJfdm4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl92biA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuIDogdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuICAgICAgICBjb25zdCBwZXJzaXN0Tm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ2luaXRfbGFuZ3VhZ2UnKTtcclxuICAgICAgICBjb25zdCB5b3VyU2NyaXB0Q29tcG9uZW50ID0gcGVyc2lzdE5vZGUuZ2V0Q29tcG9uZW50KCdTbG90X2F6dGVjX2xhbicpO1xyXG4gICAgICAgIHRoaXMubGFiZWxBcnIgPSBTbG90X2F6dGVjX2xhbi5sYWJlbEFycjtcclxuICAgICAgICB0aGlzLiBzcHJpdGVBcnIgPSBTbG90X2F6dGVjX2xhbi5zcHJpdGVBcnI7XHJcbiAgICAgICAgdGhpcy4gc3ByaXRlRnJhbWVBcnJfemggPSBTbG90X2F6dGVjX2xhbi5zcHJpdGVGcmFtZUFycl96aDtcclxuICAgICAgICB0aGlzLiBzcHJpdGVGcmFtZUFycl9lbiA9IFNsb3RfYXp0ZWNfbGFuLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG4gICAgICAgIHRoaXMuIHNwcml0ZUZyYW1lQXJyX3ZuID0gU2xvdF9henRlY19sYW4uc3ByaXRlRnJhbWVBcnJfdm47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpIHx8IExhbmd1YWdlLkVOO1xyXG5cclxuICAgICAgICBsZXQgbGFuZ3VhZ2VPYmo6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuWkg6XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuemhMYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlZOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmluTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5FTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5lbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhYmVsQXJyLmZvckVhY2goKGxhYmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYW5ndWFnZU9ialtpbmRleF0gfHwgJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19