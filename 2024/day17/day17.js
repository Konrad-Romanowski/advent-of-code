import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n");
    const regEx = /\d+/g;

    let A = parseInt(data[0].match(regEx));
    let B = parseInt(data[1].match(regEx));
    let C = parseInt(data[2].match(regEx));
    let operations = data[4].match(regEx).map(opNum => parseInt(opNum));

    let output = "";

    function combo(op,regA,regB,regC) {
        if(op <= 3) return op;
        if(op === 4) return regA % 8;
        if(op === 5) return regB % 8;
        if(op === 6) return regC % 8;
        if(op === 7) return 0;
    }

    for(let i = 0; i < operations.length; i+=2) {
        let opcode = operations[i];
        let operand = operations[i+1];
        let result;

        if(opcode === 0) {
            result = Math.floor(A/(2 ** combo(operand,A,B,C)));
            A = result;
        }

        if(opcode === 1) {
            result = B ^ operand;
            B = result;
        }

        if(opcode === 2) {
            result = combo(operand,A,B,C);
            B = result;
        }

        if(opcode === 3) {
            if(A === 0) continue;
            i = operand - 2;
        }

        if(opcode === 4) {
            result = B ^ C;
            B = result;
        }

        if(opcode === 5) {
            result = combo(operand,A,B,C);
            output += result.toString() + ",";
        }

        if(opcode === 6) {
            result = Math.floor(A/(2 ** combo(operand,A,B,C)));
            B = result;
        }

        if(opcode === 7) {
            result = Math.floor(A/(2 ** combo(operand,A,B,C)));
            C = result;
        }
    }
    let part1 = output.slice(0,-1);
    console.log(part1);
});