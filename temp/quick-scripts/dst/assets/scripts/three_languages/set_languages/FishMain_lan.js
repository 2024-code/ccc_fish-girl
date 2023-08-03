
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/FishMain_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
"use strict";
cc._RF.push(module, '08c87Or0SxL5aE2cvUmlzr/', 'FishMain_lan');
// scripts/three_languages/set_languages/FishMain_lan.ts

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
var FishMain_lan = /** @class */ (function (_super) {
    __extends(FishMain_lan, _super);
    function FishMain_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '累积 JackPot',
            1: '～随时归您～',
            2: '锁定',
            3: '自动',
            4: '确认',
            5: '取消',
            6: '确认退出游戏？',
            7: '提示',
            8: '音乐开关',
            9: '音效开关',
            10: '设置',
            11: '正在返回大厅...',
            12: '一网打尽',
            13: '大三元',
            14: '赔率X3',
            15: '大四喜',
            16: '赔率X4',
            17: '小刺鱼',
            18: '小草鱼',
            19: '小黄鱼',
            20: '泡泡鱼',
            21: '小紫鱼',
            22: '尼莫',
            23: '河豚',
            24: '蓝鱼',
            25: '灯笼鱼',
            26: '神仙鱼',
            27: '乌龟',
            28: '蝴蝶鱼',
            29: '孔雀鱼',
            30: '剑鱼',
            31: '蝙蝠鱼',
            32: '大白鲨',
            33: '大金鲨',
            34: '蜻蜓鱼',
            35: '龙虾',
            36: '海豚',
            37: '金龙',
            38: '金蟾',
            39: '黄金鲨',
            40: '钻石',
            41: '钻石',
            42: '钻石',
            43: '钻石',
            44: '钻石',
            45: '局部炸弹',
            46: '全屏炸弹',
            47: '鱼种'
        };
        _this.enLanguage = {
            0: 'Cumulative JackPot',
            1: '~ At your disposal ~ ',
            2: 'Lock ',
            3: 'Automatic ',
            4: 'Confirm ',
            5: 'Cancel ',
            6: 'Are you sure to quit the game? ',
            7: 'Prompt ',
            8: 'Music switch ',
            9: 'Sound switch ',
            10: 'Settings ',
            11: 'Is returning to the hall... ',
            12: 'A net sweep ',
            13: 'Big three ',
            14: 'odds X3',
            15: 'Fourth Year happiness ',
            16: 'Odds X4',
            17: 'Little Stickleback ',
            18: 'Little grass carp ',
            19: 'Little Yellow croaker ',
            20: 'Bubble fish ',
            21: 'Little Purple Fish ',
            22: 'Nemo ',
            23: 'Puffer fish ',
            24: 'Blue fish ',
            25: 'Lantern Fish ',
            26: 'Angelfish ',
            27: 'Turtle ',
            28: 'Butterfly fish ',
            29: 'Guppy ',
            30: 'Swordfish ',
            31: 'Batfish ',
            32: 'Jaws ',
            33: 'The Great Golden Shark ',
            34: 'Dragonfly ',
            35: 'Lobster ',
            36: 'Dolphin ',
            37: 'Golden Dragon ',
            38: 'Golden Toad ',
            39: 'Golden Shark ',
            40: 'Diamond ',
            41: 'Diamond ',
            42: 'Diamond ',
            43: 'Diamond ',
            44: 'Diamond ',
            45: 'Local bombs ',
            46: 'Full Screen bomb ',
            47: 'Species of fish'
        };
        _this.inLanguage = {
            0: 'menumpuk JackPot ',
            1: 'yang akan menjadi milikmu',
            2: 'Kunci',
            3: "otomatis",
            4: 'dikonfirmasi ',
            5: 'Pembatalan',
            6: 'konfirmasi meninggalkan permainan? ',
            7: 'petunjuk',
            8: 'tombol musik',
            9: 'Sub by',
            10: "setting",
            11: 'kembali menuju lobi',
            12: 'finished',
            13: 'Ta san yuan',
            14: "odds X3",
            15: 'selamat tahun senior ',
            16: "odds ds X4",
            17: 'menyengat kecil',
            18: "ikan kecil",
            19: 'ikan kuning kecil',
            20: "泡泡鱼",
            21: 'ikan kecubung',
            22: "nemo",
            23: "ikan buntal",
            24: "bluefish",
            25: 'lentera ikan',
            26: "ikan peri",
            27: "tortoids",
            28: 'ikan kupu-kupu',
            29: 'Ikan guppy',
            30: "swordfish",
            31: "batfish",
            32: "jaws",
            33: 'great gold shark ',
            34: "ikan capung",
            35: "lobster",
            36: 'dolphin',
            37: 'Kingdragon',
            38: "katak emas",
            39: ' Hiu emas',
            40: 'diamond',
            41: 'diamond',
            42: 'Berlian',
            43: 'diamond',
            44: 'Berlian',
            45: "bom lokal",
            46: 'bom layar penuh',
            47: "penanaman ikan"
        };
        return _this;
    }
    FishMain_lan.prototype.start = function () {
        this.setLanguage();
    };
    FishMain_lan.prototype.setLanguage = function () {
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
    ], FishMain_lan.prototype, "labelArr", void 0);
    FishMain_lan = __decorate([
        ccclass
    ], FishMain_lan);
    return FishMain_lan;
}(cc.Component));
exports.default = FishMain_lan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxGaXNoTWFpbl9sYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSyxRQUlKO0FBSkQsV0FBSyxRQUFRO0lBQ1QseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBR0Q7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFzTEM7UUFuTEcsY0FBUSxHQUFlLEVBQUUsQ0FBQztRQUUxQixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsWUFBWTtZQUNmLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsU0FBUztZQUNaLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLFdBQVc7WUFDZixFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixF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QU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFFOUUsSUFBSSxXQUFXLEdBQThCLEVBQUUsQ0FBQztRQUNoRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLEVBQUU7Z0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLE1BQU07WUFDVixLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5QixNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUMsRUFBRTtnQkFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsTUFBTTtTQUNiO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztZQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbExEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztrREFDMUI7SUFIVCxZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBc0xoQztJQUFELG1CQUFDO0NBdExELEFBc0xDLENBdEx5QyxFQUFFLENBQUMsU0FBUyxHQXNMckQ7a0JBdExvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpc2hNYWluX2xhbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLkxhYmVsXSwgdG9vbHRpcDogJ+abv+aNoueahExhYmVsJyB9KVxyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10gPSBbXTtcclxuXHJcbiAgICB6aExhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICfntK/np68gSmFja1BvdCcsXHJcbiAgICAgICAgMTogJ++9numaj+aXtuW9kuaCqO+9nicsXHJcbiAgICAgICAgMjogJ+mUgeWumicsXHJcbiAgICAgICAgMzogJ+iHquWKqCcsXHJcbiAgICAgICAgNDogJ+ehruiupCcsXHJcbiAgICAgICAgNTogJ+WPlua2iCcsXHJcbiAgICAgICAgNjogJ+ehruiupOmAgOWHuua4uOaIj++8nycsXHJcbiAgICAgICAgNzogJ+aPkOekuicsXHJcbiAgICAgICAgODogJ+mfs+S5kOW8gOWFsycsXHJcbiAgICAgICAgOTogJ+mfs+aViOW8gOWFsycsXHJcbiAgICAgICAgMTA6ICforr7nva4nLFxyXG4gICAgICAgIDExOiAn5q2j5Zyo6L+U5Zue5aSn5Y6FLi4uJyxcclxuICAgICAgICAxMjogJ+S4gOe9keaJk+WwvScsXHJcbiAgICAgICAgMTM6ICflpKfkuInlhYMnLFxyXG4gICAgICAgIDE0OiAn6LWU546HWDMnLFxyXG4gICAgICAgIDE1OiAn5aSn5Zub5ZacJyxcclxuICAgICAgICAxNjogJ+i1lOeOh1g0JyxcclxuICAgICAgICAxNzogJ+Wwj+WIuumxvCcsXHJcbiAgICAgICAgMTg6ICflsI/ojYnpsbwnLFxyXG4gICAgICAgIDE5OiAn5bCP6buE6bG8JyxcclxuICAgICAgICAyMDogJ+azoeazoemxvCcsXHJcbiAgICAgICAgMjE6ICflsI/ntKvpsbwnLFxyXG4gICAgICAgIDIyOiAn5bC86I6rJyxcclxuICAgICAgICAyMzogJ+ays+ixmicsXHJcbiAgICAgICAgMjQ6ICfok53psbwnLFxyXG4gICAgICAgIDI1OiAn54Gv56y86bG8JyxcclxuICAgICAgICAyNjogJ+elnuS7memxvCcsXHJcbiAgICAgICAgMjc6ICfkuYzpvp8nLFxyXG4gICAgICAgIDI4OiAn6J206J226bG8JyxcclxuICAgICAgICAyOTogJ+WtlOmbgOmxvCcsXHJcbiAgICAgICAgMzA6ICfliZHpsbwnLFxyXG4gICAgICAgIDMxOiAn6J2Z6J2g6bG8JyxcclxuICAgICAgICAzMjogJ+Wkp+eZvemyqCcsXHJcbiAgICAgICAgMzM6ICflpKfph5HpsqgnLFxyXG4gICAgICAgIDM0OiAn6Jy76JyT6bG8JyxcclxuICAgICAgICAzNTogJ+m+meiZvicsXHJcbiAgICAgICAgMzY6ICfmtbfosZonLFxyXG4gICAgICAgIDM3OiAn6YeR6b6ZJyxcclxuICAgICAgICAzODogJ+mHkeifvicsXHJcbiAgICAgICAgMzk6ICfpu4Tph5HpsqgnLFxyXG4gICAgICAgIDQwOiAn6ZK755+zJyxcclxuICAgICAgICA0MTogJ+mSu+efsycsXHJcbiAgICAgICAgNDI6ICfpkrvnn7MnLFxyXG4gICAgICAgIDQzOiAn6ZK755+zJyxcclxuICAgICAgICA0NDogJ+mSu+efsycsXHJcbiAgICAgICAgNDU6ICflsYDpg6jngrjlvLknLFxyXG4gICAgICAgIDQ2OiAn5YWo5bGP54K45by5JyxcclxuICAgICAgICA0NzogJ+mxvOenjSdcclxuICAgIH07XHJcblxyXG4gICAgZW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnQ3VtdWxhdGl2ZSBKYWNrUG90JyxcclxuICAgICAgICAxOiAnfiBBdCB5b3VyIGRpc3Bvc2FsIH4gJyxcclxuICAgICAgICAyOiAnTG9jayAnLFxyXG4gICAgICAgIDM6ICdBdXRvbWF0aWMgJyxcclxuICAgICAgICA0OiAnQ29uZmlybSAnLFxyXG4gICAgICAgIDU6ICdDYW5jZWwgJyxcclxuICAgICAgICA2OiAnQXJlIHlvdSBzdXJlIHRvIHF1aXQgdGhlIGdhbWU/ICcsXHJcbiAgICAgICAgNzogJ1Byb21wdCAnLFxyXG4gICAgICAgIDg6ICdNdXNpYyBzd2l0Y2ggJyxcclxuICAgICAgICA5OiAnU291bmQgc3dpdGNoICcsXHJcbiAgICAgICAgMTA6ICdTZXR0aW5ncyAnLFxyXG4gICAgICAgIDExOiAnSXMgcmV0dXJuaW5nIHRvIHRoZSBoYWxsLi4uICcsXHJcbiAgICAgICAgMTI6ICdBIG5ldCBzd2VlcCAnLFxyXG4gICAgICAgIDEzOiAnQmlnIHRocmVlICcsXHJcbiAgICAgICAgMTQ6ICdvZGRzIFgzJyxcclxuICAgICAgICAxNTogJ0ZvdXJ0aCBZZWFyIGhhcHBpbmVzcyAnLFxyXG4gICAgICAgIDE2OiAnT2RkcyBYNCcsXHJcbiAgICAgICAgMTc6ICdMaXR0bGUgU3RpY2tsZWJhY2sgJyxcclxuICAgICAgICAxODogJ0xpdHRsZSBncmFzcyBjYXJwICcsXHJcbiAgICAgICAgMTk6ICdMaXR0bGUgWWVsbG93IGNyb2FrZXIgJyxcclxuICAgICAgICAyMDogJ0J1YmJsZSBmaXNoICcsXHJcbiAgICAgICAgMjE6ICdMaXR0bGUgUHVycGxlIEZpc2ggJyxcclxuICAgICAgICAyMjogJ05lbW8gJyxcclxuICAgICAgICAyMzogJ1B1ZmZlciBmaXNoICcsXHJcbiAgICAgICAgMjQ6ICdCbHVlIGZpc2ggJyxcclxuICAgICAgICAyNTogJ0xhbnRlcm4gRmlzaCAnLFxyXG4gICAgICAgIDI2OiAnQW5nZWxmaXNoICcsXHJcbiAgICAgICAgMjc6ICdUdXJ0bGUgJyxcclxuICAgICAgICAyODogJ0J1dHRlcmZseSBmaXNoICcsXHJcbiAgICAgICAgMjk6ICdHdXBweSAnLFxyXG4gICAgICAgIDMwOiAnU3dvcmRmaXNoICcsXHJcbiAgICAgICAgMzE6ICdCYXRmaXNoICcsXHJcbiAgICAgICAgMzI6ICdKYXdzICcsXHJcbiAgICAgICAgMzM6ICdUaGUgR3JlYXQgR29sZGVuIFNoYXJrICcsXHJcbiAgICAgICAgMzQ6ICdEcmFnb25mbHkgJyxcclxuICAgICAgICAzNTogJ0xvYnN0ZXIgJyxcclxuICAgICAgICAzNjogJ0RvbHBoaW4gJyxcclxuICAgICAgICAzNzogJ0dvbGRlbiBEcmFnb24gJyxcclxuICAgICAgICAzODogJ0dvbGRlbiBUb2FkICcsXHJcbiAgICAgICAgMzk6ICdHb2xkZW4gU2hhcmsgJyxcclxuICAgICAgICA0MDogJ0RpYW1vbmQgJyxcclxuICAgICAgICA0MTogJ0RpYW1vbmQgJyxcclxuICAgICAgICA0MjogJ0RpYW1vbmQgJyxcclxuICAgICAgICA0MzogJ0RpYW1vbmQgJyxcclxuICAgICAgICA0NDogJ0RpYW1vbmQgJyxcclxuICAgICAgICA0NTogJ0xvY2FsIGJvbWJzICcsXHJcbiAgICAgICAgNDY6ICdGdWxsIFNjcmVlbiBib21iICcsXHJcbiAgICAgICAgNDc6ICdTcGVjaWVzIG9mIGZpc2gnXHJcbiAgICB9O1xyXG5cclxuICAgIGluTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ21lbnVtcHVrIEphY2tQb3QgJyxcclxuICAgICAgICAxOiAneWFuZyBha2FuIG1lbmphZGkgbWlsaWttdScsXHJcbiAgICAgICAgMjogJ0t1bmNpJyxcclxuICAgICAgICAzOiBcIm90b21hdGlzXCIsXHJcbiAgICAgICAgNDogJ2Rpa29uZmlybWFzaSAnLFxyXG4gICAgICAgIDU6ICdQZW1iYXRhbGFuJyxcclxuICAgICAgICA2OiAna29uZmlybWFzaSBtZW5pbmdnYWxrYW4gcGVybWFpbmFuPyAnLFxyXG4gICAgICAgIDc6ICdwZXR1bmp1aycsXHJcbiAgICAgICAgODogJ3RvbWJvbCBtdXNpaycsXHJcbiAgICAgICAgOTogJ1N1YiBieScsXHJcbiAgICAgICAgMTA6IFwic2V0dGluZ1wiLFxyXG4gICAgICAgIDExOiAna2VtYmFsaSBtZW51anUgbG9iaScsXHJcbiAgICAgICAgMTI6ICdmaW5pc2hlZCcsXHJcbiAgICAgICAgMTM6ICdUYSBzYW4geXVhbicsXHJcbiAgICAgICAgMTQ6IFwib2RkcyBYM1wiLFxyXG4gICAgICAgIDE1OiAnc2VsYW1hdCB0YWh1biBzZW5pb3IgJyxcclxuICAgICAgICAxNjogXCJvZGRzIGRzIFg0XCIsXHJcbiAgICAgICAgMTc6ICdtZW55ZW5nYXQga2VjaWwnLFxyXG4gICAgICAgIDE4OiBcImlrYW4ga2VjaWxcIixcclxuICAgICAgICAxOTogJ2lrYW4ga3VuaW5nIGtlY2lsJyxcclxuICAgICAgICAyMDogXCLms6Hms6HpsbxcIixcclxuICAgICAgICAyMTogJ2lrYW4ga2VjdWJ1bmcnLFxyXG4gICAgICAgIDIyOiBcIm5lbW9cIixcclxuICAgICAgICAyMzogXCJpa2FuIGJ1bnRhbFwiLFxyXG4gICAgICAgIDI0OiBcImJsdWVmaXNoXCIsXHJcbiAgICAgICAgMjU6ICdsZW50ZXJhIGlrYW4nLFxyXG4gICAgICAgIDI2OiBcImlrYW4gcGVyaVwiLFxyXG4gICAgICAgIDI3OiBcInRvcnRvaWRzXCIsXHJcbiAgICAgICAgMjg6ICdpa2FuIGt1cHUta3VwdScsXHJcbiAgICAgICAgMjk6ICdJa2FuIGd1cHB5JyxcclxuICAgICAgICAzMDogXCJzd29yZGZpc2hcIixcclxuICAgICAgICAzMTogXCJiYXRmaXNoXCIsXHJcbiAgICAgICAgMzI6IFwiamF3c1wiLFxyXG4gICAgICAgIDMzOiAnZ3JlYXQgZ29sZCBzaGFyayAnLFxyXG4gICAgICAgIDM0OiBcImlrYW4gY2FwdW5nXCIsXHJcbiAgICAgICAgMzU6IFwibG9ic3RlclwiLFxyXG4gICAgICAgIDM2OiAnZG9scGhpbicsXHJcbiAgICAgICAgMzc6ICdLaW5nZHJhZ29uJyxcclxuICAgICAgICAzODogXCJrYXRhayBlbWFzXCIsXHJcbiAgICAgICAgMzk6ICcgSGl1IGVtYXMnLFxyXG4gICAgICAgIDQwOiAnZGlhbW9uZCcsXHJcbiAgICAgICAgNDE6ICdkaWFtb25kJyxcclxuICAgICAgICA0MjogJ0JlcmxpYW4nLFxyXG4gICAgICAgIDQzOiAnZGlhbW9uZCcsXHJcbiAgICAgICAgNDQ6ICdCZXJsaWFuJyxcclxuICAgICAgICA0NTogXCJib20gbG9rYWxcIixcclxuICAgICAgICA0NjogJ2JvbSBsYXlhciBwZW51aCcsXHJcbiAgICAgICAgNDc6IFwicGVuYW5hbWFuIGlrYW5cIlxyXG4gICAgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRMYW5ndWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGFuZ3VhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZExhbmd1YWdlJykgfHwgTGFuZ3VhZ2UuRU47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZU9iajogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5aSDpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy56aExhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuVk46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuaW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLkVOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmVuTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxBcnIuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGxhbmd1YWdlT2JqW2luZGV4XSB8fCAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=