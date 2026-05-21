// Get important HTML elements from the page
const button = document.getElementById("addButton");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage or use empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save current tasks array into browser storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Rebuild the visible task list from the tasks array
function renderTasks() {

    // Clear current visible tasks before rebuilding
    taskList.innerHTML = "";

    // Loop through every saved task
    for (let i = 0; i < tasks.length; i++) {

        const newTask = document.createElement("li");

        // Create checkbox for completion state
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = tasks[i].completed;

        // Create visible task text
        const taskText = document.createElement("span");

        taskText.textContent = tasks[i].text;

        // Cross out completed tasks
        if (tasks[i].completed) {
            taskText.style.textDecoration = "line-through";
        }

        // Update completion state when checkbox changes
        checkbox.addEventListener("change", function() {

            tasks[i].completed = checkbox.checked;

            saveTasks();

            renderTasks();

        });

        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = " X ";

        // Remove task when delete button clicked
        deleteButton.addEventListener("click", function() {

            tasks.splice(i, 1);

            saveTasks();

            renderTasks();

        });

        // Build task item structure
        newTask.appendChild(checkbox);

        newTask.appendChild(taskText);

        newTask.appendChild(deleteButton);

        // Add task item to webpage
        taskList.appendChild(newTask);
    }
}

// Add new task when button clicked
button.addEventListener("click", function() {

    // Prevent empty tasks
    if (input.value.trim() === "") {
        return;
    }

    // Add new task object into tasks array
    tasks.push({
        text: input.value,
        completed: false
    });

    // Clear textbox after adding task
    input.value = "";

    // Save updated tasks and rebuild UI
    saveTasks();

    renderTasks();

});

// Initial page render when website loads
renderTasks();