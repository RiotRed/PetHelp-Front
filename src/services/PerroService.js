const API = "http://localhost:8080/api/perro";

// Obtener todos los perros
export const getPerros = () => {
  return fetch(`${API}/all`).then(res => res.json());
};

// Obtener un perro por ID
export const getPerro = (id) => {
  return fetch(`${API}/${id}`).then(res => res.json());
};

// Crear un nuevo perro
export const addPerro = (perro) => {
  return fetch(`${API}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(perro)
  }).then(res => res.json());
};

// Actualizar un perro
export const updatePerro = (id, perro) => {
  return fetch(`${API}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(perro)
  }).then(res => res.json());
};

// Eliminar un perro
export const deletePerro = (id) => {
  return fetch(`${API}/delete/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
};

// Buscar perros por dueño
export const buscarPerrosPorDueno = (nombreDueno) => {
  return fetch(`${API}/buscar?dueno=${encodeURIComponent(nombreDueno)}`).then(res => res.json());
};

// Obtener perros por ubicación
export const getPerrosPorUbicacion = (ubicacion) => {
  return fetch(`${API}/ubicacion/${encodeURIComponent(ubicacion)}`).then(res => res.json());
};

// Obtener perros por raza
export const getPerrosPorRaza = (raza) => {
  return fetch(`${API}/raza/${encodeURIComponent(raza)}`).then(res => res.json());
};

// Obtener perros por tamaño
export const getPerrosPorTamaño = (tamaño) => {
  return fetch(`${API}/tamaño/${encodeURIComponent(tamaño)}`).then(res => res.json());
};

// Obtener perros por comportamiento
export const getPerrosPorComportamiento = (comportamiento) => {
  return fetch(`${API}/comportamiento/${encodeURIComponent(comportamiento)}`).then(res => res.json());
};