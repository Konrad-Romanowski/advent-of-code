import fs from 'fs';
import { Queue } from '@datastructures-js/queue';

fs.readFile('input.in','utf-8',(err,inputData) => {    
    if(err) return console.log(err);
    
    let schematics = inputData.split("\r\n");

    schematics = schematics.map(line => {
        const items = line.split(" ");

        const lightDiagram = items[0].slice(1,line.indexOf("]")).split("").map(sign => {
            if(sign === ".") return 0;
            if(sign === "#") return 1;
        }).join("");

        const buttons = [];
        
        for(let i = 1; i < items.length-1; i++) {
            buttons.push(JSON.parse("[" + items[i].slice(1,-1) + "]"));
        }

        return {lightDiagram, buttons};
    });

    let p1 = 0;

    schematics.forEach(machine => {
        const {lightDiagram, buttons} = machine;

        const initialLights = new Array(lightDiagram.length).fill(0);
        const SEEN = new Set();
        const q = new Queue();

        q.push([initialLights,0]); // [curLightsState, numOfPresses]

        while(q.size()) {
            let [curLights,n] = q.pop();

            if(curLights.join("") === lightDiagram) {
                p1 += n;
                break;
            }

            for(let btn of buttons) {
                let ligths = [...curLights];
                
                for(let idx of btn) {
                    ligths[idx] = ligths[idx] === 1 ? 0 : 1;
                }

                if(!SEEN.has(ligths.join(""))) {
                    q.push([ligths,n+1]);
                    SEEN.add(ligths.join(""));
                }
            }
        }
    });

    console.log(`p1: ${p1}`);
});