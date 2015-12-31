
(function (document, FileReader, Image) {
    "use strict";
    var gen = {}, // A container for DOM elements
        reader = new FileReader(),
        image = new Image(),
        ctxt = null, // For canvas' 2d context
        renderMeme = null, // For a function to render memes
        get = function (id) {
            // Short for document.getElementById()
            return document.getElementById(id);
        };
    // Get elements (by id):
    gen.box1 = get("box1");
    gen.ifile = get("ifile");
    gen.box2 = get("box2");
    gen.topline = get("topline");
    gen.bottomline = get("bottomline");
    gen.c = get("c"); // canvas;
    gen.downloadLink = get("downloadLink");
    // Get canvas context:
    ctxt = gen.c.getContext("2d");
    // Function for rendering memes:
    renderMeme = function () {
        var writeText = function (text, x, y) {
            var f = 36; // Font size (in pt)
            for (; f >= 0; f -=1) {
                ctxt.font = "bold " + f + "pt Impact, Charcoal, sans-serif";
                if (ctxt.measureText(text).width < gen.c.width - 10) {
                    ctxt.fillText(text, x, y); //this is like writing with pencil---temporary
                    ctxt.strokeText(text, x, y); //this is like writing with pen --permanent -after pencil pen writing is required :p
                    break;
                }
            }
        };
        gen.c.width = image.width;
        gen.c.height = image.height;
        ctxt.drawImage(image, 0, 0, gen.c.width, gen.c.height);
        ctxt.textAlign = "center";
        ctxt.fillStyle = "white";
        ctxt.strokeStyle = "black";
        ctxt.lineWidth = 2;
        writeText(gen.topline.value, gen.c.width / 2, 50);
        writeText(gen.bottomline.value, gen.c.width / 2, gen.c.height - 20);
        gen.downloadLink.href = gen.c.toDataURL();
    };
    // Event handlers:
    gen.ifile.onchange = function () {
        reader.readAsDataURL(gen.ifile.files[0]); 
        reader.onload = function () {
            image.src = reader.result;
            image.onload = function () {
                renderMeme();
                gen.box1.style.display = "none";
                gen.box2.style.display = "";
            };
        };
    };
    gen.topline.onkeyup = renderMeme;
    gen.bottomline.onkeyup = renderMeme;
}(this.document, this.FileReader, this.Image));
