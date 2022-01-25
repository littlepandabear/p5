function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(50);
  
  var points = [[100, height-100],[width/2, 100],[width-100, height-100]];
  drawTriangle(points,floor(map(mouseX, 0, width, 0, 6)));
}

function drawTriangle(points, depth){
	
	beginShape();
	vertex(points[0][0],points[0][1]);
	vertex(points[1][0],points[1][1]);
	vertex(points[2][0],points[2][1]);
	endShape(CLOSE);
    
    if (depth > 0){
        var p = [points[0],getMid(points[0], points[1]),getMid(points[0], points[2])]
        drawTriangle(p,depth-1)
		
		p = [points[1],getMid(points[0], points[1]),getMid(points[1], points[2])]
        drawTriangle(p, depth-1)
		
		p = [points[2],getMid(points[2], points[1]), getMid(points[0], points[2])]
        drawTriangle(p, depth-1)
    }
    

}
function getMid(p1,p2){
    return [ (p1[0]+p2[0]) / 2, (p1[1] + p2[1]) / 2]  //find midpoint
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


/*
	
import turtle

PROGNAME = 'Sierpinski Triangle'

points = [[-175,-125],[0,175],[175,-125]] #size of triangle

def getMid(p1,p2):
    return ( (p1[0]+p2[0]) / 2, (p1[1] + p2[1]) / 2) #find midpoint

def tri(t, points,depth):

    t.ht()
    t.pencolor('orange')
    t.speed(10)
    t.up()
    t.goto(points[0][0],points[0][1])
    t.down()
    t.goto(points[1][0],points[1][1])
    t.goto(points[2][0],points[2][1])
    t.goto(points[0][0],points[0][1])

    if depth>0:
        
        tri(t,[points[0],
                        getMid(points[0], points[1]),
                        getMid(points[0], points[2])],
                   depth-1)
        tri(t,[points[1],
                        getMid(points[0], points[1]),
                        getMid(points[1], points[2])],
                   depth-1)
        tri(t,[points[2],
                         getMid(points[2], points[1]),
                         getMid(points[0], points[2])],
                   depth-1)
t = turtle.Turtle()
print(PROGNAME)
tri(t,points,4)
*/