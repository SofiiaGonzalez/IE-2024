let luceros = [];
let circles = [];

function setup() {
  createCanvas(500, 500);
  noStroke();
  
  // Crear múltiples objetos de tipo lucero y círculo
  for (let i = 0; i < 10; i++) {  // Aumenta el número de luceros a 10
    luceros.push(new Lucero(random(width), random(height)));
  }
  
  // Crear círculos en movimiento
  for (let i = 0; i < 3; i++) {
    circles.push(new MovingCircle(random(width), random(height)));
  }
}

function draw() {
  background(0, 20); // Fondo con poca opacidad para crear estelas
  
  // Mostrar y actualizar luceros
  for (let lucero of luceros) {
    lucero.update();
    lucero.display();
  }

  // Mostrar y actualizar círculos
  for (let circle of circles) {
    circle.update();
    circle.display();
  }
}

// Clase para los luceros (estrellas blancas de 6 puntas)
class Lucero {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(TWO_PI); // Ángulo inicial
    this.radius = 20;
    this.orbitRadius = 50;
    this.trail = []; // Array para almacenar la estela
  }
  
  update() {
    this.angle += 0.05; // Velocidad de rotación
    this.x += cos(this.angle) * 2;
    this.y += sin(this.angle) * 2;
    
    // Agregar posición actual a la estela
    this.trail.push({ x: this.x, y: this.y });
    
    // Limitar la longitud de la estela
    if (this.trail.length > 10) {
      this.trail.shift();
    }
  }
  
  display() {
    fill(255, 255, 255, 150);
    
    // Dibujar estela
    for (let i = 0; i < this.trail.length; i++) {
      let pos = this.trail[i];
      let alpha = map(i, 0, this.trail.length, 0, 255);
      fill(255, 255, 255, alpha);
      this.drawStar(pos.x, pos.y, this.radius * 0.3, this.radius * 0.6, 6);
    }
    
    // Dibujar el lucero actual
    fill(255, 255, 255);
    this.drawStar(this.x, this.y, this.radius * 0.5, this.radius, 6);
  }
  
  // Método para dibujar una estrella de n puntas
  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}

// Clase para los círculos (rosados y en movimiento)
class MovingCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.xSpeed = random(2, 5);
    this.ySpeed = random(2, 5);
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    // Rebotar en los bordes
    if (this.x > width - this.size / 2 || this.x < this.size / 2) {
      this.xSpeed *= -1;
    }
    if (this.y > height - this.size / 2 || this.y < this.size / 2) {
      this.ySpeed *= -1;
    }
  }
  
  display() {
    fill(255, 182, 193); // Color rosado
    ellipse(this.x, this.y, this.size);
  }
}
