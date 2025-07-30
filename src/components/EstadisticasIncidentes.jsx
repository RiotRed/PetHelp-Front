import { useState, useEffect } from "react";

export default function EstadisticasIncidentes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Datos simulados de incidentes por raza
  const incidentesPorRaza = [
    { raza: "Pastor Alemán", totalPerros: 15, conIncidentes: 8, porcentaje: 53.3, nivel: "Alto" },
    { raza: "Rottweiler", totalPerros: 12, conIncidentes: 6, porcentaje: 50.0, nivel: "Alto" },
    { raza: "Pit Bull", totalPerros: 8, conIncidentes: 5, porcentaje: 62.5, nivel: "Alto" },
    { raza: "Doberman", totalPerros: 10, conIncidentes: 4, porcentaje: 40.0, nivel: "Medio" },
    { raza: "Labrador Retriever", totalPerros: 25, conIncidentes: 3, porcentaje: 12.0, nivel: "Bajo" },
    { raza: "Golden Retriever", totalPerros: 18, conIncidentes: 2, porcentaje: 11.1, nivel: "Bajo" },
    { raza: "Beagle", totalPerros: 14, conIncidentes: 3, porcentaje: 21.4, nivel: "Bajo" },
    { raza: "Bulldog Francés", totalPerros: 20, conIncidentes: 4, porcentaje: 20.0, nivel: "Bajo" },
    { raza: "Chihuahua", totalPerros: 16, conIncidentes: 5, porcentaje: 31.3, nivel: "Medio" },
    { raza: "Yorkshire Terrier", totalPerros: 12, conIncidentes: 2, porcentaje: 16.7, nivel: "Bajo" }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          border: '1px solid #ffcc02',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
            {razasConMedioRiesgo.length}
          </div>
          <div style={{ fontSize: '14px', color: '#f57c00' }}>Razas de Riesgo Medio</div>
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

      {/* Tabla de incidentes */}
      <div style={{
        background: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '16px' }}>
          📊 Detalle por Raza
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e1e5e9' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  Raza
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  Total Perros
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  Con Incidentes
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  Porcentaje
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  Nivel de Riesgo
                </th>
              </tr>
            </thead>
            <tbody>
              {incidentesPorRaza
                .sort((a, b) => b.porcentaje - a.porcentaje)
                .map((raza, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e1e5e9' }}>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>
                    {raza.raza}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                    {raza.totalPerros}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                    {raza.conIncidentes}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>
                    {raza.porcentaje}%
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: getNivelColor(raza.nivel),
                      color: 'white'
                    }}>
                      {raza.nivel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recomendaciones */}
      <div style={{
        background: '#e3f2fd',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #bbdefb'
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#1976d2', fontSize: '16px' }}>
          💡 Recomendaciones para Registradores
        </h4>
        <div style={{ display: 'grid', gap: '12px', fontSize: '14px', color: '#1976d2' }}>
          <div>
            <strong>Razas de Alto Riesgo:</strong> Requieren atención especial y posiblemente medidas adicionales de control.
          </div>
          <div>
            <strong>Razas de Riesgo Medio:</strong> Monitorear comportamiento y proporcionar orientación a los dueños.
          </div>
          <div>
            <strong>Razas de Bajo Riesgo:</strong> Mantener registro regular sin medidas especiales.
          </div>
          <div style={{ marginTop: '8px', padding: '12px', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
            <strong>Nota:</strong> Estos datos ayudan a organizar mejor las actividades municipales y concursos caninos, 
            priorizando la seguridad y el bienestar de todos los participantes.
          </div>
        </div>
      </div>

      {/* Gráfico de barras simplificado */}
      <div style={{
        marginTop: '24px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '16px' }}>
          📈 Porcentaje de Incidentes por Raza
        </h4>
        <div style={{ display: 'grid', gap: '8px' }}>
          {incidentesPorRaza
            .sort((a, b) => b.porcentaje - a.porcentaje)
            .slice(0, 8)
            .map((raza, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                minWidth: '120px', 
                fontSize: '14px', 
                fontWeight: '500' 
              }}>
                {raza.raza}
              </div>
              <div style={{ 
                flex: 1, 
                height: '20px', 
                background: '#e1e5e9', 
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${raza.porcentaje}%`,
                  height: '100%',
                  background: getNivelColor(raza.nivel),
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <div style={{ 
                minWidth: '40px', 
                fontSize: '12px', 
                fontWeight: '600',
                color: getNivelColor(raza.nivel)
              }}>
                {raza.porcentaje}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 