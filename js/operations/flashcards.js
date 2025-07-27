/**
 * RaisingBerries - Simple Flashcard System
 * Clean, functional flashcard creation and study
 */

class FlashcardSystem {
    constructor() {
        this.currentStudent = null;
        this.currentCardIndex = 0;
        this.isFlipped = false;
        this.currentDeck = [];
    }

    /**
     * Initialize flashcard system
     */
    init() {
        console.log('🎴 Flashcard System ready');
        return true;
    }

    /**
     * Open flashcards for student
     */
    open(studentId) {
        this.currentStudent = studentId;
        this.currentCardIndex = 0;
        this.isFlipped = false;
        
        const modal = this.createFlashcardModal();
        document.body.appendChild(modal);
        modal.classList.add('active');
        
        this.loadStudentCards();
        this.updateDisplay();
        this.setupKeyboardShortcuts();
    }

    /**
     * Create flashcard modal
     */
    createFlashcardModal() {
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
            <div class="modal-content" style="max-width: 600px; max-height: 85vh; overflow: visible;">
                <button class="close-btn" onclick="this.closest('.modal').remove(); window.FlashcardSystem.removeKeyboardShortcuts();">&times;</button>
                <h2>🎴 ${studentName}'s Flashcards</h2>
                
                <!-- Add New Card -->
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                    <h3>Add New Flashcard</h3>
                    <div style="display: grid; gap: 10px; margin-top: 15px;">
                        <input type="text" id="wordInput" placeholder="Word/Question" style="padding: 10px; border: 2px solid #ddd; border-radius: 5px;">
                        <input type="text" id="definitionInput" placeholder="Definition/Answer" style="padding: 10px; border: 2px solid #ddd; border-radius: 5px;">
                        <select id="subjectInput" style="padding: 10px; border: 2px solid #ddd; border-radius: 5px;">
                            <option value="General">General</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                            <option value="English">English</option>
                            <option value="Bible">Bible</option>
                            <option value="Language Arts">Language Arts</option>
                            <option value="Earth Science">Earth Science</option>
                            <option value="Algebra">Algebra</option>
                        </select>
                        <button class="btn btn-primary" onclick="window.FlashcardSystem.addCard()">Add Flashcard</button>
                    </div>
                </div>

                <!-- Study Controls -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <button class="btn btn-secondary" onclick="window.FlashcardSystem.prevCard()">← Previous</button>
                    <button class="btn btn-primary" onclick="window.FlashcardSystem.flipCard()" style="margin: 0 10px;">Flip Card</button>
                    <button class="btn btn-secondary" onclick="window.FlashcardSystem.nextCard()">Next →</button>
                </div>

                <!-- Flashcard Display -->
                <div id="flashcardDisplay" class="flashcard" onclick="window.FlashcardSystem.flipCard()" style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 15px;
                    padding: 40px 20px;
                    min-height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    margin-bottom: 20px;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                ">
                    <div class="flashcard-text" style="color: white; font-size: 1.5em; font-weight: 600; text-align: center; line-height: 1.4;">
                        Loading flashcards...
                    </div>
                </div>

                <!-- Card Info -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <p>Card <span id="cardCounter">0</span> of <span id="totalCards">0</span></p>
                    <div id="cardSubject" style="margin-top: 5px; font-size: 0.9em; color: #666;"></div>
                </div>

                <!-- Study Actions -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <button class="btn btn-success" onclick="window.FlashcardSystem.markKnown()" style="margin: 0 5px;">✓ Know It</button>
                    <button class="btn btn-warning" onclick="window.FlashcardSystem.markReview()" style="margin: 0 5px;">? Review</button>
                    <button class="btn btn-danger" onclick="window.FlashcardSystem.markUnknown()" style="margin: 0 5px;">✗ Don't Know</button>
                </div>

                <!-- Stats -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 15px; text-align: center;">
                        <div>
                            <div style="font-size: 1.5em; font-weight: 700; color: #00b894;" id="knownCount">0</div>
                            <div style="font-size: 0.8em; color: #666;">Known</div>
                        </div>
                        <div>
                            <div style="font-size: 1.5em; font-weight: 700; color: #fdcb6e;" id="reviewCount">0</div>
                            <div style="font-size: 0.8em; color: #666;">Review</div>
                        </div>
                        <div>
                            <div style="font-size: 1.5em; font-weight: 700; color: #e17055;" id="unknownCount">0</div>
                            <div style="font-size: 0.8em; color: #666;">Unknown</div>
                        </div>
                        <div>
                            <div style="font-size: 1.5em; font-weight: 700; color: #667eea;" id="totalCount">0</div>
                            <div style="font-size: 0.8em; color: #666;">Total</div>
                        </div>
                    </div>
                </div>

                <!-- Additional Actions -->
                <div style="text-align: center; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-secondary" onclick="window.FlashcardSystem.shuffleCards()">🔀 Shuffle</button>
                    <button class="btn btn-secondary" onclick="window.FlashcardSystem.resetProgress()">🔄 Reset Progress</button>
                    <button class="btn btn-danger" onclick="window.FlashcardSystem.deleteCard()" id="deleteBtn" style="display: none;">🗑️ Delete</button>
                </div>

                <!-- Keyboard Shortcuts Help -->
                <div style="margin-top: 20px; padding: 10px; background: #e3f2fd; border-radius: 5px; font-size: 0.9em;">
                    <strong>Keyboard Shortcuts:</strong> Space/Enter = Flip, ← → = Navigate, 1 = Know, 2 = Review, 3 = Unknown, Esc = Close
                </div>
            </div>
        `;

        return modal;
    }

    /**
     * Load flashcards for current student
     */
    loadStudentCards() {
        const dm = window.DataManager;
        const student = dm ? dm.getStudent(this.currentStudent) : null;
        
        if (!student) {
            this.currentDeck = [];
            return;
        }

        // Ensure flashcards array exists
        if (!student.flashcards) {
            student.flashcards = [];
        }

        this.currentDeck = [...student.flashcards];
        console.log(`📚 Loaded ${this.currentDeck.length} flashcards for ${student.name}`);
    }

    /**
     * Update display
     */
    updateDisplay() {
        this.updateCardDisplay();
        this.updateCardInfo();
        this.updateStats();
        this.updateDeleteButton();
    }

    /**
     * Update card display
     */
    updateCardDisplay() {
        const display = document.getElementById('flashcardDisplay');
        if (!display) return;

        if (this.currentDeck.length === 0) {
            display.innerHTML = `
                <div class="flashcard-text" style="color: white; font-size: 1.2em; text-align: center;">
                    No flashcards yet!<br>Add some using the form above.
                </div>
            `;
            display.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';
            return;
        }

        const card = this.currentDeck[this.currentCardIndex];
        const text = this.isFlipped ? card.definition : card.word;
        const color = this.isFlipped ? 
            'linear-gradient(135deg, #10b981, #059669)' : 
            'linear-gradient(135deg, #667eea, #764ba2)';
        
        display.innerHTML = `
            <div class="flashcard-text" style="color: white; font-size: 1.5em; font-weight: 600; text-align: center; line-height: 1.4;">
                ${this.escapeHtml(text)}
            </div>
        `;
        display.style.background = color;
    }

    /**
     * Update card info
     */
    updateCardInfo() {
        const counter = document.getElementById('cardCounter');
        const total = document.getElementById('totalCards');
        const subject = document.getElementById('cardSubject');

        if (counter) counter.textContent = this.currentDeck.length > 0 ? this.currentCardIndex + 1 : 0;
        if (total) total.textContent = this.currentDeck.length;

        if (subject && this.currentDeck.length > 0) {
            const card = this.currentDeck[this.currentCardIndex];
            const status = card.status || 'unknown';
            const statusEmoji = { known: '✅', review: '🔄', unknown: '❓' };
            subject.textContent = `${card.subject || 'General'} • ${statusEmoji[status] || '❓'} ${status}`;
        } else if (subject) {
            subject.textContent = '';
        }
    }

    /**
     * Update statistics
     */
    updateStats() {
        const stats = { known: 0, review: 0, unknown: 0, total: this.currentDeck.length };
        
        this.currentDeck.forEach(card => {
            const status = card.status || 'unknown';
            if (stats[status] !== undefined) {
                stats[status]++;
            } else {
                stats.unknown++;
            }
        });

        // Update display
        const elements = ['knownCount', 'reviewCount', 'unknownCount', 'totalCount'];
        const values = [stats.known, stats.review, stats.unknown, stats.total];
        
        elements.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) element.textContent = values[index];
        });
    }

    /**
     * Update delete button
     */
    updateDeleteButton() {
        const deleteBtn = document.getElementById('deleteBtn');
        if (deleteBtn) {
            deleteBtn.style.display = this.currentDeck.length > 0 ? 'inline-block' : 'none';
        }
    }

    /**
     * Add new flashcard
     */
    addCard() {
        console.log('🎴 Adding new flashcard...');
        
        const wordInput = document.getElementById('wordInput');
        const definitionInput = document.getElementById('definitionInput');
        const subjectInput = document.getElementById('subjectInput');

        if (!wordInput || !definitionInput || !subjectInput) {
            console.error('Input elements not found');
            this.showNotification('Error: Input fields not found', 'error');
            return;
        }

        const word = wordInput.value.trim();
        const definition = definitionInput.value.trim();
        const subject = subjectInput.value;

        console.log('Input values:', { word, definition, subject });

        if (!word || !definition) {
            this.showNotification('Please enter both word and definition', 'warning');
            return;
        }

        const dm = window.DataManager;
        if (!dm) {
            console.error('DataManager not available');
            this.showNotification('Error: DataManager not available', 'error');
            return;
        }

        const newCard = {
            word,
            definition,
            subject,
            status: 'unknown',
            created: new Date().toISOString()
        };

        console.log('Creating new card:', newCard);

        // Add to DataManager
        if (dm.addFlashcard(this.currentStudent, newCard)) {
            console.log('✅ Flashcard added successfully');
            
            // Clear form
            wordInput.value = '';
            definitionInput.value = '';
            subjectInput.value = 'General';

            // Reload and update
            this.loadStudentCards();
            
            // Set current card to the new one
            this.currentCardIndex = this.currentDeck.length - 1;
            this.isFlipped = false;
            
            this.updateDisplay();
            this.showNotification('Flashcard added! 🎉', 'success');
        } else {
            console.error('Failed to add flashcard to DataManager');
            this.showNotification('Failed to add flashcard', 'error');
        }
    }

    /**
     * Flip card
     */
    flipCard() {
        if (this.currentDeck.length === 0) {
            this.showNotification('No cards to flip! Add some flashcards first.', 'info');
            return;
        }
        
        this.isFlipped = !this.isFlipped;
        this.updateCardDisplay();
        console.log(`Card flipped: ${this.isFlipped ? 'showing definition' : 'showing word'}`);
    }

    /**
     * Next card
     */
    nextCard() {
        if (this.currentDeck.length === 0) {
            this.showNotification('No cards available! Add some flashcards first.', 'info');
            return;
        }
        
        this.currentCardIndex = (this.currentCardIndex + 1) % this.currentDeck.length;
        this.isFlipped = false;
        this.updateDisplay();
        console.log(`Next card: ${this.currentCardIndex + 1}/${this.currentDeck.length}`);
    }

    /**
     * Previous card
     */
    prevCard() {
        if (this.currentDeck.length === 0) {
            this.showNotification('No cards available! Add some flashcards first.', 'info');
            return;
        }
        
        this.currentCardIndex = this.currentCardIndex === 0 ? 
            this.currentDeck.length - 1 : 
            this.currentCardIndex - 1;
        this.isFlipped = false;
        this.updateDisplay();
        console.log(`Previous card: ${this.currentCardIndex + 1}/${this.currentDeck.length}`);
    }

    /**
     * Mark card status
     */
    markKnown() { this.markCard('known'); }
    markReview() { this.markCard('review'); }
    markUnknown() { this.markCard('unknown'); }

    markCard(status) {
        if (this.currentDeck.length === 0) {
            this.showNotification('No cards to mark! Add some flashcards first.', 'info');
            return;
        }

        const card = this.currentDeck[this.currentCardIndex];
        const oldStatus = card.status;
        card.status = status;
        card.lastReviewed = new Date().toISOString();

        console.log(`Marking card "${card.word}" as ${status} (was ${oldStatus})`);

        // Save to DataManager
        const dm = window.DataManager;
        const student = dm ? dm.getStudent(this.currentStudent) : null;
        if (student) {
            const cardIndex = student.flashcards.findIndex(c => 
                c.word === card.word && c.definition === card.definition
            );
            if (cardIndex >= 0) {
                student.flashcards[cardIndex] = { ...card };
                dm.saveData();
                console.log('Card status saved to DataManager');
            }
        }

        this.updateDisplay();
        
        const statusEmoji = { known: '✅', review: '🔄', unknown: '❓' };
        this.showNotification(`${statusEmoji[status]} Marked as ${status}`, 'success');
        
        // Auto-advance to next card after a short delay
        setTimeout(() => {
            if (this.currentDeck.length > 1) {
                this.nextCard();
            }
        }, 800);
    }

    /**
     * Shuffle cards
     */
    shuffleCards() {
        if (this.currentDeck.length <= 1) {
            this.showNotification('Need at least 2 cards to shuffle', 'info');
            return;
        }

        // Fisher-Yates shuffle
        for (let i = this.currentDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.currentDeck[i], this.currentDeck[j]] = [this.currentDeck[j], this.currentDeck[i]];
        }
        
        this.currentCardIndex = 0;
        this.isFlipped = false;
        this.updateDisplay();
        this.showNotification('🔀 Cards shuffled!', 'info');
        console.log('Cards shuffled');
    }

    /**
     * Reset progress
     */
    resetProgress() {
        if (this.currentDeck.length === 0) {
            this.showNotification('No cards to reset!', 'info');
            return;
        }

        if (!confirm('Reset all progress? This will mark all cards as unknown.')) return;

        this.currentDeck.forEach(card => {
            card.status = 'unknown';
            card.lastReviewed = null;
        });

        // Save changes to DataManager
        const dm = window.DataManager;
        const student = dm ? dm.getStudent(this.currentStudent) : null;
        if (student && dm) {
            // Update all cards in student data
            student.flashcards.forEach(studentCard => {
                const deckCard = this.currentDeck.find(c => 
                    c.word === studentCard.word && c.definition === studentCard.definition
                );
                if (deckCard) {
                    studentCard.status = 'unknown';
                    studentCard.lastReviewed = null;
                }
            });
            dm.saveData();
        }

        this.updateDisplay();
        this.showNotification('🔄 Progress reset!', 'info');
        console.log('Progress reset for all cards');
    }

    /**
     * Delete current card
     */
    deleteCard() {
        if (this.currentDeck.length === 0) {
            this.showNotification('No cards to delete!', 'info');
            return;
        }
        
        const card = this.currentDeck[this.currentCardIndex];
        if (!confirm(`Delete flashcard "${card.word}"?`)) return;

        console.log(`Deleting card: ${card.word}`);

        const dm = window.DataManager;
        const student = dm ? dm.getStudent(this.currentStudent) : null;
        
        if (student && dm) {
            // Remove from student data
            const initialLength = student.flashcards.length;
            student.flashcards = student.flashcards.filter(c => 
                !(c.word === card.word && c.definition === card.definition)
            );
            
            if (student.flashcards.length < initialLength) {
                dm.saveData();
                console.log('Card deleted from DataManager');
            }
        }

        // Remove from current deck
        this.currentDeck.splice(this.currentCardIndex, 1);
        
        // Adjust index
        if (this.currentCardIndex >= this.currentDeck.length) {
            this.currentCardIndex = Math.max(0, this.currentDeck.length - 1);
        }
        
        this.isFlipped = false;
        this.updateDisplay();
        this.showNotification('🗑️ Flashcard deleted', 'info');
    }

    /**
     * Keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        this.keyboardHandler = (e) => {
            // Only handle if flashcard modal is active
            const modal = document.querySelector('.modal.active');
            if (!modal || !modal.innerHTML.includes('Flashcards')) return;

            switch (e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.flipCard();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevCard();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextCard();
                    break;
                case '1':
                    e.preventDefault();
                    this.markKnown();
                    break;
                case '2':
                    e.preventDefault();
                    this.markReview();
                    break;
                case '3':
                    e.preventDefault();
                    this.markUnknown();
                    break;
                case 'Escape':
                    e.preventDefault();
                    modal.remove();
                    this.removeKeyboardShortcuts();
                    break;
            }
        };

        document.addEventListener('keydown', this.keyboardHandler);
        console.log('Keyboard shortcuts enabled');
    }

    /**
     * Remove keyboard shortcuts
     */
    removeKeyboardShortcuts() {
        if (this.keyboardHandler) {
            document.removeEventListener('keydown', this.keyboardHandler);
            this.keyboardHandler = null;
            console.log('Keyboard shortcuts disabled');
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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
window.FlashcardSystem = new FlashcardSystem();
console.log('🎴 Simple Flashcard System loaded');