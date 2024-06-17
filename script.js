// script.js

document.getElementById('modalButton').onclick = function() {
    document.getElementById('myModal').style.display = "block";
}

document.querySelector('.close').onclick = function() {
    document.getElementById('myModal').style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var audioPlayers = []; // Array to store audio players

// Function to create and append audio elements dynamically
function createAudioElement(id, source, title) {
  const audioDiv = document.createElement('div');
  audioDiv.classList.add('audio', 'unpressed');

  const spanLabel = document.createElement('span');
  spanLabel.innerHTML = `<p>${title}  </p>`;

  const playButton = document.createElement('button');
  playButton.setAttribute('id', `play-${id}`);
  playButton.setAttribute('onclick', `playSound(${id})`);
  spanLabel.appendChild(playButton);
  audioDiv.appendChild(spanLabel);

  const audio = document.createElement('audio');
  audio.setAttribute('loop', 'true');
  audio.setAttribute('id', `audio-${id}`);
  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('src', source);
  sourceElement.setAttribute('type', 'audio/mpeg');
  audio.appendChild(sourceElement);
  audioDiv.appendChild(audio);

  const spanVolume = document.createElement('span');
  spanVolume.innerHTML = '<div class="volume-control" id="vol"></div>';
  const volumeControl = document.createElement('input');
  volumeControl.setAttribute('type', 'range');
  volumeControl.setAttribute('onchange', `changeVolume(${id}, this.value)`);
  volumeControl.setAttribute('min', '0');
  volumeControl.setAttribute('max', '1');
  volumeControl.setAttribute('step', '0.025');
  volumeControl.setAttribute('value', '0.70');
  volumeControl.classList.add('vol-control');
  spanVolume.appendChild(volumeControl);
  audioDiv.appendChild(spanVolume);

  document.getElementById('audioContainer').appendChild(audioDiv);
  audioPlayers[id] = audio; // Store the audio player
}

// Example usage:
createAudioElement(0, 'assets/sounds/rain.wav', 'Rainy Weather');
createAudioElement(1, 'assets/sounds/sunnyday.wav', 'Sunny Weather');
createAudioElement(2, 'assets/sounds/pages.mp3', 'Turning Pages');
createAudioElement(3, 'assets/sounds/ipad.mp3', 'Writing On iPad');
createAudioElement(4, 'assets/sounds/fireplace.mp3', 'Fireplace');
createAudioElement(5, 'assets/sounds/typing.mp3', 'Typing');
createAudioElement(6, 'assets/sounds/coffeshop.wav', 'Cofee Shop');
createAudioElement(7, 'assets/sounds/beach.wav', 'Beach');


function playSound(id) {
  var audio = document.getElementById(`audio-${id}`);
  var playBtn = document.getElementById(`play-${id}`);
  var audioDiv = playBtn.closest('.audio');

  if (audio.paused) {
    audio.play();
    audioDiv.classList.add('pressed'); // Add the 'pressed' class
  } else {
    audio.pause();
    audioDiv.classList.remove('pressed'); // Remove the 'pressed' class
  }
}


function changeVolume(id, val) {
  var audio = document.getElementById(`audio-${id}`);
  audio.volume = val;
}

function pauseAll() {
    var pauseAllCheckbox = document.getElementById("pauseAll");
    audioPlayers.forEach(function(audio) {
      if (pauseAllCheckbox.checked) {
        audio.pause(); // Pause the audio
        // Optionally, you can visually update the play button here
      }
    });
  }

  function changeMode(mode) {
    // Update the background color of the body
    if (mode === 'library') {
        document.body.classList.add('mode-library');
        document.body.classList.remove('mode-cafe', 'mode-beach');
    } else if (mode === 'cafe') {
        document.body.classList.add('mode-cafe');
        document.body.classList.remove('mode-library', 'mode-beach');
    } else if (mode === 'beach') {
        document.body.classList.add('mode-beach');
        document.body.classList.remove('mode-library', 'mode-cafe');
    }

    // Update the illustration based on the mode
    let illustration = document.getElementById('mainIllustration');
    if (mode === 'library') {
        illustration.src = 'assets/library-illustration.png'; // Replace with your actual library illustration path
        illustration.classList.add('illustration-library');
        illustration.classList.remove('illustration-cafe', 'illustration-beach');
    } else if (mode === 'cafe') {
        illustration.src = 'assets/cafe-illustration.png'; // Replace with your actual cafe illustration path
        illustration.classList.add('illustration-cafe');
        illustration.classList.remove('illustration-library', 'illustration-beach');
    } else if (mode === 'beach') {
        illustration.src = 'assets/beach-illustration.png'; // Replace with your actual beach illustration path
        illustration.classList.add('illustration-beach');
        illustration.classList.remove('illustration-library', 'illustration-cafe');
    }

    // You can also update other elements on the page based on the mode (e.g., the title, subtitle, etc.)
    
}

// ... (Your existing JavaScript code) ...

// Pomodoro Timer Logic
const timerDisplay = document.getElementById('timer-display');
const startTimerButton = document.getElementById('start-timer');
const resetTimerButton = document.getElementById('reset-timer');
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerInterval; 

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timerInterval); // Clear any existing timer
  timerInterval = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // Add a sound notification or visual cue here when the timer ends
      alert("Time for a break!");
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000); 
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

startTimerButton.addEventListener('click', startTimer);
resetTimerButton.addEventListener('click', resetTimer);

// Initial timer display
updateTimerDisplay(); 