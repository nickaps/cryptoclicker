
var score = 0;



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