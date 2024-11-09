let particles = [];

function setup() {
  createCanvas(600, 600);
  
  // Crear partículas en los bordes de la pantalla
  for (let i = 0; i < 50; i++) {
    let x = random() < 0.5 ? random(width) : random([0, width]);
    let y = random() < 0.5 ? random(height) : random([0, height]);
    particles.push(new Particle(x, y, color(random(200, 255), random(100, 150), random(150, 200), 150)));
  }
}

function draw() {
  background(0, 20); // Fondo semitransparente para crear estelas
  
  // Centro al que las partículas son atraídas
  let center = createVector(width / 2, height / 2);
  
  // Mostrar y actualizar partículas
  for (let particle of particles) {
    particle.updateBehavior(center);
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.size = 8;
    this.maxSpeed = 3;
    this.color = col; // Color de la partícula
    this.trail = []; // Estela
    this.state = "attracting"; // Estados: "attracting" y "repelling"
  }
  
  // Cambiar entre atracción y repulsión al llegar o alejarse del centro
  updateBehavior(center) {
    let distance = this.pos.dist(center);
    
    if (this.state === "attracting" && distance < 50) {
      this.state = "repelling";
    } else if (this.state === "repelling" && distance > width / 2) {
      this.state = "attracting";
    }
    
    if (this.state === "attracting") {
      this.attractToCenter(center);
    } else if (this.state === "repelling") {
      this.repelFromOthers(particles);
    }
  }
  
  // Atraer al centro de la pantalla
  attractToCenter(center) {
    let force = p5.Vector.sub(center, this.pos);
    let distance = force.mag();
    force.normalize();
    
    // La fuerza disminuye a medida que se acerca al centro
    let strength = map(distance, 0, width / 2, 0, 0.5);
    force.mult(strength);
    this.applyForce(force);
  }
  
  // Repulsión entre partículas cercanas
  repelFromOthers(particles) {
    for (let other of particles) {
      if (other != this) {
        let force = p5.Vector.sub(this.pos, other.pos);
        let distance = force.mag();
        
        // Solo repeler si están muy cerca
        if (distance < 40 && distance > 0) {
          force.normalize();
          force.mult(0.3 / distance); // Fuerza de repulsión inversamente proporcional a la distancia
          this.applyForce(force);
        }
      }
    }
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0); // Resetear aceleración después de aplicar movimiento
    
    // Agregar posición actual a la estela
    this.trail.push(this.pos.copy());
    
    // Limitar la longitud de la estela
    if (this.trail.length > 10) {
      this.trail.shift();
    }
  }
  
  display() {
    // Dibujar estela
    noFill();
    strokeWeight(2);
    for (let i = 0; i < this.trail.length; i++) {
      let alpha = map(i, 0, this.trail.length, 0, 150); // Gradiente de transparencia
      stroke(red(this.color), green(this.color), blue(this.color), alpha);
      point(this.trail[i].x, this.trail[i].y);
    }
    
    // Dibujar la partícula actual
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
