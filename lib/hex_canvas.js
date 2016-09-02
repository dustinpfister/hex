/*
 *    hex_canvas.js -- a 2d canvas drawing lib for my hex.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 */

var hexCanvas = {

    // draw the given hex class instance with the given context
    drawHex : function (ctx, hex) {

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

        if (hex.selected) {

            ctx.fill();

        }

    },

    // draw the whole given hex grid
    drawGrid : function (ctx, grid) {

        ctx.lineWidth = 3;

        var self = this;

        grid.hex.forEach(function (hex, index) {

            self.drawHex(ctx, hex);

        });

    },

    // draw a box overlay
    drawBoxOverlay : function (ctx, grid) {

        var sx = grid.sx - grid.radius,
        sy = grid.sy - grid.hexH / 2,
        bxW = grid.radius / 2,
        bxH = grid.hexH / 2,
        w = grid.w * 3 + 1,
        h = grid.h * 2 + 1,
        x,
        y;

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0,0,255,0.5)';

        x = 0;
        while (x < w) {

            y = 0;
            while (y < h) {

                ctx.strokeRect(sx + bxW * x, sy + bxH * y, bxW, bxH);

                y += 1;

            }

            x += 1;
        }
    },

    // draw the given text at the center of the given hexagon.
    atHexCenter : function (ctx, hex, text) {

        ctx.font = '50px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText(text, hex.cx, hex.cy - 25);

    }

}
