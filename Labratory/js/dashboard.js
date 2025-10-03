
document.addEventListener('DOMContentLoaded', function() {
    let dashboardData = null;
    let filteredCases = [];

    // Load dashboard data
    Promise.all([
        fetch('../json/dashboard.json').then(response => response.json()),
        fetch('../json/cases.json').then(response => response.json())
    ])
    .then(([dashboardDataResponse, casesDataResponse]) => {
        dashboardData = dashboardDataResponse;
        dashboardData.cases = casesDataResponse;
        filteredCases = [...dashboardData.cases];
        updateStats(dashboardData.stats);
        populateCasesTable(filteredCases);
        initializeSearch();
    })
    .catch(error => console.error('Error loading dashboard data:', error));

    function updateStats(stats) {
        document.querySelector('.total-cases .stat-value').textContent = stats.totalCases;
        document.querySelector('.under-investigation .stat-value').textContent = stats.underInvestigation;
        document.querySelector('.assigned .stat-value').textContent = stats.assigned;
        document.querySelector('.completed .stat-value').textContent = stats.completed;
    }

    function populateCasesTable(cases) {
        const tbody = document.querySelector('.cases-table tbody');
        tbody.innerHTML = '';

        cases.forEach(caseItem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${caseItem.id}</td>
                <td>${caseItem.description}</td>
                <td>${caseItem.source}</td>
                <td>${caseItem.type}</td>
                <td>${caseItem.quantity}</td>
                <td><span class="status-badge ${caseItem.statusClass}">${caseItem.status}</span></td>
                <td>
                    <a href="#" class="view-action">
                        <i class="fas fa-eye"></i> View
                    </a>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            filteredCases = dashboardData.cases.filter(caseItem => {
                const text = `${caseItem.id} ${caseItem.description} ${caseItem.source} ${caseItem.type} ${caseItem.status}`.toLowerCase();
                return text.includes(searchTerm);
            });
            populateCasesTable(filteredCases);
        });
    }
});

// Simple logout functionality
document.querySelector('.logout').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        alert('Logout successful!');
        // In a real application, this would redirect to the logout endpoint
        // window.location.href = 'login.html';
    }
});

// View action functionality (delegated)
document.addEventListener('click', function(e) {
    if (e.target.closest('.view-action')) {
        e.preventDefault();
        const caseId = e.target.closest('tr').querySelector('td:first-child').textContent;
        alert(`Viewing details for ${caseId}`);
    }
});
    