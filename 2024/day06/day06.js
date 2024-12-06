import fs from 'fs';

// (c+ir)*(-i) = -ic -i^2*r = r-ic
// (c,r) => (r,-c) 
function rotate(dir) {
    let [dr,dc] = dir;
    dir = [dc,-dr];
    return dir;
}

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n").map(line => line.split(""));

    let guardPos;

    for(let i=0; i<map.length;i++) {
        for(let j=0; j<map[0].length; j++) {
            if(map[i][j] === "^") {
                guardPos = [i,j];
                break;
            }
        }
    }
    
    let dir = [-1,0];
    let [dr,dc] = dir;
    let [r,c] = guardPos;
    const visited = new Set();
    visited.add(JSON.stringify([r,c]));
    
    while(0 <= r && r < map.length && 0 <= c && c < map[0].length) {
        let [nr,nc] = [r+dr,c+dc];
        while(0 <= nr && nr < map.length && 0 <= nc && nc < map[0].length &&
            map[nr][nc] === '#'
        ) {
            dir = rotate(dir);
            [dr,dc] = dir;
            [nr,nc] = [r+dr,c+dc];
        }
        visited.add(JSON.stringify([r,c]));
        [r,c] = [nr,nc];
    }

    let part1 = visited.size;
    console.log(part1);
});