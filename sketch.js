let facemesh;
let video;
let predictions = [];

// 嘴巴、左眼、右眼的 facemesh 編號
const mouthIndices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291,76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];
const leftEyeIndices = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112,133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155];
const rightEyeIndices = [359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255,263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249];

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.style('display', 'block');
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => predictions = results);
}

function modelReady() {
  console.log('FaceMesh model loaded!');
}

function draw() {
  background(220);

  // 鏡像畫面與線條
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();

    // 嘴巴
    drawFacemeshLine(keypoints, mouthIndices);
    // 左眼
    drawFacemeshLine(keypoints, leftEyeIndices);
    // 右眼
    drawFacemeshLine(keypoints, rightEyeIndices);
  }
  pop();
}

// 依序連接每一組編號的點
function drawFacemeshLine(keypoints, indices) {
  for (let i = 0; i < indices.length - 1; i++) {
    const idxA = indices[i];
    const idxB = indices[i + 1];
    const [xA, yA] = keypoints[idxA];
    const [xB, yB] = keypoints[idxB];
    line(xA, yA, xB, yB);
  }
}
