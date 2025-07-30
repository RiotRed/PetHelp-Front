import { useEffect, useState } from "react";
import { getPerros, getPerrosPorRaza } from "../services/PerroService";
import { Pie, Bar } from "react-chartjs-2";
import dayjs from "dayjs";

function categorizarEdad(fechaNacimiento) {
  const edad = dayjs().diff(dayjs(fechaNacimiento), "year");
  if (edad < 2) return "Cachorro";
  if (edad < 7) return "Adulto";
  return "Senior";
}

export default function DashboardGeneral() {
  const [total, setTotal] = useState(0);
  const [porRaza, setPorRaza] = useState({});
  const [porEdad, setPorEdad] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPerros(), getPerrosPorRaza()])
      .then(([perrosRes, razaRes]) => {
        const perros = perrosRes.data;
        setTotal(perros.length);

        // Perros por raza
        let razas = {};
        if (razaRes.data && Array.isArray(razaRes.data)) {
          razaRes.data.forEach(item => {
            razas[item.raza] = item.cantidad;
          });
        } else {
          // Si no existe /perros/por-raza, agrupa manualmente
          perros.forEach(p => {
            razas[p.raza] = (razas[p.raza] || 0) + 1;
          });
        }
        setPorRaza(razas);

        // Perros por edad
        let edades = { Cachorro: 0, Adulto: 0, Senior: 0 };
        perros.forEach(p => {
          const cat = categorizarEdad(p.fechaNacimiento);
          edades[cat] = (edades[cat] || 0) + 1;
        });
        setPorEdad(edades);

        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando dashboard...</div>;

  return (
    <div style={{ background: "white", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
      <h2>📊 Dashboard General</h2>
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        <div>
          <h3>Total de Perros</h3>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>{total}</div>
        </div>
        <div style={{ minWidth: "300px" }}>
          <h3>Perros por Raza</h3>
          <Pie
            data={{
              labels: Object.keys(porRaza),
              datasets: [{
                data: Object.values(porRaza),
                backgroundColor: ["#51cf66", "#ffa726", "#ff6b6b", "#667eea", "#ffd600", "#00bcd4"]
              }]
            }}
          />
        </div>
        <div style={{ minWidth: "300px" }}>
          <h3>Categorías de Edad</h3>
          <Bar
            data={{
              labels: Object.keys(porEdad),
              datasets: [{
                label: "Cantidad",
                data: Object.values(porEdad),
                backgroundColor: "#667eea"
              }]
            }}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </div>
  );
}