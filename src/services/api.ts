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
        // tenta ler JSON, se não for JSON, pega text()
        let errorBody: any = null;
        try {
          errorBody = await response.clone().json();
        } catch (e) {
          try {
            errorBody = await response.clone().text();
          } catch (e2) {
            errorBody = `Não foi possível ler o corpo do erro (status ${response.status})`;
          }
        }

        // log detalhado (útil em dev)
        console.error('API Erro ->', {
          url: `${API_BASE_URL}${API_PREFIX}${endpoint}`,
          options,
          status: response.status,
          body: errorBody,
        });

        // jogo a mensagem do servidor quando disponível
        const msg =
          (errorBody && (errorBody.message || errorBody.error || JSON.stringify(errorBody))) ||
          `Erro ${response.status}`;
        throw new Error(msg);
      }

      if (response.status === 204 || options.method === 'DELETE') {
        return null;
      }

      const data = await response.json().catch(() => null);
      return data;
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
    buscarPorId: (id: number) => api.request(`/pacientes/${id}`),
    criar: (dados: any) => api.request('/pacientes', { method: 'POST', body: JSON.stringify(dados) }),
    atualizar: (id: number, dados: any) => 
      api.request(`/pacientes/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
    excluir: (id: number) => api.request(`/pacientes/${id}`, { method: 'DELETE' }),
  },

  // Médicos
  medicos: {
    listar: () => api.request('/medicos'),
    buscarPorId: (id: number) => api.request(`/medicos/${id}`),
    criar: (dados: any) => api.request('/medicos', { method: 'POST', body: JSON.stringify(dados) }),
    atualizar: (id: number, dados: any) => 
      api.request(`/medicos/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
    excluir: (id: number) => api.request(`/medicos/${id}`, { method: 'DELETE' }),
  },

  // Consultas
  consultas: {
    listar: () => api.request('/consultas'),
    buscarPorId: (id: number) => api.request(`/consultas/${id}`),
    criar: (dados: any) => api.request('/consultas', { method: 'POST', body: JSON.stringify(dados) }),
    atualizar: (id: number, dados: any) => 
      api.request(`/consultas/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
    excluir: (id: number) => api.request(`/consultas/${id}`, { method: 'DELETE' }),
  },
};

export default api;