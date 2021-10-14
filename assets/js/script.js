const scratch = document.getElementsByClassName("topLayer");
myCanvas = scratch.getContext("2d");
scratchRadius = (scratch.width / 100) * 5;
img = new Image();

if (scratchRadius < 50) {scratchRadius = 50};

img.onload = function () {
    myCanvas.drawImage(img, 0, 0, scratch.width, scratch.height);
}

img.loc = "";

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}