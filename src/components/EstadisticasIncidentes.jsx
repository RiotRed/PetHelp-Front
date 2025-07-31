import { useState, useEffect } from "react";
import { getEstadisticasIncidentes } from "../services/IncidenteService";

export default function EstadisticasIncidentes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [estadisticas, setEstadisticas] = useState({
    totalIncidentes: 0,
    porTipo: {},
    porEstado: {}
  });

  useEffect(() => {
    const loadEstadisticas = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await getEstadisticasIncidentes();
        setEstadisticas(response.data || {
          totalIncidentes: 0,
          porTipo: {},
          porEstado: {}
        });
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
        ⚠️ Estadísticas de Incidentes
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
            {estadisticas.totalIncidentes}
          </div>
          <div style={{ fontSize: '14px', color: '#856404' }}>Total de Incidentes</div>
        </div>
        <div style={{
          padding: '16px',
          background: '#fff8e1',
          borderRadius: '8px',
          border: '1px solid #ffecb3',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
            {Object.keys(estadisticas.porTipo).length}
          </div>
          <div style={{ fontSize: '14px', color: '#f57c00' }}>Tipos de Incidentes</div>
        </div>
        <div style={{
          padding: '16px',
          background: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #c8e6c9',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
            {Object.keys(estadisticas.porEstado).length}
          </div>
          <div style={{ fontSize: '14px', color: '#2e7d32' }}>Estados de Incidentes</div>
        </div>
      </div>

      {/* Estadísticas por tipo */}
      {Object.keys(estadisticas.porTipo).length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '16px' }}>
            📊 Incidentes por Tipo
          </h4>
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
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tipo de Incidente</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Cantidad</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(estadisticas.porTipo).map(([tipo, cantidad], index) => (
                  <tr key={index} style={{
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{tipo}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{cantidad}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {estadisticas.totalIncidentes > 0 
                        ? Math.round((cantidad / estadisticas.totalIncidentes) * 100) 
                        : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Estadísticas por estado */}
      {Object.keys(estadisticas.porEstado).length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '16px' }}>
            📈 Incidentes por Estado
          </h4>
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
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Estado</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Cantidad</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(estadisticas.porEstado).map(([estado, cantidad], index) => (
                  <tr key={index} style={{
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{estado}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{cantidad}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {estadisticas.totalIncidentes > 0 
                        ? Math.round((cantidad / estadisticas.totalIncidentes) * 100) 
                        : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay datos */}
      {estadisticas.totalIncidentes === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          No hay incidentes registrados en el sistema
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
          📊 Información de Estadísticas
        </h4>
        <p style={{ 
          margin: 0, 
          fontSize: '12px', 
          color: '#1976d2',
          lineHeight: '1.4'
        }}>
          <strong>Nota:</strong> Estas estadísticas muestran el total de incidentes registrados en el sistema, 
          clasificados por tipo y estado. Los datos se actualizan en tiempo real según los reportes ingresados.
        </p>
      </div>
    </div>
  );
} 