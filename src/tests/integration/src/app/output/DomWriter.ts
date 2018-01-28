const renderTimestamp = (ts:number):string => {
    const padLeft = n => v => String(Array(n).fill("0") + v.toString()).slice(-n);
  
    const format2 = padLeft(2);
    const format3 = padLeft(3);
    const output = document.getElementById("output");
  
    const now = new Date(ts);
  
    const hr = format2(now.getHours());
    const min = format2(now.getMinutes());
    const sec = format2(now.getSeconds());
    const ms = format3(now.getMilliseconds());
  
    return `${hr}:${min}:${sec}:${ms}`;
}

export const makeDomWriter = (appElement) => {
    const appContainer = document.createElement("div");
    appElement.appendChild(appContainer);
    
    const appLabel = document.createElement("h1");
    appLabel.setAttribute("style", "text-align: center; width: 100%");
    appLabel.innerText = "Sodium Example Clock";
    appContainer.appendChild(appLabel);

    const tsText = document.createTextNode("");
    const tsContainer = document.createElement("h1");
    tsContainer.setAttribute("style", "text-align: center; width: 100%");
    tsContainer.appendChild(tsText);
    appContainer.appendChild(tsContainer);

    
    return {
        update: (ts:number) => tsText.textContent = renderTimestamp(ts)
    }
}