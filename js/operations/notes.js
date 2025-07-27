/**
 * RaisingBerries - Simple Notes System
 * Clean, functional note-taking for students
 */

class NotesSystem {
    constructor() {
        this.currentStudent = null;
        this.currentNoteId = null;
        this.isEditing = false;
        this.notes = [];
        this.filteredNotes = [];
        this.autoSaveTimeout = null;
    }

    /**
     * Initialize notes system
     */
    init() {
        console.log('📝 Notes System ready');
        return true;
    }

    /**
     * Open notes for student
     */
    open(studentId) {
        this.currentStudent = studentId;
        this.currentNoteId = null;
        this.isEditing = false;
        
        const modal = this.createNotesModal();
        document.body.appendChild(modal);
        modal.classList.add('active');
        
        this.loadStudentNotes();
        this.updateDisplay();
        this.setupKeyboardShortcuts();
    }

    /**
     * Create notes modal
     */
    createNotesModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
                this.removeKeyboardShortcuts();
            }
        };

        const dm = window.DataManager;
        const student = dm ? dm.getStudent(this.currentStudent) : null;
        const studentName = student ? student.name : 'Student';

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px; height: 85vh; display: flex; flex-direction: column; overflow: hidden;">
                <button class="close-btn" onclick="this.closest('.modal').remove(); window.NotesSystem.removeKeyboardShortcuts();">&times;</button>
                <h2>📝 ${studentName}'s Notes</h2>
                
                <!-- Toolbar -->
                <div style="display: flex; gap: 10px; margin-bottom: 20px; align-items: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="window.NotesSystem.createNewNote()">📝 New Note</button>
                    <input type="text" id="searchInput" placeholder="Search notes..." 
                           style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; width: 200px;"
                           oninput="window.NotesSystem.handleSearch(this.value)">
                    <select id="subjectFilter" style="padding: 8px; border: 2px solid #ddd; border-radius: 5px;"
                            onchange="window.NotesSystem.filterBySubject(this.value)">
                        <option value="all">All Subjects</option>
                        <option value="General">General</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Language Arts">Language Arts</option>
                        <option value="English">English</option>
                        <option value="Bible">Bible</option>
                        <option value="Earth Science">Earth Science</option>
                        <option value="Algebra">Algebra</option>
                    </select>
                </div>

                <!-- Main Content -->
                <div style="display: flex; gap: 20px; flex: 1; min-height: 0;">
                    <!-- Notes List -->
                    <div style="flex: 0 0 300px; background: #f8f9fa; border-radius: 10px; padding: 15px; overflow-y: auto;">
                        <div id="notesStats" style="background: white; padding: 10px; border-radius: 5px; margin-bottom: 15px; text-align: center;">
                            <strong><span id="notesCount">0</span> Notes</strong>
                        </div>
                        <div id="notesList">
                            <!-- Notes list will be populated here -->
                        </div>
                    </div>

                    <!-- Note Editor -->
                    <div style="flex: 1; display: flex; flex-direction: column; background: white; border-radius: 10px; overflow: hidden;">
                        <div id="noteEditor" style="height: 100%; display: flex; flex-direction: column;">
                            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; text-align: center;">
                                <div>
                                    <div style="font-size: 3em; margin-bottom: 10px;">📝</div>
                                    <div>Select a note to view or create a new one</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Keyboard Shortcuts -->
                <div style="margin-top: 15px; padding: 10px; background: #e3f2fd; border-radius: 5px; font-size: 0.9em;">
                    <strong>Shortcuts:</strong> Ctrl+N = New, Ctrl+S = Save, Ctrl+E = Edit, / = Search, Esc = Close
                </div>
            </div>
        `;

        return modal;
    }

    /**
     * Load notes for current student
     */
    loadStudentNotes() {
        const dm = window.DataManager;
        const student = dm ? dm.getStudent(this.currentStudent) : null;
        
        if (!student) {
            this.notes = [];
            this.filteredNotes = [];
            return;
        }

        // Ensure notes array exists
        if (!student.notes) {
            student.notes = [];
        }

        // Deep copy notes to avoid reference issues
        this.notes = student.notes.map(note => ({
            ...note,
            id: String(note.id) // Ensure ID is always a string
        }));
        this.filteredNotes = [...this.notes];
        
        console.log(`📚 Loaded ${this.notes.length} notes for ${student.name}`);
        console.log('Notes IDs:', this.notes.map(n => ({ id: n.id, title: n.title })));
    }

    /**
     * Update display
     */
    updateDisplay() {
        this.updateNotesList();
        this.updateStats();
        this.updateEditor();
    }

    /**
     * Update notes list
     */
    updateNotesList() {
        const notesList = document.getElementById('notesList');
        if (!notesList) return;

        if (this.filteredNotes.length === 0) {
            notesList.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #999;">
                    <div style="font-size: 2em; margin-bottom: 10px;">📝</div>
                    <div>No notes found</div>
                    <button class="btn btn-primary" onclick="window.NotesSystem.createNewNote()" style="margin-top: 10px; font-size: 0.9em;">
                        Create your first note
                    </button>
                </div>
            `;
            return;
        }

        const notesHtml = this.filteredNotes.map(note => {
            const noteId = String(note.id);
            const isSelected = String(this.currentNoteId) === noteId;
            const preview = this.getPreview(note.content);
            const date = this.formatDate(note.created);

            return `
                <div class="note-item" onclick="window.NotesSystem.selectNote('${noteId}')" 
                     style="
                        padding: 12px;
                        margin-bottom: 8px;
                        background: ${isSelected ? '#e3f2fd' : 'white'};
                        border-radius: 8px;
                        cursor: pointer;
                        border-left: 4px solid ${this.getSubjectColor(note.subject)};
                        transition: all 0.2s ease;
                        border: ${isSelected ? '2px solid #667eea' : '1px solid #eee'};
                     "
                     onmouseover="this.style.background='#f8f9fa'"
                     onmouseout="this.style.background='${isSelected ? '#e3f2fd' : 'white'}'">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                        <strong style="font-size: 0.95em; color: #333; flex: 1; padding-right: 10px;">${this.escapeHtml(note.title)}</strong>
                        <button onclick="event.stopPropagation(); window.NotesSystem.confirmDeleteNote('${noteId}')" 
                                style="background: none; border: none; color: #999; cursor: pointer; padding: 4px; font-size: 1.1em; border-radius: 3px; transition: all 0.2s ease;"
                                onmouseover="this.style.background='#ffebee'; this.style.color='#e74c3c';"
                                onmouseout="this.style.background='none'; this.style.color='#999';"
                                title="Delete note">🗑️</button>
                    </div>
                    <div style="font-size: 0.8em; color: #666; margin-bottom: 5px;">
                        <span style="background: ${this.getSubjectColor(note.subject)}; color: white; padding: 2px 6px; border-radius: 10px; margin-right: 8px; font-size: 0.75em;">
                            ${note.subject || 'General'}
                        </span>
                        ${date}
                    </div>
                    <div style="font-size: 0.85em; color: #666; line-height: 1.3;">
                        ${this.escapeHtml(preview)}
                    </div>
                </div>
            `;
        }).join('');

        notesList.innerHTML = notesHtml;
    }

    /**
     * Update stats
     */
    updateStats() {
        const notesCount = document.getElementById('notesCount');
        if (notesCount) {
            notesCount.textContent = this.filteredNotes.length;
        }
    }

    /**
     * Update editor
     */
    updateEditor() {
        const noteEditor = document.getElementById('noteEditor');
        if (!noteEditor) {
            console.error('Note editor element not found');
            return;
        }

        if (!this.currentNoteId) {
            noteEditor.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; text-align: center;">
                    <div>
                        <div style="font-size: 3em; margin-bottom: 10px;">📝</div>
                        <div style="margin-bottom: 15px;">Select a note to view or create a new one</div>
                        <button class="btn btn-primary" onclick="window.NotesSystem.createNewNote()">
                            📝 Create New Note
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        // Find note using string comparison
        const note = this.notes.find(n => String(n.id) === String(this.currentNoteId));
        if (!note) {
            console.error('Selected note not found:', this.currentNoteId);
            console.log('Available notes:', this.notes.map(n => ({ id: n.id, title: n.title })));
            
            // Reset selection and show empty state
            this.currentNoteId = null;
            this.updateEditor();
            return;
        }

        console.log('📝 Updating editor for note:', note.title);

        noteEditor.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <!-- Header -->
                <div style="padding: 15px; border-bottom: 1px solid #eee; background: #f8f9fa; flex-shrink: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
                        <div style="flex: 1;">
                            <input type="text" id="noteTitle" value="${this.escapeHtml(note.title)}" 
                                   placeholder="Note title..."
                                   style="width: 100%; padding: 8px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; font-weight: 600; margin-bottom: 10px;"
                                   onchange="window.NotesSystem.updateTitle(this.value)">
                            
                            <select id="noteSubject" style="padding: 6px; border: 2px solid #ddd; border-radius: 5px;"
                                    onchange="window.NotesSystem.updateSubject(this.value)">
                                <option value="General" ${note.subject === 'General' ? 'selected' : ''}>General</option>
                                <option value="Math" ${note.subject === 'Math' ? 'selected' : ''}>Math</option>
                                <option value="Science" ${note.subject === 'Science' ? 'selected' : ''}>Science</option>
                                <option value="History" ${note.subject === 'History' ? 'selected' : ''}>History</option>
                                <option value="Language Arts" ${note.subject === 'Language Arts' ? 'selected' : ''}>Language Arts</option>
                                <option value="English" ${note.subject === 'English' ? 'selected' : ''}>English</option>
                                <option value="Bible" ${note.subject === 'Bible' ? 'selected' : ''}>Bible</option>
                                <option value="Earth Science" ${note.subject === 'Earth Science' ? 'selected' : ''}>Earth Science</option>
                                <option value="Algebra" ${note.subject === 'Algebra' ? 'selected' : ''}>Algebra</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary" onclick="window.NotesSystem.toggleEdit()">
                                ${this.isEditing ? '👁️ View' : '✏️ Edit'}
                            </button>
                            <button class="btn btn-primary" onclick="window.NotesSystem.saveNote()">💾 Save</button>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div style="flex: 1; padding: 20px; overflow-y: auto; min-height: 0;">
                    ${this.isEditing ? `
                        <textarea id="noteContent" 
                                  style="width: 100%; height: 100%; min-height: 300px; border: 2px solid #ddd; border-radius: 5px; padding: 15px; font-family: 'Segoe UI', sans-serif; line-height: 1.6; resize: none; box-sizing: border-box;"
                                  placeholder="Start writing your note..."
                                  oninput="window.NotesSystem.handleContentChange()">${this.escapeHtml(note.content)}</textarea>
                    ` : `
                        <div onclick="window.NotesSystem.toggleEdit()" style="line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; cursor: pointer; min-height: 100px; padding: 15px; border: 2px dashed #ddd; border-radius: 5px; transition: all 0.2s ease;">
                            ${note.content ? this.escapeHtml(note.content).replace(/\n/g, '<br>') : '<em style="color: #999;">Click to start writing...</em>'}
                        </div>
                    `}
                </div>

                <!-- Footer -->
                <div style="padding: 10px 20px; border-top: 1px solid #eee; background: #f8f9fa; font-size: 0.9em; color: #666; display: flex; justify-content: space-between; flex-shrink: 0;">
                    <div>Created: ${this.formatDate(note.created)} • Words: ${this.getWordCount(note.content)}</div>
                    <div id="saveStatus"></div>
                </div>
            </div>
        `;

        console.log('✅ Editor updated successfully');
    }

    /**
     * Create new note
     */
    createNewNote() {
        console.log('📝 Creating new note...');
        
        const dm = window.DataManager;
        if (!dm) {
            console.error('DataManager not available');
            this.showNotification('Error: DataManager not available', 'error');
            return;
        }

        const newNote = {
            id: Date.now().toString(),
            title: 'New Note',
            content: '',
            subject: 'General',
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };

        console.log('Creating note:', newNote);

        if (dm.addNote(this.currentStudent, newNote)) {
            console.log('✅ Note created successfully');
            
            this.loadStudentNotes();
            this.currentNoteId = newNote.id;
            this.isEditing = true;
            this.updateDisplay();
            
            // Focus on title
            setTimeout(() => {
                const titleInput = document.getElementById('noteTitle');
                if (titleInput) {
                    titleInput.select();
                    titleInput.focus();
                }
            }, 200);

            this.showNotification('📝 New note created!', 'success');
        } else {
            console.error('Failed to create note');
            this.showNotification('Failed to create note', 'error');
        }
    }

    /**
     * Select note
     */
    selectNote(noteId) {
        // Ensure noteId is a string for comparison
        const idToFind = String(noteId);
        
        console.log('🔍 Selecting note:', idToFind);
        console.log('Available notes:', this.notes.map(n => ({ id: n.id, title: n.title, idType: typeof n.id })));
        
        // Find the note in our notes array
        const note = this.notes.find(n => String(n.id) === idToFind);
        if (!note) {
            console.error('Note not found:', idToFind);
            console.log('Available note IDs:', this.notes.map(n => n.id));
            this.showNotification('Note not found', 'error');
            return;
        }
        
        console.log('Found note:', note.title);
        
        this.currentNoteId = idToFind;
        this.isEditing = false;
        this.updateDisplay();
        
        console.log('✅ Note selected successfully');
    }

    /**
     * Confirm delete note with better UX
     */
    confirmDeleteNote(noteId) {
        console.log('🗑️ Confirming delete for note:', noteId);
        
        const note = this.notes.find(n => n.id === noteId);
        const noteTitle = note ? note.title : 'this note';
        
        if (!confirm(`Delete "${noteTitle}"?\n\nThis action cannot be undone.`)) {
            console.log('Delete cancelled by user');
            return;
        }

        this.deleteNote(noteId);
    }

    /**
     * Toggle edit mode
     */
    toggleEdit() {
        this.isEditing = !this.isEditing;
        this.updateEditor();
        
        if (this.isEditing) {
            setTimeout(() => {
                const contentTextarea = document.getElementById('noteContent');
                if (contentTextarea) {
                    contentTextarea.focus();
                    // Position cursor at end
                    contentTextarea.setSelectionRange(contentTextarea.value.length, contentTextarea.value.length);
                }
            }, 100);
        }
    }

    /**
     * Update title
     */
    updateTitle(newTitle) {
        if (!this.currentNoteId) return;
        
        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (note) {
            note.title = newTitle || 'Untitled Note';
            note.updated = new Date().toISOString();
            this.saveCurrentNote();
            this.updateNotesList(); // Refresh the list to show new title
        }
    }

    /**
     * Update subject
     */
    updateSubject(newSubject) {
        if (!this.currentNoteId) return;
        
        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (note) {
            note.subject = newSubject;
            note.updated = new Date().toISOString();
            this.saveCurrentNote();
            this.updateNotesList(); // Refresh the list to show new subject color
        }
    }

    /**
     * Handle content change
     */
    handleContentChange() {
        const contentTextarea = document.getElementById('noteContent');
        if (!contentTextarea || !this.currentNoteId) return;

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (note) {
            note.content = contentTextarea.value;
            note.updated = new Date().toISOString();
            
            // Auto-save after 2 seconds
            clearTimeout(this.autoSaveTimeout);
            this.autoSaveTimeout = setTimeout(() => {
                this.saveNote();
            }, 2000);

            // Show typing indicator
            const saveStatus = document.getElementById('saveStatus');
            if (saveStatus) {
                saveStatus.textContent = 'Typing...';
                saveStatus.style.color = '#fdcb6e';
            }
        }
    }

    /**
     * Save current note
     */
    saveCurrentNote() {
        if (!this.currentNoteId) return;
        
        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (note) {
            this.saveNoteToStudent(note);
        }
    }

    /**
     * Save note
     */
    saveNote() {
        if (!this.currentNoteId) return;

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (!note) return;

        // Update content if editing
        if (this.isEditing) {
            const contentTextarea = document.getElementById('noteContent');
            if (contentTextarea) {
                note.content = contentTextarea.value;
            }
        }

        note.updated = new Date().toISOString();

        if (this.saveNoteToStudent(note)) {
            const saveStatus = document.getElementById('saveStatus');
            if (saveStatus) {
                saveStatus.textContent = '✅ Saved';
                saveStatus.style.color = '#00b894';
                setTimeout(() => saveStatus.textContent = '', 2000);
            }
            
            this.showNotification('Note saved!', 'success');
            console.log('Note saved successfully');
        } else {
            this.showNotification('Failed to save note', 'error');
        }
    }

    /**
     * Save note to student data
     */
    saveNoteToStudent(note) {
        const dm = window.DataManager;
        if (!dm) return false;

        const student = dm.getStudent(this.currentStudent);
        if (!student) return false;

        // Find existing note or add new one
        const existingIndex = student.notes.findIndex(n => n.id === note.id);
        if (existingIndex >= 0) {
            student.notes[existingIndex] = { ...note };
        } else {
            student.notes.push({ ...note });
        }

        return dm.saveData();
    }

    /**
     * Delete note
     */
    deleteNote(noteId) {
        const idToDelete = String(noteId);
        console.log('🗑️ Deleting note:', idToDelete);

        const dm = window.DataManager;
        const student = dm ? dm.getStudent(this.currentStudent) : null;
        if (!student) {
            console.error('Student not found');
            this.showNotification('Error: Student not found', 'error');
            return;
        }

        console.log('Student notes before deletion:', student.notes.map(n => ({ id: n.id, title: n.title })));

        // Remove from student data
        const initialLength = student.notes.length;
        student.notes = student.notes.filter(n => String(n.id) !== idToDelete);
        
        console.log('Student notes after deletion:', student.notes.map(n => ({ id: n.id, title: n.title })));
        
        if (student.notes.length < initialLength) {
            // Save the data
            if (dm.saveData()) {
                console.log('✅ Note deleted from DataManager');
                
                // Clear selection if we deleted the current note
                if (String(this.currentNoteId) === idToDelete) {
                    this.currentNoteId = null;
                }

                // Reload and update display
                this.loadStudentNotes();
                this.updateDisplay();
                this.showNotification('🗑️ Note deleted successfully', 'success');
            } else {
                console.error('Failed to save after deleting note');
                this.showNotification('Failed to save changes', 'error');
            }
        } else {
            console.error('Note not found in student data');
            console.log('Looking for ID:', idToDelete);
            console.log('Available IDs:', student.notes.map(n => ({ id: n.id, type: typeof n.id })));
            this.showNotification('Note not found', 'error');
        }
    }

    /**
     * Handle search
     */
    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        this.filteredNotes = this.notes.filter(note => 
            note.title.toLowerCase().includes(term) ||
            note.content.toLowerCase().includes(term) ||
            (note.subject && note.subject.toLowerCase().includes(term))
        );
        
        this.updateDisplay();
        console.log(`Search for "${term}" found ${this.filteredNotes.length} notes`);
    }

    /**
     * Filter by subject
     */
    filterBySubject(subject) {
        if (subject === 'all') {
            this.filteredNotes = [...this.notes];
        } else {
            this.filteredNotes = this.notes.filter(note => note.subject === subject);
        }
        
        this.updateDisplay();
        console.log(`Filter by ${subject} found ${this.filteredNotes.length} notes`);
    }

    /**
     * Utility functions
     */
    getPreview(content) {
        if (!content) return 'No content';
        const stripped = content.replace(/\n+/g, ' ').trim();
        return stripped.length > 80 ? stripped.substring(0, 80) + '...' : stripped;
    }

    getWordCount(content) {
        if (!content) return 0;
        return content.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    getSubjectColor(subject) {
        const colors = {
            Math: '#ea580c',
            Science: '#059669',
            History: '#dc2626',
            'Language Arts': '#2563eb',
            English: '#2563eb',
            Bible: '#8b5cf6',
            'Earth Science': '#059669',
            Algebra: '#ea580c',
            General: '#667eea'
        };
        return colors[subject] || colors.General;
    }

    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        this.keyboardHandler = (e) => {
            // Only handle if notes modal is active
            const modal = document.querySelector('.modal.active');
            if (!modal || !modal.innerHTML.includes('Notes')) return;

            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'n':
                        e.preventDefault();
                        this.createNewNote();
                        break;
                    case 's':
                        e.preventDefault();
                        this.saveNote();
                        break;
                    case 'e':
                        e.preventDefault();
                        this.toggleEdit();
                        break;
                }
                return;
            }

            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key) {
                case '/':
                    e.preventDefault();
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) searchInput.focus();
                    break;
                case 'Escape':
                    e.preventDefault();
                    modal.remove();
                    this.removeKeyboardShortcuts();
                    break;
            }
        };

        document.addEventListener('keydown', this.keyboardHandler);
        console.log('Notes keyboard shortcuts enabled');
    }

    removeKeyboardShortcuts() {
        if (this.keyboardHandler) {
            document.removeEventListener('keydown', this.keyboardHandler);
            this.keyboardHandler = null;
            console.log('Notes keyboard shortcuts disabled');
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const colors = {
            success: '#00b894',
            error: '#e17055',
            warning: '#fdcb6e',
            info: '#74b9ff'
        };
        
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 18px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            background: ${colors[type]};
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Create global instance
window.NotesSystem = new NotesSystem();
console.log('📝 Simple Notes System loaded');