/**
 * RaisingBerries - Simple Application Logic
 * Clean, functional dashboard for homeschool management
 * File: js/app.js
 */

class RaisingBerriesApp {
    constructor() {
        this.currentStudent = 'child1';
        this.loadedModules = new Set();
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('🍓 Initializing RaisingBerries Dashboard...');
        
        try {
            // Wait for DataManager
            await this.waitForDataManager();
            
            // Initialize modules
            this.initializeModules();
            
            // Set up UI
            this.setupUI();
            
            // Start auto-save
            this.setupAutoSave();
            
            console.log('✅ RaisingBerries Dashboard ready!');
            
        } catch (error) {
            console.error('❌ Error initializing dashboard:', error);
            this.showError('Error loading dashboard. Please refresh the page.');
        }
    }

    /**
     * Wait for DataManager to be ready
     */
    async waitForDataManager() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const checkReady = () => {
                attempts++;
                
                if (window.DataManager && window.DataManager.isReady && window.DataManager.isReady()) {
                    console.log('✅ DataManager ready');
                    resolve();
                    return;
                }
                
                if (attempts >= maxAttempts) {
                    console.warn('⚠️ DataManager timeout, proceeding anyway');
                    resolve();
                    return;
                }
                
                setTimeout(checkReady, 100);
            };
            
            checkReady();
        });
    }

    /**
     * Get DataManager safely
     */
    getDataManager() {
        return window.DataManager;
    }

    /**
     * Initialize modules
     */
    initializeModules() {
        // Check for available modules and initialize them
        const modules = [
            { name: 'FlashcardSystem', global: 'FlashcardSystem' },
            { name: 'NotesSystem', global: 'NotesSystem' }, 
            { name: 'WeeklyPlanner', global: 'WeeklyPlanner' },
            { name: 'AssignmentManager', global: 'AssignmentManager' }
        ];

        modules.forEach(module => {
            try {
                if (window[module.global]) {
                    if (typeof window[module.global].init === 'function') {
                        window[module.global].init();
                    }
                    this.loadedModules.add(module.name);
                    console.log(`✅ ${module.name} loaded`);
                } else {
                    console.log(`ℹ️ ${module.name} not available`);
                }
            } catch (error) {
                console.warn(`⚠️ ${module.name} failed to load:`, error);
            }
        });
        
        console.log(`📦 ${this.loadedModules.size} modules loaded: ${Array.from(this.loadedModules).join(', ')}`);
    }

    /**
     * Set up the UI
     */
    setupUI() {
        try {
            // Update dates
            this.updateDates();
            
            // Load verse of the week
            this.loadVerseOfTheWeek();
            
            // Load initial student dashboard
            setTimeout(() => {
                this.showStudent('child1');
                this.updateDates();
            }, 100);
            
            // Set up event listeners
            this.setupEventListeners();
            
            console.log('🎨 UI setup complete');
        } catch (error) {
            console.error('Error setting up UI:', error);
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Close modals when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('active');
            }
        });

        // Save data before page unload
        window.addEventListener('beforeunload', () => {
            const dm = this.getDataManager();
            if (dm && dm.saveData) {
                dm.saveData();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            // Ctrl+S to save
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                const dm = this.getDataManager();
                if (dm && dm.saveData) {
                    dm.saveData();
                    this.showNotification('Data saved!', 'success');
                }
            }
            
            // Escape to close modals
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });

        console.log('🎧 Event listeners ready');
    }

    /**
     * Update date displays
     */
    updateDates() {
        const today = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Update all date elements
        document.querySelectorAll('#date1, #date2, #date3, .date-display span').forEach(element => {
            if (element) {
                element.textContent = today;
            }
        });
        
        console.log('📅 Dates updated:', today);
    }

    /**
     * Load verse of the week
     */
    loadVerseOfTheWeek() {
        const verseSection = document.getElementById('verse-section');
        if (!verseSection) return;

        const dm = this.getDataManager();
        const currentVerse = dm ? dm.getCurrentVerse() : {
            reference: '2 Timothy 1:7',
            text: 'For God has not given us a spirit of timidity, but of power and love and discipline.',
            reflection: 'You have all the power you need, but you have to act like it by believing the word of God and going forward in faith to do His will by His power, not your own.'
        };
        
        verseSection.innerHTML = `
            <div class="verse-content">
                <p class="verse-text">"${currentVerse.text}"</p>
                <span class="verse-reference">- ${currentVerse.reference}</span>
                <div class="verse-reflection">
                    <p>${currentVerse.reflection}</p>
                </div>
            </div>
        `;
    }

    /**
     * Show student dashboard
     */
    showStudent(studentId) {
        try {
            console.log(`🔄 Switching to student: ${studentId}`);
            
            // Hide all pages
            document.querySelectorAll('.student-page').forEach(page => {
                page.classList.remove('active');
            });

            // Hide all nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Show selected page
            const selectedPage = document.getElementById(studentId);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }
            
            // Activate correct tab
            document.querySelectorAll('.nav-tab').forEach(tab => {
                const tabText = tab.textContent.toLowerCase();
                const studentName = this.getStudentName(studentId).toLowerCase();
                
                if (tabText.includes(studentName) ||
                    (studentId === 'analytics' && tabText.includes('analytics')) ||
                    (studentId === 'admin' && tabText.includes('admin'))) {
                    tab.classList.add('active');
                }
            });

            this.currentStudent = studentId;
            
            // Load content
            switch(studentId) {
                case 'admin':
                    this.loadAdminPanel();
                    break;
                default:
                    this.loadStudentDashboard(studentId);
            }

            // Update dates
            setTimeout(() => this.updateDates(), 100);

        } catch (error) {
            console.error('Error switching students:', error);
            this.showNotification('Error switching students', 'error');
        }
    }

    /**
     * Get student name from ID
     */
    getStudentName(studentId) {
        const names = {
            'child1': 'Elijah',
            'child2': 'Kai', 
            'child3': 'Noelani'
        };
        return names[studentId] || 'Student';
    }

    /**
     * Load student dashboard
     */
    loadStudentDashboard(studentId) {
        const page = document.getElementById(studentId);
        if (!page) return;

        const dm = this.getDataManager();
        const student = dm ? dm.getStudent(studentId) : null;
        
        if (!student) {
            page.innerHTML = `
                <div class="student-header">
                    <h2>${this.getStudentName(studentId)}'s Learning Space</h2>
                    <p>Loading...</p>
                </div>
            `;
            return;
        }

        // Generate subject tiles dashboard for ALL students
        page.innerHTML = this.generateSubjectTilesDashboard(student, studentId);
        console.log(`✅ Loaded dashboard for ${student.name}`);
    }

    /**
     * Generate subject tiles dashboard for any student
     */
    generateSubjectTilesDashboard(student, studentId) {
        const subjects = student.subjects || [];
        const studentNumber = studentId.slice(-1);
        
        // Calculate progress for each subject
        const subjectTiles = subjects.map(subject => {
            // Count assignments for this subject
            const subjectAssignments = student.assignments.filter(a => a.subject === subject.name);
            const completedAssignments = subjectAssignments.filter(a => a.completed);
            const progressPercent = subjectAssignments.length > 0 
                ? Math.round((completedAssignments.length / subjectAssignments.length) * 100) 
                : 0;

            // Count upcoming assignments (assignments due in the next 7 days)
            const today = new Date();
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const upcomingAssignments = subjectAssignments.filter(a => {
                const dueDate = new Date(a.dueDate);
                return dueDate >= today && dueDate <= weekFromNow && !a.completed;
            });
            
            return `
                <div class="subject-tile" style="border-color: ${subject.color};" onclick="app.openSubjectModal('${studentId}', '${subject.name}')">
                    <div class="subject-icon">${subject.icon}</div>
                    <div class="subject-name">${subject.name}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%; background: ${subject.color};"></div>
                    </div>
                    <span class="progress-text">${completedAssignments.length}/${subjectAssignments.length} complete</span>
                    ${upcomingAssignments.length > 0 ? `<div class="today-assignments">📋 ${upcomingAssignments.length} due this week</div>` : ''}
                </div>
            `;
        }).join('');

        return `
            <div class="student-header">
                <h2 class="student-name">${student.name}'s Learning Space</h2>
                <p class="date-display">Today: <span id="date${studentNumber}"></span></p>
            </div>

            <div class="subjects-grid">
                ${subjectTiles}
            </div>

            <div class="tools-panel">
                <div class="tool-card" onclick="app.openFlashcards('${studentId}')">
                    <div class="tool-icon">🎴</div>
                    <div class="tool-title">Flashcards</div>
                </div>
                <div class="tool-card" onclick="app.openNotes('${studentId}')">
                    <div class="tool-icon">📝</div>
                    <div class="tool-title">My Notes</div>
                </div>
                <div class="tool-card" onclick="app.openCurriculum('${studentId}')">
                    <div class="tool-icon">📚</div>
                    <div class="tool-title">Curriculum</div>
                </div>
            </div>
        `;
    }

    /**
     * Load admin panel
     */
    loadAdminPanel() {
        const page = document.getElementById('admin');
        if (!page) return;

        // Use WeeklyPlanner if available
        if (window.WeeklyPlanner && window.WeeklyPlanner.loadAdminInterface) {
            window.WeeklyPlanner.loadAdminInterface();
            console.log('✅ Loaded WeeklyPlanner admin interface');
            return;
        }

        // Fallback admin panel
        page.innerHTML = `
            <div class="student-header">
                <h2>👩‍💼 Parent Dashboard</h2>
                <p>Manage assignments and track progress</p>
            </div>
            
            <div class="admin-controls" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
                <button class="btn btn-primary" onclick="app.exportData()">💾 Export Data</button>
                <button class="btn btn-secondary" onclick="app.showAddAssignmentForm()">➕ Add Assignment</button>
                <button class="btn btn-secondary" onclick="app.viewAllAssignments()">📋 View All</button>
            </div>

            <div id="admin-content">
                <div class="card" style="padding: 20px;">
                    <h3>System Status</h3>
                    <p>✅ DataManager: ${window.DataManager ? 'Ready' : 'Not Ready'}</p>
                    <p>✅ Modules: ${this.loadedModules.size} loaded (${Array.from(this.loadedModules).join(', ')})</p>
                    <p>✅ Auto-save: Active</p>
                </div>
            </div>
        `;
    }

    /**
     * Open subject modal with assignments
     */
    openSubjectModal(studentId, subjectName) {
        const dm = this.getDataManager();
        const student = dm ? dm.getStudent(studentId) : null;
        
        if (!student) {
            this.showNotification('Student data not found', 'error');
            return;
        }

        // Get subject info
        const subject = student.subjects.find(s => s.name === subjectName);
        if (!subject) {
            this.showNotification('Subject not found', 'error');
            return;
        }

        // Get assignments for this subject
        const subjectAssignments = student.assignments.filter(a => a.subject === subjectName);
        const completedCount = subjectAssignments.filter(a => a.completed).length;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };

        const assignmentsList = subjectAssignments.length > 0 
            ? subjectAssignments.map(assignment => `
                <div class="assignment-item" style="border-left-color: ${subject.color};">
                    <div class="assignment-header">
                        <div class="assignment-content">
                            <div class="assignment-title">${assignment.title}</div>
                            <div class="assignment-meta">
                                <span class="assignment-due">Due: ${new Date(assignment.dueDate).toLocaleDateString()}</span>
                                ${assignment.link ? `<a href="${assignment.link}" target="_blank" class="assignment-link">📖 View Assignment</a>` : ''}
                            </div>
                        </div>
                        <button class="assignment-toggle ${assignment.completed ? 'completed' : ''}" 
                                onclick="app.toggleAssignmentInModal('${studentId}', ${assignment.id}, this)">
                            ${assignment.completed ? '✅' : '⭕'}
                        </button>
                    </div>
                </div>
            `).join('')
            : '<div class="no-assignments">📚 No assignments yet for this subject.<br><small>Use the Admin panel to add assignments.</small></div>';

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px; max-height: 85vh; overflow: visible;">
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                
                <div class="subject-modal-header" style="background: linear-gradient(135deg, ${subject.color}, ${subject.color}dd); color: white; padding: 25px; border-radius: 15px; margin-bottom: 20px;">
                    <div class="subject-modal-icon" style="font-size: 2.5em; text-align: center; margin-bottom: 8px;">${subject.icon}</div>
                    <h2 style="text-align: center; margin-bottom: 8px; font-size: 1.6em;">${student.name}'s ${subjectName}</h2>
                    <div style="text-align: center; font-size: 1em;">
                        ${completedCount}/${subjectAssignments.length} assignments completed
                        ${subjectAssignments.length > 0 ? `(${Math.round((completedCount / subjectAssignments.length) * 100)}%)` : ''}
                    </div>
                </div>

                <div class="assignments-section">
                    <h3 style="color: #2d3436; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-size: 1.2em;">
                        📋 Assignments
                        ${subjectAssignments.filter(a => !a.completed && a.dueDate <= new Date().toISOString().split('T')[0]).length > 0 
                            ? `<span class="due-today-badge">${subjectAssignments.filter(a => !a.completed && a.dueDate <= new Date().toISOString().split('T')[0]).length} due today</span>` 
                            : ''}
                    </h3>
                    <div class="assignments-list" style="max-height: 300px; overflow-y: auto; padding-right: 5px;">
                        ${assignmentsList}
                    </div>
                </div>

                <div class="subject-actions" style="margin-top: 20px; text-align: center; padding-top: 15px; border-top: 1px solid #e1e5e9;">
                    <button class="btn btn-primary" onclick="app.addQuickAssignment('${studentId}', '${subjectName}')" style="margin: 5px;">
                        ➕ Add Assignment
                    </button>
                    <button class="btn btn-secondary" onclick="app.openFlashcardsForSubject('${studentId}', '${subjectName}')" style="margin: 5px;">
                        🎴 Subject Flashcards
                    </button>
                    <button class="btn btn-info" onclick="app.openNotesForSubject('${studentId}', '${subjectName}')" style="margin: 5px;">
                        📝 Subject Notes
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');
        
        console.log(`📚 Opened ${subjectName} modal for ${student.name}`);
    }

    /**
     * Toggle assignment in modal
     */
    toggleAssignmentInModal(studentId, assignmentId, buttonElement) {
        const dm = this.getDataManager();
        if (dm && dm.toggleAssignment) {
            const completed = dm.toggleAssignment(studentId, assignmentId);
            
            // Update button
            buttonElement.textContent = completed ? '✅' : '⭕';
            buttonElement.className = `assignment-toggle ${completed ? 'completed' : ''}`;
            
            // Show notification
            this.showNotification(completed ? 'Assignment completed! 🎉' : 'Assignment unmarked', 'success');
            
            // Refresh the main dashboard
            setTimeout(() => {
                this.loadStudentDashboard(studentId);
            }, 500);
        }
    }

    /**
     * Add quick assignment to subject
     */
    addQuickAssignment(studentId, subjectName) {
        const title = prompt(`Add assignment for ${subjectName}:`);
        if (!title) return;

        const dm = this.getDataManager();
        if (dm && dm.addAssignment) {
            const assignment = {
                subject: subjectName,
                title: title.trim(),
                link: 'https://www.liberty.edu/online-academy/current-students/',
                dueDate: new Date().toISOString().split('T')[0],
                completed: false,
                priority: 'medium'
            };

            if (dm.addAssignment(studentId, assignment)) {
                this.showNotification('Assignment added!', 'success');
                
                // Close modal and refresh
                document.querySelector('.modal.active')?.remove();
                setTimeout(() => {
                    this.loadStudentDashboard(studentId);
                }, 100);
            } else {
                this.showNotification('Failed to add assignment', 'error');
            }
        }
    }

    /**
     * Open flashcards filtered by subject
     */
    openFlashcardsForSubject(studentId, subjectName) {
        // Close current modal
        document.querySelector('.modal.active')?.remove();
        
        // Open flashcards (could be enhanced to filter by subject)
        setTimeout(() => {
            this.openFlashcards(studentId);
        }, 100);
    }

    /**
     * Open notes filtered by subject
     */
    openNotesForSubject(studentId, subjectName) {
        // Close current modal
        document.querySelector('.modal.active')?.remove();
        
        // Open notes (could be enhanced to filter by subject)
        setTimeout(() => {
            this.openNotes(studentId);
        }, 100);
    }

    /**
     * Tool methods - FIXED IMPLEMENTATIONS
     */
    openFlashcards(studentId) {
        console.log('🎴 Opening flashcards for', studentId);
        console.log('FlashcardSystem available:', !!window.FlashcardSystem);
        console.log('Loaded modules:', Array.from(this.loadedModules));
        
        // Try to open flashcards directly
        if (window.FlashcardSystem && window.FlashcardSystem.open) {
            try {
                window.FlashcardSystem.open(studentId);
                console.log('✅ Flashcards opened successfully');
            } catch (error) {
                console.error('Error opening flashcards:', error);
                this.showNotification('Error opening flashcards: ' + error.message, 'error');
            }
        } else {
            console.warn('FlashcardSystem not available');
            this.showNotification('Flashcard system not loaded yet. Please refresh the page.', 'warning');
        }
    }

    openNotes(studentId) {
        console.log('📝 Opening notes for', studentId);
        
        if (window.NotesSystem && window.NotesSystem.open) {
            try {
                window.NotesSystem.open(studentId);
                console.log('✅ Notes opened successfully');
            } catch (error) {
                console.error('Error opening notes:', error);
                this.showNotification('Error opening notes: ' + error.message, 'error');
            }
        } else {
            console.warn('NotesSystem not available');
            this.showNotification('Notes system not loaded yet. Please refresh the page.', 'warning');
        }
    }

    openCurriculum(studentId) {
        console.log('📚 Opening curriculum for', studentId);
        this.showNotification('Curriculum feature will be added in weekly planner', 'info');
    }

    /**
     * Assignment methods
     */
    toggleAssignment(studentId, assignmentId) {
        const dm = this.getDataManager();
        if (dm && dm.toggleAssignment) {
            const completed = dm.toggleAssignment(studentId, assignmentId);
            this.showNotification(completed ? 'Assignment completed! 🎉' : 'Assignment unmarked', 'success');
            this.loadStudentDashboard(studentId);
        }
    }

    showAddAssignmentForm() {
        this.showNotification('Use the Admin panel\'s weekly planner to add assignments', 'info');
    }

    viewAllAssignments() {
        this.showNotification('View all assignments feature coming soon!', 'info');
    }

    /**
     * Data methods
     */
    exportData() {
        const dm = this.getDataManager();
        if (dm && dm.exportAll) {
            dm.exportAll();
            this.showNotification('Data exported!', 'success');
        } else {
            this.showNotification('Export not available', 'warning');
        }
    }

    /**
     * Auto-save
     */
    setupAutoSave() {
        setInterval(() => {
            const dm = this.getDataManager();
            if (dm && dm.saveData) {
                dm.saveData();
            }
        }, 30000); // Every 30 seconds
        
        console.log('💾 Auto-save enabled');
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
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            background: ${colors[type]};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show
        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        
        // Hide and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Show error
     */
    showError(message) {
        this.showNotification(message, 'error');
        console.error('App Error:', message);
    }
}

// Global functions
window.showStudent = (studentId) => {
    if (window.app) {
        window.app.showStudent(studentId);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Starting RaisingBerries App');
    
    setTimeout(() => {
        try {
            window.app = new RaisingBerriesApp();
            console.log('✅ App ready!');
        } catch (error) {
            console.error('❌ App failed to start:', error);
        }
    }, 100);
});

console.log('📱 Simple RaisingBerries App loaded');