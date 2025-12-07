import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const worksheet = inputData.split('\r\n');

    const operations = [];
    for(let i = 0; i < worksheet.at(-1).length; i++) {
        if(
            worksheet.at(-1)[i] === "+" ||
            worksheet.at(-1)[i] === "*"
        ) operations.push(worksheet.at(-1)[i]);
    }
    
    // remove last line with operations
    // so it won't interfere with numbers
    worksheet.pop();
    
    const regExNums = /\d+/g;
    const ws = worksheet.map(line => line.match(regExNums).map(n => parseInt(n)));
    const WS_ROWS = ws.length;
    const WS_COLS = ws[0].length;

    let p1 = 0;
    let p2 = 0;

    // part 1;
    for(let c = 0; c < WS_COLS; c++) {
        let operator = operations[c];
        let result = operator === "+" ? 0 : 1;

        for(let r = 0; r < WS_ROWS; r++) {
            if(operator === "+") result += ws[r][c];
            if(operator === "*") result *= ws[r][c];
        }

        p1 += result;
    }

    console.log(`p1: ${p1}`);

    // part 2
    const ROWS = worksheet.length;
    const COLS = worksheet[0].length;
    let opIdx = operations.length - 1;
    let curResult = operations[opIdx] === "+" ? 0 : 1;
    
    for(let c = COLS-1; c >= 0; c--) {
        let numAsStr = "";

        for(let r = 0; r < ROWS; r++) {
            numAsStr += worksheet[r][c];
        }

        let num = parseInt(numAsStr);
        
        if(num) {
            if(operations[opIdx] === "+") curResult += num;
            if(operations[opIdx] === "*") curResult *= num;
        }
        
        if(!num || c === 0) {
            p2 += curResult;
            opIdx--;
            curResult = operations[opIdx] === "+" ? 0 : 1;
        }
        
    }

    console.log(`p2: ${p2}`);
});