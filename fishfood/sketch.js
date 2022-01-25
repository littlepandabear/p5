// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Arrive Steering Behavior

// Liquid
var liquid;
// A vehicle
var vehicle;
// Vehicle's target
var particle;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create liquid object
  liquid = new Liquid(0, height / 2, width, height / 2);
    
  // Create the vehicle
  vehicle = new Vehicle(width/2, height/2 + 100);
  vehicle.defaultTargetX = width;
	
}

function draw() {
  background(51);
  // Draw water
  liquid.display();
  
    
  if(particle && particle.isActive){//if particle is created
	  	  
    
      // Is the Mover in the liquid?
      if (liquid.contains(particle)) {
        // Calculate drag force
        var dragForce = liquid.calculateDrag(particle);
        // Apply drag force to Mover
        particle.applyForce(dragForce);
      }

       // Gravity is scaled by mass here!
      var gravity = createVector(0, 0.1 * particle.mass);
      // Apply gravity
      particle.applyForce(gravity);

      // Update and display
      particle.update();
      particle.display();
      particle.checkEdges();
	  
      // Arrive at the target
      vehicle.arrive(particle.position);
	  
	  particle.checkIntersection(vehicle);
	  

  } else {
  	vehicle.defaultBehaviour()
  	
  }
  
  // Update and display
  vehicle.bounds(liquid);
  vehicle.update();
  vehicle.display();
    
}

function mouseClicked(){
    //create target
    particle = new Particle(mouseX,mouseY);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
