var flower; //attractor
var bird; //particle
var bgColor;

var isDragging = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  flower = new Attractor(width/2, height/2 - 200);
  bird = new Particle(random(width),random(height));
  bgColor = color(random(255),random(255),random(255));

}

function draw() {
  clear()
  background(bgColor);
  
  if (isDragging){
	  flower.update(mouseX,  mouseY );
  }  
  flower.display();
  

  // Flower attracts hummingbird
  var force = flower.calculateAttraction(bird);
  bird.applyForce(force);

  bird.update();
  bird.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved(){
	//change cursor if mouse is over png 
    var pixel = flower.img.get(mouseX - flower.pos.x, mouseY-flower.pos.y);
	if (pixel[0] > 0){//check if pixel is transparent
 	   cursor(MOVE); 
	} else {
		cursor(HAND);  
	}
}

function mousePressed() {
  //set isDragging to true if mouse press is over png 
  var pixel = flower.img.get(mouseX - flower.pos.x, mouseY-flower.pos.y);
  if (pixel[0] > 0){ //check if pixel is transparent
	  isDragging = true;
  }  
  
}

function mouseReleased() {
  isDragging = false;
}