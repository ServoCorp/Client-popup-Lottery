var bridge = document.getElementById("topLayer"),
bridgeCanvas = bridge.getContext('2d'),
brushRadius = (bridge.width / 100) * 5,
img = new Image();



if (brushRadius < 20) { brushRadius = 20 }

img.onload = function(){  
  bridgeCanvas.imageSmoothingEnabled = false;
	bridgeCanvas.drawImage(img, 0, 0, topLayer.width, topLayer.height);
  
}
img.loc = './assets/img/'; // this is the location to the file for top scratch off image
img.filename = 'topLayer.png'; // CHANGE NAME OF FILE HERE. THIS IS THE TOP OVERLAY (SCRATCH OFF IMAGE)
if (window.devicePixelRatio >= 2) {
	var nameParts = img.filename.split('.');
	img.src = img.loc + nameParts[0]+"-2x"+"."+nameParts[1];
} else {
	img.src = img.loc + img.filename;
}

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
	var bridgeRect = topLayer.getBoundingClientRect();
    return {
	  x: Math.floor((xRef-bridgeRect.left)/(bridgeRect.right-bridgeRect.left)*topLayer.width),
	  y: Math.floor((yRef-bridgeRect.top)/(bridgeRect.bottom-bridgeRect.top)*topLayer.height)
    };
}
      
function drawDot(mouseX,mouseY){
	bridgeCanvas.beginPath();
    bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
    bridgeCanvas.fillStyle = '#000';
    bridgeCanvas.globalCompositeOperation = "destination-out";
    bridgeCanvas.fill();
}

topLayer.addEventListener("mousemove", function(e) {
	var brushPos = getBrushPos(e.clientX, e.clientY);
  var leftBut = detectLeftButton(e);
  if (leftBut == 1) {
		drawDot(brushPos.x, brushPos.y);
  }
}, false);

topLayer.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
    var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

const popup = function mypopUp() {

    const popUp = document.getElementsByClassName("popUp")[0];
    
    popUp.style.display = 'block';

}

function popupClose() {
    const popUp = document.getElementsByClassName("popUp")[0];
    
    popUp.style.display = 'none';
}

function loadPop() {
    setTimeout(popup, 1000); 
}