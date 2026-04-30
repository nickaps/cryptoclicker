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



    rig_score_income() {
        addScoreAmount(Math.round(this.amount * this.production * this.multiplier));
    }
}

// Main application starts here

let score = 0;
let mk1 = new miningRig("mk1",0,20,1,1,1.2,1,1);
let mk2 = new miningRig("mk2",0,100,8,1,1.2,1,1);
let mk3 = new miningRig("mk3",0,500,25,1,1.2,1,1);
let mk4 = new miningRig("mk4",0,1500,100,1,1.2,1,1);
let mk5 = new miningRig("mk5",0,3500,700,1,1.2,1,1);
let mk6 = new miningRig("mk6",0,7000,1000,1,1.2,1, 1);
let mk7 = new miningRig("mk7",0,10000,2000,1,1.1,1,1);
let mk8 = new miningRig("mk8",0,20000,7000,1,1.1,1,1);
let mk9 = new miningRig("mk9",0,50000,15000,1,1.1,1,1);
let mk10 = new miningRig("mk10",0,100000,30000,1,1.1,1,1);
let mk11 = new miningRig("mk11",0,500000,70000,1,1.1,1,1);
let mk12 = new miningRig("mk12",0,1000000,12000,1,1,1,1);

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
                return mk1.cost;
            case 'mk2':
                return mk2.cost;
            case 'mk3':
                return mk3.cost;
            case 'mk4':
                return mk4.cost;
            case 'mk5':
                return mk5.cost;
            case 'mk6':
                return mk6.cost;
            case 'mk7':
                return mk7.cost;
            case 'mk8':
                return mk8.cost;
            case 'mk9':
                return mk9.cost;
            case 'mk10':
                return mk10.cost;
            case 'mk11':
                return mk11.cost;
            case 'mk12':
                return mk12.cost;
        }
}

function swap(rig) {
        document.querySelector('.price').textContent = (rig + "  $" + rigcost(rig));
}


