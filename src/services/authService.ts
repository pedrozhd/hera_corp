import type { AuthUser } from '../interfaces';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hera-api.onrender.com';
const LOGIN_ENDPOINT = `${API_BASE_URL}/hera-api/login`;
const REGISTER_ENDPOINT = `${API_BASE_URL}/hera-api/usuarios`;
const AUTH_USER_STORAGE_KEY = 'auth_user';

/**
 * Faz login do usuário e salva token/usuário no localStorage.
 */
export async function loginUser(email: string, senha: string): Promise<void> {
  if (!email || !senha) throw new Error('Preencha todos os campos.');

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Falha no login.');
    }

    const data = await response.json();

    // ✅ Armazena retorno completo (user + token, se houver)
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(data));

    // Se tiver token separado:
    if (data.token) localStorage.setItem("auth_token", data.token);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão com o servidor.');
      }
      throw err;
    }
    throw new Error('Erro inesperado ao tentar logar.');
  }
}

/**
 * Cadastra novo usuário e já redireciona se tudo der certo.
 */
export async function registerUser(userData: AuthUser): Promise<void> {
  if (!userData || !userData.email || !userData.senha || !userData.nome) {
    throw new Error('Preencha todos os campos.');
  }

  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao cadastrar usuário.');
    }

    const data = await response.json();

    // ✅ Armazena retorno completo (user + token, se houver)
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(data));

    if (data.token) localStorage.setItem("auth_token", data.token);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão com o servidor.');
      }
      throw err;
    }
    throw new Error('Erro inesperado ao cadastrar.');
  }
}

/**
 * Retorna true se o usuário estiver autenticado.
 */
export function isAuthenticated(): boolean {
  try {
    return Boolean(localStorage.getItem(AUTH_USER_STORAGE_KEY));
  } catch {
    return false;
  }
}

/**
 * Retorna o usuário ou token salvo.
 */
export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) as AuthUser : null;
  } catch {
    return null;
  }
}

/**
 * Faz logout limpando o localStorage.
 */
export function logout(): void {
  try {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    localStorage.removeItem("auth_token");
  } catch {
    // noop
  }
}
