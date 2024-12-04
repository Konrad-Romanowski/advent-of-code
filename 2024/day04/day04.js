import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {

    if(err) return console.log(err);

    const data = inputData.split("\r\n");
    let map = data.map(line => line.split(""));

    // find all X;
    const X = [];
    for(let i = 0; i<map.length;i++) {
        for(let j=0; j< map[0].length;j++) {
            if(map[i][j] === "X") X.push([i,j])
        }
    }

    let word = "XMAS";
    let part1 = 0;

    for(const x of X) {
        let [r,c] = x;

        const directions = [
            [-1,-1],[-1,0],[-1,1],
            [ 0,-1],       [ 0,1],
            [ 1,-1],[ 1,0],[ 1,1],
        ];

        for(const dir of directions) {
            let [dr,dc] = dir;
            for(let i = 1; i <= word.length-1; i++) {
                if(0 <= r+i*dr && r+i*dr < map.length && 0 <= c+i*dc && c+i*dc < map[0].length &&
                    map[r+i*dr][c+i*dc] === word[i]
                ) {
                    if(i === word.length-1) {
                        part1++;
                    }
                } else {
                    break;
                }
            }
        }
    }

    console.log(part1);

    let [r,c] = [0,0];
    let part2 = 0;

    for(let i = 0; i<map.length-2;i++) {
        for(let j = 0; j<map[0].length-2; j++) {
            // M  S
            //   A
            // M  S
            if(map[r+i][c+j] === "M" && map[r+i][c+j+2] === "S" &&
                        map[r+i+1][c+j+1] === "A" &&
               map[r+i+2][c+j] === "M" && map[r+i+2][c+j+2] === "S"
            ) part2++;
            // M  M
            //   A
            // S  S
            if(map[r+i][c+j] === "M" && map[r+i][c+j+2] === "M" &&
                        map[r+i+1][c+j+1] === "A" &&
               map[r+i+2][c+j] === "S" && map[r+i+2][c+j+2] === "S"
            ) part2++;
            // S  M
            //   A
            // S  M
            if(map[r+i][c+j] === "S" && map[r+i][c+j+2] === "M" &&
                        map[r+i+1][c+j+1] === "A" &&
            map[r+i+2][c+j] === "S" && map[r+i+2][c+j+2] === "M"
            ) part2++;
            // S  S
            //   A
            // M  M
            if(map[r+i][c+j] === "S" && map[r+i][c+j+2] === "S" &&
                        map[r+i+1][c+j+1] === "A" &&
            map[r+i+2][c+j] === "M" && map[r+i+2][c+j+2] === "M"
            ) part2++;
        }
    }

    console.log(part2);
});