/*
 *    hex.js -- lib for working with hexagons ans hex grids.
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *
 *    I found a great resource on hexagons at this address : http://www.redblobgames.com/grids/hexagons/
 *
 */

// Hexagon Class
var Hex = function (cx, cy, radius) {

    var i,
    rad;

    // the points of the Hexagon
    this.points = [];
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;

    i = 0;
    rad = 0;
    while (i < 6) {

        rad += Math.PI / 3;

        this.points.push({

            x : Math.round(Math.cos(rad) * radius + cx),
            y : Math.round(Math.sin(rad) * radius + cy)

        });

        i += 1;

    }

};

var HexGrid = function (sx, sy, w, h, radius) {

    var x,
    y,
    willOffset, // if 1 will offest
    size = radius * 2;
    //hexW = size * 0.75, // hex width
    //hexH = Math.sqrt(3) / 2 * size;

    this.sx = sx;
    this.sy = sy;
    this.w = w;
    this.h = h;
    this.radius = radius;

    // the array of hex class instances
    this.hex = [];

    // hex width
    this.hexW = size * 0.75;

    // hex height ( I found that "Math.sin(Math.PI / 3) * size" also works )
    this.hexH = Math.sqrt(3) / 2 * size;

    x = 0;
    while (x < w) {

        // offset if even
        willOffset = String((x + 1) / 2).indexOf('.') === -1 ? 1 : 0;

        y = 0;
        while (y < h) {

            this.hex.push(new Hex(
                    Math.round(sx + this.hexW * x),
                    Math.round(sy + this.hexH * y + this.hexH / 2 * willOffset),
                    radius));

            y += 1;

        }

        x += 1;

    }

};

HexGrid.prototype.checkPoint = function (x, y, done) {

    var result,
    tri,
    hx = -1,
    hy = -1,
    patBox;

    x -= this.radius;
    y -= this.radius;

    result = {},
    bx = {

        x : Math.floor(x / (grid.radius / 2)),
        y : Math.floor(y / (grid.hexH / 2))

    };

    tri = String(bx.x / 3).indexOf('.') === -1;

    // if a triangle box
    if (tri) {}

    // a non triangle box
    else {

        hx = Math.floor(bx.x / 3);

        patBox = bx.x - Math.floor(bx.x / 6) * 6;

        hy = Math.floor(patBox < 4 ? (bx.y) / 2 : (bx.y - 1) / 2);

    }

    //console.log(tri);
    //console.log('bx pos: ('+bx.x+','+bx.y+')' )
    //console.log('hex pos: (' + hx + ',' + hy + ')');

    if (hx > -1 && hy > -1) {

        console.log('hex pos: (' + hx + ',' + hy + ')');

    }

    done(result);

}
