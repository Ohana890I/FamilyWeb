document.addEventListener('DOMContentLoaded', () => {
    // פונקציה להחזרת התאריך בפורמט YYYY-MM-DD
    const getTodayDateString = () => {
      const now = new Date();
      return now.toISOString().split('T')[0];
    };
  
    const today = getTodayDateString();
    // מפתח לאחסון הבחירות הגלובליות של היום ב-localStorage
    const globalTasksKey = 'globalSelectedTasks_' + today;
    // נטען את האובייקט הגלובלי: מפתח הוא מזהה המשימה (1-8) והערך הוא שם המשתמש שבחר אותה
    let globalSelectedTasks = JSON.parse(localStorage.getItem(globalTasksKey)) || {};
  
    // מיפוי הסיסמא לשם המשתמש
    const storedPassword = localStorage.getItem('password');
    let userName = '';
    switch (storedPassword) {
      case '1':
        userName = 'אסי';
        break;
      case '2':
        userName = 'ענבל';
        break;
      case '3':
        userName = 'עילאי';
        break;
      case '4':
        userName = 'נועה';
        break;
      case '5':
        userName = 'גאיה';
        break;
      default:
        userName = 'אורח';
    }
  
    // פונקציה לספירת המשימות שהמשתמש הנוכחי בחר
    const countUserTasks = () => {
      return Object.values(globalSelectedTasks).filter(name => name === userName).length;
    };
  
    // עדכון מצב הכפתורים בהתאם לבחירות הגלובליות
    const updateButtons = () => {
      document.querySelectorAll('.task-btn').forEach(btn => {
        const taskId = btn.getAttribute('data-task');
        // אם המשימה כבר נבחרה
        if (globalSelectedTasks[taskId]) {
          if (globalSelectedTasks[taskId] === userName) {
            // אם המשתמש הנוכחי בחר את המשימה – הסתר אותה
            btn.style.display = 'none';
          } else {
            // אם נבחרה על ידי משתמש אחר – השבת את הכפתור
            btn.disabled = true;
            btn.style.opacity = '0.5';
            // כדי להציג שהמשימה כבר נבחרה, ניתן להוסיף טקסט
            if (!btn.textContent.includes('(taken)')) {
              btn.textContent += ' (taken)';
            }
          }
        } else {
          // אם המשימה לא נבחרה עדיין
          // אם המשתמש הנוכחי כבר בחר 2 משימות – השבת את כל הכפתורים הפתוחים
          if (countUserTasks() >= 2) {
            btn.disabled = true;
          } else {
            btn.disabled = false;
            btn.style.opacity = '1';
            // הסרת תוספת הטקסט אם קיימת
            btn.textContent = btn.textContent.replace(' (taken)', '');
          }
        }
      });
    };
  
    updateButtons();
  
    // מאזינים ללחיצות על כפתורי המשימות
    const buttons = document.querySelectorAll('.task-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const taskId = btn.getAttribute('data-task');
        // אם המשימה לא נבחרה ועוד לא בחר המשתמש 2 משימות
        if (!globalSelectedTasks[taskId] && countUserTasks() < 2) {
          globalSelectedTasks[taskId] = userName;
          localStorage.setItem(globalTasksKey, JSON.stringify(globalSelectedTasks));
          updateButtons();
        }
      });
    });
  });
  