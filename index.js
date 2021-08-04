const leftBtn = document.querySelector('.arrow-left');
const rightBtn = document.querySelector('.arrow-right');
const imgContainer = document.querySelector('.img-container');
let img = document.querySelector('img');
const dots = document.querySelectorAll('.dot');

let initial;

const imgArray = [
    'calamari',
    'drink',
    'pudding',
    'satay',
    'squid',
    'squid2',
    'steak'
];

let showing = 0;

function startAutoTimer() {
    initial = setInterval(function() {
        clickedBtn(++showing);
    }, 5000);
}

function enableOrDisableBtns() {
    const buttons = document.querySelectorAll('.arrow');
    buttons.forEach(button => button.disabled = !button.disabled);
}

function deleteOldImg() {
    const toBeDeleted = document.querySelector('img:first-child')
    toBeDeleted.remove();
    img = document.querySelector('img');
}

function bumpNewImg() {
    const newImg = document.querySelector('img');
    newImg.style.zIndex = 1;
}

function clickedBtn(num) {
    clearInterval(initial);
    startAutoTimer();
    enableOrDisableBtns();
    transition();
    changeImg(num);
    moveDot();
}

function changeImg(num) {
    if (num < 0) {
        num = 6;
    } else if (num > 6) {
        num = 0;
    }

    showing = num;
    const newImg = new Image();
    newImg.alt = 'image';
    newImg.src = `images/${imgArray[num]}.jpg`;
    newImg.style.zIndex = 0;
    imgContainer.appendChild(newImg);

    newImg.addEventListener('transitionend', endTransition);
}

function transition() {
    img.classList.add('transition');
}

function endTransition() {
    deleteOldImg();
    bumpNewImg();
    enableOrDisableBtns();
}

function unselectPrevDot() {
    const prevDot = document.querySelector('.selected');
    prevDot.classList.remove('selected');
}

function selectDot(dotSelected) {
    dotSelected.classList.add('selected');
}

function changeDot(e) {
    if (document.querySelectorAll('img').length != 1) {
        return;
    }
    const dotSelect = e.target;
    getImage(dotSelect);
}

function getImage(target) {
    const num = target.dataset.num;
    clickedBtn(num);
}

function moveDot() {
    const dotToSelect = (document.querySelector(`.dot[data-num="${showing}"]`));
    //check showing num to link to array of images
    unselectPrevDot();
    selectDot(dotToSelect);
}

startAutoTimer();

//event listeners
leftBtn.addEventListener('click', () => {
    clickedBtn(--showing);
});
rightBtn.addEventListener('click', () => {
    clickedBtn(++showing);
});
img.addEventListener('transitionend', endTransition);
dots.forEach(dot => dot.addEventListener('click', changeDot));