
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/BCServer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27535EY5sJPF6xvwFgt6HHT', 'BCServer');
// Script/Lobby/BCServer.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // onLoad () {},
  start: function start() {
    if (!window.BCNetWork) {
      window.BCNetWork = require("BCNetWork");
      window.BCNetWork.netWorkInit_Function();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcQkNTZXJ2ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsIndpbmRvdyIsIkJDTmV0V29yayIsInJlcXVpcmUiLCJuZXRXb3JrSW5pdF9GdW5jdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBQyxFQUFBQSxLQVRLLG1CQVNHO0FBQ0osUUFBSSxDQUFDQyxNQUFNLENBQUNDLFNBQVosRUFBdUI7QUFDbkJELE1BQUFBLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQkMsT0FBTyxDQUFDLFdBQUQsQ0FBMUI7QUFDQUYsTUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCRSxvQkFBakI7QUFDSDtBQUNKO0FBZEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBpZiAoIXdpbmRvdy5CQ05ldFdvcmspIHtcclxuICAgICAgICAgICAgd2luZG93LkJDTmV0V29yayA9IHJlcXVpcmUoXCJCQ05ldFdvcmtcIik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5CQ05ldFdvcmsubmV0V29ya0luaXRfRnVuY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7XHJcbiJdfQ==