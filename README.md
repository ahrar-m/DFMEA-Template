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
* **Visual References & Placeholders:** Add placeholder slots or upload/paste (`Ctrl+V` or one-click `Paste Clipboard`) reference photos for component features. These guide you while scoring and will be compiled into the report.
* *Note: You can jump directly to any component using the Index at the top of the page.*

### 4. Interfaces Matrix
A grid maps every feature against every other feature. Toggle checkboxes to define physical interactions. You can use bulk row/column toggles (☑) to select or deselect entire features at once.
* **Matrix Comments:** Click the `💬` button on any intersection cell to add/edit inline design comments. Cells with comments feature an orange corner dogear indicator. Hovering over a cell displays the comment text in a styled HTML tooltip. Comments cascade automatically during component/feature renames, serialize with the JSON session, and export directly as cell comments in the Excel worksheet.

### 5. Settings & Presets
* **Manage Dimension Presets:** Define how your dimensions fail (e.g., *too high/too low* or single extremes like *too large*).
* **Dropdown Presets:** Quickly add dropdown options for Failure Modes, Failure Effects, and Image Descriptions.
* **Cascading Renames:** Edit/rename any preset (including extreme dimension presets) to automatically cascade and update all linked feature dimensions, generated cause texts, and image descriptions session-wide.
* **Save/Load & Cleanup:** Save/load sessions as `.json` files. The tool automatically performs database garbage collection to clean up orphaned entries from deleted features or components.

### 6. Generate & Populate
* **Form View:** Step through every generated cause. Visual context (Feature Reference Images) is shown as you score.
* **Navigation:** Skip directly to incomplete rows using the **Skip to Next Unfilled** search button, or use the **Prev/Next Dimension** (⏮/⏭) and **Prev/Next Configuration** (◀/▶) buttons to jump between dimensions and extreme configurations.
* **Feedback Animations:** Smooth visual flash highlights pulse the Interface/Cause box and container card upon navigation to visually confirm row changes.
* **Scoring:** Select Failure Modes and Effects from presets and assign S, O, D values. RPN is calculated automatically.
* **Attach Row Images:** Paste/upload reference images directly into specific rows with multi-line captions and clean zoom-clamped previews, or quickly select existing reference images from your feature library.
* **Reference Image De-duplication:** Duplicate reference images under the "Reference Images for this Interface" section are automatically filtered out, ensuring a clean, uncluttered interface.
* **Export:** Export directly to a clean 9-column Excel spreadsheet. If 0 rows are filled, you can export a skeleton sheet containing all checked interfaces and dimensions.

### 7. PDF Report
Upload the `.json` session file. The tool compiles a professional, paginated PDF report complete with a clickable Table of Contents, page-break layouts, interface comments/notes (matrix comments are integrated as dedicated context notes under respective failure lines), and reference images consolidated into an Appendix at the end with dynamic back-links.