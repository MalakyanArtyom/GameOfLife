var backcolor = '#acacac';

var weather = {
    summer: function () {
        backcolor = 'palegreen';
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
        for (var i in grassEatArr) {
            grassEatArr[i].energy -= 2;
        }
        for (var i in predatorArr) {
            predatorArr[i].energy -= 2;
        }
        for (var i in humanArr) {
            humanArr[i].energy -= 2;
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
    [1, 2, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 2]
];  */

var matrix = [];
var n = 50;
var m = 50;
var side = 12;
var days = 0;
var bazm;



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
            /* if(x == 49 || x == 0 || y == 49 || y == 0){
                matrix[y][x] = 7;
            } */
        }
    } 

    

    for (var i = 0; i <= 25; i++) {
        //matrix[Math.floor(random(50))][Math.floor(random(50))] = 2;
        //matrix[Math.floor(random(50))][Math.floor(random(50))] = 3;
        matrix[Math.floor(random(50))][Math.floor(random(50))] = 4;
        //matrix[Math.floor(random(50))][Math.floor(random(50))] = 5; 
    }  

    var ran = Math.floor(random(0, 50));
    matrix[0][ran] = 8;


    frameRate(5);
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
    
    
    
    //console.log(humanArr.length)

    if(frameCount % 3 == 0){
        var bazm = true;
        //console.log(bazm);
    }
    else{
        var bazm = false;
        //console.log(bazm);
    }

    days++;
    if (days == 1) {
        weather.winter();
    }
    else if (days == 10) {
        weather.summer();
        //noLoop()
    }
    else if (days == 20) {
        days = 0;
    }
    


    for (var i in floodArr)
        floodArr[i].mul();

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
