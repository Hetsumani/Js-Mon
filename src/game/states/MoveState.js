import { IdleState } from './IdleState.js';

export class MoveState {
    constructor() {
        this.name = 'MOVE';
        this.speed = 1; // Velocidad de movimiento del jugador
    }
    
    enter() {
        console.log("Entrando en estado MOVE");
    }

    update(player) {
        // Actualiza la posición del jugador según el input
        if (player.input.keys.ArrowUp) player.y -= this.speed;
        if (player.input.keys.ArrowDown) player.y += this.speed;
        if (player.input.keys.ArrowLeft) player.x -= this.speed;
        if (player.input.keys.ArrowRight) player.x += this.speed;
    }

    handleInput(input) {
        // Si no hay movimiento, cambia al estado IDLE
        if (!input.isMoving()) {
            return new IdleState();
        }
        return null;
    }
}