import { useState, useEffect } from "react";
import { buscarPerrosPorDueno } from "../services/PerroService";

export default function BusquedaPorDueno() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarPerros = async () => {
    if (!busqueda.trim()) {
      setResultados([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await buscarPerrosPorDueno(busqueda);
      setResultados(response.data || []);
    } catch (err) {
      console.error("Error searching dogs:", err);
      setError("Error al buscar perros. Verifique que el nombre del dueño sea correcto.");
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      buscarPerros();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [busqueda]);

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
        👥 Buscar Perros por Dueño
      </h3>

      <div style={{
        marginBottom: '24px',
        padding: '16px',
        background: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1976d2' }}>
          <strong>Instrucciones:</strong>
        </p>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#1976d2' }}>
          <li>Ingrese el nombre completo del dueño</li>
          <li>La búsqueda es automática mientras escribe</li>
          <li>Se mostrarán todos los perros registrados a nombre de esa persona</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nombre del dueño..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Buscando perros...
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '12px', 
          background: '#ffebee', 
          color: '#c62828', 
          borderRadius: '8px', 
          marginBottom: '16px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}

      {!loading && !error && resultados.length > 0 && (
        <div>
          <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>
            Resultados encontrados: {resultados.length} perro(s)
          </h4>
          <div style={{ display: 'grid', gap: '16px' }}>
            {resultados.map((resultado, index) => (
              <div key={index} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
                background: '#fafafa'
              }}>
                <h5 style={{ margin: '0 0 8px 0', color: '#333' }}>
                  Dueño: {resultado.nombreDueno}
                </h5>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {resultado.perros.map((perro, perroIndex) => (
                    <div key={perroIndex} style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e0e0e0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong>{perro.nombre}</strong> - {perro.raza}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {perro.edad} años, {perro.sexo}
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                        📍 {perro.ubicacion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && busqueda && resultados.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: '#666',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          No se encontraron perros registrados para "{busqueda}"
        </div>
      )}
    </div>
  );
} 