let d; // Variable para controlar la rotación en función del mouse
let div = 20; // Número de divisiones o simetrías
let sym = 360 / div; // Ángulo que separa cada brazo

// Definir los colores para el gradiente
let startColor, endColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // Trabajaremos con grados
  pixelDensity(5); // Mejora la calidad visual
  noFill(); // Los círculos no tendrán relleno
  
  // Colores para el gradiente (rosados)
  startColor = color(255, 182, 193); // Rosa claro
  endColor = color(255, 105, 180); // Rosa más intenso
}

function draw() {
  background(0, 10); // Fondo negro con transparencia para crear estela

  d = map(mouseX, 0, width, 0, 90); // Rotación según el mouse
  for (let i = 0; i < 360; i += sym) { // Dibujar en divisiones de 360 grados
    push();
    translate(width / 2, height / 2); // Mover el origen al centro
    rotate(i); // Rotar para crear la simetría
    branchCircles(200, 4); // Llamar a la función recursiva con el radio inicial
    pop();
  }
}

function branchCircles(radius, level) {
  if (level <= 0) {
    return;
  }
  
  // Calcular el gradiente de colores según el nivel
  let t = map(level, 3, 0, 0, 1); // Progresión del color según el nivel
  let currentColor = lerpColor(startColor, endColor, t); // Interpolación entre colores
  stroke(currentColor); // Aplicar el color a las líneas
  
  ellipse(0, 0, radius * 2); // Dibujar el círculo
  
  // Reducir el tamaño de los círculos en cada nivel
  let newRadius = radius * 0.3;
  
  // Llamar recursivamente para los círculos internos
  push();
  rotate(d); // Rotar a la derecha
  translate(0, -radius); // Mover hacia arriba
  branchCircles(newRadius, level - 1); // Dibujar el siguiente círculo más pequeño
  pop();

  push();
  rotate(-d); // Rotar en dirección opuesta
  translate(0, -radius); // Mover hacia arriba
  branchCircles(newRadius, level - 1); // Dibujar el siguiente círculo más pequeño
  pop();
}
