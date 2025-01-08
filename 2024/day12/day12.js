import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n").map(line => line.split(""));
    const ROWS = map.length;
    const COLS = map[0].length;

    const visisted = new Set();
    let part1 = 0;

    for(let row = 0; row < map.length; row++) {
        for(let col = 0; col < map[0].length; col++) {
            let area = 1;
            let perimeter = 0;
            if(!visisted.has(JSON.stringify([row,col]))) {
                let q = [[row,col,map[row][col]]] // row, col, symbol
                visisted.add(JSON.stringify([row,col]));

                while(q.length) {
                    let [r,c,s] = q.shift();
                    let nei = [[r-1,c],[r,c+1],[r+1,c],[r,c-1]];

                    for(const n of nei) {
                        let [nr,nc] = n;

                        if(nr < 0 || ROWS <= nr || nc < 0 || COLS <= nc) perimeter++;
                        if(0 <= nr && nr < ROWS && 0 <= nc && nc < COLS && map[nr][nc] !== s) perimeter++;

                        if(0 <= nr && nr < ROWS && 0 <= nc && nc < COLS &&
                            !visisted.has(JSON.stringify([nr,nc])) && map[nr][nc] === s
                        ) {
                            area++;
                            visisted.add(JSON.stringify([nr,nc]));
                            q.push([nr,nc,map[nr][nc]]);
                        }
                    }
                }
                part1 += area * perimeter;
            }
        }
    }

    console.log(part1);
});