import React, { useRef, useEffect } from "react";
import { Player } from "../game/Player.js";
import { InputHandler } from "../game/InputHandler.js";
// Etapa 5: Importamos el TileSet
import { TileMap } from "../game/TileMap.js";
import mapData from "../assets/mapa/mapa.json"; // Importa los datos del mapa
import tilesetImageSrc from "../assets/tiles/basictiles.png";
import jugadorSprite from "../assets/sprites/RED_v03.png";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    // Etapa 5: Carga de Assets
    // Helper para cargar una imagen y devolver una promesa
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    // Usa Promise.all para esperar a que todas las imágenes carguen
    Promise.all([loadImage(tilesetImageSrc), loadImage(jugadorSprite)]).then(
      ([tilesetImage, playerImage]) => {
        // Cuando todo ha cargado, inicializa el juego
        const input = new InputHandler();
        gameRef.current = {
          map: new TileMap(mapData, tilesetImage),
          player: new Player(playerImage, input),
          input: input,
        };
        requestAnimationFrame(gameLoop);
      }
    );
    
    const gameLoop = (timestamp) => {
      if (!gameRef.current) return;

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const { map, player } = gameRef.current;

      // 1. Actualiza la lógica del jugador
      player.update(deltaTime);

      // 2. Dibuja todo en orden
      context.clearRect(0, 0, canvas.width, canvas.height);
      map.draw(context); // Primero el mapa
      player.draw(context); // Luego el jugador, encima del mapa

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (gameRef.current && gameRef.current.input) {
        gameRef.current.input.destroy();
      }
    };
  }, []);

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
