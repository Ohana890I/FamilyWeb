function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (passwordInput >= 1 && passwordInput <= 5) {
      // כאן תוכל להוסיף קוד למעבר לדף הבית לפי הסיסמא שנכנסה
      window.location.href = "home.html"; // דוגמה להפניה לדף הבית
    } else {
      errorMessage.textContent = "סיסמא לא נכונה, נסה שוב";
      errorMessage.style.display = "block";
    }
  }
  






  function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (passwordInput >= 1 && passwordInput <= 5) {
      // שמירת הסיסמא ב-localStorage
      localStorage.setItem('password', passwordInput);
      window.location.href = "home.html"; // מעבר לדף הבית
    } else {
      errorMessage.textContent = "סיסמא לא נכונה, נסה שוב";
      errorMessage.style.display = "block";
    }
  }
  






  // פונקציה לאיפוס הטבלה
function resetTable() {
  // כאן תוכל להוסיף את הלוגיקה לאיפוס התוכן של הטבלה
  document.getElementById('performance-table').innerHTML = ''; // מנקה את התוכן של הטבלה
}

// פונקציה שתבדוק אם הגיע הזמן לאפס את הטבלה
function checkResetTime() {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
      resetTable();
  }
}

// הפעלת הבדיקה כל דקה
setInterval(checkResetTime, 60000);

  