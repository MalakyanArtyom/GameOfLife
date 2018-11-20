var backcolor = '#acacac';

/* var weather = {
    summer: function () {
        backcolor = 'palegreen';
        for (var i in grassEatArr) {
            if (grassEatArr[i].energy <= 5 & grassEatArr[i].energy != 0 & grassEatArr[i].energy > 0) {
                grassEatArr[i].energy += 2;
            }
        }
    },
    winter: function () {
        backcolor = 'white';
        for (var i in grassEatArr) {
            if (grassEatArr[i].energy != 0 & grassEatArr[i].energy > 0) {
                grassEatArr[i].energy -= 2;
            }
        }
    }
} */

/* var matrix = [
    [0, 2, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0]
]; */

var matrix = [];
var n = 50;
var m = 50;
var side = 10;
var days = 0;
var eaterColor = "yellow";

var grassArr = [];
var grassEatArr = [];
var predatorArr = [];
var humanArr = [];
var infPredatorArr = [];
var bugArr = [];
var eggArr = [];


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




    frameRate(3);
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
        }
    }


}


function draw() {
 

    /* days++;
    if (days < 10) {
        weather.winter();

    }
    else if (days >= 10 && days < 20) {
        weather.summer();
        //noLoop()

    }
    else if (days == 20) {
        days = 0;

    }
    console.log(grassEatArr) */



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
                fill(eaterColor);
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
            
        }
    }
    
}
