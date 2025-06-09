import { updateProp, getTableProps } from "../controllers/tableStore";
import { updateModel } from "../controllers/updateModel";
import { allShapes } from "../controllers/tablesTable";

let listenersInitialized = false;

function renderShapeButtons() {
  const container = document.getElementById("shapeButtonsContainer");
  if (!container) return;

  container.innerHTML = ""; // Czyść kontener

  allShapes.forEach((shape) => {
    const box = document.createElement("div");
    box.classList.add("shape-image-box");
    box.dataset.shape = shape.name;

    const img = document.createElement("img");
    img.src = shape.path;
    img.alt = shape.name;

    box.appendChild(img);
    container.appendChild(box);
  });
}
renderShapeButtons();

function attachShapeButtonListeners() {
  if (listenersInitialized) return;
  listenersInitialized = true;

  document.querySelectorAll(".shape-image-box").forEach((item) => {
    item.addEventListener("click", () => {
      const shape = allShapes.find((s) => s.name === item.dataset.shape);
      const current = getTableProps();

      updateProp("shapeId", shape.id);
      setActive(".shape-image-box", "shape", shape.name);
      // toggleWidthInputVisibility(shape.name);
      // updateModel();
    });
  });
}

attachShapeButtonListeners();

//Do ustawiania aktywnych opcji
function setActive(selector, dataKey, value) {
  document.querySelectorAll(selector).forEach((el) => {
    if (el.dataset[dataKey] === value) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

//Do ukrywania/wyświetlania suwaków w UI
function toggleWidthInputVisibility(topShape) {
  const widthInputGroup = document.querySelector('[data-group="width"]');
  const shouldHide = topShape === "round" || topShape === "square";
  if (widthInputGroup) {
    widthInputGroup.style.display = shouldHide ? "none" : "flex";
  }
}

//Pierwsze sprawdzenie blatu
toggleWidthInputVisibility(getTableProps().topShape);

// Ustawienie domyślnych wartości z tableStore do HTML inputów
const defaults = getTableProps();
setActive(".shape-image-box", "shape", defaults.topShape);
setActive(".material-preview", "material", defaults.material);
setActive(".color-preview", "color", defaults.color);
setActive(".bevel-item", "bevel", defaults.bevel);

for (const key in defaults) {
  const input = document.querySelector(`[name="${key}"]`);
  if (input && input.tagName === "INPUT") {
    input.value = defaults[key];
    updateProp(key, parseFloat(input.value));
  }
}

// Inicjalizacja nasłuchiwania na inputy liczbowo-wymiarowe
["length", "width", "thick", "height"].forEach((key) => {
  const input = document.querySelector(`[name="${key}"]`);
  if (!input) return;

  input.addEventListener("input", () => {
    updateProp(key, parseFloat(input.value));
  });
});

//Zmiana materiału/tekstury
[...document.querySelectorAll(".material-preview")].forEach((item) => {
  item.addEventListener("click", () => {
    const material = item.dataset.material;
    updateProp("material", material);
    setActive(".material-preview", "material", material);
  });
});
//Zmiana koloru tekstury
[...document.querySelectorAll(".color-preview")].forEach((item) => {
  item.addEventListener("click", () => {
    const color = item.dataset.color;
    updateProp("color", color);
    setActive(".color-preview", "color", color);
  });
});
[...document.querySelectorAll(".bevel-item")].forEach((item) => {
  item.addEventListener("click", () => {
    const bevel = item.dataset.bevel;
    updateProp("bevel", bevel);
    setActive(".bevel-item", "bevel", bevel);
    updateModel();
  });
});
