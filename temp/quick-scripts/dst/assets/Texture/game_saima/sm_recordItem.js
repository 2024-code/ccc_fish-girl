
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/game_saima/sm_recordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dfbac5waWhM6onohhggiUWF', 'sm_recordItem');
// Texture/game_saima/sm_recordItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    id_lab: cc.Label,
    first_sp: cc.Sprite,
    second_sp: cc.Sprite,
    third_sp: cc.Sprite,
    spList: [cc.SpriteFrame]
  },
  initData: function initData(data) {
    var str = data.id.toString();
    this.id_lab.string = str.substring(str.length - 4, str.length);
    var result = JSON.parse(data.result_array);
    var winList = result.win_list;

    for (var i in winList) {
      if (winList[i] == 0) {
        this.first_sp.spriteFrame = this.spList[i];
      }

      if (winList[i] == 1) {
        this.second_sp.spriteFrame = this.spList[i];
      }

      if (winList[i] == 2) {
        this.third_sp.spriteFrame = this.spList[i];
      }
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcZ2FtZV9zYWltYVxcc21fcmVjb3JkSXRlbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImlkX2xhYiIsIkxhYmVsIiwiZmlyc3Rfc3AiLCJTcHJpdGUiLCJzZWNvbmRfc3AiLCJ0aGlyZF9zcCIsInNwTGlzdCIsIlNwcml0ZUZyYW1lIiwiaW5pdERhdGEiLCJkYXRhIiwic3RyIiwiaWQiLCJ0b1N0cmluZyIsInN0cmluZyIsInN1YnN0cmluZyIsImxlbmd0aCIsInJlc3VsdCIsIkpTT04iLCJwYXJzZSIsInJlc3VsdF9hcnJheSIsIndpbkxpc3QiLCJ3aW5fbGlzdCIsImkiLCJzcHJpdGVGcmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRUosRUFBRSxDQUFDSyxLQURIO0FBRVJDLElBQUFBLFFBQVEsRUFBRU4sRUFBRSxDQUFDTyxNQUZMO0FBR1JDLElBQUFBLFNBQVMsRUFBRVIsRUFBRSxDQUFDTyxNQUhOO0FBSVJFLElBQUFBLFFBQVEsRUFBRVQsRUFBRSxDQUFDTyxNQUpMO0FBS1JHLElBQUFBLE1BQU0sRUFBRSxDQUFDVixFQUFFLENBQUNXLFdBQUo7QUFMQSxHQUhQO0FBV0xDLEVBQUFBLFFBWEssb0JBV0lDLElBWEosRUFXVTtBQUNYLFFBQUlDLEdBQUcsR0FBR0QsSUFBSSxDQUFDRSxFQUFMLENBQVFDLFFBQVIsRUFBVjtBQUNBLFNBQUtaLE1BQUwsQ0FBWWEsTUFBWixHQUFxQkgsR0FBRyxDQUFDSSxTQUFKLENBQWNKLEdBQUcsQ0FBQ0ssTUFBSixHQUFhLENBQTNCLEVBQThCTCxHQUFHLENBQUNLLE1BQWxDLENBQXJCO0FBQ0EsUUFBSUMsTUFBTSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV1QsSUFBSSxDQUFDVSxZQUFoQixDQUFiO0FBQ0EsUUFBSUMsT0FBTyxHQUFHSixNQUFNLENBQUNLLFFBQXJCOztBQUNBLFNBQUssSUFBSUMsQ0FBVCxJQUFjRixPQUFkLEVBQXVCO0FBQ25CLFVBQUlBLE9BQU8sQ0FBQ0UsQ0FBRCxDQUFQLElBQWMsQ0FBbEIsRUFBcUI7QUFDakIsYUFBS3BCLFFBQUwsQ0FBY3FCLFdBQWQsR0FBNEIsS0FBS2pCLE1BQUwsQ0FBWWdCLENBQVosQ0FBNUI7QUFDSDs7QUFDRCxVQUFJRixPQUFPLENBQUNFLENBQUQsQ0FBUCxJQUFjLENBQWxCLEVBQXFCO0FBQ2pCLGFBQUtsQixTQUFMLENBQWVtQixXQUFmLEdBQTZCLEtBQUtqQixNQUFMLENBQVlnQixDQUFaLENBQTdCO0FBQ0g7O0FBQ0QsVUFBSUYsT0FBTyxDQUFDRSxDQUFELENBQVAsSUFBYyxDQUFsQixFQUFxQjtBQUNqQixhQUFLakIsUUFBTCxDQUFja0IsV0FBZCxHQUE0QixLQUFLakIsTUFBTCxDQUFZZ0IsQ0FBWixDQUE1QjtBQUNIO0FBQ0o7QUFDSjtBQTNCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGlkX2xhYjogY2MuTGFiZWwsXHJcbiAgICAgICAgZmlyc3Rfc3A6IGNjLlNwcml0ZSxcclxuICAgICAgICBzZWNvbmRfc3A6IGNjLlNwcml0ZSxcclxuICAgICAgICB0aGlyZF9zcDogY2MuU3ByaXRlLFxyXG4gICAgICAgIHNwTGlzdDogW2NjLlNwcml0ZUZyYW1lXVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IGRhdGEuaWQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmlkX2xhYi5zdHJpbmcgPSBzdHIuc3Vic3RyaW5nKHN0ci5sZW5ndGggLSA0LCBzdHIubGVuZ3RoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhLnJlc3VsdF9hcnJheSk7XHJcbiAgICAgICAgbGV0IHdpbkxpc3QgPSByZXN1bHQud2luX2xpc3Q7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB3aW5MaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5MaXN0W2ldID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3Rfc3Auc3ByaXRlRnJhbWUgPSB0aGlzLnNwTGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod2luTGlzdFtpXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZF9zcC5zcHJpdGVGcmFtZSA9IHRoaXMuc3BMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3aW5MaXN0W2ldID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhpcmRfc3Auc3ByaXRlRnJhbWUgPSB0aGlzLnNwTGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==