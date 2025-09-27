document.addEventListener('DOMContentLoaded', function() {
    // Load reports data and populate grid
    fetch('reports.json')
        .then(response => response.json())
        .then(reports => {
            populateReportsGrid(reports);
        })
        .catch(error => console.error('Error loading reports:', error));

    function populateReportsGrid(reports) {
        const grid = document.querySelector('.reports-grid');
        grid.innerHTML = ''; // Clear existing cards

        reports.forEach(report => {
            const card = document.createElement('div');
            card.className = 'report-card';
            card.setAttribute('data-status', report.status.toLowerCase().replace(/\s+/g, '-').replace('in-progress', 'progress').replace('under-review', 'review'));

            // Map status display text to badge class
            let badgeClass = report.statusClass.toLowerCase().replace(/\s+/g, '-');
            let statusText = report.status;
            if (report.status === 'IN PROGRESS') {
                statusText = 'In Progress';
                badgeClass = 'status-progress';
            }

            card.innerHTML = `
                <div class="report-header">
                    <div class="report-title">${report.title}</div>
                    <div class="report-id">${report.id} <span class="investigator">${report.investigator}</span></div>
                </div>
                <div class="report-body">
                    <div class="department">${report.department}</div>
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
                    <div class="submission-date">${report.submissionDate}</div>
                    <div class="status-badge ${badgeClass}">${statusText}</div>
                </div>
            `;

            grid.appendChild(card);
        });

        // Initialize filters after population
        initializeFilters();
    }

    function initializeFilters() {
        const searchInput = document.querySelector('.search-report input');
        const statusButtons = document.querySelectorAll('.status-btn');

        function applyFilters() {
            const searchValue = searchInput.value.toLowerCase();
            const activeStatus = document.querySelector('.status-btn.active').classList[1]; // e.g., 'all', 'completed'
            const cards = document.querySelectorAll('.report-card');

            cards.forEach(card => {
                const title = card.querySelector('.report-title').textContent.toLowerCase();
                const id = card.querySelector('.report-id').textContent.toLowerCase();
                const investigator = card.querySelector('.investigator').textContent.toLowerCase();
                const status = card.getAttribute('data-status');

                const searchMatch = title.includes(searchValue) || 
                                   id.includes(searchValue) || 
                                   investigator.includes(searchValue);

                let statusMatch = true;
                if (activeStatus !== 'all') {
                    statusMatch = status.includes(activeStatus);
                }

                if (searchMatch && statusMatch) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Search input
        searchInput.addEventListener('input', applyFilters);

        // Status buttons
        statusButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                statusButtons.forEach(btn => btn.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');
                applyFilters();
            });
        });
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
