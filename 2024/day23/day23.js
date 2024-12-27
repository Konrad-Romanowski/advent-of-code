import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const connections = inputData.split("\r\n").map(connection => connection.split("-"));
    const adjList = {};

    for(const comp of connections) {
        // check if both computers are in adjList
        const [c1,c2] = comp;
        if(!adjList.hasOwnProperty(c1)) adjList[c1] = new Set();
        if(!adjList.hasOwnProperty(c2)) adjList[c2] = new Set();
        adjList[c1].add(c2);
        adjList[c2].add(c1);
    }

    const triples = [];

    for(const startingNode in adjList) {
        const path = new Set();
        path.add(startingNode);

        const q = [[startingNode,path]]; // current node, visited nodes;

        while(q.length) {
            let [node,p] = q.shift();

            if(p.size === 4) continue;

            for(const nextNode of adjList[node]) {
                if(p.size === 3 && nextNode === startingNode) {
                    triples.push(p);
                }
                if(!p.has(nextNode)) {
                    const updatedPath = new Set([...p]);
                    updatedPath.add(nextNode);
                    q.push([nextNode,updatedPath]);
                }
            }
        }
    }

    let triplesWithCompStartingWithT = [];

    triples.forEach(set => {
        const regEx = /t\w/;
        const hasCompThatStartsWithT = [...set].some(item => regEx.test(item));

        if(hasCompThatStartsWithT) triplesWithCompStartingWithT.push(set);
    });

    // triplesWithCompStartingWithT consist of ALL PERMUTATIONS OF THREE
    // inter-connected computers that at least one computer's name starts with letter t,
    // therefore we have to divide it by 3 factorial (1*2*3=6)

    let part1 = triplesWithCompStartingWithT.length / 6;
    console.log(part1);
});