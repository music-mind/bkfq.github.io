// test.js 

// reads data from leap controller and displays it in a loop

var output = document.getElementById('output');

var fromString = "";
var handString ="";
var fingerString = "";
var hand, finger;

var options = { enableGestures: true};

function dataFormat(id, data){
    return id + ": " + data + "<br>";
}

// Main Loop

Leap.loop(options, function(frame) {

    frameString = dataFormat("frame id", frame.id);
    frameString+= dataFormat("num_hands", frame.hands.length);
    frameString+= dataFormat("num_fingers", frame.fingers.length);

    for (var i=0; i<frame.hands.length;i++){
	hand = frame.hands[i];
	handString = dataFormat("hand_type", hand.type);
	handString+= dataFormat("grip_strength", hand.grabStrength);
	
	frameString+="<br>";
	frameString+=handString;
   }

    output.innerHTML = frameString;

});



