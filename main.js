img = "";
dstatus = "";
objects = [];


function setup() {
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 450)
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}
function draw() {
    image(video, 0, 0, 450, 450);

    if (dstatus != "") {
        objectdetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {            
            input = objects[i].label;
            document.getElementById("stats").innerHTML = "Status: Objects Detected";
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('blue');
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);

            if (objects[i].label == "input") {
                
            document.getElementById("stats").innerHTML = "Status: Objects Detected";
            document.getElementById("found").innerHTML= input+ " found";
            } else {
                document.getElementById("stats").innerHTML = "Status : Object  Not Detected";
                document.getElementById("found").innerHTML= input+ " not found";
            }
        }
    }
}

function modelLoaded() {
    console.log('Model Loaded!');
    dstatus = true;
    objectdetector.detect(video, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
    }
    objects = results;
}