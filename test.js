var cats = {};

Leap.loop(function(frame) {

  frame.hands.forEach(function(hand, index) {
    
    var cat = ( cats[index] || (cats[index] = new Cat()) );    
    cat.setTransform(hand.screenPosition(), hand.roll(), hand.grabStrength);
    
  });
  
}).use('screenPosition', {scale: 0.25});



var Cat = function() {
  var cat = this;
  var img = document.createElement('img');
  img.src = 'down.png';
  img.style.position = 'absolute';
  img.onload = function () {
    cat.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }
  
  cat.setTransform = function(position, rotation, grip) {
	
	document.getElementById("demo").innerHTML = rotation;

if (grip == 1) {
	if (rotation > -1.8 && rotation < -1.3) {
		document.getElementById("message").innerHTML = "Hold your thumbs up!";
	}
	else if (rotation > 1.1 && rotation < 1.6) {
		document.getElementById("message").innerHTML = "Hold your thumbs down!";
	}
	else {
		document.getElementById("message").innerHTML = "Thumbs up or Thumbs down!";
	}
}
	else {
		document.getElementById("message").innerHTML = "Thumbs up or Thumbs down!";
	}

    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

	img.style.transform = 'rotate(' + -rotation + 'rad)';
	
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};



cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
Leap.loopController.setBackground(true)