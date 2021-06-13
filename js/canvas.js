const {innerWidth, innerHeight} = window;
const {random, abs, PI, floor, cos, sin} = Math;

// winHeight: for the dynamic height
// circles: array for the objects (circles)
let winHeight, svg, ctx, circles, circlesNum, circlesR, circlespeed, circlesLife;

// This function is going so supply math.random and multiply it by the range, I'm
// gonna use this one and put all in
function rand(min, max = 0, neg = false){
    if(!max) max = min, min = 0
    if(neg) return ( (random() - 0.5) * (max-min) + min )
    else return ( random() * (max-min) + min )
}

function Circle(x,y,r,dx,dy,l,h){
    this.x = x;
    this.y = y;
    this.r = r;
    this.rad = rand(0, PI*2);
    this.dx = 0;
    this.dy = dy;
    this.l = l;
    this.h = h;

    this.init = function(lastPoint){
        this.r = rand(circlesR.min, circlesR.max);
        this.rad = rand(0, PI*2);
        this.x = rand(0 + this.r, ctx.canvas.width - this.r);
        this.y = -50;
        lastPoint.x = this.x;
        lastPoint.y = this.y;
        this.dy = rand(circlespeed.min, circlespeed.max);
        this.l = rand(circlesLife.min, circlesLife.max);
        this.h = this.h + 50;
        this.draw(lastPoint);
    }
    this.draw = function(lastPoint){
        ctx.beginPath();
        ctx.strokeStyle = "hsla("+this.h+",100%,50%,"+this.l+")";
        ctx.lineWidth = this.r;
        ctx.lineCap = 'round';
        ctx.moveTo(lastPoint.x + cos(this.rad) * 100, lastPoint.y);
        ctx.lineTo(this.x + cos(this.rad) * 100, this.y + this.dy);
        ctx.stroke();
        ctx.closePath();
    }
    // To check the limitations and re extend the objects
    this.checkBounds = function(lastPoint){
        if(this.y > ctx.canvas.height + circlesR.max || this.l <= 0){
            this.init(lastPoint)
        }else this.draw(lastPoint)
    }
    this.update = function(){
        let lastPoint = { x: this.x, y: this.y};
        this.x += this.dx;
        this.y += this.dy;
        this.rad += (1/PI) * 0.01;
        this.l -= 0.01 * (1/60);
        this.checkBounds(lastPoint);
    }
}

// this function will start everything off
// When the window finishes onloading, the function will run
window.onload = function(){
    let canvas = document.getElementById('circlesCanvas');
    ctx = canvas.getContext("2d");
    // ctx.font = "bold 22px sans-serif";
    // ctx.fillText("Texto en el Canvas",100,100);

    // size the canvas to dynamcally
    resize();
    // to start the animations
    animate();
}

function initCanvas(){
    initcircles();
}


function initcircles(){
    circles = [];
    circlesNum = 100;
    circlesR = {min: 30, max: 80};
    circlespeed = {min: 0.5, max: 1};
    circlesLife = {min: 0.1, max: 0.3};

    let startColor = rand(0,360)
    for(let i = 0; i < circlesNum; i++){
        let r = rand(circlesR.min, circlesR.max);
        let x = rand(0 + r, ctx.canvas.width - r);
        let y = rand(0, ctx.canvas.height);
        let dx = 0;
        let dy = rand(circlespeed.min, circlespeed.max);
        let l = rand(circlesLife.min, circlesLife.max);
        let h = startColor + i;
        circles.push( new Circle(x,y,r,dx,dy,l,h) )
    }
}

function resize(){
    let body = document.getElementsByClassName('second-home-content-box');

    if(ctx && winHeight){
        let diff = {
            x: abs(ctx.canvas.width - window.innerWidth),
            y: abs(ctx.canvas.height - winHeight)
        };

        if(diff.x > 200 || diff.y > 200 ){
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = body[0].offsetHeight;
            winHeight = ctx.canvas.height;
            initCanvas();
        }
    }else{
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = body[0].offsetHeight;
        winHeight = ctx.canvas.height;
        initCanvas();
    }
    initCanvas()
}
function animate(){
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    circles.forEach(circles => {
        circles.update();
    });
    requestAnimationFrame(animate);
}

addEventListener('resize', resize);
addEventListener('orientationchange', resize);
