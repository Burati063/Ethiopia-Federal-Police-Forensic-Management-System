// Load dashboard stats
function loadDashboardStats() {
    fetch('dashboard_stats.json')
        .then(response => response.json())
        .then(data => {
            document.querySelector('.stat-card.blue h3').textContent = data.totalCases;
            document.querySelector('.stat-card.orange h3').textContent = data.pendingAssignment;
            document.querySelector('.stat-card.green h3').textContent = data.completedCases;
            document.querySelector('.stat-card.yellow h3').textContent = data.assignedCases;
            document.querySelector('.stat-card.purple h3').textContent = data.activeInvestigators;
        })
        .catch(error => console.error('Error loading dashboard stats:', error));
}

// Load recent cases
function loadRecentCases() {
    fetch('recent_cases.json')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('.case-list table tbody');
            tbody.innerHTML = '';
            data.forEach(caseItem => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${caseItem.id}</td>
                    <td>${caseItem.description}</td>
                    <td>${caseItem.source}</td>
                    <td>${caseItem.type}</td>
                    <td>${caseItem.quantity}</td>
                    <td><span class="status ${caseItem.status}">${caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}</span></td>
                    <td>${caseItem.assignedTo}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading recent cases:', error));
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadRecentCases();
});
