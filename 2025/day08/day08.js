import fs from 'fs';
import { PriorityQueue } from '@datastructures-js/priority-queue';

function dist(pt1,pt2) {
    return Math.sqrt((pt1[0]-pt2[0])**2 + (pt1[1]-pt2[1])**2 + (pt1[2]-pt2[2])**2);
}

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const points = inputData.split("\r\n").map(line => line.split(",").map(n => parseInt(n)));
    const idx = {};
    for(let i = 0; i < points.length; i++) {
        idx[JSON.stringify(points[i])] = i;
    }

    const parent = Array.from({length: points.length}, (_,i) => i);
    const rank = Array(points.length).fill(0);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x,y) {
        const rootX = find(x);
        const rootY = find(y);

        if (rootX === rootY) return;

        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }

    const PQ = new PriorityQueue((a,b) => a[2] - b[2]);
    const largestCircuits = new PriorityQueue((a,b) => b - a);

    for(let i = 0; i < points.length-1; i++) {
        for(let j = i+1; j < points.length; j++) {
            let d = dist(points[i],points[j]);
            PQ.push([points[i],points[j],d]);
        }
    }
    
    // For example case set N = 10;
    const N = 1000;

    for(let i = 0; i < N; i++) {
        let [pt1,pt2,_] = PQ.pop();
        let idx1 = idx[JSON.stringify(pt1)];
        let idx2 = idx[JSON.stringify(pt2)];

        union(idx1,idx2);
    }

    const count = {};

    for(let i = 0; i < parent.length; i++) {
        find(i);
        count[parent[i]] = (count[parent[i]] || 0) + 1;
    }

    let p1 = 1;

    for(let n in count) {
        largestCircuits.push(count[n]);
    }

    for(let i = 0; i < 3; i++) {
        p1 *= largestCircuits.pop();
    }

    console.log(`p1: ${p1}`);

    let p2 = 1;

    while(true) {
        let [pt1,pt2,_] = PQ.pop();
        let idx1 = idx[JSON.stringify(pt1)];
        let idx2 = idx[JSON.stringify(pt2)];

        union(idx1,idx2);

        for(let i = 0; i < parent.length; i++) {
            find(i);
        }
        
        if(parent.every(item => item === parent[0])) {
            p2 = pt1[0] * pt2[0];
            break;
        }
    }

    console.log(`p2: ${p2}`);
});