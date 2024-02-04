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

export function getTimeAgo(timestamp) {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - previousDate.getTime();

    // Расчет количества минут, часов и дней
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
        return `${minutes} мин.`;
    } else if (hours < 24) {
        return `${hours} ч.`;
    } else {
        return `${days} д.`;
    }
}
