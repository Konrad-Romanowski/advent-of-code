import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);

    const mulRegEx = /mul\(\d{1,3}\,\d{1,3}\)/g;
    const data = inputData.match(mulRegEx);

    const factorRegEx = /\d{1,3}/g
    const multPairs1 = data.map(el => {
        return el.match(factorRegEx).map(n => parseInt(n));
    });

    let part1 = multPairs1.reduce((sum,pair) => {
        return sum += pair[0] * pair[1];
    },0);

    console.log(part1);

    const regExDontDo = /don't\(\).*?do\(\)/g;

    const simplifiedInputData = inputData.replace(/\r\n/g,"").replace(regExDontDo,"");
    const simplifiedData = simplifiedInputData.match(mulRegEx);

    const multPairs2 = simplifiedData.map(el => {
        return el.match(factorRegEx).map(n => parseInt(n));
    });

    let part2 = multPairs2.reduce((sum,pair) => {
        return sum += pair[0] * pair[1];
    },0);

    console.log(part2);
});
