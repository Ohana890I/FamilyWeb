document.addEventListener('DOMContentLoaded', function() {
  // קבלת הסיסמא ששמורה ב-localStorage מהדף הקודם
  const storedPassword = localStorage.getItem('password');
  let userName = '';

  // מיפוי הסיסמא לשם המשתמש
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

  // קביעת ברכת הזמן לפי השעה
  const now = new Date();
  const hour = now.getHours();
  let timeGreeting = '';

  if (hour >= 5 && hour < 12) {
    timeGreeting = 'בוקר טוב';
  } else if (hour >= 12 && hour < 18) {
    timeGreeting = 'צהריים טובים';
  } else {
    timeGreeting = 'ערב טוב';
  }

  // עדכון הודעת הברכה בדף הבית
  const greetingElement = document.getElementById('greeting');
  greetingElement.textContent = `שלום, ${timeGreeting} ${userName}`;

  // עדכון תאריך מדויק של היום
  const currentDateElement = document.getElementById('current-date');
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDateElement.textContent = new Date().toLocaleDateString('he-IL', options);
});

  