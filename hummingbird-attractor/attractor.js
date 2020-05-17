// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction

//Rianne 
//modified 5/15

var Attractor = function(x,y) {

  this.img = loadImage("assets/flower.png");
  
  this.pos = createVector(x,y);
  this.mass = 20;
  this.G = 1;
    
  this.calculateAttraction = function(p) {
    // Calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // Distance between objects
    var distance = force.mag();
    // Artificial constraint
    distance = constrain(distance, 5, 10);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();
    // Calculate gravitional force magnitude
    var strength = (this.G * this.mass * p.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }
  
  this.update = function(x,y){
      this.pos = createVector(x-this.img.width/2,y-this.img.height/2);
  }

  // Method to display
  this.display = function() {	  
     image(this.img,this.pos.x, this.pos.y, this.img.width, this.img.height);
	   
  }
}