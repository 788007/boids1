'use strict'


// Start Boid class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Boid {
  //  Boid constructor

  constructor(m, location) {
    // declare instance variables for Boid
    this.main = m;
    this.radius = Math.floor(Math.random() * 30) + 10;
    this.color = this.randomColor();
    this.context = this.main.context;
    this.loc = location;
    this.vel = vector2d(Math.random() * 6 - 3,  Math.random() * 6 - 3);
    this.acc = vector2d(0, 0);
    //create all initial items
    this.init();
  }

  init(){
  }

  run() { // update this
    //console.log("Inside boid run");
    this.update();
    this.render();
  }
  update() { // render or draw this to canvas
    this.checkEdges();
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    //this.loc.x+=this.vel.x;
    //this.loc.y+=this.vel.y;
  }
  render() { // render or draw this to canvas
    //console.log("loc.x = " + this.loc.x);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.beginPath();
    this.context.ellipse(this.loc.x, this.loc.y, this.radius, this.radius, 0, 2*Math.PI, false);
  }

  randomColor(){
    var hue = Math.floor(Math.random() * 360);
    var pastel = 'hsl(' + hue + ', 100%, 80%)';
    return pastel;
  }

  checkEdges(){
    //console.log("loc.x = " + this.loc.x);
    //console.log("speedX = " + this.vel.x);
    if(this.loc.x > 1000 ||this.loc.x < 10) this.vel.x *= -1;
    if(this.loc.y > 600 ||this.loc.y < 10) this.vel.y *= -1;

  }

// input vector2d
  addForce(force){
    this.acc.add(force);
  }

}
