/**
 * eiclock.js
 * ==========
 * Author: A7a Ezay
 * All Rights Reserved Bla Bla Bla
 * 
 * This is a clock based on 
 * Euler's Identity Equation e^i*pi
 * The clock rotation is anti-clock wise (ironically)
 * 
 * The clock divide the day into 4 quarters, each 6 hours.
 */

let radius;
let eulerFont;
let activeSegment;
let activeSegmentBlinkCounter;
let activeSegmentBlinkColor;
let activeSegmentBlinkRate;

function preload() {
  eulerFont = loadFont('../fonts/neo-euler.otf');
}

function setup() {
  // create canvas
  let canvas = createCanvas(windowWidth, windowHeight);
  // assign the canvas to element
  canvas.parent("eiclock-canvas");
  // load the site font
  textFont(eulerFont);
  angleMode(DEGREES);
  // caclulate the clock radius
  let minScreenLength = Math.min(windowWidth, windowHeight);
  radius = minScreenLength / 2 * 0.618;
  console.log(radius);
  activeSegmentBlinkColor = '#1D222A';
  activeSegmentBlinkCounter = second();
}

function windowResized() {
  // recaclualate the clock radius
  let minScreenLength = Math.min(windowWidth, windowHeight);
  radius = minScreenLength / 2 * 0.618;
  console.log(radius);
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  printMillis();
  drawAxis(4);
  drawClock(4);
  drawClockLabels(width / 2, height / 2);
  shadeDaySegments(width / 2, height / 2);
  shadeSleepSegment(width / 2, height / 2);
  // shadeActiveSegment(width/2, height/2);
  shadePastTime(width / 2, height / 2);
}

function printMillis() {
  removeElements();
  let millisecond = millis();
  let message = "Running Time: " + Math.floor(millisecond / 1000) + " seconds";
  let p = createP(message);
  p.style('font-size', '11px');
  p.position(4, 4);
}
function drawAxis(strokeWeightValue) {
  push();
  // stroke
  strokeWeight(strokeWeightValue);
  // draw x-axis
  line(0, height / 2, width, height / 2);
  // draw y-axis
  line(width / 2, 0, width / 2, height);
  pop();
}

function drawClock(strokeWeightValue) {
  let diameter = 2 * radius;
  push();
  strokeWeight(strokeWeightValue);
  noFill();
  circle(width / 2, height / 2, diameter);
  pop();
}

function drawClockLabels(cx, cy) {
  push();
  translate(cx, cy);
  textSize(24);
  // 7am
  text("7am", radius * cos(0), radius * sin(0) - textDescent());
  // 9am
  text("9am", radius * cos(330), radius * sin(330));
  // 11am
  text("11am", radius * cos(300), radius * sin(300));
  // 1pm
  text("1pm", radius * cos(270), radius * sin(270) - textDescent());
  // 3pm
  text("3pm", radius * cos(240) - textWidth("3pm"), radius * sin(240));
  // 5pm
  text("5pm", radius * cos(210) - textWidth("5pm"), radius * sin(210));
  // 7pm
  text("7pm", radius * cos(180) - textWidth("7pm"), radius * sin(180) - textDescent());
  // 9pm
  text("9pm", radius * cos(150) - textWidth("9pm"), radius * sin(150) + textAscent());
  // 11pm
  text("11pm", radius * cos(120) - textWidth("11pm"), radius * sin(120) + textAscent());
  // 1am
  text("1am", radius * cos(90), radius * sin(90) + textAscent() + textDescent());
  pop();
}

function shadeDaySegments(cx, cy) {
  console.log(activeSegment);
  push();
  ellipseMode(RADIUS);
  strokeWeight(4);
  // [7,9]
  fill('#B9C2CF');
  arc(cx, cy, radius, radius, 330, 360, PIE);
  // [9, 11]
  fill('#A4AFC0');
  arc(cx, cy, radius, radius, 300, 330, PIE);
  // [11, 1]
  fill('#8F9DB1');
  arc(cx, cy, radius, radius, 270, 300, PIE);
  // [1, 3]
  fill('#7A8BA3');
  arc(cx, cy, radius, radius, 240, 270, PIE);
  // [3, 5]
  fill('#667893');
  arc(cx, cy, radius, radius, 210, 240, PIE);
  // [5, 7]
  fill('#57677E');
  arc(cx, cy, radius, radius, 180, 210, PIE);
  // [7, 9]
  fill('#485669');
  arc(cx, cy, radius, radius, 150, 180, PIE);
  // [9,11]
  fill('#3A4554');
  arc(cx, cy, radius, radius, 120, 150, PIE);
  // [11, 1]
  fill('#2B333F');
  arc(cx, cy, radius, radius, 90, 120, PIE);
  pop();
}

function shadeSleepSegment(cx, cy) {
  push();
  fill('#1D222A');
  ellipseMode(RADIUS);
  strokeWeight(4);
  arc(cx, cy, radius, radius, 0, 90, PIE);
  pop();
}



function between(x, min, max) {
  return x >= min && x <= max;
}

function blinkSegment(segmentColor) {
  console.log(activeSegmentBlinkCounter);
  let currentSecond = second();
  if (activeSegmentBlinkCounter != currentSecond) {
    toggleColor(segmentColor);
    activeSegmentBlinkCounter = currentSecond;
  }
}

function toggleColor(segmentColor) {
  if (activeSegmentBlinkColor === segmentColor) {
    fill('#1D222A');
    activeSegmentBlinkColor = '#1D222A';
  } else {
    fill(segmentColor);
    activeSegmentBlinkColor = segmentColor;
  }
}

function shadePastTime(cx, cy) {
  currentHour = hour();
  currentMinute = minute();
  if (currentHour > 9 ) {
    shadeSegment(cx, cy, 330, 360);
  }
  if (currentHour > 11) {
    shadeSegment(cx, cy, 300, 330);
  }
  if(currentHour > 11) {
    shadeSegment(cx, cy, 270, 300);
  }
  if(currentHour > 13) {
    shadeSegment(cx, cy, 240, 270);
  }
  if(currentHour > 15) {
    shadeSegment(cx, cy, 210, 240);
  }
  if(currentHour > 17) {
    shadeSegment(cx, cy, 180, 210);
  }
  if(currentHour > 19) {
    shadeSegment(cx, cy, 150, 180);
  }
  if(currentHour > 21) {
    shadeSegment(cx, cy, 120, 150);
  }
  if(currentHour > 23) {
    shadeSegment(cx, cy, 90, 120);
  }
  if(currentHour === 0) {
    shadeSegment(cx, cy, 90, 360);
  }
}

function shadeSegment(cx, cy, startAngle, endAngle) {
  push();
  translate(cx, cy);
  ellipseMode(RADIUS);
  strokeWeight(.75);
  for (angle = startAngle; angle < endAngle; angle += 1.25) {
    line(0, 0, radius * cos(angle), radius * sin(angle));
  }
  pop();
}


function createDaySegments(startTime, sleepHours, segmentHours, segmentUnit) {
  // TODO This is to make the segment creation dynamic, 
  // and make also segments array width.
}