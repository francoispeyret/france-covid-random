
const areas    = document.querySelectorAll('#map path');
let areasEls = [];
const map      = document.querySelector('#map');
const appEl    = document.querySelector('#app');
const startEl  = document.querySelector('#start');
const cancelEl = document.querySelector('#cancel');
const introEl  = document.querySelector('#bienvenue');
let mode = 'normal';
const modeEls = document.querySelectorAll('.mode-container button');
let animationIsActive = false
let animationIteration = 0;
let offsetRandomValue = offsetRandom();

function offsetRandom() {
    return Math.floor(Math.random() * 33);
}

appEl.style.display = 'none';

startEl.addEventListener('click', toggleApp);
cancelEl.addEventListener('click', toggleApp);

modeEls.forEach((button) => {
   button.addEventListener('click', function() {
       if(!this.classList.contains('active')) {
           modeButtonsRemoveActive();
           this.classList.add('active');
           mode = this.getAttribute('data-mode');
       }
   });
});

function modeButtonsRemoveActive() {
    modeEls.forEach((button) => {
        button.classList.remove('active');
    });
}

function toggleApp() {
    if(appEl.style.display === 'none') {
        appEl.style.display = 'block';
        introEl.style.display = 'none';

        areasEls = [];

        areas.forEach((item) => {
            const coord = item.getBBox();
            item.setAttribute('x', coord.x);
            item.setAttribute('y', coord.y);
            areasEls.push(item);
        });

        areasEls.sort(function(a, b){
            if(parseFloat(a.getAttribute("x")) > parseFloat(b.getAttribute("x")))
                return -1;
            else if(parseFloat(a.getAttribute("x")) < parseFloat(b.getAttribute("x")))
                return 1;
            else
                return 0;
        });
    } else {
        appEl.style.display = 'none';
        introEl.style.display = 'block';
    }
}


function randomize(i) {
    areasEls.forEach((item, key) => {
        areaRemoveColorClass(item);
        console.log(offsetRandomValue);
        if(i === 29 && offsetRandomValue > 18) {
            item.classList.add('black');
            document.querySelector('#motus').play();
        } else if(mode === 'normal') {
            const random = Math.floor((Math.random() * 10) + 1);
            if(random < 3) {
                item.classList.add('red');
            } else if (random > 2 && random < 6) {
                item.classList.add('orange');
            } else {
                item.classList.add('green');
            }
        } else if (mode === 'daltonien') {
            const random = Math.floor((Math.random() * 10) + 1);
            if(random < 3) {
                item.classList.add('dalto3');
            } else if (random > 2 && random < 6) {
                item.classList.add('dalto2');
            } else {
                item.classList.add('dalto1');
            }
        } else if (mode === 'licorne') {
            const color = (animationIteration + Math.floor((key / 14)) + offsetRandomValue) % 5;
            item.classList.add('licorne'+(color +1));
        }
    });
}

function areaRemoveColorClass(item) {
    item.classList.remove('black');
    item.classList.remove('red');
    item.classList.remove('orange');
    item.classList.remove('green');
    item.classList.remove('licorne1');
    item.classList.remove('licorne2');
    item.classList.remove('licorne3');
    item.classList.remove('licorne4');
    item.classList.remove('licorne5');
    item.classList.remove('dalto3');
    item.classList.remove('dalto2');
    item.classList.remove('dalto1');
}

document.querySelector('#randomize').addEventListener('click', function() {
    if(!animationIsActive) {
        this.classList.add('animate');
        map.classList.remove('finish-animation');
        offsetRandomValue = offsetRandom();
        randomizeRool();
    }
});

function randomizeRool() {
    animationIsActive = true;
    animationIteration++;
    if(animationIteration < 30 && animationIteration !== 0) {
        randomize(animationIteration);
        setTimeout(randomizeRool, animationIteration*10);
        if(animationIteration === 29) {
            map.classList.add('finish-animation');
        }
    } else {
        animationIteration = 0;
        document.querySelector('#randomize').classList.remove('animate');
        animationIsActive = false;
    }
}
