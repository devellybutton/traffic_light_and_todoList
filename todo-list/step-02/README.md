# 📝 Todo List 구현 시 고려한 사항

## 1. 삭제 시 레이아웃이 흔들리는 문제

- 할 일 항목을 삭제할 때, 상단 텍스트<i>(예: `h1`, 안내 문구 등)</i>가 아래로 내려오는 문제가 발생함.
- 이는 삭제된 항목의 공간이 없어지면서 주변 요소들이 재배치되기 때문임.

### ✅ 해결 방법
- `.todo-list`를 감싸는 `wrapper` div를 새로 만들고, 고정된 `height`와 `width`를 지정함.

    ```html
    <div class="todo-list-wrapper">
    <div class="todo-list" id="todoList">
        <!-- todo items -->
    </div>
    </div>
    ```

    ```css
    .todo-list-wrapper {
    height: 400px;
    width: 500px;
    }
    ```

## 2. 삭제 버튼 클릭 시 특정 항목만 제거
- 할 일 목록과 삭제 버튼이 각각 여러 개 존재하므로, 클릭한 버튼에 해당하는 할 일 항목만 정확하게 제거해야함.

### ✅ 해결 방법
- `e.target.closest(".todo-item")`를 사용하여 클릭된 버튼을 기준으로 가장 가까운 `.todo-item` 요소를 탐색함.

    ```js
    const todoItem = e.target.closest(".todo-item");
    if (todoItem) {
    todoItem.classList.add("fade-out");
    setTimeout(() => {
        todoItem.remove();
    }, 500);
    }
    ```

### 📚 관련 공식 문서
- [Element.closest() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)

> - `closest()`는 선택자에 일치하는 요소를 찾을 때, 자기 자신부터 부모 방향으로 가장 가까운 요소를 반환함.
> - 이벤트 위임, 구조 탐색 시 유용함.