// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Drag Force

function Liquid(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = 0.1;

  // Is the Mover in the Liquid?
  this.contains = function(m) {
    var l = m.position;
    return l.x > this.x && l.x < this.x + this.w &&
           l.y > this.y && l.y < this.y + this.h;
  };

  // Calculate drag force
  this.calculateDrag = function(m) {
    // Magnitude is coefficient * speed squared
    var speed = m.velocity.mag();
    var dragMagnitude = this.c * speed * speed;

    // Direction is inverse of velocity
    var dragForce = m.velocity.copy();
    dragForce.mult(-1);

    // Scale according to magnitude
    dragForce.setMag(dragMagnitude);
    return dragForce;
  }

  this.display = function() {
    noStroke();
    fill(16,177,254);
    rect(this.x, this.y, this.w, this.h);
  }
}
