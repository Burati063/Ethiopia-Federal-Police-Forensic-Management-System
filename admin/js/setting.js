        // Simple logout functionality
        document.querySelector('.logout').addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                alert('Logout successful!');
                // In a real application, this would redirect to the logout endpoint
                // window.location.href = 'login.html';
            }
        });

        // Save settings functionality
        document.getElementById('saveSettings').addEventListener('click', function() {
            // Update last backup time to current time
            updateLastBackupTime();
            
            alert('Settings saved successfully!');
        });

        // Function to update last backup time
        function updateLastBackupTime() {
            const now = new Date();
            const lastBackupElement = document.getElementById('lastBackup');
            
            // Format the time as "X minutes/hours ago"
            lastBackupElement.textContent = 'Just now';
            
            // After 1 minute, update to "1 minute ago"
            setTimeout(() => {
                lastBackupElement.textContent = '1 minute ago';
            }, 60000);
            
            // After 5 minutes, update to "5 minutes ago"
            setTimeout(() => {
                lastBackupElement.textContent = '5 minutes ago';
            }, 300000);
            
            // After 1 hour, update to "1 hour ago"
            setTimeout(() => {
                lastBackupElement.textContent = '1 hour ago';
            }, 3600000);
        }

        // Simulate backup process running in the background
        function simulateBackupProcess() {
            // Randomly update backup time between 1-6 hours
            const randomHours = Math.floor(Math.random() * 6) + 1;
            const lastBackupElement = document.getElementById('lastBackup');
            
            if (randomHours === 1) {
                lastBackupElement.textContent = '1 hour ago';
            } else {
                lastBackupElement.textContent = `${randomHours} hours ago`;
            }
        }

        // Run the backup simulation every 30 minutes
        setInterval(simulateBackupProcess, 1800000); // 30 minutes