import fs from 'fs';

function calibratePart1(target,nums) {
    let isSolutionFound = false;

    function calculate(idx,currentResult) {
        if(currentResult > target || isSolutionFound) return;

        if(currentResult === target && idx === nums.length-1) {
            isSolutionFound = true;
            return;
        }

        if(idx < nums.length) {
            calculate(idx+1,currentResult+nums[idx+1]);
            calculate(idx+1,currentResult*nums[idx+1]);
        }
    }

    calculate(0,nums[0]);
    return isSolutionFound ? target : 0;
}

function calibrate2Part2(target,nums) {
    let isSolutionFound = false;

    function calculate(idx,currentResult) {
        if(currentResult > target || isSolutionFound) return;
        
        if(currentResult === target && idx === nums.length-1) {
            isSolutionFound = true;
            return;
        }

        if(idx < nums.length) {
            calculate(idx+1,currentResult+nums[idx+1]);
            calculate(idx+1,currentResult*nums[idx+1]);
            let concat = parseInt(currentResult.toString() + JSON.stringify(nums[idx+1]));
            calculate(idx+1,concat);
        }
    }

    calculate(0,nums[0]);
    return isSolutionFound ? target : 0;
}

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n");
    const regEx = /\d+/g;

    let part1 = 0;
    let part2 = 0;

    data.forEach(line => {
        let [result,...nums] = line.match(regEx).map(num => parseInt(num));
        part1 += calibratePart1(result,nums);
        part2 += calibrate2Part2(result,nums);
    });

    console.log(part1);
    console.log(part2);
});