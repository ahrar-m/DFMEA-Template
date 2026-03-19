# DFMEA Generator Helper (Secure Single-File Edition)

A professional, browser-based tool to help you build a Design Failure Mode and Effects Analysis (DFMEA) table, interactively score risks, attach reference images, and export directly to Excel or a paginated PDF report. 

By defining your physical components and how their specific features interact, this tool automatically generates every "Potential Cause of Failure" permutation, saving you hours of manual data entry.

---

## 🔒 Security & Data Privacy
**This tool is 100% secure for use with proprietary and sensitive engineering data.**
* **Strictly Offline:** This application requires zero internet connection to function. Absolutely none of your proprietary data, images, or structures are ever sent to a server.
* **Fully Self-Contained:** All required libraries for generating Excel files, rendering PDFs, and bundling ZIPs have been hardcoded directly into the file. There are no external folders or dependencies.
* **Local Processing:** All matrix generation, risk calculations, and file creation happen entirely inside your local device's memory (RAM) via your web browser.

---

## 📥 Installation & Setup

Because everything is packaged into one standalone file, setup is effortless and works natively on PCs, Macs, and Mobile devices (including Android).

1. **Download:** Click the green **`<> Code`** button at the top of this GitHub repository and select **Download ZIP** (or simply download the `dfmea_helper.html` file directly).
2. **Extract:** If you downloaded the ZIP, extract it to a folder on your computer.
3. **Run:** Double-click the `dfmea_helper.html` file to open it in Chrome, Edge, Firefox, or Safari. 

*You can now completely disconnect from the internet, or move this single file to a secure, air-gapped environment. It will run entirely locally.*

---

## 🛠️ Step-by-Step Guide

### 1. Components
* List all the physical parts in your assembly. 
* *Tip:* You can type multiple parts separated by commas (e.g., *Base, Top Cover, Screws*) and press **Enter** to add them all at once.

### 2. Features
* List the specific physical traits of each part you just added (e.g., *mounting holes, side walls, retaining clips*).

### 3. Interfaces Matrix
* A highly granular grid will generate mapping every feature against every other feature. Uncheck the boxes for feature combinations that do not physically touch or interact.

### 4. Dimensions
* List the measurable dimensions for your features (e.g., *diameter, depth, thickness*). 

### 5. Settings & Presets
* **Assign Extremes:** Define how your dimensions fail.
    * **Global Mode:** Assigns an extreme (e.g., *too high/too low*) to a dimension name everywhere it appears. 
    * **Specific Mode:** Lets you assign different extremes to the exact same dimension name depending on the component it belongs to.
* **CSV Presets:** Quickly add standard dropdown options for "Failure Mechanisms" and "Image Descriptions" using comma-separated lists.
* **Session Management:** Use **Save Session** (downloads a `.json` file) to back up your setup. Use **Load Session** to restore it later.

### 6. Generate & Populate
* **Form View:** Click **📝 Fill out Rows / Attach Images** to step through every generated cause. Assign Failure Mechanisms, Effects, and select your Severity (S), Occurrence (O), and Detection (D) scores from industry-standard criteria dropdowns.
* **Attach Images:** Paste (`Ctrl+V`) or upload reference images directly into the row and assign them descriptive captions.
* **Row Index:** Switch to the 📑 **Row Index** sub-tab to navigate massive DFMEAs hierarchically.
* **Export:** Click **📦 Export ZIP** to download a compressed file containing your compiled Excel spreadsheet and a folder of all attached images. 

### 7. PDF Report
* Upload the `.zip` file you exported in Step 6.
* The tool will read your Excel data and images and automatically compile a formal, paginated PDF report complete with a clickable Table of Contents and dedicated attachment pages.