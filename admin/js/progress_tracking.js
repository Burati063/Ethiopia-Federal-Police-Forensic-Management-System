document.addEventListener('DOMContentLoaded', function() {
    let currentData = null;
    let currentCaseIndex = 0; // Default to first case

    // Load progress tracking data
    fetch('../json/progress_tracking.json')
        .then(response => response.json())
        .then(data => {
            currentData = data;
            updateStats(data.stats);
            displayCaseDetails(data.cases[0]); // Display first case by default
            initializeFilters();
        })
        .catch(error => console.error('Error loading progress data:', error));

    function updateStats(stats) {
        document.querySelector('.active-cases .stat-value').textContent = stats.activeCases;
        document.querySelector('.in-progress .stat-value').textContent = stats.inProgress;
        document.querySelector('.completed .stat-value').textContent = stats.completed;
        document.querySelector('.overdue .stat-value').textContent = stats.overdue;
    }

    function displayCaseDetails(caseData) {
        // Update case header
        document.querySelector('.case-header h2').textContent = `${caseData.id}: ${caseData.title}`;
        document.querySelector('.case-id').textContent = `Case ID: ${caseData.id}`;

        // Update investigator info
        document.querySelector('.investigator-name').textContent = caseData.investigator;
        document.querySelector('.investigator-department').textContent = caseData.department;
        document.querySelector('.expected-date').textContent = `Expected: ${caseData.expectedDate}`;

        // Update progress section
        document.querySelector('.current-stage').textContent = `Current Stage: ${caseData.currentStage}`;
        document.querySelector('.progress-fill').style.width = `${caseData.progressPercentage}%`;
        document.querySelector('.progress-percentage').textContent = `${caseData.progressPercentage}%`;
        document.querySelector('.progress-status').textContent = caseData.progressStatus;

        // Populate timeline
        const timelineContainer = document.querySelector('.timeline');
        timelineContainer.innerHTML = ''; // Clear existing

        caseData.timeline.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${item.status}`;
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-title">${item.title}</div>
                    <div class="timeline-by">By ${item.by}</div>
                    <div class="timeline-date">${item.date}</div>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        });
    }

    function initializeFilters() {
        const searchInput = document.querySelector('.search-input-container input');
        const statusFilter = document.querySelector('.status-filter');

        function applyFilters() {
            const searchValue = searchInput.value.toLowerCase();
            const statusValue = statusFilter.value;

            if (!currentData) return;

            let filteredCases = currentData.cases.filter(caseItem => {
                const matchesSearch = caseItem.id.toLowerCase().includes(searchValue) ||
                                     caseItem.title.toLowerCase().includes(searchValue) ||
                                     caseItem.investigator.toLowerCase().includes(searchValue);
                const matchesStatus = statusValue === 'all' || 
                                     (statusValue === 'active' && caseItem.progressStatus === 'IN LAB') ||
                                     (statusValue === 'in-progress' && caseItem.progressStatus === 'IN PROGRESS') ||
                                     (statusValue === 'completed' && caseItem.progressPercentage === 100) ||
                                     (statusValue === 'overdue' && caseItem.expectedDate < new Date().toLocaleDateString());
                return matchesSearch && matchesStatus;
            });

            if (filteredCases.length > 0) {
                // Display the first matching case
                displayCaseDetails(filteredCases[0]);
                currentCaseIndex = currentData.cases.indexOf(filteredCases[0]);
            } else {
                // If no match, show first case or clear
                if (currentData.cases.length > 0) {
                    displayCaseDetails(currentData.cases[0]);
                }
            }
        }

        // Event listeners
        searchInput.addEventListener('input', applyFilters);
        statusFilter.addEventListener('change', applyFilters);
    }
});
