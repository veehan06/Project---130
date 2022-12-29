song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
statusoflhw = 0;
statusoflrhw = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results){
    if(results.length > 0){
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Left Wrist X coordinates are = " + leftWristX + "Left Wrist Y coordinates are = " + leftWristY);
    console.log("Right Wrist X coordinates are = " + rightWristX + "Right Wrist Y coordinates are = " + rightWristY);
    }
}
function modelLoaded(){
    console.log("PoseNet is Initialized!");
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        song1.play();
        document.getElementById("sgn").innerHTML = "Song = Harry Potter Theme";
        }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        song2.play();
        document.getElementById("sgn").innerHTML = "Song = Peter Pan";
    }
}