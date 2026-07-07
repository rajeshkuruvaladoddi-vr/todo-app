const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
};

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    createTask(text, false);
    saveTasks();
    taskInput.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");

    if (completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button onclick="toggleTask(this)">✓</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
}

function toggleTask(button) {
    button.parentElement.parentElement.classList.toggle("completed");
    saveTasks();
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});
