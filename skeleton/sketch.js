var img;
const winSize = {
    width: 800,
    height: 600
};

function setup() {
    createCanvas(winSize.width, winSize.height);
}

function draw() {
    frameRate(5);
    loadImage("http://192.168.1.106:8081/out.jpg?q=30&id=0.4497507644479575&r=1510175097300", function(img) {
        image(img, 0, 0);
    });
}

const vid = document.getElementById('video');
setInterval(() => {
    vid.setAttribute('src', 'http://192.168.1.106:8081/out.jpg?q=30&id=0.4497507644479575&r=1510175097300');
}, 100);

window.onload = function() {
    var video = document.getElementById('video');
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    console.log(tracker);

    tracking.track('#video', tracker, {
        camera: false
    });

    tracker.on('track', function(event) {

        if (event.data.length >= 1) {
            // notify();
        }
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
    });

    // var gui = new dat.GUI();
    // gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
    // gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
    // gui.add(tracker, 'stepSize', 1, 5).step(0.1);
};