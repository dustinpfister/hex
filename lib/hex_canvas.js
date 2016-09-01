/*
 *    hex_canvas.js -- a 2d canvas drawing lib for my hex.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 */

var hexCanvas = {

    // draw the given hex class instance with the given context
    drawHex : function (ctx, hex) {

        console.log(hex);

        var i = 0,
        len = hex.points.length;
        ctx.beginPath();
        ctx.moveTo(hex.points[0].x, hex.points[0].y);
        while (i < len) {

            ctx.lineTo(hex.points[i].x, hex.points[i].y);

            i += 1;

        }

        ctx.closePath();
        ctx.stroke();

    },

    // draw the given text at the center of the given hexagon.
    atHexCenter : function (ctx, hex, text) {

        ctx.font = '50px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText(text, hex.cx, hex.cy-25);

    }

}
