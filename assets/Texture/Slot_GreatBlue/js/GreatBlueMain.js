const BETNUM = 0.1; //单注值
const LINES = 25; //线数
const TOPBET = [30, 1000, 100, 10];
const BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RULELIST = [2, 0.2, 0.1, 1, 0.2, 0.1, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 3, 0.6, 0.2]; //规则
cc.Class({
    extends: cc.Component,

    properties: {
        lblUserCoin: {
            default: null,
            type: cc.Label,
            displayName: '用户金币',
        },
        lblLines: {
            default: null,
            type: cc.Label,
            displayName: '线数',
        },
        lineNode: cc.Node,//画线
        lblCurBet: {
            default: null,
            type: cc.Label,
            displayName: '本局总注',
        },
        lblWinCoin: {
            default: null,
            type: cc.Label,
            displayName: '本局赢得',
        },
        lblCoinList: {
            default: [],
            type: cc.Label,
            displayName: '列倍率显示',
        },
        rolePb: {
            default: [],
            type: cc.Prefab,
            displayName: '滚轮角色Pb',
        },
        spAtlas: {
            default: null,
            type: cc.SpriteAtlas,
            displayName: '图集',
        },
        autoBtn: {
            default: null,
            type: cc.Button,
            displayName: '自动按钮',
        },
        StopAutoBtn: {
            default: null,
            type: cc.Button,
            displayName: '停止自动按钮',
        },
        startBtn: cc.Button,//开始
        stopBtn: cc.Button,//停止
        ctrlBtn: [cc.Button],//需要控制开关的按钮
        effectAnimPr: {
            default: null,
            type: cc.Node,
            displayName: '中奖特效',
        },
        effectAnimFullA: {
            default: null,
            type: cc.Node,
            displayName: '中奖全屏特效A',
        },
        effectAnimFullB: {
            default: null,
            type: cc.Node,
            displayName: '中奖全屏特效B',
        },
        effectAnimBigFull: {
            default: null,
            type: cc.Node,
            displayName: '中大奖全屏特效',
        },

        BgNode: {
            default: null,
            type: cc.Node,
            displayName: '游戏背景节点',
        },

        //免费次数有关
        freeBgNode: {
            default: null,
            type: cc.Node,
            displayName: '免费摇奖背景节点',
        },
        freeBeginNode: {
            default: null,
            type: cc.Node,
            displayName: '开始免费摇奖节点',
        },
        freeEndNode: {
            default: null,
            type: cc.Node,
            displayName: '结束免费摇奖节点',
        },

        freeTimesNode: {
            default: null,
            type: cc.Node,
            displayName: '免费摇奖显示节点',
        },

        helpUI: {
            default: null,
            type: cc.Node,
            displayName: 'help界面',
        },

        helpNum: {
            default: null,
            type: cc.Node,
            displayName: 'help界面可变注数',
        },
        bigWinTip: cc.Node,//中奖提示
        menuPanel: cc.Node,//菜单
        helpPanel1: cc.Node,//帮助1
        helpPanel2: cc.Node,//帮助2
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('GreatBlueNetwork');
        this.audio = this.node.getComponent('GreatBlueAudio');
        this.wheelList = [];
        this.bet = 0;
        this.auto = false;
        this.status = 0;
        this.bigWinResList = [3, 1, 2];
        this.bigWinCard = 0;
        this.bigWinCoin = 0;
        this.bigWinBoo = false;
        this.freeTimes = 0;
        this.rollResult = [];
        this.rollIndex = 0;
        this.lotteryRes = null;
        this.stopFree = false;
        this.freeGameCoin = 0;
        this.bIsFreeGame = false;
        //动效相关
        this.isDoingMenu = false;
        this.isMenuOpen = false;
        this.isDoingHelp2 = false;
        this.isHelp2Open = false;
    },

    start() {
        this.linesNum = LINES;
        this.lblLines.string = this.linesNum;
        this.lblWinCoin.string = '0.00';
        this.setBet();
        this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
    },

    onCLick(event, args) {
        switch (args) {
            case "auto":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
                    return;
                }
                this.auto = true;
                this.autoBtn.node.active = false;
                this.StopAutoBtn.node.active = true;
                this.startBtn.node.active = false;
                this.stopBtn.node.active = true;
                if (this.status == 0) {
                    this.sendRoll();
                }
                break;
            case "autoStop":
                this.auto = false;
                this.autoBtn.node.active = true;
                this.StopAutoBtn.node.active = false;
                this.startBtn.node.active = true;
                this.stopBtn.node.active = false;
                break;
            case "roll":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
                    return;
                }
                if (!this.auto) {
                    if (this.status == 0) {
                        this.sendRoll();
                    }
                }
                break;
            case "stopRoll":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
                    return;
                }
                if (this.status == 1) {
                    this.startBtn.node.active = true;
                    this.stopBtn.node.active = false;
                    this.stopImmediately();
                }
                break;
            case "add":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                    return;
                }
                this.bet += 1;
                this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
                this.setBet();
                break;
            case "dec":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                    return;
                }
                this.bet -= 1;
                this.bet = this.bet >= 0 ? this.bet : 0;
                this.setBet();
                break;
            case "addLine":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                    return;
                }
                this.linesNum += 1;
                this.linesNum = this.linesNum >= LINES ? LINES : this.linesNum;
                this.setBet();
                break;
            case "subLine":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                    return;
                }
                this.linesNum -= 1;
                this.linesNum = this.linesNum >= 1 ? this.linesNum : 1;
                this.setBet();
                break;
            case "closeBigWin":
                this.audio.playBgm(0);
                break;
            case "help":
                this.helpUI.active = true;
                let hr = this.helpNum.children;
                for (let i in hr) {
                    hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
                }
                break;
            case "closeHelp":
                this.helpUI.active = false;
                break;
            case "exitGame":
                this.net.socket.disconnect();
                cc.director.loadScene("LobbyMain");
                break;
            case "audio":
                this.audio.pInfo.musicControl = !this.audio.pInfo.musicControl;
                if (!this.audio.pInfo.musicControl) {
                    this.audio.stopAudio();
                } else {
                    if (this.freeTimes > 0) {
                        this.audio.playBgm(1);
                    } else if (this.bigWinBoo) {
                        this.audio.playBgm(2);
                    } else {
                        this.audio.playBgm(0);
                    }
                }
                break;
            case "menu":
                this.menuAciton(this.isMenuOpen);
                break;
            case "openLineHelp":
                this.isHelp2Open = true;
                this.helpPanel2Action();
                break;
            case "closeLineHelp":
                this.isHelp2Open = false;
                this.helpPanel2Action();
                break;
            case "closeGame":
                cc.game.end();
                break;
        }

    },
    //设置交互按钮的可用性
    setBtnUsable(isUsable) {
        for (let i in this.ctrlBtn) {
            this.ctrlBtn[i].interactable = isUsable;
        }
    },

    setBet() {
        this.lblCurBet.string = (BET[this.bet] * BETNUM * this.linesNum).toFixed(2);
        this.lblLines.string = this.linesNum;
        for (let i in this.lblCoinList) {
            this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM * this.linesNum).toFixed(2);
        }
    },

    stateCallBack() {
        let st = 0;
        for (let i in this.wheelList) {
            if (this.wheelList[i].status) {
                st = 1;
                break;
            }
        }
        this.status = st;
        if (this.status == 0) {
            //结束当前轮盘
            let rIndex = this.rollIndex;
            this.lblUserCoin.string = (this.lotteryRes.userscore / 100).toFixed(2);
            this.lblWinCoin.string = (this.lotteryRes.winscore / 100).toFixed(2);
            if (this.bIsFreeGame) {
                this.freeGameCoin += this.lotteryRes.winscore;
            }
            this.scheduleOnce(() => {
                if (rIndex == this.rollIndex) {
                    this.playWinAnim();
                }
            }, 0.5);
            // if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
            //     this.bigWinBoo = true;
            //     this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
            //     this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
            //     this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;
            //     this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
            //     this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
            //     this.scheduleOnce(() => {
            //         this.startBigWin();
            //     }, 2);
            // }
            if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                if (this.freeTimes == 0) {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.freeBeginNode.active = true;
                    this.scheduleOnce(() => {
                        this.freeBeginNode.active = false;
                        this.closeShine();
                        this.startFreeGame();
                    }, 5);
                } else {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.stopFree = false;
                }
            }
        }
    },

    playWinAnim() {
        //动画结束后自动roll
        let hasWinBool = 0;
        let allLine = [];
        //显示划线
        this.lineNode.active = true;
        for (let i in this.lotteryRes.viewarray.nWinLines) {
            this.lineNode.children[this.lotteryRes.viewarray.nWinLines[i]].active = true;
        }

        for (let i in this.lotteryRes.viewarray.nWinCards) {
            if (this.lotteryRes.viewarray.nWinCards[i]) {
                allLine.push(i);
            }
        }
        let lines = this.lotteryRes.viewarray.nWinLinesDetail;
        let rIndex = this.rollIndex;
        let list = (this.freeTimes > 0 || this.stopFree) ? [allLine,] : [allLine, ...lines];
        hasWinBool = list.length - 1;
        if (hasWinBool > 0) {
            //播放恭喜字样动画
            this.effectAnimFullA.active = true;
            this.effectAnimFullA.getComponent(sp.Skeleton).clearTrack(0);
            this.effectAnimFullA.getComponent(sp.Skeleton).setAnimation(0, "win_cn", false);
            //播放招财猫动画
            this.effectAnimFullB.active = true;
            let lbl_coin = this.effectAnimFullB.getChildByName("lbl_coin").getComponent(cc.Label);
            let addcoin = 0;
            this.schedule(() => {
                addcoin += this.lotteryRes.winscore / 30
                if (addcoin > this.lotteryRes.winscore) {
                    addcoin = this.lotteryRes.winscore;
                }
                lbl_coin.string = (addcoin / 100).toFixed(2);
            }, 0, 30, 0.01)
            //判断播放金币掉落动画
            if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * this.linesNum * 100) { //如果大于100倍赌注，就播放bigFull动画
                this.effectAnimBigFull.active = true;
                this.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);
                this.effectAnimBigFull.getComponent(sp.Skeleton).setAnimation(0, "animation1", true);
            }
            !this.auto && this.winAciton();
        }
        let animIndex = 0;
        this.schedule(() => {
            if (rIndex == this.rollIndex) {
                this.closeShine();
                for (let i = 0; i < 15; i++) {
                    this.clsoeAnim(i % 5, parseInt(i / 5));
                }
                if (!!!list[animIndex]) {
                    return;
                }
                for (let j in list[animIndex]) {
                    // this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));//修改
                    this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5), this.lotteryRes.viewarray.fMultiple);
                }
                animIndex++;
            }
        }, 3, list.length, 0.01)


        this.scheduleOnce(() => {
            this.effectAnimFullA.active = false;
            this.effectAnimFullB.active = false;
            this.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);
            this.effectAnimBigFull.active = false;
            this.setBtnUsable(true);
            this.startBtn.node.active = true;
            this.stopBtn.node.active = false;
            if (this.stopFree) {
                this.stopFree = false;
                this.stopFreeTimes();
                this.closeShine();
            }
            if (this.freeTimes > 0) {
                this.freeTimes--;
                this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
                if (this.freeTimes == 0) {
                    this.stopFree = true;
                }
                this.auto && this.sendRoll();
            }
            if (rIndex == this.rollIndex) {
                this.auto && this.freeTimes == 0 && this.sendRoll();
            }
        }, hasWinBool > 0 ? hasWinBool * 3 : 0.5)
    },

    //免费次数有关
    startFreeGame() {
        console.log("startFreeGame");
        this.audio.playBgm(1);
        this.freeGameCoin = 0;
        this.BgNode.active = false;
        this.bIsFreeGame = true;
        this.freeBgNode.active = true;
        this.autoBtn.node.active = true;
        this.StopAutoBtn.node.active = false;
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = false;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimesNode.active = true;
        this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
        // this.scheduleOnce(() => {
        this.auto = true;
        this.autoBtn.node.active = false;
        this.StopAutoBtn.node.active = true;
        this.startBtn.node.active = false;
        this.stopBtn.node.active = true;
        this.sendRoll();
        // }, 2);
    },

    stopFreeTimes() {
        console.log("stopFreeTimes freeGameCoin : ", this.freeGameCoin);
        this.audio.playBgm(0);
        this.auto = false;
        this.autoBtn.node.active = true;
        this.StopAutoBtn.node.active = false;
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = true;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimesNode.active = false;
        this.freeEndNode.active = true;
        this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = (this.freeGameCoin / 100).toFixed(2);
        this.scheduleOnce(() => {
            this.freeEndNode.active = false;
            this.BgNode.active = true;
            this.freeBgNode.active = false;
            this.bIsFreeGame = false;
        }, 2);

    },

    //0-5 0-2
    showAnim(cols, index, beishu) {
        this.audio.playBW();
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").playAnim();
        //添加
        if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu") && beishu > 1) {
            this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = true;
            this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").getComponent(cc.Label).string = "x" + beishu;
        }
        //添加结束
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = true;
        nodeList[cols * 3 + index].getComponent(cc.Animation).play();
    },

    clsoeAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").stopAnim();
        //添加
        if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu")) {
            this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = false;
        }
        //添加结束
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = false;
    },

    checkRollData(list) {
        for (const iterator of list) {
            if (iterator >= this.rolePb.length) {
                return false;
            }
        }
        return true;
    },

    roll(list) {
        if (!this.checkRollData(list)) {
            alert(`
            服务器获取的花色种类大于现有的花色种类！！！
            请联系服务器人员进行数据调整！`
            );
            return;
        }
        this.status = 1;
        let line = [];
        for (let i = 0; i < 5; i++) {
            line[i] = [];
        }
        for (let i in list) {
            line[i % 5][2 - parseInt(i / 5)] = list[i];
        }
        for (let i in this.wheelList) {
            this.wheelList[i].startRoll(...line[i]);
        }
    },

    closeShine() {
        let nodeList = this.effectAnimPr.children;
        for (let i in nodeList) {
            nodeList[i].active = false;
        }

    },

    sendRoll() {
        this.rollIndex++;
        this.closeShine();
        //隐藏所有线
        for (let i in this.lineNode.children) {
            this.lineNode.children[i].active = false;
        }
        this.setBtnUsable(false);
        this.startBtn.node.active = false;
        this.stopBtn.node.active = true;
        this.net.socket.emit('lottery', JSON.stringify({
            bet: this.bet,
            linesNum: this.linesNum,
            nBetList: [BET[this.bet] * BETNUM * this.linesNum * 100]
        }));
    },

    stopImmediately() {
        if (!this.auto) {
            for (let i in this.wheelList) {
                this.wheelList[i].stopImmediately();
            }
            this.setBtnUsable(true);
        } else {
            for (let i in this.wheelList) {
                this.wheelList[i].stopImmediately();
            }
        }
    },

   

   
    //中奖动效490-635
    winAciton() {
        this.bigWinTip.x = 635;
        this.bigWinTip.getComponent(cc.Animation).play();
        this.bigWinTip.runAction(
            cc.sequence(
                cc.moveTo(0.5, cc.v2(490, this.bigWinTip.y)),
                cc.delayTime(2),
                cc.moveTo(0.5, cc.v2(635, this.bigWinTip.y)),
                cc.callFunc(() => {
                    this.bigWinTip.getComponent(cc.Animation).stop();
                })
            )
        );
    },
    //菜单动效676-466
    menuAciton() {
        if (this.isDoingMenu) {
            return;
        }
        this.isMenuOpen = !this.isMenuOpen;
        let isOpen = this.isMenuOpen;
        this.isDoingMenu = true;
        let p1, p2, t1, t2;
        if (isOpen) {
            p1 = 446;
            p2 = 466;
            t1 = 0.3;
            t2 = 0.05;
        } else {
            p1 = 446;
            p2 = 676;
            t1 = 0.05;
            t2 = 0.3;
        }
        this.menuPanel.runAction(
            cc.sequence(
                cc.moveTo(t1, cc.v2(p1, this.menuPanel.y)),
                cc.moveTo(t2, cc.v2(p2, this.menuPanel.y)),
                cc.callFunc(() => {
                    this.isDoingMenu = false;
                })
            )
        );
    },
    //画线规则帮助640-0
    helpPanel2Action() {
        if (this.isDoingHelp2) {
            return;
        }
        this.isDoingHelp2 = true;
        let p1 = this.isHelp2Open ? 0 : 640;
        this.helpPanel2.runAction(
            cc.sequence(
                cc.moveTo(0.4, cc.v2(this.helpPanel2.x, p1)),
                cc.callFunc(() => {
                    this.isDoingHelp2 = false;
                })
            )
        );
    }
});