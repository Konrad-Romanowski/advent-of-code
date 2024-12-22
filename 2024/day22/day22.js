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
    
    const prices = inputData.split("\r\n").map(price => parseInt(price)); // change to int

    let finalSecretNums = [];

    for(const price of prices) {
        let secretNum = price;
        for(let i = 0; i < 2000; i++) {
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
        }
        finalSecretNums.push(secretNum)
    }

    let part1 = finalSecretNums.reduce((sum,num) => sum+=num);
    console.log(part1);
});