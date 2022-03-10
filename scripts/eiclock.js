/**
 * eiclock.js
 * Author: A7a Ezay
 * All Rights Reserved Bla Bla Bla
 * 
 * This is a clock based on 
 * Euler's Identity Equation e^i*pi = 1 Day.
 * The clock rotation is anti-clock wise (ironically)
 * 
 * The clock divide the day into 4 quarters, each 6 hours.
 * 
 * 
 */

 let r;
 let len;
 let eulerFont;

function preload() {
  eulerFont = loadFont('../fonts/neo-euler.otf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("eiclock-canvas");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  textFont(eulerFont);
  drawLogo(windowWidth / 2, windowHeight / 2);
}


function drawLogo(cx, cy) {
  for (let theta = 0; theta < TWO_PI; theta += 0.3) {
    let x = r * cos(theta);
    let y = r * sin(theta);
    push();
    translate(cx, cy);
    rotate(theta);
    textSize(128);
    text(' i π', 100, 100);
    pop();
  }
  textSize(360);
  text('e', cx-96, cy+80)
}
