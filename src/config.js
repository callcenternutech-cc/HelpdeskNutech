// API configuration shared by web and Android builds.
// Set VITE_API_URL in .env.production to your deployed backend, e.g.
// VITE_API_URL=https://helpdesk-api.example.com
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path = '') => {
  if (!path) return API_BASE_URL || window.location.origin;
  if (/^https?:\/\//i.test(path) || /^wss?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const websocketUrl = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const explicit = import.meta.env.VITE_WS_URL;
  if (explicit) {
    return `${explicit}${explicit.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`;
  }

  if (API_BASE_URL) {
    const url = new URL(API_BASE_URL);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = '/ws';
    url.searchParams.set('token', token);
    return url.toString();
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}`;
};
