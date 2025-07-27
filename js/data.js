/**
 * RaisingBerries - Data Management with Weekly Schedule Integration
 * File: js/data.js
 */

class DataManager {
    constructor() {
        this.studentsData = {};
        this.currentVerse = {};
        this.initialized = false;
        this.currentWeek = 'WEEK1_SCHEDULES'; // Change this each week!
        this.initializeDefaultData();
        console.log('📊 DataManager created');
    }

    /**
     * Initialize with default student data (structure only)
     */
    initializeDefaultData() {
        // Base student structure (no assignments - they come from weekly files)
        this.studentsData = {
            child1: {
                id: 'child1',
                name: 'Elijah',
                grade: '9th',
                subjects: [
                    { name: 'Bible', icon: '📖', color: '#8b5cf6' },
                    { name: 'Earth Science', icon: '🌍', color: '#059669' },
                    { name: 'History & Geography', icon: '🏛️', color: '#dc2626' },
                    { name: 'English', icon: '📝', color: '#2563eb' },
                    { name: 'Algebra', icon: '🔢', color: '#ea580c' },
                    { name: 'PE', icon: '🏃‍♂️', color: '#00b894' },
                    { name: 'Academic & Career Success', icon: '🎯', color: '#667eea' }
                ],
                assignments: [], // Will be loaded from weekly schedule
                flashcards: [
                    { id: 1, word: 'Photosynthesis', definition: 'Process by which plants make food using sunlight', subject: 'Earth Science', status: 'unknown' },
                    { id: 2, word: 'Intertestamental', definition: 'Period between Old and New Testament', subject: 'Bible', status: 'unknown' }
                ],
                notes: [
                    { id: 1, title: 'Study Notes', content: 'Elijah is working through his 9th grade curriculum with 7 subjects daily.', subject: 'General' }
                ]
            },
            child2: {
                id: 'child2',
                name: 'Kai',
                grade: '7th',
                subjects: [
                    { name: 'Bible', icon: '📖', color: '#8b5cf6' },
                    { name: 'Math', icon: '🔢', color: '#ea580c' },
                    { name: 'Science', icon: '🔬', color: '#059669' },
                    { name: 'History', icon: '🏛️', color: '#dc2626' },
                    { name: 'Language Arts', icon: '📝', color: '#2563eb' }
                ],
                assignments: [], // Will be loaded from weekly schedule
                flashcards: [
                    { id: 1, word: 'Integer', definition: 'A whole number that can be positive, negative, or zero', subject: 'Math', status: 'unknown' },
                    { id: 2, word: 'Pentateuch', definition: 'The first five books of the Bible', subject: 'Bible', status: 'unknown' }
                ],
                notes: [
                    { id: 1, title: 'Study Schedule', content: 'Kai is in 7th grade focusing on foundational skills across 5 core subjects.', subject: 'General' }
                ]
            },
            child3: {
                id: 'child3',
                name: 'Noelani',
                grade: '3rd',
                subjects: [
                    { name: 'Bible', icon: '📖', color: '#8b5cf6' },
                    { name: 'Math', icon: '🔢', color: '#ea580c' },
                    { name: 'Science', icon: '🔬', color: '#059669' },
                    { name: 'History', icon: '🏛️', color: '#dc2626' },
                    { name: 'Language Arts', icon: '📝', color: '#2563eb' }
                ],
                assignments: [], // Will be loaded from weekly schedule
                flashcards: [
                    { id: 1, word: 'Context Clues', definition: 'Hints in text that help understand unknown words', subject: 'Language Arts', status: 'unknown' },
                    { id: 2, word: 'Place Value', definition: 'Value of a digit based on its position', subject: 'Math', status: 'unknown' }
                ],
                notes: [
                    { id: 1, title: 'Schedule', content: 'Noelani is in 3rd grade on an accelerated 31-week schedule: July 28, 2025 - March 31, 2026', subject: 'General' }
                ]
            }
        };

        this.currentVerse = {
            reference: '2 Timothy 1:7',
            text: 'For God has not given us a spirit of timidity, but of power and love and discipline.',
            reflection: 'You have all the power you need, but you have to act like it by believing the word of God and going forward in faith to do His will by His power, not your own.'
        };
    }

    /**
     * Load weekly assignments from schedule file
     */
    loadWeeklySchedule() {
        try {
            // Check if weekly schedule is available
            const weeklyData = window[this.currentWeek];
            
            if (!weeklyData || !weeklyData.assignments) {
                console.warn(`⚠️ Weekly schedule ${this.currentWeek} not found or invalid`);
                return false;
            }

            console.log(`📅 Loading ${weeklyData.weekInfo.description}`);

            // Load assignments for each student
            Object.keys(weeklyData.assignments).forEach(studentId => {
                if (this.studentsData[studentId]) {
                    const weeklyAssignments = weeklyData.assignments[studentId];
                    
                    // Add IDs and completion status to assignments
                    const processedAssignments = weeklyAssignments.map((assignment, index) => ({
                        id: index + 1,
                        completed: false,
                        ...assignment
                    }));

                    // Replace assignments (or merge with existing based on your preference)
                    this.studentsData[studentId].assignments = processedAssignments;
                    
                    console.log(`✅ Loaded ${processedAssignments.length} assignments for ${this.studentsData[studentId].name}`);
                }
            });

            return true;
        } catch (error) {
            console.error('❌ Error loading weekly schedule:', error);
            return false;
        }
    }

    /**
     * Initialize the data manager
     */
    async init() {
        console.log('📊 Initializing DataManager...');
        
        // Load saved data first (preserves completion status)
        this.loadData();
        
        // Wait a bit for weekly schedule file to load
        await this.waitForWeeklySchedule();
        
        // Load weekly assignments
        this.loadWeeklySchedule();
        
        this.initialized = true;
        console.log('✅ DataManager ready');
        return true;
    }

    /**
     * Wait for weekly schedule to be available
     */
    async waitForWeeklySchedule() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 30;
            
            const checkSchedule = () => {
                attempts++;
                
                if (window[this.currentWeek]) {
                    console.log(`✅ Weekly schedule ${this.currentWeek} ready`);
                    resolve();
                    return;
                }
                
                if (attempts >= maxAttempts) {
                    console.warn(`⚠️ Weekly schedule ${this.currentWeek} timeout`);
                    resolve();
                    return;
                }
                
                setTimeout(checkSchedule, 100);
            };
            
            checkSchedule();
        });
    }

    /**
     * Change to a different week (for testing or switching weeks)
     */
    switchToWeek(weekIdentifier) {
        this.currentWeek = weekIdentifier;
        this.loadWeeklySchedule();
        console.log(`🔄 Switched to ${weekIdentifier}`);
    }

    // ... rest of your existing DataManager methods remain the same ...
    
    /**
     * Check if ready
     */
    isReady() {
        return this.initialized;
    }

    /**
     * Get student by ID
     */
    getStudent(studentId) {
        return this.studentsData[studentId];
    }

    /**
     * Get all students
     */
    getAllStudents() {
        return this.studentsData;
    }

    /**
     * Toggle assignment completion
     */
    toggleAssignment(studentId, assignmentId) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        const assignment = student.assignments.find(a => a.id === assignmentId);
        if (!assignment) return false;

        assignment.completed = !assignment.completed;
        this.saveData();
        console.log(`${assignment.completed ? '✅' : '⭕'} ${assignment.title} - ${student.name}`);
        return assignment.completed;
    }

    /**
     * Get current verse
     */
    getCurrentVerse() {
        return this.currentVerse;
    }

    /**
     * Save data to localStorage (preserves completion status)
     */
    saveData() {
        try {
            // Only save completion status, not the full assignments
            const saveData = {
                students: {},
                verse: this.currentVerse,
                currentWeek: this.currentWeek,
                lastSave: new Date().toISOString()
            };

            // Save completion status for each student
            Object.keys(this.studentsData).forEach(studentId => {
                const student = this.studentsData[studentId];
                saveData.students[studentId] = {
                    flashcards: student.flashcards,
                    notes: student.notes,
                    assignmentCompletions: student.assignments.map(a => ({
                        id: a.id,
                        title: a.title,
                        completed: a.completed
                    }))
                };
            });

            localStorage.setItem('raisingberries_data', JSON.stringify(saveData));
            console.log('💾 Data saved (completion status preserved)');
            return true;
        } catch (error) {
            console.error('❌ Save error:', error);
            return false;
        }
    }

    /**
     * Load data from localStorage (restores completion status)
     */
    loadData() {
        try {
            const saved = localStorage.getItem('raisingberries_data');
            if (saved) {
                const data = JSON.parse(saved);
                
                if (data.currentWeek) {
                    this.currentWeek = data.currentWeek;
                }
                
                if (data.verse) {
                    this.currentVerse = data.verse;
                }

                // Store completion data to apply after assignments are loaded
                this.savedCompletions = data.students;
                
                console.log('📁 Saved data loaded');
            }
            return true;
        } catch (error) {
            console.error('❌ Load error:', error);
            return false;
        }
    }

    /**
     * Apply saved completion status to assignments
     */
    applySavedCompletions() {
        if (!this.savedCompletions) return;

        Object.keys(this.savedCompletions).forEach(studentId => {
            const student = this.studentsData[studentId];
            const savedStudent = this.savedCompletions[studentId];
            
            if (student && savedStudent) {
                // Restore flashcards and notes
                if (savedStudent.flashcards) {
                    student.flashcards = savedStudent.flashcards;
                }
                if (savedStudent.notes) {
                    student.notes = savedStudent.notes;
                }
                
                // Restore completion status
                if (savedStudent.assignmentCompletions) {
                    savedStudent.assignmentCompletions.forEach(saved => {
                        const assignment = student.assignments.find(a => 
                            a.id === saved.id && a.title === saved.title
                        );
                        if (assignment) {
                            assignment.completed = saved.completed;
                        }
                    });
                }
            }
        });

        console.log('✅ Completion status restored');
        this.savedCompletions = null; // Clear after applying
    }

    // ... include all your other existing methods (addFlashcard, addNote, etc.) ...
}

// Create and initialize
const dataManager = new DataManager();

// Export to window
if (typeof window !== 'undefined') {
    window.DataManager = dataManager;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => dataManager.init());
} else {
    dataManager.init();
}

console.log('📊 DataManager with Weekly Schedule Integration loaded');