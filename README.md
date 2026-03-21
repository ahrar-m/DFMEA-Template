# DFMEA Generator Helper

A browser-based tool designed to help engineers build Design Failure Mode and Effects Analysis (DFMEA) tables, interactively score risks using industry-standard criteria, attach reference images, and export directly to Excel or a paginated PDF report. 

This tool works entirely offline on your local machine, ensuring all your proprietary data remains 100% secure.

---

## 📥 Installation & Setup
1. **Download:** Click the green **`<> Code`** button at the top of this repository and select **Download ZIP**.
2. **Extract:** Extract the downloaded ZIP file to a folder on your computer.
3. **Run:** Open the extracted folder and double-click `DFMEA Helper.html` to open it in Chrome, Edge, Firefox, or Safari. 

---

## 🛠️ Step-by-Step Guide

### 1. Components
List all the physical parts in your assembly. You can type multiple parts separated by commas and press **Enter** to add them all at once.

### 2. Features
List the specific physical traits of each part you just added (e.g., *mounting holes, side walls, retaining clips*).

### 3. Dimensions & Feature Images
* **Dimensions:** Add measurable dimensions for your features (e.g., *diameter, depth, thickness*). 
* **Visual References:** Paste (`Ctrl+V`) or upload reference photos for specific component features. These will appear later to guide you while scoring rows and will be compiled into the final PDF.
* *Note: You can jump directly to any component using the Index at the top of the page.*

### 4. Interfaces Matrix
A grid will generate mapping every feature against every other feature. Uncheck the boxes for feature combinations that do not physically touch or interact. You can download a high-quality image of this matrix by clicking the **Download Matrix** button.

### 5. Settings & Presets
* **Manage Dimension Presets:** Define how your dimensions fail (e.g., *too high/too low*). They will become available as dropdown options back in Tab 3.
* **Dropdown Presets:** Quickly add standard dropdown options for "Failure Modes", "Failure Effects", and "Image Descriptions" using comma-separated lists.
* **Save/Load:** Use **Save Session** (downloads a `.json` file) to safely back up your progress, and **Load Session** to restore it later.

### 6. Generate & Populate
* **Form View:** Step through every generated cause. The tool will display your Feature Reference Images (from Tab 3) to give you visual context.
* **Scoring:** Select Failure Modes and Effects from your presets, and assign your Severity, Occurrence, and Detection scores. The tool automatically calculates and color-codes your RPN.
* **Attach Row Images:** Paste or upload reference images directly into the specific row and assign them multi-line descriptive captions. 
* **Export:** Click **Export Excel Spreadsheet** to download your compiled data.

### 7. PDF Report
Upload the `.json` session file you saved in Tab 5. The tool will read your data and automatically compile a formal, paginated PDF report complete with a clickable Table of Contents and dedicated image attachment pages.