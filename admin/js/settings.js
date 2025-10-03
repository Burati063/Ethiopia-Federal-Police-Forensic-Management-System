document.addEventListener('DOMContentLoaded', function() {
    // Load settings from JSON
    fetch('../json/settings.json')
        .then(response => response.json())
        .then(settings => {
            populateSettings(settings);
        })
        .catch(error => console.error('Error loading settings:', error));

    function populateSettings(settings) {
        // General Settings
        document.getElementById('systemName').value = settings.general.systemName;
        document.getElementById('defaultLanguage').value = settings.general.defaultLanguage;
        document.getElementById('timezone').value = settings.general.timezone;
        document.getElementById('dateFormat').value = settings.general.dateFormat;

        // Security Settings
        document.getElementById('sessionTimeout').value = settings.security.sessionTimeout;
        document.getElementById('passwordMinLength').value = settings.security.passwordMinLength;
        document.getElementById('specialChars').checked = settings.security.specialChars;
        document.getElementById('maxLoginAttempts').value = settings.security.maxLoginAttempts;
        document.getElementById('lockoutDuration').value = settings.security.lockoutDuration;

        // Notification Settings
        document.getElementById('systemAlerts').checked = settings.notifications.systemAlerts;
        document.getElementById('backupNotifications').checked = settings.notifications.backupNotifications;
        document.getElementById('notificationSound').value = settings.notifications.notificationSound;

        // Case Management
        document.getElementById('casePrefix').value = settings.caseManagement.casePrefix;
        document.getElementById('defaultInvestigationDays').value = settings.caseManagement.defaultInvestigationDays;
        document.getElementById('autoCaseAssignment').checked = settings.caseManagement.autoCaseAssignment;
        document.getElementById('approvalForClosure').checked = settings.caseManagement.approvalForClosure;

        // System Information
        document.querySelector('.info-value').textContent = settings.systemInfo.version; // System Version
        document.querySelector('.status-indicator').textContent = settings.systemInfo.databaseStatus;
        document.getElementById('lastBackup').textContent = settings.systemInfo.lastChange;
    }

    // Save settings (for demo, just log to console)
    document.getElementById('saveSettings').addEventListener('click', function() {
        const updatedSettings = {
            general: {
                systemName: document.getElementById('systemName').value,
                defaultLanguage: document.getElementById('defaultLanguage').value,
                timezone: document.getElementById('timezone').value,
                dateFormat: document.getElementById('dateFormat').value
            },
            security: {
                sessionTimeout: parseInt(document.getElementById('sessionTimeout').value),
                passwordMinLength: parseInt(document.getElementById('passwordMinLength').value),
                specialChars: document.getElementById('specialChars').checked,
                maxLoginAttempts: parseInt(document.getElementById('maxLoginAttempts').value),
                lockoutDuration: parseInt(document.getElementById('lockoutDuration').value)
            },
            notifications: {
                systemAlerts: document.getElementById('systemAlerts').checked,
                backupNotifications: document.getElementById('backupNotifications').checked,
                notificationSound: document.getElementById('notificationSound').value
            },
            caseManagement: {
                casePrefix: document.getElementById('casePrefix').value,
                defaultInvestigationDays: parseInt(document.getElementById('defaultInvestigationDays').value),
                autoCaseAssignment: document.getElementById('autoCaseAssignment').checked,
                approvalForClosure: document.getElementById('approvalForClosure').checked
            },
            systemInfo: {
                version: "1.0.0",
                databaseStatus: "Connected",
                lastChange: new Date().toLocaleString()
            }
        };

        // In a real app, send to server. For demo, log to console
        console.log('Settings saved:', updatedSettings);
        alert('Settings saved successfully!');
    });
});
