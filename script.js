function main() {
	var mainWindow = document.getElementById('main');
	var mainWindowWidth = mainWindow.offsetWidth;
	var mainWindowHeight = mainWindow.offsetHeight;
	console.log("Window WxH: ",mainWindowWidth, mainWindowHeight);

	generateGrid(mainWindowWidth, mainWindowHeight);

	var directions = ["top", "right", "bottom", "left"];
	var grow = false;
	var snek = document.getElementsByClassName('snek');
	setInterval(function(){
		snek = move(snek, directions[0], grow);
		for (i = 0; i < snek; i++) {
			snek[i].classList.add("snek");
		}
		// if (grow) {
		// 	grow = false;
		// } else {
		// 	grow = true;
		// }
	}, 1000);
}

function move(snek, direction, grow) {
	// var snek = document.getElementsByClassName('snek');

	var next;

	for (i = 0; i < snek.length; i++) {
		var nextCol = document.getElementsByClassName(snek[i].classList[2]);

		for (j = 0; j < nextCol.length; j++) {
			if (nextCol[j].classList.contains(snek[i].classList[1])) {
				next = nextCol[j-1];
			} 
		}
				
	}

	console.log(snek);

	var newSnek = [];
	newSnek.push(next);

	for (i = 0; i < newSnek; i++) {
		snek.push(newSnek[i]);
	}

	return snek;

	// if (direction == "top") {
	// 	for (i = 0; i < snek.length; i++) {
	// 		var nextCol = document.getElementsByClassName(snek[i].classList[2]);
	// 		var next;

	// 		for (j = 0; j < nextCol.length; j++) {
	// 			if (nextCol[j].classList.contains(snek[i].classList[1])) {
	// 				next = nextCol[j-1];
	// 			} 
	// 		}

	// 		if (grow && i == snek.length - 1) {
	// 			next.classList.add("snek");	
	// 		} else {
	// 			snek[i].classList.remove("snek");
	// 			next.classList.add("snek");	
	// 		}
					
	// 	}

	// } else if (direction == "right") {
	// 	for (i = snek.length; i--;) {
	// 		var nextRow = document.getElementsByClassName(snek[i].classList[1]);
	// 		var next;

	// 		for (j = 0; j < nextRow.length; j++) {
	// 			if (nextRow[j].classList.contains(snek[i].classList[2])) {
	// 				next = nextRow[j+1];
	// 			} 
	// 		}

	// 		if (grow && i == snek.length - 1) {
	// 			next.classList.add("snek");
	// 		} else {
	// 			next.classList.add("snek");
	// 			snek[i].classList.remove("snek");
	// 		}

	// 	}

	// } else if (direction == "bottom") {
	// 	for (i = snek.length; i--;) {
	// 		var nextCol = document.getElementsByClassName(snek[i].classList[2]);
	// 		var next;

	// 		for (j = 0; j < nextCol.length; j++) {
	// 			if (nextCol[j].classList.contains(snek[i].classList[1])) {
	// 				next = nextCol[j+1];
	// 			} 
	// 		}

	// 		if (grow && i == snek.length - 1) {
	// 			next.classList.add("snek");
	// 		} else {
	// 			next.classList.add("snek");
	// 			snek[i].classList.remove("snek");
	// 		}
			
	// 	}
	// } else if (direction == "left") {
	// 	for (i = 0; i < snek.length; i++) {
	// 		var nextRow = document.getElementsByClassName(snek[i].classList[1]);
	// 		var next;

	// 		for (j = 0; j < nextRow.length; j++) {
	// 			if (nextRow[j].classList.contains(snek[i].classList[2])) {
	// 				next = nextRow[j-1];
	// 			} 
	// 		}

	// 		if (grow && i == snek.length - 1) {
	// 			next.classList.add("snek");	
	// 		} else {
	// 			snek[i].classList.remove("snek");
	// 			next.classList.add("snek");	
	// 		}
					
	// 	}

	// }
	
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
		if (i == Math.floor(numberOfCells/2)) {
			cell.classList.add("snek");
		} 

		// if (i == Math.floor(numberOfCells/2)+1) {
		// 	cell.classList.add("snek");
		// } 

		document.getElementById('gridWindow').appendChild(cell);
	}
}

window.onload = function() {
	main();
}