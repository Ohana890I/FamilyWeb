document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const themeColorInput = document.getElementById('theme-color');
    const darkModeInput = document.getElementById('dark-mode');
    const reminderTimeInput = document.getElementById('reminder-time');
    const taskLimitInput = document.getElementById('task-limit');
    const saveButton = document.getElementById('save-settings');
    const resetButton = document.getElementById('reset-data');

    // טוען נתונים שמורים
    usernameInput.value = localStorage.getItem('username') || '';
    themeColorInput.value = localStorage.getItem('themeColor') || '#f4f4f4';
    darkModeInput.checked = localStorage.getItem('darkMode') === 'true';
    reminderTimeInput.value = localStorage.getItem('reminderTime') || '';
    taskLimitInput.value = localStorage.getItem('taskLimit') || '2';

    // עדכון צבע הרקע של האתר
    document.body.style.backgroundColor = themeColorInput.value;

    // שמירת ההגדרות
    saveButton.addEventListener('click', () => {
        localStorage.setItem('username', usernameInput.value);
        localStorage.setItem('themeColor', themeColorInput.value);
        localStorage.setItem('darkMode', darkModeInput.checked);
        localStorage.setItem('reminderTime', reminderTimeInput.value);
        localStorage.setItem('taskLimit', taskLimitInput.value);

        // החלפת צבע הרקע
        document.body.style.backgroundColor = themeColorInput.value;

        alert('ההגדרות נשמרו בהצלחה!');
    });

    // מחיקת כל הנתונים
    resetButton.addEventListener('click', () => {
        if (confirm('האם אתה בטוח שברצונך לאפס את כל הנתונים?')) {
            localStorage.clear();
            location.reload();
        }
    });

    // הפעלת מצב כהה
    if (darkModeInput.checked) {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    }

    darkModeInput.addEventListener('change', () => {
        if (darkModeInput.checked) {
            document.body.style.backgroundColor = '#333';
            document.body.style.color = '#fff';
        } else {
            document.body.style.backgroundColor = themeColorInput.value;
            document.body.style.color = '#000';
        }
    });
});
