window.onload = function () {
    draw();
    draw2();
}

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 150, 150);
        for (var j = 1; j < 50; j++) { //画49颗星
            ctx.save(); //保存当前画布状态和画笔状态
            ctx.fillStyle = '#fff';
            ctx.translate(Math.floor(Math.random() * 150), Math.floor(Math.random() * 150));
            drawStar(ctx, Math.floor(Math.random() * 4) + 2);
            ctx.restore(); //恢复当前画布状态和画笔状态
        }
    }
}

function drawStar(ctx, r) {
    ctx.save(); //保存当前画布状态和画笔状态
    ctx.beginPath();
    ctx.moveTo(r, 0);
    for (var i = 0; i < 9; i++) {
        ctx.rotate(Math.PI / 5);
        if (i % 2 == 0) {
            ctx.lineTo((r / 0.5) * 0.2, 0);
        } else {
            ctx.lineTo(r, 0);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore(); //恢复当前画布状态和画笔状态
}

var sun = new Image();
var moon = new Image();
var earth = new Image();

sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png'; //太阳，自带背景
moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

function draw2() {
    var canvas = document.getElementById('canvas2');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-over'; //遮盖方式(?)
        ctx.clearRect(0, 0, 300, 300); //清空

        ctx.fillStyle = 'rgba(0,0,0,0.4)'; //半透明黑色
        ctx.strokeStyle = 'rgba(0,153,255,0.4)'; //线的颜色
        ctx.save(); //保存上述设置
        ctx.translate(150, 150); //移动画布

        //地球
        var time = new Date();
        ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds()); //根据时间计算画布旋转
        //ctx.rotate(time.getMilliseconds() / 150); //根据时间计算画布旋转
        ctx.translate(105, 0); //地球的位置
        ctx.fillRect(0, -12, 50, 24); //阴影
        ctx.drawImage(earth, -12, -12);

        //月亮
        ctx.save(); //以地球为原点
        ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
        //ctx.rotate(time.getMilliseconds() / 150);
        ctx.translate(0, 28.5); //和地球的距离
        ctx.drawImage(moon, -3.5, -3.5);
        ctx.restore(); //恢复到以地球为原点的配置

        ctx.restore(); //恢复以太阳为原点的画布及画笔设置

        ctx.beginPath(); //开始画线
        ctx.arc(150, 150, 105, 0, Math.PI * 2, false); //地球轨道
        ctx.stroke(); //实际画线

        ctx.drawImage(sun, 0, 0, 300, 300); //太阳

        window.requestAnimationFrame(draw2);
    }
}
