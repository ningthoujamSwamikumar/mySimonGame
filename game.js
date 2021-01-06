var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "green", "blue", "yellow"];
var level=0;
var started=false;
var stopped = false;

$(document).keypress(function(event){
  if(started===false){
    if(event.key==="a"){
      started=true;
      setTimeout(nextSequence, 100);
    }
    else if(stopped===true){
      stopped = false;
      started=true;
      gameRestart();
    }
  }
});

$(".btn").click(function(){
  if(started){
    var userChosenColour = $(this).attr("id");
    flash(userChosenColour);
    playSound(userChosenColour);
    animatePress(this);
    userClickedPattern.push(userChosenColour);
    var lastAnsIndex = userClickedPattern.length-1;
    checkAnswer(lastAnsIndex);
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(currentLevel===(gamePattern.length-1)){
      userClickedPattern=[];
      setTimeout(nextSequence, 1000);
    }
  }
  else{
    gameOver();
  }
}

function gameRestart(){
  gamePattern=[];
  userClickedPattern=[];
  setTimeout(nextSequence, 100);
}

function gameOver(){
  level = 0;
  stopped = true;
  started=false;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over! Press any key to Restart.");
}

function nextSequence(){
  $("#level-title").text("Level "+ ++level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  flash(randomChosenColour);
  playSound(randomChosenColour);
}

function flash(button){
  $("#"+button).fadeOut(100).fadeIn(100);
}

function playSound(button){
  var audioSrc = "sounds/"+button+".mp3";
  var audio = new Audio(audioSrc);
  audio.play();
}

function animatePress(button){
  $(button).addClass("pressed");
  setTimeout(function(){
    $(button).removeClass("pressed");
  }, 100);
}
