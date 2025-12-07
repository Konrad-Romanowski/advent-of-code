import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const map = inputData.split('\r\n');
    const ROWS = map.length;
    const COLS = map[0].length;

    let start;
    
    for(let c = 0; c < COLS; c++) {
        if(map[0][c] === "S") {
            start = [0,c];
            break;
        }
    }

    let p1 = 0;
    
    let beams = new Set();
    beams.add(JSON.stringify(start));

    while(beams.size) {
        const nextBeams = new Set();

        beams.forEach(beam => {
            let [r,c] = JSON.parse(beam);

            if(r !== ROWS - 1) {
                if(map[r+1][c] === "^") {
                    p1++;
                    if(0 <= c-1) nextBeams.add(JSON.stringify([r+1, c-1]));
                    if(c+1 < COLS) nextBeams.add(JSON.stringify([r+1, c+1]));
                } else {
                    nextBeams.add(JSON.stringify([r+1, c]));
                }
            }
        });
        beams = new Set(nextBeams);
    }

    console.log(`p1: ${p1}`);
});