/**
 * 炸金花SOCKET通讯
 */
var HoldemNetWork = (function () {
    /**
     * 单例模式
     */
    function getInstant() {
        var _instance;
        if (_instance === undefined) {
            _instance = new Single();
        }
        return _instance;
    }
    /**
     * 逻辑层
     */
    function Single() {
        this.lobbyMain = null;
        this.holdem = null;
        this.holdemSocket = null;
        this.playerInfo = null;
        this.tableId = -1;
        this.seatIndex = -1;
        this.playerHead = null;
        this.tax = -1;
        this.addScore = 0;
        this.eventOn = false;

        this.seats = null;
        this.turn = -1;
        this.button = -1;
        this.chu = -1;
        this.isOver = false;
        this.consume_num = 0;

        /**
         * 初始化
         */
        this.init = function () {
                this.playerInfo = require("PlayerInfo").getInstant;
            },

            /**
             * 进入游戏
             * @param {*} loginIP 
             * @param {*} port 
             * @param {*} userid 
             * @param {*} sign 
             */
            this.loginGame_Function = function (loginIP, port, userid, sign) {
                var self = this;
                var socket = null;
                if (cc.sys.isNative) {
                    self.holdemSocket = SocketIO.connect(loginIP + ":" + port);
                } else {
                    socket = require("socket-io");
                    self.holdemSocket = socket(loginIP + ":" + port);
                }
                //用户连接游戏服务器
                this.connectServer_Function(userid, sign);
                //连接失败
                this.holdemSocket.on("error", function () {
                        cc.sys.isBrowser && self.holdemSocket.close();
                        self.holdemSocket = null;
                        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Holdem");
                    }),
                    //连接失败
                    this.holdemSocket.on("connect_error", function () {
                        cc.sys.isBrowser && self.holdemSocket.close();
                        self.holdemSocket = null;
                        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Holdem");
                    });
                //连接超时
                this.holdemSocket.on("connect_timeout", function () {
                    cc.sys.isBrowser && self.holdemSocket.close();
                    self.holdemSocket = null;
                    self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Holdem");
                });
                //连接
                this.holdemSocket.on("connected", function (ret) {
                    if (ret) {
                        try {
                            //进入游戏
                            self.holdemSocket.emit("LoginGame", {
                                userid: userid, //用户ID
                                gametype: 11, //游戏类型
                                sign: sign //签名
                            });
                        } catch (error) {}
                    }
                });
            };

        /**
         * 连接德州扑克服务器
         * @param {*} userid 
         * @param {*} sign 
         */
        this.connectServer_Function = function (userid, sign) {
            var self = this;

            this.holdemSocket && this.holdemSocket.on("loginGameResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                cc.log('游戏登陆成功=======================' + JSON.stringify(result));
                if (result.resultid) { //游戏登录成功
                    self.playerInfo.playerCoin = result.Obj.score;
                    self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
                    self.holdemSocket.emit("LoginRoom", { //登录游戏房间接口 roomid传 1 就好
                        roomid: 1
                    });
                    self.setHoldemSocketOn_Function();
                    self.loginRoom_Function();
                } else {
                    //游戏登录失败
                    self.lobbyMain.getComponent("LobbyMain").loadGameScene = false;
                    self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
                    self.eventOn = true;
                }
            });
        };

        /**
         * 进入房间
         */
        this.loginRoom_Function = function () {
            cc.log('进入房间')
            var self = this;
            //返回房间数据
            this.holdemSocket.on("LoginRoomResult", function (ret) {
                console.log('LoginRoomResult:', ret);
                var result = self.changeResultJSON_Function(ret);
                if (result.ResultCode) {
                    self.lobbyMain.bg_Black.active = true;
                    self.tableId = result.ResultData.TableId;
                    self.seatId = result.ResultData.seatId;
                    self.tax = result.ResultData.tax;
                    self.addScore = result.ResultData.addscore;
                    self.playerInfo.gameDisconnect = false;
                    self.playerInfo.gameName = "Holdem";
                    cc.audioEngine.stopAll();
                    cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("HoldemMain");
                }
            });
        };

        this.reset = function () {
            this.turn = -1;
            this.chu = -1;
            this.button = -1;
            this.curaction = null;
            for (var i = 0; i < this.seats.length; ++i) {
                this.seats[i].op = null;
                this.seats[i].ready = false;
            }
        }

        this.isOwner = function () {
            return this.seatIndex == 0;
        }

        this.getSelfData = function () {
            return this.seats[this.seatIndex];
        }

        this.getSeatByID = function (userId) {
            var seatIndex = this.getSeatIndexByID(userId);
            var seat = this.seats[seatIndex];
            return seat;
        };

        this.getSeatIndexByID = function (userId) {
            for (var i = 0; i < this.seats.length; ++i) {
                var s = this.seats[i];
                if (s.userid == userId) {
                    return i;
                }
            }
            return -1;
        }

        this.getLocalIndex = function (index) {
            var ret = (index - this.seatIndex + 5) % 5;
            return ret;
        }

        this.getLocalIndexByUserId = function (userId) {
            var seatIndex = this.getSeatIndexByID(userId);
            var ret = this.getLocalIndex(seatIndex);
            return ret;
        }

        /**
         * 长连通讯
         */
        this.setHoldemSocketOn_Function = function () {
                var self = this;

                /**
                 * 长连接断开监听
                 */
                this.holdemSocket.on("login_result", function (data) {
                    data = self.changeResultJSON_Function(data);
                    console.log("login_result:", data);
                    if (data.errcode === 0) {
                        self.reconnectP = data.ret;
                        var data = data.data;
                        self.seats = data.seats;
                        self.seatIndex = self.getSeatIndexByID(self.playerInfo.playerId);
                        self.isOver = false;
                        self.consume_num = data.scene.consume_num ? data.scene.consume_num : 50;
                    } else {
                        console.log(data.errmsg);
                    }

                });

                this.holdemSocket.on("socket_MyHolds", function (data) {
                    data = self.changeResultJSON_Function(data);
                    if (data && data.length > 0) {
                        self.holdem.myHolds(data);
                    }
                });
                this.holdemSocket.on("count_down_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    !!self.holdem && !!self.holdem.countDown && self.holdem.countDown(data);
                });
                this.holdemSocket.on("game_begin_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.gameBegin(data);
                });
                this.holdemSocket.on("game_diChiUpdate_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.updateDiChi(data);
                });
                this.holdemSocket.on("game_myInfo_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    var seat = self.getSeatByID(data.userid);
                    seat.score = (data.money * 0.01).toFixed(2);
                    self.holdem.myInfo(data);
                });
                this.holdemSocket.on("game_myTurn_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.myTurn(data);
                });

                this.holdemSocket.on("myTurn_time_init", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.myTurnForNoMoney(data);
                });

                this.holdemSocket.on("game_oneClickGuo_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.oneGuo(data);
                });
                this.holdemSocket.on("game_oneGen_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    var seat = self.getSeatByID(data.userid);
                    seat.score = (data.money * 0.01).toFixed(2);
                    self.holdem.oneGen(data);
                });
                this.holdemSocket.on("game_oneAllIn_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    var seat = self.getSeatByID(data.userid);
                    seat.score = (data.money * 0.01).toFixed(2);
                    self.holdem.oneAllIn(data);
                });
                this.holdemSocket.on("game_oneQuit_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.oneQuit(data);
                });
                this.holdemSocket.on("game_playersInNewCircle_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.playersInNewCircle(data);
                });
                this.holdemSocket.on("game_newCircle_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.newCircle(data);
                });
                this.holdemSocket.on("game_turnChanged_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    if (self.playerInfo.playerId != data) {
                        self.holdem.gameTurnChanged(data);
                    }
                });
                this.holdemSocket.on("game_caculateResult_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    for (var i = 0; i < data.length; i++) {
                        if (self.playerInfo.playerId == data[i].userid && data[i].isWinner) {
                            self.holdem.settlement(false);
                        } else if (self.playerInfo.playerId == data[i].userid && !data[i].isWinner) {
                            self.holdem.settlement(true);
                        }
                    };
                    self.holdem.caculateResult(data);
                });
                this.holdemSocket.on("game_myARGStatusChanged_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.myARGStatusChanged(data);
                });
                this.holdemSocket.on("game_over", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.gameOver(data);
                });
                this.holdemSocket.on("game_gameInfoById_push", function (data) {
                    if (data) {
                        data = self.changeResultJSON_Function(data);
                        self.holdem.gameInfoById(data);
                    }
                });
                this.holdemSocket.on("game_userInfoById_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.userInfoById(data);
                });
                this.holdemSocket.on("game_allGuo_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.holdem.allGuo(data);
                });
                this.holdemSocket.on("exit_result", function (data) {
                    data = self.changeResultJSON_Function(data);
                    console.log('离开房间返回信息:' + data);
                    self.turn = -1;
                    self.seats = null;
                    self.holdem.exitResult(data);
                    self.holdem = null;
                });
                this.holdemSocket.on("exit_notify_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    var userId = data;
                    var s = self.getSeatByID(userId);
                    cc.log('离开桌子===================' + JSON.stringify(s));
                    if (s != null) {
                        s.userid = 0;
                        s.name = "";
                        self.holdem.changeUserState(s);
                    }
                });

                this.holdemSocket.on("noExit", ret => {
                    cc.find('Canvas/com_ingame_tips').active = true;
                });

                this.holdemSocket.on("dispress_push", function (data) {
                    self.turn = -1;
                    self.seats = null;
                });
                this.holdemSocket.on("disconnect", function (data) {
                    cc.find('Canvas/Loading').active = true;
                    if (!self.holdem.gameExit) {
                        self.holdem.disconnectNetWork_Function();
                    }
                });
                // 新人加入房间
                this.holdemSocket.on("new_user_comes_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    cc.log('有新玩家加入==============' + JSON.stringify(data));
                    var seatIndex = data.seatindex;
                    if (self.seats[seatIndex].userid > 0) {
                        self.seats[seatIndex].online = true;
                        self.seats[seatIndex].ready = data.ready;
                        self.seats[seatIndex].score = data.score;
                        self.seats[seatIndex].status = data.status;
                        self.seats[seatIndex].headUrl = data.headimgurl;
                    } else {
                        data.online = true;
                        self.seats[seatIndex] = JSON.parse(JSON.stringify(data));
                        !!self.holdem && self.holdem.updateSeatInfo(self.seats[seatIndex]);
                    }
                });
            },

            /**
             * 传递this作用域
             * @param {*} scene 来自LobbyMain.js
             */
            this.setLobbyMainObj_Function = function (scene) {
                this.lobbyMain = scene;
            },

            /**
             * 传递this作用域
             * @param {*} scene 来自FlowerMain.js
             */
            this.setHoldemObj_Function = function (scene) {
                this.holdem = scene;
            },

            /**
             * 解析JSON数据
             * @param {*} ret 
             */
            this.changeResultJSON_Function = function (ret) {
                // if (cc.sys.isNative) {
                //     return JSON.parse(ret);
                // }
                var jsonstr = null;
                try {
                    jsonstr = JSON.parse(ret);
                } catch (e) {
                    jsonstr = null;
                }
                if (jsonstr == null)
                    return ret;
                else
                    return jsonstr;
            },
            this.init();
    }
    return {
        getInstant: new getInstant()
    }
})();

module.exports = HoldemNetWork;