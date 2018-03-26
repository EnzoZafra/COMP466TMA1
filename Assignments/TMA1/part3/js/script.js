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
        imageObjects[src] = img;
        imageObjects[src].caption = images[i]['caption'];
      }
    }
  });
}

function initCanvas() {
  var canvas = document.getElementById("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "80vh";
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  canvas.style.maxHeight = "80vh";
  canvas.style.maxWidth = "100%";
  var ctx = canvas.getContext('2d');
  ctx.translate(canvas.width / 2, canvas.height / 2);
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
  console.log(transition);
  if (transition = "none") {
    ctx.globalAlpha = 1;
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    drawImageScaled(image, ctx);
  }
  else if (transition = "fadein") {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.globalAlpha = alpha;
    drawImageScaled(image, ctx);
    alpha += 0.01;
    if (alpha < 1) {
    }
    else {
      alpha = 0;
    }
  }
  document.getElementById("caption").innerHTML = caption;
}

function fadeInTransition() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  ctx.globalAlpha = alpha;
  drawImageScaled(image, ctx);
  alpha += 0.01;
  if (alpha < 1) {
    requestAnimationFrame(fadeInTransition);
  }
  else {
    alpha = 0;
  }
}

var imageObjects = {};
var currIndex = 0;
var keys = [];
var index;
var alpha = 0;
var image;
var paused = true;
var transition = "none";
var photoInterval;

$(window).load(function(){
  var supportCanvas = 'getContext' in document.createElement('canvas');
  loadimgs();
  // initCanvas();
  keys = Object.keys(imageObjects);

  document.getElementById("start_btn").addEventListener("click", function(){
    paused = !paused;
    pausePlay();
  });

});

function calculateIndex() {
  // sequential
  currIndex = (currIndex + 1) % keys.length;
  index = keys[currIndex];
}

function pausePlay() {
  var delayInMilliseconds = 1000;
  if (paused) {
    window.clearInterval(displayInt);
  }
  else {
    displayInt = window.setInterval(function() {
      calculateIndex();
      displayImage(imageObjects[index], imageObjects[index].caption, transition);
    }, delayInMilliseconds);
  }
}
