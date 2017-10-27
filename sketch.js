let canvas;
// VVV Need to change whenever you add a new sketch.
let numberOfSketches = 4;
let r;

//Variables for StarField
var stars = [];
var speed;

//Variables for Phylotaxis
var n = 0;
var c = 3;

var points = [];

var start = 0;

//Variables for attractor Particles
var attractors = [];
var particles = [];

//Variables for Matrix

var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;

//Makes sketch responsive...IMPORTANT 
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background(51);

	pickRandomSketch();
	//Startup code for other sketches

	//console.log(r);
	if (r == 0)
		starSetup();
	else if (r == 1)
		phyllotaxisSetup();
	else if (r == 2)
		attractorParticleSetup();
	else if (r == 3)
		matrixSetup();
}

function draw() {
	if (r == 0)
		starDraw();
	else if (r == 1)
		phyllotaxisDraw();
	else if (r == 2)
		attractorParticleDraw();
	else if (r == 3)
		matrixDraw();
}

//Mouse or Key actions
function mousePressed() {
	if (r == 2)
		attractors.push(createVector(mouseX, mouseY));
}

//picking a random sketch and handling some cookies
function pickRandomSketch() {
	//It won't pick the same sketch consecutively
	var lastRandomNum = document.cookie;
	r = int(random(numberOfSketches));
	if(lastRandomNum.indexOf("randomNum=") == -1){
		document.cookie = "randomNum=" + r;
	}
	else{
		while(r == int(lastRandomNum.charAt(lastRandomNum.length-1))){
			r = int(random(numberOfSketches));
		}
		document.cookie = "randomNum=" + r;
	}
}

//Code for sketches


//Starfield
function starSetup() {
	for (var i = 0; i < 800; i++) {
		stars[i] = new Star();
	}
}

function starDraw() {
	speed = 25 //map(mouseX, 0, width, 0, 50);
	background(0);
	translate(width / 2, height / 2);
	for (var i = 0; i < stars.length; i++) {
		stars[i].update();
		stars[i].show();
	}
}

//Phyllotaxis

function phyllotaxisSetup() {
	angleMode(DEGREES);
	colorMode(HSB);
}

function phyllotaxisDraw() {
	background(0);
	translate(width / 2, height / 2);
	rotate(n * 0.3);
	for (var i = 0; i < n; i++) {
		var a = i * 137.5;
		var r = c * sqrt(i);
		var x = r * cos(a);
		var y = r * sin(a);
		var hu = sin(start + i * 0.5);
		hu = map(hu, -1, 1, 0, 360);
		fill(hu, 255, 255);
		noStroke();
		ellipse(x, y, 4, 4);
	}
	n += 5;
	start += 5;
}


//Attractor Particles
function attractorParticleSetup() {

}

function attractorParticleDraw() {
	background(51);
	stroke(255);
	strokeWeight(4);
	particles.push(new AttractorParticle(random(width), random(height)));

	if (particles.length > 100) {
		particles.splice(0, 1);
	}

	for (var i = 0; i < attractors.length; i++) {
		stroke(0, 255, 0);
		point(attractors[i].x, attractors[i].y);
	}
	for (var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		for (var j = 0; j < attractors.length; j++) {
			particle.attracted(attractors[j]);
		}
		particle.update();
		particle.show();
	}
}

//Matrix 
function matrixSetup() {
	background(0);

	var x = 0;
	for (var i = 0; i <= width / symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(x, random(-2000, 0));
		streams.push(stream);
		x += symbolSize
	}

	textFont('Consolas');
	textSize(symbolSize);
}

function matrixDraw() {
	background(0, 150);
	streams.forEach(function (stream) {
		stream.render();
	});
}