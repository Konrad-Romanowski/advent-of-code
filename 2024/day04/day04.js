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

    // part 1
    let part1 = 0;
    // for each x in X look 3 steps ahead in every direction
    // check if we are not out of the bounds of the map
    // and check if in each consecutive step there is a correct letter
    for (const x of X) {
        let [r,c] = x;
        
        // check NE
        for(let i=1; i<=3; i++) {
            if(0 <= r-i && r-i < map.length && 0 <= c-i && c-i < map[0].length && map[r-i][c-i] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }

        // 2. check N
        for(let i=1; i<=3; i++) {
            if(0 <= r-i && r-i < map.length && 0 <= c && c < map[0].length && map[r-i][c] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }

        // 3. check NE
        for(let i=1; i<=3; i++) {
            if(0 <= r-i && r-i < map.length && 0 <= c+i && c+i < map[0].length && map[r-i][c+i] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }

        // 4. check E
        for(let i=1; i<=3; i++) {
            if(0 <= r && r < map.length && 0 <= c+i && c+i < map[0].length && map[r][c+i] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }

        // 5. check SE
        for(let i=1; i<=3; i++) {
            if(0 <= r+i && r+i < map.length && 0 <= c+i && c+i < map[0].length && map[r+i][c+i] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }

        // 6. check S
        for(let i=1; i<=3; i++) {
            if(0 <= r+i && r+i < map.length && 0 <= c && c < map[0].length && map[r+i][c] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }

        // 7. check SW
        for(let i=1; i<=3; i++) {
            if(0 <= r+i && r+i < map.length && 0 <= c-i && c-i < map[0].length && map[r+i][c-i] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }

        // 8. check W
        for(let i=1; i<=3; i++) {
            if(0 <= r && r < map.length && 0 <= c-i && c-i < map[0].length && map[r][c-i] === word[i]) {
                if(i === 3) part1++;
            } else {
                break;
            }
        }
    }

    console.log(part1);

    // part 2
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