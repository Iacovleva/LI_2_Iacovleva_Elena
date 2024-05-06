/**
 * Функция для получения случайной активности.
 * @returns {Promise<string>} Строка с текстом активности.
 */
async function getRandomActivity() {
    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return data.activity;
    } catch (error) {
        throw new Error('Failed to fetch activity');
    }
 }
 
 /**
  * Функция для обновления текста активности на HTML-странице.
  * @param {string} activity Текст активности для отображения.
  */
 function updateActivity(activity) {
    const activityElement = document.getElementById('activity');
    activityElement.textContent = activity;
 }
 
 /**
  * Функция для обработки ошибок при получении активности.
  * @param {Error} error Объект ошибки.
  */
 function handleFetchError(error) {
    console.error('Error fetching activity:', error);
    updateActivity('К сожалению, произошла ошибка');
 }
 
 /**
  * Функция для обновления активности каждую минуту.
  */
 async function updateActivityEveryMinute() {
    try {
        const activity = await getRandomActivity();
        updateActivity(activity);
    } catch (error) {
        handleFetchError(error);
    } finally {
        setTimeout(updateActivityEveryMinute, 60000); // Обновление каждую минуту
    }
 }
 
 // Запуск функции обновления активности
 updateActivityEveryMinute();
 