document.addEventListener('DOMContentLoaded', function() {
    // Load cases data and populate table
    fetch('cases.json')
        .then(response => response.json())
        .then(cases => {
            populateTable(cases);
        })
        .catch(error => console.error('Error loading cases:', error));

    function populateTable(cases) {
        const tbody = document.querySelector('.case-table tbody');
        tbody.innerHTML = ''; // Clear existing rows

        cases.forEach(caseItem => {
            const row = document.createElement('tr');

            // Map status to CSS class
            let statusClass = '';
            switch (caseItem.status) {
                case 'In Laboratory':
                    statusClass = 'lab';
                    break;
                case 'Completed':
                    statusClass = 'completed';
                    break;
                case 'Assigned':
                    statusClass = 'assigned';
                    break;
                default:
                    statusClass = caseItem.status.toLowerCase().replace(/\s+/g, '-');
            }

            row.innerHTML = `
                <td>${caseItem.id}</td>
                <td>${caseItem.type}</td>
                <td>${caseItem.source}</td>
                <td><span class="status ${statusClass}">${caseItem.status}</span></td>
                <td>${caseItem.assignedTo}</td>
                <td><button class="action-btn"><i class="fas fa-eye"></i> View Details</button></td>
            `;

            tbody.appendChild(row);
        });
    }

    // Filter functionality
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchCase');
    
    function applyFilters() {
        const statusValue = statusFilter.value;
        const searchValue = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.case-table tbody tr');
        
        rows.forEach(row => {
            const caseId = row.cells[0].textContent.toLowerCase();
            const type = row.cells[1].textContent.toLowerCase();
            const source = row.cells[2].textContent.toLowerCase();
            const assignedTo = row.cells[4].textContent.toLowerCase();
            const status = row.cells[3].textContent.toLowerCase();
            
            const searchMatch = caseId.includes(searchValue) || 
                               type.includes(searchValue) || 
                               source.includes(searchValue) || 
                               assignedTo.includes(searchValue);
            
            const statusMatch = statusValue === 'all' || status.includes(statusValue);
            
            if (searchMatch && statusMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    statusFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    
    // Pagination functionality (if pagination elements exist)
    const paginationButtons = document.querySelectorAll('.pagination-button:not(.disabled)');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.pagination-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button if it's a number button
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            // Here you would typically make an AJAX request to fetch the next page of data
            // For this example, we'll just log the page number
            if (this.textContent && !this.querySelector('i')) {
                console.log('Page changed to:', this.textContent);
            }
        });
    });
});
