// Every app in this suite points at the same shared backend, which is
// what keeps them interlinked. Override with an env var in production.
const configuredUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
const localDevelopment = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const BASE_URL = configuredUrl || (localDevelopment ? 'http://localhost:4000/api' : '/api');

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
};
