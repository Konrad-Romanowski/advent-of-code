import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const diskSpace = [];
    let id = 0;

    for(let i=0; i<inputData.length; i+=2) {
        let numOfBlocks = parseInt(inputData[i]);
        let numOfSpaces = parseInt(inputData[i+1]);

        for(let j=0; j<numOfBlocks; j++) {
            diskSpace.push(id);
        }
        for(let j=0; j<numOfSpaces; j++) {
            diskSpace.push(".");
        }
        id++;
    }

    let l = 0;
    let r = diskSpace.length-1;

    while(l<r) {
        while(diskSpace[l] !== ".") {
            l++;
        }
        if(l >= r) break;
        diskSpace[l] = diskSpace[r];
        diskSpace[r] = ".";
        r--;
    }

    let part1 = 0;
    id = 0;

    while(diskSpace[id] !== '.' && id < diskSpace.length) {
        part1+= id*diskSpace[id];
        id++;
    }

    console.log(part1);
});