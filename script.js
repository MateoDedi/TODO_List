function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // Create a new task item
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        taskItem.remove();
        saveTasksToLocalStorage();
    };

    taskItem.appendChild(deleteButton);

    const taskList = document.getElementById("taskList");
    taskList.appendChild(taskItem);

    taskInput.value = "";

    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    
    const tasks = Array.from(taskList.children).map(task => task.textContent.split("Delete")[0].trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page
window.onload = function () {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    for (const taskText of storedTasks) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            taskItem.remove();
            saveTasksToLocalStorage();
        };

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
};