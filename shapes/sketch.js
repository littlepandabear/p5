
var mouseClicked = false;
var offset = 0;
var x;
var y;

var shapes = [];


function setup() {
	
    createCanvas(windowWidth, windowHeight);


  // shapes
  for (var i = 0; i < 75; i++) {
    shapes[i]=(new Shape(random(width),random(height)));
  }
}

function draw() {
  background(220);

  if (!mouseClicked){
 	 x = noise(offset) * width;
 	 y = noise(offset) * height;
 	 offset += 0.05;
  } 

  // shapes
  for (var i = 0; i < shapes.length; i++) {
	  
      shapes[i].applyBehaviors(shapes, x, y);
      shapes[i].update();
      shapes[i].borders();
      shapes[i].display();

  }


}


function mousePressed() {
	
	mouseClicked = true;
    x = mouseX;
 	y = mouseY;
}

function mouseReleased() {
	
	mouseClicked = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
