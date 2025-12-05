import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const intervals = inputData.split("\r\n\r\n")[0].split("\r\n").map(interval => {
        let [start,end] = interval.split("-");
        return [parseInt(start),parseInt(end)];
    });
    const IDs = inputData.split("\r\n\r\n")[1].split("\r\n").map(n => parseInt(n));

    intervals.sort((a,b) => a[0] - b[0]);

    let p1 = 0;
    let p2 = 0;

    // part 1
    IDs.forEach(id => {
        for(let i = 0; i < intervals.length; i++) {
            let [start,end] = intervals[i];
            if(start <= id && id <= end) {
                p1++;
                break;
            }
            if(start > id) break;
        }
    });

    console.log(`p1: ${p1}`);

    // part 2
    let curMax = -1;

    for(let i = 0; i < intervals.length; i++) {
        let [start, end] = intervals[i];
        
        if(curMax < start) {
            p2 += end-start+1;
        } else if(curMax <= end) {
            p2 += end-curMax; // no '+1' - curMax id was already counted
        } else {
            continue;
        }
        curMax = end;
    }

    console.log(`p2: ${p2}`);
});