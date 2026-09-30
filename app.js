// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker Registered!', reg))
        .catch(err => console.error('Service Worker Registration Failed!', err));
}

// Sample Data
const tasks = [
    { id: 1, day: "Day 1", topic: "ম্যাট্রিক্স ও নির্ণায়ক L-1 & ল্যাবরেটরির নিরাপদ ব্যবহার" },
    { id: 2, day: "Day 2", topic: "ভৌত জগত ও পরিমাপ & কোষ ও এর গঠন L-1" },
    { id: 3, day: "Day 3", topic: "অপরিচিতা L-1 & The Parrot's Tale" },
    { id: 4, day: "Day 4", topic: "ম্যাট্রিক্স ও নির্ণায়ক L-2 & গুণগত রসায়ন" }
];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const isCompleted = localStorage.getItem(`task_${task.id}`) === 'true';
        const card = document.createElement('div');
        card.className = `task-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div>
                <strong>${task.day}:</strong> ${task.topic}
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
