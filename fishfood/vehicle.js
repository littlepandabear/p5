// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Arrive Steering Behavior

function Vehicle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 5;
  this.maxforce = 0.2;
    
  this.h = 40;
  this.r = 9;
  
  this.defaultTargetX;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.arrive = function(target) {	  
	  	  
    var desired = p5.Vector.sub(target, this.pos);

    // desired.setMag(this.maxspeed);

    // The arrive behavior!
    var d = desired.mag();

    if (d < 100) {
      // Map the desired magnitude according to distance
      var m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }


    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);

    this.applyForce(steering);

  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
	
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.vel.heading() + PI / 2;
    fill(252, 165, 3);
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    ellipse(0, -this.r * 2, 20, this.h);
    pop();

  }
  
  this.defaultBehaviour = function(){
  	
	  
          var wh = 500; //waterHeight
          var diff = this.pos.x - this.defaultTargetX;
		  
          if(diff < 100) {//moving right
              if( this.pos.x < width) { //arrived left
                  this.defaultTargetX = width;
                  this.arrive(createVector(this.defaultTargetX, this.pos.y+random(-wh/2, wh/2)));
              } else {// accelerate left
				  this.defaultTargetX = 0;
                  this.arrive(createVector(this.defaultTargetX, this.pos.y+random(-wh/2, wh/2)));
              }
          } else if (diff > 0) {//moving left
              if(Math.abs(diff) < width) { //arrived left
                  this.defaultTarget = width;
                  this.arrive(createVector(this.defaultTargetX, this.pos.y+random(-wh/2, wh/2)));
              } else { //accelerate left
                  this.arrive(createVector(this.defaultTargetX, this.pos.y+random(-wh/2, wh/2)));
              }
          }
	  
  	
  }
  
  this.bounds = function(rect){
      //check rect 
      if ((this.pos.y - this.h) < rect.y) {
          this.vel.y *= -1;
          this.pos.y = rect.y + this.h;
      }
      
      if (this.pos.y  > (rect.h + rect.y) - this.h) {
          this.vel.y *= 1;
          this.pos.y = (rect.h + rect.y) - this.h;
      }
      if (this.pos.x > rect.w) {
          this.vel.x *= -1;
          this.pos.x = rect.w;
      }
      if ((this.pos.x - this.r) < rect.x) {
          this.vel.x *= 1;
          this.pos.x = rect.x + this.h;
      }
      
  }
  
  
}





