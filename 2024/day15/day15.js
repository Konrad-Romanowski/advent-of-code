import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n\r\n");

    const map = data[0].split("\r\n").map(line => line.split(""));
    const moves = data[1].split("\r\n").join("");

    let mapCopy = structuredClone(map);

    let start;

    for (let i = 1; i < map.length-1; i++) {
        for (let j = 1; j < map[0].length-1; j++) {
            if(map[i][j] === "@") {
                start = [i,j];
                break;
            }
        }
    }

    let dir;
    let [r,c] = start;

    for(let m = 0; m < moves.length; m++) {
        if(moves[m] === "^") dir = [-1,0];
        if(moves[m] === ">") dir = [0,1];
        if(moves[m] === "v") dir = [1,0];
        if(moves[m] === "<") dir = [0,-1];
        
        let [nr,nc] = [r+dir[0],c+dir[1]];

        // if [nr,nc] = "#" -> continue
        if(map[nr][nc] === "#") continue;
        // if [nr,nc] = "." -> swap elements [r,c] <=> [nr,nc], update [r,c]
        if(map[nr][nc] === ".") {
            [map[nr][nc], map[r][c]] = [map[r][c], map[nr][nc]];
            [r,c] = [nr,nc];
        }
        // if [nr,nc] = "O":
        if(map[nr][nc] === "O") {
            let trail = [];
            // continue moving in dir, add "O" elements to the trail
            while(map[nr][nc] === "O") {
                trail.push([nr,nc]);
                [nr,nc] = [nr+dir[0],nc+dir[1]];
            }
            // if next [nr,nc] = "#" -> continue
            if(map[nr][nc] === "#") continue;
            // if [nr,nc] = "." -> swap proper elements, updated [r,c]
            if(map[nr][nc] === ".") {
                // [r,c] <- current @ position
                let [fr,fc] = trail[0]; // first "O" coordinates, example: @OOOO.
                [map[fr][fc],map[nr][nc]] = [map[nr][nc],map[fr][fc]]; // swap first "O" with empty space => @.OOOO
                [map[fr][fc],map[r][c]] = [map[r][c],map[fr][fc]]; // swap @ and "." => .@OOOO
                [r,c] = [fr,fc];
            }
        }
    }
    
    let part1 = 0;

    for (let i = 1; i < map.length-1; i++) {
        for (let j = 1; j < map[0].length-1; j++) {
            if(map[i][j] === "O") {
                part1 += 100 * i + j;
            }
        }
    }

    console.log(part1);

    let wideMap = structuredClone(mapCopy);

    for (let i = 0; i < mapCopy.length; i++) {
        for (let j = 0; j < mapCopy[0].length; j++) {
            if(mapCopy[i][j] === "#") {
                wideMap[i][2*j] = "#";
                wideMap[i][2*j+1] = "#";
            } else if(mapCopy[i][j] === "O") {
                wideMap[i][2*j] = "[";
                wideMap[i][2*j+1] = "]";
            } else if(mapCopy[i][j] === "@") {
                start = [i,2*j]
                wideMap[i][2*j] = "@";
                wideMap[i][2*j+1] = ".";
            } else {
                wideMap[i][2*j] = ".";
                wideMap[i][2*j+1] = ".";
            }
        }
    }

    [r,c] = start;

    for(let m = 0; m < moves.length; m++) {
        if(moves[m] === "^") dir = [-1,0];
        if(moves[m] === ">") dir = [0,1];
        if(moves[m] === "v") dir = [1,0];
        if(moves[m] === "<") dir = [0,-1];
        
        let [nr,nc] = [r+dir[0],c+dir[1]];

        if(wideMap[nr][nc] === "#") continue;
        if(wideMap[nr][nc] === ".") {
            [wideMap[nr][nc], wideMap[r][c]] = [wideMap[r][c], wideMap[nr][nc]];
            [r,c] = [nr,nc];
            continue;
        }

        // if [nr,nc] = "[" or "]":
        if(wideMap[nr][nc] === "[" || wideMap[nr][nc] === ']') {
            let shouldMove = true;

            let trail = new Set();
            if(wideMap[nr][nc] === "[") {
                trail.add(JSON.stringify([nr,nc,"["]));
                trail.add(JSON.stringify([nr,nc+1,"]"]));
            }
            if(wideMap[nr][nc] === "]") {
                trail.add(JSON.stringify([nr,nc-1,"["]));
                trail.add(JSON.stringify([nr,nc,"]"]));
            }
            for(const partOfBox of trail) {
                let [tr,tc] = JSON.parse(partOfBox);
                if(wideMap[tr+dir[0]][tc+dir[1]] === "#") {
                    shouldMove = false;
                    trail.clear();
                    break;
                } else if(wideMap[tr+dir[0]][tc+dir[1]] === "[") {
                    trail.add(JSON.stringify([tr+dir[0],tc+dir[1],"["]));
                    trail.add(JSON.stringify([tr+dir[0],tc+dir[1]+1,"]"]));
                } else if(wideMap[tr+dir[0]][tc+dir[1]] === "]") {
                    trail.add(JSON.stringify([tr+dir[0],tc+dir[1]-1,"["]));
                    trail.add(JSON.stringify([tr+dir[0],tc+dir[1],"]"]));
                }
            }

            if(shouldMove) {
                for(const box of trail) {
                    let [br,bc,bs] = JSON.parse(box);
                    wideMap[br][bc] = '.';
                    wideMap[br+dir[0]][bc+dir[1]] = bs;
                }
                for(const box of trail) {
                    let [br,bc,bs] = JSON.parse(box);
                    wideMap[br+dir[0]][bc+dir[1]] = bs;
                }
                wideMap[r][c] = ".";
                wideMap[nr][nc] = "@";
                [r,c] = [nr,nc];
                trail.clear();
            }
        }
    }

    let part2 = 0;
    for (let i = 1; i < wideMap.length-1; i++) {
        for (let j = 1; j < wideMap[0].length-1; j++) {
            if(wideMap[i][j] === "[") {
                part2 += 100 * i + j;
            }
        }
    }

    console.log(part2);
});