import fs from 'fs';

// It turns out that the input for part 1 of the puzzle has been prepared
// in such a way that it is sufficient to check whether the area of the given region 
// is greater than the sum of the areas of the smallest rectangles in which every shape can fit.

fs.readFile('input.in','utf-8',(err,inputData) => {
    if(err) return console.log(err);

    const shapesAndRegionsData = inputData.split("\r\n\r\n");
    const shapeRegEx = /\b\d+\:/;

    const shapes = [];
    let regions;
    
    for(let i = 0 ; i < shapesAndRegionsData.length; i++) {
        if(shapesAndRegionsData[i].match(shapeRegEx)) {
            shapes.push(shapesAndRegionsData[i]);
        } else {
            regions = shapesAndRegionsData[i].split("\r\n");
        }
    }

    const shapesSizes = [];
    const rectangleSize = [];

    for(let i = 0; i < shapes.length; i++) {
        let shapeCount = 0;
        let rectCount = 0;
        for(let k = 0; k < shapes[i].length; k++) {
            if(shapes[i][k] === "#") {
                shapeCount++;
                rectCount++;
            }
            if(shapes[i][k] === ".") rectCount++;
        }
        shapesSizes[i] = shapeCount;
        rectangleSize[i] = rectCount;
    }

    regions = regions.map(region => {
        let [dim,quantity] = region.split(":");
        quantity = quantity.match(/\d+/g).map(n => parseInt(n));
        let [x,y] = dim.split("x");
        x = parseInt(x);
        y = parseInt(y);

        return {dim: [x,y], quantity};
    });

    let p1 = 0;

    for(let i = 0; i < regions.length; i++) {
        let region = regions[i];

        let {dim: [x,y], quantity} = region;
        let area = x*y;
    
        let minRequiredCells = 0;
        let maxRequiredCells = 0;
    
        for(let j = 0; j < quantity.length; j++) {
            minRequiredCells += quantity[j] * shapesSizes[j];
            maxRequiredCells += quantity[j] * rectangleSize[j];
        }
    
        if(area < minRequiredCells) continue;
        if(maxRequiredCells <= area) p1++;
    }

    console.log(`p1: ${p1}`);
});