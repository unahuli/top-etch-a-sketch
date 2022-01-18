// Creating the div container
// Creating the grid
const GRID_SIZE = 16;

const gridPiece = document.createElement("div");

gridPiece.style.width = "30px";
gridPiece.style.backgroundColor = "black";
gridPiece.style.height = "30px";
gridPiece.style.border = "1px solid #C4C4C4";


const divContainer = document.createElement("div");
divContainer.style.width = "480px";
//`${GRID_SIZE * gridPiece.offsetWidth}`; // gridPiece width * GRID_SIZE
divContainer.style.height = "480px"; //gridPiece height * GRID_SIZE
divContainer.style.display = "flex";
divContainer.style.flexWrap = "wrap";
// divContainer.style.justifyContent = "center";
divContainer.id = "grid-container";
document.body.append(divContainer);



const fragment = document.createDocumentFragment();

for (let row = 0; row < GRID_SIZE ** 2; row++) {
  fragment.appendChild(gridPiece.cloneNode());
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
    
  // }
}
divContainer.append(fragment);