import fs from 'fs';
import { Queue } from '@datastructures-js/queue';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const connections = inputData.split("\r\n");
    const adj = {};
    connections.forEach(line => {
        let [fromNode, toNodes] = line.split(":");
        if(!(fromNode in adj)) adj[fromNode] = new Set();
        toNodes = toNodes.slice(1).split(" ");

        for(let node of toNodes) {
            if(!(node in adj)) adj[node] = new Set();
            adj[fromNode].add(node);
        }
    });

    // part 1
    let p1 = 0;
    
    const q = new Queue();
    q.push(["you",new Set()]); // [current node, visited nodes];

    while(q.size()) {
        let [node,SEEN] = q.pop();

        if(node === "out") {
            p1++;
            continue;
        }

        for(let n of adj[node]) {
            if(!SEEN.has(n)) {
                const NEXT_SEEN = new Set(SEEN);
                NEXT_SEEN.add(n);
                q.push([n,NEXT_SEEN]);
            }
        }
    }

    console.log(`p1: ${p1}`);

    // part 2
    function numOfPathsFromTo(fromNode,toNode) {
        const memo = {};

        function countPathsFrom(curNode) {
            if(curNode in memo) return memo[curNode];
            if(curNode === toNode) return 1;

            let totalPaths = 0;
            for(let node of adj[curNode]) {
                totalPaths += countPathsFrom(node);
            }

            memo[curNode] = totalPaths;

            return memo[curNode];
        }

        return countPathsFrom(fromNode);
    }

    let p2 = 0

    p2 += numOfPathsFromTo('svr','fft') * numOfPathsFromTo('fft','dac') * numOfPathsFromTo('dac','out');
    p2 += numOfPathsFromTo('svr','dac') * numOfPathsFromTo('dac','fft') * numOfPathsFromTo('fft','out');
    
    console.log(`p2: ${p2}`);
});