import fs from 'fs';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const banks = inputData.split('\r\n');
    let p1 = 0;

    banks.forEach(bank => {
        const N = bank.length;
        let Lmax = new Array(N).fill(parseInt(bank[0]));
        let Rmax = new Array(N).fill(parseInt(bank[N-1]));

        for(let i = 1; i < N; i++) {
            Lmax[i] = Math.max(Lmax[i-1],bank[i]);
            Rmax[N-i-1] = Math.max(Rmax[N-i],bank[N-i-1]);
        }

        let max2 = -1;
        for(let i = 0; i < N-1; i++) {
            max2 = Math.max(max2,10*Lmax[i]+Rmax[i+1]);
        }
        
        p1 += max2;
    });

    console.log(`p1: ${p1}`);
});