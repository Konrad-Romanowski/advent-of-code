import fs from 'fs';
import { PriorityQueue } from './PriorityQueue.js';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const map = inputData.split("\r\n").map(line => line.split(""));

    const ROWS = map.length;
    const COLS = map[0].length;

    // map.forEach(line => console.log(line.join("")));

    let start, end;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if(map[i][j] === "S") start = [i,j];
            if(map[i][j] === "E") end = [i,j];
        }
    }

    let [sr,sc] = start;
    // count best non-cheating path length
    let pq = new PriorityQueue();
    pq.enqueue([sr,sc,0,new Set()],0) // row, col, current path len, visited
    let shortestNonCheat;

    while(pq.items.length) {
        let [r,c,len,visited] = pq.dequeue().item;
        visited.add(JSON.stringify([r,c]));

        if(r === end[0] && c === end[1]) {
            shortestNonCheat = len;
            break;
        }

        let nei = [[r,c+1],[r+1,c],[r,c-1],[r-1,c]];

        for(const n of nei) {
            let [nr,nc] = n;
            if(map[nr][nc] !== "#" && !visited.has(JSON.stringify([nr,nc]))) {
                pq.enqueue([nr,nc,len+1,visited],len+1);
            }
        }
    }

    console.log(shortestNonCheat);
    
    let dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    let pqq = new PriorityQueue();
    pqq.enqueue([sr,sc,0,new Set(),false],0); // row, col, len, visited, cheated
    let part1 = 0;
    let timeSaved = 40; // set to 100 for main input

    while(pqq.items.length) {
        let [r,c,len,v,cheated] = pqq.dequeue().item;
        let visited = new Set(v);
        visited.add(JSON.stringify([r,c,cheated]));

        if(r === end[0] && c === end[1]) {
            if(len <= shortestNonCheat-timeSaved) {
                part1++;
            }
            continue;
        }

        for(const dir of dirs) {
            let [dr,dc] = dir;
            // add to the que cheating move (if not cheated already)
            if(!cheated && 0 <= r+2*dr && r+2*dr < ROWS && 0 <= c+2*dc && c+2*dc < COLS &&
                map[r+dr][c+dc] === "#" && map[r+2*dr][c+2*dc] !== "#" &&
                !visited.has(JSON.stringify([r+2*dr,c+2*dc,cheated]))
            ) {
                pqq.enqueue([r+2*dr,c+2*dc,len+2,visited,true],len+2);
            }

            // add to que non-cheating move
            if(0 <= r+dr && r+dr < ROWS && 0 <= c+dc && c+dc < COLS &&
                map[r+dr][c+dc] !== "#" && !visited.has(JSON.stringify([r+dr,c+dc,cheated]))
            ) {
                pqq.enqueue([r+dr,c+dc,len+1,visited,cheated],len+1);
            }
        }
    }

    console.log(part1);
});