const lights = document.querySelectorAll(".light");
const lightsContainer = document.querySelector(".traffic-container");
const startButtonAll = document.querySelector(".start-button.all");
const startButtonEach = document.querySelector(".start-button.each");

let isButtonOn = false;

// 신호등을 클릭하면 불이 켜졌다 꺼진다
lights.forEach((light) => {
  light.addEventListener("click", function () {
    this.classList.toggle("focus");
  });
});

// 시작 버튼 누르면
// 1) 모든 사용자 입력이 막힘 (버튼 눌러도 신호등 색 변화 없음)
// 2) 3초 뒤에 불이 들어옴
startButtonAll.addEventListener("click", function () {
  isButtonOn = true;

  if (isButtonOn) {
    lights.forEach((light) => {
      light.style.pointerEvents = "none";
    });
  }

  lights.forEach((light) => {
    light.addEventListener("click", function () {
      this.classList.remove("focus");
    });
  });

  setTimeout(() => {
    lights.forEach((light) => {
      light.classList.add("focus");
    });

    // 3초 뒤에 동시에 꺼짐
    setTimeout(() => {
      lights.forEach((light) => {
        light.classList.remove("focus");
      });
    }, 3000);
  }, 3000);
});

// 시작 버튼 누르면
// 1) 모든 사용자 입력이 막힘 (버튼 눌러도 신호등 색 변화 없음)
// 2) 3초 뒤에 순차적으로 불이 들어옴 (간격 1초씩)
startButtonEach.addEventListener("click", function () {
  isButtonOn = true;

  if (isButtonOn) {
    lights.forEach((light) => {
      light.style.pointerEvents = "none";
    });
  }

  lights.forEach((light) => {
    light.addEventListener("click", function () {
      this.classList.remove("focus");
    });
  });

  const redLight = document.querySelector(".light.red");
  const yellowLight = document.querySelector(".light.yellow");
  const greenLight = document.querySelector(".light.green");

  setTimeout(() => {
    redLight.classList.add("focus");

    setTimeout(() => {
      yellowLight.classList.add("focus");

      setTimeout(() => {
        greenLight.classList.add("focus");

        // 3초 뒤에 동시에 꺼짐
        setTimeout(() => {
          lights.forEach((light) => {
            light.classList.remove("focus");
          });
        }, 3000);
      }, 1000);
    }, 1000);
  }, 3000);
});
