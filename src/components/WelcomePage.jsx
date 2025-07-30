export default function WelcomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '800px'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '24px',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
        }}>
          🐕
        </div>
        
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '16px',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Sistema de Registro Canino
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          marginBottom: '32px',
          opacity: 0.9,
          lineHeight: 1.6,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}>
          Gestiona el registro de perros y sus dueños de manera eficiente y organizada
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📝</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Registro Completo</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Registra perros con información detallada: raza, tamaño, comportamiento y ubicación
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Gestión de Dueños</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Mantén información actualizada de los dueños y sus mascotas
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Búsqueda Avanzada</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Filtra por raza, tamaño, comportamiento y ubicación
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Estadísticas</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Visualiza datos sobre razas, incidentes y densidad canina
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🗺️</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Mapa de Densidad</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Identifica zonas con alta densidad canina en tiempo real
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏆</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Actividades Municipales</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Organiza concursos y eventos caninos con datos precisos
            </p>
          </div>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            🎯 Funcionalidades Principales
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Para Registradores:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', opacity: 0.9 }}>
                <li>Registro completo de perros y dueños</li>
                <li>Clasificación por raza, tamaño y comportamiento</li>
                <li>Identificación de razas con mayor frecuencia de incidentes</li>
                <li>Organización de concursos y actividades municipales</li>
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Para el Público:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', opacity: 0.9 }}>
                <li>Consulta de perros por dueño</li>
                <li>Visualización de zonas con alta densidad canina</li>
                <li>Información sobre razas y comportamientos</li>
                <li>Acceso a estadísticas del municipio</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <p style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Inicia sesión o regístrate para comenzar
          </p>
          <p style={{
            margin: 0,
            fontSize: '14px',
            opacity: 0.8
          }}>
            El modal de autenticación aparecerá automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}