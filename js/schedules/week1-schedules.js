// js/schedules/week1-schedules.js
// Week 1: July 28 - August 1, 2025

const WEEK1_SCHEDULES = {
    // Week metadata
    weekInfo: {
        weekNumber: 1,
        startDate: '2025-07-28',
        endDate: '2025-08-01',
        description: 'Week 1: July 28 - August 1, 2025'
    },

    // Assignments organized by student
    assignments: {
        child1: [ // Elijah
            // 07/28/25 - Bible
            { subject: 'Bible', title: 'Lesson: Overview of the New Testament: Purpose, Authorship, Timeline', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Bible', title: 'Lesson: Overview of the New Testament: The Narrative', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            // 07/28/25 - Earth Science
            { subject: 'Earth Science', title: 'Lab: Scientific Method Activity', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Earth Science', title: 'Assignment: Scientific Method Activity Report', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            // 07/28/25 - History & Geography
            { subject: 'History & Geography', title: 'Lesson: The Five Themes of Geography', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'History & Geography', title: 'Lesson: Review: The Five Themes of Geography', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            // 07/28/25 - English
            { subject: 'English', title: 'Lesson: Strong Writing Vocabulary', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'English', title: 'Lesson: Review: Strong Writing Vocabulary', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            // 07/28/25 - Algebra
            { subject: 'Algebra', title: 'Quiz: 1.1-2 (Provides Optional Oral Review After)', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Algebra', title: 'Lesson: Order of Operations, Part 1', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            // 07/28/25 - PE
            { subject: 'PE', title: 'Assignment: Physical Fitness Test', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'PE', title: 'Lesson: Warm-Up & Recovery Routines', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            // 07/28/25 - Academic & Career Success
            { subject: 'Academic & Career Success', title: 'Lesson: What is Your Learning Style?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Academic & Career Success', title: 'Assignment: Reminder: Reading Log', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            // 07/29/25 - Bible
            { subject: 'Bible', title: 'Lesson: The Intertestamental Period: The Apocryphal Books', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Bible', title: 'Lesson: Review: Overview of the New Testament and the Intertestamental Period', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' }
            
            // ... continue with all assignments for the week
        ],

        child2: [ // Kai
            { subject: 'Bible', title: 'Study Guide: Books of the Bible', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Math', title: 'Chapter 1: Integers and Rational Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' }
            // ... Kai's assignments
        ],

        child3: [ // Noelani
            { subject: 'Language Arts', title: 'Week 1: Reading Comprehension', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Math', title: 'Week 1: Place Value Up to Six Digits', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' }
            // ... Noelani's assignments
        ]
    }
};

// Export for use in data.js
if (typeof window !== 'undefined') {
    window.WEEK1_SCHEDULES = WEEK1_SCHEDULES;
}

// Node.js export (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEEK1_SCHEDULES;
}