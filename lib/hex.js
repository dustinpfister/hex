/*
 *    hex.js -- lib for working with hexagons ans hex grids.
 *    Copyright 2016 by Dustin Pfister (GPL v3)
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

var HexGrid = function () {};
