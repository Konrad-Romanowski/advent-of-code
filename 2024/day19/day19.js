import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n\r\n");
    const towels = data[0].split(", ");
    const patterns = data[1].split("\r\n");

    let part1 = 0;

    for(let pattern of patterns) {
        let q = [""];
        let checked = new Set();

        while(q.length) {
            let currentPattern = q.pop();
            checked.add(currentPattern);
            if(currentPattern === pattern) {
                part1++;
                break;
            }
            for(const towel of towels) {
                let newPattern = currentPattern + towel;
                if(
                    newPattern.length <= pattern.length &&
                    newPattern === pattern.slice(0,newPattern.length) &&
                    !checked.has(newPattern)
                ) {
                    q.push(newPattern);
                }
            }
        }
    }
    
    console.log(part1);
});