import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);

    const lines = inputData.split("\r\n");
    
    let breakLine = lines.indexOf("");
    let rules = new Set(lines.slice(0,breakLine));
    let pages = lines.slice(breakLine+1).map(page => page.split(','))
    
    let part1 = 0;
    let pagesInCorrectOrder = [];

    pages.forEach(page => {
        let isInOrder = true;
        for(let i=0; i<page.length-1; i++) {
            for(let j=i+1; j<page.length; j++) {
                if(rules.has(`${page[j]}|${page[i]}`)) {
                    isInOrder = false
                }
            }
        }
        if(isInOrder) pagesInCorrectOrder.push(page);
    });


    pagesInCorrectOrder.forEach(pages => {
        let mid = Math.floor(pages.length/2)
        part1 += parseInt(pages[mid]);
    });

    console.log(part1);
});
