import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {

    if(err) return console.log(err);    

    const regEx = /\d+/g;
    const data = inputData.match(regEx);

    const leftCol = [];
    const rightCol = [];

    for(let i = 0; i < data.length; i++) {
        if(i%2 === 0) {
            leftCol[Math.floor(i/2)] = data[i];
        } else {
            rightCol[Math.floor(i/2)] = data[i];
        }
    }
    
    leftCol.sort((a,z) => a-z);
    rightCol.sort((a,z) => a-z);

    let part1 = 0;

    for(let i = 0; i < leftCol.length; i++) {
        part1 += Math.abs(leftCol[i]-rightCol[i]);
    }

    console.log(part1);

    const rCount = {};
    
    for(let i = 0; i < rightCol.length; i++) {
        rCount[rightCol[i]] = (rCount[rightCol[i]] || 0) + 1;
    }

    const part2 = leftCol.reduce((total,num)=>{
        if(rCount[num]) {
            total += rCount[num] * num
        }
        return total;
    },0);

    console.log(part2);
});
