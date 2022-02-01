const $ = (...args) => document.querySelector(...args);
const floor = Math.floor;

// ref to interval
let interval;

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
	const canvas = $('canvas');

	// 10x10px cells
	const cellCountH = floor((innerWidth - 20) / 10);
	const cellCountV = floor((innerHeight - 20) / 10);

	const realWidth = cellCountH * 10;
	const realHeight = cellCountV * 10;

	canvas.width = realWidth;
	canvas.height = realHeight;

	let myGame = life(cellCountH, cellCountV);

	// default game
	const gosperRle = '24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o'
	rleToGame(gosperRle, myGame, 10);

	$('#start').addEventListener('click', () => {
		start();
	});
	$('#stop').addEventListener('click', stop);
	$('#clear').addEventListener('click', () => {
		stop();
		myGame = life(cellCountH, cellCountV);
		renderGame();
	});
	$('#random').addEventListener('click', () => {
		stop();
		myGame = randomLife(life(cellCountH, cellCountV));
		renderGame();
	});
	$('#fromRLE').addEventListener('click', () => {
		stop();
		const rle = prompt('Enter RLE (only the actual part, no exclamation marks) (buggy)');
		const shouldClear = confirm('Clear the board before loading?');
		if (shouldClear) {
			myGame = life(cellCountH, cellCountV);
		}
		myGame = rleToGame(rle, myGame);
		renderGame();
	});

	canvas.addEventListener('mousedown', function(e) {
		handleClick(canvas, e)
	})

	function handleClick(canvas, event) {
		const rect = canvas.getBoundingClientRect()
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		toggleCell(floor(y / 10), floor(x / 10), canvas);
	}

	function toggleCell(x, y) {
		myGame[x][y] = myGame[x][y] ? 0 : 1;

		renderGame();
	}

	function start() {
		if (!interval) interval = setInterval(() => {
			myGame = stepLife(myGame);
			renderGame();
		}, 100);
	}

	function stop() {
		clearInterval(interval);
		interval = undefined;
	}

	function renderGame() {
		const ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		myGame.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell) {
					ctx.fillStyle = '#2563eb';
					ctx.fillRect(x * 10, y * 10, 10, 10);
				} else {
					ctx.strokeStyle = '#2563eb33';
					ctx.strokeRect(x * 10, y * 10, 10, 10);
				}
			});
		});
	}

	function rleToGame(rle, grid, offset = 0) {
		console.log(rle);
		rle = rle.replace(/(\d+)(b|o)/g, (_, n, s) => s.repeat(+n));
		rle.split('$').forEach((row, rowi) => {
			row.split('').forEach((cell, i) => {
				grid[i + offset][rowi + offset] = cell === 'o';
			});
		});
		return grid;
	}

	renderGame();
});
