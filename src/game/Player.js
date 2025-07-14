import { IdleState } from "./states/IdleState.js";

export class Player {
  constructor(image, input) {
    this.x = 100;
    this.y = 100;
    this.image = image;
    this.input = input;
    this.width = 30;
    this.height = 35;
    this.spriteWidth = 30;
    this.spriteHeight = 35;
    this.columna = 0;
    this.fila = 0;
    this.currentState = new IdleState();

    this.speed = 200;

    this.maxFrame = 3;
    this.frameTimer = 0;
    this.frameInterval = 100;

    this.currentState.enter(this);

    // Etapa 6: Propiedad para rastrear el estado de la colisión
    this.isInsideZone = false;
  }

  setState(newState) {
    this.currentState = newState;
    this.currentState.enter(this);
  }

  update(deltaTime, collisionZone) {
    const newState = this.currentState.handleInput(this.input);
    if (newState) {
      this.setState(newState);
    }

    if (this.currentState.update) {
      this.currentState.update(this, deltaTime);
    }
    // Etapa 6: Collision Detection Logic
    const wasInside = this.isInsideZone; // Guarda el estado anterior
    this.isInsideZone = this.checkCollision(collisionZone); // Calcula el estado actual

    // Compara el estado anterior con el actual para detectar cambios
    if (this.isInsideZone && !wasInside) {
      console.log("¡El jugador HA ENTRADO en la zona!");
    } else if (!this.isInsideZone && wasInside) {
      console.log("¡El jugador HA SALIDO de la zona!");
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.columna * this.spriteWidth,
      this.fila * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  // Etapa 6: Método de colisión AABB
  // Devuelve 'true' si el jugador (this) colisiona con el otro objeto (other).
  checkCollision(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
