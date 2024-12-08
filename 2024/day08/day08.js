import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n").map(line => line.split(""));
    const ROWS = map.length;
    const COLS = map[0].length;

    const adjList = {};
    const uniqueAntiNodes = new Set();  // part1
    const allAntiNodes = new Set(); // part2

    for(let r=0; r<ROWS; r++) {
        for(let c=0; c<COLS; c++) {
            if(map[r][c] !== '.') {
                if(map[r][c] in adjList) {
                    adjList[map[r][c]].push(JSON.stringify([r,c]));
                } else {
                    adjList[map[r][c]] = [JSON.stringify([r,c])];
                }
            }
        }    
    }
    
    for(const antennasOfSameFreq of Object.values(adjList)) {
        // for every pair of antennas
        for(let i=0; i<antennasOfSameFreq.length-1;i++) {
            for(let j=i+1; j<antennasOfSameFreq.length; j++) {
                let [r1,c1] = JSON.parse(antennasOfSameFreq[i]);
                let [r2,c2] = JSON.parse(antennasOfSameFreq[j]);
                // count delta r and delta c
                let [dr,dc] = [r1-r2,c1-c2];
                // to every position of antenna add and deduct dr and dc
                let antiNodesPos = [[r1+dr,c1+dc],[r1-dr,c1-dc],[r2-dr,c2-dc],[r2-dr,c2-dc]];
                // check if it is in the bounds of a map and is not one of the current antennas
                // if yes then add to uniqueAntiNodes set
                antiNodesPos.forEach(antiNodePos => {
                    if(0 <= antiNodePos[0] && antiNodePos[0] < ROWS &&
                       0 <= antiNodePos[1] && antiNodePos[1] < COLS &&
                       antiNodePos[0] !== r1 && antiNodePos[1] !== c1 &&
                        antiNodePos[0] !== r2 && antiNodePos[1] !== c2
                    ) {
                        uniqueAntiNodes.add(JSON.stringify(antiNodePos));
                    }
                });

                // part2
                let [nr,nc] = [r1,c1];
                while(0 <= nr & nr < ROWS && 0 <= nc && nc < COLS) {
                    allAntiNodes.add(JSON.stringify([nr,nc]));
                    nr += dr;
                    nc += dc;
                }

                [nr,nc] = [r1,c1];
                while(0 <= nr & nr < ROWS && 0 <= nc && nc < COLS) {
                    allAntiNodes.add(JSON.stringify([nr,nc]));
                    nr -= dr;
                    nc -= dc;
                }
            }
        }
    }

    let part1 = uniqueAntiNodes.size;
    console.log(part1);

    let part2 = allAntiNodes.size;
    console.log(part2);
});