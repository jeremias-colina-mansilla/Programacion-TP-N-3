function CalculadoraIMC() {
    const [altura, setAltura] = React.useState('');
    const [peso, setPeso] = React.useState('');
    const [resultado, setResultado] = React.useState(null);
    const [claseMensaje, setMensaje] = React.useState('');

    const calcularIMC = (e) => {
        e.preventDefault();

        const alturaMetros = altura / 100;
        const imc = peso / (alturaMetros * alturaMetros);

        const imcRedondeado = parseFloat(imc.toFixed(1));// Redondear a 1 decimal para evitar errores

        setResultado(imc.toFixed(1));

        
        if (imcRedondeado < 18.5) {
            setMensaje('bajo');
        } else if (imcRedondeado >= 18.5 && imcRedondeado < 25) { // Cambiado a < 25
            setMensaje('normal');
        } else if (imcRedondeado >= 25 && imcRedondeado < 30) { // Cambiado a < 30
            setMensaje('sobrepeso');
        } else {
            setMensaje('obesidad');
        }
    };

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        setAltura('');
        setPeso('');
        setResultado(null);
        setMensaje('');
    };

    return (
        <div>
            <h2>Calculadora de IMC</h2>
            <form onSubmit={calcularIMC}>
                <div>
                    <label>
                        Altura (cm):
                        <input
                            type="number"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            min="100"
                            max="250"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Peso (kg):
                        <input
                            type="number"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            min="30"
                            max="300"
                            required
                        />
                    </label>
                </div>
                <button type="submit">Calcular</button>
                <button type="button" onClick={limpiarFormulario}>Limpiar</button>
            </form>

            {resultado && (
                <div className={`mensaje ${claseMensaje}`}>
                    <p>Tu IMC es: {resultado}</p>
                    <p>
                        {claseMensaje === 'bajo' && 'Nivel bajo'}
                        {claseMensaje === 'normal' && 'Nivel normal'}
                        {claseMensaje === 'sobrepeso' && 'Nivel de sobrepeso'}
                        {claseMensaje === 'obesidad' && 'Nivel de obesidad'}
                    </p>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CalculadoraIMC />);