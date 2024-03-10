var userClickedPattern=[];
var gamePattern=[];
var level=0;
var buttonColours=["red", "blue", "green", "yellow"];
var wrong="wrong";

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).ready(function() {
    $(".btn").click(function() {
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 100);
    });
});
var started=false;
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){
    userClickedPattern.length=0;
    level++;
    $("#level-title").text("Level "+level);
    var n= Math.random()*3;
    var randomNumber=Math.round(n);
    randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(300).fadeIn(300);
    playSound(randomChosenColour);
    // var audio= new Audio("./sounds/"+randomChosenColour+".mp3");
    // audio.play();
}

function playSound(name){
    var audio= new Audio("./sounds/"+name+".mp3");
    audio.play();
    
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    
        } else {
          playSound(wrong)
          $("body").addClass("game-over");
          setTimeout(() => {
            $("body").removeClass("game-over");
            }, 200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          $(document).one("keypress", startOver);
        }
    
}

function startOver(){
    gamePattern.length=0;
    level=0;
    nextSequence();

}
