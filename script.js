function main() {
	var mainWindow = document.getElementById('main');
	var mainWindowWidth = mainWindow.offsetWidth;
	var mainWindowHeight = mainWindow.offsetHeight;
	console.log("Window WxH: ",mainWindowWidth, mainWindowHeight);

	generateGrid(mainWindowWidth, mainWindowHeight);
}

function generateGrid(width, height) {

	var gridWindow = document.createElement('div');
	var gridWindowWidth = width - (width % 10);
	var gridWindowHeight = height - (height % 10);

	gridWindow.id = 'gridWindow';
	gridWindow.style.width = gridWindowWidth;
	gridWindow.style.height = gridWindowHeight;
	document.getElementById('main').appendChild(gridWindow);

	console.log("Grid WxH: ", gridWindowWidth, gridWindowHeight);

	var gridSurface = gridWindowWidth * gridWindowHeight;
	var cellWidth = 10; // 5 or 10
	var cellSurface = cellWidth**2;
	var numberOfCells = Math.floor(gridSurface/cellSurface);
	console.log("Number of cells: ", numberOfCells);

	for(i = 0; i < numberOfCells; i++) {
		var cell = document.createElement('div');
		cell.style.width = cellWidth + "px";
		cell.style.height = cellWidth + "px";
		cell.className = "cell";
		if (i == Math.floor(numberOfCells/2)) {
			cell.className = "cell snek";
		}
		document.getElementById('gridWindow').appendChild(cell);
	}
}

window.onload = function() {
	main();
}