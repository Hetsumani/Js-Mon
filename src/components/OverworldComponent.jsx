import React, { useRef, useEffect } from "react";
import { Player } from "../game/Player.js";
import { InputHandler } from "../game/InputHandler.js";
// Etapa 5: Importamos el TileSet
import { TileMap } from "../game/TileMap.js";
import mapData from "../assets/mapa/mapa.json"; // Importa los datos del mapa
import tilesetImageSrc from "../assets/tiles/basictiles.png";
import jugadorSprite from "../assets/sprites/RED_v03.png";

const OverworldComponent = ({ onEnterCombat }) => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    let collisionZone = null;

    Promise.all([loadImage(tilesetImageSrc), loadImage(jugadorSprite)]).then(
      ([tilesetImage, playerImage]) => {
        const input = new InputHandler();
        const map = new TileMap(mapData, tilesetImage);
        // Etapa 8: Le pasamos la función 'onEnterCombat' al jugador
        const player = new Player(playerImage, input, onEnterCombat);
        collisionZone = map.getObject("Pasto-Detectar");

        gameRef.current = { map, player, input };
        requestAnimationFrame(gameLoop);
      }
    );

    const gameLoop = (timestamp) => {
      if (!gameRef.current) return;

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const { map, player } = gameRef.current;

      player.update(deltaTime, collisionZone);

      context.clearRect(0, 0, canvas.width, canvas.height);
      map.draw(context);
      player.draw(context); 

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

export default OverworldComponent;
