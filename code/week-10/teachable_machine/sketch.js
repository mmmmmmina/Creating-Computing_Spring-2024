//Matter.js
let engine;
let shapes = [];

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './my_model/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
    createCanvas(320, 240);
    colorMode(HSB, 360, 100, 100);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();

    //
    rectMode(CENTER);

    engine = Matter.Engine.create();
  
    const ground = new Rect(engine.world,
      createVector(width/2, height), createVector(width -10,30), {isStatic:true});
  
      Matter.Runner.run(engine);
      shapes.push(ground);


}

function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);





    shapes.forEach( shape => {
        if(label==='Black'){
            push();
            fill(0);
            stroke(360,0,100);
            shape.display();
            pop();
        }else if(label ==='Blue'){
            push();
            fill(240,100,100);
            shape.display();
            pop();
        }
      });
    
      if(label==='Black' || label==='Blue' ){
        createShape(width/2, height/2, null);
      }


    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);

}


function createShape(x,y,options){
    let shape;
  
    if(random() > 0.5){
      shape = new Rect(engine.world, createVector(x,y), 
      createVector(random(10,50),random(10,50)),options);
    }else{
      shape = new Circle(engine.world,
        createVector(x, y),
        createVector(random(10,50), random(10,50)),
        options);
    }
    shapes.push(shape);
  
  }

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
}
