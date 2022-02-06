document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";

// Creating the div container
const canvasContainer = document.querySelector("#canvas-container");
const divContainer = document.createElement("div");
divContainer.id = "grid-container";
divContainer.style.backgroundColor = "white";
divContainer.style.width = "600px";
divContainer.style.height = "600px"; 
divContainer.style.boxShadow = "0 0 10px 3px #393939";
divContainer.style.display = "flex";
divContainer.style.flexWrap = "wrap";
const sliderContainer = document.querySelector("#slider-container");
// console.log(sliderContainer);
// const slide = 
// console.log(canvasContainer.lastElementChild)
canvasContainer.firstChild.before(divContainer);


//Creating the RESET button
// const button = document.createElement("button");
// button.type = "button";
// button.id = "reset";
// button.textContent = "Reset";
// button.style.margin = "10px";
// sliderContainer.append(button);

// // Creating the grid
// let gridSize = 16;

// grid slider and input
const slider = document.querySelector("#grid-size-slider");
const input = document.querySelector("#slide-value");

slider.addEventListener("input", (evt) => {
  resizeGrid(evt, input);
});

input.addEventListener("change", (evt) => {
  resizeGrid(evt, slider);
});

function resizeGrid(evt, altResizer) {
  const eventResizer = evt.currentTarget;
  const eventResizerValue = eventResizer.validity.valid ? eventResizer.value : 16;
  // console.log(eventResizerValue);
  // console.log(eventResizer.validity.valid);
  const passResizeValue = (evtResizerVal, altResizer) => {
    altResizer.value = evtResizerVal;
  }
  let removeGrid = function() {
    while(divContainer.firstChild) {
      divContainer.removeChild(divContainer.lastChild);
    }
  }
  passResizeValue(eventResizerValue,altResizer);
  removeGrid();
  createGridPiece(eventResizerValue);
}

//

document.addEventListener("DOMContentLoaded", () => createGridPiece());


divContainer.addEventListener("mouseover", setGridPieceColor);

function createGridPiece(gridSize = 16) {
  const gridPiece = document.createElement("div");

  const gridPieceSize = Math.round(((divContainer.offsetHeight)/ gridSize) * 1000) / 1000;
  
  gridPiece.style.flex = `1 0 ${gridPieceSize}px`;
  gridPiece.setAttribute("data-mousepass", "0");
  // gridPiece.setAttribute("data-colored", "");
  // console.log(gridPiece.getAttribute("data-mousepass"));
  gridPiece.classList.add("grid-piece");


  const fragment = document.createDocumentFragment();

  for (let row = 0; row < gridSize ** 2; row++) {
    fragment.appendChild(gridPiece.cloneNode());
  }
  divContainer.append(fragment);
}

const clearBtn = document.querySelector("#clear-btn");

clearBtn.addEventListener("click", clearGrid);

function clearGrid() {
    // let getGridSize = function() {
    //   let keepAsking = true;
    //   while (keepAsking) {
    //     let size = +prompt("Enter grid size from 1-100: " ,16);
    //     if (size < 1 || size > 100 || !Number.isInteger(size)) {
    //       alert("Not Allowed");
    //       return;
    //     } else {
    //       return size;
    //     }
    //   }
    // }

    // let removeGrid = function() {
    //   while(divContainer.firstChild) {
    //     divContainer.removeChild(divContainer.lastChild);
    //   }
    // }
    // removeGrid();
    // createGridPiece(getGridSize());
    const gridPieces = document.querySelectorAll(".grid-piece");
    gridPieces.forEach(piece => {
      piece.style.backgroundColor = "transparent";
      piece.style.filter = "none";
      piece.dataset.mousepass = "0";

    })
}  

function setGridPieceColor(evt) {

  const COLOR_RANGE = 256;

  let pass = +evt.target.getAttribute("data-mousepass");
  //rgb to hex code credits to Erick Petrucelli of StackOverflow 
  // https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
  
  // const currentColor = rgbaToHex(evt.target.style.backgroundColor);
  // console.log(evt.target.style.backgroundColor);

  // let color = pickColor();  
  // console.log(color);
  // console.log(rainbowMode);

  const randomColorGenerator = function() {
    color = `rgb(${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE})`;
  }

  // if (currentColor !== color && !rainbowMode && pass > 0) {
  //   evt.target.setAttribute("data-mousepass", `0`);
  //   evt.target.style.filter = `brightness(100%)`;
  // }

  const currentColor = rgbaToHex(window.getComputedStyle(evt.target).getPropertyValue('background-color'));



  const selectFilter = function(selectedFilterMode){
    
    
    if (selectedFilterMode === FILTER_MODES[0]) {
      evt.target.style.filter = "none";
      evt.target.setAttribute("data-mousepass", `${pass=1}`);
      return;
    }


    // let filter = selectedFilterMode;

    let appliedFilter = window.getComputedStyle(evt.target).getPropertyValue('filter');
    console.log(appliedFilter);
    let endPosition;
    let filterName = FILTER_MODES[0];
    if (appliedFilter !== FILTER_MODES[0]) {
      endPosition = appliedFilter.indexOf("(");
      filterName = appliedFilter.substring(0,endPosition);
    } 
    console.log(filterName);
    console.log(selectedFilterMode);
    // if (currentFilter === 'none') {
    //   currentFilter = '';
    // }

    // if appliedFilter is not none and selected filter is not equal to the appliedFilter
    if (
        (filterName !== FILTER_MODES[0] && selectedFilterMode !== filterName )
      ||(currentColor !== "#00000000" && currentColor !== color && !randomModeEnabled)
      ) {

      evt.target.setAttribute("data-mousepass", `${pass=0}`);
      evt.target.style.filter = "none";
    }

    if (pass > 0 && pass <= 10) {
      if (selectedFilterMode === FILTER_MODES[1]) {
        // evt.target.style.filter = `brightness(${100}%)`; 
        increaseSaturation(pass);
      } else if (selectedFilterMode === FILTER_MODES[2]) {
        decreaseBrightness(pass);
      }
    }

  evt.target.setAttribute("data-mousepass", `${pass+1}`);

  }

  const increaseSaturation = function(pass) {
    let saturationValue = 100 + (pass * 20);
    evt.target.style.filter = `saturate(${saturationValue}%)`;
  }

  const decreaseBrightness = function(pass) {
    let brightnessValue = 100 - (pass * 10);
    // evt.target.style.filter = "none";
    evt.target.style.filter = `brightness(${brightnessValue}%)`;
  }

  

  // if (rainbowModeEnabled) {
  //     rainbowColorGenerator();
  //     // evt.target.setAttribute("data-mousepass", `${pass = 0}`);
  //     let colored = evt.target.getAttribute("data-colored");
  //     if(colored === "true") {
  //       evt.target.setAttribute("data-mousepass", `${pass = 0}`);
  //       evt.target.setAttribute("data-colored", "false");
  //     }
  //     if (pass === 0) {
  //       evt.target.style.backgroundColor = color;
  //     } else if (pass > 0 && pass <= 10) {
  //       let brightnessValue = 100 - (pass * 10);
  //       evt.target.style.filter = `brightness(${brightnessValue}%)`;
  //     }
  // } else if(!rainbowModeEnabled) {

  //   if (pass === 0 || (currentColor !== color && (!rainbowModeEnabled))){
  //     evt.target.setAttribute("data-colored", "true");
  //     evt.target.style.backgroundColor = color;
  //     evt.target.style.filter = `saturate(${100}%)`
  //     evt.target.setAttribute("data-mousepass", `${pass = 0}`); 

  //   } else if (pass > 0 && pass <= 10) {
  //     let saturationValue = 100 + (pass * 20);
  //     evt.target.style.filter = `saturate(${saturationValue}%)`; 
  //   }

  // let colored = evt.target.getAttribute("data-colored");
  // if (colored === "true") {
  //   evt.target.setAttribute("data-colored","false"); 
  //   evt.target.setAttribute("data-mousepass", `${pass=0}`);
  // }
  if (randomModeEnabled) {
      randomColorGenerator();
      evt.target.style.backgroundColor = color;
  } else if (!randomModeEnabled){
    evt.target.style.backgroundColor = color;
    // evt.target.setAttribute("data-colored","false");
  }

  selectFilter(currentFilter);
  
  
  
  // evt.target.setAttribute("data-mousepass", `${pass+1}`);
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

// color picker

const picker = document.querySelector("#color-picker");
picker.addEventListener("input", getPickerColor);


let color = picker.value;

function getPickerColor(evt) {
  color = evt.target ? evt.target.value : evt.value;
  randomModeEnabled = false;
}


//rainbow function
let randomModeEnabled = false;

const randomBtn = document.querySelector("#random-mode-btn");
randomBtn.addEventListener("click", toggleRandomMode);

function toggleRandomMode(){
  randomModeEnabled = !randomModeEnabled;
  color = !randomModeEnabled ? picker.value : color;
  // console.log(rainbowMode);
}

const rgbaToHex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => 
  (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

  // console.log(rgbaToHex('rgb(0,0,0)'));

  const FILTER_MODES = ["none", "saturate", "brightness"]; 

  let currentFilter = FILTER_MODES[0];

  const saturateBtn = document.querySelector("#saturation-filter-btn");
  const darkenBtn = document.querySelector("#brightness-filter-btn");

  saturateBtn.addEventListener("click", () => {
    if (currentFilter !== FILTER_MODES[1]){
      currentFilter = FILTER_MODES[1];
    } else {
      currentFilter = FILTER_MODES[0];
    } 
    // console.log(currentFilter);
  });

  darkenBtn.addEventListener("click", () => {
    if (currentFilter !== FILTER_MODES[2]){
      currentFilter = FILTER_MODES[2];
    } else {
      currentFilter = FILTER_MODES[0];
    }
    // console.log(currentFilter);
  });


// eraser btn function
const eraserBtn = document.querySelector("#eraser-btn");
eraserBtn.addEventListener("click", eraseBackgroundColor)

function eraseBackgroundColor(evt) {
    color = "transparent";
    evt.target.style.filter = "none";
    randomModeEnabled = false;
}

//color btn function
const colorBtn = document.querySelector("#single-color-btn");
colorBtn.addEventListener("click", (evt) => {
  getPickerColor(picker);
});