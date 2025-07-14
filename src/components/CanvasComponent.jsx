import React, { useRef, useEffect } from "react";

// Etapa 2: import Player y InputHandler
import { Player } from "../game/Player.js";
import { InputHandler } from "../game/InputHandler.js";
import jugadorSprite from "../assets/sprites/RED_v02.png";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  //Etapa 2: Guardamos las instancias del juego en un ref
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId; // Guardaremos el ID de la animación aquí

    const jugadorImage = new Image();
    jugadorImage.src = jugadorSprite;

    jugadorImage.onload = () => {
      // Etapa 2: Inicializa el juego solo una vez
      if (!gameRef.current) {
        const input = new InputHandler(); // Primero crea el input
        gameRef.current = {
          jugador: new Player(jugadorImage, input), // Crea una instancia del jugador
          input: input, // Se encarga de los event listeners
        };
      }
      // Etapa 2: Inicia el bucle de juego
      render();
    };

    const update = () => {
      // Etapa 2: ¡Así de simple queda el update!
      if (!gameRef.current) return;
      const { jugador, input } = gameRef.current;
      jugador.update(input);
    };

    // ⚙️ 2. Este es nuestro bucle de juego (gameLoop)
    const render = () => {
      // --- Lógica de Actualización ---
      update();

      // --- Lógica de Dibujado ---
      if (gameRef.current) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Llamamos al método draw del jugador
        gameRef.current.jugador.draw(context);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      // Solo intenta destruir si el input existe
      if (gameRef.current && gameRef.current.input) {
        gameRef.current.input.destroy();
      }
    };
  }, []); // El array vacío `[]` asegura que esto se configure solo una vez

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={480}
      style={{ backgroundColor: "#222" }}
    />
  );
};

export default CanvasComponent;
