

document.addEventListener("DOMContentLoaded",() => {
    // alert("hello")
    const taskInput = document.getElementById("task-input"),
    addTaskBtn = document.getElementById("add-btn"),
    taskList = document.getElementById("task-list");

    const addTask = (event) =>  {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText) return;
        const li =  document.createElement("li");
        li.textContent = taskInput;
        taskList.appendChild(li);
        taskInput.value = '';

        addTaskBtn.addEventListener('click',addTask);
        taskInput.addEventListener('keypress',(e) => {
            console.log(e);
            if(e.key === "Enter") {
                addTask(e);
            }
        });
    }
});