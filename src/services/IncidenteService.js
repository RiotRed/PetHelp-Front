import api from './api';

// Obtener todos los incidentes
export const getIncidentes = async () => {
  try {
    const response = await api.get('/incidentes');
    return response.data;
  } catch (error) {
    console.error('Error fetching incidentes:', error);
    throw new Error('Error al obtener los incidentes');
  }
};

// Obtener un incidente por ID
export const getIncidente = async (id) => {
  try {
    const response = await api.get(`/incidentes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incidente:', error);
    throw new Error('Error al obtener el incidente');
  }
};

// Crear un nuevo incidente
export const addIncidente = async (incidente) => {
  try {
    const response = await api.post('/incidentes', incidente);
    return response.data;
  } catch (error) {
    console.error('Error adding incidente:', error);
    throw new Error('Error al crear el incidente');
  }
};

// Actualizar un incidente
export const updateIncidente = async (id, incidente) => {
  try {
    const response = await api.put(`/incidentes/${id}`, incidente);
    return response.data;
  } catch (error) {
    console.error('Error updating incidente:', error);
    throw new Error('Error al actualizar el incidente');
  }
};

// Eliminar un incidente
export const deleteIncidente = async (id) => {
  try {
    await api.delete(`/incidentes/${id}`);
  } catch (error) {
    console.error('Error deleting incidente:', error);
    throw new Error('Error al eliminar el incidente');
  }
};

// Obtener estadísticas de incidentes
export const getEstadisticasIncidentes = async () => {
  try {
    const response = await api.get('/incidentes/estadisticas');
    return response;
  } catch (error) {
    console.error('Error fetching incident statistics:', error);
    throw new Error('Error al obtener estadísticas de incidentes');
  }
};

// Obtener incidentes por tipo
export const getIncidentesPorTipo = async (tipo) => {
  try {
    const response = await api.get(`/incidentes/tipo`, { params: { tipo } });
    return response.data;
  } catch (error) {
    console.error('Error fetching incidentes by type:', error);
    throw new Error('Error al obtener incidentes por tipo');
  }
};

// Obtener incidentes por estado
export const getIncidentesPorEstado = async (estado) => {
  try {
    const response = await api.get(`/incidentes/estado`, { params: { estado } });
    return response.data;
  } catch (error) {
    console.error('Error fetching incidentes by status:', error);
    throw new Error('Error al obtener incidentes por estado');
  }
};

// Obtener incidentes por perro
export const getIncidentesPorPerro = async (perroId) => {
  try {
    const response = await api.get(`/incidentes/perro/${perroId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incidentes by dog:', error);
    throw new Error('Error al obtener incidentes por perro');
  }
}; 