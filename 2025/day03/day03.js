import fs from 'fs';

// Shoutout to reddit user Just-Routine-5505,
// whose visualizations helped me solve part 2 of this problem.
// https://www.reddit.com/r/adventofcode/comments/1pd0cp6/2025_day_03_cli_visualization/

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);

    const banks = inputData.split('\r\n');
    let p1 = 0;
    let p2 = 0;

    banks.forEach(bank => {
        // part 1
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

        // part 2
        let max12 = "";
        let l = 0;
        
        for(let r = N-12; r < N; r++) {
            let curMax = -1;
            let curMaxIdx = -1;
            
            for(let i = l; i <= r; i++) {
                if(parseInt(bank[i]) > parseInt(curMax)) {
                    curMax = bank[i];
                    curMaxIdx = i;
                }
            }

            max12 += curMax.toString();
            l = curMaxIdx+1;
        }

        p1 += max2;
        p2 += parseInt(max12);
    });

    console.log(`p1: ${p1}`);
    console.log(`p2: ${p2}`);
});