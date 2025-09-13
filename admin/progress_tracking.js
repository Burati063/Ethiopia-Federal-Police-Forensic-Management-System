document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const statusFilter = document.querySelector('.status-filter');
    const searchInput = document.querySelector('.search-input-container input');
    const navbarSearch = document.querySelector('.search-input');
    
    // Filter functionality
    function filterCases(status) {
        console.log(`Filtering by: ${status}`);
        // In a real application, this would filter the cases
        // For this demo, we'll just show a message
        alert(`Filtering cases by: ${status}`);
    }
    
    // Search functionality
    function searchCases(term) {
        console.log(`Searching for: ${term}`);
        // In a real application, this would search through cases
        // For this demo, we'll just log the search term
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
    
    // Initialize with all cases visible
    filterCases('all');
    
    // Simulate progress animation
    setTimeout(() => {
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = '90%';
    }, 500);
});