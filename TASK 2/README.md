# Interactive Stopwatch Web Application

## Overview
This is a responsive and user-friendly stopwatch web application that allows users to accurately measure and record time intervals. The application features both a stopwatch and countdown timer with a clean, intuitive interface that works well on both desktop and mobile devices.

## Features

### Basic Stopwatch Functionality
- **Start, Stop, and Reset**: Control the stopwatch with intuitive buttons
- **Precise Time Display**: Shows hours, minutes, seconds, and milliseconds
- **Lap Recording**: Record and display lap times with timestamps
- **Lap Management**: Save lap times to local storage or clear them as needed

### User Interface
- **Clean Design**: Intuitive layout with contrasting colors for better visibility
- **Current Time Display**: Shows the current date and time above the stopwatch
- **Responsive Layout**: Adapts to different screen sizes for optimal viewing on any device

### Accessibility Features
- **Keyboard Shortcuts**:
  - Space: Start/Stop the stopwatch or countdown
  - R: Reset the current timer
  - L: Record a lap (in stopwatch mode)
- **Voice Command Support**:
  - Start/stop the stopwatch using voice commands
  - Record laps and reset using voice
  - Switch between modes using voice

### Additional Features
- **Theme Customization**: Choose from multiple themes (Default, Dark, Light, Neon)
- **Countdown Timer**: Toggle between stopwatch and countdown modes
- **Lap Timestamps**: Each lap is recorded with a timestamp for reference
- **Local Storage**: Preferences and lap times are saved between sessions

### Technical Details
- Built with vanilla HTML, CSS, and JavaScript
- Uses the Web Speech API for voice command functionality
- Implements local storage for saving user preferences and lap times
- Responsive design using CSS flexbox and media queries

## Setup Instructions

### Local Setup
1. Clone or download this repository to your local machine
2. Open the `index.html` file in a web browser

### Hosting the Application
To host the application on a web server:
1. Upload all files (index.html, styles.css, script.js) to your web hosting service
2. Ensure all files are in the same directory
3. Access the application through your domain

## Browser Compatibility
The application has been tested and works on the following browsers:
- Google Chrome (recommended for full voice command support)
- Mozilla Firefox
- Microsoft Edge
- Safari

## Usage Guide

### Stopwatch Mode
1. Click the "Start" button to begin the stopwatch
2. Click "Stop" to pause the stopwatch
3. Click "Reset" to set the stopwatch back to zero
4. Click "Lap" to record the current time as a lap
5. Use "Save Laps" to store lap times in local storage
6. Use "Clear Laps" to remove all recorded laps

### Countdown Mode
1. Enter the desired hours, minutes, and seconds
2. Click "Set Timer" to confirm the countdown time
3. Click "Start" to begin the countdown
4. Click "Stop" to pause the countdown
5. Click "Reset" to clear the countdown timer

### Voice Commands
To use voice commands:
1. Click the "Voice Control" button to activate
2. Speak commands clearly (e.g., "start", "stop", "reset", "lap")
3. The status will show the recognized command
4. Click "Stop Voice Control" to deactivate

### Theme Selection
Use the theme dropdown in the top-right corner to select your preferred theme:
- Default: Blue and white theme
- Dark: Dark blue theme with light text
- Light: Purple and white theme
- Neon: Black background with bright neon colors

## License
This project is open source and available for personal and commercial use.

## Feedback and Contributions
Feedback and contributions are welcome. Please feel free to submit issues or pull requests to improve the application.