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
  }

  setState(newState) {
    this.currentState = newState;
    // etapa 4: Pasamos la instancia del jugador ('this') al entrar al nuevo estado.
    this.currentState.enter(this);
  }

  // Etapa 4: Cambiamos el método update para que
  // ya no se encargue de la animación y lo hagan los estados.
  update(deltaTime) {
    // 1. Revisa si hay que cambiar de estado
    const newState = this.currentState.handleInput(this.input);
    if (newState) {
        this.setState(newState);
    }

    // 2. ¡Simplificado! Solo delega el update al estado actual.
    // La animación y el movimiento ahora son responsabilidad de cada estado.
    if (this.currentState.update) {
        this.currentState.update(this, deltaTime);
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