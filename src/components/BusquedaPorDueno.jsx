import { useState, useEffect } from "react";

export default function BusquedaPorDueno() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Datos simulados de perros por dueño
  const perrosPorDueno = {
    "Juan Pérez": [
      { id: 1, nombrePerro: "Max", raza: "Labrador Retriever", edad: 3, sexo: "Macho", ubicacion: "Centro" },
      { id: 2, nombrePerro: "Luna", raza: "Golden Retriever", edad: 2, sexo: "Hembra", ubicacion: "Centro" }
    ],
    "María García": [
      { id: 3, nombrePerro: "Rocky", raza: "Pastor Alemán", edad: 4, sexo: "Macho", ubicacion: "Norte" },
      { id: 4, nombrePerro: "Bella", raza: "Chihuahua", edad: 1, sexo: "Hembra", ubicacion: "Norte" },
      { id: 5, nombrePerro: "Thor", raza: "Husky Siberiano", edad: 2, sexo: "Macho", ubicacion: "Norte" }
    ],
    "Carlos López": [
      { id: 6, nombrePerro: "Daisy", raza: "Beagle", edad: 3, sexo: "Hembra", ubicacion: "Sur" }
    ],
    "Ana Rodríguez": [
      { id: 7, nombrePerro: "Bruno", raza: "Bulldog Francés", edad: 2, sexo: "Macho", ubicacion: "Este" },
      { id: 8, nombrePerro: "Mia", raza: "Yorkshire Terrier", edad: 1, sexo: "Hembra", ubicacion: "Este" }
    ],
    "Luis Martínez": [
      { id: 9, nombrePerro: "Rex", raza: "Rottweiler", edad: 5, sexo: "Macho", ubicacion: "Oeste" }
    ],
    "Carmen Silva": [
      { id: 10, nombrePerro: "Coco", raza: "Poodle", edad: 4, sexo: "Macho", ubicacion: "Suroeste" },
      { id: 11, nombrePerro: "Nina", raza: "Border Collie", edad: 2, sexo: "Hembra", ubicacion: "Suroeste" },
      { id: 12, nombrePerro: "Toby", raza: "Boxer", edad: 3, sexo: "Macho", ubicacion: "Suroeste" }
    ]
  };

  const buscarPerros = async () => {
    if (!busqueda.trim()) {
      setResultados([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simular búsqueda
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const busquedaLower = busqueda.toLowerCase();
      const resultadosEncontrados = Object.entries(perrosPorDueno)
        .filter(([nombreDueno]) => 
          nombreDueno.toLowerCase().includes(busquedaLower)
        )
        .map(([nombreDueno, perros]) => ({
          nombreDueno,
          perros
        }));

      setResultados(resultadosEncontrados);
    } catch (err) {
      setError("Error al buscar perros");
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
          <strong>Información Pública:</strong> Busca los perros registrados por nombre del dueño.
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#1976d2', opacity: 0.8 }}>
          Solo se muestra información básica de los perros para proteger la privacidad.
        </p>
      </div>

      {/* Campo de búsqueda */}
      <div style={{ marginBottom: '24px' }}>
        <input 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
          placeholder="Ingresa el nombre del dueño..." 
          style={{ 
            width: '100%',
            padding: '12px 16px', 
            borderRadius: '8px', 
            border: "1px solid #e1e5e9",
            fontSize: '14px',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
      </div>

      {loading && (
        <div style={{ 
          textAlign: "center", 
          padding: "20px",
          color: '#666',
          fontSize: '14px'
        }}>
          Buscando perros...
        </div>
      )}

      {error && (
        <div style={{ 
          color: "#d32f2f", 
          textAlign: "center", 
          padding: "20px",
          background: '#ffebee',
          borderRadius: '8px',
          border: '1px solid #ffcdd2',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {/* Resultados */}
      {!loading && !error && (
        <div>
          {resultados.length === 0 && busqueda.trim() !== "" ? (
            <div style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#666",
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>No se encontraron resultados</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                No hay perros registrados para "{busqueda}"
              </p>
            </div>
          ) : resultados.length > 0 ? (
            <div style={{ display: 'grid', gap: '20px' }}>
              {resultados.map((resultado, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '20px',
                  border: '1px solid #e1e5e9'
                }}>
                  <h4 style={{ 
                    margin: '0 0 16px 0', 
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    👤 {resultado.nombreDueno}
                  </h4>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '16px' 
                  }}>
                    {resultado.perros.map((perro) => (
                      <div key={perro.id} style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '16px',
                        border: '1px solid #e1e5e9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '18px', marginRight: '8px' }}>🐕</span>
                          <h5 style={{ 
                            margin: 0, 
                            fontSize: '16px', 
                            fontWeight: '600',
                            color: '#333'
                          }}>
                            {perro.nombrePerro}
                          </h5>
                        </div>
                        
                        <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Raza:</span>
                            <span style={{ fontWeight: '500' }}>{perro.raza}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Edad:</span>
                            <span style={{ fontWeight: '500' }}>{perro.edad} años</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Sexo:</span>
                            <span style={{ fontWeight: '500' }}>{perro.sexo}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Ubicación:</span>
                            <span style={{ fontWeight: '500' }}>{perro.ubicacion}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    background: '#e8f5e8',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#2e7d32',
                    textAlign: 'center'
                  }}>
                    Total: {resultado.perros.length} perro{resultado.perros.length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          ) : busqueda.trim() === "" ? (
            <div style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#666",
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Busca por nombre del dueño</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Ingresa el nombre del dueño para ver sus perros registrados
              </p>
            </div>
          ) : null}
        </div>
      )}

      {/* Información adicional */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: '#fff3cd',
        borderRadius: '8px',
        border: '1px solid #ffeaa7'
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#856404', fontSize: '14px' }}>
          ℹ️ Información Pública Disponible
        </h4>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '20px', 
          fontSize: '12px', 
          color: '#856404',
          lineHeight: '1.4'
        }}>
          <li>Nombre del perro</li>
          <li>Raza</li>
          <li>Edad</li>
          <li>Sexo</li>
          <li>Zona de ubicación</li>
        </ul>
        <p style={{ 
          margin: '8px 0 0 0', 
          fontSize: '11px', 
          color: '#856404',
          opacity: 0.8
        }}>
          <strong>Nota:</strong> La información personal del dueño (teléfono, email) no está disponible públicamente.
        </p>
      </div>
    </div>
  );
} 