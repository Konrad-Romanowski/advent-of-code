import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const points = inputData.split("\r\n").map(line => line.split(",").map(n => parseInt(n)));
    
    let p1 = 0;

    for(let i = 0; i < points.length-1; i++) {
        for(let j = i+1; j < points.length; j++) {
            let [x1,y1] = points[i];
            let [x2,y2] = points[j];
            let area = (Math.abs((x1-x2))+1) * (Math.abs((y1-y2))+1);
            p1 = Math.max(p1, area);
        }
    }

    console.log(`p1: ${p1}`);
});