const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Starting the level only once
$(document).keypress(() => {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

// Sound
let playSound = (name) => {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// Flashing Sequence
const nextSequence = () => {
  // Erasing the clicked data
  userClickedPattern = [];

  // Changing Level
  $("#level-title").text("Level " + level);
  level++;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  let button = $("#" + randomChosenColour);
  gamePattern.push(randomChosenColour);

  // Automatic Flashing
  setTimeout(() => {
    button.fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, 100);
};

// Animate clicked btn
const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // As long as user sequence and game pattern isnt equal
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
};

// Clicked Button
$(".btn").on("click", (e) => {
  let userChosenColour = $(e.target).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Restarting game
const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
