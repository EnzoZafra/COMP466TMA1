var imageObjects = {};
var imgkeys = [];
var currIndex = 0;
var index;
var timing = 0;
var alpha = 0;
var image;
var paused = true;
var transition = "fadein";
var photoInterval;
var animation;

function loadimgs() {
  $.ajax({
    url: "img/images.json",
    dataType: 'json',
    async: false,
    success: function(json) {
      var images = json["images"];
      for (var i = 0; i < images.length; i++) {
        var img = new Image();
        var src = images[i]['src'];
        img.src = src
        var caption = images[i]['caption'];
        imageObjects[i] = img;
        imageObjects[i].caption = images[i]['caption'];
      }
    }
  });
}

function drawImageScaled(img, ctx) {
  var canvas = ctx.canvas ;
  var hRatio = canvas.width  / img.width    ;
  var vRatio =  canvas.height / img.height  ;
  var ratio  = Math.min ( hRatio, vRatio );
  var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
  var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(img, 0,0, img.width, img.height,
    centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
}

function displayImage(image, caption, transition) {
  // No transition
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  if (transition == "none") {
    ctx.globalAlpha = 1;
    drawImageScaled(image, ctx);
  }
  // fadein
  else if (transition == "fadein") {
    ctx.globalAlpha = alpha;
    drawImageScaled(image, ctx);
    fadeIn(image, caption);
  }
  // else if (transition == "rotate") {

  // }
  document.getElementById("caption").innerHTML = caption;
}

function fadeIn(image, caption) {
  alpha += 0.01;
  if (alpha < 1) {
    window.clearInterval(displayInt);
    animation = requestAnimationFrame(function() {
      displayImage(image, caption, transition);
    });
  }
  else {
    alpha = 0;
    if (!paused) {
      displayInt = window.setInterval(function() {
        calculateIndex();
        displayImage(imageObjects[index], imageObjects[index].caption, transition);
      }, 1000);
    }
  }
}

function pauseplayListener() {
  paused = !paused;
  pausePlay();
}

function switchListener(isChecked) {
  if (isChecked) {
    document.getElementById("prev_btn").setAttribute("disabled", "true");
    document.getElementById("next_btn").setAttribute("disabled", "true");
  } else {
    document.getElementById("prev_btn").removeAttribute("disabled");
    document.getElementById("next_btn").removeAttribute("disabled");
  }
}

function calculateIndex() {
  var isRandom = document.getElementById('mySwitch').checked;
  // Random images
  if (isRandom) {
    currIndex = Math.floor(Math.random() * imgkeys.length);
  }
  // sequential
  else {
    currIndex = (currIndex + 1) % imgkeys.length;
  }
  index = imgkeys[currIndex];
}

function pausePlay() {
  var delayInMilliseconds = 1000;
  if (paused) {
    window.clearInterval(displayInt);
    cancelAnimationFrame(animation);
  }
  else {
    displayInt = window.setInterval(function() {
      calculateIndex();
      displayImage(imageObjects[index], imageObjects[index].caption, transition);
    }, delayInMilliseconds);
  }
}

function nextImage() {
  currIndex = (currIndex + 1) % imgkeys.length;
  index = imgkeys[currIndex];
  displayImage(imageObjects[index], imageObjects[index].caption, transition);
}

function prevImage() {
  currIndex--;
  if (currIndex < 0) {
    currIndex = imgkeys.length - 1;
  }
  index = imgkeys[currIndex];
  displayImage(imageObjects[index], imageObjects[index].caption, transition);
}

$(window).load(function(){
  var supportCanvas = 'getContext' in document.createElement('canvas');
  loadimgs();
  imgkeys = Object.keys(imageObjects);

  document.getElementById("start_btn").addEventListener("click", pauseplayListener);
  document.getElementById("next_btn").addEventListener("click", nextImage);
  document.getElementById("prev_btn").addEventListener("click", prevImage);

  document.getElementById("mySwitch").addEventListener('change', function() {
    switchListener(this.checked);
  });
});
