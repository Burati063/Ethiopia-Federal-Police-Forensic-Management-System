// logout.js - Logout confirmation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to all logout buttons/links
    const logoutButtons = document.querySelectorAll('.logout, .nav-item.logout');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutConfirmation();
        });
    });
    
    // Logout confirmation function
    function showLogoutConfirmation() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'logout-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;
        
        // Create confirmation dialog
        const dialog = document.createElement('div');
        dialog.className = 'logout-dialog';
        dialog.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            text-align: center;
            max-width: 400px;
            width: 90%;
        `;
        
        // Add content to dialog
        dialog.innerHTML = `
            <div style="font-size: 24px; color: #e53e3e; margin-bottom: 15px;">
                <i class="fas fa-sign-out-alt"></i>
            </div>
            <h3 style="margin-bottom: 15px; color: #2d3748;">Confirm Logout</h3>
            <p style="margin-bottom: 25px; color: #718096;">Are you sure you want to logout from the system?</p>
            <div style="display: flex; justify-content: center; gap: 15px;">
                <button id="logout-cancel" style="
                    padding: 10px 20px;
                    border: 1px solid #cbd5e0;
                    background: white;
                    border-radius: 6px;
                    cursor: pointer;
                    color: #4a5568;
                    font-weight: 500;
                ">Cancel</button>
                <button id="logout-confirm" style="
                    padding: 10px 20px;
                    border: none;
                    background: #e53e3e;
                    border-radius: 6px;
                    cursor: pointer;
                    color: white;
                    font-weight: 500;
                ">Yes, Logout</button>
            </div>
        `;
        
        // Add dialog to overlay
        overlay.appendChild(dialog);
        
        // Add overlay to body
        document.body.appendChild(overlay);
        
        // Add event listeners to buttons
        document.getElementById('logout-cancel').addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        document.getElementById('logout-confirm').addEventListener('click', function() {
            // Perform logout action (redirect to login page)
            window.location.href = 'login.html';
        });
        
        // Close modal when clicking outside
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
});