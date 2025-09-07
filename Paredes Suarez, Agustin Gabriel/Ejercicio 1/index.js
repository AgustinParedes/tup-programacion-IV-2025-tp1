import express from "express";

const app = express();
const port = 3000;

let nextId = 1;
const calculos = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ejercicio 1");
});

// POST
app.post("/calcular", (req, res) => {
  const { base, altura } = req.body;

  // Validaciones
  if (typeof base === "undefined" || typeof altura === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Corregir datos de base y altura, por favor.",
    });
  }

  const ac = parseFloat(base);
  const al = parseFloat(altura);

  if (isNaN(ac) || isNaN(al) || ac <= 0 || al <= 0) {
    return res.status(400).json({
      success: false,
      message: "Base y altura deben estar completos y ser mayores a 0.",
    });
  }

  // Calcular perímetro y superficie
  const perimetro = 2 * (ac + al);
  const superficie = ac * al;

  // Crear el objeto
  const nuevoCalculo = {
    id: nextId++,
    base: ac,
    altura: al,
    perimetro,
    superficie,
  };

  // Guardar en el arreglo
  calculos.push(nuevoCalculo);

  res.status(201).json({ success: true, data: nuevoCalculo });
});

// GET
app.get("/calculos", (req, res) => {
  const resultados = calculos.map((calc) => {
    const tipo = calc.base === calc.altura ? "cuadrado" : "rectángulo";
    return { ...calc, tipo };
  });

  res.json({ success: true, data: resultados });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost: ${port}`);
});
