let img;
let circleSize = 8; // Tamaño reducido para aumentar la cantidad de círculos
let spacing = circleSize * 1.1; // Espaciado más pequeño

function preload() {
  // Cargar la imagen antes de configurar el lienzo
  img = loadImage("Malu.png");
}

function setup() {
  createCanvas(600, 600);
  noLoop(); // Dibujar solo una vez
  
  // Redimensionar la imagen para que se ajuste al lienzo
  img.resize(width, height);
}

function draw() {
  background(255);

  img.loadPixels();
  
  // Crear círculos basados en los colores de la imagen
  for (let y = 0; y < img.height; y += spacing) {
    for (let x = 0; x < img.width; x += spacing) {
      let index = (floor(x) + floor(y) * img.width) * 4;
      
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      
      // Calcular la distancia entre el mouse y el círculo
      let d = dist(mouseX, mouseY, x, y);
      let maxDist = 100; // Máxima distancia de influencia
      
      // Cambiar el tamaño del círculo según la distancia al mouse
      let newSize = map(d, 0, maxDist, circleSize * 2, circleSize);
      newSize = constrain(newSize, circleSize, circleSize * 2);
      
      fill(r, g, b);
      noStroke();
      ellipse(x, y, newSize, newSize);
    }
  }
}

// Hacer que se redibuje cada vez que el mouse se mueve para actualizar el tamaño de los círculos
function mouseMoved() {
  redraw();
}
