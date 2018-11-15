class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.mulPoint = 0;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    mul() {

        var empty = this.chooseCell(0);
        var cell = random(empty);
        

        if (cell && this.mulPoint >= 3) {
            var newX1 = cell[0];
            var newY1 = cell[1];
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                matrix[newY1][newX1] = this.index;

            }

            var newGrEater = new GrassEater(newX1, newY1, this.index);
            grassEatArr.push(newGrEater);
            this.mulPoint = 0;
        }

    }
    eat() {
        var empty = this.chooseCell(1);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.mulPoint++;
            this.mul();

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;

        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
            
        }
        console.log(this.energy);

    }
    die() {
        for (var i in grassEatArr) {
            if (this.x == grassEatArr[i].x && this.y == grassEatArr[i].y) {
                grassEatArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }



    }
    move() {
        var empty = this.chooseCell(0);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }

    }
}









class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 11;
        this.mulPoint = 0;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    mul() {

        var empty = this.chooseCell(0);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                matrix[newY][newX] = this.index;

            }

            var newPredator = new Predator(newX, newY, this.index);
            predatorArr.push(newPredator);
            
        }

    }
    eat() {
        var empty = this.chooseCell(2);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in grassEatArr) {
                if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }


            this.mulPoint++;
            if (this.mulPoint >= 1) {
                this.mul();
                this.mulPoint = 0;
            }



            this.x = newX;
            this.y = newY;

        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }

    }
    die() {
        
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }



    }
    move() {
        var empty = this.chooseCell(0);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }

    }

}






class Human {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.mulPoint = 0;
        this.grassMulPoint = 0;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    chooseCellDouble(character1, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    mul() {

        var empty = this.chooseCellDouble(0, 1);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            var newHuman = new Human(newX, newY, this.index);
            humanArr.push(newHuman);
        }
    }

    eat() {
        var empty = this.chooseCell(3);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }



            this.mulPoint++;
            if (this.mulPoint == 2) {
                this.mul();
                this.mulPoint = 0;
            }



            this.x = newX;
            this.y = newY;

        }
        else {
            this.eatGrass();

        }

    }
    eatGrass() {

        var gr = this.chooseCell(1);
        var cell = random(gr);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }



            this.grassMulPoint++;
            if (this.grassMulPoint == 15) {
                this.mul();
                this.grassMulPoint = 0;
            }

            this.x = newX;
            this.y = newY;

        }
        else {
            this.eatInfPredator();

        }


    }

    move() {
        var empty = this.chooseCell(0);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }

    }
    eatInfPredator() {
        var infPred = this.chooseCell(6);
        var cell = random(infPred);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in infPredatorArr) {
                if (newX == infPredatorArr[i].x && newY == infPredatorArr[i].y) {
                    infPredatorArr.splice(i, 1);
                    break;
                }
            }


            this.energy = 0;

            this.x = newX;
            this.y = newY;
        }
        else {
            this.move();
            this.energy--;

            if (this.energy <= 0) {
                this.die();
            }
        }

    }

    die() {

        for (var i in humanArr) {
            if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                humanArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }




    }
}




class Bug {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.mulPoint = 0;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
          

        ];
    }
    infect() {
        var pre = this.chooseCell(3);
        var cell = random(pre);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = 0;
            matrix[this.y][this.x] = 0;

            for (var i in bugArr) {
                if (this.x == bugArr[i].x && this.y == bugArr[i].y) {
                    this.die();
                    predatorArr.splice(i, 1);
                    var newInfPredator = new infectedPredator(newX, newY, 6);
                    infPredatorArr.push(newInfPredator);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;

        }
        else {
            this.move();
            this.energy--;

            if (this.energy <= 0) {
                this.die();
            }
        }

    }
    die() {

        for (var i in bugArr) {
            if (this.x == bugArr[i].x && this.y == bugArr[i].y) {
                bugArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
    move() {
        var empty = this.chooseCell(0);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }

    }
}

class infectedPredator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    eat() {
        var empty = this.chooseCell(2);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in grassEatArr) {
                if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }


            this.x = newX;
            this.y = newY;

        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }

    }
    die() {

        for (var i in infPredatorArr) {
            if (this.x == infPredatorArr[i].x && this.y == infPredatorArr[i].y) {
                infPredatorArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }



    }
    move() {
        var empty = this.chooseCell(0);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }

    }

}



