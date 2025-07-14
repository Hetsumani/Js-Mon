import { MoveState } from './MoveState.js';

export class IdleState {
    constructor() {
        this.name = 'IDLE';
    }

    enter() {
        console.log("Entrando en estado IDLE");
    }

    handleInput(input) {
        // Si se detecta movimiento, cambia al estado MOVE
        if (input.isMoving()) { // Necesitarás una clase InputHandler que tenga este método
            return new MoveState();
        }
        return null; // Si no hay cambio, devuelve null
    }
}