let numCircles = 20;
let minSize = 10;
let maxSize = 80;
let growthSpeed = 1;
let circleSizes = [];
let growing = [];
let spacing = 30; // Espaciado entre círculos

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Inicializar tamaños de los círculos y dirección de crecimiento
  for (let i = 0; i < numCircles; i++) {
    circleSizes[i] = random(minSize, maxSize);
    growing[i] = true; // Los círculos comienzan creciendo
  }
}

function draw() {
  background(255, 251, 243);
  
  for (let i = 0; i < numCircles; i++) {
    let x = map(i, 0, numCircles - 1, 100, width - 100); // Posición x

    // Aplicar espaciado
    x += i * spacing;

    // Actualizar el tamaño de los círculos
    if (growing[i]) {
      circleSizes[i] += growthSpeed;
      if (circleSizes[i] > maxSize) {
        growing[i] = false; // Si alcanza el tamaño máximo, comienza a decrecer
      }
    } else {
      circleSizes[i] -= growthSpeed;
      if (circleSizes[i] < minSize) {
        growing[i] = true; // Si alcanza el tamaño mínimo, comienza a crecer
      }
    }

    // Degradado de blanco a azul
    let colorR = map(circleSizes[i], minSize, maxSize, 255, 120); // Degradado de blanco a un azul más oscuro
    let colorG = map(circleSizes[i], minSize, maxSize, 255, 150); 
    let colorB = map(circleSizes[i], minSize, maxSize, 255, 255); // Más azul a medida que el tamaño crece
    
    fill(colorR, colorG, colorB);
    ellipse(x, height / 2, circleSizes[i], circleSizes[i]);
  }
}