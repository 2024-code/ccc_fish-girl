
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/winCoins/winCoins.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6631c7iCtlBWqxkG4SpWG5x', 'winCoins');
// LaoHuJi/module/winCoins/winCoins.js

"use strict";

var coinMove = require("coinMove");

cc.Class({
  "extends": cc.Component,
  properties: {
    Label_coins: {
      "default": null,
      type: cc.Label,
      tooltip: "金币文字"
    },
    Prefab_coin: {
      "default": null,
      type: cc.Prefab,
      tooltip: "金币预制件"
    },
    MaxPrefabCoinNum: {
      "default": 20,
      tooltip: "最多可以生成多少个金币预制件"
    },
    ShowTime: {
      "default": 2,
      tooltip: "展示中奖金币的时长（秒）"
    },
    Time: {
      "default": 3,
      tooltip: "加金币动画的总时长（秒）"
    },
    ValueOfPrefabCoin: {
      "default": 100,
      tooltip: "一个金币预制件代表的价值"
    },
    _winCoins: 0,
    //赢了多少金币
    _currentAdd: 0,
    //当前加到多少金币
    _addSpeed: 0,
    //每秒金币增加量
    _continueAdd: false //持续增加金币

  },
  Initialize: function Initialize(winCoins, posStart, posEnd) {
    if (winCoins <= 0) return;
    this._winCoins = winCoins;
    this._posStart = posStart;
    this._posEnd = posEnd;
    this._addSpeed = Math.ceil(winCoins / this.Time);
    var prefabCoinNum = Math.ceil(winCoins / this.ValueOfPrefabCoin);
    this._prefabCoinNum = Math.min(prefabCoinNum, this.MaxPrefabCoinNum);
    this._prefabCoinsArray = new Array();
    this.Label_coins.string = this._currentAdd;
    this._continueAdd = true;
  },
  update: function update(dt) {
    if (this._continueAdd) {
      var addCoins = Math.ceil(this._addSpeed * dt);
      this._currentAdd += addCoins;
      this.Label_coins.string = this._currentAdd;

      if (this._prefabCoinsArray.length < this._prefabCoinNum) {
        //金币预制件数组元素个数少于应该生成的金币数
        var prefabCoinNum = Math.ceil(this._currentAdd / this.ValueOfPrefabCoin);

        if (prefabCoinNum > this._prefabCoinsArray.length) {
          var instantiateNum = prefabCoinNum - this._prefabCoinsArray.length;

          for (var i = 0; i < instantiateNum; i++) {
            var nodeCoin = cc.instantiate(this.Prefab_coin); //克隆一个金币

            nodeCoin.parent = this.node.parent;
            nodeCoin.getComponent(coinMove).SetData(this._posStart, this._posEnd); //设置金币的起点和终点

            this._prefabCoinsArray.push(nodeCoin.getComponent(coinMove));
          }
        }
      }

      if (this._currentAdd >= this._winCoins) {
        this.Label_coins.string = this._winCoins;
        this._continueAdd = false;
        this.scheduleOnce(function () {
          this.node.active = false;
          this.node.destroy();
        }, this.ShowTime);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFx3aW5Db2luc1xcd2luQ29pbnMuanMiXSwibmFtZXMiOlsiY29pbk1vdmUiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJMYWJlbF9jb2lucyIsInR5cGUiLCJMYWJlbCIsInRvb2x0aXAiLCJQcmVmYWJfY29pbiIsIlByZWZhYiIsIk1heFByZWZhYkNvaW5OdW0iLCJTaG93VGltZSIsIlRpbWUiLCJWYWx1ZU9mUHJlZmFiQ29pbiIsIl93aW5Db2lucyIsIl9jdXJyZW50QWRkIiwiX2FkZFNwZWVkIiwiX2NvbnRpbnVlQWRkIiwiSW5pdGlhbGl6ZSIsIndpbkNvaW5zIiwicG9zU3RhcnQiLCJwb3NFbmQiLCJfcG9zU3RhcnQiLCJfcG9zRW5kIiwiTWF0aCIsImNlaWwiLCJwcmVmYWJDb2luTnVtIiwiX3ByZWZhYkNvaW5OdW0iLCJtaW4iLCJfcHJlZmFiQ29pbnNBcnJheSIsIkFycmF5Iiwic3RyaW5nIiwidXBkYXRlIiwiZHQiLCJhZGRDb2lucyIsImxlbmd0aCIsImluc3RhbnRpYXRlTnVtIiwiaSIsIm5vZGVDb2luIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiU2V0RGF0YSIsInB1c2giLCJzY2hlZHVsZU9uY2UiLCJhY3RpdmUiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxLQUZBO0FBR1RDLE1BQUFBLE9BQU8sRUFBRTtBQUhBLEtBREw7QUFNUkMsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsTUFGQTtBQUdURixNQUFBQSxPQUFPLEVBQUU7QUFIQSxLQU5MO0FBV1JHLElBQUFBLGdCQUFnQixFQUFFO0FBQ2QsaUJBQVMsRUFESztBQUVkSCxNQUFBQSxPQUFPLEVBQUU7QUFGSyxLQVhWO0FBZVJJLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLENBREg7QUFFTkosTUFBQUEsT0FBTyxFQUFFO0FBRkgsS0FmRjtBQW1CUkssSUFBQUEsSUFBSSxFQUFFO0FBQ0YsaUJBQVMsQ0FEUDtBQUVGTCxNQUFBQSxPQUFPLEVBQUU7QUFGUCxLQW5CRTtBQXVCUk0sSUFBQUEsaUJBQWlCLEVBQUU7QUFDZixpQkFBUyxHQURNO0FBRWZOLE1BQUFBLE9BQU8sRUFBRTtBQUZNLEtBdkJYO0FBNEJSTyxJQUFBQSxTQUFTLEVBQUUsQ0E1Qkg7QUE0Qks7QUFDYkMsSUFBQUEsV0FBVyxFQUFFLENBN0JMO0FBNkJPO0FBQ2ZDLElBQUFBLFNBQVMsRUFBRSxDQTlCSDtBQThCSztBQUNiQyxJQUFBQSxZQUFZLEVBQUUsS0EvQk4sQ0ErQlk7O0FBL0JaLEdBSFA7QUFxQ0xDLEVBQUFBLFVBQVUsRUFBRSxvQkFBVUMsUUFBVixFQUFvQkMsUUFBcEIsRUFBOEJDLE1BQTlCLEVBQXNDO0FBQzlDLFFBQUlGLFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUVuQixTQUFLTCxTQUFMLEdBQWlCSyxRQUFqQjtBQUNBLFNBQUtHLFNBQUwsR0FBaUJGLFFBQWpCO0FBQ0EsU0FBS0csT0FBTCxHQUFlRixNQUFmO0FBRUEsU0FBS0wsU0FBTCxHQUFpQlEsSUFBSSxDQUFDQyxJQUFMLENBQVVOLFFBQVEsR0FBRyxLQUFLUCxJQUExQixDQUFqQjtBQUVBLFFBQUljLGFBQWEsR0FBR0YsSUFBSSxDQUFDQyxJQUFMLENBQVVOLFFBQVEsR0FBRyxLQUFLTixpQkFBMUIsQ0FBcEI7QUFDQSxTQUFLYyxjQUFMLEdBQXNCSCxJQUFJLENBQUNJLEdBQUwsQ0FBU0YsYUFBVCxFQUF3QixLQUFLaEIsZ0JBQTdCLENBQXRCO0FBQ0EsU0FBS21CLGlCQUFMLEdBQXlCLElBQUlDLEtBQUosRUFBekI7QUFFQSxTQUFLMUIsV0FBTCxDQUFpQjJCLE1BQWpCLEdBQTBCLEtBQUtoQixXQUEvQjtBQUNBLFNBQUtFLFlBQUwsR0FBb0IsSUFBcEI7QUFDSCxHQXBESTtBQXNETGUsRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFDbEIsUUFBSSxLQUFLaEIsWUFBVCxFQUF1QjtBQUNuQixVQUFJaUIsUUFBUSxHQUFHVixJQUFJLENBQUNDLElBQUwsQ0FBVSxLQUFLVCxTQUFMLEdBQWlCaUIsRUFBM0IsQ0FBZjtBQUNBLFdBQUtsQixXQUFMLElBQW9CbUIsUUFBcEI7QUFDQSxXQUFLOUIsV0FBTCxDQUFpQjJCLE1BQWpCLEdBQTBCLEtBQUtoQixXQUEvQjs7QUFFQSxVQUFJLEtBQUtjLGlCQUFMLENBQXVCTSxNQUF2QixHQUFnQyxLQUFLUixjQUF6QyxFQUF5RDtBQUFDO0FBQ3RELFlBQUlELGFBQWEsR0FBR0YsSUFBSSxDQUFDQyxJQUFMLENBQVUsS0FBS1YsV0FBTCxHQUFtQixLQUFLRixpQkFBbEMsQ0FBcEI7O0FBQ0EsWUFBSWEsYUFBYSxHQUFHLEtBQUtHLGlCQUFMLENBQXVCTSxNQUEzQyxFQUFtRDtBQUMvQyxjQUFJQyxjQUFjLEdBQUdWLGFBQWEsR0FBRyxLQUFLRyxpQkFBTCxDQUF1Qk0sTUFBNUQ7O0FBQ0EsZUFBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxjQUFwQixFQUFvQ0MsQ0FBQyxFQUFyQyxFQUF5QztBQUNyQyxnQkFBSUMsUUFBUSxHQUFHdEMsRUFBRSxDQUFDdUMsV0FBSCxDQUFlLEtBQUsvQixXQUFwQixDQUFmLENBRHFDLENBQ1c7O0FBQ2hEOEIsWUFBQUEsUUFBUSxDQUFDRSxNQUFULEdBQWtCLEtBQUtDLElBQUwsQ0FBVUQsTUFBNUI7QUFDQUYsWUFBQUEsUUFBUSxDQUFDSSxZQUFULENBQXNCNUMsUUFBdEIsRUFBZ0M2QyxPQUFoQyxDQUF3QyxLQUFLckIsU0FBN0MsRUFBd0QsS0FBS0MsT0FBN0QsRUFIcUMsQ0FHaUM7O0FBQ3RFLGlCQUFLTSxpQkFBTCxDQUF1QmUsSUFBdkIsQ0FBNEJOLFFBQVEsQ0FBQ0ksWUFBVCxDQUFzQjVDLFFBQXRCLENBQTVCO0FBQ0g7QUFDSjtBQUNKOztBQUVELFVBQUksS0FBS2lCLFdBQUwsSUFBb0IsS0FBS0QsU0FBN0IsRUFBd0M7QUFDcEMsYUFBS1YsV0FBTCxDQUFpQjJCLE1BQWpCLEdBQTBCLEtBQUtqQixTQUEvQjtBQUNBLGFBQUtHLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLNEIsWUFBTCxDQUFrQixZQUFZO0FBQzFCLGVBQUtKLElBQUwsQ0FBVUssTUFBVixHQUFtQixLQUFuQjtBQUNBLGVBQUtMLElBQUwsQ0FBVU0sT0FBVjtBQUNILFNBSEQsRUFHRyxLQUFLcEMsUUFIUjtBQUlIO0FBQ0o7QUFDSjtBQWxGSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29pbk1vdmUgPSByZXF1aXJlKFwiY29pbk1vdmVcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgTGFiZWxfY29pbnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi6YeR5biB5paH5a2XXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBQcmVmYWJfY29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi6YeR5biB6aKE5Yi25Lu2XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBNYXhQcmVmYWJDb2luTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDIwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuacgOWkmuWPr+S7peeUn+aIkOWkmuWwkeS4qumHkeW4gemihOWItuS7tlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU2hvd1RpbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMixcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLlsZXnpLrkuK3lpZbph5HluIHnmoTml7bplb/vvIjnp5LvvIlcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFRpbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMyxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLliqDph5HluIHliqjnlLvnmoTmgLvml7bplb/vvIjnp5LvvIlcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFZhbHVlT2ZQcmVmYWJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEwMCxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLkuIDkuKrph5HluIHpooTliLbku7bku6PooajnmoTku7flgLxcIixcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfd2luQ29pbnM6IDAsLy/otaLkuoblpJrlsJHph5HluIFcclxuICAgICAgICBfY3VycmVudEFkZDogMCwvL+W9k+WJjeWKoOWIsOWkmuWwkemHkeW4gVxyXG4gICAgICAgIF9hZGRTcGVlZDogMCwvL+avj+enkumHkeW4geWinuWKoOmHj1xyXG4gICAgICAgIF9jb250aW51ZUFkZDogZmFsc2UsLy/mjIHnu63lop7liqDph5HluIFcclxuICAgIH0sXHJcblxyXG4gICAgSW5pdGlhbGl6ZTogZnVuY3Rpb24gKHdpbkNvaW5zLCBwb3NTdGFydCwgcG9zRW5kKSB7XHJcbiAgICAgICAgaWYgKHdpbkNvaW5zIDw9IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fd2luQ29pbnMgPSB3aW5Db2lucztcclxuICAgICAgICB0aGlzLl9wb3NTdGFydCA9IHBvc1N0YXJ0O1xyXG4gICAgICAgIHRoaXMuX3Bvc0VuZCA9IHBvc0VuZDtcclxuXHJcbiAgICAgICAgdGhpcy5fYWRkU3BlZWQgPSBNYXRoLmNlaWwod2luQ29pbnMgLyB0aGlzLlRpbWUpO1xyXG5cclxuICAgICAgICB2YXIgcHJlZmFiQ29pbk51bSA9IE1hdGguY2VpbCh3aW5Db2lucyAvIHRoaXMuVmFsdWVPZlByZWZhYkNvaW4pO1xyXG4gICAgICAgIHRoaXMuX3ByZWZhYkNvaW5OdW0gPSBNYXRoLm1pbihwcmVmYWJDb2luTnVtLCB0aGlzLk1heFByZWZhYkNvaW5OdW0pO1xyXG4gICAgICAgIHRoaXMuX3ByZWZhYkNvaW5zQXJyYXkgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5MYWJlbF9jb2lucy5zdHJpbmcgPSB0aGlzLl9jdXJyZW50QWRkO1xyXG4gICAgICAgIHRoaXMuX2NvbnRpbnVlQWRkID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5fY29udGludWVBZGQpIHtcclxuICAgICAgICAgICAgdmFyIGFkZENvaW5zID0gTWF0aC5jZWlsKHRoaXMuX2FkZFNwZWVkICogZHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50QWRkICs9IGFkZENvaW5zO1xyXG4gICAgICAgICAgICB0aGlzLkxhYmVsX2NvaW5zLnN0cmluZyA9IHRoaXMuX2N1cnJlbnRBZGQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcHJlZmFiQ29pbnNBcnJheS5sZW5ndGggPCB0aGlzLl9wcmVmYWJDb2luTnVtKSB7Ly/ph5HluIHpooTliLbku7bmlbDnu4TlhYPntKDkuKrmlbDlsJHkuo7lupTor6XnlJ/miJDnmoTph5HluIHmlbBcclxuICAgICAgICAgICAgICAgIHZhciBwcmVmYWJDb2luTnVtID0gTWF0aC5jZWlsKHRoaXMuX2N1cnJlbnRBZGQgLyB0aGlzLlZhbHVlT2ZQcmVmYWJDb2luKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmVmYWJDb2luTnVtID4gdGhpcy5fcHJlZmFiQ29pbnNBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFudGlhdGVOdW0gPSBwcmVmYWJDb2luTnVtIC0gdGhpcy5fcHJlZmFiQ29pbnNBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW50aWF0ZU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlQ29pbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUHJlZmFiX2NvaW4pOy8v5YWL6ZqG5LiA5Liq6YeR5biBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDb2luLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDb2luLmdldENvbXBvbmVudChjb2luTW92ZSkuU2V0RGF0YSh0aGlzLl9wb3NTdGFydCwgdGhpcy5fcG9zRW5kKTsvL+iuvue9rumHkeW4geeahOi1t+eCueWSjOe7iOeCuVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmVmYWJDb2luc0FycmF5LnB1c2gobm9kZUNvaW4uZ2V0Q29tcG9uZW50KGNvaW5Nb3ZlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudEFkZCA+PSB0aGlzLl93aW5Db2lucykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYWJlbF9jb2lucy5zdHJpbmcgPSB0aGlzLl93aW5Db2lucztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRpbnVlQWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLlNob3dUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pOyJdfQ==