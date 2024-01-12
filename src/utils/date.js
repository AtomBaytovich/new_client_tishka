export function isValidDate(dateObject) {
    return dateObject instanceof Date && !isNaN(dateObject.getTime());
}

export function formatDateTime(date) {
    date = new Date(date);
    if (isValidDate(date) == false) return "Пока что нет"
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Moscow' // Указываем часовой пояс Москвы
    };

    const dateTime = date.toLocaleDateString('ru-RU', options);
    return dateTime;
}