# DFMEA Generator Helper

A simple, browser-based tool to help you quickly build a Design Failure Mode and Effects Analysis (DFMEA) table and export it directly to Excel. 

Instead of typing out hundreds of combinations manually, this tool asks you for your parts, how they interact, and their physical features. It then does the heavy lifting by automatically generating all the "Potential Causes of Failure" for you.

## 🚀 How to Run

1. Download or save the code as an `.html` file (for example, `dfmea_helper.html`).
2. Double-click the file to open it in any modern web browser (Chrome, Edge, Firefox, Safari).
3. *Note: You need an active internet connection the first time you generate the Excel file, as it uses a secure online library (SheetJS) to build the spreadsheet.*

## 🛠️ Step-by-Step Guide

The tool is broken down into 6 easy tabs:

### 1. Components
* **What to do:** List all the physical parts in your assembly. 
* **Tip:** You can type multiple parts separated by commas (e.g., *Base, Top Cover, Screws*) and press **Enter** to add them all at once.

### 2. Interfaces Matrix
* **What to do:** Tell the tool which parts actually touch or interact with each other. 
* **How it works:** It generates a grid of all your parts. Simply uncheck the boxes for parts that have nothing to do with each other. The tool will remember your choices.

### 3. Features
* **What to do:** List the specific physical traits of each part.
* **Example:** For a "Base", the features might be *mounting holes, bottom surface, side walls*. Type them separated by commas and click **Save Features & Continue**.

### 4. Dimensions
* **What to do:** List the measurable dimensions for the features you just entered. 
* **Example:** For a "mounting hole", the dimensions might be *diameter, depth*. Type them separated by commas and click **Save Dimensions & Continue**.

### 5. Settings (and Saving)
* **Dimension Extremes Presets:** This tells the tool how things fail. For example, if a dimension is "height", it knows the failure extreme is "too high" or "too low". You can add your own custom keywords here.
* **Session Management:** Building a DFMEA takes time! Use this to **Save Session** (downloads a `.json` file to your computer) so you don't lose your work. Next time you open the tool, use **Load Session** to pick right back up where you left off.

### 6. Generate & Export
* **What to do:** Review the preview table to make sure everything looks correct. It will neatly list every component interaction, the feature, the dimension, and the extreme failure state.
* **Finish:** Click **Export to Excel (.xlsx)** to download your formatted DFMEA spreadsheet!

## ✨ Key Features
* **Runs Locally:** Your data never leaves your computer. Everything happens right inside your web browser.
* **Smart Sorting:** The final table groups component interactions logically so it is easy to read.
* **Auto-Cleanup:** If you delete a part on Step 1, the tool automatically cleans up any features or dimensions attached to it in the background.