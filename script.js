//параметр ускорения возрастания цены
let a = 1.11;

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

let dataUpg = {
	1: {
		priceID: "price1",
		lvlID: "touchLVL",
		img: "icons8-курсор-рука-64.png",
		tittle: "increase click count",
		priceK: 70,
		LSName: "tapLVL",
		//var: localStorage.getItem("tapLVL") ? Number(localStorage.getItem("tapLVL")) : 0,
	},
	2: {
		priceID: "priceRefull",
		lvlID: "refullLVL",
		img: "capacity_upgrade.png",
		tittle: "increase energy capacity",
		priceK: 70,
		LSName: "capLVL",
		//var: localStorage.getItem("capLVL") ? Number(localStorage.getItem("capLVL")) : 0,
	},
	3: {
		priceID: "priceRefSpeed",
		lvlID: "speedLVL",
		img: "energy_32.png",
		tittle: "increase energy reg. speed",
		priceK: 70,
		LSName: "speedEnLVL",
		//var: localStorage.getItem("speedEnLVL") ? Number(localStorage.getItem("speedEnLVL")) : 0,
	},
	4: {
		priceID: "reloadPrice",
		lvlID: "reloads",
		img: "energyDrink_32.png",
		tittle: "instantly reload energy box",
		priceK: 70,
		LSName: "reloadss",
		//var: localStorage.getItem("reloadss") ? Number(localStorage.getItem("reloadss")) : 0,
	},
	5: {
		priceID: "clickerPrice",
		lvlID: "clickerLVL",
		img: "icons8-курсор-рука-64.png",
		tittle: "make on click per second",
		priceK: 70,
		LSName: "clickerLVL",
		//var: localStorage.getItem("clickerLVL") ? Number(localStorage.getItem("clickerLVL")) : 0,
	},
	Length: 5,
};

function setHTML() {
	const upgrades = document.querySelectorAll(".upgrade");
	upgrades.forEach(upgrade => {
		const id = upgrade.getAttribute("data-id");
		const data = dataUpg[id];
		upgrade.innerHTML = `
				<img src="img/${data.img}"/>
				<div>
					<p>${data.tittle}</p>
					<p>
						lvl. <span id="${data.lvlID}">0</span>
					</p>
				</div>
				<div>
					<span class="price" id="${data.priceID}">
						100
					</span>
					<p>clicks</p>
				</div>`;
		/*upgrade.addEventListener("touchstart", event => {
			let butID = Number(upgrade.getAttribute("data-id"));
			let data = dataUpg[butID];
			let Price;
			let LVL = Number(localStorage.getItem(data.LSName));
			Price = Math.floor(Math.pow(a, LVL) * data.priceK);
			console.log("f");
			if (score >= Price) {
				score -= Price;
				LVL++;
				Price = Math.floor(Math.pow(a, LVL) * data.priceK);
				//условие для перезарядки энергии
				if (butID == 4) {
					energy = fullEnergy;
				}
			}
			localStorage.setItem(data.LSName, LVL);
			document.getElementById(data.lvlID).innerText = LVL;
			document.getElementById(data.priceID).innerText = Price;
		});*/
	});
}
setHTML();

let scoreHTML = document.getElementById("taps");
let energyHTML = document.getElementById("energyText");
let clickHTML = document.getElementById("buttonPlay");
let energyFillHTML = document.getElementById("energyFill");
let clicksPerSecHTML = document.getElementById("tapsInHour");

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
	scoreHTML.innerText = score;
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	if (document.getElementById(dataUpg[1].lvlID)) {
		for (let i = 1; i <= dataUpg.Length; i++) {
			document.getElementById(dataUpg[i].lvlID).innerText =
				localStorage.getItem(dataUpg[i].LSName);
			document.getElementById(dataUpg[i].priceID).innerText = Math.floor(
				Math.pow(a, localStorage.getItem(dataUpg[i].LSName)) * dataUpg[i].priceK
			);
		}
	}
}

//localStorage.setItem(`card${id}`, JSON.stringify(data));

if (clickHTML) {
	clickHTML.addEventListener("touchstart", clicker);
}
UpgradeLVL2();
function UpgradeLVL2() {
	const upgrades = document.querySelectorAll(".upgrade");
	upgrades.forEach(upgrade => {
		upgrade.addEventListener("touchstart", event => {
			let butID = Number(upgrade.getAttribute("data-id"));
			let data = dataUpg[butID];
			let Price;
			let LVL = Number(localStorage.getItem(data.LSName));
			Price = Math.floor(Math.pow(a, LVL) * data.priceK);
			if (score >= Price) {
				score -= Price;
				LVL++;
				Price = Math.floor(Math.pow(a, LVL) * data.priceK);
				//условие для перезарядки энергии
				if (butID == 4) {
					energy = fullEnergy;
				}
			}
			localStorage.setItem(data.LSName, LVL);
			document.getElementById(data.lvlID).innerText = LVL;
			document.getElementById(data.priceID).innerText = Price;
		});
	});
}

function saveData() {
	localStorage.setItem("score", score);
	localStorage.setItem("energy", energy);
}
function clicker(event) {
	tapPower = Number(localStorage.getItem("tapLVL")) + 1;
	if (energy >= tapPower) {
		score += tapPower;
		scoreHTML.innerText = score;
		energy -= tapPower;
		energyHTML.innerText = energy;
		percentEnergy = (energy / fullEnergy) * 100;
		energyFillHTML.style.width = percentEnergy + "%";

		const img = event.currentTarget.querySelector("#imgClick");
		img.style.transform = "scale(0.9)";
		setTimeout(() => {
			img.style.transform = "";
		}, 200);

		const plus = document.createElement("div");
		plus.className = "plusOne";
		plus.textContent = `+ ${tapPower}`;

		const panel = event.currentTarget;
		const rect = panel.getBoundingClientRect();
		plus.style.left = `${event.clientX - rect.left}px`;
		plus.style.top = `${event.clientY - rect.top}px`;
		//console.log(event.pageX + " __ " + event.pageY);

		panel.appendChild(plus);
		setTimeout(() => plus.remove(), 3000);
	}
	saveData();
}
function refullEnergy() {
	if (energy < fullEnergy) {
		energy += Number(localStorage.getItem(dataUpg[3].LSName));
	}
	if (energy > fullEnergy) {
		energy = fullEnergy;
	}
	score += Number(localStorage.getItem(dataUpg[5].LSName));
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	saveData();
	dataScreen();
	let lastScore;
	let scoreInHour;
	console.log(lastScore);
	/*if (lastScore) {
		scoreInHour = score - lastScore;
	} else {
		scoreInHour = 0;
		console.log("ab");
	}
	lastScore = score;
	clicksPerSecHTML.innerText = scoreInHour;*/
}

setInterval(refullEnergy, 1000);
function Update() {
	dataScreen();
	saveData();
	console.log(tapPower);
	clicksPerSecHTML.innerText = localStorage.getItem(dataUpg[5].LSName);
	//UpgradeLVL2();
	//score = 0;
}
setInterval(Update, 100);

window.addEventListener("beforeunload", () => {
	localStorage.setItem("lastVisit", Date.now());
});

window.addEventListener("load", () => {
	const timeOffline = Date.now() - parseInt(localStorage.getItem("lastVisit"));
	if (timeOffline && timeOffline >= 60000) {
		energy +=
			Math.floor(timeOffline / 1000) * localStorage.getItem(dataUpg[3].LSName);
		if (energy > fullEnergy) {
			energy = fullEnergy;
		}
		let offlineScore =
			Math.floor(timeOffline / 1000) * localStorage.getItem(dataUpg[5].LSName);
		score += offlineScore;
		let u = Math.round(timeOffline / 60000);
		alert(`вы заработали ${offlineScore} за ${u} минут`);
	}
});
