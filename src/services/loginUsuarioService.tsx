// src/services/loginUsuarioService.tsx
// Serviço responsável pelo login de usuários
// Usa fetch API, async/await e tratamento de erros específico por status code.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hera-api.onrender.com';
const LOGIN_ENDPOINT = `${API_BASE_URL}/hera-api/login`;
const AUTH_USER_STORAGE_KEY = 'auth_user';

export type LoginCredentials = {
  email: string;
  senha: string;
};

export type AuthUser = {
  nome: string;
  email: string;
  senha: string;
};

/**
 * Realiza o login do usuário e persiste os dados em armazenamento local
 * @param {LoginCredentials} credentials
 * @returns {Promise<AuthUser>} Dados do usuário retornados pela API em caso de sucesso
 * @throws {Error} Erro com mensagem amigável conforme o tipo (401, 500, rede, genérico)
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthUser> {
  // Validação mínima de payload no cliente
  if (!credentials || !credentials.email || !credentials.senha) {
    throw new Error('Credenciais inválidas.');
  }

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        senha: credentials.senha
      }),
    });

    // Tratamento específico para erro de autenticação
    if (response.status === 401) {
      throw new Error('Email ou senha inválidos.');
    }

    if (response.status === 500) {
      throw new Error('Erro interno do servidor');
    }

    // Para outros casos não OK, tentamos extrair mensagem do backend
    if (!response.ok) {
      let serverMessage = '';
      try {
        const errBody = await response.json();
        serverMessage = errBody?.message || '';
      } catch {
        // Ignora erro de parse
      }
      throw new Error(serverMessage || 'Falha na autenticação');
    }

    // Sucesso
    const data = await response.json();

    // Persistência dos dados do usuário e token
    try {
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(data.user));
      // Se a API retornar um token, você pode salvá-lo também
      // localStorage.setItem('auth_token', data.token);
    } catch {
      // Se armazenamento falhar, ainda retornamos o usuário
    }

    return data.user;
  } catch (err: unknown) {
    let message = '';
    if (err instanceof Error) {
      message = err.message;
    }
    if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('Network request failed')) {
      throw new Error('Erro de conexão com servidor');
    }
    throw err instanceof Error ? err : new Error('Ocorreu um erro inesperado');
  }
}

/**
 * Remove dados de autenticação locais (logout)
 */
export function logout(): void {
  try {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    // Se estiver usando token
    // localStorage.removeItem('auth_token');
  } catch {
    // noop
  }
}

/**
 * Retorna true se existe um usuário logado
 */
export function isAuthenticated(): boolean {
  try {
    const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    return Boolean(raw);
  } catch {
    return false;
  }
}

/**
 * Obtém o usuário autenticado
 * @returns {AuthUser | null}
 */
export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) as AuthUser : null;
  } catch {
    return null;
  }
}
