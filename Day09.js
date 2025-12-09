const fs = require('fs');
const { PNG } = require('pngjs');

const parseInput = (input) => input.trim().split('\n').map(line => line.split(',').map(Number)).map(([x, y]) => ({x, y}));

function makeRectangles(points) {
    const squares = [];
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        for(let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const square = {
                p1, p2, 
                 area: (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1)
            };
            squares.push(square);
        }   
    }
    return squares;
}

// Helper: Bresenham's line algorithm for rasterizing lines between two points
function rasterizeLine(p1, p2) {
    const points = [];
    if (p1.x === p2.x) { // vertical
        const [yStart, yEnd] = p1.y < p2.y ? [p1.y, p2.y] : [p2.y, p1.y];
        for (let y = yStart; y <= yEnd; y++) {
            points.push({x: p1.x, y});
        }
    } else if (p1.y === p2.y) { // horizontal
        const [xStart, xEnd] = p1.x < p2.x ? [p1.x, p2.x] : [p2.x, p1.x];
        for (let x = xStart; x <= xEnd; x++) {
            points.push({x, y: p1.y});
        }
    } else {
        throw new Error('Non-axis-aligned line detected');
    }
    return points;
}

// Helper: Scanline polygon fill (returns Set of 'x,y' strings for all filled tiles)
function fillPolygon(polygon, png) {
    // Find bounds
    let minY = Math.min(...polygon.map(p => p.y));
    let maxY = Math.max(...polygon.map(p => p.y));
    for (let y = minY; y <= maxY; y++) {
        // Find intersections with scanline
        let nodes = [];
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let pi = polygon[i], pj = polygon[j];
            if ((pi.y < y && pj.y >= y) || (pj.y < y && pi.y >= y)) {
                let x = Math.round(pi.x + (y - pi.y) * (pj.x - pi.x) / (pj.y - pi.y));
                nodes.push(x);
            }
        }
        nodes.sort((a, b) => a - b);
        for (let k = 0; k < nodes.length; k += 2) {
            if (nodes[k + 1] !== undefined) {
                for (let x = nodes[k]; x <= nodes[k + 1]; x++) {
                    if(png.data[(y * png.width + x) * 4]===255) continue; // Skip if already red 

                    png.data[(y * png.width + x) * 4] = 0;      // Red
                    png.data[(y * png.width + x) * 4 + 1] = 255; // Green
                    png.data[(y * png.width + x) * 4 + 2] = 0;  // Blue
                    png.data[(y * png.width + x) * 4 + 3] = 255; // Alpha
                }
            }
        }
    }
    return png;
}

// Helper: Get all green tiles (lines + fill)
function getGreenTiles(points, png) {
    // Add lines between consecutive points (including closing line)
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        for (const pt of rasterizeLine(p1, p2)) {
            if(png.data[(pt.y * png.width + pt.x) * 4]===255) continue; // Skip if already red

            png.data[(pt.y * png.width + pt.x) * 4] = 0;      // Red
            png.data[(pt.y * png.width + pt.x) * 4 + 1] = 255;  // Green
            png.data[(pt.y * png.width + pt.x) * 4 + 2] = 0;  // Blue
            png.data[(pt.y * png.width + pt.x) * 4 + 3] = 255; // Alpha
        }
    }
    // Add filled area
    png = fillPolygon(points, png)
    const pngCopy = copyPng(png);
    png.pack().pipe(fs.createWriteStream('Day09_Part2.png'));
    
    return pngCopy;
}

// Main function: find rectangles defined by two red tiles, fully inside green
// Helper: Point-in-polygon test (ray casting)
function pointInPolygon(pt, polygon) {
    let x = pt.x, y = pt.y;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].x, yi = polygon[i].y;
        let xj = polygon[j].x, yj = polygon[j].y;
        let intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi + 0.0000001) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function rectanglesInGreen(points, png) {
    png = getGreenTiles(points,png);

    const rectangles = [];
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i], p2 = points[j];
            const minX = Math.min(p1.x, p2.x), maxX = Math.max(p1.x, p2.x);
            const minY = Math.min(p1.y, p2.y), maxY = Math.max(p1.y, p2.y);
            // Check all tiles in the rectangle
            let allValid = true;
            for (let x = minX; x <= maxX && allValid; x++) {
                for (let y = minY; y <= maxY && allValid; y++) {
                    const idx = (y * png.width + x) * 4;
                    // Red: [255,0,0,255], Green: [0,255,0,255]
                    const r = png.data[idx], g = png.data[idx+1];
                    if (!(r === 255 || g === 255)) {
                        allValid = false;
                    }
                }
            }
            if (allValid) {
                rectangles.push({p1, p2, area: (maxX - minX + 1) * (maxY - minY + 1)});
            }
        }
    }
    return rectangles;
}

function drawRedTiles(points, size) {
    const png = new PNG({width: size.width, height: size.height});
    
    for (let y = 0; y < size.height; y++) {
        for (let x = 0; x < size.width; x++) {
            const idx = (size.width * y + x) << 2;
            png.data[idx] = 0;      // Red
            png.data[idx + 1] = 0;  // Green
            png.data[idx + 2] = 0;// Blue
            png.data[idx + 3] = 255;// Alpha
        }
    }

    for (const pt of points) {
        const idx = (pt.y * size.width + pt.x) * 4;
        png.data[idx] = 255;    // Red
        png.data[idx + 1] = 0;  // Green
        png.data[idx + 2] = 0;  // Blue
        png.data[idx + 3] = 255; // Alpha
    }
    
    const pngCopy = copyPng(png);
    png.pack().pipe(fs.createWriteStream('Day09_Part1.png'));

    return pngCopy;
}
function copyPng(png) {
    const pngCopy = new PNG({ width: png.width, height: png.height });
    png.data.copy(pngCopy.data);
    return pngCopy;
}

function run(input) {
    let points = parseInput(input);

    const size = points.reduce((acc, p) => ({
        minX: Math.min(acc.minX, p.x),
        minY: Math.min(acc.minY, p.y),
        width: Math.max(acc.width, p.x + 1),
        height: Math.max(acc.height, p.y + 1)
    }), {minX: Infinity, minY: Infinity, width: 0, height: 0});

    points = points.map(p => ({x: p.x - size.minX, y: p.y - size.minY}));
    size.width -= size.minX;
    size.height -= size.minY;
    console.log("Canvas size:", size);

    let png = drawRedTiles(points, size);

    // Part 1
    const rectangles = makeRectangles(points).sort((a, b) => b.area - a.area);
    console.log("Largest rectangle area:", rectangles[0].area);
    
    // Part 2
    const rects = rectanglesInGreen(points, png);
    if (rects.length > 0) {
        const largest = rects.sort((a, b) => b.area - a.area)[0];
        console.log("Largest rectangle in green:", largest);
    }
}

let testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
run(testInput);