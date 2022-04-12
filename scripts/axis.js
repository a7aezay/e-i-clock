let STROKE_WEIGHT = 4;

function draw() {
  push();
  // stroke
  strokeWeight(strokeWeightValue);
  // draw x-axis
  line(0, height / 2, width, height / 2);
  // draw y-axis
  line(width / 2, 0, width / 2, height);
  pop();
}


