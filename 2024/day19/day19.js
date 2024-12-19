import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n\r\n");

    const towels = data[0].split(", ");
    const patterns = data[1].split("\r\n");

    let part1 = 0;

    // backtracking approach - do not work on large input
    function findTowels(pattern) {
        let isMatchingPattern = false;
        function matchTowels(currentPattern) {
            if(isMatchingPattern) return;
            if(currentPattern.length > pattern.length) return false;
            if(currentPattern === pattern) {
                isMatchingPattern = true;
                return;
            }

            for(let i = 0; i < towels.length; i++) {
                matchTowels(currentPattern+towels[i]);
                if(isMatchingPattern) return;
            }
        }

        matchTowels("");
        return isMatchingPattern;
    }

    for(let pattern of patterns) {
        if(findTowels(pattern)) part1++;
    }
    
    console.log(part1);
});