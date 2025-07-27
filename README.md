# 🍓 RaisingBerries
**Your Enhanced Family Homeschool Hub**

A comprehensive, web-based dashboard designed specifically for homeschooling families to manage curriculum, track progress, and enhance learning experiences. Built with modern web technologies and a focus on usability for both parents and students.

![RaisingBerries Dashboard](https://img.shields.io/badge/Status-Active-green) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

### 🎯 **Core Dashboard**
- **Multi-student support** - Separate dashboards for Elijah, Kai, and Noelani
- **Beautiful UI** - Modern gradient design with responsive layout
- **Daily verse integration** - Inspirational Bible verses with reflections
- **Real-time progress tracking** - Visual progress bars and completion statistics

### 📚 **Curriculum Management**
- **Excel curriculum import** - Direct integration with Liberty University curriculum files
- **247-day curriculum support** - Full academic year planning
- **Subject-based organization** - Color-coded subjects with icons
- **Weekly planning tools** - Bulk assignment import and organization

### 🎴 **Interactive Learning Tools**
- **Flashcard System** - Create, study, and track flashcard progress
- **Notes Management** - Rich note-taking with categories and search
- **Progress Analytics** - Detailed statistics and completion tracking
- **Assignment Management** - Due dates, priorities, and completion tracking

### 👩‍💼 **Parent Admin Features**
- **Weekly planner** - Bulk assignment creation and scheduling
- **Curriculum browser** - Visual navigation through entire curriculum
- **Data import/export** - Backup and restore functionality
- **Analytics dashboard** - Family-wide progress overview

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Live Server, Python, or similar)
- Your curriculum Excel files (optional)

### Installation

1. **Clone or download** the project files
```bash
git clone [your-repo-url]
cd RaisingBerries
```

2. **Organize your curriculum files** (optional)
```
data/curriculum/
├── elijah/elijah_schedule_final.xlsx
├── kai/KAI_schedule_final.xlsx
└── noelani/noelani_schedule_final.xlsx
```

3. **Start a local server**
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have live-server)
npx live-server

# Or use VS Code Live Server extension
```

4. **Open in browser**
Navigate to `http://localhost:8000` (or your server URL)

### First Run
1. The dashboard loads with default student data
2. Click student tabs to explore individual dashboards
3. Go to **Admin** tab to import curriculum or add assignments
4. Start using flashcards, notes, and other learning tools

## 📁 Project Structure

```
RaisingBerries/
├── index.html                 # Main dashboard page
├── README.md                  # This file
├── 
├── css/                       # Stylesheets
│   ├── main.css              # Core dashboard styles
│   └── components.css        # Component-specific styles
│
├── styles/                    # Additional styles
│   └── responsive.css        # Mobile-responsive design
│
├── js/                       # JavaScript modules
│   ├── app.js               # Main application controller
│   ├── data.js              # Data management system
│   │
│   ├── charts/              # Utility functions
│   │   └── utils.js
│   │
│   ├── management/          # Assignment and planning
│   │   ├── assignments.js   # Assignment management
│   │   └── weekly-planner.js # Weekly planning tools
│   │
│   ├── operations/          # Core features
│   │   ├── analytics.js     # Progress analytics
│   │   ├── calendar.js      # Calendar integration
│   │   ├── curriculum-importer.js # Excel curriculum import
│   │   ├── flashcards.js    # Flashcard system
│   │   └── notes.js         # Note-taking system
│   │
│   └── students/            # Student configurations
│       ├── elijah.js        # Elijah's subjects and settings
│       ├── kai.js           # Kai's subjects and settings
│       └── noelani.js       # Noelani's subjects and settings
│
└── data/                    # Curriculum and data files
    └── curriculum/          # Excel curriculum files
        ├── elijah/
        ├── kai/
        └── noelani/
```

## 🎯 Student Profiles

### Elijah (9th Grade)
- **7 subjects:** Bible, Earth Science, History & Geography, English, Algebra, PE, Academic & Career Success
- **Interface:** Subject tile layout with visual progress tracking
- **Curriculum:** 247-day Liberty University Online Academy schedule

### Kai (7th Grade)
- **5 subjects:** Mathematics, Science, English, History, Bible Studies
- **Interface:** Assignment list with completion tracking
- **Curriculum:** Grade-appropriate assignments and activities

### Noelani (3rd Grade - Accelerated)
- **5 subjects:** English Language Arts, Mathematics, Science, Bible Studies, Social Studies
- **Interface:** Simplified assignment view with visual feedback
- **Schedule:** 31-week accelerated program (July 2025 - March 2026)

## 🛠️ Core Systems

### Data Management
- **Local storage** using sessionStorage for persistence
- **JSON export/import** for data backup and transfer
- **Automatic saving** every 30 seconds
- **Data validation** and error recovery

### Curriculum Import
- **Excel file parsing** using SheetJS library
- **Automatic assignment extraction** from structured curriculum files
- **Date-based scheduling** with weekday distribution
- **Subject mapping** and categorization

### Progress Tracking
- **Completion percentages** by student and subject
- **Streak tracking** for motivation
- **Due date monitoring** with overdue alerts
- **Analytics dashboard** with family overview

## 📚 Usage Guide

### For Students

#### Daily Use
1. **Check your dashboard** - See today's assignments and progress
2. **Complete assignments** - Click to mark tasks as done
3. **Study with flashcards** - Review and practice key concepts
4. **Take notes** - Capture important information and insights

#### Study Tools
- **Flashcards:** Create custom study cards, track known/unknown status
- **Notes:** Organize thoughts by subject with search and categorization
- **Progress:** View completion rates and achievement streaks

### For Parents/Teachers

#### Weekly Planning
1. **Go to Admin tab** → **Weekly Planner**
2. **Select student and week** you want to plan
3. **Choose method:**
   - **Import from curriculum:** Automatically load from Excel files
   - **Manual entry:** Type assignments directly
   - **Mix both:** Import base curriculum and add custom assignments

#### Curriculum Management
1. **Admin tab** → **Browse Curriculum**
2. **Navigate by day/week** to see planned lessons
3. **Import entire weeks** with one click
4. **Customize assignments** as needed

#### Analytics & Progress
1. **Analytics tab** - View family-wide progress
2. **Individual dashboards** - Monitor each student's performance
3. **Export data** - Backup progress and assignments

## 🎨 Customization

### Adding New Students
1. Create new student config file: `js/students/newstudent.js`
2. Add student data to `js/data.js`
3. Update navigation tabs in `index.html`

### Modifying Subjects
Edit student configuration files to:
- Add/remove subjects
- Change subject colors and icons
- Adjust weekly goals and requirements

### Custom Styling
- Modify `css/main.css` for core appearance
- Update `styles/responsive.css` for mobile layouts
- Add custom CSS variables in `:root` for theme changes

## 🔧 Technical Details

### Dependencies
- **SheetJS (XLSX)** - Excel file parsing for curriculum import
- **Modern JavaScript (ES6+)** - Classes, modules, async/await
- **CSS Grid/Flexbox** - Responsive layout system
- **Local Storage API** - Data persistence

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance
- **Lazy loading** - Systems initialize only when needed
- **Efficient DOM updates** - Minimal reflows and repaints
- **Local data storage** - No external database dependencies
- **Responsive design** - Works on desktop, tablet, and mobile

## 📱 Mobile Support

The dashboard is fully responsive and includes:
- **Touch-friendly interface** - Large buttons and touch targets
- **Collapsible navigation** - Optimized for small screens
- **Readable text** - Appropriate font sizes and contrast
- **Offline functionality** - Works without internet connection

## 🔒 Privacy & Security

- **No external servers** - All data stored locally
- **No user tracking** - No analytics or cookies
- **Offline operation** - Works completely offline
- **Data ownership** - You control all your data

## 🆘 Troubleshooting

### Common Issues

**Dashboard won't load**
- Check browser console (F12) for errors
- Ensure all files are in correct locations
- Try refreshing the page (Ctrl+F5)

**Curriculum import fails**
- Verify Excel file format matches expected structure
- Check file paths in `data/curriculum/` folder
- Ensure XLSX library loaded (check Network tab)

**Data not saving**
- Check if localStorage is enabled in browser
- Verify no browser extensions blocking storage
- Try clearing browser cache and reloading

**Missing functionality**
- Check console for JavaScript errors
- Verify all script files loaded correctly
- Ensure proper file structure and naming

### Support

For technical issues:
1. Check browser console for error messages
2. Verify file structure matches documentation
3. Try the diagnostic tools in Admin panel
4. Clear browser cache and reload

## 🚀 Future Enhancements

### Planned Features
- **Calendar integration** - Google Calendar sync
- **Report generation** - Printable progress reports
- **Multi-year planning** - Long-term curriculum tracking
- **Parent notifications** - Email/SMS progress updates
- **Gradebook integration** - Grade tracking and GPA calculation

### Possible Extensions
- **Mobile app** - Native iOS/Android applications
- **Cloud sync** - Optional cloud backup and sync
- **Multi-family support** - Shared resources and collaboration
- **Advanced analytics** - Machine learning insights

## 📄 License

This project is intended for personal and educational use. Please respect curriculum provider terms of service when using with commercial educational content.

## 🤝 Contributing

This is a personal homeschool project, but ideas and suggestions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Share customizations
- Provide feedback on usability

## 📞 Contact

Created with ❤️ for the homeschool community.

---

**Happy Learning! 🍓📚**

*"Train up a child in the way he should go, and when he is old he will not depart from it." - Proverbs 22:6*