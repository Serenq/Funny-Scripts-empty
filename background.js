/*
 * "Светлячки" by Serenq / 21 июля 2023
 * От автора: Уебался делать ускорение и фиксить торможение. Решение нашлось в кастомной, всё время обновляемой временной метке.
*/

const canvas = document.querySelector('#canvas');
const cx = canvas.getContext('2d');

const config = {
    count: 400,
    size: 4,
    speed: 400,
    deceleration: 1.05,
    deadLine: .8,
    colorBg: '#11121C',
    colorPart: 'rgba(255, 100, 100, 1)',
    timeNow: 0,
    timePassed: 0,
}

let particlesArr = [];

class Particle {
    constructor(){
        setTimeout(() => {
            this.remap();
        }, Math.random() * 5000);

        function resize(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.removeEventListener('resize', resize);
        window.addEventListener('resize', resize);
    }

    remap = ()=>{
        this.timeStamp = new Date().getTime();
        this.timePassed = 0;
        this.timeDelay = Math.random() * 5;
        this.color = Math.floor(Math.random() * 360);
        this.size = config.size || 10;
        this.x = Math.random() * canvas.width + this.size/2 + 30;
        this.y = Math.random() * canvas.height + this.size/2 + 30;
        this.dx = (Math.random() * (-.1 - .1) + .1);
        this.dy = (Math.random() * (-.1 - .1) + .1);
        this.speedCut = 0.5;
        this.speed = Math.random() * (170 - config.speed) + config.speed;
        this.dSpeed = 0;

        return this;
    }

    draw = ()=>{
        cx.beginPath();
        cx.fillStyle = config.colorPart;
        cx.miterLimit = 1;
        cx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cx.fillStyle = `hsla(
            ${this.color},
            80%,
            ${(this.dSpeed / this.speed) * 60 + 12}%,
            ${(this.dSpeed / this.speed) + .2}
        )`;
        cx.fill();
        cx.closePath();
        return this;
    }

    update = (fps)=>{
        this.timePassed = (new Date().getTime() - this.timeStamp) / 1000;
        this.x += this.dx * this.dSpeed * fps;
        this.y += this.dy * this.dSpeed * fps;
        this.dx += this.dSpeed * fps * Math.cos(this.dx * this.x) * .05;
        this.dy += this.dSpeed * fps * Math.sin(this.dy * this.y) * .05;

        if(this.dSpeed < this.speed && this.timePassed < config.deadLine){this.dSpeed += 10}

        if(this.timePassed >= config.deadLine){
            this.dSpeed /= config.deceleration;
            if(this.dSpeed <= 5 ){
                if( this.timePassed - this.timeDelay > 0){this.remap();}
            }
        }

        if(
            this.x - this.size < 0
            && this.dx < 0
            || this.x + this.size > canvas.width
            && this.dx > 0
        ){
            this.dSpeed *= this.speedCut;
            this.dx = -this.dx;
        }

        if(
            this.y + this.dy - this.size < 0
            && this.dy < 0
            || this.y + this.dy + this.size > canvas.height
            && this.dy > 0
        ){
            this.dSpeed *= this.speedCut;
            this.dy = -this.dy;
        }
        return this;
    }
}

function particleCount(par){
    for(let i = 1; i <= par; i++){particlesArr.push(new Particle())}
    animate();
    console.log(`%c"Светлячки" by Serenq / 21 июля 2023`, "color: #ace600; font-style: italic; background-color: #444; padding: 0 20px");
}

function animate(stamp=0){
    requestAnimationFrame(animate);
    
    cx.clearRect(0,0,canvas.width, canvas.height);

    config.timeNow = stamp - config.timePassed;
    if(config.timeNow < 30){
        particlesArr.map(item => {
            item.draw().update(config.timeNow/1000);
        });
    }
    config.timePassed = stamp;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    particleCount(config.count);
});