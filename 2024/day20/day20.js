import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n").map(line => line.split(""));

    const ROWS = map.length;
    const COLS = map[0].length;
    let end;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if(map[i][j] === "S") start = [i,j];
            if(map[i][j] === "E") end = [i,j];
        }
    }

    const [er,ec] = end;    
    const dirs = [[1,0],[0,1],[-1,0],[0,-1]];
    let path = new Set();
    let q = [[er,ec,0]];

    while(q.length) {
        let [r,c,len] = q.shift();
        path.add(JSON.stringify([r,c]));
        map[r][c] = len

        for(const dir of dirs) {
            let nr = r + dir[0];
            let nc = c + dir[1];

            if(
                0 <= nr && nr < ROWS && 0 <= nc && nc < COLS &&
                (map[nr][nc] === '.' || map[nr][nc] === 'S') &&
                !path.has(JSON.stringify([nr,nc]))
            ) {
                q.push([nr,nc,len+1]);
                break;
            }
        }
    }

    let part1 = 0;
    const timeToSave = 100;

    for(const pos of path) {
        let [r,c] = JSON.parse(pos);
        for(let dir of dirs) {
            let nr = r + 2*dir[0];
            let nc = c + 2*dir[1];
            if(
                0 <= nr && nr < ROWS && 0 <= c && nc < COLS &&
                map[nr][nc]-map[r][c]-2 >= timeToSave
            ) {
                part1++;
            }
        }
    }

    console.log(part1);

    let part2 = 0;
    const maxCheatDuration = 20;
    for(const pos of path) {
        let [r,c] = JSON.parse(pos);
        for(let dr = -maxCheatDuration; dr <= maxCheatDuration; dr++) {
            for(let dc = -maxCheatDuration; dc <= maxCheatDuration; dc++) {
                let abs = Math.abs(dr) + Math.abs(dc);
                if(abs <= maxCheatDuration) {
                    let nr = r + dr;
                    let nc = c + dc;
                    if(
                        0 <= nr && nr < ROWS && 0 <= c && nc < COLS &&
                        map[nr][nc]-map[r][c]-abs >= timeToSave
                    ) {
                        part2++;
                    }        
                }
            }
        }
    }

    console.log(part2);
});