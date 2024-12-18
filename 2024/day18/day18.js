import fs from 'fs';
import { WeightedGraph } from './wieghtedGraph.js';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);

    let regEx = /\d+/g;
    const bytes = inputData.split("\r\n").map(line => line.match(regEx).map(coord => parseInt(coord)));    
    const ROWS = 70;
    const COLS = 70;
    let map = Array.from({length: ROWS+1},() => Array(COLS+1).fill('.'));

    const graph = new WeightedGraph();

    for (let i = 0; i < 1024; i++) {
        let [r,c] = bytes[i];
        map[r][c] = "#";
    }

    // uncomment to display current state of the map (memory)
    // map.forEach(row => console.log(row.join("")));

    // add vertices
    for (let i = 0; i <= ROWS; i++) {
        for (let j = 0; j <= COLS; j++) {
            graph.addVertex(JSON.stringify([i,j]));
        }
    }

    // add horizontal edges
    for (let i = 0; i <= ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if(map[i][j] === "#" || map[i][j+1] === "#") continue;
            graph.addEdge(JSON.stringify([i,j]),JSON.stringify([i,j+1]),1);
        }
    }

    // add vertical edges
    for (let j = 0; j <= COLS; j++) {
        for (let i = 0; i < ROWS; i++) {
            if(map[i][j] === "#" || map[i+1][j] === "#") continue;
            graph.addEdge(JSON.stringify([i,j]),JSON.stringify([i+1,j]),1);
        }
    }

    // get shortest path
    let [shortestDist, shortestPath] = graph.shortestPath(JSON.stringify([0,0]),JSON.stringify([ROWS,COLS]));
    let part1 = shortestDist;
    console.log(part1);

    let part2 = "";

    for (let i = 1025; i < bytes.length; i++) {
        let [r,c] = bytes[i];
        graph.removeVertex(JSON.stringify([r,c]));
        if(shortestPath.has(JSON.stringify([r,c]))) {
            [shortestDist, shortestPath] = graph.shortestPath(JSON.stringify([0,0]),JSON.stringify([ROWS,COLS]));
        }
        if(shortestDist === Infinity) {
            part2 = JSON.stringify(bytes[i]).slice(1,-1);
            break;
        }
    }

    console.log(part2);
});