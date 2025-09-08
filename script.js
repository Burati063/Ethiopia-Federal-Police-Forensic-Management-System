
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
});
