let colorTrigger = 0;
let rubberColor = '#ffffff';
let speed = 10;

let canv = document.getElementById('board');
let ctx = canv.getContext('2d');

let color = '#141414';
let lineWidth = 10;
let isMouseDown = false;
let cords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

canv.addEventListener('mousedown', function () {
    isMouseDown = true;
})

canv.addEventListener('mouseup', function () {
    isMouseDown = false;
    ctx.beginPath();
    cords.push('mouseup')
})
ctx.lineWidth = lineWidth*2;
ctx.strokeStyle = color;
ctx.fillStyle = color;

canv.addEventListener('mousemove', function (e) {
    if(isMouseDown) {
        cords.push({
            x: e.clientX,
            y: e.clientY,
            color: color
        });
        ctx.lineTo(e.clientX, e.clientY);

        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});

canv.addEventListener('mousedown', function (e) {
    if(isMouseDown) {
        cords.push({
            x: e.clientX,
            y: e.clientY,
            color: color
        });
        ctx.lineTo(e.clientX, e.clientY);

        console.log(cords)
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
})

function clear() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.beginPath();
    ctx.fillStyle = color;
}

function save() {
    localStorage.setItem('cords', JSON.stringify(cords))
}

document.addEventListener('keydown', function (e) {
    console.log(e.keyCode)
    if (e.keyCode === 67) {
        cords = [];
        clear();
    } else if (e.keyCode === 83) {
        save();
    } else if (e.keyCode === 82) {
        clear();
        let saved = JSON.parse(localStorage.getItem('cords'));
        cords = cords.concat(saved);
        localStorage.setItem('cords', JSON.stringify(cords))
        reply(cords);
    }
})

function reply(arr) {
    let cordsCopy = arr;
    let timer = setInterval(function () {
        if (!cordsCopy.length) {
            clearInterval(timer)
            ctx.beginPath();
            return ;
        }
        let crd = cordsCopy.shift();
        let e = {
            clientX: crd.x,
            clientY: crd.y,
            color: crd.color
        }
        console.log(cords)

        ctx.strokeStyle = e.color;
        ctx.fillStyle = e.color;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }, speed)
}

let input = document.getElementById('choose');
let inputArea = document.getElementById('color');

input.addEventListener('input', function () {
    rubberBtn.style.background = 'transparent';
    inputArea.style.background = input.value + ' url("./images/picker.svg") center no-repeat';
    color = input.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
});

let colorsBtn = document.querySelectorAll('.color__item');

for(let i = 0; i !== colorsBtn.length; i++) {
    colorsBtn[i].addEventListener('click', function () {
        rubberBtn.style.background = 'transparent';
        color = getComputedStyle(colorsBtn[i]).backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    })
}

let colorsOpen = document.querySelector('.btn.color');
colorsOpen.addEventListener('click', function (){
    if (colorTrigger === 0) {
        colorsOpen.setAttribute('class', 'btn color color_enabled');
        colorTrigger = 1;
    } else {
        colorsOpen.setAttribute('class', 'btn color color_disabled');
        colorTrigger = 0;
    }
})

let menuOpen = document.querySelector('.menu');
menuOpen.addEventListener('click', function () {
    menuOpen.setAttribute('class', 'btn menu menu_active');
});
menuOpen.addEventListener('dblclick', function () {
    menuOpen.setAttribute('class', 'btn menu menu_disabled');
})

let saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', function () {
    save();
});

let replyBtn = document.getElementById('replyBtn');
replyBtn.addEventListener('click', function () {
    clear();
    let saved = JSON.parse(localStorage.getItem('cords'));
    cords = cords.concat(saved);
    localStorage.setItem('cords', JSON.stringify(cords))
    reply(cords);
})

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', function () {
    cords = [];
    clear();
});

let rubberBtn = document.getElementById('rubberBtn');
rubberBtn.addEventListener('click', function () {
    color = rubberColor
    rubberBtn.style.background = 'rgba(255,255,255,0.21)';
})

let speedInp = document.getElementById('speedInp');
speedInp.addEventListener('change', function (){
    console.log(speedInp.value)
    document.querySelector('.speed__info').style.left = 10 * speedInp.value + 'px';
    document.querySelector('.speed__info').innerHTML = speedInp.value;
})