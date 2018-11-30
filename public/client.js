var socket = io.connect('http://localhost:4444');
var statistics = {
    "timestamp": "",
    "framecount": 0
}

function draw(){
    if (frameCount % 60 === 0) {
        statistics.timestamp = (new Date()).toString();
        statistics.framecount = frameCount;
        statistics.eggsput = eggArr.length;
        socket.emit("send data", statistics);
    }
}