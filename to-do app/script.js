document.addEventListener('DOMContentLoaded', function() {
    // Get the task input field and task list
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskElement(task);
    });

    // Add task function
    window.addTask = function() {
        // Get the task value
        const taskValue = taskInput.value;

        // Check if the task is not empty
        if (taskValue.trim() !== '') {
            // Add task to the list
            const task = { text: taskValue, completed: false };
            savedTasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));

            // Add task element to the DOM
            addTaskElement(task);

            // Clear the input field
            taskInput.value = '';
        }
    };

    // Delete all tasks function
    window.deleteAllTasks = function() {
        // Remove all tasks from the display
        taskList.innerHTML = '';

        // Remove all tasks from local storage
        localStorage.removeItem('tasks');
    };

    // Add task element to the DOM
    function addTaskElement(task) {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.innerText = task.text;

        const completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.onclick = function() {
            task.completed = !task.completed;
            listItem.classList.toggle('completed', task.completed);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            const index = savedTasks.indexOf(task);
            savedTasks.splice(index, 1);
            listItem.remove();
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        };

        listItem.appendChild(taskText);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        listItem.classList.toggle('completed', task.completed);

        taskList.appendChild(listItem);
    }
});
