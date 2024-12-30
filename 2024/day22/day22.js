import fs from 'fs';

function prune(secretNum) {
    let result = secretNum % 16777216;
    return result < 0 ? result + 16777216 : result;
}

function mix(num, secretNum) {
    return num ^ secretNum;
}

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const secretNums = inputData.split("\r\n").map(num => parseInt(num));

    let finalSecretNums = [];
    let max = {val: 0, seq: ""};
    let sequenceSum = {};

    for(let secretNum of secretNums) {
        const seen = new Set();
        const bananasPrices = [secretNum % 10];
        for(let i = 1; i <= 2000; i++) {
            // step I
            // Calculate the result of multiplying the secret number by 64.
            // Then, mix this result into the secret number.
            let step1result = mix(secretNum*64,secretNum);
            // Finally, prune the secret number.
            secretNum = prune(step1result);
        
            // step II
            // Calculate the result of dividing the secret number by 32. 
            // Round the result down to the nearest integer.
            let step2result = Math.floor(secretNum / 32);
            // Then, mix this result into the secret number.
            secretNum = mix(step2result,secretNum);
            // Finally, prune the secret number.
            secretNum = prune(secretNum);
        
            // step III
            // Calculate the result of multiplying the secret number by 2048.
            let step3result = secretNum*2048;
            // Then, mix this result into the secret number.
            secretNum = mix(step3result,secretNum); 
            // Finally, prune the secret number.
            secretNum = prune(secretNum);

            const price = secretNum % 10;
            bananasPrices.push(price);

            if(i >= 4) {
                const changesSeq = JSON.stringify([
                    bananasPrices[i-3] - bananasPrices[i-4],
                    bananasPrices[i-2] - bananasPrices[i-3],
                    bananasPrices[i-1] - bananasPrices[i-2],
                    price - bananasPrices[i-1]
                ]);

                if(!seen.has(changesSeq)) {
                    seen.add(changesSeq);
                    if(changesSeq in sequenceSum) {
                        sequenceSum[changesSeq] += price;
                    } else {
                        sequenceSum[changesSeq] = price;
                    }
                    
                    if(max.val < sequenceSum[changesSeq]) {
                        max.val = sequenceSum[changesSeq];
                        max.seq = changesSeq;
                    }
                }
            }
        }
        finalSecretNums.push(secretNum);
    }

    let part1 = finalSecretNums.reduce((sum,num) => sum+=num);
    console.log(part1);

    let part2 = max.val;
    console.log(part2);
});