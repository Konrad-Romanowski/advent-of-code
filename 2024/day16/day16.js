import fs from 'fs';
import { PriorityQueue } from './PriorityQueue.js';

function rotateRight(dir) {
    let [dr,dc] = dir;
    dir = [dc,-dr];
    return dir;
}

function rotateLeft(dir) {
    let [dr,dc] = dir;
    dir = [-dc,dr];
    return dir;
}

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n");

    let start = [map.length-2,1];
    let end = [1,map[0].length-2];
    let dir = [0,1];
    let [sr,sc] = start;
    let score = 0;
    let minScore = Infinity;
    let pq = new PriorityQueue();
    
    let visited = new Set();
    pq.enqueue([sr,sc,dir,score],score); // row, col, direction, score

    while(pq.items.length) {
        let [r,c,dir,score] = pq.dequeue().item;
        visited.add(JSON.stringify([r,c]));

        if(r === end[0] && c === end[1]) {
            minScore = Math.min(score,minScore);
            break;
        }

        let nextDir = [dir,rotateRight(dir),rotateLeft(dir)];

        for(let ndir of nextDir) {
            let [nr,nc,nd] = [r+ndir[0],c+ndir[1],ndir];
            // in this apporoach at the same time we rotate and make a move
            let scoreToAdd = nd === dir ? 1 : 1001; // be careful 'nd' & 'dir' are arrays (reference comparison)
            let ns = score + scoreToAdd;

            if(!visited.has(JSON.stringify([nr,nc])) && map[nr][nc] !== "#") {
                pq.enqueue([nr,nc,nd,ns],ns);
            }
        }
    }

    let part1 = minScore;
    console.log(part1);

    visited.clear();
    let bestPathTiles = new Set();
    bestPathTiles.add(JSON.stringify([sr,sc]));
    let pq2 = new PriorityQueue();

    score = 0;
    pq2.enqueue([sr,sc,dir,score,new Set()],score); // row, col, direction, score, currentPath

    while(pq2.items.length) {
        let [r,c,dir,score,currentPath] = pq2.dequeue().item;
        visited.add(JSON.stringify([r,c,dir]));

        if(score > minScore) continue;
        if(r === end[0] && c === end[1] && score === minScore) {
            bestPathTiles = new Set([...bestPathTiles, ...currentPath]);
        }

        let nextDir = [dir,rotateRight(dir),rotateLeft(dir)];

        for(let ndir of nextDir) {
            let [nr,nc,nd] = [r+ndir[0],c+ndir[1],ndir];
            // in this apporoach at the same time we rotate and make a move
            let scoreToAdd = nd === dir ? 1 : 1001; // be careful 'nd' & 'dir' are arrays (reference comparison)
            let ns = score + scoreToAdd;

            if(!visited.has(JSON.stringify([nr,nc,nd])) && map[nr][nc] !== "#") {
                const updatedPath = structuredClone(currentPath);
                pq2.enqueue([nr,nc,nd,ns,updatedPath.add(JSON.stringify([nr,nc]))],ns);
            }
        }
    }
    let part2 = bestPathTiles.size
    console.log(part2);
});