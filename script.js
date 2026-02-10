let alarms = JSON.parse(localStorage.getItem("alarms")) || [];
let alarmsContinear = document.getElementById("alarmsContinear");
let clock = document.getElementById("clock");
let day = document.getElementById("day");
let date = document.getElementById("date");
let days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
function display() {
    if (alarms == "") {
        alarmsContinear.innerHTML = `<div style="margin-top: 34vh;font-size: 23px;">أنت لا تملك أي منبه</div>`;
    } else {
        alarmsContinear.innerHTML = "";
        for(let i = 0; i < alarms.length; i++) {
            let parts = alarms[i].time.split(":");
            let mode = Number(parts[0]) >= 12 ? "م" : "ص";
            let hour = Number(parts[0]) % 12 || 12;
            let minutes = parts[1];
            let timeAlarm = `${hour.toString().padStart(2, "0")}:${minutes.padStart(2, "0")}`
            alarmsContinear.innerHTML += `
            <div class="alarmCard" id="card${i}">
                <div class="part1">
                    <div class="time">${timeAlarm}<span id="alarmModeText">${mode}</span></div>
                    <div class="description">${alarms[i].des}</div>
                </div>
                <div class="part2">
                    <input type="checkbox" id="checkbox${i}" onclick="onAndOffAlarm(${i})">
                    <label for="checkbox${i}" id="label${i}"><div class="circle" id="circle${i}"></div></label>
                    <div class="day">${alarms[i].day}</div>
                </div>
            </div>
            `;
        }
    }
    PegeLoaded();
}
function PegeLoaded() {
    for (let i = 0; i < alarms.length; i++) {
        let state = localStorage.getItem(`state${i}`) || 'true';
        let checkbox = document.getElementById(`checkbox` + i);
        let label = document.getElementById("label" + i);
        let circle = document.getElementById("circle" + i);
        let card = document.getElementById("card" + i);
        if (state === 'true') {
            checkbox.checked = true;
            circle.style.transform = "translateX(-30px) translateY(-1px)";
            label.style.background = "#3b3b3b";
            label.style.border = "1px solid #fff";
            circle.style.background = "#fff";
            card.style.background = "#444444";
        } else {
            checkbox.checked = false;
            circle.style.transform = "";
            label.style.background = "";
            label.style.border = "";
            circle.style.background = "";
            card.style.background = "";
        }
    }
}
function onAndOffAlarm(i) {
    let checkbox = document.getElementById("checkbox" + i);
    let label = document.getElementById("label" + i);
    let circle = document.getElementById("circle" + i);
    let card = document.getElementById("card" + i);
    if (checkbox.checked === true) {
        circle.style.transform = "translateX(-30px) translateY(-1px)";
        label.style.background = "#3b3b3b";
        label.style.border = "1px solid #fff";
        circle.style.background = "#fff";
        card.style.background = "#444444";
        localStorage.setItem(`state${i}`, checkbox.checked);
    } else {
        circle.style.transform = "";
        label.style.background = "";
        label.style.border = "";
        circle.style.background = "";
        card.style.background = "";
        localStorage.setItem(`state${i}`, checkbox.checked);
    }
}
if (alarmsContinear) {
    window.onload = function() {
        PegeLoaded();
    }
}
let modeText = document.getElementById("modeText");
function displayTheClock() {
    let now = new Date;
    let h = now.getHours() % 12 || 12;
    let m = now.getMinutes().toString().padStart(2, "0");
    let s = now.getSeconds().toString().padStart(2, "0");
    let mode = now.getHours() >= 12 ? "م" : "ص";
    clock.textContent = `${h.toString().padStart(2, "0")}:${m}:${s}`;
    modeText.textContent = mode;
    let today = now.getDay();
    day.textContent = days[today];
    let dateoftoday = now.getDate().toString().padStart(2, "0");
    let month = now.getMonth()  + 1;
    let year = now.getFullYear().toString().padStart(2, "0");
    date.textContent = `${dateoftoday} - ${month.toString().padStart(2, "0")} - ${year}`;
}
if (clock) {
    setInterval(displayTheClock);
}
let startBtn = document.getElementById("start");
let turnBtn = document.getElementById("turn");
let resetBtn = document.getElementById("reset");
let btns = document.getElementById("btns");
let dis = document.getElementById("display");
let stopWatchsContinear = document.getElementById("stopWatchsContinear");
let stopWatchsArray = [];
if (startBtn) {
    let h = 0;
    let m = 0;
    let s = 0;
    let ms = 0;
    let turn = false;
    let running = null;
    setInterval(() => {
        if (h == 0 && m == 0 && s == 0 & ms == 0) {
            resetBtn.style.display = "none";
        } else {
            resetBtn.style.display = "";
        }
    });
    startBtn.addEventListener("click", () => {
        if (turn == false) {
            startBtn.style.width = "90px";
            turnBtn.style.display = "block";
            startBtn.textContent = "| |";
            if (!running) {
                running = setInterval(() => {
                    ms++;
                    if (ms == 100) {
                        ms = 0;
                        s++;
                        if (s == 60) {
                            s = 0;
                            m++;
                            if (m == 60) {
                                m = 0;
                                h++;
                            }
                        }
                    }
                    dis.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
                }, 10);
            }
            turn = true;
        } else  {
            startBtn.style.width = "";
            turnBtn.style.display = "";
            startBtn.textContent = "▶";
            clearInterval(running);
            running = null;
            turn = false;
        }
    });
    resetBtn.addEventListener("click", () => {
        h = 0;
        m = 0;
        s = 0;
        ms = 0;
        stopWatchsArray = [];
        stopWatchsContinear.innerHTML = "";
        dis.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
    });
    turnBtn.addEventListener("click", () => {
        stopWatchsArray.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`);
        displayThestopWatchs();
    });
}
function displayThestopWatchs() {
    stopWatchsContinear.innerHTML = "";
    for (let i = 0; i < stopWatchsArray.length; i++) {
        stopWatchsContinear.innerHTML += `
        <div class="stopWatchsCard">
            <p>${stopWatchsArray[i]}</p>
        </div>
        `
    }
}
let addAlarm = document.getElementById("addAlarm");
let addAlarmBox = document.createElement("div");
addAlarmBox.className = "addAlarmBox";
let span = document.createElement("span");
span.className = "smallLine";
let textInput = document.createElement("input");
textInput.type = "text";
textInput.placeholder = "وصف المنبه"
let timeInput = document.createElement("input");
timeInput.type = "time";
let select = document.createElement("select");
let optionAllDays = document.createElement("option");
optionAllDays.textContent = "كل أيام الأسبوع";
optionAllDays.value = "كل أيام الأسبوع";
let option1 = document.createElement("option");
option1.textContent = "الأحد";
option1.value = "الأحد";
let option2 = document.createElement("option");
option2.textContent = "الاثنين";
option2.value = "الاثنين";
let option3 = document.createElement("option");
option3.textContent = "الثلاثاء";
option3.value = "الثلاثاء";
let option4 = document.createElement("option");
option4.textContent = "الأربعاء";
option4.value = "الأربعاء";
let option5 = document.createElement("option");
option5.textContent = "الخميس";
option5.value = "الخميس";
let option6 = document.createElement("option");
option6.textContent = "الجمعة";
option6.value = "الجمعة";
let option7 = document.createElement("option");
option7.textContent = "السبت";
option7.value = "السبت";
let btnContinear = document.createElement("div");
btnContinear.className = "btnContinear";
let btn = document.createElement("button");
btn.className = "ok";
btn.textContent = "تم";
btn.addEventListener("click", () =>{
    if (textInput.value.trim() != "" && timeInput.value.trim() != "") {
        alarms.push({
            des: textInput.value,
            time: timeInput.value,
            day: select.value
        });
        localStorage.setItem("alarms", JSON.stringify(alarms));
        addAlarmBox.style.animationName = "hide";
        textInput.value = "";
        timeInput.value = "";
        setTimeout(() => {
            addAlarmBox.style.animationName = "appear";
            addAlarmBox.remove();
        }, 500);
        display();
    }
});
if (addAlarm) {
    addAlarm.addEventListener("click", () => {
        document.body.appendChild(addAlarmBox);
        addAlarmBox.append(textInput, timeInput, select, span, btnContinear);
        select.append(optionAllDays, option1, option2, option3, option4, option5, option6, option7);
        btnContinear.append(btn)
    });
    addAlarm.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    addAlarmBox.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    document.documentElement.addEventListener("click", () => {
        addAlarmBox.style.animationName = "hide";
        textInput.value = "";
        timeInput.value = "";
        setTimeout(() => {
            addAlarmBox.style.animationName = "appear";
            addAlarmBox.remove();
        }, 500);
    });
}
function alarmTimeAndDayOver() {
    let now = new Date;
    let h = now.getHours().toString().padStart(2, "0");
    let m = now.getMinutes().toString().padStart(2, "0");
    let alarmTime = `${h}:${m}`;
    let alarmDay = now.getDay();
    for (let i = 0; i < alarms.length; i++) {
        let state = localStorage.getItem(`state${i}`) || 'true';
        if (alarms[i].time == alarmTime && state == 'true' && alarms[i].day == days[alarmDay] || alarms[i].time == alarmTime && state == 'true' && alarms[i].day == "كل أيام الأسبوع") {
            alert("hi");
            alarms.splice(i, 1);
            localStorage.setItem("alarms", JSON.stringify(alarms));
            display();
        }
    }
}
setInterval(alarmTimeAndDayOver, 1000);
if (alarmsContinear) {
    display();
}