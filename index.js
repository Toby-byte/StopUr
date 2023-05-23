// vælger buttons med bestemt id og gemmer dem i variabler
const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

// deklarering af variabler til brug senere
let startTime = 0;
let elaspsedTime = 0;
let currentTime = 0;
let stopped = true;
let intervalid;
let timer = 0;
let min = 0;
let sek = 0;

startBtn.addEventListener("click", () => {
    if(stopped){
        stopped = false;
        // Date.now() giver tid i milisekunder
        startTime = Date.now() - elaspsedTime;
        // update time bliver kaldt hvert 75 milisekund
        intervalid = setInterval(updateTime, 75);
    }
});
stopBtn.addEventListener("click", () => {
    if(!stopped){
        stopped = true;
        elaspsedTime = Date.now() - startTime;
        clearInterval(intervalid);
    }
});
resetBtn.addEventListener("click", () => {
    stopped = true;
    clearInterval(intervalid);
    startTime = 0;
    elaspsedTime = 0;
    currentTime = 0;
    timer = 0;
    min = 0;
    sek = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime(){
    elaspsedTime = Date.now() - startTime;

    sek = Math.floor((elaspsedTime / 1000) % 60);
    min = Math.floor((elaspsedTime / (1000 * 60)) % 60);
    timer = Math.floor((elaspsedTime / (1000 * 60 * 60)) % 60);

    // gøres brug af padding funktion
    sek = pad(sek);
    min = pad(min);
    timer = pad(timer);

    // textContent ændre på indhold i timeDisplay div
    timeDisplay.textContent = `${timer}:${min}:${sek}`;

    // dette tilføjer padding 
    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}