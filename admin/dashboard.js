// Logout confirmation functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutButtons = document.querySelectorAll('.logout, .nav-item.logout');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutConfirmation();
        });
    });
    
    function showLogoutConfirmation() {
        const overlay = document.createElement('div');
        overlay.className = 'logout-overlay';
        
        const dialog = document.createElement('div');
        dialog.className = 'logout-dialog';
        dialog.innerHTML = `
            <div style="font-size: 24px; color: #e53e3e; margin-bottom: 15px;">
                <i class="fas fa-sign-out-alt"></i>
            </div>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout from the system?</p>
            <div class="logout-buttons">
                <button class="logout-cancel-btn">Cancel</button>
                <button class="logout-confirm-btn">Yes, Logout</button>
            </div>
        `;
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        
        // Add event listeners
        document.querySelector('.logout-cancel-btn').addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        document.querySelector('.logout-confirm-btn').addEventListener('click', function() {
            window.location.href = 'login.html';
        });
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    // Search functionality with filter
    const searchInput = document.querySelector('.search-input-container input');
    const navbarSearch = document.querySelector('.search-input');
    const searchFilter = document.getElementById('search-filter');
    
    function searchCases(term, filter) {
        const rows = document.querySelectorAll('.cases-table tbody tr');
        
        rows.forEach(row => {
            let searchText = '';
            
            // Determine which column to search based on filter
            switch(filter) {
                case 'case-id':
                    searchText = row.cells[0].textContent.toLowerCase();
                    break;
                case 'title':
                    searchText = row.cells[1].textContent.toLowerCase();
                    break;
                case 'investigator':
                    searchText = row.cells[5].textContent.toLowerCase();
                    break;
                case 'type':
                    searchText = row.cells[2].textContent.toLowerCase();
                    break;
                case 'status':
                    searchText = row.cells[3].textContent.toLowerCase();
                    break;
                default: // 'all'
                    searchText = row.textContent.toLowerCase();
            }
            
            if (searchText.includes(term.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    // Add event listener to search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filterValue = searchFilter ? searchFilter.value : 'all';
            searchCases(this.value, filterValue);
        });
    }
    
    // Add event listener to navbar search
    if (navbarSearch) {
        navbarSearch.addEventListener('input', function() {
            searchCases(this.value, 'all');
        });
    }
    
    // Add event listener to filter dropdown
    if (searchFilter) {
        searchFilter.addEventListener('change', function() {
            if (searchInput && searchInput.value) {
                searchCases(searchInput.value, this.value);
            }
        });
    }
});