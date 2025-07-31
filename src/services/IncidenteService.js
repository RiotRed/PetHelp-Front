import api from './api';

// Obtener todos los incidentes
export const getIncidentes = () => {
  return api.get('/incidentes');
};

// Obtener un incidente por ID
export const getIncidente = (id) => {
  return api.get(`/incidentes/${id}`);
};

// Crear un nuevo incidente
export const addIncidente = (incidente) => {
  return api.post('/incidentes', incidente);
};

// Actualizar un incidente
export const updateIncidente = (id, incidente) => {
  return api.put(`/incidentes/${id}`, incidente);
};

// Eliminar un incidente
export const deleteIncidente = (id) => {
  return api.delete(`/incidentes/${id}`);
};

// Obtener estadísticas de incidentes
export const getEstadisticasIncidentes = () => {
  return api.get('/incidentes/estadisticas');
};

// Obtener incidentes por tipo
export const getIncidentesPorTipo = (tipo) => {
  return api.get(`/incidentes/tipo`, { params: { tipo } });
};

// Obtener incidentes por estado
export const getIncidentesPorEstado = (estado) => {
  return api.get(`/incidentes/estado`, { params: { estado } });
};

// Obtener incidentes por perro
export const getIncidentesPorPerro = (perroId) => {
  return api.get(`/incidentes/perro/${perroId}`);
}; 