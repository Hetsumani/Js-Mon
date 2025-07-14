import React, { useState } from 'react';
import OverworldComponent from './OverworldComponent.jsx';
import CombatComponent from './CombatComponent.jsx';

const Game = () => {
    // 🧠 La máquina de estados del juego
    const [gameState, setGameState] = useState('OVERWORLD');

    // Funciones para cambiar de estado
    const handleEnterCombat = () => {
        console.log("Cambiando a modo combate...");
        setGameState('COMBAT');
    };

    const handleExitCombat = () => {
        console.log("Volviendo al mapa...");
        setGameState('OVERWORLD');
    };

    return (
        <div>
            {gameState === 'OVERWORLD' && <OverworldComponent onEnterCombat={handleEnterCombat} />}
            {gameState === 'COMBAT' && <CombatComponent onExitCombat={handleExitCombat} />}
        </div>
    );
};

export default Game;