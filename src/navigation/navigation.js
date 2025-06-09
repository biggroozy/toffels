class Navigation {
  constructor() {
    this.counter = 0;
    this.btns = [...document.querySelectorAll(".nav-btn")];
    this.navCnt = document.querySelector(".navigation");
    this.sections = [...document.querySelectorAll(".config-side")];
  }

  init() {
    this.btns.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.id === "previous" && this.counter > 0) {
          this.counter -= 1;
        } else if (e.target.id === "next" && this.counter < 6) {
          this.counter += 1;
        }

        this.updateButtons();
        this.updateSections();
      });
    });
    this.updateButtons();
    this.updateSections();
  }

  updateButtons() {
    if (this.counter === 0) {
      this.btns[0].classList.remove("active");
      this.btns[1].classList.add("active");
    }
    if (this.counter === 6) {
      this.btns[1].classList.remove("active");
    }
    if (this.counter > 0 && this.counter < 6) {
      this.btns[0].classList.add("active");
      this.btns[1].classList.add("active");
    }
    if (this.counter < 6) {
      this.btns[1].classList.add("active");
    }
    if (this.counter === 0) {
      this.btns[0].classList.remove("active");
    }
  }
  updateSections() {
    this.sections.forEach((section, index) => {
      section.style.display = index === this.counter ? "block" : "none";
    });
  }
}
const app = new Navigation();
app.init();
