import api from './api';

// Obtener todos los perros
export const getPerros = () => {
  return api.get('/perros');
};

// Obtener un perro por ID
export const getPerro = (id) => {
  return api.get(`/perros/${id}`);
};

// Crear un nuevo perro
export const addPerro = (perro) => {
  return api.post('/perros', perro);
};

// Actualizar un perro
export const updatePerro = (id, perro) => {
  return api.put(`/perros/${id}`, perro);
};

// Eliminar un perro
export const deletePerro = (id) => {
  return api.delete(`/perros/${id}`);
};

// Buscar perros por dueño
export const buscarPerrosPorDueno = (nombreDueno) => {
  return api.get(`/perros/buscar-dueno`, { params: { nombre: nombreDueno } });
};

// Obtener estadísticas de incidentes por raza
export const getEstadisticasIncidentes = () => {
  return api.get('/incidentes/estadisticas');
};

// Obtener mapa de densidad canina
export const getMapaDensidad = () => {
  return api.get('/perros/densidad');
};

// Obtener perros por ubicación
export const getPerrosPorUbicacion = (ubicacion) => {
  return api.get(`/perros/ubicacion`, { params: { ubicacion } });
};

// Obtener perros por raza
export const getPerrosPorRaza = (raza) => {
  return api.get(`/perros/raza`, { params: { raza } });
};

// Obtener perros por tamaño
export const getPerrosPorTamaño = (tamaño) => {
  return api.get(`/perros/tamaño`, { params: { tamaño } });
};

// Obtener perros por comportamiento
export const getPerrosPorComportamiento = (comportamiento) => {
  return api.get(`/perros/comportamiento`, { params: { comportamiento } });
};

// Obtener estadísticas generales
export const getEstadisticasGenerales = () => {
  return api.get('/perros/estadisticas');
};

// Obtener todas las razas
export const getRazas = () => {
  return api.get('/razas');
};

// Obtener todos los distritos
export const getDistritos = () => {
  return api.get('/distritos');
};

// Obtener incidentes
export const getIncidentes = () => {
  return api.get('/incidentes');
};

// Crear incidente
export const addIncidente = (incidente) => {
  return api.post('/incidentes', incidente);
}; 