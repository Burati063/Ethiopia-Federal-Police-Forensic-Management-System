   // Simple logout functionality
   document.querySelector('.logout').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        alert('Logout successful!');
        // In a real application, this would redirect to the login page
        // window.location.href = 'login.html';
    }
});

// Filter functionality
const statusFilter = document.getElementById('status-filter');
const resultCards = document.querySelectorAll('.lab-result-card');

statusFilter.addEventListener('change', function() {
    const selectedStatus = this.value;
    
    resultCards.forEach(card => {
        const cardStatus = card.querySelector('.result-status').textContent.toLowerCase().replace(' ', '-');
        
        if (selectedStatus === 'all' || cardStatus === selectedStatus) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Download report functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const cardTitle = this.closest('.lab-result-card').querySelector('.result-title').textContent;
        alert(`Downloading report for: ${cardTitle}`);
        // In a real application, this would trigger a file download
    });
});

// Modal functionality
const modal = document.getElementById('detail-modal');
const viewDetailButtons = document.querySelectorAll('.view-details-btn');
const closeModalButtons = document.querySelectorAll('.close-modal, .close-modal-btn');

viewDetailButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.lab-result-card');
        const title = card.querySelector('.result-title').textContent;
        const status = card.querySelector('.result-status').textContent;
        const description = card.querySelector('.result-description p').textContent;
        const conclusion = card.querySelector('.conclusion-text').textContent;
        
        // Extract metadata
        const metaItems = card.querySelectorAll('.meta-item');
        const investigator = metaItems[0].querySelector('.meta-value').textContent;
        const submitted = metaItems[1].querySelector('.meta-value').textContent;
        const attachments = metaItems[2].querySelector('.meta-value').textContent;
        const signatures = metaItems[3].querySelector('.meta-value').textContent;
        
        // Populate modal
        document.getElementById('modal-case-id').textContent = title.split(' - ')[0];
        document.getElementById('modal-analysis-type').textContent = title.split(' - ')[1];
        document.getElementById('modal-status').textContent = status;
        document.getElementById('modal-investigator').textContent = investigator;
        document.getElementById('modal-submitted').textContent = submitted;
        document.getElementById('modal-attachments').textContent = attachments;
        document.getElementById('modal-signatures').textContent = signatures;
        document.getElementById('modal-description').textContent = description;
        document.getElementById('modal-conclusion').textContent = conclusion;
        
        // Show modal
        modal.style.display = 'flex';
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
        modal.style.display = 'none';
    });
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
