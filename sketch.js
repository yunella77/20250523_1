let video;
let facemesh;
let predictions = [];
const indices = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,
  314,405,321,375,291,76,77,90,180,85,16,315,404,320,
  307,306,408,304,303,302,11,72,73,74,184
];
const blueIndices = [
  243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,
  112,133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155
];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 畫紅色線
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 畫藍色線
    stroke(0, 0, 255);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < blueIndices.length; i++) {
      const idx = blueIndices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();
  }
}
