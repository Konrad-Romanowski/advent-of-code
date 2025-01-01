import fs from 'fs';

function calculate(w1,w2,operator) {
    if(typeof w1 !== 'number' || typeof w2 !== 'number') return;

    if(operator === "OR") return (w1 || w2) ? 1 : 0;
    if(operator === "AND") return (w1 && w2) ? 1 : 0;
    if(operator === "XOR") return (w1 ^ w2) ? 1 : 0;
}

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const data = inputData.split("\r\n\r\n");
    const wires = {};

    data[0].split("\r\n").forEach(line => {
        const [wire,val] = line.split(": ");
        wires[wire] = parseInt(val);
    });

    data[1].split("\r\n").forEach(line => {
        const [input, output] = line.split(" -> ");
        const [in1, operator, in2] = input.split(" ");

        if(!wires.hasOwnProperty(output)) {
            wires[output] = {input1:in1, input2:in2, operator};
        }
        
        if(typeof wires[in1] === 'number' && typeof wires[in2] === 'number') {
            wires[output] = calculate(wires[in1],wires[in2],operator);
        } else if(typeof wires[in1] === 'number') {
            wires[output].input1 = wires[in1];
        } else if(typeof wires[in2] === 'number') {
            wires[output].input2 = wires[in2];
        }
    });

    function getOutput(output) {
        if(typeof output === 'number') return output;
        if(typeof wires[output] === 'number') return wires[output];

        const {input1, operator, input2} = wires[output];
        wires[output] = calculate(getOutput(input1),getOutput(input2),operator);
        return wires[output];
    }

    let zInput = [];

    for(const input of Object.keys(wires)) {
        getOutput(input);
        if(/z\d+/.test(input)) {
            let idx = parseInt(input.slice(1));
            zInput[idx] = wires[input];
        }
    }

    let part1 = 0;
    for(let i = 0; i < zInput.length; i++) {
        part1 += zInput[i]*2**i;
    }
    console.log(part1);
});