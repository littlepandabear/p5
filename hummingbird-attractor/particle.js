// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction

//Rianne
//modified 5/15

var Particle = function(x,y) {
	
  this.images = [
	  loadImage("assets/hummingbird.png"),
	  loadImage("assets/hummingbird-midflap.png"),
	  loadImage("assets/hummingbird-flap.png")];
  
  this.pos = createVector(x,y);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.mass = 1;
  this.counter = 0;


  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);	
    this.acc.mult(0);

    this.counter++;
	
  };

  this.display = function() {
	  
	  if(this.counter % 3 == 0){
          image(this.images[0],this.pos.x, this.pos.y, this.images[0].width/2, this.images[0].height/2);
      } else if(this.counter % 2 == 0){
	      image(this.images[1],this.pos.x, this.pos.y, this.images[1].width/2, this.images[1].height/2);
	  } else {
        image(this.images[2],this.pos.x, this.pos.y, this.images[2].width/2, this.images[2].height/2);
      }

	
  };
}
