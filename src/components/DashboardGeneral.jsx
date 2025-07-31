import { useEffect, useState } from "react";
import { getPerros, getEstadisticasGenerales, getRazas } from "../services/PerroService";
import { Pie, Bar } from "react-chartjs-2";
import dayjs from "dayjs";

function categorizarEdad(edad) {
  if (edad < 2) return "Cachorro";
  if (edad < 7) return "Adulto";
  return "Senior";
}

export default function DashboardGeneral() {
  const [total, setTotal] = useState(0);
  const [porRaza, setPorRaza] = useState({});
  const [porEdad, setPorEdad] = useState({});
  const [porTamaño, setPorTamaño] = useState({});
  const [porComportamiento, setPorComportamiento] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        // Get all dogs
        const perrosRes = await getPerros();
        const perros = perrosRes.data || [];
        setTotal(perros.length);

        // Get statistics
        try {
          const estadisticasRes = await getEstadisticasGenerales();
          if (estadisticasRes.data) {
            // Usar los datos de estadísticas si están disponibles
            if (estadisticasRes.data.porTamaño) {
              setPorTamaño(estadisticasRes.data.porTamaño);
            }
            if (estadisticasRes.data.porComportamiento) {
              setPorComportamiento(estadisticasRes.data.porComportamiento);
            }
          }
        } catch (error) {
          console.warn("Error loading statistics, using fallback:", error);
        }

        // Fallback: group by breed manually
        const razas = {};
        perros.forEach(p => {
          const raza = p.raza || 'Sin raza';
          razas[raza] = (razas[raza] || 0) + 1;
        });
        setPorRaza(razas);

        // Group by age
        const edades = { Cachorro: 0, Adulto: 0, Senior: 0 };
        perros.forEach(p => {
          const cat = categorizarEdad(p.edad || 0);
          edades[cat] = (edades[cat] || 0) + 1;
        });
        setPorEdad(edades);

        // Fallback: group by size if not available from statistics
        if (Object.keys(porTamaño).length === 0) {
          const tamaños = {};
          perros.forEach(p => {
            const tamaño = p.tamanio || 'Sin especificar';
            tamaños[tamaño] = (tamaños[tamaño] || 0) + 1;
          });
          setPorTamaño(tamaños);
        }

        // Fallback: group by behavior if not available from statistics
        if (Object.keys(porComportamiento).length === 0) {
          const comportamientos = {};
          perros.forEach(p => {
            const comportamiento = p.comportamiento || 'Sin especificar';
            comportamientos[comportamiento] = (comportamientos[comportamiento] || 0) + 1;
          });
          setPorComportamiento(comportamientos);
        }

      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Error al cargar los datos del dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return (
    <div style={{ 
      textAlign: "center", 
      padding: "40px",
      color: '#666',
      fontSize: '16px'
    }}>
      Cargando dashboard...
    </div>
  );

  if (error) {
    return (
      <div style={{ 
        background: "white", 
        borderRadius: "12px", 
        padding: "24px", 
        marginBottom: "24px",
        color: "red"
      }}>
        <h2>📊 Dashboard General</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

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
          {Object.keys(porRaza).length > 0 ? (
            <Pie
              data={{
                labels: Object.keys(porRaza),
                datasets: [{
                  data: Object.values(porRaza),
                  backgroundColor: ["#51cf66", "#ffa726", "#ff6b6b", "#667eea", "#ffd600", "#00bcd4"]
                }]
              }}
            />
          ) : (
            <p>No hay datos disponibles</p>
          )}
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
        <div style={{ minWidth: "300px" }}>
          <h3>Perros por Tamaño</h3>
          {Object.keys(porTamaño).length > 0 ? (
            <Bar
              data={{
                labels: Object.keys(porTamaño),
                datasets: [{
                  label: "Cantidad",
                  data: Object.values(porTamaño),
                  backgroundColor: "#51cf66"
                }]
              }}
              options={{ plugins: { legend: { display: false } } }}
            />
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </div>
        <div style={{ minWidth: "300px" }}>
          <h3>Perros por Comportamiento</h3>
          {Object.keys(porComportamiento).length > 0 ? (
            <Bar
              data={{
                labels: Object.keys(porComportamiento),
                datasets: [{
                  label: "Cantidad",
                  data: Object.values(porComportamiento),
                  backgroundColor: "#ffa726"
                }]
              }}
              options={{ plugins: { legend: { display: false } } }}
            />
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}