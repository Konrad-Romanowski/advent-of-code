import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    let stones = inputData.split(" ");
    let numOfBlinks = 25;

    // Simple solution for part1
    // for(let n = 0; n < numOfBlinks; n++) {
    //     for(let i = 0; i < stones.length; i++) {
    //         if(stones[i] === '0') {
    //             stones[i] = "1";
    //         } else if(stones[i].length%2 ===0) {
    //             let mid = stones[i].length/2;
    //             let left = parseInt(stones[i].slice(0,mid)).toString();
    //             let right = parseInt(stones[i].slice(mid)).toString();
    //             stones.splice(i,1,left,right);
    //             i++;
    //         } else {
    //             let newStone = parseInt(stones[i]) * 2024;
    //             stones[i] = newStone.toString();
    //         }
    //     }
    // }
    // console.log(stones.length);

    // Slightly better solution using memoization
    // still not good enough for part2
    stones = inputData.split(" ");

    const memo = {
        '0': ['1']
    }
    
    for(let n = 0; n < numOfBlinks; n++) {
        for(let i = 0; i < stones.length; i++) {
            let stone = stones[i];
            if(memo[stone]) {
                stones.splice(i,1,...memo[stone]);
                i+= memo[stone].length-1;
            } else {
                if(stone.length%2 === 0) {
                    let mid = stone.length/2;
                    let left = parseInt(stone.slice(0,mid)).toString();
                    let right = parseInt(stone.slice(mid)).toString();
                    memo[stone] = [left,right];
                } else {
                    let newStone = parseInt(stone) * 2024;
                    memo[stone] = [newStone.toString()];
                }
                stones.splice(i,1,...memo[stone]);
                i+= memo[stone].length-1;
            }
        }
    }

    let part1 = stones.length;
    console.log(part1);
});