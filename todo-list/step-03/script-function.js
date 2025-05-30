const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const createTodo = (text) => {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  todoItem.innerHTML = `
                    <div class="diamond"></div>
                    <span class="todo-text">${text}</span>
                    <button class="delete-btn">×</button>
                `;

  // 이벤트 걸기
  // 1) 완료
  todoItem.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) return;
    getCompleted(todoItem);
  });

  // 2) 삭제
  const deleteBtn = todoItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTodo(todoItem);
  });

  return todoItem;
};

const addTodo = () => {
  const text = todoInput.value.trim();
  if (text === "") return;

  const emptyState = todoList.querySelector(".empty-state");
  if (emptyState) emptyState.remove();

  const todoItem = createTodo(text);
  todoList.appendChild(todoItem);
  todoInput.value = "";
};

// 할 일 삭제
const deleteTodo = (todoItem) => {
  todoItem.classList.add("fade-out");

  setTimeout(() => {
    if (todoItem.parentNode) {
      todoItem.parentNode.removeChild(todoItem);
      checkEmpty(); // 비어 있으면 안내문구 띄우기
    }
  }, 300);
};

const getCompleted = (todoItem) => {
  todoItem.classList.toggle("completed");

  // 완료된 항목은 2초 후 자동 삭제
  if (todoItem.classList.contains("completed")) {
    setTimeout(() => {
      if (todoItem.classList.contains("completed")) {
        deleteTodo(todoItem);
      }
    }, 2000);
  }
};

const checkEmpty = () => {
  if (todoList.children.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "할일을 추가해보세요!";
    todoList.appendChild(emptyState);
  }
};

const attachEventListeners = () => {
  const existingItems = todoList.querySelectorAll(".todo-item");
  existingItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);

    // 이벤트 걸기
    // 1) 완료
    newItem.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      getCompleted(newItem);
    });

    // 2) 삭제
    const deleteBtn = newItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(newItem);
    });
  });
};

// 페이지 로딩시 실행
const init = () => {
  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });
  attachEventListeners();
};

document.addEventListener("DOMContentLoaded", init);
