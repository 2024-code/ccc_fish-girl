
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/stateMachine/stateMachine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '810c1cMrxZMH5EaHG4iHWHq', 'stateMachine');
// LaoHuJi/module/stateMachine/stateMachine.js

"use strict";

//不知道怎么用js写枚举变量，先用整数代替吧
//规定  state === 0 表示准备状态
//规定  state === 1 表示开始状态
//规定  state === 2 表示停止状态
//----------------------------------------------
//增加：state === 3 表示中奖展示状态
//增加：ShowTime    中奖展示时间
//增加：state === 4 表示错误状态
//增加：Timeout     连接超时倒计时
cc.Class({
  "extends": cc.Component,
  properties: {
    _state: 0,
    _receiveStop: false,
    _interval: false
  },
  Input_Error: function Input_Error() {
    //开始状态->错误状态
    if (this._state === 1) {
      this.unscheduleAllCallbacks();
      this._receiveStop = false;
      this._interval = false;
      this.SetState(4); //进入错误状态
    }
  },
  Input_Start: function Input_Start(interval, timeout) {
    //准备状态->开始状态
    if (this._state === 0) {
      this.SetState(1); //进入开始状态

      this.scheduleOnce(function () {
        this._interval = true;
      }, interval);
      this.scheduleOnce(this.Input_Error, timeout); //超时后进入错误状态
    }
  },
  Input_Stop: function Input_Stop() {
    //开始状态->停止状态
    if (this._state === 1) {
      this._receiveStop = true;
      this.unschedule(this.Input_Error); //取消超时回调
    }
  },
  Input_Ready: function Input_Ready(showTime) {
    if (this._state === 2) {
      //停止状态->中奖展示状态
      this.SetState(3); //进入中奖展示状态

      this.scheduleOnce(function () {
        this.SetState(0); //进入准备状态
      }, showTime);
    } else if (this._state === 4) {
      //错误状态->准备状态
      this.SetState(0); //进入准备状态
    }
  },
  //改变当前状态，并投递状态改变事件
  SetState: function SetState(state) {
    this._state = state;
    var eventCustom = new cc.Event.EventCustom('Event_StateChange', true);
    eventCustom.setUserData(this._state);
    this.node.dispatchEvent(eventCustom);
  },
  GetState: function GetState() {
    return this._state;
  },
  update: function update() {
    //开始状态下，收到过停止命令并且等待的时间已超时
    if (this._state === 1 && this._receiveStop && this._interval) {
      this.SetState(2); //进入停止状态

      this._receiveStop = false;
      this._interval = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxzdGF0ZU1hY2hpbmVcXHN0YXRlTWFjaGluZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9zdGF0ZSIsIl9yZWNlaXZlU3RvcCIsIl9pbnRlcnZhbCIsIklucHV0X0Vycm9yIiwidW5zY2hlZHVsZUFsbENhbGxiYWNrcyIsIlNldFN0YXRlIiwiSW5wdXRfU3RhcnQiLCJpbnRlcnZhbCIsInRpbWVvdXQiLCJzY2hlZHVsZU9uY2UiLCJJbnB1dF9TdG9wIiwidW5zY2hlZHVsZSIsIklucHV0X1JlYWR5Iiwic2hvd1RpbWUiLCJzdGF0ZSIsImV2ZW50Q3VzdG9tIiwiRXZlbnQiLCJFdmVudEN1c3RvbSIsInNldFVzZXJEYXRhIiwibm9kZSIsImRpc3BhdGNoRXZlbnQiLCJHZXRTdGF0ZSIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRSxDQURBO0FBRVJDLElBQUFBLFlBQVksRUFBRSxLQUZOO0FBR1JDLElBQUFBLFNBQVMsRUFBRTtBQUhILEdBSFA7QUFTTEMsRUFBQUEsV0FBVyxFQUFFLHVCQUFZO0FBQ3JCO0FBQ0EsUUFBSSxLQUFLSCxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CLFdBQUtJLHNCQUFMO0FBQ0EsV0FBS0gsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxXQUFLRyxRQUFMLENBQWMsQ0FBZCxFQUptQixDQUlGO0FBQ3BCO0FBQ0osR0FqQkk7QUFtQkxDLEVBQUFBLFdBQVcsRUFBRSxxQkFBVUMsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI7QUFDdEM7QUFDQSxRQUFJLEtBQUtSLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsV0FBS0ssUUFBTCxDQUFjLENBQWQsRUFEbUIsQ0FDRjs7QUFDakIsV0FBS0ksWUFBTCxDQUFrQixZQUFZO0FBQzFCLGFBQUtQLFNBQUwsR0FBaUIsSUFBakI7QUFDSCxPQUZELEVBRUdLLFFBRkg7QUFJQSxXQUFLRSxZQUFMLENBQWtCLEtBQUtOLFdBQXZCLEVBQW9DSyxPQUFwQyxFQU5tQixDQU0wQjtBQUNoRDtBQUNKLEdBN0JJO0FBK0JMRSxFQUFBQSxVQUFVLEVBQUUsc0JBQVk7QUFDcEI7QUFDQSxRQUFJLEtBQUtWLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsV0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLFdBQUtVLFVBQUwsQ0FBZ0IsS0FBS1IsV0FBckIsRUFGbUIsQ0FFZTtBQUNyQztBQUNKLEdBckNJO0FBdUNMUyxFQUFBQSxXQUFXLEVBQUUscUJBQVVDLFFBQVYsRUFBb0I7QUFDN0IsUUFBSSxLQUFLYixNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQUM7QUFDcEIsV0FBS0ssUUFBTCxDQUFjLENBQWQsRUFEbUIsQ0FDRjs7QUFDakIsV0FBS0ksWUFBTCxDQUFrQixZQUFZO0FBQzFCLGFBQUtKLFFBQUwsQ0FBYyxDQUFkLEVBRDBCLENBQ1Q7QUFDcEIsT0FGRCxFQUVHUSxRQUZIO0FBR0gsS0FMRCxNQU1LLElBQUksS0FBS2IsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUFDO0FBQ3pCLFdBQUtLLFFBQUwsQ0FBYyxDQUFkLEVBRHdCLENBQ1A7QUFDcEI7QUFDSixHQWpESTtBQW1ETDtBQUNBQSxFQUFBQSxRQUFRLEVBQUUsa0JBQVVTLEtBQVYsRUFBaUI7QUFDdkIsU0FBS2QsTUFBTCxHQUFjYyxLQUFkO0FBQ0EsUUFBSUMsV0FBVyxHQUFHLElBQUluQixFQUFFLENBQUNvQixLQUFILENBQVNDLFdBQWIsQ0FBeUIsbUJBQXpCLEVBQThDLElBQTlDLENBQWxCO0FBQ0FGLElBQUFBLFdBQVcsQ0FBQ0csV0FBWixDQUF3QixLQUFLbEIsTUFBN0I7QUFDQSxTQUFLbUIsSUFBTCxDQUFVQyxhQUFWLENBQXdCTCxXQUF4QjtBQUNILEdBekRJO0FBMkRMTSxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEIsV0FBTyxLQUFLckIsTUFBWjtBQUNILEdBN0RJO0FBK0RMc0IsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCO0FBQ0EsUUFBSSxLQUFLdEIsTUFBTCxLQUFnQixDQUFoQixJQUFxQixLQUFLQyxZQUExQixJQUEwQyxLQUFLQyxTQUFuRCxFQUE4RDtBQUMxRCxXQUFLRyxRQUFMLENBQWMsQ0FBZCxFQUQwRCxDQUN6Qzs7QUFDakIsV0FBS0osWUFBTCxHQUFvQixLQUFwQjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDSDtBQUNKO0FBdEVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5LiN55+l6YGT5oCO5LmI55SoanPlhpnmnprkuL7lj5jph4/vvIzlhYjnlKjmlbTmlbDku6Pmm7/lkKdcclxuLy/op4TlrpogIHN0YXRlID09PSAwIOihqOekuuWHhuWkh+eKtuaAgVxyXG4vL+inhOWumiAgc3RhdGUgPT09IDEg6KGo56S65byA5aeL54q25oCBXHJcbi8v6KeE5a6aICBzdGF0ZSA9PT0gMiDooajnpLrlgZzmraLnirbmgIFcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8v5aKe5Yqg77yac3RhdGUgPT09IDMg6KGo56S65Lit5aWW5bGV56S654q25oCBXHJcbi8v5aKe5Yqg77yaU2hvd1RpbWUgICAg5Lit5aWW5bGV56S65pe26Ze0XHJcbi8v5aKe5Yqg77yac3RhdGUgPT09IDQg6KGo56S66ZSZ6K+v54q25oCBXHJcbi8v5aKe5Yqg77yaVGltZW91dCAgICAg6L+e5o6l6LaF5pe25YCS6K6h5pe2XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX3N0YXRlOiAwLFxyXG4gICAgICAgIF9yZWNlaXZlU3RvcDogZmFsc2UsXHJcbiAgICAgICAgX2ludGVydmFsOiBmYWxzZSxcclxuICAgIH0sXHJcblxyXG4gICAgSW5wdXRfRXJyb3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+W8gOWni+eKtuaAgS0+6ZSZ6K+v54q25oCBXHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNlaXZlU3RvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlNldFN0YXRlKDQpOy8v6L+b5YWl6ZSZ6K+v54q25oCBXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJbnB1dF9TdGFydDogZnVuY3Rpb24gKGludGVydmFsLCB0aW1lb3V0KSB7XHJcbiAgICAgICAgLy/lh4blpIfnirbmgIEtPuW8gOWni+eKtuaAgVxyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLlNldFN0YXRlKDEpOy8v6L+b5YWl5byA5aeL54q25oCBXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVydmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgaW50ZXJ2YWwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5JbnB1dF9FcnJvciwgdGltZW91dCk7Ly/otoXml7blkI7ov5vlhaXplJnor6/nirbmgIFcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIElucHV0X1N0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+W8gOWni+eKtuaAgS0+5YGc5q2i54q25oCBXHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY2VpdmVTdG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuSW5wdXRfRXJyb3IpOy8v5Y+W5raI6LaF5pe25Zue6LCDXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJbnB1dF9SZWFkeTogZnVuY3Rpb24gKHNob3dUaW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSAyKSB7Ly/lgZzmraLnirbmgIEtPuS4reWlluWxleekuueKtuaAgVxyXG4gICAgICAgICAgICB0aGlzLlNldFN0YXRlKDMpOy8v6L+b5YWl5Lit5aWW5bGV56S654q25oCBXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2V0U3RhdGUoMCk7Ly/ov5vlhaXlh4blpIfnirbmgIFcclxuICAgICAgICAgICAgfSwgc2hvd1RpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zdGF0ZSA9PT0gNCkgey8v6ZSZ6K+v54q25oCBLT7lh4blpIfnirbmgIFcclxuICAgICAgICAgICAgdGhpcy5TZXRTdGF0ZSgwKTsvL+i/m+WFpeWHhuWkh+eKtuaAgVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/mlLnlj5jlvZPliY3nirbmgIHvvIzlubbmipXpgJLnirbmgIHmlLnlj5jkuovku7ZcclxuICAgIFNldFN0YXRlOiBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHZhciBldmVudEN1c3RvbSA9IG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbSgnRXZlbnRfU3RhdGVDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICBldmVudEN1c3RvbS5zZXRVc2VyRGF0YSh0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnRDdXN0b20pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/lvIDlp4vnirbmgIHkuIvvvIzmlLbliLDov4flgZzmraLlkb3ku6TlubbkuJTnrYnlvoXnmoTml7bpl7Tlt7LotoXml7ZcclxuICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IDEgJiYgdGhpcy5fcmVjZWl2ZVN0b3AgJiYgdGhpcy5faW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRTdGF0ZSgyKTsvL+i/m+WFpeWBnOatoueKtuaAgVxyXG4gICAgICAgICAgICB0aGlzLl9yZWNlaXZlU3RvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pOyJdfQ==