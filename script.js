function main() {
	var mainWindow = document.getElementById('main');
	var mainWindowWidth = mainWindow.offsetWidth;
	var mainWindowHeight = mainWindow.offsetHeight;
	console.log("Window WxH: ",mainWindowWidth, mainWindowHeight);

	var matrix = generateGrid(mainWindowWidth, mainWindowHeight);
	var snek = [
		document.getElementsByClassName('snek')[0]
	];

	var direction = "right";
	var directionToCheck = "right";
	document.onkeydown = checkKey;
	function checkKey(e) {
	    e = e || window.event;

	    if (e.keyCode == '38' && direction != 'down') {
	        directionToCheck = 'up';
	    } else if (e.keyCode == '40' && direction != 'up') {
	        directionToCheck = 'down';
	    } else if (e.keyCode == '37' && direction != 'right') {
	       	directionToCheck = 'left';
	    } else if (e.keyCode == '39' && direction != 'left') {
	       	directionToCheck = 'right';
    }
}

	var grow = false;

	setInterval(function(){
		direction = directionToCheck;
		snek = move(matrix, snek, direction, grow);
		// console.log(snek);
	}, 100);
}

function move(matrix, snek, direction, grow) {

	var next;
	var newSnek = [];

	for (i = 0; i < snek.length; i++) {
		if (direction == "up" && i == 0) {
			next = matrix[parseInt(snek[i].dataset.row) - 1][parseInt(snek[i].dataset.col)];			
		} else if (direction == "right" && i == 0) {
			next = matrix[parseInt(snek[i].dataset.row)][parseInt(snek[i].dataset.col) + 1];
		} else if (direction == "down" && i == 0) {
			next = matrix[parseInt(snek[i].dataset.row) + 1][parseInt(snek[i].dataset.col)];
		} else if (direction == "left" && i == 0) {
			next = matrix[parseInt(snek[i].dataset.row)][parseInt(snek[i].dataset.col) - 1];
		} else if (i > 0) {
			next = snek[i-1];
		}

		if (i == 0 && next.classList.contains('snek')) {
			alert('DONEZO');
		}

		newSnek.push(next);

		if (i == snek.length - 1 && matrix[parseInt(snek[i].dataset.row)][parseInt(snek[i].dataset.col)].classList.contains('punt')) {
			newSnek.push(snek[i]);
			matrix[parseInt(snek[i].dataset.row)][parseInt(snek[i].dataset.col)].classList.remove('punt');
		}
	}	

	for (i = 0; i < snek.length; i++) {
		snek[i].classList.remove("snek");
		newSnek[i].classList.add("snek");
	}

	return newSnek;
	
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
	var cellsOnRow = gridWindowWidth/cellWidth;
	var cellsOnCol = gridWindowHeight/cellWidth;
	console.log("Number of cells: ", numberOfCells);
	console.log("Cells on row: ", cellsOnRow);

	for(i = 0; i < numberOfCells; i++) {
		var cell = document.createElement('div');
		var cellRow = Math.floor(i/cellsOnRow);
		var cellCol = i%cellsOnRow;
		cell.style.width = cellWidth + "px";
		cell.style.height = cellWidth + "px";
		cell.className = "cell";
		cell.classList.add("r"+cellRow);
		cell.classList.add("c"+cellCol);
		cell.dataset.row = cellRow;
		cell.dataset.col = cellCol;
		if (i == Math.floor(numberOfCells/2)) {
			cell.classList.add("snek");
		} 
		document.getElementById('gridWindow').appendChild(cell);
	}

	var matrix = [];
	var allCells = document.getElementsByClassName('cell');

	var numberOfPoints = 25;
	for (i = 0; i < numberOfPoints; i++) {
		var random = Math.floor((Math.random()*numberOfCells) + 1);
		allCells[random].classList.add('punt');
	}
	
	for (i = 0; i < cellsOnCol; i++) {
		var row = [];
		matrix.push(row);
	}
	
	for (i = 0; i < numberOfCells; i++) {
		matrix[Math.floor(i/cellsOnRow)].push(allCells[i]);
	}

	return matrix;

}

window.onload = function() {
	main();
}

