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
let mk1 = new miningRig("mk1",0,20,1,1,1,1,1);
let mk2 = new miningRig("mk2",1,20,1,1,1,1,1);


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
                if (mk1.getAmount() === 1) {
                    window.setInterval(() => mk1.rig_score_income(), 1000);
                }
            }
            break;
        case 'mk2':
            if (mk2.buy()) {
                if (mk2.getAmount() === 1) {
                    window.setInterval(() => mk2.rig_score_income(), 1000);
                }
            }
            break;
    }
}


