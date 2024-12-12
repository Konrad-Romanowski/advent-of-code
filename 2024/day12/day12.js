import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n").map(line => line.split(""));
    const ROWS = map.length;
    const COLS = map[0].length;

    const visisted = new Set();
    let part1 = 0;

    for(let row=0; row<ROWS; row++) {
        for(let col=0; col<COLS; col++) {
            if(!visisted.has(JSON.stringify([row,col]))) {
                let areaTiles = new Set();
                let q = [[row,col,map[row][col]]]  // row, col, symbol
                while(q.length) {
                    let [r,c,s] = q.shift();
                    visisted.add(JSON.stringify([r,c]));
                    areaTiles.add(JSON.stringify([r,c]));
                    let nei = [[r-1,c],[r,c+1],[r+1,c],[r,c-1]];
                    for(const n of nei) {
                        let [nr,nc] = n;
                        if(0 <= nr && nr < ROWS && 0 <= nc && nc < COLS &&
                            !visisted.has(JSON.stringify([nr,nc])) && s === map[nr][nc]
                        ) {
                            q.push([nr,nc,s]);
                        }
                    }
                }
                let perimeter = 0;
                for(let pos of areaTiles) {
                    let [r,c] = JSON.parse(pos);
                    let s = map[r][c];
                    let nei = [[r-1,c],[r,c+1],[r+1,c],[r,c-1]];
                    for(const n of nei) {
                        let [nr,nc] = n;
                        if(nr === -1 || nr === ROWS || nc === -1 || nc === COLS) perimeter++;
                        if(0 <= nr && nr < ROWS && 0 <= nc && nc < COLS) {
                            if(map[nr][nc] !== s) perimeter++;
                        }
                    }
                }
                part1 += perimeter * areaTiles.size;
            }
        }    
    }
    console.log(part1);
});