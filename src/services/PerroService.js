import api from './api';

// Obtener todos los perros
export const getPerros = async () => {
  try {
    const response = await api.get('/perros');
    return response.data;
  } catch (error) {
    console.error('Error fetching perros:', error);
    throw new Error('Error al obtener los perros');
  }
};

// Obtener un perro por ID
export const getPerro = async (id) => {
  try {
    const response = await api.get(`/perros/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching perro:', error);
    throw new Error('Error al obtener el perro');
  }
};

// Crear un nuevo perro
export const addPerro = async (perro) => {
  try {
    const response = await api.post('/perros', perro);
    return response.data;
  } catch (error) {
    console.error('Error adding perro:', error);
    throw new Error('Error al crear el perro');
  }
};

// Actualizar un perro
export const updatePerro = async (id, perro) => {
  try {
    const response = await api.put(`/perros/${id}`, perro);
    return response.data;
  } catch (error) {
    console.error('Error updating perro:', error);
    throw new Error('Error al actualizar el perro');
  }
};

// Eliminar un perro
export const deletePerro = async (id) => {
  try {
    await api.delete(`/perros/${id}`);
  } catch (error) {
    console.error('Error deleting perro:', error);
    throw new Error('Error al eliminar el perro');
  }
};

// Buscar perros por dueño
export const buscarPerrosPorDueno = async (nombreDueno) => {
  try {
    const response = await api.get(`/perros/buscar-dueno`, { params: { nombre: nombreDueno } });
    return response.data;
  } catch (error) {
    console.error('Error searching perros by owner:', error);
    throw new Error('Error al buscar perros por dueño');
  }
};

// Obtener estadísticas de incidentes por raza
export const getEstadisticasIncidentes = async () => {
  try {
    const response = await api.get('/incidentes/estadisticas');
    return response.data;
  } catch (error) {
    console.error('Error fetching incident statistics:', error);
    throw new Error('Error al obtener estadísticas de incidentes');
  }
};

// Obtener mapa de densidad canina
export const getMapaDensidad = async () => {
  try {
    const response = await api.get('/perros/densidad');
    return response.data;
  } catch (error) {
    console.error('Error fetching density map:', error);
    throw new Error('Error al obtener el mapa de densidad');
  }
};

// Obtener perros por ubicación
export const getPerrosPorUbicacion = async (ubicacion) => {
  try {
    const response = await api.get(`/perros/ubicacion`, { params: { ubicacion } });
    return response.data;
  } catch (error) {
    console.error('Error fetching perros by location:', error);
    throw new Error('Error al buscar perros por ubicación');
  }
};

// Obtener perros por raza
export const getPerrosPorRaza = async (raza) => {
  try {
    const response = await api.get(`/perros/raza`, { params: { raza } });
    return response.data;
  } catch (error) {
    console.error('Error fetching perros by breed:', error);
    throw new Error('Error al buscar perros por raza');
  }
};

// Obtener perros por tamaño
export const getPerrosPorTamaño = async (tamaño) => {
  try {
    const response = await api.get(`/perros/tamaño`, { params: { tamaño } });
    return response.data;
  } catch (error) {
    console.error('Error fetching perros by size:', error);
    throw new Error('Error al buscar perros por tamaño');
  }
};

// Obtener perros por comportamiento
export const getPerrosPorComportamiento = async (comportamiento) => {
  try {
    const response = await api.get(`/perros/comportamiento`, { params: { comportamiento } });
    return response.data;
  } catch (error) {
    console.error('Error fetching perros by behavior:', error);
    throw new Error('Error al buscar perros por comportamiento');
  }
};

// Obtener estadísticas generales
export const getEstadisticasGenerales = async () => {
  try {
    const response = await api.get('/perros/estadisticas');
    return response.data;
  } catch (error) {
    console.error('Error fetching general statistics:', error);
    throw new Error('Error al obtener estadísticas generales');
  }
};

// Obtener todas las razas
export const getRazas = async () => {
  try {
    const response = await api.get('/razas');
    return response.data;
  } catch (error) {
    console.error('Error fetching razas:', error);
    throw new Error('Error al obtener las razas');
  }
};

// Obtener todos los distritos
export const getDistritos = async () => {
  try {
    const response = await api.get('/distritos');
    return response.data;
  } catch (error) {
    console.error('Error fetching distritos:', error);
    throw new Error('Error al obtener los distritos');
  }
};

// Obtener incidentes
export const getIncidentes = async () => {
  try {
    const response = await api.get('/incidentes');
    return response.data;
  } catch (error) {
    console.error('Error fetching incidentes:', error);
    throw new Error('Error al obtener los incidentes');
  }
};

// Crear incidente
export const addIncidente = async (incidente) => {
  try {
    const response = await api.post('/incidentes', incidente);
    return response.data;
  } catch (error) {
    console.error('Error adding incidente:', error);
    throw new Error('Error al crear el incidente');
  }
}; 