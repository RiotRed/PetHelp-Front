import { useEffect, useState } from "react";
import { getPerros } from "../services/PerroService";
import { getRazas } from "../services/RazaService";
import { Pie } from "react-chartjs-2";

export default function DashboardGeneral() {
  const [total, setTotal] = useState(0);
  const [porRaza, setPorRaza] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener perros y razas
    Promise.all([getPerros(), getRazas()])
      .then(([perrosRes, razasRes]) => {
        // perrosRes puede ser {data:[]} o []
        const perros = perrosRes.data || perrosRes || [];
        setTotal(perros.length);

        // Agrupar perros por razaId
        const conteoPorRazaId = {};
        perros.forEach(p => {
          conteoPorRazaId[p.razaid] = (conteoPorRazaId[p.razaid] || 0) + 1;
        });

        // Mapear razaId a nombre de raza
        const razas = razasRes.data || razasRes || [];
        const idToNombre = {};
        razas.forEach(r => {
          idToNombre[r.id] = r.nombre;
        });

        // Construir objeto {nombreRaza: cantidad}
        const agrupado = {};
        Object.entries(conteoPorRazaId).forEach(([razaid, cantidad]) => {
          const nombre = idToNombre[razaid] || `Raza ${razaid}`;
          agrupado[nombre] = cantidad;
        });

        setPorRaza(agrupado);
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
                backgroundColor: [
                  "#51cf66", "#ffa726", "#ff6b6b", "#667eea", "#ffd600", "#00bcd4", "#b388ff", "#ffb300"
                ]
              }]
            }}
          />
        </div>
      </div>
    </div>
  );
}