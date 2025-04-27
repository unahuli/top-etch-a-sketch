const gridContainer = document.querySelector(".grid-container");


gridSize = 40;

console.log(gridContainer.offsetHeight / gridSize);


for (let i = 1; i <= gridSize; i++) {
    for (let j = 1; j <= gridSize; j++) {
        const gridPiece = document.createElement("div");
        gridPiece.id = `_${i}-${j}`;
        gridPiece.style.width = `${gridContainer.offsetWidth / gridSize}px`;
        gridPiece.style.height = `${gridContainer.offsetHeight / gridSize}px`;
        gridPiece.style.backgroundColor = "black";

        gridContainer.appendChild(gridPiece);
    }
}

gridContainer.addEventListener("mouseover", (e) => {
    const id = e.target.id;
    const piece = document.querySelector(`#${id}`);
    console.log(piece);
    piece.style.backgroundColor = "yellow";

});



