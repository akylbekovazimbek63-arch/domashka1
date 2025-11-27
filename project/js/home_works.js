const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');
const GMAIL_REGEX = /^[a-zA-Z0-9._-]+@gmail\.com$/; 
const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');
const counterElement = document.getElementById('seconds'); 
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let positionX = 0; 
let positionY = 0; 
let step = 2;
let direction = 0; 
let animationId; 
let count = 0; 
let intervalId; 

const validateGmail = () => {
    const email = gmailInput.value.trim();

    if (GMAIL_REGEX.test(email)) {
        gmailResult.textContent = 'OK';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'ERROR';
        gmailResult.style.color = 'red';
    }
};

gmailButton.addEventListener('click', validateGmail);

const moveSquare = () => {
    const parentWidth = parentBlock.clientWidth;
    const parentHeight = parentBlock.clientHeight;
    const blockWidth = childBlock.clientWidth;
    const blockHeight = childBlock.clientHeight;
    const maxX = parentWidth - blockWidth;
    const maxY = parentHeight - blockHeight;

    switch (direction) {
        case 0: 
            if (positionX < maxX) {
                positionX += step;
            } else {
                positionX = maxX; 
                direction = 1;
            }
            break;
        case 1: 
            if (positionY < maxY) {
                positionY += step;
            } else {
                positionY = maxY; 
                direction = 2; 
            }
            break;
        case 2: 
            if (positionX > 0) {
                positionX -= step;
            } else {
                positionX = 0; 
                direction = 3; 
            }
            break;
        case 3: 
            if (positionY > 0) {
                positionY -= step;
            } else {
                positionY = 0; 
                direction = 0; 
            }
            break;
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    animationId = requestAnimationFrame(moveSquare);
};

requestAnimationFrame(moveSquare); 

const startCounter = () => {
    if (intervalId) {
        return;
    }
    intervalId = setInterval(() => {
        count++;
        counterElement.textContent = count; 
    }, 1000);
    
    startButton.disabled = true;
    stopButton.disabled = false;
};

const stopCounter = () => {
    clearInterval(intervalId);
    intervalId = null; 
    startButton.disabled = false;
    stopButton.disabled = true;
};

const resetCounter = () => {
    stopCounter(); 
    count = 0; 
    counterElement.textContent = count; 
    startButton.disabled = false;
    stopButton.disabled = true;
};

startButton.addEventListener('click', startCounter);
stopButton.addEventListener('click', stopCounter);
resetButton.addEventListener('click', resetCounter);

window.onload = () => {
    if (stopButton) stopButton.disabled = true;
};