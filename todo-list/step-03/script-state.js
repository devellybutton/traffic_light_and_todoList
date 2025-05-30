const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// 👉 상태 배열
let todos = [];

const renderTodos = () => {
  todoList.innerHTML = ""; // 초기화

  if (todos.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "할일을 추가해보세요!";
    todoList.appendChild(empty);
    return;
  }

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    if (todo.completed) todoItem.classList.add("completed");

    todoItem.innerHTML = `
      <div class="diamond"></div>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn">×</button>
    `;

    // 완료 토글
    todoItem.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      toggleComplete(index);
    });

    // 삭제
    const deleteBtn = todoItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(index);
    });

    todoList.appendChild(todoItem);
  });
};

const addTodo = () => {
  const text = todoInput.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  todoInput.value = "";
  renderTodos();
};

const deleteTodo = (index) => {
  // 애니메이션 후 삭제
  const todoItem = todoList.children[index];
  todoItem.classList.add("fade-out");

  setTimeout(() => {
    todos.splice(index, 1);
    renderTodos();
  }, 300);
};

const toggleComplete = (index) => {
  todos[index].completed = !todos[index].completed;
  renderTodos();

  // 완료된 항목이면 2초 후 삭제
  if (todos[index].completed) {
    setTimeout(() => {
      if (todos[index] && todos[index].completed) {
        todos.splice(index, 1);
        renderTodos();
      }
    }, 2000);
  }
};

const init = () => {
  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  renderTodos(); // 초기 렌더링
};

document.addEventListener("DOMContentLoaded", init);
