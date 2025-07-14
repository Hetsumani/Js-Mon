import React, { useState } from 'react';

const CombatComponent = ({ onExitCombat }) => {
    // 1. Definimos el estado inicial del combate
    const [playerHealth, setPlayerHealth] = useState(100);
    const [enemyHealth, setEnemyHealth] = useState(120);
    const [combatMessage, setCombatMessage] = useState("¡Un Limo salvaje apareció!");

    // 2. Lógica simple para el turno del jugador
    const handleAttack = () => {
        const damage = Math.floor(Math.random() * 10) + 15; // Daño entre 15 y 25
        const newEnemyHealth = enemyHealth - damage;
        
        setEnemyHealth(newEnemyHealth);
        setCombatMessage(`¡Atacaste e hiciste ${damage} de daño!`);

        // Comprobar si el enemigo fue derrotado
        if (newEnemyHealth <= 0) {
            setCombatMessage("¡Has ganado la batalla!");
            // Más adelante, aquí podrías deshabilitar los botones y mostrar un botón de "Continuar"
        }
    };

    return (
        <div style={{ width: '640px', height: '480px', backgroundColor: '#F8F8F8', border: '4px solid black', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            
            {/* --- Pantalla de Batalla --- */}
            <div style={{ flex: 1, position: 'relative', padding: '20px' }}>
                {/* Placeholder para el enemigo */}
                <div style={{ textAlign: 'right' }}>
                    <span>LIMO</span>
                    <div style={{ border: '1px solid black', width: '200px', marginLeft: 'auto' }}>
                        <div style={{ height: '10px', backgroundColor: 'green', width: `${(enemyHealth / 120) * 100}%` }}></div>
                    </div>
                    <span>HP: {Math.max(0, enemyHealth)} / 120</span>
                </div>

                {/* Placeholder para el jugador */}
                <div style={{ textAlign: 'left', position: 'absolute', bottom: '120px', left: '20px' }}>
                    <span>JUGADOR</span>
                     <div style={{ border: '1px solid black', width: '200px' }}>
                        <div style={{ height: '10px', backgroundColor: 'green', width: `${(playerHealth / 100) * 100}%` }}></div>
                    </div>
                    <span>HP: {playerHealth} / 100</span>
                </div>
            </div>

            {/* --- Caja de Mensajes y Acciones --- */}
            <div style={{ height: '100px', borderTop: '4px solid black', display: 'flex' }}>
                <div style={{ flex: 2, padding: '10px', borderRight: '4px solid black' }}>
                    {combatMessage}
                </div>
                <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <button onClick={handleAttack} disabled={enemyHealth <= 0}>Luchar</button>
                    <button onClick={onExitCombat} disabled={enemyHealth > 0}>Huir</button>
                </div>
            </div>
        </div>
    );
};

export default CombatComponent;