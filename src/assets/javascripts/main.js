
const areas    = document.querySelectorAll('path');
const map      = document.querySelector('#map');
const appEl    = document.querySelector('#app');
const startEl  = document.querySelector('#start');
const cancelEl = document.querySelector('#cancel');
const introEl  = document.querySelector('#bienvenue');
let animationIteration = 0;

appEl.style.display = 'none';

startEl.addEventListener('click', toggleApp);
cancelEl.addEventListener('click', toggleApp);

function toggleApp() {
    if(appEl.style.display === 'none') {
        appEl.style.display = 'block';
        introEl.style.display = 'none';
    } else {
        appEl.style.display = 'none';
        introEl.style.display = 'block';
    }
}


function randomize() {
    areas.forEach((item) => {
        item.classList.remove('red');
        item.classList.remove('orange');
        item.classList.remove('green');
        const random = Math.floor((Math.random() * 10) + 1);
        if(random < 3) {
            item.classList.add('red');
        } else if (random > 2 && random < 6) {
            item.classList.add('orange');
        } else {
            item.classList.add('green');
        }
    });
}

document.querySelector('#randomize').addEventListener('click', () => {
    map.classList.remove('finish-animation');
    randomizeRool();
});

function randomizeRool() {
    animationIteration++;
    if(animationIteration == 29) {
        map.classList.add('finish-animation');
        //document.querySelector('#motus').play();
    }
    if(animationIteration < 30 && animationIteration!= 0) {
        randomize();
        setTimeout(randomizeRool, animationIteration*10);
    } else {
        animationIteration = 0;
    }
}
