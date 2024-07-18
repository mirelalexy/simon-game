var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor;
var userClickedPattern = [];
var gameStarted = 0;
var level = 0;

    // next level
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); // number from 0 to 3
    
    // incrementing level and changing heading
    userClickedPattern = []; // resetting for new level
    level++;
    document.querySelector("h1").innerHTML = "Level " + level;

    switch (randomNumber) {
        case 0:
            randomChosenColor = "red";
            break;
        case 1:
            randomChosenColor = "blue";
            break;
        case 2:
            randomChosenColor = "green";
            break;
        case 3:
            randomChosenColor = "yellow";
            break;
        default:
            break;
    };

    gamePattern.push(randomChosenColor);
    buttonSound(randomChosenColor);
    buttonAnimation(randomChosenColor);
    console.log(gamePattern);
}

    // playing button sound
function buttonSound(button){
    switch (button) {
        case "red":
            var redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;
        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;
        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;
        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;
        default:
            break;
    };
}

    // playing button animation
function buttonAnimation(currentColor){
    var button = document.querySelector("." + currentColor);
    button.classList.add("pressed");
    setTimeout(function(){
        button.classList.remove("pressed");
    }, 100);
}

    // playing a different button animation when it's pressed
function buttonPressAnimation(currentColor){
    var pressedButton = document.querySelector("." + currentColor);
    pressedButton.classList.add("pressed");
    setTimeout(function(){
        pressedButton.classList.remove("pressed");
    }, 100);
}

    // checking if last user choice is the same as the game pattern
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            console.log("finished sequence");
            // new level
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        console.log("wrong");
        // letting user know their choice was wrong
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        document.querySelector("body").classList.add("game-over");
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
        startOver();
    }
}

    // restart game
function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = 0;
}

    // detecting button press and storing pattern
for (var i = 0; i < document.querySelectorAll(".btn").length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        var userChosenColor = this.attributes.id.nodeValue;
        userClickedPattern.push(userChosenColor);
        buttonSound(userChosenColor);
        buttonPressAnimation(userChosenColor);
        console.log(userClickedPattern);
        checkAnswer(userClickedPattern.length - 1);
    });
}

    // detecting keyboard press to start game
document.addEventListener("keydown", function() {
    if (gameStarted === 0) {
        document.querySelector("h1").innerHTML = "Level " + level;
        nextSequence();
        gameStarted = 1;
    }
});