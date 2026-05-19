const button = document.getElementById("addButton");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

button.addEventListener("click", function() {

    const newTask = document.createElement("li");

    newTask.textContent = input.value;

    console.log(input.value);
    taskList.appendChild(newTask);

    input.value = "";

});