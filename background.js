/* Замутил анимашку на канвасе! 27 мая 2023 */

const canvas = document.querySelector('#canvas');
const cx = canvas.getContext('2d');

const color_bg = '#1A1A1A';
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let flaresArr = [];

class Flare {
    constructor(){
        this.props();
    }

    props(){
        this.lifeTime = Math.random() * (6 - .6) + .6;
        this.lifeTimer = Math.round((this.lifeTime / 10) * 10);
        this.lifeLimit = Math.random() * 3 + 10;
        this.alpha = 1;
        this.size = this.lifeTime / 2;
        this.velocity = this.size * 3;
        this.x = Math.round(Math.random() * w);
        this.y = Math.round(Math.random() * h);
        this.dx = Math.random() * (.4 + .2) - .2;
        this.dy = Math.random() * (.4 + .2) - .2;
    }

    draw(){
        cx.beginPath();
        cx.fillStyle = `rgba(255, 99, 0, ${this.alpha})`;
        cx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        cx.fill();
        return this;
    }

    update(){
        this.x += this.velocity * this.dx;
        this.y += this.velocity * this.dy;
        this.lifeTimer += .02;
        this.alpha = this.lifeLimit - (this.lifeTimer / this.lifeLimit) * this.lifeLimit;
        if(this.x - this.velocity <= 0 || this.x + this.velocity >= w){this.dx *= -1}
        if(this.y - this.velocity <= 0 || this.y + this.velocity >= h){this.dy *= -1}
        if(this.lifeTimer >= this.lifeLimit){this.props()}
        return this;
    }
}

function flaresCount(par){
    for(let i = 0; i < par; i++){
        flaresArr.push(new Flare());
    }
}

function animate(){
    cx.fillStyle = color_bg;
    cx.fillRect(0, 0, w, h);

    flaresArr.map((item)=>item.draw().update());
    
    requestAnimationFrame(animate);
}

function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

flaresCount(128);
animate();
window.addEventListener('resize', resize);