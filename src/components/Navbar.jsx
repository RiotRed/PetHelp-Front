import { useState, useEffect } from "react";

export default function MapaDensidadCanina() {
  const [perros, setPerros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);

  // Simulación de datos de perros por zona
  const zonasConPerros = {
    "Centro": { perros: 45, densidad: "Alta", color: "#ff6b6b" },
    "Norte": { perros: 32, densidad: "Media", color: "#ffa726" },
    "Sur": { perros: 28, densidad: "Media", color: "#ffa726" },
    "Este": { perros: 15, densidad: "Baja", color: "#51cf66" },
    "Oeste": { perros: 38, densidad: "Alta", color: "#ff6b6b" },
    "Noroeste": { perros: 22, densidad: "Baja", color: "#51cf66" },
    "Suroeste": { perros: 41, densidad: "Alta", color: "#ff6b6b" },
    "Noreste": { perros: 18, densidad: "Baja", color: "#51cf66" },
    "Sureste": { perros: 25, densidad: "Media", color: "#ffa726" }
  };

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getColorByDensidad = (densidad) => {
    switch (densidad) {
      case "Alta": return "#ff6b6b";
      case "Media": return "#ffa726";
      case "Baja": return "#51cf66";
      default: return "#e1e5e9";
    }
  };

  const getDensidadText = (perros) => {
    if (perros >= 35) return "Alta";
    if (perros >= 20) return "Media";
    return "Baja";
  };

  if (loading) return (
    <div style={{ 
      textAlign: "center", 
      padding: "40px",
      color: '#666',
      fontSize: '16px'
    }}>
      Cargando mapa de densidad canina...
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
        🗺️ Mapa de Densidad Canina
      </h3>

      {/* Leyenda */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        padding: '16px',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#ff6b6b', borderRadius: '4px' }}></div>
          <span style={{ fontSize: '14px' }}>Alta densidad (35+ perros)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#ffa726', borderRadius: '4px' }}></div>
          <span style={{ fontSize: '14px' }}>Media densidad (20-34 perros)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#51cf66', borderRadius: '4px' }}></div>
          <span style={{ fontSize: '14px' }}>Baja densidad ({"<"}20 perros)</span>
        </div>
      </div>

      {/* Mapa simplificado */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {Object.entries(zonasConPerros).map(([zona, datos]) => (
          <div
            key={zona}
            onClick={() => setZonaSeleccionada(zona)}
            style={{
              padding: '20px',
              borderRadius: '8px',
              background: datos.color,
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: zonaSeleccionada === zona ? '3px solid #333' : 'none',
              transform: zonaSeleccionada === zona ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
              {zona}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
              {datos.perros}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>
              {datos.densidad} densidad
            </div>
          </div>
        ))}
      </div>

      {/* Información de la zona seleccionada */}
      {zonaSeleccionada && (
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e1e5e9'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#333', fontSize: '16px' }}>
            📍 Información de {zonaSeleccionada}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <strong style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>Total de Perros:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600' }}>
                {zonasConPerros[zonaSeleccionada].perros} perros
              </p>
            </div>
            <div>
              <strong style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>Nivel de Densidad:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600' }}>
                {zonasConPerros[zonaSeleccionada].densidad}
              </p>
            </div>
            <div>
              <strong style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>Recomendaciones:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>
                {zonasConPerros[zonaSeleccionada].densidad === "Alta" 
                  ? "Considerar más parques y servicios veterinarios"
                  : zonasConPerros[zonaSeleccionada].densidad === "Media"
                  ? "Monitorear crecimiento de la población canina"
                  : "Zona con buena distribución de mascotas"
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas generales */}
      <div style={{
        marginTop: '24px',
        padding: '20px',
        background: '#e8f5e8',
        borderRadius: '8px',
        border: '1px solid #c8e6c9'
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#2e7d32', fontSize: '16px' }}>
          📊 Estadísticas del Municipio
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
              {Object.values(zonasConPerros).reduce((sum, zona) => sum + zona.perros, 0)}
            </div>
            <div style={{ fontSize: '12px', color: '#2e7d32' }}>Total de Perros</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
              {Object.values(zonasConPerros).filter(zona => zona.densidad === "Alta").length}
            </div>
            <div style={{ fontSize: '12px', color: '#ff6b6b' }}>Zonas de Alta Densidad</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffa726' }}>
              {Object.values(zonasConPerros).filter(zona => zona.densidad === "Media").length}
            </div>
            <div style={{ fontSize: '12px', color: '#ffa726' }}>Zonas de Media Densidad</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#51cf66' }}>
              {Object.values(zonasConPerros).filter(zona => zona.densidad === "Baja").length}
            </div>
            <div style={{ fontSize: '12px', color: '#51cf66' }}>Zonas de Baja Densidad</div>
          </div>
        </div>
      </div>
    </div>
  );
}
