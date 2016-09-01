/*
 *    test.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 */



var render = (function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('apparea'),

    // will stroe a hex class instance
    theHex,

    // what to do on a touch event
    touch = function (e) {

        e.preventDefault();

    },

    // what to do when the size of the window changes
    size = function () {

        var w = window.innerWidth,
        h = window.innerHeight;

        if (w > 800) {

            w = 800;
            h = 600;

        }

        container.style.width = w + 'px';
        container.style.height = h + 'px';
        canvas.width = w;
        canvas.height = h;

        theHex = new Hex(canvas.width / 2, canvas.height / 2, 100);

    },

    // draw to the canvas
    draw = function () {

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#00ff00';
        ctx.fillStyle = '#00ff00';
        hexCanvas.drawHex(ctx, theHex);
        hexCanvas.atHexCenter(ctx, theHex, 'hex.js');

    };

    // append canvas to the container element
    container.appendChild(canvas);

    // size up the window, and draw
    size();
    draw();

    // events
    canvas.addEventListener('touchstart', touch);
    window.addEventListener('resize', function () {

        size();
        draw();

    });

}
    ());
