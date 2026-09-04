const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  del: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login.php', { email, password }),
  register: (data: Record<string, unknown>) =>
    api.post('/auth/register.php', data),
  logout: () => api.post('/auth/logout.php', {}),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot_password.php', { email }),
  me: () => api.get('/auth/me.php'),
};