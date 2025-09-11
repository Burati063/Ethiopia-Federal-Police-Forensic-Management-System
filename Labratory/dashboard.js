
        // Simple logout functionality
        document.querySelector('.logout').addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                alert('Logout successful!');
                // In a real application, this would redirect to the logout endpoint
                // window.location.href = 'login.html';
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.cases-table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // View action functionality
        const viewActions = document.querySelectorAll('.view-action');
        viewActions.forEach(action => {
            action.addEventListener('click', function(e) {
                e.preventDefault();
                const caseId = this.closest('tr').querySelector('td:first-child').textContent;
                alert(`Viewing details for ${caseId}`);
            });
        });
    