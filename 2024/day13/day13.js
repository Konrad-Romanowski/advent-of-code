import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n");
    
    let regEx = /\d+/g;
    let clawMachines = [];
    const maxButtonPress = 100;
    const costA = 3;
    const costB = 1;

    for(let i = 0; i < data.length; i+=4) {
        let A = data[i].match(regEx).map(x => parseInt(x));
        let B = data[i+1].match(regEx).map(x => parseInt(x));
        let prize = data[i+2].match(regEx).map(x => parseInt(x));
        
        clawMachines[Math.floor(i/4)] = {
            A, B, prize
        }
    }

    let part1 = 0;

    for(const m of clawMachines) {
        let minCost = Infinity;
        let currCost;
        for(let a = 1; a <= maxButtonPress; a++) {
            for(let b = 1; b <= maxButtonPress; b++) {
                if(a*m.A[0] + b*m.B[0] === m.prize[0] && a*m.A[1] + b*m.B[1] === m.prize[1]) {
                    currCost = a*costA + b*costB;
                    if(currCost < minCost) {
                        minCost = currCost;
                    }
                }
            }
        }
        if(minCost !== Infinity) part1+= minCost;
    }

    console.log(part1);
});