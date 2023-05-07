peterpan="peterpan.mp3";
harrypotter="harry_potter.mp3";
leftwx = 0;
leftwy = 0;
rightwx = 0;
rightwy = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
song1status = "false";
song2status = "false";

function preload(){
    song1=loadSound(peterpan);
    song2=loadSound(harrypotter);
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("posenet is Initialised");
}
 function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log( "Score Left Wrist = "+scoreRightWrist + " || score left wrist = "+scoreLeftWrist);

        leftwx = results[0].pose.leftWrist.x;
        leftwy = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+leftwx+" left wrist y= "+leftwy);

        rightwx = results[0].pose.rightWrist.x;
        rightwy = results[0].pose.rightWrist.y;
        console.log(" right wrist x = "+rightwx+" right wrist y = "+rightwy);
    }
 }
function draw(){
    image(video,0,0,600,500);
    song1status = "false";
    song2status = "false";
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2){
        circle(leftwx,leftwy,20);
        song2.stop();
        song2status = "false"
        if(song1status === "false"){
            song1.play();
            song1status = "true"
            document.getElementById("song_name").innerHTML="Peter Pan song is playing";
        }
    }
    if(scoreRightWrist > 0.2){
        circle(leftwx,leftwy,20);
        song1.stop();
        song1status = "false"
        if(song2status === "false"){
            song2.play();
            song2status = "true"
            document.getElementById("song_name").innerHTML="Harry potter song is playing";
        }
    }
}
