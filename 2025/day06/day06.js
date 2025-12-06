import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    inputData = inputData.split('\r\n');

    const operations = [];
    for(let i = 0; i < inputData.at(-1).length; i++) {
        if(
            inputData.at(-1)[i] === "+" ||
            inputData.at(-1)[i] === "*"
        ) operations.push(inputData.at(-1)[i]);
    }
    
    // remove last line with operations
    // se we can apply regEx to get numbers 
    // and then map over and parseInt numbers
    inputData.pop();
    
    const regExNums = /\d+/g;
    const worksheet = inputData.map(line => line.match(regExNums).map(n => parseInt(n)));
    const ROWS = worksheet.length;
    const COLS = worksheet[0].length;

    let p1 = 0;

    for(let c = 0; c < COLS; c++) {
        let operator = operations[c];
        let result = operator === "+" ? 0 : 1;

        for(let r = 0; r < ROWS; r++) {
            if(operator === "+") result += worksheet[r][c];
            if(operator === "*") result *= worksheet[r][c];
        }

        p1 += result;
    }

    console.log(`p1: ${p1}`);
});