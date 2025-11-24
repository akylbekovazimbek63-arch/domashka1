const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');
const GMAIL_REGEX = /^[a-zA-Z0-9._-]+@gmail\.com$/;
const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');
let position = 0; 
let animationId; 

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
    const blockWidth = childBlock.clientWidth;
    const maxPosition = parentWidth - blockWidth;
    if (position >= maxPosition) {
        position = maxPosition;
        childBlock.style.left = `${position}px`;
        return;
    }
    position += 2;
    childBlock.style.left = `${position}px`;

    animationId = requestAnimationFrame(moveSquare);
};
requestAnimationFrame(moveSquare);