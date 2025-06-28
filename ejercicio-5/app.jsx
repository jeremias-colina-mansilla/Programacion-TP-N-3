const { useState, useEffect } = React;

function Calculadora() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [operacion, setOperacion] = useState("0");
  const [resultado, setResultado] = useState("0");
  const [claseResultado, setClaseResultado] = useState("resultado-defecto");
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);

  useEffect(() => {
    manejarCambioOperacion();
  }, [numero1, numero2, operacion]);

  const manejarCambioOperacion = () => {
    const camposVacios = numero1 === "" || numero2 === "";
    const divisionSeleccionada = operacion === "4";
    const noSeleccionada = operacion === "0";

    if (camposVacios || divisionSeleccionada || noSeleccionada) {
      setBotonDeshabilitado(true);
      if (camposVacios) {
        setResultado("Ingrese ambos números");
        setClaseResultado("resultado-error");
      } else if (divisionSeleccionada) {
        setResultado("La operación de división está deshabilitada");
        setClaseResultado("resultado-error");
      } else if (noSeleccionada) {
        setResultado("Seleccione una operación");
        setClaseResultado("resultado-error");
      }
    } else {
      setBotonDeshabilitado(false);
      setResultado("0");
      setClaseResultado("resultado-defecto");
    }
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    const n1 = parseFloat(numero1);
    const n2 = parseFloat(numero2);

    let res = 0;
    let clase = "resultado-defecto";

    switch (operacion) {
      case "1":
        res = n1 + n2;
        clase = "resultado-suma";
        break;
      case "2":
        res = n1 - n2;
        clase = "resultado-resta";
        break;
      case "3":
        res = n1 * n2;
        clase = "resultado-multiplicacion";
        break;
      // La división no debería llegar acá por deshabilitación
      default:
        res = "Operación no válida";
        clase = "resultado-error";
        break;
    }

    setResultado(`El resultado es: ${res}`);
    setClaseResultado(clase);
  };

  return (
    <form id="formulario" onSubmit={manejarSubmit}>
      <h2>Calculadora matemática</h2>

      <label>Número 1:</label>
      <input
        id="numero1"
        type="number"
        value={numero1}
        onChange={(e) => setNumero1(e.target.value)}
      />

      <label>Número 2:</label>
      <input
        id="numero2"
        type="number"
        value={numero2}
        onChange={(e) => setNumero2(e.target.value)}
      />

      <label>Operación:</label>
      <select
        id="selectorOperacion"
        value={operacion}
        onChange={(e) => setOperacion(e.target.value)}
      >
        <option value="0">Seleccione</option>
        <option value="1">Suma (+)</option>
        <option value="2">Resta (-)</option>
        <option value="3">Multiplicación (×)</option>
        <option value="4">División (÷)</option>
      </select>

      {operacion === "4" && (
        <p style={{ color: "orange", marginTop: "5px" }}>
           División deshabilitada.
        </p>
      )}

      <button id="botonCalcular" disabled={botonDeshabilitado}>
        Calcular
      </button>

      <div id="divResultado" className={claseResultado}>
        {resultado}
      </div>
    </form>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calculadora />);
