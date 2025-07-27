/**
 * RaisingBerries - Simple Assignment Management
 * Handles assignment display, completion tracking, and progress updates
 */

class AssignmentManager {
    constructor() {
        this.currentStudent = null;
    }

    /**
     * Initialize assignment management
     */
    init() {
        console.log('📝 Assignment Manager ready');
        this.setupEventListeners();
        return true;
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Listen for assignment checkbox clicks
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('assignment-checkbox')) {
                this.handleToggle(event);
            }
        });

        console.log('📝 Assignment event listeners ready');
    }

    /**
     * Load and display assignments for student
     */
    loadAssignments(studentId) {
        this.currentStudent = studentId;
        const dm = window.DataManager;
        const student = dm ? dm.getStudent(studentId) : null;
        
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return;
        }

        // Load based on student type
        if (studentId === 'child1') {
            this.loadSubjectTiles(student);
        } else {
            this.loadAssignmentList(studentId, student);
        }

        this.updateProgress(studentId);
        console.log(`📚 Loaded assignments for ${student.name}`);
    }

    /**
     * Load subject tiles (for Elijah)
     */
    loadSubjectTiles(student) {
        const container = document.getElementById('subjects-grid-child1');
        if (!container) return;

        const subjects = student.subjects || [];
        container.innerHTML = '';

        subjects.forEach(subject => {
            const assignments = this.getSubjectAssignments(student, subject.name);
            const completed = assignments.filter(a => a.completed).length;
            const total = assignments.length;
            const percentage = total > 0 ? (completed / total) * 100 : 0;

            const tile = document.createElement('div');
            tile.className = 'subject-tile';
            tile.style.borderColor = subject.color;
            tile.onclick = () => this.showSubjectDetails(subject.name, assignments);

            tile.innerHTML = `
                <div class="subject-icon">${subject.icon}</div>
                <div class="subject-name">${subject.name}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%; background: ${subject.color}"></div>
                </div>
                <span class="progress-text">${completed}/${total} complete</span>
                ${this.getUpcomingPreview(assignments)}
            `;

            container.appendChild(tile);
        });
    }

    /**
     * Get upcoming assignment preview
     */
    getUpcomingPreview(assignments) {
        const upcoming = assignments
            .filter(a => !a.completed)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 2);

        if (upcoming.length === 0) {
            return '<div style="margin-top: 10px; font-size: 0.9em; color: #00b894;">All caught up! 🎉</div>';
        }

        const items = upcoming.map(assignment => {
            const dueDate = new Date(assignment.dueDate);
            const today = new Date();
            const isOverdue = dueDate < today && !assignment.completed;
            const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            
            let dateText;
            if (daysDiff === 0) dateText = 'Today';
            else if (daysDiff === 1) dateText = 'Tomorrow';
            else if (daysDiff < 0) dateText = 'Overdue';
            else dateText = `${daysDiff} days`;

            return `
                <div style="font-size: 0.8em; color: ${isOverdue ? '#e17055' : '#666'}; margin-top: 5px;">
                    • ${assignment.title.substring(0, 20)}... (${dateText})
                </div>
            `;
        }).join('');

        return `<div style="margin-top: 8px;">${items}</div>`;
    }

    /**
     * Load assignment list (for Kai & Noelani)
     */
    loadAssignmentList(studentId, student) {
        const studentNumber = studentId.slice(-1);
        const container = document.getElementById(`assignments${studentNumber}`);
        if (!container) return;

        const assignments = student.assignments || [];
        const activeAssignments = assignments.filter(a => !a.completed).slice(0, 8);

        if (activeAssignments.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 30px; color: #666;">
                    <div style="font-size: 2em; margin-bottom: 10px;">📝</div>
                    <div>No pending assignments</div>
                    <div style="font-size: 0.9em; margin-top: 5px;">All caught up or no assignments added yet!</div>
                </div>
            `;
            return;
        }

        container.innerHTML = '';

        activeAssignments.forEach(assignment => {
            const element = this.createAssignmentElement(assignment, studentId);
            container.appendChild(element);
        });
    }

    /**
     * Create assignment element
     */
    createAssignmentElement(assignment, studentId) {
        const dueDate = new Date(assignment.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today && !assignment.completed;
        const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        let dateText;
        if (daysDiff === 0) dateText = 'Due Today';
        else if (daysDiff === 1) dateText = 'Due Tomorrow';
        else if (daysDiff < 0) dateText = 'Overdue';
        else dateText = `Due in ${daysDiff} days`;

        const element = document.createElement('div');
        element.className = 'assignment-item';
        element.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            border-left: 4px solid ${isOverdue ? '#e17055' : '#667eea'};
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.2s ease;
        `;

        element.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <div class="assignment-title" style="font-weight: 600; color: #333; margin-bottom: 5px;">
                        ${assignment.title}
                    </div>
                    <div class="assignment-subject" style="font-size: 0.9em; color: #666; margin-bottom: 5px;">
                        ${this.getSubjectIcon(assignment.subject)} ${assignment.subject}
                    </div>
                    <div style="font-size: 0.85em; color: ${isOverdue ? '#e17055' : '#666'};">
                        ${dateText}
                    </div>
                    ${assignment.link ? `
                        <a href="${assignment.link}" target="_blank" 
                           style="display: inline-block; margin-top: 8px; color: #667eea; text-decoration: none; font-size: 0.85em;">
                            🔗 Open Assignment
                        </a>
                    ` : ''}
                </div>
                <button class="assignment-checkbox btn btn-sm ${assignment.completed ? 'btn-success' : 'btn-secondary'}" 
                        data-assignment-id="${assignment.id}" 
                        data-student-id="${studentId}"
                        style="min-width: 60px;">
                    ${assignment.completed ? '✅' : '⭕'}
                </button>
            </div>
        `;

        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-2px)';
            element.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });

        return element;
    }

    /**
     * Get subject icon
     */
    getSubjectIcon(subject) {
        const icons = {
            'Bible': '📖',
            'Bible Studies': '✝️',
            'Earth Science': '🌍',
            'Science': '🔬',
            'History & Geography': '🏛️',
            'History': '🏛️',
            'Social Studies': '🌍',
            'English': '📝',
            'English Language Arts': '📖',
            'Algebra': '🔢',
            'Mathematics': '📐',
            'PE': '🏃‍♂️',
            'Academic & Career Success': '🎯'
        };
        return icons[subject] || '📚';
    }

    /**
     * Handle assignment toggle
     */
    handleToggle(event) {
        event.stopPropagation();
        
        const button = event.target;
        const assignmentId = parseInt(button.getAttribute('data-assignment-id'));
        const studentId = button.getAttribute('data-student-id');

        if (!assignmentId || !studentId) return;

        const dm = window.DataManager;
        if (!dm) return;

        const completed = dm.toggleAssignment(studentId, assignmentId);
        
        // Update button
        button.textContent = completed ? '✅' : '⭕';
        button.className = `assignment-checkbox btn btn-sm ${completed ? 'btn-success' : 'btn-secondary'}`;
        
        // Update progress
        this.updateProgress(studentId);
        this.updateSubjectProgress(studentId);

        // Show notification
        if (completed) {
            const student = dm.getStudent(studentId);
            const assignment = student.assignments.find(a => a.id === assignmentId);
            this.showCelebration(student.name, assignment.title);
        }

        console.log(`📝 Assignment ${completed ? 'completed' : 'uncompleted'} for ${studentId}`);
    }

    /**
     * Show subject details
     */
    showSubjectDetails(subjectName, assignments) {
        const pending = assignments.filter(a => !a.completed);
        const completed = assignments.filter(a => a.completed);
        
        let message = `📚 ${subjectName}\n\n`;
        message += `✅ Completed: ${completed.length}\n`;
        message += `⏳ Pending: ${pending.length}\n\n`;
        
        if (pending.length > 0) {
            message += 'Upcoming assignments:\n';
            pending.slice(0, 3).forEach(assignment => {
                const date = new Date(assignment.dueDate).toLocaleDateString();
                message += `• ${assignment.title} (${date})\n`;
            });
        } else {
            message += 'All assignments completed! 🎉';
        }
        
        alert(message);
    }

    /**
     * Get assignments for a subject
     */
    getSubjectAssignments(student, subjectName) {
        if (!student.assignments) return [];
        return student.assignments.filter(assignment => assignment.subject === subjectName);
    }

    /**
     * Update progress bars
     */
    updateProgress(studentId) {
        const dm = window.DataManager;
        const student = dm ? dm.getStudent(studentId) : null;
        if (!student || !student.assignments) return;

        const completed = student.assignments.filter(a => a.completed).length;
        const total = student.assignments.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;

        // Update main progress bar
        const studentNumber = studentId.slice(-1);
        const progressBar = document.getElementById(`progress${studentNumber}`);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }

        console.log(`📊 Progress updated for ${student.name}: ${completed}/${total} (${Math.round(percentage)}%)`);
    }

    /**
     * Update subject progress (for Elijah's tiles)
     */
    updateSubjectProgress(studentId) {
        if (studentId !== 'child1') return;

        const dm = window.DataManager;
        const student = dm ? dm.getStudent(studentId) : null;
        if (!student) return;

        const subjects = student.subjects || [];
        
        subjects.forEach(subject => {
            const assignments = this.getSubjectAssignments(student, subject.name);
            const completed = assignments.filter(a => a.completed).length;
            const total = assignments.length;
            const percentage = total > 0 ? (completed / total) * 100 : 0;

            // Find and update the subject tile
            const tiles = document.querySelectorAll('.subject-tile');
            tiles.forEach(tile => {
                const nameElement = tile.querySelector('.subject-name');
                if (nameElement && nameElement.textContent === subject.name) {
                    const progressBar = tile.querySelector('.progress-fill');
                    const progressText = tile.querySelector('.progress-text');
                    
                    if (progressBar) {
                        progressBar.style.width = `${percentage}%`;
                    }
                    if (progressText) {
                        progressText.textContent = `${completed}/${total} complete`;
                    }
                }
            });
        });
    }

    /**
     * Show completion celebration
     */
    showCelebration(studentName, assignmentTitle) {
        // Create celebration toast
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00b894, #00a085);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        toast.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 5px;">🎉 Great job, ${studentName}!</div>
            <div style="font-size: 0.9em; opacity: 0.9;">"${assignmentTitle}" completed!</div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    /**
     * Add assignment (for future use)
     */
    addAssignment(studentId, assignment) {
        const dm = window.DataManager;
        if (!dm) return false;

        return dm.addAssignment(studentId, assignment);
    }

    /**
     * Get student stats
     */
    getStats(studentId) {
        const dm = window.DataManager;
        const student = dm ? dm.getStudent(studentId) : null;
        if (!student || !student.assignments) {
            return { completed: 0, total: 0, percentage: 0 };
        }

        const completed = student.assignments.filter(a => a.completed).length;
        const total = student.assignments.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { completed, total, percentage };
    }
}

// Create and export global instance
window.AssignmentManager = new AssignmentManager();
console.log('📝 Simple Assignment Manager loaded');