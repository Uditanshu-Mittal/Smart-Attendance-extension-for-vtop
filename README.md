# College Portal Smart Attendance Extension

A lightweight Google Chrome extension built using **Manifest V3** that dynamically injects a "Smart Status" column into the college attendance portal. It automatically calculates how many classes a student can safely skip (bunk) or needs to attend consecutively to maintain a **75% attendance threshold**.

## Features
- **Direct Table Injection:** Automatically finds the attendance table and appends a native-looking "Smart Status" column.
- **Dynamic Math Engine:** Calculates safe skips if attendance is $\ge$ 75%, or required consecutive classes if it falls below 75%.
- **Race-Condition Safe:** Uses a MutationObserver and row-level locking to wait for asynchronous portal data to load before executing.

## Gallery
Without extension:
<img width="1766" height="671" alt="Screenshot 2026-06-03 105936" src="https://github.com/user-attachments/assets/95f8a2ba-08d9-460a-908f-7cec1b444e46" />

With Extension:
<img width="1810" height="688" alt="image" src="https://github.com/user-attachments/assets/168515ed-f547-44b6-8fc4-8649688bedd1" />


## Configuration & Setup
Before loading the extension, you need to configure it for your specific college portal layout:

1. **Clone/Download** this repository to your local machine.
2. Open `content.js` and adjust `attendedIndex` and `totalIndex` near the top of the file to match the 0-based column indices of your portal's table layout.
3. For someone using it outside VIT, change website link from "vtop.vit.ac.in" to your college portal in ```manifest.json``` file.
  
## How to Install (Developer Mode)
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click the **Load unpacked** button in the top-left corner.
4. Select the folder containing these files.
5. Log into your college portal and navigate to your attendance page!
