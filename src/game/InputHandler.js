export class InputHandler {
    constructor() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            Control: false,
            w: false,
            a: false,
            s: false,
            d: false,
        }

        window.addEventListener('keydown', (event) => {            
            if (Object.prototype.hasOwnProperty.call(this.keys, event.key)) {                
                this.keys[event.key] = true;                            
            }
        });
        window.addEventListener('keyup', (event) => {
            if (Object.prototype.hasOwnProperty.call(this.keys, event.key)) {
                this.keys[event.key] = false;
            }
        });

        // Método para verificar si el jugador está en movimiento
        // Regresa un booleano
        this.isMoving = () => {
            return this.keys.ArrowUp || this.keys.ArrowDown || 
                   this.keys.ArrowLeft || this.keys.ArrowRight ||
                   this.keys.w || this.keys.a || this.keys.s || this.keys.d;
        };
    }
}