
var score = 0;

function exitGame() {
    window.location.href = "/exit?newScore=" + Number(score);
}

function addScore() {
    score += 1;
}