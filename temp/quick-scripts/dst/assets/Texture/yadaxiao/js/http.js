
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/yadaxiao/js/http.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a7cciil55HNrdi1OW7S7UJ', 'http');
// Texture/yadaxiao/js/http.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    timeText: cc.Label,
    typeText: cc.Label
  },
  statics: {
    //短连接
    createXMLHttpRequest: function createXMLHttpRequest(url, handler) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
          var response = xhr.responseText;
          console.log(xhr.responseText);
          var ret = eval("(" + response + ")");

          if (handler !== null) {
            handler(ret);
          }
        }
      };

      xhr.open("GET", url, true);
      xhr.send();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxceWFkYXhpYW9cXGpzXFxodHRwLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGltZVRleHQiLCJMYWJlbCIsInR5cGVUZXh0Iiwic3RhdGljcyIsImNyZWF0ZVhNTEh0dHBSZXF1ZXN0IiwidXJsIiwiaGFuZGxlciIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsInJldCIsImV2YWwiLCJvcGVuIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUosRUFBRSxDQUFDSyxLQURMO0FBRVJDLElBQUFBLFFBQVEsRUFBRU4sRUFBRSxDQUFDSztBQUZMLEdBSFA7QUFRTEUsRUFBQUEsT0FBTyxFQUFDO0FBQ0o7QUFDQUMsSUFBQUEsb0JBQW9CLEVBQUUsOEJBQVNDLEdBQVQsRUFBYUMsT0FBYixFQUFxQjtBQUN2QyxVQUFJQyxHQUFHLEdBQUcsSUFBSUMsY0FBSixFQUFWOztBQUNBRCxNQUFBQSxHQUFHLENBQUNFLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsWUFBSUYsR0FBRyxDQUFDRyxVQUFKLElBQWtCLENBQWxCLElBQXdCSCxHQUFHLENBQUNJLE1BQUosSUFBYyxHQUFkLElBQXFCSixHQUFHLENBQUNJLE1BQUosR0FBYSxHQUE5RCxFQUFvRTtBQUNoRSxjQUFJQyxRQUFRLEdBQUdMLEdBQUcsQ0FBQ00sWUFBbkI7QUFDQUMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlSLEdBQUcsQ0FBQ00sWUFBaEI7QUFDQSxjQUFJRyxHQUFHLEdBQUdDLElBQUksQ0FBQyxNQUFJTCxRQUFKLEdBQWEsR0FBZCxDQUFkOztBQUNBLGNBQUdOLE9BQU8sS0FBSyxJQUFmLEVBQW9CO0FBQ2hCQSxZQUFBQSxPQUFPLENBQUNVLEdBQUQsQ0FBUDtBQUNIO0FBQ0o7QUFDSixPQVREOztBQVVBVCxNQUFBQSxHQUFHLENBQUNXLElBQUosQ0FBUyxLQUFULEVBQWdCYixHQUFoQixFQUFxQixJQUFyQjtBQUNBRSxNQUFBQSxHQUFHLENBQUNZLElBQUo7QUFDSDtBQWhCRztBQVJILENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdGltZVRleHQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIHR5cGVUZXh0OiBjYy5MYWJlbCxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczp7XHJcbiAgICAgICAgLy/nn63ov57mjqVcclxuICAgICAgICBjcmVhdGVYTUxIdHRwUmVxdWVzdDogZnVuY3Rpb24odXJsLGhhbmRsZXIpe1xyXG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSBldmFsKFwiKFwiK3Jlc3BvbnNlK1wiKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihoYW5kbGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59KTtcclxuIl19