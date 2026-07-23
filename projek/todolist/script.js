

document.addEventListener("DOMContentLoaded",() => {
    // alert("hello")
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");
    const emptyImg = document.querySelector('.empty-img');
    const todosContainer = document.querySelector(".todos-container");
    const progressBar = document.getElementById("progress");
    const progressNumber = document.getElementById("numbers");

    const toggleEmptyState = () => {
        emptyImg.style.display = taskList.children.length === 0 ? "block" : "none";
        todosContainer.style.width = taskList.children.length > 0 ? "100%" : "50%";
    }

    const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTask = taskList.querySelectorAll(`input[type="checkbox"]:checked`).length;
        progressBar.style.width = totalTasks ? `${(completedTask / totalTasks) * 100}%` : '0%'
        progressNumber.textContent = `${completedTask} / ${totalTasks}`
        if(totalTasks === completedTask && totalTasks !== 0) celebrateAllTaskDone();
    }
    const addTask = (event) =>  {
        // alert("hello")
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText) return;
        const li =  document.createElement("li");
        li.innerHTML = `
        <input type="checkbox" class="checkbox" /> <span> ${taskText} </span>
        <div class="task-btn">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>`;
        const checkbox = li.querySelector(".checkbox");
        const editBtn = li.querySelector(".edit-btn");
        const task = li.querySelector("span");

        checkbox.addEventListener("change",() => {
            // alert("hello")
            const { checked }= checkbox
            if(checked){
                // let totalChecked = 0;
                // taskList.querySelectorAll("li").forEach((li,idx) => {
                //     console.log(li.querySelector('input[type="checkbox"]').checked);
                // })
                editBtn.disabled = checked
                editBtn.style.visibility = "hidden";
                editBtn.classList.add("hidden");
                task.classList.add("done");
                updateProgress();
            } else {
                editBtn.disabled = checked
                editBtn.style.visibility = "visible";
                editBtn.classList.remove("hidden");
                task.classList.remove("done");
                task.style.textDecoration = "none";
                updateProgress();
            }
        });

        editBtn.addEventListener("click",() => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector("span").textContent;
                taskInput.focus();
                li.remove();
                toggleEmptyState();
                updateProgress();
            }
        });

        li.querySelector(".delete-btn").addEventListener("click",() => {
            li.remove();
            toggleEmptyState();
            updateProgress()
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState()
        updateProgress()
    };

    addTaskBtn.addEventListener('click',addTask);
    taskInput.addEventListener('keypress',(e) => {
        // console.log(e);
        if(e.key === "Enter") {
            addTask(e);
        }
    });
});


const celebrateAllTaskDone = () => {
    const duration = 3000;
    const end = Date.now();

    const colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff'];

    (function frame () {
        confetti({
            particleCount: 10,
            angle: 60,
            spread: 55,
            origin: {x: 0},
            colors
        });

        confetti({
        particleCount: 10,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}