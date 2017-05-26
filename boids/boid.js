'use strict'


// Start Boid class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Boid {
  //  Boid constructor

  constructor(m, location) {
    // declare instance variables for Boid
    this.main = m;
    this.radius = Math.floor(Math.random() * 30) + 10;
    this.randomColor();
    this.context = this.main.context;
    this.loc = location;
    this.vel = vector2d(Math.random() * 6 - 3,  Math.random() * 6 - 3);
    this.acc = vector2d(0, 0);
    this.gravity = false;
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
    if(main.repeller){
      if(this.loc.dist(main.repeller.loc) < 100){
        this.repForce = this.loc.distVector(main.repeller.loc);
        this.repForce.normalize();
        this.repForce.x *= -1.5;
        this.repForce.y *= -1.5;
        this.applyForce(this.repForce);
        console.log(this.repForce.x, this.repForce.y);
      }
    }
    if(this.gravity){
      this.applyForce(vector2d(0.0, 4.0));
    }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc = vector2d(0, 0);
  }
  render() { // render or draw this to canvas
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.beginPath();
    this.context.ellipse(this.loc.x, this.loc.y, this.radius, this.radius, 0, 2*Math.PI, false);
  }

  randomColor(){
    var hue = Math.floor(Math.random() * 360);
    var pastel = 'hsl(' + hue + ', 100%, 80%)';
    this.color = pastel;
  }

  checkEdges(){
    if(this.loc.x + this.radius >= 1000){
      this.loc.x = 1000 - this.radius;
      this.vel.x *= -1;
    }else if (this.loc.x - this.radius <= 10){
      this.loc.x = 10 + this.radius;
      this.vel.x *= -1;
    }
    if(this.loc.y  + this.radius >= 750 && this.vel.y > 0) {
      this.loc.y = 750 - this.radius;
      this.vel.y *= -1;
      if(this.gravity){
        this.vel.x *= .95;
        this.vel.y *= .9;
        //console.log(this.vel.y);
      }
    }else if (this.loc.y - this.radius <= 10){
      this.loc.y = 10 + this.radius;
      this.vel.y *= -1;
    }

  }

// input vector2d
  applyForce(force){
    this.acc.add(force);
  }


}
