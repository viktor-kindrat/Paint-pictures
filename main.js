let canv = document.getElementById('board');
let ctx = canv.getContext('2d');

let color = '#000000';
let lineWidth = 10;
let isMouseDown = false;
let cords = [];

// lwidth.onchange = function (){
//     lineWidth = lwidth.value;
//     ctx.lineWidth = lineWidth*2;
// }
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
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canv.width, canv.height);
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

// red.onclick = function () {
//     color = 'red';
//     ctx.strokeStyle = color;
//     ctx.fillStyle = color;
// }
//
// green.onclick = function () {
//     color = 'green';
//     ctx.strokeStyle = color;
//     ctx.fillStyle = color;
// }
//
// blue.onclick = function () {
//     color = 'blue';
//     ctx.strokeStyle = color;
//     ctx.fillStyle = color;
// }