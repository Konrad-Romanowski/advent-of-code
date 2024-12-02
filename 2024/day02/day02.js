import fs from 'fs';

function isInOrder(num1,num2,order) {
    if(num1 < num2 && order === 'increasing') return true;
    if(num1 > num2 && order === 'decreasing') return true;
    return false;
}

function isSafe(arr) {
    let order = 'increasing';
    if(arr[0] > arr.at(-1)) {
        order = 'decreasing';
    }

    for(let i = 0; i < arr.length-1; i++) {
        if(!isInOrder(arr[i],arr[i+1],order) || Math.abs(arr[i+1]-arr[i]) > 3) return false;
    }

    return true;
}

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);

    const lines = inputData.split("\r\n").map(line => line.split(" ").map(num => parseInt(num)));

    let part1 = 0;

    lines.forEach(line => {
        if(isSafe(line)) part1++;
    });

    console.log(part1);

    // part 2 brute force solution
    let unsafe = lines.filter(line => !isSafe(line));

    let linesToImprove = 0;
    for(let i = 0; i < unsafe.length; i++) {
        const lineCopy = structuredClone(unsafe[i]);
        for(let j = 0; j < lineCopy.length; j++) {
            if(isSafe([...lineCopy.slice(0,j) , ...lineCopy.slice(j+1)])) {
                linesToImprove++;
                break;
            }
        }
    }

    const part2 = part1 + linesToImprove;
    console.log(part2);
});
