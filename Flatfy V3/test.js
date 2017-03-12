var cats = {};

function show() {
    document.getElementById("count").style.visibility = "visible";
    //document.getElementById("demo").style.visibility="visible";
    img.style.visibility = "visible";
}

// hand visibility
var handVisible = true;

// variable for detecting open palm
var lastPos = [0, 0, 0];
var currentPos = [];
var counter = 0;
var startPos;
var started = false;
var hand;

// variables for keeping track of transition
// and swiping
//var inTransition = false;
//var transitionFrame = 0;


// variables for keeping tracking of answer, gameover,
var questions = ["Comments made online are harmless.",
		 "People should be treated the same online as they are treated in person.",
		 "Getting involved only worsens the situation."];
var userAnswers = [];

var answers = [false, true, false];
var questionIndex = -1;
var ended = false;
var currentAnswer;

function showQuestion(text){
    document.getElementById("question").innerHTML = text;
}
function hideQuestion(){
    document.getElementById("question").innerHTML = "";
}

function showResults(){
    var correct = 0;
    for (var i=0; i< questions.length;i++){
        if (userAnswers[i]==answers[i]){
            correct++;
        }
    }
    document.getElementById("results").innerHTML = correct+"/"+questions.length;
}

Leap.loop(function(frame) {

    if (started) {
	// make hand disappear when the LEAP can't find detect it
	if (frame.hands.length == 0 && handVisible){
	    handVisible = false;
	    img.style.visibility = "hidden";
	}
	if (frame.hands.length != 0 && !handVisible){
	    handVisible = true;
	    img.style.visibility = "visible";
	}
	
	// in a transition period, do something before the next question
	/*if (!ended && inTransition){

	    if(transitionFrame >= 120){
		inTransition = false;
		img.src = "down.png";
		transitionFrame = 0;
		next();
	    }

	    transitionFrame++;
	}*/
	
	// if hand is visible, we do thumbs up checking
	if (handVisible){
	    frame.hands.forEach(function(hand, index) {
		if (index > 0) {
		    return;
		}
		var cat = (cats[index] || (cats[index] = new Cat()));
		cat.setTransform(hand.screenPosition(), hand.roll(), hand.grabStrength);
	    });

	}
	
	if (ended) {
	    document.getElementById("message").innerHTML = "Thanks for playing!";
	    document.getElementById("count").visibility = "hidden";
	}
    }
    
    else {
        if (questionIndex < answers.length - 1) {
            document.getElementById("message").innerHTML = "Show open palm to start the next question!";
        }
        else {
            document.getElementById("message").innerHTML = "Show open palm to view your results!";

        }
        document.getElementById("question").style.visibility = "hidden";
        hand = frame.hands[0];

        if (!started && hand) {
            // check if hand is open
            if (hand.grabStrength > 0) {
                counter = 0;
            }

            currentPos = hand.palmPosition;

            for (var i = 0; i < 3; i++) {
                if (Math.abs(currentPos[i] - lastPos[i]) >= 2) {
                    counter = 0;
                }
            }

            lastPos = currentPos;

            if (counter >= 30) {
                startPos = currentPos;
                started = true;
                img.src = "down.png";
                
                show();
                next();
            }

            counter++;
        }
    
    /*else {
    	started = true;
    	next();
    	img.style.visibility = "visible";
    	img.src = "smiley.png";
    }*/
    }


}).use('screenPosition', {
    scale: 0.25
});


var x = false;
var event = false;
var mrVar = 0;
var check2 = false;
var check3 = false;
var check4 = false;

var img;

var Cat = function() {
    var cat = this;
    img = document.createElement('img');
    img.src = 'down.png';
    img.style.position = 'absolute';
    img.onload = function() {
        cat.setTransform([window.innerWidth / 2, window.innerHeight / 2], 0);
        document.body.appendChild(img);
    }

    cat.setTransform = function(position, rotation, grip) {

        //document.getElementById("demo").innerHTML = rotation;

        if (grip == 1) {
            if (rotation > -1.8 && rotation < -1.3) {
                document.getElementById("message").innerHTML = "Keep your thumbs up!";
                if (!x) {
                    if (event) {
                        clearTimeout(myVar);
                    }
                    event = true;
                    myVar = setTimeout(myFunction, 750);

                    x = true;
                }
            } else if (rotation > 1.1 && rotation < 1.6) {
                document.getElementById("message").innerHTML = "Keep your thumbs down!";
                if (!x) {
                    if (event) {
                        clearTimeout(myVar);
                    }
                    event = true;
                    myVar = setTimeout(myFunction, 1000);
                    x = true;
                }
            } else {
                document.getElementById("message").innerHTML = "Thumbs up or Thumbs down!";
                if (x) {
                    x = false;
                    document.getElementById("count").innerHTML = "Please hold still.";
                }
            }
        } else {
            document.getElementById("message").innerHTML = "Thumbs up or Thumbs down!";
            if (x) {
                x = false;
                document.getElementById("count").innerHTML = "Please hold still.";
            }
        }

        img.style.left = position[0] - img.width / 2 + 'px';
        img.style.top = position[1] - img.height / 2 + 'px';

        img.style.transform = 'rotate(' + -rotation + 'rad)';

        img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
            img.style.OTransform = img.style.transform;

    };

    img.style.visibility = "hidden";


};


function myFunction() {
    if (x) {
        document.getElementById("count").innerHTML = "3";
        myVar = setTimeout(myFunction2, 750);
    } else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}

function myFunction2() {
    if (x) {
        document.getElementById("count").innerHTML = "2";
        myVar = setTimeout(myFunction3, 750);
    } else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}

function myFunction3() {
    if (x) {
        document.getElementById("count").innerHTML = "1";
        myVar = setTimeout(myFunction4, 750);
    } else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}

function myFunction4() {
    if (x) {
	// sets currentAnswer based on the displayed text
	setCurrentAnswer();
    document.getElementById("count").innerHTML = "Congratulations!";
	//inTransition = true;


	document.getElementById("count").style.visibility = "hidden";
	if (currentAnswer == answers[questionIndex]){
	    if (answers[questionIndex] == true){
		img.src = "check-true.png";
	    }
	    else{
		img.src = "check-false.png";
	    }
	}

	else{
	    img.src = "close.png"
	}

	userAnswers[questionIndex] = currentAnswer;
		started = false;

	//if (questionIndex < answers.length - 1) {
	//	started = true;
	//	next
    //} 
	}
    else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}

// goes to the next question. does some clean up

function next() {
    

    questionIndex++;
    if (questionIndex >= answers.length){
		ended = true;
        document.getElementById("count").style.visibility = "hidden";
        img.src = "smiley.png";
        document.getElementById("question").style.visibility = "hidden";
        showResults();
		return;
    }
    showQuestion(questions[questionIndex]);
    document.getElementById("question").style.visibility = "visible";
    document.getElementById("message").innerHTML = "Thumbs up or Thumbs down!";
    document.getElementById("count").innerHTML = "Please hold still.";
    x = false;


    console.log(answers[questionIndex]);
    console.log(questionIndex);
}

function setCurrentAnswer(){
    var text = document.getElementById("message").innerHTML;
    if (text.includes("down")){
	currentAnswer = false;
    }
    else{
	currentAnswer = true
    }
}



cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
//Leap.loopController.setBackground(true)
