import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);
    
    const IDs = inputData.split(",");
    const IDsWithRepeatedSequence = new Set();
    let p1 = 0;
    let p2 = 0;

    IDs.forEach(range => {
        let [start,end] = range.split("-");
        let s = parseInt(start);
        let e = parseInt(end);

        for(let i = s; i <= e; i++) {
            let id = i.toString();
            let mid = id.length/2;

            for(let k = 1; k <= mid; k++) {
                if(id.length % k !== 0) continue;

                let pattern = id.slice(0,k);
                let reps = id.length/k;
                let matchAll = true;

                for(let j = 1; j < reps; j++) {
                    if(id.slice(j*k,(j+1)*k) !== pattern) {
                        matchAll = false;
                        break;
                    }
                }

                if(matchAll) {
                    if(k === mid) p1 += i;
                    IDsWithRepeatedSequence.add(i);
                }
            }
        }
    });

    IDsWithRepeatedSequence.forEach(id => p2 += id);

    console.log(`p1: ${p1}`);
    console.log(`p2: ${p2}`);
});