function Shape(x, y) {
  var types = ["ellipse", "triangle", "rect"];
  var behaviors = ["seek", "arrive"];
  this.shape = types[Math.floor(Math.random() * types.length)];
  

  
  this.color = color(random(255), random(255), random(255));
  this.size = random(5,100);
  this.rotation= random(360);
  this.behavior =  behaviors[Math.floor(Math.random() * behaviors.length)];
  
  // All the usual stuff
  this.position = createVector(x, y);
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.2;  // Maximum steering force
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);

  this.applyBehaviors = function(shapes, x, y) {

	 if ( this.behavior == "seek"){
	     var seekForce = this.seek(createVector(x,y));
	     seekForce.mult(1);
	     this.applyForce(seekForce);
		 
	 	
	 } else {
	     var arrForce = this.arrive(createVector(x,y));
	     this.applyForce(arrForce);
	 	
	 }
	 
     var separateForce = this.separate(shapes);
     separateForce.mult(2);
     this.applyForce(separateForce);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby vehicles and steers away
  this.separate = function(shapes) {
    var desiredseparation = this.size;
    var sum = createVector();
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < shapes.length; i++) {
      var d = p5.Vector.dist(this.position, shapes[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, shapes[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {
    var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }
  
  this.arrive = function(target) {

    var desired = p5.Vector.sub(target, this.position);

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


    var steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxforce);

    this.applyForce(steering);

  }

  // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.display = function() {
	   
	  
    fill(this.color);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation );
	
	if (this.shape == "ellipse"){
		ellipse(0, 0, this.size, this.size);
	} else if (this.shape == "triangle"){
        //var theta = this.velocity.heading() + PI / 2;
		//rotate(theta );
		
		triangle(30, 75, 58, 20, 86, 75);
		
		
	} else {
		rect(0, 0, this.size, this.size);
	}
		
    pop();
  }

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.size) this.position.x =  width+this.size;
    if (this.position.y < -this.size) this.position.y = height+this.size;
    if (this.position.x >  width+this.size) this.position.x = -this.size;
    if (this.position.y > height+this.size) this.position.y = -this.size;
  }
}
