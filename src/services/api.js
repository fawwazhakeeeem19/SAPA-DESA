const BASE_URL = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('sapa_desa_token')

const headers = (isFormData = false) => {
  const h = {}
  const token = getToken()
  if (token) h['Authorization'] = `Bearer ${token}`
  if (!isFormData) h['Content-Type'] = 'application/json'
  return h
}

const request = async (method, path, body = null, isFormData = false) => {
  const options = { method, headers: headers(isFormData) }
  if (body) options.body = isFormData ? body : JSON.stringify(body)
  const res = await fetch(`${BASE_URL}${path}`, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan')
  return data.data
}

// AUTH
export const authAPI = {
  login:          (body) => request('POST', '/auth/login', body),
  register:       (body) => request('POST', '/auth/register', body),
  me:             ()     => request('GET',  '/auth/me'),
  updateMe:       (body) => request('PUT',  '/auth/me', body),
  changePassword: (body) => request('PUT',  '/auth/change-password', body),
}

// ADUAN
export const aduanAPI = {
  getAll:       (params = {}) => request('GET', '/aduan?' + new URLSearchParams(params)),
  getOne:       (id)          => request('GET', `/aduan/${id}`),
  getStats:     ()            => request('GET', '/aduan/stats'),
  create:       (formData)    => request('POST', '/aduan', formData, true),
  updateStatus: (id, body)    => request('PATCH', `/aduan/${id}/status`, body),
  delete:       (id)          => request('DELETE', `/aduan/${id}`),
}

// NOTIFIKASI
export const notifikasiAPI = {
  getAll:  () => request('GET',   '/notifikasi'),
  readAll: () => request('PATCH', '/notifikasi/read-all'),
}

// USERS
export const userAPI = {
  getAll:       (params = {}) => request('GET', '/users?' + new URLSearchParams(params)),
  toggleActive: (id)          => request('PATCH', `/users/${id}/toggle`),
}
