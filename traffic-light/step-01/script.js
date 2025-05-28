const lights = document.querySelectorAll(".light");

lights.forEach((light) => {
  light.addEventListener("mouseenter", function () {
    this.classList.add("focus");
    console.log("hover on");
  });

  light.addEventListener("mouseleave", function () {
    this.classList.remove("focus");
    console.log("hover off");
  });
});
