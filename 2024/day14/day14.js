import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n");
    let regEx = /-?\d+/g;
    
    // dimensions for example
    // let ROWS = 7;
    // let COLS = 11;
    
    // dimensions for input
    let ROWS = 103;
    let COLS = 101;
    
    let robots = data.map(r => {
        let info = r.match(regEx).map(i => parseInt(i));
        return {p: [info[1],info[0]], v: [info[3],info[2]]}
    });

    const numsOfSec = 100;

    robots = robots.map(r => {
        let [row,col] = r.p;
        let [vr,vc] = r.v
        for(let s = 1; s <= numsOfSec; s++) { 
            row += vr;
            col += vc;
            if(row < 0) row+=ROWS;
            if(col < 0) col+=COLS;
            row = row % ROWS;
            col = col % COLS;
        }
        return [row,col];
    });

    let robotsPerQuadrant = Array(4).fill(0);
    let midR = Math.floor(ROWS/2);
    let midC = Math.floor(COLS/2);

    robots.forEach(r => {
        if(r[0] > midR && r[1] > midC) robotsPerQuadrant[0]++;
        if(r[0] > midR && r[1] < midC) robotsPerQuadrant[1]++;
        if(r[0] < midR && r[1] > midC) robotsPerQuadrant[2]++;
        if(r[0] < midR && r[1] < midC) robotsPerQuadrant[3]++;
    });

    let part1 = 1;
    for(const q of robotsPerQuadrant) {
        part1 *= q;
    }

    console.log(part1);
});