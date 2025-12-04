import fs from 'fs';

function countAdjacentRolls(r,c,grid) {
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const DIRS = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
    ];

    let count = 0;

    for(let [dr,dc] of DIRS) {
        let [nr,nc] = [r+dr, c+dc];

        if(
            0 <= nr && nr < ROWS &&
            0 <= nc && nc < COLS &&
            grid[nr][nc] === "@"
        ) {
            count++;
        }
    }
    
    return count;
}

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    let grid = inputData.split('\r\n').map(row => row.split(""));
    const ROWS = grid.length;
    const COLS = grid[0].length;

    let p1 = 0;
    let p2 = 0;

    // part 1
    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            if(grid[r][c] !== "@") continue;
            let count = countAdjacentRolls(r,c,grid);
            if(count < 4) p1++;
        }
    }

    // part 2
    let removed = true;
    while(removed) {
        removed = false;
        for(let r = 0; r < ROWS; r++) {
            for(let c = 0; c < COLS; c++) {
                if(grid[r][c] !== "@") continue;
                let count = countAdjacentRolls(r,c,grid);
                if(count < 4) {
                    grid[r][c] = ".";
                    removed = true;
                    p2++;
                }
            }
        }
    }

    console.log(`p1: ${p1}`);
    console.log(`p2: ${p2}`);
});