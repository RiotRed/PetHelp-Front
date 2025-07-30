import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '16px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e1e5e9'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          🐕
        </div>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
          }}>
            Sistema de Registro Canino
          </h1>
          <p style={{
            margin: '2px 0 0 0',
            fontSize: '12px',
            color: '#666'
          }}>
            Gestión Municipal de Mascotas
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '8px 16px',
          borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #e1e5e9'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#333'
          }}>
            {user.name || user.email}
          </span>
          <button
            onClick={logout}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f0f0f0';
              e.target.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#666';
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}