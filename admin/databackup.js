// Simple backup functionality
document.addEventListener("DOMContentLoaded", () => {
    const backupBtn = document.querySelector('.start-backup-btn');
  
    if (backupBtn) {
      backupBtn.addEventListener('click', () => {
        alert('Starting a new backup process...');
  
        // Simulate API call
        setTimeout(() => {
          alert('Backup process initiated successfully! Check the backup history for status updates.');
        }, 1500);
      });
    }
  });
  