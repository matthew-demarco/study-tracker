const button = document.getElementById("addButton");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

button.addEventListener("click", function() {

    const newTask = document.createElement("li");

    newTask.textContent = input.value;

    const deleteButton = document.createElement("button");

    deleteButton.textContent = " X ";

    deleteButton.addEventListener("click",function() {
        newTask.remove();
    });

    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);

    input.value = "";

});