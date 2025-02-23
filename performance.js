document.addEventListener('DOMContentLoaded', () => {
    // עוזר לקבל את תאריך היום בפורמט YYYY-MM-DD
    const getTodayDateString = () => {
      const now = new Date();
      return now.toISOString().split('T')[0];
    };
  
    const today = getTodayDateString();
    const performanceKey = 'performanceRecords_' + today;
    // טוען את רשומות הביצוע של היום מ-localStorage או מאתחל מערך ריק
    let performanceRecords = JSON.parse(localStorage.getItem(performanceKey)) || [];
  
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
  
    // הגדרת מיפוי מספרי המשימות לטקסט
    const tasksMapping = {
      "1": "לתלות כביסה",
      "2": "להוריד כביסה",
      "3": "לפנות מדיח",
      "4": "לעשות כלים",
      "5": "לעשות שואב",
      "6": "לסדר את הבית",
      "7": "להפעיל מכונה",
      "8": "שיעורי בית"
    };
  
    // טוען את הבחירות הגלובליות של היום (אובייקט בו המפתח הוא מזהה המשימה והערך הוא שם המשתמש שבחר אותה)
    const globalTasksKey = 'globalSelectedTasks_' + today;
    const globalSelectedTasks = JSON.parse(localStorage.getItem(globalTasksKey)) || {};
  
    // מחשב את המשימות שהמשתמש הנוכחי בחר בלבד
    const userTaskIds = Object.keys(globalSelectedTasks).filter(taskId => globalSelectedTasks[taskId] === userName);
    const selectedTasksText = userTaskIds.map(taskId => tasksMapping[taskId]).join(', ');
  
    // פונקציה לעדכון הטבלה עם הרשומות
    const updateTable = () => {
      const tableBody = document.querySelector('#performance-table tbody');
      tableBody.innerHTML = ''; // איפוס שורות קיימות
      performanceRecords.forEach(record => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.textContent = record.userName;
        const tdTasks = document.createElement('td');
        tdTasks.textContent = record.tasks;
        tr.appendChild(tdName);
        tr.appendChild(tdTasks);
        tableBody.appendChild(tr);
      });
    };
  
    updateTable();
  
    // מאזין ללחיצה על כפתור "ביצעתי את המשימות"
    const didTasksBtn = document.getElementById('didTasks-btn');
    didTasksBtn.addEventListener('click', () => {
      // נרשום רק את המשימות שהמשתמש בחר (לפי הנתונים הגלובליים)
      const newRecord = {
        userName: userName,
        tasks: selectedTasksText || 'לא נבחרו משימות'
      };
  
      // אם המשתמש כבר קיים ברשומות – נעדכן את הרשומה שלו, אחרת נוסיף רשומה חדשה
      const recordIndex = performanceRecords.findIndex(record => record.userName === userName);
      if (recordIndex === -1) {
        performanceRecords.push(newRecord);
      } else {
        performanceRecords[recordIndex] = newRecord;
      }
      // שמירת הרשומות המעודכנות ב-localStorage
      localStorage.setItem(performanceKey, JSON.stringify(performanceRecords));
      updateTable();
      alert('המשימות שלך נקלטו בהצלחה!');
    });
  });
  