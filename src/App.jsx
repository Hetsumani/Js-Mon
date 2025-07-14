import React, { useState } from 'react';
import CanvasComponent from './components/CanvasComponent';
import ModalComponent from './components/ModalComponent';

function App() {
    // ⚙️ 1. El Estado (useState)
    // Esta es la memoria de nuestro componente. `isModalVisible` es un booleano
    // que controla si el modal debe mostrarse. Inicia en `false`.
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 🤚 2. Las Funciones Manejadoras (Handlers)
    // Funciones simples que cambian el estado.
    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    // 👁️ 3. El Renderizado Condicional
    return (
        <div className="app-container">     
            
            {/* El canvas siempre está visible */}
            <CanvasComponent />
            
            <button onClick={showModal} style={{ marginTop: '20px' }}>
                Mostrar Saludo
            </button>
            
            {/* ✨ LA MAGIA DE REACT ✨ */}
            {/* Esto se lee como: "SI isModalVisible es `true`, ENTONCES renderiza
                el ModalComponent". Cuando `isModalVisible` es `false`, no se
                renderiza nada aquí. Le pasamos la función `hideModal` como prop `onClose`. */}
            {isModalVisible && <ModalComponent onClose={hideModal} />}
        </div>
    );
}

export default App;