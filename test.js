var cats = {};


function show() {
    document.getElementById("count").style.visibility = "visible";
    //document.getElementById("demo").style.visibility="visible";
    img.style.visibility = "visible";

}

document.getElementById("message").style.visibility="hidden";



var lastPos = [0, 0, 0];
var currentPos = [];

var counter = 0;

var startPos;
var started = false;
var hand;

Leap.loop(function(frame) {



    if (started) {
        frame.hands.forEach(function(hand, index) {

            if (index > 0) {
                return;
            }
            var cat = (cats[index] || (cats[index] = new Cat()));
            cat.setTransform(hand.screenPosition(), hand.roll(), hand.grabStrength);

        });
    } else {
	
	document.getElementById("message").style.visibility="visible";	

        if (document.getElementById("message").innerHTML != "Show open palm to start!") {
            document.getElementById("message").innerHTML = "Show open palm to start!";
        }
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

                reset();
                show();
            }

            counter++;
        }
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
                    myVar = setTimeout(myFunction, 1000);

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
        myVar = setTimeout(myFunction2, 1000);
    } else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}

function myFunction2() {
    if (x) {
        document.getElementById("count").innerHTML = "2";
        myVar = setTimeout(myFunction3, 1000);
    } else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}

function myFunction3() {
    if (x) {
        document.getElementById("count").innerHTML = "1";
        myVar = setTimeout(myFunction4, 1000);
    } else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}

function myFunction4() {
    if (x) {
        document.getElementById("count").innerHTML = "Congratulations!";
        document.getElementById("next").style.visibility = 'visible';
    } else {
        document.getElementById("count").innerHTML = "Please hold still.";
    }
}


function reset() {
    document.getElementById("message").innerHTML = "Thumbs up or Thumbs down!";
    document.getElementById("count").innerHTML = "Please hold still.";
    document.getElementById("next").style.visibility = "hidden";
    x = false;
}




cats[0] = new Cat();



// This allows us to move the cat even whilst in an iFrame.
//Leap.loopController.setBackground(true)
