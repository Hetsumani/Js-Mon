import { IdleState } from './IdleState.js';

export class MoveState {
    constructor() {
        this.name = 'MOVE';
    }
    
    enter() {
        console.log("Entrando en estado MOVE");
    }

    update(player, deltaTime) {
        //Etapa 3: Normalizar deltaTime a segundos y usar la velocidad del jugador
        const moveDistance = player.speed * (deltaTime / 1000);

        if (player.input.keys.ArrowUp) player.y -= moveDistance;
        if (player.input.keys.ArrowDown) player.y += moveDistance;
        if (player.input.keys.ArrowLeft) player.x -= moveDistance;
        if (player.input.keys.ArrowRight) player.x += moveDistance;
    }

    handleInput(input) {
        if (!input.isMoving()) {
            return new IdleState();
        }
        return null;
    }
}