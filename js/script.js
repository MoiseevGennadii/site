// Обработка формы с отправкой на email
function initFormHandler() {
    const form = document.getElementById('quick-contact');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Показываем статус отправки
            formStatus.textContent = 'Отправка...';
            formStatus.style.color = '#4db8ff';
            
            // Собираем данные формы
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Формируем текст письма
            const message = `
                Имя: ${data.name}
                Телефон: ${data.phone}
                Email: ${data.email}
                
                Сообщение: ${data.message}
            `;
            
            // Здесь нужно настроить отправку на ваш email
            // Вариант 1: Через Formspree (бесплатно)
            try {
                const response = await fetch('https://formspree.io/f/your-form-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name,
                        phone: data.phone,
                        email: data.email,
                        message: data.message
                    })
                });
                
                if (response.ok) {
                    formStatus.textContent = '✓ Спасибо! Сообщение отправлено. Я свяжусь с вами.';
                    formStatus.style.color = '#00aa00';
                    form.reset();
                } else {
                    throw new Error('Ошибка отправки');
                }
            } catch (error) {
                formStatus.textContent = '✗ Ошибка. Попробуйте позже или напишите в Telegram';
                formStatus.style.color = '#ff0000';
                console.error('Error:', error);
            }
        });
    }
}

// Или Вариант 2: Отправка на Telegram (рекомендую)
function initTelegramForm() {
    const form = document.getElementById('quick-contact');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            formStatus.textContent = 'Отправка...';
            formStatus.style.color = '#4db8ff';
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Формируем сообщение для Telegram
            const telegramMessage = `
📬 Новое сообщение с сайта!

👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email}

💬 Сообщение: ${message}
            `;
            
            // Отправляем в Telegram (нужно создать бота)
            const botToken = 'YOUR_BOT_TOKEN'; // Получить у @BotFather
            const chatId = 'YOUR_CHAT_ID'; // Ваш Telegram ID
            
            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: telegramMessage,
                        parse_mode: 'HTML'
                    })
                });
                
                if (response.ok) {
                    formStatus.textContent = '✓ Спасибо! Сообщение отправлено в Telegram';
                    formStatus.style.color = '#00aa00';
                    form.reset();
                } else {
                    throw new Error('Telegram error');
                }
            } catch (error) {
                formStatus.textContent = '✗ Ошибка. Попробуйте позже';
                formStatus.style.color = '#ff0000';
                console.error('Error:', error);
            }
        });
    }
}