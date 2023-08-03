
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/Record.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88ce5Wp+2VNvqg44kCJeAdQ', 'Record');
// scripts/three_languages/Record.ts

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
var LobbyMain_lan_1 = require("./set_languages/LobbyMain_lan");
var ccclass = cc._decorator.ccclass;
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 存储当前按钮点了哪个语言
     */
    Record.prototype.which_language = function (cur) {
        var language = cur.currentTarget.name;
        cc.sys.localStorage.setItem('selectedLanguage', language);
        LobbyMain_lan_1.default.Instance.setLanguage();
        console.log(language);
    };
    Record = __decorate([
        ccclass
    ], Record);
    return Record;
}(cc.Component));
exports.default = Record;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxSZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTBEO0FBRWxELElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBR2xDO0lBQW9DLDBCQUFZO0lBQWhEOztJQVdBLENBQUM7SUFURzs7T0FFRztJQUNILCtCQUFjLEdBQWQsVUFBZSxHQUFRO1FBQ25CLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFWZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQVcxQjtJQUFELGFBQUM7Q0FYRCxBQVdDLENBWG1DLEVBQUUsQ0FBQyxTQUFTLEdBVy9DO2tCQVhvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYmJ5TWFpbl9sYW4gZnJvbSBcIi4vc2V0X2xhbmd1YWdlcy9Mb2JieU1haW5fbGFuXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Y5YKo5b2T5YmN5oyJ6ZKu54K55LqG5ZOq5Liq6K+t6KiAXHJcbiAgICAgKi9cclxuICAgIHdoaWNoX2xhbmd1YWdlKGN1cjogYW55KSB7XHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY3VyLmN1cnJlbnRUYXJnZXQubmFtZTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGVjdGVkTGFuZ3VhZ2UnLCBsYW5ndWFnZSk7XHJcbiAgICAgICAgTG9iYnlNYWluX2xhbi5JbnN0YW5jZS5zZXRMYW5ndWFnZSgpOyBcclxuICAgICAgICBjb25zb2xlLmxvZyhsYW5ndWFnZSk7XHJcbiAgICB9XHJcbn1cclxuIl19