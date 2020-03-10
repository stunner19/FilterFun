// make yellow square 200 * 200;
var image = new SimpleImage(200,200);

for(var pixel of image.values()) {
    pixel.setRed(255);
    pixel.setGreen(255);
    pixel.setBlue(0);
}

print(image); 

// add red, green and blue stripes to an image.
image = new SimpleImage("hilton.jpg");

var w = image.getWidth();

for(var pixel of image.values()) {
    var x = pixel.getX();
    if(x < w / 3) {
        pixel.setRed(255);
    }
    else if(x < 2 * w / 3) {
        pixel.setGreen(255);
    }
    else{
        pixel.setBlue(255);
    }
}

print(image);

// functio to swap red and green pixels in an image.
function swapPixel(pixel) {
    var newGreen = pixel.getRed();
    var newRed = pixel.getGreen();
    pixel.setGreen(newGreen);
    pixel.setRed(newRed);
    return pixel;
}

for(var pixel of image.values()) {
    pixel = swapPixel(pixel);
}

print(image); 

// function to change the background color in devil's image from blue to yellow.
image = new SimpleImage("duke_blue_devil.png");

for(var pixel of image.values()) {
    if(pixel.getRed() < 220 && pixel.getGreen() < 220 && pixel.getBlue() >= 220) {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(0);
    }
}

print(image);

// function to modidy devil's image where x-coordinate > y-coordinate.
image = new SimpleImage("duke_blue_devil.png");
for(var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if(x > y) {
        pixel.setRed(0);
        pixel.setBlue(0);
    }
}

print(image);
// function to add border of given thickness to panda's image.
image = new SimpleImage("smallpanda.png");

var w = image.getWidth();
var h = image.getHeight();

function setBlack(pixel) {
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
}

function onBorder(pixel,thickness) {
    var x = pixel.getX();
    var y = pixel.getY();
    if(x < thickness || x >= w - thickness) return true;
    if(y < thickness || y >= h - thickness) return true;
    return false;
}

function addBorder(image,thickness) {
    for(var pixel of image.values()) {
        if(onBorder(pixel,thickness)){
            setBlack(pixel);
        }
    }
    return image;
}

print(addBorder(image,10));

// green screen problem.
var fgimage = new SimpleImage("drewRobert.png");
var bgimage = new SimpleImage("dinos.png");

var output = new SimpleImage(fgimage.getWidth(),fgimage.getHeight());

for(var pixel of fgimage.values()) {
    if(pixel.getGreen() / 2 > pixel.getRed() + pixel.getBlue()) {
        var x = pixel.getX();
        var y = pixel.getY();
        output.setPixel(x,y,bgimage.getPixel(x,y));        
    }
    else{
        output.setPixel(pixel.getX(),pixel.getY(),pixel);        
    }
}

print(output);

// function to create a square using 4 different colors.
img = new SimpleImage(200,200);
for (var px of img.values()){
  var x = px.getX();
  var y = px.getY();
  if (x < img.getWidth()/2){
    px.setRed(255);
  }
  if (y>img.getHeight()/2){
    px.setBlue(255);
  }
  else if(x >= img.getWidth() / 2 && y <= img.getHeight() / 2){
    px.setGreen(255);
  }
}
print (img);