'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var main;   // the global Main object
const FRAME_RATE=30;

function setup() {
  main = new Main();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
  main.run();
  window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}

// Start main class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Main {
  //  Main constructor
  constructor() {

    //Start create a canvas element ++++++++++++++++++++++++++++++++
    this.canvas = document.createElement("canvas");
    this.canvas.style.backgroundColor = 'white';
    //check if canvas was made
    if(!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    //match the dimensions of the canvas div
    this.canvas.width = 1000;
    this.canvas.height = 750;
    //make the canvas a child of the canvas div
    document.getElementById('canDiv').appendChild(this.canvas);
    //  create the context for the canvas
    this.context = this.canvas.getContext("2d");
    //check if context was made
    if(!this.context)
    throw "No valid context found!";
    //End create a canvas element ++++++++++++++++++++++++++++++++
    // declare instance variables for main
    this.menuButtons = [];
    this.makeRect = false;
    this.boids = [];
    this.numBoids = 5;

    //create all initial items
    this.init();

  }

  init(){
    // get the current time
    this.lastTime = Date.now();
    // select canvas for callbacks
    this.canvas.addEventListener('mousemove',this.handleCNVMouseMoved,false);
    this.canvas.addEventListener('mouseover',this.handleCNVMouseOver, false);
    this.canvas.addEventListener('click', this.handleCNVMouseClicked, false);

    // create menu buttons
    this.createMenuButtons();
    this.createBoids();

  }

  run() { // update canvas components --> called from draw()
     this.render();

  }

  render() { // render or draw stuff to canvas
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    for(let k = 0; k < this.numBoids; k++){
      this.boids[k].run();
    }
    if(this.repeller)
      this.repeller.run();

  }
  createBoids(){
    for(let j = 0; j < this.numBoids; j++){
      var xPos = Math.random()*950 + 25;
      var yPos = Math.random()*700 + 25;
      var location = vector2d(xPos, yPos);
      var b = new Boid(this, location);
      this.boids.push(b);
      }
    }
    addRepeller(){
      var repX = Math.random()*950 + 25;
      var repY = Math.random()*700 + 25;
      var repLoc = vector2d(repX, repY);
      this.repeller = new Repeller(this, repLoc);
    }
  // create buttons for menu area
  createMenuButtons(){

     var numButtons = 5;
     //create and style all button divs
     for(let i = 0; i < numButtons; i++){
       // create a button and place it on the DOM tree
       var button = document.createElement('div');
       document.getElementById("menuDiv").appendChild(button);
       // place a button image on the button
       var buttImg = new Image();
       buttImg.src = "buttons/button.png";
       buttImg.id = "b"+i;
       buttImg.on = false;
       button.appendChild(buttImg);
       //  Add event listeners to images (not buttons)
       buttImg.addEventListener('mouseover',buttonMouseOverHandler,false);
       buttImg.addEventListener('mouseout',buttonMouseOutHandler,false);
       buttImg.addEventListener('click', buttonMouseClickHandler,false);
       // style buttons
       button.style.float = "left";
       button.style.marginTop = "5px";
       button.style.marginLeft = "85px";

       //push button into buttons array
       this.menuButtons.push(button);
     }

  }   // end createMenuButtons


}//  end main class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// add functionality to your buttons here

function buttonMouseOverHandler(){
   this.src = "buttons/button.png"
}


function buttonMouseOutHandler(){
  this.src = "buttons/button.png"
}

function buttonMouseClickHandler(){
  if(this.id == "b0"){
    if(!this.on){
      main.canvas.style.backgroundColor = 'black';
      this.on = true;
    }else {
      main.canvas.style.backgroundColor = 'white';
      this.on = false
    }
  }else if (this.id == "b1"){
    if(!this.on){
      for(let h = 0; h < main.numBoids; h++){
        main.boids[h].gravity = true;
      }
      this.on = true;
    }else{
        for(let h = 0; h < main.numBoids; h++){
          main.boids[h].gravity = false;
          main.boids[h].vel = vector2d(Math.random() * 6 - 3,  Math.random() * 6 - 3);
        }
        this.on = false;
    }
  }else if (this.id == "b2"){
    for(let i = 0; i < main.numBoids; i++){
      main.boids[i].randomColor();
    }
  }else if (this.id == "b3"){
    if(!this.on)
      main.addRepeller();
  }else if (this.id == "b4"){

  }
}
