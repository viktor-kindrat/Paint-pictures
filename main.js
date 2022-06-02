let trig = 0;

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
        cords.push([e.clientX, e.clientY])
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
        cords.push([e.clientX, e.clientY])
        ctx.lineTo(e.clientX, e.clientY);

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
        clear();
    } else if (e.keyCode === 83) {
        save();
    } else if (e.keyCode === 82) {
        cords = JSON.parse(localStorage.getItem('cords'));
        reply()
    }
})

function reply() {
    let timer = setInterval(function () {
        if (!cords.length) {
            clearInterval(timer)
            ctx.beginPath();
            return ;
        }
        let crd = cords.shift();
        let e = {
            clientX: crd[0],
            clientY: crd[1]
        }

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }, 10)
}

let input = document.getElementById('choose');
let inputArea = document.getElementById('color');

input.addEventListener('input', function () {
    inputArea.style.background = input.value + ' url("./images/picker.svg") center no-repeat';
    color = input.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
});

let colorsBtn = document.querySelectorAll('.color__item');

for(let i = 0; i !== colorsBtn.length; i++) {
    colorsBtn[i].addEventListener('click', function () {
        color = getComputedStyle(colorsBtn[i]).backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    })
}

let colorsOpen = document.querySelector('.btn.color');
colorsOpen.addEventListener('click', function (){
    if (trig === 0) {
        colorsOpen.setAttribute('class', 'btn color color_enabled');
        trig = 1;
    } else {
        colorsOpen.setAttribute('class', 'btn color color_disabled');
        trig = 0;
    }
})