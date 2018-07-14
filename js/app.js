document.addEventListener("DOMContentLoaded", function () {
    //Konstrukto Funkcji FURRY
    var Furry = function () {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    };
    //Konstrukto Funkcji Coin    
    var Coin = function () {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };
    // Konstrukto funkcj game - serce gry!!  
    function Game() {
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        var self = this;
        this.index = function (x, y) {
                return x + (y * 10);
            }
            //add class with furry
        this.showFurry = function () {
            console.log(this)
            this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
        };
        //add class with coin
        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
        };
        this.hideVisibleFurry = function () {
            var visible = document.querySelector(".furry")
            visible.classList.remove("furry");
        };
        //moves
        this.moveFurry = function () {
            this.hideVisibleFurry();
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            }
            else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            }
            else if (this.furry.direction === "up") {
                this.furry.y = this.furry.y + 1;
            }
            else if (this.furry.direction === "down") {
                this.furry.y = this.furry.y - 1;
            }
            this.gameOver();
            this.showFurry();
            this.checkCoinCollision();
        };
        this.turnFurry = function (event) {
            switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 38:
                this.furry.direction = "down";
                break;
            case 40:
                this.furry.direction = "up";
                break;
            default:
            }
        };
        //       add event to keyboard
        document.addEventListener("keydown", function (event) {
            self.turnFurry(event);
        });
        // Furry & coin the same position
        this.checkCoinCollision = function () {
                if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                    var coinBox = document.querySelector(".coin");
                    coinBox.classList.remove("coin");
                    this.score++;
                    document.querySelector("#score div strong").innerText = this.score;
                    document.getElementById('coin').play();
                    this.coin = new Coin();
                    this.showCoin();
                }
            }
            //GAME OVER AND CONDITIONS
        this.gameOver = function () {
                if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                    document.getElementById("loseLife").play();
                    clearInterval(this.idSetInterval);
                    var over = document.querySelector("#over");
                    over.classList.remove("invisible");
                    var gameO = document.querySelector("#gamesOver");
                    var yourScore = document.querySelector("#yourScore");
                    var points = document.querySelector(".points");
                    yourScore.textContent = points.textContent;
                    this.hideVisibleFurry();
                }
            }
            //START
        this.startGame = function () {
            this.idSetInterval = setInterval(function () {
                self.moveFurry()
            }, 250);
        };
    };
    var Game = new Game();
    Game.showFurry();
    Game.showCoin();
    Game.startGame();
});