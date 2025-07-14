import React from 'react';

// Recibe la función para salir del combate
const CombatComponent = ({ onExitCombat }) => {
    return (
        <div style={{ width: '640px', height: '480px', backgroundColor: 'black', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>⚔️ MODO COMBATE ⚔️</h1>
            <button onClick={onExitCombat} style={{marginTop: '20px', padding: '10px'}}>
                Terminar Combate
            </button>
        </div>
    );
};

export default CombatComponent;