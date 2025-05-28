const light = document.querySelector(".light");
const lightsContainer = document.querySelector(".traffic-container");
const startButton = document.querySelector(".start-button");
const countdownElement = document.getElementById("countdown");

let isButtonOn = false;

// 카운트 다운 3 -> 2 -> 1
function countdown() {
  // 카운트 다운 3 -> 2 -> 1
  countdownElement.style.display = "block";
  countdownElement.textContent = "3";
  let countdown = 3;

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    // 카운트 다운 끝나면 숫자 다시 숨기기
    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownElement.style.display = "none";
    }
  }, 1000);
}

// 시작 버튼 누르면
// 1) 모든 사용자 입력이 막힘 (버튼 눌러도 신호등 색 변화 없음)
// 2) 3초 뒤에 순차적으로 불이 들어옴 (간격 1초씩)
startButton.addEventListener("click", function () {
  isButtonOn = true;

  if (isButtonOn) {
    light.style.pointerEvents = "none";
  }

  countdown();

  light.addEventListener("click", function () {
    this.classList.remove("focus");
  });

  setTimeout(() => {
    light.classList.add("red", "focus");

    setTimeout(() => {
      light.classList.add("yellow", "focus");

      setTimeout(() => {
        light.classList.add("green", "focus");

        // 3초 뒤에 동시에 꺼짐
        setTimeout(() => {
          light.classList.remove("red", "yellow", "green", "focus");
        }, 3000);
      }, 1000);
    }, 1000);
  }, 3000);
});
