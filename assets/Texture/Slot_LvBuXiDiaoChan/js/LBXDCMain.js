const BETNUM = 2.5; //单注值
const LINES = 25; //线数
const TOPBET = [30, 1000, 100, 10];
const BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RULELIST = [2, 0.2, 0.1, 1, 0.2, 0.1, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 3, 0.6, 0.2]; //规则
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

        bigWinNode: {
            default: null,
            type: cc.Node,
            displayName: '大奖节点',
        },

        bigWinResultAnim: {
            default: null,
            type: cc.Node,
            displayName: 'bigWin中奖'
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

        audioBtn: {
            default: null,
            type: cc.Sprite,
            displayName: '声音按钮',
        }
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('LBXDCNetwork');
        this.audio = this.node.getComponent('LBXDCAudio');
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
		this.delayClick = false;
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
    },

onCLick(event, args) {
        if (args == 'auto') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
                return;
            }
            this.auto = !this.auto;
            this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
            if (this.auto && this.status == 0) {
                this.sendRoll();
            }
        } else if (args == 'roll') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
                return;
            }
            if (!this.auto) {
                if (this.status == 0) {
                    this.rollBtnAnim.play();
                    this.status = 2;
                    this.sendRoll();
                } else if (this.status == 1) {
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
            this.bigWinResultAnim.active = false;
            this.bigWinNode.active = false;
            this.audio.playBgm(0);
        } else if (args == 'help') {
            this.helpUI.active = true;
            let hr = this.helpNum.children;
            for (let i in hr) {
                hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
            }
        } else if (args == 'closeHelp') {
            this.helpUI.active = false;
        } else if (args == 'exitGame') {
            this.net.socket.disconnect();
            cc.director.loadScene("LobbyMain");
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
        this.lblBet.string = (BET[this.bet] * BETNUM).toFixed(2);
        this.lblCurBet.string = (BET[this.bet] * BETNUM).toFixed(2);
        for (let i in this.lblCoinList) {
            this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM).toFixed(2);
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
            }, 1);
            if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
                this.bigWinBoo = true;
                // this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
                // this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
                // this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;
                this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
                this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
                this.scheduleOnce(() => {
                    this.startBigWin();
                }, 2);
            }
            if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                if (this.freeTimes == 0) {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.closeShine();
                    this.startFreeGame();
                    this.scheduleOnce(() => {
                    //     this.freeBeginNode.active = false;
                        this.node.getChildByName("fire").active = false;
                        this.freeBeginNode.active = true;
                    }, 3);
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

        for (let i in this.lotteryRes.viewarray.nWinCards) {
            if (this.lotteryRes.viewarray.nWinCards[i]) {
                allLine.push(i);
            }
        }
        let lines = this.lotteryRes.viewarray.nWinLinesDetail;
        let rIndex = this.rollIndex;
        let list = (this.freeTimes > 0 || this.stopFree) ? [allLine, ] : [allLine, ...lines];
        hasWinBool = list.length - 1;
        if (hasWinBool > 0) {
            //播放恭喜字样动画
            this.effectAnimFullA.active = true;
            this.effectAnimFullA.getComponent(sp.Skeleton).clearTrack(0);
            this.effectAnimFullA.getComponent(sp.Skeleton).setAnimation(0,"win_cn",false);
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
            if (this.lotteryRes.winscore > BET[this.bet] * BETNUM *100) { //如果大于100倍赌注，就播放bigFull动画
                this.effectAnimBigFull.active = true;
                this.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);
                this.effectAnimBigFull.getComponent(sp.Skeleton).setAnimation(0,"animation1",true);
            }
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
        }, hasWinBool > 0 ? hasWinBool * 3 : 2)
    },

    //免费次数有关
    startFreeGame() {
        console.log("startFreeGame");
        this.audio.playBgm(1);
        this.freeGameCoin = 0;
        this.BgNode.active = false;
        this.bIsFreeGame = true;
        this.freeBgNode.active = true;
        this.node.getChildByName("fire").active = true;
        this.node.getChildByName("fire").getComponent(sp.Skeleton).setAnimation(0, "animation", false);
    },
    //选择游戏
    chooseGame(event, customentData){
        this.net.socket.emit('chooseGame', JSON.stringify({
            choose: customentData,
        }));
    },
    //选择后开始免费
    sendFree() {
        this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame('btn_zidong');
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = false;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeBeginNode.active = false;
        this.freeTimesNode.active = true;
        this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
        this.auto = true;
        this.sendRoll();
    },

    stopFreeTimes() {
        console.log("stopFreeTimes freeGameCoin : ",this.freeGameCoin);
        this.audio.playBgm(0);
        this.auto = false;
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = true;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimesNode.active = false;
        this.freeEndNode.active = true;
        this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = (this.freeGameCoin / 100).toFixed(2);
        this.scheduleOnce(()=>{
            this.freeEndNode.active = false;
            this.BgNode.active = true;
            this.freeBgNode.active = false;
            this.bIsFreeGame = false;
        },2);
        for (let i = 1; i <= 5; i++) {
            this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + i).opacity = 255;
            this.node.getChildByName("Game_main").getChildByName("ice" + i).active = false;
        }
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

    checkRollData(list){
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
        if (this.freeTimesNode.active) {//吕布模式 有一列全是wild就冻结住
            for (let i = 1; i <= 5; i++) {
                if (list[i - 1] == 10 &&
                    list[i + 4] == 10 &&
                    list[i + 9] == 10) {
                    this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + i).opacity = 0;
                    this.node.getChildByName("Game_main").getChildByName("ice" + i).active = true;
                }
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + i).opacity = 255;
                this.node.getChildByName("Game_main").getChildByName("ice" + i).active = false;
            }
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
            nBetList: [BET[this.bet] * BETNUM * 100, ]
        }));
    },

    stopImmediately() {
        if (!this.auto) {
            for (let i in this.wheelList) {
                this.wheelList[i].stopImmediately();
            }
        }
    },

    startBigWin() {
        this.audio.playBgm(2);
        this.bigWinNode.active = true;
        this.bigWinNode.getChildByName("slots_minigame_wheel").rotation = 0;
        this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").rotation = 0;
        let suipianArray = this.lotteryRes.viewarray.getOpenBox.nWinOpenBox;
        this.bigWinNode.getChildByName("slots_minigame_wheel").active = false;
        this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").active = true;
        for (let j = 1; j <= 6; j++) {
            this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + j).active = false;
            this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + j).active = false;
        }
        for (let i = 0; i < suipianArray.length; i++) {
            this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + suipianArray[i]).active = true;
            this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + suipianArray[i]).active = true;
        }
        this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active = true;
    },

    bigWinBegin(event, customentData) {
        this.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = false;
        if (this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active) {
            let tempWheel = this.bigWinNode.getChildByName("slots_minigame_wheel_pintu");
            let tempDu = 0;
            let location = this.lotteryRes.viewarray.getOpenBox.location;
            switch (location) {
                case 1:
                    tempDu = 360;
                break;
                case 2:
                    tempDu = 300;
                break;
                case 3:
                    tempDu = 240;
                break;
                case 4:
                    tempDu = 180;
                break;
                case 5:
                    tempDu = 120;
                break;
                case 6:
                    tempDu = 60;
                break;
            }
            tempWheel.runAction(cc.sequence(cc.rotateBy(0.5, 360),
                cc.rotateBy(2.5, 360 + tempDu).easing(cc.easeOut(5)),
                cc.callFunc(()=>{
                    this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + location).active = true;
                    this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + location).active = true;
                }),
                cc.delayTime(1),
                cc.callFunc(()=>{
                    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = true;
                    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active = false;
                    if (this.bigWinCoin > 0) {
                        this.bigWinNode.getChildByName("slots_minigame_wheel").active = true;
                        this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").active = false;
                    } else {
                        this.bigWinBoo = false;
                        this.audio.playBgm(0);
                        this.bigWinNode.active = false;
                    }
                })
            ));
        } else {
            this.bigWinBoo = false;
            let tempWheel = this.bigWinNode.getChildByName("slots_minigame_wheel");
            let tempDu = 0;
            switch (this.bigWinCoin) {
                case 2000000:
                    tempDu = 120;
                break;
                case 10000000:
                    tempDu = 60;
                break;
                case 1000000:
                    tempDu = 180;
                break;
                case 500000:
                    tempDu = 240;
                break;
                case 200000:
                    tempDu = 300;
                break;
                case 50000:
                    tempDu = 360;
                break;
            }
            tempWheel.runAction(cc.sequence(cc.rotateBy(0.5, 360),
                cc.rotateBy(2.5, 360 + tempDu).easing(cc.easeOut(5)),
                cc.delayTime(1),
                cc.callFunc(()=>{
                    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = true;
                    this.audio.playBgm(0);
                    this.bigWinNode.active = false;
                    this.bigWinResultAnim.active = true;
                    this.bigWinResultAnim.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(()=>{
                        this.bigWinResultAnim.active = false;
                    })));
                    this.lblUserCoin.string = (this.bigWinResultCoin / 100).toFixed(2);
                    this.lblWinCoin.string = (this.bigWinCoin / 100).toFixed(2);
                    this.bigWinResultAnim.getChildByName('lbl_coin ').getComponent(cc.Label).string = (this.bigWinCoin / 100).toFixed(2);;
                })
            ));
        }
    },

    bigWinClick(event, args) {
        if (this.bigWinTimes > 0) {
            let num = this.BigWinSet.size;
            this.BigWinSet.add(args);
            if (num == this.BigWinSet.size) {
                return;
            }
            let winNodePr = this.bigWinNode.children;
            this.bigWinTimes--;
            let index = this.bigWinResList[this.bigWinTimes];
            let nameList = {
                10: 's_bonus_SH00F_minor',
                100: 's_bonus_SH00F_medium',
                1000: 's_bonus_SH00F_mega'
            }
            let nd = winNodePr[args].getChildByName(nameList[index]);
            this.scheduleOnce(() => {
                nd.active = true;
                nd.getComponent(cc.Animation).play();
            }, 0.5);
            if (this.bigWinTimes == 0) {
                this.scheduleOnce(() => {
                    this.bigWinResultAnim.active = true;
                    this.lblUserCoin.string = (this.bigWinResultCoin / 100).toFixed(2);
                    this.lblWinCoin.string = (this.bigWinCoin / 100).toFixed(2);
                    this.bigWinResultAnim.getChildByName('coin').getComponent(cc.Label).string = (this.bigWinCoin / 100).toFixed(2);
                    let lt = [10, 30, 100, 1000];
                    for (let i in lt) {
                        this.bigWinResultAnim.getChildByName('' + lt[i]).active = this.bigWinCard == lt[i];
                    }
                    this.bigWinBoo = false;
                }, 2);
            }
        }
    },
});