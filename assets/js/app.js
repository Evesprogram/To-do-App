// Week 6 – To-Do App Starter
// Requirements: CRUD + localStorage persistence

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = []; // { id, text, completed }

// TODO: Load todos from localStorage on page load
// TODO: Save todos to localStorage whenever todos changes

function render(filter = "all") {
  list.innerHTML = "";

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <span class="text">${todo.text}</span>
      <div class="actions">
        <button data-toggle>Toggle</button>
        <button data-delete>Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  // TODO: Add todo object with unique id
  // TODO: Save + re-render
  input.value = "";
});

// Toggle / Delete (event delegation)
list.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.matches("[data-toggle]")) {
    // TODO: Toggle completed for this id
    // TODO: Save + re-render
  }

  if (e.target.matches("[data-delete]")) {
    // TODO: Remove todo by id
    // TODO: Save + re-render
  }
});

// Filters
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  });
});

// Clear completed
clearCompletedBtn.addEventListener("click", () => {
  // TODO: Remove completed todos
  // TODO: Save + re-render
});

// Initial render
render("all");
