// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Drag Force

function Particle(x,y) {
  this.mass = 1;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.diameter = this.mass*16;
  this.alpha = 255;
  this.isActive = true

  // Newton's 2nd law: F = M * A
  // or A = F / M
  this.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  };

  this.update = function() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  };

  this.display = function() {
    fill(201, 104, 75,  this.alpha);
    ellipse(this.position.x,this.position.y,this.diameter,this.diameter);
  };

  // Bounce off bottom of window
  this.checkEdges = function() {
    if (this.position.y > height) {
      this.velocity.y *= -0.9;  // A little dampening when hitting the bottom
      this.position.y = height;
    }
  };
  
  this.checkIntersection = function(vehicle){
	  
	  
	  console.log ( !(vehicle.pos.x   > (this.position.x + this.diameter) || 
             (vehicle.pos.x + vehicle.w) <  this.position.x  || 
              vehicle.pos.y  > (this.position.y + this.diameter) ||
	  (vehicle.pos.y + vehicle.h) <  this.position.y)) 
	  
	  if ( !(vehicle.pos.x   > (this.position.x + this.diameter) || 
             (vehicle.pos.x + vehicle.w) <  this.position.x  || 
              vehicle.pos.y  > (this.position.y + this.diameter) ||
	  (vehicle.pos.y + vehicle.h) <  this.position.y) == true) {
		  	
			  this.alpha-=50;
		  }   
	  
	  if ( this.alpha <= 0){
		  this.alpha = 0;
		  this.isActive = false;
		  
	  }
	
	  
  	
  }
  
  

}
