const gameArea = document.getElementById('gameArea');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statsPanel = document.getElementById('stats');
const shortest = document.getElementById('shortest');
const longest = document.getElementById('longest');
const average = document.getElementById('average');
const numAttemptsInput = document.getElementById('numAttempts'); 

let reactionTimes = [];
let gameRunning = false;
let currentAttempt = 0;
let maxAttempts = 5; 
let gameMode = 'click';

function startGame() {

   
    maxAttempts = parseInt(numAttemptsInput.value, 10) || 5; 
    if (clickMode.checked) {
        gameMode = 'click';
    } else if (keyMode.checked) {
        gameMode = 'key';
    }

    gameRunning = true;
    reactionTimes = [];
    currentAttempt = 0;
    statsPanel.style.display = 'none';
    startBtn.disabled = true;
    stopBtn.disabled = false;
    gameArea.style.backgroundColor = '#e0e0e0';
    nextRound();
    
}

function stopGame() {
    gameRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    gameArea.style.backgroundColor = '#e0e0e0';

    displayStats();
}

function nextRound() {
    
    if (currentAttempt >= maxAttempts) {
        stopGame();
        return;
    }

    currentAttempt++;
    if (currentAttempt>1){
        displayStats();
    }
    const randomDelay = Math.floor(Math.random() * 1000) + 1000; 
    setTimeout(() => {
        gameArea.style.backgroundColor = getRandomColor();
        const startTime = Date.now();


        if (gameMode === 'click') {
       
            gameArea.addEventListener('click', () => recordReaction(startTime), { once: true });
        } else if (gameMode === 'key') {
          
            const keyPressListener = (event) => recordReaction(startTime);
            document.addEventListener('keydown', keyPressListener, { once: true });
        }

    }, randomDelay);
}

function recordReaction(startTime) {
    if (!gameRunning) return;
    const reactionTime = Date.now() - startTime;
    reactionTimes.push(reactionTime);
    nextRound();
}

function displayStats() {
    const minTime = Math.min(...reactionTimes);
    const maxTime = Math.max(...reactionTimes);
    const avgTime = reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length;

    shortest.textContent = minTime;
    longest.textContent = maxTime;
    average.textContent = avgTime.toFixed(2);

    statsPanel.style.display = 'block';
    

}

function getRandomColor() {
      let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
