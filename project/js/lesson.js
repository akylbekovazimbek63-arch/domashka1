const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')
const tabBlocks = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_contents_block .tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')
let slideIndex = 0;

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'ERROR'
        phoneResult.style.color = 'red'
    }
}

/* SLIDER */

const hideTabContent = () => {
    tabBlocks.forEach((tabBlock) => {
        tabBlock.style.display = 'none'
    })

    tabs.forEach((tab) => {
        tab.classList.remove('active')
        tab.classList.remove('tab_content_item_active') 
    })
}

const showTabContent = (index) => {
    if (index >= tabBlocks.length) {
        index = 0;
    }
    if (index < 0) {
        index = tabBlocks.length - 1; 
    }
    slideIndex = index; 
    hideTabContent(); 
    tabBlocks[slideIndex].style.display = 'block'
    tabs[slideIndex].classList.add('active')
    tabs[slideIndex].classList.add('tab_content_item_active')
}
const autoSwitch = () => {
    slideIndex++; 
    showTabContent(slideIndex);
}
let interval = setInterval(autoSwitch, 3000); 
showTabContent(slideIndex); 

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        clearInterval(interval); 
        tabs.forEach((tab, index) => {
            if (tab === event.target) {
                showTabContent(index)
                slideIndex = index;
            }
        })
        interval = setInterval(autoSwitch, 3000); 
    }
}