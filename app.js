// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker Registered!', reg))
        .catch(err => console.error('Service Worker Registration Failed!', err));
}

// 391 Days Data Generator
const TOTAL_DAYS = 391;
const startDate = new Date(2026, 9, 3); // 03.10.2026

function generate391DaysData() {
    const tasksList = [];
    for (let i = 1; i <= TOTAL_DAYS; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (i - 1));
        
        const dateStr = currentDate.toLocaleDateString('bn-BD', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        tasksList.push({
            id: i,
            day: `Day ${i}`,
            date: dateStr,
            topic: `Day ${i}-এর নির্ধারিত পড়া ও টাস্ক রিভিশন`
        });
    }
    return tasksList;
}

const tasks = generate391DaysData();

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const isCompleted = localStorage.getItem(`task_${task.id}`) === 'true';
        const card = document.createElement('div');
        card.className = `task-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div>
                <strong>${task.day} (${task.date}):</strong> ${task.topic}
            </div>
            <button class="btn ${isCompleted ? 'done' : ''}" onclick="toggleTask(${task.id})">
                ${isCompleted ? 'সম্পন্ন' : 'মার্কিং'}
            </button>
        `;
        taskList.appendChild(card);
    });
}

function toggleTask(id) {
    const currentState = localStorage.getItem(`task_${id}`) === 'true';
    localStorage.setItem(`task_${id}`, !currentState);
    renderTasks();
}

document.addEventListener('DOMContentLoaded', renderTasks);
