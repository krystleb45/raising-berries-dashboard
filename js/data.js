/**
 * RaisingBerries - Simple Data Management
 * Handles student data, assignments, flashcards, and notes
 * File: js/data.js
 */

class DataManager {
    constructor() {
        this.studentsData = {};
        this.currentVerse = {};
        this.initialized = false;
        this.initializeDefaultData();
        console.log('📊 DataManager created');
    }

 /**
 * Initialize with default student data
 */
initializeDefaultData() {
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
            assignments: [
                { 
                    id: 1, 
                    subject: 'Bible', 
                    title: 'Overview of the New Testament', 
                    link: 'https://www.liberty.edu/online-academy/current-students/', 
                    completed: false, 
                    dueDate: '2025-07-28'
                },
                { 
                    id: 2, 
                    subject: 'Earth Science', 
                    title: 'Scientific Method Activity', 
                    link: 'https://www.liberty.edu/online-academy/current-students/', 
                    completed: false, 
                    dueDate: '2025-07-28'
                }
            ],
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
            assignments: [
                { 
                    id: 1, 
                    subject: 'Bible', 
                    title: 'Study Guide: Books of the Bible', 
                    link: 'https://www.liberty.edu/online-academy/current-students/', 
                    completed: false, 
                    dueDate: '2025-07-28'
                },
                { 
                    id: 2, 
                    subject: 'Math', 
                    title: 'Chapter 1: Integers and Rational Numbers', 
                    link: 'https://www.liberty.edu/online-academy/current-students/', 
                    completed: false, 
                    dueDate: '2025-07-29'
                }
            ],
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
            assignments: [
                { 
                    id: 1, 
                    subject: 'Language Arts', 
                    title: 'Week 1: Reading Comprehension', 
                    link: 'https://www.liberty.edu/online-academy/current-students/', 
                    completed: false, 
                    dueDate: '2025-07-28' 
                },
                { 
                    id: 2, 
                    subject: 'Math', 
                    title: 'Week 1: Place Value Up to Six Digits', 
                    link: 'https://www.liberty.edu/online-academy/current-students/', 
                    completed: false, 
                    dueDate: '2025-07-29' 
                }
            ],
            flashcards: [
                { id: 1, word: 'Context Clues', definition: 'Hints in text that help understand unknown words', subject: 'Language Arts', status: 'unknown' },
                { id: 2, word: 'Place Value', definition: 'Value of a digit based on its position', subject: 'Math', status: 'unknown' }
            ],
            notes: [
                { id: 1, title: 'Schedule', content: 'Noelani is in 3rd grade on an accelerated 31-week schedule: July 28, 2025 - March 31, 2026', subject: 'General' }
            ]
        }
    };

    // Updated verse with the reflection text you wanted
    this.currentVerse = {
        reference: '2 Timothy 1:7',
        text: 'For God has not given us a spirit of timidity, but of power and love and discipline.',
        reflection: 'You have all the power you need, but you have to act like it by believing the word of God and going forward in faith to do His will by His power, not your own.'
    };
}

    /**
     * Initialize the data manager
     */
    init() {
        console.log('📊 Initializing DataManager...');
        this.loadData();
        this.initialized = true;
        console.log('✅ DataManager ready');
        return true;
    }

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
     * Add assignment to student
     */
    addAssignment(studentId, assignment) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        // Generate new ID
        const maxId = Math.max(0, ...student.assignments.map(a => a.id));
        assignment.id = maxId + 1;
        assignment.completed = false;
        
        student.assignments.push(assignment);
        this.saveData();
        console.log(`✅ Added assignment "${assignment.title}" to ${student.name}`);
        return true;
    }

    /**
     * Add weekly assignments
     */
    addWeeklyAssignments(studentId, assignments) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        let maxId = Math.max(0, ...student.assignments.map(a => a.id));
        
        assignments.forEach(assignment => {
            maxId++;
            assignment.id = maxId;
            assignment.completed = false;
            student.assignments.push(assignment);
        });

        this.saveData();
        console.log(`✅ Added ${assignments.length} weekly assignments to ${student.name}`);
        return true;
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
     * Add flashcard
     */
    addFlashcard(studentId, flashcard) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        const maxId = Math.max(0, ...student.flashcards.map(f => f.id));
        flashcard.id = maxId + 1;
        flashcard.status = flashcard.status || 'unknown';
        flashcard.created = flashcard.created || new Date().toISOString();
        
        student.flashcards.push(flashcard);
        this.saveData();
        console.log(`✅ Added flashcard "${flashcard.word}" to ${student.name}`);
        return true;
    }

    /**
     * Update flashcard
     */
    updateFlashcard(studentId, flashcard) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        const index = student.flashcards.findIndex(f => f.id === flashcard.id);
        if (index === -1) return false;

        student.flashcards[index] = { ...student.flashcards[index], ...flashcard };
        this.saveData();
        return true;
    }

    /**
     * Delete flashcard
     */
    deleteFlashcard(studentId, flashcardId) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        const index = student.flashcards.findIndex(f => f.id === flashcardId);
        if (index === -1) return false;

        student.flashcards.splice(index, 1);
        this.saveData();
        return true;
    }

    /**
     * Add note
     */
    addNote(studentId, note) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        const maxId = Math.max(0, ...student.notes.map(n => n.id));
        note.id = maxId + 1;
        note.created = note.created || new Date().toISOString();
        note.updated = new Date().toISOString();
        
        student.notes.push(note);
        this.saveData();
        console.log(`✅ Added note "${note.title}" to ${student.name}`);
        return true;
    }

    /**
     * Update note
     */
    updateNote(studentId, note) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        const index = student.notes.findIndex(n => n.id === note.id);
        if (index === -1) return false;

        note.updated = new Date().toISOString();
        student.notes[index] = { ...student.notes[index], ...note };
        this.saveData();
        return true;
    }

    /**
     * Delete note
     */
    deleteNote(studentId, noteId) {
        const student = this.studentsData[studentId];
        if (!student) return false;

        const index = student.notes.findIndex(n => n.id === noteId);
        if (index === -1) return false;

        student.notes.splice(index, 1);
        this.saveData();
        return true;
    }

    /**
     * Get current verse
     */
    getCurrentVerse() {
        return this.currentVerse;
    }

    /**
     * Get assignments for this week
     */
    getWeekAssignments(studentId) {
        const student = this.studentsData[studentId];
        if (!student) return [];

        const today = new Date();
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        return student.assignments.filter(a => {
            const dueDate = new Date(a.dueDate);
            return dueDate >= today && dueDate <= weekFromNow;
        });
    }

    /**
     * Get analytics
     */
    getAnalytics() {
        const analytics = {
            completedAssignments: 0,
            totalAssignments: 0,
            overallProgress: 0,
            students: {}
        };

        Object.entries(this.studentsData).forEach(([studentId, student]) => {
            const completed = student.assignments.filter(a => a.completed).length;
            const total = student.assignments.length;
            
            analytics.completedAssignments += completed;
            analytics.totalAssignments += total;
            
            analytics.students[studentId] = {
                name: student.name,
                progress: total > 0 ? Math.round((completed / total) * 100) : 0,
                completed,
                total
            };
        });

        analytics.overallProgress = analytics.totalAssignments > 0 
            ? Math.round((analytics.completedAssignments / analytics.totalAssignments) * 100) 
            : 0;

        return analytics;
    }

    /**
     * Save data to localStorage
     */
    saveData() {
        try {
            localStorage.setItem('raisingberries_data', JSON.stringify({
                students: this.studentsData,
                verse: this.currentVerse,
                lastSave: new Date().toISOString()
            }));
            console.log('💾 Data saved');
            return true;
        } catch (error) {
            console.error('❌ Save error:', error);
            return false;
        }
    }

    /**
     * Load data from localStorage
     */
    loadData() {
        try {
            const saved = localStorage.getItem('raisingberries_data');
            if (saved) {
                const data = JSON.parse(saved);
                if (data.students) {
                    // Merge with defaults to keep structure and add new subjects
                    Object.keys(this.studentsData).forEach(studentId => {
                        if (data.students[studentId]) {
                            // Preserve new subject structure but keep saved assignments/flashcards/notes
                            this.studentsData[studentId] = {
                                ...this.studentsData[studentId],
                                assignments: data.students[studentId].assignments || [],
                                flashcards: data.students[studentId].flashcards || [],
                                notes: data.students[studentId].notes || []
                            };
                        }
                    });
                }
                if (data.verse) {
                    this.currentVerse = data.verse;
                }
                console.log('📁 Data loaded and merged with new subjects');
            }
            return true;
        } catch (error) {
            console.error('❌ Load error:', error);
            return false;
        }
    }

    /**
     * Clear all data (for testing)
     */
    clearData() {
        localStorage.removeItem('raisingberries_data');
        this.initializeDefaultData();
        console.log('🗑️ Data cleared and reset to defaults');
    }

    /**
     * Export data
     */
    exportAll() {
        const data = {
            students: this.studentsData,
            verse: this.currentVerse,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `raisingberries_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('📤 Data exported');
    }

    /**
     * Import data
     */
    importData(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            if (data.students) {
                this.studentsData = data.students;
            }
            if (data.verse) {
                this.currentVerse = data.verse;
            }
            
            this.saveData();
            console.log('📥 Data imported successfully');
            return true;
        } catch (error) {
            console.error('❌ Import error:', error);
            return false;
        }
    }
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

console.log('📊 Simple DataManager loaded');