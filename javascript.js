const gridContainer = document.querySelector(".grid-container");


gridSize = 64;


const fragment = document.createDocumentFragment();
for (let i = 1; i <= gridSize; i++) {
    for (let j = 1; j <= gridSize; j++) {
        const gridPiece = document.createElement("div");
        gridPiece.id = `_${i}-${j}`;
        gridPiece.style.width = `${gridContainer.offsetWidth / gridSize}px`;
        gridPiece.style.height = `${gridContainer.offsetHeight / gridSize}px`;
        gridPiece.style.backgroundColor = "black";

        fragment.appendChild(gridPiece);
    }
}

gridContainer.appendChild(fragment);

gridContainer.addEventListener("mouseover", (e) => {
    const id = e.target.id;
    const piece = document.querySelector(`#${id}`);
    piece.style.backgroundColor = "yellow";

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
            gridPiece.style.width = `${gridContainer.offsetWidth / gridSize}px`;
            gridPiece.style.height = `${gridContainer.offsetHeight / gridSize}px`;
            gridPiece.style.backgroundColor = "black";
    
            fragment.appendChild(gridPiece);
        }
    }
    gridContainer.appendChild(fragment);
});


