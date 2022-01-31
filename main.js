function setup() {
  canvas = createCanvas(225, 225);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function modelLoaded(){
  console.log("Model Loaded!");
}

function draw(){
  image(video, 0, 0, 225, 225);
  classifier.classify(video, gotResults);
}

previous_result = "";

function gotResults(error, result){
  if(error){
    console.log(error);
  }

  else{
    if((result[0].confidence > 0.5) && (previous_result != result[0].label)){
      console.log(result);
      previous_result = result[0].label
      synth = window.speechSynthesis;
      speak_data = "Object detected is" + result[0].label;
      utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
      document.getElementById("result_object_name").innerHTML = result[0].label;
      document.getElementById("result_accuracy").innerHTML = result[0].confidence.toFixed(2);
    }
    
  }
}



