// js/schedules/week1-schedules.js
// Week 1: July 28 - August 1, 2025
// Complete schedule for all students

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
        child1: [ // Elijah - 9th Grade
            // 07/28/25 - Monday
            { subject: 'Bible', title: 'Lesson: Overview of the New Testament: Purpose, Authorship, Timeline', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Bible', title: 'Lesson: Overview of the New Testament: The Narrative', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Earth Science', title: 'Lab: Scientific Method Activity', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Earth Science', title: 'Assignment: Scientific Method Activity Report', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'History & Geography', title: 'Lesson: The Five Themes of Geography', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'History & Geography', title: 'Lesson: Review: The Five Themes of Geography', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'English', title: 'Lesson: Strong Writing Vocabulary', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'English', title: 'Lesson: Review: Strong Writing Vocabulary', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Algebra', title: 'Quiz: 1.1-2 (Provides Optional Oral Review After)', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Algebra', title: 'Lesson: Order of Operations, Part 1', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'PE', title: 'Assignment: Physical Fitness Test', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'PE', title: 'Lesson: Warm-Up & Recovery Routines', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Academic & Career Success', title: 'Lesson: What is Your Learning Style?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Academic & Career Success', title: 'Assignment: Reminder: Reading Log', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },

            // 07/29/25 - Tuesday
            { subject: 'Bible', title: 'Lesson: The Intertestamental Period: The Apocryphal Books', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Bible', title: 'Lesson: Review: Overview of the New Testament and the Intertestamental Period', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Earth Science', title: 'Assignment: Scientific Method Questions & Significant Figures', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Earth Science', title: 'Lesson: Review: Significant Figures', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'History & Geography', title: 'Quiz: Review: World Geography', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'History & Geography', title: 'Lesson: Primary Source Practice in Pre-history', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'English', title: 'Lesson: Clauses, Phrases, and Sentence Structure', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'English', title: 'Lesson: Review: Clauses, Phrases, and Sentence Structure', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Algebra', title: 'Lesson: Order of Operations, Part 2', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'PE', title: 'Lesson: Flexibility', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'PE', title: 'Assignment: Warm-Up, Recovery & Flexibility Video', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Academic & Career Success', title: 'Lesson: Self-Reflection and Academic Growth', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Academic & Career Success', title: 'Assignment: Self-Assessment Results', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },

            // 07/30/25 - Wednesday
            { subject: 'Bible', title: 'Quiz: Review: History and Overview of the Bible', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Bible', title: 'Quiz: History and Overview of the Bible', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Earth Science', title: 'Lesson: Mapping the Earth & Remote Sensing', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Earth Science', title: 'Lesson: Location Coordinates & Maps: Reading', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'History & Geography', title: 'Assignment: Text Review: World Geography & Pre-history', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'History & Geography', title: 'Assignment: Text Review: World Geography Check-In', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'English', title: 'Lesson Review: Clauses, Colons, and Syntax', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'English', title: 'Assignment: Planning Out My Essay', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Algebra', title: 'Lesson: Simplifying Expressions, Part 1', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Algebra', title: 'Assignment: Order of Operations and Warm-Up, Recovery & Flexibility Video', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'PE', title: 'Lesson: Body Composition', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Academic & Career Success', title: 'Assignment: Reading Log 2', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },

            // 07/31/25 - Thursday
            { subject: 'Bible', title: 'Lesson: Dividing the Scriptures: The Pentateuch (Torah)', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Bible', title: 'Lesson: Dividing the Scriptures: Books of History: Joshua to 2 Samuel', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Earth Science', title: 'Lesson: Location Coordinates & Maps: Using', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Earth Science', title: 'Assignment: Latitude and Longitude of Five Cities', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'History & Geography', title: 'Text Review: World Geography Practice', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'History & Geography', title: 'Assignment: Chapter Check-In', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'English', title: 'Assignment: Introduction to a Strong Essay: Planning Out Essay Topics', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'English', title: 'Assignment: Advice About Writing With Integrity Paragraphs', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Algebra', title: 'Lesson: Simplifying Expressions, Part 2', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Algebra', title: 'Lesson: Introduction to Functions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'PE', title: 'Lesson: Dynamic Stretches', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'PE', title: 'Lesson: Dynamic Stretches - Practice Reminder', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Academic & Career Success', title: 'Lesson: Reading Strategies: Pre-Reading and Content Reading', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Academic & Career Success', title: 'Assignment: Reminder: Reading Log', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },

            // 08/01/25 - Friday
            { subject: 'Bible', title: 'Lesson: Dividing the Scriptures: Books of History: 1 Kings to Esther', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'Bible', title: 'Lesson: Review: The Pentateuch and the Books of History', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'Bible', title: 'Lesson: Dividing the Scriptures: Books of Poetry and Wisdom', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            
            { subject: 'Earth Science', title: 'Assignment: Topographic Map Practice', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            
            { subject: 'History & Geography', title: 'Assignment: Putting it All Together - Going to and Putting History Together', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'History & Geography', title: 'Assignment: Putting it All Together - Essay about a Country, and Worldview', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            
            { subject: 'English', title: 'Lesson: Review: Introduction to a Strong Essay Body Paragraphs', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'English', title: 'Assignment: Advice About Writing With Integrity Paragraphs', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            
            { subject: 'Algebra', title: 'Quiz: 1.2-3 (Optional Oral Review After)', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            
            { subject: 'PE', title: 'Lesson: Performance Analysis', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'PE', title: 'Assignment: Dynamic Stretches Video', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            
            { subject: 'Academic & Career Success', title: 'Lesson: Reading Strategies: Post-Reading', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'Academic & Career Success', title: 'Lesson: Reading Strategies: Unfamiliar Language', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'Academic & Career Success', title: 'Lesson: Review: Reading Strategies', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' },
            { subject: 'Academic & Career Success', title: 'Quiz: Review: Worldview & Learning', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-08-01' }
        ],

        child2: [ // Kai - 7th Grade
            // 07/28/25 - Monday
            { subject: 'Bible', title: 'Lesson: Does God Exist?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Bible', title: 'Lesson Review: Does God Exist?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Bible', title: 'Assignment: Does God Exist?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Science', title: 'Lesson: Creation Project Directions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Science', title: 'Lesson: Scientific Evidence for the Bible', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Science', title: 'Lesson Review: Scientific Evidence for the Bible', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'History & Geography', title: 'Lesson: US Geography: The Southwest', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'History & Geography', title: 'Lesson: US Geography: The West (Rocky Mountains)', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'History & Geography', title: 'Lesson: US Geography: The Pacific and Noncontiguous', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'History & Geography', title: 'Lesson Review: US Geography: The Southwest, West, Pacific, and Noncontiguous', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'History & Geography', title: 'Quiz Review: Geography of the United States', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Language Arts', title: 'Lesson: Subject-Verb Agreement', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Language Arts', title: 'Lesson: Pronoun-Antecedent Agreement', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Math', title: 'Lesson: Exponents', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Math', title: 'Lesson: Perfect Squares', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Math', title: 'Lesson Review: Exponents and Perfect Squares', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },

            // 07/29/25 - Tuesday
            { subject: 'Bible', title: 'Lesson: Scripture Work Module 1 - Workday', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Bible', title: 'Lesson: Who is God?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Bible', title: 'Lesson Review: Who is God?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Science', title: 'Lesson: A Creationist Perspective - Young or Old?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Science', title: 'Lesson Review: A Creationist Perspective - Young or Old?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'History & Geography', title: 'Quiz: Geography of the United States', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'History & Geography', title: 'Lesson: Presidents Biography: Andrew Johnson', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'History & Geography', title: 'Lesson: Presidential Biography: Ulysses S. Grant', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'History & Geography', title: 'Lesson: Presidential Biography: Rutherford B. Hayes', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'History & Geography', title: 'Lesson Review: Presidents Johnson, Grant, and Hayes', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Language Arts', title: 'Lesson: Verb Tenses', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Language Arts', title: 'Assignment: Verb Tenses Revision', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Language Arts', title: 'Lesson: Eliminating Run-Ons, Comma Splices, and Double Negatives', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Math', title: 'Lesson: Powers of Ten', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Math', title: 'Lesson: Order of Operations', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Math', title: 'Lesson Review: Powers of Ten and Order of Operations', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },

            // 07/30/25 - Wednesday
            { subject: 'Bible', title: 'Scripture Reflection Journal Workday', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Bible', title: 'Lesson: The Case for the Creator - Origins', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Bible', title: 'Lesson: The Case for the Creator - Fossils and the Expanding Universe', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Bible', title: 'Lesson Review: The Case for the Creator - Fossils and the Expanding Universe', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Science', title: 'Quiz: Creation & Origins of the Earth', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Science', title: 'Lesson: A Deeper Look into a Younger Earth', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Science', title: 'Lesson Review: A Deeper Look into a Younger Earth', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'History & Geography', title: 'Quiz: Week 2 Grammar', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'History & Geography', title: 'Lesson: The Introduction of Vocabulary', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'History & Geography', title: 'Lesson: Apostrophes and Quotation Marks', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Math', title: 'Quiz: Week 2', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Math', title: 'Lesson: Factors and Prime and Composite Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Math', title: 'Lesson: Factors, Multiples, and Divisibility', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Math', title: 'Lesson Review: Factors, Multiples, and Divisibility', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },

            // 07/31/25 - Thursday
            { subject: 'Bible', title: 'Lesson: The Case for the Creator - Irreducible Complexity', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Bible', title: 'Lesson Review: The Case for the Creator - Our Unique Planet', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Science', title: 'Assignment: Creation Project', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Science', title: 'Lesson: Module 1 Test Review', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'History & Geography', title: 'Lesson: 13th Amendment', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Language Arts', title: 'Lesson: Punctuation and Capitalization', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Language Arts', title: 'Lesson: Proofreading Marks', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Math', title: 'Lesson: Prime Factorization', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Math', title: 'Lesson: Test Review - Module 1', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Math', title: 'Test Review: Module 1', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' }
        ],

        child3: [ // Noelani - 3rd Grade
            // 07/28/25 - Monday
            { subject: 'Bible', title: 'Lesson 1: Jesus Ascends into Heaven Introduction', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Bible', title: 'Lesson 2: Jesus Ascends into Heaven', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Science', title: 'Lesson 1: Measurement: Metric and Standard Measurements', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Science', title: 'Lesson 2: Weight and Mass', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'History & Geography', title: 'Lesson 1: Introduction to Decision-Making', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'History & Geography', title: 'Lesson 2: Decision-Making Connections', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Language Arts', title: 'Week 2 Resources', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Language Arts', title: 'Lesson 1: Answering Questions with Predictions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Language Arts', title: 'Lesson 2: Ask and Answer Questions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            
            { subject: 'Math', title: 'Week 2 Resources', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Math', title: 'Lesson 1: Rounding up to Six-Digit Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },
            { subject: 'Math', title: 'Lesson 2: Writing up to Six-Digit Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-28' },

            // 07/29/25 - Tuesday
            { subject: 'Bible', title: 'Lesson 3: Jesus Ascends into Heaven Activity', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Bible', title: 'Assignment: Jesus Ascends into Heaven', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Bible', title: 'Lesson 4: Jesus Ascends into Heaven Review and Devotion', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Science', title: 'Lesson 3: Volume', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Science', title: 'Assignment: Vocabulary Review Day', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Science', title: 'Lesson 4: Temperature', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'History & Geography', title: 'Lesson 3: Using Media to Make Decisions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'History & Geography', title: 'Lesson 4: Making a Decision', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Language Arts', title: 'Lesson 3: Finding Answers in the Text', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Language Arts', title: 'Lesson 4: Understanding Historical Questions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Language Arts', title: 'Assignment: Narrative Writing Check-in', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            
            { subject: 'Math', title: 'Lesson 3: Identifying Place and Value in up to Six-Digit Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Math', title: 'Lesson 4: Identifying Place and Value in up to Six-Digit Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },
            { subject: 'Math', title: 'Assignment: Place Value Practice', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-29' },

            // 07/30/25 - Wednesday
            { subject: 'Bible', title: 'Quiz: Jesus Ascends to Heaven', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Bible', title: 'Lesson 1: The Holy Spirit Comes at Pentecost', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Bible', title: 'Lesson: Review: The Holy Spirit Comes at Pentecost', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Bible', title: 'Lesson 2: The Holy Spirit Comes at Pentecost Activity and Devotion', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Science', title: 'Lesson 5: Measurement Activity', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Science', title: 'Assignment: How Tall Are You?', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Science', title: 'Lesson 1: Simple Machines', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Science', title: 'Lesson 2: Compound Machines', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'History & Geography', title: 'Assignment: Making a Decision', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'History & Geography', title: 'Lesson 1: Understanding Historical Sources', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'History & Geography', title: 'Lesson 2: A Primary Source', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Language Arts', title: 'Lesson 5: Narrative Writing Spelling', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Language Arts', title: 'Quiz: Ask and Answer Questions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Language Arts', title: 'Lesson 1: Making Predictions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Language Arts', title: 'Lesson 2: Making Predictions on Fiction', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Language Arts', title: 'Lesson 3: Identifying the Main Conflict', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Language Arts', title: 'Lesson 3: Identifying the Resolution', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            
            { subject: 'Math', title: 'Quiz: Place Value - Up to Six-Digit Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Math', title: 'Lesson 1: Comparing Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },
            { subject: 'Math', title: 'Lesson 2: Comparing Numbers Using a Place Value Chart', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-30' },

            // 07/31/25 - Thursday
            { subject: 'Bible', title: 'Lesson 3: The Apostles Set Out on the Great Commission', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Bible', title: 'Lesson 4: The Apostles Set Out on the Great Commission Story and Activity', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Science', title: 'Lesson 3: Create a Simple or Compound Machine', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Science', title: 'Assignment: Create a Simple or Compound Machine', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'History & Geography', title: 'Lesson 3: A Secondary Source', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'History & Geography', title: 'Lesson 4: Primary and Secondary Sources Review', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Language Arts', title: 'Lesson 4: Making Predictions', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Language Arts', title: 'Lesson 5: Review', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Language Arts', title: 'Lesson 6: Module One Review', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Language Arts', title: 'Assignment: Make a Copy of Module One Review', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            
            { subject: 'Math', title: 'Lesson 3: Ordering Numbers from Least to Greatest', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' },
            { subject: 'Math', title: 'Assignment: Ordering Numbers', link: 'https://www.liberty.edu/online-academy/current-students/', dueDate: '2025-07-31' }

            // Note: 08/01/25 - Friday was not included in the provided schedule data for Noelani
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

console.log('📅 Week 1 Schedule loaded - Elijah: 67 assignments across 5 days');