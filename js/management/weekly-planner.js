/**
 * RaisingBerries - Simplified Weekly Assignment Planner
 * Core functionality: Add assignments manually or upload weekly schedules
 */

class WeeklyPlanner {
    constructor() {
        this.currentStudent = 'child1';
    }

    /**
     * Initialize the weekly planner
     */
    init() {
        console.log('📅 Initializing Weekly Planner...');
    }

    /**
     * Get next Monday as default week start
     */
    getNextMonday() {
        const today = new Date();
        const nextMonday = new Date(today);
        const daysUntilMonday = (8 - today.getDay()) % 7;
        nextMonday.setDate(today.getDate() + (daysUntilMonday === 0 ? 7 : daysUntilMonday));
        return nextMonday.toISOString().split('T')[0];
    }

    /**
     * Get tomorrow as default due date
     */
    getTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }

    /**
     * Load admin interface for weekly planning
     */
    loadAdminInterface() {
        const adminContent = document.getElementById('admin-content');
        if (!adminContent) return;

        adminContent.innerHTML = `
            <!-- Weekly Assignment Planner -->
            <div class="assignments-panel">
                <h3 class="panel-title">📅 Weekly Assignment Planner</h3>
                <p style="margin-bottom: 20px; color: #666;">Add assignments for the week. Enter multiple assignments per subject separated by new lines.</p>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Student</label>
                        <select id="weeklyStudentSelect" class="form-input" onchange="window.WeeklyPlanner.updateCourses()">
                            <option value="child1">👦 Elijah</option>
                            <option value="child2">👦 Kai</option>
                            <option value="child3">👧 Noelani</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Week Starting (Monday)</label>
                        <input type="date" id="weekStartDate" class="form-input" value="${this.getNextMonday()}">
                    </div>
                </div>

                <div id="weeklyCourseGrid" class="weekly-course-grid">
                    <!-- Course grid will be populated here -->
                </div>

                <div style="display: flex; gap: 15px; margin-top: 25px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="window.WeeklyPlanner.addWeekAssignments()">
                        📅 Add Week's Assignments
                    </button>
                    <button class="btn btn-secondary" onclick="window.WeeklyPlanner.clearInputs()">
                        🗑️ Clear All
                    </button>
                    <button class="btn btn-info" onclick="window.WeeklyPlanner.loadSampleWeek()">
                        📝 Load Sample Week
                    </button>
                </div>
            </div>

            <!-- Single Assignment -->
            <div class="assignments-panel" style="margin-top: 30px;">
                <h3 class="panel-title">➕ Quick Single Assignment</h3>
                <p style="margin-bottom: 15px; color: #666;">Add one assignment quickly for any student and subject.</p>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Student</label>
                        <select id="studentSelect" class="form-input" onchange="window.WeeklyPlanner.updateSingleAssignmentSubjects()">
                            <option value="child1">👦 Elijah</option>
                            <option value="child2">👦 Kai</option>
                            <option value="child3">👧 Noelani</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <select id="subjectSelect" class="form-input">
                            <option value="Bible">📖 Bible</option>
                            <option value="Math">🔢 Math</option>
                            <option value="Science">🔬 Science</option>
                            <option value="History">🏛️ History</option>
                            <option value="Language Arts">📝 Language Arts</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Assignment Title</label>
                        <input type="text" id="titleInput" class="form-input" placeholder="e.g., Chapter 5: Fractions">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Due Date</label>
                        <input type="date" id="dueDateInput" class="form-input" value="${this.getTomorrow()}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Link (Optional)</label>
                    <input type="url" id="linkInput" class="form-input" 
                           placeholder="https://www.liberty.edu/online-academy/..." 
                           value="https://www.liberty.edu/online-academy/current-students/">
                </div>
                <button class="btn btn-primary" onclick="window.WeeklyPlanner.addSingleAssignment()">
                    ➕ Add Assignment
                </button>
            </div>

            <!-- Bulk Import -->
            <div class="assignments-panel" style="margin-top: 30px;">
                <h3 class="panel-title">📋 Bulk Import Assignments</h3>
                <p style="margin-bottom: 15px; color: #666;">
                    Paste assignment text from Liberty University or other sources. Format: One assignment per line.
                </p>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Student</label>
                        <select id="bulkStudentSelect" class="form-input" onchange="window.WeeklyPlanner.updateBulkSubjects()">
                            <option value="child1">👦 Elijah</option>
                            <option value="child2">👦 Kai</option>
                            <option value="child3">👧 Noelani</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <select id="bulkSubjectSelect" class="form-input">
                            <option value="Bible">📖 Bible</option>
                            <option value="Math">🔢 Math</option>
                            <option value="Science">🔬 Science</option>
                            <option value="History">🏛️ History</option>
                            <option value="Language Arts">📝 Language Arts</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Assignments (one per line)</label>
                    <textarea id="bulkAssignmentsInput" class="form-input" rows="6" 
                              placeholder="Lesson: Overview of the New Testament
Quiz: History and Overview of the Bible
Assignment: Chapter 1 Questions"></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="date" id="bulkStartDate" class="form-input" value="${this.getTomorrow()}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Spread Over</label>
                        <select id="bulkSpreadDays" class="form-input">
                            <option value="1">Same Day</option>
                            <option value="3">3 Days</option>
                            <option value="5" selected>5 Days (Mon-Fri)</option>
                            <option value="7">7 Days</option>
                        </select>
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="window.WeeklyPlanner.bulkImportAssignments()">
                    📥 Import Assignments
                </button>
            </div>

            <!-- Assignment Manager -->
            <div class="assignments-panel" style="margin-top: 30px;">
                <h3 class="panel-title">🗂️ Assignment Manager</h3>
                <p style="margin-bottom: 15px; color: #666;">View and manage existing assignments. Delete assignments that were added by mistake.</p>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Student</label>
                        <select id="managerStudentSelect" class="form-input" onchange="window.WeeklyPlanner.loadAssignments()">
                            <option value="child1">👦 Elijah</option>
                            <option value="child2">👦 Kai</option>
                            <option value="child3">👧 Noelani</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Filter by Subject</label>
                        <select id="managerSubjectFilter" class="form-input" onchange="window.WeeklyPlanner.filterAssignments()">
                            <option value="all">All Subjects</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <button class="btn btn-secondary" onclick="window.WeeklyPlanner.loadAssignments()">🔄 Refresh List</button>
                    <button class="btn btn-warning" onclick="window.WeeklyPlanner.deleteCompletedAssignments()">🗑️ Delete All Completed</button>
                </div>

                <div id="assignmentsList" class="assignments-list-manager" style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: #f9f9f9;">
                    <div style="text-align: center; color: #666; padding: 20px;">
                        Select a student to view their assignments
                    </div>
                </div>
            </div>

            <!-- Status Messages -->
            <div id="plannerStatus" class="planner-status" style="display: none; margin-top: 20px; padding: 15px; border-radius: 8px;">
                <!-- Status messages will appear here -->
            </div>
        `;

        // Initialize the course grid and subject dropdowns
        this.updateCourses();
        this.updateSingleAssignmentSubjects();
        this.updateBulkSubjects();
        this.loadAssignments();
    }

    /**
     * Update course grid based on selected student
     */
    updateCourses() {
        const studentSelect = document.getElementById('weeklyStudentSelect');
        const container = document.getElementById('weeklyCourseGrid');
        
        if (!studentSelect || !container) return;

        const studentId = studentSelect.value;
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        
        if (!student || !student.subjects) {
            container.innerHTML = '<p>No subjects found for this student.</p>';
            return;
        }

        container.innerHTML = `
            <h4 style="margin-bottom: 15px; color: #2d3436;">
                📚 ${student.name}'s Subjects (${student.subjects.length} courses)
            </h4>
        `;

        student.subjects.forEach((subject, index) => {
            const row = document.createElement('div');
            row.className = 'course-input-row';
            row.innerHTML = `
                <div class="course-header">
                    <span class="course-icon">${subject.icon}</span>
                    <span class="course-name">${subject.name}</span>
                </div>
                <textarea 
                    id="course-${index}" 
                    class="course-assignment-input" 
                    placeholder="Enter assignments for ${subject.name} (one per line)"
                    rows="3"
                ></textarea>
            `;
            container.appendChild(row);
        });
    }

    /**
     * Add weekly assignments from the course grid
     */
    addWeekAssignments() {
        const studentSelect = document.getElementById('weeklyStudentSelect');
        const weekStartInput = document.getElementById('weekStartDate');
        
        if (!studentSelect || !weekStartInput) {
            this.showError('Required elements not found');
            return;
        }

        const studentId = studentSelect.value;
        const weekStart = weekStartInput.value;
        
        if (!weekStart) {
            this.showError('Please select a week start date');
            return;
        }

        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        if (!student || !student.subjects) {
            this.showError('Student data not found');
            return;
        }

        const assignments = [];
        let addedCount = 0;

        student.subjects.forEach((subject, index) => {
            const input = document.getElementById(`course-${index}`);
            if (!input) return;

            const assignmentText = input.value.trim();
            if (!assignmentText) return;

            // Split by line breaks
            const assignmentList = assignmentText.split('\n').map(a => a.trim()).filter(a => a);

            assignmentList.forEach((assignment, assignmentIndex) => {
                const assignmentDate = new Date(weekStart);
                // Spread assignments across the week (Monday to Friday)
                assignmentDate.setDate(assignmentDate.getDate() + (assignmentIndex % 5));

                assignments.push({
                    subject: subject.name,
                    title: assignment,
                    link: 'https://www.liberty.edu/online-academy/current-students/',
                    dueDate: assignmentDate.toISOString().split('T')[0],
                    completed: false,
                    priority: 'medium'
                });

                addedCount++;
            });

            // Clear the input
            input.value = '';
        });

        if (addedCount === 0) {
            this.showError('Please enter at least one assignment');
            return;
        }

        // Add assignments to student data
        const success = window.DataManager ? window.DataManager.addWeeklyAssignments(studentId, assignments) : false;
        
        if (success) {
            this.showSuccess(`✅ Added ${addedCount} assignments for the week of ${new Date(weekStart).toLocaleDateString()}!`);
            this.refreshStudentView(studentId);
        } else {
            this.showError('Failed to add assignments');
        }
    }

    /**
     * Add single assignment
     */
    addSingleAssignment() {
        const studentId = document.getElementById('studentSelect')?.value;
        const subjectSelect = document.getElementById('subjectSelect');
        const subject = subjectSelect?.value?.trim();
        const title = document.getElementById('titleInput')?.value?.trim();
        const dueDate = document.getElementById('dueDateInput')?.value;
        const link = document.getElementById('linkInput')?.value?.trim();

        if (!studentId || !subject || !title || !dueDate) {
            this.showError('Please fill in all required fields');
            return;
        }

        const assignment = {
            subject,
            title,
            link: link || 'https://www.liberty.edu/online-academy/current-students/',
            dueDate,
            completed: false,
            priority: 'medium'
        };

        const success = window.DataManager ? window.DataManager.addAssignment(studentId, assignment) : false;

        if (success) {
            // Clear form
            document.getElementById('titleInput').value = '';
            document.getElementById('linkInput').value = 'https://www.liberty.edu/online-academy/current-students/';
            document.getElementById('dueDateInput').value = this.getTomorrow();

            this.showSuccess('✅ Assignment added successfully!');
            this.refreshStudentView(studentId);
        } else {
            this.showError('Failed to add assignment');
        }
    }

    /**
     * Bulk import assignments from text
     */
    bulkImportAssignments() {
        const studentId = document.getElementById('bulkStudentSelect')?.value;
        const subjectSelect = document.getElementById('bulkSubjectSelect');
        const subject = subjectSelect?.value?.trim();
        const assignmentsText = document.getElementById('bulkAssignmentsInput')?.value?.trim();
        const startDate = document.getElementById('bulkStartDate')?.value;
        const spreadDays = parseInt(document.getElementById('bulkSpreadDays')?.value) || 5;

        if (!studentId || !subject || !assignmentsText || !startDate) {
            this.showError('Please fill in all required fields');
            return;
        }

        // Split assignments by line breaks
        const assignmentList = assignmentsText.split('\n').map(a => a.trim()).filter(a => a);

        if (assignmentList.length === 0) {
            this.showError('No assignments found');
            return;
        }

        const assignments = [];
        const baseDate = new Date(startDate);

        assignmentList.forEach((assignment, index) => {
            const assignmentDate = new Date(baseDate);
            
            if (spreadDays === 1) {
                // All on same day
                // Keep same date
            } else {
                // Spread across specified days
                assignmentDate.setDate(baseDate.getDate() + (index % spreadDays));
            }

            assignments.push({
                subject,
                title: assignment,
                link: 'https://www.liberty.edu/online-academy/current-students/',
                dueDate: assignmentDate.toISOString().split('T')[0],
                completed: false,
                priority: 'medium'
            });
        });

        const success = window.DataManager ? window.DataManager.addWeeklyAssignments(studentId, assignments) : false;

        if (success) {
            // Clear form
            document.getElementById('bulkAssignmentsInput').value = '';

            this.showSuccess(`✅ Imported ${assignments.length} assignments for ${subject}!`);
            this.refreshStudentView(studentId);
        } else {
            this.showError('Failed to import assignments');
        }
    }

    /**
     * Load assignments for the assignment manager
     */
    loadAssignments() {
        const studentSelect = document.getElementById('managerStudentSelect');
        const subjectFilter = document.getElementById('managerSubjectFilter');
        const assignmentsList = document.getElementById('assignmentsList');
        
        if (!studentSelect || !assignmentsList) return;

        const studentId = studentSelect.value;
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        
        if (!student) {
            assignmentsList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">Student not found</div>';
            return;
        }

        // Update subject filter dropdown
        if (subjectFilter) {
            const subjects = student.subjects || [];
            const subjectOptions = ['<option value="all">All Subjects</option>'].concat(
                subjects.map(subject => `<option value="${subject.name}">${subject.icon} ${subject.name}</option>`)
            ).join('');
            subjectFilter.innerHTML = subjectOptions;
        }

        this.filterAssignments();
    }

    /**
     * Filter assignments by subject
     */
    filterAssignments() {
        const studentSelect = document.getElementById('managerStudentSelect');
        const subjectFilter = document.getElementById('managerSubjectFilter');
        const assignmentsList = document.getElementById('assignmentsList');
        
        if (!studentSelect || !assignmentsList) return;

        const studentId = studentSelect.value;
        const selectedSubject = subjectFilter?.value || 'all';
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        
        if (!student || !student.assignments) {
            assignmentsList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No assignments found</div>';
            return;
        }

        // Filter assignments
        let assignments = student.assignments;
        if (selectedSubject !== 'all') {
            assignments = assignments.filter(a => a.subject === selectedSubject);
        }

        // Sort by due date (most recent first)
        assignments.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

        if (assignments.length === 0) {
            assignmentsList.innerHTML = `
                <div style="text-align: center; color: #666; padding: 20px;">
                    No assignments found for ${selectedSubject === 'all' ? 'this student' : selectedSubject}
                </div>
            `;
            return;
        }

        // Generate assignments HTML
        const assignmentsHtml = assignments.map(assignment => {
            const dueDate = new Date(assignment.dueDate);
            const isOverdue = dueDate < new Date() && !assignment.completed;
            const subject = student.subjects.find(s => s.name === assignment.subject);
            const subjectColor = subject ? subject.color : '#667eea';

            return `
                <div class="assignment-manager-item" style="
                    background: white;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 10px;
                    border-left: 4px solid ${subjectColor};
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    ${isOverdue ? 'border-color: #e74c3c; background: #fdf2f2;' : ''}
                ">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                <span style="background: ${subjectColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: 500;">
                                    ${subject?.icon || '📚'} ${assignment.subject}
                                </span>
                                <span style="font-size: 0.85em; color: ${isOverdue ? '#e74c3c' : '#666'};">
                                    Due: ${dueDate.toLocaleDateString()}
                                    ${isOverdue ? ' (Overdue)' : ''}
                                </span>
                                <span style="
                                    background: ${assignment.completed ? '#d4edda' : '#fff3cd'};
                                    color: ${assignment.completed ? '#155724' : '#856404'};
                                    padding: 2px 8px;
                                    border-radius: 12px;
                                    font-size: 0.75em;
                                    font-weight: 500;
                                ">
                                    ${assignment.completed ? '✅ Complete' : '⏳ Pending'}
                                </span>
                            </div>
                            <div style="font-weight: 600; color: #333; margin-bottom: 5px;">
                                ${assignment.title}
                            </div>
                            ${assignment.link ? `
                                <a href="${assignment.link}" target="_blank" style="color: #667eea; text-decoration: none; font-size: 0.9em;">
                                    📖 View Assignment
                                </a>
                            ` : ''}
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button onclick="window.WeeklyPlanner.toggleAssignmentCompletion('${studentId}', ${assignment.id})"
                                    style="background: ${assignment.completed ? '#ffc107' : '#28a745'}; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8em;">
                                ${assignment.completed ? '↩️ Undo' : '✅ Mark Done'}
                            </button>
                            <button onclick="window.WeeklyPlanner.deleteAssignment('${studentId}', ${assignment.id})"
                                    style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8em;"
                                    title="Delete assignment">
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        assignmentsList.innerHTML = `
            <div style="margin-bottom: 15px; font-weight: 600; color: #333;">
                📋 ${assignments.length} assignment${assignments.length !== 1 ? 's' : ''} for ${student.name}
                ${selectedSubject !== 'all' ? ` in ${selectedSubject}` : ''}
            </div>
            ${assignmentsHtml}
        `;
    }

    /**
     * Delete a specific assignment
     */
    deleteAssignment(studentId, assignmentId) {
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        if (!student) {
            this.showError('Student not found');
            return;
        }

        const assignment = student.assignments.find(a => a.id === assignmentId);
        if (!assignment) {
            this.showError('Assignment not found');
            return;
        }

        if (!confirm(`Delete "${assignment.title}"?\n\nThis action cannot be undone.`)) {
            return;
        }

        // Remove the assignment
        student.assignments = student.assignments.filter(a => a.id !== assignmentId);
        
        // Save data
        if (window.DataManager.saveData()) {
            this.showSuccess('🗑️ Assignment deleted successfully');
            this.loadAssignments(); // Refresh the list
            this.refreshStudentView(studentId); // Update student dashboard
        } else {
            this.showError('Failed to delete assignment');
        }
    }

    /**
     * Toggle assignment completion status
     */
    toggleAssignmentCompletion(studentId, assignmentId) {
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        if (!student) {
            this.showError('Student not found');
            return;
        }

        const assignment = student.assignments.find(a => a.id === assignmentId);
        if (!assignment) {
            this.showError('Assignment not found');
            return;
        }

        // Toggle completion
        assignment.completed = !assignment.completed;
        
        // Save data
        if (window.DataManager.saveData()) {
            this.showSuccess(assignment.completed ? '✅ Assignment marked complete' : '↩️ Assignment marked incomplete');
            this.loadAssignments(); // Refresh the list
            this.refreshStudentView(studentId); // Update student dashboard
        } else {
            this.showError('Failed to update assignment');
        }
    }

    /**
     * Refresh student view if they're currently viewing
     */
    refreshStudentView(studentId) {
        if (window.app && window.app.currentStudent === studentId) {
            setTimeout(() => {
                window.app.showStudent(studentId);
            }, 500);
        }
    }

    /**
     * Clear all weekly inputs
     */
    clearInputs() {
        const student = window.DataManager ? window.DataManager.getStudent(document.getElementById('weeklyStudentSelect')?.value) : null;
        if (!student || !student.subjects) return;

        student.subjects.forEach((subject, index) => {
            const input = document.getElementById(`course-${index}`);
            if (input) input.value = '';
        });

        this.showSuccess('✅ Weekly inputs cleared!');
    }

    /**
     * Load sample week data for testing
     */
    loadSampleWeek() {
        const studentId = document.getElementById('weeklyStudentSelect')?.value;
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        
        if (!student || !student.subjects) {
            this.showError('Student data not found');
            return;
        }

        // Sample data for different subjects
        const sampleData = {
            'Bible': 'Lesson: Overview of the New Testament\nQuiz: History and Overview of the Bible\nAssignment: Chapter 1-3 Reading',
            'Math': 'Quiz: Set Theory\nLesson: Order of Operations\nHomework: Practice Problems 1-20',
            'Science': 'Lesson: Scientific Method Activity\nLab: Simple Experiments\nQuiz: Scientific Method',
            'History': 'Lesson: The Five Themes of Geography\nAssignment: Map Skills Practice\nQuiz: World Geography',
            'Language Arts': 'Lesson: Strong Writing Vocabulary\nAssignment: Essay Planning\nReading: Chapter 4-6',
            'Earth Science': 'Lesson: Scientific Method Activity\nLab: Simple Experiments\nQuiz: Scientific Method',
            'English': 'Lesson: Strong Writing Vocabulary\nAssignment: Essay Planning\nReading: Chapter 4-6',
            'Algebra': 'Quiz: Set Theory\nLesson: Order of Operations\nHomework: Practice Problems 1-20',
            'PE': 'Assignment: Physical Fitness Pre-Test\nLesson: Warm-Up Routines\nActivity: Stretching Exercises',
            'Academic & Career Success': 'Lesson: Learning Styles\nAssignment: Reading Log\nProject: Time Management Plan'
        };

        let loadedCount = 0;
        student.subjects.forEach((subject, index) => {
            const input = document.getElementById(`course-${index}`);
            if (input && sampleData[subject.name]) {
                input.value = sampleData[subject.name];
                loadedCount++;
            }
        });

        if (loadedCount > 0) {
            this.showSuccess(`✅ Loaded sample assignments for ${loadedCount} subjects!`);
        } else {
            this.showInfo('ℹ️ No sample data available for current subjects');
        }
    }

    /**
     * Update subject dropdown for single assignment based on selected student
     */
    updateSingleAssignmentSubjects() {
        const studentSelect = document.getElementById('studentSelect');
        const subjectSelect = document.getElementById('subjectSelect');
        
        if (!studentSelect || !subjectSelect) return;

        const studentId = studentSelect.value;
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        
        if (!student || !student.subjects) {
            subjectSelect.innerHTML = '<option value="General">General</option>';
            return;
        }

        const subjectsHtml = student.subjects.map(subject => 
            `<option value="${subject.name}">${subject.icon} ${subject.name}</option>`
        ).join('');

        subjectSelect.innerHTML = subjectsHtml;
        console.log(`📚 Updated single assignment subjects for ${student.name}`);
    }

    /**
     * Update subject dropdown for bulk import based on selected student
     */
    updateBulkSubjects() {
        const studentSelect = document.getElementById('bulkStudentSelect');
        const subjectSelect = document.getElementById('bulkSubjectSelect');
        
        if (!studentSelect || !subjectSelect) return;

        const studentId = studentSelect.value;
        const student = window.DataManager ? window.DataManager.getStudent(studentId) : null;
        
        if (!student || !student.subjects) {
            subjectSelect.innerHTML = '<option value="General">General</option>';
            return;
        }

        const subjectsHtml = student.subjects.map(subject => 
            `<option value="${subject.name}">${subject.icon} ${subject.name}</option>`
        ).join('');

        subjectSelect.innerHTML = subjectsHtml;
        console.log(`📚 Updated bulk import subjects for ${student.name}`);
    }

    /**
     * Show status message
     */
    showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('plannerStatus');
        if (!statusDiv) {
            // Fallback to console if status div not found
            console.log(message);
            return;
        }

        const colors = {
            success: '#d4edda',
            error: '#f8d7da',
            warning: '#fff3cd',
            info: '#d1ecf1'
        };

        const textColors = {
            success: '#155724',
            error: '#721c24',
            warning: '#856404',
            info: '#0c5460'
        };

        statusDiv.style.backgroundColor = colors[type] || colors.info;
        statusDiv.style.color = textColors[type] || textColors.info;
        statusDiv.style.border = `1px solid ${textColors[type] || textColors.info}`;
        statusDiv.textContent = message;
        statusDiv.style.display = 'block';

        // Auto-hide success messages after 4 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 4000);
        }
    }

    /**
     * Utility methods for notifications
     */
    showSuccess(message) {
        this.showStatus(message, 'success');
        if (window.Utils) {
            Utils.showNotification(message, 'success');
        }
    }

    showError(message) {
        this.showStatus(message, 'error');
        if (window.Utils) {
            Utils.showNotification(message, 'error');
        }
    }

    showInfo(message) {
        this.showStatus(message, 'info');
        if (window.Utils) {
            Utils.showNotification(message, 'info');
        }
    }
}

// Create singleton instance
const weeklyPlanner = new WeeklyPlanner();

// Export for use in other modules
window.WeeklyPlanner = weeklyPlanner;