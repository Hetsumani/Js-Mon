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

    // Etapa 3: La velocidad ahora se define en píxeles por segundo
    this.speed = 200; 

    this.maxFrame = 3;
    this.frameTimer = 0;
    this.frameInterval = 100;
    
    this.currentState.enter();
  }

  setState(newState) {
    this.currentState = newState;
    this.currentState.enter();
  }

  update(deltaTime) {
    // 1. Revisa si hay que cambiar de estado
    const newState = this.currentState.handleInput(this.input);
    if (newState) {
      this.setState(newState);
    }

    // 2. Pasa el deltaTime al update del estado actual (MOVE o IDLE)
    if (this.currentState.update) {
      this.currentState.update(this, deltaTime);
    }

    // 3. Actualiza la animación del sprite
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.columna < this.maxFrame) {
        this.columna++;
      } else {
        this.columna = 0;
      }
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
}