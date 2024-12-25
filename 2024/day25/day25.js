import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);
    
    const LocksAndKeys = inputData.split("\r\n\r\n").map(lockOrKey => lockOrKey.split("\r\n"));
    const locks = [];
    const keys = [];

    for(const lockOrKey of LocksAndKeys) {
        if(lockOrKey[0] === '#####') locks.push(lockOrKey);
        if(lockOrKey[0] === '.....') keys.push(lockOrKey);
    }

    let locksAsPins = [];
    let keysAsPins = [];

    for(const lock of locks) {
        let lockPin = [];
        // column
        for(let  j = 0; j < lock[0].length; j++) {
            // row
            for(let i = 1; i < lock.length; i++) {
                if(lock[i][j] === '.') {
                    lockPin.push(i-1);
                    break;
                }
            }
        }
        locksAsPins.push(lockPin);
    }

    for(const key of keys) {
        let keyPin = [];
        // column
        for(let  j = 0; j < key[0].length; j++) {
            // row
            for(let i = 1; i < key.length; i++) {
                if(key[i][j] === '#') {
                    keyPin.push(key.length-(i+1));
                    break;
                }
            }
        }
        keysAsPins.push(keyPin);
    }

    let numOfMatches = 0;

    for(let key of keysAsPins) {
        for(let lock of locksAsPins) {
            let isMatching = true;
            for(let pin = 0; pin < key.length; pin++) {
                if(key[pin] + lock[pin] > key.length) {
                    isMatching = false;
                    break;
                }
            }
            if(isMatching) numOfMatches++;
        }
    }

    let part1 = numOfMatches;
    console.log(part1);
});