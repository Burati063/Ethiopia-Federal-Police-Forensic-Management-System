document.addEventListener('DOMContentLoaded', function() {
    const statusButtons = document.querySelectorAll('.status-btn');
    const searchInput = document.querySelector('.search-report input');
    const navbarSearch = document.querySelector('.search-input');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const contentArea = document.querySelector('.content');
    const reportsGrid = document.querySelector('.reports-grid');

    let reportsData = [];

    // Fetch reports data from JSON
    fetch('reports.json')
        .then(response => response.json())
        .then(data => {
            reportsData = data;
            renderReports(reportsData);
        })
        .catch(error => console.error('Error loading reports data:', error));

    // Render reports to the DOM
    function renderReports(reports) {
        reportsGrid.innerHTML = '';
        reports.forEach(report => {
            const card = document.createElement('div');
            card.classList.add('report-card');
            card.setAttribute('data-status', report.status);

            card.innerHTML = `
                <div class="report-header">
                    <div class="report-title">${report.title}</div>
                    <div class="report-id">${report.id} <span class="investigator">${report.investigator}</span></div>
                </div>
                <div class="report-body">
                    <div class="department">Department: ${report.department}</div>
                    <div class="findings">
                        <h4>Findings:</h4>
                        <p>${report.findings}</p>
                    </div>
                    <div class="conclusion">
                        <h4>Conclusion:</h4>
                        <p>${report.conclusion}</p>
                    </div>
                    <a href="#" class="view-details">View Details</a>
                </div>
                <div class="report-footer">
                    <div class="submission-date">Submitted: ${report.submissionDate}${report.reviewedBy ? `<br>Reviewed by ${report.reviewedBy} on ${report.reviewDate}` : ''}</div>
                    <div class="status-badge status-${report.status}">${report.status.charAt(0).toUpperCase() + report.status.slice(1)}</div>
                </div>
            `;
            reportsGrid.appendChild(card);
        });
    }

    // Filter functionality
    function filterReports(status) {
        let filteredReports = status === 'all' ? reportsData : reportsData.filter(r => r.status === status);
        renderReports(filteredReports);
    }

    // Search functionality
    function searchReports(term) {
        term = term.toLowerCase();
        let filteredReports = reportsData.filter(report => {
            return report.title.toLowerCase().includes(term) ||
                   report.id.toLowerCase().includes(term) ||
                   report.investigator.toLowerCase().includes(term);
        });
        renderReports(filteredReports);
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
            statusButtons.forEach(btn => btn.classList.remove('active'));
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
});
