let colorTrigger = 0;
let menuTrigger = 0;
let rubberColor = '#ffffff';
let color = '#141414';
let lineWidth = localStorage.getItem('lineWidth') || 10;
let isMouseDown = false;
let cords = [];
let speed = localStorage.getItem('speed') || 10;
let lineActive = 0;
let lineCoord = {}

let input = document.getElementById('choose');
let inputArea = document.getElementById('color');
let colorsBtn = document.querySelectorAll('.color__item');
let colorsOpen = document.querySelector('.btn.color');
let menuOpen = document.querySelector('.btn.menu');
let saveBtn = document.getElementById('saveBtn');
let replyBtn = document.getElementById('replyBtn');
let clearBtn = document.getElementById('clearBtn');
let rubberBtn = document.getElementById('rubberBtn');
let weightInp = document.getElementById('weightInp');
let weightBtn = document.getElementById('weightBtn');
let speedInp = document.getElementById('speedInp');
let lineBtn = document.getElementById('lineBtn');

weightInp.value = lineWidth;
speedInp.value = speed;
document.querySelector('.weight__info').style.left = 10 * weightInp.value + 'px';
document.querySelector('.weight__info').innerHTML = weightInp.value;
document.querySelector('.speed__info').style.left = 10 * speedInp.value + 'px';
document.querySelector('.speed__info').innerHTML = speedInp.value

let speedBtn = document.getElementById('speedBtn');
let canv = document.getElementById('board');

let ctx = canv.getContext('2d');

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
            color: color,
            lineWidth: lineWidth
        });
        ctx.lineWidth = lineWidth*2;
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
        document.querySelector('.weight').style.display = 'none';
        document.querySelector('.weight').style.opacity = '0';
        document.querySelector('.speed').style.display = 'none';
        document.querySelector('.speed').style.opacity = '0';
        if (lineActive === 1) {
            lineCoord.x = e.clientX;
            lineCoord.y = e.clientY;
            lineActive = 2;
            cords.push('line start');
        } else if (lineActive === 2) {
            ctx.moveTo(lineCoord.x, lineCoord.y);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.fill();
            lineActive = 0;
            lineBtn.style.background = 'transparent';
            cords.push('line end');
        }
        cords.push({
            x: e.clientX,
            y: e.clientY,
            color: color,
            width: lineWidth
        });
        ctx.lineWidth = lineWidth*2;
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
            clearInterval(timer);
            lineWidth = localStorage.getItem('lineWidth') || 10;
            ctx.lineWidth = lineWidth*2;
            ctx.beginPath();
            return ;
        }
        let crd = cordsCopy.shift();
        lineWidth = crd.lineWidth;
        ctx.lineWidth = lineWidth*2;
        let e = {
            clientX: crd.x,
            clientY: crd.y,
            color: crd.color
        }
        console.log(crd)
        ctx.strokeStyle = e.color;
        ctx.fillStyle = e.color;
        if (crd === 'line start') {
            let newCrd = cordsCopy.shift();
            lineWidth = newCrd.width;
            ctx.lineWidth = lineWidth * 2;

            ctx.strokeStyle = newCrd.color;
            ctx.fillStyle = newCrd.color;
            ctx.moveTo(newCrd.x, newCrd.y);
            console.log(newCrd);

            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(newCrd.x, newCrd.y, lineWidth, 0, Math.PI * 2);
            ctx.fill();
            cordsCopy.shift();
        } else if (crd === 'line end') {
            let newCrd = cordsCopy.shift();

            lineWidth = newCrd.width;
            ctx.lineWidth = lineWidth * 2;
            console.log('line width', ctx.lineWidth)
            console.log(lineWidth)

            ctx.lineTo(newCrd.x, newCrd.y)
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(newCrd.x, newCrd.y, lineWidth, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
        } else {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, lineWidth, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        }
    }, speed)
}


input.addEventListener('input', function () {
    rubberBtn.style.background = 'transparent';
    inputArea.style.background = input.value + ' url("./images/picker.svg") center no-repeat';
    color = input.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
});


for(let i = 0; i !== colorsBtn.length; i++) {
    colorsBtn[i].addEventListener('click', function () {
        rubberBtn.style.background = 'transparent';
        color = getComputedStyle(colorsBtn[i]).backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    })
}

colorsOpen.addEventListener('click', function (){
    if (colorTrigger === 0) {
        colorsOpen.setAttribute('class', 'btn color color_enabled');
        colorTrigger = 1;
    } else {
        colorsOpen.setAttribute('class', 'btn color color_disabled');
        colorTrigger = 0;
    }
})

menuOpen.addEventListener('click', function () {
    if (menuTrigger === 0) {
        menuOpen.setAttribute('class', 'btn menu menu_active');
        menuTrigger = 1;
    } else {
        menuOpen.setAttribute('class', 'btn menu menu_disabled');
        menuTrigger = 0
    }
});

saveBtn.addEventListener('click', function () {
    save();
});

replyBtn.addEventListener('click', function () {
    clear();
    document.querySelector('.speed').style.display = 'none';
    document.querySelector('.speed').style.opacity = '0';
    let saved = JSON.parse(localStorage.getItem('cords'));
    cords = cords.concat(saved);
    localStorage.setItem('cords', JSON.stringify(cords))
    reply(cords);
})

clearBtn.addEventListener('click', function () {
    cords = [];
    clear();
});

rubberBtn.addEventListener('click', function () {
    color = rubberColor
    rubberBtn.style.background = 'rgba(255,255,255,0.21)';
})

weightInp.addEventListener('input', function (){
    menuOpen.setAttribute('class', 'btn menu menu_disabled');
    lineWidth = weightInp.value;
    localStorage.setItem('lineWidth', lineWidth);
    ctx.lineWidth = lineWidth*2;
    document.querySelector('.weight__info').style.left = 10 * weightInp.value + 'px';
    document.querySelector('.weight__info').innerHTML = weightInp.value;
})

weightBtn.addEventListener('click', function () {
    document.querySelector('.speed').style.display = 'none';
    document.querySelector('.speed').style.opacity = '0';
    document.querySelector('.weight').style.display = 'flex';
    document.querySelector('.weight').style.opacity = '1';
})

speedInp.addEventListener('input', function () {
    menuOpen.setAttribute('class', 'btn menu menu_disabled');
    speed = speedInp.value;
    localStorage.setItem('speed', speed)
    document.querySelector('.speed__info').style.left = 10 * speedInp.value + 'px';
    document.querySelector('.speed__info').innerHTML = speedInp.value
});

speedBtn.addEventListener('click', function () {
    document.querySelector('.weight').style.display = 'none';
    document.querySelector('.weight').style.opacity = '0';
    document.querySelector('.speed').style.display = 'flex';
    document.querySelector('.speed').style.opacity = '1';
});

lineBtn.addEventListener('click', function () {
    lineActive = 1;
    lineBtn.style.background = 'rgba(255,255,255,0.21)';
})
