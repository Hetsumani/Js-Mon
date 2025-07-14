import { IdleState } from './states/IdleState.js';

export class Player {
    constructor(image, input) {
        this.x = 100;
        this.y = 100;
        this.image = image; // Guardamos la imagen del jugador
        this.width = 30; // Ancho del sprite
        this.height = 35; // Alto del sprite
        this.input = input; // Guardamos la referencia al objeto de entrada
        this.columna = 0; // Columna del sprite
        this.fila = 0; // Fila del sprite
        this.spriteWidth = 30; // Ancho del sprite
        this.spriteHeight = 35; // Alto del sprite
        // El jugador empieza en el estado IDLE
        this.currentState = new IdleState();
        this.currentState.enter();
    }

    // Método para cambiar de estado de forma segura
    setState(newState) {
        this.currentState = newState;
        this.currentState.enter();
    }

    update(input) {
        // 1. Delega el manejo de input al estado actual
        const newState = this.currentState.handleInput(input);
        
        // 2. Si el estado retornó un nuevo estado, lo cambiamos
        if (newState) {
            this.setState(newState);
        }
        
        if (this.currentState.update) {
            // 3. Si el estado actual tiene un método update, lo llamamos
            this.currentState.update(this);
        }
    }

    // Método para que el jugador se dibuje a sí mismo
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