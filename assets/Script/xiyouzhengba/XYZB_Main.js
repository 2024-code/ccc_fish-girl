const BETSLIST = [10, 20, 50, 100, 500]; //bets
const ODDSLIST = [0, 23, 12, 20, 13, 7, 11, 8, 4, 7, 46, 25, 40, 0, 23, 12, 20, 13, 7, 11, 8, 4, 7, 46, 25, 40]; //odds for wheel
const AUDIOROLELIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //Role Audio
const ROLECOLORLSIT = [0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]; //Role Color
cc.Class({
    extends: cc.Component,

    properties: {
        bgMapList: [cc.Node],
        cartoonNode: cc.Node,
        wheel1: cc.Node,
        wheel2: cc.Node,
        userNameLbl: cc.Label,
        userIDLbl: cc.Label,
        userCoinLbl: cc.Label,
        userHead: cc.Sprite,
        chipArea: cc.Node,
        zxhSp: [cc.SpriteFrame],
        historyNode: cc.Node,
        selBetLbl: cc.Label,
        betScoreLbl: cc.Label,
        betUILblList: [cc.Label],
        timerLbl: cc.Label,
        scoreLbl: cc.Label,
        pkNode: cc.Node,
        PKAtlas: cc.SpriteAtlas,
        waitMask: cc.Node,
        musicNode: cc.Node,
        resultWheel: cc.Node,
        mothSprite: cc.Sprite,
        exitBtn: cc.Node,
        helpUI: cc.Node,
    },

    onLoad() {
        this.cartoonBright = []; //cartoon bright nodes
        this.cartoonAnims = []; //cartoon animations
        this.cartoonSp = []; //cartoon spriteFrames
        this.runGameBool = false; //game start
        this.selBetIndex = 0; //index of BETSLIST
        this.network = this.getComponent('XYZB_Network');
        this.audio = this.musicNode.getComponent('XYZB_Audio');
        this.curWheel = [0, 0];
        this.curBetScore = 0; //Score of current bet
        this.curBet = []; //Details of current bet
        this.lastBet = []; //Details of last bet
        this.betTimeBool = false; //for timer
        //init cartoonNode node
        let prNode = this.cartoonNode.children;
        for (let i in prNode) {
            let cNode = prNode[i].children;
            this.cartoonBright.push(cNode[0]);
            this.cartoonAnims.push(cNode[1]);
            this.cartoonSp.push(cNode[0].getComponent(cc.Sprite).spriteFrame);
        }
        //init wheel list
        this.wheelCardList1 = [];
        let wheelCh1 = this.wheel1.children;
        for (let i in wheelCh1) {
            this.wheelCardList1.push(wheelCh1[i]);
        }

        this.wheelCardList2 = [];
        let wheelCh2 = this.wheel2.children;
        for (let i in wheelCh2) {
            this.wheelCardList2.push(wheelCh2[i]);
        }
        this.historyList = this.historyNode.children;
        this.scoreLbl.string = '0.00';
        this.lastGamePoint = 0;
        this.mothN = 2;
    },

    start() {
        this.audio.stopAll();
        this.changeMap();
    },

    startBets() {
        this.exitBtn.y = 300;
        this.waitMask.active = false;
        for (let i in this.cartoonBright) {
            if (this.cartoonAnims[i]) {
                this.cartoonAnims[i].active = false;
            }
            this.cartoonBright[i].active = false;
        }
        this.betTimeBool = true;
        this.clearCurBet();
        this.chipArea.runAction(cc.moveTo(0.2, cc.v2(0, 0)));
    },

    clearCurBet() {
        this.curBet = [];
        this.curBetScore = 0;
        this.betScoreLbl.string = this.curBetScore.toFixed(2);
        for (let i in this.betUILblList) {
            if (!!this.betUILblList[i]) {
                this.betUILblList[i].string = '0.00';
            }
        }
    },

    closeBets() {
        this.exitBtn.y = 182;
        this.betTimeBool = false;
        let sendJsonList = [];
        for (let i in this.curBet) {
            if (!!this.curBet) {
                let sendJson = {
                    nBetItem: i <= 12 ? 1 : 2,
                    strBetValue: i <= 12 ? parseInt(i) : parseInt(i) - 13,
                    nBet: this.curBet[i] * 100,
                }
                sendJsonList.push(sendJson);
            }
        }
        if (sendJsonList.length > 0) {
            this.network.socket.emit('lottery', JSON.stringify(sendJsonList));
        }
        this.lastBet = [...this.curBet];
        this.chipArea.runAction(cc.moveTo(0.2, cc.v2(0, -1500)));
        this.scoreLbl.string = '0.00';
        this.userCoinLbl.string = (this.network.userCoin - this.curBetScore).toFixed(2);
    },

    showBet(index) {
        if (!!this.curBet[index]) {
            this.curBet[index] += BETSLIST[this.selBetIndex];
        } else {
            this.curBet[index] = BETSLIST[this.selBetIndex];
        }
        this.curBetScore += BETSLIST[this.selBetIndex];
        this.betScoreLbl.string = this.curBetScore.toFixed(2);
        this.betUILblList[index].string = this.curBet[index].toFixed(2);
    },

    onClick(ev, args) {
        switch (args) {
            case 'home':
                this.network.socket.disconnect();
                cc.director.loadScene("LobbyMain");
                break;
            case 'clearCurBet':
                this.clearCurBet();
                this.audio.playClearBet();
                break;
            case 'changeSelBetIndex':
                this.selBetIndex++;
                if (this.selBetIndex > 4) {
                    this.selBetIndex = 0;
                }
                this.audio.playChangeBet();
                this.selBetLbl.string = BETSLIST[this.selBetIndex].toFixed(2);
                break;
            case 'continued mortgage':
                this.audio.playReBet();
                this.clearCurBet();
                this.curBet = [...this.lastBet];
                for (let i in this.curBet) {
                    if (!!this.curBet[i]) {
                        if (this.curBetScore + this.curBet[i] <= this.network.userCoin) {
                            this.curBetScore += this.curBet[i];
                            this.betScoreLbl.string = this.curBetScore.toFixed(2);
                            this.betUILblList[i].string = this.curBet[i].toFixed(2);
                        } else {
                            console.log('金币不足');
                        }
                    }
                }
                break;
            case 'help':
                this.helpUI.active = true;
                break;
            case 'close help':
                this.helpUI.active = false;
                break;
            default:
                if (parseInt(args) == args) {
                    if (this.curBetScore + BETSLIST[this.selBetIndex] <= this.network.userCoin) {
                        this.showBet(parseInt(args));
                        this.audio.playBet();
                    } else {
                        console.log('金币不足');
                    }
                }
                break;
        }
    },

    /**
     * start game animation
     * @param {stop id} targetId 
     * @param {begin id} beginId 
     */
    lottertDraw(targetId, beginId = Math.floor(Math.random() * 26), wheel1, wheel2) {
        this.lastGamePoint = targetId;
        this.runGameBool = true;
        targetId = targetId - beginId;
        this.targetPoints = 26 * 4 + targetId;
        this.accPoints = this.targetPoints * 0.5;
        this.accelerateRate = this.accPoints * 2 / 9;
        this.speedMax = this.accelerateRate * 3;
        this.beginPoint = beginId;
        this.lastPoint = beginId;
        this.curPoint = beginId;
        this.accTime = 0;
        this.decTime = 0;
        //wheel
        this.wTarget = [wheel1, wheel2];
        let distance = 85 * 4 * 10;
        let offset1 = Math.abs(this.wTarget[0] - this.curWheel[0]) * 85;
        let offset2 = Math.abs(this.wTarget[1] - this.curWheel[1]) * 85;
        //x= at^2;
        this.wAccelerate = [
            (distance + offset1) / 6 / 60,
            (distance + offset2) / 6 / 60
        ];
    },

    brightAnim(beginId, targetId) {
        beginId = parseInt(beginId % 26);
        targetId = parseInt(targetId % 26);
        if (targetId < beginId) {
            this.brightAnim(beginId, 25);
            this.brightAnim(0, targetId);
            return;
        }
        for (let i = beginId; i <= targetId; i++) {
            this.cartoonBright[i].active = true;
        }
    },

    rollWheel(wheelId) {
        let wheelList = wheelId == 1 ? this.wheelCardList1 : this.wheelCardList2;
        for (let i in wheelList) {
            let speed = wheelId == 1 ? this.wAccelerate[0] : this.wAccelerate[1];
            wheelList[i].y += speed;
            if (wheelList[i].y >= 85) {
                if (parseInt(i) == 0) {
                    wheelList[i].y = wheelList['3'].y - 85;
                } else {
                    wheelList[i].y = wheelList[i - 1].y - 85;
                }
            }
        }
    },

    mothWheel() {
        this.runMothTimes = this.runMothTimes || 0;
        this.runMothTimes++;
        if (this.runMothTimes % 3 == 0) {
            this.mothN++
            if (this.mothN > 2) {
                this.mothN = 0;
            }
            this.mothSprite.spriteFrame = this.zxhSp[this.mothN];
        }
    },

    setMothEnd() {
        this.mothSprite.spriteFrame = this.zxhSp[this.mothResult];
    },

    setWheelEnd(wheelId) {
        let wheelList = wheelId == 1 ? this.wheelCardList1 : this.wheelCardList2;
        let wt = this.wTarget[wheelId == 1 ? 0 : 1];
        wheelList[wt].y = 0;
        let position = [
            [0, -85, -170, -255],
            [-255, 0, -85, -170],
            [-170, -255, 0, -85],
            [-85, -170, -255, 0]
        ];
        for (let i in wheelList) {
            wheelList[i].y = position[wt][i];
        }
    },

    update(dt) {
        if (this.betTimeBool) {
            let t = parseInt(new Date().getTime() / 1000 - this.network.timer);
            this.timerLbl.string = 40 - t > 0 ? 40 - t : 0;
        }

        if (this.runGameBool) {
            //main lottery draw
            if (this.curPoint < this.accPoints + this.beginPoint) {
                //accerate
                this.accTime += dt;
                let cp = parseInt(this.curPoint);
                this.curPoint = this.beginPoint + 0.5 * this.accelerateRate * this.accTime * this.accTime;
                if (cp != parseInt(this.curPoint)) {
                    this.audio.playWheel();
                }
            } else {
                //slow down
                if (this.curPoint < this.targetPoints + this.beginPoint) {
                    this.decTime += dt;
                    let cp = parseInt(this.curPoint);
                    this.curPoint = this.beginPoint + this.targetPoints / 2 + this.speedMax * this.decTime - 0.5 * this.accelerateRate * this.decTime * this.decTime;
                    if (this.speedMax < this.accelerateRate * this.decTime) {
                        //stop lottery draw
                        this.lastPoint = this.curPoint = this.targetPoints + this.beginPoint;
                        this.runGameBool = false;
                    }
                    if (cp != parseInt(this.curPoint)) {
                        this.audio.playWheel();
                    }
                } else {
                    //stop lottery draw
                    this.lastPoint = this.curPoint = this.targetPoints + this.beginPoint;
                    this.runGameBool = false;
                }
            }
            //show lottert draw
            for (let i in this.cartoonBright) {
                this.cartoonBright[i].active = false;
            }
            this.brightAnim(this.lastPoint, this.curPoint);
            this.lastPoint = this.curPoint;

            //wheel lotterty draw
            if (this.runGameBool) {
                this.rollWheel(1);
                this.rollWheel(2);
                this.mothWheel();
            } else {
                this.setWheelEnd(1);
                this.setWheelEnd(2);
                this.setMothEnd();
                this.curWheel = [...this.wTarget];
            }
        }
    },

    //初始化显示
    showInfo() {
        this.userNameLbl.string = this.network.userName;
        this.userIDLbl.string = this.network.userId;
        this.userCoinLbl.string = this.network.userCoin.toFixed(2);
        Helper.loadHead(this.network.headUrl, sp => {
            this.userHead.spriteFrame = sp;
        });
    },

    /**
     * change background map
     */
    changeMap() {
        let randomNum = Math.floor(Math.random() * 3);
        this.audio.playBgm(randomNum);
        for (let i in this.bgMapList) {
            if (randomNum == i) {
                this.bgMapList[i].active = true;
            } else {
                this.bgMapList[i].active = false;
            }
        }
    },

    showResultWheel(result) {
        this.resultWheel.active = true;
        this.audio.playRoleAudio(result);
        for (let i = 1; i <= 4; i++) {
            this.resultWheel.getChildByName('lbl' + i).getComponent(cc.Label).string = ODDSLIST[result];
        }
        this.resultWheel.getChildByName('roleSp').getComponent(cc.Sprite).spriteFrame = this.cartoonSp[result];
        this.resultWheel.getChildByName('bg1').active = ROLECOLORLSIT[result] == 1;
        this.resultWheel.getChildByName('bg2').active = ROLECOLORLSIT[result] == 2;
        this.resultWheel.getChildByName('bg3').active = ROLECOLORLSIT[result] == 3;
        this.scheduleOnce(() => {
            this.resultWheel.active = false;
        }, 5);
    },

    getResult(res) {
        this.mothResult = res.win_special_num;
        this.lottertDraw(res.win_num[0], this.lastGamePoint, res.pk_num[0], res.pk_num[1]);
        let is_boo = res.win_num[0] == 0 || res.win_num[0] == 13;
        if (res.pk_num[0] != res.pk_num[1]) {
            this.scheduleOnce(() => {
                this.scoreLbl.string = (res.win / 100).toFixed(2);
                this.userCoinLbl.string = (res.score / 100).toFixed(2);
                let r = (res.win_num[0] == 0 || res.win_num[0] == 13) ? res.win_num[1] : res.win_num[0];
                this.showResultWheel(r);
            }, 6);
        } else {
            //pk start
            let tm = 0;
            this.schedule(() => {
                tm++;
                if (tm == 6) {
                    !!this.cartoonAnims[res.win_num[0]] && (this.cartoonAnims[res.win_num[0]].active = true);
                    this.pkNode.active = true;
                    let pklist = this.pkNode.children;
                    this.pkNode.getComponent(cc.Animation).play();
                    if (res.who_win) {
                        pklist[0].runAction(cc.sequence(cc.delayTime(2), cc.moveTo(1, cc.v2(-1197, pklist[0].y))));
                    } else {
                        pklist[1].runAction(cc.sequence(cc.delayTime(2), cc.moveTo(1, cc.v2(1349, pklist[1].y))));
                    }
                    pklist[0].getComponent(cc.Sprite).spriteFrame = this.PKAtlas.getSpriteFrame(`VS-${res.pk_num[0] +1}`);
                    pklist[1].getComponent(cc.Sprite).spriteFrame = this.PKAtlas.getSpriteFrame(is_boo ? 'VS-5' : 'VS-0');
                } else if (tm == 10) {
                    this.pkNode.active = false;
                    if (res.who_win) {
                        this.audio.playSpecial();
                        for (let i in this.cartoonBright) {
                            if (res.win_num[0] != i) {
                                this.cartoonBright[i].active = true;
                                this.cartoonBright[i].runAction(cc.sequence(cc.fadeOut(0.1), cc.fadeIn(0.1), cc.fadeOut(0.1), cc.fadeIn(0.1), cc.callFunc(() => {
                                    if (new Set(res.win_num).has(parseInt(i))) {
                                        this.cartoonBright[i].active = true;
                                        if (!!this.cartoonAnims[i]) {
                                            this.cartoonAnims[i].active = true;
                                        }
                                    } else {
                                        this.cartoonBright[i].active = false;
                                    }
                                })))
                            }
                        }
                    }
                } else if (tm == 12) {
                    this.scoreLbl.string = (res.win / 100).toFixed(2);
                    this.userCoinLbl.string = (res.score / 100).toFixed(2);
                    let r = (res.win_num[0] == 0 || res.win_num[0] == 13) ? res.win_num[1] : res.win_num[0];
                    this.showResultWheel(r);
                }
            }, 1, 15, 1);
        }
    },
})