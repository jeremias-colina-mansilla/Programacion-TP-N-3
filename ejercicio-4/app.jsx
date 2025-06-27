function App() {
    const [izquierdoHabilitado, setIzquierdoHabilitado] = React.useState(true);
    const [derechoHabilitado, setDerechoHabilitado] = React.useState(false);

    const manejarClickIzquierdo = () => {
        setIzquierdoHabilitado(false);
        setDerechoHabilitado(true);
    };

    const manejarClickDerecho = () => {
        setDerechoHabilitado(false);
        setIzquierdoHabilitado(true);
    };

    return (
        <div>
            <button 
                onClick={manejarClickIzquierdo} 
                disabled={!izquierdoHabilitado}
            >
                Izquierdo
            </button>
            <button 
                onClick={manejarClickDerecho} 
                disabled={!derechoHabilitado}
            >
                Derecho
            </button>
        </div>
    );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);