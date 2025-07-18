// DOM Elements - Stopwatch
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');
const saveLapsBtn = document.getElementById('save-laps-btn');
const clearLapsBtn = document.getElementById('clear-laps-btn');
const voiceBtn = document.getElementById('voice-btn');
const voiceStatus = document.getElementById('voice-status');

// DOM Elements - Countdown
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const setCountdownBtn = document.getElementById('set-countdown-btn');
const countdownHoursElement = document.getElementById('countdown-hours');
const countdownMinutesElement = document.getElementById('countdown-minutes');
const countdownSecondsElement = document.getElementById('countdown-seconds');
const startCountdownBtn = document.getElementById('start-countdown-btn');
const stopCountdownBtn = document.getElementById('stop-countdown-btn');
const resetCountdownBtn = document.getElementById('reset-countdown-btn');

// DOM Elements - Mode Toggle
const stopwatchModeBtn = document.getElementById('stopwatch-mode');
const countdownModeBtn = document.getElementById('countdown-mode');
const stopwatchContainer = document.getElementById('stopwatch-container');
const countdownContainer = document.getElementById('countdown-container');

// DOM Elements - Theme
const themeSelect = document.getElementById('theme-select');

// DOM Elements - Current Time
const currentDateElement = document.getElementById('current-date');
const currentTimeElement = document.getElementById('current-time');

// Stopwatch Variables
let startTime;
let elapsedTime = 0;
let stopwatchInterval;
let laps = [];
let isRunning = false;

// Countdown Variables
let countdownTime = 0;
let countdownInterval;
let isCountdownRunning = false;
let countdownEndTime;

// Voice Recognition
let recognition;
let isVoiceControlActive = false;

// Initialize the application
function init() {
    loadTheme();
    loadLaps();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    setupEventListeners();
    setupVoiceRecognition();
}

// Update current time and date
function updateCurrentTime() {
    const now = new Date();
    
    // Format date: Day, Month Date, Year
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString(undefined, options);
    
    // Format time: HH:MM:SS AM/PM
    currentTimeElement.textContent = now.toLocaleTimeString();
}

// Setup event listeners
function setupEventListeners() {
    // Stopwatch controls
    startBtn.addEventListener('click', startStopwatch);
    stopBtn.addEventListener('click', stopStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);
    saveLapsBtn.addEventListener('click', saveLapsToStorage);
    clearLapsBtn.addEventListener('click', clearLaps);
    voiceBtn.addEventListener('click', toggleVoiceControl);
    
    // Countdown controls
    setCountdownBtn.addEventListener('click', setCountdown);
    startCountdownBtn.addEventListener('click', startCountdown);
    stopCountdownBtn.addEventListener('click', stopCountdown);
    resetCountdownBtn.addEventListener('click', resetCountdown);
    
    // Mode toggle
    stopwatchModeBtn.addEventListener('click', () => switchMode('stopwatch'));
    countdownModeBtn.addEventListener('click', () => switchMode('countdown'));
    
    // Theme selector
    themeSelect.addEventListener('change', changeTheme);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Keyboard shortcuts handler
function handleKeyboardShortcuts(e) {
    // Only process if not in an input field
    if (e.target.tagName.toLowerCase() !== 'input') {
        if (e.code === 'Space') {
            e.preventDefault(); // Prevent page scroll
            if (stopwatchContainer.classList.contains('active')) {
                isRunning ? stopStopwatch() : startStopwatch();
            } else if (countdownContainer.classList.contains('active')) {
                isCountdownRunning ? stopCountdown() : startCountdown();
            }
        } else if (e.code === 'KeyR') {
            if (stopwatchContainer.classList.contains('active')) {
                resetStopwatch();
            } else if (countdownContainer.classList.contains('active')) {
                resetCountdown();
            }
        } else if (e.code === 'KeyL' && stopwatchContainer.classList.contains('active')) {
            recordLap();
        }
    }
}

// Switch between stopwatch and countdown modes
function switchMode(mode) {
    if (mode === 'stopwatch') {
        stopwatchContainer.classList.add('active');
        countdownContainer.classList.remove('active');
        stopwatchModeBtn.classList.add('active');
        countdownModeBtn.classList.remove('active');
    } else if (mode === 'countdown') {
        stopwatchContainer.classList.remove('active');
        countdownContainer.classList.add('active');
        stopwatchModeBtn.classList.remove('active');
        countdownModeBtn.classList.add('active');
    }
}

// Change theme
function changeTheme() {
    const theme = themeSelect.value;
    document.body.className = '';
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else if (theme === 'neon') {
        document.body.classList.add('neon-theme');
    }
    
    // Save theme preference
    localStorage.setItem('stopwatch-theme', theme);
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('stopwatch-theme') || 'default';
    themeSelect.value = savedTheme;
    changeTheme();
}

// STOPWATCH FUNCTIONS

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10ms for smooth milliseconds
    }
}

// Stop the stopwatch
function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(stopwatchInterval);
    }
}

// Reset the stopwatch
function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    updateStopwatchDisplay();
}

// Update stopwatch time
function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    updateStopwatchDisplay();
}

// Update stopwatch display
function updateStopwatchDisplay() {
    const time = new Date(elapsedTime);
    
    // Get hours, minutes, seconds, and milliseconds
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = time.getUTCMilliseconds();
    
    // Update display
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    millisecondsElement.textContent = milliseconds.toString().padStart(3, '0');
}

// Record lap time
function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapNumber = laps.length + 1;
        const timestamp = new Date().toLocaleString();
        
        laps.push({ number: lapNumber, time: lapTime, timestamp });
        updateLapsList();
    }
}

// Update laps list display
function updateLapsList() {
    lapsList.innerHTML = '';
    
    laps.forEach(lap => {
        const lapItem = document.createElement('li');
        lapItem.className = 'lap-item';
        
        const lapTime = new Date(lap.time);
        const hours = Math.floor(lap.time / (1000 * 60 * 60));
        const minutes = lapTime.getUTCMinutes();
        const seconds = lapTime.getUTCSeconds();
        const milliseconds = lapTime.getUTCMilliseconds();
        
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        
        lapItem.innerHTML = `
            <span>Lap ${lap.number}</span>
            <span>${formattedTime}</span>
            <span>${lap.timestamp}</span>
        `;
        
        lapsList.appendChild(lapItem);
    });
    
    // Scroll to the bottom to show the latest lap
    lapsList.scrollTop = lapsList.scrollHeight;
}

// Save laps to local storage
function saveLapsToStorage() {
    if (laps.length > 0) {
        localStorage.setItem('stopwatch-laps', JSON.stringify(laps));
        alert('Lap times saved successfully!');
    } else {
        alert('No lap times to save.');
    }
}

// Load laps from local storage
function loadLaps() {
    const savedLaps = localStorage.getItem('stopwatch-laps');
    if (savedLaps) {
        laps = JSON.parse(savedLaps);
        updateLapsList();
    }
}

// Clear all laps
function clearLaps() {
    laps = [];
    updateLapsList();
    localStorage.removeItem('stopwatch-laps');
}

// COUNTDOWN FUNCTIONS

// Set countdown time
function setCountdown() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    // Convert to milliseconds
    countdownTime = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
    
    if (countdownTime > 0) {
        updateCountdownDisplay(countdownTime);
    } else {
        alert('Please enter a valid time for the countdown.');
    }
}

// Start countdown
function startCountdown() {
    if (!isCountdownRunning && countdownTime > 0) {
        isCountdownRunning = true;
        countdownEndTime = Date.now() + countdownTime;
        countdownInterval = setInterval(updateCountdown, 1000);
    } else if (countdownTime <= 0) {
        alert('Please set a countdown time first.');
    }
}

// Stop countdown
function stopCountdown() {
    if (isCountdownRunning) {
        isCountdownRunning = false;
        clearInterval(countdownInterval);
        countdownTime = countdownEndTime - Date.now();
        if (countdownTime < 0) countdownTime = 0;
    }
}

// Reset countdown
function resetCountdown() {
    stopCountdown();
    countdownTime = 0;
    updateCountdownDisplay(countdownTime);
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
}

// Update countdown
function updateCountdown() {
    const remaining = countdownEndTime - Date.now();
    
    if (remaining <= 0) {
        stopCountdown();
        countdownTime = 0;
        updateCountdownDisplay(0);
        playAlarm();
        return;
    }
    
    updateCountdownDisplay(remaining);
}

// Update countdown display
function updateCountdownDisplay(timeInMs) {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000);
    
    countdownHoursElement.textContent = hours.toString().padStart(2, '0');
    countdownMinutesElement.textContent = minutes.toString().padStart(2, '0');
    countdownSecondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Play alarm sound when countdown reaches zero
function playAlarm() {
    // Create audio element
    const alarm = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    alarm.play();
    
    // Visual indication
    countdownContainer.querySelector('.display').classList.add('pulse');
    setTimeout(() => {
        countdownContainer.querySelector('.display').classList.remove('pulse');
    }, 3000);
    
    alert('Countdown finished!');
}

// VOICE CONTROL FUNCTIONS

// Setup voice recognition
function setupVoiceRecognition() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        // Initialize speech recognition
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = false;
        
        // Handle results
        recognition.onresult = function(event) {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            processVoiceCommand(transcript);
        };
        
        recognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            voiceStatus.textContent = `Error: ${event.error}`;
        };
    } else {
        voiceBtn.disabled = true;
        voiceStatus.textContent = 'Voice control not supported in this browser';
    }
}

// Toggle voice control
function toggleVoiceControl() {
    if (!recognition) {
        alert('Voice control is not supported in your browser.');
        return;
    }
    
    if (isVoiceControlActive) {
        // Stop voice recognition
        recognition.stop();
        isVoiceControlActive = false;
        voiceStatus.textContent = 'Voice control inactive';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice Control';
    } else {
        // Start voice recognition
        recognition.start();
        isVoiceControlActive = true;
        voiceStatus.textContent = 'Voice control active - try saying "start", "stop", "reset", or "lap"';
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Voice Control';
    }
}

// Process voice commands
function processVoiceCommand(command) {
    voiceStatus.textContent = `Command recognized: "${command}"`;
    
    // Stopwatch commands
    if (stopwatchContainer.classList.contains('active')) {
        if (command.includes('start')) {
            startStopwatch();
        } else if (command.includes('stop') || command.includes('pause')) {
            stopStopwatch();
        } else if (command.includes('reset')) {
            resetStopwatch();
        } else if (command.includes('lap')) {
            recordLap();
        }
    }
    // Countdown commands
    else if (countdownContainer.classList.contains('active')) {
        if (command.includes('start')) {
            startCountdown();
        } else if (command.includes('stop') || command.includes('pause')) {
            stopCountdown();
        } else if (command.includes('reset')) {
            resetCountdown();
        }
    }
    // Mode switching commands
    if (command.includes('switch to stopwatch') || command.includes('go to stopwatch')) {
        switchMode('stopwatch');
    } else if (command.includes('switch to countdown') || command.includes('go to countdown')) {
        switchMode('countdown');
    }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);