
const areas = document.querySelectorAll('path');
const map = document.querySelector('#map');
let animationIteration = 0;

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
    }
    if(animationIteration < 30 && animationIteration!= 0) {
        randomize();
        setTimeout(randomizeRool, animationIteration*10);
    } else {
        animationIteration = 0;
    }
}
