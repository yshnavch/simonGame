let seq=[];
let humseq=[];
let level=0;
var sound1 = new Audio("green.mp3");
var sound2 = new Audio("red.mp3");
var sound3 = new Audio("yellow.mp3");
var sound4 = new Audio("blue.mp3");
var sound5 = new Audio("gameOver.mp3");
 const start= document.getElementById('st');
 const container=document.querySelector(".container");
 const info=document.querySelector(".info");
 const rt= document.getElementById('reset');
 rt.addEventListener('click',()=>{
    reset();
 });
 start.addEventListener('click',()=>{
    reset();
    nextround();
    container.style.pointerEvents = 'auto';
 }
 );
 container.style.pointerEvents = 'none';
 function nextround()
 {
     level+=1;
     info.innerHTML="Level : "+level;
     const nextseq=[...seq];
     nextseq.push(nextcolor());
     seq=[...nextseq]
     seq.forEach((color,index)=>{
        setTimeout(()=>{
            colorPlay(color);
        },(index+1)*600); 
     });
     setTimeout(() => {
        container.style.pointerEvents = 'auto';
      }, level * 600+1000 );
     
 }
 function nextcolor()
 {
    const color=['green','red','yellow','blue'];
    return color[Math.floor(Math.random()*color.length)];

 }
function colorPlay(color)
{
    container.style.pointerEvents = 'none';
    const tile= document.querySelector("." +color);
    tile.classList.add('activated');
    switch(color){
        case "green":
            sound1.play();
            break;
        case "red":
            sound2.play();
            break;
        case "yellow":
            sound3.play();
            break;
        case "blue":
            sound4.play();
            break;
    }
    setTimeout(()=>{
        tile.classList.remove('activated');
    },300);
}
container.addEventListener('click',event=>{
    const box  = event.target.dataset;
    if(box.tile)
        handle(box.tile); 
});
function handle(color)
{
    const index=humseq.push(color)-1;
    switch(color){
        case "green":
            sound1.play();
            break;
        case "red":
            sound2.play();
            break;
        case "yellow":
            sound3.play();
            break;
        case "blue":
            sound4.play();
            break;
    }
    if(humseq[index]!==seq[index])
    {
        info.innerHTML="Game over";
        container.style.pointerEvents = 'none';
        sound5.play();
        return;
    }
    if(humseq.length===seq.length){
        
        humseq=[];
        setTimeout(()=>{
            nextround();
        },1000);
        return;
    }
}
function reset(){
    info.innerHTML="";
    level=0;
    humseq=[];
    seq=[];
    container.style.pointerEvents = 'auto';
}