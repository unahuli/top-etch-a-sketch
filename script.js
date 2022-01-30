document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";

//Creating the RESET button
const button = document.createElement("button");
button.type = "button";
button.id = "reset";
button.textContent = "Reset";
button.style.margin = "10px";
document.body.append(button);

// Creating the div container
const divContainer = document.createElement("div");
divContainer.id = "grid-container";
divContainer.style.width = "600px";
divContainer.style.height = "600px"; 
divContainer.style.boxShadow = "0 0 20px 5px #393939";
divContainer.style.display = "flex";
divContainer.style.flexWrap = "wrap";
document.body.append(divContainer);

// // Creating the grid
// let gridSize = 16;

document.addEventListener("DOMContentLoaded", () => createGridPiece());

function createGridPiece(gridSize = 16) {
  const gridPiece = document.createElement("div");

  const gridPieceSize = Math.round(((divContainer.offsetHeight)/ gridSize) * 1000) / 1000;
  
  gridPiece.style.flex = `1 0 ${gridPieceSize}px`;
  gridPiece.setAttribute("data-mousepass", "0");
  gridPiece.classList.add("grid-piece");


  const fragment = document.createDocumentFragment();

  for (let row = 0; row < gridSize ** 2; row++) {
    fragment.appendChild(gridPiece.cloneNode());
  }
  divContainer.append(fragment);
}

button.addEventListener("click", resetButton);

divContainer.addEventListener("mouseover", changeColor);

function resetButton() {
    let getGridSize = function() {
      let keepAsking = true;
      while (keepAsking) {
        let size = +prompt("Enter grid size from 1-100: " ,16);
        if (size < 1 || size > 100 || !Number.isInteger(size)) {
          alert("Not Allowed");
          return;
        } else {
          return size;
        }
      }
    }

    let removeGrid = function() {
      while(divContainer.firstChild) {
        divContainer.removeChild(divContainer.lastChild);
      }
    }
    removeGrid();
    createGridPiece(getGridSize());
}  

function changeColor(evt) {
  const COLOR_RANGE = 256;
  const pass = +evt.target.getAttribute("data-mousepass");

  if (pass === 0) {
    const color = `rgb(${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE})`;
    evt.target.style.backgroundColor = color;
  } else if (pass > 0 && pass <= 10) {
    let val = 100 - (pass * 10);
    evt.target.style.filter = `brightness(${val}%)`;
  }

  evt.target.setAttribute("data-mousepass", `${pass+1}`);
}

