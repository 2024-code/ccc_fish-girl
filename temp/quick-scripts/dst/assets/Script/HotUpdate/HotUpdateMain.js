
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/HotUpdate/HotUpdateMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '15b6cJoZwtLPpd4yudO7x/d', 'HotUpdateMain');
// Script/HotUpdate/HotUpdateMain.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    panel: {
      "default": null,
      type: cc.Node
    },
    com_MessageBox: {
      "default": null,
      type: cc.Node
    },
    manifestUrl: {
      type: cc.Asset,
      "default": null
    },
    sp_BG: {
      "default": null,
      type: cc.Sprite
    },
    pb_Loading: {
      "default": null,
      type: cc.Node
    },
    com_MessageBox_Update: {
      "default": null,
      type: cc.Node
    },
    _updating: false,
    _canRetry: false,
    progressUI: cc.ProgressBar,
    progress_lab: cc.Label,
    hallName: ""
  },

  /**
   * 检测版本
   * @param {*} event 
   */
  checkCb: function checkCb(event) {
    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
        this.panel.getComponent(cc.Label).string = "没找到本地更新文件";
        break;

      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        this.panel.getComponent(cc.Label).string = "更新文件下载失败";
        break;

      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        this.panel.getComponent(cc.Label).string = "开始更新";
        break;

      case jsb.EventAssetsManager.NEW_VERSION_FOUND:
        this.panel.getComponent(cc.Label).string = "游戏新版本查找失败";
        break;

      default:
        return;
    }

    cc.eventManager.removeListener(this._checkListener);
    this._checkListener = null;
    this._updating = false;
  },

  /**
   * 更新版本
   * @param {*} event 
   */
  updateCb: function updateCb(event) {
    //cc.log("***************************yyy*****************************");
    //是否更新完成
    var isFinished = false; //是否需要更新

    var isUpdate = false;

    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
        this.panel.getComponent("cc.Label").string = "没找到本地更新文件";
        isUpdate = true;
        break;

      case jsb.EventAssetsManager.UPDATE_PROGRESSION:
        this.pb_Loading.getComponent("cc.ProgressBar").progress = event.getDownloadedBytes() / event.getTotalBytes(); //获得消息

        var message = event.getMessage();

        if (message) {
          this.panel.getComponent("cc.Label").string = "更新中..." + message;
        }

        break;

      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        this.panel.getComponent("cc.Label").string = "更新文件下载失败";
        isUpdate = true;
        break;

      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        this.panel.getComponent("cc.Label").string = "已是最新版本";
        this.playerInfo.localVersion[0] = this.serverVersion;
        this.writeGameVersion_Function(this.playerInfo.localVersion, function () {
          // cc.log("***************************vvv*****************************");
          cc.game.restart();
        });
        isUpdate = true;
        break;

      case jsb.EventAssetsManager.UPDATE_FINISHED:
        this.panel.getComponent("cc.Label").string = "更新完成" + event.getMessage();
        isFinished = true; //cc.log("***************************uuu*****************************");

        break;

      case jsb.EventAssetsManager.UPDATE_FAILED:
        this.panel.getComponent("cc.Label").string = "更新失败" + event.getMessage();
        this._updating = false;
        this._canRetry = true;
        break;

      case jsb.EventAssetsManager.ERROR_UPDATING:
        this.panel.getComponent("cc.Label").string = "资源更新错误: " + event.getAssetId() + ", " + event.getMessage();
        break;

      case jsb.EventAssetsManager.ERROR_DECOMPRESS:
        this.panel.getComponent("cc.Label").string = event.getMessage();
    } //需要更新时处理事件


    if (isUpdate) {
      cc.eventManager.removeListener(this._updateListener);
      this._updateListener = null;
      this._updating = false;
    } //更新完成后处理事件


    if (isFinished) {
      cc.eventManager.removeListener(this._updateListener);
      this._updateListener = null; //获得更新路径

      var paths = jsb.fileUtils.getSearchPaths();

      var local_paths = this._am.getLocalManifest().getSearchPaths();

      Array.prototype.unshift(paths, local_paths); //搜索热更新文件

      cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(paths));
      jsb.fileUtils.setSearchPaths(paths);
      cc.audioEngine.stopAll(); //设置版本

      this.playerInfo.localVersion[0] = this.serverVersion; //重启

      this.writeGameVersion_Function(this.playerInfo.localVersion, function () {
        cc.game.restart();
      });
    }
  },

  /*
   * 尝试重新下载资源 
   */
  retry: function retry() {
    if (!this._updating && this._canRetry) {
      this._canRetry = false, this.panel.getComponent("cc.Label").string = "尝试重新下载资源";

      this._am.downloadFailedAssets();
    }
  },

  /*
   *检查更新
   */
  checkUpdate: function checkUpdate() {
    if (this._updating) {
      this.panel.getComponent("cc.Label").string = "检测更新中 ...";
    } else {
      if (this._am.getLocalManifest().isLoaded()) {
        this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        cc.eventManager.addListener(this._checkListener, 1);

        this._am.checkUpdate();

        this._updating = true;
        this.panel.getComponent("cc.Label").string = "检测完成";
      } else {
        this.panel.getComponent("cc.Label").string = "加载本地更新文件失败 ...";
      }
    }
  },

  /*
   *热更新方法
   */
  hotUpdate: function hotUpdate() {
    this.panel.getComponent(cc.Label).string = "更新中";
    this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
    cc.eventManager.addListener(this._updateListener, 1);
    this._failCount = 0;

    this._am.update();

    this._updating = true;
  },
  onLoad: function onLoad() {
    cc.debug.setDisplayStats(false); //关闭脏矩形

    if (cc.renderType === cc.game.RENDER_TYPE_CANVAS) {
      cc.renderer.enableDirtyRegion(false);
    }

    var self = this; //设置玩家信息

    this.playerInfo = require("PlayerInfo").getInstant;
    cc.view.setResizeCallback(function () {
      self.uiResize_Function();
    });
    this.uiInit_Function(); //加载配置文件

    cc.loader.loadRes('Configuration/Configuration', function (error, ret) {
      // cc.loader.load("res/raw-assets/Texture/Configuration/Configuration.json", function(error, ret){
      ret = ret.json;

      if (typeof ret.iosPay === "undefined") {
        self.playerInfo.iosPay = 0;
      } else {
        self.playerInfo.iosPay = ret.iosPay;
      }

      var strver = ret.versionCode;
      var index = strver.indexOf('_');
      strver = strver.substring(index + 1);
      window.game_ver = 'v' + strver;
      self.configData = ret;
      self.playerInfo.versionCode = ret.versionCode;
      self.playerInfo.loginIp = ret.loginIp;
      console.log(ret.loginIp);
      Lhjconfig.Server_IP = ret.loginIp.substring(0, ret.loginIp.lastIndexOf(':')); //给老虎机的服务器地址赋值

      self.playerInfo.guest = ret.guest;
      self.playerInfo.exchangeRate = ret.exchangeRate;
      self.getIp_Function(ret);
    });
    window.hallName = this.hallName;
  },

  /*
   *热更新UI初始化
   */
  uiInit_Function: function uiInit_Function() {
    var size = cc.view.getVisibleSize();
    var scale = size.width / 1334;

    if (size.width > 1334) {
      this.sp_BG.node.scaleX = scale;
      this.sp_BG.node.scaleY = scale;
    } else if (size.width < 1334) {
      this.sp_BG.node.scaleX = 1 / scale;
      this.sp_BG.node.scaleY = 1 / scale;
    }
  },

  /*
   *热更新进度条计算
   */
  uiResize_Function: function uiResize_Function() {
    var size = cc.view.getVisibleSize();
    var scale = size.width / 1334;

    if (size.width > 1334) {
      this.sp_BG.node.scaleX = scale;
      this.sp_BG.node.scaleY = scale;
    } else if (size.width < 1334) {
      this.sp_BG.node.scaleX = 1 / scale;
      this.sp_BG.node.scaleY = 1 / scale;
    }
  },

  /*
   * 获取IP地址
   */
  getIp_Function: function getIp_Function(ret) {
    //if (!cc.sys.isNative) 
    return void this.loadScene_Function();
    var self = this;
    var path = ret.loginIp + "/logitech";
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = xhr.response;

        if (xhr.response !== null) {
          try {
            response = JSON.parse(response);
            self.checkGameVersion_Function(ret, response);
          } catch (error) {
            console.log("JSON wrong");
          }
        }
      }
    };

    xhr.onerror = function () {
      self.com_MessageBox.active = true;
      self.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "连接服务器出错，请检测网络";
    };

    xhr.open("get", path);
    xhr.send();
  },

  /*
   *校验游戏版本
   */
  checkGameVersion_Function: function checkGameVersion_Function(data, info) {
    //获取缓存中的游戏版本信息
    var gameVersion = JSON.parse(cc.sys.localStorage.getItem("gameVersion"));

    if (cc.sys.os === cc.sys.OS_IOS) {
      if (gameVersion === null) {
        if (parseInt(info.lobby.toString().charAt(0)) > parseInt(data.versionArray.toString().charAt(0))) {
          this.com_MessageBox_Update.active = true;
        } else if (parseInt(info.lobby.toString().charAt(0)) > parseInt(gameVersion.gameVersion.toString().charAt(0))) {
          this.com_MessageBox_Update.active = true;
        }
      }
    }

    if (typeof data.showGame == "undefined") {
      data.showGame = 0;
    }

    if (typeof data.iosUpdate == "undefined") {
      data.iosUpdate = 0;
    }

    if (cc.sys.os === cc.sys.OS_IOS) {
      for (var i = 0; i < info.showgame.length; ++i) {
        if (data.showGame === info.showgame[i]) {
          cc.director.loadScene("FarmGuanQia");
        }
      }

      for (var i = 0; i < info.iosUpdate.length; ++i) {
        if (data.iosUpdate === info.iosUpdate[i]) {
          cc.director.loadScene("FarmGuanQia");
        }
      }
    }

    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);

    for (var i = 0; i < 4; ++i) {
      this.node.children[i].active = true;
    }

    if (!data.isUpdate) {
      this.loadScene_Function();
    } //设置子游戏版本信息


    this.playerInfo.serverVersion[0] = info.lobby;
    this.playerInfo.serverVersion[1] = info.cowgame_qiang;
    this.playerInfo.serverVersion[2] = info.fish;
    this.playerInfo.serverVersion[3] = info.cowgame_jindian;
    this.playerInfo.serverVersion[4] = info.game82;
    this.playerInfo.serverVersion[5] = info.game28;
    this.playerInfo.serverVersion[6] = info.linegame;
    this.playerInfo.serverVersion[7] = info.land;
    this.playerInfo.serverVersion[8] = info.run;

    if (gameVersion !== null) {
      this.playerInfo.localVersion = gameVersion.gameVersion;
    } else {
      this.playerInfo.localVersion = data.versionArray;
    } //版本长度比较


    if (this.playerInfo.localVersion.length === this.playerInfo.serverVersion.length) {
      for (var i = 0; i < this.playerInfo.serverVersion.length; ++i) {
        if (this.playerInfo.serverVersion[i] !== this.playerInfo.localVersion[i]) {
          this.playerInfo.needToUpdate[i] = 1;
        }
      }

      this.changeScene_Funtion();
    } else {
      this.playerInfo.localVersion[this.playerInfo.localVersion.length] = "1.0";
      this.writeGameVersion_Function(this.playerInfo.localVersion, function () {
        this.playerInfo.needToUpdate[0] = 1;
        this.changeScene_Funtion();
      }.bind(this));
    }

    cc.log(this.playerInfo.localVersion);
    cc.log(this.playerInfo.serverVersion);
    cc.log(this.playerInfo.needToUpdate);
  },

  /*
   *修改跟新进度条
   */
  changeScene_Funtion: function changeScene_Funtion() {
    if (this.playerInfo.needToUpdate[0]) {
      //cc.log("******************************ccc***************************************");
      this.gameUpdate_Function();
    } else {
      // cc.log("******************************ddd***************************************");
      this.node.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 1;
      this.loadScene_Function();
    } // 这是上面if语句的简写
    // return this.playerInfo.needToUpdate[0] ? (cc.log("******************************ccc***************************************"), void this.gameUpdate_Function()) : (cc.log("******************************ddd***************************************"), this.node.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 1, void this.loadScene_Function())

  },

  /*
   *跳转场景方法
   */
  loadScene_Function: function loadScene_Function() {
    var _this = this;

    var path = this.playerInfo.loginIp + "/checkVersion";
    var instance = this;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (!!xhr.response) {
          try {
            var response = JSON.parse(xhr.response);

            if (response.version == instance.playerInfo.versionCode) {
              // progressUI
              _this.p = 0;
              cc.director.preloadScene(window.hallName, function (cc, tc, item) {
                if (_this.p < cc / tc) {
                  _this.p = cc / tc;
                  _this.progressUI.progress = cc / tc;
                  _this.progress_lab.string = (cc / tc * 100).toFixed(2) + "%";
                }
              }, function () {
                cc.director.loadScene(window.hallName);
              });
            } else {
              var board = cc.find('Canvas/com_NewVersion');
              board.active = true;
              window.versionUrl = response.url;
            }
          } catch (e) {
            console.error('json解析错误');
          }
        }
      }
    };

    xhr.open("post", path);
    xhr.send();
  },

  /**
   * 
   * @param {*} version 
   * @param {*} callback 
   */
  writeGameVersion_Function: function writeGameVersion_Function(version, callback) {
    cc.sys.localStorage.setItem("gameVersion", JSON.stringify({
      gameVersion: version
    }));
    callback && callback();
  },

  /*
   * 热更新方法
   */
  gameUpdate_Function: function gameUpdate_Function() {
    var lobby_path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "lobby";
    this._am = new jsb.AssetsManager(this.manifestUrl, lobby_path);

    if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
      this._am.retain();
    }

    var self = this; //版本比较

    this._am.setVersionCompareHandle(function (loacl_version, server_version) {
      self.serverVersion = server_version;
      var loacl_version_list = loacl_version.split(".");
      var server_version_list = server_version.split(".");

      for (var i = 0; i < loacl_version_list.length; i++) {
        var loaclVersion = parseInt(loacl_version_list[i]);
        var serverVersion = parseInt(server_version_list[i] || 0);
        if (loaclVersion !== serverVersion) return -1;
      }

      if (server_version_list.length != loacl_version_list.length) {
        return -1;
      } else {
        return 0;
      }
    });

    var panel = this.panel;

    this._am.setVerifyCallback(function (error, ret) {
      var compressed = ret.compressed;
      var md5 = ret.md5;
      var path = ret.path;
      ret.size;

      if (compressed) {
        panel.getComponent("cc.Label").string = "Verification passed : " + path;
      } else {
        panel.getComponent("cc.Label").string = "Verification passed : " + path + " (" + md5 + ")";
      }
    });

    this.panel.getComponent("cc.Label").string = "更新已准备好，正在检测地址";

    if (cc.sys.os === cc.sys.OS_ANDROID) {
      this._am.setMaxConcurrentTask(1);

      this.panel.getComponent("cc.Label").string = "Max concurrent tasks count have been limited to 1";
    }

    this.hotUpdate();
  },

  /**
   * 销毁
   */
  onDestroy: function onDestroy() {
    if (this._updateListener) {
      cc.eventManager.removeListener(this._updateListener);
      this._updateListener = null;
    }

    if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
      this._am.release();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxIb3RVcGRhdGVcXEhvdFVwZGF0ZU1haW4uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwYW5lbCIsInR5cGUiLCJOb2RlIiwiY29tX01lc3NhZ2VCb3giLCJtYW5pZmVzdFVybCIsIkFzc2V0Iiwic3BfQkciLCJTcHJpdGUiLCJwYl9Mb2FkaW5nIiwiY29tX01lc3NhZ2VCb3hfVXBkYXRlIiwiX3VwZGF0aW5nIiwiX2NhblJldHJ5IiwicHJvZ3Jlc3NVSSIsIlByb2dyZXNzQmFyIiwicHJvZ3Jlc3NfbGFiIiwiTGFiZWwiLCJoYWxsTmFtZSIsImNoZWNrQ2IiLCJldmVudCIsImdldEV2ZW50Q29kZSIsImpzYiIsIkV2ZW50QXNzZXRzTWFuYWdlciIsIkVSUk9SX05PX0xPQ0FMX01BTklGRVNUIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwiRVJST1JfRE9XTkxPQURfTUFOSUZFU1QiLCJFUlJPUl9QQVJTRV9NQU5JRkVTVCIsIkFMUkVBRFlfVVBfVE9fREFURSIsIk5FV19WRVJTSU9OX0ZPVU5EIiwiZXZlbnRNYW5hZ2VyIiwicmVtb3ZlTGlzdGVuZXIiLCJfY2hlY2tMaXN0ZW5lciIsInVwZGF0ZUNiIiwiaXNGaW5pc2hlZCIsImlzVXBkYXRlIiwiVVBEQVRFX1BST0dSRVNTSU9OIiwicHJvZ3Jlc3MiLCJnZXREb3dubG9hZGVkQnl0ZXMiLCJnZXRUb3RhbEJ5dGVzIiwibWVzc2FnZSIsImdldE1lc3NhZ2UiLCJwbGF5ZXJJbmZvIiwibG9jYWxWZXJzaW9uIiwic2VydmVyVmVyc2lvbiIsIndyaXRlR2FtZVZlcnNpb25fRnVuY3Rpb24iLCJnYW1lIiwicmVzdGFydCIsIlVQREFURV9GSU5JU0hFRCIsIlVQREFURV9GQUlMRUQiLCJFUlJPUl9VUERBVElORyIsImdldEFzc2V0SWQiLCJFUlJPUl9ERUNPTVBSRVNTIiwiX3VwZGF0ZUxpc3RlbmVyIiwicGF0aHMiLCJmaWxlVXRpbHMiLCJnZXRTZWFyY2hQYXRocyIsImxvY2FsX3BhdGhzIiwiX2FtIiwiZ2V0TG9jYWxNYW5pZmVzdCIsIkFycmF5IiwicHJvdG90eXBlIiwidW5zaGlmdCIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwic2V0U2VhcmNoUGF0aHMiLCJhdWRpb0VuZ2luZSIsInN0b3BBbGwiLCJyZXRyeSIsImRvd25sb2FkRmFpbGVkQXNzZXRzIiwiY2hlY2tVcGRhdGUiLCJpc0xvYWRlZCIsIkV2ZW50TGlzdGVuZXJBc3NldHNNYW5hZ2VyIiwiYmluZCIsImFkZExpc3RlbmVyIiwiaG90VXBkYXRlIiwiX2ZhaWxDb3VudCIsInVwZGF0ZSIsIm9uTG9hZCIsImRlYnVnIiwic2V0RGlzcGxheVN0YXRzIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX0NBTlZBUyIsInJlbmRlcmVyIiwiZW5hYmxlRGlydHlSZWdpb24iLCJzZWxmIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJ2aWV3Iiwic2V0UmVzaXplQ2FsbGJhY2siLCJ1aVJlc2l6ZV9GdW5jdGlvbiIsInVpSW5pdF9GdW5jdGlvbiIsImxvYWRlciIsImxvYWRSZXMiLCJlcnJvciIsInJldCIsImpzb24iLCJpb3NQYXkiLCJzdHJ2ZXIiLCJ2ZXJzaW9uQ29kZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsIndpbmRvdyIsImdhbWVfdmVyIiwiY29uZmlnRGF0YSIsImxvZ2luSXAiLCJjb25zb2xlIiwibG9nIiwiTGhqY29uZmlnIiwiU2VydmVyX0lQIiwibGFzdEluZGV4T2YiLCJndWVzdCIsImV4Y2hhbmdlUmF0ZSIsImdldElwX0Z1bmN0aW9uIiwic2l6ZSIsImdldFZpc2libGVTaXplIiwic2NhbGUiLCJ3aWR0aCIsIm5vZGUiLCJzY2FsZVgiLCJzY2FsZVkiLCJsb2FkU2NlbmVfRnVuY3Rpb24iLCJwYXRoIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJwYXJzZSIsImNoZWNrR2FtZVZlcnNpb25fRnVuY3Rpb24iLCJvbmVycm9yIiwiYWN0aXZlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJvcGVuIiwic2VuZCIsImRhdGEiLCJpbmZvIiwiZ2FtZVZlcnNpb24iLCJnZXRJdGVtIiwib3MiLCJPU19JT1MiLCJwYXJzZUludCIsImxvYmJ5IiwidG9TdHJpbmciLCJjaGFyQXQiLCJ2ZXJzaW9uQXJyYXkiLCJzaG93R2FtZSIsImlvc1VwZGF0ZSIsImkiLCJzaG93Z2FtZSIsImxlbmd0aCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwic2V0T3JpZW50YXRpb24iLCJtYWNybyIsIk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSIsImNoaWxkcmVuIiwiY293Z2FtZV9xaWFuZyIsImZpc2giLCJjb3dnYW1lX2ppbmRpYW4iLCJnYW1lODIiLCJnYW1lMjgiLCJsaW5lZ2FtZSIsImxhbmQiLCJydW4iLCJuZWVkVG9VcGRhdGUiLCJjaGFuZ2VTY2VuZV9GdW50aW9uIiwiZ2FtZVVwZGF0ZV9GdW5jdGlvbiIsImluc3RhbmNlIiwidmVyc2lvbiIsInAiLCJwcmVsb2FkU2NlbmUiLCJ0YyIsIml0ZW0iLCJ0b0ZpeGVkIiwiYm9hcmQiLCJmaW5kIiwidmVyc2lvblVybCIsInVybCIsImUiLCJjYWxsYmFjayIsImxvYmJ5X3BhdGgiLCJnZXRXcml0YWJsZVBhdGgiLCJBc3NldHNNYW5hZ2VyIiwiRU5BQkxFX0dDX0ZPUl9OQVRJVkVfT0JKRUNUUyIsInJldGFpbiIsInNldFZlcnNpb25Db21wYXJlSGFuZGxlIiwibG9hY2xfdmVyc2lvbiIsInNlcnZlcl92ZXJzaW9uIiwibG9hY2xfdmVyc2lvbl9saXN0Iiwic3BsaXQiLCJzZXJ2ZXJfdmVyc2lvbl9saXN0IiwibG9hY2xWZXJzaW9uIiwic2V0VmVyaWZ5Q2FsbGJhY2siLCJjb21wcmVzc2VkIiwibWQ1IiwiT1NfQU5EUk9JRCIsInNldE1heENvbmN1cnJlbnRUYXNrIiwib25EZXN0cm95Iiwi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QUFDSixLQVZEOztBQVdBLFNBQUt2TSxLQUFMLENBQVd1QixZQUFYLENBQXdCLFVBQXhCLEVBQW9DQyxNQUFwQyxHQUE2QyxlQUE3Qzs7QUFDQSxRQUFJNUIsRUFBRSxDQUFDa0UsR0FBSCxDQUFPaUYsRUFBUCxLQUFjbkosRUFBRSxDQUFDa0UsR0FBSCxDQUFPMEksVUFBekIsRUFBcUM7QUFDakMsV0FBSy9JLEdBQUwsQ0FBU2dKLG9CQUFULENBQThCLENBQTlCOztBQUNBLFdBQUt6TSxLQUFMLENBQVd1QixZQUFYLENBQXdCLFVBQXhCLEVBQW9DQyxNQUFwQyxHQUE2QyxtREFBN0M7QUFDSDs7QUFDRCxTQUFLcUQsU0FBTDtBQUNILEdBamVJOztBQWtlTDtBQUNKO0FBQ0E7QUFDSTZILEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixRQUFJLEtBQUt0SixlQUFULEVBQTBCO0FBQ3RCeEQsTUFBQUEsRUFBRSxDQUFDaUMsWUFBSCxDQUFnQkMsY0FBaEIsQ0FBK0IsS0FBS3NCLGVBQXBDO0FBQ0EsV0FBS0EsZUFBTCxHQUF1QixJQUF2QjtBQUNIOztBQUNELFFBQUksS0FBS0ssR0FBTCxJQUFZLENBQUM3RCxFQUFFLENBQUNrRSxHQUFILENBQU84SCw0QkFBeEIsRUFBc0Q7QUFDbEQsV0FBS25JLEdBQUwsQ0FBU2tKLE9BQVQ7QUFDSDtBQUNKO0FBN2VJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGFuZWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX01lc3NhZ2VCb3g6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFuaWZlc3RVcmw6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXNzZXQsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwX0JHOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGJfTG9hZGluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fTWVzc2FnZUJveF9VcGRhdGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3VwZGF0aW5nOiBmYWxzZSxcclxuICAgICAgICBfY2FuUmV0cnk6IGZhbHNlLFxyXG4gICAgICAgIHByb2dyZXNzVUk6IGNjLlByb2dyZXNzQmFyLFxyXG4gICAgICAgIHByb2dyZXNzX2xhYjogY2MuTGFiZWwsXHJcbiAgICAgICAgaGFsbE5hbWU6IFwiXCJcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+eJiOacrFxyXG4gICAgICogQHBhcmFtIHsqfSBldmVudCBcclxuICAgICAqL1xyXG4gICAgY2hlY2tDYjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5nZXRFdmVudENvZGUoKSkge1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmsqHmib7liLDmnKzlnLDmm7TmlrDmlofku7ZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfRE9XTkxPQURfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9QQVJTRV9NQU5JRkVTVDpcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuabtOaWsOaWh+S7tuS4i+i9veWksei0pVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLlvIDlp4vmm7TmlrBcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuTkVXX1ZFUlNJT05fRk9VTkQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmuLjmiI/mlrDniYjmnKzmn6Xmib7lpLHotKVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fY2hlY2tMaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeJiOacrFxyXG4gICAgICogQHBhcmFtIHsqfSBldmVudCBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ2I6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwiKioqKioqKioqKioqKioqKioqKioqKioqKioqeXl5KioqKioqKioqKioqKioqKioqKioqKioqKioqKipcIik7XHJcbiAgICAgICAgLy/mmK/lkKbmm7TmlrDlrozmiJBcclxuICAgICAgICB2YXIgaXNGaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIC8v5piv5ZCm6ZyA6KaB5pu05pawXHJcbiAgICAgICAgdmFyIGlzVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5nZXRFdmVudENvZGUoKSkge1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5rKh5om+5Yiw5pys5Zyw5pu05paw5paH5Lu2XCI7XHJcbiAgICAgICAgICAgICAgICBpc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9QUk9HUkVTU0lPTjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfTG9hZGluZy5nZXRDb21wb25lbnQoXCJjYy5Qcm9ncmVzc0JhclwiKS5wcm9ncmVzcyA9IGV2ZW50LmdldERvd25sb2FkZWRCeXRlcygpIC8gZXZlbnQuZ2V0VG90YWxCeXRlcygpO1xyXG4gICAgICAgICAgICAgICAgLy/ojrflvpfmtojmga9cclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZXZlbnQuZ2V0TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5pu05paw5LitLi4uXCIgKyBtZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ET1dOTE9BRF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1BBUlNFX01BTklGRVNUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuabtOaWsOaWh+S7tuS4i+i9veWksei0pVwiO1xyXG4gICAgICAgICAgICAgICAgaXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5bey5piv5pyA5paw54mI5pysXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckluZm8ubG9jYWxWZXJzaW9uWzBdID0gdGhpcy5zZXJ2ZXJWZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZUdhbWVWZXJzaW9uX0Z1bmN0aW9uKHRoaXMucGxheWVySW5mby5sb2NhbFZlcnNpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCIqKioqKioqKioqKioqKioqKioqKioqKioqKip2dnYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLnJlc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5VUERBVEVfRklOSVNIRUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5pu05paw5a6M5oiQXCIgKyBldmVudC5nZXRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vY2MubG9nKFwiKioqKioqKioqKioqKioqKioqKioqKioqKioqdXV1KioqKioqKioqKioqKioqKioqKioqKioqKioqKipcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9GQUlMRUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5pu05paw5aSx6LSlXCIgKyBldmVudC5nZXRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuUmV0cnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9VUERBVElORzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLotYTmupDmm7TmlrDplJnor686IFwiICsgZXZlbnQuZ2V0QXNzZXRJZCgpICsgXCIsIFwiICsgZXZlbnQuZ2V0TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ERUNPTVBSRVNTOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBldmVudC5nZXRNZXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+mcgOimgeabtOaWsOaXtuWkhOeQhuS6i+S7tlxyXG4gICAgICAgIGlmIChpc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fdXBkYXRlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pu05paw5a6M5oiQ5ZCO5aSE55CG5LqL5Lu2XHJcbiAgICAgICAgaWYgKGlzRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX3VwZGF0ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAvL+iOt+W+l+abtOaWsOi3r+W+hFxyXG4gICAgICAgICAgICB2YXIgcGF0aHMgPSBqc2IuZmlsZVV0aWxzLmdldFNlYXJjaFBhdGhzKCk7XHJcbiAgICAgICAgICAgIHZhciBsb2NhbF9wYXRocyA9IHRoaXMuX2FtLmdldExvY2FsTWFuaWZlc3QoKS5nZXRTZWFyY2hQYXRocygpO1xyXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdChwYXRocywgbG9jYWxfcGF0aHMpO1xyXG4gICAgICAgICAgICAvL+aQnOe0oueDreabtOaWsOaWh+S7tlxyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJIb3RVcGRhdGVTZWFyY2hQYXRoc1wiLCBKU09OLnN0cmluZ2lmeShwYXRocykpO1xyXG4gICAgICAgICAgICBqc2IuZmlsZVV0aWxzLnNldFNlYXJjaFBhdGhzKHBhdGhzKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgICAgICAvL+iuvue9rueJiOacrFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8ubG9jYWxWZXJzaW9uWzBdID0gdGhpcy5zZXJ2ZXJWZXJzaW9uO1xyXG4gICAgICAgICAgICAvL+mHjeWQr1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlR2FtZVZlcnNpb25fRnVuY3Rpb24odGhpcy5wbGF5ZXJJbmZvLmxvY2FsVmVyc2lvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5yZXN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLypcclxuICAgICAqIOWwneivlemHjeaWsOS4i+i9vei1hOa6kCBcclxuICAgICAqL1xyXG4gICAgcmV0cnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3VwZGF0aW5nICYmIHRoaXMuX2NhblJldHJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhblJldHJ5ID0gZmFsc2UsIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLlsJ3or5Xph43mlrDkuIvovb3otYTmupBcIjtcclxuICAgICAgICAgICAgdGhpcy5fYW0uZG93bmxvYWRGYWlsZWRBc3NldHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKuajgOafpeabtOaWsFxyXG4gICAgICovXHJcbiAgICBjaGVja1VwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdXBkYXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuajgOa1i+abtOaWsOS4rSAuLi5cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYW0uZ2V0TG9jYWxNYW5pZmVzdCgpLmlzTG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTGlzdGVuZXIgPSBuZXcganNiLkV2ZW50TGlzdGVuZXJBc3NldHNNYW5hZ2VyKHRoaXMuX2FtLCB0aGlzLmNoZWNrQ2IuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIodGhpcy5fY2hlY2tMaXN0ZW5lciwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbS5jaGVja1VwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuajgOa1i+WujOaIkFwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuWKoOi9veacrOWcsOabtOaWsOaWh+S7tuWksei0pSAuLi5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAq54Ot5pu05paw5pa55rOVXHJcbiAgICAgKi9cclxuICAgIGhvdFVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuabtOaWsOS4rVwiO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RlbmVyID0gbmV3IGpzYi5FdmVudExpc3RlbmVyQXNzZXRzTWFuYWdlcih0aGlzLl9hbSwgdGhpcy51cGRhdGVDYi5iaW5kKHRoaXMpKTtcclxuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIodGhpcy5fdXBkYXRlTGlzdGVuZXIsIDEpO1xyXG4gICAgICAgIHRoaXMuX2ZhaWxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYW0udXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5kZWJ1Zy5zZXREaXNwbGF5U3RhdHMoZmFsc2UpO1xyXG4gICAgICAgIC8v5YWz6Zet6ISP55+p5b2iXHJcbiAgICAgICAgaWYgKGNjLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XHJcbiAgICAgICAgICAgIGNjLnJlbmRlcmVyLmVuYWJsZURpcnR5UmVnaW9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvL+iuvue9rueOqeWutuS/oeaBr1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcblxyXG4gICAgICAgIGNjLnZpZXcuc2V0UmVzaXplQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnVpUmVzaXplX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51aUluaXRfRnVuY3Rpb24oKTtcclxuICAgICAgICAvL+WKoOi9vemFjee9ruaWh+S7tlxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdDb25maWd1cmF0aW9uL0NvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbiAoZXJyb3IsIHJldCkge1xyXG4gICAgICAgICAgICAvLyBjYy5sb2FkZXIubG9hZChcInJlcy9yYXctYXNzZXRzL1RleHR1cmUvQ29uZmlndXJhdGlvbi9Db25maWd1cmF0aW9uLmpzb25cIiwgZnVuY3Rpb24oZXJyb3IsIHJldCl7XHJcbiAgICAgICAgICAgIHJldCA9IHJldC5qc29uO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJldC5pb3NQYXkgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5pb3NQYXkgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmlvc1BheSA9IHJldC5pb3NQYXk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzdHJ2ZXIgPSByZXQudmVyc2lvbkNvZGU7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHN0cnZlci5pbmRleE9mKCdfJyk7XHJcbiAgICAgICAgICAgIHN0cnZlciA9IHN0cnZlci5zdWJzdHJpbmcoaW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5nYW1lX3ZlciA9ICd2JyArIHN0cnZlcjtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuY29uZmlnRGF0YSA9IHJldDtcclxuICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnZlcnNpb25Db2RlID0gcmV0LnZlcnNpb25Db2RlO1xyXG4gICAgICAgICAgICBzZWxmLnBsYXllckluZm8ubG9naW5JcCA9IHJldC5sb2dpbklwO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXQubG9naW5JcCk7XHJcbiAgICAgICAgICAgIExoamNvbmZpZy5TZXJ2ZXJfSVAgPSByZXQubG9naW5JcC5zdWJzdHJpbmcoMCwgcmV0LmxvZ2luSXAubGFzdEluZGV4T2YoJzonKSk7IC8v57uZ6ICB6JmO5py655qE5pyN5Yqh5Zmo5Zyw5Z2A6LWL5YC8XHJcbiAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5ndWVzdCA9IHJldC5ndWVzdDtcclxuICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSA9IHJldC5leGNoYW5nZVJhdGU7XHJcbiAgICAgICAgICAgIHNlbGYuZ2V0SXBfRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aW5kb3cuaGFsbE5hbWUgPSB0aGlzLmhhbGxOYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICrng63mm7TmlrBVSeWIneWni+WMllxyXG4gICAgICovXHJcbiAgICB1aUluaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcclxuICAgICAgICB2YXIgc2NhbGUgPSBzaXplLndpZHRoIC8gMTMzNDtcclxuICAgICAgICBpZiAoc2l6ZS53aWR0aCA+IDEzMzQpIHtcclxuICAgICAgICAgICAgdGhpcy5zcF9CRy5ub2RlLnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgICAgICB0aGlzLnNwX0JHLm5vZGUuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaXplLndpZHRoIDwgMTMzNCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwX0JHLm5vZGUuc2NhbGVYID0gMSAvIHNjYWxlO1xyXG4gICAgICAgICAgICB0aGlzLnNwX0JHLm5vZGUuc2NhbGVZID0gMSAvIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAq54Ot5pu05paw6L+b5bqm5p2h6K6h566XXHJcbiAgICAgKi9cclxuICAgIHVpUmVzaXplX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gc2l6ZS53aWR0aCAvIDEzMzQ7XHJcbiAgICAgICAgaWYgKHNpemUud2lkdGggPiAxMzM0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BfQkcubm9kZS5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5zcF9CRy5ub2RlLnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2l6ZS53aWR0aCA8IDEzMzQpIHtcclxuICAgICAgICAgICAgdGhpcy5zcF9CRy5ub2RlLnNjYWxlWCA9IDEgLyBzY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5zcF9CRy5ub2RlLnNjYWxlWSA9IDEgLyBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiDojrflj5ZJUOWcsOWdgFxyXG4gICAgICovXHJcbiAgICBnZXRJcF9GdW5jdGlvbjogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIC8vaWYgKCFjYy5zeXMuaXNOYXRpdmUpIFxyXG4gICAgICAgIHJldHVybiB2b2lkIHRoaXMubG9hZFNjZW5lX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXRoID0gcmV0LmxvZ2luSXAgKyBcIi9sb2dpdGVjaFwiO1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGVja0dhbWVWZXJzaW9uX0Z1bmN0aW9uKHJldCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSlNPTiB3cm9uZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY29tX01lc3NhZ2VCb3guYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHNcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLov57mjqXmnI3liqHlmajlh7rplJnvvIzor7fmo4DmtYvnvZHnu5xcIjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vcGVuKFwiZ2V0XCIsIHBhdGgpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKuagoemqjOa4uOaIj+eJiOacrFxyXG4gICAgICovXHJcbiAgICBjaGVja0dhbWVWZXJzaW9uX0Z1bmN0aW9uOiBmdW5jdGlvbiAoZGF0YSwgaW5mbykge1xyXG4gICAgICAgIC8v6I635Y+W57yT5a2Y5Lit55qE5ri45oiP54mI5pys5L+h5oGvXHJcbiAgICAgICAgdmFyIGdhbWVWZXJzaW9uID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJnYW1lVmVyc2lvblwiKSk7XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVWZXJzaW9uID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoaW5mby5sb2JieS50b1N0cmluZygpLmNoYXJBdCgwKSkgPiBwYXJzZUludChkYXRhLnZlcnNpb25BcnJheS50b1N0cmluZygpLmNoYXJBdCgwKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94X1VwZGF0ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChpbmZvLmxvYmJ5LnRvU3RyaW5nKCkuY2hhckF0KDApKSA+IHBhcnNlSW50KGdhbWVWZXJzaW9uLmdhbWVWZXJzaW9uLnRvU3RyaW5nKCkuY2hhckF0KDApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3hfVXBkYXRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnNob3dHYW1lID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgZGF0YS5zaG93R2FtZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5pb3NVcGRhdGUgPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBkYXRhLmlvc1VwZGF0ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5mby5zaG93Z2FtZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2hvd0dhbWUgPT09IGluZm8uc2hvd2dhbWVbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJGYXJtR3VhblFpYVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZm8uaW9zVXBkYXRlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pb3NVcGRhdGUgPT09IGluZm8uaW9zVXBkYXRlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiRmFybUd1YW5RaWFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWRhdGEuaXNVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmVfRnVuY3Rpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6K6+572u5a2Q5ri45oiP54mI5pys5L+h5oGvXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLnNlcnZlclZlcnNpb25bMF0gPSBpbmZvLmxvYmJ5O1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5zZXJ2ZXJWZXJzaW9uWzFdID0gaW5mby5jb3dnYW1lX3FpYW5nO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5zZXJ2ZXJWZXJzaW9uWzJdID0gaW5mby5maXNoO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5zZXJ2ZXJWZXJzaW9uWzNdID0gaW5mby5jb3dnYW1lX2ppbmRpYW47XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLnNlcnZlclZlcnNpb25bNF0gPSBpbmZvLmdhbWU4MjtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uc2VydmVyVmVyc2lvbls1XSA9IGluZm8uZ2FtZTI4O1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5zZXJ2ZXJWZXJzaW9uWzZdID0gaW5mby5saW5lZ2FtZTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uc2VydmVyVmVyc2lvbls3XSA9IGluZm8ubGFuZDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uc2VydmVyVmVyc2lvbls4XSA9IGluZm8ucnVuO1xyXG5cclxuICAgICAgICBpZiAoZ2FtZVZlcnNpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmxvY2FsVmVyc2lvbiA9IGdhbWVWZXJzaW9uLmdhbWVWZXJzaW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5sb2NhbFZlcnNpb24gPSBkYXRhLnZlcnNpb25BcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/niYjmnKzplb/luqbmr5TovoNcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLmxvY2FsVmVyc2lvbi5sZW5ndGggPT09IHRoaXMucGxheWVySW5mby5zZXJ2ZXJWZXJzaW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVySW5mby5zZXJ2ZXJWZXJzaW9uLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLnNlcnZlclZlcnNpb25baV0gIT09IHRoaXMucGxheWVySW5mby5sb2NhbFZlcnNpb25baV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckluZm8ubmVlZFRvVXBkYXRlW2ldID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNjZW5lX0Z1bnRpb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8ubG9jYWxWZXJzaW9uW3RoaXMucGxheWVySW5mby5sb2NhbFZlcnNpb24ubGVuZ3RoXSA9IFwiMS4wXCI7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVHYW1lVmVyc2lvbl9GdW5jdGlvbih0aGlzLnBsYXllckluZm8ubG9jYWxWZXJzaW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckluZm8ubmVlZFRvVXBkYXRlWzBdID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NlbmVfRnVudGlvbigpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2codGhpcy5wbGF5ZXJJbmZvLmxvY2FsVmVyc2lvbik7XHJcbiAgICAgICAgY2MubG9nKHRoaXMucGxheWVySW5mby5zZXJ2ZXJWZXJzaW9uKTtcclxuICAgICAgICBjYy5sb2codGhpcy5wbGF5ZXJJbmZvLm5lZWRUb1VwZGF0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKuS/ruaUuei3n+aWsOi/m+W6puadoVxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VTY2VuZV9GdW50aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby5uZWVkVG9VcGRhdGVbMF0pIHtcclxuICAgICAgICAgICAgLy9jYy5sb2coXCIqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipjY2MqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVVwZGF0ZV9GdW5jdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKmRkZCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGJfTG9hZGluZ1wiKS5nZXRDb21wb25lbnQoXCJjYy5Qcm9ncmVzc0JhclwiKS5wcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOi/meaYr+S4iumdomlm6K+t5Y+l55qE566A5YaZXHJcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMucGxheWVySW5mby5uZWVkVG9VcGRhdGVbMF0gPyAoY2MubG9nKFwiKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqY2NjKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXCIpLCB2b2lkIHRoaXMuZ2FtZVVwZGF0ZV9GdW5jdGlvbigpKSA6IChjYy5sb2coXCIqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipkZGQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcIiksIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBiX0xvYWRpbmdcIikuZ2V0Q29tcG9uZW50KFwiY2MuUHJvZ3Jlc3NCYXJcIikucHJvZ3Jlc3MgPSAxLCB2b2lkIHRoaXMubG9hZFNjZW5lX0Z1bmN0aW9uKCkpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKui3s+i9rOWcuuaZr+aWueazlVxyXG4gICAgICovXHJcbiAgICBsb2FkU2NlbmVfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMucGxheWVySW5mby5sb2dpbklwICsgXCIvY2hlY2tWZXJzaW9uXCI7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcztcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEheGhyLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS52ZXJzaW9uID09IGluc3RhbmNlLnBsYXllckluZm8udmVyc2lvbkNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb2dyZXNzVUlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUod2luZG93LmhhbGxOYW1lLCAoY2MsIHRjLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucCA8IGNjIC8gdGMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wID0gY2MgLyB0YztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1VJLnByb2dyZXNzID0gY2MgLyB0YztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc19sYWIuc3RyaW5nID0gKChjYyAvIHRjKSAqIDEwMCkudG9GaXhlZCgyKSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUod2luZG93LmhhbGxOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib2FyZCA9IGNjLmZpbmQoJ0NhbnZhcy9jb21fTmV3VmVyc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy52ZXJzaW9uVXJsID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdqc29u6Kej5p6Q6ZSZ6K+vJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vcGVuKFwicG9zdFwiLCBwYXRoKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IHZlcnNpb24gXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICB3cml0ZUdhbWVWZXJzaW9uX0Z1bmN0aW9uOiBmdW5jdGlvbiAodmVyc2lvbiwgY2FsbGJhY2spIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJnYW1lVmVyc2lvblwiLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGdhbWVWZXJzaW9uOiB2ZXJzaW9uXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiDng63mm7TmlrDmlrnms5VcclxuICAgICAqL1xyXG4gICAgZ2FtZVVwZGF0ZV9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBsb2JieV9wYXRoID0gKGpzYi5maWxlVXRpbHMgPyBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpIDogXCIvXCIpICsgXCJsb2JieVwiO1xyXG4gICAgICAgIHRoaXMuX2FtID0gbmV3IGpzYi5Bc3NldHNNYW5hZ2VyKHRoaXMubWFuaWZlc3RVcmwsIGxvYmJ5X3BhdGgpO1xyXG4gICAgICAgIGlmICghY2Muc3lzLkVOQUJMRV9HQ19GT1JfTkFUSVZFX09CSkVDVFMpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW0ucmV0YWluKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvL+eJiOacrOavlOi+g1xyXG4gICAgICAgIHRoaXMuX2FtLnNldFZlcnNpb25Db21wYXJlSGFuZGxlKGZ1bmN0aW9uIChsb2FjbF92ZXJzaW9uLCBzZXJ2ZXJfdmVyc2lvbikge1xyXG4gICAgICAgICAgICBzZWxmLnNlcnZlclZlcnNpb24gPSBzZXJ2ZXJfdmVyc2lvbjtcclxuICAgICAgICAgICAgdmFyIGxvYWNsX3ZlcnNpb25fbGlzdCA9IGxvYWNsX3ZlcnNpb24uc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICB2YXIgc2VydmVyX3ZlcnNpb25fbGlzdCA9IHNlcnZlcl92ZXJzaW9uLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvYWNsX3ZlcnNpb25fbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvYWNsVmVyc2lvbiA9IHBhcnNlSW50KGxvYWNsX3ZlcnNpb25fbGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VydmVyVmVyc2lvbiA9IHBhcnNlSW50KHNlcnZlcl92ZXJzaW9uX2xpc3RbaV0gfHwgMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9hY2xWZXJzaW9uICE9PSBzZXJ2ZXJWZXJzaW9uKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlcnZlcl92ZXJzaW9uX2xpc3QubGVuZ3RoICE9IGxvYWNsX3ZlcnNpb25fbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBwYW5lbCA9IHRoaXMucGFuZWw7XHJcbiAgICAgICAgdGhpcy5fYW0uc2V0VmVyaWZ5Q2FsbGJhY2soZnVuY3Rpb24gKGVycm9yLCByZXQpIHtcclxuICAgICAgICAgICAgdmFyIGNvbXByZXNzZWQgPSByZXQuY29tcHJlc3NlZDtcclxuICAgICAgICAgICAgdmFyIG1kNSA9IHJldC5tZDU7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gcmV0LnBhdGg7XHJcbiAgICAgICAgICAgIHJldC5zaXplO1xyXG4gICAgICAgICAgICBpZiAoY29tcHJlc3NlZCkge1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJWZXJpZmljYXRpb24gcGFzc2VkIDogXCIgKyBwYXRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJWZXJpZmljYXRpb24gcGFzc2VkIDogXCIgKyBwYXRoICsgXCIgKFwiICsgbWQ1ICsgXCIpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5pu05paw5bey5YeG5aSH5aW977yM5q2j5Zyo5qOA5rWL5Zyw5Z2AXCI7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW0uc2V0TWF4Q29uY3VycmVudFRhc2soMSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJNYXggY29uY3VycmVudCB0YXNrcyBjb3VudCBoYXZlIGJlZW4gbGltaXRlZCB0byAxXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaG90VXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0ZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih0aGlzLl91cGRhdGVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2FtICYmICFjYy5zeXMuRU5BQkxFX0dDX0ZPUl9OQVRJVkVfT0JKRUNUUykge1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5yZWxlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7Il19