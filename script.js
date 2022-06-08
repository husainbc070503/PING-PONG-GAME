var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
const storeName = 'PPName';
const storeScore = 'PPMaxScore';
const rod1Name = 'Rod 1';
const rod2Name = 'Rod 2';

let score, maxScore, movement, rod, ballSpeedX = 2, ballSpeedY = 1;

let gameon = false;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

(function () {
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);
    alert(rod + ' has a maximum score of ' + maxScore);
    resetBoard(rod)
})();

function resetBoard(rodName) {
    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';
    score = 0;
    gameon = false;
};

function storeWin(rod, score) {
    if (score > maxScore) {
        maxScore = score
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }
    clearInterval(movement);
    resetBoard(rod);
    alert(rod + " wins with a score " + (score * 100) + ". Max Score is " + (maxScore));
};

window.addEventListener('keypress', function () {
    let rodSpeed = 20;
    let rodRect = rod1.getBoundingClientRect();
    if (event.code === "KeyF" && ((rodRect.x + rodRect.width) < window.innerWidth)) {
        rod1.style.left = rodRect.x + rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    }
    else if (event.code === 'KeyB' && (rodRect.x > 0)) {
        rod1.style.left = rodRect.x - rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    }
    if (event.code == 'Enter') {
        if (!gameon) {
            gameon = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;
            let rod1ht = rod1.offsetHeight;
            let rod2ht = rod2.offsetHeight;

            let rod1wd = rod1.offsetWidth;
            let rod2wd = rod2.offsetWidth;

            movement = setInterval(function () {

                //MOVE THE BALL
                ballX += ballSpeedX
                ballY += ballSpeedY

                let rod1X = rod1.getBoundingClientRect().x;
                let rod2X = rod2.getBoundingClientRect().x;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';

                if ((ballX + ballDia) > windowWidth || (ballX < 0)) {
                    ballSpeedX = -1 * ballSpeedX //Reverse the direction
                }

                let ballPos = ballX + ballDia / 2;

                //Collision for rod1
                if (ballY <= rod1ht) {
                    ballSpeedY = -1 * ballSpeedY;
                    score++;
                    // check if game end
                    if ((ballPos < (rod1X)) || (ballPos > (rod1X + rod1wd))) {
                        storeWin(rod2Name, score);
                    }
                }
                // Collision for rod2
                else if ((ballY + ballDia) >= (windowHeight - rod2ht)) {
                    ballSpeedY = -1 * ballSpeedY;
                    score++;
                    if ((ballPos < rod2X) || (ballPos > (rod2wd + rod2X))) {
                        storeWin(rod1Name, score);
                    }
                }


            }, 10);  //10 milliseconds
        }
    }
});