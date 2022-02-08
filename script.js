// Creating the div/grid container
const canvasContainer = document.querySelector("#canvas-container");
const divContainer = document.createElement("div");
divContainer.id = "grid-container";
divContainer.style.backgroundColor = "white";
divContainer.style.width = "600px";
divContainer.style.height = "600px"; 
divContainer.style.boxShadow = "0 0 10px 3px #393939";
divContainer.style.display = "flex";
divContainer.style.flex = "1 0 auto";
divContainer.style.flexWrap = "wrap";
const sliderContainer = document.querySelector("#slider-container");
canvasContainer.firstChild.before(divContainer);

//create grid after loading html document
document.addEventListener("DOMContentLoaded", () => createGridPiece());

function createGridPiece(gridSize = gridSizeInput.value) {
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

// Event Listener for changing the grid pieces' color when the mouse pointer passes through

divContainer.addEventListener("mouseover", setGridPieceColor);

/** Coloring Buttons Section */

// color picker
const picker = document.querySelector("#color-picker");
picker.addEventListener("input", getPickerColor);

let color = picker.value;

function getPickerColor(evt) {
  color = evt.target ? evt.target.value : evt.value;
}

//color btn function
const colorBtn = document.querySelector("#single-color-btn");
colorBtn.addEventListener("click", (evt) => {
  getPickerColor(picker);
  randomModeEnabled = false;
  toggleFocusedClass(evt.currentTarget);
});

//random mode function
let randomModeEnabled = false;

const randomBtn = document.querySelector("#random-mode-btn");
randomBtn.addEventListener("click", enableRandomMode);

function enableRandomMode(evt){
  randomModeEnabled = true;
  toggleFocusedClass(evt.currentTarget);
}

// eraser btn function
const eraserBtn = document.querySelector("#eraser-btn");
eraserBtn.addEventListener("click", eraseBackgroundColor)

function eraseBackgroundColor(evt) {
    color = "transparent";
    evt.target.style.filter = "none";
    randomModeEnabled = false;
    toggleFocusedClass(evt.currentTarget);
}

/**Filter Buttons Section */

const FILTER_MODES = ["none", "saturate", "brightness"]; 

let currentFilter = FILTER_MODES[0];

const saturateBtn = document.querySelector("#saturation-filter-btn");
const darkenBtn = document.querySelector("#brightness-filter-btn");

saturateBtn.addEventListener("click", (evt) => {
  if (currentFilter !== FILTER_MODES[1]){
    currentFilter = FILTER_MODES[1];
  } else {
    currentFilter = FILTER_MODES[0];
  } 
  toggleFocusedClass(evt.currentTarget);
});

darkenBtn.addEventListener("click", (evt) => {
  if (currentFilter !== FILTER_MODES[2]){
    currentFilter = FILTER_MODES[2];
  } else {
    currentFilter = FILTER_MODES[0];
  }
  toggleFocusedClass(evt.currentTarget);
});

/** Range and Number Inputs for resizing the grid */

const gridSizeSlider = document.querySelector("#grid-size-slider");
const gridSizeInput = document.querySelector("#slide-value");

gridSizeSlider.addEventListener("input", (evt) => {
  resizeGrid(evt, gridSizeInput);
});

gridSizeInput.addEventListener("change", (evt) => {
  resizeGrid(evt, gridSizeSlider);
});

function resizeGrid(evt, altResizer) {
  const eventResizer = evt.currentTarget;
  const eventResizerValue = eventResizer.validity.valid ? eventResizer.value : 16;
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

/**Clear Button */

const clearBtn = document.querySelector("#clear-btn");

clearBtn.addEventListener("click", clearGrid);

function clearGrid() {
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
  
  const randomColorGenerator = function() {
    color = `rgb(${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE}, ${Math.random() * COLOR_RANGE})`;
  }

  const currentColor = rgbaToHex(window.getComputedStyle(evt.target).getPropertyValue('background-color'));

  const selectFilter = function(selectedFilterMode){   
    
    if (selectedFilterMode === FILTER_MODES[0]) {
      evt.target.style.filter = "none";
      evt.target.setAttribute("data-mousepass", `${pass=1}`);
      return;
    }

    let appliedFilter = window.getComputedStyle(evt.target).getPropertyValue('filter');
    let endPosition;
    let filterName = FILTER_MODES[0];
    if (appliedFilter !== FILTER_MODES[0]) {
      endPosition = appliedFilter.indexOf("(");
      filterName = appliedFilter.substring(0,endPosition);
    } 


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
    evt.target.style.filter = `brightness(${brightnessValue}%)`;
  }

  if (randomModeEnabled) {
      randomColorGenerator();
      evt.target.style.backgroundColor = color;
  } else if (!randomModeEnabled){
    evt.target.style.backgroundColor = color;
  }

  selectFilter(currentFilter);
  
}


  //rgb to hex code credits to Erick Petrucelli of StackOverflow 
  // https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
const rgbaToHex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => 
  (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;


//toggle focus class 
function toggleFocusedClass(elem) {
  const focusedElem = document.querySelector(`#${elem.parentElement.id} > .focused`);
  if (focusedElem && focusedElem !== elem) {
    focusedElem.classList.remove("focused");
  }
  if (elem.parentElement.id === "filter-container") {
    elem.classList.toggle("focused");
  } else {
    elem.classList.add("focused");
  }
}