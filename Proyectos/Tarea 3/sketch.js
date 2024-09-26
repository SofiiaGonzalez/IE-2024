function setup() {
  createCanvas(windowWidth, windowHeight); // Lienzo a pantalla completa
  angleMode(DEGREES); // Usa grados en lugar de radianes
  pixelDensity(2); // Aumenta la densidad de píxeles
}

function draw() {
  background(0); // Fondo negro

  push(); // Guarda el estado actual de las transformaciones
  translate(width / 2, height / 2); // Mueve el origen al centro de la pantalla

  let radio = 200; // Radio del círculo base

  stroke(255, 105, 180); // Color rosado (HotPink)
  strokeWeight(0.7); // Grosor de las líneas
  
  // Recorre los 360 grados del círculo
  for (let i = 0; i < 360; i += 2) { // Aumentamos el paso para hacer más denso el patrón
    
    let x = cos(i) * radio; // Coordenada x en el círculo
    let y = sin(i) * radio; // Coordenada y en el círculo

    // Desplazamiento animado de las líneas para generar el patrón continuo
    let a = cos(i + frameCount * 2) * radio; // Movimiento dinámico en 'a' con el desplazamiento de onda y el frameCount para patrones
    let b = sin(i + frameCount * 3) * radio; // Movimiento dinámico en 'b' similar, pero con diferente multiplicador para variedad

    // Dibuja la línea desde (x, y) a (a, b) generando el patrón continuo
    line(x, y, a, b);
  }

  pop(); // Restaura el estado previo de las transformaciones
}
