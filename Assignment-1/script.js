// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const clearBtn = document.getElementById("clear-completed");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let filter = "all";

  const save = () => localStorage.setItem("tasks", JSON.stringify(tasks));

  const render = () => {
    let filtered = tasks.filter((t) =>
      filter === "all"
        ? true
        : filter === "pending"
        ? !t.completed
        : t.completed
    );

    if (!filtered.length) {
      taskList.innerHTML = `
        <div class="empty-state">
          <div>📝</div>
          <p>${
            filter === "all"
              ? "No tasks yet. Add one above!"
              : filter === "pending"
              ? "No pending tasks. Great job!"
              : "No completed tasks yet."
          }</p>
        </div>`;
      clearBtn.style.display = "none";
      return;
    }

    taskList.innerHTML = filtered
      .map(
        (t) => `
        <li class="task-item ${t.completed ? "completed" : ""}" data-id="${
          t.id
        }">
          <input type="checkbox" class="task-checkbox" ${
            t.completed ? "checked" : ""
          }>
          <span class="task-text">${t.text}</span>
          <button class="delete-btn">×</button>
        </li>`
      )
      .join("");

    clearBtn.style.display = tasks.some((t) => t.completed)
      ? "inline-block"
      : "none";
  };

  const addTask = () => {
    let text = taskInput.value.trim();
    if (!text) return alert("Please enter a task!");
    tasks.push({ id: Date.now(), text, completed: false });
    save();
    render();
    taskInput.value = "";
    taskInput.focus();
  };

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => e.key === "Enter" && addTask());

  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    })
  );

  clearBtn.addEventListener("click", () => {
    tasks = tasks.filter((t) => !t.completed);
    save();
    render();
  });

  // Event delegation for toggle & delete
  taskList.addEventListener("click", (e) => {
    const id = +e.target.closest(".task-item")?.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("task-checkbox")) {
      tasks = tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
    } else if (e.target.classList.contains("delete-btn")) {
      tasks = tasks.filter((t) => t.id !== id);
    }
    save();
    render();
  });

  render();
});
