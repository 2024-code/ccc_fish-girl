cc.Class({
    extends: cc.Component,

    properties: {
        unitNode: cc.Node,
        frameList: [cc.SpriteFrame],
        lineNode: cc.Node,
        moneyLbl: cc.Label,
        awardLbl: cc.Label,
        awardPoorLbl: cc.Label,
        betLbl: cc.Label,
        msgLayout: cc.Node,
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('TriangleNetwork');
        this.audio = this.node.getComponent('TriangleAudio');
        this.status = 0;
        this.bet = 0;
    },

    start() {
        this.betLbl.string = '0.00';
        this.awardLbl.string = '0.00';
        this.units = [];
        for (let i in this.unitNode.children) {
            let unit = this.unitNode.children[i];
            if (unit.name.indexOf('TriangleFrameBG') == -1) {
                this.units.push(unit);
                unit.originpos = unit.position;
            }
        }
        for (let i in this.units) {
            this.units[i].active = false;
        }

        this.unitNode.getChildByName("TriangleFrameBG01").zIndex = 40;
        this.unitNode.getChildByName("TriangleFrameBG02").zIndex = 20;

        this.hideLine();
        // this.showLine(0, 3);
    },

    onClick(ev, args) {
        if (args == 'close') {
            cc.director.loadScene("LobbyMain");
        } else if (args == 'up') {
            this.bet += 1;
            this.betLbl.string = this.bet.toFixed(2);
        } else if (args == 'down') {
            this.bet -= 1;
            this.bet = this.bet >= 0 ? this.bet : 0;
            this.betLbl.string = this.bet.toFixed(2);
        } else if (args == 'bet') {
            this.betFunc();
        }
    },

    betFunc() {
        if (this.status == 0 && this.bet > 0) {
            this.status = 1;
            this.audio.playBtnEf();
            this.msgLayout.removeAllChildren();
            this.net.socket.emit('lottery', this.bet * 100);
        }
    },

    showUnit(colorList) {
        let time_0 = 1;
        let time_1 = 0.1;
        this.scheduleOnce(() => {
            this.audio.playFlyInEf();
        }, 0.8);
        for (let i in this.units) {
            let sp = this.units[i].getComponent(cc.Sprite);
            sp.spriteFrame = this.frameList[colorList[i]];
            let time_2 = parseInt(i) * 0.08;
            let unit = this.units[i];
            unit.active = true;
            unit.zIndex = 30;
            unit.scale = 1;
            unit.stopAllActions();
            unit.position = cc.v2(unit.originpos.x + 1150, unit.originpos.y);
            unit.runAction(cc.sequence(cc.delayTime(time_2), cc.jumpBy(time_0, cc.v2(-1200, 0), 75, 1),
                cc.callFunc(() => {
                    this.zIndex = 30;
                }, unit), cc.moveBy(time_1, 50, 0)));

            unit.runAction(cc.sequence(cc.delayTime(time_2), cc.repeat(cc.sequence(cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1)), 3)));
        }
    },

    changeColor(id, color) {
        let sp = this.units[id].getComponent(cc.Sprite);
        this.units[id].runAction(
            cc.sequence(
                cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1),
                cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1),
                cc.callFunc(() => {
                    sp.spriteFrame = this.frameList[color];
                }),
                cc.scaleBy(0.2, 0.01, 1), cc.scaleBy(0.2, 100, 1)
            )
        )
    },

    showLine(id, color) {
        const nameList = ['GrayLineV', 'PurpleLineV', 'BlueLineV', 'CyanLineV', 'GreenLineV', 'YellowLineV', 'OrangeLineV', 'RedLineV'];
        let line = this.lineNode.getChildByName(id);
        let actNode = line.getChildByName(nameList[color]);
        actNode.active = true;
    },

    hideLine() {
        let linePr = this.lineNode.children;
        for (let i in linePr) {
            let pr = linePr[i].children;
            for (let j in pr) {
                pr[j].active = false;
            }
        }
    },

    wheelFunc(viewarray, data, index) {
        if (viewarray[index].client_win_color_dict.length == 0) {
            this.scheduleOnce(() => {
                this.status = 0;
            }, 1.5);
            this.awardLbl.string = (data.ResultData.winscore / 100).toFixed(2);
            this.moneyLbl.string = (data.ResultData.userscore / 100).toFixed(2);
            return;
        }
        this.scheduleOnce(() => {
            this.hideLine();
            let lines = viewarray[index].client_win_color_dict;
            for (let i in lines) {
                console.log(lines[i].s, lines[i].c);
                this.showLine(lines[i].s, lines[i].c);
            }

            for (let i in viewarray[index].win_score_list) {
                let data = viewarray[index].win_score_list[i];
                let node = new cc.Node();
                this.msgLayout.addChild(node);
                node.runAction(cc.sequence(cc.delayTime(1.5), cc.fadeOut(0.8), cc.callFunc(() => {
                    node.removeFromParent();
                })));
                let colorList = [
                    new cc.Color(125, 127, 127, 255), new cc.Color(89, 2, 171, 255), new cc.Color(13, 169, 198, 255), new cc.Color(195, 2, 194, 255),
                    new cc.Color(67, 177, 0, 255), new cc.Color(215, 215, 0, 255), new cc.Color(187, 105, 0, 255), new cc.Color(229, 3, 3, 25)
                ];
                let lbl = node.addComponent(cc.Label);
                lbl.string = '+' + (data.s / 100).toFixed(2);
                // node.color = 
                let outLine = node.addComponent(cc.LabelOutline);
                outLine.color = colorList[data.c];
                outLine.width = 5;
            }
        }, 2.5);

        this.scheduleOnce(() => {
            this.hideLine();
            this.audio.playDelEf();
            let changeList = viewarray[index].win_index;
            let newList = viewarray[index + 1].res;
            for (let i in changeList) {
                this.changeColor(changeList[i], newList[changeList[i]]);
            }
            this.wheelFunc(viewarray, data, index + 1);
        }, 3);
    }
});