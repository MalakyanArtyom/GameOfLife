var backcolor = '#acacac'; //sdsdfadfsadas

var weather = {
    summer: function () {
        backcolor = 'palegreen';
        document.getElementById("weath").innerHTML = "Ամառ"
        for (var i in grassEatArr) {
            grassEatArr[i].energy += 2;
        }
        for (var i in predatorArr) {
            predatorArr[i].energy += 2;
        }
        for (var i in humanArr) {
            humanArr[i].energy += 2;
        }
        for (var i in bugArr) {
            bugArr[i].energy += 2;
        }
        for (var i in infPredatorArr) {
            infPredatorArr[i].energy += 2;
        }
        for (var i in grassArr) {
            grassArr[i].mulMax = 8;
        }
    },
    winter: function () {
        backcolor = 'white';
        document.getElementById("weath").innerHTML = "Ձմեռ"
        for (var i in grassEatArr) {
            grassEatArr[i].energy -= 2;
        }
        for (var i in predatorArr) {
            predatorArr[i].energy -= 2;
        }
        for (var i in humanArr) {
            humanArr[i].energy -= 7;
        }
        for (var i in bugArr) {
            bugArr[i].energy -= 2;
        }
        for (var i in infPredatorArr) {
            infPredatorArr[i].energy -= 2;
        }
        for (var i in grassArr) {
            grassArr[i].mulMax = 10;
        }
    }
} 



/* var matrix = [
    [1, 4, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 4]
];  */

var matrix = [];
var n = 50;
var m = 50;
var side = 17;
var days = 0;
var ranFlood = Math.floor(Math.random() * (20 - 10) ) + 10;
var mulFlood = 0;



var grassArr = [];
var grassEatArr = [];
var predatorArr = [];
var humanArr = [];
var infPredatorArr = [];
var bugArr = [];
var eggArr = [];
var floodArr = [];






function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            matrix[y][x] = random([0, 1])
        }
    } 

    

    for (var i = 0; i <= 25; i++) {
        matrix[Math.floor(random(50))][Math.floor(random(50))] = 2;
        //matrix[Math.floor(random(50))][Math.floor(random(50))] = 3;
        //matrix[Math.floor(random(50))][Math.floor(random(50))] = 4;
        //matrix[Math.floor(random(50))][Math.floor(random(50))] = 5; 
    }  

    
    var ran = Math.floor(random(0, 49));
    matrix[0][ran] = 8;
  
    frameRate(4);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));

            }
            else if (matrix[y][x] == 2) {
                grassEatArr.push(new GrassEater(x, y, 2));
            }
            else if (matrix[y][x] == 3) {
                predatorArr.push(new Predator(x, y, 3));
            }
            else if (matrix[y][x] == 4) {
                humanArr.push(new Human(x, y, 4));
            }
            else if (matrix[y][x] == 5) {
                bugArr.push(new Bug(x, y, 5));
            }
            else if (matrix[y][x] == 6) {
                infPredatorArr.push(new infectedPredator(x, y, 6));
            }
            else if (matrix[y][x] == 7) {
                eggArr.push(new Egg(x, y, 7));
            }
            else if (matrix[y][x] == 8) {
                floodArr.push(new Flood(x, y, 8));
            }
            
        }
    }


}




function draw() {
    
    days++;
    if (days == 1) {
        weather.winter();
    }
    else if (days == 10) {
        weather.summer();
    }
    else if (days == 20) {
        days = 0;
    }
    
    if(frameCount == ranFlood){
        mulFlood = 1;
    }
    
    if(mulFlood == 1){
        for (var i in floodArr)
        floodArr[i].mul();
    }
    
    
    for (var i in bugArr)
        bugArr[i].infect();

    for (var i in infPredatorArr)
        infPredatorArr[i].eat();

    for (var i in humanArr)
        humanArr[i].eat();

    for (var i in predatorArr)
        predatorArr[i].eat();

    for (var i in grassEatArr)
        grassEatArr[i].bex();

    
    for (var i in grassArr)
        grassArr[i].mul();

    

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);

            }
            else if (matrix[y][x] == 0) {
                fill(backcolor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill(139, 69, 19);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill(255, 220, 177);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('black');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill('red');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill(255, 253, 208);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 8) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            
        }
    }
    
}



