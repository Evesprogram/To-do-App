/**
 * WEEK 6 – TO-DO APP
 * Requirements satisfied:
 * - Add Task
 * - Toggle Complete
 * - Delete Task
 * - Filter Tasks
 * - Persist using localStorage
 *
 * Enhancements:
 * - Progress bar
 * - Dark mode
 * - Inline editing
 * - Clear completed
 * /**
 * localStorage
 * addEventListener
 */

/* --------------------------
   1. SELECT DOM ELEMENTS
-------------------------- */

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const clearBtn = document.getElementById("clear-completed");

const filterBtns = document.querySelectorAll("[data-filter]");

const countDisplay = document.getElementById("todo-count");

const progressBar = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

const themeToggle = document.getElementById("theme-toggle");


/* --------------------------
   2. APPLICATION STATE
-------------------------- */

let todos = JSON.parse(localStorage.getItem("apex-tasks")) || [];


/* --------------------------
   3. SAVE TO LOCAL STORAGE
-------------------------- */

function save() {

localStorage.setItem("apex-tasks", JSON.stringify(todos));

}


/* --------------------------
   4. RENDER FUNCTION
-------------------------- */

function render(filter = "all") {

list.innerHTML = "";

/* Filter tasks */
const filtered = todos.filter(todo => {

if (filter === "active") return !todo.completed;

if (filter === "completed") return todo.completed;

return true;

});


filtered.forEach(todo => {

const li = document.createElement("li");

li.className = `item ${todo.completed ? "completed" : ""}`;

li.dataset.id = todo.id;


/* Task HTML */

li.innerHTML = `

<span class="text" contenteditable="true">
${todo.text}
</span>

<div class="actions">

<button data-toggle>
${todo.completed ? "🔄 Undo" : "✔️ Complete"}
</button>

<button data-delete class="delete-btn">
🗑 Delete
</button>

</div>

`;

list.appendChild(li);

});

updateUI(filter);

}


/* --------------------------
   5. UPDATE UI
-------------------------- */

function updateUI(activeFilter) {

const activeCount = todos.filter(t => !t.completed).length;

countDisplay.innerHTML =
activeCount === 0 && todos.length > 0
? "🎉 All tasks complete!"
: `<strong>${activeCount}</strong> tasks remaining`;


/* Highlight active filter */

filterBtns.forEach(btn => {

btn.classList.toggle(
"active",
btn.dataset.filter === activeFilter
);

});


updateProgress();

}


/* --------------------------
   6. PROGRESS BAR
-------------------------- */

function updateProgress() {

if (todos.length === 0) {

progressBar.style.width = "0%";
progressText.textContent = "0% completed";

return;

}

const completed = todos.filter(t => t.completed).length;

const percent = Math.round((completed / todos.length) * 100);

progressBar.style.width = percent + "%";

progressText.textContent = percent + "% completed";

}


/* --------------------------
   7. ADD TASK
-------------------------- */

form.addEventListener("submit", e => {

e.preventDefault();

const text = input.value.trim();

if (!text) return;

const newTask = {

id: crypto.randomUUID(),
text: text,
completed: false

};

todos.push(newTask);

input.value = "";

save();
render();

});


/* --------------------------
   8. TOGGLE + DELETE
-------------------------- */

list.addEventListener("click", e => {

const li = e.target.closest(".item");
if (!li) return;

const id = li.dataset.id;


/* Toggle completion */

if (e.target.matches("[data-toggle]")) {

todos = todos.map(t =>
t.id === id
? { ...t, completed: !t.completed }
: t
);

}


/* Delete task */

else if (e.target.matches("[data-delete]")) {

todos = todos.filter(t => t.id !== id);

}

save();
render();

});


/* --------------------------
   9. INLINE EDITING
-------------------------- */

list.addEventListener("blur", e => {

if (e.target.classList.contains("text")) {

const id = e.target.closest(".item").dataset.id;

const newText = e.target.innerText.trim();

if (!newText) {

render();
return;

}

todos = todos.map(t =>
t.id === id
? { ...t, text: newText }
: t
);

save();

}

}, true);


/* ENTER finishes editing */

list.addEventListener("keydown", e => {

if (e.target.classList.contains("text") && e.key === "Enter") {

e.preventDefault();
e.target.blur();

}

});


/* --------------------------
   10. FILTER TASKS
-------------------------- */

document
.querySelector(".filters")
.addEventListener("click", e => {

if (e.target.dataset.filter) {

render(e.target.dataset.filter);

}

});


/* --------------------------
   11. CLEAR COMPLETED
-------------------------- */

clearBtn.addEventListener("click", () => {

todos = todos.filter(t => !t.completed);

save();
render();

});


/* --------------------------
   12. DARK MODE
-------------------------- */

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

});


/* --------------------------
   13. INITIAL LOAD
-------------------------- */

render();