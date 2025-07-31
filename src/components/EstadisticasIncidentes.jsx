import { useState, useEffect } from "react";
import { getEstadisticasIncidentes } from "../services/IncidenteService";

export default function EstadisticasIncidentes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [incidentesPorRaza, setIncidentesPorRaza] = useState([]);

  useEffect(() => {
    const loadEstadisticas = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await getEstadisticasIncidentes();
        setIncidentesPorRaza(response.data || []);
      } catch (err) {
        console.error("Error loading incident statistics:", err);
        setError("Error al cargar las estadísticas de incidentes");
      } finally {
        setLoading(false);
      }
    };

    loadEstadisticas();
  }, []);

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case "Alto": return "#ff6b6b";
      case "Medio": return "#ffa726";
      case "Bajo": return "#51cf66";
      default: return "#e1e5e9";
    }
  };

  const razasConAltoRiesgo = incidentesPorRaza.filter(raza => raza.nivel === "Alto");
  const razasConMedioRiesgo = incidentesPorRaza.filter(raza => raza.nivel === "Medio");
  const razasConBajoRiesgo = incidentesPorRaza.filter(raza => raza.nivel === "Bajo");

  if (loading) return (
    <div style={{ 
      textAlign: "center", 
      padding: "40px",
      color: '#666',
      fontSize: '16px'
    }}>
      Cargando estadísticas de incidentes...
    </div>
  );

  if (error) return (
    <div style={{ 
      color: "#d32f2f", 
      textAlign: "center", 
      padding: "20px",
      background: '#ffebee',
      borderRadius: '8px',
      border: '1px solid #ffcdd2'
    }}>
      {error}
    </div>
  );

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#333',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        ⚠️ Estadísticas de Incidentes por Raza
      </h3>

      {/* Resumen general */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          padding: '16px',
          background: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>
            {razasConAltoRiesgo.length}
          </div>
          <div style={{ fontSize: '14px', color: '#856404' }}>Razas de Alto Riesgo</div>
        </div>
        <div style={{
          padding: '16px',
          background: '#fff8e1',
          borderRadius: '8px',
          border: '1px solid #ffecb3',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
            {razasConMedioRiesgo.length}
          </div>
          <div style={{ fontSize: '14px', color: '#f57c00' }}>Razas de Medio Riesgo</div>
        </div>
        <div style={{
          padding: '16px',
          background: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #c8e6c9',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
            {razasConBajoRiesgo.length}
          </div>
          <div style={{ fontSize: '14px', color: '#2e7d32' }}>Razas de Bajo Riesgo</div>
        </div>
      </div>

      {/* Tabla de estadísticas */}
      {incidentesPorRaza.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{
                background: '#f5f5f5',
                borderBottom: '2px solid #e0e0e0'
              }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Raza</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Total Perros</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Con Incidentes</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Porcentaje</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Nivel de Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {incidentesPorRaza.map((raza, index) => (
                <tr key={index} style={{
                  borderBottom: '1px solid #e0e0e0',
                  '&:hover': { background: '#f9f9f9' }
                }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{raza.raza}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{raza.totalPerros}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{raza.conIncidentes}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{raza.porcentaje}%</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: 'white',
                      background: getNivelColor(raza.nivel)
                    }}>
                      {raza.nivel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          No hay datos de incidentes disponibles
        </div>
      )}

      {/* Información adicional */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#1976d2', fontSize: '14px' }}>
          📊 Criterios de Clasificación
        </h4>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '20px', 
          fontSize: '12px', 
          color: '#1976d2',
          lineHeight: '1.4'
        }}>
          <li><strong>Alto Riesgo:</strong> Más del 40% de perros de la raza han tenido incidentes</li>
          <li><strong>Medio Riesgo:</strong> Entre 20% y 40% de perros de la raza han tenido incidentes</li>
          <li><strong>Bajo Riesgo:</strong> Menos del 20% de perros de la raza han tenido incidentes</li>
        </ul>
        <p style={{ 
          margin: '8px 0 0 0', 
          fontSize: '11px', 
          color: '#1976d2',
          opacity: 0.8
        }}>
          <strong>Nota:</strong> Estas estadísticas se basan en reportes registrados en el sistema.
        </p>
      </div>
    </div>
  );
} 