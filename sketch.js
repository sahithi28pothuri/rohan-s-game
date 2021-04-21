var text1;
var text2;
var text3;
var text4;
var reset;

var gameState = "swim";
var count = 400;
var reset_Img;

var boat;
var Lionfish;
var Bluering;
var humanst;
var humanfa;
var humansw;
var ocean;
var stonefish;
var srake;
var thegreatbarr;
var fishesGroup;

var boatIMG
var LionfishIMG;
var BlueringIMG;
var humanstIMG;
var humanfaIMG;
var humanswIMG;
var oceanIMG;
var stonefishIMG;
var srakeIMG;
var thegreatbarrIMG;
var fish;

function preload(){
    LionfishIMG = loadImage("Lionfish.png");
    BlueringIMG = loadImage("Blue Ringed Octopus.png");
    humanfaIMG = loadImage("humanfa.png");
    humanstIMG = loadImage("humanst.png");
    humanswIMG = loadImage("humansw.png");
    oceanIMG = loadImage("ocean.png");
    stonefishIMG = loadImage("stonefish.png");
    srakeIMG = loadImage("water animal.png");
    thegreatbarrIMG = loadImage("The great barracuda.png");
    boatIMG = loadImage("boat.png");
    reset_Img = loadImage("reset1.png");
}


function setup(){
    createCanvas(displayWidth-20,displayHeight-166);
    ocean = createSprite(displayWidth/2-20,displayHeight/2-100,1200,400);
    ocean.scale = 5;
    ocean.addImage("ocean",oceanIMG);
    ocean.x = ocean.width/2;
    

    humanst = createSprite(displayWidth/2+70,displayHeight/2-100,50,50);
    humanst.addImage("humanst",humanstIMG);

    humanfa = createSprite(displayWidth/2+70,displayHeight/2-100,50,50);
    humanfa.addImage("humanfa",humanfaIMG);
    humanfa.visible = false;

    humansw = createSprite(displayWidth/2-30,displayHeight/2-100,50,50);
    humansw.addImage("humansw",humanswIMG);
    humansw.visible = false;

    boat = createSprite(2*displayWidth,displayHeight/2-100,50,50);
    boat.addImage("boat",boatIMG);
    boat.velocityX = -4;
    boat.visible = false;

    text1 = createElement('h1');
    text1.html("Hey you friend has invited you to a part on a yacht<br>*Press W to cotinue*");
    text1.position(200,130);
    text2 = createElement('h2');

    text3 = createElement('h3');

    text4 = createElement('h4');

    reset = createSprite(displayWidth-200,displayHeight-700);
    reset.addImage("rest",reset_Img);
    reset.scale = 0.2;

    fishesGroup = new Group();
    
    
}

function draw(){
    background("white");

    if(keyDown("UP_ARROW")){
        humansw.y -= 2;
    }

    if(keyDown("DOWN_ARROW")){
        humansw.y += 2;
    }

   if(ocean.x<300){
        ocean.x = displayWidth/2;
    }

    
    if(gameState === "swim"){
        if(keyDown("W")){
            ocean.velocityX = -5;
            text1.hide();
            humanst.visible = false;
            humanfa.visible = true;
            text2.html("You are losing you balance be carefull<br>*!!!press E to cotinue!!!*");
            text2.position(200,100);
        }
    
        if(keyDown("E")){
            text2.hide();
            text3.html("you losed your balance when you boat was at high speed swim forward to find your boat and becarefull<br>because Lionfish has found you<br>**Press up arrow to go up and down arrow to go down**<br>*Press R to start game*");
            text3.position(200,150);
            AquaLife();
            humanfa.visible = false;
            humansw.visible = true;
        }
    
        if(keyDown("R")){
            text3.hide();
        }
    
        
        spawnfish();
        count = count-1;

        if(count===30){
            boat.visible = true;
            humansw.depth = boat.depth;
            gameState = "end";
        }
    }

    else if(gameState === "end"){
        if(boat.isTouching(humansw)){    
                fishesGroup.destroyEach();
                boat.velocityX = 0; 
                textSize(30);
                fill("red");
                text4.html("yeah...finally you found you boat, !!!!hurrayyy!!!<br>Press reset to start<br>Challeges may come in any stage in life<br>Motive oneself and never giveup<br>This is just a story but in real life it can come from any phase");
                text4.position(200,150); 
                Lionfish.visible = false;

                if(mousePressedOver(reset)){
                    restart();  
                }        
        }
    }

    drawSprites();
}


function AquaLife(){
        Lionfish = createSprite(humansw.x-500,humansw.y,50,50);
        Lionfish.addImage("Lionfish",LionfishIMG);
        Lionfish.y = humansw.y;
        Lionfish.scale = 0.2;

}

function spawnfish(){
    if (frameCount % 60 === 0){
      fish = createSprite(displayWidth,Math.round(random(200,800)),10,40);
      fish.velocityX = -10;
      
       console.log("not excecuted");
       var rand = Math.round(random(1,4));
       switch(rand) {
         case 1: fish.addImage(thegreatbarrIMG);
                 break;
         case 2: fish.addImage(srakeIMG);
                fish.scale = 0.4;
                 break;
         case 3: fish.addImage(stonefishIMG);
                fish.scale = 0.2;
                 break;
         case 4: fish.addImage(BlueringIMG);
                fish.scale = 0.2;
                 break;
         default: break;    
        }

       fish.lifetime = 500;
       fishesGroup.add(fish);
    }
}

function restart(){
    boat.visible = false;
    humansw.visible = false;
    humanst.visible = true;  
    text4.hide();
    gameState = "swim";
    count = 250;
    
}