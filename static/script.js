const button = document.getElementById("addButton");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const newTask = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tasks[i].completed;

        const taskText = document.createElement("span");
        taskText.textContent = tasks[i].text;

        if (tasks[i].completed) {
            taskText.style.textDecoration = "line-through";
        }

        checkbox.addEventListener("change", function() {
            tasks[i].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = " X ";

        deleteButton.addEventListener("click", function() {
            tasks.splice(i, 1);
            saveTasks();
            renderTasks();
        });

        newTask.appendChild(checkbox);
        newTask.appendChild(taskText);
        newTask.appendChild(deleteButton);

        taskList.appendChild(newTask);
    }
}

button.addEventListener("click", function() {
    if (input.value.trim() === "") {
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";

    saveTasks();
    renderTasks();
});

renderTasks();