document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    // שם המשתמש לפי הסיסמה
    const storedPassword = localStorage.getItem('password');
    let userName = '';
    switch (storedPassword) {
        case '1': userName = 'אסי'; break;
        case '2': userName = 'ענבל'; break;
        case '3': userName = 'עילאי'; break;
        case '4': userName = 'נועה'; break;
        case '5': userName = 'גאיה'; break;
        default: userName = 'אורח';
    }

    // טוען הודעות שנשמרו
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const updateChat = () => {
        chatBox.innerHTML = '';
        messages.forEach(msg => {
            const msgElement = document.createElement('div');
            msgElement.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
            chatBox.appendChild(msgElement);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    updateChat();

    // שליחת הודעה
    sendBtn.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            messages.push({ user: userName, text: messageText });
            localStorage.setItem('chatMessages', JSON.stringify(messages));
            messageInput.value = '';
            updateChat();
        }
    });
});
