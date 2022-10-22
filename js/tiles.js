let columns = Math.floor(window.innerWidth / 50),
  rows = Math.floor(window.clientHeight / 50);

const createTile = (index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  return tile;
};

const wrapper = document.getElementById("frame");

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";

  columns = Math.floor(window.innerWidth / 80);
  rows = Math.floor(window.innerHeight / 80);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

createGrid();

window.onresize = () => createGrid();
