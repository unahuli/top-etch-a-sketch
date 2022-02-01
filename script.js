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

button.addEventListener("click", reset);

divContainer.addEventListener("mouseover", setGridPieceColor);

function createGridPiece(gridSize = 16) {
  const gridPiece = document.createElement("div");

  const gridPieceSize = Math.round(((divContainer.offsetHeight)/ gridSize) * 1000) / 1000;
  
  gridPiece.style.flex = `1 0 ${gridPieceSize}px`;
  gridPiece.setAttribute("data-mousepass", "0");
  console.log(gridPiece.getAttribute("data-mousepass"));
  gridPiece.classList.add("grid-piece");


  const fragment = document.createDocumentFragment();

  for (let row = 0; row < gridSize ** 2; row++) {
    fragment.appendChild(gridPiece.cloneNode());
  }
  divContainer.append(fragment);
}


function reset() {
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

function setGridPieceColor(evt) {

  const COLOR_RANGE = 256;

  //rgb to hex code credits to Erick Petrucelli of StackOverflow 
  // https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
  
  // const currentColor = rgbaToHex(evt.target.style.backgroundColor);
  // console.log(evt.target.style.backgroundColor);

  const color = pickColor();  
  // console.log(color);
  // console.log(rainbowMode);

  const rainbowColorGenerator = function() {
    color = `rgb(${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE})`;
  }

  // if (currentColor !== color && !rainbowMode && pass > 0) {
  //   evt.target.setAttribute("data-mousepass", `0`);
  //   evt.target.style.filter = `brightness(100%)`;
  // }

  const currentColor = rgbaToHex(window.getComputedStyle(evt.target).getPropertyValue('background-color'));
  // console.log(currentColor);
  // console.log(typeof currentColor);
  // console.log(rgbaToHex(window.getComputedStyle(evt.target).getPropertyValue('background-color')));

  let pass = +evt.target.getAttribute("data-mousepass");
  // let val = 0;
  if (pass === 0 || (currentColor !== color && (!rainbowModeEnabled))){
    evt.target.style.backgroundColor = color;
    evt.target.style.filter = `saturate(${100}%)`
    evt.target.setAttribute("data-mousepass", `${pass = 0}`);
    // evt.target.style.filter = `opacity(20%)`;
    // let blurValue = pass * 2;
    // evt.target.style.filter = `blur(${2}px)`;
    // evt.target.style.filter = `drop-shadow(.5rem .5rem 10rem)`;

  } else if (pass > 0 && pass <= 10) {
    evt.target.style.backgroundColor = color;
    let brightnessValue = 100 - (pass * 10);
    evt.target.style.filter = `brightness(${brightnessValue}%)`;
    let saturationValue = 100 + (pass * 15);
    evt.target.style.filter = `saturate(${saturationValue}%)`; 
     
    // evt.target.setAttribute("data-mousepass", `${pass+1}`);
  }

  evt.target.setAttribute("data-mousepass", `${pass+1}`);
  // if (pass === 0) {
  //   if (rainbowMode) {
  //     rainbowColorGenerator();
  //     evt.target.style.backgroundColor = color;
  //   } else {
  //     evt.target.style.backgroundColor = color;
  //   }
  // } else if (pass > 0 && pass <= 10) {
  //   let brightnessValue = 100 - (pass * 10);
  //   // let saturationValue = 100 + (pass * 5);
  //   evt.target.style.filter = `brightness(${brightnessValue}%)`;
  //   // evt.target.style.filter = `saturate(${saturationValue}%)`;
  // } 

  // if (rainbowMode) {
  //   rainbowColorGenerator();
  //   evt.target.style.backgroundColor = color;
  // } else {
  //   evt.target.style.backgroundColor = color;
  // }


  // 
}

function pickColor() {
  const picker = document.querySelector("#color-picker");
  let color = picker.value;
  // console.log(color);
  // picker.addEventListener("input", (evt) => {
  //   color = evt.target.type.value;
  //   rainbowMode = false;
  // })
  return color;
}

//rainbow function
let rainbowModeEnabled = false;

const rainbowBtn = document.querySelector("#rainbow-mode");
rainbowBtn.addEventListener("click", toggleRainbowMode);

function toggleRainbowMode(){
  rainbowModeEnabled = !rainbowModeEnabled;
  // console.log(rainbowMode);
}

/**
change color of the grid part
when you pick a new color
reset pass to 0
 */

const rgbaToHex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => 
  (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

  // console.log(rgbaToHex('rgb(0,0,0)'));