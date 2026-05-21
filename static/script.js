const button = document.getElementById("addButton"); // Find the Add Task button and save it in a variable called button.
const input = document.getElementById("taskInput");  // Finds the textbox.
const taskList = document.getElementById("taskList"); // Finds the <ul> where tasks appear.

 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];    //Load saved tasks from localStorage or use empty array


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));       //taking the current tasks array and saving it into browser localStorage
}

function renderTasks() {                             // Defines a function that rebuilds the visible tasks list
    taskList.innerHTML = "";                         // This clears the invisible list Because each time we render, we want to rebuild the whole list from the current tasks array. Without this, tasks would duplicate every time renderTasks() runs.

    for (let i = 0; i < tasks.length; i++) {         // Loops through every task in the array
        const newTask = document.createElement("li");       // Creates a new <li> element in memory(It's not on display yet)
        newTask.textContent = tasks[i].text;                     // Puts the task text inside the <li>
        

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = tasks[i].completed;

        if(tasks[i].completed) {
            newTask.style.textDecoration = "line-through";
        }

        newTask.prepend(checkbox);

        checkbox.addEventListener("change",function(){
            tasks[i].completed =  checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");  // Creates a new button in memory, not visible quite yet
        deleteButton.textContent = " X ";                       // Makes the button display " X "

        deleteButton.addEventListener("click", function() {     // This attaches behavior to that specific X button. It means When this X button is clicked, run the code inside. This is important because buttons created with JavaScript need event listeners attached in JavaScript.
            tasks.splice(i, 1);                                 // Removes one task from the array at index i
            saveTasks();                                        // Calls function "saveTasks()"
            renderTasks();                                      // Calls function "renderTasks()"
        });

        newTask.appendChild(deleteButton);                      // Adds the X button inside the <lib>
        taskList.appendChild(newTask);                          // Adds the complete <li> to the <ul> on the page. This is the moment the task becomes visible.
    }
}

button.addEventListener("click", function() {                   // When Add Task button is clicked, run this code.
    if (input.value.trim() === "") {                            // This prevents blank tasks.
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });                                   

    input.value = "";                                           // Clear the textbox after adding task

    saveTasks();                                                // Saves the updated task array to localStorage.
    renderTasks();                                              // Redraws the visible task list so the new task appears.
});

renderTasks();