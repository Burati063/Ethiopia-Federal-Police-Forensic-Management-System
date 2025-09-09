document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const statusButtons = document.querySelectorAll('.status-btn');
    const reportCards = document.querySelectorAll('.report-card');
    const searchInput = document.querySelector('.search-report input');
    const navbarSearch = document.querySelector('.search-input');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const contentArea = document.querySelector('.content');
    
    // Filter functionality
    function filterReports(status) {
        let visibleCount = 0;
        
        reportCards.forEach(card => {
            const cardStatus = card.getAttribute('data-status');
            
            if (status === 'all' || cardStatus === status) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Search functionality
    function searchReports(term) {
        term = term.toLowerCase();
        
        reportCards.forEach(card => {
            const title = card.querySelector('.report-title').textContent.toLowerCase();
            const id = card.querySelector('.report-id').textContent.toLowerCase();
            const investigator = card.querySelector('.investigator').textContent.toLowerCase();
            
            if (title.includes(term) || id.includes(term) || investigator.includes(term)) {
                card.style.display = 'block';
            } else if (term === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Scroll to top functionality
    function toggleScrollToTopButton() {
        if (contentArea.scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    function scrollToTop() {
        contentArea.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add event listeners to status buttons
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            statusButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const status = this.classList.contains('all') ? 'all' :
                          this.classList.contains('completed') ? 'completed' :
                          this.classList.contains('review') ? 'review' : 'progress';
            
            filterReports(status);
        });
    });
    
    // Add event listener to search input
    searchInput.addEventListener('input', function() {
        searchReports(this.value);
    });
    
    // Add event listener to navbar search
    navbarSearch.addEventListener('input', function() {
        searchReports(this.value);
    });
    
    // Add event listener for scroll
    contentArea.addEventListener('scroll', toggleScrollToTopButton);
    
    // Add event listener to scroll to top button
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Initialize with all reports visible
    filterReports('all');
    
    // Force scrollbar to appear by adding more content if needed
    setTimeout(() => {
        if (contentArea.scrollHeight <= contentArea.clientHeight) {
            // Add a spacer to ensure scrollbar appears
            const spacer = document.createElement('div');
            spacer.style.height = '10px';
            document.querySelector('.reports-grid').appendChild(spacer);
        }
    }, 100);
});