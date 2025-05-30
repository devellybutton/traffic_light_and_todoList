class TodoApp {
  constructor() {
    this.todoInput = document.getElementById("todoInput");
    this.addBtn = document.getElementById("addBtn");
    this.todoList = document.getElementById("todoList");

    this.init();
  }

  // 이벤트 리스너 초기화
  // 추가 -> 버튼 클릭 / 엔터
  init() {
    this.addBtn.addEventListener("click", () => this.addTodo());
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTodo();
    });
    this.attachEventListeners();
  }

  // 할일 목록 생성
  createTodo(text) {
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
      this.getCompleted(todoItem);
    });

    // 2) 삭제
    const deleteBtn = todoItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.deleteTodo(todoItem);
    });

    return todoItem;
  }

  // 목록 추가 (순차적으로 넣기)
  addTodo() {
    const text = this.todoInput.value.trim();
    if (text === "") return;

    const todoItem = this.createTodo(text);
    this.todoList.appendChild(todoItem);
    this.todoInput.value = "";
  }

  // 할 일 완료 처리
  getCompleted(todoItem) {
    todoItem.classList.toggle("completed");

    // 완료된 항목은 2초 후 자동 삭제
    if (todoItem.classList.contains("completed")) {
      setTimeout(() => {
        if (todoItem.classList.contains("completed")) {
          this.deleteTodo(todoItem);
        }
      }, 2000);
    }
  }

  // 할 일 삭제
  deleteTodo(todoItem) {
    todoItem.classList.add("fade-out");

    setTimeout(() => {
      if (todoItem.parentNode) {
        todoItem.parentNode.removeChild(todoItem);
        this.checkEmpty(); // 비어 있으면 안내문구 띄우기
      }
    }, 300);
  }

  checkEmpty() {
    if (this.todoList.children.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.textContent = "할일을 추가해보세요!";
      this.todoList.appendChild(emptyState);
    }
  }

  // 이미 있는 항목들에 대해서 이벤트 붙여주기
  // 현재 html에서 이미 로드되는 샘플 항목들 있음
  attachEventListeners() {
    const existingItems = this.todoList.querySelectorAll(".todo-item");
    existingItems.forEach((item) => {
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);

      // 이벤트 걸기
      // 1) 완료
      newItem.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) return;
        this.getCompleted(newItem);
      });

      // 2) 삭제
      const deleteBtn = newItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.deleteTodo(newItem);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
