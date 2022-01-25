function ParticleSystem() {

  this.particles = [];

  this.addParticle = function(x, y) {
	  this.origin = createVector(x,y);
	  this.particles.push(new Particle(this.origin))
  }

  this.run = function() {
	  for (var i = this.particles.length-1; i >= 0; i--) {
		  var p = this.particles[i];
	      p.run();
	      if (p.isDead()) {
	          this.particles.splice(i,1);
	      }
	  }
  }
}


function Particle(v) {

  this.pos = createVector(v.x, v.y);
  this.vel = createVector(random(-1, 1), random(-1, 0));
  this.acc = createVector(0,0.05)
  this.size = random(5,30);
  this.lifespan = 255;
  
  this.run = function(){
  	this.update()
	this.display()
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
	this.lifespan -= 2;
	
  }

  this.display = function() {
    // Draw Walker as circle
    fill(255, this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  
  this.isDead = function(){
	  if (this.lifespan < 0.0) {
	     return true;
	  } else {
	     return false;
	  }
  }
  
}
