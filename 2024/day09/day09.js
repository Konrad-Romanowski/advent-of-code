import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const disk = [];
    let id = 0;

    for(let i=0; i<inputData.length; i+=2) {
        let numOfBlocks = parseInt(inputData[i]);
        let numOfSpaces = parseInt(inputData[i+1]);

        for(let j=0; j<numOfBlocks; j++) {
            disk.push(id);
        }
        for(let j=0; j<numOfSpaces; j++) {
            disk.push(".");
        }
        id++;
    }

    const maxID = id-1;
    const diskPart1 = [...disk];
    let l = 0;
    let r = diskPart1.length-1;

    while(l<r) {
        while(diskPart1[l] !== ".") {
            l++;
        }
        if(l >= r) break;
        diskPart1[l] = diskPart1[r];
        diskPart1[r] = ".";
        r--;
    }

    let part1 = 0;
    id = 0;
    while(diskPart1[id] !== '.' && id < diskPart1.length) {
        part1+= id*diskPart1[id];
        id++;
    }
    console.log(part1);

    
    const diskPart2 = [...disk];

    let [R1,R2] = [diskPart2.length-1,diskPart2.length-1];
    for(let id = maxID; id >= 0; id--) {
        while(diskPart2[R2] !== id) {
            R2--;
        }
        R1 = R2;
        while(diskPart2[R1] === id) {
            R1--;
        }
        R1++;

        let reqEmptySpace = R2+1-R1;
        let [L1,L2] = [0,0];
        let isFreeSpace = false;
        
        while(L2 <= R1) {
            while(diskPart2[L1] !== '.') {
                L1++;
            }
            L2 = L1;
            while(diskPart2[L2] === '.') {
                L2++;
            }
            if(L2-L1 >= reqEmptySpace) {
                isFreeSpace = true;
                break;
            }
            L1 = L2;
        }

        if(isFreeSpace && L2 <= R1) {
            for(let i = 0; i < reqEmptySpace; i++) {
                [diskPart2[L1+i],diskPart2[R1+i]] = [diskPart2[R1+i],diskPart2[L1+i]]
            }
        }
    }

    let part2 = 0;
    for(let i = 0; i < diskPart2.length; i++) {
        if(typeof diskPart2[i] === 'number') {
            part2 += i * diskPart2[i];
        }
    }
    console.log(part2);
});