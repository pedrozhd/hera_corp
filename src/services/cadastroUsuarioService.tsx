// src/services/authService.js
// Serviço de autenticação responsável por verificar o domínio do email e salvar o usuário
// Usa fetch API, async/await e tratamento de erros específico por status code.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hera-api.onrender.com';
const VERIFY_ENDPOINT = `${API_BASE_URL}/hera-api/usuarios`;
const AUTH_USER_STORAGE_KEY = 'auth_user';

export type AuthUser = {
  nome: string
  email: string;
  senha: string;
};

/**
 * Verifica domínio do email no backend e persiste o usuário em armazenamento local.
 * @param {AuthUser} userData
 * @returns {Promise<AuthUser>} Dados do usuário retornados pela API em caso de sucesso
 * @throws {Error} Erro com mensagem amigável conforme o tipo (403, 500, rede, genérico)
 */
export async function verifyAndSaveUser(userData: AuthUser): Promise<AuthUser> {
  // Validação mínima de payload no cliente
  if (!userData || !userData.email || !userData.senha || !userData.nome) {
    throw new Error('Dados do usuário inválidos.');
  }

  try {
    const response = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha
      }),
    });

    if (response.status) {
      throw new Error('Erro ao salvar usuário');
    }

    // Para outros casos não OK, tentamos extrair mensagem do backend
    if (!response.ok) {
      let serverMessage = '';
      try {
        const errBody = await response.json();
        serverMessage = errBody?.message || '';
      } catch (error){
        throw new Error(serverMessage || 'Falha na verificação do usuário', error as Error);
      }
    }

    // Sucesso
    const data = await response.json();

    // Persistência simples para indicar autenticação (pode ser substituída por token/jwt se existir)
    try {
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(data.user));
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
 * Retorna true se existe um usuário salvo localmente (indica sessão autenticada).
 * Pode ser adaptado para verificar JWT/token conforme necessidade.
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
 * Obtém o usuário autenticado salvo.
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

/**
 * Remove dados de autenticação locais (logout simples).
 */
export function logout(): void {
  try {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  } catch {
    // noop
  }
}