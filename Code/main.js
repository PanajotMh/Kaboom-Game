import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("bean", "sprites/bean.png");
loadSprite("playButton", "sprites/play_button.png");
loadSprite("shop", "sprites/Shop.png");
loadSprite("question", "sprites/Question.png");
loadSprite("spaceBackground", "sprites/SpaceBackground.png");
loadSprite("upSpike", "sprites/Up_Spike.png");
loadSprite("Coin", "sprites/Coin.png");
loadSprite("MainBackground", "sprites/MainBackground.jpg");
loadSprite("black", "sprites/black.jpeg");
loadSprite("Heart", "sprites/Heart.png");
loadSprite("Broken_Heart", "sprites/Broken_Heart.png"); // Renamed to remove space
loadSprite("Back_Button", "sprites/Back_Button.png");
loadSprite("shopEmoji1", "sprites/flipped_dove3.png");
loadSprite("shopEmoji2", "sprites/Emoji.png");
loadSprite("shopEmoji3", "sprites/Spaceship.png");
loadSprite("How_to_play", "sprites/How_To_Play.png");


loadSound("song1", "sounds/sideways_city_loop.mp3");
loadSound("song2", "sounds/danger.mp3");
loadSound("song3", "sounds/Picked Coin Echo 2.mp3");
loadSound("song4", "sounds/ouch.mp3");



var Coins_Amount = 500;
//var score = 0;
var birdyBought = false
var dinoBought = false
var rocketBought = false
var skin = "bean"
var purchaseUno = 0
var purchaseDuo = 0
var purchaseTrio = 0

const song1 = play("song1", { loop: true, volume: 0.5 })
const song2 = play("song2", { loop: true, volume: 0.5 })
const song3 = play("song3", { loop: false, volume: 0.5 })
const song4 = play("song4", { loop: false, volume: 0.5 })





scene("Main_Screen", () => {  //This is one whole scene

  song1.play()
  song2.stop()
  song3.stop()
  song4.stop()

  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("MainBackground", {width: width(), height: height()})
    ]);


  add([
    text("Jumperoo"),
    pos(width()/2 - 230,height()/2 - 350),
    scale(1)
    
  ])
  
  function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])

	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 10
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(1.2)
		} else {
			btn.scale = vec2(1)
			btn.color = rgb()
		}
	})                     //add buttons which react upon hovering on them.

}
      add([ 
      sprite("playButton"),
      pos(width()/2 -360, height()/2 -200),
      scale(0.3),
      // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
    
      ]);
  
    add([ 
      sprite("shop"),
      pos(width()/2 -340, height()/2 -15),
      scale(0.3),
    
      ]);
  
     add([ 
      sprite("question"),
      pos(width()/2 -340, height()/2 + 200),
      scale(0.3),    
      ]);

  
     add([ 
      sprite("Coin"),
      pos(width()/2 +740, height()/2 -470),
      scale(0.2),    
      ]);
  
      const Coins = add([
      text(Coins_Amount),
      pos(width()/2 +875, height()/2 -450),
      //{ Coins_Amount: 0 },
      ])
  
      onUpdate(() => {
        Coins.text = Coins_Amount
      })
  
      //var Score = add([
      //text(Score),
     // pos(width()/2 +875, height()/2 -450),
      //])

  add([
    text("Screen looking weird? Make sure to set your browser at 75% zoom. + Fullscreen, then reload"),
    pos(),
    scale(0.23)
    
  ])
  
  addButton("Start", vec2(width()/2 -50, height()/2 - 100), () => 
  go("Main_Game"))
  addButton("Shop", vec2(width()/2 -50, height()/2 +93), () =>
  go("Shop_Screen"))
  addButton("How To\nplaY", vec2(width()/2 - 15, height()/2 +300), () =>
  go("howToPlay")),

    
  add([
    text("Version 1.0.0, using Kaboom 2000"), 
    pos( width()/2 -1000  , height()- 75),
    scale(0.55),
    area()
  ])

  
  // reset cursor to default at frame start for easier cursor management
  onUpdate(() => cursor("default"))

});
  

scene("Main_Game", () => {  //This is one whole scene
   song1.pause()
   song2.play()

  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("spaceBackground", {width: width(), height: height()}), 
    fixed()         //spacebackground
    ]);

  
  var SPEED =  300      //speed of the player
  var Spike_Gap = 100;  
  var Lives_Left = 3;
  var xJump = 600;
  


function createHearts(livesLeft) {
  destroyAll("hearts")
  let xDisplacement = 0; 
  if (Lives_Left == 3) {
    for (let i = 0; i < 3; i++) { 
      add([
        sprite("Heart"),
        origin("topright"),
        pos(width() + xDisplacement, 0),
        scale(0.15),
        "hearts"
      ]) //Adding a new heart
      xDisplacement -= 77
    } //Spawn 3 of the normal hearts
  } else if (Lives_Left == 2) { 
    add([
      sprite("Broken_Heart"),
      origin("topright"),
      pos(width() + xDisplacement, 0),
      scale(0.15),
      color(32,32,32),
      "hearts"
    ]) 
    xDisplacement -= 77
    for (let i = 0; i < 2; i++) { 
      add([
        sprite("Heart"),
        origin("topright"),
        pos(width() + xDisplacement, 0),
        scale(0.15),
        "hearts"
      ]) 
      xDisplacement -= 77
    }
  } else if (Lives_Left == 1) {
    for (let i = 0; i < 2; i++) { 
      add([
        sprite("Broken_Heart"),
        origin("topright"),
        pos(width() + xDisplacement, 0),
        scale(0.15),
        color(32,32,32),
        "hearts"
      ]) 
      xDisplacement -= 77
    } 
    add([
        sprite("Heart"),
        origin("topright"),
        pos(width() + xDisplacement, 0),
        scale(0.15),
        "hearts"
      ]) 
  } else if (Lives_Left == 0) {
    for (let i = 0; i < 3; i++) { 
      add([
        sprite("Broken_Heart"),
        origin("topright"),
        pos(width() + xDisplacement, 0),
        scale(0.15),
        color(32,32,32),
        "hearts",
      ]) 
      xDisplacement -= 77
    } 
  }
} 

  

  const player = add([
    sprite(skin),
    scale(1.5), 
    //pos(80, 40),
    pos(500,500),
    area(),
    body(), 
    "Player_Trigger",
    "Player",
  ]);

let time = 0
loop(1, () => {
  destroyAll("times")

    const timer = add([
      text((Math.trunc(time/60) + "m" + (Math.round(time % 60)) + "s"), 
      { size: 25}), 
      "times",
      pos(0,0),
      ])
  
    time += 1
    

});

loop(1, () => {
  destroyAll("scoreText")
  
  
  const score = add([
    text("Score:"+(time*10 - 5)),
    pos(70,0),
    { size: 25},
    "scoreText"
  ])
})

/*   function Produce_Spikes(){  
    //const offset = rand(-500, 500);    //the offset of the spike gaps, ranges from -50 to 50
    
    add([
       sprite("upSpike"),
       //pos(width()  -1000 + offset, -26),
       pos(rand(0,width()),0),
       rotate(-180),
       scale(0.2),  
       "Spike",
       origin("center"),
       area(),
     ]); 
  
  }; */

let totalDelay = 7
   function Produce_Spikes(){  
    //const offset = rand(-500, 500);    //the offset of the spike gaps, ranges from -50 to 50
    
    add([
       sprite("upSpike"),
       //pos(width()  -1000 + offset, -26),
       pos(rand(0,width()),0),
       rotate(-180),
       scale(0.2),  
       "Spike",
       origin("center"),
       area(),
     ]); 

    totalDelay = Math.max(totalDelay - 1, 2)
    //debug.log(totalDelay)
    wait(totalDelay, () => { Produce_Spikes() })
}
Produce_Spikes()




let totalDelay2 = 7
   function Produce_Spikes2(){  
    //const offset = rand(-500, 500);    //the offset of the spike gaps, ranges from -50 to 50
    
    add([
       sprite("upSpike"),
       //pos(width()  -1000 + offset, -26),
       pos(rand(0,width()),0),
       rotate(-180),
       scale(0.2),  
       "Spike",
       origin("center"),
       area(),
     ]); 

    totalDelay = Math.max(totalDelay - 1, 2)
    debug.log(totalDelay2)
    wait(totalDelay2, () => { Produce_Spikes() })
}
Produce_Spikes2() 
  
/*   loop(1, () => {   //this function, for the number we give it. (seconds)  We should produce spikes
    Produce_Spikes();
  }) */


let totalDelay3 = 20
   function Produce_Spikes3(){  
    //const offset = rand(-500, 500);    //the offset of the spike gaps, ranges from -50 to 50
    
    add([
       sprite("upSpike"),  //Spikes that go to the right
       //pos(width()  -1000 + offset, -26),
       pos(width()/2-800,random(height())),
       rotate(90),
       scale(0.2),  
       origin("center"),
       "Spike2",
       origin("center"),
       area(),
     ]); 

    totalDelay = Math.max(totalDelay - 1, 2)
    debug.log(totalDelay2)
    wait(totalDelay2, () => { Produce_Spikes() })
}
Produce_Spikes2() 
      
  add([
    rect(1, height()),
    layer("ui"),
    area(),
    pos(width(),0),
    origin("topleft"),
    opacity(0),
    "rightWall",
    solid(),
  ]);      

  add([ //Make invisible left wall so player can't go out of bounds, makes player move back if they hit this
    rect(1, height()),
    layer("ui"),
    area(),
    pos(0,0),
    origin("topright"),
    opacity(0),
    "leftWall",
    ]);


  add([ //Make invisible bottom wall so player can't go out of bounds, makes player move back if they hit this
    rect( width(),1),
    layer("ui"),
    area(),
    pos(0 ,height()),
    opacity(0),
    "bottomWall",
    solid()
    ]);

  add([ //Make invisible top wall so player can't go out of bounds, makes player move back if they hit this
    rect( width(),1),
    layer("ui"),
    area(),
    pos(0,0),
    origin("topleft"),
    opacity(0),
    "topWall",
    solid()
    ]);

  function Coin_Caller() {
    let coin = add([
    sprite("Coin"),
    pos(rand(0,width()), rand(0,height())),
    "CoinTrigger",
    area(),
    scale(0.2),
    //origin("topright"),
    cleanup(0.5),
    
    ]);

  wait(5, ()=>destroy(coin));

  }

  function DestroyObjects() {
      wait(1, () => {
      destroyAll("Spike","Coin")    
      }) 
      SPEED = 0
      xJump = -420
      
      wait(2, () => {
      destroyAll("Heart","Hearts")    
      })    
  }

  onUpdate("Spike", (Spike) => {
    Spike.move(0,160)
  }); //something we want to do to certain game objects every frame

  onUpdate("Spike2", (Spike2) => {
    Spike2.move(160,0)
  });
  
  player.onCollide("rightWall",(bean)=>{  
    SPEED = -SPEED,
    player.flipX(true)

  })
  player.onCollide("leftWall",(bean)=>{
    SPEED = -SPEED
    player.flipX(false)
    
  })
  
  onUpdate("Player_Trigger", (Player_Trigger) => {
    
      Player_Trigger.move(SPEED,0);    
  });
  
   onCollide("Player", "Coin", (CoinCollision, _) => {
    debug.log("Picking up coins is under development.")
    
  }); 

  onCollide("Player", "Spike", (TouchedSpike, _) => {
    //go("Game_Over");
  //debug.log('touched spike');
  shake(15),
  Lives_Left -= 1,
  createHearts(Lives_Left)
  //debug.log(Lives_Left)
  play("song4")
  
  if(Lives_Left == 0){
      DestroyObjects()
      wait(2, () => {
      go("Game_Over",time)    
      })
  } 

  });

  loop(3.5, () => {   
    Coin_Caller();
  });

  onCollide("Player", "CoinTrigger", (Player,Coin, _) => {
    //go("Game_Over");
  destroy(Coin);
  Coins_Amount += 1,
  debug.log("You now have:"+Coins_Amount+" coins.")
  play("song3")
  })


  onKeyPress("space", () => {
     //debug.log('space pressed'); //shows that this block of   
      //                          code works.
  player.jump(xJump);
  });

  createHearts(Lives_Left)

});

//go("Main_Screen", Coins_Amount);



scene("Game_Over", (time) => {  //This is one whole scene
  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("black", {width: width(), height: height()})  //spacebackground
  ]);

  add([
    text("Game over!"),  
    scale(1.5),
    pos(width()/2, height()/5),
    origin("center"),
    layer("game")
  ]);

  add([
    text("Well done!, you now have:"+ Coins_Amount+" coins.")
  ])  
  
   add([
    text("Your score was " + ((time*10 - 5*time)*2) ),
    scale(0.75),
    pos(width()/2, height()*4/10),
    layer("game"),
    origin("center")
  ]) 

  add([
    text("You survived for: "+(Math.trunc(time/60) + "m" + (Math.round(time % 60)) + "s")), 
    scale(0.75),
    pos(width()/2, height()*4/10 +200),
    layer("game"),
    origin("center"),
  ])

   wait(4, () => {
   //go("Main_Screen",Coins_Amount)    
     go("Maths_Trivia",time)
   }) 
  
});

scene("Shop_Screen", () => {  //This is one whole scene
  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("black", {width: width(), height: height()})  //spacebackground
  ]);

  
  add([
    text("Shop"),  
    scale(1.5),
    pos(width()/2, height()/5),
    origin("center"),
  ]); 

  add([
    sprite("shopEmoji1"),
    //pos(width()  -1000 + offset, -26),
    pos(width()/2 -400,height()/2 - 100),
    scale(2),  
    "purchaseEmoji1",
    origin("center"),
    area()
    ]);


    const purchaseButton1 = add([
    text("Buy"),            //num1-1 + 1 
    pos(width()/2 -400, height()/2 +160),
    area({ cursor:""}),
    scale(0.65),
    fixed(),
    origin("center"),
    "buttonEmoji1"
  ])

  onUpdate(() => {
    if(birdyBought == true){
      destroyAll("buttonEmoji1")
  }})

  add([
    sprite("Coin"),
    //pos(width()  -1000 + offset, -26),
    pos(width()/2 -440,height()/2 + 60),
    scale(0.1),  
    origin("center"),
    area(),
    "coinEmoji1"
  ]);

  add([
    text("x200"),  
    scale(0.6),
    pos(width()/2 -360, height()/2 +60),
    origin("center"),
    "textEmoji1"
  ]) 


  add([
    sprite("shopEmoji2"),
    //pos(width()  -1000 + offset, -26),
    pos(width()/2 ,height()/2 - 100),
    scale(2),  
    "purchaseEmoji2",
    origin("center"),
    area()
  ]);

  const purchaseButton2 = add([
    text("Buy"),            //num1-1 + 1 
    pos(width()/2 , height()/2 +160),
    area({ cursor:""}),
    scale(0.65),
    fixed(),
    origin("center"),
    "buttonEmoji2"
  ]);

  onUpdate(() => {
    if(dinoBought == true){
      destroyAll("buttonEmoji2")
  }})

  add([
    sprite("Coin"),
    //pos(width()  -1000 + offset, -26),
    pos(width()/2 -60,height()/2 + 60),
    scale(0.1),  
    origin("center"),
    area(),
    "coinEmoji2"
  ]);

  add([
    text("x200"),  
    scale(0.6),
    pos(width()/2 + 30, height()/2 +60),
    origin("center"),
    "coinEmoji2"
  ]);
  
  add([
    sprite("shopEmoji3"),
    //pos(width()  -1000 + offset, -26),
    pos(width()/2 +400,height()/2 - 100),
    scale(2),  
    "purchaseEmoji3",
    origin("center"),
    area()
  ]);

  const purchaseButton3 = add([
    text("Buy"),            //num1-1 + 1 
    pos(width()/2 +400, height()/2 +160),
    area({ cursor:""}),
    scale(0.65),
    fixed(),
    origin("center"),
    "buttonEmoji3"
  ]);
  
  onUpdate(() => {
    if(rocketBought == true){
      destroyAll("buttonEmoji3")
  }})


  add([
    sprite("Coin"),
    //pos(width()  -1000 + offset, -26),
    pos(width()/2 +350,height()/2 + 60),
    scale(0.1),  
    origin("center"),
    area(),
    "coinEmoji3"
  ]);

  add([
    text("x200"),  
    scale(0.6),
    pos(width()/2 + 440, height()/2 +60),
    origin("center"),
    "coinEmoji3"
  ]);


  const Back = add([
  // list of components
    sprite("Back_Button"),
    scale(2.5), //how big the sprite is
    pos(width()/2 - 1000, height()/2 +300),
    area(),
    "backButton"
  ]);
  
  add([ 
    sprite("Coin"),
    pos(width()/2 +740, height()/2 -470),
    scale(0.2),    
  ]);
  
  
  const Coins = add([
    text(Coins_Amount),
    pos(width()/2 +875, height()/2 -440),
    scale(0.7)
    //{ Coins_Amount: 0 },
  ]);

  
  purchaseButton1.onClick(() => {
    if (Coins_Amount >= 200 && birdyBought == false){
      skin = "shopEmoji1"
      destroy(purchaseButton1)
      //debug.log("Inside buy!")
      Coins_Amount -= 200
      birdyBought = true
      //debug.log(Coins_Amount)
      //debug.log(birdyBought)
      purchaseUno += 1
    }else{
      shake(10)
    }
  })

    

  onUpdate(() => {
    if (birdyBought == true && purchaseUno == 1){
      Coins.text -= 200
      //debug.log("Change coins?")
      purchaseUno += 1
  }})


  
  purchaseButton2.onClick(() => {
    if (Coins_Amount >= 200 && dinoBought == false){
      skin = "shopEmoji2"
      destroy(purchaseButton2)
      //debug.log("Inside buy.2!")
      Coins_Amount -= 200
      dinoBought = true
      //debug.log(Coins_Amount)
      //debug.log(dinoBought)
      purchaseDuo += 1
    }else{
      shake(10)
    }
  })

  
  onUpdate(() => {
    if (dinoBought == true && purchaseDuo == 1){
      Coins.text -= 200
      //debug.log("Change coins?")
      purchaseDuo += 1
  }})

  purchaseButton3.onClick(() => {
    if (Coins_Amount >= 200 && rocketBought == false){
      skin = "shopEmoji3"
      destroy(purchaseButton3)
      //debug.log("Inside buy.2!")
      Coins_Amount -= 200
      rocketBought = true
      //debug.log(Coins_Amount)
      //debug.log(rocketBought)
      purchaseTrio += 1
  }else{
      shake(10)
    }
  })

  
  onUpdate(() => {
    if (rocketBought == true && purchaseTrio == 1){
      Coins.text -= 200
      //debug.log("Change coins?")
      purchaseTrio += 1
  }})


  add([
    sprite("bean"),
    //pos(width()  -1000 + offset, -26),
    pos(width()/2 +700,height()/2 +300),
    scale(2),  
    "beanTag",
    origin("center"),
    area()
  ]);

  add([
    
    text("If you want to equip me again \njust click me!"),
    scale(0.4),
    pos(width()/2 +400,height()/2 +400)
  ])

  onClick("purchaseEmoji1",() => {
    if(birdyBought == true){
      skin = "shopEmoji1"
    }
  })

  onClick("purchaseEmoji2",() => {
    if(dinoBought == true){
      skin = "shopEmoji2"
    }
  })


  onClick("purchaseEmoji3",() => {
    if(rocketBought == true){
      skin = "shopEmoji3"
    }
  })

  onClick("beanTag",() => {
    if(rocketBought == true){
      skin = "bean"
    }
  })
      
  onClick("backButton", () => go("Main_Screen"))

})

scene("Maths_Trivia", (time) => {  //This is one whole scene
  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("black", {width: width(), height: height()})  //spacebackground
  ]);
  
  let number1 = randi(1, 10); //Random integer between 1 and 10
  let number2 = randi(1, 10); //Random integer between 1 and 10
  let answer = number1 + number2; //Correct answer is the numbers added together

  //WRONG ANSWER GENERATION
  var wrong1 = randi(answer / 2, answer * 2); //Range of incorrect answers
  var wrong2 = randi(answer / 2, answer * 2); //Between half and double correct answer
  var wrong3 = randi(answer / 2, answer * 2); //Between half and double correct answer
  

  while (wrong1 == answer || wrong2 == answer || wrong3 == answer || wrong1 == wrong2 || wrong2 == wrong3 || wrong3 == wrong1) {
    var wrong1 = randi(answer / 2, answer * 2); //Wrong answer is between half to double the correct answer
    var wrong2 = randi(answer / 2, answer * 2);
    var wrong3 = randi(answer / 2, answer * 2);
  } //prevent duplicate answers */


  add([ //output the question on the screen
    text("What is " + number1 + " + " + number2),
    pos(width() / 2, height() / 5 + 250),
    origin("center"),
    scale(1.5),
    layer("game"),
    "screenText"
  ]) //output question
  
  add([
    text("You earned your chance \n to do a math question!"),  
    scale(0.5),
    pos(width()/2, height()/5),
    origin("center"),
  ]) 

  add([
    text("Remember if you get the questions right you earn money, \n if not you lose money!"),  
    scale(0.5),
    pos(width()/2, height()/5 + 100),
    origin("center"),
  ]) 



  let correctButton = randi(0, 3); //Choose a random number from 0-3 to be the correct lane
  if (correctButton == 0) { //If button 1 is correct 
    
  const button1 = add([
    text(answer),            //num1-1 + 1 
    pos(width()/2 -500, height()/5 +600),
    area({ cursor:""}),
    scale(0.65),
    fixed(),
    origin("center"),
    "button11"
  ])

  const button2 = add([
    text(wrong1),
    pos(width()/2 -500, height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button12"
  ])
  
  const button3 = add([
    text(wrong2),
    pos(width()/2 +450 , height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button13"
  ])
  
  const button4 = add([
    text(wrong3),
    pos(width()/2 +450 , height()/5 + 600),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button14"
    
  ])

    correctBn = "buttonOne" //correct button name
    button1.onClick( () => go("correctMath",time))
    button2.onClick( () => go("wrongMath",time))
    button3.onClick( () => go("wrongMath",time))
    button4.onClick( () => go("wrongMath",time))

  } else if (correctButton == 1) { //Use randomly generated number to create answer in corresponding lane (eg. correctLane = 0 --> laneA is correct)
    
  const button1 = add([
    text(wrong1),            //num1-1 + 1 
    pos(width()/2 -500, height()/5 +600),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button21"
  ])

  const button2 = add([
    text(answer),
    pos(width()/2 -500, height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button22"
  ])
  
  const button3 = add([
    text(wrong2),
    pos(width()/2 +450 , height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button23"
  ])
  
  const button4 = add([
    text(wrong3),
    pos(width()/2 +450 , height()/5 + 600),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button24"
  ])

    correctBn = "buttonTwo"
    button1.onClick( () => go("wrongMath",time))
    button2.onClick( () => go("correctMath",time))
    button3.onClick( () => go("wrongMath",time))
    button4.onClick( () => go("wrongMath",time))


    
    //onClick("button22", (button22) => debug.log("I have been clicked.  I'm correct 22"))

  } else if (correctButton == 2) { //Lane C is correct (3rd lane)
        
  const button1 = add([
    text(wrong1),            //num1-1 + 1 
    pos(width()/2 -500, height()/5 +600),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button31"
  ])

  const button2 = add([
    text(wrong2),
    pos(width()/2 -500, height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button32"
  ])
  
   const button3 = add([
    text(answer),
    pos(width()/2 +450 , height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button33"
  ])
  
  const button4 = add([
    text(wrong3),
    pos(width()/2 +450 , height()/5 + 600),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button34"
  ])

    correctBn = "buttonThree"
    button1.onClick( () => go("wrongMath",time))
    button2.onClick( () => go("wrongMath",time))
    button3.onClick( () => go("correctMath",time))
    button4.onClick( () => go("wrongMath",time))


    //onClick("button33", (button33) => debug.log("I have been clicked.  I'm correct 33"))

  } else if (correctButton == 3) { //Lane C is correct (3rd lane)
        
  const button1 = add([
    text(wrong1),            //num1-1 + 1 
    pos(width()/2 -500, height()/5 +600),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button41"
  ])

  const button2 = add([
    text(wrong2),
    pos(width()/2 -500, height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button42"
  ])
  
  const button3 = add([
    text(wrong3),
    pos(width()/2 +450 , height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button43"
  ])
  
  const button4 = add([
    text(answer),
    pos(width()/2 +450 , height()/5 + 600),
    area(),
    scale(0.65),
    fixed(),
    origin("center"),
    "button44"
  ])

    correctBn = "buttonFour"
    button1.onClick( () => go("wrongMath",time))
    button2.onClick( () => go("wrongMath",time))
    button3.onClick( () => go("wrongMath",time))
    button4.onClick( () => go("correctMath",time))

    //onClick("button44", (button44) => debug.log("I have been clicked.  I'm correct 44"))
  };

  
  


  
/*   button1 = add([
    text("I'm here"),            //num1-1 + 1 
    pos(width()/2 -500, height()/5 +600),
    area(),
    scale(0.65),
    fixed(),
    origin("center")
  ])

  button2 = add([
    text("I'm here .2"),
    pos(width()/2 -500, height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center")
  ])
  
  button3 = add([
    text("I'm here.3"),
    pos(width()/2 +450 , height()/5 +450),
    area(),
    scale(0.65),
    fixed(),
    origin("center")
  ])
  
  button4 = add([
    text("I'm here.4"),
    pos(width()/2 +450 , height()/5 + 600),
    area(),
    scale(0.65),
    fixed(),
    origin("center")
  ]) */

  

});



scene("howToPlay", () => {  //This is one whole scene
  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("How_to_play", {width: width(), height: height()})  //spacebackground
  ]);
  
  const Back = add([
  // list of components
    sprite("Back_Button"),
    scale(2), //how big the sprite is
    pos(width()/2 -900, height()/2 +350),
    area(),
    "backButton",
  ])

  
  
  onClick("backButton", () => go("Main_Screen"))


 
})

scene("correctMath", (time) => {  //This is one whole scene
  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("black", {width: width(), height: height()})  //spacebackground
  ]);
  add([
    text("Well done you got the question correct!"),  
    scale(0.6),
    pos(width()/2 + 440, height()/2 +60),
    origin("center")
    ])

   add([
    text("You earned: " + ((time*10 - 5*time)*2)/10 +" coins. :D"),
    scale(0.75),
    pos(width()/2 + 440, height()/2 +180),
    layer("game"),
    origin("center")
  ])

  Coins_Amount += ((((time*10 - 5*time)*2)/10)+2)
  
   wait(4, () => {
   //go("Main_Screen",Coins_Amount)    
     go("Main_Screen")
   }) 
})


scene("wrongMath", (time) => {  //This is one whole scene
  add([   //this is an array which takes in "characterstics" of your sprite.
  sprite("black", {width: width(), height: height()})  //spacebackground
  ]);

  
  add([
    text("Oh no, you got it wrong!"),  
    scale(0.6),
    pos(width()/2 + 440, height()/2 +60),
    origin("center")
    ])

   add([
    text("You lost:" + (((time*10 - 5*time)*2)/10-2)  +" coins."),
    scale(0.75),
    pos(width()/2 + 440, height()/2 +180),
    layer("game"),
    origin("center")
  ])

  Coins_Amount -= (((time*10 - 5*time)*2)/10)

   wait(4, () => {
   //go("Main_Screen",Coins_Amount)    
     go("Main_Screen")
   }) 
  

})



 go("Main_Screen")


