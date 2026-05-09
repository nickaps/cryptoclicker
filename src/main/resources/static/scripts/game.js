// An object which can be used to make passive income generators
class miningRig {

    constructor(name, amount, cost, production, multiplierCost, costScaling, multiplierScaling, multiplier) {
        this.name = name;
        this.amount = amount;
        this.cost = cost;
        this.production = production;
        this.multiplierCost = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.multiplier = multiplier;
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

    getname(){
        return this.name
    }

    getAmount() {
        return niceNums(this.amount);
    }


    getcost(){
       return niceNums(this.cost)
    }


    // this adds to your score based on how many rigs you have and if they have multipliers
    rig_score_income() {
        addScoreAmount(Math.round(this.amount * this.production * this.multiplier));
    }
}

// Main application starts here

let score = 0;

// This is where the passive income generators are defined. Feel free to change their properties.
let mk1 = new miningRig("mk1",0,15,1,1,1.2,1,1);
let mk2 = new miningRig("mk2",0,100,3,1,1.2,1,1);
let mk3 = new miningRig("mk3",0,1100,8,1,1.2,1,1);
let mk4 = new miningRig("mk4",0,12000,47,1,1.2,1,1);
let mk5 = new miningRig("mk5",0,130000,260,1,1.2,1,1);
let mk6 = new miningRig("mk6",0,1400000,1400,1,1.2,1, 1);
let mk7 = new miningRig("mk7",0,20000000,7800,1,1.1,1,1);
let mk8 = new miningRig("mk8",0,220000000,44000,1,1.1,1,1);
let mk9 = new miningRig("mk9",0,5000000000,260000,1,1.1,1,1);
let mk10 = new miningRig("mk10",0,75000000000, 1600000 ,1,1.1,1,1);
let mk11 = new miningRig("mk11",0,1000000000000,10000000,1,1.1,1,1);
let mk12 = new miningRig("mk12",0,14000000000000,65000000,1,1,1,1);

// List to make getting individual mk's easier
const rigList = {
    mk1, mk2, mk3, mk4, mk5, mk6, mk7, mk8, mk9, mk10, mk11, mk12
}

function exitGame() {
    window.location.href = "/exit?newScore=" + Number(score);
}

function addScore() {
    score += 1;
    console.log(score);
    let scoreDisplay = document.getElementById("score");
    //element.innerHTML = element.innerHTML.replace("score", score);
    scoreDisplay.textContent = score;
    //document.getElementById.replace("0", score);
}


//increases score by given amount
function addScoreAmount(amount) {
    score += amount;
    console.log(score);
    document.getElementById("score").textContent = score;
}


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

// Takes a number and returns a string with better formatting.
function niceNums(num){
    if (num >= 1000000000000000000) {return ((num / 1000000000000000).toFixed(1) + " Get A Life")}
    if (num >= 1000000000000000) {return ((num / 1000000000000000).toFixed(1) + " Quadrillion")}
    if (num >= 1000000000000) {return ((num / 1000000000000).toFixed(1) + " Trillion")}
    if (num >= 1000000000) {return ((num / 1000000000).toFixed(1) + " Billion")}
    if (num >= 1000000) {return ((num / 1000000).toFixed(1) + " Million")}
    else {return num.toLocaleString("en-US")}
}

