import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);
    
    const rotations = inputData.split("\r\n");
    let p1 = 0;
    let p2 = 0;
    let cur = 50;
    const MOD = 100;

    rotations.forEach(instruction => {
        let dir = instruction[0] === "L" ? -1 : 1;
        let steps = dir * parseInt(instruction.slice(1));
        
        while(steps !== 0) {
            cur = (cur+dir) % MOD;
            if(cur === 0) p2++;
            steps -= dir;
        }

        if(cur === 0) p1++;
    });

    console.log(`p1: ${p1}`);
    console.log(`p2: ${p2}`);
});