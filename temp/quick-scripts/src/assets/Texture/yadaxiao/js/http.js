"use strict";
cc._RF.push(module, '9a7cciil55HNrdi1OW7S7UJ', 'http');
// Texture/yadaxiao/js/http.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    timeText: cc.Label,
    typeText: cc.Label
  },
  statics: {
    //短连接
    createXMLHttpRequest: function createXMLHttpRequest(url, handler) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
          var response = xhr.responseText;
          console.log(xhr.responseText);
          var ret = eval("(" + response + ")");

          if (handler !== null) {
            handler(ret);
          }
        }
      };

      xhr.open("GET", url, true);
      xhr.send();
    }
  }
});

cc._RF.pop();