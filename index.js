let video;
let poseNet;
let pose;
let part = 0;
let partX, partY;
let confidence;
let color = "#ff0000";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', getPoses);
  document.body.appendChild(document.createElement('label'));
  document.getElementsByTagName('label')[0].innerHTML = "Body Part";
  document.body.appendChild(document.createElement('select'));
  document.getElementsByTagName('select')[0].innerHTML = `
    <option value="0">Nose</option>
    <option value="1">Left Eye</option>
    <option value="2">Right Eye</option>
    <option value="3">Left Ear</option>
    <option value="4">Right Ear</option>
    <option value="5">Left Shoulder</option>
    <option value="6">Right Shoulder</option>
    <option value="7">Left Elbow</option>
    <option value="8">Right Elbow</option>
    <option value="9">Left Wrist</option>
    <option value="10">Right Wrist</option>
    <option value="11">Left Hip</option>
    <option value="12">Right Hip</option>
    <option value="13">Left Knee</option>
    <option value="14">Right Knee</option>
    <option value="15">Left Ankle</option>
    <option value="16">Right Ankle</option>
  `;
  document.getElementsByTagName('select')[0].addEventListener('change', (e) => {
    part = document.getElementsByTagName('select')[0].value;
  })
  document.body.appendChild(document.createElement('label'));
  document.getElementsByTagName('label')[1].innerHTML = "Color";
  document.body.appendChild(document.createElement('input'));
  document.getElementsByTagName('input')[0].type = "color";
  document.getElementsByTagName('input')[0].value = "#ff0000";
  document.getElementsByTagName('input')[0].addEventListener('change', (e) => {
    color = document.getElementsByTagName('input')[0].value;
  })
  document.body.appendChild(document.createElement('p'));
}

function getPoses(poses) {
  pose = poses;
  if (poses.length > 0) {
    const {x, y} = poses[0].pose.keypoints[part].position;
    partX = x;
    partY = y;
    const {score} = poses[0].pose.keypoints[part];
    confidence = score;
  }
}


function draw() {
  image(video, 0, 0);
  noStroke();
  fill(color);
  if(confidence >= 0.2) { 
    ellipse(partX, partY, 20, 20);
    document.getElementsByTagName('p')[0].innerHTML = `<b>Confidence Score: ${confidence.toFixed(4)}</b>`;
  } else {
    document.getElementsByTagName('p')[0].innerHTML = `<b>Not enough data. Make sure there is appropriate lighting and that the body part is visible.</b>`;
  }
}
