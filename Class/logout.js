// Logout functionality for Class
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.querySelector('.nav-item.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../login.html';
            }
        });
    }
});
