// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hera-api.onrender.com';
const API_PREFIX = '/hera-api';

const api = {
  // Configuração padrão para as requisições
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${API_PREFIX}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro na requisição');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Erro de conexão com o servidor');
        }
        throw error;
      }
      throw new Error('Erro inesperado');
    }
  },

  // Pacientes
  pacientes: {
    listar: () => api.request('/pacientes'),
    buscarPorId: (id: string) => api.request(`/pacientes/${id}`),
    criar: (dados: any) => api.request('/pacientes', { method: 'POST', body: JSON.stringify(dados) }),
    atualizar: (id: string, dados: any) => 
      api.request(`/pacientes/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
    excluir: (id: string) => api.request(`/pacientes/${id}`, { method: 'DELETE' }),
  },

  // Médicos
  medicos: {
    listar: () => api.request('/medicos'),
    buscarPorId: (id: string) => api.request(`/medicos/${id}`),
    criar: (dados: any) => api.request('/medicos', { method: 'POST', body: JSON.stringify(dados) }),
    atualizar: (id: string, dados: any) => 
      api.request(`/medicos/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
    excluir: (id: string) => api.request(`/medicos/${id}`, { method: 'DELETE' }),
  },

  // Consultas
  consultas: {
    listar: () => api.request('/consultas'),
    buscarPorId: (id: string) => api.request(`/consultas/${id}`),
    criar: (dados: any) => api.request('/consultas', { method: 'POST', body: JSON.stringify(dados) }),
    atualizar: (id: string, dados: any) => 
      api.request(`/consultas/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
    excluir: (id: string) => api.request(`/consultas/${id}`, { method: 'DELETE' }),
  },
};

export default api;