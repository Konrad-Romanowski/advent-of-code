import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n").map(line => line.split(""));
    const ROWS = map.length;
    const COLS = map[0].length;
    const startingPositions = [];

    for(let r=0; r<ROWS; r++) {
        for(let c=0; c<COLS; c++) {
            if(map[r][c] === "0") startingPositions.push([r,c]);
        }
    }

    let part1 = 0;
    let part2 = 0;

    for(const start of startingPositions) {
        const endPoints = new Set();
        
        let [rs,cs] = start;
        let q = [[rs,cs,0]]; // row, col, level
        
        while(q.length) {
            let [r,c,l] = q.shift();

            if(l === 9) {
                endPoints.add(JSON.stringify([start,[r,c]]));
                part2++;
                continue;
            }

            let nei = [[r-1,c],[r,c+1],[r+1,c],[r,c-1]];

            for(let n of nei) {
                let [nr,nc] = n;
                if(0 <= nr && nr < ROWS && 0 <= nc && nc < COLS && parseInt(map[nr][nc]) === l+1) {
                    q.push([nr,nc,l+1]);
                }
            }
        }
        part1 += endPoints.size;
    }

    console.log(part1);
    console.log(part2);
});