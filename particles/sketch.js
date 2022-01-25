var ps;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Make a Walker object
  ps = new ParticleSystem();
}

function draw() {
  background(50);
  // Update and display object
  ps.addParticle(mouseX, mouseY);
  ps.run();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}