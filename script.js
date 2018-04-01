function main() {
	var startDiv = document.getElementById('start');
	startDiv.style.display = "flex";
	var startButton = document.getElementById('startbutton');
	startButton.onclick = function() {
		var selectedSpeed = document.forms["settings"]["speed"].value;
		game(selectedSpeed);
	}
}

function game(speed) {
	var mainWindow = document.getElementById('main');
	mainWindow.innerHTML = "";
	var startDiv = document.getElementById('start');
	startDiv.style.display = "none";
	var mainWindowWidth = mainWindow.offsetWidth;
	var mainWindowHeight = mainWindow.offsetHeight;
	console.log("Window WxH: ", mainWindowWidth, mainWindowHeight);

	var matrix = generateGrid(mainWindowWidth, mainWindowHeight);

	var snek = [matrix[Math.floor(matrix.length/2)][Math.floor(matrix[0].length/2)]];
	// snek[0].classList.add("snek");

	var punten = document.getElementsByClassName('punt');

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

	var gameInterval = setInterval(function(){
		direction = directionToCheck;
		snek = move(matrix, snek, direction, grow);
		// console.log(snek.length);
		if (snek.length == 0) {
			clearInterval(gameInterval);
			alert('T00 B4D G4M3 0VER');
			return main();
		} else if (punten.length == 0) {
			alert('U D4 W1NN3R');
			return main();
		}
	}, parseInt(speed));


}

function move(matrix, snek, direction, grow) {

	var next;
	var newSnek = [];

	for (i = 0; i < snek.length; i++) {
		if (direction == "up" && i == 0) {
			if (snek[i].dataset.row == 0) {
				next = undefined;
			} else {
				next = matrix[parseInt(snek[i].dataset.row) - 1][parseInt(snek[i].dataset.col)];
			}		
		} else if (direction == "right" && i == 0) {
			next = matrix[parseInt(snek[i].dataset.row)][parseInt(snek[i].dataset.col) + 1];
		} else if (direction == "down" && i == 0) {
			if (snek[i].dataset.row == matrix.length - 1) {
				next = undefined;
			} else {
				next = matrix[parseInt(snek[i].dataset.row) + 1][parseInt(snek[i].dataset.col)];
			}
		} else if (direction == "left" && i == 0) {
			next = matrix[parseInt(snek[i].dataset.row)][parseInt(snek[i].dataset.col) - 1];
		} else if (i > 0) {
			next = snek[i-1];
		}

		if (next == undefined) {
			alert('G3T 1N H3R3');
			return [];
		} else if (i == 0 && next.classList.contains('snek')) {
			alert('Y U 34T SN3K');
			return [];
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
	var gridWindowWidth = width - (width % 100);
	var gridWindowHeight = height - (height % 100);

	gridWindow.id = 'gridWindow';
	gridWindow.style.width = gridWindowWidth + "px";
	gridWindow.style.height = gridWindowHeight + "px";
	document.getElementById('main').appendChild(gridWindow);

	console.log("Grid WxH: ", gridWindowWidth, gridWindowHeight);

	var gridSurface = gridWindowWidth * gridWindowHeight;
	var cellWidth = 20; // 5 || 10 || 20 || 50 
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
		// cell.classList.add("r"+cellRow);
		// cell.classList.add("c"+cellCol);
		cell.dataset.row = cellRow;
		cell.dataset.col = cellCol;
		document.getElementById('gridWindow').appendChild(cell);
	}

	var matrix = [];
	var allCells = document.getElementsByClassName('cell');

	for (i = 0; i < cellsOnCol; i++) {
		var row = [];
		matrix.push(row);
	}
	
	for (i = 0; i < numberOfCells; i++) {
		matrix[Math.floor(i/cellsOnRow)].push(allCells[i]);
	}

	var numberOfPoints = 50;
	for (i = 0; i < numberOfPoints; i++) {
		var random = Math.floor((Math.random()*numberOfCells));
		allCells[random].classList.add('punt');
	}

	return matrix;

}

window.onload = function() {
	main();
}

