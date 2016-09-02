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
    this.selected = false;

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
    this.selected = 0;

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

    this.hex[0].selected = true;

};

// set selected of all hex
HexGrid.prototype.setSelected = function () {

    this.hex.forEach(function (hex, index) {

        hex.selected = false;

        if (index === grid.selected) {

            hex.selected = true;

        }

    });

};

// find the index of the hex with the center point that is closest to the given point
HexGrid.prototype.find = function (x, y) {

    var i = 0,
    len = this.hex.length,
    min = Infinity,
    d,
    h,
    sel = -1;
    while (i < len) {

        h = this.hex[i];

        d = Math.sqrt(Math.pow(x - h.cx, 2) + Math.pow(y - h.cy, 2));

        if (d < min) {

            min = d;
            sel = i;

        }

        i += 1;

    }

    return sel;

};

HexGrid.prototype.checkPoint = function (x, y, done) {

    var result,
    tri,
    hx = -1,
    hy = -1,
    patBox,
    index;

    x -= this.radius;
    y -= this.radius;

    result = {},
    bx = {

        x : Math.floor(x / (grid.radius / 2)),
        y : Math.floor(y / (grid.hexH / 2))

    };

    tri = String(bx.x / 3).indexOf('.') === -1;
    if (x > 0 & y > 0 & x < this.radius * 2 * (this.w - 1) & y < this.hexH * this.h) {
        // if a triangle box
        if (tri) {

            //console.log('triangle area');


            index = this.find(x += this.radius, y += this.radius);

            hx = Math.floor(index / this.h);
            hy = Math.floor(index - (hx * this.h));

            // a non triangle box
        } else {

            hx = Math.floor(bx.x / 3);

            patBox = bx.x - Math.floor(bx.x / 6) * 6;

            hy = Math.floor(patBox < 4 ? (bx.y) / 2 : (bx.y - 1) / 2);

            if (hy >= this.h) {

                hy = -1;

            }

        }

    }

    //console.log(tri);
    //console.log('bx pos: ('+bx.x+','+bx.y+')' )
    //console.log('hex pos: (' + hx + ',' + hy + ')');

    if (hx > -1 && hy > -1) {

        console.log('hex pos: (' + hx + ',' + hy + ')');

        this.selected = hx * this.h + hy;

        console.log(this.selected);
		
		this.setSelected();

    }

    done(result);

}
