const time = document.getElementById("time");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");
const battery = document.getElementById("battery");
const network = document.getElementById("network");
const modeBtn = document.getElementById("modeBtn");

function updateClock(){

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let ampm = h >=12 ? "PM":"AM";

    let displayHour = h%12;
    displayHour = displayHour ? displayHour :12;

    displayHour = String(displayHour).padStart(2,"0");
    m = String(m).padStart(2,"0");
    s = String(s).padStart(2,"0");

    time.innerHTML=`${displayHour}:${m}:${s} ${ampm}`;

    const options={
        weekday:'long',
        day:'numeric',
        month:'long',
        year:'numeric'
    };

    date.innerHTML=now.toLocaleDateString('en-US',options);

    if(h<12)
        greeting.innerHTML="🌅 Good Morning";
    else if(h<17)
        greeting.innerHTML="☀️ Good Afternoon";
    else
        greeting.innerHTML="🌙 Good Evening";

}

setInterval(updateClock,1000);
updateClock();

if('getBattery' in navigator){

navigator.getBattery().then(function(b){

function updateBattery(){

battery.innerHTML=Math.round(b.level*100)+"%";

}

updateBattery();

b.addEventListener("levelchange",updateBattery);

});

}else{

battery.innerHTML="Not Supported";

}

function updateNetwork(){

network.innerHTML=navigator.onLine ? "🟢 Online":"🔴 Offline";

}

updateNetwork();

window.addEventListener("online",updateNetwork);
window.addEventListener("offline",updateNetwork);

modeBtn.onclick=function(){

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
modeBtn.innerHTML="🌞 Light Mode";
}else{
modeBtn.innerHTML="🌙 Dark Mode";
}

}