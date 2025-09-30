document.addEventListener('DOMContentLoaded', function() {
    const statusFilter = document.querySelector('.status-filter');
    const searchInput = document.querySelector('.search-input-container input');
    const navbarSearch = document.querySelector('.search-input');
    const statsGrid = document.querySelector('.stats-grid');
    const caseHeader = document.querySelector('.case-header h2');
    const caseIdElem = document.querySelector('.case-header .case-id');
    const investigatorName = document.querySelector('.investigator-name');
    const investigatorDepartment = document.querySelector('.investigator-department');
    const expectedDate = document.querySelector('.expected-date');
    const currentStage = document.querySelector('.current-stage');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressStatus = document.querySelector('.progress-status');
    const timelineContainer = document.querySelector('.timeline');

    let progressStats = {};
    let progressTimeline = {};

    // Fetch progress stats
    fetch('progress_stats.json')
        .then(response => response.json())
        .then(data => {
            progressStats = data;
            renderStats();
        })
        .catch(error => console.error('Error loading progress stats:', error));

    // Fetch progress timeline
    fetch('progress_timeline.json')
        .then(response => response.json())
        .then(data => {
            progressTimeline = data;
            renderProgressDetails();
        })
        .catch(error => console.error('Error loading progress timeline:', error));

    function renderStats() {
        statsGrid.querySelector('.active-cases .stat-value').textContent = progressStats.activeCases;
        statsGrid.querySelector('.in-progress .stat-value').textContent = progressStats.inProgress;
        statsGrid.querySelector('.completed .stat-value').textContent = progressStats.completed;
        statsGrid.querySelector('.overdue .stat-value').textContent = progressStats.overdue;
    }

    function renderProgressDetails() {
        caseHeader.textContent = `${progressTimeline.caseId}: ${progressTimeline.caseTitle}`;
        caseIdElem.textContent = `Case ID: ${progressTimeline.caseId}`;
        investigatorName.textContent = progressTimeline.investigator.name;
        investigatorDepartment.textContent = progressTimeline.investigator.department;
        expectedDate.textContent = `Expected: ${progressTimeline.investigator.expectedDate}`;
        currentStage.textContent = `Current Stage: ${progressTimeline.overallProgress.currentStage}`;
        progressFill.style.width = `${progressTimeline.overallProgress.progressPercent}%`;
        progressPercentage.textContent = `${progressTimeline.overallProgress.progressPercent}%`;
        progressStatus.textContent = progressTimeline.overallProgress.progressStatus;

        timelineContainer.innerHTML = '';
        progressTimeline.timeline.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item', item.status);

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

    // Filter functionality
    function filterCases(status) {
        console.log(`Filtering by: ${status}`);
        // Implement filtering logic if needed
    }

    // Search functionality
    function searchCases(term) {
        console.log(`Searching for: ${term}`);
        // Implement search logic if needed
    }

    // Add event listener to status filter
    statusFilter.addEventListener('change', function() {
        filterCases(this.value);
    });

    // Add event listener to search input
    searchInput.addEventListener('input', function() {
        searchCases(this.value);
    });

    // Add event listener to navbar search
    navbarSearch.addEventListener('input', function() {
        searchCases(this.value);
    });
});
