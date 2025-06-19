let score = 0;
let energy = 500;
let fullEnergy = 500;
let tapPower = 10;
let percentEnergy;
let refullEnSpeed = 1;

let scoreHTML = document.getElementById( "taps");
let energyHTML = document.getElementById( "energyText");
let clickHTML = document.getElementById( "buttonPlay");
let energyFillHTML = document.getElementById("energyFill")

if(localStorage.getItem("score")){
  score = Number(localStorage.getItem("score"))
}
else{
  score = 0;
}
scoreHTML.innerText = score;

clickHTML.addEventListener("touchstart", clicker);

function clicker(event){
  if(energy >= tapPower){
    score += tapPower;
    scoreHTML.innerText = score;
    energy -= tapPower;
    energyHTML.innerText = energy;
    percentEnergy = (energy / fullEnergy) * 100;
    energyFillHTML.style.width = percentEnergy + "%";
    localStorage.setItem("score", score);
  }
}
function refullEnergy(){
  if(energy < fullEnergy){
    energy += refullEnSpeed;
    energyHTML.innerText = energy;
    percentEnergy = (energy / fullEnergy) * 100;
    energyFillHTML.style.width = percentEnergy + "%";
  }

}

setInterval(refullEnergy, 1000);