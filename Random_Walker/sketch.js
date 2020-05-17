// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Random Walker

//Rianne
//modified 5/17

var clusters = [];

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	
	for (var i = 0; i < 5; i++ ){
		var c = new Cluster();
		c.setup(createVector(random(-width/2,width/2), random(-height/2,height/2), random(-500, 500)))
		clusters.push(c);
		
	}
	
}

function draw() {
	background(0);

	for (var i = 0; i < clusters.length; i++ ){
		clusters[i].update();
		clusters[i].display();
	}
	
}

//cluster of boxes
function Cluster() {
	
	this.boxes =[];	
	
	this.setup = function(pos){
		
		// Make boxes
		for (var i = 0; i < 5; i++ ){
			var b = new Box(pos);
			this.boxes.push(b);
		}
	}
	
	this.update = function(){
		//console.log(this.boxes);
		for (var i = 0; i < this.boxes.length; i++ ){
			this.boxes[i].update();
            this.boxes[i].bounds();
		}
		
	}
	
	this.display = function(){
		///console.log(this.boxes[0].pos);
		// Draw as 3d box
	
			
		push()	
		fill(this.boxes[0].color);
			
		translate(this.boxes[0].pos.x/2,this.boxes[0].pos.y/2,this.boxes[0].pos.z/2);				
		rotateX(this.boxes[0].rot.x)
		rotateY(this.boxes[0].rot.y)
		rotateZ(this.boxes[0].rot.z)
		box(100);
		
		for(var i=1; i < this.boxes.length; i++) {
            //console.log(this.boxes[i]);
			this.boxes[i].display();
		}
		pop()
	}
	
}



//3d box
function Box(pos) {
	this.pos = pos.copy()
	this.rot = createVector(0,0,0);
    this.vel = createVector(0,0,0);

	//box color
	this.color = color(random(255),random(255),random(255));	

	this.angle = 0.0;
	this.offset = 0.0;	
	
	this.update = function(){	
        //console.log("pos",this.pos);

        this.offset += 0.1;
		var inc = TWO_PI / 25.0;
		this.angle += inc;
		
		var v = createVector(noise(this.offset*width), noise(this.offset*random(height)), cos(this.angle));
	    
		this.acc = p5.Vector.add(v, this.pos);
		
	    // Setting the magnitude of that vector
	    this.acc.setMag(.01);

	    // Physics engine algorithm
	    this.vel.add(this.acc);
	    this.pos.add(this.vel);
        
        //rotation
		var rot = createVector( random(.01, .05), random(.01, .05), random(.01, .05));
		this.rot.add(rot);
				
	}
	
	this.display = function() {
        console.log(this.pos);

		// Draw 3d box
		push()
		fill(this.color);		
		
		rotateX(this.rot.x)
		rotateY(this.rot.y)
		rotateZ(this.rot.z)
		box(100); 
		pop()	
		
	
	}
    this.bounds = function() {
		//console.log("bounds:", this.pos)
		
        if (this.pos.y > height) {
          this.vel.y *= -1;
          this.pos.y = height;
        }
        if (this.pos.y < 0) {
          this.vel.y *= 1;
          this.pos.y = 0;
        }

        if (this.pos.x > width) {
          this.vel.x *= -1;
          this.pos.x = width;
        }
	  
        if (this.pos.x < 0) {
          this.vel.x *= 1;
          this.pos.x = 0;
        }

        if (this.pos.z > 500) {
          this.vel.z *= -1;
          this.pos.z = 500;
        }
		
        if (this.pos.z < -500) {
          this.vel.z *= 1;
          this.pos.z = -500;
        }
    }
	
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
