/**
 * Updated Render Function with Emojis
 */
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

        // Added Emojis for Toggle (Done/Undo) and Delete
        li.innerHTML = `
            <span class="text" contenteditable="true">
                ${todo.completed ? '✅ ' : '📝 '} ${todo.text}
            </span>
            <div class="actions">
                <button data-toggle title="${todo.completed ? 'Undo' : 'Complete'}">
                    ${todo.completed ? "🔄 Undo" : "✔️ Done"}
                </button>
                <button data-delete class="delete-btn" title="Delete Task">
                    🗑️ Delete
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    updateCount();
}

/**
 * Updated Count Display with Emojis
 */
function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    // Added a celebration emoji if all tasks are done!
    const emoji = activeCount === 0 && todos.length > 0 ? "🎉" : "⏳";
    countDisplay.innerHTML = `${emoji} <strong>${activeCount}</strong> items left`;
}