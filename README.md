# DFMEA Generator Helper

A simple, browser-based tool to help you quickly build a Design Failure Mode and Effects Analysis (DFMEA) table, interactively fill it out, and export it directly to Excel. 

Instead of typing out hundreds of combinations manually, this tool asks you for your parts, their physical features, and how those specific features interact. It then does the heavy lifting by automatically generating all the "Potential Causes of Failure" for you, allowing you to seamlessly calculate RPNs right in your browser.

## 🔒 Security & Data Privacy (Safe for Sensitive Data)
**This tool is 100% secure for use with proprietary and sensitive engineering data.**
* **Zero Server Uploads:** This is a "client-side" only application. Absolutely none of the data you type, save, or import is ever sent to a server, cloud, or database. 
* **Local Processing:** All the math, matrix generation, and Excel file creation happens entirely inside your local computer's memory (RAM) via your web browser.
* **Offline Capable:** The only internet connection required is to fetch the open-source Excel generation library (`SheetJS`) when you first open the page. Once the page is loaded, you can disconnect from the internet and the tool will continue to function, save, and export flawlessly.

## 🚀 How to Run

1. Download or save the code as an `.html` file (for example, `dfmea_helper.html`).
2. Double-click the file to open it in any modern web browser (Chrome, Edge, Firefox, Safari).
3. *Note: You need an active internet connection the first time you generate the Excel file, as it uses a secure online library (SheetJS) to build the spreadsheet.*

## 🛠️ Step-by-Step Guide

The tool is broken down into 6 easy steps:

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
    * **Specific Mode:** Lets you assign different extremes to the exact same dimension name depending on the component it belongs to. *(Tip: Start in Global to cover the majority, then switch to Specific to fine-tune edge cases!)*
* **Session Management:** Use **Save Session** (downloads a `.json` file) so you don't lose your exact setup. Use **Load Session** to pick right back up where you left off.

### 6. Generate, Populate, & Export
* **Fill out in Browser:** Click **📝 Fill out Excel Rows in Browser** to step through every generated cause one by one. You can type in the Failure Mode, Effect, and enter your Severity (S), Occurrence (O), and Detection (D) scores. The tool will auto-calculate and color-code your RPN!
* **Duplicate Rows:** If a single cause results in multiple different failure modes, click the **+ Add Another Failure Mode** button to instantly duplicate the row.
* **Load Populated Excel:** If you exported a half-finished DFMEA yesterday, click **📂 Load Populated Excel** to upload that `.xlsx` file back into the tool and resume your work right where you left off.
* **Finish:** Click **⬇ Quick Export to Excel (.xlsx)** to download your finalized DFMEA spreadsheet.

## ✨ Key Features
* **Runs Locally:** Your data never leaves your computer. Everything happens safely inside your web browser.
* **Hyper-Specific Generation:** The final table isolates interactions to the exact feature level (e.g., `Holder (Ribs) - Stand (Slots)`), generating highly accurate root causes.
* **Interactive RPN Calculator:** No need to jump into Excel immediately. You can evaluate your entire DFMEA, score your risks, and duplicate rows cleanly inside the app.
* **Excel Round-Tripping:** Export your filled-out table to Excel, share it with a colleague, and import it back into the web tool later to continue making iterative changes.
* **Auto-Cleanup:** If you delete a part or a feature in earlier steps, the tool automatically cleans up any orphaned interfaces or dimensions in the background.

## Future Scope
- Add Dropdowns for Severity, Occurence and Detection based on guidelines for easy selection.