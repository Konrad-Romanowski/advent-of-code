import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const map = inputData.split('\r\n');
    const ROWS = map.length;
    const COLS = map[0].length;

    let sr = 0;
    let sc;
    
    for(let c = 0; c < COLS; c++) {
        if(map[0][c] === "S") {
            sc = c;
            break;
        }
    }

    let p1 = 0;
    let p2 = 0;
    
    let BEAMS = new Set();
    BEAMS.add(JSON.stringify([sr,sc]));
    
    const memo = new Array(ROWS).fill(0).map(_ => new Array(COLS).fill(0));
    memo[sr][sc] = 1;

    while(BEAMS.size) {
        const nextBeams = new Set();
        
        for(let beam of BEAMS) {
            let [r,c] = JSON.parse(beam);
            let cur = memo[r][c];

            if(r === ROWS-1) continue;

            if(map[r+1][c] === "^") {
                p1++;
                if(0 <= c-1) {
                    nextBeams.add(JSON.stringify([r+1, c-1]));
                    memo[r+1][c-1] += cur;
                }
                if(c+1 < COLS) {
                    nextBeams.add(JSON.stringify([r+1, c+1]));
                    memo[r+1][c+1] += cur;
                }
            } else {
                nextBeams.add(JSON.stringify([r+1, c]));
                memo[r+1][c] += cur;
            }
        };

        BEAMS = new Set(nextBeams);
    }

    for(let c = 0; c < COLS; c++) {
        p2 += memo[ROWS-1][c];
    }
    
    console.log(`p1: ${p1}`);
    console.log(`p2: ${p2}`);
});