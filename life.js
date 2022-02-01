const life = (width, height) => new Array(height).fill(() => new Array(width).fill(0)).map(x => x());
const randomLife = (grid = life(10, 10)) => grid.map(row => row.map(() => Math.random() > 0.5 ? 1 : 0));

const countLiveNeighbors = (grid, x, y) => {
	let count = 0;

	if (grid[x - 1]?.[y - 1]) count++;
	if (grid[x - 1]?.[y]) count++;
	if (grid[x - 1]?.[y + 1]) count++;
	if (grid[x]?.[y - 1]) count++;
	if (grid[x]?.[y + 1]) count++;
	if (grid[x + 1]?.[y - 1]) count++;
	if (grid[x + 1]?.[y]) count++;
	if (grid[x + 1]?.[y + 1]) count++;

	return count;
}

const stepLife = grid => {
	const copy = life(grid[0].length, grid.length);

	grid.forEach((row, ri) => {
		row.forEach((col, ci) => {
			const neighbourCount = countLiveNeighbors(grid, ri, ci);

			if (col) {
				if (neighbourCount < 2 || neighbourCount > 3) {
					copy[ri][ci] = 0;
				} else {
					copy[ri][ci] = 1;
				}
			} else {
				if (neighbourCount === 3) {
					copy[ri][ci] = 1;
				}
			}
		})
	})

	return copy;
}

const printLife = grid => console.log(grid.map(row => row.map(x => x ? '#' : '.').join(' ')).join('\n'));
