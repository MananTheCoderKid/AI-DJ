leftY = 0;
leftX = 0;
rightY = 0;
rightX = 0;

right_score = 0;
left_score = 0;

song = "";

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Manan finally understood the ml5.js library!");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#5224BC");
    stroke("black");

    //The volume
    if (right_score > 0.2) {
        circle(leftX, leftY, 20);
        LeftY_Number = Number(leftY);
        LeftY_Floor = floor(LeftY_Number);
        LeftY_Divide = LeftY_Floor / 500;
        document.getElementById("volume").innerHTML = LeftY_Divide;
        song.setvolume(LeftY_Divide);
    }

    //The speed
    if (right_score > 0.2) {
        circle(rightX, rightY, 20);
        if (rightY > 0 && rightY <= 100) {
            document.getElementById("speed").innerHTML = "0.5x";
            song.rate(0.5);
        } else if (rightY > 100 && rightY <= 200) {
            document.getElementById("speed").innerHTML = "0.75x";
            song.rate(0.75);
        } else if (rightY > 200 && rightY <= 300) {
            document.getlElementById("speed").innerHTML = "1x";
            song.rate(1);
        } else if (rightY > 300 && rightY <= 400) {
            document.getElementById("speed").innerHTML = "2x";
            song.rate(2);
        } else if (rightY > 400 && rightY <= 500) {
            document.getElementById("speed").innerHTML = "2.5x";
            song.rate(2.5);
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        leftY = results[0].pose.leftWrist.y;
        leftX = results[0].pose.leftWrist.x;
        console.log("Left Wrist X|Y = " + leftX + " | " + leftY);

        rightY = results[0].pose.rightWrist.y;
        rightX = results[0].pose.rightWrist.x;
        console.log("Right Wrist X|Y = " + rightX + " | " + rightY);

        right_score = results[0].pose.keypoints[10].score;
        left_score = results[0].pose.keypoints[9].score;

        console.log("Left | Right score = " + left_score + " | " + right_score);
    }
}