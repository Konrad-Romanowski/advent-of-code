import fs from 'fs';
import { PriorityQueue } from './PriorityQueue.js';
import path from 'path';

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
    let path = new Set();
    path.add(JSON.stringify([sr,sc]))
    pq.enqueue([sr,sc,dir,score,path],score); // row, col, direction, score, currentPath

    let allPaths = [];

    while(pq.items.length) {
        let [r,c,dir,score,currentPath] = pq.dequeue().item;
        visited.add(JSON.stringify([r,c,dir]));

        if(score > minScore) continue;

        if(r === end[0] && c === end[1]) {
            minScore = Math.min(score,minScore);
            allPaths.push({path: currentPath, score});
        }

        let nextDir = [dir,rotateRight(dir),rotateLeft(dir)];

        for(let ndir of nextDir) {
            let [nr,nc,nd] = [r+ndir[0],c+ndir[1],ndir];
            // in this apporoach at the same time we rotate and make a move
            let scoreToAdd = nd === dir ? 1 : 1001; // be careful 'nd' & 'dir' are arrays (reference comparison)
            let ns = score + scoreToAdd;

            if(!visited.has(JSON.stringify([nr,nc,nd])) && map[nr][nc] !== "#") {
                const updatedPath = new Set(currentPath);
                updatedPath.add(JSON.stringify([nr,nc]));
                pq.enqueue([nr,nc,nd,ns,updatedPath],ns);
            }
        }
    }

    let part1 = minScore;
    console.log(part1);

    const bestPaths = allPaths.filter(path => path.score === minScore);
    let bestPathTiles = new Set();

    bestPaths.forEach(bestPath => {
        bestPath.path.forEach(tile => {
            bestPathTiles.add(tile);
        });
    });

    let part2 = bestPathTiles.size;
    console.log(part2);
});