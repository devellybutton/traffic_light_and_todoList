const lights = document.querySelectorAll(".light");
const lightsContainer = document.querySelector(".traffic-container");

// 신호등을 클릭하면 불이 켜졌다 꺼진다.
lights.forEach((light) => {
  light.addEventListener("click", function () {
    this.classList.toggle("focus");
  });
});

// 신호등 바깥 영역에 마우스를 갖다대면 다시 리셋되도록
document.addEventListener("mouseover", function (e) {
  if (!lightsContainer.contains(e.target)) {
    lights.forEach((light) => {
      light.classList.remove("focus");
    });
  }
});
