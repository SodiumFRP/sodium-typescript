var cell = new Sodium.Cell(12);

Sodium.Transaction.run(() => {
    periodic(new Sodium.MillisecondsTimerSystem(), 1)
      .listen(outputTime);
  });
  
  function periodic(sys,period) {
    const oAlarm = new Sodium.CellLoop();
    const sAlarm = sys.at(oAlarm);
  
    oAlarm.loop(
        sAlarm
          .map(t => t + period)
          .hold(sys.time.sample() + period));
    return oAlarm;
  }
  
  function outputTime() {
    const padLeft = n => v => String(Array(n).fill("0") + v.toString()).slice(-n);
  
    const format2 = padLeft(2);
    const format3 = padLeft(3);
    const output = document.getElementById("output");
  
    const now = new Date();
  
    const hr = format2(now.getHours());
    const min = format2(now.getMinutes());
    const sec = format2(now.getSeconds());
    const ms = format3(now.getMilliseconds());
  
    document.getElementById("output").innerHTML = `${hr}:${min}:${sec}:${ms}`;
  }