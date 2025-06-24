let score = 0;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let fullEnergy = localStorage.getItem("capLVL")
	? (Number(localStorage.getItem("capLVL")) + 5) * 100
	: 500;
let tapPower = 1;
let percentEnergy;
let refullEnSpeed = 1000;
let touchLVL = localStorage.getItem("tapLVL")
	? Number(localStorage.getItem("tapLVL"))
	: 1;
//let touchPrice = 100;
let capLVL = localStorage.getItem("capLVL")
	? Number(localStorage.getItem("capLVL"))
	: 0;
let speedLVL = localStorage.getItem("speedEnLVL")
	? Number(localStorage.getItem("speedEnLVL"))
	: 0;
let tickets = 1;

let reloads = localStorage.getItem("reloadss")
	? Number(localStorage.getItem("reloadss"))
	: 0;

let clickerLVL = localStorage.getItem("clickerLVL")
	? Number(localStorage.getItem("clickerLVL"))
	: 0;
localStorage.setItem("tapLVL", touchLVL);
localStorage.setItem("capLVL", capLVL);
localStorage.setItem("speedEnLVL", speedLVL);
let scoreHTML = document.getElementById("taps");
let energyHTML = document.getElementById("energyText");
let clickHTML = document.getElementById("buttonPlay");
let energyFillHTML = document.getElementById("energyFill");

let touchUpgHTML = document.getElementById("touchPower");
let touchLVL_HTML = document.getElementById("touchLVL");
let priceTouchHTML = document.getElementById("price1");

let capUpgHTML = document.getElementById("energyRefull");
let capLvlHTML = document.getElementById("refullLVL");
let capPriceHTML = document.getElementById("priceRefull");

let speedUpgHTML = document.getElementById("energySpeed");
let speedLvlHTML = document.getElementById("speedLVL");
let speedPriceHTML = document.getElementById("priceRefSpeed");

let reloadUpgHTML = document.getElementById("reload");
let reloadLvlHTML = document.getElementById("reloads");
let reloadPriceHTML = document.getElementById("reloadPrice");

let clickerUpgHTML = document.getElementById("autoClicker");
let clickerLvlHTML = document.getElementById("clickerLVL");
let clickerPriceHTML = document.getElementById("clickerPrice");

let today = new Date().getTime();
energy +=
	Math.round((today - localStorage.getItem("lastPlayed")) / 1000) * speedLVL;
score +=
	Math.round((today - localStorage.getItem("lastPlayed")) / 1000) * clickerLVL;
dataScreen();
if (energy > fullEnergy) {
	energy = fullEnergy;
}

if (localStorage.getItem("score")) {
	score = Number(localStorage.getItem("score"));
} else {
	score = 0;
}
function dataScreen() {
	touchLVL_HTML;
	scoreHTML.innerText = score;
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	UpdateLvlHtmls(
		touchLVL_HTML,
		priceTouchHTML,
		localStorage.getItem("tapLVL"),
		touchUpgHTML
	);
	UpdateLvlHtmls(
		capLvlHTML,
		capPriceHTML,
		localStorage.getItem("capLVL"),
		capUpgHTML
	);
	UpdateLvlHtmls(
		speedLvlHTML,
		speedPriceHTML,
		localStorage.getItem("speedEnLVL"),
		speedUpgHTML
	);
	UpdateLvlHtmls(
		reloadLvlHTML,
		reloadPriceHTML,
		localStorage.getItem("reloadss"),
		reloadUpgHTML
	);
	UpdateLvlHtmls(
		clickerLvlHTML,
		clickerPriceHTML,
		localStorage.getItem("clickerLVL"),
		clickerUpgHTML
	);
}

if (clickHTML) {
	clickHTML.addEventListener("touchstart", clicker);
}

if (touchUpgHTML) {
	touchUpgHTML.addEventListener("touchstart", touchUpgrade);
}
if (capUpgHTML) {
	capUpgHTML.addEventListener("touchstart", capUpgrade);
}
if (speedUpgHTML) {
	speedUpgHTML.addEventListener("touchstart", speedUpgrade);
}
if (reloadUpgHTML) {
	reloadUpgHTML.addEventListener("touchstart", reloading);
}
if (clickerUpgHTML) {
	clickerUpgHTML.addEventListener("touchstart", clickerUpgrade);
}
function touchUpgrade() {
	touchLVL = UpgradeLVL(touchLVL_HTML, priceTouchHTML, touchLVL);
	localStorage.setItem("tapLVL", touchLVL);
}
function capUpgrade() {
	capLVL = UpgradeLVL(capLvlHTML, capPriceHTML, capLVL);
	console.log(capLVL + " _90");
	localStorage.setItem("capLVL", capLVL);
}
function speedUpgrade() {
	speedLVL = UpgradeLVL(speedLvlHTML, speedPriceHTML, speedLVL);
	localStorage.setItem("speedEnLVL", speedLVL);
}
function reloading() {
	if (reloads != UpgradeLVL(reloadLvlHTML, reloadPriceHTML, reloads)) {
		energy = fullEnergy;
	}
	reloads = UpgradeLVL(reloadLvlHTML, reloadPriceHTML, reloads);
	localStorage.setItem("reloadss", reloads);
}
function clickerUpgrade() {
	clickerLVL = UpgradeLVL(clickerLvlHTML, clickerPriceHTML, clickerLVL);
	localStorage.setItem("clickerLVL", clickerLVL);
}
/*function touchUpgrade() {
	if (score >= touchPrice) {
		score -= touchPrice;
		touchLVL++;
		touchPrice = (touchLVL + 1) * (touchLVL + 2) * 100;
		touchLVL_HTML.innerText = touchLVL;
		priceTouchHTML.innerText = touchPrice;
		saveData();
		localStorage.setItem("tapLVL", touchLVL);
	}
}*/
function UpgradeLVL(LVL_HTML, priceHTML, LVL) {
	let Price;
	Price = Math.pow(2, LVL) * 10;
	if (score >= Price) {
		score -= Price;
		LVL++;
		Price = Math.pow(2, LVL) * 10;
	}
	LVL_HTML.innerText = LVL;
	priceHTML.innerText = Price;
	console.log(Price + " ab");
	return LVL;
}
function UpdateLvlHtmls(LVL_HTML, priceHTML, LVL, necessaryObject) {
	if (necessaryObject) {
		Price = Math.pow(2, LVL) * 10;
		LVL_HTML.innerText = LVL;
		priceHTML.innerText = Price;
	}
}
function saveData() {
	localStorage.setItem("score", score);
	localStorage.setItem("energy", energy);
	localStorage.setItem("tapLVL", touchLVL);
	localStorage.setItem("capLVL", capLVL);
	localStorage.setItem("speedEnLVL", speedLVL);
	localStorage.setItem("reloadss", reloads);
	localStorage.setItem("clickerLVL", clickerLVL);
}
function clicker(event) {
	tapPower = Number(localStorage.getItem("tapLVL")) + 1;
	//tapPower = Number(localStorage.getItem("tapPwr"));
	if (energy >= tapPower) {
		score += tapPower;
		scoreHTML.innerText = score;
		energy -= tapPower;
		energyHTML.innerText = energy;
		percentEnergy = (energy / fullEnergy) * 100;
		energyFillHTML.style.width = percentEnergy + "%";
	}
	saveData();
}
function refullEnergy() {
	if (energy < fullEnergy) {
		energy += speedLVL;
	}
	if (energy > fullEnergy) {
		energy = fullEnergy;
	}
	score += clickerLVL;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	saveData();
	dataScreen();
}

setInterval(refullEnergy, 1000);
function Update() {
	dataScreen();
	saveData();
	console.log(tapPower);
	localStorage.setItem("lastPlayed", new Date().getTime());
	//touchLVL = 0;
	//score = 0;
}
setInterval(Update, 100);
