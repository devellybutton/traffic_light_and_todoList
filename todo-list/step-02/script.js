const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // 클릭된 요소의 가장 가까운 상위 요소 제거
    const todoItem = e.target.closest(".todo-item");
    if (!todoItem) return;

    // 1) 사라지는 효과
    todoItem.classList.add("fade-out");

    // 2) 0.5초 후 완전히 제거
    setTimeout(() => {
      todoItem.remove();
    }, 500);
  });
});
