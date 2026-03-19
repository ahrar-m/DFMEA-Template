# DFMEA Generator Helper

A simple, browser-based tool to help you quickly build a Design Failure Mode and Effects Analysis (DFMEA) table, interactively fill it out, attach reference images, and export it directly to Excel or a professional PDF report. 

Instead of typing out hundreds of combinations manually, this tool asks you for your parts, their physical features, and how those specific features interact. It then does the heavy lifting by automatically generating all the "Potential Causes of Failure" for you, allowing you to seamlessly calculate RPNs right in your browser.

## 🔒 Security & Data Privacy (Safe for Sensitive Data)
**This tool is 100% secure for use with proprietary and sensitive engineering data.**
* **Zero Server Uploads:** This is a "client-side" only application. Absolutely none of the data you type, save, or import is ever sent to a server, cloud, or database. 
* **Local Processing:** All the math, matrix generation, and file creation happens entirely inside your local computer's memory (RAM) via your web browser.
* **Offline Capable:** The only internet connection required is to fetch the open-source generation libraries (`SheetJS`, `JSZip`, `pdfmake`) when you first open the page. Once the page is loaded, you can disconnect from the internet and the tool will continue to function, save, and export flawlessly.

## 🚀 How to Run

1. Download or save the code as an `.html` file (for example, `dfmea_helper.html`).
2. Double-click the file to open it in any modern web browser (Chrome, Edge, Firefox, Safari).

## 🛠️ Step-by-Step Guide

The tool is broken down into 7 easy steps:

### 1. Components
* **What to do:** List all the physical parts in your assembly. 
* **Tip:** You can type multiple parts separated by commas (e.g., *Base, Top Cover, Screws*) and press **Enter** to add them all at once.

### 2. Features
* **What to do:** List the specific physical traits of each part you just added.
* **Example:** For a "Base", the features might be *mounting holes, bottom surface, side walls*. Type them separated by commas and click save.

### 3. Interfaces Matrix
* **What to do:** Tell the tool which specific features physically touch or interact with each other. 
* **How it works:** It generates a highly granular grid mapping every feature against every other feature. Simply uncheck the boxes for feature combinations that have nothing to do with each other. 

### 4. Dimensions
* **What to do:** List the measurable dimensions for the features you entered. 
* **Example:** For a "mounting hole", the dimensions might be *diameter, depth*. 

### 5. Settings & Presets
* **Assign Extremes:** Tell the tool how your dimensions fail (e.g., a "height" fails by being "too high" or "too low"). 
    * **Global Mode:** Assigns an extreme to a dimension name everywhere it appears. 
    * **Specific Mode:** Lets you assign different extremes to the exact same dimension name depending on the component it belongs to.
* **CSV Presets:** Quickly add standard dropdown options for "Failure Mechanisms" and "Image Descriptions" using comma-separated lists.
* **Session Management:** Use **Save Session** (downloads a `.json` file) so you don't lose your exact setup. Use **Load Session** to pick right back up where you left off.

### 6. Generate & Populate
* **Form View:** Click **📝 Fill out Rows / Attach Images** to step through every generated cause. Assign Failure Mechanisms, Effects, and select your Severity (S), Occurrence (O), and Detection (D) scores from industry-standard criteria dropdowns. The tool auto-calculates your RPN.
* **Attach Images:** Paste (Ctrl+V) or upload reference images directly into the row and assign them descriptive captions.
* **Row Index:** Switch to the 📑 **Row Index** sub-tab to navigate massive DFMEAs easily. Click any grouped interface to jump straight to its rows.
* **Export:** Click **📦 Export ZIP** to download a compressed file containing your compiled Excel spreadsheet and a folder of all your attached images. 

### 7. PDF Report
* **What to do:** Upload the `.zip` file you exported in Step 6.
* **Finish:** The tool will read your Excel data and images and automatically compile a formal, paginated PDF report complete with a clickable Table of Contents and dedicated attachment pages. 

## ✨ Key Features
* **Runs Locally:** Your data never leaves your computer.
* **Hyper-Specific Generation:** The final table isolates interactions to the exact feature level (e.g., `Holder (Ribs) - Stand (Slots)`).
* **Interactive RPN & Dropdowns:** Evaluate your entire DFMEA, score your risks using built-in standard criteria, and duplicate rows cleanly inside the app.
* **Excel Round-Tripping:** Export your filled-out table to Excel, and import that `.xlsx` file back into the web tool later to continue making iterative changes.
* **Automated PDF Engine:** Converts your raw spreadsheet data and image attachments into a polished, presentation-ready PDF report instantly.