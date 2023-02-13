const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var randomChosenColor;
var level = 0;
var started = 0;
$(document).keypress(function (event) {
    if (started == 0) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = 1;
    }
});
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor)
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence () {
    $("#level-title").text("Level "+(level+1))
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level = level + 1;
};
function playSound (name) {
    var sound = new Audio ("sounds/"+name+".mp3");
    sound.play();
}
function animatePress (currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer (currentLevel) {
    if (gamePattern.length == userClickedPattern.length) {
        userClickedPattern = [];
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
    else if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        // console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver () {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = 0;
}