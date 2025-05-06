function setup(){
    const myCanvas = createCanvas(500,500);
    myCanvas.parent('mySketch');
    background(49,166,205);
}

function draw(){
    if(mouseIsPressed){
        fill(0);
    } else{
        fill(255);
    }
    ellipse(mouseX, mouseY, 60, 60);
}

AOS.init();

const restart = document.querySelector('#restart');
const store = document.querySelector('#store');

restart.addEventListener('click', function(){
    window.location.reload();
});
