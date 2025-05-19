const gridContainer = document.querySelector(".grid-container");

gridSize = 16;
isRandomColors = false;
toDarken = false;

const fragment = document.createDocumentFragment();
for (let i = 1; i <= gridSize; i++) {
    for (let j = 1; j <= gridSize; j++) {
        const gridPiece = document.createElement("div");
        gridPiece.id = `_${i}-${j}`;
        gridPiece.style.width = `${(gridContainer.offsetWidth - 2) / gridSize}px`;
        gridPiece.style.height = `${(gridContainer.offsetHeight - 2) / gridSize}px`;
        // gridPiece.style.width = `${598 / gridSize}px`;
        // gridPiece.style.height = `${598 / gridSize}px`;
        gridPiece.setAttribute("data-iscolored", "false");
        gridPiece.style.backgroundColor = "white";

        fragment.appendChild(gridPiece);
    }
}

gridContainer.appendChild(fragment);

gridContainer.addEventListener("mouseover", (e) => {
    const id = e.target.id;
    const piece = document.querySelector(`#${id}`);
    const bgColor = window.getComputedStyle(piece).getPropertyValue("background-color");
    console.log((bgColor));
    if (isRandomColors && !toDarken) {
        piece.style.backgroundColor = randomColor();
        piece.setAttribute("data-iscolored", "true")
    } else if (isRandomColors && toDarken) {
        console.log(piece.getAttribute("data-iscolored"));
        if (piece.getAttribute("data-iscolored") === "true") {
            const actualColor = window.getComputedStyle(piece).getPropertyValue("background-color");
            let splitIntoRGB = actualColor.slice(4, -1).split(",");
            const hslColor = rgbToHsl(...splitIntoRGB);
            console.log(hslColor);
            piece.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2] - 5}%)`
        } else {
            piece.style.backgroundColor = randomColor();
        }
        
    } else {    
        piece.style.backgroundColor = "black";
    }
    // if (toDarken) {
    //     const actualColor = window.getComputedStyle(piece).getPropertyValue("background-color");
    //     let splitIntoRGB = actualColor.slice(4, -1).split(",");
    //     const hslColor = rgbToHsl(...splitIntoRGB);
    //     console.log(hslColor);
    //     piece.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2] + 5}%)`
    // }

});

setGridNumberBtn = document.querySelector("#set-grid-number-btn");
console.log(setGridNumberBtn);

setGridNumberBtn.addEventListener("click", (e) => {
    gridSize = +prompt("Enter Grid Size:", 16);
    if (gridSize > 100) gridSize = 100;
    gridContainer.replaceChildren();
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= gridSize; i++) {
        for (let j = 1; j <= gridSize; j++) {
            const gridPiece = document.createElement("div");
            gridPiece.id = `_${i}-${j}`;
            gridPiece.style.width = `${(gridContainer.offsetWidth - 2) / gridSize}px`;
            gridPiece.style.height = `${(gridContainer.offsetHeight - 2) / gridSize}px`;
            gridPiece.style.backgroundColor = "white";
    
            fragment.appendChild(gridPiece);
        }
    }
    gridContainer.appendChild(fragment);
});

randomColorsBtn = document.querySelector("#randomize-color-btn");
randomColorsBtn.addEventListener("click", () => {
    if (isRandomColors) {
        isRandomColors = false;
        console.log("rainbow mode off");
    } else {
        isRandomColors = true;
        console.log("rainbow mode on");
    }
});


function randomColor() {
    const hue = Math.floor(Math.random() * 360  + 1);
    const saturation = Math.floor(Math.random() * 100 + 1);
    // const light = Math.floor(Math.random() * 100 + 1);
    return `hsl(${hue}, ${saturation}%, 50%)`;
}

const darkenBtn = document.querySelector("#darken-btn");
darkenBtn.addEventListener("click", (e) => {
    if (toDarken) { 
        toDarken = false;
        console.log("no dark");
    } else {
        toDarken = true;
        console.log("dark");
    }    
});

// Code rgbToHsl function was copied from https://www.30secondsofcode.org/js/s/rgb-hex-hsl-hsb-color-format-conversion/
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};