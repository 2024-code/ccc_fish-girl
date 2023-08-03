
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/HotUpdate/HotUpdateButtonClick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '35e25FCwSpPM5IFc6ZZ2lB8', 'HotUpdateButtonClick');
// Script/HotUpdate/HotUpdateButtonClick.js

"use strict";

/**
 * 热更新点击事件处理
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    canvasNode: {
      "default": null,
      type: cc.Node
    }
  },
  onLoad: function onLoad() {},
  messageBoxConfirmButtonClick_Function: function messageBoxConfirmButtonClick_Function() {
    this.canvasNode.getComponent("HotUpdateMain").com_MessageBox.active = false;
    this.canvasNode.getComponent("HotUpdateMain").getIp_Function(this.canvasNode.getComponent("HotUpdateMain").configData);
  },
  openURL: function openURL() {
    this.node.parent.active = false;
    cc.sys.openURL("https://itunes.apple.com/cn/app/%E9%BE%99%E6%B5%A9%E7%9F%BF%E5%B7%A5/id1256343442?mt=8");
  },
  versionUpdate: function versionUpdate() {
    if (cc.sys.isNative) {
      //onfire.fire("onplatform","openurl",window.versionUrl);
      var s = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openurl", "(Ljava/lang/String;)I", window.versionUrl);

      if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        var ret = jsb.reflection.callStaticMethod("AdMaster", "openurl:title:", window.versionUrl, "");
      } else {
        var s = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openurl", "(Ljava/lang/String;)I", window.versionUrl);
      }
    } else {
      cc.sys.openURL(window.versionUrl);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxIb3RVcGRhdGVcXEhvdFVwZGF0ZUJ1dHRvbkNsaWNrLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY2FudmFzTm9kZSIsInR5cGUiLCJOb2RlIiwib25Mb2FkIiwibWVzc2FnZUJveENvbmZpcm1CdXR0b25DbGlja19GdW5jdGlvbiIsImdldENvbXBvbmVudCIsImNvbV9NZXNzYWdlQm94IiwiYWN0aXZlIiwiZ2V0SXBfRnVuY3Rpb24iLCJjb25maWdEYXRhIiwib3BlblVSTCIsIm5vZGUiLCJwYXJlbnQiLCJzeXMiLCJ2ZXJzaW9uVXBkYXRlIiwiaXNOYXRpdmUiLCJzIiwianNiIiwicmVmbGVjdGlvbiIsImNhbGxTdGF0aWNNZXRob2QiLCJ3aW5kb3ciLCJ2ZXJzaW9uVXJsIiwib3MiLCJPU19JT1MiLCJyZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZEO0FBREosR0FIUDtBQVVMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVcsQ0FBRSxDQVZoQjtBQVdMQyxFQUFBQSxxQ0FBcUMsRUFBRSxpREFBVztBQUM5QyxTQUFLSixVQUFMLENBQWdCSyxZQUFoQixDQUE2QixlQUE3QixFQUE4Q0MsY0FBOUMsQ0FBNkRDLE1BQTdELEdBQXNFLEtBQXRFO0FBQ0EsU0FBS1AsVUFBTCxDQUFnQkssWUFBaEIsQ0FBNkIsZUFBN0IsRUFBOENHLGNBQTlDLENBQTZELEtBQUtSLFVBQUwsQ0FBZ0JLLFlBQWhCLENBQTZCLGVBQTdCLEVBQThDSSxVQUEzRztBQUNILEdBZEk7QUFlTEMsRUFBQUEsT0FBTyxFQUFFLG1CQUFXO0FBQ2hCLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkwsTUFBakIsR0FBMEIsS0FBMUI7QUFDQVgsSUFBQUEsRUFBRSxDQUFDaUIsR0FBSCxDQUFPSCxPQUFQLENBQWUsd0ZBQWY7QUFDSCxHQWxCSTtBQW1CTEksRUFBQUEsYUFuQkssMkJBbUJVO0FBQ1gsUUFBSWxCLEVBQUUsQ0FBQ2lCLEdBQUgsQ0FBT0UsUUFBWCxFQUFvQjtBQUNoQjtBQUNBLFVBQUlDLENBQUMsR0FBR0MsR0FBRyxDQUFDQyxVQUFKLENBQWVDLGdCQUFmLENBQWdDLHFDQUFoQyxFQUFzRSxTQUF0RSxFQUFpRix1QkFBakYsRUFBeUdDLE1BQU0sQ0FBQ0MsVUFBaEgsQ0FBUjs7QUFDQSxVQUFJekIsRUFBRSxDQUFDaUIsR0FBSCxDQUFPRSxRQUFQLElBQWlCbkIsRUFBRSxDQUFDaUIsR0FBSCxDQUFPUyxFQUFQLElBQVcxQixFQUFFLENBQUNpQixHQUFILENBQU9VLE1BQXZDLEVBQStDO0FBQzNDLFlBQUlDLEdBQUcsR0FBR1AsR0FBRyxDQUFDQyxVQUFKLENBQWVDLGdCQUFmLENBQWdDLFVBQWhDLEVBQTJDLGdCQUEzQyxFQUE0REMsTUFBTSxDQUFDQyxVQUFuRSxFQUE4RSxFQUE5RSxDQUFWO0FBQ0gsT0FGRCxNQUVLO0FBQ0QsWUFBSUwsQ0FBQyxHQUFHQyxHQUFHLENBQUNDLFVBQUosQ0FBZUMsZ0JBQWYsQ0FBZ0MscUNBQWhDLEVBQXNFLFNBQXRFLEVBQWlGLHVCQUFqRixFQUF5R0MsTUFBTSxDQUFDQyxVQUFoSCxDQUFSO0FBQ0g7QUFDSixLQVJELE1BUU07QUFDRnpCLE1BQUFBLEVBQUUsQ0FBQ2lCLEdBQUgsQ0FBT0gsT0FBUCxDQUFlVSxNQUFNLENBQUNDLFVBQXRCO0FBQ0g7QUFDSjtBQS9CSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog54Ot5pu05paw54K55Ye75LqL5Lu25aSE55CGXHJcbiAqL1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNhbnZhc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgbWVzc2FnZUJveENvbmZpcm1CdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkhvdFVwZGF0ZU1haW5cIikuY29tX01lc3NhZ2VCb3guYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkhvdFVwZGF0ZU1haW5cIikuZ2V0SXBfRnVuY3Rpb24odGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkhvdFVwZGF0ZU1haW5cIikuY29uZmlnRGF0YSk7XHJcbiAgICB9LFxyXG4gICAgb3BlblVSTDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjYy5zeXMub3BlblVSTChcImh0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvJUU5JUJFJTk5JUU2JUI1JUE5JUU3JTlGJUJGJUU1JUI3JUE1L2lkMTI1NjM0MzQ0Mj9tdD04XCIpO1xyXG4gICAgfSxcclxuICAgIHZlcnNpb25VcGRhdGUoKXtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAgICAgLy9vbmZpcmUuZmlyZShcIm9ucGxhdGZvcm1cIixcIm9wZW51cmxcIix3aW5kb3cudmVyc2lvblVybCk7XHJcbiAgICAgICAgICAgIHZhciBzID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsXCJvcGVudXJsXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylJXCIsd2luZG93LnZlcnNpb25VcmwpO1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlJiZjYy5zeXMub3M9PWNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXQgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiQWRNYXN0ZXJcIixcIm9wZW51cmw6dGl0bGU6XCIsd2luZG93LnZlcnNpb25VcmwsXCJcIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIixcIm9wZW51cmxcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KUlcIix3aW5kb3cudmVyc2lvblVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKHdpbmRvdy52ZXJzaW9uVXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIl19