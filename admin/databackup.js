document.addEventListener('DOMContentLoaded', function() {
    // Load backup data and populate table and stats
    fetch('databackup.json')
        .then(response => response.json())
        .then(data => {
            updateStats(data.stats);
            populateBackupTable(data.backups);
        })
        .catch(error => console.error('Error loading backup data:', error));

    function updateStats(stats) {
        document.querySelector('.backup-stat .stat-number').textContent = stats.latestSize;
        document.querySelector('.rate-icon').parentElement.querySelector('.stat-number').textContent = stats.successRate;
        document.querySelector('.time-icon').parentElement.querySelector('.stat-number').textContent = stats.avgDuration;
        document.querySelector('.total-icon').parentElement.querySelector('.stat-number').textContent = stats.totalBackups;
        document.querySelector('.success-icon').parentElement.querySelector('.stat-number').textContent = stats.successful;
        document.querySelector('.failed-icon').parentElement.querySelector('.stat-number').textContent = stats.failed;
        document.querySelector('.storage-icon').parentElement.querySelector('.stat-number').textContent = stats.storageUsed;
    }

    function populateBackupTable(backups) {
        const tbody = document.querySelector('.backup-table tbody');
        tbody.innerHTML = ''; // Clear existing rows

        backups.forEach(backup => {
            const row = document.createElement('tr');

            let statusHtml = '';
            if (backup.status === 'In Progress') {
                statusHtml = `<span class="status-badge ${backup.statusClass}"><i class="fas fa-sync-alt fa-spin"></i> ${backup.status}</span><br/>${backup.progress}% complete
                                    <div class="progress-bar">
<div class="progress-fill" style="width: ${backup.progress}%"></div>
</div>`;
            } else if (backup.status === 'Failed') {
                statusHtml = `<span class="status-badge ${backup.statusClass}"><i class="fas fa-times-circle"></i> ${backup.status}</span><br/><span style="font-size: 12px; color: var(--danger);">${backup.error}</span>`;
            } else {
                statusHtml = `<span class="status-badge ${backup.statusClass}"><i class="fas fa-check-circle"></i> ${backup.status}</span>`;
            }

            let actionsHtml = '';
            if (backup.hasActions) {
                actionsHtml = `
<button class="action-btn download-btn"><i class="fas fa-download"></i> Download</button>
<button class="action-btn restore-btn"><i class="fas fa-undo"></i> Restore</button>
`;
            }

            row.innerHTML = `
<td>${backup.type}<br/><span style="font-size: 12px; color: var(--gray);">${backup.date}</span></td>
<td>${statusHtml}</td>
<td>${backup.dataSummary}</td>
<td>${backup.sizeDuration}</td>
<td>${actionsHtml}</td>
`;

            tbody.appendChild(row);
        });
    }
});
