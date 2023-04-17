const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

// // Add Task and save into local storage
// localStorage.setItem("firstName", "Emanuel");
// // Get Item
// const result = localStorage.getItem("firstName");
// // Remove
// localStorage.removeItem("firstName");

// --------------------------------------------------------------------

// Delete Task

const removeTask = (id) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks = tasks.filter((task) => {
    // console.log(task.id === +id);
    return task.id !== +id;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
};

// Get Tasks

const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // console.log(tasks);
  // Display to DOM
  let output;
  const allTasks = tasks.map((task) => {
    return `
    <li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')" id="delete">X</button>
          </li>
    `;
  });

  output = allTasks.join("");
  // console.log(output);
  outputEl.innerHTML = output;
};

getTasks();

// Add Task and save into local storage

const addTask = (e) => {
  e.preventDefault();
  // console.log(inputEl.value);
  // check if input is empty
  if (inputEl.value === "") {
    alert("Please enter a task");
  }

  // get the item
  const task = inputEl.value;
  if (task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
      // console.log(tasks);
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      // console.log(tasks);
    }
    tasks.unshift({
      id: Date.now(),
      title: task,
    });
    // Save to storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // empty input
    inputEl.value = "";
  }
  getTasks();
};

// Event Listener
form.addEventListener("submit", addTask);
