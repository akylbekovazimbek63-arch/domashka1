const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalGlimmer = document.querySelector('.modal_close')
let modalTimerId;
let hasModalBeenAutoTriggered = false; 

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    if (!hasModalBeenAutoTriggered) {
        hasModalBeenAutoTriggered = true;
        window.removeEventListener('scroll', showModalByScroll); 
        if (modalTimerId) {
            clearTimeout(modalTimerId);
        }
    }
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = () => openModal()
modalGlimmer.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

const showModalByScroll = () => {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        if (!hasModalBeenAutoTriggered) {
            openModal();
        }
    }
}

window.addEventListener('scroll', showModalByScroll);

const showModalByTime = () => {
    if (!hasModalBeenAutoTriggered) {
        openModal();
    }
}

modalTimerId = setTimeout(showModalByTime, 10000);