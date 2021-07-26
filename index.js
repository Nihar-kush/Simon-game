var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern= [];
var gamePattern = [];
var started = false;
var level = 0;

// Events
$(document).keydown(function (){
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence(); 
    started = true;
  }
});

$(".btn").click(function (){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  sound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
});

// Functions
function nextSequence(){
        userClickedPattern = [];
        level++;
        $("h1").text("Level "+level);
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour= buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        sound(randomChosenColour);
}
function sound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
      sound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
