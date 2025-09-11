
// Simple logout functionality
document.querySelector('.logout').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        alert('Logout successful!');
        // In a real application, this would redirect to the login page
        // window.location.href = 'login.html';
    }
});

// Update progress buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const newProgress = prompt('Enter new progress percentage (0-100):');
        if (newProgress !== null && !isNaN(newProgress) && newProgress >= 0 && newProgress <= 100) {
            const progressFill = this.closest('.investigation-card').querySelector('.progress-fill');
            const progressLabel = this.closest('.investigation-card').querySelector('.progress-label span:last-child');
            
            progressFill.style.width = newProgress + '%';
            progressLabel.textContent = newProgress + '%';
            
            alert('Progress updated to ' + newProgress + '%');
        }
    });
});

// Add notes functionality
document.querySelectorAll('.btn-secondary:nth-child(2)').forEach(button => {
    button.addEventListener('click', function() {
        const newNote = prompt('Add your notes:');
        if (newNote !== null && newNote.trim() !== '') {
            const notesSection = this.closest('.investigation-card').querySelector('.latest-notes p');
            notesSection.textContent = newNote;
            
            alert('Notes updated successfully!');
        }
    });
});

// Filter functionality
const statusFilter = document.getElementById('status-filter');
const investigationCards = document.querySelectorAll('.investigation-card');

statusFilter.addEventListener('change', function() {
    const selectedStatus = this.value;
    
    investigationCards.forEach(card => {
        if (selectedStatus === 'all' || card.getAttribute('data-status') === selectedStatus) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
