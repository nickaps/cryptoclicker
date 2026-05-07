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

    getAmount() {
        return this.amount;
    }


    getcost(){
       return niceNums(this.cost)
    }


    rig_score_income() {
        addScoreAmount(Math.round(this.amount * this.production * this.multiplier));
    }
}

// Main application starts here

let score = 0;
let mk1 = new miningRig("mk1",0,15,0.1,1,1.2,1,1);
let mk2 = new miningRig("mk2",0,100,1,1,1.2,1,1);
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


// buys rig based on name
function buy(rig) {
    switch (rig) {
        case 'mk1':
            if (mk1.buy()) {
                window.setInterval(() => mk1.rig_score_income(), 1000);
            }
            break;
        case 'mk2':
            if (mk2.buy()) {
                window.setInterval(() => mk2.rig_score_income(), 1000);
            }
            break;
        case 'mk3':
            if (mk3.buy()) {
                window.setInterval(() => mk3.rig_score_income(), 1000);
            }
            break;
        case 'mk4':
            if (mk4.buy()) {
                window.setInterval(() => mk4.rig_score_income(), 1000);
            }
            break;
        case 'mk5':
            if (mk5.buy()) {
                window.setInterval(() => mk5.rig_score_income(), 1000);
            }
            break;
        case 'mk6':
            if (mk6.buy()) {
                window.setInterval(() => mk6.rig_score_income(), 1000);
            }
            break;
        case 'mk7':
            if (mk7.buy()) {
                window.setInterval(() => mk7.rig_score_income(), 1000);
            }
            break;
        case 'mk8':
            if (mk8.buy()) {
                window.setInterval(() => mk8.rig_score_income(), 1000);
            }
            break;
        case 'mk9':
            if (mk9.buy()) {
                window.setInterval(() => mk9.rig_score_income(), 1000);
            }
            break;
        case 'mk10':
            if (mk10.buy()) {
                window.setInterval(() => mk10.rig_score_income(), 1000);
            }
            break;
        case 'mk11':
            if (mk11.buy()) {
                window.setInterval(() => mk11.rig_score_income(), 1000);
            }
            break;
        case 'mk12':
            if (mk12.buy()) {
                window.setInterval(() => mk12.rig_score_income(), 1000);
            }
            break;
    }
}


function rigcost(rig){
        switch (rig) {
            case 'mk1':
                return mk1.getcost()
            case 'mk2':
                return mk2.getcost()
            case 'mk3':
                return mk3.getcost()
            case 'mk4':
                return mk4.getcost()
            case 'mk5':
                return mk5.getcost()
            case 'mk6':
                return mk6.getcost()
            case 'mk7':
                return mk7.getcost()
            case 'mk8':
                return mk8.getcost()
            case 'mk9':
                return mk9.getcost()
            case 'mk10':
                return mk10.getcost()
            case 'mk11':
                return mk11.getcost()
            case 'mk12':
                return mk12.getcost()
        }
}

function swap(rig) {
        document.querySelector('.price').textContent = (rig + "  $" + rigcost(rig));
}

function niceNums(num){
    if (num >= 1000000000000000000) {return ((num / 1000000000000000).toFixed(1) + " Get A Life")}
    if (num >= 1000000000000000) {return ((num / 1000000000000000).toFixed(1) + " Quadrillion")}
    if (num >= 1000000000000) {return ((num / 1000000000000).toFixed(1) + " Trillion")}
    if (num >= 1000000000) {return ((num / 1000000000).toFixed(1) + " Billion")}
    if (num >= 1000000) {return ((num / 1000000).toFixed(1) + " Million")}
    else {return num.toLocaleString("en-US")}
}

