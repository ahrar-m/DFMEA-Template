// Global session state
    let fmeaSession = {
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {},
        step6: {},
        step7: {}
    };

    // Structure Analysis state
    let structureData = {
        components: [],
        matrix: {}
    };

    // Inline editing states
    let editingComponentId = null;
    let editingSubcomponentId = null;

    // Tab switching logic
    function switchTab(tabIndex) {
        document.querySelectorAll('.tab').forEach((tab, index) => {
            if (index + 1 === tabIndex) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        document.querySelectorAll('.tab-content').forEach((content, index) => {
            if (index + 1 === tabIndex) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        
        // Refresh views if switching to Step 2
        if (tabIndex === 2) {
            renderStructureTree();
            renderComponentInteractions();
            renderStep2Image();
        }
    }

    // Save session as JSON file
    function exportSession() {
        fmeaSession.step2 = structureData;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fmeaSession, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "dfmea_session.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }

    // Import session from JSON file
    function importSession(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const parsed = JSON.parse(e.target.result);
                
                // Detect if the session is in the old flat format
                let isOldFormat = false;
                if (!parsed.step2 && Array.isArray(parsed.components) && (parsed.components.length === 0 || typeof parsed.components[0] === 'string')) {
                    isOldFormat = true;
                }

                if (isOldFormat) {
                    console.log("Migrating older session JSON format to AIAG-VDA structure...");
                    const compIdMap = {};
                    
                    // Convert component strings to component objects with subcomponents
                    const newComponents = parsed.components.map((compName, index) => {
                        const compId = 'comp_' + (Date.now() + index);
                        compIdMap[compName] = compId;
                        
                        const features = (parsed.featuresByComp && parsed.featuresByComp[compName]) || [];
                        const subcomponents = features.map((featName, fIndex) => {
                            return {
                                id: 'sub_' + (Date.now() + index + 1000 + fIndex),
                                name: featName
                            };
                        });

                        return {
                            id: compId,
                            name: compName,
                            subcomponents: subcomponents
                        };
                    });

                    // Convert boolean interfaces to component-level physical interactions (P)
                    const newMatrix = {};
                    if (parsed.interfaces) {
                        Object.keys(parsed.interfaces).forEach(key => {
                            if (parsed.interfaces[key]) {
                                const parts = key.split('::');
                                if (parts.length === 2) {
                                    const comp1 = parts[0].split('|')[0];
                                    const comp2 = parts[1].split('|')[0];
                                    const id1 = compIdMap[comp1];
                                    const id2 = compIdMap[comp2];
                                    if (id1 && id2) {
                                        const key1 = id1 + '-' + id2;
                                        const key2 = id2 + '-' + id1;
                                        newMatrix[key1] = { p: true, e: false, i: false, m: false };
                                        newMatrix[key2] = { p: true, e: false, i: false, m: false };
                                    }
                                }
                            }
                        });
                    }

                    const step2Data = {
                        components: newComponents,
                        matrix: newMatrix
                    };

                    fmeaSession = {
                        ...fmeaSession,
                        ...parsed,
                        step2: step2Data
                    };
                } else {
                    fmeaSession = { ...fmeaSession, ...parsed };
                }

                if (fmeaSession.step2) {
                    structureData = fmeaSession.step2;
                }
                
                alert("Session loaded successfully!");
                renderStructureTree();
                renderComponentInteractions();
                renderStep2Image();
            } catch (err) {
                alert("Error parsing JSON session file: " + err.message);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    // Theme toggle helper
    function toggleTheme() {
        const body = document.body;
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        document.getElementById('themeBtn').innerText = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
        localStorage.setItem('dfmea-theme', isLight ? 'light' : 'dark');
    }

    // Width toggle helper
    function toggleWidth() {
        const cont = document.querySelector('.container');
        cont.classList.toggle('expanded');
        const isExp = cont.classList.contains('expanded');
        document.getElementById('widthBtn').innerText = isExp ? '⬌ Standard Width' : '↔ Expand Width';
        localStorage.setItem('dfmea-width', isExp ? 'expanded' : 'standard');
    }

    // --- STEP 2: STRUCTURE ANALYSIS LOGIC ---

    function addStructureComponent() {
        const input = document.getElementById('newCompInput');
        const rawInput = input.value.trim();
        if (!rawInput) return;

        const names = rawInput.split(',').map(name => name.trim()).filter(name => name.length > 0);
        
        names.forEach((name, index) => {
            const newComp = {
                id: 'comp_' + (Date.now() + index),
                name: name,
                subcomponents: []
            };
            structureData.components.push(newComp);
        });

        input.value = '';
        renderStructureTree();
        renderComponentInteractions();
    }

    function deleteStructureComponent(compId) {
        if (!confirm("Are you sure you want to delete this component?")) return;
        
        // Clean up all matrix keys containing this component ID
        Object.keys(structureData.matrix).forEach(key => {
            if (key.includes(compId)) {
                delete structureData.matrix[key];
            }
        });

        structureData.components = structureData.components.filter(c => c.id !== compId);
        renderStructureTree();
        renderComponentInteractions();
    }

    function addStructureSubcomponent(compId) {
        const input = document.getElementById('subInput-' + compId);
        const rawInput = input.value.trim();
        if (!rawInput) return;

        const comp = structureData.components.find(c => c.id === compId);
        if (!comp) return;

        const names = rawInput.split(',').map(name => name.trim()).filter(name => name.length > 0);

        names.forEach((name, index) => {
            const newSub = {
                id: 'sub_' + (Date.now() + index),
                name: name
            };
            comp.subcomponents.push(newSub);
        });

        input.value = '';
        renderStructureTree();
        renderComponentInteractions();
    }

    function deleteStructureSubcomponent(compId, subId) {
        if (!confirm("Are you sure you want to delete this subcomponent/feature?")) return;

        const comp = structureData.components.find(c => c.id === compId);
        if (!comp) return;

        comp.subcomponents = comp.subcomponents.filter(s => s.id !== subId);
        renderStructureTree();
        renderComponentInteractions();
    }

    function toggleComponentPeim(compId1, compId2, type) {
        const key1 = compId1 + '-' + compId2;
        const key2 = compId2 + '-' + compId1;
        const lowercaseType = type.toLowerCase();

        if (!structureData.matrix[key1]) {
            structureData.matrix[key1] = { p: false, e: false, i: false, m: false };
        }
        if (!structureData.matrix[key2]) {
            structureData.matrix[key2] = { p: false, e: false, i: false, m: false };
        }

        const val = !structureData.matrix[key1][lowercaseType];
        structureData.matrix[key1][lowercaseType] = val;
        structureData.matrix[key2][lowercaseType] = val;

        renderComponentInteractions();
    }

    function startEditComponent(compId) {
        editingComponentId = compId;
        editingSubcomponentId = null;
        renderStructureTree();
    }

    function cancelEditComponent() {
        editingComponentId = null;
        renderStructureTree();
    }

    function saveEditComponent(compId) {
        const input = document.getElementById('editCompInput-' + compId);
        const newName = input.value.trim();
        if (!newName) return;

        const comp = structureData.components.find(c => c.id === compId);
        if (comp) {
            comp.name = newName;
        }

        editingComponentId = null;
        renderStructureTree();
        renderComponentInteractions();
    }

    function startEditSubcomponent(subId) {
        editingSubcomponentId = subId;
        editingComponentId = null;
        renderStructureTree();
    }

    function cancelEditSubcomponent() {
        editingSubcomponentId = null;
        renderStructureTree();
    }

    function saveEditSubcomponent(compId, subId) {
        const input = document.getElementById('editSubInput-' + subId);
        const newName = input.value.trim();
        if (!newName) return;

        const comp = structureData.components.find(c => c.id === compId);
        if (comp) {
            const sub = comp.subcomponents.find(s => s.id === subId);
            if (sub) {
                sub.name = newName;
            }
        }

        editingSubcomponentId = null;
        renderStructureTree();
        renderComponentInteractions();
    }

    function moveComponent(index, direction) {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= structureData.components.length) return;

        const temp = structureData.components[index];
        structureData.components[index] = structureData.components[newIndex];
        structureData.components[newIndex] = temp;

        renderStructureTree();
        renderComponentInteractions();
    }

    function moveSubcomponent(compId, index, direction) {
        const comp = structureData.components.find(c => c.id === compId);
        if (!comp) return;

        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= comp.subcomponents.length) return;

        const temp = comp.subcomponents[index];
        comp.subcomponents[index] = comp.subcomponents[newIndex];
        comp.subcomponents[newIndex] = temp;

        renderStructureTree();
        renderComponentInteractions();
    }

    function renderStructureTree() {
        const container = document.getElementById('structureTreeContainer');
        if (structureData.components.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px; border: 1px dashed var(--border); border-radius: 6px;">No components added yet. Use the input above to add a parent component.</div>`;
            return;
        }

        let html = '';
        structureData.components.forEach((comp, compIndex) => {
            html += `
            <div class="tree-component-card">
            `;

            if (comp.id === editingComponentId) {
                html += `
                <div class="tree-header" style="gap: 5px;">
                    <input type="text" id="editCompInput-${comp.id}" value="${escapeHtml(comp.name)}" style="flex: 1; font-size: 13px; padding: 4px 8px;">
                    <button class="btn-success" onclick="saveEditComponent('${comp.id}')" style="padding: 4px 8px; font-size: 11px;">💾</button>
                    <button class="btn-outline" onclick="cancelEditComponent()" style="padding: 4px 8px; font-size: 11px; border-color: var(--border); width: auto;">✕</button>
                </div>
                `;
            } else {
                html += `
                <div class="tree-header">
                    <span class="tree-title">📦 ${escapeHtml(comp.name)}</span>
                    <div class="action-buttons" style="display: flex; gap: 4px;">
                        <button class="btn-outline" onclick="moveComponent(${compIndex}, -1)" ${compIndex === 0 ? 'disabled' : ''} style="padding: 3px 6px; font-size: 11px; width: auto;" title="Move Up">▲</button>
                        <button class="btn-outline" onclick="moveComponent(${compIndex}, 1)" ${compIndex === structureData.components.length - 1 ? 'disabled' : ''} style="padding: 3px 6px; font-size: 11px; width: auto;" title="Move Down">▼</button>
                        <button class="btn-info" onclick="startEditComponent('${comp.id}')" style="padding: 3px 6px; font-size: 11px; width: auto;" title="Rename">✏️</button>
                        <button class="btn-danger" onclick="deleteStructureComponent('${comp.id}')" style="padding: 3px 6px; font-size: 11px; width: auto;" title="Delete">🗑️</button>
                    </div>
                </div>
                `;
            }

            html += `
                <div class="subcomp-list">
            `;

            if (comp.subcomponents.length === 0) {
                html += `<div style="font-size: 12px; color: var(--text-muted); font-style: italic; margin-bottom: 10px; padding-left: 5px;">No subcomponents/features defined (Component only).</div>`;
            } else {
                comp.subcomponents.forEach((sub, subIndex) => {
                    if (sub.id === editingSubcomponentId) {
                        html += `
                        <div class="subcomp-item" style="gap: 5px; padding: 4px 10px;">
                            <input type="text" id="editSubInput-${sub.id}" value="${escapeHtml(sub.name)}" style="flex: 1; font-size: 12px; padding: 2px 6px; background: var(--bg); color: var(--text-main); border: 1px solid var(--border);">
                            <button class="btn-success" onclick="saveEditSubcomponent('${comp.id}', '${sub.id}')" style="padding: 2px 6px; font-size: 10px;">💾</button>
                            <button class="btn-outline" onclick="cancelEditSubcomponent()" style="padding: 2px 6px; font-size: 10px; border-color: var(--border); width: auto;">✕</button>
                        </div>
                        `;
                    } else {
                        html += `
                        <div class="subcomp-item">
                            <span>🔹 ${escapeHtml(sub.name)}</span>
                            <div class="subcomp-actions" style="display: flex; gap: 4px;">
                                <button class="btn-outline" onclick="moveSubcomponent('${comp.id}', ${subIndex}, -1)" ${subIndex === 0 ? 'disabled' : ''} style="padding: 2px 5px; font-size: 9px; width: auto;" title="Move Up">▲</button>
                                <button class="btn-outline" onclick="moveSubcomponent('${comp.id}', ${subIndex}, 1)" ${subIndex === comp.subcomponents.length - 1 ? 'disabled' : ''} style="padding: 2px 5px; font-size: 9px; width: auto;" title="Move Down">▼</button>
                                <button class="btn-info" onclick="startEditSubcomponent('${sub.id}')" style="padding: 2px 5px; font-size: 9px; width: auto;" title="Rename">✏️</button>
                                <button class="btn-danger" onclick="deleteStructureSubcomponent('${comp.id}', '${sub.id}')" style="padding: 2px 5px; font-size: 9px; width: auto;" title="Delete">&times;</button>
                            </div>
                        </div>
                        `;
                    }
                });
            }

            html += `
                </div>
                <div class="subcomp-input-group">
                    <input type="text" id="subInput-${comp.id}" placeholder="Subcomponent/Feature Name" onkeypress="if(event.key === 'Enter') addStructureSubcomponent('${comp.id}')">
                    <button onclick="addStructureSubcomponent('${comp.id}')">+ Add</button>
                </div>
            </div>
            `;
        });

        container.innerHTML = html;
    }

    function renderComponentInteractions() {
        const container = document.getElementById('componentInteractionsContainer');
        const comps = structureData.components;
        if (comps.length < 2) {
            container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px; border: 1px dashed var(--border); border-radius: 6px; font-size: 13px;">Add at least two components in the Structure Tree to view the Component Interfaces Matrix.</div>`;
            return;
        }

        let html = '<table>';
        
        // Header row
        html += '<thead><tr><th>Component</th>';
        comps.forEach(comp => {
            const subTitle = comp.subcomponents.length === 0 
                ? "No features defined (Component Only)" 
                : comp.subcomponents.map(s => "• " + s.name).join("\n");
            html += `<th title="${escapeHtml(comp.name)} - Features:\n${escapeHtml(subTitle)}">📦 ${escapeHtml(comp.name)}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Table body rows
        comps.forEach((rowComp, i) => {
            const subTitle = rowComp.subcomponents.length === 0 
                ? "No features defined (Component Only)" 
                : rowComp.subcomponents.map(s => "• " + s.name).join("\n");
            html += `<tr><td title="${escapeHtml(rowComp.name)} - Features:\n${escapeHtml(subTitle)}"><strong>📦 ${escapeHtml(rowComp.name)}</strong></td>`;
            
            comps.forEach((colComp, j) => {
                if (i === j) {
                    html += '<td class="diagonal" title="Self Interaction Blocked"></td>';
                } else {
                    const key = rowComp.id + '-' + colComp.id;
                    const cellData = structureData.matrix[key] || { p: false, e: false, i: false, m: false };
                    
                    html += `
                    <td>
                        <div class="peim-cell-container">
                            <div class="peim-row">
                                <button class="peim-btn ${cellData.p ? 'active' : ''}" data-type="P" onclick="toggleComponentPeim('${rowComp.id}', '${colComp.id}', 'P')" title="Physical Exchange">P</button>
                                <button class="peim-btn ${cellData.e ? 'active' : ''}" data-type="E" onclick="toggleComponentPeim('${rowComp.id}', '${colComp.id}', 'E')" title="Energy Exchange">E</button>
                            </div>
                            <div class="peim-row">
                                <button class="peim-btn ${cellData.i ? 'active' : ''}" data-type="I" onclick="toggleComponentPeim('${rowComp.id}', '${colComp.id}', 'I')" title="Information Exchange">I</button>
                                <button class="peim-btn ${cellData.m ? 'active' : ''}" data-type="M" onclick="toggleComponentPeim('${rowComp.id}', '${colComp.id}', 'M')" title="Material Exchange">M</button>
                            </div>
                        </div>
                    </td>
                    `;
                }
            });
            
            html += '</tr>';
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    }

    // --- Exploded View & Reference Diagram JS logic ---
    function processImageFile(fileOrBlob, callback) {
        if (fileOrBlob.type === 'image/jpeg' || fileOrBlob.type === 'image/png' || fileOrBlob.type === 'image/gif' || fileOrBlob.type === 'image/webp') {
            let reader = new FileReader();
            reader.onload = function(event) { callback(event.target.result); };
            reader.readAsDataURL(fileOrBlob);
            return;
        }

        let reader = new FileReader();
        reader.onload = function(event) { 
            let img = new Image();
            img.onload = function() {
                let canvas = document.createElement('canvas');
                canvas.width = img.width; canvas.height = img.height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                callback(canvas.toDataURL('image/png')); 
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileOrBlob);
    }

    function handleStep2ImageUpload(e) {
        let file = e.target.files[0]; 
        if(!file) return; 
        processImageFile(file, (dataUrl) => { 
            if (!structureData.explodedView) {
                structureData.explodedView = { dataUrl: "", caption: "" };
            }
            structureData.explodedView.dataUrl = dataUrl;
            renderStep2Image();
            document.getElementById('step2ImageInput').value = ''; 
        });
    }

    function removeStep2Image() {
        if (!confirm("Are you sure you want to delete this reference diagram?")) return;
        delete structureData.explodedView;
        renderStep2Image();
    }

    function saveStep2ImageCaption() {
        const textarea = document.getElementById('step2ImageCaption');
        if (textarea && structureData.explodedView) {
            structureData.explodedView.caption = textarea.value;
        }
    }

    function openImageInNewTab(dataUrl) {
        const w = window.open();
        w.document.write(`<img src="${dataUrl}" style="max-width:100%; max-height:100%;">`);
    }

    function renderStep2Image() {
        const container = document.getElementById('step2ImageContainer');
        if (!container) return;

        if (!structureData.explodedView || !structureData.explodedView.dataUrl) {
            container.innerHTML = `
            <div class="paste-zone" id="step2PasteZone" tabindex="0" onclick="document.getElementById('step2ImageInput').click()" style="padding: 30px; text-align: center; border: 2px dashed var(--border); border-radius: 8px; cursor: pointer; background: var(--highlight-bg); transition: border-color 0.2s;">
                <div style="font-size: 28px; margin-bottom: 12px;">🖼️</div>
                <div style="font-weight: 600; color: var(--text-heading); font-size: 14px; margin-bottom: 6px;">Click here to upload an image</div>
                <div style="color: var(--text-muted); font-size: 12px;">Or select this box and press <strong>Ctrl+V</strong> to paste from clipboard</div>
            </div>
            <input type="file" id="step2ImageInput" accept="image/*" style="display:none" onchange="handleStep2ImageUpload(event)">
            `;
            
            // Add focus outline and paste handler for keyboard focus
            const zone = document.getElementById('step2PasteZone');
            if (zone) {
                zone.addEventListener('focus', () => zone.style.borderColor = 'var(--primary)');
                zone.addEventListener('blur', () => zone.style.borderColor = 'var(--border)');
            }
        } else {
            container.innerHTML = `
            <div class="img-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 15px; background: var(--highlight-bg); max-width: 650px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="position: relative; overflow: hidden; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); display: flex; justify-content: center; align-items: center; max-height: 400px; margin-bottom: 12px;">
                    <div style="position: absolute; top: 8px; right: 8px; z-index: 10; display: flex; gap: 8px;">
                        <button onclick="openImageInNewTab(structureData.explodedView.dataUrl)" class="btn-outline" style="padding: 4px 8px; font-size: 11px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 4px; width: auto;" title="Open in New Tab">↗ Open</button>
                        <button onclick="removeStep2Image()" class="btn-danger" style="padding: 4px 8px; font-size: 11px; width: auto;" title="Remove Image">✕ Delete</button>
                    </div>
                    <img src="${structureData.explodedView.dataUrl}" style="max-width: 100%; max-height: 380px; object-fit: contain;">
                </div>
                <div>
                    <textarea id="step2ImageCaption" placeholder="Add an image description or caption (e.g. Exploded system view showing assembly interfaces)..." style="width: 100%; resize: vertical; padding: 10px; font-size: 13px; font-family: inherit; border: 1px solid var(--border); border-radius: 6px; background: var(--card-bg); color: var(--text-main); min-height: 60px;" oninput="saveStep2ImageCaption()">${escapeHtml(structureData.explodedView.caption || '')}</textarea>
                </div>
            </div>
            `;
        }
    }

    // Global Paste Listener for Step 2 Exploded View
    document.addEventListener("paste", function(e) {
        const tab2 = document.getElementById('tab2');
        if (tab2 && tab2.classList.contains('active')) {
            let items = e.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    let blob = items[i].getAsFile(); 
                    processImageFile(blob, (dataUrl) => { 
                        if (!structureData.explodedView) {
                            structureData.explodedView = { dataUrl: "", caption: "" };
                        }
                        structureData.explodedView.dataUrl = dataUrl;
                        renderStep2Image();
                    });
                    e.preventDefault();
                    break;
                }
            }
        }
    });


    // Helper to escape HTML characters
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // Restore user settings
    window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('dfmea-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            document.getElementById('themeBtn').innerText = '🌙 Dark Mode';
        }
        const savedWidth = localStorage.getItem('dfmea-width');
        if (savedWidth === 'expanded') {
            document.querySelector('.container').classList.add('expanded');
            document.getElementById('widthBtn').innerText = '⬌ Standard Width';
        }
        
        // Initial Step 2 render
        renderStructureTree();
        renderComponentInteractions();
        renderStep2Image();
    });