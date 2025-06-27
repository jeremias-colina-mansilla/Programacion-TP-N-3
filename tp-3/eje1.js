const contenedor = document.getElementById("contenedor-mayor");
        const formulario = document.getElementById("formulario");
        const n1 = document.getElementById("n1");
        const n2 = document.getElementById("n2");
        const selector = document.getElementById("operaciones");
        const boton = document.getElementById("btn");
        const resultadosDiv = document.getElementById("resultados");

        function verificarDivision() {

            if (selector.value === "division") {
                boton.disabled = true;
                boton.value = "División deshabilitada";
                mostrarMensaje("La operación de división está deshabilitada según los requisitos", "warning");
            } else {
                boton.disabled = false;
                boton.value = "Calcular";
                limpiarResultados();
            }
        }

        selector.addEventListener("change", verificarDivision);

        n1.addEventListener("input", function() {
            if (selector.value !== "division") {
                limpiarResultados();
            }
        });

        n2.addEventListener("input", function() {
            if (selector.value !== "division") {
                limpiarResultados();
            }
        });

        formulario.addEventListener("submit", function(e) {
            e.preventDefault();

            const numero1 = parseFloat(n1.value);
            const numero2 = parseFloat(n2.value);
            const operacion = selector.value;

            if (!operacion) {
                mostrarMensaje(" Por favor, seleccione una operación", "error");
                return;
            }

            if (isNaN(numero1) || isNaN(numero2)) {
                mostrarMensaje(" Por favor, ingrese números válidos", "error");
                return;
            }

            if (n1.value.trim() === "" || n2.value.trim() === "") {
                mostrarMensaje(" Por favor, complete todos los campos", "error");
                return;
            }

            if (operacion === "division") {
                mostrarMensaje(" La división está deshabilitada", "error");
                return;
            }

            let resultado;
            let simbolo;

            if (operacion === "suma") {
                resultado = numero1 + numero2;
                simbolo = "+";
            } else if (operacion === "resta") {
                resultado = numero1 - numero2;
                simbolo = "-";
            } else if (operacion === "multiplicacion") {
                resultado = numero1 * numero2;
                simbolo = "×";
            } else {
                mostrarMensaje(" Operación no válida", "error");
                return;
            }

            const mensajeResultado = `
                <strong>Operación realizada:</strong><br>
                ${numero1} ${simbolo} ${numero2} = <strong>${resultado}</strong><br>
                <em>Resultado de la ${operacion}: ${resultado}</em>
            `;
            
            mostrarMensaje(mensajeResultado, "resultado");
        });

        function mostrarMensaje(mensaje, tipo) {
            limpiarResultados();
            
            const div = document.createElement("div");
            div.className = tipo;
            div.innerHTML = mensaje;
            
            resultadosDiv.appendChild(div);
        }

        function limpiarResultados() {
            resultadosDiv.innerHTML = "";
        }

        verificarDivision();
