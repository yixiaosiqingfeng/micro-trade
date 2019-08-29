var VCountdown = (function() {
  'use strict';

  var i = 0;
  var j = 0;
  var count = 0;
  var MM = 0;
  var SS = 60; // 秒 90s
  var MS = 0;
  var totle = (MM + 1) * 600;
  var d = 180 * (MM + 1);
  var MM = "0" + MM;
  var s, t1;
  var gameTime = 60;
  var cb, stopCb;

  function init(opt) {
    cb = opt.cb;
    stopCb = opt.stopCb;
    gameTime = opt.time;
    
    stop(stopCb);
    i = 0;
    j = 0;
    count = 0;
    MM = 0;
    SS = gameTime;
    MS = 0;
    totle = (MM + 1) * gameTime * 10;
    d = 180 * (MM + 1);
    MM = "0" + MM;
    showTime();
    s = setInterval(function() {
      showTime();
    }, 100);
    start();
    t1 = setInterval(function() {
      start();
    }, 100);
  }
  

  function showTime() {
    totle = totle - 1;
    if (totle == 0) {
      clearInterval(s);
      clearInterval(t1);
      document.getElementById("pie2").style.transform = "rotate(" + d + "deg)";
      cb && cb();
    } else {
      if (totle > 0 && MS > 0) {
        MS = MS - 1;
        if (MS < 10) {
          MS = "0" + MS
        };
      };
      if (MS == 0 && SS > 0) {
        MS = 10;
        SS = SS - 1;
        if (SS < 10) {
          SS = "0" + SS
        };
      };
      if (SS == 0 && MM > 0) {
        SS = 60;
        MM = MM - 1;
        if (MM < 10) {
          MM = "0" + MM
        };
      };
    };
    document.getElementById("time").innerHTML = SS + "s";
  }


  function start() {
    i = i + 360 / ((gameTime) * 10); //旋转的角度  90s 为 0.4  60s为0.6
    count = count + 1;
    if (count <= (gameTime / 2 * 10)) { // 一半的角度  90s 为 450
      document.getElementById("pie1").style.transform = "rotate(" + i + "deg)";
    } else {
      document.getElementById("pie2").style.backgroundColor = "#d13c36";
      document.getElementById("pie2").style.transform = "rotate(" + i + "deg)";

    }
  }


  function stop(stopCb) {
    clearInterval(s);
    clearInterval(t1);
    // document.getElementById("pie2").style.transform = "rotate(" + d + "deg)";
    stopCb && stopCb();
  }


  return {
    init: init,
    stop: stop,
  }

})();


export default VCountdown;