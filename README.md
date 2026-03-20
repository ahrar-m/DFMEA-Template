# DFMEA Generator Helper (Secure Offline Edition)

A professional, browser-based tool to help you build a Design Failure Mode and Effects Analysis (DFMEA) table, interactively score risks using industry-standard criteria, attach reference images, and export directly to Excel or a paginated PDF report. 

By defining your physical components and how their specific features interact, this tool automatically generates every "Potential Cause of Failure" permutation, saving you hours of manual data entry.

---

## 🔒 Security & Data Privacy
**This tool is 100% secure for use with proprietary and sensitive engineering data.**
* **Strictly Offline:** This application requires zero internet connection to function. Absolutely none of your proprietary data, images, or structures are ever sent to a server.
* **Local Processing:** All matrix generation, risk calculations, lossless image processing, ZIP bundling, and PDF rendering happen entirely inside your local computer's memory (RAM) via your web browser.

---

## 📥 Installation & Setup

Everything you need to run this tool securely offline is already included in this repository.

1. **Download:** Click the green **`<> Code`** button at the top of this GitHub repository and select **Download ZIP**.
2. **Extract:** Extract the downloaded ZIP file to a folder on your computer or local network drive.
3. **Run:** Open the extracted folder and double-click `dfmea_helper.html` to open it in Chrome, Edge, Firefox, or Safari. 

*You can now completely disconnect from the internet; the tool will run entirely locally.*

---

## 🛠️ Step-by-Step Guide

The tool is broken down into 7 easy steps:

### 1. Components
* List all the physical parts in your assembly. You can type multiple parts separated by commas and press **Enter** to add them all at once.

### 2. Features
* List the specific physical traits of each part you just added (e.g., *mounting holes, side walls, retaining clips*).

### 3. Interfaces Matrix
* A grid will generate mapping every feature against every other feature. Uncheck the boxes for feature combinations that do not physically touch or interact. The live counter will show how many active interface combinations you have.

### 4. Dimensions & Feature Images
* Add measurable dimensions for your features (e.g., *diameter, depth, thickness*). 
* **Visual References:** Paste (`Ctrl+V`) or upload reference photos for specific component features. These will appear later to guide you while scoring rows and will be compiled into the final PDF.

### 5. Settings & Presets
* **Assign Extremes:** Define how your dimensions fail (e.g., *too high/too low*). You can set these globally or per-feature.
* **CSV Presets:** Quickly add standard dropdown options for "Failure Mechanisms" and "Image Descriptions" using comma-separated lists.
* **Session Management:** Use **Save Session** (downloads a `.json` file) to safely back up your progress, and **Load Session** to restore it later.

### 6. Generate & Populate
* **Form View:** Step through every generated cause. The tool will display your Feature Reference Images (from Tab 4) to give you visual context.
* **Scoring:** Assign Failure Mechanisms, Effects, and select your Severity, Occurrence, and Detection scores from detailed, industry-standard dropdowns. The tool automatically calculates and color-codes your RPN.
* **Attach Row Images:** Paste or upload reference images directly into the specific row and assign them descriptive captions. *(Note: The tool automatically converts modern image formats like WebP into PDF-safe lossless formats in the background).*
* **Smart Merge:** If you go back to add new parts or dimensions, the tool will safely merge the new rows without deleting your existing filled-out work.
* **Export:** Click **📦 Export ZIP** to download a compressed file containing your compiled Excel spreadsheet and a folder of all attached images. 

### 7. PDF Report
* Upload the `.zip` file you exported in Step 6.
* **Customize:** Add a custom report title, choose how your Table of Contents is grouped (Collapsed Ranges vs. Individual RPNs), toggle entire PDF sorting by RPN (highest risk first), and choose to skip blank rows.
* **Generate:** The tool will read your Excel data and images and automatically compile a formal, paginated PDF report complete with a clickable Table of Contents and dedicated image attachment pages.

## Future Scope
- TBD