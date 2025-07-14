import React, { useRef, useEffect } from "react";
import { Player } from "../game/Player.js";
import { InputHandler } from "../game/InputHandler.js";
import jugadorSprite from "../assets/sprites/RED_v03.png";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const jugadorImage = new Image();
    jugadorImage.src = jugadorSprite;

    jugadorImage.onload = () => {
      if (!gameRef.current) {
        const input = new InputHandler();
        gameRef.current = {
          jugador: new Player(jugadorImage, input),
          input: input,
        };
      }
      requestAnimationFrame(gameLoop);
    };

    // Etapa 3: El gameLoop ahora es el único que orquesta todo.
    const gameLoop = (timestamp) => {
      if (!gameRef.current) return; // Salir si el juego no está listo

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // 1. Llama al update del jugador con deltaTime
      gameRef.current.jugador.update(deltaTime);

      // 2. Dibuja el estado actualizado
      context.clearRect(0, 0, canvas.width, canvas.height);
      gameRef.current.jugador.draw(context);
      
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (gameRef.current && gameRef.current.input) {
        gameRef.current.input.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={640} height={480} style={{ backgroundColor: "#222" }} />;
};

export default CanvasComponent;