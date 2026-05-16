// An object which can be used to make passive income generators
class miningRig {

    constructor(name, amount, cost, production, multiplierCost, costScaling, multiplier, multiplierScaling) {
        this.name = name;
        this.amount = amount;
        this.cost = cost;
        this.production = production;
        this.multiplierCost = multiplierCost;
        this.costScaling = costScaling;
        this.multiplier = multiplier;
        this.multiplierScaling = multiplierScaling
    }

    // actually handles the buying. It checks if you have enough to buy, takes the money
    //  by giving addScoreAmount a negative number, increases score by the scaling amount,
    // then add a rig to the total amount.
    buy() {
        if (score >= this.cost) {
            addScoreAmount(-this.cost);
            this.cost = Math.round(this.cost * this.costScaling);
            this.amount++;
            return true;
        } else {
            return false;
        }
    }

    upgradeBuy(){
        if (score >= this.multiplierCost ) {
            addScoreAmount(-this.multiplierCost);
            this.multiplierCost = Math.round(this.multiplierCost * this.multiplierScaling);
            this.multiplier = this.multiplier + 1
            this.multiplierScaling = this.multiplierScaling * this.costScaling
            return true;
        } else {
            return false;
        }
    }

    getname(){
        return this.name
    }

    getAmount() {
        return niceNums(this.amount);
    }


    getcost(){
       return niceNums(this.cost)
    }

    getMultiplierCost(){
        return niceNums(this.multiplierCost)
    }


    // this adds to your score based on how many rigs you have and if they have multipliers
    rig_score_income() {
        addScoreAmount(Math.round(this.amount * this.production * this.multiplier));
    }
}

// Main application starts here

let score = 0;

let clickValue = 1;
let upgradeUnlocked = false;
let upgradePurchased = false;

// This is where the passive income generators are defined. Feel free to change their properties.
let mk1 = new miningRig("mk1",0,15,1,1100,1.2,1,15);
let mk2 = new miningRig("mk2",0,100,3,12000,1.2,1,15);
let mk3 = new miningRig("mk3",0,1100,8,130000,1.2,1,15);
let mk4 = new miningRig("mk4",0,12000,47,1400000,1.2,1,15);
let mk5 = new miningRig("mk5",0,130000,260,20000000,1.2,1,15);
let mk6 = new miningRig("mk6",0,1400000,1400,220000000,1.2,1,15);
let mk7 = new miningRig("mk7",0,20000000,7800,5000000000,1.1,1,14);
let mk8 = new miningRig("mk8",0,220000000,44000,75000000000,1.1,1,14);
let mk9 = new miningRig("mk9",0,5000000000,260000,1000000000000,1.1,1,14);
let mk10 = new miningRig("mk10",0,75000000000, 1600000 ,14000000000000,1.1,1,12);
let mk11 = new miningRig("mk11",0,1000000000000,10000000,120000000000000,1.1,1,12);
let mk12 = new miningRig("mk12",0,14000000000000,65000000,1700000000000000,1.1,1,1);

// List to make getting individual mk's easier
const rigList = {
    mk1, mk2, mk3, mk4, mk5, mk6, mk7, mk8, mk9, mk10, mk11, mk12
}

function exitGame() {
    window.location.href = "/exit?newScore=" + Number(score);
}

function addScore() {
    score += clickValue;
    console.log(score);
    let scoreDisplay = document.getElementById("score");
    //element.innerHTML = element.innerHTML.replace("score", score);
    scoreDisplay.textContent = niceNums(score);
    //document.getElementById.replace("0", score);

    if (score >= 50000000 && !upgradeUnlocked) {
        document.getElementById("secretUpgrade").style.display = "block";
        upgradeUnlocked = true;
    }
}


//increases score by given amount
function addScoreAmount(amount) {
    score += amount;
    console.log(score);
    document.getElementById("score").textContent = niceNums(score);
}


// right shop
// item resolver gets key from button, listens for actions and resolves them based on the key.
document.querySelectorAll(".items button").forEach(item => {
    const key = item.dataset.item;

    item.addEventListener("mouseover", () => swap(key));
    item.addEventListener("click", () => buy(key));
});


// buys rig based on key from item resolver above. Handles the click case. This actually figures out which rig
// is being talked about. buy with a parameter finds the rig then calls rig.buy() to actually do the buying.
function buy(key){
    const rig = rigList[key];
    if(rig.buy()){
        window.setInterval(() => rig.rig_score_income(), 1000);
        updateInventory();
    }
    swap(key);
}

// Displays the item the curser is on.
function swap(key) {
    const rig = rigList[key];
    document.querySelector(".price").textContent =
       (rig.getname() + " : $" + rig.getcost() + " : #" + rig.getAmount());
}

function updateInventory() {
    let inventoryText = "";
    Object.values(rigList).forEach(rig => {
        if (rig.amount > 0) {
            inventoryText +=
                rig.getname() + "\u00A0x" + rig.getAmount() + ", ";
        }
    });

    if (inventoryText === "") {
        inventoryText = "No rigs purchased yet.";
    }
    document.getElementById("inventoryList").textContent =
        inventoryText;
}

function buyClickUpgrade() {
    if (score >= 25000000 && !upgradePurchased) {
        addScoreAmount(-25000000);
        clickValue = 500000;
        document.getElementById("clickValueDisplay").textContent =
            "Click Value: " + niceNums(clickValue);
        upgradePurchased = true;
        document.getElementById("secretUpgrade").innerHTML =
            "Click Upgrade Purchased!";
    }
}


// left shop
// left item resolver gets keys from buttons, listens for action and calls
// appropriate functions
document.querySelectorAll(".leftItems button").forEach(item => {
    const key = item.dataset.item;

    item.addEventListener("mouseover", () => upgradeSwap(key));
    item.addEventListener("click", () => upgradeBuy(key));
});

function upgradeBuy(key){
    const rig = rigList[key];
    if(rig.upgradeBuy()){
    }
    document.querySelectorAll(".leftItems button").forEach(item => {
        const key = item.dataset.item;
        const rig = rigList[key];

        item.textContent =
            rig.getname() + " overclock x" + (rig.multiplier - 1);
    });
    upgradeSwap(key);
}

function upgradeSwap(key){
    const rig = rigList[key];
    document.querySelector(".leftPrice").textContent =
        (rig.getname() + ": $" + rig.getMultiplierCost()
            + " | Owned: " + (rig.multiplier - 1));
}



// Takes a number and returns a string with better formatting.
function niceNums(num){
    if (num >= 1000000000000000000) {return ((num / 1000000000000000).toFixed(1) + " Get A Life")}
    if (num >= 1000000000000000) {return ((num / 1000000000000000).toFixed(1) + " Quadrillion")}
    if (num >= 1000000000000) {return ((num / 1000000000000).toFixed(1) + " Trillion")}
    if (num >= 1000000000) {return ((num / 1000000000).toFixed(1) + " Billion")}
    if (num >= 100000000) {return ((num / 1000000).toFixed(1) + " Million")}
    else {return num.toLocaleString("en-US")}
}

// name updater. changes the hard coded mk1 ects to the name
// of the object so editing that one field updates the whole site.

    // handles the right shop
    document.querySelectorAll(".items button").forEach(item => {
        const key = item.dataset.item;
        const rig = rigList[key];
        item.textContent = rig.getname();
    });

    // handles the left shop
    document.querySelectorAll(".leftItems button").forEach(item => {
        const key = item.dataset.item;
        const rig = rigList[key];
        item.textContent =
            rig.getname() + " overclock x" + (rig.multiplier - 1);
    });