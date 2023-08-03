"use strict";
cc._RF.push(module, 'ae06fv3xrxJZZxN09d2HMRQ', 'betMove');
// Texture/yadaxiao/js/betMove.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bet: cc.Node
  },
  onLoad: function onLoad() {
    this.move();
    this.t = 0;
  },
  move: function move() {
    this.bet.x = this.bet.x + Math.random() * 200;

    this.callback = function () {
      if (this.bet.y < 200) {
        this.t += 0.1;
        this.bet.x += 5;
        this.bet.y = this.bet.y + 2 * this.t * this.t;

        if (this.bet.width > 50) {
          this.bet.width -= 5;
          this.bet.height -= 5;
        }
      } else {
        this.bet.destroy();
        this.unschedule(this.callback);
      }
    };

    this.schedule(this.callback, 0.02);
  }
});

cc._RF.pop();