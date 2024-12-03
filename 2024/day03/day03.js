import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);

    const mulRegEx = /mul\(\d{1,3}\,\d{1,3}\)/g;
    
    let data = inputData.match(mulRegEx);

    const factorRegEx = /\d{1,3}/g
    const data1 = data.map(el => {
        return el.match(factorRegEx).map(n => parseInt(n));
    });

    let part1 = data1.reduce((sum,pair) => {
        return sum += pair[0] * pair[1];
    },0);

    console.log(part1);
});
