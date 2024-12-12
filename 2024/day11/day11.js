import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    let stones = inputData.split(" ");
    let numOfBlinks = 75;

    let part1 = 0;
    let part2 = 0;

    const memo = {
        '0': ['1']
    }

    let stonesCount = {};
    for(let stone of stones) {
        stonesCount[stone] = (stonesCount[stone] || 0) + 1;
    }

    for(let n = 1; n <= numOfBlinks; n++) {
        let newStonesCount = {};
        for(let stone in stonesCount) {
            if(!memo[stone]) {
                if(stone.length % 2 === 0) {
                    let mid = stone.length/2;
                    let left = parseInt(stone.slice(0,mid)).toString();
                    let right = parseInt(stone.slice(mid)).toString();
                    memo[stone] = [left,right];
                } else {
                    let newStone = parseInt(stone) * 2024;
                    memo[stone] = [newStone.toString()];
                }
            }
            memo[stone].forEach(s => {
                newStonesCount[s] = (newStonesCount[s] || 0) + (stonesCount[stone] || 1);
            });
        }
        stonesCount = newStonesCount
        if(n === 25) {
            for(const v of Object.values(stonesCount)) {
                part1 += v;
            }
        }
    }

    console.log(part1);

    for(const v of Object.values(stonesCount)) {
        part2 += v;
    }
    console.log(part2);
});