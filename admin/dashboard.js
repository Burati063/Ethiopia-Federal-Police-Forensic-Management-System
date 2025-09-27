document.addEventListener('DOMContentLoaded', function() {
    let dashboardData = null;
    let filteredCases = [];

    // Load dashboard data
    fetch('dashboard.json')
        .then(response => response.json())
        .then(data => {
            dashboardData = data;
            filteredCases = [...data.recentCases];
            updateStats(data.stats);
            populateRecentCasesTable(filteredCases);
            initializeSearch();
        })
        .catch(error => console.error('Error loading dashboard data:', error));

    function updateStats(stats) {
        document.querySelector('.total-cases .stat-value').textContent = stats.totalCases;
        document.querySelector('.pending .stat-value').textContent = stats.pending;
        document.querySelector('.completed .stat-value').textContent = stats.completed;
        document.querySelector('.assigned .stat-value').textContent = stats.assigned;
        document.querySelector('.investigators .stat-value').textContent = stats.activeInvestigators;
    }

    function populateRecentCasesTable(cases) {
        const tbody = document.querySelector('.cases-table tbody');
        tbody.innerHTML = '';

        cases.forEach(caseItem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${caseItem.id}</td>
                <td>${caseItem.description}</td>
                <td>${caseItem.type}</td>
                <td><span class="status-badge ${caseItem.statusClass}">${caseItem.status}</span></td>
                <td><span class="priority-badge ${caseItem.priorityClass}">${caseItem.priority}</span></td>
                <td>${caseItem.assignedTo}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function initializeSearch() {
        const searchInput = document.querySelector('.search-input-container input');
        const filterSelect = document.getElementById('search-filter');

        function applySearch() {
            const searchValue = searchInput.value.toLowerCase();
            const filterValue = filterSelect.value;

            if (!dashboardData) return;

            filteredCases = dashboardData.recentCases.filter(caseItem => {
                let fieldValue = '';
                switch (filterValue) {
                    case 'case-id':
                        fieldValue = caseItem.id.toLowerCase();
                        break;
                    case 'title':
                        fieldValue = caseItem.description.toLowerCase();
                        break;
                    case 'investigator':
                        fieldValue = caseItem.assignedTo.toLowerCase();
                        break;
                    case 'type':
                        fieldValue = caseItem.type.toLowerCase();
                        break;
                    case 'status':
                        fieldValue = caseItem.status.toLowerCase();
                        break;
                    default:
                        fieldValue = `${caseItem.id} ${caseItem.description} ${caseItem.assignedTo} ${caseItem.type} ${caseItem.status}`.toLowerCase();
                }
                return fieldValue.includes(searchValue);
            });

            populateRecentCasesTable(filteredCases);
        }

        searchInput.addEventListener('input', applySearch);
        filterSelect.addEventListener('change', applySearch);
    }
});
