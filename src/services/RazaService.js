const API = "http://localhost:8080/api/raza";

// Obtener todas las razas
export const getRazas = () => {
  return fetch(`${API}/all`).then(res => res.json());
};

// Obtener una raza por ID
export const getRaza = (id) => {
  return fetch(`${API}/${id}`).then(res => res.json());
};

// Crear una nueva raza
export const addRaza = (raza) => {
  return fetch(`${API}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(raza)
  }).then(res => res.json());
};

// Actualizar una raza
export const updateRaza = (id, raza) => {
  return fetch(`${API}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(raza)
  }).then(res => res.json());
};

// Eliminar una raza
export const deleteRaza = (id) => {
  return fetch(`${API}/delete/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
};