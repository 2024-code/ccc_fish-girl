// 0红 1绿 2黄
// 0狮子 1熊猫 2猴子 3兔子
const ANIMAILSLIST = [0, 1, 2, 3, 2, 0, 3, 2, 3, 1, 3, 2, 0, 1, 2, 3, 2, 0, 3, 2, 3, 1, 3, 2];
const OFFSETANGLE = 15;
cc.Class({
    extends: cc.Component,

    properties: {
        userNameLbl: cc.Label,
        userCoinLbl: cc.Label,
        userHead: cc.Sprite,
        outerWheel: cc.Node,
        innerWheel: cc.Node,
        colorCardPr: cc.Node,
        timerLbl: cc.Label,
        betTimerLbl: cc.Label,
        betPr: cc.Node,
        oddPr: cc.Node,
        oddUI: cc.Node,
        innerWheelNode: cc.Node,
        shineAnim: cc.Animation,
        wheelStarNode: cc.Node,
        bgAnim: cc.Animation,
        resultNode: cc.Node,
        redAnimSp: [cc.SpriteFrame],
        greenAnimSp: [cc.SpriteFrame],
        yellowAnimSp: [cc.SpriteFrame],
        resultPb: cc.Prefab,
        playMask: cc.Node,
        nextTime_lab: cc.Label,
        historyNode: cc.Node,
    },

    onLoad() {
        this.network = this.getComponent('SH_Network');
        this.audio = this.getComponent('SH_Audio');
        this.colorList = []; // wheel color data
        this.betList = []; // animals bet  [[],[],[],[]]
        this.selBet = 2; //bet toggle
        this.curOdd = []; // odd
        this.otherOdd = []; //other's curodd
        this.lastOdd = null; // last odd
        this.curOddCount = 0; // ood count
        this.allowBet = false;
    },

    start() {
        this.colorCardsList = this.colorCardPr.children;
        this.oddNode = [
            [
                this.oddPr.getChildByName('01').children,
                this.oddPr.getChildByName('05').children,
                this.oddPr.getChildByName('09').children,
            ],
            [
                this.oddPr.getChildByName('02').children,
                this.oddPr.getChildByName('06').children,
                this.oddPr.getChildByName('10').children,
            ],
            [
                this.oddPr.getChildByName('03').children,
                this.oddPr.getChildByName('07').children,
                this.oddPr.getChildByName('11').children,
            ],
            [
                this.oddPr.getChildByName('04').children,
                this.oddPr.getChildByName('08').children,
                this.oddPr.getChildByName('12').children,
            ],
        ]
        this.shineAnim.play();
    },

    showInfo() {
        this.userNameLbl.string = this.network.userName;
        this.userCoinLbl.string = this.network.userCoin.toFixed(2);
        Helper.loadHead(this.network.headUrl, sp => {
            this.userHead.spriteFrame = sp;
        });
    },

    showNextTime() {
        let i = this.network.gameTime;
        this.nextTime_lab.string = "距离下一轮：" + (60 - i);
        let cb = () => {
            i++;
            this.nextTime_lab.string = "距离下一轮：" + (60 - i);
            if (i == 60) {
                this.unschedule(cb);
            }
        };
        this.schedule(cb, 1);
    },

    loginInitColor() {
        let index = 0;
        for (let i in this.colorCardsList) {
            this.colorCardsList[i].getChildByName('02').active = this.colorList[index] == 2;
            this.colorCardsList[i].getChildByName('03').active = this.colorList[index] == 1;
            index++;
        }
    },


    startBets() {
        this.audio.playBgm(0);
        this.playMask.active = false;
        this.resultNode.active = false;
        this.initBg();
        this.shineAnim.play();
        this.audio.playStartBet();
        this.showInfo();
        this.loginInitColor();
        this.timerLbl.node.active = true;
        this.curOddCount = 0;
        for (let i in this.betList) {
            this.curOdd[i] = [];
            this.otherOdd[i] = [];
            for (let j in this.betList[i]) {
                this.oddNode[i][j][1].getComponent(cc.Label).string = 'X' + this.betList[i][j];
                this.oddNode[i][j][2].getComponent(cc.Label).string = '0';
                this.oddNode[i][j][3].getComponent(cc.Label).string = '0';
                this.curOdd[i][j] = 0;
                this.otherOdd[i][j] = 0;
            }
        }
        this.allowBet = true;
        this.openOddUI(true);
    },

    rfOdds() {
        for (let i in this.curOdd) {
            for (let j in this.curOdd[i]) {
                this.oddNode[i][j][2].getComponent(cc.Label).string = this.curOdd[i][j];
                this.oddNode[i][j][3].getComponent(cc.Label).string = this.otherOdd[i][j];
            }
        }
    },

    openOddUI(bool) {
        if (bool && this.allowBet) {
            if (!this.oddUI.active) {
                this.oddUI.active = true;
                this.oddUI.runAction(cc.moveTo(0.2, cc.v2(0, 64.5)))
            }
        } else {
            if (this.oddUI.active) {
                this.oddUI.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(0, 1000)), cc.callFunc(() => {
                    this.oddUI.active = false;
                })))
            }
        }
    },

    closeBets() {
        this.openOddUI(false);
        this.allowBet = false;
        this.lastOdd = JSON.stringify(this.curOdd);
        let sendJsonList = [];
        for (let i in this.curOdd) {
            for (let j in this.curOdd[i]) {
                if (this.curOdd[i][j] > 0) {
                    sendJsonList.push({
                        nBetItem: parseInt(i),
                        strBetValue: parseInt(j),
                        nBet: this.curOdd[i][j] * 100,
                    })
                }
            }
        }
        if (sendJsonList.length > 0) {
            this.network.socket.emit('lottery', JSON.stringify(sendJsonList));
        }
    },

    getResult(res) {
        this.audio.playBgm(1);
        this.shineAnim.stop();
        this.timerLbl.node.active = false;
        this.resultType = res.choice_big_win; //-1,0 送灯,1 闪电
        this.resultScore = (res.win / 100).toFixed(2);
        this.resultAnimal = [];
        this.resultAnimal.push({
            aid: res.win_card,
            color: res.win_color,
            outerAngle: 15 * (24 + res.win_color_index - res.win_card_index),
            innerAngle: 15 * res.win_color_index
        })

        if (this.resultType == 0) {
            this.resultAnimal.push({
                aid: res.win_card_song,
                color: res.win_color_song,
                outerAngle: 15 * (24 + res.win_color_index_song - res.win_card_index_song),
                innerAngle: 15 * res.win_color_index_song
            })
        }
        this.audio.playDingAudio();
        if (this.resultAnimal.length == 1) {
            cc.tween(this.node).call(() => {
                this.innerWheelNode.getChildByName('开启').active = true;
                this.innerWheelNode.getChildByName('开启').getComponent(cc.Animation).play();
            }).delay(1).call(() => {
                this.runWheel(this.resultAnimal[0].outerAngle, this.resultAnimal[0].innerAngle, this.resultAnimal[0].color);
            }).delay(6).call(() => {
                this.innerWheelNode.getChildByName('开启').active = false;
                this.innerWheelNode.getChildByName('关闭').active = true;
                this.innerWheelNode.getChildByName('关闭').getComponent(cc.Animation).play();
            }).delay(1).call(() => {
                this.showEnd();
            }).start();
        } else if (this.resultAnimal.length == 2) {
            cc.tween(this.node).call(() => {
                this.innerWheelNode.getChildByName('开启').active = true;
                this.innerWheelNode.getChildByName('开启').getComponent(cc.Animation).play();
            }).delay(1).call(() => {
                this.runWheel(this.resultAnimal[0].outerAngle, this.resultAnimal[0].innerAngle, this.resultAnimal[0].color);
            }).delay(7).call(() => {
                this.runWheel(this.resultAnimal[1].outerAngle, this.resultAnimal[1].innerAngle, this.resultAnimal[1].color);
            }).delay(13).call(() => {
                this.innerWheelNode.getChildByName('开启').active = false;
                this.innerWheelNode.getChildByName('关闭').active = true;
                this.innerWheelNode.getChildByName('关闭').getComponent(cc.Animation).play();
            }).delay(1).call(() => {
                this.showEnd();
            }).start();
        }
    },

    showEnd() {
        this.audio.playBgm(0);
        if (this.playMask.active) {
            return;
        }
        this.userCoinLbl.string = this.network.userCoin.toFixed(2);
        this.resultNode.active = true;
        let myScore = this.resultNode.getChildByName('slwh_game_win_jbjs_bg').getChildByName('New Label');
        myScore.getComponent(cc.Label).string = this.resultScore;
        let winNode = this.resultNode.getChildByName('slwh_game_win_jbjs_bg').getChildByName('slwh_game_win_txt1');
        let loseNode = this.resultNode.getChildByName('slwh_game_win_jbjs_bg').getChildByName('slwh_game_win_txt2');
        winNode.active = this.resultScore > 0;
        loseNode.active = this.resultNode < 0;

        let detailNode = this.resultNode.getChildByName('detail').children;
        let index = 0;
        for (let i in this.curOdd) {
            for (let j in this.curOdd[i]) {
                if (this.curOdd[i][j] > 0) {
                    detailNode[index].active = true;
                    let sp = null;
                    if (j == 0) {
                        sp = this.redAnimSp[i];
                    } else if (j == 1) {
                        sp = this.greenAnimSp[i];
                    } else if (j == 2) {
                        sp = this.yellowAnimSp[i];
                    }
                    let sprite = detailNode[index].getChildByName('slwh_game_greenlion_8');
                    sprite.getComponent(cc.Sprite).spriteFrame = sp;
                    sprite.getChildByName('New Label').getComponent(cc.Label).string = this.curOdd[i][j];

                } else {
                    detailNode[index].active = false;
                }
                index++;
            }
        }
        let pr = this.resultNode.getChildByName('slwh_game_win_blkj_bg');
        pr.removeAllChildren();
        if (this.resultType == 0) {
            let pb = cc.instantiate(this.resultPb);
            let aid = this.resultAnimal[0].aid;
            let color = this.resultAnimal[0].color;
            let sp = null;
            if (color == 0) {
                sp = this.redAnimSp[aid];
            } else if (color == 1) {
                sp = this.greenAnimSp[aid];
            } else if (color == 2) {
                sp = this.yellowAnimSp[aid];
            }
            pb.getChildByName('sprite').getComponent(cc.Sprite).spriteFrame = sp;
            pb.getChildByName('oddLbl').getComponent(cc.Label).string = 'X' + this.betList[aid][color];
            pb.x = -90;
            pr.addChild(pb);

            let pb1 = cc.instantiate(this.resultPb);
            let aid1 = this.resultAnimal[1].aid;
            let color1 = this.resultAnimal[1].color;
            let sp1 = null;
            if (color1 == 0) {
                sp1 = this.redAnimSp[aid1];
            } else if (color1 == 1) {
                sp1 = this.greenAnimSp[aid1];
            } else if (color1 == 2) {
                sp1 = this.yellowAnimSp[aid1];
            }
            pb1.getChildByName('sprite').getComponent(cc.Sprite).spriteFrame = sp1;
            pb1.getChildByName('oddLbl').getComponent(cc.Label).string = 'X' + this.betList[aid1][color1];
            pb1.x = 90;
            pr.addChild(pb1);
        } else {
            let pb = cc.instantiate(this.resultPb);
            let aid = this.resultAnimal[0].aid;
            let color = this.resultAnimal[0].color;
            let sp = null;
            if (color == 0) {
                sp = this.redAnimSp[aid];
            } else if (color == 1) {
                sp = this.greenAnimSp[aid];
            } else if (color == 2) {
                sp = this.yellowAnimSp[aid];
            }
            pb.getChildByName('sprite').getComponent(cc.Sprite).spriteFrame = sp;
            pb.getChildByName('oddLbl').getComponent(cc.Label).string = 'X' + this.betList[aid][color];
            pb.x = 0;
            pr.addChild(pb);
        }
    },

    update(dt) {
        if (this.timerLbl.node.active) {
            let t = parseInt(new Date().getTime() / 1000 - this.network.timer);
            this.timerLbl.string = 30 - t > 0 ? 30 - t : 0;
            this.betTimerLbl.string = 30 - t > 0 ? 30 - t : 0;
        }
    },

    initBg() {
        this.bgAnim.node.getChildByName('bg_yellow').active = false;
        this.bgAnim.node.getChildByName('bg_red').active = false;
        this.bgAnim.node.getChildByName('bg_green').active = false;
    },

    runWheel(outerAngle, innerAngle, color) {
        this.initBg();
        let offsetOuter = outerAngle - this.outerWheel.rotation;
        offsetOuter = offsetOuter < 0 ? 360 + offsetOuter : offsetOuter;
        offsetOuter += 360 * 3;
        this.outerWheel.runAction(cc.sequence(cc.rotateBy(5, offsetOuter).easing(cc.easeCubicActionInOut(3.0)), cc.callFunc(() => {
            this.outerWheel.rotation = outerAngle % 360;
        })));

        this.wheelStarNode.runAction(cc.rotateBy(5, offsetOuter).easing(cc.easeCubicActionInOut(3.0)));

        let offsetInner = innerAngle - this.innerWheel.rotation;
        offsetInner = offsetInner < 0 ? 360 + offsetInner : offsetInner;
        offsetInner -= 360 * 3;
        this.innerWheel.runAction(cc.sequence(cc.rotateBy(5, offsetInner).easing(cc.easeCubicActionInOut(3.0)), cc.callFunc(() => {
            this.innerWheel.rotation = innerAngle % 360;
            let colorList = ['bgRed', 'bgGreen', 'bgYellow'];
            this.bgAnim.play(colorList[color]);
        })));
    },

    onClick(ev, args) {
        if (args == 'home') {
            this.audio.playButton();
            this.network.socket.disconnect();
            cc.director.loadScene("LobbyMain");
        } else if (args == 'help') {
            this.audio.playButton();
        } else if (args == 'closeOddUI') {
            this.audio.playButton();
            this.openOddUI(false);
        } else if (args == 'openOddUI') {
            this.audio.playButton();
            this.openOddUI(true);
        } else if (args == 'rebet') {
            this.rebet();
        } else if (args == 'continue') {
            this.audio.playButton();
            this.resultNode.active = false;
        } else {
            this.audio.playBet();
            cc.log('下注args:' + this.selBet);
            if (this.selBet + this.curOdd[args[0]][args[1]] <= 3000 && this.selBet <= this.network.userCoin) {
                this.curOdd[args[0]][args[1]] += this.selBet;
                this.curOddCount += this.selBet;
                this.rfOdds();
                this.network.userCoin -= this.selBet;
                this.userCoinLbl.string = this.network.userCoin.toFixed(2);
            } else {
                cc.log('超过最大下注额度');
            }
        }
    },

    rebet() {
        if (this.lastOdd && this.curOddCount == 0) {
            let odd = JSON.parse(this.lastOdd);
            let oddCount = 0;
            for (let i in odd) {
                for (let j in odd) {
                    if (odd[i][j] > 0) {
                        oddCount += odd[i][j];
                    }
                }
            }
            if (oddCount <= this.network.userCoin) {
                this.audio.playBet();
                this.curOdd = odd;
                this.curOddCount = oddCount;
            }
            this.rfOdds();
        }
    },

    onToggle(ev, args) {
        this.audio.playButton();
        this.selBet = parseInt(args);
    },
});