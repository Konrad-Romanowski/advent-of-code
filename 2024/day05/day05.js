import fs from 'fs';

fs.readFile('input.txt','utf-8',(err,inputData) => {
    
    if(err) return console.log(err);

    const lines = inputData.split("\r\n");
    
    const breakLine = lines.indexOf("");
    const rules = new Set(lines.slice(0,breakLine));
    const pages = lines.slice(breakLine+1).map(page => page.split(','));
    
    let part1 = 0;
    const pagesInCorrectOrder = [];
    const pagesInIncorrectOrder = [];

    pages.forEach(page => {
        let isInOrder = true;
        for(let i=0; i<page.length-1; i++) {
            for(let j=i+1; j<page.length; j++) {
                // note that we are checking if there is a REVERSED ORDER rule
                if(rules.has(`${page[j]}|${page[i]}`)) {
                    isInOrder = false;
                    break;
                }
                if(!isInOrder) break;
            }
        }
        if(isInOrder) {
            pagesInCorrectOrder.push(page);
        } else {
            pagesInIncorrectOrder.push(page);
        }
    });

    pagesInCorrectOrder.forEach(pages => {
        let mid = Math.floor(pages.length/2);
        part1 += parseInt(pages[mid]);
    });

    console.log(part1);

    function sortPages(nums) {
        for(let i=0; i<nums.length-1; i++) {
            for(let j=i+1;j<nums.length; j++) {
                if(rules.has(`${nums[j]}|${nums[i]}`)) {
                    [nums[i],nums[j]] = [nums[j],nums[i]];
                }
            }
        }
    }

    let part2 = 0;

    pagesInIncorrectOrder.forEach(pages => {
        sortPages(pages);
        let mid = Math.floor(pages.length/2);
        part2 += parseInt(pages[mid]);
    });

    console.log(part2);
});