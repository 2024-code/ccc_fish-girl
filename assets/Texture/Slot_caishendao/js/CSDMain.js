const BETNUM = 380; //单注值
const LINES = 243; //线数
const TOPBET = [1000, 50, 30, 100]; //列倍率
const BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RULELIST = [2, 0.75, 0.25, 1.5, 0.5, 0.2, 1.25, 0.3, 0.15, 1, 0.25, 0.1, 0.75, 0.2, 0.1, 0.5, 0.1, 0.05, 0.5, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05]; //规则
cc.Class({
    extends: cc.Component,

    properties: {
        spUserFace: {
            default: null,
            type: cc.Sprite,
            displayName: '用户头像',
        },
        lblUserName: {
            default: null,
            type: cc.Label,
            displayName: '用户名',
        },
        lblUserCoin: {
            default: null,
            type: cc.Label,
            displayName: '用户金币',
        },
        lblBet: {
            default: null,
            type: cc.Label,
            displayName: '单注',
        },
        lblLines: {
            default: null,
            type: cc.Label,
            displayName: '线数',
        },
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
        rollBtnAnim: {
            default: null,
            type: cc.Animation,
            displayName: 'roll按钮动画',
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
            type: cc.Sprite,
            displayName: '自动按钮Sprite',
        },
        coinPb: {
            default: null,
            type: cc.Prefab,
            displayName: '财神吐金币特效',
        },
        coinAnimPr: {
            default: null,
            type: cc.Node,
            displayName: '财神吐金币父节点',
        },

        effectAnimPr: {
            default: null,
            type: cc.Node,
            displayName: '终奖特效',
        },

        //大奖有关
        doorNode: {
            default: null,
            type: cc.Node,
            displayName: '大门',
        },
        caiShenBg: {
            default: null,
            type: cc.Node,
            displayName: '财神背景',
        },
        caiShenAnim: {
            default: null,
            type: cc.Animation,
            displayName: '财神动画',
        },
        bigWinNode: {
            default: null,
            type: cc.Node,
            displayName: '大奖节点',
        },
        bigWinResultAnim: {
            default: null,
            type: cc.Animation,
            displayName: 'bigWin终奖动画'
        },
        //免费次数有关
        freeHideNode: {
            default: [],
            type: cc.Node,
            displayName: '免费摇奖隐藏节点',
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
        audioBtn: {
            default: null,
            type: cc.Sprite,
            displayName: '声音按钮',
        }
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('CSDNetwork');
        this.audio = this.node.getComponent('CSDAudio');
        this.wheelList = [];
        this.bet = 0;
        this.auto = false;
        this.status = 0;
        this.bigWinResList = [3, 1, 2];
        this.bigWinCoin = 0;
        this.bigWinBoo = false;
        this.freeTimes = 0;
        this.rollResult = [];
        this.rollIndex = 0;
        this.lotteryRes = null;
        this.stopFree = false;
        this.delayClick = false;
        this.turnNum = 0;
    },

    start() {
        this.lblLines.string = LINES;
        this.lblWinCoin.string = '0.00';
        this.setBet();
        Helper.loadHead(this.playerInfo.playerHeadId, sp => {
            this.spUserFace.spriteFrame = sp;
        });
        this.lblUserName.string = this.playerInfo.playerName;
        this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
        this.audioBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.audio.pInfo.musicControl ? 'btn_sound' : 'btn_sound_2');
    },

    onCLick(event, args) {
        if (args == 'auto') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.delayClick) {
                return;
            }
            this.auto = !this.auto;
            this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
            if (this.auto && this.status == 0) {
                this.sendRoll();
            }
        } else if (args == 'roll') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.delayClick) {
                return;
            }
            if (!this.auto) {
                if (this.status == 0) {
                    this.rollBtnAnim.play();
                    this.status = 2;
                    this.sendRoll();
                } else if (this.status == 1) {
                    if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                        return;
                    }
                    this.delayClick = true;
                    this.scheduleOnce(() => {
                        this.delayClick = false;
                    }, 1);
                    this.stopImmediately();
                }
            }
        } else if (args == 'add') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                return;
            }
            this.bet += 1;
            this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
            this.setBet();
        } else if (args == 'dec') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                return;
            }
            this.bet -= 1;
            this.bet = this.bet >= 0 ? this.bet : 0;
            this.setBet();
        } else if (args == 'closeBigWin') {
            this.audio.playBgm(0);
            this.bigWinResultAnim.node.active = false;
            this.bigWinNode.active = false;
            this.caiShenBg.active = false;
        } else if (args == 'exitGame') {
            this.net.socket.disconnect();
            cc.director.loadScene("LobbyMain");
        } else if (args == 'help') {
            this.helpUI.active = true;
            let hr = this.helpNum.children;
            for (let i in hr) {
                hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
            }
        } else if (args == 'closeHelp') {
            this.helpUI.active = false;
        } else if (args == 'audio') {
            this.audio.pInfo.musicControl = !this.audio.pInfo.musicControl;
            this.audioBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.audio.pInfo.musicControl ? 'btn_sound' : 'btn_sound_2');
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
        }
    },

    setBet() {
        this.lblBet.string = (BETNUM / this.playerInfo.exchangeRate).toFixed(2);
        this.lblCurBet.string = (BET[this.bet] * BETNUM / this.playerInfo.exchangeRate).toFixed(2);
        for (let i in this.lblCoinList) {
            this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM / this.playerInfo.exchangeRate).toFixed(2);
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
            //财神专属吐钱动画
            let animBool = false;
            let rIndex = this.rollIndex;
            let posX = [-547, -274, 0, 274, 547];
            for (let i in this.wheelList) {
                let length = this.wheelList[i].roleIdList.length;
                for (let j = 2; j <= 4; j++) {
                    if (this.wheelList[i].roleIdList[length - j] == 13) {
                        animBool = true;
                        this.wheelList[i].rolePbList[length - j].getComponent(cc.Animation).play('s02_s');
                        let pb = cc.instantiate(this.coinPb);
                        pb.position = cc.v2(posX[i], (4 - j + 2) * 200 - 60);
                        this.coinAnimPr.addChild(pb);
                        pb.runAction(cc.sequence(
                            cc.spawn(cc.moveTo(1, cc.v2(0, 750)), cc.scaleTo(1, 0)),
                            cc.removeSelf()
                        ))
                    }
                }
            }
            this.lblUserCoin.string = (this.lotteryRes.userscore / this.playerInfo.exchangeRate).toFixed(2);
            this.lblWinCoin.string = (this.lotteryRes.winscore / this.playerInfo.exchangeRate).toFixed(2);
            // if (animBool) {
            this.scheduleOnce(() => {
                if (rIndex == this.rollIndex) {
                    this.turnNum += 1;
                    this.playWinAnim(this.turnNum);
                }
            }, 1);
            // } else {
            //     this.playWinAnim();
            // }
            if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
                this.bigWinBoo = true;
                this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
                this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
                this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
                this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
                this.startBigWin();
            }
            if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                if (this.freeTimes == 0) {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.audio.playFree();
                    this.scheduleOnce(() => {
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

    playWinAnim(tm) {
        //动画结束后自动roll
        let hasWinBool = 0;
        let allLine = [];
        for (let i in this.lotteryRes.viewarray.nWinCards) {
            if (this.lotteryRes.viewarray.nWinCards[i]) {
                allLine.push(i);
            }
        }
        let lines = this.lotteryRes.viewarray.nWinLinesDetail;
        let rIndex = this.rollIndex;
        let list = (this.freeTimes > 0 || this.stopFree) ? [allLine,] : [allLine, ...lines];
        hasWinBool = list.length - 1;

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
                    this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));
                }
                animIndex++;
            }
        }, 3, list.length, 0.01)


        this.scheduleOnce(() => {
            if (tm != this.turnNum) {//不是当前旋转轮次则跳过后续操作
                return;
            }
            if (this.stopFree) {
                this.stopFree = false;
                this.stopFreeTimes();
                this.closeShine();
                this.auto = false;
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
        }, hasWinBool > 0 ? hasWinBool * 3 : 1);
    },

    //免费次数有关
    startFreeGame() {
        this.audio.playBgm(1);
        this.auto = false;
        this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = false;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimesNode.active = true;
        this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
        this.scheduleOnce(() => {
            this.auto = true;
            this.sendRoll();
        }, 2);
    },

    stopFreeTimes() {
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = true;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.audio.playBgm(0);
        this.freeTimesNode.active = false;
    },

    //0-5 0-2
    showAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation).play();
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = true;
        nodeList[cols * 3 + index].getComponent(cc.Animation).play();
    },

    clsoeAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        let anim = this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation);
        anim.setCurrentTime(0);
        anim.stop();
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = false;
    },

    roll(list) {
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
        this.net.socket.emit('lottery', JSON.stringify({
            bet: this.bet,
            nBetList: [BET[this.bet] * BETNUM]
        }));
    },

    stopImmediately() {
        if (!this.auto) {
            for (let i in this.wheelList) {
                this.wheelList[i].stopImmediately();
            }
        }
    },


    //大奖有关
    closeDoorAnim() {
        this.doorNode.active = true;
        let chList = this.doorNode.children;
        this.audio.playCloseDoor();
        for (let i in chList) {
            chList[i].getComponent(cc.Animation).play();
        }

    },

    startBigWin() {
        this.audio.playBgm(3);
        this.auto = false;
        this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
        this.node.runAction(cc.sequence(
            cc.callFunc(() => {
                this.caiShenAnim.play();
            }),
            cc.delayTime(3),
            cc.callFunc(() => {
                this.doorNode.active = false;
                this.caiShenBg.active = true;
                this.caiShenBg.getChildByName('Big_caishen').getComponent(cc.Animation).play();
                this.audio.playCs();
            }),
            cc.delayTime(4),
            cc.callFunc(() => {
                this.caiShenBg.active = false;
                this.bigWinInit();
            })
        ))
    },

    bigWinClick(event, args) {
        if (this.bigWinTimes > 0) {
            let num = this.BigWinSet.size;
            this.BigWinSet.add(args);
            if (num == this.BigWinSet.size) {
                return;
            }
            let winNodePr = this.bigWinNode.children;
            let coinPr = winNodePr[args].children;
            this.bigWinTimes--;
            let coinNode = coinPr[0];
            coinNode.getComponent(cc.Animation).play();
            let index = this.bigWinResList[this.bigWinTimes];
            console.log(index, this.bigWinTimes);
            this.scheduleOnce(() => {
                let nameList = {
                    30: 's_show_mini',
                    50: 's_show_minor',
                    100: 's_show_major',
                    1000: 's_show_grand'
                }
                let nd = winNodePr[args].getChildByName(nameList[index]);
                nd.active = true;
                nd.getComponent(cc.Animation).play();
            }, 0.5);
            if (this.bigWinTimes == 0) {
                this.scheduleOnce(() => {
                    this.audio.playBW();
                    this.bigWinResultAnim.node.active = true;
                    this.lblUserCoin.string = (this.bigWinResultCoin / this.playerInfo.exchangeRate).toFixed(2);
                    this.lblWinCoin.string = (this.bigWinCoin / this.playerInfo.exchangeRate).toFixed(2);
                    this.bigWinResultAnim.node.getChildByName('gold').getComponent(cc.Label).string = (this.bigWinCoin / this.playerInfo.exchangeRate).toFixed(2);
                    this.bigWinResultAnim.play();
                    this.bigWinBoo = false;
                }, 2);
            }
        }
    },

    bigWinInit() {
        this.audio.playBgm(2);
        this.BigWinSet = new Set();
        this.bigWinNode.active = true;
        let pr = this.bigWinNode.children;
        for (let i in pr) {
            let pr1 = pr[i].children;
            for (let j in pr1) {
                pr1[j].active = j == 0;
            }
        }
    },

});