let canvas = null;
let image = null;
let redImage = null;
let grayImage = null;
let rainbowImage = null;
let blurImage = null;
let filename = null;

function doupload() {
    canvas = document.getElementById("image");
    filename = document.getElementById("upload");
    image = new SimpleImage(filename);
    grayImage = new SimpleImage(filename);
    redImage = new SimpleImage(filename);
    rainbowImage = new SimpleImage(filename);
    blurImage = new SimpleImage(filename);
    image.drawTo(canvas);
}

function hasImageLoaded(newimage) {
    if(newimage == null || !newimage.complete()) {
        return false;
    }

    return true;
}

function doclear(newcanvas) {
    let context = newcanvas.getContext("2d");
    context.clearRect(0,0,newcanvas.width,newcanvas.height);
}

function reset() {
    if(!hasImageLoaded(image)) {
        alert("No image to Reset!");
    }
    else {
        doclear(canvas);
        image.drawTo(canvas);        
        redImage = new SimpleImage(filename);
        grayImage = new SimpleImage(filename);
        rainbowImage = new SimpleImage(filename);
        blurImage = new SimpleImage(filename);
    }
}

function changePixel(pixel,red,green,blue) {
    pixel.setRed(red);
    pixel.setGreen(green);
    pixel.setBlue(blue);
    return pixel;
}

function GrayFilter() {
    for(let pixel of grayImage.values()) {
        let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel = changePixel(pixel,avg,avg,avg);
    }
}

function applyGrayscaleFilter() {
    if(!hasImageLoaded(grayImage)) {
        alert("Image has not yet loaded!");
    }
    else{
        GrayFilter()
        grayImage.drawTo(canvas);
    }
}

function RedFilter() {
    for(let pixel of redImage.values()) {
        let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if(avg < 128) {
            pixel = changePixel(pixel,2 * avg,0,0);
        }
        else{
            pixel = changePixel(pixel,255,2 * avg - 255,2 * avg - 255);
        }
    }
}

function applyRedFilter() {
    if(!hasImageLoaded(redImage)) {
        alert("Image has not yed loaded!");
    }
    else {
        RedFilter();
        redImage.drawTo(canvas);
    }
}


function RainbowFilter() {
    const w = canvas.height;
    for(let pixel of rainbowImage.values()) {
        let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        const y = pixel.getY();
        if(y < w / 7){
            if(avg < 128) {
                pixel = changePixel(pixel,2 * avg,0,0);
            }
            else{
                pixel = changePixel(pixel,255,2 * avg - 255,2 * avg - 255);
            }
        }
        else if(y < 2 * w / 7) {
            if(avg < 128) {
                pixel = changePixel(pixel,2 * avg,0.8 * avg,0);
            }
            else{
                pixel = changePixel(pixel,255,1.2 * avg - 51,2 * avg - 255);
            }
        }
        else if(y < 3 * w / 7) {
            if(avg < 128) {
                pixel = changePixel(pixel,2 * avg,2 * avg,0);
            }
            else{
                pixel = changePixel(pixel,255,255,2 * avg - 255);
            }
        }
        else if(y < 4 * w / 7) {
            if(avg < 128) {
                pixel = changePixel(pixel,0,2 * avg,0);
            }
            else{
                pixel = changePixel(pixel,2 * avg - 255,255,2 * avg - 255);
            }
        }
        else if(y < 5 * w / 7) {
            if(avg < 128) {
                pixel = changePixel(pixel,0,0,2 * avg);
            }
            else{
                pixel = changePixel(pixel,2 * avg - 255,2 * avg - 255,255);
            }
        }
        else if(y < 6 * w / 7) {
            if(avg < 128) {
                pixel = changePixel(pixel,0.8 * avg,0,2 * avg);
            }
            else{
                pixel = changePixel(pixel,1.2* avg,2 * avg - 255,255);
            }
        }
        else if(y < w) {
            if(avg < 128) {
                pixel = changePixel(pixel,1.6 * avg,0,1.6 * avg);
            }
            else{
                pixel = changePixel(pixel,0.4 * avg + 153,2 * avg - 255,0.4 * avg + 153);
            }
        }
    }
}

function applyRainbowFilter() {
    if(!hasImageLoaded(rainbowImage)) {
        alert("Image has not loaded!");
    }
    else{
        RainbowFilter();
        rainbowImage.drawTo(canvas);
    }
}

function randomValue() {
    let value1 = Math.floor(Math.random() * 10);
    let value2 = -1 * value1;
    let value = Math.random();
    if(value < 0.5) return value1;
    else return value2;
}

function BlurFilter() {
    let output = blurImage;
    for(let pixel of blurImage.values()) {
        const value = Math.random();
        if(value < 0.5) {
            output.setPixel(pixel.getX(),pixel.getY(),pixel);
        }
        else{
            let value1 = randomValue();
            let value2 = randomValue();
            let x = pixel.getX() + value1;
            let y = pixel.getY() + value2;
            if(value1 < 0) {
                x = Math.max(x,0);
            }
            else {
                x = Math.min(x,canvas.width - 1);
            }
            if(value2 < 0) {
                y = Math.max(y,0);
            }
            else{
                y = Math.min(y,canvas.height - 1);
            }
            output.setPixel(pixel.getX(),pixel.getY(),output.getPixel(x,y));
        }
    }
}

function applyBlurFilter() {
    if(!hasImageLoaded(rainbowImage)) {
        alert("Image has not loaded!");
    }
    else{
        BlurFilter();
        blurImage.drawTo(canvas);
    }
}